"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Diagnostics = void 0;
/**
 * This class is used to collect and then report warnings and errors that occur during the execution
 * of the tools.
 *
 * @publicApi used by CLI
 */
class Diagnostics {
    constructor() {
        this.messages = [];
    }
    get hasErrors() {
        return this.messages.some((m) => m.type === 'error');
    }
    add(type, message) {
        if (type !== 'ignore') {
            this.messages.push({ type, message });
        }
    }
    warn(message) {
        this.messages.push({ type: 'warning', message });
    }
    error(message) {
        this.messages.push({ type: 'error', message });
    }
    merge(other) {
        this.messages.push(...other.messages);
    }
    formatDiagnostics(message) {
        const errors = this.messages.filter((d) => d.type === 'error').map((d) => ' - ' + d.message);
        const warnings = this.messages
            .filter((d) => d.type === 'warning')
            .map((d) => ' - ' + d.message);
        if (errors.length) {
            message += '\nERRORS:\n' + errors.join('\n');
        }
        if (warnings.length) {
            message += '\nWARNINGS:\n' + warnings.join('\n');
        }
        return message;
    }
}
exports.Diagnostics = Diagnostics;
