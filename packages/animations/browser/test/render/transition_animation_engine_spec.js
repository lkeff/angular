"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const animations_1 = require("../../../src/animations");
const animation_ast_builder_1 = require("../../src/dsl/animation_ast_builder");
const animation_trigger_1 = require("../../src/dsl/animation_trigger");
const animation_style_normalizer_1 = require("../../src/dsl/style_normalization/animation_style_normalizer");
const shared_1 = require("../../src/render/shared");
const transition_animation_engine_1 = require("../../src/render/transition_animation_engine");
const mock_animation_driver_1 = require("../../testing/src/mock_animation_driver");
const DEFAULT_NAMESPACE_ID = 'id';
(function () {
    const driver = new mock_animation_driver_1.MockAnimationDriver();
    // these tests are only meant to be run within the DOM
    if (isNode)
        return;
    describe('TransitionAnimationEngine', () => {
        let element;
        beforeEach(() => {
            mock_animation_driver_1.MockAnimationDriver.log = [];
            element = document.createElement('div');
            document.body.appendChild(element);
        });
        afterEach(() => {
            element.remove();
        });
        function makeEngine(normalizer) {
            const engine = new transition_animation_engine_1.TransitionAnimationEngine((0, shared_1.getBodyNode)(), driver, normalizer || new animation_style_normalizer_1.NoopAnimationStyleNormalizer());
            engine.createNamespace(DEFAULT_NAMESPACE_ID, element);
            return engine;
        }
        describe('trigger registration', () => {
            it('should ignore and not throw an error if the same trigger is registered twice', () => {
                // TODO (matsko): ask why this is avoided
                const engine = makeEngine();
                registerTrigger(element, engine, (0, animations_1.trigger)('trig', []));
                expect(() => {
                    registerTrigger(element, engine, (0, animations_1.trigger)('trig', []));
                }).not.toThrow();
            });
        });
        describe('property setting', () => {
            it('should invoke a transition based on a property change', () => {
                const engine = makeEngine();
                const trig = (0, animations_1.trigger)('myTrigger', [
                    (0, animations_1.transition)('* => *', [(0, animations_1.style)({ height: '0px' }), (0, animations_1.animate)(1000, (0, animations_1.style)({ height: '100px' }))]),
                ]);
                registerTrigger(element, engine, trig);
                setProperty(element, engine, 'myTrigger', 'value');
                engine.flush();
                expect(engine.players.length).toEqual(1);
                const player = mock_animation_driver_1.MockAnimationDriver.log.pop();
                expect(player.keyframes).toEqual([
                    new Map([
                        ['height', '0px'],
                        ['offset', 0],
                    ]),
                    new Map([
                        ['height', '100px'],
                        ['offset', 1],
                    ]),
                ]);
            });
            it('should not queue an animation if the property value has not changed at all', () => {
                const engine = makeEngine();
                const trig = (0, animations_1.trigger)('myTrigger', [
                    (0, animations_1.transition)('* => *', [(0, animations_1.style)({ height: '0px' }), (0, animations_1.animate)(1000, (0, animations_1.style)({ height: '100px' }))]),
                ]);
                registerTrigger(element, engine, trig);
                engine.flush();
                expect(engine.players.length).toEqual(0);
                setProperty(element, engine, 'myTrigger', 'abc');
                engine.flush();
                expect(engine.players.length).toEqual(1);
                setProperty(element, engine, 'myTrigger', 'abc');
                engine.flush();
                expect(engine.players.length).toEqual(1);
            });
            it('should throw an error if an animation property without a matching trigger is changed', () => {
                const engine = makeEngine();
                expect(() => {
                    setProperty(element, engine, 'myTrigger', 'no');
                }).toThrowError(/The provided animation trigger "myTrigger" has not been registered!/);
            });
        });
        describe('removal operations', () => {
            it("should cleanup all inner state that's tied to an element once removed", () => {
                const engine = makeEngine();
                const trig = (0, animations_1.trigger)('myTrigger', [
                    (0, animations_1.transition)(':leave', [(0, animations_1.style)({ height: '0px' }), (0, animations_1.animate)(1000, (0, animations_1.style)({ height: '100px' }))]),
                ]);
                registerTrigger(element, engine, trig);
                setProperty(element, engine, 'myTrigger', 'value');
                engine.flush();
                expect(engine.statesByElement.has(element)).toBe(true, 'Expected element data to be defined.');
                expect(engine.playersByElement.has(element)).toBe(true, 'Expected element data to be defined.');
                engine.destroy(DEFAULT_NAMESPACE_ID, null);
                engine.removeNode(DEFAULT_NAMESPACE_ID, element, true);
                engine.flush();
                engine.players[0].finish();
                expect(engine.statesByElement.has(element)).toBe(false, 'Expected element data to be undefined.');
                expect(engine.playersByElement.has(element)).toBe(false, 'Expected element data to be undefined.');
            });
            it('should create and recreate a namespace for a host element with the same component source', () => {
                const engine = makeEngine();
                const trig = (0, animations_1.trigger)('myTrigger', [
                    (0, animations_1.transition)('* => *', (0, animations_1.animate)(1234, (0, animations_1.style)({ color: 'red' }))),
                ]);
                registerTrigger(element, engine, trig);
                setProperty(element, engine, 'myTrigger', 'value');
                engine.flush();
                expect(engine.players[0].getRealPlayer()
                    .duration).toEqual(1234);
                engine.destroy(DEFAULT_NAMESPACE_ID, null);
                registerTrigger(element, engine, trig);
                setProperty(element, engine, 'myTrigger', 'value2');
                engine.flush();
                expect(engine.players[0].getRealPlayer()
                    .duration).toEqual(1234);
            });
            it('should clear child node data when a parent node with leave transition is removed', () => {
                const engine = makeEngine();
                const child = document.createElement('div');
                const parentTrigger = (0, animations_1.trigger)('parent', [
                    (0, animations_1.transition)(':leave', [(0, animations_1.style)({ height: '0px' }), (0, animations_1.animate)(1000, (0, animations_1.style)({ height: '100px' }))]),
                ]);
                const childTrigger = (0, animations_1.trigger)('child', [
                    (0, animations_1.transition)(':enter', [(0, animations_1.style)({ opacity: '0' }), (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: '1' }))]),
                ]);
                registerTrigger(element, engine, parentTrigger);
                registerTrigger(child, engine, childTrigger);
                element.appendChild(child);
                engine.insertNode(DEFAULT_NAMESPACE_ID, child, element, true);
                setProperty(element, engine, 'parent', 'value');
                setProperty(child, engine, 'child', 'visible');
                engine.flush();
                expect(engine.statesByElement.has(element)).toBe(true, 'Expected parent data to be defined.');
                expect(engine.statesByElement.has(child)).toBe(true, 'Expected child data to be defined.');
                engine.removeNode(DEFAULT_NAMESPACE_ID, element, true);
                engine.flush();
                engine.players[0].finish();
                expect(engine.statesByElement.has(element)).toBe(false, 'Expected parent data to be cleared.');
                expect(engine.statesByElement.has(child)).toBe(false, 'Expected child data to be cleared.');
            });
        });
        describe('event listeners', () => {
            it('should listen to the onStart operation for the animation', () => {
                const engine = makeEngine();
                const trig = (0, animations_1.trigger)('myTrigger', [
                    (0, animations_1.transition)('* => *', [(0, animations_1.style)({ height: '0px' }), (0, animations_1.animate)(1000, (0, animations_1.style)({ height: '100px' }))]),
                ]);
                let count = 0;
                registerTrigger(element, engine, trig);
                listen(element, engine, 'myTrigger', 'start', () => count++);
                setProperty(element, engine, 'myTrigger', 'value');
                expect(count).toEqual(0);
                engine.flush();
                expect(count).toEqual(1);
            });
            it('should listen to the onDone operation for the animation', () => {
                const engine = makeEngine();
                const trig = (0, animations_1.trigger)('myTrigger', [
                    (0, animations_1.transition)('* => *', [(0, animations_1.style)({ height: '0px' }), (0, animations_1.animate)(1000, (0, animations_1.style)({ height: '100px' }))]),
                ]);
                let count = 0;
                registerTrigger(element, engine, trig);
                listen(element, engine, 'myTrigger', 'done', () => count++);
                setProperty(element, engine, 'myTrigger', 'value');
                expect(count).toEqual(0);
                engine.flush();
                expect(count).toEqual(0);
                engine.players[0].finish();
                expect(count).toEqual(1);
            });
            it("should throw an error when an event is listened to that isn't supported", () => {
                const engine = makeEngine();
                const trig = (0, animations_1.trigger)('myTrigger', []);
                registerTrigger(element, engine, trig);
                expect(() => {
                    listen(element, engine, 'myTrigger', 'explode', () => { });
                }).toThrowError(/The provided animation trigger event "explode" for the animation trigger "myTrigger" is not supported!/);
            });
            it("should throw an error when an event is listened for a trigger that doesn't exist", () => {
                const engine = makeEngine();
                expect(() => {
                    listen(element, engine, 'myTrigger', 'explode', () => { });
                }).toThrowError(/Unable to listen on the animation trigger event "explode" because the animation trigger "myTrigger" doesn\'t exist!/);
            });
            it('should throw an error when an undefined event is listened for', () => {
                const engine = makeEngine();
                const trig = (0, animations_1.trigger)('myTrigger', []);
                registerTrigger(element, engine, trig);
                expect(() => {
                    listen(element, engine, 'myTrigger', '', () => { });
                }).toThrowError(/Unable to listen on the animation trigger "myTrigger" because the provided event is undefined!/);
            });
            it('should retain event listeners and call them for successive animation state changes', () => {
                const engine = makeEngine();
                const trig = (0, animations_1.trigger)('myTrigger', [
                    (0, animations_1.transition)('* => *', [(0, animations_1.style)({ height: '0px' }), (0, animations_1.animate)(1000, (0, animations_1.style)({ height: '100px' }))]),
                ]);
                registerTrigger(element, engine, trig);
                let count = 0;
                listen(element, engine, 'myTrigger', 'start', () => count++);
                setProperty(element, engine, 'myTrigger', '123');
                engine.flush();
                expect(count).toEqual(1);
                setProperty(element, engine, 'myTrigger', '456');
                engine.flush();
                expect(count).toEqual(2);
            });
            it('should only fire event listener changes for when the corresponding trigger changes state', () => {
                const engine = makeEngine();
                const trig1 = (0, animations_1.trigger)('myTrigger1', [
                    (0, animations_1.transition)('* => 123', [(0, animations_1.style)({ height: '0px' }), (0, animations_1.animate)(1000, (0, animations_1.style)({ height: '100px' }))]),
                ]);
                registerTrigger(element, engine, trig1);
                const trig2 = (0, animations_1.trigger)('myTrigger2', [
                    (0, animations_1.transition)('* => 123', [(0, animations_1.style)({ width: '0px' }), (0, animations_1.animate)(1000, (0, animations_1.style)({ width: '100px' }))]),
                ]);
                registerTrigger(element, engine, trig2);
                let count = 0;
                listen(element, engine, 'myTrigger1', 'start', () => count++);
                setProperty(element, engine, 'myTrigger1', '123');
                engine.flush();
                expect(count).toEqual(1);
                setProperty(element, engine, 'myTrigger2', '123');
                engine.flush();
                expect(count).toEqual(1);
            });
            it('should allow a listener to be deregistered, but only after a flush occurs', () => {
                const engine = makeEngine();
                const trig = (0, animations_1.trigger)('myTrigger', [
                    (0, animations_1.transition)('* => 123', [(0, animations_1.style)({ height: '0px' }), (0, animations_1.animate)(1000, (0, animations_1.style)({ height: '100px' }))]),
                ]);
                registerTrigger(element, engine, trig);
                let count = 0;
                const deregisterFn = listen(element, engine, 'myTrigger', 'start', () => count++);
                setProperty(element, engine, 'myTrigger', '123');
                engine.flush();
                expect(count).toEqual(1);
                deregisterFn();
                engine.flush();
                setProperty(element, engine, 'myTrigger', '456');
                engine.flush();
                expect(count).toEqual(1);
            });
            it('should trigger a listener callback with an AnimationEvent argument', () => {
                const engine = makeEngine();
                registerTrigger(element, engine, (0, animations_1.trigger)('myTrigger', [
                    (0, animations_1.transition)('* => *', [(0, animations_1.style)({ height: '0px' }), (0, animations_1.animate)(1234, (0, animations_1.style)({ height: '100px' }))]),
                ]));
                // we do this so that the next transition has a starting value that isn't null
                setProperty(element, engine, 'myTrigger', '123');
                engine.flush();
                let capture = null;
                listen(element, engine, 'myTrigger', 'start', (e) => (capture = e));
                listen(element, engine, 'myTrigger', 'done', (e) => (capture = e));
                setProperty(element, engine, 'myTrigger', '456');
                engine.flush();
                delete capture['_data'];
                expect(capture).toEqual({
                    element,
                    triggerName: 'myTrigger',
                    phaseName: 'start',
                    fromState: '123',
                    toState: '456',
                    totalTime: 1234,
                    disabled: false,
                });
                capture = null;
                const player = engine.players.pop();
                player.finish();
                delete capture['_data'];
                expect(capture).toEqual({
                    element,
                    triggerName: 'myTrigger',
                    phaseName: 'done',
                    fromState: '123',
                    toState: '456',
                    totalTime: 1234,
                    disabled: false,
                });
            });
        });
        describe('transition operations', () => {
            it('should persist the styles on the element as actual styles once the animation is complete', () => {
                const engine = makeEngine();
                const trig = (0, animations_1.trigger)('something', [
                    (0, animations_1.state)('on', (0, animations_1.style)({ height: '100px' })),
                    (0, animations_1.state)('off', (0, animations_1.style)({ height: '0px' })),
                    (0, animations_1.transition)('on => off', (0, animations_1.animate)(9876)),
                ]);
                registerTrigger(element, engine, trig);
                setProperty(element, engine, trig.name, 'on');
                setProperty(element, engine, trig.name, 'off');
                engine.flush();
                expect(element.style.height).not.toEqual('0px');
                engine.players[0].finish();
                expect(element.style.height).toEqual('0px');
            });
            it('should remove all existing state styling from an element when a follow-up transition occurs on the same trigger', () => {
                const engine = makeEngine();
                const trig = (0, animations_1.trigger)('something', [
                    (0, animations_1.state)('a', (0, animations_1.style)({ height: '100px' })),
                    (0, animations_1.state)('b', (0, animations_1.style)({ height: '500px' })),
                    (0, animations_1.state)('c', (0, animations_1.style)({ width: '200px' })),
                    (0, animations_1.transition)('* => *', (0, animations_1.animate)(9876)),
                ]);
                registerTrigger(element, engine, trig);
                setProperty(element, engine, trig.name, 'a');
                setProperty(element, engine, trig.name, 'b');
                engine.flush();
                const player1 = engine.players[0];
                player1.finish();
                expect(element.style.height).toEqual('500px');
                setProperty(element, engine, trig.name, 'c');
                engine.flush();
                const player2 = engine.players[0];
                expect(element.style.height).not.toEqual('500px');
                player2.finish();
                expect(element.style.width).toEqual('200px');
                expect(element.style.height).not.toEqual('500px');
            });
            it('should allow two animation transitions with different triggers to animate in parallel', () => {
                const engine = makeEngine();
                const trig1 = (0, animations_1.trigger)('something1', [
                    (0, animations_1.state)('a', (0, animations_1.style)({ width: '100px' })),
                    (0, animations_1.state)('b', (0, animations_1.style)({ width: '200px' })),
                    (0, animations_1.transition)('* => *', (0, animations_1.animate)(1000)),
                ]);
                const trig2 = (0, animations_1.trigger)('something2', [
                    (0, animations_1.state)('x', (0, animations_1.style)({ height: '500px' })),
                    (0, animations_1.state)('y', (0, animations_1.style)({ height: '1000px' })),
                    (0, animations_1.transition)('* => *', (0, animations_1.animate)(2000)),
                ]);
                registerTrigger(element, engine, trig1);
                registerTrigger(element, engine, trig2);
                let doneCount = 0;
                function doneCallback() {
                    doneCount++;
                }
                setProperty(element, engine, trig1.name, 'a');
                setProperty(element, engine, trig1.name, 'b');
                setProperty(element, engine, trig2.name, 'x');
                setProperty(element, engine, trig2.name, 'y');
                engine.flush();
                const player1 = engine.players[0];
                player1.onDone(doneCallback);
                expect(doneCount).toEqual(0);
                const player2 = engine.players[1];
                player2.onDone(doneCallback);
                expect(doneCount).toEqual(0);
                player1.finish();
                expect(doneCount).toEqual(1);
                player2.finish();
                expect(doneCount).toEqual(2);
                expect(element.style.width).toEqual('200px');
                expect(element.style.height).toEqual('1000px');
            });
            it('should cancel a previously running animation when a follow-up transition kicks off on the same trigger', () => {
                const engine = makeEngine();
                const trig = (0, animations_1.trigger)('something', [
                    (0, animations_1.state)('x', (0, animations_1.style)({ opacity: 0 })),
                    (0, animations_1.state)('y', (0, animations_1.style)({ opacity: 0.5 })),
                    (0, animations_1.state)('z', (0, animations_1.style)({ opacity: 1 })),
                    (0, animations_1.transition)('* => *', (0, animations_1.animate)(1000)),
                ]);
                registerTrigger(element, engine, trig);
                setProperty(element, engine, trig.name, 'x');
                setProperty(element, engine, trig.name, 'y');
                engine.flush();
                expect(parseFloat(element.style.opacity)).not.toEqual(0.5);
                const player1 = engine.players[0];
                setProperty(element, engine, trig.name, 'z');
                engine.flush();
                const player2 = engine.players[0];
                expect(parseFloat(element.style.opacity)).not.toEqual(0.5);
                player2.finish();
                expect(parseFloat(element.style.opacity)).toEqual(1);
                player1.finish();
                expect(parseFloat(element.style.opacity)).toEqual(1);
            });
            it('should pass in the previously running players into the follow-up transition player when cancelled', () => {
                const engine = makeEngine();
                const trig = (0, animations_1.trigger)('something', [
                    (0, animations_1.state)('x', (0, animations_1.style)({ opacity: 0 })),
                    (0, animations_1.state)('y', (0, animations_1.style)({ opacity: 0.5 })),
                    (0, animations_1.state)('z', (0, animations_1.style)({ opacity: 1 })),
                    (0, animations_1.transition)('* => *', (0, animations_1.animate)(1000)),
                ]);
                registerTrigger(element, engine, trig);
                setProperty(element, engine, trig.name, 'x');
                setProperty(element, engine, trig.name, 'y');
                engine.flush();
                const player1 = mock_animation_driver_1.MockAnimationDriver.log.pop();
                player1.setPosition(0.5);
                setProperty(element, engine, trig.name, 'z');
                engine.flush();
                const player2 = mock_animation_driver_1.MockAnimationDriver.log.pop();
                expect(player2.previousPlayers).toEqual([player1]);
                player2.finish();
                setProperty(element, engine, trig.name, 'x');
                engine.flush();
                const player3 = mock_animation_driver_1.MockAnimationDriver.log.pop();
                expect(player3.previousPlayers).toEqual([]);
            });
            it('should cancel all existing players if a removal animation is set to occur', () => {
                const engine = makeEngine();
                const trig = (0, animations_1.trigger)('something', [
                    (0, animations_1.state)('m', (0, animations_1.style)({ opacity: 0 })),
                    (0, animations_1.state)('n', (0, animations_1.style)({ opacity: 1 })),
                    (0, animations_1.transition)('* => *', (0, animations_1.animate)(1000)),
                ]);
                registerTrigger(element, engine, trig);
                setProperty(element, engine, trig.name, 'm');
                setProperty(element, engine, trig.name, 'n');
                engine.flush();
                let doneCount = 0;
                function doneCallback() {
                    doneCount++;
                }
                const player1 = engine.players[0];
                player1.onDone(doneCallback);
                expect(doneCount).toEqual(0);
                setProperty(element, engine, trig.name, 'void');
                engine.flush();
                expect(doneCount).toEqual(1);
            });
            it('should only persist styles that exist in the final state styles and not the last keyframe', () => {
                const engine = makeEngine();
                const trig = (0, animations_1.trigger)('something', [
                    (0, animations_1.state)('0', (0, animations_1.style)({ width: '0px' })),
                    (0, animations_1.state)('1', (0, animations_1.style)({ width: '100px' })),
                    (0, animations_1.transition)('* => *', [(0, animations_1.animate)(1000, (0, animations_1.style)({ height: '200px' }))]),
                ]);
                registerTrigger(element, engine, trig);
                setProperty(element, engine, trig.name, '0');
                setProperty(element, engine, trig.name, '1');
                engine.flush();
                const player = engine.players[0];
                expect(element.style.width).not.toEqual('100px');
                player.finish();
                expect(element.style.height).not.toEqual('200px');
                expect(element.style.width).toEqual('100px');
            });
            it('should default to using styling from the `*` state if a matching state is not found', () => {
                const engine = makeEngine();
                const trig = (0, animations_1.trigger)('something', [
                    (0, animations_1.state)('a', (0, animations_1.style)({ opacity: 0 })),
                    (0, animations_1.state)('*', (0, animations_1.style)({ opacity: 0.5 })),
                    (0, animations_1.transition)('* => *', (0, animations_1.animate)(1000)),
                ]);
                registerTrigger(element, engine, trig);
                setProperty(element, engine, trig.name, 'a');
                setProperty(element, engine, trig.name, 'z');
                engine.flush();
                engine.players[0].finish();
                expect(parseFloat(element.style.opacity)).toEqual(0.5);
            });
            it('should treat `void` as `void`', () => {
                const engine = makeEngine();
                const trig = (0, animations_1.trigger)('something', [
                    (0, animations_1.state)('a', (0, animations_1.style)({ opacity: 0 })),
                    (0, animations_1.state)('void', (0, animations_1.style)({ opacity: 0.8 })),
                    (0, animations_1.transition)('* => *', (0, animations_1.animate)(1000)),
                ]);
                registerTrigger(element, engine, trig);
                setProperty(element, engine, trig.name, 'a');
                setProperty(element, engine, trig.name, 'void');
                engine.flush();
                engine.players[0].finish();
                expect(parseFloat(element.style.opacity)).toEqual(0.8);
            });
        });
        describe('style normalizer', () => {
            it('should normalize the style values that are animateTransitioned within an a transition animation', () => {
                const engine = makeEngine(new SuffixNormalizer('-normalized'));
                const trig = (0, animations_1.trigger)('something', [
                    (0, animations_1.state)('on', (0, animations_1.style)({ height: 100 })),
                    (0, animations_1.state)('off', (0, animations_1.style)({ height: 0 })),
                    (0, animations_1.transition)('on => off', (0, animations_1.animate)(9876)),
                ]);
                registerTrigger(element, engine, trig);
                setProperty(element, engine, trig.name, 'on');
                setProperty(element, engine, trig.name, 'off');
                engine.flush();
                const player = mock_animation_driver_1.MockAnimationDriver.log.pop();
                expect(player.keyframes).toEqual([
                    new Map([
                        ['height-normalized', '100-normalized'],
                        ['offset', 0],
                    ]),
                    new Map([
                        ['height-normalized', '0-normalized'],
                        ['offset', 1],
                    ]),
                ]);
            });
            it('should throw an error when normalization fails within a transition animation', () => {
                const engine = makeEngine(new ExactCssValueNormalizer({ left: '100px' }));
                const trig = (0, animations_1.trigger)('something', [
                    (0, animations_1.state)('a', (0, animations_1.style)({ left: '0px', width: '200px' })),
                    (0, animations_1.state)('b', (0, animations_1.style)({ left: '100px', width: '100px' })),
                    (0, animations_1.transition)('a => b', (0, animations_1.animate)(9876)),
                ]);
                registerTrigger(element, engine, trig);
                setProperty(element, engine, trig.name, 'a');
                setProperty(element, engine, trig.name, 'b');
                let errorMessage = '';
                try {
                    engine.flush();
                }
                catch (e) {
                    errorMessage = e.toString();
                }
                expect(errorMessage).toMatch(/Unable to animate due to the following errors:/);
                expect(errorMessage).toMatch(/- The CSS property `left` is not allowed to be `0px`/);
                expect(errorMessage).toMatch(/- The CSS property `width` is not allowed/);
            });
        });
        describe('view operations', () => {
            it('should perform insert operations immediately ', () => {
                const engine = makeEngine();
                const child1 = document.createElement('div');
                const child2 = document.createElement('div');
                element.appendChild(child1);
                element.appendChild(child2);
                element.appendChild(child1);
                engine.insertNode(DEFAULT_NAMESPACE_ID, child1, element, true);
                element.appendChild(child2);
                engine.insertNode(DEFAULT_NAMESPACE_ID, child2, element, true);
                expect(element.contains(child1)).toBe(true);
                expect(element.contains(child2)).toBe(true);
            });
            it('should not throw an error if a missing namespace is used', () => {
                const engine = makeEngine();
                const ID = 'foo';
                const TRIGGER = 'fooTrigger';
                expect(() => {
                    engine.trigger(ID, element, TRIGGER, 'something');
                }).not.toThrow();
            });
            it('should still apply state-styling to an element even if it is not yet inserted into the DOM', () => {
                const engine = makeEngine();
                const orphanElement = document.createElement('div');
                orphanElement.classList.add('orphan');
                registerTrigger(orphanElement, engine, (0, animations_1.trigger)('trig', [
                    (0, animations_1.state)('go', (0, animations_1.style)({ opacity: 0.5 })),
                    (0, animations_1.transition)('* => go', (0, animations_1.animate)(1000)),
                ]));
                setProperty(orphanElement, engine, 'trig', 'go');
                engine.flush();
                expect(engine.players.length).toEqual(0);
                expect(orphanElement.style.opacity).toEqual('0.5');
            });
        });
    });
})();
class SuffixNormalizer extends animation_style_normalizer_1.AnimationStyleNormalizer {
    constructor(_suffix) {
        super();
        this._suffix = _suffix;
    }
    normalizePropertyName(propertyName, errors) {
        return propertyName + this._suffix;
    }
    normalizeStyleValue(userProvidedProperty, normalizedProperty, value, errors) {
        return value + this._suffix;
    }
}
class ExactCssValueNormalizer extends animation_style_normalizer_1.AnimationStyleNormalizer {
    constructor(_allowedValues) {
        super();
        this._allowedValues = _allowedValues;
    }
    normalizePropertyName(propertyName, errors) {
        if (!this._allowedValues[propertyName]) {
            errors.push(new Error(`The CSS property \`${propertyName}\` is not allowed`));
        }
        return propertyName;
    }
    normalizeStyleValue(userProvidedProperty, normalizedProperty, value, errors) {
        const expectedValue = this._allowedValues[userProvidedProperty];
        if (expectedValue != value) {
            errors.push(new Error(`The CSS property \`${userProvidedProperty}\` is not allowed to be \`${value}\``));
        }
        return expectedValue;
    }
}
function registerTrigger(element, engine, metadata, id = DEFAULT_NAMESPACE_ID) {
    const errors = [];
    const warnings = [];
    const driver = new mock_animation_driver_1.MockAnimationDriver();
    const name = metadata.name;
    const ast = (0, animation_ast_builder_1.buildAnimationAst)(driver, metadata, errors, warnings);
    if (errors.length) {
    }
    const trigger = (0, animation_trigger_1.buildTrigger)(name, ast, new animation_style_normalizer_1.NoopAnimationStyleNormalizer());
    engine.register(id, element);
    engine.registerTrigger(id, name, trigger);
}
function setProperty(element, engine, property, value, id = DEFAULT_NAMESPACE_ID) {
    engine.trigger(id, element, property, value);
}
function listen(element, engine, eventName, phaseName, callback, id = DEFAULT_NAMESPACE_ID) {
    return engine.listen(id, element, eventName, phaseName, callback);
}
