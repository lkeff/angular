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
exports.RootComponent = void 0;
const core_1 = require("../../../src/core");
const platform_browser_1 = require("@angular/platform-browser");
const router_1 = require("@angular/router");
const basic_1 = require("./e2e/basic/basic");
const fill_mode_1 = require("./e2e/fill-mode/fill-mode");
const image_distortion_1 = require("./e2e/image-distortion/image-distortion");
const image_perf_warnings_lazy_1 = require("./e2e/image-perf-warnings-lazy/image-perf-warnings-lazy");
const image_perf_warnings_oversized_1 = require("./e2e/image-perf-warnings-oversized/image-perf-warnings-oversized");
const svg_no_perf_oversized_warnings_1 = require("./e2e/image-perf-warnings-oversized/svg-no-perf-oversized-warnings");
const lcp_check_1 = require("./e2e/lcp-check/lcp-check");
const oversized_image_1 = require("./e2e/oversized-image/oversized-image");
const preconnect_check_1 = require("./e2e/preconnect-check/preconnect-check");
const playground_1 = require("./playground");
let RootComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-root',
            standalone: true,
            imports: [router_1.RouterModule],
            template: '<router-outlet></router-outlet>',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var RootComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "RootComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RootComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RootComponent = _classThis;
})();
exports.RootComponent = RootComponent;
const ROUTES = [
    // Paths that contain components for test/demo purposes:
    { path: '', component: playground_1.PlaygroundComponent },
    // Paths below are used for e2e testing:
    { path: 'e2e/basic', component: basic_1.BasicComponent },
    { path: 'e2e/lcp-check', component: lcp_check_1.LcpCheckComponent },
    { path: 'e2e/image-perf-warnings-lazy', component: image_perf_warnings_lazy_1.ImagePerfWarningsLazyComponent },
    { path: 'e2e/image-perf-warnings-oversized', component: image_perf_warnings_oversized_1.ImagePerfWarningsOversizedComponent },
    { path: 'e2e/svg-no-perf-oversized-warnings', component: svg_no_perf_oversized_warnings_1.SvgNoOversizedPerfWarningsComponent },
    { path: 'e2e/preconnect-check', component: preconnect_check_1.PreconnectCheckComponent },
    { path: 'e2e/image-distortion-passing', component: image_distortion_1.ImageDistortionPassingComponent },
    { path: 'e2e/image-distortion-failing', component: image_distortion_1.ImageDistortionFailingComponent },
    { path: 'e2e/oversized-image-passing', component: oversized_image_1.OversizedImageComponentPassing },
    { path: 'e2e/oversized-image-failing', component: oversized_image_1.OversizedImageComponentFailing },
    { path: 'e2e/fill-mode-passing', component: fill_mode_1.FillModePassingComponent },
    { path: 'e2e/fill-mode-failing', component: fill_mode_1.FillModeFailingComponent },
];
(0, platform_browser_1.bootstrapApplication)(RootComponent, {
    providers: [
        (0, platform_browser_1.provideProtractorTestingSupport)(), //
        (0, core_1.importProvidersFrom)(router_1.RouterModule.forRoot(ROUTES)),
    ],
});
