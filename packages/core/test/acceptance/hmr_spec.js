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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../../src/core");
const testing_1 = require("../../testing");
const directive_1 = require("../../src/render3/jit/directive");
const environment_1 = require("../../src/render3/jit/environment");
const localize_1 = require("@angular/localize");
const compiler_1 = require("@angular/compiler");
const platform_browser_1 = require("@angular/platform-browser");
describe('hot module replacement', () => {
    it('should recreate a single usage of a basic component', () => {
        let instance;
        const initialMetadata = {
            selector: 'child-cmp',
            template: 'Hello <strong>{{state}}</strong>',
        };
        let ChildCmp = (() => {
            let _classDecorators = [(0, core_1.Component)(initialMetadata)];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ChildCmp = _classThis = class {
                constructor() {
                    this.state = 0;
                    instance = this;
                }
            };
            __setFunctionName(_classThis, "ChildCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ChildCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ChildCmp = _classThis;
        })();
        let RootCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    imports: [ChildCmp],
                    template: '<child-cmp/>',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var RootCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "RootCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                RootCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return RootCmp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(RootCmp);
        fixture.detectChanges();
        markNodesAsCreatedInitially(fixture.nativeElement);
        expectHTML(fixture.nativeElement, `
        <child-cmp>
          Hello <strong>0</strong>
        </child-cmp>
      `);
        instance.state = 1;
        fixture.detectChanges();
        expectHTML(fixture.nativeElement, `
        <child-cmp>
          Hello <strong>1</strong>
        </child-cmp>
      `);
        replaceMetadata(ChildCmp, Object.assign(Object.assign({}, initialMetadata), { template: `Changed <strong>{{state}}</strong>!` }));
        fixture.detectChanges();
        const recreatedNodes = childrenOf(...fixture.nativeElement.querySelectorAll('child-cmp'));
        verifyNodesRemainUntouched(fixture.nativeElement, recreatedNodes);
        verifyNodesWereRecreated(recreatedNodes);
        expectHTML(fixture.nativeElement, `
        <child-cmp>
          Changed <strong>1</strong>!
        </child-cmp>
      `);
    });
    it('should recreate multiple usages of a complex component', () => {
        const initialMetadata = {
            selector: 'child-cmp',
            template: '<span>ChildCmp (orig)</span><h1>{{ text }}</h1>',
        };
        let ChildCmp = (() => {
            let _classDecorators = [(0, core_1.Component)(initialMetadata)];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _text_decorators;
            let _text_initializers = [];
            let _text_extraInitializers = [];
            var ChildCmp = _classThis = class {
                constructor() {
                    this.text = __runInitializers(this, _text_initializers, '[empty]');
                    __runInitializers(this, _text_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "ChildCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _text_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _text_decorators, { kind: "field", name: "text", static: false, private: false, access: { has: obj => "text" in obj, get: obj => obj.text, set: (obj, value) => { obj.text = value; } }, metadata: _metadata }, _text_initializers, _text_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ChildCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ChildCmp = _classThis;
        })();
        let RootCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    imports: [ChildCmp],
                    template: `
        <i>Unrelated node #1</i>
        <child-cmp text="A"/>
        <u>Unrelated node #2</u>
        <child-cmp text="B"/>
        <b>Unrelated node #3</b>
        <main>
          <child-cmp text="C"/>
        </main>
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var RootCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "RootCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                RootCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return RootCmp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(RootCmp);
        fixture.detectChanges();
        markNodesAsCreatedInitially(fixture.nativeElement);
        expectHTML(fixture.nativeElement, `
        <i>Unrelated node #1</i>
        <child-cmp text="A">
          <span>ChildCmp (orig)</span><h1>A</h1>
        </child-cmp>
        <u>Unrelated node #2</u>
        <child-cmp text="B">
          <span>ChildCmp (orig)</span><h1>B</h1>
        </child-cmp>
        <b>Unrelated node #3</b>
        <main>
          <child-cmp text="C">
            <span>ChildCmp (orig)</span><h1>C</h1>
          </child-cmp>
        </main>
      `);
        replaceMetadata(ChildCmp, Object.assign(Object.assign({}, initialMetadata), { template: `
        <p title="extra attr">ChildCmp (hmr)</p>
        <h2>{{ text }}</h2>
        <div>Extra node!</div>
      ` }));
        fixture.detectChanges();
        const recreatedNodes = childrenOf(...fixture.nativeElement.querySelectorAll('child-cmp'));
        verifyNodesRemainUntouched(fixture.nativeElement, recreatedNodes);
        verifyNodesWereRecreated(recreatedNodes);
        expectHTML(fixture.nativeElement, `
        <i>Unrelated node #1</i>
        <child-cmp text="A">
          <p title="extra attr">ChildCmp (hmr)</p>
          <h2>A</h2>
          <div>Extra node!</div>
        </child-cmp>
        <u>Unrelated node #2</u>
        <child-cmp text="B">
          <p title="extra attr">ChildCmp (hmr)</p>
          <h2>B</h2>
          <div>Extra node!</div>
        </child-cmp>
        <b>Unrelated node #3</b>
        <main>
          <child-cmp text="C">
            <p title="extra attr">ChildCmp (hmr)</p>
            <h2>C</h2>
            <div>Extra node!</div>
          </child-cmp>
        </main>
      `);
    });
    it('should not recreate sub-classes of a component being replaced', () => {
        const initialMetadata = {
            selector: 'child-cmp',
            template: 'Base class',
        };
        let ChildCmp = (() => {
            let _classDecorators = [(0, core_1.Component)(initialMetadata)];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ChildCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "ChildCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ChildCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ChildCmp = _classThis;
        })();
        let ChildSubCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'child-sub-cmp',
                    template: 'Sub class',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _classSuper = ChildCmp;
            var ChildSubCmp = _classThis = class extends _classSuper {
            };
            __setFunctionName(_classThis, "ChildSubCmp");
            (() => {
                var _a;
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ChildSubCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ChildSubCmp = _classThis;
        })();
        let RootCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    imports: [ChildCmp, ChildSubCmp],
                    template: `<child-cmp/>|<child-sub-cmp/>`,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var RootCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "RootCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                RootCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return RootCmp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(RootCmp);
        fixture.detectChanges();
        expectHTML(fixture.nativeElement, `
        <child-cmp>Base class</child-cmp>|
        <child-sub-cmp>Sub class</child-sub-cmp>
      `);
        replaceMetadata(ChildCmp, Object.assign(Object.assign({}, initialMetadata), { template: `Replaced!` }));
        fixture.detectChanges();
        expectHTML(fixture.nativeElement, `
        <child-cmp>Replaced!</child-cmp>|
        <child-sub-cmp>Sub class</child-sub-cmp>
      `);
    });
    it('should replace a component using shadow DOM encapsulation', () => {
        // Domino doesn't support shadow DOM.
        if (isNode) {
            return;
        }
        let instance;
        const initialMetadata = {
            encapsulation: core_1.ViewEncapsulation.ShadowDom,
            selector: 'child-cmp',
            template: 'Hello <strong>{{state}}</strong>',
            styles: `strong {color: red;}`,
        };
        let ChildCmp = (() => {
            let _classDecorators = [(0, core_1.Component)(initialMetadata)];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ChildCmp = _classThis = class {
                constructor() {
                    this.state = 0;
                    instance = this;
                }
            };
            __setFunctionName(_classThis, "ChildCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ChildCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ChildCmp = _classThis;
        })();
        let RootCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    imports: [ChildCmp],
                    template: '<child-cmp/>',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var RootCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "RootCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                RootCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return RootCmp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(RootCmp);
        fixture.detectChanges();
        const getShadowRoot = () => fixture.nativeElement.querySelector('child-cmp').shadowRoot;
        markNodesAsCreatedInitially(getShadowRoot());
        expectHTML(getShadowRoot(), `<style>strong {color: red;}</style>Hello <strong>0</strong>`);
        instance.state = 1;
        fixture.detectChanges();
        expectHTML(getShadowRoot(), `<style>strong {color: red;}</style>Hello <strong>1</strong>`);
        replaceMetadata(ChildCmp, Object.assign(Object.assign({}, initialMetadata), { template: `Changed <strong>{{state}}</strong>!`, styles: `strong {background: pink;}` }));
        fixture.detectChanges();
        verifyNodesWereRecreated([
            fixture.nativeElement.querySelector('child-cmp'),
            ...childrenOf(getShadowRoot()),
        ]);
        expectHTML(getShadowRoot(), `<style>strong {background: pink;}</style>Changed <strong>1</strong>!`);
    });
    it('should continue binding inputs to a component that is replaced', () => {
        const initialMetadata = {
            selector: 'child-cmp',
            template: '<span>{{staticValue}}</span><strong>{{dynamicValue}}</strong>',
        };
        let ChildCmp = (() => {
            let _classDecorators = [(0, core_1.Component)(initialMetadata)];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _staticValue_decorators;
            let _staticValue_initializers = [];
            let _staticValue_extraInitializers = [];
            let _dynamicValue_decorators;
            let _dynamicValue_initializers = [];
            let _dynamicValue_extraInitializers = [];
            var ChildCmp = _classThis = class {
                constructor() {
                    this.staticValue = __runInitializers(this, _staticValue_initializers, '0');
                    this.dynamicValue = (__runInitializers(this, _staticValue_extraInitializers), __runInitializers(this, _dynamicValue_initializers, '0'));
                    __runInitializers(this, _dynamicValue_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "ChildCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _staticValue_decorators = [(0, core_1.Input)()];
                _dynamicValue_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _staticValue_decorators, { kind: "field", name: "staticValue", static: false, private: false, access: { has: obj => "staticValue" in obj, get: obj => obj.staticValue, set: (obj, value) => { obj.staticValue = value; } }, metadata: _metadata }, _staticValue_initializers, _staticValue_extraInitializers);
                __esDecorate(null, null, _dynamicValue_decorators, { kind: "field", name: "dynamicValue", static: false, private: false, access: { has: obj => "dynamicValue" in obj, get: obj => obj.dynamicValue, set: (obj, value) => { obj.dynamicValue = value; } }, metadata: _metadata }, _dynamicValue_initializers, _dynamicValue_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ChildCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ChildCmp = _classThis;
        })();
        let RootCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    imports: [ChildCmp],
                    template: `<child-cmp staticValue="1" [dynamicValue]="dynamicValue"/>`,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var RootCmp = _classThis = class {
                constructor() {
                    this.dynamicValue = '1';
                }
            };
            __setFunctionName(_classThis, "RootCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                RootCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return RootCmp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(RootCmp);
        fixture.detectChanges();
        expectHTML(fixture.nativeElement, `
        <child-cmp staticvalue="1">
          <span>1</span>
          <strong>1</strong>
        </child-cmp>
      `);
        fixture.componentInstance.dynamicValue = '2';
        fixture.detectChanges();
        expectHTML(fixture.nativeElement, `
        <child-cmp staticvalue="1">
          <span>1</span>
          <strong>2</strong>
        </child-cmp>
      `);
        replaceMetadata(ChildCmp, Object.assign(Object.assign({}, initialMetadata), { template: `
        <main>
          <span>{{staticValue}}</span>
          <strong>{{dynamicValue}}</strong>
        </main>
      ` }));
        fixture.detectChanges();
        expectHTML(fixture.nativeElement, `
        <child-cmp staticvalue="1">
          <main>
            <span>1</span>
            <strong>2</strong>
          </main>
        </child-cmp>
      `);
        fixture.componentInstance.dynamicValue = '3';
        fixture.detectChanges();
        expectHTML(fixture.nativeElement, `
        <child-cmp staticvalue="1">
          <main>
            <span>1</span>
            <strong>3</strong>
          </main>
        </child-cmp>
      `);
    });
    it('should recreate a component used inside @for', () => {
        const initialMetadata = {
            selector: 'child-cmp',
            template: 'Hello <strong>{{value}}</strong>',
        };
        let ChildCmp = (() => {
            let _classDecorators = [(0, core_1.Component)(initialMetadata)];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _value_decorators;
            let _value_initializers = [];
            let _value_extraInitializers = [];
            var ChildCmp = _classThis = class {
                constructor() {
                    this.value = __runInitializers(this, _value_initializers, '[empty]');
                    __runInitializers(this, _value_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "ChildCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _value_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ChildCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ChildCmp = _classThis;
        })();
        let RootCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    imports: [ChildCmp],
                    template: `
        @for (current of items; track current.id) {
          <child-cmp [value]="current.name"/>
          <hr>
        }
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var RootCmp = _classThis = class {
                constructor() {
                    this.items = [
                        { name: 'A', id: 1 },
                        { name: 'B', id: 2 },
                        { name: 'C', id: 3 },
                    ];
                }
            };
            __setFunctionName(_classThis, "RootCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                RootCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return RootCmp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(RootCmp);
        fixture.detectChanges();
        markNodesAsCreatedInitially(fixture.nativeElement);
        expectHTML(fixture.nativeElement, `
        <child-cmp>Hello <strong>A</strong></child-cmp>
        <hr>
        <child-cmp>Hello <strong>B</strong></child-cmp>
        <hr>
        <child-cmp>Hello <strong>C</strong></child-cmp>
        <hr>
      `);
        replaceMetadata(ChildCmp, Object.assign(Object.assign({}, initialMetadata), { template: `Changed <strong>{{value}}</strong>!` }));
        fixture.detectChanges();
        let recreatedNodes = childrenOf(...fixture.nativeElement.querySelectorAll('child-cmp'));
        verifyNodesRemainUntouched(fixture.nativeElement, recreatedNodes);
        verifyNodesWereRecreated(recreatedNodes);
        expectHTML(fixture.nativeElement, `
        <child-cmp>Changed <strong>A</strong>!</child-cmp>
        <hr>
        <child-cmp>Changed <strong>B</strong>!</child-cmp>
        <hr>
        <child-cmp>Changed <strong>C</strong>!</child-cmp>
        <hr>
      `);
        fixture.componentInstance.items.pop();
        fixture.detectChanges();
        expectHTML(fixture.nativeElement, `
        <child-cmp>Changed <strong>A</strong>!</child-cmp>
        <hr>
        <child-cmp>Changed <strong>B</strong>!</child-cmp>
        <hr>
      `);
        recreatedNodes = childrenOf(...fixture.nativeElement.querySelectorAll('child-cmp'));
        verifyNodesRemainUntouched(fixture.nativeElement, recreatedNodes);
        verifyNodesWereRecreated(recreatedNodes);
    });
    it('should be able to replace a component that injects ViewContainerRef', () => {
        const initialMetadata = {
            selector: 'child-cmp',
            template: 'Hello <strong>world</strong>',
        };
        let ChildCmp = (() => {
            let _classDecorators = [(0, core_1.Component)(initialMetadata)];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ChildCmp = _classThis = class {
                constructor() {
                    this.vcr = (0, core_1.inject)(core_1.ViewContainerRef);
                }
            };
            __setFunctionName(_classThis, "ChildCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ChildCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ChildCmp = _classThis;
        })();
        let RootCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    imports: [ChildCmp],
                    template: '<child-cmp/>',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var RootCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "RootCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                RootCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return RootCmp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(RootCmp);
        fixture.detectChanges();
        markNodesAsCreatedInitially(fixture.nativeElement);
        expectHTML(fixture.nativeElement, `
        <child-cmp>
          Hello <strong>world</strong>
        </child-cmp>
      `);
        replaceMetadata(ChildCmp, Object.assign(Object.assign({}, initialMetadata), { template: `Hello <i>Bob</i>!` }));
        fixture.detectChanges();
        const recreatedNodes = childrenOf(...fixture.nativeElement.querySelectorAll('child-cmp'));
        verifyNodesRemainUntouched(fixture.nativeElement, recreatedNodes);
        verifyNodesWereRecreated(recreatedNodes);
        expectHTML(fixture.nativeElement, `
        <child-cmp>
          Hello <i>Bob</i>!
        </child-cmp>
      `);
    });
    it('should carry over dependencies defined by setComponentScope', () => {
        // In some cases the AoT compiler produces a `setComponentScope` for non-standalone
        // components. We simulate it here by declaring two components that are not standalone
        // and manually calling `setComponentScope`.
        let ChildCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({ selector: 'child-cmp', template: 'hello', standalone: false })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ChildCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "ChildCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ChildCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ChildCmp = _classThis;
        })();
        let RootCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({ template: 'Initial <child-cmp/>', standalone: false })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var RootCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "RootCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                RootCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return RootCmp = _classThis;
        })();
        (0, core_1.ɵɵsetComponentScope)(RootCmp, [ChildCmp], []);
        const fixture = testing_1.TestBed.createComponent(RootCmp);
        fixture.detectChanges();
        markNodesAsCreatedInitially(fixture.nativeElement);
        expectHTML(fixture.nativeElement, 'Initial <child-cmp>hello</child-cmp>');
        replaceMetadata(RootCmp, {
            standalone: false,
            template: 'Changed <child-cmp/>',
        });
        fixture.detectChanges();
        const recreatedNodes = childrenOf(fixture.nativeElement);
        verifyNodesRemainUntouched(fixture.nativeElement, recreatedNodes);
        verifyNodesWereRecreated(recreatedNodes);
        expectHTML(fixture.nativeElement, 'Changed <child-cmp>hello</child-cmp>');
    });
    describe('queries', () => {
        it('should update ViewChildren query results', () => __awaiter(void 0, void 0, void 0, function* () {
            let ChildCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child-cmp',
                        template: '<span>ChildCmp {{ text }}</span>',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _text_decorators;
                let _text_initializers = [];
                let _text_extraInitializers = [];
                var ChildCmp = _classThis = class {
                    constructor() {
                        this.text = __runInitializers(this, _text_initializers, '[empty]');
                        __runInitializers(this, _text_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "ChildCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _text_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _text_decorators, { kind: "field", name: "text", static: false, private: false, access: { has: obj => "text" in obj, get: obj => obj.text, set: (obj, value) => { obj.text = value; } }, metadata: _metadata }, _text_initializers, _text_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildCmp = _classThis;
            })();
            let instance;
            const initialMetadata = {
                selector: 'parent-cmp',
                imports: [ChildCmp],
                template: `
          <child-cmp text="A"/>
          <child-cmp text="B"/>
        `,
            };
            let ParentCmp = (() => {
                let _classDecorators = [(0, core_1.Component)(initialMetadata)];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _childCmps_decorators;
                let _childCmps_initializers = [];
                let _childCmps_extraInitializers = [];
                var ParentCmp = _classThis = class {
                    constructor() {
                        this.childCmps = __runInitializers(this, _childCmps_initializers, void 0);
                        __runInitializers(this, _childCmps_extraInitializers);
                        instance = this;
                    }
                };
                __setFunctionName(_classThis, "ParentCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _childCmps_decorators = [(0, core_1.ViewChildren)(ChildCmp)];
                    __esDecorate(null, null, _childCmps_decorators, { kind: "field", name: "childCmps", static: false, private: false, access: { has: obj => "childCmps" in obj, get: obj => obj.childCmps, set: (obj, value) => { obj.childCmps = value; } }, metadata: _metadata }, _childCmps_initializers, _childCmps_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ParentCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ParentCmp = _classThis;
            })();
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [ParentCmp],
                        template: `<parent-cmp/>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            const initialComps = instance.childCmps.toArray().slice();
            expect(initialComps.length).toBe(2);
            replaceMetadata(ParentCmp, Object.assign(Object.assign({}, initialMetadata), { template: `
          <child-cmp text="A"/>
          <child-cmp text="B"/>
          <child-cmp text="C"/>
          <child-cmp text="D"/>
        ` }));
            fixture.detectChanges();
            expect(instance.childCmps.length).toBe(4);
            expect(instance.childCmps.toArray().every((c) => !initialComps.includes(c))).toBe(true);
        }));
        it('should update ViewChild when the string points to a different element', () => __awaiter(void 0, void 0, void 0, function* () {
            let instance;
            const initialMetadata = {
                selector: 'parent-cmp',
                template: `
          <div>
            <span>
              <strong #ref></strong>
            </span>
          </div>
        `,
            };
            let ParentCmp = (() => {
                let _classDecorators = [(0, core_1.Component)(initialMetadata)];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _ref_decorators;
                let _ref_initializers = [];
                let _ref_extraInitializers = [];
                var ParentCmp = _classThis = class {
                    constructor() {
                        this.ref = __runInitializers(this, _ref_initializers, void 0);
                        __runInitializers(this, _ref_extraInitializers);
                        instance = this;
                    }
                };
                __setFunctionName(_classThis, "ParentCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _ref_decorators = [(0, core_1.ViewChild)('ref')];
                    __esDecorate(null, null, _ref_decorators, { kind: "field", name: "ref", static: false, private: false, access: { has: obj => "ref" in obj, get: obj => obj.ref, set: (obj, value) => { obj.ref = value; } }, metadata: _metadata }, _ref_initializers, _ref_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ParentCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ParentCmp = _classThis;
            })();
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [ParentCmp],
                        template: `<parent-cmp/>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            expect(instance.ref.nativeElement.tagName).toBe('STRONG');
            replaceMetadata(ParentCmp, Object.assign(Object.assign({}, initialMetadata), { template: `
          <div>
            <span>
              <strong></strong>
            </span>
          </div>

          <main>
            <span #ref></span>
          </main>
        ` }));
            fixture.detectChanges();
            expect(instance.ref.nativeElement.tagName).toBe('SPAN');
        }));
        it('should update ViewChild when the injection token points to a different directive', () => __awaiter(void 0, void 0, void 0, function* () {
            const token = new core_1.InjectionToken('token');
            let DirA = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir-a]',
                        providers: [{ provide: token, useExisting: DirA }],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DirA = _classThis = class {
                };
                __setFunctionName(_classThis, "DirA");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirA = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirA = _classThis;
            })();
            let DirB = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir-b]',
                        providers: [{ provide: token, useExisting: DirB }],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DirB = _classThis = class {
                };
                __setFunctionName(_classThis, "DirB");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirB = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirB = _classThis;
            })();
            let instance;
            const initialMetadata = {
                selector: 'parent-cmp',
                imports: [DirA, DirB],
                template: `<div #ref dir-a></div>`,
            };
            let ParentCmp = (() => {
                let _classDecorators = [(0, core_1.Component)(initialMetadata)];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _ref_decorators;
                let _ref_initializers = [];
                let _ref_extraInitializers = [];
                var ParentCmp = _classThis = class {
                    constructor() {
                        this.ref = __runInitializers(this, _ref_initializers, void 0);
                        __runInitializers(this, _ref_extraInitializers);
                        instance = this;
                    }
                };
                __setFunctionName(_classThis, "ParentCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _ref_decorators = [(0, core_1.ViewChild)('ref', { read: token })];
                    __esDecorate(null, null, _ref_decorators, { kind: "field", name: "ref", static: false, private: false, access: { has: obj => "ref" in obj, get: obj => obj.ref, set: (obj, value) => { obj.ref = value; } }, metadata: _metadata }, _ref_initializers, _ref_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ParentCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ParentCmp = _classThis;
            })();
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [ParentCmp],
                        template: `<parent-cmp/>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            expect(instance.ref).toBeInstanceOf(DirA);
            replaceMetadata(ParentCmp, Object.assign(Object.assign({}, initialMetadata), { template: `
          <section>
            <div #ref dir-b></div>
          </section>
        ` }));
            fixture.detectChanges();
            expect(instance.ref).toBeInstanceOf(DirB);
        }));
        it('should update ViewChild when the injection token stops pointing to anything', () => __awaiter(void 0, void 0, void 0, function* () {
            const token = new core_1.InjectionToken('token');
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        providers: [{ provide: token, useExisting: Dir }],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let instance;
            const initialMetadata = {
                selector: 'parent-cmp',
                imports: [Dir],
                template: `<div #ref dir></div>`,
            };
            let ParentCmp = (() => {
                let _classDecorators = [(0, core_1.Component)(initialMetadata)];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _ref_decorators;
                let _ref_initializers = [];
                let _ref_extraInitializers = [];
                var ParentCmp = _classThis = class {
                    constructor() {
                        this.ref = __runInitializers(this, _ref_initializers, void 0);
                        __runInitializers(this, _ref_extraInitializers);
                        instance = this;
                    }
                };
                __setFunctionName(_classThis, "ParentCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _ref_decorators = [(0, core_1.ViewChild)('ref', { read: token })];
                    __esDecorate(null, null, _ref_decorators, { kind: "field", name: "ref", static: false, private: false, access: { has: obj => "ref" in obj, get: obj => obj.ref, set: (obj, value) => { obj.ref = value; } }, metadata: _metadata }, _ref_initializers, _ref_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ParentCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ParentCmp = _classThis;
            })();
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [ParentCmp],
                        template: `<parent-cmp/>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            expect(instance.ref).toBeInstanceOf(Dir);
            replaceMetadata(ParentCmp, Object.assign(Object.assign({}, initialMetadata), { template: `<div #ref></div>` }));
            fixture.detectChanges();
            expect(instance.ref).toBeFalsy();
        }));
    });
    describe('content projection', () => {
        it('should work with content projection', () => {
            const initialMetadata = {
                selector: 'parent-cmp',
                template: `<ng-content/>`,
            };
            let ParentCmp = (() => {
                let _classDecorators = [(0, core_1.Component)(initialMetadata)];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ParentCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "ParentCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ParentCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ParentCmp = _classThis;
            })();
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [ParentCmp],
                        template: `
          <parent-cmp>
            <h1>Projected H1</h1>
            <h2>Projected H2</h2>
          </parent-cmp>
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            markNodesAsCreatedInitially(fixture.nativeElement);
            expectHTML(fixture.nativeElement, `
          <parent-cmp>
            <h1>Projected H1</h1>
            <h2>Projected H2</h2>
          </parent-cmp>
        `);
            replaceMetadata(ParentCmp, Object.assign(Object.assign({}, initialMetadata), { template: `
          <section>
            <ng-content/>
          </section>
        ` }));
            fixture.detectChanges();
            // <h1> and <h2> nodes were not re-created, since they
            // belong to a parent component, which wasn't HMR'ed.
            verifyNodesRemainUntouched(fixture.nativeElement.querySelector('h1'));
            verifyNodesRemainUntouched(fixture.nativeElement.querySelector('h2'));
            verifyNodesWereRecreated(fixture.nativeElement.querySelectorAll('section'));
            expectHTML(fixture.nativeElement, `
          <parent-cmp>
            <section>
              <h1>Projected H1</h1>
              <h2>Projected H2</h2>
            </section>
          </parent-cmp>
        `);
        });
        it('should handle elements moving around into different slots', () => {
            // Start off with a single catch-all slot.
            const initialMetadata = {
                selector: 'parent-cmp',
                template: `<ng-content/>`,
            };
            let ParentCmp = (() => {
                let _classDecorators = [(0, core_1.Component)(initialMetadata)];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ParentCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "ParentCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ParentCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ParentCmp = _classThis;
            })();
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [ParentCmp],
                        template: `
          <parent-cmp>
            <div one="1">one</div>
            <div two="2">two</div>
          </parent-cmp>
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            markNodesAsCreatedInitially(fixture.nativeElement);
            expectHTML(fixture.nativeElement, `
          <parent-cmp>
            <div one="1">one</div>
            <div two="2">two</div>
          </parent-cmp>
        `);
            // Swap out the catch-all slot with two specific slots.
            // Note that we also changed the order of `one` and `two`.
            replaceMetadata(ParentCmp, Object.assign(Object.assign({}, initialMetadata), { template: `
          <section><ng-content select="[two]"/></section>
          <main><ng-content select="[one]"/></main>
        ` }));
            fixture.detectChanges();
            verifyNodesRemainUntouched(fixture.nativeElement.querySelector('[one]'));
            verifyNodesRemainUntouched(fixture.nativeElement.querySelector('[two]'));
            verifyNodesWereRecreated(fixture.nativeElement.querySelectorAll('section, main'));
            expectHTML(fixture.nativeElement, `
          <parent-cmp>
            <section><div two="2">two</div></section>
            <main><div one="1">one</div></main>
          </parent-cmp>
        `);
            // Swap with a slot that matches nothing.
            replaceMetadata(ParentCmp, Object.assign(Object.assign({}, initialMetadata), { template: `<ng-content select="does-not-match"/>` }));
            fixture.detectChanges();
            expectHTML(fixture.nativeElement, '<parent-cmp></parent-cmp>');
            // Swap with a slot that only one of the nodes matches.
            replaceMetadata(ParentCmp, Object.assign(Object.assign({}, initialMetadata), { template: `<span><ng-content select="[one]"/></span>` }));
            fixture.detectChanges();
            expectHTML(fixture.nativeElement, `
        <parent-cmp>
          <span><div one="1">one</div></span>
        </parent-cmp>
      `);
            verifyNodesRemainUntouched(fixture.nativeElement.querySelector('[one]'));
            verifyNodesWereRecreated(fixture.nativeElement.querySelectorAll('span'));
        });
        it('should handle default content for ng-content', () => {
            const initialMetadata = {
                selector: 'parent-cmp',
                template: `
          <ng-content select="will-not-match">
            <div class="default-content">Default content</div>
          </ng-content>
        `,
            };
            let ParentCmp = (() => {
                let _classDecorators = [(0, core_1.Component)(initialMetadata)];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ParentCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "ParentCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ParentCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ParentCmp = _classThis;
            })();
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [ParentCmp],
                        template: `
          <parent-cmp>
            <span>Some content</span>
          </parent-cmp>
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            expectHTML(fixture.nativeElement, `
          <parent-cmp>
            <div class="default-content">Default content</div>
          </parent-cmp>
        `);
            replaceMetadata(ParentCmp, Object.assign(Object.assign({}, initialMetadata), { template: `
          <ng-content>
            <div class="default-content">Default content</div>
          </ng-content>
        ` }));
            fixture.detectChanges();
            expectHTML(fixture.nativeElement, `
          <parent-cmp>
            <span>Some content</span>
          </parent-cmp>
        `);
        });
    });
    describe('lifecycle hooks', () => {
        it('should only invoke the init/destroy hooks inside the content when replacing the template', () => {
            let ChildCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                        selector: 'child-cmp',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _text_decorators;
                let _text_initializers = [];
                let _text_extraInitializers = [];
                var ChildCmp = _classThis = class {
                    ngOnInit() {
                        logs.push(`ChildCmp ${this.text} init`);
                    }
                    ngOnDestroy() {
                        logs.push(`ChildCmp ${this.text} destroy`);
                    }
                    constructor() {
                        this.text = __runInitializers(this, _text_initializers, '[empty]');
                        __runInitializers(this, _text_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "ChildCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _text_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _text_decorators, { kind: "field", name: "text", static: false, private: false, access: { has: obj => "text" in obj, get: obj => obj.text, set: (obj, value) => { obj.text = value; } }, metadata: _metadata }, _text_initializers, _text_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildCmp = _classThis;
            })();
            const initialMetadata = {
                template: `
          <child-cmp text="A"/>
          <child-cmp text="B"/>
        `,
                imports: [ChildCmp],
                selector: 'parent-cmp',
            };
            let logs = [];
            let ParentCmp = (() => {
                let _classDecorators = [(0, core_1.Component)(initialMetadata)];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _text_decorators;
                let _text_initializers = [];
                let _text_extraInitializers = [];
                var ParentCmp = _classThis = class {
                    ngOnInit() {
                        logs.push(`ParentCmp ${this.text} init`);
                    }
                    ngOnDestroy() {
                        logs.push(`ParentCmp ${this.text} destroy`);
                    }
                    constructor() {
                        this.text = __runInitializers(this, _text_initializers, '[empty]');
                        __runInitializers(this, _text_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "ParentCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _text_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _text_decorators, { kind: "field", name: "text", static: false, private: false, access: { has: obj => "text" in obj, get: obj => obj.text, set: (obj, value) => { obj.text = value; } }, metadata: _metadata }, _text_initializers, _text_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ParentCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ParentCmp = _classThis;
            })();
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        // Note that we test two of the same component one after the other
                        // specifically because during testing it was a problematic pattern.
                        template: `
          <parent-cmp text="A"/>
          <parent-cmp text="B"/>
        `,
                        imports: [ParentCmp],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            expect(logs).toEqual([
                'ParentCmp A init',
                'ParentCmp B init',
                'ChildCmp A init',
                'ChildCmp B init',
                'ChildCmp A init',
                'ChildCmp B init',
            ]);
            logs = [];
            replaceMetadata(ParentCmp, Object.assign(Object.assign({}, initialMetadata), { template: `
          <child-cmp text="C"/>
          <child-cmp text="D"/>
          <child-cmp text="E"/>
        ` }));
            fixture.detectChanges();
            expect(logs).toEqual([
                'ChildCmp A destroy',
                'ChildCmp B destroy',
                'ChildCmp C init',
                'ChildCmp D init',
                'ChildCmp E init',
                'ChildCmp A destroy',
                'ChildCmp B destroy',
                'ChildCmp C init',
                'ChildCmp D init',
                'ChildCmp E init',
            ]);
            logs = [];
            replaceMetadata(ParentCmp, Object.assign(Object.assign({}, initialMetadata), { template: '' }));
            fixture.detectChanges();
            expect(logs).toEqual([
                'ChildCmp C destroy',
                'ChildCmp D destroy',
                'ChildCmp E destroy',
                'ChildCmp C destroy',
                'ChildCmp D destroy',
                'ChildCmp E destroy',
            ]);
        });
        it('should invoke checked hooks both on the host and the content being replaced', () => {
            let ChildCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                        selector: 'child-cmp',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _text_decorators;
                let _text_initializers = [];
                let _text_extraInitializers = [];
                var ChildCmp = _classThis = class {
                    ngDoCheck() {
                        logs.push(`ChildCmp ${this.text} checked`);
                    }
                    constructor() {
                        this.text = __runInitializers(this, _text_initializers, '[empty]');
                        __runInitializers(this, _text_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "ChildCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _text_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _text_decorators, { kind: "field", name: "text", static: false, private: false, access: { has: obj => "text" in obj, get: obj => obj.text, set: (obj, value) => { obj.text = value; } }, metadata: _metadata }, _text_initializers, _text_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildCmp = _classThis;
            })();
            const initialMetadata = {
                template: `<child-cmp text="A"/>`,
                imports: [ChildCmp],
                selector: 'parent-cmp',
            };
            let logs = [];
            let ParentCmp = (() => {
                let _classDecorators = [(0, core_1.Component)(initialMetadata)];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ParentCmp = _classThis = class {
                    ngDoCheck() {
                        logs.push(`ParentCmp checked`);
                    }
                };
                __setFunctionName(_classThis, "ParentCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ParentCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ParentCmp = _classThis;
            })();
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<parent-cmp/>`,
                        imports: [ParentCmp],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            expect(logs).toEqual(['ParentCmp checked', 'ChildCmp A checked']);
            fixture.detectChanges();
            expect(logs).toEqual([
                'ParentCmp checked',
                'ChildCmp A checked',
                'ParentCmp checked',
                'ChildCmp A checked',
            ]);
            logs = [];
            replaceMetadata(ParentCmp, Object.assign(Object.assign({}, initialMetadata), { template: '' }));
            fixture.detectChanges();
            expect(logs).toEqual(['ParentCmp checked']);
            fixture.detectChanges();
            expect(logs).toEqual(['ParentCmp checked', 'ParentCmp checked']);
            logs = [];
            replaceMetadata(ParentCmp, Object.assign(Object.assign({}, initialMetadata), { template: `
          <child-cmp text="A"/>
          <child-cmp text="B"/>
        ` }));
            fixture.detectChanges();
            expect(logs).toEqual([
                'ChildCmp A checked',
                'ChildCmp B checked',
                'ParentCmp checked',
                'ChildCmp A checked',
                'ChildCmp B checked',
            ]);
            fixture.detectChanges();
            expect(logs).toEqual([
                'ChildCmp A checked',
                'ChildCmp B checked',
                'ParentCmp checked',
                'ChildCmp A checked',
                'ChildCmp B checked',
                'ParentCmp checked',
                'ChildCmp A checked',
                'ChildCmp B checked',
            ]);
        });
        it('should dispatch ngOnChanges on a replaced component', () => {
            const values = [];
            const initialMetadata = {
                selector: 'child-cmp',
                template: '',
            };
            let ChildCmp = (() => {
                let _classDecorators = [(0, core_1.Component)(initialMetadata)];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _value_decorators;
                let _value_initializers = [];
                let _value_extraInitializers = [];
                var ChildCmp = _classThis = class {
                    ngOnChanges(changes) {
                        const change = changes['value'];
                        values.push(`${change.previousValue} - ${change.currentValue} - ${change.isFirstChange()}`);
                    }
                    constructor() {
                        this.value = __runInitializers(this, _value_initializers, 0);
                        __runInitializers(this, _value_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "ChildCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _value_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildCmp = _classThis;
            })();
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [ChildCmp],
                        template: `<child-cmp [value]="value"/>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                    constructor() {
                        this.value = 1;
                    }
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            expect(values).toEqual(['undefined - 1 - true']);
            fixture.componentInstance.value++;
            fixture.detectChanges();
            expect(values).toEqual(['undefined - 1 - true', '1 - 2 - false']);
            replaceMetadata(ChildCmp, Object.assign(Object.assign({}, initialMetadata), { template: 'Changed' }));
            fixture.detectChanges();
            fixture.componentInstance.value++;
            fixture.detectChanges();
            expect(values).toEqual(['undefined - 1 - true', '1 - 2 - false', '2 - 3 - false']);
            fixture.componentInstance.value++;
            fixture.detectChanges();
            expect(values).toEqual([
                'undefined - 1 - true',
                '1 - 2 - false',
                '2 - 3 - false',
                '3 - 4 - false',
            ]);
            replaceMetadata(ChildCmp, Object.assign(Object.assign({}, initialMetadata), { template: 'Changed!!!' }));
            fixture.detectChanges();
            fixture.componentInstance.value++;
            fixture.detectChanges();
            expect(values).toEqual([
                'undefined - 1 - true',
                '1 - 2 - false',
                '2 - 3 - false',
                '3 - 4 - false',
                '4 - 5 - false',
            ]);
        });
    });
    describe('event listeners', () => {
        it('should continue emitting to output after component has been replaced', () => {
            let count = 0;
            const initialMetadata = {
                selector: 'child-cmp',
                template: '<button (click)="clicked()"></button>',
            };
            let ChildCmp = (() => {
                let _classDecorators = [(0, core_1.Component)(initialMetadata)];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _changed_decorators;
                let _changed_initializers = [];
                let _changed_extraInitializers = [];
                var ChildCmp = _classThis = class {
                    clicked() {
                        this.changed.emit();
                    }
                    constructor() {
                        this.changed = __runInitializers(this, _changed_initializers, new core_1.EventEmitter());
                        __runInitializers(this, _changed_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "ChildCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _changed_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _changed_decorators, { kind: "field", name: "changed", static: false, private: false, access: { has: obj => "changed" in obj, get: obj => obj.changed, set: (obj, value) => { obj.changed = value; } }, metadata: _metadata }, _changed_initializers, _changed_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildCmp = _classThis;
            })();
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [ChildCmp],
                        template: `<child-cmp (changed)="onChange()"/>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                    onChange() {
                        count++;
                    }
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            markNodesAsCreatedInitially(fixture.nativeElement);
            expect(count).toBe(0);
            fixture.nativeElement.querySelector('button').click();
            fixture.detectChanges();
            expect(count).toBe(1);
            replaceMetadata(ChildCmp, Object.assign(Object.assign({}, initialMetadata), { template: '<button class="replacement" (click)="clicked()"></button>' }));
            fixture.detectChanges();
            const recreatedNodes = childrenOf(...fixture.nativeElement.querySelectorAll('child-cmp'));
            verifyNodesRemainUntouched(fixture.nativeElement, recreatedNodes);
            verifyNodesWereRecreated(recreatedNodes);
            fixture.nativeElement.querySelector('.replacement').click();
            fixture.detectChanges();
            expect(count).toBe(2);
        });
        it('should stop emitting if replaced with an element that no longer has the listener', () => {
            let count = 0;
            const initialMetadata = {
                selector: 'child-cmp',
                template: '<button (click)="clicked()"></button>',
            };
            let ChildCmp = (() => {
                let _classDecorators = [(0, core_1.Component)(initialMetadata)];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _changed_decorators;
                let _changed_initializers = [];
                let _changed_extraInitializers = [];
                var ChildCmp = _classThis = class {
                    clicked() {
                        this.changed.emit();
                    }
                    constructor() {
                        this.changed = __runInitializers(this, _changed_initializers, new core_1.EventEmitter());
                        __runInitializers(this, _changed_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "ChildCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _changed_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _changed_decorators, { kind: "field", name: "changed", static: false, private: false, access: { has: obj => "changed" in obj, get: obj => obj.changed, set: (obj, value) => { obj.changed = value; } }, metadata: _metadata }, _changed_initializers, _changed_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildCmp = _classThis;
            })();
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [ChildCmp],
                        template: `<child-cmp (changed)="onChange()"/>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                    onChange() {
                        count++;
                    }
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            markNodesAsCreatedInitially(fixture.nativeElement);
            expect(count).toBe(0);
            fixture.nativeElement.querySelector('button').click();
            fixture.detectChanges();
            expect(count).toBe(1);
            replaceMetadata(ChildCmp, Object.assign(Object.assign({}, initialMetadata), { template: '<button (click)="clicked()"></button>' }));
            fixture.detectChanges();
            const recreatedNodes = childrenOf(...fixture.nativeElement.querySelectorAll('child-cmp'));
            verifyNodesRemainUntouched(fixture.nativeElement, recreatedNodes);
            verifyNodesWereRecreated(recreatedNodes);
            fixture.nativeElement.querySelector('button').click();
            fixture.detectChanges();
            expect(count).toBe(2);
        });
        it('should bind events inside the NgZone after a replacement', () => {
            const calls = [];
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: `<button (click)="clicked()"></button>` })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    clicked() { }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                providers: [
                    {
                        // Note: TestBed brings things into the zone even if they aren't which makes this
                        // test hard to write. We have to intercept the listener being bound at the renderer
                        // level in order to get a true sense if it'll be bound inside or outside the zone.
                        // We do so with a custom event manager.
                        provide: platform_browser_1.EVENT_MANAGER_PLUGINS,
                        multi: true,
                        useValue: {
                            supports: () => true,
                            addEventListener: (_, name) => {
                                calls.push({ name, inZone: core_1.NgZone.isInAngularZone() });
                                return () => { };
                            },
                        },
                    },
                ],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(calls).toEqual([{ name: 'click', inZone: true }]);
            replaceMetadata(App, { template: '<button class="foo" (click)="clicked()"></button>' });
            fixture.detectChanges();
            expect(calls).toEqual([
                { name: 'click', inZone: true },
                { name: 'click', inZone: true },
            ]);
        });
    });
    describe('directives', () => {
        it('should not destroy template-matched directives on a component being replaced', () => {
            const initLog = [];
            let destroyCount = 0;
            const initialMetadata = {
                selector: 'child-cmp',
                template: '',
            };
            let ChildCmp = (() => {
                let _classDecorators = [(0, core_1.Component)(initialMetadata)];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildCmp = _classThis = class {
                    constructor() {
                        initLog.push('ChildCmp init');
                    }
                    ngOnDestroy() {
                        destroyCount++;
                    }
                };
                __setFunctionName(_classThis, "ChildCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildCmp = _classThis;
            })();
            let DirA = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[dir-a]' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DirA = _classThis = class {
                    constructor() {
                        initLog.push('DirA init');
                    }
                    ngOnDestroy() {
                        destroyCount++;
                    }
                };
                __setFunctionName(_classThis, "DirA");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirA = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirA = _classThis;
            })();
            let DirB = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[dir-b]' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DirB = _classThis = class {
                    constructor() {
                        initLog.push('DirB init');
                    }
                    ngOnDestroy() {
                        destroyCount++;
                    }
                };
                __setFunctionName(_classThis, "DirB");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirB = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirB = _classThis;
            })();
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [ChildCmp, DirA, DirB],
                        template: `<child-cmp dir-a dir-b/>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            markNodesAsCreatedInitially(fixture.nativeElement);
            expect(initLog).toEqual(['ChildCmp init', 'DirA init', 'DirB init']);
            expect(destroyCount).toBe(0);
            replaceMetadata(ChildCmp, Object.assign(Object.assign({}, initialMetadata), { template: 'Hello!' }));
            fixture.detectChanges();
            expect(initLog).toEqual(['ChildCmp init', 'DirA init', 'DirB init']);
            expect(destroyCount).toBe(0);
        });
        it('should not destroy host directives on a component being replaced', () => {
            const initLog = [];
            let destroyCount = 0;
            let DirA = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[dir-a]' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DirA = _classThis = class {
                    constructor() {
                        initLog.push('DirA init');
                    }
                    ngOnDestroy() {
                        destroyCount++;
                    }
                };
                __setFunctionName(_classThis, "DirA");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirA = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirA = _classThis;
            })();
            let DirB = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[dir-b]' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DirB = _classThis = class {
                    constructor() {
                        initLog.push('DirB init');
                    }
                    ngOnDestroy() {
                        destroyCount++;
                    }
                };
                __setFunctionName(_classThis, "DirB");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirB = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirB = _classThis;
            })();
            const initialMetadata = {
                selector: 'child-cmp',
                template: '',
                hostDirectives: [DirA, DirB],
            };
            let ChildCmp = (() => {
                let _classDecorators = [(0, core_1.Component)(initialMetadata)];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildCmp = _classThis = class {
                    constructor() {
                        initLog.push('ChildCmp init');
                    }
                    ngOnDestroy() {
                        destroyCount++;
                    }
                };
                __setFunctionName(_classThis, "ChildCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildCmp = _classThis;
            })();
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [ChildCmp],
                        template: '<child-cmp/>',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            markNodesAsCreatedInitially(fixture.nativeElement);
            expect(initLog).toEqual(['DirA init', 'DirB init', 'ChildCmp init']);
            expect(destroyCount).toBe(0);
            replaceMetadata(ChildCmp, Object.assign(Object.assign({}, initialMetadata), { template: 'Hello!' }));
            fixture.detectChanges();
            expect(initLog).toEqual(['DirA init', 'DirB init', 'ChildCmp init']);
            expect(destroyCount).toBe(0);
        });
    });
    describe('dependency injection', () => {
        it('should be able to inject a component that is replaced', () => {
            let instance;
            const injectedInstances = [];
            let DirA = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[dir-a]' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DirA = _classThis = class {
                    constructor() {
                        injectedInstances.push([this, (0, core_1.inject)(ChildCmp)]);
                    }
                };
                __setFunctionName(_classThis, "DirA");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirA = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirA = _classThis;
            })();
            let DirB = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[dir-b]' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DirB = _classThis = class {
                    constructor() {
                        injectedInstances.push([this, (0, core_1.inject)(ChildCmp)]);
                    }
                };
                __setFunctionName(_classThis, "DirB");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirB = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirB = _classThis;
            })();
            const initialMetadata = {
                selector: 'child-cmp',
                template: '<div dir-a></div>',
                imports: [DirA, DirB],
            };
            let ChildCmp = (() => {
                let _classDecorators = [(0, core_1.Component)(initialMetadata)];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildCmp = _classThis = class {
                    constructor() {
                        instance = this;
                    }
                };
                __setFunctionName(_classThis, "ChildCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildCmp = _classThis;
            })();
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [ChildCmp],
                        template: '<child-cmp/>',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            expect(instance).toBeInstanceOf(ChildCmp);
            expect(injectedInstances).toEqual([[jasmine.any(DirA), instance]]);
            replaceMetadata(ChildCmp, Object.assign(Object.assign({}, initialMetadata), { template: '<div dir-b></div>' }));
            fixture.detectChanges();
            expect(injectedInstances).toEqual([
                [jasmine.any(DirA), instance],
                [jasmine.any(DirB), instance],
            ]);
        });
        it('should be able to inject a token coming from a component that is replaced', () => {
            const token = new core_1.InjectionToken('TEST_TOKEN');
            const injectedValues = [];
            let DirA = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[dir-a]' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DirA = _classThis = class {
                    constructor() {
                        injectedValues.push([this, (0, core_1.inject)(token)]);
                    }
                };
                __setFunctionName(_classThis, "DirA");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirA = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirA = _classThis;
            })();
            let DirB = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[dir-b]' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DirB = _classThis = class {
                    constructor() {
                        injectedValues.push([this, (0, core_1.inject)(token)]);
                    }
                };
                __setFunctionName(_classThis, "DirB");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirB = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirB = _classThis;
            })();
            const initialMetadata = {
                selector: 'child-cmp',
                template: '<div dir-a></div>',
                imports: [DirA, DirB],
                providers: [{ provide: token, useValue: 'provided value' }],
            };
            let ChildCmp = (() => {
                let _classDecorators = [(0, core_1.Component)(initialMetadata)];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "ChildCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildCmp = _classThis;
            })();
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [ChildCmp],
                        template: '<child-cmp/>',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            expect(injectedValues).toEqual([[jasmine.any(DirA), 'provided value']]);
            replaceMetadata(ChildCmp, Object.assign(Object.assign({}, initialMetadata), { template: '<div dir-b></div>' }));
            fixture.detectChanges();
            expect(injectedValues).toEqual([
                [jasmine.any(DirA), 'provided value'],
                [jasmine.any(DirB), 'provided value'],
            ]);
        });
        it('should be able to access the viewProviders of a component that is being replaced', () => {
            const token = new core_1.InjectionToken('TEST_TOKEN');
            const injectedValues = [];
            let DirA = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[dir-a]' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DirA = _classThis = class {
                    constructor() {
                        injectedValues.push([this, (0, core_1.inject)(token)]);
                    }
                };
                __setFunctionName(_classThis, "DirA");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirA = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirA = _classThis;
            })();
            let DirB = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[dir-b]' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DirB = _classThis = class {
                    constructor() {
                        injectedValues.push([this, (0, core_1.inject)(token)]);
                    }
                };
                __setFunctionName(_classThis, "DirB");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirB = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirB = _classThis;
            })();
            const initialMetadata = {
                selector: 'child-cmp',
                template: '<div dir-a></div>',
                imports: [DirA, DirB],
                viewProviders: [{ provide: token, useValue: 'provided value' }],
            };
            let ChildCmp = (() => {
                let _classDecorators = [(0, core_1.Component)(initialMetadata)];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "ChildCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildCmp = _classThis;
            })();
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [ChildCmp],
                        template: '<child-cmp/>',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            expect(injectedValues).toEqual([[jasmine.any(DirA), 'provided value']]);
            replaceMetadata(ChildCmp, Object.assign(Object.assign({}, initialMetadata), { template: '<div dir-b></div>' }));
            fixture.detectChanges();
            expect(injectedValues).toEqual([
                [jasmine.any(DirA), 'provided value'],
                [jasmine.any(DirB), 'provided value'],
            ]);
        });
    });
    describe('host bindings', () => {
        it('should maintain attribute host bindings on a replaced component', () => {
            const initialMetadata = {
                selector: 'child-cmp',
                template: 'Hello',
                host: {
                    '[attr.bar]': 'state',
                },
            };
            let ChildCmp = (() => {
                let _classDecorators = [(0, core_1.Component)(initialMetadata)];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _state_decorators;
                let _state_initializers = [];
                let _state_extraInitializers = [];
                var ChildCmp = _classThis = class {
                    constructor() {
                        this.state = __runInitializers(this, _state_initializers, 0);
                        __runInitializers(this, _state_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "ChildCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _state_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _state_decorators, { kind: "field", name: "state", static: false, private: false, access: { has: obj => "state" in obj, get: obj => obj.state, set: (obj, value) => { obj.state = value; } }, metadata: _metadata }, _state_initializers, _state_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildCmp = _classThis;
            })();
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [ChildCmp],
                        template: `<child-cmp [state]="state" [attr.foo]="'The state is ' + state"/>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                    constructor() {
                        this.state = 0;
                    }
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            expectHTML(fixture.nativeElement, `<child-cmp foo="The state is 0" bar="0">Hello</child-cmp>`);
            fixture.componentInstance.state = 1;
            fixture.detectChanges();
            expectHTML(fixture.nativeElement, `<child-cmp foo="The state is 1" bar="1">Hello</child-cmp>`);
            replaceMetadata(ChildCmp, Object.assign(Object.assign({}, initialMetadata), { template: `Changed` }));
            fixture.detectChanges();
            expectHTML(fixture.nativeElement, `<child-cmp foo="The state is 1" bar="1">Changed</child-cmp>`);
            fixture.componentInstance.state = 2;
            fixture.detectChanges();
            expectHTML(fixture.nativeElement, `<child-cmp foo="The state is 2" bar="2">Changed</child-cmp>`);
        });
        it('should maintain class host bindings on a replaced component', () => {
            const initialMetadata = {
                selector: 'child-cmp',
                template: 'Hello',
                host: {
                    '[class.bar]': 'state',
                },
            };
            let ChildCmp = (() => {
                let _classDecorators = [(0, core_1.Component)(initialMetadata)];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _state_decorators;
                let _state_initializers = [];
                let _state_extraInitializers = [];
                var ChildCmp = _classThis = class {
                    constructor() {
                        this.state = __runInitializers(this, _state_initializers, false);
                        __runInitializers(this, _state_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "ChildCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _state_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _state_decorators, { kind: "field", name: "state", static: false, private: false, access: { has: obj => "state" in obj, get: obj => obj.state, set: (obj, value) => { obj.state = value; } }, metadata: _metadata }, _state_initializers, _state_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildCmp = _classThis;
            })();
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [ChildCmp],
                        template: `<child-cmp class="static" [state]="state" [class.foo]="state"/>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                    constructor() {
                        this.state = false;
                    }
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            expectHTML(fixture.nativeElement, `<child-cmp class="static">Hello</child-cmp>`);
            fixture.componentInstance.state = true;
            fixture.detectChanges();
            expectHTML(fixture.nativeElement, `<child-cmp class="static foo bar">Hello</child-cmp>`);
            replaceMetadata(ChildCmp, Object.assign(Object.assign({}, initialMetadata), { template: `Changed` }));
            fixture.detectChanges();
            expectHTML(fixture.nativeElement, `<child-cmp class="static foo bar">Changed</child-cmp>`);
            fixture.componentInstance.state = false;
            fixture.detectChanges();
            expectHTML(fixture.nativeElement, `<child-cmp class="static">Changed</child-cmp>`);
        });
        it('should maintain style host bindings on a replaced component', () => {
            const initialMetadata = {
                selector: 'child-cmp',
                template: 'Hello',
                host: {
                    '[style.height]': 'state ? "5px" : "20px"',
                },
            };
            let ChildCmp = (() => {
                let _classDecorators = [(0, core_1.Component)(initialMetadata)];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _state_decorators;
                let _state_initializers = [];
                let _state_extraInitializers = [];
                var ChildCmp = _classThis = class {
                    constructor() {
                        this.state = __runInitializers(this, _state_initializers, false);
                        __runInitializers(this, _state_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "ChildCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _state_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _state_decorators, { kind: "field", name: "state", static: false, private: false, access: { has: obj => "state" in obj, get: obj => obj.state, set: (obj, value) => { obj.state = value; } }, metadata: _metadata }, _state_initializers, _state_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildCmp = _classThis;
            })();
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [ChildCmp],
                        template: `<child-cmp style="opacity: 0.5;" [state]="state" [style.width]="state ? '3px' : '12px'"/>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                    constructor() {
                        this.state = false;
                    }
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            expectHTML(fixture.nativeElement, `<child-cmp style="opacity: 0.5; width: 12px; height: 20px;">Hello</child-cmp>`);
            fixture.componentInstance.state = true;
            fixture.detectChanges();
            expectHTML(fixture.nativeElement, `<child-cmp style="opacity: 0.5; width: 3px; height: 5px;">Hello</child-cmp>`);
            replaceMetadata(ChildCmp, Object.assign(Object.assign({}, initialMetadata), { template: `Changed` }));
            fixture.detectChanges();
            expectHTML(fixture.nativeElement, `<child-cmp style="opacity: 0.5; width: 3px; height: 5px;">Changed</child-cmp>`);
            fixture.componentInstance.state = false;
            fixture.detectChanges();
            expectHTML(fixture.nativeElement, `<child-cmp style="opacity: 0.5; width: 12px; height: 20px;">Changed</child-cmp>`);
        });
    });
    describe('i18n', () => {
        afterEach(() => {
            (0, localize_1.clearTranslations)();
        });
        it('should replace components that use i18n within their template', () => {
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('hello')]: 'здравей',
                [(0, compiler_1.computeMsgId)('goodbye')]: 'довиждане',
            });
            const initialMetadata = {
                selector: 'child-cmp',
                template: '<span i18n>hello</span>',
            };
            let ChildCmp = (() => {
                let _classDecorators = [(0, core_1.Component)(initialMetadata)];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "ChildCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildCmp = _classThis;
            })();
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [ChildCmp],
                        template: '<child-cmp/>',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            expectHTML(fixture.nativeElement, '<child-cmp><span>здравей</span></child-cmp>');
            replaceMetadata(ChildCmp, Object.assign(Object.assign({}, initialMetadata), { template: '<strong i18n>goodbye</strong>!' }));
            fixture.detectChanges();
            expectHTML(fixture.nativeElement, '<child-cmp><strong>довиждане</strong>!</child-cmp>');
        });
        it('should replace components that use i18n in their projected content', () => {
            (0, localize_1.loadTranslations)({ [(0, compiler_1.computeMsgId)('hello')]: 'здравей' });
            const initialMetadata = {
                selector: 'child-cmp',
                template: '<ng-content/>',
            };
            let ChildCmp = (() => {
                let _classDecorators = [(0, core_1.Component)(initialMetadata)];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "ChildCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildCmp = _classThis;
            })();
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [ChildCmp],
                        template: `<child-cmp i18n>hello</child-cmp>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            markNodesAsCreatedInitially(fixture.nativeElement);
            expectHTML(fixture.nativeElement, '<child-cmp>здравей</child-cmp>');
            replaceMetadata(ChildCmp, Object.assign(Object.assign({}, initialMetadata), { template: 'Hello translates to <strong><ng-content/></strong>!' }));
            fixture.detectChanges();
            const recreatedNodes = childrenOf(...fixture.nativeElement.querySelectorAll('child-cmp'));
            verifyNodesRemainUntouched(fixture.nativeElement, recreatedNodes);
            verifyNodesWereRecreated(recreatedNodes);
            expectHTML(fixture.nativeElement, '<child-cmp>Hello translates to <strong>здравей</strong>!</child-cmp>');
        });
        it('should replace components that use i18n with interpolations', () => {
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('hello')]: 'здравей',
                [(0, compiler_1.computeMsgId)('Hello {$INTERPOLATION}!')]: 'Здравей {$INTERPOLATION}!',
            });
            let instance;
            const initialMetadata = {
                selector: 'child-cmp',
                template: '<span i18n>Hello {{name}}!</span>',
            };
            let ChildCmp = (() => {
                let _classDecorators = [(0, core_1.Component)(initialMetadata)];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildCmp = _classThis = class {
                    constructor() {
                        this.name = 'Frodo';
                        instance = this;
                    }
                };
                __setFunctionName(_classThis, "ChildCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildCmp = _classThis;
            })();
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [ChildCmp],
                        template: '<child-cmp/>',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            expectHTML(fixture.nativeElement, '<child-cmp><span>Здравей Frodo!</span></child-cmp>');
            replaceMetadata(ChildCmp, Object.assign(Object.assign({}, initialMetadata), { template: '<strong i18n>hello</strong>' }));
            fixture.detectChanges();
            expectHTML(fixture.nativeElement, '<child-cmp><strong>здравей</strong></child-cmp>');
            replaceMetadata(ChildCmp, Object.assign(Object.assign({}, initialMetadata), { template: '<main><section i18n>Hello {{name}}!</section></main>' }));
            fixture.detectChanges();
            expectHTML(fixture.nativeElement, '<child-cmp><main><section>Здравей Frodo!</section></main></child-cmp>');
            instance.name = 'Bilbo';
            fixture.detectChanges();
            expectHTML(fixture.nativeElement, '<child-cmp><main><section>Здравей Bilbo!</section></main></child-cmp>');
        });
        it('should replace components that use i18n with interpolations in their projected content', () => {
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('Hello {$INTERPOLATION}!')]: 'Здравей {$INTERPOLATION}!',
            });
            const initialMetadata = {
                selector: 'child-cmp',
                template: '<ng-content/>',
            };
            let ChildCmp = (() => {
                let _classDecorators = [(0, core_1.Component)(initialMetadata)];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "ChildCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildCmp = _classThis;
            })();
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [ChildCmp],
                        template: '<child-cmp i18n>Hello {{name}}!</child-cmp>',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                    constructor() {
                        this.name = 'Frodo';
                    }
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            markNodesAsCreatedInitially(fixture.nativeElement);
            expectHTML(fixture.nativeElement, '<child-cmp>Здравей Frodo!</child-cmp>');
            replaceMetadata(ChildCmp, Object.assign(Object.assign({}, initialMetadata), { template: 'The text translates to <strong><ng-content/></strong>!' }));
            fixture.detectChanges();
            expectHTML(fixture.nativeElement, '<child-cmp>The text translates to <strong>Здравей Frodo!</strong>!</child-cmp>');
            const recreatedNodes = childrenOf(...fixture.nativeElement.querySelectorAll('child-cmp'));
            verifyNodesRemainUntouched(fixture.nativeElement, recreatedNodes);
            verifyNodesWereRecreated(recreatedNodes);
            fixture.componentInstance.name = 'Bilbo';
            fixture.detectChanges();
            expectHTML(fixture.nativeElement, '<child-cmp>The text translates to <strong>Здравей Bilbo!</strong>!</child-cmp>');
        });
        it('should replace components that use i18n with ICUs', () => {
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('hello')]: 'здравей',
                [(0, compiler_1.computeMsgId)('{VAR_SELECT, select, 10 {ten} 20 {twenty} other {other}}')]: '{VAR_SELECT, select, 10 {десет} 20 {двадесет} other {друго}}',
            });
            let instance;
            const initialMetadata = {
                selector: 'child-cmp',
                template: '<span i18n>{count, select, 10 {ten} 20 {twenty} other {other}}</span>',
            };
            let ChildCmp = (() => {
                let _classDecorators = [(0, core_1.Component)(initialMetadata)];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildCmp = _classThis = class {
                    constructor() {
                        this.count = 10;
                        instance = this;
                    }
                };
                __setFunctionName(_classThis, "ChildCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildCmp = _classThis;
            })();
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [ChildCmp],
                        template: '<child-cmp/>',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            expectHTML(fixture.nativeElement, '<child-cmp><span>десет</span></child-cmp>');
            replaceMetadata(ChildCmp, Object.assign(Object.assign({}, initialMetadata), { template: '<strong i18n>hello</strong>' }));
            fixture.detectChanges();
            expectHTML(fixture.nativeElement, '<child-cmp><strong>здравей</strong></child-cmp>');
            replaceMetadata(ChildCmp, Object.assign(Object.assign({}, initialMetadata), { template: '<main><section i18n>{count, select, 10 {ten} 20 {twenty} other {other}}</section></main>' }));
            fixture.detectChanges();
            expectHTML(fixture.nativeElement, '<child-cmp><main><section>десет</section></main></child-cmp>');
            instance.count = 20;
            fixture.detectChanges();
            expectHTML(fixture.nativeElement, '<child-cmp><main><section>двадесет</section></main></child-cmp>');
        });
        it('should replace components that use i18n with ICUs in their projected content', () => {
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('{VAR_SELECT, select, 10 {ten} 20 {twenty} other {other}}')]: '{VAR_SELECT, select, 10 {десет} 20 {двадесет} other {друго}}',
            });
            const initialMetadata = {
                selector: 'child-cmp',
                template: '<ng-content/>',
            };
            let ChildCmp = (() => {
                let _classDecorators = [(0, core_1.Component)(initialMetadata)];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "ChildCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildCmp = _classThis;
            })();
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [ChildCmp],
                        template: '<child-cmp i18n>{count, select, 10 {ten} 20 {twenty} other {other}}</child-cmp>',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                    constructor() {
                        this.count = 10;
                    }
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            markNodesAsCreatedInitially(fixture.nativeElement);
            expectHTML(fixture.nativeElement, '<child-cmp>десет</child-cmp>');
            replaceMetadata(ChildCmp, Object.assign(Object.assign({}, initialMetadata), { template: 'The text translates to <strong><ng-content/></strong>!' }));
            fixture.detectChanges();
            const recreatedNodes = childrenOf(...fixture.nativeElement.querySelectorAll('child-cmp'));
            verifyNodesRemainUntouched(fixture.nativeElement, recreatedNodes);
            verifyNodesWereRecreated(recreatedNodes);
            expectHTML(fixture.nativeElement, '<child-cmp>The text translates to <strong>десет</strong>!</child-cmp>');
            fixture.componentInstance.count = 20;
            fixture.detectChanges();
            expectHTML(fixture.nativeElement, '<child-cmp>The text translates to <strong>двадесет</strong>!</child-cmp>');
        });
    });
    // Testing utilities
    // Field that we'll monkey-patch onto DOM elements that were created
    // initially, so that we can verify that some nodes were *not* re-created
    // during HMR operation. We do it for *testing* purposes only.
    const CREATED_INITIALLY_MARKER = '__ngCreatedInitially__';
    function replaceMetadata(type, metadata) {
        (0, core_1.ɵɵreplaceMetadata)(type, () => {
            // TODO: the content of this callback is a hacky workaround to invoke the compiler in a test.
            // in reality the callback will be generated by the compiler to be something along the lines
            // of `MyComp[ɵcmp] = /* metadata */`.
            // TODO: in reality this callback should also include `setClassMetadata` and
            // `setClassDebugInfo`.
            type[core_1.ɵNG_COMP_DEF] = null;
            (0, directive_1.compileComponent)(type, metadata);
        }, [environment_1.angularCoreEnv], [], null, '');
    }
    function expectHTML(element, expectation) {
        const actual = element.innerHTML
            .replace(/<!--(\W|\w)*?-->/g, '')
            .replace(/\s(ng-reflect|_nghost|_ngcontent)-\S*="[^"]*"/g, '');
        expect(actual.replace(/\s/g, '') === expectation.replace(/\s/g, ''))
            .withContext(`HTML does not match expectation. Actual HTML:\n${actual}`)
            .toBe(true);
    }
    function setMarker(node) {
        node[CREATED_INITIALLY_MARKER] = true;
    }
    function hasMarker(node) {
        return !!node[CREATED_INITIALLY_MARKER];
    }
    function markNodesAsCreatedInitially(root) {
        let current = root;
        while (current) {
            setMarker(current);
            if (current.firstChild) {
                markNodesAsCreatedInitially(current.firstChild);
            }
            current = current.nextSibling;
        }
    }
    function childrenOf(...nodes) {
        const result = [];
        for (const node of nodes) {
            let current = node.firstChild;
            while (current) {
                result.push(current);
                current = current.nextSibling;
            }
        }
        return result;
    }
    function verifyNodesRemainUntouched(root, exceptions = []) {
        if (!root) {
            throw new Error('Root node must be provided');
        }
        let current = root;
        while (current) {
            if (!hasMarker(current)) {
                if (exceptions.includes(current)) {
                    // This node was re-created intentionally,
                    // do not inspect child nodes.
                    break;
                }
                else {
                    throw new Error(`Unexpected state: node was re-created: ${current.innerHTML}`);
                }
            }
            if (current.firstChild) {
                verifyNodesRemainUntouched(current.firstChild, exceptions);
            }
            current = current.nextSibling;
        }
    }
    function verifyNodesWereRecreated(nodes) {
        nodes = Array.from(nodes);
        for (const node of nodes) {
            if (hasMarker(node)) {
                throw new Error(`Unexpected state: node was *not* re-created: ${node.innerHTML}`);
            }
        }
    }
});
