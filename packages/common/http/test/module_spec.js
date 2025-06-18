"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.sonpCallbackContext
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
const client_1 = require("../src/client");
const context_1 = require("../src/context");
const interceptor_1 = require("../src/interceptor");
const response_1 = require("../src/response");
const api_1 = require("../testing/src/api");
const module_1 = require("../testing/src/module");
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const operators_1 = require("rxjs/operators");
const IS_INTERCEPTOR_C_ENABLED = new context_1.HttpContextToken(() => undefined);
class TestInterceptor {
    constructor(value) {
        this.value = value;
    }
    intercept(req, delegate) {
        const existing = req.headers.get('Intercepted');
        const next = !!existing ? existing + ',' + this.value : this.value;
        req = req.clone({ setHeaders: { 'Intercepted': next } });
        return delegate.handle(req).pipe((0, operators_1.map)((event) => {
            if (event instanceof response_1.HttpResponse) {
                const existing = event.headers.get('Intercepted');
                const next = !!existing ? existing + ',' + this.value : this.value;
                return event.clone({ headers: event.headers.set('Intercepted', next) });
            }
            return event;
        }));
    }
}
class InterceptorA extends TestInterceptor {
    constructor() {
        super('A');
    }
}
class InterceptorB extends TestInterceptor {
    constructor() {
        super('B');
    }
}
class InterceptorC extends TestInterceptor {
    constructor() {
        super('C');
    }
    intercept(req, delegate) {
        if (req.context.get(IS_INTERCEPTOR_C_ENABLED) === true) {
            return super.intercept(req, delegate);
        }
        return delegate.handle(req);
    }
}
let ReentrantInterceptor = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ReentrantInterceptor = _classThis = class {
        constructor(client) {
            this.client = client;
        }
        intercept(req, next) {
            return next.handle(req);
        }
    };
    __setFunctionName(_classThis, "ReentrantInterceptor");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ReentrantInterceptor = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ReentrantInterceptor = _classThis;
})();
describe('HttpClientModule', () => {
    let injector;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [module_1.HttpClientTestingModule],
            providers: [
                { provide: interceptor_1.HTTP_INTERCEPTORS, useClass: InterceptorA, multi: true },
                { provide: interceptor_1.HTTP_INTERCEPTORS, useClass: InterceptorB, multi: true },
                { provide: interceptor_1.HTTP_INTERCEPTORS, useClass: InterceptorC, multi: true },
            ],
        });
        injector = testing_1.TestBed.inject(core_1.Injector);
    });
    it('initializes HttpClient properly', (done) => {
        injector
            .get(client_1.HttpClient)
            .get('/test', { responseType: 'text' })
            .subscribe((value) => {
            expect(value).toBe('ok!');
            done();
        });
        injector.get(api_1.HttpTestingController).expectOne('/test').flush('ok!');
    });
    it('intercepts outbound responses in the order in which interceptors were bound', (done) => {
        injector
            .get(client_1.HttpClient)
            .get('/test', { observe: 'response', responseType: 'text' })
            .subscribe(() => done());
        const req = injector.get(api_1.HttpTestingController).expectOne('/test');
        expect(req.request.headers.get('Intercepted')).toEqual('A,B');
        req.flush('ok!');
    });
    it('intercepts outbound responses in the order in which interceptors were bound and include specifically enabled interceptor', (done) => {
        injector
            .get(client_1.HttpClient)
            .get('/test', {
            observe: 'response',
            responseType: 'text',
            context: new context_1.HttpContext().set(IS_INTERCEPTOR_C_ENABLED, true),
        })
            .subscribe((value) => done());
        const req = injector.get(api_1.HttpTestingController).expectOne('/test');
        expect(req.request.headers.get('Intercepted')).toEqual('A,B,C');
        req.flush('ok!');
    });
    it('intercepts inbound responses in the right (reverse binding) order', (done) => {
        injector
            .get(client_1.HttpClient)
            .get('/test', { observe: 'response', responseType: 'text' })
            .subscribe((value) => {
            expect(value.headers.get('Intercepted')).toEqual('B,A');
            done();
        });
        injector.get(api_1.HttpTestingController).expectOne('/test').flush('ok!');
    });
    it('allows interceptors to inject HttpClient', (done) => {
        testing_1.TestBed.resetTestingModule();
        testing_1.TestBed.configureTestingModule({
            imports: [module_1.HttpClientTestingModule],
            providers: [{ provide: interceptor_1.HTTP_INTERCEPTORS, useClass: ReentrantInterceptor, multi: true }],
        });
        injector = testing_1.TestBed.inject(core_1.Injector);
        injector
            .get(client_1.HttpClient)
            .get('/test')
            .subscribe(() => {
            done();
        });
        injector.get(api_1.HttpTestingController).expectOne('/test').flush('ok!');
    });
});
