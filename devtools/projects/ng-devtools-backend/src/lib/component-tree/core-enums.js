"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Framework = exports.AcxChangeDetectionStrategy = exports.ChangeDetectionStrategy = void 0;
// Need to be kept in sync with Angular framework
// We can't directly import it from framework now
// because this also pulls up the security policies
// for Trusted Types, which we reinstantiate.
var ChangeDetectionStrategy;
(function (ChangeDetectionStrategy) {
    ChangeDetectionStrategy[ChangeDetectionStrategy["OnPush"] = 0] = "OnPush";
    ChangeDetectionStrategy[ChangeDetectionStrategy["Default"] = 1] = "Default";
})(ChangeDetectionStrategy || (exports.ChangeDetectionStrategy = ChangeDetectionStrategy = {}));
var AcxChangeDetectionStrategy;
(function (AcxChangeDetectionStrategy) {
    AcxChangeDetectionStrategy[AcxChangeDetectionStrategy["Default"] = 0] = "Default";
    AcxChangeDetectionStrategy[AcxChangeDetectionStrategy["OnPush"] = 1] = "OnPush";
})(AcxChangeDetectionStrategy || (exports.AcxChangeDetectionStrategy = AcxChangeDetectionStrategy = {}));
var Framework;
(function (Framework) {
    Framework["Angular"] = "angular";
    Framework["ACX"] = "acx";
    Framework["Wiz"] = "wiz";
})(Framework || (exports.Framework = Framework = {}));
