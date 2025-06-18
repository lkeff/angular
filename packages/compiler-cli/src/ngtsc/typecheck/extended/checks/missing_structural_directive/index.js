"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.factory = exports.KNOWN_CONTROL_FLOW_DIRECTIVES = void 0;
const compiler_1 = require("@angular/compiler");
const diagnostics_1 = require("../../../../diagnostics");
const api_1 = require("../../api");
/**
 * The list of known control flow directives present in the `CommonModule`.
 *
 * If these control flow directives are missing they will be reported by a separate diagnostic.
 */
exports.KNOWN_CONTROL_FLOW_DIRECTIVES = new Set([
    'ngIf',
    'ngFor',
    'ngForOf',
    'ngForTrackBy',
    'ngSwitchCase',
    'ngSwitchDefault',
]);
/**
 * Ensures that there are no structural directives (something like *select or *featureFlag)
 * used in a template of a *standalone* component without importing the directive. Returns
 * diagnostics in case such a directive is detected.
 *
 * Note: this check only handles the cases when structural directive syntax is used (e.g. `*featureFlag`).
 * Regular binding syntax (e.g. `[featureFlag]`) is handled separately in type checker and treated as a
 * hard error instead of a warning.
 */
class MissingStructuralDirectiveCheck extends api_1.TemplateCheckWithVisitor {
    constructor() {
        super(...arguments);
        this.code = diagnostics_1.ErrorCode.MISSING_STRUCTURAL_DIRECTIVE;
    }
    run(ctx, component, template) {
        const componentMetadata = ctx.templateTypeChecker.getDirectiveMetadata(component);
        // Avoid running this check for non-standalone components.
        if (!componentMetadata || !componentMetadata.isStandalone) {
            return [];
        }
        return super.run(ctx, component, template);
    }
    visitNode(ctx, component, node) {
        if (!(node instanceof compiler_1.TmplAstTemplate))
            return [];
        const customStructuralDirective = node.templateAttrs.find((attr) => !exports.KNOWN_CONTROL_FLOW_DIRECTIVES.has(attr.name));
        if (!customStructuralDirective)
            return [];
        const symbol = ctx.templateTypeChecker.getSymbolOfNode(node, component);
        if (symbol === null || symbol === void 0 ? void 0 : symbol.directives.length) {
            return [];
        }
        const sourceSpan = customStructuralDirective.keySpan || customStructuralDirective.sourceSpan;
        const errorMessage = `A structural directive \`${customStructuralDirective.name}\` was used in the template ` +
            `without a corresponding import in the component. ` +
            `Make sure that the directive is included in the \`@Component.imports\` array of this component.`;
        return [ctx.makeTemplateDiagnostic(sourceSpan, errorMessage)];
    }
}
exports.factory = {
    code: diagnostics_1.ErrorCode.MISSING_STRUCTURAL_DIRECTIVE,
    name: diagnostics_1.ExtendedTemplateDiagnosticName.MISSING_STRUCTURAL_DIRECTIVE,
    create: () => new MissingStructuralDirectiveCheck(),
};
