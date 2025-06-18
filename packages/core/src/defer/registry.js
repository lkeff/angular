"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DehydratedBlockRegistry = exports.DEHYDRATED_BLOCK_REGISTRY = void 0;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const di_1 = require("../di");
const injection_token_1 = require("../di/injection_token");
const defs_1 = require("../di/interface/defs");
const event_delegation_utils_1 = require("../event_delegation_utils");
const tokens_1 = require("../hydration/tokens");
/**
 * An internal injection token to reference `DehydratedBlockRegistry` implementation
 * in a tree-shakable way.
 */
exports.DEHYDRATED_BLOCK_REGISTRY = new injection_token_1.InjectionToken(ngDevMode ? 'DEHYDRATED_BLOCK_REGISTRY' : '');
/**
 * The DehydratedBlockRegistry is used for incremental hydration purposes. It keeps
 * track of the Defer Blocks that need hydration so we can effectively
 * navigate up to the top dehydrated defer block and fire appropriate cleanup
 * functions post hydration.
 */
class DehydratedBlockRegistry {
    constructor() {
        this.registry = new Map();
        this.cleanupFns = new Map();
        this.jsActionMap = (0, di_1.inject)(tokens_1.JSACTION_BLOCK_ELEMENT_MAP);
        this.contract = (0, di_1.inject)(event_delegation_utils_1.JSACTION_EVENT_CONTRACT);
        // Blocks that are being hydrated.
        this.hydrating = new Map();
        // Blocks that are awaiting a defer instruction finish.
        this.awaitingCallbacks = new Map();
    }
    add(blockId, info) {
        this.registry.set(blockId, info);
        // It's possible that hydration is queued that's waiting for the
        // resolution of a lazy loaded route. In this case, we ensure
        // the callback function is called to continue the hydration process
        // for the queued block set.
        if (this.awaitingCallbacks.has(blockId)) {
            const awaitingCallbacks = this.awaitingCallbacks.get(blockId);
            for (const cb of awaitingCallbacks) {
                cb();
            }
        }
    }
    get(blockId) {
        var _a;
        return (_a = this.registry.get(blockId)) !== null && _a !== void 0 ? _a : null;
    }
    has(blockId) {
        return this.registry.has(blockId);
    }
    cleanup(hydratedBlocks) {
        var _a;
        (0, event_delegation_utils_1.removeListenersFromBlocks)(hydratedBlocks, this.jsActionMap);
        for (let blockId of hydratedBlocks) {
            this.registry.delete(blockId);
            this.jsActionMap.delete(blockId);
            this.invokeTriggerCleanupFns(blockId);
            this.hydrating.delete(blockId);
            this.awaitingCallbacks.delete(blockId);
        }
        if (this.size === 0) {
            (_a = this.contract.instance) === null || _a === void 0 ? void 0 : _a.cleanUp();
        }
    }
    get size() {
        return this.registry.size;
    }
    // we have to leave the lowest block Id in the registry
    // unless that block has no children
    addCleanupFn(blockId, fn) {
        let cleanupFunctions = [];
        if (this.cleanupFns.has(blockId)) {
            cleanupFunctions = this.cleanupFns.get(blockId);
        }
        cleanupFunctions.push(fn);
        this.cleanupFns.set(blockId, cleanupFunctions);
    }
    invokeTriggerCleanupFns(blockId) {
        var _a;
        const fns = (_a = this.cleanupFns.get(blockId)) !== null && _a !== void 0 ? _a : [];
        for (let fn of fns) {
            fn();
        }
        this.cleanupFns.delete(blockId);
    }
    awaitParentBlock(topmostParentBlock, callback) {
        var _a;
        const parentBlockAwaitCallbacks = (_a = this.awaitingCallbacks.get(topmostParentBlock)) !== null && _a !== void 0 ? _a : [];
        parentBlockAwaitCallbacks.push(callback);
        this.awaitingCallbacks.set(topmostParentBlock, parentBlockAwaitCallbacks);
    }
}
exports.DehydratedBlockRegistry = DehydratedBlockRegistry;
/** @nocollapse */
DehydratedBlockRegistry.ɵprov = (0, defs_1.ɵɵdefineInjectable)({
    token: DehydratedBlockRegistry,
    providedIn: null,
    factory: () => new DehydratedBlockRegistry(),
});
