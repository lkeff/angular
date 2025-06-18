"use strict";
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
exports.BrowserAnimationBuilder = exports.AnimationFactory = exports.AnimationBuilder = void 0;
const core_1 = require("@angular/core");
const animation_metadata_1 = require("./animation_metadata");
/**
 * An injectable service that produces an animation sequence programmatically within an
 * Angular component or directive.
 * Provided by the `BrowserAnimationsModule` or `NoopAnimationsModule`.
 *
 * @usageNotes
 *
 * To use this service, add it to your component or directive as a dependency.
 * The service is instantiated along with your component.
 *
 * Apps do not typically need to create their own animation players, but if you
 * do need to, follow these steps:
 *
 * 1. Use the <code>[AnimationBuilder.build](api/animations/AnimationBuilder#build)()</code> method
 * to create a programmatic animation. The method returns an `AnimationFactory` instance.
 *
 * 2. Use the factory object to create an `AnimationPlayer` and attach it to a DOM element.
 *
 * 3. Use the player object to control the animation programmatically.
 *
 * For example:
 *
 * ```ts
 * // import the service from BrowserAnimationsModule
 * import {AnimationBuilder} from '@angular/animations';
 * // require the service as a dependency
 * class MyCmp {
 *   constructor(private _builder: AnimationBuilder) {}
 *
 *   makeAnimation(element: any) {
 *     // first define a reusable animation
 *     const myAnimation = this._builder.build([
 *       style({ width: 0 }),
 *       animate(1000, style({ width: '100px' }))
 *     ]);
 *
 *     // use the returned factory object to create a player
 *     const player = myAnimation.create(element);
 *
 *     player.play();
 *   }
 * }
 * ```
 *
 * @publicApi
 */
let AnimationBuilder = (() => {
    let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root', useFactory: () => (0, core_1.inject)(BrowserAnimationBuilder) })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AnimationBuilder = _classThis = class {
    };
    __setFunctionName(_classThis, "AnimationBuilder");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AnimationBuilder = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AnimationBuilder = _classThis;
})();
exports.AnimationBuilder = AnimationBuilder;
/**
 * A factory object returned from the
 * <code>[AnimationBuilder.build](api/animations/AnimationBuilder#build)()</code>
 * method.
 *
 * @publicApi
 */
class AnimationFactory {
}
exports.AnimationFactory = AnimationFactory;
let BrowserAnimationBuilder = (() => {
    let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AnimationBuilder;
    var BrowserAnimationBuilder = _classThis = class extends _classSuper {
        constructor(rootRenderer, doc) {
            super();
            this.animationModuleType = (0, core_1.inject)(core_1.ANIMATION_MODULE_TYPE, { optional: true });
            this._nextAnimationId = 0;
            const typeData = {
                id: '0',
                encapsulation: core_1.ViewEncapsulation.None,
                styles: [],
                data: { animation: [] },
            };
            this._renderer = rootRenderer.createRenderer(doc.body, typeData);
            if (this.animationModuleType === null && !isAnimationRenderer(this._renderer)) {
                // We only support AnimationRenderer & DynamicDelegationRenderer for this AnimationBuilder
                throw new core_1.ɵRuntimeError(3600 /* RuntimeErrorCode.BROWSER_ANIMATION_BUILDER_INJECTED_WITHOUT_ANIMATIONS */, (typeof ngDevMode === 'undefined' || ngDevMode) &&
                    'Angular detected that the `AnimationBuilder` was injected, but animation support was not enabled. ' +
                        'Please make sure that you enable animations in your application by calling `provideAnimations()` or `provideAnimationsAsync()` function.');
            }
        }
        build(animation) {
            const id = this._nextAnimationId;
            this._nextAnimationId++;
            const entry = Array.isArray(animation) ? (0, animation_metadata_1.sequence)(animation) : animation;
            issueAnimationCommand(this._renderer, null, id, 'register', [entry]);
            return new BrowserAnimationFactory(id, this._renderer);
        }
    };
    __setFunctionName(_classThis, "BrowserAnimationBuilder");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BrowserAnimationBuilder = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BrowserAnimationBuilder = _classThis;
})();
exports.BrowserAnimationBuilder = BrowserAnimationBuilder;
class BrowserAnimationFactory extends AnimationFactory {
    constructor(_id, _renderer) {
        super();
        this._id = _id;
        this._renderer = _renderer;
    }
    create(element, options) {
        return new RendererAnimationPlayer(this._id, element, options || {}, this._renderer);
    }
}
class RendererAnimationPlayer {
    constructor(id, element, options, _renderer) {
        this.id = id;
        this.element = element;
        this._renderer = _renderer;
        this.parentPlayer = null;
        this._started = false;
        this.totalTime = 0;
        this._command('create', options);
    }
    _listen(eventName, callback) {
        return this._renderer.listen(this.element, `@@${this.id}:${eventName}`, callback);
    }
    _command(command, ...args) {
        issueAnimationCommand(this._renderer, this.element, this.id, command, args);
    }
    onDone(fn) {
        this._listen('done', fn);
    }
    onStart(fn) {
        this._listen('start', fn);
    }
    onDestroy(fn) {
        this._listen('destroy', fn);
    }
    init() {
        this._command('init');
    }
    hasStarted() {
        return this._started;
    }
    play() {
        this._command('play');
        this._started = true;
    }
    pause() {
        this._command('pause');
    }
    restart() {
        this._command('restart');
    }
    finish() {
        this._command('finish');
    }
    destroy() {
        this._command('destroy');
    }
    reset() {
        this._command('reset');
        this._started = false;
    }
    setPosition(p) {
        this._command('setPosition', p);
    }
    getPosition() {
        var _a, _b, _c, _d;
        return (_d = (_c = (_b = (_a = unwrapAnimationRenderer(this._renderer)) === null || _a === void 0 ? void 0 : _a.engine) === null || _b === void 0 ? void 0 : _b.players[this.id]) === null || _c === void 0 ? void 0 : _c.getPosition()) !== null && _d !== void 0 ? _d : 0;
    }
}
function issueAnimationCommand(renderer, element, id, command, args) {
    renderer.setProperty(element, `@@${id}:${command}`, args);
}
/**
 * The following 2 methods cannot reference their correct types (AnimationRenderer &
 * DynamicDelegationRenderer) since this would introduce a import cycle.
 */
function unwrapAnimationRenderer(renderer) {
    const type = renderer.ɵtype;
    if (type === core_1.ɵAnimationRendererType.Regular) {
        return renderer;
    }
    else if (type === core_1.ɵAnimationRendererType.Delegated) {
        return renderer.animationRenderer;
    }
    return null;
}
function isAnimationRenderer(renderer) {
    const type = renderer.ɵtype;
    return type === core_1.ɵAnimationRendererType.Regular || type === core_1.ɵAnimationRendererType.Delegated;
}
