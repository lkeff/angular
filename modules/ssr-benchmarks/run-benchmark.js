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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storePerformanceLogOfCurrentRun = storePerformanceLogOfCurrentRun;
/* tslint:disable:no-console  */
const core_1 = require("@angular/core");
const main_server_1 = require("./src/main.server");
const test_data_1 = require("./test-data");
// If you add an new measure, make sure to add it to this map
const levels = new Map([
    ['renderApplication', 0],
    ['createServerPlatform', 1],
    ['bootstrap', 1],
    ['_render', 1],
    ['whenStable', 2],
    ['prepareForHydration', 2],
    ['insertEventRecordScript', 2],
    ['serializeTransferStateFactory', 2],
    ['renderToString', 2],
]);
const narrowRun = typeof process !== 'undefined' && process.argv.length > 0;
main(narrowRun);
function main(narrowRun) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Benchmarking started...');
        console.log(`DOM emulation is ${DISABLE_DOM_EMULATION ? 'disabled' : 'enabled'}`);
        if (narrowRun) {
            yield benchmarkRun(10000, 20);
        }
        else {
            yield benchmarkRun(10, 1000);
            yield benchmarkRun(100, 1000);
            yield benchmarkRun(1000, 1000);
        }
    });
}
/**
 *
 * @param rowCount Number of rows rendered in the App
 * @param renderingCount Number of times the app will be rendered
 */
function benchmarkRun(rowCount, renderingCount) {
    return __awaiter(this, void 0, void 0, function* () {
        const measures = new Map();
        (0, test_data_1.initData)(rowCount);
        // Rendering & profiling
        for (let i = 0; i < renderingCount; i++) {
            yield (0, main_server_1.render)(DISABLE_DOM_EMULATION);
            storePerformanceLogOfCurrentRun(measures);
        }
        const totals = measures.get(`${core_1.ɵPERFORMANCE_MARK_PREFIX}:renderApplication`);
        const avgTotals = totals.reduce((acc, val) => acc + val, 0) / totals.length;
        let maxNameLength = 0;
        const table = [...measures.entries()]
            .map(([name, durations]) => {
            var _a;
            name = name.substring(core_1.ɵPERFORMANCE_MARK_PREFIX.length + 1);
            const level = (_a = levels.get(name)) !== null && _a !== void 0 ? _a : 0;
            name = `${new Array(level + 1).join(' ')} ${level ? '└ ' : ''}${name}`;
            maxNameLength = Math.max(name.length, maxNameLength);
            const avg = durations.reduce((acc, val) => acc + val, 0) / durations.length;
            const avgStr = durationToString(avg);
            const percentage = `${((avg / avgTotals) * 100).toFixed(1)}%`;
            const min = durationToString(Math.min(...durations));
            const max = durationToString(Math.max(...durations));
            return { name, min, average: avgStr, percentage, max };
        })
            .map((_a) => {
            var { name } = _a, rest = __rest(_a, ["name"]);
            // We need this because Node18 aligns text in the middle of the column instead of left).
            const spaces = maxNameLength - name.length;
            return Object.assign({ name: `${name}${' '.repeat(spaces)}` }, rest);
        });
        // Logging the profiling result as a table
        console.log(`=== table with ${rowCount} rows, with ${renderingCount} renders ===`);
        console.table(table);
        console.log('\n', '\n');
    });
}
function durationToString(duration) {
    return `${duration.toFixed(1)}ms`;
}
/**
 * This function mutates the measures map by adding the performance entries.
 * Each entry is sorted, which will make the map keys sorted by startTime
 */
function storePerformanceLogOfCurrentRun(measures) {
    const perfEntries = performance.getEntriesByType('measure');
    perfEntries.sort((a, b) => a.startTime - b.startTime);
    for (const { name, duration } of perfEntries) {
        if (!name.startsWith(core_1.ɵPERFORMANCE_MARK_PREFIX)) {
            continue;
        }
        const measure = measures.get(name);
        if (!measure) {
            measures.set(name, [duration]);
        }
        else {
            measure.push(duration);
        }
        performance.clearMeasures(name);
    }
}
