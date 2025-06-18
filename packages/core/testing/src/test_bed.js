"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectSetupWrapper = exports.TestBed = exports.TestBedImpl = void 0;
exports.getTestBed = getTestBed;
exports.inject = inject;
exports.withModule = withModule;
// The formatter and CI disagree on how this import statement should be formatted. Both try to keep
// it on one line, too, which has gotten very hard to read & manage. So disable the formatter for
// this statement only.
const core_1 = require("../../src/core");
const component_fixture_1 = require("./component_fixture");
const test_bed_common_1 = require("./test_bed_common");
const test_bed_compiler_1 = require("./test_bed_compiler");
let _nextRootElementId = 0;
/**
 * Returns a singleton of the `TestBed` class.
 *
 * @publicApi
 */
function getTestBed() {
    return TestBedImpl.INSTANCE;
}
/**
 * @description
 * Configures and initializes environment for unit testing and provides methods for
 * creating components and services in unit tests.
 *
 * TestBed is the primary api for writing unit tests for Angular applications and libraries.
 */
class TestBedImpl {
    constructor() {
        /**
         * Defer block behavior option that specifies whether defer blocks will be triggered manually
         * or set to play through.
         */
        this._instanceDeferBlockBehavior = test_bed_common_1.DEFER_BLOCK_DEFAULT_BEHAVIOR;
        // Properties
        this.platform = null;
        this.ngModule = null;
        this._compiler = null;
        this._testModuleRef = null;
        this._activeFixtures = [];
        /**
         * Internal-only flag to indicate whether a module
         * scoping queue has been checked and flushed already.
         * @nodoc
         */
        this.globalCompilationChecked = false;
    }
    static get INSTANCE() {
        return (TestBedImpl._INSTANCE = TestBedImpl._INSTANCE || new TestBedImpl());
    }
    /**
     * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
     * angular module. These are common to every test in the suite.
     *
     * This may only be called once, to set up the common providers for the current test
     * suite on the current platform. If you absolutely need to change the providers,
     * first use `resetTestEnvironment`.
     *
     * Test modules and platforms for individual platforms are available from
     * '@angular/<platform_name>/testing'.
     *
     * @publicApi
     */
    static initTestEnvironment(ngModule, platform, options) {
        const testBed = TestBedImpl.INSTANCE;
        testBed.initTestEnvironment(ngModule, platform, options);
        return testBed;
    }
    /**
     * Reset the providers for the test injector.
     *
     * @publicApi
     */
    static resetTestEnvironment() {
        TestBedImpl.INSTANCE.resetTestEnvironment();
    }
    static configureCompiler(config) {
        return TestBedImpl.INSTANCE.configureCompiler(config);
    }
    /**
     * Allows overriding default providers, directives, pipes, modules of the test injector,
     * which are defined in test_injector.js
     */
    static configureTestingModule(moduleDef) {
        return TestBedImpl.INSTANCE.configureTestingModule(moduleDef);
    }
    /**
     * Compile components with a `templateUrl` for the test's NgModule.
     * It is necessary to call this function
     * as fetching urls is asynchronous.
     */
    static compileComponents() {
        return TestBedImpl.INSTANCE.compileComponents();
    }
    static overrideModule(ngModule, override) {
        return TestBedImpl.INSTANCE.overrideModule(ngModule, override);
    }
    static overrideComponent(component, override) {
        return TestBedImpl.INSTANCE.overrideComponent(component, override);
    }
    static overrideDirective(directive, override) {
        return TestBedImpl.INSTANCE.overrideDirective(directive, override);
    }
    static overridePipe(pipe, override) {
        return TestBedImpl.INSTANCE.overridePipe(pipe, override);
    }
    static overrideTemplate(component, template) {
        return TestBedImpl.INSTANCE.overrideTemplate(component, template);
    }
    /**
     * Overrides the template of the given component, compiling the template
     * in the context of the TestingModule.
     *
     * Note: This works for JIT and AOTed components as well.
     */
    static overrideTemplateUsingTestingModule(component, template) {
        return TestBedImpl.INSTANCE.overrideTemplateUsingTestingModule(component, template);
    }
    static overrideProvider(token, provider) {
        return TestBedImpl.INSTANCE.overrideProvider(token, provider);
    }
    static inject(token, notFoundValue, options) {
        return TestBedImpl.INSTANCE.inject(token, notFoundValue, options);
    }
    /**
     * Runs the given function in the `EnvironmentInjector` context of `TestBed`.
     *
     * @see {@link https://angular.dev/api/core/EnvironmentInjector#runInContext}
     */
    static runInInjectionContext(fn) {
        return TestBedImpl.INSTANCE.runInInjectionContext(fn);
    }
    static createComponent(component) {
        return TestBedImpl.INSTANCE.createComponent(component);
    }
    static resetTestingModule() {
        return TestBedImpl.INSTANCE.resetTestingModule();
    }
    static execute(tokens, fn, context) {
        return TestBedImpl.INSTANCE.execute(tokens, fn, context);
    }
    static get platform() {
        return TestBedImpl.INSTANCE.platform;
    }
    static get ngModule() {
        return TestBedImpl.INSTANCE.ngModule;
    }
    static tick() {
        return TestBedImpl.INSTANCE.tick();
    }
    /**
     * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
     * angular module. These are common to every test in the suite.
     *
     * This may only be called once, to set up the common providers for the current test
     * suite on the current platform. If you absolutely need to change the providers,
     * first use `resetTestEnvironment`.
     *
     * Test modules and platforms for individual platforms are available from
     * '@angular/<platform_name>/testing'.
     *
     * @publicApi
     */
    initTestEnvironment(ngModule, platform, options) {
        if (this.platform || this.ngModule) {
            throw new Error('Cannot set base providers because it has already been called');
        }
        TestBedImpl._environmentTeardownOptions = options === null || options === void 0 ? void 0 : options.teardown;
        TestBedImpl._environmentErrorOnUnknownElementsOption = options === null || options === void 0 ? void 0 : options.errorOnUnknownElements;
        TestBedImpl._environmentErrorOnUnknownPropertiesOption = options === null || options === void 0 ? void 0 : options.errorOnUnknownProperties;
        this.platform = platform;
        this.ngModule = ngModule;
        this._compiler = new test_bed_compiler_1.TestBedCompiler(this.platform, this.ngModule);
        // TestBed does not have an API which can reliably detect the start of a test, and thus could be
        // used to track the state of the NgModule registry and reset it correctly. Instead, when we
        // know we're in a testing scenario, we disable the check for duplicate NgModule registration
        // completely.
        (0, core_1.ɵsetAllowDuplicateNgModuleIdsForTest)(true);
    }
    /**
     * Reset the providers for the test injector.
     *
     * @publicApi
     */
    resetTestEnvironment() {
        this.resetTestingModule();
        this._compiler = null;
        this.platform = null;
        this.ngModule = null;
        TestBedImpl._environmentTeardownOptions = undefined;
        (0, core_1.ɵsetAllowDuplicateNgModuleIdsForTest)(false);
    }
    resetTestingModule() {
        var _a, _b;
        this.checkGlobalCompilationFinished();
        (0, core_1.ɵresetCompiledComponents)();
        if (this._compiler !== null) {
            this.compiler.restoreOriginalState();
        }
        this._compiler = new test_bed_compiler_1.TestBedCompiler(this.platform, this.ngModule);
        // Restore the previous value of the "error on unknown elements" option
        (0, core_1.ɵsetUnknownElementStrictMode)((_a = this._previousErrorOnUnknownElementsOption) !== null && _a !== void 0 ? _a : test_bed_common_1.THROW_ON_UNKNOWN_ELEMENTS_DEFAULT);
        // Restore the previous value of the "error on unknown properties" option
        (0, core_1.ɵsetUnknownPropertyStrictMode)((_b = this._previousErrorOnUnknownPropertiesOption) !== null && _b !== void 0 ? _b : test_bed_common_1.THROW_ON_UNKNOWN_PROPERTIES_DEFAULT);
        // We have to chain a couple of try/finally blocks, because each step can
        // throw errors and we don't want it to interrupt the next step and we also
        // want an error to be thrown at the end.
        try {
            this.destroyActiveFixtures();
        }
        finally {
            try {
                if (this.shouldTearDownTestingModule()) {
                    this.tearDownTestingModule();
                }
            }
            finally {
                this._testModuleRef = null;
                this._instanceTeardownOptions = undefined;
                this._instanceErrorOnUnknownElementsOption = undefined;
                this._instanceErrorOnUnknownPropertiesOption = undefined;
                this._instanceDeferBlockBehavior = test_bed_common_1.DEFER_BLOCK_DEFAULT_BEHAVIOR;
            }
        }
        return this;
    }
    configureCompiler(config) {
        if (config.useJit != null) {
            throw new Error('JIT compiler is not configurable via TestBed APIs.');
        }
        if (config.providers !== undefined) {
            this.compiler.setCompilerProviders(config.providers);
        }
        return this;
    }
    configureTestingModule(moduleDef) {
        var _a;
        this.assertNotInstantiated('TestBed.configureTestingModule', 'configure the test module');
        // Trigger module scoping queue flush before executing other TestBed operations in a test.
        // This is needed for the first test invocation to ensure that globally declared modules have
        // their components scoped properly. See the `checkGlobalCompilationFinished` function
        // description for additional info.
        this.checkGlobalCompilationFinished();
        // Always re-assign the options, even if they're undefined.
        // This ensures that we don't carry them between tests.
        this._instanceTeardownOptions = moduleDef.teardown;
        this._instanceErrorOnUnknownElementsOption = moduleDef.errorOnUnknownElements;
        this._instanceErrorOnUnknownPropertiesOption = moduleDef.errorOnUnknownProperties;
        this._instanceDeferBlockBehavior = (_a = moduleDef.deferBlockBehavior) !== null && _a !== void 0 ? _a : test_bed_common_1.DEFER_BLOCK_DEFAULT_BEHAVIOR;
        // Store the current value of the strict mode option,
        // so we can restore it later
        this._previousErrorOnUnknownElementsOption = (0, core_1.ɵgetUnknownElementStrictMode)();
        (0, core_1.ɵsetUnknownElementStrictMode)(this.shouldThrowErrorOnUnknownElements());
        this._previousErrorOnUnknownPropertiesOption = (0, core_1.ɵgetUnknownPropertyStrictMode)();
        (0, core_1.ɵsetUnknownPropertyStrictMode)(this.shouldThrowErrorOnUnknownProperties());
        this.compiler.configureTestingModule(moduleDef);
        return this;
    }
    compileComponents() {
        return this.compiler.compileComponents();
    }
    inject(token, notFoundValue, options) {
        if (token === exports.TestBed) {
            return this;
        }
        const UNDEFINED = {};
        const result = this.testModuleRef.injector.get(token, UNDEFINED, options);
        return result === UNDEFINED
            ? this.compiler.injector.get(token, notFoundValue, options)
            : result;
    }
    runInInjectionContext(fn) {
        return (0, core_1.runInInjectionContext)(this.inject(core_1.EnvironmentInjector), fn);
    }
    execute(tokens, fn, context) {
        const params = tokens.map((t) => this.inject(t));
        return fn.apply(context, params);
    }
    overrideModule(ngModule, override) {
        this.assertNotInstantiated('overrideModule', 'override module metadata');
        this.compiler.overrideModule(ngModule, override);
        return this;
    }
    overrideComponent(component, override) {
        this.assertNotInstantiated('overrideComponent', 'override component metadata');
        this.compiler.overrideComponent(component, override);
        return this;
    }
    overrideTemplateUsingTestingModule(component, template) {
        this.assertNotInstantiated('TestBed.overrideTemplateUsingTestingModule', 'Cannot override template when the test module has already been instantiated');
        this.compiler.overrideTemplateUsingTestingModule(component, template);
        return this;
    }
    overrideDirective(directive, override) {
        this.assertNotInstantiated('overrideDirective', 'override directive metadata');
        this.compiler.overrideDirective(directive, override);
        return this;
    }
    overridePipe(pipe, override) {
        this.assertNotInstantiated('overridePipe', 'override pipe metadata');
        this.compiler.overridePipe(pipe, override);
        return this;
    }
    /**
     * Overwrites all providers for the given token with the given provider definition.
     */
    overrideProvider(token, provider) {
        this.assertNotInstantiated('overrideProvider', 'override provider');
        this.compiler.overrideProvider(token, provider);
        return this;
    }
    overrideTemplate(component, template) {
        return this.overrideComponent(component, { set: { template, templateUrl: null } });
    }
    createComponent(type) {
        const testComponentRenderer = this.inject(test_bed_common_1.TestComponentRenderer);
        const rootElId = `root${_nextRootElementId++}`;
        testComponentRenderer.insertRootElement(rootElId);
        if ((0, core_1.ɵgetAsyncClassMetadataFn)(type)) {
            throw new Error(`Component '${type.name}' has unresolved metadata. ` +
                `Please call \`await TestBed.compileComponents()\` before running this test.`);
        }
        const componentDef = type.ɵcmp;
        if (!componentDef) {
            throw new Error(`It looks like '${(0, core_1.ɵstringify)(type)}' has not been compiled.`);
        }
        const componentFactory = new core_1.ɵRender3ComponentFactory(componentDef);
        const initComponent = () => {
            const componentRef = componentFactory.create(core_1.Injector.NULL, [], `#${rootElId}`, this.testModuleRef);
            return this.runInInjectionContext(() => new component_fixture_1.ComponentFixture(componentRef));
        };
        const noNgZone = this.inject(test_bed_common_1.ComponentFixtureNoNgZone, false);
        const ngZone = noNgZone ? null : this.inject(core_1.NgZone, null);
        const fixture = ngZone ? ngZone.run(initComponent) : initComponent();
        this._activeFixtures.push(fixture);
        return fixture;
    }
    /**
     * @internal strip this from published d.ts files due to
     * https://github.com/microsoft/TypeScript/issues/36216
     */
    get compiler() {
        if (this._compiler === null) {
            throw new Error(`Need to call TestBed.initTestEnvironment() first`);
        }
        return this._compiler;
    }
    /**
     * @internal strip this from published d.ts files due to
     * https://github.com/microsoft/TypeScript/issues/36216
     */
    get testModuleRef() {
        if (this._testModuleRef === null) {
            this._testModuleRef = this.compiler.finalize();
        }
        return this._testModuleRef;
    }
    assertNotInstantiated(methodName, methodDescription) {
        if (this._testModuleRef !== null) {
            throw new Error(`Cannot ${methodDescription} when the test module has already been instantiated. ` +
                `Make sure you are not using \`inject\` before \`${methodName}\`.`);
        }
    }
    /**
     * Check whether the module scoping queue should be flushed, and flush it if needed.
     *
     * When the TestBed is reset, it clears the JIT module compilation queue, cancelling any
     * in-progress module compilation. This creates a potential hazard - the very first time the
     * TestBed is initialized (or if it's reset without being initialized), there may be pending
     * compilations of modules declared in global scope. These compilations should be finished.
     *
     * To ensure that globally declared modules have their components scoped properly, this function
     * is called whenever TestBed is initialized or reset. The _first_ time that this happens, prior
     * to any other operations, the scoping queue is flushed.
     */
    checkGlobalCompilationFinished() {
        // Checking _testNgModuleRef is null should not be necessary, but is left in as an additional
        // guard that compilations queued in tests (after instantiation) are never flushed accidentally.
        if (!this.globalCompilationChecked && this._testModuleRef === null) {
            (0, core_1.ɵflushModuleScopingQueueAsMuchAsPossible)();
        }
        this.globalCompilationChecked = true;
    }
    destroyActiveFixtures() {
        let errorCount = 0;
        this._activeFixtures.forEach((fixture) => {
            try {
                fixture.destroy();
            }
            catch (e) {
                errorCount++;
                console.error('Error during cleanup of component', {
                    component: fixture.componentInstance,
                    stacktrace: e,
                });
            }
        });
        this._activeFixtures = [];
        if (errorCount > 0 && this.shouldRethrowTeardownErrors()) {
            throw Error(`${errorCount} ${errorCount === 1 ? 'component' : 'components'} ` +
                `threw errors during cleanup`);
        }
    }
    shouldRethrowTeardownErrors() {
        var _a, _b;
        const instanceOptions = this._instanceTeardownOptions;
        const environmentOptions = TestBedImpl._environmentTeardownOptions;
        // If the new teardown behavior hasn't been configured, preserve the old behavior.
        if (!instanceOptions && !environmentOptions) {
            return test_bed_common_1.TEARDOWN_TESTING_MODULE_ON_DESTROY_DEFAULT;
        }
        // Otherwise use the configured behavior or default to rethrowing.
        return ((_b = (_a = instanceOptions === null || instanceOptions === void 0 ? void 0 : instanceOptions.rethrowErrors) !== null && _a !== void 0 ? _a : environmentOptions === null || environmentOptions === void 0 ? void 0 : environmentOptions.rethrowErrors) !== null && _b !== void 0 ? _b : this.shouldTearDownTestingModule());
    }
    shouldThrowErrorOnUnknownElements() {
        var _a, _b;
        // Check if a configuration has been provided to throw when an unknown element is found
        return ((_b = (_a = this._instanceErrorOnUnknownElementsOption) !== null && _a !== void 0 ? _a : TestBedImpl._environmentErrorOnUnknownElementsOption) !== null && _b !== void 0 ? _b : test_bed_common_1.THROW_ON_UNKNOWN_ELEMENTS_DEFAULT);
    }
    shouldThrowErrorOnUnknownProperties() {
        var _a, _b;
        // Check if a configuration has been provided to throw when an unknown property is found
        return ((_b = (_a = this._instanceErrorOnUnknownPropertiesOption) !== null && _a !== void 0 ? _a : TestBedImpl._environmentErrorOnUnknownPropertiesOption) !== null && _b !== void 0 ? _b : test_bed_common_1.THROW_ON_UNKNOWN_PROPERTIES_DEFAULT);
    }
    shouldTearDownTestingModule() {
        var _a, _b, _c, _d;
        return ((_d = (_b = (_a = this._instanceTeardownOptions) === null || _a === void 0 ? void 0 : _a.destroyAfterEach) !== null && _b !== void 0 ? _b : (_c = TestBedImpl._environmentTeardownOptions) === null || _c === void 0 ? void 0 : _c.destroyAfterEach) !== null && _d !== void 0 ? _d : test_bed_common_1.TEARDOWN_TESTING_MODULE_ON_DESTROY_DEFAULT);
    }
    getDeferBlockBehavior() {
        return this._instanceDeferBlockBehavior;
    }
    tearDownTestingModule() {
        var _a;
        // If the module ref has already been destroyed, we won't be able to get a test renderer.
        if (this._testModuleRef === null) {
            return;
        }
        // Resolve the renderer ahead of time, because we want to remove the root elements as the very
        // last step, but the injector will be destroyed as a part of the module ref destruction.
        const testRenderer = this.inject(test_bed_common_1.TestComponentRenderer);
        try {
            this._testModuleRef.destroy();
        }
        catch (e) {
            if (this.shouldRethrowTeardownErrors()) {
                throw e;
            }
            else {
                console.error('Error during cleanup of a testing module', {
                    component: this._testModuleRef.instance,
                    stacktrace: e,
                });
            }
        }
        finally {
            (_a = testRenderer.removeAllRootElements) === null || _a === void 0 ? void 0 : _a.call(testRenderer);
        }
    }
    /**
     * Execute any pending work required to synchronize model to the UI.
     *
     * @publicApi
     */
    tick() {
        this.inject(core_1.ApplicationRef).tick();
    }
}
exports.TestBedImpl = TestBedImpl;
TestBedImpl._INSTANCE = null;
/**
 * @description
 * Configures and initializes environment for unit testing and provides methods for
 * creating components and services in unit tests.
 *
 * `TestBed` is the primary api for writing unit tests for Angular applications and libraries.
 *
 * @publicApi
 */
exports.TestBed = TestBedImpl;
/**
 * Allows injecting dependencies in `beforeEach()` and `it()`. Note: this function
 * (imported from the `@angular/core/testing` package) can **only** be used to inject dependencies
 * in tests. To inject dependencies in your application code, use the [`inject`](api/core/inject)
 * function from the `@angular/core` package instead.
 *
 * Example:
 *
 * ```ts
 * beforeEach(inject([Dependency, AClass], (dep, object) => {
 *   // some code that uses `dep` and `object`
 *   // ...
 * }));
 *
 * it('...', inject([AClass], (object) => {
 *   object.doSomething();
 *   expect(...);
 * })
 * ```
 *
 * @publicApi
 */
function inject(tokens, fn) {
    const testBed = TestBedImpl.INSTANCE;
    // Not using an arrow function to preserve context passed from call site
    return function () {
        return testBed.execute(tokens, fn, this);
    };
}
/**
 * @publicApi
 */
class InjectSetupWrapper {
    constructor(_moduleDef) {
        this._moduleDef = _moduleDef;
    }
    _addModule() {
        const moduleDef = this._moduleDef();
        if (moduleDef) {
            TestBedImpl.configureTestingModule(moduleDef);
        }
    }
    inject(tokens, fn) {
        const self = this;
        // Not using an arrow function to preserve context passed from call site
        return function () {
            self._addModule();
            return inject(tokens, fn).call(this);
        };
    }
}
exports.InjectSetupWrapper = InjectSetupWrapper;
function withModule(moduleDef, fn) {
    if (fn) {
        // Not using an arrow function to preserve context passed from call site
        return function () {
            const testBed = TestBedImpl.INSTANCE;
            if (moduleDef) {
                testBed.configureTestingModule(moduleDef);
            }
            return fn.apply(this);
        };
    }
    return new InjectSetupWrapper(() => moduleDef);
}
