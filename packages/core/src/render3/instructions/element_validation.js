"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.KNOWN_CONTROL_FLOW_DIRECTIVES = void 0;
exports.ɵsetUnknownElementStrictMode = ɵsetUnknownElementStrictMode;
exports.ɵgetUnknownElementStrictMode = ɵgetUnknownElementStrictMode;
exports.ɵsetUnknownPropertyStrictMode = ɵsetUnknownPropertyStrictMode;
exports.ɵgetUnknownPropertyStrictMode = ɵgetUnknownPropertyStrictMode;
exports.validateElementIsKnown = validateElementIsKnown;
exports.isPropertyValid = isPropertyValid;
exports.handleUnknownPropertyError = handleUnknownPropertyError;
exports.reportUnknownPropertyError = reportUnknownPropertyError;
exports.getDeclarationComponentDef = getDeclarationComponentDef;
exports.isHostComponentStandalone = isHostComponentStandalone;
exports.getTemplateLocationDetails = getTemplateLocationDetails;
exports.matchingSchemas = matchingSchemas;
const errors_1 = require("../../errors");
const schema_1 = require("../../metadata/schema");
const assert_1 = require("../../util/assert");
const def_getters_1 = require("../def_getters");
const view_1 = require("../interfaces/view");
const attrs_utils_1 = require("../util/attrs_utils");
let shouldThrowErrorOnUnknownElement = false;
/**
 * Sets a strict mode for JIT-compiled components to throw an error on unknown elements,
 * instead of just logging the error.
 * (for AOT-compiled ones this check happens at build time).
 */
function ɵsetUnknownElementStrictMode(shouldThrow) {
    shouldThrowErrorOnUnknownElement = shouldThrow;
}
/**
 * Gets the current value of the strict mode.
 */
function ɵgetUnknownElementStrictMode() {
    return shouldThrowErrorOnUnknownElement;
}
let shouldThrowErrorOnUnknownProperty = false;
/**
 * Sets a strict mode for JIT-compiled components to throw an error on unknown properties,
 * instead of just logging the error.
 * (for AOT-compiled ones this check happens at build time).
 */
function ɵsetUnknownPropertyStrictMode(shouldThrow) {
    shouldThrowErrorOnUnknownProperty = shouldThrow;
}
/**
 * Gets the current value of the strict mode.
 */
function ɵgetUnknownPropertyStrictMode() {
    return shouldThrowErrorOnUnknownProperty;
}
/**
 * Validates that the element is known at runtime and produces
 * an error if it's not the case.
 * This check is relevant for JIT-compiled components (for AOT-compiled
 * ones this check happens at build time).
 *
 * The element is considered known if either:
 * - it's a known HTML element
 * - it's a known custom element
 * - the element matches any directive
 * - the element is allowed by one of the schemas
 *
 * @param element Element to validate
 * @param lView An `LView` that represents a current component that is being rendered
 * @param tagName Name of the tag to check
 * @param schemas Array of schemas
 * @param hasDirectives Boolean indicating that the element matches any directive
 */
function validateElementIsKnown(element, lView, tagName, schemas, hasDirectives) {
    // If `schemas` is set to `null`, that's an indication that this Component was compiled in AOT
    // mode where this check happens at compile time. In JIT mode, `schemas` is always present and
    // defined as an array (as an empty array in case `schemas` field is not defined) and we should
    // execute the check below.
    if (schemas === null)
        return;
    // If the element matches any directive, it's considered as valid.
    if (!hasDirectives && tagName !== null) {
        // The element is unknown if it's an instance of HTMLUnknownElement, or it isn't registered
        // as a custom element. Note that unknown elements with a dash in their name won't be instances
        // of HTMLUnknownElement in browsers that support web components.
        const isUnknown = 
        // Note that we can't check for `typeof HTMLUnknownElement === 'function'` because
        // Domino doesn't expose HTMLUnknownElement globally.
        (typeof HTMLUnknownElement !== 'undefined' &&
            HTMLUnknownElement &&
            element instanceof HTMLUnknownElement) ||
            (typeof customElements !== 'undefined' &&
                tagName.indexOf('-') > -1 &&
                !customElements.get(tagName));
        if (isUnknown && !matchingSchemas(schemas, tagName)) {
            const isHostStandalone = isHostComponentStandalone(lView);
            const templateLocation = getTemplateLocationDetails(lView);
            const schemas = `'${isHostStandalone ? '@Component' : '@NgModule'}.schemas'`;
            let message = `'${tagName}' is not a known element${templateLocation}:\n`;
            message += `1. If '${tagName}' is an Angular component, then verify that it is ${isHostStandalone
                ? "included in the '@Component.imports' of this component"
                : 'a part of an @NgModule where this component is declared'}.\n`;
            if (tagName && tagName.indexOf('-') > -1) {
                message += `2. If '${tagName}' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the ${schemas} of this component to suppress this message.`;
            }
            else {
                message += `2. To allow any element add 'NO_ERRORS_SCHEMA' to the ${schemas} of this component.`;
            }
            if (shouldThrowErrorOnUnknownElement) {
                throw new errors_1.RuntimeError(304 /* RuntimeErrorCode.UNKNOWN_ELEMENT */, message);
            }
            else {
                console.error((0, errors_1.formatRuntimeError)(304 /* RuntimeErrorCode.UNKNOWN_ELEMENT */, message));
            }
        }
    }
}
/**
 * Validates that the property of the element is known at runtime and returns
 * false if it's not the case.
 * This check is relevant for JIT-compiled components (for AOT-compiled
 * ones this check happens at build time).
 *
 * The property is considered known if either:
 * - it's a known property of the element
 * - the element is allowed by one of the schemas
 * - the property is used for animations
 *
 * @param element Element to validate
 * @param propName Name of the property to check
 * @param tagName Name of the tag hosting the property
 * @param schemas Array of schemas
 */
function isPropertyValid(element, propName, tagName, schemas) {
    // If `schemas` is set to `null`, that's an indication that this Component was compiled in AOT
    // mode where this check happens at compile time. In JIT mode, `schemas` is always present and
    // defined as an array (as an empty array in case `schemas` field is not defined) and we should
    // execute the check below.
    if (schemas === null)
        return true;
    // The property is considered valid if the element matches the schema, it exists on the element,
    // or it is synthetic.
    if (matchingSchemas(schemas, tagName) || propName in element || (0, attrs_utils_1.isAnimationProp)(propName)) {
        return true;
    }
    // Note: `typeof Node` returns 'function' in most browsers, but is undefined with domino.
    return typeof Node === 'undefined' || Node === null || !(element instanceof Node);
}
/**
 * Logs or throws an error that a property is not supported on an element.
 *
 * @param propName Name of the invalid property
 * @param tagName Name of the tag hosting the property
 * @param nodeType Type of the node hosting the property
 * @param lView An `LView` that represents a current component
 */
function handleUnknownPropertyError(propName, tagName, nodeType, lView) {
    // Special-case a situation when a structural directive is applied to
    // an `<ng-template>` element, for example: `<ng-template *ngIf="true">`.
    // In this case the compiler generates the `ɵɵtemplate` instruction with
    // the `null` as the tagName. The directive matching logic at runtime relies
    // on this effect (see `isInlineTemplate`), thus using the 'ng-template' as
    // a default value of the `tNode.value` is not feasible at this moment.
    if (!tagName && nodeType === 4 /* TNodeType.Container */) {
        tagName = 'ng-template';
    }
    const isHostStandalone = isHostComponentStandalone(lView);
    const templateLocation = getTemplateLocationDetails(lView);
    let message = `Can't bind to '${propName}' since it isn't a known property of '${tagName}'${templateLocation}.`;
    const schemas = `'${isHostStandalone ? '@Component' : '@NgModule'}.schemas'`;
    const importLocation = isHostStandalone
        ? "included in the '@Component.imports' of this component"
        : 'a part of an @NgModule where this component is declared';
    if (exports.KNOWN_CONTROL_FLOW_DIRECTIVES.has(propName)) {
        // Most likely this is a control flow directive (such as `*ngIf`) used in
        // a template, but the directive or the `CommonModule` is not imported.
        const correspondingImport = exports.KNOWN_CONTROL_FLOW_DIRECTIVES.get(propName);
        message +=
            `\nIf the '${propName}' is an Angular control flow directive, ` +
                `please make sure that either the '${correspondingImport}' directive or the 'CommonModule' is ${importLocation}.`;
    }
    else {
        // May be an Angular component, which is not imported/declared?
        message +=
            `\n1. If '${tagName}' is an Angular component and it has the ` +
                `'${propName}' input, then verify that it is ${importLocation}.`;
        // May be a Web Component?
        if (tagName && tagName.indexOf('-') > -1) {
            message +=
                `\n2. If '${tagName}' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' ` +
                    `to the ${schemas} of this component to suppress this message.`;
            message +=
                `\n3. To allow any property add 'NO_ERRORS_SCHEMA' to ` +
                    `the ${schemas} of this component.`;
        }
        else {
            // If it's expected, the error can be suppressed by the `NO_ERRORS_SCHEMA` schema.
            message +=
                `\n2. To allow any property add 'NO_ERRORS_SCHEMA' to ` +
                    `the ${schemas} of this component.`;
        }
    }
    reportUnknownPropertyError(message);
}
function reportUnknownPropertyError(message) {
    if (shouldThrowErrorOnUnknownProperty) {
        throw new errors_1.RuntimeError(303 /* RuntimeErrorCode.UNKNOWN_BINDING */, message);
    }
    else {
        console.error((0, errors_1.formatRuntimeError)(303 /* RuntimeErrorCode.UNKNOWN_BINDING */, message));
    }
}
/**
 * WARNING: this is a **dev-mode only** function (thus should always be guarded by the `ngDevMode`)
 * and must **not** be used in production bundles. The function makes megamorphic reads, which might
 * be too slow for production mode and also it relies on the constructor function being available.
 *
 * Gets a reference to the host component def (where a current component is declared).
 *
 * @param lView An `LView` that represents a current component that is being rendered.
 */
function getDeclarationComponentDef(lView) {
    !ngDevMode && (0, assert_1.throwError)('Must never be called in production mode');
    const declarationLView = lView[view_1.DECLARATION_COMPONENT_VIEW];
    const context = declarationLView[view_1.CONTEXT];
    // Unable to obtain a context.
    if (!context)
        return null;
    return context.constructor ? (0, def_getters_1.getComponentDef)(context.constructor) : null;
}
/**
 * WARNING: this is a **dev-mode only** function (thus should always be guarded by the `ngDevMode`)
 * and must **not** be used in production bundles. The function makes megamorphic reads, which might
 * be too slow for production mode.
 *
 * Checks if the current component is declared inside of a standalone component template.
 *
 * @param lView An `LView` that represents a current component that is being rendered.
 */
function isHostComponentStandalone(lView) {
    !ngDevMode && (0, assert_1.throwError)('Must never be called in production mode');
    const componentDef = getDeclarationComponentDef(lView);
    // Treat host component as non-standalone if we can't obtain the def.
    return !!(componentDef === null || componentDef === void 0 ? void 0 : componentDef.standalone);
}
/**
 * WARNING: this is a **dev-mode only** function (thus should always be guarded by the `ngDevMode`)
 * and must **not** be used in production bundles. The function makes megamorphic reads, which might
 * be too slow for production mode.
 *
 * Constructs a string describing the location of the host component template. The function is used
 * in dev mode to produce error messages.
 *
 * @param lView An `LView` that represents a current component that is being rendered.
 */
function getTemplateLocationDetails(lView) {
    var _a;
    !ngDevMode && (0, assert_1.throwError)('Must never be called in production mode');
    const hostComponentDef = getDeclarationComponentDef(lView);
    const componentClassName = (_a = hostComponentDef === null || hostComponentDef === void 0 ? void 0 : hostComponentDef.type) === null || _a === void 0 ? void 0 : _a.name;
    return componentClassName ? ` (used in the '${componentClassName}' component template)` : '';
}
/**
 * The set of known control flow directives and their corresponding imports.
 * We use this set to produce a more precises error message with a note
 * that the `CommonModule` should also be included.
 */
exports.KNOWN_CONTROL_FLOW_DIRECTIVES = new Map([
    ['ngIf', 'NgIf'],
    ['ngFor', 'NgFor'],
    ['ngSwitchCase', 'NgSwitchCase'],
    ['ngSwitchDefault', 'NgSwitchDefault'],
]);
/**
 * Returns true if the tag name is allowed by specified schemas.
 * @param schemas Array of schemas
 * @param tagName Name of the tag
 */
function matchingSchemas(schemas, tagName) {
    if (schemas !== null) {
        for (let i = 0; i < schemas.length; i++) {
            const schema = schemas[i];
            if (schema === schema_1.NO_ERRORS_SCHEMA ||
                (schema === schema_1.CUSTOM_ELEMENTS_SCHEMA && tagName && tagName.indexOf('-') > -1)) {
                return true;
            }
        }
    }
    return false;
}
