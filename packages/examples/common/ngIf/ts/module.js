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
exports.AppModule = exports.AppComponent = exports.NgIfAs = exports.NgIfThenElse = exports.NgIfElse = exports.NgIfSimple = void 0;
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const rxjs_1 = require("rxjs");
// #docregion NgIfSimple
let NgIfSimple = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-if-simple',
            template: `
    <button (click)="show = !show">{{ show ? 'hide' : 'show' }}</button>
    show = {{ show }}
    <br />
    <div *ngIf="show">Text to show</div>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NgIfSimple = _classThis = class {
        constructor() {
            this.show = true;
        }
    };
    __setFunctionName(_classThis, "NgIfSimple");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NgIfSimple = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NgIfSimple = _classThis;
})();
exports.NgIfSimple = NgIfSimple;
// #enddocregion
// #docregion NgIfElse
let NgIfElse = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-if-else',
            template: `
    <button (click)="show = !show">{{ show ? 'hide' : 'show' }}</button>
    show = {{ show }}
    <br />
    <div *ngIf="show; else elseBlock">Text to show</div>
    <ng-template #elseBlock>Alternate text while primary text is hidden</ng-template>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NgIfElse = _classThis = class {
        constructor() {
            this.show = true;
        }
    };
    __setFunctionName(_classThis, "NgIfElse");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NgIfElse = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NgIfElse = _classThis;
})();
exports.NgIfElse = NgIfElse;
// #enddocregion
// #docregion NgIfThenElse
let NgIfThenElse = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-if-then-else',
            template: `
    <button (click)="show = !show">{{ show ? 'hide' : 'show' }}</button>
    <button (click)="switchPrimary()">Switch Primary</button>
    show = {{ show }}
    <br />
    <div *ngIf="show; then thenBlock; else elseBlock">this is ignored</div>
    <ng-template #primaryBlock>Primary text to show</ng-template>
    <ng-template #secondaryBlock>Secondary text to show</ng-template>
    <ng-template #elseBlock>Alternate text while primary text is hidden</ng-template>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _primaryBlock_decorators;
    let _primaryBlock_initializers = [];
    let _primaryBlock_extraInitializers = [];
    let _secondaryBlock_decorators;
    let _secondaryBlock_initializers = [];
    let _secondaryBlock_extraInitializers = [];
    var NgIfThenElse = _classThis = class {
        switchPrimary() {
            this.thenBlock = this.thenBlock === this.primaryBlock ? this.secondaryBlock : this.primaryBlock;
        }
        ngOnInit() {
            this.thenBlock = this.primaryBlock;
        }
        constructor() {
            this.thenBlock = null;
            this.show = true;
            this.primaryBlock = __runInitializers(this, _primaryBlock_initializers, null);
            this.secondaryBlock = (__runInitializers(this, _primaryBlock_extraInitializers), __runInitializers(this, _secondaryBlock_initializers, null));
            __runInitializers(this, _secondaryBlock_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "NgIfThenElse");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _primaryBlock_decorators = [(0, core_1.ViewChild)('primaryBlock', { static: true })];
        _secondaryBlock_decorators = [(0, core_1.ViewChild)('secondaryBlock', { static: true })];
        __esDecorate(null, null, _primaryBlock_decorators, { kind: "field", name: "primaryBlock", static: false, private: false, access: { has: obj => "primaryBlock" in obj, get: obj => obj.primaryBlock, set: (obj, value) => { obj.primaryBlock = value; } }, metadata: _metadata }, _primaryBlock_initializers, _primaryBlock_extraInitializers);
        __esDecorate(null, null, _secondaryBlock_decorators, { kind: "field", name: "secondaryBlock", static: false, private: false, access: { has: obj => "secondaryBlock" in obj, get: obj => obj.secondaryBlock, set: (obj, value) => { obj.secondaryBlock = value; } }, metadata: _metadata }, _secondaryBlock_initializers, _secondaryBlock_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NgIfThenElse = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NgIfThenElse = _classThis;
})();
exports.NgIfThenElse = NgIfThenElse;
// #enddocregion
// #docregion NgIfAs
let NgIfAs = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-if-as',
            template: `
    <button (click)="nextUser()">Next User</button>
    <br />
    <div *ngIf="userObservable | async as user; else loading">
      Hello {{ user.last }}, {{ user.first }}!
    </div>
    <ng-template #loading let-user>Waiting... (user is {{ user | json }})</ng-template>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NgIfAs = _classThis = class {
        constructor() {
            this.userObservable = new rxjs_1.Subject();
            this.first = ['John', 'Mike', 'Mary', 'Bob'];
            this.firstIndex = 0;
            this.last = ['Smith', 'Novotny', 'Angular'];
            this.lastIndex = 0;
        }
        nextUser() {
            let first = this.first[this.firstIndex++];
            if (this.firstIndex >= this.first.length)
                this.firstIndex = 0;
            let last = this.last[this.lastIndex++];
            if (this.lastIndex >= this.last.length)
                this.lastIndex = 0;
            this.userObservable.next({ first, last });
        }
    };
    __setFunctionName(_classThis, "NgIfAs");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NgIfAs = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NgIfAs = _classThis;
})();
exports.NgIfAs = NgIfAs;
// #enddocregion
let AppComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'example-app',
            template: `
    <ng-if-simple></ng-if-simple>
    <hr />
    <ng-if-else></ng-if-else>
    <hr />
    <ng-if-then-else></ng-if-then-else>
    <hr />
    <ng-if-as></ng-if-as>
    <hr />
  `,
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
            declarations: [AppComponent, NgIfSimple, NgIfElse, NgIfThenElse, NgIfAs],
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
