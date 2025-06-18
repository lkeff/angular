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
const compiler_1 = require("@angular/compiler");
const core_1 = require("../../src/core");
const testing_1 = require("../../testing");
const by_1 = require("@angular/platform-browser/src/dom/debug/by");
const browser_util_1 = require("@angular/platform-browser/testing/src/browser_util");
const matchers_1 = require("@angular/platform-browser/testing/src/matchers");
const resource_loader_mock_1 = require("./resource_loader_mock");
const animations_1 = require("@angular/platform-browser/animations");
const TEST_COMPILER_PROVIDERS = [
    { provide: compiler_1.ResourceLoader, useClass: resource_loader_mock_1.MockResourceLoader, deps: [] },
];
(function () {
    let renderLog;
    let directiveLog;
    function createCompFixture(template, compType = TestComponent) {
        testing_1.TestBed.overrideComponent(compType, { set: new core_1.Component({ template }) });
        initHelpers();
        return testing_1.TestBed.createComponent(compType);
    }
    function initHelpers() {
        renderLog = testing_1.TestBed.inject(RenderLog);
        directiveLog = testing_1.TestBed.inject(DirectiveLog);
        patchLoggingRenderer2(testing_1.TestBed.inject(core_1.RendererFactory2), renderLog);
    }
    function queryDirs(el, dirType) {
        const nodes = el.queryAllNodes(by_1.By.directive(dirType));
        return nodes.map((node) => node.injector.get(dirType));
    }
    function _bindSimpleProp(bindAttr, compType = TestComponent) {
        const template = `<div ${bindAttr}></div>`;
        return createCompFixture(template, compType);
    }
    function _bindSimpleValue(expression, compType = TestComponent) {
        return _bindSimpleProp(`[id]='${expression}'`, compType);
    }
    function _bindAndCheckSimpleValue(expression, compType = TestComponent) {
        const ctx = _bindSimpleValue(expression, compType);
        ctx.detectChanges(false);
        return renderLog.log;
    }
    describe(`ChangeDetection`, () => {
        beforeEach(() => {
            testing_1.TestBed.configureCompiler({ providers: TEST_COMPILER_PROVIDERS });
            testing_1.TestBed.configureTestingModule({
                imports: [animations_1.NoopAnimationsModule],
                declarations: [
                    TestData,
                    TestDirective,
                    TestComponent,
                    AnotherComponent,
                    TestLocals,
                    CompWithRef,
                    WrapCompWithRef,
                    EmitterDirective,
                    PushComp,
                    OnDestroyDirective,
                    OrderCheckDirective2,
                    OrderCheckDirective0,
                    OrderCheckDirective1,
                    Gh9882,
                    Uninitialized,
                    Person,
                    PersonHolder,
                    PersonHolderHolder,
                    CountingPipe,
                    CountingImpurePipe,
                    MultiArgPipe,
                    PipeWithOnDestroy,
                    IdentityPipe,
                ],
                providers: [RenderLog, DirectiveLog],
            });
        });
        describe('expressions', () => {
            it('should support literals', (0, testing_1.fakeAsync)(() => {
                (0, matchers_1.expect)(_bindAndCheckSimpleValue(10)).toEqual(['id=10']);
            }));
            it('should strip quotes from literals', (0, testing_1.fakeAsync)(() => {
                (0, matchers_1.expect)(_bindAndCheckSimpleValue('"str"')).toEqual(['id=str']);
            }));
            it('should support newlines in literals', (0, testing_1.fakeAsync)(() => {
                (0, matchers_1.expect)(_bindAndCheckSimpleValue('"a\n\nb"')).toEqual(['id=a\n\nb']);
            }));
            it('should support + operations', (0, testing_1.fakeAsync)(() => {
                (0, matchers_1.expect)(_bindAndCheckSimpleValue('10 + 2')).toEqual(['id=12']);
            }));
            it('should support - operations', (0, testing_1.fakeAsync)(() => {
                (0, matchers_1.expect)(_bindAndCheckSimpleValue('10 - 2')).toEqual(['id=8']);
            }));
            it('should support * operations', (0, testing_1.fakeAsync)(() => {
                (0, matchers_1.expect)(_bindAndCheckSimpleValue('10 * 2')).toEqual(['id=20']);
            }));
            it('should support / operations', (0, testing_1.fakeAsync)(() => {
                (0, matchers_1.expect)(_bindAndCheckSimpleValue('10 / 2')).toEqual([`id=5`]);
            }));
            it('should support % operations', (0, testing_1.fakeAsync)(() => {
                (0, matchers_1.expect)(_bindAndCheckSimpleValue('11 % 2')).toEqual(['id=1']);
            }));
            it('should support == operations on identical', (0, testing_1.fakeAsync)(() => {
                (0, matchers_1.expect)(_bindAndCheckSimpleValue('1 == 1')).toEqual(['id=true']);
            }));
            it('should support != operations', (0, testing_1.fakeAsync)(() => {
                (0, matchers_1.expect)(_bindAndCheckSimpleValue('1 != 1')).toEqual(['id=false']);
            }));
            it('should support == operations on coerceible', (0, testing_1.fakeAsync)(() => {
                (0, matchers_1.expect)(_bindAndCheckSimpleValue('1 == true')).toEqual([`id=true`]);
            }));
            it('should support === operations on identical', (0, testing_1.fakeAsync)(() => {
                (0, matchers_1.expect)(_bindAndCheckSimpleValue('1 === 1')).toEqual(['id=true']);
            }));
            it('should support !== operations', (0, testing_1.fakeAsync)(() => {
                (0, matchers_1.expect)(_bindAndCheckSimpleValue('1 !== 1')).toEqual(['id=false']);
            }));
            it('should support === operations on coerceible', (0, testing_1.fakeAsync)(() => {
                (0, matchers_1.expect)(_bindAndCheckSimpleValue('1 === true')).toEqual(['id=false']);
            }));
            it('should support true < operations', (0, testing_1.fakeAsync)(() => {
                (0, matchers_1.expect)(_bindAndCheckSimpleValue('1 < 2')).toEqual(['id=true']);
            }));
            it('should support false < operations', (0, testing_1.fakeAsync)(() => {
                (0, matchers_1.expect)(_bindAndCheckSimpleValue('2 < 1')).toEqual(['id=false']);
            }));
            it('should support false > operations', (0, testing_1.fakeAsync)(() => {
                (0, matchers_1.expect)(_bindAndCheckSimpleValue('1 > 2')).toEqual(['id=false']);
            }));
            it('should support true > operations', (0, testing_1.fakeAsync)(() => {
                (0, matchers_1.expect)(_bindAndCheckSimpleValue('2 > 1')).toEqual(['id=true']);
            }));
            it('should support true <= operations', (0, testing_1.fakeAsync)(() => {
                (0, matchers_1.expect)(_bindAndCheckSimpleValue('1 <= 2')).toEqual(['id=true']);
            }));
            it('should support equal <= operations', (0, testing_1.fakeAsync)(() => {
                (0, matchers_1.expect)(_bindAndCheckSimpleValue('2 <= 2')).toEqual(['id=true']);
            }));
            it('should support false <= operations', (0, testing_1.fakeAsync)(() => {
                (0, matchers_1.expect)(_bindAndCheckSimpleValue('2 <= 1')).toEqual(['id=false']);
            }));
            it('should support true >= operations', (0, testing_1.fakeAsync)(() => {
                (0, matchers_1.expect)(_bindAndCheckSimpleValue('2 >= 1')).toEqual(['id=true']);
            }));
            it('should support equal >= operations', (0, testing_1.fakeAsync)(() => {
                (0, matchers_1.expect)(_bindAndCheckSimpleValue('2 >= 2')).toEqual(['id=true']);
            }));
            it('should support false >= operations', (0, testing_1.fakeAsync)(() => {
                (0, matchers_1.expect)(_bindAndCheckSimpleValue('1 >= 2')).toEqual(['id=false']);
            }));
            it('should support true && operations', (0, testing_1.fakeAsync)(() => {
                (0, matchers_1.expect)(_bindAndCheckSimpleValue('true && true')).toEqual(['id=true']);
            }));
            it('should support false && operations', (0, testing_1.fakeAsync)(() => {
                (0, matchers_1.expect)(_bindAndCheckSimpleValue('true && false')).toEqual(['id=false']);
            }));
            it('should support true || operations', (0, testing_1.fakeAsync)(() => {
                (0, matchers_1.expect)(_bindAndCheckSimpleValue('true || false')).toEqual(['id=true']);
            }));
            it('should support false || operations', (0, testing_1.fakeAsync)(() => {
                (0, matchers_1.expect)(_bindAndCheckSimpleValue('false || false')).toEqual(['id=false']);
            }));
            it('should support negate', (0, testing_1.fakeAsync)(() => {
                (0, matchers_1.expect)(_bindAndCheckSimpleValue('!true')).toEqual(['id=false']);
            }));
            it('should support double negate', (0, testing_1.fakeAsync)(() => {
                (0, matchers_1.expect)(_bindAndCheckSimpleValue('!!true')).toEqual(['id=true']);
            }));
            it('should support true conditionals', (0, testing_1.fakeAsync)(() => {
                (0, matchers_1.expect)(_bindAndCheckSimpleValue('1 < 2 ? 1 : 2')).toEqual(['id=1']);
            }));
            it('should support false conditionals', (0, testing_1.fakeAsync)(() => {
                (0, matchers_1.expect)(_bindAndCheckSimpleValue('1 > 2 ? 1 : 2')).toEqual(['id=2']);
            }));
            it('should support keyed access to a list item', (0, testing_1.fakeAsync)(() => {
                (0, matchers_1.expect)(_bindAndCheckSimpleValue('["foo", "bar"][0]')).toEqual(['id=foo']);
            }));
            it('should support keyed access to a map item', (0, testing_1.fakeAsync)(() => {
                (0, matchers_1.expect)(_bindAndCheckSimpleValue('{"foo": "bar"}["foo"]')).toEqual(['id=bar']);
            }));
            it('should report all changes on the first run including uninitialized values', (0, testing_1.fakeAsync)(() => {
                (0, matchers_1.expect)(_bindAndCheckSimpleValue('value', Uninitialized)).toEqual(['id=null']);
            }));
            it('should report all changes on the first run including null values', (0, testing_1.fakeAsync)(() => {
                const ctx = _bindSimpleValue('a', TestData);
                ctx.componentInstance.a = null;
                ctx.detectChanges(false);
                (0, matchers_1.expect)(renderLog.log).toEqual(['id=null']);
            }));
            it('should support simple chained property access', (0, testing_1.fakeAsync)(() => {
                const ctx = _bindSimpleValue('address.city', Person);
                ctx.componentInstance.name = 'Victor';
                ctx.componentInstance.address = new Address('Grenoble');
                ctx.detectChanges(false);
                (0, matchers_1.expect)(renderLog.log).toEqual(['id=Grenoble']);
            }));
            describe('safe navigation operator', () => {
                it('should support reading properties of nulls', (0, testing_1.fakeAsync)(() => {
                    const ctx = _bindSimpleValue('address?.city', Person);
                    ctx.componentInstance.address = null;
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(renderLog.log).toEqual(['id=null']);
                }));
                it('should support calling methods on nulls', (0, testing_1.fakeAsync)(() => {
                    const ctx = _bindSimpleValue('address?.toString()', Person);
                    ctx.componentInstance.address = null;
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(renderLog.log).toEqual(['id=null']);
                }));
                it('should support reading properties on non nulls', (0, testing_1.fakeAsync)(() => {
                    const ctx = _bindSimpleValue('address?.city', Person);
                    ctx.componentInstance.address = new Address('MTV');
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(renderLog.log).toEqual(['id=MTV']);
                }));
                it('should support calling methods on non nulls', (0, testing_1.fakeAsync)(() => {
                    const ctx = _bindSimpleValue('address?.toString()', Person);
                    ctx.componentInstance.address = new Address('MTV');
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(renderLog.log).toEqual(['id=MTV']);
                }));
                it('should support short-circuting safe navigation', (0, testing_1.fakeAsync)(() => {
                    const ctx = _bindSimpleValue('value?.address.city', PersonHolder);
                    ctx.componentInstance.value = null;
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(renderLog.log).toEqual(['id=null']);
                }));
                it('should support nested short-circuting safe navigation', (0, testing_1.fakeAsync)(() => {
                    const ctx = _bindSimpleValue('value.value?.address.city', PersonHolderHolder);
                    ctx.componentInstance.value = new PersonHolder();
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(renderLog.log).toEqual(['id=null']);
                }));
                it('should support chained short-circuting safe navigation', (0, testing_1.fakeAsync)(() => {
                    const ctx = _bindSimpleValue('value?.value?.address.city', PersonHolderHolder);
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(renderLog.log).toEqual(['id=null']);
                }));
                it('should support short-circuting array index operations', (0, testing_1.fakeAsync)(() => {
                    const ctx = _bindSimpleValue('value?.phones[0]', PersonHolder);
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(renderLog.log).toEqual(['id=null']);
                }));
                it('should still throw if right-side would throw', (0, testing_1.fakeAsync)(() => {
                    (0, matchers_1.expect)(() => {
                        const ctx = _bindSimpleValue('value?.address.city', PersonHolder);
                        const person = new Person();
                        person.address = null;
                        ctx.componentInstance.value = person;
                        ctx.detectChanges(false);
                    }).toThrow();
                }));
            });
            it('should support method calls', (0, testing_1.fakeAsync)(() => {
                const ctx = _bindSimpleValue('sayHi("Jim")', Person);
                ctx.detectChanges(false);
                (0, matchers_1.expect)(renderLog.log).toEqual(['id=Hi, Jim']);
            }));
            it('should support function calls', (0, testing_1.fakeAsync)(() => {
                const ctx = _bindSimpleValue('a()(99)', TestData);
                ctx.componentInstance.a = () => (a) => a;
                ctx.detectChanges(false);
                (0, matchers_1.expect)(renderLog.log).toEqual(['id=99']);
            }));
            it('should support chained method calls', (0, testing_1.fakeAsync)(() => {
                const ctx = _bindSimpleValue('address.toString()', Person);
                ctx.componentInstance.address = new Address('MTV');
                ctx.detectChanges(false);
                (0, matchers_1.expect)(renderLog.log).toEqual(['id=MTV']);
            }));
            it('should support NaN', (0, testing_1.fakeAsync)(() => {
                const ctx = _bindSimpleValue('age', Person);
                ctx.componentInstance.age = NaN;
                ctx.detectChanges(false);
                (0, matchers_1.expect)(renderLog.log).toEqual(['id=NaN']);
                renderLog.clear();
                ctx.detectChanges(false);
                (0, matchers_1.expect)(renderLog.log).toEqual([]);
            }));
            it('should do simple watching', (0, testing_1.fakeAsync)(() => {
                const ctx = _bindSimpleValue('name', Person);
                ctx.componentInstance.name = 'misko';
                ctx.detectChanges(false);
                (0, matchers_1.expect)(renderLog.log).toEqual(['id=misko']);
                renderLog.clear();
                ctx.detectChanges(false);
                (0, matchers_1.expect)(renderLog.log).toEqual([]);
                renderLog.clear();
                ctx.componentInstance.name = 'Misko';
                ctx.detectChanges(false);
                (0, matchers_1.expect)(renderLog.log).toEqual(['id=Misko']);
            }));
            it('should support literal array made of literals', (0, testing_1.fakeAsync)(() => {
                const ctx = _bindSimpleValue('[1, 2]');
                ctx.detectChanges(false);
                (0, matchers_1.expect)(renderLog.loggedValues).toEqual([[1, 2]]);
            }));
            it('should support empty literal array', (0, testing_1.fakeAsync)(() => {
                const ctx = _bindSimpleValue('[]');
                ctx.detectChanges(false);
                (0, matchers_1.expect)(renderLog.loggedValues).toEqual([[]]);
            }));
            it('should support literal array made of expressions', (0, testing_1.fakeAsync)(() => {
                const ctx = _bindSimpleValue('[1, a]', TestData);
                ctx.componentInstance.a = 2;
                ctx.detectChanges(false);
                (0, matchers_1.expect)(renderLog.loggedValues).toEqual([[1, 2]]);
            }));
            it('should not recreate literal arrays unless their content changed', (0, testing_1.fakeAsync)(() => {
                const ctx = _bindSimpleValue('[1, a]', TestData);
                ctx.componentInstance.a = 2;
                ctx.detectChanges(false);
                ctx.detectChanges(false);
                ctx.componentInstance.a = 3;
                ctx.detectChanges(false);
                ctx.detectChanges(false);
                (0, matchers_1.expect)(renderLog.loggedValues).toEqual([
                    [1, 2],
                    [1, 3],
                ]);
            }));
            it('should support literal maps made of literals', (0, testing_1.fakeAsync)(() => {
                const ctx = _bindSimpleValue('{z: 1}');
                ctx.detectChanges(false);
                (0, matchers_1.expect)(renderLog.loggedValues[0]['z']).toEqual(1);
            }));
            it('should support empty literal map', (0, testing_1.fakeAsync)(() => {
                const ctx = _bindSimpleValue('{}');
                ctx.detectChanges(false);
                (0, matchers_1.expect)(renderLog.loggedValues).toEqual([{}]);
            }));
            it('should support literal maps made of expressions', (0, testing_1.fakeAsync)(() => {
                const ctx = _bindSimpleValue('{z: a}');
                ctx.componentInstance.a = 1;
                ctx.detectChanges(false);
                (0, matchers_1.expect)(renderLog.loggedValues[0]['z']).toEqual(1);
            }));
            it('should not recreate literal maps unless their content changed', (0, testing_1.fakeAsync)(() => {
                const ctx = _bindSimpleValue('{z: a}');
                ctx.componentInstance.a = 1;
                ctx.detectChanges(false);
                ctx.detectChanges(false);
                ctx.componentInstance.a = 2;
                ctx.detectChanges(false);
                ctx.detectChanges(false);
                (0, matchers_1.expect)(renderLog.loggedValues.length).toBe(2);
                (0, matchers_1.expect)(renderLog.loggedValues[0]['z']).toEqual(1);
                (0, matchers_1.expect)(renderLog.loggedValues[1]['z']).toEqual(2);
            }));
            it('should ignore empty bindings', (0, testing_1.fakeAsync)(() => {
                const ctx = _bindSimpleProp('[id]', TestData);
                ctx.componentInstance.a = 'value';
                ctx.detectChanges(false);
                (0, matchers_1.expect)(renderLog.log).toEqual([]);
            }));
            it('should support interpolation', (0, testing_1.fakeAsync)(() => {
                const ctx = _bindSimpleProp('id="B{{a}}A"', TestData);
                ctx.componentInstance.a = 'value';
                ctx.detectChanges(false);
                (0, matchers_1.expect)(renderLog.log).toEqual(['id=BvalueA']);
            }));
            it('should output empty strings for null values in interpolation', (0, testing_1.fakeAsync)(() => {
                const ctx = _bindSimpleProp('id="B{{a}}A"', TestData);
                ctx.componentInstance.a = null;
                ctx.detectChanges(false);
                (0, matchers_1.expect)(renderLog.log).toEqual(['id=BA']);
            }));
            it('should escape values in literals that indicate interpolation', (0, testing_1.fakeAsync)(() => {
                (0, matchers_1.expect)(_bindAndCheckSimpleValue('"$"')).toEqual(['id=$']);
            }));
            it('should read locals', (0, testing_1.fakeAsync)(() => {
                const ctx = createCompFixture('<ng-template testLocals let-local="someLocal">{{local}}</ng-template>');
                ctx.detectChanges(false);
                (0, matchers_1.expect)(renderLog.log).toEqual(['{{someLocalValue}}']);
            }));
            describe('pipes', () => {
                it('should use the return value of the pipe', (0, testing_1.fakeAsync)(() => {
                    const ctx = _bindSimpleValue('name | countingPipe', Person);
                    ctx.componentInstance.name = 'bob';
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(renderLog.loggedValues).toEqual(['bob state:0']);
                }));
                it('should support arguments in pipes', (0, testing_1.fakeAsync)(() => {
                    const ctx = _bindSimpleValue('name | multiArgPipe:"one":address.city', Person);
                    ctx.componentInstance.name = 'value';
                    ctx.componentInstance.address = new Address('two');
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(renderLog.loggedValues).toEqual(['value one two default']);
                }));
                it('should associate pipes right-to-left', (0, testing_1.fakeAsync)(() => {
                    const ctx = _bindSimpleValue('name | multiArgPipe:"a":"b" | multiArgPipe:0:1', Person);
                    ctx.componentInstance.name = 'value';
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(renderLog.loggedValues).toEqual(['value a b default 0 1 default']);
                }));
                it('should support calling pure pipes with different number of arguments', (0, testing_1.fakeAsync)(() => {
                    const ctx = _bindSimpleValue('name | multiArgPipe:"a":"b" | multiArgPipe:0:1:2', Person);
                    ctx.componentInstance.name = 'value';
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(renderLog.loggedValues).toEqual(['value a b default 0 1 2']);
                }));
                it('should do nothing when no change', (0, testing_1.fakeAsync)(() => {
                    const ctx = _bindSimpleValue('"Megatron" | identityPipe', Person);
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(renderLog.log).toEqual(['id=Megatron']);
                    renderLog.clear();
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(renderLog.log).toEqual([]);
                }));
                it('should call pure pipes only if the arguments change', (0, testing_1.fakeAsync)(() => {
                    const ctx = _bindSimpleValue('name | countingPipe', Person);
                    // change from undefined -> null
                    ctx.componentInstance.name = null;
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(renderLog.loggedValues).toEqual(['null state:0']);
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(renderLog.loggedValues).toEqual(['null state:0']);
                    // change from null -> some value
                    ctx.componentInstance.name = 'bob';
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(renderLog.loggedValues).toEqual(['null state:0', 'bob state:1']);
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(renderLog.loggedValues).toEqual(['null state:0', 'bob state:1']);
                    // change from some value -> some other value
                    ctx.componentInstance.name = 'bart';
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(renderLog.loggedValues).toEqual(['null state:0', 'bob state:1', 'bart state:2']);
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(renderLog.loggedValues).toEqual(['null state:0', 'bob state:1', 'bart state:2']);
                }));
                it('should call pure pipes that are used multiple times only when the arguments change', (0, testing_1.fakeAsync)(() => {
                    const ctx = createCompFixture(`<div [id]="name | countingPipe"></div><div [id]="age | countingPipe"></div>` +
                        '<div *ngFor="let x of [1,2]" [id]="address.city | countingPipe"></div>', Person);
                    ctx.componentInstance.name = 'a';
                    ctx.componentInstance.age = 10;
                    ctx.componentInstance.address = new Address('mtv');
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(renderLog.loggedValues).toEqual([
                        'a state:0',
                        '10 state:0',
                        'mtv state:0',
                        'mtv state:0',
                    ]);
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(renderLog.loggedValues).toEqual([
                        'a state:0',
                        '10 state:0',
                        'mtv state:0',
                        'mtv state:0',
                    ]);
                    ctx.componentInstance.age = 11;
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(renderLog.loggedValues).toEqual([
                        'a state:0',
                        '10 state:0',
                        'mtv state:0',
                        'mtv state:0',
                        '11 state:1',
                    ]);
                }));
                it('should call impure pipes on each change detection run', (0, testing_1.fakeAsync)(() => {
                    const ctx = _bindSimpleValue('name | countingImpurePipe', Person);
                    ctx.componentInstance.name = 'bob';
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(renderLog.loggedValues).toEqual(['bob state:0']);
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(renderLog.loggedValues).toEqual(['bob state:0', 'bob state:1']);
                }));
            });
            describe('event expressions', () => {
                it('should support field assignments', (0, testing_1.fakeAsync)(() => {
                    const ctx = _bindSimpleProp('(event)="b=a=$event"');
                    const childEl = ctx.debugElement.children[0];
                    const evt = 'EVENT';
                    childEl.triggerEventHandler('event', evt);
                    (0, matchers_1.expect)(ctx.componentInstance.a).toEqual(evt);
                    (0, matchers_1.expect)(ctx.componentInstance.b).toEqual(evt);
                }));
                it('should support keyed assignments', (0, testing_1.fakeAsync)(() => {
                    const ctx = _bindSimpleProp('(event)="a[0]=$event"');
                    const childEl = ctx.debugElement.children[0];
                    ctx.componentInstance.a = ['OLD'];
                    const evt = 'EVENT';
                    childEl.triggerEventHandler('event', evt);
                    (0, matchers_1.expect)(ctx.componentInstance.a).toEqual([evt]);
                }));
                it('should support chains', (0, testing_1.fakeAsync)(() => {
                    const ctx = _bindSimpleProp('(event)="a=a+1; a=a+1;"');
                    const childEl = ctx.debugElement.children[0];
                    ctx.componentInstance.a = 0;
                    childEl.triggerEventHandler('event', 'EVENT');
                    (0, matchers_1.expect)(ctx.componentInstance.a).toEqual(2);
                }));
                it('should support empty literals', (0, testing_1.fakeAsync)(() => {
                    const ctx = _bindSimpleProp('(event)="a=[{},[]]"');
                    const childEl = ctx.debugElement.children[0];
                    childEl.triggerEventHandler('event', 'EVENT');
                    (0, matchers_1.expect)(ctx.componentInstance.a).toEqual([{}, []]);
                }));
                xit('should throw when trying to assign to a local', (0, testing_1.fakeAsync)(() => {
                    (0, matchers_1.expect)(() => {
                        _bindSimpleProp('(event)="$event=1"');
                    }).toThrowError(new RegExp('Cannot assign value (.*) to template variable (.*). Template variables are read-only.'));
                }));
                it('should support short-circuiting', (0, testing_1.fakeAsync)(() => {
                    const ctx = _bindSimpleProp('(event)="true ? a = a + 1 : a = a + 1"');
                    const childEl = ctx.debugElement.children[0];
                    ctx.componentInstance.a = 0;
                    childEl.triggerEventHandler('event', 'EVENT');
                    (0, matchers_1.expect)(ctx.componentInstance.a).toEqual(1);
                }));
            });
        });
        describe('RendererFactory', () => {
            it('should call the begin and end methods on the renderer factory when change detection is called', (0, testing_1.fakeAsync)(() => {
                const ctx = createCompFixture('<div testDirective [a]="42"></div>');
                const rf = testing_1.TestBed.inject(core_1.RendererFactory2);
                // TODO: @JiaLiPassion, need to wait @types/jasmine to fix the
                // optional method infer issue.
                // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/43486
                spyOn(rf, 'begin');
                spyOn(rf, 'end');
                (0, matchers_1.expect)(rf.begin).not.toHaveBeenCalled();
                (0, matchers_1.expect)(rf.end).not.toHaveBeenCalled();
                ctx.detectChanges(false);
                (0, matchers_1.expect)(rf.begin).toHaveBeenCalled();
                (0, matchers_1.expect)(rf.end).toHaveBeenCalled();
            }));
        });
        describe('change notification', () => {
            describe('updating directives', () => {
                it('should happen without invoking the renderer', (0, testing_1.fakeAsync)(() => {
                    const ctx = createCompFixture('<div testDirective [a]="42"></div>');
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(renderLog.log).toEqual([]);
                    (0, matchers_1.expect)(queryDirs(ctx.debugElement, TestDirective)[0].a).toEqual(42);
                }));
            });
            describe('reading directives', () => {
                it('should read directive properties', (0, testing_1.fakeAsync)(() => {
                    const ctx = createCompFixture('<div testDirective [a]="42" ref-dir="testDirective" [id]="dir.a"></div>');
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(renderLog.loggedValues).toEqual([42]);
                }));
            });
            describe('ngOnChanges', () => {
                it('should notify the directive when a group of records changes', (0, testing_1.fakeAsync)(() => {
                    const ctx = createCompFixture('<div [testDirective]="\'aName\'" [a]="1" [b]="2"></div><div [testDirective]="\'bName\'" [a]="4"></div>');
                    ctx.detectChanges(false);
                    const dirs = queryDirs(ctx.debugElement, TestDirective);
                    (0, matchers_1.expect)(dirs[0].changes).toEqual({
                        'a': new core_1.SimpleChange(undefined, 1, true),
                        'b': new core_1.SimpleChange(undefined, 2, true),
                        'name': new core_1.SimpleChange(undefined, 'aName', true),
                    });
                    (0, matchers_1.expect)(dirs[1].changes).toEqual({
                        'a': new core_1.SimpleChange(undefined, 4, true),
                        'name': new core_1.SimpleChange(undefined, 'bName', true),
                    });
                }));
            });
        });
        describe('lifecycle', () => {
            function createCompWithContentAndViewChild() {
                testing_1.TestBed.overrideComponent(AnotherComponent, {
                    set: new core_1.Component({
                        selector: 'other-cmp',
                        template: '<div testDirective="viewChild"></div>',
                    }),
                });
                return createCompFixture('<div testDirective="parent"><div *ngIf="true" testDirective="contentChild"></div><other-cmp></other-cmp></div>', TestComponent);
            }
            describe('ngOnInit', () => {
                it('should be called after ngOnChanges', (0, testing_1.fakeAsync)(() => {
                    const ctx = createCompFixture('<div testDirective="dir"></div>');
                    (0, matchers_1.expect)(directiveLog.filter(['ngOnInit', 'ngOnChanges'])).toEqual([]);
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(directiveLog.filter(['ngOnInit', 'ngOnChanges'])).toEqual([
                        'dir.ngOnChanges',
                        'dir.ngOnInit',
                    ]);
                    directiveLog.clear();
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(directiveLog.filter(['ngOnInit'])).toEqual([]);
                }));
                it('should only be called only once', (0, testing_1.fakeAsync)(() => {
                    const ctx = createCompFixture('<div testDirective="dir"></div>');
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(directiveLog.filter(['ngOnInit'])).toEqual(['dir.ngOnInit']);
                    // reset directives
                    directiveLog.clear();
                    // Verify that checking should not call them.
                    ctx.checkNoChanges();
                    (0, matchers_1.expect)(directiveLog.filter(['ngOnInit'])).toEqual([]);
                    // re-verify that changes should not call them
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(directiveLog.filter(['ngOnInit'])).toEqual([]);
                }));
                it('should not call ngOnInit again if it throws', (0, testing_1.fakeAsync)(() => {
                    const ctx = createCompFixture('<div testDirective="dir" throwOn="ngOnInit"></div>');
                    let errored = false;
                    // First pass fails, but ngOnInit should be called.
                    try {
                        ctx.detectChanges(false);
                    }
                    catch (e) {
                        (0, matchers_1.expect)(e.message).toBe('Boom!');
                        errored = true;
                    }
                    (0, matchers_1.expect)(errored).toBe(true);
                    (0, matchers_1.expect)(directiveLog.filter(['ngOnInit'])).toEqual(['dir.ngOnInit']);
                    directiveLog.clear();
                    // Second change detection also fails, but this time ngOnInit should not be called.
                    try {
                        ctx.detectChanges(false);
                    }
                    catch (e) {
                        (0, matchers_1.expect)(e.message).toBe('Boom!');
                        throw new Error('Second detectChanges() should not have called ngOnInit.');
                    }
                    (0, matchers_1.expect)(directiveLog.filter(['ngOnInit'])).toEqual([]);
                }));
            });
            describe('ngDoCheck', () => {
                it('should be called after ngOnInit', (0, testing_1.fakeAsync)(() => {
                    const ctx = createCompFixture('<div testDirective="dir"></div>');
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(directiveLog.filter(['ngDoCheck', 'ngOnInit'])).toEqual([
                        'dir.ngOnInit',
                        'dir.ngDoCheck',
                    ]);
                }));
                it('should be called on every detectChanges run, except for checkNoChanges', (0, testing_1.fakeAsync)(() => {
                    const ctx = createCompFixture('<div testDirective="dir"></div>');
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(directiveLog.filter(['ngDoCheck'])).toEqual(['dir.ngDoCheck']);
                    // reset directives
                    directiveLog.clear();
                    // Verify that checking should not call them.
                    ctx.checkNoChanges();
                    (0, matchers_1.expect)(directiveLog.filter(['ngDoCheck'])).toEqual([]);
                    // re-verify that changes are still detected
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(directiveLog.filter(['ngDoCheck'])).toEqual(['dir.ngDoCheck']);
                }));
            });
            describe('ngAfterContentInit', () => {
                it('should be called after processing the content children but before the view children', (0, testing_1.fakeAsync)(() => {
                    const ctx = createCompWithContentAndViewChild();
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(directiveLog.filter(['ngDoCheck', 'ngAfterContentInit'])).toEqual([
                        'parent.ngDoCheck',
                        'contentChild.ngDoCheck',
                        'contentChild.ngAfterContentInit',
                        'parent.ngAfterContentInit',
                        'viewChild.ngDoCheck',
                        'viewChild.ngAfterContentInit',
                    ]);
                }));
                it('should only be called only once', (0, testing_1.fakeAsync)(() => {
                    const ctx = createCompFixture('<div testDirective="dir"></div>');
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(directiveLog.filter(['ngAfterContentInit'])).toEqual(['dir.ngAfterContentInit']);
                    // reset directives
                    directiveLog.clear();
                    // Verify that checking should not call them.
                    ctx.checkNoChanges();
                    (0, matchers_1.expect)(directiveLog.filter(['ngAfterContentInit'])).toEqual([]);
                    // re-verify that changes should not call them
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(directiveLog.filter(['ngAfterContentInit'])).toEqual([]);
                }));
                it('should not call ngAfterContentInit again if it throws', (0, testing_1.fakeAsync)(() => {
                    const ctx = createCompFixture('<div testDirective="dir" throwOn="ngAfterContentInit"></div>');
                    let errored = false;
                    // First pass fails, but ngAfterContentInit should be called.
                    try {
                        ctx.detectChanges(false);
                    }
                    catch (e) {
                        errored = true;
                    }
                    (0, matchers_1.expect)(errored).toBe(true);
                    (0, matchers_1.expect)(directiveLog.filter(['ngAfterContentInit'])).toEqual(['dir.ngAfterContentInit']);
                    directiveLog.clear();
                    // Second change detection also fails, but this time ngAfterContentInit should not be
                    // called.
                    try {
                        ctx.detectChanges(false);
                    }
                    catch (e) {
                        throw new Error('Second detectChanges() should not have run detection.');
                    }
                    (0, matchers_1.expect)(directiveLog.filter(['ngAfterContentInit'])).toEqual([]);
                }));
            });
            describe('ngAfterContentChecked', () => {
                it('should be called after the content children but before the view children', (0, testing_1.fakeAsync)(() => {
                    const ctx = createCompWithContentAndViewChild();
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(directiveLog.filter(['ngDoCheck', 'ngAfterContentChecked'])).toEqual([
                        'parent.ngDoCheck',
                        'contentChild.ngDoCheck',
                        'contentChild.ngAfterContentChecked',
                        'parent.ngAfterContentChecked',
                        'viewChild.ngDoCheck',
                        'viewChild.ngAfterContentChecked',
                    ]);
                }));
                it('should be called on every detectChanges run, except for checkNoChanges', (0, testing_1.fakeAsync)(() => {
                    const ctx = createCompFixture('<div testDirective="dir"></div>');
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(directiveLog.filter(['ngAfterContentChecked'])).toEqual([
                        'dir.ngAfterContentChecked',
                    ]);
                    // reset directives
                    directiveLog.clear();
                    // Verify that checking should not call them.
                    ctx.checkNoChanges();
                    (0, matchers_1.expect)(directiveLog.filter(['ngAfterContentChecked'])).toEqual([]);
                    // re-verify that changes are still detected
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(directiveLog.filter(['ngAfterContentChecked'])).toEqual([
                        'dir.ngAfterContentChecked',
                    ]);
                }));
                it('should be called in reverse order so the child is always notified before the parent', (0, testing_1.fakeAsync)(() => {
                    const ctx = createCompFixture('<div testDirective="parent"><div testDirective="child"></div></div><div testDirective="sibling"></div>');
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(directiveLog.filter(['ngAfterContentChecked'])).toEqual([
                        'child.ngAfterContentChecked',
                        'parent.ngAfterContentChecked',
                        'sibling.ngAfterContentChecked',
                    ]);
                }));
            });
            describe('ngAfterViewInit', () => {
                it('should be called after processing the view children', (0, testing_1.fakeAsync)(() => {
                    const ctx = createCompWithContentAndViewChild();
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(directiveLog.filter(['ngDoCheck', 'ngAfterViewInit'])).toEqual([
                        'parent.ngDoCheck',
                        'contentChild.ngDoCheck',
                        'contentChild.ngAfterViewInit',
                        'viewChild.ngDoCheck',
                        'viewChild.ngAfterViewInit',
                        'parent.ngAfterViewInit',
                    ]);
                }));
                it('should only be called only once', (0, testing_1.fakeAsync)(() => {
                    const ctx = createCompFixture('<div testDirective="dir"></div>');
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(directiveLog.filter(['ngAfterViewInit'])).toEqual(['dir.ngAfterViewInit']);
                    // reset directives
                    directiveLog.clear();
                    // Verify that checking should not call them.
                    ctx.checkNoChanges();
                    (0, matchers_1.expect)(directiveLog.filter(['ngAfterViewInit'])).toEqual([]);
                    // re-verify that changes should not call them
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(directiveLog.filter(['ngAfterViewInit'])).toEqual([]);
                }));
                it('should not call ngAfterViewInit again if it throws', (0, testing_1.fakeAsync)(() => {
                    const ctx = createCompFixture('<div testDirective="dir" throwOn="ngAfterViewInit"></div>');
                    let errored = false;
                    // First pass fails, but ngAfterViewInit should be called.
                    try {
                        ctx.detectChanges(false);
                    }
                    catch (e) {
                        errored = true;
                    }
                    (0, matchers_1.expect)(errored).toBe(true);
                    (0, matchers_1.expect)(directiveLog.filter(['ngAfterViewInit'])).toEqual(['dir.ngAfterViewInit']);
                    directiveLog.clear();
                    // Second change detection also fails, but this time ngAfterViewInit should not be
                    // called.
                    try {
                        ctx.detectChanges(false);
                    }
                    catch (e) {
                        throw new Error('Second detectChanges() should not have run detection.');
                    }
                    (0, matchers_1.expect)(directiveLog.filter(['ngAfterViewInit'])).toEqual([]);
                }));
            });
            describe('ngAfterViewChecked', () => {
                it('should be called after processing the view children', (0, testing_1.fakeAsync)(() => {
                    const ctx = createCompWithContentAndViewChild();
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(directiveLog.filter(['ngDoCheck', 'ngAfterViewChecked'])).toEqual([
                        'parent.ngDoCheck',
                        'contentChild.ngDoCheck',
                        'contentChild.ngAfterViewChecked',
                        'viewChild.ngDoCheck',
                        'viewChild.ngAfterViewChecked',
                        'parent.ngAfterViewChecked',
                    ]);
                }));
                it('should be called on every detectChanges run, except for checkNoChanges', (0, testing_1.fakeAsync)(() => {
                    const ctx = createCompFixture('<div testDirective="dir"></div>');
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(directiveLog.filter(['ngAfterViewChecked'])).toEqual(['dir.ngAfterViewChecked']);
                    // reset directives
                    directiveLog.clear();
                    // Verify that checking should not call them.
                    ctx.checkNoChanges();
                    (0, matchers_1.expect)(directiveLog.filter(['ngAfterViewChecked'])).toEqual([]);
                    // re-verify that changes are still detected
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(directiveLog.filter(['ngAfterViewChecked'])).toEqual(['dir.ngAfterViewChecked']);
                }));
                it('should be called in reverse order so the child is always notified before the parent', (0, testing_1.fakeAsync)(() => {
                    const ctx = createCompFixture('<div testDirective="parent"><div testDirective="child"></div></div><div testDirective="sibling"></div>');
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(directiveLog.filter(['ngAfterViewChecked'])).toEqual([
                        'child.ngAfterViewChecked',
                        'parent.ngAfterViewChecked',
                        'sibling.ngAfterViewChecked',
                    ]);
                }));
            });
            describe('ngOnDestroy', () => {
                it('should be called on view destruction', (0, testing_1.fakeAsync)(() => {
                    const ctx = createCompFixture('<div testDirective="dir"></div>');
                    ctx.detectChanges(false);
                    ctx.destroy();
                    (0, matchers_1.expect)(directiveLog.filter(['ngOnDestroy'])).toEqual(['dir.ngOnDestroy']);
                }));
                it('should be called after processing the content and view children', (0, testing_1.fakeAsync)(() => {
                    testing_1.TestBed.overrideComponent(AnotherComponent, {
                        set: new core_1.Component({
                            selector: 'other-cmp',
                            template: '<div testDirective="viewChild"></div>',
                        }),
                    });
                    const ctx = createCompFixture('<div testDirective="parent"><div *ngFor="let x of [0,1]" testDirective="contentChild{{x}}"></div>' +
                        '<other-cmp></other-cmp></div>', TestComponent);
                    ctx.detectChanges(false);
                    ctx.destroy();
                    (0, matchers_1.expect)(directiveLog.filter(['ngOnDestroy'])).toEqual([
                        'contentChild0.ngOnDestroy',
                        'contentChild1.ngOnDestroy',
                        'viewChild.ngOnDestroy',
                        'parent.ngOnDestroy',
                    ]);
                }));
                it('should be called in reverse order so the child is always notified before the parent', (0, testing_1.fakeAsync)(() => {
                    const ctx = createCompFixture('<div testDirective="parent"><div testDirective="child"></div></div><div testDirective="sibling"></div>');
                    ctx.detectChanges(false);
                    ctx.destroy();
                    (0, matchers_1.expect)(directiveLog.filter(['ngOnDestroy'])).toEqual([
                        'child.ngOnDestroy',
                        'parent.ngOnDestroy',
                        'sibling.ngOnDestroy',
                    ]);
                }));
                it('should deliver synchronous events to parent', (0, testing_1.fakeAsync)(() => {
                    const ctx = createCompFixture('<div (destroy)="a=$event" onDestroyDirective></div>');
                    ctx.detectChanges(false);
                    ctx.destroy();
                    (0, matchers_1.expect)(ctx.componentInstance.a).toEqual('destroyed');
                }));
                it('should call ngOnDestroy on pipes', (0, testing_1.fakeAsync)(() => {
                    const ctx = createCompFixture('{{true | pipeWithOnDestroy }}');
                    ctx.detectChanges(false);
                    ctx.destroy();
                    (0, matchers_1.expect)(directiveLog.filter(['ngOnDestroy'])).toEqual(['pipeWithOnDestroy.ngOnDestroy']);
                }));
                it('should call ngOnDestroy on an injectable class', (0, testing_1.fakeAsync)(() => {
                    testing_1.TestBed.overrideDirective(TestDirective, { set: { providers: [InjectableWithLifecycle] } });
                    const ctx = createCompFixture('<div testDirective="dir"></div>', TestComponent);
                    ctx.debugElement.children[0].injector.get(InjectableWithLifecycle);
                    ctx.detectChanges(false);
                    ctx.destroy();
                    // We don't care about the exact order in this test.
                    (0, matchers_1.expect)(directiveLog.filter(['ngOnDestroy']).sort()).toEqual([
                        'dir.ngOnDestroy',
                        'injectable.ngOnDestroy',
                    ]);
                }));
            });
        });
        describe('enforce no new changes', () => {
            it('should throw when a record gets changed after it has been checked', (0, testing_1.fakeAsync)(() => {
                let ChangingDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[changed]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _changed_decorators;
                    let _changed_initializers = [];
                    let _changed_extraInitializers = [];
                    var ChangingDirective = _classThis = class {
                        constructor() {
                            this.changed = __runInitializers(this, _changed_initializers, void 0);
                            __runInitializers(this, _changed_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "ChangingDirective");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _changed_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _changed_decorators, { kind: "field", name: "changed", static: false, private: false, access: { has: obj => "changed" in obj, get: obj => obj.changed, set: (obj, value) => { obj.changed = value; } }, metadata: _metadata }, _changed_initializers, _changed_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ChangingDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ChangingDirective = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({ declarations: [ChangingDirective] });
                const ctx = createCompFixture('<div [id]="a" [changed]="b"></div>', TestData);
                ctx.componentInstance.b = 1;
                const errMsgRegExp = /Previous value: 'undefined'\. Current value: '1'/g;
                (0, matchers_1.expect)(() => ctx.checkNoChanges()).toThrowError(errMsgRegExp);
            }));
            it('should throw when a record gets changed after the first change detection pass', (0, testing_1.fakeAsync)(() => {
                let ChangingDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[changed]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _changed_decorators;
                    let _changed_initializers = [];
                    let _changed_extraInitializers = [];
                    var ChangingDirective = _classThis = class {
                        constructor() {
                            this.changed = __runInitializers(this, _changed_initializers, void 0);
                            __runInitializers(this, _changed_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "ChangingDirective");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _changed_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _changed_decorators, { kind: "field", name: "changed", static: false, private: false, access: { has: obj => "changed" in obj, get: obj => obj.changed, set: (obj, value) => { obj.changed = value; } }, metadata: _metadata }, _changed_initializers, _changed_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ChangingDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ChangingDirective = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({ declarations: [ChangingDirective] });
                const ctx = createCompFixture('<div [id]="a" [changed]="b"></div>', TestData);
                ctx.componentInstance.b = 1;
                ctx.detectChanges();
                ctx.componentInstance.b = 2;
                const errMsgRegExp = /Previous value: '1'\. Current value: '2'/g;
                (0, matchers_1.expect)(() => ctx.checkNoChanges()).toThrowError(errMsgRegExp);
            }));
            it('should allow view to be created in a cd hook', () => {
                const ctx = createCompFixture('<div *gh9882>{{ a }}</div>', TestData);
                ctx.componentInstance.a = 1;
                ctx.detectChanges();
                (0, matchers_1.expect)(ctx.nativeElement.innerText).toEqual('1');
            });
            it('should not throw when two arrays are structurally the same', (0, testing_1.fakeAsync)(() => {
                const ctx = _bindSimpleValue('a', TestData);
                ctx.componentInstance.a = ['value'];
                ctx.detectChanges(false);
                ctx.componentInstance.a = ['value'];
                (0, matchers_1.expect)(() => ctx.checkNoChanges()).not.toThrow();
            }));
            it('should not break the next run', (0, testing_1.fakeAsync)(() => {
                const ctx = _bindSimpleValue('a', TestData);
                ctx.componentInstance.a = 'value';
                (0, matchers_1.expect)(() => ctx.checkNoChanges()).toThrow();
                ctx.detectChanges();
                (0, matchers_1.expect)(renderLog.loggedValues).toEqual(['value']);
            }));
            it('should not break the next run (view engine and ivy)', (0, testing_1.fakeAsync)(() => {
                const ctx = _bindSimpleValue('a', TestData);
                ctx.detectChanges();
                renderLog.clear();
                ctx.componentInstance.a = 'value';
                (0, matchers_1.expect)(() => ctx.checkNoChanges()).toThrow();
                ctx.detectChanges();
                (0, matchers_1.expect)(renderLog.loggedValues).toEqual(['value']);
            }));
        });
        describe('mode', () => {
            it('Detached', (0, testing_1.fakeAsync)(() => {
                const ctx = createCompFixture('<comp-with-ref></comp-with-ref>');
                const cmp = queryDirs(ctx.debugElement, CompWithRef)[0];
                cmp.value = 'hello';
                cmp.changeDetectorRef.detach();
                ctx.detectChanges();
                (0, matchers_1.expect)(renderLog.log).toEqual([]);
            }));
            it('Detached should disable OnPush', (0, testing_1.fakeAsync)(() => {
                const ctx = createCompFixture('<push-cmp [value]="value"></push-cmp>');
                ctx.componentInstance.value = 0;
                ctx.detectChanges();
                renderLog.clear();
                const cmp = queryDirs(ctx.debugElement, PushComp)[0];
                cmp.changeDetectorRef.detach();
                ctx.componentInstance.value = 1;
                ctx.detectChanges();
                (0, matchers_1.expect)(renderLog.log).toEqual([]);
            }));
            it('Detached view can be checked locally', (0, testing_1.fakeAsync)(() => {
                const ctx = createCompFixture('<wrap-comp-with-ref></wrap-comp-with-ref>');
                const cmp = queryDirs(ctx.debugElement, CompWithRef)[0];
                cmp.value = 'hello';
                cmp.changeDetectorRef.detach();
                (0, matchers_1.expect)(renderLog.log).toEqual([]);
                ctx.detectChanges();
                (0, matchers_1.expect)(renderLog.log).toEqual([]);
                cmp.changeDetectorRef.detectChanges();
                (0, matchers_1.expect)(renderLog.log).toEqual(['{{hello}}']);
            }));
            it('Reattaches', (0, testing_1.fakeAsync)(() => {
                const ctx = createCompFixture('<comp-with-ref></comp-with-ref>');
                const cmp = queryDirs(ctx.debugElement, CompWithRef)[0];
                cmp.value = 'hello';
                cmp.changeDetectorRef.detach();
                ctx.detectChanges();
                (0, matchers_1.expect)(renderLog.log).toEqual([]);
                cmp.changeDetectorRef.reattach();
                ctx.detectChanges();
                (0, matchers_1.expect)(renderLog.log).toEqual(['{{hello}}']);
            }));
            it('Reattaches in the original cd mode', (0, testing_1.fakeAsync)(() => {
                const ctx = createCompFixture('<push-cmp></push-cmp>');
                const cmp = queryDirs(ctx.debugElement, PushComp)[0];
                cmp.changeDetectorRef.detach();
                cmp.changeDetectorRef.reattach();
                // renderCount should NOT be incremented with each CD as CD mode
                // should be resetted to
                // on-push
                ctx.detectChanges();
                (0, matchers_1.expect)(cmp.renderCount).toBeGreaterThan(0);
                const count = cmp.renderCount;
                ctx.detectChanges();
                (0, matchers_1.expect)(cmp.renderCount).toBe(count);
            }));
        });
        describe('nested view recursion', () => {
            it('should recurse into nested components even if there are no bindings in the component view', () => {
                let Nested = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'nested',
                            template: '{{name}}',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Nested = _classThis = class {
                        constructor() {
                            this.name = 'Tom';
                        }
                    };
                    __setFunctionName(_classThis, "Nested");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Nested = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Nested = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({ declarations: [Nested] });
                const ctx = createCompFixture('<nested></nested>');
                ctx.detectChanges();
                (0, matchers_1.expect)(renderLog.loggedValues).toEqual(['Tom']);
            });
            it('should recurse into nested view containers even if there are no bindings in the component view', () => {
                let Comp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '<ng-template #vc>{{name}}</ng-template>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _vc_decorators;
                    let _vc_initializers = [];
                    let _vc_extraInitializers = [];
                    let _template_decorators;
                    let _template_initializers = [];
                    let _template_extraInitializers = [];
                    var Comp = _classThis = class {
                        constructor() {
                            this.name = 'Tom';
                            this.vc = __runInitializers(this, _vc_initializers, void 0);
                            this.template = (__runInitializers(this, _vc_extraInitializers), __runInitializers(this, _template_initializers, void 0));
                            __runInitializers(this, _template_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "Comp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _vc_decorators = [(0, core_1.ViewChild)('vc', { read: core_1.ViewContainerRef, static: true })];
                        _template_decorators = [(0, core_1.ViewChild)(core_1.TemplateRef, { static: true })];
                        __esDecorate(null, null, _vc_decorators, { kind: "field", name: "vc", static: false, private: false, access: { has: obj => "vc" in obj, get: obj => obj.vc, set: (obj, value) => { obj.vc = value; } }, metadata: _metadata }, _vc_initializers, _vc_extraInitializers);
                        __esDecorate(null, null, _template_decorators, { kind: "field", name: "template", static: false, private: false, access: { has: obj => "template" in obj, get: obj => obj.template, set: (obj, value) => { obj.template = value; } }, metadata: _metadata }, _template_initializers, _template_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Comp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Comp = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({ declarations: [Comp] });
                initHelpers();
                const ctx = testing_1.TestBed.createComponent(Comp);
                ctx.detectChanges();
                (0, matchers_1.expect)(renderLog.loggedValues).toEqual([]);
                ctx.componentInstance.vc.createEmbeddedView(ctx.componentInstance.template);
                ctx.detectChanges();
                (0, matchers_1.expect)(renderLog.loggedValues).toEqual(['Tom']);
            });
            describe('projected views', () => {
                let log;
                let DummyDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[i]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _i_decorators;
                    let _i_initializers = [];
                    let _i_extraInitializers = [];
                    var DummyDirective = _classThis = class {
                        constructor() {
                            this.i = __runInitializers(this, _i_initializers, void 0);
                            __runInitializers(this, _i_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "DummyDirective");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _i_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _i_decorators, { kind: "field", name: "i", static: false, private: false, access: { has: obj => "i" in obj, get: obj => obj.i, set: (obj, value) => { obj.i = value; } }, metadata: _metadata }, _i_initializers, _i_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DummyDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DummyDirective = _classThis;
                })();
                let MainComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'main-cmp',
                            template: `<span [i]="log('start')"></span><outer-cmp><ng-template><span [i]="log('tpl')"></span></ng-template></outer-cmp>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MainComp = _classThis = class {
                        constructor(cdRef) {
                            this.cdRef = cdRef;
                        }
                        log(id) {
                            log.push(`main-${id}`);
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
                let OuterComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'outer-cmp',
                            template: `<span [i]="log('start')"></span><inner-cmp [outerTpl]="tpl"><ng-template><span [i]="log('tpl')"></span></ng-template></inner-cmp>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _tpl_decorators;
                    let _tpl_initializers = [];
                    let _tpl_extraInitializers = [];
                    var OuterComp = _classThis = class {
                        constructor(cdRef) {
                            this.cdRef = cdRef;
                            this.tpl = __runInitializers(this, _tpl_initializers, void 0);
                            __runInitializers(this, _tpl_extraInitializers);
                            this.cdRef = cdRef;
                        }
                        log(id) {
                            log.push(`outer-${id}`);
                        }
                    };
                    __setFunctionName(_classThis, "OuterComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _tpl_decorators = [(0, core_1.ContentChild)(core_1.TemplateRef, { static: true })];
                        __esDecorate(null, null, _tpl_decorators, { kind: "field", name: "tpl", static: false, private: false, access: { has: obj => "tpl" in obj, get: obj => obj.tpl, set: (obj, value) => { obj.tpl = value; } }, metadata: _metadata }, _tpl_initializers, _tpl_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        OuterComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return OuterComp = _classThis;
                })();
                let InnerComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'inner-cmp',
                            template: `<span [i]="log('start')"></span>><ng-container [ngTemplateOutlet]="outerTpl"></ng-container><ng-container [ngTemplateOutlet]="tpl"></ng-container>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _tpl_decorators;
                    let _tpl_initializers = [];
                    let _tpl_extraInitializers = [];
                    let _outerTpl_decorators;
                    let _outerTpl_initializers = [];
                    let _outerTpl_extraInitializers = [];
                    var InnerComp = _classThis = class {
                        constructor(cdRef) {
                            this.cdRef = cdRef;
                            this.tpl = __runInitializers(this, _tpl_initializers, void 0);
                            this.outerTpl = (__runInitializers(this, _tpl_extraInitializers), __runInitializers(this, _outerTpl_initializers, void 0));
                            __runInitializers(this, _outerTpl_extraInitializers);
                            this.cdRef = cdRef;
                        }
                        log(id) {
                            log.push(`inner-${id}`);
                        }
                    };
                    __setFunctionName(_classThis, "InnerComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _tpl_decorators = [(0, core_1.ContentChild)(core_1.TemplateRef, { static: true })];
                        _outerTpl_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _tpl_decorators, { kind: "field", name: "tpl", static: false, private: false, access: { has: obj => "tpl" in obj, get: obj => obj.tpl, set: (obj, value) => { obj.tpl = value; } }, metadata: _metadata }, _tpl_initializers, _tpl_extraInitializers);
                        __esDecorate(null, null, _outerTpl_decorators, { kind: "field", name: "outerTpl", static: false, private: false, access: { has: obj => "outerTpl" in obj, get: obj => obj.outerTpl, set: (obj, value) => { obj.outerTpl = value; } }, metadata: _metadata }, _outerTpl_initializers, _outerTpl_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        InnerComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return InnerComp = _classThis;
                })();
                let ctx;
                let mainComp;
                let outerComp;
                let innerComp;
                beforeEach(() => {
                    log = [];
                    ctx = testing_1.TestBed.configureTestingModule({
                        declarations: [MainComp, OuterComp, InnerComp, DummyDirective],
                    }).createComponent(MainComp);
                    mainComp = ctx.componentInstance;
                    outerComp = ctx.debugElement.query(by_1.By.directive(OuterComp)).injector.get(OuterComp);
                    innerComp = ctx.debugElement.query(by_1.By.directive(InnerComp)).injector.get(InnerComp);
                });
                it('should dirty check projected views in regular order', () => {
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(log).toEqual([
                        'main-start',
                        'outer-start',
                        'inner-start',
                        'main-tpl',
                        'outer-tpl',
                    ]);
                    log = [];
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(log).toEqual([
                        'main-start',
                        'outer-start',
                        'inner-start',
                        'main-tpl',
                        'outer-tpl',
                    ]);
                });
                it('should not dirty check projected views if neither the declaration nor the insertion place is dirty checked', () => {
                    ctx.detectChanges(false);
                    log = [];
                    mainComp.cdRef.detach();
                    ctx.detectChanges(false);
                    (0, matchers_1.expect)(log).toEqual([]);
                });
                it('should dirty check projected views if the insertion place is dirty checked', () => {
                    ctx.detectChanges(false);
                    log = [];
                    innerComp.cdRef.detectChanges();
                    (0, matchers_1.expect)(log).toEqual(['inner-start', 'main-tpl', 'outer-tpl']);
                });
                it('should not dirty check views that are inserted into a detached tree, even if the declaration place is dirty checked', () => {
                    ctx.detectChanges(false);
                    log = [];
                    innerComp.cdRef.detach();
                    mainComp.cdRef.detectChanges();
                    (0, matchers_1.expect)(log).toEqual(['main-start', 'outer-start']);
                    log = [];
                    outerComp.cdRef.detectChanges();
                    (0, matchers_1.expect)(log).toEqual(['outer-start']);
                    log = [];
                    outerComp.cdRef.detach();
                    mainComp.cdRef.detectChanges();
                    (0, matchers_1.expect)(log).toEqual(['main-start']);
                });
            });
        });
        describe('class binding', () => {
            it('should coordinate class attribute and class host binding', () => {
                let Comp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<div class="{{initClasses}}" someDir></div>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Comp = _classThis = class {
                        constructor() {
                            this.initClasses = 'init';
                        }
                    };
                    __setFunctionName(_classThis, "Comp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Comp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Comp = _classThis;
                })();
                let SomeDir = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[someDir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _fooClass_decorators;
                    let _fooClass_initializers = [];
                    let _fooClass_extraInitializers = [];
                    var SomeDir = _classThis = class {
                        constructor() {
                            this.fooClass = __runInitializers(this, _fooClass_initializers, true);
                            __runInitializers(this, _fooClass_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "SomeDir");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _fooClass_decorators = [(0, core_1.HostBinding)('class.foo')];
                        __esDecorate(null, null, _fooClass_decorators, { kind: "field", name: "fooClass", static: false, private: false, access: { has: obj => "fooClass" in obj, get: obj => obj.fooClass, set: (obj, value) => { obj.fooClass = value; } }, metadata: _metadata }, _fooClass_initializers, _fooClass_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SomeDir = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SomeDir = _classThis;
                })();
                const ctx = testing_1.TestBed.configureTestingModule({ declarations: [Comp, SomeDir] }).createComponent(Comp);
                ctx.detectChanges();
                const divEl = ctx.debugElement.children[0];
                (0, matchers_1.expect)(divEl.nativeElement).toHaveCssClass('init');
                (0, matchers_1.expect)(divEl.nativeElement).toHaveCssClass('foo');
            });
        });
        describe('lifecycle asserts', () => {
            let logged;
            function log(value) {
                logged.push(value);
            }
            function clearLog() {
                logged = [];
            }
            function expectOnceAndOnlyOnce(log) {
                (0, matchers_1.expect)(logged.indexOf(log) >= 0).toBeTruthy(`'${log}' not logged. Log was ${JSON.stringify(logged)}`);
                (0, matchers_1.expect)(logged.lastIndexOf(log) === logged.indexOf(log)).toBeTruthy(`'${log}' logged more than once. Log was ${JSON.stringify(logged)}`);
            }
            beforeEach(() => {
                clearLog();
            });
            let LifetimeMethods;
            (function (LifetimeMethods) {
                LifetimeMethods[LifetimeMethods["None"] = 0] = "None";
                LifetimeMethods[LifetimeMethods["ngOnInit"] = 1] = "ngOnInit";
                LifetimeMethods[LifetimeMethods["ngOnChanges"] = 2] = "ngOnChanges";
                LifetimeMethods[LifetimeMethods["ngAfterViewInit"] = 4] = "ngAfterViewInit";
                LifetimeMethods[LifetimeMethods["ngAfterContentInit"] = 8] = "ngAfterContentInit";
                LifetimeMethods[LifetimeMethods["ngDoCheck"] = 16] = "ngDoCheck";
                LifetimeMethods[LifetimeMethods["InitMethods"] = 13] = "InitMethods";
                LifetimeMethods[LifetimeMethods["InitMethodsAndChanges"] = 15] = "InitMethodsAndChanges";
                LifetimeMethods[LifetimeMethods["All"] = 31] = "All";
            })(LifetimeMethods || (LifetimeMethods = {}));
            function forEachMethod(methods, cb) {
                if (methods & LifetimeMethods.ngOnInit)
                    cb(LifetimeMethods.ngOnInit);
                if (methods & LifetimeMethods.ngOnChanges)
                    cb(LifetimeMethods.ngOnChanges);
                if (methods & LifetimeMethods.ngAfterContentInit)
                    cb(LifetimeMethods.ngAfterContentInit);
                if (methods & LifetimeMethods.ngAfterViewInit)
                    cb(LifetimeMethods.ngAfterViewInit);
                if (methods & LifetimeMethods.ngDoCheck)
                    cb(LifetimeMethods.ngDoCheck);
            }
            describe('calling init', () => {
                function initialize(options) {
                    let MyChild = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'my-child',
                                template: '',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        let _inp_decorators;
                        let _inp_initializers = [];
                        let _inp_extraInitializers = [];
                        let _outp_decorators;
                        let _outp_initializers = [];
                        let _outp_extraInitializers = [];
                        var MyChild = _classThis = class {
                            constructor() {
                                this.thrown = LifetimeMethods.None;
                                this.inp = __runInitializers(this, _inp_initializers, void 0);
                                this.outp = (__runInitializers(this, _inp_extraInitializers), __runInitializers(this, _outp_initializers, new core_1.EventEmitter()));
                                __runInitializers(this, _outp_extraInitializers);
                            }
                            ngDoCheck() {
                                this.check(LifetimeMethods.ngDoCheck);
                            }
                            ngOnInit() {
                                this.check(LifetimeMethods.ngOnInit);
                            }
                            ngOnChanges() {
                                this.check(LifetimeMethods.ngOnChanges);
                            }
                            ngAfterViewInit() {
                                this.check(LifetimeMethods.ngAfterViewInit);
                            }
                            ngAfterContentInit() {
                                this.check(LifetimeMethods.ngAfterContentInit);
                            }
                            check(method) {
                                log(`MyChild::${LifetimeMethods[method]}()`);
                                if ((options.childRecursion & method) !== 0) {
                                    if (logged.length < 20) {
                                        this.outp.emit(null);
                                    }
                                    else {
                                        fail(`Unexpected MyChild::${LifetimeMethods[method]} recursion`);
                                    }
                                }
                                if ((options.childThrows & method) !== 0) {
                                    if ((this.thrown & method) === 0) {
                                        this.thrown |= method;
                                        log(`<THROW from MyChild::${LifetimeMethods[method]}>()`);
                                        throw new Error(`Throw from MyChild::${LifetimeMethods[method]}`);
                                    }
                                }
                            }
                        };
                        __setFunctionName(_classThis, "MyChild");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            _inp_decorators = [(0, core_1.Input)()];
                            _outp_decorators = [(0, core_1.Output)()];
                            __esDecorate(null, null, _inp_decorators, { kind: "field", name: "inp", static: false, private: false, access: { has: obj => "inp" in obj, get: obj => obj.inp, set: (obj, value) => { obj.inp = value; } }, metadata: _metadata }, _inp_initializers, _inp_extraInitializers);
                            __esDecorate(null, null, _outp_decorators, { kind: "field", name: "outp", static: false, private: false, access: { has: obj => "outp" in obj, get: obj => obj.outp, set: (obj, value) => { obj.outp = value; } }, metadata: _metadata }, _outp_initializers, _outp_extraInitializers);
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            MyChild = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return MyChild = _classThis;
                    })();
                    let MyComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'my-component',
                                template: `<my-child [inp]='true' (outp)='onOutp()'></my-child>`,
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var MyComponent = _classThis = class {
                            constructor(changeDetectionRef) {
                                this.changeDetectionRef = changeDetectionRef;
                            }
                            ngDoCheck() {
                                this.check(LifetimeMethods.ngDoCheck);
                            }
                            ngOnInit() {
                                this.check(LifetimeMethods.ngOnInit);
                            }
                            ngAfterViewInit() {
                                this.check(LifetimeMethods.ngAfterViewInit);
                            }
                            ngAfterContentInit() {
                                this.check(LifetimeMethods.ngAfterContentInit);
                            }
                            onOutp() {
                                log('<RECURSION START>');
                                this.changeDetectionRef.detectChanges();
                                log('<RECURSION DONE>');
                            }
                            check(method) {
                                log(`MyComponent::${LifetimeMethods[method]}()`);
                            }
                        };
                        __setFunctionName(_classThis, "MyComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            MyComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return MyComponent = _classThis;
                    })();
                    testing_1.TestBed.configureTestingModule({ declarations: [MyChild, MyComponent] });
                    return createCompFixture(`<my-component></my-component>`);
                }
                function ensureOneInit(options) {
                    const ctx = initialize(options);
                    const throws = options.childThrows != LifetimeMethods.None;
                    if (throws) {
                        log(`<CYCLE 0 START>`);
                        (0, matchers_1.expect)(() => {
                            // Expect child to throw.
                            ctx.detectChanges();
                        }).toThrow();
                        log(`<CYCLE 0 END>`);
                        log(`<CYCLE 1 START>`);
                    }
                    ctx.detectChanges();
                    if (throws)
                        log(`<CYCLE 1 DONE>`);
                    expectOnceAndOnlyOnce('MyComponent::ngOnInit()');
                    expectOnceAndOnlyOnce('MyChild::ngOnInit()');
                    expectOnceAndOnlyOnce('MyComponent::ngAfterViewInit()');
                    expectOnceAndOnlyOnce('MyComponent::ngAfterContentInit()');
                    expectOnceAndOnlyOnce('MyChild::ngAfterViewInit()');
                    expectOnceAndOnlyOnce('MyChild::ngAfterContentInit()');
                }
                forEachMethod(LifetimeMethods.InitMethodsAndChanges, (method) => {
                    it(`should ensure that init hooks are called once an only once with recursion in ${LifetimeMethods[method]} `, () => {
                        // Ensure all the init methods are called once.
                        ensureOneInit({ childRecursion: method, childThrows: LifetimeMethods.None });
                    });
                });
                forEachMethod(LifetimeMethods.All, (method) => {
                    it(`should ensure that init hooks are called once an only once with a throw in ${LifetimeMethods[method]} `, () => {
                        // Ensure all the init methods are called once.
                        // the first cycle throws but the next cycle should complete the inits.
                        ensureOneInit({ childRecursion: LifetimeMethods.None, childThrows: method });
                    });
                });
            });
        });
    });
})();
let RenderLog = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var RenderLog = _classThis = class {
        constructor() {
            this.log = [];
            this.loggedValues = [];
        }
        setElementProperty(el, propName, propValue) {
            this.log.push(`${propName}=${propValue}`);
            this.loggedValues.push(propValue);
        }
        setText(node, value) {
            this.log.push(`{{${value}}}`);
            this.loggedValues.push(value);
        }
        clear() {
            this.log = [];
            this.loggedValues = [];
        }
    };
    __setFunctionName(_classThis, "RenderLog");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RenderLog = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RenderLog = _classThis;
})();
class DirectiveLogEntry {
    constructor(directiveName, method) {
        this.directiveName = directiveName;
        this.method = method;
    }
}
function patchLoggingRenderer2(rendererFactory, log) {
    if (rendererFactory.__patchedForLogging) {
        return;
    }
    rendererFactory.__patchedForLogging = true;
    const origCreateRenderer = rendererFactory.createRenderer;
    rendererFactory.createRenderer = function (element, type) {
        const renderer = origCreateRenderer.call(this, element, type);
        if (renderer.__patchedForLogging) {
            return renderer;
        }
        renderer.__patchedForLogging = true;
        const origSetProperty = renderer.setProperty;
        const origSetValue = renderer.setValue;
        renderer.setProperty = function (el, name, value) {
            log.setElementProperty(el, name, value);
            origSetProperty.call(renderer, el, name, value);
        };
        renderer.setValue = function (node, value) {
            if ((0, browser_util_1.isTextNode)(node)) {
                log.setText(node, value);
            }
            origSetValue.call(renderer, node, value);
        };
        return renderer;
    };
}
let DirectiveLog = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DirectiveLog = _classThis = class {
        constructor() {
            this.entries = [];
        }
        add(directiveName, method) {
            this.entries.push(new DirectiveLogEntry(directiveName, method));
        }
        clear() {
            this.entries = [];
        }
        filter(methods) {
            return this.entries
                .filter((entry) => methods.indexOf(entry.method) !== -1)
                .map((entry) => `${entry.directiveName}.${entry.method}`);
        }
    };
    __setFunctionName(_classThis, "DirectiveLog");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DirectiveLog = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DirectiveLog = _classThis;
})();
let CountingPipe = (() => {
    let _classDecorators = [(0, core_1.Pipe)({
            name: 'countingPipe',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CountingPipe = _classThis = class {
        constructor() {
            this.state = 0;
        }
        transform(value) {
            return `${value} state:${this.state++}`;
        }
    };
    __setFunctionName(_classThis, "CountingPipe");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CountingPipe = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CountingPipe = _classThis;
})();
let CountingImpurePipe = (() => {
    let _classDecorators = [(0, core_1.Pipe)({
            name: 'countingImpurePipe',
            pure: false,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CountingImpurePipe = _classThis = class {
        constructor() {
            this.state = 0;
        }
        transform(value) {
            return `${value} state:${this.state++}`;
        }
    };
    __setFunctionName(_classThis, "CountingImpurePipe");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CountingImpurePipe = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CountingImpurePipe = _classThis;
})();
let PipeWithOnDestroy = (() => {
    let _classDecorators = [(0, core_1.Pipe)({
            name: 'pipeWithOnDestroy',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var PipeWithOnDestroy = _classThis = class {
        constructor(directiveLog) {
            this.directiveLog = directiveLog;
        }
        ngOnDestroy() {
            this.directiveLog.add('pipeWithOnDestroy', 'ngOnDestroy');
        }
        transform(value) {
            return null;
        }
    };
    __setFunctionName(_classThis, "PipeWithOnDestroy");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PipeWithOnDestroy = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PipeWithOnDestroy = _classThis;
})();
let IdentityPipe = (() => {
    let _classDecorators = [(0, core_1.Pipe)({
            name: 'identityPipe',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var IdentityPipe = _classThis = class {
        transform(value) {
            return value;
        }
    };
    __setFunctionName(_classThis, "IdentityPipe");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        IdentityPipe = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return IdentityPipe = _classThis;
})();
let MultiArgPipe = (() => {
    let _classDecorators = [(0, core_1.Pipe)({
            name: 'multiArgPipe',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MultiArgPipe = _classThis = class {
        transform(value, arg1, arg2, arg3 = 'default') {
            return `${value} ${arg1} ${arg2} ${arg3}`;
        }
    };
    __setFunctionName(_classThis, "MultiArgPipe");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MultiArgPipe = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MultiArgPipe = _classThis;
})();
let TestComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'test-cmp',
            template: 'empty',
            standalone: false,
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
let AnotherComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'other-cmp',
            template: 'empty',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AnotherComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "AnotherComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AnotherComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AnotherComponent = _classThis;
})();
let CompWithRef = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'comp-with-ref',
            template: '<div (event)="noop()" emitterDirective></div>{{value}}',
            host: { 'event': 'noop()' },
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _value_decorators;
    let _value_initializers = [];
    let _value_extraInitializers = [];
    var CompWithRef = _classThis = class {
        constructor(changeDetectorRef) {
            this.changeDetectorRef = changeDetectorRef;
            this.value = __runInitializers(this, _value_initializers, void 0);
            __runInitializers(this, _value_extraInitializers);
            this.changeDetectorRef = changeDetectorRef;
        }
        noop() { }
    };
    __setFunctionName(_classThis, "CompWithRef");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _value_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CompWithRef = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CompWithRef = _classThis;
})();
let WrapCompWithRef = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'wrap-comp-with-ref',
            template: '<comp-with-ref></comp-with-ref>',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var WrapCompWithRef = _classThis = class {
        constructor(changeDetectorRef) {
            this.changeDetectorRef = changeDetectorRef;
        }
    };
    __setFunctionName(_classThis, "WrapCompWithRef");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        WrapCompWithRef = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return WrapCompWithRef = _classThis;
})();
let PushComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'push-cmp',
            template: '<div (event)="noop()" emitterDirective></div>{{value}}{{renderIncrement}}',
            host: { '(event)': 'noop()' },
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _value_decorators;
    let _value_initializers = [];
    let _value_extraInitializers = [];
    var PushComp = _classThis = class {
        get renderIncrement() {
            this.renderCount++;
            return '';
        }
        constructor(changeDetectorRef) {
            this.changeDetectorRef = changeDetectorRef;
            this.value = __runInitializers(this, _value_initializers, void 0);
            this.renderCount = (__runInitializers(this, _value_extraInitializers), 0);
        }
        noop() { }
    };
    __setFunctionName(_classThis, "PushComp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _value_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PushComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PushComp = _classThis;
})();
let EmitterDirective = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[emitterDirective]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _emitter_decorators;
    let _emitter_initializers = [];
    let _emitter_extraInitializers = [];
    var EmitterDirective = _classThis = class {
        constructor() {
            this.emitter = __runInitializers(this, _emitter_initializers, new core_1.EventEmitter());
            __runInitializers(this, _emitter_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "EmitterDirective");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _emitter_decorators = [(0, core_1.Output)('event')];
        __esDecorate(null, null, _emitter_decorators, { kind: "field", name: "emitter", static: false, private: false, access: { has: obj => "emitter" in obj, get: obj => obj.emitter, set: (obj, value) => { obj.emitter = value; } }, metadata: _metadata }, _emitter_initializers, _emitter_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        EmitterDirective = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return EmitterDirective = _classThis;
})();
let Gh9882 = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[gh9882]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Gh9882 = _classThis = class {
        constructor(_viewContainer, _templateRef) {
            this._viewContainer = _viewContainer;
            this._templateRef = _templateRef;
        }
        ngAfterContentInit() {
            this._viewContainer.createEmbeddedView(this._templateRef);
        }
    };
    __setFunctionName(_classThis, "Gh9882");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Gh9882 = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Gh9882 = _classThis;
})();
let TestDirective = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[testDirective]',
            exportAs: 'testDirective',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _a_decorators;
    let _a_initializers = [];
    let _a_extraInitializers = [];
    let _b_decorators;
    let _b_initializers = [];
    let _b_extraInitializers = [];
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    let _throwOn_decorators;
    let _throwOn_initializers = [];
    let _throwOn_extraInitializers = [];
    var TestDirective = _classThis = class {
        constructor(log) {
            this.log = log;
            this.a = __runInitializers(this, _a_initializers, void 0);
            this.b = (__runInitializers(this, _a_extraInitializers), __runInitializers(this, _b_initializers, void 0));
            this.changes = __runInitializers(this, _b_extraInitializers);
            this.eventEmitter = new core_1.EventEmitter();
            this.name = __runInitializers(this, _name_initializers, '');
            this.throwOn = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _throwOn_initializers, void 0));
            __runInitializers(this, _throwOn_extraInitializers);
            this.log = log;
        }
        onEvent(event) {
            this.event = event;
        }
        ngDoCheck() {
            this.log.add(this.name, 'ngDoCheck');
        }
        ngOnInit() {
            this.log.add(this.name, 'ngOnInit');
            if (this.throwOn == 'ngOnInit') {
                throw new Error('Boom!');
            }
        }
        ngOnChanges(changes) {
            this.log.add(this.name, 'ngOnChanges');
            this.changes = changes;
            if (this.throwOn == 'ngOnChanges') {
                throw new Error('Boom!');
            }
        }
        ngAfterContentInit() {
            this.log.add(this.name, 'ngAfterContentInit');
            if (this.throwOn == 'ngAfterContentInit') {
                throw new Error('Boom!');
            }
        }
        ngAfterContentChecked() {
            this.log.add(this.name, 'ngAfterContentChecked');
            if (this.throwOn == 'ngAfterContentChecked') {
                throw new Error('Boom!');
            }
        }
        ngAfterViewInit() {
            this.log.add(this.name, 'ngAfterViewInit');
            if (this.throwOn == 'ngAfterViewInit') {
                throw new Error('Boom!');
            }
        }
        ngAfterViewChecked() {
            this.log.add(this.name, 'ngAfterViewChecked');
            if (this.throwOn == 'ngAfterViewChecked') {
                throw new Error('Boom!');
            }
        }
        ngOnDestroy() {
            this.log.add(this.name, 'ngOnDestroy');
            if (this.throwOn == 'ngOnDestroy') {
                throw new Error('Boom!');
            }
        }
    };
    __setFunctionName(_classThis, "TestDirective");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _a_decorators = [(0, core_1.Input)()];
        _b_decorators = [(0, core_1.Input)()];
        _name_decorators = [(0, core_1.Input)('testDirective')];
        _throwOn_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _a_decorators, { kind: "field", name: "a", static: false, private: false, access: { has: obj => "a" in obj, get: obj => obj.a, set: (obj, value) => { obj.a = value; } }, metadata: _metadata }, _a_initializers, _a_extraInitializers);
        __esDecorate(null, null, _b_decorators, { kind: "field", name: "b", static: false, private: false, access: { has: obj => "b" in obj, get: obj => obj.b, set: (obj, value) => { obj.b = value; } }, metadata: _metadata }, _b_initializers, _b_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _throwOn_decorators, { kind: "field", name: "throwOn", static: false, private: false, access: { has: obj => "throwOn" in obj, get: obj => obj.throwOn, set: (obj, value) => { obj.throwOn = value; } }, metadata: _metadata }, _throwOn_initializers, _throwOn_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TestDirective = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TestDirective = _classThis;
})();
let InjectableWithLifecycle = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var InjectableWithLifecycle = _classThis = class {
        constructor(log) {
            this.log = log;
            this.name = 'injectable';
        }
        ngOnDestroy() {
            this.log.add(this.name, 'ngOnDestroy');
        }
    };
    __setFunctionName(_classThis, "InjectableWithLifecycle");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        InjectableWithLifecycle = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return InjectableWithLifecycle = _classThis;
})();
let OnDestroyDirective = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[onDestroyDirective]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _emitter_decorators;
    let _emitter_initializers = [];
    let _emitter_extraInitializers = [];
    var OnDestroyDirective = _classThis = class {
        ngOnDestroy() {
            this.emitter.emit('destroyed');
        }
        constructor() {
            this.emitter = __runInitializers(this, _emitter_initializers, new core_1.EventEmitter(false));
            __runInitializers(this, _emitter_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "OnDestroyDirective");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _emitter_decorators = [(0, core_1.Output)('destroy')];
        __esDecorate(null, null, _emitter_decorators, { kind: "field", name: "emitter", static: false, private: false, access: { has: obj => "emitter" in obj, get: obj => obj.emitter, set: (obj, value) => { obj.emitter = value; } }, metadata: _metadata }, _emitter_initializers, _emitter_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OnDestroyDirective = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OnDestroyDirective = _classThis;
})();
let OrderCheckDirective0 = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[orderCheck0]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _set_name_decorators;
    var OrderCheckDirective0 = _classThis = class {
        set name(value) {
            this._name = value;
            this.log.add(this._name, 'set');
        }
        constructor(log) {
            this.log = (__runInitializers(this, _instanceExtraInitializers), log);
        }
    };
    __setFunctionName(_classThis, "OrderCheckDirective0");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _set_name_decorators = [(0, core_1.Input)('orderCheck0')];
        __esDecorate(_classThis, null, _set_name_decorators, { kind: "setter", name: "name", static: false, private: false, access: { has: obj => "name" in obj, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OrderCheckDirective0 = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OrderCheckDirective0 = _classThis;
})();
let OrderCheckDirective1 = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[orderCheck1]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _set_name_decorators;
    var OrderCheckDirective1 = _classThis = class {
        set name(value) {
            this._name = value;
            this.log.add(this._name, 'set');
        }
        constructor(log, _check0) {
            this.log = (__runInitializers(this, _instanceExtraInitializers), log);
        }
    };
    __setFunctionName(_classThis, "OrderCheckDirective1");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _set_name_decorators = [(0, core_1.Input)('orderCheck1')];
        __esDecorate(_classThis, null, _set_name_decorators, { kind: "setter", name: "name", static: false, private: false, access: { has: obj => "name" in obj, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OrderCheckDirective1 = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OrderCheckDirective1 = _classThis;
})();
let OrderCheckDirective2 = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[orderCheck2]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _set_name_decorators;
    var OrderCheckDirective2 = _classThis = class {
        set name(value) {
            this._name = value;
            this.log.add(this._name, 'set');
        }
        constructor(log, _check1) {
            this.log = (__runInitializers(this, _instanceExtraInitializers), log);
        }
    };
    __setFunctionName(_classThis, "OrderCheckDirective2");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _set_name_decorators = [(0, core_1.Input)('orderCheck2')];
        __esDecorate(_classThis, null, _set_name_decorators, { kind: "setter", name: "name", static: false, private: false, access: { has: obj => "name" in obj, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OrderCheckDirective2 = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OrderCheckDirective2 = _classThis;
})();
class TestLocalsContext {
    constructor(someLocal) {
        this.someLocal = someLocal;
    }
}
let TestLocals = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[testLocals]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TestLocals = _classThis = class {
        constructor(templateRef, vcRef) {
            vcRef.createEmbeddedView(templateRef, new TestLocalsContext('someLocalValue'));
        }
    };
    __setFunctionName(_classThis, "TestLocals");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TestLocals = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TestLocals = _classThis;
})();
let Person = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'root',
            template: 'empty',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Person = _classThis = class {
        constructor() {
            this.address = null;
        }
        init(name, address = null) {
            this.name = name;
            this.address = address;
        }
        sayHi(m) {
            return `Hi, ${m}`;
        }
        passThrough(val) {
            return val;
        }
        toString() {
            const address = this.address == null ? '' : ' address=' + this.address.toString();
            return 'name=' + this.name + address;
        }
    };
    __setFunctionName(_classThis, "Person");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Person = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Person = _classThis;
})();
class Address {
    constructor(_city, _zipcode = null) {
        this._city = _city;
        this._zipcode = _zipcode;
        this.cityGetterCalls = 0;
        this.zipCodeGetterCalls = 0;
    }
    get city() {
        this.cityGetterCalls++;
        return this._city;
    }
    get zipcode() {
        this.zipCodeGetterCalls++;
        return this._zipcode;
    }
    set city(v) {
        this._city = v;
    }
    set zipcode(v) {
        this._zipcode = v;
    }
    toString() {
        return this.city || '-';
    }
}
let Uninitialized = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'root',
            template: 'empty',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Uninitialized = _classThis = class {
        constructor() {
            this.value = null;
        }
    };
    __setFunctionName(_classThis, "Uninitialized");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Uninitialized = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Uninitialized = _classThis;
})();
let TestData = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'root',
            template: 'empty',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TestData = _classThis = class {
    };
    __setFunctionName(_classThis, "TestData");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TestData = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TestData = _classThis;
})();
class Holder {
}
let PersonHolder = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'root',
            template: 'empty',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Holder;
    var PersonHolder = _classThis = class extends _classSuper {
    };
    __setFunctionName(_classThis, "PersonHolder");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PersonHolder = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PersonHolder = _classThis;
})();
let PersonHolderHolder = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'root',
            template: 'empty',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Holder;
    var PersonHolderHolder = _classThis = class extends _classSuper {
    };
    __setFunctionName(_classThis, "PersonHolderHolder");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PersonHolderHolder = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PersonHolderHolder = _classThis;
})();
