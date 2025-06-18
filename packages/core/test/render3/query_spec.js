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
describe('query', () => {
    describe('predicate', () => {
        describe('providers', () => {
            let Service = (() => {
                let _classDecorators = [(0, core_1.Injectable)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Service = _classThis = class {
                };
                __setFunctionName(_classThis, "Service");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Service = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Service = _classThis;
            })();
            let Alias = (() => {
                let _classDecorators = [(0, core_1.Injectable)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Alias = _classThis = class {
                };
                __setFunctionName(_classThis, "Alias");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Alias = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Alias = _classThis;
            })();
            let directive = null;
            let MyDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[myDir]',
                        providers: [Service, { provide: Alias, useExisting: Service }],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyDirective = _classThis = class {
                    constructor(service) {
                        this.service = service;
                        directive = this;
                    }
                };
                __setFunctionName(_classThis, "MyDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyDirective = _classThis;
            })();
            beforeEach(() => (directive = null));
            // https://stackblitz.com/edit/ng-viewengine-viewchild-providers?file=src%2Fapp%2Fapp.component.ts
            it('should query for providers that are present on a directive', () => {
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'app',
                            template: '<div myDir></div>',
                            imports: [MyDirective],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _directive_decorators;
                    let _directive_initializers = [];
                    let _directive_extraInitializers = [];
                    let _service_decorators;
                    let _service_initializers = [];
                    let _service_extraInitializers = [];
                    let _alias_decorators;
                    let _alias_initializers = [];
                    let _alias_extraInitializers = [];
                    var App = _classThis = class {
                        constructor() {
                            this.directive = __runInitializers(this, _directive_initializers, void 0);
                            this.service = (__runInitializers(this, _directive_extraInitializers), __runInitializers(this, _service_initializers, void 0));
                            this.alias = (__runInitializers(this, _service_extraInitializers), __runInitializers(this, _alias_initializers, void 0));
                            __runInitializers(this, _alias_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "App");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _directive_decorators = [(0, core_1.ViewChild)(MyDirective)];
                        _service_decorators = [(0, core_1.ViewChild)(Service)];
                        _alias_decorators = [(0, core_1.ViewChild)(Alias)];
                        __esDecorate(null, null, _directive_decorators, { kind: "field", name: "directive", static: false, private: false, access: { has: obj => "directive" in obj, get: obj => obj.directive, set: (obj, value) => { obj.directive = value; } }, metadata: _metadata }, _directive_initializers, _directive_extraInitializers);
                        __esDecorate(null, null, _service_decorators, { kind: "field", name: "service", static: false, private: false, access: { has: obj => "service" in obj, get: obj => obj.service, set: (obj, value) => { obj.service = value; } }, metadata: _metadata }, _service_initializers, _service_extraInitializers);
                        __esDecorate(null, null, _alias_decorators, { kind: "field", name: "alias", static: false, private: false, access: { has: obj => "alias" in obj, get: obj => obj.alias, set: (obj, value) => { obj.alias = value; } }, metadata: _metadata }, _alias_initializers, _alias_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        App = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return App = _classThis;
                })();
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                const component = fixture.componentInstance;
                expect(component.directive).toBe(directive);
                expect(component.service).toBe(directive.service);
                expect(component.alias).toBe(directive.service);
            });
            it('should resolve a provider if given as read token', () => {
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'app',
                            template: '<div myDir></div>',
                            imports: [MyDirective],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _service_decorators;
                    let _service_initializers = [];
                    let _service_extraInitializers = [];
                    var App = _classThis = class {
                        constructor() {
                            this.service = __runInitializers(this, _service_initializers, void 0);
                            __runInitializers(this, _service_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "App");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _service_decorators = [(0, core_1.ViewChild)(MyDirective, { read: Alias })];
                        __esDecorate(null, null, _service_decorators, { kind: "field", name: "service", static: false, private: false, access: { has: obj => "service" in obj, get: obj => obj.service, set: (obj, value) => { obj.service = value; } }, metadata: _metadata }, _service_initializers, _service_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        App = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return App = _classThis;
                })();
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fixture.componentInstance.service).toBe(directive.service);
            });
        });
    });
    it('should restore queries if view changes', () => {
        let SomeDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[someDir]',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var SomeDir = _classThis = class {
                constructor(vcr, temp) {
                    this.vcr = vcr;
                    this.temp = temp;
                    this.vcr.createEmbeddedView(this.temp);
                }
            };
            __setFunctionName(_classThis, "SomeDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SomeDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SomeDir = _classThis;
        })();
        let AppComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'app',
                    template: `
        <div *someDir></div>
        <div #foo></div>
      `,
                    imports: [SomeDir],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _query_decorators;
            let _query_initializers = [];
            let _query_extraInitializers = [];
            var AppComponent = _classThis = class {
                constructor() {
                    this.query = __runInitializers(this, _query_initializers, void 0);
                    __runInitializers(this, _query_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "AppComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _query_decorators = [(0, core_1.ViewChildren)('foo')];
                __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                AppComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return AppComponent = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        expect(fixture.componentInstance.query.length).toBe(1);
    });
});
