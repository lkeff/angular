"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSACTION_EVENT_CONTRACT = exports.removeListeners = exports.sharedMapFunction = exports.sharedStashFunction = exports.DEFER_BLOCK_SSR_ID_ATTRIBUTE = void 0;
exports.setJSActionAttributes = setJSActionAttributes;
exports.removeListenersFromBlocks = removeListenersFromBlocks;
exports.invokeListeners = invokeListeners;
const event_dispatch_1 = require("../primitives/event-dispatch");
const di_1 = require("./di");
exports.DEFER_BLOCK_SSR_ID_ATTRIBUTE = 'ngb';
function setJSActionAttributes(nativeElement, eventTypes, parentDeferBlockId = null) {
    // jsaction attributes specifically should be applied to elements and not comment nodes.
    // Comment nodes also have no setAttribute function. So this avoids errors.
    if (eventTypes.length === 0 || nativeElement.nodeType !== Node.ELEMENT_NODE) {
        return;
    }
    const existingAttr = nativeElement.getAttribute(event_dispatch_1.Attribute.JSACTION);
    // we dedupe cases where hydrate triggers are used as it's possible that
    // someone may have added an event binding to the root node that matches what the
    // hydrate trigger adds.
    const parts = eventTypes.reduce((prev, curr) => {
        var _a;
        // if there is no existing attribute OR it's not in the existing one, we need to add it
        return ((_a = existingAttr === null || existingAttr === void 0 ? void 0 : existingAttr.indexOf(curr)) !== null && _a !== void 0 ? _a : -1) === -1 ? prev + curr + ':;' : prev;
    }, '');
    //  This is required to be a module accessor to appease security tests on setAttribute.
    nativeElement.setAttribute(event_dispatch_1.Attribute.JSACTION, `${existingAttr !== null && existingAttr !== void 0 ? existingAttr : ''}${parts}`);
    const blockName = parentDeferBlockId !== null && parentDeferBlockId !== void 0 ? parentDeferBlockId : '';
    if (blockName !== '' && parts.length > 0) {
        nativeElement.setAttribute(exports.DEFER_BLOCK_SSR_ID_ATTRIBUTE, blockName);
    }
}
const sharedStashFunction = (rEl, eventType, listenerFn) => {
    var _a, _b;
    const el = rEl;
    const eventListenerMap = (_a = el.__jsaction_fns) !== null && _a !== void 0 ? _a : new Map();
    const eventListeners = (_b = eventListenerMap.get(eventType)) !== null && _b !== void 0 ? _b : [];
    eventListeners.push(listenerFn);
    eventListenerMap.set(eventType, eventListeners);
    el.__jsaction_fns = eventListenerMap;
};
exports.sharedStashFunction = sharedStashFunction;
const sharedMapFunction = (rEl, jsActionMap) => {
    var _a, _b;
    const el = rEl;
    let blockName = (_a = el.getAttribute(exports.DEFER_BLOCK_SSR_ID_ATTRIBUTE)) !== null && _a !== void 0 ? _a : '';
    const blockSet = (_b = jsActionMap.get(blockName)) !== null && _b !== void 0 ? _b : new Set();
    if (!blockSet.has(el)) {
        blockSet.add(el);
    }
    jsActionMap.set(blockName, blockSet);
};
exports.sharedMapFunction = sharedMapFunction;
function removeListenersFromBlocks(blockNames, jsActionMap) {
    if (blockNames.length > 0) {
        let blockList = [];
        for (let blockName of blockNames) {
            if (jsActionMap.has(blockName)) {
                blockList = [...blockList, ...jsActionMap.get(blockName)];
            }
        }
        const replayList = new Set(blockList);
        replayList.forEach(exports.removeListeners);
    }
}
const removeListeners = (el) => {
    el.removeAttribute(event_dispatch_1.Attribute.JSACTION);
    el.removeAttribute(exports.DEFER_BLOCK_SSR_ID_ATTRIBUTE);
    el.__jsaction_fns = undefined;
};
exports.removeListeners = removeListeners;
exports.JSACTION_EVENT_CONTRACT = new di_1.InjectionToken(ngDevMode ? 'EVENT_CONTRACT_DETAILS' : '', {
    providedIn: 'root',
    factory: () => ({}),
});
function invokeListeners(event, currentTarget) {
    var _a;
    const handlerFns = (_a = currentTarget === null || currentTarget === void 0 ? void 0 : currentTarget.__jsaction_fns) === null || _a === void 0 ? void 0 : _a.get(event.type);
    if (!handlerFns || !(currentTarget === null || currentTarget === void 0 ? void 0 : currentTarget.isConnected)) {
        return;
    }
    for (const handler of handlerFns) {
        handler(event);
    }
}
