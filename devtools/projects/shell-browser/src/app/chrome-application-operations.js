"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChromeApplicationOperations = void 0;
/// <reference types="chrome"/>
const platform_1 = require("@angular/cdk/platform");
const core_1 = require("@angular/core");
const ng_devtools_1 = require("ng-devtools");
class ChromeApplicationOperations extends ng_devtools_1.ApplicationOperations {
    constructor() {
        super(...arguments);
        this.platform = (0, core_1.inject)(platform_1.Platform);
    }
    runInInspectedWindow(script, target) {
        var _a;
        if (this.platform.FIREFOX && target.id !== ng_devtools_1.TOP_LEVEL_FRAME_ID) {
            console.error('[Angular DevTools]: This browser does not support targeting a specific frame for eval by URL.');
            return;
        }
        else if (this.platform.FIREFOX) {
            chrome.devtools.inspectedWindow.eval(script);
            return;
        }
        const frameURL = target.url;
        chrome.devtools.inspectedWindow.eval(script, { frameURL: (_a = frameURL === null || frameURL === void 0 ? void 0 : frameURL.toString) === null || _a === void 0 ? void 0 : _a.call(frameURL) });
    }
    viewSource(position, target, directiveIndex) {
        const viewSource = `inspect(inspectedApplication.findConstructorByPosition('${position}', ${directiveIndex}))`;
        this.runInInspectedWindow(viewSource, target);
    }
    selectDomElement(position, target) {
        const selectDomElement = `inspect(inspectedApplication.findDomElementByPosition('${position}'))`;
        this.runInInspectedWindow(selectDomElement, target);
    }
    inspect(directivePosition, objectPath, target) {
        const args = {
            directivePosition,
            objectPath,
        };
        const inspect = `inspect(inspectedApplication.findPropertyByPosition('${JSON.stringify(args)}'))`;
        this.runInInspectedWindow(inspect, target);
    }
}
exports.ChromeApplicationOperations = ChromeApplicationOperations;
