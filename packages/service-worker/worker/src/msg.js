"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMsgCheckForUpdates = isMsgCheckForUpdates;
exports.isMsgActivateUpdate = isMsgActivateUpdate;
exports.isMsgCheckVersion = isMsgCheckVersion;
function isMsgCheckForUpdates(msg) {
    return msg.action === 'CHECK_FOR_UPDATES';
}
function isMsgActivateUpdate(msg) {
    return msg.action === 'ACTIVATE_UPDATE';
}
function isMsgCheckVersion(msg) {
    return msg.action === 'CHECK_VERSION';
}
