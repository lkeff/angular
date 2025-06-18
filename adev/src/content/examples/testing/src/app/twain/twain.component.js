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
exports.TwainComponent = void 0;
// #docregion
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const shared_1 = require("../shared/shared");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const twain_service_1 = require("./twain.service");
let TwainComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'twain-quote',
            // #docregion template
            template: ` <p class="twain">
      <i>{{ quote | async }}</i>
    </p>
    <button type="button" (click)="getQuote()">Next quote</button>
    @if (errorMessage()) {
      <p class="error">{{ errorMessage() }}</p>
    }`,
            // #enddocregion template
            styles: ['.twain { font-style: italic; } .error { color: red; }'],
            imports: [common_1.AsyncPipe, shared_1.sharedImports],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TwainComponent = _classThis = class {
        constructor() {
            this.errorMessage = (0, core_1.signal)('');
            this.twainService = (0, core_1.inject)(twain_service_1.TwainService);
            this.getQuote();
        }
        // #docregion get-quote
        getQuote() {
            this.errorMessage.set('');
            this.quote = this.twainService.getQuote().pipe((0, operators_1.startWith)('...'), (0, operators_1.catchError)((err) => {
                this.errorMessage.set(err.message || err.toString());
                return (0, rxjs_1.of)('...'); // reset message to placeholder
            }));
            // #enddocregion get-quote
        }
    };
    __setFunctionName(_classThis, "TwainComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TwainComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TwainComponent = _classThis;
})();
exports.TwainComponent = TwainComponent;
