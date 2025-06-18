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
exports.HttpInterceptorExampleModule = exports.MyHttpInterceptor = exports.HttpClientExampleModule = exports.PendingTasksAppModule = exports.MyServerAppModule = void 0;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
require("@angular/compiler");
const animations_1 = require("@angular/animations");
const common_1 = require("@angular/common");
const http_1 = require("@angular/common/http");
const testing_1 = require("@angular/common/http/testing");
const core_1 = require("@angular/core");
const utils_1 = require("@angular/core/src/hydration/utils");
const testing_2 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
const index_1 = require("../index");
const router_1 = require("@angular/router");
const utils_2 = require("../src/utils");
const animations_2 = require("@angular/platform-browser/animations");
const APP_CONFIG = {
    providers: [(0, index_1.provideServerRendering)()],
};
function getStandaloneBootstrapFn(component, providers = []) {
    return () => (0, platform_browser_1.bootstrapApplication)(component, (0, core_1.mergeApplicationConfig)(APP_CONFIG, { providers: [...providers, (0, core_1.provideNgReflectAttributes)()] }));
}
function createMyServerApp(standalone) {
    let MyServerApp = (() => {
        let _classDecorators = [(0, core_1.Component)({
                standalone,
                selector: 'app',
                template: `Works!`,
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var MyServerApp = _classThis = class {
        };
        __setFunctionName(_classThis, "MyServerApp");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            MyServerApp = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return MyServerApp = _classThis;
    })();
    return MyServerApp;
}
const MyServerApp = createMyServerApp(false);
const MyServerAppStandalone = createMyServerApp(true);
let MyServerAppModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            declarations: [MyServerApp],
            exports: [MyServerApp],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MyServerAppModule = _classThis = class {
    };
    __setFunctionName(_classThis, "MyServerAppModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MyServerAppModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MyServerAppModule = _classThis;
})();
exports.MyServerAppModule = MyServerAppModule;
function createAppWithPendingTask(standalone) {
    let PendingTasksApp = (() => {
        let _classDecorators = [(0, core_1.Component)({
                standalone,
                selector: 'app',
                template: `Completed: {{ completed }}`,
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var PendingTasksApp = _classThis = class {
            constructor() {
                this.completed = 'No';
                const pendingTasks = (0, core_1.inject)(core_1.PendingTasks);
                const removeTask = pendingTasks.add();
                setTimeout(() => {
                    removeTask();
                    this.completed = 'Yes';
                });
            }
        };
        __setFunctionName(_classThis, "PendingTasksApp");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            PendingTasksApp = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return PendingTasksApp = _classThis;
    })();
    return PendingTasksApp;
}
const PendingTasksApp = createAppWithPendingTask(false);
const PendingTasksAppStandalone = createAppWithPendingTask(true);
let PendingTasksAppModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            declarations: [PendingTasksApp],
            exports: [PendingTasksApp],
            imports: [index_1.ServerModule],
            bootstrap: [PendingTasksApp],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var PendingTasksAppModule = _classThis = class {
    };
    __setFunctionName(_classThis, "PendingTasksAppModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PendingTasksAppModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PendingTasksAppModule = _classThis;
})();
exports.PendingTasksAppModule = PendingTasksAppModule;
let ExampleModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            bootstrap: [MyServerApp],
            imports: [MyServerAppModule, index_1.ServerModule],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ExampleModule = _classThis = class {
    };
    __setFunctionName(_classThis, "ExampleModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ExampleModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ExampleModule = _classThis;
})();
function getTitleRenderHook(doc) {
    return () => {
        // Set the title as part of the render hook.
        doc.title = 'RenderHook';
    };
}
function exceptionRenderHook() {
    throw new Error('error');
}
function getMetaRenderHook(doc) {
    return () => {
        // Add a meta tag before rendering the document.
        const metaElement = doc.createElement('meta');
        metaElement.setAttribute('name', 'description');
        doc.head.appendChild(metaElement);
    };
}
function getAsyncTitleRenderHook(doc) {
    return () => {
        // Async set the title as part of the render hook.
        return new Promise((resolve) => {
            setTimeout(() => {
                doc.title = 'AsyncRenderHook';
                resolve();
            });
        });
    };
}
function asyncRejectRenderHook() {
    return () => {
        return new Promise((_resolve, reject) => {
            setTimeout(() => {
                reject('reject');
            });
        });
    };
}
const RenderHookProviders = [
    {
        provide: index_1.BEFORE_APP_SERIALIZED,
        useFactory: getTitleRenderHook,
        multi: true,
        deps: [common_1.DOCUMENT],
    },
];
let RenderHookModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            bootstrap: [MyServerApp],
            imports: [MyServerAppModule, platform_browser_1.BrowserModule, index_1.ServerModule],
            providers: [...RenderHookProviders],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var RenderHookModule = _classThis = class {
    };
    __setFunctionName(_classThis, "RenderHookModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RenderHookModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RenderHookModule = _classThis;
})();
const MultiRenderHookProviders = [
    {
        provide: index_1.BEFORE_APP_SERIALIZED,
        useFactory: getTitleRenderHook,
        multi: true,
        deps: [common_1.DOCUMENT],
    },
    { provide: index_1.BEFORE_APP_SERIALIZED, useValue: exceptionRenderHook, multi: true },
    {
        provide: index_1.BEFORE_APP_SERIALIZED,
        useFactory: getMetaRenderHook,
        multi: true,
        deps: [common_1.DOCUMENT],
    },
];
let MultiRenderHookModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            bootstrap: [MyServerApp],
            imports: [MyServerAppModule, platform_browser_1.BrowserModule, index_1.ServerModule],
            providers: [...MultiRenderHookProviders],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MultiRenderHookModule = _classThis = class {
    };
    __setFunctionName(_classThis, "MultiRenderHookModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MultiRenderHookModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MultiRenderHookModule = _classThis;
})();
const AsyncRenderHookProviders = [
    {
        provide: index_1.BEFORE_APP_SERIALIZED,
        useFactory: getAsyncTitleRenderHook,
        multi: true,
        deps: [common_1.DOCUMENT],
    },
];
let AsyncRenderHookModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            bootstrap: [MyServerApp],
            imports: [MyServerAppModule, platform_browser_1.BrowserModule, index_1.ServerModule],
            providers: [...AsyncRenderHookProviders],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AsyncRenderHookModule = _classThis = class {
    };
    __setFunctionName(_classThis, "AsyncRenderHookModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AsyncRenderHookModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AsyncRenderHookModule = _classThis;
})();
const AsyncMultiRenderHookProviders = [
    {
        provide: index_1.BEFORE_APP_SERIALIZED,
        useFactory: getMetaRenderHook,
        multi: true,
        deps: [common_1.DOCUMENT],
    },
    {
        provide: index_1.BEFORE_APP_SERIALIZED,
        useFactory: getAsyncTitleRenderHook,
        multi: true,
        deps: [common_1.DOCUMENT],
    },
    {
        provide: index_1.BEFORE_APP_SERIALIZED,
        useFactory: asyncRejectRenderHook,
        multi: true,
    },
];
let AsyncMultiRenderHookModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            bootstrap: [MyServerApp],
            imports: [MyServerAppModule, platform_browser_1.BrowserModule, index_1.ServerModule],
            providers: [...AsyncMultiRenderHookProviders],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AsyncMultiRenderHookModule = _classThis = class {
    };
    __setFunctionName(_classThis, "AsyncMultiRenderHookModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AsyncMultiRenderHookModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AsyncMultiRenderHookModule = _classThis;
})();
let MyServerApp2 = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app',
            template: `Works too!`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MyServerApp2 = _classThis = class {
    };
    __setFunctionName(_classThis, "MyServerApp2");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MyServerApp2 = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MyServerApp2 = _classThis;
})();
let ExampleModule2 = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            declarations: [MyServerApp2],
            imports: [index_1.ServerModule],
            bootstrap: [MyServerApp2],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ExampleModule2 = _classThis = class {
    };
    __setFunctionName(_classThis, "ExampleModule2");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ExampleModule2 = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ExampleModule2 = _classThis;
})();
let TitleApp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app',
            template: ``,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TitleApp = _classThis = class {
        constructor(title) {
            this.title = title;
        }
        ngOnInit() {
            this.title.setTitle('Test App Title');
        }
    };
    __setFunctionName(_classThis, "TitleApp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TitleApp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TitleApp = _classThis;
})();
let TitleAppModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            declarations: [TitleApp],
            imports: [index_1.ServerModule],
            bootstrap: [TitleApp],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TitleAppModule = _classThis = class {
    };
    __setFunctionName(_classThis, "TitleAppModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TitleAppModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TitleAppModule = _classThis;
})();
function createMyAsyncServerApp(standalone) {
    let MyAsyncServerApp = (() => {
        let _classDecorators = [(0, core_1.Component)({
                selector: 'app',
                template: '{{text}}<h1 [textContent]="h1"></h1>',
                standalone,
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _instanceExtraInitializers = [];
        let _track_decorators;
        var MyAsyncServerApp = _classThis = class {
            constructor() {
                this.text = (__runInitializers(this, _instanceExtraInitializers), '');
                this.h1 = '';
            }
            track() {
                console.error('scroll');
            }
            ngOnInit() {
                Promise.resolve(null).then(() => setTimeout(() => {
                    this.text = 'Works!';
                    this.h1 = 'fine';
                }, 10));
            }
        };
        __setFunctionName(_classThis, "MyAsyncServerApp");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _track_decorators = [(0, core_1.HostListener)('window:scroll')];
            __esDecorate(_classThis, null, _track_decorators, { kind: "method", name: "track", static: false, private: false, access: { has: obj => "track" in obj, get: obj => obj.track }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            MyAsyncServerApp = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return MyAsyncServerApp = _classThis;
    })();
    return MyAsyncServerApp;
}
const MyAsyncServerApp = createMyAsyncServerApp(false);
const MyAsyncServerAppStandalone = getStandaloneBootstrapFn(createMyAsyncServerApp(true));
let AsyncServerModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            declarations: [MyAsyncServerApp],
            imports: [platform_browser_1.BrowserModule, index_1.ServerModule],
            bootstrap: [MyAsyncServerApp],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AsyncServerModule = _classThis = class {
    };
    __setFunctionName(_classThis, "AsyncServerModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AsyncServerModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AsyncServerModule = _classThis;
})();
function createSVGComponent(standalone) {
    let SVGComponent = (() => {
        let _classDecorators = [(0, core_1.Component)({
                selector: 'app',
                template: '<svg><use xlink:href="#clear"></use></svg>',
                standalone,
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var SVGComponent = _classThis = class {
        };
        __setFunctionName(_classThis, "SVGComponent");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            SVGComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return SVGComponent = _classThis;
    })();
    return SVGComponent;
}
const SVGComponent = createSVGComponent(false);
const SVGComponentStandalone = getStandaloneBootstrapFn(createSVGComponent(true));
let SVGServerModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            declarations: [SVGComponent],
            imports: [platform_browser_1.BrowserModule, index_1.ServerModule],
            bootstrap: [SVGComponent],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SVGServerModule = _classThis = class {
    };
    __setFunctionName(_classThis, "SVGServerModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SVGServerModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SVGServerModule = _classThis;
})();
function createMyAnimationApp(standalone) {
    let MyAnimationApp = (() => {
        let _classDecorators = [(0, core_1.Component)({
                standalone,
                selector: 'app',
                template: `
      <div [@myAnimation]="state">
        <svg *ngIf="true"></svg>
        {{text}}
      </div>`,
                animations: [
                    (0, animations_1.trigger)('myAnimation', [
                        (0, animations_1.state)('void', (0, animations_1.style)({ 'opacity': '0' })),
                        (0, animations_1.state)('active', (0, animations_1.style)({
                            'opacity': '1', // simple supported property
                            'font-weight': 'bold', // property with dashed name
                            'transform': 'translate3d(0, 0, 0)', // not natively supported by Domino
                        })),
                        (0, animations_1.transition)('void => *', [(0, animations_1.animate)('0ms')]),
                    ]),
                ],
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var MyAnimationApp = _classThis = class {
            constructor(builder) {
                this.builder = builder;
                this.state = 'active';
                this.text = 'Works!';
            }
        };
        __setFunctionName(_classThis, "MyAnimationApp");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            MyAnimationApp = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return MyAnimationApp = _classThis;
    })();
    return MyAnimationApp;
}
const MyAnimationApp = createMyAnimationApp(false);
const MyAnimationAppStandalone = getStandaloneBootstrapFn(createMyAnimationApp(true), [
    (0, animations_2.provideAnimations)(),
]);
let AnimationServerModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            declarations: [MyAnimationApp],
            imports: [platform_browser_1.BrowserModule, animations_2.BrowserAnimationsModule, index_1.ServerModule],
            bootstrap: [MyAnimationApp],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AnimationServerModule = _classThis = class {
    };
    __setFunctionName(_classThis, "AnimationServerModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AnimationServerModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AnimationServerModule = _classThis;
})();
function createMyStylesApp(standalone) {
    let MyStylesApp = (() => {
        let _classDecorators = [(0, core_1.Component)({
                standalone,
                selector: 'app',
                template: `
      <div>Works!</div>`,
                styles: ['div {color: blue; } :host { color: red; }'],
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var MyStylesApp = _classThis = class {
        };
        __setFunctionName(_classThis, "MyStylesApp");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            MyStylesApp = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return MyStylesApp = _classThis;
    })();
    return MyStylesApp;
}
const MyStylesApp = createMyStylesApp(false);
const MyStylesAppStandalone = getStandaloneBootstrapFn(createMyStylesApp(true));
let ExampleStylesModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            declarations: [MyStylesApp],
            imports: [platform_browser_1.BrowserModule, index_1.ServerModule],
            bootstrap: [MyStylesApp],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ExampleStylesModule = _classThis = class {
    };
    __setFunctionName(_classThis, "ExampleStylesModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ExampleStylesModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ExampleStylesModule = _classThis;
})();
function createMyTransferStateApp(standalone) {
    let MyStylesApp = (() => {
        let _classDecorators = [(0, core_1.Component)({
                standalone,
                selector: 'app',
                template: `
      <div>Works!</div>`,
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var MyStylesApp = _classThis = class {
            constructor() {
                this.state = (0, core_1.inject)(core_1.TransferState);
                this.state.set((0, core_1.makeStateKey)('some-key'), 'some-value');
            }
        };
        __setFunctionName(_classThis, "MyStylesApp");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            MyStylesApp = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return MyStylesApp = _classThis;
    })();
    return MyStylesApp;
}
const MyTransferStateApp = createMyTransferStateApp(false);
const MyTransferStateAppStandalone = getStandaloneBootstrapFn(createMyTransferStateApp(true));
let MyTransferStateModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            declarations: [MyTransferStateApp],
            imports: [platform_browser_1.BrowserModule, index_1.ServerModule],
            bootstrap: [MyTransferStateApp],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MyTransferStateModule = _classThis = class {
    };
    __setFunctionName(_classThis, "MyTransferStateModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MyTransferStateModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MyTransferStateModule = _classThis;
})();
let DoubleTransferStateModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            declarations: [MyTransferStateApp],
            imports: [platform_browser_1.BrowserModule, index_1.ServerModule],
            providers: [(0, index_1.provideServerRendering)()],
            bootstrap: [MyTransferStateApp],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DoubleTransferStateModule = _classThis = class {
    };
    __setFunctionName(_classThis, "DoubleTransferStateModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DoubleTransferStateModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DoubleTransferStateModule = _classThis;
})();
let HttpClientExampleModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            bootstrap: [MyServerApp],
            imports: [MyServerAppModule, index_1.ServerModule, http_1.HttpClientModule, testing_1.HttpClientTestingModule],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var HttpClientExampleModule = _classThis = class {
    };
    __setFunctionName(_classThis, "HttpClientExampleModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HttpClientExampleModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HttpClientExampleModule = _classThis;
})();
exports.HttpClientExampleModule = HttpClientExampleModule;
let MyHttpInterceptor = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MyHttpInterceptor = _classThis = class {
        constructor(http) {
            this.http = http;
        }
        intercept(req, next) {
            return next.handle(req);
        }
    };
    __setFunctionName(_classThis, "MyHttpInterceptor");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MyHttpInterceptor = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MyHttpInterceptor = _classThis;
})();
exports.MyHttpInterceptor = MyHttpInterceptor;
let HttpInterceptorExampleModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            bootstrap: [MyServerApp],
            imports: [MyServerAppModule, index_1.ServerModule, http_1.HttpClientModule, testing_1.HttpClientTestingModule],
            providers: [
                {
                    provide: http_1.HTTP_INTERCEPTORS,
                    multi: true,
                    useClass: MyHttpInterceptor,
                },
            ],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var HttpInterceptorExampleModule = _classThis = class {
    };
    __setFunctionName(_classThis, "HttpInterceptorExampleModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HttpInterceptorExampleModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HttpInterceptorExampleModule = _classThis;
})();
exports.HttpInterceptorExampleModule = HttpInterceptorExampleModule;
let ImageApp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app',
            template: `<img [src]="'link'">`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ImageApp = _classThis = class {
    };
    __setFunctionName(_classThis, "ImageApp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ImageApp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ImageApp = _classThis;
})();
let ImageExampleModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            declarations: [ImageApp],
            imports: [index_1.ServerModule],
            bootstrap: [ImageApp],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ImageExampleModule = _classThis = class {
    };
    __setFunctionName(_classThis, "ImageExampleModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ImageExampleModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ImageExampleModule = _classThis;
})();
function createShadowDomEncapsulationApp(standalone) {
    let ShadowDomEncapsulationApp = (() => {
        let _classDecorators = [(0, core_1.Component)({
                standalone,
                selector: 'app',
                template: 'Shadow DOM works',
                encapsulation: core_1.ViewEncapsulation.ShadowDom,
                styles: [':host { color: red; }'],
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var ShadowDomEncapsulationApp = _classThis = class {
        };
        __setFunctionName(_classThis, "ShadowDomEncapsulationApp");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ShadowDomEncapsulationApp = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return ShadowDomEncapsulationApp = _classThis;
    })();
    return ShadowDomEncapsulationApp;
}
const ShadowDomEncapsulationApp = createShadowDomEncapsulationApp(false);
const ShadowDomEncapsulationAppStandalone = getStandaloneBootstrapFn(createShadowDomEncapsulationApp(true));
let ShadowDomExampleModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            declarations: [ShadowDomEncapsulationApp],
            imports: [platform_browser_1.BrowserModule, index_1.ServerModule],
            bootstrap: [ShadowDomEncapsulationApp],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ShadowDomExampleModule = _classThis = class {
    };
    __setFunctionName(_classThis, "ShadowDomExampleModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ShadowDomExampleModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ShadowDomExampleModule = _classThis;
})();
function createFalseAttributesComponents(standalone) {
    let MyChildComponent = (() => {
        let _classDecorators = [(0, core_1.Component)({
                standalone,
                selector: 'my-child',
                template: 'Works!',
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _attr_decorators;
        let _attr_initializers = [];
        let _attr_extraInitializers = [];
        var MyChildComponent = _classThis = class {
            constructor() {
                this.attr = __runInitializers(this, _attr_initializers, void 0);
                __runInitializers(this, _attr_extraInitializers);
            }
        };
        __setFunctionName(_classThis, "MyChildComponent");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _attr_decorators = [(0, core_1.Input)()];
            __esDecorate(null, null, _attr_decorators, { kind: "field", name: "attr", static: false, private: false, access: { has: obj => "attr" in obj, get: obj => obj.attr, set: (obj, value) => { obj.attr = value; } }, metadata: _metadata }, _attr_initializers, _attr_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            MyChildComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return MyChildComponent = _classThis;
    })();
    let MyHostComponent = (() => {
        let _classDecorators = [(0, core_1.Component)({
                standalone,
                selector: 'app',
                template: '<my-child [attr]="false"></my-child>',
                imports: standalone ? [MyChildComponent] : [],
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var MyHostComponent = _classThis = class {
        };
        __setFunctionName(_classThis, "MyHostComponent");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            MyHostComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return MyHostComponent = _classThis;
    })();
    return [MyHostComponent, MyChildComponent];
}
const [MyHostComponent, MyChildComponent] = createFalseAttributesComponents(false);
const MyHostComponentStandalone = getStandaloneBootstrapFn(createFalseAttributesComponents(true)[0]);
let FalseAttributesModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            declarations: [MyHostComponent, MyChildComponent],
            bootstrap: [MyHostComponent],
            imports: [index_1.ServerModule, platform_browser_1.BrowserModule],
            providers: [(0, core_1.provideNgReflectAttributes)()],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var FalseAttributesModule = _classThis = class {
    };
    __setFunctionName(_classThis, "FalseAttributesModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FalseAttributesModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FalseAttributesModule = _classThis;
})();
function createMyInputComponent(standalone) {
    let MyInputComponent = (() => {
        let _classDecorators = [(0, core_1.Component)({
                standalone,
                selector: 'app',
                template: '<input [name]="name">',
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _name_decorators;
        let _name_initializers = [];
        let _name_extraInitializers = [];
        var MyInputComponent = _classThis = class {
            constructor() {
                this.name = __runInitializers(this, _name_initializers, '');
                __runInitializers(this, _name_extraInitializers);
            }
        };
        __setFunctionName(_classThis, "MyInputComponent");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [(0, core_1.Input)()];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            MyInputComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return MyInputComponent = _classThis;
    })();
    return MyInputComponent;
}
const MyInputComponent = createMyInputComponent(false);
const MyInputComponentStandalone = getStandaloneBootstrapFn(createMyInputComponent(true));
let NameModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            declarations: [MyInputComponent],
            bootstrap: [MyInputComponent],
            imports: [index_1.ServerModule, platform_browser_1.BrowserModule],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NameModule = _classThis = class {
    };
    __setFunctionName(_classThis, "NameModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NameModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NameModule = _classThis;
})();
function createHTMLTypesApp(standalone) {
    let HTMLTypesApp = (() => {
        let _classDecorators = [(0, core_1.Component)({
                standalone,
                selector: 'app',
                template: '<div [innerHTML]="html"></div>',
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var HTMLTypesApp = _classThis = class {
            constructor(doc) {
                this.html = '<b>foo</b> bar';
            }
        };
        __setFunctionName(_classThis, "HTMLTypesApp");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            HTMLTypesApp = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return HTMLTypesApp = _classThis;
    })();
    return HTMLTypesApp;
}
const HTMLTypesApp = createHTMLTypesApp(false);
const HTMLTypesAppStandalone = getStandaloneBootstrapFn(createHTMLTypesApp(true));
let HTMLTypesModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            declarations: [HTMLTypesApp],
            imports: [platform_browser_1.BrowserModule, index_1.ServerModule],
            bootstrap: [HTMLTypesApp],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var HTMLTypesModule = _classThis = class {
    };
    __setFunctionName(_classThis, "HTMLTypesModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HTMLTypesModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HTMLTypesModule = _classThis;
})();
function createMyHiddenComponent(standalone) {
    let MyHiddenComponent = (() => {
        let _classDecorators = [(0, core_1.Component)({
                standalone,
                selector: 'app',
                template: '<input [hidden]="true"><input [hidden]="false">',
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _name_decorators;
        let _name_initializers = [];
        let _name_extraInitializers = [];
        var MyHiddenComponent = _classThis = class {
            constructor() {
                this.name = __runInitializers(this, _name_initializers, '');
                __runInitializers(this, _name_extraInitializers);
            }
        };
        __setFunctionName(_classThis, "MyHiddenComponent");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [(0, core_1.Input)()];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            MyHiddenComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return MyHiddenComponent = _classThis;
    })();
    return MyHiddenComponent;
}
const MyHiddenComponent = createMyHiddenComponent(false);
const MyHiddenComponentStandalone = getStandaloneBootstrapFn(createMyHiddenComponent(true));
let HiddenModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            declarations: [MyHiddenComponent],
            bootstrap: [MyHiddenComponent],
            imports: [index_1.ServerModule, platform_browser_1.BrowserModule],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var HiddenModule = _classThis = class {
    };
    __setFunctionName(_classThis, "HiddenModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HiddenModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HiddenModule = _classThis;
})();
(function () {
    if ((0, common_1.ɵgetDOM)().supportsDOMEvents)
        return; // NODE only
    describe('platform-server integration', () => {
        beforeEach(() => {
            (0, core_1.destroyPlatform)();
        });
        afterEach(() => {
            (0, core_1.destroyPlatform)();
        });
        it('should bootstrap', () => __awaiter(this, void 0, void 0, function* () {
            const platform = (0, index_1.platformServer)([
                { provide: index_1.INITIAL_CONFIG, useValue: { document: '<app></app>' } },
            ]);
            const moduleRef = yield platform.bootstrapModule(ExampleModule);
            expect((0, common_1.isPlatformServer)(moduleRef.injector.get(core_1.PLATFORM_ID))).toBe(true);
            const doc = moduleRef.injector.get(common_1.DOCUMENT);
            expect(doc.head).toBe(doc.querySelector('head'));
            expect(doc.body).toBe(doc.querySelector('body'));
            expect(doc.documentElement.textContent).toEqual('Works!');
            platform.destroy();
        }));
        it('should allow multiple platform instances', () => __awaiter(this, void 0, void 0, function* () {
            const platform = (0, index_1.platformServer)([
                { provide: index_1.INITIAL_CONFIG, useValue: { document: '<app></app>' } },
            ]);
            const platform2 = (0, index_1.platformServer)([
                { provide: index_1.INITIAL_CONFIG, useValue: { document: '<app></app>' } },
            ]);
            yield platform.bootstrapModule(ExampleModule).then((moduleRef) => {
                const doc = moduleRef.injector.get(common_1.DOCUMENT);
                expect(doc.documentElement.textContent).toEqual('Works!');
                platform.destroy();
            });
            yield platform2.bootstrapModule(ExampleModule2).then((moduleRef) => {
                const doc = moduleRef.injector.get(common_1.DOCUMENT);
                expect(doc.documentElement.textContent).toEqual('Works too!');
                platform2.destroy();
            });
        }));
        it('adds title to the document using Title service', () => __awaiter(this, void 0, void 0, function* () {
            const platform = (0, index_1.platformServer)([
                {
                    provide: index_1.INITIAL_CONFIG,
                    useValue: { document: '<html><head><title></title></head><body><app></app></body></html>' },
                },
            ]);
            const ref = yield platform.bootstrapModule(TitleAppModule);
            const state = ref.injector.get(index_1.PlatformState);
            const doc = ref.injector.get(common_1.DOCUMENT);
            const title = doc.querySelector('title');
            expect(title.textContent).toBe('Test App Title');
            expect(state.renderToString()).toContain('<title>Test App Title</title>');
        }));
        it('should get base href from document', () => __awaiter(this, void 0, void 0, function* () {
            const platform = (0, index_1.platformServer)([
                {
                    provide: index_1.INITIAL_CONFIG,
                    useValue: { document: '<html><head><base href="/"></head><body><app></app></body></html>' },
                },
            ]);
            const moduleRef = yield platform.bootstrapModule(ExampleModule);
            const location = moduleRef.injector.get(common_1.PlatformLocation);
            expect(location.getBaseHrefFromDOM()).toEqual('/');
            platform.destroy();
        }));
        it('adds styles with ng-app-id attribute', () => __awaiter(this, void 0, void 0, function* () {
            const platform = (0, index_1.platformServer)([
                {
                    provide: index_1.INITIAL_CONFIG,
                    useValue: { document: '<html><head></head><body><app></app></body></html>' },
                },
            ]);
            const ref = yield platform.bootstrapModule(ExampleStylesModule);
            const doc = ref.injector.get(common_1.DOCUMENT);
            const head = doc.getElementsByTagName('head')[0];
            const styles = head.children;
            expect(styles.length).toBe(1);
            expect(styles[0].textContent).toContain('color: red');
            expect(styles[0].getAttribute('ng-app-id')).toBe('ng');
        }));
        it('copies known properties to attributes', () => __awaiter(this, void 0, void 0, function* () {
            const platform = (0, index_1.platformServer)([
                { provide: index_1.INITIAL_CONFIG, useValue: { document: '<app></app>' } },
            ]);
            const ref = yield platform.bootstrapModule(ImageExampleModule);
            const appRef = ref.injector.get(core_1.ApplicationRef);
            const app = appRef.components[0].location.nativeElement;
            const img = app.getElementsByTagName('img')[0];
            expect(img.attributes['src'].value).toEqual('link');
        }));
        describe('PlatformLocation', () => {
            it('is injectable', () => __awaiter(this, void 0, void 0, function* () {
                const platform = (0, index_1.platformServer)([
                    { provide: index_1.INITIAL_CONFIG, useValue: { document: '<app></app>' } },
                ]);
                const appRef = yield platform.bootstrapModule(ExampleModule);
                const location = appRef.injector.get(common_1.PlatformLocation);
                expect(location.pathname).toBe('/');
                platform.destroy();
            }));
            it('is configurable via INITIAL_CONFIG', () => __awaiter(this, void 0, void 0, function* () {
                const platform = (0, index_1.platformServer)([
                    {
                        provide: index_1.INITIAL_CONFIG,
                        useValue: {
                            document: '<app></app>',
                            url: 'http://test.com/deep/path?query#hash',
                        },
                    },
                ]);
                const appRef = yield platform.bootstrapModule(ExampleModule);
                const location = appRef.injector.get(common_1.PlatformLocation);
                expect(location.pathname).toBe('/deep/path');
                expect(location.search).toBe('?query');
                expect(location.hash).toBe('#hash');
            }));
            it('parses component pieces of a URL', () => __awaiter(this, void 0, void 0, function* () {
                const platform = (0, index_1.platformServer)([
                    {
                        provide: index_1.INITIAL_CONFIG,
                        useValue: {
                            document: '<app></app>',
                            url: 'http://test.com:80/deep/path?query#hash',
                        },
                    },
                ]);
                const appRef = yield platform.bootstrapModule(ExampleModule);
                const location = appRef.injector.get(common_1.PlatformLocation);
                expect(location.hostname).toBe('test.com');
                expect(location.protocol).toBe('http:');
                expect(location.port).toBe('');
                expect(location.pathname).toBe('/deep/path');
                expect(location.search).toBe('?query');
                expect(location.hash).toBe('#hash');
            }));
            it('handles empty search and hash portions of the url', () => __awaiter(this, void 0, void 0, function* () {
                const platform = (0, index_1.platformServer)([
                    {
                        provide: index_1.INITIAL_CONFIG,
                        useValue: {
                            document: '<app></app>',
                            url: 'http://test.com/deep/path',
                        },
                    },
                ]);
                const appRef = yield platform.bootstrapModule(ExampleModule);
                const location = appRef.injector.get(common_1.PlatformLocation);
                expect(location.pathname).toBe('/deep/path');
                expect(location.search).toBe('');
                expect(location.hash).toBe('');
            }));
            it('pushState causes the URL to update', () => __awaiter(this, void 0, void 0, function* () {
                const platform = (0, index_1.platformServer)([
                    { provide: index_1.INITIAL_CONFIG, useValue: { document: '<app></app>' } },
                ]);
                const appRef = yield platform.bootstrapModule(ExampleModule);
                const location = appRef.injector.get(common_1.PlatformLocation);
                location.pushState(null, 'Test', '/foo#bar');
                expect(location.pathname).toBe('/foo');
                expect(location.hash).toBe('#bar');
                platform.destroy();
            }));
            it('allows subscription to the hash state', (done) => {
                const platform = (0, index_1.platformServer)([
                    { provide: index_1.INITIAL_CONFIG, useValue: { document: '<app></app>' } },
                ]);
                platform.bootstrapModule(ExampleModule).then((appRef) => {
                    const location = appRef.injector.get(common_1.PlatformLocation);
                    expect(location.pathname).toBe('/');
                    location.onHashChange((e) => {
                        expect(e.type).toBe('hashchange');
                        expect(e.oldUrl).toBe('/');
                        expect(e.newUrl).toBe('/foo#bar');
                        platform.destroy();
                        done();
                    });
                    location.pushState(null, 'Test', '/foo#bar');
                });
            });
        });
        describe('render', () => {
            let doc;
            let expectedOutput = '<html><head></head><body><app ng-version="0.0.0-PLACEHOLDER" ng-server-context="other">Works!<h1>fine</h1></app></body></html>';
            beforeEach(() => {
                // PlatformConfig takes in a parsed document so that it can be cached across requests.
                doc = '<html><head></head><body><app></app></body></html>';
            });
            afterEach(() => {
                doc = '<html><head></head><body><app></app></body></html>';
                testing_2.TestBed.resetTestingModule();
            });
            it('using long form should work', () => __awaiter(this, void 0, void 0, function* () {
                const platform = (0, index_1.platformServer)([
                    {
                        provide: index_1.INITIAL_CONFIG,
                        useValue: { document: doc },
                    },
                ]);
                const moduleRef = yield platform.bootstrapModule(AsyncServerModule);
                const applicationRef = moduleRef.injector.get(core_1.ApplicationRef);
                yield applicationRef.whenStable();
                // Note: the `ng-server-context` is not present in this output, since
                // `renderModule` or `renderApplication` functions are not used here.
                const expectedOutput = '<html><head></head><body><app ng-version="0.0.0-PLACEHOLDER">' +
                    'Works!<h1>fine</h1></app></body></html>';
                expect(platform.injector.get(index_1.PlatformState).renderToString()).toBe(expectedOutput);
            }));
            // Run the set of tests with regular and standalone components.
            [true, false].forEach((isStandalone) => {
                it(`using ${isStandalone ? 'renderApplication' : 'renderModule'} should work`, () => __awaiter(this, void 0, void 0, function* () {
                    const options = { document: doc };
                    const bootstrap = isStandalone
                        ? (0, utils_2.renderApplication)(MyAsyncServerAppStandalone, options)
                        : (0, index_1.renderModule)(AsyncServerModule, options);
                    const output = yield bootstrap;
                    expect(output).toBe(expectedOutput);
                }));
                it(`using ${isStandalone ? 'renderApplication' : 'renderModule'} ` +
                    `should allow passing a document reference`, () => __awaiter(this, void 0, void 0, function* () {
                    const document = testing_2.TestBed.inject(common_1.DOCUMENT);
                    // Append root element based on the app selector.
                    const rootEl = document.createElement('app');
                    document.body.appendChild(rootEl);
                    // Append a special marker to verify that we use a correct instance
                    // of the document for rendering.
                    const markerEl = document.createComment('test marker');
                    document.body.appendChild(markerEl);
                    const options = { document };
                    const bootstrap = isStandalone
                        ? (0, utils_2.renderApplication)(MyAsyncServerAppStandalone, { document })
                        : (0, index_1.renderModule)(AsyncServerModule, options);
                    const output = yield bootstrap.finally(() => {
                        rootEl.remove();
                        markerEl.remove();
                    });
                    expect(output).toBe('<html><head><title>fakeTitle</title></head>' +
                        '<body><app ng-version="0.0.0-PLACEHOLDER" ng-server-context="other">' +
                        'Works!<h1>fine</h1></app>' +
                        '<!--test marker--></body></html>');
                }));
                it('works with SVG elements', () => __awaiter(this, void 0, void 0, function* () {
                    const options = { document: doc };
                    const bootstrap = isStandalone
                        ? (0, utils_2.renderApplication)(SVGComponentStandalone, Object.assign({}, options))
                        : (0, index_1.renderModule)(SVGServerModule, options);
                    const output = yield bootstrap;
                    expect(output).toBe('<html><head></head><body><app ng-version="0.0.0-PLACEHOLDER" ng-server-context="other">' +
                        '<svg><use xlink:href="#clear"></use></svg></app></body></html>');
                }));
                it('works with animation', () => __awaiter(this, void 0, void 0, function* () {
                    const options = { document: doc };
                    const bootstrap = isStandalone
                        ? (0, utils_2.renderApplication)(MyAnimationAppStandalone, options)
                        : (0, index_1.renderModule)(AnimationServerModule, options);
                    const output = yield bootstrap;
                    expect(output).toContain('Works!');
                    expect(output).toContain('ng-trigger-myAnimation');
                    expect(output).toContain('opacity: 1;');
                    expect(output).toContain('transform: translate3d(0, 0, 0);');
                    expect(output).toContain('font-weight: bold;');
                }));
                it('should handle ViewEncapsulation.ShadowDom', () => __awaiter(this, void 0, void 0, function* () {
                    const options = { document: doc };
                    const bootstrap = isStandalone
                        ? (0, utils_2.renderApplication)(ShadowDomEncapsulationAppStandalone, options)
                        : (0, index_1.renderModule)(ShadowDomExampleModule, options);
                    const output = yield bootstrap;
                    expect(output).not.toBe('');
                    expect(output).toContain('color: red');
                }));
                it('adds the `ng-server-context` attribute to host elements', () => __awaiter(this, void 0, void 0, function* () {
                    const options = {
                        document: doc,
                    };
                    const providers = [
                        {
                            provide: utils_2.SERVER_CONTEXT,
                            useValue: 'ssg',
                        },
                    ];
                    const bootstrap = isStandalone
                        ? (0, utils_2.renderApplication)(MyStylesAppStandalone, Object.assign(Object.assign({}, options), { platformProviders: providers }))
                        : (0, index_1.renderModule)(ExampleStylesModule, Object.assign(Object.assign({}, options), { extraProviders: providers }));
                    const output = yield bootstrap;
                    expect(output).toMatch(/<app ng-version="0.0.0-PLACEHOLDER" _nghost-ng-c\d+="" ng-server-context="ssg">/);
                }));
                it('sanitizes the `serverContext` value', () => __awaiter(this, void 0, void 0, function* () {
                    const options = {
                        document: doc,
                    };
                    const providers = [
                        {
                            provide: utils_2.SERVER_CONTEXT,
                            useValue: '!!!Some extra chars&& --><!--',
                        },
                    ];
                    const bootstrap = isStandalone
                        ? (0, utils_2.renderApplication)(MyStylesAppStandalone, Object.assign(Object.assign({}, options), { platformProviders: providers }))
                        : (0, index_1.renderModule)(ExampleStylesModule, Object.assign(Object.assign({}, options), { extraProviders: providers }));
                    // All symbols other than [a-zA-Z0-9\-] are removed
                    const output = yield bootstrap;
                    expect(output).toMatch(/ng-server-context="Someextrachars----"/);
                }));
                it(`using ${isStandalone ? 'renderApplication' : 'renderModule'} ` +
                    `should serialize transfer state only once`, () => __awaiter(this, void 0, void 0, function* () {
                    const options = { document: doc };
                    const bootstrap = isStandalone
                        ? (0, utils_2.renderApplication)(MyTransferStateAppStandalone, options)
                        : (0, index_1.renderModule)(MyTransferStateModule, options);
                    const expectedOutput = '<html><head></head><body><app ng-version="0.0.0-PLACEHOLDER" ng-server-context="other"><div>Works!</div></app>' +
                        '<script id="ng-state" type="application/json">{"some-key":"some-value"}</script></body></html>';
                    const output = yield bootstrap;
                    expect(output).toEqual(expectedOutput);
                }));
                it('uses `other` as the `serverContext` value when all symbols are removed after sanitization', () => __awaiter(this, void 0, void 0, function* () {
                    const options = {
                        document: doc,
                    };
                    const providers = [
                        {
                            provide: utils_2.SERVER_CONTEXT,
                            useValue: '!!! &&<>',
                        },
                    ];
                    const bootstrap = isStandalone
                        ? (0, utils_2.renderApplication)(MyStylesAppStandalone, Object.assign(Object.assign({}, options), { platformProviders: providers }))
                        : (0, index_1.renderModule)(ExampleStylesModule, Object.assign(Object.assign({}, options), { extraProviders: providers }));
                    // All symbols other than [a-zA-Z0-9\-] are removed,
                    // the `other` is used as the default.
                    const output = yield bootstrap;
                    expect(output).toMatch(/ng-server-context="other"/);
                }));
                it('appends SSR integrity marker comment when hydration is enabled', () => __awaiter(this, void 0, void 0, function* () {
                    let SimpleApp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: true,
                                selector: 'app',
                                template: ``,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SimpleApp = _classThis = class {
                        };
                        __setFunctionName(_classThis, "SimpleApp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SimpleApp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SimpleApp = _classThis;
                    })();
                    const output = yield (0, utils_2.renderApplication)(getStandaloneBootstrapFn(SimpleApp, [(0, platform_browser_1.provideClientHydration)()]), { document: doc });
                    // HttpClient cache and DOM hydration are enabled by default.
                    expect(output).toContain(`<body><!--${utils_1.SSR_CONTENT_INTEGRITY_MARKER}-->`);
                }));
                it('should handle false values on attributes', () => __awaiter(this, void 0, void 0, function* () {
                    const options = { document: doc };
                    const bootstrap = isStandalone
                        ? (0, utils_2.renderApplication)(MyHostComponentStandalone, options)
                        : (0, index_1.renderModule)(FalseAttributesModule, options);
                    const output = yield bootstrap;
                    expect(output).toBe('<html><head></head><body><app ng-version="0.0.0-PLACEHOLDER" ng-server-context="other">' +
                        '<my-child ng-reflect-attr="false">Works!</my-child></app></body></html>');
                }));
                it('should handle element property "name"', () => __awaiter(this, void 0, void 0, function* () {
                    const options = { document: doc };
                    const bootstrap = isStandalone
                        ? (0, utils_2.renderApplication)(MyInputComponentStandalone, options)
                        : (0, index_1.renderModule)(NameModule, options);
                    const output = yield bootstrap;
                    expect(output).toBe('<html><head></head><body><app ng-version="0.0.0-PLACEHOLDER" ng-server-context="other">' +
                        '<input name=""></app></body></html>');
                }));
                it('should work with sanitizer to handle "innerHTML"', () => __awaiter(this, void 0, void 0, function* () {
                    // Clear out any global states. These should be set when platform-server
                    // is initialized.
                    global.Node = undefined;
                    global.Document = undefined;
                    const options = { document: doc };
                    const bootstrap = isStandalone
                        ? (0, utils_2.renderApplication)(HTMLTypesAppStandalone, options)
                        : (0, index_1.renderModule)(HTMLTypesModule, options);
                    const output = yield bootstrap;
                    expect(output).toBe('<html><head></head><body><app ng-version="0.0.0-PLACEHOLDER" ng-server-context="other">' +
                        '<div><b>foo</b> bar</div></app></body></html>');
                }));
                it('should handle element property "hidden"', () => __awaiter(this, void 0, void 0, function* () {
                    const options = { document: doc };
                    const bootstrap = isStandalone
                        ? (0, utils_2.renderApplication)(MyHiddenComponentStandalone, options)
                        : (0, index_1.renderModule)(HiddenModule, options);
                    const output = yield bootstrap;
                    expect(output).toBe('<html><head></head><body><app ng-version="0.0.0-PLACEHOLDER" ng-server-context="other">' +
                        '<input hidden=""><input></app></body></html>');
                }));
                it('should call render hook', () => __awaiter(this, void 0, void 0, function* () {
                    const options = { document: doc };
                    const bootstrap = isStandalone
                        ? (0, utils_2.renderApplication)(getStandaloneBootstrapFn(MyServerAppStandalone, RenderHookProviders), options)
                        : (0, index_1.renderModule)(RenderHookModule, options);
                    const output = yield bootstrap;
                    // title should be added by the render hook.
                    expect(output).toBe('<html><head><title>RenderHook</title></head><body>' +
                        '<app ng-version="0.0.0-PLACEHOLDER" ng-server-context="other">Works!</app></body></html>');
                }));
                it('should call multiple render hooks', () => __awaiter(this, void 0, void 0, function* () {
                    const consoleSpy = spyOn(console, 'warn');
                    const options = { document: doc };
                    const bootstrap = isStandalone
                        ? (0, utils_2.renderApplication)(getStandaloneBootstrapFn(MyServerAppStandalone, MultiRenderHookProviders), options)
                        : (0, index_1.renderModule)(MultiRenderHookModule, options);
                    const output = yield bootstrap;
                    // title should be added by the render hook.
                    expect(output).toBe('<html><head><title>RenderHook</title><meta name="description"></head>' +
                        '<body><app ng-version="0.0.0-PLACEHOLDER" ng-server-context="other">Works!</app></body></html>');
                    expect(consoleSpy).toHaveBeenCalled();
                }));
                it('should call async render hooks', () => __awaiter(this, void 0, void 0, function* () {
                    const options = { document: doc };
                    const bootstrap = isStandalone
                        ? (0, utils_2.renderApplication)(getStandaloneBootstrapFn(MyServerAppStandalone, AsyncRenderHookProviders), options)
                        : (0, index_1.renderModule)(AsyncRenderHookModule, options);
                    const output = yield bootstrap;
                    // title should be added by the render hook.
                    expect(output).toBe('<html><head><title>AsyncRenderHook</title></head><body>' +
                        '<app ng-version="0.0.0-PLACEHOLDER" ng-server-context="other">Works!</app></body></html>');
                }));
                it('should call multiple async and sync render hooks', () => __awaiter(this, void 0, void 0, function* () {
                    const consoleSpy = spyOn(console, 'warn');
                    const options = { document: doc };
                    const bootstrap = isStandalone
                        ? (0, utils_2.renderApplication)(getStandaloneBootstrapFn(MyServerAppStandalone, AsyncMultiRenderHookProviders), options)
                        : (0, index_1.renderModule)(AsyncMultiRenderHookModule, options);
                    const output = yield bootstrap;
                    // title should be added by the render hook.
                    expect(output).toBe('<html><head><meta name="description"><title>AsyncRenderHook</title></head>' +
                        '<body><app ng-version="0.0.0-PLACEHOLDER" ng-server-context="other">Works!</app></body></html>');
                    expect(consoleSpy).toHaveBeenCalled();
                }));
                it(`should wait for InitialRenderPendingTasks before serializing ` +
                    `(standalone: ${isStandalone})`, () => __awaiter(this, void 0, void 0, function* () {
                    const options = { document: doc };
                    const bootstrap = isStandalone
                        ? (0, utils_2.renderApplication)(getStandaloneBootstrapFn(PendingTasksAppStandalone), options)
                        : (0, index_1.renderModule)(PendingTasksAppModule, options);
                    const output = yield bootstrap;
                    expect(output).toBe('<html><head></head><body>' +
                        '<app ng-version="0.0.0-PLACEHOLDER" ng-server-context="other">Completed: Yes</app>' +
                        '</body></html>');
                }));
                it(`should call onOnDestroy of a service after a successful render` +
                    `(standalone: ${isStandalone})`, () => __awaiter(this, void 0, void 0, function* () {
                    let wasServiceNgOnDestroyCalled = false;
                    let DestroyableService = (() => {
                        let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var DestroyableService = _classThis = class {
                            ngOnDestroy() {
                                wasServiceNgOnDestroyCalled = true;
                            }
                        };
                        __setFunctionName(_classThis, "DestroyableService");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            DestroyableService = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return DestroyableService = _classThis;
                    })();
                    const SuccessfulAppInitializerProviders = [
                        {
                            provide: core_1.APP_INITIALIZER,
                            useFactory: () => {
                                (0, core_1.inject)(DestroyableService);
                                return () => Promise.resolve(); // Success in APP_INITIALIZER
                            },
                            multi: true,
                        },
                    ];
                    let ServerSuccessfulAppInitializerModule = (() => {
                        let _classDecorators = [(0, core_1.NgModule)({
                                providers: SuccessfulAppInitializerProviders,
                                imports: [MyServerAppModule, index_1.ServerModule],
                                bootstrap: [MyServerApp],
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var ServerSuccessfulAppInitializerModule = _classThis = class {
                        };
                        __setFunctionName(_classThis, "ServerSuccessfulAppInitializerModule");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            ServerSuccessfulAppInitializerModule = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return ServerSuccessfulAppInitializerModule = _classThis;
                    })();
                    const ServerSuccessfulAppInitializerAppStandalone = getStandaloneBootstrapFn(createMyServerApp(true), SuccessfulAppInitializerProviders);
                    const options = { document: doc };
                    const bootstrap = isStandalone
                        ? (0, utils_2.renderApplication)(ServerSuccessfulAppInitializerAppStandalone, options)
                        : (0, index_1.renderModule)(ServerSuccessfulAppInitializerModule, options);
                    yield bootstrap;
                    expect((0, core_1.getPlatform)()).withContext('PlatformRef should be destroyed').toBeNull();
                    expect(wasServiceNgOnDestroyCalled)
                        .withContext('DestroyableService.ngOnDestroy() should be called')
                        .toBeTrue();
                }));
                it(`should call onOnDestroy of a service after some APP_INITIALIZER fails ` +
                    `(standalone: ${isStandalone})`, () => __awaiter(this, void 0, void 0, function* () {
                    let wasServiceNgOnDestroyCalled = false;
                    let DestroyableService = (() => {
                        let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var DestroyableService = _classThis = class {
                            ngOnDestroy() {
                                wasServiceNgOnDestroyCalled = true;
                            }
                        };
                        __setFunctionName(_classThis, "DestroyableService");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            DestroyableService = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return DestroyableService = _classThis;
                    })();
                    const FailingAppInitializerProviders = [
                        {
                            provide: core_1.APP_INITIALIZER,
                            useFactory: () => {
                                (0, core_1.inject)(DestroyableService);
                                return () => Promise.reject('Error in APP_INITIALIZER');
                            },
                            multi: true,
                        },
                    ];
                    let ServerFailingAppInitializerModule = (() => {
                        let _classDecorators = [(0, core_1.NgModule)({
                                providers: FailingAppInitializerProviders,
                                imports: [MyServerAppModule, index_1.ServerModule],
                                bootstrap: [MyServerApp],
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var ServerFailingAppInitializerModule = _classThis = class {
                        };
                        __setFunctionName(_classThis, "ServerFailingAppInitializerModule");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            ServerFailingAppInitializerModule = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return ServerFailingAppInitializerModule = _classThis;
                    })();
                    const ServerFailingAppInitializerAppStandalone = getStandaloneBootstrapFn(createMyServerApp(true), FailingAppInitializerProviders);
                    const options = { document: doc };
                    const bootstrap = isStandalone
                        ? (0, utils_2.renderApplication)(ServerFailingAppInitializerAppStandalone, options)
                        : (0, index_1.renderModule)(ServerFailingAppInitializerModule, options);
                    yield expectAsync(bootstrap).toBeRejectedWith('Error in APP_INITIALIZER');
                    expect((0, core_1.getPlatform)()).withContext('PlatformRef should be destroyed').toBeNull();
                    expect(wasServiceNgOnDestroyCalled)
                        .withContext('DestroyableService.ngOnDestroy() should be called')
                        .toBeTrue();
                }));
                it(`should call onOnDestroy of a service after an error happens in a root component's constructor ` +
                    `(standalone: ${isStandalone})`, () => __awaiter(this, void 0, void 0, function* () {
                    let wasServiceNgOnDestroyCalled = false;
                    let DestroyableService = (() => {
                        let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var DestroyableService = _classThis = class {
                            ngOnDestroy() {
                                wasServiceNgOnDestroyCalled = true;
                            }
                        };
                        __setFunctionName(_classThis, "DestroyableService");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            DestroyableService = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return DestroyableService = _classThis;
                    })();
                    let MyServerFailingConstructorApp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                standalone: isStandalone,
                                selector: 'app',
                                template: `Works!`,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var MyServerFailingConstructorApp = _classThis = class {
                            constructor() {
                                (0, core_1.inject)(DestroyableService);
                                throw 'Error in constructor of the root component';
                            }
                        };
                        __setFunctionName(_classThis, "MyServerFailingConstructorApp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            MyServerFailingConstructorApp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return MyServerFailingConstructorApp = _classThis;
                    })();
                    let MyServerFailingConstructorAppModule = (() => {
                        let _classDecorators = [(0, core_1.NgModule)({
                                declarations: [MyServerFailingConstructorApp],
                                imports: [MyServerAppModule, index_1.ServerModule],
                                bootstrap: [MyServerFailingConstructorApp],
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var MyServerFailingConstructorAppModule = _classThis = class {
                        };
                        __setFunctionName(_classThis, "MyServerFailingConstructorAppModule");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            MyServerFailingConstructorAppModule = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return MyServerFailingConstructorAppModule = _classThis;
                    })();
                    const MyServerFailingConstructorAppStandalone = getStandaloneBootstrapFn(MyServerFailingConstructorApp);
                    const options = { document: doc };
                    const bootstrap = isStandalone
                        ? (0, utils_2.renderApplication)(MyServerFailingConstructorAppStandalone, options)
                        : (0, index_1.renderModule)(MyServerFailingConstructorAppModule, options);
                    yield expectAsync(bootstrap).toBeRejectedWith('Error in constructor of the root component');
                    expect((0, core_1.getPlatform)()).withContext('PlatformRef should be destroyed').toBeNull();
                    expect(wasServiceNgOnDestroyCalled)
                        .withContext('DestroyableService.ngOnDestroy() should be called')
                        .toBeTrue();
                }));
            });
        });
        describe('Router', () => {
            it('should wait for lazy routes before serializing', () => __awaiter(this, void 0, void 0, function* () {
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
                let MyServerApp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: false,
                            selector: 'app',
                            template: `
            Works!
            <router-outlet/>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyServerApp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "MyServerApp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyServerApp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyServerApp = _classThis;
                })();
                let MyServerAppModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [MyServerApp],
                            exports: [MyServerApp],
                            imports: [platform_browser_1.BrowserModule, index_1.ServerModule, router_1.RouterOutlet],
                            providers: [(0, router_1.provideRouter)(routes)],
                            bootstrap: [MyServerApp],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyServerAppModule = _classThis = class {
                    };
                    __setFunctionName(_classThis, "MyServerAppModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyServerAppModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyServerAppModule = _classThis;
                })();
                const options = { document: '<html><head></head><body><app></app></body></html>' };
                const output = yield (0, index_1.renderModule)(MyServerAppModule, options);
                // Expect serialization to happen once a lazy-loaded route completes loading
                // and a lazy component is rendered.
                expect(output).toContain('<lazy>LazyCmp content</lazy>');
            }));
        });
        describe('HttpClient', () => {
            it('can inject HttpClient', () => __awaiter(this, void 0, void 0, function* () {
                const platform = (0, index_1.platformServer)([
                    { provide: index_1.INITIAL_CONFIG, useValue: { document: '<app></app>' } },
                ]);
                const ref = yield platform.bootstrapModule(HttpClientExampleModule);
                expect(ref.injector.get(http_1.HttpClient) instanceof http_1.HttpClient).toBeTruthy();
            }));
            it('can make HttpClient requests', () => __awaiter(this, void 0, void 0, function* () {
                const platform = (0, index_1.platformServer)([
                    { provide: index_1.INITIAL_CONFIG, useValue: { document: '<app></app>' } },
                ]);
                yield platform.bootstrapModule(HttpClientExampleModule).then((ref) => {
                    const mock = ref.injector.get(testing_1.HttpTestingController);
                    const http = ref.injector.get(http_1.HttpClient);
                    ref.injector.get(core_1.NgZone).run(() => {
                        http.get('http://localhost/testing').subscribe((body) => {
                            core_1.NgZone.assertInAngularZone();
                            expect(body).toEqual('success!');
                        });
                        mock.expectOne('http://localhost/testing').flush('success!');
                    });
                });
            }));
            it('can use HttpInterceptor that injects HttpClient', () => __awaiter(this, void 0, void 0, function* () {
                const platform = (0, index_1.platformServer)([
                    { provide: index_1.INITIAL_CONFIG, useValue: { document: '<app></app>' } },
                ]);
                yield platform.bootstrapModule(HttpInterceptorExampleModule).then((ref) => {
                    const mock = ref.injector.get(testing_1.HttpTestingController);
                    const http = ref.injector.get(http_1.HttpClient);
                    ref.injector.get(core_1.NgZone).run(() => {
                        http.get('http://localhost/testing').subscribe((body) => {
                            core_1.NgZone.assertInAngularZone();
                            expect(body).toEqual('success!');
                        });
                        mock.expectOne('http://localhost/testing').flush('success!');
                    });
                });
            }));
            describe('detecting state being transferred twice', () => {
                it(`shows a warning when server providers has been provided twice`, () => __awaiter(this, void 0, void 0, function* () {
                    const consoleSpy = spyOn(console, 'warn');
                    const options = { document: '<app></app>' };
                    const bootstrap = (0, index_1.renderModule)(DoubleTransferStateModule, options);
                    // Note: script#ng-state repeated twice below.
                    // It's a warning in v19
                    // And might become an error in v20.
                    const expectedOutput = '<html><head></head><body><app ng-version="0.0.0-PLACEHOLDER" ng-server-context="other"><div>Works!</div></app>' +
                        '<script id="ng-state" type="application/json">{"some-key":"some-value"}</script><script id="ng-state" type="application/json">{"some-key":"some-value"}</script></body></html>';
                    const output = yield bootstrap;
                    expect(output).toEqual(expectedOutput);
                    expect(consoleSpy).toHaveBeenCalledWith(jasmine.stringMatching('Angular detected an incompatible configuration'));
                    expect(consoleSpy).toHaveBeenCalledWith(jasmine.stringMatching(`This can happen if the server providers have been provided more than once using different mechanisms.`));
                }));
                it(`should not show a warning when server providers were provided once`, () => __awaiter(this, void 0, void 0, function* () {
                    const consoleSpy = spyOn(console, 'warn');
                    const options = { document: '<app></app>' };
                    const bootstrap = (0, index_1.renderModule)(MyTransferStateModule, options);
                    const expectedOutput = '<html><head></head><body><app ng-version="0.0.0-PLACEHOLDER" ng-server-context="other"><div>Works!</div></app>' +
                        '<script id="ng-state" type="application/json">{"some-key":"some-value"}</script></body></html>';
                    const output = yield bootstrap;
                    expect(output).toEqual(expectedOutput);
                    expect(consoleSpy).not.toHaveBeenCalledWith(jasmine.stringMatching('Angular detected an incompatible configuration'));
                }));
            });
            describe(`given 'url' is provided in 'INITIAL_CONFIG'`, () => {
                let mock;
                let ref;
                let http;
                beforeEach(() => __awaiter(this, void 0, void 0, function* () {
                    const platform = (0, index_1.platformServer)([
                        {
                            provide: index_1.INITIAL_CONFIG,
                            useValue: {
                                document: '<app></app>',
                                url: 'http://localhost:4000/foo',
                            },
                        },
                    ]);
                    ref = yield platform.bootstrapModule(HttpInterceptorExampleModule);
                    mock = ref.injector.get(testing_1.HttpTestingController);
                    http = ref.injector.get(http_1.HttpClient);
                }));
                it('should resolve relative request URLs to absolute', () => __awaiter(this, void 0, void 0, function* () {
                    ref.injector.get(core_1.NgZone).run(() => {
                        http.get('/testing').subscribe((body) => {
                            core_1.NgZone.assertInAngularZone();
                            expect(body).toEqual('success!');
                        });
                        mock.expectOne('http://localhost:4000/testing').flush('success!');
                    });
                }));
                it(`should not replace the baseUrl of a request when it's absolute`, () => __awaiter(this, void 0, void 0, function* () {
                    ref.injector.get(core_1.NgZone).run(() => {
                        http.get('http://localhost/testing').subscribe((body) => {
                            core_1.NgZone.assertInAngularZone();
                            expect(body).toEqual('success!');
                        });
                        mock.expectOne('http://localhost/testing').flush('success!');
                    });
                }));
            });
        });
    });
})();
