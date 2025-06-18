"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatchingProfiler = void 0;
const directive_forest_1 = require("../../directive-forest");
const utils_1 = require("../../utils");
const identity_tracker_1 = require("../identity-tracker");
const shared_1 = require("./shared");
const hookTViewProperties = [
    'preOrderHooks',
    'preOrderCheckHooks',
    'contentHooks',
    'contentCheckHooks',
    'viewHooks',
    'viewCheckHooks',
    'destroyHooks',
];
// Only used in older Angular versions prior to the introduction of `getDirectiveMetadata`
const componentMetadata = (instance) => { var _a; return (_a = instance === null || instance === void 0 ? void 0 : instance.constructor) === null || _a === void 0 ? void 0 : _a.ɵcmp; };
/**
 * Implementation of Profiler that uses monkey patching of directive templates and lifecycle
 * methods to fire profiler hooks.
 */
class PatchingProfiler extends shared_1.Profiler {
    constructor() {
        super(...arguments);
        this._patched = new Map();
        this._undoLifecyclePatch = [];
        this._tracker = identity_tracker_1.IdentityTracker.getInstance();
    }
    destroy() {
        this._tracker.destroy();
        for (const [cmp, template] of this._patched) {
            const meta = componentMetadata(cmp);
            meta.template = template;
            meta.tView.template = template;
        }
        this._patched = new Map();
        this._undoLifecyclePatch.forEach((p) => p());
        this._undoLifecyclePatch = [];
    }
    onIndexForest(newNodes, removedNodes) {
        newNodes.forEach((node) => {
            this._observeLifecycle(node.directive, node.isComponent);
            this._observeComponent(node.directive);
            this._fireCreationCallback(node.directive, node.isComponent);
        });
        removedNodes.forEach((node) => {
            this._patched.delete(node.directive);
            this._fireDestroyCallback(node.directive, node.isComponent);
        });
    }
    _fireCreationCallback(component, isComponent) {
        const position = this._tracker.getDirectivePosition(component);
        const id = this._tracker.getDirectiveId(component);
        this._onCreate(component, (0, directive_forest_1.getDirectiveHostElement)(component), id, isComponent, position);
    }
    _fireDestroyCallback(component, isComponent) {
        const position = this._tracker.getDirectivePosition(component);
        const id = this._tracker.getDirectiveId(component);
        this._onDestroy(component, (0, directive_forest_1.getDirectiveHostElement)(component), id, isComponent, position);
    }
    _observeComponent(cmp) {
        const declarations = componentMetadata(cmp);
        if (!declarations) {
            return;
        }
        const original = declarations.template;
        const self = this;
        if (original.patched) {
            return;
        }
        declarations.tView.template = function (_, component) {
            if (!self._inChangeDetection) {
                self._inChangeDetection = true;
                (0, utils_1.runOutsideAngular)(() => {
                    Promise.resolve().then(() => {
                        self.changeDetection$.next();
                        self._inChangeDetection = false;
                    });
                });
            }
            const position = self._tracker.getDirectivePosition(component);
            const id = self._tracker.getDirectiveId(component);
            self._onChangeDetectionStart(component, (0, directive_forest_1.getDirectiveHostElement)(component), id, position);
            original.apply(this, arguments);
            if (self._tracker.hasDirective(component) && id !== undefined && position !== undefined) {
                self._onChangeDetectionEnd(component, (0, directive_forest_1.getDirectiveHostElement)(component), id, position);
            }
        };
        declarations.tView.template.patched = true;
        this._patched.set(cmp, original);
    }
    _observeLifecycle(directive, isComponent) {
        const ctx = (0, directive_forest_1.getLViewFromDirectiveOrElementInstance)(directive);
        if (!ctx) {
            return;
        }
        const tview = ctx[1];
        hookTViewProperties.forEach((hook) => {
            const current = tview[hook];
            if (!Array.isArray(current)) {
                return;
            }
            current.forEach((el, idx) => {
                if (el.patched) {
                    return;
                }
                if (typeof el === 'function') {
                    const self = this;
                    current[idx] = function () {
                        // We currently don't want to notify the consumer
                        // for execution of lifecycle hooks of services and pipes.
                        // These two abstractions don't have `__ngContext__`, and
                        // currently we won't be able to extract the required
                        // metadata by the UI.
                        if (!this[directive_forest_1.METADATA_PROPERTY_NAME]) {
                            return;
                        }
                        const id = self._tracker.getDirectiveId(this);
                        const lifecycleHookName = (0, shared_1.getLifeCycleName)(this, el);
                        const element = (0, directive_forest_1.getDirectiveHostElement)(this);
                        self._onLifecycleHookStart(this, lifecycleHookName, element, id, isComponent);
                        const result = el.apply(this, arguments);
                        self._onLifecycleHookEnd(this, lifecycleHookName, element, id, isComponent);
                        return result;
                    };
                    current[idx].patched = true;
                    this._undoLifecyclePatch.push(() => {
                        current[idx] = el;
                    });
                }
            });
        });
    }
}
exports.PatchingProfiler = PatchingProfiler;
