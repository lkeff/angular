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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeJSFileSystem = exports.NodeJSReadonlyFileSystem = exports.NodeJSPathManipulation = void 0;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
/// <reference types="node" />
const fs_1 = __importDefault(require("fs"));
const module_1 = require("module");
const p = __importStar(require("path"));
const url_1 = require("url");
/**
 * A wrapper around the Node.js file-system that supports path manipulation.
 */
class NodeJSPathManipulation {
    pwd() {
        return this.normalize(process.cwd());
    }
    chdir(dir) {
        process.chdir(dir);
    }
    resolve(...paths) {
        return this.normalize(p.resolve(...paths));
    }
    dirname(file) {
        return this.normalize(p.dirname(file));
    }
    join(basePath, ...paths) {
        return this.normalize(p.join(basePath, ...paths));
    }
    isRoot(path) {
        return this.dirname(path) === this.normalize(path);
    }
    isRooted(path) {
        return p.isAbsolute(path);
    }
    relative(from, to) {
        return this.normalize(p.relative(from, to));
    }
    basename(filePath, extension) {
        return p.basename(filePath, extension);
    }
    extname(path) {
        return p.extname(path);
    }
    normalize(path) {
        // Convert backslashes to forward slashes
        return path.replace(/\\/g, '/');
    }
}
exports.NodeJSPathManipulation = NodeJSPathManipulation;
// G3-ESM-MARKER: G3 uses CommonJS, but externally everything in ESM.
// CommonJS/ESM interop for determining the current file name and containing dir.
const isCommonJS = typeof __filename !== 'undefined';
const currentFileUrl = isCommonJS ? null : import.meta.url;
const currentFileName = isCommonJS ? __filename : (0, url_1.fileURLToPath)(currentFileUrl);
/**
 * A wrapper around the Node.js file-system that supports readonly operations and path manipulation.
 */
class NodeJSReadonlyFileSystem extends NodeJSPathManipulation {
    constructor() {
        super(...arguments);
        this._caseSensitive = undefined;
    }
    isCaseSensitive() {
        if (this._caseSensitive === undefined) {
            // Note the use of the real file-system is intentional:
            // `this.exists()` relies upon `isCaseSensitive()` so that would cause an infinite recursion.
            this._caseSensitive = !fs_1.default.existsSync(this.normalize(toggleCase(currentFileName)));
        }
        return this._caseSensitive;
    }
    exists(path) {
        return fs_1.default.existsSync(path);
    }
    readFile(path) {
        return fs_1.default.readFileSync(path, 'utf8');
    }
    readFileBuffer(path) {
        return fs_1.default.readFileSync(path);
    }
    readdir(path) {
        return fs_1.default.readdirSync(path);
    }
    lstat(path) {
        return fs_1.default.lstatSync(path);
    }
    stat(path) {
        return fs_1.default.statSync(path);
    }
    realpath(path) {
        return this.resolve(fs_1.default.realpathSync(path));
    }
    getDefaultLibLocation() {
        // G3-ESM-MARKER: G3 uses CommonJS, but externally everything in ESM.
        const requireFn = isCommonJS ? require : (0, module_1.createRequire)(currentFileUrl);
        return this.resolve(requireFn.resolve('typescript'), '..');
    }
}
exports.NodeJSReadonlyFileSystem = NodeJSReadonlyFileSystem;
/**
 * A wrapper around the Node.js file-system (i.e. the `fs` package).
 */
class NodeJSFileSystem extends NodeJSReadonlyFileSystem {
    writeFile(path, data, exclusive = false) {
        fs_1.default.writeFileSync(path, data, exclusive ? { flag: 'wx' } : undefined);
    }
    removeFile(path) {
        fs_1.default.unlinkSync(path);
    }
    symlink(target, path) {
        fs_1.default.symlinkSync(target, path);
    }
    copyFile(from, to) {
        fs_1.default.copyFileSync(from, to);
    }
    moveFile(from, to) {
        fs_1.default.renameSync(from, to);
    }
    ensureDir(path) {
        fs_1.default.mkdirSync(path, { recursive: true });
    }
    removeDeep(path) {
        fs_1.default.rmdirSync(path, { recursive: true });
    }
}
exports.NodeJSFileSystem = NodeJSFileSystem;
/**
 * Toggle the case of each character in a string.
 */
function toggleCase(str) {
    return str.replace(/\w/g, (ch) => ch.toUpperCase() === ch ? ch.toLowerCase() : ch.toUpperCase());
}
