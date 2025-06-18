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
exports.StatusSliderComponent = void 0;
const core_1 = require("@angular/core");
const animations_1 = require("@angular/animations");
let StatusSliderComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-status-slider',
            templateUrl: 'status-slider.component.html',
            styleUrls: ['status-slider.component.css'],
            animations: [
                (0, animations_1.trigger)('slideStatus', [
                    (0, animations_1.state)('inactive', (0, animations_1.style)({ backgroundColor: 'blue' })),
                    (0, animations_1.state)('active', (0, animations_1.style)({ backgroundColor: '#754600' })),
                    // #docregion keyframesWithOffsets
                    (0, animations_1.transition)('* => active', [
                        (0, animations_1.animate)('2s', (0, animations_1.keyframes)([
                            (0, animations_1.style)({ backgroundColor: 'blue', offset: 0 }),
                            (0, animations_1.style)({ backgroundColor: 'red', offset: 0.8 }),
                            (0, animations_1.style)({ backgroundColor: '#754600', offset: 1.0 }),
                        ])),
                    ]),
                    (0, animations_1.transition)('* => inactive', [
                        (0, animations_1.animate)('2s', (0, animations_1.keyframes)([
                            (0, animations_1.style)({ backgroundColor: '#754600', offset: 0 }),
                            (0, animations_1.style)({ backgroundColor: 'red', offset: 0.2 }),
                            (0, animations_1.style)({ backgroundColor: 'blue', offset: 1.0 }),
                        ])),
                    ]),
                    // #enddocregion keyframesWithOffsets
                    // #docregion keyframes
                    (0, animations_1.transition)('* => active', [
                        (0, animations_1.animate)('2s', (0, animations_1.keyframes)([
                            (0, animations_1.style)({ backgroundColor: 'blue' }),
                            (0, animations_1.style)({ backgroundColor: 'red' }),
                            (0, animations_1.style)({ backgroundColor: 'orange' }),
                        ])),
                        // #enddocregion keyframes
                    ]),
                ]),
            ],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var StatusSliderComponent = _classThis = class {
        constructor() {
            this.status = 'inactive';
        }
        toggle() {
            if (this.status === 'active') {
                this.status = 'inactive';
            }
            else {
                this.status = 'active';
            }
        }
    };
    __setFunctionName(_classThis, "StatusSliderComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StatusSliderComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StatusSliderComponent = _classThis;
})();
exports.StatusSliderComponent = StatusSliderComponent;
