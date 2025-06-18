"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ɵNoopNgZone = exports.NgZone = void 0;
// Public API for Zone
var ng_zone_1 = require("./zone/ng_zone");
Object.defineProperty(exports, "NgZone", { enumerable: true, get: function () { return ng_zone_1.NgZone; } });
Object.defineProperty(exports, "\u0275NoopNgZone", { enumerable: true, get: function () { return ng_zone_1.NoopNgZone; } });
