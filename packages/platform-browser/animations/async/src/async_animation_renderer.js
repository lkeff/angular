"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ɵASYNC_ANIMATION_LOADING_SCHEDULER_FN = exports.DynamicDelegationRenderer = exports.AsyncAnimationRendererFactory = void 0;
const core_1 = require("@angular/core");
const ANIMATION_PREFIX = '@';
let AsyncAnimationRendererFactory = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AsyncAnimationRendererFactory = _classThis = class {
        /**
         *
         * @param moduleImpl allows to provide a mock implmentation (or will load the animation module)
         */
        constructor(doc, delegate, zone, animationType, moduleImpl) {
            this.doc = doc;
            this.delegate = delegate;
            this.zone = zone;
            this.animationType = animationType;
            this.moduleImpl = moduleImpl;
            this._rendererFactoryPromise = null;
            this.scheduler = null;
            this.injector = (0, core_1.inject)(core_1.Injector);
            this.loadingSchedulerFn = (0, core_1.inject)(exports.ɵASYNC_ANIMATION_LOADING_SCHEDULER_FN, {
                optional: true,
            });
        }
        /** @nodoc */
        ngOnDestroy() {
            var _a;
            // When the root view is removed, the renderer defers the actual work to the
            // `TransitionAnimationEngine` to do this, and the `TransitionAnimationEngine` doesn't actually
            // remove the DOM node, but just calls `markElementAsRemoved()`. The actual DOM node is not
            // removed until `TransitionAnimationEngine` "flushes".
            // Note: we already flush on destroy within the `InjectableAnimationEngine`. The injectable
            // engine is not provided when async animations are used.
            (_a = this._engine) === null || _a === void 0 ? void 0 : _a.flush();
        }
        /**
         * @internal
         */
        loadImpl() {
            // Note on the `.then(m => m)` part below: Closure compiler optimizations in g3 require
            // `.then` to be present for a dynamic import (or an import should be `await`ed) to detect
            // the set of imported symbols.
            const loadFn = () => { var _a; return (_a = this.moduleImpl) !== null && _a !== void 0 ? _a : Promise.resolve().then(() => __importStar(require('@angular/animations/browser'))).then((m) => m); };
            let moduleImplPromise;
            if (this.loadingSchedulerFn) {
                moduleImplPromise = this.loadingSchedulerFn(loadFn);
            }
            else {
                moduleImplPromise = loadFn();
            }
            return moduleImplPromise
                .catch((e) => {
                throw new core_1.ɵRuntimeError(5300 /* RuntimeErrorCode.ANIMATION_RENDERER_ASYNC_LOADING_FAILURE */, (typeof ngDevMode === 'undefined' || ngDevMode) &&
                    'Async loading for animations package was ' +
                        'enabled, but loading failed. Angular falls back to using regular rendering. ' +
                        "No animations will be displayed and their styles won't be applied.");
            })
                .then(({ ɵcreateEngine, ɵAnimationRendererFactory }) => {
                // We can't create the renderer yet because we might need the hostElement and the type
                // Both are provided in createRenderer().
                this._engine = ɵcreateEngine(this.animationType, this.doc);
                const rendererFactory = new ɵAnimationRendererFactory(this.delegate, this._engine, this.zone);
                this.delegate = rendererFactory;
                return rendererFactory;
            });
        }
        /**
         * This method is delegating the renderer creation to the factories.
         * It uses default factory while the animation factory isn't loaded
         * and will rely on the animation factory once it is loaded.
         *
         * Calling this method will trigger as side effect the loading of the animation module
         * if the renderered component uses animations.
         */
        createRenderer(hostElement, rendererType) {
            var _a, _b;
            const renderer = this.delegate.createRenderer(hostElement, rendererType);
            if (renderer.ɵtype === core_1.ɵAnimationRendererType.Regular) {
                // The factory is already loaded, this is an animation renderer
                return renderer;
            }
            // We need to prevent the DomRenderer to throw an error because of synthetic properties
            if (typeof renderer.throwOnSyntheticProps === 'boolean') {
                renderer.throwOnSyntheticProps = false;
            }
            // Using a dynamic renderer to switch the renderer implementation once the module is loaded.
            const dynamicRenderer = new DynamicDelegationRenderer(renderer);
            // Kick off the module loading if the component uses animations but the module hasn't been
            // loaded yet.
            if (((_a = rendererType === null || rendererType === void 0 ? void 0 : rendererType.data) === null || _a === void 0 ? void 0 : _a['animation']) && !this._rendererFactoryPromise) {
                this._rendererFactoryPromise = this.loadImpl();
            }
            (_b = this._rendererFactoryPromise) === null || _b === void 0 ? void 0 : _b.then((animationRendererFactory) => {
                var _a, _b;
                const animationRenderer = animationRendererFactory.createRenderer(hostElement, rendererType);
                dynamicRenderer.use(animationRenderer);
                (_a = this.scheduler) !== null && _a !== void 0 ? _a : (this.scheduler = this.injector.get(core_1.ɵChangeDetectionScheduler, null, { optional: true }));
                (_b = this.scheduler) === null || _b === void 0 ? void 0 : _b.notify(core_1.ɵNotificationSource.AsyncAnimationsLoaded);
            }).catch((e) => {
                // Permanently use regular renderer when loading fails.
                dynamicRenderer.use(renderer);
            });
            return dynamicRenderer;
        }
        begin() {
            var _a, _b;
            (_b = (_a = this.delegate).begin) === null || _b === void 0 ? void 0 : _b.call(_a);
        }
        end() {
            var _a, _b;
            (_b = (_a = this.delegate).end) === null || _b === void 0 ? void 0 : _b.call(_a);
        }
        whenRenderingDone() {
            var _a, _b, _c;
            return (_c = (_b = (_a = this.delegate).whenRenderingDone) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : Promise.resolve();
        }
        /**
         * Used during HMR to clear any cached data about a component.
         * @param componentId ID of the component that is being replaced.
         */
        componentReplaced(componentId) {
            var _a, _b, _c;
            // Flush the engine since the renderer destruction waits for animations to be done.
            (_a = this._engine) === null || _a === void 0 ? void 0 : _a.flush();
            (_c = (_b = this.delegate).componentReplaced) === null || _c === void 0 ? void 0 : _c.call(_b, componentId);
        }
    };
    __setFunctionName(_classThis, "AsyncAnimationRendererFactory");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AsyncAnimationRendererFactory = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AsyncAnimationRendererFactory = _classThis;
})();
exports.AsyncAnimationRendererFactory = AsyncAnimationRendererFactory;
/**
 * The class allows to dynamicly switch between different renderer implementations
 * by changing the delegate renderer.
 */
class DynamicDelegationRenderer {
    constructor(delegate) {
        this.delegate = delegate;
        // List of callbacks that need to be replayed on the animation renderer once its loaded
        this.replay = [];
        this.ɵtype = core_1.ɵAnimationRendererType.Delegated;
    }
    use(impl) {
        this.delegate = impl;
        if (this.replay !== null) {
            // Replay queued actions using the animation renderer to apply
            // all events and properties collected while loading was in progress.
            for (const fn of this.replay) {
                fn(impl);
            }
            // Set to `null` to indicate that the queue was processed
            // and we no longer need to collect events and properties.
            this.replay = null;
        }
    }
    get data() {
        return this.delegate.data;
    }
    destroy() {
        this.replay = null;
        this.delegate.destroy();
    }
    createElement(name, namespace) {
        return this.delegate.createElement(name, namespace);
    }
    createComment(value) {
        return this.delegate.createComment(value);
    }
    createText(value) {
        return this.delegate.createText(value);
    }
    get destroyNode() {
        return this.delegate.destroyNode;
    }
    appendChild(parent, newChild) {
        this.delegate.appendChild(parent, newChild);
    }
    insertBefore(parent, newChild, refChild, isMove) {
        this.delegate.insertBefore(parent, newChild, refChild, isMove);
    }
    removeChild(parent, oldChild, isHostElement) {
        this.delegate.removeChild(parent, oldChild, isHostElement);
    }
    selectRootElement(selectorOrNode, preserveContent) {
        return this.delegate.selectRootElement(selectorOrNode, preserveContent);
    }
    parentNode(node) {
        return this.delegate.parentNode(node);
    }
    nextSibling(node) {
        return this.delegate.nextSibling(node);
    }
    setAttribute(el, name, value, namespace) {
        this.delegate.setAttribute(el, name, value, namespace);
    }
    removeAttribute(el, name, namespace) {
        this.delegate.removeAttribute(el, name, namespace);
    }
    addClass(el, name) {
        this.delegate.addClass(el, name);
    }
    removeClass(el, name) {
        this.delegate.removeClass(el, name);
    }
    setStyle(el, style, value, flags) {
        this.delegate.setStyle(el, style, value, flags);
    }
    removeStyle(el, style, flags) {
        this.delegate.removeStyle(el, style, flags);
    }
    setProperty(el, name, value) {
        // We need to keep track of animation properties set on default renderer
        // So we can also set them also on the animation renderer
        if (this.shouldReplay(name)) {
            this.replay.push((renderer) => renderer.setProperty(el, name, value));
        }
        this.delegate.setProperty(el, name, value);
    }
    setValue(node, value) {
        this.delegate.setValue(node, value);
    }
    listen(target, eventName, callback, options) {
        // We need to keep track of animation events registred by the default renderer
        // So we can also register them against the animation renderer
        if (this.shouldReplay(eventName)) {
            this.replay.push((renderer) => renderer.listen(target, eventName, callback, options));
        }
        return this.delegate.listen(target, eventName, callback, options);
    }
    shouldReplay(propOrEventName) {
        //`null` indicates that we no longer need to collect events and properties
        return this.replay !== null && propOrEventName.startsWith(ANIMATION_PREFIX);
    }
}
exports.DynamicDelegationRenderer = DynamicDelegationRenderer;
/**
 * Provides a custom scheduler function for the async loading of the animation package.
 *
 * Private token for investigation purposes
 */
exports.ɵASYNC_ANIMATION_LOADING_SCHEDULER_FN = new core_1.InjectionToken(ngDevMode ? 'async_animation_loading_scheduler_fn' : '');
