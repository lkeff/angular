"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PopupComponent = void 0;
// #docregion
const core_1 = require("@angular/core");
const animations_1 = require("@angular/animations");
let PopupComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'my-popup',
            template: `
    <span>Popup: {{ message }}</span>
    <button type="button" (click)="closed.next()">&#x2716;</button>
  `,
            animations: [
                (0, animations_1.trigger)('state', [
                    (0, animations_1.state)('opened', (0, animations_1.style)({ transform: 'translateY(0%)' })),
                    (0, animations_1.state)('void, closed', (0, animations_1.style)({ transform: 'translateY(100%)', opacity: 0 })),
                    (0, animations_1.transition)('* => *', (0, animations_1.animate)('100ms ease-in')),
                ]),
            ],
            styles: [
                `
      :host {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: #009cff;
        height: 48px;
        padding: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid black;
        font-size: 24px;
      }

      button {
        border-radius: 50%;
      }
    `,
            ],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _state_decorators;
    let _state_initializers = [];
    let _state_extraInitializers = [];
    let _get_message_decorators;
    let _closed_decorators;
    let _closed_initializers = [];
    let _closed_extraInitializers = [];
    var PopupComponent = _classThis = class {
        get message() {
            return this._message;
        }
        set message(message) {
            this._message = message;
            this.state = 'opened';
        }
        constructor() {
            this.state = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _state_initializers, 'closed'));
            this._message = (__runInitializers(this, _state_extraInitializers), '');
            this.closed = __runInitializers(this, _closed_initializers, new core_1.EventEmitter());
            __runInitializers(this, _closed_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "PopupComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _state_decorators = [(0, core_1.HostBinding)('@state')];
        _get_message_decorators = [(0, core_1.Input)()];
        _closed_decorators = [(0, core_1.Output)()];
        __esDecorate(_classThis, null, _get_message_decorators, { kind: "getter", name: "message", static: false, private: false, access: { has: obj => "message" in obj, get: obj => obj.message }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _state_decorators, { kind: "field", name: "state", static: false, private: false, access: { has: obj => "state" in obj, get: obj => obj.state, set: (obj, value) => { obj.state = value; } }, metadata: _metadata }, _state_initializers, _state_extraInitializers);
        __esDecorate(null, null, _closed_decorators, { kind: "field", name: "closed", static: false, private: false, access: { has: obj => "closed" in obj, get: obj => obj.closed, set: (obj, value) => { obj.closed = value; } }, metadata: _metadata }, _closed_initializers, _closed_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PopupComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PopupComponent = _classThis;
})();
exports.PopupComponent = PopupComponent;
