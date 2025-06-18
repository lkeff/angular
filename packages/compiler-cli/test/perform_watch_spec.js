"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const typescript_1 = __importDefault(require("typescript"));
const ng = __importStar(require("../index"));
const perform_watch_1 = require("../src/perform_watch");
const test_support_1 = require("./test_support");
describe('perform watch', () => {
    let testSupport;
    let outDir;
    beforeEach(() => {
        testSupport = (0, test_support_1.setup)();
        outDir = path.resolve(testSupport.basePath, 'outDir');
    });
    function createConfig(overrideOptions = {}) {
        const options = testSupport.createCompilerOptions(Object.assign({ outDir }, overrideOptions));
        return {
            options,
            rootNames: [path.resolve(testSupport.basePath, 'src/index.ts')],
            project: path.resolve(testSupport.basePath, 'src/tsconfig.json'),
            emitFlags: ng.EmitFlags.Default,
            errors: [],
        };
    }
    it('should compile files during the initial run', () => {
        const config = createConfig();
        const host = new MockWatchHost(config);
        testSupport.writeFiles({
            'src/main.ts': createModuleAndCompSource('main'),
            'src/index.ts': `export * from './main'; `,
        });
        const watchResult = (0, perform_watch_1.performWatchCompilation)(host);
        (0, test_support_1.expectNoDiagnostics)(config.options, watchResult.firstCompileResult);
        expect(fs.existsSync(path.resolve(outDir, 'src', 'main.js'))).toBe(true);
    });
    it('should recompile components when its template changes', () => {
        const config = createConfig();
        const host = new MockWatchHost(config);
        testSupport.writeFiles({
            'src/main.ts': createModuleAndCompSource('main', './main.html'),
            'src/main.html': 'initial',
            'src/index.ts': `export * from './main'; `,
        });
        const watchResult = (0, perform_watch_1.performWatchCompilation)(host);
        (0, test_support_1.expectNoDiagnostics)(config.options, watchResult.firstCompileResult);
        const htmlPath = path.join(testSupport.basePath, 'src', 'main.html');
        const genPath = path.posix.join(outDir, 'src', 'main.js');
        const initial = fs.readFileSync(genPath, { encoding: 'utf8' });
        expect(initial).toContain('"initial"');
        testSupport.write(htmlPath, 'updated');
        host.triggerFileChange(perform_watch_1.FileChangeEvent.Change, htmlPath);
        const updated = fs.readFileSync(genPath, { encoding: 'utf8' });
        expect(updated).toContain('"updated"');
    });
    it('should cache files on subsequent runs', () => {
        const config = createConfig();
        const host = new MockWatchHost(config);
        let fileExistsSpy;
        let getSourceFileSpy;
        host.createCompilerHost = (options) => {
            const ngHost = ng.createCompilerHost({ options });
            fileExistsSpy = spyOn(ngHost, 'fileExists').and.callThrough();
            getSourceFileSpy = spyOn(ngHost, 'getSourceFile').and.callThrough();
            return ngHost;
        };
        testSupport.writeFiles({
            'src/main.ts': createModuleAndCompSource('main'),
            'src/util.ts': `export const x = 1;`,
            'src/index.ts': `
        export * from './main';
        export * from './util';
      `,
        });
        const mainTsPath = path.posix.join(testSupport.basePath, 'src', 'main.ts');
        const utilTsPath = path.posix.join(testSupport.basePath, 'src', 'util.ts');
        const genPath = path.posix.join(outDir, 'src', 'main.js');
        (0, perform_watch_1.performWatchCompilation)(host);
        expect(fs.existsSync(genPath)).toBe(true);
        expect(fileExistsSpy).toHaveBeenCalledWith(mainTsPath);
        expect(fileExistsSpy).toHaveBeenCalledWith(utilTsPath);
        expect(getSourceFileSpy).toHaveBeenCalledWith(mainTsPath, jasmine.objectContaining({
            languageVersion: typescript_1.default.ScriptTarget.ES5,
        }));
        expect(getSourceFileSpy).toHaveBeenCalledWith(utilTsPath, jasmine.objectContaining({
            languageVersion: typescript_1.default.ScriptTarget.ES5,
        }));
        fileExistsSpy.calls.reset();
        getSourceFileSpy.calls.reset();
        // trigger a single file change
        // -> all other files should be cached
        host.triggerFileChange(perform_watch_1.FileChangeEvent.Change, utilTsPath);
        (0, test_support_1.expectNoDiagnostics)(config.options, host.diagnostics);
        expect(fileExistsSpy).not.toHaveBeenCalledWith(mainTsPath);
        expect(getSourceFileSpy).not.toHaveBeenCalledWith(mainTsPath, jasmine.anything());
        expect(getSourceFileSpy).toHaveBeenCalledWith(utilTsPath, jasmine.anything());
        // trigger a folder change
        // -> nothing should be cached
        host.triggerFileChange(perform_watch_1.FileChangeEvent.CreateDeleteDir, path.resolve(testSupport.basePath, 'src'));
        (0, test_support_1.expectNoDiagnostics)(config.options, host.diagnostics);
        expect(fileExistsSpy).toHaveBeenCalledWith(mainTsPath);
        expect(fileExistsSpy).toHaveBeenCalledWith(utilTsPath);
        expect(getSourceFileSpy).toHaveBeenCalledWith(mainTsPath, jasmine.anything());
        expect(getSourceFileSpy).toHaveBeenCalledWith(utilTsPath, jasmine.anything());
    });
    // https://github.com/angular/angular/pull/26036
    it('should handle redirected source files', () => {
        const config = createConfig();
        const host = new MockWatchHost(config);
        host.createCompilerHost = (options) => {
            const ngHost = ng.createCompilerHost({ options });
            return ngHost;
        };
        // This file structure has an identical version of "a" under the root node_modules and inside
        // of "b". Because their package.json file indicates it is the exact same version of "a",
        // TypeScript will transform the source file of "node_modules/b/node_modules/a/index.d.ts"
        // into a redirect to "node_modules/a/index.d.ts". During watch compilations, we must assure
        // not to reintroduce "node_modules/b/node_modules/a/index.d.ts" as its redirected source file,
        // but instead using its original file.
        testSupport.writeFiles({
            'node_modules/a/index.js': `export class ServiceA {}`,
            'node_modules/a/index.d.ts': `export declare class ServiceA {}`,
            'node_modules/a/package.json': `{"name": "a", "version": "1.0"}`,
            'node_modules/b/node_modules/a/index.js': `export class ServiceA {}`,
            'node_modules/b/node_modules/a/index.d.ts': `export declare class ServiceA {}`,
            'node_modules/b/node_modules/a/package.json': `{"name": "a", "version": "1.0"}`,
            'node_modules/b/index.js': `export {ServiceA as ServiceB} from 'a';`,
            'node_modules/b/index.d.ts': `export {ServiceA as ServiceB} from 'a';`,
            'src/index.ts': `
        import {ServiceA} from 'a';
        import {ServiceB} from 'b';
      `,
        });
        const indexTsPath = path.posix.join(testSupport.basePath, 'src', 'index.ts');
        (0, perform_watch_1.performWatchCompilation)(host);
        // Trigger a file change. This recreates the program from the old program. If redirect sources
        // were introduced into the new program, this would fail due to an assertion failure in TS.
        host.triggerFileChange(perform_watch_1.FileChangeEvent.Change, indexTsPath);
        (0, test_support_1.expectNoDiagnostics)(config.options, host.diagnostics);
    });
    it('should recover from static analysis errors', () => {
        const config = createConfig();
        const host = new MockWatchHost(config);
        const okFileContent = `
      import {NgModule} from '@angular/core';

      @NgModule()
      export class MyModule {}
    `;
        const errorFileContent = `
      import {NgModule} from '@angular/core';

      @NgModule((() => (1===1 ? null as any : null as any)) as any)
      export class MyModule {}
    `;
        const indexTsPath = path.resolve(testSupport.basePath, 'src', 'index.ts');
        testSupport.write(indexTsPath, okFileContent);
        (0, perform_watch_1.performWatchCompilation)(host);
        (0, test_support_1.expectNoDiagnostics)(config.options, host.diagnostics);
        // Do it multiple times as the watch mode switches internal modes.
        // E.g. from regular compile to incremental, ...
        for (let i = 0; i < 3; i++) {
            host.diagnostics = [];
            testSupport.write(indexTsPath, okFileContent);
            host.triggerFileChange(perform_watch_1.FileChangeEvent.Change, indexTsPath);
            (0, test_support_1.expectNoDiagnostics)(config.options, host.diagnostics);
            host.diagnostics = [];
            testSupport.write(indexTsPath, errorFileContent);
            host.triggerFileChange(perform_watch_1.FileChangeEvent.Change, indexTsPath);
            const errDiags = host.diagnostics.filter((d) => d.category === typescript_1.default.DiagnosticCategory.Error);
            expect(errDiags.length).toBe(1);
            expect(errDiags[0].messageText).toContain('@NgModule argument must be an object literal');
        }
    });
});
function createModuleAndCompSource(prefix, template = prefix + 'template') {
    const templateEntry = template.endsWith('.html')
        ? `templateUrl: '${template}'`
        : `template: \`${template}\``;
    return `
    import {Component, NgModule} from '@angular/core';

    @Component({selector: '${prefix}', ${templateEntry}, standalone: false})
    export class ${prefix}Comp {}

    @NgModule({declarations: [${prefix}Comp]})
    export class ${prefix}Module {}
  `;
}
class MockWatchHost {
    constructor(config) {
        this.config = config;
        this.nextTimeoutListenerId = 1;
        this.timeoutListeners = {};
        this.fileChangeListeners = [];
        this.diagnostics = [];
    }
    reportDiagnostics(diags) {
        this.diagnostics.push(...diags);
    }
    readConfiguration() {
        return this.config;
    }
    createCompilerHost(options) {
        return ng.createCompilerHost({ options });
    }
    createEmitCallback() {
        return undefined;
    }
    onFileChange(options, listener, ready) {
        const id = this.fileChangeListeners.length;
        this.fileChangeListeners.push(listener);
        ready();
        return {
            close: () => (this.fileChangeListeners[id] = null),
        };
    }
    setTimeout(callback) {
        const id = this.nextTimeoutListenerId++;
        this.timeoutListeners[id] = callback;
        return id;
    }
    clearTimeout(timeoutId) {
        delete this.timeoutListeners[timeoutId];
    }
    flushTimeouts() {
        const listeners = this.timeoutListeners;
        this.timeoutListeners = {};
        Object.keys(listeners).forEach((id) => listeners[id]());
    }
    triggerFileChange(event, fileName) {
        this.fileChangeListeners.forEach((listener) => {
            if (listener) {
                listener(event, fileName);
            }
        });
        this.flushTimeouts();
    }
}
