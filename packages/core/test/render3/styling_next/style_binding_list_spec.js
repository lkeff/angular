"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStylingBindingHead = getStylingBindingHead;
const styling_1 = require("../../../src/render3/interfaces/styling");
const state_1 = require("../../../src/render3/state");
const style_binding_list_1 = require("../../../src/render3/styling/style_binding_list");
const tnode_manipulation_1 = require("../../../src/render3/tnode_manipulation");
const array_utils_1 = require("../../../src/util/array_utils");
describe('TNode styling linked list', () => {
    const mockFirstUpdatePassLView = [null, { firstUpdatePass: true }];
    beforeEach(() => (0, state_1.enterView)(mockFirstUpdatePassLView));
    afterEach(() => (0, state_1.leaveView)());
    describe('insertTStylingBinding', () => {
        it('should append template only', () => {
            const tNode = (0, tnode_manipulation_1.createTNode)(null, null, 2 /* TNodeType.Element */, 0, '', null);
            const tData = [null, null];
            (0, style_binding_list_1.insertTStylingBinding)(tData, tNode, 'tmpl1', 2, false, true);
            expectRange(tNode.classBindings).toEqual([2, 2]);
            expectTData(tData).toEqual([
                null,
                null, // 0
                'tmpl1',
                [false, 0, false, 0], // 2
            ]);
            (0, style_binding_list_1.insertTStylingBinding)(tData, tNode, 'tmpl2', 4, false, true);
            expectRange(tNode.classBindings).toEqual([2, 4]);
            expectTData(tData).toEqual([
                null,
                null, // 0
                'tmpl1',
                [false, 0, false, 4], // 2
                'tmpl2',
                [false, 2, false, 0], // 4
            ]);
            (0, style_binding_list_1.insertTStylingBinding)(tData, tNode, 'host1', 6, true, true);
            expectRange(tNode.classBindings).toEqual([2, 4]);
            expectTData(tData).toEqual([
                null,
                null, // 0
                'tmpl1',
                [false, 6, false, 4], // 2
                'tmpl2',
                [false, 2, false, 0], // 4
                'host1',
                [false, 0, false, 2], // 6
            ]);
            (0, style_binding_list_1.insertTStylingBinding)(tData, tNode, 'host2', 8, true, true);
            expectRange(tNode.classBindings).toEqual([2, 4]);
            expectTData(tData).toEqual([
                null,
                null, // 0
                'tmpl1',
                [false, 8, false, 4], // 2
                'tmpl2',
                [false, 2, false, 0], // 4
                'host1',
                [false, 0, false, 8], // 6
                'host2',
                [false, 6, false, 2], // 8
            ]);
        });
        it('should append host only', () => {
            const tData = [null, null];
            const tNode = (0, tnode_manipulation_1.createTNode)(null, null, 2 /* TNodeType.Element */, 0, '', null);
            (0, style_binding_list_1.insertTStylingBinding)(tData, tNode, 'host1', 2, true, true);
            expectRange(tNode.classBindings).toEqual([2, 0 /* no template binding */]);
            expectTData(tData).toEqual([
                null,
                null, // 0
                'host1',
                [false, 0, false, 0], // 2
            ]);
            (0, style_binding_list_1.insertTStylingBinding)(tData, tNode, 'host2', 4, true, true);
            expectRange(tNode.classBindings).toEqual([4, 0 /* no template binding */]);
            expectTData(tData).toEqual([
                null,
                null, // 0
                'host1',
                [false, 0, false, 4], // 2
                'host2',
                [false, 2, false, 0], // 4
            ]);
        });
        it('should append template and host', () => {
            const tNode = (0, tnode_manipulation_1.createTNode)(null, null, 2 /* TNodeType.Element */, 0, '', null);
            const tData = [null, null];
            (0, style_binding_list_1.insertTStylingBinding)(tData, tNode, 'tmpl1', 2, false, true);
            expectRange(tNode.classBindings).toEqual([2, 2]);
            expectTData(tData).toEqual([
                null,
                null, // 0
                'tmpl1',
                [false, 0, false, 0], // 2
            ]);
            (0, style_binding_list_1.insertTStylingBinding)(tData, tNode, 'host1', 4, true, true);
            expectRange(tNode.classBindings).toEqual([2, 2]);
            expectTData(tData).toEqual([
                null,
                null, // 0
                'tmpl1',
                [false, 4, false, 0], // 2
                'host1',
                [false, 0, false, 2], // 4
            ]);
        });
        it("should support example in 'tnode_linked_list.ts' documentation", () => {
            // See: `tnode_linked_list.ts` file description for this example.
            // Template: (ExampleComponent)
            //   ɵɵstyleMap({color: '#001'});   // Binding index: 10
            //   ɵɵstyleProp('color', '#002');  // Binding index: 12
            // MyComponent
            //   ɵɵstyleMap({color: '#003'});   // Binding index: 20
            //   ɵɵstyleProp('color', '#004');  // Binding index: 22
            // Style1Directive
            //   ɵɵstyleMap({color: '#005'});   // Binding index: 24
            //   ɵɵstyleProp('color', '#006');  // Binding index: 26
            // Style2Directive
            //   ɵɵstyleMap({color: '#007'});   // Binding index: 28
            //   ɵɵstyleProp('color', '#008');  // Binding index: 30
            const tNode = (0, tnode_manipulation_1.createTNode)(null, null, 2 /* TNodeType.Element */, 0, '', null);
            tNode.styles = '';
            const tData = (0, array_utils_1.newArray)(32, null);
            (0, style_binding_list_1.insertTStylingBinding)(tData, tNode, null, 10, false, false);
            expectRange(tNode.styleBindings).toEqual([10, 10]);
            expectTData(tData).toEqual([
                ...empty_0_through_9, //
                null,
                [false, 0, false, 0], // 10 - Template:  ɵɵstyleMap({color: '#001'});
                null,
                null, // 12
                ...empty_14_through_19, // 14-19
                null,
                null, // 20
                null,
                null, // 22
                null,
                null, // 24
                null,
                null, // 26
                null,
                null, // 28
                null,
                null, // 30
            ]);
            expectPriorityOrder(tData, tNode, false).toEqual([
                [10, null, false, false], // 10 - Template:  ɵɵstyleMap({color: '#001'});
            ]);
            (0, style_binding_list_1.insertTStylingBinding)(tData, tNode, 'color', 12, false, false);
            expectRange(tNode.styleBindings).toEqual([10, 12]);
            expectTData(tData).toEqual([
                ...empty_0_through_9, //
                null,
                [false, 0, false, 12], // 10 - Template:  ɵɵstyleMap({color: '#001'});
                'color',
                [false, 10, false, 0], // 12 - Template:  ɵɵstyleProp('color', '#002'});
                ...empty_14_through_19, // 14-19
                null,
                null, // 20
                null,
                null, // 22
                null,
                null, // 24
                null,
                null, // 26
                null,
                null, // 28
                null,
                null, // 30
            ]);
            expectPriorityOrder(tData, tNode, false).toEqual([
                [10, null, false, true], // 10 - Template:  ɵɵstyleMap({color: '#001'});
                [12, 'color', true, false], // 12 - Template:  ɵɵstyleProp('color', '#002'});
            ]);
            (0, style_binding_list_1.insertTStylingBinding)(tData, tNode, null, 20, true, false);
            expectRange(tNode.styleBindings).toEqual([10, 12]);
            expectTData(tData).toEqual([
                ...empty_0_through_9, //
                null,
                [false, 20, false, 12], // 10 - Template:  ɵɵstyleMap({color: '#001'});
                'color',
                [false, 10, false, 0], // 12 - Template:  ɵɵstyleProp('color', '#002'});
                ...empty_14_through_19, // 14-19
                null,
                [false, 0, false, 10], // 20 - MyComponent:  ɵɵstyleMap({color: '#003'});
                null,
                null, // 22
                null,
                null, // 24
                null,
                null, // 26
                null,
                null, // 28
                null,
                null, // 30
            ]);
            expectPriorityOrder(tData, tNode, false).toEqual([
                [20, null, false, true], // 20 - MyComponent:  ɵɵstyleMap({color: '#003'});
                [10, null, true, true], // 10 - Template:  ɵɵstyleMap({color: '#001'});
                [12, 'color', true, false], // 12 - Template:  ɵɵstyleProp('color', '#002'});
            ]);
            (0, style_binding_list_1.insertTStylingBinding)(tData, tNode, 'color', 22, true, false);
            expectRange(tNode.styleBindings).toEqual([10, 12]);
            expectTData(tData).toEqual([
                ...empty_0_through_9, // 00-09
                null,
                [false, 22, false, 12], // 10 - Template:  ɵɵstyleMap({color: '#001'});
                'color',
                [false, 10, false, 0], // 12 - Template:  ɵɵstyleProp('color', '#002'});
                ...empty_14_through_19, // 14-19
                null,
                [false, 0, false, 22], // 20 - MyComponent:  ɵɵstyleMap({color: '#003'});
                'color',
                [false, 20, false, 10], // 22 - MyComponent:  ɵɵstyleProp('color', '#004'});
                null,
                null, // 24
                null,
                null, // 26
                null,
                null, // 28
                null,
                null, // 30
            ]);
            expectPriorityOrder(tData, tNode, false).toEqual([
                [20, null, false, true], // 20 - MyComponent:  ɵɵstyleMap({color: '#003'});
                [22, 'color', true, true], // 22 - MyComponent:  ɵɵstyleProp('color', '#004'});
                [10, null, true, true], // 10 - Template:  ɵɵstyleMap({color: '#001'});
                [12, 'color', true, false], // 12 - Template:  ɵɵstyleProp('color', '#002'});
            ]);
            (0, style_binding_list_1.insertTStylingBinding)(tData, tNode, null, 24, true, false);
            expectRange(tNode.styleBindings).toEqual([10, 12]);
            expectTData(tData).toEqual([
                ...empty_0_through_9, //
                null,
                [false, 24, false, 12], // 10 - Template:  ɵɵstyleMap({color: '#001'});
                'color',
                [false, 10, false, 0], // 12 - Template:  ɵɵstyleProp('color', '#002'});
                ...empty_14_through_19, // 14-19
                null,
                [false, 0, false, 22], // 20 - MyComponent:  ɵɵstyleMap({color: '#003'});
                'color',
                [false, 20, false, 24], // 22 - MyComponent:  ɵɵstyleProp('color', '#004'});
                null,
                [false, 22, false, 10], // 24 - Style1Directive:  ɵɵstyleMap({color: '#003'});
                null,
                null, // 26
                null,
                null, // 28
                null,
                null, // 30
            ]);
            expectPriorityOrder(tData, tNode, false).toEqual([
                [20, null, false, true], // 20 - MyComponent:  ɵɵstyleMap({color: '#003'});
                [22, 'color', true, true], // 22 - MyComponent:  ɵɵstyleProp('color', '#004'});
                [24, null, true, true], // 24 - Style1Directive:  ɵɵstyleMap({color: '#003'});
                [10, null, true, true], // 10 - Template:  ɵɵstyleMap({color: '#001'});
                [12, 'color', true, false], // 12 - Template:  ɵɵstyleProp('color', '#002'});
            ]);
            (0, style_binding_list_1.insertTStylingBinding)(tData, tNode, 'color', 26, true, false);
            expectRange(tNode.styleBindings).toEqual([10, 12]);
            expectTData(tData).toEqual([
                ...empty_0_through_9, // 00-09
                null,
                [false, 26, false, 12], // 10 - Template:  ɵɵstyleMap({color: '#001'});
                'color',
                [false, 10, false, 0], // 12 - Template:  ɵɵstyleProp('color', '#002'});
                ...empty_14_through_19, // 14-19
                null,
                [false, 0, false, 22], // 20 - MyComponent:  ɵɵstyleMap({color: '#003'});
                'color',
                [false, 20, false, 24], // 22 - MyComponent:  ɵɵstyleProp('color', '#004'});
                null,
                [false, 22, false, 26], // 24 - Style1Directive:  ɵɵstyleMap({color: '#005'});
                'color',
                [false, 24, false, 10], // 26 - Style1Directive:  ɵɵstyleProp('color', '#006'});
                null,
                null, // 28
                null,
                null, // 30
            ]);
            expectPriorityOrder(tData, tNode, false).toEqual([
                [20, null, false, true], // 20 - MyComponent:  ɵɵstyleMap({color: '#003'});
                [22, 'color', true, true], // 22 - MyComponent:  ɵɵstyleProp('color', '#004'});
                [24, null, true, true], // 24 - Style1Directive:  ɵɵstyleMap({color: '#003'});
                [26, 'color', true, true], // 26 - Style1Directive:  ɵɵstyleProp('color', '#006'});
                [10, null, true, true], // 10 - Template:  ɵɵstyleMap({color: '#001'});
                [12, 'color', true, false], // 12 - Template:  ɵɵstyleProp('color', '#002'});
            ]);
            (0, style_binding_list_1.insertTStylingBinding)(tData, tNode, null, 28, true, false);
            expectRange(tNode.styleBindings).toEqual([10, 12]);
            expectTData(tData).toEqual([
                ...empty_0_through_9, //
                null,
                [false, 28, false, 12], // 10 - Template:  ɵɵstyleMap({color: '#001'});
                'color',
                [false, 10, false, 0], // 12 - Template:  ɵɵstyleProp('color', '#002'});
                ...empty_14_through_19, // 14-19
                null,
                [false, 0, false, 22], // 20 - MyComponent:  ɵɵstyleMap({color: '#003'});
                'color',
                [false, 20, false, 24], // 22 - MyComponent:  ɵɵstyleProp('color', '#004'});
                null,
                [false, 22, false, 26], // 24 - Style1Directive:  ɵɵstyleMap({color: '#005'});
                'color',
                [false, 24, false, 28], // 26 - Style1Directive:  ɵɵstyleProp('color', '#006'});
                null,
                [false, 26, false, 10], // 28 - Style2Directive:  ɵɵstyleMap({color: '#007'});
                null,
                null, // 30
            ]);
            expectPriorityOrder(tData, tNode, false).toEqual([
                [20, null, false, true], // 20 - MyComponent:  ɵɵstyleMap({color: '#003'});
                [22, 'color', true, true], // 22 - MyComponent:  ɵɵstyleProp('color', '#004'});
                [24, null, true, true], // 24 - Style1Directive:  ɵɵstyleMap({color: '#003'});
                [26, 'color', true, true], // 26 - Style1Directive:  ɵɵstyleProp('color', '#006'});
                [28, null, true, true], // 28 - Style2Directive:  ɵɵstyleMap({color: '#007'});
                [10, null, true, true], // 10 - Template:  ɵɵstyleMap({color: '#001'});
                [12, 'color', true, false], // 12 - Template:  ɵɵstyleProp('color', '#002'});
            ]);
            (0, style_binding_list_1.insertTStylingBinding)(tData, tNode, 'color', 30, true, false);
            expectRange(tNode.styleBindings).toEqual([10, 12]);
            expectTData(tData).toEqual([
                ...empty_0_through_9, // 00-09
                null,
                [false, 30, false, 12], // 10 - Template:  ɵɵstyleMap({color: '#001'});
                'color',
                [false, 10, false, 0], // 12 - Template:  ɵɵstyleProp('color', '#002'});
                ...empty_14_through_19, // 14-19
                null,
                [false, 0, false, 22], // 20 - MyComponent:  ɵɵstyleMap({color: '#003'});
                'color',
                [false, 20, false, 24], // 22 - MyComponent:  ɵɵstyleProp('color', '#004'});
                null,
                [false, 22, false, 26], // 24 - Style1Directive:  ɵɵstyleMap({color: '#005'});
                'color',
                [false, 24, false, 28], // 26 - Style1Directive:  ɵɵstyleProp('color', '#006'});
                null,
                [false, 26, false, 30], // 28 - Style2Directive:  ɵɵstyleMap({color: '#007'});
                'color',
                [false, 28, false, 10], // 30 - Style2Directive:  ɵɵstyleProp('color', '#008'});
            ]);
            expectPriorityOrder(tData, tNode, false).toEqual([
                [20, null, false, true], // 20 - MyComponent:  ɵɵstyleMap({color: '#003'});
                [22, 'color', true, true], // 22 - MyComponent:  ɵɵstyleProp('color', '#004'});
                [24, null, true, true], // 24 - Style1Directive:  ɵɵstyleMap({color: '#005'});
                [26, 'color', true, true], // 26 - Style1Directive:  ɵɵstyleProp('color', '#006'});
                [28, null, true, true], // 28 - Style2Directive:  ɵɵstyleMap({color: '#007'});
                [30, 'color', true, true], // 30 - Style2Directive:  ɵɵstyleProp('color', '#008'});
                [10, null, true, true], // 10 - Template:  ɵɵstyleMap({color: '#001'});
                [12, 'color', true, false], // 12 - Template:  ɵɵstyleProp('color', '#002'});
            ]);
        });
    });
    describe('markDuplicates', () => {
        it("should not mark items as duplicate if names don't match", () => {
            const tNode = (0, tnode_manipulation_1.createTNode)(null, null, 2 /* TNodeType.Element */, 0, '', null);
            const tData = [null, null];
            (0, style_binding_list_1.insertTStylingBinding)(tData, tNode, 'color', 2, false, false);
            expectPriorityOrder(tData, tNode, false).toEqual([
                //            PREV,  NEXT
                [2, 'color', false, false],
            ]);
            (0, style_binding_list_1.insertTStylingBinding)(tData, tNode, 'width', 4, false, false);
            expectPriorityOrder(tData, tNode, false).toEqual([
                //            PREV,  NEXT
                [2, 'color', false, false],
                [4, 'width', false, false],
            ]);
            (0, style_binding_list_1.insertTStylingBinding)(tData, tNode, 'height', 6, true, false);
            expectPriorityOrder(tData, tNode, false).toEqual([
                //            PREV,  NEXT
                [6, 'height', false, false],
                [2, 'color', false, false],
                [4, 'width', false, false],
            ]);
        });
        it('should mark items as duplicate if names match', () => {
            const tNode = (0, tnode_manipulation_1.createTNode)(null, null, 2 /* TNodeType.Element */, 0, '', null);
            const tData = [null, null];
            (0, style_binding_list_1.insertTStylingBinding)(tData, tNode, 'color', 2, false, false);
            expectPriorityOrder(tData, tNode, false).toEqual([
                //            PREV,  NEXT
                [2, 'color', false, false],
            ]);
            (0, style_binding_list_1.insertTStylingBinding)(tData, tNode, 'color', 4, false, false);
            expectPriorityOrder(tData, tNode, false).toEqual([
                //            PREV,  NEXT
                [2, 'color', false, true],
                [4, 'color', true, false],
            ]);
            (0, style_binding_list_1.insertTStylingBinding)(tData, tNode, 'height', 6, true, false);
            expectPriorityOrder(tData, tNode, false).toEqual([
                //            PREV,  NEXT
                [6, 'height', false, false],
                [2, 'color', false, true],
                [4, 'color', true, false],
            ]);
        });
        it('should treat maps as matching all', () => {
            const tNode = (0, tnode_manipulation_1.createTNode)(null, null, 2 /* TNodeType.Element */, 0, '', null);
            const tData = [null, null];
            (0, style_binding_list_1.insertTStylingBinding)(tData, tNode, 'color', 2, false, false);
            (0, style_binding_list_1.insertTStylingBinding)(tData, tNode, 'height', 4, true, false);
            expectPriorityOrder(tData, tNode, false).toEqual([
                //            PREV,  NEXT
                [4, 'height', false, false],
                [2, 'color', false, false],
            ]);
            (0, style_binding_list_1.insertTStylingBinding)(tData, tNode, null /*Map*/, 6, true, false);
            expectPriorityOrder(tData, tNode, false).toEqual([
                //            PREV,  NEXT
                [4, 'height', false, true],
                [6, null, true, true],
                [2, 'color', true, false],
            ]);
        });
        it('should mark all things after map as duplicate', () => {
            const tNode = (0, tnode_manipulation_1.createTNode)(null, null, 2 /* TNodeType.Element */, 0, '', null);
            const tData = [null, null];
            (0, style_binding_list_1.insertTStylingBinding)(tData, tNode, null, 2, false, false);
            (0, style_binding_list_1.insertTStylingBinding)(tData, tNode, 'height', 4, false, false);
            (0, style_binding_list_1.insertTStylingBinding)(tData, tNode, 'color', 6, true, false);
            expectPriorityOrder(tData, tNode, false).toEqual([
                //            PREV,  NEXT
                [6, 'color', false, true],
                [2, null, true, true],
                [4, 'height', true, false],
            ]);
        });
        it('should mark duplicate on complex objects like width.px', () => {
            const tNode = (0, tnode_manipulation_1.createTNode)(null, null, 2 /* TNodeType.Element */, 0, '', null);
            const tData = [null, null];
            (0, style_binding_list_1.insertTStylingBinding)(tData, tNode, 'width', 2, false, false);
            (0, style_binding_list_1.insertTStylingBinding)(tData, tNode, 'height', 4, false, false);
            expectPriorityOrder(tData, tNode, false).toEqual([
                //            PREV,  NEXT
                [2, 'width', false, false],
                [4, 'height', false, false],
            ]);
            (0, style_binding_list_1.insertTStylingBinding)(tData, tNode, 'height', 6, false, false);
            expectPriorityOrder(tData, tNode, false).toEqual([
                //            PREV,  NEXT
                [2, 'width', false, false],
                [4, 'height', false, true],
                [6, 'height', true, false],
            ]);
            (0, style_binding_list_1.insertTStylingBinding)(tData, tNode, 'width', 8, false, false);
            expectPriorityOrder(tData, tNode, false).toEqual([
                //            PREV,  NEXT
                [2, 'width', false, true],
                [4, 'height', false, true],
                [6, 'height', true, false],
                [8, 'width', true, false],
            ]);
        });
        it('should mark duplicate on static fields', () => {
            const tNode = (0, tnode_manipulation_1.createTNode)(null, null, 2 /* TNodeType.Element */, 0, '', null);
            tNode.residualStyles = ['color', 'blue'];
            const tData = [null, null];
            (0, style_binding_list_1.insertTStylingBinding)(tData, tNode, 'width', 2, false, false);
            expectPriorityOrder(tData, tNode, false).toEqual([
                //            PREV,  NEXT
                [2, 'width', false, false],
            ]);
            (0, style_binding_list_1.insertTStylingBinding)(tData, tNode, 'color', 4, false, false);
            expectPriorityOrder(tData, tNode, false).toEqual([
                //            PREV,  NEXT
                [2, 'width', false, false],
                [4, 'color', false, true],
            ]);
            (0, style_binding_list_1.insertTStylingBinding)(tData, tNode, null, 6, false, false);
            expectPriorityOrder(tData, tNode, false).toEqual([
                //            PREV,  NEXT
                [2, 'width', false, true],
                [4, 'color', false, true],
                [6, null, true, false],
            ]);
        });
    });
});
const empty_0_through_9 = [null, null, null, null, null, null, null, null, null, null];
const empty_14_through_19 = [null, null, null, null, null, null];
function expectRange(tStylingRange) {
    return expect([
        (0, styling_1.getTStylingRangePrev)(tStylingRange), //
        (0, styling_1.getTStylingRangeNext)(tStylingRange), //
    ]);
}
function expectTData(tData) {
    return expect(tData.map((tStylingRange) => {
        return typeof tStylingRange === 'number'
            ? [
                false,
                (0, styling_1.getTStylingRangePrev)(tStylingRange), //
                false,
                (0, styling_1.getTStylingRangeNext)(tStylingRange), //
            ]
            : tStylingRange;
    }));
}
function expectPriorityOrder(tData, tNode, isClassBinding) {
    // first find head.
    let index = getStylingBindingHead(tData, tNode, isClassBinding);
    const indexes = [];
    while (index !== 0) {
        let key = tData[index];
        const tStylingRange = tData[index + 1];
        indexes.push([
            index, //
            key, //
            (0, styling_1.getTStylingRangePrevDuplicate)(tStylingRange), //
            (0, styling_1.getTStylingRangeNextDuplicate)(tStylingRange), //
        ]);
        index = (0, styling_1.getTStylingRangeNext)(tStylingRange);
    }
    return expect(indexes);
}
/**
 * Find the head of the styling binding linked list.
 */
function getStylingBindingHead(tData, tNode, isClassBinding) {
    let index = (0, styling_1.getTStylingRangePrev)(isClassBinding ? tNode.classBindings : tNode.styleBindings);
    while (true) {
        const tStylingRange = tData[index + 1];
        const prev = (0, styling_1.getTStylingRangePrev)(tStylingRange);
        if (prev === 0) {
            // found head exit.
            return index;
        }
        else {
            index = prev;
        }
    }
}
