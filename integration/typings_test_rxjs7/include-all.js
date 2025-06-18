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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const animations = __importStar(require("@angular/animations"));
const animationsBrowser = __importStar(require("@angular/animations/browser"));
const animationsBrowserTesting = __importStar(require("@angular/animations/browser/testing"));
const common = __importStar(require("@angular/common"));
const commonHttp = __importStar(require("@angular/common/http"));
const commonTesting = __importStar(require("@angular/common/testing"));
const commonHttpTesting = __importStar(require("@angular/common/http/testing"));
const compiler = __importStar(require("@angular/compiler"));
const core = __importStar(require("@angular/core"));
const coreTesting = __importStar(require("@angular/core/testing"));
const elements = __importStar(require("@angular/elements"));
const forms = __importStar(require("@angular/forms"));
const platformBrowser = __importStar(require("@angular/platform-browser"));
const platformBrowserDynamic = __importStar(require("@angular/platform-browser-dynamic"));
const platformBrowserDynamicTesting = __importStar(require("@angular/platform-browser-dynamic/testing"));
const platformBrowserAnimations = __importStar(require("@angular/platform-browser/animations"));
const platformBrowserTesting = __importStar(require("@angular/platform-browser/testing"));
const platformServer = __importStar(require("@angular/platform-server"));
const platformServerInit = __importStar(require("@angular/platform-server/init"));
const platformServerTesting = __importStar(require("@angular/platform-server/testing"));
const router = __importStar(require("@angular/router"));
const routerTesting = __importStar(require("@angular/router/testing"));
const routerUpgrade = __importStar(require("@angular/router/upgrade"));
const serviceWorker = __importStar(require("@angular/service-worker"));
const upgrade = __importStar(require("@angular/upgrade"));
const upgradeStatic = __importStar(require("@angular/upgrade/static"));
const upgradeTesting = __importStar(require("@angular/upgrade/static/testing"));
exports.default = {
    animations,
    animationsBrowser,
    animationsBrowserTesting,
    common,
    commonTesting,
    commonHttp,
    commonHttpTesting,
    compiler,
    core,
    coreTesting,
    elements,
    forms,
    platformBrowser,
    platformBrowserTesting,
    platformBrowserDynamic,
    platformBrowserDynamicTesting,
    platformBrowserAnimations,
    platformServer,
    platformServerInit,
    platformServerTesting,
    router,
    routerTesting,
    routerUpgrade,
    serviceWorker,
    upgrade,
    upgradeStatic,
    upgradeTesting,
};
