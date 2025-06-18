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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TUTORIALS_HOMEPAGE_DIRECTORY = void 0;
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const common_1 = require("@angular/common");
const docs_1 = require("@angular/docs");
const home_animation_component_1 = require("./components/home-animation/home-animation.component");
const home_editor_component_1 = require("./components/home-editor.component");
exports.TUTORIALS_HOMEPAGE_DIRECTORY = 'homepage';
let Home = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'adev-home',
            imports: [home_animation_component_1.HomeAnimationComponent, home_editor_component_1.CodeEditorComponent],
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.scss'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Home = _classThis = class {
        constructor() {
            this.activatedRoute = (0, core_1.inject)(router_1.ActivatedRoute);
            this.renderer = (0, core_1.inject)(core_1.Renderer2);
            this.win = (0, core_1.inject)(docs_1.WINDOW);
            this.doc = (0, core_1.inject)(common_1.DOCUMENT);
            this.tutorialFiles = exports.TUTORIALS_HOMEPAGE_DIRECTORY;
            this.isUwu = 'uwu' in this.activatedRoute.snapshot.queryParams;
            this.scrollProgress = (0, core_1.signal)(0);
            this.prefetchEditor = (0, core_1.computed)(() => this.scrollProgress() > 0.25);
            this.showEditor = (0, core_1.computed)(() => this.scrollProgress() > 0.35);
            this.animationReady = (0, core_1.signal)(false);
        }
        ngAfterViewInit() {
            this.scrollListener = this.renderer.listen(this.win, 'scroll', () => 
            // Keep track of the scroll progress since the home animation uses
            // different mechanics for the standard and reduced-motion animations.
            this.scrollProgress.set(this.win.scrollY / this.doc.body.scrollHeight));
        }
        ngOnDestroy() {
            // Unlisten the scroll event.
            if (this.scrollListener) {
                this.scrollListener();
            }
        }
        onAnimationReady(ready) {
            this.animationReady.set(ready);
        }
    };
    __setFunctionName(_classThis, "Home");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Home = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Home = _classThis;
})();
exports.default = Home;
