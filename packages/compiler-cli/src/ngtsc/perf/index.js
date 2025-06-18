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
exports.DelegatingPerfRecorder = exports.ActivePerfRecorder = exports.NOOP_PERF_RECORDER = void 0;
__exportStar(require("./src/api"), exports);
var noop_1 = require("./src/noop");
Object.defineProperty(exports, "NOOP_PERF_RECORDER", { enumerable: true, get: function () { return noop_1.NOOP_PERF_RECORDER; } });
var recorder_1 = require("./src/recorder");
Object.defineProperty(exports, "ActivePerfRecorder", { enumerable: true, get: function () { return recorder_1.ActivePerfRecorder; } });
Object.defineProperty(exports, "DelegatingPerfRecorder", { enumerable: true, get: function () { return recorder_1.DelegatingPerfRecorder; } });
