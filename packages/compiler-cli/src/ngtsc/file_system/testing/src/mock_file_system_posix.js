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
exports.MockFileSystemPosix = void 0;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
/// <reference types="node" />
const p = __importStar(require("path"));
const mock_file_system_1 = require("./mock_file_system");
class MockFileSystemPosix extends mock_file_system_1.MockFileSystem {
    resolve(...paths) {
        const resolved = p.posix.resolve(this.pwd(), ...paths);
        return this.normalize(resolved);
    }
    dirname(file) {
        return this.normalize(p.posix.dirname(file));
    }
    join(basePath, ...paths) {
        return this.normalize(p.posix.join(basePath, ...paths));
    }
    relative(from, to) {
        return this.normalize(p.posix.relative(from, to));
    }
    basename(filePath, extension) {
        return p.posix.basename(filePath, extension);
    }
    isRooted(path) {
        return path.startsWith('/');
    }
    splitPath(path) {
        return path.split('/');
    }
    normalize(path) {
        return path.replace(/^[a-z]:\//i, '/').replace(/\\/g, '/');
    }
}
exports.MockFileSystemPosix = MockFileSystemPosix;
