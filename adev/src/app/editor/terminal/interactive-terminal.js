"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractiveTerminal = exports.ALLOWED_KEYS = exports.NOT_VALID_COMMAND_MSG = void 0;
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const xterm_1 = require("@xterm/xterm");
const docs_1 = require("@angular/docs");
const command_validator_service_1 = require("./command-validator.service");
exports.NOT_VALID_COMMAND_MSG = 'Angular Documentation - Not allowed command!';
exports.ALLOWED_KEYS = [
    // Allow Backspace to delete what was typed
    'Backspace',
    // Allow ArrowUp to interact with CLI
    'ArrowUp',
    // Allow ArrowDown to interact with CLI
    'ArrowDown',
];
class InteractiveTerminal extends xterm_1.Terminal {
    constructor() {
        super({ convertEol: true, disableStdin: false });
        this.window = (0, core_1.inject)(docs_1.WINDOW);
        this.commandValidator = (0, core_1.inject)(command_validator_service_1.CommandValidator);
        this.breakProcess = new rxjs_1.Subject();
        // Using this stream, the webcontainer shell can break current process.
        this.breakProcess$ = this.breakProcess.asObservable();
        // bypass command validation if sudo=true is present in the query string
        if (!this.window.location.search.includes('sudo=true')) {
            this.handleCommandExecution();
        }
    }
    breakCurrentProcess() {
        this.breakProcess.next();
    }
    // Method validate if provided command by user is on the list of the allowed commands.
    // If so, then command is executed, otherwise error message is displayed in the terminal.
    handleCommandExecution() {
        const commandLinePrefix = '❯';
        const xtermRed = '\x1b[1;31m';
        this.attachCustomKeyEventHandler((event) => {
            if (exports.ALLOWED_KEYS.includes(event.key)) {
                return true;
            }
            // While user is typing, then do not validate command.
            if (['keydown', 'keyup'].includes(event.type)) {
                return false;
            }
            // When user pressed enter, then verify if command is on the list of the allowed ones.
            if (event.key === 'Enter') {
                // Xterm does not have API to receive current text/command.
                // In that case we can read it using DOM methods.
                // As command to execute we can treat the last line in terminal which starts with '❯'.
                // Hack: excluding `.xterm-fg-6` is required to run i.e `ng e2e`, `ng add @angular/material`.
                // Some steps with selecting options also starts with '❯'.
                let terminalContent = Array.from(this.element.querySelectorAll('.xterm-rows>div'))
                    .map((lines) => Array.from(lines.querySelectorAll('span:not(.xterm-fg-6)'))
                    .map((part) => part.textContent)
                    .join('')
                    .trim())
                    .filter((line) => !!line && line.startsWith(commandLinePrefix));
                let command = terminalContent.length > 0
                    ? terminalContent[terminalContent.length - 1].replace(commandLinePrefix, '').trim()
                    : '';
                // If command exist and is invalid, then write line with error message and block execution.
                if (command && !this.commandValidator.validate(command)) {
                    this.writeln(`\n${xtermRed}${exports.NOT_VALID_COMMAND_MSG}`);
                    this.breakCurrentProcess();
                    return false;
                }
            }
            return true;
        });
    }
}
exports.InteractiveTerminal = InteractiveTerminal;
