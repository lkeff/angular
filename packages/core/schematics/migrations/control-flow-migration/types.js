"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateCollector = exports.ElementCollector = exports.i18nCollector = exports.CommonCollector = exports.AnalyzedFile = exports.Template = exports.ElementToMigrate = exports.importWithCommonRemovals = exports.importRemovals = exports.endI18nMarker = exports.startI18nMarker = exports.endMarker = exports.startMarker = exports.nakedngfor = exports.boundngifthen = exports.boundngifthenelse = exports.boundngifelse = exports.ngtemplate = void 0;
const compiler_1 = require("@angular/compiler");
const identifier_lookup_1 = require("./identifier-lookup");
exports.ngtemplate = 'ng-template';
exports.boundngifelse = '[ngIfElse]';
exports.boundngifthenelse = '[ngIfThenElse]';
exports.boundngifthen = '[ngIfThen]';
exports.nakedngfor = 'ngFor';
exports.startMarker = '◬';
exports.endMarker = '✢';
exports.startI18nMarker = '⚈';
exports.endI18nMarker = '⚉';
exports.importRemovals = [
    'NgIf',
    'NgIfElse',
    'NgIfThenElse',
    'NgFor',
    'NgForOf',
    'NgForTrackBy',
    'NgSwitch',
    'NgSwitchCase',
    'NgSwitchDefault',
];
exports.importWithCommonRemovals = [...exports.importRemovals, 'CommonModule'];
function allFormsOf(selector) {
    return [selector, `*${selector}`, `[${selector}]`];
}
const commonModuleDirectives = new Set([
    ...allFormsOf('ngComponentOutlet'),
    ...allFormsOf('ngTemplateOutlet'),
    ...allFormsOf('ngClass'),
    ...allFormsOf('ngPlural'),
    ...allFormsOf('ngPluralCase'),
    ...allFormsOf('ngStyle'),
    ...allFormsOf('ngTemplateOutlet'),
    ...allFormsOf('ngComponentOutlet'),
    '[NgForOf]',
    '[NgForTrackBy]',
    '[ngIfElse]',
    '[ngIfThenElse]',
]);
function pipeMatchRegExpFor(name) {
    return new RegExp(`\\|\\s*${name}`);
}
const commonModulePipes = [
    'date',
    'async',
    'currency',
    'number',
    'i18nPlural',
    'i18nSelect',
    'json',
    'keyvalue',
    'slice',
    'lowercase',
    'uppercase',
    'titlecase',
    'percent',
].map((name) => pipeMatchRegExpFor(name));
/**
 * Represents an element with a migratable attribute
 */
class ElementToMigrate {
    constructor(el, attr, elseAttr = undefined, thenAttr = undefined, forAttrs = undefined, aliasAttrs = undefined) {
        this.nestCount = 0;
        this.hasLineBreaks = false;
        this.el = el;
        this.attr = attr;
        this.elseAttr = elseAttr;
        this.thenAttr = thenAttr;
        this.forAttrs = forAttrs;
        this.aliasAttrs = aliasAttrs;
    }
    normalizeConditionString(value) {
        value = this.insertSemicolon(value, value.indexOf(' else '));
        value = this.insertSemicolon(value, value.indexOf(' then '));
        value = this.insertSemicolon(value, value.indexOf(' let '));
        return value.replace(';;', ';');
    }
    insertSemicolon(str, ix) {
        return ix > -1 ? `${str.slice(0, ix)};${str.slice(ix)}` : str;
    }
    getCondition() {
        const chunks = this.normalizeConditionString(this.attr.value).split(';');
        let condition = chunks[0];
        // checks for case of no usage of `;` in if else / if then else
        const elseIx = condition.indexOf(' else ');
        const thenIx = condition.indexOf(' then ');
        if (thenIx > -1) {
            condition = condition.slice(0, thenIx);
        }
        else if (elseIx > -1) {
            condition = condition.slice(0, elseIx);
        }
        let letVar = chunks.find((c) => c.search(/\s*let\s/) > -1);
        return condition + (letVar ? ';' + letVar : '');
    }
    getTemplateName(targetStr, secondStr) {
        const targetLocation = this.attr.value.indexOf(targetStr);
        const secondTargetLocation = secondStr ? this.attr.value.indexOf(secondStr) : undefined;
        let templateName = this.attr.value.slice(targetLocation + targetStr.length, secondTargetLocation);
        if (templateName.startsWith(':')) {
            templateName = templateName.slice(1).trim();
        }
        return templateName.split(';')[0].trim();
    }
    getValueEnd(offset) {
        return ((this.attr.valueSpan ? this.attr.valueSpan.end.offset + 1 : this.attr.keySpan.end.offset) -
            offset);
    }
    hasChildren() {
        return this.el.children.length > 0;
    }
    getChildSpan(offset) {
        const childStart = this.el.children[0].sourceSpan.start.offset - offset;
        const childEnd = this.el.children[this.el.children.length - 1].sourceSpan.end.offset - offset;
        return { childStart, childEnd };
    }
    shouldRemoveElseAttr() {
        return ((this.el.name === 'ng-template' || this.el.name === 'ng-container') &&
            this.elseAttr !== undefined);
    }
    getElseAttrStr() {
        if (this.elseAttr !== undefined) {
            const elseValStr = this.elseAttr.value !== '' ? `="${this.elseAttr.value}"` : '';
            return `${this.elseAttr.name}${elseValStr}`;
        }
        return '';
    }
    start(offset) {
        var _a;
        return ((_a = this.el.sourceSpan) === null || _a === void 0 ? void 0 : _a.start.offset) - offset;
    }
    end(offset) {
        var _a;
        return ((_a = this.el.sourceSpan) === null || _a === void 0 ? void 0 : _a.end.offset) - offset;
    }
    length() {
        var _a, _b;
        return ((_a = this.el.sourceSpan) === null || _a === void 0 ? void 0 : _a.end.offset) - ((_b = this.el.sourceSpan) === null || _b === void 0 ? void 0 : _b.start.offset);
    }
}
exports.ElementToMigrate = ElementToMigrate;
/**
 * Represents an ng-template inside a template being migrated to new control flow
 */
class Template {
    constructor(el, name, i18n) {
        this.count = 0;
        this.contents = '';
        this.children = '';
        this.i18n = null;
        this.el = el;
        this.name = name;
        this.attributes = el.attrs;
        this.i18n = i18n;
    }
    get isNgTemplateOutlet() {
        return this.attributes.find((attr) => attr.name === '*ngTemplateOutlet') !== undefined;
    }
    get outletContext() {
        const letVar = this.attributes.find((attr) => attr.name.startsWith('let-'));
        return letVar ? `; context: {$implicit: ${letVar.name.split('-')[1]}}` : '';
    }
    generateTemplateOutlet() {
        var _a;
        const attr = this.attributes.find((attr) => attr.name === '*ngTemplateOutlet');
        const outletValue = (_a = attr === null || attr === void 0 ? void 0 : attr.value) !== null && _a !== void 0 ? _a : this.name.slice(1);
        return `<ng-container *ngTemplateOutlet="${outletValue}${this.outletContext}"></ng-container>`;
    }
    generateContents(tmpl) {
        this.contents = tmpl.slice(this.el.sourceSpan.start.offset, this.el.sourceSpan.end.offset);
        this.children = '';
        if (this.el.children.length > 0) {
            this.children = tmpl.slice(this.el.children[0].sourceSpan.start.offset, this.el.children[this.el.children.length - 1].sourceSpan.end.offset);
        }
    }
}
exports.Template = Template;
/** Represents a file that was analyzed by the migration. */
class AnalyzedFile {
    constructor(sourceFile) {
        this.ranges = [];
        this.removeCommonModule = false;
        this.canRemoveImports = false;
        this.importRanges = [];
        this.templateRanges = [];
        this.sourceFile = sourceFile;
    }
    /** Returns the ranges in the order in which they should be migrated. */
    getSortedRanges() {
        // templates first for checking on whether certain imports can be safely removed
        this.templateRanges = this.ranges
            .slice()
            .filter((x) => x.type === 'template' || x.type === 'templateUrl')
            .sort((aStart, bStart) => bStart.start - aStart.start);
        this.importRanges = this.ranges
            .slice()
            .filter((x) => x.type === 'importDecorator' || x.type === 'importDeclaration')
            .sort((aStart, bStart) => bStart.start - aStart.start);
        return [...this.templateRanges, ...this.importRanges];
    }
    /**
     * Adds a text range to an `AnalyzedFile`.
     * @param path Path of the file.
     * @param analyzedFiles Map keeping track of all the analyzed files.
     * @param range Range to be added.
     */
    static addRange(path, sourceFile, analyzedFiles, range) {
        let analysis = analyzedFiles.get(path);
        if (!analysis) {
            analysis = new AnalyzedFile(sourceFile);
            analyzedFiles.set(path, analysis);
        }
        const duplicate = analysis.ranges.find((current) => current.start === range.start && current.end === range.end);
        if (!duplicate) {
            analysis.ranges.push(range);
        }
    }
    /**
     * This verifies whether a component class is safe to remove module imports.
     * It is only run on .ts files.
     */
    verifyCanRemoveImports() {
        const importDeclaration = this.importRanges.find((r) => r.type === 'importDeclaration');
        const instances = (0, identifier_lookup_1.lookupIdentifiersInSourceFile)(this.sourceFile, exports.importWithCommonRemovals);
        let foundImportDeclaration = false;
        let count = 0;
        for (let range of this.importRanges) {
            for (let instance of instances) {
                if (instance.getStart() >= range.start && instance.getEnd() <= range.end) {
                    if (range === importDeclaration) {
                        foundImportDeclaration = true;
                    }
                    count++;
                }
            }
        }
        if (instances.size !== count && importDeclaration !== undefined && foundImportDeclaration) {
            importDeclaration.remove = false;
        }
    }
}
exports.AnalyzedFile = AnalyzedFile;
/** Finds all non-control flow elements from common module. */
class CommonCollector extends compiler_1.RecursiveVisitor {
    constructor() {
        super(...arguments);
        this.count = 0;
    }
    visitElement(el) {
        if (el.attrs.length > 0) {
            for (const attr of el.attrs) {
                if (this.hasDirectives(attr.name) || this.hasPipes(attr.value)) {
                    this.count++;
                }
            }
        }
        super.visitElement(el, null);
    }
    visitBlock(ast) {
        for (const blockParam of ast.parameters) {
            if (this.hasPipes(blockParam.expression)) {
                this.count++;
            }
        }
        super.visitBlock(ast, null);
    }
    visitText(ast) {
        if (this.hasPipes(ast.value)) {
            this.count++;
        }
    }
    visitLetDeclaration(decl) {
        if (this.hasPipes(decl.value)) {
            this.count++;
        }
        super.visitLetDeclaration(decl, null);
    }
    hasDirectives(input) {
        return commonModuleDirectives.has(input);
    }
    hasPipes(input) {
        return commonModulePipes.some((regexp) => regexp.test(input));
    }
}
exports.CommonCollector = CommonCollector;
/** Finds all elements that represent i18n blocks. */
class i18nCollector extends compiler_1.RecursiveVisitor {
    constructor() {
        super(...arguments);
        this.elements = [];
    }
    visitElement(el) {
        if (el.attrs.find((a) => a.name === 'i18n') !== undefined) {
            this.elements.push(el);
        }
        super.visitElement(el, null);
    }
}
exports.i18nCollector = i18nCollector;
/** Finds all elements with ngif structural directives. */
class ElementCollector extends compiler_1.RecursiveVisitor {
    constructor(_attributes = []) {
        super();
        this._attributes = _attributes;
        this.elements = [];
    }
    visitElement(el) {
        if (el.attrs.length > 0) {
            for (const attr of el.attrs) {
                if (this._attributes.includes(attr.name)) {
                    const elseAttr = el.attrs.find((x) => x.name === exports.boundngifelse);
                    const thenAttr = el.attrs.find((x) => x.name === exports.boundngifthenelse || x.name === exports.boundngifthen);
                    const forAttrs = attr.name === exports.nakedngfor ? this.getForAttrs(el) : undefined;
                    const aliasAttrs = this.getAliasAttrs(el);
                    this.elements.push(new ElementToMigrate(el, attr, elseAttr, thenAttr, forAttrs, aliasAttrs));
                }
            }
        }
        super.visitElement(el, null);
    }
    getForAttrs(el) {
        let trackBy = '';
        let forOf = '';
        for (const attr of el.attrs) {
            if (attr.name === '[ngForTrackBy]') {
                trackBy = attr.value;
            }
            if (attr.name === '[ngForOf]') {
                forOf = attr.value;
            }
        }
        return { forOf, trackBy };
    }
    getAliasAttrs(el) {
        const aliases = new Map();
        let item = '';
        for (const attr of el.attrs) {
            if (attr.name.startsWith('let-')) {
                if (attr.value === '') {
                    // item
                    item = attr.name.replace('let-', '');
                }
                else {
                    // alias
                    aliases.set(attr.name.replace('let-', ''), attr.value);
                }
            }
        }
        return { item, aliases };
    }
}
exports.ElementCollector = ElementCollector;
/** Finds all elements with ngif structural directives. */
class TemplateCollector extends compiler_1.RecursiveVisitor {
    constructor() {
        super(...arguments);
        this.elements = [];
        this.templates = new Map();
    }
    visitElement(el) {
        if (el.name === exports.ngtemplate) {
            let i18n = null;
            let templateAttr = null;
            for (const attr of el.attrs) {
                if (attr.name === 'i18n') {
                    i18n = attr;
                }
                if (attr.name.startsWith('#')) {
                    templateAttr = attr;
                }
            }
            if (templateAttr !== null && !this.templates.has(templateAttr.name)) {
                this.templates.set(templateAttr.name, new Template(el, templateAttr.name, i18n));
                this.elements.push(new ElementToMigrate(el, templateAttr));
            }
            else if (templateAttr !== null) {
                throw new Error(`A duplicate ng-template name "${templateAttr.name}" was found. ` +
                    `The control flow migration requires unique ng-template names within a component.`);
            }
        }
        super.visitElement(el, null);
    }
}
exports.TemplateCollector = TemplateCollector;
