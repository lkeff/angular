"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberTags = exports.DecoratorType = exports.MemberType = exports.EntryType = void 0;
exports.isDocEntryWithSourceInfo = isDocEntryWithSourceInfo;
/** Type of top-level documentation entry. */
var EntryType;
(function (EntryType) {
    EntryType["Block"] = "block";
    EntryType["Component"] = "component";
    EntryType["Constant"] = "constant";
    EntryType["Decorator"] = "decorator";
    EntryType["Directive"] = "directive";
    EntryType["Element"] = "element";
    EntryType["Enum"] = "enum";
    EntryType["Function"] = "function";
    EntryType["Interface"] = "interface";
    EntryType["NgModule"] = "ng_module";
    EntryType["Pipe"] = "pipe";
    EntryType["TypeAlias"] = "type_alias";
    EntryType["UndecoratedClass"] = "undecorated_class";
    EntryType["InitializerApiFunction"] = "initializer_api_function";
})(EntryType || (exports.EntryType = EntryType = {}));
/** Types of class members */
var MemberType;
(function (MemberType) {
    MemberType["Property"] = "property";
    MemberType["Method"] = "method";
    MemberType["Getter"] = "getter";
    MemberType["Setter"] = "setter";
    MemberType["EnumItem"] = "enum_item";
})(MemberType || (exports.MemberType = MemberType = {}));
var DecoratorType;
(function (DecoratorType) {
    DecoratorType["Class"] = "class";
    DecoratorType["Member"] = "member";
    DecoratorType["Parameter"] = "parameter";
})(DecoratorType || (exports.DecoratorType = DecoratorType = {}));
/** Informational tags applicable to class members. */
var MemberTags;
(function (MemberTags) {
    MemberTags["Abstract"] = "abstract";
    MemberTags["Static"] = "static";
    MemberTags["Readonly"] = "readonly";
    MemberTags["Protected"] = "protected";
    MemberTags["Optional"] = "optional";
    MemberTags["Input"] = "input";
    MemberTags["Output"] = "output";
    MemberTags["Inherited"] = "override";
})(MemberTags || (exports.MemberTags = MemberTags = {}));
function isDocEntryWithSourceInfo(entry) {
    return 'source' in entry;
}
