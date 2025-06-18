"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeleniumWebDriverAdapter = void 0;
const web_driver_adapter_1 = require("../web_driver_adapter");
/**
 * Adapter for the selenium-webdriver.
 */
class SeleniumWebDriverAdapter extends web_driver_adapter_1.WebDriverAdapter {
    constructor(_driver) {
        super();
        this._driver = _driver;
    }
    waitFor(callback) {
        return this._driver.call(callback);
    }
    executeScript(script) {
        return this._driver.executeScript(script);
    }
    executeAsyncScript(script) {
        return this._driver.executeAsyncScript(script);
    }
    capabilities() {
        return this._driver.getCapabilities().then((capsObject) => {
            const localData = {};
            for (const key of Array.from(capsObject.keys())) {
                localData[key] = capsObject.get(key);
            }
            return localData;
        });
    }
    logs(type) {
        // Needed as selenium-webdriver does not forward
        // performance logs in the correct way via manage().logs
        return this._driver.schedule(new Command('getLog').setParameter('type', type), 'WebDriver.manage().logs().get(' + type + ')');
    }
}
exports.SeleniumWebDriverAdapter = SeleniumWebDriverAdapter;
SeleniumWebDriverAdapter.PROTRACTOR_PROVIDERS = [
    {
        provide: web_driver_adapter_1.WebDriverAdapter,
        useFactory: () => new SeleniumWebDriverAdapter(global.browser),
        deps: [],
    },
];
/**
 * Copy of the `Command` class of webdriver as
 * it is not exposed via index.js in selenium-webdriver.
 */
class Command {
    constructor(name_) {
        this.name_ = name_;
        this.parameters_ = {};
    }
    getName() {
        return this.name_;
    }
    setParameter(name, value) {
        this.parameters_[name] = value;
        return this;
    }
    setParameters(parameters) {
        this.parameters_ = parameters;
        return this;
    }
    getParameter(key) {
        return this.parameters_[key];
    }
    getParameters() {
        return this.parameters_;
    }
}
