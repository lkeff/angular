"use strict";
/*!
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
exports.InitializerApiUsageRule = void 0;
const typescript_1 = __importDefault(require("typescript"));
const annotations_1 = require("../../../annotations");
const diagnostics_1 = require("../../../diagnostics");
/** APIs whose usages should be checked by the rule. */
const APIS_TO_CHECK = [
    annotations_1.INPUT_INITIALIZER_FN,
    annotations_1.MODEL_INITIALIZER_FN,
    ...annotations_1.OUTPUT_INITIALIZER_FNS,
    ...annotations_1.QUERY_INITIALIZER_FNS,
];
/**
 * Rule that flags any initializer APIs that are used outside of an initializer.
 */
class InitializerApiUsageRule {
    constructor(reflector, importedSymbolsTracker) {
        this.reflector = reflector;
        this.importedSymbolsTracker = importedSymbolsTracker;
    }
    shouldCheck(sourceFile) {
        // Skip the traversal if there are no imports of the initializer APIs.
        return APIS_TO_CHECK.some(({ functionName, owningModule }) => {
            return (this.importedSymbolsTracker.hasNamedImport(sourceFile, functionName, owningModule) ||
                this.importedSymbolsTracker.hasNamespaceImport(sourceFile, owningModule));
        });
    }
    checkNode(node) {
        // We only care about call expressions.
        if (!typescript_1.default.isCallExpression(node)) {
            return null;
        }
        // Unwrap any parenthesized and `as` expressions since they don't affect the runtime behavior.
        while (node.parent &&
            (typescript_1.default.isParenthesizedExpression(node.parent) || typescript_1.default.isAsExpression(node.parent))) {
            node = node.parent;
        }
        if (!node.parent || !typescript_1.default.isCallExpression(node)) {
            return null;
        }
        const identifiedInitializer = (0, annotations_1.tryParseInitializerApi)(APIS_TO_CHECK, node, this.reflector, this.importedSymbolsTracker);
        if (identifiedInitializer === null) {
            return null;
        }
        const functionName = identifiedInitializer.api.functionName +
            (identifiedInitializer.isRequired ? '.required' : '');
        if (typescript_1.default.isPropertyDeclaration(node.parent) && node.parent.initializer === node) {
            let closestClass = node.parent;
            while (closestClass && !typescript_1.default.isClassDeclaration(closestClass)) {
                closestClass = closestClass.parent;
            }
            if (closestClass && typescript_1.default.isClassDeclaration(closestClass)) {
                const decorators = this.reflector.getDecoratorsOfDeclaration(closestClass);
                const isComponentOrDirective = decorators !== null &&
                    decorators.some((decorator) => {
                        var _a;
                        return (((_a = decorator.import) === null || _a === void 0 ? void 0 : _a.from) === '@angular/core' &&
                            (decorator.name === 'Component' || decorator.name === 'Directive'));
                    });
                return isComponentOrDirective
                    ? null
                    : (0, diagnostics_1.makeDiagnostic)(diagnostics_1.ErrorCode.UNSUPPORTED_INITIALIZER_API_USAGE, node, `Unsupported call to the ${functionName} function. This function can only be used as the initializer ` +
                        `of a property on a @Component or @Directive class.`);
            }
        }
        return (0, diagnostics_1.makeDiagnostic)(diagnostics_1.ErrorCode.UNSUPPORTED_INITIALIZER_API_USAGE, node, `Unsupported call to the ${functionName} function. This function can only be called in the initializer of a class member.`);
    }
}
exports.InitializerApiUsageRule = InitializerApiUsageRule;
