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
exports.attemptExtractTemplateDefinition = attemptExtractTemplateDefinition;
const typescript_1 = __importDefault(require("typescript"));
const reflection_1 = require("@angular/compiler-cli/src/ngtsc/reflection");
const annotations_1 = require("@angular/compiler-cli/src/ngtsc/annotations");
const partial_evaluator_1 = require("@angular/compiler-cli/src/ngtsc/partial_evaluator");
const compiler_1 = require("@angular/compiler");
/**
 * Attempts to extract the `TemplateDefinition` for the given
 * class, if possible.
 *
 * The definition can then be used with the Angular compiler to
 * load/parse the given template.
 */
function attemptExtractTemplateDefinition(node, checker, reflector, resourceLoader) {
    const classDecorators = reflector.getDecoratorsOfDeclaration(node);
    const evaluator = new partial_evaluator_1.PartialEvaluator(reflector, checker, null);
    const ngDecorators = classDecorators !== null
        ? (0, annotations_1.getAngularDecorators)(classDecorators, ['Component'], /* isAngularCore */ false)
        : [];
    if (ngDecorators.length === 0 ||
        ngDecorators[0].args === null ||
        ngDecorators[0].args.length === 0 ||
        !typescript_1.default.isObjectLiteralExpression(ngDecorators[0].args[0])) {
        return null;
    }
    const properties = (0, reflection_1.reflectObjectLiteral)(ngDecorators[0].args[0]);
    const templateProp = properties.get('template');
    const templateUrlProp = properties.get('templateUrl');
    const containingFile = node.getSourceFile().fileName;
    // inline template.
    if (templateProp !== undefined) {
        const templateStr = evaluator.evaluate(templateProp);
        if (typeof templateStr === 'string') {
            return {
                isInline: true,
                expression: templateProp,
                interpolationConfig: compiler_1.DEFAULT_INTERPOLATION_CONFIG,
                preserveWhitespaces: false,
                resolvedTemplateUrl: containingFile,
                templateUrl: containingFile,
            };
        }
    }
    try {
        // external template.
        if (templateUrlProp !== undefined) {
            const templateUrl = evaluator.evaluate(templateUrlProp);
            if (typeof templateUrl === 'string') {
                return {
                    isInline: false,
                    interpolationConfig: compiler_1.DEFAULT_INTERPOLATION_CONFIG,
                    preserveWhitespaces: false,
                    templateUrlExpression: templateUrlProp,
                    templateUrl,
                    resolvedTemplateUrl: resourceLoader.resolve(templateUrl, containingFile),
                };
            }
        }
    }
    catch (e) {
        console.error(`Could not parse external template: ${e}`);
    }
    return null;
}
