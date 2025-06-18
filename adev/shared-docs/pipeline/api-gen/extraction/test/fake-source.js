"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VERSION = exports.UserProfile = void 0;
// @ts-ignore Intentionally nonexistent path for testing purposes.
const dummy_package_1 = require("@angular/dummy-package");
/**
 * I have a description with some `Code`.
 */
class UserProfile {
    constructor() {
        /** The user's name */
        this.name = 'Morgan';
    }
}
exports.UserProfile = UserProfile;
// By using an implicit type coming from a path-mapped import,
// we test that the extractor can correctly resolve type information
// from other packages.
exports.VERSION = new dummy_package_1.Version('789def');
