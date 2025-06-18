"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChromeApplicationEnvironment = void 0;
const ng_devtools_1 = require("ng-devtools");
const environment_1 = require("../environments/environment");
class ChromeApplicationEnvironment extends ng_devtools_1.ApplicationEnvironment {
    constructor() {
        super(...arguments);
        this.frameSelectorEnabled = true;
    }
    get environment() {
        return environment_1.environment;
    }
}
exports.ChromeApplicationEnvironment = ChromeApplicationEnvironment;
