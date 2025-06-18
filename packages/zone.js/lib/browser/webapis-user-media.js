"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchUserMedia = patchUserMedia;
function patchUserMedia(Zone) {
    Zone.__load_patch('getUserMedia', (global, Zone, api) => {
        function wrapFunctionArgs(func, source) {
            return function () {
                const args = Array.prototype.slice.call(arguments);
                const wrappedArgs = api.bindArguments(args, source ? source : func.name);
                return func.apply(this, wrappedArgs);
            };
        }
        let navigator = global['navigator'];
        if (navigator && navigator.getUserMedia) {
            navigator.getUserMedia = wrapFunctionArgs(navigator.getUserMedia);
        }
    });
}
