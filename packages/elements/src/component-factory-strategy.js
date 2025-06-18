"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentNgElementStrategy = exports.ComponentNgElementStrategyFactory = void 0;
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const extract_projectable_nodes_1 = require("./extract-projectable-nodes");
const utils_1 = require("./utils");
/** Time in milliseconds to wait before destroying the component ref when disconnected. */
const DESTROY_DELAY = 10;
/**
 * Factory that creates new ComponentNgElementStrategy instance. Gets the component factory with the
 * constructor's injector's factory resolver and passes that factory to each strategy.
 */
class ComponentNgElementStrategyFactory {
    constructor(component, injector) {
        this.inputMap = new Map();
        this.componentFactory = injector
            .get(core_1.ComponentFactoryResolver)
            .resolveComponentFactory(component);
        for (const input of this.componentFactory.inputs) {
            this.inputMap.set(input.propName, input.templateName);
        }
    }
    create(injector) {
        return new ComponentNgElementStrategy(this.componentFactory, injector, this.inputMap);
    }
}
exports.ComponentNgElementStrategyFactory = ComponentNgElementStrategyFactory;
/**
 * Creates and destroys a component ref using a component factory and handles change detection
 * in response to input changes.
 */
class ComponentNgElementStrategy {
    constructor(componentFactory, injector, inputMap) {
        this.componentFactory = componentFactory;
        this.injector = injector;
        this.inputMap = inputMap;
        // Subject of `NgElementStrategyEvent` observables corresponding to the component's outputs.
        this.eventEmitters = new rxjs_1.ReplaySubject(1);
        /** Merged stream of the component's output events. */
        this.events = this.eventEmitters.pipe((0, operators_1.switchMap)((emitters) => (0, rxjs_1.merge)(...emitters)));
        /** Reference to the component that was created on connect. */
        this.componentRef = null;
        /** Callback function that when called will cancel a scheduled destruction on the component. */
        this.scheduledDestroyFn = null;
        /** Initial input values that were set before the component was created. */
        this.initialInputValues = new Map();
        this.ngZone = this.injector.get(core_1.NgZone);
        this.appRef = this.injector.get(core_1.ApplicationRef);
        this.cdScheduler = injector.get(core_1.ɵChangeDetectionScheduler);
        this.elementZone = typeof Zone === 'undefined' ? null : this.ngZone.run(() => Zone.current);
    }
    /**
     * Initializes a new component if one has not yet been created and cancels any scheduled
     * destruction.
     */
    connect(element) {
        this.runInZone(() => {
            // If the element is marked to be destroyed, cancel the task since the component was
            // reconnected
            if (this.scheduledDestroyFn !== null) {
                this.scheduledDestroyFn();
                this.scheduledDestroyFn = null;
                return;
            }
            if (this.componentRef === null) {
                this.initializeComponent(element);
            }
        });
    }
    /**
     * Schedules the component to be destroyed after some small delay in case the element is just
     * being moved across the DOM.
     */
    disconnect() {
        this.runInZone(() => {
            // Return if there is no componentRef or the component is already scheduled for destruction
            if (this.componentRef === null || this.scheduledDestroyFn !== null) {
                return;
            }
            // Schedule the component to be destroyed after a small timeout in case it is being
            // moved elsewhere in the DOM
            this.scheduledDestroyFn = utils_1.scheduler.schedule(() => {
                if (this.componentRef !== null) {
                    this.componentRef.destroy();
                    this.componentRef = null;
                }
            }, DESTROY_DELAY);
        });
    }
    /**
     * Returns the component property value. If the component has not yet been created, the value is
     * retrieved from the cached initialization values.
     */
    getInputValue(property) {
        return this.runInZone(() => {
            if (this.componentRef === null) {
                return this.initialInputValues.get(property);
            }
            return this.componentRef.instance[property];
        });
    }
    /**
     * Sets the input value for the property. If the component has not yet been created, the value is
     * cached and set when the component is created.
     */
    setInputValue(property, value) {
        if (this.componentRef === null) {
            this.initialInputValues.set(property, value);
            return;
        }
        this.runInZone(() => {
            var _a;
            this.componentRef.setInput((_a = this.inputMap.get(property)) !== null && _a !== void 0 ? _a : property, value);
            // `setInput` won't mark the view dirty if the input didn't change from its previous value.
            if ((0, core_1.ɵisViewDirty)(this.componentRef.hostView)) {
                // `setInput` will have marked the view dirty already, but also mark it for refresh. This
                // guarantees the view will be checked even if the input is being set from within change
                // detection. This provides backwards compatibility, since we used to unconditionally
                // schedule change detection in addition to the current zone run.
                (0, core_1.ɵmarkForRefresh)(this.componentRef.changeDetectorRef);
                // Notifying the scheduler with `NotificationSource.CustomElement` causes a `tick()` to be
                // scheduled unconditionally, even if the scheduler is otherwise disabled.
                this.cdScheduler.notify(core_1.ɵNotificationSource.CustomElement);
            }
        });
    }
    /**
     * Creates a new component through the component factory with the provided element host and
     * sets up its initial inputs, listens for outputs changes, and runs an initial change detection.
     */
    initializeComponent(element) {
        const childInjector = core_1.Injector.create({ providers: [], parent: this.injector });
        const projectableNodes = (0, extract_projectable_nodes_1.extractProjectableNodes)(element, this.componentFactory.ngContentSelectors);
        this.componentRef = this.componentFactory.create(childInjector, projectableNodes, element);
        this.initializeInputs();
        this.initializeOutputs(this.componentRef);
        this.appRef.attachView(this.componentRef.hostView);
        this.componentRef.hostView.detectChanges();
    }
    /** Set any stored initial inputs on the component's properties. */
    initializeInputs() {
        for (const [propName, value] of this.initialInputValues) {
            this.setInputValue(propName, value);
        }
        this.initialInputValues.clear();
    }
    /** Sets up listeners for the component's outputs so that the events stream emits the events. */
    initializeOutputs(componentRef) {
        const eventEmitters = this.componentFactory.outputs.map(({ propName, templateName }) => {
            const emitter = componentRef.instance[propName];
            return new rxjs_1.Observable((observer) => {
                const sub = emitter.subscribe((value) => observer.next({ name: templateName, value }));
                return () => sub.unsubscribe();
            });
        });
        this.eventEmitters.next(eventEmitters);
    }
    /** Runs in the angular zone, if present. */
    runInZone(fn) {
        return this.elementZone && Zone.current !== this.elementZone ? this.ngZone.run(fn) : fn();
    }
}
exports.ComponentNgElementStrategy = ComponentNgElementStrategy;
