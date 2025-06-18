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
describe('exports', () => {
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                AppComp,
                ComponentToReference,
                DirToReference,
                DirToReferenceWithPreOrderHooks,
                DirWithCompInput,
            ],
        });
    });
    it('should support export of DOM element', () => {
        const fixture = initWithTemplate(AppComp, '<input value="one" #myInput> {{ myInput.value }}');
        fixture.detectChanges();
        expect(fixture.nativeElement.innerHTML).toEqual('<input value="one"> one');
    });
    it('should support basic export of component', () => {
        const fixture = initWithTemplate(AppComp, '<comp-to-ref #myComp></comp-to-ref> {{ myComp.name }}');
        fixture.detectChanges();
        expect(fixture.nativeElement.innerHTML).toEqual('<comp-to-ref></comp-to-ref> Nancy');
    });
    it('should work with directives with exportAs set', () => {
        const fixture = initWithTemplate(AppComp, '<div dir #myDir="dir"></div> {{ myDir.name }}');
        fixture.detectChanges();
        expect(fixture.nativeElement.innerHTML).toEqual('<div dir=""></div> Drew');
    });
    describe('input changes in hooks', () => {
        it('should support forward reference', () => {
            const fixture = initWithTemplate(AppComp, '<div dir-on-change #myDir="dirOnChange" [in]="true"></div> {{ myDir.name }}');
            fixture.detectChanges();
            expect(fixture.nativeElement.firstChild.title).toBe('Drew!?@'); // div element
            expect(fixture.nativeElement.lastChild.textContent).toContain('Drew!?@'); // text node
        });
        it('should not support backward reference', () => {
            expect(() => {
                const fixture = initWithTemplate(AppComp, '{{ myDir.name }} <div dir-on-change #myDir="dirOnChange" [in]="true"></div>');
                fixture.detectChanges();
            }).toThrowError(/ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.*AppComp/);
        });
        it('should not support reference on the same node', () => {
            expect(() => {
                const fixture = initWithTemplate(AppComp, '<div dir-on-change #myDir="dirOnChange" [in]="true" [id]="myDir.name"></div>');
                fixture.detectChanges();
            }).toThrowError(/ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.*AppComp/);
        });
        it('should support input referenced by host binding on that directive', () => {
            const fixture = initWithTemplate(AppComp, '<div dir-on-change #myDir="dirOnChange" [in]="true"></div>');
            fixture.detectChanges();
            expect(fixture.nativeElement.firstChild.title).toBe('Drew!?@');
        });
    });
    it('should throw if export name is not found', () => {
        expect(() => {
            const fixture = initWithTemplate(AppComp, '<div #myDir="dir"></div>');
            fixture.detectChanges();
        }).toThrowError(/Export of name 'dir' not found!/);
    });
    it('should support component instance fed into directive', () => {
        const fixture = initWithTemplate(AppComp, '<comp-to-ref #myComp></comp-to-ref> <div [dirWithInput]="myComp"></div>');
        fixture.detectChanges();
        const myComp = fixture.debugElement.children[0].injector.get(ComponentToReference);
        const dirWithInput = fixture.debugElement.children[1].injector.get(DirWithCompInput);
        expect(dirWithInput.comp).toEqual(myComp);
    });
    it('should point to the first declared ref', () => {
        const fixture = initWithTemplate(AppComp, `
          <div>
            <input value="First" #ref />
            <input value="Second" #ref />
            <input value="Third" #ref />
            <span>{{ ref.value }}</span>
          </div>
        `);
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('span').innerHTML).toBe('First');
    });
    describe('forward refs', () => {
        it('should work with basic text bindings', () => {
            const fixture = initWithTemplate(AppComp, '{{ myInput.value}} <input value="one" #myInput>');
            fixture.detectChanges();
            expect(fixture.nativeElement.innerHTML).toEqual('one <input value="one">');
        });
        it('should work with element properties', () => {
            const fixture = initWithTemplate(AppComp, '<div [title]="myInput.value"></div> <input value="one" #myInput>');
            fixture.detectChanges();
            expect(fixture.nativeElement.innerHTML).toEqual('<div title="one"></div><input value="one">');
        });
        it('should work with element attrs', () => {
            const fixture = initWithTemplate(AppComp, '<div [attr.aria-label]="myInput.value"></div> <input value="one" #myInput>');
            fixture.detectChanges();
            expect(fixture.nativeElement.innerHTML).toEqual('<div aria-label="one"></div><input value="one">');
        });
        it('should work with element classes', () => {
            const fixture = initWithTemplate(AppComp, '<div [class.red]="myInput.checked"></div> <input type="checkbox" checked #myInput>');
            fixture.detectChanges();
            expect(fixture.nativeElement.innerHTML).toContain('<div class="red"></div>');
        });
        it('should work with component refs', () => {
            const fixture = initWithTemplate(AppComp, '<div [dirWithInput]="myComp"></div><comp-to-ref #myComp></comp-to-ref>');
            fixture.detectChanges();
            const dirWithInput = fixture.debugElement.children[0].injector.get(DirWithCompInput);
            const myComp = fixture.debugElement.children[1].injector.get(ComponentToReference);
            expect(dirWithInput.comp).toEqual(myComp);
        });
        it('should work with multiple forward refs', () => {
            const fixture = initWithTemplate(AppComp, '{{ myInput.value }} {{ myComp.name }} <comp-to-ref #myComp></comp-to-ref> <input value="one" #myInput>');
            fixture.detectChanges();
            expect(fixture.nativeElement.innerHTML).toEqual('one Nancy <comp-to-ref></comp-to-ref><input value="one">');
        });
        it('should support local refs in nested dynamic views', () => {
            const fixture = initWithTemplate(AppComp, `
        <input value="one" #outerInput>
        <div *ngIf="outer">
          {{ outerInput.value }}
            <input value = "two" #innerInput>
            <div *ngIf="inner">
                {{ outerInput.value }} - {{ innerInput.value}}
            </div>
        </div>
      `);
            fixture.detectChanges();
            fixture.componentInstance.outer = true;
            fixture.componentInstance.inner = true;
            fixture.detectChanges();
            // result should be <input value="one"><div>one <input value="two"><div>one - two</div></div>
            // but contains bindings comments for ngIf
            // so we check the outer div
            expect(fixture.nativeElement.innerHTML).toContain('one <input value="two">');
            // and the inner div
            expect(fixture.nativeElement.innerHTML).toContain('one - two');
        });
    });
});
function initWithTemplate(compType, template) {
    testing_1.TestBed.overrideComponent(compType, { set: new core_1.Component({ template }) });
    return testing_1.TestBed.createComponent(compType);
}
let ComponentToReference = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'comp-to-ref',
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ComponentToReference = _classThis = class {
        constructor() {
            this.name = 'Nancy';
        }
    };
    __setFunctionName(_classThis, "ComponentToReference");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ComponentToReference = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ComponentToReference = _classThis;
})();
let AppComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-comp',
            template: ``,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AppComp = _classThis = class {
        constructor() {
            this.outer = false;
            this.inner = false;
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
let DirToReference = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[dir]',
            exportAs: 'dir',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DirToReference = _classThis = class {
        constructor() {
            this.name = 'Drew';
        }
    };
    __setFunctionName(_classThis, "DirToReference");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DirToReference = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DirToReference = _classThis;
})();
let DirWithCompInput = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[dirWithInput]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _comp_decorators;
    let _comp_initializers = [];
    let _comp_extraInitializers = [];
    var DirWithCompInput = _classThis = class {
        constructor() {
            this.comp = __runInitializers(this, _comp_initializers, null);
            __runInitializers(this, _comp_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "DirWithCompInput");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _comp_decorators = [(0, core_1.Input)('dirWithInput')];
        __esDecorate(null, null, _comp_decorators, { kind: "field", name: "comp", static: false, private: false, access: { has: obj => "comp" in obj, get: obj => obj.comp, set: (obj, value) => { obj.comp = value; } }, metadata: _metadata }, _comp_initializers, _comp_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DirWithCompInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DirWithCompInput = _classThis;
})();
let DirToReferenceWithPreOrderHooks = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[dir-on-change]',
            exportAs: 'dirOnChange',
            host: { '[title]': 'name' },
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _in_decorators;
    let _in_initializers = [];
    let _in_extraInitializers = [];
    var DirToReferenceWithPreOrderHooks = _classThis = class {
        constructor() {
            this.in = __runInitializers(this, _in_initializers, null);
            this.name = (__runInitializers(this, _in_extraInitializers), 'Drew');
        }
        ngOnChanges(changes) {
            this.name += '!';
        }
        ngOnInit() {
            this.name += '?';
        }
        ngDoCheck() {
            this.name += '@';
        }
    };
    __setFunctionName(_classThis, "DirToReferenceWithPreOrderHooks");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _in_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _in_decorators, { kind: "field", name: "in", static: false, private: false, access: { has: obj => "in" in obj, get: obj => obj.in, set: (obj, value) => { obj.in = value; } }, metadata: _metadata }, _in_initializers, _in_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DirToReferenceWithPreOrderHooks = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DirToReferenceWithPreOrderHooks = _classThis;
})();
