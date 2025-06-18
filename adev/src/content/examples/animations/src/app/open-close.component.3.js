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
exports.OpenCloseBooleanComponent = void 0;
// #docplaster
// #docregion reusable
const core_1 = require("@angular/core");
const animations_1 = require("@angular/animations");
const animations_2 = require("./animations");
let OpenCloseBooleanComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-open-close-reusable',
            animations: [
                (0, animations_1.trigger)('openClose', [
                    (0, animations_1.transition)('open => closed', [
                        (0, animations_1.useAnimation)(animations_2.transitionAnimation, {
                            params: {
                                height: 0,
                                opacity: 1,
                                backgroundColor: 'red',
                                time: '1s',
                            },
                        }),
                    ]),
                ]),
            ],
            templateUrl: 'open-close.component.html',
            styleUrls: ['open-close.component.css'],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _logging_decorators;
    let _logging_initializers = [];
    let _logging_extraInitializers = [];
    var OpenCloseBooleanComponent = _classThis = class {
        toggle() {
            this.isOpen = !this.isOpen;
        }
        onAnimationEvent(event) {
            if (!this.logging) {
                return;
            }
        }
        constructor() {
            this.isOpen = false;
            this.logging = __runInitializers(this, _logging_initializers, false);
            __runInitializers(this, _logging_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "OpenCloseBooleanComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _logging_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _logging_decorators, { kind: "field", name: "logging", static: false, private: false, access: { has: obj => "logging" in obj, get: obj => obj.logging, set: (obj, value) => { obj.logging = value; } }, metadata: _metadata }, _logging_initializers, _logging_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OpenCloseBooleanComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OpenCloseBooleanComponent = _classThis;
})();
exports.OpenCloseBooleanComponent = OpenCloseBooleanComponent;
