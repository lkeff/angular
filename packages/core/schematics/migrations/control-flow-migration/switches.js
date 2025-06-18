"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ngswitch = void 0;
exports.migrateSwitch = migrateSwitch;
const compiler_1 = require("@angular/compiler");
const cases_1 = require("./cases");
const types_1 = require("./types");
const util_1 = require("./util");
exports.ngswitch = '[ngSwitch]';
const switches = [exports.ngswitch];
/**
 * Replaces structural directive ngSwitch instances with new switch.
 * Returns null if the migration failed (e.g. there was a syntax error).
 */
function migrateSwitch(template) {
    let errors = [];
    let parsed = (0, util_1.parseTemplate)(template);
    if (parsed.tree === undefined) {
        return { migrated: template, errors, changed: false };
    }
    let result = template;
    const visitor = new types_1.ElementCollector(switches);
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
        if (el.attr.name === exports.ngswitch) {
            try {
                migrateResult = migrateNgSwitch(el, result, offset);
            }
            catch (error) {
                errors.push({ type: exports.ngswitch, error });
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
function assertValidSwitchStructure(children) {
    for (const child of children) {
        if (child instanceof compiler_1.Text && child.value.trim() !== '') {
            throw new Error(`Text node: "${child.value}" would result in invalid migrated @switch block structure. ` +
                `@switch can only have @case or @default as children.`);
        }
        else if (child instanceof compiler_1.Element) {
            let hasCase = false;
            for (const attr of child.attrs) {
                if (cases_1.cases.includes(attr.name)) {
                    hasCase = true;
                }
            }
            if (!hasCase) {
                throw new Error(`Element node: "${child.name}" would result in invalid migrated @switch block structure. ` +
                    `@switch can only have @case or @default as children.`);
            }
        }
    }
}
function migrateNgSwitch(etm, tmpl, offset) {
    const lbString = etm.hasLineBreaks ? '\n' : '';
    const condition = etm.attr.value;
    const originals = (0, util_1.getOriginals)(etm, tmpl, offset);
    assertValidSwitchStructure(originals.childNodes);
    const { start, middle, end } = (0, util_1.getMainBlock)(etm, tmpl, offset);
    const startBlock = `${types_1.startMarker}${start}${lbString}@switch (${condition}) {`;
    const endBlock = `}${lbString}${end}${types_1.endMarker}`;
    const switchBlock = startBlock + middle + endBlock;
    const updatedTmpl = tmpl.slice(0, etm.start(offset)) + switchBlock + tmpl.slice(etm.end(offset));
    // this should be the difference between the starting element up to the start of the closing
    // element and the mainblock sans }
    const pre = originals.start.length - startBlock.length;
    const post = originals.end.length - endBlock.length;
    return { tmpl: updatedTmpl, offsets: { pre, post } };
}
