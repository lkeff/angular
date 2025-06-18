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
describe('outputs', () => {
    let ButtonToggle = (() => {
        let _classDecorators = [(0, core_1.Component)({
                selector: 'button-toggle',
                template: '',
                standalone: false,
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _change_decorators;
        let _change_initializers = [];
        let _change_extraInitializers = [];
        let _resetStream_decorators;
        let _resetStream_initializers = [];
        let _resetStream_extraInitializers = [];
        var ButtonToggle = _classThis = class {
            constructor() {
                this.change = __runInitializers(this, _change_initializers, new core_1.EventEmitter());
                this.resetStream = (__runInitializers(this, _change_extraInitializers), __runInitializers(this, _resetStream_initializers, new core_1.EventEmitter()));
                __runInitializers(this, _resetStream_extraInitializers);
            }
        };
        __setFunctionName(_classThis, "ButtonToggle");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _change_decorators = [(0, core_1.Output)('change')];
            _resetStream_decorators = [(0, core_1.Output)('reset')];
            __esDecorate(null, null, _change_decorators, { kind: "field", name: "change", static: false, private: false, access: { has: obj => "change" in obj, get: obj => obj.change, set: (obj, value) => { obj.change = value; } }, metadata: _metadata }, _change_initializers, _change_extraInitializers);
            __esDecorate(null, null, _resetStream_decorators, { kind: "field", name: "resetStream", static: false, private: false, access: { has: obj => "resetStream" in obj, get: obj => obj.resetStream, set: (obj, value) => { obj.resetStream = value; } }, metadata: _metadata }, _resetStream_initializers, _resetStream_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ButtonToggle = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return ButtonToggle = _classThis;
    })();
    let OtherDir = (() => {
        let _classDecorators = [(0, core_1.Directive)({
                selector: '[otherDir]',
                standalone: false,
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _changeStream_decorators;
        let _changeStream_initializers = [];
        let _changeStream_extraInitializers = [];
        var OtherDir = _classThis = class {
            constructor() {
                this.changeStream = __runInitializers(this, _changeStream_initializers, new core_1.EventEmitter());
                __runInitializers(this, _changeStream_extraInitializers);
            }
        };
        __setFunctionName(_classThis, "OtherDir");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _changeStream_decorators = [(0, core_1.Output)('change')];
            __esDecorate(null, null, _changeStream_decorators, { kind: "field", name: "changeStream", static: false, private: false, access: { has: obj => "changeStream" in obj, get: obj => obj.changeStream, set: (obj, value) => { obj.changeStream = value; } }, metadata: _metadata }, _changeStream_initializers, _changeStream_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            OtherDir = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return OtherDir = _classThis;
    })();
    let DestroyComp = (() => {
        let _classDecorators = [(0, core_1.Component)({
                selector: 'destroy-comp',
                template: '',
                standalone: false,
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var DestroyComp = _classThis = class {
            constructor() {
                this.events = [];
            }
            ngOnDestroy() {
                this.events.push('destroy');
            }
        };
        __setFunctionName(_classThis, "DestroyComp");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            DestroyComp = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return DestroyComp = _classThis;
    })();
    let MyButton = (() => {
        let _classDecorators = [(0, core_1.Directive)({
                selector: '[myButton]',
                standalone: false,
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _click_decorators;
        let _click_initializers = [];
        let _click_extraInitializers = [];
        var MyButton = _classThis = class {
            constructor() {
                this.click = __runInitializers(this, _click_initializers, new core_1.EventEmitter());
                __runInitializers(this, _click_extraInitializers);
            }
        };
        __setFunctionName(_classThis, "MyButton");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _click_decorators = [(0, core_1.Output)()];
            __esDecorate(null, null, _click_decorators, { kind: "field", name: "click", static: false, private: false, access: { has: obj => "click" in obj, get: obj => obj.click, set: (obj, value) => { obj.click = value; } }, metadata: _metadata }, _click_initializers, _click_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            MyButton = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return MyButton = _classThis;
    })();
    it('should call component output function when event is emitted', () => {
        let counter = 0;
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<button-toggle (change)="onChange()"></button-toggle>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _buttonToggle_decorators;
            let _buttonToggle_initializers = [];
            let _buttonToggle_extraInitializers = [];
            var App = _classThis = class {
                onChange() {
                    counter++;
                }
                constructor() {
                    this.buttonToggle = __runInitializers(this, _buttonToggle_initializers, void 0);
                    __runInitializers(this, _buttonToggle_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _buttonToggle_decorators = [(0, core_1.ViewChild)(ButtonToggle)];
                __esDecorate(null, null, _buttonToggle_decorators, { kind: "field", name: "buttonToggle", static: false, private: false, access: { has: obj => "buttonToggle" in obj, get: obj => obj.buttonToggle, set: (obj, value) => { obj.buttonToggle = value; } }, metadata: _metadata }, _buttonToggle_initializers, _buttonToggle_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [App, ButtonToggle] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        fixture.componentInstance.buttonToggle.change.next();
        expect(counter).toBe(1);
        fixture.componentInstance.buttonToggle.change.next();
        expect(counter).toBe(2);
    });
    it('should support more than 1 output function on the same node', () => {
        let counter = 0;
        let resetCounter = 0;
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<button-toggle (change)="onChange()" (reset)="onReset()"></button-toggle>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _buttonToggle_decorators;
            let _buttonToggle_initializers = [];
            let _buttonToggle_extraInitializers = [];
            var App = _classThis = class {
                onChange() {
                    counter++;
                }
                onReset() {
                    resetCounter++;
                }
                constructor() {
                    this.buttonToggle = __runInitializers(this, _buttonToggle_initializers, void 0);
                    __runInitializers(this, _buttonToggle_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _buttonToggle_decorators = [(0, core_1.ViewChild)(ButtonToggle)];
                __esDecorate(null, null, _buttonToggle_decorators, { kind: "field", name: "buttonToggle", static: false, private: false, access: { has: obj => "buttonToggle" in obj, get: obj => obj.buttonToggle, set: (obj, value) => { obj.buttonToggle = value; } }, metadata: _metadata }, _buttonToggle_initializers, _buttonToggle_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [App, ButtonToggle] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        fixture.componentInstance.buttonToggle.change.next();
        expect(counter).toBe(1);
        fixture.componentInstance.buttonToggle.resetStream.next();
        expect(resetCounter).toBe(1);
    });
    it('should eval component output expression when event is emitted', () => {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<button-toggle (change)="counter = counter + 1"></button-toggle>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _buttonToggle_decorators;
            let _buttonToggle_initializers = [];
            let _buttonToggle_extraInitializers = [];
            var App = _classThis = class {
                constructor() {
                    this.buttonToggle = __runInitializers(this, _buttonToggle_initializers, void 0);
                    this.counter = (__runInitializers(this, _buttonToggle_extraInitializers), 0);
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _buttonToggle_decorators = [(0, core_1.ViewChild)(ButtonToggle)];
                __esDecorate(null, null, _buttonToggle_decorators, { kind: "field", name: "buttonToggle", static: false, private: false, access: { has: obj => "buttonToggle" in obj, get: obj => obj.buttonToggle, set: (obj, value) => { obj.buttonToggle = value; } }, metadata: _metadata }, _buttonToggle_initializers, _buttonToggle_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [App, ButtonToggle] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        fixture.componentInstance.buttonToggle.change.next();
        expect(fixture.componentInstance.counter).toBe(1);
        fixture.componentInstance.buttonToggle.change.next();
        expect(fixture.componentInstance.counter).toBe(2);
    });
    it('should unsubscribe from output when view is destroyed', () => {
        let counter = 0;
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<button-toggle *ngIf="condition" (change)="onChange()"></button-toggle>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _buttonToggle_decorators;
            let _buttonToggle_initializers = [];
            let _buttonToggle_extraInitializers = [];
            var App = _classThis = class {
                constructor() {
                    this.buttonToggle = __runInitializers(this, _buttonToggle_initializers, void 0);
                    this.condition = (__runInitializers(this, _buttonToggle_extraInitializers), true);
                }
                onChange() {
                    counter++;
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _buttonToggle_decorators = [(0, core_1.ViewChild)(ButtonToggle)];
                __esDecorate(null, null, _buttonToggle_decorators, { kind: "field", name: "buttonToggle", static: false, private: false, access: { has: obj => "buttonToggle" in obj, get: obj => obj.buttonToggle, set: (obj, value) => { obj.buttonToggle = value; } }, metadata: _metadata }, _buttonToggle_initializers, _buttonToggle_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ imports: [common_1.CommonModule], declarations: [App, ButtonToggle] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        const buttonToggle = fixture.componentInstance.buttonToggle;
        buttonToggle.change.next();
        expect(counter).toBe(1);
        fixture.componentInstance.condition = false;
        fixture.detectChanges();
        buttonToggle.change.next();
        expect(counter).toBe(1);
    });
    it('should unsubscribe from output in nested view', () => {
        let counter = 0;
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <div *ngIf="condition">
          <button-toggle *ngIf="condition2" (change)="onChange()"></button-toggle>
        </div>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _buttonToggle_decorators;
            let _buttonToggle_initializers = [];
            let _buttonToggle_extraInitializers = [];
            var App = _classThis = class {
                constructor() {
                    this.buttonToggle = __runInitializers(this, _buttonToggle_initializers, void 0);
                    this.condition = (__runInitializers(this, _buttonToggle_extraInitializers), true);
                    this.condition2 = true;
                }
                onChange() {
                    counter++;
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _buttonToggle_decorators = [(0, core_1.ViewChild)(ButtonToggle)];
                __esDecorate(null, null, _buttonToggle_decorators, { kind: "field", name: "buttonToggle", static: false, private: false, access: { has: obj => "buttonToggle" in obj, get: obj => obj.buttonToggle, set: (obj, value) => { obj.buttonToggle = value; } }, metadata: _metadata }, _buttonToggle_initializers, _buttonToggle_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ imports: [common_1.CommonModule], declarations: [App, ButtonToggle] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        const buttonToggle = fixture.componentInstance.buttonToggle;
        buttonToggle.change.next();
        expect(counter).toBe(1);
        fixture.componentInstance.condition = false;
        fixture.detectChanges();
        buttonToggle.change.next();
        expect(counter).toBe(1);
    });
    it('should work properly when view also has listeners and destroys', () => {
        let clickCounter = 0;
        let changeCounter = 0;
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <div *ngIf="condition">
          <button (click)="onClick()">Click me</button>
          <button-toggle (change)="onChange()"></button-toggle>
          <destroy-comp></destroy-comp>
        </div>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _buttonToggle_decorators;
            let _buttonToggle_initializers = [];
            let _buttonToggle_extraInitializers = [];
            let _destroyComp_decorators;
            let _destroyComp_initializers = [];
            let _destroyComp_extraInitializers = [];
            var App = _classThis = class {
                constructor() {
                    this.buttonToggle = __runInitializers(this, _buttonToggle_initializers, void 0);
                    this.destroyComp = (__runInitializers(this, _buttonToggle_extraInitializers), __runInitializers(this, _destroyComp_initializers, void 0));
                    this.condition = (__runInitializers(this, _destroyComp_extraInitializers), true);
                }
                onClick() {
                    clickCounter++;
                }
                onChange() {
                    changeCounter++;
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _buttonToggle_decorators = [(0, core_1.ViewChild)(ButtonToggle)];
                _destroyComp_decorators = [(0, core_1.ViewChild)(DestroyComp)];
                __esDecorate(null, null, _buttonToggle_decorators, { kind: "field", name: "buttonToggle", static: false, private: false, access: { has: obj => "buttonToggle" in obj, get: obj => obj.buttonToggle, set: (obj, value) => { obj.buttonToggle = value; } }, metadata: _metadata }, _buttonToggle_initializers, _buttonToggle_extraInitializers);
                __esDecorate(null, null, _destroyComp_decorators, { kind: "field", name: "destroyComp", static: false, private: false, access: { has: obj => "destroyComp" in obj, get: obj => obj.destroyComp, set: (obj, value) => { obj.destroyComp = value; } }, metadata: _metadata }, _destroyComp_initializers, _destroyComp_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            imports: [common_1.CommonModule],
            declarations: [App, ButtonToggle, DestroyComp],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        const { buttonToggle, destroyComp } = fixture.componentInstance;
        const button = fixture.nativeElement.querySelector('button');
        buttonToggle.change.next();
        expect(changeCounter).toBe(1);
        expect(clickCounter).toBe(0);
        button.click();
        expect(changeCounter).toBe(1);
        expect(clickCounter).toBe(1);
        fixture.componentInstance.condition = false;
        fixture.detectChanges();
        expect(destroyComp.events).toEqual(['destroy']);
        buttonToggle.change.next();
        button.click();
        expect(changeCounter).toBe(1);
        expect(clickCounter).toBe(1);
    });
    it('should fire event listeners along with outputs if they match', () => {
        let counter = 0;
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<button myButton (click)="onClick()">Click me</button>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _buttonDir_decorators;
            let _buttonDir_initializers = [];
            let _buttonDir_extraInitializers = [];
            var App = _classThis = class {
                onClick() {
                    counter++;
                }
                constructor() {
                    this.buttonDir = __runInitializers(this, _buttonDir_initializers, void 0);
                    __runInitializers(this, _buttonDir_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _buttonDir_decorators = [(0, core_1.ViewChild)(MyButton)];
                __esDecorate(null, null, _buttonDir_decorators, { kind: "field", name: "buttonDir", static: false, private: false, access: { has: obj => "buttonDir" in obj, get: obj => obj.buttonDir, set: (obj, value) => { obj.buttonDir = value; } }, metadata: _metadata }, _buttonDir_initializers, _buttonDir_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [App, MyButton] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        // To match current Angular behavior, the click listener is still
        // set up in addition to any matching outputs.
        const button = fixture.nativeElement.querySelector('button');
        button.click();
        expect(counter).toBe(1);
        fixture.componentInstance.buttonDir.click.next();
        expect(counter).toBe(2);
    });
    it('should work with two outputs of the same name', () => {
        let counter = 0;
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<button-toggle (change)="onChange()" otherDir></button-toggle>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _buttonToggle_decorators;
            let _buttonToggle_initializers = [];
            let _buttonToggle_extraInitializers = [];
            let _otherDir_decorators;
            let _otherDir_initializers = [];
            let _otherDir_extraInitializers = [];
            var App = _classThis = class {
                onChange() {
                    counter++;
                }
                constructor() {
                    this.buttonToggle = __runInitializers(this, _buttonToggle_initializers, void 0);
                    this.otherDir = (__runInitializers(this, _buttonToggle_extraInitializers), __runInitializers(this, _otherDir_initializers, void 0));
                    __runInitializers(this, _otherDir_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _buttonToggle_decorators = [(0, core_1.ViewChild)(ButtonToggle)];
                _otherDir_decorators = [(0, core_1.ViewChild)(OtherDir)];
                __esDecorate(null, null, _buttonToggle_decorators, { kind: "field", name: "buttonToggle", static: false, private: false, access: { has: obj => "buttonToggle" in obj, get: obj => obj.buttonToggle, set: (obj, value) => { obj.buttonToggle = value; } }, metadata: _metadata }, _buttonToggle_initializers, _buttonToggle_extraInitializers);
                __esDecorate(null, null, _otherDir_decorators, { kind: "field", name: "otherDir", static: false, private: false, access: { has: obj => "otherDir" in obj, get: obj => obj.otherDir, set: (obj, value) => { obj.otherDir = value; } }, metadata: _metadata }, _otherDir_initializers, _otherDir_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [App, ButtonToggle, OtherDir] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        fixture.componentInstance.buttonToggle.change.next();
        expect(counter).toBe(1);
        fixture.componentInstance.otherDir.changeStream.next();
        expect(counter).toBe(2);
    });
    it('should work with an input and output of the same name', () => {
        let counter = 0;
        let OtherChangeDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[otherChangeDir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _change_decorators;
            let _change_initializers = [];
            let _change_extraInitializers = [];
            var OtherChangeDir = _classThis = class {
                constructor() {
                    this.change = __runInitializers(this, _change_initializers, void 0);
                    __runInitializers(this, _change_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "OtherChangeDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _change_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _change_decorators, { kind: "field", name: "change", static: false, private: false, access: { has: obj => "change" in obj, get: obj => obj.change, set: (obj, value) => { obj.change = value; } }, metadata: _metadata }, _change_initializers, _change_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                OtherChangeDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return OtherChangeDir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<button-toggle (change)="onChange()" otherChangeDir [change]="change"></button-toggle>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _buttonToggle_decorators;
            let _buttonToggle_initializers = [];
            let _buttonToggle_extraInitializers = [];
            let _otherDir_decorators;
            let _otherDir_initializers = [];
            let _otherDir_extraInitializers = [];
            var App = _classThis = class {
                constructor() {
                    this.buttonToggle = __runInitializers(this, _buttonToggle_initializers, void 0);
                    this.otherDir = (__runInitializers(this, _buttonToggle_extraInitializers), __runInitializers(this, _otherDir_initializers, void 0));
                    this.change = (__runInitializers(this, _otherDir_extraInitializers), true);
                }
                onChange() {
                    counter++;
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _buttonToggle_decorators = [(0, core_1.ViewChild)(ButtonToggle)];
                _otherDir_decorators = [(0, core_1.ViewChild)(OtherChangeDir)];
                __esDecorate(null, null, _buttonToggle_decorators, { kind: "field", name: "buttonToggle", static: false, private: false, access: { has: obj => "buttonToggle" in obj, get: obj => obj.buttonToggle, set: (obj, value) => { obj.buttonToggle = value; } }, metadata: _metadata }, _buttonToggle_initializers, _buttonToggle_extraInitializers);
                __esDecorate(null, null, _otherDir_decorators, { kind: "field", name: "otherDir", static: false, private: false, access: { has: obj => "otherDir" in obj, get: obj => obj.otherDir, set: (obj, value) => { obj.otherDir = value; } }, metadata: _metadata }, _otherDir_initializers, _otherDir_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [App, ButtonToggle, OtherChangeDir] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        const { buttonToggle, otherDir } = fixture.componentInstance;
        expect(otherDir.change).toBe(true);
        fixture.componentInstance.change = false;
        fixture.detectChanges();
        expect(otherDir.change).toBe(false);
        buttonToggle.change.next();
        expect(counter).toBe(1);
    });
});
