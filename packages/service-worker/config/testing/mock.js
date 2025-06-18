"use strict";
/**
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
exports.HashTrackingMockFilesystem = exports.MockFilesystem = void 0;
const sha1_1 = require("../../cli/sha1");
class MockFilesystem {
    constructor(files) {
        this.files = new Map();
        Object.keys(files).forEach((path) => this.files.set(path, files[path]));
    }
    list(dir) {
        return __awaiter(this, void 0, void 0, function* () {
            return Array.from(this.files.keys()).filter((path) => path.startsWith(dir));
        });
    }
    read(path) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.files.get(path);
        });
    }
    hash(path) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, sha1_1.sha1)(this.files.get(path));
        });
    }
    write(path, contents) {
        return __awaiter(this, void 0, void 0, function* () {
            this.files.set(path, contents);
        });
    }
}
exports.MockFilesystem = MockFilesystem;
class HashTrackingMockFilesystem extends MockFilesystem {
    constructor() {
        super(...arguments);
        this.maxConcurrentHashings = 0;
        this.concurrentHashings = 0;
    }
    /** @override */
    hash(path) {
        const _super = Object.create(null, {
            hash: { get: () => super.hash }
        });
        return __awaiter(this, void 0, void 0, function* () {
            // Increase the concurrent hashings count.
            this.concurrentHashings += 1;
            this.maxConcurrentHashings = Math.max(this.maxConcurrentHashings, this.concurrentHashings);
            // Artificial delay to check hashing concurrency.
            yield new Promise((resolve) => setTimeout(resolve, 250));
            // Decrease the concurrent hashings count.
            this.concurrentHashings -= 1;
            return _super.hash.call(this, path);
        });
    }
}
exports.HashTrackingMockFilesystem = HashTrackingMockFilesystem;
