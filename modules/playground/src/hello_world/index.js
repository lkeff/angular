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
exports.ExampleModule = exports.HelloCmp = exports.RedDec = exports.GreetingService = void 0;
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
// A service available to the Injector, used by the HelloCmp component.
let GreetingService = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var GreetingService = _classThis = class {
        constructor() {
            this.greeting = 'hello';
        }
    };
    __setFunctionName(_classThis, "GreetingService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        GreetingService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return GreetingService = _classThis;
})();
exports.GreetingService = GreetingService;
// Directives are light-weight. They don't allow new
// expression contexts (use @Component for those needs).
let RedDec = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[red]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var RedDec = _classThis = class {
        // ElementRef is always injectable and it wraps the element on which the
        // directive was found by the compiler.
        constructor(el, renderer) {
            renderer.setStyle(el.nativeElement, 'color', 'red');
        }
    };
    __setFunctionName(_classThis, "RedDec");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RedDec = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RedDec = _classThis;
})();
exports.RedDec = RedDec;
// Angular supports 2 basic types of directives:
// - Component - the basic building blocks of Angular apps. Backed by
//   ShadowDom. (https://www.html5rocks.com/en/tutorials/webcomponents/shadowdom/)
// - Directive - add behavior to existing elements.
let HelloCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            // The Selector prop tells Angular on which elements to instantiate this
            // class. The syntax supported is a basic subset of CSS selectors, for example
            // 'element', '[attr]', [attr=foo]', etc.
            selector: 'hello-app',
            // These are services that would be created if a class in the component's
            // template tries to inject them.
            viewProviders: [GreetingService],
            // Expressions in the template (like {{greeting}}) are evaluated in the
            // context of the HelloCmp class below.
            template: `<div class="greeting">{{ greeting }} <span red>world</span>!</div>
    <button class="changeButton" (click)="changeGreeting()">change greeting</button>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var HelloCmp = _classThis = class {
        constructor(service) {
            this.greeting = service.greeting;
        }
        changeGreeting() {
            this.greeting = 'howdy';
        }
    };
    __setFunctionName(_classThis, "HelloCmp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HelloCmp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HelloCmp = _classThis;
})();
exports.HelloCmp = HelloCmp;
let ExampleModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({ declarations: [HelloCmp, RedDec], bootstrap: [HelloCmp], imports: [platform_browser_1.BrowserModule] })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ExampleModule = _classThis = class {
    };
    __setFunctionName(_classThis, "ExampleModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ExampleModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ExampleModule = _classThis;
})();
exports.ExampleModule = ExampleModule;
(0, platform_browser_dynamic_1.platformBrowserDynamic)().bootstrapModule(ExampleModule);
