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
let ReactiveFormsComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-reactive-forms',
            template: `
    <form [formGroup]="profileForm">
      <div>
        First Name:
        <input type="text" formControlName="firstName" />
      </div>
      <div>
        Last Name:
        <input type="text" formControlName="lastName" />
      </div>

      <div>
        Subscribe:
        <input type="checkbox" formControlName="subscribed" />
      </div>

      <div>Disabled: <input formControlName="disabledInput" /></div>
      <div formArrayName="addresses">
        <div *ngFor="let item of itemControls; let i = index" [formGroupName]="i">
          <div>City: <input formControlName="city" /></div>
        </div>
      </div>
      <button (click)="addCity()">Add City</button>
    </form>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ReactiveFormsComponent = _classThis = class {
        get itemControls() {
            return this.profileForm.get('addresses').controls;
        }
        constructor(formBuilder) {
            this.formBuilder = formBuilder;
            // We use this reference in our test
            window.reactiveFormsComponent = this;
        }
        ngOnInit() {
            this.profileForm = new forms_1.FormGroup({
                firstName: new forms_1.FormControl('', forms_1.Validators.required),
                lastName: new forms_1.FormControl(''),
                addresses: new forms_1.FormArray([]),
                subscribed: new forms_1.FormControl(),
                disabledInput: new forms_1.FormControl({ value: '', disabled: true }),
            });
            this.addCity();
        }
        createItem() {
            return this.formBuilder.group({
                city: '',
            });
        }
        addCity() {
            this.addresses = this.profileForm.get('addresses');
            this.addresses.push(this.createItem());
        }
    };
    __setFunctionName(_classThis, "ReactiveFormsComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ReactiveFormsComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ReactiveFormsComponent = _classThis;
})();
let RootComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-root',
            template: `
    <app-reactive-forms></app-reactive-forms>
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
            declarations: [RootComponent, ReactiveFormsComponent],
            imports: [platform_browser_1.BrowserModule, forms_1.ReactiveFormsModule],
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
