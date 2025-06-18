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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevkitMigrationFilesystem = void 0;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license

*/
const core_1 = require("@angular-devkit/core");
const posixPath = __importStar(require("node:path/posix"));
/**
 * Angular compiler file system implementation that leverages an
 * CLI schematic virtual file tree.
 */
class DevkitMigrationFilesystem {
    constructor(tree) {
        this.tree = tree;
    }
    extname(path) {
        return (0, core_1.extname)(path);
    }
    isRoot(path) {
        return path === (0, core_1.normalize)('/');
    }
    isRooted(path) {
        return this.normalize(path).startsWith('/');
    }
    dirname(file) {
        return this.normalize((0, core_1.dirname)(file));
    }
    join(basePath, ...paths) {
        return this.normalize((0, core_1.join)(basePath, ...paths));
    }
    relative(from, to) {
        return this.normalize((0, core_1.relative)(from, to));
    }
    basename(filePath, extension) {
        return posixPath.basename(filePath, extension);
    }
    normalize(path) {
        return (0, core_1.normalize)(path);
    }
    resolve(...paths) {
        const normalizedPaths = paths.map((p) => (0, core_1.normalize)(p));
        // In dev-kit, the NodeJS working directory should never be
        // considered, so `/` is the last resort over `cwd`.
        return this.normalize(posixPath.resolve((0, core_1.normalize)('/'), ...normalizedPaths));
    }
    pwd() {
        return '/';
    }
    isCaseSensitive() {
        return true;
    }
    exists(path) {
        return statPath(this.tree, path) !== null;
    }
    readFile(path) {
        return this.tree.readText(path);
    }
    readFileBuffer(path) {
        const buffer = this.tree.read(path);
        if (buffer === null) {
            throw new Error(`File does not exist: ${path}`);
        }
        return buffer;
    }
    readdir(path) {
        const dir = this.tree.getDir(path);
        return [
            ...dir.subdirs,
            ...dir.subfiles,
        ];
    }
    lstat(path) {
        const stat = statPath(this.tree, path);
        if (stat === null) {
            throw new Error(`File does not exist for "lstat": ${path}`);
        }
        return stat;
    }
    stat(path) {
        const stat = statPath(this.tree, path);
        if (stat === null) {
            throw new Error(`File does not exist for "stat": ${path}`);
        }
        return stat;
    }
    realpath(filePath) {
        return filePath;
    }
    getDefaultLibLocation() {
        return 'node_modules/typescript/lib';
    }
    ensureDir(path) {
        // Migrations should compute replacements and not write directly.
        throw new Error('DevkitFilesystem#ensureDir is not supported.');
    }
    writeFile(path, data) {
        // Migrations should compute replacements and not write directly.
        throw new Error('DevkitFilesystem#writeFile is not supported.');
    }
    removeFile(path) {
        // Migrations should compute replacements and not write directly.
        throw new Error('DevkitFilesystem#removeFile is not supported.');
    }
    copyFile(from, to) {
        // Migrations should compute replacements and not write directly.
        throw new Error('DevkitFilesystem#copyFile is not supported.');
    }
    moveFile(from, to) {
        // Migrations should compute replacements and not write directly.
        throw new Error('DevkitFilesystem#moveFile is not supported.');
    }
    removeDeep(path) {
        // Migrations should compute replacements and not write directly.
        throw new Error('DevkitFilesystem#removeDeep is not supported.');
    }
    chdir(_path) {
        throw new Error('FileSystem#chdir is not supported.');
    }
    symlink() {
        throw new Error('FileSystem#symlink is not supported.');
    }
}
exports.DevkitMigrationFilesystem = DevkitMigrationFilesystem;
/** Stats the given path in the virtual tree. */
function statPath(tree, path) {
    let fileInfo = null;
    let dirInfo = null;
    try {
        fileInfo = tree.get(path);
    }
    catch (e) {
        if (e.constructor.name === 'PathIsDirectoryException') {
            dirInfo = tree.getDir(path);
        }
        else {
            throw e;
        }
    }
    if (fileInfo !== null || dirInfo !== null) {
        return {
            isDirectory: () => dirInfo !== null,
            isFile: () => fileInfo !== null,
            isSymbolicLink: () => false,
        };
    }
    return null;
}
