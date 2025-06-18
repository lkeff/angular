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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaucelabsDaemon = void 0;
const chalk_1 = __importDefault(require("chalk"));
const selenium_webdriver4_1 = require("selenium-webdriver4");
const browser_1 = require("../browser");
const sauce_connect_tunnel_1 = require("./sauce-connect-tunnel");
const defaultCapabilities = {
    // TODO: Turn off long-term. Right now this is just for debugging.
    recordVideo: true,
    recordScreenshots: false,
    idleTimeout: 1000,
    // These represent the maximum values supported by Saucelabs.
    // See: https://wiki.saucelabs.com/display/DOCS/Test+Configuration+Options
    commandTimeout: 600,
    maxDuration: 10800,
    extendedDebugging: true,
};
/**
 * The SaucelabsDaemon daemon service class. This class handles the logic of connecting
 * to the Saucelabs tunnel and provisioning browsers for tests. Provisioned browsers
 * are re-used for subsequent tests. Their states are tracked so that new test
 * requests are assigned to browsers that are currently `free` or `launching`.
 */
class SaucelabsDaemon {
    constructor(_username, _accessKey, _buildName, _browsers, _maxParallelExecutions, _sauceConnect, _userCapabilities = {}) {
        this._username = _username;
        this._accessKey = _accessKey;
        this._buildName = _buildName;
        this._browsers = _browsers;
        this._maxParallelExecutions = _maxParallelExecutions;
        this._sauceConnect = _sauceConnect;
        this._userCapabilities = _userCapabilities;
        /**
         * Map of browsers and their pending tests. If a browser is acquired on the
         * remote selenium server, the browser is not immediately ready. If the browser
         * becomes active, the pending tests will be started.
         */
        this._pendingTests = new Map();
        /** List of active browsers that are managed by the daemon. */
        this._activeBrowsers = [];
        /** Map that contains test ids with their claimed browser. */
        this._runningTests = new Map();
        /** Id of the keep alive interval that ensures no remote browsers time out. */
        this._keepAliveIntervalId = null;
        /* Promise  indicating whether we the tunnel is active, or if we are still connecting. */
        this._connection = undefined;
        /* Number of parallel executions started */
        this._parallelExecutions = 0;
        // Starts the keep alive loop for all active browsers, running every 15 seconds.
        this._keepAliveIntervalId = setInterval(() => this._keepAliveBrowsers(), 15000);
        /** Base selenium capabilities that will be added to each browser. */
        this._baseCapabilities = Object.assign(Object.assign({}, defaultCapabilities), this._userCapabilities);
    }
    /**
     * Connects the daemon to Saucelabs.
     * This is typically done when the first test is started so that no connection is made
     * if all tests are cache hits.
     */
    connectTunnel() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._connection) {
                this._connection = this._connect();
            }
            return this._connection;
        });
    }
    /**
     * Quits all active browsers.
     */
    quitAllBrowsers() {
        return __awaiter(this, void 0, void 0, function* () {
            let quitBrowsers = [];
            this._activeBrowsers.forEach((b) => {
                if (b.driver) {
                    quitBrowsers.push(b.driver.quit());
                }
            });
            yield Promise.all(quitBrowsers);
            this._activeBrowsers = [];
            this._runningTests.clear();
            this._pendingTests.clear();
        });
    }
    /**
     * Shutdown the daemon.
     *
     * Awaits the shutdown of browsers.
     */
    shutdown() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.quitAllBrowsers();
            if (this._keepAliveIntervalId !== null) {
                clearInterval(this._keepAliveIntervalId);
            }
        });
    }
    /**
     * End a browser test if it is running.
     */
    endTest(testId) {
        if (!this._runningTests.has(testId)) {
            return;
        }
        const browser = this._runningTests.get(testId);
        browser.state = 'free';
        this._runningTests.delete(testId);
    }
    /**
     * Start a test on a remote browser.
     *
     * If the daemon has not yet initiated the saucelabs tunnel creation and browser launching then
     * this initiates that process and awaits until it succeeds or fails.
     *
     * If the daemon has already initiated the saucelabs tunnel creation and browser launching
     * but it is not yet complete then this blocks until that succeeds or fails.
     *
     * If all matching browsers are occupied with other tests then test is not run. Promise returns
     * false.
     *
     * If there is a matching browser that are still launching then the test is scheduled to run
     * on the browser when it is ready. Promise returns true.
     *
     * If there is a matching browser that is available the test it started. Promise returns true.
     */
    startTest(test) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connectTunnel();
            if (this._parallelExecutions < this._maxParallelExecutions) {
                // Start additional browsers on each test start until the max parallel executions are
                // reached to avoid the race condition of starting a browser and then having another test
                // start steal it before is claimed by this test.
                yield this.launchBrowserSet();
            }
            const browser = this._findAvailableBrowser(test.requestedBrowserId);
            if (!browser) {
                console.error(`No available browser ${test.requestedBrowserId} for test ${test.testId}!`);
                return false;
            }
            if (browser.state == 'launching') {
                this._pendingTests.set(browser, test);
            }
            else {
                this._startBrowserTest(browser, test);
            }
            return true;
        });
    }
    /**
     * @internal
     * Connects the daemon to Saucelabs.
     * This is typically done when the first test is started so that no connection is made
     * if all tests are cache hits.
     **/
    _connect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, sauce_connect_tunnel_1.openSauceConnectTunnel)(this._userCapabilities.tunnelIdentifier, this._sauceConnect);
        });
    }
    /**
     * @internal
     * Launches a set of browsers and increments the count of parallel browser started. If there are
     * pending tests waiting for a particular browser to launch before they can start, those tests are
     * started once the browser is launched.
     **/
    launchBrowserSet() {
        return __awaiter(this, void 0, void 0, function* () {
            this._parallelExecutions++;
            console.debug(`Launching browsers set ${this._parallelExecutions} of ${this._maxParallelExecutions}...`);
            // Once the tunnel is established we can launch browsers
            yield Promise.all(this._browsers.map((browser, id) => __awaiter(this, void 0, void 0, function* () {
                const browserId = (0, browser_1.getUniqueId)(browser);
                const launched = {
                    state: 'launching',
                    driver: null,
                    sessionUrl: null,
                    id: browserId,
                };
                const browserDescription = `${this._buildName} - ${browser.browserName} - #${id + 1}`;
                const capabilities = {
                    'browserName': browser.browserName,
                    'sauce:options': Object.assign(Object.assign({}, this._baseCapabilities), browser),
                };
                // Set `sauce:options` to provide a build name for the remote browser instances.
                // This helps with debugging. Also ensures the W3C protocol is used.
                // See. https://wiki.saucelabs.com/display/DOCS/Test+Configuration+Options
                capabilities['sauce:options']['name'] = browserDescription;
                capabilities['sauce:options']['build'] = browserDescription;
                console.debug(`Capabilities for ${browser.browserName}:`, JSON.stringify(capabilities, null, 2));
                console.debug(`  > Browser-ID: `, browserId);
                console.debug(`  > Browser-Description: `, browserDescription);
                // Keep track of the launched browser. We do this before it even completed the
                // launch as we can then handle scheduled tests when the browser is still launching.
                this._activeBrowsers.push(launched);
                // See the following link for public API of the selenium server.
                // https://wiki.saucelabs.com/display/DOCS/Instant+Selenium+Node.js+Tests
                const driver = yield new selenium_webdriver4_1.Builder()
                    .withCapabilities(capabilities)
                    .usingServer(`http://${this._username}:${this._accessKey}@ondemand.saucelabs.com:80/wd/hub`)
                    .build();
                // Only wait 30 seconds to load a test page.
                yield driver.manage().setTimeouts({ pageLoad: 30000 });
                const sessionId = (yield driver.getSession()).getId();
                // Mark the browser as available after launch completion.
                launched.state = 'free';
                launched.driver = driver;
                launched.sessionUrl = `https://saucelabs.com/tests/${sessionId}`;
                console.info(chalk_1.default.yellow(`Started browser ${browser.browserName} on Saucelabs: ${launched.sessionUrl}`));
                // If a test has been scheduled before the browser completed launching, run
                // it now given that the browser is ready now.
                if (this._pendingTests.has(launched)) {
                    const test = this._pendingTests.get(launched);
                    this._pendingTests.delete(launched);
                    this._startBrowserTest(launched, test);
                }
            })));
        });
    }
    /**
     * @internal
     * Starts a browser test on a browser.
     * This sets the browser's state to "claimed" and navigates the browser to the test URL.
     **/
    _startBrowserTest(browser, test) {
        // We're not interested in awaiting on starting the browser test since that would delay
        // starting additional browsers. Failures in browser test starts are silently ignored in
        // the daemon. The karma test itself should fail or timeout if there are issues starting
        // the browser test.
        (() => __awaiter(this, void 0, void 0, function* () {
            this._runningTests.set(test.testId, browser);
            browser.state = 'claimed';
            try {
                console.debug(`Opening test url for #${test.testId}: ${test.pageUrl}`);
                console.debug(`  > Instance URL: ${browser.sessionUrl}`);
                yield browser.driver.get(test.pageUrl);
                const pageTitle = yield browser.driver.getTitle();
                console.debug(`Test page loaded for #${test.testId}: "${pageTitle}".`);
            }
            catch (e) {
                console.error('Could not start browser test with id', test.testId, test.pageUrl);
            }
        }))();
    }
    /**
     * @internal
     * Given a browserId, returns a browser that matches the browserId and is free
     * or launching with no pending test. If no such browser if found, returns
     * null.
     **/
    _findAvailableBrowser(browserId) {
        for (const browser of this._activeBrowsers) {
            // If the browser ID doesn't match, continue searching.
            if (browser.id !== browserId) {
                continue;
            }
            // If the browser is claimed, continue searching.
            if (browser.state === 'claimed') {
                continue;
            }
            // If the browser is launching, check if it can be pre-claimed so that
            // the test starts once the browser is ready. If it's already claimed,
            // continue searching.
            if (browser.state === 'launching' && this._pendingTests.has(browser)) {
                continue;
            }
            return browser;
        }
        return null;
    }
    /**
     * @internal
     * Implements a heartbeat for Saucelabs browsers as they could end up not receiving any
     * commands when the daemon is unused (i.e. Bazel takes a while to start tests).
     * https://saucelabs.com/blog/selenium-tips-how-to-coordinate-multiple-browsers-in-sauce-ondemand.
     **/
    _keepAliveBrowsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const pendingCommands = [];
            this._activeBrowsers.forEach((b) => {
                if (b.driver !== null) {
                    pendingCommands.push(b.driver.getTitle());
                }
            });
            yield Promise.all(pendingCommands);
            console.debug(`${Date().toLocaleString()}: Refreshed ${pendingCommands.length} browsers (pid ${process.pid}).`);
        });
    }
}
exports.SaucelabsDaemon = SaucelabsDaemon;
