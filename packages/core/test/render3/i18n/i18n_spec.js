"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../../../src/core");
const i18n_parse_1 = require("../../../src/render3/i18n/i18n_parse");
const i18n_util_1 = require("../../../src/render3/i18n/i18n_util");
const all_1 = require("../../../src/render3/instructions/all");
const i18n_1 = require("../../../src/render3/interfaces/i18n");
const view_1 = require("../../../src/render3/interfaces/view");
const matchers_1 = require("../matchers");
const utils_1 = require("../utils");
const view_fixture_1 = require("../view_fixture");
describe('Runtime i18n', () => {
    describe('getTranslationForTemplate', () => {
        it('should crop messages for the selected template', () => {
            let message = `simple text`;
            expect((0, i18n_parse_1.getTranslationForTemplate)(message, -1)).toEqual(message);
            message = `Hello �0�!`;
            expect((0, i18n_parse_1.getTranslationForTemplate)(message, -1)).toEqual(message);
            message = `Hello �#2��0��/#2�!`;
            expect((0, i18n_parse_1.getTranslationForTemplate)(message, -1)).toEqual(message);
            // Embedded sub-templates
            message = `�0� is rendered as: �*2:1�before�*1:2�middle�/*1:2�after�/*2:1�!`;
            expect((0, i18n_parse_1.getTranslationForTemplate)(message, -1)).toEqual('�0� is rendered as: �*2:1��/*2:1�!');
            expect((0, i18n_parse_1.getTranslationForTemplate)(message, 1)).toEqual('before�*1:2��/*1:2�after');
            expect((0, i18n_parse_1.getTranslationForTemplate)(message, 2)).toEqual('middle');
            // Embedded & sibling sub-templates
            message = `�0� is rendered as: �*2:1�before�*1:2�middle�/*1:2�after�/*2:1� and also �*4:3�before�*1:4�middle�/*1:4�after�/*4:3�!`;
            expect((0, i18n_parse_1.getTranslationForTemplate)(message, -1)).toEqual('�0� is rendered as: �*2:1��/*2:1� and also �*4:3��/*4:3�!');
            expect((0, i18n_parse_1.getTranslationForTemplate)(message, 1)).toEqual('before�*1:2��/*1:2�after');
            expect((0, i18n_parse_1.getTranslationForTemplate)(message, 2)).toEqual('middle');
            expect((0, i18n_parse_1.getTranslationForTemplate)(message, 3)).toEqual('before�*1:4��/*1:4�after');
            expect((0, i18n_parse_1.getTranslationForTemplate)(message, 4)).toEqual('middle');
        });
        it('should throw if the template is malformed', () => {
            const message = `�*2:1�message!`;
            expect(() => (0, i18n_parse_1.getTranslationForTemplate)(message, -1)).toThrowError(/Tag mismatch/);
        });
    });
    let tView;
    function getOpCodes(messageOrAtrs, createTemplate, decls, index) {
        const fixture = new view_fixture_1.ViewFixture({ decls, consts: [messageOrAtrs] });
        fixture.enterView();
        createTemplate();
        // Make `tView` available for tests.
        tView = fixture.tView;
        const opCodes = fixture.tView.data[index];
        view_fixture_1.ViewFixture.cleanUp();
        return opCodes;
    }
    describe('i18nStart', () => {
        it('for text', () => {
            const message = 'simple text';
            const nbConsts = 1;
            const index = 1;
            const opCodes = getOpCodes(message, () => {
                (0, all_1.ɵɵelementStart)(0, 'div');
                (0, core_1.ɵɵi18nStart)(index, 0);
                (0, all_1.ɵɵelementEnd)();
            }, nbConsts, view_1.HEADER_OFFSET + index);
            expect(opCodes).toEqual({
                create: (0, utils_1.matchDebug)([
                    `lView[${view_1.HEADER_OFFSET + 1}] = document.createText("simple text");`,
                    `parent.appendChild(lView[${view_1.HEADER_OFFSET + 1}]);`,
                ]),
                update: [],
                ast: [{ kind: 0, index: view_1.HEADER_OFFSET + 1 }],
                parentTNodeIndex: view_1.HEADER_OFFSET,
            });
        });
        it('for elements', () => {
            const message = `Hello �#2�world�/#2� and �#3�universe�/#3�!`;
            // Template: `<div>Hello <div>world</div> and <span>universe</span>!`
            // 3 consts for the 2 divs and 1 span + 1 const for `i18nStart` = 4 consts
            const nbConsts = 4;
            const index = 1;
            const opCodes = getOpCodes(message, () => {
                (0, all_1.ɵɵelementStart)(0, 'div');
                (0, core_1.ɵɵi18nStart)(index, 0);
                (0, all_1.ɵɵelementEnd)();
            }, nbConsts, view_1.HEADER_OFFSET + index);
            expect(opCodes).toEqual({
                create: (0, utils_1.matchDebug)([
                    `lView[${view_1.HEADER_OFFSET + 4}] = document.createText("Hello ");`,
                    `parent.appendChild(lView[${view_1.HEADER_OFFSET + 4}]);`,
                    `lView[${view_1.HEADER_OFFSET + 5}] = document.createText("world");`,
                    `lView[${view_1.HEADER_OFFSET + 6}] = document.createText(" and ");`,
                    `parent.appendChild(lView[${view_1.HEADER_OFFSET + 6}]);`,
                    `lView[${view_1.HEADER_OFFSET + 7}] = document.createText("universe");`,
                    `lView[${view_1.HEADER_OFFSET + 8}] = document.createText("!");`,
                    `parent.appendChild(lView[${view_1.HEADER_OFFSET + 8}]);`,
                ]),
                update: [],
                ast: [
                    { kind: 0, index: view_1.HEADER_OFFSET + 4 },
                    {
                        kind: 2,
                        index: view_1.HEADER_OFFSET + 2,
                        children: [{ kind: 0, index: view_1.HEADER_OFFSET + 5 }],
                        type: 0,
                    },
                    { kind: 0, index: view_1.HEADER_OFFSET + 6 },
                    {
                        kind: 2,
                        index: view_1.HEADER_OFFSET + 3,
                        children: [{ kind: 0, index: view_1.HEADER_OFFSET + 7 }],
                        type: 0,
                    },
                    { kind: 0, index: view_1.HEADER_OFFSET + 8 },
                ],
                parentTNodeIndex: view_1.HEADER_OFFSET,
            });
        });
        it('for simple bindings', () => {
            const message = `Hello �0�!`;
            const nbConsts = 2;
            const index = 1;
            const opCodes = getOpCodes(message, () => {
                (0, all_1.ɵɵelementStart)(0, 'div');
                (0, core_1.ɵɵi18nStart)(index, 0);
                (0, all_1.ɵɵelementEnd)();
            }, nbConsts, view_1.HEADER_OFFSET + index);
            expect(opCodes.update.debug).toEqual([
                `if (mask & 0b1) { (lView[${view_1.HEADER_OFFSET + 2}] as Text).textContent = \`Hello \${lView[i-1]}!\`; }`,
            ]);
            expect(opCodes).toEqual({
                create: (0, utils_1.matchDebug)([
                    `lView[${view_1.HEADER_OFFSET + 2}] = document.createText("");`,
                    `parent.appendChild(lView[${view_1.HEADER_OFFSET + 2}]);`,
                ]),
                update: (0, utils_1.matchDebug)([
                    `if (mask & 0b1) { (lView[${view_1.HEADER_OFFSET + 2}] as Text).textContent = \`Hello \${lView[i-1]}!\`; }`,
                ]),
                ast: [{ kind: 0, index: view_1.HEADER_OFFSET + 2 }],
                parentTNodeIndex: view_1.HEADER_OFFSET,
            });
        });
        it('for multiple bindings', () => {
            const message = `Hello �0� and �1�, again �0�!`;
            const nbConsts = 2;
            const index = 1;
            const opCodes = getOpCodes(message, () => {
                (0, all_1.ɵɵelementStart)(0, 'div');
                (0, core_1.ɵɵi18nStart)(index, 0);
                (0, all_1.ɵɵelementEnd)();
            }, nbConsts, view_1.HEADER_OFFSET + index);
            expect(opCodes).toEqual({
                create: (0, utils_1.matchDebug)([
                    `lView[${view_1.HEADER_OFFSET + 2}] = document.createText("");`,
                    `parent.appendChild(lView[${view_1.HEADER_OFFSET + 2}]);`,
                ]),
                update: (0, utils_1.matchDebug)([
                    `if (mask & 0b11) { (lView[${view_1.HEADER_OFFSET + 2}] as Text).textContent = \`Hello \${lView[i-1]} and \${lView[i-2]}, again \${lView[i-1]}!\`; }`,
                ]),
                ast: [{ kind: 0, index: view_1.HEADER_OFFSET + 2 }],
                parentTNodeIndex: view_1.HEADER_OFFSET,
            });
        });
        it('for sub-templates', () => {
            // Template:
            // <div>
            //   {{value}} is rendered as:
            //   <span *ngIf>
            //     before <b *ngIf>middle</b> after
            //   </span>
            //   !
            // </div>
            const message = `�0� is rendered as: �*2:1��#1:1�before�*2:2��#1:2�middle�/#1:2��/*2:2�after�/#1:1��/*2:1�!`;
            /**** Root template ****/
            // �0� is rendered as: �*2:1��/*2:1�!
            let nbConsts = 3;
            let index = 1;
            let opCodes = getOpCodes(message, () => {
                (0, all_1.ɵɵelementStart)(0, 'div');
                (0, core_1.ɵɵi18nStart)(index, 0);
                (0, all_1.ɵɵelementEnd)();
            }, nbConsts, view_1.HEADER_OFFSET + index);
            expect(opCodes).toEqual({
                create: (0, utils_1.matchDebug)([
                    `lView[${view_1.HEADER_OFFSET + 3}] = document.createText("");`,
                    `parent.appendChild(lView[${view_1.HEADER_OFFSET + 3}]);`,
                    `lView[${view_1.HEADER_OFFSET + 4}] = document.createText("!");`,
                    `parent.appendChild(lView[${view_1.HEADER_OFFSET + 4}]);`,
                ]),
                update: (0, utils_1.matchDebug)([
                    `if (mask & 0b1) { (lView[${view_1.HEADER_OFFSET + 3}] as Text).textContent = \`\${lView[i-1]} is rendered as: \`; }`,
                ]),
                ast: [
                    { kind: 0, index: view_1.HEADER_OFFSET + 3 },
                    { kind: 2, index: view_1.HEADER_OFFSET + 2, children: [], type: 1 },
                    { kind: 0, index: view_1.HEADER_OFFSET + 4 },
                ],
                parentTNodeIndex: view_1.HEADER_OFFSET,
            });
            /**** First sub-template ****/
            // �#1:1�before�*2:2�middle�/*2:2�after�/#1:1�
            nbConsts = 3;
            index = 1;
            opCodes = getOpCodes(message, () => {
                (0, all_1.ɵɵelementStart)(0, 'div');
                (0, core_1.ɵɵi18nStart)(index, 0, 1);
            }, nbConsts, index + view_1.HEADER_OFFSET);
            expect(opCodes).toEqual({
                create: (0, utils_1.matchDebug)([
                    `lView[${view_1.HEADER_OFFSET + 3}] = document.createText("before");`,
                    `lView[${view_1.HEADER_OFFSET + 4}] = document.createText("after");`,
                ]),
                update: [],
                ast: [
                    {
                        kind: 2,
                        index: view_1.HEADER_OFFSET + 1,
                        children: [
                            { kind: 0, index: view_1.HEADER_OFFSET + 3 },
                            { kind: 2, index: view_1.HEADER_OFFSET + 2, children: [], type: 1 },
                            { kind: 0, index: view_1.HEADER_OFFSET + 4 },
                        ],
                        type: 0,
                    },
                ],
                parentTNodeIndex: view_1.HEADER_OFFSET,
            });
            /**** Second sub-template ****/
            // middle
            nbConsts = 2;
            index = 1;
            opCodes = getOpCodes(message, () => {
                (0, all_1.ɵɵelementStart)(0, 'div');
                (0, core_1.ɵɵi18nStart)(index, 0, 2);
            }, nbConsts, index + view_1.HEADER_OFFSET);
            expect(opCodes).toEqual({
                create: (0, utils_1.matchDebug)([`lView[${view_1.HEADER_OFFSET + 2}] = document.createText("middle");`]),
                update: [],
                ast: [
                    {
                        kind: 2,
                        index: view_1.HEADER_OFFSET + 1,
                        children: [{ kind: 0, index: view_1.HEADER_OFFSET + 2 }],
                        type: 0,
                    },
                ],
                parentTNodeIndex: view_1.HEADER_OFFSET,
            });
        });
        it('for ICU expressions', () => {
            const message = `{�0�, plural,
        =0 {no <b title="none">emails</b>!}
        =1 {one <i>email</i>}
        other {�0� <span title="�1�">emails</span>}
      }`;
            const nbConsts = 2;
            const index = 1;
            const opCodes = getOpCodes(message, () => {
                (0, all_1.ɵɵelementStart)(0, 'div');
                (0, core_1.ɵɵi18nStart)(index, 0);
                (0, all_1.ɵɵelementEnd)();
            }, nbConsts, view_1.HEADER_OFFSET + index);
            expect(opCodes).toEqual({
                create: (0, utils_1.matchDebug)([
                    `lView[${view_1.HEADER_OFFSET + 2}] = document.createComment("ICU ${view_1.HEADER_OFFSET + 1}:0");`,
                    `parent.appendChild(lView[${view_1.HEADER_OFFSET + 2}]);`,
                ]),
                update: (0, utils_1.matchDebug)([
                    `if (mask & 0b1) { icuSwitchCase(${view_1.HEADER_OFFSET + 2}, \`\${lView[i-1]}\`); }`,
                    `if (mask & 0b1) { icuUpdateCase(${view_1.HEADER_OFFSET + 2}); }`,
                ]),
                ast: [
                    {
                        kind: 3,
                        index: view_1.HEADER_OFFSET + 2,
                        cases: [
                            [
                                { kind: 0, index: view_1.HEADER_OFFSET + 4 },
                                {
                                    kind: 1,
                                    index: view_1.HEADER_OFFSET + 5,
                                    children: [{ kind: 0, index: view_1.HEADER_OFFSET + 6 }],
                                },
                                { kind: 0, index: view_1.HEADER_OFFSET + 7 },
                            ],
                            [
                                { kind: 0, index: view_1.HEADER_OFFSET + 8 },
                                {
                                    kind: 1,
                                    index: view_1.HEADER_OFFSET + 9,
                                    children: [{ kind: 0, index: view_1.HEADER_OFFSET + 10 }],
                                },
                            ],
                            [
                                { kind: 0, index: view_1.HEADER_OFFSET + 11 },
                                {
                                    kind: 1,
                                    index: view_1.HEADER_OFFSET + 12,
                                    children: [{ kind: 0, index: view_1.HEADER_OFFSET + 13 }],
                                },
                            ],
                        ],
                        currentCaseLViewIndex: view_1.HEADER_OFFSET + 3,
                    },
                ],
                parentTNodeIndex: view_1.HEADER_OFFSET,
            });
            expect((0, i18n_util_1.getTIcu)(tView, view_1.HEADER_OFFSET + 2)).toEqual({
                type: 1,
                currentCaseLViewIndex: view_1.HEADER_OFFSET + 3,
                anchorIdx: view_1.HEADER_OFFSET + 2,
                cases: ['0', '1', 'other'],
                create: [
                    (0, utils_1.matchDebug)([
                        `lView[${view_1.HEADER_OFFSET + 4}] = document.createTextNode("no ")`,
                        `(lView[${view_1.HEADER_OFFSET + 0}] as Element).appendChild(lView[${view_1.HEADER_OFFSET + 4}])`,
                        `lView[${view_1.HEADER_OFFSET + 5}] = document.createElement("b")`,
                        `(lView[${view_1.HEADER_OFFSET + 0}] as Element).appendChild(lView[${view_1.HEADER_OFFSET + 5}])`,
                        `(lView[${view_1.HEADER_OFFSET + 5}] as Element).setAttribute("title", "none")`,
                        `lView[${view_1.HEADER_OFFSET + 6}] = document.createTextNode("emails")`,
                        `(lView[${view_1.HEADER_OFFSET + 5}] as Element).appendChild(lView[${view_1.HEADER_OFFSET + 6}])`,
                        `lView[${view_1.HEADER_OFFSET + 7}] = document.createTextNode("!")`,
                        `(lView[${view_1.HEADER_OFFSET + 0}] as Element).appendChild(lView[${view_1.HEADER_OFFSET + 7}])`,
                    ]),
                    (0, utils_1.matchDebug)([
                        `lView[${view_1.HEADER_OFFSET + 8}] = document.createTextNode("one ")`,
                        `(lView[${view_1.HEADER_OFFSET + 0}] as Element).appendChild(lView[${view_1.HEADER_OFFSET + 8}])`,
                        `lView[${view_1.HEADER_OFFSET + 9}] = document.createElement("i")`,
                        `(lView[${view_1.HEADER_OFFSET + 0}] as Element).appendChild(lView[${view_1.HEADER_OFFSET + 9}])`,
                        `lView[${view_1.HEADER_OFFSET + 10}] = document.createTextNode("email")`,
                        `(lView[${view_1.HEADER_OFFSET + 9}] as Element).appendChild(lView[${view_1.HEADER_OFFSET + 10}])`,
                    ]),
                    (0, utils_1.matchDebug)([
                        `lView[${view_1.HEADER_OFFSET + 11}] = document.createTextNode("")`,
                        `(lView[${view_1.HEADER_OFFSET + 0}] as Element).appendChild(lView[${view_1.HEADER_OFFSET + 11}])`,
                        `lView[${view_1.HEADER_OFFSET + 12}] = document.createElement("span")`,
                        `(lView[${view_1.HEADER_OFFSET + 0}] as Element).appendChild(lView[${view_1.HEADER_OFFSET + 12}])`,
                        `lView[${view_1.HEADER_OFFSET + 13}] = document.createTextNode("emails")`,
                        `(lView[${view_1.HEADER_OFFSET + 12}] as Element).appendChild(lView[${view_1.HEADER_OFFSET + 13}])`,
                    ]),
                ],
                remove: [
                    (0, utils_1.matchDebug)([
                        `remove(lView[${view_1.HEADER_OFFSET + 4}])`,
                        `remove(lView[${view_1.HEADER_OFFSET + 5}])`,
                        `remove(lView[${view_1.HEADER_OFFSET + 7}])`,
                    ]),
                    (0, utils_1.matchDebug)([
                        `remove(lView[${view_1.HEADER_OFFSET + 8}])`,
                        `remove(lView[${view_1.HEADER_OFFSET + 9}])`,
                    ]),
                    (0, utils_1.matchDebug)([
                        `remove(lView[${view_1.HEADER_OFFSET + 11}])`,
                        `remove(lView[${view_1.HEADER_OFFSET + 12}])`,
                    ]),
                ],
                update: [
                    (0, utils_1.matchDebug)([]),
                    (0, utils_1.matchDebug)([]),
                    (0, utils_1.matchDebug)([
                        `if (mask & 0b1) { (lView[${view_1.HEADER_OFFSET + 11}] as Text).textContent = \`\${lView[i-1]} \`; }`,
                        `if (mask & 0b10) { (lView[${view_1.HEADER_OFFSET + 12}] as Element).setAttribute('title', \`\${lView[i-2]}\`); }`,
                    ]),
                ],
            });
        });
        it('for nested ICU expressions', () => {
            const message = `{�0�, plural,
        =0 {zero}
        other {�0� {�1�, select,
                       cat {cats}
                       dog {dogs}
                       other {animals}
                     }!}
      }`;
            const nbConsts = 2;
            const index = 1;
            const opCodes = getOpCodes(message, () => {
                (0, all_1.ɵɵelementStart)(0, 'div');
                (0, core_1.ɵɵi18n)(index, 0);
                (0, all_1.ɵɵelementEnd)();
            }, nbConsts, view_1.HEADER_OFFSET + index);
            expect(opCodes).toEqual({
                create: (0, utils_1.matchDebug)([
                    `lView[${view_1.HEADER_OFFSET + 2}] = document.createComment("ICU ${view_1.HEADER_OFFSET + 1}:0");`,
                    `parent.appendChild(lView[${view_1.HEADER_OFFSET + 2}]);`,
                ]),
                update: (0, utils_1.matchDebug)([
                    `if (mask & 0b1) { icuSwitchCase(${view_1.HEADER_OFFSET + 2}, \`\${lView[i-1]}\`); }`,
                    `if (mask & 0b10) { icuSwitchCase(${view_1.HEADER_OFFSET + 6}, \`\${lView[i-2]}\`); }`,
                    `if (mask & 0b1) { icuUpdateCase(${view_1.HEADER_OFFSET + 2}); }`,
                ]),
                ast: [
                    {
                        kind: 3,
                        index: view_1.HEADER_OFFSET + 2,
                        cases: [
                            [{ kind: 0, index: view_1.HEADER_OFFSET + 4 }],
                            [
                                { kind: 0, index: view_1.HEADER_OFFSET + 5 },
                                {
                                    kind: 3,
                                    index: view_1.HEADER_OFFSET + 6,
                                    cases: [
                                        [{ kind: 0, index: view_1.HEADER_OFFSET + 8 }],
                                        [{ kind: 0, index: view_1.HEADER_OFFSET + 9 }],
                                        [{ kind: 0, index: view_1.HEADER_OFFSET + 10 }],
                                    ],
                                    currentCaseLViewIndex: view_1.HEADER_OFFSET + 7,
                                },
                                { kind: 0, index: view_1.HEADER_OFFSET + 11 },
                            ],
                        ],
                        currentCaseLViewIndex: view_1.HEADER_OFFSET + 3,
                    },
                ],
                parentTNodeIndex: view_1.HEADER_OFFSET,
            });
            expect((0, i18n_util_1.getTIcu)(tView, view_1.HEADER_OFFSET + 2)).toEqual({
                type: 1,
                anchorIdx: view_1.HEADER_OFFSET + 2,
                currentCaseLViewIndex: view_1.HEADER_OFFSET + 3,
                cases: ['0', 'other'],
                create: [
                    (0, utils_1.matchDebug)([
                        `lView[${view_1.HEADER_OFFSET + 4}] = document.createTextNode("zero")`,
                        `(lView[${view_1.HEADER_OFFSET + 0}] as Element).appendChild(lView[${view_1.HEADER_OFFSET + 4}])`,
                    ]),
                    (0, utils_1.matchDebug)([
                        `lView[${view_1.HEADER_OFFSET + 5}] = document.createTextNode("")`,
                        `(lView[${view_1.HEADER_OFFSET + 0}] as Element).appendChild(lView[${view_1.HEADER_OFFSET + 5}])`,
                        `lView[${view_1.HEADER_OFFSET + 6}] = document.createComment("nested ICU 0")`,
                        `(lView[${view_1.HEADER_OFFSET + 0}] as Element).appendChild(lView[${view_1.HEADER_OFFSET + 6}])`,
                        `lView[${view_1.HEADER_OFFSET + 11}] = document.createTextNode("!")`,
                        `(lView[${view_1.HEADER_OFFSET + 0}] as Element).appendChild(lView[${view_1.HEADER_OFFSET + 11}])`,
                    ]),
                ],
                update: [
                    (0, utils_1.matchDebug)([]),
                    (0, utils_1.matchDebug)([
                        `if (mask & 0b1) { (lView[${view_1.HEADER_OFFSET + 5}] as Text).textContent = \`\${lView[i-1]} \`; }`,
                    ]),
                ],
                remove: [
                    (0, utils_1.matchDebug)([`remove(lView[${view_1.HEADER_OFFSET + 4}])`]),
                    (0, utils_1.matchDebug)([
                        `remove(lView[${view_1.HEADER_OFFSET + 5}])`,
                        `removeNestedICU(${view_1.HEADER_OFFSET + 6})`,
                        `remove(lView[${view_1.HEADER_OFFSET + 6}])`,
                        `remove(lView[${view_1.HEADER_OFFSET + 11}])`,
                    ]),
                ],
            });
            expect(tView.data[view_1.HEADER_OFFSET + 6]).toEqual({
                type: 0,
                anchorIdx: view_1.HEADER_OFFSET + 6,
                currentCaseLViewIndex: view_1.HEADER_OFFSET + 7,
                cases: ['cat', 'dog', 'other'],
                create: [
                    (0, utils_1.matchDebug)([
                        `lView[${view_1.HEADER_OFFSET + 8}] = document.createTextNode("cats")`,
                        `(lView[${view_1.HEADER_OFFSET + 0}] as Element).appendChild(lView[${view_1.HEADER_OFFSET + 8}])`,
                    ]),
                    (0, utils_1.matchDebug)([
                        `lView[${view_1.HEADER_OFFSET + 9}] = document.createTextNode("dogs")`,
                        `(lView[${view_1.HEADER_OFFSET + 0}] as Element).appendChild(lView[${view_1.HEADER_OFFSET + 9}])`,
                    ]),
                    (0, utils_1.matchDebug)([
                        `lView[${view_1.HEADER_OFFSET + 10}] = document.createTextNode("animals")`,
                        `(lView[${view_1.HEADER_OFFSET + 0}] as Element).appendChild(lView[${view_1.HEADER_OFFSET + 10}])`,
                    ]),
                ],
                update: [(0, utils_1.matchDebug)([]), (0, utils_1.matchDebug)([]), (0, utils_1.matchDebug)([])],
                remove: [
                    (0, utils_1.matchDebug)([`remove(lView[${view_1.HEADER_OFFSET + 8}])`]),
                    (0, utils_1.matchDebug)([`remove(lView[${view_1.HEADER_OFFSET + 9}])`]),
                    (0, utils_1.matchDebug)([`remove(lView[${view_1.HEADER_OFFSET + 10}])`]),
                ],
            });
        });
    });
    describe(`i18nAttribute`, () => {
        it('for simple bindings', () => {
            const message = `Hello �0�!`;
            const attrs = ['title', message];
            const nbConsts = 2;
            const index = 1;
            const opCodes = getOpCodes(attrs, () => {
                (0, all_1.ɵɵelementStart)(0, 'div');
                (0, core_1.ɵɵi18nAttributes)(index, 0);
                (0, all_1.ɵɵelementEnd)();
            }, nbConsts, view_1.HEADER_OFFSET + index);
            expect(opCodes).toEqual((0, utils_1.matchDebug)([
                `if (mask & 0b1) { (lView[${view_1.HEADER_OFFSET + 0}] as Element).setAttribute('title', \`Hello \$\{lView[i-1]}!\`); }`,
            ]));
        });
        it('for multiple bindings', () => {
            const message = `Hello �0� and �1�, again �0�!`;
            const attrs = ['title', message];
            const nbConsts = 2;
            const index = 1;
            const opCodes = getOpCodes(attrs, () => {
                (0, all_1.ɵɵelementStart)(0, 'div');
                (0, core_1.ɵɵi18nAttributes)(index, 0);
                (0, all_1.ɵɵelementEnd)();
            }, nbConsts, view_1.HEADER_OFFSET + index);
            expect(opCodes).toEqual((0, utils_1.matchDebug)([
                `if (mask & 0b11) { (lView[${view_1.HEADER_OFFSET + 0}] as Element).setAttribute('title', \`Hello \$\{lView[i-1]} and \$\{lView[i-2]}, again \$\{lView[i-1]}!\`); }`,
            ]));
        });
        it('for multiple attributes', () => {
            const message1 = `Hello �0� - �1�!`;
            const message2 = `Bye �0� - �1�!`;
            const attrs = ['title', message1, 'aria-label', message2];
            const nbConsts = 4;
            const index = 1;
            const opCodes = getOpCodes(attrs, () => {
                (0, all_1.ɵɵelementStart)(0, 'div');
                (0, core_1.ɵɵi18nAttributes)(index, 0);
                (0, all_1.ɵɵelementEnd)();
            }, nbConsts, view_1.HEADER_OFFSET + index);
            expect(opCodes).toEqual((0, utils_1.matchDebug)([
                `if (mask & 0b11) { (lView[${view_1.HEADER_OFFSET + 0}] as Element).` +
                    "setAttribute('title', `Hello ${lView[i-1]} - ${lView[i-2]}!`); }",
                `if (mask & 0b1100) { (lView[${view_1.HEADER_OFFSET + 0}] as Element).` +
                    "setAttribute('aria-label', `Bye ${lView[i-3]} - ${lView[i-4]}!`); }",
            ]));
        });
    });
    describe('i18nPostprocess', () => {
        it('should handle valid cases', () => {
            const arr = ['�*1:1��#2:1�', '�#4:1�', '�6:1�', '�/#2:1��/*1:1�'];
            const str = `[${arr.join('|')}]`;
            const cases = [
                // empty string
                ['', {}, ''],
                // string without any special cases
                ['Foo [1,2,3] Bar - no ICU here', {}, 'Foo [1,2,3] Bar - no ICU here'],
                // multi-value cases
                [
                    `Start: ${str}, ${str} and ${str}, ${str} end.`,
                    {},
                    `Start: ${arr[0]}, ${arr[1]} and ${arr[2]}, ${arr[3]} end.`,
                ],
                // replace VAR_SELECT
                [
                    'My ICU: {VAR_SELECT, select, =1 {one} other {other}}',
                    { VAR_SELECT: '�1:2�' },
                    'My ICU: {�1:2�, select, =1 {one} other {other}}',
                ],
                [
                    'My ICU: {\n\n\tVAR_SELECT_1 \n\n, select, =1 {one} other {other}}',
                    { VAR_SELECT_1: '�1:2�' },
                    'My ICU: {\n\n\t�1:2� \n\n, select, =1 {one} other {other}}',
                ],
                // replace VAR_PLURAL
                [
                    'My ICU: {VAR_PLURAL, plural, one {1} other {other}}',
                    { VAR_PLURAL: '�1:2�' },
                    'My ICU: {�1:2�, plural, one {1} other {other}}',
                ],
                [
                    'My ICU: {\n\n\tVAR_PLURAL_1 \n\n, select, =1 {one} other {other}}',
                    { VAR_PLURAL_1: '�1:2�' },
                    'My ICU: {\n\n\t�1:2� \n\n, select, =1 {one} other {other}}',
                ],
                // do not replace VAR_* anywhere else in a string (only in ICU)
                [
                    'My ICU: {VAR_PLURAL, plural, one {1} other {other}} VAR_PLURAL and VAR_SELECT',
                    { VAR_PLURAL: '�1:2�' },
                    'My ICU: {�1:2�, plural, one {1} other {other}} VAR_PLURAL and VAR_SELECT',
                ],
                // replace VAR_*'s in nested ICUs
                [
                    'My ICU: {VAR_PLURAL, plural, one {1 - {VAR_SELECT, age, 50 {fifty} other {other}}} other {other}}',
                    { VAR_PLURAL: '�1:2�', VAR_SELECT: '�5�' },
                    'My ICU: {�1:2�, plural, one {1 - {�5�, age, 50 {fifty} other {other}}} other {other}}',
                ],
                [
                    'My ICU: {VAR_PLURAL, plural, one {1 - {VAR_PLURAL_1, age, 50 {fifty} other {other}}} other {other}}',
                    { VAR_PLURAL: '�1:2�', VAR_PLURAL_1: '�5�' },
                    'My ICU: {�1:2�, plural, one {1 - {�5�, age, 50 {fifty} other {other}}} other {other}}',
                ],
                // ICU replacement
                [
                    'My ICU #1: �I18N_EXP_ICU�, My ICU #2: �I18N_EXP_ICU�',
                    { ICU: ['ICU_VALUE_1', 'ICU_VALUE_2'] },
                    'My ICU #1: ICU_VALUE_1, My ICU #2: ICU_VALUE_2',
                ],
                // mixed case
                [
                    `Start: ${str}, ${str}. ICU: {VAR_SELECT, count, 10 {ten} other {other}}.
          Another ICU: �I18N_EXP_ICU� and ${str}, ${str} and one more ICU: �I18N_EXP_ICU� and end.`,
                    { VAR_SELECT: '�1:2�', ICU: ['ICU_VALUE_1', 'ICU_VALUE_2'] },
                    `Start: ${arr[0]}, ${arr[1]}. ICU: {�1:2�, count, 10 {ten} other {other}}.
          Another ICU: ICU_VALUE_1 and ${arr[2]}, ${arr[3]} and one more ICU: ICU_VALUE_2 and end.`,
                ],
            ];
            cases.forEach(([input, replacements, output]) => {
                expect((0, core_1.ɵɵi18nPostprocess)(input, replacements)).toEqual(output);
            });
        });
        it('should handle nested template represented by multi-value placeholders', () => {
            /**
             * <div i18n>
             *   <span>
             *     Hello - 1
             *   </span>
             *   <span *ngIf="visible">
             *     Hello - 2
             *     <span *ngIf="visible">
             *       Hello - 3
             *       <span *ngIf="visible">
             *         Hello - 4
             *       </span>
             *     </span>
             *   </span>
             *   <span>
             *     Hello - 5
             *   </span>
             * </div>
             */
            const generated = `
        [�#2�|�#4�] Bonjour - 1 [�/#2�|�/#1:3��/*2:3�|�/#1:2��/*2:2�|�/#1:1��/*3:1�|�/#4�]
        [�*3:1��#1:1�|�*2:2��#1:2�|�*2:3��#1:3�]
          Bonjour - 2
          [�*3:1��#1:1�|�*2:2��#1:2�|�*2:3��#1:3�]
            Bonjour - 3
            [�*3:1��#1:1�|�*2:2��#1:2�|�*2:3��#1:3�] Bonjour - 4 [�/#2�|�/#1:3��/*2:3�|�/#1:2��/*2:2�|�/#1:1��/*3:1�|�/#4�]
          [�/#2�|�/#1:3��/*2:3�|�/#1:2��/*2:2�|�/#1:1��/*3:1�|�/#4�]
        [�/#2�|�/#1:3��/*2:3�|�/#1:2��/*2:2�|�/#1:1��/*3:1�|�/#4�]
        [�#2�|�#4�] Bonjour - 5 [�/#2�|�/#1:3��/*2:3�|�/#1:2��/*2:2�|�/#1:1��/*3:1�|�/#4�]
      `;
            const final = `
        �#2� Bonjour - 1 �/#2�
        �*3:1�
          �#1:1�
            Bonjour - 2
            �*2:2�
              �#1:2�
                Bonjour - 3
                �*2:3�
                  �#1:3� Bonjour - 4 �/#1:3�
                �/*2:3�
              �/#1:2�
            �/*2:2�
          �/#1:1�
        �/*3:1�
        �#4� Bonjour - 5 �/#4�
      `;
            expect((0, core_1.ɵɵi18nPostprocess)(generated.replace(/\s+/g, ''))).toEqual(final.replace(/\s+/g, ''));
        });
        it('should throw in case we have invalid string', () => {
            expect(() => (0, core_1.ɵɵi18nPostprocess)('My ICU #1: �I18N_EXP_ICU�, My ICU #2: �I18N_EXP_ICU�', {
                ICU: ['ICU_VALUE_1'],
            })).toThrowError();
        });
    });
    describe('i18nStartFirstCreatePass', () => {
        let fixture;
        const DECLS = 20;
        const VARS = 10;
        beforeEach(() => {
            fixture = new view_fixture_1.ViewFixture({ decls: DECLS, vars: VARS });
            fixture.enterView();
            (0, all_1.ɵɵelementStart)(0, 'div');
        });
        afterEach(view_fixture_1.ViewFixture.cleanUp);
        function i18nRangeOffset(offset) {
            return view_1.HEADER_OFFSET + DECLS + VARS + offset;
        }
        function i18nRangeOffsetOpcode(offset, { appendLater, comment } = {}) {
            let index = i18nRangeOffset(offset) << i18n_1.I18nCreateOpCode.SHIFT;
            if (!appendLater) {
                index |= i18n_1.I18nCreateOpCode.APPEND_EAGERLY;
            }
            if (comment) {
                index |= i18n_1.I18nCreateOpCode.COMMENT;
            }
            return index;
        }
        it('should process text node with no siblings and no children', () => {
            (0, i18n_parse_1.i18nStartFirstCreatePass)(fixture.tView, 0, fixture.lView, view_1.HEADER_OFFSET + 1, 'Hello World!', -1);
            const ti18n = fixture.tView.data[view_1.HEADER_OFFSET + 1];
            // Expect that we only create the `Hello World!` text node and nothing else.
            expect(ti18n.create).toEqual([
                i18nRangeOffsetOpcode(0),
                'Hello World!', //
            ]);
        });
        it('should process text with a child node', () => {
            (0, i18n_parse_1.i18nStartFirstCreatePass)(fixture.tView, 0, fixture.lView, view_1.HEADER_OFFSET + 1, 'Hello �#2��/#2�!', -1);
            const ti18n = fixture.tView.data[view_1.HEADER_OFFSET + 1];
            expect(ti18n.create).toEqual([
                i18nRangeOffsetOpcode(0),
                'Hello ', //
                i18nRangeOffsetOpcode(1),
                '!', //
            ]);
            // Leave behind `Placeholder` to be picked up by `TNode` creation.
            expect(fixture.tView.data[view_1.HEADER_OFFSET + 2]).toEqual((0, matchers_1.matchTNode)({
                type: 64 /* TNodeType.Placeholder */,
                // It should insert itself in front of "!"
                insertBeforeIndex: i18nRangeOffset(1),
            }));
        });
        it('should process text with a child node that has text', () => {
            (0, i18n_parse_1.i18nStartFirstCreatePass)(fixture.tView, 0, fixture.lView, view_1.HEADER_OFFSET + 1, 'Hello �#2�World�/#2�!', -1);
            const ti18n = fixture.tView.data[view_1.HEADER_OFFSET + 1];
            expect(ti18n.create).toEqual([
                i18nRangeOffsetOpcode(0),
                'Hello ', //
                i18nRangeOffsetOpcode(1, { appendLater: true }),
                'World', //
                i18nRangeOffsetOpcode(2),
                '!', //
            ]);
            // Leave behind `Placeholder` to be picked up by `TNode` creation.
            expect(fixture.tView.data[view_1.HEADER_OFFSET + 2]).toEqual((0, matchers_1.matchTNode)({
                type: 64 /* TNodeType.Placeholder */,
                insertBeforeIndex: [
                    i18nRangeOffset(2), // It should insert itself in front of "!"
                    i18nRangeOffset(1), // It should append "World"
                ],
            }));
        });
        it('should process text with a child node that has text and with bindings', () => {
            (0, i18n_parse_1.i18nStartFirstCreatePass)(fixture.tView, 0, fixture.lView, view_1.HEADER_OFFSET + 1, '�0� �#2��1��/#2�!' /* {{salutation}} <b>{{name}}</b>! */, -1);
            const ti18n = fixture.tView.data[view_1.HEADER_OFFSET + 1];
            expect(ti18n.create).toEqual([
                i18nRangeOffsetOpcode(0),
                '', // 1 is saved for binding
                i18nRangeOffsetOpcode(1, { appendLater: true }),
                '', // 3 is saved for binding
                i18nRangeOffsetOpcode(2),
                '!', //
            ]);
            // Leave behind `insertBeforeIndex` to be picked up by `TNode` creation.
            expect(fixture.tView.data[view_1.HEADER_OFFSET + 2]).toEqual((0, matchers_1.matchTNode)({
                type: 64 /* TNodeType.Placeholder */,
                insertBeforeIndex: [
                    i18nRangeOffset(2), // It should insert itself in front of "!"
                    i18nRangeOffset(1), // It should append child text node "{{name}}"
                ],
            }));
            expect(ti18n.update).toEqual((0, utils_1.matchDebug)([
                `if (mask & 0b1) { (lView[${view_1.HEADER_OFFSET + 30}] as Text).textContent = \`\${lView[i-1]} \`; }`,
                `if (mask & 0b10) { (lView[${view_1.HEADER_OFFSET + 31}] as Text).textContent = \`\${lView[i-2]}\`; }`,
            ]));
        });
        it('should process text with a child template', () => {
            (0, i18n_parse_1.i18nStartFirstCreatePass)(fixture.tView, 0, fixture.lView, view_1.HEADER_OFFSET + 1, 'Hello �*2:1�World�/*2:1�!', -1);
            const ti18n = fixture.tView.data[view_1.HEADER_OFFSET + 1];
            expect(ti18n.create.debug).toEqual([
                `lView[${view_1.HEADER_OFFSET + 30}] = document.createText("Hello ");`,
                `parent.appendChild(lView[${view_1.HEADER_OFFSET + 30}]);`,
                `lView[${view_1.HEADER_OFFSET + 31}] = document.createText("!");`,
                `parent.appendChild(lView[${view_1.HEADER_OFFSET + 31}]);`,
            ]);
            // Leave behind `Placeholder` to be picked up by `TNode` creation.
            // It should insert itself in front of "!"
            expect(fixture.tView.data[view_1.HEADER_OFFSET + 2]).toEqual((0, matchers_1.matchTNode)({
                type: 64 /* TNodeType.Placeholder */,
                insertBeforeIndex: view_1.HEADER_OFFSET + 31,
            }));
        });
    });
});
