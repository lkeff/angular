"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowFlags = void 0;
/** @internal */
var FlowFlags;
(function (FlowFlags) {
    FlowFlags[FlowFlags["Unreachable"] = 1] = "Unreachable";
    FlowFlags[FlowFlags["Start"] = 2] = "Start";
    FlowFlags[FlowFlags["BranchLabel"] = 4] = "BranchLabel";
    FlowFlags[FlowFlags["LoopLabel"] = 8] = "LoopLabel";
    FlowFlags[FlowFlags["Assignment"] = 16] = "Assignment";
    FlowFlags[FlowFlags["TrueCondition"] = 32] = "TrueCondition";
    FlowFlags[FlowFlags["FalseCondition"] = 64] = "FalseCondition";
    FlowFlags[FlowFlags["SwitchClause"] = 128] = "SwitchClause";
    FlowFlags[FlowFlags["ArrayMutation"] = 256] = "ArrayMutation";
    FlowFlags[FlowFlags["Call"] = 512] = "Call";
    FlowFlags[FlowFlags["ReduceLabel"] = 1024] = "ReduceLabel";
    FlowFlags[FlowFlags["Referenced"] = 2048] = "Referenced";
    FlowFlags[FlowFlags["Shared"] = 4096] = "Shared";
    FlowFlags[FlowFlags["Label"] = 12] = "Label";
    FlowFlags[FlowFlags["Condition"] = 96] = "Condition";
})(FlowFlags || (exports.FlowFlags = FlowFlags = {}));
