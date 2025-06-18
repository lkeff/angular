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
const common_1 = require("@angular/common");
const core_1 = require("../../src/core");
const testing_1 = require("../../testing");
const router_1 = require("@angular/router");
describe('router integration acceptance', () => {
    // Test case that ensures that we don't regress in multi-provider ordering
    // which is leveraged in the router. See: FW-1349
    it('should have correct order for multiple routes declared in different modules', () => {
        let Level1AModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    imports: [
                        router_1.RouterModule.forChild([
                            { path: '1a:1', redirectTo: '' },
                            { path: '1a:2', redirectTo: '' },
                        ]),
                    ],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Level1AModule = _classThis = class {
            };
            __setFunctionName(_classThis, "Level1AModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Level1AModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Level1AModule = _classThis;
        })();
        let Level1BModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    imports: [
                        router_1.RouterModule.forChild([
                            { path: '1b:1', redirectTo: '' },
                            { path: '1b:2', redirectTo: '' },
                        ]),
                    ],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Level1BModule = _classThis = class {
            };
            __setFunctionName(_classThis, "Level1BModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Level1BModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Level1BModule = _classThis;
        })();
        let RootModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    imports: [
                        router_1.RouterModule.forRoot([{ path: 'root', redirectTo: '' }]),
                        Level1AModule,
                        Level1BModule,
                    ],
                    providers: [{ provide: common_1.APP_BASE_HREF, useValue: '/' }],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var RootModule = _classThis = class {
            };
            __setFunctionName(_classThis, "RootModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                RootModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return RootModule = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            imports: [RootModule],
        });
        expect(testing_1.TestBed.inject(router_1.Router).config.map((r) => r.path)).toEqual([
            '1a:1',
            '1a:2',
            '1b:1',
            '1b:2',
            'root',
        ]);
    });
});
