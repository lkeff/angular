"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = exports.ERROR = exports.WARN = exports.DEBUG = void 0;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const logger_1 = require("./logger");
const RESET = '\x1b[0m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[36m';
exports.DEBUG = `${BLUE}Debug:${RESET}`;
exports.WARN = `${YELLOW}Warning:${RESET}`;
exports.ERROR = `${RED}Error:${RESET}`;
/**
 * A simple logger that outputs directly to the Console.
 *
 * The log messages can be filtered based on severity via the `logLevel`
 * constructor parameter.
 */
class ConsoleLogger {
    constructor(level) {
        this.level = level;
    }
    debug(...args) {
        if (this.level <= logger_1.LogLevel.debug)
            console.debug(exports.DEBUG, ...args);
    }
    info(...args) {
        if (this.level <= logger_1.LogLevel.info)
            console.info(...args);
    }
    warn(...args) {
        if (this.level <= logger_1.LogLevel.warn)
            console.warn(exports.WARN, ...args);
    }
    error(...args) {
        if (this.level <= logger_1.LogLevel.error)
            console.error(exports.ERROR, ...args);
    }
}
exports.ConsoleLogger = ConsoleLogger;
