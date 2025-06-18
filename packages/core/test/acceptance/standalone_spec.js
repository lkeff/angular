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
describe('standalone components, directives, and pipes', () => {
    it('should render a standalone component', () => {
        let StandaloneCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: 'Look at me, no NgModule!',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StandaloneCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "StandaloneCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StandaloneCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StandaloneCmp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(StandaloneCmp);
        fixture.detectChanges();
        expect(fixture.nativeElement.innerHTML).toEqual('Look at me, no NgModule!');
    });
    it('should render a recursive standalone component', () => {
        let TreeCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'tree',
                    template: `({{level}})<ng-template [ngIf]="level > 0"><tree [level]="level - 1"></tree></ng-template>`,
                    imports: [common_1.CommonModule],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _level_decorators;
            let _level_initializers = [];
            let _level_extraInitializers = [];
            var TreeCmp = _classThis = class {
                constructor() {
                    this.level = __runInitializers(this, _level_initializers, 0);
                    __runInitializers(this, _level_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "TreeCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _level_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _level_decorators, { kind: "field", name: "level", static: false, private: false, access: { has: obj => "level" in obj, get: obj => obj.level, set: (obj, value) => { obj.level = value; } }, metadata: _metadata }, _level_initializers, _level_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TreeCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TreeCmp = _classThis;
        })();
        let StandaloneCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({ template: '<tree [level]="3"></tree>', imports: [TreeCmp] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StandaloneCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "StandaloneCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StandaloneCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StandaloneCmp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(StandaloneCmp);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('(3)(2)(1)(0)');
    });
    it('should render a standalone component with a standalone dependency', () => {
        let InnerCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'inner-cmp',
                    template: 'Look at me, no NgModule!',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var InnerCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "InnerCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                InnerCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return InnerCmp = _classThis;
        })();
        let StandaloneCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<inner-cmp></inner-cmp>',
                    imports: [InnerCmp],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StandaloneCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "StandaloneCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StandaloneCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StandaloneCmp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(StandaloneCmp);
        fixture.detectChanges();
        expect(fixture.nativeElement.innerHTML).toEqual('<inner-cmp>Look at me, no NgModule!</inner-cmp>');
    });
    it('should render a standalone component (with standalone: true) with a standalone dependency', () => {
        let InnerCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'inner-cmp',
                    template: 'Look at me, no NgModule!',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var InnerCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "InnerCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                InnerCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return InnerCmp = _classThis;
        })();
        let StandaloneCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<inner-cmp></inner-cmp>',
                    imports: [InnerCmp],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StandaloneCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "StandaloneCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StandaloneCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StandaloneCmp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(StandaloneCmp);
        fixture.detectChanges();
        expect(fixture.nativeElement.innerHTML).toEqual('<inner-cmp>Look at me, no NgModule!</inner-cmp>');
    });
    it('should render a standalone component with an NgModule-based dependency', () => {
        let InnerCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'inner-cmp',
                    template: 'Look at me, no NgModule (kinda)!',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var InnerCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "InnerCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                InnerCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return InnerCmp = _classThis;
        })();
        let Module = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    declarations: [InnerCmp],
                    exports: [InnerCmp],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Module = _classThis = class {
            };
            __setFunctionName(_classThis, "Module");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Module = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Module = _classThis;
        })();
        let StandaloneCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<inner-cmp></inner-cmp>',
                    imports: [Module],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StandaloneCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "StandaloneCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StandaloneCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StandaloneCmp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(StandaloneCmp);
        fixture.detectChanges();
        expect(fixture.nativeElement.innerHTML).toEqual('<inner-cmp>Look at me, no NgModule (kinda)!</inner-cmp>');
    });
    it('should allow exporting standalone components, directives, and pipes from NgModule', () => {
        let StandaloneCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'standalone-cmp',
                    template: `standalone`,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StandaloneCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "StandaloneCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StandaloneCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StandaloneCmp = _classThis;
        })();
        let StandaloneDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[standalone-dir]',
                    host: {
                        '[attr.id]': '"standalone"',
                    },
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StandaloneDir = _classThis = class {
            };
            __setFunctionName(_classThis, "StandaloneDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StandaloneDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StandaloneDir = _classThis;
        })();
        let StandalonePipe = (() => {
            let _classDecorators = [(0, core_1.Pipe)({ name: 'standalonePipe' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StandalonePipe = _classThis = class {
                transform(value) {
                    return `|${value}`;
                }
            };
            __setFunctionName(_classThis, "StandalonePipe");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StandalonePipe = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StandalonePipe = _classThis;
        })();
        let LibModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    imports: [StandaloneCmp, StandaloneDir, StandalonePipe],
                    exports: [StandaloneCmp, StandaloneDir, StandalonePipe],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var LibModule = _classThis = class {
            };
            __setFunctionName(_classThis, "LibModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                LibModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return LibModule = _classThis;
        })();
        let AppComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'app-cmpt',
                    template: `<standalone-cmp standalone-dir></standalone-cmp>{{'standalone' | standalonePipe}}`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var AppComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "AppComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                AppComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return AppComponent = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            imports: [LibModule],
            declarations: [AppComponent],
        });
        const fixture = testing_1.TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('standalone|standalone');
        expect(fixture.nativeElement.querySelector('standalone-cmp').getAttribute('id')).toBe('standalone');
    });
    it('should render a standalone component with dependencies and ambient providers', () => {
        let InnerCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: 'Inner',
                    selector: 'inner-cmp',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var InnerCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "InnerCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                InnerCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return InnerCmp = _classThis;
        })();
        class Service {
            constructor() {
                this.value = 'Service';
            }
        }
        let ModuleWithAProvider = (() => {
            let _classDecorators = [(0, core_1.NgModule)({ providers: [Service] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ModuleWithAProvider = _classThis = class {
            };
            __setFunctionName(_classThis, "ModuleWithAProvider");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ModuleWithAProvider = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ModuleWithAProvider = _classThis;
        })();
        let OuterCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: 'Outer<inner-cmp></inner-cmp>{{service.value}}',
                    imports: [InnerCmp, ModuleWithAProvider],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var OuterCmp = _classThis = class {
                constructor(service) {
                    this.service = service;
                }
            };
            __setFunctionName(_classThis, "OuterCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                OuterCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return OuterCmp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(OuterCmp);
        fixture.detectChanges();
        expect(fixture.nativeElement.innerHTML).toEqual('Outer<inner-cmp>Inner</inner-cmp>Service');
    });
    it('should discover ambient providers from a standalone component', () => {
        class Service {
            constructor() {
                this.value = 'Service';
            }
        }
        let ModuleWithAProvider = (() => {
            let _classDecorators = [(0, core_1.NgModule)({ providers: [Service] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ModuleWithAProvider = _classThis = class {
            };
            __setFunctionName(_classThis, "ModuleWithAProvider");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ModuleWithAProvider = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ModuleWithAProvider = _classThis;
        })();
        let InnerCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: 'Inner({{service.value}})',
                    selector: 'inner-cmp',
                    imports: [ModuleWithAProvider],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var InnerCmp = _classThis = class {
                constructor(service) {
                    this.service = service;
                }
            };
            __setFunctionName(_classThis, "InnerCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                InnerCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return InnerCmp = _classThis;
        })();
        let OuterCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: 'Outer<inner-cmp></inner-cmp>{{service.value}}',
                    imports: [InnerCmp],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var OuterCmp = _classThis = class {
                constructor(service) {
                    this.service = service;
                }
            };
            __setFunctionName(_classThis, "OuterCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                OuterCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return OuterCmp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(OuterCmp);
        fixture.detectChanges();
        expect(fixture.nativeElement.innerHTML).toEqual('Outer<inner-cmp>Inner(Service)</inner-cmp>Service');
    });
    it('should correctly associate an injector with a standalone component def', () => {
        let MyServiceA = (() => {
            let _classDecorators = [(0, core_1.Injectable)()];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyServiceA = _classThis = class {
            };
            __setFunctionName(_classThis, "MyServiceA");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyServiceA = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyServiceA = _classThis;
        })();
        let MyServiceB = (() => {
            let _classDecorators = [(0, core_1.Injectable)()];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyServiceB = _classThis = class {
            };
            __setFunctionName(_classThis, "MyServiceB");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyServiceB = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyServiceB = _classThis;
        })();
        let MyModuleA = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    providers: [MyServiceA],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyModuleA = _classThis = class {
            };
            __setFunctionName(_classThis, "MyModuleA");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyModuleA = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyModuleA = _classThis;
        })();
        let MyModuleB = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    providers: [MyServiceB],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyModuleB = _classThis = class {
            };
            __setFunctionName(_classThis, "MyModuleB");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyModuleB = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyModuleB = _classThis;
        })();
        let ComponentA = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'duplicate-selector',
                    template: `ComponentA: {{ service ? 'service found' : 'service not found' }}`,
                    imports: [MyModuleA],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ComponentA = _classThis = class {
                constructor() {
                    this.service = (0, core_1.inject)(MyServiceA, { optional: true });
                }
            };
            __setFunctionName(_classThis, "ComponentA");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ComponentA = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ComponentA = _classThis;
        })();
        let ComponentB = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'duplicate-selector',
                    template: `ComponentB: {{ service ? 'service found' : 'service not found' }}`,
                    imports: [MyModuleB],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ComponentB = _classThis = class {
                constructor() {
                    this.service = (0, core_1.inject)(MyServiceB, { optional: true });
                }
            };
            __setFunctionName(_classThis, "ComponentB");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ComponentB = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ComponentB = _classThis;
        })();
        let AppCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'app-cmp',
                    template: `
        <ng-container [ngComponentOutlet]="ComponentA" />
        <ng-container [ngComponentOutlet]="ComponentB" />
      `,
                    imports: [common_1.NgComponentOutlet],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var AppCmp = _classThis = class {
                constructor() {
                    this.ComponentA = ComponentA;
                    this.ComponentB = ComponentB;
                }
            };
            __setFunctionName(_classThis, "AppCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                AppCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return AppCmp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(AppCmp);
        fixture.detectChanges();
        const textContent = fixture.nativeElement.textContent;
        expect(textContent).toContain('ComponentA: service found');
        expect(textContent).toContain('ComponentB: service found');
    });
    it('should dynamically insert a standalone component', () => {
        class Service {
            constructor() {
                this.value = 'Service';
            }
        }
        let Module = (() => {
            let _classDecorators = [(0, core_1.NgModule)({ providers: [Service] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Module = _classThis = class {
            };
            __setFunctionName(_classThis, "Module");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Module = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Module = _classThis;
        })();
        let InnerCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: 'Inner({{service.value}})',
                    selector: 'inner-cmp',
                    imports: [Module],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var InnerCmp = _classThis = class {
                constructor(service) {
                    this.service = service;
                }
            };
            __setFunctionName(_classThis, "InnerCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                InnerCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return InnerCmp = _classThis;
        })();
        let AppCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<ng-template #insert></ng-template>',
                    imports: [InnerCmp],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _vcRef_decorators;
            let _vcRef_initializers = [];
            let _vcRef_extraInitializers = [];
            var AppCmp = _classThis = class {
                ngOnInit() {
                    this.vcRef.createComponent(InnerCmp);
                }
                constructor() {
                    this.vcRef = __runInitializers(this, _vcRef_initializers, void 0);
                    __runInitializers(this, _vcRef_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "AppCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _vcRef_decorators = [(0, core_1.ViewChild)('insert', { read: core_1.ViewContainerRef, static: true })];
                __esDecorate(null, null, _vcRef_decorators, { kind: "field", name: "vcRef", static: false, private: false, access: { has: obj => "vcRef" in obj, get: obj => obj.vcRef, set: (obj, value) => { obj.vcRef = value; } }, metadata: _metadata }, _vcRef_initializers, _vcRef_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                AppCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return AppCmp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(AppCmp);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('Inner(Service)');
    });
    it('should dynamically insert a standalone component with ambient providers override in the "left / node" injector', () => {
        class Service {
            constructor(value = 'Service') {
                this.value = value;
            }
        }
        class NodeOverrideService extends Service {
            constructor() {
                super('NodeOverrideService');
            }
        }
        class EnvOverrideService extends Service {
            constructor() {
                super('EnvOverrideService');
            }
        }
        let Module = (() => {
            let _classDecorators = [(0, core_1.NgModule)({ providers: [Service] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Module = _classThis = class {
            };
            __setFunctionName(_classThis, "Module");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Module = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Module = _classThis;
        })();
        let InnerCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: 'Inner({{service.value}})',
                    selector: 'inner-cmp',
                    imports: [Module],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var InnerCmp = _classThis = class {
                constructor(service) {
                    this.service = service;
                }
            };
            __setFunctionName(_classThis, "InnerCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                InnerCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return InnerCmp = _classThis;
        })();
        let AppCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<ng-template #insert></ng-template>',
                    imports: [InnerCmp],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _vcRef_decorators;
            let _vcRef_initializers = [];
            let _vcRef_extraInitializers = [];
            var AppCmp = _classThis = class {
                constructor(inj, envInj) {
                    this.inj = inj;
                    this.envInj = envInj;
                    this.vcRef = __runInitializers(this, _vcRef_initializers, void 0);
                    __runInitializers(this, _vcRef_extraInitializers);
                    this.inj = inj;
                    this.envInj = envInj;
                }
                ngOnInit() {
                    const lhsInj = core_1.Injector.create({
                        providers: [{ provide: Service, useClass: NodeOverrideService }],
                        parent: this.inj,
                    });
                    const rhsInj = (0, core_1.createEnvironmentInjector)([{ provide: Service, useClass: EnvOverrideService }], this.envInj);
                    this.vcRef.createComponent(InnerCmp, { injector: lhsInj, environmentInjector: rhsInj });
                }
            };
            __setFunctionName(_classThis, "AppCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _vcRef_decorators = [(0, core_1.ViewChild)('insert', { read: core_1.ViewContainerRef, static: true })];
                __esDecorate(null, null, _vcRef_decorators, { kind: "field", name: "vcRef", static: false, private: false, access: { has: obj => "vcRef" in obj, get: obj => obj.vcRef, set: (obj, value) => { obj.vcRef = value; } }, metadata: _metadata }, _vcRef_initializers, _vcRef_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                AppCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return AppCmp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(AppCmp);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('Inner(NodeOverrideService)');
    });
    it('should consult ambient providers before environment injector when inserting a component dynamically', () => {
        class Service {
            constructor(value = 'Service') {
                this.value = value;
            }
        }
        class EnvOverrideService extends Service {
            constructor() {
                super('EnvOverrideService');
            }
        }
        let Module = (() => {
            let _classDecorators = [(0, core_1.NgModule)({ providers: [Service] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Module = _classThis = class {
            };
            __setFunctionName(_classThis, "Module");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Module = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Module = _classThis;
        })();
        let InnerCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: 'Inner({{service.value}})',
                    selector: 'inner-cmp',
                    imports: [Module],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var InnerCmp = _classThis = class {
                constructor(service) {
                    this.service = service;
                }
            };
            __setFunctionName(_classThis, "InnerCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                InnerCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return InnerCmp = _classThis;
        })();
        let AppCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<ng-template #insert></ng-template>',
                    imports: [InnerCmp],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _vcRef_decorators;
            let _vcRef_initializers = [];
            let _vcRef_extraInitializers = [];
            var AppCmp = _classThis = class {
                constructor(envInj) {
                    this.envInj = envInj;
                    this.vcRef = __runInitializers(this, _vcRef_initializers, void 0);
                    __runInitializers(this, _vcRef_extraInitializers);
                    this.envInj = envInj;
                }
                ngOnInit() {
                    const rhsInj = (0, core_1.createEnvironmentInjector)([{ provide: Service, useClass: EnvOverrideService }], this.envInj);
                    this.vcRef.createComponent(InnerCmp, { environmentInjector: rhsInj });
                }
            };
            __setFunctionName(_classThis, "AppCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _vcRef_decorators = [(0, core_1.ViewChild)('insert', { read: core_1.ViewContainerRef, static: true })];
                __esDecorate(null, null, _vcRef_decorators, { kind: "field", name: "vcRef", static: false, private: false, access: { has: obj => "vcRef" in obj, get: obj => obj.vcRef, set: (obj, value) => { obj.vcRef = value; } }, metadata: _metadata }, _vcRef_initializers, _vcRef_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                AppCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return AppCmp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(AppCmp);
        fixture.detectChanges();
        // The Service (an ambient provider) gets injected here as the standalone injector is a child
        // of the user-created environment injector.
        expect(fixture.nativeElement.textContent).toBe('Inner(Service)');
    });
    it('should render a recursive cycle of standalone components', () => {
        let StandaloneCmpA = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'cmp-a',
                    template: '<ng-template [ngIf]="false"><cmp-c></cmp-c></ng-template>A',
                    imports: [(0, core_1.forwardRef)(() => StandaloneCmpC)],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StandaloneCmpA = _classThis = class {
            };
            __setFunctionName(_classThis, "StandaloneCmpA");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StandaloneCmpA = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StandaloneCmpA = _classThis;
        })();
        let StandaloneCmpB = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'cmp-b',
                    template: '(<cmp-a></cmp-a>)B',
                    imports: [StandaloneCmpA],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StandaloneCmpB = _classThis = class {
            };
            __setFunctionName(_classThis, "StandaloneCmpB");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StandaloneCmpB = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StandaloneCmpB = _classThis;
        })();
        let StandaloneCmpC = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'cmp-c',
                    template: '(<cmp-b></cmp-b>)C',
                    imports: [StandaloneCmpB],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StandaloneCmpC = _classThis = class {
            };
            __setFunctionName(_classThis, "StandaloneCmpC");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StandaloneCmpC = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StandaloneCmpC = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(StandaloneCmpC);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('((A)B)C');
    });
    it('should collect ambient providers from exported NgModule', () => {
        class Service {
            constructor() {
                this.value = 'service';
            }
        }
        let ModuleWithAService = (() => {
            let _classDecorators = [(0, core_1.NgModule)({ providers: [Service] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ModuleWithAService = _classThis = class {
            };
            __setFunctionName(_classThis, "ModuleWithAService");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ModuleWithAService = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ModuleWithAService = _classThis;
        })();
        let ExportingModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({ exports: [ModuleWithAService] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ExportingModule = _classThis = class {
            };
            __setFunctionName(_classThis, "ExportingModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ExportingModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ExportingModule = _classThis;
        })();
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'standalone',
                    imports: [ExportingModule],
                    template: `({{service.value}})`,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor(service) {
                    this.service = service;
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
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('(service)');
    });
    it('should support nested arrays in @Component.imports', () => {
        let RedIdDirective = (() => {
            let _classDecorators = [(0, core_1.Directive)({ selector: '[red]', host: { '[attr.red]': 'true' } })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var RedIdDirective = _classThis = class {
            };
            __setFunctionName(_classThis, "RedIdDirective");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                RedIdDirective = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return RedIdDirective = _classThis;
        })();
        let BluePipe = (() => {
            let _classDecorators = [(0, core_1.Pipe)({ name: 'blue', pure: true })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var BluePipe = _classThis = class {
                transform() {
                    return 'blue';
                }
            };
            __setFunctionName(_classThis, "BluePipe");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                BluePipe = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return BluePipe = _classThis;
        })();
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'standalone',
                    template: `<div red>{{'' | blue}}</div>`,
                    imports: [[RedIdDirective, [BluePipe]]],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
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
        fixture.detectChanges();
        expect(fixture.nativeElement.innerHTML).toBe('<div red="true">blue</div>');
    });
    it('should support readonly arrays in @Component.imports', () => {
        let RedIdDirective = (() => {
            let _classDecorators = [(0, core_1.Directive)({ selector: '[red]', host: { '[attr.red]': 'true' } })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var RedIdDirective = _classThis = class {
            };
            __setFunctionName(_classThis, "RedIdDirective");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                RedIdDirective = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return RedIdDirective = _classThis;
        })();
        let BluePipe = (() => {
            let _classDecorators = [(0, core_1.Pipe)({ name: 'blue', pure: true })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var BluePipe = _classThis = class {
                transform() {
                    return 'blue';
                }
            };
            __setFunctionName(_classThis, "BluePipe");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                BluePipe = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return BluePipe = _classThis;
        })();
        const DirAndPipe = [RedIdDirective, BluePipe];
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'standalone',
                    template: `<div red>{{'' | blue}}</div>`,
                    imports: [DirAndPipe],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
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
        fixture.detectChanges();
        expect(fixture.nativeElement.innerHTML).toBe('<div red="true">blue</div>');
    });
    it('should deduplicate declarations', () => {
        let RedComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({ selector: 'test-red', template: 'red(<ng-content></ng-content>)' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var RedComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "RedComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                RedComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return RedComponent = _classThis;
        })();
        let BlueComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test-blue',
                    standalone: false,
                    template: 'blue(<ng-content></ng-content>)',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var BlueComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "BlueComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                BlueComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return BlueComponent = _classThis;
        })();
        let BlueModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({ declarations: [BlueComponent], exports: [BlueComponent] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var BlueModule = _classThis = class {
            };
            __setFunctionName(_classThis, "BlueModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                BlueModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return BlueModule = _classThis;
        })();
        let BlueAModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({ exports: [BlueModule] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var BlueAModule = _classThis = class {
            };
            __setFunctionName(_classThis, "BlueAModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                BlueAModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return BlueAModule = _classThis;
        })();
        let BlueBModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({ exports: [BlueModule] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var BlueBModule = _classThis = class {
            };
            __setFunctionName(_classThis, "BlueBModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                BlueBModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return BlueBModule = _classThis;
        })();
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'standalone',
                    template: `<test-red><test-blue>orange</test-blue></test-red>`,
                    imports: [RedComponent, RedComponent, BlueAModule, BlueBModule],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
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
        fixture.detectChanges();
        expect(fixture.nativeElement.innerHTML).toBe('<test-red>red(<test-blue>blue(orange)</test-blue>)</test-red>');
    });
    it('should error when forwardRef does not resolve to a truthy value', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test',
                    imports: [(0, core_1.forwardRef)(() => null)],
                    template: '',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
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
        expect(() => {
            testing_1.TestBed.createComponent(TestComponent);
        }).toThrowError('Expected forwardRef function, imported from "TestComponent", to return a standalone entity or NgModule but got "null".');
    });
    it('should error when a non-standalone component is imported', () => {
        let NonStandaloneCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'not-a-standalone',
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var NonStandaloneCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "NonStandaloneCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                NonStandaloneCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return NonStandaloneCmp = _classThis;
        })();
        let StandaloneCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'standalone',
                    template: '',
                    imports: [NonStandaloneCmp],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StandaloneCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "StandaloneCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StandaloneCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StandaloneCmp = _classThis;
        })();
        expect(() => {
            testing_1.TestBed.createComponent(StandaloneCmp);
        }).toThrowError('The "NonStandaloneCmp" component, imported from "StandaloneCmp", is not standalone. Did you forget to add the standalone: true flag?');
    });
    it('should error when a non-standalone directive is imported', () => {
        let NonStandaloneDirective = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[not-a-standalone]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var NonStandaloneDirective = _classThis = class {
            };
            __setFunctionName(_classThis, "NonStandaloneDirective");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                NonStandaloneDirective = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return NonStandaloneDirective = _classThis;
        })();
        let StandaloneCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'standalone',
                    template: '',
                    imports: [NonStandaloneDirective],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StandaloneCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "StandaloneCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StandaloneCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StandaloneCmp = _classThis;
        })();
        expect(() => {
            testing_1.TestBed.createComponent(StandaloneCmp);
        }).toThrowError('The "NonStandaloneDirective" directive, imported from "StandaloneCmp", is not standalone. Did you forget to add the standalone: true flag?');
    });
    it('should error when a non-standalone pipe is imported', () => {
        let NonStandalonePipe = (() => {
            let _classDecorators = [(0, core_1.Pipe)({
                    name: 'not-a-standalone',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var NonStandalonePipe = _classThis = class {
            };
            __setFunctionName(_classThis, "NonStandalonePipe");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                NonStandalonePipe = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return NonStandalonePipe = _classThis;
        })();
        let StandaloneCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'standalone',
                    template: '',
                    imports: [NonStandalonePipe],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StandaloneCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "StandaloneCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StandaloneCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StandaloneCmp = _classThis;
        })();
        expect(() => {
            testing_1.TestBed.createComponent(StandaloneCmp);
        }).toThrowError('The "NonStandalonePipe" pipe, imported from "StandaloneCmp", is not standalone. Did you forget to add the standalone: true flag?');
    });
    it('should error when an unknown type is imported', () => {
        class SthElse {
        }
        let StandaloneCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'standalone',
                    template: '',
                    imports: [SthElse],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StandaloneCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "StandaloneCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StandaloneCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StandaloneCmp = _classThis;
        })();
        expect(() => {
            testing_1.TestBed.createComponent(StandaloneCmp);
        }).toThrowError('The "SthElse" type, imported from "StandaloneCmp", must be a standalone component / directive / pipe or an NgModule. Did you forget to add the required @Component / @Directive / @Pipe or @NgModule annotation?');
    });
    it('should error when a module with providers is imported', () => {
        let OtherModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)()];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var OtherModule = _classThis = class {
            };
            __setFunctionName(_classThis, "OtherModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                OtherModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return OtherModule = _classThis;
        })();
        let LibModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)()];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var LibModule = _classThis = class {
                static forComponent() {
                    return { ngModule: OtherModule };
                }
            };
            __setFunctionName(_classThis, "LibModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                LibModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return LibModule = _classThis;
        })();
        let StandaloneCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '',
                    // we need to import a module with a provider in a nested array since module with providers
                    // are disallowed on the type level
                    imports: [[LibModule.forComponent()]],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StandaloneCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "StandaloneCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StandaloneCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StandaloneCmp = _classThis;
        })();
        expect(() => {
            testing_1.TestBed.createComponent(StandaloneCmp);
        }).toThrowError('A module with providers was imported from "StandaloneCmp". Modules with providers are not supported in standalone components imports.');
    });
    it('should support forwardRef imports', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test',
                    imports: [(0, core_1.forwardRef)(() => StandaloneComponent)],
                    template: `(<other-standalone></other-standalone>)`,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
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
        let StandaloneComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({ selector: 'other-standalone', template: `standalone component` })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StandaloneComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "StandaloneComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StandaloneComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StandaloneComponent = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('(standalone component)');
    });
    describe('schemas', () => {
        it('should allow schemas in standalone component', () => {
            let AppCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<maybe-custom-elm></maybe-custom-elm>',
                        schemas: [core_1.NO_ERRORS_SCHEMA],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "AppCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(AppCmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.innerHTML).toBe('<maybe-custom-elm></maybe-custom-elm>');
        });
        it('should error when schemas are specified for a non-standalone component', () => {
            let AppCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                        schemas: [core_1.NO_ERRORS_SCHEMA],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "AppCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppCmp = _classThis;
            })();
            expect(() => {
                testing_1.TestBed.createComponent(AppCmp);
            }).toThrowError(`The 'schemas' was specified for the AppCmp but is only valid on a component that is standalone.`);
        });
    });
    describe('unknown template elements', () => {
        const unknownElErrorRegex = (tag) => {
            const prefix = `'${tag}' is not a known element \\(used in the 'AppCmp' component template\\):`;
            const message1 = `1. If '${tag}' is an Angular component, then verify that it is included in the '@Component.imports' of this component.`;
            const message2 = `2. If '${tag}' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@Component.schemas' of this component to suppress this message.`;
            return new RegExp(`${prefix}s*\ns*${message1}s*\ns*${message2}`);
        };
        it('should warn the user when an unknown element is present', () => {
            const spy = spyOn(console, 'error');
            let AppCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<unknown-tag></unknown-tag>',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "AppCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppCmp = _classThis;
            })();
            testing_1.TestBed.createComponent(AppCmp);
            const errorRegex = unknownElErrorRegex('unknown-tag');
            expect(spy).toHaveBeenCalledOnceWith(jasmine.stringMatching(errorRegex));
        });
        it('should warn the user when multiple unknown elements are present', () => {
            const spy = spyOn(console, 'error');
            let AppCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<unknown-tag-A></unknown-tag-A><unknown-tag-B></unknown-tag-B>',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "AppCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppCmp = _classThis;
            })();
            testing_1.TestBed.createComponent(AppCmp);
            const errorRegexA = unknownElErrorRegex('unknown-tag-A');
            const errorRegexB = unknownElErrorRegex('unknown-tag-B');
            expect(spy).toHaveBeenCalledWith(jasmine.stringMatching(errorRegexA));
            expect(spy).toHaveBeenCalledWith(jasmine.stringMatching(errorRegexB));
        });
        it('should not warn the user when an unknown element is present inside an ng-template', () => {
            const spy = spyOn(console, 'error');
            let AppCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<ng-template><unknown-tag></unknown-tag><ng-template>',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "AppCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppCmp = _classThis;
            })();
            testing_1.TestBed.createComponent(AppCmp);
            expect(spy).not.toHaveBeenCalled();
        });
        it('should warn the user when an unknown element is present in an instantiated embedded view', () => {
            const spy = spyOn(console, 'error');
            let AppCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<ng-template [ngIf]="true"><unknown-tag></unknown-tag><ng-template>',
                        imports: [common_1.CommonModule],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "AppCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(AppCmp);
            fixture.detectChanges();
            const errorRegex = unknownElErrorRegex('unknown-tag');
            expect(spy).toHaveBeenCalledOnceWith(jasmine.stringMatching(errorRegex));
        });
    });
    /*
      The following test verify that we don't impose limits when it comes to extending components of
      various type (standalone vs. non-standalone).
  
      This is based on the reasoning that the "template"
      / "templateUrl", "imports", "schemas" and "standalone" properties are all related and they
      specify how to compile a template. As of today extending a component means providing a new
      template and this implies providing compiler configuration for a new template. In this sense
      neither a template nor its compiler configuration is carried over from a class being extended
      (we can think of each component being a "fresh copy" when it comes to a template and its
      compiler configuration).
     */
    describe('inheritance', () => {
        it('should allow extending a regular component and turn it into a standalone one', () => {
            let RegularCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'regular',
                        template: 'regular: {{input}}',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _input_decorators;
                let _input_initializers = [];
                let _input_extraInitializers = [];
                var RegularCmp = _classThis = class {
                    constructor() {
                        this.input = __runInitializers(this, _input_initializers, void 0);
                        __runInitializers(this, _input_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "RegularCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _input_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _input_decorators, { kind: "field", name: "input", static: false, private: false, access: { has: obj => "input" in obj, get: obj => obj.input, set: (obj, value) => { obj.input = value; } }, metadata: _metadata }, _input_initializers, _input_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RegularCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RegularCmp = _classThis;
            })();
            let StandaloneCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({ selector: 'standalone', template: 'standalone: {{input}}' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = RegularCmp;
                var StandaloneCmp = _classThis = class extends _classSuper {
                };
                __setFunctionName(_classThis, "StandaloneCmp");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    StandaloneCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return StandaloneCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(StandaloneCmp);
            fixture.componentInstance.input = 'input value';
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('standalone: input value');
        });
        it('should allow extending a regular component and turn it into a standalone one', () => {
            let StandaloneCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({ selector: 'standalone', template: 'standalone: {{in}}' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _input_decorators;
                let _input_initializers = [];
                let _input_extraInitializers = [];
                var StandaloneCmp = _classThis = class {
                    constructor() {
                        this.input = __runInitializers(this, _input_initializers, void 0);
                        __runInitializers(this, _input_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "StandaloneCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _input_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _input_decorators, { kind: "field", name: "input", static: false, private: false, access: { has: obj => "input" in obj, get: obj => obj.input, set: (obj, value) => { obj.input = value; } }, metadata: _metadata }, _input_initializers, _input_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    StandaloneCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return StandaloneCmp = _classThis;
            })();
            let RegularCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'regular',
                        template: 'regular: {{input}}',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = StandaloneCmp;
                var RegularCmp = _classThis = class extends _classSuper {
                };
                __setFunctionName(_classThis, "RegularCmp");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RegularCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RegularCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(RegularCmp);
            fixture.componentInstance.input = 'input value';
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('regular: input value');
        });
        it('should ?', () => {
            let InnerCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'inner',
                        template: 'inner',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var InnerCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "InnerCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    InnerCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return InnerCmp = _classThis;
            })();
            let StandaloneCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'standalone',
                        template: 'standalone: {{input}}; (<inner></inner>)',
                        imports: [InnerCmp],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _input_decorators;
                let _input_initializers = [];
                let _input_extraInitializers = [];
                var StandaloneCmp = _classThis = class {
                    constructor() {
                        this.input = __runInitializers(this, _input_initializers, void 0);
                        __runInitializers(this, _input_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "StandaloneCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _input_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _input_decorators, { kind: "field", name: "input", static: false, private: false, access: { has: obj => "input" in obj, get: obj => obj.input, set: (obj, value) => { obj.input = value; } }, metadata: _metadata }, _input_initializers, _input_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    StandaloneCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return StandaloneCmp = _classThis;
            })();
            let RegularCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'regular',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = StandaloneCmp;
                var RegularCmp = _classThis = class extends _classSuper {
                };
                __setFunctionName(_classThis, "RegularCmp");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RegularCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RegularCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(RegularCmp);
            fixture.componentInstance.input = 'input value';
            fixture.detectChanges();
            // the assumption here is that not providing a template is equivalent to providing an empty
            // one
            expect(fixture.nativeElement.textContent).toBe('');
        });
    });
    describe('isStandalone()', () => {
        it('should return `true` if component is standalone', () => {
            let StandaloneCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({ selector: 'standalone-cmp' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var StandaloneCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "StandaloneCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    StandaloneCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return StandaloneCmp = _classThis;
            })();
            expect((0, core_1.isStandalone)(StandaloneCmp)).toBeTrue();
        });
        it('should return `true` if component is standalone (with `standalone:true`)', () => {
            let StandaloneCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({ selector: 'standalone-cmp' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var StandaloneCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "StandaloneCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    StandaloneCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return StandaloneCmp = _classThis;
            })();
            expect((0, core_1.isStandalone)(StandaloneCmp)).toBeTrue();
        });
        it('should return `false` if component is not standalone', () => {
            let StandaloneCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({ selector: 'standalone-cmp', standalone: false })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var StandaloneCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "StandaloneCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    StandaloneCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return StandaloneCmp = _classThis;
            })();
            expect((0, core_1.isStandalone)(StandaloneCmp)).toBeFalse();
        });
        it('should return `true` if directive is standalone', () => {
            let StandAloneDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[standaloneDir]' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var StandAloneDirective = _classThis = class {
                };
                __setFunctionName(_classThis, "StandAloneDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    StandAloneDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return StandAloneDirective = _classThis;
            })();
            expect((0, core_1.isStandalone)(StandAloneDirective)).toBeTrue();
        });
        it('should return `false` if directive is standalone', () => {
            let StandAloneDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[standaloneDir]', standalone: false })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var StandAloneDirective = _classThis = class {
                };
                __setFunctionName(_classThis, "StandAloneDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    StandAloneDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return StandAloneDirective = _classThis;
            })();
            expect((0, core_1.isStandalone)(StandAloneDirective)).toBeFalse();
        });
        it('should return `true` if pipe is standalone', () => {
            let StandAlonePipe = (() => {
                let _classDecorators = [(0, core_1.Pipe)({ name: 'standalonePipe' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var StandAlonePipe = _classThis = class {
                };
                __setFunctionName(_classThis, "StandAlonePipe");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    StandAlonePipe = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return StandAlonePipe = _classThis;
            })();
            expect((0, core_1.isStandalone)(StandAlonePipe)).toBeTrue();
        });
        it('should return `false` if pipe is standalone', () => {
            let StandAlonePipe = (() => {
                let _classDecorators = [(0, core_1.Pipe)({ name: 'standalonePipe', standalone: false })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var StandAlonePipe = _classThis = class {
                };
                __setFunctionName(_classThis, "StandAlonePipe");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    StandAlonePipe = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return StandAlonePipe = _classThis;
            })();
            expect((0, core_1.isStandalone)(StandAlonePipe)).toBeFalse();
        });
        it('should return `false` if the class is not annotated', () => {
            class NonAnnotatedClass {
            }
            expect((0, core_1.isStandalone)(NonAnnotatedClass)).toBeFalse();
        });
        it('should return `false` if the class is an NgModule', () => {
            let Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({})];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Module = _classThis = class {
                };
                __setFunctionName(_classThis, "Module");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Module = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Module = _classThis;
            })();
            expect((0, core_1.isStandalone)(Module)).toBeFalse();
        });
        it('should render a recursive cycle of standalone components', () => {
            let StandaloneCmpA = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'cmp-a',
                        template: '<ng-template [ngIf]="false"><cmp-c></cmp-c></ng-template>A',
                        imports: [(0, core_1.forwardRef)(() => StandaloneCmpC)],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var StandaloneCmpA = _classThis = class {
                };
                __setFunctionName(_classThis, "StandaloneCmpA");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    StandaloneCmpA = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return StandaloneCmpA = _classThis;
            })();
            let StandaloneCmpB = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'cmp-b',
                        template: '(<cmp-a></cmp-a>)B',
                        imports: [StandaloneCmpA],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var StandaloneCmpB = _classThis = class {
                };
                __setFunctionName(_classThis, "StandaloneCmpB");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    StandaloneCmpB = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return StandaloneCmpB = _classThis;
            })();
            let StandaloneCmpC = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'cmp-c',
                        template: '(<cmp-b></cmp-b>)C',
                        imports: [StandaloneCmpB],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var StandaloneCmpC = _classThis = class {
                };
                __setFunctionName(_classThis, "StandaloneCmpC");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    StandaloneCmpC = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return StandaloneCmpC = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ imports: [StandaloneCmpC] });
            const fixture = testing_1.TestBed.createComponent(StandaloneCmpC);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('((A)B)C');
        });
    });
});
