"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpgradeModule = exports.UpgradeComponent = exports.downgradeModule = exports.VERSION = exports.downgradeInjectable = exports.downgradeComponent = exports.setAngularLib = exports.setAngularJSGlobal = exports.getAngularLib = exports.getAngularJSGlobal = void 0;
var angular1_1 = require("../src/common/src/angular1");
Object.defineProperty(exports, "getAngularJSGlobal", { enumerable: true, get: function () { return angular1_1.getAngularJSGlobal; } });
Object.defineProperty(exports, "getAngularLib", { enumerable: true, get: function () { return angular1_1.getAngularLib; } });
Object.defineProperty(exports, "setAngularJSGlobal", { enumerable: true, get: function () { return angular1_1.setAngularJSGlobal; } });
Object.defineProperty(exports, "setAngularLib", { enumerable: true, get: function () { return angular1_1.setAngularLib; } });
var downgrade_component_1 = require("../src/common/src/downgrade_component");
Object.defineProperty(exports, "downgradeComponent", { enumerable: true, get: function () { return downgrade_component_1.downgradeComponent; } });
var downgrade_injectable_1 = require("../src/common/src/downgrade_injectable");
Object.defineProperty(exports, "downgradeInjectable", { enumerable: true, get: function () { return downgrade_injectable_1.downgradeInjectable; } });
var version_1 = require("../src/common/src/version");
Object.defineProperty(exports, "VERSION", { enumerable: true, get: function () { return version_1.VERSION; } });
var downgrade_module_1 = require("./src/downgrade_module");
Object.defineProperty(exports, "downgradeModule", { enumerable: true, get: function () { return downgrade_module_1.downgradeModule; } });
var upgrade_component_1 = require("./src/upgrade_component");
Object.defineProperty(exports, "UpgradeComponent", { enumerable: true, get: function () { return upgrade_component_1.UpgradeComponent; } });
var upgrade_module_1 = require("./src/upgrade_module");
Object.defineProperty(exports, "UpgradeModule", { enumerable: true, get: function () { return upgrade_module_1.UpgradeModule; } });
__exportStar(require("./common"), exports);
// This file only re-exports items to appear in the public api. Keep it that way.
