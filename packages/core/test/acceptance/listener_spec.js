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
const platform_browser_1 = require("@angular/platform-browser");
describe('event listeners', () => {
    describe('even handling statements', () => {
        it('should call function on event emit', () => {
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<button (click)="onClick()">Click me</button>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                    constructor() {
                        this.counter = 0;
                    }
                    onClick() {
                        this.counter++;
                    }
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            expect(fixture.componentInstance.counter).toEqual(0);
            const button = fixture.nativeElement.querySelector('button');
            button.click();
            expect(fixture.componentInstance.counter).toEqual(1);
        });
        it('should call function chain on event emit', () => {
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<button (click)="onClick(); onClick2(); "> Click me </button>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                    constructor() {
                        this.counter = 0;
                        this.counter2 = 0;
                    }
                    onClick() {
                        this.counter++;
                    }
                    onClick2() {
                        this.counter2++;
                    }
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            expect(fixture.componentInstance.counter).toEqual(0);
            expect(fixture.componentInstance.counter2).toEqual(0);
            const button = fixture.nativeElement.querySelector('button');
            button.click();
            expect(fixture.componentInstance.counter).toEqual(1);
            expect(fixture.componentInstance.counter2).toEqual(1);
        });
        it('should evaluate expression on event emit', () => {
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<button (click)="showing=!showing"> Click me </button>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                    constructor() {
                        this.showing = false;
                    }
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            expect(fixture.componentInstance.showing).toBeFalse();
            const button = fixture.nativeElement.querySelector('button');
            button.click();
            expect(fixture.componentInstance.showing).toBeTrue();
            button.click();
            expect(fixture.componentInstance.showing).toBeFalse();
        });
        it('should support listeners with specified set of args', () => {
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<button (click)="onClick(data.a, data.b)"> Click me </button>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                    constructor() {
                        this.counter = 0;
                        this.data = { a: 1, b: 2 };
                    }
                    onClick(a, b) {
                        this.counter += a + b;
                    }
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            expect(fixture.componentInstance.counter).toBe(0);
            const button = fixture.nativeElement.querySelector('button');
            button.click();
            expect(fixture.componentInstance.counter).toBe(3);
            button.click();
            expect(fixture.componentInstance.counter).toBe(6);
        });
        it('should be able to access a property called $event using `this`', () => {
            let eventVariable;
            let eventObject;
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <button (click)="clicked(this.$event, $event)">Click me!</button>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                    constructor() {
                        this.$event = 10;
                    }
                    clicked(value, event) {
                        eventVariable = value;
                        eventObject = event;
                    }
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp] });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            fixture.nativeElement.querySelector('button').click();
            fixture.detectChanges();
            expect(eventVariable).toBe(10);
            expect(eventObject === null || eventObject === void 0 ? void 0 : eventObject.type).toBe('click');
        });
        it('should be able to use a keyed write on `this` from a listener inside an ng-template', () => {
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <ng-template #template>
            <button (click)="this['mes' + 'sage'] = 'hello'">Click me</button>
          </ng-template>

          <ng-container [ngTemplateOutlet]="template"></ng-container>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                    constructor() {
                        this.message = '';
                    }
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp], imports: [common_1.CommonModule] });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            const button = fixture.nativeElement.querySelector('button');
            button.click();
            fixture.detectChanges();
            expect(fixture.componentInstance.message).toBe('hello');
        });
        it('should reference the correct context object if it is swapped out', () => {
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <ng-template let-obj #template>
            <button (click)="obj.value = obj.value + '!'">Change</button>
          </ng-template>

          <ng-container *ngTemplateOutlet="template; context: {$implicit: current}"></ng-container>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                    constructor() {
                        this.one = { value: 'one' };
                        this.two = { value: 'two' };
                        this.current = this.one;
                    }
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp], imports: [common_1.CommonModule] });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            const instance = fixture.componentInstance;
            fixture.detectChanges();
            const button = fixture.nativeElement.querySelector('button');
            expect(instance.one.value).toBe('one');
            expect(instance.two.value).toBe('two');
            button.click();
            fixture.detectChanges();
            expect(instance.one.value).toBe('one!');
            expect(instance.two.value).toBe('two');
            instance.current = instance.two;
            fixture.detectChanges();
            button.click();
            fixture.detectChanges();
            expect(instance.one.value).toBe('one!');
            expect(instance.two.value).toBe('two!');
        });
        it('should support local refs in listeners', () => {
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: ``,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [MyComp],
                        template: `
          <my-comp #comp></my-comp>
          <button (click)="onClick(comp)"></button>
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.comp = null;
                    }
                    onClick(comp) {
                        this.comp = comp;
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
            fixture.detectChanges();
            expect(fixture.componentInstance.comp).toBeNull();
            const button = fixture.nativeElement.querySelector('button');
            button.click();
            expect(fixture.componentInstance.comp).toBeInstanceOf(MyComp);
        });
    });
    describe('prevent default', () => {
        it('should call prevent default when a handler returns false', () => {
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<button (click)="onClick($event)">Click</button>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                    onClick(e) {
                        this.event = e;
                        // stub preventDefault() to check whether it's called
                        Object.defineProperty(this.event, 'preventDefault', {
                            value: jasmine.createSpy('preventDefault'),
                            writable: true,
                        });
                        return this.handlerReturnValue;
                    }
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            const myComp = fixture.componentInstance;
            const button = fixture.nativeElement.querySelector('button');
            myComp.handlerReturnValue = undefined;
            button.click();
            expect(myComp.event.preventDefault).not.toHaveBeenCalled();
            myComp.handlerReturnValue = true;
            button.click();
            expect(myComp.event.preventDefault).not.toHaveBeenCalled();
            // Returning `false` is what causes the renderer to call `event.preventDefault`.
            myComp.handlerReturnValue = false;
            button.click();
            expect(myComp.event.preventDefault).toHaveBeenCalled();
        });
    });
    describe('coalescing', () => {
        let WithClicksCmpt = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'with-clicks-cmpt',
                    template: `<button likes-clicks (click)="count()" md-button>Click me!</button>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var WithClicksCmpt = _classThis = class {
                constructor() {
                    this.counter = 0;
                }
                count() {
                    this.counter++;
                }
            };
            __setFunctionName(_classThis, "WithClicksCmpt");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                WithClicksCmpt = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return WithClicksCmpt = _classThis;
        })();
        let MdButton = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[md-button]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _instanceExtraInitializers = [];
            let _count_decorators;
            var MdButton = _classThis = class {
                constructor() {
                    this.counter = (__runInitializers(this, _instanceExtraInitializers), 0);
                }
                count() {
                    this.counter++;
                }
            };
            __setFunctionName(_classThis, "MdButton");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _count_decorators = [(0, core_1.HostListener)('click')];
                __esDecorate(_classThis, null, _count_decorators, { kind: "method", name: "count", static: false, private: false, access: { has: obj => "count" in obj, get: obj => obj.count }, metadata: _metadata }, null, _instanceExtraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MdButton = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MdButton = _classThis;
        })();
        let LikesClicks = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[likes-clicks]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _instanceExtraInitializers = [];
            let _count_decorators;
            var LikesClicks = _classThis = class {
                constructor() {
                    this.counter = (__runInitializers(this, _instanceExtraInitializers), 0);
                }
                count() {
                    this.counter++;
                }
            };
            __setFunctionName(_classThis, "LikesClicks");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _count_decorators = [(0, core_1.HostListener)('click')];
                __esDecorate(_classThis, null, _count_decorators, { kind: "method", name: "count", static: false, private: false, access: { has: obj => "count" in obj, get: obj => obj.count }, metadata: _metadata }, null, _instanceExtraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                LikesClicks = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return LikesClicks = _classThis;
        })();
        let ReturnsFalse = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[returns-false]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _instanceExtraInitializers = [];
            let _count_decorators;
            var ReturnsFalse = _classThis = class {
                constructor() {
                    this.counter = (__runInitializers(this, _instanceExtraInitializers), 0);
                    this.handlerShouldReturn = undefined;
                }
                count(e) {
                    this.counter++;
                    this.event = e;
                    // stub preventDefault() to check whether it's called
                    Object.defineProperty(this.event, 'preventDefault', {
                        value: jasmine.createSpy('preventDefault'),
                        writable: true,
                    });
                    return this.handlerShouldReturn;
                }
            };
            __setFunctionName(_classThis, "ReturnsFalse");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _count_decorators = [(0, core_1.HostListener)('click', ['$event'])];
                __esDecorate(_classThis, null, _count_decorators, { kind: "method", name: "count", static: false, private: false, access: { has: obj => "count" in obj, get: obj => obj.count }, metadata: _metadata }, null, _instanceExtraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ReturnsFalse = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ReturnsFalse = _classThis;
        })();
        it('should coalesce multiple event listeners for the same event on the same element', () => {
            let TestCmpt = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-cmpt',
                        template: `<with-clicks-cmpt></with-clicks-cmpt><with-clicks-cmpt></with-clicks-cmpt>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestCmpt = _classThis = class {
                };
                __setFunctionName(_classThis, "TestCmpt");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmpt = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmpt = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [TestCmpt, WithClicksCmpt, LikesClicks, MdButton],
            });
            const fixture = testing_1.TestBed.createComponent(TestCmpt);
            fixture.detectChanges();
            const buttonDebugEls = fixture.debugElement.queryAll(platform_browser_1.By.css('button'));
            const withClicksEls = fixture.debugElement.queryAll(platform_browser_1.By.css('with-clicks-cmpt'));
            buttonDebugEls[0].nativeElement.click();
            expect(withClicksEls[0].injector.get(WithClicksCmpt).counter).toBe(1);
            expect(buttonDebugEls[0].injector.get(LikesClicks).counter).toBe(1);
            expect(buttonDebugEls[0].injector.get(MdButton).counter).toBe(1);
            expect(withClicksEls[1].injector.get(WithClicksCmpt).counter).toBe(0);
            expect(buttonDebugEls[1].injector.get(LikesClicks).counter).toBe(0);
            expect(buttonDebugEls[1].injector.get(MdButton).counter).toBe(0);
            buttonDebugEls[1].nativeElement.click();
            expect(withClicksEls[0].injector.get(WithClicksCmpt).counter).toBe(1);
            expect(buttonDebugEls[0].injector.get(LikesClicks).counter).toBe(1);
            expect(buttonDebugEls[0].injector.get(MdButton).counter).toBe(1);
            expect(withClicksEls[1].injector.get(WithClicksCmpt).counter).toBe(1);
            expect(buttonDebugEls[1].injector.get(LikesClicks).counter).toBe(1);
            expect(buttonDebugEls[1].injector.get(MdButton).counter).toBe(1);
        });
        it('should coalesce multiple event listeners in presence of queries', () => {
            let TestCmpt = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-cmpt',
                        template: `<button likes-clicks (click)="counter = counter+1">Click me!</button>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _nothing_decorators;
                let _nothing_initializers = [];
                let _nothing_extraInitializers = [];
                var TestCmpt = _classThis = class {
                    constructor() {
                        this.counter = 0;
                        this.nothing = __runInitializers(this, _nothing_initializers, void 0);
                        __runInitializers(this, _nothing_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmpt");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _nothing_decorators = [(0, core_1.ViewChildren)('nothing')];
                    __esDecorate(null, null, _nothing_decorators, { kind: "field", name: "nothing", static: false, private: false, access: { has: obj => "nothing" in obj, get: obj => obj.nothing, set: (obj, value) => { obj.nothing = value; } }, metadata: _metadata }, _nothing_initializers, _nothing_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmpt = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmpt = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [TestCmpt, LikesClicks] });
            const fixture = testing_1.TestBed.createComponent(TestCmpt);
            fixture.detectChanges();
            const buttonDebugEl = fixture.debugElement.query(platform_browser_1.By.css('button'));
            buttonDebugEl.nativeElement.click();
            expect(buttonDebugEl.injector.get(LikesClicks).counter).toBe(1);
            expect(fixture.componentInstance.counter).toBe(1);
        });
        it('should try to execute remaining coalesced listeners if one of the listeners throws', () => {
            let ThrowsOnClicks = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[throws-on-clicks]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _instanceExtraInitializers = [];
                let _dontCount_decorators;
                var ThrowsOnClicks = _classThis = class {
                    dontCount() {
                        throw new Error("I was clicked and I don't like it!");
                    }
                    constructor() {
                        __runInitializers(this, _instanceExtraInitializers);
                    }
                };
                __setFunctionName(_classThis, "ThrowsOnClicks");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _dontCount_decorators = [(0, core_1.HostListener)('click')];
                    __esDecorate(_classThis, null, _dontCount_decorators, { kind: "method", name: "dontCount", static: false, private: false, access: { has: obj => "dontCount" in obj, get: obj => obj.dontCount }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ThrowsOnClicks = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ThrowsOnClicks = _classThis;
            })();
            let TestCmpt = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-cmpt',
                        template: `<button throws-on-clicks likes-clicks><button>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestCmpt = _classThis = class {
                };
                __setFunctionName(_classThis, "TestCmpt");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmpt = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmpt = _classThis;
            })();
            let noOfErrors = 0;
            class CountingErrorHandler extends core_1.ErrorHandler {
                handleError(error) {
                    noOfErrors++;
                }
            }
            testing_1.TestBed.configureTestingModule({
                rethrowApplicationErrors: false,
                declarations: [TestCmpt, LikesClicks, ThrowsOnClicks],
                providers: [{ provide: core_1.ErrorHandler, useClass: CountingErrorHandler }],
            });
            const fixture = testing_1.TestBed.createComponent(TestCmpt);
            fixture.detectChanges();
            const buttonDebugEl = fixture.debugElement.query(platform_browser_1.By.css('button'));
            expect(buttonDebugEl.injector.get(LikesClicks).counter).toBe(0);
            buttonDebugEl.nativeElement.click();
            expect(noOfErrors).toBe(1);
            expect(buttonDebugEl.injector.get(LikesClicks).counter).toBe(1);
        });
        it('should prevent default if any of the listeners returns false', () => {
            let TestCmpt = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-cmpt',
                        template: `
          <button returns-false likes-clicks></button>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestCmpt = _classThis = class {
                };
                __setFunctionName(_classThis, "TestCmpt");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmpt = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmpt = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [TestCmpt, ReturnsFalse, LikesClicks] });
            const fixture = testing_1.TestBed.createComponent(TestCmpt);
            fixture.detectChanges();
            const buttonDebugEl = fixture.debugElement.query(platform_browser_1.By.css('button'));
            const likesClicksDir = buttonDebugEl.injector.get(LikesClicks);
            const returnsFalseDir = buttonDebugEl.injector.get(ReturnsFalse);
            expect(likesClicksDir.counter).toBe(0);
            expect(returnsFalseDir.counter).toBe(0);
            buttonDebugEl.nativeElement.click();
            expect(likesClicksDir.counter).toBe(1);
            expect(returnsFalseDir.counter).toBe(1);
            expect(returnsFalseDir.event.preventDefault).not.toHaveBeenCalled();
            returnsFalseDir.handlerShouldReturn = true;
            buttonDebugEl.nativeElement.click();
            expect(returnsFalseDir.event.preventDefault).not.toHaveBeenCalled();
            returnsFalseDir.handlerShouldReturn = false;
            buttonDebugEl.nativeElement.click();
            expect(returnsFalseDir.event.preventDefault).toHaveBeenCalled();
        });
        it('should not subscribe twice to the output when there are 2 coalesced listeners', () => {
            let FooDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[foo]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _model_decorators;
                let _model_initializers = [];
                let _model_extraInitializers = [];
                let _update_decorators;
                let _update_initializers = [];
                let _update_extraInitializers = [];
                var FooDirective = _classThis = class {
                    updateValue(value) {
                        this.update.emit(value);
                    }
                    constructor() {
                        this.model = __runInitializers(this, _model_initializers, void 0);
                        this.update = (__runInitializers(this, _model_extraInitializers), __runInitializers(this, _update_initializers, new core_1.EventEmitter()));
                        __runInitializers(this, _update_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "FooDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _model_decorators = [(0, core_1.Input)('foo')];
                    _update_decorators = [(0, core_1.Output)('fooChange')];
                    __esDecorate(null, null, _model_decorators, { kind: "field", name: "model", static: false, private: false, access: { has: obj => "model" in obj, get: obj => obj.model, set: (obj, value) => { obj.model = value; } }, metadata: _metadata }, _model_initializers, _model_extraInitializers);
                    __esDecorate(null, null, _update_decorators, { kind: "field", name: "update", static: false, private: false, access: { has: obj => "update" in obj, get: obj => obj.update, set: (obj, value) => { obj.update = value; } }, metadata: _metadata }, _update_initializers, _update_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    FooDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return FooDirective = _classThis;
            })();
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-component',
                        template: `<div [(foo)]="someValue" (fooChange)="fooChange($event)"></div>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _fooDirective_decorators;
                let _fooDirective_initializers = [];
                let _fooDirective_extraInitializers = [];
                var TestComponent = _classThis = class {
                    fooChange() {
                        this.count++;
                    }
                    triggerUpdate(value) {
                        this.fooDirective.updateValue(value);
                    }
                    constructor() {
                        this.count = 0;
                        this.someValue = -1;
                        this.fooDirective = __runInitializers(this, _fooDirective_initializers, null);
                        __runInitializers(this, _fooDirective_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _fooDirective_decorators = [(0, core_1.ViewChild)(FooDirective)];
                    __esDecorate(null, null, _fooDirective_decorators, { kind: "field", name: "fooDirective", static: false, private: false, access: { has: obj => "fooDirective" in obj, get: obj => obj.fooDirective, set: (obj, value) => { obj.fooDirective = value; } }, metadata: _metadata }, _fooDirective_initializers, _fooDirective_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestComponent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [TestComponent, FooDirective] });
            const fixture = testing_1.TestBed.createComponent(TestComponent);
            fixture.detectChanges();
            const componentInstance = fixture.componentInstance;
            componentInstance.triggerUpdate(42);
            fixture.detectChanges();
            expect(componentInstance.count).toEqual(1);
            expect(componentInstance.someValue).toEqual(42);
        });
        it('should maintain the order in which listeners are registered', () => {
            const log = [];
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: '<button dirA dirB (click)="count()">Click me!</button>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                    constructor() {
                        this.counter = 0;
                    }
                    count() {
                        log.push('component.click');
                    }
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            let DirA = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dirA]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _instanceExtraInitializers = [];
                let _count_decorators;
                var DirA = _classThis = class {
                    count() {
                        log.push('dirA.click');
                    }
                    constructor() {
                        __runInitializers(this, _instanceExtraInitializers);
                    }
                };
                __setFunctionName(_classThis, "DirA");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _count_decorators = [(0, core_1.HostListener)('click')];
                    __esDecorate(_classThis, null, _count_decorators, { kind: "method", name: "count", static: false, private: false, access: { has: obj => "count" in obj, get: obj => obj.count }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirA = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirA = _classThis;
            })();
            let DirB = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dirB]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _instanceExtraInitializers = [];
                let _count_decorators;
                var DirB = _classThis = class {
                    count() {
                        log.push('dirB.click');
                    }
                    constructor() {
                        __runInitializers(this, _instanceExtraInitializers);
                    }
                };
                __setFunctionName(_classThis, "DirB");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _count_decorators = [(0, core_1.HostListener)('click')];
                    __esDecorate(_classThis, null, _count_decorators, { kind: "method", name: "count", static: false, private: false, access: { has: obj => "count" in obj, get: obj => obj.count }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirB = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirB = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp, DirA, DirB] });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            const button = fixture.nativeElement.firstChild;
            button.click();
            expect(log).toEqual(['dirA.click', 'dirB.click', 'component.click']);
        });
    });
    describe('destroy', () => {
        it('should destroy listeners when view is removed', () => {
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: `
          <button *ngIf="visible" (click)="count()">Click me!</button>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                    constructor() {
                        this.visible = true;
                        this.counter = 0;
                    }
                    count() {
                        this.counter++;
                    }
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp] });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            const comp = fixture.componentInstance;
            const button = fixture.nativeElement.querySelector('button');
            button.click();
            expect(comp.counter).toBe(1);
            comp.visible = false;
            fixture.detectChanges();
            button.click();
            expect(comp.counter).toBe(1);
        });
        it('should destroy listeners when views generated using *ngFor are removed', () => {
            let counter = 0;
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: `
          <button *ngFor="let button of buttons" (click)="count()">Click me!</button>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                    constructor() {
                        this.buttons = [1, 2];
                    }
                    count() {
                        counter++;
                    }
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp] });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            const comp = fixture.componentInstance;
            const buttons = fixture.nativeElement.querySelectorAll('button');
            buttons[0].click();
            buttons[1].click();
            expect(counter).toBe(2);
            comp.buttons = [];
            fixture.detectChanges();
            buttons[0].click();
            buttons[1].click();
            expect(counter).toBe(2);
        });
        it('should destroy listeners when nested view is removed', () => {
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: `
          <ng-container *ngIf="isSectionVisible">
            Click to submit a form:
            <button *ngIf="isButtonVisible" (click)="count()">Click me!</button>
          </ng-container>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                    constructor() {
                        this.isSectionVisible = true;
                        this.isButtonVisible = true;
                        this.counter = 0;
                    }
                    count() {
                        this.counter++;
                    }
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp] });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            const comp = fixture.componentInstance;
            const button = fixture.nativeElement.querySelector('button');
            button.click();
            expect(comp.counter).toBe(1);
            comp.isButtonVisible = false;
            fixture.detectChanges();
            button.click();
            expect(comp.counter).toBe(1);
            comp.isSectionVisible = false;
            fixture.detectChanges();
            button.click();
            expect(comp.counter).toBe(1);
        });
    });
    describe('host listeners', () => {
        it('should support host listeners on components', () => {
            const events = [];
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: ``,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _instanceExtraInitializers = [];
                let _onClick_decorators;
                var MyComp = _classThis = class {
                    onClick() {
                        events.push('click!');
                    }
                    constructor() {
                        __runInitializers(this, _instanceExtraInitializers);
                    }
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _onClick_decorators = [(0, core_1.HostListener)('click')];
                    __esDecorate(_classThis, null, _onClick_decorators, { kind: "method", name: "onClick", static: false, private: false, access: { has: obj => "onClick" in obj, get: obj => obj.onClick }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            const host = fixture.nativeElement;
            host.click();
            expect(events).toEqual(['click!']);
            host.click();
            expect(events).toEqual(['click!', 'click!']);
        });
        it('should support global host listeners on components', () => {
            const events = [];
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: ``,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _instanceExtraInitializers = [];
                let _onClick_decorators;
                var MyComp = _classThis = class {
                    onClick() {
                        events.push('global click!');
                    }
                    constructor() {
                        __runInitializers(this, _instanceExtraInitializers);
                    }
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _onClick_decorators = [(0, core_1.HostListener)('document:click')];
                    __esDecorate(_classThis, null, _onClick_decorators, { kind: "method", name: "onClick", static: false, private: false, access: { has: obj => "onClick" in obj, get: obj => obj.onClick }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            const host = fixture.nativeElement;
            host.click();
            expect(events).toEqual(['global click!']);
            host.click();
            expect(events).toEqual(['global click!', 'global click!']);
        });
        it('should support host listeners on directives', () => {
            const events = [];
            let HostListenerDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[hostListenerDir]',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _instanceExtraInitializers = [];
                let _onClick_decorators;
                var HostListenerDir = _classThis = class {
                    onClick() {
                        events.push('click!');
                    }
                    constructor() {
                        __runInitializers(this, _instanceExtraInitializers);
                    }
                };
                __setFunctionName(_classThis, "HostListenerDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _onClick_decorators = [(0, core_1.HostListener)('click')];
                    __esDecorate(_classThis, null, _onClick_decorators, { kind: "method", name: "onClick", static: false, private: false, access: { has: obj => "onClick" in obj, get: obj => obj.onClick }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostListenerDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostListenerDir = _classThis;
            })();
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [HostListenerDir],
                        template: `<button hostListenerDir>Click</button>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            expect(events).toEqual([]);
            const button = fixture.nativeElement.querySelector('button');
            button.click();
            expect(events).toEqual(['click!']);
            button.click();
            expect(events).toEqual(['click!', 'click!']);
        });
        it('should support global host listeners on directives', () => {
            const events = [];
            let HostListenerDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[hostListenerDir]',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _instanceExtraInitializers = [];
                let _onClick_decorators;
                var HostListenerDir = _classThis = class {
                    onClick() {
                        events.push('click!');
                    }
                    constructor() {
                        __runInitializers(this, _instanceExtraInitializers);
                    }
                };
                __setFunctionName(_classThis, "HostListenerDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _onClick_decorators = [(0, core_1.HostListener)('document:click')];
                    __esDecorate(_classThis, null, _onClick_decorators, { kind: "method", name: "onClick", static: false, private: false, access: { has: obj => "onClick" in obj, get: obj => obj.onClick }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostListenerDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostListenerDir = _classThis;
            })();
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [HostListenerDir],
                        template: `<button hostListenerDir>Click</button>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            expect(events).toEqual([]);
            const button = fixture.nativeElement.querySelector('button');
            button.click();
            expect(events).toEqual(['click!']);
            button.click();
            expect(events).toEqual(['click!', 'click!']);
        });
    });
    describe('global host listeners on special element as directive hosts', () => {
        it('should bind global event listeners on an ng-container directive host', () => {
            let clicks = 0;
            let AddGlobalListener = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[add-global-listener]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _instanceExtraInitializers = [];
                let _handleClick_decorators;
                var AddGlobalListener = _classThis = class {
                    handleClick() {
                        clicks++;
                    }
                    constructor() {
                        __runInitializers(this, _instanceExtraInitializers);
                    }
                };
                __setFunctionName(_classThis, "AddGlobalListener");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _handleClick_decorators = [(0, core_1.HostListener)('document:click')];
                    __esDecorate(_classThis, null, _handleClick_decorators, { kind: "method", name: "handleClick", static: false, private: false, access: { has: obj => "handleClick" in obj, get: obj => obj.handleClick }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AddGlobalListener = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AddGlobalListener = _classThis;
            })();
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
              <ng-container add-global-listener>
                <button>Click me!</button>
              </ng-container>
            `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp, AddGlobalListener] });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            const button = fixture.nativeElement.querySelector('button');
            button.click();
            fixture.detectChanges();
            expect(clicks).toBe(1);
        });
        it('should bind global event listeners on an ng-template directive host', () => {
            let clicks = 0;
            let AddGlobalListener = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[add-global-listener]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _instanceExtraInitializers = [];
                let _handleClick_decorators;
                var AddGlobalListener = _classThis = class {
                    handleClick() {
                        clicks++;
                    }
                    constructor() {
                        __runInitializers(this, _instanceExtraInitializers);
                    }
                };
                __setFunctionName(_classThis, "AddGlobalListener");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _handleClick_decorators = [(0, core_1.HostListener)('document:click')];
                    __esDecorate(_classThis, null, _handleClick_decorators, { kind: "method", name: "handleClick", static: false, private: false, access: { has: obj => "handleClick" in obj, get: obj => obj.handleClick }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AddGlobalListener = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AddGlobalListener = _classThis;
            })();
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
              <ng-template #template add-global-listener>
                <button>Click me!</button>
              </ng-template>

              <ng-container [ngTemplateOutlet]="template"></ng-container>
            `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [MyComp, AddGlobalListener],
                imports: [common_1.CommonModule],
            });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            const button = fixture.nativeElement.querySelector('button');
            button.click();
            fixture.detectChanges();
            expect(clicks).toBe(1);
        });
        it('should bind global event listeners on a structural directive host', () => {
            let clicks = 0;
            let AddGlobalListener = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[add-global-listener]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _instanceExtraInitializers = [];
                let _handleClick_decorators;
                var AddGlobalListener = _classThis = class {
                    handleClick() {
                        clicks++;
                    }
                    constructor(_vcr, _templateRef) {
                        this._vcr = (__runInitializers(this, _instanceExtraInitializers), _vcr);
                        this._templateRef = _templateRef;
                    }
                    ngOnInit() {
                        this._vcr.createEmbeddedView(this._templateRef);
                    }
                };
                __setFunctionName(_classThis, "AddGlobalListener");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _handleClick_decorators = [(0, core_1.HostListener)('document:click')];
                    __esDecorate(_classThis, null, _handleClick_decorators, { kind: "method", name: "handleClick", static: false, private: false, access: { has: obj => "handleClick" in obj, get: obj => obj.handleClick }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AddGlobalListener = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AddGlobalListener = _classThis;
            })();
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
              <div *add-global-listener>
                <button>Click me!</button>
              </div>
            `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp, AddGlobalListener] });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            const button = fixture.nativeElement.querySelector('button');
            button.click();
            fixture.detectChanges();
            expect(clicks).toBe(1);
        });
    });
});
