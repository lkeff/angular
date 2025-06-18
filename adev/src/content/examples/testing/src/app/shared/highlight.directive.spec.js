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
const platform_browser_1 = require("@angular/platform-browser");
const highlight_directive_1 = require("./highlight.directive");
// #docregion test-component
let TestComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            template: ` <h2 highlight="yellow">Something Yellow</h2>
    <h2 highlight>The Default (Gray)</h2>
    <h2>No Highlight</h2>
    <input #box [highlight]="box.value" value="cyan" />`,
            imports: [highlight_directive_1.HighlightDirective],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TestComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "TestComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TestComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TestComponent = _classThis;
})();
// #enddocregion test-component
describe('HighlightDirective', () => {
    let fixture;
    let des; // the three elements w/ the directive
    let bareH2; // the <h2> w/o the directive
    // #docregion selected-tests
    beforeEach(() => {
        fixture = testing_1.TestBed.configureTestingModule({
            imports: [highlight_directive_1.HighlightDirective, TestComponent],
        }).createComponent(TestComponent);
        fixture.detectChanges(); // initial binding
        // all elements with an attached HighlightDirective
        des = fixture.debugElement.queryAll(platform_browser_1.By.directive(highlight_directive_1.HighlightDirective));
        // the h2 without the HighlightDirective
        bareH2 = fixture.debugElement.query(platform_browser_1.By.css('h2:not([highlight])'));
    });
    // color tests
    it('should have three highlighted elements', () => {
        expect(des.length).toBe(3);
    });
    it('should color 1st <h2> background "yellow"', () => {
        const bgColor = des[0].nativeElement.style.backgroundColor;
        expect(bgColor).toBe('yellow');
    });
    it('should color 2nd <h2> background w/ default color', () => {
        const dir = des[1].injector.get(highlight_directive_1.HighlightDirective);
        const bgColor = des[1].nativeElement.style.backgroundColor;
        expect(bgColor).toBe(dir.defaultColor);
    });
    it('should bind <input> background to value color', () => {
        // easier to work with nativeElement
        const input = des[2].nativeElement;
        expect(input.style.backgroundColor).withContext('initial backgroundColor').toBe('cyan');
        input.value = 'green';
        // Dispatch a DOM event so that Angular responds to the input value change.
        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(input.style.backgroundColor).withContext('changed backgroundColor').toBe('green');
    });
    it('bare <h2> should not have a customProperty', () => {
        expect(bareH2.properties['customProperty']).toBeUndefined();
    });
    // #enddocregion selected-tests
    // Removed on 12/02/2016 when ceased public discussion of the `Renderer`. Revive in future?
    // // customProperty tests
    // it('all highlighted elements should have a true customProperty', () => {
    //   const allTrue = des.map(de => !!de.properties['customProperty']).every(v => v === true);
    //   expect(allTrue).toBe(true);
    // });
    // injected directive
    // attached HighlightDirective can be injected
    it('can inject `HighlightDirective` in 1st <h2>', () => {
        const dir = des[0].injector.get(highlight_directive_1.HighlightDirective);
        expect(dir).toBeTruthy();
    });
    it('cannot inject `HighlightDirective` in 3rd <h2>', () => {
        const dir = bareH2.injector.get(highlight_directive_1.HighlightDirective, null);
        expect(dir).toBe(null);
    });
    // DebugElement.providerTokens
    // attached HighlightDirective should be listed in the providerTokens
    it('should have `HighlightDirective` in 1st <h2> providerTokens', () => {
        expect(des[0].providerTokens).toContain(highlight_directive_1.HighlightDirective);
    });
    it('should not have `HighlightDirective` in 3rd <h2> providerTokens', () => {
        expect(bareH2.providerTokens).not.toContain(highlight_directive_1.HighlightDirective);
    });
});
