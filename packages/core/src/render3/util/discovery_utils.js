"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcxViewEncapsulation = exports.AcxChangeDetectionStrategy = exports.Framework = void 0;
exports.getComponent = getComponent;
exports.getContext = getContext;
exports.getOwningComponent = getOwningComponent;
exports.getRootComponents = getRootComponents;
exports.getInjector = getInjector;
exports.getInjectionTokens = getInjectionTokens;
exports.getDirectives = getDirectives;
exports.getDirectiveMetadata = getDirectiveMetadata;
exports.getLocalRefs = getLocalRefs;
exports.getHostElement = getHostElement;
exports.getRenderedText = getRenderedText;
exports.getListeners = getListeners;
exports.getComponentLView = getComponentLView;
const constants_1 = require("../../change_detection/constants");
const injector_1 = require("../../di/injector");
const assert_1 = require("../assert");
const context_discovery_1 = require("../context_discovery");
const def_getters_1 = require("../def_getters");
const di_1 = require("../di");
const type_checks_1 = require("../interfaces/type_checks");
const view_1 = require("../interfaces/view");
const view_traversal_utils_1 = require("./view_traversal_utils");
const view_utils_1 = require("./view_utils");
/**
 * Retrieves the component instance associated with a given DOM element.
 *
 * @usageNotes
 * Given the following DOM structure:
 *
 * ```html
 * <app-root>
 *   <div>
 *     <child-comp></child-comp>
 *   </div>
 * </app-root>
 * ```
 *
 * Calling `getComponent` on `<child-comp>` will return the instance of `ChildComponent`
 * associated with this DOM element.
 *
 * Calling the function on `<app-root>` will return the `MyApp` instance.
 *
 *
 * @param element DOM element from which the component should be retrieved.
 * @returns Component instance associated with the element or `null` if there
 *    is no component associated with it.
 *
 * @publicApi
 */
function getComponent(element) {
    ngDevMode && assertDomElement(element);
    const context = (0, context_discovery_1.getLContext)(element);
    if (context === null)
        return null;
    if (context.component === undefined) {
        const lView = context.lView;
        if (lView === null) {
            return null;
        }
        context.component = (0, context_discovery_1.getComponentAtNodeIndex)(context.nodeIndex, lView);
    }
    return context.component;
}
/**
 * If inside an embedded view (e.g. `*ngIf` or `*ngFor`), retrieves the context of the embedded
 * view that the element is part of. Otherwise retrieves the instance of the component whose view
 * owns the element (in this case, the result is the same as calling `getOwningComponent`).
 *
 * @param element Element for which to get the surrounding component instance.
 * @returns Instance of the component that is around the element or null if the element isn't
 *    inside any component.
 *
 * @publicApi
 */
function getContext(element) {
    assertDomElement(element);
    const context = (0, context_discovery_1.getLContext)(element);
    const lView = context ? context.lView : null;
    return lView === null ? null : lView[view_1.CONTEXT];
}
/**
 * Retrieves the component instance whose view contains the DOM element.
 *
 * For example, if `<child-comp>` is used in the template of `<app-comp>`
 * (i.e. a `ViewChild` of `<app-comp>`), calling `getOwningComponent` on `<child-comp>`
 * would return `<app-comp>`.
 *
 * @param elementOrDir DOM element, component or directive instance
 *    for which to retrieve the root components.
 * @returns Component instance whose view owns the DOM element or null if the element is not
 *    part of a component view.
 *
 * @publicApi
 */
function getOwningComponent(elementOrDir) {
    const context = (0, context_discovery_1.getLContext)(elementOrDir);
    let lView = context ? context.lView : null;
    if (lView === null)
        return null;
    let parent;
    while (lView[view_1.TVIEW].type === 2 /* TViewType.Embedded */ && (parent = (0, view_utils_1.getLViewParent)(lView))) {
        lView = parent;
    }
    return (0, type_checks_1.isRootView)(lView) ? null : lView[view_1.CONTEXT];
}
/**
 * Retrieves all root components associated with a DOM element, directive or component instance.
 * Root components are those which have been bootstrapped by Angular.
 *
 * @param elementOrDir DOM element, component or directive instance
 *    for which to retrieve the root components.
 * @returns Root components associated with the target object.
 *
 * @publicApi
 */
function getRootComponents(elementOrDir) {
    const lView = (0, context_discovery_1.readPatchedLView)(elementOrDir);
    return lView !== null ? [(0, view_traversal_utils_1.getRootContext)(lView)] : [];
}
/**
 * Retrieves an `Injector` associated with an element, component or directive instance.
 *
 * @param elementOrDir DOM element, component or directive instance for which to
 *    retrieve the injector.
 * @returns Injector associated with the element, component or directive instance.
 *
 * @publicApi
 */
function getInjector(elementOrDir) {
    const context = (0, context_discovery_1.getLContext)(elementOrDir);
    const lView = context ? context.lView : null;
    if (lView === null)
        return injector_1.Injector.NULL;
    const tNode = lView[view_1.TVIEW].data[context.nodeIndex];
    return new di_1.NodeInjector(tNode, lView);
}
/**
 * Retrieve a set of injection tokens at a given DOM node.
 *
 * @param element Element for which the injection tokens should be retrieved.
 */
function getInjectionTokens(element) {
    const context = (0, context_discovery_1.getLContext)(element);
    const lView = context ? context.lView : null;
    if (lView === null)
        return [];
    const tView = lView[view_1.TVIEW];
    const tNode = tView.data[context.nodeIndex];
    const providerTokens = [];
    const startIndex = tNode.providerIndexes & 1048575 /* TNodeProviderIndexes.ProvidersStartIndexMask */;
    const endIndex = tNode.directiveEnd;
    for (let i = startIndex; i < endIndex; i++) {
        let value = tView.data[i];
        if (isDirectiveDefHack(value)) {
            // The fact that we sometimes store Type and sometimes DirectiveDef in this location is a
            // design flaw.  We should always store same type so that we can be monomorphic. The issue
            // is that for Components/Directives we store the def instead the type. The correct behavior
            // is that we should always be storing injectable type in this location.
            value = value.type;
        }
        providerTokens.push(value);
    }
    return providerTokens;
}
/**
 * Retrieves directive instances associated with a given DOM node. Does not include
 * component instances.
 *
 * @usageNotes
 * Given the following DOM structure:
 *
 * ```html
 * <app-root>
 *   <button my-button></button>
 *   <my-comp></my-comp>
 * </app-root>
 * ```
 *
 * Calling `getDirectives` on `<button>` will return an array with an instance of the `MyButton`
 * directive that is associated with the DOM node.
 *
 * Calling `getDirectives` on `<my-comp>` will return an empty array.
 *
 * @param node DOM node for which to get the directives.
 * @returns Array of directives associated with the node.
 *
 * @publicApi
 */
function getDirectives(node) {
    // Skip text nodes because we can't have directives associated with them.
    if (node instanceof Text) {
        return [];
    }
    const context = (0, context_discovery_1.getLContext)(node);
    const lView = context ? context.lView : null;
    if (lView === null) {
        return [];
    }
    const tView = lView[view_1.TVIEW];
    const nodeIndex = context.nodeIndex;
    if (!(tView === null || tView === void 0 ? void 0 : tView.data[nodeIndex])) {
        return [];
    }
    if (context.directives === undefined) {
        context.directives = (0, context_discovery_1.getDirectivesAtNodeIndex)(nodeIndex, lView);
    }
    // The `directives` in this case are a named array called `LComponentView`. Clone the
    // result so we don't expose an internal data structure in the user's console.
    return context.directives === null ? [] : [...context.directives];
}
/** The framework used to author a particular application or component. */
var Framework;
(function (Framework) {
    Framework["Angular"] = "angular";
    Framework["ACX"] = "acx";
    Framework["Wiz"] = "wiz";
})(Framework || (exports.Framework = Framework = {}));
/** ACX change detection strategies. */
var AcxChangeDetectionStrategy;
(function (AcxChangeDetectionStrategy) {
    AcxChangeDetectionStrategy[AcxChangeDetectionStrategy["Default"] = 0] = "Default";
    AcxChangeDetectionStrategy[AcxChangeDetectionStrategy["OnPush"] = 1] = "OnPush";
})(AcxChangeDetectionStrategy || (exports.AcxChangeDetectionStrategy = AcxChangeDetectionStrategy = {}));
/** ACX view encapsulation modes. */
var AcxViewEncapsulation;
(function (AcxViewEncapsulation) {
    AcxViewEncapsulation[AcxViewEncapsulation["Emulated"] = 0] = "Emulated";
    AcxViewEncapsulation[AcxViewEncapsulation["None"] = 1] = "None";
})(AcxViewEncapsulation || (exports.AcxViewEncapsulation = AcxViewEncapsulation = {}));
/**
 * Returns the debug (partial) metadata for a particular directive or component instance.
 * The function accepts an instance of a directive or component and returns the corresponding
 * metadata.
 *
 * @param directiveOrComponentInstance Instance of a directive or component
 * @returns metadata of the passed directive or component
 *
 * @publicApi
 */
function getDirectiveMetadata(directiveOrComponentInstance) {
    const { constructor } = directiveOrComponentInstance;
    if (!constructor) {
        throw new Error('Unable to find the instance constructor');
    }
    // In case a component inherits from a directive, we may have component and directive metadata
    // To ensure we don't get the metadata of the directive, we want to call `getComponentDef` first.
    const componentDef = (0, def_getters_1.getComponentDef)(constructor);
    if (componentDef) {
        const inputs = extractInputDebugMetadata(componentDef.inputs);
        return {
            inputs,
            outputs: componentDef.outputs,
            encapsulation: componentDef.encapsulation,
            changeDetection: componentDef.onPush
                ? constants_1.ChangeDetectionStrategy.OnPush
                : constants_1.ChangeDetectionStrategy.Default,
        };
    }
    const directiveDef = (0, def_getters_1.getDirectiveDef)(constructor);
    if (directiveDef) {
        const inputs = extractInputDebugMetadata(directiveDef.inputs);
        return { inputs, outputs: directiveDef.outputs };
    }
    return null;
}
/**
 * Retrieve map of local references.
 *
 * The references are retrieved as a map of local reference name to element or directive instance.
 *
 * @param target DOM element, component or directive instance for which to retrieve
 *    the local references.
 */
function getLocalRefs(target) {
    const context = (0, context_discovery_1.getLContext)(target);
    if (context === null)
        return {};
    if (context.localRefs === undefined) {
        const lView = context.lView;
        if (lView === null) {
            return {};
        }
        context.localRefs = (0, context_discovery_1.discoverLocalRefs)(lView, context.nodeIndex);
    }
    return context.localRefs || {};
}
/**
 * Retrieves the host element of a component or directive instance.
 * The host element is the DOM element that matched the selector of the directive.
 *
 * @param componentOrDirective Component or directive instance for which the host
 *     element should be retrieved.
 * @returns Host element of the target.
 *
 * @publicApi
 */
function getHostElement(componentOrDirective) {
    return (0, context_discovery_1.getLContext)(componentOrDirective).native;
}
/**
 * Retrieves the rendered text for a given component.
 *
 * This function retrieves the host element of a component and
 * and then returns the `textContent` for that element. This implies
 * that the text returned will include re-projected content of
 * the component as well.
 *
 * @param component The component to return the content text for.
 */
function getRenderedText(component) {
    const hostElement = getHostElement(component);
    return hostElement.textContent || '';
}
/**
 * Retrieves a list of event listeners associated with a DOM element. The list does include host
 * listeners, but it does not include event listeners defined outside of the Angular context
 * (e.g. through `addEventListener`).
 *
 * @usageNotes
 * Given the following DOM structure:
 *
 * ```html
 * <app-root>
 *   <div (click)="doSomething()"></div>
 * </app-root>
 * ```
 *
 * Calling `getListeners` on `<div>` will return an object that looks as follows:
 *
 * ```ts
 * {
 *   name: 'click',
 *   element: <div>,
 *   callback: () => doSomething(),
 *   useCapture: false
 * }
 * ```
 *
 * @param element Element for which the DOM listeners should be retrieved.
 * @returns Array of event listeners on the DOM element.
 *
 * @publicApi
 */
function getListeners(element) {
    ngDevMode && assertDomElement(element);
    const lContext = (0, context_discovery_1.getLContext)(element);
    const lView = lContext === null ? null : lContext.lView;
    if (lView === null)
        return [];
    const tView = lView[view_1.TVIEW];
    const lCleanup = lView[view_1.CLEANUP];
    const tCleanup = tView.cleanup;
    const listeners = [];
    if (tCleanup && lCleanup) {
        for (let i = 0; i < tCleanup.length;) {
            const firstParam = tCleanup[i++];
            const secondParam = tCleanup[i++];
            if (typeof firstParam === 'string') {
                const name = firstParam;
                const listenerElement = (0, view_utils_1.unwrapRNode)(lView[secondParam]);
                const callback = lCleanup[tCleanup[i++]];
                const useCaptureOrIndx = tCleanup[i++];
                // if useCaptureOrIndx is boolean then report it as is.
                // if useCaptureOrIndx is positive number then it in unsubscribe method
                // if useCaptureOrIndx is negative number then it is a Subscription
                const type = typeof useCaptureOrIndx === 'boolean' || useCaptureOrIndx >= 0 ? 'dom' : 'output';
                const useCapture = typeof useCaptureOrIndx === 'boolean' ? useCaptureOrIndx : false;
                if (element == listenerElement) {
                    listeners.push({ element, name, callback, useCapture, type });
                }
            }
        }
    }
    listeners.sort(sortListeners);
    return listeners;
}
function sortListeners(a, b) {
    if (a.name == b.name)
        return 0;
    return a.name < b.name ? -1 : 1;
}
/**
 * This function should not exist because it is megamorphic and only mostly correct.
 *
 * See call site for more info.
 */
function isDirectiveDefHack(obj) {
    return (obj.type !== undefined &&
        obj.declaredInputs !== undefined &&
        obj.resolveHostDirectives !== undefined);
}
/**
 * Retrieve the component `LView` from component/element.
 *
 * NOTE: `LView` is a private and should not be leaked outside.
 *       Don't export this method to `ng.*` on window.
 *
 * @param target DOM element or component instance for which to retrieve the LView.
 */
function getComponentLView(target) {
    const lContext = (0, context_discovery_1.getLContext)(target);
    const nodeIndx = lContext.nodeIndex;
    const lView = lContext.lView;
    ngDevMode && (0, assert_1.assertLView)(lView);
    const componentLView = lView[nodeIndx];
    ngDevMode && (0, assert_1.assertLView)(componentLView);
    return componentLView;
}
/** Asserts that a value is a DOM Element. */
function assertDomElement(value) {
    if (typeof Element !== 'undefined' && !(value instanceof Element)) {
        throw new Error('Expecting instance of DOM Element');
    }
}
/**
 * A directive definition holds additional metadata using bitwise flags to indicate
 * for example whether it is signal based.
 *
 * This information needs to be separate from the `publicName -> minifiedName`
 * mappings for backwards compatibility.
 */
function extractInputDebugMetadata(inputs) {
    const res = {};
    for (const key in inputs) {
        if (inputs.hasOwnProperty(key)) {
            const value = inputs[key];
            if (value !== undefined) {
                res[key] = value[0];
            }
        }
    }
    return res;
}
