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
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllEntryPointsAndExportedModules = findAllEntryPointsAndExportedModules;
const fs = __importStar(require("node:fs/promises"));
const path = __importStar(require("node:path"));
const ts = __importStar(require("typescript"));
function findAllEntryPointsAndExportedModules(packagePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const packageJsonRaw = yield fs.readFile(path.join(packagePath, 'package.json'), 'utf8');
        const packageJson = JSON.parse(packageJsonRaw);
        const tasks = [];
        for (const [subpath, conditions] of Object.entries(packageJson.exports)) {
            if (conditions['types'] === undefined) {
                continue;
            }
            // Skip wild-card conditions. Those are not entry-points. e.g. common/locales.
            if (conditions['types'].includes('*')) {
                continue;
            }
            tasks.push((() => __awaiter(this, void 0, void 0, function* () {
                const dtsFile = path.join(packagePath, conditions['types']);
                const dtsBundleFile = ts.createSourceFile(dtsFile, yield fs.readFile(dtsFile, 'utf8'), ts.ScriptTarget.ESNext, false);
                return scanExportsForModules(dtsBundleFile).map((e) => ({
                    importPath: path.posix.join(packageJson.name, subpath),
                    symbolName: e,
                }));
            }))());
        }
        const moduleExports = (yield Promise.all(tasks)).flat();
        return { name: packageJson.name, packagePath, moduleExports };
    });
}
function scanExportsForModules(sf) {
    const moduleExports = [];
    const visit = (node) => {
        if (ts.isExportDeclaration(node) &&
            node.exportClause !== undefined &&
            ts.isNamedExports(node.exportClause)) {
            moduleExports.push(...node.exportClause.elements
                .filter((e) => e.name.text.endsWith('Module') &&
                // Check if the first letter is upper-case.
                e.name.text[0].toLowerCase() !== e.name.text[0])
                .map((e) => e.name.text));
        }
    };
    ts.forEachChild(sf, visit);
    return moduleExports;
}
