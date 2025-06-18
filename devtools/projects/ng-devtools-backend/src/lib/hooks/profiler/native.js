"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NgProfiler = void 0;
const core_1 = require("@angular/core");
const directive_forest_1 = require("../../directive-forest");
const ng_debug_api_1 = require("../../ng-debug-api/ng-debug-api");
const utils_1 = require("../../utils");
const identity_tracker_1 = require("../identity-tracker");
const shared_1 = require("./shared");
/** Implementation of Profiler that utilizes framework APIs fire profiler hooks. */
class NgProfiler extends shared_1.Profiler {
    constructor(config = {}) {
        super(config);
        this._tracker = identity_tracker_1.IdentityTracker.getInstance();
        this._callbacks = [];
        this._lastDirectiveInstance = null;
        this._setProfilerCallback((event, instanceOrLView, eventFn) => {
            if (this[event] === undefined) {
                return;
            }
            this[event](instanceOrLView, eventFn);
        });
        this._initialize();
    }
    _initialize() {
        (0, ng_debug_api_1.ngDebugClient)().ɵsetProfiler((event, instanceOrLView = null, eventFn) => this._callbacks.forEach((cb) => cb(event, instanceOrLView, eventFn)));
    }
    _setProfilerCallback(callback) {
        this._callbacks.push(callback);
    }
    destroy() {
        this._tracker.destroy();
    }
    onIndexForest(newNodes, removedNodes) {
        newNodes.forEach((node) => {
            const { directive, isComponent } = node;
            const position = this._tracker.getDirectivePosition(directive);
            const id = this._tracker.getDirectiveId(directive);
            this._onCreate(directive, (0, directive_forest_1.getDirectiveHostElement)(directive), id, isComponent, position);
        });
        removedNodes.forEach((node) => {
            const { directive, isComponent } = node;
            const position = this._tracker.getDirectivePosition(directive);
            const id = this._tracker.getDirectiveId(directive);
            this._onDestroy(directive, (0, directive_forest_1.getDirectiveHostElement)(directive), id, isComponent, position);
        });
    }
    [core_1.ɵProfilerEvent.BootstrapApplicationStart](_directive, _eventFn) {
        // todo: implement
        return;
    }
    [core_1.ɵProfilerEvent.BootstrapApplicationEnd](_directive, _eventFn) {
        // todo: implement
        return;
    }
    [core_1.ɵProfilerEvent.BootstrapComponentStart](_directive, _eventFn) {
        // todo: implement
        return;
    }
    [core_1.ɵProfilerEvent.BootstrapComponentEnd](_directive, _eventFn) {
        // todo: implement
        return;
    }
    [core_1.ɵProfilerEvent.ChangeDetectionStart](_directive, _eventFn) {
        // todo: implement
        return;
    }
    [core_1.ɵProfilerEvent.ChangeDetectionEnd](_directive, _eventFn) {
        // todo: implement
        return;
    }
    [core_1.ɵProfilerEvent.ChangeDetectionSyncStart](_directive, _eventFn) {
        // todo: implement
        return;
    }
    [core_1.ɵProfilerEvent.ChangeDetectionSyncEnd](_directive, _eventFn) {
        // todo: implement
        return;
    }
    [core_1.ɵProfilerEvent.AfterRenderHooksStart](_directive, _eventFn) {
        // todo: implement
        return;
    }
    [core_1.ɵProfilerEvent.AfterRenderHooksEnd](_directive, _eventFn) {
        // todo: implement
        return;
    }
    [core_1.ɵProfilerEvent.ComponentStart](_directive, _eventFn) {
        // todo: implement
        return;
    }
    [core_1.ɵProfilerEvent.ComponentEnd](_directive, _eventFn) {
        // todo: implement
        return;
    }
    [core_1.ɵProfilerEvent.DeferBlockStateStart](_directive, _eventFn) {
        // todo: implement
        return;
    }
    [core_1.ɵProfilerEvent.DeferBlockStateEnd](_directive, _eventFn) {
        // todo: implement
        return;
    }
    [core_1.ɵProfilerEvent.DynamicComponentStart](_directive, _eventFn) {
        // todo: implement
        return;
    }
    [core_1.ɵProfilerEvent.DynamicComponentEnd](_directive, _eventFn) {
        // todo: implement
        return;
    }
    [core_1.ɵProfilerEvent.HostBindingsUpdateStart](_directive, _eventFn) {
        // todo: implement
        return;
    }
    [core_1.ɵProfilerEvent.HostBindingsUpdateEnd](_directive, _eventFn) {
        // todo: implement
        return;
    }
    [core_1.ɵProfilerEvent.TemplateCreateStart](_directive, _eventFn) {
        // todo: implement
        return;
    }
    [core_1.ɵProfilerEvent.TemplateCreateEnd](_directive, _eventFn) {
        // todo: implement
        return;
    }
    [core_1.ɵProfilerEvent.TemplateUpdateStart](context, _eventFn) {
        if (!this._inChangeDetection) {
            this._inChangeDetection = true;
            (0, utils_1.runOutsideAngular)(() => {
                Promise.resolve().then(() => {
                    this.changeDetection$.next();
                    this._inChangeDetection = false;
                });
            });
        }
        const position = this._tracker.getDirectivePosition(context);
        const id = this._tracker.getDirectiveId(context);
        // If we can find the position and the ID we assume that this is a component instance.
        // Alternatively, if we can't find the ID or the position, we assume that this is a
        // context of an embedded view (for example, NgForOfContext, NgIfContext, or a custom one).
        if (position !== undefined && id !== undefined) {
            this._lastDirectiveInstance = context;
        }
        if (id !== undefined && position !== undefined) {
            this._onChangeDetectionStart(context, (0, directive_forest_1.getDirectiveHostElement)(context), id, position);
            return;
        }
        this._onChangeDetectionStart(this._lastDirectiveInstance, (0, directive_forest_1.getDirectiveHostElement)(this._lastDirectiveInstance), this._tracker.getDirectiveId(this._lastDirectiveInstance), this._tracker.getDirectivePosition(this._lastDirectiveInstance));
    }
    [core_1.ɵProfilerEvent.TemplateUpdateEnd](context, _eventFn) {
        const position = this._tracker.getDirectivePosition(context);
        const id = this._tracker.getDirectiveId(context);
        if (this._tracker.hasDirective(context) && id !== undefined && position !== undefined) {
            this._onChangeDetectionEnd(context, (0, directive_forest_1.getDirectiveHostElement)(context), id, position);
            return;
        }
        this._onChangeDetectionEnd(this._lastDirectiveInstance, (0, directive_forest_1.getDirectiveHostElement)(this._lastDirectiveInstance), this._tracker.getDirectiveId(this._lastDirectiveInstance), this._tracker.getDirectivePosition(this._lastDirectiveInstance));
    }
    [core_1.ɵProfilerEvent.LifecycleHookStart](directive, hook) {
        const id = this._tracker.getDirectiveId(directive);
        const element = (0, directive_forest_1.getDirectiveHostElement)(directive);
        const lifecycleHookName = (0, shared_1.getLifeCycleName)(directive, hook);
        const isComponent = !!this._tracker.isComponent.get(directive);
        this._onLifecycleHookStart(directive, lifecycleHookName, element, id, isComponent);
    }
    [core_1.ɵProfilerEvent.LifecycleHookEnd](directive, hook) {
        const id = this._tracker.getDirectiveId(directive);
        const element = (0, directive_forest_1.getDirectiveHostElement)(directive);
        const lifecycleHookName = (0, shared_1.getLifeCycleName)(directive, hook);
        const isComponent = !!this._tracker.isComponent.get(directive);
        this._onLifecycleHookEnd(directive, lifecycleHookName, element, id, isComponent);
    }
    [core_1.ɵProfilerEvent.OutputStart](componentOrDirective, listener) {
        const isComponent = !!this._tracker.isComponent.get(componentOrDirective);
        const node = (0, directive_forest_1.getDirectiveHostElement)(componentOrDirective);
        const id = this._tracker.getDirectiveId(componentOrDirective);
        this._onOutputStart(componentOrDirective, listener.name, node, id, isComponent);
    }
    [core_1.ɵProfilerEvent.OutputEnd](componentOrDirective, listener) {
        const isComponent = !!this._tracker.isComponent.get(componentOrDirective);
        const node = (0, directive_forest_1.getDirectiveHostElement)(componentOrDirective);
        const id = this._tracker.getDirectiveId(componentOrDirective);
        this._onOutputEnd(componentOrDirective, listener.name, node, id, isComponent);
    }
}
exports.NgProfiler = NgProfiler;
