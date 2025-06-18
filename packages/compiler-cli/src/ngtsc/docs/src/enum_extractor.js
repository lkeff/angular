"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractEnum = extractEnum;
const entities_1 = require("./entities");
const jsdoc_extractor_1 = require("./jsdoc_extractor");
const type_extractor_1 = require("./type_extractor");
const typescript_1 = __importDefault(require("typescript"));
/** Extracts documentation entry for an enum. */
function extractEnum(declaration, typeChecker) {
    return {
        name: declaration.name.getText(),
        entryType: entities_1.EntryType.Enum,
        members: extractEnumMembers(declaration, typeChecker),
        rawComment: (0, jsdoc_extractor_1.extractRawJsDoc)(declaration),
        description: (0, jsdoc_extractor_1.extractJsDocDescription)(declaration),
        jsdocTags: (0, jsdoc_extractor_1.extractJsDocTags)(declaration),
    };
}
/** Extracts doc info for an enum's members. */
function extractEnumMembers(declaration, checker) {
    return declaration.members.map((member) => ({
        name: member.name.getText(),
        type: (0, type_extractor_1.extractResolvedTypeString)(member, checker),
        value: getEnumMemberValue(member),
        memberType: entities_1.MemberType.EnumItem,
        jsdocTags: (0, jsdoc_extractor_1.extractJsDocTags)(member),
        description: (0, jsdoc_extractor_1.extractJsDocDescription)(member),
        memberTags: [],
    }));
}
/** Gets the explicitly assigned value for an enum member, or an empty string if there is none. */
function getEnumMemberValue(memberNode) {
    var _a;
    // If the enum member has a child number literal or string literal,
    // we use that literal as the "value" of the member.
    const literal = memberNode.getChildren().find((n) => {
        return (typescript_1.default.isNumericLiteral(n) ||
            typescript_1.default.isStringLiteral(n) ||
            (typescript_1.default.isPrefixUnaryExpression(n) &&
                n.operator === typescript_1.default.SyntaxKind.MinusToken &&
                typescript_1.default.isNumericLiteral(n.operand)));
    });
    return (_a = literal === null || literal === void 0 ? void 0 : literal.getText()) !== null && _a !== void 0 ? _a : '';
}
