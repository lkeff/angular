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
exports.Rule = void 0;
const walker_1 = require("tslint/lib/language/walker");
const rules_1 = require("tslint/lib/rules");
const typescript_1 = __importDefault(require("typescript"));
class Rule extends rules_1.AbstractRule {
    apply(sourceFile) {
        const typedefWalker = new TypedefWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(typedefWalker);
    }
}
exports.Rule = Rule;
class TypedefWalker extends walker_1.RuleWalker {
    visitPropertyDeclaration(node) {
        this.assertInternalAnnotationPresent(node);
        super.visitPropertyDeclaration(node);
    }
    visitMethodDeclaration(node) {
        this.assertInternalAnnotationPresent(node);
        super.visitMethodDeclaration(node);
    }
    hasInternalAnnotation(range) {
        const text = this.getSourceFile().text;
        const comment = text.substring(range.pos, range.end);
        return comment.indexOf('@internal') >= 0;
    }
    assertInternalAnnotationPresent(node) {
        var _a;
        if (node.name && node.name.getText().charAt(0) !== '_')
            return;
        if (typescript_1.default.getCombinedModifierFlags(node) & typescript_1.default.ModifierFlags.Private)
            return;
        const ranges = typescript_1.default.getLeadingCommentRanges(this.getSourceFile().text, node.pos);
        if (ranges) {
            for (let i = 0; i < ranges.length; i++) {
                if (this.hasInternalAnnotation(ranges[i]))
                    return;
            }
        }
        this.addFailure(this.createFailure(node.getStart(), node.getWidth(), `module-private member ${(_a = node.name) === null || _a === void 0 ? void 0 : _a.getText()} must be annotated @internal`));
    }
}
