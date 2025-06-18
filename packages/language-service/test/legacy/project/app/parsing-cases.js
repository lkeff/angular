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
exports.TemplateReference = exports.TestComponent = exports.TestPipe = exports.EventSelectorDirective = exports.CompoundCustomButtonDirective = exports.WithContextDirective = exports.CounterDirective = exports.HintModel = exports.NumberModel = exports.StringModel = void 0;
const core_1 = require("@angular/core");
let StringModel = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[string-model]',
            exportAs: 'stringModel',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _model_decorators;
    let _model_initializers = [];
    let _model_extraInitializers = [];
    let _modelChange_decorators;
    let _modelChange_initializers = [];
    let _modelChange_extraInitializers = [];
    var StringModel = _classThis = class {
        constructor() {
            this.model = __runInitializers(this, _model_initializers, 'model');
            this.modelChange = (__runInitializers(this, _model_extraInitializers), __runInitializers(this, _modelChange_initializers, new core_1.EventEmitter()));
            __runInitializers(this, _modelChange_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "StringModel");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _model_decorators = [(0, core_1.Input)()];
        _modelChange_decorators = [(0, core_1.Output)()];
        __esDecorate(null, null, _model_decorators, { kind: "field", name: "model", static: false, private: false, access: { has: obj => "model" in obj, get: obj => obj.model, set: (obj, value) => { obj.model = value; } }, metadata: _metadata }, _model_initializers, _model_extraInitializers);
        __esDecorate(null, null, _modelChange_decorators, { kind: "field", name: "modelChange", static: false, private: false, access: { has: obj => "modelChange" in obj, get: obj => obj.modelChange, set: (obj, value) => { obj.modelChange = value; } }, metadata: _metadata }, _modelChange_initializers, _modelChange_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StringModel = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StringModel = _classThis;
})();
exports.StringModel = StringModel;
let NumberModel = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[number-model]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _model_decorators;
    let _model_initializers = [];
    let _model_extraInitializers = [];
    let _modelChange_decorators;
    let _modelChange_initializers = [];
    let _modelChange_extraInitializers = [];
    var NumberModel = _classThis = class {
        constructor() {
            this.model = __runInitializers(this, _model_initializers, 0);
            this.modelChange = (__runInitializers(this, _model_extraInitializers), __runInitializers(this, _modelChange_initializers, new core_1.EventEmitter()));
            __runInitializers(this, _modelChange_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "NumberModel");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _model_decorators = [(0, core_1.Input)('inputAlias')];
        _modelChange_decorators = [(0, core_1.Output)('outputAlias')];
        __esDecorate(null, null, _model_decorators, { kind: "field", name: "model", static: false, private: false, access: { has: obj => "model" in obj, get: obj => obj.model, set: (obj, value) => { obj.model = value; } }, metadata: _metadata }, _model_initializers, _model_extraInitializers);
        __esDecorate(null, null, _modelChange_decorators, { kind: "field", name: "modelChange", static: false, private: false, access: { has: obj => "modelChange" in obj, get: obj => obj.modelChange, set: (obj, value) => { obj.modelChange = value; } }, metadata: _metadata }, _modelChange_initializers, _modelChange_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NumberModel = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NumberModel = _classThis;
})();
exports.NumberModel = NumberModel;
let HintModel = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[hint-model]',
            inputs: ['hint'],
            outputs: ['hintChange'],
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var HintModel = _classThis = class {
        constructor() {
            this.hint = 'hint';
            this.hintChange = new core_1.EventEmitter();
        }
    };
    __setFunctionName(_classThis, "HintModel");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HintModel = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HintModel = _classThis;
})();
exports.HintModel = HintModel;
class CounterDirectiveContext {
    constructor($implicit) {
        this.$implicit = $implicit;
    }
}
let CounterDirective = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[counterOf]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _counter_decorators;
    let _counter_initializers = [];
    let _counter_extraInitializers = [];
    var CounterDirective = _classThis = class {
        // Object does not have an "$implicit" property.
        constructor(container, template) {
            this.container = container;
            this.template = template;
            this.counter = __runInitializers(this, _counter_initializers, 0);
            __runInitializers(this, _counter_extraInitializers);
            this.container = container;
            this.template = template;
        }
        ngOnChanges(_changes) {
            this.container.clear();
            for (let i = 0; i < this.counter; ++i) {
                this.container.createEmbeddedView(this.template, new CounterDirectiveContext(i + 1));
            }
        }
    };
    __setFunctionName(_classThis, "CounterDirective");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _counter_decorators = [(0, core_1.Input)('counterOf')];
        __esDecorate(null, null, _counter_decorators, { kind: "field", name: "counter", static: false, private: false, access: { has: obj => "counter" in obj, get: obj => obj.counter, set: (obj, value) => { obj.counter = value; } }, metadata: _metadata }, _counter_initializers, _counter_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CounterDirective = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CounterDirective = _classThis;
})();
exports.CounterDirective = CounterDirective;
let WithContextDirective = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[withContext]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var WithContextDirective = _classThis = class {
        constructor(_template) { }
        static ngTemplateContextGuard(dir, ctx) {
            return true;
        }
    };
    __setFunctionName(_classThis, "WithContextDirective");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        WithContextDirective = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return WithContextDirective = _classThis;
})();
exports.WithContextDirective = WithContextDirective;
let CompoundCustomButtonDirective = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: 'button[custom-button][compound]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _config_decorators;
    let _config_initializers = [];
    let _config_extraInitializers = [];
    var CompoundCustomButtonDirective = _classThis = class {
        constructor() {
            this.config = __runInitializers(this, _config_initializers, void 0);
            __runInitializers(this, _config_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "CompoundCustomButtonDirective");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _config_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _config_decorators, { kind: "field", name: "config", static: false, private: false, access: { has: obj => "config" in obj, get: obj => obj.config, set: (obj, value) => { obj.config = value; } }, metadata: _metadata }, _config_initializers, _config_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CompoundCustomButtonDirective = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CompoundCustomButtonDirective = _classThis;
})();
exports.CompoundCustomButtonDirective = CompoundCustomButtonDirective;
let EventSelectorDirective = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[eventSelector]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _eventSelector_decorators;
    let _eventSelector_initializers = [];
    let _eventSelector_extraInitializers = [];
    var EventSelectorDirective = _classThis = class {
        constructor() {
            this.eventSelector = __runInitializers(this, _eventSelector_initializers, new core_1.EventEmitter());
            __runInitializers(this, _eventSelector_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "EventSelectorDirective");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _eventSelector_decorators = [(0, core_1.Output)()];
        __esDecorate(null, null, _eventSelector_decorators, { kind: "field", name: "eventSelector", static: false, private: false, access: { has: obj => "eventSelector" in obj, get: obj => obj.eventSelector, set: (obj, value) => { obj.eventSelector = value; } }, metadata: _metadata }, _eventSelector_initializers, _eventSelector_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        EventSelectorDirective = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return EventSelectorDirective = _classThis;
})();
exports.EventSelectorDirective = EventSelectorDirective;
let TestPipe = (() => {
    let _classDecorators = [(0, core_1.Pipe)({
            name: 'prefixPipe',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TestPipe = _classThis = class {
        transform(value, prefix) {
            if (typeof value === 'string') {
                return `${prefix} ${value}`;
            }
            return parseInt(`${prefix}${value}`, 10 /* radix */);
        }
    };
    __setFunctionName(_classThis, "TestPipe");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TestPipe = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TestPipe = _classThis;
})();
exports.TestPipe = TestPipe;
/**
 * This Component provides the `test-comp` selector.
 */
/*BeginTestComponent*/ let TestComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'test-comp',
            template: '<div>Testing: {{name}}</div>',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    let _testEvent_decorators;
    let _testEvent_initializers = [];
    let _testEvent_extraInitializers = [];
    var TestComponent = _classThis = class {
        constructor() {
            this.name = __runInitializers(this, _name_initializers, 'test');
            this.testEvent = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _testEvent_initializers, new core_1.EventEmitter()));
            __runInitializers(this, _testEvent_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "TestComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _name_decorators = [(0, core_1.Input)('tcName')];
        _testEvent_decorators = [(0, core_1.Output)('test')];
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _testEvent_decorators, { kind: "field", name: "testEvent", static: false, private: false, access: { has: obj => "testEvent" in obj, get: obj => obj.testEvent, set: (obj, value) => { obj.testEvent = value; } }, metadata: _metadata }, _testEvent_initializers, _testEvent_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TestComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TestComponent = _classThis;
})(); /*EndTestComponent*/
exports.TestComponent = TestComponent;
let TemplateReference = (() => {
    let _classDecorators = [(0, core_1.Component)({
            templateUrl: 'test.ng',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TemplateReference = _classThis = class {
        constructor() {
            /**
             * This is the title of the `TemplateReference` Component.
             */
            this.title = 'Tour of Heroes';
            this.hero = { id: 1, name: 'Windstorm' };
            this.heroP = Promise.resolve(this.hero);
            this.heroes = [this.hero];
            this.heroesP = Promise.resolve(this.heroes);
            this.tupleArray = ['test', this.hero];
            this.league = [this.heroes];
            this.heroesByName = {};
            this.primitiveIndexType = {};
            // Use to test the `index` variable conflict between the `ngFor` and component context.
            this.index = null;
            this.birthday = new Date();
            this.readonlyHeroes = this.heroes;
            this.constNames = [{ name: 'name' }];
            this.myField = 'My Field';
            this.strOrNumber = '';
        }
        myClick(event) { }
        setTitle(newTitle) {
            this.title = newTitle;
        }
    };
    __setFunctionName(_classThis, "TemplateReference");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TemplateReference = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TemplateReference = _classThis;
})();
exports.TemplateReference = TemplateReference;
