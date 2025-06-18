"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchObjectShape = matchObjectShape;
exports.matchTView = matchTView;
exports.matchTNode = matchTNode;
exports.matchTI18n = matchTI18n;
exports.matchTIcu = matchTIcu;
exports.matchDomElement = matchDomElement;
exports.matchDomText = matchDomText;
exports.matchI18nMutableOpCodes = matchI18nMutableOpCodes;
const is_shape_of_1 = require("./is_shape_of");
/**
 * Generic matcher which asserts that an object is of a given shape (`shapePredicate`) and that it
 * contains a subset of properties.
 *
 * @param name Name of `shapePredicate` to display when assertion fails.
 * @param shapePredicate Predicate which verifies that the object is of correct shape.
 * @param expected Expected set of properties to be found on the object.
 */
function matchObjectShape(name, shapePredicate, expected = {}) {
    const matcher = function () { };
    let _actual = null;
    let _matcherUtils = null;
    matcher.asymmetricMatch = function (actual, matcherUtils) {
        _actual = actual;
        _matcherUtils = matcherUtils;
        if (!shapePredicate(actual))
            return false;
        for (const key in expected) {
            if (expected.hasOwnProperty(key) && !matcherUtils.equals(actual[key], expected[key])) {
                return false;
            }
        }
        return true;
    };
    matcher.jasmineToString = function (pp) {
        let errors = [];
        if (!_actual || typeof _actual !== 'object') {
            return `Expecting ${pp(expect)} got ${pp(_actual)}`;
        }
        for (const key in expected) {
            if (expected.hasOwnProperty(key) && !_matcherUtils.equals(_actual[key], expected[key]))
                errors.push(`\n  property obj.${key} to equal ${expected[key]} but got ${_actual[key]}`);
        }
        return errors.join('\n');
    };
    return matcher;
}
/**
 * Asymmetric matcher which matches a `TView` of a given shape.
 *
 * Expected usage:
 * ```ts
 * expect(tNode).toEqual(matchTView({type: TViewType.Root}));
 * expect({
 *   node: tNode
 * }).toEqual({
 *   node: matchTNode({type: TViewType.Root})
 * });
 * ```
 *
 * @param expected optional properties which the `TView` must contain.
 */
function matchTView(expected) {
    return matchObjectShape('TView', is_shape_of_1.isTView, expected);
}
/**
 * Asymmetric matcher which matches a `TNode` of a given shape.
 *
 * Expected usage:
 * ```ts
 * expect(tNode).toEqual(matchTNode({type: TNodeType.Element}));
 * expect({
 *   node: tNode
 * }).toEqual({
 *   node: matchTNode({type: TNodeType.Element})
 * });
 * ```
 *
 * @param expected optional properties which the `TNode` must contain.
 */
function matchTNode(expected) {
    return matchObjectShape('TNode', is_shape_of_1.isTNode, expected);
}
/**
 * Asymmetric matcher which matches a `T18n` of a given shape.
 *
 * Expected usage:
 * ```ts
 * expect(tNode).toEqual(matchT18n({vars: 0}));
 * expect({
 *   node: tNode
 * }).toEqual({
 *   node: matchT18n({vars: 0})
 * });
 * ```
 *
 * @param expected optional properties which the `TI18n` must contain.
 */
function matchTI18n(expected) {
    return matchObjectShape('TI18n', is_shape_of_1.isTI18n, expected);
}
/**
 * Asymmetric matcher which matches a `T1cu` of a given shape.
 *
 * Expected usage:
 * ```ts
 * expect(tNode).toEqual(matchTIcu({type: TIcuType.select}));
 * expect({
 *   type: TIcuType.select
 * }).toEqual({
 *   node: matchT18n({type: TIcuType.select})
 * });
 * ```
 *
 * @param expected optional properties which the `TIcu` must contain.
 */
function matchTIcu(expected) {
    return matchObjectShape('TIcu', is_shape_of_1.isTIcu, expected);
}
/**
 * Asymmetric matcher which matches a DOM Element.
 *
 * Expected usage:
 * ```ts
 * expect(div).toEqual(matchT18n('div', {id: '123'}));
 * expect({
 *   node: div
 * }).toEqual({
 *   node: matchT18n('div', {id: '123'})
 * });
 * ```
 *
 * @param expectedTagName optional DOM tag name.
 * @param expectedAttributes optional DOM element properties.
 */
function matchDomElement(expectedTagName = undefined, expectedAttrs = {}) {
    const matcher = function () { };
    let _actual = null;
    matcher.asymmetricMatch = function (actual) {
        _actual = actual;
        if (!(0, is_shape_of_1.isDOMElement)(actual))
            return false;
        if (expectedTagName && expectedTagName.toUpperCase() !== actual.tagName.toUpperCase()) {
            return false;
        }
        if (expectedAttrs) {
            for (const attrName in expectedAttrs) {
                if (expectedAttrs.hasOwnProperty(attrName)) {
                    const expectedAttrValue = expectedAttrs[attrName];
                    const actualAttrValue = actual.getAttribute(attrName);
                    if (expectedAttrValue !== actualAttrValue) {
                        return false;
                    }
                }
            }
        }
        return true;
    };
    matcher.jasmineToString = function () {
        let actualStr = (0, is_shape_of_1.isDOMElement)(_actual)
            ? `<${_actual.tagName}${toString(_actual.attributes)}>`
            : JSON.stringify(_actual);
        let expectedStr = `<${expectedTagName || '*'}${Object.entries(expectedAttrs).map(([key, value]) => ` ${key}=${JSON.stringify(value)}`)}>`;
        return `[${actualStr} != ${expectedStr}]`;
    };
    function toString(attrs) {
        let text = '';
        for (let i = 0; i < attrs.length; i++) {
            const attr = attrs[i];
            text += ` ${attr.name}=${JSON.stringify(attr.value)}`;
        }
        return text;
    }
    return matcher;
}
/**
 * Asymmetric matcher which matches DOM text node.
 *
 * Expected usage:
 * ```ts
 * expect(div).toEqual(matchDomText('text'));
 * expect({
 *   node: div
 * }).toEqual({
 *   node: matchDomText('text')
 * });
 * ```
 *
 * @param expectedText optional DOM text.
 */
function matchDomText(expectedText = undefined) {
    const matcher = function () { };
    let _actual = null;
    matcher.asymmetricMatch = function (actual) {
        _actual = actual;
        if (!(0, is_shape_of_1.isDOMText)(actual))
            return false;
        if (expectedText && expectedText !== actual.textContent) {
            return false;
        }
        return true;
    };
    matcher.jasmineToString = function () {
        let actualStr = (0, is_shape_of_1.isDOMText)(_actual)
            ? `#TEXT: ${JSON.stringify(_actual.textContent)}`
            : JSON.stringify(_actual);
        let expectedStr = `#TEXT: ${JSON.stringify(expectedText)}`;
        return `[${actualStr} != ${expectedStr}]`;
    };
    return matcher;
}
function matchI18nMutableOpCodes(expectedMutableOpCodes) {
    const matcher = function () { };
    let _actual = null;
    matcher.asymmetricMatch = function (actual, matchersUtil) {
        _actual = actual;
        if (!Array.isArray(actual))
            return false;
        const debug = actual.debug;
        if (expectedMutableOpCodes && !matchersUtil.equals(debug, expectedMutableOpCodes)) {
            return false;
        }
        return true;
    };
    matcher.jasmineToString = function () {
        const debug = _actual.debug;
        return `[${JSON.stringify(debug)} != ${expectedMutableOpCodes}]`;
    };
    return matcher;
}
