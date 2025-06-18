"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringPairs = exports.commaSeparatedSyntax = exports.nakedngfor = exports.ngfor = void 0;
exports.migrateFor = migrateFor;
const compiler_1 = require("@angular/compiler");
const types_1 = require("./types");
const util_1 = require("./util");
exports.ngfor = '*ngFor';
exports.nakedngfor = 'ngFor';
const fors = [exports.ngfor, exports.nakedngfor];
exports.commaSeparatedSyntax = new Map([
    ['(', ')'],
    ['{', '}'],
    ['[', ']'],
]);
exports.stringPairs = new Map([
    [`"`, `"`],
    [`'`, `'`],
]);
/**
 * Replaces structural directive ngFor instances with new for.
 * Returns null if the migration failed (e.g. there was a syntax error).
 */
function migrateFor(template) {
    let errors = [];
    let parsed = (0, util_1.parseTemplate)(template);
    if (parsed.tree === undefined) {
        return { migrated: template, errors, changed: false };
    }
    let result = template;
    const visitor = new types_1.ElementCollector(fors);
    (0, compiler_1.visitAll)(visitor, parsed.tree.rootNodes);
    (0, util_1.calculateNesting)(visitor, (0, util_1.hasLineBreaks)(template));
    // this tracks the character shift from different lengths of blocks from
    // the prior directives so as to adjust for nested block replacement during
    // migration. Each block calculates length differences and passes that offset
    // to the next migrating block to adjust character offsets properly.
    let offset = 0;
    let nestLevel = -1;
    let postOffsets = [];
    for (const el of visitor.elements) {
        let migrateResult = { tmpl: result, offsets: { pre: 0, post: 0 } };
        // applies the post offsets after closing
        offset = (0, util_1.reduceNestingOffset)(el, nestLevel, offset, postOffsets);
        try {
            migrateResult = migrateNgFor(el, result, offset);
        }
        catch (error) {
            errors.push({ type: exports.ngfor, error });
        }
        result = migrateResult.tmpl;
        offset += migrateResult.offsets.pre;
        postOffsets.push(migrateResult.offsets.post);
        nestLevel = el.nestCount;
    }
    const changed = visitor.elements.length > 0;
    return { migrated: result, errors, changed };
}
function migrateNgFor(etm, tmpl, offset) {
    if (etm.forAttrs !== undefined) {
        return migrateBoundNgFor(etm, tmpl, offset);
    }
    return migrateStandardNgFor(etm, tmpl, offset);
}
function migrateStandardNgFor(etm, tmpl, offset) {
    const aliasWithEqualRegexp = /=\s*(count|index|first|last|even|odd)/gm;
    const aliasWithAsRegexp = /(count|index|first|last|even|odd)\s+as/gm;
    const aliases = [];
    const lbString = etm.hasLineBreaks ? '\n' : '';
    const parts = getNgForParts(etm.attr.value);
    const originals = (0, util_1.getOriginals)(etm, tmpl, offset);
    // first portion should always be the loop definition prefixed with `let`
    const condition = parts[0].replace('let ', '');
    if (condition.indexOf(' as ') > -1) {
        let errorMessage = `Found an aliased collection on an ngFor: "${condition}".` +
            ' Collection aliasing is not supported with @for.' +
            ' Refactor the code to remove the `as` alias and re-run the migration.';
        throw new Error(errorMessage);
    }
    const loopVar = condition.split(' of ')[0];
    let trackBy = loopVar;
    let aliasedIndex = null;
    let tmplPlaceholder = '';
    for (let i = 1; i < parts.length; i++) {
        const part = parts[i].trim();
        if (part.startsWith('trackBy:')) {
            // build trackby value
            const trackByFn = part.replace('trackBy:', '').trim();
            trackBy = `${trackByFn}($index, ${loopVar})`;
        }
        // template
        if (part.startsWith('template:')) {
            // use an alternate placeholder here to avoid conflicts
            tmplPlaceholder = (0, util_1.getPlaceholder)(part.split(':')[1].trim(), util_1.PlaceholderKind.Alternate);
        }
        // aliases
        // declared with `let myIndex = index`
        if (part.match(aliasWithEqualRegexp)) {
            // 'let myIndex = index' -> ['let myIndex', 'index']
            const aliasParts = part.split('=');
            const aliasedName = aliasParts[0].replace('let', '').trim();
            const originalName = aliasParts[1].trim();
            if (aliasedName !== '$' + originalName) {
                // -> 'let myIndex = $index'
                aliases.push(` let ${aliasedName} = $${originalName}`);
            }
            // if the aliased variable is the index, then we store it
            if (originalName === 'index') {
                // 'let myIndex' -> 'myIndex'
                aliasedIndex = aliasedName;
            }
        }
        // declared with `index as myIndex`
        if (part.match(aliasWithAsRegexp)) {
            // 'index    as   myIndex' -> ['index', 'myIndex']
            const aliasParts = part.split(/\s+as\s+/);
            const originalName = aliasParts[0].trim();
            const aliasedName = aliasParts[1].trim();
            if (aliasedName !== '$' + originalName) {
                // -> 'let myIndex = $index'
                aliases.push(` let ${aliasedName} = $${originalName}`);
            }
            // if the aliased variable is the index, then we store it
            if (originalName === 'index') {
                aliasedIndex = aliasedName;
            }
        }
    }
    // if an alias has been defined for the index, then the trackBy function must use it
    if (aliasedIndex !== null && trackBy !== loopVar) {
        // byId($index, user) -> byId(i, user)
        trackBy = trackBy.replace('$index', aliasedIndex);
    }
    const aliasStr = aliases.length > 0 ? `;${aliases.join(';')}` : '';
    let startBlock = `${types_1.startMarker}@for (${condition}; track ${trackBy}${aliasStr}) {${lbString}`;
    let endBlock = `${lbString}}${types_1.endMarker}`;
    let forBlock = '';
    if (tmplPlaceholder !== '') {
        startBlock = startBlock + tmplPlaceholder;
        forBlock = startBlock + endBlock;
    }
    else {
        const { start, middle, end } = (0, util_1.getMainBlock)(etm, tmpl, offset);
        startBlock += start;
        endBlock = end + endBlock;
        forBlock = startBlock + middle + endBlock;
    }
    const updatedTmpl = tmpl.slice(0, etm.start(offset)) + forBlock + tmpl.slice(etm.end(offset));
    const pre = originals.start.length - startBlock.length;
    const post = originals.end.length - endBlock.length;
    return { tmpl: updatedTmpl, offsets: { pre, post } };
}
function migrateBoundNgFor(etm, tmpl, offset) {
    const forAttrs = etm.forAttrs;
    const aliasAttrs = etm.aliasAttrs;
    const aliasMap = aliasAttrs.aliases;
    const originals = (0, util_1.getOriginals)(etm, tmpl, offset);
    const condition = `${aliasAttrs.item} of ${forAttrs.forOf}`;
    const aliases = [];
    let aliasedIndex = '$index';
    for (const [key, val] of aliasMap) {
        aliases.push(` let ${key.trim()} = $${val}`);
        if (val.trim() === 'index') {
            aliasedIndex = key;
        }
    }
    const aliasStr = aliases.length > 0 ? `;${aliases.join(';')}` : '';
    let trackBy = aliasAttrs.item;
    if (forAttrs.trackBy !== '') {
        // build trackby value
        trackBy = `${forAttrs.trackBy.trim()}(${aliasedIndex}, ${aliasAttrs.item})`;
    }
    const { start, middle, end } = (0, util_1.getMainBlock)(etm, tmpl, offset);
    const startBlock = `${types_1.startMarker}@for (${condition}; track ${trackBy}${aliasStr}) {\n${start}`;
    const endBlock = `${end}\n}${types_1.endMarker}`;
    const forBlock = startBlock + middle + endBlock;
    const updatedTmpl = tmpl.slice(0, etm.start(offset)) + forBlock + tmpl.slice(etm.end(offset));
    const pre = originals.start.length - startBlock.length;
    const post = originals.end.length - endBlock.length;
    return { tmpl: updatedTmpl, offsets: { pre, post } };
}
function getNgForParts(expression) {
    const parts = [];
    const commaSeparatedStack = [];
    const stringStack = [];
    let current = '';
    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];
        const isInString = stringStack.length === 0;
        const isInCommaSeparated = commaSeparatedStack.length === 0;
        // Any semicolon is a delimiter, as well as any comma outside
        // of comma-separated syntax, as long as they're outside of a string.
        if (isInString &&
            current.length > 0 &&
            (char === ';' || (char === ',' && isInCommaSeparated))) {
            parts.push(current);
            current = '';
            continue;
        }
        if (stringStack.length > 0 && stringStack[stringStack.length - 1] === char) {
            stringStack.pop();
        }
        else if (exports.stringPairs.has(char)) {
            stringStack.push(exports.stringPairs.get(char));
        }
        if (exports.commaSeparatedSyntax.has(char)) {
            commaSeparatedStack.push(exports.commaSeparatedSyntax.get(char));
        }
        else if (commaSeparatedStack.length > 0 &&
            commaSeparatedStack[commaSeparatedStack.length - 1] === char) {
            commaSeparatedStack.pop();
        }
        current += char;
    }
    if (current.length > 0) {
        parts.push(current);
    }
    return parts;
}
