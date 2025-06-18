"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const is_shape_of_1 = require("./is_shape_of");
const matchers_1 = require("./matchers");
const tnode_manipulation_1 = require("../../src/render3/tnode_manipulation");
const construction_1 = require("../../src/render3/view/construction");
describe('render3 matchers', () => {
    const fakeMatcherUtil = { equals: (a, b) => a === b };
    describe('matchObjectShape', () => {
        const myShape = { propA: 'value', propB: 3 };
        function isMyShape(obj) {
            return (0, is_shape_of_1.isShapeOf)(obj, ShapeOfMyShape);
        }
        const ShapeOfMyShape = { propA: true, propB: true };
        function matchMyShape(expected) {
            return (0, matchers_1.matchObjectShape)('MyShape', isMyShape, expected);
        }
        it('should match', () => {
            expect(isMyShape(myShape)).toBeTrue();
            expect(myShape).toEqual(matchMyShape());
            expect(myShape).toEqual(matchMyShape({ propA: 'value' }));
            expect({ node: myShape }).toEqual({ node: matchMyShape({ propA: 'value' }) });
        });
        it('should produce human readable errors', () => {
            const matcher = matchMyShape({ propA: 'different' });
            expect(matcher.asymmetricMatch(myShape, fakeMatcherUtil)).toEqual(false);
            expect(matcher.jasmineToString((value) => value + '')).toEqual('\n  property obj.propA to equal different but got value');
        });
    });
    describe('matchTView', () => {
        const tView = (0, construction_1.createTView)(0 /* TViewType.Root */, null, null, 2, 3, null, null, null, null, null, null);
        it('should match', () => {
            expect(tView).toEqual((0, matchers_1.matchTView)());
            expect(tView).toEqual((0, matchers_1.matchTView)({ type: 0 /* TViewType.Root */ }));
            expect({ node: tView }).toEqual({ node: (0, matchers_1.matchTView)({ type: 0 /* TViewType.Root */ }) });
        });
    });
    describe('matchTNode', () => {
        const tView = (0, construction_1.createTView)(0 /* TViewType.Root */, null, null, 2, 3, null, null, null, null, null, null);
        const tNode = (0, tnode_manipulation_1.createTNode)(tView, null, 2 /* TNodeType.Element */, 0, 'tagName', []);
        it('should match', () => {
            expect(tNode).toEqual((0, matchers_1.matchTNode)());
            expect(tNode).toEqual((0, matchers_1.matchTNode)({ type: 2 /* TNodeType.Element */, value: 'tagName' }));
            expect({ node: tNode }).toEqual({ node: (0, matchers_1.matchTNode)({ type: 2 /* TNodeType.Element */ }) });
        });
    });
    describe('matchDomElement', () => {
        const div = document.createElement('div');
        div.setAttribute('name', 'Name');
        it('should match', () => {
            expect(div).toEqual((0, matchers_1.matchDomElement)());
            expect(div).toEqual((0, matchers_1.matchDomElement)('div', { name: 'Name' }));
        });
        it('should produce human readable error', () => {
            const matcher = (0, matchers_1.matchDomElement)('div', { name: 'other' });
            expect(matcher.asymmetricMatch(div, fakeMatcherUtil)).toEqual(false);
            expect(matcher.jasmineToString((value) => value + '')).toEqual(`[<DIV name="Name"> != <div name="other">]`);
        });
    });
    describe('matchDomText', () => {
        const text = document.createTextNode('myText');
        it('should match', () => {
            expect(text).toEqual((0, matchers_1.matchDomText)());
            expect(text).toEqual((0, matchers_1.matchDomText)('myText'));
        });
        it('should produce human readable error', () => {
            const matcher = (0, matchers_1.matchDomText)('other text');
            expect(matcher.asymmetricMatch(text, fakeMatcherUtil)).toEqual(false);
            expect(matcher.jasmineToString((value) => value + '')).toEqual(`[#TEXT: "myText" != #TEXT: "other text"]`);
        });
    });
});
