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
const core_1 = require("../src/core");
const testing_1 = require("../testing");
const browser_util_1 = require("@angular/platform-browser/testing/src/browser_util");
const matchers_1 = require("@angular/platform-browser/testing/src/matchers");
let SimpleComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'simple-comp',
            template: `<span>Original {{simpleBinding}}</span>`,
            standalone: false,
        }), (0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SimpleComp = _classThis = class {
        constructor() {
            this.simpleBinding = 'Simple';
        }
    };
    __setFunctionName(_classThis, "SimpleComp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SimpleComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SimpleComp = _classThis;
})();
let DeferredComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'deferred-comp',
            template: `<div>Deferred Component</div>`,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DeferredComp = _classThis = class {
    };
    __setFunctionName(_classThis, "DeferredComp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DeferredComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DeferredComp = _classThis;
})();
let SecondDeferredComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'second-deferred-comp',
            template: `<div>More Deferred Component</div>`,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SecondDeferredComp = _classThis = class {
    };
    __setFunctionName(_classThis, "SecondDeferredComp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SecondDeferredComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SecondDeferredComp = _classThis;
})();
let MyIfComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'my-if-comp',
            template: `MyIf(<span *ngIf="showMore">More</span>)`,
            standalone: false,
        }), (0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MyIfComp = _classThis = class {
        constructor() {
            this.showMore = false;
        }
    };
    __setFunctionName(_classThis, "MyIfComp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MyIfComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MyIfComp = _classThis;
})();
let AutoDetectComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'autodetect-comp',
            template: `<span (click)='click()'>{{text}}</span>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AutoDetectComp = _classThis = class {
        constructor() {
            this.text = '1';
        }
        click() {
            this.text += '1';
        }
    };
    __setFunctionName(_classThis, "AutoDetectComp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AutoDetectComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AutoDetectComp = _classThis;
})();
let AsyncComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'async-comp',
            template: `<span (click)='click()'>{{text}}</span>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AsyncComp = _classThis = class {
        constructor() {
            this.text = '1';
        }
        click() {
            Promise.resolve(null).then((_) => {
                this.text += '1';
            });
        }
    };
    __setFunctionName(_classThis, "AsyncComp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AsyncComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AsyncComp = _classThis;
})();
let AsyncChildComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'async-child-comp',
            template: '<span>{{localText}}</span>',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _set_text_decorators;
    var AsyncChildComp = _classThis = class {
        constructor() {
            this.localText = (__runInitializers(this, _instanceExtraInitializers), '');
        }
        set text(value) {
            Promise.resolve(null).then((_) => {
                this.localText = value;
            });
        }
    };
    __setFunctionName(_classThis, "AsyncChildComp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _set_text_decorators = [(0, core_1.Input)()];
        __esDecorate(_classThis, null, _set_text_decorators, { kind: "setter", name: "text", static: false, private: false, access: { has: obj => "text" in obj, set: (obj, value) => { obj.text = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AsyncChildComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AsyncChildComp = _classThis;
})();
let AsyncChangeComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'async-change-comp',
            template: `<async-child-comp (click)='click()' [text]="text"></async-child-comp>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AsyncChangeComp = _classThis = class {
        constructor() {
            this.text = '1';
        }
        click() {
            this.text += '1';
        }
    };
    __setFunctionName(_classThis, "AsyncChangeComp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AsyncChangeComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AsyncChangeComp = _classThis;
})();
let AsyncTimeoutComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'async-timeout-comp',
            template: `<span (click)='click()'>{{text}}</span>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AsyncTimeoutComp = _classThis = class {
        constructor() {
            this.text = '1';
        }
        click() {
            setTimeout(() => {
                this.text += '1';
            }, 10);
        }
    };
    __setFunctionName(_classThis, "AsyncTimeoutComp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AsyncTimeoutComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AsyncTimeoutComp = _classThis;
})();
let NestedAsyncTimeoutComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'nested-async-timeout-comp',
            template: `<span (click)='click()'>{{text}}</span>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NestedAsyncTimeoutComp = _classThis = class {
        constructor() {
            this.text = '1';
        }
        click() {
            setTimeout(() => {
                setTimeout(() => {
                    this.text += '1';
                }, 10);
            }, 10);
        }
    };
    __setFunctionName(_classThis, "NestedAsyncTimeoutComp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NestedAsyncTimeoutComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NestedAsyncTimeoutComp = _classThis;
})();
describe('ComponentFixture', () => {
    beforeEach((0, testing_1.waitForAsync)(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                AutoDetectComp,
                AsyncComp,
                AsyncTimeoutComp,
                NestedAsyncTimeoutComp,
                AsyncChangeComp,
                MyIfComp,
                SimpleComp,
                AsyncChildComp,
            ],
        });
    }));
    it('should auto detect changes if autoDetectChanges is called', () => {
        const componentFixture = testing_1.TestBed.createComponent(AutoDetectComp);
        (0, matchers_1.expect)(componentFixture.ngZone).not.toBeNull();
        componentFixture.autoDetectChanges();
        (0, matchers_1.expect)(componentFixture.nativeElement).toHaveText('1');
        const element = componentFixture.debugElement.children[0];
        (0, browser_util_1.dispatchEvent)(element.nativeElement, 'click');
        (0, matchers_1.expect)(componentFixture.nativeElement).toHaveText('11');
    });
    it('should auto detect changes if ComponentFixtureAutoDetect is provided as true', (0, testing_1.withModule)({ providers: [{ provide: testing_1.ComponentFixtureAutoDetect, useValue: true }] }, () => {
        const componentFixture = testing_1.TestBed.createComponent(AutoDetectComp);
        (0, matchers_1.expect)(componentFixture.nativeElement).toHaveText('1');
        const element = componentFixture.debugElement.children[0];
        (0, browser_util_1.dispatchEvent)(element.nativeElement, 'click');
        (0, matchers_1.expect)(componentFixture.nativeElement).toHaveText('11');
    }));
    it('should signal through whenStable when the fixture is stable (autoDetectChanges)', (0, testing_1.waitForAsync)(() => {
        const componentFixture = testing_1.TestBed.createComponent(AsyncComp);
        componentFixture.autoDetectChanges();
        (0, matchers_1.expect)(componentFixture.nativeElement).toHaveText('1');
        const element = componentFixture.debugElement.children[0];
        (0, browser_util_1.dispatchEvent)(element.nativeElement, 'click');
        (0, matchers_1.expect)(componentFixture.nativeElement).toHaveText('1');
        // Component is updated asynchronously. Wait for the fixture to become stable
        // before checking for new value.
        (0, matchers_1.expect)(componentFixture.isStable()).toBe(false);
        componentFixture.whenStable().then((waited) => {
            (0, matchers_1.expect)(waited).toBe(true);
            (0, matchers_1.expect)(componentFixture.nativeElement).toHaveText('11');
        });
    }));
    it('should signal through isStable when the fixture is stable (no autoDetectChanges)', (0, testing_1.waitForAsync)(() => {
        const componentFixture = testing_1.TestBed.createComponent(AsyncComp);
        componentFixture.detectChanges();
        (0, matchers_1.expect)(componentFixture.nativeElement).toHaveText('1');
        const element = componentFixture.debugElement.children[0];
        (0, browser_util_1.dispatchEvent)(element.nativeElement, 'click');
        (0, matchers_1.expect)(componentFixture.nativeElement).toHaveText('1');
        // Component is updated asynchronously. Wait for the fixture to become stable
        // before checking.
        componentFixture.whenStable().then((waited) => {
            (0, matchers_1.expect)(waited).toBe(true);
            componentFixture.detectChanges();
            (0, matchers_1.expect)(componentFixture.nativeElement).toHaveText('11');
        });
    }));
    it('should wait for macroTask(setTimeout) while checking for whenStable ' + '(autoDetectChanges)', (0, testing_1.waitForAsync)(() => {
        const componentFixture = testing_1.TestBed.createComponent(AsyncTimeoutComp);
        componentFixture.autoDetectChanges();
        (0, matchers_1.expect)(componentFixture.nativeElement).toHaveText('1');
        const element = componentFixture.debugElement.children[0];
        (0, browser_util_1.dispatchEvent)(element.nativeElement, 'click');
        (0, matchers_1.expect)(componentFixture.nativeElement).toHaveText('1');
        // Component is updated asynchronously. Wait for the fixture to become
        // stable before checking for new value.
        (0, matchers_1.expect)(componentFixture.isStable()).toBe(false);
        componentFixture.whenStable().then((waited) => {
            (0, matchers_1.expect)(waited).toBe(true);
            (0, matchers_1.expect)(componentFixture.nativeElement).toHaveText('11');
        });
    }));
    it('should wait for macroTask(setTimeout) while checking for whenStable ' +
        '(no autoDetectChanges)', (0, testing_1.waitForAsync)(() => {
        const componentFixture = testing_1.TestBed.createComponent(AsyncTimeoutComp);
        componentFixture.detectChanges();
        (0, matchers_1.expect)(componentFixture.nativeElement).toHaveText('1');
        const element = componentFixture.debugElement.children[0];
        (0, browser_util_1.dispatchEvent)(element.nativeElement, 'click');
        (0, matchers_1.expect)(componentFixture.nativeElement).toHaveText('1');
        // Component is updated asynchronously. Wait for the fixture to become
        // stable before checking for new value.
        (0, matchers_1.expect)(componentFixture.isStable()).toBe(false);
        componentFixture.whenStable().then((waited) => {
            (0, matchers_1.expect)(waited).toBe(true);
            componentFixture.detectChanges();
            (0, matchers_1.expect)(componentFixture.nativeElement).toHaveText('11');
        });
    }));
    it('should wait for nested macroTasks(setTimeout) while checking for whenStable ' +
        '(autoDetectChanges)', (0, testing_1.waitForAsync)(() => {
        const componentFixture = testing_1.TestBed.createComponent(NestedAsyncTimeoutComp);
        componentFixture.autoDetectChanges();
        (0, matchers_1.expect)(componentFixture.nativeElement).toHaveText('1');
        const element = componentFixture.debugElement.children[0];
        (0, browser_util_1.dispatchEvent)(element.nativeElement, 'click');
        (0, matchers_1.expect)(componentFixture.nativeElement).toHaveText('1');
        // Component is updated asynchronously. Wait for the fixture to become
        // stable before checking for new value.
        (0, matchers_1.expect)(componentFixture.isStable()).toBe(false);
        componentFixture.whenStable().then((waited) => {
            (0, matchers_1.expect)(waited).toBe(true);
            (0, matchers_1.expect)(componentFixture.nativeElement).toHaveText('11');
        });
    }));
    it('should wait for nested macroTasks(setTimeout) while checking for whenStable ' +
        '(no autoDetectChanges)', (0, testing_1.waitForAsync)(() => {
        const componentFixture = testing_1.TestBed.createComponent(NestedAsyncTimeoutComp);
        componentFixture.detectChanges();
        (0, matchers_1.expect)(componentFixture.nativeElement).toHaveText('1');
        const element = componentFixture.debugElement.children[0];
        (0, browser_util_1.dispatchEvent)(element.nativeElement, 'click');
        (0, matchers_1.expect)(componentFixture.nativeElement).toHaveText('1');
        // Component is updated asynchronously. Wait for the fixture to become
        // stable before checking for new value.
        (0, matchers_1.expect)(componentFixture.isStable()).toBe(false);
        componentFixture.whenStable().then((waited) => {
            (0, matchers_1.expect)(waited).toBe(true);
            componentFixture.detectChanges();
            (0, matchers_1.expect)(componentFixture.nativeElement).toHaveText('11');
        });
    }));
    it('should stabilize after async task in change detection (autoDetectChanges)', (0, testing_1.waitForAsync)(() => {
        const componentFixture = testing_1.TestBed.createComponent(AsyncChangeComp);
        componentFixture.autoDetectChanges();
        componentFixture.whenStable().then((_) => {
            (0, matchers_1.expect)(componentFixture.nativeElement).toHaveText('1');
            const element = componentFixture.debugElement.children[0];
            (0, browser_util_1.dispatchEvent)(element.nativeElement, 'click');
            componentFixture.whenStable().then((_) => {
                (0, matchers_1.expect)(componentFixture.nativeElement).toHaveText('11');
            });
        });
    }));
    it('should stabilize after async task in change detection(no autoDetectChanges)', (0, testing_1.waitForAsync)(() => {
        const componentFixture = testing_1.TestBed.createComponent(AsyncChangeComp);
        componentFixture.detectChanges();
        componentFixture.whenStable().then((_) => {
            // Run detectChanges again so that stabilized value is reflected in the
            // DOM.
            componentFixture.detectChanges();
            (0, matchers_1.expect)(componentFixture.nativeElement).toHaveText('1');
            const element = componentFixture.debugElement.children[0];
            (0, browser_util_1.dispatchEvent)(element.nativeElement, 'click');
            componentFixture.detectChanges();
            componentFixture.whenStable().then((_) => {
                // Run detectChanges again so that stabilized value is reflected in
                // the DOM.
                componentFixture.detectChanges();
                (0, matchers_1.expect)(componentFixture.nativeElement).toHaveText('11');
            });
        });
    }));
    it('throws errors that happen during detectChanges', () => {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                ngOnInit() {
                    throw new Error();
                }
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
        const fixture = testing_1.TestBed.createComponent(App);
        (0, matchers_1.expect)(() => fixture.detectChanges()).toThrow();
    });
    it('should not duplicate errors when used with fake async', (0, testing_1.fakeAsync)(() => {
        let Throwing = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<button (click)="doThrow()">a</button>',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Throwing = _classThis = class {
                doThrow() {
                    throw new Error('thrown');
                }
            };
            __setFunctionName(_classThis, "Throwing");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Throwing = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Throwing = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            providers: [
                {
                    provide: core_1.ErrorHandler,
                    useClass: class {
                        handleError(e) {
                            throw e;
                        }
                    },
                },
            ],
        });
        const fix = testing_1.TestBed.createComponent(Throwing);
        try {
            fix.nativeElement.querySelector('button').click();
            (0, testing_1.tick)();
            fail('should have thrown');
        }
        catch (e) {
            (0, matchers_1.expect)(e.message).toMatch('thrown');
        }
    }));
    describe('errors during ApplicationRef.tick', () => {
        let ThrowingThing = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ThrowingThing = _classThis = class {
                ngOnInit() {
                    throw new Error();
                }
            };
            __setFunctionName(_classThis, "ThrowingThing");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ThrowingThing = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ThrowingThing = _classThis;
        })();
        let Blank = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Blank = _classThis = class {
            };
            __setFunctionName(_classThis, "Blank");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Blank = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Blank = _classThis;
        })();
        it('rejects whenStable promise when errors happen during appRef.tick', () => __awaiter(void 0, void 0, void 0, function* () {
            const fixture = testing_1.TestBed.createComponent(Blank);
            const throwingThing = (0, core_1.createComponent)(ThrowingThing, {
                environmentInjector: testing_1.TestBed.inject(core_1.EnvironmentInjector),
            });
            testing_1.TestBed.inject(core_1.ApplicationRef).attachView(throwingThing.hostView);
            yield expectAsync(fixture.whenStable()).toBeRejected();
        }));
        it('can opt-out of rethrowing application errors and rejecting whenStable promises', () => __awaiter(void 0, void 0, void 0, function* () {
            testing_1.TestBed.configureTestingModule({ rethrowApplicationErrors: false });
            const fixture = testing_1.TestBed.createComponent(Blank);
            const throwingThing = (0, core_1.createComponent)(ThrowingThing, {
                environmentInjector: testing_1.TestBed.inject(core_1.EnvironmentInjector),
            });
            testing_1.TestBed.inject(core_1.ApplicationRef).attachView(throwingThing.hostView);
            yield expectAsync(fixture.whenStable()).toBeResolved();
        }));
    });
    describe('defer', () => {
        it('should return all defer blocks in the component', () => __awaiter(void 0, void 0, void 0, function* () {
            let DeferComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'defer-comp',
                        imports: [DeferredComp, SecondDeferredComp],
                        template: `<div>
            @defer (on immediate) {
              <DeferredComp />
            }
            @defer (on idle) {
              <SecondDeferredComp />
            }
          </div>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DeferComp = _classThis = class {
                };
                __setFunctionName(_classThis, "DeferComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DeferComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DeferComp = _classThis;
            })();
            const componentFixture = testing_1.TestBed.createComponent(DeferComp);
            const deferBlocks = yield componentFixture.getDeferBlocks();
            (0, matchers_1.expect)(deferBlocks.length).toBe(2);
        }));
    });
    describe('No NgZone', () => {
        beforeEach(() => {
            testing_1.TestBed.configureTestingModule({
                providers: [{ provide: testing_1.ComponentFixtureNoNgZone, useValue: true }],
            });
        });
        it('calling autoDetectChanges raises an error', () => {
            const componentFixture = testing_1.TestBed.createComponent(SimpleComp);
            (0, matchers_1.expect)(() => {
                componentFixture.autoDetectChanges();
            }).toThrowError(/Cannot call autoDetectChanges when ComponentFixtureNoNgZone is set/);
        });
        it('should instantiate a component with valid DOM', (0, testing_1.waitForAsync)(() => {
            const componentFixture = testing_1.TestBed.createComponent(SimpleComp);
            (0, matchers_1.expect)(componentFixture.ngZone).toBeNull();
            componentFixture.detectChanges();
            (0, matchers_1.expect)(componentFixture.nativeElement).toHaveText('Original Simple');
        }));
        it('should allow changing members of the component', (0, testing_1.waitForAsync)(() => {
            const componentFixture = testing_1.TestBed.createComponent(MyIfComp);
            componentFixture.detectChanges();
            (0, matchers_1.expect)(componentFixture.nativeElement).toHaveText('MyIf()');
            componentFixture.componentInstance.showMore = true;
            componentFixture.detectChanges();
            (0, matchers_1.expect)(componentFixture.nativeElement).toHaveText('MyIf(More)');
        }));
        it('throws errors that happen during detectChanges', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    ngOnInit() {
                        throw new Error();
                    }
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
            const fixture = testing_1.TestBed.createComponent(App);
            (0, matchers_1.expect)(() => fixture.detectChanges()).toThrow();
        });
    });
    it('reports errors from autoDetect change detection to error handler', () => {
        let throwError = false;
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                ngDoCheck() {
                    if (throwError) {
                        throw new Error();
                    }
                }
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
        const fixture = testing_1.TestBed.createComponent(TestComponent);
        fixture.autoDetectChanges();
        const errorHandler = testing_1.TestBed.inject(core_1.ErrorHandler);
        const spy = spyOn(errorHandler, 'handleError').and.callThrough();
        throwError = true;
        testing_1.TestBed.inject(core_1.NgZone).run(() => { });
        (0, matchers_1.expect)(spy).toHaveBeenCalled();
    });
    it('reports errors from checkNoChanges in autoDetect to error handler', () => {
        let throwError = false;
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '{{thing}}',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor() {
                    this.thing = 'initial';
                }
                ngAfterViewChecked() {
                    if (throwError) {
                        this.thing = 'new';
                    }
                }
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
        const fixture = testing_1.TestBed.createComponent(TestComponent);
        fixture.autoDetectChanges();
        const errorHandler = testing_1.TestBed.inject(core_1.ErrorHandler);
        const spy = spyOn(errorHandler, 'handleError').and.callThrough();
        throwError = true;
        testing_1.TestBed.inject(core_1.NgZone).run(() => { });
        (0, matchers_1.expect)(spy).toHaveBeenCalled();
    });
});
describe('ComponentFixture with zoneless', () => {
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            providers: [
                (0, core_1.provideZonelessChangeDetection)(),
                { provide: core_1.ErrorHandler, useValue: { handleError: () => { } } },
            ],
        });
    });
    it('will not refresh CheckAlways views when detectChanges is called if not marked dirty', () => {
        let CheckAlwaysCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({ template: '{{signalThing()}}|{{regularThing}}' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var CheckAlwaysCmp = _classThis = class {
                constructor() {
                    this.regularThing = 'initial';
                    this.signalThing = (0, core_1.signal)('initial');
                }
            };
            __setFunctionName(_classThis, "CheckAlwaysCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                CheckAlwaysCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return CheckAlwaysCmp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(CheckAlwaysCmp);
        // components are created dirty
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.innerText).toEqual('initial|initial');
        fixture.componentInstance.regularThing = 'new';
        // Expression changed after checked
        (0, matchers_1.expect)(() => fixture.detectChanges()).toThrow();
        (0, matchers_1.expect)(fixture.nativeElement.innerText).toEqual('initial|initial');
        fixture.componentInstance.signalThing.set('new');
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.innerText).toEqual('new|new');
    });
    it('throws errors that happen during detectChanges', () => {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                ngOnInit() {
                    throw new Error();
                }
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
        const fixture = testing_1.TestBed.createComponent(App);
        (0, matchers_1.expect)(() => fixture.detectChanges()).toThrow();
    });
    it('rejects whenStable promise when errors happen during detectChanges', () => __awaiter(void 0, void 0, void 0, function* () {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                ngOnInit() {
                    throw new Error();
                }
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
        const fixture = testing_1.TestBed.createComponent(App);
        yield expectAsync(fixture.whenStable()).toBeRejected();
    }));
    it('can disable checkNoChanges', () => {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '{{thing}}',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.thing = 1;
                }
                ngAfterViewChecked() {
                    ++this.thing;
                }
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
        const fixture = testing_1.TestBed.createComponent(App);
        (0, matchers_1.expect)(() => fixture.detectChanges(false /*checkNoChanges*/)).not.toThrow();
        // still throws if checkNoChanges is not disabled
        (0, matchers_1.expect)(() => fixture.detectChanges()).toThrowError(/ExpressionChanged/);
    });
    it('runs change detection when autoDetect is false', () => {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '{{thing()}}',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.thing = (0, core_1.signal)(1);
                }
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
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.autoDetectChanges(false);
        fixture.componentInstance.thing.set(2);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.innerText).toBe('2');
    });
});
