"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpgradeComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("../common");
const NOT_SUPPORTED = 'NOT_SUPPORTED';
const INITIAL_VALUE = {
    __UNINITIALIZED__: true,
};
class Bindings {
    constructor() {
        this.twoWayBoundProperties = [];
        this.twoWayBoundLastValues = [];
        this.expressionBoundProperties = [];
        this.propertyToOutputMap = {};
    }
}
/**
 * @description
 *
 * A helper class that allows an AngularJS component to be used from Angular.
 *
 * *Part of the [upgrade/static](api?query=upgrade%2Fstatic)
 * library for hybrid upgrade apps that support AOT compilation.*
 *
 * This helper class should be used as a base class for creating Angular directives
 * that wrap AngularJS components that need to be "upgraded".
 *
 * @usageNotes
 * ### Examples
 *
 * Let's assume that you have an AngularJS component called `ng1Hero` that needs
 * to be made available in Angular templates.
 *
 * {@example upgrade/static/ts/full/module.ts region="ng1-hero"}
 *
 * We must create a `Directive` that will make this AngularJS component
 * available inside Angular templates.
 *
 * {@example upgrade/static/ts/full/module.ts region="ng1-hero-wrapper"}
 *
 * In this example you can see that we must derive from the `UpgradeComponent`
 * base class but also provide an {@link Directive `@Directive`} decorator. This is
 * because the AOT compiler requires that this information is statically available at
 * compile time.
 *
 * Note that we must do the following:
 * * specify the directive's selector (`ng1-hero`)
 * * specify all inputs and outputs that the AngularJS component expects
 * * derive from `UpgradeComponent`
 * * call the base class from the constructor, passing
 *   * the AngularJS name of the component (`ng1Hero`)
 *   * the `ElementRef` and `Injector` for the component wrapper
 *
 * @publicApi
 * @extensible
 */
let UpgradeComponent = (() => {
    let _classDecorators = [(0, core_1.Directive)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var UpgradeComponent = _classThis = class {
        /**
         * Create a new `UpgradeComponent` instance. You should not normally need to do this.
         * Instead you should derive a new class from this one and call the super constructor
         * from the base class.
         *
         * {@example upgrade/static/ts/full/module.ts region="ng1-hero-wrapper" }
         *
         * * The `name` parameter should be the name of the AngularJS directive.
         * * The `elementRef` and `injector` parameters should be acquired from Angular by dependency
         *   injection into the base class constructor.
         */
        constructor(name, elementRef, injector) {
            // We will be instantiating the controller in the `ngOnInit` hook, when the
            // first `ngOnChanges` will have been already triggered. We store the
            // `SimpleChanges` and "play them back" later.
            this.pendingChanges = null;
            this.helper = new common_1.ɵupgradeHelper.UpgradeHelper(injector, name, elementRef);
            this.$element = this.helper.$element;
            this.directive = this.helper.directive;
            this.bindings = this.initializeBindings(this.directive, name);
            // We ask for the AngularJS scope from the Angular injector, since
            // we will put the new component scope onto the new injector for each component
            const $parentScope = injector.get(common_1.ɵconstants.$SCOPE);
            // QUESTION 1: Should we create an isolated scope if the scope is only true?
            // QUESTION 2: Should we make the scope accessible through `$element.scope()/isolateScope()`?
            this.$componentScope = $parentScope.$new(!!this.directive.scope);
            this.initializeOutputs();
        }
        /** @nodoc */
        ngOnInit() {
            // Collect contents, insert and compile template
            const attachChildNodes = this.helper.prepareTransclusion();
            const linkFn = this.helper.compileTemplate();
            // Instantiate controller
            const controllerType = this.directive.controller;
            const bindToController = this.directive.bindToController;
            let controllerInstance = controllerType
                ? this.helper.buildController(controllerType, this.$componentScope)
                : undefined;
            let bindingDestination;
            if (!bindToController) {
                bindingDestination = this.$componentScope;
            }
            else if (controllerType && controllerInstance) {
                bindingDestination = controllerInstance;
            }
            else {
                throw new Error(`Upgraded directive '${this.directive.name}' specifies 'bindToController' but no controller.`);
            }
            this.controllerInstance = controllerInstance;
            this.bindingDestination = bindingDestination;
            // Set up outputs
            this.bindOutputs(bindingDestination);
            // Require other controllers
            const requiredControllers = this.helper.resolveAndBindRequiredControllers(controllerInstance);
            // Hook: $onChanges
            if (this.pendingChanges) {
                this.forwardChanges(this.pendingChanges, bindingDestination);
                this.pendingChanges = null;
            }
            // Hook: $onInit
            if (this.controllerInstance && common_1.ɵutil.isFunction(this.controllerInstance.$onInit)) {
                this.controllerInstance.$onInit();
            }
            // Hook: $doCheck
            if (controllerInstance && common_1.ɵutil.isFunction(controllerInstance.$doCheck)) {
                const callDoCheck = () => { var _a; return (_a = controllerInstance === null || controllerInstance === void 0 ? void 0 : controllerInstance.$doCheck) === null || _a === void 0 ? void 0 : _a.call(controllerInstance); };
                this.unregisterDoCheckWatcher = this.$componentScope.$parent.$watch(callDoCheck);
                callDoCheck();
            }
            // Linking
            const link = this.directive.link;
            const preLink = typeof link == 'object' && link.pre;
            const postLink = typeof link == 'object' ? link.post : link;
            const attrs = NOT_SUPPORTED;
            const transcludeFn = NOT_SUPPORTED;
            if (preLink) {
                preLink(this.$componentScope, this.$element, attrs, requiredControllers, transcludeFn);
            }
            linkFn(this.$componentScope, null, { parentBoundTranscludeFn: attachChildNodes });
            if (postLink) {
                postLink(this.$componentScope, this.$element, attrs, requiredControllers, transcludeFn);
            }
            // Hook: $postLink
            if (this.controllerInstance && common_1.ɵutil.isFunction(this.controllerInstance.$postLink)) {
                this.controllerInstance.$postLink();
            }
        }
        /** @nodoc */
        ngOnChanges(changes) {
            if (!this.bindingDestination) {
                this.pendingChanges = changes;
            }
            else {
                this.forwardChanges(changes, this.bindingDestination);
            }
        }
        /** @nodoc */
        ngDoCheck() {
            const twoWayBoundProperties = this.bindings.twoWayBoundProperties;
            const twoWayBoundLastValues = this.bindings.twoWayBoundLastValues;
            const propertyToOutputMap = this.bindings.propertyToOutputMap;
            twoWayBoundProperties.forEach((propName, idx) => {
                var _a;
                const newValue = (_a = this.bindingDestination) === null || _a === void 0 ? void 0 : _a[propName];
                const oldValue = twoWayBoundLastValues[idx];
                if (!Object.is(newValue, oldValue)) {
                    const outputName = propertyToOutputMap[propName];
                    const eventEmitter = this[outputName];
                    eventEmitter.emit(newValue);
                    twoWayBoundLastValues[idx] = newValue;
                }
            });
        }
        /** @nodoc */
        ngOnDestroy() {
            if (common_1.ɵutil.isFunction(this.unregisterDoCheckWatcher)) {
                this.unregisterDoCheckWatcher();
            }
            this.helper.onDestroy(this.$componentScope, this.controllerInstance);
        }
        initializeBindings(directive, name) {
            const btcIsObject = typeof directive.bindToController === 'object';
            if (btcIsObject && Object.keys(directive.scope).length) {
                throw new Error(`Binding definitions on scope and controller at the same time is not supported.`);
            }
            const context = btcIsObject ? directive.bindToController : directive.scope;
            const bindings = new Bindings();
            if (typeof context == 'object') {
                Object.keys(context).forEach((propName) => {
                    const definition = context[propName];
                    const bindingType = definition.charAt(0);
                    // QUESTION: What about `=*`? Ignore? Throw? Support?
                    switch (bindingType) {
                        case '@':
                        case '<':
                            // We don't need to do anything special. They will be defined as inputs on the
                            // upgraded component facade and the change propagation will be handled by
                            // `ngOnChanges()`.
                            break;
                        case '=':
                            bindings.twoWayBoundProperties.push(propName);
                            bindings.twoWayBoundLastValues.push(INITIAL_VALUE);
                            bindings.propertyToOutputMap[propName] = propName + 'Change';
                            break;
                        case '&':
                            bindings.expressionBoundProperties.push(propName);
                            bindings.propertyToOutputMap[propName] = propName;
                            break;
                        default:
                            let json = JSON.stringify(context);
                            throw new Error(`Unexpected mapping '${bindingType}' in '${json}' in '${name}' directive.`);
                    }
                });
            }
            return bindings;
        }
        initializeOutputs() {
            // Initialize the outputs for `=` and `&` bindings
            this.bindings.twoWayBoundProperties
                .concat(this.bindings.expressionBoundProperties)
                .forEach((propName) => {
                const outputName = this.bindings.propertyToOutputMap[propName];
                this[outputName] = new core_1.EventEmitter();
            });
        }
        bindOutputs(bindingDestination) {
            // Bind `&` bindings to the corresponding outputs
            this.bindings.expressionBoundProperties.forEach((propName) => {
                const outputName = this.bindings.propertyToOutputMap[propName];
                const emitter = this[outputName];
                bindingDestination[propName] = (value) => emitter.emit(value);
            });
        }
        forwardChanges(changes, bindingDestination) {
            // Forward input changes to `bindingDestination`
            Object.keys(changes).forEach((propName) => (bindingDestination[propName] = changes[propName].currentValue));
            if (common_1.ɵutil.isFunction(bindingDestination.$onChanges)) {
                bindingDestination.$onChanges(changes);
            }
        }
    };
    __setFunctionName(_classThis, "UpgradeComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UpgradeComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UpgradeComponent = _classThis;
})();
exports.UpgradeComponent = UpgradeComponent;
