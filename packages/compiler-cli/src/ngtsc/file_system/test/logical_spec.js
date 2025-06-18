"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const compiler_host_1 = require("../src/compiler_host");
const helpers_1 = require("../src/helpers");
const logical_1 = require("../src/logical");
const testing_1 = require("../testing");
(0, testing_1.runInEachFileSystem)(() => {
    describe('logical paths', () => {
        let _;
        let host;
        beforeEach(() => {
            _ = helpers_1.absoluteFrom;
            host = new compiler_host_1.NgtscCompilerHost((0, helpers_1.getFileSystem)());
        });
        describe('LogicalFileSystem', () => {
            it('should determine logical paths in a single root file system', () => {
                const fs = new logical_1.LogicalFileSystem([_('/test')], host);
                expect(fs.logicalPathOfFile(_('/test/foo/foo.ts'))).toEqual('/foo/foo');
                expect(fs.logicalPathOfFile(_('/test/bar/bar.ts'))).toEqual('/bar/bar');
                expect(fs.logicalPathOfFile(_('/not-test/bar.ts'))).toBeNull();
            });
            it('should determine logical paths in a multi-root file system', () => {
                const fs = new logical_1.LogicalFileSystem([_('/test/foo'), _('/test/bar')], host);
                expect(fs.logicalPathOfFile(_('/test/foo/foo.ts'))).toEqual('/foo');
                expect(fs.logicalPathOfFile(_('/test/bar/bar.ts'))).toEqual('/bar');
            });
            it('should continue to work when one root is a child of another', () => {
                const fs = new logical_1.LogicalFileSystem([_('/test'), _('/test/dist')], host);
                expect(fs.logicalPathOfFile(_('/test/foo.ts'))).toEqual('/foo');
                expect(fs.logicalPathOfFile(_('/test/dist/foo.ts'))).toEqual('/foo');
            });
            it('should always return `/` prefixed logical paths', () => {
                const rootFs = new logical_1.LogicalFileSystem([_('/')], host);
                expect(rootFs.logicalPathOfFile(_('/foo/foo.ts'))).toEqual('/foo/foo');
                const nonRootFs = new logical_1.LogicalFileSystem([_('/test/')], host);
                expect(nonRootFs.logicalPathOfFile(_('/test/foo/foo.ts'))).toEqual('/foo/foo');
            });
            it('should maintain casing of logical paths', () => {
                const fs = new logical_1.LogicalFileSystem([_('/Test')], host);
                expect(fs.logicalPathOfFile(_('/Test/foo/Foo.ts'))).toEqual('/foo/Foo');
                expect(fs.logicalPathOfFile(_('/Test/foo/foo.ts'))).toEqual('/foo/foo');
                expect(fs.logicalPathOfFile(_('/Test/bar/bAR.ts'))).toEqual('/bar/bAR');
            });
            it('should use case-sensitivity when matching rootDirs', () => {
                const fs = new logical_1.LogicalFileSystem([_('/Test')], host);
                if (host.useCaseSensitiveFileNames()) {
                    expect(fs.logicalPathOfFile(_('/test/car/CAR.ts'))).toBe(null);
                }
                else {
                    expect(fs.logicalPathOfFile(_('/test/car/CAR.ts'))).toEqual('/car/CAR');
                }
            });
        });
        describe('utilities', () => {
            it('should give a relative path between two adjacent logical files', () => {
                const res = logical_1.LogicalProjectPath.relativePathBetween('/foo', '/bar');
                expect(res).toEqual('./bar');
            });
            it('should give a relative path between two non-adjacent logical files', () => {
                const res = logical_1.LogicalProjectPath.relativePathBetween('/foo/index', '/bar/index');
                expect(res).toEqual('../bar/index');
            });
            it('should maintain casing in relative path between logical files', () => {
                const res = logical_1.LogicalProjectPath.relativePathBetween('/fOO', '/bAR');
                expect(res).toEqual('./bAR');
            });
        });
    });
});
