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
const index_1 = require("../../index");
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const by_1 = require("@angular/platform-browser/src/dom/debug/by");
const matchers_1 = require("@angular/platform-browser/testing/src/matchers");
let thisArg;
describe('ngFor', () => {
    let fixture;
    function getComponent() {
        return fixture.componentInstance;
    }
    function detectChangesAndExpectText(text) {
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText(text);
    }
    afterEach(() => {
        fixture = null;
    });
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [index_1.CommonModule],
        });
    });
    it('should reflect initial elements', (0, testing_1.waitForAsync)(() => {
        fixture = createTestComponent();
        detectChangesAndExpectText('1;2;');
    }));
    it('should reflect added elements', (0, testing_1.waitForAsync)(() => {
        fixture = createTestComponent();
        fixture.detectChanges();
        getComponent().items.push(3);
        detectChangesAndExpectText('1;2;3;');
    }));
    it('should reflect removed elements', (0, testing_1.waitForAsync)(() => {
        fixture = createTestComponent();
        fixture.detectChanges();
        getComponent().items.splice(1, 1);
        detectChangesAndExpectText('1;');
    }));
    it('should reflect moved elements', (0, testing_1.waitForAsync)(() => {
        fixture = createTestComponent();
        fixture.detectChanges();
        getComponent().items.splice(0, 1);
        getComponent().items.push(1);
        detectChangesAndExpectText('2;1;');
    }));
    it('should reflect a mix of all changes (additions/removals/moves)', (0, testing_1.waitForAsync)(() => {
        fixture = createTestComponent();
        getComponent().items = [0, 1, 2, 3, 4, 5];
        fixture.detectChanges();
        getComponent().items = [6, 2, 7, 0, 4, 8];
        detectChangesAndExpectText('6;2;7;0;4;8;');
    }));
    it('should iterate over an array of objects', (0, testing_1.waitForAsync)(() => {
        const template = '<ul><li *ngFor="let item of items">{{item["name"]}};</li></ul>';
        fixture = createTestComponent(template);
        // INIT
        getComponent().items = [{ 'name': 'misko' }, { 'name': 'shyam' }];
        detectChangesAndExpectText('misko;shyam;');
        // GROW
        getComponent().items.push({ 'name': 'adam' });
        detectChangesAndExpectText('misko;shyam;adam;');
        // SHRINK
        getComponent().items.splice(2, 1);
        getComponent().items.splice(0, 1);
        detectChangesAndExpectText('shyam;');
    }));
    it('should gracefully handle nulls', (0, testing_1.waitForAsync)(() => {
        const template = '<ul><li *ngFor="let item of null">{{item}};</li></ul>';
        fixture = createTestComponent(template);
        detectChangesAndExpectText('');
    }));
    it('should gracefully handle ref changing to null and back', (0, testing_1.waitForAsync)(() => {
        fixture = createTestComponent();
        detectChangesAndExpectText('1;2;');
        getComponent().items = null;
        detectChangesAndExpectText('');
        getComponent().items = [1, 2, 3];
        detectChangesAndExpectText('1;2;3;');
    }));
    it('should throw on non-iterable ref', (0, testing_1.waitForAsync)(() => {
        fixture = createTestComponent();
        getComponent().items = 'whaaa';
        (0, matchers_1.expect)(() => fixture.detectChanges()).toThrowError(`NG02200: Cannot find a differ supporting object 'whaaa' of type 'string'. NgFor only supports binding to Iterables, such as Arrays. Find more at https://angular.dev/errors/NG02200`);
    }));
    it('should throw on non-iterable ref and suggest using an array ', (0, testing_1.waitForAsync)(() => {
        fixture = createTestComponent();
        getComponent().items = { 'stuff': 'whaaa' };
        (0, matchers_1.expect)(() => fixture.detectChanges()).toThrowError(`NG02200: Cannot find a differ supporting object '\[object Object\]' of type 'object'. NgFor only supports binding to Iterables, such as Arrays. Did you mean to use the keyvalue pipe? Find more at https://angular.dev/errors/NG02200`);
    }));
    it('should throw on ref changing to string', (0, testing_1.waitForAsync)(() => {
        fixture = createTestComponent();
        detectChangesAndExpectText('1;2;');
        getComponent().items = 'whaaa';
        (0, matchers_1.expect)(() => fixture.detectChanges()).toThrowError();
    }));
    it('should works with duplicates', (0, testing_1.waitForAsync)(() => {
        fixture = createTestComponent();
        const a = new Foo();
        getComponent().items = [a, a];
        detectChangesAndExpectText('foo;foo;');
    }));
    it('should repeat over nested arrays', (0, testing_1.waitForAsync)(() => {
        const template = '<div *ngFor="let item of items">' +
            '<div *ngFor="let subitem of item">{{subitem}}-{{item.length}};</div>|' +
            '</div>';
        fixture = createTestComponent(template);
        getComponent().items = [['a', 'b'], ['c']];
        detectChangesAndExpectText('a-2;b-2;|c-1;|');
        getComponent().items = [['e'], ['f', 'g']];
        detectChangesAndExpectText('e-1;|f-2;g-2;|');
    }));
    it('should repeat over nested arrays with no intermediate element', (0, testing_1.waitForAsync)(() => {
        const template = '<div *ngFor="let item of items">' +
            '<div *ngFor="let subitem of item">{{subitem}}-{{item.length}};</div>' +
            '</div>';
        fixture = createTestComponent(template);
        getComponent().items = [['a', 'b'], ['c']];
        detectChangesAndExpectText('a-2;b-2;c-1;');
        getComponent().items = [['e'], ['f', 'g']];
        detectChangesAndExpectText('e-1;f-2;g-2;');
    }));
    it('should repeat over nested ngIf that are the last node in the ngFor template', (0, testing_1.waitForAsync)(() => {
        const template = `<div *ngFor="let item of items; let i=index">` +
            `<div>{{i}}|</div>` +
            `<div *ngIf="i % 2 == 0">even|</div>` +
            `</div>`;
        fixture = createTestComponent(template);
        const items = [1];
        getComponent().items = items;
        detectChangesAndExpectText('0|even|');
        items.push(1);
        detectChangesAndExpectText('0|even|1|');
        items.push(1);
        detectChangesAndExpectText('0|even|1|2|even|');
    }));
    it('should allow of saving the collection', (0, testing_1.waitForAsync)(() => {
        const template = '<ul><li *ngFor="let item of items as collection; index as i">{{i}}/{{collection.length}} - {{item}};</li></ul>';
        fixture = createTestComponent(template);
        detectChangesAndExpectText('0/2 - 1;1/2 - 2;');
        getComponent().items = [1, 2, 3];
        detectChangesAndExpectText('0/3 - 1;1/3 - 2;2/3 - 3;');
    }));
    it('should display indices correctly', (0, testing_1.waitForAsync)(() => {
        const template = '<span *ngFor ="let item of items; let i=index">{{i.toString()}}</span>';
        fixture = createTestComponent(template);
        getComponent().items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        detectChangesAndExpectText('0123456789');
        getComponent().items = [1, 2, 6, 7, 4, 3, 5, 8, 9, 0];
        detectChangesAndExpectText('0123456789');
    }));
    it('should display count correctly', (0, testing_1.waitForAsync)(() => {
        const template = '<span *ngFor="let item of items; let len=count">{{len}}</span>';
        fixture = createTestComponent(template);
        getComponent().items = [0, 1, 2];
        detectChangesAndExpectText('333');
        getComponent().items = [4, 3, 2, 1, 0, -1];
        detectChangesAndExpectText('666666');
    }));
    it('should display first item correctly', (0, testing_1.waitForAsync)(() => {
        const template = '<span *ngFor="let item of items; let isFirst=first">{{isFirst.toString()}}</span>';
        fixture = createTestComponent(template);
        getComponent().items = [0, 1, 2];
        detectChangesAndExpectText('truefalsefalse');
        getComponent().items = [2, 1];
        detectChangesAndExpectText('truefalse');
    }));
    it('should display last item correctly', (0, testing_1.waitForAsync)(() => {
        const template = '<span *ngFor="let item of items; let isLast=last">{{isLast.toString()}}</span>';
        fixture = createTestComponent(template);
        getComponent().items = [0, 1, 2];
        detectChangesAndExpectText('falsefalsetrue');
        getComponent().items = [2, 1];
        detectChangesAndExpectText('falsetrue');
    }));
    it('should display even items correctly', (0, testing_1.waitForAsync)(() => {
        const template = '<span *ngFor="let item of items; let isEven=even">{{isEven.toString()}}</span>';
        fixture = createTestComponent(template);
        getComponent().items = [0, 1, 2];
        detectChangesAndExpectText('truefalsetrue');
        getComponent().items = [2, 1];
        detectChangesAndExpectText('truefalse');
    }));
    it('should display odd items correctly', (0, testing_1.waitForAsync)(() => {
        const template = '<span *ngFor="let item of items; let isOdd=odd">{{isOdd.toString()}}</span>';
        fixture = createTestComponent(template);
        getComponent().items = [0, 1, 2, 3];
        detectChangesAndExpectText('falsetruefalsetrue');
        getComponent().items = [2, 1];
        detectChangesAndExpectText('falsetrue');
    }));
    it('should allow to use a custom template', (0, testing_1.waitForAsync)(() => {
        const template = '<ng-container *ngFor="let item of items; template: tpl"></ng-container>' +
            '<ng-template let-item let-i="index" #tpl><p>{{i}}: {{item}};</p></ng-template>';
        fixture = createTestComponent(template);
        getComponent().items = ['a', 'b', 'c'];
        fixture.detectChanges();
        detectChangesAndExpectText('0: a;1: b;2: c;');
    }));
    it('should use a default template if a custom one is null', (0, testing_1.waitForAsync)(() => {
        const template = `<ul><ng-container *ngFor="let item of items; template: null; let i=index">{{i}}: {{item}};</ng-container></ul>`;
        fixture = createTestComponent(template);
        getComponent().items = ['a', 'b', 'c'];
        fixture.detectChanges();
        detectChangesAndExpectText('0: a;1: b;2: c;');
    }));
    it('should use a custom template when both default and a custom one are present', (0, testing_1.waitForAsync)(() => {
        const template = '<ng-container *ngFor="let item of items; template: tpl">{{i}};</ng-container>' +
            '<ng-template let-item let-i="index" #tpl>{{i}}: {{item}};</ng-template>';
        fixture = createTestComponent(template);
        getComponent().items = ['a', 'b', 'c'];
        fixture.detectChanges();
        detectChangesAndExpectText('0: a;1: b;2: c;');
    }));
    describe('track by', () => {
        it('should console.warn if trackBy is not a function', (0, testing_1.waitForAsync)(() => {
            // TODO(vicb): expect a warning message when we have a proper log service
            const template = `<p *ngFor="let item of items; trackBy: value"></p>`;
            fixture = createTestComponent(template);
            fixture.componentInstance.value = 0;
            fixture.detectChanges();
        }));
        it('should track by identity when trackBy is to `null` or `undefined`', (0, testing_1.waitForAsync)(() => {
            // TODO(vicb): expect no warning message when we have a proper log service
            const template = `<p *ngFor="let item of items; trackBy: value">{{ item }}</p>`;
            fixture = createTestComponent(template);
            fixture.componentInstance.items = ['a', 'b', 'c'];
            fixture.componentInstance.value = null;
            detectChangesAndExpectText('abc');
            fixture.componentInstance.value = undefined;
            detectChangesAndExpectText('abc');
        }));
        it('should set the context to the component instance', (0, testing_1.waitForAsync)(() => {
            const template = `<p *ngFor="let item of items; trackBy: trackByContext.bind(this)"></p>`;
            fixture = createTestComponent(template);
            thisArg = null;
            fixture.detectChanges();
            (0, matchers_1.expect)(thisArg).toBe(getComponent());
        }));
        it('should not replace tracked items', (0, testing_1.waitForAsync)(() => {
            const template = `<p *ngFor="let item of items; trackBy: trackById; let i=index">{{items[i]}}</p>`;
            fixture = createTestComponent(template);
            const buildItemList = () => {
                getComponent().items = [{ 'id': 'a' }];
                fixture.detectChanges();
                return fixture.debugElement.queryAll(by_1.By.css('p'))[0];
            };
            const firstP = buildItemList();
            const finalP = buildItemList();
            (0, matchers_1.expect)(finalP.nativeElement).toBe(firstP.nativeElement);
        }));
        it('should update implicit local variable on view', (0, testing_1.waitForAsync)(() => {
            const template = `<div *ngFor="let item of items; trackBy: trackById">{{item['color']}}</div>`;
            fixture = createTestComponent(template);
            getComponent().items = [{ 'id': 'a', 'color': 'blue' }];
            detectChangesAndExpectText('blue');
            getComponent().items = [{ 'id': 'a', 'color': 'red' }];
            detectChangesAndExpectText('red');
        }));
        it('should move items around and keep them updated ', (0, testing_1.waitForAsync)(() => {
            const template = `<div *ngFor="let item of items; trackBy: trackById">{{item['color']}}</div>`;
            fixture = createTestComponent(template);
            getComponent().items = [
                { 'id': 'a', 'color': 'blue' },
                { 'id': 'b', 'color': 'yellow' },
            ];
            detectChangesAndExpectText('blueyellow');
            getComponent().items = [
                { 'id': 'b', 'color': 'orange' },
                { 'id': 'a', 'color': 'red' },
            ];
            detectChangesAndExpectText('orangered');
        }));
        it('should handle added and removed items properly when tracking by index', (0, testing_1.waitForAsync)(() => {
            const template = `<div *ngFor="let item of items; trackBy: trackByIndex">{{item}}</div>`;
            fixture = createTestComponent(template);
            getComponent().items = ['a', 'b', 'c', 'd'];
            fixture.detectChanges();
            getComponent().items = ['e', 'f', 'g', 'h'];
            fixture.detectChanges();
            getComponent().items = ['e', 'f', 'h'];
            detectChangesAndExpectText('efh');
        }));
    });
    it('should be available as a standalone directive', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test-component',
                    imports: [index_1.NgForOf],
                    template: ` <ng-container *ngFor="let item of items">{{ item }}|</ng-container> `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor() {
                    this.items = [1, 2, 3];
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
        (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('1|2|3|');
    });
    it('should be available as a standalone directive using an `NgFor` alias', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test-component',
                    imports: [index_1.NgFor],
                    template: ` <ng-container *ngFor="let item of items">{{ item }}|</ng-container> `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor() {
                    this.items = [1, 2, 3];
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
        (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('1|2|3|');
    });
});
class Foo {
    toString() {
        return 'foo';
    }
}
let TestComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'test-cmp',
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TestComponent = _classThis = class {
        constructor() {
            this.items = [1, 2];
        }
        trackById(index, item) {
            return item['id'];
        }
        trackByIndex(index, item) {
            return index;
        }
        trackByContext() {
            thisArg = this;
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
const TEMPLATE = '<div><span *ngFor="let item of items">{{item.toString()}};</span></div>';
function createTestComponent(template = TEMPLATE) {
    return testing_1.TestBed.overrideComponent(TestComponent, { set: { template: template } }).createComponent(TestComponent);
}
