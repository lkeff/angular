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
exports.DevToolsTabsComponent = void 0;
const core_1 = require("@angular/core");
const icon_1 = require("@angular/material/icon");
const menu_1 = require("@angular/material/menu");
const slide_toggle_1 = require("@angular/material/slide-toggle");
const tabs_1 = require("@angular/material/tabs");
const tooltip_1 = require("@angular/material/tooltip");
const protocol_1 = require("protocol");
const index_1 = require("../application-environment/index");
const frame_manager_1 = require("../application-services/frame_manager");
const theme_service_1 = require("../application-services/theme_service");
const directive_explorer_component_1 = require("./directive-explorer/directive-explorer.component");
const injector_tree_component_1 = require("./injector-tree/injector-tree.component");
const profiler_component_1 = require("./profiler/profiler.component");
const router_tree_component_1 = require("./router-tree/router-tree.component");
const index_2 = require("./tab-update/index");
let DevToolsTabsComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-devtools-tabs',
            templateUrl: './devtools-tabs.component.html',
            styleUrls: ['./devtools-tabs.component.scss'],
            imports: [
                tabs_1.MatTabNav,
                tabs_1.MatTabNavPanel,
                tooltip_1.MatTooltip,
                icon_1.MatIcon,
                menu_1.MatMenu,
                menu_1.MatMenuItem,
                menu_1.MatMenuTrigger,
                tabs_1.MatTabLink,
                directive_explorer_component_1.DirectiveExplorerComponent,
                profiler_component_1.ProfilerComponent,
                router_tree_component_1.RouterTreeComponent,
                injector_tree_component_1.InjectorTreeComponent,
                slide_toggle_1.MatSlideToggle,
            ],
            providers: [index_2.TabUpdate],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DevToolsTabsComponent = _classThis = class {
        constructor() {
            var _a, _b, _c;
            this.isHydrationEnabled = (0, core_1.input)(false);
            this.supportedApis = core_1.input.required();
            this.frameSelected = (0, core_1.output)();
            this.applicationEnvironment = (0, core_1.inject)(index_1.ApplicationEnvironment);
            this.activeTab = (0, core_1.signal)('Components');
            this.inspectorRunning = (0, core_1.signal)(false);
            this.showCommentNodes = (0, core_1.signal)(false);
            this.routerGraphEnabled = (0, core_1.signal)(false);
            this.timingAPIEnabled = (0, core_1.signal)(false);
            this.routes = (0, core_1.signal)([]);
            this.frameManager = (0, core_1.inject)(frame_manager_1.FrameManager);
            this.snapToRoot = (0, core_1.signal)(false);
            this.tabs = (0, core_1.computed)(() => {
                const supportedApis = this.supportedApis();
                const tabs = ['Components'];
                if (supportedApis.profiler) {
                    tabs.push('Profiler');
                }
                if (supportedApis.dependencyInjection) {
                    tabs.push('Injector Tree');
                }
                if (supportedApis.routes && this.routerGraphEnabled() && this.routes().length > 0) {
                    tabs.push('Router Tree');
                }
                return tabs;
            });
            this.profilingNotificationsSupported = Boolean((_c = (_b = (_a = window.chrome) === null || _a === void 0 ? void 0 : _a.devtools) === null || _b === void 0 ? void 0 : _b.performance) === null || _c === void 0 ? void 0 : _c.onProfilingStarted);
            this.TOP_LEVEL_FRAME_ID = index_1.TOP_LEVEL_FRAME_ID;
            this.angularVersion = (0, core_1.input)(undefined);
            this.majorAngularVersion = (0, core_1.computed)(() => {
                const version = this.angularVersion();
                if (!version) {
                    return -1;
                }
                return parseInt(version.toString().split('.')[0], 10);
            });
            this.extensionVersion = (0, core_1.signal)('Development Build');
            this.tabUpdate = (0, core_1.inject)(index_2.TabUpdate);
            this.themeService = (0, core_1.inject)(theme_service_1.ThemeService);
            this._messageBus = (0, core_1.inject)(protocol_1.MessageBus);
            this._messageBus.on('updateRouterTree', (routes) => {
                this.routes.set(routes || []);
            });
            // Change the tab to Components, if an element is selected via the inspector.
            this._messageBus.on('selectComponent', () => {
                if (this.activeTab() !== 'Components') {
                    this.changeTab('Components');
                }
            });
            if (typeof chrome !== 'undefined' && chrome.runtime !== undefined) {
                this.extensionVersion.set(chrome.runtime.getManifest().version);
            }
        }
        emitSelectedFrame(event) {
            const frameId = event.target.value;
            const frame = this.frameManager.frames().find((frame) => frame.id === parseInt(frameId, 10));
            this.frameSelected.emit(frame);
        }
        changeTab(tab) {
            this.activeTab.set(tab);
            this.tabUpdate.notify(tab);
            if (tab === 'Router Tree') {
                this._messageBus.emit('getRoutes');
                this.snapToRoot.set(true);
            }
        }
        toggleInspector() {
            this.toggleInspectorState();
            this.emitInspectorEvent();
        }
        emitInspectorEvent() {
            if (this.inspectorRunning()) {
                this._messageBus.emit('inspectorStart');
            }
            else {
                this._messageBus.emit('inspectorEnd');
                this._messageBus.emit('removeHighlightOverlay');
            }
        }
        toggleInspectorState() {
            this.inspectorRunning.update((state) => !state);
        }
        toggleTimingAPI() {
            this.timingAPIEnabled.update((state) => !state);
            this.timingAPIEnabled()
                ? this._messageBus.emit('enableTimingAPI')
                : this._messageBus.emit('disableTimingAPI');
        }
        setRouterGraph(enabled) {
            this.routerGraphEnabled.set(enabled);
            if (!enabled) {
                this.activeTab.set('Components');
            }
        }
    };
    __setFunctionName(_classThis, "DevToolsTabsComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DevToolsTabsComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DevToolsTabsComponent = _classThis;
})();
exports.DevToolsTabsComponent = DevToolsTabsComponent;
