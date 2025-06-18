"use strict";
/**
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
const core_1 = require("../../src/core");
const testing_1 = require("../../testing");
describe('embedded views', () => {
    it('should correctly resolve the implicit receiver in expressions', () => {
        const items = [];
        let ChildCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'child-cmp',
                    template: 'Child',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _addItemFn_decorators;
            let _addItemFn_initializers = [];
            let _addItemFn_extraInitializers = [];
            var ChildCmp = _classThis = class {
                constructor() {
                    this.addItemFn = __runInitializers(this, _addItemFn_initializers, void 0);
                    __runInitializers(this, _addItemFn_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "ChildCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _addItemFn_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _addItemFn_decorators, { kind: "field", name: "addItemFn", static: false, private: false, access: { has: obj => "addItemFn" in obj, get: obj => obj.addItemFn, set: (obj, value) => { obj.addItemFn = value; } }, metadata: _metadata }, _addItemFn_initializers, _addItemFn_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ChildCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ChildCmp = _classThis;
        })();
        let TestCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<child-cmp *ngIf="true" [addItemFn]="addItem.bind(this)"></child-cmp>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestCmp = _classThis = class {
                constructor() {
                    this.item = 'CmpItem';
                }
                addItem() {
                    items.push(this.item);
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
        testing_1.TestBed.configureTestingModule({ declarations: [ChildCmp, TestCmp] });
        const fixture = testing_1.TestBed.createComponent(TestCmp);
        fixture.detectChanges();
        const childCmp = fixture.debugElement.children[0].componentInstance;
        childCmp.addItemFn();
        childCmp.addItemFn();
        expect(items).toEqual(['CmpItem', 'CmpItem']);
    });
    it('should resolve template input variables through the implicit receiver', () => {
        let TestCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<ng-template let-a [ngIf]="true">{{a}}</ng-template>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestCmp = _classThis = class {
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
        testing_1.TestBed.configureTestingModule({ declarations: [TestCmp] });
        const fixture = testing_1.TestBed.createComponent(TestCmp);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('true');
    });
    it('should component instance variables through the implicit receiver', () => {
        let TestCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <ng-template [ngIf]="true">
          <ng-template [ngIf]="true">{{this.myProp}}{{myProp}}</ng-template>
        </ng-template>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestCmp = _classThis = class {
                constructor() {
                    this.myProp = 'Hello';
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
        testing_1.TestBed.configureTestingModule({ declarations: [TestCmp] });
        const fixture = testing_1.TestBed.createComponent(TestCmp);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('HelloHello');
    });
});
