"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
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
exports.FakeWebContainerProcess = exports.FakeWebContainer = exports.FakeChangeDetectorRef = exports.MockLocalStorage = exports.FakeEventTarget = void 0;
const api_1 = require("@webcontainer/api");
class FakeEventTarget {
    constructor() {
        this.listeners = new Map();
    }
    addEventListener(type, listener) {
        const listeners = this.listeners.get(type) || [];
        listeners.push(listener);
        this.listeners.set(type, listeners);
    }
    removeEventListener(type, listener) {
        const listeners = this.listeners.get(type);
        if (listeners) {
            const index = listeners.indexOf(listener);
            if (index !== -1) {
                listeners.splice(index, 1);
            }
        }
    }
    dispatchEvent(event) {
        const listeners = this.listeners.get(event.type);
        if (listeners) {
            for (const listener of listeners) {
                if (typeof listener === 'function') {
                    listener.call(this, event);
                }
                else {
                    listener.handleEvent(event);
                }
            }
        }
        return true;
    }
}
exports.FakeEventTarget = FakeEventTarget;
class MockLocalStorage {
    constructor() {
        this.items = new Map();
    }
    getItem(key) {
        var _a;
        return (_a = this.items.get(key)) !== null && _a !== void 0 ? _a : null;
    }
    setItem(key, value) {
        this.items.set(key, value);
    }
}
exports.MockLocalStorage = MockLocalStorage;
class FakeChangeDetectorRef {
    markForCheck() { }
    detach() { }
    checkNoChanges() { }
    reattach() { }
    detectChanges() { }
}
exports.FakeChangeDetectorRef = FakeChangeDetectorRef;
class FakeWebContainer extends api_1.WebContainer {
    constructor(fakeOptions) {
        super();
        this.fakeSpawn = undefined;
        this.fs = new FakeFileSystemAPI();
        if (fakeOptions === null || fakeOptions === void 0 ? void 0 : fakeOptions.spawn)
            this.fakeSpawn = fakeOptions.spawn;
    }
    spawn(command, args, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.fakeSpawn)
                return this.fakeSpawn;
            return new FakeWebContainerProcess();
        });
    }
    on(event, listener) {
        return () => { };
    }
    mount(tree, options) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    get path() {
        return '/fake-path';
    }
    get workdir() {
        return '/fake-workdir';
    }
    teardown() { }
}
exports.FakeWebContainer = FakeWebContainer;
class FakeFileSystemAPI {
    readdir(path, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof options === 'object' && (options === null || options === void 0 ? void 0 : options.withFileTypes) === true) {
                return [{ name: 'fake-file', isFile: () => true, isDirectory: () => false }];
            }
            return ['/fake-dirname'];
        });
    }
    readFile(path, encoding) {
        return Promise.resolve('fake file content');
    }
    writeFile(path, data, options) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    mkdir(path, options) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    rm(path, options) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    rename(oldPath, newPath) {
        throw Error('Not implemented');
    }
    watch(filename, options, listener) {
        throw Error('Not implemented');
    }
}
class FakeWebContainerProcess {
    constructor() {
        this.exit = Promise.resolve(0);
        this.input = new WritableStream();
        this.output = new ReadableStream();
    }
    kill() { }
    resize(dimensions) { }
}
exports.FakeWebContainerProcess = FakeWebContainerProcess;
