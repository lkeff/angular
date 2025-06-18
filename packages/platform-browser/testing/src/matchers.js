"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.expect = void 0;
const common_1 = require("@angular/common");
const testing_1 = require("@angular/core/testing");
const index_1 = require("../../index");
const browser_util_1 = require("./browser_util");
/**
 * Jasmine matching function with Angular matchers mixed in.
 *
 * ## Example
 *
 * {@example testing/ts/matchers.ts region='toHaveText'}
 */
const _expect = expect;
exports.expect = _expect;
beforeEach(function () {
    jasmine.addMatchers({
        toHaveText: function () {
            return {
                compare: function (actual, expectedText) {
                    const actualText = elementText(actual);
                    return {
                        pass: actualText == expectedText,
                        get message() {
                            return 'Expected ' + actualText + ' to be equal to ' + expectedText;
                        },
                    };
                },
            };
        },
        toHaveCssClass: function () {
            return { compare: buildError(false), negativeCompare: buildError(true) };
            function buildError(isNot) {
                return function (actual, className) {
                    return {
                        pass: (0, browser_util_1.hasClass)(actual, className) == !isNot,
                        get message() {
                            return `Expected ${actual.outerHTML} ${isNot ? 'not ' : ''}to contain the CSS class "${className}"`;
                        },
                    };
                };
            }
        },
        toHaveCssStyle: function () {
            return {
                compare: function (actual, styles) {
                    let allPassed;
                    if (typeof styles === 'string') {
                        allPassed = (0, browser_util_1.hasStyle)(actual, styles);
                    }
                    else {
                        allPassed = Object.keys(styles).length !== 0;
                        Object.keys(styles).forEach((prop) => {
                            allPassed = allPassed && (0, browser_util_1.hasStyle)(actual, prop, styles[prop]);
                        });
                    }
                    return {
                        pass: allPassed,
                        get message() {
                            const expectedValueStr = typeof styles === 'string' ? styles : JSON.stringify(styles);
                            return `Expected ${actual.outerHTML} ${!allPassed ? ' ' : 'not '}to contain the
                      CSS ${typeof styles === 'string' ? 'property' : 'styles'} "${expectedValueStr}"`;
                        },
                    };
                },
            };
        },
        toImplement: function () {
            return {
                compare: function (actualObject, expectedInterface) {
                    const intProps = Object.keys(expectedInterface.prototype);
                    const missedMethods = [];
                    intProps.forEach((k) => {
                        if (!actualObject.constructor.prototype[k])
                            missedMethods.push(k);
                    });
                    return {
                        pass: missedMethods.length == 0,
                        get message() {
                            return ('Expected ' +
                                actualObject +
                                ' to have the following methods: ' +
                                missedMethods.join(', '));
                        },
                    };
                },
            };
        },
        toContainComponent: function () {
            return {
                compare: function (actualFixture, expectedComponentType) {
                    const failOutput = arguments[2];
                    const msgFn = (msg) => [msg, failOutput].filter(Boolean).join(', ');
                    // verify correct actual type
                    if (!(actualFixture instanceof testing_1.ComponentFixture)) {
                        return {
                            pass: false,
                            message: msgFn(`Expected actual to be of type \'ComponentFixture\' [actual=${actualFixture.constructor.name}]`),
                        };
                    }
                    const found = !!actualFixture.debugElement.query(index_1.By.directive(expectedComponentType));
                    return found
                        ? { pass: true }
                        : { pass: false, message: msgFn(`Expected ${expectedComponentType.name} to show`) };
                },
            };
        },
    });
});
function elementText(n) {
    const hasNodes = (n) => {
        const children = n.childNodes;
        return children && children.length > 0;
    };
    if (n instanceof Array) {
        return n.map(elementText).join('');
    }
    if ((0, browser_util_1.isCommentNode)(n)) {
        return '';
    }
    if ((0, common_1.ɵgetDOM)().isElementNode(n)) {
        const tagName = n.tagName;
        if (tagName === 'CONTENT') {
            return elementText(Array.prototype.slice.apply(n.getDistributedNodes()));
        }
        else if (tagName === 'SLOT') {
            return elementText(Array.prototype.slice.apply(n.assignedNodes()));
        }
    }
    if (hasShadowRoot(n)) {
        return elementText((0, browser_util_1.childNodesAsList)(n.shadowRoot));
    }
    if (hasNodes(n)) {
        return elementText((0, browser_util_1.childNodesAsList)(n));
    }
    return n.textContent;
}
function hasShadowRoot(node) {
    return node.shadowRoot != null && node instanceof HTMLElement;
}
