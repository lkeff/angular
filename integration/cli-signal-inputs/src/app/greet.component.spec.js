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
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const greet_component_1 = require("./greet.component");
describe('greet component', () => {
    it('should allow binding to an input', () => {
        const fixture = testing_1.TestBed.createComponent(TestCmp);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('Initial - initial-unset');
        fixture.componentInstance.firstName = 'John';
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('John - initial-unset');
    });
    it('should emit an event for the click output', () => {
        const fixture = testing_1.TestBed.createComponent(TestCmp);
        fixture.detectChanges();
        fixture.nativeElement.querySelector('button').dispatchEvent(new MouseEvent('click'));
        fixture.detectChanges();
        expect(fixture.componentInstance.clickCount).toBe(1);
        expect(fixture.componentInstance.clickCount2).toBe(1);
    });
});
let TestCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            standalone: true,
            template: `
    <greet [firstName]="firstName" (clickFromInside)="clickCount = clickCount + 1"
           (clickFromInside2)="clickCount2 = clickCount2 + 1"/>
  `,
            imports: [greet_component_1.GreetComponent],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TestCmp = _classThis = class {
        constructor() {
            this.clickCount = 0;
            this.clickCount2 = 0;
            this.firstName = 'Initial';
        }
    };
    __setFunctionName(_classThis, "TestCmp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TestCmp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TestCmp = _classThis;
})();
