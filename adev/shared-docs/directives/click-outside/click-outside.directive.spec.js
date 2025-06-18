"use strict";
/*!
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
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const testing_2 = require("@angular/router/testing");
const click_outside_directive_1 = require("./click-outside.directive");
const platform_browser_1 = require("@angular/platform-browser");
describe('ClickOutside', () => {
    let component;
    let fixture;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [ExampleComponent, testing_2.RouterTestingModule],
        });
        fixture = testing_1.TestBed.createComponent(ExampleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should docsClickOutside be emitted when user click outside `content` element', () => {
        const clickedOutsideSpy = spyOn(component, 'clickedOutside');
        const button = fixture.debugElement.query(platform_browser_1.By.css('button[id="exampleButton"]'));
        button.nativeElement.click();
        expect(clickedOutsideSpy).toHaveBeenCalledTimes(1);
    });
    it('should not docsClickOutside be emitted when user click inside `content` element', () => {
        const clickedOutsideSpy = spyOn(component, 'clickedOutside');
        const content = fixture.debugElement.query(platform_browser_1.By.css('div[id="content"]'));
        content.nativeElement.click();
        expect(clickedOutsideSpy).not.toHaveBeenCalled();
    });
    it('should not docsClickOutside be emitted when user click inside `content` element', () => {
        const clickedOutsideSpy = spyOn(component, 'clickedOutside');
        const button = fixture.debugElement.query(platform_browser_1.By.css('button[id="ignoreThisButton"]'));
        button.nativeElement.click();
        expect(clickedOutsideSpy).not.toHaveBeenCalled();
    });
});
let ExampleComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            template: `
    <div class="container">
      <button type="button" id="exampleButton">Click me</button>
      <button type="button" id="ignoreThisButton">Click me</button>
      <div
        id="content"
        (docsClickOutside)="clickedOutside()"
        [docsClickOutsideIgnore]="docsClickOutsideIgnore"
      >
        Content
      </div>
    </div>
  `,
            imports: [click_outside_directive_1.ClickOutside],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ExampleComponent = _classThis = class {
        constructor() {
            this.docsClickOutsideIgnore = ['ignoreThisButton'];
        }
        clickedOutside() { }
    };
    __setFunctionName(_classThis, "ExampleComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ExampleComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ExampleComponent = _classThis;
})();
