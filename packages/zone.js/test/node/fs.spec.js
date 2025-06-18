"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const url_1 = __importDefault(require("url"));
const util_1 = __importDefault(require("util"));
const currentFile = url_1.default.fileURLToPath(import.meta.url);
describe('nodejs file system', () => {
    describe('async method patch test', () => {
        it('has patched exists()', (done) => {
            const zoneA = Zone.current.fork({ name: 'A' });
            zoneA.run(() => {
                (0, fs_1.exists)('testfile', (_) => {
                    expect(Zone.current.name).toBe(zoneA.name);
                    done();
                });
            });
        });
        it('has patched exists as macroTask', (done) => {
            const zoneASpec = {
                name: 'A',
                onScheduleTask: (delegate, currentZone, targetZone, task) => {
                    return delegate.scheduleTask(targetZone, task);
                },
            };
            const zoneA = Zone.current.fork(zoneASpec);
            spyOn(zoneASpec, 'onScheduleTask').and.callThrough();
            zoneA.run(() => {
                (0, fs_1.exists)('testfile', (_) => {
                    expect(zoneASpec.onScheduleTask).toHaveBeenCalled();
                    done();
                });
            });
        });
        it('has patched realpath as macroTask', (done) => {
            const testZoneSpec = {
                name: 'test',
                onScheduleTask: (delegate, currentZone, targetZone, task) => {
                    return delegate.scheduleTask(targetZone, task);
                },
            };
            const testZone = Zone.current.fork(testZoneSpec);
            spyOn(testZoneSpec, 'onScheduleTask').and.callThrough();
            testZone.run(() => {
                (0, fs_1.realpath)('testfile', () => {
                    expect(Zone.current).toBe(testZone);
                    expect(testZoneSpec.onScheduleTask).toHaveBeenCalled();
                    done();
                });
            });
        });
        // https://github.com/angular/angular/issues/45546
        // Note that this is intentionally marked with `xit` because `realpath.native`
        // is patched by Bazel's `node_patches.js` and doesn't allow further patching
        // of `realpath.native` in unit tests. Essentially, there's no original delegate
        // for `realpath` because it's also patched. The code below functions correctly
        // in the actual production environment.
        xit('has patched realpath.native as macroTask', (done) => {
            const testZoneSpec = {
                name: 'test',
                onScheduleTask: (delegate, currentZone, targetZone, task) => {
                    return delegate.scheduleTask(targetZone, task);
                },
            };
            const testZone = Zone.current.fork(testZoneSpec);
            spyOn(testZoneSpec, 'onScheduleTask').and.callThrough();
            testZone.run(() => {
                fs_1.realpath.native('testfile', () => {
                    expect(Zone.current).toBe(testZone);
                    expect(testZoneSpec.onScheduleTask).toHaveBeenCalled();
                    done();
                });
            });
        });
    });
    describe('watcher related methods test', () => {
        const zoneASpec = {
            name: 'A',
            onScheduleTask: (delegate, currentZone, targetZone, task) => {
                return delegate.scheduleTask(targetZone, task);
            },
        };
        it('fs.watch has been patched as eventTask', (done) => {
            spyOn(zoneASpec, 'onScheduleTask').and.callThrough();
            const zoneA = Zone.current.fork(zoneASpec);
            zoneA.run(() => {
                (0, fs_1.writeFile)('testfile', 'test content', () => {
                    const watcher = (0, fs_1.watch)('testfile', (eventType, filename) => {
                        expect(filename).toEqual('testfile');
                        expect(eventType).toEqual('change');
                        expect(zoneASpec.onScheduleTask).toHaveBeenCalled();
                        expect(Zone.current.name).toBe('A');
                        watcher.close();
                        (0, fs_1.unlink)('testfile', () => {
                            done();
                        });
                    });
                    (0, fs_1.writeFile)('testfile', 'test new content', () => { });
                });
            });
        });
        it('fs.watchFile has been patched as eventTask', (done) => {
            spyOn(zoneASpec, 'onScheduleTask').and.callThrough();
            const zoneA = Zone.current.fork(zoneASpec);
            zoneA.run(() => {
                (0, fs_1.writeFile)('testfile', 'test content', () => {
                    (0, fs_1.watchFile)('testfile', { persistent: false, interval: 1000 }, (curr, prev) => {
                        expect(curr.size).toBe(16);
                        expect(prev.size).toBe(12);
                        expect(zoneASpec.onScheduleTask).toHaveBeenCalled();
                        expect(Zone.current.name).toBe('A');
                        (0, fs_1.unwatchFile)('testfile');
                        (0, fs_1.unlink)('testfile', () => {
                            done();
                        });
                    });
                    (0, fs_1.writeFile)('testfile', 'test new content', () => { });
                });
            });
        });
    });
});
describe('util.promisify', () => {
    it('fs.exists should work with util.promisify', (done) => {
        const promisifyExists = util_1.default.promisify(fs_1.exists);
        promisifyExists(currentFile).then((r) => {
            expect(r).toBe(true);
            done();
        }, (err) => {
            fail(`should not be here with error: ${err}`);
        });
    });
    it('fs.realpath should work with util.promisify', (done) => {
        const promisifyRealpath = util_1.default.promisify(fs_1.realpath);
        promisifyRealpath(currentFile).then((r) => {
            expect(r).toBeDefined();
            done();
        }, (err) => {
            fail(`should not be here with error: ${err}`);
        });
    });
    it('fs.realpath.native should work with util.promisify', (done) => {
        const promisifyRealpathNative = util_1.default.promisify(fs_1.realpath.native);
        promisifyRealpathNative(currentFile).then((r) => {
            expect(r).toBeDefined();
            done();
        }, (err) => {
            fail(`should not be here with error: ${err}`);
        });
    });
    it('fs.read should work with util.promisify', (done) => {
        const promisifyRead = util_1.default.promisify(fs_1.read);
        const fd = (0, fs_1.openSync)(currentFile, 'r');
        const stats = (0, fs_1.fstatSync)(fd);
        const bufferSize = stats.size;
        const chunkSize = 512;
        const buffer = new Buffer(bufferSize);
        let bytesRead = 0;
        // fd, buffer, offset, length, position, callback
        promisifyRead(fd, buffer, bytesRead, chunkSize, bytesRead).then((value) => {
            expect(value.bytesRead).toBe(chunkSize);
            (0, fs_1.closeSync)(fd);
            done();
        }, (err) => {
            (0, fs_1.closeSync)(fd);
            fail(`should not be here with error: ${err}.`);
        });
    });
    it('fs.write should work with util.promisify', (done) => {
        const promisifyWrite = util_1.default.promisify(fs_1.write);
        const dest = currentFile + 'write';
        const fd = (0, fs_1.openSync)(dest, 'a');
        const stats = (0, fs_1.fstatSync)(fd);
        const chunkSize = 512;
        const buffer = new Buffer(chunkSize);
        for (let i = 0; i < chunkSize; i++) {
            buffer[i] = 0;
        }
        // fd, buffer, offset, length, position, callback
        promisifyWrite(fd, buffer, 0, chunkSize, 0).then((value) => {
            expect(value.bytesWritten).toBe(chunkSize);
            (0, fs_1.closeSync)(fd);
            (0, fs_1.unlinkSync)(dest);
            done();
        }, (err) => {
            (0, fs_1.closeSync)(fd);
            (0, fs_1.unlinkSync)(dest);
            fail(`should not be here with error: ${err}.`);
        });
    });
});
