"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore This compiles fine, but Webstorm doesn't like the ESM import in a CJS context.
const compiler_cli_1 = require("@angular/compiler-cli");
const generate_manifest_1 = require("../generate_manifest");
describe('api manifest generation', () => {
    it('should generate a manifest from multiple collections', () => {
        const manifest = (0, generate_manifest_1.generateManifest)([
            {
                moduleName: '@angular/router',
                entries: [entry({ name: 'Router', entryType: compiler_cli_1.EntryType.UndecoratedClass })],
                normalizedModuleName: 'angular_router',
                moduleLabel: 'router',
            },
            {
                moduleName: '@angular/core',
                entries: [entry({ name: 'PI', entryType: compiler_cli_1.EntryType.Constant })],
                normalizedModuleName: 'angular_core',
                moduleLabel: 'core',
            },
            {
                moduleName: '@angular/core',
                entries: [entry({ name: 'foo', entryType: compiler_cli_1.EntryType.Constant })],
                normalizedModuleName: 'angular_core',
                moduleLabel: 'core',
            },
        ]);
        // The test also makes sure that we sort modules & entries by name.
        expect(manifest).toEqual([
            {
                moduleName: '@angular/core',
                moduleLabel: 'core',
                normalizedModuleName: 'angular_core',
                entries: [
                    {
                        name: 'foo',
                        type: compiler_cli_1.EntryType.Constant,
                        developerPreview: undefined,
                        deprecated: undefined,
                        experimental: undefined,
                        stable: undefined,
                    },
                    {
                        name: 'PI',
                        type: compiler_cli_1.EntryType.Constant,
                        developerPreview: undefined,
                        deprecated: undefined,
                        experimental: undefined,
                        stable: undefined,
                    },
                ],
            },
            {
                moduleName: '@angular/router',
                moduleLabel: 'router',
                normalizedModuleName: 'angular_router',
                entries: [
                    {
                        name: 'Router',
                        type: compiler_cli_1.EntryType.UndecoratedClass,
                        developerPreview: undefined,
                        deprecated: undefined,
                        experimental: undefined,
                        stable: undefined,
                    },
                ],
            },
        ]);
    });
    it('should generate a manifest when collections share a symbol with the same name', () => {
        const manifest = (0, generate_manifest_1.generateManifest)([
            {
                moduleName: '@angular/core',
                entries: [entry({ name: 'PI', entryType: compiler_cli_1.EntryType.Constant })],
                normalizedModuleName: 'angular_core',
                moduleLabel: 'core',
            },
            {
                moduleName: '@angular/router',
                entries: [entry({ name: 'PI', entryType: compiler_cli_1.EntryType.Constant })],
                normalizedModuleName: 'angular_router',
                moduleLabel: 'router',
            },
        ]);
        expect(manifest).toEqual([
            {
                moduleName: '@angular/core',
                moduleLabel: 'core',
                normalizedModuleName: 'angular_core',
                entries: [
                    {
                        name: 'PI',
                        type: compiler_cli_1.EntryType.Constant,
                        developerPreview: undefined,
                        deprecated: undefined,
                        experimental: undefined,
                        stable: undefined,
                    },
                ],
            },
            {
                moduleName: '@angular/router',
                moduleLabel: 'router',
                normalizedModuleName: 'angular_router',
                entries: [
                    {
                        name: 'PI',
                        type: compiler_cli_1.EntryType.Constant,
                        developerPreview: undefined,
                        deprecated: undefined,
                        experimental: undefined,
                        stable: undefined,
                    },
                ],
            },
        ]);
    });
    it('should union collections for the same module into one manifest', () => {
        const manifest = (0, generate_manifest_1.generateManifest)([
            {
                moduleName: '@angular/core',
                entries: [entry({ name: 'PI', entryType: compiler_cli_1.EntryType.Constant })],
                normalizedModuleName: 'angular_core',
                moduleLabel: 'core',
            },
            {
                moduleName: '@angular/core',
                entries: [entry({ name: 'TAO', entryType: compiler_cli_1.EntryType.Constant })],
                normalizedModuleName: 'angular_core',
                moduleLabel: 'core',
            },
        ]);
        expect(manifest).toEqual([
            {
                moduleName: '@angular/core',
                moduleLabel: 'core',
                normalizedModuleName: 'angular_core',
                entries: [
                    {
                        name: 'PI',
                        type: compiler_cli_1.EntryType.Constant,
                        developerPreview: undefined,
                        deprecated: undefined,
                        experimental: undefined,
                        stable: undefined,
                    },
                    {
                        name: 'TAO',
                        type: compiler_cli_1.EntryType.Constant,
                        developerPreview: undefined,
                        deprecated: undefined,
                        experimental: undefined,
                        stable: undefined,
                    },
                ],
            },
        ]);
    });
    it('should mark a manifest entry as deprecated', () => {
        const manifest = (0, generate_manifest_1.generateManifest)([
            {
                moduleName: '@angular/core',
                entries: [
                    entry({ name: 'PI', entryType: compiler_cli_1.EntryType.Constant, jsdocTags: jsdocTags('deprecated') }),
                    entry({ name: 'XI', entryType: compiler_cli_1.EntryType.Constant, jsdocTags: jsdocTags('experimental') }),
                ],
                normalizedModuleName: 'angular_core',
                moduleLabel: 'core',
            },
        ]);
        expect(manifest).toEqual([
            {
                moduleName: '@angular/core',
                moduleLabel: 'core',
                normalizedModuleName: 'angular_core',
                entries: [
                    {
                        name: 'PI',
                        type: compiler_cli_1.EntryType.Constant,
                        developerPreview: undefined,
                        deprecated: { version: undefined },
                        experimental: undefined,
                        stable: undefined,
                    },
                    {
                        name: 'XI',
                        type: compiler_cli_1.EntryType.Constant,
                        developerPreview: undefined,
                        deprecated: undefined,
                        experimental: { version: undefined },
                        stable: undefined,
                    },
                ],
            },
        ]);
    });
    it('should not mark a function as deprecated if only one overload is deprecated', () => {
        const manifest = (0, generate_manifest_1.generateManifest)([
            {
                moduleName: '@angular/core',
                entries: [
                    functionEntry({
                        name: 'save',
                        entryType: compiler_cli_1.EntryType.Function,
                        jsdocTags: [],
                        signatures: [
                            {
                                name: 'save',
                                returnType: 'void',
                                jsdocTags: [],
                                description: '',
                                entryType: compiler_cli_1.EntryType.Function,
                                params: [],
                                generics: [],
                                isNewType: false,
                                rawComment: '',
                            },
                            {
                                name: 'save',
                                returnType: 'void',
                                jsdocTags: jsdocTags('deprecated'),
                                description: '',
                                entryType: compiler_cli_1.EntryType.Function,
                                params: [],
                                generics: [],
                                isNewType: false,
                                rawComment: '',
                            },
                        ],
                    }),
                ],
                normalizedModuleName: 'angular_core',
                moduleLabel: 'core',
            },
        ]);
        expect(manifest).toEqual([
            {
                moduleName: '@angular/core',
                moduleLabel: 'core',
                normalizedModuleName: 'angular_core',
                entries: [
                    {
                        name: 'save',
                        type: compiler_cli_1.EntryType.Function,
                        developerPreview: undefined,
                        deprecated: undefined,
                        experimental: undefined,
                        stable: undefined,
                    },
                ],
            },
        ]);
    });
    it('should mark a function as deprecated if all overloads are deprecated', () => {
        const manifest = (0, generate_manifest_1.generateManifest)([
            {
                moduleName: '@angular/core',
                entries: [
                    functionEntry({
                        name: 'save',
                        entryType: compiler_cli_1.EntryType.Function,
                        jsdocTags: [],
                        signatures: [
                            {
                                name: 'save',
                                returnType: 'void',
                                jsdocTags: jsdocTags('deprecated'),
                                description: '',
                                entryType: compiler_cli_1.EntryType.Function,
                                params: [],
                                generics: [],
                                isNewType: false,
                                rawComment: '',
                            },
                            {
                                name: 'save',
                                returnType: 'void',
                                jsdocTags: jsdocTags('deprecated'),
                                description: '',
                                entryType: compiler_cli_1.EntryType.Function,
                                params: [],
                                generics: [],
                                isNewType: false,
                                rawComment: '',
                            },
                        ],
                    }),
                ],
                normalizedModuleName: 'angular_core',
                moduleLabel: 'core',
            },
        ]);
        expect(manifest).toEqual([
            {
                moduleName: '@angular/core',
                normalizedModuleName: 'angular_core',
                moduleLabel: 'core',
                entries: [
                    {
                        name: 'save',
                        type: compiler_cli_1.EntryType.Function,
                        developerPreview: undefined,
                        deprecated: { version: undefined },
                        experimental: undefined,
                        stable: undefined,
                    },
                ],
            },
        ]);
    });
    it("should mark a fn as deprecated if there's one w/ the same name in another collection", () => {
        const manifest = (0, generate_manifest_1.generateManifest)([
            {
                moduleName: '@angular/core',
                entries: [
                    entry({ name: 'save', entryType: compiler_cli_1.EntryType.Function, jsdocTags: jsdocTags('deprecated') }),
                ],
                normalizedModuleName: 'angular_core',
                moduleLabel: 'core',
            },
            {
                moduleName: '@angular/more',
                entries: [entry({ name: 'save', entryType: compiler_cli_1.EntryType.Function })],
                normalizedModuleName: 'angular_more',
                moduleLabel: 'more',
            },
        ]);
        expect(manifest).toEqual([
            {
                moduleName: '@angular/core',
                moduleLabel: 'core',
                normalizedModuleName: 'angular_core',
                entries: [
                    {
                        name: 'save',
                        type: compiler_cli_1.EntryType.Function,
                        developerPreview: undefined,
                        deprecated: { version: undefined },
                        experimental: undefined,
                        stable: undefined,
                    },
                ],
            },
            {
                moduleName: '@angular/more',
                moduleLabel: 'more',
                normalizedModuleName: 'angular_more',
                entries: [
                    {
                        name: 'save',
                        type: compiler_cli_1.EntryType.Function,
                        developerPreview: undefined,
                        deprecated: undefined,
                        experimental: undefined,
                        stable: undefined,
                    },
                ],
            },
        ]);
    });
    it('should mark a manifest entry as developerPreview', () => {
        const manifest = (0, generate_manifest_1.generateManifest)([
            {
                moduleName: '@angular/core',
                entries: [
                    entry({
                        name: 'PI',
                        entryType: compiler_cli_1.EntryType.Constant,
                        jsdocTags: jsdocTags('developerPreview'),
                    }),
                    entry({ name: 'XI', entryType: compiler_cli_1.EntryType.Constant, jsdocTags: jsdocTags('experimental') }),
                ],
                normalizedModuleName: 'angular_core',
                moduleLabel: 'core',
            },
        ]);
        expect(manifest).toEqual([
            {
                moduleName: '@angular/core',
                moduleLabel: 'core',
                normalizedModuleName: 'angular_core',
                entries: [
                    {
                        name: 'PI',
                        type: compiler_cli_1.EntryType.Constant,
                        developerPreview: { version: undefined },
                        deprecated: undefined,
                        experimental: undefined,
                        stable: undefined,
                    },
                    {
                        name: 'XI',
                        type: compiler_cli_1.EntryType.Constant,
                        developerPreview: undefined,
                        deprecated: undefined,
                        experimental: { version: undefined },
                        stable: undefined,
                    },
                ],
            },
        ]);
    });
});
/** Creates a fake DocsEntry with the given object's fields patches onto the result. */
function entry(patch) {
    return Object.assign({ name: '', description: '', entryType: compiler_cli_1.EntryType.Constant, jsdocTags: [], rawComment: '' }, patch);
}
function functionEntry(patch) {
    return entry(Object.assign({ entryType: compiler_cli_1.EntryType.Function, implementation: [], signatures: [] }, patch));
}
/** Creates a fake jsdoc tag entry list that contains a tag with the given name */
function jsdocTags(name) {
    return [{ name, comment: '' }];
}
