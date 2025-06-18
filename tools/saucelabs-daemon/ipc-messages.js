"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalErrorMessage = exports.NoAvailableBrowserMessage = exports.EndTestMessage = exports.StartTestMessage = void 0;
/** Message that can be sent to the daemon to start a given test. */
class StartTestMessage {
    constructor(url, browserId, testDescription) {
        this.url = url;
        this.browserId = browserId;
        this.testDescription = testDescription;
        this.type = 'start-test';
    }
}
exports.StartTestMessage = StartTestMessage;
/** Message that can be sent to the daemon if a test completed. */
class EndTestMessage {
    constructor() {
        this.type = 'end-test';
    }
}
exports.EndTestMessage = EndTestMessage;
/** Message being sent from the daemon if a request browser is not available. */
class NoAvailableBrowserMessage {
    constructor() {
        this.type = 'browser-not-ready';
    }
}
exports.NoAvailableBrowserMessage = NoAvailableBrowserMessage;
/** Message that indicates an internal error in background service. */
class InternalErrorMessage {
    constructor(msg) {
        this.msg = msg;
        this.type = 'internal-error';
    }
}
exports.InternalErrorMessage = InternalErrorMessage;
