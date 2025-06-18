"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEVTOOL_ROUTES = void 0;
const devtools_app_component_1 = require("./devtools-app.component");
const frame_manager_1 = require("../../../projects/ng-devtools/src/lib/application-services/frame_manager");
const protocol_1 = require("protocol");
const iframe_message_bus_1 = require("../../iframe-message-bus");
exports.DEVTOOL_ROUTES = [
    {
        path: '',
        component: devtools_app_component_1.AppDevToolsComponent,
        pathMatch: 'full',
        providers: [
            {
                provide: protocol_1.MessageBus,
                useFactory() {
                    return new protocol_1.PriorityAwareMessageBus(new iframe_message_bus_1.IFrameMessageBus('angular-devtools', 'angular-devtools-backend', () => document.querySelector('#sample-app').contentWindow));
                },
            },
            { provide: frame_manager_1.FrameManager, useFactory: () => frame_manager_1.FrameManager.initialize(null) },
        ],
    },
];
