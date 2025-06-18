"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.cases = exports.nakeddefault = exports.switchdefault = exports.nakedcase = exports.switchcase = exports.boundcase = void 0;
exports.migrateCase = migrateCase;
const compiler_1 = require("@angular/compiler");
const types_1 = require("./types");
const util_1 = require("./util");
exports.boundcase = '[ngSwitchCase]';
exports.switchcase = '*ngSwitchCase';
exports.nakedcase = 'ngSwitchCase';
exports.switchdefault = '*ngSwitchDefault';
exports.nakeddefault = 'ngSwitchDefault';
exports.cases = [exports.boundcase, exports.switchcase, exports.nakedcase, exports.switchdefault, exports.nakeddefault];
/**
 * Replaces structural directive ngSwitch instances with new switch.
 * Returns null if the migration failed (e.g. there was a syntax error).
 */
function migrateCase(template) {
    let errors = [];
    let parsed = (0, util_1.parseTemplate)(template);
    if (parsed.tree === undefined) {
        return { migrated: template, errors, changed: false };
    }
    let result = template;
    const visitor = new types_1.ElementCollector(exports.cases);
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
        if (el.attr.name === exports.switchcase || el.attr.name === exports.nakedcase || el.attr.name === exports.boundcase) {
            try {
                migrateResult = migrateNgSwitchCase(el, result, offset);
            }
            catch (error) {
                errors.push({ type: exports.switchcase, error });
            }
        }
        else if (el.attr.name === exports.switchdefault || el.attr.name === exports.nakeddefault) {
            try {
                migrateResult = migrateNgSwitchDefault(el, result, offset);
            }
            catch (error) {
                errors.push({ type: exports.switchdefault, error });
            }
        }
        result = migrateResult.tmpl;
        offset += migrateResult.offsets.pre;
        postOffsets.push(migrateResult.offsets.post);
        nestLevel = el.nestCount;
    }
    const changed = visitor.elements.length > 0;
    return { migrated: result, errors, changed };
}
function migrateNgSwitchCase(etm, tmpl, offset) {
    // includes the mandatory semicolon before as
    const lbString = etm.hasLineBreaks ? '\n' : '';
    const leadingSpace = etm.hasLineBreaks ? '' : ' ';
    // ngSwitchCases with no values results into `case ()` which isn't valid, based off empty
    // value we add quotes instead of generating empty case
    const condition = etm.attr.value.length === 0 ? `''` : etm.attr.value;
    const originals = (0, util_1.getOriginals)(etm, tmpl, offset);
    const { start, middle, end } = (0, util_1.getMainBlock)(etm, tmpl, offset);
    const startBlock = `${types_1.startMarker}${leadingSpace}@case (${condition}) {${leadingSpace}${lbString}${start}`;
    const endBlock = `${end}${lbString}${leadingSpace}}${types_1.endMarker}`;
    const defaultBlock = startBlock + middle + endBlock;
    const updatedTmpl = tmpl.slice(0, etm.start(offset)) + defaultBlock + tmpl.slice(etm.end(offset));
    // this should be the difference between the starting element up to the start of the closing
    // element and the mainblock sans }
    const pre = originals.start.length - startBlock.length;
    const post = originals.end.length - endBlock.length;
    return { tmpl: updatedTmpl, offsets: { pre, post } };
}
function migrateNgSwitchDefault(etm, tmpl, offset) {
    // includes the mandatory semicolon before as
    const lbString = etm.hasLineBreaks ? '\n' : '';
    const leadingSpace = etm.hasLineBreaks ? '' : ' ';
    const originals = (0, util_1.getOriginals)(etm, tmpl, offset);
    const { start, middle, end } = (0, util_1.getMainBlock)(etm, tmpl, offset);
    const startBlock = `${types_1.startMarker}${leadingSpace}@default {${leadingSpace}${lbString}${start}`;
    const endBlock = `${end}${lbString}${leadingSpace}}${types_1.endMarker}`;
    const defaultBlock = startBlock + middle + endBlock;
    const updatedTmpl = tmpl.slice(0, etm.start(offset)) + defaultBlock + tmpl.slice(etm.end(offset));
    // this should be the difference between the starting element up to the start of the closing
    // element and the mainblock sans }
    const pre = originals.start.length - startBlock.length;
    const post = originals.end.length - endBlock.length;
    return { tmpl: updatedTmpl, offsets: { pre, post } };
}
