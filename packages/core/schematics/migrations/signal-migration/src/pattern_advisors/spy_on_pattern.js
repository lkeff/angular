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
exports.SpyOnFieldPattern = void 0;
const typescript_1 = __importDefault(require("typescript"));
const incompatibility_1 = require("../passes/problematic_patterns/incompatibility");
/**
 * Detects `spyOn(dirInstance, 'myInput')` calls that likely modify
 * the input signal. There is no way to change the value inside the input signal,
 * and hence observing is not possible.
 */
class SpyOnFieldPattern {
    constructor(checker, fields) {
        this.checker = checker;
        this.fields = fields;
    }
    detect(node) {
        if (typescript_1.default.isCallExpression(node) &&
            typescript_1.default.isIdentifier(node.expression) &&
            node.expression.text === 'spyOn' &&
            node.arguments.length === 2 &&
            typescript_1.default.isStringLiteralLike(node.arguments[1])) {
            const spyTargetType = this.checker.getTypeAtLocation(node.arguments[0]);
            const spyProperty = spyTargetType.getProperty(node.arguments[1].text);
            if (spyProperty === undefined) {
                return;
            }
            const fieldTarget = this.fields.attemptRetrieveDescriptorFromSymbol(spyProperty);
            if (fieldTarget === null) {
                return;
            }
            this.fields.markFieldIncompatible(fieldTarget, {
                reason: incompatibility_1.FieldIncompatibilityReason.SpyOnThatOverwritesField,
                context: node,
            });
        }
    }
}
exports.SpyOnFieldPattern = SpyOnFieldPattern;
