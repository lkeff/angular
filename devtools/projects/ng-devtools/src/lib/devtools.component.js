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
exports.DevToolsComponent = void 0;
const animations_1 = require("@angular/animations");
const core_1 = require("@angular/core");
const protocol_1 = require("protocol");
const rxjs_1 = require("rxjs");
const frame_manager_1 = require("./application-services/frame_manager");
const theme_service_1 = require("./application-services/theme_service");
const tooltip_1 = require("@angular/material/tooltip");
const devtools_tabs_component_1 = require("./devtools-tabs/devtools-tabs.component");
const progress_spinner_1 = require("@angular/material/progress-spinner");
const browser_styles_service_1 = require("./application-services/browser_styles_service");
const window_provider_1 = require("./application-providers/window_provider");
const DETECT_ANGULAR_ATTEMPTS = 10;
var AngularStatus;
(function (AngularStatus) {
    /**
     * This page may have Angular but we don't know yet. We're still trying to detect it.
     */
    AngularStatus[AngularStatus["UNKNOWN"] = 0] = "UNKNOWN";
    /**
     * We've given up on trying to detect Angular. We tried ${DETECT_ANGULAR_ATTEMPTS} times and
     * failed.
     */
    AngularStatus[AngularStatus["DOES_NOT_EXIST"] = 1] = "DOES_NOT_EXIST";
    /**
     * Angular was detected somewhere on the page.
     */
    AngularStatus[AngularStatus["EXISTS"] = 2] = "EXISTS";
})(AngularStatus || (AngularStatus = {}));
const LAST_SUPPORTED_VERSION = 9;
let DevToolsComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-devtools',
            templateUrl: './devtools.component.html',
            styleUrls: ['./devtools.component.scss'],
            animations: [
                (0, animations_1.trigger)('enterAnimation', [
                    (0, animations_1.transition)(':enter', [(0, animations_1.style)({ opacity: 0 }), (0, animations_1.animate)('200ms', (0, animations_1.style)({ opacity: 1 }))]),
                    (0, animations_1.transition)(':leave', [(0, animations_1.style)({ opacity: 1 }), (0, animations_1.animate)('200ms', (0, animations_1.style)({ opacity: 0 }))]),
                ]),
            ],
            imports: [devtools_tabs_component_1.DevToolsTabsComponent, tooltip_1.MatTooltip, progress_spinner_1.MatProgressSpinnerModule, tooltip_1.MatTooltipModule],
            providers: [window_provider_1.WINDOW_PROVIDER, theme_service_1.ThemeService],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DevToolsComponent = _classThis = class {
        constructor() {
            this.AngularStatus = AngularStatus;
            this.angularStatus = (0, core_1.signal)(AngularStatus.UNKNOWN);
            this.angularVersion = (0, core_1.signal)(undefined);
            this.angularIsInDevMode = (0, core_1.signal)(true);
            this.hydration = (0, core_1.signal)(false);
            this.supportedApis = (0, core_1.signal)({
                profiler: false,
                dependencyInjection: false,
                routes: false,
            });
            this.ivy = (0, core_1.signal)(undefined);
            this.supportedVersion = (0, core_1.computed)(() => {
                const version = this.angularVersion();
                if (!version) {
                    return false;
                }
                const majorVersion = parseInt(version.toString().split('.')[0], 10);
                // Check that major version is either greater or equal to the last supported version
                // or that the major version is 0 for the (0.0.0-PLACEHOLDER) dev build case.
                return (majorVersion >= LAST_SUPPORTED_VERSION || majorVersion === 0) && this.ivy();
            });
            this._messageBus = (0, core_1.inject)(protocol_1.MessageBus);
            this._themeService = (0, core_1.inject)(theme_service_1.ThemeService);
            this._frameManager = (0, core_1.inject)(frame_manager_1.FrameManager);
            this._browserStyles = (0, core_1.inject)(browser_styles_service_1.BrowserStylesService);
            this._interval$ = (0, rxjs_1.interval)(500).subscribe((attempt) => {
                if (attempt === DETECT_ANGULAR_ATTEMPTS) {
                    this.angularStatus.set(AngularStatus.DOES_NOT_EXIST);
                }
                this._messageBus.emit('queryNgAvailability');
            });
        }
        inspectFrame(frame) {
            this._frameManager.inspectFrame(frame);
        }
        ngOnInit() {
            this._themeService.initializeThemeWatcher();
            this._browserStyles.initBrowserSpecificStyles();
            this._messageBus.once('ngAvailability', ({ version, devMode, ivy, hydration, supportedApis }) => {
                this.angularStatus.set(version ? AngularStatus.EXISTS : AngularStatus.DOES_NOT_EXIST);
                this.angularVersion.set(version);
                this.angularIsInDevMode.set(devMode);
                this.ivy.set(ivy);
                this._interval$.unsubscribe();
                this.hydration.set(hydration);
                this.supportedApis.set(supportedApis);
            });
        }
        ngOnDestroy() {
            this._interval$.unsubscribe();
        }
    };
    __setFunctionName(_classThis, "DevToolsComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DevToolsComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DevToolsComponent = _classThis;
})();
exports.DevToolsComponent = DevToolsComponent;
