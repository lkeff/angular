"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeOrGetDirectiveForestHooks = exports.disableTimingAPI = exports.enableTimingAPI = void 0;
const highlighter_1 = require("../highlighter");
const hooks_1 = require("./hooks");
const markName = (s, method) => `🅰️ ${s}#${method}`;
const supportsPerformance = globalThis.performance && typeof globalThis.performance.getEntriesByName === 'function';
const recordMark = (s, method) => {
    if (supportsPerformance) {
        // tslint:disable-next-line:ban
        performance.mark(`${markName(s, method)}_start`);
    }
};
const endMark = (nodeName, method) => {
    if (supportsPerformance) {
        const name = markName(nodeName, method);
        const start = `${name}_start`;
        const end = `${name}_end`;
        if (performance.getEntriesByName(start).length > 0) {
            // tslint:disable-next-line:ban
            performance.mark(end);
            const measureOptions = {
                start,
                end,
                detail: {
                    devtools: {
                        dataType: 'track-entry',
                        color: 'primary',
                        track: '🅰️ Angular DevTools',
                    },
                },
            };
            performance.measure(name, measureOptions);
        }
        performance.clearMarks(start);
        performance.clearMarks(end);
        performance.clearMeasures(name);
    }
};
let timingAPIFlag = false;
const enableTimingAPI = () => (timingAPIFlag = true);
exports.enableTimingAPI = enableTimingAPI;
const disableTimingAPI = () => (timingAPIFlag = false);
exports.disableTimingAPI = disableTimingAPI;
const timingAPIEnabled = () => timingAPIFlag;
let directiveForestHooks;
const initializeOrGetDirectiveForestHooks = (depsForTestOnly = {}) => {
    // Allow for overriding the DirectiveForestHooks implementation for testing purposes.
    if (depsForTestOnly.directiveForestHooks) {
        directiveForestHooks = new depsForTestOnly.directiveForestHooks();
    }
    if (directiveForestHooks) {
        return directiveForestHooks;
    }
    else {
        directiveForestHooks = new hooks_1.DirectiveForestHooks();
    }
    directiveForestHooks.profiler.subscribe({
        onChangeDetectionStart(component) {
            if (!timingAPIEnabled()) {
                return;
            }
            recordMark((0, highlighter_1.getDirectiveName)(component), 'changeDetection');
        },
        onChangeDetectionEnd(component) {
            if (!timingAPIEnabled()) {
                return;
            }
            endMark((0, highlighter_1.getDirectiveName)(component), 'changeDetection');
        },
        onLifecycleHookStart(component, lifecyle) {
            if (!timingAPIEnabled()) {
                return;
            }
            recordMark((0, highlighter_1.getDirectiveName)(component), lifecyle);
        },
        onLifecycleHookEnd(component, lifecyle) {
            if (!timingAPIEnabled()) {
                return;
            }
            endMark((0, highlighter_1.getDirectiveName)(component), lifecyle);
        },
        onOutputStart(component, output) {
            if (!timingAPIEnabled()) {
                return;
            }
            recordMark((0, highlighter_1.getDirectiveName)(component), output);
        },
        onOutputEnd(component, output) {
            if (!timingAPIEnabled()) {
                return;
            }
            endMark((0, highlighter_1.getDirectiveName)(component), output);
        },
    });
    directiveForestHooks.initialize();
    return directiveForestHooks;
};
exports.initializeOrGetDirectiveForestHooks = initializeOrGetDirectiveForestHooks;
