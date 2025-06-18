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
const matchers_1 = require("@angular/platform-browser/testing/src/matchers");
describe('projection', () => {
    function getElementHtml(element) {
        return element.innerHTML
            .replace(/<!--(\W|\w)*?-->/g, '')
            .replace(/\sng-reflect-\S*="[^"]*"/g, '');
    }
    it('should project content', () => {
        let Child = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'child',
                    template: `<div><ng-content></ng-content></div>`,
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
                    template: '<child>content</child>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Parent = _classThis = class {
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
        testing_1.TestBed.configureTestingModule({ declarations: [Parent, Child] });
        const fixture = testing_1.TestBed.createComponent(Parent);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toBe(`<child><div>content</div></child>`);
    });
    it('should project content when <ng-content> is at a template root', () => {
        let Child = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'child',
                    template: '<ng-content></ng-content>',
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
                    template: '<child>content</child>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Parent = _classThis = class {
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
        testing_1.TestBed.configureTestingModule({ declarations: [Parent, Child] });
        const fixture = testing_1.TestBed.createComponent(Parent);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toBe(`<child>content</child>`);
    });
    it('should project content with siblings', () => {
        let Child = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'child',
                    template: '<ng-content></ng-content>',
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
                    template: `<child>before<div>content</div>after</child>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Parent = _classThis = class {
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
        testing_1.TestBed.configureTestingModule({ declarations: [Parent, Child] });
        const fixture = testing_1.TestBed.createComponent(Parent);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toBe(`<child>before<div>content</div>after</child>`);
    });
    it('should be able to re-project content', () => {
        let GrandChild = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'grand-child',
                    template: `<div><ng-content></ng-content></div>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var GrandChild = _classThis = class {
            };
            __setFunctionName(_classThis, "GrandChild");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                GrandChild = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return GrandChild = _classThis;
        })();
        let Child = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'child',
                    template: `<grand-child><ng-content></ng-content></grand-child>`,
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
                    template: `<child><b>Hello</b>World!</child>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Parent = _classThis = class {
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
        testing_1.TestBed.configureTestingModule({ declarations: [Parent, Child, GrandChild] });
        const fixture = testing_1.TestBed.createComponent(Parent);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toBe('<child><grand-child><div><b>Hello</b>World!</div></grand-child></child>');
    });
    it('should project components', () => {
        let Child = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'child',
                    template: `<div><ng-content></ng-content></div>`,
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
        let ProjectedComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'projected-comp',
                    template: 'content',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ProjectedComp = _classThis = class {
            };
            __setFunctionName(_classThis, "ProjectedComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ProjectedComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ProjectedComp = _classThis;
        })();
        let Parent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'parent',
                    template: `<child><projected-comp></projected-comp></child>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Parent = _classThis = class {
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
        testing_1.TestBed.configureTestingModule({ declarations: [Parent, Child, ProjectedComp] });
        const fixture = testing_1.TestBed.createComponent(Parent);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toBe('<child><div><projected-comp>content</projected-comp></div></child>');
    });
    it('should project components that have their own projection', () => {
        let Child = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'child',
                    template: `<div><ng-content></ng-content></div>`,
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
        let ProjectedComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'projected-comp',
                    template: `<p><ng-content></ng-content></p>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ProjectedComp = _classThis = class {
            };
            __setFunctionName(_classThis, "ProjectedComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ProjectedComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ProjectedComp = _classThis;
        })();
        let Parent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'parent',
                    template: `
        <child>
          <projected-comp><div>Some content</div>Other content</projected-comp>
        </child>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Parent = _classThis = class {
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
        testing_1.TestBed.configureTestingModule({ declarations: [Parent, Child, ProjectedComp] });
        const fixture = testing_1.TestBed.createComponent(Parent);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toBe(`<child><div><projected-comp><p><div>Some content</div>Other content</p></projected-comp></div></child>`);
    });
    it('should project with multiple instances of a component with projection', () => {
        let Child = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'child',
                    template: `<div><ng-content></ng-content></div>`,
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
        let ProjectedComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'projected-comp',
                    template: `Before<ng-content></ng-content>After`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ProjectedComp = _classThis = class {
            };
            __setFunctionName(_classThis, "ProjectedComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ProjectedComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ProjectedComp = _classThis;
        })();
        let Parent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'parent',
                    template: `
        <child>
          <projected-comp><div>A</div><p>123</p></projected-comp>
          <projected-comp><div>B</div><p>456</p></projected-comp>
        </child>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Parent = _classThis = class {
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
        testing_1.TestBed.configureTestingModule({ declarations: [Parent, Child, ProjectedComp] });
        const fixture = testing_1.TestBed.createComponent(Parent);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toBe('<child><div>' +
            '<projected-comp>Before<div>A</div><p>123</p>After</projected-comp>' +
            '<projected-comp>Before<div>B</div><p>456</p>After</projected-comp>' +
            '</div></child>');
    });
    it('should re-project with multiple instances of a component with projection', () => {
        let Child = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'child',
                    template: `<div><ng-content></ng-content></div>`,
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
        let ProjectedComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'projected-comp',
                    template: `Before<ng-content></ng-content>After`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ProjectedComp = _classThis = class {
            };
            __setFunctionName(_classThis, "ProjectedComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ProjectedComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ProjectedComp = _classThis;
        })();
        let Parent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'parent',
                    template: `
        <child>
          <projected-comp><div>A</div><ng-content></ng-content><p>123</p></projected-comp>
          <projected-comp><div>B</div><p>456</p></projected-comp>
        </child>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Parent = _classThis = class {
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
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'app',
                    template: `
        <parent>**ABC**</parent>
        <parent>**DEF**</parent>
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
        testing_1.TestBed.configureTestingModule({ declarations: [App, Parent, Child, ProjectedComp] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toBe('<parent><child><div>' +
            '<projected-comp>Before<div>A</div>**ABC**<p>123</p>After</projected-comp>' +
            '<projected-comp>Before<div>B</div><p>456</p>After</projected-comp>' +
            '</div></child></parent>' +
            '<parent><child><div>' +
            '<projected-comp>Before<div>A</div>**DEF**<p>123</p>After</projected-comp>' +
            '<projected-comp>Before<div>B</div><p>456</p>After</projected-comp>' +
            '</div></child></parent>');
    });
    it('should project into dynamic views (with createEmbeddedView)', () => {
        let Child = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'child',
                    template: `Before-<ng-template [ngIf]="showing"><ng-content></ng-content></ng-template>-After`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Child = _classThis = class {
                constructor() {
                    this.showing = false;
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
        let Parent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'parent',
                    template: `<child><div>A</div>Some text</child>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Parent = _classThis = class {
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
        testing_1.TestBed.configureTestingModule({ declarations: [Parent, Child], imports: [common_1.CommonModule] });
        const fixture = testing_1.TestBed.createComponent(Parent);
        const childDebugEl = fixture.debugElement.query(platform_browser_1.By.directive(Child));
        const childInstance = childDebugEl.injector.get(Child);
        const childElement = childDebugEl.nativeElement;
        childInstance.showing = true;
        fixture.detectChanges();
        (0, matchers_1.expect)(getElementHtml(childElement)).toBe(`Before-<div>A</div>Some text-After`);
        childInstance.showing = false;
        fixture.detectChanges();
        (0, matchers_1.expect)(getElementHtml(childElement)).toBe(`Before--After`);
        childInstance.showing = true;
        fixture.detectChanges();
        (0, matchers_1.expect)(getElementHtml(childElement)).toBe(`Before-<div>A</div>Some text-After`);
    });
    it('should project into dynamic views with specific selectors', () => {
        let Child = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'child',
                    template: `
        <ng-content></ng-content>
        Before-
        <ng-template [ngIf]="showing">
          <ng-content select="div"></ng-content>
        </ng-template>
        -After`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Child = _classThis = class {
                constructor() {
                    this.showing = false;
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
        let Parent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'parent',
                    template: `
        <child>
          <div>A</div>
          <span>B</span>
        </child>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Parent = _classThis = class {
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
        testing_1.TestBed.configureTestingModule({ declarations: [Parent, Child], imports: [common_1.CommonModule] });
        const fixture = testing_1.TestBed.createComponent(Parent);
        const childDebugEl = fixture.debugElement.query(platform_browser_1.By.directive(Child));
        const childInstance = childDebugEl.injector.get(Child);
        childInstance.showing = true;
        fixture.detectChanges();
        (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toBe('<child><span>B</span> Before- <div>A</div> -After</child>');
        childInstance.showing = false;
        fixture.detectChanges();
        (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toBe('<child><span>B</span> Before-  -After</child>');
        childInstance.showing = true;
        fixture.detectChanges();
        (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toBe('<child><span>B</span> Before- <div>A</div> -After</child>');
    });
    it('should project if <ng-content> is in a template that has different declaration/insertion points', () => {
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp',
                    template: `<ng-template><ng-content></ng-content></ng-template>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _template_decorators;
            let _template_initializers = [];
            let _template_extraInitializers = [];
            var Comp = _classThis = class {
                constructor() {
                    this.template = __runInitializers(this, _template_initializers, void 0);
                    __runInitializers(this, _template_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Comp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _template_decorators = [(0, core_1.ViewChild)(core_1.TemplateRef, { static: true })];
                __esDecorate(null, null, _template_decorators, { kind: "field", name: "template", static: false, private: false, access: { has: obj => "template" in obj, get: obj => obj.template, set: (obj, value) => { obj.template = value; } }, metadata: _metadata }, _template_initializers, _template_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Comp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Comp = _classThis;
        })();
        let Trigger = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[trigger]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _trigger_decorators;
            let _trigger_initializers = [];
            let _trigger_extraInitializers = [];
            var Trigger = _classThis = class {
                constructor(vcr) {
                    this.vcr = vcr;
                    this.trigger = __runInitializers(this, _trigger_initializers, void 0);
                    __runInitializers(this, _trigger_extraInitializers);
                    this.vcr = vcr;
                }
                open() {
                    this.vcr.createEmbeddedView(this.trigger.template);
                }
            };
            __setFunctionName(_classThis, "Trigger");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _trigger_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _trigger_decorators, { kind: "field", name: "trigger", static: false, private: false, access: { has: obj => "trigger" in obj, get: obj => obj.trigger, set: (obj, value) => { obj.trigger = value; } }, metadata: _metadata }, _trigger_initializers, _trigger_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Trigger = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Trigger = _classThis;
        })();
        let Parent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'parent',
                    template: `
        <button [trigger]="comp"></button>
        <comp #comp>Some content</comp>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Parent = _classThis = class {
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
        testing_1.TestBed.configureTestingModule({ declarations: [Parent, Trigger, Comp] });
        const fixture = testing_1.TestBed.createComponent(Parent);
        const trigger = fixture.debugElement.query(platform_browser_1.By.directive(Trigger)).injector.get(Trigger);
        fixture.detectChanges();
        (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toBe(`<button></button><comp></comp>`);
        trigger.open();
        (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toBe(`<button></button>Some content<comp></comp>`);
    });
    it('should project nodes into the last ng-content', () => {
        let Child = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'child',
                    template: `<div><ng-content></ng-content></div>
          <span><ng-content></ng-content></span>`,
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
                    template: `<child>content</child>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Parent = _classThis = class {
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
        testing_1.TestBed.configureTestingModule({ declarations: [Parent, Child], imports: [common_1.CommonModule] });
        const fixture = testing_1.TestBed.createComponent(Parent);
        fixture.detectChanges();
        (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toBe('<child><div></div><span>content</span></child>');
    });
    // https://stackblitz.com/edit/angular-ceqmnw?file=src%2Fapp%2Fapp.component.ts
    it('should project nodes into the last ng-content unrolled by ngFor', () => {
        let Child = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'child',
                    template: '<div *ngFor="let item of [1, 2]; let i = index">({{i}}):<ng-content></ng-content></div>',
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
                    template: '<child>content</child>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Parent = _classThis = class {
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
        testing_1.TestBed.configureTestingModule({ declarations: [Parent, Child], imports: [common_1.CommonModule] });
        const fixture = testing_1.TestBed.createComponent(Parent);
        fixture.detectChanges();
        (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toBe('<child><div>(0):</div><div>(1):content</div></child>');
    });
    it('should handle projected containers inside other containers', () => {
        let NestedComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'nested-comp',
                    template: `<div>Child content</div>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var NestedComp = _classThis = class {
            };
            __setFunctionName(_classThis, "NestedComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                NestedComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return NestedComp = _classThis;
        })();
        let RootComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'root-comp',
                    template: `<ng-content></ng-content>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var RootComp = _classThis = class {
            };
            __setFunctionName(_classThis, "RootComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                RootComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return RootComp = _classThis;
        })();
        let MyApp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-app',
                    template: `
        <root-comp>
          <ng-container *ngFor="let item of items; last as last">
            <nested-comp *ngIf="!last"></nested-comp>
          </ng-container>
        </root-comp>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyApp = _classThis = class {
                constructor() {
                    this.items = [1, 2];
                }
            };
            __setFunctionName(_classThis, "MyApp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyApp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyApp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            declarations: [MyApp, RootComp, NestedComp],
            imports: [common_1.CommonModule],
        });
        const fixture = testing_1.TestBed.createComponent(MyApp);
        fixture.detectChanges();
        // expecting # of divs to be (items.length - 1), since last element is filtered out by *ngIf,
        // this applies to all other assertions below
        (0, matchers_1.expect)(fixture.nativeElement.querySelectorAll('div').length).toBe(1);
        fixture.componentInstance.items = [3, 4, 5];
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.querySelectorAll('div').length).toBe(2);
        fixture.componentInstance.items = [6, 7, 8, 9];
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.querySelectorAll('div').length).toBe(3);
    });
    it('should handle projection into element containers at the view root', () => {
        let RootComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'root-comp',
                    template: `
        <ng-template [ngIf]="show">
          <ng-container>
            <ng-content></ng-content>
          </ng-container>
        </ng-template>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _show_decorators;
            let _show_initializers = [];
            let _show_extraInitializers = [];
            var RootComp = _classThis = class {
                constructor() {
                    this.show = __runInitializers(this, _show_initializers, true);
                    __runInitializers(this, _show_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "RootComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _show_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _show_decorators, { kind: "field", name: "show", static: false, private: false, access: { has: obj => "show" in obj, get: obj => obj.show, set: (obj, value) => { obj.show = value; } }, metadata: _metadata }, _show_initializers, _show_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                RootComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return RootComp = _classThis;
        })();
        let MyApp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-app',
                    template: `<root-comp [show]="show"><div></div></root-comp>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyApp = _classThis = class {
                constructor() {
                    this.show = true;
                }
            };
            __setFunctionName(_classThis, "MyApp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyApp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyApp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [MyApp, RootComp] });
        const fixture = testing_1.TestBed.createComponent(MyApp);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.querySelectorAll('div').length).toBe(1);
        fixture.componentInstance.show = false;
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.querySelectorAll('div').length).toBe(0);
    });
    it('should handle projection of views with element containers at the root', () => {
        let RootComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'root-comp',
                    template: `<ng-template [ngIf]="show"><ng-content></ng-content></ng-template>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _show_decorators;
            let _show_initializers = [];
            let _show_extraInitializers = [];
            var RootComp = _classThis = class {
                constructor() {
                    this.show = __runInitializers(this, _show_initializers, true);
                    __runInitializers(this, _show_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "RootComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _show_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _show_decorators, { kind: "field", name: "show", static: false, private: false, access: { has: obj => "show" in obj, get: obj => obj.show, set: (obj, value) => { obj.show = value; } }, metadata: _metadata }, _show_initializers, _show_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                RootComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return RootComp = _classThis;
        })();
        let MyApp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-app',
                    template: `<root-comp [show]="show"><ng-container><div></div></ng-container></root-comp>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyApp = _classThis = class {
                constructor() {
                    this.show = true;
                }
            };
            __setFunctionName(_classThis, "MyApp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyApp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyApp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [MyApp, RootComp] });
        const fixture = testing_1.TestBed.createComponent(MyApp);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.querySelectorAll('div').length).toBe(1);
        fixture.componentInstance.show = false;
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.querySelectorAll('div').length).toBe(0);
    });
    it('should project ng-container at the content root', () => {
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
                    template: `<child>
      <ng-container>
        <ng-container>content</ng-container>
      </ng-container>
    </child>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Parent = _classThis = class {
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
        testing_1.TestBed.configureTestingModule({ declarations: [Parent, Child] });
        const fixture = testing_1.TestBed.createComponent(Parent);
        fixture.detectChanges();
        (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toBe('<child>content</child>');
    });
    it('should re-project ng-container at the content root', () => {
        let GrandChild = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'grand-child',
                    template: `<ng-content></ng-content>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var GrandChild = _classThis = class {
            };
            __setFunctionName(_classThis, "GrandChild");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                GrandChild = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return GrandChild = _classThis;
        })();
        let Child = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'child',
                    template: `<grand-child>
      <ng-content></ng-content>
    </grand-child>`,
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
                    template: `<child>
      <ng-container>
        <ng-container>content</ng-container>
      </ng-container>
    </child>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Parent = _classThis = class {
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
        testing_1.TestBed.configureTestingModule({ declarations: [Parent, Child, GrandChild] });
        const fixture = testing_1.TestBed.createComponent(Parent);
        fixture.detectChanges();
        (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toBe('<child><grand-child>content</grand-child></child>');
    });
    it('should handle re-projection at the root of an embedded view', () => {
        let ChildComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'child-comp',
                    template: `<ng-template [ngIf]="show"><ng-content></ng-content></ng-template>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _show_decorators;
            let _show_initializers = [];
            let _show_extraInitializers = [];
            var ChildComp = _classThis = class {
                constructor() {
                    this.show = __runInitializers(this, _show_initializers, true);
                    __runInitializers(this, _show_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "ChildComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _show_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _show_decorators, { kind: "field", name: "show", static: false, private: false, access: { has: obj => "show" in obj, get: obj => obj.show, set: (obj, value) => { obj.show = value; } }, metadata: _metadata }, _show_initializers, _show_extraInitializers);
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
                    template: `<child-comp [show]="show"><ng-content></ng-content></child-comp>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _show_decorators;
            let _show_initializers = [];
            let _show_extraInitializers = [];
            var ParentComp = _classThis = class {
                constructor() {
                    this.show = __runInitializers(this, _show_initializers, true);
                    __runInitializers(this, _show_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "ParentComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _show_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _show_decorators, { kind: "field", name: "show", static: false, private: false, access: { has: obj => "show" in obj, get: obj => obj.show, set: (obj, value) => { obj.show = value; } }, metadata: _metadata }, _show_initializers, _show_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ParentComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ParentComp = _classThis;
        })();
        let MyApp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-app',
                    template: `<parent-comp [show]="show"><div></div></parent-comp>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyApp = _classThis = class {
                constructor() {
                    this.show = true;
                }
            };
            __setFunctionName(_classThis, "MyApp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyApp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyApp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [MyApp, ParentComp, ChildComp] });
        const fixture = testing_1.TestBed.createComponent(MyApp);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.querySelectorAll('div').length).toBe(1);
        fixture.componentInstance.show = false;
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.querySelectorAll('div').length).toBe(0);
    });
    describe('with selectors', () => {
        it('should project nodes using attribute selectors', () => {
            let Child = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child',
                        template: `<div id="first"><ng-content select="span[title=toFirst]"></ng-content></div>
          <div id="second"><ng-content select="span[title=toSecond]"></ng-content></div>`,
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
                        template: `<child><span title="toFirst">1</span><span title="toSecond">2</span></child>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Parent = _classThis = class {
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
            testing_1.TestBed.configureTestingModule({ declarations: [Child, Parent] });
            const fixture = testing_1.TestBed.createComponent(Parent);
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<child><div id="first"><span title="toFirst">1</span></div><div id="second"><span title="toSecond">2</span></div></child>');
        });
        it('should project nodes using class selectors', () => {
            let Child = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child',
                        template: `<div id="first"><ng-content select="span.toFirst"></ng-content></div>
          <div id="second"><ng-content select="span.toSecond"></ng-content></div>`,
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
                        template: `<child><span class="toFirst">1</span><span class="toSecond">2</span></child>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Parent = _classThis = class {
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
            testing_1.TestBed.configureTestingModule({ declarations: [Child, Parent] });
            const fixture = testing_1.TestBed.createComponent(Parent);
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<child><div id="first"><span class="toFirst">1</span></div><div id="second"><span class="toSecond">2</span></div></child>');
        });
        it('should project nodes using class selectors when element has multiple classes', () => {
            let Child = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child',
                        template: `<div id="first"><ng-content select="span.toFirst"></ng-content></div>
          <div id="second"><ng-content select="span.toSecond"></ng-content></div>`,
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
                        template: `<child><span class="other toFirst">1</span><span class="noise toSecond">2</span></child>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Parent = _classThis = class {
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
            testing_1.TestBed.configureTestingModule({ declarations: [Child, Parent] });
            const fixture = testing_1.TestBed.createComponent(Parent);
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<child><div id="first"><span class="other toFirst">1</span></div><div id="second"><span class="noise toSecond">2</span></div></child>');
        });
        it('should project nodes into the first matching selector', () => {
            let Child = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child',
                        template: `<div id="first"><ng-content select="span"></ng-content></div>
          <div id="second"><ng-content select="span.toSecond"></ng-content></div>`,
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
                        template: `<child><span class="toFirst">1</span><span class="toSecond">2</span></child>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Parent = _classThis = class {
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
            testing_1.TestBed.configureTestingModule({ declarations: [Child, Parent] });
            const fixture = testing_1.TestBed.createComponent(Parent);
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<child><div id="first"><span class="toFirst">1</span><span class="toSecond">2</span></div><div id="second"></div></child>');
        });
        it('should allow mixing ng-content with and without selectors', () => {
            let Child = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child',
                        template: `<div id="first"><ng-content select="span.toFirst"></ng-content></div>
          <div id="second"><ng-content></ng-content></div>`,
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
                        template: `<child><span class="toFirst">1</span><span>remaining</span>more remaining</child>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Parent = _classThis = class {
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
            testing_1.TestBed.configureTestingModule({ declarations: [Child, Parent] });
            const fixture = testing_1.TestBed.createComponent(Parent);
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<child><div id="first"><span class="toFirst">1</span></div><div id="second"><span>remaining</span>more remaining</div></child>');
        });
        it('should allow mixing ng-content with and without selectors - ng-content first', () => {
            let Child = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child',
                        template: `<div id="first"><ng-content></ng-content></div>
          <div id="second"><ng-content select="span.toSecond"></ng-content></div>`,
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
                        template: `<child><span>1</span><span class="toSecond">2</span>remaining</child>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Parent = _classThis = class {
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
            testing_1.TestBed.configureTestingModule({ declarations: [Child, Parent] });
            const fixture = testing_1.TestBed.createComponent(Parent);
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<child><div id="first"><span>1</span>remaining</div><div id="second"><span class="toSecond">2</span></div></child>');
        });
        /**
         * Descending into projected content for selector-matching purposes is not supported
         * today: https://plnkr.co/edit/MYQcNfHSTKp9KvbzJWVQ?p=preview
         */
        it('should not descend into re-projected content', () => {
            let GrandChild = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'grand-child',
                        template: `<ng-content select="span"></ng-content><hr><ng-content></ng-content>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var GrandChild = _classThis = class {
                };
                __setFunctionName(_classThis, "GrandChild");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    GrandChild = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return GrandChild = _classThis;
            })();
            let Child = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child',
                        template: `<grand-child>
            <ng-content></ng-content>
            <span>in child template</span>
          </grand-child>`,
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
                        template: `<child><span>parent content</span></child>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Parent = _classThis = class {
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
            testing_1.TestBed.configureTestingModule({ declarations: [GrandChild, Child, Parent] });
            const fixture = testing_1.TestBed.createComponent(Parent);
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<child><grand-child><span>in child template</span><hr><span>parent content</span></grand-child></child>');
        });
        it('should not descend into re-projected content', () => {
            let Card = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'card',
                        template: `<ng-content select="[card-title]"></ng-content><hr><ng-content select="[card-content]"></ng-content>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Card = _classThis = class {
                };
                __setFunctionName(_classThis, "Card");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Card = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Card = _classThis;
            })();
            let CardWithTitle = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'card-with-title',
                        template: `<card>
         <h1 card-title>Title</h1>
         <ng-content card-content></ng-content>
       </card>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var CardWithTitle = _classThis = class {
                };
                __setFunctionName(_classThis, "CardWithTitle");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    CardWithTitle = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return CardWithTitle = _classThis;
            })();
            let Parent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'parent',
                        template: `<card-with-title>content</card-with-title>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Parent = _classThis = class {
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
            testing_1.TestBed.configureTestingModule({ declarations: [Card, CardWithTitle, Parent] });
            const fixture = testing_1.TestBed.createComponent(Parent);
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<card-with-title><card><h1 card-title="">Title</h1><hr>content</card></card-with-title>');
        });
        it('should not match selectors against node having ngProjectAs attribute', () => {
            let Child = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child',
                        template: `<ng-content select="div"></ng-content>`,
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
                        template: `<child><div ngProjectAs="span">should not project</div><div>should project</div></child>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Parent = _classThis = class {
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
            testing_1.TestBed.configureTestingModule({ declarations: [Child, Parent] });
            const fixture = testing_1.TestBed.createComponent(Parent);
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<child><div>should project</div></child>');
        });
        // https://stackblitz.com/edit/angular-psokum?file=src%2Fapp%2Fapp.module.ts
        it('should project nodes where attribute selector matches a binding', () => {
            let Child = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child',
                        template: `<ng-content select="[title]"></ng-content>`,
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
                        template: `<child><span [title]="'Some title'">Has title</span></child>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Parent = _classThis = class {
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
            testing_1.TestBed.configureTestingModule({ declarations: [Child, Parent] });
            const fixture = testing_1.TestBed.createComponent(Parent);
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<child><span title="Some title">Has title</span></child>');
        });
        it('should match selectors against projected containers', () => {
            let Child = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child',
                        template: `<span><ng-content select="div"></ng-content></span>`,
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
                        template: `<child><div *ngIf="value">content</div></child>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Parent = _classThis = class {
                    constructor() {
                        this.value = false;
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
            testing_1.TestBed.configureTestingModule({ declarations: [Child, Parent] });
            const fixture = testing_1.TestBed.createComponent(Parent);
            fixture.componentInstance.value = true;
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<child><span><div>content</div></span></child>');
        });
    });
    it('should handle projected containers inside other containers', () => {
        let ChildComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'child-comp', //
                    template: '<ng-content></ng-content>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ChildComp = _classThis = class {
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
        let RootComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'root-comp', //
                    template: '<ng-content></ng-content>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var RootComp = _classThis = class {
            };
            __setFunctionName(_classThis, "RootComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                RootComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return RootComp = _classThis;
        })();
        let MyApp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-app',
                    template: `
        <root-comp>
          <ng-container *ngFor="let item of items; last as last">
            <child-comp *ngIf="!last">{{ item }}|</child-comp>
          </ng-container>
        </root-comp>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyApp = _classThis = class {
                constructor() {
                    this.items = [1, 2, 3];
                }
            };
            __setFunctionName(_classThis, "MyApp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyApp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyApp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [ChildComp, RootComp, MyApp] });
        const fixture = testing_1.TestBed.createComponent(MyApp);
        fixture.detectChanges();
        // expecting # of elements to be (items.length - 1), since last element is filtered out by
        // *ngIf, this applies to all other assertions below
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('1|2|');
        fixture.componentInstance.items = [4, 5];
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('4|');
        fixture.componentInstance.items = [6, 7, 8, 9];
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('6|7|8|');
    });
    it('should project content if the change detector has been detached', () => {
        let MyComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-comp',
                    template: '<ng-content></ng-content>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyComp = _classThis = class {
                constructor(changeDetectorRef) {
                    changeDetectorRef.detach();
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
        let MyApp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-app',
                    template: `
        <my-comp>
          <p>hello</p>
        </my-comp>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyApp = _classThis = class {
            };
            __setFunctionName(_classThis, "MyApp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyApp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyApp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [MyComp, MyApp] });
        const fixture = testing_1.TestBed.createComponent(MyApp);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('hello');
    });
    it('should support ngProjectAs with a various number of other bindings and attributes', () => {
        let ElDecorator = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[color],[margin]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _color_decorators;
            let _color_initializers = [];
            let _color_extraInitializers = [];
            let _margin_decorators;
            let _margin_initializers = [];
            let _margin_extraInitializers = [];
            var ElDecorator = _classThis = class {
                constructor() {
                    this.color = __runInitializers(this, _color_initializers, void 0);
                    this.margin = (__runInitializers(this, _color_extraInitializers), __runInitializers(this, _margin_initializers, void 0));
                    __runInitializers(this, _margin_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "ElDecorator");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _color_decorators = [(0, core_1.Input)()];
                _margin_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                __esDecorate(null, null, _margin_decorators, { kind: "field", name: "margin", static: false, private: false, access: { has: obj => "margin" in obj, get: obj => obj.margin, set: (obj, value) => { obj.margin = value; } }, metadata: _metadata }, _margin_initializers, _margin_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ElDecorator = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ElDecorator = _classThis;
        })();
        let Card = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'card',
                    template: `
        <ng-content select="[card-title]"></ng-content>
        ---
        <ng-content select="[card-subtitle]"></ng-content>
        ---
        <ng-content select="[card-content]"></ng-content>
        ---
        <ng-content select="[card-footer]"></ng-content>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Card = _classThis = class {
            };
            __setFunctionName(_classThis, "Card");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Card = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Card = _classThis;
        })();
        let CardWithTitle = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'card-with-title',
                    template: `
        <card>
         <h1 [color]="'red'" [margin]="10" ngProjectAs="[card-title]">Title</h1>
         <h2  xlink:href="google.com" ngProjectAs="[card-subtitle]">Subtitle</h2>
         <div style="font-color: blue;" ngProjectAs="[card-content]">content</div>
         <div [color]="'blue'" ngProjectAs="[card-footer]">footer</div>
        </card>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var CardWithTitle = _classThis = class {
            };
            __setFunctionName(_classThis, "CardWithTitle");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                CardWithTitle = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return CardWithTitle = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [Card, CardWithTitle, ElDecorator] });
        const fixture = testing_1.TestBed.createComponent(CardWithTitle);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('Title --- Subtitle --- content --- footer');
    });
    it('should support ngProjectAs on elements (including <ng-content>)', () => {
        let Card = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'card',
                    template: `
        <ng-content select="[card-title]"></ng-content>
        ---
        <ng-content select="[card-content]"></ng-content>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Card = _classThis = class {
            };
            __setFunctionName(_classThis, "Card");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Card = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Card = _classThis;
        })();
        let CardWithTitle = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'card-with-title',
                    template: `
        <card>
         <h1 ngProjectAs="[card-title]">Title</h1>
         <ng-content ngProjectAs="[card-content]"></ng-content>
        </card>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var CardWithTitle = _classThis = class {
            };
            __setFunctionName(_classThis, "CardWithTitle");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                CardWithTitle = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return CardWithTitle = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'app',
                    template: `
        <card-with-title>content</card-with-title>
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
        testing_1.TestBed.configureTestingModule({ declarations: [Card, CardWithTitle, App] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('Title --- content');
    });
    it('should not match multiple selectors in ngProjectAs', () => {
        let Card = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'card',
                    template: `
        <ng-content select="[card-title]"></ng-content>
        content
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Card = _classThis = class {
            };
            __setFunctionName(_classThis, "Card");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Card = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Card = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <card>
         <h1 ngProjectAs="[non-existing-title-slot],[card-title]">Title</h1>
        </card>
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
        testing_1.TestBed.configureTestingModule({ declarations: [Card, App] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.textContent).not.toEqual('Title content');
    });
    it('should preserve ngProjectAs and other attributes on projected element', () => {
        let Projector = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'projector',
                    template: `<ng-content select="projectMe"></ng-content>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Projector = _classThis = class {
            };
            __setFunctionName(_classThis, "Projector");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Projector = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Projector = _classThis;
        })();
        let Root = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <projector>
          <div ngProjectAs="projectMe" title="some title"></div>
        </projector>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Root = _classThis = class {
            };
            __setFunctionName(_classThis, "Root");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Root = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Root = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            declarations: [Root, Projector],
        });
        const fixture = testing_1.TestBed.createComponent(Root);
        fixture.detectChanges();
        const projectedElement = fixture.debugElement.query(platform_browser_1.By.css('div'));
        const { ngProjectAs, title } = projectedElement.attributes;
        (0, matchers_1.expect)(ngProjectAs).toBe('projectMe');
        (0, matchers_1.expect)(title).toBe('some title');
    });
    describe('on inline templates (e.g.  *ngIf)', () => {
        it('should work when matching the element name', () => {
            let divDirectives = 0;
            let SelectedNgContentComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'selector-proj',
                        template: '<ng-content select="div"></ng-content>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SelectedNgContentComp = _classThis = class {
                };
                __setFunctionName(_classThis, "SelectedNgContentComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SelectedNgContentComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SelectedNgContentComp = _classThis;
            })();
            let DivDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: 'div',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DivDirective = _classThis = class {
                    constructor() {
                        divDirectives++;
                    }
                };
                __setFunctionName(_classThis, "DivDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DivDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DivDirective = _classThis;
            })();
            let SelectorMainComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'main-selector',
                        template: '<selector-proj><div x="true" *ngIf="true">Hello world!</div></selector-proj>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SelectorMainComp = _classThis = class {
                };
                __setFunctionName(_classThis, "SelectorMainComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SelectorMainComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SelectorMainComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [DivDirective, SelectedNgContentComp, SelectorMainComp],
            });
            const fixture = testing_1.TestBed.createComponent(SelectorMainComp);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('Hello world!');
            (0, matchers_1.expect)(divDirectives).toEqual(1);
        });
        it('should work when matching attributes', () => {
            let xDirectives = 0;
            let SelectedNgContentComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'selector-proj',
                        template: '<ng-content select="[x]"></ng-content>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SelectedNgContentComp = _classThis = class {
                };
                __setFunctionName(_classThis, "SelectedNgContentComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SelectedNgContentComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SelectedNgContentComp = _classThis;
            })();
            let XDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[x]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var XDirective = _classThis = class {
                    constructor() {
                        xDirectives++;
                    }
                };
                __setFunctionName(_classThis, "XDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    XDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return XDirective = _classThis;
            })();
            let SelectorMainComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'main-selector',
                        template: '<selector-proj><div x="true" *ngIf="true">Hello world!</div></selector-proj>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SelectorMainComp = _classThis = class {
                };
                __setFunctionName(_classThis, "SelectorMainComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SelectorMainComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SelectorMainComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [XDirective, SelectedNgContentComp, SelectorMainComp],
            });
            const fixture = testing_1.TestBed.createComponent(SelectorMainComp);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('Hello world!');
            (0, matchers_1.expect)(xDirectives).toEqual(1);
        });
        it('should work when matching classes', () => {
            let xDirectives = 0;
            let SelectedNgContentComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'selector-proj',
                        template: '<ng-content select=".x"></ng-content>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SelectedNgContentComp = _classThis = class {
                };
                __setFunctionName(_classThis, "SelectedNgContentComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SelectedNgContentComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SelectedNgContentComp = _classThis;
            })();
            let XDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '.x',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var XDirective = _classThis = class {
                    constructor() {
                        xDirectives++;
                    }
                };
                __setFunctionName(_classThis, "XDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    XDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return XDirective = _classThis;
            })();
            let SelectorMainComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'main-selector',
                        template: '<selector-proj><div class="x" *ngIf="true">Hello world!</div></selector-proj>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SelectorMainComp = _classThis = class {
                };
                __setFunctionName(_classThis, "SelectorMainComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SelectorMainComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SelectorMainComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [XDirective, SelectedNgContentComp, SelectorMainComp],
            });
            const fixture = testing_1.TestBed.createComponent(SelectorMainComp);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('Hello world!');
            (0, matchers_1.expect)(xDirectives).toEqual(1);
        });
        it('should ignore synthesized attributes (e.g. ngTrackBy)', () => {
            let SelectedNgContentComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'selector-proj',
                        template: '<ng-content select="[ngTrackBy]"></ng-content>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SelectedNgContentComp = _classThis = class {
                };
                __setFunctionName(_classThis, "SelectedNgContentComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SelectedNgContentComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SelectedNgContentComp = _classThis;
            })();
            let SelectorMainComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'main-selector',
                        template: 'inline(<selector-proj><div *ngFor="let item of items trackBy getItemId">{{item.name}}</div></selector-proj>)' +
                            'ng-template(<selector-proj><ng-template ngFor [ngForOf]="items" let-item ngTrackBy="getItemId"><div>{{item.name}}</div></ng-template></selector-proj>)',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SelectorMainComp = _classThis = class {
                    constructor() {
                        this.items = [
                            { id: 1, name: 'one' },
                            { id: 2, name: 'two' },
                            { id: 3, name: 'three' },
                        ];
                    }
                    getItemId(item) {
                        return item.id;
                    }
                };
                __setFunctionName(_classThis, "SelectorMainComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SelectorMainComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SelectorMainComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [SelectedNgContentComp, SelectorMainComp] });
            const fixture = testing_1.TestBed.createComponent(SelectorMainComp);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('inline()ng-template(onetwothree)');
        });
        it('should project template content with `ngProjectAs` defined', () => {
            let ProjectorApp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'projector-app',
                        template: `
          Projected
          <ng-content select="foo"></ng-content>
          <ng-content select="[foo]"></ng-content>
          <ng-content select=".foo"></ng-content>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ProjectorApp = _classThis = class {
                };
                __setFunctionName(_classThis, "ProjectorApp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ProjectorApp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ProjectorApp = _classThis;
            })();
            let RootComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'root-comp',
                        template: `
          <projector-app>
            <div *ngIf="show" ngProjectAs="foo">as element</div>
            <div *ngIf="show" ngProjectAs="[foo]">as attribute</div>
            <div *ngIf="show" ngProjectAs=".foo">as class</div>
          </projector-app>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootComp = _classThis = class {
                    constructor() {
                        this.show = true;
                    }
                };
                __setFunctionName(_classThis, "RootComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [ProjectorApp, RootComp],
            });
            const fixture = testing_1.TestBed.createComponent(RootComp);
            fixture.detectChanges();
            let content = fixture.nativeElement.textContent;
            (0, matchers_1.expect)(content).toContain('as element');
            (0, matchers_1.expect)(content).toContain('as attribute');
            (0, matchers_1.expect)(content).toContain('as class');
            fixture.componentInstance.show = false;
            fixture.detectChanges();
            content = fixture.nativeElement.textContent;
            (0, matchers_1.expect)(content).not.toContain('as element');
            (0, matchers_1.expect)(content).not.toContain('as attribute');
            (0, matchers_1.expect)(content).not.toContain('as class');
        });
        describe('on containers', () => {
            it('should work when matching attributes', () => {
                let xDirectives = 0;
                let SelectedNgContentComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'selector-proj',
                            template: '<ng-content select="[x]"></ng-content>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SelectedNgContentComp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SelectedNgContentComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SelectedNgContentComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SelectedNgContentComp = _classThis;
                })();
                let XDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[x]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var XDirective = _classThis = class {
                        constructor() {
                            xDirectives++;
                        }
                    };
                    __setFunctionName(_classThis, "XDirective");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        XDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return XDirective = _classThis;
                })();
                let SelectorMainComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'main-selector',
                            template: '<selector-proj><ng-container x="true">Hello world!</ng-container></selector-proj>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SelectorMainComp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SelectorMainComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SelectorMainComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SelectorMainComp = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({
                    declarations: [XDirective, SelectedNgContentComp, SelectorMainComp],
                });
                const fixture = testing_1.TestBed.createComponent(SelectorMainComp);
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.nativeElement).toHaveText('Hello world!');
                (0, matchers_1.expect)(xDirectives).toEqual(1);
            });
            it('should work when matching classes', () => {
                let xDirectives = 0;
                let SelectedNgContentComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'selector-proj',
                            template: '<ng-content select=".x"></ng-content>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SelectedNgContentComp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SelectedNgContentComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SelectedNgContentComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SelectedNgContentComp = _classThis;
                })();
                let XDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '.x',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var XDirective = _classThis = class {
                        constructor() {
                            xDirectives++;
                        }
                    };
                    __setFunctionName(_classThis, "XDirective");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        XDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return XDirective = _classThis;
                })();
                let SelectorMainComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'main-selector',
                            template: '<selector-proj><ng-container class="x">Hello world!</ng-container></selector-proj>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SelectorMainComp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SelectorMainComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SelectorMainComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SelectorMainComp = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({
                    declarations: [XDirective, SelectedNgContentComp, SelectorMainComp],
                });
                const fixture = testing_1.TestBed.createComponent(SelectorMainComp);
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.nativeElement).toHaveText('Hello world!');
                (0, matchers_1.expect)(xDirectives).toEqual(1);
            });
            it('should work without exception when subelement has both ngIf and class as interpolation', () => {
                let ChildComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'child-comp',
                            template: '<ng-content select=".nomatch"></ng-content>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ChildComp = _classThis = class {
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
                            selector: 'parent-comp',
                            template: `<child-comp><span *ngIf="true" class="{{'a'}}"></span></child-comp>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ParentComp = _classThis = class {
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
                testing_1.TestBed.configureTestingModule({ declarations: [ParentComp, ChildComp] });
                const fixture = testing_1.TestBed.createComponent(ParentComp);
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toBe('<child-comp></child-comp>');
            });
        });
        it('selection of child element should properly work even with confusing attribute names', () => {
            let ChildComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child-comp',
                        template: '<ng-content select=".title"></ng-content>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildComp = _classThis = class {
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
                        selector: 'parent-comp',
                        template: `<child-comp><span *ngIf="true" id="5" jjj="class" class="{{'a'}}" [title]="'abc'"></span></child-comp>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ParentComp = _classThis = class {
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
            testing_1.TestBed.configureTestingModule({ declarations: [ParentComp, ChildComp] });
            const fixture = testing_1.TestBed.createComponent(ParentComp);
            fixture.detectChanges();
            // tNode.attrs will be ['id', '5', 'jjj', 'class', 3 /* AttributeMarker.Bindings */, 'class',
            // 'title', 4 /* AttributeMarker.Template */, 'ngIf'] isNodeMatchingSelector() must not
            // confuse it as 'class=title' attribute. <ng-content select=".title"> should not match the
            // child.
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toBe('<child-comp></child-comp>');
        });
    });
    describe('fallback content', () => {
        it('should render the fallback content if nothing is projected into a slot', () => {
            let Projection = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'projection',
                        template: `
          <ng-content select="[one]">One fallback</ng-content>|` +
                            `<ng-content>Catch-all fallback</ng-content>|` +
                            `<ng-content select="[two]">Two fallback</ng-content>` +
                            `<ng-content select="[three]">Three fallback</ng-content>
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Projection = _classThis = class {
                };
                __setFunctionName(_classThis, "Projection");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Projection = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Projection = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [Projection],
                        template: `
          <projection>
            <span one>One</span>
            <div three>Three</div>
          </projection>
        `,
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
            const fixture = testing_1.TestBed.createComponent(App);
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toContain(`<projection><span one="">One</span>|` +
                `Catch-all fallback|Two fallback<div three="">Three</div></projection>`);
        });
        it('should render the catch-all slots fallback content if the element only contains comments', () => {
            let Projection = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'projection',
                        template: `<ng-content>Fallback content</ng-content>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Projection = _classThis = class {
                };
                __setFunctionName(_classThis, "Projection");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Projection = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Projection = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [Projection],
                        template: `
            <projection>
              <!-- One -->


              <!-- Two -->
            </projection>
          `,
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
            const fixture = testing_1.TestBed.createComponent(App);
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toContain(`<projection>Fallback content</projection>`);
        });
        it('should account for ngProjectAs when rendering fallback content', () => {
            let Projection = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'projection',
                        template: `<ng-content select="div">I have no divs</ng-content>|<ng-content select="span">I have no spans</ng-content>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Projection = _classThis = class {
                };
                __setFunctionName(_classThis, "Projection");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Projection = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Projection = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [Projection],
                        template: `
          <projection>
            <div ngProjectAs="span">div pretending to be a span</div>
          </projection>
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _projection_decorators;
                let _projection_initializers = [];
                let _projection_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.projection = __runInitializers(this, _projection_initializers, void 0);
                        __runInitializers(this, _projection_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _projection_decorators = [(0, core_1.ViewChild)(Projection)];
                    __esDecorate(null, null, _projection_decorators, { kind: "field", name: "projection", static: false, private: false, access: { has: obj => "projection" in obj, get: obj => obj.projection, set: (obj, value) => { obj.projection = value; } }, metadata: _metadata }, _projection_initializers, _projection_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(App);
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toContain(`<projection>I have no divs|` +
                `<div ngprojectas="span">div pretending to be a span</div></projection>`);
        });
        it('should not render the fallback content if there is a control flow expression', () => {
            let Projection = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'projection',
                        template: `<ng-content>Wildcard fallback</ng-content>|<ng-content select="span">Span fallback</ng-content>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Projection = _classThis = class {
                };
                __setFunctionName(_classThis, "Projection");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Projection = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Projection = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [Projection],
                        template: `
          <projection>
            @if (showSpan) {
              <span>Span override</span>
            }
          </projection>
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.showSpan = false;
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
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toContain(`<projection>Wildcard fallback|</projection>`);
            fixture.componentInstance.showSpan = true;
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toContain(`<projection>Wildcard fallback|<span>Span override</span></projection>`);
            fixture.componentInstance.showSpan = false;
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toContain(`<projection>Wildcard fallback|</projection>`);
        });
        it('should not render the fallback content if there is an ng-container', () => {
            let Projection = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'projection',
                        template: `<ng-content>Fallback</ng-content>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Projection = _classThis = class {
                };
                __setFunctionName(_classThis, "Projection");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Projection = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Projection = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [Projection],
                        template: `
          <projection><ng-container/></projection>
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.showSpan = false;
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
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toContain(`<projection></projection>`);
        });
        it('should be able to use data bindings in the fallback content', () => {
            let Projection = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'projection',
                        template: `<ng-content>Value: {{value}}</ng-content>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Projection = _classThis = class {
                    constructor() {
                        this.value = 0;
                    }
                };
                __setFunctionName(_classThis, "Projection");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Projection = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Projection = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({ imports: [Projection], template: `<projection/>` })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _projection_decorators;
                let _projection_initializers = [];
                let _projection_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.projection = __runInitializers(this, _projection_initializers, void 0);
                        __runInitializers(this, _projection_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _projection_decorators = [(0, core_1.ViewChild)(Projection)];
                    __esDecorate(null, null, _projection_decorators, { kind: "field", name: "projection", static: false, private: false, access: { has: obj => "projection" in obj, get: obj => obj.projection, set: (obj, value) => { obj.projection = value; } }, metadata: _metadata }, _projection_initializers, _projection_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toContain(`<projection>Value: 0</projection>`);
            fixture.componentInstance.projection.value = 1;
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toContain(`<projection>Value: 1</projection>`);
        });
        it('should be able to use event listeners in the fallback content', () => {
            let Projection = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'projection',
                        template: `
          <ng-content>
            <button (click)="callback()">Click me</button>
          </ng-content>

          Value: {{value}}
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Projection = _classThis = class {
                    constructor() {
                        this.value = 0;
                    }
                    callback() {
                        this.value++;
                    }
                };
                __setFunctionName(_classThis, "Projection");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Projection = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Projection = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({ imports: [Projection], template: `<projection/>` })];
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
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toContain(`Value: 0`);
            fixture.nativeElement.querySelector('button').click();
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toContain(`Value: 1`);
        });
        it('should create and destroy directives in the fallback content', () => {
            let directiveCount = 0;
            let FallbackDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: 'fallback-dir',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var FallbackDir = _classThis = class {
                    constructor() {
                        directiveCount++;
                    }
                    ngOnDestroy() {
                        directiveCount--;
                    }
                };
                __setFunctionName(_classThis, "FallbackDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    FallbackDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return FallbackDir = _classThis;
            })();
            let Projection = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'projection',
                        template: `<ng-content><fallback-dir/></ng-content>`,
                        imports: [FallbackDir],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Projection = _classThis = class {
                };
                __setFunctionName(_classThis, "Projection");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Projection = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Projection = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [Projection],
                        template: `
          @if (hasProjection) {
            <projection/>
          }
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.hasProjection = true;
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
            (0, matchers_1.expect)(directiveCount).toBe(1);
            fixture.componentInstance.hasProjection = false;
            fixture.detectChanges();
            (0, matchers_1.expect)(directiveCount).toBe(0);
        });
        it('should be able to query inside the fallback content', () => {
            let directiveInstance;
            let FallbackDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: 'fallback-dir',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var FallbackDir = _classThis = class {
                    constructor() {
                        directiveInstance = this;
                    }
                };
                __setFunctionName(_classThis, "FallbackDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    FallbackDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return FallbackDir = _classThis;
            })();
            let Projection = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'projection',
                        template: `<ng-content><fallback-dir/></ng-content>`,
                        imports: [FallbackDir],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _fallback_decorators;
                let _fallback_initializers = [];
                let _fallback_extraInitializers = [];
                var Projection = _classThis = class {
                    constructor() {
                        this.fallback = __runInitializers(this, _fallback_initializers, void 0);
                        __runInitializers(this, _fallback_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Projection");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _fallback_decorators = [(0, core_1.ViewChild)(FallbackDir)];
                    __esDecorate(null, null, _fallback_decorators, { kind: "field", name: "fallback", static: false, private: false, access: { has: obj => "fallback" in obj, get: obj => obj.fallback, set: (obj, value) => { obj.fallback = value; } }, metadata: _metadata }, _fallback_initializers, _fallback_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Projection = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Projection = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [Projection],
                        template: `<projection/>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _projection_decorators;
                let _projection_initializers = [];
                let _projection_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.projection = __runInitializers(this, _projection_initializers, void 0);
                        __runInitializers(this, _projection_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _projection_decorators = [(0, core_1.ViewChild)(Projection)];
                    __esDecorate(null, null, _projection_decorators, { kind: "field", name: "projection", static: false, private: false, access: { has: obj => "projection" in obj, get: obj => obj.projection, set: (obj, value) => { obj.projection = value; } }, metadata: _metadata }, _projection_initializers, _projection_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            (0, matchers_1.expect)(directiveInstance).toBeTruthy();
            (0, matchers_1.expect)(fixture.componentInstance.projection.fallback).toBe(directiveInstance);
        });
        it('should be able to inject the host component from inside the fallback content', () => {
            let FallbackDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: 'fallback-dir',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var FallbackDir = _classThis = class {
                    constructor() {
                        this.host = (0, core_1.inject)(Projection);
                    }
                };
                __setFunctionName(_classThis, "FallbackDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    FallbackDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return FallbackDir = _classThis;
            })();
            let Projection = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'projection',
                        template: `<ng-content><fallback-dir/></ng-content>`,
                        imports: [FallbackDir],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _fallback_decorators;
                let _fallback_initializers = [];
                let _fallback_extraInitializers = [];
                var Projection = _classThis = class {
                    constructor() {
                        this.fallback = __runInitializers(this, _fallback_initializers, void 0);
                        __runInitializers(this, _fallback_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Projection");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _fallback_decorators = [(0, core_1.ViewChild)(FallbackDir)];
                    __esDecorate(null, null, _fallback_decorators, { kind: "field", name: "fallback", static: false, private: false, access: { has: obj => "fallback" in obj, get: obj => obj.fallback, set: (obj, value) => { obj.fallback = value; } }, metadata: _metadata }, _fallback_initializers, _fallback_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Projection = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Projection = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [Projection],
                        template: `<projection/>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _projection_decorators;
                let _projection_initializers = [];
                let _projection_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.projection = __runInitializers(this, _projection_initializers, void 0);
                        __runInitializers(this, _projection_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _projection_decorators = [(0, core_1.ViewChild)(Projection)];
                    __esDecorate(null, null, _projection_decorators, { kind: "field", name: "projection", static: false, private: false, access: { has: obj => "projection" in obj, get: obj => obj.projection, set: (obj, value) => { obj.projection = value; } }, metadata: _metadata }, _projection_initializers, _projection_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const instance = fixture.componentInstance;
            (0, matchers_1.expect)(instance.projection.fallback.host).toBe(instance.projection);
        });
        it('should render the fallback content if content is not provided through projectableNodes', () => {
            let Projection = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<ng-content>One fallback</ng-content>|` +
                            `<ng-content>Two fallback</ng-content>|<ng-content>Three fallback</ng-content>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Projection = _classThis = class {
                };
                __setFunctionName(_classThis, "Projection");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Projection = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Projection = _classThis;
            })();
            const hostElement = document.createElement('div');
            const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            const paragraph = document.createElement('p');
            paragraph.textContent = 'override';
            const projectableNodes = [[paragraph]];
            const componentRef = (0, core_1.createComponent)(Projection, {
                hostElement,
                environmentInjector,
                projectableNodes,
            });
            componentRef.changeDetectorRef.detectChanges();
            (0, matchers_1.expect)(getElementHtml(hostElement)).toContain('<p>override</p>|Two fallback|Three fallback');
            componentRef.destroy();
        });
        it('should render the content through projectableNodes along with fallback', () => {
            let Projection = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<ng-content>One fallback</ng-content>|` +
                            `<ng-content>Two fallback</ng-content>|<ng-content>Three fallback</ng-content>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Projection = _classThis = class {
                };
                __setFunctionName(_classThis, "Projection");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Projection = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Projection = _classThis;
            })();
            const hostElement = document.createElement('div');
            const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            const paragraph = document.createElement('p');
            paragraph.textContent = 'override';
            const secondParagraph = document.createElement('p');
            secondParagraph.textContent = 'override';
            const projectableNodes = [[paragraph], [], [secondParagraph]];
            const componentRef = (0, core_1.createComponent)(Projection, {
                hostElement,
                environmentInjector,
                projectableNodes,
            });
            componentRef.changeDetectorRef.detectChanges();
            (0, matchers_1.expect)(getElementHtml(hostElement)).toContain('<p>override</p>|Two fallback|<p>override</p>');
        });
        it('should render fallback content when ng-content is inside an ng-template', () => {
            let Projection = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'projection',
                        template: `<ng-container #ref/><ng-template #template><ng-content>Fallback</ng-content></ng-template>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _template_decorators;
                let _template_initializers = [];
                let _template_extraInitializers = [];
                let _viewContainerRef_decorators;
                let _viewContainerRef_initializers = [];
                let _viewContainerRef_extraInitializers = [];
                var Projection = _classThis = class {
                    createContent() {
                        this.viewContainerRef.createEmbeddedView(this.template);
                    }
                    constructor() {
                        this.template = __runInitializers(this, _template_initializers, void 0);
                        this.viewContainerRef = (__runInitializers(this, _template_extraInitializers), __runInitializers(this, _viewContainerRef_initializers, void 0));
                        __runInitializers(this, _viewContainerRef_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Projection");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _template_decorators = [(0, core_1.ViewChild)('template')];
                    _viewContainerRef_decorators = [(0, core_1.ViewChild)('ref', { read: core_1.ViewContainerRef })];
                    __esDecorate(null, null, _template_decorators, { kind: "field", name: "template", static: false, private: false, access: { has: obj => "template" in obj, get: obj => obj.template, set: (obj, value) => { obj.template = value; } }, metadata: _metadata }, _template_initializers, _template_extraInitializers);
                    __esDecorate(null, null, _viewContainerRef_decorators, { kind: "field", name: "viewContainerRef", static: false, private: false, access: { has: obj => "viewContainerRef" in obj, get: obj => obj.viewContainerRef, set: (obj, value) => { obj.viewContainerRef = value; } }, metadata: _metadata }, _viewContainerRef_initializers, _viewContainerRef_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Projection = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Projection = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [Projection],
                        template: `<projection/>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _projection_decorators;
                let _projection_initializers = [];
                let _projection_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.projection = __runInitializers(this, _projection_initializers, void 0);
                        __runInitializers(this, _projection_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _projection_decorators = [(0, core_1.ViewChild)(Projection)];
                    __esDecorate(null, null, _projection_decorators, { kind: "field", name: "projection", static: false, private: false, access: { has: obj => "projection" in obj, get: obj => obj.projection, set: (obj, value) => { obj.projection = value; } }, metadata: _metadata }, _projection_initializers, _projection_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toContain(`<projection></projection>`);
            fixture.componentInstance.projection.createContent();
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toContain(`<projection>Fallback</projection>`);
        });
        it('should render the fallback content when ng-content is re-projected', () => {
            let InnerProjection = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'inner-projection',
                        template: `
          <ng-content select="[inner-header]">Inner header fallback</ng-content>
          <ng-content select="[inner-footer]">Inner footer fallback</ng-content>
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var InnerProjection = _classThis = class {
                };
                __setFunctionName(_classThis, "InnerProjection");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    InnerProjection = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return InnerProjection = _classThis;
            })();
            let Projection = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'projection',
                        template: `
          <inner-projection>
            <ng-content select="[outer-header]" inner-header>Outer header fallback</ng-content>
            <ng-content select="[outer-footer]" inner-footer>Outer footer fallback</ng-content>
          </inner-projection>
        `,
                        imports: [InnerProjection],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Projection = _classThis = class {
                };
                __setFunctionName(_classThis, "Projection");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Projection = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Projection = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [Projection],
                        template: `
          <projection>
            <span outer-header>Outer header override</span>
          </projection>
        `,
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
            const fixture = testing_1.TestBed.createComponent(App);
            const content = getElementHtml(fixture.nativeElement);
            (0, matchers_1.expect)(content).toContain('Outer header override');
            (0, matchers_1.expect)(content).toContain('Outer footer fallback');
        });
        it('should not instantiate directives inside the fallback content', () => {
            let creationCount = 0;
            let Fallback = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'fallback',
                        template: 'Fallback',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Fallback = _classThis = class {
                    constructor() {
                        creationCount++;
                    }
                };
                __setFunctionName(_classThis, "Fallback");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Fallback = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Fallback = _classThis;
            })();
            let Projection = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'projection',
                        template: `<ng-content><fallback/></ng-content>`,
                        imports: [Fallback],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Projection = _classThis = class {
                };
                __setFunctionName(_classThis, "Projection");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Projection = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Projection = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [Projection],
                        template: `<projection>Hello</projection>`,
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
            const fixture = testing_1.TestBed.createComponent(App);
            (0, matchers_1.expect)(creationCount).toBe(0);
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toContain(`<projection>Hello</projection>`);
        });
        it('should render the fallback content when an instance of a component that uses ' +
            'fallback content is declared after one that does not', () => {
            let Projection = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'projection',
                        template: `<ng-content>Fallback</ng-content>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Projection = _classThis = class {
                };
                __setFunctionName(_classThis, "Projection");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Projection = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Projection = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [Projection],
                        template: `
            <projection>Content</projection>
            <projection/>
          `,
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
            const fixture = testing_1.TestBed.createComponent(App);
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toContain('<projection>Content</projection><projection>Fallback</projection>');
        });
        it('should render the fallback content when an instance of a component that uses ' +
            'fallback content is declared before one that does not', () => {
            let Projection = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'projection',
                        template: `<ng-content>Fallback</ng-content>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Projection = _classThis = class {
                };
                __setFunctionName(_classThis, "Projection");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Projection = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Projection = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [Projection],
                        template: `
            <projection/>
            <projection>Content</projection>
          `,
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
            const fixture = testing_1.TestBed.createComponent(App);
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toContain('<projection>Fallback</projection><projection>Content</projection>');
        });
    });
});
