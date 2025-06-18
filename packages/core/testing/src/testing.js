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
exports.DeferBlockFixture = exports.DeferBlockState = exports.DeferBlockBehavior = exports.ɵMetadataOverrider = exports.ComponentFixtureNoNgZone = exports.ComponentFixtureAutoDetect = exports.TestComponentRenderer = exports.withModule = exports.InjectSetupWrapper = exports.inject = exports.getTestBed = exports.TestBed = exports.tick = exports.flushMicrotasks = exports.flush = exports.fakeAsync = exports.discardPeriodicTasks = exports.resetFakeAsyncZone = exports.ComponentFixture = void 0;
/**
 * @module
 * @description
 * Entry point for all public APIs of the core/testing package.
 */
__exportStar(require("./async"), exports);
var component_fixture_1 = require("./component_fixture");
Object.defineProperty(exports, "ComponentFixture", { enumerable: true, get: function () { return component_fixture_1.ComponentFixture; } });
var fake_async_1 = require("./fake_async");
Object.defineProperty(exports, "resetFakeAsyncZone", { enumerable: true, get: function () { return fake_async_1.resetFakeAsyncZone; } });
Object.defineProperty(exports, "discardPeriodicTasks", { enumerable: true, get: function () { return fake_async_1.discardPeriodicTasks; } });
Object.defineProperty(exports, "fakeAsync", { enumerable: true, get: function () { return fake_async_1.fakeAsync; } });
Object.defineProperty(exports, "flush", { enumerable: true, get: function () { return fake_async_1.flush; } });
Object.defineProperty(exports, "flushMicrotasks", { enumerable: true, get: function () { return fake_async_1.flushMicrotasks; } });
Object.defineProperty(exports, "tick", { enumerable: true, get: function () { return fake_async_1.tick; } });
var test_bed_1 = require("./test_bed");
Object.defineProperty(exports, "TestBed", { enumerable: true, get: function () { return test_bed_1.TestBed; } });
Object.defineProperty(exports, "getTestBed", { enumerable: true, get: function () { return test_bed_1.getTestBed; } });
Object.defineProperty(exports, "inject", { enumerable: true, get: function () { return test_bed_1.inject; } });
Object.defineProperty(exports, "InjectSetupWrapper", { enumerable: true, get: function () { return test_bed_1.InjectSetupWrapper; } });
Object.defineProperty(exports, "withModule", { enumerable: true, get: function () { return test_bed_1.withModule; } });
var test_bed_common_1 = require("./test_bed_common");
Object.defineProperty(exports, "TestComponentRenderer", { enumerable: true, get: function () { return test_bed_common_1.TestComponentRenderer; } });
Object.defineProperty(exports, "ComponentFixtureAutoDetect", { enumerable: true, get: function () { return test_bed_common_1.ComponentFixtureAutoDetect; } });
Object.defineProperty(exports, "ComponentFixtureNoNgZone", { enumerable: true, get: function () { return test_bed_common_1.ComponentFixtureNoNgZone; } });
__exportStar(require("./metadata_override"), exports);
var metadata_overrider_1 = require("./metadata_overrider");
Object.defineProperty(exports, "\u0275MetadataOverrider", { enumerable: true, get: function () { return metadata_overrider_1.MetadataOverrider; } });
var core_1 = require("../../src/core");
Object.defineProperty(exports, "DeferBlockBehavior", { enumerable: true, get: function () { return core_1.ɵDeferBlockBehavior; } });
Object.defineProperty(exports, "DeferBlockState", { enumerable: true, get: function () { return core_1.ɵDeferBlockState; } });
var defer_1 = require("./defer");
Object.defineProperty(exports, "DeferBlockFixture", { enumerable: true, get: function () { return defer_1.DeferBlockFixture; } });
