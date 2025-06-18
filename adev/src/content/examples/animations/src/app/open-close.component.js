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
exports.OpenCloseComponent = void 0;
// #docplaster
const core_1 = require("@angular/core");
const animations_1 = require("@angular/animations");
// #docregion component, events1
let OpenCloseComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-open-close',
            // #docregion trigger-wildcard1, trigger-transition
            animations: [
                (0, animations_1.trigger)('openClose', [
                    // #docregion state1
                    // ...
                    // #enddocregion events1
                    (0, animations_1.state)('open', (0, animations_1.style)({
                        height: '200px',
                        opacity: 1,
                        backgroundColor: 'yellow',
                    })),
                    // #enddocregion state1
                    // #docregion state2
                    (0, animations_1.state)('closed', (0, animations_1.style)({
                        height: '100px',
                        opacity: 0.8,
                        backgroundColor: 'blue',
                    })),
                    // #enddocregion state2, trigger-wildcard1
                    // #docregion transition1
                    (0, animations_1.transition)('open => closed', [(0, animations_1.animate)('1s')]),
                    // #enddocregion transition1
                    // #docregion transition2
                    (0, animations_1.transition)('closed => open', [(0, animations_1.animate)('0.5s')]),
                    // #enddocregion transition2, component
                    // #docregion trigger-wildcard1
                    (0, animations_1.transition)('* => closed', [(0, animations_1.animate)('1s')]),
                    (0, animations_1.transition)('* => open', [(0, animations_1.animate)('0.5s')]),
                    // #enddocregion trigger-wildcard1
                    // #docregion trigger-wildcard2
                    (0, animations_1.transition)('open <=> closed', [(0, animations_1.animate)('0.5s')]),
                    // #enddocregion trigger-wildcard2
                    // #docregion transition4
                    (0, animations_1.transition)('* => open', [(0, animations_1.animate)('1s', (0, animations_1.style)({ opacity: '*' }))]),
                    // #enddocregion transition4
                    (0, animations_1.transition)('* => *', [(0, animations_1.animate)('1s')]),
                    // #enddocregion trigger-transition
                    // #docregion component, trigger-wildcard1, events1
                ]),
            ],
            // #enddocregion trigger-wildcard1
            templateUrl: 'open-close.component.html',
            styleUrls: ['open-close.component.css'],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _logging_decorators;
    let _logging_initializers = [];
    let _logging_extraInitializers = [];
    var OpenCloseComponent = _classThis = class {
        constructor() {
            // #enddocregion events1, events, component
            this.logging = __runInitializers(this, _logging_initializers, false);
            // #docregion component
            this.isOpen = (__runInitializers(this, _logging_extraInitializers), true);
            // #docregion component
        }
        toggle() {
            this.isOpen = !this.isOpen;
        }
        // #enddocregion component
        // #docregion events1, events
        onAnimationEvent(event) {
            // #enddocregion events1, events
            if (!this.logging) {
                return;
            }
            // #docregion events
            // openClose is trigger name in this example
            console.warn(`Animation Trigger: ${event.triggerName}`);
            // phaseName is "start" or "done"
            console.warn(`Phase: ${event.phaseName}`);
            // in our example, totalTime is 1000 (number of milliseconds in a second)
            console.warn(`Total time: ${event.totalTime}`);
            // in our example, fromState is either "open" or "closed"
            console.warn(`From: ${event.fromState}`);
            // in our example, toState either "open" or "closed"
            console.warn(`To: ${event.toState}`);
            // the HTML element itself, the button in this case
            console.warn(`Element: ${event.element}`);
            // #docregion events1
        }
    };
    __setFunctionName(_classThis, "OpenCloseComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _logging_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _logging_decorators, { kind: "field", name: "logging", static: false, private: false, access: { has: obj => "logging" in obj, get: obj => obj.logging, set: (obj, value) => { obj.logging = value; } }, metadata: _metadata }, _logging_initializers, _logging_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OpenCloseComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OpenCloseComponent = _classThis;
})();
exports.OpenCloseComponent = OpenCloseComponent;
// #enddocregion component
