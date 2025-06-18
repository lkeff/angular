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
exports.MockDirectiveExplorerComponent = void 0;
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const menu_1 = require("@angular/material/menu");
const tooltip_1 = require("@angular/material/tooltip");
const protocol_1 = require("protocol");
const rxjs_1 = require("rxjs");
const application_environment_1 = require("../application-environment");
const theme_service_1 = require("../application-services/theme_service");
const devtools_tabs_component_1 = require("./devtools-tabs.component");
const index_1 = require("./tab-update/index");
const directive_explorer_component_1 = require("./directive-explorer/directive-explorer.component");
const frame_manager_1 = require("../application-services/frame_manager");
let MockDirectiveExplorerComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-directive-explorer',
            template: '',
            imports: [tooltip_1.MatTooltip, menu_1.MatMenuModule],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MockDirectiveExplorerComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "MockDirectiveExplorerComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MockDirectiveExplorerComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MockDirectiveExplorerComponent = _classThis;
})();
exports.MockDirectiveExplorerComponent = MockDirectiveExplorerComponent;
describe('DevtoolsTabsComponent', () => {
    let messageBusMock;
    let applicationEnvironmentMock;
    let comp;
    beforeEach(() => {
        messageBusMock = jasmine.createSpyObj('messageBus', ['on', 'once', 'emit', 'destroy']);
        applicationEnvironmentMock = jasmine.createSpyObj('applicationEnvironment', ['environment']);
        testing_1.TestBed.configureTestingModule({
            imports: [tooltip_1.MatTooltip, menu_1.MatMenuModule, devtools_tabs_component_1.DevToolsTabsComponent],
            providers: [
                index_1.TabUpdate,
                { provide: theme_service_1.ThemeService, useFactory: () => ({ currentTheme: new rxjs_1.Subject() }) },
                { provide: protocol_1.MessageBus, useValue: messageBusMock },
                { provide: application_environment_1.ApplicationEnvironment, useValue: applicationEnvironmentMock },
                { provide: frame_manager_1.FrameManager, useFactory: () => frame_manager_1.FrameManager.initialize(123) },
            ],
        }).overrideComponent(devtools_tabs_component_1.DevToolsTabsComponent, {
            remove: { imports: [directive_explorer_component_1.DirectiveExplorerComponent] },
            add: { imports: [MockDirectiveExplorerComponent] },
        });
        const fixture = testing_1.TestBed.createComponent(devtools_tabs_component_1.DevToolsTabsComponent);
        comp = fixture.componentInstance;
    });
    it('should create instance from class', () => {
        expect(comp).toBeTruthy();
    });
    it('toggles inspector flag', () => {
        expect(comp.inspectorRunning()).toBe(false);
        comp.toggleInspectorState();
        expect(comp.inspectorRunning()).toBe(true);
        comp.toggleInspectorState();
        expect(comp.inspectorRunning()).toBe(false);
    });
    it('emits inspector event', () => {
        comp.toggleInspector();
        expect(messageBusMock.emit).toHaveBeenCalledTimes(1);
        expect(messageBusMock.emit).toHaveBeenCalledWith('inspectorStart');
        comp.toggleInspector();
        expect(messageBusMock.emit).toHaveBeenCalledTimes(3);
        expect(messageBusMock.emit).toHaveBeenCalledWith('inspectorEnd');
        expect(messageBusMock.emit).toHaveBeenCalledWith('removeHighlightOverlay');
    });
    it('should emit a selectedFrame when emitSelectedFrame is called', () => {
        let contentScriptConnected = () => { };
        // mock message bus on method with jasmine fake call in order to pick out callback
        // and call it with frame
        messageBusMock.on.and.callFake((topic, cb) => {
            if (topic === 'contentScriptConnected') {
                contentScriptConnected = cb;
            }
        });
        const frameId = 1;
        expect(contentScriptConnected).toEqual(jasmine.any(Function));
        contentScriptConnected(frameId, 'name', 'http://localhost:4200/url');
        spyOn(comp.frameSelected, 'emit');
        comp.emitSelectedFrame({
            target: {
                value: '1',
            },
        });
        expect(comp.frameSelected.emit).toHaveBeenCalledWith(comp.frameManager.frames()[0]);
    });
});
