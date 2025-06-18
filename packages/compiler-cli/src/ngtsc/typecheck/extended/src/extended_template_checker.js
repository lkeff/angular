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
exports.ExtendedTemplateCheckerImpl = void 0;
const typescript_1 = __importDefault(require("typescript"));
const api_1 = require("../../../core/api");
class ExtendedTemplateCheckerImpl {
    constructor(templateTypeChecker, typeChecker, templateCheckFactories, options) {
        var _a, _b, _c, _d, _e;
        this.partialCtx = { templateTypeChecker, typeChecker };
        this.templateChecks = new Map();
        for (const factory of templateCheckFactories) {
            // Read the diagnostic category from compiler options.
            const category = diagnosticLabelToCategory((_e = (_c = (_b = (_a = options === null || options === void 0 ? void 0 : options.extendedDiagnostics) === null || _a === void 0 ? void 0 : _a.checks) === null || _b === void 0 ? void 0 : _b[factory.name]) !== null && _c !== void 0 ? _c : (_d = options === null || options === void 0 ? void 0 : options.extendedDiagnostics) === null || _d === void 0 ? void 0 : _d.defaultCategory) !== null && _e !== void 0 ? _e : api_1.DiagnosticCategoryLabel.Warning);
            // Skip the diagnostic if suppressed via compiler options.
            if (category === null) {
                continue;
            }
            // Try to create the check.
            const check = factory.create(options);
            // Skip the diagnostic if it was disabled due to unsupported options. For example, this can
            // happen if the check requires `strictNullChecks: true` but that flag is disabled in compiler
            // options.
            if (check === null) {
                continue;
            }
            // Use the check.
            this.templateChecks.set(check, category);
        }
    }
    getDiagnosticsForComponent(component) {
        const template = this.partialCtx.templateTypeChecker.getTemplate(component);
        // Skip checks if component has no template. This can happen if the user writes a
        // `@Component()` but doesn't add the template, could happen in the language service
        // when users are in the middle of typing code.
        if (template === null) {
            return [];
        }
        const diagnostics = [];
        for (const [check, category] of this.templateChecks.entries()) {
            const ctx = Object.assign(Object.assign({}, this.partialCtx), { 
                // Wrap `templateTypeChecker.makeTemplateDiagnostic()` to implicitly provide all the known
                // options.
                makeTemplateDiagnostic: (span, message, relatedInformation) => {
                    return this.partialCtx.templateTypeChecker.makeTemplateDiagnostic(component, span, category, check.code, message, relatedInformation);
                } });
            diagnostics.push(...check.run(ctx, component, template));
        }
        return diagnostics;
    }
}
exports.ExtendedTemplateCheckerImpl = ExtendedTemplateCheckerImpl;
/**
 * Converts a `DiagnosticCategoryLabel` to its equivalent `ts.DiagnosticCategory` or `null` if
 * the label is `DiagnosticCategoryLabel.Suppress`.
 */
function diagnosticLabelToCategory(label) {
    switch (label) {
        case api_1.DiagnosticCategoryLabel.Warning:
            return typescript_1.default.DiagnosticCategory.Warning;
        case api_1.DiagnosticCategoryLabel.Error:
            return typescript_1.default.DiagnosticCategory.Error;
        case api_1.DiagnosticCategoryLabel.Suppress:
            return null;
        default:
            return assertNever(label);
    }
}
function assertNever(value) {
    throw new Error(`Unexpected call to 'assertNever()' with value:\n${value}`);
}
