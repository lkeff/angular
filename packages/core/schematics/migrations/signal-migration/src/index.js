"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessageForFieldIncompatibility = exports.getMessageForClassIncompatibility = exports.nonIgnorableFieldIncompatibilities = exports.ClassIncompatibilityReason = exports.FieldIncompatibilityReason = exports.SignalInputMigration = exports.isInputDescriptor = exports.getInputDescriptor = exports.isInputContainerNode = exports.KnownInputs = void 0;
var known_inputs_1 = require("./input_detection/known_inputs");
Object.defineProperty(exports, "KnownInputs", { enumerable: true, get: function () { return known_inputs_1.KnownInputs; } });
var input_node_1 = require("./input_detection/input_node");
Object.defineProperty(exports, "isInputContainerNode", { enumerable: true, get: function () { return input_node_1.isInputContainerNode; } });
var input_id_1 = require("./utils/input_id");
Object.defineProperty(exports, "getInputDescriptor", { enumerable: true, get: function () { return input_id_1.getInputDescriptor; } });
Object.defineProperty(exports, "isInputDescriptor", { enumerable: true, get: function () { return input_id_1.isInputDescriptor; } });
var migration_1 = require("./migration");
Object.defineProperty(exports, "SignalInputMigration", { enumerable: true, get: function () { return migration_1.SignalInputMigration; } });
var incompatibility_1 = require("./passes/problematic_patterns/incompatibility");
Object.defineProperty(exports, "FieldIncompatibilityReason", { enumerable: true, get: function () { return incompatibility_1.FieldIncompatibilityReason; } });
Object.defineProperty(exports, "ClassIncompatibilityReason", { enumerable: true, get: function () { return incompatibility_1.ClassIncompatibilityReason; } });
Object.defineProperty(exports, "nonIgnorableFieldIncompatibilities", { enumerable: true, get: function () { return incompatibility_1.nonIgnorableFieldIncompatibilities; } });
var incompatibility_human_1 = require("./passes/problematic_patterns/incompatibility_human");
Object.defineProperty(exports, "getMessageForClassIncompatibility", { enumerable: true, get: function () { return incompatibility_human_1.getMessageForClassIncompatibility; } });
Object.defineProperty(exports, "getMessageForFieldIncompatibility", { enumerable: true, get: function () { return incompatibility_human_1.getMessageForFieldIncompatibility; } });
