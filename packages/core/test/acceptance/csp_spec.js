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
const platform_browser_1 = require("@angular/platform-browser");
const testing_1 = require("@angular/private/testing");
describe('CSP integration', () => {
    beforeEach(core_1.destroyPlatform);
    afterEach(core_1.destroyPlatform);
    const testStyles = '.a { color: var(--csp-test-var, hotpink); }';
    function findTestNonces(rootNode) {
        var _a;
        const styles = rootNode.querySelectorAll('style');
        const nonces = [];
        for (let i = 0; i < styles.length; i++) {
            const style = styles[i];
            const nonce = style.getAttribute('nonce');
            if (nonce && ((_a = style.textContent) === null || _a === void 0 ? void 0 : _a.includes('--csp-test-var'))) {
                nonces.push(nonce);
            }
        }
        return nonces;
    }
    it('should use the predefined ngCspNonce when inserting styles with emulated encapsulation', (0, testing_1.withBody)('<app ngCspNonce="emulated-nonce"></app>', () => __awaiter(void 0, void 0, void 0, function* () {
        let UsesStyles = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'uses-styles',
                    template: '',
                    styles: [testStyles],
                    encapsulation: core_1.ViewEncapsulation.Emulated,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var UsesStyles = _classThis = class {
            };
            __setFunctionName(_classThis, "UsesStyles");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                UsesStyles = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return UsesStyles = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'app',
                    template: '<uses-styles></uses-styles>',
                    imports: [UsesStyles],
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
        const appRef = yield (0, platform_browser_1.bootstrapApplication)(App);
        expect(findTestNonces(document)).toEqual(['emulated-nonce']);
        appRef.destroy();
    })));
    it('should use the predefined ngCspNonce when inserting styles with no encapsulation', (0, testing_1.withBody)('<app ngCspNonce="disabled-nonce"></app>', () => __awaiter(void 0, void 0, void 0, function* () {
        let UsesStyles = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'uses-styles',
                    template: '',
                    styles: [testStyles],
                    encapsulation: core_1.ViewEncapsulation.None,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var UsesStyles = _classThis = class {
            };
            __setFunctionName(_classThis, "UsesStyles");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                UsesStyles = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return UsesStyles = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'app',
                    template: '<uses-styles></uses-styles>',
                    imports: [UsesStyles],
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
        const appRef = yield (0, platform_browser_1.bootstrapApplication)(App);
        expect(findTestNonces(document)).toEqual(['disabled-nonce']);
        appRef.destroy();
    })));
    it('should use the predefined ngCspNonce when inserting styles with shadow DOM encapsulation', (0, testing_1.withBody)('<app ngCspNonce="shadow-nonce"></app>', () => __awaiter(void 0, void 0, void 0, function* () {
        if (!document.body.attachShadow) {
            return;
        }
        let usesStylesRootNode;
        let UsesStyles = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'uses-styles',
                    template: '',
                    styles: [testStyles],
                    encapsulation: core_1.ViewEncapsulation.ShadowDom,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var UsesStyles = _classThis = class {
                constructor() {
                    usesStylesRootNode = (0, core_1.inject)(core_1.ElementRef).nativeElement;
                }
            };
            __setFunctionName(_classThis, "UsesStyles");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                UsesStyles = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return UsesStyles = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'app',
                    template: '<uses-styles></uses-styles>',
                    imports: [UsesStyles],
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
        const appRef = yield (0, platform_browser_1.bootstrapApplication)(App);
        expect(findTestNonces(usesStylesRootNode.shadowRoot)).toEqual(['shadow-nonce']);
        appRef.destroy();
    })));
    it('should prefer nonce provided through DI over one provided in the DOM', (0, testing_1.withBody)('<app ngCspNonce="dom-nonce"></app>', () => __awaiter(void 0, void 0, void 0, function* () {
        let UsesStyles = (() => {
            let _classDecorators = [(0, core_1.Component)({ selector: 'uses-styles', template: '', styles: [testStyles] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var UsesStyles = _classThis = class {
            };
            __setFunctionName(_classThis, "UsesStyles");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                UsesStyles = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return UsesStyles = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'app',
                    template: '<uses-styles></uses-styles>',
                    imports: [UsesStyles],
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
        const appRef = yield (0, platform_browser_1.bootstrapApplication)(App, {
            providers: [{ provide: core_1.CSP_NONCE, useValue: 'di-nonce' }],
        });
        expect(findTestNonces(document)).toEqual(['di-nonce']);
        appRef.destroy();
    })));
});
