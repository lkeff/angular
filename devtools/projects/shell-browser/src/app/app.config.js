"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
const core_1 = require("@angular/core");
const animations_1 = require("@angular/platform-browser/animations");
const ng_devtools_1 = require("ng-devtools");
const chrome_application_environment_1 = require("./chrome-application-environment");
const chrome_application_operations_1 = require("./chrome-application-operations");
const zone_aware_chrome_message_bus_1 = require("./zone-aware-chrome-message-bus");
const protocol_1 = require("protocol");
const frame_manager_1 = require("../../../ng-devtools/src/lib/application-services/frame_manager");
const platform_1 = require("@angular/cdk/platform");
exports.appConfig = {
    providers: [
        (0, animations_1.provideAnimations)(),
        { provide: frame_manager_1.FrameManager, useFactory: () => frame_manager_1.FrameManager.initialize() },
        {
            provide: ng_devtools_1.ApplicationOperations,
            useClass: chrome_application_operations_1.ChromeApplicationOperations,
            deps: [platform_1.Platform],
        },
        {
            provide: ng_devtools_1.ApplicationEnvironment,
            useClass: chrome_application_environment_1.ChromeApplicationEnvironment,
        },
        {
            provide: protocol_1.MessageBus,
            useFactory() {
                const ngZone = (0, core_1.inject)(core_1.NgZone);
                const port = chrome.runtime.connect({
                    name: '' + chrome.devtools.inspectedWindow.tabId,
                });
                return new protocol_1.PriorityAwareMessageBus(new zone_aware_chrome_message_bus_1.ZoneAwareChromeMessageBus(port, ngZone));
            },
        },
    ],
};
