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
const global_1 = require("../../src/util/global");
const testing_1 = require("../../testing");
const platform_browser_1 = require("@angular/platform-browser");
describe('comment node text escaping', () => {
    // see: https://html.spec.whatwg.org/multipage/syntax.html#comments
    [
        '>', // self closing
        '-->', // standard closing
        '--!>', // alternate closing
        '<!-- -->', // embedded comment.
    ].forEach((xssValue) => {
        it('should not be possible to do XSS through comment reflect data when writing: ' + xssValue, () => {
            let XSSComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div><span *ngIf="xssValue"></span><div>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var XSSComp = _classThis = class {
                    constructor() {
                        // ngIf serializes the `xssValue` into a comment for debugging purposes.
                        this.xssValue = xssValue + '<script>"evil"</script>';
                    }
                };
                __setFunctionName(_classThis, "XSSComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    XSSComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return XSSComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [XSSComp] });
            const fixture = testing_1.TestBed.createComponent(XSSComp);
            fixture.detectChanges();
            const div = fixture.nativeElement.querySelector('div');
            // Serialize into a string to mimic SSR serialization.
            const html = div.innerHTML;
            // This must be escaped or we have XSS.
            expect(html).not.toContain('--><script');
            // Now parse it back into DOM (from string)
            div.innerHTML = html;
            // Verify that we did not accidentally deserialize the `<script>`
            const script = div.querySelector('script');
            expect(script).toBeFalsy();
        });
    });
});
describe('iframe processing', () => {
    function getErrorMessageRegexp() {
        const errorMessagePart = 'NG0' + Math.abs(-910 /* RuntimeErrorCode.UNSAFE_IFRAME_ATTRS */).toString();
        return new RegExp(errorMessagePart);
    }
    function ensureNoIframePresent(fixture) {
        // Note: a `fixture` may not exist in case an error was thrown at creation time.
        const iframe = fixture === null || fixture === void 0 ? void 0 : fixture.nativeElement.querySelector('iframe');
        expect(!!iframe).toBeFalse();
    }
    function expectIframeCreationToFail(component) {
        let fixture;
        expect(() => {
            fixture = testing_1.TestBed.createComponent(component);
            fixture.detectChanges();
        }).toThrowError(getErrorMessageRegexp());
        ensureNoIframePresent(fixture);
        return fixture;
    }
    function expectIframeToBeCreated(component, attrsToCheck) {
        let fixture;
        expect(() => {
            fixture = testing_1.TestBed.createComponent(component);
            fixture.detectChanges();
        }).not.toThrow();
        const iframe = fixture.nativeElement.querySelector('iframe');
        for (const [attrName, attrValue] of Object.entries(attrsToCheck)) {
            expect(iframe[attrName]).toEqual(attrValue);
        }
        return fixture;
    }
    // *Must* be in sync with the `SECURITY_SENSITIVE_ATTRS` list
    // from the `packages/compiler/src/schema/dom_security_schema.ts`.
    const SECURITY_SENSITIVE_ATTRS = [
        'sandbox',
        'allow',
        'allowFullscreen',
        'referrerPolicy',
        'csp',
        'fetchPriority',
    ];
    const TEST_IFRAME_URL = 'https://angular.io/assets/images/logos/angular/angular.png';
    let oldNgDevMode;
    beforeAll(() => {
        oldNgDevMode = ngDevMode;
    });
    afterAll(() => {
        global_1.global['ngDevMode'] = oldNgDevMode;
    });
    [true, false].forEach((devModeFlag) => {
        beforeAll(() => {
            global_1.global['ngDevMode'] = devModeFlag;
            // TestBed and JIT compilation have some dependencies on the ngDevMode state, so we need to
            // reset TestBed to ensure we get a 'clean' JIT compilation under the new rules.
            testing_1.TestBed.resetTestingModule();
        });
        describe(`with ngDevMode = ${devModeFlag}`, () => {
            SECURITY_SENSITIVE_ATTRS.forEach((securityAttr) => {
                ['src', 'srcdoc'].forEach((srcAttr) => {
                    it(`should work when a security-sensitive attribute is set ` +
                        `as a static attribute (checking \`${securityAttr}\`)`, () => {
                        let IframeComp = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: 'my-comp',
                                    template: `
                  <iframe
                    ${srcAttr}="${TEST_IFRAME_URL}"
                    ${securityAttr}="">
                  </iframe>`,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var IframeComp = _classThis = class {
                            };
                            __setFunctionName(_classThis, "IframeComp");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                IframeComp = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return IframeComp = _classThis;
                        })();
                        expectIframeToBeCreated(IframeComp, { [srcAttr]: TEST_IFRAME_URL });
                    });
                    it(`should work when a security-sensitive attribute is set ` +
                        `as a static attribute (checking \`${securityAttr}\` and ` +
                        `making sure it's case-insensitive)`, () => {
                        let IframeComp = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: 'my-comp',
                                    template: `
                  <iframe
                    ${srcAttr}="${TEST_IFRAME_URL}"
                    ${securityAttr.toUpperCase()}="">
                  </iframe>`,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var IframeComp = _classThis = class {
                            };
                            __setFunctionName(_classThis, "IframeComp");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                IframeComp = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return IframeComp = _classThis;
                        })();
                        expectIframeToBeCreated(IframeComp, { [srcAttr]: TEST_IFRAME_URL });
                    });
                    it(`should error when a security-sensitive attribute is applied ` +
                        `using a property binding (checking \`${securityAttr}\`)`, () => {
                        let IframeComp = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: 'my-comp',
                                    template: `<iframe ${srcAttr}="${TEST_IFRAME_URL}" [${securityAttr}]="''"></iframe>`,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var IframeComp = _classThis = class {
                            };
                            __setFunctionName(_classThis, "IframeComp");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                IframeComp = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return IframeComp = _classThis;
                        })();
                        expectIframeCreationToFail(IframeComp);
                    });
                    it(`should error when a security-sensitive attribute is applied ` +
                        `using a property interpolation (checking \`${securityAttr}\`)`, () => {
                        let IframeComp = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: 'my-comp',
                                    template: `<iframe ${srcAttr}="${TEST_IFRAME_URL}" ${securityAttr}="{{''}}"></iframe>`,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var IframeComp = _classThis = class {
                            };
                            __setFunctionName(_classThis, "IframeComp");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                IframeComp = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return IframeComp = _classThis;
                        })();
                        expectIframeCreationToFail(IframeComp);
                    });
                    it(`should error when a security-sensitive attribute is applied ` +
                        `using a property binding (checking \`${securityAttr}\`, making ` +
                        `sure it's case-insensitive)`, () => {
                        let IframeComp = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: 'my-comp',
                                    template: `
                    <iframe
                      ${srcAttr}="${TEST_IFRAME_URL}"
                      [${securityAttr.toUpperCase()}]="''"
                    ></iframe>
                  `,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var IframeComp = _classThis = class {
                            };
                            __setFunctionName(_classThis, "IframeComp");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                IframeComp = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return IframeComp = _classThis;
                        })();
                        expectIframeCreationToFail(IframeComp);
                    });
                    it(`should error when a security-sensitive attribute is applied ` +
                        `using a property binding (checking \`${securityAttr}\`)`, () => {
                        let IframeComp = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: 'my-comp',
                                    template: `
                    <iframe
                      ${srcAttr}="${TEST_IFRAME_URL}"
                      [attr.${securityAttr}]="''"
                    ></iframe>
                  `,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var IframeComp = _classThis = class {
                            };
                            __setFunctionName(_classThis, "IframeComp");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                IframeComp = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return IframeComp = _classThis;
                        })();
                        expectIframeCreationToFail(IframeComp);
                    });
                    it(`should error when a security-sensitive attribute is applied ` +
                        `using a property binding (checking \`${securityAttr}\`, making ` +
                        `sure it's case-insensitive)`, () => {
                        let IframeComp = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: 'my-comp',
                                    template: `
                    <iframe
                      ${srcAttr}="${TEST_IFRAME_URL}"
                      [attr.${securityAttr.toUpperCase()}]="''"
                    ></iframe>
                  `,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var IframeComp = _classThis = class {
                            };
                            __setFunctionName(_classThis, "IframeComp");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                IframeComp = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return IframeComp = _classThis;
                        })();
                        expectIframeCreationToFail(IframeComp);
                    });
                    it(`should allow changing \`${srcAttr}\` after initial render`, () => {
                        let IframeComp = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: 'my-comp',
                                    template: `
                    <iframe
                      ${securityAttr}="allow-forms"
                      [${srcAttr}]="src">
                    </iframe>
                  `,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var IframeComp = _classThis = class {
                                constructor() {
                                    this.sanitizer = (0, core_1.inject)(platform_browser_1.DomSanitizer);
                                    this.src = this.sanitizeFn(TEST_IFRAME_URL);
                                }
                                get sanitizeFn() {
                                    return srcAttr === 'src'
                                        ? this.sanitizer.bypassSecurityTrustResourceUrl
                                        : this.sanitizer.bypassSecurityTrustHtml;
                                }
                            };
                            __setFunctionName(_classThis, "IframeComp");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                IframeComp = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return IframeComp = _classThis;
                        })();
                        const fixture = expectIframeToBeCreated(IframeComp, { [srcAttr]: TEST_IFRAME_URL });
                        const component = fixture.componentInstance;
                        // Changing `src` or `srcdoc` is allowed.
                        const newUrl = 'https://angular.io/about?group=Angular';
                        component.src = component.sanitizeFn(newUrl);
                        expect(() => fixture.detectChanges()).not.toThrow();
                        expect(fixture.nativeElement.querySelector('iframe')[srcAttr]).toEqual(newUrl);
                    });
                });
            });
            it('should work when a directive sets a security-sensitive attribute as a static attribute', () => {
                let IframeDir = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[dir]',
                            host: {
                                'src': TEST_IFRAME_URL,
                                'sandbox': '',
                            },
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var IframeDir = _classThis = class {
                    };
                    __setFunctionName(_classThis, "IframeDir");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        IframeDir = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return IframeDir = _classThis;
                })();
                let IframeComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            imports: [IframeDir],
                            selector: 'my-comp',
                            template: '<iframe dir></iframe>',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var IframeComp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "IframeComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        IframeComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return IframeComp = _classThis;
                })();
                expectIframeToBeCreated(IframeComp, { src: TEST_IFRAME_URL });
            });
            it('should work when a directive sets a security-sensitive host attribute on a non-iframe element', () => {
                let Dir = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[dir]',
                            host: {
                                'src': TEST_IFRAME_URL,
                                'sandbox': '',
                            },
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
                let NonIframeComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            imports: [Dir],
                            selector: 'my-comp',
                            template: '<img dir>',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var NonIframeComp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "NonIframeComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        NonIframeComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return NonIframeComp = _classThis;
                })();
                const fixture = testing_1.TestBed.createComponent(NonIframeComp);
                fixture.detectChanges();
                expect(fixture.nativeElement.firstChild.src).toEqual(TEST_IFRAME_URL);
            });
            it('should work when a security-sensitive attribute on an <iframe> ' +
                'which also has a structural directive (*ngIf)', () => {
                let IframeComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            imports: [common_1.NgIf],
                            selector: 'my-comp',
                            template: `<iframe *ngIf="visible" src="${TEST_IFRAME_URL}" sandbox=""></iframe>`,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var IframeComp = _classThis = class {
                        constructor() {
                            this.visible = true;
                        }
                    };
                    __setFunctionName(_classThis, "IframeComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        IframeComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return IframeComp = _classThis;
                })();
                expectIframeToBeCreated(IframeComp, { src: TEST_IFRAME_URL });
            });
            it('should work when a security-sensitive attribute is set between `src` and `srcdoc`', () => {
                let IframeComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<iframe src="${TEST_IFRAME_URL}" sandbox srcdoc="Hi!"></iframe>`,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var IframeComp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "IframeComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        IframeComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return IframeComp = _classThis;
                })();
                expectIframeToBeCreated(IframeComp, { src: TEST_IFRAME_URL });
            });
            it('should work when a directive sets a security-sensitive attribute before setting `src`', () => {
                let IframeDir = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[dir]',
                            host: {
                                'sandbox': '',
                                'src': TEST_IFRAME_URL,
                            },
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var IframeDir = _classThis = class {
                    };
                    __setFunctionName(_classThis, "IframeDir");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        IframeDir = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return IframeDir = _classThis;
                })();
                let IframeComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            imports: [IframeDir],
                            selector: 'my-comp',
                            template: '<iframe dir></iframe>',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var IframeComp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "IframeComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        IframeComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return IframeComp = _classThis;
                })();
                expectIframeToBeCreated(IframeComp, { src: TEST_IFRAME_URL });
            });
            it('should work when a directive sets an `src` and ' +
                'there was a security-sensitive attribute set in a template' +
                '(directive attribute after `sandbox`)', () => {
                let IframeDir = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[dir]',
                            host: {
                                'src': TEST_IFRAME_URL,
                            },
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var IframeDir = _classThis = class {
                    };
                    __setFunctionName(_classThis, "IframeDir");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        IframeDir = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return IframeDir = _classThis;
                })();
                let IframeComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            imports: [IframeDir],
                            selector: 'my-comp',
                            template: '<iframe sandbox dir></iframe>',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var IframeComp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "IframeComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        IframeComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return IframeComp = _classThis;
                })();
                expectIframeToBeCreated(IframeComp, { src: TEST_IFRAME_URL });
            });
            it('should error when a directive sets a security-sensitive attribute ' +
                "as an attribute binding (checking that it's case-insensitive)", () => {
                let IframeDir = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[dir]',
                            host: {
                                '[attr.SANDBOX]': "''",
                            },
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var IframeDir = _classThis = class {
                    };
                    __setFunctionName(_classThis, "IframeDir");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        IframeDir = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return IframeDir = _classThis;
                })();
                let IframeComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            imports: [IframeDir],
                            selector: 'my-comp',
                            template: `<IFRAME dir src="${TEST_IFRAME_URL}"></IFRAME>`,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var IframeComp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "IframeComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        IframeComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return IframeComp = _classThis;
                })();
                expectIframeCreationToFail(IframeComp);
            });
            it('should work when a directive sets an `src` and ' +
                'there was a security-sensitive attribute set in a template' +
                '(directive attribute before `sandbox`)', () => {
                let IframeDir = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[dir]',
                            host: {
                                'src': TEST_IFRAME_URL,
                            },
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var IframeDir = _classThis = class {
                    };
                    __setFunctionName(_classThis, "IframeDir");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        IframeDir = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return IframeDir = _classThis;
                })();
                let IframeComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            imports: [IframeDir],
                            selector: 'my-comp',
                            template: '<iframe dir sandbox></iframe>',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var IframeComp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "IframeComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        IframeComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return IframeComp = _classThis;
                })();
                expectIframeToBeCreated(IframeComp, { src: TEST_IFRAME_URL });
            });
            it('should work when a directive sets a security-sensitive attribute and ' +
                'there was an `src` attribute set in a template' +
                '(directive attribute after `src`)', () => {
                let IframeDir = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[dir]',
                            host: {
                                'sandbox': '',
                            },
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var IframeDir = _classThis = class {
                    };
                    __setFunctionName(_classThis, "IframeDir");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        IframeDir = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return IframeDir = _classThis;
                })();
                let IframeComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            imports: [IframeDir],
                            selector: 'my-comp',
                            template: `<iframe src="${TEST_IFRAME_URL}" dir></iframe>`,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var IframeComp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "IframeComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        IframeComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return IframeComp = _classThis;
                })();
                expectIframeToBeCreated(IframeComp, { src: TEST_IFRAME_URL });
            });
            it('should work when a security-sensitive attribute is set as a static attribute', () => {
                let IframeComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `
            <iframe referrerPolicy="no-referrer" src="${TEST_IFRAME_URL}"></iframe>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var IframeComp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "IframeComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        IframeComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return IframeComp = _classThis;
                })();
                expectIframeToBeCreated(IframeComp, {
                    src: TEST_IFRAME_URL,
                    referrerPolicy: 'no-referrer',
                });
            });
            it('should error when a security-sensitive attribute is set ' +
                'as a property binding and an <iframe> is wrapped into another element', () => {
                let IframeComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `
                <section>
                  <iframe
                    src="${TEST_IFRAME_URL}"
                    [referrerPolicy]="'no-referrer'"
                  ></iframe>
                </section>`,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var IframeComp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "IframeComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        IframeComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return IframeComp = _classThis;
                })();
                expectIframeCreationToFail(IframeComp);
            });
            it('should work when a directive sets a security-sensitive attribute and ' +
                'there was an `src` attribute set in a template' +
                '(directive attribute before `src`)', () => {
                let IframeDir = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[dir]',
                            host: {
                                'sandbox': '',
                            },
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var IframeDir = _classThis = class {
                    };
                    __setFunctionName(_classThis, "IframeDir");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        IframeDir = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return IframeDir = _classThis;
                })();
                let IframeComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            imports: [IframeDir],
                            selector: 'my-comp',
                            template: `<iframe dir src="${TEST_IFRAME_URL}"></iframe>`,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var IframeComp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "IframeComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        IframeComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return IframeComp = _classThis;
                })();
                expectIframeToBeCreated(IframeComp, { src: TEST_IFRAME_URL });
            });
            it('should work when a directive that sets a security-sensitive attribute goes ' +
                'before the directive that sets an `src` attribute value', () => {
                let DirThatSetsSrc = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[set-src]',
                            host: {
                                'src': TEST_IFRAME_URL,
                            },
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var DirThatSetsSrc = _classThis = class {
                    };
                    __setFunctionName(_classThis, "DirThatSetsSrc");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DirThatSetsSrc = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DirThatSetsSrc = _classThis;
                })();
                let DirThatSetsSandbox = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[set-sandbox]',
                            host: {
                                'sandbox': '',
                            },
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var DirThatSetsSandbox = _classThis = class {
                    };
                    __setFunctionName(_classThis, "DirThatSetsSandbox");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DirThatSetsSandbox = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DirThatSetsSandbox = _classThis;
                })();
                let IframeComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            imports: [DirThatSetsSandbox, DirThatSetsSrc],
                            selector: 'my-comp',
                            // Important note: even though the `set-sandbox` goes after the `set-src`,
                            // the directive matching order (thus the order of host attributes) is
                            // based on the imports order, so the `sandbox` gets set first and the `src` second.
                            template: '<iframe set-src set-sandbox></iframe>',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var IframeComp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "IframeComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        IframeComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return IframeComp = _classThis;
                })();
                expectIframeToBeCreated(IframeComp, { src: TEST_IFRAME_URL });
            });
            it('should work when a directive that sets a security-sensitive attribute has ' +
                'a host directive that sets an `src` attribute value', () => {
                let DirThatSetsSrc = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[set-src-dir]',
                            host: {
                                'src': TEST_IFRAME_URL,
                            },
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var DirThatSetsSrc = _classThis = class {
                    };
                    __setFunctionName(_classThis, "DirThatSetsSrc");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DirThatSetsSrc = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DirThatSetsSrc = _classThis;
                })();
                let DirThatSetsSandbox = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[dir]',
                            hostDirectives: [DirThatSetsSrc],
                            host: {
                                'sandbox': '',
                            },
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var DirThatSetsSandbox = _classThis = class {
                    };
                    __setFunctionName(_classThis, "DirThatSetsSandbox");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DirThatSetsSandbox = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DirThatSetsSandbox = _classThis;
                })();
                let IframeComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            imports: [DirThatSetsSandbox],
                            selector: 'my-comp',
                            template: '<iframe dir></iframe>',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var IframeComp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "IframeComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        IframeComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return IframeComp = _classThis;
                })();
                expectIframeToBeCreated(IframeComp, { src: TEST_IFRAME_URL });
            });
            it('should work when a directive that sets an `src` has ' +
                'a host directive that sets a security-sensitive attribute value', () => {
                let DirThatSetsSandbox = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[set-sandbox-dir]',
                            host: {
                                'sandbox': '',
                            },
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var DirThatSetsSandbox = _classThis = class {
                    };
                    __setFunctionName(_classThis, "DirThatSetsSandbox");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DirThatSetsSandbox = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DirThatSetsSandbox = _classThis;
                })();
                let DirThatSetsSrc = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[dir]',
                            hostDirectives: [DirThatSetsSandbox],
                            host: {
                                'src': TEST_IFRAME_URL,
                            },
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var DirThatSetsSrc = _classThis = class {
                    };
                    __setFunctionName(_classThis, "DirThatSetsSrc");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DirThatSetsSrc = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DirThatSetsSrc = _classThis;
                })();
                let IframeComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            imports: [DirThatSetsSrc],
                            selector: 'my-comp',
                            template: '<iframe dir></iframe>',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var IframeComp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "IframeComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        IframeComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return IframeComp = _classThis;
                })();
                expectIframeToBeCreated(IframeComp, { src: TEST_IFRAME_URL });
            });
            it('should error when creating a view that contains an <iframe> ' +
                'with security-sensitive attributes set via property bindings', () => {
                let IframeComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `
                <ng-container #container></ng-container>
                <ng-template #template>
                  <iframe src="${TEST_IFRAME_URL}" [sandbox]="''"></iframe>
                </ng-template>
              `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _container_decorators;
                    let _container_initializers = [];
                    let _container_extraInitializers = [];
                    let _template_decorators;
                    let _template_initializers = [];
                    let _template_extraInitializers = [];
                    var IframeComp = _classThis = class {
                        createEmbeddedView() {
                            this.container.createEmbeddedView(this.template);
                        }
                        constructor() {
                            this.container = __runInitializers(this, _container_initializers, void 0);
                            this.template = (__runInitializers(this, _container_extraInitializers), __runInitializers(this, _template_initializers, void 0));
                            __runInitializers(this, _template_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "IframeComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _container_decorators = [(0, core_1.ViewChild)('container', { read: core_1.ViewContainerRef })];
                        _template_decorators = [(0, core_1.ViewChild)('template')];
                        __esDecorate(null, null, _container_decorators, { kind: "field", name: "container", static: false, private: false, access: { has: obj => "container" in obj, get: obj => obj.container, set: (obj, value) => { obj.container = value; } }, metadata: _metadata }, _container_initializers, _container_extraInitializers);
                        __esDecorate(null, null, _template_decorators, { kind: "field", name: "template", static: false, private: false, access: { has: obj => "template" in obj, get: obj => obj.template, set: (obj, value) => { obj.template = value; } }, metadata: _metadata }, _template_initializers, _template_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        IframeComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return IframeComp = _classThis;
                })();
                const fixture = testing_1.TestBed.createComponent(IframeComp);
                fixture.detectChanges();
                expect(() => {
                    fixture.componentInstance.createEmbeddedView();
                    fixture.detectChanges();
                }).toThrowError(getErrorMessageRegexp());
                ensureNoIframePresent(fixture);
            });
            describe('i18n', () => {
                it('should error when a security-sensitive attribute is set as ' +
                    'a property binding on an <iframe> inside i18n block', () => {
                    let IframeComp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'my-comp',
                                template: `
                  <section i18n>
                    <iframe src="${TEST_IFRAME_URL}" [sandbox]="''">
                    </iframe>
                  </section>
                `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var IframeComp = _classThis = class {
                        };
                        __setFunctionName(_classThis, "IframeComp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            IframeComp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return IframeComp = _classThis;
                    })();
                    expectIframeCreationToFail(IframeComp);
                });
                it('should error when a security-sensitive attribute is set as ' +
                    'a property binding on an <iframe> annotated with i18n attribute', () => {
                    let IframeComp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'my-comp',
                                template: `
                  <iframe i18n src="${TEST_IFRAME_URL}" [sandbox]="''">
                  </iframe>
                `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var IframeComp = _classThis = class {
                        };
                        __setFunctionName(_classThis, "IframeComp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            IframeComp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return IframeComp = _classThis;
                    })();
                    expectIframeCreationToFail(IframeComp);
                });
                it('should work when a security-sensitive attributes are marked for translation', () => {
                    let IframeComp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'my-comp',
                                template: `
              <iframe src="${TEST_IFRAME_URL}" i18n-sandbox sandbox="">
              </iframe>
            `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var IframeComp = _classThis = class {
                        };
                        __setFunctionName(_classThis, "IframeComp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            IframeComp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return IframeComp = _classThis;
                    })();
                    expectIframeToBeCreated(IframeComp, { src: TEST_IFRAME_URL });
                });
            });
        });
    });
});
