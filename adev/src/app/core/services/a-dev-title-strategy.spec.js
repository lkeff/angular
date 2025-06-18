"use strict";
/*!
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
const testing_1 = require("@angular/core/testing");
const a_dev_title_strategy_1 = require("./a-dev-title-strategy");
const router_1 = require("@angular/router");
const platform_browser_1 = require("@angular/platform-browser");
const core_1 = require("@angular/core");
let FakeComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({})];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var FakeComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "FakeComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FakeComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FakeComponent = _classThis;
})();
describe('ADevTitleStrategy', () => {
    let service;
    let router;
    let title;
    const routes = [
        { path: 'first', data: { label: 'First' }, component: FakeComponent },
        { path: 'second', component: FakeComponent },
        {
            path: 'third',
            data: { label: 'Third' },
            component: FakeComponent,
            children: [{ path: 'child', data: { label: 'Child' }, component: FakeComponent }],
        },
        {
            path: 'fourth',
            data: { label: 'Fourth' },
            component: FakeComponent,
            children: [
                {
                    path: 'child',
                    data: { label: 'Overview', parent: { label: 'Fourth' } },
                    component: FakeComponent,
                },
            ],
        },
    ];
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            providers: [(0, router_1.provideRouter)(routes)],
        });
        service = testing_1.TestBed.inject(a_dev_title_strategy_1.ADevTitleStrategy);
        router = testing_1.TestBed.inject(router_1.Router);
        title = testing_1.TestBed.inject(platform_browser_1.Title);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
    it(`should set '${a_dev_title_strategy_1.TITLE_SUFFIX}' when route doesn't have defined label`, () => __awaiter(void 0, void 0, void 0, function* () {
        spyOn(title, 'setTitle');
        yield router.navigateByUrl('/second');
        service.updateTitle(router.routerState.snapshot);
        expect(title.setTitle).toHaveBeenCalledOnceWith(a_dev_title_strategy_1.TITLE_SUFFIX);
    }));
    it(`should set 'Third - ${a_dev_title_strategy_1.TITLE_SUFFIX}' when route has defined label equal to 'Third'`, () => __awaiter(void 0, void 0, void 0, function* () {
        spyOn(title, 'setTitle');
        yield router.navigateByUrl('/third');
        service.updateTitle(router.routerState.snapshot);
        expect(title.setTitle).toHaveBeenCalledOnceWith('Third • Angular');
    }));
    it(`shouldn't take label from the parent route when current route label is not equal to ${a_dev_title_strategy_1.DEFAULT_PAGE_TITLE}`, () => __awaiter(void 0, void 0, void 0, function* () {
        spyOn(title, 'setTitle');
        yield router.navigateByUrl('/third/child');
        service.updateTitle(router.routerState.snapshot);
        expect(title.setTitle).toHaveBeenCalledOnceWith('Child • Angular');
    }));
    it(`should take label from the parent route when current route label is equal to ${a_dev_title_strategy_1.DEFAULT_PAGE_TITLE}`, () => __awaiter(void 0, void 0, void 0, function* () {
        spyOn(title, 'setTitle');
        yield router.navigateByUrl('/fourth/child');
        service.updateTitle(router.routerState.snapshot);
        expect(title.setTitle).toHaveBeenCalledOnceWith('Fourth • Overview • Angular');
    }));
});
