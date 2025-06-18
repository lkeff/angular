"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleResolver = void 0;
const file_system_1 = require("../../file_system");
const typescript_1 = require("../../util/src/typescript");
/**
 * Used by `RouterEntryPointManager` and `NgModuleRouteAnalyzer` (which is in turn is used by
 * `NgModuleDecoratorHandler`) for resolving the module source-files references in lazy-loaded
 * routes (relative to the source-file containing the `NgModule` that provides the route
 * definitions).
 */
class ModuleResolver {
    constructor(program, compilerOptions, host, moduleResolutionCache) {
        this.program = program;
        this.compilerOptions = compilerOptions;
        this.host = host;
        this.moduleResolutionCache = moduleResolutionCache;
    }
    resolveModule(moduleName, containingFile) {
        const resolved = (0, typescript_1.resolveModuleName)(moduleName, containingFile, this.compilerOptions, this.host, this.moduleResolutionCache);
        if (resolved === undefined) {
            return null;
        }
        return (0, typescript_1.getSourceFileOrNull)(this.program, (0, file_system_1.absoluteFrom)(resolved.resolvedFileName));
    }
}
exports.ModuleResolver = ModuleResolver;
