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
exports.Service4 = exports.Service3 = exports.Service2 = exports.Service1 = exports.RoutesStandaloneComponent = exports.RoutesTwoComponent = exports.RoutesOneComponent = exports.RoutesAuxComponent = exports.RoutesHomeComponent = void 0;
const core_1 = require("@angular/core");
let RoutesHomeComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-routes-home',
            standalone: false,
            template: `
    <h1>home works!</h1>
    <div style="display:flex; flex-direction: column;">
      <a routerLink="/demo-app/todos/routes/home">Home</a>
      <a routerLink="/demo-app/todos/routes/route-one">Route One</a>
      <a routerLink="/demo-app/todos/routes/route-two">Route Two</a>
      <a routerLink="/demo-app/todos/routes/route-params/hello">Route Params</a>
      <a routerLink="/demo-app/todos/routes/route-query-params" [queryParams]="routeQueryParmas"
        >Route Query Params</a
      >
      <a routerLink="/demo-app/todos/routes/route-data">Route Data</a>
    </div>
    <hr />
    <div class="flex items-center border-2 border-dashed border-gray-600 p-2">
      <h1>Route Data:&nbsp;&nbsp;</h1>
      <pre class="p-2 bg-gray-100">{{ routeData | json }}</pre>
    </div>
    <br />
    <div class="flex items-center border-2 border-dashed border-gray-600 p-2">
      <h1>Route Params:&nbsp;&nbsp;</h1>
      <pre class="p-2 bg-gray-100">{{ routeParams | json }}</pre>
    </div>
    <br />
    <div
      class="flex items-center border-2 border-dashed border-gray-600
      p-2"
    >
      <h1>Qquery Params:&nbsp;&nbsp;</h1>
      <pre class="p-2 bg-gray-100">{{ queryParams | json }}</pre>
    </div>
  `,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var RoutesHomeComponent = _classThis = class {
        constructor(activatedRoute) {
            this.activatedRoute = activatedRoute;
            this.routeQueryParmas = { 'message': 'Hello from route param!!' };
        }
        ngOnInit() {
            this.routeData = this.activatedRoute.snapshot.data;
            this.routeParams = this.activatedRoute.snapshot.params;
            this.queryParams = this.activatedRoute.snapshot.queryParams;
        }
    };
    __setFunctionName(_classThis, "RoutesHomeComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RoutesHomeComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RoutesHomeComponent = _classThis;
})();
exports.RoutesHomeComponent = RoutesHomeComponent;
let RoutesAuxComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-routes-aux',
            template: 'Component Aux',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var RoutesAuxComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "RoutesAuxComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RoutesAuxComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RoutesAuxComponent = _classThis;
})();
exports.RoutesAuxComponent = RoutesAuxComponent;
let RoutesOneComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-routes-one',
            template: `<h1>Route 1 works</h1>`,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var RoutesOneComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "RoutesOneComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RoutesOneComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RoutesOneComponent = _classThis;
})();
exports.RoutesOneComponent = RoutesOneComponent;
let RoutesTwoComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-routes-two',
            template: `<h1>Route 2 works</h1>`,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var RoutesTwoComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "RoutesTwoComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RoutesTwoComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RoutesTwoComponent = _classThis;
})();
exports.RoutesTwoComponent = RoutesTwoComponent;
let RoutesStandaloneComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            standalone: true,
            selector: 'app-routes-standalone',
            template: '<h1>Standalone Route</h1>',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var RoutesStandaloneComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "RoutesStandaloneComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RoutesStandaloneComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RoutesStandaloneComponent = _classThis;
})();
exports.RoutesStandaloneComponent = RoutesStandaloneComponent;
let Service1 = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Service1 = _classThis = class {
        constructor() {
            this.value = `Service One Id: ${Math.floor(Math.random() * 500)}`;
        }
    };
    __setFunctionName(_classThis, "Service1");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Service1 = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Service1 = _classThis;
})();
exports.Service1 = Service1;
let Service2 = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Service2 = _classThis = class {
        constructor() {
            this.value = `Service Two Id: ${Math.floor(Math.random() * 500)}`;
        }
    };
    __setFunctionName(_classThis, "Service2");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Service2 = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Service2 = _classThis;
})();
exports.Service2 = Service2;
let Service3 = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Service3 = _classThis = class {
        constructor() {
            this.value = `Service Three Id: ${Math.floor(Math.random() * 500)}`;
        }
    };
    __setFunctionName(_classThis, "Service3");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Service3 = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Service3 = _classThis;
})();
exports.Service3 = Service3;
let Service4 = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Service4 = _classThis = class {
        constructor() {
            this.value = `Service Four Id: ${Math.floor(Math.random() * 500)}`;
        }
    };
    __setFunctionName(_classThis, "Service4");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Service4 = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Service4 = _classThis;
})();
exports.Service4 = Service4;
