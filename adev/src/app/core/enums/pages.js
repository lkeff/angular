"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultPage = exports.PagePrefix = void 0;
// File contains the enums used across whole application.
// The enum with the prefixes of the main routes
var PagePrefix;
(function (PagePrefix) {
    PagePrefix["API"] = "api";
    PagePrefix["CLI"] = "cli";
    PagePrefix["DOCS"] = "docs";
    PagePrefix["HOME"] = "";
    PagePrefix["PLAYGROUND"] = "playground";
    PagePrefix["REFERENCE"] = "reference";
    PagePrefix["TUTORIALS"] = "tutorials";
    PagePrefix["UPDATE"] = "update-guide";
})(PagePrefix || (exports.PagePrefix = PagePrefix = {}));
// The enum with the default pages for each main tab
var DefaultPage;
(function (DefaultPage) {
    DefaultPage["DOCS"] = "overview";
    DefaultPage["REFERENCE"] = "api";
    DefaultPage["TUTORIALS"] = "tutorials";
    DefaultPage["PLAYGROUND"] = "playground";
    DefaultPage["UPDATE"] = "update-guide";
})(DefaultPage || (exports.DefaultPage = DefaultPage = {}));
