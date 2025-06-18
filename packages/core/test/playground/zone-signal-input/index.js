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
exports.MyApp = exports.Greet = void 0;
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
let Greet = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'greet',
            standalone: true,
            template: `
    {{ counter() }} -- {{label()}}

    <p>Two way: {{twoWay()}}</p>
    <button (click)="twoWayChange.emit(!twoWay())">
      Two Way output from child
    </button>
  `,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _twoWayChange_decorators;
    let _twoWayChange_initializers = [];
    let _twoWayChange_extraInitializers = [];
    let _oldInput_decorators;
    let _oldInput_initializers = [];
    let _oldInput_extraInitializers = [];
    var Greet = _classThis = class {
        works() {
            return this.gen2();
        }
        constructor() {
            this.counter = (0, core_1.input)(0);
            this.bla = (0, core_1.input)(); // TODO: should be a diagnostic. no type & no value
            this.bla2 = (0, core_1.input)();
            this.bla3 = core_1.input.required();
            this.bla4 = (0, core_1.input)(0, { alias: 'bla4Public' });
            this.gen = core_1.input.required();
            this.gen2 = core_1.input.required();
            this.label = (0, core_1.input)();
            this.twoWay = (0, core_1.input)(false);
            this.twoWayChange = __runInitializers(this, _twoWayChange_initializers, new core_1.EventEmitter());
            // Eventually in signal components, a mix not allowed. For now, this is
            // supported though.
            this.oldInput = (__runInitializers(this, _twoWayChange_extraInitializers), __runInitializers(this, _oldInput_initializers, void 0));
            __runInitializers(this, _oldInput_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Greet");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _twoWayChange_decorators = [(0, core_1.Output)()];
        _oldInput_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _twoWayChange_decorators, { kind: "field", name: "twoWayChange", static: false, private: false, access: { has: obj => "twoWayChange" in obj, get: obj => obj.twoWayChange, set: (obj, value) => { obj.twoWayChange = value; } }, metadata: _metadata }, _twoWayChange_initializers, _twoWayChange_extraInitializers);
        __esDecorate(null, null, _oldInput_decorators, { kind: "field", name: "oldInput", static: false, private: false, access: { has: obj => "oldInput" in obj, get: obj => obj.oldInput, set: (obj, value) => { obj.oldInput = value; } }, metadata: _metadata }, _oldInput_initializers, _oldInput_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Greet = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Greet = _classThis;
})();
exports.Greet = Greet;
let MyApp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            standalone: true,
            selector: 'my-app',
            template: `
    Hello <greet [counter]="3" [bla4Public]="10" #ok
      [bla3]="someStringVar" gen='this is required' [gen2]="{yes: true}"
      label="Hello {{name()}}"
      [(twoWay)]="twoWay"
    />

    <p>Two way outside: {{twoWay}}</p>

    <button (click)="ok.works().yes">Click</button>
    <button (click)="updateName()">Change name</button>
    <button (click)="twoWay = !twoWay">Change Two way (outside)</button>

  `,
            imports: [Greet],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MyApp = _classThis = class {
        constructor() {
            this.name = (0, core_1.signal)('Angular');
            this.someVar = -10;
            this.someStringVar = 'works';
            this.twoWay = false;
        }
        updateName() {
            this.name.update((n) => `${n}-`);
        }
        onClickFromChild() {
            console.info('Click from child');
        }
    };
    __setFunctionName(_classThis, "MyApp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MyApp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MyApp = _classThis;
})();
exports.MyApp = MyApp;
(0, platform_browser_1.bootstrapApplication)(MyApp).catch((e) => console.error(e));
