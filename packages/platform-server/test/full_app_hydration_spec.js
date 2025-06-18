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
require("@angular/localize/init");
const common_1 = require("@angular/common");
const testing_1 = require("@angular/common/testing");
const compiler_1 = require("@angular/compiler");
const core_1 = require("@angular/core");
const ng_zone_1 = require("@angular/core/src/zone/ng_zone");
const testing_2 = require("@angular/core/testing");
const localize_1 = require("@angular/localize");
const platform_browser_1 = require("@angular/platform-browser");
const router_1 = require("@angular/router");
const dom_utils_1 = require("./dom_utils");
const hydration_utils_1 = require("./hydration_utils");
const api_1 = require("@angular/core/src/hydration/api");
describe('platform-server full application hydration integration', () => {
    beforeEach(() => {
        (0, hydration_utils_1.resetNgDevModeCounters)();
    });
    afterEach(() => {
        (0, core_1.destroyPlatform)();
    });
    describe('hydration', () => {
        let doc;
        beforeEach(() => {
            doc = testing_2.TestBed.inject(common_1.DOCUMENT);
            (0, hydration_utils_1.clearConsole)(testing_2.TestBed.inject(core_1.ApplicationRef));
        });
        afterEach(() => {
            (0, dom_utils_1.clearDocument)(doc);
            (0, hydration_utils_1.clearConsole)(testing_2.TestBed.inject(core_1.ApplicationRef));
        });
        describe('annotations', () => {
            it('should add hydration annotations to component host nodes during ssr', () => __awaiter(void 0, void 0, void 0, function* () {
                let NestedComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'nested',
                            template: 'This is a nested component.',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var NestedComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "NestedComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        NestedComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return NestedComponent = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [NestedComponent],
                            template: `
            <nested />
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                expect(ssrContents).toContain(`<nested ${hydration_utils_1.NGH_ATTR_NAME}`);
            }));
            it('should skip local ref slots while producing hydration annotations', () => __awaiter(void 0, void 0, void 0, function* () {
                let NestedComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'nested',
                            template: 'This is a nested component.',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var NestedComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "NestedComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        NestedComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return NestedComponent = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [NestedComponent],
                            template: `
            <div #localRef></div>
            <nested />
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                expect(ssrContents).toContain(`<nested ${hydration_utils_1.NGH_ATTR_NAME}`);
            }));
            it('should skip embedded views from an ApplicationRef during annotation', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            template: `
            <ng-template #tmpl>Hi!</ng-template>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _tmplRef_decorators;
                    let _tmplRef_initializers = [];
                    let _tmplRef_extraInitializers = [];
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.tmplRef = __runInitializers(this, _tmplRef_initializers, void 0);
                            this.appRef = (__runInitializers(this, _tmplRef_extraInitializers), (0, core_1.inject)(core_1.ApplicationRef));
                        }
                        ngAfterViewInit() {
                            const viewRef = this.tmplRef.createEmbeddedView({});
                            this.appRef.attachView(viewRef);
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _tmplRef_decorators = [(0, core_1.ViewChild)('tmpl', { read: core_1.TemplateRef })];
                        __esDecorate(null, null, _tmplRef_decorators, { kind: "field", name: "tmplRef", static: false, private: false, access: { has: obj => "tmplRef" in obj, get: obj => obj.tmplRef, set: (obj, value) => { obj.tmplRef = value; } }, metadata: _metadata }, _tmplRef_initializers, _tmplRef_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
            }));
        });
        describe('server rendering', () => {
            it('should wipe out existing host element content when server side rendering', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            template: `
            <div>Some content</div>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const extraChildNodes = '<!--comment--> Some text! <b>and a tag</b>';
                const doc = `<html><head></head><body><app>${extraChildNodes}</app></body></html>`;
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { doc });
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                // We expect that the existing content of the host node is fully removed.
                expect(ssrContents).not.toContain(extraChildNodes);
                expect(ssrContents).toContain('<app ngh="0"><div>Some content</div></app>');
            }));
        });
        describe('hydration', () => {
            it('should remove ngh attributes after hydration on the client', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            template: 'Hi!',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const appHostNode = compRef.location.nativeElement;
                expect(appHostNode.getAttribute(hydration_utils_1.NGH_ATTR_NAME)).toBeNull();
            }));
            describe('basic scenarios', () => {
                it('should support text-only contents', () => __awaiter(void 0, void 0, void 0, function* () {
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'app',
                                template: `
              This is hydrated content.
            `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    const clientRootNode = compRef.location.nativeElement;
                    (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                    (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                }));
                it('should hydrate root components with empty templates', () => __awaiter(void 0, void 0, void 0, function* () {
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'app',
                                template: '',
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    const clientRootNode = compRef.location.nativeElement;
                    (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                    (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                }));
                it('should hydrate child components with empty templates', () => __awaiter(void 0, void 0, void 0, function* () {
                    let ChildComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'child',
                                template: '',
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var ChildComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "ChildComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            ChildComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return ChildComponent = _classThis;
                    })();
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                imports: [ChildComponent],
                                selector: 'app',
                                template: '<child />',
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent, ChildComponent);
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    const clientRootNode = compRef.location.nativeElement;
                    (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                    (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                }));
                it('should support a single text interpolation', () => __awaiter(void 0, void 0, void 0, function* () {
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'app',
                                template: `
              {{ text }}
            `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                            constructor() {
                                this.text = 'text';
                            }
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    const clientRootNode = compRef.location.nativeElement;
                    (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                    (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                }));
                it('should support text and HTML elements', () => __awaiter(void 0, void 0, void 0, function* () {
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'app',
                                template: `
              <header>Header</header>
              <main>This is hydrated content in the main element.</main>
              <footer>Footer</footer>
            `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    const clientRootNode = compRef.location.nativeElement;
                    (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                    (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                }));
                it('should support text and HTML elements in nested components', () => __awaiter(void 0, void 0, void 0, function* () {
                    let NestedComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'nested-cmp',
                                template: `
              <h1>Hello World!</h1>
              <div>This is the content of a nested component</div>
            `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var NestedComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "NestedComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            NestedComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return NestedComponent = _classThis;
                    })();
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'app',
                                imports: [NestedComponent],
                                template: `
              <header>Header</header>
              <nested-cmp />
              <footer>Footer</footer>
            `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent, NestedComponent);
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                        envProviders: [(0, hydration_utils_1.withDebugConsole)()],
                    });
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    // Make sure there are no extra logs in case
                    // default NgZone is setup for an application.
                    (0, hydration_utils_1.verifyHasNoLog)(appRef, 'NG05000: Angular detected that hydration was enabled for an application ' +
                        'that uses a custom or a noop Zone.js implementation.');
                    const clientRootNode = compRef.location.nativeElement;
                    (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                    (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                }));
                it('should support elements with local refs', () => __awaiter(void 0, void 0, void 0, function* () {
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'app',
                                template: `
              <header #headerRef>Header</header>
              <main #mainRef>This is hydrated content in the main element.</main>
              <footer #footerRef>Footer</footer>
            `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    const clientRootNode = compRef.location.nativeElement;
                    (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                    (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                }));
                it('should handle extra child nodes within a root app component', () => __awaiter(void 0, void 0, void 0, function* () {
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'app',
                                template: `
              <div>Some content</div>
            `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const extraChildNodes = '<!--comment--> Some text! <b>and a tag</b>';
                    const docContent = `<html><head></head><body><app>${extraChildNodes}</app></body></html>`;
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { doc: docContent });
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    const clientRootNode = compRef.location.nativeElement;
                    (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                    (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                }));
            });
            describe('ng-container', () => {
                it('should support empty containers', () => __awaiter(void 0, void 0, void 0, function* () {
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'app',
                                template: `
              This is an empty container: <ng-container></ng-container>
            `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    const clientRootNode = compRef.location.nativeElement;
                    (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                    (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                }));
                it('should support non-empty containers', () => __awaiter(void 0, void 0, void 0, function* () {
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'app',
                                template: `
              This is a non-empty container:
              <ng-container>
                <h1>Hello world!</h1>
              </ng-container>
              <div>Post-container element</div>
            `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    const clientRootNode = compRef.location.nativeElement;
                    (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                    (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                }));
                it('should support nested containers', () => __awaiter(void 0, void 0, void 0, function* () {
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'app',
                                template: `
              This is a non-empty container:
              <ng-container>
                <ng-container>
                  <ng-container>
                    <h1>Hello world!</h1>
                  </ng-container>
                </ng-container>
              </ng-container>
              <div>Post-container element</div>
              <ng-container>
                <div>Tags between containers</div>
                <ng-container>
                  <div>More tags between containers</div>
                  <ng-container>
                    <h1>Hello world!</h1>
                  </ng-container>
                </ng-container>
              </ng-container>
            `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    const clientRootNode = compRef.location.nativeElement;
                    (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                    (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                }));
                it('should support element containers with *ngIf', () => __awaiter(void 0, void 0, void 0, function* () {
                    let Cmp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'cmp',
                                standalone: true,
                                template: 'Hi!',
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Cmp = _classThis = class {
                        };
                        __setFunctionName(_classThis, "Cmp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            Cmp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return Cmp = _classThis;
                    })();
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'app',
                                imports: [common_1.NgIf],
                                template: `
              <ng-container *ngIf="true">
                <div #inner></div>
              </ng-container>
              <ng-template #outer />
            `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        let _inner_decorators;
                        let _inner_initializers = [];
                        let _inner_extraInitializers = [];
                        let _outer_decorators;
                        let _outer_initializers = [];
                        let _outer_extraInitializers = [];
                        var SimpleComponent = _classThis = class {
                            ngAfterViewInit() {
                                this.inner.createComponent(Cmp);
                                this.outer.createComponent(Cmp);
                            }
                            constructor() {
                                this.inner = __runInitializers(this, _inner_initializers, void 0);
                                this.outer = (__runInitializers(this, _inner_extraInitializers), __runInitializers(this, _outer_initializers, void 0));
                                __runInitializers(this, _outer_extraInitializers);
                            }
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            _inner_decorators = [(0, core_1.ViewChild)('inner', { read: core_1.ViewContainerRef })];
                            _outer_decorators = [(0, core_1.ViewChild)('outer', { read: core_1.ViewContainerRef })];
                            __esDecorate(null, null, _inner_decorators, { kind: "field", name: "inner", static: false, private: false, access: { has: obj => "inner" in obj, get: obj => obj.inner, set: (obj, value) => { obj.inner = value; } }, metadata: _metadata }, _inner_initializers, _inner_extraInitializers);
                            __esDecorate(null, null, _outer_decorators, { kind: "field", name: "outer", static: false, private: false, access: { has: obj => "outer" in obj, get: obj => obj.outer, set: (obj, value) => { obj.outer = value; } }, metadata: _metadata }, _outer_initializers, _outer_extraInitializers);
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent, Cmp);
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    const clientRootNode = compRef.location.nativeElement;
                    (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                    (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                }));
            });
            describe('view containers', () => {
                describe('*ngIf', () => {
                    it('should work with *ngIf on ng-container nodes', () => __awaiter(void 0, void 0, void 0, function* () {
                        let SimpleComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    standalone: true,
                                    selector: 'app',
                                    imports: [common_1.NgIf],
                                    template: `
              This is a non-empty container:
              <ng-container *ngIf="true">
                <h1>Hello world!</h1>
              </ng-container>
              <div>Post-container element</div>
            `,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var SimpleComponent = _classThis = class {
                            };
                            __setFunctionName(_classThis, "SimpleComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                SimpleComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return SimpleComponent = _classThis;
                        })();
                        const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                        const ssrContents = (0, dom_utils_1.getAppContents)(html);
                        expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                        (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                        const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                        const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                        appRef.tick();
                        const clientRootNode = compRef.location.nativeElement;
                        (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                        (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                    }));
                    it('should work with empty containers on ng-container nodes', () => __awaiter(void 0, void 0, void 0, function* () {
                        let SimpleComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    standalone: true,
                                    selector: 'app',
                                    imports: [common_1.NgIf],
                                    template: `
                This is an empty container:
                <ng-container *ngIf="false" />
                <div>Post-container element</div>
              `,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var SimpleComponent = _classThis = class {
                            };
                            __setFunctionName(_classThis, "SimpleComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                SimpleComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return SimpleComponent = _classThis;
                        })();
                        const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                        const ssrContents = (0, dom_utils_1.getAppContents)(html);
                        expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                        (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                        const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                        const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                        appRef.tick();
                        const clientRootNode = compRef.location.nativeElement;
                        (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                        (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                    }));
                    it('should work with *ngIf on element nodes', () => __awaiter(void 0, void 0, void 0, function* () {
                        let SimpleComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    standalone: true,
                                    selector: 'app',
                                    imports: [common_1.NgIf],
                                    template: `
              <h1 *ngIf="true">Hello world!</h1>
            `,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var SimpleComponent = _classThis = class {
                            };
                            __setFunctionName(_classThis, "SimpleComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                SimpleComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return SimpleComponent = _classThis;
                        })();
                        const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                        const ssrContents = (0, dom_utils_1.getAppContents)(html);
                        expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                        (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                        const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                        const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                        appRef.tick();
                        const clientRootNode = compRef.location.nativeElement;
                        (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                        (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                    }));
                    it('should work with empty containers on element nodes', () => __awaiter(void 0, void 0, void 0, function* () {
                        let SimpleComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    standalone: true,
                                    selector: 'app',
                                    imports: [common_1.NgIf],
                                    template: `
                <h1 *ngIf="false">Hello world!</h1>
              `,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var SimpleComponent = _classThis = class {
                            };
                            __setFunctionName(_classThis, "SimpleComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                SimpleComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return SimpleComponent = _classThis;
                        })();
                        const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                        const ssrContents = (0, dom_utils_1.getAppContents)(html);
                        expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                        (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                        const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                        const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                        appRef.tick();
                        const clientRootNode = compRef.location.nativeElement;
                        (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                        (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                    }));
                    it('should work with *ngIf on component host nodes', () => __awaiter(void 0, void 0, void 0, function* () {
                        let NestedComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    standalone: true,
                                    selector: 'nested-cmp',
                                    imports: [common_1.NgIf],
                                    template: `
              <h1 *ngIf="true">Hello World!</h1>
            `,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var NestedComponent = _classThis = class {
                            };
                            __setFunctionName(_classThis, "NestedComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                NestedComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return NestedComponent = _classThis;
                        })();
                        let SimpleComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    standalone: true,
                                    selector: 'app',
                                    imports: [common_1.NgIf, NestedComponent],
                                    template: `
              This is a component:
              <nested-cmp *ngIf="true" />
              <div>Post-container element</div>
            `,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var SimpleComponent = _classThis = class {
                            };
                            __setFunctionName(_classThis, "SimpleComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                SimpleComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return SimpleComponent = _classThis;
                        })();
                        const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                        const ssrContents = (0, dom_utils_1.getAppContents)(html);
                        expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                        (0, dom_utils_1.resetTViewsFor)(SimpleComponent, NestedComponent);
                        const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                        const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                        appRef.tick();
                        const clientRootNode = compRef.location.nativeElement;
                        (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                        (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                    }));
                    it('should support nested *ngIfs', () => __awaiter(void 0, void 0, void 0, function* () {
                        let SimpleComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    standalone: true,
                                    selector: 'app',
                                    imports: [common_1.NgIf],
                                    template: `
              This is a non-empty container:
              <ng-container *ngIf="true">
                <h1 *ngIf="true">
                  <span *ngIf="true">Hello world!</span>
                </h1>
              </ng-container>
              <div>Post-container element</div>
            `,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var SimpleComponent = _classThis = class {
                            };
                            __setFunctionName(_classThis, "SimpleComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                SimpleComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return SimpleComponent = _classThis;
                        })();
                        const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                        const ssrContents = (0, dom_utils_1.getAppContents)(html);
                        expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                        (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                        const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                        const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                        appRef.tick();
                        const clientRootNode = compRef.location.nativeElement;
                        (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                        (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                    }));
                });
                describe('*ngFor', () => {
                    it('should support *ngFor on <ng-container> nodes', () => __awaiter(void 0, void 0, void 0, function* () {
                        let SimpleComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    standalone: true,
                                    selector: 'app',
                                    imports: [common_1.NgIf, common_1.NgFor],
                                    template: `
              <ng-container *ngFor="let item of items">
                <h1 *ngIf="true">Item #{{ item }}</h1>
              </ng-container>
              <div>Post-container element</div>
            `,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var SimpleComponent = _classThis = class {
                                constructor() {
                                    this.items = [1, 2, 3];
                                }
                            };
                            __setFunctionName(_classThis, "SimpleComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                SimpleComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return SimpleComponent = _classThis;
                        })();
                        const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                        const ssrContents = (0, dom_utils_1.getAppContents)(html);
                        expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                        // Check whether serialized hydration info has a multiplier
                        // (which avoids repeated views serialization).
                        const hydrationInfo = (0, hydration_utils_1.getHydrationInfoFromTransferState)(ssrContents);
                        expect(hydrationInfo).toContain('"x":3');
                        (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                        const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                        const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                        appRef.tick();
                        const clientRootNode = compRef.location.nativeElement;
                        (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                        (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                    }));
                    it('should support *ngFor on element nodes', () => __awaiter(void 0, void 0, void 0, function* () {
                        let SimpleComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    standalone: true,
                                    selector: 'app',
                                    imports: [common_1.NgIf, common_1.NgFor],
                                    template: `
                <div *ngFor="let item of items">
                  <h1 *ngIf="true">Item #{{ item }}</h1>
                </div>
                <div>Post-container element</div>
              `,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var SimpleComponent = _classThis = class {
                                constructor() {
                                    this.items = [1, 2, 3];
                                }
                            };
                            __setFunctionName(_classThis, "SimpleComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                SimpleComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return SimpleComponent = _classThis;
                        })();
                        const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                        const ssrContents = (0, dom_utils_1.getAppContents)(html);
                        expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                        // Check whether serialized hydration info has a multiplier
                        // (which avoids repeated views serialization).
                        const hydrationInfo = (0, hydration_utils_1.getHydrationInfoFromTransferState)(ssrContents);
                        expect(hydrationInfo).toContain('"x":3');
                        (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                        const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                        const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                        appRef.tick();
                        const clientRootNode = compRef.location.nativeElement;
                        (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                        (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                    }));
                    it('should support *ngFor on host component nodes', () => __awaiter(void 0, void 0, void 0, function* () {
                        let NestedComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    standalone: true,
                                    selector: 'nested-cmp',
                                    imports: [common_1.NgIf],
                                    template: `
              <h1 *ngIf="true">Hello World!</h1>
            `,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var NestedComponent = _classThis = class {
                            };
                            __setFunctionName(_classThis, "NestedComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                NestedComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return NestedComponent = _classThis;
                        })();
                        let SimpleComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    standalone: true,
                                    selector: 'app',
                                    imports: [common_1.NgIf, common_1.NgFor, NestedComponent],
                                    template: `
              <nested-cmp *ngFor="let item of items" />
              <div>Post-container element</div>
            `,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var SimpleComponent = _classThis = class {
                                constructor() {
                                    this.items = [1, 2, 3];
                                }
                            };
                            __setFunctionName(_classThis, "SimpleComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                SimpleComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return SimpleComponent = _classThis;
                        })();
                        const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                        const ssrContents = (0, dom_utils_1.getAppContents)(html);
                        expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                        // Check whether serialized hydration info has a multiplier
                        // (which avoids repeated views serialization).
                        const hydrationInfo = (0, hydration_utils_1.getHydrationInfoFromTransferState)(ssrContents);
                        expect(hydrationInfo).toContain('"x":3');
                        (0, dom_utils_1.resetTViewsFor)(SimpleComponent, NestedComponent);
                        const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                        const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                        appRef.tick();
                        const clientRootNode = compRef.location.nativeElement;
                        (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                        (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                    }));
                    it('should support compact serialization for *ngFor', () => __awaiter(void 0, void 0, void 0, function* () {
                        let SimpleComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    standalone: true,
                                    selector: 'app',
                                    imports: [common_1.NgIf, common_1.NgFor],
                                    template: `
                <div *ngFor="let number of numbers">
                  Number {{ number }}
                  <ng-container *ngIf="number >= 0 && number < 5">is in [0, 5) range.</ng-container>
                  <ng-container *ngIf="number >= 5 && number < 8">is in [5, 8) range.</ng-container>
                  <ng-container *ngIf="number >= 8 && number < 10">is in [8, 10) range.</ng-container>
                </div>
              `,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var SimpleComponent = _classThis = class {
                                constructor() {
                                    this.numbers = [...Array(10).keys()]; // [0..9]
                                }
                            };
                            __setFunctionName(_classThis, "SimpleComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                SimpleComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return SimpleComponent = _classThis;
                        })();
                        const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                        const ssrContents = (0, dom_utils_1.getAppContents)(html);
                        expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                        // Check whether serialized hydration info has multipliers
                        // (which avoids repeated views serialization).
                        const hydrationInfo = (0, hydration_utils_1.getHydrationInfoFromTransferState)(ssrContents);
                        expect(hydrationInfo).toContain('"x":5'); // [0, 5) range, 5 views
                        expect(hydrationInfo).toContain('"x":3'); // [5, 8) range, 3 views
                        expect(hydrationInfo).toContain('"x":2'); // [8, 10) range, 2 views
                        (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                        const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                        const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                        appRef.tick();
                        const clientRootNode = compRef.location.nativeElement;
                        (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                        (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                    }));
                });
                describe('*ngComponentOutlet', () => {
                    it('should support hydration on <ng-container> nodes', () => __awaiter(void 0, void 0, void 0, function* () {
                        let NestedComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    standalone: true,
                                    selector: 'nested-cmp',
                                    imports: [common_1.NgIf],
                                    template: `
                <h1 *ngIf="true">Hello World!</h1>
              `,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var NestedComponent = _classThis = class {
                            };
                            __setFunctionName(_classThis, "NestedComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                NestedComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return NestedComponent = _classThis;
                        })();
                        let SimpleComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    standalone: true,
                                    selector: 'app',
                                    imports: [common_1.NgComponentOutlet],
                                    template: `
                <ng-container *ngComponentOutlet="NestedComponent" />`,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var SimpleComponent = _classThis = class {
                                constructor() {
                                    // This field is necessary to expose
                                    // the `NestedComponent` to the template.
                                    this.NestedComponent = NestedComponent;
                                }
                            };
                            __setFunctionName(_classThis, "SimpleComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                SimpleComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return SimpleComponent = _classThis;
                        })();
                        const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                        const ssrContents = (0, dom_utils_1.getAppContents)(html);
                        expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                        (0, dom_utils_1.resetTViewsFor)(SimpleComponent, NestedComponent);
                        const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                        const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                        appRef.tick();
                        const clientRootNode = compRef.location.nativeElement;
                        (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                        (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                    }));
                    it('should support hydration on element nodes', () => __awaiter(void 0, void 0, void 0, function* () {
                        let NestedComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    standalone: true,
                                    selector: 'nested-cmp',
                                    imports: [common_1.NgIf],
                                    template: `
                <h1 *ngIf="true">Hello World!</h1>
              `,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var NestedComponent = _classThis = class {
                            };
                            __setFunctionName(_classThis, "NestedComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                NestedComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return NestedComponent = _classThis;
                        })();
                        let SimpleComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    standalone: true,
                                    selector: 'app',
                                    imports: [common_1.NgComponentOutlet],
                                    template: `
                <div *ngComponentOutlet="NestedComponent"></div>
              `,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var SimpleComponent = _classThis = class {
                                constructor() {
                                    // This field is necessary to expose
                                    // the `NestedComponent` to the template.
                                    this.NestedComponent = NestedComponent;
                                }
                            };
                            __setFunctionName(_classThis, "SimpleComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                SimpleComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return SimpleComponent = _classThis;
                        })();
                        const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                        const ssrContents = (0, dom_utils_1.getAppContents)(html);
                        expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                        (0, dom_utils_1.resetTViewsFor)(SimpleComponent, NestedComponent);
                        const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                        const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                        appRef.tick();
                        const clientRootNode = compRef.location.nativeElement;
                        (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                        (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                    }));
                    it('should support hydration for nested components', () => __awaiter(void 0, void 0, void 0, function* () {
                        let NestedComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    standalone: true,
                                    selector: 'nested-cmp',
                                    imports: [common_1.NgIf],
                                    template: `
                <h1 *ngIf="true">Hello World!</h1>
              `,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var NestedComponent = _classThis = class {
                            };
                            __setFunctionName(_classThis, "NestedComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                NestedComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return NestedComponent = _classThis;
                        })();
                        let OtherNestedComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    standalone: true,
                                    selector: 'other-nested-cmp',
                                    imports: [common_1.NgComponentOutlet],
                                    template: `
                <ng-container *ngComponentOutlet="NestedComponent" />`,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var OtherNestedComponent = _classThis = class {
                                constructor() {
                                    // This field is necessary to expose
                                    // the `NestedComponent` to the template.
                                    this.NestedComponent = NestedComponent;
                                }
                            };
                            __setFunctionName(_classThis, "OtherNestedComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                OtherNestedComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return OtherNestedComponent = _classThis;
                        })();
                        let SimpleComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    standalone: true,
                                    selector: 'app',
                                    imports: [common_1.NgComponentOutlet],
                                    template: `
                <ng-container *ngComponentOutlet="OtherNestedComponent" />`,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var SimpleComponent = _classThis = class {
                                constructor() {
                                    // This field is necessary to expose
                                    // the `OtherNestedComponent` to the template.
                                    this.OtherNestedComponent = OtherNestedComponent;
                                }
                            };
                            __setFunctionName(_classThis, "SimpleComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                SimpleComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return SimpleComponent = _classThis;
                        })();
                        const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                        const ssrContents = (0, dom_utils_1.getAppContents)(html);
                        expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                        (0, dom_utils_1.resetTViewsFor)(SimpleComponent, NestedComponent, OtherNestedComponent);
                        const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                        const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                        appRef.tick();
                        const clientRootNode = compRef.location.nativeElement;
                        (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                        (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                    }));
                });
                describe('*ngTemplateOutlet', () => {
                    it('should work with <ng-container>', () => __awaiter(void 0, void 0, void 0, function* () {
                        let SimpleComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    standalone: true,
                                    selector: 'app',
                                    imports: [common_1.NgTemplateOutlet],
                                    template: `
                <ng-template #tmpl>
                  This is a content of the template!
                </ng-template>
                <ng-container [ngTemplateOutlet]="tmpl"></ng-container>
              `,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var SimpleComponent = _classThis = class {
                            };
                            __setFunctionName(_classThis, "SimpleComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                SimpleComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return SimpleComponent = _classThis;
                        })();
                        const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                        const ssrContents = (0, dom_utils_1.getAppContents)(html);
                        expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                        (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                        const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                        const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                        appRef.tick();
                        const clientRootNode = compRef.location.nativeElement;
                        (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                        (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                    }));
                    it('should work with element nodes', () => __awaiter(void 0, void 0, void 0, function* () {
                        let SimpleComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    standalone: true,
                                    selector: 'app',
                                    imports: [common_1.NgTemplateOutlet],
                                    template: `
                <ng-template #tmpl>
                  This is a content of the template!
                </ng-template>
                <div [ngTemplateOutlet]="tmpl"></div>
                <div>Some extra content</div>
              `,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var SimpleComponent = _classThis = class {
                            };
                            __setFunctionName(_classThis, "SimpleComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                SimpleComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return SimpleComponent = _classThis;
                        })();
                        const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                        const ssrContents = (0, dom_utils_1.getAppContents)(html);
                        expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                        (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                        const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                        const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                        appRef.tick();
                        const clientRootNode = compRef.location.nativeElement;
                        (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                        (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                    }));
                });
                describe('ViewContainerRef', () => {
                    it('should work with ViewContainerRef.createComponent', () => __awaiter(void 0, void 0, void 0, function* () {
                        let DynamicComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    standalone: true,
                                    selector: 'dynamic',
                                    template: `
                <span>This is a content of a dynamic component.</span>
              `,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var DynamicComponent = _classThis = class {
                            };
                            __setFunctionName(_classThis, "DynamicComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                DynamicComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return DynamicComponent = _classThis;
                        })();
                        let SimpleComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    standalone: true,
                                    selector: 'app',
                                    imports: [common_1.NgIf, common_1.NgFor],
                                    template: `
                <div #target></div>
                <main>Hi! This is the main content.</main>
              `,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            let _vcr_decorators;
                            let _vcr_initializers = [];
                            let _vcr_extraInitializers = [];
                            var SimpleComponent = _classThis = class {
                                ngAfterViewInit() {
                                    const compRef = this.vcr.createComponent(DynamicComponent);
                                    compRef.changeDetectorRef.detectChanges();
                                }
                                constructor() {
                                    this.vcr = __runInitializers(this, _vcr_initializers, void 0);
                                    __runInitializers(this, _vcr_extraInitializers);
                                }
                            };
                            __setFunctionName(_classThis, "SimpleComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                _vcr_decorators = [(0, core_1.ViewChild)('target', { read: core_1.ViewContainerRef })];
                                __esDecorate(null, null, _vcr_decorators, { kind: "field", name: "vcr", static: false, private: false, access: { has: obj => "vcr" in obj, get: obj => obj.vcr, set: (obj, value) => { obj.vcr = value; } }, metadata: _metadata }, _vcr_initializers, _vcr_extraInitializers);
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                SimpleComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return SimpleComponent = _classThis;
                        })();
                        const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                        const ssrContents = (0, dom_utils_1.getAppContents)(html);
                        expect(ssrContents).toContain('<app ngh');
                        (0, dom_utils_1.resetTViewsFor)(SimpleComponent, DynamicComponent);
                        const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                        const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                        appRef.tick();
                        const clientRootNode = compRef.location.nativeElement;
                        (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                        (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                    }));
                    it('should work with ViewContainerRef.createEmbeddedView', () => __awaiter(void 0, void 0, void 0, function* () {
                        let SimpleComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    standalone: true,
                                    selector: 'app',
                                    imports: [common_1.NgIf, common_1.NgFor],
                                    template: `
                <ng-template #tmpl>
                  <h1>This is a content of an ng-template.</h1>
                </ng-template>
                <ng-container #target></ng-container>
              `,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            let _vcr_decorators;
                            let _vcr_initializers = [];
                            let _vcr_extraInitializers = [];
                            let _tmpl_decorators;
                            let _tmpl_initializers = [];
                            let _tmpl_extraInitializers = [];
                            var SimpleComponent = _classThis = class {
                                ngAfterViewInit() {
                                    const viewRef = this.vcr.createEmbeddedView(this.tmpl);
                                    viewRef.detectChanges();
                                }
                                constructor() {
                                    this.vcr = __runInitializers(this, _vcr_initializers, void 0);
                                    this.tmpl = (__runInitializers(this, _vcr_extraInitializers), __runInitializers(this, _tmpl_initializers, void 0));
                                    __runInitializers(this, _tmpl_extraInitializers);
                                }
                            };
                            __setFunctionName(_classThis, "SimpleComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                _vcr_decorators = [(0, core_1.ViewChild)('target', { read: core_1.ViewContainerRef })];
                                _tmpl_decorators = [(0, core_1.ViewChild)('tmpl', { read: core_1.TemplateRef })];
                                __esDecorate(null, null, _vcr_decorators, { kind: "field", name: "vcr", static: false, private: false, access: { has: obj => "vcr" in obj, get: obj => obj.vcr, set: (obj, value) => { obj.vcr = value; } }, metadata: _metadata }, _vcr_initializers, _vcr_extraInitializers);
                                __esDecorate(null, null, _tmpl_decorators, { kind: "field", name: "tmpl", static: false, private: false, access: { has: obj => "tmpl" in obj, get: obj => obj.tmpl, set: (obj, value) => { obj.tmpl = value; } }, metadata: _metadata }, _tmpl_initializers, _tmpl_extraInitializers);
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                SimpleComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return SimpleComponent = _classThis;
                        })();
                        const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                        const ssrContents = (0, dom_utils_1.getAppContents)(html);
                        expect(ssrContents).toContain('<app ngh');
                        (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                        const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                        const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                        appRef.tick();
                        const clientRootNode = compRef.location.nativeElement;
                        (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                        (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                    }));
                    it('should hydrate dynamically created components using root component as an anchor', () => __awaiter(void 0, void 0, void 0, function* () {
                        let DynamicComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    standalone: true,
                                    imports: [common_1.CommonModule],
                                    selector: 'dynamic',
                                    template: `
                    <span>This is a content of a dynamic component.</span>
                  `,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var DynamicComponent = _classThis = class {
                            };
                            __setFunctionName(_classThis, "DynamicComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                DynamicComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return DynamicComponent = _classThis;
                        })();
                        let SimpleComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    standalone: true,
                                    selector: 'app',
                                    template: `
                    <main>Hi! This is the main content.</main>
                  `,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var SimpleComponent = _classThis = class {
                                constructor() {
                                    this.vcr = (0, core_1.inject)(core_1.ViewContainerRef);
                                }
                                ngAfterViewInit() {
                                    const compRef = this.vcr.createComponent(DynamicComponent);
                                    compRef.changeDetectorRef.detectChanges();
                                }
                            };
                            __setFunctionName(_classThis, "SimpleComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                SimpleComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return SimpleComponent = _classThis;
                        })();
                        const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                        const ssrContents = (0, dom_utils_1.getAppContents)(html);
                        expect(ssrContents).toContain('<app ngh');
                        (0, dom_utils_1.resetTViewsFor)(SimpleComponent, DynamicComponent);
                        const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                        const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                        appRef.tick();
                        // Compare output starting from the parent node above the component node,
                        // because component host node also acted as a ViewContainerRef anchor,
                        // thus there are elements after this node (as next siblings).
                        const clientRootNode = compRef.location.nativeElement.parentNode;
                        yield appRef.whenStable();
                        (0, hydration_utils_1.verifyAllChildNodesClaimedForHydration)(clientRootNode);
                        (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                    }));
                    it('should hydrate embedded views when using root component as an anchor', () => __awaiter(void 0, void 0, void 0, function* () {
                        let SimpleComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    standalone: true,
                                    selector: 'app',
                                    template: `
                <ng-template #tmpl>
                  <h1>Content of embedded view</h1>
                </ng-template>
                <main>Hi! This is the main content.</main>
              `,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            let _tmpl_decorators;
                            let _tmpl_initializers = [];
                            let _tmpl_extraInitializers = [];
                            var SimpleComponent = _classThis = class {
                                constructor() {
                                    this.tmpl = __runInitializers(this, _tmpl_initializers, void 0);
                                    this.vcr = (__runInitializers(this, _tmpl_extraInitializers), (0, core_1.inject)(core_1.ViewContainerRef));
                                }
                                ngAfterViewInit() {
                                    const viewRef = this.vcr.createEmbeddedView(this.tmpl);
                                    viewRef.detectChanges();
                                }
                            };
                            __setFunctionName(_classThis, "SimpleComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                _tmpl_decorators = [(0, core_1.ViewChild)('tmpl', { read: core_1.TemplateRef })];
                                __esDecorate(null, null, _tmpl_decorators, { kind: "field", name: "tmpl", static: false, private: false, access: { has: obj => "tmpl" in obj, get: obj => obj.tmpl, set: (obj, value) => { obj.tmpl = value; } }, metadata: _metadata }, _tmpl_initializers, _tmpl_extraInitializers);
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                SimpleComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return SimpleComponent = _classThis;
                        })();
                        const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                        const ssrContents = (0, dom_utils_1.getAppContents)(html);
                        expect(ssrContents).toContain('<app ngh');
                        (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                        const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                        const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                        appRef.tick();
                        // Compare output starting from the parent node above the component node,
                        // because component host node also acted as a ViewContainerRef anchor,
                        // thus there are elements after this node (as next siblings).
                        const clientRootNode = compRef.location.nativeElement.parentNode;
                        yield appRef.whenStable();
                        (0, hydration_utils_1.verifyAllChildNodesClaimedForHydration)(clientRootNode);
                        (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                    }));
                    it('should hydrate dynamically created components using root component as an anchor', () => __awaiter(void 0, void 0, void 0, function* () {
                        let NestedDynamicComponentA = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    standalone: true,
                                    imports: [common_1.CommonModule],
                                    selector: 'nested-dynamic-a',
                                    template: `
                    <p>NestedDynamicComponentA</p>
                  `,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var NestedDynamicComponentA = _classThis = class {
                            };
                            __setFunctionName(_classThis, "NestedDynamicComponentA");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                NestedDynamicComponentA = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return NestedDynamicComponentA = _classThis;
                        })();
                        let NestedDynamicComponentB = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    standalone: true,
                                    imports: [common_1.CommonModule],
                                    selector: 'nested-dynamic-b',
                                    template: `
                    <p>NestedDynamicComponentB</p>
                  `,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var NestedDynamicComponentB = _classThis = class {
                            };
                            __setFunctionName(_classThis, "NestedDynamicComponentB");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                NestedDynamicComponentB = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return NestedDynamicComponentB = _classThis;
                        })();
                        let DynamicComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    standalone: true,
                                    imports: [common_1.CommonModule],
                                    selector: 'dynamic',
                                    template: `
                    <span>This is a content of a dynamic component.</span>
                  `,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var DynamicComponent = _classThis = class {
                                constructor() {
                                    this.vcr = (0, core_1.inject)(core_1.ViewContainerRef);
                                }
                                ngAfterViewInit() {
                                    const compRef = this.vcr.createComponent(NestedDynamicComponentB);
                                    compRef.changeDetectorRef.detectChanges();
                                }
                            };
                            __setFunctionName(_classThis, "DynamicComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                DynamicComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return DynamicComponent = _classThis;
                        })();
                        let SimpleComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    standalone: true,
                                    selector: 'app',
                                    template: `
                    <main>Hi! This is the main content.</main>
                  `,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var SimpleComponent = _classThis = class {
                                constructor() {
                                    this.doc = (0, core_1.inject)(common_1.DOCUMENT);
                                    this.appRef = (0, core_1.inject)(core_1.ApplicationRef);
                                    this.elementRef = (0, core_1.inject)(core_1.ElementRef);
                                    this.viewContainerRef = (0, core_1.inject)(core_1.ViewContainerRef);
                                    this.environmentInjector = (0, core_1.inject)(core_1.EnvironmentInjector);
                                }
                                createOuterDynamicComponent() {
                                    const hostElement = this.doc.body.querySelector('[id=dynamic-cmp-target]');
                                    const compRef = (0, core_1.createComponent)(DynamicComponent, {
                                        hostElement,
                                        environmentInjector: this.environmentInjector,
                                    });
                                    compRef.changeDetectorRef.detectChanges();
                                    this.appRef.attachView(compRef.hostView);
                                }
                                createInnerDynamicComponent() {
                                    const compRef = this.viewContainerRef.createComponent(NestedDynamicComponentA);
                                    compRef.changeDetectorRef.detectChanges();
                                }
                                ngAfterViewInit() {
                                    this.createInnerDynamicComponent();
                                    this.createOuterDynamicComponent();
                                }
                            };
                            __setFunctionName(_classThis, "SimpleComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                SimpleComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return SimpleComponent = _classThis;
                        })();
                        // In this test we expect to have the following structure,
                        // where both root component nodes also act as ViewContainerRef
                        // anchors, i.e.:
                        // ```
                        //  <app />
                        //  <nested-dynamic-b />
                        //  <!--container-->
                        //  <div></div>  // Host element for DynamicComponent
                        //  <nested-dynamic-a/>
                        //  <!--container-->
                        // ```
                        // The test verifies that 2 root components acting as ViewContainerRef
                        // do not have overlaps in DOM elements that represent views and all
                        // DOM nodes are able to hydrate correctly.
                        const indexHtml = '<html><head></head><body>' +
                            '<app></app>' +
                            '<div id="dynamic-cmp-target"></div>' +
                            '</body></html>';
                        const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { doc: indexHtml });
                        const ssrContents = (0, dom_utils_1.getAppContents)(html);
                        expect(ssrContents).toContain('<app ngh');
                        (0, dom_utils_1.resetTViewsFor)(SimpleComponent, DynamicComponent);
                        const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                        const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                        appRef.tick();
                        // Compare output starting from the parent node above the component node,
                        // because component host node also acted as a ViewContainerRef anchor,
                        // thus there are elements after this node (as next siblings).
                        const clientRootNode = compRef.location.nativeElement.parentNode;
                        yield appRef.whenStable();
                        (0, hydration_utils_1.verifyAllChildNodesClaimedForHydration)(clientRootNode);
                        (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                    }));
                    it('should hydrate dynamically created components using ' +
                        "another component's host node as an anchor", () => __awaiter(void 0, void 0, void 0, function* () {
                        let AnotherDynamicComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    standalone: true,
                                    selector: 'another-dynamic',
                                    template: `<span>This is a content of another dynamic component.</span>`,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var AnotherDynamicComponent = _classThis = class {
                                constructor() {
                                    this.vcr = (0, core_1.inject)(core_1.ViewContainerRef);
                                }
                            };
                            __setFunctionName(_classThis, "AnotherDynamicComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                AnotherDynamicComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return AnotherDynamicComponent = _classThis;
                        })();
                        let DynamicComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    standalone: true,
                                    selector: 'dynamic',
                                    template: `<span>This is a content of a dynamic component.</span>`,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var DynamicComponent = _classThis = class {
                                constructor() {
                                    this.vcr = (0, core_1.inject)(core_1.ViewContainerRef);
                                }
                                ngAfterViewInit() {
                                    const compRef = this.vcr.createComponent(AnotherDynamicComponent);
                                    compRef.changeDetectorRef.detectChanges();
                                }
                            };
                            __setFunctionName(_classThis, "DynamicComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                DynamicComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return DynamicComponent = _classThis;
                        })();
                        let SimpleComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    standalone: true,
                                    selector: 'app',
                                    template: `<main>Hi! This is the main content.</main>`,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var SimpleComponent = _classThis = class {
                                constructor() {
                                    this.vcr = (0, core_1.inject)(core_1.ViewContainerRef);
                                }
                                ngAfterViewInit() {
                                    const compRef = this.vcr.createComponent(DynamicComponent);
                                    compRef.changeDetectorRef.detectChanges();
                                }
                            };
                            __setFunctionName(_classThis, "SimpleComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                SimpleComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return SimpleComponent = _classThis;
                        })();
                        const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                        const ssrContents = (0, dom_utils_1.getAppContents)(html);
                        expect(ssrContents).toContain('<app ngh');
                        (0, dom_utils_1.resetTViewsFor)(SimpleComponent, DynamicComponent);
                        const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                        const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                        appRef.tick();
                        // Compare output starting from the parent node above the component node,
                        // because component host node also acted as a ViewContainerRef anchor,
                        // thus there are elements after this node (as next siblings).
                        const clientRootNode = compRef.location.nativeElement.parentNode;
                        yield appRef.whenStable();
                        (0, hydration_utils_1.verifyAllChildNodesClaimedForHydration)(clientRootNode);
                        (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                    }));
                    it('should hydrate dynamically created embedded views using ' +
                        "another component's host node as an anchor", () => __awaiter(void 0, void 0, void 0, function* () {
                        let DynamicComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    standalone: true,
                                    selector: 'dynamic',
                                    template: `
                      <ng-template #tmpl>
                        <h1>Content of an embedded view</h1>
                      </ng-template>
                      <main>Hi! This is the dynamic component content.</main>
                    `,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            let _tmpl_decorators;
                            let _tmpl_initializers = [];
                            let _tmpl_extraInitializers = [];
                            var DynamicComponent = _classThis = class {
                                constructor() {
                                    this.tmpl = __runInitializers(this, _tmpl_initializers, void 0);
                                    this.vcr = (__runInitializers(this, _tmpl_extraInitializers), (0, core_1.inject)(core_1.ViewContainerRef));
                                }
                                ngAfterViewInit() {
                                    const viewRef = this.vcr.createEmbeddedView(this.tmpl);
                                    viewRef.detectChanges();
                                }
                            };
                            __setFunctionName(_classThis, "DynamicComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                _tmpl_decorators = [(0, core_1.ViewChild)('tmpl', { read: core_1.TemplateRef })];
                                __esDecorate(null, null, _tmpl_decorators, { kind: "field", name: "tmpl", static: false, private: false, access: { has: obj => "tmpl" in obj, get: obj => obj.tmpl, set: (obj, value) => { obj.tmpl = value; } }, metadata: _metadata }, _tmpl_initializers, _tmpl_extraInitializers);
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                DynamicComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return DynamicComponent = _classThis;
                        })();
                        let SimpleComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    standalone: true,
                                    selector: 'app',
                                    template: `<main>Hi! This is the main content.</main>`,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var SimpleComponent = _classThis = class {
                                constructor() {
                                    this.vcr = (0, core_1.inject)(core_1.ViewContainerRef);
                                }
                                ngAfterViewInit() {
                                    const compRef = this.vcr.createComponent(DynamicComponent);
                                    compRef.changeDetectorRef.detectChanges();
                                }
                            };
                            __setFunctionName(_classThis, "SimpleComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                SimpleComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return SimpleComponent = _classThis;
                        })();
                        const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                        const ssrContents = (0, dom_utils_1.getAppContents)(html);
                        expect(ssrContents).toContain('<app ngh');
                        (0, dom_utils_1.resetTViewsFor)(SimpleComponent, DynamicComponent);
                        const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                        const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                        appRef.tick();
                        // Compare output starting from the parent node above the component node,
                        // because component host node also acted as a ViewContainerRef anchor,
                        // thus there are elements after this node (as next siblings).
                        const clientRootNode = compRef.location.nativeElement.parentNode;
                        yield appRef.whenStable();
                        (0, hydration_utils_1.verifyAllChildNodesClaimedForHydration)(clientRootNode);
                        (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                    }));
                    it('should re-create the views from the ViewContainerRef ' +
                        'if there is a mismatch in template ids between the current view ' +
                        '(that is being created) and the first dehydrated view in the list', () => __awaiter(void 0, void 0, void 0, function* () {
                        let SimpleComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    standalone: true,
                                    selector: 'app',
                                    template: `
                    <ng-template #tmplH1>
                      <h1>Content of H1</h1>
                    </ng-template>
                    <ng-template #tmplH2>
                      <h2>Content of H2</h2>
                    </ng-template>
                    <ng-template #tmplH3>
                      <h3>Content of H3</h3>
                    </ng-template>
                    <p>Pre-container content</p>
                    <ng-container #target></ng-container>
                    <div>Post-container content</div>
                  `,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            let _vcr_decorators;
                            let _vcr_initializers = [];
                            let _vcr_extraInitializers = [];
                            let _tmplH1_decorators;
                            let _tmplH1_initializers = [];
                            let _tmplH1_extraInitializers = [];
                            let _tmplH2_decorators;
                            let _tmplH2_initializers = [];
                            let _tmplH2_extraInitializers = [];
                            let _tmplH3_decorators;
                            let _tmplH3_initializers = [];
                            let _tmplH3_extraInitializers = [];
                            var SimpleComponent = _classThis = class {
                                constructor() {
                                    this.vcr = __runInitializers(this, _vcr_initializers, void 0);
                                    this.tmplH1 = (__runInitializers(this, _vcr_extraInitializers), __runInitializers(this, _tmplH1_initializers, void 0));
                                    this.tmplH2 = (__runInitializers(this, _tmplH1_extraInitializers), __runInitializers(this, _tmplH2_initializers, void 0));
                                    this.tmplH3 = (__runInitializers(this, _tmplH2_extraInitializers), __runInitializers(this, _tmplH3_initializers, void 0));
                                    this.isServer = (__runInitializers(this, _tmplH3_extraInitializers), (0, common_1.isPlatformServer)((0, core_1.inject)(core_1.PLATFORM_ID)));
                                }
                                ngAfterViewInit() {
                                    const viewRefH1 = this.vcr.createEmbeddedView(this.tmplH1);
                                    const viewRefH2 = this.vcr.createEmbeddedView(this.tmplH2);
                                    const viewRefH3 = this.vcr.createEmbeddedView(this.tmplH3);
                                    viewRefH1.detectChanges();
                                    viewRefH2.detectChanges();
                                    viewRefH3.detectChanges();
                                    // Move the last view in front of the first one.
                                    this.vcr.move(viewRefH3, 0);
                                }
                            };
                            __setFunctionName(_classThis, "SimpleComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                _vcr_decorators = [(0, core_1.ViewChild)('target', { read: core_1.ViewContainerRef })];
                                _tmplH1_decorators = [(0, core_1.ViewChild)('tmplH1', { read: core_1.TemplateRef })];
                                _tmplH2_decorators = [(0, core_1.ViewChild)('tmplH2', { read: core_1.TemplateRef })];
                                _tmplH3_decorators = [(0, core_1.ViewChild)('tmplH3', { read: core_1.TemplateRef })];
                                __esDecorate(null, null, _vcr_decorators, { kind: "field", name: "vcr", static: false, private: false, access: { has: obj => "vcr" in obj, get: obj => obj.vcr, set: (obj, value) => { obj.vcr = value; } }, metadata: _metadata }, _vcr_initializers, _vcr_extraInitializers);
                                __esDecorate(null, null, _tmplH1_decorators, { kind: "field", name: "tmplH1", static: false, private: false, access: { has: obj => "tmplH1" in obj, get: obj => obj.tmplH1, set: (obj, value) => { obj.tmplH1 = value; } }, metadata: _metadata }, _tmplH1_initializers, _tmplH1_extraInitializers);
                                __esDecorate(null, null, _tmplH2_decorators, { kind: "field", name: "tmplH2", static: false, private: false, access: { has: obj => "tmplH2" in obj, get: obj => obj.tmplH2, set: (obj, value) => { obj.tmplH2 = value; } }, metadata: _metadata }, _tmplH2_initializers, _tmplH2_extraInitializers);
                                __esDecorate(null, null, _tmplH3_decorators, { kind: "field", name: "tmplH3", static: false, private: false, access: { has: obj => "tmplH3" in obj, get: obj => obj.tmplH3, set: (obj, value) => { obj.tmplH3 = value; } }, metadata: _metadata }, _tmplH3_initializers, _tmplH3_extraInitializers);
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                SimpleComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return SimpleComponent = _classThis;
                        })();
                        const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                        const ssrContents = (0, dom_utils_1.getAppContents)(html);
                        expect(ssrContents).toContain('<app ngh');
                        (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                        const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                        const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                        appRef.tick();
                        // We expect that all 3 dehydrated views would be removed
                        // (each dehydrated view represents a real embedded view),
                        // since we can not hydrate them in order (views were
                        // moved in a container).
                        expect(ngDevMode.dehydratedViewsRemoved).toBe(3);
                        const clientRootNode = compRef.location.nativeElement;
                        const h1 = clientRootNode.querySelector('h1');
                        const h2 = clientRootNode.querySelector('h2');
                        const h3 = clientRootNode.querySelector('h3');
                        const exceptions = [h1, h2, h3];
                        (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode, exceptions);
                        (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                    }));
                    it('should allow injecting ViewContainerRef in the root component', () => __awaiter(void 0, void 0, void 0, function* () {
                        let SimpleComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    standalone: true,
                                    selector: 'app',
                                    template: `Hello World!`,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var SimpleComponent = _classThis = class {
                                constructor() {
                                    this.vcRef = (0, core_1.inject)(core_1.ViewContainerRef);
                                }
                            };
                            __setFunctionName(_classThis, "SimpleComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                SimpleComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return SimpleComponent = _classThis;
                        })();
                        const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                        const ssrContents = (0, dom_utils_1.getAppContents)(html);
                        expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                        (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                        const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                        const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                        appRef.tick();
                        const clientRootNode = compRef.location.nativeElement;
                        (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                        // Replace the trailing comment node (added as a result of the
                        // `ViewContainerRef` injection) before comparing contents.
                        const _ssrContents = ssrContents.replace(/<\/app><!--container-->/, '</app>');
                        (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(_ssrContents, clientRootNode);
                    }));
                });
                describe('<ng-template>', () => {
                    it('should support unused <ng-template>s', () => __awaiter(void 0, void 0, void 0, function* () {
                        let SimpleComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    standalone: true,
                                    selector: 'app',
                                    template: `
                <ng-template #a>Some content</ng-template>
                <div>Tag in between</div>
                <ng-template #b>Some content</ng-template>
                <p>Tag in between</p>
                <ng-template #c>
                  Some content
                  <ng-template #d>
                    Nested template content.
                  </ng-template>
                </ng-template>
              `,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var SimpleComponent = _classThis = class {
                            };
                            __setFunctionName(_classThis, "SimpleComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                SimpleComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return SimpleComponent = _classThis;
                        })();
                        const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                        const ssrContents = (0, dom_utils_1.getAppContents)(html);
                        expect(ssrContents).toContain('<app ngh');
                        (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                        const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                        const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                        appRef.tick();
                        const clientRootNode = compRef.location.nativeElement;
                        (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                        (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                    }));
                });
                describe('transplanted views', () => {
                    it('should work when passing TemplateRef to a different component', () => __awaiter(void 0, void 0, void 0, function* () {
                        let InsertionComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    standalone: true,
                                    imports: [common_1.CommonModule],
                                    selector: 'insertion-component',
                                    template: `
                <ng-container [ngTemplateOutlet]="template"></ng-container>
              `,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            let _template_decorators;
                            let _template_initializers = [];
                            let _template_extraInitializers = [];
                            var InsertionComponent = _classThis = class {
                                constructor() {
                                    this.template = __runInitializers(this, _template_initializers, void 0);
                                    __runInitializers(this, _template_extraInitializers);
                                }
                            };
                            __setFunctionName(_classThis, "InsertionComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                _template_decorators = [(0, core_1.Input)()];
                                __esDecorate(null, null, _template_decorators, { kind: "field", name: "template", static: false, private: false, access: { has: obj => "template" in obj, get: obj => obj.template, set: (obj, value) => { obj.template = value; } }, metadata: _metadata }, _template_initializers, _template_extraInitializers);
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                InsertionComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return InsertionComponent = _classThis;
                        })();
                        let SimpleComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    standalone: true,
                                    selector: 'app',
                                    imports: [InsertionComponent, common_1.CommonModule],
                                    template: `
                <ng-template #template>
                  This is a transplanted view!
                  <div *ngIf="true">With more nested views!</div>
                </ng-template>
                <insertion-component [template]="template" />
              `,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var SimpleComponent = _classThis = class {
                            };
                            __setFunctionName(_classThis, "SimpleComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                SimpleComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return SimpleComponent = _classThis;
                        })();
                        const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                        const ssrContents = (0, dom_utils_1.getAppContents)(html);
                        expect(ssrContents).toContain('<app ngh');
                        (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                        const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                        const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                        appRef.tick();
                        const clientRootNode = compRef.location.nativeElement;
                        (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                        (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                    }));
                });
            });
        });
        describe('i18n', () => {
            describe('support is enabled', () => {
                afterEach(() => {
                    (0, localize_1.clearTranslations)();
                });
                it('should append skip hydration flag if component uses i18n blocks and no `withI18nSupport()` call present', () => __awaiter(void 0, void 0, void 0, function* () {
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'app',
                                template: '<div i18n>Hi!</div>',
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                            constructor() {
                                // Having `ViewContainerRef` here is important: it triggers
                                // a code path that serializes top-level `LContainer`s.
                                this.vcr = (0, core_1.inject)(core_1.ViewContainerRef);
                            }
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const hydrationFeatures = () => [];
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { hydrationFeatures });
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    // Since `withI18nSupport()` was not included and a component has i18n blocks -
                    // we expect that the `ngSkipHydration` attribute was added during serialization.
                    expect(ssrContents).not.toContain('ngh="');
                    expect(ssrContents).toContain('ngskiphydration="');
                }));
                it('should not append skip hydration flag if component uses i18n blocks', () => __awaiter(void 0, void 0, void 0, function* () {
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'app',
                                template: `
            <div i18n>Hi!</div>
          `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const hydrationFeatures = () => [(0, platform_browser_1.withI18nSupport)()];
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { hydrationFeatures });
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain('<app ngh');
                }));
                it('should not append skip hydration flag if component uses i18n blocks inside embedded views', () => __awaiter(void 0, void 0, void 0, function* () {
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                imports: [common_1.NgIf],
                                selector: 'app',
                                template: `
               <main *ngIf="true">
                 <div *ngIf="true" i18n>Hi!</div>
               </main>
              `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const hydrationFeatures = () => [(0, platform_browser_1.withI18nSupport)()];
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { hydrationFeatures });
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain('<app ngh');
                }));
                it('should not append skip hydration flag if component uses i18n blocks on <ng-container>s', () => __awaiter(void 0, void 0, void 0, function* () {
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'app',
                                template: `
              <ng-container i18n>Hi!</ng-container>
            `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const hydrationFeatures = () => [(0, platform_browser_1.withI18nSupport)()];
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { hydrationFeatures });
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain('<app ngh');
                }));
                it('should not append skip hydration flag if component uses i18n blocks (with *ngIfs on <ng-container>s)', () => __awaiter(void 0, void 0, void 0, function* () {
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                imports: [common_1.CommonModule],
                                selector: 'app',
                                template: `
              <ng-container *ngIf="true" i18n>Hi!</ng-container>
            `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const hydrationFeatures = () => [(0, platform_browser_1.withI18nSupport)()];
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { hydrationFeatures });
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain('<app ngh');
                }));
                it('should support translations that do not include every placeholder', () => __awaiter(void 0, void 0, void 0, function* () {
                    (0, localize_1.loadTranslations)({
                        [(0, compiler_1.computeMsgId)('Some {$START_TAG_STRONG}strong{$CLOSE_TAG_STRONG} content')]: 'Some normal content',
                    });
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'app',
                                template: `<div i18n>Some <strong>strong</strong> content</div>`,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const hydrationFeatures = () => [(0, platform_browser_1.withI18nSupport)()];
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { hydrationFeatures });
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain('<app ngh');
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                        hydrationFeatures,
                    });
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    const clientRootNode = compRef.location.nativeElement;
                    (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                    (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                    const div = clientRootNode.querySelector('div');
                    expect(div.innerHTML).toBe('Some normal content');
                }));
                it('should support projecting translated content', () => __awaiter(void 0, void 0, void 0, function* () {
                    let ContentComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'app-content',
                                template: `<ng-content select="span"></ng-content><ng-content select="div"></ng-content>`,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var ContentComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "ContentComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            ContentComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return ContentComponent = _classThis;
                    })();
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'app',
                                template: `<div i18n><app-content><div>one</div><span>two</span></app-content></div>`,
                                imports: [ContentComponent],
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const hydrationFeatures = () => [(0, platform_browser_1.withI18nSupport)()];
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { hydrationFeatures });
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain('<app ngh');
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent, ContentComponent);
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                        hydrationFeatures,
                    });
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    const clientRootNode = compRef.location.nativeElement;
                    (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                    (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                    const content = clientRootNode.querySelector('app-content');
                    expect(content.innerHTML).toBe('<span>two</span><div>one</div>');
                }));
                it('should work when i18n content is not projected', () => __awaiter(void 0, void 0, void 0, function* () {
                    let ContentComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'app-content',
                                template: `
              @if (false) {
                <ng-content />
              }
              Content outside of 'if'.
            `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var ContentComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "ContentComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            ContentComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return ContentComponent = _classThis;
                    })();
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'app',
                                template: `
              <app-content>
                <div i18n>Hello!</div>
                <ng-container i18n>Hello again!</ng-container>
              </app-content>
            `,
                                imports: [ContentComponent],
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const hydrationFeatures = () => [(0, platform_browser_1.withI18nSupport)()];
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { hydrationFeatures });
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain('<app ngh');
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent, ContentComponent);
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                        hydrationFeatures,
                    });
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    const clientRootNode = compRef.location.nativeElement;
                    (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                    (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                    const content = clientRootNode.querySelector('app-content');
                    const text = content.textContent.trim();
                    expect(text).toBe("Content outside of 'if'.");
                    expect(text).not.toContain('Hello');
                }));
                it('should support interleaving projected content', () => __awaiter(void 0, void 0, void 0, function* () {
                    let ContentComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'app-content',
                                template: `Start <ng-content select="div" /> Middle <ng-content select="span" /> End`,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var ContentComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "ContentComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            ContentComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return ContentComponent = _classThis;
                    })();
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'app',
                                template: `
              <app-content i18n>
                <span>Span</span>
                Middle Start
                Middle End
                <div>Div</div>
              </app-content>
            `,
                                imports: [ContentComponent],
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const hydrationFeatures = () => [(0, platform_browser_1.withI18nSupport)()];
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { hydrationFeatures });
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain('<app ngh');
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent, ContentComponent);
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                        hydrationFeatures,
                    });
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    const clientRootNode = compRef.location.nativeElement;
                    (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                    (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                    const content = clientRootNode.querySelector('app-content');
                    expect(content.innerHTML).toBe('Start <div>Div</div> Middle <span>Span</span> End');
                }));
                it('should support disjoint nodes', () => __awaiter(void 0, void 0, void 0, function* () {
                    let ContentComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'app-content',
                                template: `Start <ng-content select=":not(span)" /> Middle <ng-content select="span" /> End`,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var ContentComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "ContentComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            ContentComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return ContentComponent = _classThis;
                    })();
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'app',
                                template: `
              <app-content i18n>
                Inner Start
                <span>Span</span>
                { count, plural, other { Hello <span>World</span>! }}
                Inner End
              </app-content>
            `,
                                imports: [ContentComponent],
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                            constructor() {
                                this.count = 0;
                            }
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const hydrationFeatures = () => [(0, platform_browser_1.withI18nSupport)()];
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { hydrationFeatures });
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain('<app ngh');
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent, ContentComponent);
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                        hydrationFeatures,
                    });
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    const clientRootNode = compRef.location.nativeElement;
                    (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                    (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                    const content = clientRootNode.querySelector('app-content');
                    expect(content.innerHTML).toBe('Start  Inner Start  Hello <span>World</span>! <!--ICU 27:0--> Inner End  Middle <span>Span</span> End');
                }));
                it('should support nested content projection', () => __awaiter(void 0, void 0, void 0, function* () {
                    let InnerContentComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'app-content-inner',
                                template: `Start <ng-content select=":not(span)" /> Middle <ng-content select="span" /> End`,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var InnerContentComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "InnerContentComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            InnerContentComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return InnerContentComponent = _classThis;
                    })();
                    let OuterContentComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'app-content-outer',
                                template: `<app-content-inner><ng-content /></app-content-inner>`,
                                imports: [InnerContentComponent],
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var OuterContentComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "OuterContentComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            OuterContentComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return OuterContentComponent = _classThis;
                    })();
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'app',
                                template: `
              <app-content-outer i18n>
                Outer Start
                <span>Span</span>
                { count, plural, other { Hello <span>World</span>! }}
                Outer End
              </app-content-outer>
            `,
                                imports: [OuterContentComponent],
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const hydrationFeatures = () => [(0, platform_browser_1.withI18nSupport)()];
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { hydrationFeatures });
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain('<app ngh');
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent, OuterContentComponent, InnerContentComponent);
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                        hydrationFeatures,
                    });
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    const clientRootNode = compRef.location.nativeElement;
                    (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                    (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                    const content = clientRootNode.querySelector('app-content-outer');
                    expect(content.innerHTML).toBe('<app-content-inner>Start  Outer Start <span>Span</span> Hello <span>World</span>! <!--ICU 27:0--> Outer End  Middle  End</app-content-inner>');
                }));
                it('should support hosting projected content', () => __awaiter(void 0, void 0, void 0, function* () {
                    let ContentComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'app-content',
                                template: `<span i18n>Start <ng-content /> End</span>`,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var ContentComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "ContentComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            ContentComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return ContentComponent = _classThis;
                    })();
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'app',
                                template: `<div><app-content>Middle</app-content></div>`,
                                imports: [ContentComponent],
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const hydrationFeatures = () => [(0, platform_browser_1.withI18nSupport)()];
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { hydrationFeatures });
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain('<app ngh');
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent, ContentComponent);
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                        hydrationFeatures,
                    });
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    const clientRootNode = compRef.location.nativeElement;
                    (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                    (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                    const div = clientRootNode.querySelector('div');
                    expect(div.innerHTML).toBe('<app-content><span>Start Middle End</span></app-content>');
                }));
                it('should support projecting multiple elements', () => __awaiter(void 0, void 0, void 0, function* () {
                    let ContentComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'app-content',
                                template: `<ng-content />`,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var ContentComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "ContentComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            ContentComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return ContentComponent = _classThis;
                    })();
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'app',
                                template: `
              <app-content i18n>
                Start
                <span>Middle</span>
                End
              </app-content>
            `,
                                imports: [ContentComponent],
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const hydrationFeatures = () => [(0, platform_browser_1.withI18nSupport)()];
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { hydrationFeatures });
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain('<app ngh');
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                        hydrationFeatures,
                    });
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    const clientRootNode = compRef.location.nativeElement;
                    (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                    (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                    const content = clientRootNode.querySelector('app-content');
                    expect(content.innerHTML).toMatch(/ Start <span>Middle<\/span> End /);
                }));
                it('should support disconnecting i18n nodes during projection', () => __awaiter(void 0, void 0, void 0, function* () {
                    let ContentComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'app-content',
                                template: `Start <ng-content select="span" /> End`,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var ContentComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "ContentComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            ContentComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return ContentComponent = _classThis;
                    })();
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'app',
                                template: `
              <app-content i18n>
                Middle Start
                <span>Middle</span>
                Middle End
              </app-content>
            `,
                                imports: [ContentComponent],
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const hydrationFeatures = () => [(0, platform_browser_1.withI18nSupport)()];
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { hydrationFeatures });
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain('<app ngh');
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent, ContentComponent);
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                        hydrationFeatures,
                    });
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    const clientRootNode = compRef.location.nativeElement;
                    (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                    (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                    const content = clientRootNode.querySelector('app-content');
                    expect(content.innerHTML).toBe('Start <span>Middle</span> End');
                }));
                it('should support using translated views as view container anchors', () => __awaiter(void 0, void 0, void 0, function* () {
                    let DynamicComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'dynamic-cmp',
                                template: `DynamicComponent content`,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var DynamicComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "DynamicComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            DynamicComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return DynamicComponent = _classThis;
                    })();
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'app',
                                template: `<div i18n><div #target>one</div><span>two</span></div>`,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        let _vcr_decorators;
                        let _vcr_initializers = [];
                        let _vcr_extraInitializers = [];
                        var SimpleComponent = _classThis = class {
                            ngAfterViewInit() {
                                const compRef = this.vcr.createComponent(DynamicComponent);
                                compRef.changeDetectorRef.detectChanges();
                            }
                            constructor() {
                                this.vcr = __runInitializers(this, _vcr_initializers, void 0);
                                __runInitializers(this, _vcr_extraInitializers);
                            }
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            _vcr_decorators = [(0, core_1.ViewChild)('target', { read: core_1.ViewContainerRef })];
                            __esDecorate(null, null, _vcr_decorators, { kind: "field", name: "vcr", static: false, private: false, access: { has: obj => "vcr" in obj, get: obj => obj.vcr, set: (obj, value) => { obj.vcr = value; } }, metadata: _metadata }, _vcr_initializers, _vcr_extraInitializers);
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const hydrationFeatures = () => [(0, platform_browser_1.withI18nSupport)()];
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { hydrationFeatures });
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain('<app ngh');
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent, DynamicComponent);
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                        hydrationFeatures,
                    });
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    const clientRootNode = compRef.location.nativeElement;
                    (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                    (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                    const div = clientRootNode.querySelector('div');
                    const clientContents = (0, hydration_utils_1.stripExcessiveSpaces)((0, dom_utils_1.stripUtilAttributes)(div.innerHTML, false));
                    expect(clientContents).toBe('<div>one</div><dynamic-cmp>DynamicComponent content</dynamic-cmp><!--container--><span>two</span>');
                }));
                it('should support translations that reorder placeholders', () => __awaiter(void 0, void 0, void 0, function* () {
                    (0, localize_1.loadTranslations)({
                        [(0, compiler_1.computeMsgId)('{$START_TAG_DIV}one{$CLOSE_TAG_DIV}{$START_TAG_SPAN}two{$CLOSE_TAG_SPAN}')]: '{$START_TAG_SPAN}dos{$CLOSE_TAG_SPAN}{$START_TAG_DIV}uno{$CLOSE_TAG_DIV}',
                    });
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'app',
                                template: `<div i18n><div>one</div><span>two</span></div>`,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const hydrationFeatures = () => [(0, platform_browser_1.withI18nSupport)()];
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { hydrationFeatures });
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain('<app ngh');
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                        hydrationFeatures,
                    });
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    const clientRootNode = compRef.location.nativeElement;
                    (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                    (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                    const div = clientRootNode.querySelector('div');
                    expect(div.innerHTML).toBe('<span>dos</span><div>uno</div>');
                }));
                it('should support translations that include additional elements', () => __awaiter(void 0, void 0, void 0, function* () {
                    (0, localize_1.loadTranslations)({
                        [(0, compiler_1.computeMsgId)('{VAR_PLURAL, plural, other {normal}}')]: '{VAR_PLURAL, plural, other {<strong>strong</strong>}}',
                    });
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'app',
                                template: `<div i18n>Some {case, plural, other {normal}} content</div>`,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                            constructor() {
                                this.case = 0;
                            }
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const hydrationFeatures = () => [(0, platform_browser_1.withI18nSupport)()];
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { hydrationFeatures });
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain('<app ngh');
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                        hydrationFeatures,
                    });
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    const clientRootNode = compRef.location.nativeElement;
                    (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                    (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                    const div = clientRootNode.querySelector('div');
                    expect(div.innerHTML).toMatch(/Some <strong>strong<\/strong><!--ICU 27:0--> content/);
                }));
                it('should support translations that remove elements', () => __awaiter(void 0, void 0, void 0, function* () {
                    (0, localize_1.loadTranslations)({
                        [(0, compiler_1.computeMsgId)('Hello {$START_TAG_STRONG}World{$CLOSE_TAG_STRONG}!')]: 'Bonjour!',
                    });
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'app',
                                template: `<div i18n>Hello <strong>World</strong>!</div>`,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const hydrationFeatures = () => [(0, platform_browser_1.withI18nSupport)()];
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { hydrationFeatures });
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain('<app ngh');
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                        hydrationFeatures,
                    });
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    const clientRootNode = compRef.location.nativeElement;
                    (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                    (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                    const div = clientRootNode.querySelector('div');
                    expect(div.innerHTML).toMatch(/Bonjour!/);
                }));
                it('should cleanup dehydrated ICU cases', () => __awaiter(void 0, void 0, void 0, function* () {
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'app',
                                template: `<div i18n>{isServer, select, true { This is a SERVER-ONLY content } false { This is a CLIENT-ONLY content }}</div>`,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                            constructor() {
                                this.isServer = (0, common_1.isPlatformServer)((0, core_1.inject)(core_1.PLATFORM_ID)) + '';
                            }
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const hydrationFeatures = () => [(0, platform_browser_1.withI18nSupport)()];
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { hydrationFeatures });
                    let ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain('<app ngh');
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                        hydrationFeatures,
                    });
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    ssrContents = (0, hydration_utils_1.stripExcessiveSpaces)((0, dom_utils_1.stripUtilAttributes)(ssrContents, false));
                    // In the SSR output we expect to see SERVER content, but not CLIENT.
                    expect(ssrContents).not.toContain('This is a CLIENT-ONLY content');
                    expect(ssrContents).toContain('This is a SERVER-ONLY content');
                    const clientRootNode = compRef.location.nativeElement;
                    yield appRef.whenStable();
                    const clientContents = (0, hydration_utils_1.stripExcessiveSpaces)((0, dom_utils_1.stripUtilAttributes)(clientRootNode.outerHTML, false));
                    // After the cleanup, we expect to see CLIENT content, but not SERVER.
                    expect(clientContents).toContain('This is a CLIENT-ONLY content');
                    expect(clientContents).not.toContain('This is a SERVER-ONLY content');
                }));
                it('should hydrate ICUs (simple)', () => __awaiter(void 0, void 0, void 0, function* () {
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'app',
                                template: `<div i18n>{{firstCase}} {firstCase, plural, =1 {item} other {items}}, {{secondCase}} {secondCase, plural, =1 {item} other {items}}</div>`,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                            constructor() {
                                this.firstCase = 0;
                                this.secondCase = 1;
                            }
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const hydrationFeatures = () => [(0, platform_browser_1.withI18nSupport)()];
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { hydrationFeatures });
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain('<app ngh');
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                        hydrationFeatures,
                    });
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    const clientRootNode = compRef.location.nativeElement;
                    (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                    (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                    const div = clientRootNode.querySelector('div');
                    expect(div.textContent).toBe('0 items, 1 item');
                }));
                it('should hydrate ICUs (nested)', () => __awaiter(void 0, void 0, void 0, function* () {
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'simple-component',
                                template: `<div i18n>{firstCase, select, 1 {one-{secondCase, select, 1 {one} 2 {two}}} 2 {two-{secondCase, select, 1 {one} 2 {two}}}}</div>`,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        let _firstCase_decorators;
                        let _firstCase_initializers = [];
                        let _firstCase_extraInitializers = [];
                        let _secondCase_decorators;
                        let _secondCase_initializers = [];
                        let _secondCase_extraInitializers = [];
                        var SimpleComponent = _classThis = class {
                            constructor() {
                                this.firstCase = __runInitializers(this, _firstCase_initializers, void 0);
                                this.secondCase = (__runInitializers(this, _firstCase_extraInitializers), __runInitializers(this, _secondCase_initializers, void 0));
                                __runInitializers(this, _secondCase_extraInitializers);
                            }
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            _firstCase_decorators = [(0, core_1.Input)()];
                            _secondCase_decorators = [(0, core_1.Input)()];
                            __esDecorate(null, null, _firstCase_decorators, { kind: "field", name: "firstCase", static: false, private: false, access: { has: obj => "firstCase" in obj, get: obj => obj.firstCase, set: (obj, value) => { obj.firstCase = value; } }, metadata: _metadata }, _firstCase_initializers, _firstCase_extraInitializers);
                            __esDecorate(null, null, _secondCase_decorators, { kind: "field", name: "secondCase", static: false, private: false, access: { has: obj => "secondCase" in obj, get: obj => obj.secondCase, set: (obj, value) => { obj.secondCase = value; } }, metadata: _metadata }, _secondCase_initializers, _secondCase_extraInitializers);
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    let AppComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                imports: [SimpleComponent],
                                selector: 'app',
                                template: `
                <simple-component id="one" firstCase="1" secondCase="1"></simple-component>
                <simple-component id="two" firstCase="1" secondCase="2"></simple-component>
                <simple-component id="three" firstCase="2" secondCase="1"></simple-component>
                <simple-component id="four" firstCase="2" secondCase="2"></simple-component>
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
                    const hydrationFeatures = () => [(0, platform_browser_1.withI18nSupport)()];
                    const html = yield (0, hydration_utils_1.ssr)(AppComponent, { hydrationFeatures });
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain('<app ngh');
                    (0, dom_utils_1.resetTViewsFor)(AppComponent);
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, AppComponent, {
                        hydrationFeatures,
                    });
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    const clientRootNode = compRef.location.nativeElement;
                    (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                    (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                    expect(clientRootNode.querySelector('#one').textContent).toBe('one-one');
                    expect(clientRootNode.querySelector('#two').textContent).toBe('one-two');
                    expect(clientRootNode.querySelector('#three').textContent).toBe('two-one');
                    expect(clientRootNode.querySelector('#four').textContent).toBe('two-two');
                }));
                it('should hydrate containers', () => __awaiter(void 0, void 0, void 0, function* () {
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'app',
                                template: `
                <ng-container i18n>
                  Container #1
                </ng-container>
                <ng-container i18n>
                  Container #2
                </ng-container>
              `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const hydrationFeatures = () => [(0, platform_browser_1.withI18nSupport)()];
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { hydrationFeatures });
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain('<app ngh');
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                        hydrationFeatures,
                    });
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    const clientRootNode = compRef.location.nativeElement;
                    (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                    (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                    const clientContents = (0, hydration_utils_1.stripExcessiveSpaces)(clientRootNode.innerHTML);
                    expect(clientContents).toBe(' Container #1 <!--ng-container--> Container #2 <!--ng-container-->');
                }));
                it('should hydrate when using the *ngFor directive', () => __awaiter(void 0, void 0, void 0, function* () {
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                imports: [common_1.NgFor],
                                selector: 'app',
                                template: `
                <ol i18n>
                  <li *ngFor="let item of items">{{ item }}</li>
                </ol>
              `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                            constructor() {
                                this.items = [1, 2, 3];
                            }
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const hydrationFeatures = () => [(0, platform_browser_1.withI18nSupport)()];
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { hydrationFeatures });
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain('<app ngh');
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                        hydrationFeatures,
                    });
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    const clientRootNode = compRef.location.nativeElement;
                    (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                    (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                    const clientContents = (0, hydration_utils_1.stripExcessiveSpaces)(clientRootNode.innerHTML);
                    expect(clientContents).toBe('<ol><li>1</li><li>2</li><li>3</li><!--container--></ol>');
                }));
                it('should hydrate when using @for control flow', () => __awaiter(void 0, void 0, void 0, function* () {
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'app',
                                template: `
                <ol i18n>
                  @for (item of items; track $index) {
                    <li>{{ item }}</li>
                  }
                </ol>
              `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                            constructor() {
                                this.items = [1, 2, 3];
                            }
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const hydrationFeatures = () => [(0, platform_browser_1.withI18nSupport)()];
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { hydrationFeatures });
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain('<app ngh');
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                        hydrationFeatures,
                    });
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    const clientRootNode = compRef.location.nativeElement;
                    (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                    (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                    const clientContents = (0, hydration_utils_1.stripExcessiveSpaces)(clientRootNode.innerHTML);
                    expect(clientContents).toBe('<ol><li>1</li><li>2</li><li>3</li><!--container--></ol>');
                }));
                describe('with ngSkipHydration', () => {
                    it('should skip hydration when ngSkipHydration and i18n attributes are present on a same node', () => __awaiter(void 0, void 0, void 0, function* () {
                        (0, localize_1.loadTranslations)({
                            [(0, compiler_1.computeMsgId)(' Some {$START_TAG_STRONG}strong{$CLOSE_TAG_STRONG} content ')]: 'Some normal content',
                        });
                        let CmpA = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    standalone: true,
                                    selector: 'cmp-a',
                                    template: `<ng-content />`,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var CmpA = _classThis = class {
                            };
                            __setFunctionName(_classThis, "CmpA");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                CmpA = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return CmpA = _classThis;
                        })();
                        let SimpleComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    standalone: true,
                                    selector: 'app',
                                    imports: [CmpA],
                                    template: `
                <cmp-a i18n ngSkipHydration>
                  Some <strong>strong</strong> content
                </cmp-a>
              `,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var SimpleComponent = _classThis = class {
                            };
                            __setFunctionName(_classThis, "SimpleComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                SimpleComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return SimpleComponent = _classThis;
                        })();
                        const hydrationFeatures = () => [(0, platform_browser_1.withI18nSupport)()];
                        const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { hydrationFeatures });
                        const ssrContents = (0, dom_utils_1.getAppContents)(html);
                        expect(ssrContents).toContain('<app ngh');
                        (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                        const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                            hydrationFeatures,
                        });
                        const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                        appRef.tick();
                        const clientRootNode = compRef.location.nativeElement;
                        (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                        (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                        const cmpA = clientRootNode.querySelector('cmp-a');
                        expect(cmpA.textContent).toBe('Some normal content');
                        (0, hydration_utils_1.verifyNodeHasSkipHydrationMarker)(cmpA);
                    }));
                    it('should skip hydration when i18n is inside of an ngSkipHydration block', () => __awaiter(void 0, void 0, void 0, function* () {
                        (0, localize_1.loadTranslations)({
                            [(0, compiler_1.computeMsgId)('strong')]: 'very strong',
                        });
                        let CmpA = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    standalone: true,
                                    selector: 'cmp-a',
                                    template: `<ng-content />`,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var CmpA = _classThis = class {
                            };
                            __setFunctionName(_classThis, "CmpA");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                CmpA = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return CmpA = _classThis;
                        })();
                        let SimpleComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    standalone: true,
                                    selector: 'app',
                                    imports: [CmpA],
                                    template: `
                <cmp-a ngSkipHydration>
                  Some <strong i18n>strong</strong> content
                </cmp-a>
              `,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var SimpleComponent = _classThis = class {
                            };
                            __setFunctionName(_classThis, "SimpleComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                SimpleComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return SimpleComponent = _classThis;
                        })();
                        const hydrationFeatures = () => [(0, platform_browser_1.withI18nSupport)()];
                        const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { hydrationFeatures });
                        const ssrContents = (0, dom_utils_1.getAppContents)(html);
                        expect(ssrContents).toContain('<app ngh');
                        (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                        const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                            hydrationFeatures,
                        });
                        const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                        appRef.tick();
                        const clientRootNode = compRef.location.nativeElement;
                        (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                        (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                        const cmpA = clientRootNode.querySelector('cmp-a');
                        expect(cmpA.textContent.trim()).toBe('Some very strong content');
                        (0, hydration_utils_1.verifyNodeHasSkipHydrationMarker)(cmpA);
                    }));
                });
            });
            // Note: hydration for i18n blocks is not *yet* fully supported, so the tests
            // below verify that components that use i18n are excluded from the hydration
            // by adding the `ngSkipHydration` flag onto the component host element.
            describe('support is disabled', () => {
                it('should append skip hydration flag if component uses i18n blocks', () => __awaiter(void 0, void 0, void 0, function* () {
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'app',
                                template: `
            <div i18n>Hi!</div>
          `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain('<app ngskiphydration="">');
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    const clientRootNode = compRef.location.nativeElement;
                    (0, hydration_utils_1.verifyNoNodesWereClaimedForHydration)(clientRootNode);
                    (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                }));
                it('should keep the skip hydration flag if component uses i18n blocks', () => __awaiter(void 0, void 0, void 0, function* () {
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'app',
                                host: { ngSkipHydration: 'true' },
                                template: `
            <div i18n>Hi!</div>
          `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain('<app ngskiphydration="true">');
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    const clientRootNode = compRef.location.nativeElement;
                    (0, hydration_utils_1.verifyNoNodesWereClaimedForHydration)(clientRootNode);
                    (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                }));
                it('should append skip hydration flag if component uses i18n blocks inside embedded views', () => __awaiter(void 0, void 0, void 0, function* () {
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                imports: [common_1.NgIf],
                                selector: 'app',
                                template: `
               <main *ngIf="true">
                 <div *ngIf="true" i18n>Hi!</div>
               </main>
              `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain('<app ngskiphydration="">');
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    const clientRootNode = compRef.location.nativeElement;
                    (0, hydration_utils_1.verifyNoNodesWereClaimedForHydration)(clientRootNode);
                    (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                }));
                it('should append skip hydration flag if component uses i18n blocks on <ng-container>s', () => __awaiter(void 0, void 0, void 0, function* () {
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'app',
                                template: `
              <ng-container i18n>Hi!</ng-container>
            `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain('<app ngskiphydration="">');
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    const clientRootNode = compRef.location.nativeElement;
                    (0, hydration_utils_1.verifyNoNodesWereClaimedForHydration)(clientRootNode);
                    (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                }));
                it('should append skip hydration flag if component uses i18n blocks (with *ngIfs on <ng-container>s)', () => __awaiter(void 0, void 0, void 0, function* () {
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                imports: [common_1.CommonModule],
                                selector: 'app',
                                template: `
              <ng-container *ngIf="true" i18n>Hi!</ng-container>
            `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain('<app ngskiphydration="">');
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    const clientRootNode = compRef.location.nativeElement;
                    (0, hydration_utils_1.verifyNoNodesWereClaimedForHydration)(clientRootNode);
                    (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                }));
                it('should *not* throw when i18n attributes are used', () => __awaiter(void 0, void 0, void 0, function* () {
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'app',
                                template: `
              <div i18n-title title="Hello world">Hi!</div>
            `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain('<app ngh');
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    const clientRootNode = compRef.location.nativeElement;
                    (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                    (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                }));
                it('should *not* throw when i18n is used in nested component ' +
                    'excluded using `ngSkipHydration`', () => __awaiter(void 0, void 0, void 0, function* () {
                    let NestedComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'nested',
                                template: `
                <div i18n>Hi!</div>
              `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var NestedComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "NestedComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            NestedComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return NestedComponent = _classThis;
                    })();
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                imports: [NestedComponent],
                                selector: 'app',
                                template: `
               Nested component with i18n inside:
               <nested ngSkipHydration />
             `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain('<app ngh');
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    const clientRootNode = compRef.location.nativeElement;
                    (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                    (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                }));
                it('should exclude components with i18n from hydration automatically', () => __awaiter(void 0, void 0, void 0, function* () {
                    let NestedComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'nested',
                                template: `
            <div i18n>Hi!</div>
          `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var NestedComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "NestedComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            NestedComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return NestedComponent = _classThis;
                    })();
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                imports: [NestedComponent],
                                selector: 'app',
                                template: `
            Nested component with i18n inside
            (the content of this component would be excluded from hydration):
            <nested />
          `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain('<app ngh');
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    const clientRootNode = compRef.location.nativeElement;
                    (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                    (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                }));
            });
        });
        describe('defer blocks', () => {
            it('should not trigger defer blocks on the server', () => __awaiter(void 0, void 0, void 0, function* () {
                let MyLazyCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-lazy-cmp',
                            standalone: true,
                            template: 'Hi!',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyLazyCmp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "MyLazyCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyLazyCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyLazyCmp = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [MyLazyCmp],
                            template: `
            Visible: {{ isVisible }}.

            @defer (when isVisible) {
              <my-lazy-cmp />
            } @loading {
              Loading...
            } @placeholder {
              Placeholder!
            } @error {
              Failed to load dependencies :(
            }
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.isVisible = false;
                        }
                        ngOnInit() {
                            setTimeout(() => {
                                // This changes the triggering condition of the defer block,
                                // but it should be ignored and the placeholder content should be visible.
                                this.isVisible = true;
                            });
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                // Even though trigger condition is `true`,
                // the defer block remains in the "placeholder" mode on the server.
                expect(ssrContents).toContain('Visible: true.');
                expect(ssrContents).toContain('Placeholder');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                yield appRef.whenStable();
                const clientRootNode = compRef.location.nativeElement;
                // This content is rendered only on the client, since it's
                // inside a defer block.
                const innerComponent = clientRootNode.querySelector('my-lazy-cmp');
                const exceptions = [innerComponent];
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode, exceptions);
                // Verify that defer block renders correctly after hydration and triggering
                // loading condition.
                expect(clientRootNode.outerHTML).toContain('<my-lazy-cmp>Hi!</my-lazy-cmp>');
            }));
            it('should not trigger `setTimeout` calls for `on timer` triggers on the server', () => __awaiter(void 0, void 0, void 0, function* () {
                const setTimeoutSpy = spyOn(globalThis, 'setTimeout').and.callThrough();
                let MyLazyCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-lazy-cmp',
                            standalone: true,
                            template: 'Hi!',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyLazyCmp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "MyLazyCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyLazyCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyLazyCmp = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [MyLazyCmp],
                            template: `
            @defer (on timer(123ms)) {
              <my-lazy-cmp />
            }
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                // Make sure that there were no `setTimeout` calls with the # of ms
                // defined in the `on timer` trigger.
                for (let i = 0; i < setTimeoutSpy.calls.count(); i++) {
                    const args = setTimeoutSpy.calls.argsFor(i);
                    expect(args[1]).not.toBe(123, 'on timer was triggered during SSR unexpectedly');
                }
            }));
            it('should hydrate a placeholder block', () => __awaiter(void 0, void 0, void 0, function* () {
                let MyLazyCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-lazy-cmp',
                            standalone: true,
                            template: 'Hi!',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyLazyCmp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "MyLazyCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyLazyCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyLazyCmp = _classThis;
                })();
                let MyPlaceholderCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-placeholder-cmp',
                            standalone: true,
                            imports: [common_1.NgIf],
                            template: '<div *ngIf="true">Hi!</div>',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyPlaceholderCmp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "MyPlaceholderCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyPlaceholderCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyPlaceholderCmp = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [MyLazyCmp, MyPlaceholderCmp],
                            template: `
            Visible: {{ isVisible }}.

            @defer (when isVisible) {
              <my-lazy-cmp />
            } @loading {
              Loading...
            } @placeholder {
              Placeholder!
              <my-placeholder-cmp />
            } @error {
              Failed to load dependencies :(
            }
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.isVisible = false;
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                // Make sure we have placeholder contents in SSR output.
                expect(ssrContents).toContain('Placeholder! <my-placeholder-cmp ngh="0"><div>Hi!</div>');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent, MyPlaceholderCmp);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                yield appRef.whenStable();
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
            }));
            it('should render nothing on the server if no placeholder block is provided', () => __awaiter(void 0, void 0, void 0, function* () {
                let MyLazyCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-lazy-cmp',
                            standalone: true,
                            template: 'Hi!',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyLazyCmp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "MyLazyCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyLazyCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyLazyCmp = _classThis;
                })();
                let MyPlaceholderCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-placeholder-cmp',
                            standalone: true,
                            imports: [common_1.NgIf],
                            template: '<div *ngIf="true">Hi!</div>',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyPlaceholderCmp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "MyPlaceholderCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyPlaceholderCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyPlaceholderCmp = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [MyLazyCmp, MyPlaceholderCmp],
                            template: `
            Before|@defer (when isVisible) {<my-lazy-cmp />}|After
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.isVisible = false;
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                // Make sure no elements from a defer block is present in SSR output.
                // Note: comment nodes represent main content and defer block anchors,
                // which is expected.
                expect(ssrContents).toContain('Before|<!--container--><!--container-->|After');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent, MyPlaceholderCmp);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                yield appRef.whenStable();
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
            }));
            it('should not reference IntersectionObserver on the server', () => __awaiter(void 0, void 0, void 0, function* () {
                // This test verifies that there are no errors produced while rendering on a server
                // when `on viewport` trigger is used for a defer block.
                let MyLazyCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-lazy-cmp',
                            standalone: true,
                            template: 'Hi!',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyLazyCmp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "MyLazyCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyLazyCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyLazyCmp = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [MyLazyCmp],
                            template: `
            @defer (when isVisible; prefetch on viewport(ref)) {
              <my-lazy-cmp />
            } @placeholder {
              <div #ref>Placeholder!</div>
            }
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.isVisible = false;
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const errors = [];
                class CustomErrorHandler extends core_1.ErrorHandler {
                    handleError(error) {
                        errors.push(error);
                    }
                }
                const envProviders = [
                    {
                        provide: core_1.ErrorHandler,
                        useClass: CustomErrorHandler,
                    },
                ];
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { envProviders });
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                expect(ssrContents).toContain('Placeholder');
                // Verify that there are no errors.
                expect(errors).toHaveSize(0);
            }));
            it('should not hydrate when an entire block in skip hydration section', () => __awaiter(void 0, void 0, void 0, function* () {
                let MyLazyCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-lazy-cmp',
                            standalone: true,
                            template: 'Hi!',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyLazyCmp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "MyLazyCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyLazyCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyLazyCmp = _classThis;
                })();
                let ProjectorCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'projector-cmp',
                            template: `
             <main>
               <ng-content />
             </main>
           `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ProjectorCmp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "ProjectorCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ProjectorCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ProjectorCmp = _classThis;
                })();
                let MyPlaceholderCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-placeholder-cmp',
                            standalone: true,
                            imports: [common_1.NgIf],
                            template: '<div *ngIf="true">Hi!</div>',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyPlaceholderCmp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "MyPlaceholderCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyPlaceholderCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyPlaceholderCmp = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [MyLazyCmp, MyPlaceholderCmp, ProjectorCmp],
                            template: `
            Visible: {{ isVisible }}.

            <projector-cmp ngSkipHydration="true">
              @defer (when isVisible) {
                <my-lazy-cmp />
              } @loading {
                Loading...
              } @placeholder {
                <my-placeholder-cmp />
              } @error {
                Failed to load dependencies :(
              }
            </projector-cmp>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.isVisible = false;
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                // Make sure we have placeholder contents in SSR output.
                expect(ssrContents).toContain('<my-placeholder-cmp');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent, MyPlaceholderCmp, ProjectorCmp);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                yield appRef.whenStable();
                const clientRootNode = compRef.location.nativeElement;
                // Verify that placeholder nodes were not claimed for hydration,
                // i.e. nodes were re-created since placeholder was in skip hydration block.
                const placeholderCmp = clientRootNode.querySelector('my-placeholder-cmp');
                (0, hydration_utils_1.verifyNoNodesWereClaimedForHydration)(placeholderCmp);
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
            }));
            it('should not hydrate when a placeholder block in skip hydration section', () => __awaiter(void 0, void 0, void 0, function* () {
                let MyLazyCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-lazy-cmp',
                            standalone: true,
                            template: 'Hi!',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyLazyCmp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "MyLazyCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyLazyCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyLazyCmp = _classThis;
                })();
                let ProjectorCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'projector-cmp',
                            template: `
             <main>
               <ng-content />
             </main>
           `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ProjectorCmp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "ProjectorCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ProjectorCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ProjectorCmp = _classThis;
                })();
                let MyPlaceholderCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-placeholder-cmp',
                            standalone: true,
                            imports: [common_1.NgIf],
                            template: '<div *ngIf="true">Hi!</div>',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyPlaceholderCmp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "MyPlaceholderCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyPlaceholderCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyPlaceholderCmp = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [MyLazyCmp, MyPlaceholderCmp, ProjectorCmp],
                            template: `
            Visible: {{ isVisible }}.

            <projector-cmp ngSkipHydration="true">
              @defer (when isVisible) {
                <my-lazy-cmp />
              } @loading {
                Loading...
              } @placeholder {
                <my-placeholder-cmp ngSkipHydration="true" />
              } @error {
                Failed to load dependencies :(
              }
            </projector-cmp>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.isVisible = false;
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                // Make sure we have placeholder contents in SSR output.
                expect(ssrContents).toContain('<my-placeholder-cmp');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent, MyPlaceholderCmp, ProjectorCmp);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                yield appRef.whenStable();
                const clientRootNode = compRef.location.nativeElement;
                // Verify that placeholder nodes were not claimed for hydration,
                // i.e. nodes were re-created since placeholder was in skip hydration block.
                const placeholderCmp = clientRootNode.querySelector('my-placeholder-cmp');
                (0, hydration_utils_1.verifyNoNodesWereClaimedForHydration)(placeholderCmp);
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
            }));
        });
        describe('ShadowDom encapsulation', () => {
            it('should append skip hydration flag if component uses ShadowDom encapsulation', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            encapsulation: core_1.ViewEncapsulation.ShadowDom,
                            template: `Hi!`,
                            styles: [':host { color: red; }'],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngskiphydration="">');
            }));
            it('should append skip hydration flag if component uses ShadowDom encapsulation ' +
                '(but keep parent and sibling elements hydratable)', () => __awaiter(void 0, void 0, void 0, function* () {
                let ShadowDomComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'shadow-dom',
                            encapsulation: core_1.ViewEncapsulation.ShadowDom,
                            template: `ShadowDom component`,
                            styles: [':host { color: red; }'],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ShadowDomComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "ShadowDomComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ShadowDomComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ShadowDomComponent = _classThis;
                })();
                let RegularComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'regular',
                            template: `<p>Regular component</p>`,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _id_decorators;
                    let _id_initializers = [];
                    let _id_extraInitializers = [];
                    var RegularComponent = _classThis = class {
                        constructor() {
                            this.id = __runInitializers(this, _id_initializers, void 0);
                            __runInitializers(this, _id_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "RegularComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _id_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        RegularComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return RegularComponent = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [RegularComponent, ShadowDomComponent],
                            template: `
                <main>Main content</main>
                <regular id="1" />
                <shadow-dom />
                <regular id="2" />
              `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh="0">');
                expect(ssrContents).toContain('<shadow-dom ngskiphydration="">');
                expect(ssrContents).toContain('<regular id="1" ngh="0">');
                expect(ssrContents).toContain('<regular id="2" ngh="0">');
            }));
        });
        describe('ngSkipHydration', () => {
            it('should skip hydrating elements with ngSkipHydration attribute', () => __awaiter(void 0, void 0, void 0, function* () {
                let NestedComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'nested-cmp',
                            template: `
            <h1>Hello World!</h1>
            <div>This is the content of a nested component</div>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _title_decorators;
                    let _title_initializers = [];
                    let _title_extraInitializers = [];
                    var NestedComponent = _classThis = class {
                        constructor() {
                            this.title = __runInitializers(this, _title_initializers, '');
                            __runInitializers(this, _title_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "NestedComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _title_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title, set: (obj, value) => { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        NestedComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return NestedComponent = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [NestedComponent],
                            template: `
            <header>Header</header>
            <nested-cmp [title]="someTitle" style="width:100px; height:200px; color:red" moo="car" foo="value" baz ngSkipHydration />
            <footer>Footer</footer>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent, NestedComponent);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
            }));
            it('should skip hydrating elements when host element ' + 'has the ngSkipHydration attribute', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            template: `
            <main>Main content</main>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const indexHtml = '<html><head></head><body>' + '<app ngSkipHydration></app>' + '</body></html>';
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { doc: indexHtml });
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                // No `ngh` attribute in the <app> element.
                expect(ssrContents).toContain('<app ngskiphydration=""><main>Main content</main></app>');
                // Even though hydration was skipped at the root level, the hydration
                // info key and an empty array as a value are still included into the
                // TransferState to indicate that the server part was configured correctly.
                const transferState = (0, hydration_utils_1.getHydrationInfoFromTransferState)(html);
                expect(transferState).toContain(hydration_utils_1.TRANSFER_STATE_TOKEN_ID);
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
            }));
            it('should allow the same component with and without hydration in the same template ' +
                '(when component with `ngSkipHydration` goes first)', () => __awaiter(void 0, void 0, void 0, function* () {
                let Nested = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'nested',
                            imports: [common_1.NgIf],
                            template: `
               <ng-container *ngIf="true">Hello world</ng-container>
             `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Nested = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Nested");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Nested = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Nested = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [common_1.NgIf, Nested],
                            template: `
                <nested ngSkipHydration />
                <nested />
                <nested ngSkipHydration />
                <nested />
              `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent, Nested);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
            }));
            it('should allow projecting hydrated content into components that skip hydration ' +
                '(view containers with embedded views as projection root nodes)', () => __awaiter(void 0, void 0, void 0, function* () {
                let RegularCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'regular-cmp',
                            template: `
                <ng-content />
              `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var RegularCmp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "RegularCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        RegularCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return RegularCmp = _classThis;
                })();
                let DeeplyNested = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'deeply-nested',
                            host: { ngSkipHydration: 'true' },
                            template: `
                <ng-content />
              `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var DeeplyNested = _classThis = class {
                    };
                    __setFunctionName(_classThis, "DeeplyNested");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DeeplyNested = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DeeplyNested = _classThis;
                })();
                let DeeplyNestedWrapper = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'deeply-nested-wrapper',
                            host: { ngSkipHydration: 'true' },
                            imports: [RegularCmp],
                            template: `
                <regular-cmp>
                  <ng-content />
                </regular-cmp>
              `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var DeeplyNestedWrapper = _classThis = class {
                    };
                    __setFunctionName(_classThis, "DeeplyNestedWrapper");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DeeplyNestedWrapper = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DeeplyNestedWrapper = _classThis;
                })();
                let Layout = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'layout',
                            imports: [DeeplyNested, DeeplyNestedWrapper],
                            template: `
                <deeply-nested>
                  <deeply-nested-wrapper>
                    <ng-content />
                  </deeply-nested-wrapper>
                </deeply-nested>
              `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Layout = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Layout");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Layout = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Layout = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [common_1.NgIf, Layout],
                            template: `
              <layout>
                <h1 *ngIf="true">Hi!</h1>
              </layout>
            `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent, Layout, RegularCmp, DeeplyNested, DeeplyNestedWrapper);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
            }));
            it('should allow projecting hydrated content into components that skip hydration ' +
                '(view containers with components as projection root nodes)', () => __awaiter(void 0, void 0, void 0, function* () {
                let DynamicComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'dynamic-cmp',
                            template: `DynamicComponent content`,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var DynamicComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "DynamicComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DynamicComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DynamicComponent = _classThis;
                })();
                let RegularCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'regular-cmp',
                            template: `
            <ng-content />
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var RegularCmp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "RegularCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        RegularCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return RegularCmp = _classThis;
                })();
                let DeeplyNested = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'deeply-nested',
                            host: { ngSkipHydration: 'true' },
                            template: `
            <ng-content />
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var DeeplyNested = _classThis = class {
                    };
                    __setFunctionName(_classThis, "DeeplyNested");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DeeplyNested = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DeeplyNested = _classThis;
                })();
                let DeeplyNestedWrapper = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'deeply-nested-wrapper',
                            host: { ngSkipHydration: 'true' },
                            imports: [RegularCmp],
                            template: `
            <regular-cmp>
              <ng-content />
            </regular-cmp>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var DeeplyNestedWrapper = _classThis = class {
                    };
                    __setFunctionName(_classThis, "DeeplyNestedWrapper");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DeeplyNestedWrapper = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DeeplyNestedWrapper = _classThis;
                })();
                let Layout = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'layout',
                            imports: [DeeplyNested, DeeplyNestedWrapper],
                            template: `
            <deeply-nested>
              <deeply-nested-wrapper>
                <ng-content />
              </deeply-nested-wrapper>
            </deeply-nested>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Layout = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Layout");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Layout = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Layout = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [common_1.NgIf, Layout],
                            template: `
              <layout>
                <div #target></div>
              </layout>
            `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _vcr_decorators;
                    let _vcr_initializers = [];
                    let _vcr_extraInitializers = [];
                    var SimpleComponent = _classThis = class {
                        ngAfterViewInit() {
                            const compRef = this.vcr.createComponent(DynamicComponent);
                            compRef.changeDetectorRef.detectChanges();
                        }
                        constructor() {
                            this.vcr = __runInitializers(this, _vcr_initializers, void 0);
                            __runInitializers(this, _vcr_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _vcr_decorators = [(0, core_1.ViewChild)('target', { read: core_1.ViewContainerRef })];
                        __esDecorate(null, null, _vcr_decorators, { kind: "field", name: "vcr", static: false, private: false, access: { has: obj => "vcr" in obj, get: obj => obj.vcr, set: (obj, value) => { obj.vcr = value; } }, metadata: _metadata }, _vcr_initializers, _vcr_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent, Layout, DynamicComponent, RegularCmp, DeeplyNested, DeeplyNestedWrapper);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
            }));
            it('should allow projecting hydrated content into components that skip hydration ' +
                '(with ng-containers as projection root nodes)', () => __awaiter(void 0, void 0, void 0, function* () {
                let RegularCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'regular-cmp',
                            template: `
                <ng-content />
              `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var RegularCmp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "RegularCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        RegularCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return RegularCmp = _classThis;
                })();
                let DeeplyNested = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'deeply-nested',
                            host: { ngSkipHydration: 'true' },
                            template: `
              <ng-content />
            `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var DeeplyNested = _classThis = class {
                    };
                    __setFunctionName(_classThis, "DeeplyNested");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DeeplyNested = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DeeplyNested = _classThis;
                })();
                let DeeplyNestedWrapper = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'deeply-nested-wrapper',
                            host: { ngSkipHydration: 'true' },
                            imports: [RegularCmp],
                            template: `
              <regular-cmp>
                <ng-content />
              </regular-cmp>
            `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var DeeplyNestedWrapper = _classThis = class {
                    };
                    __setFunctionName(_classThis, "DeeplyNestedWrapper");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DeeplyNestedWrapper = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DeeplyNestedWrapper = _classThis;
                })();
                let Layout = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'layout',
                            imports: [DeeplyNested, DeeplyNestedWrapper],
                            template: `
              <deeply-nested>
                <deeply-nested-wrapper>
                  <ng-content />
                </deeply-nested-wrapper>
              </deeply-nested>
            `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Layout = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Layout");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Layout = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Layout = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [common_1.NgIf, Layout],
                            template: `
              <layout>
                <ng-container>Hi!</ng-container>
              </layout>
            `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent, Layout, RegularCmp, DeeplyNested, DeeplyNestedWrapper);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
            }));
            it('should allow the same component with and without hydration in the same template ' +
                '(when component without `ngSkipHydration` goes first)', () => __awaiter(void 0, void 0, void 0, function* () {
                let Nested = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'nested',
                            imports: [common_1.NgIf],
                            template: `
               <ng-container *ngIf="true">Hello world</ng-container>
             `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Nested = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Nested");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Nested = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Nested = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [common_1.NgIf, Nested],
                            template: `
               <nested />
               <nested ngSkipHydration />
               <nested />
               <nested ngSkipHydration />
             `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent, Nested);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
            }));
            it('should hydrate when the value of an attribute is "ngskiphydration"', () => __awaiter(void 0, void 0, void 0, function* () {
                let NestedComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'nested-cmp',
                            template: `
            <h1>Hello World!</h1>
            <div>This is the content of a nested component</div>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _title_decorators;
                    let _title_initializers = [];
                    let _title_extraInitializers = [];
                    var NestedComponent = _classThis = class {
                        constructor() {
                            this.title = __runInitializers(this, _title_initializers, '');
                            __runInitializers(this, _title_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "NestedComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _title_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title, set: (obj, value) => { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        NestedComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return NestedComponent = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [NestedComponent],
                            template: `
            <header>Header</header>
            <nested-cmp style="width:100px; height:200px; color:red" moo="car" foo="value" baz [title]="ngSkipHydration" />
            <footer>Footer</footer>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent, NestedComponent);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
            }));
            it('should skip hydrating elements with ngSkipHydration host binding', () => __awaiter(void 0, void 0, void 0, function* () {
                let SecondCmd = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'second-cmp',
                            template: `<div>Not hydrated</div>`,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SecondCmd = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SecondCmd");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SecondCmd = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SecondCmd = _classThis;
                })();
                let NestedCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            imports: [SecondCmd],
                            selector: 'nested-cmp',
                            template: `<second-cmp />`,
                            host: { ngSkipHydration: 'true' },
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var NestedCmp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "NestedCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        NestedCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return NestedCmp = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            imports: [NestedCmp],
                            selector: 'app',
                            template: `
            <nested-cmp />
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent, NestedCmp);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
            }));
            it('should skip hydrating all child content of an element with ngSkipHydration attribute', () => __awaiter(void 0, void 0, void 0, function* () {
                let NestedComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'nested-cmp',
                            template: `
              <h1>Hello World!</h1>
              <div>This is the content of a nested component</div>
            `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _title_decorators;
                    let _title_initializers = [];
                    let _title_extraInitializers = [];
                    var NestedComponent = _classThis = class {
                        constructor() {
                            this.title = __runInitializers(this, _title_initializers, '');
                            __runInitializers(this, _title_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "NestedComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _title_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title, set: (obj, value) => { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        NestedComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return NestedComponent = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [NestedComponent],
                            template: `
              <header>Header</header>
              <nested-cmp ngSkipHydration>
                <h1>Dehydrated content header</h1>
                <p>This content is definitely dehydrated and could use some water.</p>
              </nested-cmp>
              <footer>Footer</footer>
            `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent, NestedComponent);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
            }));
            it('should skip hydrating when ng-containers exist and ngSkipHydration attribute is present', () => __awaiter(void 0, void 0, void 0, function* () {
                let NestedComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'nested-cmp',
                            template: `
              <h1>Hello World!</h1>
              <div>This is the content of a nested component</div>
            `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var NestedComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "NestedComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        NestedComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return NestedComponent = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [NestedComponent],
                            template: `
              <header>Header</header>
                <nested-cmp ngSkipHydration>
                  <ng-container>
                    <h1>Dehydrated content header</h1>
                  </ng-container>
                </nested-cmp>
              <footer>Footer</footer>
            `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent, NestedComponent);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                    envProviders: [(0, hydration_utils_1.withDebugConsole)()],
                });
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                (0, hydration_utils_1.verifyHasLog)(appRef, 'Angular hydrated 1 component(s) and 6 node(s), 1 component(s) were skipped');
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
            }));
            it('should skip hydrating and safely allow DOM manipulation inside block that was skipped', () => __awaiter(void 0, void 0, void 0, function* () {
                let NestedComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'nested-cmp',
                            template: `
              <h1>Hello World!</h1>
              <div #nestedDiv>This is the content of a nested component</div>
            `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var NestedComponent = _classThis = class {
                        constructor() {
                            this.el = (0, core_1.inject)(core_1.ElementRef);
                        }
                        ngAfterViewInit() {
                            const span = document.createElement('span');
                            span.innerHTML = 'Appended span';
                            this.el.nativeElement.appendChild(span);
                        }
                    };
                    __setFunctionName(_classThis, "NestedComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        NestedComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return NestedComponent = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [NestedComponent],
                            template: `
              <header>Header</header>
              <nested-cmp ngSkipHydration />
              <footer>Footer</footer>
            `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent, NestedComponent);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                expect(clientRootNode.outerHTML).toContain('Appended span');
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
            }));
            it('should skip hydrating and safely allow adding and removing DOM nodes inside block that was skipped', () => __awaiter(void 0, void 0, void 0, function* () {
                let NestedComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'nested-cmp',
                            template: `
              <h1>Hello World!</h1>
              <div #nestedDiv>
                <p>This content will be removed</p>
              </div>
            `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var NestedComponent = _classThis = class {
                        constructor() {
                            this.el = (0, core_1.inject)(core_1.ElementRef);
                        }
                        ngAfterViewInit() {
                            var _a;
                            (_a = document.querySelector('p')) === null || _a === void 0 ? void 0 : _a.remove();
                            const span = document.createElement('span');
                            span.innerHTML = 'Appended span';
                            this.el.nativeElement.appendChild(span);
                        }
                    };
                    __setFunctionName(_classThis, "NestedComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        NestedComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return NestedComponent = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [NestedComponent],
                            template: `
              <header>Header</header>
              <nested-cmp ngSkipHydration />
              <footer>Footer</footer>
            `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent, NestedComponent);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                expect(clientRootNode.outerHTML).toContain('Appended span');
                expect(clientRootNode.outerHTML).not.toContain('This content will be removed');
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
            }));
            it('should skip hydrating elements with ngSkipHydration attribute on ViewContainerRef host', () => __awaiter(void 0, void 0, void 0, function* () {
                let NestedComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'nested-cmp',
                            template: `<p>Just some text</p>`,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var NestedComponent = _classThis = class {
                        constructor() {
                            this.el = (0, core_1.inject)(core_1.ElementRef);
                            this.doc = (0, core_1.inject)(common_1.DOCUMENT);
                        }
                        ngAfterViewInit() {
                            const pTag = this.doc.querySelector('p');
                            pTag === null || pTag === void 0 ? void 0 : pTag.remove();
                            const span = this.doc.createElement('span');
                            span.innerHTML = 'Appended span';
                            this.el.nativeElement.appendChild(span);
                        }
                    };
                    __setFunctionName(_classThis, "NestedComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        NestedComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return NestedComponent = _classThis;
                })();
                let ProjectorCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'projector-cmp',
                            imports: [NestedComponent],
                            template: `
                <main>
                  <nested-cmp></nested-cmp>
                </main>
              `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ProjectorCmp = _classThis = class {
                        constructor() {
                            this.vcr = (0, core_1.inject)(core_1.ViewContainerRef);
                        }
                    };
                    __setFunctionName(_classThis, "ProjectorCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ProjectorCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ProjectorCmp = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            imports: [ProjectorCmp],
                            selector: 'app',
                            template: `
              <projector-cmp ngSkipHydration>
              </projector-cmp>
            `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent, ProjectorCmp);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
            }));
            it('should throw when ngSkipHydration attribute is set on a node ' +
                'which is not a component host', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            template: `
                <header ngSkipHydration>Header</header>
                <footer ngSkipHydration>Footer</footer>
              `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                try {
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain('<app ngh');
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                    yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                    fail('Expected the hydration process to throw.');
                }
                catch (e) {
                    expect(e.toString()).toContain('The `ngSkipHydration` flag is applied ' +
                        "on a node that doesn't act as a component host");
                }
            }));
            it('should throw when ngSkipHydration attribute is set on a node ' +
                'which is not a component host (when using host bindings)', () => __awaiter(void 0, void 0, void 0, function* () {
                let Dir = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            standalone: true,
                            selector: '[dir]',
                            host: { ngSkipHydration: 'true' },
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
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [Dir],
                            template: `
                <div dir></div>
              `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                try {
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain('<app ngh');
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                    yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                    fail('Expected the hydration process to throw.');
                }
                catch (e) {
                    const errorMessage = e.toString();
                    expect(errorMessage).toContain('The `ngSkipHydration` flag is applied ' +
                        "on a node that doesn't act as a component host");
                    expect(errorMessage).toContain('<div ngskiphydration="true" dir="">…</div>  <-- AT THIS LOCATION');
                }
            }));
        });
        describe('corrupted text nodes restoration', () => {
            it('should support empty text nodes', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            template: `
            This is hydrated content.
            <span>{{spanText}}</span>.
            <p>{{pText}}</p>
            <div>{{anotherText}}</div>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.spanText = '';
                            this.pText = '';
                            this.anotherText = '';
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
            }));
            it('should support empty text interpolations within elements ' +
                '(when interpolation is on a new line)', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            template: `
                <div>
                  {{ text }}
                </div>
              `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.text = '';
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                // Expect special markers to not be present, since there
                // are no corrupted text nodes that require restoring.
                //
                // The HTML contents produced by the SSR would look like this:
                // `<div>  </div>` (1 text node with 2 empty spaces inside of
                // a <div>), which would result in creating a text node by a
                // browser.
                expect(ssrContents).not.toContain(hydration_utils_1.EMPTY_TEXT_NODE_COMMENT);
                expect(ssrContents).not.toContain(hydration_utils_1.TEXT_NODE_SEPARATOR_COMMENT);
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
            }));
            it('should not treat text nodes with `&nbsp`s as empty', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            template: `
            <div>&nbsp;{{ text }}&nbsp;</div>
            &nbsp;&nbsp;&nbsp;
            <h1>Hello world!</h1>
            &nbsp;&nbsp;&nbsp;
            <h2>Hello world!</h2>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.text = '';
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                // Expect special markers to not be present, since there
                // are no corrupted text nodes that require restoring.
                expect(ssrContents).not.toContain(hydration_utils_1.EMPTY_TEXT_NODE_COMMENT);
                expect(ssrContents).not.toContain(hydration_utils_1.TEXT_NODE_SEPARATOR_COMMENT);
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
            }));
            it('should support restoration of multiple text nodes in a row', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            template: `
            This is hydrated content.<span>{{emptyText}}{{moreText}}{{andMoreText}}</span>.
            <p>{{secondEmptyText}}{{secondMoreText}}</p>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.emptyText = '';
                            this.moreText = '';
                            this.andMoreText = '';
                            this.secondEmptyText = '';
                            this.secondMoreText = '';
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
            }));
            it('should support projected text node content with plain text nodes', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [common_1.NgIf],
                            template: `
            <div>
              Hello
              <ng-container *ngIf="true">Angular</ng-container>
              <ng-container *ngIf="true">World</ng-container>
            </div>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
            }));
        });
        describe('post-hydration cleanup', () => {
            it('should cleanup unclaimed views in a component (when using elements)', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [common_1.NgIf],
                            template: `
            <b *ngIf="isServer">This is a SERVER-ONLY content</b>
            <i *ngIf="!isServer">This is a CLIENT-ONLY content</i>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            // This flag is intentionally different between the client
                            // and the server: we use it to test the logic to cleanup
                            // dehydrated views.
                            this.isServer = (0, common_1.isPlatformServer)((0, core_1.inject)(core_1.PLATFORM_ID));
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                let ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                ssrContents = (0, hydration_utils_1.stripExcessiveSpaces)((0, dom_utils_1.stripUtilAttributes)(ssrContents, false));
                // In the SSR output we expect to see SERVER content, but not CLIENT.
                expect(ssrContents).not.toContain('<i>This is a CLIENT-ONLY content</i>');
                expect(ssrContents).toContain('<b>This is a SERVER-ONLY content</b>');
                const clientRootNode = compRef.location.nativeElement;
                yield appRef.whenStable();
                const clientContents = (0, hydration_utils_1.stripExcessiveSpaces)((0, dom_utils_1.stripUtilAttributes)(clientRootNode.outerHTML, false));
                // After the cleanup, we expect to see CLIENT content, but not SERVER.
                expect(clientContents).toContain('<i>This is a CLIENT-ONLY content</i>');
                expect(clientContents).not.toContain('<b>This is a SERVER-ONLY content</b>');
            }));
            it('should cleanup unclaimed views in a component (when using <ng-container>s)', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [common_1.NgIf],
                            template: `
            <ng-container *ngIf="isServer">This is a SERVER-ONLY content</ng-container>
            <ng-container *ngIf="!isServer">This is a CLIENT-ONLY content</ng-container>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            // This flag is intentionally different between the client
                            // and the server: we use it to test the logic to cleanup
                            // dehydrated views.
                            this.isServer = (0, common_1.isPlatformServer)((0, core_1.inject)(core_1.PLATFORM_ID));
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                let ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                ssrContents = (0, hydration_utils_1.stripExcessiveSpaces)((0, dom_utils_1.stripUtilAttributes)(ssrContents, false));
                // In the SSR output we expect to see SERVER content, but not CLIENT.
                expect(ssrContents).not.toContain('This is a CLIENT-ONLY content<!--ng-container-->');
                expect(ssrContents).toContain('This is a SERVER-ONLY content<!--ng-container-->');
                const clientRootNode = compRef.location.nativeElement;
                yield appRef.whenStable();
                const clientContents = (0, hydration_utils_1.stripExcessiveSpaces)((0, dom_utils_1.stripUtilAttributes)(clientRootNode.outerHTML, false));
                // After the cleanup, we expect to see CLIENT content, but not SERVER.
                expect(clientContents).toContain('This is a CLIENT-ONLY content<!--ng-container-->');
                expect(clientContents).not.toContain('This is a SERVER-ONLY content<!--ng-container-->');
            }));
            it('should cleanup unclaimed views in a view container when ' +
                'root component is used as an anchor for ViewContainerRef', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [common_1.NgIf],
                            template: `
                <ng-template #tmpl>
                  <span *ngIf="isServer">This is a SERVER-ONLY content (embedded view)</span>
                  <div *ngIf="!isServer">This is a CLIENT-ONLY content (embedded view)</div>
                </ng-template>
                <b *ngIf="isServer">This is a SERVER-ONLY content (root component)</b>
                <i *ngIf="!isServer">This is a CLIENT-ONLY content (root component)</i>
              `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _tmpl_decorators;
                    let _tmpl_initializers = [];
                    let _tmpl_extraInitializers = [];
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            // This flag is intentionally different between the client
                            // and the server: we use it to test the logic to cleanup
                            // dehydrated views.
                            this.isServer = (0, common_1.isPlatformServer)((0, core_1.inject)(core_1.PLATFORM_ID));
                            this.tmpl = __runInitializers(this, _tmpl_initializers, void 0);
                            this.vcr = (__runInitializers(this, _tmpl_extraInitializers), (0, core_1.inject)(core_1.ViewContainerRef));
                        }
                        ngAfterViewInit() {
                            const viewRef = this.vcr.createEmbeddedView(this.tmpl);
                            viewRef.detectChanges();
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _tmpl_decorators = [(0, core_1.ViewChild)('tmpl', { read: core_1.TemplateRef })];
                        __esDecorate(null, null, _tmpl_decorators, { kind: "field", name: "tmpl", static: false, private: false, access: { has: obj => "tmpl" in obj, get: obj => obj.tmpl, set: (obj, value) => { obj.tmpl = value; } }, metadata: _metadata }, _tmpl_initializers, _tmpl_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                let ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                ssrContents = (0, hydration_utils_1.stripExcessiveSpaces)((0, dom_utils_1.stripUtilAttributes)(ssrContents, false));
                // In the SSR output we expect to see SERVER content, but not CLIENT.
                expect(ssrContents).not.toContain('<i>This is a CLIENT-ONLY content (root component)</i>');
                expect(ssrContents).not.toContain('<div>This is a CLIENT-ONLY content (embedded view)</div>');
                expect(ssrContents).toContain('<b>This is a SERVER-ONLY content (root component)</b>');
                expect(ssrContents).toContain('<span>This is a SERVER-ONLY content (embedded view)</span>');
                const clientRootNode = compRef.location.nativeElement;
                yield appRef.whenStable();
                const clientContents = (0, hydration_utils_1.stripExcessiveSpaces)((0, dom_utils_1.stripUtilAttributes)(clientRootNode.parentNode.outerHTML, false));
                // After the cleanup, we expect to see CLIENT content, but not SERVER.
                expect(clientContents).toContain('<i>This is a CLIENT-ONLY content (root component)</i>');
                expect(clientContents).toContain('<div>This is a CLIENT-ONLY content (embedded view)</div>');
                expect(clientContents).not.toContain('<b>This is a SERVER-ONLY content (root component)</b>');
                expect(clientContents).not.toContain('<span>This is a SERVER-ONLY content (embedded view)</span>');
            }));
            it('should cleanup within inner containers', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [common_1.NgIf],
                            template: `
            <ng-container *ngIf="true">
              <b *ngIf="isServer">This is a SERVER-ONLY content</b>
              Outside of the container (must be retained).
            </ng-container>
            <i *ngIf="!isServer">This is a CLIENT-ONLY content</i>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            // This flag is intentionally different between the client
                            // and the server: we use it to test the logic to cleanup
                            // dehydrated views.
                            this.isServer = (0, common_1.isPlatformServer)((0, core_1.inject)(core_1.PLATFORM_ID));
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                let ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                ssrContents = (0, hydration_utils_1.stripExcessiveSpaces)((0, dom_utils_1.stripUtilAttributes)(ssrContents, false));
                // In the SSR output we expect to see SERVER content, but not CLIENT.
                expect(ssrContents).not.toContain('<i>This is a CLIENT-ONLY content</i>');
                expect(ssrContents).toContain('<b>This is a SERVER-ONLY content</b>');
                expect(ssrContents).toContain('Outside of the container (must be retained).');
                const clientRootNode = compRef.location.nativeElement;
                yield appRef.whenStable();
                const clientContents = (0, hydration_utils_1.stripExcessiveSpaces)((0, dom_utils_1.stripUtilAttributes)(clientRootNode.outerHTML, false));
                // After the cleanup, we expect to see CLIENT content, but not SERVER.
                expect(clientContents).toContain('<i>This is a CLIENT-ONLY content</i>');
                expect(clientContents).not.toContain('<b>This is a SERVER-ONLY content</b>');
                // This line must be preserved (it's outside of the dehydrated container).
                expect(clientContents).toContain('Outside of the container (must be retained).');
            }));
            it('should reconcile *ngFor-generated views', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [common_1.NgIf, common_1.NgFor],
                            template: `
            <div>
              <span *ngFor="let item of items">
                {{ item }}
                <b *ngIf="item > 15">is bigger than 15!</b>
              </span>
              <main>Hi! This is the main content.</main>
            </div>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.isServer = (0, common_1.isPlatformServer)((0, core_1.inject)(core_1.PLATFORM_ID));
                            // Note: this is needed to test cleanup/reconciliation logic.
                            this.items = this.isServer ? [10, 20, 100, 200] : [30, 5, 50];
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                yield appRef.whenStable();
                // Post-cleanup should *not* contain dehydrated views.
                const postCleanupContents = (0, hydration_utils_1.stripExcessiveSpaces)(clientRootNode.outerHTML);
                expect(postCleanupContents).not.toContain('<span> 5 <b>is bigger than 15!</b><!--container--></span>');
                expect(postCleanupContents).toContain('<span> 30 <b>is bigger than 15!</b><!--container--></span>');
                expect(postCleanupContents).toContain('<span> 5 <!--container--></span>');
                expect(postCleanupContents).toContain('<span> 50 <b>is bigger than 15!</b><!--container--></span>');
            }));
            it('should cleanup dehydrated views within dynamically created components', () => __awaiter(void 0, void 0, void 0, function* () {
                let DynamicComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            imports: [common_1.CommonModule],
                            selector: 'dynamic',
                            template: `
            <span>This is a content of a dynamic component.</span>
            <b *ngIf="isServer">This is a SERVER-ONLY content</b>
            <i *ngIf="!isServer">This is a CLIENT-ONLY content</i>
            <ng-container *ngIf="isServer">
              This is also a SERVER-ONLY content, but inside ng-container.
              <b>With some extra tags</b> and some text inside.
            </ng-container>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var DynamicComponent = _classThis = class {
                        constructor() {
                            this.isServer = (0, common_1.isPlatformServer)((0, core_1.inject)(core_1.PLATFORM_ID));
                        }
                    };
                    __setFunctionName(_classThis, "DynamicComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DynamicComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DynamicComponent = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [common_1.NgIf, common_1.NgFor],
                            template: `
            <div #target></div>
            <main>Hi! This is the main content.</main>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _vcr_decorators;
                    let _vcr_initializers = [];
                    let _vcr_extraInitializers = [];
                    var SimpleComponent = _classThis = class {
                        ngAfterViewInit() {
                            const compRef = this.vcr.createComponent(DynamicComponent);
                            compRef.changeDetectorRef.detectChanges();
                        }
                        constructor() {
                            this.vcr = __runInitializers(this, _vcr_initializers, void 0);
                            __runInitializers(this, _vcr_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _vcr_decorators = [(0, core_1.ViewChild)('target', { read: core_1.ViewContainerRef })];
                        __esDecorate(null, null, _vcr_decorators, { kind: "field", name: "vcr", static: false, private: false, access: { has: obj => "vcr" in obj, get: obj => obj.vcr, set: (obj, value) => { obj.vcr = value; } }, metadata: _metadata }, _vcr_initializers, _vcr_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                let ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent, DynamicComponent);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                ssrContents = (0, hydration_utils_1.stripExcessiveSpaces)((0, dom_utils_1.stripUtilAttributes)(ssrContents, false));
                // We expect to see SERVER content, but not CLIENT.
                expect(ssrContents).not.toContain('<i>This is a CLIENT-ONLY content</i>');
                expect(ssrContents).toContain('<b>This is a SERVER-ONLY content</b>');
                const clientRootNode = compRef.location.nativeElement;
                yield appRef.whenStable();
                const clientContents = (0, hydration_utils_1.stripExcessiveSpaces)((0, dom_utils_1.stripUtilAttributes)(clientRootNode.outerHTML, false));
                // After the cleanup, we expect to see CLIENT content, but not SERVER.
                expect(clientContents).toContain('<i>This is a CLIENT-ONLY content</i>');
                expect(clientContents).not.toContain('<b>This is a SERVER-ONLY content</b>');
            }));
            it('should trigger change detection after cleanup (immediate)', () => __awaiter(void 0, void 0, void 0, function* () {
                const observedChildCountLog = [];
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [common_1.NgIf],
                            template: `
            <span *ngIf="isServer">This is a SERVER-ONLY content</span>
            <span *ngIf="!isServer">This is a CLIENT-ONLY content</span>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.isServer = (0, common_1.isPlatformServer)((0, core_1.inject)(core_1.PLATFORM_ID));
                            this.elementRef = (0, core_1.inject)(core_1.ElementRef);
                            (0, core_1.afterEveryRender)(() => {
                                observedChildCountLog.push(this.elementRef.nativeElement.childElementCount);
                            });
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                let ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                // Before hydration
                expect(observedChildCountLog).toEqual([]);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                yield appRef.whenStable();
                // afterRender should be triggered by:
                //   1.) Bootstrap
                //   2.) Microtask empty event
                //   3.) Stabilization + cleanup
                expect(observedChildCountLog).toEqual([2, 2, 1]);
            }));
            it('should trigger change detection after cleanup (deferred)', () => __awaiter(void 0, void 0, void 0, function* () {
                const observedChildCountLog = [];
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [common_1.NgIf],
                            template: `
            <span *ngIf="isServer">This is a SERVER-ONLY content</span>
            <span *ngIf="!isServer">This is a CLIENT-ONLY content</span>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.isServer = (0, common_1.isPlatformServer)((0, core_1.inject)(core_1.PLATFORM_ID));
                            this.elementRef = (0, core_1.inject)(core_1.ElementRef);
                            (0, core_1.afterEveryRender)(() => {
                                observedChildCountLog.push(this.elementRef.nativeElement.childElementCount);
                            });
                            // Create a dummy promise to prevent stabilization
                            new Promise((resolve) => {
                                setTimeout(resolve, 0);
                            });
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                let ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                // Before hydration
                expect(observedChildCountLog).toEqual([]);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                // afterRender should be triggered by:
                //   1.) Bootstrap
                //   2.) Microtask empty event
                expect(observedChildCountLog).toEqual([2, 2]);
                yield appRef.whenStable();
                // afterRender should be triggered by:
                //   3.) Microtask empty event
                //   4.) Stabilization + cleanup
                expect(observedChildCountLog).toEqual([2, 2, 2, 1]);
            }));
        });
        describe('content projection', () => {
            it('should project plain text', () => __awaiter(void 0, void 0, void 0, function* () {
                let ProjectorCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'projector-cmp',
                            template: `
            <main>
              <ng-content></ng-content>
            </main>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ProjectorCmp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "ProjectorCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ProjectorCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ProjectorCmp = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            imports: [ProjectorCmp],
                            selector: 'app',
                            template: `
            <projector-cmp>
              Projected content is just a plain text.
            </projector-cmp>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent, ProjectorCmp);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                    envProviders: [(0, hydration_utils_1.withDebugConsole)()],
                });
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                (0, hydration_utils_1.verifyHasLog)(appRef, 'Angular hydrated 2 component(s) and 5 node(s), 0 component(s) were skipped');
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
            }));
            it('should allow re-projection of child content', () => __awaiter(void 0, void 0, void 0, function* () {
                let MatStep = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'mat-step',
                            template: `<ng-template><ng-content /></ng-template>`,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _content_decorators;
                    let _content_initializers = [];
                    let _content_extraInitializers = [];
                    var MatStep = _classThis = class {
                        constructor() {
                            this.content = __runInitializers(this, _content_initializers, void 0);
                            __runInitializers(this, _content_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "MatStep");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _content_decorators = [(0, core_1.ViewChild)(core_1.TemplateRef, { static: true })];
                        __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: obj => "content" in obj, get: obj => obj.content, set: (obj, value) => { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MatStep = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MatStep = _classThis;
                })();
                let MatStepper = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'mat-stepper',
                            imports: [common_1.NgTemplateOutlet],
                            template: `
            @for (step of steps; track step) {
              <ng-container [ngTemplateOutlet]="step.content" />
            }
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _steps_decorators;
                    let _steps_initializers = [];
                    let _steps_extraInitializers = [];
                    var MatStepper = _classThis = class {
                        constructor() {
                            this.steps = __runInitializers(this, _steps_initializers, void 0);
                            __runInitializers(this, _steps_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "MatStepper");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _steps_decorators = [(0, core_1.ContentChildren)(MatStep)];
                        __esDecorate(null, null, _steps_decorators, { kind: "field", name: "steps", static: false, private: false, access: { has: obj => "steps" in obj, get: obj => obj.steps, set: (obj, value) => { obj.steps = value; } }, metadata: _metadata }, _steps_initializers, _steps_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MatStepper = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MatStepper = _classThis;
                })();
                let NestedCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'nested-cmp',
                            template: 'Nested cmp content',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var NestedCmp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "NestedCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        NestedCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return NestedCmp = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            imports: [MatStepper, MatStep, common_1.NgIf, NestedCmp],
                            selector: 'app',
                            template: `
            <mat-stepper>
              <mat-step>Text-only content</mat-step>

              <mat-step>
                <ng-container>Using ng-containers</ng-container>
              </mat-step>

              <mat-step>
                <ng-container *ngIf="true">
                  Using ng-containers with *ngIf
                </ng-container>
              </mat-step>

              <mat-step>
                @if (true) {
                  Using built-in control flow (if)
                }
              </mat-step>

              <mat-step>
                <nested-cmp />
              </mat-step>

            </mat-stepper>
          `,
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
                const html = yield (0, hydration_utils_1.ssr)(App);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                // Verify that elements projected without their parent nodes
                // use an element within the same template (at position `0`
                // in the test, i.e. `<mat-stepper>`) as an anchor.
                const hydrationInfo = (0, hydration_utils_1.getHydrationInfoFromTransferState)(ssrContents);
                expect(hydrationInfo).toContain('"n":{"2":"0f","4":"0fn2","7":"0fn5","9":"0fn9","11":"0fn12"}');
                (0, dom_utils_1.resetTViewsFor)(App, MatStepper, NestedCmp);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, App);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
            }));
            it('should project plain text and HTML elements', () => __awaiter(void 0, void 0, void 0, function* () {
                let ProjectorCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'projector-cmp',
                            template: `
            <main>
              <ng-content></ng-content>
            </main>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ProjectorCmp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "ProjectorCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ProjectorCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ProjectorCmp = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            imports: [ProjectorCmp],
                            selector: 'app',
                            template: `
            <projector-cmp>
              Projected content is a plain text.
              <b>Also the content has some tags</b>
            </projector-cmp>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent, ProjectorCmp);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
            }));
            it('should support re-projection of contents', () => __awaiter(void 0, void 0, void 0, function* () {
                let ReprojectorCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'reprojector-cmp',
                            template: `
            <main>
              <ng-content></ng-content>
            </main>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ReprojectorCmp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "ReprojectorCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ReprojectorCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ReprojectorCmp = _classThis;
                })();
                let ProjectorCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'projector-cmp',
                            imports: [ReprojectorCmp],
                            template: `
            <reprojector-cmp>
              <b>Before</b>
              <ng-content></ng-content>
              <i>After</i>
            </reprojector-cmp>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ProjectorCmp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "ProjectorCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ProjectorCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ProjectorCmp = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            imports: [ProjectorCmp],
                            selector: 'app',
                            template: `
            <projector-cmp>
              Projected content is a plain text.
            </projector-cmp>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent, ProjectorCmp, ReprojectorCmp);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
            }));
            it('should handle multiple nodes projected in a single slot', () => __awaiter(void 0, void 0, void 0, function* () {
                let ProjectorCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'projector-cmp',
                            template: `
            <ng-content select="foo" />
            <ng-content select="bar" />
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ProjectorCmp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "ProjectorCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ProjectorCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ProjectorCmp = _classThis;
                })();
                let FooCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({ selector: 'foo', standalone: true, template: '' })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var FooCmp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "FooCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        FooCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return FooCmp = _classThis;
                })();
                let BarCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({ selector: 'bar', standalone: true, template: '' })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var BarCmp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "BarCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        BarCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return BarCmp = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            imports: [ProjectorCmp, FooCmp, BarCmp],
                            selector: 'app',
                            template: `
            <projector-cmp>
              <foo />
              <bar />
              <foo />
            </projector-cmp>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent, ProjectorCmp);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
            }));
            it('should handle multiple nodes projected in a single slot (different order)', () => __awaiter(void 0, void 0, void 0, function* () {
                let ProjectorCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'projector-cmp',
                            template: `
            <ng-content select="foo" />
            <ng-content select="bar" />
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ProjectorCmp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "ProjectorCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ProjectorCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ProjectorCmp = _classThis;
                })();
                let FooCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({ selector: 'foo', standalone: true, template: '' })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var FooCmp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "FooCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        FooCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return FooCmp = _classThis;
                })();
                let BarCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({ selector: 'bar', standalone: true, template: '' })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var BarCmp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "BarCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        BarCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return BarCmp = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            imports: [ProjectorCmp, FooCmp, BarCmp],
                            selector: 'app',
                            template: `
            <projector-cmp>
              <bar />
              <foo />
              <bar />
            </projector-cmp>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent, ProjectorCmp);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
            }));
            it('should handle empty projection slots within <ng-container>', () => __awaiter(void 0, void 0, void 0, function* () {
                let ProjectorCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'projector-cmp',
                            imports: [common_1.CommonModule],
                            template: `
            <ng-container *ngIf="true">
              <ng-content select="[left]"></ng-content>
              <div>
                <ng-content select="[main]"></ng-content>
              </div>
              <ng-content select="[right]"></ng-content>
            </ng-container>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ProjectorCmp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "ProjectorCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ProjectorCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ProjectorCmp = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            imports: [ProjectorCmp],
                            selector: 'app',
                            template: `
            <projector-cmp />
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent, ProjectorCmp);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
            }));
            it('should handle empty projection slots within <ng-container> ' +
                '(when no other elements are present)', () => __awaiter(void 0, void 0, void 0, function* () {
                let ProjectorCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'projector-cmp',
                            imports: [common_1.CommonModule],
                            template: `
              <ng-container *ngIf="true">
                <ng-content select="[left]"></ng-content>
                <ng-content select="[right]"></ng-content>
              </ng-container>
            `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ProjectorCmp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "ProjectorCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ProjectorCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ProjectorCmp = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            imports: [ProjectorCmp],
                            selector: 'app',
                            template: `
              <projector-cmp />
            `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent, ProjectorCmp);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
            }));
            it('should handle empty projection slots within a template ' +
                '(when no other elements are present)', () => __awaiter(void 0, void 0, void 0, function* () {
                let ProjectorCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'projector-cmp',
                            template: `
              <ng-content select="[left]"></ng-content>
              <ng-content select="[right]"></ng-content>
             `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ProjectorCmp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "ProjectorCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ProjectorCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ProjectorCmp = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            imports: [ProjectorCmp],
                            selector: 'app',
                            template: `
              <projector-cmp />
            `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent, ProjectorCmp);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
            }));
            it('should project contents into different slots', () => __awaiter(void 0, void 0, void 0, function* () {
                let ProjectorCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'projector-cmp',
                            template: `
            <div>
              Header slot: <ng-content select="header"></ng-content>
              Main slot: <ng-content select="main"></ng-content>
              Footer slot: <ng-content select="footer"></ng-content>
              <ng-content></ng-content> <!-- everything else -->
            </div>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ProjectorCmp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "ProjectorCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ProjectorCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ProjectorCmp = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            imports: [ProjectorCmp],
                            selector: 'app',
                            template: `
            <projector-cmp>
              <!-- contents is intentionally randomly ordered -->
              <h1>H1</h1>
              <footer>Footer</footer>
              <header>Header</header>
              <main>Main</main>
              <h2>H2</h2>
            </projector-cmp>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent, ProjectorCmp);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
            }));
            it('should handle view container nodes that go after projection slots', () => __awaiter(void 0, void 0, void 0, function* () {
                let ProjectorCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'projector-cmp',
                            imports: [common_1.CommonModule],
                            template: `
            <ng-container *ngIf="true">
              <ng-content select="[left]"></ng-content>
              <span *ngIf="true">{{ label }}</span>
            </ng-container>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ProjectorCmp = _classThis = class {
                        constructor() {
                            this.label = 'Hi';
                        }
                    };
                    __setFunctionName(_classThis, "ProjectorCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ProjectorCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ProjectorCmp = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            imports: [ProjectorCmp],
                            selector: 'app',
                            template: `
            <projector-cmp />
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent, ProjectorCmp);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
            }));
            it('should handle view container nodes that go after projection slots ' +
                '(when view container host node is <ng-container>)', () => __awaiter(void 0, void 0, void 0, function* () {
                let ProjectorCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'projector-cmp',
                            imports: [common_1.CommonModule],
                            template: `
              <ng-container *ngIf="true">
                <ng-content select="[left]"></ng-content>
                <ng-container *ngIf="true">{{ label }}</ng-container>
              </ng-container>
            `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ProjectorCmp = _classThis = class {
                        constructor() {
                            this.label = 'Hi';
                        }
                    };
                    __setFunctionName(_classThis, "ProjectorCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ProjectorCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ProjectorCmp = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            imports: [ProjectorCmp],
                            selector: 'app',
                            template: `
              <projector-cmp />
            `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent, ProjectorCmp);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
            }));
            describe('partial projection', () => {
                it('should support cases when some element nodes are not projected', () => __awaiter(void 0, void 0, void 0, function* () {
                    let ProjectorCmp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'projector-cmp',
                                template: `
              <div>
                Header slot: <ng-content select="header" />
                Main slot: <ng-content select="main" />
                Footer slot: <ng-content select="footer" />
                <!-- no "default" projection bucket -->
              </div>
            `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var ProjectorCmp = _classThis = class {
                        };
                        __setFunctionName(_classThis, "ProjectorCmp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            ProjectorCmp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return ProjectorCmp = _classThis;
                    })();
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                imports: [ProjectorCmp],
                                selector: 'app',
                                template: `
              <projector-cmp>
                <!-- contents is randomly ordered for testing -->
                <h1>This node is not projected.</h1>
                <footer>Footer</footer>
                <header>Header</header>
                <main>Main</main>
                <h2>This node is not projected as well.</h2>
              </projector-cmp>
            `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain('<app ngh');
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent, ProjectorCmp);
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    const clientRootNode = compRef.location.nativeElement;
                    (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                    (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                }));
                it('should support cases when some element nodes are not projected', () => __awaiter(void 0, void 0, void 0, function* () {
                    let DropdownContentComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'app-dropdown-content',
                                template: `<ng-content />`,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var DropdownContentComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "DropdownContentComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            DropdownContentComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return DropdownContentComponent = _classThis;
                    })();
                    let DropdownComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'app-dropdown',
                                template: `
              @if (false) {
                <ng-content select="app-dropdown-content" />
              }
            `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var DropdownComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "DropdownComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            DropdownComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return DropdownComponent = _classThis;
                    })();
                    let MenuComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                imports: [DropdownComponent, DropdownContentComponent],
                                selector: 'app-menu',
                                template: `
              <app-dropdown>
                <app-dropdown-content>
                  <ng-content />
                </app-dropdown-content>
              </app-dropdown>
            `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var MenuComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "MenuComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            MenuComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return MenuComponent = _classThis;
                    })();
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'app',
                                standalone: true,
                                imports: [MenuComponent],
                                template: `
              <app-menu>
                Menu Content
              </app-menu>
            `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain('<app ngh');
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent, MenuComponent, DropdownComponent, DropdownContentComponent);
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    const clientRootNode = compRef.location.nativeElement;
                    (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                    (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                }));
                it('should support cases when view containers are not projected', () => __awaiter(void 0, void 0, void 0, function* () {
                    let ProjectorCmp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'projector-cmp',
                                template: `No content projection slots.`,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var ProjectorCmp = _classThis = class {
                        };
                        __setFunctionName(_classThis, "ProjectorCmp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            ProjectorCmp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return ProjectorCmp = _classThis;
                    })();
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                imports: [ProjectorCmp],
                                selector: 'app',
                                template: `
              <projector-cmp>
                <ng-container *ngIf="true">
                  <h1>This node is not projected.</h1>
                  <h2>This node is not projected as well.</h2>
                </ng-container>
              </projector-cmp>
            `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain('<app ngh');
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent, ProjectorCmp);
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    const clientRootNode = compRef.location.nativeElement;
                    (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                    (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                }));
                it('should support cases when component nodes are not projected', () => __awaiter(void 0, void 0, void 0, function* () {
                    let ProjectorCmp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'projector-cmp',
                                template: `No content projection slots.`,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var ProjectorCmp = _classThis = class {
                        };
                        __setFunctionName(_classThis, "ProjectorCmp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            ProjectorCmp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return ProjectorCmp = _classThis;
                    })();
                    let NestedComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'nested',
                                template: 'This is a nested component.',
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var NestedComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "NestedComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            NestedComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return NestedComponent = _classThis;
                    })();
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                imports: [ProjectorCmp, NestedComponent],
                                selector: 'app',
                                template: `
              <projector-cmp>
                <nested>
                  <h1>This node is not projected.</h1>
                  <h2>This node is not projected as well.</h2>
                </nested>
              </projector-cmp>
            `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain('<app ngh');
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent, ProjectorCmp, NestedComponent);
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    const clientRootNode = compRef.location.nativeElement;
                    (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                    (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                }));
                it('should support cases when component nodes are not projected in nested components', () => __awaiter(void 0, void 0, void 0, function* () {
                    let ProjectorCmp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'projector-cmp',
                                template: `
                <main>
                  <ng-content />
                </main>
              `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var ProjectorCmp = _classThis = class {
                        };
                        __setFunctionName(_classThis, "ProjectorCmp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            ProjectorCmp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return ProjectorCmp = _classThis;
                    })();
                    let NestedComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'nested',
                                template: 'No content projection slots.',
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var NestedComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "NestedComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            NestedComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return NestedComponent = _classThis;
                    })();
                    let SimpleComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                imports: [ProjectorCmp, NestedComponent],
                                selector: 'app',
                                template: `
                <projector-cmp>
                  <nested>
                    <h1>This node is not projected.</h1>
                    <h2>This node is not projected as well.</h2>
                  </nested>
                </projector-cmp>
              `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "SimpleComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleComponent = _classThis;
                    })();
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain('<app ngh');
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent, ProjectorCmp, NestedComponent);
                    const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                    const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                    appRef.tick();
                    const clientRootNode = compRef.location.nativeElement;
                    (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                    (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                }));
            });
            it("should project contents with *ngIf's", () => __awaiter(void 0, void 0, void 0, function* () {
                let ProjectorCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'projector-cmp',
                            template: `
            <main>
              <ng-content></ng-content>
            </main>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ProjectorCmp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "ProjectorCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ProjectorCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ProjectorCmp = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            imports: [ProjectorCmp, common_1.CommonModule],
                            selector: 'app',
                            template: `
            <projector-cmp>
              <h1 *ngIf="visible">Header with an ngIf condition.</h1>
            </projector-cmp>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.visible = true;
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent, ProjectorCmp);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
            }));
            it('should project contents with *ngFor', () => __awaiter(void 0, void 0, void 0, function* () {
                let ProjectorCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'projector-cmp',
                            template: `
            <main>
              <ng-content></ng-content>
            </main>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ProjectorCmp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "ProjectorCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ProjectorCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ProjectorCmp = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            imports: [ProjectorCmp, common_1.CommonModule],
                            selector: 'app',
                            template: `
            <projector-cmp>
              <h1 *ngFor="let item of items">Item {{ item }}</h1>
            </projector-cmp>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.items = [1, 2, 3];
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent, ProjectorCmp);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
            }));
            it('should support projecting contents outside of a current host element', () => __awaiter(void 0, void 0, void 0, function* () {
                let DynamicComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'dynamic-cmp',
                            template: `<div #target></div>`,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _vcRef_decorators;
                    let _vcRef_initializers = [];
                    let _vcRef_extraInitializers = [];
                    var DynamicComponent = _classThis = class {
                        createView(tmplRef) {
                            this.vcRef.createEmbeddedView(tmplRef);
                        }
                        constructor() {
                            this.vcRef = __runInitializers(this, _vcRef_initializers, void 0);
                            __runInitializers(this, _vcRef_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "DynamicComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _vcRef_decorators = [(0, core_1.ViewChild)('target', { read: core_1.ViewContainerRef })];
                        __esDecorate(null, null, _vcRef_decorators, { kind: "field", name: "vcRef", static: false, private: false, access: { has: obj => "vcRef" in obj, get: obj => obj.vcRef, set: (obj, value) => { obj.vcRef = value; } }, metadata: _metadata }, _vcRef_initializers, _vcRef_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DynamicComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DynamicComponent = _classThis;
                })();
                let ProjectorCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'projector-cmp',
                            template: `
            <ng-template #ref>
              <ng-content></ng-content>
            </ng-template>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _tmplRef_decorators;
                    let _tmplRef_initializers = [];
                    let _tmplRef_extraInitializers = [];
                    var ProjectorCmp = _classThis = class {
                        constructor() {
                            this.tmplRef = __runInitializers(this, _tmplRef_initializers, void 0);
                            this.appRef = (__runInitializers(this, _tmplRef_extraInitializers), (0, core_1.inject)(core_1.ApplicationRef));
                            this.environmentInjector = (0, core_1.inject)(core_1.EnvironmentInjector);
                            this.doc = (0, core_1.inject)(common_1.DOCUMENT);
                            this.isServer = (0, common_1.isPlatformServer)((0, core_1.inject)(core_1.PLATFORM_ID));
                        }
                        ngAfterViewInit() {
                            // Create a host DOM node outside of the main app's host node
                            // to emulate a situation where a host node already exists
                            // on a page.
                            let hostElement;
                            if (this.isServer) {
                                hostElement = this.doc.createElement('portal-app');
                                this.doc.body.insertBefore(hostElement, this.doc.body.firstChild);
                            }
                            else {
                                hostElement = this.doc.querySelector('portal-app');
                            }
                            const cmp = (0, core_1.createComponent)(DynamicComponent, {
                                hostElement,
                                environmentInjector: this.environmentInjector,
                            });
                            cmp.changeDetectorRef.detectChanges();
                            cmp.instance.createView(this.tmplRef);
                            this.appRef.attachView(cmp.hostView);
                        }
                    };
                    __setFunctionName(_classThis, "ProjectorCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _tmplRef_decorators = [(0, core_1.ViewChild)('ref', { read: core_1.TemplateRef })];
                        __esDecorate(null, null, _tmplRef_decorators, { kind: "field", name: "tmplRef", static: false, private: false, access: { has: obj => "tmplRef" in obj, get: obj => obj.tmplRef, set: (obj, value) => { obj.tmplRef = value; } }, metadata: _metadata }, _tmplRef_initializers, _tmplRef_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ProjectorCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ProjectorCmp = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            imports: [ProjectorCmp, common_1.CommonModule],
                            selector: 'app',
                            template: `
            <projector-cmp>
              <header>Header</header>
            </projector-cmp>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.visible = true;
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent, ProjectorCmp);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                const portalRootNode = clientRootNode.ownerDocument.querySelector('portal-app');
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(portalRootNode.firstChild);
                const clientContents = (0, dom_utils_1.stripUtilAttributes)(portalRootNode.outerHTML, false) +
                    (0, dom_utils_1.stripUtilAttributes)(clientRootNode.outerHTML, false);
                expect(clientContents).toBe((0, hydration_utils_1.stripSsrIntegrityMarker)((0, dom_utils_1.stripUtilAttributes)((0, hydration_utils_1.stripTransferDataScript)(ssrContents), false)), 'Client and server contents mismatch');
            }));
            it('should handle projected containers inside other containers', () => __awaiter(void 0, void 0, void 0, function* () {
                let ChildComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'child-comp',
                            template: '<ng-content />',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ChildComp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "ChildComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ChildComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ChildComp = _classThis;
                })();
                let RootComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'root-comp',
                            template: '<ng-content />',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var RootComp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "RootComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        RootComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return RootComp = _classThis;
                })();
                let MyApp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [common_1.CommonModule, RootComp, ChildComp],
                            template: `
            <root-comp>
              <ng-container *ngFor="let item of items; last as last">
                <child-comp *ngIf="!last">{{ item }}|</child-comp>
              </ng-container>
            </root-comp>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyApp = _classThis = class {
                        constructor() {
                            this.items = [1, 2, 3];
                        }
                    };
                    __setFunctionName(_classThis, "MyApp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyApp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyApp = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(MyApp);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(MyApp, RootComp, ChildComp);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, MyApp);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
            }));
            it('should throw an error when projecting DOM nodes via ViewContainerRef.createComponent API', () => __awaiter(void 0, void 0, void 0, function* () {
                let DynamicComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'dynamic',
                            template: `
              <ng-content />
              <ng-content />
            `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var DynamicComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "DynamicComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DynamicComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DynamicComponent = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [common_1.NgIf, common_1.NgFor],
                            template: `
              <div #target></div>
              <main>Hi! This is the main content.</main>
            `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _vcr_decorators;
                    let _vcr_initializers = [];
                    let _vcr_extraInitializers = [];
                    var SimpleComponent = _classThis = class {
                        ngAfterViewInit() {
                            const div = document.createElement('div');
                            const p = document.createElement('p');
                            const span = document.createElement('span');
                            const b = document.createElement('b');
                            // In this test we create DOM nodes outside of Angular context
                            // (i.e. not using Angular APIs) and try to content-project them.
                            // This is an unsupported pattern and we expect an exception.
                            const compRef = this.vcr.createComponent(DynamicComponent, {
                                projectableNodes: [
                                    [div, p],
                                    [span, b],
                                ],
                            });
                            compRef.changeDetectorRef.detectChanges();
                        }
                        constructor() {
                            this.vcr = __runInitializers(this, _vcr_initializers, void 0);
                            __runInitializers(this, _vcr_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _vcr_decorators = [(0, core_1.ViewChild)('target', { read: core_1.ViewContainerRef })];
                        __esDecorate(null, null, _vcr_decorators, { kind: "field", name: "vcr", static: false, private: false, access: { has: obj => "vcr" in obj, get: obj => obj.vcr, set: (obj, value) => { obj.vcr = value; } }, metadata: _metadata }, _vcr_initializers, _vcr_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                try {
                    yield (0, hydration_utils_1.ssr)(SimpleComponent);
                }
                catch (error) {
                    const errorMessage = error.toString();
                    expect(errorMessage).toContain('During serialization, Angular detected DOM nodes that ' +
                        'were created outside of Angular context');
                    expect(errorMessage).toContain('<dynamic>…</dynamic>  <-- AT THIS LOCATION');
                }
            }));
            it('should throw an error when projecting DOM nodes via createComponent function call', () => __awaiter(void 0, void 0, void 0, function* () {
                let DynamicComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'dynamic',
                            template: `
              <ng-content />
              <ng-content />
            `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var DynamicComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "DynamicComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DynamicComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DynamicComponent = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [common_1.NgIf, common_1.NgFor],
                            template: `
              <div #target></div>
              <main>Hi! This is the main content.</main>
            `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _vcr_decorators;
                    let _vcr_initializers = [];
                    let _vcr_extraInitializers = [];
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.vcr = __runInitializers(this, _vcr_initializers, void 0);
                            this.envInjector = (__runInitializers(this, _vcr_extraInitializers), (0, core_1.inject)(core_1.EnvironmentInjector));
                        }
                        ngAfterViewInit() {
                            const div = document.createElement('div');
                            const p = document.createElement('p');
                            const span = document.createElement('span');
                            const b = document.createElement('b');
                            // In this test we create DOM nodes outside of Angular context
                            // (i.e. not using Angular APIs) and try to content-project them.
                            // This is an unsupported pattern and we expect an exception.
                            const compRef = (0, core_1.createComponent)(DynamicComponent, {
                                environmentInjector: this.envInjector,
                                projectableNodes: [
                                    [div, p],
                                    [span, b],
                                ],
                            });
                            compRef.changeDetectorRef.detectChanges();
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _vcr_decorators = [(0, core_1.ViewChild)('target', { read: core_1.ViewContainerRef })];
                        __esDecorate(null, null, _vcr_decorators, { kind: "field", name: "vcr", static: false, private: false, access: { has: obj => "vcr" in obj, get: obj => obj.vcr, set: (obj, value) => { obj.vcr = value; } }, metadata: _metadata }, _vcr_initializers, _vcr_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                try {
                    yield (0, hydration_utils_1.ssr)(SimpleComponent);
                }
                catch (error) {
                    const errorMessage = error.toString();
                    expect(errorMessage).toContain('During serialization, Angular detected DOM nodes that ' +
                        'were created outside of Angular context');
                    expect(errorMessage).toContain('<dynamic>…</dynamic>  <-- AT THIS LOCATION');
                }
            }));
            it('should support cases when <ng-content> is used with *ngIf="false"', () => __awaiter(void 0, void 0, void 0, function* () {
                let ProjectorCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'projector-cmp',
                            imports: [common_1.NgIf],
                            template: `
            Project?: <span>{{ project ? 'yes' : 'no' }}</span>
            <ng-content *ngIf="project" />
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _project_decorators;
                    let _project_initializers = [];
                    let _project_extraInitializers = [];
                    var ProjectorCmp = _classThis = class {
                        constructor() {
                            this.project = __runInitializers(this, _project_initializers, false);
                            __runInitializers(this, _project_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "ProjectorCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _project_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _project_decorators, { kind: "field", name: "project", static: false, private: false, access: { has: obj => "project" in obj, get: obj => obj.project, set: (obj, value) => { obj.project = value; } }, metadata: _metadata }, _project_initializers, _project_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ProjectorCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ProjectorCmp = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            imports: [ProjectorCmp],
                            selector: 'app',
                            template: `
              <projector-cmp [project]="project">
                <h1>This node is not projected.</h1>
                <h2>This node is not projected as well.</h2>
              </projector-cmp>
            `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.project = false;
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent, ProjectorCmp);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                let h1 = clientRootNode.querySelector('h1');
                let h2 = clientRootNode.querySelector('h2');
                let span = clientRootNode.querySelector('span');
                expect(h1).not.toBeDefined();
                expect(h2).not.toBeDefined();
                expect(span.textContent).toBe('no');
                // Flip the flag to enable content projection.
                compRef.instance.project = true;
                compRef.changeDetectorRef.detectChanges();
                h1 = clientRootNode.querySelector('h1');
                h2 = clientRootNode.querySelector('h2');
                span = clientRootNode.querySelector('span');
                expect(h1).toBeDefined();
                expect(h2).toBeDefined();
                expect(span.textContent).toBe('yes');
            }));
            it('should support cases when <ng-content> is used with *ngIf="true"', () => __awaiter(void 0, void 0, void 0, function* () {
                let ProjectorCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'projector-cmp',
                            imports: [common_1.NgIf],
                            template: `
            Project?: <span>{{ project ? 'yes' : 'no' }}</span>
            <ng-content *ngIf="project" />
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _project_decorators;
                    let _project_initializers = [];
                    let _project_extraInitializers = [];
                    var ProjectorCmp = _classThis = class {
                        constructor() {
                            this.project = __runInitializers(this, _project_initializers, false);
                            __runInitializers(this, _project_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "ProjectorCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _project_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _project_decorators, { kind: "field", name: "project", static: false, private: false, access: { has: obj => "project" in obj, get: obj => obj.project, set: (obj, value) => { obj.project = value; } }, metadata: _metadata }, _project_initializers, _project_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ProjectorCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ProjectorCmp = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            imports: [ProjectorCmp],
                            selector: 'app',
                            template: `
              <projector-cmp [project]="project">
                <h1>This node is projected.</h1>
                <h2>This node is projected as well.</h2>
              </projector-cmp>
            `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.project = true;
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent, ProjectorCmp);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                let h1 = clientRootNode.querySelector('h1');
                let h2 = clientRootNode.querySelector('h2');
                let span = clientRootNode.querySelector('span');
                expect(h1).toBeDefined();
                expect(h2).toBeDefined();
                expect(span.textContent).toBe('yes');
                // Flip the flag to disable content projection.
                compRef.instance.project = false;
                compRef.changeDetectorRef.detectChanges();
                h1 = clientRootNode.querySelector('h1');
                h2 = clientRootNode.querySelector('h2');
                span = clientRootNode.querySelector('span');
                expect(h1).not.toBeDefined();
                expect(h2).not.toBeDefined();
                expect(span.textContent).toBe('no');
            }));
            it('should support slots with fallback content', () => __awaiter(void 0, void 0, void 0, function* () {
                let ProjectorCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'projector-cmp',
                            template: `
            <div>
              Header slot: <ng-content select="header">Header fallback</ng-content>
              Main slot: <ng-content select="main"><main>Main fallback</main></ng-content>
              Footer slot: <ng-content select="footer">Footer fallback {{expr}}</ng-content>
              <ng-content>Wildcard fallback</ng-content>
            </div>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ProjectorCmp = _classThis = class {
                        constructor() {
                            this.expr = 123;
                        }
                    };
                    __setFunctionName(_classThis, "ProjectorCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ProjectorCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ProjectorCmp = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            imports: [ProjectorCmp],
                            selector: 'app',
                            template: `<projector-cmp></projector-cmp>`,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent, ProjectorCmp);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                const content = clientRootNode.innerHTML;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                expect(content).toContain('Header slot: Header fallback');
                expect(content).toContain('Main slot: <main>Main fallback</main>');
                expect(content).toContain('Footer slot: Footer fallback 123');
                expect(content).toContain('Wildcard fallback');
            }));
            it('should support mixed slots with and without fallback content', () => __awaiter(void 0, void 0, void 0, function* () {
                let ProjectorCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'projector-cmp',
                            template: `
            <div>
              Header slot: <ng-content select="header">Header fallback</ng-content>
              Main slot: <ng-content select="main"><main>Main fallback</main></ng-content>
              Footer slot: <ng-content select="footer">Footer fallback {{expr}}</ng-content>
              <ng-content>Wildcard fallback</ng-content>
            </div>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ProjectorCmp = _classThis = class {
                        constructor() {
                            this.expr = 123;
                        }
                    };
                    __setFunctionName(_classThis, "ProjectorCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ProjectorCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ProjectorCmp = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            imports: [ProjectorCmp],
                            selector: 'app',
                            template: `
            <projector-cmp>
              <header>Header override</header>
              <footer>
                <h1>Footer override {{expr}}</h1>
              </footer>
            </projector-cmp>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.expr = 321;
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent, ProjectorCmp);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                const content = clientRootNode.innerHTML;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                expect(content).toContain('Header slot: <!--container--><header>Header override</header>');
                expect(content).toContain('Main slot: <main>Main fallback</main>');
                expect(content).toContain('Footer slot: <!--container--><footer><h1>Footer override 321</h1></footer>');
                expect(content).toContain('Wildcard fallback');
            }));
        });
        describe('unsupported Zone.js config', () => {
            it('should log a warning when a noop zone is used', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            template: `Hi!`,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                    envProviders: [{ provide: core_1.NgZone, useValue: new ng_zone_1.NoopNgZone() }, (0, hydration_utils_1.withDebugConsole)()],
                });
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                (0, hydration_utils_1.verifyHasLog)(appRef, 'NG05000: Angular detected that hydration was enabled for an application ' +
                    'that uses a custom or a noop Zone.js implementation.');
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
            }));
            it('should log a warning when a custom zone is used', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            template: `Hi!`,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                class CustomNgZone extends core_1.NgZone {
                }
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                    envProviders: [{ provide: core_1.NgZone, useValue: new CustomNgZone({}) }, (0, hydration_utils_1.withDebugConsole)()],
                });
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                (0, hydration_utils_1.verifyHasLog)(appRef, 'NG05000: Angular detected that hydration was enabled for an application ' +
                    'that uses a custom or a noop Zone.js implementation.');
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
            }));
        });
        describe('error handling', () => {
            it('should handle text node mismatch', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            template: `
        <div id="abc">This is an original content</div>
    `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.doc = (0, core_1.inject)(common_1.DOCUMENT);
                        }
                        ngAfterViewInit() {
                            const div = this.doc.querySelector('div');
                            div.innerHTML = '<span title="Hi!">This is an extra span causing a problem!</span>';
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                    envProviders: [(0, hydration_utils_1.withNoopErrorHandler)()],
                }).catch((err) => {
                    const message = err.message;
                    expect(message).toContain('During hydration Angular expected a text node but found <span>');
                    expect(message).toContain('#text(This is an original content)  <-- AT THIS LOCATION');
                    expect(message).toContain('<span title="Hi!">…</span>  <-- AT THIS LOCATION');
                    (0, hydration_utils_1.verifyNodeHasMismatchInfo)(doc);
                });
            }));
            it('should not crash when a node can not be found during hydration', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            template: `
        Some text.
        <div id="abc">This is an original content</div>
    `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.doc = (0, core_1.inject)(common_1.DOCUMENT);
                            this.isServer = (0, common_1.isPlatformServer)((0, core_1.inject)(core_1.PLATFORM_ID));
                        }
                        ngAfterViewInit() {
                            if (this.isServer) {
                                const div = this.doc.querySelector('div');
                                div.remove();
                            }
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                    envProviders: (0, hydration_utils_1.withNoopErrorHandler)(),
                }).catch((err) => {
                    const message = err.message;
                    expect(message).toContain('During hydration Angular expected <div> but the node was not found');
                    expect(message).toContain('<div id="abc">…</div>  <-- AT THIS LOCATION');
                    (0, hydration_utils_1.verifyNodeHasMismatchInfo)(doc);
                });
            }));
            it('should handle element node mismatch', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            template: `
        <div id="abc">
          <p>This is an original content</p>
          <b>Bold text</b>
          <i>Italic text</i>
        </div>
    `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.doc = (0, core_1.inject)(common_1.DOCUMENT);
                        }
                        ngAfterViewInit() {
                            var _a;
                            const b = this.doc.querySelector('b');
                            const span = this.doc.createElement('span');
                            span.textContent = 'This is an eeeeevil span causing a problem!';
                            (_a = b === null || b === void 0 ? void 0 : b.parentNode) === null || _a === void 0 ? void 0 : _a.replaceChild(span, b);
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                    envProviders: [(0, hydration_utils_1.withNoopErrorHandler)()],
                }).catch((err) => {
                    const message = err.message;
                    expect(message).toContain('During hydration Angular expected <b> but found <span>');
                    expect(message).toContain('<b>…</b>  <-- AT THIS LOCATION');
                    expect(message).toContain('<span>…</span>  <-- AT THIS LOCATION');
                    (0, hydration_utils_1.verifyNodeHasMismatchInfo)(doc);
                });
            }));
            it('should handle <ng-container> node mismatch', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            template: `
        <b>Bold text</b>
        <ng-container>
          <p>This is an original content</p>
        </ng-container>
      `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.doc = (0, core_1.inject)(common_1.DOCUMENT);
                        }
                        ngAfterViewInit() {
                            var _a;
                            const p = this.doc.querySelector('p');
                            const span = this.doc.createElement('span');
                            span.textContent = 'This is an eeeeevil span causing a problem!';
                            (_a = p === null || p === void 0 ? void 0 : p.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(span, p.nextSibling);
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                    envProviders: [(0, hydration_utils_1.withNoopErrorHandler)()],
                }).catch((err) => {
                    const message = err.message;
                    expect(message).toContain('During hydration Angular expected a comment node but found <span>');
                    expect(message).toContain('<!-- ng-container -->  <-- AT THIS LOCATION');
                    expect(message).toContain('<span>…</span>  <-- AT THIS LOCATION');
                });
            }));
            it('should handle <ng-container> node mismatch ' +
                '(when it is wrapped into a non-container node)', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            template: `
          <div id="abc" class="wrapper">
            <ng-container>
              <p>This is an original content</p>
            </ng-container>
          </div>
        `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.doc = (0, core_1.inject)(common_1.DOCUMENT);
                        }
                        ngAfterViewInit() {
                            var _a;
                            const p = this.doc.querySelector('p');
                            const span = this.doc.createElement('span');
                            span.textContent = 'This is an eeeeevil span causing a problem!';
                            (_a = p === null || p === void 0 ? void 0 : p.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(span, p.nextSibling);
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                    envProviders: [(0, hydration_utils_1.withNoopErrorHandler)()],
                }).catch((err) => {
                    const message = err.message;
                    expect(message).toContain('During hydration Angular expected a comment node but found <span>');
                    expect(message).toContain('<!-- ng-container -->  <-- AT THIS LOCATION');
                    expect(message).toContain('<span>…</span>  <-- AT THIS LOCATION');
                });
            }));
            it('should handle <ng-template> node mismatch', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [common_1.CommonModule],
                            template: `
          <b *ngIf="true">Bold text</b>
          <i *ngIf="false">Italic text</i>
        `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.doc = (0, core_1.inject)(common_1.DOCUMENT);
                        }
                        ngAfterViewInit() {
                            var _a;
                            const b = this.doc.querySelector('b');
                            const firstCommentNode = b.nextSibling;
                            const span = this.doc.createElement('span');
                            span.textContent = 'This is an eeeeevil span causing a problem!';
                            (_a = firstCommentNode === null || firstCommentNode === void 0 ? void 0 : firstCommentNode.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(span, firstCommentNode.nextSibling);
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                    envProviders: [(0, hydration_utils_1.withNoopErrorHandler)()],
                }).catch((err) => {
                    const message = err.message;
                    expect(message).toContain('During hydration Angular expected a comment node but found <span>');
                    expect(message).toContain('<!-- container -->  <-- AT THIS LOCATION');
                    expect(message).toContain('<span>…</span>  <-- AT THIS LOCATION');
                    (0, hydration_utils_1.verifyNodeHasMismatchInfo)(doc);
                });
            }));
            it('should handle node mismatches in nested components', () => __awaiter(void 0, void 0, void 0, function* () {
                let NestedComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'nested-cmp',
                            imports: [common_1.CommonModule],
                            template: `
          <b *ngIf="true">Bold text</b>
          <i *ngIf="false">Italic text</i>
        `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var NestedComponent = _classThis = class {
                        constructor() {
                            this.doc = (0, core_1.inject)(common_1.DOCUMENT);
                        }
                        ngAfterViewInit() {
                            var _a;
                            const b = this.doc.querySelector('b');
                            const firstCommentNode = b.nextSibling;
                            const span = this.doc.createElement('span');
                            span.textContent = 'This is an eeeeevil span causing a problem!';
                            (_a = firstCommentNode === null || firstCommentNode === void 0 ? void 0 : firstCommentNode.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(span, firstCommentNode.nextSibling);
                        }
                    };
                    __setFunctionName(_classThis, "NestedComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        NestedComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return NestedComponent = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [NestedComponent],
                            template: `<nested-cmp />`,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                    envProviders: [(0, hydration_utils_1.withNoopErrorHandler)()],
                }).catch((err) => {
                    const message = err.message;
                    expect(message).toContain('During hydration Angular expected a comment node but found <span>');
                    expect(message).toContain('<!-- container -->  <-- AT THIS LOCATION');
                    expect(message).toContain('<span>…</span>  <-- AT THIS LOCATION');
                    expect(message).toContain('check the "NestedComponent" component');
                    (0, hydration_utils_1.verifyNodeHasMismatchInfo)(doc, 'nested-cmp');
                });
            }));
            it('should handle sibling count mismatch', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [common_1.CommonModule],
                            template: `
          <ng-container *ngIf="true">
            <b>Bold text</b>
            <i>Italic text</i>
          </ng-container>
          <main>Main content</main>
        `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.doc = (0, core_1.inject)(common_1.DOCUMENT);
                        }
                        ngAfterViewInit() {
                            var _a, _b;
                            (_a = this.doc.querySelector('b')) === null || _a === void 0 ? void 0 : _a.remove();
                            (_b = this.doc.querySelector('i')) === null || _b === void 0 ? void 0 : _b.remove();
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                    envProviders: [(0, hydration_utils_1.withNoopErrorHandler)()],
                }).catch((err) => {
                    const message = err.message;
                    expect(message).toContain('During hydration Angular expected more sibling nodes to be present');
                    expect(message).toContain('<main>…</main>  <-- AT THIS LOCATION');
                    (0, hydration_utils_1.verifyNodeHasMismatchInfo)(doc);
                });
            }));
            it('should handle ViewContainerRef node mismatch', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleDir = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            standalone: true,
                            selector: 'b',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleDir = _classThis = class {
                        constructor() {
                            this.vcr = (0, core_1.inject)(core_1.ViewContainerRef);
                        }
                    };
                    __setFunctionName(_classThis, "SimpleDir");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleDir = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleDir = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [common_1.CommonModule, SimpleDir],
                            template: `
        <b>Bold text</b>
      `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.doc = (0, core_1.inject)(common_1.DOCUMENT);
                        }
                        ngAfterViewInit() {
                            var _a;
                            const b = this.doc.querySelector('b');
                            const firstCommentNode = b.nextSibling;
                            const span = this.doc.createElement('span');
                            span.textContent = 'This is an eeeeevil span causing a problem!';
                            (_a = firstCommentNode === null || firstCommentNode === void 0 ? void 0 : firstCommentNode.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(span, firstCommentNode);
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                    envProviders: [(0, hydration_utils_1.withNoopErrorHandler)()],
                }).catch((err) => {
                    const message = err.message;
                    expect(message).toContain('During hydration Angular expected a comment node but found <span>');
                    expect(message).toContain('<!-- container -->  <-- AT THIS LOCATION');
                    expect(message).toContain('<span>…</span>  <-- AT THIS LOCATION');
                    (0, hydration_utils_1.verifyNodeHasMismatchInfo)(doc);
                });
            }));
            it('should handle a mismatch for a node that goes after a ViewContainerRef node', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleDir = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            standalone: true,
                            selector: 'b',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleDir = _classThis = class {
                        constructor() {
                            this.vcr = (0, core_1.inject)(core_1.ViewContainerRef);
                        }
                    };
                    __setFunctionName(_classThis, "SimpleDir");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleDir = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleDir = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [common_1.CommonModule, SimpleDir],
                            template: `
            <b>Bold text</b>
            <i>Italic text</i>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.doc = (0, core_1.inject)(common_1.DOCUMENT);
                        }
                        ngAfterViewInit() {
                            var _a;
                            const b = this.doc.querySelector('b');
                            const span = this.doc.createElement('span');
                            span.textContent = 'This is an eeeeevil span causing a problem!';
                            (_a = b === null || b === void 0 ? void 0 : b.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(span, b.nextSibling);
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                    envProviders: [(0, hydration_utils_1.withNoopErrorHandler)()],
                }).catch((err) => {
                    const message = err.message;
                    expect(message).toContain('During hydration Angular expected a comment node but found <span>');
                    expect(message).toContain('<!-- container -->  <-- AT THIS LOCATION');
                    expect(message).toContain('<span>…</span>  <-- AT THIS LOCATION');
                    (0, hydration_utils_1.verifyNodeHasMismatchInfo)(doc);
                });
            }));
            it('should handle a case when a node is not found (removed)', () => __awaiter(void 0, void 0, void 0, function* () {
                let ProjectorComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'projector-cmp',
                            template: '<ng-content />',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ProjectorComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "ProjectorComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ProjectorComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ProjectorComponent = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [common_1.CommonModule, ProjectorComponent],
                            template: `
        <projector-cmp>
          <b>Bold text</b>
          <i>Italic text</i>
        </projector-cmp>
      `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.doc = (0, core_1.inject)(common_1.DOCUMENT);
                        }
                        ngAfterContentInit() {
                            var _a, _b;
                            (_a = this.doc.querySelector('b')) === null || _a === void 0 ? void 0 : _a.remove();
                            (_b = this.doc.querySelector('i')) === null || _b === void 0 ? void 0 : _b.remove();
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                yield (0, hydration_utils_1.ssr)(SimpleComponent, {
                    envProviders: [(0, hydration_utils_1.withNoopErrorHandler)()],
                }).catch((err) => {
                    const message = err.message;
                    expect(message).toContain('During serialization, Angular was unable to find an element in the DOM');
                    expect(message).toContain('<b>…</b>  <-- AT THIS LOCATION');
                    (0, hydration_utils_1.verifyNodeHasMismatchInfo)(doc, 'projector-cmp');
                });
            }));
            it('should handle a case when a node is not found (detached)', () => __awaiter(void 0, void 0, void 0, function* () {
                let ProjectorComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'projector-cmp',
                            template: '<ng-content />',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ProjectorComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "ProjectorComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ProjectorComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ProjectorComponent = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [common_1.CommonModule, ProjectorComponent],
                            template: `
        <projector-cmp>
          <b>Bold text</b>
        </projector-cmp>
      `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            var _a;
                            this.doc = (0, core_1.inject)(common_1.DOCUMENT);
                            this.isServer = (0, common_1.isPlatformServer)((0, core_1.inject)(core_1.PLATFORM_ID));
                            if (!this.isServer) {
                                (_a = this.doc.querySelector('b')) === null || _a === void 0 ? void 0 : _a.remove();
                            }
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                    envProviders: [(0, hydration_utils_1.withNoopErrorHandler)()],
                }).catch((err) => {
                    const message = err.message;
                    expect(message).toContain('During hydration Angular was unable to locate a node using the "firstChild" path, ' +
                        'starting from the <projector-cmp>…</projector-cmp> node');
                    (0, hydration_utils_1.verifyNodeHasMismatchInfo)(doc, 'projector-cmp');
                });
            }));
            it('should handle a case when a node is not found (invalid DOM)', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [common_1.CommonModule],
                            template: `
            <a>
              <ng-container *ngTemplateOutlet="titleTemplate"></ng-container>
              <ng-content *ngIf="true"></ng-content>
            </a>

            <ng-template #titleTemplate>
              <ng-container *ngIf="true">
                <a>test</a>
              </ng-container>
            </ng-template>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                try {
                    const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                    const ssrContents = (0, dom_utils_1.getAppContents)(html);
                    expect(ssrContents).toContain('<app ngh');
                    (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                    yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                    fail('Expected the hydration process to throw.');
                }
                catch (e) {
                    const message = e.toString();
                    expect(message).toContain('During hydration, Angular expected an element to be present at this location.');
                    expect(message).toContain('<!-- container -->  <-- AT THIS LOCATION');
                    expect(message).toContain('check to see if your template has valid HTML structure');
                    (0, hydration_utils_1.verifyNodeHasMismatchInfo)(doc);
                }
            }));
            it('should log a warning when there was no hydration info in the TransferState', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            template: `Hi!`,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                // Note: SSR *without* hydration logic enabled.
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { enableHydration: false });
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).not.toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                    envProviders: [(0, hydration_utils_1.withDebugConsole)()],
                });
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                (0, hydration_utils_1.verifyHasLog)(appRef, 'NG0505: Angular hydration was requested on the client, ' +
                    'but there was no serialized information present in the server response');
                const clientRootNode = compRef.location.nativeElement;
                // Make sure that no hydration logic was activated,
                // effectively re-rendering from scratch happened and
                // all the content inside the <app> host element was
                // cleared on the client (as it usually happens in client
                // rendering mode).
                (0, hydration_utils_1.verifyNoNodesWereClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
            }));
            it('should not log a warning when there was no hydration info in the TransferState, ' +
                'but a client mode marker is present', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            template: `Hi!`,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = `<html><head></head><body ${api_1.CLIENT_RENDER_MODE_FLAG}><app></app></body></html>`;
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                    envProviders: [(0, hydration_utils_1.withDebugConsole)()],
                });
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                (0, hydration_utils_1.verifyEmptyConsole)(appRef);
                const clientRootNode = compRef.location.nativeElement;
                expect(clientRootNode.textContent).toContain('Hi!');
            }));
            it('should not throw an error when app is destroyed before becoming stable', () => __awaiter(void 0, void 0, void 0, function* () {
                // Spy manually, because we may not be able to retrieve the `DebugConsole`
                // after we destroy the application, but we still want to ensure that
                // no error is thrown in the console.
                const errorSpy = spyOn(console, 'error').and.callThrough();
                const logs = [];
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            template: `Hi!`,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            const isBrowser = (0, common_1.isPlatformBrowser)((0, core_1.inject)(core_1.PLATFORM_ID));
                            if (isBrowser) {
                                const pendingTasks = (0, core_1.inject)(core_1.PendingTasks);
                                // Given that, in a real-world scenario, some APIs add a pending
                                // task and don't remove it until the app is destroyed.
                                // This could be an HTTP request that contributes to app stability
                                // and does not respond until the app is destroyed.
                                pendingTasks.add();
                            }
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                appRef.isStable.subscribe((isStable) => {
                    logs.push(`isStable=${isStable}`);
                });
                // Destroy the application before it becomes stable, because we added
                // a task and didn't remove it explicitly.
                appRef.destroy();
                expect(logs).toEqual([
                    'isStable=false',
                    // In the end, the application became stable while being destroyed.
                    'isStable=true',
                ]);
                // Wait for a microtask so that `whenStableWithTimeout` resolves.
                yield Promise.resolve();
                // Ensure no error has been logged in the console,
                // such as "injector has already been destroyed."
                expect(errorSpy).not.toHaveBeenCalled();
            }));
        });
        describe('@if', () => {
            it('should work with `if`s that have different value on the client and on the server', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [common_1.NgIf],
                            template: `
            <ng-container *ngIf="isServer; else elseBlock">
              <b>This is NgIf SERVER-ONLY content</b>
            </ng-container>
            <ng-template #elseBlock>
              <i>This is NgIf CLIENT-ONLY content</i>
            </ng-template>

            @if (isServer) { <b>This is new if SERVER-ONLY content</b> }
            @else { <i id="client-only">This is new if CLIENT-ONLY content</i> }
            @if (alwaysTrue) { <p>CLIENT and SERVER content</p> }
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.alwaysTrue = true;
                            // This flag is intentionally different between the client
                            // and the server: we use it to test the logic to cleanup
                            // dehydrated views.
                            this.isServer = (0, common_1.isPlatformServer)((0, core_1.inject)(core_1.PLATFORM_ID));
                        }
                        ngOnInit() {
                            setTimeout(() => { }, 100);
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                let ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                ssrContents = (0, hydration_utils_1.stripExcessiveSpaces)((0, dom_utils_1.stripUtilAttributes)(ssrContents, false));
                // In the SSR output we expect to see SERVER content, but not CLIENT.
                expect(ssrContents).not.toContain('<i id="client-only">This is new if CLIENT-ONLY content</i>');
                expect(ssrContents).toContain('<b>This is new if SERVER-ONLY content</b>');
                expect(ssrContents).not.toContain('<i>This is NgIf CLIENT-ONLY content</i>');
                expect(ssrContents).toContain('<b>This is NgIf SERVER-ONLY content</b>');
                // Content that should be rendered on both client and server should also be present.
                expect(ssrContents).toContain('<p>CLIENT and SERVER content</p>');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                expect(clientRootNode.outerHTML).not.toContain('<b>This is NgIf SERVER-ONLY content</b>');
                expect(clientRootNode.outerHTML).not.toContain('<b>This is new if SERVER-ONLY content</b>');
                yield appRef.whenStable(); // post-hydration cleanup happens here
                const clientContents = (0, hydration_utils_1.stripExcessiveSpaces)((0, dom_utils_1.stripUtilAttributes)(clientRootNode.outerHTML, false));
                // After the cleanup, we expect to see CLIENT content, but not SERVER.
                expect(clientContents).toContain('<i id="client-only">This is new if CLIENT-ONLY content</i>');
                expect(clientContents).not.toContain('<b>This is new if SERVER-ONLY content</b>');
                // Content that should be rendered on both client and server should still be present.
                expect(clientContents).toContain('<p>CLIENT and SERVER content</p>');
                const clientOnlyNode1 = clientRootNode.querySelector('i');
                const clientOnlyNode2 = clientRootNode.querySelector('#client-only');
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode, [clientOnlyNode1, clientOnlyNode2]);
            }));
            it('should support nested `if`s', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            template: `
            This is a non-empty block:
            @if (true) {
              @if (true) {
                <h1>
                @if (true) {
                  <span>Hello world!</span>
                }
                </h1>
              }
            }
            <div>Post-container element</div>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
            }));
            it('should hydrate `else` blocks', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            template: `
            @if (conditionA) {
              if block
            } @else {
              else block
            }
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.conditionA = false;
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                expect(ssrContents).toContain(`else block`);
                expect(ssrContents).not.toContain(`if block`);
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                yield appRef.whenStable();
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                // Verify that we still have expected content rendered.
                expect(clientRootNode.innerHTML).toContain(`else block`);
                expect(clientRootNode.innerHTML).not.toContain(`if block`);
                // Verify that switching `if` condition results
                // in an update to the DOM which was previously hydrated.
                compRef.instance.conditionA = true;
                compRef.changeDetectorRef.detectChanges();
                expect(clientRootNode.innerHTML).not.toContain(`else block`);
                expect(clientRootNode.innerHTML).toContain(`if block`);
            }));
        });
        describe('@switch', () => {
            it('should work with `switch`es that have different value on the client and on the server', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [common_1.NgSwitch, common_1.NgSwitchCase],
                            template: `
              <ng-container [ngSwitch]="isServer">
                <b *ngSwitchCase="true">This is NgSwitch SERVER-ONLY content</b>
                <i *ngSwitchCase="false" id="old">This is NgSwitch CLIENT-ONLY content</i>
              </ng-container>

              @switch (isServer) {
                @case (true) { <b>This is a SERVER-ONLY content</b> }
                @case (false) { <i id="new">This is a CLIENT-ONLY content</i> }
              }
            `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            // This flag is intentionally different between the client
                            // and the server: we use it to test the logic to cleanup
                            // dehydrated views.
                            this.isServer = (0, common_1.isPlatformServer)((0, core_1.inject)(core_1.PLATFORM_ID));
                        }
                        ngOnInit() {
                            setTimeout(() => { }, 100);
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                let ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                ssrContents = (0, hydration_utils_1.stripExcessiveSpaces)((0, dom_utils_1.stripUtilAttributes)(ssrContents, false));
                // In the SSR output we expect to see SERVER content, but not CLIENT.
                expect(ssrContents).not.toContain('<i id="new">This is a CLIENT-ONLY content</i>');
                expect(ssrContents).not.toContain('<i id="old">This is NgSwitch CLIENT-ONLY content</i>');
                expect(ssrContents).toContain('<b>This is a SERVER-ONLY content</b>');
                expect(ssrContents).toContain('<b>This is NgSwitch SERVER-ONLY content</b>');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                // NgSwitch had slower cleanup than NgIf
                expect(clientRootNode.outerHTML).toContain('<b>This is NgSwitch SERVER-ONLY content</b>');
                expect(clientRootNode.outerHTML).not.toContain('<b>This is a SERVER-ONLY content</b>');
                expect(clientRootNode.outerHTML).toContain('<i id="new">This is a CLIENT-ONLY content</i>');
                expect(clientRootNode.outerHTML).toContain('<i id="old">This is NgSwitch CLIENT-ONLY content</i>');
                yield appRef.whenStable();
                const clientContents = (0, hydration_utils_1.stripExcessiveSpaces)((0, dom_utils_1.stripUtilAttributes)(clientRootNode.outerHTML, false));
                // After the cleanup, we expect to see CLIENT content, but not SERVER.
                expect(clientContents).toContain('<i id="new">This is a CLIENT-ONLY content</i>');
                expect(clientContents).toContain('<i id="old">This is NgSwitch CLIENT-ONLY content</i>');
                expect(clientContents).not.toContain('<b>This is NgSwitch SERVER-ONLY content</b>');
                expect(clientContents).not.toContain('<b>This is a SERVER-ONLY content</b>');
                const clientOnlyNode1 = clientRootNode.querySelector('#old');
                const clientOnlyNode2 = clientRootNode.querySelector('#new');
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode, [clientOnlyNode1, clientOnlyNode2]);
            }));
            it('should cleanup rendered case if none of the cases match on the client', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            template: `
              @switch (label) {
                @case ('A') { This is A }
                @case ('B') { This is B }
              }
            `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            // This flag is intentionally different between the client
                            // and the server: we use it to test the logic to cleanup
                            // dehydrated views.
                            this.label = (0, common_1.isPlatformServer)((0, core_1.inject)(core_1.PLATFORM_ID)) ? 'A' : 'Not A';
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                let ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                ssrContents = (0, hydration_utils_1.stripExcessiveSpaces)((0, dom_utils_1.stripUtilAttributes)(ssrContents, false));
                expect(ssrContents).toContain('This is A');
                const clientRootNode = compRef.location.nativeElement;
                yield appRef.whenStable();
                const clientContents = (0, hydration_utils_1.stripExcessiveSpaces)((0, dom_utils_1.stripUtilAttributes)(clientRootNode.outerHTML, false));
                // After the cleanup, we expect that the contents is removed and none
                // of the cases are rendered, since they don't match the condition.
                expect(clientContents).not.toContain('This is A');
                expect(clientContents).not.toContain('This is B');
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
            }));
        });
        describe('@for', () => {
            it('should hydrate for loop content', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            template: `
            @for (item of items; track item) {
              <div>
                <h1>Item #{{ item }}</h1>
              </div>
            }
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.items = [1, 2, 3];
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                // Check whether serialized hydration info has a multiplier
                // (which avoids repeated views serialization).
                const hydrationInfo = (0, hydration_utils_1.getHydrationInfoFromTransferState)(ssrContents);
                expect(hydrationInfo).toContain('"x":3');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
            }));
            it('should hydrate @empty block content', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            template: `
            @for (item of items; track item) {
              <p>Item #{{ item }}</p>
            } @empty {
              <div>This is an "empty" block</div>
            }
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.items = [];
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
            }));
            it('should handle a case when @empty block is rendered ' +
                'on the server and main content on the client', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            template: `
                @for (item of items; track item) {
                  <p>Item #{{ item }}</p>
                } @empty {
                  <div>This is an "empty" block</div>
                }
              `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.items = (0, common_1.isPlatformServer)((0, core_1.inject)(core_1.PLATFORM_ID)) ? [] : [1, 2, 3];
                        }
                        ngOnInit() {
                            setTimeout(() => { }, 100);
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                // Expect only the `@empty` block to be rendered on the server.
                expect(ssrContents).not.toContain('Item #1');
                expect(ssrContents).not.toContain('Item #2');
                expect(ssrContents).not.toContain('Item #3');
                expect(ssrContents).toContain('This is an "empty" block');
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                expect(clientRootNode.innerHTML).toContain('Item #1');
                expect(clientRootNode.innerHTML).toContain('Item #2');
                expect(clientRootNode.innerHTML).toContain('Item #3');
                expect(clientRootNode.innerHTML).not.toContain('This is an "empty" block');
                yield appRef.whenStable();
                // After hydration and post-hydration cleanup,
                // expect items to be present, but `@empty` block to be removed.
                expect(clientRootNode.innerHTML).toContain('Item #1');
                expect(clientRootNode.innerHTML).toContain('Item #2');
                expect(clientRootNode.innerHTML).toContain('Item #3');
                expect(clientRootNode.innerHTML).not.toContain('This is an "empty" block');
                const clientRenderedItems = compRef.location.nativeElement.querySelectorAll('p');
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode, Array.from(clientRenderedItems));
            }));
            it('should handle a case when @empty block is rendered ' +
                'on the client and main content on the server', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            template: `
              @for (item of items; track item) {
                <p>Item #{{ item }}</p>
              } @empty {
                <div>This is an "empty" block</div>
              }
            `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.items = (0, common_1.isPlatformServer)((0, core_1.inject)(core_1.PLATFORM_ID)) ? [1, 2, 3] : [];
                        }
                        ngOnInit() {
                            setTimeout(() => { }, 100);
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                // Expect items to be rendered on the server.
                expect(ssrContents).toContain('Item #1');
                expect(ssrContents).toContain('Item #2');
                expect(ssrContents).toContain('Item #3');
                expect(ssrContents).not.toContain('This is an "empty" block');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                expect(clientRootNode.innerHTML).not.toContain('Item #1');
                expect(clientRootNode.innerHTML).not.toContain('Item #2');
                expect(clientRootNode.innerHTML).not.toContain('Item #3');
                expect(clientRootNode.innerHTML).toContain('This is an "empty" block');
                yield appRef.whenStable();
                // After hydration and post-hydration cleanup,
                // expect an `@empty` block to be present and items to be removed.
                expect(clientRootNode.innerHTML).not.toContain('Item #1');
                expect(clientRootNode.innerHTML).not.toContain('Item #2');
                expect(clientRootNode.innerHTML).not.toContain('Item #3');
                expect(clientRootNode.innerHTML).toContain('This is an "empty" block');
                const clientRenderedItems = compRef.location.nativeElement.querySelectorAll('div');
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode, Array.from(clientRenderedItems));
            }));
            it('should handle different number of items rendered on the client and on the server', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            template: `
                @for (item of items; track item) {
                  <p id="{{ item }}">Item #{{ item }}</p>
                }
              `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            // Item '3' is the same, the rest of the items are different.
                            this.items = (0, common_1.isPlatformServer)((0, core_1.inject)(core_1.PLATFORM_ID)) ? [3, 2, 1] : [3, 4, 5];
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                expect(ssrContents).toContain('Item #1');
                expect(ssrContents).toContain('Item #2');
                expect(ssrContents).toContain('Item #3');
                expect(ssrContents).not.toContain('Item #4');
                expect(ssrContents).not.toContain('Item #5');
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                yield appRef.whenStable();
                const clientRootNode = compRef.location.nativeElement;
                // After hydration and post-hydration cleanup,
                // expect items to be present, but `@empty` block to be removed.
                expect(clientRootNode.innerHTML).not.toContain('Item #1');
                expect(clientRootNode.innerHTML).not.toContain('Item #2');
                expect(clientRootNode.innerHTML).toContain('Item #3');
                expect(clientRootNode.innerHTML).toContain('Item #4');
                expect(clientRootNode.innerHTML).toContain('Item #5');
                // Note: we exclude item '3', since it's the same (and at the same location)
                // on the server and on the client, so it was hydrated.
                const clientRenderedItems = [4, 5].map((id) => compRef.location.nativeElement.querySelector(`[id=${id}]`));
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode, Array.from(clientRenderedItems));
            }));
            it('should handle a reconciliation with swaps', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'app',
                            standalone: true,
                            template: `
                @for(item of items; track item) {
                  <div>{{ item }}</div>
                }
              `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.items = ['a', 'b', 'c'];
                        }
                        swap() {
                            // Reshuffling of the array will result in
                            // "swap" operations in repeater.
                            this.items = ['b', 'c', 'a'];
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                expect(ssrContents).toContain('a');
                expect(ssrContents).toContain('b');
                expect(ssrContents).toContain('c');
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                yield appRef.whenStable();
                const root = compRef.location.nativeElement;
                const divs = root.querySelectorAll('div');
                expect(divs.length).toBe(3);
                compRef.instance.swap();
                compRef.changeDetectorRef.detectChanges();
                const divsAfterSwap = root.querySelectorAll('div');
                expect(divsAfterSwap.length).toBe(3);
            }));
        });
        describe('@let', () => {
            it('should handle a let declaration', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            template: `
            @let greeting = name + '!!!';
            Hello, {{greeting}}
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.name = 'Frodo';
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                expect(ssrContents).toContain('Hello, Frodo!!!');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                expect(clientRootNode.textContent).toContain('Hello, Frodo!!!');
                compRef.instance.name = 'Bilbo';
                compRef.changeDetectorRef.detectChanges();
                expect(clientRootNode.textContent).toContain('Hello, Bilbo!!!');
            }));
            it('should handle multiple let declarations that depend on each other', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            template: `
            @let plusOne = value + 1;
            @let plusTwo = plusOne + 1;
            @let result = plusTwo + 1;
            Result: {{result}}
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.value = 1;
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                expect(ssrContents).toContain('Result: 4');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                expect(clientRootNode.textContent).toContain('Result: 4');
                compRef.instance.value = 2;
                compRef.changeDetectorRef.detectChanges();
                expect(clientRootNode.textContent).toContain('Result: 5');
            }));
            it('should handle a let declaration using a pipe that injects ChangeDetectorRef', () => __awaiter(void 0, void 0, void 0, function* () {
                let DoublePipe = (() => {
                    let _classDecorators = [(0, core_1.Pipe)({
                            name: 'double',
                            standalone: true,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var DoublePipe = _classThis = class {
                        constructor() {
                            this.changeDetectorRef = (0, core_1.inject)(core_1.ChangeDetectorRef);
                        }
                        transform(value) {
                            return value * 2;
                        }
                    };
                    __setFunctionName(_classThis, "DoublePipe");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DoublePipe = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DoublePipe = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [DoublePipe],
                            template: `
            @let result = value | double;
            Result: {{result}}
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.value = 1;
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                expect(ssrContents).toContain('Result: 2');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                expect(clientRootNode.textContent).toContain('Result: 2');
                compRef.instance.value = 2;
                compRef.changeDetectorRef.detectChanges();
                expect(clientRootNode.textContent).toContain('Result: 4');
            }));
            it('should handle let declarations referenced through multiple levels of views', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            template: `
            @if (true) {
              @if (true) {
                @let three = two + 1;
                The result is {{three}}
              }
              @let two = one + 1;
            }

            @let one = value + 1;
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                        constructor() {
                            this.value = 0;
                        }
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                expect(ssrContents).toContain('The result is 3');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                expect(clientRootNode.textContent).toContain('The result is 3');
                compRef.instance.value = 2;
                compRef.changeDetectorRef.detectChanges();
                expect(clientRootNode.textContent).toContain('The result is 5');
            }));
            it('should handle non-projected let declarations', () => __awaiter(void 0, void 0, void 0, function* () {
                let InnerComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'inner',
                            template: `
            <ng-content select="header">Fallback header</ng-content>
            <ng-content>Fallback content</ng-content>
            <ng-content select="footer">Fallback footer</ng-content>
          `,
                            standalone: true,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var InnerComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "InnerComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        InnerComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return InnerComponent = _classThis;
                })();
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            template: `
            <inner>
              @let one = 1;
              <footer>|Footer value {{one}}</footer>
              @let two = one + 1;
              <header>Header value {{two}}|</header>
            </inner>
          `,
                            imports: [InnerComponent],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                const expectedContent = '<!--container--><header>Header value 2|</header>' +
                    'Fallback content<!--container--><!--container-->' +
                    '<footer>|Footer value 1</footer>';
                expect(ssrContents).toContain('<app ngh');
                expect(ssrContents).toContain(`<inner ngh="0">${expectedContent}</inner>`);
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                expect(clientRootNode.innerHTML).toContain(`<inner>${expectedContent}</inner>`);
            }));
            it('should handle let declaration before and directly inside of an embedded view', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            template: `
            @let before = 'before';
            @if (true) {
              @let inside = 'inside';
              {{before}}|{{inside}}
            }
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                expect(ssrContents).toContain('before|inside');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                expect(clientRootNode.textContent).toContain('before|inside');
            }));
            it('should handle let declaration before, directly inside of and after an embedded view', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            template: `
            @let before = 'before';
            @if (true) {
              @let inside = 'inside';
              {{inside}}
            }
            @let after = 'after';
            {{before}}|{{after}}
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                expect(ssrContents).toContain('inside <!--container--> before|after');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                expect(clientRootNode.textContent).toContain('inside  before|after');
            }));
            it('should handle let declaration with array inside of an embedded view', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            template: `
            @let foo = ['foo'];
            @if (true) {
              {{foo}}
            }
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                expect(ssrContents).toContain('foo');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                expect(clientRootNode.textContent).toContain('foo');
            }));
            it('should handle let declaration inside a projected control flow node', () => __awaiter(void 0, void 0, void 0, function* () {
                let TestComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'test',
                            template: 'Main: <ng-content/> Slot: <ng-content slot="foo"/>',
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
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'app',
                            imports: [TestComponent],
                            template: `
            <test>
              @let a = 1;
              @let b = a + 1;
              <span foo>{{b}}</span>
            </test>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain('<app ngh');
                expect(ssrContents).toContain('Main: <!--ngtns--> Slot: <span foo="">2</span></test></app>');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent);
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
                expect(clientRootNode.textContent).toContain('Main:  Slot: 2');
            }));
        });
        describe('zoneless', () => {
            it('should not produce "unsupported configuration" warnings for zoneless mode', () => __awaiter(void 0, void 0, void 0, function* () {
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            template: `
            <header>Header</header>
            <footer>Footer</footer>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent);
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                    envProviders: [
                        (0, hydration_utils_1.withDebugConsole)(),
                        (0, core_1.provideZonelessChangeDetection)(),
                    ],
                });
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                // Make sure there are no extra logs in case zoneless mode is enabled.
                (0, hydration_utils_1.verifyHasNoLog)(appRef, 'NG05000: Angular detected that hydration was enabled for an application ' +
                    'that uses a custom or a noop Zone.js implementation.');
                const clientRootNode = compRef.location.nativeElement;
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
            }));
        });
        describe('Router', () => {
            it('should wait for lazy routes before triggering post-hydration cleanup', () => __awaiter(void 0, void 0, void 0, function* () {
                const ngZone = testing_2.TestBed.inject(core_1.NgZone);
                let LazyCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'lazy',
                            template: `LazyCmp content`,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var LazyCmp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "LazyCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        LazyCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return LazyCmp = _classThis;
                })();
                const routes = [
                    {
                        path: '',
                        loadComponent: () => {
                            return ngZone.runOutsideAngular(() => {
                                return new Promise((resolve) => {
                                    setTimeout(() => resolve(LazyCmp), 100);
                                });
                            });
                        },
                    },
                ];
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [router_1.RouterOutlet],
                            template: `
            Works!
            <router-outlet />
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const envProviders = [
                    { provide: common_1.PlatformLocation, useClass: testing_1.MockPlatformLocation },
                    (0, router_1.provideRouter)(routes),
                ];
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { envProviders });
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                // Expect serialization to happen once a lazy-loaded route completes loading
                // and a lazy component is rendered.
                expect(ssrContents).toContain(`<lazy ${hydration_utils_1.NGH_ATTR_NAME}="0">LazyCmp content</lazy>`);
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent, LazyCmp);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                    envProviders,
                });
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                yield appRef.whenStable();
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
            }));
            it('should wait for lazy routes before triggering post-hydration cleanup in zoneless mode', () => __awaiter(void 0, void 0, void 0, function* () {
                const ngZone = testing_2.TestBed.inject(core_1.NgZone);
                let LazyCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'lazy',
                            template: `LazyCmp content`,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var LazyCmp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "LazyCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        LazyCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return LazyCmp = _classThis;
                })();
                const routes = [
                    {
                        path: '',
                        loadComponent: () => {
                            return ngZone.runOutsideAngular(() => {
                                return new Promise((resolve) => {
                                    setTimeout(() => resolve(LazyCmp), 100);
                                });
                            });
                        },
                    },
                ];
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [router_1.RouterOutlet],
                            template: `
            Works!
            <router-outlet />
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const envProviders = [
                    (0, core_1.provideZonelessChangeDetection)(),
                    { provide: common_1.PlatformLocation, useClass: testing_1.MockPlatformLocation },
                    (0, router_1.provideRouter)(routes),
                ];
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { envProviders });
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                // Expect serialization to happen once a lazy-loaded route completes loading
                // and a lazy component is rendered.
                expect(ssrContents).toContain(`<lazy ${hydration_utils_1.NGH_ATTR_NAME}="0">LazyCmp content</lazy>`);
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent, LazyCmp);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                    envProviders,
                });
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                const clientRootNode = compRef.location.nativeElement;
                yield appRef.whenStable();
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode);
                (0, hydration_utils_1.verifyClientAndSSRContentsMatch)(ssrContents, clientRootNode);
            }));
            it('should cleanup dehydrated views in routed components that use ViewContainerRef', () => __awaiter(void 0, void 0, void 0, function* () {
                let CmpA = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'cmp-a',
                            template: `
            @if (isServer) {
              <p>Server view</p>
            } @else {
              <p>Client view</p>
            }
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var CmpA = _classThis = class {
                        constructor() {
                            this.isServer = (0, common_1.isPlatformServer)((0, core_1.inject)(core_1.PLATFORM_ID));
                            this.viewContainerRef = (0, core_1.inject)(core_1.ViewContainerRef);
                        }
                    };
                    __setFunctionName(_classThis, "CmpA");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        CmpA = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return CmpA = _classThis;
                })();
                const routes = [
                    {
                        path: '',
                        component: CmpA,
                    },
                ];
                let SimpleComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: true,
                            selector: 'app',
                            imports: [router_1.RouterOutlet],
                            template: `
            <router-outlet />
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SimpleComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SimpleComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SimpleComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SimpleComponent = _classThis;
                })();
                const envProviders = [
                    { provide: common_1.PlatformLocation, useClass: testing_1.MockPlatformLocation },
                    (0, router_1.provideRouter)(routes),
                ];
                const html = yield (0, hydration_utils_1.ssr)(SimpleComponent, { envProviders });
                const ssrContents = (0, dom_utils_1.getAppContents)(html);
                expect(ssrContents).toContain(`<app ${hydration_utils_1.NGH_ATTR_NAME}`);
                expect(ssrContents).toContain('Server view');
                expect(ssrContents).not.toContain('Client view');
                (0, dom_utils_1.resetTViewsFor)(SimpleComponent, CmpA);
                const appRef = yield (0, dom_utils_1.prepareEnvironmentAndHydrate)(doc, html, SimpleComponent, {
                    envProviders,
                });
                const compRef = (0, hydration_utils_1.getComponentRef)(appRef);
                appRef.tick();
                yield appRef.whenStable();
                const clientRootNode = compRef.location.nativeElement;
                // <p> tag is used in a view that is different on a server and
                // on a client, so it gets re-created (not hydrated) on a client
                const p = clientRootNode.querySelector('p');
                (0, hydration_utils_1.verifyAllNodesClaimedForHydration)(clientRootNode, [p]);
                expect(clientRootNode.innerHTML).not.toContain('Server view');
                expect(clientRootNode.innerHTML).toContain('Client view');
            }));
        });
    });
});
