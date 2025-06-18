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
exports.getOutliningSpans = getOutliningSpans;
const compiler_1 = require("@angular/compiler");
const metadata_1 = require("@angular/compiler-cli/src/ngtsc/metadata");
const reflection_1 = require("@angular/compiler-cli/src/ngtsc/reflection");
const typescript_1 = __importDefault(require("typescript"));
const utils_1 = require("./utils");
function getOutliningSpans(compiler, fileName) {
    if ((0, utils_1.isTypeScriptFile)(fileName)) {
        const sf = compiler.getCurrentProgram().getSourceFile(fileName);
        if (sf === undefined) {
            return [];
        }
        const templatesInFile = [];
        for (const stmt of sf.statements) {
            if ((0, reflection_1.isNamedClassDeclaration)(stmt)) {
                const resources = compiler.getDirectiveResources(stmt);
                if (resources === null ||
                    resources.template === null ||
                    (0, metadata_1.isExternalResource)(resources.template)) {
                    continue;
                }
                const template = compiler.getTemplateTypeChecker().getTemplate(stmt);
                if (template === null) {
                    continue;
                }
                templatesInFile.push(template);
            }
        }
        return templatesInFile.map((template) => BlockVisitor.getBlockSpans(template)).flat();
    }
    else {
        const typeCheckInfo = (0, utils_1.getFirstComponentForTemplateFile)(fileName, compiler);
        return typeCheckInfo === undefined ? [] : BlockVisitor.getBlockSpans(typeCheckInfo.nodes);
    }
}
class BlockVisitor extends compiler_1.TmplAstRecursiveVisitor {
    constructor() {
        super(...arguments);
        this.blocks = [];
    }
    static getBlockSpans(templateNodes) {
        const visitor = new BlockVisitor();
        (0, compiler_1.tmplAstVisitAll)(visitor, templateNodes);
        const { blocks } = visitor;
        return blocks.map((block) => {
            let mainBlockSpan = block.sourceSpan;
            // The source span of for loops and deferred blocks contain all parts (ForLoopBlockEmpty,
            // DeferredBlockLoading, etc.). The folding range should only include the main block span for
            // these.
            if (block instanceof compiler_1.TmplAstForLoopBlock || block instanceof compiler_1.TmplAstDeferredBlock) {
                mainBlockSpan = block.mainBlockSpan;
            }
            return {
                // We move the end back 1 character so we do not consume the close brace of the block in the
                // range.
                textSpan: (0, utils_1.toTextSpan)(new compiler_1.ParseSourceSpan(block.startSourceSpan.end, mainBlockSpan.end.moveBy(-1))),
                hintSpan: (0, utils_1.toTextSpan)(block.startSourceSpan),
                bannerText: '...',
                autoCollapse: false,
                kind: typescript_1.default.OutliningSpanKind.Region,
            };
        });
    }
    visit(node) {
        if (node instanceof compiler_1.TmplAstBlockNode &&
            // Omit `IfBlock` because we include the branches individually
            !(node instanceof compiler_1.TmplAstIfBlock)) {
            this.blocks.push(node);
        }
        node.visit(this);
    }
}
