"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoundElementProperty = exports.BindingType = exports.ParsedVariable = exports.ParsedEvent = exports.ParsedEventType = exports.ParsedPropertyType = exports.ParsedProperty = exports.RecursiveAstVisitor = exports.ExpressionBinding = exports.VariableBinding = exports.ASTWithSource = exports.AbsoluteSourceSpan = exports.ParenthesizedExpression = exports.TemplateLiteralElement = exports.TemplateLiteral = exports.TaggedTemplateLiteral = exports.SafeCall = exports.Call = exports.NonNullAssert = exports.VoidExpression = exports.TypeofExpression = exports.PrefixNot = exports.Unary = exports.Binary = exports.Interpolation = exports.LiteralMap = exports.LiteralArray = exports.LiteralPrimitive = exports.BindingPipe = exports.BindingPipeType = exports.KeyedWrite = exports.SafeKeyedRead = exports.KeyedRead = exports.SafePropertyRead = exports.PropertyWrite = exports.PropertyRead = exports.Conditional = exports.Chain = exports.ThisReceiver = exports.ImplicitReceiver = exports.EmptyExpr = exports.ASTWithName = exports.AST = exports.ParseSpan = exports.ParserError = void 0;
class ParserError {
    constructor(message, input, errLocation, ctxLocation) {
        this.input = input;
        this.errLocation = errLocation;
        this.ctxLocation = ctxLocation;
        this.message = `Parser Error: ${message} ${errLocation} [${input}] in ${ctxLocation}`;
    }
}
exports.ParserError = ParserError;
class ParseSpan {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
    toAbsolute(absoluteOffset) {
        return new AbsoluteSourceSpan(absoluteOffset + this.start, absoluteOffset + this.end);
    }
}
exports.ParseSpan = ParseSpan;
class AST {
    constructor(span, 
    /**
     * Absolute location of the expression AST in a source code file.
     */
    sourceSpan) {
        this.span = span;
        this.sourceSpan = sourceSpan;
    }
    toString() {
        return 'AST';
    }
}
exports.AST = AST;
class ASTWithName extends AST {
    constructor(span, sourceSpan, nameSpan) {
        super(span, sourceSpan);
        this.nameSpan = nameSpan;
    }
}
exports.ASTWithName = ASTWithName;
class EmptyExpr extends AST {
    visit(visitor, context = null) {
        // do nothing
    }
}
exports.EmptyExpr = EmptyExpr;
class ImplicitReceiver extends AST {
    visit(visitor, context = null) {
        return visitor.visitImplicitReceiver(this, context);
    }
}
exports.ImplicitReceiver = ImplicitReceiver;
/**
 * Receiver when something is accessed through `this` (e.g. `this.foo`). Note that this class
 * inherits from `ImplicitReceiver`, because accessing something through `this` is treated the
 * same as accessing it implicitly inside of an Angular template (e.g. `[attr.title]="this.title"`
 * is the same as `[attr.title]="title"`.). Inheriting allows for the `this` accesses to be treated
 * the same as implicit ones, except for a couple of exceptions like `$event` and `$any`.
 * TODO: we should find a way for this class not to extend from `ImplicitReceiver` in the future.
 */
class ThisReceiver extends ImplicitReceiver {
    visit(visitor, context = null) {
        var _a;
        return (_a = visitor.visitThisReceiver) === null || _a === void 0 ? void 0 : _a.call(visitor, this, context);
    }
}
exports.ThisReceiver = ThisReceiver;
/**
 * Multiple expressions separated by a semicolon.
 */
class Chain extends AST {
    constructor(span, sourceSpan, expressions) {
        super(span, sourceSpan);
        this.expressions = expressions;
    }
    visit(visitor, context = null) {
        return visitor.visitChain(this, context);
    }
}
exports.Chain = Chain;
class Conditional extends AST {
    constructor(span, sourceSpan, condition, trueExp, falseExp) {
        super(span, sourceSpan);
        this.condition = condition;
        this.trueExp = trueExp;
        this.falseExp = falseExp;
    }
    visit(visitor, context = null) {
        return visitor.visitConditional(this, context);
    }
}
exports.Conditional = Conditional;
class PropertyRead extends ASTWithName {
    constructor(span, sourceSpan, nameSpan, receiver, name) {
        super(span, sourceSpan, nameSpan);
        this.receiver = receiver;
        this.name = name;
    }
    visit(visitor, context = null) {
        return visitor.visitPropertyRead(this, context);
    }
}
exports.PropertyRead = PropertyRead;
class PropertyWrite extends ASTWithName {
    constructor(span, sourceSpan, nameSpan, receiver, name, value) {
        super(span, sourceSpan, nameSpan);
        this.receiver = receiver;
        this.name = name;
        this.value = value;
    }
    visit(visitor, context = null) {
        return visitor.visitPropertyWrite(this, context);
    }
}
exports.PropertyWrite = PropertyWrite;
class SafePropertyRead extends ASTWithName {
    constructor(span, sourceSpan, nameSpan, receiver, name) {
        super(span, sourceSpan, nameSpan);
        this.receiver = receiver;
        this.name = name;
    }
    visit(visitor, context = null) {
        return visitor.visitSafePropertyRead(this, context);
    }
}
exports.SafePropertyRead = SafePropertyRead;
class KeyedRead extends AST {
    constructor(span, sourceSpan, receiver, key) {
        super(span, sourceSpan);
        this.receiver = receiver;
        this.key = key;
    }
    visit(visitor, context = null) {
        return visitor.visitKeyedRead(this, context);
    }
}
exports.KeyedRead = KeyedRead;
class SafeKeyedRead extends AST {
    constructor(span, sourceSpan, receiver, key) {
        super(span, sourceSpan);
        this.receiver = receiver;
        this.key = key;
    }
    visit(visitor, context = null) {
        return visitor.visitSafeKeyedRead(this, context);
    }
}
exports.SafeKeyedRead = SafeKeyedRead;
class KeyedWrite extends AST {
    constructor(span, sourceSpan, receiver, key, value) {
        super(span, sourceSpan);
        this.receiver = receiver;
        this.key = key;
        this.value = value;
    }
    visit(visitor, context = null) {
        return visitor.visitKeyedWrite(this, context);
    }
}
exports.KeyedWrite = KeyedWrite;
/** Possible types for a pipe. */
var BindingPipeType;
(function (BindingPipeType) {
    /**
     * Pipe is being referenced by its name, for example:
     * `@Pipe({name: 'foo'}) class FooPipe` and `{{123 | foo}}`.
     */
    BindingPipeType[BindingPipeType["ReferencedByName"] = 0] = "ReferencedByName";
    /**
     * Pipe is being referenced by its class name, for example:
     * `@Pipe() class FooPipe` and `{{123 | FooPipe}}`.
     */
    BindingPipeType[BindingPipeType["ReferencedDirectly"] = 1] = "ReferencedDirectly";
})(BindingPipeType || (exports.BindingPipeType = BindingPipeType = {}));
class BindingPipe extends ASTWithName {
    constructor(span, sourceSpan, exp, name, args, type, nameSpan) {
        super(span, sourceSpan, nameSpan);
        this.exp = exp;
        this.name = name;
        this.args = args;
        this.type = type;
    }
    visit(visitor, context = null) {
        return visitor.visitPipe(this, context);
    }
}
exports.BindingPipe = BindingPipe;
class LiteralPrimitive extends AST {
    constructor(span, sourceSpan, value) {
        super(span, sourceSpan);
        this.value = value;
    }
    visit(visitor, context = null) {
        return visitor.visitLiteralPrimitive(this, context);
    }
}
exports.LiteralPrimitive = LiteralPrimitive;
class LiteralArray extends AST {
    constructor(span, sourceSpan, expressions) {
        super(span, sourceSpan);
        this.expressions = expressions;
    }
    visit(visitor, context = null) {
        return visitor.visitLiteralArray(this, context);
    }
}
exports.LiteralArray = LiteralArray;
class LiteralMap extends AST {
    constructor(span, sourceSpan, keys, values) {
        super(span, sourceSpan);
        this.keys = keys;
        this.values = values;
    }
    visit(visitor, context = null) {
        return visitor.visitLiteralMap(this, context);
    }
}
exports.LiteralMap = LiteralMap;
class Interpolation extends AST {
    constructor(span, sourceSpan, strings, expressions) {
        super(span, sourceSpan);
        this.strings = strings;
        this.expressions = expressions;
    }
    visit(visitor, context = null) {
        return visitor.visitInterpolation(this, context);
    }
}
exports.Interpolation = Interpolation;
class Binary extends AST {
    constructor(span, sourceSpan, operation, left, right) {
        super(span, sourceSpan);
        this.operation = operation;
        this.left = left;
        this.right = right;
    }
    visit(visitor, context = null) {
        return visitor.visitBinary(this, context);
    }
}
exports.Binary = Binary;
/**
 * For backwards compatibility reasons, `Unary` inherits from `Binary` and mimics the binary AST
 * node that was originally used. This inheritance relation can be deleted in some future major,
 * after consumers have been given a chance to fully support Unary.
 */
class Unary extends Binary {
    /**
     * Creates a unary minus expression "-x", represented as `Binary` using "0 - x".
     */
    static createMinus(span, sourceSpan, expr) {
        return new Unary(span, sourceSpan, '-', expr, '-', new LiteralPrimitive(span, sourceSpan, 0), expr);
    }
    /**
     * Creates a unary plus expression "+x", represented as `Binary` using "x - 0".
     */
    static createPlus(span, sourceSpan, expr) {
        return new Unary(span, sourceSpan, '+', expr, '-', expr, new LiteralPrimitive(span, sourceSpan, 0));
    }
    /**
     * During the deprecation period this constructor is private, to avoid consumers from creating
     * a `Unary` with the fallback properties for `Binary`.
     */
    constructor(span, sourceSpan, operator, expr, binaryOp, binaryLeft, binaryRight) {
        super(span, sourceSpan, binaryOp, binaryLeft, binaryRight);
        this.operator = operator;
        this.expr = expr;
        // Redeclare the properties that are inherited from `Binary` as `never`, as consumers should not
        // depend on these fields when operating on `Unary`.
        this.left = null;
        this.right = null;
        this.operation = null;
    }
    visit(visitor, context = null) {
        if (visitor.visitUnary !== undefined) {
            return visitor.visitUnary(this, context);
        }
        return visitor.visitBinary(this, context);
    }
}
exports.Unary = Unary;
class PrefixNot extends AST {
    constructor(span, sourceSpan, expression) {
        super(span, sourceSpan);
        this.expression = expression;
    }
    visit(visitor, context = null) {
        return visitor.visitPrefixNot(this, context);
    }
}
exports.PrefixNot = PrefixNot;
class TypeofExpression extends AST {
    constructor(span, sourceSpan, expression) {
        super(span, sourceSpan);
        this.expression = expression;
    }
    visit(visitor, context = null) {
        return visitor.visitTypeofExpression(this, context);
    }
}
exports.TypeofExpression = TypeofExpression;
class VoidExpression extends AST {
    constructor(span, sourceSpan, expression) {
        super(span, sourceSpan);
        this.expression = expression;
    }
    visit(visitor, context = null) {
        return visitor.visitVoidExpression(this, context);
    }
}
exports.VoidExpression = VoidExpression;
class NonNullAssert extends AST {
    constructor(span, sourceSpan, expression) {
        super(span, sourceSpan);
        this.expression = expression;
    }
    visit(visitor, context = null) {
        return visitor.visitNonNullAssert(this, context);
    }
}
exports.NonNullAssert = NonNullAssert;
class Call extends AST {
    constructor(span, sourceSpan, receiver, args, argumentSpan) {
        super(span, sourceSpan);
        this.receiver = receiver;
        this.args = args;
        this.argumentSpan = argumentSpan;
    }
    visit(visitor, context = null) {
        return visitor.visitCall(this, context);
    }
}
exports.Call = Call;
class SafeCall extends AST {
    constructor(span, sourceSpan, receiver, args, argumentSpan) {
        super(span, sourceSpan);
        this.receiver = receiver;
        this.args = args;
        this.argumentSpan = argumentSpan;
    }
    visit(visitor, context = null) {
        return visitor.visitSafeCall(this, context);
    }
}
exports.SafeCall = SafeCall;
class TaggedTemplateLiteral extends AST {
    constructor(span, sourceSpan, tag, template) {
        super(span, sourceSpan);
        this.tag = tag;
        this.template = template;
    }
    visit(visitor, context) {
        return visitor.visitTaggedTemplateLiteral(this, context);
    }
}
exports.TaggedTemplateLiteral = TaggedTemplateLiteral;
class TemplateLiteral extends AST {
    constructor(span, sourceSpan, elements, expressions) {
        super(span, sourceSpan);
        this.elements = elements;
        this.expressions = expressions;
    }
    visit(visitor, context) {
        return visitor.visitTemplateLiteral(this, context);
    }
}
exports.TemplateLiteral = TemplateLiteral;
class TemplateLiteralElement extends AST {
    constructor(span, sourceSpan, text) {
        super(span, sourceSpan);
        this.text = text;
    }
    visit(visitor, context) {
        return visitor.visitTemplateLiteralElement(this, context);
    }
}
exports.TemplateLiteralElement = TemplateLiteralElement;
class ParenthesizedExpression extends AST {
    constructor(span, sourceSpan, expression) {
        super(span, sourceSpan);
        this.expression = expression;
    }
    visit(visitor, context) {
        return visitor.visitParenthesizedExpression(this, context);
    }
}
exports.ParenthesizedExpression = ParenthesizedExpression;
/**
 * Records the absolute position of a text span in a source file, where `start` and `end` are the
 * starting and ending byte offsets, respectively, of the text span in a source file.
 */
class AbsoluteSourceSpan {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
}
exports.AbsoluteSourceSpan = AbsoluteSourceSpan;
class ASTWithSource extends AST {
    constructor(ast, source, location, absoluteOffset, errors) {
        super(new ParseSpan(0, source === null ? 0 : source.length), new AbsoluteSourceSpan(absoluteOffset, source === null ? absoluteOffset : absoluteOffset + source.length));
        this.ast = ast;
        this.source = source;
        this.location = location;
        this.errors = errors;
    }
    visit(visitor, context = null) {
        if (visitor.visitASTWithSource) {
            return visitor.visitASTWithSource(this, context);
        }
        return this.ast.visit(visitor, context);
    }
    toString() {
        return `${this.source} in ${this.location}`;
    }
}
exports.ASTWithSource = ASTWithSource;
class VariableBinding {
    /**
     * @param sourceSpan entire span of the binding.
     * @param key name of the LHS along with its span.
     * @param value optional value for the RHS along with its span.
     */
    constructor(sourceSpan, key, value) {
        this.sourceSpan = sourceSpan;
        this.key = key;
        this.value = value;
    }
}
exports.VariableBinding = VariableBinding;
class ExpressionBinding {
    /**
     * @param sourceSpan entire span of the binding.
     * @param key binding name, like ngForOf, ngForTrackBy, ngIf, along with its
     * span. Note that the length of the span may not be the same as
     * `key.source.length`. For example,
     * 1. key.source = ngFor, key.span is for "ngFor"
     * 2. key.source = ngForOf, key.span is for "of"
     * 3. key.source = ngForTrackBy, key.span is for "trackBy"
     * @param value optional expression for the RHS.
     */
    constructor(sourceSpan, key, value) {
        this.sourceSpan = sourceSpan;
        this.key = key;
        this.value = value;
    }
}
exports.ExpressionBinding = ExpressionBinding;
class RecursiveAstVisitor {
    visit(ast, context) {
        // The default implementation just visits every node.
        // Classes that extend RecursiveAstVisitor should override this function
        // to selectively visit the specified node.
        ast.visit(this, context);
    }
    visitUnary(ast, context) {
        this.visit(ast.expr, context);
    }
    visitBinary(ast, context) {
        this.visit(ast.left, context);
        this.visit(ast.right, context);
    }
    visitChain(ast, context) {
        this.visitAll(ast.expressions, context);
    }
    visitConditional(ast, context) {
        this.visit(ast.condition, context);
        this.visit(ast.trueExp, context);
        this.visit(ast.falseExp, context);
    }
    visitPipe(ast, context) {
        this.visit(ast.exp, context);
        this.visitAll(ast.args, context);
    }
    visitImplicitReceiver(ast, context) { }
    visitThisReceiver(ast, context) { }
    visitInterpolation(ast, context) {
        this.visitAll(ast.expressions, context);
    }
    visitKeyedRead(ast, context) {
        this.visit(ast.receiver, context);
        this.visit(ast.key, context);
    }
    visitKeyedWrite(ast, context) {
        this.visit(ast.receiver, context);
        this.visit(ast.key, context);
        this.visit(ast.value, context);
    }
    visitLiteralArray(ast, context) {
        this.visitAll(ast.expressions, context);
    }
    visitLiteralMap(ast, context) {
        this.visitAll(ast.values, context);
    }
    visitLiteralPrimitive(ast, context) { }
    visitPrefixNot(ast, context) {
        this.visit(ast.expression, context);
    }
    visitTypeofExpression(ast, context) {
        this.visit(ast.expression, context);
    }
    visitVoidExpression(ast, context) {
        this.visit(ast.expression, context);
    }
    visitNonNullAssert(ast, context) {
        this.visit(ast.expression, context);
    }
    visitPropertyRead(ast, context) {
        this.visit(ast.receiver, context);
    }
    visitPropertyWrite(ast, context) {
        this.visit(ast.receiver, context);
        this.visit(ast.value, context);
    }
    visitSafePropertyRead(ast, context) {
        this.visit(ast.receiver, context);
    }
    visitSafeKeyedRead(ast, context) {
        this.visit(ast.receiver, context);
        this.visit(ast.key, context);
    }
    visitCall(ast, context) {
        this.visit(ast.receiver, context);
        this.visitAll(ast.args, context);
    }
    visitSafeCall(ast, context) {
        this.visit(ast.receiver, context);
        this.visitAll(ast.args, context);
    }
    visitTemplateLiteral(ast, context) {
        // Iterate in the declaration order. Note that there will
        // always be one expression less than the number of elements.
        for (let i = 0; i < ast.elements.length; i++) {
            this.visit(ast.elements[i], context);
            const expression = i < ast.expressions.length ? ast.expressions[i] : null;
            if (expression !== null) {
                this.visit(expression, context);
            }
        }
    }
    visitTemplateLiteralElement(ast, context) { }
    visitTaggedTemplateLiteral(ast, context) {
        this.visit(ast.tag, context);
        this.visit(ast.template, context);
    }
    visitParenthesizedExpression(ast, context) {
        this.visit(ast.expression, context);
    }
    // This is not part of the AstVisitor interface, just a helper method
    visitAll(asts, context) {
        for (const ast of asts) {
            this.visit(ast, context);
        }
    }
}
exports.RecursiveAstVisitor = RecursiveAstVisitor;
// Bindings
class ParsedProperty {
    constructor(name, expression, type, sourceSpan, keySpan, valueSpan) {
        this.name = name;
        this.expression = expression;
        this.type = type;
        this.sourceSpan = sourceSpan;
        this.keySpan = keySpan;
        this.valueSpan = valueSpan;
        this.isLiteral = this.type === ParsedPropertyType.LITERAL_ATTR;
        this.isAnimation = this.type === ParsedPropertyType.ANIMATION;
    }
}
exports.ParsedProperty = ParsedProperty;
var ParsedPropertyType;
(function (ParsedPropertyType) {
    ParsedPropertyType[ParsedPropertyType["DEFAULT"] = 0] = "DEFAULT";
    ParsedPropertyType[ParsedPropertyType["LITERAL_ATTR"] = 1] = "LITERAL_ATTR";
    ParsedPropertyType[ParsedPropertyType["ANIMATION"] = 2] = "ANIMATION";
    ParsedPropertyType[ParsedPropertyType["TWO_WAY"] = 3] = "TWO_WAY";
})(ParsedPropertyType || (exports.ParsedPropertyType = ParsedPropertyType = {}));
var ParsedEventType;
(function (ParsedEventType) {
    // DOM or Directive event
    ParsedEventType[ParsedEventType["Regular"] = 0] = "Regular";
    // Animation specific event
    ParsedEventType[ParsedEventType["Animation"] = 1] = "Animation";
    // Event side of a two-way binding (e.g. `[(property)]="expression"`).
    ParsedEventType[ParsedEventType["TwoWay"] = 2] = "TwoWay";
})(ParsedEventType || (exports.ParsedEventType = ParsedEventType = {}));
class ParsedEvent {
    constructor(name, targetOrPhase, type, handler, sourceSpan, handlerSpan, keySpan) {
        this.name = name;
        this.targetOrPhase = targetOrPhase;
        this.type = type;
        this.handler = handler;
        this.sourceSpan = sourceSpan;
        this.handlerSpan = handlerSpan;
        this.keySpan = keySpan;
    }
}
exports.ParsedEvent = ParsedEvent;
/**
 * ParsedVariable represents a variable declaration in a microsyntax expression.
 */
class ParsedVariable {
    constructor(name, value, sourceSpan, keySpan, valueSpan) {
        this.name = name;
        this.value = value;
        this.sourceSpan = sourceSpan;
        this.keySpan = keySpan;
        this.valueSpan = valueSpan;
    }
}
exports.ParsedVariable = ParsedVariable;
var BindingType;
(function (BindingType) {
    // A regular binding to a property (e.g. `[property]="expression"`).
    BindingType[BindingType["Property"] = 0] = "Property";
    // A binding to an element attribute (e.g. `[attr.name]="expression"`).
    BindingType[BindingType["Attribute"] = 1] = "Attribute";
    // A binding to a CSS class (e.g. `[class.name]="condition"`).
    BindingType[BindingType["Class"] = 2] = "Class";
    // A binding to a style rule (e.g. `[style.rule]="expression"`).
    BindingType[BindingType["Style"] = 3] = "Style";
    // A binding to an animation reference (e.g. `[animate.key]="expression"`).
    BindingType[BindingType["Animation"] = 4] = "Animation";
    // Property side of a two-way binding (e.g. `[(property)]="expression"`).
    BindingType[BindingType["TwoWay"] = 5] = "TwoWay";
})(BindingType || (exports.BindingType = BindingType = {}));
class BoundElementProperty {
    constructor(name, type, securityContext, value, unit, sourceSpan, keySpan, valueSpan) {
        this.name = name;
        this.type = type;
        this.securityContext = securityContext;
        this.value = value;
        this.unit = unit;
        this.sourceSpan = sourceSpan;
        this.keySpan = keySpan;
        this.valueSpan = valueSpan;
    }
}
exports.BoundElementProperty = BoundElementProperty;
