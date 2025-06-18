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
exports.SelfClosingTagsMigration = void 0;
const typescript_1 = __importDefault(require("typescript"));
const tsurge_1 = require("../../utils/tsurge");
const ng_component_template_1 = require("../../utils/ng_component_template");
const to_self_closing_tags_1 = require("./to-self-closing-tags");
class SelfClosingTagsMigration extends tsurge_1.TsurgeFunnelMigration {
    constructor(config = {}) {
        super();
        this.config = config;
    }
    analyze(info) {
        return __awaiter(this, void 0, void 0, function* () {
            const { sourceFiles, program } = info;
            const typeChecker = program.getTypeChecker();
            const tagReplacements = [];
            for (const sf of sourceFiles) {
                typescript_1.default.forEachChild(sf, (node) => {
                    // Skipping any non component declarations
                    if (!typescript_1.default.isClassDeclaration(node)) {
                        return;
                    }
                    const file = (0, tsurge_1.projectFile)(node.getSourceFile(), info);
                    if (this.config.shouldMigrate && this.config.shouldMigrate(file) === false) {
                        return;
                    }
                    const templateVisitor = new ng_component_template_1.NgComponentTemplateVisitor(typeChecker);
                    templateVisitor.visitNode(node);
                    templateVisitor.resolvedTemplates.forEach((template) => {
                        const { migrated, changed, replacementCount } = (0, to_self_closing_tags_1.migrateTemplateToSelfClosingTags)(template.content);
                        if (!changed) {
                            return;
                        }
                        const fileToMigrate = template.inline
                            ? file
                            : (0, tsurge_1.projectFile)(template.filePath, info);
                        const end = template.start + template.content.length;
                        const replacements = [
                            prepareTextReplacement(fileToMigrate, migrated, template.start, end),
                        ];
                        const fileReplacements = tagReplacements.find((tagReplacement) => tagReplacement.file === file);
                        if (fileReplacements) {
                            fileReplacements.replacements.push(...replacements);
                            fileReplacements.replacementCount += replacementCount;
                        }
                        else {
                            tagReplacements.push({ file, replacements, replacementCount });
                        }
                    });
                });
            }
            return (0, tsurge_1.confirmAsSerializable)({ tagReplacements });
        });
    }
    combine(unitA, unitB) {
        return __awaiter(this, void 0, void 0, function* () {
            const uniqueReplacements = removeDuplicateReplacements([
                ...unitA.tagReplacements,
                ...unitB.tagReplacements,
            ]);
            return (0, tsurge_1.confirmAsSerializable)({ tagReplacements: uniqueReplacements });
        });
    }
    globalMeta(combinedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const globalMeta = {
                tagReplacements: combinedData.tagReplacements,
            };
            return (0, tsurge_1.confirmAsSerializable)(globalMeta);
        });
    }
    stats(globalMetadata) {
        return __awaiter(this, void 0, void 0, function* () {
            const touchedFilesCount = globalMetadata.tagReplacements.length;
            const replacementCount = globalMetadata.tagReplacements.reduce((acc, cur) => acc + cur.replacementCount, 0);
            return {
                counters: {
                    touchedFilesCount,
                    replacementCount,
                },
            };
        });
    }
    migrate(globalData) {
        return __awaiter(this, void 0, void 0, function* () {
            return { replacements: globalData.tagReplacements.flatMap(({ replacements }) => replacements) };
        });
    }
}
exports.SelfClosingTagsMigration = SelfClosingTagsMigration;
function prepareTextReplacement(file, replacement, start, end) {
    return new tsurge_1.Replacement(file, new tsurge_1.TextUpdate({
        position: start,
        end: end,
        toInsert: replacement,
    }));
}
function removeDuplicateReplacements(replacements) {
    const uniqueFiles = new Set();
    const result = [];
    for (const replacement of replacements) {
        const fileId = replacement.file.id;
        if (!uniqueFiles.has(fileId)) {
            uniqueFiles.add(fileId);
            result.push(replacement);
        }
    }
    return result;
}
