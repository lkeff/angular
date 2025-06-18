"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const animations_1 = require("../../../src/animations");
const util_1 = require("../../src/util");
const testing_1 = require("../../testing");
const shared_1 = require("../shared");
describe('AnimationTrigger', () => {
    // these tests are only meant to be run within the DOM (for now)
    if (isNode) {
        // Jasmine will throw if there are no tests.
        it('should pass', () => { });
        return;
    }
    let element;
    beforeEach(() => {
        element = document.createElement('div');
        document.body.appendChild(element);
    });
    afterEach(() => {
        element.remove();
    });
    describe('trigger validation', () => {
        it('should group errors together for an animation trigger', () => {
            expect(() => {
                (0, shared_1.makeTrigger)('myTrigger', [(0, animations_1.transition)('12345', (0, animations_1.animate)(3333))]);
            }).toThrowError(/NG03403: Animation parsing for the myTrigger trigger have failed/);
        });
        it('should throw an error when a transition within a trigger contains an invalid expression', () => {
            expect(() => {
                (0, shared_1.makeTrigger)('name', [(0, animations_1.transition)('somethingThatIsWrong', (0, animations_1.animate)(3333))]);
            }).toThrowError(/- NG03015: The provided transition expression "somethingThatIsWrong" is not supported/);
        });
        it('should throw an error if an animation alias is used that is not yet supported', () => {
            expect(() => {
                (0, shared_1.makeTrigger)('name', [(0, animations_1.transition)(':angular', (0, animations_1.animate)(3333))]);
            }).toThrowError(/- NG03016: The transition alias value ":angular" is not supported/);
        });
    });
    describe('trigger usage', () => {
        it('should construct a trigger based on the states and transition data', () => {
            const result = (0, shared_1.makeTrigger)('name', [
                (0, animations_1.state)('on', (0, animations_1.style)({ width: 0 })),
                (0, animations_1.state)('off', (0, animations_1.style)({ width: 100 })),
                (0, animations_1.transition)('on => off', (0, animations_1.animate)(1000)),
                (0, animations_1.transition)('off => on', (0, animations_1.animate)(1000)),
            ]);
            expect(result.states.get('on').buildStyles({}, [])).toEqual(new Map([['width', 0]]));
            expect(result.states.get('off').buildStyles({}, [])).toEqual(new Map([['width', 100]]));
            expect(result.transitionFactories.length).toEqual(2);
        });
        it('should allow multiple state values to use the same styles', () => {
            const result = (0, shared_1.makeTrigger)('name', [
                (0, animations_1.state)('on, off', (0, animations_1.style)({ width: 50 })),
                (0, animations_1.transition)('on => off', (0, animations_1.animate)(1000)),
                (0, animations_1.transition)('off => on', (0, animations_1.animate)(1000)),
            ]);
            expect(result.states.get('on').buildStyles({}, [])).toEqual(new Map([['width', 50]]));
            expect(result.states.get('off').buildStyles({}, [])).toEqual(new Map([['width', 50]]));
        });
        it('should find the first transition that matches', () => {
            const result = (0, shared_1.makeTrigger)('name', [
                (0, animations_1.transition)('a => b', (0, animations_1.animate)(1234)),
                (0, animations_1.transition)('b => c', (0, animations_1.animate)(5678)),
            ]);
            const trans = buildTransition(result, element, 'b', 'c');
            expect(trans.timelines.length).toEqual(1);
            const timeline = trans.timelines[0];
            expect(timeline.duration).toEqual(5678);
        });
        it('should find a transition with a `*` value', () => {
            const result = (0, shared_1.makeTrigger)('name', [
                (0, animations_1.transition)('* => b', (0, animations_1.animate)(1234)),
                (0, animations_1.transition)('b => *', (0, animations_1.animate)(5678)),
                (0, animations_1.transition)('* => *', (0, animations_1.animate)(9999)),
            ]);
            let trans = buildTransition(result, element, 'b', 'c');
            expect(trans.timelines[0].duration).toEqual(5678);
            trans = buildTransition(result, element, 'a', 'b');
            expect(trans.timelines[0].duration).toEqual(1234);
            trans = buildTransition(result, element, 'c', 'c');
            expect(trans.timelines[0].duration).toEqual(9999);
        });
        it('should null when no results are found', () => {
            const result = (0, shared_1.makeTrigger)('name', [(0, animations_1.transition)('a => b', (0, animations_1.animate)(1111))]);
            const trigger = result.matchTransition('b', 'a', {}, {});
            expect(trigger).toBeFalsy();
        });
        it('should support bi-directional transition expressions', () => {
            const result = (0, shared_1.makeTrigger)('name', [(0, animations_1.transition)('a <=> b', (0, animations_1.animate)(2222))]);
            const t1 = buildTransition(result, element, 'a', 'b');
            expect(t1.timelines[0].duration).toEqual(2222);
            const t2 = buildTransition(result, element, 'b', 'a');
            expect(t2.timelines[0].duration).toEqual(2222);
        });
        it('should support multiple transition statements in one string', () => {
            const result = (0, shared_1.makeTrigger)('name', [(0, animations_1.transition)('a => b, b => a, c => *', (0, animations_1.animate)(1234))]);
            const t1 = buildTransition(result, element, 'a', 'b');
            expect(t1.timelines[0].duration).toEqual(1234);
            const t2 = buildTransition(result, element, 'b', 'a');
            expect(t2.timelines[0].duration).toEqual(1234);
            const t3 = buildTransition(result, element, 'c', 'a');
            expect(t3.timelines[0].duration).toEqual(1234);
        });
        describe('params', () => {
            it('should support transition-level animation variable params', () => {
                const result = (0, shared_1.makeTrigger)('name', [
                    (0, animations_1.transition)('a => b', [(0, animations_1.style)({ height: '{{ a }}' }), (0, animations_1.animate)(1000, (0, animations_1.style)({ height: '{{ b }}' }))], buildParams({ a: '100px', b: '200px' })),
                ]);
                const trans = buildTransition(result, element, 'a', 'b');
                const keyframes = trans.timelines[0].keyframes;
                expect(keyframes).toEqual([
                    new Map([
                        ['height', '100px'],
                        ['offset', 0],
                    ]),
                    new Map([
                        ['height', '200px'],
                        ['offset', 1],
                    ]),
                ]);
            });
            it('should substitute variable params provided directly within the transition match', () => {
                const result = (0, shared_1.makeTrigger)('name', [
                    (0, animations_1.transition)('a => b', [(0, animations_1.style)({ height: '{{ a }}' }), (0, animations_1.animate)(1000, (0, animations_1.style)({ height: '{{ b }}' }))], buildParams({ a: '100px', b: '200px' })),
                ]);
                const trans = buildTransition(result, element, 'a', 'b', {}, buildParams({ a: '300px' }));
                const keyframes = trans.timelines[0].keyframes;
                expect(keyframes).toEqual([
                    new Map([
                        ['height', '300px'],
                        ['offset', 0],
                    ]),
                    new Map([
                        ['height', '200px'],
                        ['offset', 1],
                    ]),
                ]);
            });
        });
        it('should match `true` and `false` given boolean values', () => {
            const result = (0, shared_1.makeTrigger)('name', [
                (0, animations_1.state)('false', (0, animations_1.style)({ color: 'red' })),
                (0, animations_1.state)('true', (0, animations_1.style)({ color: 'green' })),
                (0, animations_1.transition)('true <=> false', (0, animations_1.animate)(1234)),
            ]);
            const trans = buildTransition(result, element, false, true);
            expect(trans.timelines[0].duration).toEqual(1234);
        });
        it('should match `1` and `0` given boolean values', () => {
            const result = (0, shared_1.makeTrigger)('name', [
                (0, animations_1.state)('0', (0, animations_1.style)({ color: 'red' })),
                (0, animations_1.state)('1', (0, animations_1.style)({ color: 'green' })),
                (0, animations_1.transition)('1 <=> 0', (0, animations_1.animate)(4567)),
            ]);
            const trans = buildTransition(result, element, false, true);
            expect(trans.timelines[0].duration).toEqual(4567);
        });
        it('should match `true` and `false` state styles on a `1 <=> 0` boolean transition given boolean values', () => {
            const result = (0, shared_1.makeTrigger)('name', [
                (0, animations_1.state)('false', (0, animations_1.style)({ color: 'red' })),
                (0, animations_1.state)('true', (0, animations_1.style)({ color: 'green' })),
                (0, animations_1.transition)('1 <=> 0', (0, animations_1.animate)(4567)),
            ]);
            const trans = buildTransition(result, element, false, true);
            expect(trans.timelines[0].keyframes).toEqual([
                new Map([
                    ['offset', 0],
                    ['color', 'red'],
                ]),
                new Map([
                    ['offset', 1],
                    ['color', 'green'],
                ]),
            ]);
        });
        it('should match `1` and `0` state styles on a `true <=> false` boolean transition given boolean values', () => {
            const result = (0, shared_1.makeTrigger)('name', [
                (0, animations_1.state)('0', (0, animations_1.style)({ color: 'orange' })),
                (0, animations_1.state)('1', (0, animations_1.style)({ color: 'blue' })),
                (0, animations_1.transition)('true <=> false', (0, animations_1.animate)(4567)),
            ]);
            const trans = buildTransition(result, element, false, true);
            expect(trans.timelines[0].keyframes).toEqual([
                new Map([
                    ['offset', 0],
                    ['color', 'orange'],
                ]),
                new Map([
                    ['offset', 1],
                    ['color', 'blue'],
                ]),
            ]);
        });
        it('should treat numeric values (disguised as strings) as proper state values', () => {
            const result = (0, shared_1.makeTrigger)('name', [
                (0, animations_1.state)(1, (0, animations_1.style)({ opacity: 0 })),
                (0, animations_1.state)(0, (0, animations_1.style)({ opacity: 0 })),
                (0, animations_1.transition)('* => *', (0, animations_1.animate)(1000)),
            ]);
            expect(() => {
                const trans = buildTransition(result, element, false, true);
            }).not.toThrow();
        });
        describe('aliases', () => {
            it('should alias the :enter transition as void => *', () => {
                const result = (0, shared_1.makeTrigger)('name', [(0, animations_1.transition)(':enter', (0, animations_1.animate)(3333))]);
                const trans = buildTransition(result, element, 'void', 'something');
                expect(trans.timelines[0].duration).toEqual(3333);
            });
            it('should alias the :leave transition as * => void', () => {
                const result = (0, shared_1.makeTrigger)('name', [(0, animations_1.transition)(':leave', (0, animations_1.animate)(3333))]);
                const trans = buildTransition(result, element, 'something', 'void');
                expect(trans.timelines[0].duration).toEqual(3333);
            });
        });
    });
});
function buildTransition(trigger, element, fromState, toState, fromOptions, toOptions) {
    const params = (toOptions && toOptions.params) || {};
    const trans = trigger.matchTransition(fromState, toState, element, params);
    if (trans) {
        const driver = new testing_1.MockAnimationDriver();
        return trans.build(driver, element, fromState, toState, util_1.ENTER_CLASSNAME, util_1.LEAVE_CLASSNAME, fromOptions, toOptions);
    }
    return null;
}
function buildParams(params) {
    return { params };
}
