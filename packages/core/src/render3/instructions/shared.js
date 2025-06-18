"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeTemplate = executeTemplate;
exports.createDirectivesInstances = createDirectivesInstances;
exports.saveResolvedLocalsInData = saveResolvedLocalsInData;
exports.locateHostElement = locateHostElement;
exports.applyRootElementTransform = applyRootElementTransform;
exports.applyRootElementTransformImpl = applyRootElementTransformImpl;
exports.enableApplyRootElementTransformImpl = enableApplyRootElementTransformImpl;
exports.setPropertyAndInputs = setPropertyAndInputs;
exports.setDomProperty = setDomProperty;
exports.markDirtyIfOnPush = markDirtyIfOnPush;
exports.invokeDirectivesHostBindings = invokeDirectivesHostBindings;
exports.invokeHostBindingsInCreationMode = invokeHostBindingsInCreationMode;
exports.findDirectiveDefMatches = findDirectiveDefMatches;
exports.elementAttributeInternal = elementAttributeInternal;
exports.setElementAttribute = setElementAttribute;
exports.storePropertyBindingMetadata = storePropertyBindingMetadata;
exports.loadComponentRenderer = loadComponentRenderer;
exports.handleUncaughtError = handleUncaughtError;
exports.setAllInputsForProperty = setAllInputsForProperty;
exports.setDirectiveInput = setDirectiveInput;
const error_handler_1 = require("../../error_handler");
const skip_hydration_1 = require("../../hydration/skip_hydration");
const tokens_1 = require("../../hydration/tokens");
const utils_1 = require("../../hydration/utils");
const view_1 = require("../../metadata/view");
const sanitization_1 = require("../../sanitization/sanitization");
const assert_1 = require("../../util/assert");
const dom_1 = require("../../util/dom");
const ng_reflect_1 = require("../../ng_reflect");
const stringify_1 = require("../../util/stringify");
const assert_2 = require("../assert");
const context_discovery_1 = require("../context_discovery");
const di_1 = require("../di");
const errors_1 = require("../errors");
const type_checks_1 = require("../interfaces/type_checks");
const view_2 = require("../interfaces/view");
const node_assert_1 = require("../node_assert");
const node_selector_matcher_1 = require("../node_selector_matcher");
const profiler_1 = require("../profiler");
const state_1 = require("../state");
const tokens_2 = require("../tokens");
const misc_utils_1 = require("../util/misc_utils");
const stringify_utils_1 = require("../util/stringify_utils");
const view_utils_1 = require("../util/view_utils");
const dom_node_manipulation_1 = require("../dom_node_manipulation");
const construction_1 = require("../view/construction");
const advance_1 = require("./advance");
const element_validation_1 = require("./element_validation");
const write_to_directive_input_1 = require("./write_to_directive_input");
function executeTemplate(tView, lView, templateFn, rf, context) {
    const prevSelectedIndex = (0, state_1.getSelectedIndex)();
    const isUpdatePhase = rf & 2 /* RenderFlags.Update */;
    try {
        (0, state_1.setSelectedIndex)(-1);
        if (isUpdatePhase && lView.length > view_2.HEADER_OFFSET) {
            // When we're updating, inherently select 0 so we don't
            // have to generate that instruction for most update blocks.
            (0, advance_1.selectIndexInternal)(tView, lView, view_2.HEADER_OFFSET, !!ngDevMode && (0, state_1.isInCheckNoChangesMode)());
        }
        const preHookType = isUpdatePhase
            ? 2 /* ProfilerEvent.TemplateUpdateStart */
            : 0 /* ProfilerEvent.TemplateCreateStart */;
        (0, profiler_1.profiler)(preHookType, context, templateFn);
        templateFn(rf, context);
    }
    finally {
        (0, state_1.setSelectedIndex)(prevSelectedIndex);
        const postHookType = isUpdatePhase
            ? 3 /* ProfilerEvent.TemplateUpdateEnd */
            : 1 /* ProfilerEvent.TemplateCreateEnd */;
        (0, profiler_1.profiler)(postHookType, context, templateFn);
    }
}
/**
 * Creates directive instances.
 */
function createDirectivesInstances(tView, lView, tNode) {
    instantiateAllDirectives(tView, lView, tNode);
    if ((tNode.flags & 64 /* TNodeFlags.hasHostBindings */) === 64 /* TNodeFlags.hasHostBindings */) {
        invokeDirectivesHostBindings(tView, lView, tNode);
    }
}
/**
 * Takes a list of local names and indices and pushes the resolved local variable values
 * to LView in the same order as they are loaded in the template with load().
 */
function saveResolvedLocalsInData(viewData, tNode, localRefExtractor = view_utils_1.getNativeByTNode) {
    const localNames = tNode.localNames;
    if (localNames !== null) {
        let localIndex = tNode.index + 1;
        for (let i = 0; i < localNames.length; i += 2) {
            const index = localNames[i + 1];
            const value = index === -1
                ? localRefExtractor(tNode, viewData)
                : viewData[index];
            viewData[localIndex++] = value;
        }
    }
}
/**
 * Locates the host native element, used for bootstrapping existing nodes into rendering pipeline.
 *
 * @param renderer the renderer used to locate the element.
 * @param elementOrSelector Render element or CSS selector to locate the element.
 * @param encapsulation View Encapsulation defined for component that requests host element.
 * @param injector Root view injector instance.
 */
function locateHostElement(renderer, elementOrSelector, encapsulation, injector) {
    // Note: we use default value for the `PRESERVE_HOST_CONTENT` here even though it's a
    // tree-shakable one (providedIn:'root'). This code path can be triggered during dynamic
    // component creation (after calling ViewContainerRef.createComponent) when an injector
    // instance can be provided. The injector instance might be disconnected from the main DI
    // tree, thus the `PRESERVE_HOST_CONTENT` would not be able to instantiate. In this case, the
    // default value will be used.
    const preserveHostContent = injector.get(tokens_1.PRESERVE_HOST_CONTENT, tokens_1.PRESERVE_HOST_CONTENT_DEFAULT);
    // When using native Shadow DOM, do not clear host element to allow native slot
    // projection.
    const preserveContent = preserveHostContent || encapsulation === view_1.ViewEncapsulation.ShadowDom;
    const rootElement = renderer.selectRootElement(elementOrSelector, preserveContent);
    applyRootElementTransform(rootElement);
    return rootElement;
}
/**
 * Applies any root element transformations that are needed. If hydration is enabled,
 * this will process corrupted text nodes.
 *
 * @param rootElement the app root HTML Element
 */
function applyRootElementTransform(rootElement) {
    _applyRootElementTransformImpl(rootElement);
}
/**
 * Reference to a function that applies transformations to the root HTML element
 * of an app. When hydration is enabled, this processes any corrupt text nodes
 * so they are properly hydratable on the client.
 *
 * @param rootElement the app root HTML Element
 */
let _applyRootElementTransformImpl = () => null;
/**
 * Processes text node markers before hydration begins. This replaces any special comment
 * nodes that were added prior to serialization are swapped out to restore proper text
 * nodes before hydration.
 *
 * @param rootElement the app root HTML Element
 */
function applyRootElementTransformImpl(rootElement) {
    if ((0, skip_hydration_1.hasSkipHydrationAttrOnRElement)(rootElement)) {
        // Handle a situation when the `ngSkipHydration` attribute is applied
        // to the root node of an application. In this case, we should clear
        // the contents and render everything from scratch.
        (0, dom_node_manipulation_1.clearElementContents)(rootElement);
    }
    else {
        (0, utils_1.processTextNodeMarkersBeforeHydration)(rootElement);
    }
}
/**
 * Sets the implementation for the `applyRootElementTransform` function.
 */
function enableApplyRootElementTransformImpl() {
    _applyRootElementTransformImpl = applyRootElementTransformImpl;
}
/**
 * Mapping between attributes names that don't correspond to their element property names.
 *
 * Performance note: this function is written as a series of if checks (instead of, say, a property
 * object lookup) for performance reasons - the series of `if` checks seems to be the fastest way of
 * mapping property names. Do NOT change without benchmarking.
 *
 * Note: this mapping has to be kept in sync with the equally named mapping in the template
 * type-checking machinery of ngtsc.
 */
function mapPropName(name) {
    if (name === 'class')
        return 'className';
    if (name === 'for')
        return 'htmlFor';
    if (name === 'formaction')
        return 'formAction';
    if (name === 'innerHtml')
        return 'innerHTML';
    if (name === 'readonly')
        return 'readOnly';
    if (name === 'tabindex')
        return 'tabIndex';
    return name;
}
function setPropertyAndInputs(tNode, lView, propName, value, renderer, sanitizer) {
    ngDevMode && (0, assert_1.assertNotSame)(value, tokens_2.NO_CHANGE, 'Incoming value should never be NO_CHANGE.');
    const tView = lView[view_2.TVIEW];
    const hasSetInput = setAllInputsForProperty(tNode, tView, lView, propName, value);
    if (hasSetInput) {
        (0, type_checks_1.isComponentHost)(tNode) && markDirtyIfOnPush(lView, tNode.index);
        ngDevMode && setNgReflectProperties(lView, tView, tNode, propName, value);
        return; // Stop propcessing if we've matched at least one input.
    }
    setDomProperty(tNode, lView, propName, value, renderer, sanitizer);
}
/**
 * Sets a DOM property on a specific node.
 * @param tNode TNode on which to set the value.
 * @param lView View in which the node is located.
 * @param propName Name of the property.
 * @param value Value to set on the property.
 * @param renderer Renderer to use when setting the property.
 * @param sanitizer Function used to sanitize the value before setting it.
 */
function setDomProperty(tNode, lView, propName, value, renderer, sanitizer) {
    if (tNode.type & 3 /* TNodeType.AnyRNode */) {
        const element = (0, view_utils_1.getNativeByTNode)(tNode, lView);
        propName = mapPropName(propName);
        if (ngDevMode) {
            (0, sanitization_1.validateAgainstEventProperties)(propName);
            if (!(0, element_validation_1.isPropertyValid)(element, propName, tNode.value, lView[view_2.TVIEW].schemas)) {
                (0, element_validation_1.handleUnknownPropertyError)(propName, tNode.value, tNode.type, lView);
            }
        }
        // It is assumed that the sanitizer is only added when the compiler determines that the
        // property is risky, so sanitization can be done without further checks.
        value = sanitizer != null ? sanitizer(value, tNode.value || '', propName) : value;
        renderer.setProperty(element, propName, value);
    }
    else if (tNode.type & 12 /* TNodeType.AnyContainer */) {
        // If the node is a container and the property didn't
        // match any of the inputs or schemas we should throw.
        if (ngDevMode && !(0, element_validation_1.matchingSchemas)(lView[view_2.TVIEW].schemas, tNode.value)) {
            (0, element_validation_1.handleUnknownPropertyError)(propName, tNode.value, tNode.type, lView);
        }
    }
}
/** If node is an OnPush component, marks its LView dirty. */
function markDirtyIfOnPush(lView, viewIndex) {
    ngDevMode && (0, assert_2.assertLView)(lView);
    const childComponentLView = (0, view_utils_1.getComponentLViewByIndex)(viewIndex, lView);
    if (!(childComponentLView[view_2.FLAGS] & 16 /* LViewFlags.CheckAlways */)) {
        childComponentLView[view_2.FLAGS] |= 64 /* LViewFlags.Dirty */;
    }
}
function setNgReflectProperty(lView, tNode, attrName, value) {
    const environment = lView[view_2.ENVIRONMENT];
    if (!environment.ngReflect) {
        return;
    }
    const element = (0, view_utils_1.getNativeByTNode)(tNode, lView);
    const renderer = lView[view_2.RENDERER];
    attrName = (0, ng_reflect_1.normalizeDebugBindingName)(attrName);
    const debugValue = (0, ng_reflect_1.normalizeDebugBindingValue)(value);
    if (tNode.type & 3 /* TNodeType.AnyRNode */) {
        if (value == null) {
            renderer.removeAttribute(element, attrName);
        }
        else {
            renderer.setAttribute(element, attrName, debugValue);
        }
    }
    else {
        const textContent = (0, dom_1.escapeCommentText)(`bindings=${JSON.stringify({ [attrName]: debugValue }, null, 2)}`);
        renderer.setValue(element, textContent);
    }
}
function setNgReflectProperties(lView, tView, tNode, publicName, value) {
    var _a, _b;
    const environment = lView[view_2.ENVIRONMENT];
    if (!environment.ngReflect || !(tNode.type & (3 /* TNodeType.AnyRNode */ | 4 /* TNodeType.Container */))) {
        return;
    }
    const inputConfig = (_a = tNode.inputs) === null || _a === void 0 ? void 0 : _a[publicName];
    const hostInputConfig = (_b = tNode.hostDirectiveInputs) === null || _b === void 0 ? void 0 : _b[publicName];
    if (hostInputConfig) {
        for (let i = 0; i < hostInputConfig.length; i += 2) {
            const index = hostInputConfig[i];
            const publicName = hostInputConfig[i + 1];
            const def = tView.data[index];
            setNgReflectProperty(lView, tNode, def.inputs[publicName][0], value);
        }
    }
    // Note: we set the private name of the input as the reflected property, not the public one.
    if (inputConfig) {
        for (const index of inputConfig) {
            const def = tView.data[index];
            setNgReflectProperty(lView, tNode, def.inputs[publicName][0], value);
        }
    }
}
/**
 * Instantiate all the directives that were previously resolved on the current node.
 */
function instantiateAllDirectives(tView, lView, tNode) {
    const start = tNode.directiveStart;
    const end = tNode.directiveEnd;
    // The component view needs to be created before creating the node injector
    // since it is used to inject some special symbols like `ChangeDetectorRef`.
    if ((0, type_checks_1.isComponentHost)(tNode)) {
        ngDevMode && (0, node_assert_1.assertTNodeType)(tNode, 3 /* TNodeType.AnyRNode */);
        (0, construction_1.createComponentLView)(lView, tNode, tView.data[start + tNode.componentOffset]);
    }
    if (!tView.firstCreatePass) {
        (0, di_1.getOrCreateNodeInjectorForNode)(tNode, lView);
    }
    const initialInputs = tNode.initialInputs;
    for (let i = start; i < end; i++) {
        const def = tView.data[i];
        const directive = (0, di_1.getNodeInjectable)(lView, tView, i, tNode);
        (0, context_discovery_1.attachPatchData)(directive, lView);
        if (initialInputs !== null) {
            setInputsFromAttrs(lView, i - start, directive, def, tNode, initialInputs);
        }
        if ((0, type_checks_1.isComponentDef)(def)) {
            const componentView = (0, view_utils_1.getComponentLViewByIndex)(tNode.index, lView);
            componentView[view_2.CONTEXT] = (0, di_1.getNodeInjectable)(lView, tView, i, tNode);
        }
    }
}
function invokeDirectivesHostBindings(tView, lView, tNode) {
    const start = tNode.directiveStart;
    const end = tNode.directiveEnd;
    const elementIndex = tNode.index;
    const currentDirectiveIndex = (0, state_1.getCurrentDirectiveIndex)();
    try {
        (0, state_1.setSelectedIndex)(elementIndex);
        for (let dirIndex = start; dirIndex < end; dirIndex++) {
            const def = tView.data[dirIndex];
            const directive = lView[dirIndex];
            (0, state_1.setCurrentDirectiveIndex)(dirIndex);
            if (def.hostBindings !== null || def.hostVars !== 0 || def.hostAttrs !== null) {
                invokeHostBindingsInCreationMode(def, directive);
            }
        }
    }
    finally {
        (0, state_1.setSelectedIndex)(-1);
        (0, state_1.setCurrentDirectiveIndex)(currentDirectiveIndex);
    }
}
/**
 * Invoke the host bindings in creation mode.
 *
 * @param def `DirectiveDef` which may contain the `hostBindings` function.
 * @param directive Instance of directive.
 */
function invokeHostBindingsInCreationMode(def, directive) {
    if (def.hostBindings !== null) {
        def.hostBindings(1 /* RenderFlags.Create */, directive);
    }
}
/**
 * Matches the current node against all available selectors.
 * If a component is matched (at most one), it is returned in first position in the array.
 */
function findDirectiveDefMatches(tView, tNode) {
    ngDevMode && (0, assert_2.assertFirstCreatePass)(tView);
    ngDevMode && (0, node_assert_1.assertTNodeType)(tNode, 3 /* TNodeType.AnyRNode */ | 12 /* TNodeType.AnyContainer */);
    const registry = tView.directiveRegistry;
    let matches = null;
    if (registry) {
        for (let i = 0; i < registry.length; i++) {
            const def = registry[i];
            if ((0, node_selector_matcher_1.isNodeMatchingSelectorList)(tNode, def.selectors, /* isProjectionMode */ false)) {
                matches !== null && matches !== void 0 ? matches : (matches = []);
                if ((0, type_checks_1.isComponentDef)(def)) {
                    if (ngDevMode) {
                        (0, node_assert_1.assertTNodeType)(tNode, 2 /* TNodeType.Element */, `"${tNode.value}" tags cannot be used as component hosts. ` +
                            `Please use a different tag to activate the ${(0, stringify_1.stringify)(def.type)} component.`);
                        if (matches.length && (0, type_checks_1.isComponentDef)(matches[0])) {
                            (0, errors_1.throwMultipleComponentError)(tNode, matches.find(type_checks_1.isComponentDef).type, def.type);
                        }
                    }
                    matches.unshift(def);
                }
                else {
                    matches.push(def);
                }
            }
        }
    }
    return matches;
}
function elementAttributeInternal(tNode, lView, name, value, sanitizer, namespace) {
    if (ngDevMode) {
        (0, assert_1.assertNotSame)(value, tokens_2.NO_CHANGE, 'Incoming value should never be NO_CHANGE.');
        (0, sanitization_1.validateAgainstEventAttributes)(name);
        (0, node_assert_1.assertTNodeType)(tNode, 2 /* TNodeType.Element */, `Attempted to set attribute \`${name}\` on a container node. ` +
            `Host bindings are not valid on ng-container or ng-template.`);
    }
    const element = (0, view_utils_1.getNativeByTNode)(tNode, lView);
    setElementAttribute(lView[view_2.RENDERER], element, namespace, tNode.value, name, value, sanitizer);
}
function setElementAttribute(renderer, element, namespace, tagName, name, value, sanitizer) {
    if (value == null) {
        renderer.removeAttribute(element, name, namespace);
    }
    else {
        const strValue = sanitizer == null ? (0, stringify_utils_1.renderStringify)(value) : sanitizer(value, tagName || '', name);
        renderer.setAttribute(element, name, strValue, namespace);
    }
}
/**
 * Sets initial input properties on directive instances from attribute data
 *
 * @param lView Current LView that is being processed.
 * @param directiveIndex Index of the directive in directives array
 * @param instance Instance of the directive on which to set the initial inputs
 * @param def The directive def that contains the list of inputs
 * @param tNode The static data for this node
 */
function setInputsFromAttrs(lView, directiveIndex, instance, def, tNode, initialInputData) {
    const initialInputs = initialInputData[directiveIndex];
    if (initialInputs !== null) {
        for (let i = 0; i < initialInputs.length; i += 2) {
            const lookupName = initialInputs[i];
            const value = initialInputs[i + 1];
            (0, write_to_directive_input_1.writeToDirectiveInput)(def, instance, lookupName, value);
            if (ngDevMode) {
                setNgReflectProperty(lView, tNode, def.inputs[lookupName][0], value);
            }
        }
    }
}
///////////////////////////////
//// Bindings & interpolations
///////////////////////////////
/**
 * Stores meta-data for a property binding to be used by TestBed's `DebugElement.properties`.
 *
 * In order to support TestBed's `DebugElement.properties` we need to save, for each binding:
 * - a bound property name;
 * - a static parts of interpolated strings;
 *
 * A given property metadata is saved at the binding's index in the `TView.data` (in other words, a
 * property binding metadata will be stored in `TView.data` at the same index as a bound value in
 * `LView`). Metadata are represented as `INTERPOLATION_DELIMITER`-delimited string with the
 * following format:
 * - `propertyName` for bound properties;
 * - `propertyName�prefix�interpolation_static_part1�..interpolation_static_partN�suffix` for
 * interpolated properties.
 *
 * @param tData `TData` where meta-data will be saved;
 * @param tNode `TNode` that is a target of the binding;
 * @param propertyName bound property name;
 * @param bindingIndex binding index in `LView`
 * @param interpolationParts static interpolation parts (for property interpolations)
 */
function storePropertyBindingMetadata(tData, tNode, propertyName, bindingIndex, ...interpolationParts) {
    var _a, _b;
    // Binding meta-data are stored only the first time a given property instruction is processed.
    // Since we don't have a concept of the "first update pass" we need to check for presence of the
    // binding meta-data to decide if one should be stored (or if was stored already).
    if (tData[bindingIndex] === null) {
        if (!((_a = tNode.inputs) === null || _a === void 0 ? void 0 : _a[propertyName]) && !((_b = tNode.hostDirectiveInputs) === null || _b === void 0 ? void 0 : _b[propertyName])) {
            const propBindingIdxs = tNode.propertyBindings || (tNode.propertyBindings = []);
            propBindingIdxs.push(bindingIndex);
            let bindingMetadata = propertyName;
            if (interpolationParts.length > 0) {
                bindingMetadata +=
                    misc_utils_1.INTERPOLATION_DELIMITER + interpolationParts.join(misc_utils_1.INTERPOLATION_DELIMITER);
            }
            tData[bindingIndex] = bindingMetadata;
        }
    }
}
/**
 * There are cases where the sub component's renderer needs to be included
 * instead of the current renderer (see the componentSyntheticHost* instructions).
 */
function loadComponentRenderer(currentDef, tNode, lView) {
    // TODO(FW-2043): the `currentDef` is null when host bindings are invoked while creating root
    // component (see packages/core/src/render3/component.ts). This is not consistent with the process
    // of creating inner components, when current directive index is available in the state. In order
    // to avoid relying on current def being `null` (thus special-casing root component creation), the
    // process of creating root component should be unified with the process of creating inner
    // components.
    if (currentDef === null || (0, type_checks_1.isComponentDef)(currentDef)) {
        lView = (0, view_utils_1.unwrapLView)(lView[tNode.index]);
    }
    return lView[view_2.RENDERER];
}
/** Handles an error thrown in an LView. */
function handleUncaughtError(lView, error) {
    const injector = lView[view_2.INJECTOR];
    if (!injector) {
        return;
    }
    const errorHandler = injector.get(error_handler_1.INTERNAL_APPLICATION_ERROR_HANDLER, null);
    errorHandler === null || errorHandler === void 0 ? void 0 : errorHandler(error);
}
/**
 * Set all directive inputs with the specific public name on the node.
 *
 * @param tNode TNode on which the input is being set.
 * @param tView Current TView
 * @param lView `LView` which contains the directives.
 * @param publicName Public name of the input being set.
 * @param value Value to set.
 */
function setAllInputsForProperty(tNode, tView, lView, publicName, value) {
    var _a, _b;
    const inputs = (_a = tNode.inputs) === null || _a === void 0 ? void 0 : _a[publicName];
    const hostDirectiveInputs = (_b = tNode.hostDirectiveInputs) === null || _b === void 0 ? void 0 : _b[publicName];
    let hasMatch = false;
    if (hostDirectiveInputs) {
        for (let i = 0; i < hostDirectiveInputs.length; i += 2) {
            const index = hostDirectiveInputs[i];
            ngDevMode && (0, assert_1.assertIndexInRange)(lView, index);
            const publicName = hostDirectiveInputs[i + 1];
            const def = tView.data[index];
            (0, write_to_directive_input_1.writeToDirectiveInput)(def, lView[index], publicName, value);
            hasMatch = true;
        }
    }
    if (inputs) {
        for (const index of inputs) {
            ngDevMode && (0, assert_1.assertIndexInRange)(lView, index);
            const instance = lView[index];
            const def = tView.data[index];
            (0, write_to_directive_input_1.writeToDirectiveInput)(def, instance, publicName, value);
            hasMatch = true;
        }
    }
    return hasMatch;
}
/**
 * Sets an input value only on a specific directive and its host directives.
 * @param tNode TNode on which the input is being set.
 * @param tView Current TView
 * @param lView `LView` which contains the directives.
 * @param target Directive on which to set the input.
 * @param publicName Public name of the input being set.
 * @param value Value to set.
 */
function setDirectiveInput(tNode, tView, lView, target, publicName, value) {
    var _a, _b;
    let hostIndex = null;
    let hostDirectivesStart = null;
    let hostDirectivesEnd = null;
    let hasSet = false;
    if (ngDevMode && !((_a = tNode.directiveToIndex) === null || _a === void 0 ? void 0 : _a.has(target.type))) {
        throw new Error(`Node does not have a directive with type ${target.type.name}`);
    }
    const data = tNode.directiveToIndex.get(target.type);
    if (typeof data === 'number') {
        hostIndex = data;
    }
    else {
        [hostIndex, hostDirectivesStart, hostDirectivesEnd] = data;
    }
    if (hostDirectivesStart !== null &&
        hostDirectivesEnd !== null &&
        ((_b = tNode.hostDirectiveInputs) === null || _b === void 0 ? void 0 : _b.hasOwnProperty(publicName))) {
        const hostDirectiveInputs = tNode.hostDirectiveInputs[publicName];
        for (let i = 0; i < hostDirectiveInputs.length; i += 2) {
            const index = hostDirectiveInputs[i];
            if (index >= hostDirectivesStart && index <= hostDirectivesEnd) {
                ngDevMode && (0, assert_1.assertIndexInRange)(lView, index);
                const def = tView.data[index];
                const hostDirectivePublicName = hostDirectiveInputs[i + 1];
                (0, write_to_directive_input_1.writeToDirectiveInput)(def, lView[index], hostDirectivePublicName, value);
                hasSet = true;
            }
            else if (index > hostDirectivesEnd) {
                // Directives here are in ascending order so we can stop looking once we're past the range.
                break;
            }
        }
    }
    if (hostIndex !== null && target.inputs.hasOwnProperty(publicName)) {
        ngDevMode && (0, assert_1.assertIndexInRange)(lView, hostIndex);
        (0, write_to_directive_input_1.writeToDirectiveInput)(target, lView[hostIndex], publicName, value);
        hasSet = true;
    }
    return hasSet;
}
