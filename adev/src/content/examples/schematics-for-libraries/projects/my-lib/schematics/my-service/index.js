"use strict";
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
exports.myService = myService;
// #docplaster
// #docregion schematics-imports, schema-imports, workspace
const schematics_1 = require("@angular-devkit/schematics");
const core_1 = require("@angular-devkit/core");
// #enddocregion schema-imports
function createHost(tree) {
    return {
        readFile(path) {
            return __awaiter(this, void 0, void 0, function* () {
                const data = tree.read(path);
                if (!data) {
                    throw new schematics_1.SchematicsException('File not found.');
                }
                return core_1.virtualFs.fileBufferToString(data);
            });
        },
        writeFile(path, data) {
            return __awaiter(this, void 0, void 0, function* () {
                return tree.overwrite(path, data);
            });
        },
        isDirectory(path) {
            return __awaiter(this, void 0, void 0, function* () {
                return !tree.exists(path) && tree.getDir(path).subfiles.length > 0;
            });
        },
        isFile(path) {
            return __awaiter(this, void 0, void 0, function* () {
                return tree.exists(path);
            });
        },
    };
}
function myService(options) {
    return (tree) => __awaiter(this, void 0, void 0, function* () {
        const host = createHost(tree);
        const { workspace } = yield core_1.workspaces.readWorkspace('/', host);
        // #enddocregion workspace
        // #docregion project-info
        const project = options.project != null ? workspace.projects.get(options.project) : null;
        if (!project) {
            throw new schematics_1.SchematicsException(`Invalid project name: ${options.project}`);
        }
        const projectType = project.extensions.projectType === 'application' ? 'app' : 'lib';
        // #enddocregion project-info
        // #docregion path
        if (options.path === undefined) {
            options.path = `${project.sourceRoot}/${projectType}`;
        }
        // #enddocregion path
        // #docregion template
        const templateSource = (0, schematics_1.apply)((0, schematics_1.url)('./files'), [
            (0, schematics_1.applyTemplates)({
                classify: core_1.strings.classify,
                dasherize: core_1.strings.dasherize,
                name: options.name,
            }),
            (0, schematics_1.move)((0, core_1.normalize)(options.path)),
        ]);
        // #enddocregion template
        // #docregion chain
        return (0, schematics_1.chain)([(0, schematics_1.mergeWith)(templateSource)]);
        // #enddocregion chain
        // #docregion workspace
    });
}
