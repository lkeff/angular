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
const core_1 = require("@angular/core");
const signals_1 = require("../../../primitives/signals");
const testing_1 = require("../../../testing");
const platform_browser_1 = require("@angular/platform-browser");
describe('queries as signals', () => {
    describe('view', () => {
        it('should query for an optional element in a template', () => {
            let AppComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div #el></div>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppComponent = _classThis = class {
                    constructor() {
                        this.divEl = (0, core_1.viewChild)('el');
                        this.foundEl = (0, core_1.computed)(() => this.divEl() != null);
                    }
                };
                __setFunctionName(_classThis, "AppComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppComponent = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(AppComponent);
            // with signal based queries we _do_ have query results after the creation mode
            // execution
            // (before the change detection runs) so we can return those early on! In this sense all
            // queries behave as "static" (?)
            expect(fixture.componentInstance.foundEl()).toBeTrue();
            fixture.detectChanges();
            expect(fixture.componentInstance.foundEl()).toBeTrue();
        });
        it('should return undefined if optional query is read in the constructor', () => {
            let result = {};
            let AppComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div #el></div>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppComponent = _classThis = class {
                    constructor() {
                        this.divEl = (0, core_1.viewChild)('el');
                        result = this.divEl();
                    }
                };
                __setFunctionName(_classThis, "AppComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppComponent = _classThis;
            })();
            testing_1.TestBed.createComponent(AppComponent);
            expect(result).toBeUndefined();
        });
        it('should query for a required element in a template', () => {
            let AppComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div #el></div>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppComponent = _classThis = class {
                    constructor() {
                        this.divEl = core_1.viewChild.required('el');
                        this.foundEl = (0, core_1.computed)(() => this.divEl() != null);
                    }
                };
                __setFunctionName(_classThis, "AppComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppComponent = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(AppComponent);
            // with signal based queries we _do_ have query results after the creation mode execution
            // (before the change detection runs) so we can return those early on! In this sense all
            // queries behave as "static" (?)
            expect(fixture.componentInstance.foundEl()).toBeTrue();
            fixture.detectChanges();
            expect(fixture.componentInstance.foundEl()).toBeTrue();
        });
        it('should throw if required query is read in the constructor', () => {
            let AppComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div #el></div>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppComponent = _classThis = class {
                    constructor() {
                        this.divEl = core_1.viewChild.required('el');
                        this.divEl();
                    }
                };
                __setFunctionName(_classThis, "AppComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppComponent = _classThis;
            })();
            // non-required query results are undefined before we run creation mode on the view queries
            expect(() => {
                testing_1.TestBed.createComponent(AppComponent);
            }).toThrowError(/NG0951: Child query result is required but no value is available/);
        });
        it('should query for multiple elements in a template', () => {
            let AppComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <div #el></div>
          @if (show) {
            <div #el></div>
          }
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppComponent = _classThis = class {
                    constructor() {
                        this.show = false;
                        this.divEls = (0, core_1.viewChildren)('el');
                        this.foundEl = (0, core_1.computed)(() => this.divEls().length);
                    }
                };
                __setFunctionName(_classThis, "AppComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppComponent = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(AppComponent);
            // with signal based queries we _do_ have query results after the creation mode execution
            // (before the change detection runs) so we can return those early on! In this sense all
            // queries behave as "static" (?)
            expect(fixture.componentInstance.foundEl()).toBe(1);
            fixture.detectChanges();
            expect(fixture.componentInstance.foundEl()).toBe(1);
            fixture.componentInstance.show = true;
            fixture.detectChanges();
            expect(fixture.componentInstance.foundEl()).toBe(2);
            fixture.componentInstance.show = false;
            fixture.detectChanges();
            expect(fixture.componentInstance.foundEl()).toBe(1);
        });
        it('should return an empty array when reading children query in the constructor', () => {
            let result;
            let AppComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div #el></div>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppComponent = _classThis = class {
                    constructor() {
                        this.divEls = (0, core_1.viewChildren)('el');
                        result = this.divEls();
                    }
                };
                __setFunctionName(_classThis, "AppComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppComponent = _classThis;
            })();
            testing_1.TestBed.createComponent(AppComponent);
            expect(result).toEqual([]);
        });
        it('should return the same array instance when there were no changes in results', () => {
            let AppComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div #el></div>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppComponent = _classThis = class {
                    constructor() {
                        this.divEls = (0, core_1.viewChildren)('el');
                    }
                };
                __setFunctionName(_classThis, "AppComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppComponent = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(AppComponent);
            fixture.detectChanges();
            const result1 = fixture.componentInstance.divEls();
            expect(result1.length).toBe(1);
            // subsequent reads should return the same result instance
            const result2 = fixture.componentInstance.divEls();
            expect(result2.length).toBe(1);
            expect(result2).toBe(result1);
        });
        it('should not mark signal as dirty when a child query result does not change', () => {
            let computeCount = 0;
            let AppComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
            <div #el></div>
            @if (show) {
              <div #el></div>
            }
          `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppComponent = _classThis = class {
                    constructor() {
                        this.divEl = core_1.viewChild.required('el');
                        this.isThere = (0, core_1.computed)(() => ++computeCount);
                        this.show = false;
                    }
                };
                __setFunctionName(_classThis, "AppComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppComponent = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(AppComponent);
            fixture.detectChanges();
            expect(fixture.componentInstance.isThere()).toBe(1);
            const divEl = fixture.componentInstance.divEl();
            // subsequent reads should return the same result instance and _not_ trigger downstream
            // computed re-evaluation
            fixture.componentInstance.show = true;
            fixture.detectChanges();
            expect(fixture.componentInstance.divEl()).toBe(divEl);
            expect(fixture.componentInstance.isThere()).toBe(1);
        });
        it('should return the same array instance when there were no changes in results after view manipulation', () => {
            let AppComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
            <div #el></div>
            @if (show) {
              <div></div>
            }
          `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppComponent = _classThis = class {
                    constructor() {
                        this.divEls = (0, core_1.viewChildren)('el');
                        this.show = false;
                    }
                };
                __setFunctionName(_classThis, "AppComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppComponent = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(AppComponent);
            fixture.detectChanges();
            const result1 = fixture.componentInstance.divEls();
            expect(result1.length).toBe(1);
            fixture.componentInstance.show = true;
            fixture.detectChanges();
            // subsequent reads should return the same result instance since the query results didn't
            // change
            const result2 = fixture.componentInstance.divEls();
            expect(result2.length).toBe(1);
            expect(result2).toBe(result1);
        });
        it('should be empty when no query matches exist', () => {
            let AppComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: ``,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppComponent = _classThis = class {
                    constructor() {
                        this.result = (0, core_1.viewChild)('unknown');
                        this.results = (0, core_1.viewChildren)('unknown');
                    }
                };
                __setFunctionName(_classThis, "AppComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppComponent = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(AppComponent);
            fixture.detectChanges();
            expect(fixture.componentInstance.result()).toBeUndefined();
            expect(fixture.componentInstance.results().length).toBe(0);
        });
        it('should assign a debugName to the underlying signal node when a debugName is provided', () => {
            let AppComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div #el></div>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppComponent = _classThis = class {
                    constructor() {
                        this.viewChildQuery = (0, core_1.viewChild)('el', { debugName: 'viewChildQuery' });
                        this.viewChildrenQuery = (0, core_1.viewChildren)('el', {
                            debugName: 'viewChildrenQuery',
                        });
                    }
                };
                __setFunctionName(_classThis, "AppComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppComponent = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(AppComponent);
            const viewChildNode = fixture.componentInstance.viewChildQuery[signals_1.SIGNAL];
            expect(viewChildNode.debugName).toBe('viewChildQuery');
            const viewChildrenNode = fixture.componentInstance.viewChildrenQuery[signals_1.SIGNAL];
            expect(viewChildrenNode.debugName).toBe('viewChildrenQuery');
        });
        it('should assign a debugName to the underlying signal node when a debugName is provided to a required viewChild query', () => {
            let AppComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div #el></div>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppComponent = _classThis = class {
                    constructor() {
                        this.viewChildQuery = (0, core_1.viewChild)('el', { debugName: 'viewChildQuery' });
                    }
                };
                __setFunctionName(_classThis, "AppComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppComponent = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(AppComponent);
            const node = fixture.componentInstance.viewChildQuery[signals_1.SIGNAL];
            expect(node.debugName).toBe('viewChildQuery');
        });
    });
    describe('content queries', () => {
        it('should run content queries defined on components', () => {
            let QueryComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'query-cmp',
                        template: `{{noOfEls()}}`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var QueryComponent = _classThis = class {
                    constructor() {
                        this.elements = (0, core_1.contentChildren)('el');
                        this.element = (0, core_1.contentChild)('el');
                        this.elementReq = core_1.contentChild.required('el');
                        this.noOfEls = (0, core_1.computed)(() => this.elements().length +
                            (this.element() !== undefined ? 1 : 0) +
                            (this.elementReq() !== undefined ? 1 : 0));
                    }
                };
                __setFunctionName(_classThis, "QueryComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    QueryComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return QueryComponent = _classThis;
            })();
            let AppComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [QueryComponent],
                        template: `
          <query-cmp>
            <div #el></div >
            @if (show) {
              <div #el></div>
            }
          </query-cmp>
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppComponent = _classThis = class {
                    constructor() {
                        this.show = false;
                    }
                };
                __setFunctionName(_classThis, "AppComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppComponent = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(AppComponent);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('3');
            fixture.componentInstance.show = true;
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('4');
            fixture.componentInstance.show = false;
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('3');
        });
        it('should run content queries defined on directives', () => {
            let QueryDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[query]',
                        host: { '[textContent]': `noOfEls()` },
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var QueryDir = _classThis = class {
                    constructor() {
                        this.elements = (0, core_1.contentChildren)('el');
                        this.element = (0, core_1.contentChild)('el');
                        this.elementReq = core_1.contentChild.required('el');
                        this.noOfEls = (0, core_1.computed)(() => this.elements().length +
                            (this.element() !== undefined ? 1 : 0) +
                            (this.elementReq() !== undefined ? 1 : 0));
                    }
                };
                __setFunctionName(_classThis, "QueryDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    QueryDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return QueryDir = _classThis;
            })();
            let AppComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [QueryDir],
                        template: `
          <div query>
            <div #el></div>
            @if (show) {
              <div #el></div>
            }
          </div>
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppComponent = _classThis = class {
                    constructor() {
                        this.show = false;
                    }
                };
                __setFunctionName(_classThis, "AppComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppComponent = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(AppComponent);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('3');
            fixture.componentInstance.show = true;
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('4');
            fixture.componentInstance.show = false;
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('3');
        });
        it('should not return partial results during the first-time view rendering', () => {
            let MarkerForResults = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[marker]' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MarkerForResults = _classThis = class {
                };
                __setFunctionName(_classThis, "MarkerForResults");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MarkerForResults = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MarkerForResults = _classThis;
            })();
            let DeclareQuery = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[declare]',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DeclareQuery = _classThis = class {
                    constructor() {
                        this.results = (0, core_1.contentChildren)(MarkerForResults);
                    }
                };
                __setFunctionName(_classThis, "DeclareQuery");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DeclareQuery = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DeclareQuery = _classThis;
            })();
            let InspectsQueryResults = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[inspect]' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var InspectsQueryResults = _classThis = class {
                    constructor(declaration) {
                        // we should _not_ get partial query results while the view is still creating
                        expect(declaration.results().length).toBe(0);
                    }
                };
                __setFunctionName(_classThis, "InspectsQueryResults");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    InspectsQueryResults = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return InspectsQueryResults = _classThis;
            })();
            let AppComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [MarkerForResults, InspectsQueryResults, DeclareQuery],
                        template: `
                <div declare>
                  <div marker></div>
                  <div inspect></div>
                  <div marker></div>
                </div>
             `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "AppComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppComponent = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(AppComponent);
            fixture.detectChanges();
            const queryDir = fixture.debugElement
                .query(platform_browser_1.By.directive(DeclareQuery))
                .injector.get(DeclareQuery);
            expect(queryDir.results().length).toBe(2);
        });
        it('should be empty when no query matches exist', () => {
            let DeclareQuery = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[declare]',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DeclareQuery = _classThis = class {
                    constructor() {
                        this.result = (0, core_1.contentChild)('unknown');
                        this.results = (0, core_1.contentChildren)('unknown');
                    }
                };
                __setFunctionName(_classThis, "DeclareQuery");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DeclareQuery = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DeclareQuery = _classThis;
            })();
            let AppComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [DeclareQuery],
                        template: `<div declare></div>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "AppComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppComponent = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(AppComponent);
            fixture.detectChanges();
            const queryDir = fixture.debugElement
                .query(platform_browser_1.By.directive(DeclareQuery))
                .injector.get(DeclareQuery);
            expect(queryDir.result()).toBeUndefined();
            expect(queryDir.results().length).toBe(0);
        });
        it('should assign a debugName to the underlying signal node when a debugName is provided', () => {
            let QueryComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'query-cmp',
                        template: ``,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var QueryComponent = _classThis = class {
                    constructor() {
                        this.contentChildrenQuery = (0, core_1.contentChildren)('el', { debugName: 'contentChildrenQuery' });
                        this.contentChildQuery = (0, core_1.contentChild)('el', { debugName: 'contentChildQuery' });
                        this.contentChildRequiredQuery = core_1.contentChild.required('el', {
                            debugName: 'contentChildRequiredQuery',
                        });
                    }
                };
                __setFunctionName(_classThis, "QueryComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    QueryComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return QueryComponent = _classThis;
            })();
            let AppComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [QueryComponent],
                        template: `
          <query-cmp>
            <div #el></div>
            <div #el></div>
          </query-cmp>
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "AppComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppComponent = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(AppComponent);
            fixture.detectChanges();
            const queryComponent = fixture.debugElement.query(platform_browser_1.By.directive(QueryComponent))
                .componentInstance;
            expect(queryComponent.contentChildrenQuery[signals_1.SIGNAL].debugName).toBe('contentChildrenQuery');
            expect(queryComponent.contentChildQuery[signals_1.SIGNAL].debugName).toBe('contentChildQuery');
            expect(queryComponent.contentChildRequiredQuery[signals_1.SIGNAL].debugName).toBe('contentChildRequiredQuery');
        });
    });
    describe('reactivity and performance', () => {
        it('should not dirty a children query when a list of matches does not change - a view with matches', () => {
            let recomputeCount = 0;
            let AppComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <div #el></div>
          @if (show) {
            <div #el></div>
          }
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppComponent = _classThis = class {
                    constructor() {
                        this.divEls = (0, core_1.viewChildren)('el');
                        this.foundElCount = (0, core_1.computed)(() => {
                            recomputeCount++;
                            return this.divEls().length;
                        });
                        this.show = false;
                    }
                };
                __setFunctionName(_classThis, "AppComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppComponent = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(AppComponent);
            fixture.detectChanges();
            expect(fixture.componentInstance.foundElCount()).toBe(1);
            expect(recomputeCount).toBe(1);
            // trigger view manipulation that should dirty queries but not change the results
            fixture.componentInstance.show = true;
            fixture.detectChanges();
            fixture.componentInstance.show = false;
            fixture.detectChanges();
            expect(fixture.componentInstance.foundElCount()).toBe(1);
            expect(recomputeCount).toBe(1);
        });
        it('should not dirty a children query when a list of matches does not change - a view with another container', () => {
            let recomputeCount = 0;
            let AppComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <div #el></div>
          @if (show) {
            <!-- an empty if to create a container -->
            @if (true) {}
          }
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppComponent = _classThis = class {
                    constructor() {
                        this.divEls = (0, core_1.viewChildren)('el');
                        this.foundElCount = (0, core_1.computed)(() => {
                            recomputeCount++;
                            return this.divEls().length;
                        });
                        this.show = false;
                    }
                };
                __setFunctionName(_classThis, "AppComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppComponent = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(AppComponent);
            fixture.detectChanges();
            expect(fixture.componentInstance.foundElCount()).toBe(1);
            expect(recomputeCount).toBe(1);
            // trigger view manipulation that should dirty queries but not change the results
            fixture.componentInstance.show = true;
            fixture.detectChanges();
            fixture.componentInstance.show = false;
            fixture.detectChanges();
            expect(fixture.componentInstance.foundElCount()).toBe(1);
            expect(recomputeCount).toBe(1);
        });
    });
    describe('dynamic component creation', () => {
        it('should return empty results for content queries of dynamically created components', () => {
            // https://github.com/angular/angular/issues/54450
            let QueryComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'query-cmp',
                        template: ``,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var QueryComponent = _classThis = class {
                    constructor() {
                        this.elements = (0, core_1.contentChildren)('el');
                        this.element = (0, core_1.contentChild)('el');
                    }
                };
                __setFunctionName(_classThis, "QueryComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    QueryComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return QueryComponent = _classThis;
            })();
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: ``,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
                    constructor(_envInjector) {
                        this._envInjector = _envInjector;
                    }
                    createDynamic() {
                        return (0, core_1.createComponent)(QueryComponent, { environmentInjector: this._envInjector });
                    }
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
            const fixture = testing_1.TestBed.createComponent(TestComponent);
            const cmpRef = fixture.componentInstance.createDynamic();
            cmpRef.changeDetectorRef.detectChanges();
            expect(cmpRef.instance.elements()).toEqual([]);
            expect(cmpRef.instance.element()).toBeUndefined();
        });
    });
    describe('mix of signal and decorator queries', () => {
        it('should allow specifying both types of queries in one component', () => {
            let AppComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <div #el></div>
          @if (show) {
            <div #el></div>
          }
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _divElsDecorator_decorators;
                let _divElsDecorator_initializers = [];
                let _divElsDecorator_extraInitializers = [];
                var AppComponent = _classThis = class {
                    constructor() {
                        this.show = false;
                        this.divElsSignal = (0, core_1.viewChildren)('el');
                        this.divElsDecorator = __runInitializers(this, _divElsDecorator_initializers, void 0);
                        __runInitializers(this, _divElsDecorator_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "AppComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _divElsDecorator_decorators = [(0, core_1.ViewChildren)('el')];
                    __esDecorate(null, null, _divElsDecorator_decorators, { kind: "field", name: "divElsDecorator", static: false, private: false, access: { has: obj => "divElsDecorator" in obj, get: obj => obj.divElsDecorator, set: (obj, value) => { obj.divElsDecorator = value; } }, metadata: _metadata }, _divElsDecorator_initializers, _divElsDecorator_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppComponent = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(AppComponent);
            fixture.detectChanges();
            expect(fixture.componentInstance.divElsSignal().length).toBe(1);
            expect(fixture.componentInstance.divElsDecorator.length).toBe(1);
            fixture.componentInstance.show = true;
            fixture.detectChanges();
            expect(fixture.componentInstance.divElsSignal().length).toBe(2);
            expect(fixture.componentInstance.divElsDecorator.length).toBe(2);
            fixture.componentInstance.show = false;
            fixture.detectChanges();
            expect(fixture.componentInstance.divElsSignal().length).toBe(1);
            expect(fixture.componentInstance.divElsDecorator.length).toBe(1);
        });
        it('should allow combination via inheritance of both types of queries in one component', () => {
            let BaseComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
            <div #el></div>
            @if (show) {
              <div #el></div>
            }
          `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var BaseComponent = _classThis = class {
                    constructor() {
                        this.show = false;
                        this.divElsSignal = (0, core_1.viewChildren)('el');
                    }
                };
                __setFunctionName(_classThis, "BaseComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    BaseComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return BaseComponent = _classThis;
            })();
            let AppComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
            <div #el></div>
            @if (show) {
              <div #el></div>
            }
          `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = BaseComponent;
                let _divElsDecorator_decorators;
                let _divElsDecorator_initializers = [];
                let _divElsDecorator_extraInitializers = [];
                var AppComponent = _classThis = class extends _classSuper {
                    constructor() {
                        super(...arguments);
                        this.divElsDecorator = __runInitializers(this, _divElsDecorator_initializers, void 0);
                        __runInitializers(this, _divElsDecorator_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "AppComponent");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    _divElsDecorator_decorators = [(0, core_1.ViewChildren)('el')];
                    __esDecorate(null, null, _divElsDecorator_decorators, { kind: "field", name: "divElsDecorator", static: false, private: false, access: { has: obj => "divElsDecorator" in obj, get: obj => obj.divElsDecorator, set: (obj, value) => { obj.divElsDecorator = value; } }, metadata: _metadata }, _divElsDecorator_initializers, _divElsDecorator_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppComponent = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(AppComponent);
            fixture.detectChanges();
            expect(fixture.componentInstance.divElsSignal().length).toBe(1);
            expect(fixture.componentInstance.divElsDecorator.length).toBe(1);
            fixture.componentInstance.show = true;
            fixture.detectChanges();
            expect(fixture.componentInstance.divElsSignal().length).toBe(2);
            expect(fixture.componentInstance.divElsDecorator.length).toBe(2);
            fixture.componentInstance.show = false;
            fixture.detectChanges();
            expect(fixture.componentInstance.divElsSignal().length).toBe(1);
            expect(fixture.componentInstance.divElsDecorator.length).toBe(1);
        });
    });
});
