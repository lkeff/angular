"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchMessagePort = patchMessagePort;
function patchMessagePort(Zone) {
    /**
     * Monkey patch `MessagePort.prototype.onmessage` and `MessagePort.prototype.onmessageerror`
     * properties to make the callback in the zone when the value are set.
     */
    Zone.__load_patch('MessagePort', (global, Zone, api) => {
        const MessagePort = global['MessagePort'];
        if (typeof MessagePort !== 'undefined' && MessagePort.prototype) {
            api.patchOnProperties(MessagePort.prototype, ['message', 'messageerror']);
        }
    });
}
