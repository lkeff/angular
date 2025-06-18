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
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const common_1 = require("@angular/common");
const core_1 = require("../../src/core");
const testing_1 = require("../../testing");
const platform_browser_1 = require("@angular/platform-browser");
describe('components using pure function instructions internally', () => {
    describe('with array literals', () => {
        let MyComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-comp',
                    template: ``,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _names_decorators;
            let _names_initializers = [];
            let _names_extraInitializers = [];
            var MyComp = _classThis = class {
                constructor() {
                    this.names = __runInitializers(this, _names_initializers, []);
                    __runInitializers(this, _names_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "MyComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _names_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _names_decorators, { kind: "field", name: "names", static: false, private: false, access: { has: obj => "names" in obj, get: obj => obj.names, set: (obj, value) => { obj.names = value; } }, metadata: _metadata }, _names_initializers, _names_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyComp = _classThis;
        })();
        it('should support an array literal with a binding', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
                <my-comp [names]="['Nancy', customName, 'Bess']"></my-comp>
              `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.showing = true;
                        this.customName = 'Carson';
                    }
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
                declarations: [App, MyComp],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const myComp = fixture.debugElement.query(platform_browser_1.By.directive(MyComp)).componentInstance;
            const firstArray = myComp.names;
            expect(firstArray).toEqual(['Nancy', 'Carson', 'Bess']);
            fixture.detectChanges();
            expect(myComp.names).toEqual(['Nancy', 'Carson', 'Bess']);
            expect(firstArray).toBe(myComp.names);
            fixture.componentInstance.customName = 'Hannah';
            fixture.detectChanges();
            expect(myComp.names).toEqual(['Nancy', 'Hannah', 'Bess']);
            // Identity must change if binding changes
            expect(firstArray).not.toBe(myComp.names);
            // The property should not be set if the exp value is the same, so artificially
            // setting the property to ensure it's not overwritten.
            myComp.names = ['should not be overwritten'];
            fixture.detectChanges();
            expect(myComp.names).toEqual(['should not be overwritten']);
        });
        it('should support array literals in dynamic views', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
                <my-comp *ngIf="showing" [names]="['Nancy', customName, 'Bess']"></my-comp>
              `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.showing = true;
                        this.customName = 'Carson';
                    }
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
                declarations: [App, MyComp],
                imports: [common_1.CommonModule],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const myComp = fixture.debugElement.query(platform_browser_1.By.directive(MyComp)).componentInstance;
            expect(myComp.names).toEqual(['Nancy', 'Carson', 'Bess']);
        });
        it('should support multiple array literals passed through to one node', () => {
            let ManyPropComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'many-prop-comp',
                        template: ``,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _names1_decorators;
                let _names1_initializers = [];
                let _names1_extraInitializers = [];
                let _names2_decorators;
                let _names2_initializers = [];
                let _names2_extraInitializers = [];
                var ManyPropComp = _classThis = class {
                    constructor() {
                        this.names1 = __runInitializers(this, _names1_initializers, []);
                        this.names2 = (__runInitializers(this, _names1_extraInitializers), __runInitializers(this, _names2_initializers, []));
                        __runInitializers(this, _names2_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "ManyPropComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _names1_decorators = [(0, core_1.Input)()];
                    _names2_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _names1_decorators, { kind: "field", name: "names1", static: false, private: false, access: { has: obj => "names1" in obj, get: obj => obj.names1, set: (obj, value) => { obj.names1 = value; } }, metadata: _metadata }, _names1_initializers, _names1_extraInitializers);
                    __esDecorate(null, null, _names2_decorators, { kind: "field", name: "names2", static: false, private: false, access: { has: obj => "names2" in obj, get: obj => obj.names2, set: (obj, value) => { obj.names2 = value; } }, metadata: _metadata }, _names2_initializers, _names2_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ManyPropComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ManyPropComp = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
                <many-prop-comp [names1]="['Nancy', customName]" [names2]="[customName2]">
                </many-prop-comp>
              `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.showing = true;
                        this.customName = 'Carson';
                        this.customName2 = 'George';
                    }
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
                declarations: [App, ManyPropComp],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const manyPropComp = fixture.debugElement.query(platform_browser_1.By.directive(ManyPropComp)).componentInstance;
            expect(manyPropComp.names1).toEqual(['Nancy', 'Carson']);
            expect(manyPropComp.names2).toEqual(['George']);
            fixture.componentInstance.customName = 'George';
            fixture.componentInstance.customName2 = 'Carson';
            fixture.detectChanges();
            expect(manyPropComp.names1).toEqual(['Nancy', 'George']);
            expect(manyPropComp.names2).toEqual(['Carson']);
        });
        it('should support an array literals inside fn calls', () => {
            let ParentComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'parent-comp',
                        template: `
                <my-comp [names]="someFn(['Nancy', customName])"></my-comp>
              `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ParentComp = _classThis = class {
                    constructor() {
                        this.customName = 'Bess';
                    }
                    someFn(arr) {
                        arr[0] = arr[0].toUpperCase();
                        return arr;
                    }
                };
                __setFunctionName(_classThis, "ParentComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ParentComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ParentComp = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
                <parent-comp></parent-comp>
                <parent-comp></parent-comp>
              `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
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
                declarations: [App, MyComp, ParentComp],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const myComps = fixture.debugElement
                .queryAll(platform_browser_1.By.directive(MyComp))
                .map((f) => f.componentInstance);
            const firstArray = myComps[0].names;
            const secondArray = myComps[1].names;
            expect(firstArray).toEqual(['NANCY', 'Bess']);
            expect(secondArray).toEqual(['NANCY', 'Bess']);
            expect(firstArray).not.toBe(secondArray);
            fixture.detectChanges();
            expect(firstArray).toEqual(['NANCY', 'Bess']);
            expect(secondArray).toEqual(['NANCY', 'Bess']);
            expect(firstArray).toBe(myComps[0].names);
            expect(secondArray).toBe(myComps[1].names);
        });
        it('should support an array literal with more than 1 binding', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
                <my-comp *ngIf="showing" [names]="['Nancy', customName, 'Bess', customName2]"></my-comp>
              `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.showing = true;
                        this.customName = 'Carson';
                        this.customName2 = 'Hannah';
                    }
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
                declarations: [App, MyComp],
                imports: [common_1.CommonModule],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const myComp = fixture.debugElement.query(platform_browser_1.By.directive(MyComp)).componentInstance;
            const firstArray = myComp.names;
            expect(firstArray).toEqual(['Nancy', 'Carson', 'Bess', 'Hannah']);
            fixture.detectChanges();
            expect(myComp.names).toEqual(['Nancy', 'Carson', 'Bess', 'Hannah']);
            expect(firstArray).toBe(myComp.names);
            fixture.componentInstance.customName = 'George';
            fixture.detectChanges();
            expect(myComp.names).toEqual(['Nancy', 'George', 'Bess', 'Hannah']);
            expect(firstArray).not.toBe(myComp.names);
            fixture.componentInstance.customName = 'Frank';
            fixture.componentInstance.customName2 = 'Ned';
            fixture.detectChanges();
            expect(myComp.names).toEqual(['Nancy', 'Frank', 'Bess', 'Ned']);
            // The property should not be set if the exp value is the same, so artificially
            // setting the property to ensure it's not overwritten.
            myComp.names = ['should not be overwritten'];
            fixture.detectChanges();
            expect(myComp.names).toEqual(['should not be overwritten']);
        });
        it('should work up to 8 bindings', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
                <my-comp [names]="['a', 'b', 'c', 'd', 'e', 'f', 'g', v8]"></my-comp>
                <my-comp [names]="['a', 'b', 'c', 'd', 'e', 'f', v7, v8]"></my-comp>
                <my-comp [names]="['a', 'b', 'c', 'd', 'e', v6, v7, v8]"></my-comp>
                <my-comp [names]="['a', 'b', 'c', 'd', v5, v6, v7, v8]"></my-comp>
                <my-comp [names]="['a', 'b', 'c', v4, v5, v6, v7, v8]"></my-comp>
                <my-comp [names]="['a', 'b', v3, v4, v5, v6, v7, v8]"></my-comp>
                <my-comp [names]="['a', v2, v3, v4, v5, v6, v7, v8]"></my-comp>
                <my-comp [names]="[v1, v2, v3, v4, v5, v6, v7, v8]"></my-comp>
              `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.v1 = 'a';
                        this.v2 = 'b';
                        this.v3 = 'c';
                        this.v4 = 'd';
                        this.v5 = 'e';
                        this.v6 = 'f';
                        this.v7 = 'g';
                        this.v8 = 'h';
                    }
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
                declarations: [App, MyComp],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const myComps = fixture.debugElement
                .queryAll(platform_browser_1.By.directive(MyComp))
                .map((f) => f.componentInstance);
            myComps.forEach((myComp) => {
                expect(myComp.names).toEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']);
            });
            const app = fixture.componentInstance;
            app.v1 = 'a1';
            app.v2 = 'b1';
            app.v3 = 'c1';
            app.v4 = 'd1';
            app.v5 = 'e1';
            app.v6 = 'f1';
            app.v7 = 'g1';
            app.v8 = 'h1';
            fixture.detectChanges();
            expect(myComps[0].names).toEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h1']);
            expect(myComps[1].names).toEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g1', 'h1']);
            expect(myComps[2].names).toEqual(['a', 'b', 'c', 'd', 'e', 'f1', 'g1', 'h1']);
            expect(myComps[3].names).toEqual(['a', 'b', 'c', 'd', 'e1', 'f1', 'g1', 'h1']);
            expect(myComps[4].names).toEqual(['a', 'b', 'c', 'd1', 'e1', 'f1', 'g1', 'h1']);
            expect(myComps[5].names).toEqual(['a', 'b', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1']);
            expect(myComps[6].names).toEqual(['a', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1']);
            expect(myComps[7].names).toEqual(['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1']);
            app.v8 = 'h2';
            fixture.detectChanges();
            expect(myComps[0].names).toEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h2']);
            expect(myComps[1].names).toEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g1', 'h2']);
            expect(myComps[2].names).toEqual(['a', 'b', 'c', 'd', 'e', 'f1', 'g1', 'h2']);
            expect(myComps[3].names).toEqual(['a', 'b', 'c', 'd', 'e1', 'f1', 'g1', 'h2']);
            expect(myComps[4].names).toEqual(['a', 'b', 'c', 'd1', 'e1', 'f1', 'g1', 'h2']);
            expect(myComps[5].names).toEqual(['a', 'b', 'c1', 'd1', 'e1', 'f1', 'g1', 'h2']);
            expect(myComps[6].names).toEqual(['a', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h2']);
            expect(myComps[7].names).toEqual(['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h2']);
        });
        it('should work with pureFunctionV for 9+ bindings', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
                <my-comp [names]="['start', v0, v1, v2, v3, 'modified_' + v4, v5, v6, v7, v8, 'end']">
                </my-comp>
              `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.v0 = 'a';
                        this.v1 = 'b';
                        this.v2 = 'c';
                        this.v3 = 'd';
                        this.v4 = 'e';
                        this.v5 = 'f';
                        this.v6 = 'g';
                        this.v7 = 'h';
                        this.v8 = 'i';
                    }
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
                declarations: [App, MyComp],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const myComp = fixture.debugElement.query(platform_browser_1.By.directive(MyComp)).componentInstance;
            const app = fixture.componentInstance;
            expect(myComp.names).toEqual([
                'start',
                'a',
                'b',
                'c',
                'd',
                'modified_e',
                'f',
                'g',
                'h',
                'i',
                'end',
            ]);
            app.v0 = 'a1';
            fixture.detectChanges();
            expect(myComp.names).toEqual([
                'start',
                'a1',
                'b',
                'c',
                'd',
                'modified_e',
                'f',
                'g',
                'h',
                'i',
                'end',
            ]);
            app.v4 = 'e5';
            fixture.detectChanges();
            expect(myComp.names).toEqual([
                'start',
                'a1',
                'b',
                'c',
                'd',
                'modified_e5',
                'f',
                'g',
                'h',
                'i',
                'end',
            ]);
        });
    });
    describe('with object literals', () => {
        let ObjectComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'object-comp',
                    template: ``,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _config_decorators;
            let _config_initializers = [];
            let _config_extraInitializers = [];
            var ObjectComp = _classThis = class {
                constructor() {
                    this.config = __runInitializers(this, _config_initializers, []);
                    __runInitializers(this, _config_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "ObjectComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _config_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _config_decorators, { kind: "field", name: "config", static: false, private: false, access: { has: obj => "config" in obj, get: obj => obj.config, set: (obj, value) => { obj.config = value; } }, metadata: _metadata }, _config_initializers, _config_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ObjectComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ObjectComp = _classThis;
        })();
        it('should support an object literal', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<object-comp [config]="{duration: 500, animation: name}"></object-comp>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.name = 'slide';
                    }
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
                declarations: [App, ObjectComp],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const objectComp = fixture.debugElement.query(platform_browser_1.By.directive(ObjectComp)).componentInstance;
            const firstObj = objectComp.config;
            expect(objectComp.config).toEqual({ duration: 500, animation: 'slide' });
            fixture.detectChanges();
            expect(objectComp.config).toEqual({ duration: 500, animation: 'slide' });
            expect(firstObj).toBe(objectComp.config);
            fixture.componentInstance.name = 'tap';
            fixture.detectChanges();
            expect(objectComp.config).toEqual({ duration: 500, animation: 'tap' });
            // Identity must change if binding changes
            expect(firstObj).not.toBe(objectComp.config);
        });
        it('should support expressions nested deeply in object/array literals', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
        <object-comp [config]="{animation: name, actions: [{ opacity: 0, duration: 0}, {opacity: 1,
        duration: duration }]}">
        </object-comp>
      `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.name = 'slide';
                        this.duration = 100;
                    }
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
                declarations: [App, ObjectComp],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const objectComp = fixture.debugElement.query(platform_browser_1.By.directive(ObjectComp)).componentInstance;
            expect(objectComp.config).toEqual({
                animation: 'slide',
                actions: [
                    { opacity: 0, duration: 0 },
                    { opacity: 1, duration: 100 },
                ],
            });
            const firstConfig = objectComp.config;
            fixture.detectChanges();
            expect(objectComp.config).toEqual({
                animation: 'slide',
                actions: [
                    { opacity: 0, duration: 0 },
                    { opacity: 1, duration: 100 },
                ],
            });
            expect(objectComp.config).toBe(firstConfig);
            fixture.componentInstance.duration = 50;
            fixture.detectChanges();
            expect(objectComp.config).toEqual({
                animation: 'slide',
                actions: [
                    { opacity: 0, duration: 0 },
                    { opacity: 1, duration: 50 },
                ],
            });
            expect(objectComp.config).not.toBe(firstConfig);
            fixture.componentInstance.name = 'tap';
            fixture.detectChanges();
            expect(objectComp.config).toEqual({
                animation: 'tap',
                actions: [
                    { opacity: 0, duration: 0 },
                    { opacity: 1, duration: 50 },
                ],
            });
            fixture.componentInstance.name = 'drag';
            fixture.componentInstance.duration = 500;
            fixture.detectChanges();
            expect(objectComp.config).toEqual({
                animation: 'drag',
                actions: [
                    { opacity: 0, duration: 0 },
                    { opacity: 1, duration: 500 },
                ],
            });
            // The property should not be set if the exp value is the same, so artificially
            // setting the property to ensure it's not overwritten.
            objectComp.config = ['should not be overwritten'];
            fixture.detectChanges();
            expect(objectComp.config).toEqual(['should not be overwritten']);
        });
        it('should support multiple view instances with multiple bindings', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
        <object-comp *ngFor="let config of configs" [config]="config">
        </object-comp>
      `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.configs = [
                            { opacity: 0, duration: 500 },
                            { opacity: 1, duration: 600 },
                        ];
                    }
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
                declarations: [App, ObjectComp],
                imports: [common_1.CommonModule],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const app = fixture.componentInstance;
            const objectComps = fixture.debugElement
                .queryAll(platform_browser_1.By.directive(ObjectComp))
                .map((f) => f.componentInstance);
            expect(objectComps[0].config).toEqual({ opacity: 0, duration: 500 });
            expect(objectComps[1].config).toEqual({ opacity: 1, duration: 600 });
            app.configs[0].duration = 1000;
            fixture.detectChanges();
            expect(objectComps[0].config).toEqual({ opacity: 0, duration: 1000 });
            expect(objectComps[1].config).toEqual({ opacity: 1, duration: 600 });
        });
    });
    describe('identical literals', () => {
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _value_decorators;
            let _value_initializers = [];
            let _value_extraInitializers = [];
            var Dir = _classThis = class {
                constructor() {
                    this.value = __runInitializers(this, _value_initializers, void 0);
                    __runInitializers(this, _value_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _value_decorators = [(0, core_1.Input)('dir')];
                __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        it('should not share object literals across elements', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <div [dir]="{}"></div>
          <div [dir]="{}"></div>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _directives_decorators;
                let _directives_initializers = [];
                let _directives_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.directives = __runInitializers(this, _directives_initializers, void 0);
                        __runInitializers(this, _directives_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _directives_decorators = [(0, core_1.ViewChildren)(Dir)];
                    __esDecorate(null, null, _directives_decorators, { kind: "field", name: "directives", static: false, private: false, access: { has: obj => "directives" in obj, get: obj => obj.directives, set: (obj, value) => { obj.directives = value; } }, metadata: _metadata }, _directives_initializers, _directives_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [Dir, App] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const directives = fixture.componentInstance.directives.toArray();
            expect(directives[0].value).not.toBe(directives[1].value);
        });
        it('should not share array literals across elements', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <div [dir]="[]"></div>
          <div [dir]="[]"></div>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _directives_decorators;
                let _directives_initializers = [];
                let _directives_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.directives = __runInitializers(this, _directives_initializers, void 0);
                        __runInitializers(this, _directives_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _directives_decorators = [(0, core_1.ViewChildren)(Dir)];
                    __esDecorate(null, null, _directives_decorators, { kind: "field", name: "directives", static: false, private: false, access: { has: obj => "directives" in obj, get: obj => obj.directives, set: (obj, value) => { obj.directives = value; } }, metadata: _metadata }, _directives_initializers, _directives_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [Dir, App] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const directives = fixture.componentInstance.directives.toArray();
            expect(directives[0].value).not.toBe(directives[1].value);
        });
        it('should not share object literals across component instances', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div [dir]="{}"></div>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _directive_decorators;
                let _directive_initializers = [];
                let _directive_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.directive = __runInitializers(this, _directive_initializers, void 0);
                        __runInitializers(this, _directive_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _directive_decorators = [(0, core_1.ViewChild)(Dir)];
                    __esDecorate(null, null, _directive_decorators, { kind: "field", name: "directive", static: false, private: false, access: { has: obj => "directive" in obj, get: obj => obj.directive, set: (obj, value) => { obj.directive = value; } }, metadata: _metadata }, _directive_initializers, _directive_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [Dir, App] });
            const firstFixture = testing_1.TestBed.createComponent(App);
            firstFixture.detectChanges();
            const secondFixture = testing_1.TestBed.createComponent(App);
            secondFixture.detectChanges();
            expect(firstFixture.componentInstance.directive.value).not.toBe(secondFixture.componentInstance.directive.value);
        });
        it('should not share array literals across component instances', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div [dir]="[]"></div>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _directive_decorators;
                let _directive_initializers = [];
                let _directive_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.directive = __runInitializers(this, _directive_initializers, void 0);
                        __runInitializers(this, _directive_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _directive_decorators = [(0, core_1.ViewChild)(Dir)];
                    __esDecorate(null, null, _directive_decorators, { kind: "field", name: "directive", static: false, private: false, access: { has: obj => "directive" in obj, get: obj => obj.directive, set: (obj, value) => { obj.directive = value; } }, metadata: _metadata }, _directive_initializers, _directive_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [Dir, App] });
            const firstFixture = testing_1.TestBed.createComponent(App);
            firstFixture.detectChanges();
            const secondFixture = testing_1.TestBed.createComponent(App);
            secondFixture.detectChanges();
            expect(firstFixture.componentInstance.directive.value).not.toBe(secondFixture.componentInstance.directive.value);
        });
        it('should not confuse object literals and null inside of a literal', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <div [dir]="{foo: null}"></div>
          <div [dir]="{foo: {}}"></div>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _directives_decorators;
                let _directives_initializers = [];
                let _directives_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.directives = __runInitializers(this, _directives_initializers, void 0);
                        __runInitializers(this, _directives_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _directives_decorators = [(0, core_1.ViewChildren)(Dir)];
                    __esDecorate(null, null, _directives_decorators, { kind: "field", name: "directives", static: false, private: false, access: { has: obj => "directives" in obj, get: obj => obj.directives, set: (obj, value) => { obj.directives = value; } }, metadata: _metadata }, _directives_initializers, _directives_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [Dir, App] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const values = fixture.componentInstance.directives.map((directive) => directive.value);
            expect(values).toEqual([{ foo: null }, { foo: {} }]);
        });
        it('should not confuse array literals and null inside of a literal', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <div [dir]="{foo: null}"></div>
          <div [dir]="{foo: []}"></div>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _directives_decorators;
                let _directives_initializers = [];
                let _directives_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.directives = __runInitializers(this, _directives_initializers, void 0);
                        __runInitializers(this, _directives_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _directives_decorators = [(0, core_1.ViewChildren)(Dir)];
                    __esDecorate(null, null, _directives_decorators, { kind: "field", name: "directives", static: false, private: false, access: { has: obj => "directives" in obj, get: obj => obj.directives, set: (obj, value) => { obj.directives = value; } }, metadata: _metadata }, _directives_initializers, _directives_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [Dir, App] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const values = fixture.componentInstance.directives.map((directive) => directive.value);
            expect(values).toEqual([{ foo: null }, { foo: [] }]);
        });
        it('should not confuse function calls and null inside of a literal', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <div [dir]="{foo: null}"></div>
          <div [dir]="{foo: getFoo()}"></div>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _directives_decorators;
                let _directives_initializers = [];
                let _directives_extraInitializers = [];
                var App = _classThis = class {
                    getFoo() {
                        return 'foo!';
                    }
                    constructor() {
                        this.directives = __runInitializers(this, _directives_initializers, void 0);
                        __runInitializers(this, _directives_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _directives_decorators = [(0, core_1.ViewChildren)(Dir)];
                    __esDecorate(null, null, _directives_decorators, { kind: "field", name: "directives", static: false, private: false, access: { has: obj => "directives" in obj, get: obj => obj.directives, set: (obj, value) => { obj.directives = value; } }, metadata: _metadata }, _directives_initializers, _directives_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [Dir, App] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const values = fixture.componentInstance.directives.map((directive) => directive.value);
            expect(values).toEqual([{ foo: null }, { foo: 'foo!' }]);
        });
    });
});
