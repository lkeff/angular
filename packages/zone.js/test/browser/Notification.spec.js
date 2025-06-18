"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../lib/common/utils");
const test_util_1 = require("../test-util");
function notificationSupport() {
    const desc = window['Notification'] &&
        Object.getOwnPropertyDescriptor(window['Notification'].prototype, 'onerror');
    return window['Notification'] && window['Notification'].prototype && desc && desc.configurable;
}
notificationSupport.message = 'Notification Support';
describe('Notification API', (0, test_util_1.ifEnvSupports)(notificationSupport, function () {
    it('Notification API should be patched by Zone', () => {
        const Notification = window['Notification'];
        expect(Notification.prototype[(0, utils_1.zoneSymbol)('addEventListener')]).toBeTruthy();
    });
}));
