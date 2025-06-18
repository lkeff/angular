"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const console_logger_1 = require("../src/console_logger");
const logger_1 = require("../src/logger");
describe('ConsoleLogger', () => {
    it('should pass through calls to Console', () => {
        spyOn(console, 'debug');
        spyOn(console, 'info');
        spyOn(console, 'warn');
        spyOn(console, 'error');
        const logger = new console_logger_1.ConsoleLogger(logger_1.LogLevel.debug);
        logger.debug('debug', 'test');
        expect(console.debug).toHaveBeenCalledWith(console_logger_1.DEBUG, 'debug', 'test');
        logger.info('info', 'test');
        expect(console.info).toHaveBeenCalledWith('info', 'test');
        logger.warn('warn', 'test');
        expect(console.warn).toHaveBeenCalledWith(console_logger_1.WARN, 'warn', 'test');
        logger.error('error', 'test');
        expect(console.error).toHaveBeenCalledWith(console_logger_1.ERROR, 'error', 'test');
    });
    it('should filter out calls below the given log level', () => {
        spyOn(console, 'debug');
        spyOn(console, 'info');
        spyOn(console, 'warn');
        spyOn(console, 'error');
        const logger = new console_logger_1.ConsoleLogger(logger_1.LogLevel.warn);
        logger.debug('debug', 'test');
        expect(console.debug).not.toHaveBeenCalled();
        logger.info('info', 'test');
        expect(console.info).not.toHaveBeenCalled();
        logger.warn('warn', 'test');
        expect(console.warn).toHaveBeenCalledWith(console_logger_1.WARN, 'warn', 'test');
        logger.error('error', 'test');
        expect(console.error).toHaveBeenCalledWith(console_logger_1.ERROR, 'error', 'test');
    });
    it('should expose the logging level', () => {
        expect(new console_logger_1.ConsoleLogger(logger_1.LogLevel.debug).level).toEqual(logger_1.LogLevel.debug);
        expect(new console_logger_1.ConsoleLogger(logger_1.LogLevel.info).level).toEqual(logger_1.LogLevel.info);
        expect(new console_logger_1.ConsoleLogger(logger_1.LogLevel.warn).level).toEqual(logger_1.LogLevel.warn);
        expect(new console_logger_1.ConsoleLogger(logger_1.LogLevel.error).level).toEqual(logger_1.LogLevel.error);
    });
});
