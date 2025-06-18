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
exports.AppComponent = void 0;
// #docplaster
// #docregion imports
const core_1 = require("@angular/core");
// #enddocregion imports
const router_1 = require("@angular/router");
const animations_1 = require("./animations");
// #docregion decorator, toggle-app-animations, define
let AppComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-root',
            templateUrl: 'app.component.html',
            styleUrls: ['app.component.css'],
            imports: [router_1.RouterLink, router_1.RouterOutlet],
            animations: [
                // #enddocregion decorator
                animations_1.slideInAnimation,
                // #docregion decorator
                // #enddocregion toggle-app-animations, define
                // animation triggers go here
                // #docregion toggle-app-animations, define
            ],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _animationsDisabled_decorators;
    let _animationsDisabled_initializers = [];
    let _animationsDisabled_extraInitializers = [];
    var AppComponent = _classThis = class {
        constructor() {
            this.animationsDisabled = __runInitializers(this, _animationsDisabled_initializers, false);
            // #enddocregion toggle-app-animations
            // #docregion get-route-animations-data
            this.contexts = (__runInitializers(this, _animationsDisabled_extraInitializers), (0, core_1.inject)(router_1.ChildrenOutletContexts));
            // #docregion toggle-app-animations
        }
        getRouteAnimationData() {
            var _a, _b, _c, _d;
            return (_d = (_c = (_b = (_a = this.contexts.getContext('primary')) === null || _a === void 0 ? void 0 : _a.route) === null || _b === void 0 ? void 0 : _b.snapshot) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d['animation'];
        }
        // #enddocregion get-route-animations-data
        toggleAnimations() {
            this.animationsDisabled = !this.animationsDisabled;
        }
    };
    __setFunctionName(_classThis, "AppComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _animationsDisabled_decorators = [(0, core_1.HostBinding)('@.disabled')];
        __esDecorate(null, null, _animationsDisabled_decorators, { kind: "field", name: "animationsDisabled", static: false, private: false, access: { has: obj => "animationsDisabled" in obj, get: obj => obj.animationsDisabled, set: (obj, value) => { obj.animationsDisabled = value; } }, metadata: _metadata }, _animationsDisabled_initializers, _animationsDisabled_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppComponent = _classThis;
})();
exports.AppComponent = AppComponent;
// #enddocregion toggle-app-animations
