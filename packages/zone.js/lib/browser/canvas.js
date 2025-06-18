"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchCanvas = patchCanvas;
function patchCanvas(Zone) {
    Zone.__load_patch('canvas', (global, Zone, api) => {
        const HTMLCanvasElement = global['HTMLCanvasElement'];
        if (typeof HTMLCanvasElement !== 'undefined' &&
            HTMLCanvasElement.prototype &&
            HTMLCanvasElement.prototype.toBlob) {
            api.patchMacroTask(HTMLCanvasElement.prototype, 'toBlob', (self, args) => {
                return { name: 'HTMLCanvasElement.toBlob', target: self, cbIdx: 0, args: args };
            });
        }
    });
}
