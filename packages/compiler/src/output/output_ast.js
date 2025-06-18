"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiteralMapEntry = exports.LiteralArrayExpr = exports.ReadKeyExpr = exports.ReadPropExpr = exports.BinaryOperatorExpr = exports.ParenthesizedExpr = exports.UnaryOperatorExpr = exports.ArrowFunctionExpr = exports.FunctionExpr = exports.FnParam = exports.NotExpr = exports.DynamicImportExpr = exports.ConditionalExpr = exports.ExternalReference = exports.ExternalExpr = exports.LocalizedString = exports.PlaceholderPiece = exports.LiteralPiece = exports.TemplateLiteralElementExpr = exports.TemplateLiteralExpr = exports.LiteralExpr = exports.InstantiateExpr = exports.TaggedTemplateLiteralExpr = exports.InvokeFunctionExpr = exports.WritePropExpr = exports.WriteKeyExpr = exports.WriteVarExpr = exports.WrappedNodeExpr = exports.VoidExpr = exports.TypeofExpr = exports.ReadVarExpr = exports.Expression = exports.BinaryOperator = exports.UnaryOperator = exports.NONE_TYPE = exports.FUNCTION_TYPE = exports.STRING_TYPE = exports.NUMBER_TYPE = exports.INT_TYPE = exports.BOOL_TYPE = exports.INFERRED_TYPE = exports.DYNAMIC_TYPE = exports.TransplantedType = exports.MapType = exports.ArrayType = exports.ExpressionType = exports.BuiltinType = exports.BuiltinTypeName = exports.Type = exports.TypeModifier = void 0;
exports.RecursiveAstVisitor = exports.IfStmt = exports.ReturnStatement = exports.ExpressionStatement = exports.DeclareFunctionStmt = exports.DeclareVarStmt = exports.Statement = exports.JSDocComment = exports.LeadingComment = exports.StmtModifier = exports.TYPED_NULL_EXPR = exports.NULL_EXPR = exports.CommaExpr = exports.LiteralMapExpr = void 0;
exports.nullSafeIsEquivalent = nullSafeIsEquivalent;
exports.areAllEquivalent = areAllEquivalent;
exports.leadingComment = leadingComment;
exports.jsDocComment = jsDocComment;
exports.variable = variable;
exports.importExpr = importExpr;
exports.importType = importType;
exports.expressionType = expressionType;
exports.transplantedType = transplantedType;
exports.typeofExpr = typeofExpr;
exports.literalArr = literalArr;
exports.literalMap = literalMap;
exports.unary = unary;
exports.not = not;
exports.fn = fn;
exports.arrowFn = arrowFn;
exports.ifStmt = ifStmt;
exports.taggedTemplate = taggedTemplate;
exports.literal = literal;
exports.localizedString = localizedString;
exports.isNull = isNull;
const digest_1 = require("../i18n/digest");
//// Types
var TypeModifier;
(function (TypeModifier) {
    TypeModifier[TypeModifier["None"] = 0] = "None";
    TypeModifier[TypeModifier["Const"] = 1] = "Const";
})(TypeModifier || (exports.TypeModifier = TypeModifier = {}));
class Type {
    constructor(modifiers = TypeModifier.None) {
        this.modifiers = modifiers;
    }
    hasModifier(modifier) {
        return (this.modifiers & modifier) !== 0;
    }
}
exports.Type = Type;
var BuiltinTypeName;
(function (BuiltinTypeName) {
    BuiltinTypeName[BuiltinTypeName["Dynamic"] = 0] = "Dynamic";
    BuiltinTypeName[BuiltinTypeName["Bool"] = 1] = "Bool";
    BuiltinTypeName[BuiltinTypeName["String"] = 2] = "String";
    BuiltinTypeName[BuiltinTypeName["Int"] = 3] = "Int";
    BuiltinTypeName[BuiltinTypeName["Number"] = 4] = "Number";
    BuiltinTypeName[BuiltinTypeName["Function"] = 5] = "Function";
    BuiltinTypeName[BuiltinTypeName["Inferred"] = 6] = "Inferred";
    BuiltinTypeName[BuiltinTypeName["None"] = 7] = "None";
})(BuiltinTypeName || (exports.BuiltinTypeName = BuiltinTypeName = {}));
class BuiltinType extends Type {
    constructor(name, modifiers) {
        super(modifiers);
        this.name = name;
    }
    visitType(visitor, context) {
        return visitor.visitBuiltinType(this, context);
    }
}
exports.BuiltinType = BuiltinType;
class ExpressionType extends Type {
    constructor(value, modifiers, typeParams = null) {
        super(modifiers);
        this.value = value;
        this.typeParams = typeParams;
    }
    visitType(visitor, context) {
        return visitor.visitExpressionType(this, context);
    }
}
exports.ExpressionType = ExpressionType;
class ArrayType extends Type {
    constructor(of, modifiers) {
        super(modifiers);
        this.of = of;
    }
    visitType(visitor, context) {
        return visitor.visitArrayType(this, context);
    }
}
exports.ArrayType = ArrayType;
class MapType extends Type {
    constructor(valueType, modifiers) {
        super(modifiers);
        this.valueType = valueType || null;
    }
    visitType(visitor, context) {
        return visitor.visitMapType(this, context);
    }
}
exports.MapType = MapType;
class TransplantedType extends Type {
    constructor(type, modifiers) {
        super(modifiers);
        this.type = type;
    }
    visitType(visitor, context) {
        return visitor.visitTransplantedType(this, context);
    }
}
exports.TransplantedType = TransplantedType;
exports.DYNAMIC_TYPE = new BuiltinType(BuiltinTypeName.Dynamic);
exports.INFERRED_TYPE = new BuiltinType(BuiltinTypeName.Inferred);
exports.BOOL_TYPE = new BuiltinType(BuiltinTypeName.Bool);
exports.INT_TYPE = new BuiltinType(BuiltinTypeName.Int);
exports.NUMBER_TYPE = new BuiltinType(BuiltinTypeName.Number);
exports.STRING_TYPE = new BuiltinType(BuiltinTypeName.String);
exports.FUNCTION_TYPE = new BuiltinType(BuiltinTypeName.Function);
exports.NONE_TYPE = new BuiltinType(BuiltinTypeName.None);
///// Expressions
var UnaryOperator;
(function (UnaryOperator) {
    UnaryOperator[UnaryOperator["Minus"] = 0] = "Minus";
    UnaryOperator[UnaryOperator["Plus"] = 1] = "Plus";
})(UnaryOperator || (exports.UnaryOperator = UnaryOperator = {}));
var BinaryOperator;
(function (BinaryOperator) {
    BinaryOperator[BinaryOperator["Equals"] = 0] = "Equals";
    BinaryOperator[BinaryOperator["NotEquals"] = 1] = "NotEquals";
    BinaryOperator[BinaryOperator["Identical"] = 2] = "Identical";
    BinaryOperator[BinaryOperator["NotIdentical"] = 3] = "NotIdentical";
    BinaryOperator[BinaryOperator["Minus"] = 4] = "Minus";
    BinaryOperator[BinaryOperator["Plus"] = 5] = "Plus";
    BinaryOperator[BinaryOperator["Divide"] = 6] = "Divide";
    BinaryOperator[BinaryOperator["Multiply"] = 7] = "Multiply";
    BinaryOperator[BinaryOperator["Modulo"] = 8] = "Modulo";
    BinaryOperator[BinaryOperator["And"] = 9] = "And";
    BinaryOperator[BinaryOperator["Or"] = 10] = "Or";
    BinaryOperator[BinaryOperator["BitwiseOr"] = 11] = "BitwiseOr";
    BinaryOperator[BinaryOperator["BitwiseAnd"] = 12] = "BitwiseAnd";
    BinaryOperator[BinaryOperator["Lower"] = 13] = "Lower";
    BinaryOperator[BinaryOperator["LowerEquals"] = 14] = "LowerEquals";
    BinaryOperator[BinaryOperator["Bigger"] = 15] = "Bigger";
    BinaryOperator[BinaryOperator["BiggerEquals"] = 16] = "BiggerEquals";
    BinaryOperator[BinaryOperator["NullishCoalesce"] = 17] = "NullishCoalesce";
    BinaryOperator[BinaryOperator["Exponentiation"] = 18] = "Exponentiation";
    BinaryOperator[BinaryOperator["In"] = 19] = "In";
})(BinaryOperator || (exports.BinaryOperator = BinaryOperator = {}));
function nullSafeIsEquivalent(base, other) {
    if (base == null || other == null) {
        return base == other;
    }
    return base.isEquivalent(other);
}
function areAllEquivalentPredicate(base, other, equivalentPredicate) {
    const len = base.length;
    if (len !== other.length) {
        return false;
    }
    for (let i = 0; i < len; i++) {
        if (!equivalentPredicate(base[i], other[i])) {
            return false;
        }
    }
    return true;
}
function areAllEquivalent(base, other) {
    return areAllEquivalentPredicate(base, other, (baseElement, otherElement) => baseElement.isEquivalent(otherElement));
}
class Expression {
    constructor(type, sourceSpan) {
        this.type = type || null;
        this.sourceSpan = sourceSpan || null;
    }
    prop(name, sourceSpan) {
        return new ReadPropExpr(this, name, null, sourceSpan);
    }
    key(index, type, sourceSpan) {
        return new ReadKeyExpr(this, index, type, sourceSpan);
    }
    callFn(params, sourceSpan, pure) {
        return new InvokeFunctionExpr(this, params, null, sourceSpan, pure);
    }
    instantiate(params, type, sourceSpan) {
        return new InstantiateExpr(this, params, type, sourceSpan);
    }
    conditional(trueCase, falseCase = null, sourceSpan) {
        return new ConditionalExpr(this, trueCase, falseCase, null, sourceSpan);
    }
    equals(rhs, sourceSpan) {
        return new BinaryOperatorExpr(BinaryOperator.Equals, this, rhs, null, sourceSpan);
    }
    notEquals(rhs, sourceSpan) {
        return new BinaryOperatorExpr(BinaryOperator.NotEquals, this, rhs, null, sourceSpan);
    }
    identical(rhs, sourceSpan) {
        return new BinaryOperatorExpr(BinaryOperator.Identical, this, rhs, null, sourceSpan);
    }
    notIdentical(rhs, sourceSpan) {
        return new BinaryOperatorExpr(BinaryOperator.NotIdentical, this, rhs, null, sourceSpan);
    }
    minus(rhs, sourceSpan) {
        return new BinaryOperatorExpr(BinaryOperator.Minus, this, rhs, null, sourceSpan);
    }
    plus(rhs, sourceSpan) {
        return new BinaryOperatorExpr(BinaryOperator.Plus, this, rhs, null, sourceSpan);
    }
    divide(rhs, sourceSpan) {
        return new BinaryOperatorExpr(BinaryOperator.Divide, this, rhs, null, sourceSpan);
    }
    multiply(rhs, sourceSpan) {
        return new BinaryOperatorExpr(BinaryOperator.Multiply, this, rhs, null, sourceSpan);
    }
    modulo(rhs, sourceSpan) {
        return new BinaryOperatorExpr(BinaryOperator.Modulo, this, rhs, null, sourceSpan);
    }
    power(rhs, sourceSpan) {
        return new BinaryOperatorExpr(BinaryOperator.Exponentiation, this, rhs, null, sourceSpan);
    }
    and(rhs, sourceSpan) {
        return new BinaryOperatorExpr(BinaryOperator.And, this, rhs, null, sourceSpan);
    }
    bitwiseOr(rhs, sourceSpan) {
        return new BinaryOperatorExpr(BinaryOperator.BitwiseOr, this, rhs, null, sourceSpan);
    }
    bitwiseAnd(rhs, sourceSpan) {
        return new BinaryOperatorExpr(BinaryOperator.BitwiseAnd, this, rhs, null, sourceSpan);
    }
    or(rhs, sourceSpan) {
        return new BinaryOperatorExpr(BinaryOperator.Or, this, rhs, null, sourceSpan);
    }
    lower(rhs, sourceSpan) {
        return new BinaryOperatorExpr(BinaryOperator.Lower, this, rhs, null, sourceSpan);
    }
    lowerEquals(rhs, sourceSpan) {
        return new BinaryOperatorExpr(BinaryOperator.LowerEquals, this, rhs, null, sourceSpan);
    }
    bigger(rhs, sourceSpan) {
        return new BinaryOperatorExpr(BinaryOperator.Bigger, this, rhs, null, sourceSpan);
    }
    biggerEquals(rhs, sourceSpan) {
        return new BinaryOperatorExpr(BinaryOperator.BiggerEquals, this, rhs, null, sourceSpan);
    }
    isBlank(sourceSpan) {
        // Note: We use equals by purpose here to compare to null and undefined in JS.
        // We use the typed null to allow strictNullChecks to narrow types.
        return this.equals(exports.TYPED_NULL_EXPR, sourceSpan);
    }
    nullishCoalesce(rhs, sourceSpan) {
        return new BinaryOperatorExpr(BinaryOperator.NullishCoalesce, this, rhs, null, sourceSpan);
    }
    toStmt() {
        return new ExpressionStatement(this, null);
    }
}
exports.Expression = Expression;
class ReadVarExpr extends Expression {
    constructor(name, type, sourceSpan) {
        super(type, sourceSpan);
        this.name = name;
    }
    isEquivalent(e) {
        return e instanceof ReadVarExpr && this.name === e.name;
    }
    isConstant() {
        return false;
    }
    visitExpression(visitor, context) {
        return visitor.visitReadVarExpr(this, context);
    }
    clone() {
        return new ReadVarExpr(this.name, this.type, this.sourceSpan);
    }
    set(value) {
        return new WriteVarExpr(this.name, value, null, this.sourceSpan);
    }
}
exports.ReadVarExpr = ReadVarExpr;
class TypeofExpr extends Expression {
    constructor(expr, type, sourceSpan) {
        super(type, sourceSpan);
        this.expr = expr;
    }
    visitExpression(visitor, context) {
        return visitor.visitTypeofExpr(this, context);
    }
    isEquivalent(e) {
        return e instanceof TypeofExpr && e.expr.isEquivalent(this.expr);
    }
    isConstant() {
        return this.expr.isConstant();
    }
    clone() {
        return new TypeofExpr(this.expr.clone());
    }
}
exports.TypeofExpr = TypeofExpr;
class VoidExpr extends Expression {
    constructor(expr, type, sourceSpan) {
        super(type, sourceSpan);
        this.expr = expr;
    }
    visitExpression(visitor, context) {
        return visitor.visitVoidExpr(this, context);
    }
    isEquivalent(e) {
        return e instanceof VoidExpr && e.expr.isEquivalent(this.expr);
    }
    isConstant() {
        return this.expr.isConstant();
    }
    clone() {
        return new VoidExpr(this.expr.clone());
    }
}
exports.VoidExpr = VoidExpr;
class WrappedNodeExpr extends Expression {
    constructor(node, type, sourceSpan) {
        super(type, sourceSpan);
        this.node = node;
    }
    isEquivalent(e) {
        return e instanceof WrappedNodeExpr && this.node === e.node;
    }
    isConstant() {
        return false;
    }
    visitExpression(visitor, context) {
        return visitor.visitWrappedNodeExpr(this, context);
    }
    clone() {
        return new WrappedNodeExpr(this.node, this.type, this.sourceSpan);
    }
}
exports.WrappedNodeExpr = WrappedNodeExpr;
class WriteVarExpr extends Expression {
    constructor(name, value, type, sourceSpan) {
        super(type || value.type, sourceSpan);
        this.name = name;
        this.value = value;
    }
    isEquivalent(e) {
        return e instanceof WriteVarExpr && this.name === e.name && this.value.isEquivalent(e.value);
    }
    isConstant() {
        return false;
    }
    visitExpression(visitor, context) {
        return visitor.visitWriteVarExpr(this, context);
    }
    clone() {
        return new WriteVarExpr(this.name, this.value.clone(), this.type, this.sourceSpan);
    }
    toDeclStmt(type, modifiers) {
        return new DeclareVarStmt(this.name, this.value, type, modifiers, this.sourceSpan);
    }
    toConstDecl() {
        return this.toDeclStmt(exports.INFERRED_TYPE, StmtModifier.Final);
    }
}
exports.WriteVarExpr = WriteVarExpr;
class WriteKeyExpr extends Expression {
    constructor(receiver, index, value, type, sourceSpan) {
        super(type || value.type, sourceSpan);
        this.receiver = receiver;
        this.index = index;
        this.value = value;
    }
    isEquivalent(e) {
        return (e instanceof WriteKeyExpr &&
            this.receiver.isEquivalent(e.receiver) &&
            this.index.isEquivalent(e.index) &&
            this.value.isEquivalent(e.value));
    }
    isConstant() {
        return false;
    }
    visitExpression(visitor, context) {
        return visitor.visitWriteKeyExpr(this, context);
    }
    clone() {
        return new WriteKeyExpr(this.receiver.clone(), this.index.clone(), this.value.clone(), this.type, this.sourceSpan);
    }
}
exports.WriteKeyExpr = WriteKeyExpr;
class WritePropExpr extends Expression {
    constructor(receiver, name, value, type, sourceSpan) {
        super(type || value.type, sourceSpan);
        this.receiver = receiver;
        this.name = name;
        this.value = value;
    }
    isEquivalent(e) {
        return (e instanceof WritePropExpr &&
            this.receiver.isEquivalent(e.receiver) &&
            this.name === e.name &&
            this.value.isEquivalent(e.value));
    }
    isConstant() {
        return false;
    }
    visitExpression(visitor, context) {
        return visitor.visitWritePropExpr(this, context);
    }
    clone() {
        return new WritePropExpr(this.receiver.clone(), this.name, this.value.clone(), this.type, this.sourceSpan);
    }
}
exports.WritePropExpr = WritePropExpr;
class InvokeFunctionExpr extends Expression {
    constructor(fn, args, type, sourceSpan, pure = false) {
        super(type, sourceSpan);
        this.fn = fn;
        this.args = args;
        this.pure = pure;
    }
    // An alias for fn, which allows other logic to handle calls and property reads together.
    get receiver() {
        return this.fn;
    }
    isEquivalent(e) {
        return (e instanceof InvokeFunctionExpr &&
            this.fn.isEquivalent(e.fn) &&
            areAllEquivalent(this.args, e.args) &&
            this.pure === e.pure);
    }
    isConstant() {
        return false;
    }
    visitExpression(visitor, context) {
        return visitor.visitInvokeFunctionExpr(this, context);
    }
    clone() {
        return new InvokeFunctionExpr(this.fn.clone(), this.args.map((arg) => arg.clone()), this.type, this.sourceSpan, this.pure);
    }
}
exports.InvokeFunctionExpr = InvokeFunctionExpr;
class TaggedTemplateLiteralExpr extends Expression {
    constructor(tag, template, type, sourceSpan) {
        super(type, sourceSpan);
        this.tag = tag;
        this.template = template;
    }
    isEquivalent(e) {
        return (e instanceof TaggedTemplateLiteralExpr &&
            this.tag.isEquivalent(e.tag) &&
            this.template.isEquivalent(e.template));
    }
    isConstant() {
        return false;
    }
    visitExpression(visitor, context) {
        return visitor.visitTaggedTemplateLiteralExpr(this, context);
    }
    clone() {
        return new TaggedTemplateLiteralExpr(this.tag.clone(), this.template.clone(), this.type, this.sourceSpan);
    }
}
exports.TaggedTemplateLiteralExpr = TaggedTemplateLiteralExpr;
class InstantiateExpr extends Expression {
    constructor(classExpr, args, type, sourceSpan) {
        super(type, sourceSpan);
        this.classExpr = classExpr;
        this.args = args;
    }
    isEquivalent(e) {
        return (e instanceof InstantiateExpr &&
            this.classExpr.isEquivalent(e.classExpr) &&
            areAllEquivalent(this.args, e.args));
    }
    isConstant() {
        return false;
    }
    visitExpression(visitor, context) {
        return visitor.visitInstantiateExpr(this, context);
    }
    clone() {
        return new InstantiateExpr(this.classExpr.clone(), this.args.map((arg) => arg.clone()), this.type, this.sourceSpan);
    }
}
exports.InstantiateExpr = InstantiateExpr;
class LiteralExpr extends Expression {
    constructor(value, type, sourceSpan) {
        super(type, sourceSpan);
        this.value = value;
    }
    isEquivalent(e) {
        return e instanceof LiteralExpr && this.value === e.value;
    }
    isConstant() {
        return true;
    }
    visitExpression(visitor, context) {
        return visitor.visitLiteralExpr(this, context);
    }
    clone() {
        return new LiteralExpr(this.value, this.type, this.sourceSpan);
    }
}
exports.LiteralExpr = LiteralExpr;
class TemplateLiteralExpr extends Expression {
    constructor(elements, expressions, sourceSpan) {
        super(null, sourceSpan);
        this.elements = elements;
        this.expressions = expressions;
    }
    isEquivalent(e) {
        return (e instanceof TemplateLiteralExpr &&
            areAllEquivalentPredicate(this.elements, e.elements, (a, b) => a.text === b.text) &&
            areAllEquivalent(this.expressions, e.expressions));
    }
    isConstant() {
        return false;
    }
    visitExpression(visitor, context) {
        return visitor.visitTemplateLiteralExpr(this, context);
    }
    clone() {
        return new TemplateLiteralExpr(this.elements.map((el) => el.clone()), this.expressions.map((expr) => expr.clone()));
    }
}
exports.TemplateLiteralExpr = TemplateLiteralExpr;
class TemplateLiteralElementExpr extends Expression {
    constructor(text, sourceSpan, rawText) {
        super(exports.STRING_TYPE, sourceSpan);
        this.text = text;
        // If `rawText` is not provided, "fake" the raw string by escaping the following sequences:
        // - "\" would otherwise indicate that the next character is a control character.
        // - "`" and "${" are template string control sequences that would otherwise prematurely
        // indicate the end of the template literal element.
        // Note that we can't rely on the `sourceSpan` here, because it may be incorrect (see
        // https://github.com/angular/angular/pull/60267#discussion_r1986402524).
        this.rawText = rawText !== null && rawText !== void 0 ? rawText : escapeForTemplateLiteral(escapeSlashes(text));
    }
    visitExpression(visitor, context) {
        return visitor.visitTemplateLiteralElementExpr(this, context);
    }
    isEquivalent(e) {
        return (e instanceof TemplateLiteralElementExpr && e.text === this.text && e.rawText === this.rawText);
    }
    isConstant() {
        return true;
    }
    clone() {
        return new TemplateLiteralElementExpr(this.text, this.sourceSpan, this.rawText);
    }
}
exports.TemplateLiteralElementExpr = TemplateLiteralElementExpr;
class LiteralPiece {
    constructor(text, sourceSpan) {
        this.text = text;
        this.sourceSpan = sourceSpan;
    }
}
exports.LiteralPiece = LiteralPiece;
class PlaceholderPiece {
    /**
     * Create a new instance of a `PlaceholderPiece`.
     *
     * @param text the name of this placeholder (e.g. `PH_1`).
     * @param sourceSpan the location of this placeholder in its localized message the source code.
     * @param associatedMessage reference to another message that this placeholder is associated with.
     * The `associatedMessage` is mainly used to provide a relationship to an ICU message that has
     * been extracted out from the message containing the placeholder.
     */
    constructor(text, sourceSpan, associatedMessage) {
        this.text = text;
        this.sourceSpan = sourceSpan;
        this.associatedMessage = associatedMessage;
    }
}
exports.PlaceholderPiece = PlaceholderPiece;
const MEANING_SEPARATOR = '|';
const ID_SEPARATOR = '@@';
const LEGACY_ID_INDICATOR = '␟';
class LocalizedString extends Expression {
    constructor(metaBlock, messageParts, placeHolderNames, expressions, sourceSpan) {
        super(exports.STRING_TYPE, sourceSpan);
        this.metaBlock = metaBlock;
        this.messageParts = messageParts;
        this.placeHolderNames = placeHolderNames;
        this.expressions = expressions;
    }
    isEquivalent(e) {
        // return e instanceof LocalizedString && this.message === e.message;
        return false;
    }
    isConstant() {
        return false;
    }
    visitExpression(visitor, context) {
        return visitor.visitLocalizedString(this, context);
    }
    clone() {
        return new LocalizedString(this.metaBlock, this.messageParts, this.placeHolderNames, this.expressions.map((expr) => expr.clone()), this.sourceSpan);
    }
    /**
     * Serialize the given `meta` and `messagePart` into "cooked" and "raw" strings that can be used
     * in a `$localize` tagged string. The format of the metadata is the same as that parsed by
     * `parseI18nMeta()`.
     *
     * @param meta The metadata to serialize
     * @param messagePart The first part of the tagged string
     */
    serializeI18nHead() {
        let metaBlock = this.metaBlock.description || '';
        if (this.metaBlock.meaning) {
            metaBlock = `${this.metaBlock.meaning}${MEANING_SEPARATOR}${metaBlock}`;
        }
        if (this.metaBlock.customId) {
            metaBlock = `${metaBlock}${ID_SEPARATOR}${this.metaBlock.customId}`;
        }
        if (this.metaBlock.legacyIds) {
            this.metaBlock.legacyIds.forEach((legacyId) => {
                metaBlock = `${metaBlock}${LEGACY_ID_INDICATOR}${legacyId}`;
            });
        }
        return createCookedRawString(metaBlock, this.messageParts[0].text, this.getMessagePartSourceSpan(0));
    }
    getMessagePartSourceSpan(i) {
        var _a, _b;
        return (_b = (_a = this.messageParts[i]) === null || _a === void 0 ? void 0 : _a.sourceSpan) !== null && _b !== void 0 ? _b : this.sourceSpan;
    }
    getPlaceholderSourceSpan(i) {
        var _a, _b, _c, _d;
        return ((_d = (_b = (_a = this.placeHolderNames[i]) === null || _a === void 0 ? void 0 : _a.sourceSpan) !== null && _b !== void 0 ? _b : (_c = this.expressions[i]) === null || _c === void 0 ? void 0 : _c.sourceSpan) !== null && _d !== void 0 ? _d : this.sourceSpan);
    }
    /**
     * Serialize the given `placeholderName` and `messagePart` into "cooked" and "raw" strings that
     * can be used in a `$localize` tagged string.
     *
     * The format is `:<placeholder-name>[@@<associated-id>]:`.
     *
     * The `associated-id` is the message id of the (usually an ICU) message to which this placeholder
     * refers.
     *
     * @param partIndex The index of the message part to serialize.
     */
    serializeI18nTemplatePart(partIndex) {
        var _a;
        const placeholder = this.placeHolderNames[partIndex - 1];
        const messagePart = this.messageParts[partIndex];
        let metaBlock = placeholder.text;
        if (((_a = placeholder.associatedMessage) === null || _a === void 0 ? void 0 : _a.legacyIds.length) === 0) {
            metaBlock += `${ID_SEPARATOR}${(0, digest_1.computeMsgId)(placeholder.associatedMessage.messageString, placeholder.associatedMessage.meaning)}`;
        }
        return createCookedRawString(metaBlock, messagePart.text, this.getMessagePartSourceSpan(partIndex));
    }
}
exports.LocalizedString = LocalizedString;
const escapeSlashes = (str) => str.replace(/\\/g, '\\\\');
const escapeStartingColon = (str) => str.replace(/^:/, '\\:');
const escapeColons = (str) => str.replace(/:/g, '\\:');
const escapeForTemplateLiteral = (str) => str.replace(/`/g, '\\`').replace(/\${/g, '$\\{');
/**
 * Creates a `{cooked, raw}` object from the `metaBlock` and `messagePart`.
 *
 * The `raw` text must have various character sequences escaped:
 * * "\" would otherwise indicate that the next character is a control character.
 * * "`" and "${" are template string control sequences that would otherwise prematurely indicate
 *   the end of a message part.
 * * ":" inside a metablock would prematurely indicate the end of the metablock.
 * * ":" at the start of a messagePart with no metablock would erroneously indicate the start of a
 *   metablock.
 *
 * @param metaBlock Any metadata that should be prepended to the string
 * @param messagePart The message part of the string
 */
function createCookedRawString(metaBlock, messagePart, range) {
    if (metaBlock === '') {
        return {
            cooked: messagePart,
            raw: escapeForTemplateLiteral(escapeStartingColon(escapeSlashes(messagePart))),
            range,
        };
    }
    else {
        return {
            cooked: `:${metaBlock}:${messagePart}`,
            raw: escapeForTemplateLiteral(`:${escapeColons(escapeSlashes(metaBlock))}:${escapeSlashes(messagePart)}`),
            range,
        };
    }
}
class ExternalExpr extends Expression {
    constructor(value, type, typeParams = null, sourceSpan) {
        super(type, sourceSpan);
        this.value = value;
        this.typeParams = typeParams;
    }
    isEquivalent(e) {
        return (e instanceof ExternalExpr &&
            this.value.name === e.value.name &&
            this.value.moduleName === e.value.moduleName);
    }
    isConstant() {
        return false;
    }
    visitExpression(visitor, context) {
        return visitor.visitExternalExpr(this, context);
    }
    clone() {
        return new ExternalExpr(this.value, this.type, this.typeParams, this.sourceSpan);
    }
}
exports.ExternalExpr = ExternalExpr;
class ExternalReference {
    constructor(moduleName, name) {
        this.moduleName = moduleName;
        this.name = name;
    }
}
exports.ExternalReference = ExternalReference;
class ConditionalExpr extends Expression {
    constructor(condition, trueCase, falseCase = null, type, sourceSpan) {
        super(type || trueCase.type, sourceSpan);
        this.condition = condition;
        this.falseCase = falseCase;
        this.trueCase = trueCase;
    }
    isEquivalent(e) {
        return (e instanceof ConditionalExpr &&
            this.condition.isEquivalent(e.condition) &&
            this.trueCase.isEquivalent(e.trueCase) &&
            nullSafeIsEquivalent(this.falseCase, e.falseCase));
    }
    isConstant() {
        return false;
    }
    visitExpression(visitor, context) {
        return visitor.visitConditionalExpr(this, context);
    }
    clone() {
        var _a;
        return new ConditionalExpr(this.condition.clone(), this.trueCase.clone(), (_a = this.falseCase) === null || _a === void 0 ? void 0 : _a.clone(), this.type, this.sourceSpan);
    }
}
exports.ConditionalExpr = ConditionalExpr;
class DynamicImportExpr extends Expression {
    constructor(url, sourceSpan, urlComment) {
        super(null, sourceSpan);
        this.url = url;
        this.urlComment = urlComment;
    }
    isEquivalent(e) {
        return e instanceof DynamicImportExpr && this.url === e.url && this.urlComment === e.urlComment;
    }
    isConstant() {
        return false;
    }
    visitExpression(visitor, context) {
        return visitor.visitDynamicImportExpr(this, context);
    }
    clone() {
        return new DynamicImportExpr(typeof this.url === 'string' ? this.url : this.url.clone(), this.sourceSpan, this.urlComment);
    }
}
exports.DynamicImportExpr = DynamicImportExpr;
class NotExpr extends Expression {
    constructor(condition, sourceSpan) {
        super(exports.BOOL_TYPE, sourceSpan);
        this.condition = condition;
    }
    isEquivalent(e) {
        return e instanceof NotExpr && this.condition.isEquivalent(e.condition);
    }
    isConstant() {
        return false;
    }
    visitExpression(visitor, context) {
        return visitor.visitNotExpr(this, context);
    }
    clone() {
        return new NotExpr(this.condition.clone(), this.sourceSpan);
    }
}
exports.NotExpr = NotExpr;
class FnParam {
    constructor(name, type = null) {
        this.name = name;
        this.type = type;
    }
    isEquivalent(param) {
        return this.name === param.name;
    }
    clone() {
        return new FnParam(this.name, this.type);
    }
}
exports.FnParam = FnParam;
class FunctionExpr extends Expression {
    constructor(params, statements, type, sourceSpan, name) {
        super(type, sourceSpan);
        this.params = params;
        this.statements = statements;
        this.name = name;
    }
    isEquivalent(e) {
        return ((e instanceof FunctionExpr || e instanceof DeclareFunctionStmt) &&
            areAllEquivalent(this.params, e.params) &&
            areAllEquivalent(this.statements, e.statements));
    }
    isConstant() {
        return false;
    }
    visitExpression(visitor, context) {
        return visitor.visitFunctionExpr(this, context);
    }
    toDeclStmt(name, modifiers) {
        return new DeclareFunctionStmt(name, this.params, this.statements, this.type, modifiers, this.sourceSpan);
    }
    clone() {
        // TODO: Should we deep clone statements?
        return new FunctionExpr(this.params.map((p) => p.clone()), this.statements, this.type, this.sourceSpan, this.name);
    }
}
exports.FunctionExpr = FunctionExpr;
class ArrowFunctionExpr extends Expression {
    // Note that `body: Expression` represents `() => expr` whereas
    // `body: Statement[]` represents `() => { expr }`.
    constructor(params, body, type, sourceSpan) {
        super(type, sourceSpan);
        this.params = params;
        this.body = body;
    }
    isEquivalent(e) {
        if (!(e instanceof ArrowFunctionExpr) || !areAllEquivalent(this.params, e.params)) {
            return false;
        }
        if (this.body instanceof Expression && e.body instanceof Expression) {
            return this.body.isEquivalent(e.body);
        }
        if (Array.isArray(this.body) && Array.isArray(e.body)) {
            return areAllEquivalent(this.body, e.body);
        }
        return false;
    }
    isConstant() {
        return false;
    }
    visitExpression(visitor, context) {
        return visitor.visitArrowFunctionExpr(this, context);
    }
    clone() {
        // TODO: Should we deep clone statements?
        return new ArrowFunctionExpr(this.params.map((p) => p.clone()), Array.isArray(this.body) ? this.body : this.body.clone(), this.type, this.sourceSpan);
    }
    toDeclStmt(name, modifiers) {
        return new DeclareVarStmt(name, this, exports.INFERRED_TYPE, modifiers, this.sourceSpan);
    }
}
exports.ArrowFunctionExpr = ArrowFunctionExpr;
class UnaryOperatorExpr extends Expression {
    constructor(operator, expr, type, sourceSpan, parens = true) {
        super(type || exports.NUMBER_TYPE, sourceSpan);
        this.operator = operator;
        this.expr = expr;
        this.parens = parens;
    }
    isEquivalent(e) {
        return (e instanceof UnaryOperatorExpr &&
            this.operator === e.operator &&
            this.expr.isEquivalent(e.expr));
    }
    isConstant() {
        return false;
    }
    visitExpression(visitor, context) {
        return visitor.visitUnaryOperatorExpr(this, context);
    }
    clone() {
        return new UnaryOperatorExpr(this.operator, this.expr.clone(), this.type, this.sourceSpan, this.parens);
    }
}
exports.UnaryOperatorExpr = UnaryOperatorExpr;
class ParenthesizedExpr extends Expression {
    constructor(expr, type, sourceSpan) {
        super(type, sourceSpan);
        this.expr = expr;
    }
    visitExpression(visitor, context) {
        return visitor.visitParenthesizedExpr(this, context);
    }
    isEquivalent(e) {
        // TODO: should this ignore paren depth? i.e. is `(1)` equivalent to `1`?
        return e instanceof ParenthesizedExpr && e.expr.isEquivalent(this.expr);
    }
    isConstant() {
        return this.expr.isConstant();
    }
    clone() {
        return new ParenthesizedExpr(this.expr.clone());
    }
}
exports.ParenthesizedExpr = ParenthesizedExpr;
class BinaryOperatorExpr extends Expression {
    constructor(operator, lhs, rhs, type, sourceSpan) {
        super(type || lhs.type, sourceSpan);
        this.operator = operator;
        this.rhs = rhs;
        this.lhs = lhs;
    }
    isEquivalent(e) {
        return (e instanceof BinaryOperatorExpr &&
            this.operator === e.operator &&
            this.lhs.isEquivalent(e.lhs) &&
            this.rhs.isEquivalent(e.rhs));
    }
    isConstant() {
        return false;
    }
    visitExpression(visitor, context) {
        return visitor.visitBinaryOperatorExpr(this, context);
    }
    clone() {
        return new BinaryOperatorExpr(this.operator, this.lhs.clone(), this.rhs.clone(), this.type, this.sourceSpan);
    }
}
exports.BinaryOperatorExpr = BinaryOperatorExpr;
class ReadPropExpr extends Expression {
    constructor(receiver, name, type, sourceSpan) {
        super(type, sourceSpan);
        this.receiver = receiver;
        this.name = name;
    }
    // An alias for name, which allows other logic to handle property reads and keyed reads together.
    get index() {
        return this.name;
    }
    isEquivalent(e) {
        return (e instanceof ReadPropExpr && this.receiver.isEquivalent(e.receiver) && this.name === e.name);
    }
    isConstant() {
        return false;
    }
    visitExpression(visitor, context) {
        return visitor.visitReadPropExpr(this, context);
    }
    set(value) {
        return new WritePropExpr(this.receiver, this.name, value, null, this.sourceSpan);
    }
    clone() {
        return new ReadPropExpr(this.receiver.clone(), this.name, this.type, this.sourceSpan);
    }
}
exports.ReadPropExpr = ReadPropExpr;
class ReadKeyExpr extends Expression {
    constructor(receiver, index, type, sourceSpan) {
        super(type, sourceSpan);
        this.receiver = receiver;
        this.index = index;
    }
    isEquivalent(e) {
        return (e instanceof ReadKeyExpr &&
            this.receiver.isEquivalent(e.receiver) &&
            this.index.isEquivalent(e.index));
    }
    isConstant() {
        return false;
    }
    visitExpression(visitor, context) {
        return visitor.visitReadKeyExpr(this, context);
    }
    set(value) {
        return new WriteKeyExpr(this.receiver, this.index, value, null, this.sourceSpan);
    }
    clone() {
        return new ReadKeyExpr(this.receiver.clone(), this.index.clone(), this.type, this.sourceSpan);
    }
}
exports.ReadKeyExpr = ReadKeyExpr;
class LiteralArrayExpr extends Expression {
    constructor(entries, type, sourceSpan) {
        super(type, sourceSpan);
        this.entries = entries;
    }
    isConstant() {
        return this.entries.every((e) => e.isConstant());
    }
    isEquivalent(e) {
        return e instanceof LiteralArrayExpr && areAllEquivalent(this.entries, e.entries);
    }
    visitExpression(visitor, context) {
        return visitor.visitLiteralArrayExpr(this, context);
    }
    clone() {
        return new LiteralArrayExpr(this.entries.map((e) => e.clone()), this.type, this.sourceSpan);
    }
}
exports.LiteralArrayExpr = LiteralArrayExpr;
class LiteralMapEntry {
    constructor(key, value, quoted) {
        this.key = key;
        this.value = value;
        this.quoted = quoted;
    }
    isEquivalent(e) {
        return this.key === e.key && this.value.isEquivalent(e.value);
    }
    clone() {
        return new LiteralMapEntry(this.key, this.value.clone(), this.quoted);
    }
}
exports.LiteralMapEntry = LiteralMapEntry;
class LiteralMapExpr extends Expression {
    constructor(entries, type, sourceSpan) {
        super(type, sourceSpan);
        this.entries = entries;
        this.valueType = null;
        if (type) {
            this.valueType = type.valueType;
        }
    }
    isEquivalent(e) {
        return e instanceof LiteralMapExpr && areAllEquivalent(this.entries, e.entries);
    }
    isConstant() {
        return this.entries.every((e) => e.value.isConstant());
    }
    visitExpression(visitor, context) {
        return visitor.visitLiteralMapExpr(this, context);
    }
    clone() {
        const entriesClone = this.entries.map((entry) => entry.clone());
        return new LiteralMapExpr(entriesClone, this.type, this.sourceSpan);
    }
}
exports.LiteralMapExpr = LiteralMapExpr;
class CommaExpr extends Expression {
    constructor(parts, sourceSpan) {
        super(parts[parts.length - 1].type, sourceSpan);
        this.parts = parts;
    }
    isEquivalent(e) {
        return e instanceof CommaExpr && areAllEquivalent(this.parts, e.parts);
    }
    isConstant() {
        return false;
    }
    visitExpression(visitor, context) {
        return visitor.visitCommaExpr(this, context);
    }
    clone() {
        return new CommaExpr(this.parts.map((p) => p.clone()));
    }
}
exports.CommaExpr = CommaExpr;
exports.NULL_EXPR = new LiteralExpr(null, null, null);
exports.TYPED_NULL_EXPR = new LiteralExpr(null, exports.INFERRED_TYPE, null);
//// Statements
var StmtModifier;
(function (StmtModifier) {
    StmtModifier[StmtModifier["None"] = 0] = "None";
    StmtModifier[StmtModifier["Final"] = 1] = "Final";
    StmtModifier[StmtModifier["Private"] = 2] = "Private";
    StmtModifier[StmtModifier["Exported"] = 4] = "Exported";
    StmtModifier[StmtModifier["Static"] = 8] = "Static";
})(StmtModifier || (exports.StmtModifier = StmtModifier = {}));
class LeadingComment {
    constructor(text, multiline, trailingNewline) {
        this.text = text;
        this.multiline = multiline;
        this.trailingNewline = trailingNewline;
    }
    toString() {
        return this.multiline ? ` ${this.text} ` : this.text;
    }
}
exports.LeadingComment = LeadingComment;
class JSDocComment extends LeadingComment {
    constructor(tags) {
        super('', /* multiline */ true, /* trailingNewline */ true);
        this.tags = tags;
    }
    toString() {
        return serializeTags(this.tags);
    }
}
exports.JSDocComment = JSDocComment;
class Statement {
    constructor(modifiers = StmtModifier.None, sourceSpan = null, leadingComments) {
        this.modifiers = modifiers;
        this.sourceSpan = sourceSpan;
        this.leadingComments = leadingComments;
    }
    hasModifier(modifier) {
        return (this.modifiers & modifier) !== 0;
    }
    addLeadingComment(leadingComment) {
        var _a;
        this.leadingComments = (_a = this.leadingComments) !== null && _a !== void 0 ? _a : [];
        this.leadingComments.push(leadingComment);
    }
}
exports.Statement = Statement;
class DeclareVarStmt extends Statement {
    constructor(name, value, type, modifiers, sourceSpan, leadingComments) {
        super(modifiers, sourceSpan, leadingComments);
        this.name = name;
        this.value = value;
        this.type = type || (value && value.type) || null;
    }
    isEquivalent(stmt) {
        return (stmt instanceof DeclareVarStmt &&
            this.name === stmt.name &&
            (this.value ? !!stmt.value && this.value.isEquivalent(stmt.value) : !stmt.value));
    }
    visitStatement(visitor, context) {
        return visitor.visitDeclareVarStmt(this, context);
    }
}
exports.DeclareVarStmt = DeclareVarStmt;
class DeclareFunctionStmt extends Statement {
    constructor(name, params, statements, type, modifiers, sourceSpan, leadingComments) {
        super(modifiers, sourceSpan, leadingComments);
        this.name = name;
        this.params = params;
        this.statements = statements;
        this.type = type || null;
    }
    isEquivalent(stmt) {
        return (stmt instanceof DeclareFunctionStmt &&
            areAllEquivalent(this.params, stmt.params) &&
            areAllEquivalent(this.statements, stmt.statements));
    }
    visitStatement(visitor, context) {
        return visitor.visitDeclareFunctionStmt(this, context);
    }
}
exports.DeclareFunctionStmt = DeclareFunctionStmt;
class ExpressionStatement extends Statement {
    constructor(expr, sourceSpan, leadingComments) {
        super(StmtModifier.None, sourceSpan, leadingComments);
        this.expr = expr;
    }
    isEquivalent(stmt) {
        return stmt instanceof ExpressionStatement && this.expr.isEquivalent(stmt.expr);
    }
    visitStatement(visitor, context) {
        return visitor.visitExpressionStmt(this, context);
    }
}
exports.ExpressionStatement = ExpressionStatement;
class ReturnStatement extends Statement {
    constructor(value, sourceSpan = null, leadingComments) {
        super(StmtModifier.None, sourceSpan, leadingComments);
        this.value = value;
    }
    isEquivalent(stmt) {
        return stmt instanceof ReturnStatement && this.value.isEquivalent(stmt.value);
    }
    visitStatement(visitor, context) {
        return visitor.visitReturnStmt(this, context);
    }
}
exports.ReturnStatement = ReturnStatement;
class IfStmt extends Statement {
    constructor(condition, trueCase, falseCase = [], sourceSpan, leadingComments) {
        super(StmtModifier.None, sourceSpan, leadingComments);
        this.condition = condition;
        this.trueCase = trueCase;
        this.falseCase = falseCase;
    }
    isEquivalent(stmt) {
        return (stmt instanceof IfStmt &&
            this.condition.isEquivalent(stmt.condition) &&
            areAllEquivalent(this.trueCase, stmt.trueCase) &&
            areAllEquivalent(this.falseCase, stmt.falseCase));
    }
    visitStatement(visitor, context) {
        return visitor.visitIfStmt(this, context);
    }
}
exports.IfStmt = IfStmt;
class RecursiveAstVisitor {
    visitType(ast, context) {
        return ast;
    }
    visitExpression(ast, context) {
        if (ast.type) {
            ast.type.visitType(this, context);
        }
        return ast;
    }
    visitBuiltinType(type, context) {
        return this.visitType(type, context);
    }
    visitExpressionType(type, context) {
        type.value.visitExpression(this, context);
        if (type.typeParams !== null) {
            type.typeParams.forEach((param) => this.visitType(param, context));
        }
        return this.visitType(type, context);
    }
    visitArrayType(type, context) {
        return this.visitType(type, context);
    }
    visitMapType(type, context) {
        return this.visitType(type, context);
    }
    visitTransplantedType(type, context) {
        return type;
    }
    visitWrappedNodeExpr(ast, context) {
        return ast;
    }
    visitReadVarExpr(ast, context) {
        return this.visitExpression(ast, context);
    }
    visitWriteVarExpr(ast, context) {
        ast.value.visitExpression(this, context);
        return this.visitExpression(ast, context);
    }
    visitWriteKeyExpr(ast, context) {
        ast.receiver.visitExpression(this, context);
        ast.index.visitExpression(this, context);
        ast.value.visitExpression(this, context);
        return this.visitExpression(ast, context);
    }
    visitWritePropExpr(ast, context) {
        ast.receiver.visitExpression(this, context);
        ast.value.visitExpression(this, context);
        return this.visitExpression(ast, context);
    }
    visitDynamicImportExpr(ast, context) {
        return this.visitExpression(ast, context);
    }
    visitInvokeFunctionExpr(ast, context) {
        ast.fn.visitExpression(this, context);
        this.visitAllExpressions(ast.args, context);
        return this.visitExpression(ast, context);
    }
    visitTaggedTemplateLiteralExpr(ast, context) {
        ast.tag.visitExpression(this, context);
        ast.template.visitExpression(this, context);
        return this.visitExpression(ast, context);
    }
    visitInstantiateExpr(ast, context) {
        ast.classExpr.visitExpression(this, context);
        this.visitAllExpressions(ast.args, context);
        return this.visitExpression(ast, context);
    }
    visitLiteralExpr(ast, context) {
        return this.visitExpression(ast, context);
    }
    visitLocalizedString(ast, context) {
        return this.visitExpression(ast, context);
    }
    visitExternalExpr(ast, context) {
        if (ast.typeParams) {
            ast.typeParams.forEach((type) => type.visitType(this, context));
        }
        return this.visitExpression(ast, context);
    }
    visitConditionalExpr(ast, context) {
        ast.condition.visitExpression(this, context);
        ast.trueCase.visitExpression(this, context);
        ast.falseCase.visitExpression(this, context);
        return this.visitExpression(ast, context);
    }
    visitNotExpr(ast, context) {
        ast.condition.visitExpression(this, context);
        return this.visitExpression(ast, context);
    }
    visitFunctionExpr(ast, context) {
        this.visitAllStatements(ast.statements, context);
        return this.visitExpression(ast, context);
    }
    visitArrowFunctionExpr(ast, context) {
        if (Array.isArray(ast.body)) {
            this.visitAllStatements(ast.body, context);
        }
        else {
            // Note: `body.visitExpression`, rather than `this.visitExpressiont(body)`,
            // because the latter won't recurse into the sub-expressions.
            ast.body.visitExpression(this, context);
        }
        return this.visitExpression(ast, context);
    }
    visitUnaryOperatorExpr(ast, context) {
        ast.expr.visitExpression(this, context);
        return this.visitExpression(ast, context);
    }
    visitTypeofExpr(ast, context) {
        ast.expr.visitExpression(this, context);
        return this.visitExpression(ast, context);
    }
    visitVoidExpr(ast, context) {
        ast.expr.visitExpression(this, context);
        return this.visitExpression(ast, context);
    }
    visitBinaryOperatorExpr(ast, context) {
        ast.lhs.visitExpression(this, context);
        ast.rhs.visitExpression(this, context);
        return this.visitExpression(ast, context);
    }
    visitReadPropExpr(ast, context) {
        ast.receiver.visitExpression(this, context);
        return this.visitExpression(ast, context);
    }
    visitReadKeyExpr(ast, context) {
        ast.receiver.visitExpression(this, context);
        ast.index.visitExpression(this, context);
        return this.visitExpression(ast, context);
    }
    visitLiteralArrayExpr(ast, context) {
        this.visitAllExpressions(ast.entries, context);
        return this.visitExpression(ast, context);
    }
    visitLiteralMapExpr(ast, context) {
        ast.entries.forEach((entry) => entry.value.visitExpression(this, context));
        return this.visitExpression(ast, context);
    }
    visitCommaExpr(ast, context) {
        this.visitAllExpressions(ast.parts, context);
        return this.visitExpression(ast, context);
    }
    visitTemplateLiteralExpr(ast, context) {
        this.visitAllExpressions(ast.elements, context);
        this.visitAllExpressions(ast.expressions, context);
        return this.visitExpression(ast, context);
    }
    visitTemplateLiteralElementExpr(ast, context) {
        return this.visitExpression(ast, context);
    }
    visitParenthesizedExpr(ast, context) {
        ast.expr.visitExpression(this, context);
        return this.visitExpression(ast, context);
    }
    visitAllExpressions(exprs, context) {
        exprs.forEach((expr) => expr.visitExpression(this, context));
    }
    visitDeclareVarStmt(stmt, context) {
        if (stmt.value) {
            stmt.value.visitExpression(this, context);
        }
        if (stmt.type) {
            stmt.type.visitType(this, context);
        }
        return stmt;
    }
    visitDeclareFunctionStmt(stmt, context) {
        this.visitAllStatements(stmt.statements, context);
        if (stmt.type) {
            stmt.type.visitType(this, context);
        }
        return stmt;
    }
    visitExpressionStmt(stmt, context) {
        stmt.expr.visitExpression(this, context);
        return stmt;
    }
    visitReturnStmt(stmt, context) {
        stmt.value.visitExpression(this, context);
        return stmt;
    }
    visitIfStmt(stmt, context) {
        stmt.condition.visitExpression(this, context);
        this.visitAllStatements(stmt.trueCase, context);
        this.visitAllStatements(stmt.falseCase, context);
        return stmt;
    }
    visitAllStatements(stmts, context) {
        stmts.forEach((stmt) => stmt.visitStatement(this, context));
    }
}
exports.RecursiveAstVisitor = RecursiveAstVisitor;
function leadingComment(text, multiline = false, trailingNewline = true) {
    return new LeadingComment(text, multiline, trailingNewline);
}
function jsDocComment(tags = []) {
    return new JSDocComment(tags);
}
function variable(name, type, sourceSpan) {
    return new ReadVarExpr(name, type, sourceSpan);
}
function importExpr(id, typeParams = null, sourceSpan) {
    return new ExternalExpr(id, null, typeParams, sourceSpan);
}
function importType(id, typeParams, typeModifiers) {
    return id != null ? expressionType(importExpr(id, typeParams, null), typeModifiers) : null;
}
function expressionType(expr, typeModifiers, typeParams) {
    return new ExpressionType(expr, typeModifiers, typeParams);
}
function transplantedType(type, typeModifiers) {
    return new TransplantedType(type, typeModifiers);
}
function typeofExpr(expr) {
    return new TypeofExpr(expr);
}
function literalArr(values, type, sourceSpan) {
    return new LiteralArrayExpr(values, type, sourceSpan);
}
function literalMap(values, type = null) {
    return new LiteralMapExpr(values.map((e) => new LiteralMapEntry(e.key, e.value, e.quoted)), type, null);
}
function unary(operator, expr, type, sourceSpan) {
    return new UnaryOperatorExpr(operator, expr, type, sourceSpan);
}
function not(expr, sourceSpan) {
    return new NotExpr(expr, sourceSpan);
}
function fn(params, body, type, sourceSpan, name) {
    return new FunctionExpr(params, body, type, sourceSpan, name);
}
function arrowFn(params, body, type, sourceSpan) {
    return new ArrowFunctionExpr(params, body, type, sourceSpan);
}
function ifStmt(condition, thenClause, elseClause, sourceSpan, leadingComments) {
    return new IfStmt(condition, thenClause, elseClause, sourceSpan, leadingComments);
}
function taggedTemplate(tag, template, type, sourceSpan) {
    return new TaggedTemplateLiteralExpr(tag, template, type, sourceSpan);
}
function literal(value, type, sourceSpan) {
    return new LiteralExpr(value, type, sourceSpan);
}
function localizedString(metaBlock, messageParts, placeholderNames, expressions, sourceSpan) {
    return new LocalizedString(metaBlock, messageParts, placeholderNames, expressions, sourceSpan);
}
function isNull(exp) {
    return exp instanceof LiteralExpr && exp.value === null;
}
/*
 * Serializes a `Tag` into a string.
 * Returns a string like " @foo {bar} baz" (note the leading whitespace before `@foo`).
 */
function tagToString(tag) {
    let out = '';
    if (tag.tagName) {
        out += ` @${tag.tagName}`;
    }
    if (tag.text) {
        if (tag.text.match(/\/\*|\*\//)) {
            throw new Error('JSDoc text cannot contain "/*" and "*/"');
        }
        out += ' ' + tag.text.replace(/@/g, '\\@');
    }
    return out;
}
function serializeTags(tags) {
    if (tags.length === 0)
        return '';
    if (tags.length === 1 && tags[0].tagName && !tags[0].text) {
        // The JSDOC comment is a single simple tag: e.g `/** @tagname */`.
        return `*${tagToString(tags[0])} `;
    }
    let out = '*\n';
    for (const tag of tags) {
        out += ' *';
        // If the tagToString is multi-line, insert " * " prefixes on lines.
        out += tagToString(tag).replace(/\n/g, '\n * ');
        out += '\n';
    }
    out += ' ';
    return out;
}
