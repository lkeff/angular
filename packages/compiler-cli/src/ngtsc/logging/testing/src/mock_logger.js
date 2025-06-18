"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockLogger = void 0;
const __1 = require("../..");
class MockLogger {
    constructor(level = __1.LogLevel.info) {
        this.level = level;
        this.logs = {
            debug: [],
            info: [],
            warn: [],
            error: [],
        };
    }
    debug(...args) {
        this.logs.debug.push(args);
    }
    info(...args) {
        this.logs.info.push(args);
    }
    warn(...args) {
        this.logs.warn.push(args);
    }
    error(...args) {
        this.logs.error.push(args);
    }
}
exports.MockLogger = MockLogger;
