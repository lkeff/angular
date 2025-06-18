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
exports.ExampleModule = exports.ReactiveForms = exports.ShowError = void 0;
/* tslint:disable:no-console  */
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const platform_browser_1 = require("@angular/platform-browser");
const platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
/**
 * Custom validator.
 */
function creditCardValidator(c) {
    if (c.value && /^\d{16}$/.test(c.value)) {
        return null;
    }
    else {
        return { 'invalidCreditCard': true };
    }
}
/**
 * This is a component that displays an error message.
 *
 * For instance,
 *
 * <show-error control="creditCard" [errors]="['required', 'invalidCreditCard']"></show-error>
 *
 * Will display the "is required" error if the control is empty, and "invalid credit card" if the
 * control is not empty
 * but not valid.
 *
 * In a real application, this component would receive a service that would map an error code to an
 * actual error message.
 * To make it simple, we are using a simple map here.
 */
let ShowError = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'show-error',
            inputs: ['controlPath: control', 'errorTypes: errors'],
            template: ` <span *ngIf="errorMessage !== null">{{ errorMessage }}</span> `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ShowError = _classThis = class {
        constructor(formDir) {
            this.formDir = formDir;
        }
        get errorMessage() {
            const form = this.formDir.form;
            const control = form.get(this.controlPath);
            if (control && control.touched) {
                for (let i = 0; i < this.errorTypes.length; ++i) {
                    if (control.hasError(this.errorTypes[i])) {
                        return this._errorMessage(this.errorTypes[i]);
                    }
                }
            }
            return null;
        }
        _errorMessage(code) {
            const config = {
                'required': 'is required',
                'invalidCreditCard': 'is invalid credit card number',
            };
            return config[code];
        }
    };
    __setFunctionName(_classThis, "ShowError");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ShowError = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ShowError = _classThis;
})();
exports.ShowError = ShowError;
let ReactiveForms = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'reactive-forms',
            viewProviders: [forms_1.FormBuilder],
            template: `
    <h1>Checkout Form (Reactive)</h1>

    <form (ngSubmit)="onSubmit()" [formGroup]="form" #f="ngForm">
      <p>
        <label for="firstName">First Name</label>
        <input type="text" id="firstName" formControlName="firstName" />
        <show-error control="firstName" [errors]="['required']"></show-error>
      </p>

      <p>
        <label for="middleName">Middle Name</label>
        <input type="text" id="middleName" formControlName="middleName" />
      </p>

      <p>
        <label for="lastName">Last Name</label>
        <input type="text" id="lastName" formControlName="lastName" />
        <show-error control="lastName" [errors]="['required']"></show-error>
      </p>

      <p>
        <label for="country">Country</label>
        <select id="country" formControlName="country">
          <option *ngFor="let c of countries" [value]="c">{{ c }}</option>
        </select>
      </p>

      <p>
        <label for="creditCard">Credit Card</label>
        <input type="text" id="creditCard" formControlName="creditCard" />
        <show-error control="creditCard" [errors]="['required', 'invalidCreditCard']"></show-error>
      </p>

      <p>
        <label for="amount">Amount</label>
        <input type="number" id="amount" formControlName="amount" />
        <show-error control="amount" [errors]="['required']"></show-error>
      </p>

      <p>
        <label for="email">Email</label>
        <input type="email" id="email" formControlName="email" />
        <show-error control="email" [errors]="['required']"></show-error>
      </p>

      <p>
        <label for="comments">Comments</label>
        <textarea id="comments" formControlName="comments"> </textarea>
      </p>

      <button type="submit" [disabled]="!f.form.valid">Submit</button>
    </form>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ReactiveForms = _classThis = class {
        constructor(formBuilder) {
            this.countries = ['US', 'Canada'];
            this.form = formBuilder.group({
                'firstName': ['', forms_1.Validators.required],
                'middleName': [''],
                'lastName': ['', forms_1.Validators.required],
                'country': ['Canada', forms_1.Validators.required],
                'creditCard': ['', forms_1.Validators.compose([forms_1.Validators.required, creditCardValidator])],
                'amount': [0, forms_1.Validators.required],
                'email': ['', forms_1.Validators.required],
                'comments': [''],
            });
        }
        onSubmit() {
            console.log('Submitting:');
            console.log(this.form.value);
        }
    };
    __setFunctionName(_classThis, "ReactiveForms");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ReactiveForms = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ReactiveForms = _classThis;
})();
exports.ReactiveForms = ReactiveForms;
let ExampleModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            bootstrap: [ReactiveForms],
            declarations: [ShowError, ReactiveForms],
            imports: [platform_browser_1.BrowserModule, forms_1.ReactiveFormsModule],
        })];
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
