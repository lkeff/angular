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
exports.demoProviders = exports.DemoComponent = exports.ShellComponent = exports.ReversePipeComponent = exports.MyIfParentComponent = exports.MyIfChildComponent = exports.NeedsContentComponent = exports.InnerCompWithExternalTemplateComponent = exports.ExternalTemplateComponent = exports.TestViewProvidersComponent = exports.TestProvidersComponent = exports.MyIfComponent = exports.IoParentComponent = exports.IoComponent = exports.ParentComponent = exports.InputValueBinderComponent = exports.InputValueBinderDirective = exports.InputComponent = exports.Child3Component = exports.Child2Component = exports.Child1Component = exports.LightswitchComponent = exports.BankAccountParentComponent = exports.BankAccountComponent = exports.ReversePipe = exports.MasterService = exports.ValueService = void 0;
/* eslint-disable @angular-eslint/directive-selector, guard-for-in, @angular-eslint/no-input-rename
 */
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const shared_1 = require("../shared/shared");
////////// Services ///////////////
let ValueService = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ValueService = _classThis = class {
        constructor() {
            this.value = 'real value';
        }
        getValue() {
            return this.value;
        }
        setValue(value) {
            this.value = value;
        }
        getObservableValue() {
            return (0, rxjs_1.of)('observable value');
        }
        getPromiseValue() {
            return Promise.resolve('promise value');
        }
        getObservableDelayValue() {
            return (0, rxjs_1.of)('observable delay value').pipe((0, operators_1.delay)(10));
        }
    };
    __setFunctionName(_classThis, "ValueService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ValueService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ValueService = _classThis;
})();
exports.ValueService = ValueService;
// #docregion MasterService
let MasterService = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MasterService = _classThis = class {
        constructor() {
            this.valueService = (0, core_1.inject)(ValueService);
        }
        getValue() {
            return this.valueService.getValue();
        }
    };
    __setFunctionName(_classThis, "MasterService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MasterService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MasterService = _classThis;
})();
exports.MasterService = MasterService;
// #enddocregion MasterService
/////////// Pipe ////////////////
/*
 * Reverse the input string.
 */
let ReversePipe = (() => {
    let _classDecorators = [(0, core_1.Pipe)({ name: 'reverse' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ReversePipe = _classThis = class {
        transform(s) {
            let r = '';
            for (let i = s.length; i;) {
                r += s[--i];
            }
            return r;
        }
    };
    __setFunctionName(_classThis, "ReversePipe");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ReversePipe = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ReversePipe = _classThis;
})();
exports.ReversePipe = ReversePipe;
//////////// Components /////////////
let BankAccountComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'bank-account',
            template: ` Bank Name: {{ bank }} Account Id: {{ id }} `,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _bank_decorators;
    let _bank_initializers = [];
    let _bank_extraInitializers = [];
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    var BankAccountComponent = _classThis = class {
        constructor() {
            this.bank = __runInitializers(this, _bank_initializers, '');
            this.id = (__runInitializers(this, _bank_extraInitializers), __runInitializers(this, _id_initializers, ''));
            __runInitializers(this, _id_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "BankAccountComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _bank_decorators = [(0, core_1.Input)()];
        _id_decorators = [(0, core_1.Input)('account')];
        __esDecorate(null, null, _bank_decorators, { kind: "field", name: "bank", static: false, private: false, access: { has: obj => "bank" in obj, get: obj => obj.bank, set: (obj, value) => { obj.bank = value; } }, metadata: _metadata }, _bank_initializers, _bank_extraInitializers);
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BankAccountComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BankAccountComponent = _classThis;
})();
exports.BankAccountComponent = BankAccountComponent;
/** A component with attributes, styles, classes, and property setting */
let BankAccountParentComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'bank-account-parent',
            template: `
    <bank-account
      bank="RBC"
      account="4747"
      [style.width.px]="width"
      [style.color]="color"
      [class.closed]="isClosed"
      [class.open]="!isClosed"
    />
  `,
            imports: [BankAccountComponent],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var BankAccountParentComponent = _classThis = class {
        constructor() {
            this.width = 200;
            this.color = 'red';
            this.isClosed = true;
        }
    };
    __setFunctionName(_classThis, "BankAccountParentComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BankAccountParentComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BankAccountParentComponent = _classThis;
})();
exports.BankAccountParentComponent = BankAccountParentComponent;
// #docregion LightswitchComp
let LightswitchComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'lightswitch-comp',
            template: ` <button type="button" (click)="clicked()">Click me!</button>
    <span>{{ message }}</span>`,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var LightswitchComponent = _classThis = class {
        constructor() {
            this.isOn = false;
        }
        clicked() {
            this.isOn = !this.isOn;
        }
        get message() {
            return `The light is ${this.isOn ? 'On' : 'Off'}`;
        }
    };
    __setFunctionName(_classThis, "LightswitchComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LightswitchComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LightswitchComponent = _classThis;
})();
exports.LightswitchComponent = LightswitchComponent;
// #enddocregion LightswitchComp
let Child1Component = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'child-1',
            template: '<span>Child-1({{text}})</span>',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _text_decorators;
    let _text_initializers = [];
    let _text_extraInitializers = [];
    var Child1Component = _classThis = class {
        constructor() {
            this.text = __runInitializers(this, _text_initializers, 'Original');
            __runInitializers(this, _text_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Child1Component");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _text_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _text_decorators, { kind: "field", name: "text", static: false, private: false, access: { has: obj => "text" in obj, get: obj => obj.text, set: (obj, value) => { obj.text = value; } }, metadata: _metadata }, _text_initializers, _text_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Child1Component = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Child1Component = _classThis;
})();
exports.Child1Component = Child1Component;
let Child2Component = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'child-2',
            template: '<div>Child-2({{text}})</div>',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _text_decorators;
    let _text_initializers = [];
    let _text_extraInitializers = [];
    var Child2Component = _classThis = class {
        constructor() {
            this.text = __runInitializers(this, _text_initializers, '');
            __runInitializers(this, _text_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Child2Component");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _text_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _text_decorators, { kind: "field", name: "text", static: false, private: false, access: { has: obj => "text" in obj, get: obj => obj.text, set: (obj, value) => { obj.text = value; } }, metadata: _metadata }, _text_initializers, _text_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Child2Component = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Child2Component = _classThis;
})();
exports.Child2Component = Child2Component;
let Child3Component = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'child-3',
            template: '<div>Child-3({{text}})</div>',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _text_decorators;
    let _text_initializers = [];
    let _text_extraInitializers = [];
    var Child3Component = _classThis = class {
        constructor() {
            this.text = __runInitializers(this, _text_initializers, '');
            __runInitializers(this, _text_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Child3Component");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _text_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _text_decorators, { kind: "field", name: "text", static: false, private: false, access: { has: obj => "text" in obj, get: obj => obj.text, set: (obj, value) => { obj.text = value; } }, metadata: _metadata }, _text_initializers, _text_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Child3Component = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Child3Component = _classThis;
})();
exports.Child3Component = Child3Component;
let InputComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'input-comp',
            template: '<input [(ngModel)]="name">',
            imports: [forms_1.FormsModule],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var InputComponent = _classThis = class {
        constructor() {
            this.name = 'John';
        }
    };
    __setFunctionName(_classThis, "InputComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        InputComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return InputComponent = _classThis;
})();
exports.InputComponent = InputComponent;
/* Prefer this metadata syntax */
// @Directive({
//   selector: 'input[value]',
//   host: {
//     '[value]': 'value',
//     '(input)': 'valueChange.emit($event.target.value)'
//   },
//   inputs:  ['value'],
//   outputs: ['valueChange']
// })
// export class InputValueBinderDirective {
//   value: any;
//   valueChange: EventEmitter<any> = new EventEmitter();
// }
// As the styleguide recommends
let InputValueBinderDirective = (() => {
    let _classDecorators = [(0, core_1.Directive)({ selector: 'input[value]' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _value_decorators;
    let _value_initializers = [];
    let _value_extraInitializers = [];
    let _valueChange_decorators;
    let _valueChange_initializers = [];
    let _valueChange_extraInitializers = [];
    let _onInput_decorators;
    var InputValueBinderDirective = _classThis = class {
        onInput(value) {
            this.valueChange.emit(value);
        }
        constructor() {
            this.value = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _value_initializers, void 0));
            this.valueChange = (__runInitializers(this, _value_extraInitializers), __runInitializers(this, _valueChange_initializers, new core_1.EventEmitter()));
            __runInitializers(this, _valueChange_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "InputValueBinderDirective");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _value_decorators = [(0, core_1.HostBinding)(), (0, core_1.Input)()];
        _valueChange_decorators = [(0, core_1.Output)()];
        _onInput_decorators = [(0, core_1.HostListener)('input', ['$event.target.value'])];
        __esDecorate(_classThis, null, _onInput_decorators, { kind: "method", name: "onInput", static: false, private: false, access: { has: obj => "onInput" in obj, get: obj => obj.onInput }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
        __esDecorate(null, null, _valueChange_decorators, { kind: "field", name: "valueChange", static: false, private: false, access: { has: obj => "valueChange" in obj, get: obj => obj.valueChange, set: (obj, value) => { obj.valueChange = value; } }, metadata: _metadata }, _valueChange_initializers, _valueChange_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        InputValueBinderDirective = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return InputValueBinderDirective = _classThis;
})();
exports.InputValueBinderDirective = InputValueBinderDirective;
let InputValueBinderComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'input-value-comp',
            template: ` Name: <input [value]="name" /> {{ name }} `,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var InputValueBinderComponent = _classThis = class {
        constructor() {
            this.name = 'Sally'; // initial value
        }
    };
    __setFunctionName(_classThis, "InputValueBinderComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        InputValueBinderComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return InputValueBinderComponent = _classThis;
})();
exports.InputValueBinderComponent = InputValueBinderComponent;
let ParentComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'parent-comp',
            imports: [Child1Component],
            template: 'Parent(<child-1></child-1>)',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ParentComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "ParentComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ParentComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ParentComponent = _classThis;
})();
exports.ParentComponent = ParentComponent;
let IoComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'io-comp',
            template: '<button type="button" class="hero" (click)="click()">Original {{hero.name}}</button>',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _hero_decorators;
    let _hero_initializers = [];
    let _hero_extraInitializers = [];
    let _selected_decorators;
    let _selected_initializers = [];
    let _selected_extraInitializers = [];
    var IoComponent = _classThis = class {
        click() {
            this.selected.emit(this.hero);
        }
        constructor() {
            this.hero = __runInitializers(this, _hero_initializers, void 0);
            this.selected = (__runInitializers(this, _hero_extraInitializers), __runInitializers(this, _selected_initializers, new core_1.EventEmitter()));
            __runInitializers(this, _selected_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "IoComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _hero_decorators = [(0, core_1.Input)()];
        _selected_decorators = [(0, core_1.Output)()];
        __esDecorate(null, null, _hero_decorators, { kind: "field", name: "hero", static: false, private: false, access: { has: obj => "hero" in obj, get: obj => obj.hero, set: (obj, value) => { obj.hero = value; } }, metadata: _metadata }, _hero_initializers, _hero_extraInitializers);
        __esDecorate(null, null, _selected_decorators, { kind: "field", name: "selected", static: false, private: false, access: { has: obj => "selected" in obj, get: obj => obj.selected, set: (obj, value) => { obj.selected = value; } }, metadata: _metadata }, _selected_initializers, _selected_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        IoComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return IoComponent = _classThis;
})();
exports.IoComponent = IoComponent;
let IoParentComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'io-parent-comp',
            template: `
    @if (!selectedHero) {
      <p><i>Click to select a hero</i></p>
    }
    @if (selectedHero) {
      <p>The selected hero is {{ selectedHero.name }}</p>
    }
    @for (hero of heroes; track hero) {
      <io-comp [hero]="hero" (selected)="onSelect($event)"> </io-comp>
    }
  `,
            imports: [IoComponent, shared_1.sharedImports],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var IoParentComponent = _classThis = class {
        constructor() {
            this.heroes = [{ name: 'Bob' }, { name: 'Carol' }, { name: 'Ted' }, { name: 'Alice' }];
        }
        onSelect(hero) {
            this.selectedHero = hero;
        }
    };
    __setFunctionName(_classThis, "IoParentComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        IoParentComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return IoParentComponent = _classThis;
})();
exports.IoParentComponent = IoParentComponent;
let MyIfComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'my-if-comp',
            template: 'MyIf(@if (showMore) {<span>More</span>})',
            imports: [shared_1.sharedImports],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MyIfComponent = _classThis = class {
        constructor() {
            this.showMore = false;
        }
    };
    __setFunctionName(_classThis, "MyIfComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MyIfComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MyIfComponent = _classThis;
})();
exports.MyIfComponent = MyIfComponent;
let TestProvidersComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'my-service-comp',
            template: 'injected value: {{valueService.value}}',
            providers: [ValueService],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TestProvidersComponent = _classThis = class {
        constructor() {
            this.valueService = (0, core_1.inject)(ValueService);
        }
    };
    __setFunctionName(_classThis, "TestProvidersComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TestProvidersComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TestProvidersComponent = _classThis;
})();
exports.TestProvidersComponent = TestProvidersComponent;
let TestViewProvidersComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'my-service-comp',
            template: 'injected value: {{valueService.value}}',
            viewProviders: [ValueService],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TestViewProvidersComponent = _classThis = class {
        constructor() {
            this.valueService = (0, core_1.inject)(ValueService);
        }
    };
    __setFunctionName(_classThis, "TestViewProvidersComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TestViewProvidersComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TestViewProvidersComponent = _classThis;
})();
exports.TestViewProvidersComponent = TestViewProvidersComponent;
let ExternalTemplateComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'external-template-comp',
            templateUrl: './demo-external-template.html',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ExternalTemplateComponent = _classThis = class {
        constructor() {
            var _a, _b;
            this.service = (0, core_1.inject)(ValueService, { optional: true });
            this.serviceValue = (_b = (_a = this.service) === null || _a === void 0 ? void 0 : _a.getValue()) !== null && _b !== void 0 ? _b : '';
        }
    };
    __setFunctionName(_classThis, "ExternalTemplateComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ExternalTemplateComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ExternalTemplateComponent = _classThis;
})();
exports.ExternalTemplateComponent = ExternalTemplateComponent;
let InnerCompWithExternalTemplateComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'comp-w-ext-comp',
            imports: [ExternalTemplateComponent],
            template: `
    <h3>comp-w-ext-comp</h3>
    <external-template-comp></external-template-comp>
  `,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var InnerCompWithExternalTemplateComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "InnerCompWithExternalTemplateComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        InnerCompWithExternalTemplateComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return InnerCompWithExternalTemplateComponent = _classThis;
})();
exports.InnerCompWithExternalTemplateComponent = InnerCompWithExternalTemplateComponent;
let NeedsContentComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({ selector: 'needs-content', template: '<ng-content></ng-content>' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _children_decorators;
    let _children_initializers = [];
    let _children_extraInitializers = [];
    var NeedsContentComponent = _classThis = class {
        constructor() {
            // children with #content local variable
            this.children = __runInitializers(this, _children_initializers, void 0);
            __runInitializers(this, _children_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "NeedsContentComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _children_decorators = [(0, core_1.ContentChildren)('content')];
        __esDecorate(null, null, _children_decorators, { kind: "field", name: "children", static: false, private: false, access: { has: obj => "children" in obj, get: obj => obj.children, set: (obj, value) => { obj.children = value; } }, metadata: _metadata }, _children_initializers, _children_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NeedsContentComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NeedsContentComponent = _classThis;
})();
exports.NeedsContentComponent = NeedsContentComponent;
///////// MyIfChildComp ////////
let MyIfChildComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'my-if-child-1',
            template: ` <h4>MyIfChildComp</h4>
    <div>
      <label for="child-value"
        >Child value: <input id="child-value" [(ngModel)]="childValue" />
      </label>
    </div>
    <p><i>Change log:</i></p>
    @for (log of changeLog; track log; let i = $index) {
      <div>{{ i + 1 }} - {{ log }}</div>
    }`,
            imports: [forms_1.FormsModule, shared_1.sharedImports],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _value_decorators;
    let _value_initializers = [];
    let _value_extraInitializers = [];
    let _valueChange_decorators;
    let _valueChange_initializers = [];
    let _valueChange_extraInitializers = [];
    var MyIfChildComponent = _classThis = class {
        constructor() {
            this.value = __runInitializers(this, _value_initializers, '');
            this.valueChange = (__runInitializers(this, _value_extraInitializers), __runInitializers(this, _valueChange_initializers, new core_1.EventEmitter()));
            this.changeLog = (__runInitializers(this, _valueChange_extraInitializers), []);
            this.ngOnInitCalled = false;
            this.ngOnChangesCounter = 0;
            this.ngOnDestroyCalled = false;
        }
        get childValue() {
            return this.value;
        }
        set childValue(v) {
            if (this.value === v) {
                return;
            }
            this.value = v;
            this.valueChange.emit(v);
        }
        ngOnInit() {
            this.ngOnInitCalled = true;
            this.changeLog.push('ngOnInit called');
        }
        ngOnDestroy() {
            this.ngOnDestroyCalled = true;
            this.changeLog.push('ngOnDestroy called');
        }
        ngOnChanges(changes) {
            for (const propName in changes) {
                this.ngOnChangesCounter += 1;
                const prop = changes[propName];
                const cur = JSON.stringify(prop.currentValue);
                const prev = JSON.stringify(prop.previousValue);
                this.changeLog.push(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
            }
        }
    };
    __setFunctionName(_classThis, "MyIfChildComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _value_decorators = [(0, core_1.Input)()];
        _valueChange_decorators = [(0, core_1.Output)()];
        __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
        __esDecorate(null, null, _valueChange_decorators, { kind: "field", name: "valueChange", static: false, private: false, access: { has: obj => "valueChange" in obj, get: obj => obj.valueChange, set: (obj, value) => { obj.valueChange = value; } }, metadata: _metadata }, _valueChange_initializers, _valueChange_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MyIfChildComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MyIfChildComponent = _classThis;
})();
exports.MyIfChildComponent = MyIfChildComponent;
///////// MyIfParentComp ////////
let MyIfParentComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'my-if-parent-comp',
            template: `
    <h3>MyIfParentComp</h3>
    <label for="parent"
      >Parent value:
      <input id="parent" [(ngModel)]="parentValue" />
    </label>
    <button type="button" (click)="clicked()">{{ toggleLabel }} Child</button><br />
    @if (showChild) {
      <div style="margin: 4px; padding: 4px; background-color: aliceblue;">
        <my-if-child-1 [(value)]="parentValue"></my-if-child-1>
      </div>
    }
  `,
            imports: [forms_1.FormsModule, MyIfChildComponent, shared_1.sharedImports],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MyIfParentComponent = _classThis = class {
        constructor() {
            this.ngOnInitCalled = false;
            this.parentValue = 'Hello, World';
            this.showChild = false;
            this.toggleLabel = 'Unknown';
        }
        ngOnInit() {
            this.ngOnInitCalled = true;
            this.clicked();
        }
        clicked() {
            this.showChild = !this.showChild;
            this.toggleLabel = this.showChild ? 'Close' : 'Show';
        }
    };
    __setFunctionName(_classThis, "MyIfParentComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MyIfParentComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MyIfParentComponent = _classThis;
})();
exports.MyIfParentComponent = MyIfParentComponent;
let ReversePipeComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'reverse-pipe-comp',
            template: `
    <input [(ngModel)]="text" />
    <span>{{ text | reverse }}</span>
  `,
            imports: [ReversePipe, forms_1.FormsModule],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ReversePipeComponent = _classThis = class {
        constructor() {
            this.text = 'my dog has fleas.';
        }
    };
    __setFunctionName(_classThis, "ReversePipeComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ReversePipeComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ReversePipeComponent = _classThis;
})();
exports.ReversePipeComponent = ReversePipeComponent;
let ShellComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            imports: [NeedsContentComponent],
            template: '<div>Replace Me</div>',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ShellComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "ShellComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ShellComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ShellComponent = _classThis;
})();
exports.ShellComponent = ShellComponent;
let DemoComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'demo-comp',
            template: `
    <h1>Specs Demo</h1>
    <my-if-parent-comp></my-if-parent-comp>
    <hr>
    <h3>Input/Output Component</h3>
    <io-parent-comp></io-parent-comp>
    <hr>
    <h3>External Template Component</h3>
    <external-template-comp></external-template-comp>
    <hr>
    <h3>Component With External Template Component</h3>
    <comp-w-ext-comp></comp-w-ext-comp>
    <hr>
    <h3>Reverse Pipe</h3>
    <reverse-pipe-comp></reverse-pipe-comp>
    <hr>
    <h3>InputValueBinder Directive</h3>
    <input-value-comp></input-value-comp>
    <hr>
    <h3>Button Component</h3>
    <lightswitch-comp></lightswitch-comp>
    <hr>
    <h3>Needs Content</h3>
    <needs-content #nc>
      <child-1 #content text="My"></child-1>
      <child-2 #content text="dog"></child-2>
      <child-2 text="has"></child-2>
      <child-3 #content text="fleas"></child-3>
      <div #content>!</div>
    </needs-content>
  `,
            imports: [
                Child1Component,
                Child2Component,
                Child3Component,
                ExternalTemplateComponent,
                InnerCompWithExternalTemplateComponent,
                InputValueBinderComponent,
                IoParentComponent,
                LightswitchComponent,
                NeedsContentComponent,
                ReversePipeComponent,
                MyIfParentComponent,
            ],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DemoComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "DemoComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DemoComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DemoComponent = _classThis;
})();
exports.DemoComponent = DemoComponent;
//////// Aggregations ////////////
exports.demoProviders = [MasterService, ValueService];
