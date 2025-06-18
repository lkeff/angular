"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
// Note: We do not use a namespace import here because this will result in the
// named exports being modified if we apply jasmine spies on `realFs`. Using
// the default export gives us an object where we can patch properties on.
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const url_1 = __importDefault(require("url"));
const node_js_file_system_1 = require("../src/node_js_file_system");
describe('NodeJSPathManipulation', () => {
    let fs;
    let abcPath;
    let xyzPath;
    beforeEach(() => {
        fs = new node_js_file_system_1.NodeJSPathManipulation();
        abcPath = fs.resolve('/a/b/c');
        xyzPath = fs.resolve('/x/y/z');
    });
    describe('pwd()', () => {
        it('should delegate to process.cwd()', () => {
            const spy = spyOn(process, 'cwd').and.returnValue(abcPath);
            const result = fs.pwd();
            expect(result).toEqual(abcPath);
            expect(spy).toHaveBeenCalledWith();
        });
    });
    if (os_1.default.platform() === 'win32') {
        // Only relevant on Windows
        describe('relative', () => {
            it('should handle Windows paths on different drives', () => {
                expect(fs.relative('C:\\a\\b\\c', 'D:\\a\\b\\d')).toEqual(fs.resolve('D:\\a\\b\\d'));
            });
        });
    }
});
describe('NodeJSReadonlyFileSystem', () => {
    let fs;
    let abcPath;
    let xyzPath;
    beforeEach(() => {
        fs = new node_js_file_system_1.NodeJSReadonlyFileSystem();
        abcPath = fs.resolve('/a/b/c');
        xyzPath = fs.resolve('/x/y/z');
    });
    describe('isCaseSensitive()', () => {
        it('should return true if the FS is case-sensitive', () => {
            const currentFilename = url_1.default.fileURLToPath(import.meta.url);
            const isCaseSensitive = !fs_1.default.existsSync(currentFilename.toUpperCase());
            expect(fs.isCaseSensitive()).toEqual(isCaseSensitive);
        });
    });
    describe('exists()', () => {
        it('should delegate to fs.existsSync()', () => {
            const spy = spyOn(fs_1.default, 'existsSync').and.returnValues(true, false);
            expect(fs.exists(abcPath)).toBe(true);
            expect(spy).toHaveBeenCalledWith(abcPath);
            expect(fs.exists(xyzPath)).toBe(false);
            expect(spy).toHaveBeenCalledWith(xyzPath);
        });
    });
    describe('readFile()', () => {
        it('should delegate to fs.readFileSync()', () => {
            const spy = spyOn(fs_1.default, 'readFileSync').and.returnValue('Some contents');
            const result = fs.readFile(abcPath);
            expect(result).toBe('Some contents');
            expect(spy).toHaveBeenCalledWith(abcPath, 'utf8');
        });
    });
    describe('readFileBuffer()', () => {
        it('should delegate to fs.readFileSync()', () => {
            const buffer = new Buffer('Some contents');
            const spy = spyOn(fs_1.default, 'readFileSync').and.returnValue(buffer);
            const result = fs.readFileBuffer(abcPath);
            expect(result).toBe(buffer);
            expect(spy).toHaveBeenCalledWith(abcPath);
        });
    });
    describe('readdir()', () => {
        it('should delegate to fs.readdirSync()', () => {
            const spy = spyOn(fs_1.default, 'readdirSync').and.returnValue(['x', 'y/z']);
            const result = fs.readdir(abcPath);
            expect(result).toEqual(['x', 'y/z']);
            // TODO: @JiaLiPassion need to wait for @types/jasmine update to handle optional parameters.
            // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/43486
            expect(spy).toHaveBeenCalledWith(abcPath);
        });
    });
    describe('lstat()', () => {
        it('should delegate to fs.lstatSync()', () => {
            const stats = new fs_1.default.Stats();
            const spy = spyOn(fs_1.default, 'lstatSync').and.returnValue(stats);
            const result = fs.lstat(abcPath);
            expect(result).toBe(stats);
            expect(spy).toHaveBeenCalledWith(abcPath);
        });
    });
    describe('stat()', () => {
        it('should delegate to fs.statSync()', () => {
            const stats = new fs_1.default.Stats();
            const spy = spyOn(fs_1.default, 'statSync').and.returnValue(stats);
            const result = fs.stat(abcPath);
            expect(result).toBe(stats);
            // TODO: @JiaLiPassion need to wait for @types/jasmine update to handle optional parameters.
            // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/43486
            expect(spy).toHaveBeenCalledWith(abcPath);
        });
    });
});
describe('NodeJSFileSystem', () => {
    let fs;
    let abcPath;
    let xyzPath;
    beforeEach(() => {
        fs = new node_js_file_system_1.NodeJSFileSystem();
        abcPath = fs.resolve('/a/b/c');
        xyzPath = fs.resolve('/x/y/z');
    });
    describe('writeFile()', () => {
        it('should delegate to fs.writeFileSync()', () => {
            const spy = spyOn(fs_1.default, 'writeFileSync');
            fs.writeFile(abcPath, 'Some contents');
            expect(spy).toHaveBeenCalledWith(abcPath, 'Some contents', undefined);
            spy.calls.reset();
            fs.writeFile(abcPath, 'Some contents', /* exclusive */ true);
            expect(spy).toHaveBeenCalledWith(abcPath, 'Some contents', { flag: 'wx' });
        });
    });
    describe('removeFile()', () => {
        it('should delegate to fs.unlink()', () => {
            const spy = spyOn(fs_1.default, 'unlinkSync');
            fs.removeFile(abcPath);
            expect(spy).toHaveBeenCalledWith(abcPath);
        });
    });
    describe('copyFile()', () => {
        it('should delegate to fs.copyFileSync()', () => {
            const spy = spyOn(fs_1.default, 'copyFileSync');
            fs.copyFile(abcPath, xyzPath);
            expect(spy).toHaveBeenCalledWith(abcPath, xyzPath);
        });
    });
    describe('moveFile()', () => {
        it('should delegate to fs.renameSync()', () => {
            const spy = spyOn(fs_1.default, 'renameSync');
            fs.moveFile(abcPath, xyzPath);
            expect(spy).toHaveBeenCalledWith(abcPath, xyzPath);
        });
    });
    describe('ensureDir()', () => {
        it('should delegate to fs.mkdirSync()', () => {
            const mkdirCalls = [];
            spyOn(fs_1.default, 'mkdirSync').and.callFake(((path) => mkdirCalls.push(path)));
            fs.ensureDir(abcPath);
            expect(mkdirCalls).toEqual([abcPath]);
        });
    });
    describe('removeDeep()', () => {
        it('should delegate to rmdirSync()', () => {
            const spy = spyOn(fs_1.default, 'rmdirSync');
            fs.removeDeep(abcPath);
            expect(spy).toHaveBeenCalledWith(abcPath, { recursive: true });
        });
    });
});
