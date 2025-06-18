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
const core_1 = require("../../src/core");
const testing_1 = require("../../testing");
describe('ViewChild', () => {
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [ViewChildTypeSelectorComponent, ViewChildStringSelectorComponent, Simple],
            schemas: [core_1.NO_ERRORS_SCHEMA],
        });
    });
    it('should support type selector', () => {
        testing_1.TestBed.overrideComponent(ViewChildTypeSelectorComponent, {
            set: { template: `<simple [marker]="'1'"></simple><simple [marker]="'2'"></simple>` },
        });
        const view = testing_1.TestBed.createComponent(ViewChildTypeSelectorComponent);
        view.detectChanges();
        expect(view.componentInstance.child).toBeDefined();
        expect(view.componentInstance.child.marker).toBe('1');
    });
    it('should support string selector', () => {
        testing_1.TestBed.overrideComponent(ViewChildStringSelectorComponent, {
            set: { template: `<simple #child></simple>` },
        });
        const view = testing_1.TestBed.createComponent(ViewChildStringSelectorComponent);
        view.detectChanges();
        expect(view.componentInstance.child).toBeDefined();
    });
});
describe('ViewChildren', () => {
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                ViewChildrenTypeSelectorComponent,
                ViewChildrenStringSelectorComponent,
                Simple,
            ],
            schemas: [core_1.NO_ERRORS_SCHEMA],
        });
    });
    it('should support type selector', () => {
        testing_1.TestBed.overrideComponent(ViewChildrenTypeSelectorComponent, {
            set: { template: `<simple></simple><simple></simple>` },
        });
        const view = testing_1.TestBed.createComponent(ViewChildrenTypeSelectorComponent);
        view.detectChanges();
        expect(view.componentInstance.children).toBeDefined();
        expect(view.componentInstance.children.length).toBe(2);
    });
    it('should support string selector', () => {
        testing_1.TestBed.overrideComponent(ViewChildrenStringSelectorComponent, {
            set: { template: `<simple #child1></simple><simple #child2></simple>` },
        });
        const view = testing_1.TestBed.configureTestingModule({ schemas: [core_1.NO_ERRORS_SCHEMA] }).createComponent(ViewChildrenStringSelectorComponent);
        view.detectChanges();
        expect(view.componentInstance.children).toBeDefined();
        expect(view.componentInstance.children.length).toBe(2);
    });
});
let Simple = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: 'simple',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _marker_decorators;
    let _marker_initializers = [];
    let _marker_extraInitializers = [];
    var Simple = _classThis = class {
        constructor() {
            this.marker = __runInitializers(this, _marker_initializers, void 0);
            __runInitializers(this, _marker_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Simple");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _marker_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _marker_decorators, { kind: "field", name: "marker", static: false, private: false, access: { has: obj => "marker" in obj, get: obj => obj.marker, set: (obj, value) => { obj.marker = value; } }, metadata: _metadata }, _marker_initializers, _marker_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Simple = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Simple = _classThis;
})();
let ViewChildTypeSelectorComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'view-child-type-selector',
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _child_decorators;
    let _child_initializers = [];
    let _child_extraInitializers = [];
    var ViewChildTypeSelectorComponent = _classThis = class {
        constructor() {
            this.child = __runInitializers(this, _child_initializers, void 0);
            __runInitializers(this, _child_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "ViewChildTypeSelectorComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _child_decorators = [(0, core_1.ViewChild)(Simple)];
        __esDecorate(null, null, _child_decorators, { kind: "field", name: "child", static: false, private: false, access: { has: obj => "child" in obj, get: obj => obj.child, set: (obj, value) => { obj.child = value; } }, metadata: _metadata }, _child_initializers, _child_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ViewChildTypeSelectorComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ViewChildTypeSelectorComponent = _classThis;
})();
let ViewChildStringSelectorComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'view-child-string-selector',
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _child_decorators;
    let _child_initializers = [];
    let _child_extraInitializers = [];
    var ViewChildStringSelectorComponent = _classThis = class {
        constructor() {
            this.child = __runInitializers(this, _child_initializers, void 0);
            __runInitializers(this, _child_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "ViewChildStringSelectorComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _child_decorators = [(0, core_1.ViewChild)('child')];
        __esDecorate(null, null, _child_decorators, { kind: "field", name: "child", static: false, private: false, access: { has: obj => "child" in obj, get: obj => obj.child, set: (obj, value) => { obj.child = value; } }, metadata: _metadata }, _child_initializers, _child_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ViewChildStringSelectorComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ViewChildStringSelectorComponent = _classThis;
})();
let ViewChildrenTypeSelectorComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'view-children-type-selector',
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _children_decorators;
    let _children_initializers = [];
    let _children_extraInitializers = [];
    var ViewChildrenTypeSelectorComponent = _classThis = class {
        constructor() {
            this.children = __runInitializers(this, _children_initializers, void 0);
            __runInitializers(this, _children_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "ViewChildrenTypeSelectorComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _children_decorators = [(0, core_1.ViewChildren)(Simple)];
        __esDecorate(null, null, _children_decorators, { kind: "field", name: "children", static: false, private: false, access: { has: obj => "children" in obj, get: obj => obj.children, set: (obj, value) => { obj.children = value; } }, metadata: _metadata }, _children_initializers, _children_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ViewChildrenTypeSelectorComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ViewChildrenTypeSelectorComponent = _classThis;
})();
let ViewChildrenStringSelectorComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'view-child-string-selector',
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _children_decorators;
    let _children_initializers = [];
    let _children_extraInitializers = [];
    var ViewChildrenStringSelectorComponent = _classThis = class {
        constructor() {
            // Allow comma separated selector (with spaces).
            this.children = __runInitializers(this, _children_initializers, void 0);
            __runInitializers(this, _children_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "ViewChildrenStringSelectorComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _children_decorators = [(0, core_1.ViewChildren)('child1 , child2')];
        __esDecorate(null, null, _children_decorators, { kind: "field", name: "children", static: false, private: false, access: { has: obj => "children" in obj, get: obj => obj.children, set: (obj, value) => { obj.children = value; } }, metadata: _metadata }, _children_initializers, _children_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ViewChildrenStringSelectorComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ViewChildrenStringSelectorComponent = _classThis;
})();
