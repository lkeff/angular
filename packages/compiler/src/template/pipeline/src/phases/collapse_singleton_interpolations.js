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
Object.defineProperty(exports, "__esModule", { value: true });
exports.collapseSingletonInterpolations = collapseSingletonInterpolations;
const ir = __importStar(require("../../ir"));
/**
 * Attribute interpolations of the form `[attr.foo]="{{foo}}""` should be "collapsed" into a plain
 * attribute instruction, instead of an `attributeInterpolate` instruction.
 *
 * (We cannot do this for singleton property interpolations, because `propertyInterpolate`
 * stringifies its expression.)
 *
 * The reification step is also capable of performing this transformation, but doing it early in the
 * pipeline allows other phases to accurately know what instruction will be emitted.
 */
function collapseSingletonInterpolations(job) {
    for (const unit of job.units) {
        for (const op of unit.update) {
            const eligibleOpKind = op.kind === ir.OpKind.Attribute;
            if (eligibleOpKind &&
                op.expression instanceof ir.Interpolation &&
                op.expression.strings.length === 2 &&
                op.expression.strings.every((s) => s === '')) {
                op.expression = op.expression.expressions[0];
            }
        }
    }
}
