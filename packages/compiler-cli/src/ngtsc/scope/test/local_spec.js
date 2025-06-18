"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = __importDefault(require("typescript"));
const imports_1 = require("../../imports");
const metadata_1 = require("../../metadata");
const local_1 = require("../src/local");
function registerFakeRefs(registry) {
    const get = (target, name) => {
        const sf = typescript_1.default.createSourceFile(name + '.ts', `export class ${name} {}`, typescript_1.default.ScriptTarget.Latest, true, typescript_1.default.ScriptKind.TS);
        const clazz = sf.statements[0];
        const ref = new imports_1.Reference(clazz);
        if (name.startsWith('Dir') || name.startsWith('Cmp')) {
            registry.registerDirectiveMetadata(fakeDirective(ref));
        }
        else if (name.startsWith('Pipe')) {
            registry.registerPipeMetadata(fakePipe(ref));
        }
        return ref;
    };
    return new Proxy({}, { get });
}
describe('LocalModuleScopeRegistry', () => {
    const refEmitter = new imports_1.ReferenceEmitter([]);
    let scopeRegistry;
    let metaRegistry;
    beforeEach(() => {
        const localRegistry = new metadata_1.LocalMetadataRegistry();
        scopeRegistry = new local_1.LocalModuleScopeRegistry(localRegistry, localRegistry, new MockDtsModuleScopeResolver(), refEmitter, null);
        metaRegistry = new metadata_1.CompoundMetadataRegistry([localRegistry, scopeRegistry]);
    });
    it('should produce an accurate LocalModuleScope for a basic NgModule', () => {
        const { Dir1, Dir2, Pipe1, Module } = registerFakeRefs(metaRegistry);
        metaRegistry.registerNgModuleMetadata({
            kind: metadata_1.MetaKind.NgModule,
            ref: new imports_1.Reference(Module.node),
            imports: [],
            declarations: [Dir1, Dir2, Pipe1],
            exports: [Dir1, Pipe1],
            schemas: [],
            rawDeclarations: null,
            rawImports: null,
            rawExports: null,
            decorator: null,
            mayDeclareProviders: false,
            isPoisoned: false,
        });
        const scope = scopeRegistry.getScopeOfModule(Module.node);
        expect(scopeToRefs(scope.compilation)).toEqual([Dir1, Dir2, Pipe1]);
        expect(scopeToRefs(scope.exported)).toEqual([Dir1, Pipe1]);
    });
    it('should produce accurate LocalModuleScopes for a complex module chain', () => {
        const { DirA, DirB, DirCI, DirCE, ModuleA, ModuleB, ModuleC } = registerFakeRefs(metaRegistry);
        metaRegistry.registerNgModuleMetadata({
            kind: metadata_1.MetaKind.NgModule,
            ref: new imports_1.Reference(ModuleA.node),
            imports: [ModuleB],
            declarations: [DirA],
            exports: [],
            schemas: [],
            rawDeclarations: null,
            rawImports: null,
            rawExports: null,
            decorator: null,
            mayDeclareProviders: false,
            isPoisoned: false,
        });
        metaRegistry.registerNgModuleMetadata({
            kind: metadata_1.MetaKind.NgModule,
            ref: new imports_1.Reference(ModuleB.node),
            exports: [ModuleC, DirB],
            declarations: [DirB],
            imports: [],
            schemas: [],
            rawDeclarations: null,
            rawImports: null,
            rawExports: null,
            decorator: null,
            mayDeclareProviders: false,
            isPoisoned: false,
        });
        metaRegistry.registerNgModuleMetadata({
            kind: metadata_1.MetaKind.NgModule,
            ref: new imports_1.Reference(ModuleC.node),
            declarations: [DirCI, DirCE],
            exports: [DirCE],
            imports: [],
            schemas: [],
            rawDeclarations: null,
            rawImports: null,
            rawExports: null,
            decorator: null,
            mayDeclareProviders: false,
            isPoisoned: false,
        });
        const scopeA = scopeRegistry.getScopeOfModule(ModuleA.node);
        expect(scopeToRefs(scopeA.compilation)).toEqual([DirA, DirB, DirCE]);
        expect(scopeToRefs(scopeA.exported)).toEqual([]);
    });
    it('should not treat exported modules as imported', () => {
        const { Dir, ModuleA, ModuleB } = registerFakeRefs(metaRegistry);
        metaRegistry.registerNgModuleMetadata({
            kind: metadata_1.MetaKind.NgModule,
            ref: new imports_1.Reference(ModuleA.node),
            exports: [ModuleB],
            imports: [],
            declarations: [],
            schemas: [],
            rawDeclarations: null,
            rawImports: null,
            rawExports: null,
            decorator: null,
            mayDeclareProviders: false,
            isPoisoned: false,
        });
        metaRegistry.registerNgModuleMetadata({
            kind: metadata_1.MetaKind.NgModule,
            ref: new imports_1.Reference(ModuleB.node),
            declarations: [Dir],
            exports: [Dir],
            imports: [],
            schemas: [],
            rawDeclarations: null,
            rawImports: null,
            rawExports: null,
            decorator: null,
            mayDeclareProviders: false,
            isPoisoned: false,
        });
        const scopeA = scopeRegistry.getScopeOfModule(ModuleA.node);
        expect(scopeToRefs(scopeA.compilation)).toEqual([]);
        expect(scopeToRefs(scopeA.exported)).toEqual([Dir]);
    });
    it('should deduplicate declarations and exports', () => {
        const { DirA, ModuleA, DirB, ModuleB, ModuleC } = registerFakeRefs(metaRegistry);
        metaRegistry.registerNgModuleMetadata({
            kind: metadata_1.MetaKind.NgModule,
            ref: new imports_1.Reference(ModuleA.node),
            declarations: [DirA, DirA],
            imports: [ModuleB, ModuleC],
            exports: [DirA, DirA, DirB, ModuleB],
            schemas: [],
            rawDeclarations: null,
            rawImports: null,
            rawExports: null,
            decorator: null,
            mayDeclareProviders: false,
            isPoisoned: false,
        });
        metaRegistry.registerNgModuleMetadata({
            kind: metadata_1.MetaKind.NgModule,
            ref: new imports_1.Reference(ModuleB.node),
            declarations: [DirB],
            imports: [],
            exports: [DirB],
            schemas: [],
            rawDeclarations: null,
            rawImports: null,
            rawExports: null,
            decorator: null,
            mayDeclareProviders: false,
            isPoisoned: false,
        });
        metaRegistry.registerNgModuleMetadata({
            kind: metadata_1.MetaKind.NgModule,
            ref: new imports_1.Reference(ModuleC.node),
            declarations: [],
            imports: [],
            exports: [ModuleB],
            schemas: [],
            rawDeclarations: null,
            rawImports: null,
            rawExports: null,
            decorator: null,
            mayDeclareProviders: false,
            isPoisoned: false,
        });
        const scope = scopeRegistry.getScopeOfModule(ModuleA.node);
        expect(scopeToRefs(scope.compilation)).toEqual([DirA, DirB]);
        expect(scopeToRefs(scope.exported)).toEqual([DirA, DirB]);
    });
    it('should preserve reference identities in module metadata', () => {
        const { Dir, Module } = registerFakeRefs(metaRegistry);
        const idSf = typescript_1.default.createSourceFile('id.ts', 'var id;', typescript_1.default.ScriptTarget.Latest, true);
        // Create a new Reference to Dir, with a special `ts.Identifier`, and register the directive
        // using it. This emulates what happens when an NgModule declares a Directive.
        const idVar = idSf.statements[0];
        const id = idVar.declarationList.declarations[0].name;
        const DirInModule = new imports_1.Reference(Dir.node);
        DirInModule.addIdentifier(id);
        metaRegistry.registerNgModuleMetadata({
            kind: metadata_1.MetaKind.NgModule,
            ref: new imports_1.Reference(Module.node),
            exports: [],
            imports: [],
            declarations: [DirInModule],
            schemas: [],
            rawDeclarations: null,
            rawImports: null,
            rawExports: null,
            decorator: null,
            mayDeclareProviders: false,
            isPoisoned: false,
        });
        const scope = scopeRegistry.getScopeOfModule(Module.node);
        expect(scope.compilation.dependencies[0].ref.getIdentityIn(idSf)).toBe(id);
    });
    it("should allow directly exporting a directive that's not imported", () => {
        const { Dir, ModuleA, ModuleB } = registerFakeRefs(metaRegistry);
        metaRegistry.registerNgModuleMetadata({
            kind: metadata_1.MetaKind.NgModule,
            ref: new imports_1.Reference(ModuleA.node),
            exports: [Dir],
            imports: [ModuleB],
            declarations: [],
            schemas: [],
            rawDeclarations: null,
            rawImports: null,
            rawExports: null,
            decorator: null,
            mayDeclareProviders: false,
            isPoisoned: false,
        });
        metaRegistry.registerNgModuleMetadata({
            kind: metadata_1.MetaKind.NgModule,
            ref: new imports_1.Reference(ModuleB.node),
            declarations: [Dir],
            exports: [Dir],
            imports: [],
            schemas: [],
            rawDeclarations: null,
            rawImports: null,
            rawExports: null,
            decorator: null,
            mayDeclareProviders: false,
            isPoisoned: false,
        });
        const scopeA = scopeRegistry.getScopeOfModule(ModuleA.node);
        expect(scopeToRefs(scopeA.exported)).toEqual([Dir]);
    });
    it("should not allow directly exporting a directive that's not imported", () => {
        const { Dir, ModuleA, ModuleB } = registerFakeRefs(metaRegistry);
        metaRegistry.registerNgModuleMetadata({
            kind: metadata_1.MetaKind.NgModule,
            ref: new imports_1.Reference(ModuleA.node),
            exports: [Dir],
            imports: [],
            declarations: [],
            schemas: [],
            rawDeclarations: null,
            rawImports: null,
            rawExports: null,
            decorator: null,
            mayDeclareProviders: false,
            isPoisoned: false,
        });
        metaRegistry.registerNgModuleMetadata({
            kind: metadata_1.MetaKind.NgModule,
            ref: new imports_1.Reference(ModuleB.node),
            declarations: [Dir],
            exports: [Dir],
            imports: [],
            schemas: [],
            rawDeclarations: null,
            rawImports: null,
            rawExports: null,
            decorator: null,
            mayDeclareProviders: false,
            isPoisoned: false,
        });
        expect(scopeRegistry.getScopeOfModule(ModuleA.node).compilation.isPoisoned).toBeTrue();
        // ModuleA should have associated diagnostics as it exports `Dir` without declaring it.
        expect(scopeRegistry.getDiagnosticsOfModule(ModuleA.node)).not.toBeNull();
        // ModuleB should have no diagnostics as it correctly declares `Dir`.
        expect(scopeRegistry.getDiagnosticsOfModule(ModuleB.node)).toBeNull();
    });
});
function fakeDirective(ref) {
    const name = ref.debugName;
    return {
        kind: metadata_1.MetaKind.Directive,
        matchSource: metadata_1.MatchSource.Selector,
        ref,
        name,
        selector: `[${ref.debugName}]`,
        isComponent: name.startsWith('Cmp'),
        inputs: metadata_1.ClassPropertyMapping.fromMappedObject({}),
        outputs: metadata_1.ClassPropertyMapping.fromMappedObject({}),
        exportAs: null,
        queries: [],
        hasNgTemplateContextGuard: false,
        ngTemplateGuards: [],
        coercedInputFields: new Set(),
        restrictedInputFields: new Set(),
        stringLiteralInputFields: new Set(),
        undeclaredInputFields: new Set(),
        isGeneric: false,
        baseClass: null,
        isPoisoned: false,
        isStructural: false,
        animationTriggerNames: null,
        isStandalone: false,
        isSignal: false,
        imports: null,
        rawImports: null,
        schemas: null,
        decorator: null,
        hostDirectives: null,
        assumedToExportProviders: false,
        ngContentSelectors: null,
        preserveWhitespaces: false,
        isExplicitlyDeferred: false,
        deferredImports: null,
        inputFieldNamesFromMetadataArray: null,
        selectorlessEnabled: false,
        localReferencedSymbols: null,
    };
}
function fakePipe(ref) {
    const name = ref.debugName;
    return {
        kind: metadata_1.MetaKind.Pipe,
        ref,
        name,
        nameExpr: null,
        isStandalone: false,
        decorator: null,
        isExplicitlyDeferred: false,
        isPure: false,
    };
}
class MockDtsModuleScopeResolver {
    resolve(ref) {
        return null;
    }
}
function scopeToRefs(scopeData) {
    return scopeData.dependencies
        .map((dep) => dep.ref)
        .sort((a, b) => a.debugName.localeCompare(b.debugName));
}
