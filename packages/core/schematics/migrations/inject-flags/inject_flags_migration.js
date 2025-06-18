"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectFlagsMigration = void 0;
const typescript_1 = __importDefault(require("typescript"));
const tsurge_1 = require("../../utils/tsurge");
const migrations_1 = require("@angular/compiler-cli/private/migrations");
const apply_import_manager_1 = require("../../utils/tsurge/helpers/apply_import_manager");
const imports_1 = require("../../utils/typescript/imports");
/** Mapping between `InjectFlag` enum members to their object literal equvalients. */
const FLAGS_TO_FIELDS = {
    'Default': 'default',
    'Host': 'host',
    'Optional': 'optional',
    'Self': 'self',
    'SkipSelf': 'skipSelf',
};
/** Migration that replaces `InjectFlags` usages with object literals. */
class InjectFlagsMigration extends tsurge_1.TsurgeFunnelMigration {
    analyze(info) {
        return __awaiter(this, void 0, void 0, function* () {
            const locations = {};
            const importRemovals = {};
            for (const sourceFile of info.sourceFiles) {
                const specifier = (0, imports_1.getImportSpecifier)(sourceFile, '@angular/core', 'InjectFlags');
                if (specifier === null) {
                    continue;
                }
                const file = (0, tsurge_1.projectFile)(sourceFile, info);
                const importManager = new migrations_1.ImportManager();
                const importReplacements = [];
                // Always remove the `InjectFlags` since it has been removed from Angular.
                // Note that it be better to do this inside of `migrate`, but we don't have AST access there.
                importManager.removeImport(sourceFile, 'InjectFlags', '@angular/core');
                (0, apply_import_manager_1.applyImportManagerChanges)(importManager, importReplacements, [sourceFile], info);
                importRemovals[file.id] = importReplacements;
                sourceFile.forEachChild(function walk(node) {
                    var _a;
                    if (
                    // Note: we don't use the type checker for matching here, because
                    // the `InjectFlags` will be removed which can break the lookup.
                    typescript_1.default.isPropertyAccessExpression(node) &&
                        typescript_1.default.isIdentifier(node.expression) &&
                        node.expression.text === specifier.name.text &&
                        FLAGS_TO_FIELDS.hasOwnProperty(node.name.text)) {
                        const root = getInjectFlagsRootExpression(node);
                        if (root !== null) {
                            const flagName = FLAGS_TO_FIELDS[node.name.text];
                            const id = getNodeID(file, root);
                            (_a = locations[id]) !== null && _a !== void 0 ? _a : (locations[id] = { file, flags: [], position: root.getStart(), end: root.getEnd() });
                            // The flags can't be a set here, because they need to be serializable.
                            if (!locations[id].flags.includes(flagName)) {
                                locations[id].flags.push(flagName);
                            }
                        }
                    }
                    else {
                        node.forEachChild(walk);
                    }
                });
            }
            return (0, tsurge_1.confirmAsSerializable)({ locations, importRemovals });
        });
    }
    migrate(globalData) {
        return __awaiter(this, void 0, void 0, function* () {
            const replacements = [];
            for (const removals of Object.values(globalData.importRemovals)) {
                replacements.push(...removals);
            }
            for (const { file, position, end, flags } of Object.values(globalData.locations)) {
                // Declare a property for each flag, except for `default` which does not have a flag.
                const properties = flags.filter((flag) => flag !== 'default').map((flag) => `${flag}: true`);
                const toInsert = properties.length ? `{ ${properties.join(', ')} }` : '{}';
                replacements.push(new tsurge_1.Replacement(file, new tsurge_1.TextUpdate({ position, end, toInsert })));
            }
            return (0, tsurge_1.confirmAsSerializable)({ replacements });
        });
    }
    combine(unitA, unitB) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, tsurge_1.confirmAsSerializable)({
                locations: Object.assign(Object.assign({}, unitA.locations), unitB.locations),
                importRemovals: Object.assign(Object.assign({}, unitA.importRemovals), unitB.importRemovals),
            });
        });
    }
    globalMeta(combinedData) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, tsurge_1.confirmAsSerializable)(combinedData);
        });
    }
    stats() {
        return __awaiter(this, void 0, void 0, function* () {
            return { counters: {} };
        });
    }
}
exports.InjectFlagsMigration = InjectFlagsMigration;
/** Gets an ID that can be used to look up a node based on its location. */
function getNodeID(file, node) {
    return `${file.id}/${node.getStart()}/${node.getWidth()}`;
}
/**
 * Gets the root expression of an `InjectFlags` usage. For example given `InjectFlags.Optional`.
 * in `InjectFlags.Host | InjectFlags.Optional | InjectFlags.SkipSelf`, the function will return
 * the top-level binary expression.
 * @param start Node from which to start searching.
 */
function getInjectFlagsRootExpression(start) {
    let current = start;
    let parent = current === null || current === void 0 ? void 0 : current.parent;
    while (parent && (typescript_1.default.isBinaryExpression(parent) || typescript_1.default.isParenthesizedExpression(parent))) {
        current = parent;
        parent = current.parent;
    }
    // Only allow allow expressions that are call parameters, variable initializer or parameter
    // initializers which are the only officially supported usages of `InjectFlags`.
    if (current &&
        parent &&
        ((typescript_1.default.isCallExpression(parent) && parent.arguments.includes(current)) ||
            (typescript_1.default.isVariableDeclaration(parent) && parent.initializer === current) ||
            (typescript_1.default.isParameter(parent) && parent.initializer === current))) {
        return current;
    }
    return null;
}
