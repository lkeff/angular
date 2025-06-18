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
describe('onChanges', () => {
    it('should correctly support updating one Input among many', () => {
        let log = [];
        let ChildComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'child-comp',
                    template: 'child',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _a_decorators;
            let _a_initializers = [];
            let _a_extraInitializers = [];
            let _b_decorators;
            let _b_initializers = [];
            let _b_extraInitializers = [];
            let _c_decorators;
            let _c_initializers = [];
            let _c_extraInitializers = [];
            var ChildComp = _classThis = class {
                ngOnChanges(changes) {
                    for (let key in changes) {
                        const simpleChange = changes[key];
                        log.push(key + ': ' + simpleChange.previousValue + ' -> ' + simpleChange.currentValue);
                    }
                }
                constructor() {
                    this.a = __runInitializers(this, _a_initializers, 0);
                    this.b = (__runInitializers(this, _a_extraInitializers), __runInitializers(this, _b_initializers, 0));
                    this.c = (__runInitializers(this, _b_extraInitializers), __runInitializers(this, _c_initializers, 0));
                    __runInitializers(this, _c_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "ChildComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _a_decorators = [(0, core_1.Input)()];
                _b_decorators = [(0, core_1.Input)()];
                _c_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _a_decorators, { kind: "field", name: "a", static: false, private: false, access: { has: obj => "a" in obj, get: obj => obj.a, set: (obj, value) => { obj.a = value; } }, metadata: _metadata }, _a_initializers, _a_extraInitializers);
                __esDecorate(null, null, _b_decorators, { kind: "field", name: "b", static: false, private: false, access: { has: obj => "b" in obj, get: obj => obj.b, set: (obj, value) => { obj.b = value; } }, metadata: _metadata }, _b_initializers, _b_extraInitializers);
                __esDecorate(null, null, _c_decorators, { kind: "field", name: "c", static: false, private: false, access: { has: obj => "c" in obj, get: obj => obj.c, set: (obj, value) => { obj.c = value; } }, metadata: _metadata }, _c_initializers, _c_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ChildComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ChildComp = _classThis;
        })();
        let AppComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'app-comp',
                    template: '<child-comp [a]="a" [b]="b" [c]="c"></child-comp>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var AppComp = _classThis = class {
                constructor() {
                    this.a = 0;
                    this.b = 0;
                    this.c = 0;
                }
            };
            __setFunctionName(_classThis, "AppComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                AppComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return AppComp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [AppComp, ChildComp] });
        const fixture = testing_1.TestBed.createComponent(AppComp);
        fixture.detectChanges();
        const appComp = fixture.componentInstance;
        expect(log).toEqual(['a: undefined -> 0', 'b: undefined -> 0', 'c: undefined -> 0']);
        log.length = 0;
        appComp.a = 1;
        fixture.detectChanges();
        expect(log).toEqual(['a: 0 -> 1']);
        log.length = 0;
        appComp.b = 2;
        fixture.detectChanges();
        expect(log).toEqual(['b: 0 -> 2']);
        log.length = 0;
        appComp.c = 3;
        fixture.detectChanges();
        expect(log).toEqual(['c: 0 -> 3']);
    });
    it('should call onChanges method after inputs are set in creation and update mode', () => {
        const events = [];
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp',
                    template: `<p>test</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _val1_decorators;
            let _val1_initializers = [];
            let _val1_extraInitializers = [];
            let _val2_decorators;
            let _val2_initializers = [];
            let _val2_extraInitializers = [];
            var Comp = _classThis = class {
                ngOnChanges(changes) {
                    events.push({ name: 'comp', changes });
                }
                constructor() {
                    this.val1 = __runInitializers(this, _val1_initializers, 'a');
                    this.val2 = (__runInitializers(this, _val1_extraInitializers), __runInitializers(this, _val2_initializers, 'b'));
                    __runInitializers(this, _val2_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Comp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _val1_decorators = [(0, core_1.Input)()];
                _val2_decorators = [(0, core_1.Input)('publicVal2')];
                __esDecorate(null, null, _val1_decorators, { kind: "field", name: "val1", static: false, private: false, access: { has: obj => "val1" in obj, get: obj => obj.val1, set: (obj, value) => { obj.val1 = value; } }, metadata: _metadata }, _val1_initializers, _val1_extraInitializers);
                __esDecorate(null, null, _val2_decorators, { kind: "field", name: "val2", static: false, private: false, access: { has: obj => "val2" in obj, get: obj => obj.val2, set: (obj, value) => { obj.val2 = value; } }, metadata: _metadata }, _val2_initializers, _val2_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Comp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Comp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<comp [val1]="val1" [publicVal2]="val2"></comp>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.val1 = 'a2';
                    this.val2 = 'b2';
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Comp],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(events).toEqual([
            {
                name: 'comp',
                changes: {
                    val1: new core_1.SimpleChange(undefined, 'a2', true),
                    val2: new core_1.SimpleChange(undefined, 'b2', true),
                },
            },
        ]);
        events.length = 0;
        fixture.componentInstance.val1 = 'a3';
        fixture.componentInstance.val2 = 'b3';
        fixture.detectChanges();
        expect(events).toEqual([
            {
                name: 'comp',
                changes: {
                    val1: new core_1.SimpleChange('a2', 'a3', false),
                    val2: new core_1.SimpleChange('b2', 'b3', false),
                },
            },
        ]);
    });
    it('should call parent onChanges before child onChanges', () => {
        const events = [];
        let Parent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'parent',
                    template: `<child [val]="val"></child>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _val_decorators;
            let _val_initializers = [];
            let _val_extraInitializers = [];
            var Parent = _classThis = class {
                ngOnChanges(changes) {
                    events.push({ name: 'parent', changes });
                }
                constructor() {
                    this.val = __runInitializers(this, _val_initializers, '');
                    __runInitializers(this, _val_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Parent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _val_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _val_decorators, { kind: "field", name: "val", static: false, private: false, access: { has: obj => "val" in obj, get: obj => obj.val, set: (obj, value) => { obj.val = value; } }, metadata: _metadata }, _val_initializers, _val_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Parent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Parent = _classThis;
        })();
        let Child = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'child',
                    template: `<p>test</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _val_decorators;
            let _val_initializers = [];
            let _val_extraInitializers = [];
            var Child = _classThis = class {
                ngOnChanges(changes) {
                    events.push({ name: 'child', changes });
                }
                constructor() {
                    this.val = __runInitializers(this, _val_initializers, '');
                    __runInitializers(this, _val_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Child");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _val_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _val_decorators, { kind: "field", name: "val", static: false, private: false, access: { has: obj => "val" in obj, get: obj => obj.val, set: (obj, value) => { obj.val = value; } }, metadata: _metadata }, _val_initializers, _val_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Child = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Child = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<parent [val]="val"></parent>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.val = 'foo';
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Child, Parent],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(events).toEqual([
            {
                name: 'parent',
                changes: {
                    val: new core_1.SimpleChange(undefined, 'foo', true),
                },
            },
            {
                name: 'child',
                changes: {
                    val: new core_1.SimpleChange(undefined, 'foo', true),
                },
            },
        ]);
        events.length = 0;
        fixture.componentInstance.val = 'bar';
        fixture.detectChanges();
        expect(events).toEqual([
            {
                name: 'parent',
                changes: {
                    val: new core_1.SimpleChange('foo', 'bar', false),
                },
            },
            {
                name: 'child',
                changes: {
                    val: new core_1.SimpleChange('foo', 'bar', false),
                },
            },
        ]);
    });
    it('should call all parent onChanges across view before calling children onChanges', () => {
        const events = [];
        let Parent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'parent',
                    template: `<child [name]="name" [val]="val"></child>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _val_decorators;
            let _val_initializers = [];
            let _val_extraInitializers = [];
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Parent = _classThis = class {
                ngOnChanges(changes) {
                    events.push({ name: 'parent ' + this.name, changes });
                }
                constructor() {
                    this.val = __runInitializers(this, _val_initializers, '');
                    this.name = (__runInitializers(this, _val_extraInitializers), __runInitializers(this, _name_initializers, ''));
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Parent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _val_decorators = [(0, core_1.Input)()];
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _val_decorators, { kind: "field", name: "val", static: false, private: false, access: { has: obj => "val" in obj, get: obj => obj.val, set: (obj, value) => { obj.val = value; } }, metadata: _metadata }, _val_initializers, _val_extraInitializers);
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Parent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Parent = _classThis;
        })();
        let Child = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'child',
                    template: `<p>test</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _val_decorators;
            let _val_initializers = [];
            let _val_extraInitializers = [];
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Child = _classThis = class {
                ngOnChanges(changes) {
                    events.push({ name: 'child ' + this.name, changes });
                }
                constructor() {
                    this.val = __runInitializers(this, _val_initializers, '');
                    this.name = (__runInitializers(this, _val_extraInitializers), __runInitializers(this, _name_initializers, ''));
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Child");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _val_decorators = [(0, core_1.Input)()];
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _val_decorators, { kind: "field", name: "val", static: false, private: false, access: { has: obj => "val" in obj, get: obj => obj.val, set: (obj, value) => { obj.val = value; } }, metadata: _metadata }, _val_initializers, _val_extraInitializers);
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Child = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Child = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <parent name="1" [val]="val"></parent>
        <parent name="2" [val]="val"></parent>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.val = 'foo';
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Child, Parent],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(events).toEqual([
            {
                name: 'parent 1',
                changes: {
                    name: new core_1.SimpleChange(undefined, '1', true),
                    val: new core_1.SimpleChange(undefined, 'foo', true),
                },
            },
            {
                name: 'parent 2',
                changes: {
                    name: new core_1.SimpleChange(undefined, '2', true),
                    val: new core_1.SimpleChange(undefined, 'foo', true),
                },
            },
            {
                name: 'child 1',
                changes: {
                    name: new core_1.SimpleChange(undefined, '1', true),
                    val: new core_1.SimpleChange(undefined, 'foo', true),
                },
            },
            {
                name: 'child 2',
                changes: {
                    name: new core_1.SimpleChange(undefined, '2', true),
                    val: new core_1.SimpleChange(undefined, 'foo', true),
                },
            },
        ]);
        events.length = 0;
        fixture.componentInstance.val = 'bar';
        fixture.detectChanges();
        expect(events).toEqual([
            {
                name: 'parent 1',
                changes: {
                    val: new core_1.SimpleChange('foo', 'bar', false),
                },
            },
            {
                name: 'parent 2',
                changes: {
                    val: new core_1.SimpleChange('foo', 'bar', false),
                },
            },
            {
                name: 'child 1',
                changes: {
                    val: new core_1.SimpleChange('foo', 'bar', false),
                },
            },
            {
                name: 'child 2',
                changes: {
                    val: new core_1.SimpleChange('foo', 'bar', false),
                },
            },
        ]);
    });
    it('should call onChanges every time a new view is created with ngIf', () => {
        const events = [];
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp',
                    template: `<p>{{val}}</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _val_decorators;
            let _val_initializers = [];
            let _val_extraInitializers = [];
            var Comp = _classThis = class {
                ngOnChanges(changes) {
                    events.push({ name: 'comp', changes });
                }
                constructor() {
                    this.val = __runInitializers(this, _val_initializers, '');
                    __runInitializers(this, _val_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Comp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _val_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _val_decorators, { kind: "field", name: "val", static: false, private: false, access: { has: obj => "val" in obj, get: obj => obj.val, set: (obj, value) => { obj.val = value; } }, metadata: _metadata }, _val_initializers, _val_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Comp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Comp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<comp *ngIf="show" [val]="val"></comp>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.show = true;
                    this.val = 'a';
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Comp],
            imports: [common_1.CommonModule],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(events).toEqual([
            {
                name: 'comp',
                changes: {
                    val: new core_1.SimpleChange(undefined, 'a', true),
                },
            },
        ]);
        events.length = 0;
        fixture.componentInstance.show = false;
        fixture.detectChanges();
        expect(events).toEqual([]);
        fixture.componentInstance.val = 'b';
        fixture.componentInstance.show = true;
        fixture.detectChanges();
        expect(events).toEqual([
            {
                name: 'comp',
                changes: {
                    val: new core_1.SimpleChange(undefined, 'b', true),
                },
            },
        ]);
    });
    it('should call onChanges in hosts before their content children', () => {
        const events = [];
        let Projected = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'projected',
                    template: `<p>{{val}}</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _val_decorators;
            let _val_initializers = [];
            let _val_extraInitializers = [];
            var Projected = _classThis = class {
                ngOnChanges(changes) {
                    events.push({ name: 'projected', changes });
                }
                constructor() {
                    this.val = __runInitializers(this, _val_initializers, '');
                    __runInitializers(this, _val_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Projected");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _val_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _val_decorators, { kind: "field", name: "val", static: false, private: false, access: { has: obj => "val" in obj, get: obj => obj.val, set: (obj, value) => { obj.val = value; } }, metadata: _metadata }, _val_initializers, _val_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Projected = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Projected = _classThis;
        })();
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp',
                    template: `<div><ng-content></ng-content></div>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _val_decorators;
            let _val_initializers = [];
            let _val_extraInitializers = [];
            var Comp = _classThis = class {
                ngOnChanges(changes) {
                    events.push({ name: 'comp', changes });
                }
                constructor() {
                    this.val = __runInitializers(this, _val_initializers, '');
                    __runInitializers(this, _val_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Comp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _val_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _val_decorators, { kind: "field", name: "val", static: false, private: false, access: { has: obj => "val" in obj, get: obj => obj.val, set: (obj, value) => { obj.val = value; } }, metadata: _metadata }, _val_initializers, _val_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Comp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Comp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<comp [val]="val"><projected [val]="val"></projected></comp>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.val = 'a';
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Comp, Projected],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(events).toEqual([
            {
                name: 'comp',
                changes: {
                    val: new core_1.SimpleChange(undefined, 'a', true),
                },
            },
            {
                name: 'projected',
                changes: {
                    val: new core_1.SimpleChange(undefined, 'a', true),
                },
            },
        ]);
        events.length = 0;
        fixture.componentInstance.val = 'b';
        fixture.detectChanges();
        expect(events).toEqual([
            {
                name: 'comp',
                changes: {
                    val: new core_1.SimpleChange('a', 'b', false),
                },
            },
            {
                name: 'projected',
                changes: {
                    val: new core_1.SimpleChange('a', 'b', false),
                },
            },
        ]);
    });
    it('should call onChanges in host and its content children before next host', () => {
        const events = [];
        let Projected = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'projected',
                    template: `<p>{{val}}</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _val_decorators;
            let _val_initializers = [];
            let _val_extraInitializers = [];
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Projected = _classThis = class {
                ngOnChanges(changes) {
                    events.push({ name: 'projected ' + this.name, changes });
                }
                constructor() {
                    this.val = __runInitializers(this, _val_initializers, '');
                    this.name = (__runInitializers(this, _val_extraInitializers), __runInitializers(this, _name_initializers, ''));
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Projected");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _val_decorators = [(0, core_1.Input)()];
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _val_decorators, { kind: "field", name: "val", static: false, private: false, access: { has: obj => "val" in obj, get: obj => obj.val, set: (obj, value) => { obj.val = value; } }, metadata: _metadata }, _val_initializers, _val_extraInitializers);
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Projected = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Projected = _classThis;
        })();
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp',
                    template: `<div><ng-content></ng-content></div>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _val_decorators;
            let _val_initializers = [];
            let _val_extraInitializers = [];
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Comp = _classThis = class {
                ngOnChanges(changes) {
                    events.push({ name: 'comp ' + this.name, changes });
                }
                constructor() {
                    this.val = __runInitializers(this, _val_initializers, '');
                    this.name = (__runInitializers(this, _val_extraInitializers), __runInitializers(this, _name_initializers, ''));
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Comp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _val_decorators = [(0, core_1.Input)()];
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _val_decorators, { kind: "field", name: "val", static: false, private: false, access: { has: obj => "val" in obj, get: obj => obj.val, set: (obj, value) => { obj.val = value; } }, metadata: _metadata }, _val_initializers, _val_extraInitializers);
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Comp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Comp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <comp name="1" [val]="val">
          <projected name="1" [val]="val"></projected>
        </comp>
        <comp name="2" [val]="val">
          <projected name="2" [val]="val"></projected>
        </comp>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.val = 'a';
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Comp, Projected],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(events).toEqual([
            {
                name: 'comp 1',
                changes: {
                    name: new core_1.SimpleChange(undefined, '1', true),
                    val: new core_1.SimpleChange(undefined, 'a', true),
                },
            },
            {
                name: 'projected 1',
                changes: {
                    name: new core_1.SimpleChange(undefined, '1', true),
                    val: new core_1.SimpleChange(undefined, 'a', true),
                },
            },
            {
                name: 'comp 2',
                changes: {
                    name: new core_1.SimpleChange(undefined, '2', true),
                    val: new core_1.SimpleChange(undefined, 'a', true),
                },
            },
            {
                name: 'projected 2',
                changes: {
                    name: new core_1.SimpleChange(undefined, '2', true),
                    val: new core_1.SimpleChange(undefined, 'a', true),
                },
            },
        ]);
        events.length = 0;
        fixture.componentInstance.val = 'b';
        fixture.detectChanges();
        expect(events).toEqual([
            {
                name: 'comp 1',
                changes: {
                    val: new core_1.SimpleChange('a', 'b', false),
                },
            },
            {
                name: 'projected 1',
                changes: {
                    val: new core_1.SimpleChange('a', 'b', false),
                },
            },
            {
                name: 'comp 2',
                changes: {
                    val: new core_1.SimpleChange('a', 'b', false),
                },
            },
            {
                name: 'projected 2',
                changes: {
                    val: new core_1.SimpleChange('a', 'b', false),
                },
            },
        ]);
    });
    it('should be called on directives after component by default', () => {
        const events = [];
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _dir_decorators;
            let _dir_initializers = [];
            let _dir_extraInitializers = [];
            var Dir = _classThis = class {
                ngOnChanges(changes) {
                    events.push({ name: 'dir', changes });
                }
                constructor() {
                    this.dir = __runInitializers(this, _dir_initializers, '');
                    __runInitializers(this, _dir_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _dir_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp',
                    template: `<p>{{val}}</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _val_decorators;
            let _val_initializers = [];
            let _val_extraInitializers = [];
            var Comp = _classThis = class {
                ngOnChanges(changes) {
                    events.push({ name: 'comp', changes });
                }
                constructor() {
                    this.val = __runInitializers(this, _val_initializers, '');
                    __runInitializers(this, _val_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Comp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _val_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _val_decorators, { kind: "field", name: "val", static: false, private: false, access: { has: obj => "val" in obj, get: obj => obj.val, set: (obj, value) => { obj.val = value; } }, metadata: _metadata }, _val_initializers, _val_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Comp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Comp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<comp [dir]="val" [val]="val"></comp>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.val = 'a';
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Comp, Dir],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(events).toEqual([
            {
                name: 'comp',
                changes: {
                    val: new core_1.SimpleChange(undefined, 'a', true),
                },
            },
            {
                name: 'dir',
                changes: {
                    dir: new core_1.SimpleChange(undefined, 'a', true),
                },
            },
        ]);
        events.length = 0;
        fixture.componentInstance.val = 'b';
        fixture.detectChanges();
        expect(events).toEqual([
            {
                name: 'comp',
                changes: {
                    val: new core_1.SimpleChange('a', 'b', false),
                },
            },
            {
                name: 'dir',
                changes: {
                    dir: new core_1.SimpleChange('a', 'b', false),
                },
            },
        ]);
    });
    it('should be called on directives before component if component injects directives', () => {
        const events = [];
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _dir_decorators;
            let _dir_initializers = [];
            let _dir_extraInitializers = [];
            var Dir = _classThis = class {
                ngOnChanges(changes) {
                    events.push({ name: 'dir', changes });
                }
                constructor() {
                    this.dir = __runInitializers(this, _dir_initializers, '');
                    __runInitializers(this, _dir_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _dir_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp',
                    template: `<p>{{val}}</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _val_decorators;
            let _val_initializers = [];
            let _val_extraInitializers = [];
            var Comp = _classThis = class {
                constructor(dir) {
                    this.dir = dir;
                    this.val = __runInitializers(this, _val_initializers, '');
                    __runInitializers(this, _val_extraInitializers);
                    this.dir = dir;
                }
                ngOnChanges(changes) {
                    events.push({ name: 'comp', changes });
                }
            };
            __setFunctionName(_classThis, "Comp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _val_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _val_decorators, { kind: "field", name: "val", static: false, private: false, access: { has: obj => "val" in obj, get: obj => obj.val, set: (obj, value) => { obj.val = value; } }, metadata: _metadata }, _val_initializers, _val_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Comp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Comp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<comp [dir]="val" [val]="val"></comp>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.val = 'a';
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Comp, Dir],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(events).toEqual([
            {
                name: 'dir',
                changes: {
                    dir: new core_1.SimpleChange(undefined, 'a', true),
                },
            },
            {
                name: 'comp',
                changes: {
                    val: new core_1.SimpleChange(undefined, 'a', true),
                },
            },
        ]);
        events.length = 0;
        fixture.componentInstance.val = 'b';
        fixture.detectChanges();
        expect(events).toEqual([
            {
                name: 'dir',
                changes: {
                    dir: new core_1.SimpleChange('a', 'b', false),
                },
            },
            {
                name: 'comp',
                changes: {
                    val: new core_1.SimpleChange('a', 'b', false),
                },
            },
        ]);
    });
    it('should be called on multiple directives in injection order', () => {
        const events = [];
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _dir_decorators;
            let _dir_initializers = [];
            let _dir_extraInitializers = [];
            var Dir = _classThis = class {
                ngOnChanges(changes) {
                    events.push({ name: 'dir', changes });
                }
                constructor() {
                    this.dir = __runInitializers(this, _dir_initializers, '');
                    __runInitializers(this, _dir_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _dir_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        let InjectionDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[injectionDir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _injectionDir_decorators;
            let _injectionDir_initializers = [];
            let _injectionDir_extraInitializers = [];
            var InjectionDir = _classThis = class {
                constructor(dir) {
                    this.dir = dir;
                    this.injectionDir = __runInitializers(this, _injectionDir_initializers, '');
                    __runInitializers(this, _injectionDir_extraInitializers);
                    this.dir = dir;
                }
                ngOnChanges(changes) {
                    events.push({ name: 'injectionDir', changes });
                }
            };
            __setFunctionName(_classThis, "InjectionDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _injectionDir_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _injectionDir_decorators, { kind: "field", name: "injectionDir", static: false, private: false, access: { has: obj => "injectionDir" in obj, get: obj => obj.injectionDir, set: (obj, value) => { obj.injectionDir = value; } }, metadata: _metadata }, _injectionDir_initializers, _injectionDir_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                InjectionDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return InjectionDir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<div [injectionDir]="val" [dir]="val"></div>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.val = 'a';
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, InjectionDir, Dir],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(events).toEqual([
            {
                name: 'dir',
                changes: {
                    dir: new core_1.SimpleChange(undefined, 'a', true),
                },
            },
            {
                name: 'injectionDir',
                changes: {
                    injectionDir: new core_1.SimpleChange(undefined, 'a', true),
                },
            },
        ]);
    });
    it('should be called on directives on an element', () => {
        const events = [];
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _dir_decorators;
            let _dir_initializers = [];
            let _dir_extraInitializers = [];
            let _val_decorators;
            let _val_initializers = [];
            let _val_extraInitializers = [];
            var Dir = _classThis = class {
                ngOnChanges(changes) {
                    events.push({ name: 'dir', changes });
                }
                constructor() {
                    this.dir = __runInitializers(this, _dir_initializers, '');
                    this.val = (__runInitializers(this, _dir_extraInitializers), __runInitializers(this, _val_initializers, ''));
                    __runInitializers(this, _val_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _dir_decorators = [(0, core_1.Input)()];
                _val_decorators = [(0, core_1.Input)('dir-val')];
                __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                __esDecorate(null, null, _val_decorators, { kind: "field", name: "val", static: false, private: false, access: { has: obj => "val" in obj, get: obj => obj.val, set: (obj, value) => { obj.val = value; } }, metadata: _metadata }, _val_initializers, _val_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<div [dir]="val1" [dir-val]="val2"></div>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.val1 = 'a';
                    this.val2 = 'b';
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Dir],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(events).toEqual([
            {
                name: 'dir',
                changes: {
                    dir: new core_1.SimpleChange(undefined, 'a', true),
                    val: new core_1.SimpleChange(undefined, 'b', true),
                },
            },
        ]);
        events.length = 0;
        fixture.componentInstance.val1 = 'a1';
        fixture.componentInstance.val2 = 'b1';
        fixture.detectChanges();
        expect(events).toEqual([
            {
                name: 'dir',
                changes: {
                    dir: new core_1.SimpleChange('a', 'a1', false),
                    val: new core_1.SimpleChange('b', 'b1', false),
                },
            },
        ]);
    });
    it('should call onChanges properly in for loop', () => {
        const events = [];
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp',
                    template: `<p>{{val}}</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _val_decorators;
            let _val_initializers = [];
            let _val_extraInitializers = [];
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Comp = _classThis = class {
                ngOnChanges(changes) {
                    events.push({ name: 'comp ' + this.name, changes });
                }
                constructor() {
                    this.val = __runInitializers(this, _val_initializers, '');
                    this.name = (__runInitializers(this, _val_extraInitializers), __runInitializers(this, _name_initializers, ''));
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Comp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _val_decorators = [(0, core_1.Input)()];
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _val_decorators, { kind: "field", name: "val", static: false, private: false, access: { has: obj => "val" in obj, get: obj => obj.val, set: (obj, value) => { obj.val = value; } }, metadata: _metadata }, _val_initializers, _val_extraInitializers);
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Comp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Comp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
      <comp name="0" [val]="val"></comp>
      <comp *ngFor="let number of numbers" [name]="number" [val]="val"></comp>
      <comp name="1" [val]="val"></comp>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.val = 'a';
                    this.numbers = ['2', '3', '4'];
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Comp],
            imports: [common_1.CommonModule],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(events).toEqual([
            {
                name: 'comp 0',
                changes: {
                    name: new core_1.SimpleChange(undefined, '0', true),
                    val: new core_1.SimpleChange(undefined, 'a', true),
                },
            },
            {
                name: 'comp 1',
                changes: {
                    name: new core_1.SimpleChange(undefined, '1', true),
                    val: new core_1.SimpleChange(undefined, 'a', true),
                },
            },
            {
                name: 'comp 2',
                changes: {
                    name: new core_1.SimpleChange(undefined, '2', true),
                    val: new core_1.SimpleChange(undefined, 'a', true),
                },
            },
            {
                name: 'comp 3',
                changes: {
                    name: new core_1.SimpleChange(undefined, '3', true),
                    val: new core_1.SimpleChange(undefined, 'a', true),
                },
            },
            {
                name: 'comp 4',
                changes: {
                    name: new core_1.SimpleChange(undefined, '4', true),
                    val: new core_1.SimpleChange(undefined, 'a', true),
                },
            },
        ]);
        events.length = 0;
        fixture.componentInstance.val = 'b';
        fixture.detectChanges();
        expect(events).toEqual([
            {
                name: 'comp 0',
                changes: {
                    val: new core_1.SimpleChange('a', 'b', false),
                },
            },
            {
                name: 'comp 1',
                changes: {
                    val: new core_1.SimpleChange('a', 'b', false),
                },
            },
            {
                name: 'comp 2',
                changes: {
                    val: new core_1.SimpleChange('a', 'b', false),
                },
            },
            {
                name: 'comp 3',
                changes: {
                    val: new core_1.SimpleChange('a', 'b', false),
                },
            },
            {
                name: 'comp 4',
                changes: {
                    val: new core_1.SimpleChange('a', 'b', false),
                },
            },
        ]);
    });
    it('should call onChanges properly in for loop with children', () => {
        const events = [];
        let Child = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'child',
                    template: `<p>{{val}}</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _val_decorators;
            let _val_initializers = [];
            let _val_extraInitializers = [];
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Child = _classThis = class {
                ngOnChanges(changes) {
                    events.push({ name: 'child of parent ' + this.name, changes });
                }
                constructor() {
                    this.val = __runInitializers(this, _val_initializers, '');
                    this.name = (__runInitializers(this, _val_extraInitializers), __runInitializers(this, _name_initializers, ''));
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Child");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _val_decorators = [(0, core_1.Input)()];
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _val_decorators, { kind: "field", name: "val", static: false, private: false, access: { has: obj => "val" in obj, get: obj => obj.val, set: (obj, value) => { obj.val = value; } }, metadata: _metadata }, _val_initializers, _val_extraInitializers);
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Child = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Child = _classThis;
        })();
        let Parent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'parent',
                    template: `<child [name]="name" [val]="val"></child>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _val_decorators;
            let _val_initializers = [];
            let _val_extraInitializers = [];
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Parent = _classThis = class {
                ngOnChanges(changes) {
                    events.push({ name: 'parent ' + this.name, changes });
                }
                constructor() {
                    this.val = __runInitializers(this, _val_initializers, '');
                    this.name = (__runInitializers(this, _val_extraInitializers), __runInitializers(this, _name_initializers, ''));
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Parent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _val_decorators = [(0, core_1.Input)()];
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _val_decorators, { kind: "field", name: "val", static: false, private: false, access: { has: obj => "val" in obj, get: obj => obj.val, set: (obj, value) => { obj.val = value; } }, metadata: _metadata }, _val_initializers, _val_extraInitializers);
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Parent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Parent = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <parent name="0" [val]="val"></parent>
        <parent *ngFor="let number of numbers" [name]="number" [val]="val"></parent>
        <parent name="1" [val]="val"></parent>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.val = 'a';
                    this.numbers = ['2', '3', '4'];
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Child, Parent],
            imports: [common_1.CommonModule],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(events).toEqual([
            {
                name: 'parent 0',
                changes: {
                    name: new core_1.SimpleChange(undefined, '0', true),
                    val: new core_1.SimpleChange(undefined, 'a', true),
                },
            },
            {
                name: 'parent 1',
                changes: {
                    name: new core_1.SimpleChange(undefined, '1', true),
                    val: new core_1.SimpleChange(undefined, 'a', true),
                },
            },
            {
                name: 'parent 2',
                changes: {
                    name: new core_1.SimpleChange(undefined, '2', true),
                    val: new core_1.SimpleChange(undefined, 'a', true),
                },
            },
            {
                name: 'child of parent 2',
                changes: {
                    name: new core_1.SimpleChange(undefined, '2', true),
                    val: new core_1.SimpleChange(undefined, 'a', true),
                },
            },
            {
                name: 'parent 3',
                changes: {
                    name: new core_1.SimpleChange(undefined, '3', true),
                    val: new core_1.SimpleChange(undefined, 'a', true),
                },
            },
            {
                name: 'child of parent 3',
                changes: {
                    name: new core_1.SimpleChange(undefined, '3', true),
                    val: new core_1.SimpleChange(undefined, 'a', true),
                },
            },
            {
                name: 'parent 4',
                changes: {
                    name: new core_1.SimpleChange(undefined, '4', true),
                    val: new core_1.SimpleChange(undefined, 'a', true),
                },
            },
            {
                name: 'child of parent 4',
                changes: {
                    name: new core_1.SimpleChange(undefined, '4', true),
                    val: new core_1.SimpleChange(undefined, 'a', true),
                },
            },
            {
                name: 'child of parent 0',
                changes: {
                    name: new core_1.SimpleChange(undefined, '0', true),
                    val: new core_1.SimpleChange(undefined, 'a', true),
                },
            },
            {
                name: 'child of parent 1',
                changes: {
                    name: new core_1.SimpleChange(undefined, '1', true),
                    val: new core_1.SimpleChange(undefined, 'a', true),
                },
            },
        ]);
        events.length = 0;
        fixture.componentInstance.val = 'b';
        fixture.detectChanges();
        expect(events).toEqual([
            {
                name: 'parent 0',
                changes: {
                    val: new core_1.SimpleChange('a', 'b', false),
                },
            },
            {
                name: 'parent 1',
                changes: {
                    val: new core_1.SimpleChange('a', 'b', false),
                },
            },
            {
                name: 'parent 2',
                changes: {
                    val: new core_1.SimpleChange('a', 'b', false),
                },
            },
            {
                name: 'child of parent 2',
                changes: {
                    val: new core_1.SimpleChange('a', 'b', false),
                },
            },
            {
                name: 'parent 3',
                changes: {
                    val: new core_1.SimpleChange('a', 'b', false),
                },
            },
            {
                name: 'child of parent 3',
                changes: {
                    val: new core_1.SimpleChange('a', 'b', false),
                },
            },
            {
                name: 'parent 4',
                changes: {
                    val: new core_1.SimpleChange('a', 'b', false),
                },
            },
            {
                name: 'child of parent 4',
                changes: {
                    val: new core_1.SimpleChange('a', 'b', false),
                },
            },
            {
                name: 'child of parent 0',
                changes: {
                    val: new core_1.SimpleChange('a', 'b', false),
                },
            },
            {
                name: 'child of parent 1',
                changes: {
                    val: new core_1.SimpleChange('a', 'b', false),
                },
            },
        ]);
    });
    it('should not call onChanges if props are set directly', () => {
        const events = [];
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<p>{{value}}</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.value = 'a';
                }
                ngOnChanges(changes) {
                    events.push(changes);
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(events).toEqual([]);
        fixture.componentInstance.value = 'b';
        fixture.detectChanges();
        expect(events).toEqual([]);
    });
});
describe('meta-programming', () => {
    it('should allow adding lifecycle hook methods any time before first instance creation', () => {
        const events = [];
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<child name="value"></child>`,
                    standalone: false,
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
        let Child = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'child',
                    template: `empty`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Child = _classThis = class {
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Child");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Child = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Child = _classThis;
        })();
        const ChildPrototype = Child.prototype;
        ChildPrototype.ngOnInit = () => events.push('onInit');
        ChildPrototype.ngOnChanges = (e) => {
            const name = e['name'];
            expect(name.previousValue).toEqual(undefined);
            expect(name.currentValue).toEqual('value');
            expect(name.firstChange).toEqual(true);
            events.push('ngOnChanges');
        };
        ChildPrototype.ngDoCheck = () => events.push('ngDoCheck');
        ChildPrototype.ngAfterContentInit = () => events.push('ngAfterContentInit');
        ChildPrototype.ngAfterContentChecked = () => events.push('ngAfterContentChecked');
        ChildPrototype.ngAfterViewInit = () => events.push('ngAfterViewInit');
        ChildPrototype.ngAfterViewChecked = () => events.push('ngAfterViewChecked');
        ChildPrototype.ngOnDestroy = () => events.push('ngOnDestroy');
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Child],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        fixture.destroy();
        expect(events).toEqual([
            'ngOnChanges',
            'onInit',
            'ngDoCheck',
            'ngAfterContentInit',
            'ngAfterContentChecked',
            'ngAfterViewInit',
            'ngAfterViewChecked',
            'ngOnDestroy',
        ]);
    });
    it('should allow adding lifecycle hook methods with inheritance any time before first instance creation', () => {
        const events = [];
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<child name="value"></child>`,
                    standalone: false,
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
        class BaseChild {
        }
        let Child = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'child',
                    template: `empty`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _classSuper = BaseChild;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Child = _classThis = class extends _classSuper {
                constructor() {
                    super(...arguments);
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Child");
            (() => {
                var _a;
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Child = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Child = _classThis;
        })();
        // These are defined on the base class
        const BasePrototype = BaseChild.prototype;
        BasePrototype.ngOnInit = () => events.push('onInit');
        BasePrototype.ngOnChanges = (e) => {
            const name = e['name'];
            expect(name.previousValue).toEqual(undefined);
            expect(name.currentValue).toEqual('value');
            expect(name.firstChange).toEqual(true);
            events.push('ngOnChanges');
        };
        // These will be overwritten later
        BasePrototype.ngDoCheck = () => events.push('Expected to be overbidden');
        BasePrototype.ngAfterContentInit = () => events.push('Expected to be overbidden');
        // These are define on the concrete class
        const ChildPrototype = Child.prototype;
        ChildPrototype.ngDoCheck = () => events.push('ngDoCheck');
        ChildPrototype.ngAfterContentInit = () => events.push('ngAfterContentInit');
        ChildPrototype.ngAfterContentChecked = () => events.push('ngAfterContentChecked');
        ChildPrototype.ngAfterViewInit = () => events.push('ngAfterViewInit');
        ChildPrototype.ngAfterViewChecked = () => events.push('ngAfterViewChecked');
        ChildPrototype.ngOnDestroy = () => events.push('ngOnDestroy');
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Child],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        fixture.destroy();
        expect(events).toEqual([
            'ngOnChanges',
            'onInit',
            'ngDoCheck',
            'ngAfterContentInit',
            'ngAfterContentChecked',
            'ngAfterViewInit',
            'ngAfterViewChecked',
            'ngOnDestroy',
        ]);
    });
});
it('should call all hooks in correct order when several directives on same node', () => {
    let log = [];
    class AllHooks {
        constructor() {
            this.id = -1;
        }
        /** @internal */
        _log(hook, id) {
            log.push(hook + id);
        }
        ngOnChanges() {
            this._log('onChanges', this.id);
        }
        ngOnInit() {
            this._log('onInit', this.id);
        }
        ngDoCheck() {
            this._log('doCheck', this.id);
        }
        ngAfterContentInit() {
            this._log('afterContentInit', this.id);
        }
        ngAfterContentChecked() {
            this._log('afterContentChecked', this.id);
        }
        ngAfterViewInit() {
            this._log('afterViewInit', this.id);
        }
        ngAfterViewChecked() {
            this._log('afterViewChecked', this.id);
        }
    }
    let DirA = (() => {
        let _classDecorators = [(0, core_1.Directive)({
                selector: 'div',
                standalone: false,
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _classSuper = AllHooks;
        let _id_decorators;
        let _id_initializers = [];
        let _id_extraInitializers = [];
        var DirA = _classThis = class extends _classSuper {
            constructor() {
                super(...arguments);
                this.id = __runInitializers(this, _id_initializers, 0);
                __runInitializers(this, _id_extraInitializers);
            }
        };
        __setFunctionName(_classThis, "DirA");
        (() => {
            var _a;
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
            _id_decorators = [(0, core_1.Input)('a')];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            DirA = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return DirA = _classThis;
    })();
    let DirB = (() => {
        let _classDecorators = [(0, core_1.Directive)({
                selector: 'div',
                standalone: false,
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _classSuper = AllHooks;
        let _id_decorators;
        let _id_initializers = [];
        let _id_extraInitializers = [];
        var DirB = _classThis = class extends _classSuper {
            constructor() {
                super(...arguments);
                this.id = __runInitializers(this, _id_initializers, 0);
                __runInitializers(this, _id_extraInitializers);
            }
        };
        __setFunctionName(_classThis, "DirB");
        (() => {
            var _a;
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
            _id_decorators = [(0, core_1.Input)('b')];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            DirB = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return DirB = _classThis;
    })();
    let DirC = (() => {
        let _classDecorators = [(0, core_1.Directive)({
                selector: 'div',
                standalone: false,
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _classSuper = AllHooks;
        let _id_decorators;
        let _id_initializers = [];
        let _id_extraInitializers = [];
        var DirC = _classThis = class extends _classSuper {
            constructor() {
                super(...arguments);
                this.id = __runInitializers(this, _id_initializers, 0);
                __runInitializers(this, _id_extraInitializers);
            }
        };
        __setFunctionName(_classThis, "DirC");
        (() => {
            var _a;
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
            _id_decorators = [(0, core_1.Input)('c')];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            DirC = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return DirC = _classThis;
    })();
    let AppComp = (() => {
        let _classDecorators = [(0, core_1.Component)({
                selector: 'app-comp',
                template: '<div [a]="1" [b]="2" [c]="3"></div>',
                standalone: false,
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var AppComp = _classThis = class {
        };
        __setFunctionName(_classThis, "AppComp");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AppComp = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return AppComp = _classThis;
    })();
    testing_1.TestBed.configureTestingModule({ declarations: [AppComp, DirA, DirB, DirC] });
    const fixture = testing_1.TestBed.createComponent(AppComp);
    fixture.detectChanges();
    expect(log).toEqual([
        'onChanges1',
        'onInit1',
        'doCheck1',
        'onChanges2',
        'onInit2',
        'doCheck2',
        'onChanges3',
        'onInit3',
        'doCheck3',
        'afterContentInit1',
        'afterContentChecked1',
        'afterContentInit2',
        'afterContentChecked2',
        'afterContentInit3',
        'afterContentChecked3',
        'afterViewInit1',
        'afterViewChecked1',
        'afterViewInit2',
        'afterViewChecked2',
        'afterViewInit3',
        'afterViewChecked3',
    ]);
});
it('should call hooks after setting directives inputs', () => {
    let log = [];
    let DirA = (() => {
        let _classDecorators = [(0, core_1.Directive)({
                selector: 'div',
                standalone: false,
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _a_decorators;
        let _a_initializers = [];
        let _a_extraInitializers = [];
        var DirA = _classThis = class {
            ngOnInit() {
                log.push('onInitA' + this.a);
            }
            constructor() {
                this.a = __runInitializers(this, _a_initializers, 0);
                __runInitializers(this, _a_extraInitializers);
            }
        };
        __setFunctionName(_classThis, "DirA");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _a_decorators = [(0, core_1.Input)()];
            __esDecorate(null, null, _a_decorators, { kind: "field", name: "a", static: false, private: false, access: { has: obj => "a" in obj, get: obj => obj.a, set: (obj, value) => { obj.a = value; } }, metadata: _metadata }, _a_initializers, _a_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            DirA = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return DirA = _classThis;
    })();
    let DirB = (() => {
        let _classDecorators = [(0, core_1.Directive)({
                selector: 'div',
                standalone: false,
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _b_decorators;
        let _b_initializers = [];
        let _b_extraInitializers = [];
        var DirB = _classThis = class {
            ngOnInit() {
                log.push('onInitB' + this.b);
            }
            ngDoCheck() {
                log.push('doCheckB' + this.b);
            }
            constructor() {
                this.b = __runInitializers(this, _b_initializers, 0);
                __runInitializers(this, _b_extraInitializers);
            }
        };
        __setFunctionName(_classThis, "DirB");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _b_decorators = [(0, core_1.Input)()];
            __esDecorate(null, null, _b_decorators, { kind: "field", name: "b", static: false, private: false, access: { has: obj => "b" in obj, get: obj => obj.b, set: (obj, value) => { obj.b = value; } }, metadata: _metadata }, _b_initializers, _b_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            DirB = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return DirB = _classThis;
    })();
    let DirC = (() => {
        let _classDecorators = [(0, core_1.Directive)({
                selector: 'div',
                standalone: false,
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _c_decorators;
        let _c_initializers = [];
        let _c_extraInitializers = [];
        var DirC = _classThis = class {
            ngOnInit() {
                log.push('onInitC' + this.c);
            }
            ngDoCheck() {
                log.push('doCheckC' + this.c);
            }
            constructor() {
                this.c = __runInitializers(this, _c_initializers, 0);
                __runInitializers(this, _c_extraInitializers);
            }
        };
        __setFunctionName(_classThis, "DirC");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _c_decorators = [(0, core_1.Input)()];
            __esDecorate(null, null, _c_decorators, { kind: "field", name: "c", static: false, private: false, access: { has: obj => "c" in obj, get: obj => obj.c, set: (obj, value) => { obj.c = value; } }, metadata: _metadata }, _c_initializers, _c_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            DirC = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return DirC = _classThis;
    })();
    let AppComp = (() => {
        let _classDecorators = [(0, core_1.Component)({
                selector: 'app-comp',
                template: '<div [a]="id" [b]="id" [c]="id"></div><div [a]="id" [b]="id" [c]="id"></div>',
                standalone: false,
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var AppComp = _classThis = class {
            constructor() {
                this.id = 0;
            }
        };
        __setFunctionName(_classThis, "AppComp");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AppComp = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return AppComp = _classThis;
    })();
    testing_1.TestBed.configureTestingModule({ declarations: [AppComp, DirA, DirB, DirC] });
    const fixture = testing_1.TestBed.createComponent(AppComp);
    fixture.detectChanges();
    expect(log).toEqual([
        'onInitA0',
        'onInitB0',
        'doCheckB0',
        'onInitC0',
        'doCheckC0',
        'onInitA0',
        'onInitB0',
        'doCheckB0',
        'onInitC0',
        'doCheckC0',
    ]);
    log = [];
    fixture.componentInstance.id = 1;
    fixture.detectChanges();
    expect(log).toEqual(['doCheckB1', 'doCheckC1', 'doCheckB1', 'doCheckC1']);
});
describe('onInit', () => {
    it('should call onInit after inputs are the first time', () => {
        const input1Values = [];
        const input2Values = [];
        let MyComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-comp',
                    template: `<p>test</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _input1_decorators;
            let _input1_initializers = [];
            let _input1_extraInitializers = [];
            let _input2_decorators;
            let _input2_initializers = [];
            let _input2_extraInitializers = [];
            var MyComponent = _classThis = class {
                ngOnInit() {
                    input1Values.push(this.input1);
                    input2Values.push(this.input2);
                }
                constructor() {
                    this.input1 = __runInitializers(this, _input1_initializers, '');
                    this.input2 = (__runInitializers(this, _input1_extraInitializers), __runInitializers(this, _input2_initializers, ''));
                    __runInitializers(this, _input2_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "MyComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _input1_decorators = [(0, core_1.Input)()];
                _input2_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _input1_decorators, { kind: "field", name: "input1", static: false, private: false, access: { has: obj => "input1" in obj, get: obj => obj.input1, set: (obj, value) => { obj.input1 = value; } }, metadata: _metadata }, _input1_initializers, _input1_extraInitializers);
                __esDecorate(null, null, _input2_decorators, { kind: "field", name: "input2", static: false, private: false, access: { has: obj => "input2" in obj, get: obj => obj.input2, set: (obj, value) => { obj.input2 = value; } }, metadata: _metadata }, _input2_initializers, _input2_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyComponent = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <my-comp [input1]="value1" [input2]="value2"></my-comp>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.value1 = 'a';
                    this.value2 = 'b';
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, MyComponent],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(input1Values).toEqual(['a']);
        expect(input2Values).toEqual(['b']);
        fixture.componentInstance.value1 = 'c';
        fixture.componentInstance.value2 = 'd';
        fixture.detectChanges();
        // Shouldn't be called again just because change detection ran.
        expect(input1Values).toEqual(['a']);
        expect(input2Values).toEqual(['b']);
    });
    it('should be called on root component', () => {
        let onInitCalled = 0;
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: ``,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                ngOnInit() {
                    onInitCalled++;
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(onInitCalled).toBe(1);
    });
    it('should call parent onInit before it calls child onInit', () => {
        const initCalls = [];
        let ChildComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: `child-comp`,
                    template: `<p>child</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ChildComp = _classThis = class {
                ngOnInit() {
                    initCalls.push('child');
                }
            };
            __setFunctionName(_classThis, "ChildComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ChildComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ChildComp = _classThis;
        })();
        let ParentComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<child-comp></child-comp>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ParentComp = _classThis = class {
                ngOnInit() {
                    initCalls.push('parent');
                }
            };
            __setFunctionName(_classThis, "ParentComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ParentComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ParentComp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            declarations: [ParentComp, ChildComp],
        });
        const fixture = testing_1.TestBed.createComponent(ParentComp);
        fixture.detectChanges();
        expect(initCalls).toEqual(['parent', 'child']);
    });
    it('should call all parent onInits across view before calling children onInits', () => {
        const initCalls = [];
        let ChildComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: `child-comp`,
                    template: `<p>child</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var ChildComp = _classThis = class {
                ngOnInit() {
                    initCalls.push(`child of parent ${this.name}`);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "ChildComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ChildComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ChildComp = _classThis;
        })();
        let ParentComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'parent-comp',
                    template: `<child-comp [name]="name"></child-comp>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var ParentComp = _classThis = class {
                ngOnInit() {
                    initCalls.push(`parent ${this.name}`);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "ParentComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ParentComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ParentComp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <parent-comp name="1"></parent-comp>
        <parent-comp name="2"></parent-comp>
      `,
                    standalone: false,
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, ParentComp, ChildComp],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(initCalls).toEqual(['parent 1', 'parent 2', 'child of parent 1', 'child of parent 2']);
    });
    it('should call onInit every time a new view is created (if block)', () => {
        let onInitCalls = 0;
        let MyComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-comp',
                    template: '<p>test</p>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyComp = _classThis = class {
                ngOnInit() {
                    onInitCalls++;
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
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <div *ngIf="show"><my-comp></my-comp></div>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.show = true;
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, MyComp],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(onInitCalls).toBe(1);
        fixture.componentInstance.show = false;
        fixture.detectChanges();
        expect(onInitCalls).toBe(1);
        fixture.componentInstance.show = true;
        fixture.detectChanges();
        expect(onInitCalls).toBe(2);
    });
    it('should call onInit for children of dynamically created components', () => {
        let MyComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-comp',
                    template: '<p>test</p>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyComp = _classThis = class {
                constructor() {
                    this.onInitCalled = false;
                }
                ngOnInit() {
                    this.onInitCalled = true;
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
        let DynamicComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'dynamic-comp',
                    template: `
        <my-comp></my-comp>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var DynamicComp = _classThis = class {
            };
            __setFunctionName(_classThis, "DynamicComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DynamicComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DynamicComp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <div #container></div>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _viewContainerRef_decorators;
            let _viewContainerRef_initializers = [];
            let _viewContainerRef_extraInitializers = [];
            var App = _classThis = class {
                createDynamicView() {
                    this.viewContainerRef.createComponent(DynamicComp);
                }
                constructor() {
                    this.viewContainerRef = __runInitializers(this, _viewContainerRef_initializers, void 0);
                    __runInitializers(this, _viewContainerRef_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _viewContainerRef_decorators = [(0, core_1.ViewChild)('container', { read: core_1.ViewContainerRef })];
                __esDecorate(null, null, _viewContainerRef_decorators, { kind: "field", name: "viewContainerRef", static: false, private: false, access: { has: obj => "viewContainerRef" in obj, get: obj => obj.viewContainerRef, set: (obj, value) => { obj.viewContainerRef = value; } }, metadata: _metadata }, _viewContainerRef_initializers, _viewContainerRef_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [App, MyComp, DynamicComp] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        fixture.componentInstance.createDynamicView();
        fixture.detectChanges();
        const myComp = fixture.debugElement.query(platform_browser_1.By.directive(MyComp)).componentInstance;
        expect(myComp.onInitCalled).toBe(true);
    });
    it('should call onInit in hosts before their content children', () => {
        const initialized = [];
        let Projected = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'projected',
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Projected = _classThis = class {
                ngOnInit() {
                    initialized.push('projected');
                }
            };
            __setFunctionName(_classThis, "Projected");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Projected = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Projected = _classThis;
        })();
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp',
                    template: `<ng-content></ng-content>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Comp = _classThis = class {
                ngOnInit() {
                    initialized.push('comp');
                }
            };
            __setFunctionName(_classThis, "Comp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Comp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Comp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <comp>
          <projected></projected>
        </comp>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                ngOnInit() {
                    initialized.push('app');
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Comp, Projected],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(initialized).toEqual(['app', 'comp', 'projected']);
    });
    it('should call onInit in host and its content children before next host', () => {
        const initialized = [];
        let Projected = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'projected',
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Projected = _classThis = class {
                ngOnInit() {
                    initialized.push('projected ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Projected");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Projected = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Projected = _classThis;
        })();
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp',
                    template: `<ng-content></ng-content>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Comp = _classThis = class {
                ngOnInit() {
                    initialized.push('comp ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Comp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Comp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Comp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <comp name="1">
          <projected name="1"></projected>
        </comp>
        <comp name="2">
          <projected name="2"></projected>
        </comp>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                ngOnInit() {
                    initialized.push('app');
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Comp, Projected],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(initialized).toEqual(['app', 'comp 1', 'projected 1', 'comp 2', 'projected 2']);
    });
    it('should be called on directives after component by default', () => {
        const initialized = [];
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Dir = _classThis = class {
                ngOnInit() {
                    initialized.push('dir ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)('dir-name')];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp',
                    template: `<p></p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Comp = _classThis = class {
                ngOnInit() {
                    initialized.push('comp ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Comp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Comp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Comp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <comp name="1" dir dir-name="1"></comp>
        <comp name="2" dir dir-name="2"></comp>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                ngOnInit() {
                    initialized.push('app');
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Comp, Dir],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(initialized).toEqual(['app', 'comp 1', 'dir 1', 'comp 2', 'dir 2']);
    });
    it('should be called on multiple directives in injection order', () => {
        const events = [];
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _dir_decorators;
            let _dir_initializers = [];
            let _dir_extraInitializers = [];
            var Dir = _classThis = class {
                ngOnInit() {
                    events.push('dir');
                }
                constructor() {
                    this.dir = __runInitializers(this, _dir_initializers, '');
                    __runInitializers(this, _dir_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _dir_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        let InjectionDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[injectionDir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _injectionDir_decorators;
            let _injectionDir_initializers = [];
            let _injectionDir_extraInitializers = [];
            var InjectionDir = _classThis = class {
                constructor(dir) {
                    this.dir = dir;
                    this.injectionDir = __runInitializers(this, _injectionDir_initializers, '');
                    __runInitializers(this, _injectionDir_extraInitializers);
                    this.dir = dir;
                }
                ngOnInit() {
                    events.push('injectionDir');
                }
            };
            __setFunctionName(_classThis, "InjectionDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _injectionDir_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _injectionDir_decorators, { kind: "field", name: "injectionDir", static: false, private: false, access: { has: obj => "injectionDir" in obj, get: obj => obj.injectionDir, set: (obj, value) => { obj.injectionDir = value; } }, metadata: _metadata }, _injectionDir_initializers, _injectionDir_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                InjectionDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return InjectionDir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<div [injectionDir]="val" [dir]="val"></div>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.val = 'a';
                }
                ngOnInit() {
                    events.push('app');
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, InjectionDir, Dir],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(events).toEqual(['app', 'dir', 'injectionDir']);
    });
    it('should be called on directives before component if component injects directives', () => {
        const initialized = [];
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Dir = _classThis = class {
                ngOnInit() {
                    initialized.push('dir ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)('dir-name')];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp',
                    template: `<p></p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Comp = _classThis = class {
                constructor(dir) {
                    this.dir = dir;
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                    this.dir = dir;
                }
                ngOnInit() {
                    initialized.push('comp ' + this.name);
                }
            };
            __setFunctionName(_classThis, "Comp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Comp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Comp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <comp name="1" dir dir-name="1"></comp>
        <comp name="2" dir dir-name="2"></comp>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                ngOnInit() {
                    initialized.push('app');
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Comp, Dir],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(initialized).toEqual(['app', 'dir 1', 'comp 1', 'dir 2', 'comp 2']);
    });
    it('should be called on directives on an element', () => {
        const initialized = [];
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Dir = _classThis = class {
                ngOnInit() {
                    initialized.push('dir ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)('dir-name')];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <p name="1" dir dir-name="1"></p>
        <p name="2" dir dir-name="2"></p>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                ngOnInit() {
                    initialized.push('app');
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Dir],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(initialized).toEqual(['app', 'dir 1', 'dir 2']);
    });
    it('should call onInit properly in for loop', () => {
        const initialized = [];
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp',
                    template: `<p></p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Comp = _classThis = class {
                ngOnInit() {
                    initialized.push('comp ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Comp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Comp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Comp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <comp name="0"></comp>
        <comp *ngFor="let number of numbers" [name]="number"></comp>
        <comp name="1"></comp>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.numbers = [2, 3, 4, 5, 6];
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Comp],
            imports: [common_1.CommonModule],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(initialized).toEqual([
            'comp 0',
            'comp 1',
            'comp 2',
            'comp 3',
            'comp 4',
            'comp 5',
            'comp 6',
        ]);
    });
    it('should call onInit properly in for loop with children', () => {
        const initialized = [];
        let Child = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'child',
                    template: `<p></p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Child = _classThis = class {
                ngOnInit() {
                    initialized.push('child of parent ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Child");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Child = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Child = _classThis;
        })();
        let Parent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'parent',
                    template: '<child [name]="name"></child>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Parent = _classThis = class {
                ngOnInit() {
                    initialized.push('parent ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Parent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Parent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Parent = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <parent name="0"></parent>
        <parent *ngFor="let number of numbers" [name]="number"></parent>
        <parent name="1"></parent>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.numbers = [2, 3, 4, 5, 6];
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Child, Parent],
            imports: [common_1.CommonModule],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(initialized).toEqual([
            // First the two root level components
            'parent 0',
            'parent 1',
            // Then our 5 embedded views
            'parent 2',
            'child of parent 2',
            'parent 3',
            'child of parent 3',
            'parent 4',
            'child of parent 4',
            'parent 5',
            'child of parent 5',
            'parent 6',
            'child of parent 6',
            // Then the children of the root level components
            'child of parent 0',
            'child of parent 1',
        ]);
    });
});
describe('doCheck', () => {
    it('should call doCheck on every refresh', () => {
        let doCheckCalled = 0;
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: ``,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                ngDoCheck() {
                    doCheckCalled++;
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(doCheckCalled).toBe(1);
        fixture.detectChanges();
        expect(doCheckCalled).toBe(2);
    });
    it('should call parent doCheck before child doCheck', () => {
        const doChecks = [];
        let Parent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'parent',
                    template: `<child></child>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Parent = _classThis = class {
                ngDoCheck() {
                    doChecks.push('parent');
                }
            };
            __setFunctionName(_classThis, "Parent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Parent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Parent = _classThis;
        })();
        let Child = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'child',
                    template: ``,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Child = _classThis = class {
                ngDoCheck() {
                    doChecks.push('child');
                }
            };
            __setFunctionName(_classThis, "Child");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Child = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Child = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<parent></parent>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                ngDoCheck() {
                    doChecks.push('app');
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Parent, Child],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(doChecks).toEqual(['app', 'parent', 'child']);
    });
    it('should call ngOnInit before ngDoCheck if creation mode', () => {
        const events = [];
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: ``,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                ngOnInit() {
                    events.push('onInit');
                }
                ngDoCheck() {
                    events.push('doCheck');
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(events).toEqual(['onInit', 'doCheck']);
    });
    it('should be called on directives after component by default', () => {
        const doChecks = [];
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Dir = _classThis = class {
                ngDoCheck() {
                    doChecks.push('dir ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)('dir')];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp',
                    template: `<p>test</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Comp = _classThis = class {
                ngDoCheck() {
                    doChecks.push('comp ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Comp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Comp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Comp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
      <comp name="1" dir="1"></comp>
      <comp name="2" dir="2"></comp>
    `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                ngDoCheck() {
                    doChecks.push('app');
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Comp, Dir],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(doChecks).toEqual(['app', 'comp 1', 'dir 1', 'comp 2', 'dir 2']);
    });
    it('should be called on directives before component if component injects directives', () => {
        const doChecks = [];
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Dir = _classThis = class {
                ngDoCheck() {
                    doChecks.push('dir ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)('dir')];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp',
                    template: `<p>test</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Comp = _classThis = class {
                constructor(dir) {
                    this.dir = dir;
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                    this.dir = dir;
                }
                ngDoCheck() {
                    doChecks.push('comp ' + this.name);
                }
            };
            __setFunctionName(_classThis, "Comp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Comp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Comp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
      <comp name="1" dir="1"></comp>
      <comp name="2" dir="2"></comp>
    `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                ngDoCheck() {
                    doChecks.push('app');
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Comp, Dir],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(doChecks).toEqual(['app', 'dir 1', 'comp 1', 'dir 2', 'comp 2']);
    });
    it('should be called on multiple directives in injection order', () => {
        const events = [];
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _dir_decorators;
            let _dir_initializers = [];
            let _dir_extraInitializers = [];
            var Dir = _classThis = class {
                ngDoCheck() {
                    events.push('dir');
                }
                constructor() {
                    this.dir = __runInitializers(this, _dir_initializers, '');
                    __runInitializers(this, _dir_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _dir_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        let InjectionDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[injectionDir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _injectionDir_decorators;
            let _injectionDir_initializers = [];
            let _injectionDir_extraInitializers = [];
            var InjectionDir = _classThis = class {
                constructor(dir) {
                    this.dir = dir;
                    this.injectionDir = __runInitializers(this, _injectionDir_initializers, '');
                    __runInitializers(this, _injectionDir_extraInitializers);
                    this.dir = dir;
                }
                ngDoCheck() {
                    events.push('injectionDir');
                }
            };
            __setFunctionName(_classThis, "InjectionDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _injectionDir_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _injectionDir_decorators, { kind: "field", name: "injectionDir", static: false, private: false, access: { has: obj => "injectionDir" in obj, get: obj => obj.injectionDir, set: (obj, value) => { obj.injectionDir = value; } }, metadata: _metadata }, _injectionDir_initializers, _injectionDir_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                InjectionDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return InjectionDir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<div [injectionDir]="val" [dir]="val"></div>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.val = 'a';
                }
                ngDoCheck() {
                    events.push('app');
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, InjectionDir, Dir],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(events).toEqual(['app', 'dir', 'injectionDir']);
    });
    it('should be called on directives on an element', () => {
        const doChecks = [];
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Dir = _classThis = class {
                ngDoCheck() {
                    doChecks.push('dir ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)('dir')];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <p dir="1"></p>
        <p dir="2"></p>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                ngDoCheck() {
                    doChecks.push('app');
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Dir],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(doChecks).toEqual(['app', 'dir 1', 'dir 2']);
    });
});
describe('afterContentinit', () => {
    it('should be called only in creation mode', () => {
        let afterContentInitCalls = 0;
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp',
                    template: `<p>test</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Comp = _classThis = class {
                ngAfterContentInit() {
                    afterContentInitCalls++;
                }
            };
            __setFunctionName(_classThis, "Comp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Comp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Comp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<comp></comp>`,
                    standalone: false,
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Comp],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        // two updates
        fixture.detectChanges();
        fixture.detectChanges();
        expect(afterContentInitCalls).toBe(1);
    });
    it('should be called on root component in creation mode', () => {
        let afterContentInitCalls = 0;
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<p>test</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                ngAfterContentInit() {
                    afterContentInitCalls++;
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        // two updates
        fixture.detectChanges();
        fixture.detectChanges();
        expect(afterContentInitCalls).toBe(1);
    });
    it('should be called on every create ngIf', () => {
        const events = [];
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp',
                    template: `<p>test</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Comp = _classThis = class {
                ngAfterContentInit() {
                    events.push('comp afterContentInit');
                }
            };
            __setFunctionName(_classThis, "Comp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Comp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Comp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<comp *ngIf="show"></comp>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.show = true;
                }
                ngAfterContentInit() {
                    events.push('app afterContentInit');
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Comp],
            imports: [common_1.CommonModule],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(events).toEqual(['app afterContentInit', 'comp afterContentInit']);
        fixture.componentInstance.show = false;
        fixture.detectChanges();
        expect(events).toEqual(['app afterContentInit', 'comp afterContentInit']);
        fixture.componentInstance.show = true;
        fixture.detectChanges();
        expect(events).toEqual([
            'app afterContentInit',
            'comp afterContentInit',
            'comp afterContentInit',
        ]);
    });
    it('should be called in parents before children', () => {
        const events = [];
        let Parent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'parent',
                    template: `<child [name]="name"></child>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Parent = _classThis = class {
                ngAfterContentInit() {
                    events.push('parent ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Parent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Parent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Parent = _classThis;
        })();
        let Child = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'child',
                    template: `<p>test</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Child = _classThis = class {
                ngAfterContentInit() {
                    events.push('child of parent ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Child");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Child = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Child = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
      <parent name="1"></parent>
      <parent name="2"></parent>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                ngAfterContentInit() {
                    events.push('app');
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Parent, Child],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(events).toEqual([
            'app',
            'parent 1',
            'parent 2',
            'child of parent 1',
            'child of parent 2',
        ]);
    });
    it('should be called in projected components before their hosts', () => {
        const events = [];
        let ProjectedChild = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'projected-child',
                    template: `<p>test</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var ProjectedChild = _classThis = class {
                ngAfterContentInit() {
                    events.push('projected child ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "ProjectedChild");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ProjectedChild = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ProjectedChild = _classThis;
        })();
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp',
                    template: `<div><ng-content></ng-content></div>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Comp = _classThis = class {
                ngAfterContentInit() {
                    events.push('comp ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Comp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Comp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Comp = _classThis;
        })();
        let Projected = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'projected',
                    template: `<projected-child [name]=name></projected-child>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Projected = _classThis = class {
                ngAfterContentInit() {
                    events.push('projected ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Projected");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Projected = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Projected = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <comp name="1">
          <projected name="1"></projected>
          <projected name="2"></projected>
        </comp>
        <comp name="2">
          <projected name="3"></projected>
          <projected name="4"></projected>
        </comp>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                ngAfterContentInit() {
                    events.push('app');
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Comp, Projected, ProjectedChild],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(events).toEqual([
            // root
            'app',
            // projections of comp 1
            'projected 1',
            'projected 2',
            // comp 1
            'comp 1',
            // projections of comp 2
            'projected 3',
            'projected 4',
            // comp 2
            'comp 2',
            // children of projections
            'projected child 1',
            'projected child 2',
            'projected child 3',
            'projected child 4',
        ]);
    });
    it('should be called in correct order in a for loop', () => {
        const events = [];
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp',
                    template: `<p>test</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Comp = _classThis = class {
                ngAfterContentInit() {
                    events.push('comp ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Comp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Comp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Comp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <comp name="4"></comp>
        <comp *ngFor="let number of numbers" [name]="number"></comp>
        <comp name="5"></comp>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.numbers = [0, 1, 2, 3];
                }
                ngAfterContentInit() {
                    events.push('app');
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Comp],
            imports: [common_1.CommonModule],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(events).toEqual(['app', 'comp 0', 'comp 1', 'comp 2', 'comp 3', 'comp 4', 'comp 5']);
    });
    it('should be called in correct order in a for loop with children', () => {
        const events = [];
        let Parent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'parent',
                    template: `<child [name]=name></child>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Parent = _classThis = class {
                ngAfterContentInit() {
                    events.push('parent ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Parent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Parent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Parent = _classThis;
        })();
        let Child = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'child',
                    template: `<p>test</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Child = _classThis = class {
                ngAfterContentInit() {
                    events.push('child of parent ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Child");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Child = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Child = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <parent name="4"></parent>
        <parent *ngFor="let number of numbers" [name]="number"></parent>
        <parent name="5"></parent>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.numbers = [0, 1, 2, 3];
                }
                ngAfterContentInit() {
                    events.push('app');
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Parent, Child],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(events).toEqual([
            // root
            'app',
            // 4 embedded views
            'parent 0',
            'child of parent 0',
            'parent 1',
            'child of parent 1',
            'parent 2',
            'child of parent 2',
            'parent 3',
            'child of parent 3',
            // root children
            'parent 4',
            'parent 5',
            // children of root children
            'child of parent 4',
            'child of parent 5',
        ]);
    });
    it('should be called on directives after component', () => {
        const events = [];
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Dir = _classThis = class {
                ngAfterContentInit() {
                    events.push('dir ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)('dir')];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp',
                    template: `<p>test</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Comp = _classThis = class {
                ngAfterContentInit() {
                    events.push('comp ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Comp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Comp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Comp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <comp name="1" dir="1"></comp>
        <comp name="2" dir="2"></comp>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                ngAfterContentInit() {
                    events.push('app');
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Comp, Dir],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(events).toEqual(['app', 'comp 1', 'dir 1', 'comp 2', 'dir 2']);
    });
});
describe('afterContentChecked', () => {
    it('should be called every change detection run after afterContentInit', () => {
        const events = [];
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp',
                    template: `<p>test</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Comp = _classThis = class {
                ngAfterContentInit() {
                    events.push('comp afterContentInit');
                }
                ngAfterContentChecked() {
                    events.push('comp afterContentChecked');
                }
            };
            __setFunctionName(_classThis, "Comp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Comp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Comp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<comp></comp>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                ngAfterContentInit() {
                    events.push('app afterContentInit');
                }
                ngAfterContentChecked() {
                    events.push('app afterContentChecked');
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Comp],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(events).toEqual([
            'app afterContentInit',
            'app afterContentChecked',
            'comp afterContentInit',
            'comp afterContentChecked',
        ]);
    });
});
describe('afterViewInit', () => {
    it('should be called on creation and not in update mode', () => {
        let afterViewInitCalls = 0;
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp',
                    template: `<p>test</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Comp = _classThis = class {
                ngAfterViewInit() {
                    afterViewInitCalls++;
                }
            };
            __setFunctionName(_classThis, "Comp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Comp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Comp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<comp></comp>`,
                    standalone: false,
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Comp],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        // two updates
        fixture.detectChanges();
        fixture.detectChanges();
        expect(afterViewInitCalls).toBe(1);
    });
    it('should be called on root component in creation mode', () => {
        let afterViewInitCalls = 0;
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<p>test</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                ngAfterViewInit() {
                    afterViewInitCalls++;
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        // two updates
        fixture.detectChanges();
        fixture.detectChanges();
        expect(afterViewInitCalls).toBe(1);
    });
    it('should be called every time a view is initialized with ngIf', () => {
        const events = [];
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp',
                    template: `<p>test</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Comp = _classThis = class {
                ngAfterViewInit() {
                    events.push('comp');
                }
            };
            __setFunctionName(_classThis, "Comp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Comp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Comp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<comp *ngIf="show"></comp>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.show = true;
                }
                ngAfterViewInit() {
                    events.push('app');
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Comp],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(events).toEqual(['comp', 'app']);
        fixture.componentInstance.show = false;
        fixture.detectChanges();
        expect(events).toEqual(['comp', 'app']);
        fixture.componentInstance.show = true;
        fixture.detectChanges();
        expect(events).toEqual(['comp', 'app', 'comp']);
    });
    it('should be called in children before parents', () => {
        const events = [];
        let Parent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'parent',
                    template: `<child [name]=name></child>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Parent = _classThis = class {
                ngAfterViewInit() {
                    events.push('parent ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Parent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Parent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Parent = _classThis;
        })();
        let Child = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'child',
                    template: `<p>test</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Child = _classThis = class {
                ngAfterViewInit() {
                    events.push('child of parent ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Child");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Child = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Child = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <parent name="1"></parent>
        <parent name="2"></parent>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                ngAfterViewInit() {
                    events.push('app');
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Parent, Child],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(events).toEqual([
            'child of parent 1',
            'child of parent 2',
            'parent 1',
            'parent 2',
            'app',
        ]);
    });
    it('should be called in projected components before their hosts', () => {
        const events = [];
        let Projected = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'projected',
                    template: `<p>test</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Projected = _classThis = class {
                ngAfterViewInit() {
                    events.push('projected ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Projected");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Projected = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Projected = _classThis;
        })();
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp',
                    template: `<ng-content></ng-content>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Comp = _classThis = class {
                ngAfterViewInit() {
                    events.push('comp ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Comp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Comp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Comp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <comp name="1"><projected name="1"></projected></comp>
        <comp name="2"><projected name="2"></projected></comp>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                ngAfterViewInit() {
                    events.push('app');
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Comp, Projected],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(events).toEqual(['projected 1', 'comp 1', 'projected 2', 'comp 2', 'app']);
    });
    it('should call afterViewInit in content children and host before next host', () => {
        const events = [];
        let ProjectedChild = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'projected-child',
                    template: `<p>test</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var ProjectedChild = _classThis = class {
                ngAfterViewInit() {
                    events.push('child of projected ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "ProjectedChild");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ProjectedChild = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ProjectedChild = _classThis;
        })();
        let Projected = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'projected',
                    template: `<projected-child [name]="name"></projected-child>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Projected = _classThis = class {
                ngAfterViewInit() {
                    events.push('projected ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Projected");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Projected = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Projected = _classThis;
        })();
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp',
                    template: `<div><ng-content></ng-content></div>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Comp = _classThis = class {
                ngAfterViewInit() {
                    events.push('comp ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Comp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Comp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Comp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <comp name="1"><projected name="1"></projected></comp>
        <comp name="2"><projected name="2"></projected></comp>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                ngAfterViewInit() {
                    events.push('app');
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Comp, Projected, ProjectedChild],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(events).toEqual([
            'child of projected 1',
            'child of projected 2',
            'projected 1',
            'comp 1',
            'projected 2',
            'comp 2',
            'app',
        ]);
    });
    it('should be called in correct order with ngFor', () => {
        const events = [];
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp',
                    template: `<p>test</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Comp = _classThis = class {
                ngAfterViewInit() {
                    events.push('comp ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Comp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Comp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Comp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <comp name="4"></comp>
        <comp *ngFor="let number of numbers" [name]="number"></comp>
        <comp name="5"></comp>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.numbers = [0, 1, 2, 3];
                }
                ngAfterViewInit() {
                    events.push('app');
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Comp],
            imports: [common_1.CommonModule],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(events).toEqual(['comp 0', 'comp 1', 'comp 2', 'comp 3', 'comp 4', 'comp 5', 'app']);
    });
    it('should be called in correct order with for loops with children', () => {
        const events = [];
        let Child = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'child',
                    template: `<p>test</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Child = _classThis = class {
                ngAfterViewInit() {
                    events.push('child of parent ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Child");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Child = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Child = _classThis;
        })();
        let Parent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'parent',
                    template: `<child [name]="name"></child>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Parent = _classThis = class {
                ngAfterViewInit() {
                    events.push('parent ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Parent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Parent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Parent = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <parent name="4"></parent>
        <parent *ngFor="let number of numbers" [name]="number"></parent>
        <parent name="5"></parent>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.numbers = [0, 1, 2, 3];
                }
                ngAfterViewInit() {
                    events.push('app');
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Parent, Child],
            imports: [common_1.CommonModule],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(events).toEqual([
            'child of parent 0',
            'parent 0',
            'child of parent 1',
            'parent 1',
            'child of parent 2',
            'parent 2',
            'child of parent 3',
            'parent 3',
            'child of parent 4',
            'child of parent 5',
            'parent 4',
            'parent 5',
            'app',
        ]);
    });
    it('should be called on directives after component', () => {
        const events = [];
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Dir = _classThis = class {
                ngAfterViewInit() {
                    events.push('dir ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)('dir')];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp',
                    template: `<p>test</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Comp = _classThis = class {
                ngAfterViewInit() {
                    events.push('comp ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Comp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Comp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Comp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <comp name="1" dir="1"></comp>
        <comp name="2" dir="2"></comp>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                ngAfterViewInit() {
                    events.push('app');
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Comp, Dir],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(events).toEqual(['comp 1', 'dir 1', 'comp 2', 'dir 2', 'app']);
    });
    it('should be called on directives on an element', () => {
        const events = [];
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Dir = _classThis = class {
                ngAfterViewInit() {
                    events.push('dir ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)('dir')];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <div dir="1"></div>
        <div dir="2"></div>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                ngAfterViewInit() {
                    events.push('app');
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Dir],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(events).toEqual(['dir 1', 'dir 2', 'app']);
    });
});
describe('afterViewChecked', () => {
    it('should call ngAfterViewChecked every update', () => {
        let afterViewCheckedCalls = 0;
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp',
                    template: `<p>test</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Comp = _classThis = class {
                ngAfterViewChecked() {
                    afterViewCheckedCalls++;
                }
            };
            __setFunctionName(_classThis, "Comp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Comp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Comp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<comp></comp>`,
                    standalone: false,
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Comp],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(afterViewCheckedCalls).toBe(1);
        fixture.detectChanges();
        expect(afterViewCheckedCalls).toBe(2);
        fixture.detectChanges();
        expect(afterViewCheckedCalls).toBe(3);
    });
    it('should be called on root component', () => {
        let afterViewCheckedCalls = 0;
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<p>test</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                ngAfterViewChecked() {
                    afterViewCheckedCalls++;
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(afterViewCheckedCalls).toBe(1);
        fixture.detectChanges();
        expect(afterViewCheckedCalls).toBe(2);
        fixture.detectChanges();
        expect(afterViewCheckedCalls).toBe(3);
    });
    it('should call ngAfterViewChecked with bindings', () => {
        let afterViewCheckedCalls = 0;
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp',
                    template: `<p>{{value}}</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _value_decorators;
            let _value_initializers = [];
            let _value_extraInitializers = [];
            var Comp = _classThis = class {
                ngAfterViewChecked() {
                    afterViewCheckedCalls++;
                }
                constructor() {
                    this.value = __runInitializers(this, _value_initializers, '');
                    __runInitializers(this, _value_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Comp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _value_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Comp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Comp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<comp [value]="value"></comp>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.value = 1;
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Comp],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(afterViewCheckedCalls).toBe(1);
        fixture.componentInstance.value = 1337;
        fixture.detectChanges();
        expect(afterViewCheckedCalls).toBe(2);
    });
    it('should be called in correct order with for loops with children', () => {
        const events = [];
        let Child = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'child',
                    template: `<p>test</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Child = _classThis = class {
                ngAfterViewChecked() {
                    events.push('child of parent ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Child");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Child = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Child = _classThis;
        })();
        let Parent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'parent',
                    template: `<child [name]="name"></child>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Parent = _classThis = class {
                ngAfterViewChecked() {
                    events.push('parent ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Parent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Parent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Parent = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
      <parent name="4"></parent>
      <parent *ngFor="let number of numbers" [name]="number"></parent>
      <parent name="5"></parent>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.numbers = [0, 1, 2, 3];
                }
                ngAfterViewChecked() {
                    events.push('app');
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Parent, Child],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(events).toEqual([
            'child of parent 0',
            'parent 0',
            'child of parent 1',
            'parent 1',
            'child of parent 2',
            'parent 2',
            'child of parent 3',
            'parent 3',
            'child of parent 4',
            'child of parent 5',
            'parent 4',
            'parent 5',
            'app',
        ]);
    });
    it('should be called on directives after component', () => {
        const events = [];
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Dir = _classThis = class {
                ngAfterViewChecked() {
                    events.push('dir ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)('dir')];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp',
                    template: `<p>test</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Comp = _classThis = class {
                ngAfterViewChecked() {
                    events.push('comp ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Comp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Comp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Comp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
      <comp name="1" dir="1"></comp>
      <comp name="2" dir="2"></comp>
    `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                ngAfterViewChecked() {
                    events.push('app');
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Comp, Dir],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(events).toEqual(['comp 1', 'dir 1', 'comp 2', 'dir 2', 'app']);
    });
    it('should be called on directives on an element', () => {
        const events = [];
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Dir = _classThis = class {
                ngAfterViewChecked() {
                    events.push('dir ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)('dir')];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
      <div dir="1"></div>
      <div dir="2"></div>
    `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                ngAfterViewChecked() {
                    events.push('app');
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Dir],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(events).toEqual(['dir 1', 'dir 2', 'app']);
    });
});
describe('onDestroy', () => {
    it('should call destroy when view is removed', () => {
        let destroyCalled = 0;
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp',
                    template: `<p>test</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Comp = _classThis = class {
                ngOnDestroy() {
                    destroyCalled++;
                }
            };
            __setFunctionName(_classThis, "Comp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Comp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Comp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<comp *ngIf="show"></comp>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.show = true;
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Comp],
            imports: [common_1.CommonModule],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(destroyCalled).toBe(0);
        fixture.componentInstance.show = false;
        fixture.detectChanges();
        expect(destroyCalled).toBe(1);
        fixture.componentInstance.show = true;
        fixture.detectChanges();
        expect(destroyCalled).toBe(1);
        fixture.componentInstance.show = false;
        fixture.detectChanges();
        expect(destroyCalled).toBe(2);
    });
    it('should call destroy when multiple views are removed', () => {
        const events = [];
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp',
                    template: `<p>test</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Comp = _classThis = class {
                ngOnDestroy() {
                    events.push('comp ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Comp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Comp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Comp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <div *ngIf="show">
          <comp name="1"></comp>
          <comp name="2"></comp>
        </div>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.show = true;
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Comp],
            imports: [common_1.CommonModule],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(events).toEqual([]);
        fixture.componentInstance.show = false;
        fixture.detectChanges();
        expect(events).toEqual(['comp 1', 'comp 2']);
    });
    it('should be called in child components before parent components', () => {
        const events = [];
        let Child = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'child',
                    template: `<p>test</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Child = _classThis = class {
                ngOnDestroy() {
                    events.push('child of parent ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Child");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Child = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Child = _classThis;
        })();
        let Parent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'parent',
                    template: `<child [name]="name"></child>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Parent = _classThis = class {
                ngOnDestroy() {
                    events.push('parent ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Parent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Parent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Parent = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <div *ngIf="show">
          <parent name="1"></parent>
          <parent name="2"></parent>
        </div>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.show = true;
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Parent, Child],
            imports: [common_1.CommonModule],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(events).toEqual([]);
        fixture.componentInstance.show = false;
        fixture.detectChanges();
        expect(events).toEqual(['child of parent 1', 'child of parent 2', 'parent 1', 'parent 2']);
    });
    it('should be called bottom up with children nested 2 levels deep', () => {
        const events = [];
        let Child = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'child',
                    template: `<p>test</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Child = _classThis = class {
                ngOnDestroy() {
                    events.push('child ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Child");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Child = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Child = _classThis;
        })();
        let Parent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'parent',
                    template: `<child [name]="name"></child>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Parent = _classThis = class {
                ngOnDestroy() {
                    events.push('parent ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Parent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Parent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Parent = _classThis;
        })();
        let Grandparent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'grandparent',
                    template: `<parent [name]="name"></parent>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Grandparent = _classThis = class {
                ngOnDestroy() {
                    events.push('grandparent ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Grandparent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Grandparent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Grandparent = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <div *ngIf="show">
          <grandparent name="1"></grandparent>
          <grandparent name="2"></grandparent>
        </div>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.show = true;
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Grandparent, Parent, Child],
            imports: [common_1.CommonModule],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(events).toEqual([]);
        fixture.componentInstance.show = false;
        fixture.detectChanges();
        expect(events).toEqual([
            'child 1',
            'parent 1',
            'child 2',
            'parent 2',
            'grandparent 1',
            'grandparent 2',
        ]);
    });
    it('should be called in projected components before their hosts', () => {
        const events = [];
        let Projected = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'projected',
                    template: `<p>test</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Projected = _classThis = class {
                ngOnDestroy() {
                    events.push('projected ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Projected");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Projected = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Projected = _classThis;
        })();
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp',
                    template: `<div><ng-content></ng-content></div>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Comp = _classThis = class {
                ngOnDestroy() {
                    events.push('comp ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Comp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Comp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Comp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <div *ngIf="show">
          <comp name="1">
            <projected name="1"></projected>
          </comp>
          <comp name="2">
            <projected name="2"></projected>
          </comp>
        </div>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.show = true;
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Comp, Projected],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(events).toEqual([]);
        fixture.componentInstance.show = false;
        fixture.detectChanges();
        expect(events).toEqual(['projected 1', 'comp 1', 'projected 2', 'comp 2']);
    });
    it('should be called in consistent order if views are removed and re-added', () => {
        const events = [];
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp',
                    template: `<p>test</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Comp = _classThis = class {
                ngOnDestroy() {
                    events.push('comp ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Comp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Comp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Comp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
      <div *ngIf="showAll">
        <comp name="1"></comp>
        <comp *ngIf="showMiddle" name="2"></comp>
        <comp name="3"></comp>
      </div>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.showAll = true;
                    this.showMiddle = true;
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Comp],
            imports: [common_1.CommonModule],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(events).toEqual([]);
        fixture.componentInstance.showMiddle = false;
        fixture.detectChanges();
        expect(events).toEqual(['comp 2']);
        fixture.componentInstance.showAll = false;
        fixture.detectChanges();
        expect(events).toEqual(['comp 2', 'comp 1', 'comp 3']);
        fixture.componentInstance.showAll = true;
        fixture.componentInstance.showMiddle = true;
        fixture.detectChanges();
        expect(events).toEqual(['comp 2', 'comp 1', 'comp 3']);
        fixture.componentInstance.showAll = false;
        fixture.detectChanges();
        expect(events).toEqual(['comp 2', 'comp 1', 'comp 3', 'comp 2', 'comp 1', 'comp 3']);
    });
    it('should be called on every iteration of a destroyed for loop', () => {
        const events = [];
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp',
                    template: `<p>test</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Comp = _classThis = class {
                ngOnDestroy() {
                    events.push('comp ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Comp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Comp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Comp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <div *ngIf="show">
          <comp *ngFor="let number of numbers" [name]="number"></comp>
        </div>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.show = true;
                    this.numbers = [0, 1, 2, 3];
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Comp],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(events).toEqual([]);
        fixture.componentInstance.show = false;
        fixture.detectChanges();
        expect(events).toEqual(['comp 0', 'comp 1', 'comp 2', 'comp 3']);
        fixture.componentInstance.show = true;
        fixture.detectChanges();
        expect(events).toEqual(['comp 0', 'comp 1', 'comp 2', 'comp 3']);
        fixture.componentInstance.numbers.splice(1, 1);
        fixture.detectChanges();
        expect(events).toEqual(['comp 0', 'comp 1', 'comp 2', 'comp 3', 'comp 1']);
        fixture.componentInstance.show = false;
        fixture.detectChanges();
        expect(events).toEqual([
            'comp 0',
            'comp 1',
            'comp 2',
            'comp 3',
            'comp 1',
            'comp 0',
            'comp 2',
            'comp 3',
        ]);
    });
    it('should call destroy properly if view also has listeners', () => {
        const events = [];
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp',
                    template: `<p>test</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Comp = _classThis = class {
                ngOnDestroy() {
                    events.push('comp');
                }
            };
            __setFunctionName(_classThis, "Comp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Comp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Comp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <div *ngIf="show">
          <button (click)="handleClick1()">test 1</button>
          <comp></comp>
          <button (click)="handleClick2()">test 2</button>
        </div>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.show = true;
                    this.clicksToButton1 = 0;
                    this.clicksToButton2 = 0;
                }
                handleClick1() {
                    this.clicksToButton1++;
                }
                handleClick2() {
                    this.clicksToButton2++;
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Comp],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        const buttons = fixture.debugElement.queryAll(platform_browser_1.By.css('button'));
        buttons.forEach((button) => button.nativeElement.click());
        expect(fixture.componentInstance.clicksToButton1).toBe(1);
        expect(fixture.componentInstance.clicksToButton2).toBe(1);
        expect(events).toEqual([]);
        fixture.componentInstance.show = false;
        fixture.detectChanges();
        buttons.forEach((button) => button.nativeElement.click());
        expect(fixture.componentInstance.clicksToButton1).toBe(1);
        expect(fixture.componentInstance.clicksToButton2).toBe(1);
        expect(events).toEqual(['comp']);
    });
    it('should not produce errors if change detection is triggered during ngOnDestroy', () => {
        let Child = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'child',
                    template: `<ng-content></ng-content>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Child = _classThis = class {
            };
            __setFunctionName(_classThis, "Child");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Child = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Child = _classThis;
        })();
        let Parent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'parent',
                    template: `<ng-content></ng-content>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _child_decorators;
            let _child_initializers = [];
            let _child_extraInitializers = [];
            var Parent = _classThis = class {
                constructor() {
                    this.child = __runInitializers(this, _child_initializers, void 0);
                    __runInitializers(this, _child_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Parent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _child_decorators = [(0, core_1.ContentChildren)(Child, { descendants: true })];
                __esDecorate(null, null, _child_decorators, { kind: "field", name: "child", static: false, private: false, access: { has: obj => "child" in obj, get: obj => obj.child, set: (obj, value) => { obj.child = value; } }, metadata: _metadata }, _child_initializers, _child_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Parent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Parent = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'app',
                    template: `
        <ng-template #tpl>
          <parent>
            <child></child>
          </parent>
        </ng-template>
        <div #container dir></div>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _container_decorators;
            let _container_initializers = [];
            let _container_extraInitializers = [];
            let _tpl_decorators;
            let _tpl_initializers = [];
            let _tpl_extraInitializers = [];
            var App = _classThis = class {
                ngOnInit() {
                    this.container.createEmbeddedView(this.tpl);
                }
                constructor() {
                    this.container = __runInitializers(this, _container_initializers, void 0);
                    this.tpl = (__runInitializers(this, _container_extraInitializers), __runInitializers(this, _tpl_initializers, void 0));
                    __runInitializers(this, _tpl_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _container_decorators = [(0, core_1.ViewChild)('container', { read: core_1.ViewContainerRef, static: true })];
                _tpl_decorators = [(0, core_1.ViewChild)('tpl', { read: core_1.TemplateRef, static: true })];
                __esDecorate(null, null, _container_decorators, { kind: "field", name: "container", static: false, private: false, access: { has: obj => "container" in obj, get: obj => obj.container, set: (obj, value) => { obj.container = value; } }, metadata: _metadata }, _container_initializers, _container_extraInitializers);
                __esDecorate(null, null, _tpl_decorators, { kind: "field", name: "tpl", static: false, private: false, access: { has: obj => "tpl" in obj, get: obj => obj.tpl, set: (obj, value) => { obj.tpl = value; } }, metadata: _metadata }, _tpl_initializers, _tpl_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Dir = _classThis = class {
                constructor(cdr) {
                    this.cdr = cdr;
                }
                ngOnDestroy() {
                    // Important: calling detectChanges in destroy hook like that
                    // doesn’t have practical purpose, but in real-world cases it might
                    // happen, for example as a result of "focus()" call on a DOM element,
                    // in case ZoneJS is active.
                    this.cdr.detectChanges();
                }
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Parent, Child, Dir],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.autoDetectChanges();
        expect(() => fixture.destroy()).not.toThrow();
    });
    it('should be called on directives after component', () => {
        const events = [];
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Dir = _classThis = class {
                ngOnDestroy() {
                    events.push('dir ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)('dir')];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp',
                    template: `<p>test</p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var Comp = _classThis = class {
                ngOnDestroy() {
                    events.push('comp ' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, '');
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Comp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Comp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Comp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <div *ngIf="show">
          <comp name="1" dir="1"></comp>
          <comp name="2" dir="2"></comp>
        </div>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.show = true;
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Dir, Comp],
            imports: [common_1.CommonModule],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(events).toEqual([]);
        fixture.componentInstance.show = false;
        fixture.detectChanges();
        expect(events).toEqual(['comp 1', 'dir 1', 'comp 2', 'dir 2']);
    });
    it('should be called on directives on an element', () => {
        const events = [];
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Dir = _classThis = class {
                ngOnDestroy() {
                    events.push('dir');
                }
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
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<p *ngIf="show" dir></p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.show = true;
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Dir],
            imports: [common_1.CommonModule],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(events).toEqual([]);
        fixture.componentInstance.show = false;
        fixture.detectChanges();
        expect(events).toEqual(['dir']);
    });
});
describe('hook order', () => {
    let events = [];
    beforeEach(() => (events = []));
    let Comp = (() => {
        let _classDecorators = [(0, core_1.Component)({
                selector: 'comp',
                template: `{{value}}<div><ng-content></ng-content></div>`,
                standalone: false,
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _value_decorators;
        let _value_initializers = [];
        let _value_extraInitializers = [];
        let _name_decorators;
        let _name_initializers = [];
        let _name_extraInitializers = [];
        var Comp = _classThis = class {
            ngOnInit() {
                events.push(`${this.name} onInit`);
            }
            ngDoCheck() {
                events.push(`${this.name} doCheck`);
            }
            ngOnChanges() {
                events.push(`${this.name} onChanges`);
            }
            ngAfterContentInit() {
                events.push(`${this.name} afterContentInit`);
            }
            ngAfterContentChecked() {
                events.push(`${this.name} afterContentChecked`);
            }
            ngAfterViewInit() {
                events.push(`${this.name} afterViewInit`);
            }
            ngAfterViewChecked() {
                events.push(`${this.name} afterViewChecked`);
            }
            ngOnDestroy() {
                events.push(`${this.name} onDestroy`);
            }
            constructor() {
                this.value = __runInitializers(this, _value_initializers, '');
                this.name = (__runInitializers(this, _value_extraInitializers), __runInitializers(this, _name_initializers, ''));
                __runInitializers(this, _name_extraInitializers);
            }
        };
        __setFunctionName(_classThis, "Comp");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _value_decorators = [(0, core_1.Input)()];
            _name_decorators = [(0, core_1.Input)()];
            __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            Comp = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return Comp = _classThis;
    })();
    let Parent = (() => {
        let _classDecorators = [(0, core_1.Component)({
                selector: 'parent',
                template: `<comp [name]="'child of ' + this.name" [value]="value"><ng-content></ng-content></comp>`,
                standalone: false,
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _classSuper = Comp;
        var Parent = _classThis = class extends _classSuper {
        };
        __setFunctionName(_classThis, "Parent");
        (() => {
            var _a;
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            Parent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return Parent = _classThis;
    })();
    it('should call all hooks in correct order', () => {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<comp *ngIf="show" name="comp" [value]="value"></comp>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.value = 'a';
                    this.show = true;
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Comp],
            imports: [common_1.CommonModule],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(events).toEqual([
            'comp onChanges',
            'comp onInit',
            'comp doCheck',
            'comp afterContentInit',
            'comp afterContentChecked',
            'comp afterViewInit',
            'comp afterViewChecked',
        ]);
        events.length = 0;
        fixture.detectChanges();
        expect(events).toEqual(['comp doCheck', 'comp afterContentChecked', 'comp afterViewChecked']);
        events.length = 0;
        fixture.componentInstance.value = 'b';
        fixture.detectChanges();
        expect(events).toEqual([
            'comp onChanges',
            'comp doCheck',
            'comp afterContentChecked',
            'comp afterViewChecked',
        ]);
        events.length = 0;
        fixture.componentInstance.show = false;
        fixture.detectChanges();
        expect(events).toEqual(['comp onDestroy']);
    });
    it('should call all hooks in correct order with children', () => {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <div *ngIf="show">
          <parent name="parent1" [value]="value"></parent>
          <parent name="parent2" [value]="value"></parent>
        </div>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.value = 'a';
                    this.show = true;
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Parent, Comp],
            imports: [common_1.CommonModule],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(events).toEqual([
            'parent1 onChanges',
            'parent1 onInit',
            'parent1 doCheck',
            'parent2 onChanges',
            'parent2 onInit',
            'parent2 doCheck',
            'parent1 afterContentInit',
            'parent1 afterContentChecked',
            'parent2 afterContentInit',
            'parent2 afterContentChecked',
            'child of parent1 onChanges',
            'child of parent1 onInit',
            'child of parent1 doCheck',
            'child of parent1 afterContentInit',
            'child of parent1 afterContentChecked',
            'child of parent1 afterViewInit',
            'child of parent1 afterViewChecked',
            'child of parent2 onChanges',
            'child of parent2 onInit',
            'child of parent2 doCheck',
            'child of parent2 afterContentInit',
            'child of parent2 afterContentChecked',
            'child of parent2 afterViewInit',
            'child of parent2 afterViewChecked',
            'parent1 afterViewInit',
            'parent1 afterViewChecked',
            'parent2 afterViewInit',
            'parent2 afterViewChecked',
        ]);
        events.length = 0;
        fixture.componentInstance.value = 'b';
        fixture.detectChanges();
        expect(events).toEqual([
            'parent1 onChanges',
            'parent1 doCheck',
            'parent2 onChanges',
            'parent2 doCheck',
            'parent1 afterContentChecked',
            'parent2 afterContentChecked',
            'child of parent1 onChanges',
            'child of parent1 doCheck',
            'child of parent1 afterContentChecked',
            'child of parent1 afterViewChecked',
            'child of parent2 onChanges',
            'child of parent2 doCheck',
            'child of parent2 afterContentChecked',
            'child of parent2 afterViewChecked',
            'parent1 afterViewChecked',
            'parent2 afterViewChecked',
        ]);
        events.length = 0;
        fixture.componentInstance.show = false;
        fixture.detectChanges();
        expect(events).toEqual([
            'child of parent1 onDestroy',
            'child of parent2 onDestroy',
            'parent1 onDestroy',
            'parent2 onDestroy',
        ]);
    });
    // Angular 5 reference: https://stackblitz.com/edit/lifecycle-hooks-ng
    it('should call all hooks in correct order with view and content', () => {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <div *ngIf="show">
          <parent name="parent1" [value]="value">
            <comp name="projected1" [value]="value"></comp>
          </parent>
          <parent name="parent2" [value]="value">
            <comp name="projected2" [value]="value"></comp>
          </parent>
        </div>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.value = 'a';
                    this.show = true;
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, Parent, Comp],
            imports: [common_1.CommonModule],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(events).toEqual([
            'parent1 onChanges',
            'parent1 onInit',
            'parent1 doCheck',
            'projected1 onChanges',
            'projected1 onInit',
            'projected1 doCheck',
            'parent2 onChanges',
            'parent2 onInit',
            'parent2 doCheck',
            'projected2 onChanges',
            'projected2 onInit',
            'projected2 doCheck',
            'projected1 afterContentInit',
            'projected1 afterContentChecked',
            'parent1 afterContentInit',
            'parent1 afterContentChecked',
            'projected2 afterContentInit',
            'projected2 afterContentChecked',
            'parent2 afterContentInit',
            'parent2 afterContentChecked',
            'child of parent1 onChanges',
            'child of parent1 onInit',
            'child of parent1 doCheck',
            'child of parent1 afterContentInit',
            'child of parent1 afterContentChecked',
            'child of parent1 afterViewInit',
            'child of parent1 afterViewChecked',
            'child of parent2 onChanges',
            'child of parent2 onInit',
            'child of parent2 doCheck',
            'child of parent2 afterContentInit',
            'child of parent2 afterContentChecked',
            'child of parent2 afterViewInit',
            'child of parent2 afterViewChecked',
            'projected1 afterViewInit',
            'projected1 afterViewChecked',
            'parent1 afterViewInit',
            'parent1 afterViewChecked',
            'projected2 afterViewInit',
            'projected2 afterViewChecked',
            'parent2 afterViewInit',
            'parent2 afterViewChecked',
        ]);
        events.length = 0;
        fixture.componentInstance.value = 'b';
        fixture.detectChanges();
        expect(events).toEqual([
            'parent1 onChanges',
            'parent1 doCheck',
            'projected1 onChanges',
            'projected1 doCheck',
            'parent2 onChanges',
            'parent2 doCheck',
            'projected2 onChanges',
            'projected2 doCheck',
            'projected1 afterContentChecked',
            'parent1 afterContentChecked',
            'projected2 afterContentChecked',
            'parent2 afterContentChecked',
            'child of parent1 onChanges',
            'child of parent1 doCheck',
            'child of parent1 afterContentChecked',
            'child of parent1 afterViewChecked',
            'child of parent2 onChanges',
            'child of parent2 doCheck',
            'child of parent2 afterContentChecked',
            'child of parent2 afterViewChecked',
            'projected1 afterViewChecked',
            'parent1 afterViewChecked',
            'projected2 afterViewChecked',
            'parent2 afterViewChecked',
        ]);
        events.length = 0;
        fixture.componentInstance.show = false;
        fixture.detectChanges();
        expect(events).toEqual([
            'child of parent1 onDestroy',
            'child of parent2 onDestroy',
            'projected1 onDestroy',
            'parent1 onDestroy',
            'projected2 onDestroy',
            'parent2 onDestroy',
        ]);
    });
});
describe('non-regression', () => {
    it('should call lifecycle hooks for directives active on <ng-template>', () => {
        let destroyed = false;
        let OnDestroyDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[onDestroyDir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var OnDestroyDir = _classThis = class {
                ngOnDestroy() {
                    destroyed = true;
                }
            };
            __setFunctionName(_classThis, "OnDestroyDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                OnDestroyDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return OnDestroyDir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<ng-template [ngIf]="show">
        <ng-template onDestroyDir>content</ng-template>
      </ng-template>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.show = true;
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
        testing_1.TestBed.configureTestingModule({
            declarations: [App, OnDestroyDir],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(destroyed).toBeFalsy();
        fixture.componentInstance.show = false;
        fixture.detectChanges();
        expect(destroyed).toBeTruthy();
    });
    it('should not throw when calling detectChanges from a setter in the presence of a data binding, ngOnChanges and ngAfterViewInit', () => {
        const hooks = [];
        let TestDirective = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[testDir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _instanceExtraInitializers = [];
            let _set_value_decorators;
            var TestDirective = _classThis = class {
                constructor(_changeDetectorRef) {
                    this._changeDetectorRef = (__runInitializers(this, _instanceExtraInitializers), _changeDetectorRef);
                }
                set value(_value) {
                    this._changeDetectorRef.detectChanges();
                }
                ngOnChanges() {
                    hooks.push('ngOnChanges');
                }
                ngAfterViewInit() {
                    hooks.push('ngAfterViewInit');
                }
            };
            __setFunctionName(_classThis, "TestDirective");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _set_value_decorators = [(0, core_1.Input)('testDir')];
                __esDecorate(_classThis, null, _set_value_decorators, { kind: "setter", name: "value", static: false, private: false, access: { has: obj => "value" in obj, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestDirective = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestDirective = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<div [testDir]="value">{{value}}</div>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.value = 1;
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
        testing_1.TestBed.configureTestingModule({ declarations: [App, TestDirective] });
        const fixture = testing_1.TestBed.createComponent(App);
        expect(() => fixture.detectChanges()).not.toThrow();
        expect(hooks).toEqual(['ngOnChanges', 'ngAfterViewInit']);
        expect(fixture.nativeElement.textContent.trim()).toBe('1');
    });
    it('should call hooks in the correct order when calling detectChanges in a setter', () => {
        const hooks = [];
        let TestDirective = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[testDir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _instanceExtraInitializers = [];
            let _set_value_decorators;
            var TestDirective = _classThis = class {
                constructor(_changeDetectorRef) {
                    this._changeDetectorRef = (__runInitializers(this, _instanceExtraInitializers), _changeDetectorRef);
                }
                set value(_value) {
                    this._changeDetectorRef.detectChanges();
                }
                ngOnChanges() {
                    hooks.push('ngOnChanges');
                }
                ngDoCheck() {
                    hooks.push('ngDoCheck');
                }
                ngAfterViewInit() {
                    hooks.push('ngAfterViewInit');
                }
            };
            __setFunctionName(_classThis, "TestDirective");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _set_value_decorators = [(0, core_1.Input)('testDir')];
                __esDecorate(_classThis, null, _set_value_decorators, { kind: "setter", name: "value", static: false, private: false, access: { has: obj => "value" in obj, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestDirective = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestDirective = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<div [testDir]="value">{{value}}</div>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.value = 1;
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
        testing_1.TestBed.configureTestingModule({ declarations: [App, TestDirective] });
        const fixture = testing_1.TestBed.createComponent(App);
        expect(() => fixture.detectChanges()).not.toThrow();
        expect(hooks).toEqual(['ngOnChanges', 'ngDoCheck', 'ngAfterViewInit']);
        expect(fixture.nativeElement.textContent.trim()).toBe('1');
    });
});
