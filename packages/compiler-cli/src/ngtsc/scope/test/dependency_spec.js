"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_system_1 = require("../../file_system");
const testing_1 = require("../../file_system/testing");
const imports_1 = require("../../imports");
const metadata_1 = require("../../metadata");
const reflection_1 = require("../../reflection");
const testing_2 = require("../../testing");
const dependency_1 = require("../src/dependency");
const MODULE_FROM_NODE_MODULES_PATH = /.*node_modules\/(\w+)\/index\.d\.ts$/;
const testHost = {
    fileNameToModuleName: function (imported) {
        const res = MODULE_FROM_NODE_MODULES_PATH.exec(imported);
        return 'root/' + res[1];
    },
};
/**
 * Simple metadata types are added to the top of each testing file, for convenience.
 */
const PROLOG = `
export declare type ModuleMeta<A, B, C, D> = never;
export declare type ComponentMeta<A, B, C, D, E, F> = never;
export declare type DirectiveMeta<A, B, C, D, E, F> = never;
export declare type PipeMeta<A, B> = never;
`;
/**
 * Construct the testing environment with a given set of absolute modules and their contents.
 *
 * This returns both the `MetadataDtsModuleScopeResolver` and a `refs` object which can be
 * destructured to retrieve references to specific declared classes.
 */
function makeTestEnv(modules, aliasGenerator = null) {
    // Map the modules object to an array of files for `makeProgram`.
    const files = Object.keys(modules).map((moduleName) => {
        return {
            name: (0, file_system_1.absoluteFrom)(`/node_modules/${moduleName}/index.d.ts`),
            contents: PROLOG + modules[moduleName],
        };
    });
    const { program } = (0, testing_2.makeProgram)(files);
    const checker = program.getTypeChecker();
    const reflector = new reflection_1.TypeScriptReflectionHost(checker);
    const resolver = new dependency_1.MetadataDtsModuleScopeResolver(new metadata_1.DtsMetadataReader(checker, reflector), aliasGenerator);
    // Resolver for the refs object.
    const get = (target, name) => {
        for (const sf of program.getSourceFiles()) {
            const symbol = checker.getSymbolAtLocation(sf);
            const exportedSymbol = symbol.exports.get(name);
            if (exportedSymbol !== undefined) {
                const decl = exportedSymbol.valueDeclaration;
                return new imports_1.Reference(decl);
            }
        }
        throw new Error('Class not found: ' + name);
    };
    return {
        resolver,
        refs: new Proxy({}, { get }),
    };
}
(0, testing_1.runInEachFileSystem)(() => {
    describe('MetadataDtsModuleScopeResolver', () => {
        it('should produce an accurate scope for a basic NgModule', () => {
            const { resolver, refs } = makeTestEnv({
                'test': `
        export declare class Dir {
          static ɵdir: DirectiveMeta<Dir, '[dir]', ['exportAs'], {'input': 'input2'},
            {'output': 'output2'}, ['query']>;
        }

        export declare class Module {
          static ɵmod: ModuleMeta<Module, [typeof Dir], never, [typeof Dir]>;
        }
      `,
            });
            const { Dir, Module } = refs;
            const scope = resolver.resolve(Module);
            expect(scopeToRefs(scope)).toEqual([Dir]);
        });
        it('should produce an accurate scope when a module is exported', () => {
            const { resolver, refs } = makeTestEnv({
                'test': `
        export declare class Dir {
          static ɵdir: DirectiveMeta<Dir, '[dir]', never, never, never, never>;
        }

        export declare class ModuleA {
          static ɵmod: ModuleMeta<ModuleA, [typeof Dir], never, [typeof Dir]>;
        }

        export declare class ModuleB {
          static ɵmod: ModuleMeta<ModuleB, never, never, [typeof ModuleA]>;
        }
      `,
            });
            const { Dir, ModuleB } = refs;
            const scope = resolver.resolve(ModuleB);
            expect(scopeToRefs(scope)).toEqual([Dir]);
        });
        it('should resolve correctly across modules', () => {
            const { resolver, refs } = makeTestEnv({
                'declaration': `
          export declare class Dir {
            static ɵdir: DirectiveMeta<Dir, '[dir]', never, never, never, never>;
          }

          export declare class ModuleA {
            static ɵmod: ModuleMeta<ModuleA, [typeof Dir], never, [typeof Dir]>;
          }
        `,
                'exported': `
          import * as d from 'declaration';

          export declare class ModuleB {
            static ɵmod: ModuleMeta<ModuleB, never, never, [typeof d.ModuleA]>;
          }
        `,
            });
            const { Dir, ModuleB } = refs;
            const scope = resolver.resolve(ModuleB);
            expect(scopeToRefs(scope).map((ref) => ref.node)).toEqual([Dir.node]);
            // Explicitly verify that the directive has the correct owning module.
            expect(scope.exported.dependencies[0].ref.bestGuessOwningModule).toEqual({
                specifier: 'declaration',
                resolutionContext: ModuleB.node.getSourceFile().fileName,
            });
        });
        it('should write correct aliases for deep dependencies', () => {
            const { resolver, refs } = makeTestEnv({
                'deep': `
            export declare class DeepDir {
              static ɵdir: DirectiveMeta<DeepDir, '[deep]', never, never, never, never>;
            }

            export declare class DeepModule {
              static ɵmod: ModuleMeta<DeepModule, [typeof DeepDir], never, [typeof DeepDir]>;
            }
      `,
                'middle': `
            import * as deep from 'deep';

            export declare class MiddleDir {
              static ɵdir: DirectiveMeta<MiddleDir, '[middle]', never, never, never, never>;
            }

            export declare class MiddleModule {
              static ɵmod: ModuleMeta<MiddleModule, [typeof MiddleDir], never, [typeof MiddleDir, typeof deep.DeepModule]>;
            }
      `,
                'shallow': `
            import * as middle from 'middle';

            export declare class ShallowDir {
              static ɵdir: DirectiveMeta<ShallowDir, '[middle]', never, never, never, never>;
            }

            export declare class ShallowModule {
              static ɵmod: ModuleMeta<ShallowModule, [typeof ShallowDir], never, [typeof ShallowDir, typeof middle.MiddleModule]>;
            }
      `,
            }, new imports_1.UnifiedModulesAliasingHost(testHost));
            const { ShallowModule } = refs;
            const scope = resolver.resolve(ShallowModule);
            const [DeepDir, MiddleDir, ShallowDir] = scopeToRefs(scope);
            expect(getAlias(DeepDir)).toEqual({
                moduleName: 'root/shallow',
                name: 'ɵng$root$deep$$DeepDir',
            });
            expect(getAlias(MiddleDir)).toEqual({
                moduleName: 'root/shallow',
                name: 'ɵng$root$middle$$MiddleDir',
            });
            expect(getAlias(ShallowDir)).toBeNull();
        });
        it('should write correct aliases for bare directives in exports', () => {
            const { resolver, refs } = makeTestEnv({
                'deep': `
            export declare class DeepDir {
              static ɵdir: DirectiveMeta<DeepDir, '[deep]', never, never, never, never>;
            }

            export declare class DeepModule {
              static ɵmod: ModuleMeta<DeepModule, [typeof DeepDir], never, [typeof DeepDir]>;
            }
    `,
                'middle': `
            import * as deep from 'deep';

            export declare class MiddleDir {
              static ɵdir: DirectiveMeta<MiddleDir, '[middle]', never, never, never, never>;
            }

            export declare class MiddleModule {
              static ɵmod: ModuleMeta<MiddleModule, [typeof MiddleDir], [typeof deep.DeepModule], [typeof MiddleDir, typeof deep.DeepDir]>;
            }
    `,
                'shallow': `
            import * as middle from 'middle';

            export declare class ShallowDir {
              static ɵdir: DirectiveMeta<ShallowDir, '[middle]', never, never, never, never>;
            }

            export declare class ShallowModule {
              static ɵmod: ModuleMeta<ShallowModule, [typeof ShallowDir], never, [typeof ShallowDir, typeof middle.MiddleModule]>;
            }
    `,
            }, new imports_1.UnifiedModulesAliasingHost(testHost));
            const { ShallowModule } = refs;
            const scope = resolver.resolve(ShallowModule);
            const [DeepDir, MiddleDir, ShallowDir] = scopeToRefs(scope);
            expect(getAlias(DeepDir)).toEqual({
                moduleName: 'root/shallow',
                name: 'ɵng$root$deep$$DeepDir',
            });
            expect(getAlias(MiddleDir)).toEqual({
                moduleName: 'root/shallow',
                name: 'ɵng$root$middle$$MiddleDir',
            });
            expect(getAlias(ShallowDir)).toBeNull();
        });
        it('should not use an alias if a directive is declared in the same file as the re-exporting module', () => {
            const { resolver, refs } = makeTestEnv({
                'module': `
                export declare class DeepDir {
                  static ɵdir: DirectiveMeta<DeepDir, '[deep]', never, never, never, never>;
                }

                export declare class DeepModule {
                  static ɵmod: ModuleMeta<DeepModule, [typeof DeepDir], never, [typeof DeepDir]>;
                }

                export declare class DeepExportModule {
                  static ɵmod: ModuleMeta<DeepExportModule, never, never, [typeof DeepModule]>;
                }
              `,
            }, new imports_1.UnifiedModulesAliasingHost(testHost));
            const { DeepExportModule } = refs;
            const scope = resolver.resolve(DeepExportModule);
            const [DeepDir] = scopeToRefs(scope);
            expect(getAlias(DeepDir)).toBeNull();
        });
    });
    function scopeToRefs(scope) {
        return scope.exported.dependencies
            .map((dep) => dep.ref)
            .sort((a, b) => a.debugName.localeCompare(b.debugName));
    }
    function getAlias(ref) {
        if (ref.alias === null) {
            return null;
        }
        else {
            return ref.alias.value;
        }
    }
});
