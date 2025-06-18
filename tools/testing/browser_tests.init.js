"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
require("zone.js/lib/browser/rollup-main");
require("./zone_base_setup");
require("@angular/compiler"); // For JIT mode. Must be in front of any other @angular/* imports.
const testing_1 = require("@angular/core/testing");
const testing_2 = require("@angular/platform-browser/testing");
const animations_1 = require("@angular/platform-browser/animations");
testing_1.TestBed.initTestEnvironment([testing_2.BrowserTestingModule, animations_1.NoopAnimationsModule], (0, testing_2.platformBrowserTesting)());
window.isNode = false;
window.isBrowser = true;
window.global = window;
