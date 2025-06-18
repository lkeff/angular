"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const ng_devtools_backend_1 = require("ng-devtools-backend");
const highlighter_1 = require("../../../ng-devtools-backend/src/lib/highlighter");
const chrome_window_extensions_1 = require("./chrome-window-extensions");
const same_page_message_bus_1 = require("./same-page-message-bus");
const messageBus = new same_page_message_bus_1.SamePageMessageBus(`angular-devtools-backend-${location.href}`, `angular-devtools-content-script-${location.href}`);
let initialized = false;
messageBus.on('handshake', () => {
    if (initialized) {
        return;
    }
    initialized = true;
    (0, ng_devtools_backend_1.initializeMessageBus)(messageBus);
    (0, chrome_window_extensions_1.initializeExtendedWindowOperations)();
    let inspectorRunning = false;
    messageBus.on('inspectorStart', () => {
        inspectorRunning = true;
    });
    messageBus.on('inspectorEnd', () => {
        inspectorRunning = false;
    });
    // handles case when mouse leaves chrome extension too quickly. unHighlight() is not a very
    // expensive function and has an if check so it's DOM api call is not called more than necessary
    document.addEventListener('mousemove', () => {
        if (!inspectorRunning) {
            (0, highlighter_1.unHighlight)();
        }
    }, false);
    messageBus.emit('backendReady');
});
