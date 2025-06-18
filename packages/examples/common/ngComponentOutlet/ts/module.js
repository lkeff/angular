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
exports.AppModule = exports.AppComponent = exports.NgComponentOutletCompleteExample = exports.CompleteComponent = exports.Greeter = exports.NgComponentOutletSimpleExample = exports.HelloWorld = void 0;
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
// #docregion SimpleExample
let HelloWorld = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'hello-world',
            template: 'Hello World!',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var HelloWorld = _classThis = class {
    };
    __setFunctionName(_classThis, "HelloWorld");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HelloWorld = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HelloWorld = _classThis;
})();
exports.HelloWorld = HelloWorld;
let NgComponentOutletSimpleExample = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-component-outlet-simple-example',
            template: `<ng-container *ngComponentOutlet="HelloWorld"></ng-container>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NgComponentOutletSimpleExample = _classThis = class {
        constructor() {
            // This field is necessary to expose HelloWorld to the template.
            this.HelloWorld = HelloWorld;
        }
    };
    __setFunctionName(_classThis, "NgComponentOutletSimpleExample");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NgComponentOutletSimpleExample = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NgComponentOutletSimpleExample = _classThis;
})();
exports.NgComponentOutletSimpleExample = NgComponentOutletSimpleExample;
// #enddocregion
// #docregion CompleteExample
let Greeter = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Greeter = _classThis = class {
        constructor() {
            this.suffix = '!';
        }
    };
    __setFunctionName(_classThis, "Greeter");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Greeter = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Greeter = _classThis;
})();
exports.Greeter = Greeter;
let CompleteComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'complete-component',
            template: `{{ label }}: <ng-content></ng-content> <ng-content></ng-content>{{ greeter.suffix }}`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _label_decorators;
    let _label_initializers = [];
    let _label_extraInitializers = [];
    var CompleteComponent = _classThis = class {
        constructor(greeter) {
            this.greeter = greeter;
            this.label = __runInitializers(this, _label_initializers, void 0);
            __runInitializers(this, _label_extraInitializers);
            this.greeter = greeter;
        }
    };
    __setFunctionName(_classThis, "CompleteComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _label_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _label_decorators, { kind: "field", name: "label", static: false, private: false, access: { has: obj => "label" in obj, get: obj => obj.label, set: (obj, value) => { obj.label = value; } }, metadata: _metadata }, _label_initializers, _label_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CompleteComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CompleteComponent = _classThis;
})();
exports.CompleteComponent = CompleteComponent;
let NgComponentOutletCompleteExample = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-component-outlet-complete-example',
            template: ` <ng-template #ahoj>Ahoj</ng-template>
    <ng-template #svet>Svet</ng-template>
    <ng-container
      *ngComponentOutlet="
        CompleteComponent;
        inputs: myInputs;
        injector: myInjector;
        content: myContent
      "
    ></ng-container>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _ahojTemplateRef_decorators;
    let _ahojTemplateRef_initializers = [];
    let _ahojTemplateRef_extraInitializers = [];
    let _svetTemplateRef_decorators;
    let _svetTemplateRef_initializers = [];
    let _svetTemplateRef_extraInitializers = [];
    var NgComponentOutletCompleteExample = _classThis = class {
        constructor(injector, vcr) {
            this.vcr = vcr;
            // This field is necessary to expose CompleteComponent to the template.
            this.CompleteComponent = CompleteComponent;
            this.myInputs = { 'label': 'Complete' };
            this.ahojTemplateRef = __runInitializers(this, _ahojTemplateRef_initializers, void 0);
            this.svetTemplateRef = (__runInitializers(this, _ahojTemplateRef_extraInitializers), __runInitializers(this, _svetTemplateRef_initializers, void 0));
            this.myContent = __runInitializers(this, _svetTemplateRef_extraInitializers);
            this.myInjector = core_1.Injector.create({
                providers: [{ provide: Greeter, deps: [] }],
                parent: injector,
            });
        }
        ngOnInit() {
            // Create the projectable content from the templates
            this.myContent = [
                this.vcr.createEmbeddedView(this.ahojTemplateRef).rootNodes,
                this.vcr.createEmbeddedView(this.svetTemplateRef).rootNodes,
            ];
        }
    };
    __setFunctionName(_classThis, "NgComponentOutletCompleteExample");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _ahojTemplateRef_decorators = [(0, core_1.ViewChild)('ahoj', { static: true })];
        _svetTemplateRef_decorators = [(0, core_1.ViewChild)('svet', { static: true })];
        __esDecorate(null, null, _ahojTemplateRef_decorators, { kind: "field", name: "ahojTemplateRef", static: false, private: false, access: { has: obj => "ahojTemplateRef" in obj, get: obj => obj.ahojTemplateRef, set: (obj, value) => { obj.ahojTemplateRef = value; } }, metadata: _metadata }, _ahojTemplateRef_initializers, _ahojTemplateRef_extraInitializers);
        __esDecorate(null, null, _svetTemplateRef_decorators, { kind: "field", name: "svetTemplateRef", static: false, private: false, access: { has: obj => "svetTemplateRef" in obj, get: obj => obj.svetTemplateRef, set: (obj, value) => { obj.svetTemplateRef = value; } }, metadata: _metadata }, _svetTemplateRef_initializers, _svetTemplateRef_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NgComponentOutletCompleteExample = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NgComponentOutletCompleteExample = _classThis;
})();
exports.NgComponentOutletCompleteExample = NgComponentOutletCompleteExample;
// #enddocregion
let AppComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'example-app',
            template: `<ng-component-outlet-simple-example></ng-component-outlet-simple-example>
    <hr />
    <ng-component-outlet-complete-example></ng-component-outlet-complete-example>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AppComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "AppComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppComponent = _classThis;
})();
exports.AppComponent = AppComponent;
let AppModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            imports: [platform_browser_1.BrowserModule],
            declarations: [
                AppComponent,
                NgComponentOutletSimpleExample,
                NgComponentOutletCompleteExample,
                HelloWorld,
                CompleteComponent,
            ],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AppModule = _classThis = class {
    };
    __setFunctionName(_classThis, "AppModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppModule = _classThis;
})();
exports.AppModule = AppModule;
