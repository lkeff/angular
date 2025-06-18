"use strict";
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
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const core_1 = require("../../../src/core");
const forms_1 = require("@angular/forms");
const platform_browser_1 = require("@angular/platform-browser");
let TemplateFormsComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-template-forms',
            template: `
    <form novalidate>
      <div ngModelGroup="profileForm">
        <div>
          First Name:
          <input name="first" ngModel required />
        </div>
        <div>
          Last Name:
          <input name="last" ngModel />
        </div>
        <div>
          Subscribe:
          <input name="subscribed" type="checkbox" ngModel />
        </div>

        <div>Disabled: <input name="foo" ngModel disabled /></div>

        <div *ngFor="let city of addresses; let i = index">
          City <input [(ngModel)]="addresses[i].city" name="name" />
        </div>

        <button (click)="addCity()">Add City</button>
      </div>
    </form>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TemplateFormsComponent = _classThis = class {
        constructor() {
            this.name = { first: 'Nancy', last: 'Drew', subscribed: true };
            this.addresses = [{ city: 'Toronto' }];
            // We use this reference in our test
            window.templateFormsComponent = this;
        }
        addCity() {
            this.addresses.push({ city: '' });
        }
    };
    __setFunctionName(_classThis, "TemplateFormsComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TemplateFormsComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TemplateFormsComponent = _classThis;
})();
let RootComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-root',
            template: `
    <app-template-forms></app-template-forms>
  `,
            standalone: false,
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
let FormsExampleModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            declarations: [RootComponent, TemplateFormsComponent],
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var FormsExampleModule = _classThis = class {
        ngDoBootstrap(app) {
            app.bootstrap(RootComponent);
        }
    };
    __setFunctionName(_classThis, "FormsExampleModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FormsExampleModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FormsExampleModule = _classThis;
})();
function bootstrapApp() {
    return (0, platform_browser_1.platformBrowser)().bootstrapModule(FormsExampleModule, { ngZone: 'noop' });
}
window.bootstrapApp = bootstrapApp;
