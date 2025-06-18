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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
// Make the `$localize()` global function available to the compiled templates, and the direct calls
// below. This would normally be done inside the application `polyfills.ts` file.
require("@angular/localize/init");
const core_1 = require("../../src/core");
const testing_1 = require("../../testing");
const matchers_1 = require("@angular/platform-browser/testing/src/matchers");
describe('<ng-container>', function () {
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [MyComp, NeedsContentChildren, NeedsViewChildren, TextDirective, Simple],
        });
    });
    it('should support the "i18n" attribute', () => {
        const template = '<ng-container i18n>foo</ng-container>';
        testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
        const fixture = testing_1.TestBed.createComponent(MyComp);
        fixture.detectChanges();
        const el = fixture.nativeElement;
        (0, matchers_1.expect)(el).toHaveText('foo');
    });
    it('should work with static content projection', () => {
        const template = `<simple><ng-container><p>1</p><p>2</p></ng-container></simple>`;
        testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
        const fixture = testing_1.TestBed.createComponent(MyComp);
        fixture.detectChanges();
        const el = fixture.nativeElement;
        (0, matchers_1.expect)(el).toHaveText('SIMPLE(12)');
    });
    it('should support injecting the container from children', () => {
        const template = `<ng-container [text]="'container'"><p></p></ng-container>`;
        testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
        const fixture = testing_1.TestBed.createComponent(MyComp);
        fixture.detectChanges();
        const dir = fixture.debugElement.children[0].injector.get(TextDirective);
        (0, matchers_1.expect)(dir).toBeInstanceOf(TextDirective);
        (0, matchers_1.expect)(dir.text).toEqual('container');
    });
    it('should contain all child directives in a <ng-container> (view dom)', () => {
        const template = '<needs-view-children #q></needs-view-children>';
        testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
        const fixture = testing_1.TestBed.createComponent(MyComp);
        fixture.detectChanges();
        const q = fixture.debugElement.children[0].references['q'];
        fixture.detectChanges();
        (0, matchers_1.expect)(q.textDirChildren.length).toEqual(1);
        (0, matchers_1.expect)(q.numberOfChildrenAfterViewInit).toEqual(1);
    });
});
let TextDirective = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[text]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _text_decorators;
    let _text_initializers = [];
    let _text_extraInitializers = [];
    var TextDirective = _classThis = class {
        constructor() {
            this.text = __runInitializers(this, _text_initializers, null);
            __runInitializers(this, _text_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "TextDirective");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _text_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _text_decorators, { kind: "field", name: "text", static: false, private: false, access: { has: obj => "text" in obj, get: obj => obj.text, set: (obj, value) => { obj.text = value; } }, metadata: _metadata }, _text_initializers, _text_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TextDirective = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TextDirective = _classThis;
})();
let NeedsContentChildren = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'needs-content-children',
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _textDirChildren_decorators;
    let _textDirChildren_initializers = [];
    let _textDirChildren_extraInitializers = [];
    var NeedsContentChildren = _classThis = class {
        constructor() {
            this.textDirChildren = __runInitializers(this, _textDirChildren_initializers, void 0);
            this.numberOfChildrenAfterContentInit = __runInitializers(this, _textDirChildren_extraInitializers);
        }
        ngAfterContentInit() {
            this.numberOfChildrenAfterContentInit = this.textDirChildren.length;
        }
    };
    __setFunctionName(_classThis, "NeedsContentChildren");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _textDirChildren_decorators = [(0, core_1.ContentChildren)(TextDirective)];
        __esDecorate(null, null, _textDirChildren_decorators, { kind: "field", name: "textDirChildren", static: false, private: false, access: { has: obj => "textDirChildren" in obj, get: obj => obj.textDirChildren, set: (obj, value) => { obj.textDirChildren = value; } }, metadata: _metadata }, _textDirChildren_initializers, _textDirChildren_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NeedsContentChildren = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NeedsContentChildren = _classThis;
})();
let NeedsViewChildren = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'needs-view-children',
            template: '<div text></div>',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _textDirChildren_decorators;
    let _textDirChildren_initializers = [];
    let _textDirChildren_extraInitializers = [];
    var NeedsViewChildren = _classThis = class {
        constructor() {
            this.textDirChildren = __runInitializers(this, _textDirChildren_initializers, void 0);
            this.numberOfChildrenAfterViewInit = __runInitializers(this, _textDirChildren_extraInitializers);
        }
        ngAfterViewInit() {
            this.numberOfChildrenAfterViewInit = this.textDirChildren.length;
        }
    };
    __setFunctionName(_classThis, "NeedsViewChildren");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _textDirChildren_decorators = [(0, core_1.ViewChildren)(TextDirective)];
        __esDecorate(null, null, _textDirChildren_decorators, { kind: "field", name: "textDirChildren", static: false, private: false, access: { has: obj => "textDirChildren" in obj, get: obj => obj.textDirChildren, set: (obj, value) => { obj.textDirChildren = value; } }, metadata: _metadata }, _textDirChildren_initializers, _textDirChildren_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NeedsViewChildren = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NeedsViewChildren = _classThis;
})();
let Simple = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'simple',
            template: 'SIMPLE(<ng-content></ng-content>)',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Simple = _classThis = class {
    };
    __setFunctionName(_classThis, "Simple");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Simple = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Simple = _classThis;
})();
let MyComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'my-comp',
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MyComp = _classThis = class {
        constructor() {
            this.ctxBoolProp = false;
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
