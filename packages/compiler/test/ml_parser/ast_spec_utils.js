"use strict";
/**
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
exports.humanizeDom = humanizeDom;
exports.humanizeDomSourceSpans = humanizeDomSourceSpans;
exports.humanizeNodes = humanizeNodes;
exports.humanizeLineColumn = humanizeLineColumn;
const html = __importStar(require("../../src/ml_parser/ast"));
function humanizeDom(parseResult, addSourceSpan = false) {
    if (parseResult.errors.length > 0) {
        const errorString = parseResult.errors.join('\n');
        throw new Error(`Unexpected parse errors:\n${errorString}`);
    }
    return humanizeNodes(parseResult.rootNodes, addSourceSpan);
}
function humanizeDomSourceSpans(parseResult) {
    return humanizeDom(parseResult, true);
}
function humanizeNodes(nodes, addSourceSpan = false) {
    const humanizer = new _Humanizer(addSourceSpan);
    html.visitAll(humanizer, nodes);
    return humanizer.result;
}
function humanizeLineColumn(location) {
    return `${location.line}:${location.col}`;
}
class _Humanizer {
    constructor(includeSourceSpan) {
        this.includeSourceSpan = includeSourceSpan;
        this.result = [];
        this.elDepth = 0;
    }
    visitElement(element) {
        var _a, _b, _c;
        const res = this._appendContext(element, [html.Element, element.name, this.elDepth++]);
        if (this.includeSourceSpan) {
            res.push((_a = element.startSourceSpan.toString()) !== null && _a !== void 0 ? _a : null);
            res.push((_c = (_b = element.endSourceSpan) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : null);
        }
        this.result.push(res);
        html.visitAll(this, element.attrs);
        html.visitAll(this, element.directives);
        html.visitAll(this, element.children);
        this.elDepth--;
    }
    visitAttribute(attribute) {
        var _a;
        const valueTokens = (_a = attribute.valueTokens) !== null && _a !== void 0 ? _a : [];
        const res = this._appendContext(attribute, [
            html.Attribute,
            attribute.name,
            attribute.value,
            ...valueTokens.map((token) => token.parts),
        ]);
        this.result.push(res);
    }
    visitText(text) {
        const res = this._appendContext(text, [
            html.Text,
            text.value,
            this.elDepth,
            ...text.tokens.map((token) => token.parts),
        ]);
        this.result.push(res);
    }
    visitComment(comment) {
        const res = this._appendContext(comment, [html.Comment, comment.value, this.elDepth]);
        this.result.push(res);
    }
    visitExpansion(expansion) {
        const res = this._appendContext(expansion, [
            html.Expansion,
            expansion.switchValue,
            expansion.type,
            this.elDepth++,
        ]);
        this.result.push(res);
        html.visitAll(this, expansion.cases);
        this.elDepth--;
    }
    visitExpansionCase(expansionCase) {
        const res = this._appendContext(expansionCase, [
            html.ExpansionCase,
            expansionCase.value,
            this.elDepth,
        ]);
        this.result.push(res);
    }
    visitBlock(block) {
        var _a, _b, _c;
        const res = this._appendContext(block, [html.Block, block.name, this.elDepth++]);
        if (this.includeSourceSpan) {
            res.push((_a = block.startSourceSpan.toString()) !== null && _a !== void 0 ? _a : null);
            res.push((_c = (_b = block.endSourceSpan) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : null);
        }
        this.result.push(res);
        html.visitAll(this, block.parameters);
        html.visitAll(this, block.children);
        this.elDepth--;
    }
    visitBlockParameter(parameter) {
        this.result.push(this._appendContext(parameter, [html.BlockParameter, parameter.expression]));
    }
    visitLetDeclaration(decl) {
        var _a, _b, _c, _d;
        const res = this._appendContext(decl, [html.LetDeclaration, decl.name, decl.value]);
        if (this.includeSourceSpan) {
            res.push((_b = (_a = decl.nameSpan) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : null);
            res.push((_d = (_c = decl.valueSpan) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : null);
        }
        this.result.push(res);
    }
    visitComponent(node) {
        var _a, _b, _c;
        const res = this._appendContext(node, [
            html.Component,
            node.componentName,
            node.tagName,
            node.fullName,
            this.elDepth++,
        ]);
        if (this.includeSourceSpan) {
            res.push((_a = node.startSourceSpan.toString()) !== null && _a !== void 0 ? _a : null, (_c = (_b = node.endSourceSpan) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : null);
        }
        this.result.push(res);
        html.visitAll(this, node.attrs);
        html.visitAll(this, node.directives);
        html.visitAll(this, node.children);
        this.elDepth--;
    }
    visitDirective(directive) {
        var _a, _b;
        const res = this._appendContext(directive, [html.Directive, directive.name]);
        if (this.includeSourceSpan) {
            res.push(directive.startSourceSpan.toString(), (_b = (_a = directive.endSourceSpan) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : null);
        }
        this.result.push(res);
        html.visitAll(this, directive.attrs);
    }
    _appendContext(ast, input) {
        if (!this.includeSourceSpan)
            return input;
        input.push(ast.sourceSpan.toString());
        if (ast.sourceSpan.fullStart.offset !== ast.sourceSpan.start.offset) {
            input.push(ast.sourceSpan.fullStart.file.content.substring(ast.sourceSpan.fullStart.offset, ast.sourceSpan.end.offset));
        }
        return input;
    }
}
