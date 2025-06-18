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
exports.MockFileSystemNative = void 0;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
/// <reference types="node" />
const os = __importStar(require("os"));
const node_js_file_system_1 = require("../../src/node_js_file_system");
const mock_file_system_1 = require("./mock_file_system");
const isWindows = os.platform() === 'win32';
class MockFileSystemNative extends mock_file_system_1.MockFileSystem {
    constructor(cwd = '/') {
        super(undefined, cwd);
    }
    // Delegate to the real NodeJSFileSystem for these path related methods
    resolve(...paths) {
        return node_js_file_system_1.NodeJSFileSystem.prototype.resolve.call(this, this.pwd(), ...paths);
    }
    dirname(file) {
        return node_js_file_system_1.NodeJSFileSystem.prototype.dirname.call(this, file);
    }
    join(basePath, ...paths) {
        return node_js_file_system_1.NodeJSFileSystem.prototype.join.call(this, basePath, ...paths);
    }
    relative(from, to) {
        return node_js_file_system_1.NodeJSFileSystem.prototype.relative.call(this, from, to);
    }
    basename(filePath, extension) {
        return node_js_file_system_1.NodeJSFileSystem.prototype.basename.call(this, filePath, extension);
    }
    isCaseSensitive() {
        return node_js_file_system_1.NodeJSFileSystem.prototype.isCaseSensitive.call(this);
    }
    isRooted(path) {
        return node_js_file_system_1.NodeJSFileSystem.prototype.isRooted.call(this, path);
    }
    isRoot(path) {
        return node_js_file_system_1.NodeJSFileSystem.prototype.isRoot.call(this, path);
    }
    normalize(path) {
        // When running in Windows, absolute paths are normalized to always include a drive letter. This
        // ensures that rooted posix paths used in tests will be normalized to real Windows paths, i.e.
        // including a drive letter. Note that the same normalization is done in emulated Windows mode
        // (see `MockFileSystemWindows`) so that the behavior is identical between native Windows and
        // emulated Windows mode.
        if (isWindows) {
            path = path.replace(/^[\/\\]/i, 'C:/');
        }
        return node_js_file_system_1.NodeJSFileSystem.prototype.normalize.call(this, path);
    }
    splitPath(path) {
        return path.split(/[\\\/]/);
    }
}
exports.MockFileSystemNative = MockFileSystemNative;
