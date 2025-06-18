"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.angularComponent = angularComponent;
const javascript_1 = require("@lezer/javascript");
const common_1 = require("@lezer/common");
const language_1 = require("@codemirror/language");
const lang_angular_1 = require("@codemirror/lang-angular");
const lang_sass_1 = require("@codemirror/lang-sass");
function angularComponent() {
    return language_1.LRLanguage.define({
        parser: javascript_1.parser.configure({
            dialect: 'ts',
            wrap: (0, common_1.parseMixed)((node, input) => getAngularComponentMixedParser(node, input)),
        }),
    });
}
/**
 * Use the Angular template parser for inline templates in Angular components
 */
function getAngularComponentMixedParser(node, input) {
    const nodeIsString = ['TemplateString', 'String'].includes(node.name);
    if (!nodeIsString)
        return null;
    if (isComponentTemplate(node, input))
        return { parser: lang_angular_1.angularLanguage.parser };
    if (isComponentStyles(node, input))
        return { parser: lang_sass_1.sassLanguage.parser };
    return null;
}
function isComponentTemplate(node, input) {
    if (!node.node.parent)
        return false;
    const expectedParents = [
        'Property', // `template:` in `@Component({ template: "..." })`
        'ObjectExpression', // `{` in `@Component({ template: "..." })`
        'ArgList', // the decorator arguments in `@Component({ template: "..." })`
        'CallExpression', // `()` in `@Component({ template: "..." })`
        'Decorator', // `@Component` in `@Component({ template: "..." })`
    ];
    const { node: parentNode } = node.node.parent;
    if (nodeHasExpectedParents(parentNode, expectedParents)) {
        const templateCandidateProperty = input
            .read(parentNode.node.from, parentNode.node.to)
            .toString()
            .trim();
        // is a Component's decorator `template`
        if (templateCandidateProperty.startsWith('template:'))
            return true;
    }
    return false;
}
function isComponentStyles(node, input) {
    var _a;
    if (!node.node.parent || !((_a = node.node.parent) === null || _a === void 0 ? void 0 : _a.node.parent))
        return false;
    const expectedParents = [
        'ArrayExpression', // `[` in `@Component({ styles: [``] })`
        'Property', // `styles:` in `@Component({ styles: [``] })`
        'ObjectExpression', // `{` in `@Component({ styles: [``] })`
        'ArgList', // the decorator arguments in `@Component({ styles: [``] })`
        'CallExpression', // `()` in `@Component({ styles: [``] })`
        'Decorator', // `@Component` in `@Component({ styles: [``] })`
    ];
    const { node: parentNode } = node.node.parent;
    if (nodeHasExpectedParents(parentNode, expectedParents)) {
        const propertyNode = node.node.parent.node.parent;
        const stylesCandidateProperty = input
            .read(propertyNode.from, propertyNode.to)
            .toString()
            .trim();
        // is a Component's decorator `styles`
        if (stylesCandidateProperty.startsWith('styles:')) {
            return true;
        }
    }
    return false;
}
/**
 * Utility function to verify if the given SyntaxNode has the expected parents
 */
function nodeHasExpectedParents(node, orderedParentsNames) {
    const parentNameToVerify = orderedParentsNames[0];
    if (parentNameToVerify !== node.name)
        return false;
    // parent was found, remove from the array
    orderedParentsNames.shift();
    // all expected parents were found, node has expected parents
    if (orderedParentsNames.length === 0)
        return true;
    if (!node.parent)
        return false;
    return nodeHasExpectedParents(node.parent.node, orderedParentsNames);
}
