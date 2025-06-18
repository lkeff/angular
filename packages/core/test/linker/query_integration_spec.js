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
const matchers_1 = require("@angular/platform-browser/testing/src/matchers");
const stringify_1 = require("../../src/util/stringify");
describe('Query API', () => {
    beforeEach(() => testing_1.TestBed.configureTestingModule({
        declarations: [
            MyComp0,
            NeedsQuery,
            NeedsQueryDesc,
            NeedsQueryByLabel,
            NeedsQueryByTwoLabels,
            NeedsQueryAndProject,
            NeedsViewQuery,
            NeedsViewQueryIf,
            NeedsViewQueryNestedIf,
            NeedsViewQueryOrder,
            NeedsViewQueryByLabel,
            NeedsViewQueryOrderWithParent,
            NeedsContentChildren,
            NeedsViewChildren,
            NeedsViewChild,
            NeedsStaticContentAndViewChild,
            NeedsContentChild,
            DirectiveNeedsContentChild,
            NeedsTpl,
            NeedsNamedTpl,
            TextDirective,
            InertDirective,
            NeedsFourQueries,
            NeedsContentChildrenWithRead,
            NeedsContentChildWithRead,
            NeedsViewChildrenWithRead,
            NeedsViewChildWithRead,
            NeedsContentChildrenShallow,
            NeedsContentChildTemplateRef,
            NeedsContentChildTemplateRefApp,
            NeedsViewContainerWithRead,
            ManualProjecting,
        ],
    }));
    describe('querying by directive type', () => {
        it('should contain all direct child directives in the light dom (constructor)', () => {
            const template = `
            <div text="1"></div>
            <needs-query text="2">
              <div text="3">
                <div text="too-deep"></div>
              </div>
            </needs-query>
            <div text="4"></div>
          `;
            const view = createTestCmpAndDetectChanges(MyComp0, template);
            // Queries don't match host nodes of a directive that defines a content query.
            (0, matchers_1.expect)((0, core_1.asNativeElements)(view.debugElement.children)).toHaveText('3|');
        });
        it('should contain all direct child directives in the content dom', () => {
            const template = '<needs-content-children #q><div text="foo"></div></needs-content-children>';
            const view = createTestCmpAndDetectChanges(MyComp0, template);
            const q = view.debugElement.children[0].references['q'];
            view.detectChanges();
            (0, matchers_1.expect)(q.textDirChildren.length).toEqual(1);
            (0, matchers_1.expect)(q.numberOfChildrenAfterContentInit).toEqual(1);
        });
        it('should contain the first content child', () => {
            const template = '<needs-content-child #q><div *ngIf="shouldShow" text="foo"></div></needs-content-child>';
            const view = createTestCmp(MyComp0, template);
            view.componentInstance.shouldShow = true;
            view.detectChanges();
            const q = view.debugElement.children[0].references['q'];
            (0, matchers_1.expect)(q.logs).toEqual([
                ['setter', 'foo'],
                ['init', 'foo'],
                ['check', 'foo'],
            ]);
            view.componentInstance.shouldShow = false;
            view.detectChanges();
            (0, matchers_1.expect)(q.logs).toEqual([
                ['setter', 'foo'],
                ['init', 'foo'],
                ['check', 'foo'],
                ['setter', null],
                ['check', null],
            ]);
        });
        it('should contain the first content child when target is on <ng-template> with embedded view (issue #16568)', () => {
            var _a;
            const template = `
          <div directive-needs-content-child>
            <ng-template text="foo" [ngIf]="true">
              <div text="bar"></div>
             </ng-template>
           </div>
           <needs-content-child #q>
              <ng-template text="foo" [ngIf]="true">
                <div text="bar"></div>
              </ng-template>
           </needs-content-child>
         `;
            const view = createTestCmp(MyComp0, template);
            view.detectChanges();
            const q = view.debugElement.children[1].references['q'];
            (0, matchers_1.expect)((_a = q.child) === null || _a === void 0 ? void 0 : _a.text).toEqual('foo');
            const directive = view.debugElement.children[0].injector.get(DirectiveNeedsContentChild);
            (0, matchers_1.expect)(directive.child.text).toEqual('foo');
        });
        it('should contain the first view child', () => {
            const template = '<needs-view-child #q></needs-view-child>';
            const view = createTestCmpAndDetectChanges(MyComp0, template);
            const q = view.debugElement.children[0].references['q'];
            (0, matchers_1.expect)(q.logs).toEqual([
                ['setter', 'foo'],
                ['init', 'foo'],
                ['check', 'foo'],
            ]);
            q.shouldShow = false;
            view.detectChanges();
            (0, matchers_1.expect)(q.logs).toEqual([
                ['setter', 'foo'],
                ['init', 'foo'],
                ['check', 'foo'],
                ['setter', null],
                ['check', null],
            ]);
        });
        it('should contain the first view child across embedded views', () => {
            testing_1.TestBed.overrideComponent(MyComp0, {
                set: { template: '<needs-view-child #q></needs-view-child>' },
            });
            testing_1.TestBed.overrideComponent(NeedsViewChild, {
                set: {
                    template: '<div *ngIf="true"><div *ngIf="shouldShow" text="foo"></div></div><div *ngIf="shouldShow2" text="bar"></div>',
                },
            });
            const view = testing_1.TestBed.createComponent(MyComp0);
            view.detectChanges();
            const q = view.debugElement.children[0].references['q'];
            (0, matchers_1.expect)(q.logs).toEqual([
                ['setter', 'foo'],
                ['init', 'foo'],
                ['check', 'foo'],
            ]);
            q.shouldShow = false;
            q.shouldShow2 = true;
            q.logs = [];
            view.detectChanges();
            (0, matchers_1.expect)(q.logs).toEqual([
                ['setter', 'bar'],
                ['check', 'bar'],
            ]);
            q.shouldShow = false;
            q.shouldShow2 = false;
            q.logs = [];
            view.detectChanges();
            (0, matchers_1.expect)(q.logs).toEqual([
                ['setter', null],
                ['check', null],
            ]);
        });
        it('should contain all directives in the light dom when descendants flag is used', () => {
            const template = '<div text="1"></div>' +
                '<needs-query-desc text="2"><div text="3">' +
                '<div text="4"></div>' +
                '</div></needs-query-desc>' +
                '<div text="5"></div>';
            const view = createTestCmpAndDetectChanges(MyComp0, template);
            // Queries don't match host nodes of a directive that defines a content query.
            (0, matchers_1.expect)((0, core_1.asNativeElements)(view.debugElement.children)).toHaveText('3|4|');
        });
        it('should contain all directives in the light dom', () => {
            const template = '<div text="1"></div>' +
                '<needs-query text="2"><div text="3"></div></needs-query>' +
                '<div text="4"></div>';
            const view = createTestCmpAndDetectChanges(MyComp0, template);
            // Queries don't match host nodes of a directive that defines a content query.
            (0, matchers_1.expect)((0, core_1.asNativeElements)(view.debugElement.children)).toHaveText('3|');
        });
        it('should reflect dynamically inserted directives', () => {
            const template = '<div text="1"></div>' +
                '<needs-query text="2"><div *ngIf="shouldShow" [text]="\'3\'"></div></needs-query>' +
                '<div text="4"></div>';
            const view = createTestCmpAndDetectChanges(MyComp0, template);
            // Queries don't match host nodes of a directive that defines a content query.
            (0, matchers_1.expect)((0, core_1.asNativeElements)(view.debugElement.children)).toHaveText('');
            view.componentInstance.shouldShow = true;
            view.detectChanges();
            // Queries don't match host nodes of a directive that defines a content query.
            (0, matchers_1.expect)((0, core_1.asNativeElements)(view.debugElement.children)).toHaveText('3|');
        });
        it('should be cleanly destroyed when a query crosses view boundaries', () => {
            const template = '<div text="1"></div>' +
                '<needs-query text="2"><div *ngIf="shouldShow" [text]="\'3\'"></div></needs-query>' +
                '<div text="4"></div>';
            const view = createTestCmpAndDetectChanges(MyComp0, template);
            view.componentInstance.shouldShow = true;
            view.detectChanges();
            view.destroy();
        });
        it('should reflect moved directives', () => {
            const template = '<div text="1"></div>' +
                '<needs-query text="2"><div *ngFor="let  i of list" [text]="i"></div></needs-query>' +
                '<div text="4"></div>';
            const view = createTestCmpAndDetectChanges(MyComp0, template);
            // Queries don't match host nodes of a directive that defines a content query.
            (0, matchers_1.expect)((0, core_1.asNativeElements)(view.debugElement.children)).toHaveText('1d|2d|3d|');
            view.componentInstance.list = ['3d', '2d'];
            view.detectChanges();
            // Queries don't match host nodes of a directive that defines a content query.
            (0, matchers_1.expect)((0, core_1.asNativeElements)(view.debugElement.children)).toHaveText('3d|2d|');
        });
        it('should throw with descriptive error when query selectors are not present', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [MyCompBroken0, HasNullQueryCondition] });
            const template = '<has-null-query-condition></has-null-query-condition>';
            testing_1.TestBed.overrideComponent(MyCompBroken0, { set: { template } });
            (0, matchers_1.expect)(() => testing_1.TestBed.createComponent(MyCompBroken0)).toThrowError(`Can't construct a query for the property "errorTrigger" of "${(0, stringify_1.stringify)(HasNullQueryCondition)}" since the query selector wasn't defined.`);
        });
    });
    describe('query for TemplateRef', () => {
        it('should find TemplateRefs in the light and shadow dom', () => {
            const template = '<needs-tpl><ng-template><div>light</div></ng-template></needs-tpl>';
            const view = createTestCmpAndDetectChanges(MyComp0, template);
            const needsTpl = view.debugElement.children[0].injector.get(NeedsTpl);
            (0, matchers_1.expect)(needsTpl.vc.createEmbeddedView(needsTpl.query.first).rootNodes[0]).toHaveText('light');
            (0, matchers_1.expect)(needsTpl.vc.createEmbeddedView(needsTpl.viewQuery.first).rootNodes[0]).toHaveText('shadow');
        });
        it('should find named TemplateRefs', () => {
            const template = '<needs-named-tpl><ng-template #tpl><div>light</div></ng-template></needs-named-tpl>';
            const view = createTestCmpAndDetectChanges(MyComp0, template);
            const needsTpl = view.debugElement.children[0].injector.get(NeedsNamedTpl);
            (0, matchers_1.expect)(needsTpl.vc.createEmbeddedView(needsTpl.contentTpl).rootNodes[0]).toHaveText('light');
            (0, matchers_1.expect)(needsTpl.vc.createEmbeddedView(needsTpl.viewTpl).rootNodes[0]).toHaveText('shadow');
        });
    });
    describe('read a different token', () => {
        it('should contain the first content child', () => {
            const template = '<needs-content-child-read><div #q text="ca"></div></needs-content-child-read>';
            const view = createTestCmpAndDetectChanges(MyComp0, template);
            const comp = view.debugElement.children[0].injector.get(NeedsContentChildWithRead);
            (0, matchers_1.expect)(comp.textDirChild.text).toEqual('ca');
        });
        it('should contain the first descendant content child', () => {
            const template = '<needs-content-child-read>' +
                '<div dir><div #q text="ca"></div></div>' +
                '</needs-content-child-read>';
            const view = createTestCmpAndDetectChanges(MyComp0, template);
            const comp = view.debugElement.children[0].injector.get(NeedsContentChildWithRead);
            (0, matchers_1.expect)(comp.textDirChild.text).toEqual('ca');
        });
        it('should contain the first descendant content child for shallow queries', () => {
            const template = `<needs-content-children-shallow>
                          <div #q></div>
                        </needs-content-children-shallow>`;
            const view = createTestCmpAndDetectChanges(MyComp0, template);
            const comp = view.debugElement.children[0].injector.get(NeedsContentChildrenShallow);
            (0, matchers_1.expect)(comp.children.length).toBe(1);
        });
        it('should contain the first descendant content child in an embedded template for shallow queries', () => {
            const template = `<needs-content-children-shallow>
                          <ng-template [ngIf]="true">
                            <div #q></div>
                          </ng-template>
                        </needs-content-children-shallow>`;
            const view = createTestCmpAndDetectChanges(MyComp0, template);
            const comp = view.debugElement.children[0].injector.get(NeedsContentChildrenShallow);
            (0, matchers_1.expect)(comp.children.length).toBe(1);
        });
        it('should contain the first descendant content child in an embedded template for shallow queries and additional directive', () => {
            const template = `<needs-content-children-shallow>
                          <ng-template [ngIf]="true">
                            <div #q directive-needs-content-child></div>
                          </ng-template>
                        </needs-content-children-shallow>`;
            const view = createTestCmpAndDetectChanges(MyComp0, template);
            const comp = view.debugElement.children[0].injector.get(NeedsContentChildrenShallow);
            (0, matchers_1.expect)(comp.children.length).toBe(1);
        });
        it('should contain the first descendant content child in an embedded template for shallow queries and additional directive (star syntax)', () => {
            const template = `<needs-content-children-shallow>
                            <div *ngIf="true" #q directive-needs-content-child></div>
                        </needs-content-children-shallow>`;
            const view = createTestCmpAndDetectChanges(MyComp0, template);
            const comp = view.debugElement.children[0].injector.get(NeedsContentChildrenShallow);
            (0, matchers_1.expect)(comp.children.length).toBe(1);
        });
        it('should not cross ng-container boundaries with shallow queries', () => {
            const template = `<needs-content-children-shallow>
                          <ng-container>
                            <div #q></div>
                          </ng-container>
                        </needs-content-children-shallow>`;
            const view = createTestCmpAndDetectChanges(MyComp0, template);
            const comp = view.debugElement.children[0].injector.get(NeedsContentChildrenShallow);
            (0, matchers_1.expect)(comp.children.length).toBe(1);
        });
        it('should contain the first descendant content child templateRef', () => {
            const template = '<needs-content-child-template-ref-app>' + '</needs-content-child-template-ref-app>';
            const view = createTestCmp(MyComp0, template);
            // can't execute checkNoChanges as our view modifies our content children (via a query).
            view.detectChanges(false);
            (0, matchers_1.expect)(view.nativeElement).toHaveText('OUTER');
        });
        it('should contain the first view child', () => {
            const template = '<needs-view-child-read></needs-view-child-read>';
            const view = createTestCmpAndDetectChanges(MyComp0, template);
            const comp = view.debugElement.children[0].injector.get(NeedsViewChildWithRead);
            (0, matchers_1.expect)(comp.textDirChild.text).toEqual('va');
        });
        it('should contain all child directives in the view', () => {
            const template = '<needs-view-children-read></needs-view-children-read>';
            const view = createTestCmpAndDetectChanges(MyComp0, template);
            const comp = view.debugElement.children[0].injector.get(NeedsViewChildrenWithRead);
            (0, matchers_1.expect)(comp.textDirChildren.map((textDirective) => textDirective.text)).toEqual(['va', 'vb']);
        });
        it('should support reading a ViewContainer', () => {
            const template = '<needs-viewcontainer-read><ng-template>hello</ng-template></needs-viewcontainer-read>';
            const view = createTestCmpAndDetectChanges(MyComp0, template);
            const comp = view.debugElement.children[0].injector.get(NeedsViewContainerWithRead);
            comp.createView();
            (0, matchers_1.expect)(view.debugElement.children[0].nativeElement).toHaveText('hello');
        });
    });
    describe('changes', () => {
        it('should notify query on change', (0, testing_1.waitForAsync)(() => {
            const template = '<needs-query #q>' +
                '<div text="1"></div>' +
                '<div *ngIf="shouldShow" text="2"></div>' +
                '</needs-query>';
            const view = createTestCmpAndDetectChanges(MyComp0, template);
            const q = view.debugElement.children[0].references['q'];
            q.query.changes.subscribe({
                next: () => {
                    (0, matchers_1.expect)(q.query.first.text).toEqual('1');
                    (0, matchers_1.expect)(q.query.last.text).toEqual('2');
                },
            });
            view.componentInstance.shouldShow = true;
            view.detectChanges();
        }));
        it('should correctly clean-up when destroyed together with the directives it is querying', () => {
            const template = '<needs-query #q *ngIf="shouldShow"><div text="foo"></div></needs-query>';
            const view = createTestCmpAndDetectChanges(MyComp0, template);
            view.componentInstance.shouldShow = true;
            view.detectChanges();
            let isQueryListCompleted = false;
            const q = view.debugElement.children[0].references['q'];
            const changes = q.query.changes;
            (0, matchers_1.expect)(q.query.length).toEqual(1);
            (0, matchers_1.expect)(changes.closed).toBeFalsy();
            changes.subscribe(() => { }, () => { }, () => {
                isQueryListCompleted = true;
            });
            view.componentInstance.shouldShow = false;
            view.detectChanges();
            (0, matchers_1.expect)(changes.closed).toBeTruthy();
            (0, matchers_1.expect)(isQueryListCompleted).toBeTruthy();
            view.componentInstance.shouldShow = true;
            view.detectChanges();
            const q2 = view.debugElement.children[0].references['q'];
            (0, matchers_1.expect)(q2.query.length).toEqual(1);
            (0, matchers_1.expect)(changes.closed).toBeTruthy();
            (0, matchers_1.expect)(q2.query.changes.closed).toBeFalsy();
        });
    });
    describe('querying by var binding', () => {
        it('should contain all the child directives in the light dom with the given var binding', () => {
            const template = '<needs-query-by-ref-binding #q>' +
                '<div *ngFor="let item of list" [text]="item" #textLabel="textDir"></div>' +
                '</needs-query-by-ref-binding>';
            const view = createTestCmpAndDetectChanges(MyComp0, template);
            const q = view.debugElement.children[0].references['q'];
            view.componentInstance.list = ['1d', '2d'];
            view.detectChanges();
            (0, matchers_1.expect)(q.query.first.text).toEqual('1d');
            (0, matchers_1.expect)(q.query.last.text).toEqual('2d');
        });
        it('should support querying by multiple var bindings', () => {
            const template = '<needs-query-by-ref-bindings #q>' +
                '<div text="one" #textLabel1="textDir"></div>' +
                '<div text="two" #textLabel2="textDir"></div>' +
                '</needs-query-by-ref-bindings>';
            const view = createTestCmpAndDetectChanges(MyComp0, template);
            const q = view.debugElement.children[0].references['q'];
            (0, matchers_1.expect)(q.query.first.text).toEqual('one');
            (0, matchers_1.expect)(q.query.last.text).toEqual('two');
        });
        it('should support dynamically inserted directives', () => {
            const template = '<needs-query-by-ref-binding #q>' +
                '<div *ngFor="let item of list" [text]="item" #textLabel="textDir"></div>' +
                '</needs-query-by-ref-binding>';
            const view = createTestCmpAndDetectChanges(MyComp0, template);
            const q = view.debugElement.children[0].references['q'];
            view.componentInstance.list = ['1d', '2d'];
            view.detectChanges();
            view.componentInstance.list = ['2d', '1d'];
            view.detectChanges();
            (0, matchers_1.expect)(q.query.last.text).toEqual('1d');
        });
        it('should contain all the elements in the light dom with the given var binding', () => {
            const template = '<needs-query-by-ref-binding #q>' +
                '<div *ngFor="let item of list">' +
                '<div #textLabel>{{item}}</div>' +
                '</div>' +
                '</needs-query-by-ref-binding>';
            const view = createTestCmpAndDetectChanges(MyComp0, template);
            const q = view.debugElement.children[0].references['q'];
            view.componentInstance.list = ['1d', '2d'];
            view.detectChanges();
            (0, matchers_1.expect)(q.query.first.nativeElement).toHaveText('1d');
            (0, matchers_1.expect)(q.query.last.nativeElement).toHaveText('2d');
        });
        it('should contain all the elements in the light dom even if they get projected', () => {
            const template = '<needs-query-and-project #q>' +
                '<div text="hello"></div><div text="world"></div>' +
                '</needs-query-and-project>';
            const view = createTestCmpAndDetectChanges(MyComp0, template);
            (0, matchers_1.expect)((0, core_1.asNativeElements)(view.debugElement.children)).toHaveText('hello|world|');
        });
        it('should support querying the view by using a view query', () => {
            const template = '<needs-view-query-by-ref-binding #q></needs-view-query-by-ref-binding>';
            const view = createTestCmpAndDetectChanges(MyComp0, template);
            const q = view.debugElement.children[0].references['q'];
            (0, matchers_1.expect)(q.query.first.nativeElement).toHaveText('text');
        });
        it('should contain all child directives in the view dom', () => {
            const template = '<needs-view-children #q></needs-view-children>';
            const view = createTestCmpAndDetectChanges(MyComp0, template);
            const q = view.debugElement.children[0].references['q'];
            (0, matchers_1.expect)(q.textDirChildren.length).toEqual(1);
            (0, matchers_1.expect)(q.numberOfChildrenAfterViewInit).toEqual(1);
        });
    });
    describe('querying in the view', () => {
        it('should contain all the elements in the view with that have the given directive', () => {
            const template = '<needs-view-query #q><div text="ignoreme"></div></needs-view-query>';
            const view = createTestCmpAndDetectChanges(MyComp0, template);
            const q = view.debugElement.children[0].references['q'];
            (0, matchers_1.expect)(q.query.map((d) => d.text)).toEqual(['1', '2', '3', '4']);
        });
        it('should not include directive present on the host element', () => {
            const template = '<needs-view-query #q text="self"></needs-view-query>';
            const view = createTestCmpAndDetectChanges(MyComp0, template);
            const q = view.debugElement.children[0].references['q'];
            (0, matchers_1.expect)(q.query.map((d) => d.text)).toEqual(['1', '2', '3', '4']);
        });
        it('should reflect changes in the component', () => {
            const template = '<needs-view-query-if #q></needs-view-query-if>';
            const view = createTestCmpAndDetectChanges(MyComp0, template);
            const q = view.debugElement.children[0].references['q'];
            (0, matchers_1.expect)(q.query.length).toBe(0);
            q.show = true;
            view.detectChanges();
            (0, matchers_1.expect)(q.query.length).toBe(1);
            (0, matchers_1.expect)(q.query.first.text).toEqual('1');
        });
        it('should not be affected by other changes in the component', () => {
            const template = '<needs-view-query-nested-if #q></needs-view-query-nested-if>';
            const view = createTestCmpAndDetectChanges(MyComp0, template);
            const q = view.debugElement.children[0].references['q'];
            (0, matchers_1.expect)(q.query.length).toEqual(1);
            (0, matchers_1.expect)(q.query.first.text).toEqual('1');
            q.show = false;
            view.detectChanges();
            (0, matchers_1.expect)(q.query.length).toEqual(1);
            (0, matchers_1.expect)(q.query.first.text).toEqual('1');
        });
        it('should maintain directives in pre-order depth-first DOM order after dynamic insertion', () => {
            const template = '<needs-view-query-order #q></needs-view-query-order>';
            const view = createTestCmpAndDetectChanges(MyComp0, template);
            const q = view.debugElement.children[0].references['q'];
            (0, matchers_1.expect)(q.query.map((d) => d.text)).toEqual(['1', '2', '3', '4']);
            q.list = ['-3', '2'];
            view.detectChanges();
            (0, matchers_1.expect)(q.query.map((d) => d.text)).toEqual(['1', '-3', '2', '4']);
        });
        it('should maintain directives in pre-order depth-first DOM order after dynamic insertion', () => {
            const template = '<needs-view-query-order-with-p #q></needs-view-query-order-with-p>';
            const view = createTestCmpAndDetectChanges(MyComp0, template);
            const q = view.debugElement.children[0].references['q'];
            (0, matchers_1.expect)(q.query.map((d) => d.text)).toEqual(['1', '2', '3', '4']);
            q.list = ['-3', '2'];
            view.detectChanges();
            (0, matchers_1.expect)(q.query.map((d) => d.text)).toEqual(['1', '-3', '2', '4']);
        });
        it('should handle long ngFor cycles', () => {
            const template = '<needs-view-query-order #q></needs-view-query-order>';
            const view = createTestCmpAndDetectChanges(MyComp0, template);
            const q = view.debugElement.children[0].references['q'];
            // no significance to 50, just a reasonably large cycle.
            for (let i = 0; i < 50; i++) {
                const newString = i.toString();
                q.list = [newString];
                view.detectChanges();
                (0, matchers_1.expect)(q.query.map((d) => d.text)).toEqual(['1', newString, '4']);
            }
        });
        it('should support more than three queries', () => {
            const template = '<needs-four-queries #q><div text="1"></div></needs-four-queries>';
            const view = createTestCmpAndDetectChanges(MyComp0, template);
            const q = view.debugElement.children[0].references['q'];
            (0, matchers_1.expect)(q.query1).toBeDefined();
            (0, matchers_1.expect)(q.query2).toBeDefined();
            (0, matchers_1.expect)(q.query3).toBeDefined();
            (0, matchers_1.expect)(q.query4).toBeDefined();
        });
    });
    describe('query over moved templates', () => {
        it('should include manually projected templates in queries', () => {
            const template = '<manual-projecting #q><ng-template><div text="1"></div></ng-template></manual-projecting>';
            const view = createTestCmpAndDetectChanges(MyComp0, template);
            const q = view.debugElement.children[0].references['q'];
            (0, matchers_1.expect)(q.query.length).toBe(0);
            q.create();
            view.detectChanges();
            (0, matchers_1.expect)(q.query.map((d) => d.text)).toEqual(['1']);
            q.destroy();
            view.detectChanges();
            (0, matchers_1.expect)(q.query.length).toBe(0);
        });
        it('should update queries when a view is detached and re-inserted', () => {
            const template = `<manual-projecting #q>
              <ng-template let-x="x">
                 <div [text]="x"></div>
              </ng-template>
          </manual-projecting>`;
            const view = createTestCmpAndDetectChanges(MyComp0, template);
            const q = view.debugElement.children[0].references['q'];
            (0, matchers_1.expect)(q.query.length).toBe(0);
            const view1 = q.vc.createEmbeddedView(q.template, { 'x': '1' });
            const view2 = q.vc.createEmbeddedView(q.template, { 'x': '2' });
            // 2 views were created and inserted so we've got 2 matching results
            view.detectChanges();
            (0, matchers_1.expect)(q.query.map((d) => d.text)).toEqual(['1', '2']);
            q.vc.detach(1);
            q.vc.detach(0);
            // both views were detached so query results from those views should not be reported
            view.detectChanges();
            (0, matchers_1.expect)(q.query.map((d) => d.text)).toEqual([]);
            q.vc.insert(view2);
            q.vc.insert(view1);
            // previously detached views are re-inserted in the different order so:
            // - query results from the inserted views are reported again
            // - the order results from views reflects orders of views
            view.detectChanges();
            (0, matchers_1.expect)(q.query.map((d) => d.text)).toEqual(['2', '1']);
        });
        it('should remove manually projected templates if their parent view is destroyed', () => {
            const template = `
          <manual-projecting #q><ng-template #tpl><div text="1"></div></ng-template></manual-projecting>
          <div *ngIf="shouldShow">
            <ng-container [ngTemplateOutlet]="tpl"></ng-container>
          </div>
        `;
            const view = createTestCmp(MyComp0, template);
            const q = view.debugElement.children[0].references['q'];
            view.componentInstance.shouldShow = true;
            view.detectChanges();
            (0, matchers_1.expect)(q.query.length).toBe(1);
            view.componentInstance.shouldShow = false;
            view.detectChanges();
            (0, matchers_1.expect)(q.query.length).toBe(0);
        });
        it('should not throw if a content template is queried and created in the view during change detection - fixed in ivy', () => {
            let AutoProjecting = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'auto-projecting',
                        template: '<div *ngIf="true; then: content"></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _content_decorators;
                let _content_initializers = [];
                let _content_extraInitializers = [];
                let _query_decorators;
                let _query_initializers = [];
                let _query_extraInitializers = [];
                var AutoProjecting = _classThis = class {
                    constructor() {
                        this.content = __runInitializers(this, _content_initializers, void 0);
                        this.query = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _query_initializers, void 0));
                        __runInitializers(this, _query_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "AutoProjecting");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _content_decorators = [(0, core_1.ContentChild)(core_1.TemplateRef)];
                    _query_decorators = [(0, core_1.ContentChildren)(TextDirective)];
                    __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: obj => "content" in obj, get: obj => obj.content, set: (obj, value) => { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
                    __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AutoProjecting = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AutoProjecting = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [AutoProjecting] });
            const template = '<auto-projecting #q><ng-template><div text="1"></div></ng-template></auto-projecting>';
            const view = createTestCmpAndDetectChanges(MyComp0, template);
            const q = view.debugElement.children[0].references['q'];
            (0, matchers_1.expect)(q.query.length).toBe(1);
        });
    });
});
let TextDirective = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[text]',
            inputs: ['text'],
            exportAs: 'textDir',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TextDirective = _classThis = class {
    };
    __setFunctionName(_classThis, "TextDirective");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
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
let NeedsContentChild = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'needs-content-child',
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _set_child_decorators;
    var NeedsContentChild = _classThis = class {
        constructor() {
            this._child = __runInitializers(this, _instanceExtraInitializers);
            this.logs = [];
        }
        set child(value) {
            var _a;
            this._child = value;
            this.logs.push(['setter', (_a = value === null || value === void 0 ? void 0 : value.text) !== null && _a !== void 0 ? _a : null]);
        }
        get child() {
            return this._child;
        }
        ngAfterContentInit() {
            var _a, _b;
            this.logs.push(['init', (_b = (_a = this.child) === null || _a === void 0 ? void 0 : _a.text) !== null && _b !== void 0 ? _b : null]);
        }
        ngAfterContentChecked() {
            var _a, _b;
            this.logs.push(['check', (_b = (_a = this.child) === null || _a === void 0 ? void 0 : _a.text) !== null && _b !== void 0 ? _b : null]);
        }
    };
    __setFunctionName(_classThis, "NeedsContentChild");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _set_child_decorators = [(0, core_1.ContentChild)(TextDirective)];
        __esDecorate(_classThis, null, _set_child_decorators, { kind: "setter", name: "child", static: false, private: false, access: { has: obj => "child" in obj, set: (obj, value) => { obj.child = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NeedsContentChild = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NeedsContentChild = _classThis;
})();
let DirectiveNeedsContentChild = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[directive-needs-content-child]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _child_decorators;
    let _child_initializers = [];
    let _child_extraInitializers = [];
    var DirectiveNeedsContentChild = _classThis = class {
        constructor() {
            this.child = __runInitializers(this, _child_initializers, void 0);
            __runInitializers(this, _child_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "DirectiveNeedsContentChild");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _child_decorators = [(0, core_1.ContentChild)(TextDirective)];
        __esDecorate(null, null, _child_decorators, { kind: "field", name: "child", static: false, private: false, access: { has: obj => "child" in obj, get: obj => obj.child, set: (obj, value) => { obj.child = value; } }, metadata: _metadata }, _child_initializers, _child_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DirectiveNeedsContentChild = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DirectiveNeedsContentChild = _classThis;
})();
let NeedsViewChild = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'needs-view-child',
            template: `<div *ngIf="shouldShow" text="foo"></div>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _set_child_decorators;
    var NeedsViewChild = _classThis = class {
        constructor() {
            this.shouldShow = (__runInitializers(this, _instanceExtraInitializers), true);
            this.shouldShow2 = false;
            this.logs = [];
        }
        set child(value) {
            var _a;
            this._child = value;
            this.logs.push(['setter', (_a = value === null || value === void 0 ? void 0 : value.text) !== null && _a !== void 0 ? _a : null]);
        }
        get child() {
            return this._child;
        }
        ngAfterViewInit() {
            var _a, _b;
            this.logs.push(['init', (_b = (_a = this.child) === null || _a === void 0 ? void 0 : _a.text) !== null && _b !== void 0 ? _b : null]);
        }
        ngAfterViewChecked() {
            var _a, _b;
            this.logs.push(['check', (_b = (_a = this.child) === null || _a === void 0 ? void 0 : _a.text) !== null && _b !== void 0 ? _b : null]);
        }
    };
    __setFunctionName(_classThis, "NeedsViewChild");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _set_child_decorators = [(0, core_1.ViewChild)(TextDirective)];
        __esDecorate(_classThis, null, _set_child_decorators, { kind: "setter", name: "child", static: false, private: false, access: { has: obj => "child" in obj, set: (obj, value) => { obj.child = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NeedsViewChild = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NeedsViewChild = _classThis;
})();
function createTestCmp(type, template) {
    const view = testing_1.TestBed.overrideComponent(type, { set: { template } }).createComponent(type);
    return view;
}
function createTestCmpAndDetectChanges(type, template) {
    const view = createTestCmp(type, template);
    view.detectChanges();
    return view;
}
let NeedsStaticContentAndViewChild = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'needs-static-content-view-child',
            template: `<div text="viewFoo"></div>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _contentChild_decorators;
    let _contentChild_initializers = [];
    let _contentChild_extraInitializers = [];
    let _viewChild_decorators;
    let _viewChild_initializers = [];
    let _viewChild_extraInitializers = [];
    var NeedsStaticContentAndViewChild = _classThis = class {
        constructor() {
            this.contentChild = __runInitializers(this, _contentChild_initializers, void 0);
            this.viewChild = (__runInitializers(this, _contentChild_extraInitializers), __runInitializers(this, _viewChild_initializers, void 0));
            __runInitializers(this, _viewChild_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "NeedsStaticContentAndViewChild");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _contentChild_decorators = [(0, core_1.ContentChild)(TextDirective, { static: true })];
        _viewChild_decorators = [(0, core_1.ViewChild)(TextDirective, { static: true })];
        __esDecorate(null, null, _contentChild_decorators, { kind: "field", name: "contentChild", static: false, private: false, access: { has: obj => "contentChild" in obj, get: obj => obj.contentChild, set: (obj, value) => { obj.contentChild = value; } }, metadata: _metadata }, _contentChild_initializers, _contentChild_extraInitializers);
        __esDecorate(null, null, _viewChild_decorators, { kind: "field", name: "viewChild", static: false, private: false, access: { has: obj => "viewChild" in obj, get: obj => obj.viewChild, set: (obj, value) => { obj.viewChild = value; } }, metadata: _metadata }, _viewChild_initializers, _viewChild_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NeedsStaticContentAndViewChild = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NeedsStaticContentAndViewChild = _classThis;
})();
let InertDirective = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[dir]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var InertDirective = _classThis = class {
    };
    __setFunctionName(_classThis, "InertDirective");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        InertDirective = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return InertDirective = _classThis;
})();
let NeedsQuery = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'needs-query',
            template: '<div text="ignoreme"></div><b *ngFor="let  dir of query">{{dir.text}}|</b>',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _query_decorators;
    let _query_initializers = [];
    let _query_extraInitializers = [];
    var NeedsQuery = _classThis = class {
        constructor() {
            this.query = __runInitializers(this, _query_initializers, void 0);
            __runInitializers(this, _query_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "NeedsQuery");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _query_decorators = [(0, core_1.ContentChildren)(TextDirective)];
        __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NeedsQuery = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NeedsQuery = _classThis;
})();
let NeedsFourQueries = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'needs-four-queries',
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _query1_decorators;
    let _query1_initializers = [];
    let _query1_extraInitializers = [];
    let _query2_decorators;
    let _query2_initializers = [];
    let _query2_extraInitializers = [];
    let _query3_decorators;
    let _query3_initializers = [];
    let _query3_extraInitializers = [];
    let _query4_decorators;
    let _query4_initializers = [];
    let _query4_extraInitializers = [];
    var NeedsFourQueries = _classThis = class {
        constructor() {
            this.query1 = __runInitializers(this, _query1_initializers, void 0);
            this.query2 = (__runInitializers(this, _query1_extraInitializers), __runInitializers(this, _query2_initializers, void 0));
            this.query3 = (__runInitializers(this, _query2_extraInitializers), __runInitializers(this, _query3_initializers, void 0));
            this.query4 = (__runInitializers(this, _query3_extraInitializers), __runInitializers(this, _query4_initializers, void 0));
            __runInitializers(this, _query4_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "NeedsFourQueries");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _query1_decorators = [(0, core_1.ContentChild)(TextDirective)];
        _query2_decorators = [(0, core_1.ContentChild)(TextDirective)];
        _query3_decorators = [(0, core_1.ContentChild)(TextDirective)];
        _query4_decorators = [(0, core_1.ContentChild)(TextDirective)];
        __esDecorate(null, null, _query1_decorators, { kind: "field", name: "query1", static: false, private: false, access: { has: obj => "query1" in obj, get: obj => obj.query1, set: (obj, value) => { obj.query1 = value; } }, metadata: _metadata }, _query1_initializers, _query1_extraInitializers);
        __esDecorate(null, null, _query2_decorators, { kind: "field", name: "query2", static: false, private: false, access: { has: obj => "query2" in obj, get: obj => obj.query2, set: (obj, value) => { obj.query2 = value; } }, metadata: _metadata }, _query2_initializers, _query2_extraInitializers);
        __esDecorate(null, null, _query3_decorators, { kind: "field", name: "query3", static: false, private: false, access: { has: obj => "query3" in obj, get: obj => obj.query3, set: (obj, value) => { obj.query3 = value; } }, metadata: _metadata }, _query3_initializers, _query3_extraInitializers);
        __esDecorate(null, null, _query4_decorators, { kind: "field", name: "query4", static: false, private: false, access: { has: obj => "query4" in obj, get: obj => obj.query4, set: (obj, value) => { obj.query4 = value; } }, metadata: _metadata }, _query4_initializers, _query4_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NeedsFourQueries = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NeedsFourQueries = _classThis;
})();
let NeedsQueryDesc = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'needs-query-desc',
            template: '<ng-content></ng-content><div *ngFor="let  dir of query">{{dir.text}}|</div>',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _query_decorators;
    let _query_initializers = [];
    let _query_extraInitializers = [];
    var NeedsQueryDesc = _classThis = class {
        constructor() {
            this.query = __runInitializers(this, _query_initializers, void 0);
            __runInitializers(this, _query_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "NeedsQueryDesc");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _query_decorators = [(0, core_1.ContentChildren)(TextDirective, { descendants: true })];
        __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NeedsQueryDesc = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NeedsQueryDesc = _classThis;
})();
let NeedsQueryByLabel = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'needs-query-by-ref-binding',
            template: '<ng-content>',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _query_decorators;
    let _query_initializers = [];
    let _query_extraInitializers = [];
    var NeedsQueryByLabel = _classThis = class {
        constructor() {
            this.query = __runInitializers(this, _query_initializers, void 0);
            __runInitializers(this, _query_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "NeedsQueryByLabel");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _query_decorators = [(0, core_1.ContentChildren)('textLabel', { descendants: true })];
        __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NeedsQueryByLabel = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NeedsQueryByLabel = _classThis;
})();
let NeedsViewQueryByLabel = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'needs-view-query-by-ref-binding',
            template: '<div #textLabel>text</div>',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _query_decorators;
    let _query_initializers = [];
    let _query_extraInitializers = [];
    var NeedsViewQueryByLabel = _classThis = class {
        constructor() {
            this.query = __runInitializers(this, _query_initializers, void 0);
            __runInitializers(this, _query_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "NeedsViewQueryByLabel");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _query_decorators = [(0, core_1.ViewChildren)('textLabel')];
        __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NeedsViewQueryByLabel = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NeedsViewQueryByLabel = _classThis;
})();
let NeedsQueryByTwoLabels = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'needs-query-by-ref-bindings',
            template: '<ng-content>',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _query_decorators;
    let _query_initializers = [];
    let _query_extraInitializers = [];
    var NeedsQueryByTwoLabels = _classThis = class {
        constructor() {
            this.query = __runInitializers(this, _query_initializers, void 0);
            __runInitializers(this, _query_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "NeedsQueryByTwoLabels");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _query_decorators = [(0, core_1.ContentChildren)('textLabel1,textLabel2', { descendants: true })];
        __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NeedsQueryByTwoLabels = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NeedsQueryByTwoLabels = _classThis;
})();
let NeedsQueryAndProject = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'needs-query-and-project',
            template: '<div *ngFor="let  dir of query">{{dir.text}}|</div><ng-content></ng-content>',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _query_decorators;
    let _query_initializers = [];
    let _query_extraInitializers = [];
    var NeedsQueryAndProject = _classThis = class {
        constructor() {
            this.query = __runInitializers(this, _query_initializers, void 0);
            __runInitializers(this, _query_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "NeedsQueryAndProject");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _query_decorators = [(0, core_1.ContentChildren)(TextDirective)];
        __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NeedsQueryAndProject = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NeedsQueryAndProject = _classThis;
})();
let NeedsViewQuery = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'needs-view-query',
            template: '<div text="1"><div text="2"></div></div><div text="3"></div><div text="4"></div>',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _query_decorators;
    let _query_initializers = [];
    let _query_extraInitializers = [];
    var NeedsViewQuery = _classThis = class {
        constructor() {
            this.query = __runInitializers(this, _query_initializers, void 0);
            __runInitializers(this, _query_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "NeedsViewQuery");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _query_decorators = [(0, core_1.ViewChildren)(TextDirective)];
        __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NeedsViewQuery = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NeedsViewQuery = _classThis;
})();
let NeedsViewQueryIf = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'needs-view-query-if',
            template: '<div *ngIf="show" text="1"></div>',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _query_decorators;
    let _query_initializers = [];
    let _query_extraInitializers = [];
    var NeedsViewQueryIf = _classThis = class {
        constructor() {
            this.show = false;
            this.query = __runInitializers(this, _query_initializers, void 0);
            __runInitializers(this, _query_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "NeedsViewQueryIf");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _query_decorators = [(0, core_1.ViewChildren)(TextDirective)];
        __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NeedsViewQueryIf = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NeedsViewQueryIf = _classThis;
})();
let NeedsViewQueryNestedIf = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'needs-view-query-nested-if',
            template: '<div text="1"><div *ngIf="show"><div dir></div></div></div>',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _query_decorators;
    let _query_initializers = [];
    let _query_extraInitializers = [];
    var NeedsViewQueryNestedIf = _classThis = class {
        constructor() {
            this.show = true;
            this.query = __runInitializers(this, _query_initializers, void 0);
            __runInitializers(this, _query_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "NeedsViewQueryNestedIf");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _query_decorators = [(0, core_1.ViewChildren)(TextDirective)];
        __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NeedsViewQueryNestedIf = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NeedsViewQueryNestedIf = _classThis;
})();
let NeedsViewQueryOrder = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'needs-view-query-order',
            template: '<div text="1"></div>' +
                '<div *ngFor="let  i of list" [text]="i"></div>' +
                '<div text="4"></div>',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _query_decorators;
    let _query_initializers = [];
    let _query_extraInitializers = [];
    var NeedsViewQueryOrder = _classThis = class {
        constructor() {
            this.query = __runInitializers(this, _query_initializers, void 0);
            this.list = (__runInitializers(this, _query_extraInitializers), ['2', '3']);
        }
    };
    __setFunctionName(_classThis, "NeedsViewQueryOrder");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _query_decorators = [(0, core_1.ViewChildren)(TextDirective)];
        __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NeedsViewQueryOrder = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NeedsViewQueryOrder = _classThis;
})();
let NeedsViewQueryOrderWithParent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'needs-view-query-order-with-p',
            template: '<div dir><div text="1"></div>' +
                '<div *ngFor="let  i of list" [text]="i"></div>' +
                '<div text="4"></div></div>',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _query_decorators;
    let _query_initializers = [];
    let _query_extraInitializers = [];
    var NeedsViewQueryOrderWithParent = _classThis = class {
        constructor() {
            this.query = __runInitializers(this, _query_initializers, void 0);
            this.list = (__runInitializers(this, _query_extraInitializers), ['2', '3']);
        }
    };
    __setFunctionName(_classThis, "NeedsViewQueryOrderWithParent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _query_decorators = [(0, core_1.ViewChildren)(TextDirective)];
        __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NeedsViewQueryOrderWithParent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NeedsViewQueryOrderWithParent = _classThis;
})();
let NeedsTpl = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'needs-tpl',
            template: '<ng-template><div>shadow</div></ng-template>',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _viewQuery_decorators;
    let _viewQuery_initializers = [];
    let _viewQuery_extraInitializers = [];
    let _query_decorators;
    let _query_initializers = [];
    let _query_extraInitializers = [];
    var NeedsTpl = _classThis = class {
        constructor(vc) {
            this.vc = vc;
            this.viewQuery = __runInitializers(this, _viewQuery_initializers, void 0);
            this.query = (__runInitializers(this, _viewQuery_extraInitializers), __runInitializers(this, _query_initializers, void 0));
            __runInitializers(this, _query_extraInitializers);
            this.vc = vc;
        }
    };
    __setFunctionName(_classThis, "NeedsTpl");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _viewQuery_decorators = [(0, core_1.ViewChildren)(core_1.TemplateRef)];
        _query_decorators = [(0, core_1.ContentChildren)(core_1.TemplateRef)];
        __esDecorate(null, null, _viewQuery_decorators, { kind: "field", name: "viewQuery", static: false, private: false, access: { has: obj => "viewQuery" in obj, get: obj => obj.viewQuery, set: (obj, value) => { obj.viewQuery = value; } }, metadata: _metadata }, _viewQuery_initializers, _viewQuery_extraInitializers);
        __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NeedsTpl = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NeedsTpl = _classThis;
})();
let NeedsNamedTpl = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'needs-named-tpl',
            template: '<ng-template #tpl><div>shadow</div></ng-template>',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _viewTpl_decorators;
    let _viewTpl_initializers = [];
    let _viewTpl_extraInitializers = [];
    let _contentTpl_decorators;
    let _contentTpl_initializers = [];
    let _contentTpl_extraInitializers = [];
    var NeedsNamedTpl = _classThis = class {
        constructor(vc) {
            this.vc = vc;
            this.viewTpl = __runInitializers(this, _viewTpl_initializers, void 0);
            this.contentTpl = (__runInitializers(this, _viewTpl_extraInitializers), __runInitializers(this, _contentTpl_initializers, void 0));
            __runInitializers(this, _contentTpl_extraInitializers);
            this.vc = vc;
        }
    };
    __setFunctionName(_classThis, "NeedsNamedTpl");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _viewTpl_decorators = [(0, core_1.ViewChild)('tpl', { static: true })];
        _contentTpl_decorators = [(0, core_1.ContentChild)('tpl', { static: true })];
        __esDecorate(null, null, _viewTpl_decorators, { kind: "field", name: "viewTpl", static: false, private: false, access: { has: obj => "viewTpl" in obj, get: obj => obj.viewTpl, set: (obj, value) => { obj.viewTpl = value; } }, metadata: _metadata }, _viewTpl_initializers, _viewTpl_extraInitializers);
        __esDecorate(null, null, _contentTpl_decorators, { kind: "field", name: "contentTpl", static: false, private: false, access: { has: obj => "contentTpl" in obj, get: obj => obj.contentTpl, set: (obj, value) => { obj.contentTpl = value; } }, metadata: _metadata }, _contentTpl_initializers, _contentTpl_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NeedsNamedTpl = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NeedsNamedTpl = _classThis;
})();
let NeedsContentChildrenWithRead = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'needs-content-children-read',
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _textDirChildren_decorators;
    let _textDirChildren_initializers = [];
    let _textDirChildren_extraInitializers = [];
    let _nonExistingVar_decorators;
    let _nonExistingVar_initializers = [];
    let _nonExistingVar_extraInitializers = [];
    var NeedsContentChildrenWithRead = _classThis = class {
        constructor() {
            this.textDirChildren = __runInitializers(this, _textDirChildren_initializers, void 0);
            this.nonExistingVar = (__runInitializers(this, _textDirChildren_extraInitializers), __runInitializers(this, _nonExistingVar_initializers, void 0));
            __runInitializers(this, _nonExistingVar_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "NeedsContentChildrenWithRead");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _textDirChildren_decorators = [(0, core_1.ContentChildren)('q', { read: TextDirective })];
        _nonExistingVar_decorators = [(0, core_1.ContentChildren)('nonExisting', { read: TextDirective })];
        __esDecorate(null, null, _textDirChildren_decorators, { kind: "field", name: "textDirChildren", static: false, private: false, access: { has: obj => "textDirChildren" in obj, get: obj => obj.textDirChildren, set: (obj, value) => { obj.textDirChildren = value; } }, metadata: _metadata }, _textDirChildren_initializers, _textDirChildren_extraInitializers);
        __esDecorate(null, null, _nonExistingVar_decorators, { kind: "field", name: "nonExistingVar", static: false, private: false, access: { has: obj => "nonExistingVar" in obj, get: obj => obj.nonExistingVar, set: (obj, value) => { obj.nonExistingVar = value; } }, metadata: _metadata }, _nonExistingVar_initializers, _nonExistingVar_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NeedsContentChildrenWithRead = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NeedsContentChildrenWithRead = _classThis;
})();
let NeedsContentChildWithRead = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'needs-content-child-read',
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _textDirChild_decorators;
    let _textDirChild_initializers = [];
    let _textDirChild_extraInitializers = [];
    let _nonExistingVar_decorators;
    let _nonExistingVar_initializers = [];
    let _nonExistingVar_extraInitializers = [];
    var NeedsContentChildWithRead = _classThis = class {
        constructor() {
            this.textDirChild = __runInitializers(this, _textDirChild_initializers, void 0);
            this.nonExistingVar = (__runInitializers(this, _textDirChild_extraInitializers), __runInitializers(this, _nonExistingVar_initializers, void 0));
            __runInitializers(this, _nonExistingVar_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "NeedsContentChildWithRead");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _textDirChild_decorators = [(0, core_1.ContentChild)('q', { read: TextDirective })];
        _nonExistingVar_decorators = [(0, core_1.ContentChild)('nonExisting', { read: TextDirective })];
        __esDecorate(null, null, _textDirChild_decorators, { kind: "field", name: "textDirChild", static: false, private: false, access: { has: obj => "textDirChild" in obj, get: obj => obj.textDirChild, set: (obj, value) => { obj.textDirChild = value; } }, metadata: _metadata }, _textDirChild_initializers, _textDirChild_extraInitializers);
        __esDecorate(null, null, _nonExistingVar_decorators, { kind: "field", name: "nonExistingVar", static: false, private: false, access: { has: obj => "nonExistingVar" in obj, get: obj => obj.nonExistingVar, set: (obj, value) => { obj.nonExistingVar = value; } }, metadata: _metadata }, _nonExistingVar_initializers, _nonExistingVar_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NeedsContentChildWithRead = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NeedsContentChildWithRead = _classThis;
})();
let NeedsContentChildrenShallow = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'needs-content-children-shallow',
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _children_decorators;
    let _children_initializers = [];
    let _children_extraInitializers = [];
    var NeedsContentChildrenShallow = _classThis = class {
        constructor() {
            this.children = __runInitializers(this, _children_initializers, void 0);
            __runInitializers(this, _children_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "NeedsContentChildrenShallow");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _children_decorators = [(0, core_1.ContentChildren)('q', { descendants: false })];
        __esDecorate(null, null, _children_decorators, { kind: "field", name: "children", static: false, private: false, access: { has: obj => "children" in obj, get: obj => obj.children, set: (obj, value) => { obj.children = value; } }, metadata: _metadata }, _children_initializers, _children_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NeedsContentChildrenShallow = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NeedsContentChildrenShallow = _classThis;
})();
let NeedsContentChildTemplateRef = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'needs-content-child-template-ref',
            template: '<div [ngTemplateOutlet]="templateRef"></div>',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _templateRef_decorators;
    let _templateRef_initializers = [];
    let _templateRef_extraInitializers = [];
    var NeedsContentChildTemplateRef = _classThis = class {
        constructor() {
            this.templateRef = __runInitializers(this, _templateRef_initializers, void 0);
            __runInitializers(this, _templateRef_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "NeedsContentChildTemplateRef");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _templateRef_decorators = [(0, core_1.ContentChild)(core_1.TemplateRef, { static: true })];
        __esDecorate(null, null, _templateRef_decorators, { kind: "field", name: "templateRef", static: false, private: false, access: { has: obj => "templateRef" in obj, get: obj => obj.templateRef, set: (obj, value) => { obj.templateRef = value; } }, metadata: _metadata }, _templateRef_initializers, _templateRef_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NeedsContentChildTemplateRef = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NeedsContentChildTemplateRef = _classThis;
})();
let NeedsContentChildTemplateRefApp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'needs-content-child-template-ref-app',
            template: '<needs-content-child-template-ref>' +
                '<ng-template>OUTER<ng-template>INNER</ng-template></ng-template>' +
                '</needs-content-child-template-ref>',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NeedsContentChildTemplateRefApp = _classThis = class {
    };
    __setFunctionName(_classThis, "NeedsContentChildTemplateRefApp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NeedsContentChildTemplateRefApp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NeedsContentChildTemplateRefApp = _classThis;
})();
let NeedsViewChildrenWithRead = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'needs-view-children-read',
            template: '<div #q text="va"></div><div #w text="vb"></div>',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _textDirChildren_decorators;
    let _textDirChildren_initializers = [];
    let _textDirChildren_extraInitializers = [];
    let _nonExistingVar_decorators;
    let _nonExistingVar_initializers = [];
    let _nonExistingVar_extraInitializers = [];
    var NeedsViewChildrenWithRead = _classThis = class {
        constructor() {
            this.textDirChildren = __runInitializers(this, _textDirChildren_initializers, void 0);
            this.nonExistingVar = (__runInitializers(this, _textDirChildren_extraInitializers), __runInitializers(this, _nonExistingVar_initializers, void 0));
            __runInitializers(this, _nonExistingVar_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "NeedsViewChildrenWithRead");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _textDirChildren_decorators = [(0, core_1.ViewChildren)('q,w', { read: TextDirective })];
        _nonExistingVar_decorators = [(0, core_1.ViewChildren)('nonExisting', { read: TextDirective })];
        __esDecorate(null, null, _textDirChildren_decorators, { kind: "field", name: "textDirChildren", static: false, private: false, access: { has: obj => "textDirChildren" in obj, get: obj => obj.textDirChildren, set: (obj, value) => { obj.textDirChildren = value; } }, metadata: _metadata }, _textDirChildren_initializers, _textDirChildren_extraInitializers);
        __esDecorate(null, null, _nonExistingVar_decorators, { kind: "field", name: "nonExistingVar", static: false, private: false, access: { has: obj => "nonExistingVar" in obj, get: obj => obj.nonExistingVar, set: (obj, value) => { obj.nonExistingVar = value; } }, metadata: _metadata }, _nonExistingVar_initializers, _nonExistingVar_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NeedsViewChildrenWithRead = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NeedsViewChildrenWithRead = _classThis;
})();
let NeedsViewChildWithRead = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'needs-view-child-read',
            template: '<div #q text="va"></div>',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _textDirChild_decorators;
    let _textDirChild_initializers = [];
    let _textDirChild_extraInitializers = [];
    let _nonExistingVar_decorators;
    let _nonExistingVar_initializers = [];
    let _nonExistingVar_extraInitializers = [];
    var NeedsViewChildWithRead = _classThis = class {
        constructor() {
            this.textDirChild = __runInitializers(this, _textDirChild_initializers, void 0);
            this.nonExistingVar = (__runInitializers(this, _textDirChild_extraInitializers), __runInitializers(this, _nonExistingVar_initializers, void 0));
            __runInitializers(this, _nonExistingVar_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "NeedsViewChildWithRead");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _textDirChild_decorators = [(0, core_1.ViewChild)('q', { read: TextDirective })];
        _nonExistingVar_decorators = [(0, core_1.ViewChild)('nonExisting', { read: TextDirective })];
        __esDecorate(null, null, _textDirChild_decorators, { kind: "field", name: "textDirChild", static: false, private: false, access: { has: obj => "textDirChild" in obj, get: obj => obj.textDirChild, set: (obj, value) => { obj.textDirChild = value; } }, metadata: _metadata }, _textDirChild_initializers, _textDirChild_extraInitializers);
        __esDecorate(null, null, _nonExistingVar_decorators, { kind: "field", name: "nonExistingVar", static: false, private: false, access: { has: obj => "nonExistingVar" in obj, get: obj => obj.nonExistingVar, set: (obj, value) => { obj.nonExistingVar = value; } }, metadata: _metadata }, _nonExistingVar_initializers, _nonExistingVar_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NeedsViewChildWithRead = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NeedsViewChildWithRead = _classThis;
})();
let NeedsViewContainerWithRead = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'needs-viewcontainer-read',
            template: '<div #q></div>',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _vc_decorators;
    let _vc_initializers = [];
    let _vc_extraInitializers = [];
    let _nonExistingVar_decorators;
    let _nonExistingVar_initializers = [];
    let _nonExistingVar_extraInitializers = [];
    let _template_decorators;
    let _template_initializers = [];
    let _template_extraInitializers = [];
    var NeedsViewContainerWithRead = _classThis = class {
        createView() {
            this.vc.createEmbeddedView(this.template);
        }
        constructor() {
            this.vc = __runInitializers(this, _vc_initializers, void 0);
            this.nonExistingVar = (__runInitializers(this, _vc_extraInitializers), __runInitializers(this, _nonExistingVar_initializers, void 0));
            this.template = (__runInitializers(this, _nonExistingVar_extraInitializers), __runInitializers(this, _template_initializers, void 0));
            __runInitializers(this, _template_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "NeedsViewContainerWithRead");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _vc_decorators = [(0, core_1.ViewChild)('q', { read: core_1.ViewContainerRef })];
        _nonExistingVar_decorators = [(0, core_1.ViewChild)('nonExisting', { read: core_1.ViewContainerRef })];
        _template_decorators = [(0, core_1.ContentChild)(core_1.TemplateRef, { static: true })];
        __esDecorate(null, null, _vc_decorators, { kind: "field", name: "vc", static: false, private: false, access: { has: obj => "vc" in obj, get: obj => obj.vc, set: (obj, value) => { obj.vc = value; } }, metadata: _metadata }, _vc_initializers, _vc_extraInitializers);
        __esDecorate(null, null, _nonExistingVar_decorators, { kind: "field", name: "nonExistingVar", static: false, private: false, access: { has: obj => "nonExistingVar" in obj, get: obj => obj.nonExistingVar, set: (obj, value) => { obj.nonExistingVar = value; } }, metadata: _metadata }, _nonExistingVar_initializers, _nonExistingVar_extraInitializers);
        __esDecorate(null, null, _template_decorators, { kind: "field", name: "template", static: false, private: false, access: { has: obj => "template" in obj, get: obj => obj.template, set: (obj, value) => { obj.template = value; } }, metadata: _metadata }, _template_initializers, _template_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NeedsViewContainerWithRead = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NeedsViewContainerWithRead = _classThis;
})();
let HasNullQueryCondition = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'has-null-query-condition',
            template: '<div></div>',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _errorTrigger_decorators;
    let _errorTrigger_initializers = [];
    let _errorTrigger_extraInitializers = [];
    var HasNullQueryCondition = _classThis = class {
        constructor() {
            this.errorTrigger = __runInitializers(this, _errorTrigger_initializers, void 0);
            __runInitializers(this, _errorTrigger_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "HasNullQueryCondition");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _errorTrigger_decorators = [(0, core_1.ContentChildren)(null)];
        __esDecorate(null, null, _errorTrigger_decorators, { kind: "field", name: "errorTrigger", static: false, private: false, access: { has: obj => "errorTrigger" in obj, get: obj => obj.errorTrigger, set: (obj, value) => { obj.errorTrigger = value; } }, metadata: _metadata }, _errorTrigger_initializers, _errorTrigger_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HasNullQueryCondition = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HasNullQueryCondition = _classThis;
})();
let MyComp0 = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'my-comp',
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MyComp0 = _classThis = class {
        constructor() {
            this.shouldShow = false;
            this.list = ['1d', '2d', '3d'];
        }
    };
    __setFunctionName(_classThis, "MyComp0");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MyComp0 = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MyComp0 = _classThis;
})();
let MyCompBroken0 = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'my-comp',
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MyCompBroken0 = _classThis = class {
    };
    __setFunctionName(_classThis, "MyCompBroken0");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MyCompBroken0 = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MyCompBroken0 = _classThis;
})();
let ManualProjecting = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'manual-projecting',
            template: '<div #vc></div>',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _template_decorators;
    let _template_initializers = [];
    let _template_extraInitializers = [];
    let _vc_decorators;
    let _vc_initializers = [];
    let _vc_extraInitializers = [];
    let _query_decorators;
    let _query_initializers = [];
    let _query_extraInitializers = [];
    var ManualProjecting = _classThis = class {
        create() {
            this.vc.createEmbeddedView(this.template);
        }
        destroy() {
            this.vc.clear();
        }
        constructor() {
            this.template = __runInitializers(this, _template_initializers, void 0);
            this.vc = (__runInitializers(this, _template_extraInitializers), __runInitializers(this, _vc_initializers, void 0));
            this.query = (__runInitializers(this, _vc_extraInitializers), __runInitializers(this, _query_initializers, void 0));
            __runInitializers(this, _query_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "ManualProjecting");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _template_decorators = [(0, core_1.ContentChild)(core_1.TemplateRef, { static: true })];
        _vc_decorators = [(0, core_1.ViewChild)('vc', { read: core_1.ViewContainerRef })];
        _query_decorators = [(0, core_1.ContentChildren)(TextDirective)];
        __esDecorate(null, null, _template_decorators, { kind: "field", name: "template", static: false, private: false, access: { has: obj => "template" in obj, get: obj => obj.template, set: (obj, value) => { obj.template = value; } }, metadata: _metadata }, _template_initializers, _template_extraInitializers);
        __esDecorate(null, null, _vc_decorators, { kind: "field", name: "vc", static: false, private: false, access: { has: obj => "vc" in obj, get: obj => obj.vc, set: (obj, value) => { obj.vc = value; } }, metadata: _metadata }, _vc_initializers, _vc_extraInitializers);
        __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ManualProjecting = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ManualProjecting = _classThis;
})();
