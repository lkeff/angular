"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompilerConfig = void 0;
exports.preserveWhitespacesDefault = preserveWhitespacesDefault;
const core_1 = require("./core");
const util_1 = require("./util");
class CompilerConfig {
    constructor({ defaultEncapsulation = core_1.ViewEncapsulation.Emulated, preserveWhitespaces, strictInjectionParameters, } = {}) {
        this.defaultEncapsulation = defaultEncapsulation;
        this.preserveWhitespaces = preserveWhitespacesDefault((0, util_1.noUndefined)(preserveWhitespaces));
        this.strictInjectionParameters = strictInjectionParameters === true;
    }
}
exports.CompilerConfig = CompilerConfig;
function preserveWhitespacesDefault(preserveWhitespacesOption, defaultSetting = false) {
    return preserveWhitespacesOption === null ? defaultSetting : preserveWhitespacesOption;
}
