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
exports.migrateStandardTsReference = migrateStandardTsReference;
const typescript_1 = __importDefault(require("typescript"));
const flow_analysis_1 = require("../../../flow_analysis");
const tsurge_1 = require("../../../../../../utils/tsurge");
const traverse_access_1 = require("../../../utils/traverse_access");
const unique_names_1 = require("../../../utils/unique_names");
const create_block_arrow_function_1 = require("../helpers/create_block_arrow_function");
const assert_1 = __importDefault(require("assert"));
function migrateStandardTsReference(tsReferencesWithNarrowing, checker, info, replacements) {
    const nameGenerator = new unique_names_1.UniqueNamesGenerator(['Value', 'Val', 'Input']);
    // TODO: Consider checking/properly handling optional chaining and narrowing.
    for (const reference of tsReferencesWithNarrowing.values()) {
        const controlFlowResult = (0, flow_analysis_1.analyzeControlFlow)(reference.accesses, checker);
        const idToSharedField = new Map();
        const isSharePartnerRef = (val) => {
            return val !== 'preserve' && typeof val !== 'number';
        };
        // Ensure we generate shared fields before reference entries.
        // This allows us to safely make use of `idToSharedField` whenever we come
        // across a referenced pointing to a share partner.
        controlFlowResult.sort((a, b) => {
            const aPriority = isSharePartnerRef(a.recommendedNode) ? 1 : 0;
            const bPriority = isSharePartnerRef(b.recommendedNode) ? 1 : 0;
            return bPriority - aPriority;
        });
        for (const { id, originalNode, recommendedNode } of controlFlowResult) {
            const sf = originalNode.getSourceFile();
            // Original node is preserved. No narrowing, and hence not shared.
            // Unwrap the signal directly.
            if (recommendedNode === 'preserve') {
                // Append `()` to unwrap the signal.
                replacements.push(new tsurge_1.Replacement((0, tsurge_1.projectFile)(sf, info), new tsurge_1.TextUpdate({
                    position: originalNode.getEnd(),
                    end: originalNode.getEnd(),
                    toInsert: '()',
                })));
                continue;
            }
            // This reference is shared with a previous reference. Replace the access
            // with the temporary variable.
            if (typeof recommendedNode === 'number') {
                // Extract the shared field name.
                const toInsert = idToSharedField.get(recommendedNode);
                const replaceNode = (0, traverse_access_1.traverseAccess)(originalNode);
                (0, assert_1.default)(toInsert, 'no shared variable yet available');
                replacements.push(new tsurge_1.Replacement((0, tsurge_1.projectFile)(sf, info), new tsurge_1.TextUpdate({
                    position: replaceNode.getStart(),
                    end: replaceNode.getEnd(),
                    toInsert,
                })));
                continue;
            }
            // Otherwise, we are creating a "shared reference" at the given node and
            // block.
            // Iterate up the original node, until we hit the "recommended block" level.
            // We then use the previous child as anchor for inserting. This allows us
            // to insert right before the first reference in the container, at the proper
            // block level— instead of always inserting at the beginning of the container.
            let parent = originalNode.parent;
            let referenceNodeInBlock = originalNode;
            while (parent !== recommendedNode) {
                referenceNodeInBlock = parent;
                parent = parent.parent;
            }
            const replaceNode = (0, traverse_access_1.traverseAccess)(originalNode);
            const filePath = (0, tsurge_1.projectFile)(sf, info);
            const initializer = `${replaceNode.getText()}()`;
            const fieldName = nameGenerator.generate(originalNode.text, referenceNodeInBlock);
            let sharedValueAccessExpr;
            let temporaryVariableStr;
            if (typescript_1.default.isClassLike(recommendedNode)) {
                sharedValueAccessExpr = `this.${fieldName}`;
                temporaryVariableStr = `private readonly ${fieldName} = ${initializer};`;
            }
            else {
                sharedValueAccessExpr = fieldName;
                temporaryVariableStr = `const ${fieldName} = ${initializer};`;
            }
            idToSharedField.set(id, sharedValueAccessExpr);
            // If the common ancestor block of all shared references is an arrow function
            // without a block, convert the arrow function to a block and insert the temporary
            // variable at the beginning.
            if (typescript_1.default.isArrowFunction(parent) && !typescript_1.default.isBlock(parent.body)) {
                replacements.push(...(0, create_block_arrow_function_1.createNewBlockToInsertVariable)(parent, filePath, temporaryVariableStr));
            }
            else {
                const leadingSpace = typescript_1.default.getLineAndCharacterOfPosition(sf, referenceNodeInBlock.getStart());
                replacements.push(new tsurge_1.Replacement(filePath, new tsurge_1.TextUpdate({
                    position: referenceNodeInBlock.getStart(),
                    end: referenceNodeInBlock.getStart(),
                    toInsert: `${temporaryVariableStr}\n${' '.repeat(leadingSpace.character)}`,
                })));
            }
            replacements.push(new tsurge_1.Replacement((0, tsurge_1.projectFile)(sf, info), new tsurge_1.TextUpdate({
                position: replaceNode.getStart(),
                end: replaceNode.getEnd(),
                toInsert: sharedValueAccessExpr,
            })));
        }
    }
}
