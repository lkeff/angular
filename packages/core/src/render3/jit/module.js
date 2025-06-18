"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.flushModuleScopingQueueAsMuchAsPossible = flushModuleScopingQueueAsMuchAsPossible;
exports.compileNgModule = compileNgModule;
exports.compileNgModuleDefs = compileNgModuleDefs;
exports.generateStandaloneInDeclarationsError = generateStandaloneInDeclarationsError;
exports.resetCompiledComponents = resetCompiledComponents;
exports.patchComponentDefWithScope = patchComponentDefWithScope;
exports.transitiveScopesFor = transitiveScopesFor;
exports.transitiveScopesForNgModule = transitiveScopesForNgModule;
const compiler_facade_1 = require("../../compiler/compiler_facade");
const forward_ref_1 = require("../../di/forward_ref");
const defs_1 = require("../../di/interface/defs");
const util_1 = require("../../di/jit/util");
const ng_module_registration_1 = require("../../linker/ng_module_registration");
const array_utils_1 = require("../../util/array_utils");
const assert_1 = require("../../util/assert");
const empty_1 = require("../../util/empty");
const definition_1 = require("../definition");
const def_getters_1 = require("../def_getters");
const deps_tracker_1 = require("../deps_tracker/deps_tracker");
const fields_1 = require("../fields");
const misc_utils_1 = require("../util/misc_utils");
const stringify_utils_1 = require("../util/stringify_utils");
const environment_1 = require("./environment");
const module_patch_1 = require("./module_patch");
const util_2 = require("./util");
const moduleQueue = [];
/**
 * Enqueues moduleDef to be checked later to see if scope can be set on its
 * component declarations.
 */
function enqueueModuleForDelayedScoping(moduleType, ngModule) {
    moduleQueue.push({ moduleType, ngModule });
}
let flushingModuleQueue = false;
/**
 * Loops over queued module definitions, if a given module definition has all of its
 * declarations resolved, it dequeues that module definition and sets the scope on
 * its declarations.
 */
function flushModuleScopingQueueAsMuchAsPossible() {
    if (!flushingModuleQueue) {
        flushingModuleQueue = true;
        try {
            for (let i = moduleQueue.length - 1; i >= 0; i--) {
                const { moduleType, ngModule } = moduleQueue[i];
                if (ngModule.declarations && ngModule.declarations.every(isResolvedDeclaration)) {
                    // dequeue
                    moduleQueue.splice(i, 1);
                    setScopeOnDeclaredComponents(moduleType, ngModule);
                }
            }
        }
        finally {
            flushingModuleQueue = false;
        }
    }
}
/**
 * Returns truthy if a declaration has resolved. If the declaration happens to be
 * an array of declarations, it will recurse to check each declaration in that array
 * (which may also be arrays).
 */
function isResolvedDeclaration(declaration) {
    if (Array.isArray(declaration)) {
        return declaration.every(isResolvedDeclaration);
    }
    return !!(0, forward_ref_1.resolveForwardRef)(declaration);
}
/**
 * Compiles a module in JIT mode.
 *
 * This function automatically gets called when a class has a `@NgModule` decorator.
 */
function compileNgModule(moduleType, ngModule = {}) {
    (0, module_patch_1.patchModuleCompilation)();
    compileNgModuleDefs(moduleType, ngModule);
    if (ngModule.id !== undefined) {
        (0, ng_module_registration_1.registerNgModuleType)(moduleType, ngModule.id);
    }
    // Because we don't know if all declarations have resolved yet at the moment the
    // NgModule decorator is executing, we're enqueueing the setting of module scope
    // on its declarations to be run at a later time when all declarations for the module,
    // including forward refs, have resolved.
    enqueueModuleForDelayedScoping(moduleType, ngModule);
}
/**
 * Compiles and adds the `ɵmod`, `ɵfac` and `ɵinj` properties to the module class.
 *
 * It's possible to compile a module via this API which will allow duplicate declarations in its
 * root.
 */
function compileNgModuleDefs(moduleType, ngModule, allowDuplicateDeclarationsInRoot = false) {
    ngDevMode && (0, assert_1.assertDefined)(moduleType, 'Required value moduleType');
    ngDevMode && (0, assert_1.assertDefined)(ngModule, 'Required value ngModule');
    const declarations = (0, array_utils_1.flatten)(ngModule.declarations || empty_1.EMPTY_ARRAY);
    let ngModuleDef = null;
    Object.defineProperty(moduleType, fields_1.NG_MOD_DEF, {
        configurable: true,
        get: () => {
            if (ngModuleDef === null) {
                if (ngDevMode && ngModule.imports && ngModule.imports.indexOf(moduleType) > -1) {
                    // We need to assert this immediately, because allowing it to continue will cause it to
                    // go into an infinite loop before we've reached the point where we throw all the errors.
                    throw new Error(`'${(0, stringify_utils_1.stringifyForError)(moduleType)}' module can't import itself`);
                }
                const compiler = (0, compiler_facade_1.getCompilerFacade)({
                    usage: 0 /* JitCompilerUsage.Decorator */,
                    kind: 'NgModule',
                    type: moduleType,
                });
                ngModuleDef = compiler.compileNgModule(environment_1.angularCoreEnv, `ng:///${moduleType.name}/ɵmod.js`, {
                    type: moduleType,
                    bootstrap: (0, array_utils_1.flatten)(ngModule.bootstrap || empty_1.EMPTY_ARRAY).map(forward_ref_1.resolveForwardRef),
                    declarations: declarations.map(forward_ref_1.resolveForwardRef),
                    imports: (0, array_utils_1.flatten)(ngModule.imports || empty_1.EMPTY_ARRAY)
                        .map(forward_ref_1.resolveForwardRef)
                        .map(expandModuleWithProviders),
                    exports: (0, array_utils_1.flatten)(ngModule.exports || empty_1.EMPTY_ARRAY)
                        .map(forward_ref_1.resolveForwardRef)
                        .map(expandModuleWithProviders),
                    schemas: ngModule.schemas ? (0, array_utils_1.flatten)(ngModule.schemas) : null,
                    id: ngModule.id || null,
                });
                // Set `schemas` on ngModuleDef to an empty array in JIT mode to indicate that runtime
                // should verify that there are no unknown elements in a template. In AOT mode, that check
                // happens at compile time and `schemas` information is not present on Component and Module
                // defs after compilation (so the check doesn't happen the second time at runtime).
                if (!ngModuleDef.schemas) {
                    ngModuleDef.schemas = [];
                }
            }
            return ngModuleDef;
        },
    });
    let ngFactoryDef = null;
    Object.defineProperty(moduleType, fields_1.NG_FACTORY_DEF, {
        get: () => {
            if (ngFactoryDef === null) {
                const compiler = (0, compiler_facade_1.getCompilerFacade)({
                    usage: 0 /* JitCompilerUsage.Decorator */,
                    kind: 'NgModule',
                    type: moduleType,
                });
                ngFactoryDef = compiler.compileFactory(environment_1.angularCoreEnv, `ng:///${moduleType.name}/ɵfac.js`, {
                    name: moduleType.name,
                    type: moduleType,
                    deps: (0, util_1.reflectDependencies)(moduleType),
                    target: compiler.FactoryTarget.NgModule,
                    typeArgumentCount: 0,
                });
            }
            return ngFactoryDef;
        },
        // Make the property configurable in dev mode to allow overriding in tests
        configurable: !!ngDevMode,
    });
    let ngInjectorDef = null;
    Object.defineProperty(moduleType, defs_1.NG_INJ_DEF, {
        get: () => {
            if (ngInjectorDef === null) {
                ngDevMode && verifySemanticsOfNgModuleDef(moduleType, allowDuplicateDeclarationsInRoot);
                const meta = {
                    name: moduleType.name,
                    type: moduleType,
                    providers: ngModule.providers || empty_1.EMPTY_ARRAY,
                    imports: [
                        (ngModule.imports || empty_1.EMPTY_ARRAY).map(forward_ref_1.resolveForwardRef),
                        (ngModule.exports || empty_1.EMPTY_ARRAY).map(forward_ref_1.resolveForwardRef),
                    ],
                };
                const compiler = (0, compiler_facade_1.getCompilerFacade)({
                    usage: 0 /* JitCompilerUsage.Decorator */,
                    kind: 'NgModule',
                    type: moduleType,
                });
                ngInjectorDef = compiler.compileInjector(environment_1.angularCoreEnv, `ng:///${moduleType.name}/ɵinj.js`, meta);
            }
            return ngInjectorDef;
        },
        // Make the property configurable in dev mode to allow overriding in tests
        configurable: !!ngDevMode,
    });
}
function generateStandaloneInDeclarationsError(type, location) {
    const prefix = `Unexpected "${(0, stringify_utils_1.stringifyForError)(type)}" found in the "declarations" array of the`;
    const suffix = `"${(0, stringify_utils_1.stringifyForError)(type)}" is marked as standalone and can't be declared ` +
        'in any NgModule - did you intend to import it instead (by adding it to the "imports" array)?';
    return `${prefix} ${location}, ${suffix}`;
}
function verifySemanticsOfNgModuleDef(moduleType, allowDuplicateDeclarationsInRoot, importingModule) {
    if (verifiedNgModule.get(moduleType))
        return;
    // skip verifications of standalone components, directives, and pipes
    if ((0, def_getters_1.isStandalone)(moduleType))
        return;
    verifiedNgModule.set(moduleType, true);
    moduleType = (0, forward_ref_1.resolveForwardRef)(moduleType);
    let ngModuleDef;
    if (importingModule) {
        ngModuleDef = (0, def_getters_1.getNgModuleDef)(moduleType);
        if (!ngModuleDef) {
            throw new Error(`Unexpected value '${moduleType.name}' imported by the module '${importingModule.name}'. Please add an @NgModule annotation.`);
        }
    }
    else {
        ngModuleDef = (0, def_getters_1.getNgModuleDefOrThrow)(moduleType);
    }
    const errors = [];
    const declarations = (0, misc_utils_1.maybeUnwrapFn)(ngModuleDef.declarations);
    const imports = (0, misc_utils_1.maybeUnwrapFn)(ngModuleDef.imports);
    (0, array_utils_1.flatten)(imports)
        .map(unwrapModuleWithProvidersImports)
        .forEach((modOrStandaloneCmpt) => {
        verifySemanticsOfNgModuleImport(modOrStandaloneCmpt, moduleType);
        verifySemanticsOfNgModuleDef(modOrStandaloneCmpt, false, moduleType);
    });
    const exports = (0, misc_utils_1.maybeUnwrapFn)(ngModuleDef.exports);
    declarations.forEach(verifyDeclarationsHaveDefinitions);
    declarations.forEach(verifyDirectivesHaveSelector);
    declarations.forEach((declarationType) => verifyNotStandalone(declarationType, moduleType));
    const combinedDeclarations = [
        ...declarations.map(forward_ref_1.resolveForwardRef),
        ...(0, array_utils_1.flatten)(imports.map(computeCombinedExports)).map(forward_ref_1.resolveForwardRef),
    ];
    exports.forEach(verifyExportsAreDeclaredOrReExported);
    declarations.forEach((decl) => verifyDeclarationIsUnique(decl, allowDuplicateDeclarationsInRoot));
    const ngModule = getAnnotation(moduleType, 'NgModule');
    if (ngModule) {
        ngModule.imports &&
            (0, array_utils_1.flatten)(ngModule.imports)
                .map(unwrapModuleWithProvidersImports)
                .forEach((mod) => {
                verifySemanticsOfNgModuleImport(mod, moduleType);
                verifySemanticsOfNgModuleDef(mod, false, moduleType);
            });
        ngModule.bootstrap && (0, array_utils_1.deepForEach)(ngModule.bootstrap, verifyCorrectBootstrapType);
        ngModule.bootstrap && (0, array_utils_1.deepForEach)(ngModule.bootstrap, verifyComponentIsPartOfNgModule);
    }
    // Throw Error if any errors were detected.
    if (errors.length) {
        throw new Error(errors.join('\n'));
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////
    function verifyDeclarationsHaveDefinitions(type) {
        type = (0, forward_ref_1.resolveForwardRef)(type);
        const def = (0, def_getters_1.getComponentDef)(type) || (0, def_getters_1.getDirectiveDef)(type) || (0, def_getters_1.getPipeDef)(type);
        if (!def) {
            errors.push(`Unexpected value '${(0, stringify_utils_1.stringifyForError)(type)}' declared by the module '${(0, stringify_utils_1.stringifyForError)(moduleType)}'. Please add a @Pipe/@Directive/@Component annotation.`);
        }
    }
    function verifyDirectivesHaveSelector(type) {
        type = (0, forward_ref_1.resolveForwardRef)(type);
        const def = (0, def_getters_1.getDirectiveDef)(type);
        if (!(0, def_getters_1.getComponentDef)(type) && def && def.selectors.length == 0) {
            errors.push(`Directive ${(0, stringify_utils_1.stringifyForError)(type)} has no selector, please add it!`);
        }
    }
    function verifyNotStandalone(type, moduleType) {
        type = (0, forward_ref_1.resolveForwardRef)(type);
        const def = (0, def_getters_1.getComponentDef)(type) || (0, def_getters_1.getDirectiveDef)(type) || (0, def_getters_1.getPipeDef)(type);
        if (def === null || def === void 0 ? void 0 : def.standalone) {
            const location = `"${(0, stringify_utils_1.stringifyForError)(moduleType)}" NgModule`;
            errors.push(generateStandaloneInDeclarationsError(type, location));
        }
    }
    function verifyExportsAreDeclaredOrReExported(type) {
        type = (0, forward_ref_1.resolveForwardRef)(type);
        const kind = ((0, def_getters_1.getComponentDef)(type) && 'component') ||
            ((0, def_getters_1.getDirectiveDef)(type) && 'directive') ||
            ((0, def_getters_1.getPipeDef)(type) && 'pipe');
        if (kind) {
            // only checked if we are declared as Component, Directive, or Pipe
            // Modules don't need to be declared or imported.
            if (combinedDeclarations.lastIndexOf(type) === -1) {
                // We are exporting something which we don't explicitly declare or import.
                errors.push(`Can't export ${kind} ${(0, stringify_utils_1.stringifyForError)(type)} from ${(0, stringify_utils_1.stringifyForError)(moduleType)} as it was neither declared nor imported!`);
            }
        }
    }
    function verifyDeclarationIsUnique(type, suppressErrors) {
        type = (0, forward_ref_1.resolveForwardRef)(type);
        const existingModule = ownerNgModule.get(type);
        if (existingModule && existingModule !== moduleType) {
            if (!suppressErrors) {
                const modules = [existingModule, moduleType].map(stringify_utils_1.stringifyForError).sort();
                errors.push(`Type ${(0, stringify_utils_1.stringifyForError)(type)} is part of the declarations of 2 modules: ${modules[0]} and ${modules[1]}! ` +
                    `Please consider moving ${(0, stringify_utils_1.stringifyForError)(type)} to a higher module that imports ${modules[0]} and ${modules[1]}. ` +
                    `You can also create a new NgModule that exports and includes ${(0, stringify_utils_1.stringifyForError)(type)} then import that NgModule in ${modules[0]} and ${modules[1]}.`);
            }
        }
        else {
            // Mark type as having owner.
            ownerNgModule.set(type, moduleType);
        }
    }
    function verifyComponentIsPartOfNgModule(type) {
        type = (0, forward_ref_1.resolveForwardRef)(type);
        const existingModule = ownerNgModule.get(type);
        if (!existingModule && !(0, def_getters_1.isStandalone)(type)) {
            errors.push(`Component ${(0, stringify_utils_1.stringifyForError)(type)} is not part of any NgModule or the module has not been imported into your module.`);
        }
    }
    function verifyCorrectBootstrapType(type) {
        type = (0, forward_ref_1.resolveForwardRef)(type);
        if (!(0, def_getters_1.getComponentDef)(type)) {
            errors.push(`${(0, stringify_utils_1.stringifyForError)(type)} cannot be used as an entry component.`);
        }
        if ((0, def_getters_1.isStandalone)(type)) {
            // Note: this error should be the same as the
            // `NGMODULE_BOOTSTRAP_IS_STANDALONE` one in AOT compiler.
            errors.push(`The \`${(0, stringify_utils_1.stringifyForError)(type)}\` class is a standalone component, which can ` +
                `not be used in the \`@NgModule.bootstrap\` array. Use the \`bootstrapApplication\` ` +
                `function for bootstrap instead.`);
        }
    }
    function verifySemanticsOfNgModuleImport(type, importingModule) {
        type = (0, forward_ref_1.resolveForwardRef)(type);
        const directiveDef = (0, def_getters_1.getComponentDef)(type) || (0, def_getters_1.getDirectiveDef)(type);
        if (directiveDef !== null && !directiveDef.standalone) {
            throw new Error(`Unexpected directive '${type.name}' imported by the module '${importingModule.name}'. Please add an @NgModule annotation.`);
        }
        const pipeDef = (0, def_getters_1.getPipeDef)(type);
        if (pipeDef !== null && !pipeDef.standalone) {
            throw new Error(`Unexpected pipe '${type.name}' imported by the module '${importingModule.name}'. Please add an @NgModule annotation.`);
        }
    }
}
function unwrapModuleWithProvidersImports(typeOrWithProviders) {
    typeOrWithProviders = (0, forward_ref_1.resolveForwardRef)(typeOrWithProviders);
    return typeOrWithProviders.ngModule || typeOrWithProviders;
}
function getAnnotation(type, name) {
    let annotation = null;
    collect(type.__annotations__);
    collect(type.decorators);
    return annotation;
    function collect(annotations) {
        if (annotations) {
            annotations.forEach(readAnnotation);
        }
    }
    function readAnnotation(decorator) {
        if (!annotation) {
            const proto = Object.getPrototypeOf(decorator);
            if (proto.ngMetadataName == name) {
                annotation = decorator;
            }
            else if (decorator.type) {
                const proto = Object.getPrototypeOf(decorator.type);
                if (proto.ngMetadataName == name) {
                    annotation = decorator.args[0];
                }
            }
        }
    }
}
/**
 * Keep track of compiled components. This is needed because in tests we often want to compile the
 * same component with more than one NgModule. This would cause an error unless we reset which
 * NgModule the component belongs to. We keep the list of compiled components here so that the
 * TestBed can reset it later.
 */
let ownerNgModule = new WeakMap();
let verifiedNgModule = new WeakMap();
function resetCompiledComponents() {
    ownerNgModule = new WeakMap();
    verifiedNgModule = new WeakMap();
    moduleQueue.length = 0;
    definition_1.GENERATED_COMP_IDS.clear();
}
/**
 * Computes the combined declarations of explicit declarations, as well as declarations inherited by
 * traversing the exports of imported modules.
 * @param type
 */
function computeCombinedExports(type) {
    type = (0, forward_ref_1.resolveForwardRef)(type);
    const ngModuleDef = (0, def_getters_1.getNgModuleDef)(type);
    // a standalone component, directive or pipe
    if (ngModuleDef === null) {
        return [type];
    }
    return (0, array_utils_1.flatten)((0, misc_utils_1.maybeUnwrapFn)(ngModuleDef.exports).map((type) => {
        const ngModuleDef = (0, def_getters_1.getNgModuleDef)(type);
        if (ngModuleDef) {
            verifySemanticsOfNgModuleDef(type, false);
            return computeCombinedExports(type);
        }
        else {
            return type;
        }
    }));
}
/**
 * Some declared components may be compiled asynchronously, and thus may not have their
 * ɵcmp set yet. If this is the case, then a reference to the module is written into
 * the `ngSelectorScope` property of the declared type.
 */
function setScopeOnDeclaredComponents(moduleType, ngModule) {
    const declarations = (0, array_utils_1.flatten)(ngModule.declarations || empty_1.EMPTY_ARRAY);
    const transitiveScopes = transitiveScopesFor(moduleType);
    declarations.forEach((declaration) => {
        declaration = (0, forward_ref_1.resolveForwardRef)(declaration);
        if (declaration.hasOwnProperty(fields_1.NG_COMP_DEF)) {
            // A `ɵcmp` field exists - go ahead and patch the component directly.
            const component = declaration;
            const componentDef = (0, def_getters_1.getComponentDef)(component);
            patchComponentDefWithScope(componentDef, transitiveScopes);
        }
        else if (!declaration.hasOwnProperty(fields_1.NG_DIR_DEF) &&
            !declaration.hasOwnProperty(fields_1.NG_PIPE_DEF)) {
            // Set `ngSelectorScope` for future reference when the component compilation finishes.
            declaration.ngSelectorScope = moduleType;
        }
    });
}
/**
 * Patch the definition of a component with directives and pipes from the compilation scope of
 * a given module.
 */
function patchComponentDefWithScope(componentDef, transitiveScopes) {
    componentDef.directiveDefs = () => Array.from(transitiveScopes.compilation.directives)
        .map((dir) => dir.hasOwnProperty(fields_1.NG_COMP_DEF) ? (0, def_getters_1.getComponentDef)(dir) : (0, def_getters_1.getDirectiveDef)(dir))
        .filter((def) => !!def);
    componentDef.pipeDefs = () => Array.from(transitiveScopes.compilation.pipes).map((pipe) => (0, def_getters_1.getPipeDef)(pipe));
    componentDef.schemas = transitiveScopes.schemas;
    // Since we avoid Components/Directives/Pipes recompiling in case there are no overrides, we
    // may face a problem where previously compiled defs available to a given Component/Directive
    // are cached in TView and may become stale (in case any of these defs gets recompiled). In
    // order to avoid this problem, we force fresh TView to be created.
    componentDef.tView = null;
}
/**
 * Compute the pair of transitive scopes (compilation scope and exported scope) for a given type
 * (either a NgModule or a standalone component / directive / pipe).
 */
function transitiveScopesFor(type) {
    if ((0, util_2.isNgModule)(type)) {
        if (deps_tracker_1.USE_RUNTIME_DEPS_TRACKER_FOR_JIT) {
            const scope = deps_tracker_1.depsTracker.getNgModuleScope(type);
            const def = (0, def_getters_1.getNgModuleDefOrThrow)(type);
            return Object.assign({ schemas: def.schemas || null }, scope);
        }
        else {
            return transitiveScopesForNgModule(type);
        }
    }
    else if ((0, def_getters_1.isStandalone)(type)) {
        const directiveDef = (0, def_getters_1.getComponentDef)(type) || (0, def_getters_1.getDirectiveDef)(type);
        if (directiveDef !== null) {
            return {
                schemas: null,
                compilation: {
                    directives: new Set(),
                    pipes: new Set(),
                },
                exported: {
                    directives: new Set([type]),
                    pipes: new Set(),
                },
            };
        }
        const pipeDef = (0, def_getters_1.getPipeDef)(type);
        if (pipeDef !== null) {
            return {
                schemas: null,
                compilation: {
                    directives: new Set(),
                    pipes: new Set(),
                },
                exported: {
                    directives: new Set(),
                    pipes: new Set([type]),
                },
            };
        }
    }
    // TODO: change the error message to be more user-facing and take standalone into account
    throw new Error(`${type.name} does not have a module def (ɵmod property)`);
}
/**
 * Compute the pair of transitive scopes (compilation scope and exported scope) for a given module.
 *
 * This operation is memoized and the result is cached on the module's definition. This function can
 * be called on modules with components that have not fully compiled yet, but the result should not
 * be used until they have.
 *
 * @param moduleType module that transitive scope should be calculated for.
 */
function transitiveScopesForNgModule(moduleType) {
    const def = (0, def_getters_1.getNgModuleDefOrThrow)(moduleType);
    if (def.transitiveCompileScopes !== null) {
        return def.transitiveCompileScopes;
    }
    const scopes = {
        schemas: def.schemas || null,
        compilation: {
            directives: new Set(),
            pipes: new Set(),
        },
        exported: {
            directives: new Set(),
            pipes: new Set(),
        },
    };
    (0, misc_utils_1.maybeUnwrapFn)(def.imports).forEach((imported) => {
        // When this module imports another, the imported module's exported directives and pipes are
        // added to the compilation scope of this module.
        const importedScope = transitiveScopesFor(imported);
        importedScope.exported.directives.forEach((entry) => scopes.compilation.directives.add(entry));
        importedScope.exported.pipes.forEach((entry) => scopes.compilation.pipes.add(entry));
    });
    (0, misc_utils_1.maybeUnwrapFn)(def.declarations).forEach((declared) => {
        const declaredWithDefs = declared;
        if ((0, def_getters_1.getPipeDef)(declaredWithDefs)) {
            scopes.compilation.pipes.add(declared);
        }
        else {
            // Either declared has a ɵcmp or ɵdir, or it's a component which hasn't
            // had its template compiled yet. In either case, it gets added to the compilation's
            // directives.
            scopes.compilation.directives.add(declared);
        }
    });
    (0, misc_utils_1.maybeUnwrapFn)(def.exports).forEach((exported) => {
        const exportedType = exported;
        // Either the type is a module, a pipe, or a component/directive (which may not have a
        // ɵcmp as it might be compiled asynchronously).
        if ((0, util_2.isNgModule)(exportedType)) {
            // When this module exports another, the exported module's exported directives and pipes are
            // added to both the compilation and exported scopes of this module.
            const exportedScope = transitiveScopesFor(exportedType);
            exportedScope.exported.directives.forEach((entry) => {
                scopes.compilation.directives.add(entry);
                scopes.exported.directives.add(entry);
            });
            exportedScope.exported.pipes.forEach((entry) => {
                scopes.compilation.pipes.add(entry);
                scopes.exported.pipes.add(entry);
            });
        }
        else if ((0, def_getters_1.getPipeDef)(exportedType)) {
            scopes.exported.pipes.add(exportedType);
        }
        else {
            scopes.exported.directives.add(exportedType);
        }
    });
    def.transitiveCompileScopes = scopes;
    return scopes;
}
function expandModuleWithProviders(value) {
    if ((0, util_2.isModuleWithProviders)(value)) {
        return value.ngModule;
    }
    return value;
}
