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
exports.checkIncompatiblePatterns = checkIncompatiblePatterns;
const common_1 = require("@angular/compiler-cli/src/ngtsc/annotations/common");
const assert_1 = __importDefault(require("assert"));
const typescript_1 = __importDefault(require("typescript"));
const incompatibility_1 = require("./incompatibility");
const spy_on_pattern_1 = require("../../pattern_advisors/spy_on_pattern");
const class_member_names_1 = require("../../utils/class_member_names");
/**
 * Phase where problematic patterns are detected and advise
 * the migration to skip certain inputs.
 *
 * For example, detects classes that are instantiated manually. Those
 * cannot be migrated as `input()` requires an injection context.
 *
 * In addition, spying onto an input may be problematic- so we skip migrating
 * such.
 */
function checkIncompatiblePatterns(inheritanceGraph, checker, groupedTsAstVisitor, fields, getAllClassesWithKnownFields) {
    const inputClassSymbolsToClass = new Map();
    for (const knownFieldClass of getAllClassesWithKnownFields()) {
        const classSymbol = checker.getTypeAtLocation(knownFieldClass).symbol;
        (0, assert_1.default)(classSymbol != null, 'Expected a symbol to exist for the container of known field class.');
        (0, assert_1.default)(classSymbol.valueDeclaration !== undefined, 'Expected declaration to exist for known field class.');
        (0, assert_1.default)(typescript_1.default.isClassDeclaration(classSymbol.valueDeclaration), 'Expected declaration to be a class.');
        // track class symbol for derived class checks.
        inputClassSymbolsToClass.set(classSymbol, classSymbol.valueDeclaration);
    }
    const spyOnPattern = new spy_on_pattern_1.SpyOnFieldPattern(checker, fields);
    const visitor = (node) => {
        // Check for manual class instantiations.
        if (typescript_1.default.isNewExpression(node) && typescript_1.default.isIdentifier((0, common_1.unwrapExpression)(node.expression))) {
            let newTarget = checker.getSymbolAtLocation((0, common_1.unwrapExpression)(node.expression));
            // Plain identifier references can point to alias symbols (e.g. imports).
            if (newTarget !== undefined && newTarget.flags & typescript_1.default.SymbolFlags.Alias) {
                newTarget = checker.getAliasedSymbol(newTarget);
            }
            if (newTarget && inputClassSymbolsToClass.has(newTarget)) {
                fields.markClassIncompatible(inputClassSymbolsToClass.get(newTarget), incompatibility_1.ClassIncompatibilityReason.ClassManuallyInstantiated);
            }
        }
        // Detect `spyOn` problematic usages and record them.
        spyOnPattern.detect(node);
        const insidePropertyDeclaration = groupedTsAstVisitor.state.insidePropertyDeclaration;
        // Check for problematic class references inside property declarations.
        // These are likely problematic, causing type conflicts, if the containing
        // class inherits a non-input member with the same name.
        // Suddenly the derived class changes its signature, but the base class may not.
        problematicReferencesCheck: if (insidePropertyDeclaration !== null &&
            typescript_1.default.isIdentifier(node) &&
            insidePropertyDeclaration.parent.heritageClauses !== undefined) {
            let newTarget = checker.getSymbolAtLocation((0, common_1.unwrapExpression)(node));
            // Plain identifier references can point to alias symbols (e.g. imports).
            if (newTarget !== undefined && newTarget.flags & typescript_1.default.SymbolFlags.Alias) {
                newTarget = checker.getAliasedSymbol(newTarget);
            }
            if (newTarget && inputClassSymbolsToClass.has(newTarget)) {
                const memberName = (0, class_member_names_1.getMemberName)(insidePropertyDeclaration);
                if (memberName === null) {
                    break problematicReferencesCheck;
                }
                const { derivedMembers, inherited } = inheritanceGraph.checkOverlappingMembers(insidePropertyDeclaration.parent, insidePropertyDeclaration, memberName);
                // Member is not inherited, or derived.
                // Hence the reference is unproblematic and is expected to not
                // cause any type conflicts.
                if (derivedMembers.length === 0 && inherited === undefined) {
                    break problematicReferencesCheck;
                }
                fields.markClassIncompatible(inputClassSymbolsToClass.get(newTarget), incompatibility_1.ClassIncompatibilityReason.OwningClassReferencedInClassProperty);
            }
        }
    };
    groupedTsAstVisitor.register(visitor);
}
