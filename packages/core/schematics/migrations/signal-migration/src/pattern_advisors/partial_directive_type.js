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
exports.PartialDirectiveTypeInCatalystTests = void 0;
const typescript_1 = __importDefault(require("typescript"));
/**
 * Recognizes `Partial<T>` instances in Catalyst tests. Those type queries
 * are likely used for typing property initialization values for the given class `T`
 * and we have a few scenarios:
 *
 *   1. The API does not unwrap signal inputs. In which case, the values are likely no
 *      longer assignable to an `InputSignal`.
 *   2. The API does unwrap signal inputs, in which case we need to unwrap the `Partial`
 *      because the values are raw initial values, like they were before.
 *
 * We can enable this heuristic when we detect Catalyst as we know it supports unwrapping.
 */
class PartialDirectiveTypeInCatalystTests {
    constructor(checker, knownFields) {
        this.checker = checker;
        this.knownFields = knownFields;
    }
    detect(node) {
        var _a;
        // Detect `Partial<...>`
        if (!typescript_1.default.isTypeReferenceNode(node) ||
            !typescript_1.default.isIdentifier(node.typeName) ||
            node.typeName.text !== 'Partial') {
            return null;
        }
        // Ignore if the source file doesn't reference Catalyst.
        if (!node.getSourceFile().text.includes('angular2/testing/catalyst')) {
            return null;
        }
        // Extract T of `Partial<T>`.
        const cmpTypeArg = (_a = node.typeArguments) === null || _a === void 0 ? void 0 : _a[0];
        if (!cmpTypeArg ||
            !typescript_1.default.isTypeReferenceNode(cmpTypeArg) ||
            !typescript_1.default.isIdentifier(cmpTypeArg.typeName)) {
            return null;
        }
        const cmpType = cmpTypeArg.typeName;
        const symbol = this.checker.getSymbolAtLocation(cmpType);
        // Note: Technically the class might be derived of an input-containing class,
        // but this is out of scope for now. We can expand if we see it's a common case.
        if ((symbol === null || symbol === void 0 ? void 0 : symbol.valueDeclaration) === undefined ||
            !typescript_1.default.isClassDeclaration(symbol.valueDeclaration) ||
            !this.knownFields.shouldTrackClassReference(symbol.valueDeclaration)) {
            return null;
        }
        return { referenceNode: node, targetClass: symbol.valueDeclaration };
    }
}
exports.PartialDirectiveTypeInCatalystTests = PartialDirectiveTypeInCatalystTests;
