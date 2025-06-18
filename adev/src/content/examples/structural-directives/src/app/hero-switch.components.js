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
exports.heroSwitchComponents = exports.UnknownHeroComponent = exports.ConfusedHeroComponent = exports.SadHeroComponent = exports.HappyHeroComponent = void 0;
// #docregion
const core_1 = require("@angular/core");
let HappyHeroComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-happy-hero',
            template: 'Wow. You like {{hero.name}}. What a happy hero ... just like you.',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _hero_decorators;
    let _hero_initializers = [];
    let _hero_extraInitializers = [];
    var HappyHeroComponent = _classThis = class {
        constructor() {
            this.hero = __runInitializers(this, _hero_initializers, void 0);
            __runInitializers(this, _hero_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "HappyHeroComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _hero_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _hero_decorators, { kind: "field", name: "hero", static: false, private: false, access: { has: obj => "hero" in obj, get: obj => obj.hero, set: (obj, value) => { obj.hero = value; } }, metadata: _metadata }, _hero_initializers, _hero_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HappyHeroComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HappyHeroComponent = _classThis;
})();
exports.HappyHeroComponent = HappyHeroComponent;
let SadHeroComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-sad-hero',
            template: 'You like {{hero.name}}? Such a sad hero. Are you sad too?',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _hero_decorators;
    let _hero_initializers = [];
    let _hero_extraInitializers = [];
    var SadHeroComponent = _classThis = class {
        constructor() {
            this.hero = __runInitializers(this, _hero_initializers, void 0);
            __runInitializers(this, _hero_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "SadHeroComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _hero_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _hero_decorators, { kind: "field", name: "hero", static: false, private: false, access: { has: obj => "hero" in obj, get: obj => obj.hero, set: (obj, value) => { obj.hero = value; } }, metadata: _metadata }, _hero_initializers, _hero_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SadHeroComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SadHeroComponent = _classThis;
})();
exports.SadHeroComponent = SadHeroComponent;
let ConfusedHeroComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-confused-hero',
            template: 'Are you as confused as {{hero.name}}?',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _hero_decorators;
    let _hero_initializers = [];
    let _hero_extraInitializers = [];
    var ConfusedHeroComponent = _classThis = class {
        constructor() {
            this.hero = __runInitializers(this, _hero_initializers, void 0);
            __runInitializers(this, _hero_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "ConfusedHeroComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _hero_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _hero_decorators, { kind: "field", name: "hero", static: false, private: false, access: { has: obj => "hero" in obj, get: obj => obj.hero, set: (obj, value) => { obj.hero = value; } }, metadata: _metadata }, _hero_initializers, _hero_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ConfusedHeroComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ConfusedHeroComponent = _classThis;
})();
exports.ConfusedHeroComponent = ConfusedHeroComponent;
let UnknownHeroComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-unknown-hero',
            template: '{{message}}',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _hero_decorators;
    let _hero_initializers = [];
    let _hero_extraInitializers = [];
    var UnknownHeroComponent = _classThis = class {
        get message() {
            return this.hero && this.hero.name
                ? `${this.hero.name} is strange and mysterious.`
                : 'Are you feeling indecisive?';
        }
        constructor() {
            this.hero = __runInitializers(this, _hero_initializers, void 0);
            __runInitializers(this, _hero_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "UnknownHeroComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _hero_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _hero_decorators, { kind: "field", name: "hero", static: false, private: false, access: { has: obj => "hero" in obj, get: obj => obj.hero, set: (obj, value) => { obj.hero = value; } }, metadata: _metadata }, _hero_initializers, _hero_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UnknownHeroComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UnknownHeroComponent = _classThis;
})();
exports.UnknownHeroComponent = UnknownHeroComponent;
exports.heroSwitchComponents = [
    HappyHeroComponent,
    SadHeroComponent,
    ConfusedHeroComponent,
    UnknownHeroComponent,
];
