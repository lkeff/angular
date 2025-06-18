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
exports.ParentCmp = exports.DirectiveWithMultipleExportAsNames = void 0;
const common_1 = require("@angular/common");
const core_1 = require("../../src/core");
const change_detection_1 = require("../../src/change_detection/change_detection");
const view_container_ref_1 = require("../../src/linker/view_container_ref");
const testing_1 = require("../../testing");
const browser_util_1 = require("@angular/platform-browser/testing/src/browser_util");
const matchers_1 = require("@angular/platform-browser/testing/src/matchers");
const stringify_1 = require("../../src/util/stringify");
const ANCHOR_ELEMENT = new core_1.InjectionToken('AnchorElement');
describe('integration tests', function () {
    describe('react to record changes', function () {
        it('should consume text node changes', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp] });
            const template = '<div>{{ctxProp}}</div>';
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.componentInstance.ctxProp = 'Hello World!';
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('Hello World!');
        });
        it('should update text node with a blank string when interpolation evaluates to null', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp] });
            const template = '<div>{{null}}{{ctxProp}}</div>';
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.componentInstance.ctxProp = null;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('');
        });
        it('should allow both null and undefined in expressions', () => {
            const template = '<div>{{null == undefined}}|{{null === undefined}}</div>';
            const fixture = testing_1.TestBed.configureTestingModule({ declarations: [MyComp] })
                .overrideComponent(MyComp, { set: { template } })
                .createComponent(MyComp);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('true|false');
        });
        it('should support an arbitrary number of interpolations in an element', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp] });
            const template = `<div>before{{'0'}}a{{'1'}}b{{'2'}}c{{'3'}}d{{'4'}}e{{'5'}}f{{'6'}}g{{'7'}}h{{'8'}}i{{'9'}}j{{'10'}}after</div>`;
            const fixture = testing_1.TestBed.overrideComponent(MyComp, { set: { template } }).createComponent(MyComp);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('before0a1b2c3d4e5f6g7h8i9j10after');
        });
        it('should use a blank string when interpolation evaluates to null or undefined with an arbitrary number of interpolations', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp] });
            const template = `<div>0{{null}}a{{undefined}}b{{null}}c{{undefined}}d{{null}}e{{undefined}}f{{null}}g{{undefined}}h{{null}}i{{undefined}}j{{null}}1</div>`;
            const fixture = testing_1.TestBed.overrideComponent(MyComp, { set: { template } }).createComponent(MyComp);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('0abcdefghij1');
        });
        it('should consume element binding changes', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp] });
            const template = '<div [id]="ctxProp"></div>';
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.componentInstance.ctxProp = 'Hello World!';
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.debugElement.children[0].nativeElement.id).toEqual('Hello World!');
        });
        it('should consume binding to aria-* attributes', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp] });
            const template = '<div [attr.aria-label]="ctxProp"></div>';
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.componentInstance.ctxProp = 'Initial aria label';
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.debugElement.children[0].nativeElement.getAttribute('aria-label')).toEqual('Initial aria label');
            fixture.componentInstance.ctxProp = 'Changed aria label';
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.debugElement.children[0].nativeElement.getAttribute('aria-label')).toEqual('Changed aria label');
        });
        it('should remove an attribute when attribute expression evaluates to null', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp] });
            const template = '<div [attr.foo]="ctxProp"></div>';
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.componentInstance.ctxProp = 'bar';
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.debugElement.children[0].nativeElement.getAttribute('foo')).toEqual('bar');
            fixture.componentInstance.ctxProp = null;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.debugElement.children[0].nativeElement.hasAttribute('foo')).toBeFalsy();
        });
        it('should remove style when when style expression evaluates to null', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp] });
            const template = '<div [style.height.px]="ctxProp"></div>';
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.componentInstance.ctxProp = '10';
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.debugElement.children[0].nativeElement.style['height']).toEqual('10px');
            fixture.componentInstance.ctxProp = null;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.debugElement.children[0].nativeElement.style['height']).toEqual('');
        });
        it('should consume binding to property names where attr name and property name do not match', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp] });
            const template = '<div [tabindex]="ctxNumProp"></div>';
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.debugElement.children[0].nativeElement.tabIndex).toEqual(0);
            fixture.componentInstance.ctxNumProp = 5;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.debugElement.children[0].nativeElement.tabIndex).toEqual(5);
        });
        it('should consume binding to camel-cased properties', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp] });
            const template = '<input [readOnly]="ctxBoolProp">';
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.debugElement.children[0].nativeElement.readOnly).toBeFalsy();
            fixture.componentInstance.ctxBoolProp = true;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.debugElement.children[0].nativeElement.readOnly).toBeTruthy();
        });
        it('should consume binding to innerHtml', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp] });
            const template = '<div innerHtml="{{ctxProp}}"></div>';
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.componentInstance.ctxProp = 'Some <span>HTML</span>';
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.debugElement.children[0].nativeElement.innerHTML).toEqual('Some <span>HTML</span>');
            fixture.componentInstance.ctxProp = 'Some other <div>HTML</div>';
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.debugElement.children[0].nativeElement.innerHTML).toEqual('Some other <div>HTML</div>');
        });
        it('should consume binding to htmlFor using for alias', () => {
            const template = '<label [for]="ctxProp"></label>';
            const fixture = testing_1.TestBed.configureTestingModule({ declarations: [MyComp] })
                .overrideComponent(MyComp, { set: { template } })
                .createComponent(MyComp);
            const nativeEl = fixture.debugElement.children[0].nativeElement;
            fixture.debugElement.componentInstance.ctxProp = 'foo';
            fixture.detectChanges();
            (0, matchers_1.expect)(nativeEl.htmlFor).toBe('foo');
        });
        it('should consume directive watch expression change.', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp, MyDir] });
            const template = '<span>' +
                '<div my-dir [elprop]="ctxProp"></div>' +
                '<div my-dir elprop="Hi there!"></div>' +
                '<div my-dir elprop="Hi {{\'there!\'}}"></div>' +
                '<div my-dir elprop="One more {{ctxProp}}"></div>' +
                '</span>';
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.componentInstance.ctxProp = 'Hello World!';
            fixture.detectChanges();
            const containerSpan = fixture.debugElement.children[0];
            (0, matchers_1.expect)(containerSpan.children[0].injector.get(MyDir).dirProp).toEqual('Hello World!');
            (0, matchers_1.expect)(containerSpan.children[1].injector.get(MyDir).dirProp).toEqual('Hi there!');
            (0, matchers_1.expect)(containerSpan.children[2].injector.get(MyDir).dirProp).toEqual('Hi there!');
            (0, matchers_1.expect)(containerSpan.children[3].injector.get(MyDir).dirProp).toEqual('One more Hello World!');
        });
        describe('pipes', () => {
            it('should support pipes in bindings', () => {
                testing_1.TestBed.configureTestingModule({ declarations: [MyComp, MyDir, DoublePipe] });
                const template = '<div my-dir #dir="mydir" [elprop]="ctxProp | double"></div>';
                testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
                const fixture = testing_1.TestBed.createComponent(MyComp);
                fixture.componentInstance.ctxProp = 'a';
                fixture.detectChanges();
                const dir = fixture.debugElement.children[0].references['dir'];
                (0, matchers_1.expect)(dir.dirProp).toEqual('aa');
            });
        });
        it('should support nested components.', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp, ChildComp] });
            const template = '<child-cmp></child-cmp>';
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('hello');
        });
        // GH issue 328 - https://github.com/angular/angular/issues/328
        it('should support different directive types on a single node', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp, ChildComp, MyDir] });
            const template = '<child-cmp my-dir [elprop]="ctxProp"></child-cmp>';
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.componentInstance.ctxProp = 'Hello World!';
            fixture.detectChanges();
            const tc = fixture.debugElement.children[0];
            (0, matchers_1.expect)(tc.injector.get(MyDir).dirProp).toEqual('Hello World!');
            (0, matchers_1.expect)(tc.injector.get(ChildComp).dirProp).toEqual(null);
        });
        it('should support directives where a binding attribute is not given', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp, MyDir] });
            const template = '<p my-dir></p>';
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(MyComp);
        });
        it('should execute a given directive once, even if specified multiple times', () => {
            testing_1.TestBed.configureTestingModule({
                declarations: [MyComp, DuplicateDir, DuplicateDir, [DuplicateDir, [DuplicateDir]]],
            });
            const template = '<p no-duplicate></p>';
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('noduplicate');
        });
        it('should support directives where a selector matches property binding', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp, IdDir] });
            const template = '<p [id]="ctxProp"></p>';
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            const tc = fixture.debugElement.children[0];
            const idDir = tc.injector.get(IdDir);
            fixture.componentInstance.ctxProp = 'some_id';
            fixture.detectChanges();
            (0, matchers_1.expect)(idDir.id).toEqual('some_id');
            fixture.componentInstance.ctxProp = 'other_id';
            fixture.detectChanges();
            (0, matchers_1.expect)(idDir.id).toEqual('other_id');
        });
        it('should support directives where a selector matches event binding', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp, EventDir] });
            const template = '<p (customEvent)="doNothing()"></p>';
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            const tc = fixture.debugElement.children[0];
            (0, matchers_1.expect)(tc.injector.get(EventDir)).not.toBeNull();
        });
        it('should display correct error message for uninitialized @Output', () => {
            let UninitializedOutputComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-uninitialized-output',
                        template: '<p>It works!</p>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _customEvent_decorators;
                let _customEvent_initializers = [];
                let _customEvent_extraInitializers = [];
                var UninitializedOutputComp = _classThis = class {
                    constructor() {
                        this.customEvent = __runInitializers(this, _customEvent_initializers, void 0);
                        __runInitializers(this, _customEvent_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "UninitializedOutputComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _customEvent_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _customEvent_decorators, { kind: "field", name: "customEvent", static: false, private: false, access: { has: obj => "customEvent" in obj, get: obj => obj.customEvent, set: (obj, value) => { obj.customEvent = value; } }, metadata: _metadata }, _customEvent_initializers, _customEvent_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    UninitializedOutputComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return UninitializedOutputComp = _classThis;
            })();
            const template = '<my-uninitialized-output (customEvent)="doNothing()"></my-uninitialized-output>';
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp, UninitializedOutputComp] });
            (0, matchers_1.expect)(() => testing_1.TestBed.createComponent(MyComp)).toThrowError("@Output customEvent not initialized in 'UninitializedOutputComp'.");
        });
        it('should read directives metadata from their binding token', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp, PrivateImpl, NeedsPublicApi] });
            const template = '<div public-api><div needs-public-api></div></div>';
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(MyComp);
        });
        it('should not share empty context for template directives - issue #10045', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp, PollutedContext, NoContext] });
            const template = '<ng-template pollutedContext let-foo="bar">{{foo}}</ng-template><ng-template noContext let-foo="bar">{{foo}}</ng-template>';
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('baz');
        });
        it('should not detach views in ViewContainers when the parent view is destroyed.', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp, SomeViewport] });
            const template = '<div *ngIf="ctxBoolProp"><ng-template some-viewport let-greeting="someTmpl"><span>{{greeting}}</span></ng-template></div>';
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.componentInstance.ctxBoolProp = true;
            fixture.detectChanges();
            const ngIfEl = fixture.debugElement.children[0];
            const someViewport = ngIfEl.childNodes
                .find((debugElement) => debugElement.nativeNode.nodeType === Node.COMMENT_NODE)
                .injector.get(SomeViewport);
            (0, matchers_1.expect)(someViewport.container.length).toBe(2);
            (0, matchers_1.expect)(ngIfEl.children.length).toBe(2);
            fixture.componentInstance.ctxBoolProp = false;
            fixture.detectChanges();
            (0, matchers_1.expect)(someViewport.container.length).toBe(2);
            (0, matchers_1.expect)(fixture.debugElement.children.length).toBe(0);
        });
        it('should use a comment while stamping out `<ng-template>` elements.', () => {
            const fixture = testing_1.TestBed.configureTestingModule({ declarations: [MyComp] })
                .overrideComponent(MyComp, { set: { template: '<ng-template></ng-template>' } })
                .createComponent(MyComp);
            const childNodesOfWrapper = fixture.nativeElement.childNodes;
            (0, matchers_1.expect)(childNodesOfWrapper.length).toBe(1);
            (0, matchers_1.expect)((0, browser_util_1.isCommentNode)(childNodesOfWrapper[0])).toBe(true);
        });
        it('should allow to transplant TemplateRefs into other ViewContainers', () => {
            testing_1.TestBed.configureTestingModule({
                declarations: [
                    MyComp,
                    SomeDirective,
                    CompWithHost,
                    ToolbarComponent,
                    ToolbarViewContainer,
                    ToolbarPart,
                ],
                imports: [common_1.CommonModule],
                schemas: [core_1.NO_ERRORS_SCHEMA],
            });
            const template = '<some-directive><toolbar><ng-template toolbarpart let-toolbarProp="toolbarProp">{{ctxProp}},{{toolbarProp}},<cmp-with-host></cmp-with-host></ng-template></toolbar></some-directive>';
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.componentInstance.ctxProp = 'From myComp';
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('TOOLBAR(From myComp,From toolbar,Component with an injected host)');
        });
        describe('reference bindings', () => {
            it('should assign a component to a ref-', () => {
                testing_1.TestBed.configureTestingModule({ declarations: [MyComp, ChildComp] });
                const template = '<p><child-cmp ref-alice></child-cmp></p>';
                testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
                const fixture = testing_1.TestBed.createComponent(MyComp);
                (0, matchers_1.expect)(fixture.debugElement.children[0].children[0].references['alice']).toBeInstanceOf(ChildComp);
            });
            it('should assign a directive to a ref-', () => {
                testing_1.TestBed.configureTestingModule({ declarations: [MyComp, ExportDir] });
                const template = '<div><div export-dir #localdir="dir"></div></div>';
                testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
                const fixture = testing_1.TestBed.createComponent(MyComp);
                (0, matchers_1.expect)(fixture.debugElement.children[0].children[0].references['localdir']).toBeInstanceOf(ExportDir);
            });
            it('should assign a directive to a ref when it has multiple exportAs names', () => {
                testing_1.TestBed.configureTestingModule({
                    declarations: [MyComp, DirectiveWithMultipleExportAsNames],
                });
                const template = '<div multiple-export-as #x="dirX" #y="dirY"></div>';
                testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
                const fixture = testing_1.TestBed.createComponent(MyComp);
                (0, matchers_1.expect)(fixture.debugElement.children[0].references['x']).toBeInstanceOf(DirectiveWithMultipleExportAsNames);
                (0, matchers_1.expect)(fixture.debugElement.children[0].references['y']).toBeInstanceOf(DirectiveWithMultipleExportAsNames);
            });
            it('should make the assigned component accessible in property bindings, even if they were declared before the component', () => {
                testing_1.TestBed.configureTestingModule({ declarations: [MyComp, ChildComp] });
                const template = '<ng-template [ngIf]="true">{{alice.ctxProp}}</ng-template>|{{alice.ctxProp}}|<child-cmp ref-alice></child-cmp>';
                testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
                const fixture = testing_1.TestBed.createComponent(MyComp);
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.nativeElement).toHaveText('hello|hello|hello');
            });
            it('should assign two component instances each with a ref-', () => {
                testing_1.TestBed.configureTestingModule({ declarations: [MyComp, ChildComp] });
                const template = '<p><child-cmp ref-alice></child-cmp><child-cmp ref-bob></child-cmp></p>';
                testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
                const fixture = testing_1.TestBed.createComponent(MyComp);
                const pEl = fixture.debugElement.children[0];
                const alice = pEl.children[0].references['alice'];
                const bob = pEl.children[1].references['bob'];
                (0, matchers_1.expect)(alice).toBeInstanceOf(ChildComp);
                (0, matchers_1.expect)(bob).toBeInstanceOf(ChildComp);
                (0, matchers_1.expect)(alice).not.toBe(bob);
            });
            it('should assign the component instance to a ref- with shorthand syntax', () => {
                testing_1.TestBed.configureTestingModule({ declarations: [MyComp, ChildComp] });
                const template = '<child-cmp #alice></child-cmp>';
                testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
                const fixture = testing_1.TestBed.createComponent(MyComp);
                (0, matchers_1.expect)(fixture.debugElement.children[0].references['alice']).toBeInstanceOf(ChildComp);
            });
            it('should assign the element instance to a user-defined variable', () => {
                testing_1.TestBed.configureTestingModule({ declarations: [MyComp] });
                const template = '<div><div ref-alice><i>Hello</i></div></div>';
                testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
                const fixture = testing_1.TestBed.createComponent(MyComp);
                const value = fixture.debugElement.children[0].children[0].references['alice'];
                (0, matchers_1.expect)(value).not.toBe(null);
                (0, matchers_1.expect)(value.tagName.toLowerCase()).toEqual('div');
            });
            it('should assign the TemplateRef to a user-defined variable', () => {
                const fixture = testing_1.TestBed.configureTestingModule({ declarations: [MyComp] })
                    .overrideComponent(MyComp, { set: { template: '<ng-template ref-alice></ng-template>' } })
                    .createComponent(MyComp);
                const value = fixture.debugElement.childNodes[0].references['alice'];
                (0, matchers_1.expect)(value.createEmbeddedView).toBeTruthy();
            });
            it('should preserve case', () => {
                testing_1.TestBed.configureTestingModule({ declarations: [MyComp, ChildComp] });
                const template = '<p><child-cmp ref-superAlice></child-cmp></p>';
                testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
                const fixture = testing_1.TestBed.createComponent(MyComp);
                (0, matchers_1.expect)(fixture.debugElement.children[0].children[0].references['superAlice']).toBeInstanceOf(ChildComp);
            });
        });
        describe('OnPush components', () => {
            it('should use ChangeDetectorRef to manually request a check', () => {
                testing_1.TestBed.configureTestingModule({ declarations: [MyComp, [[PushCmpWithRef]]] });
                const template = '<push-cmp-with-ref #cmp></push-cmp-with-ref>';
                testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
                const fixture = testing_1.TestBed.createComponent(MyComp);
                const cmp = fixture.debugElement.children[0].references['cmp'];
                fixture.detectChanges();
                (0, matchers_1.expect)(cmp.numberOfChecks).toEqual(1);
                fixture.detectChanges();
                (0, matchers_1.expect)(cmp.numberOfChecks).toEqual(1);
                cmp.propagate();
                fixture.detectChanges();
                (0, matchers_1.expect)(cmp.numberOfChecks).toEqual(2);
            });
            it('should be checked when its bindings got updated', () => {
                testing_1.TestBed.configureTestingModule({
                    declarations: [MyComp, PushCmp, EventCmp],
                    imports: [common_1.CommonModule],
                });
                const template = '<push-cmp [prop]="ctxProp" #cmp></push-cmp>';
                testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
                const fixture = testing_1.TestBed.createComponent(MyComp);
                const cmp = fixture.debugElement.children[0].references['cmp'];
                fixture.componentInstance.ctxProp = 'one';
                fixture.detectChanges();
                (0, matchers_1.expect)(cmp.numberOfChecks).toEqual(1);
                fixture.componentInstance.ctxProp = 'two';
                fixture.detectChanges();
                (0, matchers_1.expect)(cmp.numberOfChecks).toEqual(2);
            });
            if ((0, common_1.ɵgetDOM)().supportsDOMEvents) {
                it('should allow to destroy a component from within a host event handler', (0, testing_1.fakeAsync)(() => {
                    testing_1.TestBed.configureTestingModule({ declarations: [MyComp, [[PushCmpWithHostEvent]]] });
                    const template = '<push-cmp-with-host-event></push-cmp-with-host-event>';
                    testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
                    const fixture = testing_1.TestBed.createComponent(MyComp);
                    (0, testing_1.tick)();
                    fixture.detectChanges();
                    const cmpEl = fixture.debugElement.children[0];
                    const cmp = cmpEl.injector.get(PushCmpWithHostEvent);
                    cmp.ctxCallback = (_) => fixture.destroy();
                    (0, matchers_1.expect)(() => cmpEl.triggerEventHandler('click', {})).not.toThrow();
                }));
            }
            it('should be checked when an event is fired', () => {
                testing_1.TestBed.configureTestingModule({
                    declarations: [MyComp, PushCmp, EventCmp],
                    imports: [common_1.CommonModule],
                });
                const template = '<push-cmp [prop]="ctxProp" #cmp></push-cmp>';
                testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
                const fixture = testing_1.TestBed.createComponent(MyComp);
                const cmpEl = fixture.debugElement.children[0];
                const cmp = cmpEl.componentInstance;
                fixture.detectChanges();
                fixture.detectChanges();
                (0, matchers_1.expect)(cmp.numberOfChecks).toEqual(1);
                // regular element
                cmpEl.children[0].triggerEventHandler('click', {});
                fixture.detectChanges();
                fixture.detectChanges();
                (0, matchers_1.expect)(cmp.numberOfChecks).toEqual(2);
                // element inside of an *ngIf
                cmpEl.children[1].triggerEventHandler('click', {});
                fixture.detectChanges();
                fixture.detectChanges();
                (0, matchers_1.expect)(cmp.numberOfChecks).toEqual(3);
                // element inside a nested component
                cmpEl.children[2].children[0].triggerEventHandler('click', {});
                fixture.detectChanges();
                fixture.detectChanges();
                (0, matchers_1.expect)(cmp.numberOfChecks).toEqual(4);
                // host element
                cmpEl.triggerEventHandler('click', {});
                fixture.detectChanges();
                fixture.detectChanges();
                (0, matchers_1.expect)(cmp.numberOfChecks).toEqual(5);
            });
            it('should not affect updating properties on the component', () => {
                testing_1.TestBed.configureTestingModule({ declarations: [MyComp, [[PushCmpWithRef]]] });
                const template = '<push-cmp-with-ref [prop]="ctxProp" #cmp></push-cmp-with-ref>';
                testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
                const fixture = testing_1.TestBed.createComponent(MyComp);
                const cmp = fixture.debugElement.children[0].references['cmp'];
                fixture.componentInstance.ctxProp = 'one';
                fixture.detectChanges();
                (0, matchers_1.expect)(cmp.prop).toEqual('one');
                fixture.componentInstance.ctxProp = 'two';
                fixture.detectChanges();
                (0, matchers_1.expect)(cmp.prop).toEqual('two');
            });
            it('should be checked when an async pipe requests a check', (0, testing_1.fakeAsync)(() => {
                testing_1.TestBed.configureTestingModule({
                    declarations: [MyComp, PushCmpWithAsyncPipe],
                    imports: [common_1.CommonModule],
                });
                const template = '<push-cmp-with-async #cmp></push-cmp-with-async>';
                testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
                const fixture = testing_1.TestBed.createComponent(MyComp);
                (0, testing_1.tick)();
                const cmp = fixture.debugElement.children[0].references['cmp'];
                fixture.detectChanges();
                (0, matchers_1.expect)(cmp.numberOfChecks).toEqual(1);
                fixture.detectChanges();
                fixture.detectChanges();
                (0, matchers_1.expect)(cmp.numberOfChecks).toEqual(1);
                cmp.resolve(2);
                (0, testing_1.tick)();
                fixture.detectChanges();
                (0, matchers_1.expect)(cmp.numberOfChecks).toEqual(2);
            }));
        });
        it('should create a component that injects an @Host', () => {
            testing_1.TestBed.configureTestingModule({
                declarations: [MyComp, SomeDirective, CompWithHost],
                schemas: [core_1.NO_ERRORS_SCHEMA],
            });
            const template = `
            <some-directive>
              <p>
                <cmp-with-host #child></cmp-with-host>
              </p>
            </some-directive>`;
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            const childComponent = fixture.debugElement.children[0].children[0].children[0].references['child'];
            (0, matchers_1.expect)(childComponent.myHost).toBeInstanceOf(SomeDirective);
        });
        it('should create a component that injects an @Host through viewcontainer directive', () => {
            testing_1.TestBed.configureTestingModule({
                declarations: [MyComp, SomeDirective, CompWithHost],
                schemas: [core_1.NO_ERRORS_SCHEMA],
            });
            const template = `
            <some-directive>
              <p *ngIf="true">
                <cmp-with-host #child></cmp-with-host>
              </p>
            </some-directive>`;
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            const tc = fixture.debugElement.children[0].children[0].children[0];
            const childComponent = tc.references['child'];
            (0, matchers_1.expect)(childComponent.myHost).toBeInstanceOf(SomeDirective);
        });
        it('should support events via EventEmitter on regular elements', (0, testing_1.waitForAsync)(() => {
            testing_1.TestBed.configureTestingModule({
                declarations: [MyComp, DirectiveEmittingEvent, DirectiveListeningEvent],
            });
            const template = '<div emitter listener></div>';
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            const tc = fixture.debugElement.children[0];
            const emitter = tc.injector.get(DirectiveEmittingEvent);
            const listener = tc.injector.get(DirectiveListeningEvent);
            (0, matchers_1.expect)(listener.msg).toEqual('');
            let eventCount = 0;
            emitter.event.subscribe({
                next: () => {
                    eventCount++;
                    if (eventCount === 1) {
                        (0, matchers_1.expect)(listener.msg).toEqual('fired !');
                        fixture.destroy();
                        emitter.fireEvent('fired again !');
                    }
                    else {
                        (0, matchers_1.expect)(listener.msg).toEqual('fired !');
                    }
                },
            });
            emitter.fireEvent('fired !');
        }));
        it('should support events via EventEmitter on template elements', (0, testing_1.waitForAsync)(() => {
            const fixture = testing_1.TestBed.configureTestingModule({
                declarations: [MyComp, DirectiveEmittingEvent, DirectiveListeningEvent],
            })
                .overrideComponent(MyComp, {
                set: {
                    template: '<ng-template emitter listener (event)="ctxProp=$event"></ng-template>',
                },
            })
                .createComponent(MyComp);
            const tc = fixture.debugElement.childNodes.find((debugElement) => debugElement.nativeNode.nodeType === Node.COMMENT_NODE);
            const emitter = tc.injector.get(DirectiveEmittingEvent);
            const myComp = fixture.debugElement.injector.get(MyComp);
            const listener = tc.injector.get(DirectiveListeningEvent);
            myComp.ctxProp = '';
            (0, matchers_1.expect)(listener.msg).toEqual('');
            emitter.event.subscribe({
                next: () => {
                    (0, matchers_1.expect)(listener.msg).toEqual('fired !');
                    (0, matchers_1.expect)(myComp.ctxProp).toEqual('fired !');
                },
            });
            emitter.fireEvent('fired !');
        }));
        it('should support [()] syntax', (0, testing_1.waitForAsync)(() => {
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp, DirectiveWithTwoWayBinding] });
            const template = '<div [(control)]="ctxProp" two-way></div>';
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            const tc = fixture.debugElement.children[0];
            const dir = tc.injector.get(DirectiveWithTwoWayBinding);
            fixture.componentInstance.ctxProp = 'one';
            fixture.detectChanges();
            (0, matchers_1.expect)(dir.control).toEqual('one');
            dir.controlChange.subscribe({
                next: () => {
                    (0, matchers_1.expect)(fixture.componentInstance.ctxProp).toEqual('two');
                },
            });
            dir.triggerChange('two');
        }));
        it('should support render events', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp, DirectiveListeningDomEvent] });
            const template = '<div listener></div>';
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            const tc = fixture.debugElement.children[0];
            const listener = tc.injector.get(DirectiveListeningDomEvent);
            (0, browser_util_1.dispatchEvent)(tc.nativeElement, 'domEvent');
            (0, matchers_1.expect)(listener.eventTypes).toEqual([
                'domEvent',
                'body_domEvent',
                'document_domEvent',
                'window_domEvent',
            ]);
            fixture.destroy();
            listener.eventTypes = [];
            (0, browser_util_1.dispatchEvent)(tc.nativeElement, 'domEvent');
            (0, matchers_1.expect)(listener.eventTypes).toEqual([]);
        });
        it('should support render global events', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp, DirectiveListeningDomEvent] });
            const template = '<div listener></div>';
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            const doc = testing_1.TestBed.inject(common_1.DOCUMENT);
            const tc = fixture.debugElement.children[0];
            const listener = tc.injector.get(DirectiveListeningDomEvent);
            (0, browser_util_1.dispatchEvent)((0, common_1.ɵgetDOM)().getGlobalEventTarget(doc, 'window'), 'domEvent');
            (0, matchers_1.expect)(listener.eventTypes).toEqual(['window_domEvent']);
            listener.eventTypes = [];
            (0, browser_util_1.dispatchEvent)((0, common_1.ɵgetDOM)().getGlobalEventTarget(doc, 'document'), 'domEvent');
            (0, matchers_1.expect)(listener.eventTypes).toEqual(['document_domEvent', 'window_domEvent']);
            fixture.destroy();
            listener.eventTypes = [];
            (0, browser_util_1.dispatchEvent)((0, common_1.ɵgetDOM)().getGlobalEventTarget(doc, 'body'), 'domEvent');
            (0, matchers_1.expect)(listener.eventTypes).toEqual([]);
        });
        it('should support updating host element via hostAttributes on root elements', () => {
            let ComponentUpdatingHostAttributes = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        host: { 'role': 'button' },
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ComponentUpdatingHostAttributes = _classThis = class {
                };
                __setFunctionName(_classThis, "ComponentUpdatingHostAttributes");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ComponentUpdatingHostAttributes = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ComponentUpdatingHostAttributes = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [ComponentUpdatingHostAttributes] });
            const fixture = testing_1.TestBed.createComponent(ComponentUpdatingHostAttributes);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.debugElement.nativeElement.getAttribute('role')).toEqual('button');
        });
        it('should support updating host element via hostAttributes on host elements', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp, DirectiveUpdatingHostAttributes] });
            const template = '<div update-host-attributes></div>';
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.debugElement.children[0].nativeElement.getAttribute('role')).toEqual('button');
        });
        it('should support updating host element via hostProperties', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp, DirectiveUpdatingHostProperties] });
            const template = '<div update-host-properties></div>';
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            const tc = fixture.debugElement.children[0];
            const updateHost = tc.injector.get(DirectiveUpdatingHostProperties);
            updateHost.id = 'newId';
            fixture.detectChanges();
            (0, matchers_1.expect)(tc.nativeElement.id).toEqual('newId');
        });
        it('should not use template variables for expressions in hostProperties', () => {
            let DirectiveWithHostProps = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[host-properties]',
                        host: { '[id]': 'id', '[title]': 'unknownProp' },
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DirectiveWithHostProps = _classThis = class {
                    constructor() {
                        this.id = 'one';
                        this.unknownProp = 'unknownProp';
                    }
                };
                __setFunctionName(_classThis, "DirectiveWithHostProps");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirectiveWithHostProps = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirectiveWithHostProps = _classThis;
            })();
            const fixture = testing_1.TestBed.configureTestingModule({
                declarations: [MyComp, DirectiveWithHostProps],
            })
                .overrideComponent(MyComp, {
                set: { template: `<div *ngFor="let id of ['forId']" host-properties></div>` },
            })
                .createComponent(MyComp);
            fixture.detectChanges();
            const tc = fixture.debugElement.children[0];
            (0, matchers_1.expect)(tc.properties['id']).toBe('one');
            (0, matchers_1.expect)(tc.properties['title']).toBe('unknownProp');
        });
        it('should not allow pipes in hostProperties', () => {
            let DirectiveWithHostProps = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[host-properties]',
                        host: { '[id]': 'id | uppercase' },
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DirectiveWithHostProps = _classThis = class {
                };
                __setFunctionName(_classThis, "DirectiveWithHostProps");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirectiveWithHostProps = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirectiveWithHostProps = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp, DirectiveWithHostProps] });
            const template = '<div host-properties></div>';
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            (0, matchers_1.expect)(() => testing_1.TestBed.createComponent(MyComp)).toThrowError(/Host binding expression cannot contain pipes/);
        });
        it('should not use template variables for expressions in hostListeners', () => {
            let DirectiveWithHostListener = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[host-listener]',
                        host: { '(click)': 'doIt(id, unknownProp)' },
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DirectiveWithHostListener = _classThis = class {
                    constructor() {
                        this.id = 'one';
                        this.receivedArgs = [];
                    }
                    doIt(...args) {
                        this.receivedArgs = args;
                    }
                };
                __setFunctionName(_classThis, "DirectiveWithHostListener");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirectiveWithHostListener = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirectiveWithHostListener = _classThis;
            })();
            const fixture = testing_1.TestBed.configureTestingModule({
                declarations: [MyComp, DirectiveWithHostListener],
            })
                .overrideComponent(MyComp, {
                set: { template: `<div *ngFor="let id of ['forId']" host-listener></div>` },
            })
                .createComponent(MyComp);
            fixture.detectChanges();
            const tc = fixture.debugElement.children[0];
            tc.triggerEventHandler('click', {});
            const dir = tc.injector.get(DirectiveWithHostListener);
            (0, matchers_1.expect)(dir.receivedArgs).toEqual(['one', undefined]);
        });
        it('should not allow pipes in hostListeners', () => {
            let DirectiveWithHostListener = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[host-listener]',
                        host: { '(click)': 'doIt() | somePipe' },
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DirectiveWithHostListener = _classThis = class {
                };
                __setFunctionName(_classThis, "DirectiveWithHostListener");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirectiveWithHostListener = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirectiveWithHostListener = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp, DirectiveWithHostListener] });
            const template = '<div host-listener></div>';
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            (0, matchers_1.expect)(() => testing_1.TestBed.createComponent(MyComp)).toThrowError(/Cannot have a pipe in an action expression/);
        });
        if ((0, common_1.ɵgetDOM)().supportsDOMEvents) {
            it('should support preventing default on render events', () => {
                testing_1.TestBed.configureTestingModule({
                    declarations: [
                        MyComp,
                        DirectiveListeningDomEventPrevent,
                        DirectiveListeningDomEventNoPrevent,
                    ],
                });
                const template = '<input type="checkbox" listenerprevent><input type="checkbox" listenernoprevent>';
                testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
                const fixture = testing_1.TestBed.createComponent(MyComp);
                const dispatchedEvent = (0, browser_util_1.createMouseEvent)('click');
                const dispatchedEvent2 = (0, browser_util_1.createMouseEvent)('click');
                (0, common_1.ɵgetDOM)().dispatchEvent(fixture.debugElement.children[0].nativeElement, dispatchedEvent);
                (0, common_1.ɵgetDOM)().dispatchEvent(fixture.debugElement.children[1].nativeElement, dispatchedEvent2);
                (0, matchers_1.expect)(isPrevented(dispatchedEvent)).toBe(true);
                (0, matchers_1.expect)(isPrevented(dispatchedEvent2)).toBe(false);
                (0, matchers_1.expect)(fixture.debugElement.children[0].nativeElement.checked).toBeFalsy();
                (0, matchers_1.expect)(fixture.debugElement.children[1].nativeElement.checked).toBeTruthy();
            });
        }
        it('should support render global events from multiple directives', () => {
            testing_1.TestBed.configureTestingModule({
                declarations: [MyComp, DirectiveListeningDomEvent, DirectiveListeningDomEventOther],
            });
            const template = '<div *ngIf="ctxBoolProp" listener listenerother></div>';
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            const doc = testing_1.TestBed.inject(common_1.DOCUMENT);
            globalCounter = 0;
            fixture.componentInstance.ctxBoolProp = true;
            fixture.detectChanges();
            const tc = fixture.debugElement.children[0];
            const listener = tc.injector.get(DirectiveListeningDomEvent);
            const listenerother = tc.injector.get(DirectiveListeningDomEventOther);
            (0, browser_util_1.dispatchEvent)((0, common_1.ɵgetDOM)().getGlobalEventTarget(doc, 'window'), 'domEvent');
            (0, matchers_1.expect)(listener.eventTypes).toEqual(['window_domEvent']);
            (0, matchers_1.expect)(listenerother.eventType).toEqual('other_domEvent');
            (0, matchers_1.expect)(globalCounter).toEqual(1);
            fixture.componentInstance.ctxBoolProp = false;
            fixture.detectChanges();
            (0, browser_util_1.dispatchEvent)((0, common_1.ɵgetDOM)().getGlobalEventTarget(doc, 'window'), 'domEvent');
            (0, matchers_1.expect)(globalCounter).toEqual(1);
            fixture.componentInstance.ctxBoolProp = true;
            fixture.detectChanges();
            (0, browser_util_1.dispatchEvent)((0, common_1.ɵgetDOM)().getGlobalEventTarget(doc, 'window'), 'domEvent');
            (0, matchers_1.expect)(globalCounter).toEqual(2);
            // need to destroy to release all remaining global event listeners
            fixture.destroy();
        });
        describe('ViewContainerRef', () => {
            beforeEach(() => {
                testing_1.TestBed.configureTestingModule({
                    declarations: [MyComp, DynamicViewport, ChildCompUsingService],
                });
                testing_1.TestBed.overrideComponent(MyComp, {
                    add: { template: '<div><dynamic-vp #dynamic></dynamic-vp></div>' },
                });
            });
            describe('.createComponent', () => {
                it('should allow to create a component at any bound location', (0, testing_1.waitForAsync)(() => {
                    const fixture = testing_1.TestBed.configureTestingModule({
                        schemas: [core_1.NO_ERRORS_SCHEMA],
                    }).createComponent(MyComp);
                    const tc = fixture.debugElement.children[0].children[0];
                    const dynamicVp = tc.injector.get(DynamicViewport);
                    dynamicVp.create();
                    fixture.detectChanges();
                    (0, matchers_1.expect)(fixture.debugElement.children[0].children[1].nativeElement).toHaveText('dynamic greet');
                }));
                it('should allow to create multiple components at a location', (0, testing_1.waitForAsync)(() => {
                    const fixture = testing_1.TestBed.configureTestingModule({
                        schemas: [core_1.NO_ERRORS_SCHEMA],
                    }).createComponent(MyComp);
                    const tc = fixture.debugElement.children[0].children[0];
                    const dynamicVp = tc.injector.get(DynamicViewport);
                    dynamicVp.create();
                    dynamicVp.create();
                    fixture.detectChanges();
                    (0, matchers_1.expect)(fixture.debugElement.children[0].children[1].nativeElement).toHaveText('dynamic greet');
                    (0, matchers_1.expect)(fixture.debugElement.children[0].children[2].nativeElement).toHaveText('dynamic greet');
                }));
                it('should create a component that has been freshly compiled', () => {
                    let RootComp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                template: '',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var RootComp = _classThis = class {
                            constructor(vc) {
                                this.vc = vc;
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
                    let RootModule = (() => {
                        let _classDecorators = [(0, core_1.NgModule)({
                                declarations: [RootComp],
                                providers: [{ provide: 'someToken', useValue: 'someRootValue' }],
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var RootModule = _classThis = class {
                        };
                        __setFunctionName(_classThis, "RootModule");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            RootModule = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return RootModule = _classThis;
                    })();
                    let MyComp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                template: '',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var MyComp = _classThis = class {
                            constructor(someToken) {
                                this.someToken = someToken;
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
                    let MyModule = (() => {
                        let _classDecorators = [(0, core_1.NgModule)({
                                declarations: [MyComp],
                                providers: [{ provide: 'someToken', useValue: 'someValue' }],
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var MyModule = _classThis = class {
                        };
                        __setFunctionName(_classThis, "MyModule");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            MyModule = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return MyModule = _classThis;
                    })();
                    const compFixture = testing_1.TestBed.configureTestingModule({
                        imports: [RootModule],
                    }).createComponent(RootComp);
                    const compiler = testing_1.TestBed.inject(core_1.Compiler);
                    const myCompFactory = (compiler.compileModuleAndAllComponentsSync(MyModule).componentFactories[0]);
                    // Note: the ComponentFactory was created directly via the compiler, i.e. it
                    // does not have an association to an NgModuleRef.
                    // -> expect the providers of the module that the view container belongs to.
                    const compRef = compFixture.componentInstance.vc.createComponent(myCompFactory);
                    (0, matchers_1.expect)(compRef.instance.someToken).toBe('someRootValue');
                });
                it('should create a component with the passed NgModuleRef', () => {
                    let RootComp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                template: '',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var RootComp = _classThis = class {
                            constructor(vc) {
                                this.vc = vc;
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
                    let MyComp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                template: '',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var MyComp = _classThis = class {
                            constructor(someToken) {
                                this.someToken = someToken;
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
                    let RootModule = (() => {
                        let _classDecorators = [(0, core_1.NgModule)({
                                declarations: [RootComp, MyComp],
                                providers: [{ provide: 'someToken', useValue: 'someRootValue' }],
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var RootModule = _classThis = class {
                        };
                        __setFunctionName(_classThis, "RootModule");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            RootModule = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return RootModule = _classThis;
                    })();
                    let MyModule = (() => {
                        let _classDecorators = [(0, core_1.NgModule)({ providers: [{ provide: 'someToken', useValue: 'someValue' }] })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var MyModule = _classThis = class {
                        };
                        __setFunctionName(_classThis, "MyModule");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            MyModule = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return MyModule = _classThis;
                    })();
                    const compFixture = testing_1.TestBed.configureTestingModule({
                        imports: [RootModule],
                    }).createComponent(RootComp);
                    const compiler = testing_1.TestBed.inject(core_1.Compiler);
                    const myModule = compiler
                        .compileModuleSync(MyModule)
                        .create(testing_1.TestBed.inject(core_1.NgModuleRef).injector);
                    // Note: MyComp was declared as entryComponent in the RootModule,
                    // but we pass MyModule to the createComponent call.
                    // -> expect the providers of MyModule!
                    const compRef = compFixture.componentInstance.vc.createComponent(MyComp, {
                        ngModuleRef: myModule,
                    });
                    (0, matchers_1.expect)(compRef.instance.someToken).toBe('someValue');
                });
                it('should create a component with the NgModuleRef of the ComponentFactoryResolver', () => {
                    let RootComp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                template: '',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var RootComp = _classThis = class {
                            constructor(vc) {
                                this.vc = vc;
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
                    let RootModule = (() => {
                        let _classDecorators = [(0, core_1.NgModule)({
                                declarations: [RootComp],
                                providers: [{ provide: 'someToken', useValue: 'someRootValue' }],
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var RootModule = _classThis = class {
                        };
                        __setFunctionName(_classThis, "RootModule");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            RootModule = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return RootModule = _classThis;
                    })();
                    let MyComp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                template: '',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var MyComp = _classThis = class {
                            constructor(someToken) {
                                this.someToken = someToken;
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
                    let MyModule = (() => {
                        let _classDecorators = [(0, core_1.NgModule)({
                                declarations: [MyComp],
                                providers: [{ provide: 'someToken', useValue: 'someValue' }],
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var MyModule = _classThis = class {
                        };
                        __setFunctionName(_classThis, "MyModule");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            MyModule = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return MyModule = _classThis;
                    })();
                    const compFixture = testing_1.TestBed.configureTestingModule({
                        imports: [RootModule],
                    }).createComponent(RootComp);
                    const compiler = testing_1.TestBed.inject(core_1.Compiler);
                    const myModule = compiler
                        .compileModuleSync(MyModule)
                        .create(testing_1.TestBed.inject(core_1.NgModuleRef).injector);
                    const myCompFactory = myModule.componentFactoryResolver.resolveComponentFactory(MyComp);
                    // Note: MyComp was declared as entryComponent in MyModule,
                    // and we don't pass an explicit ModuleRef to the createComponent call.
                    // -> expect the providers of MyModule!
                    const compRef = compFixture.componentInstance.vc.createComponent(myCompFactory);
                    (0, matchers_1.expect)(compRef.instance.someToken).toBe('someValue');
                });
            });
            describe('.insert', () => {
                it('should throw with destroyed views', (0, testing_1.waitForAsync)(() => {
                    const fixture = testing_1.TestBed.configureTestingModule({
                        schemas: [core_1.NO_ERRORS_SCHEMA],
                    }).createComponent(MyComp);
                    const tc = fixture.debugElement.children[0].children[0];
                    const dynamicVp = tc.injector.get(DynamicViewport);
                    const ref = dynamicVp.create();
                    fixture.detectChanges();
                    ref.destroy();
                    (0, matchers_1.expect)(() => {
                        dynamicVp.insert(ref.hostView);
                    }).toThrowError('Cannot insert a destroyed View in a ViewContainer!');
                }));
            });
            describe('.move', () => {
                it('should throw with destroyed views', (0, testing_1.waitForAsync)(() => {
                    const fixture = testing_1.TestBed.configureTestingModule({
                        schemas: [core_1.NO_ERRORS_SCHEMA],
                    }).createComponent(MyComp);
                    const tc = fixture.debugElement.children[0].children[0];
                    const dynamicVp = tc.injector.get(DynamicViewport);
                    const ref = dynamicVp.create();
                    fixture.detectChanges();
                    ref.destroy();
                    (0, matchers_1.expect)(() => {
                        dynamicVp.move(ref.hostView, 1);
                    }).toThrowError('Cannot move a destroyed View in a ViewContainer!');
                }));
            });
        });
        it('should support static attributes', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp, NeedsAttribute] });
            const template = '<input static type="text" title>';
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            const tc = fixture.debugElement.children[0];
            const needsAttribute = tc.injector.get(NeedsAttribute);
            (0, matchers_1.expect)(needsAttribute.typeAttribute).toEqual('text');
            (0, matchers_1.expect)(needsAttribute.staticAttribute).toEqual('');
            (0, matchers_1.expect)(needsAttribute.fooAttribute).toBeNull();
        });
        it('should support custom interpolation', () => {
            testing_1.TestBed.configureTestingModule({
                declarations: [
                    MyComp,
                    ComponentWithCustomInterpolationA,
                    ComponentWithCustomInterpolationB,
                    ComponentWithDefaultInterpolation,
                ],
            });
            const template = `<div>{{ctxProp}}</div>
<cmp-with-custom-interpolation-a></cmp-with-custom-interpolation-a>
<cmp-with-custom-interpolation-b></cmp-with-custom-interpolation-b>`;
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.componentInstance.ctxProp = 'Default Interpolation';
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('Default InterpolationCustom Interpolation ACustom Interpolation B (Default Interpolation)');
        });
    });
    describe('dependency injection', () => {
        it('should support bindings', () => {
            testing_1.TestBed.configureTestingModule({
                declarations: [MyComp, DirectiveProvidingInjectable, DirectiveConsumingInjectable],
                schemas: [core_1.NO_ERRORS_SCHEMA],
            });
            const template = `
            <directive-providing-injectable >
              <directive-consuming-injectable #consuming>
              </directive-consuming-injectable>
            </directive-providing-injectable>
          `;
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            const comp = fixture.debugElement.children[0].children[0].references['consuming'];
            (0, matchers_1.expect)(comp.injectable).toBeInstanceOf(InjectableService);
        });
        it('should support viewProviders', () => {
            testing_1.TestBed.configureTestingModule({
                declarations: [MyComp, DirectiveProvidingInjectableInView, DirectiveConsumingInjectable],
                schemas: [core_1.NO_ERRORS_SCHEMA],
            });
            const template = `
              <directive-consuming-injectable #consuming>
              </directive-consuming-injectable>
          `;
            testing_1.TestBed.overrideComponent(DirectiveProvidingInjectableInView, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(DirectiveProvidingInjectableInView);
            const comp = fixture.debugElement.children[0].references['consuming'];
            (0, matchers_1.expect)(comp.injectable).toBeInstanceOf(InjectableService);
        });
        it('should support unbounded lookup', () => {
            testing_1.TestBed.configureTestingModule({
                declarations: [
                    MyComp,
                    DirectiveProvidingInjectable,
                    DirectiveContainingDirectiveConsumingAnInjectable,
                    DirectiveConsumingInjectableUnbounded,
                ],
                schemas: [core_1.NO_ERRORS_SCHEMA],
            });
            const template = `
            <directive-providing-injectable>
              <directive-containing-directive-consuming-an-injectable #dir>
              </directive-containing-directive-consuming-an-injectable>
            </directive-providing-injectable>
          `;
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            testing_1.TestBed.overrideComponent(DirectiveContainingDirectiveConsumingAnInjectable, {
                set: {
                    template: `
            <directive-consuming-injectable-unbounded></directive-consuming-injectable-unbounded>
          `,
                },
            });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            const comp = fixture.debugElement.children[0].children[0].references['dir'];
            (0, matchers_1.expect)(comp.directive.injectable).toBeInstanceOf(InjectableService);
        });
        it('should support the event-bus scenario', () => {
            testing_1.TestBed.configureTestingModule({
                declarations: [
                    MyComp,
                    GrandParentProvidingEventBus,
                    ParentProvidingEventBus,
                    ChildConsumingEventBus,
                ],
                schemas: [core_1.NO_ERRORS_SCHEMA],
            });
            const template = `
            <grand-parent-providing-event-bus>
              <parent-providing-event-bus>
                <child-consuming-event-bus>
                </child-consuming-event-bus>
              </parent-providing-event-bus>
            </grand-parent-providing-event-bus>
          `;
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            const gpComp = fixture.debugElement.children[0];
            const parentComp = gpComp.children[0];
            const childComp = parentComp.children[0];
            const grandParent = gpComp.injector.get(GrandParentProvidingEventBus);
            const parent = parentComp.injector.get(ParentProvidingEventBus);
            const child = childComp.injector.get(ChildConsumingEventBus);
            (0, matchers_1.expect)(grandParent.bus.name).toEqual('grandparent');
            (0, matchers_1.expect)(parent.bus.name).toEqual('parent');
            (0, matchers_1.expect)(parent.grandParentBus).toBe(grandParent.bus);
            (0, matchers_1.expect)(child.bus).toBe(parent.bus);
        });
        it('should instantiate bindings lazily', () => {
            testing_1.TestBed.configureTestingModule({
                declarations: [MyComp, DirectiveConsumingInjectable, ComponentProvidingLoggingInjectable],
                schemas: [core_1.NO_ERRORS_SCHEMA],
            });
            const template = `
              <component-providing-logging-injectable #providing>
                <directive-consuming-injectable *ngIf="ctxBoolProp">
                </directive-consuming-injectable>
              </component-providing-logging-injectable>
          `;
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            const providing = fixture.debugElement.children[0].references['providing'];
            (0, matchers_1.expect)(providing.created).toBe(false);
            fixture.componentInstance.ctxBoolProp = true;
            fixture.detectChanges();
            (0, matchers_1.expect)(providing.created).toBe(true);
        });
    });
    describe('corner cases', () => {
        it('should remove script tags from templates', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp] });
            const template = `
            <script>alert("Ooops");</script>
            <div>before<script>alert("Ooops");</script><span>inside</span>after</div>`;
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            (0, matchers_1.expect)(fixture.nativeElement.querySelectorAll('script').length).toEqual(0);
        });
        it('should throw when using directives without selector in NgModule declarations', () => {
            let SomeDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomeDirective = _classThis = class {
                };
                __setFunctionName(_classThis, "SomeDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeDirective = _classThis;
            })();
            let SomeComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'comp',
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomeComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "SomeComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeComponent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp, SomeDirective, SomeComponent] });
            (0, matchers_1.expect)(() => testing_1.TestBed.createComponent(MyComp)).toThrowError(`Directive ${(0, stringify_1.stringify)(SomeDirective)} has no selector, please add it!`);
        });
        it('should not throw when using directives without selector as base class not in declarations', () => {
            let Base = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Base = _classThis = class {
                    constructor(injector) {
                        this.injector = injector;
                    }
                };
                __setFunctionName(_classThis, "Base");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Base = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Base = _classThis;
            })();
            let EmptyDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var EmptyDir = _classThis = class {
                };
                __setFunctionName(_classThis, "EmptyDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    EmptyDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return EmptyDir = _classThis;
            })();
            let TestDirWithInputs = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        inputs: ['a', 'b'],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestDirWithInputs = _classThis = class {
                };
                __setFunctionName(_classThis, "TestDirWithInputs");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestDirWithInputs = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestDirWithInputs = _classThis;
            })();
            let SomeComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'comp',
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = Base;
                var SomeComponent = _classThis = class extends _classSuper {
                };
                __setFunctionName(_classThis, "SomeComponent");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeComponent = _classThis;
            })();
            let SomeComponent2 = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'comp2',
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = EmptyDir;
                var SomeComponent2 = _classThis = class extends _classSuper {
                };
                __setFunctionName(_classThis, "SomeComponent2");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeComponent2 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeComponent2 = _classThis;
            })();
            let SomeComponent3 = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'comp3',
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = TestDirWithInputs;
                var SomeComponent3 = _classThis = class extends _classSuper {
                };
                __setFunctionName(_classThis, "SomeComponent3");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeComponent3 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeComponent3 = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [MyComp, SomeComponent, SomeComponent2, SomeComponent3],
            });
            (0, matchers_1.expect)(() => testing_1.TestBed.createComponent(MyComp)).not.toThrowError();
        });
        it('should throw when using directives with empty string selector', () => {
            let SomeDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomeDirective = _classThis = class {
                };
                __setFunctionName(_classThis, "SomeDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeDirective = _classThis;
            })();
            let SomeComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'comp',
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomeComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "SomeComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeComponent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp, SomeDirective, SomeComponent] });
            (0, matchers_1.expect)(() => testing_1.TestBed.createComponent(MyComp)).toThrowError(`Directive ${(0, stringify_1.stringify)(SomeDirective)} has no selector, please add it!`);
        });
        it('should use a default element name for components without selectors', () => {
            var _a;
            let NoSelectorComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '----',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var NoSelectorComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "NoSelectorComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    NoSelectorComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return NoSelectorComponent = _classThis;
            })();
            (0, matchers_1.expect)((_a = (0, core_1.reflectComponentType)(NoSelectorComponent)) === null || _a === void 0 ? void 0 : _a.selector).toBe('ng-component');
            (0, matchers_1.expect)((0, core_1.createComponent)(NoSelectorComponent, {
                environmentInjector: testing_1.TestBed.inject(core_1.EnvironmentInjector),
            }).location.nativeElement.nodeName.toLowerCase()).toEqual('ng-component');
        });
    });
    describe('error handling', () => {
        it('should report a meaningful error when a directive is missing annotation', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp, SomeDirectiveMissingAnnotation] });
            (0, matchers_1.expect)(() => testing_1.TestBed.createComponent(MyComp)).toThrowError(`Unexpected value '${(0, stringify_1.stringify)(SomeDirectiveMissingAnnotation)}' declared by the module 'DynamicTestModule'. Please add a @Pipe/@Directive/@Component annotation.`);
        });
        it('should report a meaningful error when a component is missing view annotation', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp, ComponentWithoutView] });
            try {
                testing_1.TestBed.createComponent(ComponentWithoutView);
            }
            catch (e) {
                (0, matchers_1.expect)(e.message).toContain(`No template specified for component ${(0, stringify_1.stringify)(ComponentWithoutView)}`);
            }
        });
    });
    it('should support imperative views', () => {
        testing_1.TestBed.configureTestingModule({ declarations: [MyComp, SimpleImperativeViewComponent] });
        const template = '<simple-imp-cmp></simple-imp-cmp>';
        testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
        const fixture = testing_1.TestBed.createComponent(MyComp);
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('hello imp view');
    });
    it('should support moving embedded views around', () => {
        testing_1.TestBed.configureTestingModule({
            declarations: [MyComp, SomeImperativeViewport],
            providers: [{ provide: ANCHOR_ELEMENT, useValue: (0, browser_util_1.el)('<div></div>') }],
        });
        const template = '<div><div *someImpvp="ctxBoolProp">hello</div></div>';
        testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
        const anchorElement = (0, testing_1.getTestBed)().inject(ANCHOR_ELEMENT);
        const fixture = testing_1.TestBed.createComponent(MyComp);
        fixture.detectChanges();
        (0, matchers_1.expect)(anchorElement).toHaveText('');
        fixture.componentInstance.ctxBoolProp = true;
        fixture.detectChanges();
        (0, matchers_1.expect)(anchorElement).toHaveText('hello');
        fixture.componentInstance.ctxBoolProp = false;
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('');
    });
    describe('moving embedded views of projectable nodes in a dynamic component', () => {
        let DynamicMenuItem = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'menu-item',
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _templateRef_decorators;
            let _templateRef_initializers = [];
            let _templateRef_extraInitializers = [];
            var DynamicMenuItem = _classThis = class {
                constructor() {
                    this.templateRef = __runInitializers(this, _templateRef_initializers, void 0);
                    this.itemContent = __runInitializers(this, _templateRef_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "DynamicMenuItem");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _templateRef_decorators = [(0, core_1.ViewChild)('templateRef', { static: true })];
                __esDecorate(null, null, _templateRef_decorators, { kind: "field", name: "templateRef", static: false, private: false, access: { has: obj => "templateRef" in obj, get: obj => obj.templateRef, set: (obj, value) => { obj.templateRef = value; } }, metadata: _metadata }, _templateRef_initializers, _templateRef_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DynamicMenuItem = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DynamicMenuItem = _classThis;
        })();
        let TestCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test',
                    template: `<ng-container #menuItemsContainer></ng-container>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _menuItemsContainer_decorators;
            let _menuItemsContainer_initializers = [];
            let _menuItemsContainer_extraInitializers = [];
            var TestCmp = _classThis = class {
                constructor(cfr) {
                    this.cfr = cfr;
                    this.menuItemsContainer = __runInitializers(this, _menuItemsContainer_initializers, void 0);
                    __runInitializers(this, _menuItemsContainer_extraInitializers);
                    this.cfr = cfr;
                }
            };
            __setFunctionName(_classThis, "TestCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _menuItemsContainer_decorators = [(0, core_1.ViewChild)('menuItemsContainer', { static: true, read: view_container_ref_1.ViewContainerRef })];
                __esDecorate(null, null, _menuItemsContainer_decorators, { kind: "field", name: "menuItemsContainer", static: false, private: false, access: { has: obj => "menuItemsContainer" in obj, get: obj => obj.menuItemsContainer, set: (obj, value) => { obj.menuItemsContainer = value; } }, metadata: _metadata }, _menuItemsContainer_initializers, _menuItemsContainer_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestCmp = _classThis;
        })();
        beforeEach(() => {
            testing_1.TestBed.configureTestingModule({ declarations: [TestCmp, DynamicMenuItem] });
        });
        const createElWithContent = (content, tagName = 'span') => {
            const element = document.createElement(tagName);
            element.textContent = content;
            return element;
        };
        it('should support moving embedded views of projectable nodes', () => {
            testing_1.TestBed.overrideTemplate(DynamicMenuItem, `<ng-template #templateRef><ng-content></ng-content></ng-template>`);
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            const menuItemsContainer = fixture.componentInstance.menuItemsContainer;
            const dynamicCmptFactory = fixture.componentInstance.cfr.resolveComponentFactory(DynamicMenuItem);
            const cmptRefWithAa = dynamicCmptFactory.create(core_1.Injector.NULL, [[createElWithContent('Aa')]]);
            const cmptRefWithBb = dynamicCmptFactory.create(core_1.Injector.NULL, [[createElWithContent('Bb')]]);
            const cmptRefWithCc = dynamicCmptFactory.create(core_1.Injector.NULL, [[createElWithContent('Cc')]]);
            menuItemsContainer.insert(cmptRefWithAa.instance.templateRef.createEmbeddedView({}));
            menuItemsContainer.insert(cmptRefWithBb.instance.templateRef.createEmbeddedView({}));
            menuItemsContainer.insert(cmptRefWithCc.instance.templateRef.createEmbeddedView({}));
            menuItemsContainer.move(menuItemsContainer.get(0), 1);
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('BbAaCc');
            menuItemsContainer.move(menuItemsContainer.get(2), 1);
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('BbCcAa');
        });
        it('should support moving embedded views of projectable nodes in multiple slots', () => {
            testing_1.TestBed.overrideTemplate(DynamicMenuItem, `<ng-template #templateRef><ng-content select="span"></ng-content><ng-content select="button"></ng-content></ng-template>`);
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            const menuItemsContainer = fixture.componentInstance.menuItemsContainer;
            const dynamicCmptFactory = fixture.componentInstance.cfr.resolveComponentFactory(DynamicMenuItem);
            const cmptRefWithAa = dynamicCmptFactory.create(core_1.Injector.NULL, [
                [createElWithContent('A')],
                [createElWithContent('a', 'button')],
            ]);
            const cmptRefWithBb = dynamicCmptFactory.create(core_1.Injector.NULL, [
                [createElWithContent('B')],
                [createElWithContent('b', 'button')],
            ]);
            const cmptRefWithCc = dynamicCmptFactory.create(core_1.Injector.NULL, [
                [createElWithContent('C')],
                [createElWithContent('c', 'button')],
            ]);
            menuItemsContainer.insert(cmptRefWithAa.instance.templateRef.createEmbeddedView({}));
            menuItemsContainer.insert(cmptRefWithBb.instance.templateRef.createEmbeddedView({}));
            menuItemsContainer.insert(cmptRefWithCc.instance.templateRef.createEmbeddedView({}));
            menuItemsContainer.move(menuItemsContainer.get(0), 1);
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('BbAaCc');
            menuItemsContainer.move(menuItemsContainer.get(2), 1);
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('BbCcAa');
        });
        it('should support moving embedded views of projectable nodes in multiple slots and interpolations', () => {
            testing_1.TestBed.overrideTemplate(DynamicMenuItem, `<ng-template #templateRef><ng-content select="span"></ng-content>{{itemContent}}<ng-content select="button"></ng-content></ng-template>`);
            testing_1.TestBed.configureTestingModule({ declarations: [TestCmp, DynamicMenuItem] });
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            const menuItemsContainer = fixture.componentInstance.menuItemsContainer;
            const dynamicCmptFactory = fixture.componentInstance.cfr.resolveComponentFactory(DynamicMenuItem);
            const cmptRefWithAa = dynamicCmptFactory.create(core_1.Injector.NULL, [
                [createElWithContent('A')],
                [createElWithContent('a', 'button')],
            ]);
            const cmptRefWithBb = dynamicCmptFactory.create(core_1.Injector.NULL, [
                [createElWithContent('B')],
                [createElWithContent('b', 'button')],
            ]);
            const cmptRefWithCc = dynamicCmptFactory.create(core_1.Injector.NULL, [
                [createElWithContent('C')],
                [createElWithContent('c', 'button')],
            ]);
            menuItemsContainer.insert(cmptRefWithAa.instance.templateRef.createEmbeddedView({}));
            menuItemsContainer.insert(cmptRefWithBb.instance.templateRef.createEmbeddedView({}));
            menuItemsContainer.insert(cmptRefWithCc.instance.templateRef.createEmbeddedView({}));
            cmptRefWithAa.instance.itemContent = '0';
            cmptRefWithBb.instance.itemContent = '1';
            cmptRefWithCc.instance.itemContent = '2';
            fixture.detectChanges();
            menuItemsContainer.move(menuItemsContainer.get(0), 1);
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('B1bA0aC2c');
            menuItemsContainer.move(menuItemsContainer.get(2), 1);
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('B1bC2cA0a');
        });
        it('should support moving embedded views with empty projectable slots', () => {
            testing_1.TestBed.overrideTemplate(DynamicMenuItem, `<ng-template #templateRef><ng-content></ng-content></ng-template>`);
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            const menuItemsContainer = fixture.componentInstance.menuItemsContainer;
            const dynamicCmptFactory = fixture.componentInstance.cfr.resolveComponentFactory(DynamicMenuItem);
            const cmptRefWithAa = dynamicCmptFactory.create(core_1.Injector.NULL, [[]]);
            const cmptRefWithBb = dynamicCmptFactory.create(core_1.Injector.NULL, [[createElWithContent('Bb')]]);
            const cmptRefWithCc = dynamicCmptFactory.create(core_1.Injector.NULL, [[createElWithContent('Cc')]]);
            menuItemsContainer.insert(cmptRefWithAa.instance.templateRef.createEmbeddedView({}));
            menuItemsContainer.insert(cmptRefWithBb.instance.templateRef.createEmbeddedView({}));
            menuItemsContainer.insert(cmptRefWithCc.instance.templateRef.createEmbeddedView({}));
            menuItemsContainer.move(menuItemsContainer.get(0), 1); // [ Bb, NULL, Cc]
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('BbCc');
            menuItemsContainer.move(menuItemsContainer.get(2), 1); // [ Bb, Cc, NULL]
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('BbCc');
            menuItemsContainer.move(menuItemsContainer.get(0), 1); // [ Cc, Bb, NULL]
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('CcBb');
        });
    });
    describe('Property bindings', () => {
        it('should throw on bindings to unknown properties', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp] });
            const template = '<div unknown="{{ctxProp}}"></div>';
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            const spy = spyOn(console, 'error');
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            (0, matchers_1.expect)(spy.calls.mostRecent().args[0]).toMatch(/Can't bind to 'unknown' since it isn't a known property of 'div'./);
        });
        it('should throw on bindings to unknown properties', () => {
            testing_1.TestBed.configureTestingModule({ imports: [common_1.CommonModule], declarations: [MyComp] });
            const template = '<div *ngFor="let item in ctxArrProp">{{item}}</div>';
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            const spy = spyOn(console, 'error');
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            (0, matchers_1.expect)(spy.calls.mostRecent().args[0]).toMatch(/Can't bind to 'ngForIn' since it isn't a known property of 'div'./);
        });
        it('should not throw for property binding to a non-existing property when there is a matching directive property', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp, MyDir] });
            const template = '<div my-dir [elprop]="ctxProp"></div>';
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            (0, matchers_1.expect)(() => testing_1.TestBed.createComponent(MyComp)).not.toThrow();
        });
        it('should not be created when there is a directive with the same property', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp, DirectiveWithTitle] });
            const template = '<span [title]="ctxProp"></span>';
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.componentInstance.ctxProp = 'TITLE';
            fixture.detectChanges();
            const el = fixture.nativeElement.querySelector('span');
            (0, matchers_1.expect)(el.title).toBeFalsy();
        });
        it('should work when a directive uses hostProperty to update the DOM element', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp, DirectiveWithTitleAndHostProperty] });
            const template = '<span [title]="ctxProp"></span>';
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.componentInstance.ctxProp = 'TITLE';
            fixture.detectChanges();
            const el = fixture.nativeElement.querySelector('span');
            (0, matchers_1.expect)(el.title).toEqual('TITLE');
        });
    });
    describe('logging property updates', () => {
        describe('by default, when provideNgReflectAttributes() is not provided', () => {
            it('should not reflect properties', () => {
                testing_1.TestBed.configureTestingModule({
                    declarations: [MyComp, MyDir],
                });
                testing_1.TestBed.overrideComponent(MyComp, {
                    set: { template: `<div my-dir [elprop]="ctxProp"></div>` },
                });
                const fixture = testing_1.TestBed.createComponent(MyComp);
                fixture.componentInstance.ctxProp = 'hello';
                fixture.detectChanges();
                const html = fixture.nativeElement.innerHTML;
                (0, matchers_1.expect)(html).not.toContain('ng-reflect');
            });
            it('should not reflect property values on template comments', () => {
                const fixture = testing_1.TestBed.configureTestingModule({
                    declarations: [MyComp],
                })
                    .overrideComponent(MyComp, {
                    set: { template: `<ng-template [ngIf]="ctxBoolProp"></ng-template>` },
                })
                    .createComponent(MyComp);
                fixture.componentInstance.ctxBoolProp = true;
                fixture.detectChanges();
                const html = fixture.nativeElement.innerHTML;
                (0, matchers_1.expect)(html).not.toContain('ng-reflect');
            });
        });
        it('should reflect property values as attributes', () => {
            testing_1.TestBed.configureTestingModule({
                declarations: [MyComp, MyDir],
                providers: [(0, core_1.provideNgReflectAttributes)()],
            });
            testing_1.TestBed.overrideComponent(MyComp, { set: { template: `<div my-dir [elprop]="ctxProp"></div>` } });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.componentInstance.ctxProp = 'hello';
            fixture.detectChanges();
            const html = fixture.nativeElement.innerHTML;
            (0, matchers_1.expect)(html).toContain('ng-reflect-dir-prop="hello"');
        });
        it('should reflect property values on unbound inputs', () => {
            testing_1.TestBed.configureTestingModule({
                declarations: [MyComp, MyDir],
                providers: [(0, core_1.provideNgReflectAttributes)()],
            });
            testing_1.TestBed.overrideComponent(MyComp, {
                set: { template: `<div my-dir elprop="hello" title="Reflect test"></div>` },
            });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            const html = fixture.nativeElement.innerHTML;
            (0, matchers_1.expect)(html).toContain('ng-reflect-dir-prop="hello"');
            (0, matchers_1.expect)(html).not.toContain('ng-reflect-title');
        });
        it(`should work with prop names containing '$'`, () => {
            testing_1.TestBed.configureTestingModule({
                declarations: [ParentCmp, SomeCmpWithInput],
                providers: [(0, core_1.provideNgReflectAttributes)()],
            });
            const fixture = testing_1.TestBed.createComponent(ParentCmp);
            fixture.detectChanges();
            const html = fixture.nativeElement.innerHTML;
            (0, matchers_1.expect)(html).toContain('ng-reflect-test_="hello"');
        });
        it('should reflect property values on template comments', () => {
            const fixture = testing_1.TestBed.configureTestingModule({
                declarations: [MyComp],
                providers: [(0, core_1.provideNgReflectAttributes)()],
            })
                .overrideComponent(MyComp, {
                set: { template: `<ng-template [ngIf]="ctxBoolProp"></ng-template>` },
            })
                .createComponent(MyComp);
            fixture.componentInstance.ctxBoolProp = true;
            fixture.detectChanges();
            const html = fixture.nativeElement.innerHTML;
            (0, matchers_1.expect)(html).toContain('"ng-reflect-ng-if": "true"');
        });
        it('should reflect property values on ng-containers', () => {
            const fixture = testing_1.TestBed.configureTestingModule({
                declarations: [MyComp],
                providers: [(0, core_1.provideNgReflectAttributes)()],
            })
                .overrideComponent(MyComp, {
                set: { template: `<ng-container *ngIf="ctxBoolProp">content</ng-container>` },
            })
                .createComponent(MyComp);
            fixture.componentInstance.ctxBoolProp = true;
            fixture.detectChanges();
            const html = fixture.nativeElement.innerHTML;
            (0, matchers_1.expect)(html).toContain('"ng-reflect-ng-if": "true"');
        });
        it('should reflect property values of multiple directive bound to the same input name', () => {
            testing_1.TestBed.configureTestingModule({
                declarations: [MyComp, MyDir, MyDir2],
                providers: [(0, core_1.provideNgReflectAttributes)()],
            });
            testing_1.TestBed.overrideComponent(MyComp, {
                set: { template: `<div my-dir my-dir2 [elprop]="ctxProp"></div>` },
            });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.componentInstance.ctxProp = 'hello';
            fixture.detectChanges();
            const html = fixture.nativeElement.innerHTML;
            (0, matchers_1.expect)(html).toContain('ng-reflect-dir-prop="hello"');
            (0, matchers_1.expect)(html).toContain('ng-reflect-dir-prop2="hello"');
        });
        it('should indicate when toString() throws', () => {
            testing_1.TestBed.configureTestingModule({
                declarations: [MyComp, MyDir],
                providers: [(0, core_1.provideNgReflectAttributes)()],
            });
            const template = '<div my-dir [elprop]="toStringThrow"></div>';
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toContain('[ERROR]');
        });
        it('should not reflect undefined values', () => {
            testing_1.TestBed.configureTestingModule({
                declarations: [MyComp, MyDir, MyDir2],
                providers: [(0, core_1.provideNgReflectAttributes)()],
            });
            testing_1.TestBed.overrideComponent(MyComp, { set: { template: `<div my-dir [elprop]="ctxProp"></div>` } });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.componentInstance.ctxProp = 'hello';
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toContain('ng-reflect-dir-prop="hello"');
            fixture.componentInstance.ctxProp = undefined;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).not.toContain('ng-reflect-');
        });
        it('should not reflect null values', () => {
            testing_1.TestBed.configureTestingModule({
                declarations: [MyComp, MyDir, MyDir2],
                providers: [(0, core_1.provideNgReflectAttributes)()],
            });
            testing_1.TestBed.overrideComponent(MyComp, { set: { template: `<div my-dir [elprop]="ctxProp"></div>` } });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.componentInstance.ctxProp = 'hello';
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toContain('ng-reflect-dir-prop="hello"');
            fixture.componentInstance.ctxProp = null;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).not.toContain('ng-reflect-');
        });
        it('should reflect empty strings', () => {
            testing_1.TestBed.configureTestingModule({
                declarations: [MyComp, MyDir, MyDir2],
                providers: [(0, core_1.provideNgReflectAttributes)()],
            });
            testing_1.TestBed.overrideComponent(MyComp, { set: { template: `<div my-dir [elprop]="ctxProp"></div>` } });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.componentInstance.ctxProp = '';
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toContain('ng-reflect-dir-prop=""');
        });
        it('should not reflect in comment nodes when the value changes to undefined', () => {
            const fixture = testing_1.TestBed.configureTestingModule({
                declarations: [MyComp],
                providers: [(0, core_1.provideNgReflectAttributes)()],
            })
                .overrideComponent(MyComp, {
                set: { template: `<ng-template [ngIf]="ctxBoolProp"></ng-template>` },
            })
                .createComponent(MyComp);
            fixture.componentInstance.ctxBoolProp = true;
            fixture.detectChanges();
            let html = fixture.nativeElement.innerHTML;
            (0, matchers_1.expect)(html).toContain('bindings={');
            (0, matchers_1.expect)(html).toContain('"ng-reflect-ng-if": "true"');
            fixture.componentInstance.ctxBoolProp = undefined;
            fixture.detectChanges();
            html = fixture.nativeElement.innerHTML;
            (0, matchers_1.expect)(html).toContain('bindings={');
            (0, matchers_1.expect)(html).not.toContain('ng-reflect');
        });
        it('should reflect in comment nodes when the value changes to null', () => {
            const fixture = testing_1.TestBed.configureTestingModule({
                declarations: [MyComp],
                providers: [(0, core_1.provideNgReflectAttributes)()],
            })
                .overrideComponent(MyComp, {
                set: { template: `<ng-template [ngIf]="ctxBoolProp"></ng-template>` },
            })
                .createComponent(MyComp);
            fixture.componentInstance.ctxBoolProp = true;
            fixture.detectChanges();
            let html = fixture.nativeElement.innerHTML;
            (0, matchers_1.expect)(html).toContain('bindings={');
            (0, matchers_1.expect)(html).toContain('"ng-reflect-ng-if": "true"');
            fixture.componentInstance.ctxBoolProp = null;
            fixture.detectChanges();
            html = fixture.nativeElement.innerHTML;
            (0, matchers_1.expect)(html).toContain('bindings={');
            (0, matchers_1.expect)(html).toContain('"ng-reflect-ng-if": null');
        });
    });
    describe('property decorators', () => {
        it('should support property decorators', () => {
            testing_1.TestBed.configureTestingModule({
                declarations: [MyComp, DirectiveWithPropDecorators],
                schemas: [core_1.NO_ERRORS_SCHEMA],
            });
            const template = '<with-prop-decorators elProp="aaa"></with-prop-decorators>';
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            const dir = fixture.debugElement.children[0].injector.get(DirectiveWithPropDecorators);
            (0, matchers_1.expect)(dir.dirProp).toEqual('aaa');
        });
        it('should support host binding decorators', () => {
            testing_1.TestBed.configureTestingModule({
                declarations: [MyComp, DirectiveWithPropDecorators],
                schemas: [core_1.NO_ERRORS_SCHEMA],
            });
            const template = '<with-prop-decorators></with-prop-decorators>';
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            const dir = fixture.debugElement.children[0].injector.get(DirectiveWithPropDecorators);
            dir.myAttr = 'aaa';
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.debugElement.children[0].nativeElement.outerHTML).toContain('my-attr="aaa"');
        });
        if ((0, common_1.ɵgetDOM)().supportsDOMEvents) {
            it('should support event decorators', (0, testing_1.fakeAsync)(() => {
                testing_1.TestBed.configureTestingModule({
                    declarations: [MyComp, DirectiveWithPropDecorators],
                    schemas: [core_1.NO_ERRORS_SCHEMA],
                });
                const template = `<with-prop-decorators (elEvent)="ctxProp='called'">`;
                testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
                const fixture = testing_1.TestBed.createComponent(MyComp);
                (0, testing_1.tick)();
                const emitter = fixture.debugElement.children[0].injector.get(DirectiveWithPropDecorators);
                emitter.fireEvent('fired !');
                (0, testing_1.tick)();
                (0, matchers_1.expect)(fixture.componentInstance.ctxProp).toEqual('called');
            }));
            it('should support host listener decorators', () => {
                testing_1.TestBed.configureTestingModule({
                    declarations: [MyComp, DirectiveWithPropDecorators],
                    schemas: [core_1.NO_ERRORS_SCHEMA],
                });
                const template = '<with-prop-decorators></with-prop-decorators>';
                testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
                const fixture = testing_1.TestBed.createComponent(MyComp);
                fixture.detectChanges();
                const dir = fixture.debugElement.children[0].injector.get(DirectiveWithPropDecorators);
                const native = fixture.debugElement.children[0].nativeElement;
                (0, common_1.ɵgetDOM)().dispatchEvent(native, (0, browser_util_1.createMouseEvent)('click'));
                (0, matchers_1.expect)(dir.target).toBe(native);
            });
        }
        it('should support defining views in the component decorator', () => {
            testing_1.TestBed.configureTestingModule({
                declarations: [MyComp, ComponentWithTemplate],
                imports: [common_1.CommonModule],
                schemas: [core_1.NO_ERRORS_SCHEMA],
            });
            const template = '<component-with-template></component-with-template>';
            testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            const native = fixture.debugElement.children[0].nativeElement;
            (0, matchers_1.expect)(native).toHaveText('No View Decorator: 123');
        });
    });
    describe('whitespaces in templates', () => {
        it('should not remove whitespaces by default', (0, testing_1.waitForAsync)(() => {
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'comp',
                        template: '<span>foo</span>  <span>bar</span>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            const f = testing_1.TestBed.configureTestingModule({ declarations: [MyCmp] }).createComponent(MyCmp);
            f.detectChanges();
            (0, matchers_1.expect)(f.nativeElement.childNodes.length).toBe(2);
        }));
        it('should not remove whitespaces when explicitly requested not to do so', (0, testing_1.waitForAsync)(() => {
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'comp',
                        template: '<span>foo</span>  <span>bar</span>',
                        preserveWhitespaces: true,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            const f = testing_1.TestBed.configureTestingModule({ declarations: [MyCmp] }).createComponent(MyCmp);
            f.detectChanges();
            (0, matchers_1.expect)(f.nativeElement.childNodes.length).toBe(3);
        }));
        it('should remove whitespaces when explicitly requested to do so', (0, testing_1.waitForAsync)(() => {
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'comp',
                        template: '<span>foo</span>  <span>bar</span>',
                        preserveWhitespaces: false,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            const f = testing_1.TestBed.configureTestingModule({ declarations: [MyCmp] }).createComponent(MyCmp);
            f.detectChanges();
            (0, matchers_1.expect)(f.nativeElement.childNodes.length).toBe(2);
        }));
    });
    describe('orphan components', () => {
        it('should display correct error message for orphan component if forbidOrphanRendering option is set', () => {
            let MainComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '...',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MainComp = _classThis = class {
                };
                __setFunctionName(_classThis, "MainComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MainComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MainComp = _classThis;
            })();
            (0, core_1.ɵsetClassDebugInfo)(MainComp, {
                className: 'MainComp',
                filePath: 'test.ts',
                lineNumber: 11,
                forbidOrphanRendering: true,
            });
            testing_1.TestBed.configureTestingModule({ declarations: [MainComp] });
            (0, matchers_1.expect)(() => testing_1.TestBed.createComponent(MainComp)).toThrowError(/^NG0981: Orphan component found\! Trying to render the component MainComp \(at test\.ts:11\) without first loading the NgModule that declares it/);
        });
        it('should not throw error for orphan component if forbidOrphanRendering option is not set', () => {
            let MainComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '...',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MainComp = _classThis = class {
                };
                __setFunctionName(_classThis, "MainComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MainComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MainComp = _classThis;
            })();
            (0, core_1.ɵsetClassDebugInfo)(MainComp, {
                className: 'MainComp',
                filePath: 'test.ts',
                lineNumber: 11,
            });
            testing_1.TestBed.configureTestingModule({ declarations: [MainComp] });
            (0, matchers_1.expect)(() => testing_1.TestBed.createComponent(MainComp)).not.toThrow();
        });
    });
    if ((0, common_1.ɵgetDOM)().supportsDOMEvents) {
        describe('svg', () => {
            it('should support svg elements', () => {
                testing_1.TestBed.configureTestingModule({ declarations: [MyComp] });
                const template = '<svg><use xlink:href="Port" /></svg>';
                testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
                const fixture = testing_1.TestBed.createComponent(MyComp);
                const el = fixture.nativeElement;
                const svg = el.childNodes[0];
                const use = svg.childNodes[0];
                (0, matchers_1.expect)(svg.namespaceURI).toEqual('http://www.w3.org/2000/svg');
                (0, matchers_1.expect)(use.namespaceURI).toEqual('http://www.w3.org/2000/svg');
                const firstAttribute = use.attributes[0];
                (0, matchers_1.expect)(firstAttribute.name).toEqual('xlink:href');
                (0, matchers_1.expect)(firstAttribute.namespaceURI).toEqual('http://www.w3.org/1999/xlink');
            });
            it('should support foreignObjects with document fragments', () => {
                testing_1.TestBed.configureTestingModule({ declarations: [MyComp] });
                const template = '<svg><foreignObject><xhtml:div><p>Test</p></xhtml:div></foreignObject></svg>';
                testing_1.TestBed.overrideComponent(MyComp, { set: { template } });
                const fixture = testing_1.TestBed.createComponent(MyComp);
                const el = fixture.nativeElement;
                const svg = el.childNodes[0];
                const foreignObject = svg.childNodes[0];
                const p = foreignObject.childNodes[0];
                (0, matchers_1.expect)(svg.namespaceURI).toEqual('http://www.w3.org/2000/svg');
                (0, matchers_1.expect)(foreignObject.namespaceURI).toEqual('http://www.w3.org/2000/svg');
                (0, matchers_1.expect)(p.namespaceURI).toEqual('http://www.w3.org/1999/xhtml');
            });
        });
        describe('attributes', () => {
            it('should support attributes with namespace', () => {
                testing_1.TestBed.configureTestingModule({ declarations: [MyComp, SomeCmp] });
                const template = '<svg:use xlink:href="#id" />';
                testing_1.TestBed.overrideComponent(SomeCmp, { set: { template } });
                const fixture = testing_1.TestBed.createComponent(SomeCmp);
                const useEl = fixture.nativeElement.firstChild;
                (0, matchers_1.expect)(useEl.getAttributeNS('http://www.w3.org/1999/xlink', 'href')).toEqual('#id');
            });
            it('should support binding to attributes with namespace', () => {
                testing_1.TestBed.configureTestingModule({ declarations: [MyComp, SomeCmp] });
                const template = '<svg:use [attr.xlink:href]="value" />';
                testing_1.TestBed.overrideComponent(SomeCmp, { set: { template } });
                const fixture = testing_1.TestBed.createComponent(SomeCmp);
                const cmp = fixture.componentInstance;
                const useEl = fixture.nativeElement.firstChild;
                cmp.value = '#id';
                fixture.detectChanges();
                (0, matchers_1.expect)(useEl.getAttributeNS('http://www.w3.org/1999/xlink', 'href')).toEqual('#id');
                cmp.value = null;
                fixture.detectChanges();
                (0, matchers_1.expect)(useEl.hasAttributeNS('http://www.w3.org/1999/xlink', 'href')).toEqual(false);
            });
        });
    }
});
let ComponentWithDefaultInterpolation = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'cmp-with-default-interpolation',
            template: `{{text}}`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ComponentWithDefaultInterpolation = _classThis = class {
        constructor() {
            this.text = 'Default Interpolation';
        }
    };
    __setFunctionName(_classThis, "ComponentWithDefaultInterpolation");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ComponentWithDefaultInterpolation = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ComponentWithDefaultInterpolation = _classThis;
})();
let ComponentWithCustomInterpolationA = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'cmp-with-custom-interpolation-a',
            template: `<div>{%text%}</div>`,
            interpolation: ['{%', '%}'],
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ComponentWithCustomInterpolationA = _classThis = class {
        constructor() {
            this.text = 'Custom Interpolation A';
        }
    };
    __setFunctionName(_classThis, "ComponentWithCustomInterpolationA");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ComponentWithCustomInterpolationA = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ComponentWithCustomInterpolationA = _classThis;
})();
let ComponentWithCustomInterpolationB = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'cmp-with-custom-interpolation-b',
            template: `<div>{**text%}</div> (<cmp-with-default-interpolation></cmp-with-default-interpolation>)`,
            interpolation: ['{**', '%}'],
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ComponentWithCustomInterpolationB = _classThis = class {
        constructor() {
            this.text = 'Custom Interpolation B';
        }
    };
    __setFunctionName(_classThis, "ComponentWithCustomInterpolationB");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ComponentWithCustomInterpolationB = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ComponentWithCustomInterpolationB = _classThis;
})();
let MyService = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MyService = _classThis = class {
        constructor() {
            this.greeting = 'hello';
        }
    };
    __setFunctionName(_classThis, "MyService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MyService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MyService = _classThis;
})();
let SimpleImperativeViewComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'simple-imp-cmp',
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SimpleImperativeViewComponent = _classThis = class {
        constructor(self) {
            const hostElement = self.nativeElement;
            hostElement.appendChild((0, browser_util_1.el)('hello imp view'));
        }
    };
    __setFunctionName(_classThis, "SimpleImperativeViewComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SimpleImperativeViewComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SimpleImperativeViewComponent = _classThis;
})();
let DynamicViewport = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: 'dynamic-vp',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DynamicViewport = _classThis = class {
        constructor(vc) {
            this.vc = vc;
            const myService = new MyService();
            myService.greeting = 'dynamic greet';
            this.injector = core_1.Injector.create({
                providers: [{ provide: MyService, useValue: myService }],
                parent: vc.injector,
            });
        }
        create() {
            return this.vc.createComponent(ChildCompUsingService, {
                index: this.vc.length,
                injector: this.injector,
            });
        }
        insert(viewRef, index) {
            return this.vc.insert(viewRef, index);
        }
        move(viewRef, currentIndex) {
            return this.vc.move(viewRef, currentIndex);
        }
    };
    __setFunctionName(_classThis, "DynamicViewport");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DynamicViewport = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DynamicViewport = _classThis;
})();
let MyDir = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[my-dir]',
            inputs: ['dirProp: elprop'],
            exportAs: 'mydir',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MyDir = _classThis = class {
        constructor() {
            this.dirProp = '';
        }
    };
    __setFunctionName(_classThis, "MyDir");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MyDir = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MyDir = _classThis;
})();
let MyDir2 = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[my-dir2]',
            inputs: ['dirProp2: elprop'],
            exportAs: 'mydir2',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MyDir2 = _classThis = class {
        constructor() {
            this.dirProp2 = '';
        }
    };
    __setFunctionName(_classThis, "MyDir2");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MyDir2 = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MyDir2 = _classThis;
})();
let DirectiveWithTitle = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[title]',
            inputs: ['title'],
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DirectiveWithTitle = _classThis = class {
    };
    __setFunctionName(_classThis, "DirectiveWithTitle");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DirectiveWithTitle = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DirectiveWithTitle = _classThis;
})();
let DirectiveWithTitleAndHostProperty = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[title]',
            inputs: ['title'],
            host: { '[title]': 'title' },
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DirectiveWithTitleAndHostProperty = _classThis = class {
    };
    __setFunctionName(_classThis, "DirectiveWithTitleAndHostProperty");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DirectiveWithTitleAndHostProperty = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DirectiveWithTitleAndHostProperty = _classThis;
})();
let EventCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'event-cmp',
            template: '<div (click)="noop()"></div>',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var EventCmp = _classThis = class {
        noop() { }
    };
    __setFunctionName(_classThis, "EventCmp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        EventCmp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return EventCmp = _classThis;
})();
let PushCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'push-cmp',
            inputs: ['prop'],
            host: { '(click)': 'true' },
            changeDetection: change_detection_1.ChangeDetectionStrategy.OnPush,
            template: '{{field}}<div (click)="noop()"></div><div *ngIf="true" (click)="noop()"></div><event-cmp></event-cmp>',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var PushCmp = _classThis = class {
        constructor() {
            this.numberOfChecks = 0;
        }
        noop() { }
        get field() {
            this.numberOfChecks++;
            return 'fixed';
        }
    };
    __setFunctionName(_classThis, "PushCmp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PushCmp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PushCmp = _classThis;
})();
let PushCmpWithRef = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'push-cmp-with-ref',
            inputs: ['prop'],
            changeDetection: change_detection_1.ChangeDetectionStrategy.OnPush,
            template: '{{field}}',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var PushCmpWithRef = _classThis = class {
        constructor(ref) {
            this.numberOfChecks = 0;
            this.ref = ref;
        }
        get field() {
            this.numberOfChecks++;
            return 'fixed';
        }
        propagate() {
            this.ref.markForCheck();
        }
    };
    __setFunctionName(_classThis, "PushCmpWithRef");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PushCmpWithRef = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PushCmpWithRef = _classThis;
})();
let PushCmpWithHostEvent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'push-cmp-with-host-event',
            host: { '(click)': 'ctxCallback($event)' },
            changeDetection: change_detection_1.ChangeDetectionStrategy.OnPush,
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var PushCmpWithHostEvent = _classThis = class {
        constructor() {
            this.ctxCallback = (_) => { };
        }
    };
    __setFunctionName(_classThis, "PushCmpWithHostEvent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PushCmpWithHostEvent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PushCmpWithHostEvent = _classThis;
})();
let PushCmpWithAsyncPipe = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'push-cmp-with-async',
            changeDetection: change_detection_1.ChangeDetectionStrategy.OnPush,
            template: '{{field | async}}',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var PushCmpWithAsyncPipe = _classThis = class {
        constructor() {
            this.numberOfChecks = 0;
            this.promise = new Promise((resolve) => {
                this.resolve = resolve;
            });
        }
        get field() {
            this.numberOfChecks++;
            return this.promise;
        }
    };
    __setFunctionName(_classThis, "PushCmpWithAsyncPipe");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PushCmpWithAsyncPipe = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PushCmpWithAsyncPipe = _classThis;
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
            this.toStringThrow = {
                toString: function () {
                    throw 'boom';
                },
            };
            this.ctxProp = 'initial value';
            this.ctxNumProp = 0;
            this.ctxBoolProp = false;
            this.ctxArrProp = [0, 1, 2];
        }
        throwError() {
            throw 'boom';
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
let ChildComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'child-cmp',
            inputs: ['dirProp'],
            viewProviders: [MyService],
            template: '{{ctxProp}}',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ChildComp = _classThis = class {
        constructor(service) {
            this.ctxProp = service.greeting;
            this.dirProp = null;
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
let ChildCompNoTemplate = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'child-cmp-no-template',
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ChildCompNoTemplate = _classThis = class {
        constructor() {
            this.ctxProp = 'hello';
        }
    };
    __setFunctionName(_classThis, "ChildCompNoTemplate");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ChildCompNoTemplate = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ChildCompNoTemplate = _classThis;
})();
let ChildCompUsingService = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'child-cmp-svc',
            template: '{{ctxProp}}',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ChildCompUsingService = _classThis = class {
        constructor(service) {
            this.ctxProp = service.greeting;
        }
    };
    __setFunctionName(_classThis, "ChildCompUsingService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ChildCompUsingService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ChildCompUsingService = _classThis;
})();
let SomeDirective = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: 'some-directive',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SomeDirective = _classThis = class {
    };
    __setFunctionName(_classThis, "SomeDirective");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SomeDirective = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SomeDirective = _classThis;
})();
class SomeDirectiveMissingAnnotation {
}
let CompWithHost = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'cmp-with-host',
            template: '<p>Component with an injected host</p>',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CompWithHost = _classThis = class {
        constructor(someComp) {
            this.myHost = someComp;
        }
    };
    __setFunctionName(_classThis, "CompWithHost");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CompWithHost = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CompWithHost = _classThis;
})();
let ChildComp2 = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: '[child-cmp2]',
            viewProviders: [MyService],
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ChildComp2 = _classThis = class {
        constructor(service) {
            this.ctxProp = service.greeting;
            this.dirProp = null;
        }
    };
    __setFunctionName(_classThis, "ChildComp2");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ChildComp2 = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ChildComp2 = _classThis;
})();
class SomeViewportContext {
    constructor(someTmpl) {
        this.someTmpl = someTmpl;
    }
}
let SomeViewport = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[some-viewport]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SomeViewport = _classThis = class {
        constructor(container, templateRef) {
            this.container = container;
            container.createEmbeddedView(templateRef, new SomeViewportContext('hello'));
            container.createEmbeddedView(templateRef, new SomeViewportContext('again'));
        }
    };
    __setFunctionName(_classThis, "SomeViewport");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SomeViewport = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SomeViewport = _classThis;
})();
let PollutedContext = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[pollutedContext]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var PollutedContext = _classThis = class {
        constructor(tplRef, vcRef) {
            this.tplRef = tplRef;
            this.vcRef = vcRef;
            const evRef = this.vcRef.createEmbeddedView(this.tplRef);
            evRef.context.bar = 'baz';
        }
    };
    __setFunctionName(_classThis, "PollutedContext");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PollutedContext = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PollutedContext = _classThis;
})();
let NoContext = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[noContext]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NoContext = _classThis = class {
        constructor(tplRef, vcRef) {
            this.tplRef = tplRef;
            this.vcRef = vcRef;
            this.vcRef.createEmbeddedView(this.tplRef);
        }
    };
    __setFunctionName(_classThis, "NoContext");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NoContext = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NoContext = _classThis;
})();
let DoublePipe = (() => {
    let _classDecorators = [(0, core_1.Pipe)({
            name: 'double',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DoublePipe = _classThis = class {
        ngOnDestroy() { }
        transform(value) {
            return `${value}${value}`;
        }
    };
    __setFunctionName(_classThis, "DoublePipe");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DoublePipe = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DoublePipe = _classThis;
})();
let DirectiveEmittingEvent = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[emitter]',
            outputs: ['event'],
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DirectiveEmittingEvent = _classThis = class {
        constructor() {
            this.msg = '';
            this.event = new core_1.EventEmitter();
        }
        fireEvent(msg) {
            this.event.emit(msg);
        }
    };
    __setFunctionName(_classThis, "DirectiveEmittingEvent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DirectiveEmittingEvent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DirectiveEmittingEvent = _classThis;
})();
let DirectiveUpdatingHostAttributes = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[update-host-attributes]',
            host: { 'role': 'button' },
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DirectiveUpdatingHostAttributes = _classThis = class {
    };
    __setFunctionName(_classThis, "DirectiveUpdatingHostAttributes");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DirectiveUpdatingHostAttributes = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DirectiveUpdatingHostAttributes = _classThis;
})();
let DirectiveUpdatingHostProperties = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[update-host-properties]',
            host: { '[id]': 'id' },
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DirectiveUpdatingHostProperties = _classThis = class {
        constructor() {
            this.id = 'one';
        }
    };
    __setFunctionName(_classThis, "DirectiveUpdatingHostProperties");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DirectiveUpdatingHostProperties = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DirectiveUpdatingHostProperties = _classThis;
})();
let DirectiveListeningEvent = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[listener]',
            host: { '(event)': 'onEvent($event)' },
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DirectiveListeningEvent = _classThis = class {
        constructor() {
            this.msg = '';
        }
        onEvent(msg) {
            this.msg = msg;
        }
    };
    __setFunctionName(_classThis, "DirectiveListeningEvent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DirectiveListeningEvent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DirectiveListeningEvent = _classThis;
})();
let DirectiveListeningDomEvent = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[listener]',
            host: {
                '(domEvent)': 'onEvent($event.type)',
                '(window:domEvent)': 'onWindowEvent($event.type)',
                '(document:domEvent)': 'onDocumentEvent($event.type)',
                '(body:domEvent)': 'onBodyEvent($event.type)',
            },
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DirectiveListeningDomEvent = _classThis = class {
        constructor() {
            this.eventTypes = [];
        }
        onEvent(eventType) {
            this.eventTypes.push(eventType);
        }
        onWindowEvent(eventType) {
            this.eventTypes.push('window_' + eventType);
        }
        onDocumentEvent(eventType) {
            this.eventTypes.push('document_' + eventType);
        }
        onBodyEvent(eventType) {
            this.eventTypes.push('body_' + eventType);
        }
    };
    __setFunctionName(_classThis, "DirectiveListeningDomEvent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DirectiveListeningDomEvent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DirectiveListeningDomEvent = _classThis;
})();
let globalCounter = 0;
let DirectiveListeningDomEventOther = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[listenerother]',
            host: { '(window:domEvent)': 'onEvent($event.type)' },
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DirectiveListeningDomEventOther = _classThis = class {
        constructor() {
            this.eventType = '';
        }
        onEvent(eventType) {
            globalCounter++;
            this.eventType = 'other_' + eventType;
        }
    };
    __setFunctionName(_classThis, "DirectiveListeningDomEventOther");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DirectiveListeningDomEventOther = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DirectiveListeningDomEventOther = _classThis;
})();
let DirectiveListeningDomEventPrevent = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[listenerprevent]',
            host: { '(click)': 'onEvent($event)' },
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DirectiveListeningDomEventPrevent = _classThis = class {
        onEvent(event) {
            return false;
        }
    };
    __setFunctionName(_classThis, "DirectiveListeningDomEventPrevent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DirectiveListeningDomEventPrevent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DirectiveListeningDomEventPrevent = _classThis;
})();
let DirectiveListeningDomEventNoPrevent = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[listenernoprevent]',
            host: { '(click)': 'onEvent($event)' },
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DirectiveListeningDomEventNoPrevent = _classThis = class {
        onEvent(event) {
            return true;
        }
    };
    __setFunctionName(_classThis, "DirectiveListeningDomEventNoPrevent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DirectiveListeningDomEventNoPrevent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DirectiveListeningDomEventNoPrevent = _classThis;
})();
let IdDir = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[id]',
            inputs: ['id'],
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var IdDir = _classThis = class {
    };
    __setFunctionName(_classThis, "IdDir");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        IdDir = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return IdDir = _classThis;
})();
let EventDir = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[customEvent]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _customEvent_decorators;
    let _customEvent_initializers = [];
    let _customEvent_extraInitializers = [];
    var EventDir = _classThis = class {
        doSomething() { }
        constructor() {
            this.customEvent = __runInitializers(this, _customEvent_initializers, new core_1.EventEmitter());
            __runInitializers(this, _customEvent_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "EventDir");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _customEvent_decorators = [(0, core_1.Output)()];
        __esDecorate(null, null, _customEvent_decorators, { kind: "field", name: "customEvent", static: false, private: false, access: { has: obj => "customEvent" in obj, get: obj => obj.customEvent, set: (obj, value) => { obj.customEvent = value; } }, metadata: _metadata }, _customEvent_initializers, _customEvent_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        EventDir = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return EventDir = _classThis;
})();
let NeedsAttribute = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[static]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NeedsAttribute = _classThis = class {
        constructor(typeAttribute, staticAttribute, fooAttribute) {
            this.typeAttribute = typeAttribute;
            this.staticAttribute = staticAttribute;
            this.fooAttribute = fooAttribute;
        }
    };
    __setFunctionName(_classThis, "NeedsAttribute");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NeedsAttribute = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NeedsAttribute = _classThis;
})();
let PublicApi = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var PublicApi = _classThis = class {
    };
    __setFunctionName(_classThis, "PublicApi");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PublicApi = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PublicApi = _classThis;
})();
let PrivateImpl = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[public-api]',
            providers: [{ provide: PublicApi, useExisting: PrivateImpl, deps: [] }],
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = PublicApi;
    var PrivateImpl = _classThis = class extends _classSuper {
    };
    __setFunctionName(_classThis, "PrivateImpl");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PrivateImpl = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PrivateImpl = _classThis;
})();
let NeedsPublicApi = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[needs-public-api]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NeedsPublicApi = _classThis = class {
        constructor(api) {
            (0, matchers_1.expect)(api instanceof PrivateImpl).toBe(true);
        }
    };
    __setFunctionName(_classThis, "NeedsPublicApi");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NeedsPublicApi = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NeedsPublicApi = _classThis;
})();
class ToolbarContext {
    constructor(toolbarProp) {
        this.toolbarProp = toolbarProp;
    }
}
let ToolbarPart = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[toolbarpart]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ToolbarPart = _classThis = class {
        constructor(templateRef) {
            this.templateRef = templateRef;
        }
    };
    __setFunctionName(_classThis, "ToolbarPart");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ToolbarPart = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ToolbarPart = _classThis;
})();
let ToolbarViewContainer = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[toolbarVc]',
            inputs: ['toolbarVc'],
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ToolbarViewContainer = _classThis = class {
        constructor(vc) {
            this.vc = vc;
        }
        set toolbarVc(part) {
            this.vc.createEmbeddedView(part.templateRef, new ToolbarContext('From toolbar'), 0);
        }
    };
    __setFunctionName(_classThis, "ToolbarViewContainer");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ToolbarViewContainer = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ToolbarViewContainer = _classThis;
})();
let ToolbarComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'toolbar',
            template: 'TOOLBAR(<div *ngFor="let  part of query" [toolbarVc]="part"></div>)',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _query_decorators;
    let _query_initializers = [];
    let _query_extraInitializers = [];
    var ToolbarComponent = _classThis = class {
        constructor() {
            this.query = __runInitializers(this, _query_initializers, void 0);
            this.ctxProp = (__runInitializers(this, _query_extraInitializers), 'hello world');
        }
    };
    __setFunctionName(_classThis, "ToolbarComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _query_decorators = [(0, core_1.ContentChildren)(ToolbarPart)];
        __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ToolbarComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ToolbarComponent = _classThis;
})();
let DirectiveWithTwoWayBinding = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[two-way]',
            inputs: ['control'],
            outputs: ['controlChange'],
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DirectiveWithTwoWayBinding = _classThis = class {
        constructor() {
            this.controlChange = new core_1.EventEmitter();
            this.control = null;
        }
        triggerChange(value) {
            this.controlChange.emit(value);
        }
    };
    __setFunctionName(_classThis, "DirectiveWithTwoWayBinding");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DirectiveWithTwoWayBinding = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DirectiveWithTwoWayBinding = _classThis;
})();
let InjectableService = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var InjectableService = _classThis = class {
    };
    __setFunctionName(_classThis, "InjectableService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        InjectableService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return InjectableService = _classThis;
})();
function createInjectableWithLogging(inj) {
    inj.get(ComponentProvidingLoggingInjectable).created = true;
    return new InjectableService();
}
let ComponentProvidingLoggingInjectable = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'component-providing-logging-injectable',
            providers: [
                { provide: InjectableService, useFactory: createInjectableWithLogging, deps: [core_1.Injector] },
            ],
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ComponentProvidingLoggingInjectable = _classThis = class {
        constructor() {
            this.created = false;
        }
    };
    __setFunctionName(_classThis, "ComponentProvidingLoggingInjectable");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ComponentProvidingLoggingInjectable = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ComponentProvidingLoggingInjectable = _classThis;
})();
let DirectiveProvidingInjectable = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: 'directive-providing-injectable',
            providers: [[InjectableService]],
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DirectiveProvidingInjectable = _classThis = class {
    };
    __setFunctionName(_classThis, "DirectiveProvidingInjectable");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DirectiveProvidingInjectable = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DirectiveProvidingInjectable = _classThis;
})();
let DirectiveProvidingInjectableInView = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'directive-providing-injectable',
            viewProviders: [[InjectableService]],
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DirectiveProvidingInjectableInView = _classThis = class {
    };
    __setFunctionName(_classThis, "DirectiveProvidingInjectableInView");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DirectiveProvidingInjectableInView = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DirectiveProvidingInjectableInView = _classThis;
})();
let DirectiveProvidingInjectableInHostAndView = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'directive-providing-injectable',
            providers: [{ provide: InjectableService, useValue: 'host' }],
            viewProviders: [{ provide: InjectableService, useValue: 'view' }],
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DirectiveProvidingInjectableInHostAndView = _classThis = class {
    };
    __setFunctionName(_classThis, "DirectiveProvidingInjectableInHostAndView");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DirectiveProvidingInjectableInHostAndView = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DirectiveProvidingInjectableInHostAndView = _classThis;
})();
let DirectiveConsumingInjectable = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'directive-consuming-injectable',
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DirectiveConsumingInjectable = _classThis = class {
        constructor(injectable) {
            this.injectable = injectable;
        }
    };
    __setFunctionName(_classThis, "DirectiveConsumingInjectable");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DirectiveConsumingInjectable = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DirectiveConsumingInjectable = _classThis;
})();
let DirectiveContainingDirectiveConsumingAnInjectable = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'directive-containing-directive-consuming-an-injectable',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DirectiveContainingDirectiveConsumingAnInjectable = _classThis = class {
    };
    __setFunctionName(_classThis, "DirectiveContainingDirectiveConsumingAnInjectable");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DirectiveContainingDirectiveConsumingAnInjectable = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DirectiveContainingDirectiveConsumingAnInjectable = _classThis;
})();
let DirectiveConsumingInjectableUnbounded = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'directive-consuming-injectable-unbounded',
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DirectiveConsumingInjectableUnbounded = _classThis = class {
        constructor(injectable, parent) {
            this.injectable = injectable;
            parent.directive = this;
        }
    };
    __setFunctionName(_classThis, "DirectiveConsumingInjectableUnbounded");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DirectiveConsumingInjectableUnbounded = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DirectiveConsumingInjectableUnbounded = _classThis;
})();
class EventBus {
    constructor(parentEventBus, name) {
        this.parentEventBus = parentEventBus;
        this.name = name;
    }
}
let GrandParentProvidingEventBus = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: 'grand-parent-providing-event-bus',
            providers: [{ provide: EventBus, useValue: new EventBus(null, 'grandparent') }],
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var GrandParentProvidingEventBus = _classThis = class {
        constructor(bus) {
            this.bus = bus;
        }
    };
    __setFunctionName(_classThis, "GrandParentProvidingEventBus");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        GrandParentProvidingEventBus = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return GrandParentProvidingEventBus = _classThis;
})();
function createParentBus(peb) {
    return new EventBus(peb, 'parent');
}
let ParentProvidingEventBus = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'parent-providing-event-bus',
            providers: [{ provide: EventBus, useFactory: createParentBus, deps: [[EventBus, new core_1.SkipSelf()]] }],
            template: `<child-consuming-event-bus></child-consuming-event-bus>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ParentProvidingEventBus = _classThis = class {
        constructor(bus, grandParentBus) {
            this.bus = bus;
            this.grandParentBus = grandParentBus;
        }
    };
    __setFunctionName(_classThis, "ParentProvidingEventBus");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ParentProvidingEventBus = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ParentProvidingEventBus = _classThis;
})();
let ChildConsumingEventBus = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: 'child-consuming-event-bus',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ChildConsumingEventBus = _classThis = class {
        constructor(bus) {
            this.bus = bus;
        }
    };
    __setFunctionName(_classThis, "ChildConsumingEventBus");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ChildConsumingEventBus = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ChildConsumingEventBus = _classThis;
})();
let SomeImperativeViewport = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[someImpvp]',
            inputs: ['someImpvp'],
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SomeImperativeViewport = _classThis = class {
        constructor(vc, templateRef, anchor) {
            this.vc = vc;
            this.templateRef = templateRef;
            this.view = null;
            this.anchor = anchor;
        }
        set someImpvp(value) {
            if (this.view) {
                this.vc.clear();
                this.view = null;
            }
            if (value) {
                this.view = this.vc.createEmbeddedView(this.templateRef);
                const nodes = this.view.rootNodes;
                for (let i = 0; i < nodes.length; i++) {
                    this.anchor.appendChild(nodes[i]);
                }
            }
        }
    };
    __setFunctionName(_classThis, "SomeImperativeViewport");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SomeImperativeViewport = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SomeImperativeViewport = _classThis;
})();
let ExportDir = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[export-dir]',
            exportAs: 'dir',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ExportDir = _classThis = class {
    };
    __setFunctionName(_classThis, "ExportDir");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ExportDir = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ExportDir = _classThis;
})();
let DirectiveWithMultipleExportAsNames = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[multiple-export-as]',
            exportAs: 'dirX, dirY',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DirectiveWithMultipleExportAsNames = _classThis = class {
    };
    __setFunctionName(_classThis, "DirectiveWithMultipleExportAsNames");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DirectiveWithMultipleExportAsNames = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DirectiveWithMultipleExportAsNames = _classThis;
})();
exports.DirectiveWithMultipleExportAsNames = DirectiveWithMultipleExportAsNames;
let ComponentWithoutView = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'comp',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ComponentWithoutView = _classThis = class {
    };
    __setFunctionName(_classThis, "ComponentWithoutView");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ComponentWithoutView = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ComponentWithoutView = _classThis;
})();
let DuplicateDir = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[no-duplicate]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DuplicateDir = _classThis = class {
        constructor(elRef) {
            elRef.nativeElement.textContent += 'noduplicate';
        }
    };
    __setFunctionName(_classThis, "DuplicateDir");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DuplicateDir = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DuplicateDir = _classThis;
})();
let OtherDuplicateDir = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[no-duplicate]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var OtherDuplicateDir = _classThis = class {
        constructor(elRef) {
            elRef.nativeElement.textContent += 'othernoduplicate';
        }
    };
    __setFunctionName(_classThis, "OtherDuplicateDir");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OtherDuplicateDir = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OtherDuplicateDir = _classThis;
})();
let DirectiveThrowingAnError = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: 'directive-throwing-error',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DirectiveThrowingAnError = _classThis = class {
        constructor() {
            throw new Error('BOOM');
        }
    };
    __setFunctionName(_classThis, "DirectiveThrowingAnError");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DirectiveThrowingAnError = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DirectiveThrowingAnError = _classThis;
})();
let ComponentWithTemplate = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'component-with-template',
            template: `No View Decorator: <div *ngFor="let item of items">{{item}}</div>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ComponentWithTemplate = _classThis = class {
        constructor() {
            this.items = [1, 2, 3];
        }
    };
    __setFunctionName(_classThis, "ComponentWithTemplate");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ComponentWithTemplate = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ComponentWithTemplate = _classThis;
})();
let DirectiveWithPropDecorators = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: 'with-prop-decorators',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _dirProp_decorators;
    let _dirProp_initializers = [];
    let _dirProp_extraInitializers = [];
    let _event_decorators;
    let _event_initializers = [];
    let _event_extraInitializers = [];
    let _myAttr_decorators;
    let _myAttr_initializers = [];
    let _myAttr_extraInitializers = [];
    let _onClick_decorators;
    var DirectiveWithPropDecorators = _classThis = class {
        onClick(target) {
            this.target = target;
        }
        fireEvent(msg) {
            this.event.emit(msg);
        }
        constructor() {
            this.target = __runInitializers(this, _instanceExtraInitializers);
            this.dirProp = __runInitializers(this, _dirProp_initializers, void 0);
            this.event = (__runInitializers(this, _dirProp_extraInitializers), __runInitializers(this, _event_initializers, new core_1.EventEmitter()));
            this.myAttr = (__runInitializers(this, _event_extraInitializers), __runInitializers(this, _myAttr_initializers, void 0));
            __runInitializers(this, _myAttr_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "DirectiveWithPropDecorators");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _dirProp_decorators = [(0, core_1.Input)('elProp')];
        _event_decorators = [(0, core_1.Output)('elEvent')];
        _myAttr_decorators = [(0, core_1.HostBinding)('attr.my-attr')];
        _onClick_decorators = [(0, core_1.HostListener)('click', ['$event.target'])];
        __esDecorate(_classThis, null, _onClick_decorators, { kind: "method", name: "onClick", static: false, private: false, access: { has: obj => "onClick" in obj, get: obj => obj.onClick }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _dirProp_decorators, { kind: "field", name: "dirProp", static: false, private: false, access: { has: obj => "dirProp" in obj, get: obj => obj.dirProp, set: (obj, value) => { obj.dirProp = value; } }, metadata: _metadata }, _dirProp_initializers, _dirProp_extraInitializers);
        __esDecorate(null, null, _event_decorators, { kind: "field", name: "event", static: false, private: false, access: { has: obj => "event" in obj, get: obj => obj.event, set: (obj, value) => { obj.event = value; } }, metadata: _metadata }, _event_initializers, _event_extraInitializers);
        __esDecorate(null, null, _myAttr_decorators, { kind: "field", name: "myAttr", static: false, private: false, access: { has: obj => "myAttr" in obj, get: obj => obj.myAttr, set: (obj, value) => { obj.myAttr = value; } }, metadata: _metadata }, _myAttr_initializers, _myAttr_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DirectiveWithPropDecorators = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DirectiveWithPropDecorators = _classThis;
})();
let SomeCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'some-cmp',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SomeCmp = _classThis = class {
    };
    __setFunctionName(_classThis, "SomeCmp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SomeCmp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SomeCmp = _classThis;
})();
let ParentCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'parent-cmp',
            template: `<cmp [test$]="name"></cmp>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ParentCmp = _classThis = class {
        constructor() {
            this.name = 'hello';
        }
    };
    __setFunctionName(_classThis, "ParentCmp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ParentCmp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ParentCmp = _classThis;
})();
exports.ParentCmp = ParentCmp;
let SomeCmpWithInput = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'cmp',
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _test$_decorators;
    let _test$_initializers = [];
    let _test$_extraInitializers = [];
    var SomeCmpWithInput = _classThis = class {
        constructor() {
            this.test$ = __runInitializers(this, _test$_initializers, void 0);
            __runInitializers(this, _test$_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "SomeCmpWithInput");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _test$_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _test$_decorators, { kind: "field", name: "test$", static: false, private: false, access: { has: obj => "test$" in obj, get: obj => obj.test$, set: (obj, value) => { obj.test$ = value; } }, metadata: _metadata }, _test$_initializers, _test$_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SomeCmpWithInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SomeCmpWithInput = _classThis;
})();
function isPrevented(evt) {
    return evt.defaultPrevented || (evt.returnValue != null && !evt.returnValue);
}
