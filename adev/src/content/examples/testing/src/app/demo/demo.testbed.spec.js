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
exports.NotProvided = void 0;
// #docplaster
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const forms_1 = require("@angular/forms");
const platform_browser_1 = require("@angular/platform-browser");
const testing_2 = require("../../testing");
const demo_1 = require("./demo");
class NotProvided extends demo_1.ValueService {
}
exports.NotProvided = NotProvided;
beforeEach(testing_2.addMatchers);
describe('demo (with TestBed):', () => {
    ////////  Service Tests  /////////////
    describe('ValueService', () => {
        // #docregion value-service-before-each
        let service;
        // #docregion value-service-inject-before-each
        beforeEach(() => {
            testing_1.TestBed.configureTestingModule({ providers: [demo_1.ValueService] });
            // #enddocregion value-service-before-each
            service = testing_1.TestBed.inject(demo_1.ValueService);
            // #docregion value-service-before-each
        });
        // #enddocregion value-service-before-each, value-service-inject-before-each
        // #docregion value-service-inject-it
        it('should use ValueService', () => {
            service = testing_1.TestBed.inject(demo_1.ValueService);
            expect(service.getValue()).toBe('real value');
        });
        // #enddocregion value-service-inject-it
        it('can inject a default value when service is not provided', () => {
            // #docregion testbed-get-w-null
            expect(testing_1.TestBed.inject(NotProvided, null)).toBeNull();
            // #enddocregion testbed-get-w-null
        });
        it('test should wait for ValueService.getPromiseValue', (0, testing_1.waitForAsync)(() => {
            service.getPromiseValue().then((value) => expect(value).toBe('promise value'));
        }));
        it('test should wait for ValueService.getObservableValue', (0, testing_1.waitForAsync)(() => {
            service.getObservableValue().subscribe((value) => expect(value).toBe('observable value'));
        }));
        // Must use done. See https://github.com/angular/angular/issues/10127
        it('test should wait for ValueService.getObservableDelayValue', (done) => {
            service.getObservableDelayValue().subscribe((value) => {
                expect(value).toBe('observable delay value');
                done();
            });
        });
        it('should allow the use of fakeAsync', (0, testing_1.fakeAsync)(() => {
            let value;
            service.getPromiseValue().then((val) => (value = val));
            (0, testing_1.tick)(); // Trigger JS engine cycle until all promises resolve.
            expect(value).toBe('promise value');
        }));
    });
    describe('MasterService', () => {
        // #docregion master-service-before-each
        let masterService;
        let valueServiceSpy;
        beforeEach(() => {
            const spy = jasmine.createSpyObj('ValueService', ['getValue']);
            testing_1.TestBed.configureTestingModule({
                // Provide both the service-to-test and its (spy) dependency
                providers: [demo_1.MasterService, { provide: demo_1.ValueService, useValue: spy }],
            });
            // Inject both the service-to-test and its (spy) dependency
            masterService = testing_1.TestBed.inject(demo_1.MasterService);
            valueServiceSpy = testing_1.TestBed.inject(demo_1.ValueService);
        });
        // #enddocregion master-service-before-each
        // #docregion master-service-it
        it('#getValue should return stubbed value from a spy', () => {
            const stubValue = 'stub value';
            valueServiceSpy.getValue.and.returnValue(stubValue);
            expect(masterService.getValue()).withContext('service returned stub value').toBe(stubValue);
            expect(valueServiceSpy.getValue.calls.count())
                .withContext('spy method was called once')
                .toBe(1);
            expect(valueServiceSpy.getValue.calls.mostRecent().returnValue).toBe(stubValue);
        });
        // #enddocregion master-service-it
    });
    describe('use inject within `it`', () => {
        beforeEach(() => {
            testing_1.TestBed.configureTestingModule({ providers: [demo_1.ValueService] });
        });
        it('should use modified providers', (0, testing_1.inject)([demo_1.ValueService], (service) => {
            service.setValue('value modified in beforeEach');
            expect(service.getValue()).toBe('value modified in beforeEach');
        }));
    });
    describe('using waitForAsync(inject) within beforeEach', () => {
        let serviceValue;
        beforeEach(() => {
            testing_1.TestBed.configureTestingModule({ providers: [demo_1.ValueService] });
        });
        beforeEach((0, testing_1.waitForAsync)((0, testing_1.inject)([demo_1.ValueService], (service) => {
            service.getPromiseValue().then((value) => (serviceValue = value));
        })));
        it('should use asynchronously modified value ... in synchronous test', () => {
            expect(serviceValue).toBe('promise value');
        });
    });
    /////////// Component Tests //////////////////
    describe('TestBed component tests', () => {
        // beforeEach(waitForAsync(() => {
        //   TestBed.configureTestingModule()
        //     // Compile everything in DemoModule
        //     .compileComponents();
        // }));
        it('should create a component with inline template', () => {
            const fixture = testing_1.TestBed.createComponent(demo_1.Child1Component);
            fixture.detectChanges();
            expect(fixture).toHaveText('Child');
        });
        it('should create a component with external template', () => {
            const fixture = testing_1.TestBed.createComponent(demo_1.ExternalTemplateComponent);
            fixture.detectChanges();
            expect(fixture).toHaveText('from external template');
        });
        it('should allow changing members of the component', () => {
            const fixture = testing_1.TestBed.createComponent(demo_1.MyIfComponent);
            fixture.detectChanges();
            expect(fixture).toHaveText('MyIf()');
            fixture.componentInstance.showMore = true;
            fixture.detectChanges();
            expect(fixture).toHaveText('MyIf(More)');
        });
        it('should create a nested component bound to inputs/outputs', () => {
            const fixture = testing_1.TestBed.createComponent(demo_1.IoParentComponent);
            fixture.detectChanges();
            const heroes = fixture.debugElement.queryAll(platform_browser_1.By.css('.hero'));
            expect(heroes.length).withContext('has heroes').toBeGreaterThan(0);
            const comp = fixture.componentInstance;
            const hero = comp.heroes[0];
            (0, testing_2.click)(heroes[0]);
            fixture.detectChanges();
            const selected = fixture.debugElement.query(platform_browser_1.By.css('p'));
            expect(selected).toHaveText(hero.name);
        });
        it('can access the instance variable of an `*ngFor` row component', () => {
            const fixture = testing_1.TestBed.createComponent(demo_1.IoParentComponent);
            const comp = fixture.componentInstance;
            const heroName = comp.heroes[0].name; // first hero's name
            fixture.detectChanges();
            const ngForRow = fixture.debugElement.query(platform_browser_1.By.directive(demo_1.IoComponent)); // first hero ngForRow
            const hero = ngForRow.context.hero; // the hero object passed into the row
            expect(hero.name).withContext('ngRow.context.hero').toBe(heroName);
            const rowComp = ngForRow.componentInstance;
            // jasmine.any is an "instance-of-type" test.
            expect(rowComp).withContext('component is IoComp').toEqual(jasmine.any(demo_1.IoComponent));
            expect(rowComp.hero.name).withContext('component.hero').toBe(heroName);
        });
        it('should support clicking a button', () => {
            const fixture = testing_1.TestBed.createComponent(demo_1.LightswitchComponent);
            const btn = fixture.debugElement.query(platform_browser_1.By.css('button'));
            const span = fixture.debugElement.query(platform_browser_1.By.css('span')).nativeElement;
            fixture.detectChanges();
            expect(span.textContent)
                .withContext('before click')
                .toMatch(/is off/i);
            (0, testing_2.click)(btn);
            fixture.detectChanges();
            expect(span.textContent).withContext('after click').toMatch(/is on/i);
        });
        // ngModel is async so we must wait for it with promise-based `whenStable`
        it('should support entering text in input box (ngModel)', (0, testing_1.waitForAsync)(() => {
            const expectedOrigName = 'John';
            const expectedNewName = 'Sally';
            const fixture = testing_1.TestBed.createComponent(demo_1.InputComponent);
            fixture.detectChanges();
            const comp = fixture.componentInstance;
            const input = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
            expect(comp.name)
                .withContext(`At start name should be ${expectedOrigName} `)
                .toBe(expectedOrigName);
            // wait until ngModel binds comp.name to input box
            fixture
                .whenStable()
                .then(() => {
                expect(input.value)
                    .withContext(`After ngModel updates input box, input.value should be ${expectedOrigName} `)
                    .toBe(expectedOrigName);
                // simulate user entering new name in input
                input.value = expectedNewName;
                // that change doesn't flow to the component immediately
                expect(comp.name)
                    .withContext(`comp.name should still be ${expectedOrigName} after value change, before binding happens`)
                    .toBe(expectedOrigName);
                // Dispatch a DOM event so that Angular learns of input value change.
                // then wait while ngModel pushes input.box value to comp.name
                input.dispatchEvent(new Event('input'));
                return fixture.whenStable();
            })
                .then(() => {
                expect(comp.name)
                    .withContext(`After ngModel updates the model, comp.name should be ${expectedNewName} `)
                    .toBe(expectedNewName);
            });
        }));
        // fakeAsync version of ngModel input test enables sync test style
        // synchronous `tick` replaces asynchronous promise-base `whenStable`
        it('should support entering text in input box (ngModel) - fakeAsync', (0, testing_1.fakeAsync)(() => {
            const expectedOrigName = 'John';
            const expectedNewName = 'Sally';
            const fixture = testing_1.TestBed.createComponent(demo_1.InputComponent);
            fixture.detectChanges();
            const comp = fixture.componentInstance;
            const input = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
            expect(comp.name)
                .withContext(`At start name should be ${expectedOrigName} `)
                .toBe(expectedOrigName);
            // wait until ngModel binds comp.name to input box
            (0, testing_1.tick)();
            expect(input.value)
                .withContext(`After ngModel updates input box, input.value should be ${expectedOrigName} `)
                .toBe(expectedOrigName);
            // simulate user entering new name in input
            input.value = expectedNewName;
            // that change doesn't flow to the component immediately
            expect(comp.name)
                .withContext(`comp.name should still be ${expectedOrigName} after value change, before binding happens`)
                .toBe(expectedOrigName);
            // Dispatch a DOM event so that Angular learns of input value change.
            // then wait a tick while ngModel pushes input.box value to comp.name
            input.dispatchEvent(new Event('input'));
            (0, testing_1.tick)();
            expect(comp.name)
                .withContext(`After ngModel updates the model, comp.name should be ${expectedNewName} `)
                .toBe(expectedNewName);
        }));
        it('ReversePipeComp should reverse the input text', (0, testing_1.fakeAsync)(() => {
            const inputText = 'the quick brown fox.';
            const expectedText = '.xof nworb kciuq eht';
            const fixture = testing_1.TestBed.createComponent(demo_1.ReversePipeComponent);
            fixture.detectChanges();
            const comp = fixture.componentInstance;
            const input = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
            const span = fixture.debugElement.query(platform_browser_1.By.css('span')).nativeElement;
            // simulate user entering new name in input
            input.value = inputText;
            // Dispatch a DOM event so that Angular learns of input value change.
            // then wait a tick while ngModel pushes input.box value to comp.text
            // and Angular updates the output span
            input.dispatchEvent(new Event('input'));
            (0, testing_1.tick)();
            fixture.detectChanges();
            expect(span.textContent).withContext('output span').toBe(expectedText);
            expect(comp.text).withContext('component.text').toBe(inputText);
        }));
        // Use this technique to find attached directives of any kind
        it('can examine attached directives and listeners', () => {
            const fixture = testing_1.TestBed.createComponent(demo_1.InputComponent);
            fixture.detectChanges();
            const inputEl = fixture.debugElement.query(platform_browser_1.By.css('input'));
            expect(inputEl.providerTokens).withContext('NgModel directive').toContain(forms_1.NgModel);
            const ngControl = inputEl.injector.get(forms_1.NgControl);
            expect(ngControl).withContext('NgControl directive').toEqual(jasmine.any(forms_1.NgControl));
            expect(inputEl.listeners.length).withContext('several listeners attached').toBeGreaterThan(2);
        });
        it('BankAccountComponent should set attributes, styles, classes, and properties', () => {
            const fixture = testing_1.TestBed.createComponent(demo_1.BankAccountParentComponent);
            fixture.detectChanges();
            const comp = fixture.componentInstance;
            // the only child is debugElement of the BankAccount component
            const el = fixture.debugElement.children[0];
            const childComp = el.componentInstance;
            expect(childComp).toEqual(jasmine.any(demo_1.BankAccountComponent));
            expect(el.context).withContext('context is the child component').toBe(childComp);
            expect(el.attributes['account']).withContext('account attribute').toBe(childComp.id);
            expect(el.attributes['bank']).withContext('bank attribute').toBe(childComp.bank);
            expect(el.classes['closed']).withContext('closed class').toBe(true);
            expect(el.classes['open']).withContext('open class').toBeFalsy();
            expect(el.styles['color']).withContext('color style').toBe(comp.color);
            expect(el.styles['width'])
                .withContext('width style')
                .toBe(comp.width + 'px');
            // Removed on 12/02/2016 when ceased public discussion of the `Renderer`. Revive in future?
            // expect(el.properties['customProperty']).toBe(true, 'customProperty');
        });
    });
    describe('TestBed component overrides:', () => {
        it("should override ChildComp's template", () => {
            const fixture = testing_1.TestBed.configureTestingModule({
                imports: [demo_1.Child1Component],
            })
                .overrideComponent(demo_1.Child1Component, {
                set: { template: '<span>Fake</span>' },
            })
                .createComponent(demo_1.Child1Component);
            fixture.detectChanges();
            expect(fixture).toHaveText('Fake');
        });
        it("should override TestProvidersComp's ValueService provider", () => {
            const fixture = testing_1.TestBed.configureTestingModule({
                imports: [demo_1.TestProvidersComponent],
            })
                .overrideComponent(demo_1.TestProvidersComponent, {
                remove: { providers: [demo_1.ValueService] },
                add: { providers: [{ provide: demo_1.ValueService, useClass: FakeValueService }] },
                // Or replace them all (this component has only one provider)
                // set:    { providers: [{ provide: ValueService, useClass: FakeValueService }] },
            })
                .createComponent(demo_1.TestProvidersComponent);
            fixture.detectChanges();
            expect(fixture).toHaveText('injected value: faked value', 'text');
            // Explore the providerTokens
            const tokens = fixture.debugElement.providerTokens;
            expect(tokens).withContext('component ctor').toContain(fixture.componentInstance.constructor);
            expect(tokens).withContext('TestProvidersComp').toContain(demo_1.TestProvidersComponent);
            expect(tokens).withContext('ValueService').toContain(demo_1.ValueService);
        });
        it("should override TestViewProvidersComp's ValueService viewProvider", () => {
            const fixture = testing_1.TestBed.configureTestingModule({
                imports: [demo_1.TestViewProvidersComponent],
            })
                .overrideComponent(demo_1.TestViewProvidersComponent, {
                // remove: { viewProviders: [ValueService]},
                // add:    { viewProviders: [{ provide: ValueService, useClass: FakeValueService }]
                // },
                // Or replace them all (this component has only one viewProvider)
                set: { viewProviders: [{ provide: demo_1.ValueService, useClass: FakeValueService }] },
            })
                .createComponent(demo_1.TestViewProvidersComponent);
            fixture.detectChanges();
            expect(fixture).toHaveText('injected value: faked value');
        });
        it("injected provider should not be same as component's provider", () => {
            // TestComponent is parent of TestProvidersComponent
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<my-service-comp></my-service-comp>',
                        imports: [demo_1.TestProvidersComponent],
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
            // 3 levels of ValueService provider: module, TestComponent, TestProvidersComponent
            const fixture = testing_1.TestBed.configureTestingModule({
                imports: [TestComponent, demo_1.TestProvidersComponent],
                providers: [demo_1.ValueService],
            })
                .overrideComponent(TestComponent, {
                set: { providers: [{ provide: demo_1.ValueService, useValue: {} }] },
            })
                .overrideComponent(demo_1.TestProvidersComponent, {
                set: { providers: [{ provide: demo_1.ValueService, useClass: FakeValueService }] },
            })
                .createComponent(TestComponent);
            let testBedProvider;
            // `inject` uses TestBed's injector
            (0, testing_1.inject)([demo_1.ValueService], (s) => (testBedProvider = s))();
            const tcProvider = fixture.debugElement.injector.get(demo_1.ValueService);
            const tpcProvider = fixture.debugElement.children[0].injector.get(demo_1.ValueService);
            expect(testBedProvider).withContext('testBed/tc not same providers').not.toBe(tcProvider);
            expect(testBedProvider).withContext('testBed/tpc not same providers').not.toBe(tpcProvider);
            expect(testBedProvider instanceof demo_1.ValueService)
                .withContext('testBedProvider is ValueService')
                .toBe(true);
            expect(tcProvider)
                .withContext('tcProvider is {}')
                .toEqual({});
            expect(tpcProvider instanceof FakeValueService)
                .withContext('tpcProvider is FakeValueService')
                .toBe(true);
        });
        it('can access template local variables as references', () => {
            const fixture = testing_1.TestBed.configureTestingModule({
                imports: [
                    demo_1.ShellComponent,
                    demo_1.NeedsContentComponent,
                    demo_1.Child1Component,
                    demo_1.Child2Component,
                    demo_1.Child3Component,
                ],
            })
                .overrideComponent(demo_1.ShellComponent, {
                set: {
                    selector: 'test-shell',
                    imports: [demo_1.NeedsContentComponent, demo_1.Child1Component, demo_1.Child2Component, demo_1.Child3Component],
                    template: `
          <needs-content #nc>
            <child-1 #content text="My"></child-1>
            <child-2 #content text="dog"></child-2>
            <child-2 text="has"></child-2>
            <child-3 #content text="fleas"></child-3>
            <div #content>!</div>
          </needs-content>
          `,
                },
            })
                .createComponent(demo_1.ShellComponent);
            fixture.detectChanges();
            // NeedsContentComp is the child of ShellComp
            const el = fixture.debugElement.children[0];
            const comp = el.componentInstance;
            expect(comp.children.toArray().length)
                .withContext('three different child components and an ElementRef with #content')
                .toBe(4);
            expect(el.references['nc']).withContext('#nc reference to component').toBe(comp);
            // #docregion custom-predicate
            // Filter for DebugElements with a #content reference
            const contentRefs = el.queryAll((de) => de.references['content']);
            // #enddocregion custom-predicate
            expect(contentRefs.length).withContext('elements w/ a #content reference').toBe(4);
        });
    });
    describe('nested (one-deep) component override', () => {
        beforeEach(() => {
            testing_1.TestBed.configureTestingModule({
                imports: [demo_1.ParentComponent, FakeChildComponent],
            }).overrideComponent(demo_1.ParentComponent, {
                set: { imports: [FakeChildComponent] },
            });
        });
        it('ParentComp should use Fake Child component', () => {
            const fixture = testing_1.TestBed.createComponent(demo_1.ParentComponent);
            fixture.detectChanges();
            expect(fixture).toHaveText('Parent(Fake Child)');
        });
    });
    describe('nested (two-deep) component override', () => {
        beforeEach(() => {
            testing_1.TestBed.configureTestingModule({
                imports: [demo_1.ParentComponent, FakeChildWithGrandchildComponent, FakeGrandchildComponent],
            }).overrideComponent(demo_1.ParentComponent, {
                set: { imports: [FakeChildWithGrandchildComponent, FakeGrandchildComponent] },
            });
        });
        it('should use Fake Grandchild component', () => {
            const fixture = testing_1.TestBed.createComponent(demo_1.ParentComponent);
            fixture.detectChanges();
            expect(fixture).toHaveText('Parent(Fake Child(Fake Grandchild))');
        });
    });
    describe('lifecycle hooks w/ MyIfParentComp', () => {
        let fixture;
        let parent;
        let child;
        beforeEach(() => {
            testing_1.TestBed.configureTestingModule({
                imports: [forms_1.FormsModule, demo_1.MyIfChildComponent, demo_1.MyIfParentComponent],
            });
            fixture = testing_1.TestBed.createComponent(demo_1.MyIfParentComponent);
            parent = fixture.componentInstance;
        });
        it('should instantiate parent component', () => {
            expect(parent).withContext('parent component should exist').not.toBeNull();
        });
        it('parent component OnInit should NOT be called before first detectChanges()', () => {
            expect(parent.ngOnInitCalled).toBe(false);
        });
        it('parent component OnInit should be called after first detectChanges()', () => {
            fixture.detectChanges();
            expect(parent.ngOnInitCalled).toBe(true);
        });
        it('child component should exist after OnInit', () => {
            fixture.detectChanges();
            getChild();
            expect(child instanceof demo_1.MyIfChildComponent)
                .withContext('should create child')
                .toBe(true);
        });
        it("should have called child component's OnInit ", () => {
            fixture.detectChanges();
            getChild();
            expect(child.ngOnInitCalled).toBe(true);
        });
        it('child component called OnChanges once', () => {
            fixture.detectChanges();
            getChild();
            expect(child.ngOnChangesCounter).toBe(1);
        });
        it('changed parent value flows to child', () => {
            fixture.detectChanges();
            getChild();
            parent.parentValue = 'foo';
            fixture.detectChanges();
            expect(child.ngOnChangesCounter)
                .withContext('expected 2 changes: initial value and changed value')
                .toBe(2);
            expect(child.childValue).withContext('childValue should eq changed parent value').toBe('foo');
        });
        // must be async test to see child flow to parent
        it('changed child value flows to parent', (0, testing_1.waitForAsync)(() => {
            fixture.detectChanges();
            getChild();
            child.childValue = 'bar';
            return new Promise((resolve) => {
                // Wait one JS engine turn!
                setTimeout(() => resolve(), 0);
            }).then(() => {
                fixture.detectChanges();
                expect(child.ngOnChangesCounter)
                    .withContext('expected 2 changes: initial value and changed value')
                    .toBe(2);
                expect(parent.parentValue)
                    .withContext('parentValue should eq changed parent value')
                    .toBe('bar');
            });
        }));
        it('clicking "Close Child" triggers child OnDestroy', () => {
            fixture.detectChanges();
            getChild();
            const btn = fixture.debugElement.query(platform_browser_1.By.css('button'));
            (0, testing_2.click)(btn);
            fixture.detectChanges();
            expect(child.ngOnDestroyCalled).toBe(true);
        });
        ////// helpers ///
        /**
         * Get the MyIfChildComp from parent; fail w/ good message if cannot.
         */
        function getChild() {
            let childDe; // DebugElement that should hold the MyIfChildComp
            // The Hard Way: requires detailed knowledge of the parent template
            try {
                childDe = fixture.debugElement.children[4].children[0];
            }
            catch (err) {
                /* we'll report the error */
            }
            // DebugElement.queryAll: if we wanted all of many instances:
            childDe = fixture.debugElement.queryAll((de) => de.componentInstance instanceof demo_1.MyIfChildComponent)[0];
            // WE'LL USE THIS APPROACH !
            // DebugElement.query: find first instance (if any)
            childDe = fixture.debugElement.query((de) => de.componentInstance instanceof demo_1.MyIfChildComponent);
            if (childDe && childDe.componentInstance) {
                child = childDe.componentInstance;
            }
            else {
                fail('Unable to find MyIfChildComp within MyIfParentComp');
            }
            return child;
        }
    });
});
////////// Fakes ///////////
let FakeChildComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'child-1',
            template: 'Fake Child',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var FakeChildComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "FakeChildComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FakeChildComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FakeChildComponent = _classThis;
})();
let FakeGrandchildComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'grandchild-1',
            template: 'Fake Grandchild',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var FakeGrandchildComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "FakeGrandchildComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FakeGrandchildComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FakeGrandchildComponent = _classThis;
})();
let FakeChildWithGrandchildComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'child-1',
            imports: [FakeGrandchildComponent],
            template: 'Fake Child(<grandchild-1></grandchild-1>)',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var FakeChildWithGrandchildComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "FakeChildWithGrandchildComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FakeChildWithGrandchildComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FakeChildWithGrandchildComponent = _classThis;
})();
let FakeValueService = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = demo_1.ValueService;
    var FakeValueService = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.value = 'faked value';
        }
    };
    __setFunctionName(_classThis, "FakeValueService");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FakeValueService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FakeValueService = _classThis;
})();
