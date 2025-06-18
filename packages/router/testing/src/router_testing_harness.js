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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterTestingHarness = exports.RootCmp = exports.RootFixtureService = void 0;
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const index_1 = require("../../index");
let RootFixtureService = (() => {
    let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var RootFixtureService = _classThis = class {
        createHarness() {
            if (this.harness) {
                throw new Error('Only one harness should be created per test.');
            }
            this.harness = new RouterTestingHarness(this.getRootFixture());
            return this.harness;
        }
        getRootFixture() {
            if (this.fixture !== undefined) {
                return this.fixture;
            }
            this.fixture = testing_1.TestBed.createComponent(RootCmp);
            this.fixture.detectChanges();
            return this.fixture;
        }
    };
    __setFunctionName(_classThis, "RootFixtureService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RootFixtureService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RootFixtureService = _classThis;
})();
exports.RootFixtureService = RootFixtureService;
let RootCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            template: '<router-outlet [routerOutletData]="routerOutletData()"></router-outlet>',
            imports: [index_1.RouterOutlet],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _outlet_decorators;
    let _outlet_initializers = [];
    let _outlet_extraInitializers = [];
    var RootCmp = _classThis = class {
        constructor() {
            this.outlet = __runInitializers(this, _outlet_initializers, void 0);
            this.routerOutletData = (__runInitializers(this, _outlet_extraInitializers), (0, core_1.signal)(undefined));
        }
    };
    __setFunctionName(_classThis, "RootCmp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _outlet_decorators = [(0, core_1.ViewChild)(index_1.RouterOutlet)];
        __esDecorate(null, null, _outlet_decorators, { kind: "field", name: "outlet", static: false, private: false, access: { has: obj => "outlet" in obj, get: obj => obj.outlet, set: (obj, value) => { obj.outlet = value; } }, metadata: _metadata }, _outlet_initializers, _outlet_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RootCmp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RootCmp = _classThis;
})();
exports.RootCmp = RootCmp;
/**
 * A testing harness for the `Router` to reduce the boilerplate needed to test routes and routed
 * components.
 *
 * @publicApi
 */
class RouterTestingHarness {
    /**
     * Creates a `RouterTestingHarness` instance.
     *
     * The `RouterTestingHarness` also creates its own root component with a `RouterOutlet` for the
     * purposes of rendering route components.
     *
     * Throws an error if an instance has already been created.
     * Use of this harness also requires `destroyAfterEach: true` in the `ModuleTeardownOptions`
     *
     * @param initialUrl The target of navigation to trigger before returning the harness.
     */
    static create(initialUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const harness = testing_1.TestBed.inject(RootFixtureService).createHarness();
            if (initialUrl !== undefined) {
                yield harness.navigateByUrl(initialUrl);
            }
            return harness;
        });
    }
    /** @internal */
    constructor(fixture) {
        this.fixture = fixture;
    }
    /** Instructs the root fixture to run change detection. */
    detectChanges() {
        this.fixture.detectChanges();
    }
    /** The `DebugElement` of the `RouterOutlet` component. `null` if the outlet is not activated. */
    get routeDebugElement() {
        const outlet = this.fixture.componentInstance.outlet;
        if (!outlet || !outlet.isActivated) {
            return null;
        }
        return this.fixture.debugElement.query((v) => v.componentInstance === outlet.component);
    }
    /** The native element of the `RouterOutlet` component. `null` if the outlet is not activated. */
    get routeNativeElement() {
        var _a, _b;
        return (_b = (_a = this.routeDebugElement) === null || _a === void 0 ? void 0 : _a.nativeElement) !== null && _b !== void 0 ? _b : null;
    }
    navigateByUrl(url, requiredRoutedComponentType) {
        return __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(index_1.Router);
            let resolveFn;
            const redirectTrackingPromise = new Promise((resolve) => {
                resolveFn = resolve;
            });
            (0, index_1.ɵafterNextNavigation)(testing_1.TestBed.inject(index_1.Router), resolveFn);
            yield router.navigateByUrl(url);
            yield redirectTrackingPromise;
            this.fixture.detectChanges();
            const outlet = this.fixture.componentInstance.outlet;
            // The outlet might not be activated if the user is testing a navigation for a guard that
            // rejects
            if (outlet && outlet.isActivated && outlet.activatedRoute.component) {
                const activatedComponent = outlet.component;
                if (requiredRoutedComponentType !== undefined &&
                    !(activatedComponent instanceof requiredRoutedComponentType)) {
                    throw new Error(`Unexpected routed component type. Expected ${requiredRoutedComponentType.name} but got ${activatedComponent.constructor.name}`);
                }
                return activatedComponent;
            }
            else {
                if (requiredRoutedComponentType !== undefined) {
                    throw new Error(`Unexpected routed component type. Expected ${requiredRoutedComponentType.name} but the navigation did not activate any component.`);
                }
                return null;
            }
        });
    }
}
exports.RouterTestingHarness = RouterTestingHarness;
