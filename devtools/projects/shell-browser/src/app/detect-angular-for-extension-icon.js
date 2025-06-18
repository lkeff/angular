"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const shared_utils_1 = require("shared-utils");
const same_page_message_bus_1 = require("./same-page-message-bus");
const detectAngularMessageBus = new same_page_message_bus_1.SamePageMessageBus(`angular-devtools-detect-angular-${location.href}`, `angular-devtools-content-script-${location.href}`);
function detectAngular(win) {
    const isAngular = (0, shared_utils_1.appIsAngular)();
    const isSupportedAngularVersion = (0, shared_utils_1.appIsSupportedAngularVersion)();
    const isDebugMode = (0, shared_utils_1.appIsAngularInDevMode)();
    const isIvy = (0, shared_utils_1.appIsAngularIvy)();
    const detection = {
        isIvy,
        isAngular,
        isDebugMode,
        isSupportedAngularVersion,
        isAngularDevTools: true,
    };
    // For the background script to toggle the icon.
    win.postMessage(detection, '*');
    // For the content script to inject the backend.
    detectAngularMessageBus.emit('detectAngular', [
        {
            isIvy,
            isAngular,
            isDebugMode,
            isSupportedAngularVersion,
            isAngularDevTools: true,
        },
    ]);
    setTimeout(() => detectAngular(win), 1000);
}
detectAngular(window);
