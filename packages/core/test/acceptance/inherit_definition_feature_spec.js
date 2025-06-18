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
const animations_1 = require("@angular/animations");
const core_1 = require("../../src/core");
const def_getters_1 = require("../../src/render3/def_getters");
const testing_1 = require("../../testing");
const platform_browser_1 = require("@angular/platform-browser");
const animations_2 = require("@angular/platform-browser/animations");
describe('inheritance', () => {
    it('should throw when trying to inherit a component from a directive', () => {
        let MyComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-comp',
                    template: '<div></div>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "MyComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyComponent = _classThis;
        })();
        let MyDirective = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[my-dir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _classSuper = MyComponent;
            var MyDirective = _classThis = class extends _classSuper {
            };
            __setFunctionName(_classThis, "MyDirective");
            (() => {
                var _a;
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyDirective = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyDirective = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<div my-dir></div>`,
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
            declarations: [App, MyComponent, MyDirective],
        });
        expect(() => {
            testing_1.TestBed.createComponent(App);
        }).toThrowError('NG0903: Directives cannot inherit Components. Directive MyDirective is attempting to extend component MyComponent');
    });
    describe('multiple children', () => {
        it("should ensure that multiple child classes don't cause multiple parent execution", () => {
            // Assume this inheritance:
            //         Base
            //           |
            //         Super
            //        /     \
            //     Sub1    Sub2
            //
            // In the above case:
            //  1.  Sub1 as will walk the inheritance Sub1, Super, Base
            //  2.  Sub2 as will walk the inheritance Sub2, Super, Base
            //
            // Notice that Super, Base will get walked twice. Because inheritance works by wrapping parent
            // hostBindings function in a delegate which calls the hostBindings of the directive as well
            // as super, we need to ensure that we don't double wrap the hostBindings function. Doing so
            // would result in calling the hostBindings multiple times (unnecessarily). This would be
            // especially an issue if we have a lot of sub-classes (as is common in component libraries)
            const log = [];
            let BaseDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[superDir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _instanceExtraInitializers = [];
                let _get_backgroundColor_decorators;
                var BaseDirective = _classThis = class {
                    get backgroundColor() {
                        log.push('Base.backgroundColor');
                        return 'white';
                    }
                    constructor() {
                        __runInitializers(this, _instanceExtraInitializers);
                    }
                };
                __setFunctionName(_classThis, "BaseDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _get_backgroundColor_decorators = [(0, core_1.HostBinding)('style.background-color')];
                    __esDecorate(_classThis, null, _get_backgroundColor_decorators, { kind: "getter", name: "backgroundColor", static: false, private: false, access: { has: obj => "backgroundColor" in obj, get: obj => obj.backgroundColor }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    BaseDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return BaseDirective = _classThis;
            })();
            let SuperDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[superDir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = BaseDirective;
                let _instanceExtraInitializers = [];
                let _get_color_decorators;
                var SuperDirective = _classThis = class extends _classSuper {
                    get color() {
                        log.push('Super.color');
                        return 'blue';
                    }
                    constructor() {
                        super(...arguments);
                        __runInitializers(this, _instanceExtraInitializers);
                    }
                };
                __setFunctionName(_classThis, "SuperDirective");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    _get_color_decorators = [(0, core_1.HostBinding)('style.color')];
                    __esDecorate(_classThis, null, _get_color_decorators, { kind: "getter", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SuperDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SuperDirective = _classThis;
            })();
            let Sub1Directive = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[subDir1]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = SuperDirective;
                let _instanceExtraInitializers = [];
                let _get_height_decorators;
                var Sub1Directive = _classThis = class extends _classSuper {
                    get height() {
                        log.push('Sub1.height');
                        return '200px';
                    }
                    constructor() {
                        super(...arguments);
                        __runInitializers(this, _instanceExtraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Sub1Directive");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    _get_height_decorators = [(0, core_1.HostBinding)('style.height')];
                    __esDecorate(_classThis, null, _get_height_decorators, { kind: "getter", name: "height", static: false, private: false, access: { has: obj => "height" in obj, get: obj => obj.height }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Sub1Directive = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Sub1Directive = _classThis;
            })();
            let Sub2Directive = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[subDir2]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = SuperDirective;
                let _instanceExtraInitializers = [];
                let _get_width_decorators;
                var Sub2Directive = _classThis = class extends _classSuper {
                    get width() {
                        log.push('Sub2.width');
                        return '100px';
                    }
                    constructor() {
                        super(...arguments);
                        __runInitializers(this, _instanceExtraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Sub2Directive");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    _get_width_decorators = [(0, core_1.HostBinding)('style.width')];
                    __esDecorate(_classThis, null, _get_width_decorators, { kind: "getter", name: "width", static: false, private: false, access: { has: obj => "width" in obj, get: obj => obj.width }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Sub2Directive = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Sub2Directive = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div subDir1 subDir2></div>`,
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
                declarations: [App, Sub1Directive, Sub2Directive, SuperDirective],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges(false); // Don't check for no changes (so that assertion does not need
            // to worry about it.)
            expect(log).toEqual([
                'Base.backgroundColor',
                'Super.color',
                'Sub1.height', //
                'Base.backgroundColor',
                'Super.color',
                'Sub2.width', //
            ]);
            expect((0, def_getters_1.getDirectiveDef)(BaseDirective).hostVars).toEqual(2);
            expect((0, def_getters_1.getDirectiveDef)(SuperDirective).hostVars).toEqual(4);
            expect((0, def_getters_1.getDirectiveDef)(Sub1Directive).hostVars).toEqual(6);
            expect((0, def_getters_1.getDirectiveDef)(Sub2Directive).hostVars).toEqual(6);
        });
    });
    describe('ngOnChanges', () => {
        it('should be inherited when super is a directive', () => {
            const log = [];
            let SuperDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[superDir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _someInput_decorators;
                let _someInput_initializers = [];
                let _someInput_extraInitializers = [];
                var SuperDirective = _classThis = class {
                    ngOnChanges() {
                        log.push('on changes!');
                    }
                    constructor() {
                        this.someInput = __runInitializers(this, _someInput_initializers, '');
                        __runInitializers(this, _someInput_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "SuperDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _someInput_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _someInput_decorators, { kind: "field", name: "someInput", static: false, private: false, access: { has: obj => "someInput" in obj, get: obj => obj.someInput, set: (obj, value) => { obj.someInput = value; } }, metadata: _metadata }, _someInput_initializers, _someInput_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SuperDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SuperDirective = _classThis;
            })();
            let SubDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[subDir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = SuperDirective;
                var SubDirective = _classThis = class extends _classSuper {
                };
                __setFunctionName(_classThis, "SubDirective");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SubDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SubDirective = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div subDir [someInput]="1"></div>`,
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
                declarations: [App, SubDirective, SuperDirective],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(log).toEqual(['on changes!']);
        });
        it('should be inherited when super is a simple class', () => {
            const log = [];
            class SuperClass {
                ngOnChanges() {
                    log.push('on changes!');
                }
            }
            let SubDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[subDir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = SuperClass;
                let _someInput_decorators;
                let _someInput_initializers = [];
                let _someInput_extraInitializers = [];
                var SubDirective = _classThis = class extends _classSuper {
                    constructor() {
                        super(...arguments);
                        this.someInput = __runInitializers(this, _someInput_initializers, '');
                        __runInitializers(this, _someInput_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "SubDirective");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    _someInput_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _someInput_decorators, { kind: "field", name: "someInput", static: false, private: false, access: { has: obj => "someInput" in obj, get: obj => obj.someInput, set: (obj, value) => { obj.someInput = value; } }, metadata: _metadata }, _someInput_initializers, _someInput_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SubDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SubDirective = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div subDir [someInput]="1"></div>`,
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
                declarations: [App, SubDirective],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(log).toEqual(['on changes!']);
        });
        it('should be inherited when super is a directive and grand-super is a directive', () => {
            const log = [];
            let GrandSuperDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[grandSuperDir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _someInput_decorators;
                let _someInput_initializers = [];
                let _someInput_extraInitializers = [];
                var GrandSuperDirective = _classThis = class {
                    ngOnChanges() {
                        log.push('on changes!');
                    }
                    constructor() {
                        this.someInput = __runInitializers(this, _someInput_initializers, '');
                        __runInitializers(this, _someInput_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "GrandSuperDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _someInput_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _someInput_decorators, { kind: "field", name: "someInput", static: false, private: false, access: { has: obj => "someInput" in obj, get: obj => obj.someInput, set: (obj, value) => { obj.someInput = value; } }, metadata: _metadata }, _someInput_initializers, _someInput_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    GrandSuperDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return GrandSuperDirective = _classThis;
            })();
            let SuperDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[superDir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = GrandSuperDirective;
                var SuperDirective = _classThis = class extends _classSuper {
                };
                __setFunctionName(_classThis, "SuperDirective");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SuperDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SuperDirective = _classThis;
            })();
            let SubDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[subDir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = SuperDirective;
                var SubDirective = _classThis = class extends _classSuper {
                };
                __setFunctionName(_classThis, "SubDirective");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SubDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SubDirective = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div subDir [someInput]="1"></div>`,
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
                declarations: [App, SubDirective, SuperDirective, GrandSuperDirective],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(log).toEqual(['on changes!']);
        });
        it('should be inherited when super is a directive and grand-super is a simple class', () => {
            const log = [];
            class GrandSuperClass {
                ngOnChanges() {
                    log.push('on changes!');
                }
            }
            let SuperDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[superDir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = GrandSuperClass;
                let _someInput_decorators;
                let _someInput_initializers = [];
                let _someInput_extraInitializers = [];
                var SuperDirective = _classThis = class extends _classSuper {
                    constructor() {
                        super(...arguments);
                        this.someInput = __runInitializers(this, _someInput_initializers, '');
                        __runInitializers(this, _someInput_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "SuperDirective");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    _someInput_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _someInput_decorators, { kind: "field", name: "someInput", static: false, private: false, access: { has: obj => "someInput" in obj, get: obj => obj.someInput, set: (obj, value) => { obj.someInput = value; } }, metadata: _metadata }, _someInput_initializers, _someInput_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SuperDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SuperDirective = _classThis;
            })();
            let SubDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[subDir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = SuperDirective;
                var SubDirective = _classThis = class extends _classSuper {
                };
                __setFunctionName(_classThis, "SubDirective");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SubDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SubDirective = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div subDir [someInput]="1"></div>`,
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
                declarations: [App, SubDirective, SuperDirective],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(log).toEqual(['on changes!']);
        });
        it('should be inherited when super is a simple class and grand-super is a directive', () => {
            const log = [];
            let GrandSuperDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[grandSuperDir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _someInput_decorators;
                let _someInput_initializers = [];
                let _someInput_extraInitializers = [];
                var GrandSuperDirective = _classThis = class {
                    ngOnChanges() {
                        log.push('on changes!');
                    }
                    constructor() {
                        this.someInput = __runInitializers(this, _someInput_initializers, '');
                        __runInitializers(this, _someInput_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "GrandSuperDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _someInput_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _someInput_decorators, { kind: "field", name: "someInput", static: false, private: false, access: { has: obj => "someInput" in obj, get: obj => obj.someInput, set: (obj, value) => { obj.someInput = value; } }, metadata: _metadata }, _someInput_initializers, _someInput_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    GrandSuperDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return GrandSuperDirective = _classThis;
            })();
            class SuperClass extends GrandSuperDirective {
            }
            let SubDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[subDir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = SuperClass;
                var SubDirective = _classThis = class extends _classSuper {
                };
                __setFunctionName(_classThis, "SubDirective");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SubDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SubDirective = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div subDir [someInput]="1"></div>`,
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
                declarations: [App, SubDirective, GrandSuperDirective],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(log).toEqual(['on changes!']);
        });
        it('should be inherited when super is a simple class and grand-super is a simple class', () => {
            const log = [];
            class GrandSuperClass {
                ngOnChanges() {
                    log.push('on changes!');
                }
            }
            class SuperClass extends GrandSuperClass {
            }
            let SubDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[subDir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = SuperClass;
                let _someInput_decorators;
                let _someInput_initializers = [];
                let _someInput_extraInitializers = [];
                var SubDirective = _classThis = class extends _classSuper {
                    constructor() {
                        super(...arguments);
                        this.someInput = __runInitializers(this, _someInput_initializers, '');
                        __runInitializers(this, _someInput_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "SubDirective");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    _someInput_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _someInput_decorators, { kind: "field", name: "someInput", static: false, private: false, access: { has: obj => "someInput" in obj, get: obj => obj.someInput, set: (obj, value) => { obj.someInput = value; } }, metadata: _metadata }, _someInput_initializers, _someInput_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SubDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SubDirective = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div subDir [someInput]="1"></div>`,
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
                declarations: [App, SubDirective],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(log).toEqual(['on changes!']);
        });
        it('should be inherited from undecorated super class which inherits from decorated one', () => {
            let changes = 0;
            let Base = (() => {
                var _a;
                let _inputBase_decorators;
                let _inputBase_initializers = [];
                let _inputBase_extraInitializers = [];
                return _a = class Base {
                        constructor() {
                            // Add an Input so that we have at least one Angular decorator on a class field.
                            this.inputBase = __runInitializers(this, _inputBase_initializers, void 0);
                            __runInitializers(this, _inputBase_extraInitializers);
                        }
                    },
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _inputBase_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _inputBase_decorators, { kind: "field", name: "inputBase", static: false, private: false, access: { has: obj => "inputBase" in obj, get: obj => obj.inputBase, set: (obj, value) => { obj.inputBase = value; } }, metadata: _metadata }, _inputBase_initializers, _inputBase_extraInitializers);
                        if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    })(),
                    _a;
            })();
            class UndecoratedBase extends Base {
                ngOnChanges() {
                    changes++;
                }
            }
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = UndecoratedBase;
                let _input_decorators;
                let _input_initializers = [];
                let _input_extraInitializers = [];
                var MyComp = _classThis = class extends _classSuper {
                    constructor() {
                        super(...arguments);
                        this.input = __runInitializers(this, _input_initializers, void 0);
                        __runInitializers(this, _input_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    _input_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _input_decorators, { kind: "field", name: "input", static: false, private: false, access: { has: obj => "input" in obj, get: obj => obj.input, set: (obj, value) => { obj.input = value; } }, metadata: _metadata }, _input_initializers, _input_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<my-comp [input]="value"></my-comp>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.value = 'hello';
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
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp, App] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(changes).toBe(1);
        });
    });
    describe('of bare super class by a directive', () => {
        // TODO: Add tests for ContentChild
        // TODO: Add tests for ViewChild
        describe('lifecycle hooks', () => {
            const fired = [];
            class SuperDirective {
                ngOnInit() {
                    fired.push('super init');
                }
                ngOnDestroy() {
                    fired.push('super destroy');
                }
                ngAfterContentInit() {
                    fired.push('super after content init');
                }
                ngAfterContentChecked() {
                    fired.push('super after content checked');
                }
                ngAfterViewInit() {
                    fired.push('super after view init');
                }
                ngAfterViewChecked() {
                    fired.push('super after view checked');
                }
                ngDoCheck() {
                    fired.push('super do check');
                }
            }
            beforeEach(() => (fired.length = 0));
            it('ngOnInit', () => {
                let SubDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[subDir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperDirective;
                    var SubDirective = _classThis = class extends _classSuper {
                        ngOnInit() {
                            fired.push('sub init');
                        }
                    };
                    __setFunctionName(_classThis, "SubDirective");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SubDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SubDirective = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<p *ngIf="showing" subDir></p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [SubDirective, App],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'sub init',
                    'super do check',
                    'super after content init',
                    'super after content checked',
                    'super after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngDoCheck', () => {
                let SubDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[subDir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperDirective;
                    var SubDirective = _classThis = class extends _classSuper {
                        ngDoCheck() {
                            fired.push('sub do check');
                        }
                    };
                    __setFunctionName(_classThis, "SubDirective");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SubDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SubDirective = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<p *ngIf="showing" subDir></p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [SubDirective, App],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'sub do check',
                    'super after content init',
                    'super after content checked',
                    'super after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngAfterContentInit', () => {
                let SubDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[subDir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperDirective;
                    var SubDirective = _classThis = class extends _classSuper {
                        ngAfterContentInit() {
                            fired.push('sub after content init');
                        }
                    };
                    __setFunctionName(_classThis, "SubDirective");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SubDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SubDirective = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<p *ngIf="showing" subDir></p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [SubDirective, App],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'super do check',
                    'sub after content init',
                    'super after content checked',
                    'super after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngAfterContentChecked', () => {
                let SubDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[subDir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperDirective;
                    var SubDirective = _classThis = class extends _classSuper {
                        ngAfterContentChecked() {
                            fired.push('sub after content checked');
                        }
                    };
                    __setFunctionName(_classThis, "SubDirective");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SubDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SubDirective = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<p *ngIf="showing" subDir></p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [SubDirective, App],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'super do check',
                    'super after content init',
                    'sub after content checked',
                    'super after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngAfterViewInit', () => {
                let SubDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[subDir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperDirective;
                    var SubDirective = _classThis = class extends _classSuper {
                        ngAfterViewInit() {
                            fired.push('sub after view init');
                        }
                    };
                    __setFunctionName(_classThis, "SubDirective");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SubDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SubDirective = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<p *ngIf="showing" subDir></p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [SubDirective, App],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'super do check',
                    'super after content init',
                    'super after content checked',
                    'sub after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngAfterViewChecked', () => {
                let SubDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[subDir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperDirective;
                    var SubDirective = _classThis = class extends _classSuper {
                        ngAfterViewChecked() {
                            fired.push('sub after view checked');
                        }
                    };
                    __setFunctionName(_classThis, "SubDirective");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SubDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SubDirective = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<p *ngIf="showing" subDir></p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [SubDirective, App],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'super do check',
                    'super after content init',
                    'super after content checked',
                    'super after view init',
                    'sub after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngOnDestroy', () => {
                let SubDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[subDir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperDirective;
                    var SubDirective = _classThis = class extends _classSuper {
                        ngOnDestroy() {
                            fired.push('sub destroy');
                        }
                    };
                    __setFunctionName(_classThis, "SubDirective");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SubDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SubDirective = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<p *ngIf="showing" subDir></p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [SubDirective, App],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'super do check',
                    'super after content init',
                    'super after content checked',
                    'super after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['sub destroy']);
            });
        });
        describe('inputs', () => {
            // TODO: add test where the two inputs have a different alias
            // TODO: add test where super has an @Input() on the property, and sub does not
            // TODO: add test where super has an @Input('alias') on the property and sub has no alias
            it('should inherit inputs', () => {
                let SuperDirective = (() => {
                    var _a;
                    let _foo_decorators;
                    let _foo_initializers = [];
                    let _foo_extraInitializers = [];
                    let _bar_decorators;
                    let _bar_initializers = [];
                    let _bar_extraInitializers = [];
                    let _baz_decorators;
                    let _baz_initializers = [];
                    let _baz_extraInitializers = [];
                    return _a = class SuperDirective {
                            constructor() {
                                this.foo = __runInitializers(this, _foo_initializers, '');
                                this.bar = (__runInitializers(this, _foo_extraInitializers), __runInitializers(this, _bar_initializers, ''));
                                this.baz = (__runInitializers(this, _bar_extraInitializers), __runInitializers(this, _baz_initializers, ''));
                                __runInitializers(this, _baz_extraInitializers);
                            }
                        },
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            _foo_decorators = [(0, core_1.Input)()];
                            _bar_decorators = [(0, core_1.Input)()];
                            _baz_decorators = [(0, core_1.Input)()];
                            __esDecorate(null, null, _foo_decorators, { kind: "field", name: "foo", static: false, private: false, access: { has: obj => "foo" in obj, get: obj => obj.foo, set: (obj, value) => { obj.foo = value; } }, metadata: _metadata }, _foo_initializers, _foo_extraInitializers);
                            __esDecorate(null, null, _bar_decorators, { kind: "field", name: "bar", static: false, private: false, access: { has: obj => "bar" in obj, get: obj => obj.bar, set: (obj, value) => { obj.bar = value; } }, metadata: _metadata }, _bar_initializers, _bar_extraInitializers);
                            __esDecorate(null, null, _baz_decorators, { kind: "field", name: "baz", static: false, private: false, access: { has: obj => "baz" in obj, get: obj => obj.baz, set: (obj, value) => { obj.baz = value; } }, metadata: _metadata }, _baz_initializers, _baz_extraInitializers);
                            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        })(),
                        _a;
                })();
                let SubDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[sub-dir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperDirective;
                    let _baz_decorators;
                    let _baz_initializers = [];
                    let _baz_extraInitializers = [];
                    let _qux_decorators;
                    let _qux_initializers = [];
                    let _qux_extraInitializers = [];
                    var SubDirective = _classThis = class extends _classSuper {
                        constructor() {
                            super(...arguments);
                            this.baz = __runInitializers(this, _baz_initializers, '');
                            this.qux = (__runInitializers(this, _baz_extraInitializers), __runInitializers(this, _qux_initializers, ''));
                            __runInitializers(this, _qux_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "SubDirective");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        _baz_decorators = [(0, core_1.Input)()];
                        _qux_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _baz_decorators, { kind: "field", name: "baz", static: false, private: false, access: { has: obj => "baz" in obj, get: obj => obj.baz, set: (obj, value) => { obj.baz = value; } }, metadata: _metadata }, _baz_initializers, _baz_extraInitializers);
                        __esDecorate(null, null, _qux_decorators, { kind: "field", name: "qux", static: false, private: false, access: { has: obj => "qux" in obj, get: obj => obj.qux, set: (obj, value) => { obj.qux = value; } }, metadata: _metadata }, _qux_initializers, _qux_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SubDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SubDirective = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<p sub-dir [foo]="a" [bar]="b" [baz]="c" [qux]="d"></p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.a = 'a';
                            this.b = 'b';
                            this.c = 'c';
                            this.d = 'd';
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
                    declarations: [App, SubDirective],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                const subDir = fixture.debugElement
                    .query(platform_browser_1.By.directive(SubDirective))
                    .injector.get(SubDirective);
                expect(subDir.foo).toBe('a');
                expect(subDir.bar).toBe('b');
                expect(subDir.baz).toBe('c');
                expect(subDir.qux).toBe('d');
            });
            it('should not inherit transforms if inputs are re-declared', () => {
                let Base = (() => {
                    let _classDecorators = [(0, core_1.Directive)()];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _someInput_decorators;
                    let _someInput_initializers = [];
                    let _someInput_extraInitializers = [];
                    var Base = _classThis = class {
                        constructor() {
                            this.someInput = __runInitializers(this, _someInput_initializers, '');
                            __runInitializers(this, _someInput_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "Base");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _someInput_decorators = [(0, core_1.Input)({ transform: (v) => `${v}-transformed` })];
                        __esDecorate(null, null, _someInput_decorators, { kind: "field", name: "someInput", static: false, private: false, access: { has: obj => "someInput" in obj, get: obj => obj.someInput, set: (obj, value) => { obj.someInput = value; } }, metadata: _metadata }, _someInput_initializers, _someInput_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Base = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Base = _classThis;
                })();
                let ActualDir = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'dir',
                            inputs: ['someInput'],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = Base;
                    var ActualDir = _classThis = class extends _classSuper {
                    };
                    __setFunctionName(_classThis, "ActualDir");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ActualDir = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ActualDir = _classThis;
                })();
                let TestCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            imports: [ActualDir],
                            template: `<dir someInput="newValue">`,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var TestCmp = _classThis = class {
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
                const fixture = testing_1.TestBed.createComponent(TestCmp);
                fixture.detectChanges();
                const actualDir = fixture.debugElement
                    .query(platform_browser_1.By.directive(ActualDir))
                    .injector.get(ActualDir);
                expect(actualDir.someInput).toEqual('newValue');
            });
            it('should inherit transforms if inputs are aliased', () => {
                let Base = (() => {
                    let _classDecorators = [(0, core_1.Directive)()];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _fieldName_decorators;
                    let _fieldName_initializers = [];
                    let _fieldName_extraInitializers = [];
                    var Base = _classThis = class {
                        constructor() {
                            this.fieldName = __runInitializers(this, _fieldName_initializers, '');
                            __runInitializers(this, _fieldName_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "Base");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _fieldName_decorators = [(0, core_1.Input)({ transform: (v) => `${v}-transformed`, alias: 'publicName' })];
                        __esDecorate(null, null, _fieldName_decorators, { kind: "field", name: "fieldName", static: false, private: false, access: { has: obj => "fieldName" in obj, get: obj => obj.fieldName, set: (obj, value) => { obj.fieldName = value; } }, metadata: _metadata }, _fieldName_initializers, _fieldName_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Base = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Base = _classThis;
                })();
                let ActualDir = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'dir',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = Base;
                    var ActualDir = _classThis = class extends _classSuper {
                    };
                    __setFunctionName(_classThis, "ActualDir");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ActualDir = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ActualDir = _classThis;
                })();
                let TestCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            imports: [ActualDir],
                            template: `<dir publicName="newValue">`,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var TestCmp = _classThis = class {
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
                const fixture = testing_1.TestBed.createComponent(TestCmp);
                fixture.detectChanges();
                const actualDir = fixture.debugElement
                    .query(platform_browser_1.By.directive(ActualDir))
                    .injector.get(ActualDir);
                expect(actualDir.fieldName).toEqual('newValue-transformed');
            });
        });
        describe('outputs', () => {
            // TODO: add tests where both sub and super have Output on same property with different
            // aliases
            // TODO: add test where super has property with alias and sub has property with no alias
            // TODO: add test where super has an @Input() on the property, and sub does not
            it('should inherit outputs', () => {
                let SuperDirective = (() => {
                    var _a;
                    let _foo_decorators;
                    let _foo_initializers = [];
                    let _foo_extraInitializers = [];
                    return _a = class SuperDirective {
                            constructor() {
                                this.foo = __runInitializers(this, _foo_initializers, new core_1.EventEmitter());
                                __runInitializers(this, _foo_extraInitializers);
                            }
                        },
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            _foo_decorators = [(0, core_1.Output)()];
                            __esDecorate(null, null, _foo_decorators, { kind: "field", name: "foo", static: false, private: false, access: { has: obj => "foo" in obj, get: obj => obj.foo, set: (obj, value) => { obj.foo = value; } }, metadata: _metadata }, _foo_initializers, _foo_extraInitializers);
                            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        })(),
                        _a;
                })();
                let SubDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[sub-dir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperDirective;
                    var SubDirective = _classThis = class extends _classSuper {
                        ngOnInit() {
                            this.foo.emit('test');
                        }
                    };
                    __setFunctionName(_classThis, "SubDirective");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SubDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SubDirective = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `
        <div sub-dir (foo)="handleFoo($event)"></div>
      `,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.foo = '';
                        }
                        handleFoo(event) {
                            this.foo = event;
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
                    declarations: [App, SubDirective],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                const app = fixture.componentInstance;
                expect(app.foo).toBe('test');
            });
        });
        describe('host bindings (style related)', () => {
            // TODO: sub and super HostBinding same property but different bindings
            // TODO: sub and super HostBinding same binding on two different properties
            it('should compose host bindings for styles', () => {
                let SuperDirective = (() => {
                    var _a;
                    let _color_decorators;
                    let _color_initializers = [];
                    let _color_extraInitializers = [];
                    let _bg_decorators;
                    let _bg_initializers = [];
                    let _bg_extraInitializers = [];
                    return _a = class SuperDirective {
                            constructor() {
                                this.color = __runInitializers(this, _color_initializers, 'red');
                                this.bg = (__runInitializers(this, _color_extraInitializers), __runInitializers(this, _bg_initializers, 'black'));
                                __runInitializers(this, _bg_extraInitializers);
                            }
                        },
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            _color_decorators = [(0, core_1.HostBinding)('style.color')];
                            _bg_decorators = [(0, core_1.HostBinding)('style.backgroundColor')];
                            __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                            __esDecorate(null, null, _bg_decorators, { kind: "field", name: "bg", static: false, private: false, access: { has: obj => "bg" in obj, get: obj => obj.bg, set: (obj, value) => { obj.bg = value; } }, metadata: _metadata }, _bg_initializers, _bg_extraInitializers);
                            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        })(),
                        _a;
                })();
                let SubDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[sub-dir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperDirective;
                    var SubDirective = _classThis = class extends _classSuper {
                    };
                    __setFunctionName(_classThis, "SubDirective");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SubDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SubDirective = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `
          <p sub-dir>test</p>
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
                    declarations: [App, SubDirective],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                const queryResult = fixture.debugElement.query(platform_browser_1.By.directive(SubDirective));
                expect(queryResult.nativeElement.tagName).toBe('P');
                expect(queryResult.nativeElement.style.color).toBe('red');
                expect(queryResult.nativeElement.style.backgroundColor).toBe('black');
            });
        });
        describe('host bindings (non-style related)', () => {
            // TODO: sub and super HostBinding same property but different bindings
            // TODO: sub and super HostBinding same binding on two different properties
            it('should compose host bindings (non-style related)', () => {
                let SuperDirective = (() => {
                    var _a;
                    let _instanceExtraInitializers = [];
                    let _get_boundTitle_decorators;
                    let _superTitle_decorators;
                    let _superTitle_initializers = [];
                    let _superTitle_extraInitializers = [];
                    return _a = class SuperDirective {
                            get boundTitle() {
                                return this.superTitle + '!!!';
                            }
                            constructor() {
                                this.superTitle = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _superTitle_initializers, ''));
                                __runInitializers(this, _superTitle_extraInitializers);
                            }
                        },
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            _get_boundTitle_decorators = [(0, core_1.HostBinding)('title')];
                            _superTitle_decorators = [(0, core_1.Input)()];
                            __esDecorate(_a, null, _get_boundTitle_decorators, { kind: "getter", name: "boundTitle", static: false, private: false, access: { has: obj => "boundTitle" in obj, get: obj => obj.boundTitle }, metadata: _metadata }, null, _instanceExtraInitializers);
                            __esDecorate(null, null, _superTitle_decorators, { kind: "field", name: "superTitle", static: false, private: false, access: { has: obj => "superTitle" in obj, get: obj => obj.superTitle, set: (obj, value) => { obj.superTitle = value; } }, metadata: _metadata }, _superTitle_initializers, _superTitle_extraInitializers);
                            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        })(),
                        _a;
                })();
                let SubDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[sub-dir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperDirective;
                    var SubDirective = _classThis = class extends _classSuper {
                    };
                    __setFunctionName(_classThis, "SubDirective");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SubDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SubDirective = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `
        <p sub-dir superTitle="test">test</p>
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
                    declarations: [App, SubDirective],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                const queryResult = fixture.debugElement.query(platform_browser_1.By.directive(SubDirective));
                expect(queryResult.nativeElement.title).toBe('test!!!');
            });
        });
        describe('ContentChildren', () => {
            // TODO: sub and super HostBinding same property but different bindings
            // TODO: sub and super HostBinding same binding on two different properties
            it('should inherit ContentChildren queries', () => {
                let foundQueryList;
                let ChildDir = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[child-dir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ChildDir = _classThis = class {
                    };
                    __setFunctionName(_classThis, "ChildDir");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ChildDir = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ChildDir = _classThis;
                })();
                let SuperDirective = (() => {
                    var _a;
                    let _customDirs_decorators;
                    let _customDirs_initializers = [];
                    let _customDirs_extraInitializers = [];
                    return _a = class SuperDirective {
                            constructor() {
                                this.customDirs = __runInitializers(this, _customDirs_initializers, void 0);
                                __runInitializers(this, _customDirs_extraInitializers);
                            }
                        },
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            _customDirs_decorators = [(0, core_1.ContentChildren)(ChildDir)];
                            __esDecorate(null, null, _customDirs_decorators, { kind: "field", name: "customDirs", static: false, private: false, access: { has: obj => "customDirs" in obj, get: obj => obj.customDirs, set: (obj, value) => { obj.customDirs = value; } }, metadata: _metadata }, _customDirs_initializers, _customDirs_extraInitializers);
                            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        })(),
                        _a;
                })();
                let SubDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[sub-dir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperDirective;
                    var SubDirective = _classThis = class extends _classSuper {
                        ngAfterViewInit() {
                            foundQueryList = this.customDirs;
                        }
                    };
                    __setFunctionName(_classThis, "SubDirective");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SubDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SubDirective = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `
        <ul sub-dir>
          <li child-dir>one</li>
          <li child-dir>two</li>
        </ul>
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
                    declarations: [App, SubDirective, ChildDir],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(foundQueryList.length).toBe(2);
            });
        });
        // TODO: sub has Input and super has Output on same property
        // TODO: sub has Input and super has HostBinding on same property
        // TODO: sub has Input and super has ViewChild on same property
        // TODO: sub has Input and super has ViewChildren on same property
        // TODO: sub has Input and super has ContentChild on same property
        // TODO: sub has Input and super has ContentChildren on same property
        // TODO: sub has Output and super has HostBinding on same property
        // TODO: sub has Output and super has ViewChild on same property
        // TODO: sub has Output and super has ViewChildren on same property
        // TODO: sub has Output and super has ContentChild on same property
        // TODO: sub has Output and super has ContentChildren on same property
        // TODO: sub has HostBinding and super has ViewChild on same property
        // TODO: sub has HostBinding and super has ViewChildren on same property
        // TODO: sub has HostBinding and super has ContentChild on same property
        // TODO: sub has HostBinding and super has ContentChildren on same property
        // TODO: sub has ViewChild and super has ViewChildren on same property
        // TODO: sub has ViewChild and super has ContentChild on same property
        // TODO: sub has ViewChild and super has ContentChildren on same property
        // TODO: sub has ViewChildren and super has ContentChild on same property
        // TODO: sub has ViewChildren and super has ContentChildren on same property
        // TODO: sub has ContentChild and super has ContentChildren on same property
    });
    describe('of a directive by another directive', () => {
        // TODO: Add tests for ContentChild
        // TODO: Add tests for ViewChild
        describe('lifecycle hooks', () => {
            const fired = [];
            let SuperDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[super-dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SuperDirective = _classThis = class {
                    ngOnInit() {
                        fired.push('super init');
                    }
                    ngOnDestroy() {
                        fired.push('super destroy');
                    }
                    ngAfterContentInit() {
                        fired.push('super after content init');
                    }
                    ngAfterContentChecked() {
                        fired.push('super after content checked');
                    }
                    ngAfterViewInit() {
                        fired.push('super after view init');
                    }
                    ngAfterViewChecked() {
                        fired.push('super after view checked');
                    }
                    ngDoCheck() {
                        fired.push('super do check');
                    }
                };
                __setFunctionName(_classThis, "SuperDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SuperDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SuperDirective = _classThis;
            })();
            beforeEach(() => (fired.length = 0));
            it('ngOnInit', () => {
                let SubDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[subDir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperDirective;
                    var SubDirective = _classThis = class extends _classSuper {
                        ngOnInit() {
                            fired.push('sub init');
                        }
                    };
                    __setFunctionName(_classThis, "SubDirective");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SubDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SubDirective = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<p *ngIf="showing" subDir></p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [SubDirective, App, SuperDirective],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'sub init',
                    'super do check',
                    'super after content init',
                    'super after content checked',
                    'super after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngDoCheck', () => {
                let SubDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[subDir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperDirective;
                    var SubDirective = _classThis = class extends _classSuper {
                        ngDoCheck() {
                            fired.push('sub do check');
                        }
                    };
                    __setFunctionName(_classThis, "SubDirective");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SubDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SubDirective = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<p *ngIf="showing" subDir></p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [SubDirective, App, SuperDirective],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'sub do check',
                    'super after content init',
                    'super after content checked',
                    'super after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngAfterContentInit', () => {
                let SubDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[subDir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperDirective;
                    var SubDirective = _classThis = class extends _classSuper {
                        ngAfterContentInit() {
                            fired.push('sub after content init');
                        }
                    };
                    __setFunctionName(_classThis, "SubDirective");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SubDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SubDirective = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<p *ngIf="showing" subDir></p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [SubDirective, App, SuperDirective],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'super do check',
                    'sub after content init',
                    'super after content checked',
                    'super after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngAfterContentChecked', () => {
                let SubDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[subDir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperDirective;
                    var SubDirective = _classThis = class extends _classSuper {
                        ngAfterContentChecked() {
                            fired.push('sub after content checked');
                        }
                    };
                    __setFunctionName(_classThis, "SubDirective");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SubDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SubDirective = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<p *ngIf="showing" subDir></p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [SubDirective, App, SuperDirective],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'super do check',
                    'super after content init',
                    'sub after content checked',
                    'super after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngAfterViewInit', () => {
                let SubDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[subDir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperDirective;
                    var SubDirective = _classThis = class extends _classSuper {
                        ngAfterViewInit() {
                            fired.push('sub after view init');
                        }
                    };
                    __setFunctionName(_classThis, "SubDirective");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SubDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SubDirective = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<p *ngIf="showing" subDir></p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [SubDirective, App, SuperDirective],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'super do check',
                    'super after content init',
                    'super after content checked',
                    'sub after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngAfterViewChecked', () => {
                let SubDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[subDir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperDirective;
                    var SubDirective = _classThis = class extends _classSuper {
                        ngAfterViewChecked() {
                            fired.push('sub after view checked');
                        }
                    };
                    __setFunctionName(_classThis, "SubDirective");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SubDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SubDirective = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<p *ngIf="showing" subDir></p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [SubDirective, App, SuperDirective],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'super do check',
                    'super after content init',
                    'super after content checked',
                    'super after view init',
                    'sub after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngOnDestroy', () => {
                let SubDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[subDir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperDirective;
                    var SubDirective = _classThis = class extends _classSuper {
                        ngOnDestroy() {
                            fired.push('sub destroy');
                        }
                    };
                    __setFunctionName(_classThis, "SubDirective");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SubDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SubDirective = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<p *ngIf="showing" subDir></p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [SubDirective, App, SuperDirective],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'super do check',
                    'super after content init',
                    'super after content checked',
                    'super after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['sub destroy']);
            });
        });
        describe('inputs', () => {
            // TODO: add test where the two inputs have a different alias
            // TODO: add test where super has an @Input() on the property, and sub does not
            // TODO: add test where super has an @Input('alias') on the property and sub has no alias
            it('should inherit inputs', () => {
                let SuperDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[super-dir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _foo_decorators;
                    let _foo_initializers = [];
                    let _foo_extraInitializers = [];
                    let _bar_decorators;
                    let _bar_initializers = [];
                    let _bar_extraInitializers = [];
                    let _baz_decorators;
                    let _baz_initializers = [];
                    let _baz_extraInitializers = [];
                    var SuperDirective = _classThis = class {
                        constructor() {
                            this.foo = __runInitializers(this, _foo_initializers, '');
                            this.bar = (__runInitializers(this, _foo_extraInitializers), __runInitializers(this, _bar_initializers, ''));
                            this.baz = (__runInitializers(this, _bar_extraInitializers), __runInitializers(this, _baz_initializers, ''));
                            __runInitializers(this, _baz_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "SuperDirective");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _foo_decorators = [(0, core_1.Input)()];
                        _bar_decorators = [(0, core_1.Input)()];
                        _baz_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _foo_decorators, { kind: "field", name: "foo", static: false, private: false, access: { has: obj => "foo" in obj, get: obj => obj.foo, set: (obj, value) => { obj.foo = value; } }, metadata: _metadata }, _foo_initializers, _foo_extraInitializers);
                        __esDecorate(null, null, _bar_decorators, { kind: "field", name: "bar", static: false, private: false, access: { has: obj => "bar" in obj, get: obj => obj.bar, set: (obj, value) => { obj.bar = value; } }, metadata: _metadata }, _bar_initializers, _bar_extraInitializers);
                        __esDecorate(null, null, _baz_decorators, { kind: "field", name: "baz", static: false, private: false, access: { has: obj => "baz" in obj, get: obj => obj.baz, set: (obj, value) => { obj.baz = value; } }, metadata: _metadata }, _baz_initializers, _baz_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SuperDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SuperDirective = _classThis;
                })();
                let SubDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[sub-dir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperDirective;
                    let _baz_decorators;
                    let _baz_initializers = [];
                    let _baz_extraInitializers = [];
                    let _qux_decorators;
                    let _qux_initializers = [];
                    let _qux_extraInitializers = [];
                    var SubDirective = _classThis = class extends _classSuper {
                        constructor() {
                            super(...arguments);
                            this.baz = __runInitializers(this, _baz_initializers, '');
                            this.qux = (__runInitializers(this, _baz_extraInitializers), __runInitializers(this, _qux_initializers, ''));
                            __runInitializers(this, _qux_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "SubDirective");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        _baz_decorators = [(0, core_1.Input)()];
                        _qux_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _baz_decorators, { kind: "field", name: "baz", static: false, private: false, access: { has: obj => "baz" in obj, get: obj => obj.baz, set: (obj, value) => { obj.baz = value; } }, metadata: _metadata }, _baz_initializers, _baz_extraInitializers);
                        __esDecorate(null, null, _qux_decorators, { kind: "field", name: "qux", static: false, private: false, access: { has: obj => "qux" in obj, get: obj => obj.qux, set: (obj, value) => { obj.qux = value; } }, metadata: _metadata }, _qux_initializers, _qux_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SubDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SubDirective = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<p sub-dir [foo]="a" [bar]="b" [baz]="c" [qux]="d"></p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.a = 'a';
                            this.b = 'b';
                            this.c = 'c';
                            this.d = 'd';
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
                    declarations: [App, SubDirective, SuperDirective],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                const subDir = fixture.debugElement
                    .query(platform_browser_1.By.directive(SubDirective))
                    .injector.get(SubDirective);
                expect(subDir.foo).toBe('a');
                expect(subDir.bar).toBe('b');
                expect(subDir.baz).toBe('c');
                expect(subDir.qux).toBe('d');
            });
        });
        describe('outputs', () => {
            // TODO: add tests where both sub and super have Output on same property with different
            // aliases
            // TODO: add test where super has property with alias and sub has property with no alias
            // TODO: add test where super has an @Input() on the property, and sub does not
            it('should inherit outputs', () => {
                let SuperDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[super-dir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _foo_decorators;
                    let _foo_initializers = [];
                    let _foo_extraInitializers = [];
                    var SuperDirective = _classThis = class {
                        constructor() {
                            this.foo = __runInitializers(this, _foo_initializers, new core_1.EventEmitter());
                            __runInitializers(this, _foo_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "SuperDirective");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _foo_decorators = [(0, core_1.Output)()];
                        __esDecorate(null, null, _foo_decorators, { kind: "field", name: "foo", static: false, private: false, access: { has: obj => "foo" in obj, get: obj => obj.foo, set: (obj, value) => { obj.foo = value; } }, metadata: _metadata }, _foo_initializers, _foo_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SuperDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SuperDirective = _classThis;
                })();
                let SubDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[sub-dir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperDirective;
                    var SubDirective = _classThis = class extends _classSuper {
                        ngOnInit() {
                            this.foo.emit('test');
                        }
                    };
                    __setFunctionName(_classThis, "SubDirective");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SubDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SubDirective = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `
        <div sub-dir (foo)="handleFoo($event)"></div>
      `,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.foo = '';
                        }
                        handleFoo(event) {
                            this.foo = event;
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
                    declarations: [App, SubDirective, SuperDirective],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                const app = fixture.componentInstance;
                expect(app.foo).toBe('test');
            });
        });
        describe('host bindings (style related)', () => {
            // TODO: sub and super HostBinding same property but different bindings
            // TODO: sub and super HostBinding same binding on two different properties
            it('should compose host bindings for styles', () => {
                let SuperDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[super-dir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _color_decorators;
                    let _color_initializers = [];
                    let _color_extraInitializers = [];
                    let _bg_decorators;
                    let _bg_initializers = [];
                    let _bg_extraInitializers = [];
                    var SuperDirective = _classThis = class {
                        constructor() {
                            this.color = __runInitializers(this, _color_initializers, 'red');
                            this.bg = (__runInitializers(this, _color_extraInitializers), __runInitializers(this, _bg_initializers, 'black'));
                            __runInitializers(this, _bg_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "SuperDirective");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _color_decorators = [(0, core_1.HostBinding)('style.color')];
                        _bg_decorators = [(0, core_1.HostBinding)('style.backgroundColor')];
                        __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                        __esDecorate(null, null, _bg_decorators, { kind: "field", name: "bg", static: false, private: false, access: { has: obj => "bg" in obj, get: obj => obj.bg, set: (obj, value) => { obj.bg = value; } }, metadata: _metadata }, _bg_initializers, _bg_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SuperDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SuperDirective = _classThis;
                })();
                let SubDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[sub-dir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperDirective;
                    var SubDirective = _classThis = class extends _classSuper {
                    };
                    __setFunctionName(_classThis, "SubDirective");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SubDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SubDirective = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `
        <p sub-dir>test</p>
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
                    declarations: [App, SubDirective, SuperDirective],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                const queryResult = fixture.debugElement.query(platform_browser_1.By.directive(SubDirective));
                expect(queryResult.nativeElement.tagName).toBe('P');
                expect(queryResult.nativeElement.style.color).toBe('red');
                expect(queryResult.nativeElement.style.backgroundColor).toBe('black');
            });
        });
        describe('host bindings (non-style related)', () => {
            // TODO: sub and super HostBinding same property but different bindings
            // TODO: sub and super HostBinding same binding on two different properties
            it('should compose host bindings (non-style related)', () => {
                let SuperDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[super-dir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _instanceExtraInitializers = [];
                    let _get_boundTitle_decorators;
                    let _superTitle_decorators;
                    let _superTitle_initializers = [];
                    let _superTitle_extraInitializers = [];
                    var SuperDirective = _classThis = class {
                        get boundTitle() {
                            return this.superTitle + '!!!';
                        }
                        constructor() {
                            this.superTitle = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _superTitle_initializers, ''));
                            __runInitializers(this, _superTitle_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "SuperDirective");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _get_boundTitle_decorators = [(0, core_1.HostBinding)('title')];
                        _superTitle_decorators = [(0, core_1.Input)()];
                        __esDecorate(_classThis, null, _get_boundTitle_decorators, { kind: "getter", name: "boundTitle", static: false, private: false, access: { has: obj => "boundTitle" in obj, get: obj => obj.boundTitle }, metadata: _metadata }, null, _instanceExtraInitializers);
                        __esDecorate(null, null, _superTitle_decorators, { kind: "field", name: "superTitle", static: false, private: false, access: { has: obj => "superTitle" in obj, get: obj => obj.superTitle, set: (obj, value) => { obj.superTitle = value; } }, metadata: _metadata }, _superTitle_initializers, _superTitle_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SuperDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SuperDirective = _classThis;
                })();
                let SubDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[sub-dir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperDirective;
                    var SubDirective = _classThis = class extends _classSuper {
                    };
                    __setFunctionName(_classThis, "SubDirective");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SubDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SubDirective = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `
        <p sub-dir superTitle="test">test</p>
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
                    declarations: [App, SubDirective, SuperDirective],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                const queryResult = fixture.debugElement.query(platform_browser_1.By.directive(SubDirective));
                expect(queryResult.nativeElement.title).toBe('test!!!');
            });
        });
        it('should inherit ContentChildren queries', () => {
            let foundQueryList;
            let ChildDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[child-dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildDir = _classThis = class {
                };
                __setFunctionName(_classThis, "ChildDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildDir = _classThis;
            })();
            let SuperDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[super-dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _customDirs_decorators;
                let _customDirs_initializers = [];
                let _customDirs_extraInitializers = [];
                var SuperDirective = _classThis = class {
                    constructor() {
                        this.customDirs = __runInitializers(this, _customDirs_initializers, void 0);
                        __runInitializers(this, _customDirs_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "SuperDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _customDirs_decorators = [(0, core_1.ContentChildren)(ChildDir)];
                    __esDecorate(null, null, _customDirs_decorators, { kind: "field", name: "customDirs", static: false, private: false, access: { has: obj => "customDirs" in obj, get: obj => obj.customDirs, set: (obj, value) => { obj.customDirs = value; } }, metadata: _metadata }, _customDirs_initializers, _customDirs_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SuperDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SuperDirective = _classThis;
            })();
            let SubDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[sub-dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = SuperDirective;
                var SubDirective = _classThis = class extends _classSuper {
                    ngAfterViewInit() {
                        foundQueryList = this.customDirs;
                    }
                };
                __setFunctionName(_classThis, "SubDirective");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SubDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SubDirective = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
        <ul sub-dir>
          <li child-dir>one</li>
          <li child-dir>two</li>
        </ul>
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
                declarations: [App, SubDirective, ChildDir, SuperDirective],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(foundQueryList.length).toBe(2);
        });
        // TODO: sub has Input and super has Output on same property
        // TODO: sub has Input and super has HostBinding on same property
        // TODO: sub has Input and super has ViewChild on same property
        // TODO: sub has Input and super has ViewChildren on same property
        // TODO: sub has Input and super has ContentChild on same property
        // TODO: sub has Input and super has ContentChildren on same property
        // TODO: sub has Output and super has HostBinding on same property
        // TODO: sub has Output and super has ViewChild on same property
        // TODO: sub has Output and super has ViewChildren on same property
        // TODO: sub has Output and super has ContentChild on same property
        // TODO: sub has Output and super has ContentChildren on same property
        // TODO: sub has HostBinding and super has ViewChild on same property
        // TODO: sub has HostBinding and super has ViewChildren on same property
        // TODO: sub has HostBinding and super has ContentChild on same property
        // TODO: sub has HostBinding and super has ContentChildren on same property
        // TODO: sub has ViewChild and super has ViewChildren on same property
        // TODO: sub has ViewChild and super has ContentChild on same property
        // TODO: sub has ViewChild and super has ContentChildren on same property
        // TODO: sub has ViewChildren and super has ContentChild on same property
        // TODO: sub has ViewChildren and super has ContentChildren on same property
        // TODO: sub has ContentChild and super has ContentChildren on same property
    });
    describe('of a directive by a bare class then by another directive', () => {
        // TODO: Add tests for ContentChild
        // TODO: Add tests for ViewChild
        describe('lifecycle hooks', () => {
            const fired = [];
            let SuperSuperDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[super-dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SuperSuperDirective = _classThis = class {
                    ngOnInit() {
                        fired.push('super init');
                    }
                    ngOnDestroy() {
                        fired.push('super destroy');
                    }
                    ngAfterContentInit() {
                        fired.push('super after content init');
                    }
                    ngAfterContentChecked() {
                        fired.push('super after content checked');
                    }
                    ngAfterViewInit() {
                        fired.push('super after view init');
                    }
                    ngAfterViewChecked() {
                        fired.push('super after view checked');
                    }
                    ngDoCheck() {
                        fired.push('super do check');
                    }
                };
                __setFunctionName(_classThis, "SuperSuperDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SuperSuperDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SuperSuperDirective = _classThis;
            })();
            class SuperDirective extends SuperSuperDirective {
            }
            beforeEach(() => (fired.length = 0));
            it('ngOnInit', () => {
                let SubDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[subDir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperDirective;
                    var SubDirective = _classThis = class extends _classSuper {
                        ngOnInit() {
                            fired.push('sub init');
                        }
                    };
                    __setFunctionName(_classThis, "SubDirective");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SubDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SubDirective = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<p *ngIf="showing" subDir></p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [SubDirective, App, SuperSuperDirective],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'sub init',
                    'super do check',
                    'super after content init',
                    'super after content checked',
                    'super after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngDoCheck', () => {
                let SubDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[subDir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperDirective;
                    var SubDirective = _classThis = class extends _classSuper {
                        ngDoCheck() {
                            fired.push('sub do check');
                        }
                    };
                    __setFunctionName(_classThis, "SubDirective");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SubDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SubDirective = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<p *ngIf="showing" subDir></p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [SubDirective, App, SuperSuperDirective],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'sub do check',
                    'super after content init',
                    'super after content checked',
                    'super after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngAfterContentInit', () => {
                let SubDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[subDir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperDirective;
                    var SubDirective = _classThis = class extends _classSuper {
                        ngAfterContentInit() {
                            fired.push('sub after content init');
                        }
                    };
                    __setFunctionName(_classThis, "SubDirective");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SubDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SubDirective = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<p *ngIf="showing" subDir></p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [SubDirective, App, SuperSuperDirective],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'super do check',
                    'sub after content init',
                    'super after content checked',
                    'super after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngAfterContentChecked', () => {
                let SubDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[subDir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperDirective;
                    var SubDirective = _classThis = class extends _classSuper {
                        ngAfterContentChecked() {
                            fired.push('sub after content checked');
                        }
                    };
                    __setFunctionName(_classThis, "SubDirective");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SubDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SubDirective = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<p *ngIf="showing" subDir></p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [SubDirective, App, SuperSuperDirective],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'super do check',
                    'super after content init',
                    'sub after content checked',
                    'super after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngAfterViewInit', () => {
                let SubDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[subDir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperDirective;
                    var SubDirective = _classThis = class extends _classSuper {
                        ngAfterViewInit() {
                            fired.push('sub after view init');
                        }
                    };
                    __setFunctionName(_classThis, "SubDirective");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SubDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SubDirective = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<p *ngIf="showing" subDir></p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [SubDirective, App, SuperSuperDirective],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'super do check',
                    'super after content init',
                    'super after content checked',
                    'sub after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngAfterViewChecked', () => {
                let SubDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[subDir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperDirective;
                    var SubDirective = _classThis = class extends _classSuper {
                        ngAfterViewChecked() {
                            fired.push('sub after view checked');
                        }
                    };
                    __setFunctionName(_classThis, "SubDirective");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SubDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SubDirective = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<p *ngIf="showing" subDir></p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [SubDirective, App, SuperSuperDirective],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'super do check',
                    'super after content init',
                    'super after content checked',
                    'super after view init',
                    'sub after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngOnDestroy', () => {
                let SubDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[subDir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperDirective;
                    var SubDirective = _classThis = class extends _classSuper {
                        ngOnDestroy() {
                            fired.push('sub destroy');
                        }
                    };
                    __setFunctionName(_classThis, "SubDirective");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SubDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SubDirective = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<p *ngIf="showing" subDir></p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [SubDirective, App, SuperSuperDirective],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'super do check',
                    'super after content init',
                    'super after content checked',
                    'super after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['sub destroy']);
            });
        });
        describe('inputs', () => {
            // TODO: add test where the two inputs have a different alias
            // TODO: add test where super has an @Input() on the property, and sub does not
            // TODO: add test where super has an @Input('alias') on the property and sub has no alias
            it('should inherit inputs', () => {
                let SuperSuperDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[super-dir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _foo_decorators;
                    let _foo_initializers = [];
                    let _foo_extraInitializers = [];
                    let _baz_decorators;
                    let _baz_initializers = [];
                    let _baz_extraInitializers = [];
                    var SuperSuperDirective = _classThis = class {
                        constructor() {
                            this.foo = __runInitializers(this, _foo_initializers, '');
                            this.baz = (__runInitializers(this, _foo_extraInitializers), __runInitializers(this, _baz_initializers, ''));
                            __runInitializers(this, _baz_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "SuperSuperDirective");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _foo_decorators = [(0, core_1.Input)()];
                        _baz_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _foo_decorators, { kind: "field", name: "foo", static: false, private: false, access: { has: obj => "foo" in obj, get: obj => obj.foo, set: (obj, value) => { obj.foo = value; } }, metadata: _metadata }, _foo_initializers, _foo_extraInitializers);
                        __esDecorate(null, null, _baz_decorators, { kind: "field", name: "baz", static: false, private: false, access: { has: obj => "baz" in obj, get: obj => obj.baz, set: (obj, value) => { obj.baz = value; } }, metadata: _metadata }, _baz_initializers, _baz_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SuperSuperDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SuperSuperDirective = _classThis;
                })();
                let SuperDirective = (() => {
                    var _a;
                    let _classSuper = SuperSuperDirective;
                    let _bar_decorators;
                    let _bar_initializers = [];
                    let _bar_extraInitializers = [];
                    return _a = class SuperDirective extends _classSuper {
                            constructor() {
                                super(...arguments);
                                this.bar = __runInitializers(this, _bar_initializers, '');
                                __runInitializers(this, _bar_extraInitializers);
                            }
                        },
                        (() => {
                            var _b;
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
                            _bar_decorators = [(0, core_1.Input)()];
                            __esDecorate(null, null, _bar_decorators, { kind: "field", name: "bar", static: false, private: false, access: { has: obj => "bar" in obj, get: obj => obj.bar, set: (obj, value) => { obj.bar = value; } }, metadata: _metadata }, _bar_initializers, _bar_extraInitializers);
                            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        })(),
                        _a;
                })();
                let SubDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[sub-dir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperDirective;
                    let _baz_decorators;
                    let _baz_initializers = [];
                    let _baz_extraInitializers = [];
                    let _qux_decorators;
                    let _qux_initializers = [];
                    let _qux_extraInitializers = [];
                    var SubDirective = _classThis = class extends _classSuper {
                        constructor() {
                            super(...arguments);
                            this.baz = __runInitializers(this, _baz_initializers, '');
                            this.qux = (__runInitializers(this, _baz_extraInitializers), __runInitializers(this, _qux_initializers, ''));
                            __runInitializers(this, _qux_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "SubDirective");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        _baz_decorators = [(0, core_1.Input)()];
                        _qux_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _baz_decorators, { kind: "field", name: "baz", static: false, private: false, access: { has: obj => "baz" in obj, get: obj => obj.baz, set: (obj, value) => { obj.baz = value; } }, metadata: _metadata }, _baz_initializers, _baz_extraInitializers);
                        __esDecorate(null, null, _qux_decorators, { kind: "field", name: "qux", static: false, private: false, access: { has: obj => "qux" in obj, get: obj => obj.qux, set: (obj, value) => { obj.qux = value; } }, metadata: _metadata }, _qux_initializers, _qux_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SubDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SubDirective = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-app',
                            template: `<p sub-dir [foo]="a" [bar]="b" [baz]="c" [qux]="d"></p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.a = 'a';
                            this.b = 'b';
                            this.c = 'c';
                            this.d = 'd';
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
                    declarations: [App, SubDirective, SuperDirective, SuperSuperDirective],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                const subDir = fixture.debugElement
                    .query(platform_browser_1.By.directive(SubDirective))
                    .injector.get(SubDirective);
                expect(subDir.foo).toBe('a');
                expect(subDir.bar).toBe('b');
                expect(subDir.baz).toBe('c');
                expect(subDir.qux).toBe('d');
            });
        });
        describe('outputs', () => {
            // TODO: add tests where both sub and super have Output on same property with different
            // aliases
            // TODO: add test where super has property with alias and sub has property with no alias
            // TODO: add test where super has an @Input() on the property, and sub does not
            it('should inherit outputs', () => {
                let SuperSuperDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[super-dir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _foo_decorators;
                    let _foo_initializers = [];
                    let _foo_extraInitializers = [];
                    var SuperSuperDirective = _classThis = class {
                        constructor() {
                            this.foo = __runInitializers(this, _foo_initializers, new core_1.EventEmitter());
                            __runInitializers(this, _foo_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "SuperSuperDirective");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _foo_decorators = [(0, core_1.Output)()];
                        __esDecorate(null, null, _foo_decorators, { kind: "field", name: "foo", static: false, private: false, access: { has: obj => "foo" in obj, get: obj => obj.foo, set: (obj, value) => { obj.foo = value; } }, metadata: _metadata }, _foo_initializers, _foo_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SuperSuperDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SuperSuperDirective = _classThis;
                })();
                let SuperDirective = (() => {
                    var _a;
                    let _classSuper = SuperSuperDirective;
                    let _bar_decorators;
                    let _bar_initializers = [];
                    let _bar_extraInitializers = [];
                    return _a = class SuperDirective extends _classSuper {
                            constructor() {
                                super(...arguments);
                                this.bar = __runInitializers(this, _bar_initializers, new core_1.EventEmitter());
                                __runInitializers(this, _bar_extraInitializers);
                            }
                        },
                        (() => {
                            var _b;
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
                            _bar_decorators = [(0, core_1.Output)()];
                            __esDecorate(null, null, _bar_decorators, { kind: "field", name: "bar", static: false, private: false, access: { has: obj => "bar" in obj, get: obj => obj.bar, set: (obj, value) => { obj.bar = value; } }, metadata: _metadata }, _bar_initializers, _bar_extraInitializers);
                            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        })(),
                        _a;
                })();
                let SubDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[sub-dir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperDirective;
                    var SubDirective = _classThis = class extends _classSuper {
                        ngOnInit() {
                            this.foo.emit('test1');
                            this.bar.emit('test2');
                        }
                    };
                    __setFunctionName(_classThis, "SubDirective");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SubDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SubDirective = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `
          <div sub-dir (foo)="handleFoo($event)" (bar)="handleBar($event)"></div>
        `,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.foo = '';
                            this.bar = '';
                        }
                        handleFoo(event) {
                            this.foo = event;
                        }
                        handleBar(event) {
                            this.bar = event;
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
                    declarations: [App, SubDirective, SuperDirective, SuperSuperDirective],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                const app = fixture.componentInstance;
                expect(app.foo).toBe('test1');
                expect(app.bar).toBe('test2');
            });
        });
        describe('host bindings (style related)', () => {
            // TODO: sub and super HostBinding same property but different bindings
            // TODO: sub and super HostBinding same binding on two different properties
            it('should compose host bindings for styles', () => {
                let SuperSuperDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[super-dir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _color_decorators;
                    let _color_initializers = [];
                    let _color_extraInitializers = [];
                    var SuperSuperDirective = _classThis = class {
                        constructor() {
                            this.color = __runInitializers(this, _color_initializers, 'red');
                            __runInitializers(this, _color_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "SuperSuperDirective");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _color_decorators = [(0, core_1.HostBinding)('style.color')];
                        __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SuperSuperDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SuperSuperDirective = _classThis;
                })();
                let SuperDirective = (() => {
                    var _a;
                    let _classSuper = SuperSuperDirective;
                    let _bg_decorators;
                    let _bg_initializers = [];
                    let _bg_extraInitializers = [];
                    return _a = class SuperDirective extends _classSuper {
                            constructor() {
                                super(...arguments);
                                this.bg = __runInitializers(this, _bg_initializers, 'black');
                                __runInitializers(this, _bg_extraInitializers);
                            }
                        },
                        (() => {
                            var _b;
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
                            _bg_decorators = [(0, core_1.HostBinding)('style.backgroundColor')];
                            __esDecorate(null, null, _bg_decorators, { kind: "field", name: "bg", static: false, private: false, access: { has: obj => "bg" in obj, get: obj => obj.bg, set: (obj, value) => { obj.bg = value; } }, metadata: _metadata }, _bg_initializers, _bg_extraInitializers);
                            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        })(),
                        _a;
                })();
                let SubDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[sub-dir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperDirective;
                    var SubDirective = _classThis = class extends _classSuper {
                    };
                    __setFunctionName(_classThis, "SubDirective");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SubDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SubDirective = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `
          <p sub-dir>test</p>
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
                    declarations: [App, SubDirective, SuperDirective, SuperSuperDirective],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                const queryResult = fixture.debugElement.query(platform_browser_1.By.directive(SubDirective));
                expect(queryResult.nativeElement.tagName).toBe('P');
                expect(queryResult.nativeElement.style.color).toBe('red');
                expect(queryResult.nativeElement.style.backgroundColor).toBe('black');
            });
        });
        describe('host bindings (non-style related)', () => {
            // TODO: sub and super HostBinding same property but different bindings
            // TODO: sub and super HostBinding same binding on two different properties
            it('should compose host bindings (non-style related)', () => {
                let SuperSuperDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[super-dir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _instanceExtraInitializers = [];
                    let _get_boundTitle_decorators;
                    let _superTitle_decorators;
                    let _superTitle_initializers = [];
                    let _superTitle_extraInitializers = [];
                    var SuperSuperDirective = _classThis = class {
                        get boundTitle() {
                            return this.superTitle + '!!!';
                        }
                        constructor() {
                            this.superTitle = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _superTitle_initializers, ''));
                            __runInitializers(this, _superTitle_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "SuperSuperDirective");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _get_boundTitle_decorators = [(0, core_1.HostBinding)('title')];
                        _superTitle_decorators = [(0, core_1.Input)()];
                        __esDecorate(_classThis, null, _get_boundTitle_decorators, { kind: "getter", name: "boundTitle", static: false, private: false, access: { has: obj => "boundTitle" in obj, get: obj => obj.boundTitle }, metadata: _metadata }, null, _instanceExtraInitializers);
                        __esDecorate(null, null, _superTitle_decorators, { kind: "field", name: "superTitle", static: false, private: false, access: { has: obj => "superTitle" in obj, get: obj => obj.superTitle, set: (obj, value) => { obj.superTitle = value; } }, metadata: _metadata }, _superTitle_initializers, _superTitle_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SuperSuperDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SuperSuperDirective = _classThis;
                })();
                let SuperDirective = (() => {
                    var _a;
                    let _classSuper = SuperSuperDirective;
                    let _instanceExtraInitializers = [];
                    let _get_boundAltKey_decorators;
                    let _superAccessKey_decorators;
                    let _superAccessKey_initializers = [];
                    let _superAccessKey_extraInitializers = [];
                    return _a = class SuperDirective extends _classSuper {
                            get boundAltKey() {
                                return this.superAccessKey + '???';
                            }
                            constructor() {
                                super(...arguments);
                                this.superAccessKey = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _superAccessKey_initializers, ''));
                                __runInitializers(this, _superAccessKey_extraInitializers);
                            }
                        },
                        (() => {
                            var _b;
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
                            _get_boundAltKey_decorators = [(0, core_1.HostBinding)('accessKey')];
                            _superAccessKey_decorators = [(0, core_1.Input)()];
                            __esDecorate(_a, null, _get_boundAltKey_decorators, { kind: "getter", name: "boundAltKey", static: false, private: false, access: { has: obj => "boundAltKey" in obj, get: obj => obj.boundAltKey }, metadata: _metadata }, null, _instanceExtraInitializers);
                            __esDecorate(null, null, _superAccessKey_decorators, { kind: "field", name: "superAccessKey", static: false, private: false, access: { has: obj => "superAccessKey" in obj, get: obj => obj.superAccessKey, set: (obj, value) => { obj.superAccessKey = value; } }, metadata: _metadata }, _superAccessKey_initializers, _superAccessKey_extraInitializers);
                            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        })(),
                        _a;
                })();
                let SubDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[sub-dir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperDirective;
                    var SubDirective = _classThis = class extends _classSuper {
                    };
                    __setFunctionName(_classThis, "SubDirective");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SubDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SubDirective = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `
        <p sub-dir superTitle="test1" superAccessKey="test2">test</p>
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
                    declarations: [App, SubDirective, SuperDirective, SuperSuperDirective],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                const p = fixture.debugElement.query(platform_browser_1.By.directive(SubDirective)).nativeElement;
                expect(p.title).toBe('test1!!!');
                expect(p.accessKey).toBe('test2???');
            });
        });
        it('should inherit ContentChildren queries', () => {
            let foundChildDir1s;
            let foundChildDir2s;
            let ChildDir1 = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[child-dir-one]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildDir1 = _classThis = class {
                };
                __setFunctionName(_classThis, "ChildDir1");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildDir1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildDir1 = _classThis;
            })();
            let ChildDir2 = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[child-dir-two]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildDir2 = _classThis = class {
                };
                __setFunctionName(_classThis, "ChildDir2");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildDir2 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildDir2 = _classThis;
            })();
            let SuperSuperDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[super-dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _childDir1s_decorators;
                let _childDir1s_initializers = [];
                let _childDir1s_extraInitializers = [];
                var SuperSuperDirective = _classThis = class {
                    constructor() {
                        this.childDir1s = __runInitializers(this, _childDir1s_initializers, void 0);
                        __runInitializers(this, _childDir1s_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "SuperSuperDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _childDir1s_decorators = [(0, core_1.ContentChildren)(ChildDir1)];
                    __esDecorate(null, null, _childDir1s_decorators, { kind: "field", name: "childDir1s", static: false, private: false, access: { has: obj => "childDir1s" in obj, get: obj => obj.childDir1s, set: (obj, value) => { obj.childDir1s = value; } }, metadata: _metadata }, _childDir1s_initializers, _childDir1s_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SuperSuperDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SuperSuperDirective = _classThis;
            })();
            let SuperDirective = (() => {
                var _a;
                let _classSuper = SuperSuperDirective;
                let _childDir2s_decorators;
                let _childDir2s_initializers = [];
                let _childDir2s_extraInitializers = [];
                return _a = class SuperDirective extends _classSuper {
                        constructor() {
                            super(...arguments);
                            this.childDir2s = __runInitializers(this, _childDir2s_initializers, void 0);
                            __runInitializers(this, _childDir2s_extraInitializers);
                        }
                    },
                    (() => {
                        var _b;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
                        _childDir2s_decorators = [(0, core_1.ContentChildren)(ChildDir1)];
                        __esDecorate(null, null, _childDir2s_decorators, { kind: "field", name: "childDir2s", static: false, private: false, access: { has: obj => "childDir2s" in obj, get: obj => obj.childDir2s, set: (obj, value) => { obj.childDir2s = value; } }, metadata: _metadata }, _childDir2s_initializers, _childDir2s_extraInitializers);
                        if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    })(),
                    _a;
            })();
            let SubDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[sub-dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = SuperDirective;
                var SubDirective = _classThis = class extends _classSuper {
                    ngAfterViewInit() {
                        foundChildDir1s = this.childDir1s;
                        foundChildDir2s = this.childDir2s;
                    }
                };
                __setFunctionName(_classThis, "SubDirective");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SubDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SubDirective = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
        <ul sub-dir>
          <li child-dir-one child-dir-two>one</li>
          <li child-dir-one>two</li>
          <li child-dir-two>three</li>
        </ul>
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
                declarations: [App, SubDirective, ChildDir1, SuperDirective],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(foundChildDir1s.length).toBe(2);
            expect(foundChildDir2s.length).toBe(2);
        });
        // TODO: sub has Input and super has Output on same property
        // TODO: sub has Input and super has HostBinding on same property
        // TODO: sub has Input and super has ViewChild on same property
        // TODO: sub has Input and super has ViewChildren on same property
        // TODO: sub has Input and super has ContentChild on same property
        // TODO: sub has Input and super has ContentChildren on same property
        // TODO: sub has Output and super has HostBinding on same property
        // TODO: sub has Output and super has ViewChild on same property
        // TODO: sub has Output and super has ViewChildren on same property
        // TODO: sub has Output and super has ContentChild on same property
        // TODO: sub has Output and super has ContentChildren on same property
        // TODO: sub has HostBinding and super has ViewChild on same property
        // TODO: sub has HostBinding and super has ViewChildren on same property
        // TODO: sub has HostBinding and super has ContentChild on same property
        // TODO: sub has HostBinding and super has ContentChildren on same property
        // TODO: sub has ViewChild and super has ViewChildren on same property
        // TODO: sub has ViewChild and super has ContentChild on same property
        // TODO: sub has ViewChild and super has ContentChildren on same property
        // TODO: sub has ViewChildren and super has ContentChild on same property
        // TODO: sub has ViewChildren and super has ContentChildren on same property
        // TODO: sub has ContentChild and super has ContentChildren on same property
    });
    describe('of bare super class by a component', () => {
        // TODO: Add tests for ContentChild
        // TODO: Add tests for ViewChild
        describe('lifecycle hooks', () => {
            const fired = [];
            class SuperComponent {
                ngOnInit() {
                    fired.push('super init');
                }
                ngOnDestroy() {
                    fired.push('super destroy');
                }
                ngAfterContentInit() {
                    fired.push('super after content init');
                }
                ngAfterContentChecked() {
                    fired.push('super after content checked');
                }
                ngAfterViewInit() {
                    fired.push('super after view init');
                }
                ngAfterViewChecked() {
                    fired.push('super after view checked');
                }
                ngDoCheck() {
                    fired.push('super do check');
                }
            }
            beforeEach(() => (fired.length = 0));
            it('ngOnInit', () => {
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperComponent;
                    var MyComponent = _classThis = class extends _classSuper {
                        ngOnInit() {
                            fired.push('sub init');
                        }
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComponent = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<my-comp *ngIf="showing"></my-comp>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [MyComponent, App],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'sub init',
                    'super do check',
                    'super after content init',
                    'super after content checked',
                    'super after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngDoCheck', () => {
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'my-comp',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperComponent;
                    var MyComponent = _classThis = class extends _classSuper {
                        ngDoCheck() {
                            fired.push('sub do check');
                        }
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComponent = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<my-comp *ngIf="showing"></my-comp>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [MyComponent, App],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'sub do check',
                    'super after content init',
                    'super after content checked',
                    'super after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngAfterContentInit', () => {
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperComponent;
                    var MyComponent = _classThis = class extends _classSuper {
                        ngAfterContentInit() {
                            fired.push('sub after content init');
                        }
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComponent = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<my-comp *ngIf="showing"></my-comp>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [MyComponent, App],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'super do check',
                    'sub after content init',
                    'super after content checked',
                    'super after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngAfterContentChecked', () => {
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperComponent;
                    var MyComponent = _classThis = class extends _classSuper {
                        ngAfterContentChecked() {
                            fired.push('sub after content checked');
                        }
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComponent = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<my-comp *ngIf="showing"></my-comp>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [MyComponent, App],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'super do check',
                    'super after content init',
                    'sub after content checked',
                    'super after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngAfterViewInit', () => {
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperComponent;
                    var MyComponent = _classThis = class extends _classSuper {
                        ngAfterViewInit() {
                            fired.push('sub after view init');
                        }
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComponent = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<my-comp *ngIf="showing"></my-comp>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [MyComponent, App],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'super do check',
                    'super after content init',
                    'super after content checked',
                    'sub after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngAfterViewChecked', () => {
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperComponent;
                    var MyComponent = _classThis = class extends _classSuper {
                        ngAfterViewChecked() {
                            fired.push('sub after view checked');
                        }
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComponent = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<my-comp *ngIf="showing"></my-comp>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [MyComponent, App],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'super do check',
                    'super after content init',
                    'super after content checked',
                    'super after view init',
                    'sub after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngOnDestroy', () => {
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperComponent;
                    var MyComponent = _classThis = class extends _classSuper {
                        ngOnDestroy() {
                            fired.push('sub destroy');
                        }
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComponent = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<my-comp *ngIf="showing"></my-comp>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [MyComponent, App],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'super do check',
                    'super after content init',
                    'super after content checked',
                    'super after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['sub destroy']);
            });
        });
        describe('inputs', () => {
            // TODO: add test where the two inputs have a different alias
            // TODO: add test where super has an @Input() on the property, and sub does not
            // TODO: add test where super has an @Input('alias') on the property and sub has no alias
            it('should inherit inputs', () => {
                let SuperComponent = (() => {
                    var _a;
                    let _foo_decorators;
                    let _foo_initializers = [];
                    let _foo_extraInitializers = [];
                    let _bar_decorators;
                    let _bar_initializers = [];
                    let _bar_extraInitializers = [];
                    let _baz_decorators;
                    let _baz_initializers = [];
                    let _baz_extraInitializers = [];
                    return _a = class SuperComponent {
                            constructor() {
                                this.foo = __runInitializers(this, _foo_initializers, '');
                                this.bar = (__runInitializers(this, _foo_extraInitializers), __runInitializers(this, _bar_initializers, ''));
                                this.baz = (__runInitializers(this, _bar_extraInitializers), __runInitializers(this, _baz_initializers, ''));
                                __runInitializers(this, _baz_extraInitializers);
                            }
                        },
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            _foo_decorators = [(0, core_1.Input)()];
                            _bar_decorators = [(0, core_1.Input)()];
                            _baz_decorators = [(0, core_1.Input)()];
                            __esDecorate(null, null, _foo_decorators, { kind: "field", name: "foo", static: false, private: false, access: { has: obj => "foo" in obj, get: obj => obj.foo, set: (obj, value) => { obj.foo = value; } }, metadata: _metadata }, _foo_initializers, _foo_extraInitializers);
                            __esDecorate(null, null, _bar_decorators, { kind: "field", name: "bar", static: false, private: false, access: { has: obj => "bar" in obj, get: obj => obj.bar, set: (obj, value) => { obj.bar = value; } }, metadata: _metadata }, _bar_initializers, _bar_extraInitializers);
                            __esDecorate(null, null, _baz_decorators, { kind: "field", name: "baz", static: false, private: false, access: { has: obj => "baz" in obj, get: obj => obj.baz, set: (obj, value) => { obj.baz = value; } }, metadata: _metadata }, _baz_initializers, _baz_extraInitializers);
                            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        })(),
                        _a;
                })();
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperComponent;
                    let _baz_decorators;
                    let _baz_initializers = [];
                    let _baz_extraInitializers = [];
                    let _qux_decorators;
                    let _qux_initializers = [];
                    let _qux_extraInitializers = [];
                    var MyComponent = _classThis = class extends _classSuper {
                        constructor() {
                            super(...arguments);
                            this.baz = __runInitializers(this, _baz_initializers, '');
                            this.qux = (__runInitializers(this, _baz_extraInitializers), __runInitializers(this, _qux_initializers, ''));
                            __runInitializers(this, _qux_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        _baz_decorators = [(0, core_1.Input)()];
                        _qux_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _baz_decorators, { kind: "field", name: "baz", static: false, private: false, access: { has: obj => "baz" in obj, get: obj => obj.baz, set: (obj, value) => { obj.baz = value; } }, metadata: _metadata }, _baz_initializers, _baz_extraInitializers);
                        __esDecorate(null, null, _qux_decorators, { kind: "field", name: "qux", static: false, private: false, access: { has: obj => "qux" in obj, get: obj => obj.qux, set: (obj, value) => { obj.qux = value; } }, metadata: _metadata }, _qux_initializers, _qux_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComponent = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<my-comp [foo]="a" [bar]="b" [baz]="c" [qux]="d"></my-comp>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.a = 'a';
                            this.b = 'b';
                            this.c = 'c';
                            this.d = 'd';
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
                const subDir = fixture.debugElement.query(platform_browser_1.By.directive(MyComponent)).componentInstance;
                expect(subDir.foo).toEqual('a');
                expect(subDir.bar).toEqual('b');
                expect(subDir.baz).toEqual('c');
                expect(subDir.qux).toEqual('d');
            });
        });
        describe('outputs', () => {
            // TODO: add tests where both sub and super have Output on same property with different
            // aliases
            // TODO: add test where super has property with alias and sub has property with no alias
            // TODO: add test where super has an @Input() on the property, and sub does not
            it('should inherit outputs', () => {
                let SuperComponent = (() => {
                    var _a;
                    let _foo_decorators;
                    let _foo_initializers = [];
                    let _foo_extraInitializers = [];
                    return _a = class SuperComponent {
                            constructor() {
                                this.foo = __runInitializers(this, _foo_initializers, new core_1.EventEmitter());
                                __runInitializers(this, _foo_extraInitializers);
                            }
                        },
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            _foo_decorators = [(0, core_1.Output)()];
                            __esDecorate(null, null, _foo_decorators, { kind: "field", name: "foo", static: false, private: false, access: { has: obj => "foo" in obj, get: obj => obj.foo, set: (obj, value) => { obj.foo = value; } }, metadata: _metadata }, _foo_initializers, _foo_extraInitializers);
                            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        })(),
                        _a;
                })();
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperComponent;
                    var MyComponent = _classThis = class extends _classSuper {
                        ngOnInit() {
                            this.foo.emit('test');
                        }
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
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
          <my-comp (foo)="handleFoo($event)"></my-comp>
        `,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.foo = '';
                        }
                        handleFoo(event) {
                            this.foo = event;
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
                const app = fixture.componentInstance;
                expect(app.foo).toBe('test');
            });
        });
        describe('host bindings (style related)', () => {
            // TODO: sub and super HostBinding same property but different bindings
            // TODO: sub and super HostBinding same binding on two different properties
            it('should compose host bindings for styles', () => {
                let SuperComponent = (() => {
                    var _a;
                    let _color_decorators;
                    let _color_initializers = [];
                    let _color_extraInitializers = [];
                    let _bg_decorators;
                    let _bg_initializers = [];
                    let _bg_extraInitializers = [];
                    return _a = class SuperComponent {
                            constructor() {
                                this.color = __runInitializers(this, _color_initializers, 'red');
                                this.bg = (__runInitializers(this, _color_extraInitializers), __runInitializers(this, _bg_initializers, 'black'));
                                __runInitializers(this, _bg_extraInitializers);
                            }
                        },
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            _color_decorators = [(0, core_1.HostBinding)('style.color')];
                            _bg_decorators = [(0, core_1.HostBinding)('style.backgroundColor')];
                            __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                            __esDecorate(null, null, _bg_decorators, { kind: "field", name: "bg", static: false, private: false, access: { has: obj => "bg" in obj, get: obj => obj.bg, set: (obj, value) => { obj.bg = value; } }, metadata: _metadata }, _bg_initializers, _bg_extraInitializers);
                            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        })(),
                        _a;
                })();
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperComponent;
                    var MyComponent = _classThis = class extends _classSuper {
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
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
          <my-comp>test</my-comp>
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
                    declarations: [App, MyComponent],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                const queryResult = fixture.debugElement.query(platform_browser_1.By.directive(MyComponent));
                expect(queryResult.nativeElement.tagName).toBe('MY-COMP');
                expect(queryResult.nativeElement.style.color).toBe('red');
                expect(queryResult.nativeElement.style.backgroundColor).toBe('black');
            });
        });
        describe('host bindings (non-style related)', () => {
            // TODO: sub and super HostBinding same property but different bindings
            // TODO: sub and super HostBinding same binding on two different properties
            it('should compose host bindings (non-style related)', () => {
                let SuperComponent = (() => {
                    var _a;
                    let _instanceExtraInitializers = [];
                    let _get_boundTitle_decorators;
                    let _superTitle_decorators;
                    let _superTitle_initializers = [];
                    let _superTitle_extraInitializers = [];
                    return _a = class SuperComponent {
                            get boundTitle() {
                                return this.superTitle + '!!!';
                            }
                            constructor() {
                                this.superTitle = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _superTitle_initializers, ''));
                                __runInitializers(this, _superTitle_extraInitializers);
                            }
                        },
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            _get_boundTitle_decorators = [(0, core_1.HostBinding)('title')];
                            _superTitle_decorators = [(0, core_1.Input)()];
                            __esDecorate(_a, null, _get_boundTitle_decorators, { kind: "getter", name: "boundTitle", static: false, private: false, access: { has: obj => "boundTitle" in obj, get: obj => obj.boundTitle }, metadata: _metadata }, null, _instanceExtraInitializers);
                            __esDecorate(null, null, _superTitle_decorators, { kind: "field", name: "superTitle", static: false, private: false, access: { has: obj => "superTitle" in obj, get: obj => obj.superTitle, set: (obj, value) => { obj.superTitle = value; } }, metadata: _metadata }, _superTitle_initializers, _superTitle_extraInitializers);
                            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        })(),
                        _a;
                })();
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperComponent;
                    var MyComponent = _classThis = class extends _classSuper {
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
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
        <my-comp superTitle="test">test</my-comp>
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
                    declarations: [App, MyComponent],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                const queryResult = fixture.debugElement.query(platform_browser_1.By.directive(MyComponent));
                expect(queryResult.nativeElement.title).toBe('test!!!');
            });
        });
        it('should inherit ContentChildren queries', () => {
            let foundQueryList;
            let ChildDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[child-dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildDir = _classThis = class {
                };
                __setFunctionName(_classThis, "ChildDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildDir = _classThis;
            })();
            let SuperComponent = (() => {
                var _a;
                let _customDirs_decorators;
                let _customDirs_initializers = [];
                let _customDirs_extraInitializers = [];
                return _a = class SuperComponent {
                        constructor() {
                            this.customDirs = __runInitializers(this, _customDirs_initializers, void 0);
                            __runInitializers(this, _customDirs_extraInitializers);
                        }
                    },
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _customDirs_decorators = [(0, core_1.ContentChildren)(ChildDir)];
                        __esDecorate(null, null, _customDirs_decorators, { kind: "field", name: "customDirs", static: false, private: false, access: { has: obj => "customDirs" in obj, get: obj => obj.customDirs, set: (obj, value) => { obj.customDirs = value; } }, metadata: _metadata }, _customDirs_initializers, _customDirs_extraInitializers);
                        if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    })(),
                    _a;
            })();
            let MyComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: `<ul><ng-content></ng-content></ul>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = SuperComponent;
                var MyComponent = _classThis = class extends _classSuper {
                    ngAfterViewInit() {
                        foundQueryList = this.customDirs;
                    }
                };
                __setFunctionName(_classThis, "MyComponent");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
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
        <my-comp>
          <li child-dir>one</li>
          <li child-dir>two</li>
        </my-comp>
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
                declarations: [App, MyComponent, ChildDir],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(foundQueryList.length).toBe(2);
        });
        // TODO: sub has Input and super has Output on same property
        // TODO: sub has Input and super has HostBinding on same property
        // TODO: sub has Input and super has ViewChild on same property
        // TODO: sub has Input and super has ViewChildren on same property
        // TODO: sub has Input and super has ContentChild on same property
        // TODO: sub has Input and super has ContentChildren on same property
        // TODO: sub has Output and super has HostBinding on same property
        // TODO: sub has Output and super has ViewChild on same property
        // TODO: sub has Output and super has ViewChildren on same property
        // TODO: sub has Output and super has ContentChild on same property
        // TODO: sub has Output and super has ContentChildren on same property
        // TODO: sub has HostBinding and super has ViewChild on same property
        // TODO: sub has HostBinding and super has ViewChildren on same property
        // TODO: sub has HostBinding and super has ContentChild on same property
        // TODO: sub has HostBinding and super has ContentChildren on same property
        // TODO: sub has ViewChild and super has ViewChildren on same property
        // TODO: sub has ViewChild and super has ContentChild on same property
        // TODO: sub has ViewChild and super has ContentChildren on same property
        // TODO: sub has ViewChildren and super has ContentChild on same property
        // TODO: sub has ViewChildren and super has ContentChildren on same property
        // TODO: sub has ContentChild and super has ContentChildren on same property
    });
    describe('of a directive inherited by a component', () => {
        // TODO: Add tests for ContentChild
        // TODO: Add tests for ViewChild
        describe('lifecycle hooks', () => {
            const fired = [];
            let SuperDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[super-dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SuperDirective = _classThis = class {
                    ngOnInit() {
                        fired.push('super init');
                    }
                    ngOnDestroy() {
                        fired.push('super destroy');
                    }
                    ngAfterContentInit() {
                        fired.push('super after content init');
                    }
                    ngAfterContentChecked() {
                        fired.push('super after content checked');
                    }
                    ngAfterViewInit() {
                        fired.push('super after view init');
                    }
                    ngAfterViewChecked() {
                        fired.push('super after view checked');
                    }
                    ngDoCheck() {
                        fired.push('super do check');
                    }
                };
                __setFunctionName(_classThis, "SuperDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SuperDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SuperDirective = _classThis;
            })();
            beforeEach(() => (fired.length = 0));
            it('ngOnInit', () => {
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperDirective;
                    var MyComponent = _classThis = class extends _classSuper {
                        ngOnInit() {
                            fired.push('sub init');
                        }
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComponent = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<my-comp *ngIf="showing"></my-comp>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [MyComponent, App, SuperDirective],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'sub init',
                    'super do check',
                    'super after content init',
                    'super after content checked',
                    'super after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngDoCheck', () => {
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperDirective;
                    var MyComponent = _classThis = class extends _classSuper {
                        ngDoCheck() {
                            fired.push('sub do check');
                        }
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComponent = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<my-comp *ngIf="showing"></my-comp>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [MyComponent, App, SuperDirective],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'sub do check',
                    'super after content init',
                    'super after content checked',
                    'super after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngAfterContentInit', () => {
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperDirective;
                    var MyComponent = _classThis = class extends _classSuper {
                        ngAfterContentInit() {
                            fired.push('sub after content init');
                        }
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComponent = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<my-comp *ngIf="showing"></my-comp>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [MyComponent, App, SuperDirective],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'super do check',
                    'sub after content init',
                    'super after content checked',
                    'super after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngAfterContentChecked', () => {
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperDirective;
                    var MyComponent = _classThis = class extends _classSuper {
                        ngAfterContentChecked() {
                            fired.push('sub after content checked');
                        }
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComponent = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<my-comp *ngIf="showing"></my-comp>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [MyComponent, App, SuperDirective],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'super do check',
                    'super after content init',
                    'sub after content checked',
                    'super after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngAfterViewInit', () => {
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperDirective;
                    var MyComponent = _classThis = class extends _classSuper {
                        ngAfterViewInit() {
                            fired.push('sub after view init');
                        }
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComponent = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<my-comp *ngIf="showing"></my-comp>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [MyComponent, App, SuperDirective],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'super do check',
                    'super after content init',
                    'super after content checked',
                    'sub after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngAfterViewChecked', () => {
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperDirective;
                    var MyComponent = _classThis = class extends _classSuper {
                        ngAfterViewChecked() {
                            fired.push('sub after view checked');
                        }
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComponent = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<my-comp *ngIf="showing"></my-comp>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [MyComponent, App, SuperDirective],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'super do check',
                    'super after content init',
                    'super after content checked',
                    'super after view init',
                    'sub after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngOnDestroy', () => {
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperDirective;
                    var MyComponent = _classThis = class extends _classSuper {
                        ngOnDestroy() {
                            fired.push('sub destroy');
                        }
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComponent = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<my-comp *ngIf="showing"></my-comp>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [MyComponent, App, SuperDirective],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'super do check',
                    'super after content init',
                    'super after content checked',
                    'super after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['sub destroy']);
            });
        });
        describe('inputs', () => {
            // TODO: add test where the two inputs have a different alias
            // TODO: add test where super has an @Input() on the property, and sub does not
            // TODO: add test where super has an @Input('alias') on the property and sub has no alias
            it('should inherit inputs', () => {
                let SuperDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[super-dir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _foo_decorators;
                    let _foo_initializers = [];
                    let _foo_extraInitializers = [];
                    let _bar_decorators;
                    let _bar_initializers = [];
                    let _bar_extraInitializers = [];
                    let _baz_decorators;
                    let _baz_initializers = [];
                    let _baz_extraInitializers = [];
                    var SuperDirective = _classThis = class {
                        constructor() {
                            this.foo = __runInitializers(this, _foo_initializers, '');
                            this.bar = (__runInitializers(this, _foo_extraInitializers), __runInitializers(this, _bar_initializers, ''));
                            this.baz = (__runInitializers(this, _bar_extraInitializers), __runInitializers(this, _baz_initializers, ''));
                            __runInitializers(this, _baz_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "SuperDirective");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _foo_decorators = [(0, core_1.Input)()];
                        _bar_decorators = [(0, core_1.Input)()];
                        _baz_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _foo_decorators, { kind: "field", name: "foo", static: false, private: false, access: { has: obj => "foo" in obj, get: obj => obj.foo, set: (obj, value) => { obj.foo = value; } }, metadata: _metadata }, _foo_initializers, _foo_extraInitializers);
                        __esDecorate(null, null, _bar_decorators, { kind: "field", name: "bar", static: false, private: false, access: { has: obj => "bar" in obj, get: obj => obj.bar, set: (obj, value) => { obj.bar = value; } }, metadata: _metadata }, _bar_initializers, _bar_extraInitializers);
                        __esDecorate(null, null, _baz_decorators, { kind: "field", name: "baz", static: false, private: false, access: { has: obj => "baz" in obj, get: obj => obj.baz, set: (obj, value) => { obj.baz = value; } }, metadata: _metadata }, _baz_initializers, _baz_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SuperDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SuperDirective = _classThis;
                })();
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperDirective;
                    let _baz_decorators;
                    let _baz_initializers = [];
                    let _baz_extraInitializers = [];
                    let _qux_decorators;
                    let _qux_initializers = [];
                    let _qux_extraInitializers = [];
                    var MyComponent = _classThis = class extends _classSuper {
                        constructor() {
                            super(...arguments);
                            this.baz = __runInitializers(this, _baz_initializers, '');
                            this.qux = (__runInitializers(this, _baz_extraInitializers), __runInitializers(this, _qux_initializers, ''));
                            __runInitializers(this, _qux_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        _baz_decorators = [(0, core_1.Input)()];
                        _qux_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _baz_decorators, { kind: "field", name: "baz", static: false, private: false, access: { has: obj => "baz" in obj, get: obj => obj.baz, set: (obj, value) => { obj.baz = value; } }, metadata: _metadata }, _baz_initializers, _baz_extraInitializers);
                        __esDecorate(null, null, _qux_decorators, { kind: "field", name: "qux", static: false, private: false, access: { has: obj => "qux" in obj, get: obj => obj.qux, set: (obj, value) => { obj.qux = value; } }, metadata: _metadata }, _qux_initializers, _qux_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComponent = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<my-comp [foo]="a" [bar]="b" [baz]="c" [qux]="d"></my-comp>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.a = 'a';
                            this.b = 'b';
                            this.c = 'c';
                            this.d = 'd';
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
                    declarations: [App, MyComponent, SuperDirective],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                const subDir = fixture.debugElement.query(platform_browser_1.By.directive(MyComponent)).componentInstance;
                expect(subDir.foo).toEqual('a');
                expect(subDir.bar).toEqual('b');
                expect(subDir.baz).toEqual('c');
                expect(subDir.qux).toEqual('d');
            });
        });
        describe('outputs', () => {
            // TODO: add tests where both sub and super have Output on same property with different
            // aliases
            // TODO: add test where super has property with alias and sub has property with no alias
            // TODO: add test where super has an @Input() on the property, and sub does not
            it('should inherit outputs', () => {
                let SuperDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[super-dir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _foo_decorators;
                    let _foo_initializers = [];
                    let _foo_extraInitializers = [];
                    var SuperDirective = _classThis = class {
                        constructor() {
                            this.foo = __runInitializers(this, _foo_initializers, new core_1.EventEmitter());
                            __runInitializers(this, _foo_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "SuperDirective");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _foo_decorators = [(0, core_1.Output)()];
                        __esDecorate(null, null, _foo_decorators, { kind: "field", name: "foo", static: false, private: false, access: { has: obj => "foo" in obj, get: obj => obj.foo, set: (obj, value) => { obj.foo = value; } }, metadata: _metadata }, _foo_initializers, _foo_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SuperDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SuperDirective = _classThis;
                })();
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperDirective;
                    var MyComponent = _classThis = class extends _classSuper {
                        ngOnInit() {
                            this.foo.emit('test');
                        }
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
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
          <my-comp (foo)="handleFoo($event)"></my-comp>
        `,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.foo = '';
                        }
                        handleFoo(event) {
                            this.foo = event;
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
                    declarations: [App, MyComponent, SuperDirective],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                const app = fixture.componentInstance;
                expect(app.foo).toBe('test');
            });
        });
        describe('host bindings (style related)', () => {
            // TODO: sub and super HostBinding same property but different bindings
            // TODO: sub and super HostBinding same binding on two different properties
            it('should compose host bindings for styles', () => {
                let SuperDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[super-dir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _color_decorators;
                    let _color_initializers = [];
                    let _color_extraInitializers = [];
                    let _bg_decorators;
                    let _bg_initializers = [];
                    let _bg_extraInitializers = [];
                    var SuperDirective = _classThis = class {
                        constructor() {
                            this.color = __runInitializers(this, _color_initializers, 'red');
                            this.bg = (__runInitializers(this, _color_extraInitializers), __runInitializers(this, _bg_initializers, 'black'));
                            __runInitializers(this, _bg_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "SuperDirective");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _color_decorators = [(0, core_1.HostBinding)('style.color')];
                        _bg_decorators = [(0, core_1.HostBinding)('style.backgroundColor')];
                        __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                        __esDecorate(null, null, _bg_decorators, { kind: "field", name: "bg", static: false, private: false, access: { has: obj => "bg" in obj, get: obj => obj.bg, set: (obj, value) => { obj.bg = value; } }, metadata: _metadata }, _bg_initializers, _bg_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SuperDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SuperDirective = _classThis;
                })();
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperDirective;
                    var MyComponent = _classThis = class extends _classSuper {
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
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
          <my-comp>test</my-comp>
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
                    declarations: [App, MyComponent, SuperDirective],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                const queryResult = fixture.debugElement.query(platform_browser_1.By.directive(MyComponent));
                expect(queryResult.nativeElement.tagName).toBe('MY-COMP');
                expect(queryResult.nativeElement.style.color).toBe('red');
                expect(queryResult.nativeElement.style.backgroundColor).toBe('black');
            });
        });
        describe('host bindings (non-style related)', () => {
            // TODO: sub and super HostBinding same property but different bindings
            // TODO: sub and super HostBinding same binding on two different properties
            it('should compose host bindings (non-style related)', () => {
                let SuperDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[super-dir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _instanceExtraInitializers = [];
                    let _get_boundTitle_decorators;
                    let _superTitle_decorators;
                    let _superTitle_initializers = [];
                    let _superTitle_extraInitializers = [];
                    var SuperDirective = _classThis = class {
                        get boundTitle() {
                            return this.superTitle + '!!!';
                        }
                        constructor() {
                            this.superTitle = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _superTitle_initializers, ''));
                            __runInitializers(this, _superTitle_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "SuperDirective");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _get_boundTitle_decorators = [(0, core_1.HostBinding)('title')];
                        _superTitle_decorators = [(0, core_1.Input)()];
                        __esDecorate(_classThis, null, _get_boundTitle_decorators, { kind: "getter", name: "boundTitle", static: false, private: false, access: { has: obj => "boundTitle" in obj, get: obj => obj.boundTitle }, metadata: _metadata }, null, _instanceExtraInitializers);
                        __esDecorate(null, null, _superTitle_decorators, { kind: "field", name: "superTitle", static: false, private: false, access: { has: obj => "superTitle" in obj, get: obj => obj.superTitle, set: (obj, value) => { obj.superTitle = value; } }, metadata: _metadata }, _superTitle_initializers, _superTitle_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SuperDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SuperDirective = _classThis;
                })();
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperDirective;
                    var MyComponent = _classThis = class extends _classSuper {
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
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
        <my-comp superTitle="test">test</my-comp>
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
                    declarations: [App, MyComponent],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                const queryResult = fixture.debugElement.query(platform_browser_1.By.directive(MyComponent));
                expect(queryResult.nativeElement.title).toBe('test!!!');
            });
        });
        it('should inherit ContentChildren queries', () => {
            let foundQueryList;
            let ChildDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[child-dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildDir = _classThis = class {
                };
                __setFunctionName(_classThis, "ChildDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildDir = _classThis;
            })();
            let SuperDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[super-dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _customDirs_decorators;
                let _customDirs_initializers = [];
                let _customDirs_extraInitializers = [];
                var SuperDirective = _classThis = class {
                    constructor() {
                        this.customDirs = __runInitializers(this, _customDirs_initializers, void 0);
                        __runInitializers(this, _customDirs_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "SuperDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _customDirs_decorators = [(0, core_1.ContentChildren)(ChildDir)];
                    __esDecorate(null, null, _customDirs_decorators, { kind: "field", name: "customDirs", static: false, private: false, access: { has: obj => "customDirs" in obj, get: obj => obj.customDirs, set: (obj, value) => { obj.customDirs = value; } }, metadata: _metadata }, _customDirs_initializers, _customDirs_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SuperDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SuperDirective = _classThis;
            })();
            let MyComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: `<ul><ng-content></ng-content></ul>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = SuperDirective;
                var MyComponent = _classThis = class extends _classSuper {
                    ngAfterViewInit() {
                        foundQueryList = this.customDirs;
                    }
                };
                __setFunctionName(_classThis, "MyComponent");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
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
        <my-comp>
          <li child-dir>one</li>
          <li child-dir>two</li>
        </my-comp>
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
                declarations: [App, MyComponent, SuperDirective, ChildDir],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(foundQueryList.length).toBe(2);
        });
        it('should inherit ViewChildren queries', () => {
            let foundQueryList;
            let ChildDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[child-dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildDir = _classThis = class {
                };
                __setFunctionName(_classThis, "ChildDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildDir = _classThis;
            })();
            let SuperDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[super-dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _customDirs_decorators;
                let _customDirs_initializers = [];
                let _customDirs_extraInitializers = [];
                var SuperDirective = _classThis = class {
                    constructor() {
                        this.customDirs = __runInitializers(this, _customDirs_initializers, void 0);
                        __runInitializers(this, _customDirs_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "SuperDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _customDirs_decorators = [(0, core_1.ViewChildren)(ChildDir)];
                    __esDecorate(null, null, _customDirs_decorators, { kind: "field", name: "customDirs", static: false, private: false, access: { has: obj => "customDirs" in obj, get: obj => obj.customDirs, set: (obj, value) => { obj.customDirs = value; } }, metadata: _metadata }, _customDirs_initializers, _customDirs_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SuperDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SuperDirective = _classThis;
            })();
            let MyComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: `
          <ul>
            <li child-dir *ngFor="let item of items">{{item}}</li>
          </ul>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = SuperDirective;
                var MyComponent = _classThis = class extends _classSuper {
                    constructor() {
                        super(...arguments);
                        this.items = [1, 2, 3, 4, 5];
                    }
                    ngAfterViewInit() {
                        foundQueryList = this.customDirs;
                    }
                };
                __setFunctionName(_classThis, "MyComponent");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
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
        <my-comp></my-comp>
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
                declarations: [App, MyComponent, ChildDir, SuperDirective],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(foundQueryList.length).toBe(5);
        });
        // TODO: sub has Input and super has Output on same property
        // TODO: sub has Input and super has HostBinding on same property
        // TODO: sub has Input and super has ViewChild on same property
        // TODO: sub has Input and super has ViewChildren on same property
        // TODO: sub has Input and super has ContentChild on same property
        // TODO: sub has Input and super has ContentChildren on same property
        // TODO: sub has Output and super has HostBinding on same property
        // TODO: sub has Output and super has ViewChild on same property
        // TODO: sub has Output and super has ViewChildren on same property
        // TODO: sub has Output and super has ContentChild on same property
        // TODO: sub has Output and super has ContentChildren on same property
        // TODO: sub has HostBinding and super has ViewChild on same property
        // TODO: sub has HostBinding and super has ViewChildren on same property
        // TODO: sub has HostBinding and super has ContentChild on same property
        // TODO: sub has HostBinding and super has ContentChildren on same property
        // TODO: sub has ViewChild and super has ViewChildren on same property
        // TODO: sub has ViewChild and super has ContentChild on same property
        // TODO: sub has ViewChild and super has ContentChildren on same property
        // TODO: sub has ViewChildren and super has ContentChild on same property
        // TODO: sub has ViewChildren and super has ContentChildren on same property
        // TODO: sub has ContentChild and super has ContentChildren on same property
    });
    describe('of a directive inherited by a bare class and then by a component', () => {
        // TODO: Add tests for ContentChild
        // TODO: Add tests for ViewChild
        describe('lifecycle hooks', () => {
            const fired = [];
            let SuperDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[super-dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SuperDirective = _classThis = class {
                    ngOnInit() {
                        fired.push('super init');
                    }
                    ngOnDestroy() {
                        fired.push('super destroy');
                    }
                    ngAfterContentInit() {
                        fired.push('super after content init');
                    }
                    ngAfterContentChecked() {
                        fired.push('super after content checked');
                    }
                    ngAfterViewInit() {
                        fired.push('super after view init');
                    }
                    ngAfterViewChecked() {
                        fired.push('super after view checked');
                    }
                    ngDoCheck() {
                        fired.push('super do check');
                    }
                };
                __setFunctionName(_classThis, "SuperDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SuperDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SuperDirective = _classThis;
            })();
            class BareClass extends SuperDirective {
            }
            beforeEach(() => (fired.length = 0));
            it('ngOnInit', () => {
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = BareClass;
                    var MyComponent = _classThis = class extends _classSuper {
                        ngOnInit() {
                            fired.push('sub init');
                        }
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComponent = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<my-comp *ngIf="showing"></my-comp>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [MyComponent, App, SuperDirective],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'sub init',
                    'super do check',
                    'super after content init',
                    'super after content checked',
                    'super after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngDoCheck', () => {
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'my-comp',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = BareClass;
                    var MyComponent = _classThis = class extends _classSuper {
                        ngDoCheck() {
                            fired.push('sub do check');
                        }
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComponent = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<my-comp *ngIf="showing"></my-comp>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [MyComponent, App, SuperDirective],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'sub do check',
                    'super after content init',
                    'super after content checked',
                    'super after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngAfterContentInit', () => {
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = BareClass;
                    var MyComponent = _classThis = class extends _classSuper {
                        ngAfterContentInit() {
                            fired.push('sub after content init');
                        }
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComponent = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<my-comp *ngIf="showing"></my-comp>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [MyComponent, App, SuperDirective],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'super do check',
                    'sub after content init',
                    'super after content checked',
                    'super after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngAfterContentChecked', () => {
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = BareClass;
                    var MyComponent = _classThis = class extends _classSuper {
                        ngAfterContentChecked() {
                            fired.push('sub after content checked');
                        }
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComponent = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<my-comp *ngIf="showing"></my-comp>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [MyComponent, App, SuperDirective],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'super do check',
                    'super after content init',
                    'sub after content checked',
                    'super after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngAfterViewInit', () => {
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = BareClass;
                    var MyComponent = _classThis = class extends _classSuper {
                        ngAfterViewInit() {
                            fired.push('sub after view init');
                        }
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComponent = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<my-comp *ngIf="showing"></my-comp>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [MyComponent, App, SuperDirective],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'super do check',
                    'super after content init',
                    'super after content checked',
                    'sub after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngAfterViewChecked', () => {
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = BareClass;
                    var MyComponent = _classThis = class extends _classSuper {
                        ngAfterViewChecked() {
                            fired.push('sub after view checked');
                        }
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComponent = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<my-comp *ngIf="showing"></my-comp>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [MyComponent, App, SuperDirective],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'super do check',
                    'super after content init',
                    'super after content checked',
                    'super after view init',
                    'sub after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngOnDestroy', () => {
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = BareClass;
                    var MyComponent = _classThis = class extends _classSuper {
                        ngOnDestroy() {
                            fired.push('sub destroy');
                        }
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComponent = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<my-comp *ngIf="showing"></my-comp>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [MyComponent, App, SuperDirective],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'super do check',
                    'super after content init',
                    'super after content checked',
                    'super after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['sub destroy']);
            });
        });
        describe('inputs', () => {
            // TODO: add test where the two inputs have a different alias
            // TODO: add test where super has an @Input() on the property, and sub does not
            // TODO: add test where super has an @Input('alias') on the property and sub has no alias
            it('should inherit inputs', () => {
                let SuperDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[super-dir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _foo_decorators;
                    let _foo_initializers = [];
                    let _foo_extraInitializers = [];
                    let _baz_decorators;
                    let _baz_initializers = [];
                    let _baz_extraInitializers = [];
                    var SuperDirective = _classThis = class {
                        constructor() {
                            this.foo = __runInitializers(this, _foo_initializers, '');
                            this.baz = (__runInitializers(this, _foo_extraInitializers), __runInitializers(this, _baz_initializers, ''));
                            __runInitializers(this, _baz_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "SuperDirective");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _foo_decorators = [(0, core_1.Input)()];
                        _baz_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _foo_decorators, { kind: "field", name: "foo", static: false, private: false, access: { has: obj => "foo" in obj, get: obj => obj.foo, set: (obj, value) => { obj.foo = value; } }, metadata: _metadata }, _foo_initializers, _foo_extraInitializers);
                        __esDecorate(null, null, _baz_decorators, { kind: "field", name: "baz", static: false, private: false, access: { has: obj => "baz" in obj, get: obj => obj.baz, set: (obj, value) => { obj.baz = value; } }, metadata: _metadata }, _baz_initializers, _baz_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SuperDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SuperDirective = _classThis;
                })();
                let BareClass = (() => {
                    var _a;
                    let _classSuper = SuperDirective;
                    let _bar_decorators;
                    let _bar_initializers = [];
                    let _bar_extraInitializers = [];
                    return _a = class BareClass extends _classSuper {
                            constructor() {
                                super(...arguments);
                                this.bar = __runInitializers(this, _bar_initializers, '');
                                __runInitializers(this, _bar_extraInitializers);
                            }
                        },
                        (() => {
                            var _b;
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
                            _bar_decorators = [(0, core_1.Input)()];
                            __esDecorate(null, null, _bar_decorators, { kind: "field", name: "bar", static: false, private: false, access: { has: obj => "bar" in obj, get: obj => obj.bar, set: (obj, value) => { obj.bar = value; } }, metadata: _metadata }, _bar_initializers, _bar_extraInitializers);
                            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        })(),
                        _a;
                })();
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = BareClass;
                    let _baz_decorators;
                    let _baz_initializers = [];
                    let _baz_extraInitializers = [];
                    let _qux_decorators;
                    let _qux_initializers = [];
                    let _qux_extraInitializers = [];
                    var MyComponent = _classThis = class extends _classSuper {
                        constructor() {
                            super(...arguments);
                            this.baz = __runInitializers(this, _baz_initializers, '');
                            this.qux = (__runInitializers(this, _baz_extraInitializers), __runInitializers(this, _qux_initializers, ''));
                            __runInitializers(this, _qux_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        _baz_decorators = [(0, core_1.Input)()];
                        _qux_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _baz_decorators, { kind: "field", name: "baz", static: false, private: false, access: { has: obj => "baz" in obj, get: obj => obj.baz, set: (obj, value) => { obj.baz = value; } }, metadata: _metadata }, _baz_initializers, _baz_extraInitializers);
                        __esDecorate(null, null, _qux_decorators, { kind: "field", name: "qux", static: false, private: false, access: { has: obj => "qux" in obj, get: obj => obj.qux, set: (obj, value) => { obj.qux = value; } }, metadata: _metadata }, _qux_initializers, _qux_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComponent = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<my-comp [foo]="a" [bar]="b" [baz]="c" [qux]="d"></my-comp>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.a = 'a';
                            this.b = 'b';
                            this.c = 'c';
                            this.d = 'd';
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
                    declarations: [App, MyComponent, BareClass, SuperDirective],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                const subDir = fixture.debugElement.query(platform_browser_1.By.directive(MyComponent)).componentInstance;
                expect(subDir.foo).toEqual('a');
                expect(subDir.bar).toEqual('b');
                expect(subDir.baz).toEqual('c');
                expect(subDir.qux).toEqual('d');
            });
        });
        describe('outputs', () => {
            // TODO: add tests where both sub and super have Output on same property with different
            // aliases
            // TODO: add test where super has property with alias and sub has property with no alias
            // TODO: add test where super has an @Input() on the property, and sub does not
            it('should inherit outputs', () => {
                let SuperDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[super-dir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _foo_decorators;
                    let _foo_initializers = [];
                    let _foo_extraInitializers = [];
                    var SuperDirective = _classThis = class {
                        constructor() {
                            this.foo = __runInitializers(this, _foo_initializers, new core_1.EventEmitter());
                            __runInitializers(this, _foo_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "SuperDirective");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _foo_decorators = [(0, core_1.Output)()];
                        __esDecorate(null, null, _foo_decorators, { kind: "field", name: "foo", static: false, private: false, access: { has: obj => "foo" in obj, get: obj => obj.foo, set: (obj, value) => { obj.foo = value; } }, metadata: _metadata }, _foo_initializers, _foo_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SuperDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SuperDirective = _classThis;
                })();
                class BareClass extends SuperDirective {
                }
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = BareClass;
                    var MyComponent = _classThis = class extends _classSuper {
                        ngOnInit() {
                            this.foo.emit('test');
                        }
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
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
          <my-comp (foo)="handleFoo($event)"></my-comp>
        `,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.foo = '';
                        }
                        handleFoo(event) {
                            this.foo = event;
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
                    declarations: [App, MyComponent, SuperDirective],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                const app = fixture.componentInstance;
                expect(app.foo).toBe('test');
            });
        });
        describe('host bindings (style related)', () => {
            // TODO: sub and super HostBinding same property but different bindings
            // TODO: sub and super HostBinding same binding on two different properties
            it('should compose host bindings for styles', () => {
                let SuperDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[super-dir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _color_decorators;
                    let _color_initializers = [];
                    let _color_extraInitializers = [];
                    let _bg_decorators;
                    let _bg_initializers = [];
                    let _bg_extraInitializers = [];
                    var SuperDirective = _classThis = class {
                        constructor() {
                            this.color = __runInitializers(this, _color_initializers, 'red');
                            this.bg = (__runInitializers(this, _color_extraInitializers), __runInitializers(this, _bg_initializers, 'black'));
                            __runInitializers(this, _bg_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "SuperDirective");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _color_decorators = [(0, core_1.HostBinding)('style.color')];
                        _bg_decorators = [(0, core_1.HostBinding)('style.backgroundColor')];
                        __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                        __esDecorate(null, null, _bg_decorators, { kind: "field", name: "bg", static: false, private: false, access: { has: obj => "bg" in obj, get: obj => obj.bg, set: (obj, value) => { obj.bg = value; } }, metadata: _metadata }, _bg_initializers, _bg_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SuperDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SuperDirective = _classThis;
                })();
                class BareClass extends SuperDirective {
                }
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = BareClass;
                    var MyComponent = _classThis = class extends _classSuper {
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
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
          <my-comp>test</my-comp>
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
                    declarations: [App, MyComponent],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                const queryResult = fixture.debugElement.query(platform_browser_1.By.directive(MyComponent));
                expect(queryResult.nativeElement.tagName).toBe('MY-COMP');
                expect(queryResult.nativeElement.style.color).toBe('red');
                expect(queryResult.nativeElement.style.backgroundColor).toBe('black');
            });
        });
        describe('host bindings (non-style related)', () => {
            // TODO: sub and super HostBinding same property but different bindings
            // TODO: sub and super HostBinding same binding on two different properties
            it('should compose host bindings (non-style related)', () => {
                let SuperDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[super-dir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _instanceExtraInitializers = [];
                    let _get_boundTitle_decorators;
                    let _superTitle_decorators;
                    let _superTitle_initializers = [];
                    let _superTitle_extraInitializers = [];
                    var SuperDirective = _classThis = class {
                        get boundTitle() {
                            return this.superTitle + '!!!';
                        }
                        constructor() {
                            this.superTitle = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _superTitle_initializers, ''));
                            __runInitializers(this, _superTitle_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "SuperDirective");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _get_boundTitle_decorators = [(0, core_1.HostBinding)('title')];
                        _superTitle_decorators = [(0, core_1.Input)()];
                        __esDecorate(_classThis, null, _get_boundTitle_decorators, { kind: "getter", name: "boundTitle", static: false, private: false, access: { has: obj => "boundTitle" in obj, get: obj => obj.boundTitle }, metadata: _metadata }, null, _instanceExtraInitializers);
                        __esDecorate(null, null, _superTitle_decorators, { kind: "field", name: "superTitle", static: false, private: false, access: { has: obj => "superTitle" in obj, get: obj => obj.superTitle, set: (obj, value) => { obj.superTitle = value; } }, metadata: _metadata }, _superTitle_initializers, _superTitle_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SuperDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SuperDirective = _classThis;
                })();
                let BareClass = (() => {
                    var _a;
                    let _classSuper = SuperDirective;
                    let _instanceExtraInitializers = [];
                    let _get_boundAccessKey_decorators;
                    let _superAccessKey_decorators;
                    let _superAccessKey_initializers = [];
                    let _superAccessKey_extraInitializers = [];
                    return _a = class BareClass extends _classSuper {
                            get boundAccessKey() {
                                return this.superAccessKey + '???';
                            }
                            constructor() {
                                super(...arguments);
                                this.superAccessKey = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _superAccessKey_initializers, ''));
                                __runInitializers(this, _superAccessKey_extraInitializers);
                            }
                        },
                        (() => {
                            var _b;
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
                            _get_boundAccessKey_decorators = [(0, core_1.HostBinding)('accessKey')];
                            _superAccessKey_decorators = [(0, core_1.Input)()];
                            __esDecorate(_a, null, _get_boundAccessKey_decorators, { kind: "getter", name: "boundAccessKey", static: false, private: false, access: { has: obj => "boundAccessKey" in obj, get: obj => obj.boundAccessKey }, metadata: _metadata }, null, _instanceExtraInitializers);
                            __esDecorate(null, null, _superAccessKey_decorators, { kind: "field", name: "superAccessKey", static: false, private: false, access: { has: obj => "superAccessKey" in obj, get: obj => obj.superAccessKey, set: (obj, value) => { obj.superAccessKey = value; } }, metadata: _metadata }, _superAccessKey_initializers, _superAccessKey_extraInitializers);
                            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        })(),
                        _a;
                })();
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = BareClass;
                    var MyComponent = _classThis = class extends _classSuper {
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
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
          <my-comp superTitle="test1" superAccessKey="test2">test</my-comp>
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
                    declarations: [App, SuperDirective, BareClass, MyComponent],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                const queryResult = fixture.debugElement.query(platform_browser_1.By.directive(MyComponent));
                expect(queryResult.nativeElement.title).toBe('test1!!!');
                expect(queryResult.nativeElement.accessKey).toBe('test2???');
            });
        });
        it('should inherit ContentChildren queries', () => {
            let foundQueryList;
            let ChildDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[child-dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildDir = _classThis = class {
                };
                __setFunctionName(_classThis, "ChildDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildDir = _classThis;
            })();
            let SuperDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[super-dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _customDirs_decorators;
                let _customDirs_initializers = [];
                let _customDirs_extraInitializers = [];
                var SuperDirective = _classThis = class {
                    constructor() {
                        this.customDirs = __runInitializers(this, _customDirs_initializers, void 0);
                        __runInitializers(this, _customDirs_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "SuperDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _customDirs_decorators = [(0, core_1.ContentChildren)(ChildDir)];
                    __esDecorate(null, null, _customDirs_decorators, { kind: "field", name: "customDirs", static: false, private: false, access: { has: obj => "customDirs" in obj, get: obj => obj.customDirs, set: (obj, value) => { obj.customDirs = value; } }, metadata: _metadata }, _customDirs_initializers, _customDirs_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SuperDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SuperDirective = _classThis;
            })();
            class BareClass extends SuperDirective {
            }
            let MyComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: `<ul><ng-content></ng-content></ul>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = BareClass;
                var MyComponent = _classThis = class extends _classSuper {
                    ngAfterViewInit() {
                        foundQueryList = this.customDirs;
                    }
                };
                __setFunctionName(_classThis, "MyComponent");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
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
        <my-comp>
          <li child-dir>one</li>
          <li child-dir>two</li>
        </my-comp>
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
                declarations: [App, MyComponent, ChildDir, SuperDirective],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(foundQueryList.length).toBe(2);
        });
        it('should inherit ViewChildren queries', () => {
            let foundQueryList;
            let ChildDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[child-dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildDir = _classThis = class {
                };
                __setFunctionName(_classThis, "ChildDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildDir = _classThis;
            })();
            let SuperDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[super-dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _customDirs_decorators;
                let _customDirs_initializers = [];
                let _customDirs_extraInitializers = [];
                var SuperDirective = _classThis = class {
                    constructor() {
                        this.customDirs = __runInitializers(this, _customDirs_initializers, void 0);
                        __runInitializers(this, _customDirs_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "SuperDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _customDirs_decorators = [(0, core_1.ViewChildren)(ChildDir)];
                    __esDecorate(null, null, _customDirs_decorators, { kind: "field", name: "customDirs", static: false, private: false, access: { has: obj => "customDirs" in obj, get: obj => obj.customDirs, set: (obj, value) => { obj.customDirs = value; } }, metadata: _metadata }, _customDirs_initializers, _customDirs_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SuperDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SuperDirective = _classThis;
            })();
            class BareClass extends SuperDirective {
            }
            let MyComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: `
          <ul>
            <li child-dir *ngFor="let item of items">{{item}}</li>
          </ul>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = BareClass;
                var MyComponent = _classThis = class extends _classSuper {
                    constructor() {
                        super(...arguments);
                        this.items = [1, 2, 3, 4, 5];
                    }
                    ngAfterViewInit() {
                        foundQueryList = this.customDirs;
                    }
                };
                __setFunctionName(_classThis, "MyComponent");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
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
        <my-comp></my-comp>
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
                declarations: [App, MyComponent, ChildDir, SuperDirective],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(foundQueryList.length).toBe(5);
        });
        // TODO: sub has Input and super has Output on same property
        // TODO: sub has Input and super has HostBinding on same property
        // TODO: sub has Input and super has ViewChild on same property
        // TODO: sub has Input and super has ViewChildren on same property
        // TODO: sub has Input and super has ContentChild on same property
        // TODO: sub has Input and super has ContentChildren on same property
        // TODO: sub has Output and super has HostBinding on same property
        // TODO: sub has Output and super has ViewChild on same property
        // TODO: sub has Output and super has ViewChildren on same property
        // TODO: sub has Output and super has ContentChild on same property
        // TODO: sub has Output and super has ContentChildren on same property
        // TODO: sub has HostBinding and super has ViewChild on same property
        // TODO: sub has HostBinding and super has ViewChildren on same property
        // TODO: sub has HostBinding and super has ContentChild on same property
        // TODO: sub has HostBinding and super has ContentChildren on same property
        // TODO: sub has ViewChild and super has ViewChildren on same property
        // TODO: sub has ViewChild and super has ContentChild on same property
        // TODO: sub has ViewChild and super has ContentChildren on same property
        // TODO: sub has ViewChildren and super has ContentChild on same property
        // TODO: sub has ViewChildren and super has ContentChildren on same property
        // TODO: sub has ContentChild and super has ContentChildren on same property
    });
    describe('of a component inherited by a component', () => {
        // TODO: Add tests for ContentChild
        // TODO: Add tests for ViewChild
        describe('lifecycle hooks', () => {
            const fired = [];
            let SuperComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'super-comp',
                        template: `<p>super</p>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SuperComponent = _classThis = class {
                    ngOnInit() {
                        fired.push('super init');
                    }
                    ngOnDestroy() {
                        fired.push('super destroy');
                    }
                    ngAfterContentInit() {
                        fired.push('super after content init');
                    }
                    ngAfterContentChecked() {
                        fired.push('super after content checked');
                    }
                    ngAfterViewInit() {
                        fired.push('super after view init');
                    }
                    ngAfterViewChecked() {
                        fired.push('super after view checked');
                    }
                    ngDoCheck() {
                        fired.push('super do check');
                    }
                };
                __setFunctionName(_classThis, "SuperComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SuperComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SuperComponent = _classThis;
            })();
            beforeEach(() => (fired.length = 0));
            it('ngOnInit', () => {
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperComponent;
                    var MyComponent = _classThis = class extends _classSuper {
                        ngOnInit() {
                            fired.push('sub init');
                        }
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComponent = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<my-comp *ngIf="showing"></my-comp>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [MyComponent, App, SuperComponent],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'sub init',
                    'super do check',
                    'super after content init',
                    'super after content checked',
                    'super after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngDoCheck', () => {
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperComponent;
                    var MyComponent = _classThis = class extends _classSuper {
                        ngDoCheck() {
                            fired.push('sub do check');
                        }
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComponent = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<my-comp *ngIf="showing"></my-comp>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [MyComponent, App, SuperComponent],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'sub do check',
                    'super after content init',
                    'super after content checked',
                    'super after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngAfterContentInit', () => {
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperComponent;
                    var MyComponent = _classThis = class extends _classSuper {
                        ngAfterContentInit() {
                            fired.push('sub after content init');
                        }
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComponent = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<my-comp *ngIf="showing"></my-comp>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [MyComponent, App, SuperComponent],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'super do check',
                    'sub after content init',
                    'super after content checked',
                    'super after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngAfterContentChecked', () => {
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperComponent;
                    var MyComponent = _classThis = class extends _classSuper {
                        ngAfterContentChecked() {
                            fired.push('sub after content checked');
                        }
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComponent = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<my-comp *ngIf="showing"></my-comp>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [MyComponent, App, SuperComponent],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'super do check',
                    'super after content init',
                    'sub after content checked',
                    'super after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngAfterViewInit', () => {
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperComponent;
                    var MyComponent = _classThis = class extends _classSuper {
                        ngAfterViewInit() {
                            fired.push('sub after view init');
                        }
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComponent = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<my-comp *ngIf="showing"></my-comp>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [MyComponent, App, SuperComponent],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'super do check',
                    'super after content init',
                    'super after content checked',
                    'sub after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngAfterViewChecked', () => {
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperComponent;
                    var MyComponent = _classThis = class extends _classSuper {
                        ngAfterViewChecked() {
                            fired.push('sub after view checked');
                        }
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComponent = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<my-comp *ngIf="showing"></my-comp>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [MyComponent, App, SuperComponent],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'super do check',
                    'super after content init',
                    'super after content checked',
                    'super after view init',
                    'sub after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngOnDestroy', () => {
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperComponent;
                    var MyComponent = _classThis = class extends _classSuper {
                        ngOnDestroy() {
                            fired.push('sub destroy');
                        }
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComponent = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<my-comp *ngIf="showing"></my-comp>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [MyComponent, App, SuperComponent],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'super do check',
                    'super after content init',
                    'super after content checked',
                    'super after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['sub destroy']);
            });
        });
        describe('inputs', () => {
            // TODO: add test where the two inputs have a different alias
            // TODO: add test where super has an @Input() on the property, and sub does not
            // TODO: add test where super has an @Input('alias') on the property and sub has no alias
            it('should inherit inputs', () => {
                let SuperComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'super-comp',
                            template: `<p>super</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _foo_decorators;
                    let _foo_initializers = [];
                    let _foo_extraInitializers = [];
                    let _bar_decorators;
                    let _bar_initializers = [];
                    let _bar_extraInitializers = [];
                    let _baz_decorators;
                    let _baz_initializers = [];
                    let _baz_extraInitializers = [];
                    var SuperComponent = _classThis = class {
                        constructor() {
                            this.foo = __runInitializers(this, _foo_initializers, '');
                            this.bar = (__runInitializers(this, _foo_extraInitializers), __runInitializers(this, _bar_initializers, ''));
                            this.baz = (__runInitializers(this, _bar_extraInitializers), __runInitializers(this, _baz_initializers, ''));
                            __runInitializers(this, _baz_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "SuperComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _foo_decorators = [(0, core_1.Input)()];
                        _bar_decorators = [(0, core_1.Input)()];
                        _baz_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _foo_decorators, { kind: "field", name: "foo", static: false, private: false, access: { has: obj => "foo" in obj, get: obj => obj.foo, set: (obj, value) => { obj.foo = value; } }, metadata: _metadata }, _foo_initializers, _foo_extraInitializers);
                        __esDecorate(null, null, _bar_decorators, { kind: "field", name: "bar", static: false, private: false, access: { has: obj => "bar" in obj, get: obj => obj.bar, set: (obj, value) => { obj.bar = value; } }, metadata: _metadata }, _bar_initializers, _bar_extraInitializers);
                        __esDecorate(null, null, _baz_decorators, { kind: "field", name: "baz", static: false, private: false, access: { has: obj => "baz" in obj, get: obj => obj.baz, set: (obj, value) => { obj.baz = value; } }, metadata: _metadata }, _baz_initializers, _baz_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SuperComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SuperComponent = _classThis;
                })();
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperComponent;
                    let _baz_decorators;
                    let _baz_initializers = [];
                    let _baz_extraInitializers = [];
                    let _qux_decorators;
                    let _qux_initializers = [];
                    let _qux_extraInitializers = [];
                    var MyComponent = _classThis = class extends _classSuper {
                        constructor() {
                            super(...arguments);
                            this.baz = __runInitializers(this, _baz_initializers, '');
                            this.qux = (__runInitializers(this, _baz_extraInitializers), __runInitializers(this, _qux_initializers, ''));
                            __runInitializers(this, _qux_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        _baz_decorators = [(0, core_1.Input)()];
                        _qux_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _baz_decorators, { kind: "field", name: "baz", static: false, private: false, access: { has: obj => "baz" in obj, get: obj => obj.baz, set: (obj, value) => { obj.baz = value; } }, metadata: _metadata }, _baz_initializers, _baz_extraInitializers);
                        __esDecorate(null, null, _qux_decorators, { kind: "field", name: "qux", static: false, private: false, access: { has: obj => "qux" in obj, get: obj => obj.qux, set: (obj, value) => { obj.qux = value; } }, metadata: _metadata }, _qux_initializers, _qux_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComponent = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<my-comp [foo]="a" [bar]="b" [baz]="c" [qux]="d"></my-comp>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.a = 'a';
                            this.b = 'b';
                            this.c = 'c';
                            this.d = 'd';
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
                    declarations: [App, MyComponent, SuperComponent],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                const subDir = fixture.debugElement.query(platform_browser_1.By.directive(MyComponent)).componentInstance;
                expect(subDir.foo).toEqual('a');
                expect(subDir.bar).toEqual('b');
                expect(subDir.baz).toEqual('c');
                expect(subDir.qux).toEqual('d');
            });
        });
        describe('outputs', () => {
            // TODO: add tests where both sub and super have Output on same property with different
            // aliases
            // TODO: add test where super has property with alias and sub has property with no alias
            // TODO: add test where super has an @Input() on the property, and sub does not
            it('should inherit outputs', () => {
                let SuperComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'super-comp',
                            template: `<p>super</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _foo_decorators;
                    let _foo_initializers = [];
                    let _foo_extraInitializers = [];
                    var SuperComponent = _classThis = class {
                        constructor() {
                            this.foo = __runInitializers(this, _foo_initializers, new core_1.EventEmitter());
                            __runInitializers(this, _foo_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "SuperComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _foo_decorators = [(0, core_1.Output)()];
                        __esDecorate(null, null, _foo_decorators, { kind: "field", name: "foo", static: false, private: false, access: { has: obj => "foo" in obj, get: obj => obj.foo, set: (obj, value) => { obj.foo = value; } }, metadata: _metadata }, _foo_initializers, _foo_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SuperComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SuperComponent = _classThis;
                })();
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperComponent;
                    var MyComponent = _classThis = class extends _classSuper {
                        ngOnInit() {
                            this.foo.emit('test');
                        }
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
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
          <my-comp (foo)="handleFoo($event)"></my-comp>
        `,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.foo = '';
                        }
                        handleFoo(event) {
                            this.foo = event;
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
                    declarations: [App, MyComponent, SuperComponent],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                const app = fixture.componentInstance;
                expect(app.foo).toBe('test');
            });
        });
        describe('animations', () => {
            it('should work with inherited host bindings and animations', () => {
                let SuperComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'super-comp',
                            template: '<div>super-comp</div>',
                            host: {
                                '[@animation]': 'colorExp',
                            },
                            animations: [(0, animations_1.trigger)('animation', [(0, animations_1.state)('color', (0, animations_1.style)({ color: 'red' }))])],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SuperComponent = _classThis = class {
                        constructor() {
                            this.colorExp = 'color';
                        }
                    };
                    __setFunctionName(_classThis, "SuperComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SuperComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SuperComponent = _classThis;
                })();
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<div>my-comp</div>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperComponent;
                    var MyComponent = _classThis = class extends _classSuper {
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComponent = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '<my-comp>app</my-comp>',
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
                    declarations: [App, MyComponent, SuperComponent],
                    imports: [animations_2.NoopAnimationsModule],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                const queryResult = fixture.debugElement.query(platform_browser_1.By.css('my-comp'));
                expect(queryResult.nativeElement.style.color).toBe('red');
            });
            it('should compose animations (from super class)', () => {
                let SuperComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'super-comp',
                            template: '...',
                            animations: [
                                (0, animations_1.trigger)('animation1', [(0, animations_1.state)('color', (0, animations_1.style)({ color: 'red' }))]),
                                (0, animations_1.trigger)('animation2', [(0, animations_1.state)('opacity', (0, animations_1.style)({ opacity: '0.5' }))]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SuperComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SuperComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SuperComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SuperComponent = _classThis;
                })();
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: '<div>my-comp</div>',
                            host: {
                                '[@animation1]': 'colorExp',
                                '[@animation2]': 'opacityExp',
                                '[@animation3]': 'bgExp',
                            },
                            animations: [
                                (0, animations_1.trigger)('animation1', [(0, animations_1.state)('color', (0, animations_1.style)({ color: 'blue' }))]),
                                (0, animations_1.trigger)('animation3', [(0, animations_1.state)('bg', (0, animations_1.style)({ backgroundColor: 'green' }))]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperComponent;
                    var MyComponent = _classThis = class extends _classSuper {
                        constructor() {
                            super(...arguments);
                            this.colorExp = 'color';
                            this.opacityExp = 'opacity';
                            this.bgExp = 'bg';
                        }
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComponent = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '<my-comp>app</my-comp>',
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
                    declarations: [App, MyComponent, SuperComponent],
                    imports: [animations_2.NoopAnimationsModule],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                const queryResult = fixture.debugElement.query(platform_browser_1.By.css('my-comp'));
                expect(queryResult.nativeElement.style.color).toBe('blue');
                expect(queryResult.nativeElement.style.opacity).toBe('0.5');
                expect(queryResult.nativeElement.style.backgroundColor).toBe('green');
            });
        });
        describe('host bindings (style related)', () => {
            // TODO: sub and super HostBinding same property but different bindings
            // TODO: sub and super HostBinding same binding on two different properties
            it('should compose host bindings for styles', () => {
                let SuperComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'super-comp',
                            template: `<p>super</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _color_decorators;
                    let _color_initializers = [];
                    let _color_extraInitializers = [];
                    let _bg_decorators;
                    let _bg_initializers = [];
                    let _bg_extraInitializers = [];
                    var SuperComponent = _classThis = class {
                        constructor() {
                            this.color = __runInitializers(this, _color_initializers, 'red');
                            this.bg = (__runInitializers(this, _color_extraInitializers), __runInitializers(this, _bg_initializers, 'black'));
                            __runInitializers(this, _bg_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "SuperComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _color_decorators = [(0, core_1.HostBinding)('style.color')];
                        _bg_decorators = [(0, core_1.HostBinding)('style.backgroundColor')];
                        __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                        __esDecorate(null, null, _bg_decorators, { kind: "field", name: "bg", static: false, private: false, access: { has: obj => "bg" in obj, get: obj => obj.bg, set: (obj, value) => { obj.bg = value; } }, metadata: _metadata }, _bg_initializers, _bg_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SuperComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SuperComponent = _classThis;
                })();
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperComponent;
                    var MyComponent = _classThis = class extends _classSuper {
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
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
          <my-comp>test</my-comp>
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
                    declarations: [App, MyComponent, SuperComponent],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                const queryResult = fixture.debugElement.query(platform_browser_1.By.directive(MyComponent));
                expect(queryResult.nativeElement.tagName).toBe('MY-COMP');
                expect(queryResult.nativeElement.style.color).toBe('red');
                expect(queryResult.nativeElement.style.backgroundColor).toBe('black');
            });
        });
        describe('host bindings (non-style related)', () => {
            // TODO: sub and super HostBinding same property but different bindings
            // TODO: sub and super HostBinding same binding on two different properties
            it('should compose host bindings (non-style related)', () => {
                let SuperComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'super-comp',
                            template: `<p>super</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _instanceExtraInitializers = [];
                    let _get_boundTitle_decorators;
                    let _superTitle_decorators;
                    let _superTitle_initializers = [];
                    let _superTitle_extraInitializers = [];
                    var SuperComponent = _classThis = class {
                        get boundTitle() {
                            return this.superTitle + '!!!';
                        }
                        constructor() {
                            this.superTitle = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _superTitle_initializers, ''));
                            __runInitializers(this, _superTitle_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "SuperComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _get_boundTitle_decorators = [(0, core_1.HostBinding)('title')];
                        _superTitle_decorators = [(0, core_1.Input)()];
                        __esDecorate(_classThis, null, _get_boundTitle_decorators, { kind: "getter", name: "boundTitle", static: false, private: false, access: { has: obj => "boundTitle" in obj, get: obj => obj.boundTitle }, metadata: _metadata }, null, _instanceExtraInitializers);
                        __esDecorate(null, null, _superTitle_decorators, { kind: "field", name: "superTitle", static: false, private: false, access: { has: obj => "superTitle" in obj, get: obj => obj.superTitle, set: (obj, value) => { obj.superTitle = value; } }, metadata: _metadata }, _superTitle_initializers, _superTitle_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SuperComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SuperComponent = _classThis;
                })();
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperComponent;
                    var MyComponent = _classThis = class extends _classSuper {
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
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
        <my-comp superTitle="test">test</my-comp>
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
                    declarations: [App, MyComponent],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                const queryResult = fixture.debugElement.query(platform_browser_1.By.directive(MyComponent));
                expect(queryResult.nativeElement.title).toBe('test!!!');
            });
        });
        it('should inherit ContentChildren queries', () => {
            let foundQueryList;
            let ChildDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[child-dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildDir = _classThis = class {
                };
                __setFunctionName(_classThis, "ChildDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildDir = _classThis;
            })();
            let SuperComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'super-comp',
                        template: `<p>super</p>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _customDirs_decorators;
                let _customDirs_initializers = [];
                let _customDirs_extraInitializers = [];
                var SuperComponent = _classThis = class {
                    constructor() {
                        this.customDirs = __runInitializers(this, _customDirs_initializers, void 0);
                        __runInitializers(this, _customDirs_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "SuperComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _customDirs_decorators = [(0, core_1.ContentChildren)(ChildDir)];
                    __esDecorate(null, null, _customDirs_decorators, { kind: "field", name: "customDirs", static: false, private: false, access: { has: obj => "customDirs" in obj, get: obj => obj.customDirs, set: (obj, value) => { obj.customDirs = value; } }, metadata: _metadata }, _customDirs_initializers, _customDirs_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SuperComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SuperComponent = _classThis;
            })();
            let MyComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: `<ul><ng-content></ng-content></ul>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = SuperComponent;
                var MyComponent = _classThis = class extends _classSuper {
                    ngAfterViewInit() {
                        foundQueryList = this.customDirs;
                    }
                };
                __setFunctionName(_classThis, "MyComponent");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
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
        <my-comp>
          <li child-dir>one</li>
          <li child-dir>two</li>
        </my-comp>
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
                declarations: [App, MyComponent, SuperComponent, ChildDir],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(foundQueryList.length).toBe(2);
        });
        it('should inherit ViewChildren queries', () => {
            let foundQueryList;
            let ChildDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[child-dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildDir = _classThis = class {
                };
                __setFunctionName(_classThis, "ChildDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildDir = _classThis;
            })();
            let SuperComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'super-comp',
                        template: `<p>super</p>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _customDirs_decorators;
                let _customDirs_initializers = [];
                let _customDirs_extraInitializers = [];
                var SuperComponent = _classThis = class {
                    constructor() {
                        this.customDirs = __runInitializers(this, _customDirs_initializers, void 0);
                        __runInitializers(this, _customDirs_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "SuperComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _customDirs_decorators = [(0, core_1.ViewChildren)(ChildDir)];
                    __esDecorate(null, null, _customDirs_decorators, { kind: "field", name: "customDirs", static: false, private: false, access: { has: obj => "customDirs" in obj, get: obj => obj.customDirs, set: (obj, value) => { obj.customDirs = value; } }, metadata: _metadata }, _customDirs_initializers, _customDirs_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SuperComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SuperComponent = _classThis;
            })();
            let MyComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: `
          <ul>
            <li child-dir *ngFor="let item of items">{{item}}</li>
          </ul>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = SuperComponent;
                var MyComponent = _classThis = class extends _classSuper {
                    constructor() {
                        super(...arguments);
                        this.items = [1, 2, 3, 4, 5];
                    }
                    ngAfterViewInit() {
                        foundQueryList = this.customDirs;
                    }
                };
                __setFunctionName(_classThis, "MyComponent");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
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
        <my-comp></my-comp>
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
                declarations: [App, MyComponent, ChildDir, SuperComponent],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(foundQueryList.length).toBe(5);
        });
        it('should inherit host listeners from base class once', () => {
            const events = [];
            let BaseComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'app-base',
                        template: 'base',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _instanceExtraInitializers = [];
                let _clicked_decorators;
                var BaseComponent = _classThis = class {
                    clicked() {
                        events.push('BaseComponent.clicked');
                    }
                    constructor() {
                        __runInitializers(this, _instanceExtraInitializers);
                    }
                };
                __setFunctionName(_classThis, "BaseComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _clicked_decorators = [(0, core_1.HostListener)('click')];
                    __esDecorate(_classThis, null, _clicked_decorators, { kind: "method", name: "clicked", static: false, private: false, access: { has: obj => "clicked" in obj, get: obj => obj.clicked }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    BaseComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return BaseComponent = _classThis;
            })();
            let ChildComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'app-child',
                        template: 'child',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = BaseComponent;
                let _instanceExtraInitializers = [];
                let _focused_decorators;
                var ChildComponent = _classThis = class extends _classSuper {
                    // additional host listeners are defined here to have `hostBindings` function generated on
                    // component def, which would trigger `hostBindings` functions merge operation in
                    // InheritDefinitionFeature logic (merging Child and Base host binding functions)
                    focused() { }
                    clicked() {
                        events.push('ChildComponent.clicked');
                    }
                    constructor() {
                        super(...arguments);
                        __runInitializers(this, _instanceExtraInitializers);
                    }
                };
                __setFunctionName(_classThis, "ChildComponent");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    _focused_decorators = [(0, core_1.HostListener)('focus')];
                    __esDecorate(_classThis, null, _focused_decorators, { kind: "method", name: "focused", static: false, private: false, access: { has: obj => "focused" in obj, get: obj => obj.focused }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildComponent = _classThis;
            })();
            let GrandChildComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'app-grand-child',
                        template: 'grand-child',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = ChildComponent;
                let _instanceExtraInitializers = [];
                let _blurred_decorators;
                var GrandChildComponent = _classThis = class extends _classSuper {
                    // additional host listeners are defined here to have `hostBindings` function generated on
                    // component def, which would trigger `hostBindings` functions merge operation in
                    // InheritDefinitionFeature logic (merging GrandChild and Child host binding functions)
                    blurred() { }
                    clicked() {
                        events.push('GrandChildComponent.clicked');
                    }
                    constructor() {
                        super(...arguments);
                        __runInitializers(this, _instanceExtraInitializers);
                    }
                };
                __setFunctionName(_classThis, "GrandChildComponent");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    _blurred_decorators = [(0, core_1.HostListener)('blur')];
                    __esDecorate(_classThis, null, _blurred_decorators, { kind: "method", name: "blurred", static: false, private: false, access: { has: obj => "blurred" in obj, get: obj => obj.blurred }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    GrandChildComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return GrandChildComponent = _classThis;
            })();
            let RootApp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'root-app',
                        template: `
          <app-base></app-base>
          <app-child></app-child>
          <app-grand-child></app-grand-child>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootApp = _classThis = class {
                };
                __setFunctionName(_classThis, "RootApp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootApp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootApp = _classThis;
            })();
            const components = [BaseComponent, ChildComponent, GrandChildComponent];
            testing_1.TestBed.configureTestingModule({
                declarations: [RootApp, ...components],
            });
            const fixture = testing_1.TestBed.createComponent(RootApp);
            fixture.detectChanges();
            components.forEach((component) => {
                fixture.debugElement.query(platform_browser_1.By.directive(component)).nativeElement.click();
            });
            expect(events).toEqual([
                'BaseComponent.clicked',
                'ChildComponent.clicked',
                'GrandChildComponent.clicked',
            ]);
        });
        // TODO: sub has Input and super has Output on same property
        // TODO: sub has Input and super has HostBinding on same property
        // TODO: sub has Input and super has ViewChild on same property
        // TODO: sub has Input and super has ViewChildren on same property
        // TODO: sub has Input and super has ContentChild on same property
        // TODO: sub has Input and super has ContentChildren on same property
        // TODO: sub has Output and super has HostBinding on same property
        // TODO: sub has Output and super has ViewChild on same property
        // TODO: sub has Output and super has ViewChildren on same property
        // TODO: sub has Output and super has ContentChild on same property
        // TODO: sub has Output and super has ContentChildren on same property
        // TODO: sub has HostBinding and super has ViewChild on same property
        // TODO: sub has HostBinding and super has ViewChildren on same property
        // TODO: sub has HostBinding and super has ContentChild on same property
        // TODO: sub has HostBinding and super has ContentChildren on same property
        // TODO: sub has ViewChild and super has ViewChildren on same property
        // TODO: sub has ViewChild and super has ContentChild on same property
        // TODO: sub has ViewChild and super has ContentChildren on same property
        // TODO: sub has ViewChildren and super has ContentChild on same property
        // TODO: sub has ViewChildren and super has ContentChildren on same property
        // TODO: sub has ContentChild and super has ContentChildren on same property
    });
    describe('of a component inherited by a bare class then by a component', () => {
        // TODO: Add tests for ContentChild
        // TODO: Add tests for ViewChild
        describe('lifecycle hooks', () => {
            const fired = [];
            let SuperSuperComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'super-comp',
                        template: `<p>super</p>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SuperSuperComponent = _classThis = class {
                    ngOnInit() {
                        fired.push('super init');
                    }
                    ngOnDestroy() {
                        fired.push('super destroy');
                    }
                    ngAfterContentInit() {
                        fired.push('super after content init');
                    }
                    ngAfterContentChecked() {
                        fired.push('super after content checked');
                    }
                    ngAfterViewInit() {
                        fired.push('super after view init');
                    }
                    ngAfterViewChecked() {
                        fired.push('super after view checked');
                    }
                    ngDoCheck() {
                        fired.push('super do check');
                    }
                };
                __setFunctionName(_classThis, "SuperSuperComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SuperSuperComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SuperSuperComponent = _classThis;
            })();
            class SuperComponent extends SuperSuperComponent {
            }
            beforeEach(() => (fired.length = 0));
            it('ngOnInit', () => {
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperComponent;
                    var MyComponent = _classThis = class extends _classSuper {
                        ngOnInit() {
                            fired.push('sub init');
                        }
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComponent = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<my-comp *ngIf="showing"></my-comp>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [MyComponent, App, SuperComponent],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'sub init',
                    'super do check',
                    'super after content init',
                    'super after content checked',
                    'super after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngDoCheck', () => {
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperComponent;
                    var MyComponent = _classThis = class extends _classSuper {
                        ngDoCheck() {
                            fired.push('sub do check');
                        }
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComponent = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<my-comp *ngIf="showing"></my-comp>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [MyComponent, App, SuperComponent],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'sub do check',
                    'super after content init',
                    'super after content checked',
                    'super after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngAfterContentInit', () => {
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperComponent;
                    var MyComponent = _classThis = class extends _classSuper {
                        ngAfterContentInit() {
                            fired.push('sub after content init');
                        }
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComponent = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<my-comp *ngIf="showing"></my-comp>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [MyComponent, App, SuperComponent],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'super do check',
                    'sub after content init',
                    'super after content checked',
                    'super after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngAfterContentChecked', () => {
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperComponent;
                    var MyComponent = _classThis = class extends _classSuper {
                        ngAfterContentChecked() {
                            fired.push('sub after content checked');
                        }
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComponent = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<my-comp *ngIf="showing"></my-comp>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [MyComponent, App, SuperComponent],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'super do check',
                    'super after content init',
                    'sub after content checked',
                    'super after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngAfterViewInit', () => {
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperComponent;
                    var MyComponent = _classThis = class extends _classSuper {
                        ngAfterViewInit() {
                            fired.push('sub after view init');
                        }
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComponent = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<my-comp *ngIf="showing"></my-comp>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [MyComponent, App, SuperComponent],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'super do check',
                    'super after content init',
                    'super after content checked',
                    'sub after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngAfterViewChecked', () => {
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperComponent;
                    var MyComponent = _classThis = class extends _classSuper {
                        ngAfterViewChecked() {
                            fired.push('sub after view checked');
                        }
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComponent = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<my-comp *ngIf="showing"></my-comp>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [MyComponent, App, SuperComponent],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'super do check',
                    'super after content init',
                    'super after content checked',
                    'super after view init',
                    'sub after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['super destroy']);
            });
            it('ngOnDestroy', () => {
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperComponent;
                    var MyComponent = _classThis = class extends _classSuper {
                        ngOnDestroy() {
                            fired.push('sub destroy');
                        }
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComponent = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<my-comp *ngIf="showing"></my-comp>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.showing = true;
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
                    declarations: [MyComponent, App, SuperComponent],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fired).toEqual([
                    'super init',
                    'super do check',
                    'super after content init',
                    'super after content checked',
                    'super after view init',
                    'super after view checked',
                ]);
                fired.length = 0;
                fixture.componentInstance.showing = false;
                fixture.detectChanges();
                expect(fired).toEqual(['sub destroy']);
            });
        });
        describe('inputs', () => {
            // TODO: add test where the two inputs have a different alias
            // TODO: add test where super has an @Input() on the property, and sub does not
            // TODO: add test where super has an @Input('alias') on the property and sub has no alias
            it('should inherit inputs', () => {
                let SuperSuperComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'super-comp',
                            template: `<p>super</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _foo_decorators;
                    let _foo_initializers = [];
                    let _foo_extraInitializers = [];
                    let _baz_decorators;
                    let _baz_initializers = [];
                    let _baz_extraInitializers = [];
                    var SuperSuperComponent = _classThis = class {
                        constructor() {
                            this.foo = __runInitializers(this, _foo_initializers, '');
                            this.baz = (__runInitializers(this, _foo_extraInitializers), __runInitializers(this, _baz_initializers, ''));
                            __runInitializers(this, _baz_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "SuperSuperComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _foo_decorators = [(0, core_1.Input)()];
                        _baz_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _foo_decorators, { kind: "field", name: "foo", static: false, private: false, access: { has: obj => "foo" in obj, get: obj => obj.foo, set: (obj, value) => { obj.foo = value; } }, metadata: _metadata }, _foo_initializers, _foo_extraInitializers);
                        __esDecorate(null, null, _baz_decorators, { kind: "field", name: "baz", static: false, private: false, access: { has: obj => "baz" in obj, get: obj => obj.baz, set: (obj, value) => { obj.baz = value; } }, metadata: _metadata }, _baz_initializers, _baz_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SuperSuperComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SuperSuperComponent = _classThis;
                })();
                let BareClass = (() => {
                    var _a;
                    let _classSuper = SuperSuperComponent;
                    let _bar_decorators;
                    let _bar_initializers = [];
                    let _bar_extraInitializers = [];
                    return _a = class BareClass extends _classSuper {
                            constructor() {
                                super(...arguments);
                                this.bar = __runInitializers(this, _bar_initializers, '');
                                __runInitializers(this, _bar_extraInitializers);
                            }
                        },
                        (() => {
                            var _b;
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
                            _bar_decorators = [(0, core_1.Input)()];
                            __esDecorate(null, null, _bar_decorators, { kind: "field", name: "bar", static: false, private: false, access: { has: obj => "bar" in obj, get: obj => obj.bar, set: (obj, value) => { obj.bar = value; } }, metadata: _metadata }, _bar_initializers, _bar_extraInitializers);
                            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        })(),
                        _a;
                })();
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = BareClass;
                    let _baz_decorators;
                    let _baz_initializers = [];
                    let _baz_extraInitializers = [];
                    let _qux_decorators;
                    let _qux_initializers = [];
                    let _qux_extraInitializers = [];
                    var MyComponent = _classThis = class extends _classSuper {
                        constructor() {
                            super(...arguments);
                            this.baz = __runInitializers(this, _baz_initializers, '');
                            this.qux = (__runInitializers(this, _baz_extraInitializers), __runInitializers(this, _qux_initializers, ''));
                            __runInitializers(this, _qux_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        _baz_decorators = [(0, core_1.Input)()];
                        _qux_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _baz_decorators, { kind: "field", name: "baz", static: false, private: false, access: { has: obj => "baz" in obj, get: obj => obj.baz, set: (obj, value) => { obj.baz = value; } }, metadata: _metadata }, _baz_initializers, _baz_extraInitializers);
                        __esDecorate(null, null, _qux_decorators, { kind: "field", name: "qux", static: false, private: false, access: { has: obj => "qux" in obj, get: obj => obj.qux, set: (obj, value) => { obj.qux = value; } }, metadata: _metadata }, _qux_initializers, _qux_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComponent = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<my-comp [foo]="a" [bar]="b" [baz]="c" [qux]="d"></my-comp>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.a = 'a';
                            this.b = 'b';
                            this.c = 'c';
                            this.d = 'd';
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
                    declarations: [App, MyComponent, SuperSuperComponent, BareClass],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                const myComp = fixture.debugElement.query(platform_browser_1.By.directive(MyComponent)).componentInstance;
                expect(myComp.foo).toEqual('a');
                expect(myComp.bar).toEqual('b');
                expect(myComp.baz).toEqual('c');
                expect(myComp.qux).toEqual('d');
            });
        });
        describe('outputs', () => {
            // TODO: add tests where both sub and super have Output on same property with different
            // aliases
            // TODO: add test where super has property with alias and sub has property with no alias
            // TODO: add test where super has an @Input() on the property, and sub does not
            it('should inherit outputs', () => {
                let SuperSuperComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'super-comp',
                            template: `<p>super</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _foo_decorators;
                    let _foo_initializers = [];
                    let _foo_extraInitializers = [];
                    var SuperSuperComponent = _classThis = class {
                        constructor() {
                            this.foo = __runInitializers(this, _foo_initializers, new core_1.EventEmitter());
                            __runInitializers(this, _foo_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "SuperSuperComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _foo_decorators = [(0, core_1.Output)()];
                        __esDecorate(null, null, _foo_decorators, { kind: "field", name: "foo", static: false, private: false, access: { has: obj => "foo" in obj, get: obj => obj.foo, set: (obj, value) => { obj.foo = value; } }, metadata: _metadata }, _foo_initializers, _foo_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SuperSuperComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SuperSuperComponent = _classThis;
                })();
                let SuperComponent = (() => {
                    var _a;
                    let _classSuper = SuperSuperComponent;
                    let _bar_decorators;
                    let _bar_initializers = [];
                    let _bar_extraInitializers = [];
                    return _a = class SuperComponent extends _classSuper {
                            constructor() {
                                super(...arguments);
                                this.bar = __runInitializers(this, _bar_initializers, new core_1.EventEmitter());
                                __runInitializers(this, _bar_extraInitializers);
                            }
                        },
                        (() => {
                            var _b;
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
                            _bar_decorators = [(0, core_1.Output)()];
                            __esDecorate(null, null, _bar_decorators, { kind: "field", name: "bar", static: false, private: false, access: { has: obj => "bar" in obj, get: obj => obj.bar, set: (obj, value) => { obj.bar = value; } }, metadata: _metadata }, _bar_initializers, _bar_extraInitializers);
                            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        })(),
                        _a;
                })();
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperComponent;
                    var MyComponent = _classThis = class extends _classSuper {
                        ngOnInit() {
                            this.foo.emit('test1');
                            this.bar.emit('test2');
                        }
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
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
          <my-comp (foo)="handleFoo($event)" (bar)="handleBar($event)"></my-comp>
        `,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.foo = '';
                            this.bar = '';
                        }
                        handleFoo(event) {
                            this.foo = event;
                        }
                        handleBar(event) {
                            this.bar = event;
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
                    declarations: [App, MyComponent, SuperComponent, SuperSuperComponent],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                const app = fixture.componentInstance;
                expect(app.foo).toBe('test1');
                expect(app.bar).toBe('test2');
            });
        });
        describe('animations', () => {
            it('should compose animations across multiple inheritance levels', () => {
                let SuperComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'super-comp',
                            template: '...',
                            host: {
                                '[@animation1]': 'colorExp',
                                '[@animation2]': 'opacityExp',
                            },
                            animations: [
                                (0, animations_1.trigger)('animation1', [(0, animations_1.state)('color', (0, animations_1.style)({ color: 'red' }))]),
                                (0, animations_1.trigger)('animation2', [(0, animations_1.state)('opacity', (0, animations_1.style)({ opacity: '0.5' }))]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SuperComponent = _classThis = class {
                        constructor() {
                            this.colorExp = 'color';
                            this.opacityExp = 'opacity';
                        }
                    };
                    __setFunctionName(_classThis, "SuperComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SuperComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SuperComponent = _classThis;
                })();
                let IntermediateComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'intermediate-comp',
                            template: '...',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperComponent;
                    var IntermediateComponent = _classThis = class extends _classSuper {
                    };
                    __setFunctionName(_classThis, "IntermediateComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        IntermediateComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return IntermediateComponent = _classThis;
                })();
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: '<div>my-comp</div>',
                            host: {
                                '[@animation1]': 'colorExp',
                                '[@animation3]': 'bgExp',
                            },
                            animations: [
                                (0, animations_1.trigger)('animation1', [(0, animations_1.state)('color', (0, animations_1.style)({ color: 'blue' }))]),
                                (0, animations_1.trigger)('animation3', [(0, animations_1.state)('bg', (0, animations_1.style)({ backgroundColor: 'green' }))]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = IntermediateComponent;
                    var MyComponent = _classThis = class extends _classSuper {
                        constructor() {
                            super(...arguments);
                            this.colorExp = 'color';
                            this.opacityExp = 'opacity';
                            this.bgExp = 'bg';
                        }
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComponent = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '<my-comp>app</my-comp>',
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
                    declarations: [App, MyComponent, IntermediateComponent, SuperComponent],
                    imports: [animations_2.NoopAnimationsModule],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                const queryResult = fixture.debugElement.query(platform_browser_1.By.css('my-comp'));
                expect(queryResult.nativeElement.style.color).toBe('blue');
                expect(queryResult.nativeElement.style.opacity).toBe('0.5');
                expect(queryResult.nativeElement.style.backgroundColor).toBe('green');
            });
        });
        describe('host bindings (style related)', () => {
            // TODO: sub and super HostBinding same property but different bindings
            // TODO: sub and super HostBinding same binding on two different properties
            it('should compose host bindings for styles', () => {
                let SuperSuperComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'super-comp',
                            template: `<p>super</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _color_decorators;
                    let _color_initializers = [];
                    let _color_extraInitializers = [];
                    var SuperSuperComponent = _classThis = class {
                        constructor() {
                            this.color = __runInitializers(this, _color_initializers, 'red');
                            __runInitializers(this, _color_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "SuperSuperComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _color_decorators = [(0, core_1.HostBinding)('style.color')];
                        __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SuperSuperComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SuperSuperComponent = _classThis;
                })();
                let SuperComponent = (() => {
                    var _a;
                    let _classSuper = SuperSuperComponent;
                    let _bg_decorators;
                    let _bg_initializers = [];
                    let _bg_extraInitializers = [];
                    return _a = class SuperComponent extends _classSuper {
                            constructor() {
                                super(...arguments);
                                this.bg = __runInitializers(this, _bg_initializers, 'black');
                                __runInitializers(this, _bg_extraInitializers);
                            }
                        },
                        (() => {
                            var _b;
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
                            _bg_decorators = [(0, core_1.HostBinding)('style.backgroundColor')];
                            __esDecorate(null, null, _bg_decorators, { kind: "field", name: "bg", static: false, private: false, access: { has: obj => "bg" in obj, get: obj => obj.bg, set: (obj, value) => { obj.bg = value; } }, metadata: _metadata }, _bg_initializers, _bg_extraInitializers);
                            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        })(),
                        _a;
                })();
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperComponent;
                    var MyComponent = _classThis = class extends _classSuper {
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
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
          <my-comp>test</my-comp>
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
                    declarations: [App, MyComponent, SuperComponent, SuperSuperComponent],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                const queryResult = fixture.debugElement.query(platform_browser_1.By.directive(MyComponent));
                expect(queryResult.nativeElement.tagName).toBe('MY-COMP');
                expect(queryResult.nativeElement.style.color).toBe('red');
                expect(queryResult.nativeElement.style.backgroundColor).toBe('black');
            });
        });
        describe('host bindings (non-style related)', () => {
            // TODO: sub and super HostBinding same property but different bindings
            // TODO: sub and super HostBinding same binding on two different properties
            it('should compose host bindings (non-style related)', () => {
                let SuperSuperComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'super-comp',
                            template: `<p>super</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _instanceExtraInitializers = [];
                    let _get_boundTitle_decorators;
                    let _superTitle_decorators;
                    let _superTitle_initializers = [];
                    let _superTitle_extraInitializers = [];
                    var SuperSuperComponent = _classThis = class {
                        get boundTitle() {
                            return this.superTitle + '!!!';
                        }
                        constructor() {
                            this.superTitle = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _superTitle_initializers, ''));
                            __runInitializers(this, _superTitle_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "SuperSuperComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _get_boundTitle_decorators = [(0, core_1.HostBinding)('title')];
                        _superTitle_decorators = [(0, core_1.Input)()];
                        __esDecorate(_classThis, null, _get_boundTitle_decorators, { kind: "getter", name: "boundTitle", static: false, private: false, access: { has: obj => "boundTitle" in obj, get: obj => obj.boundTitle }, metadata: _metadata }, null, _instanceExtraInitializers);
                        __esDecorate(null, null, _superTitle_decorators, { kind: "field", name: "superTitle", static: false, private: false, access: { has: obj => "superTitle" in obj, get: obj => obj.superTitle, set: (obj, value) => { obj.superTitle = value; } }, metadata: _metadata }, _superTitle_initializers, _superTitle_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SuperSuperComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SuperSuperComponent = _classThis;
                })();
                let SuperComponent = (() => {
                    var _a;
                    let _classSuper = SuperSuperComponent;
                    let _instanceExtraInitializers = [];
                    let _get_boundAccessKey_decorators;
                    let _superAccessKey_decorators;
                    let _superAccessKey_initializers = [];
                    let _superAccessKey_extraInitializers = [];
                    return _a = class SuperComponent extends _classSuper {
                            get boundAccessKey() {
                                return this.superAccessKey + '???';
                            }
                            constructor() {
                                super(...arguments);
                                this.superAccessKey = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _superAccessKey_initializers, ''));
                                __runInitializers(this, _superAccessKey_extraInitializers);
                            }
                        },
                        (() => {
                            var _b;
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
                            _get_boundAccessKey_decorators = [(0, core_1.HostBinding)('accessKey')];
                            _superAccessKey_decorators = [(0, core_1.Input)()];
                            __esDecorate(_a, null, _get_boundAccessKey_decorators, { kind: "getter", name: "boundAccessKey", static: false, private: false, access: { has: obj => "boundAccessKey" in obj, get: obj => obj.boundAccessKey }, metadata: _metadata }, null, _instanceExtraInitializers);
                            __esDecorate(null, null, _superAccessKey_decorators, { kind: "field", name: "superAccessKey", static: false, private: false, access: { has: obj => "superAccessKey" in obj, get: obj => obj.superAccessKey, set: (obj, value) => { obj.superAccessKey = value; } }, metadata: _metadata }, _superAccessKey_initializers, _superAccessKey_extraInitializers);
                            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        })(),
                        _a;
                })();
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<p>test</p>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = SuperComponent;
                    var MyComponent = _classThis = class extends _classSuper {
                    };
                    __setFunctionName(_classThis, "MyComponent");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
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
          <my-comp superTitle="test1" superAccessKey="test2">test</my-comp>
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
                    declarations: [App, MyComponent, SuperComponent, SuperSuperComponent],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                const queryResult = fixture.debugElement.query(platform_browser_1.By.directive(MyComponent));
                expect(queryResult.nativeElement.tagName).toBe('MY-COMP');
                expect(queryResult.nativeElement.title).toBe('test1!!!');
                expect(queryResult.nativeElement.accessKey).toBe('test2???');
            });
        });
        it('should inherit ContentChildren queries', () => {
            let foundQueryList;
            let ChildDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[child-dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildDir = _classThis = class {
                };
                __setFunctionName(_classThis, "ChildDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildDir = _classThis;
            })();
            let SuperComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'super-comp',
                        template: `<p>super</p>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _customDirs_decorators;
                let _customDirs_initializers = [];
                let _customDirs_extraInitializers = [];
                var SuperComponent = _classThis = class {
                    constructor() {
                        this.customDirs = __runInitializers(this, _customDirs_initializers, void 0);
                        __runInitializers(this, _customDirs_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "SuperComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _customDirs_decorators = [(0, core_1.ContentChildren)(ChildDir)];
                    __esDecorate(null, null, _customDirs_decorators, { kind: "field", name: "customDirs", static: false, private: false, access: { has: obj => "customDirs" in obj, get: obj => obj.customDirs, set: (obj, value) => { obj.customDirs = value; } }, metadata: _metadata }, _customDirs_initializers, _customDirs_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SuperComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SuperComponent = _classThis;
            })();
            let MyComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: `<ul><ng-content></ng-content></ul>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = SuperComponent;
                var MyComponent = _classThis = class extends _classSuper {
                    ngAfterViewInit() {
                        foundQueryList = this.customDirs;
                    }
                };
                __setFunctionName(_classThis, "MyComponent");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
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
        <my-comp>
          <li child-dir>one</li>
          <li child-dir>two</li>
        </my-comp>
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
                declarations: [App, MyComponent, SuperComponent, ChildDir],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(foundQueryList.length).toBe(2);
        });
        it('should inherit ViewChildren queries', () => {
            let foundQueryList;
            let ChildDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[child-dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildDir = _classThis = class {
                };
                __setFunctionName(_classThis, "ChildDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildDir = _classThis;
            })();
            let SuperComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'super-comp',
                        template: `<p>super</p>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _customDirs_decorators;
                let _customDirs_initializers = [];
                let _customDirs_extraInitializers = [];
                var SuperComponent = _classThis = class {
                    constructor() {
                        this.customDirs = __runInitializers(this, _customDirs_initializers, void 0);
                        __runInitializers(this, _customDirs_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "SuperComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _customDirs_decorators = [(0, core_1.ViewChildren)(ChildDir)];
                    __esDecorate(null, null, _customDirs_decorators, { kind: "field", name: "customDirs", static: false, private: false, access: { has: obj => "customDirs" in obj, get: obj => obj.customDirs, set: (obj, value) => { obj.customDirs = value; } }, metadata: _metadata }, _customDirs_initializers, _customDirs_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SuperComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SuperComponent = _classThis;
            })();
            let MyComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: `
          <ul>
            <li child-dir *ngFor="let item of items">{{item}}</li>
          </ul>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = SuperComponent;
                var MyComponent = _classThis = class extends _classSuper {
                    constructor() {
                        super(...arguments);
                        this.items = [1, 2, 3, 4, 5];
                    }
                    ngAfterViewInit() {
                        foundQueryList = this.customDirs;
                    }
                };
                __setFunctionName(_classThis, "MyComponent");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
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
        <my-comp></my-comp>
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
                declarations: [App, MyComponent, ChildDir, SuperComponent],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(foundQueryList.length).toBe(5);
        });
        // TODO: sub has Input and super has Output on same property
        // TODO: sub has Input and super has HostBinding on same property
        // TODO: sub has Input and super has ViewChild on same property
        // TODO: sub has Input and super has ViewChildren on same property
        // TODO: sub has Input and super has ContentChild on same property
        // TODO: sub has Input and super has ContentChildren on same property
        // TODO: sub has Output and super has HostBinding on same property
        // TODO: sub has Output and super has ViewChild on same property
        // TODO: sub has Output and super has ViewChildren on same property
        // TODO: sub has Output and super has ContentChild on same property
        // TODO: sub has Output and super has ContentChildren on same property
        // TODO: sub has HostBinding and super has ViewChild on same property
        // TODO: sub has HostBinding and super has ViewChildren on same property
        // TODO: sub has HostBinding and super has ContentChild on same property
        // TODO: sub has HostBinding and super has ContentChildren on same property
        // TODO: sub has ViewChild and super has ViewChildren on same property
        // TODO: sub has ViewChild and super has ContentChild on same property
        // TODO: sub has ViewChild and super has ContentChildren on same property
        // TODO: sub has ViewChildren and super has ContentChild on same property
        // TODO: sub has ViewChildren and super has ContentChildren on same property
        // TODO: sub has ContentChild and super has ContentChildren on same property
    });
});
