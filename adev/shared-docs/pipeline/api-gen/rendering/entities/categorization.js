"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isClassEntry = isClassEntry;
exports.isDecoratorEntry = isDecoratorEntry;
exports.isConstantEntry = isConstantEntry;
exports.isTypeAliasEntry = isTypeAliasEntry;
exports.isEnumEntry = isEnumEntry;
exports.isInterfaceEntry = isInterfaceEntry;
exports.isClassMethodEntry = isClassMethodEntry;
exports.isFunctionEntry = isFunctionEntry;
exports.isInitializerApiFunctionEntry = isInitializerApiFunctionEntry;
exports.isPropertyEntry = isPropertyEntry;
exports.isGetterEntry = isGetterEntry;
exports.isSetterEntry = isSetterEntry;
exports.isHiddenEntry = isHiddenEntry;
exports.isDeprecatedEntry = isDeprecatedEntry;
exports.getDeprecatedEntry = getDeprecatedEntry;
exports.getTagSinceVersion = getTagSinceVersion;
exports.isCliEntry = isCliEntry;
const entities_1 = require("../entities");
function isClassEntry(entry) {
    // TODO: add something like `statementType` to extraction so we don't have to check so many
    //     entry types here.
    return (entry.entryType === entities_1.EntryType.UndecoratedClass ||
        entry.entryType === entities_1.EntryType.Component ||
        entry.entryType === entities_1.EntryType.Pipe ||
        entry.entryType === entities_1.EntryType.NgModule ||
        entry.entryType === entities_1.EntryType.Directive);
}
function isDecoratorEntry(entry) {
    return entry.entryType === entities_1.EntryType.Decorator;
}
function isConstantEntry(entry) {
    return entry.entryType === entities_1.EntryType.Constant;
}
function isTypeAliasEntry(entry) {
    return entry.entryType === entities_1.EntryType.TypeAlias;
}
function isEnumEntry(entry) {
    return entry.entryType === entities_1.EntryType.Enum;
}
function isInterfaceEntry(entry) {
    return entry.entryType === entities_1.EntryType.Interface;
}
function isClassMethodEntry(entry) {
    return entry.memberType === entities_1.MemberType.Method;
}
function isFunctionEntry(entry) {
    return entry.entryType === entities_1.EntryType.Function;
}
function isInitializerApiFunctionEntry(entry) {
    return entry.entryType === entities_1.EntryType.InitializerApiFunction;
}
/** Gets whether the given entry represents a property */
function isPropertyEntry(entry) {
    return entry.memberType === entities_1.MemberType.Property;
}
/** Gets whether the given entry represents a getter */
function isGetterEntry(entry) {
    return entry.memberType === entities_1.MemberType.Getter;
}
/** Gets whether the given entry represents a setter */
function isSetterEntry(entry) {
    return entry.memberType === entities_1.MemberType.Setter;
}
/** Gets whether the given entry is hidden. */
function isHiddenEntry(entry) {
    return getTag(entry, 'docs-private', /* every */ true) ? true : false;
}
/** Gets whether the given entry is deprecated. */
function isDeprecatedEntry(entry) {
    return getTag(entry, 'deprecated', /* every */ true) ? true : false;
}
function getDeprecatedEntry(entry) {
    var _a, _b;
    return (_b = (_a = entry.jsdocTags.find((tag) => tag.name === 'deprecated')) === null || _a === void 0 ? void 0 : _a.comment) !== null && _b !== void 0 ? _b : null;
}
/** Gets whether the given entry has a given JsDoc tag. */
function getTag(entry, tag, every = false) {
    var _a, _b, _c, _d;
    const hasTagName = (t) => t.name === tag;
    if (every && 'signatures' in entry && entry.signatures.length > 1) {
        // For overloads we need to check all signatures.
        return entry.signatures.every((s) => s.jsdocTags.some(hasTagName))
            ? entry.signatures[0].jsdocTags.find(hasTagName)
            : undefined;
    }
    const jsdocTags = [
        ...entry.jsdocTags,
        ...((_b = (_a = entry.signatures) === null || _a === void 0 ? void 0 : _a.flatMap((s) => s.jsdocTags)) !== null && _b !== void 0 ? _b : []),
        ...((_d = (_c = entry.implementation) === null || _c === void 0 ? void 0 : _c.jsdocTags) !== null && _d !== void 0 ? _d : []),
    ];
    return jsdocTags.find(hasTagName);
}
function getTagSinceVersion(entry, tagName) {
    var _a;
    const tag = getTag(entry, tagName);
    if (!tag) {
        return undefined;
    }
    // In case of deprecated tag we need to separate the version from the deprecation message.
    const version = (_a = tag.comment.match(/\d+(\.\d+)?/)) === null || _a === void 0 ? void 0 : _a[0];
    return { version };
}
/** Gets whether the given entry is a cli entry. */
function isCliEntry(entry) {
    return entry.command !== undefined;
}
