"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AngularElementCollector = void 0;
exports.migrateTemplateToSelfClosingTags = migrateTemplateToSelfClosingTags;
const compiler_1 = require("@angular/compiler");
const util_1 = require("./util");
function migrateTemplateToSelfClosingTags(template) {
    let parsed = (0, util_1.parseTemplate)(template);
    if (parsed.tree === undefined) {
        return { migrated: template, changed: false, replacementCount: 0 };
    }
    const visitor = new AngularElementCollector();
    (0, compiler_1.visitAll)(visitor, parsed.tree.rootNodes);
    let newTemplate = template;
    let changedOffset = 0;
    let replacementCount = 0;
    for (let element of visitor.elements) {
        const { start, end, tagName } = element;
        const currentLength = newTemplate.length;
        const templatePart = newTemplate.slice(start + changedOffset, end + changedOffset);
        const convertedTemplate = replaceWithSelfClosingTag(templatePart, tagName);
        // if the template has changed, replace the original template with the new one
        if (convertedTemplate.length !== templatePart.length) {
            newTemplate = replaceTemplate(newTemplate, convertedTemplate, start, end, changedOffset);
            changedOffset += newTemplate.length - currentLength;
            replacementCount++;
        }
    }
    return { migrated: newTemplate, changed: changedOffset !== 0, replacementCount };
}
function replaceWithSelfClosingTag(html, tagName) {
    const pattern = new RegExp(`<\\s*${tagName}\\s*([^>]*?(?:"[^"]*"|'[^']*'|[^'">])*)\\s*>([\\s\\S]*?)<\\s*/\\s*${tagName}\\s*>`, 'gi');
    return html.replace(pattern, (_, content) => `<${tagName}${content ? ` ${content}` : ''} />`);
}
/**
 * Replace the value in the template with the new value based on the start and end position + offset
 */
function replaceTemplate(template, replaceValue, start, end, offset) {
    return template.slice(0, start + offset) + replaceValue + template.slice(end + offset);
}
const ALL_HTML_TAGS = new compiler_1.DomElementSchemaRegistry().allKnownElementNames();
class AngularElementCollector extends compiler_1.RecursiveVisitor {
    constructor() {
        super();
        this.elements = [];
    }
    visitElement(element) {
        const isHtmlTag = ALL_HTML_TAGS.includes(element.name);
        if (isHtmlTag) {
            return;
        }
        const hasNoContent = this.elementHasNoContent(element);
        const hasNoClosingTag = this.elementHasNoClosingTag(element);
        if (hasNoContent && !hasNoClosingTag) {
            this.elements.push({
                tagName: element.name,
                start: element.sourceSpan.start.offset,
                end: element.sourceSpan.end.offset,
            });
        }
        return super.visitElement(element, null);
    }
    elementHasNoContent(element) {
        var _a;
        if (!((_a = element.children) === null || _a === void 0 ? void 0 : _a.length)) {
            return true;
        }
        if (element.children.length === 1) {
            const child = element.children[0];
            return child instanceof compiler_1.Text && /^\s*$/.test(child.value);
        }
        return false;
    }
    elementHasNoClosingTag(element) {
        const { startSourceSpan, endSourceSpan } = element;
        if (!endSourceSpan) {
            return true;
        }
        return (startSourceSpan.start.offset === endSourceSpan.start.offset &&
            startSourceSpan.end.offset === endSourceSpan.end.offset);
    }
}
exports.AngularElementCollector = AngularElementCollector;
