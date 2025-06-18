"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CombinedRecursiveAstVisitor = void 0;
const ast_1 = require("./expression_parser/ast");
const t = __importStar(require("./render3/r3_ast"));
/**
 * Visitor that traverses all template and expression AST nodes in a template.
 * Useful for cases where every single node needs to be visited.
 */
class CombinedRecursiveAstVisitor extends ast_1.RecursiveAstVisitor {
    visit(node) {
        if (node instanceof ast_1.ASTWithSource) {
            this.visit(node.ast);
        }
        else {
            node.visit(this);
        }
    }
    visitElement(element) {
        this.visitAllTemplateNodes(element.attributes);
        this.visitAllTemplateNodes(element.inputs);
        this.visitAllTemplateNodes(element.outputs);
        this.visitAllTemplateNodes(element.directives);
        this.visitAllTemplateNodes(element.references);
        this.visitAllTemplateNodes(element.children);
    }
    visitTemplate(template) {
        this.visitAllTemplateNodes(template.attributes);
        this.visitAllTemplateNodes(template.inputs);
        this.visitAllTemplateNodes(template.outputs);
        this.visitAllTemplateNodes(template.directives);
        this.visitAllTemplateNodes(template.templateAttrs);
        this.visitAllTemplateNodes(template.variables);
        this.visitAllTemplateNodes(template.references);
        this.visitAllTemplateNodes(template.children);
    }
    visitContent(content) {
        this.visitAllTemplateNodes(content.children);
    }
    visitBoundAttribute(attribute) {
        this.visit(attribute.value);
    }
    visitBoundEvent(attribute) {
        this.visit(attribute.handler);
    }
    visitBoundText(text) {
        this.visit(text.value);
    }
    visitIcu(icu) {
        Object.keys(icu.vars).forEach((key) => this.visit(icu.vars[key]));
        Object.keys(icu.placeholders).forEach((key) => this.visit(icu.placeholders[key]));
    }
    visitDeferredBlock(deferred) {
        deferred.visitAll(this);
    }
    visitDeferredTrigger(trigger) {
        if (trigger instanceof t.BoundDeferredTrigger) {
            this.visit(trigger.value);
        }
    }
    visitDeferredBlockPlaceholder(block) {
        this.visitAllTemplateNodes(block.children);
    }
    visitDeferredBlockError(block) {
        this.visitAllTemplateNodes(block.children);
    }
    visitDeferredBlockLoading(block) {
        this.visitAllTemplateNodes(block.children);
    }
    visitSwitchBlock(block) {
        this.visit(block.expression);
        this.visitAllTemplateNodes(block.cases);
    }
    visitSwitchBlockCase(block) {
        block.expression && this.visit(block.expression);
        this.visitAllTemplateNodes(block.children);
    }
    visitForLoopBlock(block) {
        var _a;
        block.item.visit(this);
        this.visitAllTemplateNodes(block.contextVariables);
        this.visit(block.expression);
        this.visitAllTemplateNodes(block.children);
        (_a = block.empty) === null || _a === void 0 ? void 0 : _a.visit(this);
    }
    visitForLoopBlockEmpty(block) {
        this.visitAllTemplateNodes(block.children);
    }
    visitIfBlock(block) {
        this.visitAllTemplateNodes(block.branches);
    }
    visitIfBlockBranch(block) {
        var _a;
        block.expression && this.visit(block.expression);
        (_a = block.expressionAlias) === null || _a === void 0 ? void 0 : _a.visit(this);
        this.visitAllTemplateNodes(block.children);
    }
    visitLetDeclaration(decl) {
        this.visit(decl.value);
    }
    visitComponent(component) {
        this.visitAllTemplateNodes(component.attributes);
        this.visitAllTemplateNodes(component.inputs);
        this.visitAllTemplateNodes(component.outputs);
        this.visitAllTemplateNodes(component.directives);
        this.visitAllTemplateNodes(component.references);
        this.visitAllTemplateNodes(component.children);
    }
    visitDirective(directive) {
        this.visitAllTemplateNodes(directive.attributes);
        this.visitAllTemplateNodes(directive.inputs);
        this.visitAllTemplateNodes(directive.outputs);
        this.visitAllTemplateNodes(directive.references);
    }
    visitVariable(variable) { }
    visitReference(reference) { }
    visitTextAttribute(attribute) { }
    visitText(text) { }
    visitUnknownBlock(block) { }
    visitAllTemplateNodes(nodes) {
        for (const node of nodes) {
            this.visit(node);
        }
    }
}
exports.CombinedRecursiveAstVisitor = CombinedRecursiveAstVisitor;
