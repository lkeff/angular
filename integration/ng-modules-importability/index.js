"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compiler_cli_1 = require("@angular/compiler-cli");
const fs = __importStar(require("fs/promises"));
const path = __importStar(require("path"));
const os = __importStar(require("os"));
const typescript_1 = __importDefault(require("typescript"));
const find_all_modules_1 = require("./find-all-modules");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const [configPath] = process.argv.slice(2);
        const tmpDir = yield fs.mkdtemp(path.join(os.tmpdir(), 'ng-module-test-'));
        const config = JSON.parse(yield fs.readFile(configPath, 'utf8'));
        const packages = yield Promise.all(config.packages.map((pkgPath) => (0, find_all_modules_1.findAllEntryPointsAndExportedModules)(pkgPath)));
        const allExports = packages
            .map((p) => p.moduleExports)
            .flat()
            .filter((e) => !config.skipEntryPoints.includes(e.importPath));
        // Distribute the exports based on the current test shard.
        // Controlled via Bazel's `shard_count` attribute. See:
        // https://bazel.build/reference/test-encyclopedia#initial-conditions.
        const testShardIndex = process.env['TEST_SHARD_INDEX'] !== undefined ? Number(process.env['TEST_SHARD_INDEX']) : 0;
        const testMaxShards = process.env['TEST_TOTAL_SHARDS'] !== undefined ? Number(process.env['TEST_TOTAL_SHARDS']) : 1;
        const testChunkSize = Math.ceil(allExports.length / testMaxShards);
        const testChunkStart = testChunkSize * testShardIndex;
        const shardExports = allExports.slice(testChunkStart, testChunkStart + testChunkSize);
        const testFiles = shardExports.map((e) => ({
            content: `
      import {NgModule, Component} from '@angular/core';
      import {${e.symbolName}} from '${e.importPath}';

      @NgModule({
        exports: [${e.symbolName}]
      })
      export class TestModule {}

      @Component({imports: [TestModule], template: ''})
      export class TestComponent {}
  `,
            path: path.join(tmpDir, `${e.symbolName.toLowerCase()}.ts`),
        }));
        // Prepare node modules to resolve e.g. `@angular/core`
        yield fs.symlink(path.resolve('./node_modules'), path.join(tmpDir, 'node_modules'));
        // Prepare node modules to resolve e.g. `@angular/cdk`. This is possible
        // as we are inside the sandbox, inside our test runfiles directory.
        for (const { packagePath, name } of packages) {
            yield fs.symlink(path.resolve(packagePath), `./node_modules/${name}`);
        }
        const diagnostics = [];
        for (const testFile of testFiles) {
            yield fs.writeFile(testFile.path, testFile.content);
            const result = (0, compiler_cli_1.performCompilation)({
                options: {
                    rootDir: tmpDir,
                    skipLibCheck: true,
                    noEmit: true,
                    module: typescript_1.default.ModuleKind.ESNext,
                    moduleResolution: typescript_1.default.ModuleResolutionKind.Bundler,
                    strictTemplates: true,
                    preserveSymlinks: true,
                    strict: true,
                    // Note: HMR is needed as it will disable the Angular compiler's tree-shaking of used
                    // directives/components. This is critical for this test as it allows us to simply all
                    // modules and automatically validate that all symbols are reachable/importable.
                    _enableHmr: true,
                },
                rootNames: [testFile.path],
            });
            diagnostics.push(...result.diagnostics);
        }
        console.error(typescript_1.default.formatDiagnosticsWithColorAndContext(diagnostics, {
            getCanonicalFileName: (f) => f,
            getCurrentDirectory: () => '/',
            getNewLine: () => '\n',
        }));
        yield fs.rm(tmpDir, { recursive: true, force: true, maxRetries: 2 });
        if (diagnostics.length > 0) {
            process.exitCode = 1;
        }
    });
}
main().catch((e) => {
    console.error('Error', e);
    process.exitCode = 1;
});
