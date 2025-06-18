"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchSource = exports.MetaKind = void 0;
/**
 * Disambiguates different kinds of compiler metadata objects.
 */
var MetaKind;
(function (MetaKind) {
    MetaKind[MetaKind["Directive"] = 0] = "Directive";
    MetaKind[MetaKind["Pipe"] = 1] = "Pipe";
    MetaKind[MetaKind["NgModule"] = 2] = "NgModule";
})(MetaKind || (exports.MetaKind = MetaKind = {}));
/**
 * Possible ways that a directive can be matched.
 */
var MatchSource;
(function (MatchSource) {
    /** The directive was matched by its selector. */
    MatchSource[MatchSource["Selector"] = 0] = "Selector";
    /** The directive was applied as a host directive. */
    MatchSource[MatchSource["HostDirective"] = 1] = "HostDirective";
})(MatchSource || (exports.MatchSource = MatchSource = {}));
