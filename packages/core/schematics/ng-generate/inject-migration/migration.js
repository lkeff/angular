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
exports.migrateFile = migrateFile;
const typescript_1 = __importDefault(require("typescript"));
const change_tracker_1 = require("../../utils/change_tracker");
const analysis_1 = require("./analysis");
const ng_decorators_1 = require("../../utils/ng_decorators");
const imports_1 = require("../../utils/typescript/imports");
const nodes_1 = require("../../utils/typescript/nodes");
const internal_1 = require("./internal");
const leading_space_1 = require("../../utils/tsurge/helpers/ast/leading_space");
/**
 * Placeholder used to represent expressions inside the AST.
 * Includes Unicode characters to reduce the chance of collisions.
 */
const PLACEHOLDER = 'ɵɵngGeneratePlaceholderɵɵ';
/**
 * Migrates all of the classes in a `SourceFile` away from constructor injection.
 * @param sourceFile File to be migrated.
 * @param options Options that configure the migration.
 */
function migrateFile(sourceFile, options) {
    // Note: even though externally we have access to the full program with a proper type
    // checker, we create a new one that is local to the file for a couple of reasons:
    // 1. Not having to depend on a program makes running the migration internally faster and easier.
    // 2. All the necessary information for this migration is local so using a file-specific type
    //    checker should speed up the lookups.
    const localTypeChecker = getLocalTypeChecker(sourceFile);
    const analysis = (0, analysis_1.analyzeFile)(sourceFile, localTypeChecker, options);
    if (analysis === null || analysis.classes.length === 0) {
        return [];
    }
    const printer = typescript_1.default.createPrinter();
    const tracker = new change_tracker_1.ChangeTracker(printer);
    analysis.classes.forEach(({ node, constructor, superCall }) => {
        const memberIndentation = (0, leading_space_1.getLeadingLineWhitespaceOfNode)(node.members[0]);
        const prependToClass = [];
        const afterInjectCalls = [];
        const removedStatements = new Set();
        const removedMembers = new Set();
        if (options._internalCombineMemberInitializers) {
            applyInternalOnlyChanges(node, constructor, localTypeChecker, tracker, printer, removedStatements, removedMembers, prependToClass, afterInjectCalls, memberIndentation, options);
        }
        migrateClass(node, constructor, superCall, options, memberIndentation, prependToClass, afterInjectCalls, removedStatements, removedMembers, localTypeChecker, printer, tracker);
    });
    analysis_1.DI_PARAM_SYMBOLS.forEach((name) => {
        // Both zero and undefined are fine here.
        if (!analysis.nonDecoratorReferences[name]) {
            tracker.removeImport(sourceFile, name, '@angular/core');
        }
    });
    return tracker.recordChanges().get(sourceFile) || [];
}
/**
 * Migrates a class away from constructor injection.
 * @param node Class to be migrated.
 * @param constructor Reference to the class' constructor node.
 * @param superCall Reference to the constructor's `super()` call, if any.
 * @param options Options used to configure the migration.
 * @param memberIndentation Indentation string of the members of the class.
 * @param prependToClass Text that should be prepended to the class.
 * @param afterInjectCalls Text that will be inserted after the newly-added `inject` calls.
 * @param removedStatements Statements that have been removed from the constructor already.
 * @param removedMembers Class members that have been removed by the migration.
 * @param localTypeChecker Type checker set up for the specific file.
 * @param printer Printer used to output AST nodes as strings.
 * @param tracker Object keeping track of the changes made to the file.
 */
function migrateClass(node, constructor, superCall, options, memberIndentation, prependToClass, afterInjectCalls, removedStatements, removedMembers, localTypeChecker, printer, tracker) {
    var _a;
    const sourceFile = node.getSourceFile();
    const unusedParameters = (0, analysis_1.getConstructorUnusedParameters)(constructor, localTypeChecker, removedStatements);
    const superParameters = superCall
        ? (0, analysis_1.getSuperParameters)(constructor, superCall, localTypeChecker)
        : null;
    const removedStatementCount = removedStatements.size;
    const firstConstructorStatement = (_a = constructor.body) === null || _a === void 0 ? void 0 : _a.statements.find((statement) => !removedStatements.has(statement));
    const innerReference = superCall || firstConstructorStatement || constructor;
    const innerIndentation = (0, leading_space_1.getLeadingLineWhitespaceOfNode)(innerReference);
    const prependToConstructor = [];
    const afterSuper = [];
    for (const param of constructor.parameters) {
        const usedInSuper = superParameters !== null && superParameters.has(param);
        const usedInConstructor = !unusedParameters.has(param);
        const usesOtherParams = (0, analysis_1.parameterReferencesOtherParameters)(param, constructor.parameters, localTypeChecker);
        migrateParameter(param, options, localTypeChecker, printer, tracker, superCall, usedInSuper, usedInConstructor, usesOtherParams, memberIndentation, innerIndentation, prependToConstructor, prependToClass, afterSuper);
    }
    // Delete all of the constructor overloads since below we're either going to
    // remove the implementation, or we're going to delete all of the parameters.
    for (const member of node.members) {
        if (typescript_1.default.isConstructorDeclaration(member) && member !== constructor) {
            removedMembers.add(member);
            tracker.removeNode(member, true);
        }
    }
    if (canRemoveConstructor(options, constructor, removedStatementCount, prependToConstructor, superCall)) {
        // Drop the constructor if it was empty.
        removedMembers.add(constructor);
        tracker.removeNode(constructor, true);
    }
    else {
        // If the constructor contains any statements, only remove the parameters.
        // We always do this no matter what is passed into `backwardsCompatibleConstructors`.
        stripConstructorParameters(constructor, tracker);
        if (prependToConstructor.length > 0) {
            if (firstConstructorStatement ||
                (innerReference !== constructor &&
                    innerReference.getStart() >= constructor.getStart() &&
                    innerReference.getEnd() <= constructor.getEnd())) {
                tracker.insertText(sourceFile, (firstConstructorStatement || innerReference).getFullStart(), `\n${prependToConstructor.join('\n')}\n`);
            }
            else {
                tracker.insertText(sourceFile, constructor.body.getStart() + 1, `\n${prependToConstructor.map((p) => innerIndentation + p).join('\n')}\n${innerIndentation}`);
            }
        }
    }
    if (afterSuper.length > 0 && superCall !== null) {
        // Note that if we can, we should insert before the next statement after the `super` call,
        // rather than after the end of it. Otherwise the string buffering implementation may drop
        // the text if the statement after the `super` call is being deleted. This appears to be because
        // the full start of the next statement appears to always be the end of the `super` call plus 1.
        const nextStatement = getNextPreservedStatement(superCall, removedStatements);
        tracker.insertText(sourceFile, nextStatement ? nextStatement.getFullStart() : constructor.getEnd() - 1, `\n${afterSuper.join('\n')}\n` + (nextStatement ? '' : memberIndentation));
    }
    // Need to resolve this once all constructor signatures have been removed.
    const memberReference = node.members.find((m) => !removedMembers.has(m)) || node.members[0];
    // If `backwardsCompatibleConstructors` is enabled, we maintain
    // backwards compatibility by adding a catch-all signature.
    if (options.backwardsCompatibleConstructors) {
        const extraSignature = `\n${memberIndentation}/** Inserted by Angular inject() migration for backwards compatibility */\n` +
            `${memberIndentation}constructor(...args: unknown[]);`;
        // The new signature always has to be right before the constructor implementation.
        if (memberReference === constructor) {
            prependToClass.push(extraSignature);
        }
        else {
            tracker.insertText(sourceFile, constructor.getFullStart(), '\n' + extraSignature);
        }
    }
    // Push the block of code that should appear after the `inject`
    // calls now once all the members have been generated.
    prependToClass.push(...afterInjectCalls);
    if (prependToClass.length > 0) {
        if (removedMembers.size === node.members.length) {
            tracker.insertText(sourceFile, 
            // If all members were deleted, insert after the last one.
            // This allows us to preserve the indentation.
            node.members.length > 0
                ? node.members[node.members.length - 1].getEnd() + 1
                : node.getEnd() - 1, `${prependToClass.join('\n')}\n`);
        }
        else {
            // Insert the new properties after the first member that hasn't been deleted.
            tracker.insertText(sourceFile, memberReference.getFullStart(), `\n${prependToClass.join('\n')}\n`);
        }
    }
}
/**
 * Migrates a single parameter to `inject()` DI.
 * @param node Parameter to be migrated.
 * @param options Options used to configure the migration.
 * @param localTypeChecker Type checker set up for the specific file.
 * @param printer Printer used to output AST nodes as strings.
 * @param tracker Object keeping track of the changes made to the file.
 * @param superCall Call to `super()` from the class' constructor.
 * @param usedInSuper Whether the parameter is referenced inside of `super`.
 * @param usedInConstructor Whether the parameter is referenced inside the body of the constructor.
 * @param memberIndentation Indentation string to use when inserting new class members.
 * @param innerIndentation Indentation string to use when inserting new constructor statements.
 * @param prependToConstructor Statements to be prepended to the constructor.
 * @param propsToAdd Properties to be added to the class.
 * @param afterSuper Statements to be added after the `super` call.
 */
function migrateParameter(node, options, localTypeChecker, printer, tracker, superCall, usedInSuper, usedInConstructor, usesOtherParams, memberIndentation, innerIndentation, prependToConstructor, propsToAdd, afterSuper) {
    var _a, _b;
    if (!typescript_1.default.isIdentifier(node.name)) {
        return;
    }
    const name = node.name.text;
    const replacementCall = createInjectReplacementCall(node, options, localTypeChecker, printer, tracker);
    const declaresProp = (0, analysis_1.parameterDeclaresProperty)(node);
    // If the parameter declares a property, we need to declare it (e.g. `private foo: Foo`).
    if (declaresProp) {
        // We can't initialize the property if it's referenced within a `super` call or  it references
        // other parameters. See the logic further below for the initialization.
        const canInitialize = !usedInSuper && !usesOtherParams;
        const prop = typescript_1.default.factory.createPropertyDeclaration(cloneModifiers((_a = node.modifiers) === null || _a === void 0 ? void 0 : _a.filter((modifier) => {
            // Strip out the DI decorators, as well as `public` which is redundant.
            return !typescript_1.default.isDecorator(modifier) && modifier.kind !== typescript_1.default.SyntaxKind.PublicKeyword;
        })), name, 
        // Don't add the question token to private properties since it won't affect interface implementation.
        ((_b = node.modifiers) === null || _b === void 0 ? void 0 : _b.some((modifier) => modifier.kind === typescript_1.default.SyntaxKind.PrivateKeyword))
            ? undefined
            : node.questionToken, canInitialize ? undefined : node.type, canInitialize ? typescript_1.default.factory.createIdentifier(PLACEHOLDER) : undefined);
        propsToAdd.push(memberIndentation +
            replaceNodePlaceholder(node.getSourceFile(), prop, replacementCall, printer));
    }
    // If the parameter is referenced within the constructor, we need to declare it as a variable.
    if (usedInConstructor) {
        if (usedInSuper) {
            // Usages of `this` aren't allowed before `super` calls so we need to
            // create a variable which calls `inject()` directly instead...
            prependToConstructor.push(`${innerIndentation}const ${name} = ${replacementCall};`);
            // ...then we can initialize the property after the `super` call.
            if (declaresProp) {
                afterSuper.push(`${innerIndentation}this.${name} = ${name};`);
            }
        }
        else if (declaresProp) {
            // If the parameter declares a property (`private foo: foo`) and is used inside the class
            // at the same time, we need to ensure that it's initialized to the value from the variable
            // and that we only reference `this` after the `super` call.
            const initializer = `${innerIndentation}const ${name} = this.${name};`;
            if (superCall === null) {
                prependToConstructor.push(initializer);
            }
            else {
                afterSuper.push(initializer);
            }
        }
        else {
            // If the parameter is only referenced in the constructor, we
            // don't need to declare any new properties.
            prependToConstructor.push(`${innerIndentation}const ${name} = ${replacementCall};`);
        }
    }
    else if (usesOtherParams && declaresProp) {
        const toAdd = `${innerIndentation}this.${name} = ${replacementCall};`;
        if (superCall === null) {
            prependToConstructor.push(toAdd);
        }
        else {
            afterSuper.push(toAdd);
        }
    }
}
/**
 * Creates a replacement `inject` call from a function parameter.
 * @param param Parameter for which to generate the `inject` call.
 * @param options Options used to configure the migration.
 * @param localTypeChecker Type checker set up for the specific file.
 * @param printer Printer used to output AST nodes as strings.
 * @param tracker Object keeping track of the changes made to the file.
 */
function createInjectReplacementCall(param, options, localTypeChecker, printer, tracker) {
    const moduleName = '@angular/core';
    const sourceFile = param.getSourceFile();
    const decorators = (0, ng_decorators_1.getAngularDecorators)(localTypeChecker, typescript_1.default.getDecorators(param) || []);
    const literalProps = new Set();
    const type = param.type;
    let injectedType = '';
    let typeArguments = type && (0, analysis_1.hasGenerics)(type) ? [type] : undefined;
    let hasOptionalDecorator = false;
    if (type) {
        // Remove the type arguments from generic type references, because
        // they'll be specified as type arguments to `inject()`.
        if (typescript_1.default.isTypeReferenceNode(type) && type.typeArguments && type.typeArguments.length > 0) {
            injectedType = type.typeName.getText();
        }
        else if (typescript_1.default.isUnionTypeNode(type)) {
            injectedType = (type.types.find((t) => !typescript_1.default.isLiteralTypeNode(t)) || type.types[0]).getText();
        }
        else {
            injectedType = type.getText();
        }
    }
    for (const decorator of decorators) {
        if (decorator.moduleName !== moduleName) {
            continue;
        }
        const firstArg = decorator.node.expression.arguments[0];
        switch (decorator.name) {
            case 'Inject':
                if (firstArg) {
                    const injectResult = migrateInjectDecorator(firstArg, type, localTypeChecker);
                    injectedType = injectResult.injectedType;
                    if (injectResult.typeArguments) {
                        typeArguments = injectResult.typeArguments;
                    }
                }
                break;
            case 'Attribute':
                if (firstArg) {
                    const constructorRef = tracker.addImport(sourceFile, 'HostAttributeToken', moduleName);
                    const expression = typescript_1.default.factory.createNewExpression(constructorRef, undefined, [firstArg]);
                    injectedType = printer.printNode(typescript_1.default.EmitHint.Unspecified, expression, sourceFile);
                    typeArguments = undefined;
                    // @Attribute is implicitly optional.
                    hasOptionalDecorator = true;
                    literalProps.add('optional');
                }
                break;
            case 'Optional':
                hasOptionalDecorator = true;
                literalProps.add('optional');
                break;
            case 'SkipSelf':
                literalProps.add('skipSelf');
                break;
            case 'Self':
                literalProps.add('self');
                break;
            case 'Host':
                literalProps.add('host');
                break;
        }
    }
    // The injected type might be a `TypeNode` which we can't easily convert into an `Expression`.
    // Since the value gets passed through directly anyway, we generate the call using a placeholder
    // which we then replace with the raw text of the `TypeNode`.
    const injectRef = tracker.addImport(param.getSourceFile(), 'inject', moduleName);
    const args = [typescript_1.default.factory.createIdentifier(PLACEHOLDER)];
    if (literalProps.size > 0) {
        args.push(typescript_1.default.factory.createObjectLiteralExpression(Array.from(literalProps, (prop) => typescript_1.default.factory.createPropertyAssignment(prop, typescript_1.default.factory.createTrue()))));
    }
    let expression = typescript_1.default.factory.createCallExpression(injectRef, typeArguments, args);
    if (hasOptionalDecorator && options.nonNullableOptional) {
        const hasNullableType = param.questionToken != null || (param.type != null && (0, analysis_1.isNullableType)(param.type));
        // Only wrap the expression if the type wasn't already nullable.
        // If it was, the app was likely accounting for it already.
        if (!hasNullableType) {
            expression = typescript_1.default.factory.createNonNullExpression(expression);
        }
    }
    // If the parameter is initialized, add the initializer as a fallback.
    if (param.initializer) {
        expression = typescript_1.default.factory.createBinaryExpression(expression, typescript_1.default.SyntaxKind.QuestionQuestionToken, param.initializer);
    }
    return replaceNodePlaceholder(param.getSourceFile(), expression, injectedType, printer);
}
/**
 * Migrates a parameter based on its `@Inject()` decorator.
 * @param firstArg First argument to `@Inject()`.
 * @param type Type of the parameter.
 * @param localTypeChecker Type checker set up for the specific file.
 */
function migrateInjectDecorator(firstArg, type, localTypeChecker) {
    let injectedType = firstArg.getText();
    let typeArguments = null;
    // `inject` no longer officially supports string injection so we need
    // to cast to any. We maintain the type by passing it as a generic.
    if (typescript_1.default.isStringLiteralLike(firstArg)) {
        typeArguments = [type || typescript_1.default.factory.createKeywordTypeNode(typescript_1.default.SyntaxKind.AnyKeyword)];
        injectedType += ' as any';
    }
    else if (typescript_1.default.isCallExpression(firstArg) &&
        typescript_1.default.isIdentifier(firstArg.expression) &&
        firstArg.arguments.length === 1) {
        const callImport = (0, imports_1.getImportOfIdentifier)(localTypeChecker, firstArg.expression);
        const arrowFn = firstArg.arguments[0];
        // If the first parameter is a `forwardRef`, unwrap it for a more
        // accurate type and because it's no longer necessary.
        if (callImport !== null &&
            callImport.name === 'forwardRef' &&
            callImport.importModule === '@angular/core' &&
            typescript_1.default.isArrowFunction(arrowFn)) {
            if (typescript_1.default.isBlock(arrowFn.body)) {
                const returnStatement = arrowFn.body.statements.find((stmt) => typescript_1.default.isReturnStatement(stmt));
                if (returnStatement && returnStatement.expression) {
                    injectedType = returnStatement.expression.getText();
                }
            }
            else {
                injectedType = arrowFn.body.getText();
            }
        }
    }
    else if (type &&
        (typescript_1.default.isTypeReferenceNode(type) ||
            typescript_1.default.isTypeLiteralNode(type) ||
            typescript_1.default.isTupleTypeNode(type) ||
            (typescript_1.default.isUnionTypeNode(type) && type.types.some(typescript_1.default.isTypeReferenceNode)))) {
        typeArguments = [type];
    }
    return { injectedType, typeArguments };
}
/**
 * Removes the parameters from a constructor. This is a bit more complex than just replacing an AST
 * node, because `NodeArray.pos` includes any leading whitespace, but `NodeArray.end` does **not**
 * include trailing whitespace. Since we want to produce somewhat formatted code, we need to find
 * the end of the arguments ourselves. We do it by finding the next parenthesis after the last
 * parameter.
 * @param node Constructor from which to remove the parameters.
 * @param tracker Object keeping track of the changes made to the file.
 */
function stripConstructorParameters(node, tracker) {
    if (node.parameters.length === 0) {
        return;
    }
    const constructorText = node.getText();
    const lastParamText = node.parameters[node.parameters.length - 1].getText();
    const lastParamStart = constructorText.indexOf(lastParamText);
    // This shouldn't happen, but bail out just in case so we don't mangle the code.
    if (lastParamStart === -1) {
        return;
    }
    for (let i = lastParamStart + lastParamText.length; i < constructorText.length; i++) {
        const char = constructorText[i];
        if (char === ')') {
            tracker.replaceText(node.getSourceFile(), node.parameters.pos, node.getStart() + i - node.parameters.pos, '');
            break;
        }
    }
}
/**
 * Creates a type checker scoped to a specific file.
 * @param sourceFile File for which to create the type checker.
 */
function getLocalTypeChecker(sourceFile) {
    const options = { noEmit: true, skipLibCheck: true };
    const host = typescript_1.default.createCompilerHost(options);
    host.getSourceFile = (fileName) => (fileName === sourceFile.fileName ? sourceFile : undefined);
    const program = typescript_1.default.createProgram({
        rootNames: [sourceFile.fileName],
        options,
        host,
    });
    return program.getTypeChecker();
}
/**
 * Prints out an AST node and replaces the placeholder inside of it.
 * @param sourceFile File in which the node will be inserted.
 * @param node Node to be printed out.
 * @param replacement Replacement for the placeholder.
 * @param printer Printer used to output AST nodes as strings.
 */
function replaceNodePlaceholder(sourceFile, node, replacement, printer) {
    const result = printer.printNode(typescript_1.default.EmitHint.Unspecified, node, sourceFile);
    return result.replace(PLACEHOLDER, replacement);
}
/**
 * Clones an optional array of modifiers. Can be useful to
 * strip the comments from a node with modifiers.
 */
function cloneModifiers(modifiers) {
    return modifiers === null || modifiers === void 0 ? void 0 : modifiers.map((modifier) => {
        return typescript_1.default.isDecorator(modifier)
            ? typescript_1.default.factory.createDecorator(modifier.expression)
            : typescript_1.default.factory.createModifier(modifier.kind);
    });
}
/**
 * Clones the name of a property. Can be useful to strip away
 * the comments of a property without modifiers.
 */
function cloneName(node) {
    switch (node.kind) {
        case typescript_1.default.SyntaxKind.Identifier:
            return typescript_1.default.factory.createIdentifier(node.text);
        case typescript_1.default.SyntaxKind.StringLiteral:
            return typescript_1.default.factory.createStringLiteral(node.text, node.getText()[0] === `'`);
        case typescript_1.default.SyntaxKind.NoSubstitutionTemplateLiteral:
            return typescript_1.default.factory.createNoSubstitutionTemplateLiteral(node.text, node.rawText);
        case typescript_1.default.SyntaxKind.NumericLiteral:
            return typescript_1.default.factory.createNumericLiteral(node.text);
        case typescript_1.default.SyntaxKind.ComputedPropertyName:
            return typescript_1.default.factory.createComputedPropertyName(node.expression);
        case typescript_1.default.SyntaxKind.PrivateIdentifier:
            return typescript_1.default.factory.createPrivateIdentifier(node.text);
        default:
            return node;
    }
}
/**
 * Determines whether it's safe to delete a class constructor.
 * @param options Options used to configure the migration.
 * @param constructor Node representing the constructor.
 * @param removedStatementCount Number of statements that were removed by the migration.
 * @param prependToConstructor Statements that should be prepended to the constructor.
 * @param superCall Node representing the `super()` call within the constructor.
 */
function canRemoveConstructor(options, constructor, removedStatementCount, prependToConstructor, superCall) {
    if (options.backwardsCompatibleConstructors || prependToConstructor.length > 0) {
        return false;
    }
    const statementCount = constructor.body
        ? constructor.body.statements.length - removedStatementCount
        : 0;
    return (statementCount === 0 ||
        (statementCount === 1 && superCall !== null && superCall.arguments.length === 0));
}
/**
 * Gets the next statement after a node that *won't* be deleted by the migration.
 * @param startNode Node from which to start the search.
 * @param removedStatements Statements that have been removed by the migration.
 * @returns
 */
function getNextPreservedStatement(startNode, removedStatements) {
    const body = (0, nodes_1.closestNode)(startNode, typescript_1.default.isBlock);
    const closestStatement = (0, nodes_1.closestNode)(startNode, typescript_1.default.isStatement);
    if (body === null || closestStatement === null) {
        return null;
    }
    const index = body.statements.indexOf(closestStatement);
    if (index === -1) {
        return null;
    }
    for (let i = index + 1; i < body.statements.length; i++) {
        if (!removedStatements.has(body.statements[i])) {
            return body.statements[i];
        }
    }
    return null;
}
/**
 * Applies the internal-specific migrations to a class.
 * @param node Class being migrated.
 * @param constructor The migrated class' constructor.
 * @param localTypeChecker File-specific type checker.
 * @param tracker Object keeping track of the changes.
 * @param printer Printer used to output AST nodes as text.
 * @param removedStatements Statements that have been removed by the migration.
 * @param removedMembers Class members that have been removed by the migration.
 * @param prependToClass Text that will be prepended to a class.
 * @param afterInjectCalls Text that will be inserted after the newly-added `inject` calls.
 * @param memberIndentation Indentation string of the class' members.
 */
function applyInternalOnlyChanges(node, constructor, localTypeChecker, tracker, printer, removedStatements, removedMembers, prependToClass, afterInjectCalls, memberIndentation, options) {
    const result = (0, internal_1.findUninitializedPropertiesToCombine)(node, constructor, localTypeChecker, options);
    if (result === null) {
        return;
    }
    const preserveInitOrder = (0, internal_1.shouldCombineInInitializationOrder)(result.toCombine, constructor);
    // Sort the combined members based on the declaration order of their initializers, only if
    // we've determined that would be safe. Note that `Array.prototype.sort` is in-place so we
    // can just call it conditionally here.
    if (preserveInitOrder) {
        result.toCombine.sort((a, b) => a.initializer.getStart() - b.initializer.getStart());
    }
    result.toCombine.forEach(({ declaration, initializer }) => {
        const initializerStatement = (0, nodes_1.closestNode)(initializer, typescript_1.default.isStatement);
        // Strip comments if we are just going modify the node in-place.
        const modifiers = preserveInitOrder
            ? declaration.modifiers
            : cloneModifiers(declaration.modifiers);
        const name = preserveInitOrder ? declaration.name : cloneName(declaration.name);
        const newProperty = typescript_1.default.factory.createPropertyDeclaration(modifiers, name, declaration.questionToken, declaration.type, undefined);
        const propText = printer.printNode(typescript_1.default.EmitHint.Unspecified, newProperty, declaration.getSourceFile());
        const initializerText = replaceParameterReferencesInInitializer(initializer, constructor, localTypeChecker);
        const withInitializer = `${propText.slice(0, -1)} = ${initializerText};`;
        // If the initialization order is being preserved, we have to remove the original
        // declaration and re-declare it. Otherwise we can do the replacement in-place.
        if (preserveInitOrder) {
            tracker.removeNode(declaration, true);
            removedMembers.add(declaration);
            afterInjectCalls.push(memberIndentation + withInitializer);
        }
        else {
            const sourceFile = declaration.getSourceFile();
            tracker.replaceText(sourceFile, declaration.getStart(), declaration.getWidth(), withInitializer);
        }
        // This should always be defined, but null check it just in case.
        if (initializerStatement) {
            tracker.removeNode(initializerStatement, true);
            removedStatements.add(initializerStatement);
        }
    });
    result.toHoist.forEach((decl) => {
        prependToClass.push(memberIndentation + printer.printNode(typescript_1.default.EmitHint.Unspecified, decl, decl.getSourceFile()));
        tracker.removeNode(decl, true);
        removedMembers.add(decl);
    });
    // If we added any hoisted properties, separate them visually with a new line.
    if (prependToClass.length > 0) {
        prependToClass.push('');
    }
}
function replaceParameterReferencesInInitializer(initializer, constructor, localTypeChecker) {
    // 1. Collect the locations of identifier nodes that reference constructor parameters.
    // 2. Add `this.` to those locations.
    const insertLocations = [0];
    function walk(node) {
        var _a, _b;
        if (typescript_1.default.isIdentifier(node) &&
            !(typescript_1.default.isPropertyAccessExpression(node.parent) && node === node.parent.name) &&
            ((_b = (_a = localTypeChecker
                .getSymbolAtLocation(node)) === null || _a === void 0 ? void 0 : _a.declarations) === null || _b === void 0 ? void 0 : _b.some((decl) => constructor.parameters.includes(decl)))) {
            insertLocations.push(node.getStart() - initializer.getStart());
        }
        typescript_1.default.forEachChild(node, walk);
    }
    walk(initializer);
    const initializerText = initializer.getText();
    insertLocations.push(initializerText.length);
    insertLocations.sort((a, b) => a - b);
    const result = [];
    for (let i = 0; i < insertLocations.length - 1; i++) {
        result.push(initializerText.slice(insertLocations[i], insertLocations[i + 1]));
    }
    return result.join('this.');
}
