"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebDriverAdapter = void 0;
/**
 * A WebDriverAdapter bridges API differences between different WebDriver clients,
 * e.g. JS vs Dart Async vs Dart Sync webdriver.
 * Needs one implementation for every supported WebDriver client.
 */
class WebDriverAdapter {
    waitFor(callback) {
        throw new Error('NYI');
    }
    executeScript(script) {
        throw new Error('NYI');
    }
    executeAsyncScript(script) {
        throw new Error('NYI');
    }
    capabilities() {
        throw new Error('NYI');
    }
    logs(type) {
        throw new Error('NYI');
    }
}
exports.WebDriverAdapter = WebDriverAdapter;
