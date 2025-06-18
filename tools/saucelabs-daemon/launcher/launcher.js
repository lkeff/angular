"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaucelabsLauncher = SaucelabsLauncher;
const net_1 = require("net");
const browser_1 = require("../browser");
const ipc_defaults_1 = require("../ipc-defaults");
const ipc_messages_1 = require("../ipc-messages");
function SaucelabsLauncher(args, config, logger, baseLauncherDecorator, captureTimeoutLauncherDecorator, retryLauncherDecorator) {
    var _a;
    // Apply base class mixins. This would be nice to have typed, but this is a low-priority now.
    baseLauncherDecorator(this);
    captureTimeoutLauncherDecorator(this);
    retryLauncherDecorator(this);
    const log = logger.create('SaucelabsLauncher');
    const browserDisplayName = args.browserName +
        (args.browserVersion ? ' ' + args.browserVersion : '') +
        (args.platformName ? ' (' + args.platformName + ')' : '');
    const testSuiteDescription = (_a = process.env['TEST_TARGET']) !== null && _a !== void 0 ? _a : '<unknown>';
    let daemonConnection = null;
    // Setup Browser name that will be printed out by Karma.
    this.name = browserDisplayName + ' on SauceLabs (daemon)';
    this.on('start', (pageUrl) => {
        daemonConnection = (0, net_1.createConnection)({ port: ipc_defaults_1.IPC_PORT }, () => _startBrowserTest(pageUrl, args));
        daemonConnection.on('data', (b) => _processMessage(JSON.parse(b.toString())));
        daemonConnection.on('error', (err) => {
            log.error(err);
            // Notify karma about the failure.
            this._done('failure');
        });
    });
    this.on('kill', (doneFn) => __awaiter(this, void 0, void 0, function* () {
        _endBrowserTest();
        daemonConnection === null || daemonConnection === void 0 ? void 0 : daemonConnection.end();
        doneFn();
    }));
    const _processMessage = (message) => {
        switch (message.type) {
            case 'browser-not-ready':
                log.error('Browser %s is not ready in the Saucelabs background service.', browserDisplayName);
                this._done('failure');
        }
    };
    const _startBrowserTest = (pageUrl, browser) => {
        log.info('Starting browser %s test in daemon with URL: %s', browserDisplayName, pageUrl);
        daemonConnection.write(JSON.stringify(new ipc_messages_1.StartTestMessage(pageUrl, (0, browser_1.getUniqueId)(browser), testSuiteDescription)));
    };
    const _endBrowserTest = () => {
        log.info('Test for browser %s completed', browserDisplayName);
        daemonConnection.write(JSON.stringify(new ipc_messages_1.EndTestMessage()));
    };
}
