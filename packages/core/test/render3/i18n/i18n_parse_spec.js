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
const i18n_apply_1 = require("../../../src/render3/i18n/i18n_apply");
const i18n_parse_1 = require("../../../src/render3/i18n/i18n_parse");
const i18n_util_1 = require("../../../src/render3/i18n/i18n_util");
const view_1 = require("../../../src/render3/interfaces/view");
const matchers_1 = require("../matchers");
const utils_1 = require("../utils");
const view_fixture_1 = require("../view_fixture");
describe('i18n_parse', () => {
    let fixture;
    beforeEach(() => (fixture = new view_fixture_1.ViewFixture({ decls: 1, vars: 1 })));
    describe('icu', () => {
        it('should parse simple text', () => {
            const tI18n = toT18n('some text');
            expect(tI18n).toEqual((0, matchers_1.matchTI18n)({
                create: (0, utils_1.matchDebug)([
                    `lView[${view_1.HEADER_OFFSET + 2}] = document.createText("some text");`,
                    `parent.appendChild(lView[${view_1.HEADER_OFFSET + 2}]);`,
                ]),
                update: [],
            }));
            fixture.apply(() => (0, i18n_apply_1.applyCreateOpCodes)(fixture.lView, tI18n.create, fixture.host, null));
            expect(fixture.host.innerHTML).toEqual('some text');
        });
        it('should parse simple ICU', () => {
            //     TData                  | LView
            // ---------------------------+-------------------------------
            //                     ----- DECL -----
            // 21: TI18n                  |
            //                     ----- VARS -----
            // 22: Binding for ICU        |
            //                   ----- EXPANDO -----
            // 23: null                   | #text(before|)
            // 24: TIcu                   | <!-- ICU 20:0 -->
            // 25: null                   | currently selected ICU case
            // 26: null                   | #text(caseA)
            // 27: null                   | #text(otherCase)
            // 28: null                   | #text(|after)
            const tI18n = toT18n(`before|{
          �0�, select,
            A {caseA}
            other {otherCase}
        }|after`);
            expect(tI18n).toEqual((0, matchers_1.matchTI18n)({
                create: (0, utils_1.matchDebug)([
                    `lView[${view_1.HEADER_OFFSET + 2}] = document.createText("before|");`,
                    `parent.appendChild(lView[${view_1.HEADER_OFFSET + 2}]);`,
                    `lView[${view_1.HEADER_OFFSET + 3}] = document.createComment("ICU ${view_1.HEADER_OFFSET + 0}:0");`,
                    `parent.appendChild(lView[${view_1.HEADER_OFFSET + 3}]);`,
                    `lView[${view_1.HEADER_OFFSET + 7}] = document.createText("|after");`,
                    `parent.appendChild(lView[${view_1.HEADER_OFFSET + 7}]);`,
                ]),
                update: (0, utils_1.matchDebug)([
                    `if (mask & 0b1) { icuSwitchCase(${view_1.HEADER_OFFSET + 3}, \`\${lView[i-1]}\`); }`,
                ]),
            }));
            expect((0, i18n_util_1.getTIcu)(fixture.tView, view_1.HEADER_OFFSET + 3)).toEqual((0, matchers_1.matchTIcu)({
                type: 0 /* IcuType.select */,
                anchorIdx: view_1.HEADER_OFFSET + 3,
                currentCaseLViewIndex: view_1.HEADER_OFFSET + 4,
                cases: ['A', 'other'],
                create: [
                    (0, utils_1.matchDebug)([
                        `lView[${view_1.HEADER_OFFSET + 5}] = document.createTextNode("caseA")`,
                        `(lView[${view_1.HOST}] as Element).appendChild(lView[${view_1.HEADER_OFFSET + 5}])`,
                    ]),
                    (0, utils_1.matchDebug)([
                        `lView[${view_1.HEADER_OFFSET + 6}] = document.createTextNode("otherCase")`,
                        `(lView[${view_1.HOST}] as Element).appendChild(lView[${view_1.HEADER_OFFSET + 6}])`,
                    ]),
                ],
                update: [(0, utils_1.matchDebug)([]), (0, utils_1.matchDebug)([])],
                remove: [
                    (0, utils_1.matchDebug)([`remove(lView[${view_1.HEADER_OFFSET + 5}])`]),
                    (0, utils_1.matchDebug)([`remove(lView[${view_1.HEADER_OFFSET + 6}])`]),
                ],
            }));
            fixture.apply(() => {
                (0, i18n_apply_1.applyCreateOpCodes)(fixture.lView, tI18n.create, fixture.host, null);
                expect(fixture.host.innerHTML).toEqual(`before|<!--ICU ${view_1.HEADER_OFFSET + 0}:0-->|after`);
            });
            fixture.apply(() => {
                (0, core_1.ɵɵi18nExp)('A');
                (0, core_1.ɵɵi18nApply)(0);
                expect(fixture.host.innerHTML).toEqual(`before|caseA<!--ICU ${view_1.HEADER_OFFSET + 0}:0-->|after`);
            });
            fixture.apply(() => {
                (0, core_1.ɵɵi18nExp)('x');
                (0, core_1.ɵɵi18nApply)(0);
                expect(fixture.host.innerHTML).toEqual(`before|otherCase<!--ICU ${view_1.HEADER_OFFSET + 0}:0-->|after`);
            });
            fixture.apply(() => {
                (0, core_1.ɵɵi18nExp)('A');
                (0, core_1.ɵɵi18nApply)(0);
                expect(fixture.host.innerHTML).toEqual(`before|caseA<!--ICU ${view_1.HEADER_OFFSET + 0}:0-->|after`);
            });
        });
        it('should parse HTML in ICU', () => {
            const tI18n = toT18n(`{
        �0�, select,
          A {Hello <b>world<i>!</i></b>}
          other {<div>{�0�, select, 0 {nested0} other {nestedOther}}</div>}
      }`);
            fixture.apply(() => {
                (0, i18n_apply_1.applyCreateOpCodes)(fixture.lView, tI18n.create, fixture.host, null);
                expect(fixture.host.innerHTML).toEqual(`<!--ICU ${view_1.HEADER_OFFSET + 0}:0-->`);
            });
            fixture.apply(() => {
                (0, core_1.ɵɵi18nExp)('A');
                (0, core_1.ɵɵi18nApply)(0);
                expect(fixture.host.innerHTML).toEqual(`Hello <b>world<i>!</i></b><!--ICU ${view_1.HEADER_OFFSET + 0}:0-->`);
            });
            fixture.apply(() => {
                (0, core_1.ɵɵi18nExp)('x');
                (0, core_1.ɵɵi18nApply)(0);
                expect(fixture.host.innerHTML).toEqual(`<div>nestedOther<!--nested ICU 0--></div><!--ICU ${view_1.HEADER_OFFSET + 0}:0-->`);
            });
            fixture.apply(() => {
                (0, core_1.ɵɵi18nExp)('A');
                (0, core_1.ɵɵi18nApply)(0);
                expect(fixture.host.innerHTML).toEqual(`Hello <b>world<i>!</i></b><!--ICU ${view_1.HEADER_OFFSET + 0}:0-->`);
            });
        });
        it('should parse nested ICU', () => {
            fixture = new view_fixture_1.ViewFixture({ decls: 1, vars: 3 });
            //     TData                  | LView
            // ---------------------------+-------------------------------
            //                     ----- DECL -----
            // 21: TI18n                  |
            //                     ----- VARS -----
            // 22: Binding for parent ICU |
            // 23: Binding for child ICU  |
            // 24: Binding for child ICU  |
            //                   ----- EXPANDO -----
            // 25: TIcu (parent)          | <!-- ICU 20:0 -->
            // 26: null                   | currently selected ICU case
            // 27: null                   | #text( parentA )
            // 28: TIcu (child)           | <!-- nested ICU 0 -->
            // 29:     null               |     currently selected ICU case
            // 30:     null               |     #text(nested0)
            // 31:     null               |     #text({{�2�}})
            // 32: null                   | #text( )
            // 33: null                   | #text( parentOther )
            const tI18n = toT18n(`{
          �0�, select,
            A {parentA {�1�, select, 0 {nested0} other {�2�}}!}
            other {parentOther}
        }`);
            expect(tI18n).toEqual((0, matchers_1.matchTI18n)({
                create: (0, utils_1.matchDebug)([
                    `lView[${view_1.HEADER_OFFSET + 4}] = document.createComment("ICU ${view_1.HEADER_OFFSET + 0}:0");`,
                    `parent.appendChild(lView[${view_1.HEADER_OFFSET + 4}]);`,
                ]),
                update: (0, utils_1.matchDebug)([
                    `if (mask & 0b1) { icuSwitchCase(${view_1.HEADER_OFFSET + 4}, \`\${lView[i-1]}\`); }`,
                    `if (mask & 0b10) { icuSwitchCase(${view_1.HEADER_OFFSET + 7}, \`\${lView[i-2]}\`); }`,
                    `if (mask & 0b100) { icuUpdateCase(${view_1.HEADER_OFFSET + 7}); }`,
                ]),
            }));
            expect((0, i18n_util_1.getTIcu)(fixture.tView, view_1.HEADER_OFFSET + 4)).toEqual((0, matchers_1.matchTIcu)({
                type: 0 /* IcuType.select */,
                anchorIdx: view_1.HEADER_OFFSET + 4,
                currentCaseLViewIndex: view_1.HEADER_OFFSET + 5,
                cases: ['A', 'other'],
                create: [
                    (0, utils_1.matchDebug)([
                        `lView[${view_1.HEADER_OFFSET + 6}] = document.createTextNode("parentA ")`,
                        `(lView[${view_1.HOST}] as Element).appendChild(lView[${view_1.HEADER_OFFSET + 6}])`,
                        `lView[${view_1.HEADER_OFFSET + 7}] = document.createComment("nested ICU 0")`,
                        `(lView[${view_1.HOST}] as Element).appendChild(lView[${view_1.HEADER_OFFSET + 7}])`,
                        `lView[${view_1.HEADER_OFFSET + 11}] = document.createTextNode("!")`,
                        `(lView[${view_1.HOST}] as Element).appendChild(lView[${view_1.HEADER_OFFSET + 11}])`,
                    ]),
                    (0, utils_1.matchDebug)([
                        `lView[${view_1.HEADER_OFFSET + 12}] = document.createTextNode("parentOther")`,
                        `(lView[${view_1.HOST}] as Element).appendChild(lView[${view_1.HEADER_OFFSET + 12}])`,
                    ]),
                ],
                update: [(0, utils_1.matchDebug)([]), (0, utils_1.matchDebug)([])],
                remove: [
                    (0, utils_1.matchDebug)([
                        `remove(lView[${view_1.HEADER_OFFSET + 6}])`,
                        `removeNestedICU(${view_1.HEADER_OFFSET + 7})`,
                        `remove(lView[${view_1.HEADER_OFFSET + 7}])`,
                        `remove(lView[${view_1.HEADER_OFFSET + 11}])`,
                    ]),
                    (0, utils_1.matchDebug)([`remove(lView[${view_1.HEADER_OFFSET + 12}])`]),
                ],
            }));
            expect((0, i18n_util_1.getTIcu)(fixture.tView, view_1.HEADER_OFFSET + 7)).toEqual((0, matchers_1.matchTIcu)({
                type: 0 /* IcuType.select */,
                anchorIdx: view_1.HEADER_OFFSET + 7,
                currentCaseLViewIndex: view_1.HEADER_OFFSET + 8,
                cases: ['0', 'other'],
                create: [
                    (0, utils_1.matchDebug)([
                        `lView[${view_1.HEADER_OFFSET + 9}] = document.createTextNode("nested0")`,
                        `(lView[${view_1.HOST}] as Element).appendChild(lView[${view_1.HEADER_OFFSET + 9}])`,
                    ]),
                    (0, utils_1.matchDebug)([
                        `lView[${view_1.HEADER_OFFSET + 10}] = document.createTextNode("")`,
                        `(lView[${view_1.HOST}] as Element).appendChild(lView[${view_1.HEADER_OFFSET + 10}])`,
                    ]),
                ],
                update: [
                    (0, utils_1.matchDebug)([]),
                    (0, utils_1.matchDebug)([
                        `if (mask & 0b100) { (lView[${view_1.HEADER_OFFSET + 10}] as Text).textContent = \`\${lView[i-3]}\`; }`,
                    ]),
                ],
                remove: [
                    (0, utils_1.matchDebug)([`remove(lView[${view_1.HEADER_OFFSET + 9}])`]),
                    (0, utils_1.matchDebug)([`remove(lView[${view_1.HEADER_OFFSET + 10}])`]),
                ],
            }));
            fixture.apply(() => {
                (0, i18n_apply_1.applyCreateOpCodes)(fixture.lView, tI18n.create, fixture.host, null);
                expect(fixture.host.innerHTML).toEqual(`<!--ICU ${view_1.HEADER_OFFSET + 0}:0-->`);
            });
            fixture.apply(() => {
                (0, core_1.ɵɵi18nExp)('A');
                (0, core_1.ɵɵi18nExp)('0');
                (0, core_1.ɵɵi18nExp)('value1');
                (0, core_1.ɵɵi18nApply)(0);
                expect(fixture.host.innerHTML).toEqual(`parentA nested0<!--nested ICU 0-->!<!--ICU ${view_1.HEADER_OFFSET + 0}:0-->`);
            });
            fixture.apply(() => {
                (0, core_1.ɵɵi18nExp)('A');
                (0, core_1.ɵɵi18nExp)('x');
                (0, core_1.ɵɵi18nExp)('value1');
                (0, core_1.ɵɵi18nApply)(0);
                expect(fixture.host.innerHTML).toEqual(`parentA value1<!--nested ICU 0-->!<!--ICU ${view_1.HEADER_OFFSET + 0}:0-->`);
            });
            fixture.apply(() => {
                (0, core_1.ɵɵi18nExp)('x');
                (0, core_1.ɵɵi18nExp)('x');
                (0, core_1.ɵɵi18nExp)('value2');
                (0, core_1.ɵɵi18nApply)(0);
                expect(fixture.host.innerHTML).toEqual(`parentOther<!--ICU ${view_1.HEADER_OFFSET + 0}:0-->`);
            });
            fixture.apply(() => {
                (0, core_1.ɵɵi18nExp)('A');
                (0, core_1.ɵɵi18nExp)('A');
                (0, core_1.ɵɵi18nExp)('value2');
                (0, core_1.ɵɵi18nApply)(0);
                expect(fixture.host.innerHTML).toEqual(`parentA value2<!--nested ICU 0-->!<!--ICU ${view_1.HEADER_OFFSET + 0}:0-->`);
            });
        });
    });
    function toT18n(text) {
        const tNodeIndex = view_1.HEADER_OFFSET;
        fixture.enterView();
        (0, i18n_parse_1.i18nStartFirstCreatePass)(fixture.tView, 0, fixture.lView, tNodeIndex, text, -1);
        fixture.leaveView();
        const tI18n = fixture.tView.data[tNodeIndex];
        expect(tI18n).toEqual((0, matchers_1.matchTI18n)({}));
        return tI18n;
    }
});
