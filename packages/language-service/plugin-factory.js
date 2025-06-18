"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.factory = void 0;
const factory = (tsModule) => {
    let plugin;
    return {
        create(info) {
            plugin = require(`./bundles/language-service.js`)(tsModule);
            return plugin.create(info);
        },
        getExternalFiles(project) {
            var _a, _b;
            return (_b = (_a = plugin === null || plugin === void 0 ? void 0 : plugin.getExternalFiles) === null || _a === void 0 ? void 0 : _a.call(plugin, project, tsModule.typescript.ProgramUpdateLevel.Full)) !== null && _b !== void 0 ? _b : [];
        },
        onConfigurationChanged(config) {
            var _a;
            (_a = plugin === null || plugin === void 0 ? void 0 : plugin.onConfigurationChanged) === null || _a === void 0 ? void 0 : _a.call(plugin, config);
        },
    };
};
exports.factory = factory;
