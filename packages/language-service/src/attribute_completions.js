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
exports.AsciiSortPriority = exports.AttributeCompletionKind = void 0;
exports.buildAttributeCompletionTable = buildAttributeCompletionTable;
exports.addAttributeCompletionEntries = addAttributeCompletionEntries;
exports.getAttributeCompletionSymbol = getAttributeCompletionSymbol;
exports.buildAnimationCompletionEntries = buildAnimationCompletionEntries;
const compiler_1 = require("@angular/compiler");
const typescript_1 = __importDefault(require("typescript"));
const display_parts_1 = require("./utils/display_parts");
const utils_1 = require("./utils");
/**
 * Differentiates different kinds of `AttributeCompletion`s.
 */
var AttributeCompletionKind;
(function (AttributeCompletionKind) {
    /**
     * Completion of an attribute from the HTML schema.
     *
     * Attributes often have a corresponding DOM property of the same name.
     */
    AttributeCompletionKind[AttributeCompletionKind["DomAttribute"] = 0] = "DomAttribute";
    /**
     * Completion of a property from the DOM schema.
     *
     * `DomProperty` completions are generated only for properties which don't share their name with
     * an HTML attribute.
     */
    AttributeCompletionKind[AttributeCompletionKind["DomProperty"] = 1] = "DomProperty";
    /**
     * Completion of an event from the DOM schema.
     */
    AttributeCompletionKind[AttributeCompletionKind["DomEvent"] = 2] = "DomEvent";
    /**
     * Completion of an attribute that results in a new directive being matched on an element.
     */
    AttributeCompletionKind[AttributeCompletionKind["DirectiveAttribute"] = 3] = "DirectiveAttribute";
    /**
     * Completion of an attribute that results in a new structural directive being matched on an
     * element.
     */
    AttributeCompletionKind[AttributeCompletionKind["StructuralDirectiveAttribute"] = 4] = "StructuralDirectiveAttribute";
    /**
     * Completion of an input from a directive which is either present on the element, or becomes
     * present after the addition of this attribute.
     */
    AttributeCompletionKind[AttributeCompletionKind["DirectiveInput"] = 5] = "DirectiveInput";
    /**
     * Completion of an output from a directive which is either present on the element, or becomes
     * present after the addition of this attribute.
     */
    AttributeCompletionKind[AttributeCompletionKind["DirectiveOutput"] = 6] = "DirectiveOutput";
})(AttributeCompletionKind || (exports.AttributeCompletionKind = AttributeCompletionKind = {}));
/**
 * Given an element and its context, produce a `Map` of all possible attribute completions.
 *
 * 3 kinds of attributes are considered for completion, from highest to lowest priority:
 *
 * 1. Inputs/outputs of directives present on the element already.
 * 2. Inputs/outputs of directives that are not present on the element, but which would become
 *    present if such a binding is added.
 * 3. Attributes from the DOM schema for the element.
 *
 * The priority of these options determines which completions are added to the `Map`. If a directive
 * input shares the same name as a DOM attribute, the `Map` will reflect the directive input
 * completion, not the DOM completion for that name.
 */
function buildAttributeCompletionTable(component, element, checker) {
    var _a, _b;
    const table = new Map();
    // Use the `ElementSymbol` or `TemplateSymbol` to iterate over directives present on the node, and
    // their inputs/outputs. These have the highest priority of completion results.
    const symbol = checker.getSymbolOfNode(element, component);
    const presentDirectives = new Set();
    if (symbol !== null) {
        // An `ElementSymbol` was available. This means inputs and outputs for directives on the
        // element can be added to the completion table.
        for (const dirSymbol of symbol.directives) {
            const directive = dirSymbol.tsSymbol.valueDeclaration;
            if (!typescript_1.default.isClassDeclaration(directive)) {
                continue;
            }
            presentDirectives.add(directive);
            const meta = checker.getDirectiveMetadata(directive);
            if (meta === null) {
                continue;
            }
            for (const { classPropertyName, bindingPropertyName } of meta.inputs) {
                let propertyName;
                if (dirSymbol.isHostDirective) {
                    if (!((_a = dirSymbol.exposedInputs) === null || _a === void 0 ? void 0 : _a.hasOwnProperty(bindingPropertyName))) {
                        continue;
                    }
                    propertyName = dirSymbol.exposedInputs[bindingPropertyName];
                }
                else {
                    propertyName = bindingPropertyName;
                }
                if (table.has(propertyName)) {
                    continue;
                }
                table.set(propertyName, {
                    kind: AttributeCompletionKind.DirectiveInput,
                    propertyName,
                    directive: dirSymbol,
                    classPropertyName,
                    twoWayBindingSupported: meta.outputs.hasBindingPropertyName(propertyName + 'Change'),
                });
            }
            for (const { classPropertyName, bindingPropertyName } of meta.outputs) {
                let propertyName;
                if (dirSymbol.isHostDirective) {
                    if (!((_b = dirSymbol.exposedOutputs) === null || _b === void 0 ? void 0 : _b.hasOwnProperty(bindingPropertyName))) {
                        continue;
                    }
                    propertyName = dirSymbol.exposedOutputs[bindingPropertyName];
                }
                else {
                    propertyName = bindingPropertyName;
                }
                if (table.has(propertyName)) {
                    continue;
                }
                table.set(propertyName, {
                    kind: AttributeCompletionKind.DirectiveOutput,
                    eventName: propertyName,
                    directive: dirSymbol,
                    classPropertyName,
                });
            }
        }
    }
    // Next, explore hypothetical directives and determine if the addition of any single attributes
    // can cause the directive to match the element.
    const directivesInScope = checker
        .getPotentialTemplateDirectives(component)
        .filter((d) => d.isInScope);
    if (directivesInScope !== null) {
        const elementSelector = (0, utils_1.makeElementSelector)(element);
        for (const dirInScope of directivesInScope) {
            const directive = dirInScope.tsSymbol.valueDeclaration;
            // Skip directives that are present on the element.
            if (!typescript_1.default.isClassDeclaration(directive) || presentDirectives.has(directive)) {
                continue;
            }
            const meta = checker.getDirectiveMetadata(directive);
            if (meta === null || meta.selector === null) {
                continue;
            }
            if (!meta.isStructural) {
                // For non-structural directives, the directive's attribute selector(s) are matched against
                // a hypothetical version of the element with those attributes. A match indicates that
                // adding that attribute/input/output binding would cause the directive to become present,
                // meaning that such a binding is a valid completion.
                const selectors = compiler_1.CssSelector.parse(meta.selector);
                const matcher = new compiler_1.SelectorMatcher();
                matcher.addSelectables(selectors);
                for (const selector of selectors) {
                    for (const [attrName, attrValue] of selectorAttributes(selector)) {
                        if (attrValue !== '') {
                            // This attribute selector requires a value, which is not supported in completion.
                            continue;
                        }
                        if (table.has(attrName)) {
                            // Skip this attribute as there's already a binding for it.
                            continue;
                        }
                        // Check whether adding this attribute would cause the directive to start matching.
                        const newElementSelector = elementSelector + `[${attrName}]`;
                        if (!matcher.match(compiler_1.CssSelector.parse(newElementSelector)[0], null)) {
                            // Nope, move on with our lives.
                            continue;
                        }
                        // Adding this attribute causes a new directive to be matched. Decide how to categorize
                        // it based on the directive's inputs and outputs.
                        if (meta.inputs.hasBindingPropertyName(attrName)) {
                            // This attribute corresponds to an input binding.
                            table.set(attrName, {
                                kind: AttributeCompletionKind.DirectiveInput,
                                directive: dirInScope,
                                propertyName: attrName,
                                classPropertyName: meta.inputs.getByBindingPropertyName(attrName)[0].classPropertyName,
                                twoWayBindingSupported: meta.outputs.hasBindingPropertyName(attrName + 'Change'),
                            });
                        }
                        else if (meta.outputs.hasBindingPropertyName(attrName)) {
                            // This attribute corresponds to an output binding.
                            table.set(attrName, {
                                kind: AttributeCompletionKind.DirectiveOutput,
                                directive: dirInScope,
                                eventName: attrName,
                                classPropertyName: meta.outputs.getByBindingPropertyName(attrName)[0].classPropertyName,
                            });
                        }
                        else {
                            // This attribute causes a new directive to be matched, but does not also correspond
                            // to an input or output binding.
                            table.set(attrName, {
                                kind: AttributeCompletionKind.DirectiveAttribute,
                                attribute: attrName,
                                directive: dirInScope,
                            });
                        }
                    }
                }
            }
            else {
                // Hypothetically matching a structural directive is a little different than a plain
                // directive. Use of the '*' structural directive syntactic sugar means that the actual
                // directive is applied to a plain <ng-template> node, not the existing element with any
                // other attributes it might already have.
                // Additionally, more than one attribute/input might need to be present in order for the
                // directive to match (e.g. `ngFor` has a selector of `[ngFor][ngForOf]`). This gets a
                // little tricky.
                const structuralAttributes = getStructuralAttributes(meta);
                for (const attrName of structuralAttributes) {
                    table.set(attrName, {
                        kind: AttributeCompletionKind.StructuralDirectiveAttribute,
                        attribute: attrName,
                        directive: dirInScope,
                    });
                }
            }
        }
    }
    // Finally, add any DOM attributes not already covered by inputs.
    if (element instanceof compiler_1.TmplAstElement) {
        for (const { attribute, property } of checker.getPotentialDomBindings(element.name)) {
            const isAlsoProperty = attribute === property;
            if (!table.has(attribute) && isAlsoProperty) {
                table.set(attribute, {
                    kind: AttributeCompletionKind.DomAttribute,
                    attribute,
                    isAlsoProperty,
                });
            }
        }
        for (const event of checker.getPotentialDomEvents(element.name)) {
            table.set(event, {
                kind: AttributeCompletionKind.DomEvent,
                eventName: event,
            });
        }
    }
    return table;
}
function buildSnippet(insertSnippet, text) {
    return insertSnippet ? `${text.replace(/\$/gi, '\\$')}="$1"` : undefined;
}
/**
 * Used to ensure Angular completions appear before DOM completions. Inputs and Outputs are
 * prioritized first while attributes which would match an additional directive are prioritized
 * second.
 *
 * This sort priority is based on the ASCII table. Other than `space`, the `!` is the first
 * printable character in the ASCII ordering.
 */
var AsciiSortPriority;
(function (AsciiSortPriority) {
    AsciiSortPriority["First"] = "!";
    AsciiSortPriority["Second"] = "\"";
})(AsciiSortPriority || (exports.AsciiSortPriority = AsciiSortPriority = {}));
/**
 * Given an `AttributeCompletion`, add any available completions to a `ts.CompletionEntry` array of
 * results.
 *
 * The kind of completions generated depends on whether the current context is an attribute context
 * or not. For example, completing on `<element attr|>` will generate two results: `attribute` and
 * `[attribute]` - either a static attribute can be generated, or a property binding. However,
 * `<element [attr|]>` is not an attribute context, and so only the property completion `attribute`
 * is generated. Note that this completion does not have the `[]` property binding sugar as its
 * implicitly present in a property binding context (we're already completing within an `[attr|]`
 * expression).
 *
 * If the `insertSnippet` is `true`, the completion entries should includes the property or event
 * binding sugar in some case. For Example `<div (my¦) />`, the `replacementSpan` is `(my)`, and the
 * `insertText` is `(myOutput)="$0"`.
 */
function addAttributeCompletionEntries(entries, completion, isAttributeContext, isElementContext, replacementSpan, insertSnippet) {
    switch (completion.kind) {
        case AttributeCompletionKind.DirectiveAttribute: {
            entries.push({
                kind: (0, display_parts_1.unsafeCastDisplayInfoKindToScriptElementKind)(display_parts_1.DisplayInfoKind.DIRECTIVE),
                name: completion.attribute,
                sortText: AsciiSortPriority.Second + completion.attribute,
                replacementSpan,
            });
            break;
        }
        case AttributeCompletionKind.StructuralDirectiveAttribute: {
            // In an element, the completion is offered with a leading '*' to activate the structural
            // directive. Once present, the structural attribute will be parsed as a template and not an
            // element, and the prefix is no longer necessary.
            const prefix = isElementContext ? '*' : '';
            entries.push({
                kind: (0, display_parts_1.unsafeCastDisplayInfoKindToScriptElementKind)(display_parts_1.DisplayInfoKind.DIRECTIVE),
                name: prefix + completion.attribute,
                insertText: buildSnippet(insertSnippet, prefix + completion.attribute),
                isSnippet: insertSnippet,
                sortText: AsciiSortPriority.Second + prefix + completion.attribute,
                replacementSpan,
            });
            break;
        }
        case AttributeCompletionKind.DirectiveInput: {
            if (isAttributeContext || insertSnippet) {
                // Offer a completion of a property binding.
                entries.push({
                    kind: (0, display_parts_1.unsafeCastDisplayInfoKindToScriptElementKind)(display_parts_1.DisplayInfoKind.PROPERTY),
                    name: `[${completion.propertyName}]`,
                    insertText: buildSnippet(insertSnippet, `[${completion.propertyName}]`),
                    isSnippet: insertSnippet,
                    sortText: AsciiSortPriority.First + completion.propertyName,
                    replacementSpan,
                });
                // If the directive supports banana-in-a-box for this input, offer that as well.
                if (completion.twoWayBindingSupported) {
                    entries.push({
                        kind: (0, display_parts_1.unsafeCastDisplayInfoKindToScriptElementKind)(display_parts_1.DisplayInfoKind.PROPERTY),
                        name: `[(${completion.propertyName})]`,
                        insertText: buildSnippet(insertSnippet, `[(${completion.propertyName})]`),
                        isSnippet: insertSnippet,
                        // This completion should sort after the property binding.
                        sortText: AsciiSortPriority.First + completion.propertyName + '_1',
                        replacementSpan,
                    });
                }
                // Offer a completion of the input binding as an attribute.
                entries.push({
                    kind: (0, display_parts_1.unsafeCastDisplayInfoKindToScriptElementKind)(display_parts_1.DisplayInfoKind.ATTRIBUTE),
                    name: completion.propertyName,
                    insertText: buildSnippet(insertSnippet, completion.propertyName),
                    isSnippet: insertSnippet,
                    // This completion should sort after both property binding options (one-way and two-way).
                    sortText: AsciiSortPriority.First + completion.propertyName + '_2',
                    replacementSpan,
                });
            }
            else {
                entries.push({
                    kind: (0, display_parts_1.unsafeCastDisplayInfoKindToScriptElementKind)(display_parts_1.DisplayInfoKind.PROPERTY),
                    name: completion.propertyName,
                    insertText: buildSnippet(insertSnippet, completion.propertyName),
                    isSnippet: insertSnippet,
                    sortText: AsciiSortPriority.First + completion.propertyName,
                    replacementSpan,
                });
            }
            break;
        }
        case AttributeCompletionKind.DirectiveOutput: {
            if (isAttributeContext || insertSnippet) {
                entries.push({
                    kind: (0, display_parts_1.unsafeCastDisplayInfoKindToScriptElementKind)(display_parts_1.DisplayInfoKind.EVENT),
                    name: `(${completion.eventName})`,
                    insertText: buildSnippet(insertSnippet, `(${completion.eventName})`),
                    isSnippet: insertSnippet,
                    sortText: AsciiSortPriority.First + completion.eventName,
                    replacementSpan,
                });
            }
            else {
                entries.push({
                    kind: (0, display_parts_1.unsafeCastDisplayInfoKindToScriptElementKind)(display_parts_1.DisplayInfoKind.EVENT),
                    name: completion.eventName,
                    insertText: buildSnippet(insertSnippet, completion.eventName),
                    isSnippet: insertSnippet,
                    sortText: AsciiSortPriority.First + completion.eventName,
                    replacementSpan,
                });
            }
            break;
        }
        case AttributeCompletionKind.DomAttribute: {
            if ((isAttributeContext || insertSnippet) && completion.isAlsoProperty) {
                // Offer a completion of a property binding to the DOM property.
                entries.push({
                    kind: (0, display_parts_1.unsafeCastDisplayInfoKindToScriptElementKind)(display_parts_1.DisplayInfoKind.PROPERTY),
                    name: `[${completion.attribute}]`,
                    insertText: buildSnippet(insertSnippet, `[${completion.attribute}]`),
                    isSnippet: insertSnippet,
                    // In the case of DOM attributes, the property binding should sort after the attribute
                    // binding.
                    sortText: completion.attribute + '_1',
                    replacementSpan,
                });
            }
            break;
        }
        case AttributeCompletionKind.DomProperty: {
            if (!isAttributeContext) {
                entries.push({
                    kind: (0, display_parts_1.unsafeCastDisplayInfoKindToScriptElementKind)(display_parts_1.DisplayInfoKind.PROPERTY),
                    name: completion.property,
                    insertText: buildSnippet(insertSnippet, completion.property),
                    isSnippet: insertSnippet,
                    sortText: completion.property,
                    replacementSpan,
                });
            }
            break;
        }
        case AttributeCompletionKind.DomEvent: {
            entries.push({
                kind: (0, display_parts_1.unsafeCastDisplayInfoKindToScriptElementKind)(display_parts_1.DisplayInfoKind.EVENT),
                name: `(${completion.eventName})`,
                insertText: buildSnippet(insertSnippet, `(${completion.eventName})`),
                isSnippet: insertSnippet,
                sortText: completion.eventName,
                replacementSpan,
            });
            break;
        }
    }
}
function getAttributeCompletionSymbol(completion, checker) {
    var _a;
    switch (completion.kind) {
        case AttributeCompletionKind.DomAttribute:
        case AttributeCompletionKind.DomEvent:
        case AttributeCompletionKind.DomProperty:
            return null;
        case AttributeCompletionKind.DirectiveAttribute:
        case AttributeCompletionKind.StructuralDirectiveAttribute:
            return completion.directive.tsSymbol;
        case AttributeCompletionKind.DirectiveInput:
        case AttributeCompletionKind.DirectiveOutput:
            return ((_a = checker
                .getDeclaredTypeOfSymbol(completion.directive.tsSymbol)
                .getProperty(completion.classPropertyName)) !== null && _a !== void 0 ? _a : null);
    }
}
/**
 * Iterates over `CssSelector` attributes, which are internally represented in a zipped array style
 * which is not conducive to straightforward iteration.
 */
function* selectorAttributes(selector) {
    for (let i = 0; i < selector.attrs.length; i += 2) {
        yield [selector.attrs[0], selector.attrs[1]];
    }
}
function getStructuralAttributes(meta) {
    if (meta.selector === null) {
        return [];
    }
    const structuralAttributes = [];
    const selectors = compiler_1.CssSelector.parse(meta.selector);
    for (const selector of selectors) {
        if (selector.element !== null && selector.element !== 'ng-template') {
            // This particular selector does not apply under structural directive syntax.
            continue;
        }
        // Every attribute of this selector must be name-only - no required values.
        const attributeSelectors = Array.from(selectorAttributes(selector));
        if (!attributeSelectors.every(([_, attrValue]) => attrValue === '')) {
            continue;
        }
        // Get every named selector.
        const attributes = attributeSelectors.map(([attrName, _]) => attrName);
        // Find the shortest attribute. This is the structural directive "base", and all potential
        // input bindings must begin with the base. E.g. in `*ngFor="let a of b"`, `ngFor` is the
        // base attribute, and the `of` binding key corresponds to an input of `ngForOf`.
        const baseAttr = attributes.reduce((prev, curr) => (prev === null || curr.length < prev.length ? curr : prev), null);
        if (baseAttr === null) {
            // No attributes in this selector?
            continue;
        }
        // Validate that the attributes are compatible with use as a structural directive.
        const isValid = (attr) => {
            // The base attribute is valid by default.
            if (attr === baseAttr) {
                return true;
            }
            // Non-base attributes must all be prefixed with the base attribute.
            if (!attr.startsWith(baseAttr)) {
                return false;
            }
            // Non-base attributes must also correspond to directive inputs.
            if (!meta.inputs.hasBindingPropertyName(attr)) {
                return false;
            }
            // This attribute is compatible.
            return true;
        };
        if (!attributes.every(isValid)) {
            continue;
        }
        // This attribute is valid as a structural attribute for this directive.
        structuralAttributes.push(baseAttr);
    }
    return structuralAttributes;
}
function buildAnimationCompletionEntries(animations, replacementSpan, kind) {
    return animations.map((animation) => {
        return {
            kind: (0, display_parts_1.unsafeCastDisplayInfoKindToScriptElementKind)(kind),
            name: animation,
            sortText: animation,
            replacementSpan,
        };
    });
}
