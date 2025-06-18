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
const by_1 = require("@angular/platform-browser/src/dom/debug/by");
const matchers_1 = require("@angular/platform-browser/testing/src/matchers");
describe('projection', () => {
    beforeEach(() => testing_1.TestBed.configureTestingModule({ declarations: [MainComp, OtherComp, Simple] }));
    it('should support simple components', () => {
        const template = '<simple><div>A</div></simple>';
        testing_1.TestBed.overrideComponent(MainComp, { set: { template } });
        const main = testing_1.TestBed.createComponent(MainComp);
        (0, matchers_1.expect)(main.nativeElement).toHaveText('SIMPLE(A)');
    });
    it('should support simple components with text interpolation as direct children', () => {
        const template = "{{'START('}}<simple>" + '{{text}}' + "</simple>{{')END'}}";
        testing_1.TestBed.overrideComponent(MainComp, { set: { template } });
        const main = testing_1.TestBed.createComponent(MainComp);
        main.componentInstance.text = 'A';
        main.detectChanges();
        (0, matchers_1.expect)(main.nativeElement).toHaveText('START(SIMPLE(A))END');
    });
    it('should support projecting text interpolation to a non bound element', () => {
        testing_1.TestBed.overrideComponent(Simple, {
            set: { template: 'SIMPLE(<div><ng-content></ng-content></div>)' },
        });
        testing_1.TestBed.overrideComponent(MainComp, { set: { template: '<simple>{{text}}</simple>' } });
        const main = testing_1.TestBed.createComponent(MainComp);
        main.componentInstance.text = 'A';
        main.detectChanges();
        (0, matchers_1.expect)(main.nativeElement).toHaveText('SIMPLE(A)');
    });
    it('should support projecting text interpolation to a non bound element with other bound elements after it', () => {
        testing_1.TestBed.overrideComponent(Simple, {
            set: { template: 'SIMPLE(<div><ng-content></ng-content></div><div [tabIndex]="0">EL</div>)' },
        });
        testing_1.TestBed.overrideComponent(MainComp, { set: { template: '<simple>{{text}}</simple>' } });
        const main = testing_1.TestBed.createComponent(MainComp);
        main.componentInstance.text = 'A';
        main.detectChanges();
        (0, matchers_1.expect)(main.nativeElement).toHaveText('SIMPLE(AEL)');
    });
    it('should project content components', () => {
        testing_1.TestBed.overrideComponent(Simple, {
            set: { template: 'SIMPLE({{0}}|<ng-content></ng-content>|{{2}})' },
        });
        testing_1.TestBed.overrideComponent(OtherComp, { set: { template: '{{1}}' } });
        testing_1.TestBed.overrideComponent(MainComp, { set: { template: '<simple><other></other></simple>' } });
        const main = testing_1.TestBed.createComponent(MainComp);
        main.detectChanges();
        (0, matchers_1.expect)(main.nativeElement).toHaveText('SIMPLE(0|1|2)');
    });
    it('should not show the light dom even if there is no content tag', () => {
        testing_1.TestBed.configureTestingModule({ declarations: [Empty] });
        testing_1.TestBed.overrideComponent(MainComp, { set: { template: '<empty>A</empty>' } });
        const main = testing_1.TestBed.createComponent(MainComp);
        (0, matchers_1.expect)(main.nativeElement).toHaveText('');
    });
    it('should project a single class-based tag', () => {
        testing_1.TestBed.configureTestingModule({ declarations: [SingleContentTagComponent] });
        testing_1.TestBed.overrideComponent(MainComp, {
            set: {
                template: '<single-content-tag>' +
                    '<div class="target">I AM PROJECTED</div>' +
                    '</single-content-tag>',
            },
        });
        const main = testing_1.TestBed.createComponent(MainComp);
        (0, matchers_1.expect)(main.nativeElement).toHaveText('I AM PROJECTED');
    });
    it('should support multiple content tags', () => {
        testing_1.TestBed.configureTestingModule({ declarations: [MultipleContentTagsComponent] });
        testing_1.TestBed.overrideComponent(MainComp, {
            set: {
                template: '<multiple-content-tags>' +
                    '<div>B</div>' +
                    '<div>C</div>' +
                    '<div class="left">A</div>' +
                    '</multiple-content-tags>',
            },
        });
        const main = testing_1.TestBed.createComponent(MainComp);
        (0, matchers_1.expect)(main.nativeElement).toHaveText('(A, BC)');
    });
    it('should support passing projectable nodes via factory function', () => {
        var _a;
        let MultipleContentTagsComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'multiple-content-tags',
                    template: '(<ng-content SELECT="h1"></ng-content>, <ng-content></ng-content>)',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MultipleContentTagsComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "MultipleContentTagsComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MultipleContentTagsComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MultipleContentTagsComponent = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [MultipleContentTagsComponent] });
        const injector = testing_1.TestBed.inject(core_1.Injector);
        (0, matchers_1.expect)((_a = (0, core_1.reflectComponentType)(MultipleContentTagsComponent)) === null || _a === void 0 ? void 0 : _a.ngContentSelectors).toEqual([
            'h1',
            '*',
        ]);
        const nodeOne = (0, common_1.ɵgetDOM)().getDefaultDocument().createTextNode('one');
        const nodeTwo = (0, common_1.ɵgetDOM)().getDefaultDocument().createTextNode('two');
        const component = (0, core_1.createComponent)(MultipleContentTagsComponent, {
            environmentInjector: injector,
            projectableNodes: [[nodeOne], [nodeTwo]],
        });
        (0, matchers_1.expect)(component.location.nativeElement).toHaveText('(one, two)');
    });
    it('should redistribute only direct children', () => {
        testing_1.TestBed.configureTestingModule({ declarations: [MultipleContentTagsComponent] });
        testing_1.TestBed.overrideComponent(MainComp, {
            set: {
                template: '<multiple-content-tags>' +
                    '<div>B<div class="left">A</div></div>' +
                    '<div>C</div>' +
                    '</multiple-content-tags>',
            },
        });
        const main = testing_1.TestBed.createComponent(MainComp);
        (0, matchers_1.expect)(main.nativeElement).toHaveText('(, BAC)');
    });
    it('should redistribute direct child viewcontainers when the light dom changes', () => {
        testing_1.TestBed.configureTestingModule({
            declarations: [MultipleContentTagsComponent, ManualViewportDirective],
        });
        testing_1.TestBed.overrideComponent(MainComp, {
            set: {
                template: '<multiple-content-tags>' +
                    '<ng-template manual class="left"><div>A1</div></ng-template>' +
                    '<div>B</div>' +
                    '</multiple-content-tags>',
            },
        });
        const main = testing_1.TestBed.createComponent(MainComp);
        const viewportDirectives = main.debugElement.children[0].childNodes
            .filter(by_1.By.directive(ManualViewportDirective))
            .map((de) => de.injector.get(ManualViewportDirective));
        (0, matchers_1.expect)(main.nativeElement).toHaveText('(, B)');
        viewportDirectives.forEach((d) => d.show());
        main.detectChanges();
        (0, matchers_1.expect)(main.nativeElement).toHaveText('(A1, B)');
        viewportDirectives.forEach((d) => d.hide());
        main.detectChanges();
        (0, matchers_1.expect)(main.nativeElement).toHaveText('(, B)');
    });
    it('should support nested components', () => {
        testing_1.TestBed.configureTestingModule({ declarations: [OuterWithIndirectNestedComponent] });
        testing_1.TestBed.overrideComponent(MainComp, {
            set: {
                template: '<outer-with-indirect-nested>' +
                    '<div>A</div>' +
                    '<div>B</div>' +
                    '</outer-with-indirect-nested>',
            },
        });
        const main = testing_1.TestBed.createComponent(MainComp);
        (0, matchers_1.expect)(main.nativeElement).toHaveText('OUTER(SIMPLE(AB))');
    });
    it('should support nesting with content being direct child of a nested component', () => {
        testing_1.TestBed.configureTestingModule({
            declarations: [InnerComponent, InnerInnerComponent, OuterComponent, ManualViewportDirective],
        });
        testing_1.TestBed.overrideComponent(MainComp, {
            set: {
                template: '<outer>' +
                    '<ng-template manual class="left"><div>A</div></ng-template>' +
                    '<div>B</div>' +
                    '<div>C</div>' +
                    '</outer>',
            },
        });
        const main = testing_1.TestBed.createComponent(MainComp);
        const viewportDirective = main.debugElement
            .queryAllNodes(by_1.By.directive(ManualViewportDirective))[0]
            .injector.get(ManualViewportDirective);
        (0, matchers_1.expect)(main.nativeElement).toHaveText('OUTER(INNER(INNERINNER(,BC)))');
        viewportDirective.show();
        (0, matchers_1.expect)(main.nativeElement).toHaveText('OUTER(INNER(INNERINNER(A,BC)))');
    });
    it('should redistribute when the shadow dom changes', () => {
        testing_1.TestBed.configureTestingModule({
            declarations: [ConditionalContentComponent, ManualViewportDirective],
        });
        testing_1.TestBed.overrideComponent(MainComp, {
            set: {
                template: '<conditional-content>' +
                    '<div class="left">A</div>' +
                    '<div>B</div>' +
                    '<div>C</div>' +
                    '</conditional-content>',
            },
        });
        const main = testing_1.TestBed.createComponent(MainComp);
        const viewportDirective = main.debugElement
            .queryAllNodes(by_1.By.directive(ManualViewportDirective))[0]
            .injector.get(ManualViewportDirective);
        (0, matchers_1.expect)(main.nativeElement).toHaveText('(, BC)');
        viewportDirective.show();
        main.detectChanges();
        (0, matchers_1.expect)(main.nativeElement).toHaveText('(A, BC)');
        viewportDirective.hide();
        main.detectChanges();
        (0, matchers_1.expect)(main.nativeElement).toHaveText('(, BC)');
    });
    it('should redistribute non-continuous blocks of nodes when the shadow dom changes', () => {
        let Child = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'child',
                    template: `<ng-content></ng-content>(<ng-template [ngIf]="showing"><ng-content select="div"></ng-content></ng-template>)`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _showing_decorators;
            let _showing_initializers = [];
            let _showing_extraInitializers = [];
            var Child = _classThis = class {
                constructor() {
                    this.showing = __runInitializers(this, _showing_initializers, void 0);
                    __runInitializers(this, _showing_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Child");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _showing_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _showing_decorators, { kind: "field", name: "showing", static: false, private: false, access: { has: obj => "showing" in obj, get: obj => obj.showing, set: (obj, value) => { obj.showing = value; } }, metadata: _metadata }, _showing_initializers, _showing_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Child = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Child = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'app',
                    template: `<child [showing]="showing">
        <div>A</div>
        <span>B</span>
        <div>A</div>
        <span>B</span>
      </child>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.showing = false;
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
        testing_1.TestBed.configureTestingModule({ declarations: [App, Child] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('BB()');
        fixture.componentInstance.showing = true;
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('BB(AA)');
        fixture.componentInstance.showing = false;
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('BB()');
    });
    // GH-2095 - https://github.com/angular/angular/issues/2095
    // important as we are removing the ng-content element during compilation,
    // which could skrew up text node indices.
    it('should support text nodes after content tags', () => {
        testing_1.TestBed.overrideComponent(MainComp, { set: { template: '<simple stringProp="text"></simple>' } });
        testing_1.TestBed.overrideComponent(Simple, {
            set: { template: '<ng-content></ng-content><p>P,</p>{{stringProp}}' },
        });
        const main = testing_1.TestBed.createComponent(MainComp);
        main.detectChanges();
        (0, matchers_1.expect)(main.nativeElement).toHaveText('P,text');
    });
    // important as we are moving style tags around during compilation,
    // which could skrew up text node indices.
    it('should support text nodes after style tags', () => {
        testing_1.TestBed.overrideComponent(MainComp, { set: { template: '<simple stringProp="text"></simple>' } });
        testing_1.TestBed.overrideComponent(Simple, { set: { template: '<style></style><p>P,</p>{{stringProp}}' } });
        const main = testing_1.TestBed.createComponent(MainComp);
        main.detectChanges();
        (0, matchers_1.expect)(main.nativeElement).toHaveText('P,text');
    });
    it('should support moving non projected light dom around', () => {
        let sourceDirective = undefined;
        let ManualViewportDirective = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[manual]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ManualViewportDirective = _classThis = class {
                constructor(templateRef) {
                    this.templateRef = templateRef;
                    sourceDirective = this;
                }
            };
            __setFunctionName(_classThis, "ManualViewportDirective");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ManualViewportDirective = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ManualViewportDirective = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            declarations: [Empty, ProjectDirective, ManualViewportDirective],
        });
        testing_1.TestBed.overrideComponent(MainComp, {
            set: {
                template: '<empty>' +
                    ' <ng-template manual><div>A</div></ng-template>' +
                    '</empty>' +
                    'START(<div project></div>)END',
            },
        });
        const main = testing_1.TestBed.createComponent(MainComp);
        const projectDirective = main.debugElement
            .queryAllNodes(by_1.By.directive(ProjectDirective))[0]
            .injector.get(ProjectDirective);
        (0, matchers_1.expect)(main.nativeElement).toHaveText('START()END');
        projectDirective.show(sourceDirective.templateRef);
        (0, matchers_1.expect)(main.nativeElement).toHaveText('START(A)END');
    });
    it('should support moving projected light dom around', () => {
        testing_1.TestBed.configureTestingModule({
            declarations: [Empty, ProjectDirective, ManualViewportDirective],
        });
        testing_1.TestBed.overrideComponent(MainComp, {
            set: {
                template: '<simple><ng-template manual><div>A</div></ng-template></simple>' +
                    'START(<div project></div>)END',
            },
        });
        const main = testing_1.TestBed.createComponent(MainComp);
        const sourceDirective = main.debugElement
            .queryAllNodes(by_1.By.directive(ManualViewportDirective))[0]
            .injector.get(ManualViewportDirective);
        const projectDirective = main.debugElement
            .queryAllNodes(by_1.By.directive(ProjectDirective))[0]
            .injector.get(ProjectDirective);
        (0, matchers_1.expect)(main.nativeElement).toHaveText('SIMPLE()START()END');
        projectDirective.show(sourceDirective.templateRef);
        (0, matchers_1.expect)(main.nativeElement).toHaveText('SIMPLE()START(A)END');
    });
    it('should support moving ng-content around', () => {
        testing_1.TestBed.configureTestingModule({
            declarations: [ConditionalContentComponent, ProjectDirective, ManualViewportDirective],
        });
        testing_1.TestBed.overrideComponent(MainComp, {
            set: {
                template: '<conditional-content>' +
                    '<div class="left">A</div>' +
                    '<div>B</div>' +
                    '</conditional-content>' +
                    'START(<div project></div>)END',
            },
        });
        const main = testing_1.TestBed.createComponent(MainComp);
        const sourceDirective = main.debugElement
            .queryAllNodes(by_1.By.directive(ManualViewportDirective))[0]
            .injector.get(ManualViewportDirective);
        const projectDirective = main.debugElement
            .queryAllNodes(by_1.By.directive(ProjectDirective))[0]
            .injector.get(ProjectDirective);
        (0, matchers_1.expect)(main.nativeElement).toHaveText('(, B)START()END');
        projectDirective.show(sourceDirective.templateRef);
        (0, matchers_1.expect)(main.nativeElement).toHaveText('(, B)START(A)END');
        // Stamping ng-content multiple times should not produce the content multiple
        // times...
        projectDirective.show(sourceDirective.templateRef);
        (0, matchers_1.expect)(main.nativeElement).toHaveText('(, B)START(A)END');
    });
    // Note: This does not use a ng-content element, but
    // is still important as we are merging proto views independent of
    // the presence of ng-content elements!
    it('should still allow to implement a recursive trees', () => {
        testing_1.TestBed.configureTestingModule({ declarations: [Tree, ManualViewportDirective] });
        testing_1.TestBed.overrideComponent(MainComp, { set: { template: '<tree></tree>' } });
        const main = testing_1.TestBed.createComponent(MainComp);
        main.detectChanges();
        const manualDirective = main.debugElement
            .queryAllNodes(by_1.By.directive(ManualViewportDirective))[0]
            .injector.get(ManualViewportDirective);
        (0, matchers_1.expect)(main.nativeElement).toHaveText('TREE(0:)');
        manualDirective.show();
        main.detectChanges();
        (0, matchers_1.expect)(main.nativeElement).toHaveText('TREE(0:TREE(1:))');
    });
    // Note: This does not use a ng-content element, but
    // is still important as we are merging proto views independent of
    // the presence of ng-content elements!
    it('should still allow to implement a recursive trees via multiple components', () => {
        testing_1.TestBed.configureTestingModule({ declarations: [Tree, Tree2, ManualViewportDirective] });
        testing_1.TestBed.overrideComponent(MainComp, { set: { template: '<tree></tree>' } });
        testing_1.TestBed.overrideComponent(Tree, {
            set: { template: 'TREE({{depth}}:<tree2 *manual [depth]="depth+1"></tree2>)' },
        });
        const main = testing_1.TestBed.createComponent(MainComp);
        main.detectChanges();
        (0, matchers_1.expect)(main.nativeElement).toHaveText('TREE(0:)');
        const tree = main.debugElement.query(by_1.By.directive(Tree));
        let manualDirective = tree
            .queryAllNodes(by_1.By.directive(ManualViewportDirective))[0]
            .injector.get(ManualViewportDirective);
        manualDirective.show();
        main.detectChanges();
        (0, matchers_1.expect)(main.nativeElement).toHaveText('TREE(0:TREE2(1:))');
        const tree2 = main.debugElement.query(by_1.By.directive(Tree2));
        manualDirective = tree2
            .queryAllNodes(by_1.By.directive(ManualViewportDirective))[0]
            .injector.get(ManualViewportDirective);
        manualDirective.show();
        main.detectChanges();
        (0, matchers_1.expect)(main.nativeElement).toHaveText('TREE(0:TREE2(1:TREE(2:)))');
    });
    if (!isNode) {
        it('should support shadow dom content projection and isolate styles per component', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [SimpleShadowDom1, SimpleShadowDom2] });
            testing_1.TestBed.overrideComponent(MainComp, {
                set: {
                    template: '<simple-shadow-dom1><div>A</div></simple-shadow-dom1>' +
                        '<simple-shadow-dom2><div>B</div></simple-shadow-dom2>',
                },
            });
            const main = testing_1.TestBed.createComponent(MainComp);
            const childNodes = main.nativeElement.childNodes;
            (0, matchers_1.expect)(childNodes[0]).toHaveText('div {color: red}SIMPLE1(A)');
            (0, matchers_1.expect)(childNodes[1]).toHaveText('div {color: blue}SIMPLE2(B)');
            main.destroy();
        });
    }
    if ((0, common_1.ɵgetDOM)().supportsDOMEvents) {
        it('should support non emulated styles', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [OtherComp] });
            testing_1.TestBed.overrideComponent(MainComp, {
                set: {
                    template: '<div class="redStyle"></div>',
                    styles: ['.redStyle { color: red}'],
                    encapsulation: core_1.ViewEncapsulation.None,
                },
            });
            const main = testing_1.TestBed.createComponent(MainComp);
            const mainEl = main.nativeElement;
            const div1 = mainEl.firstChild;
            const div2 = (0, common_1.ɵgetDOM)().createElement('div');
            div2.setAttribute('class', 'redStyle');
            mainEl.appendChild(div2);
            (0, matchers_1.expect)(getComputedStyle(div1).color).toEqual('rgb(255, 0, 0)');
            (0, matchers_1.expect)(getComputedStyle(div2).color).toEqual('rgb(255, 0, 0)');
        });
        it('should support emulated style encapsulation', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [OtherComp] });
            testing_1.TestBed.overrideComponent(MainComp, {
                set: {
                    template: '<div></div>',
                    styles: ['div { color: red}'],
                    encapsulation: core_1.ViewEncapsulation.Emulated,
                },
            });
            const main = testing_1.TestBed.createComponent(MainComp);
            const mainEl = main.nativeElement;
            const div1 = mainEl.firstChild;
            const div2 = (0, common_1.ɵgetDOM)().createElement('div');
            mainEl.appendChild(div2);
            (0, matchers_1.expect)(getComputedStyle(div1).color).toEqual('rgb(255, 0, 0)');
            (0, matchers_1.expect)(getComputedStyle(div2).color).toEqual('rgb(0, 0, 0)');
        });
    }
    it('should support nested conditionals that contain ng-contents', () => {
        testing_1.TestBed.configureTestingModule({
            declarations: [ConditionalTextComponent, ManualViewportDirective],
        });
        testing_1.TestBed.overrideComponent(MainComp, {
            set: { template: `<conditional-text>a</conditional-text>` },
        });
        const main = testing_1.TestBed.createComponent(MainComp);
        (0, matchers_1.expect)(main.nativeElement).toHaveText('MAIN()');
        let viewportElement = main.debugElement.queryAllNodes(by_1.By.directive(ManualViewportDirective))[0];
        viewportElement.injector.get(ManualViewportDirective).show();
        (0, matchers_1.expect)(main.nativeElement).toHaveText('MAIN(FIRST())');
        viewportElement = main.debugElement.queryAllNodes(by_1.By.directive(ManualViewportDirective))[1];
        viewportElement.injector.get(ManualViewportDirective).show();
        (0, matchers_1.expect)(main.nativeElement).toHaveText('MAIN(FIRST(SECOND(a)))');
    });
    it('should allow to switch the order of nested components via ng-content', () => {
        testing_1.TestBed.configureTestingModule({ declarations: [CmpA, CmpB, CmpD, CmpC] });
        testing_1.TestBed.overrideComponent(MainComp, { set: { template: `<cmp-a><cmp-b></cmp-b></cmp-a>` } });
        const main = testing_1.TestBed.createComponent(MainComp);
        main.detectChanges();
        (0, matchers_1.expect)(main.nativeElement.innerHTML).toEqual('<cmp-a><cmp-b><cmp-d><i>cmp-d</i></cmp-d></cmp-b>' + '<cmp-c><b>cmp-c</b></cmp-c></cmp-a>');
    });
    it('should create nested components in the right order', () => {
        testing_1.TestBed.configureTestingModule({ declarations: [CmpA1, CmpA2, CmpB11, CmpB12, CmpB21, CmpB22] });
        testing_1.TestBed.overrideComponent(MainComp, { set: { template: `<cmp-a1></cmp-a1><cmp-a2></cmp-a2>` } });
        const main = testing_1.TestBed.createComponent(MainComp);
        main.detectChanges();
        (0, matchers_1.expect)(main.nativeElement.innerHTML).toEqual('<cmp-a1>a1<cmp-b11>b11</cmp-b11><cmp-b12>b12</cmp-b12></cmp-a1>' +
            '<cmp-a2>a2<cmp-b21>b21</cmp-b21><cmp-b22>b22</cmp-b22></cmp-a2>');
    });
    it("should project nodes into nested templates when the main template doesn't have <ng-content>", () => {
        let ContentInATemplateComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'content-in-template',
                    template: `(<ng-template manual><ng-content select="[id=left]"></ng-content></ng-template>)`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ContentInATemplateComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "ContentInATemplateComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ContentInATemplateComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ContentInATemplateComponent = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            declarations: [ContentInATemplateComponent, ManualViewportDirective],
        });
        testing_1.TestBed.overrideComponent(MainComp, {
            set: { template: `<content-in-template><div id="left">A</div></content-in-template>` },
        });
        const main = testing_1.TestBed.createComponent(MainComp);
        main.detectChanges();
        (0, matchers_1.expect)(main.nativeElement).toHaveText('()');
        let viewportElement = main.debugElement.queryAllNodes(by_1.By.directive(ManualViewportDirective))[0];
        viewportElement.injector.get(ManualViewportDirective).show();
        (0, matchers_1.expect)(main.nativeElement).toHaveText('(A)');
    });
    it('should project nodes into nested templates and the main template', () => {
        let ContentInMainAndTemplateComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'content-in-main-and-template',
                    template: `<ng-content></ng-content>(<ng-template manual><ng-content select="[id=left]"></ng-content></ng-template>)`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ContentInMainAndTemplateComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "ContentInMainAndTemplateComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ContentInMainAndTemplateComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ContentInMainAndTemplateComponent = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            declarations: [ContentInMainAndTemplateComponent, ManualViewportDirective],
        });
        testing_1.TestBed.overrideComponent(MainComp, {
            set: {
                template: `<content-in-main-and-template><div id="left">A</div>B</content-in-main-and-template>`,
            },
        });
        const main = testing_1.TestBed.createComponent(MainComp);
        main.detectChanges();
        (0, matchers_1.expect)(main.nativeElement).toHaveText('B()');
        let viewportElement = main.debugElement.queryAllNodes(by_1.By.directive(ManualViewportDirective))[0];
        viewportElement.injector.get(ManualViewportDirective).show();
        (0, matchers_1.expect)(main.nativeElement).toHaveText('B(A)');
    });
    it('should project view containers', () => {
        testing_1.TestBed.configureTestingModule({
            declarations: [SingleContentTagComponent, ManualViewportDirective],
        });
        testing_1.TestBed.overrideComponent(MainComp, {
            set: {
                template: '<single-content-tag>' +
                    '<div class="target">A</div>' +
                    '<ng-template manual class="target">B</ng-template>' +
                    '<div class="target">C</div>' +
                    '</single-content-tag>',
            },
        });
        const main = testing_1.TestBed.createComponent(MainComp);
        const manualDirective = main.debugElement
            .queryAllNodes(by_1.By.directive(ManualViewportDirective))[0]
            .injector.get(ManualViewportDirective);
        (0, matchers_1.expect)(main.nativeElement).toHaveText('AC');
        manualDirective.show();
        main.detectChanges();
        (0, matchers_1.expect)(main.nativeElement).toHaveText('ABC');
    });
    it('should project filled view containers into a view container', () => {
        testing_1.TestBed.configureTestingModule({
            declarations: [ConditionalContentComponent, ManualViewportDirective],
        });
        testing_1.TestBed.overrideComponent(MainComp, {
            set: {
                template: '<conditional-content>' +
                    '<div class="left">A</div>' +
                    '<ng-template manual class="left">B</ng-template>' +
                    '<div class="left">C</div>' +
                    '<div>D</div>' +
                    '</conditional-content>',
            },
        });
        const main = testing_1.TestBed.createComponent(MainComp);
        const conditionalComp = main.debugElement.query(by_1.By.directive(ConditionalContentComponent));
        const viewViewportDir = conditionalComp
            .queryAllNodes(by_1.By.directive(ManualViewportDirective))[0]
            .injector.get(ManualViewportDirective);
        (0, matchers_1.expect)(main.nativeElement).toHaveText('(, D)');
        (0, matchers_1.expect)(main.nativeElement).toHaveText('(, D)');
        viewViewportDir.show();
        main.detectChanges();
        (0, matchers_1.expect)(main.nativeElement).toHaveText('(AC, D)');
        const contentViewportDir = conditionalComp
            .queryAllNodes(by_1.By.directive(ManualViewportDirective))[1]
            .injector.get(ManualViewportDirective);
        contentViewportDir.show();
        main.detectChanges();
        (0, matchers_1.expect)(main.nativeElement).toHaveText('(ABC, D)');
        // hide view viewport, and test that it also hides
        // the content viewport's views
        viewViewportDir.hide();
        main.detectChanges();
        (0, matchers_1.expect)(main.nativeElement).toHaveText('(, D)');
    });
    describe('projectable nodes', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test',
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor(vcr) {
                    this.vcr = vcr;
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
        let WithContentCmpt = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'with-content',
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _directiveRef_decorators;
            let _directiveRef_initializers = [];
            let _directiveRef_extraInitializers = [];
            var WithContentCmpt = _classThis = class {
                constructor() {
                    this.directiveRef = __runInitializers(this, _directiveRef_initializers, void 0);
                    __runInitializers(this, _directiveRef_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "WithContentCmpt");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _directiveRef_decorators = [(0, core_1.ViewChild)('ref', { static: true })];
                __esDecorate(null, null, _directiveRef_decorators, { kind: "field", name: "directiveRef", static: false, private: false, access: { has: obj => "directiveRef" in obj, get: obj => obj.directiveRef, set: (obj, value) => { obj.directiveRef = value; } }, metadata: _metadata }, _directiveRef_initializers, _directiveRef_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                WithContentCmpt = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return WithContentCmpt = _classThis;
        })();
        let ReProjectCmpt = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 're-project',
                    template: '<ng-content></ng-content>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ReProjectCmpt = _classThis = class {
            };
            __setFunctionName(_classThis, "ReProjectCmpt");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ReProjectCmpt = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ReProjectCmpt = _classThis;
        })();
        let InsertTplRef = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[insert]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var InsertTplRef = _classThis = class {
                constructor(_vcRef, _tplRef) {
                    this._vcRef = _vcRef;
                    this._tplRef = _tplRef;
                }
                ngOnInit() {
                    this._vcRef.createEmbeddedView(this._tplRef);
                }
            };
            __setFunctionName(_classThis, "InsertTplRef");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                InsertTplRef = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return InsertTplRef = _classThis;
        })();
        let DelayedInsertTplRef = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[delayedInsert]',
                    exportAs: 'delayedInsert',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var DelayedInsertTplRef = _classThis = class {
                constructor(vc, templateRef) {
                    this.vc = vc;
                    this.templateRef = templateRef;
                }
                show() {
                    this.vc.createEmbeddedView(this.templateRef);
                }
                hide() {
                    this.vc.clear();
                }
            };
            __setFunctionName(_classThis, "DelayedInsertTplRef");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DelayedInsertTplRef = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DelayedInsertTplRef = _classThis;
        })();
        let fixture;
        function createCmptInstance(tpl, projectableNodes) {
            testing_1.TestBed.configureTestingModule({
                declarations: [
                    WithContentCmpt,
                    InsertTplRef,
                    DelayedInsertTplRef,
                    ReProjectCmpt,
                    TestComponent,
                ],
            });
            testing_1.TestBed.overrideTemplate(WithContentCmpt, tpl);
            fixture = testing_1.TestBed.createComponent(TestComponent);
            const vcr = fixture.componentInstance.vcr;
            const cmptRef = vcr.createComponent(WithContentCmpt, {
                injector: core_1.Injector.NULL,
                projectableNodes,
            });
            cmptRef.changeDetectorRef.detectChanges();
            return cmptRef;
        }
        it('should pass nodes to the default ng-content without selectors', () => {
            const cmptRef = createCmptInstance('<div>(<ng-content></ng-content>)</div>', [
                [document.createTextNode('A')],
            ]);
            (0, matchers_1.expect)(cmptRef.location.nativeElement).toHaveText('(A)');
        });
        it('should pass nodes to the default ng-content at the root', () => {
            const cmptRef = createCmptInstance('<ng-content></ng-content>', [
                [document.createTextNode('A')],
            ]);
            (0, matchers_1.expect)(cmptRef.location.nativeElement).toHaveText('A');
        });
        it('should pass nodes to multiple ng-content tags', () => {
            const cmptRef = createCmptInstance('A:(<ng-content></ng-content>)B:(<ng-content select="b"></ng-content>)C:(<ng-content select="c"></ng-content>)', [
                [document.createTextNode('A')],
                [document.createTextNode('B')],
                [document.createTextNode('C')],
            ]);
            (0, matchers_1.expect)(cmptRef.location.nativeElement).toHaveText('A:(A)B:(B)C:(C)');
        });
        it('should pass nodes to the default ng-content inside ng-container', () => {
            const cmptRef = createCmptInstance('A<ng-container>(<ng-content></ng-content>)</ng-container>C', [[document.createTextNode('B')]]);
            (0, matchers_1.expect)(cmptRef.location.nativeElement).toHaveText('A(B)C');
        });
        it('should pass nodes to the default ng-content inside an embedded view', () => {
            const cmptRef = createCmptInstance('A<ng-template insert>(<ng-content></ng-content>)</ng-template>C', [[document.createTextNode('B')]]);
            (0, matchers_1.expect)(cmptRef.location.nativeElement).toHaveText('A(B)C');
        });
        it('should pass nodes to the default ng-content inside a delayed embedded view', () => {
            const cmptRef = createCmptInstance('A(<ng-template #ref="delayedInsert" delayedInsert>[<ng-content></ng-content>]</ng-template>)C', [[document.createTextNode('B')]]);
            (0, matchers_1.expect)(cmptRef.location.nativeElement).toHaveText('A()C');
            const delayedInsert = cmptRef.instance.directiveRef;
            delayedInsert.show();
            cmptRef.changeDetectorRef.detectChanges();
            (0, matchers_1.expect)(cmptRef.location.nativeElement).toHaveText('A([B])C');
            delayedInsert.hide();
            cmptRef.changeDetectorRef.detectChanges();
            (0, matchers_1.expect)(cmptRef.location.nativeElement).toHaveText('A()C');
        });
        it('should re-project at the root', () => {
            const cmptRef = createCmptInstance('A[<re-project>(<ng-content></ng-content>)</re-project>]C', [[document.createTextNode('B')]]);
            (0, matchers_1.expect)(cmptRef.location.nativeElement).toHaveText('A[(B)]C');
        });
    });
});
let MainComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'main',
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MainComp = _classThis = class {
        constructor() {
            this.text = '';
        }
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
let OtherComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'other',
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var OtherComp = _classThis = class {
        constructor() {
            this.text = '';
        }
    };
    __setFunctionName(_classThis, "OtherComp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OtherComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OtherComp = _classThis;
})();
let Simple = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'simple',
            inputs: ['stringProp'],
            template: 'SIMPLE(<ng-content></ng-content>)',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Simple = _classThis = class {
        constructor() {
            this.stringProp = '';
        }
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
let SimpleShadowDom1 = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'simple-shadow-dom1',
            template: 'SIMPLE1(<slot></slot>)',
            encapsulation: core_1.ViewEncapsulation.ShadowDom,
            styles: ['div {color: red}'],
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SimpleShadowDom1 = _classThis = class {
    };
    __setFunctionName(_classThis, "SimpleShadowDom1");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SimpleShadowDom1 = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SimpleShadowDom1 = _classThis;
})();
let SimpleShadowDom2 = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'simple-shadow-dom2',
            template: 'SIMPLE2(<slot></slot>)',
            encapsulation: core_1.ViewEncapsulation.ShadowDom,
            styles: ['div {color: blue}'],
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SimpleShadowDom2 = _classThis = class {
    };
    __setFunctionName(_classThis, "SimpleShadowDom2");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SimpleShadowDom2 = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SimpleShadowDom2 = _classThis;
})();
let Empty = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'empty',
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Empty = _classThis = class {
    };
    __setFunctionName(_classThis, "Empty");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Empty = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Empty = _classThis;
})();
let MultipleContentTagsComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'multiple-content-tags',
            template: '(<ng-content SELECT=".left"></ng-content>, <ng-content></ng-content>)',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MultipleContentTagsComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "MultipleContentTagsComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MultipleContentTagsComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MultipleContentTagsComponent = _classThis;
})();
let SingleContentTagComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'single-content-tag',
            template: '<ng-content SELECT=".target"></ng-content>',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SingleContentTagComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "SingleContentTagComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SingleContentTagComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SingleContentTagComponent = _classThis;
})();
let ManualViewportDirective = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[manual]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ManualViewportDirective = _classThis = class {
        constructor(vc, templateRef) {
            this.vc = vc;
            this.templateRef = templateRef;
        }
        show() {
            this.vc.createEmbeddedView(this.templateRef);
        }
        hide() {
            this.vc.clear();
        }
    };
    __setFunctionName(_classThis, "ManualViewportDirective");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ManualViewportDirective = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ManualViewportDirective = _classThis;
})();
let ProjectDirective = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[project]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ProjectDirective = _classThis = class {
        constructor(vc) {
            this.vc = vc;
        }
        show(templateRef) {
            this.vc.createEmbeddedView(templateRef);
        }
        hide() {
            this.vc.clear();
        }
    };
    __setFunctionName(_classThis, "ProjectDirective");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ProjectDirective = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ProjectDirective = _classThis;
})();
let OuterWithIndirectNestedComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'outer-with-indirect-nested',
            template: 'OUTER(<simple><div><ng-content></ng-content></div></simple>)',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var OuterWithIndirectNestedComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "OuterWithIndirectNestedComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OuterWithIndirectNestedComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OuterWithIndirectNestedComponent = _classThis;
})();
let OuterComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'outer',
            template: 'OUTER(<inner><ng-content select=".left" class="left"></ng-content><ng-content></ng-content></inner>)',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var OuterComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "OuterComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OuterComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OuterComponent = _classThis;
})();
let InnerComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'inner',
            template: 'INNER(<innerinner><ng-content select=".left" class="left"></ng-content><ng-content></ng-content></innerinner>)',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var InnerComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "InnerComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        InnerComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return InnerComponent = _classThis;
})();
let InnerInnerComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'innerinner',
            template: 'INNERINNER(<ng-content select=".left"></ng-content>,<ng-content></ng-content>)',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var InnerInnerComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "InnerInnerComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        InnerInnerComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return InnerInnerComponent = _classThis;
})();
let ConditionalContentComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'conditional-content',
            template: '<div>(<div *manual><ng-content select=".left"></ng-content></div>, <ng-content></ng-content>)</div>',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ConditionalContentComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "ConditionalContentComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ConditionalContentComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ConditionalContentComponent = _classThis;
})();
let ConditionalTextComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'conditional-text',
            template: 'MAIN(<ng-template manual>FIRST(<ng-template manual>SECOND(<ng-content></ng-content>)</ng-template>)</ng-template>)',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ConditionalTextComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "ConditionalTextComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ConditionalTextComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ConditionalTextComponent = _classThis;
})();
let Tab = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'tab',
            template: '<div><div *manual>TAB(<ng-content></ng-content>)</div></div>',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Tab = _classThis = class {
    };
    __setFunctionName(_classThis, "Tab");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Tab = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Tab = _classThis;
})();
let Tree2 = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'tree2',
            inputs: ['depth'],
            template: 'TREE2({{depth}}:<tree *manual [depth]="depth+1"></tree>)',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Tree2 = _classThis = class {
        constructor() {
            this.depth = 0;
        }
    };
    __setFunctionName(_classThis, "Tree2");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Tree2 = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Tree2 = _classThis;
})();
let Tree = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'tree',
            inputs: ['depth'],
            template: 'TREE({{depth}}:<tree *manual [depth]="depth+1"></tree>)',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Tree = _classThis = class {
        constructor() {
            this.depth = 0;
        }
    };
    __setFunctionName(_classThis, "Tree");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Tree = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Tree = _classThis;
})();
let CmpD = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'cmp-d',
            template: `<i>{{tagName}}</i>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CmpD = _classThis = class {
        constructor(elementRef) {
            this.tagName = elementRef.nativeElement.tagName.toLowerCase();
        }
    };
    __setFunctionName(_classThis, "CmpD");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CmpD = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CmpD = _classThis;
})();
let CmpC = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'cmp-c',
            template: `<b>{{tagName}}</b>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CmpC = _classThis = class {
        constructor(elementRef) {
            this.tagName = elementRef.nativeElement.tagName.toLowerCase();
        }
    };
    __setFunctionName(_classThis, "CmpC");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CmpC = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CmpC = _classThis;
})();
let CmpB = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'cmp-b',
            template: `<ng-content></ng-content><cmp-d></cmp-d>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CmpB = _classThis = class {
    };
    __setFunctionName(_classThis, "CmpB");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CmpB = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CmpB = _classThis;
})();
let CmpA = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'cmp-a',
            template: `<ng-content></ng-content><cmp-c></cmp-c>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CmpA = _classThis = class {
    };
    __setFunctionName(_classThis, "CmpA");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CmpA = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CmpA = _classThis;
})();
let CmpB11 = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'cmp-b11',
            template: `{{'b11'}}`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CmpB11 = _classThis = class {
    };
    __setFunctionName(_classThis, "CmpB11");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CmpB11 = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CmpB11 = _classThis;
})();
let CmpB12 = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'cmp-b12',
            template: `{{'b12'}}`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CmpB12 = _classThis = class {
    };
    __setFunctionName(_classThis, "CmpB12");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CmpB12 = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CmpB12 = _classThis;
})();
let CmpB21 = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'cmp-b21',
            template: `{{'b21'}}`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CmpB21 = _classThis = class {
    };
    __setFunctionName(_classThis, "CmpB21");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CmpB21 = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CmpB21 = _classThis;
})();
let CmpB22 = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'cmp-b22',
            template: `{{'b22'}}`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CmpB22 = _classThis = class {
    };
    __setFunctionName(_classThis, "CmpB22");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CmpB22 = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CmpB22 = _classThis;
})();
let CmpA1 = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'cmp-a1',
            template: `{{'a1'}}<cmp-b11></cmp-b11><cmp-b12></cmp-b12>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CmpA1 = _classThis = class {
    };
    __setFunctionName(_classThis, "CmpA1");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CmpA1 = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CmpA1 = _classThis;
})();
let CmpA2 = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'cmp-a2',
            template: `{{'a2'}}<cmp-b21></cmp-b21><cmp-b22></cmp-b22>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CmpA2 = _classThis = class {
    };
    __setFunctionName(_classThis, "CmpA2");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CmpA2 = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CmpA2 = _classThis;
})();
