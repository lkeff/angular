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
const testing_1 = require("@angular/core/testing");
const platform_server_1 = require("@angular/platform-server");
const basic_1 = require("app_built/src/basic");
const dep_1 = require("app_built/src/dep");
const hierarchy_1 = require("app_built/src/hierarchy");
const root_1 = require("app_built/src/root");
const self_1 = require("app_built/src/self");
const string_1 = require("app_built/src/string");
const token_1 = require("app_built/src/token");
describe('ngInjectableDef Bazel Integration', () => {
    it('works in AOT', (done) => {
        (0, platform_server_1.renderModule)(basic_1.BasicAppModule, {
            document: '<id-app></id-app>',
            url: '/',
        }).then((html) => {
            expect(html).toMatch(/>0:0<\//);
            done();
        });
    });
    it('@Self() works in component hierarchies', (done) => {
        (0, platform_server_1.renderModule)(hierarchy_1.HierarchyAppModule, {
            document: '<hierarchy-app></hierarchy-app>',
            url: '/',
        }).then((html) => {
            expect(html).toMatch(/>false<\//);
            done();
        });
    });
    it('@Optional() Self() resolves to @Injectable() scoped service', (done) => {
        (0, platform_server_1.renderModule)(self_1.SelfAppModule, {
            document: '<self-app></self-app>',
            url: '/',
        }).then((html) => {
            expect(html).toMatch(/>true<\//);
            done();
        });
    });
    it('InjectionToken ngInjectableDef works', (done) => {
        (0, platform_server_1.renderModule)(token_1.TokenAppModule, {
            document: '<token-app></token-app>',
            url: '/',
        }).then((html) => {
            expect(html).toMatch(/>fromToken<\//);
            done();
        });
    });
    it('APP_ROOT_SCOPE works', (done) => {
        (0, platform_server_1.renderModule)(root_1.RootAppModule, {
            document: '<root-app></root-app>',
            url: '/',
        }).then((html) => {
            expect(html).toMatch(/>true:false<\//);
            done();
        });
    });
    it('can inject dependencies', (done) => {
        (0, platform_server_1.renderModule)(dep_1.DepAppModule, {
            document: '<dep-app></dep-app>',
            url: '/',
        }).then((html) => {
            expect(html).toMatch(/>true<\//);
            done();
        });
    });
    it('string tokens work', (done) => {
        (0, platform_server_1.renderModule)(string_1.StringAppModule, {
            document: '<string-app></string-app>',
            url: '/',
        }).then((html) => {
            expect(html).toMatch(/>works<\//);
            done();
        });
    });
    it('allows provider override in JIT for root-scoped @Injectables', () => {
        let Service = (() => {
            let _classDecorators = [(0, core_1.Injectable)({
                    providedIn: 'root',
                    useValue: new Service('default'),
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Service = _classThis = class {
                constructor(value) {
                    this.value = value;
                }
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
        testing_1.TestBed.configureTestingModule({});
        testing_1.TestBed.overrideProvider(Service, { useValue: new Service('overridden') });
        expect(testing_1.TestBed.inject(Service).value).toEqual('overridden');
    });
    it('allows provider override in JIT for module-scoped @Injectables', () => {
        let Module = (() => {
            let _classDecorators = [(0, core_1.NgModule)()];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Module = _classThis = class {
            };
            __setFunctionName(_classThis, "Module");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Module = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Module = _classThis;
        })();
        let Service = (() => {
            let _classDecorators = [(0, core_1.Injectable)({
                    providedIn: Module,
                    useValue: new Service('default'),
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Service = _classThis = class {
                constructor(value) {
                    this.value = value;
                }
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
        testing_1.TestBed.configureTestingModule({
            imports: [Module],
        });
        testing_1.TestBed.overrideProvider(Service, { useValue: new Service('overridden') });
        expect(testing_1.TestBed.inject(Service).value).toEqual('overridden');
    });
    it('does not override existing ɵprov', () => {
        let Service = (() => {
            let _classDecorators = [(0, core_1.Injectable)({
                    providedIn: 'root',
                    useValue: new Service(false),
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Service = _classThis = class {
                constructor(value) {
                    this.value = value;
                }
            };
            __setFunctionName(_classThis, "Service");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Service = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            })();
            _classThis.ɵprov = {
                providedIn: 'root',
                factory: () => new Service(true),
                token: Service,
            };
            (() => {
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Service = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({});
        expect(testing_1.TestBed.inject(Service).value).toEqual(true);
    });
    it('does not override existing ɵprov in case of inheritance', () => {
        let ParentService = (() => {
            let _classDecorators = [(0, core_1.Injectable)({
                    providedIn: 'root',
                    useValue: new ParentService(false),
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ParentService = _classThis = class {
                constructor(value) {
                    this.value = value;
                }
            };
            __setFunctionName(_classThis, "ParentService");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ParentService = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ParentService = _classThis;
        })();
        // ChildServices extends ParentService but does not have @Injectable
        class ChildService extends ParentService {
        }
        testing_1.TestBed.configureTestingModule({});
        // We are asserting that system throws an error, rather than taking the inherited annotation.
        expect(() => testing_1.TestBed.inject(ChildService).value).toThrowError(/ChildService/);
    });
    it('NgModule injector understands requests for INJECTABLE', () => {
        testing_1.TestBed.configureTestingModule({
            providers: [{ provide: 'foo', useValue: 'bar' }],
        });
        expect(testing_1.TestBed.inject(core_1.INJECTOR).get('foo')).toEqual('bar');
    });
    it('Component injector understands requests for INJECTABLE', () => {
        let TestCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test-cmp',
                    template: 'test',
                    providers: [{ provide: 'foo', useValue: 'bar' }],
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
        testing_1.TestBed.configureTestingModule({
            declarations: [TestCmp],
        });
        const fixture = testing_1.TestBed.createComponent(TestCmp);
        expect(fixture.componentRef.injector.get(core_1.INJECTOR).get('foo')).toEqual('bar');
    });
});
