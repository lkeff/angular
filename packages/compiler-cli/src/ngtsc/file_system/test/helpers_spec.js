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
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const os = __importStar(require("os"));
const helpers_1 = require("../src/helpers");
const node_js_file_system_1 = require("../src/node_js_file_system");
describe('path types', () => {
    beforeEach(() => {
        (0, helpers_1.setFileSystem)(new node_js_file_system_1.NodeJSFileSystem());
    });
    describe('absoluteFrom', () => {
        it('should not throw when creating one from an absolute path', () => {
            expect(() => (0, helpers_1.absoluteFrom)('/test.txt')).not.toThrow();
        });
        if (os.platform() === 'win32') {
            it('should not throw when creating one from a windows absolute path', () => {
                expect((0, helpers_1.absoluteFrom)('C:\\test.txt')).toEqual('C:/test.txt');
            });
            it('should not throw when creating one from a windows absolute path with POSIX separators', () => {
                expect((0, helpers_1.absoluteFrom)('C:/test.txt')).toEqual('C:/test.txt');
            });
            it('should support windows drive letters', () => {
                expect((0, helpers_1.absoluteFrom)('D:\\foo\\test.txt')).toEqual('D:/foo/test.txt');
            });
            it('should convert Windows path separators to POSIX separators', () => {
                expect((0, helpers_1.absoluteFrom)('C:\\foo\\test.txt')).toEqual('C:/foo/test.txt');
            });
        }
        it('should throw when creating one from a non-absolute path', () => {
            expect(() => (0, helpers_1.absoluteFrom)('test.txt')).toThrow();
        });
    });
    describe('relativeFrom', () => {
        it('should not throw when creating one from a relative path', () => {
            expect(() => (0, helpers_1.relativeFrom)('a/b/c.txt')).not.toThrow();
        });
        it('should throw when creating one from an absolute path', () => {
            expect(() => (0, helpers_1.relativeFrom)('/a/b/c.txt')).toThrow();
        });
        if (os.platform() === 'win32') {
            it('should throw when creating one from a Windows absolute path', () => {
                expect(() => (0, helpers_1.relativeFrom)('C:/a/b/c.txt')).toThrow();
            });
        }
    });
});
