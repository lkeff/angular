"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitorContextFlag = exports.ConstCollectedExpr = exports.ConditionalCaseExpr = exports.SlotLiteralExpr = exports.ReadTemporaryExpr = exports.AssignTemporaryExpr = exports.EmptyExpr = exports.SafeTernaryExpr = exports.SafeInvokeFunctionExpr = exports.SafeKeyedReadExpr = exports.SafePropertyReadExpr = exports.PipeBindingVariadicExpr = exports.PipeBindingExpr = exports.PureFunctionParameterExpr = exports.PureFunctionExpr = exports.ReadVariableExpr = exports.TwoWayBindingSetExpr = exports.ResetViewExpr = exports.RestoreViewExpr = exports.GetCurrentViewExpr = exports.NextContextExpr = exports.TrackContextExpr = exports.ContextExpr = exports.ContextLetReferenceExpr = exports.StoreLetExpr = exports.ReferenceExpr = exports.LexicalReadExpr = exports.ExpressionBase = void 0;
exports.isIrExpression = isIrExpression;
exports.visitExpressionsInOp = visitExpressionsInOp;
exports.transformExpressionsInOp = transformExpressionsInOp;
exports.transformExpressionsInExpression = transformExpressionsInExpression;
exports.transformExpressionsInStatement = transformExpressionsInStatement;
exports.isStringLiteral = isStringLiteral;
const o = __importStar(require("../../../../output/output_ast"));
const enums_1 = require("./enums");
const update_1 = require("./ops/update");
const traits_1 = require("./traits");
/**
 * Check whether a given `o.Expression` is a logical IR expression type.
 */
function isIrExpression(expr) {
    return expr instanceof ExpressionBase;
}
/**
 * Base type used for all logical IR expressions.
 */
class ExpressionBase extends o.Expression {
    constructor(sourceSpan = null) {
        super(null, sourceSpan);
    }
}
exports.ExpressionBase = ExpressionBase;
/**
 * Logical expression representing a lexical read of a variable name.
 */
class LexicalReadExpr extends ExpressionBase {
    constructor(name) {
        super();
        this.name = name;
        this.kind = enums_1.ExpressionKind.LexicalRead;
    }
    visitExpression(visitor, context) { }
    isEquivalent(other) {
        // We assume that the lexical reads are in the same context, which must be true for parent
        // expressions to be equivalent.
        // TODO: is this generally safe?
        return this.name === other.name;
    }
    isConstant() {
        return false;
    }
    transformInternalExpressions() { }
    clone() {
        return new LexicalReadExpr(this.name);
    }
}
exports.LexicalReadExpr = LexicalReadExpr;
/**
 * Runtime operation to retrieve the value of a local reference.
 */
class ReferenceExpr extends ExpressionBase {
    constructor(target, targetSlot, offset) {
        super();
        this.target = target;
        this.targetSlot = targetSlot;
        this.offset = offset;
        this.kind = enums_1.ExpressionKind.Reference;
    }
    visitExpression() { }
    isEquivalent(e) {
        return e instanceof ReferenceExpr && e.target === this.target;
    }
    isConstant() {
        return false;
    }
    transformInternalExpressions() { }
    clone() {
        return new ReferenceExpr(this.target, this.targetSlot, this.offset);
    }
}
exports.ReferenceExpr = ReferenceExpr;
class StoreLetExpr extends ExpressionBase {
    constructor(target, value, sourceSpan) {
        super();
        this.target = target;
        this.value = value;
        this.sourceSpan = sourceSpan;
        this.kind = enums_1.ExpressionKind.StoreLet;
        this[_a] = true;
        this[_b] = true;
    }
    visitExpression() { }
    isEquivalent(e) {
        return (e instanceof StoreLetExpr && e.target === this.target && e.value.isEquivalent(this.value));
    }
    isConstant() {
        return false;
    }
    transformInternalExpressions(transform, flags) {
        this.value = transformExpressionsInExpression(this.value, transform, flags);
    }
    clone() {
        return new StoreLetExpr(this.target, this.value, this.sourceSpan);
    }
}
exports.StoreLetExpr = StoreLetExpr;
_a = traits_1.ConsumesVarsTrait, _b = traits_1.DependsOnSlotContext;
class ContextLetReferenceExpr extends ExpressionBase {
    constructor(target, targetSlot) {
        super();
        this.target = target;
        this.targetSlot = targetSlot;
        this.kind = enums_1.ExpressionKind.ContextLetReference;
    }
    visitExpression() { }
    isEquivalent(e) {
        return e instanceof ContextLetReferenceExpr && e.target === this.target;
    }
    isConstant() {
        return false;
    }
    transformInternalExpressions() { }
    clone() {
        return new ContextLetReferenceExpr(this.target, this.targetSlot);
    }
}
exports.ContextLetReferenceExpr = ContextLetReferenceExpr;
/**
 * A reference to the current view context (usually the `ctx` variable in a template function).
 */
class ContextExpr extends ExpressionBase {
    constructor(view) {
        super();
        this.view = view;
        this.kind = enums_1.ExpressionKind.Context;
    }
    visitExpression() { }
    isEquivalent(e) {
        return e instanceof ContextExpr && e.view === this.view;
    }
    isConstant() {
        return false;
    }
    transformInternalExpressions() { }
    clone() {
        return new ContextExpr(this.view);
    }
}
exports.ContextExpr = ContextExpr;
/**
 * A reference to the current view context inside a track function.
 */
class TrackContextExpr extends ExpressionBase {
    constructor(view) {
        super();
        this.view = view;
        this.kind = enums_1.ExpressionKind.TrackContext;
    }
    visitExpression() { }
    isEquivalent(e) {
        return e instanceof TrackContextExpr && e.view === this.view;
    }
    isConstant() {
        return false;
    }
    transformInternalExpressions() { }
    clone() {
        return new TrackContextExpr(this.view);
    }
}
exports.TrackContextExpr = TrackContextExpr;
/**
 * Runtime operation to navigate to the next view context in the view hierarchy.
 */
class NextContextExpr extends ExpressionBase {
    constructor() {
        super();
        this.kind = enums_1.ExpressionKind.NextContext;
        this.steps = 1;
    }
    visitExpression() { }
    isEquivalent(e) {
        return e instanceof NextContextExpr && e.steps === this.steps;
    }
    isConstant() {
        return false;
    }
    transformInternalExpressions() { }
    clone() {
        const expr = new NextContextExpr();
        expr.steps = this.steps;
        return expr;
    }
}
exports.NextContextExpr = NextContextExpr;
/**
 * Runtime operation to snapshot the current view context.
 *
 * The result of this operation can be stored in a variable and later used with the `RestoreView`
 * operation.
 */
class GetCurrentViewExpr extends ExpressionBase {
    constructor() {
        super();
        this.kind = enums_1.ExpressionKind.GetCurrentView;
    }
    visitExpression() { }
    isEquivalent(e) {
        return e instanceof GetCurrentViewExpr;
    }
    isConstant() {
        return false;
    }
    transformInternalExpressions() { }
    clone() {
        return new GetCurrentViewExpr();
    }
}
exports.GetCurrentViewExpr = GetCurrentViewExpr;
/**
 * Runtime operation to restore a snapshotted view.
 */
class RestoreViewExpr extends ExpressionBase {
    constructor(view) {
        super();
        this.view = view;
        this.kind = enums_1.ExpressionKind.RestoreView;
    }
    visitExpression(visitor, context) {
        if (typeof this.view !== 'number') {
            this.view.visitExpression(visitor, context);
        }
    }
    isEquivalent(e) {
        if (!(e instanceof RestoreViewExpr) || typeof e.view !== typeof this.view) {
            return false;
        }
        if (typeof this.view === 'number') {
            return this.view === e.view;
        }
        else {
            return this.view.isEquivalent(e.view);
        }
    }
    isConstant() {
        return false;
    }
    transformInternalExpressions(transform, flags) {
        if (typeof this.view !== 'number') {
            this.view = transformExpressionsInExpression(this.view, transform, flags);
        }
    }
    clone() {
        return new RestoreViewExpr(this.view instanceof o.Expression ? this.view.clone() : this.view);
    }
}
exports.RestoreViewExpr = RestoreViewExpr;
/**
 * Runtime operation to reset the current view context after `RestoreView`.
 */
class ResetViewExpr extends ExpressionBase {
    constructor(expr) {
        super();
        this.expr = expr;
        this.kind = enums_1.ExpressionKind.ResetView;
    }
    visitExpression(visitor, context) {
        this.expr.visitExpression(visitor, context);
    }
    isEquivalent(e) {
        return e instanceof ResetViewExpr && this.expr.isEquivalent(e.expr);
    }
    isConstant() {
        return false;
    }
    transformInternalExpressions(transform, flags) {
        this.expr = transformExpressionsInExpression(this.expr, transform, flags);
    }
    clone() {
        return new ResetViewExpr(this.expr.clone());
    }
}
exports.ResetViewExpr = ResetViewExpr;
class TwoWayBindingSetExpr extends ExpressionBase {
    constructor(target, value) {
        super();
        this.target = target;
        this.value = value;
        this.kind = enums_1.ExpressionKind.TwoWayBindingSet;
    }
    visitExpression(visitor, context) {
        this.target.visitExpression(visitor, context);
        this.value.visitExpression(visitor, context);
    }
    isEquivalent(other) {
        return this.target.isEquivalent(other.target) && this.value.isEquivalent(other.value);
    }
    isConstant() {
        return false;
    }
    transformInternalExpressions(transform, flags) {
        this.target = transformExpressionsInExpression(this.target, transform, flags);
        this.value = transformExpressionsInExpression(this.value, transform, flags);
    }
    clone() {
        return new TwoWayBindingSetExpr(this.target, this.value);
    }
}
exports.TwoWayBindingSetExpr = TwoWayBindingSetExpr;
/**
 * Read of a variable declared as an `ir.VariableOp` and referenced through its `ir.XrefId`.
 */
class ReadVariableExpr extends ExpressionBase {
    constructor(xref) {
        super();
        this.xref = xref;
        this.kind = enums_1.ExpressionKind.ReadVariable;
        this.name = null;
    }
    visitExpression() { }
    isEquivalent(other) {
        return other instanceof ReadVariableExpr && other.xref === this.xref;
    }
    isConstant() {
        return false;
    }
    transformInternalExpressions() { }
    clone() {
        const expr = new ReadVariableExpr(this.xref);
        expr.name = this.name;
        return expr;
    }
}
exports.ReadVariableExpr = ReadVariableExpr;
class PureFunctionExpr extends ExpressionBase {
    constructor(expression, args) {
        super();
        this.kind = enums_1.ExpressionKind.PureFunctionExpr;
        this[_c] = true;
        this[_d] = true;
        this.varOffset = null;
        /**
         * Once extracted to the `ConstantPool`, a reference to the function which defines the computation
         * of `body`.
         */
        this.fn = null;
        this.body = expression;
        this.args = args;
    }
    visitExpression(visitor, context) {
        var _j;
        (_j = this.body) === null || _j === void 0 ? void 0 : _j.visitExpression(visitor, context);
        for (const arg of this.args) {
            arg.visitExpression(visitor, context);
        }
    }
    isEquivalent(other) {
        if (!(other instanceof PureFunctionExpr) || other.args.length !== this.args.length) {
            return false;
        }
        return (other.body !== null &&
            this.body !== null &&
            other.body.isEquivalent(this.body) &&
            other.args.every((arg, idx) => arg.isEquivalent(this.args[idx])));
    }
    isConstant() {
        return false;
    }
    transformInternalExpressions(transform, flags) {
        if (this.body !== null) {
            // TODO: figure out if this is the right flag to pass here.
            this.body = transformExpressionsInExpression(this.body, transform, flags | VisitorContextFlag.InChildOperation);
        }
        else if (this.fn !== null) {
            this.fn = transformExpressionsInExpression(this.fn, transform, flags);
        }
        for (let i = 0; i < this.args.length; i++) {
            this.args[i] = transformExpressionsInExpression(this.args[i], transform, flags);
        }
    }
    clone() {
        var _j, _k, _l, _m;
        const expr = new PureFunctionExpr((_k = (_j = this.body) === null || _j === void 0 ? void 0 : _j.clone()) !== null && _k !== void 0 ? _k : null, this.args.map((arg) => arg.clone()));
        expr.fn = (_m = (_l = this.fn) === null || _l === void 0 ? void 0 : _l.clone()) !== null && _m !== void 0 ? _m : null;
        expr.varOffset = this.varOffset;
        return expr;
    }
}
exports.PureFunctionExpr = PureFunctionExpr;
_c = traits_1.ConsumesVarsTrait, _d = traits_1.UsesVarOffset;
class PureFunctionParameterExpr extends ExpressionBase {
    constructor(index) {
        super();
        this.index = index;
        this.kind = enums_1.ExpressionKind.PureFunctionParameterExpr;
    }
    visitExpression() { }
    isEquivalent(other) {
        return other instanceof PureFunctionParameterExpr && other.index === this.index;
    }
    isConstant() {
        return true;
    }
    transformInternalExpressions() { }
    clone() {
        return new PureFunctionParameterExpr(this.index);
    }
}
exports.PureFunctionParameterExpr = PureFunctionParameterExpr;
class PipeBindingExpr extends ExpressionBase {
    constructor(target, targetSlot, name, args) {
        super();
        this.target = target;
        this.targetSlot = targetSlot;
        this.name = name;
        this.args = args;
        this.kind = enums_1.ExpressionKind.PipeBinding;
        this[_e] = true;
        this[_f] = true;
        this.varOffset = null;
    }
    visitExpression(visitor, context) {
        for (const arg of this.args) {
            arg.visitExpression(visitor, context);
        }
    }
    isEquivalent() {
        return false;
    }
    isConstant() {
        return false;
    }
    transformInternalExpressions(transform, flags) {
        for (let idx = 0; idx < this.args.length; idx++) {
            this.args[idx] = transformExpressionsInExpression(this.args[idx], transform, flags);
        }
    }
    clone() {
        const r = new PipeBindingExpr(this.target, this.targetSlot, this.name, this.args.map((a) => a.clone()));
        r.varOffset = this.varOffset;
        return r;
    }
}
exports.PipeBindingExpr = PipeBindingExpr;
_e = traits_1.ConsumesVarsTrait, _f = traits_1.UsesVarOffset;
class PipeBindingVariadicExpr extends ExpressionBase {
    constructor(target, targetSlot, name, args, numArgs) {
        super();
        this.target = target;
        this.targetSlot = targetSlot;
        this.name = name;
        this.args = args;
        this.numArgs = numArgs;
        this.kind = enums_1.ExpressionKind.PipeBindingVariadic;
        this[_g] = true;
        this[_h] = true;
        this.varOffset = null;
    }
    visitExpression(visitor, context) {
        this.args.visitExpression(visitor, context);
    }
    isEquivalent() {
        return false;
    }
    isConstant() {
        return false;
    }
    transformInternalExpressions(transform, flags) {
        this.args = transformExpressionsInExpression(this.args, transform, flags);
    }
    clone() {
        const r = new PipeBindingVariadicExpr(this.target, this.targetSlot, this.name, this.args.clone(), this.numArgs);
        r.varOffset = this.varOffset;
        return r;
    }
}
exports.PipeBindingVariadicExpr = PipeBindingVariadicExpr;
_g = traits_1.ConsumesVarsTrait, _h = traits_1.UsesVarOffset;
class SafePropertyReadExpr extends ExpressionBase {
    constructor(receiver, name) {
        super();
        this.receiver = receiver;
        this.name = name;
        this.kind = enums_1.ExpressionKind.SafePropertyRead;
    }
    // An alias for name, which allows other logic to handle property reads and keyed reads together.
    get index() {
        return this.name;
    }
    visitExpression(visitor, context) {
        this.receiver.visitExpression(visitor, context);
    }
    isEquivalent() {
        return false;
    }
    isConstant() {
        return false;
    }
    transformInternalExpressions(transform, flags) {
        this.receiver = transformExpressionsInExpression(this.receiver, transform, flags);
    }
    clone() {
        return new SafePropertyReadExpr(this.receiver.clone(), this.name);
    }
}
exports.SafePropertyReadExpr = SafePropertyReadExpr;
class SafeKeyedReadExpr extends ExpressionBase {
    constructor(receiver, index, sourceSpan) {
        super(sourceSpan);
        this.receiver = receiver;
        this.index = index;
        this.kind = enums_1.ExpressionKind.SafeKeyedRead;
    }
    visitExpression(visitor, context) {
        this.receiver.visitExpression(visitor, context);
        this.index.visitExpression(visitor, context);
    }
    isEquivalent() {
        return false;
    }
    isConstant() {
        return false;
    }
    transformInternalExpressions(transform, flags) {
        this.receiver = transformExpressionsInExpression(this.receiver, transform, flags);
        this.index = transformExpressionsInExpression(this.index, transform, flags);
    }
    clone() {
        return new SafeKeyedReadExpr(this.receiver.clone(), this.index.clone(), this.sourceSpan);
    }
}
exports.SafeKeyedReadExpr = SafeKeyedReadExpr;
class SafeInvokeFunctionExpr extends ExpressionBase {
    constructor(receiver, args) {
        super();
        this.receiver = receiver;
        this.args = args;
        this.kind = enums_1.ExpressionKind.SafeInvokeFunction;
    }
    visitExpression(visitor, context) {
        this.receiver.visitExpression(visitor, context);
        for (const a of this.args) {
            a.visitExpression(visitor, context);
        }
    }
    isEquivalent() {
        return false;
    }
    isConstant() {
        return false;
    }
    transformInternalExpressions(transform, flags) {
        this.receiver = transformExpressionsInExpression(this.receiver, transform, flags);
        for (let i = 0; i < this.args.length; i++) {
            this.args[i] = transformExpressionsInExpression(this.args[i], transform, flags);
        }
    }
    clone() {
        return new SafeInvokeFunctionExpr(this.receiver.clone(), this.args.map((a) => a.clone()));
    }
}
exports.SafeInvokeFunctionExpr = SafeInvokeFunctionExpr;
class SafeTernaryExpr extends ExpressionBase {
    constructor(guard, expr) {
        super();
        this.guard = guard;
        this.expr = expr;
        this.kind = enums_1.ExpressionKind.SafeTernaryExpr;
    }
    visitExpression(visitor, context) {
        this.guard.visitExpression(visitor, context);
        this.expr.visitExpression(visitor, context);
    }
    isEquivalent() {
        return false;
    }
    isConstant() {
        return false;
    }
    transformInternalExpressions(transform, flags) {
        this.guard = transformExpressionsInExpression(this.guard, transform, flags);
        this.expr = transformExpressionsInExpression(this.expr, transform, flags);
    }
    clone() {
        return new SafeTernaryExpr(this.guard.clone(), this.expr.clone());
    }
}
exports.SafeTernaryExpr = SafeTernaryExpr;
class EmptyExpr extends ExpressionBase {
    constructor() {
        super(...arguments);
        this.kind = enums_1.ExpressionKind.EmptyExpr;
    }
    visitExpression(visitor, context) { }
    isEquivalent(e) {
        return e instanceof EmptyExpr;
    }
    isConstant() {
        return true;
    }
    clone() {
        return new EmptyExpr();
    }
    transformInternalExpressions() { }
}
exports.EmptyExpr = EmptyExpr;
class AssignTemporaryExpr extends ExpressionBase {
    constructor(expr, xref) {
        super();
        this.expr = expr;
        this.xref = xref;
        this.kind = enums_1.ExpressionKind.AssignTemporaryExpr;
        this.name = null;
    }
    visitExpression(visitor, context) {
        this.expr.visitExpression(visitor, context);
    }
    isEquivalent() {
        return false;
    }
    isConstant() {
        return false;
    }
    transformInternalExpressions(transform, flags) {
        this.expr = transformExpressionsInExpression(this.expr, transform, flags);
    }
    clone() {
        const a = new AssignTemporaryExpr(this.expr.clone(), this.xref);
        a.name = this.name;
        return a;
    }
}
exports.AssignTemporaryExpr = AssignTemporaryExpr;
class ReadTemporaryExpr extends ExpressionBase {
    constructor(xref) {
        super();
        this.xref = xref;
        this.kind = enums_1.ExpressionKind.ReadTemporaryExpr;
        this.name = null;
    }
    visitExpression(visitor, context) { }
    isEquivalent() {
        return this.xref === this.xref;
    }
    isConstant() {
        return false;
    }
    transformInternalExpressions(transform, flags) { }
    clone() {
        const r = new ReadTemporaryExpr(this.xref);
        r.name = this.name;
        return r;
    }
}
exports.ReadTemporaryExpr = ReadTemporaryExpr;
class SlotLiteralExpr extends ExpressionBase {
    constructor(slot) {
        super();
        this.slot = slot;
        this.kind = enums_1.ExpressionKind.SlotLiteralExpr;
    }
    visitExpression(visitor, context) { }
    isEquivalent(e) {
        return e instanceof SlotLiteralExpr && e.slot === this.slot;
    }
    isConstant() {
        return true;
    }
    clone() {
        return new SlotLiteralExpr(this.slot);
    }
    transformInternalExpressions() { }
}
exports.SlotLiteralExpr = SlotLiteralExpr;
class ConditionalCaseExpr extends ExpressionBase {
    /**
     * Create an expression for one branch of a conditional.
     * @param expr The expression to be tested for this case. Might be null, as in an `else` case.
     * @param target The Xref of the view to be displayed if this condition is true.
     */
    constructor(expr, target, targetSlot, alias = null) {
        super();
        this.expr = expr;
        this.target = target;
        this.targetSlot = targetSlot;
        this.alias = alias;
        this.kind = enums_1.ExpressionKind.ConditionalCase;
    }
    visitExpression(visitor, context) {
        if (this.expr !== null) {
            this.expr.visitExpression(visitor, context);
        }
    }
    isEquivalent(e) {
        return e instanceof ConditionalCaseExpr && e.expr === this.expr;
    }
    isConstant() {
        return true;
    }
    clone() {
        return new ConditionalCaseExpr(this.expr, this.target, this.targetSlot);
    }
    transformInternalExpressions(transform, flags) {
        if (this.expr !== null) {
            this.expr = transformExpressionsInExpression(this.expr, transform, flags);
        }
    }
}
exports.ConditionalCaseExpr = ConditionalCaseExpr;
class ConstCollectedExpr extends ExpressionBase {
    constructor(expr) {
        super();
        this.expr = expr;
        this.kind = enums_1.ExpressionKind.ConstCollected;
    }
    transformInternalExpressions(transform, flags) {
        this.expr = transform(this.expr, flags);
    }
    visitExpression(visitor, context) {
        this.expr.visitExpression(visitor, context);
    }
    isEquivalent(e) {
        if (!(e instanceof ConstCollectedExpr)) {
            return false;
        }
        return this.expr.isEquivalent(e.expr);
    }
    isConstant() {
        return this.expr.isConstant();
    }
    clone() {
        return new ConstCollectedExpr(this.expr);
    }
}
exports.ConstCollectedExpr = ConstCollectedExpr;
/**
 * Visits all `Expression`s in the AST of `op` with the `visitor` function.
 */
function visitExpressionsInOp(op, visitor) {
    transformExpressionsInOp(op, (expr, flags) => {
        visitor(expr, flags);
        return expr;
    }, VisitorContextFlag.None);
}
var VisitorContextFlag;
(function (VisitorContextFlag) {
    VisitorContextFlag[VisitorContextFlag["None"] = 0] = "None";
    VisitorContextFlag[VisitorContextFlag["InChildOperation"] = 1] = "InChildOperation";
})(VisitorContextFlag || (exports.VisitorContextFlag = VisitorContextFlag = {}));
function transformExpressionsInInterpolation(interpolation, transform, flags) {
    for (let i = 0; i < interpolation.expressions.length; i++) {
        interpolation.expressions[i] = transformExpressionsInExpression(interpolation.expressions[i], transform, flags);
    }
}
/**
 * Transform all `Expression`s in the AST of `op` with the `transform` function.
 *
 * All such operations will be replaced with the result of applying `transform`, which may be an
 * identity transformation.
 */
function transformExpressionsInOp(op, transform, flags) {
    switch (op.kind) {
        case enums_1.OpKind.StyleProp:
        case enums_1.OpKind.StyleMap:
        case enums_1.OpKind.ClassProp:
        case enums_1.OpKind.ClassMap:
        case enums_1.OpKind.Binding:
            if (op.expression instanceof update_1.Interpolation) {
                transformExpressionsInInterpolation(op.expression, transform, flags);
            }
            else {
                op.expression = transformExpressionsInExpression(op.expression, transform, flags);
            }
            break;
        case enums_1.OpKind.Property:
        case enums_1.OpKind.DomProperty:
        case enums_1.OpKind.Attribute:
            if (op.expression instanceof update_1.Interpolation) {
                transformExpressionsInInterpolation(op.expression, transform, flags);
            }
            else {
                op.expression = transformExpressionsInExpression(op.expression, transform, flags);
            }
            op.sanitizer =
                op.sanitizer && transformExpressionsInExpression(op.sanitizer, transform, flags);
            break;
        case enums_1.OpKind.TwoWayProperty:
            op.expression = transformExpressionsInExpression(op.expression, transform, flags);
            op.sanitizer =
                op.sanitizer && transformExpressionsInExpression(op.sanitizer, transform, flags);
            break;
        case enums_1.OpKind.I18nExpression:
            op.expression = transformExpressionsInExpression(op.expression, transform, flags);
            break;
        case enums_1.OpKind.InterpolateText:
            transformExpressionsInInterpolation(op.interpolation, transform, flags);
            break;
        case enums_1.OpKind.Statement:
            transformExpressionsInStatement(op.statement, transform, flags);
            break;
        case enums_1.OpKind.Variable:
            op.initializer = transformExpressionsInExpression(op.initializer, transform, flags);
            break;
        case enums_1.OpKind.Conditional:
            for (const condition of op.conditions) {
                if (condition.expr === null) {
                    // This is a default case.
                    continue;
                }
                condition.expr = transformExpressionsInExpression(condition.expr, transform, flags);
            }
            if (op.processed !== null) {
                op.processed = transformExpressionsInExpression(op.processed, transform, flags);
            }
            if (op.contextValue !== null) {
                op.contextValue = transformExpressionsInExpression(op.contextValue, transform, flags);
            }
            break;
        case enums_1.OpKind.Listener:
        case enums_1.OpKind.TwoWayListener:
            for (const innerOp of op.handlerOps) {
                transformExpressionsInOp(innerOp, transform, flags | VisitorContextFlag.InChildOperation);
            }
            break;
        case enums_1.OpKind.ExtractedAttribute:
            op.expression =
                op.expression && transformExpressionsInExpression(op.expression, transform, flags);
            op.trustedValueFn =
                op.trustedValueFn && transformExpressionsInExpression(op.trustedValueFn, transform, flags);
            break;
        case enums_1.OpKind.RepeaterCreate:
            if (op.trackByOps === null) {
                op.track = transformExpressionsInExpression(op.track, transform, flags);
            }
            else {
                for (const innerOp of op.trackByOps) {
                    transformExpressionsInOp(innerOp, transform, flags | VisitorContextFlag.InChildOperation);
                }
            }
            if (op.trackByFn !== null) {
                op.trackByFn = transformExpressionsInExpression(op.trackByFn, transform, flags);
            }
            break;
        case enums_1.OpKind.Repeater:
            op.collection = transformExpressionsInExpression(op.collection, transform, flags);
            break;
        case enums_1.OpKind.Defer:
            if (op.loadingConfig !== null) {
                op.loadingConfig = transformExpressionsInExpression(op.loadingConfig, transform, flags);
            }
            if (op.placeholderConfig !== null) {
                op.placeholderConfig = transformExpressionsInExpression(op.placeholderConfig, transform, flags);
            }
            if (op.resolverFn !== null) {
                op.resolverFn = transformExpressionsInExpression(op.resolverFn, transform, flags);
            }
            break;
        case enums_1.OpKind.I18nMessage:
            for (const [placeholder, expr] of op.params) {
                op.params.set(placeholder, transformExpressionsInExpression(expr, transform, flags));
            }
            for (const [placeholder, expr] of op.postprocessingParams) {
                op.postprocessingParams.set(placeholder, transformExpressionsInExpression(expr, transform, flags));
            }
            break;
        case enums_1.OpKind.DeferWhen:
            op.expr = transformExpressionsInExpression(op.expr, transform, flags);
            break;
        case enums_1.OpKind.StoreLet:
            op.value = transformExpressionsInExpression(op.value, transform, flags);
            break;
        case enums_1.OpKind.Advance:
        case enums_1.OpKind.Container:
        case enums_1.OpKind.ContainerEnd:
        case enums_1.OpKind.ContainerStart:
        case enums_1.OpKind.DeferOn:
        case enums_1.OpKind.DisableBindings:
        case enums_1.OpKind.Element:
        case enums_1.OpKind.ElementEnd:
        case enums_1.OpKind.ElementStart:
        case enums_1.OpKind.EnableBindings:
        case enums_1.OpKind.I18n:
        case enums_1.OpKind.I18nApply:
        case enums_1.OpKind.I18nContext:
        case enums_1.OpKind.I18nEnd:
        case enums_1.OpKind.I18nStart:
        case enums_1.OpKind.IcuEnd:
        case enums_1.OpKind.IcuStart:
        case enums_1.OpKind.Namespace:
        case enums_1.OpKind.Pipe:
        case enums_1.OpKind.Projection:
        case enums_1.OpKind.ProjectionDef:
        case enums_1.OpKind.Template:
        case enums_1.OpKind.Text:
        case enums_1.OpKind.I18nAttributes:
        case enums_1.OpKind.IcuPlaceholder:
        case enums_1.OpKind.DeclareLet:
        case enums_1.OpKind.SourceLocation:
        case enums_1.OpKind.ConditionalCreate:
        case enums_1.OpKind.ConditionalBranchCreate:
            // These operations contain no expressions.
            break;
        default:
            throw new Error(`AssertionError: transformExpressionsInOp doesn't handle ${enums_1.OpKind[op.kind]}`);
    }
}
/**
 * Transform all `Expression`s in the AST of `expr` with the `transform` function.
 *
 * All such operations will be replaced with the result of applying `transform`, which may be an
 * identity transformation.
 */
function transformExpressionsInExpression(expr, transform, flags) {
    if (expr instanceof ExpressionBase) {
        expr.transformInternalExpressions(transform, flags);
    }
    else if (expr instanceof o.BinaryOperatorExpr) {
        expr.lhs = transformExpressionsInExpression(expr.lhs, transform, flags);
        expr.rhs = transformExpressionsInExpression(expr.rhs, transform, flags);
    }
    else if (expr instanceof o.UnaryOperatorExpr) {
        expr.expr = transformExpressionsInExpression(expr.expr, transform, flags);
    }
    else if (expr instanceof o.ReadPropExpr) {
        expr.receiver = transformExpressionsInExpression(expr.receiver, transform, flags);
    }
    else if (expr instanceof o.ReadKeyExpr) {
        expr.receiver = transformExpressionsInExpression(expr.receiver, transform, flags);
        expr.index = transformExpressionsInExpression(expr.index, transform, flags);
    }
    else if (expr instanceof o.WritePropExpr) {
        expr.receiver = transformExpressionsInExpression(expr.receiver, transform, flags);
        expr.value = transformExpressionsInExpression(expr.value, transform, flags);
    }
    else if (expr instanceof o.WriteKeyExpr) {
        expr.receiver = transformExpressionsInExpression(expr.receiver, transform, flags);
        expr.index = transformExpressionsInExpression(expr.index, transform, flags);
        expr.value = transformExpressionsInExpression(expr.value, transform, flags);
    }
    else if (expr instanceof o.InvokeFunctionExpr) {
        expr.fn = transformExpressionsInExpression(expr.fn, transform, flags);
        for (let i = 0; i < expr.args.length; i++) {
            expr.args[i] = transformExpressionsInExpression(expr.args[i], transform, flags);
        }
    }
    else if (expr instanceof o.LiteralArrayExpr) {
        for (let i = 0; i < expr.entries.length; i++) {
            expr.entries[i] = transformExpressionsInExpression(expr.entries[i], transform, flags);
        }
    }
    else if (expr instanceof o.LiteralMapExpr) {
        for (let i = 0; i < expr.entries.length; i++) {
            expr.entries[i].value = transformExpressionsInExpression(expr.entries[i].value, transform, flags);
        }
    }
    else if (expr instanceof o.ConditionalExpr) {
        expr.condition = transformExpressionsInExpression(expr.condition, transform, flags);
        expr.trueCase = transformExpressionsInExpression(expr.trueCase, transform, flags);
        if (expr.falseCase !== null) {
            expr.falseCase = transformExpressionsInExpression(expr.falseCase, transform, flags);
        }
    }
    else if (expr instanceof o.TypeofExpr) {
        expr.expr = transformExpressionsInExpression(expr.expr, transform, flags);
    }
    else if (expr instanceof o.VoidExpr) {
        expr.expr = transformExpressionsInExpression(expr.expr, transform, flags);
    }
    else if (expr instanceof o.WriteVarExpr) {
        expr.value = transformExpressionsInExpression(expr.value, transform, flags);
    }
    else if (expr instanceof o.LocalizedString) {
        for (let i = 0; i < expr.expressions.length; i++) {
            expr.expressions[i] = transformExpressionsInExpression(expr.expressions[i], transform, flags);
        }
    }
    else if (expr instanceof o.NotExpr) {
        expr.condition = transformExpressionsInExpression(expr.condition, transform, flags);
    }
    else if (expr instanceof o.TaggedTemplateLiteralExpr) {
        expr.tag = transformExpressionsInExpression(expr.tag, transform, flags);
        expr.template.expressions = expr.template.expressions.map((e) => transformExpressionsInExpression(e, transform, flags));
    }
    else if (expr instanceof o.ArrowFunctionExpr) {
        if (Array.isArray(expr.body)) {
            for (let i = 0; i < expr.body.length; i++) {
                transformExpressionsInStatement(expr.body[i], transform, flags);
            }
        }
        else {
            expr.body = transformExpressionsInExpression(expr.body, transform, flags);
        }
    }
    else if (expr instanceof o.WrappedNodeExpr) {
        // TODO: Do we need to transform any TS nodes nested inside of this expression?
    }
    else if (expr instanceof o.TemplateLiteralExpr) {
        for (let i = 0; i < expr.expressions.length; i++) {
            expr.expressions[i] = transformExpressionsInExpression(expr.expressions[i], transform, flags);
        }
    }
    else if (expr instanceof o.ParenthesizedExpr) {
        expr.expr = transformExpressionsInExpression(expr.expr, transform, flags);
    }
    else if (expr instanceof o.ReadVarExpr ||
        expr instanceof o.ExternalExpr ||
        expr instanceof o.LiteralExpr) {
        // No action for these types.
    }
    else {
        throw new Error(`Unhandled expression kind: ${expr.constructor.name}`);
    }
    return transform(expr, flags);
}
/**
 * Transform all `Expression`s in the AST of `stmt` with the `transform` function.
 *
 * All such operations will be replaced with the result of applying `transform`, which may be an
 * identity transformation.
 */
function transformExpressionsInStatement(stmt, transform, flags) {
    if (stmt instanceof o.ExpressionStatement) {
        stmt.expr = transformExpressionsInExpression(stmt.expr, transform, flags);
    }
    else if (stmt instanceof o.ReturnStatement) {
        stmt.value = transformExpressionsInExpression(stmt.value, transform, flags);
    }
    else if (stmt instanceof o.DeclareVarStmt) {
        if (stmt.value !== undefined) {
            stmt.value = transformExpressionsInExpression(stmt.value, transform, flags);
        }
    }
    else if (stmt instanceof o.IfStmt) {
        stmt.condition = transformExpressionsInExpression(stmt.condition, transform, flags);
        for (const caseStatement of stmt.trueCase) {
            transformExpressionsInStatement(caseStatement, transform, flags);
        }
        for (const caseStatement of stmt.falseCase) {
            transformExpressionsInStatement(caseStatement, transform, flags);
        }
    }
    else {
        throw new Error(`Unhandled statement kind: ${stmt.constructor.name}`);
    }
}
/**
 * Checks whether the given expression is a string literal.
 */
function isStringLiteral(expr) {
    return expr instanceof o.LiteralExpr && typeof expr.value === 'string';
}
