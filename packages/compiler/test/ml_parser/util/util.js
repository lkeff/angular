"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeNodes = serializeNodes;
const html_tags_1 = require("../../../src/ml_parser/html_tags");
class _SerializerVisitor {
    visitElement(element, context) {
        const attrs = `${this._visitAll(element.attrs, ' ', ' ')}${this._visitAll(element.directives, ' ', ' ')}`;
        if ((0, html_tags_1.getHtmlTagDefinition)(element.name).isVoid) {
            return `<${element.name}${attrs}/>`;
        }
        return `<${element.name}${attrs}>${this._visitAll(element.children)}</${element.name}>`;
    }
    visitAttribute(attribute, context) {
        return `${attribute.name}="${attribute.value}"`;
    }
    visitText(text, context) {
        return text.value;
    }
    visitComment(comment, context) {
        return `<!--${comment.value}-->`;
    }
    visitExpansion(expansion, context) {
        return `{${expansion.switchValue}, ${expansion.type},${this._visitAll(expansion.cases)}}`;
    }
    visitExpansionCase(expansionCase, context) {
        return ` ${expansionCase.value} {${this._visitAll(expansionCase.expression)}}`;
    }
    visitBlock(block, context) {
        const params = block.parameters.length === 0 ? ' ' : ` (${this._visitAll(block.parameters, ';', ' ')}) `;
        return `@${block.name}${params}{${this._visitAll(block.children)}}`;
    }
    visitBlockParameter(parameter, context) {
        return parameter.expression;
    }
    visitLetDeclaration(decl, context) {
        return `@let ${decl.name} = ${decl.value};`;
    }
    visitComponent(node, context) {
        const attrs = `${this._visitAll(node.attrs, ' ', ' ')}${this._visitAll(node.directives, ' ', ' ')}`;
        return `<${node.fullName}${attrs}>${this._visitAll(node.children)}</${node.fullName}>`;
    }
    visitDirective(directive, context) {
        return `@${directive.name}${this._visitAll(directive.attrs, ' ', ' ')}`;
    }
    _visitAll(nodes, separator = '', prefix = '') {
        return nodes.length > 0 ? prefix + nodes.map((a) => a.visit(this, null)).join(separator) : '';
    }
}
const serializerVisitor = new _SerializerVisitor();
function serializeNodes(nodes) {
    return nodes.map((node) => node.visit(serializerVisitor, null));
}
