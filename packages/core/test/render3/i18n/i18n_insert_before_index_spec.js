"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_insert_before_index_1 = require("../../../src/render3/i18n/i18n_insert_before_index");
const view_1 = require("../../../src/render3/interfaces/view");
const matchers_1 = require("../matchers");
const tnode_manipulation_1 = require("../../../src/render3/tnode_manipulation");
describe('addTNodeAndUpdateInsertBeforeIndex', () => {
    function tNode(index, type, insertBeforeIndex = null) {
        const tNode = (0, tnode_manipulation_1.createTNode)(null, null, type, index, null, null);
        tNode.insertBeforeIndex = insertBeforeIndex;
        return tNode;
    }
    function tPlaceholderElementNode(index, insertBeforeIndex = null) {
        return tNode(index, 64 /* TNodeType.Placeholder */, insertBeforeIndex);
    }
    function tI18NTextNode(index, insertBeforeIndex = null) {
        return tNode(index, 2 /* TNodeType.Element */, insertBeforeIndex);
    }
    it('should add first node', () => {
        const previousTNodes = [];
        (0, i18n_insert_before_index_1.addTNodeAndUpdateInsertBeforeIndex)(previousTNodes, tPlaceholderElementNode(view_1.HEADER_OFFSET + 0));
        expect(previousTNodes).toEqual([
            (0, matchers_1.matchTNode)({ index: view_1.HEADER_OFFSET + 0, insertBeforeIndex: null }),
        ]);
    });
    describe('when adding a placeholder', () => {
        describe('whose index is greater than those already there', () => {
            it('should not update the `insertBeforeIndex` values', () => {
                const previousTNodes = [
                    tPlaceholderElementNode(view_1.HEADER_OFFSET + 0),
                    tPlaceholderElementNode(view_1.HEADER_OFFSET + 1),
                ];
                (0, i18n_insert_before_index_1.addTNodeAndUpdateInsertBeforeIndex)(previousTNodes, tPlaceholderElementNode(view_1.HEADER_OFFSET + 2));
                expect(previousTNodes).toEqual([
                    (0, matchers_1.matchTNode)({ index: view_1.HEADER_OFFSET + 0, insertBeforeIndex: null }),
                    (0, matchers_1.matchTNode)({ index: view_1.HEADER_OFFSET + 1, insertBeforeIndex: null }),
                    (0, matchers_1.matchTNode)({ index: view_1.HEADER_OFFSET + 2, insertBeforeIndex: null }),
                ]);
            });
        });
        describe('whose index is smaller than current nodes', () => {
            it('should update the previous insertBeforeIndex', () => {
                const previousTNodes = [
                    tPlaceholderElementNode(view_1.HEADER_OFFSET + 1),
                    tPlaceholderElementNode(view_1.HEADER_OFFSET + 2),
                ];
                (0, i18n_insert_before_index_1.addTNodeAndUpdateInsertBeforeIndex)(previousTNodes, tPlaceholderElementNode(view_1.HEADER_OFFSET + 0));
                expect(previousTNodes).toEqual([
                    (0, matchers_1.matchTNode)({ index: view_1.HEADER_OFFSET + 1, insertBeforeIndex: view_1.HEADER_OFFSET + 0 }),
                    (0, matchers_1.matchTNode)({ index: view_1.HEADER_OFFSET + 2, insertBeforeIndex: view_1.HEADER_OFFSET + 0 }),
                    (0, matchers_1.matchTNode)({ index: view_1.HEADER_OFFSET + 0, insertBeforeIndex: null }),
                ]);
            });
            it('should not update the previous insertBeforeIndex if it is already set', () => {
                const previousTNodes = [
                    tPlaceholderElementNode(view_1.HEADER_OFFSET + 2, view_1.HEADER_OFFSET + 1),
                    tPlaceholderElementNode(view_1.HEADER_OFFSET + 3, view_1.HEADER_OFFSET + 1),
                    tPlaceholderElementNode(view_1.HEADER_OFFSET + 1),
                ];
                (0, i18n_insert_before_index_1.addTNodeAndUpdateInsertBeforeIndex)(previousTNodes, tPlaceholderElementNode(view_1.HEADER_OFFSET + 0));
                expect(previousTNodes).toEqual([
                    (0, matchers_1.matchTNode)({ index: view_1.HEADER_OFFSET + 2, insertBeforeIndex: view_1.HEADER_OFFSET + 1 }),
                    (0, matchers_1.matchTNode)({ index: view_1.HEADER_OFFSET + 3, insertBeforeIndex: view_1.HEADER_OFFSET + 1 }),
                    (0, matchers_1.matchTNode)({ index: view_1.HEADER_OFFSET + 1, insertBeforeIndex: view_1.HEADER_OFFSET + 0 }),
                    (0, matchers_1.matchTNode)({ index: view_1.HEADER_OFFSET + 0, insertBeforeIndex: null }),
                ]);
            });
            it('should not update the previous insertBeforeIndex if it is created after', () => {
                const previousTNodes = [
                    tPlaceholderElementNode(view_1.HEADER_OFFSET + 5, view_1.HEADER_OFFSET + 0),
                    tPlaceholderElementNode(view_1.HEADER_OFFSET + 6, view_1.HEADER_OFFSET + 0),
                    tPlaceholderElementNode(view_1.HEADER_OFFSET + 0),
                ];
                (0, i18n_insert_before_index_1.addTNodeAndUpdateInsertBeforeIndex)(previousTNodes, tPlaceholderElementNode(view_1.HEADER_OFFSET + 3));
                expect(previousTNodes).toEqual([
                    (0, matchers_1.matchTNode)({ index: view_1.HEADER_OFFSET + 5, insertBeforeIndex: view_1.HEADER_OFFSET + 0 }),
                    (0, matchers_1.matchTNode)({ index: view_1.HEADER_OFFSET + 6, insertBeforeIndex: view_1.HEADER_OFFSET + 0 }),
                    (0, matchers_1.matchTNode)({ index: view_1.HEADER_OFFSET + 0, insertBeforeIndex: null }),
                    (0, matchers_1.matchTNode)({ index: view_1.HEADER_OFFSET + 3, insertBeforeIndex: null }),
                ]);
            });
        });
    });
    describe('when adding a i18nText', () => {
        describe('whose index is greater than those already there', () => {
            it('should not update the `insertBeforeIndex` values', () => {
                const previousTNodes = [
                    tPlaceholderElementNode(view_1.HEADER_OFFSET + 0),
                    tPlaceholderElementNode(view_1.HEADER_OFFSET + 1),
                ];
                (0, i18n_insert_before_index_1.addTNodeAndUpdateInsertBeforeIndex)(previousTNodes, tI18NTextNode(view_1.HEADER_OFFSET + 2));
                expect(previousTNodes).toEqual([
                    (0, matchers_1.matchTNode)({ index: view_1.HEADER_OFFSET + 0, insertBeforeIndex: view_1.HEADER_OFFSET + 2 }),
                    (0, matchers_1.matchTNode)({ index: view_1.HEADER_OFFSET + 1, insertBeforeIndex: view_1.HEADER_OFFSET + 2 }),
                    (0, matchers_1.matchTNode)({ index: view_1.HEADER_OFFSET + 2, insertBeforeIndex: null }),
                ]);
            });
        });
        describe('whose index is smaller than current nodes', () => {
            it('should update the previous insertBeforeIndex', () => {
                const previousTNodes = [
                    tPlaceholderElementNode(view_1.HEADER_OFFSET + 1),
                    tPlaceholderElementNode(view_1.HEADER_OFFSET + 2),
                ];
                (0, i18n_insert_before_index_1.addTNodeAndUpdateInsertBeforeIndex)(previousTNodes, tI18NTextNode(view_1.HEADER_OFFSET + 0));
                expect(previousTNodes).toEqual([
                    (0, matchers_1.matchTNode)({ index: view_1.HEADER_OFFSET + 1, insertBeforeIndex: view_1.HEADER_OFFSET + 0 }),
                    (0, matchers_1.matchTNode)({ index: view_1.HEADER_OFFSET + 2, insertBeforeIndex: view_1.HEADER_OFFSET + 0 }),
                    (0, matchers_1.matchTNode)({ index: view_1.HEADER_OFFSET + 0, insertBeforeIndex: null }),
                ]);
            });
            it('should not update the previous insertBeforeIndex if it is already set', () => {
                const previousTNodes = [
                    tPlaceholderElementNode(view_1.HEADER_OFFSET + 2, view_1.HEADER_OFFSET + 1),
                    tPlaceholderElementNode(view_1.HEADER_OFFSET + 3, view_1.HEADER_OFFSET + 1),
                    tPlaceholderElementNode(view_1.HEADER_OFFSET + 1),
                ];
                (0, i18n_insert_before_index_1.addTNodeAndUpdateInsertBeforeIndex)(previousTNodes, tI18NTextNode(view_1.HEADER_OFFSET + 0));
                expect(previousTNodes).toEqual([
                    (0, matchers_1.matchTNode)({ index: view_1.HEADER_OFFSET + 2, insertBeforeIndex: view_1.HEADER_OFFSET + 1 }),
                    (0, matchers_1.matchTNode)({ index: view_1.HEADER_OFFSET + 3, insertBeforeIndex: view_1.HEADER_OFFSET + 1 }),
                    (0, matchers_1.matchTNode)({ index: view_1.HEADER_OFFSET + 1, insertBeforeIndex: view_1.HEADER_OFFSET + 0 }),
                    (0, matchers_1.matchTNode)({ index: view_1.HEADER_OFFSET + 0, insertBeforeIndex: null }),
                ]);
            });
            it('should not update the previous insertBeforeIndex if it is created after', () => {
                const previousTNodes = [
                    tPlaceholderElementNode(view_1.HEADER_OFFSET + 5, view_1.HEADER_OFFSET + 0),
                    tPlaceholderElementNode(view_1.HEADER_OFFSET + 6, view_1.HEADER_OFFSET + 0),
                    tPlaceholderElementNode(view_1.HEADER_OFFSET + 0),
                ];
                (0, i18n_insert_before_index_1.addTNodeAndUpdateInsertBeforeIndex)(previousTNodes, tI18NTextNode(view_1.HEADER_OFFSET + 3));
                expect(previousTNodes).toEqual([
                    (0, matchers_1.matchTNode)({ index: view_1.HEADER_OFFSET + 5, insertBeforeIndex: view_1.HEADER_OFFSET + 0 }),
                    (0, matchers_1.matchTNode)({ index: view_1.HEADER_OFFSET + 6, insertBeforeIndex: view_1.HEADER_OFFSET + 0 }),
                    (0, matchers_1.matchTNode)({ index: view_1.HEADER_OFFSET + 0, insertBeforeIndex: view_1.HEADER_OFFSET + 3 }),
                    (0, matchers_1.matchTNode)({ index: view_1.HEADER_OFFSET + 3, insertBeforeIndex: null }),
                ]);
            });
        });
    });
    describe('scenario', () => {
        it('should rearrange the nodes', () => {
            const previousTNodes = [];
            (0, i18n_insert_before_index_1.addTNodeAndUpdateInsertBeforeIndex)(previousTNodes, tPlaceholderElementNode(view_1.HEADER_OFFSET + 2));
            (0, i18n_insert_before_index_1.addTNodeAndUpdateInsertBeforeIndex)(previousTNodes, tPlaceholderElementNode(view_1.HEADER_OFFSET + 8));
            (0, i18n_insert_before_index_1.addTNodeAndUpdateInsertBeforeIndex)(previousTNodes, tPlaceholderElementNode(view_1.HEADER_OFFSET + 4));
            (0, i18n_insert_before_index_1.addTNodeAndUpdateInsertBeforeIndex)(previousTNodes, tPlaceholderElementNode(view_1.HEADER_OFFSET + 5));
            (0, i18n_insert_before_index_1.addTNodeAndUpdateInsertBeforeIndex)(previousTNodes, tI18NTextNode(view_1.HEADER_OFFSET + 9));
            (0, i18n_insert_before_index_1.addTNodeAndUpdateInsertBeforeIndex)(previousTNodes, tPlaceholderElementNode(view_1.HEADER_OFFSET + 3));
            (0, i18n_insert_before_index_1.addTNodeAndUpdateInsertBeforeIndex)(previousTNodes, tPlaceholderElementNode(view_1.HEADER_OFFSET + 7));
            expect(previousTNodes).toEqual([
                (0, matchers_1.matchTNode)({ index: view_1.HEADER_OFFSET + 2, insertBeforeIndex: view_1.HEADER_OFFSET + 9 }),
                (0, matchers_1.matchTNode)({ index: view_1.HEADER_OFFSET + 8, insertBeforeIndex: view_1.HEADER_OFFSET + 4 }),
                (0, matchers_1.matchTNode)({ index: view_1.HEADER_OFFSET + 4, insertBeforeIndex: view_1.HEADER_OFFSET + 9 }),
                (0, matchers_1.matchTNode)({ index: view_1.HEADER_OFFSET + 5, insertBeforeIndex: view_1.HEADER_OFFSET + 9 }),
                (0, matchers_1.matchTNode)({ index: view_1.HEADER_OFFSET + 9, insertBeforeIndex: null }),
                (0, matchers_1.matchTNode)({ index: view_1.HEADER_OFFSET + 3, insertBeforeIndex: null }),
                (0, matchers_1.matchTNode)({ index: view_1.HEADER_OFFSET + 7, insertBeforeIndex: null }),
            ]);
        });
    });
});
