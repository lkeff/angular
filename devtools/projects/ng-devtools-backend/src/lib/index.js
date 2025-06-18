"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeMessageBus = void 0;
const client_event_subscribers_1 = require("./client-event-subscribers");
const initializeMessageBus = (messageBus) => {
    (0, client_event_subscribers_1.subscribeToClientEvents)(messageBus);
};
exports.initializeMessageBus = initializeMessageBus;
