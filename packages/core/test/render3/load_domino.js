"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
// Needed to run animation tests
require("@angular/compiler"); // For JIT mode. Must be in front of any other @angular/* imports.
const common_1 = require("@angular/common");
const domino_adapter_1 = require("@angular/platform-server/src/domino_adapter");
if (typeof window == 'undefined') {
    const domino = require('../../../platform-server/src/bundled-domino');
    domino_adapter_1.DominoAdapter.makeCurrent();
    global.document = (0, common_1.ɵgetDOM)().getDefaultDocument();
    // For animation tests, see
    // https://github.com/angular/angular/blob/main/packages/animations/browser/src/render/shared.ts#L140
    global.Element = domino.impl.Element;
    global.isBrowser = false;
    global.isNode = true;
    global.Event = domino.impl.Event;
}
