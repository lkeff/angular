"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = exports.TcbDirectiveOutputsOp = exports.TcbGenericContextBehavior = void 0;
exports.generateTypeCheckBlock = generateTypeCheckBlock;
const compiler_1 = require("@angular/compiler");
const typescript_1 = __importDefault(require("typescript"));
const comments_1 = require("./comments");
const diagnostics_1 = require("./diagnostics");
const expression_1 = require("./expression");
const ts_util_1 = require("./ts_util");
const type_constructor_1 = require("./type_constructor");
const type_parameter_emitter_1 = require("./type_parameter_emitter");
const host_bindings_1 = require("./host_bindings");
/**
 * Controls how generics for the component context class will be handled during TCB generation.
 */
var TcbGenericContextBehavior;
(function (TcbGenericContextBehavior) {
    /**
     * References to generic parameter bounds will be emitted via the `TypeParameterEmitter`.
     *
     * The caller must verify that all parameter bounds are emittable in order to use this mode.
     */
    TcbGenericContextBehavior[TcbGenericContextBehavior["UseEmitter"] = 0] = "UseEmitter";
    /**
     * Generic parameter declarations will be copied directly from the `ts.ClassDeclaration` of the
     * component class.
     *
     * The caller must only use the generated TCB code in a context where such copies will still be
     * valid, such as an inline type check block.
     */
    TcbGenericContextBehavior[TcbGenericContextBehavior["CopyClassNodes"] = 1] = "CopyClassNodes";
    /**
     * Any generic parameters for the component context class will be set to `any`.
     *
     * Produces a less useful type, but is always safe to use.
     */
    TcbGenericContextBehavior[TcbGenericContextBehavior["FallbackToAny"] = 2] = "FallbackToAny";
})(TcbGenericContextBehavior || (exports.TcbGenericContextBehavior = TcbGenericContextBehavior = {}));
/**
 * Given a `ts.ClassDeclaration` for a component, and metadata regarding that component, compose a
 * "type check block" function.
 *
 * When passed through TypeScript's TypeChecker, type errors that arise within the type check block
 * function indicate issues in the template itself.
 *
 * As a side effect of generating a TCB for the component, `ts.Diagnostic`s may also be produced
 * directly for issues within the template which are identified during generation. These issues are
 * recorded in either the `domSchemaChecker` (which checks usage of DOM elements and bindings) as
 * well as the `oobRecorder` (which records errors when the type-checking code generator is unable
 * to sufficiently understand a template).
 *
 * @param env an `Environment` into which type-checking code will be generated.
 * @param ref a `Reference` to the component class which should be type-checked.
 * @param name a `ts.Identifier` to use for the generated `ts.FunctionDeclaration`.
 * @param meta metadata about the component's template and the function being generated.
 * @param domSchemaChecker used to check and record errors regarding improper usage of DOM elements
 * and bindings.
 * @param oobRecorder used to record errors regarding template elements which could not be correctly
 * translated into types during TCB generation.
 * @param genericContextBehavior controls how generic parameters (especially parameters with generic
 * bounds) will be referenced from the generated TCB code.
 */
function generateTypeCheckBlock(env, ref, name, meta, domSchemaChecker, oobRecorder, genericContextBehavior) {
    const tcb = new Context(env, domSchemaChecker, oobRecorder, meta.id, meta.boundTarget, meta.pipes, meta.schemas, meta.isStandalone, meta.preserveWhitespaces);
    const ctxRawType = env.referenceType(ref);
    if (!typescript_1.default.isTypeReferenceNode(ctxRawType)) {
        throw new Error(`Expected TypeReferenceNode when referencing the ctx param for ${ref.debugName}`);
    }
    let typeParameters = undefined;
    let typeArguments = undefined;
    if (ref.node.typeParameters !== undefined) {
        if (!env.config.useContextGenericType) {
            genericContextBehavior = TcbGenericContextBehavior.FallbackToAny;
        }
        switch (genericContextBehavior) {
            case TcbGenericContextBehavior.UseEmitter:
                // Guaranteed to emit type parameters since we checked that the class has them above.
                typeParameters = new type_parameter_emitter_1.TypeParameterEmitter(ref.node.typeParameters, env.reflector).emit((typeRef) => env.referenceType(typeRef));
                typeArguments = typeParameters.map((param) => typescript_1.default.factory.createTypeReferenceNode(param.name));
                break;
            case TcbGenericContextBehavior.CopyClassNodes:
                typeParameters = [...ref.node.typeParameters];
                typeArguments = typeParameters.map((param) => typescript_1.default.factory.createTypeReferenceNode(param.name));
                break;
            case TcbGenericContextBehavior.FallbackToAny:
                typeArguments = ref.node.typeParameters.map(() => typescript_1.default.factory.createKeywordTypeNode(typescript_1.default.SyntaxKind.AnyKeyword));
                break;
        }
    }
    const paramList = [tcbThisParam(ctxRawType.typeName, typeArguments)];
    const statements = [];
    // Add the template type checking code.
    if (tcb.boundTarget.target.template !== undefined) {
        const templateScope = Scope.forNodes(tcb, null, null, tcb.boundTarget.target.template, 
        /* guard */ null);
        statements.push(renderBlockStatements(env, templateScope, typescript_1.default.factory.createTrue()));
    }
    // Add the host bindings type checking code.
    if (tcb.boundTarget.target.host !== undefined) {
        const hostScope = Scope.forNodes(tcb, null, tcb.boundTarget.target.host, null, null);
        statements.push(renderBlockStatements(env, hostScope, (0, host_bindings_1.createHostBindingsBlockGuard)()));
    }
    const body = typescript_1.default.factory.createBlock(statements);
    const fnDecl = typescript_1.default.factory.createFunctionDeclaration(
    /* modifiers */ undefined, 
    /* asteriskToken */ undefined, 
    /* name */ name, 
    /* typeParameters */ env.config.useContextGenericType ? typeParameters : undefined, 
    /* parameters */ paramList, 
    /* type */ undefined, 
    /* body */ body);
    (0, diagnostics_1.addTypeCheckId)(fnDecl, meta.id);
    return fnDecl;
}
function renderBlockStatements(env, scope, wrapperExpression) {
    const scopeStatements = scope.render();
    const innerBody = typescript_1.default.factory.createBlock([...env.getPreludeStatements(), ...scopeStatements]);
    // Wrap the body in an if statement. This serves two purposes:
    // 1. It allows us to distinguish between the sections of the block (e.g. host or template).
    // 2. It allows the `ts.Printer` to produce better-looking output.
    return typescript_1.default.factory.createIfStatement(wrapperExpression, innerBody);
}
/**
 * A code generation operation that's involved in the construction of a Type Check Block.
 *
 * The generation of a TCB is non-linear. Bindings within a template may result in the need to
 * construct certain types earlier than they otherwise would be constructed. That is, if the
 * generation of a TCB for a template is broken down into specific operations (constructing a
 * directive, extracting a variable from a let- operation, etc), then it's possible for operations
 * earlier in the sequence to depend on operations which occur later in the sequence.
 *
 * `TcbOp` abstracts the different types of operations which are required to convert a template into
 * a TCB. This allows for two phases of processing for the template, where 1) a linear sequence of
 * `TcbOp`s is generated, and then 2) these operations are executed, not necessarily in linear
 * order.
 *
 * Each `TcbOp` may insert statements into the body of the TCB, and also optionally return a
 * `ts.Expression` which can be used to reference the operation's result.
 */
class TcbOp {
    /**
     * Replacement value or operation used while this `TcbOp` is executing (i.e. to resolve circular
     * references during its execution).
     *
     * This is usually a `null!` expression (which asks TS to infer an appropriate type), but another
     * `TcbOp` can be returned in cases where additional code generation is necessary to deal with
     * circular references.
     */
    circularFallback() {
        return INFER_TYPE_FOR_CIRCULAR_OP_EXPR;
    }
}
/**
 * A `TcbOp` which creates an expression for a native DOM element (or web component) from a
 * `TmplAstElement`.
 *
 * Executing this operation returns a reference to the element variable.
 */
class TcbElementOp extends TcbOp {
    constructor(tcb, scope, element) {
        super();
        this.tcb = tcb;
        this.scope = scope;
        this.element = element;
    }
    get optional() {
        // The statement generated by this operation is only used for type-inference of the DOM
        // element's type and won't report diagnostics by itself, so the operation is marked as optional
        // to avoid generating statements for DOM elements that are never referenced.
        return true;
    }
    execute() {
        const id = this.tcb.allocateId();
        // Add the declaration of the element using document.createElement.
        const initializer = (0, ts_util_1.tsCreateElement)(this.element.name);
        (0, diagnostics_1.addParseSpanInfo)(initializer, this.element.startSourceSpan || this.element.sourceSpan);
        this.scope.addStatement((0, ts_util_1.tsCreateVariable)(id, initializer));
        return id;
    }
}
/**
 * A `TcbOp` which creates an expression for particular let- `TmplAstVariable` on a
 * `TmplAstTemplate`'s context.
 *
 * Executing this operation returns a reference to the variable variable (lol).
 */
class TcbTemplateVariableOp extends TcbOp {
    constructor(tcb, scope, template, variable) {
        super();
        this.tcb = tcb;
        this.scope = scope;
        this.template = template;
        this.variable = variable;
    }
    get optional() {
        return false;
    }
    execute() {
        // Look for a context variable for the template.
        const ctx = this.scope.resolve(this.template);
        // Allocate an identifier for the TmplAstVariable, and initialize it to a read of the variable
        // on the template context.
        const id = this.tcb.allocateId();
        const initializer = typescript_1.default.factory.createPropertyAccessExpression(
        /* expression */ ctx, 
        /* name */ this.variable.value || '$implicit');
        (0, diagnostics_1.addParseSpanInfo)(id, this.variable.keySpan);
        // Declare the variable, and return its identifier.
        let variable;
        if (this.variable.valueSpan !== undefined) {
            (0, diagnostics_1.addParseSpanInfo)(initializer, this.variable.valueSpan);
            variable = (0, ts_util_1.tsCreateVariable)(id, (0, diagnostics_1.wrapForTypeChecker)(initializer));
        }
        else {
            variable = (0, ts_util_1.tsCreateVariable)(id, initializer);
        }
        (0, diagnostics_1.addParseSpanInfo)(variable.declarationList.declarations[0], this.variable.sourceSpan);
        this.scope.addStatement(variable);
        return id;
    }
}
/**
 * A `TcbOp` which generates a variable for a `TmplAstTemplate`'s context.
 *
 * Executing this operation returns a reference to the template's context variable.
 */
class TcbTemplateContextOp extends TcbOp {
    constructor(tcb, scope) {
        super();
        this.tcb = tcb;
        this.scope = scope;
        // The declaration of the context variable is only needed when the context is actually referenced.
        this.optional = true;
    }
    execute() {
        // Allocate a template ctx variable and declare it with an 'any' type. The type of this variable
        // may be narrowed as a result of template guard conditions.
        const ctx = this.tcb.allocateId();
        const type = typescript_1.default.factory.createKeywordTypeNode(typescript_1.default.SyntaxKind.AnyKeyword);
        this.scope.addStatement((0, ts_util_1.tsDeclareVariable)(ctx, type));
        return ctx;
    }
}
/**
 * A `TcbOp` which generates a constant for a `TmplAstLetDeclaration`.
 *
 * Executing this operation returns a reference to the `@let` declaration.
 */
class TcbLetDeclarationOp extends TcbOp {
    constructor(tcb, scope, node) {
        super();
        this.tcb = tcb;
        this.scope = scope;
        this.node = node;
        /**
         * `@let` declarations are mandatory, because their expressions
         * should be checked even if they aren't referenced anywhere.
         */
        this.optional = false;
    }
    execute() {
        const id = this.tcb.allocateId();
        (0, diagnostics_1.addParseSpanInfo)(id, this.node.nameSpan);
        const value = tcbExpression(this.node.value, this.tcb, this.scope);
        // Value needs to be wrapped, because spans for the expressions inside of it can
        // be picked up incorrectly as belonging to the full variable declaration.
        const varStatement = (0, ts_util_1.tsCreateVariable)(id, (0, diagnostics_1.wrapForTypeChecker)(value), typescript_1.default.NodeFlags.Const);
        (0, diagnostics_1.addParseSpanInfo)(varStatement.declarationList.declarations[0], this.node.sourceSpan);
        this.scope.addStatement(varStatement);
        return id;
    }
}
/**
 * A `TcbOp` which descends into a `TmplAstTemplate`'s children and generates type-checking code for
 * them.
 *
 * This operation wraps the children's type-checking code in an `if` block, which may include one
 * or more type guard conditions that narrow types within the template body.
 */
class TcbTemplateBodyOp extends TcbOp {
    constructor(tcb, scope, template) {
        super();
        this.tcb = tcb;
        this.scope = scope;
        this.template = template;
    }
    get optional() {
        return false;
    }
    execute() {
        // An `if` will be constructed, within which the template's children will be type checked. The
        // `if` is used for two reasons: it creates a new syntactic scope, isolating variables declared
        // in the template's TCB from the outer context, and it allows any directives on the templates
        // to perform type narrowing of either expressions or the template's context.
        //
        // The guard is the `if` block's condition. It's usually set to `true` but directives that exist
        // on the template can trigger extra guard expressions that serve to narrow types within the
        // `if`. `guard` is calculated by starting with `true` and adding other conditions as needed.
        // Collect these into `guards` by processing the directives.
        // By default the guard is simply `true`.
        let guard = null;
        const directiveGuards = [];
        this.addDirectiveGuards(directiveGuards, this.template, this.tcb.boundTarget.getDirectivesOfNode(this.template));
        for (const directive of this.template.directives) {
            this.addDirectiveGuards(directiveGuards, directive, this.tcb.boundTarget.getDirectivesOfNode(directive));
        }
        // If there are any guards from directives, use them instead.
        if (directiveGuards.length > 0) {
            // Pop the first value and use it as the initializer to reduce(). This way, a single guard
            // will be used on its own, but two or more will be combined into binary AND expressions.
            guard = directiveGuards.reduce((expr, dirGuard) => typescript_1.default.factory.createBinaryExpression(expr, typescript_1.default.SyntaxKind.AmpersandAmpersandToken, dirGuard), directiveGuards.pop());
        }
        // Create a new Scope for the template. This constructs the list of operations for the template
        // children, as well as tracks bindings within the template.
        const tmplScope = Scope.forNodes(this.tcb, this.scope, this.template, this.template.children, guard);
        // Render the template's `Scope` into its statements.
        const statements = tmplScope.render();
        if (statements.length === 0) {
            // As an optimization, don't generate the scope's block if it has no statements. This is
            // beneficial for templates that contain for example `<span *ngIf="first"></span>`, in which
            // case there's no need to render the `NgIf` guard expression. This seems like a minor
            // improvement, however it reduces the number of flow-node antecedents that TypeScript needs
            // to keep into account for such cases, resulting in an overall reduction of
            // type-checking time.
            return null;
        }
        let tmplBlock = typescript_1.default.factory.createBlock(statements);
        if (guard !== null) {
            // The scope has a guard that needs to be applied, so wrap the template block into an `if`
            // statement containing the guard expression.
            tmplBlock = typescript_1.default.factory.createIfStatement(
            /* expression */ guard, 
            /* thenStatement */ tmplBlock);
        }
        this.scope.addStatement(tmplBlock);
        return null;
    }
    addDirectiveGuards(guards, hostNode, directives) {
        if (directives === null || directives.length === 0) {
            return;
        }
        const isTemplate = hostNode instanceof compiler_1.TmplAstTemplate;
        for (const dir of directives) {
            const dirInstId = this.scope.resolve(hostNode, dir);
            const dirId = this.tcb.env.reference(dir.ref);
            // There are two kinds of guards. Template guards (ngTemplateGuards) allow type narrowing of
            // the expression passed to an @Input of the directive. Scan the directive to see if it has
            // any template guards, and generate them if needed.
            dir.ngTemplateGuards.forEach((guard) => {
                // For each template guard function on the directive, look for a binding to that input.
                const boundInput = hostNode.inputs.find((i) => i.name === guard.inputName) ||
                    (isTemplate
                        ? hostNode.templateAttrs.find((input) => {
                            return input instanceof compiler_1.TmplAstBoundAttribute && input.name === guard.inputName;
                        })
                        : undefined);
                if (boundInput !== undefined) {
                    // If there is such a binding, generate an expression for it.
                    const expr = tcbExpression(boundInput.value, this.tcb, this.scope);
                    // The expression has already been checked in the type constructor invocation, so
                    // it should be ignored when used within a template guard.
                    (0, comments_1.markIgnoreDiagnostics)(expr);
                    if (guard.type === 'binding') {
                        // Use the binding expression itself as guard.
                        guards.push(expr);
                    }
                    else {
                        // Call the guard function on the directive with the directive instance and that
                        // expression.
                        const guardInvoke = (0, ts_util_1.tsCallMethod)(dirId, `ngTemplateGuard_${guard.inputName}`, [
                            dirInstId,
                            expr,
                        ]);
                        (0, diagnostics_1.addParseSpanInfo)(guardInvoke, boundInput.value.sourceSpan);
                        guards.push(guardInvoke);
                    }
                }
            });
            // The second kind of guard is a template context guard. This guard narrows the template
            // rendering context variable `ctx`.
            if (dir.hasNgTemplateContextGuard) {
                if (this.tcb.env.config.applyTemplateContextGuards) {
                    const ctx = this.scope.resolve(hostNode);
                    const guardInvoke = (0, ts_util_1.tsCallMethod)(dirId, 'ngTemplateContextGuard', [dirInstId, ctx]);
                    (0, diagnostics_1.addParseSpanInfo)(guardInvoke, hostNode.sourceSpan);
                    guards.push(guardInvoke);
                }
                else if (isTemplate &&
                    hostNode.variables.length > 0 &&
                    this.tcb.env.config.suggestionsForSuboptimalTypeInference) {
                    // The compiler could have inferred a better type for the variables in this template,
                    // but was prevented from doing so by the type-checking configuration. Issue a warning
                    // diagnostic.
                    this.tcb.oobRecorder.suboptimalTypeInference(this.tcb.id, hostNode.variables);
                }
            }
        }
    }
}
/**
 * A `TcbOp` which renders an Angular expression (e.g. `{{foo() && bar.baz}}`).
 *
 * Executing this operation returns nothing.
 */
class TcbExpressionOp extends TcbOp {
    constructor(tcb, scope, expression) {
        super();
        this.tcb = tcb;
        this.scope = scope;
        this.expression = expression;
    }
    get optional() {
        return false;
    }
    execute() {
        const expr = tcbExpression(this.expression, this.tcb, this.scope);
        this.scope.addStatement(typescript_1.default.factory.createExpressionStatement(expr));
        return null;
    }
}
/**
 * A `TcbOp` which constructs an instance of a directive. For generic directives, generic
 * parameters are set to `any` type.
 */
class TcbDirectiveTypeOpBase extends TcbOp {
    constructor(tcb, scope, node, dir) {
        super();
        this.tcb = tcb;
        this.scope = scope;
        this.node = node;
        this.dir = dir;
    }
    get optional() {
        // The statement generated by this operation is only used to declare the directive's type and
        // won't report diagnostics by itself, so the operation is marked as optional to avoid
        // generating declarations for directives that don't have any inputs/outputs.
        return true;
    }
    execute() {
        const dirRef = this.dir.ref;
        const rawType = this.tcb.env.referenceType(this.dir.ref);
        let type;
        if (this.dir.isGeneric === false || dirRef.node.typeParameters === undefined) {
            type = rawType;
        }
        else {
            if (!typescript_1.default.isTypeReferenceNode(rawType)) {
                throw new Error(`Expected TypeReferenceNode when referencing the type for ${this.dir.ref.debugName}`);
            }
            const typeArguments = dirRef.node.typeParameters.map(() => typescript_1.default.factory.createKeywordTypeNode(typescript_1.default.SyntaxKind.AnyKeyword));
            type = typescript_1.default.factory.createTypeReferenceNode(rawType.typeName, typeArguments);
        }
        const id = this.tcb.allocateId();
        (0, comments_1.addExpressionIdentifier)(id, comments_1.ExpressionIdentifier.DIRECTIVE);
        (0, diagnostics_1.addParseSpanInfo)(id, this.node.startSourceSpan || this.node.sourceSpan);
        this.scope.addStatement((0, ts_util_1.tsDeclareVariable)(id, type));
        return id;
    }
}
/**
 * A `TcbOp` which constructs an instance of a non-generic directive _without_ setting any of its
 * inputs. Inputs are later set in the `TcbDirectiveInputsOp`. Type checking was found to be
 * faster when done in this way as opposed to `TcbDirectiveCtorOp` which is only necessary when the
 * directive is generic.
 *
 * Executing this operation returns a reference to the directive instance variable with its inferred
 * type.
 */
class TcbNonGenericDirectiveTypeOp extends TcbDirectiveTypeOpBase {
    /**
     * Creates a variable declaration for this op's directive of the argument type. Returns the id of
     * the newly created variable.
     */
    execute() {
        const dirRef = this.dir.ref;
        if (this.dir.isGeneric) {
            throw new Error(`Assertion Error: expected ${dirRef.debugName} not to be generic.`);
        }
        return super.execute();
    }
}
/**
 * A `TcbOp` which constructs an instance of a generic directive with its generic parameters set
 * to `any` type. This op is like `TcbDirectiveTypeOp`, except that generic parameters are set to
 * `any` type. This is used for situations where we want to avoid inlining.
 *
 * Executing this operation returns a reference to the directive instance variable with its generic
 * type parameters set to `any`.
 */
class TcbGenericDirectiveTypeWithAnyParamsOp extends TcbDirectiveTypeOpBase {
    execute() {
        const dirRef = this.dir.ref;
        if (dirRef.node.typeParameters === undefined) {
            throw new Error(`Assertion Error: expected typeParameters when creating a declaration for ${dirRef.debugName}`);
        }
        return super.execute();
    }
}
/**
 * A `TcbOp` which creates a variable for a local ref in a template.
 * The initializer for the variable is the variable expression for the directive, template, or
 * element the ref refers to. When the reference is used in the template, those TCB statements will
 * access this variable as well. For example:
 * ```ts
 * var _t1 = document.createElement('div');
 * var _t2 = _t1;
 * _t2.value
 * ```
 * This operation supports more fluent lookups for the `TemplateTypeChecker` when getting a symbol
 * for a reference. In most cases, this isn't essential; that is, the information for the symbol
 * could be gathered without this operation using the `BoundTarget`. However, for the case of
 * ng-template references, we will need this reference variable to not only provide a location in
 * the shim file, but also to narrow the variable to the correct `TemplateRef<T>` type rather than
 * `TemplateRef<any>` (this work is still TODO).
 *
 * Executing this operation returns a reference to the directive instance variable with its inferred
 * type.
 */
class TcbReferenceOp extends TcbOp {
    constructor(tcb, scope, node, host, target) {
        super();
        this.tcb = tcb;
        this.scope = scope;
        this.node = node;
        this.host = host;
        this.target = target;
        // The statement generated by this operation is only used to for the Type Checker
        // so it can map a reference variable in the template directly to a node in the TCB.
        this.optional = true;
    }
    execute() {
        const id = this.tcb.allocateId();
        let initializer = this.target instanceof compiler_1.TmplAstTemplate || this.target instanceof compiler_1.TmplAstElement
            ? this.scope.resolve(this.target)
            : this.scope.resolve(this.host, this.target);
        // The reference is either to an element, an <ng-template> node, or to a directive on an
        // element or template.
        if ((this.target instanceof compiler_1.TmplAstElement && !this.tcb.env.config.checkTypeOfDomReferences) ||
            !this.tcb.env.config.checkTypeOfNonDomReferences) {
            // References to DOM nodes are pinned to 'any' when `checkTypeOfDomReferences` is `false`.
            // References to `TemplateRef`s and directives are pinned to 'any' when
            // `checkTypeOfNonDomReferences` is `false`.
            initializer = typescript_1.default.factory.createAsExpression(initializer, typescript_1.default.factory.createKeywordTypeNode(typescript_1.default.SyntaxKind.AnyKeyword));
        }
        else if (this.target instanceof compiler_1.TmplAstTemplate) {
            // Direct references to an <ng-template> node simply require a value of type
            // `TemplateRef<any>`. To get this, an expression of the form
            // `(_t1 as any as TemplateRef<any>)` is constructed.
            initializer = typescript_1.default.factory.createAsExpression(initializer, typescript_1.default.factory.createKeywordTypeNode(typescript_1.default.SyntaxKind.AnyKeyword));
            initializer = typescript_1.default.factory.createAsExpression(initializer, this.tcb.env.referenceExternalType('@angular/core', 'TemplateRef', [compiler_1.DYNAMIC_TYPE]));
            initializer = typescript_1.default.factory.createParenthesizedExpression(initializer);
        }
        (0, diagnostics_1.addParseSpanInfo)(initializer, this.node.sourceSpan);
        (0, diagnostics_1.addParseSpanInfo)(id, this.node.keySpan);
        this.scope.addStatement((0, ts_util_1.tsCreateVariable)(id, initializer));
        return id;
    }
}
/**
 * A `TcbOp` which is used when the target of a reference is missing. This operation generates a
 * variable of type any for usages of the invalid reference to resolve to. The invalid reference
 * itself is recorded out-of-band.
 */
class TcbInvalidReferenceOp extends TcbOp {
    constructor(tcb, scope) {
        super();
        this.tcb = tcb;
        this.scope = scope;
        // The declaration of a missing reference is only needed when the reference is resolved.
        this.optional = true;
    }
    execute() {
        const id = this.tcb.allocateId();
        this.scope.addStatement((0, ts_util_1.tsCreateVariable)(id, expression_1.ANY_EXPRESSION));
        return id;
    }
}
/**
 * A `TcbOp` which constructs an instance of a directive with types inferred from its inputs. The
 * inputs themselves are not checked here; checking of inputs is achieved in `TcbDirectiveInputsOp`.
 * Any errors reported in this statement are ignored, as the type constructor call is only present
 * for type-inference.
 *
 * When a Directive is generic, it is required that the TCB generates the instance using this method
 * in order to infer the type information correctly.
 *
 * Executing this operation returns a reference to the directive instance variable with its inferred
 * type.
 */
class TcbDirectiveCtorOp extends TcbOp {
    constructor(tcb, scope, node, dir) {
        super();
        this.tcb = tcb;
        this.scope = scope;
        this.node = node;
        this.dir = dir;
    }
    get optional() {
        // The statement generated by this operation is only used to infer the directive's type and
        // won't report diagnostics by itself, so the operation is marked as optional.
        return true;
    }
    execute() {
        const id = this.tcb.allocateId();
        (0, comments_1.addExpressionIdentifier)(id, comments_1.ExpressionIdentifier.DIRECTIVE);
        (0, diagnostics_1.addParseSpanInfo)(id, this.node.startSourceSpan || this.node.sourceSpan);
        const genericInputs = new Map();
        const boundAttrs = getBoundAttributes(this.dir, this.node);
        for (const attr of boundAttrs) {
            // Skip text attributes if configured to do so.
            if (!this.tcb.env.config.checkTypeOfAttributes &&
                attr.attribute instanceof compiler_1.TmplAstTextAttribute) {
                continue;
            }
            for (const { fieldName, isTwoWayBinding } of attr.inputs) {
                // Skip the field if an attribute has already been bound to it; we can't have a duplicate
                // key in the type constructor call.
                if (genericInputs.has(fieldName)) {
                    continue;
                }
                const expression = translateInput(attr.attribute, this.tcb, this.scope);
                genericInputs.set(fieldName, {
                    type: 'binding',
                    field: fieldName,
                    expression,
                    sourceSpan: attr.attribute.sourceSpan,
                    isTwoWayBinding,
                });
            }
        }
        // Add unset directive inputs for each of the remaining unset fields.
        for (const { classPropertyName } of this.dir.inputs) {
            if (!genericInputs.has(classPropertyName)) {
                genericInputs.set(classPropertyName, { type: 'unset', field: classPropertyName });
            }
        }
        // Call the type constructor of the directive to infer a type, and assign the directive
        // instance.
        const typeCtor = tcbCallTypeCtor(this.dir, this.tcb, Array.from(genericInputs.values()));
        (0, comments_1.markIgnoreDiagnostics)(typeCtor);
        this.scope.addStatement((0, ts_util_1.tsCreateVariable)(id, typeCtor));
        return id;
    }
    circularFallback() {
        return new TcbDirectiveCtorCircularFallbackOp(this.tcb, this.scope, this.dir);
    }
}
/**
 * A `TcbOp` which generates code to check input bindings on an element that correspond with the
 * members of a directive.
 *
 * Executing this operation returns nothing.
 */
class TcbDirectiveInputsOp extends TcbOp {
    constructor(tcb, scope, node, dir) {
        super();
        this.tcb = tcb;
        this.scope = scope;
        this.node = node;
        this.dir = dir;
    }
    get optional() {
        return false;
    }
    execute() {
        let dirId = null;
        // TODO(joost): report duplicate properties
        const boundAttrs = getBoundAttributes(this.dir, this.node);
        const seenRequiredInputs = new Set();
        for (const attr of boundAttrs) {
            // For bound inputs, the property is assigned the binding expression.
            const expr = widenBinding(translateInput(attr.attribute, this.tcb, this.scope), this.tcb);
            let assignment = (0, diagnostics_1.wrapForDiagnostics)(expr);
            for (const { fieldName, required, transformType, isSignal, isTwoWayBinding } of attr.inputs) {
                let target;
                if (required) {
                    seenRequiredInputs.add(fieldName);
                }
                // Note: There is no special logic for transforms/coercion with signal inputs.
                // For signal inputs, a `transformType` will never be set as we do not capture
                // the transform in the compiler metadata. Signal inputs incorporate their
                // transform write type into their member type, and we extract it below when
                // setting the `WriteT` of such `InputSignalWithTransform<_, WriteT>`.
                if (this.dir.coercedInputFields.has(fieldName)) {
                    let type;
                    if (transformType !== null) {
                        type = this.tcb.env.referenceTransplantedType(new compiler_1.TransplantedType(transformType));
                    }
                    else {
                        // The input has a coercion declaration which should be used instead of assigning the
                        // expression into the input field directly. To achieve this, a variable is declared
                        // with a type of `typeof Directive.ngAcceptInputType_fieldName` which is then used as
                        // target of the assignment.
                        const dirTypeRef = this.tcb.env.referenceType(this.dir.ref);
                        if (!typescript_1.default.isTypeReferenceNode(dirTypeRef)) {
                            throw new Error(`Expected TypeReferenceNode from reference to ${this.dir.ref.debugName}`);
                        }
                        type = (0, ts_util_1.tsCreateTypeQueryForCoercedInput)(dirTypeRef.typeName, fieldName);
                    }
                    const id = this.tcb.allocateId();
                    this.scope.addStatement((0, ts_util_1.tsDeclareVariable)(id, type));
                    target = id;
                }
                else if (this.dir.undeclaredInputFields.has(fieldName)) {
                    // If no coercion declaration is present nor is the field declared (i.e. the input is
                    // declared in a `@Directive` or `@Component` decorator's `inputs` property) there is no
                    // assignment target available, so this field is skipped.
                    continue;
                }
                else if (!this.tcb.env.config.honorAccessModifiersForInputBindings &&
                    this.dir.restrictedInputFields.has(fieldName)) {
                    // If strict checking of access modifiers is disabled and the field is restricted
                    // (i.e. private/protected/readonly), generate an assignment into a temporary variable
                    // that has the type of the field. This achieves type-checking but circumvents the access
                    // modifiers.
                    if (dirId === null) {
                        dirId = this.scope.resolve(this.node, this.dir);
                    }
                    const id = this.tcb.allocateId();
                    const dirTypeRef = this.tcb.env.referenceType(this.dir.ref);
                    if (!typescript_1.default.isTypeReferenceNode(dirTypeRef)) {
                        throw new Error(`Expected TypeReferenceNode from reference to ${this.dir.ref.debugName}`);
                    }
                    const type = typescript_1.default.factory.createIndexedAccessTypeNode(typescript_1.default.factory.createTypeQueryNode(dirId), typescript_1.default.factory.createLiteralTypeNode(typescript_1.default.factory.createStringLiteral(fieldName)));
                    const temp = (0, ts_util_1.tsDeclareVariable)(id, type);
                    this.scope.addStatement(temp);
                    target = id;
                }
                else {
                    if (dirId === null) {
                        dirId = this.scope.resolve(this.node, this.dir);
                    }
                    // To get errors assign directly to the fields on the instance, using property access
                    // when possible. String literal fields may not be valid JS identifiers so we use
                    // literal element access instead for those cases.
                    target = this.dir.stringLiteralInputFields.has(fieldName)
                        ? typescript_1.default.factory.createElementAccessExpression(dirId, typescript_1.default.factory.createStringLiteral(fieldName))
                        : typescript_1.default.factory.createPropertyAccessExpression(dirId, typescript_1.default.factory.createIdentifier(fieldName));
                }
                // For signal inputs, we unwrap the target `InputSignal`. Note that
                // we intentionally do the following things:
                //   1. keep the direct access to `dir.[field]` so that modifiers are honored.
                //   2. follow the existing pattern where multiple targets assign a single expression.
                //      This is a significant requirement for language service auto-completion.
                if (isSignal) {
                    const inputSignalBrandWriteSymbol = this.tcb.env.referenceExternalSymbol(compiler_1.R3Identifiers.InputSignalBrandWriteType.moduleName, compiler_1.R3Identifiers.InputSignalBrandWriteType.name);
                    if (!typescript_1.default.isIdentifier(inputSignalBrandWriteSymbol) &&
                        !typescript_1.default.isPropertyAccessExpression(inputSignalBrandWriteSymbol)) {
                        throw new Error(`Expected identifier or property access for reference to ${compiler_1.R3Identifiers.InputSignalBrandWriteType.name}`);
                    }
                    target = typescript_1.default.factory.createElementAccessExpression(target, inputSignalBrandWriteSymbol);
                }
                if (attr.attribute.keySpan !== undefined) {
                    (0, diagnostics_1.addParseSpanInfo)(target, attr.attribute.keySpan);
                }
                // Two-way bindings accept `T | WritableSignal<T>` so we have to unwrap the value.
                if (isTwoWayBinding && this.tcb.env.config.allowSignalsInTwoWayBindings) {
                    assignment = unwrapWritableSignal(assignment, this.tcb);
                }
                // Finally the assignment is extended by assigning it into the target expression.
                assignment = typescript_1.default.factory.createBinaryExpression(target, typescript_1.default.SyntaxKind.EqualsToken, assignment);
            }
            (0, diagnostics_1.addParseSpanInfo)(assignment, attr.attribute.sourceSpan);
            // Ignore diagnostics for text attributes if configured to do so.
            if (!this.tcb.env.config.checkTypeOfAttributes &&
                attr.attribute instanceof compiler_1.TmplAstTextAttribute) {
                (0, comments_1.markIgnoreDiagnostics)(assignment);
            }
            this.scope.addStatement(typescript_1.default.factory.createExpressionStatement(assignment));
        }
        this.checkRequiredInputs(seenRequiredInputs);
        return null;
    }
    checkRequiredInputs(seenRequiredInputs) {
        const missing = [];
        for (const input of this.dir.inputs) {
            if (input.required && !seenRequiredInputs.has(input.classPropertyName)) {
                missing.push(input.bindingPropertyName);
            }
        }
        if (missing.length > 0) {
            this.tcb.oobRecorder.missingRequiredInputs(this.tcb.id, this.node, this.dir.name, this.dir.isComponent, missing);
        }
    }
}
/**
 * A `TcbOp` which is used to generate a fallback expression if the inference of a directive type
 * via `TcbDirectiveCtorOp` requires a reference to its own type. This can happen using a template
 * reference:
 *
 * ```html
 * <some-cmp #ref [prop]="ref.foo"></some-cmp>
 * ```
 *
 * In this case, `TcbDirectiveCtorCircularFallbackOp` will add a second inference of the directive
 * type to the type-check block, this time calling the directive's type constructor without any
 * input expressions. This infers the widest possible supertype for the directive, which is used to
 * resolve any recursive references required to infer the real type.
 */
class TcbDirectiveCtorCircularFallbackOp extends TcbOp {
    constructor(tcb, scope, dir) {
        super();
        this.tcb = tcb;
        this.scope = scope;
        this.dir = dir;
    }
    get optional() {
        return false;
    }
    execute() {
        const id = this.tcb.allocateId();
        const typeCtor = this.tcb.env.typeCtorFor(this.dir);
        const circularPlaceholder = typescript_1.default.factory.createCallExpression(typeCtor, 
        /* typeArguments */ undefined, [typescript_1.default.factory.createNonNullExpression(typescript_1.default.factory.createNull())]);
        this.scope.addStatement((0, ts_util_1.tsCreateVariable)(id, circularPlaceholder));
        return id;
    }
}
/**
 * A `TcbOp` which feeds elements and unclaimed properties to the `DomSchemaChecker`.
 *
 * The DOM schema is not checked via TCB code generation. Instead, the `DomSchemaChecker` ingests
 * elements and property bindings and accumulates synthetic `ts.Diagnostic`s out-of-band. These are
 * later merged with the diagnostics generated from the TCB.
 *
 * For convenience, the TCB iteration of the template is used to drive the `DomSchemaChecker` via
 * the `TcbDomSchemaCheckerOp`.
 */
class TcbDomSchemaCheckerOp extends TcbOp {
    constructor(tcb, element, checkElement, claimedInputs) {
        super();
        this.tcb = tcb;
        this.element = element;
        this.checkElement = checkElement;
        this.claimedInputs = claimedInputs;
    }
    get optional() {
        return false;
    }
    execute() {
        var _a, _b;
        const element = this.element;
        const isTemplateElement = element instanceof compiler_1.TmplAstElement || element instanceof compiler_1.TmplAstComponent;
        const bindings = isTemplateElement ? element.inputs : element.bindings;
        if (this.checkElement && isTemplateElement) {
            this.tcb.domSchemaChecker.checkElement(this.tcb.id, this.getTagName(element), element.startSourceSpan, this.tcb.schemas, this.tcb.hostIsStandalone);
        }
        // TODO(alxhub): this could be more efficient.
        for (const binding of bindings) {
            const isPropertyBinding = binding.type === compiler_1.BindingType.Property || binding.type === compiler_1.BindingType.TwoWay;
            if (isPropertyBinding && ((_a = this.claimedInputs) === null || _a === void 0 ? void 0 : _a.has(binding.name))) {
                // Skip this binding as it was claimed by a directive.
                continue;
            }
            if (isPropertyBinding && binding.name !== 'style' && binding.name !== 'class') {
                // A direct binding to a property.
                const propertyName = (_b = ATTR_TO_PROP.get(binding.name)) !== null && _b !== void 0 ? _b : binding.name;
                if (isTemplateElement) {
                    this.tcb.domSchemaChecker.checkTemplateElementProperty(this.tcb.id, this.getTagName(element), propertyName, binding.sourceSpan, this.tcb.schemas, this.tcb.hostIsStandalone);
                }
                else {
                    this.tcb.domSchemaChecker.checkHostElementProperty(this.tcb.id, element, propertyName, binding.keySpan, this.tcb.schemas);
                }
            }
        }
        return null;
    }
    getTagName(node) {
        return node instanceof compiler_1.TmplAstElement ? node.name : getComponentTagName(node);
    }
}
/**
 * A `TcbOp` that finds and flags control flow nodes that interfere with content projection.
 *
 * Context:
 * Control flow blocks try to emulate the content projection behavior of `*ngIf` and `*ngFor`
 * in order to reduce breakages when moving from one syntax to the other (see #52414), however the
 * approach only works if there's only one element at the root of the control flow expression.
 * This means that a stray sibling node (e.g. text) can prevent an element from being projected
 * into the right slot. The purpose of the `TcbOp` is to find any places where a node at the root
 * of a control flow expression *would have been projected* into a specific slot, if the control
 * flow node didn't exist.
 */
class TcbControlFlowContentProjectionOp extends TcbOp {
    constructor(tcb, element, ngContentSelectors, componentName) {
        super();
        this.tcb = tcb;
        this.element = element;
        this.ngContentSelectors = ngContentSelectors;
        this.componentName = componentName;
        this.optional = false;
        // We only need to account for `error` and `warning` since
        // this check won't be enabled for `suppress`.
        this.category =
            tcb.env.config.controlFlowPreventingContentProjection === 'error'
                ? typescript_1.default.DiagnosticCategory.Error
                : typescript_1.default.DiagnosticCategory.Warning;
    }
    execute() {
        const controlFlowToCheck = this.findPotentialControlFlowNodes();
        if (controlFlowToCheck.length > 0) {
            const matcher = new compiler_1.SelectorMatcher();
            for (const selector of this.ngContentSelectors) {
                // `*` is a special selector for the catch-all slot.
                if (selector !== '*') {
                    matcher.addSelectables(compiler_1.CssSelector.parse(selector), selector);
                }
            }
            for (const root of controlFlowToCheck) {
                for (const child of root.children) {
                    if (child instanceof compiler_1.TmplAstElement || child instanceof compiler_1.TmplAstTemplate) {
                        matcher.match((0, compiler_1.createCssSelectorFromNode)(child), (_, originalSelector) => {
                            this.tcb.oobRecorder.controlFlowPreventingContentProjection(this.tcb.id, this.category, child, this.componentName, originalSelector, root, this.tcb.hostPreserveWhitespaces);
                        });
                    }
                }
            }
        }
        return null;
    }
    findPotentialControlFlowNodes() {
        const result = [];
        for (const child of this.element.children) {
            if (child instanceof compiler_1.TmplAstForLoopBlock) {
                if (this.shouldCheck(child)) {
                    result.push(child);
                }
                if (child.empty !== null && this.shouldCheck(child.empty)) {
                    result.push(child.empty);
                }
            }
            else if (child instanceof compiler_1.TmplAstIfBlock) {
                for (const branch of child.branches) {
                    if (this.shouldCheck(branch)) {
                        result.push(branch);
                    }
                }
            }
            else if (child instanceof compiler_1.TmplAstSwitchBlock) {
                for (const current of child.cases) {
                    if (this.shouldCheck(current)) {
                        result.push(current);
                    }
                }
            }
        }
        return result;
    }
    shouldCheck(node) {
        // Skip nodes with less than two children since it's impossible
        // for them to run into the issue that we're checking for.
        if (node.children.length < 2) {
            return false;
        }
        let hasSeenRootNode = false;
        // Check the number of root nodes while skipping empty text where relevant.
        for (const child of node.children) {
            // Normally `preserveWhitspaces` would have been accounted for during parsing, however
            // in `ngtsc/annotations/component/src/resources.ts#parseExtractedTemplate` we enable
            // `preserveWhitespaces` to preserve the accuracy of source maps diagnostics. This means
            // that we have to account for it here since the presence of text nodes affects the
            // content projection behavior.
            if (!(child instanceof compiler_1.TmplAstText) ||
                this.tcb.hostPreserveWhitespaces ||
                child.value.trim().length > 0) {
                // Content projection will be affected if there's more than one root node.
                if (hasSeenRootNode) {
                    return true;
                }
                hasSeenRootNode = true;
            }
        }
        return false;
    }
}
/**
 * A `TcbOp` which creates an expression for a the host element of a directive.
 *
 * Executing this operation returns a reference to the element variable.
 */
class TcbHostElementOp extends TcbOp {
    constructor(tcb, scope, element) {
        super();
        this.tcb = tcb;
        this.scope = scope;
        this.element = element;
        this.optional = true;
    }
    execute() {
        const id = this.tcb.allocateId();
        const initializer = (0, ts_util_1.tsCreateElement)(...this.element.tagNames);
        (0, diagnostics_1.addParseSpanInfo)(initializer, this.element.sourceSpan);
        this.scope.addStatement((0, ts_util_1.tsCreateVariable)(id, initializer));
        return id;
    }
}
/**
 * A `TcbOp` which creates an expression for a native DOM element from a `TmplAstComponent`.
 *
 * Executing this operation returns a reference to the element variable.
 */
class TcbComponentNodeOp extends TcbOp {
    constructor(tcb, scope, component) {
        super();
        this.tcb = tcb;
        this.scope = scope;
        this.component = component;
        this.optional = true;
    }
    execute() {
        const id = this.tcb.allocateId();
        const initializer = (0, ts_util_1.tsCreateElement)(getComponentTagName(this.component));
        (0, diagnostics_1.addParseSpanInfo)(initializer, this.component.startSourceSpan || this.component.sourceSpan);
        this.scope.addStatement((0, ts_util_1.tsCreateVariable)(id, initializer));
        return id;
    }
}
/**
 * Mapping between attributes names that don't correspond to their element property names.
 * Note: this mapping has to be kept in sync with the equally named mapping in the runtime.
 */
const ATTR_TO_PROP = new Map(Object.entries({
    'class': 'className',
    'for': 'htmlFor',
    'formaction': 'formAction',
    'innerHtml': 'innerHTML',
    'readonly': 'readOnly',
    'tabindex': 'tabIndex',
}));
/**
 * A `TcbOp` which generates code to check "unclaimed inputs" - bindings on an element which were
 * not attributed to any directive or component, and are instead processed against the HTML element
 * itself.
 *
 * Currently, only the expressions of these bindings are checked. The targets of the bindings are
 * checked against the DOM schema via a `TcbDomSchemaCheckerOp`.
 *
 * Executing this operation returns nothing.
 */
class TcbUnclaimedInputsOp extends TcbOp {
    constructor(tcb, scope, inputs, target, claimedInputs) {
        super();
        this.tcb = tcb;
        this.scope = scope;
        this.inputs = inputs;
        this.target = target;
        this.claimedInputs = claimedInputs;
    }
    get optional() {
        return false;
    }
    execute() {
        var _a, _b;
        // `this.inputs` contains only those bindings not matched by any directive. These bindings go to
        // the element itself.
        let elId = null;
        // TODO(alxhub): this could be more efficient.
        for (const binding of this.inputs) {
            const isPropertyBinding = binding.type === compiler_1.BindingType.Property || binding.type === compiler_1.BindingType.TwoWay;
            if (isPropertyBinding && ((_a = this.claimedInputs) === null || _a === void 0 ? void 0 : _a.has(binding.name))) {
                // Skip this binding as it was claimed by a directive.
                continue;
            }
            const expr = widenBinding(tcbExpression(binding.value, this.tcb, this.scope), this.tcb);
            if (this.tcb.env.config.checkTypeOfDomBindings && isPropertyBinding) {
                if (binding.name !== 'style' && binding.name !== 'class') {
                    if (elId === null) {
                        elId = this.scope.resolve(this.target);
                    }
                    // A direct binding to a property.
                    const propertyName = (_b = ATTR_TO_PROP.get(binding.name)) !== null && _b !== void 0 ? _b : binding.name;
                    const prop = typescript_1.default.factory.createElementAccessExpression(elId, typescript_1.default.factory.createStringLiteral(propertyName));
                    const stmt = typescript_1.default.factory.createBinaryExpression(prop, typescript_1.default.SyntaxKind.EqualsToken, (0, diagnostics_1.wrapForDiagnostics)(expr));
                    (0, diagnostics_1.addParseSpanInfo)(stmt, binding.sourceSpan);
                    this.scope.addStatement(typescript_1.default.factory.createExpressionStatement(stmt));
                }
                else {
                    this.scope.addStatement(typescript_1.default.factory.createExpressionStatement(expr));
                }
            }
            else {
                // A binding to an animation, attribute, class or style. For now, only validate the right-
                // hand side of the expression.
                // TODO: properly check class and style bindings.
                this.scope.addStatement(typescript_1.default.factory.createExpressionStatement(expr));
            }
        }
        return null;
    }
}
/**
 * A `TcbOp` which generates code to check event bindings on an element that correspond with the
 * outputs of a directive.
 *
 * Executing this operation returns nothing.
 */
class TcbDirectiveOutputsOp extends TcbOp {
    constructor(tcb, scope, node, dir) {
        super();
        this.tcb = tcb;
        this.scope = scope;
        this.node = node;
        this.dir = dir;
    }
    get optional() {
        return false;
    }
    execute() {
        let dirId = null;
        const outputs = this.dir.outputs;
        for (const output of this.node.outputs) {
            if (output.type === compiler_1.ParsedEventType.Animation ||
                !outputs.hasBindingPropertyName(output.name)) {
                continue;
            }
            if (this.tcb.env.config.checkTypeOfOutputEvents && output.name.endsWith('Change')) {
                const inputName = output.name.slice(0, -6);
                checkSplitTwoWayBinding(inputName, output, this.node.inputs, this.tcb);
            }
            // TODO(alxhub): consider supporting multiple fields with the same property name for outputs.
            const field = outputs.getByBindingPropertyName(output.name)[0].classPropertyName;
            if (dirId === null) {
                dirId = this.scope.resolve(this.node, this.dir);
            }
            const outputField = typescript_1.default.factory.createElementAccessExpression(dirId, typescript_1.default.factory.createStringLiteral(field));
            (0, diagnostics_1.addParseSpanInfo)(outputField, output.keySpan);
            if (this.tcb.env.config.checkTypeOfOutputEvents) {
                // For strict checking of directive events, generate a call to the `subscribe` method
                // on the directive's output field to let type information flow into the handler function's
                // `$event` parameter.
                const handler = tcbCreateEventHandler(output, this.tcb, this.scope, 0 /* EventParamType.Infer */);
                const subscribeFn = typescript_1.default.factory.createPropertyAccessExpression(outputField, 'subscribe');
                const call = typescript_1.default.factory.createCallExpression(subscribeFn, /* typeArguments */ undefined, [
                    handler,
                ]);
                (0, diagnostics_1.addParseSpanInfo)(call, output.sourceSpan);
                this.scope.addStatement(typescript_1.default.factory.createExpressionStatement(call));
            }
            else {
                // If strict checking of directive events is disabled:
                //
                // * We still generate the access to the output field as a statement in the TCB so consumers
                //   of the `TemplateTypeChecker` can still find the node for the class member for the
                //   output.
                // * Emit a handler function where the `$event` parameter has an explicit `any` type.
                this.scope.addStatement(typescript_1.default.factory.createExpressionStatement(outputField));
                const handler = tcbCreateEventHandler(output, this.tcb, this.scope, 1 /* EventParamType.Any */);
                this.scope.addStatement(typescript_1.default.factory.createExpressionStatement(handler));
            }
        }
        return null;
    }
}
exports.TcbDirectiveOutputsOp = TcbDirectiveOutputsOp;
/**
 * A `TcbOp` which generates code to check "unclaimed outputs" - event bindings on an element which
 * were not attributed to any directive or component, and are instead processed against the HTML
 * element itself.
 *
 * Executing this operation returns nothing.
 */
class TcbUnclaimedOutputsOp extends TcbOp {
    constructor(tcb, scope, target, outputs, inputs, claimedOutputs) {
        super();
        this.tcb = tcb;
        this.scope = scope;
        this.target = target;
        this.outputs = outputs;
        this.inputs = inputs;
        this.claimedOutputs = claimedOutputs;
    }
    get optional() {
        return false;
    }
    execute() {
        var _a;
        let elId = null;
        // TODO(alxhub): this could be more efficient.
        for (const output of this.outputs) {
            if ((_a = this.claimedOutputs) === null || _a === void 0 ? void 0 : _a.has(output.name)) {
                // Skip this event handler as it was claimed by a directive.
                continue;
            }
            if (this.tcb.env.config.checkTypeOfOutputEvents &&
                this.inputs !== null &&
                output.name.endsWith('Change')) {
                const inputName = output.name.slice(0, -6);
                if (checkSplitTwoWayBinding(inputName, output, this.inputs, this.tcb)) {
                    // Skip this event handler as the error was already handled.
                    continue;
                }
            }
            if (output.type === compiler_1.ParsedEventType.Animation) {
                // Animation output bindings always have an `$event` parameter of type `AnimationEvent`.
                const eventType = this.tcb.env.config.checkTypeOfAnimationEvents
                    ? this.tcb.env.referenceExternalType('@angular/animations', 'AnimationEvent')
                    : 1 /* EventParamType.Any */;
                const handler = tcbCreateEventHandler(output, this.tcb, this.scope, eventType);
                this.scope.addStatement(typescript_1.default.factory.createExpressionStatement(handler));
            }
            else if (this.tcb.env.config.checkTypeOfDomEvents) {
                // If strict checking of DOM events is enabled, generate a call to `addEventListener` on
                // the element instance so that TypeScript's type inference for
                // `HTMLElement.addEventListener` using `HTMLElementEventMap` to infer an accurate type for
                // `$event` depending on the event name. For unknown event names, TypeScript resorts to the
                // base `Event` type.
                const handler = tcbCreateEventHandler(output, this.tcb, this.scope, 0 /* EventParamType.Infer */);
                let target;
                // Only check for `window` and `document` since in theory any target can be passed.
                if (output.target === 'window' || output.target === 'document') {
                    target = typescript_1.default.factory.createIdentifier(output.target);
                }
                else if (elId === null) {
                    target = elId = this.scope.resolve(this.target);
                }
                else {
                    target = elId;
                }
                const propertyAccess = typescript_1.default.factory.createPropertyAccessExpression(target, 'addEventListener');
                (0, diagnostics_1.addParseSpanInfo)(propertyAccess, output.keySpan);
                const call = typescript_1.default.factory.createCallExpression(
                /* expression */ propertyAccess, 
                /* typeArguments */ undefined, 
                /* arguments */ [typescript_1.default.factory.createStringLiteral(output.name), handler]);
                (0, diagnostics_1.addParseSpanInfo)(call, output.sourceSpan);
                this.scope.addStatement(typescript_1.default.factory.createExpressionStatement(call));
            }
            else {
                // If strict checking of DOM inputs is disabled, emit a handler function where the `$event`
                // parameter has an explicit `any` type.
                const handler = tcbCreateEventHandler(output, this.tcb, this.scope, 1 /* EventParamType.Any */);
                this.scope.addStatement(typescript_1.default.factory.createExpressionStatement(handler));
            }
        }
        return null;
    }
}
/**
 * A `TcbOp` which generates a completion point for the component context.
 *
 * This completion point looks like `this. ;` in the TCB output, and does not produce diagnostics.
 * TypeScript autocompletion APIs can be used at this completion point (after the '.') to produce
 * autocompletion results of properties and methods from the template's component context.
 */
class TcbComponentContextCompletionOp extends TcbOp {
    constructor(scope) {
        super();
        this.scope = scope;
        this.optional = false;
    }
    execute() {
        const ctx = typescript_1.default.factory.createThis();
        const ctxDot = typescript_1.default.factory.createPropertyAccessExpression(ctx, '');
        (0, comments_1.markIgnoreDiagnostics)(ctxDot);
        (0, comments_1.addExpressionIdentifier)(ctxDot, comments_1.ExpressionIdentifier.COMPONENT_COMPLETION);
        this.scope.addStatement(typescript_1.default.factory.createExpressionStatement(ctxDot));
        return null;
    }
}
/**
 * A `TcbOp` which renders a variable defined inside of block syntax (e.g. `@if (expr; as var) {}`).
 *
 * Executing this operation returns the identifier which can be used to refer to the variable.
 */
class TcbBlockVariableOp extends TcbOp {
    constructor(tcb, scope, initializer, variable) {
        super();
        this.tcb = tcb;
        this.scope = scope;
        this.initializer = initializer;
        this.variable = variable;
    }
    get optional() {
        return false;
    }
    execute() {
        const id = this.tcb.allocateId();
        (0, diagnostics_1.addParseSpanInfo)(id, this.variable.keySpan);
        const variable = (0, ts_util_1.tsCreateVariable)(id, (0, diagnostics_1.wrapForTypeChecker)(this.initializer));
        (0, diagnostics_1.addParseSpanInfo)(variable.declarationList.declarations[0], this.variable.sourceSpan);
        this.scope.addStatement(variable);
        return id;
    }
}
/**
 * A `TcbOp` which renders a variable that is implicitly available within a block (e.g. `$count`
 * in a `@for` block).
 *
 * Executing this operation returns the identifier which can be used to refer to the variable.
 */
class TcbBlockImplicitVariableOp extends TcbOp {
    constructor(tcb, scope, type, variable) {
        super();
        this.tcb = tcb;
        this.scope = scope;
        this.type = type;
        this.variable = variable;
        this.optional = true;
    }
    execute() {
        const id = this.tcb.allocateId();
        (0, diagnostics_1.addParseSpanInfo)(id, this.variable.keySpan);
        const variable = (0, ts_util_1.tsDeclareVariable)(id, this.type);
        (0, diagnostics_1.addParseSpanInfo)(variable.declarationList.declarations[0], this.variable.sourceSpan);
        this.scope.addStatement(variable);
        return id;
    }
}
/**
 * A `TcbOp` which renders an `if` template block as a TypeScript `if` statement.
 *
 * Executing this operation returns nothing.
 */
class TcbIfOp extends TcbOp {
    constructor(tcb, scope, block) {
        super();
        this.tcb = tcb;
        this.scope = scope;
        this.block = block;
        this.expressionScopes = new Map();
    }
    get optional() {
        return false;
    }
    execute() {
        const root = this.generateBranch(0);
        root && this.scope.addStatement(root);
        return null;
    }
    generateBranch(index) {
        const branch = this.block.branches[index];
        if (!branch) {
            return undefined;
        }
        // If the expression is null, it means that it's an `else` statement.
        if (branch.expression === null) {
            const branchScope = this.getBranchScope(this.scope, branch, index);
            return typescript_1.default.factory.createBlock(branchScope.render());
        }
        // We process the expression first in the parent scope, but create a scope around the block
        // that the body will inherit from. We do this, because we need to declare a separate variable
        // for the case where the expression has an alias _and_ because we need the processed
        // expression when generating the guard for the body.
        const outerScope = Scope.forNodes(this.tcb, this.scope, branch, [], null);
        outerScope.render().forEach((stmt) => this.scope.addStatement(stmt));
        this.expressionScopes.set(branch, outerScope);
        let expression = tcbExpression(branch.expression, this.tcb, this.scope);
        if (branch.expressionAlias !== null) {
            expression = typescript_1.default.factory.createBinaryExpression(typescript_1.default.factory.createParenthesizedExpression(expression), typescript_1.default.SyntaxKind.AmpersandAmpersandToken, outerScope.resolve(branch.expressionAlias));
        }
        const bodyScope = this.getBranchScope(outerScope, branch, index);
        return typescript_1.default.factory.createIfStatement(expression, typescript_1.default.factory.createBlock(bodyScope.render()), this.generateBranch(index + 1));
    }
    getBranchScope(parentScope, branch, index) {
        const checkBody = this.tcb.env.config.checkControlFlowBodies;
        return Scope.forNodes(this.tcb, parentScope, null, checkBody ? branch.children : [], checkBody ? this.generateBranchGuard(index) : null);
    }
    generateBranchGuard(index) {
        let guard = null;
        // Since event listeners are inside callbacks, type narrowing doesn't apply to them anymore.
        // To recreate the behavior, we generate an expression that negates all the values of the
        // branches _before_ the current one, and then we add the current branch's expression on top.
        // For example `@if (expr === 1) {} @else if (expr === 2) {} @else if (expr === 3)`, the guard
        // for the last expression will be `!(expr === 1) && !(expr === 2) && expr === 3`.
        for (let i = 0; i <= index; i++) {
            const branch = this.block.branches[i];
            // Skip over branches without an expression.
            if (branch.expression === null) {
                continue;
            }
            // This shouldn't happen since all the state is handled
            // internally, but we have the check just in case.
            if (!this.expressionScopes.has(branch)) {
                throw new Error(`Could not determine expression scope of branch at index ${i}`);
            }
            const expressionScope = this.expressionScopes.get(branch);
            let expression;
            // We need to recreate the expression and mark it to be ignored for diagnostics,
            // because it was already checked as a part of the block's condition and we don't
            // want it to produce a duplicate diagnostic.
            expression = tcbExpression(branch.expression, this.tcb, expressionScope);
            if (branch.expressionAlias !== null) {
                expression = typescript_1.default.factory.createBinaryExpression(typescript_1.default.factory.createParenthesizedExpression(expression), typescript_1.default.SyntaxKind.AmpersandAmpersandToken, expressionScope.resolve(branch.expressionAlias));
            }
            (0, comments_1.markIgnoreDiagnostics)(expression);
            // The expressions of the preceding branches have to be negated
            // (e.g. `expr` becomes `!(expr)`) when comparing in the guard, except
            // for the branch's own expression which is preserved as is.
            const comparisonExpression = i === index
                ? expression
                : typescript_1.default.factory.createPrefixUnaryExpression(typescript_1.default.SyntaxKind.ExclamationToken, typescript_1.default.factory.createParenthesizedExpression(expression));
            // Finally add the expression to the guard with an && operator.
            guard =
                guard === null
                    ? comparisonExpression
                    : typescript_1.default.factory.createBinaryExpression(guard, typescript_1.default.SyntaxKind.AmpersandAmpersandToken, comparisonExpression);
        }
        return guard;
    }
}
/**
 * A `TcbOp` which renders a `switch` block as a TypeScript `switch` statement.
 *
 * Executing this operation returns nothing.
 */
class TcbSwitchOp extends TcbOp {
    constructor(tcb, scope, block) {
        super();
        this.tcb = tcb;
        this.scope = scope;
        this.block = block;
    }
    get optional() {
        return false;
    }
    execute() {
        const switchExpression = tcbExpression(this.block.expression, this.tcb, this.scope);
        const clauses = this.block.cases.map((current) => {
            const checkBody = this.tcb.env.config.checkControlFlowBodies;
            const clauseScope = Scope.forNodes(this.tcb, this.scope, null, checkBody ? current.children : [], checkBody ? this.generateGuard(current, switchExpression) : null);
            const statements = [...clauseScope.render(), typescript_1.default.factory.createBreakStatement()];
            return current.expression === null
                ? typescript_1.default.factory.createDefaultClause(statements)
                : typescript_1.default.factory.createCaseClause(tcbExpression(current.expression, this.tcb, clauseScope), statements);
        });
        this.scope.addStatement(typescript_1.default.factory.createSwitchStatement(switchExpression, typescript_1.default.factory.createCaseBlock(clauses)));
        return null;
    }
    generateGuard(node, switchValue) {
        // For non-default cases, the guard needs to compare against the case value, e.g.
        // `switchExpression === caseExpression`.
        if (node.expression !== null) {
            // The expression needs to be ignored for diagnostics since it has been checked already.
            const expression = tcbExpression(node.expression, this.tcb, this.scope);
            (0, comments_1.markIgnoreDiagnostics)(expression);
            return typescript_1.default.factory.createBinaryExpression(switchValue, typescript_1.default.SyntaxKind.EqualsEqualsEqualsToken, expression);
        }
        // To fully narrow the type in the default case, we need to generate an expression that negates
        // the values of all of the other expressions. For example:
        // @switch (expr) {
        //   @case (1) {}
        //   @case (2) {}
        //   @default {}
        // }
        // Will produce the guard `expr !== 1 && expr !== 2`.
        let guard = null;
        for (const current of this.block.cases) {
            if (current.expression === null) {
                continue;
            }
            // The expression needs to be ignored for diagnostics since it has been checked already.
            const expression = tcbExpression(current.expression, this.tcb, this.scope);
            (0, comments_1.markIgnoreDiagnostics)(expression);
            const comparison = typescript_1.default.factory.createBinaryExpression(switchValue, typescript_1.default.SyntaxKind.ExclamationEqualsEqualsToken, expression);
            if (guard === null) {
                guard = comparison;
            }
            else {
                guard = typescript_1.default.factory.createBinaryExpression(guard, typescript_1.default.SyntaxKind.AmpersandAmpersandToken, comparison);
            }
        }
        return guard;
    }
}
/**
 * A `TcbOp` which renders a `for` block as a TypeScript `for...of` loop.
 *
 * Executing this operation returns nothing.
 */
class TcbForOfOp extends TcbOp {
    constructor(tcb, scope, block) {
        super();
        this.tcb = tcb;
        this.scope = scope;
        this.block = block;
    }
    get optional() {
        return false;
    }
    execute() {
        const loopScope = Scope.forNodes(this.tcb, this.scope, this.block, this.tcb.env.config.checkControlFlowBodies ? this.block.children : [], null);
        const initializerId = loopScope.resolve(this.block.item);
        if (!typescript_1.default.isIdentifier(initializerId)) {
            throw new Error(`Could not resolve for loop variable ${this.block.item.name} to an identifier`);
        }
        const initializer = typescript_1.default.factory.createVariableDeclarationList([typescript_1.default.factory.createVariableDeclaration(initializerId)], typescript_1.default.NodeFlags.Const);
        (0, diagnostics_1.addParseSpanInfo)(initializer, this.block.item.keySpan);
        // It's common to have a for loop over a nullable value (e.g. produced by the `async` pipe).
        // Add a non-null expression to allow such values to be assigned.
        const expression = typescript_1.default.factory.createNonNullExpression(tcbExpression(this.block.expression, this.tcb, this.scope));
        const trackTranslator = new TcbForLoopTrackTranslator(this.tcb, loopScope, this.block);
        const trackExpression = trackTranslator.translate(this.block.trackBy);
        const statements = [
            ...loopScope.render(),
            typescript_1.default.factory.createExpressionStatement(trackExpression),
        ];
        this.scope.addStatement(typescript_1.default.factory.createForOfStatement(undefined, initializer, expression, typescript_1.default.factory.createBlock(statements)));
        return null;
    }
}
/**
 * Value used to break a circular reference between `TcbOp`s.
 *
 * This value is returned whenever `TcbOp`s have a circular dependency. The expression is a non-null
 * assertion of the null value (in TypeScript, the expression `null!`). This construction will infer
 * the least narrow type for whatever it's assigned to.
 */
const INFER_TYPE_FOR_CIRCULAR_OP_EXPR = typescript_1.default.factory.createNonNullExpression(typescript_1.default.factory.createNull());
/**
 * Overall generation context for the type check block.
 *
 * `Context` handles operations during code generation which are global with respect to the whole
 * block. It's responsible for variable name allocation and management of any imports needed. It
 * also contains the template metadata itself.
 */
class Context {
    constructor(env, domSchemaChecker, oobRecorder, id, boundTarget, pipes, schemas, hostIsStandalone, hostPreserveWhitespaces) {
        this.env = env;
        this.domSchemaChecker = domSchemaChecker;
        this.oobRecorder = oobRecorder;
        this.id = id;
        this.boundTarget = boundTarget;
        this.pipes = pipes;
        this.schemas = schemas;
        this.hostIsStandalone = hostIsStandalone;
        this.hostPreserveWhitespaces = hostPreserveWhitespaces;
        this.nextId = 1;
    }
    /**
     * Allocate a new variable name for use within the `Context`.
     *
     * Currently this uses a monotonically increasing counter, but in the future the variable name
     * might change depending on the type of data being stored.
     */
    allocateId() {
        return typescript_1.default.factory.createIdentifier(`_t${this.nextId++}`);
    }
    getPipeByName(name) {
        if (this.pipes === null || !this.pipes.has(name)) {
            return null;
        }
        return this.pipes.get(name);
    }
}
exports.Context = Context;
/**
 * Local scope within the type check block for a particular template.
 *
 * The top-level template and each nested `<ng-template>` have their own `Scope`, which exist in a
 * hierarchy. The structure of this hierarchy mirrors the syntactic scopes in the generated type
 * check block, where each nested template is encased in an `if` structure.
 *
 * As a template's `TcbOp`s are executed in a given `Scope`, statements are added via
 * `addStatement()`. When this processing is complete, the `Scope` can be turned into a `ts.Block`
 * via `renderToBlock()`.
 *
 * If a `TcbOp` requires the output of another, it can call `resolve()`.
 */
class Scope {
    constructor(tcb, parent = null, guard = null) {
        this.tcb = tcb;
        this.parent = parent;
        this.guard = guard;
        /**
         * A queue of operations which need to be performed to generate the TCB code for this scope.
         *
         * This array can contain either a `TcbOp` which has yet to be executed, or a `ts.Expression|null`
         * representing the memoized result of executing the operation. As operations are executed, their
         * results are written into the `opQueue`, overwriting the original operation.
         *
         * If an operation is in the process of being executed, it is temporarily overwritten here with
         * `INFER_TYPE_FOR_CIRCULAR_OP_EXPR`. This way, if a cycle is encountered where an operation
         * depends transitively on its own result, the inner operation will infer the least narrow type
         * that fits instead. This has the same semantics as TypeScript itself when types are referenced
         * circularly.
         */
        this.opQueue = [];
        /**
         * A map of `TmplAstElement`s to the index of their `TcbElementOp` in the `opQueue`
         */
        this.elementOpMap = new Map();
        /**
         * A map of `TmplAstHostElement`s to the index of their `TcbHostElementOp` in the `opQueue`
         */
        this.hostElementOpMap = new Map();
        /**
         * A map of `TmplAstComponent`s to the index of their `TcbComponentNodeOp` in the `opQueue`
         */
        this.componentNodeOpMap = new Map();
        /**
         * A map of maps which tracks the index of `TcbDirectiveCtorOp`s in the `opQueue` for each
         * directive on a `TmplAstElement` or `TmplAstTemplate` node.
         */
        this.directiveOpMap = new Map();
        /**
         * A map of `TmplAstReference`s to the index of their `TcbReferenceOp` in the `opQueue`
         */
        this.referenceOpMap = new Map();
        /**
         * Map of immediately nested <ng-template>s (within this `Scope`) represented by `TmplAstTemplate`
         * nodes to the index of their `TcbTemplateContextOp`s in the `opQueue`.
         */
        this.templateCtxOpMap = new Map();
        /**
         * Map of variables declared on the template that created this `Scope` (represented by
         * `TmplAstVariable` nodes) to the index of their `TcbVariableOp`s in the `opQueue`, or to
         * pre-resolved variable identifiers.
         */
        this.varMap = new Map();
        /**
         * A map of the names of `TmplAstLetDeclaration`s to the index of their op in the `opQueue`.
         *
         * Assumes that there won't be duplicated `@let` declarations within the same scope.
         */
        this.letDeclOpMap = new Map();
        /**
         * Statements for this template.
         *
         * Executing the `TcbOp`s in the `opQueue` populates this array.
         */
        this.statements = [];
    }
    /**
     * Constructs a `Scope` given either a `TmplAstTemplate` or a list of `TmplAstNode`s.
     *
     * @param tcb the overall context of TCB generation.
     * @param parentScope the `Scope` of the parent template (if any) or `null` if this is the root
     * `Scope`.
     * @param scopedNode Node that provides the scope around the child nodes (e.g. a
     * `TmplAstTemplate` node exposing variables to its children).
     * @param children Child nodes that should be appended to the TCB.
     * @param guard an expression that is applied to this scope for type narrowing purposes.
     */
    static forNodes(tcb, parentScope, scopedNode, children, guard) {
        const scope = new Scope(tcb, parentScope, guard);
        if (parentScope === null && tcb.env.config.enableTemplateTypeChecker) {
            // Add an autocompletion point for the component context.
            scope.opQueue.push(new TcbComponentContextCompletionOp(scope));
        }
        // If given an actual `TmplAstTemplate` instance, then process any additional information it
        // has.
        if (scopedNode instanceof compiler_1.TmplAstTemplate) {
            // The template's variable declarations need to be added as `TcbVariableOp`s.
            const varMap = new Map();
            for (const v of scopedNode.variables) {
                // Validate that variables on the `TmplAstTemplate` are only declared once.
                if (!varMap.has(v.name)) {
                    varMap.set(v.name, v);
                }
                else {
                    const firstDecl = varMap.get(v.name);
                    tcb.oobRecorder.duplicateTemplateVar(tcb.id, v, firstDecl);
                }
                this.registerVariable(scope, v, new TcbTemplateVariableOp(tcb, scope, scopedNode, v));
            }
        }
        else if (scopedNode instanceof compiler_1.TmplAstIfBlockBranch) {
            const { expression, expressionAlias } = scopedNode;
            if (expression !== null && expressionAlias !== null) {
                this.registerVariable(scope, expressionAlias, new TcbBlockVariableOp(tcb, scope, tcbExpression(expression, tcb, scope), expressionAlias));
            }
        }
        else if (scopedNode instanceof compiler_1.TmplAstForLoopBlock) {
            // Register the variable for the loop so it can be resolved by
            // children. It'll be declared once the loop is created.
            const loopInitializer = tcb.allocateId();
            (0, diagnostics_1.addParseSpanInfo)(loopInitializer, scopedNode.item.sourceSpan);
            scope.varMap.set(scopedNode.item, loopInitializer);
            for (const variable of scopedNode.contextVariables) {
                if (!this.forLoopContextVariableTypes.has(variable.value)) {
                    throw new Error(`Unrecognized for loop context variable ${variable.name}`);
                }
                const type = typescript_1.default.factory.createKeywordTypeNode(this.forLoopContextVariableTypes.get(variable.value));
                this.registerVariable(scope, variable, new TcbBlockImplicitVariableOp(tcb, scope, type, variable));
            }
        }
        else if (scopedNode instanceof compiler_1.TmplAstHostElement) {
            scope.appendNode(scopedNode);
        }
        if (children !== null) {
            for (const node of children) {
                scope.appendNode(node);
            }
        }
        // Once everything is registered, we need to check if there are `@let`
        // declarations that conflict with other local symbols defined after them.
        for (const variable of scope.varMap.keys()) {
            Scope.checkConflictingLet(scope, variable);
        }
        for (const ref of scope.referenceOpMap.keys()) {
            Scope.checkConflictingLet(scope, ref);
        }
        return scope;
    }
    /** Registers a local variable with a scope. */
    static registerVariable(scope, variable, op) {
        const opIndex = scope.opQueue.push(op) - 1;
        scope.varMap.set(variable, opIndex);
    }
    /**
     * Look up a `ts.Expression` representing the value of some operation in the current `Scope`,
     * including any parent scope(s). This method always returns a mutable clone of the
     * `ts.Expression` with the comments cleared.
     *
     * @param node a `TmplAstNode` of the operation in question. The lookup performed will depend on
     * the type of this node:
     *
     * Assuming `directive` is not present, then `resolve` will return:
     *
     * * `TmplAstElement` - retrieve the expression for the element DOM node
     * * `TmplAstTemplate` - retrieve the template context variable
     * * `TmplAstVariable` - retrieve a template let- variable
     * * `TmplAstLetDeclaration` - retrieve a template `@let` declaration
     * * `TmplAstReference` - retrieve variable created for the local ref
     *
     * @param directive if present, a directive type on a `TmplAstElement` or `TmplAstTemplate` to
     * look up instead of the default for an element or template node.
     */
    resolve(node, directive) {
        // Attempt to resolve the operation locally.
        const res = this.resolveLocal(node, directive);
        if (res !== null) {
            // We want to get a clone of the resolved expression and clear the trailing comments
            // so they don't continue to appear in every place the expression is used.
            // As an example, this would otherwise produce:
            // var _t1 /**T:DIR*/ /*1,2*/ = _ctor1();
            // _t1 /**T:DIR*/ /*1,2*/.input = 'value';
            //
            // In addition, returning a clone prevents the consumer of `Scope#resolve` from
            // attaching comments at the declaration site.
            let clone;
            if (typescript_1.default.isIdentifier(res)) {
                clone = typescript_1.default.factory.createIdentifier(res.text);
            }
            else if (typescript_1.default.isNonNullExpression(res)) {
                clone = typescript_1.default.factory.createNonNullExpression(res.expression);
            }
            else {
                throw new Error(`Could not resolve ${node} to an Identifier or a NonNullExpression`);
            }
            typescript_1.default.setOriginalNode(clone, res);
            clone.parent = clone.parent;
            return typescript_1.default.setSyntheticTrailingComments(clone, []);
        }
        else if (this.parent !== null) {
            // Check with the parent.
            return this.parent.resolve(node, directive);
        }
        else {
            throw new Error(`Could not resolve ${node} / ${directive}`);
        }
    }
    /**
     * Add a statement to this scope.
     */
    addStatement(stmt) {
        this.statements.push(stmt);
    }
    /**
     * Get the statements.
     */
    render() {
        for (let i = 0; i < this.opQueue.length; i++) {
            // Optional statements cannot be skipped when we are generating the TCB for use
            // by the TemplateTypeChecker.
            const skipOptional = !this.tcb.env.config.enableTemplateTypeChecker;
            this.executeOp(i, skipOptional);
        }
        return this.statements;
    }
    /**
     * Returns an expression of all template guards that apply to this scope, including those of
     * parent scopes. If no guards have been applied, null is returned.
     */
    guards() {
        let parentGuards = null;
        if (this.parent !== null) {
            // Start with the guards from the parent scope, if present.
            parentGuards = this.parent.guards();
        }
        if (this.guard === null) {
            // This scope does not have a guard, so return the parent's guards as is.
            return parentGuards;
        }
        else if (parentGuards === null) {
            // There's no guards from the parent scope, so this scope's guard represents all available
            // guards.
            return this.guard;
        }
        else {
            // Both the parent scope and this scope provide a guard, so create a combination of the two.
            // It is important that the parent guard is used as left operand, given that it may provide
            // narrowing that is required for this scope's guard to be valid.
            return typescript_1.default.factory.createBinaryExpression(parentGuards, typescript_1.default.SyntaxKind.AmpersandAmpersandToken, this.guard);
        }
    }
    /** Returns whether a template symbol is defined locally within the current scope. */
    isLocal(node) {
        if (node instanceof compiler_1.TmplAstVariable) {
            return this.varMap.has(node);
        }
        if (node instanceof compiler_1.TmplAstLetDeclaration) {
            return this.letDeclOpMap.has(node.name);
        }
        return this.referenceOpMap.has(node);
    }
    resolveLocal(ref, directive) {
        if (ref instanceof compiler_1.TmplAstReference && this.referenceOpMap.has(ref)) {
            return this.resolveOp(this.referenceOpMap.get(ref));
        }
        else if (ref instanceof compiler_1.TmplAstLetDeclaration && this.letDeclOpMap.has(ref.name)) {
            return this.resolveOp(this.letDeclOpMap.get(ref.name).opIndex);
        }
        else if (ref instanceof compiler_1.TmplAstVariable && this.varMap.has(ref)) {
            // Resolving a context variable for this template.
            // Execute the `TcbVariableOp` associated with the `TmplAstVariable`.
            const opIndexOrNode = this.varMap.get(ref);
            return typeof opIndexOrNode === 'number' ? this.resolveOp(opIndexOrNode) : opIndexOrNode;
        }
        else if (ref instanceof compiler_1.TmplAstTemplate &&
            directive === undefined &&
            this.templateCtxOpMap.has(ref)) {
            // Resolving the context of the given sub-template.
            // Execute the `TcbTemplateContextOp` for the template.
            return this.resolveOp(this.templateCtxOpMap.get(ref));
        }
        else if ((ref instanceof compiler_1.TmplAstElement ||
            ref instanceof compiler_1.TmplAstTemplate ||
            ref instanceof compiler_1.TmplAstComponent ||
            ref instanceof compiler_1.TmplAstDirective) &&
            directive !== undefined &&
            this.directiveOpMap.has(ref)) {
            // Resolving a directive on an element or sub-template.
            const dirMap = this.directiveOpMap.get(ref);
            return dirMap.has(directive) ? this.resolveOp(dirMap.get(directive)) : null;
        }
        else if (ref instanceof compiler_1.TmplAstElement && this.elementOpMap.has(ref)) {
            // Resolving the DOM node of an element in this template.
            return this.resolveOp(this.elementOpMap.get(ref));
        }
        else if (ref instanceof compiler_1.TmplAstComponent && this.componentNodeOpMap.has(ref)) {
            return this.resolveOp(this.componentNodeOpMap.get(ref));
        }
        else if (ref instanceof compiler_1.TmplAstHostElement && this.hostElementOpMap.has(ref)) {
            return this.resolveOp(this.hostElementOpMap.get(ref));
        }
        else {
            return null;
        }
    }
    /**
     * Like `executeOp`, but assert that the operation actually returned `ts.Expression`.
     */
    resolveOp(opIndex) {
        const res = this.executeOp(opIndex, /* skipOptional */ false);
        if (res === null) {
            throw new Error(`Error resolving operation, got null`);
        }
        return res;
    }
    /**
     * Execute a particular `TcbOp` in the `opQueue`.
     *
     * This method replaces the operation in the `opQueue` with the result of execution (once done)
     * and also protects against a circular dependency from the operation to itself by temporarily
     * setting the operation's result to a special expression.
     */
    executeOp(opIndex, skipOptional) {
        const op = this.opQueue[opIndex];
        if (!(op instanceof TcbOp)) {
            return op;
        }
        if (skipOptional && op.optional) {
            return null;
        }
        // Set the result of the operation in the queue to its circular fallback. If executing this
        // operation results in a circular dependency, this will prevent an infinite loop and allow for
        // the resolution of such cycles.
        this.opQueue[opIndex] = op.circularFallback();
        const res = op.execute();
        // Once the operation has finished executing, it's safe to cache the real result.
        this.opQueue[opIndex] = res;
        return res;
    }
    appendNode(node) {
        if (node instanceof compiler_1.TmplAstElement) {
            const opIndex = this.opQueue.push(new TcbElementOp(this.tcb, this, node)) - 1;
            this.elementOpMap.set(node, opIndex);
            if (this.tcb.env.config.controlFlowPreventingContentProjection !== 'suppress') {
                this.appendContentProjectionCheckOp(node);
            }
            this.appendDirectivesAndInputsOfElementLikeNode(node);
            this.appendOutputsOfElementLikeNode(node);
            this.appendSelectorlessDirectives(node);
            this.appendChildren(node);
            this.checkAndAppendReferencesOfNode(node);
        }
        else if (node instanceof compiler_1.TmplAstTemplate) {
            // Template children are rendered in a child scope.
            this.appendDirectivesAndInputsOfElementLikeNode(node);
            this.appendOutputsOfElementLikeNode(node);
            this.appendSelectorlessDirectives(node);
            const ctxIndex = this.opQueue.push(new TcbTemplateContextOp(this.tcb, this)) - 1;
            this.templateCtxOpMap.set(node, ctxIndex);
            if (this.tcb.env.config.checkTemplateBodies) {
                this.opQueue.push(new TcbTemplateBodyOp(this.tcb, this, node));
            }
            else if (this.tcb.env.config.alwaysCheckSchemaInTemplateBodies) {
                this.appendDeepSchemaChecks(node.children);
            }
            this.checkAndAppendReferencesOfNode(node);
        }
        else if (node instanceof compiler_1.TmplAstComponent) {
            this.appendComponentNode(node);
        }
        else if (node instanceof compiler_1.TmplAstDeferredBlock) {
            this.appendDeferredBlock(node);
        }
        else if (node instanceof compiler_1.TmplAstIfBlock) {
            this.opQueue.push(new TcbIfOp(this.tcb, this, node));
        }
        else if (node instanceof compiler_1.TmplAstSwitchBlock) {
            this.opQueue.push(new TcbSwitchOp(this.tcb, this, node));
        }
        else if (node instanceof compiler_1.TmplAstForLoopBlock) {
            this.opQueue.push(new TcbForOfOp(this.tcb, this, node));
            node.empty && this.tcb.env.config.checkControlFlowBodies && this.appendChildren(node.empty);
        }
        else if (node instanceof compiler_1.TmplAstBoundText) {
            this.opQueue.push(new TcbExpressionOp(this.tcb, this, node.value));
        }
        else if (node instanceof compiler_1.TmplAstIcu) {
            this.appendIcuExpressions(node);
        }
        else if (node instanceof compiler_1.TmplAstContent) {
            this.appendChildren(node);
        }
        else if (node instanceof compiler_1.TmplAstLetDeclaration) {
            const opIndex = this.opQueue.push(new TcbLetDeclarationOp(this.tcb, this, node)) - 1;
            if (this.isLocal(node)) {
                this.tcb.oobRecorder.conflictingDeclaration(this.tcb.id, node);
            }
            else {
                this.letDeclOpMap.set(node.name, { opIndex, node });
            }
        }
        else if (node instanceof compiler_1.TmplAstHostElement) {
            const opIndex = this.opQueue.push(new TcbHostElementOp(this.tcb, this, node)) - 1;
            this.hostElementOpMap.set(node, opIndex);
            this.opQueue.push(new TcbUnclaimedInputsOp(this.tcb, this, node.bindings, node, null), new TcbUnclaimedOutputsOp(this.tcb, this, node, node.listeners, null, null), new TcbDomSchemaCheckerOp(this.tcb, node, false, null));
        }
    }
    appendChildren(node) {
        for (const child of node.children) {
            this.appendNode(child);
        }
    }
    checkAndAppendReferencesOfNode(node) {
        for (const ref of node.references) {
            const target = this.tcb.boundTarget.getReferenceTarget(ref);
            let ctxIndex;
            if (target === null) {
                // The reference is invalid if it doesn't have a target, so report it as an error.
                this.tcb.oobRecorder.missingReferenceTarget(this.tcb.id, ref);
                // Any usages of the invalid reference will be resolved to a variable of type any.
                ctxIndex = this.opQueue.push(new TcbInvalidReferenceOp(this.tcb, this)) - 1;
            }
            else if (target instanceof compiler_1.TmplAstTemplate || target instanceof compiler_1.TmplAstElement) {
                ctxIndex = this.opQueue.push(new TcbReferenceOp(this.tcb, this, ref, node, target)) - 1;
            }
            else {
                ctxIndex =
                    this.opQueue.push(new TcbReferenceOp(this.tcb, this, ref, node, target.directive)) - 1;
            }
            this.referenceOpMap.set(ref, ctxIndex);
        }
    }
    appendDirectivesAndInputsOfElementLikeNode(node) {
        // Collect all the inputs on the element.
        const claimedInputs = new Set();
        // Don't resolve directives when selectorless is enabled and treat all the inputs on the element
        // as unclaimed. In selectorless the inputs are defined either in component or directive nodes.
        const directives = this.tcb.boundTarget.getDirectivesOfNode(node);
        if (directives === null || directives.length === 0) {
            // If there are no directives, then all inputs are unclaimed inputs, so queue an operation
            // to add them if needed.
            if (node instanceof compiler_1.TmplAstElement) {
                this.opQueue.push(new TcbUnclaimedInputsOp(this.tcb, this, node.inputs, node, claimedInputs), new TcbDomSchemaCheckerOp(this.tcb, node, /* checkElement */ true, claimedInputs));
            }
            return;
        }
        if (node instanceof compiler_1.TmplAstElement) {
            const isDeferred = this.tcb.boundTarget.isDeferred(node);
            if (!isDeferred && directives.some((dirMeta) => dirMeta.isExplicitlyDeferred)) {
                // This node has directives/components that were defer-loaded (included into
                // `@Component.deferredImports`), but the node itself was used outside of a
                // `@defer` block, which is the error.
                this.tcb.oobRecorder.deferredComponentUsedEagerly(this.tcb.id, node);
            }
        }
        const dirMap = new Map();
        for (const dir of directives) {
            this.appendDirectiveInputs(dir, node, dirMap);
        }
        this.directiveOpMap.set(node, dirMap);
        // After expanding the directives, we might need to queue an operation to check any unclaimed
        // inputs.
        if (node instanceof compiler_1.TmplAstElement) {
            // Go through the directives and remove any inputs that it claims from `elementInputs`.
            for (const dir of directives) {
                for (const propertyName of dir.inputs.propertyNames) {
                    claimedInputs.add(propertyName);
                }
            }
            this.opQueue.push(new TcbUnclaimedInputsOp(this.tcb, this, node.inputs, node, claimedInputs));
            // If there are no directives which match this element, then it's a "plain" DOM element (or a
            // web component), and should be checked against the DOM schema. If any directives match,
            // we must assume that the element could be custom (either a component, or a directive like
            // <router-outlet>) and shouldn't validate the element name itself.
            const checkElement = directives.length === 0;
            this.opQueue.push(new TcbDomSchemaCheckerOp(this.tcb, node, checkElement, claimedInputs));
        }
    }
    appendOutputsOfElementLikeNode(node) {
        // Collect all the outputs on the element.
        const claimedOutputs = new Set();
        // Don't resolve directives when selectorless is enabled and treat all the outputs on the
        // element as unclaimed. In selectorless the outputs are defined either in component or
        // directive nodes.
        const directives = this.tcb.boundTarget.getDirectivesOfNode(node);
        if (directives === null || directives.length === 0) {
            // If there are no directives, then all outputs are unclaimed outputs, so queue an operation
            // to add them if needed.
            if (node instanceof compiler_1.TmplAstElement) {
                this.opQueue.push(new TcbUnclaimedOutputsOp(this.tcb, this, node, node.outputs, node.inputs, claimedOutputs));
            }
            return;
        }
        // Queue operations for all directives to check the relevant outputs for a directive.
        for (const dir of directives) {
            this.opQueue.push(new TcbDirectiveOutputsOp(this.tcb, this, node, dir));
        }
        // After expanding the directives, we might need to queue an operation to check any unclaimed
        // outputs.
        if (node instanceof compiler_1.TmplAstElement) {
            // Go through the directives and register any outputs that it claims in `claimedOutputs`.
            for (const dir of directives) {
                for (const outputProperty of dir.outputs.propertyNames) {
                    claimedOutputs.add(outputProperty);
                }
            }
            this.opQueue.push(new TcbUnclaimedOutputsOp(this.tcb, this, node, node.outputs, node.inputs, claimedOutputs));
        }
    }
    appendInputsOfSelectorlessNode(node) {
        // Only resolve the directives that were brought in by this specific directive.
        const directives = this.tcb.boundTarget.getDirectivesOfNode(node);
        const claimedInputs = new Set();
        if (directives !== null && directives.length > 0) {
            const dirMap = new Map();
            for (const dir of directives) {
                this.appendDirectiveInputs(dir, node, dirMap);
                for (const propertyName of dir.inputs.propertyNames) {
                    claimedInputs.add(propertyName);
                }
            }
            this.directiveOpMap.set(node, dirMap);
        }
        // In selectorless all directive inputs have to be claimed.
        if (node instanceof compiler_1.TmplAstDirective) {
            for (const input of node.inputs) {
                if (!claimedInputs.has(input.name)) {
                    this.tcb.oobRecorder.unclaimedDirectiveBinding(this.tcb.id, node, input);
                }
            }
            for (const attr of node.attributes) {
                if (!claimedInputs.has(attr.name)) {
                    this.tcb.oobRecorder.unclaimedDirectiveBinding(this.tcb.id, node, attr);
                }
            }
        }
        else {
            const checkElement = node.tagName !== null;
            this.opQueue.push(new TcbUnclaimedInputsOp(this.tcb, this, node.inputs, node, claimedInputs), new TcbDomSchemaCheckerOp(this.tcb, node, checkElement, claimedInputs));
        }
    }
    appendOutputsOfSelectorlessNode(node) {
        // Only resolve the directives that were brought in by this specific directive.
        const directives = this.tcb.boundTarget.getDirectivesOfNode(node);
        const claimedOutputs = new Set();
        if (directives !== null && directives.length > 0) {
            for (const dir of directives) {
                this.opQueue.push(new TcbDirectiveOutputsOp(this.tcb, this, node, dir));
                for (const outputProperty of dir.outputs.propertyNames) {
                    claimedOutputs.add(outputProperty);
                }
            }
        }
        // In selectorless all directive outputs have to be claimed.
        if (node instanceof compiler_1.TmplAstDirective) {
            for (const output of node.outputs) {
                if (!claimedOutputs.has(output.name)) {
                    this.tcb.oobRecorder.unclaimedDirectiveBinding(this.tcb.id, node, output);
                }
            }
        }
        else {
            this.opQueue.push(new TcbUnclaimedOutputsOp(this.tcb, this, node, node.outputs, node.inputs, claimedOutputs));
        }
    }
    appendDirectiveInputs(dir, node, dirMap) {
        let directiveOp;
        const host = this.tcb.env.reflector;
        const dirRef = dir.ref;
        if (!dir.isGeneric) {
            // The most common case is that when a directive is not generic, we use the normal
            // `TcbNonDirectiveTypeOp`.
            directiveOp = new TcbNonGenericDirectiveTypeOp(this.tcb, this, node, dir);
        }
        else if (!(0, type_constructor_1.requiresInlineTypeCtor)(dirRef.node, host, this.tcb.env) ||
            this.tcb.env.config.useInlineTypeConstructors) {
            // For generic directives, we use a type constructor to infer types. If a directive requires
            // an inline type constructor, then inlining must be available to use the
            // `TcbDirectiveCtorOp`. If not we, we fallback to using `any` – see below.
            directiveOp = new TcbDirectiveCtorOp(this.tcb, this, node, dir);
        }
        else {
            // If inlining is not available, then we give up on inferring the generic params, and use
            // `any` type for the directive's generic parameters.
            directiveOp = new TcbGenericDirectiveTypeWithAnyParamsOp(this.tcb, this, node, dir);
        }
        const dirIndex = this.opQueue.push(directiveOp) - 1;
        dirMap.set(dir, dirIndex);
        this.opQueue.push(new TcbDirectiveInputsOp(this.tcb, this, node, dir));
    }
    appendSelectorlessDirectives(node) {
        for (const directive of node.directives) {
            // Check that the directive exists.
            if (!this.tcb.boundTarget.referencedDirectiveExists(directive.name)) {
                this.tcb.oobRecorder.missingNamedTemplateDependency(this.tcb.id, directive);
                continue;
            }
            // Check that the class is a directive class.
            const directives = this.tcb.boundTarget.getDirectivesOfNode(directive);
            if (directives === null ||
                directives.length === 0 ||
                directives.some((dir) => dir.isComponent || !dir.isStandalone)) {
                this.tcb.oobRecorder.incorrectTemplateDependencyType(this.tcb.id, directive);
                continue;
            }
            this.appendInputsOfSelectorlessNode(directive);
            this.appendOutputsOfSelectorlessNode(directive);
            this.checkAndAppendReferencesOfNode(directive);
        }
    }
    appendDeepSchemaChecks(nodes) {
        for (const node of nodes) {
            if (!(node instanceof compiler_1.TmplAstElement || node instanceof compiler_1.TmplAstTemplate)) {
                continue;
            }
            if (node instanceof compiler_1.TmplAstElement) {
                const claimedInputs = new Set();
                let directives = this.tcb.boundTarget.getDirectivesOfNode(node);
                for (const dirNode of node.directives) {
                    const directiveResults = this.tcb.boundTarget.getDirectivesOfNode(dirNode);
                    if (directiveResults !== null && directiveResults.length > 0) {
                        directives !== null && directives !== void 0 ? directives : (directives = []);
                        directives.push(...directiveResults);
                    }
                }
                let hasDirectives;
                if (directives === null || directives.length === 0) {
                    hasDirectives = false;
                }
                else {
                    hasDirectives = true;
                    for (const dir of directives) {
                        for (const propertyName of dir.inputs.propertyNames) {
                            claimedInputs.add(propertyName);
                        }
                    }
                }
                this.opQueue.push(new TcbDomSchemaCheckerOp(this.tcb, node, !hasDirectives, claimedInputs));
            }
            this.appendDeepSchemaChecks(node.children);
        }
    }
    appendIcuExpressions(node) {
        for (const variable of Object.values(node.vars)) {
            this.opQueue.push(new TcbExpressionOp(this.tcb, this, variable.value));
        }
        for (const placeholder of Object.values(node.placeholders)) {
            if (placeholder instanceof compiler_1.TmplAstBoundText) {
                this.opQueue.push(new TcbExpressionOp(this.tcb, this, placeholder.value));
            }
        }
    }
    appendContentProjectionCheckOp(root) {
        var _a;
        const meta = ((_a = this.tcb.boundTarget.getDirectivesOfNode(root)) === null || _a === void 0 ? void 0 : _a.find((meta) => meta.isComponent)) || null;
        if (meta !== null && meta.ngContentSelectors !== null && meta.ngContentSelectors.length > 0) {
            const selectors = meta.ngContentSelectors;
            // We don't need to generate anything for components that don't have projection
            // slots, or they only have one catch-all slot (represented by `*`).
            if (selectors.length > 1 || (selectors.length === 1 && selectors[0] !== '*')) {
                this.opQueue.push(new TcbControlFlowContentProjectionOp(this.tcb, root, selectors, meta.name));
            }
        }
    }
    appendComponentNode(node) {
        // TODO(crisbeto): should we still append the children if the component is invalid?
        // Check that the referenced class exists.
        if (!this.tcb.boundTarget.referencedDirectiveExists(node.componentName)) {
            this.tcb.oobRecorder.missingNamedTemplateDependency(this.tcb.id, node);
            return;
        }
        // Check that the class is a component.
        const directives = this.tcb.boundTarget.getDirectivesOfNode(node);
        if (directives === null ||
            directives.length === 0 ||
            directives.every((dir) => !dir.isComponent || !dir.isStandalone)) {
            this.tcb.oobRecorder.incorrectTemplateDependencyType(this.tcb.id, node);
            return;
        }
        const opIndex = this.opQueue.push(new TcbComponentNodeOp(this.tcb, this, node)) - 1;
        this.componentNodeOpMap.set(node, opIndex);
        if (this.tcb.env.config.controlFlowPreventingContentProjection !== 'suppress') {
            this.appendContentProjectionCheckOp(node);
        }
        this.appendInputsOfSelectorlessNode(node);
        this.appendOutputsOfSelectorlessNode(node);
        this.appendSelectorlessDirectives(node);
        this.appendChildren(node);
        this.checkAndAppendReferencesOfNode(node);
    }
    appendDeferredBlock(block) {
        this.appendDeferredTriggers(block, block.triggers);
        this.appendDeferredTriggers(block, block.prefetchTriggers);
        // Only the `when` hydration trigger needs to be checked.
        if (block.hydrateTriggers.when) {
            this.opQueue.push(new TcbExpressionOp(this.tcb, this, block.hydrateTriggers.when.value));
        }
        this.appendChildren(block);
        if (block.placeholder !== null) {
            this.appendChildren(block.placeholder);
        }
        if (block.loading !== null) {
            this.appendChildren(block.loading);
        }
        if (block.error !== null) {
            this.appendChildren(block.error);
        }
    }
    appendDeferredTriggers(block, triggers) {
        if (triggers.when !== undefined) {
            this.opQueue.push(new TcbExpressionOp(this.tcb, this, triggers.when.value));
        }
        if (triggers.hover !== undefined) {
            this.appendReferenceBasedDeferredTrigger(block, triggers.hover);
        }
        if (triggers.interaction !== undefined) {
            this.appendReferenceBasedDeferredTrigger(block, triggers.interaction);
        }
        if (triggers.viewport !== undefined) {
            this.appendReferenceBasedDeferredTrigger(block, triggers.viewport);
        }
    }
    appendReferenceBasedDeferredTrigger(block, trigger) {
        if (this.tcb.boundTarget.getDeferredTriggerTarget(block, trigger) === null) {
            this.tcb.oobRecorder.inaccessibleDeferredTriggerElement(this.tcb.id, trigger);
        }
    }
    /** Reports a diagnostic if there are any `@let` declarations that conflict with a node. */
    static checkConflictingLet(scope, node) {
        if (scope.letDeclOpMap.has(node.name)) {
            scope.tcb.oobRecorder.conflictingDeclaration(scope.tcb.id, scope.letDeclOpMap.get(node.name).node);
        }
    }
}
/**
 * Names of the for loop context variables and their types.
 */
Scope.forLoopContextVariableTypes = new Map([
    ['$first', typescript_1.default.SyntaxKind.BooleanKeyword],
    ['$last', typescript_1.default.SyntaxKind.BooleanKeyword],
    ['$even', typescript_1.default.SyntaxKind.BooleanKeyword],
    ['$odd', typescript_1.default.SyntaxKind.BooleanKeyword],
    ['$index', typescript_1.default.SyntaxKind.NumberKeyword],
    ['$count', typescript_1.default.SyntaxKind.NumberKeyword],
]);
/**
 * Create the `this` parameter to the top-level TCB function, with the given generic type
 * arguments.
 */
function tcbThisParam(name, typeArguments) {
    return typescript_1.default.factory.createParameterDeclaration(
    /* modifiers */ undefined, 
    /* dotDotDotToken */ undefined, 
    /* name */ 'this', 
    /* questionToken */ undefined, 
    /* type */ typescript_1.default.factory.createTypeReferenceNode(name, typeArguments), 
    /* initializer */ undefined);
}
/**
 * Process an `AST` expression and convert it into a `ts.Expression`, generating references to the
 * correct identifiers in the current scope.
 */
function tcbExpression(ast, tcb, scope) {
    const translator = new TcbExpressionTranslator(tcb, scope);
    return translator.translate(ast);
}
class TcbExpressionTranslator {
    constructor(tcb, scope) {
        this.tcb = tcb;
        this.scope = scope;
    }
    translate(ast) {
        // `astToTypescript` actually does the conversion. A special resolver `tcbResolve` is passed
        // which interprets specific expression nodes that interact with the `ImplicitReceiver`. These
        // nodes actually refer to identifiers within the current scope.
        return (0, expression_1.astToTypescript)(ast, (ast) => this.resolve(ast), this.tcb.env.config);
    }
    /**
     * Resolve an `AST` expression within the given scope.
     *
     * Some `AST` expressions refer to top-level concepts (references, variables, the component
     * context). This method assists in resolving those.
     */
    resolve(ast) {
        if (ast instanceof compiler_1.PropertyRead &&
            ast.receiver instanceof compiler_1.ImplicitReceiver &&
            !(ast.receiver instanceof compiler_1.ThisReceiver)) {
            // Try to resolve a bound target for this expression. If no such target is available, then
            // the expression is referencing the top-level component context. In that case, `null` is
            // returned here to let it fall through resolution so it will be caught when the
            // `ImplicitReceiver` is resolved in the branch below.
            const target = this.tcb.boundTarget.getExpressionTarget(ast);
            const targetExpression = target === null ? null : this.getTargetNodeExpression(target, ast);
            if (target instanceof compiler_1.TmplAstLetDeclaration &&
                !this.isValidLetDeclarationAccess(target, ast)) {
                this.tcb.oobRecorder.letUsedBeforeDefinition(this.tcb.id, ast, target);
                // Cast the expression to `any` so we don't produce additional diagnostics.
                // We don't use `markIgnoreForDiagnostics` here, because it won't prevent duplicate
                // diagnostics for nested accesses in cases like `@let value = value.foo.bar.baz`.
                if (targetExpression !== null) {
                    return typescript_1.default.factory.createAsExpression(targetExpression, typescript_1.default.factory.createKeywordTypeNode(typescript_1.default.SyntaxKind.AnyKeyword));
                }
            }
            return targetExpression;
        }
        else if (ast instanceof compiler_1.PropertyWrite && ast.receiver instanceof compiler_1.ImplicitReceiver) {
            const target = this.tcb.boundTarget.getExpressionTarget(ast);
            if (target === null) {
                return null;
            }
            const targetExpression = this.getTargetNodeExpression(target, ast);
            const expr = this.translate(ast.value);
            const result = typescript_1.default.factory.createParenthesizedExpression(typescript_1.default.factory.createBinaryExpression(targetExpression, typescript_1.default.SyntaxKind.EqualsToken, expr));
            (0, diagnostics_1.addParseSpanInfo)(result, ast.sourceSpan);
            // Ignore diagnostics from TS produced for writes to `@let` and re-report them using
            // our own infrastructure. We can't rely on the TS reporting, because it includes
            // the name of the auto-generated TCB variable name.
            if (target instanceof compiler_1.TmplAstLetDeclaration) {
                (0, comments_1.markIgnoreDiagnostics)(result);
                this.tcb.oobRecorder.illegalWriteToLetDeclaration(this.tcb.id, ast, target);
            }
            return result;
        }
        else if (ast instanceof compiler_1.ImplicitReceiver) {
            // AST instances representing variables and references look very similar to property reads
            // or method calls from the component context: both have the shape
            // PropertyRead(ImplicitReceiver, 'propName') or Call(ImplicitReceiver, 'methodName').
            //
            // `translate` will first try to `resolve` the outer PropertyRead/Call. If this works,
            // it's because the `BoundTarget` found an expression target for the whole expression, and
            // therefore `translate` will never attempt to `resolve` the ImplicitReceiver of that
            // PropertyRead/Call.
            //
            // Therefore if `resolve` is called on an `ImplicitReceiver`, it's because no outer
            // PropertyRead/Call resolved to a variable or reference, and therefore this is a
            // property read or method call on the component context itself.
            return typescript_1.default.factory.createThis();
        }
        else if (ast instanceof compiler_1.BindingPipe) {
            const expr = this.translate(ast.exp);
            const pipeMeta = this.tcb.getPipeByName(ast.name);
            let pipe;
            if (pipeMeta === null) {
                // No pipe by that name exists in scope. Record this as an error.
                this.tcb.oobRecorder.missingPipe(this.tcb.id, ast);
                // Use an 'any' value to at least allow the rest of the expression to be checked.
                pipe = expression_1.ANY_EXPRESSION;
            }
            else if (pipeMeta.isExplicitlyDeferred &&
                this.tcb.boundTarget.getEagerlyUsedPipes().includes(ast.name)) {
                // This pipe was defer-loaded (included into `@Component.deferredImports`),
                // but was used outside of a `@defer` block, which is the error.
                this.tcb.oobRecorder.deferredPipeUsedEagerly(this.tcb.id, ast);
                // Use an 'any' value to at least allow the rest of the expression to be checked.
                pipe = expression_1.ANY_EXPRESSION;
            }
            else {
                // Use a variable declared as the pipe's type.
                pipe = this.tcb.env.pipeInst(pipeMeta.ref);
            }
            const args = ast.args.map((arg) => this.translate(arg));
            let methodAccess = typescript_1.default.factory.createPropertyAccessExpression(pipe, 'transform');
            (0, diagnostics_1.addParseSpanInfo)(methodAccess, ast.nameSpan);
            if (!this.tcb.env.config.checkTypeOfPipes) {
                methodAccess = typescript_1.default.factory.createAsExpression(methodAccess, typescript_1.default.factory.createKeywordTypeNode(typescript_1.default.SyntaxKind.AnyKeyword));
            }
            const result = typescript_1.default.factory.createCallExpression(
            /* expression */ methodAccess, 
            /* typeArguments */ undefined, 
            /* argumentsArray */ [expr, ...args]);
            (0, diagnostics_1.addParseSpanInfo)(result, ast.sourceSpan);
            return result;
        }
        else if ((ast instanceof compiler_1.Call || ast instanceof compiler_1.SafeCall) &&
            (ast.receiver instanceof compiler_1.PropertyRead || ast.receiver instanceof compiler_1.SafePropertyRead)) {
            // Resolve the special `$any(expr)` syntax to insert a cast of the argument to type `any`.
            // `$any(expr)` -> `expr as any`
            if (ast.receiver.receiver instanceof compiler_1.ImplicitReceiver &&
                !(ast.receiver.receiver instanceof compiler_1.ThisReceiver) &&
                ast.receiver.name === '$any' &&
                ast.args.length === 1) {
                const expr = this.translate(ast.args[0]);
                const exprAsAny = typescript_1.default.factory.createAsExpression(expr, typescript_1.default.factory.createKeywordTypeNode(typescript_1.default.SyntaxKind.AnyKeyword));
                const result = typescript_1.default.factory.createParenthesizedExpression(exprAsAny);
                (0, diagnostics_1.addParseSpanInfo)(result, ast.sourceSpan);
                return result;
            }
            // Attempt to resolve a bound target for the method, and generate the method call if a target
            // could be resolved. If no target is available, then the method is referencing the top-level
            // component context, in which case `null` is returned to let the `ImplicitReceiver` being
            // resolved to the component context.
            const target = this.tcb.boundTarget.getExpressionTarget(ast);
            if (target === null) {
                return null;
            }
            const receiver = this.getTargetNodeExpression(target, ast);
            const method = (0, diagnostics_1.wrapForDiagnostics)(receiver);
            (0, diagnostics_1.addParseSpanInfo)(method, ast.receiver.nameSpan);
            const args = ast.args.map((arg) => this.translate(arg));
            const node = typescript_1.default.factory.createCallExpression(method, undefined, args);
            (0, diagnostics_1.addParseSpanInfo)(node, ast.sourceSpan);
            return node;
        }
        else {
            // This AST isn't special after all.
            return null;
        }
    }
    getTargetNodeExpression(targetNode, expressionNode) {
        const expr = this.scope.resolve(targetNode);
        (0, diagnostics_1.addParseSpanInfo)(expr, expressionNode.sourceSpan);
        return expr;
    }
    isValidLetDeclarationAccess(target, ast) {
        const targetStart = target.sourceSpan.start.offset;
        const targetEnd = target.sourceSpan.end.offset;
        const astStart = ast.sourceSpan.start;
        // We only flag local references that occur before the declaration, because embedded views
        // are updated before the child views. In practice this means that something like
        // `<ng-template [ngIf]="true">{{value}}</ng-template> @let value = 1;` is valid.
        return (targetStart < astStart && astStart > targetEnd) || !this.scope.isLocal(target);
    }
}
/**
 * Call the type constructor of a directive instance on a given template node, inferring a type for
 * the directive instance from any bound inputs.
 */
function tcbCallTypeCtor(dir, tcb, inputs) {
    const typeCtor = tcb.env.typeCtorFor(dir);
    // Construct an array of `ts.PropertyAssignment`s for each of the directive's inputs.
    const members = inputs.map((input) => {
        const propertyName = typescript_1.default.factory.createStringLiteral(input.field);
        if (input.type === 'binding') {
            // For bound inputs, the property is assigned the binding expression.
            let expr = widenBinding(input.expression, tcb);
            if (input.isTwoWayBinding && tcb.env.config.allowSignalsInTwoWayBindings) {
                expr = unwrapWritableSignal(expr, tcb);
            }
            const assignment = typescript_1.default.factory.createPropertyAssignment(propertyName, (0, diagnostics_1.wrapForDiagnostics)(expr));
            (0, diagnostics_1.addParseSpanInfo)(assignment, input.sourceSpan);
            return assignment;
        }
        else {
            // A type constructor is required to be called with all input properties, so any unset
            // inputs are simply assigned a value of type `any` to ignore them.
            return typescript_1.default.factory.createPropertyAssignment(propertyName, expression_1.ANY_EXPRESSION);
        }
    });
    // Call the `ngTypeCtor` method on the directive class, with an object literal argument created
    // from the matched inputs.
    return typescript_1.default.factory.createCallExpression(
    /* expression */ typeCtor, 
    /* typeArguments */ undefined, 
    /* argumentsArray */ [typescript_1.default.factory.createObjectLiteralExpression(members)]);
}
function getBoundAttributes(directive, node) {
    const boundInputs = [];
    const processAttribute = (attr) => {
        // Skip non-property bindings.
        if (attr instanceof compiler_1.TmplAstBoundAttribute &&
            attr.type !== compiler_1.BindingType.Property &&
            attr.type !== compiler_1.BindingType.TwoWay) {
            return;
        }
        // Skip the attribute if the directive does not have an input for it.
        const inputs = directive.inputs.getByBindingPropertyName(attr.name);
        if (inputs !== null) {
            boundInputs.push({
                attribute: attr,
                inputs: inputs.map((input) => {
                    var _a;
                    return {
                        fieldName: input.classPropertyName,
                        required: input.required,
                        transformType: ((_a = input.transform) === null || _a === void 0 ? void 0 : _a.type) || null,
                        isSignal: input.isSignal,
                        isTwoWayBinding: attr instanceof compiler_1.TmplAstBoundAttribute && attr.type === compiler_1.BindingType.TwoWay,
                    };
                }),
            });
        }
    };
    node.inputs.forEach(processAttribute);
    node.attributes.forEach(processAttribute);
    if (node instanceof compiler_1.TmplAstTemplate) {
        node.templateAttrs.forEach(processAttribute);
    }
    return boundInputs;
}
/**
 * Translates the given attribute binding to a `ts.Expression`.
 */
function translateInput(attr, tcb, scope) {
    if (attr instanceof compiler_1.TmplAstBoundAttribute) {
        // Produce an expression representing the value of the binding.
        return tcbExpression(attr.value, tcb, scope);
    }
    else {
        // For regular attributes with a static string value, use the represented string literal.
        return typescript_1.default.factory.createStringLiteral(attr.value);
    }
}
/**
 * Potentially widens the type of `expr` according to the type-checking configuration.
 */
function widenBinding(expr, tcb) {
    if (!tcb.env.config.checkTypeOfInputBindings) {
        // If checking the type of bindings is disabled, cast the resulting expression to 'any'
        // before the assignment.
        return (0, ts_util_1.tsCastToAny)(expr);
    }
    else if (!tcb.env.config.strictNullInputBindings) {
        if (typescript_1.default.isObjectLiteralExpression(expr) || typescript_1.default.isArrayLiteralExpression(expr)) {
            // Object literals and array literals should not be wrapped in non-null assertions as that
            // would cause literals to be prematurely widened, resulting in type errors when assigning
            // into a literal type.
            return expr;
        }
        else {
            // If strict null checks are disabled, erase `null` and `undefined` from the type by
            // wrapping the expression in a non-null assertion.
            return typescript_1.default.factory.createNonNullExpression(expr);
        }
    }
    else {
        // No widening is requested, use the expression as is.
        return expr;
    }
}
/**
 * Wraps an expression in an `unwrapSignal` call which extracts the signal's value.
 */
function unwrapWritableSignal(expression, tcb) {
    const unwrapRef = tcb.env.referenceExternalSymbol(compiler_1.R3Identifiers.unwrapWritableSignal.moduleName, compiler_1.R3Identifiers.unwrapWritableSignal.name);
    return typescript_1.default.factory.createCallExpression(unwrapRef, undefined, [expression]);
}
const EVENT_PARAMETER = '$event';
/**
 * Creates an arrow function to be used as handler function for event bindings. The handler
 * function has a single parameter `$event` and the bound event's handler `AST` represented as a
 * TypeScript expression as its body.
 *
 * When `eventType` is set to `Infer`, the `$event` parameter will not have an explicit type. This
 * allows for the created handler function to have its `$event` parameter's type inferred based on
 * how it's used, to enable strict type checking of event bindings. When set to `Any`, the `$event`
 * parameter will have an explicit `any` type, effectively disabling strict type checking of event
 * bindings. Alternatively, an explicit type can be passed for the `$event` parameter.
 */
function tcbCreateEventHandler(event, tcb, scope, eventType) {
    const handler = tcbEventHandlerExpression(event.handler, tcb, scope);
    const statements = [];
    // TODO(crisbeto): remove the `checkTwoWayBoundEvents` check in v20.
    if (event.type === compiler_1.ParsedEventType.TwoWay && tcb.env.config.checkTwoWayBoundEvents) {
        // If we're dealing with a two-way event, we create a variable initialized to the unwrapped
        // signal value of the expression and then we assign `$event` to it. Note that in most cases
        // this will already be covered by the corresponding input binding, however it allows us to
        // handle the case where the input has a wider type than the output (see #58971).
        const target = tcb.allocateId();
        const assignment = typescript_1.default.factory.createBinaryExpression(target, typescript_1.default.SyntaxKind.EqualsToken, typescript_1.default.factory.createIdentifier(EVENT_PARAMETER));
        statements.push((0, ts_util_1.tsCreateVariable)(target, tcb.env.config.allowSignalsInTwoWayBindings ? unwrapWritableSignal(handler, tcb) : handler), typescript_1.default.factory.createExpressionStatement(assignment));
    }
    else {
        statements.push(typescript_1.default.factory.createExpressionStatement(handler));
    }
    let eventParamType;
    if (eventType === 0 /* EventParamType.Infer */) {
        eventParamType = undefined;
    }
    else if (eventType === 1 /* EventParamType.Any */) {
        eventParamType = typescript_1.default.factory.createKeywordTypeNode(typescript_1.default.SyntaxKind.AnyKeyword);
    }
    else {
        eventParamType = eventType;
    }
    // Obtain all guards that have been applied to the scope and its parents, as they have to be
    // repeated within the handler function for their narrowing to be in effect within the handler.
    const guards = scope.guards();
    let body = typescript_1.default.factory.createBlock(statements);
    if (guards !== null) {
        // Wrap the body in an `if` statement containing all guards that have to be applied.
        body = typescript_1.default.factory.createBlock([typescript_1.default.factory.createIfStatement(guards, body)]);
    }
    const eventParam = typescript_1.default.factory.createParameterDeclaration(
    /* modifiers */ undefined, 
    /* dotDotDotToken */ undefined, 
    /* name */ EVENT_PARAMETER, 
    /* questionToken */ undefined, 
    /* type */ eventParamType);
    (0, comments_1.addExpressionIdentifier)(eventParam, comments_1.ExpressionIdentifier.EVENT_PARAMETER);
    // Return an arrow function instead of a function expression to preserve the `this` context.
    return typescript_1.default.factory.createArrowFunction(
    /* modifiers */ undefined, 
    /* typeParameters */ undefined, 
    /* parameters */ [eventParam], 
    /* type */ typescript_1.default.factory.createKeywordTypeNode(typescript_1.default.SyntaxKind.AnyKeyword), 
    /* equalsGreaterThanToken */ undefined, 
    /* body */ body);
}
/**
 * Similar to `tcbExpression`, this function converts the provided `AST` expression into a
 * `ts.Expression`, with special handling of the `$event` variable that can be used within event
 * bindings.
 */
function tcbEventHandlerExpression(ast, tcb, scope) {
    const translator = new TcbEventHandlerTranslator(tcb, scope);
    return translator.translate(ast);
}
function checkSplitTwoWayBinding(inputName, output, inputs, tcb) {
    const input = inputs.find((input) => input.name === inputName);
    if (input === undefined || input.sourceSpan !== output.sourceSpan) {
        return false;
    }
    // Input consumer should be a directive because it's claimed
    const inputConsumer = tcb.boundTarget.getConsumerOfBinding(input);
    const outputConsumer = tcb.boundTarget.getConsumerOfBinding(output);
    if (outputConsumer === null ||
        inputConsumer.ref === undefined ||
        outputConsumer instanceof compiler_1.TmplAstTemplate) {
        return false;
    }
    if (outputConsumer instanceof compiler_1.TmplAstElement) {
        tcb.oobRecorder.splitTwoWayBinding(tcb.id, input, output, inputConsumer.ref.node, outputConsumer);
        return true;
    }
    else if (outputConsumer.ref !== inputConsumer.ref) {
        tcb.oobRecorder.splitTwoWayBinding(tcb.id, input, output, inputConsumer.ref.node, outputConsumer.ref.node);
        return true;
    }
    return false;
}
class TcbEventHandlerTranslator extends TcbExpressionTranslator {
    resolve(ast) {
        // Recognize a property read on the implicit receiver corresponding with the event parameter
        // that is available in event bindings. Since this variable is a parameter of the handler
        // function that the converted expression becomes a child of, just create a reference to the
        // parameter by its name.
        if (ast instanceof compiler_1.PropertyRead &&
            ast.receiver instanceof compiler_1.ImplicitReceiver &&
            !(ast.receiver instanceof compiler_1.ThisReceiver) &&
            ast.name === EVENT_PARAMETER) {
            const event = typescript_1.default.factory.createIdentifier(EVENT_PARAMETER);
            (0, diagnostics_1.addParseSpanInfo)(event, ast.nameSpan);
            return event;
        }
        return super.resolve(ast);
    }
    isValidLetDeclarationAccess() {
        // Event listeners are allowed to read `@let` declarations before
        // they're declared since the callback won't be executed immediately.
        return true;
    }
}
class TcbForLoopTrackTranslator extends TcbExpressionTranslator {
    constructor(tcb, scope, block) {
        super(tcb, scope);
        this.block = block;
        // Tracking expressions are only allowed to read the `$index`,
        // the item and properties off the component instance.
        this.allowedVariables = new Set([block.item]);
        for (const variable of block.contextVariables) {
            if (variable.value === '$index') {
                this.allowedVariables.add(variable);
            }
        }
    }
    resolve(ast) {
        if (ast instanceof compiler_1.PropertyRead && ast.receiver instanceof compiler_1.ImplicitReceiver) {
            const target = this.tcb.boundTarget.getExpressionTarget(ast);
            if (target !== null &&
                (!(target instanceof compiler_1.TmplAstVariable) || !this.allowedVariables.has(target))) {
                this.tcb.oobRecorder.illegalForLoopTrackAccess(this.tcb.id, this.block, ast);
            }
        }
        return super.resolve(ast);
    }
}
// TODO(crisbeto): the logic for determining the fallback tag name of a Component node is
// still being designed. For now fall back to `ng-component`, but this will have to be
// revisited once the design is finalized.
function getComponentTagName(node) {
    return node.tagName || 'ng-component';
}
