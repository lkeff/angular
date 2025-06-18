"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("zone.js/lib/node/rollup-main");
require("./zone_base_setup");
global.isNode = true;
global.isBrowser = false;
require("@angular/compiler"); // For JIT mode. Must be in front of any other @angular/* imports.
// Init TestBed
const testing_1 = require("@angular/core/testing");
const server_1 = require("@angular/platform-server/testing/src/server");
const domino_adapter_1 = require("@angular/platform-server/src/domino_adapter");
const bundled_domino_1 = __importDefault(require("../../packages/platform-server/src/bundled-domino"));
testing_1.TestBed.initTestEnvironment(server_1.ServerTestingModule, (0, server_1.platformServerTesting)());
domino_adapter_1.DominoAdapter.makeCurrent();
global.document =
    domino_adapter_1.DominoAdapter.defaultDoc ||
        (domino_adapter_1.DominoAdapter.defaultDoc = bundled_domino_1.default.createDocument());
