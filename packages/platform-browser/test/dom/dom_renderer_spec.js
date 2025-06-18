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
exports.SomeAppForCleanUp = exports.SomeApp = void 0;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const by_1 = require("../../src/dom/debug/by");
const dom_renderer_1 = require("../../src/dom/dom_renderer");
const matchers_1 = require("../../testing/src/matchers");
describe('DefaultDomRendererV2', () => {
    if (isNode) {
        // Jasmine will throw if there are no tests.
        it('should pass', () => { });
        return;
    }
    let renderer;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                TestCmp,
                SomeApp,
                SomeAppForCleanUp,
                CmpEncapsulationEmulated,
                CmpEncapsulationNone,
                CmpEncapsulationShadow,
            ],
        });
        renderer = testing_1.TestBed.createComponent(TestCmp).componentInstance.renderer;
    });
    describe('setAttribute', () => {
        describe('with namespace', () => {
            it('xmlns', () => shouldSetAttributeWithNs('xmlns'));
            it('xml', () => shouldSetAttributeWithNs('xml'));
            it('svg', () => shouldSetAttributeWithNs('svg'));
            it('xhtml', () => shouldSetAttributeWithNs('xhtml'));
            it('xlink', () => shouldSetAttributeWithNs('xlink'));
            it('unknown', () => {
                const div = document.createElement('div');
                (0, matchers_1.expect)(div.hasAttribute('unknown:name')).toBe(false);
                renderer.setAttribute(div, 'name', 'value', 'unknown');
                (0, matchers_1.expect)(div.getAttribute('unknown:name')).toBe('value');
            });
            function shouldSetAttributeWithNs(namespace) {
                const namespaceUri = dom_renderer_1.NAMESPACE_URIS[namespace];
                const div = document.createElement('div');
                (0, matchers_1.expect)(div.hasAttributeNS(namespaceUri, 'name')).toBe(false);
                renderer.setAttribute(div, 'name', 'value', namespace);
                (0, matchers_1.expect)(div.getAttributeNS(namespaceUri, 'name')).toBe('value');
            }
        });
    });
    describe('removeAttribute', () => {
        describe('with namespace', () => {
            it('xmlns', () => shouldRemoveAttributeWithNs('xmlns'));
            it('xml', () => shouldRemoveAttributeWithNs('xml'));
            it('svg', () => shouldRemoveAttributeWithNs('svg'));
            it('xhtml', () => shouldRemoveAttributeWithNs('xhtml'));
            it('xlink', () => shouldRemoveAttributeWithNs('xlink'));
            it('unknown', () => {
                const div = document.createElement('div');
                div.setAttribute('unknown:name', 'value');
                (0, matchers_1.expect)(div.hasAttribute('unknown:name')).toBe(true);
                renderer.removeAttribute(div, 'name', 'unknown');
                (0, matchers_1.expect)(div.hasAttribute('unknown:name')).toBe(false);
            });
            function shouldRemoveAttributeWithNs(namespace) {
                const namespaceUri = dom_renderer_1.NAMESPACE_URIS[namespace];
                const div = document.createElement('div');
                div.setAttributeNS(namespaceUri, `${namespace}:name`, 'value');
                (0, matchers_1.expect)(div.hasAttributeNS(namespaceUri, 'name')).toBe(true);
                renderer.removeAttribute(div, 'name', namespace);
                (0, matchers_1.expect)(div.hasAttributeNS(namespaceUri, 'name')).toBe(false);
            }
        });
    });
    describe('removeChild', () => {
        it('should not error when removing a child without passing a parent', () => {
            const parent = document.createElement('div');
            const child = document.createElement('div');
            parent.appendChild(child);
            renderer.removeChild(null, child);
        });
    });
    it('should allow to style components with emulated encapsulation and no encapsulation inside of components with shadow DOM', () => {
        const fixture = testing_1.TestBed.createComponent(SomeApp);
        fixture.detectChanges();
        const cmp = fixture.debugElement.query(by_1.By.css('cmp-shadow')).nativeElement;
        const shadow = cmp.shadowRoot.querySelector('.shadow');
        (0, matchers_1.expect)(window.getComputedStyle(shadow).color).toEqual('rgb(255, 0, 0)');
        const emulated = cmp.shadowRoot.querySelector('.emulated');
        (0, matchers_1.expect)(window.getComputedStyle(emulated).color).toEqual('rgb(0, 0, 255)');
        const none = cmp.shadowRoot.querySelector('.none');
        (0, matchers_1.expect)(window.getComputedStyle(none).color).toEqual('rgb(0, 255, 0)');
    });
    it('should be able to append children to a <template> element', () => {
        const template = document.createElement('template');
        const child = document.createElement('div');
        renderer.appendChild(template, child);
        (0, matchers_1.expect)(child.parentNode).toBe(template.content);
    });
    it('should be able to insert children before others in a <template> element', () => {
        const template = document.createElement('template');
        const child = document.createElement('div');
        const otherChild = document.createElement('div');
        template.content.appendChild(child);
        renderer.insertBefore(template, otherChild, child);
        (0, matchers_1.expect)(otherChild.parentNode).toBe(template.content);
    });
    describe('should not cleanup styles of destroyed components when `REMOVE_STYLES_ON_COMPONENT_DESTROY` is `false`', () => {
        beforeEach(() => {
            testing_1.TestBed.resetTestingModule();
            testing_1.TestBed.configureTestingModule({
                declarations: [SomeAppForCleanUp, CmpEncapsulationEmulated, CmpEncapsulationNone],
                providers: [
                    {
                        provide: dom_renderer_1.REMOVE_STYLES_ON_COMPONENT_DESTROY,
                        useValue: false,
                    },
                ],
            });
        });
        it('works for components without encapsulation emulated', () => __awaiter(void 0, void 0, void 0, function* () {
            const fixture = testing_1.TestBed.createComponent(SomeAppForCleanUp);
            const compInstance = fixture.componentInstance;
            compInstance.showEmulatedComponents = true;
            fixture.detectChanges();
            // verify style is in DOM
            (0, matchers_1.expect)(yield styleCount(fixture, '.emulated')).toBe(1);
            // Remove a single instance of the component.
            compInstance.componentOneInstanceHidden = true;
            fixture.detectChanges();
            // Verify style is still in DOM
            (0, matchers_1.expect)(yield styleCount(fixture, '.emulated')).toBe(1);
            // Hide all instances of the component
            compInstance.componentTwoInstanceHidden = true;
            fixture.detectChanges();
            // Verify style is still in DOM
            (0, matchers_1.expect)(yield styleCount(fixture, '.emulated')).toBe(1);
        }));
        it('works for components without encapsulation none', () => __awaiter(void 0, void 0, void 0, function* () {
            const fixture = testing_1.TestBed.createComponent(SomeAppForCleanUp);
            const compInstance = fixture.componentInstance;
            compInstance.showEmulatedComponents = false;
            fixture.detectChanges();
            // verify style is in DOM
            (0, matchers_1.expect)(yield styleCount(fixture, '.none')).toBe(1);
            // Remove a single instance of the component.
            compInstance.componentOneInstanceHidden = true;
            fixture.detectChanges();
            // Verify style is still in DOM
            (0, matchers_1.expect)(yield styleCount(fixture, '.none')).toBe(1);
            // Hide all instances of the component
            compInstance.componentTwoInstanceHidden = true;
            fixture.detectChanges();
            // Verify style is still in DOM
            (0, matchers_1.expect)(yield styleCount(fixture, '.none')).toBe(1);
        }));
    });
    describe('should cleanup styles of destroyed components by default', () => {
        it('works for components without encapsulation emulated', () => __awaiter(void 0, void 0, void 0, function* () {
            const fixture = testing_1.TestBed.createComponent(SomeAppForCleanUp);
            const compInstance = fixture.componentInstance;
            compInstance.showEmulatedComponents = true;
            fixture.detectChanges();
            // verify style is in DOM
            (0, matchers_1.expect)(yield styleCount(fixture, '.emulated')).toBe(1);
            // Remove a single instance of the component.
            compInstance.componentOneInstanceHidden = true;
            fixture.detectChanges();
            // Verify style is still in DOM
            (0, matchers_1.expect)(yield styleCount(fixture, '.emulated')).toBe(1);
            // Hide all instances of the component
            compInstance.componentTwoInstanceHidden = true;
            fixture.detectChanges();
            // Verify style is not in DOM
            (0, matchers_1.expect)(yield styleCount(fixture, '.emulated')).toBe(0);
        }));
        it('works for components without encapsulation none', () => __awaiter(void 0, void 0, void 0, function* () {
            const fixture = testing_1.TestBed.createComponent(SomeAppForCleanUp);
            const compInstance = fixture.componentInstance;
            compInstance.showEmulatedComponents = false;
            fixture.detectChanges();
            // verify style is in DOM
            (0, matchers_1.expect)(yield styleCount(fixture, '.none')).toBe(1);
            // Remove a single instance of the component.
            compInstance.componentOneInstanceHidden = true;
            fixture.detectChanges();
            // Verify style is still in DOM
            (0, matchers_1.expect)(yield styleCount(fixture, '.none')).toBe(1);
            // Hide all instances of the component
            compInstance.componentTwoInstanceHidden = true;
            fixture.detectChanges();
            // Verify style is not in DOM
            (0, matchers_1.expect)(yield styleCount(fixture, '.emulated')).toBe(0);
        }));
    });
    describe('should support namespaces', () => {
        it('should create SVG elements', () => {
            (0, matchers_1.expect)(document.createElementNS(dom_renderer_1.NAMESPACE_URIS['svg'], 'math') instanceof SVGElement).toBeTrue();
        });
        it('should create MathML elements', () => {
            // MathMLElement is fairly recent and doesn't exist on our Saucelabs test environments
            if (typeof MathMLElement !== 'undefined') {
                (0, matchers_1.expect)(document.createElementNS(dom_renderer_1.NAMESPACE_URIS['math'], 'math') instanceof MathMLElement).toBeTrue();
            }
        });
    });
    it('should update an external sourceMappingURL by prepending the baseHref as a prefix', () => {
        var _a;
        document.head.innerHTML = `<base href="/base/" />`;
        testing_1.TestBed.resetTestingModule();
        testing_1.TestBed.configureTestingModule({
            declarations: [CmpEncapsulationNoneWithSourceMap],
        });
        const fixture = testing_1.TestBed.createComponent(CmpEncapsulationNoneWithSourceMap);
        fixture.detectChanges();
        (0, matchers_1.expect)((_a = document.head.querySelector('style')) === null || _a === void 0 ? void 0 : _a.textContent).toContain('/*# sourceMappingURL=/base/cmp-none.css.map */');
        document.head.innerHTML = '';
    });
});
describe('addBaseHrefToCssSourceMap', () => {
    it('should return the original styles if baseHref is empty', () => {
        const styles = ['body { color: red; }'];
        const result = (0, dom_renderer_1.addBaseHrefToCssSourceMap)('', styles);
        (0, matchers_1.expect)(result).toEqual(styles);
    });
    it('should skip styles that do not contain a sourceMappingURL', () => {
        const styles = ['body { color: red; }', 'h1 { font-size: 2rem; }'];
        const result = (0, dom_renderer_1.addBaseHrefToCssSourceMap)('/base/', styles);
        (0, matchers_1.expect)(result).toEqual(styles);
    });
    it('should not modify inline (encoded) sourceMappingURL maps', () => {
        const styles = ['/*# sourceMappingURL=data:application/json;base64,xyz */'];
        const result = (0, dom_renderer_1.addBaseHrefToCssSourceMap)('/base/', styles);
        (0, matchers_1.expect)(result).toEqual(styles);
    });
    it('should prepend baseHref to external sourceMappingURL', () => {
        const styles = ['/*# sourceMappingURL=style.css */'];
        const result = (0, dom_renderer_1.addBaseHrefToCssSourceMap)('/base/', styles);
        (0, matchers_1.expect)(result).toEqual(['/*# sourceMappingURL=/base/style.css */']);
    });
    it('should handle baseHref with a trailing slash correctly', () => {
        const styles = ['/*# sourceMappingURL=style.css */'];
        const result = (0, dom_renderer_1.addBaseHrefToCssSourceMap)('/base/', styles);
        (0, matchers_1.expect)(result).toEqual(['/*# sourceMappingURL=/base/style.css */']);
    });
    it('should handle baseHref without a trailing slash correctly', () => {
        const styles = ['/*# sourceMappingURL=style.css */'];
        const result = (0, dom_renderer_1.addBaseHrefToCssSourceMap)('/base', styles);
        (0, matchers_1.expect)(result).toEqual(['/*# sourceMappingURL=/style.css */']);
    });
    it('should not duplicate slashes in the final URL', () => {
        const styles = ['/*# sourceMappingURL=./style.css */'];
        const result = (0, dom_renderer_1.addBaseHrefToCssSourceMap)('/base/', styles);
        (0, matchers_1.expect)(result).toEqual(['/*# sourceMappingURL=/base/style.css */']);
    });
    it('should not add base href to sourceMappingURL that is absolute', () => {
        const styles = ['/*# sourceMappingURL=http://example.com/style.css */'];
        const result = (0, dom_renderer_1.addBaseHrefToCssSourceMap)('/base/', styles);
        (0, matchers_1.expect)(result).toEqual(['/*# sourceMappingURL=http://example.com/style.css */']);
    });
    it('should process multiple styles and handle each case correctly', () => {
        const styles = [
            '/*# sourceMappingURL=style1.css */',
            '/*# sourceMappingURL=data:application/json;base64,xyz */',
            'h1 { font-size: 2rem; }',
            '/*# sourceMappingURL=style2.css */',
        ];
        const result = (0, dom_renderer_1.addBaseHrefToCssSourceMap)('/base/', styles);
        (0, matchers_1.expect)(result).toEqual([
            '/*# sourceMappingURL=/base/style1.css */',
            '/*# sourceMappingURL=data:application/json;base64,xyz */',
            'h1 { font-size: 2rem; }',
            '/*# sourceMappingURL=/base/style2.css */',
        ]);
    });
});
function styleCount(fixture, cssContentMatcher) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        // flush
        yield new Promise((resolve) => {
            setTimeout(() => resolve(), 0);
        });
        const html = (_a = fixture.debugElement.parent) === null || _a === void 0 ? void 0 : _a.parent;
        const debugElements = html === null || html === void 0 ? void 0 : html.queryAll(by_1.By.css('style'));
        if (!debugElements) {
            return 0;
        }
        return debugElements.filter(({ nativeElement }) => nativeElement.textContent.includes(cssContentMatcher)).length;
    });
}
let CmpEncapsulationEmulated = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'cmp-emulated',
            template: `<div class="emulated"></div>`,
            styles: [`.emulated { color: blue; }`],
            encapsulation: core_1.ViewEncapsulation.Emulated,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CmpEncapsulationEmulated = _classThis = class {
    };
    __setFunctionName(_classThis, "CmpEncapsulationEmulated");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CmpEncapsulationEmulated = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CmpEncapsulationEmulated = _classThis;
})();
let CmpEncapsulationNone = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'cmp-none',
            template: `<div class="none"></div>`,
            styles: [`.none { color: lime; }`],
            encapsulation: core_1.ViewEncapsulation.None,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CmpEncapsulationNone = _classThis = class {
    };
    __setFunctionName(_classThis, "CmpEncapsulationNone");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CmpEncapsulationNone = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CmpEncapsulationNone = _classThis;
})();
let CmpEncapsulationNoneWithSourceMap = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'cmp-none',
            template: `<div class="none"></div>`,
            styles: [`.none { color: lime; }\n/*# sourceMappingURL=cmp-none.css.map */`],
            encapsulation: core_1.ViewEncapsulation.None,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CmpEncapsulationNoneWithSourceMap = _classThis = class {
    };
    __setFunctionName(_classThis, "CmpEncapsulationNoneWithSourceMap");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CmpEncapsulationNoneWithSourceMap = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CmpEncapsulationNoneWithSourceMap = _classThis;
})();
let CmpEncapsulationShadow = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'cmp-shadow',
            template: `<div class="shadow"></div><cmp-emulated></cmp-emulated><cmp-none></cmp-none>`,
            styles: [`.shadow { color: red; }`],
            encapsulation: core_1.ViewEncapsulation.ShadowDom,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CmpEncapsulationShadow = _classThis = class {
    };
    __setFunctionName(_classThis, "CmpEncapsulationShadow");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CmpEncapsulationShadow = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CmpEncapsulationShadow = _classThis;
})();
let SomeApp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'some-app',
            template: `
    <cmp-shadow></cmp-shadow>
    <cmp-emulated></cmp-emulated>
    <cmp-none></cmp-none>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SomeApp = _classThis = class {
    };
    __setFunctionName(_classThis, "SomeApp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SomeApp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SomeApp = _classThis;
})();
exports.SomeApp = SomeApp;
let TestCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'test-cmp',
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TestCmp = _classThis = class {
        constructor(renderer) {
            this.renderer = renderer;
        }
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
let SomeAppForCleanUp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'some-app',
            template: `
    <cmp-emulated *ngIf="!componentOneInstanceHidden && showEmulatedComponents"></cmp-emulated>
    <cmp-emulated *ngIf="!componentTwoInstanceHidden && showEmulatedComponents"></cmp-emulated>

    <cmp-none *ngIf="!componentOneInstanceHidden && !showEmulatedComponents"></cmp-none>
    <cmp-none *ngIf="!componentTwoInstanceHidden && !showEmulatedComponents"></cmp-none>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SomeAppForCleanUp = _classThis = class {
        constructor() {
            this.componentOneInstanceHidden = false;
            this.componentTwoInstanceHidden = false;
            this.showEmulatedComponents = true;
        }
    };
    __setFunctionName(_classThis, "SomeAppForCleanUp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SomeAppForCleanUp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SomeAppForCleanUp = _classThis;
})();
exports.SomeAppForCleanUp = SomeAppForCleanUp;
