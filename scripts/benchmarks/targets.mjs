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
import path from 'path';
import { exec } from './utils.mjs';
/** Finds all benchmark Bazel targets in the project. */
export function findBenchmarkTargets() {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield exec('bazel', [
            'query',
            '--output=label',
            `'kind("^web_test", //modules/...) intersect attr("name", "perf", //modules/...)'`,
        ]))
            .split(/\r?\n/)
            .filter((t) => t !== '');
    });
}
/** Gets the testlog path of a given Bazel target. */
export function getTestlogPath(target) {
    return __awaiter(this, void 0, void 0, function* () {
        return path.join(yield bazelTestlogDir(), target.substring(2).replace(':', '/'));
    });
}
/** Resolves a given benchmark Bazel target to the fully expanded label. */
export function resolveTarget(target) {
    return __awaiter(this, void 0, void 0, function* () {
        // If the target does not specify an explicit browser test target, we attempt
        // to automatically add the Chromium suffix. This is necessary for e.g.
        // resolving testlogs which would reside under the actual test target.
        if (!target.endsWith('_chromium')) {
            target = `${target}_chromium`;
        }
        return (yield exec('bazel', ['query', '--output=label', target])).trim();
    });
}
let testlogDir = null;
function bazelTestlogDir() {
    return __awaiter(this, void 0, void 0, function* () {
        return testlogDir !== null && testlogDir !== void 0 ? testlogDir : (testlogDir = (yield exec('bazel', ['info', 'bazel-testlogs'])).trim());
    });
}
