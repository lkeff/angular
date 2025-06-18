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
exports.InputOutputComponent = void 0;
const core_1 = require("@angular/core");
let InputOutputComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-input-output',
            template: `
  <p [style.text-decoration]="lineThrough">Item: {{item}}</p>
  <button type="button" (click)="delete()">Delete item with an Output!</button>
  `,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _item_decorators;
    let _item_initializers = [];
    let _item_extraInitializers = [];
    let _deleteRequest_decorators;
    let _deleteRequest_initializers = [];
    let _deleteRequest_extraInitializers = [];
    var InputOutputComponent = _classThis = class {
        constructor() {
            this.item = __runInitializers(this, _item_initializers, '');
            this.deleteRequest = (__runInitializers(this, _item_extraInitializers), __runInitializers(this, _deleteRequest_initializers, new core_1.EventEmitter()));
            this.lineThrough = (__runInitializers(this, _deleteRequest_extraInitializers), '');
        }
        delete() {
            console.warn('Child says: emitting item deleteRequest with', this.item);
            this.deleteRequest.emit(this.item);
            this.lineThrough = this.lineThrough ? '' : 'line-through';
        }
    };
    __setFunctionName(_classThis, "InputOutputComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _item_decorators = [(0, core_1.Input)()];
        _deleteRequest_decorators = [(0, core_1.Output)()];
        __esDecorate(null, null, _item_decorators, { kind: "field", name: "item", static: false, private: false, access: { has: obj => "item" in obj, get: obj => obj.item, set: (obj, value) => { obj.item = value; } }, metadata: _metadata }, _item_initializers, _item_extraInitializers);
        __esDecorate(null, null, _deleteRequest_decorators, { kind: "field", name: "deleteRequest", static: false, private: false, access: { has: obj => "deleteRequest" in obj, get: obj => obj.deleteRequest, set: (obj, value) => { obj.deleteRequest = value; } }, metadata: _metadata }, _deleteRequest_initializers, _deleteRequest_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        InputOutputComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return InputOutputComponent = _classThis;
})();
exports.InputOutputComponent = InputOutputComponent;
