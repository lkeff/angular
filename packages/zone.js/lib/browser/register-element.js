"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerElementPatch = registerElementPatch;
function registerElementPatch(_global, api) {
    const { isBrowser, isMix } = api.getGlobalObjects();
    if ((!isBrowser && !isMix) || !('registerElement' in _global.document)) {
        return;
    }
    const callbacks = [
        'createdCallback',
        'attachedCallback',
        'detachedCallback',
        'attributeChangedCallback',
    ];
    api.patchCallbacks(api, document, 'Document', 'registerElement', callbacks);
}
