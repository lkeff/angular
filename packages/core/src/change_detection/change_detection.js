"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultKeyValueDiffers = exports.defaultIterableDiffers = exports.KeyValueDiffers = exports.IterableDiffers = exports.DefaultKeyValueDifferFactory = exports.DefaultIterableDifferFactory = exports.DefaultIterableDiffer = exports.ChangeDetectionStrategy = exports.ChangeDetectorRef = exports.devModeEqual = exports.SimpleChange = void 0;
const default_iterable_differ_1 = require("./differs/default_iterable_differ");
const default_keyvalue_differ_1 = require("./differs/default_keyvalue_differ");
const iterable_differs_1 = require("./differs/iterable_differs");
const keyvalue_differs_1 = require("./differs/keyvalue_differs");
var simple_change_1 = require("../interface/simple_change");
Object.defineProperty(exports, "SimpleChange", { enumerable: true, get: function () { return simple_change_1.SimpleChange; } });
var comparison_1 = require("../util/comparison");
Object.defineProperty(exports, "devModeEqual", { enumerable: true, get: function () { return comparison_1.devModeEqual; } });
var change_detector_ref_1 = require("./change_detector_ref");
Object.defineProperty(exports, "ChangeDetectorRef", { enumerable: true, get: function () { return change_detector_ref_1.ChangeDetectorRef; } });
var constants_1 = require("./constants");
Object.defineProperty(exports, "ChangeDetectionStrategy", { enumerable: true, get: function () { return constants_1.ChangeDetectionStrategy; } });
var default_iterable_differ_2 = require("./differs/default_iterable_differ");
Object.defineProperty(exports, "DefaultIterableDiffer", { enumerable: true, get: function () { return default_iterable_differ_2.DefaultIterableDiffer; } });
Object.defineProperty(exports, "DefaultIterableDifferFactory", { enumerable: true, get: function () { return default_iterable_differ_2.DefaultIterableDifferFactory; } });
var default_keyvalue_differ_2 = require("./differs/default_keyvalue_differ");
Object.defineProperty(exports, "DefaultKeyValueDifferFactory", { enumerable: true, get: function () { return default_keyvalue_differ_2.DefaultKeyValueDifferFactory; } });
var iterable_differs_2 = require("./differs/iterable_differs");
Object.defineProperty(exports, "IterableDiffers", { enumerable: true, get: function () { return iterable_differs_2.IterableDiffers; } });
var keyvalue_differs_2 = require("./differs/keyvalue_differs");
Object.defineProperty(exports, "KeyValueDiffers", { enumerable: true, get: function () { return keyvalue_differs_2.KeyValueDiffers; } });
/**
 * Structural diffing for `Object`s and `Map`s.
 */
const keyValDiff = [new default_keyvalue_differ_1.DefaultKeyValueDifferFactory()];
/**
 * Structural diffing for `Iterable` types such as `Array`s.
 */
const iterableDiff = [new default_iterable_differ_1.DefaultIterableDifferFactory()];
exports.defaultIterableDiffers = new iterable_differs_1.IterableDiffers(iterableDiff);
exports.defaultKeyValueDiffers = new keyvalue_differs_1.KeyValueDiffers(keyValDiff);
