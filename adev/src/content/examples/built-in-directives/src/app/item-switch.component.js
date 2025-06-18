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
exports.ItemSwitchComponents = exports.UnknownItemComponent = exports.LostItemComponent = exports.DeviceItemComponent = exports.BestItemComponent = exports.StoutItemComponent = void 0;
const core_1 = require("@angular/core");
let StoutItemComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-stout-item',
            template: "I'm a little {{item.name}}, short and stout!",
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _item_decorators;
    let _item_initializers = [];
    let _item_extraInitializers = [];
    var StoutItemComponent = _classThis = class {
        constructor() {
            this.item = __runInitializers(this, _item_initializers, void 0);
            __runInitializers(this, _item_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "StoutItemComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _item_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _item_decorators, { kind: "field", name: "item", static: false, private: false, access: { has: obj => "item" in obj, get: obj => obj.item, set: (obj, value) => { obj.item = value; } }, metadata: _metadata }, _item_initializers, _item_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StoutItemComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StoutItemComponent = _classThis;
})();
exports.StoutItemComponent = StoutItemComponent;
// #enddocregion input
let BestItemComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-best-item',
            template: 'This is the brightest {{item.name}} in town.',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _item_decorators;
    let _item_initializers = [];
    let _item_extraInitializers = [];
    var BestItemComponent = _classThis = class {
        constructor() {
            this.item = __runInitializers(this, _item_initializers, void 0);
            __runInitializers(this, _item_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "BestItemComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _item_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _item_decorators, { kind: "field", name: "item", static: false, private: false, access: { has: obj => "item" in obj, get: obj => obj.item, set: (obj, value) => { obj.item = value; } }, metadata: _metadata }, _item_initializers, _item_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BestItemComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BestItemComponent = _classThis;
})();
exports.BestItemComponent = BestItemComponent;
let DeviceItemComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-device-item',
            template: 'Which is the slimmest {{item.name}}?',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _item_decorators;
    let _item_initializers = [];
    let _item_extraInitializers = [];
    var DeviceItemComponent = _classThis = class {
        constructor() {
            this.item = __runInitializers(this, _item_initializers, void 0);
            __runInitializers(this, _item_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "DeviceItemComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _item_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _item_decorators, { kind: "field", name: "item", static: false, private: false, access: { has: obj => "item" in obj, get: obj => obj.item, set: (obj, value) => { obj.item = value; } }, metadata: _metadata }, _item_initializers, _item_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DeviceItemComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DeviceItemComponent = _classThis;
})();
exports.DeviceItemComponent = DeviceItemComponent;
let LostItemComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-lost-item',
            template: 'Has anyone seen my {{item.name}}?',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _item_decorators;
    let _item_initializers = [];
    let _item_extraInitializers = [];
    var LostItemComponent = _classThis = class {
        constructor() {
            this.item = __runInitializers(this, _item_initializers, void 0);
            __runInitializers(this, _item_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "LostItemComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _item_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _item_decorators, { kind: "field", name: "item", static: false, private: false, access: { has: obj => "item" in obj, get: obj => obj.item, set: (obj, value) => { obj.item = value; } }, metadata: _metadata }, _item_initializers, _item_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LostItemComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LostItemComponent = _classThis;
})();
exports.LostItemComponent = LostItemComponent;
let UnknownItemComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-unknown-item',
            template: '{{message}}',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _item_decorators;
    let _item_initializers = [];
    let _item_extraInitializers = [];
    var UnknownItemComponent = _classThis = class {
        get message() {
            return this.item && this.item.name
                ? `${this.item.name} is strange and mysterious.`
                : 'A mystery wrapped in a fishbowl.';
        }
        constructor() {
            this.item = __runInitializers(this, _item_initializers, void 0);
            __runInitializers(this, _item_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "UnknownItemComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _item_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _item_decorators, { kind: "field", name: "item", static: false, private: false, access: { has: obj => "item" in obj, get: obj => obj.item, set: (obj, value) => { obj.item = value; } }, metadata: _metadata }, _item_initializers, _item_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UnknownItemComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UnknownItemComponent = _classThis;
})();
exports.UnknownItemComponent = UnknownItemComponent;
exports.ItemSwitchComponents = [
    StoutItemComponent,
    BestItemComponent,
    DeviceItemComponent,
    LostItemComponent,
    UnknownItemComponent,
];
