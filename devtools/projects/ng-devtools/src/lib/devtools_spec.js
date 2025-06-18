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
exports.MockNgDevToolsTabs = void 0;
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const frame_manager_1 = require("./application-services/frame_manager");
const devtools_component_1 = require("./devtools.component");
const devtools_tabs_component_1 = require("./devtools-tabs/devtools-tabs.component");
const protocol_1 = require("protocol");
let MockNgDevToolsTabs = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-devtools-tabs',
            template: '',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MockNgDevToolsTabs = _classThis = class {
    };
    __setFunctionName(_classThis, "MockNgDevToolsTabs");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MockNgDevToolsTabs = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MockNgDevToolsTabs = _classThis;
})();
exports.MockNgDevToolsTabs = MockNgDevToolsTabs;
describe('DevtoolsComponent', () => {
    let fixture;
    let component;
    beforeEach(() => {
        const mockMessageBus = jasmine.createSpyObj('MessageBus', ['on', 'emit', 'once']);
        testing_1.TestBed.configureTestingModule({
            providers: [{ provide: protocol_1.MessageBus, useValue: mockMessageBus }],
        }).overrideComponent(devtools_component_1.DevToolsComponent, {
            remove: { imports: [devtools_tabs_component_1.DevToolsTabsComponent], providers: [frame_manager_1.FrameManager] },
            add: {
                imports: [MockNgDevToolsTabs],
                providers: [{ provide: frame_manager_1.FrameManager, useFactory: () => frame_manager_1.FrameManager.initialize(123) }],
            },
        });
        fixture = testing_1.TestBed.createComponent(devtools_component_1.DevToolsComponent);
        component = fixture.componentInstance;
    });
    it('should render ng devtools tabs when Angular Status is EXISTS and is in dev mode and is supported version', () => {
        component.angularStatus.set(component.AngularStatus.EXISTS);
        component.angularIsInDevMode.set(true);
        component.angularVersion.set('0.0.0');
        component.ivy.set(true);
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('ng-devtools-tabs')).toBeTruthy();
    });
    it('should render Angular Devtools dev mode only support text when Angular Status is EXISTS and is angular is not in dev mode', () => {
        component.angularStatus.set(component.AngularStatus.EXISTS);
        component.angularIsInDevMode.set(false);
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.devtools').textContent).toContain('We detected an application built with production configuration. Angular DevTools only supports development builds.');
    });
    it('should render version support message when Angular Status is EXISTS and angular version is not supported', () => {
        component.angularStatus.set(component.AngularStatus.EXISTS);
        component.angularIsInDevMode.set(true);
        component.angularVersion.set('1.0.0');
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.devtools').textContent).toContain('Angular Devtools only supports Angular versions 12 and above');
    });
    it('should render Angular application not detected when Angular Status is DOES_NOT_EXIST', () => {
        component.angularStatus.set(component.AngularStatus.DOES_NOT_EXIST);
        fixture.detectChanges();
        // expect the text to be "Angular application not detected"
        expect(fixture.nativeElement.querySelector('.not-detected').textContent).toContain('Angular application not detected');
    });
    it('should render loading svg when Angular Status is UNKNOWN', () => {
        component.angularStatus.set(component.AngularStatus.UNKNOWN);
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.loading svg')).toBeTruthy();
    });
});
