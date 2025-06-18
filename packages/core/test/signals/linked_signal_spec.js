"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../../src/core");
const signals_1 = require("../../primitives/signals");
const effect_util_1 = require("./effect_util");
describe('linkedSignal', () => {
    it('should conform to the writable signals contract', () => {
        const firstLetter = (0, core_1.linkedSignal)({ source: (0, core_1.signal)('foo'), computation: (str) => str[0] });
        expect((0, core_1.isSignal)(firstLetter)).toBeTrue();
        firstLetter.set('a');
        expect(firstLetter()).toBe('a');
        firstLetter.update((_) => 'b');
        expect(firstLetter()).toBe('b');
        const firstLetterReadonly = firstLetter.asReadonly();
        expect(firstLetterReadonly()).toBe('b');
        firstLetter.set('c');
        expect(firstLetterReadonly()).toBe('c');
        expect(firstLetter.toString()).toBe('[LinkedSignal: c]');
    });
    it('should conform to the writable signals contract - shorthand', () => {
        const str = (0, core_1.signal)('foo');
        const firstLetter = (0, core_1.linkedSignal)(() => str()[0]);
        expect((0, core_1.isSignal)(firstLetter)).toBeTrue();
        firstLetter.set('a');
        expect(firstLetter()).toBe('a');
        firstLetter.update((_) => 'b');
        expect(firstLetter()).toBe('b');
        const firstLetterReadonly = firstLetter.asReadonly();
        expect(firstLetterReadonly()).toBe('b');
        firstLetter.set('c');
        expect(firstLetterReadonly()).toBe('c');
    });
    it('should update when the source changes', () => {
        const options = (0, core_1.signal)(['apple', 'banana', 'fig']);
        const choice = (0, core_1.linkedSignal)({
            source: options,
            computation: (options) => options[0],
        });
        expect(choice()).toBe('apple');
        choice.set('fig');
        expect(choice()).toBe('fig');
        options.set(['orange', 'apple', 'pomegranate']);
        expect(choice()).toBe('orange');
    });
    it('should expose previous source in the computation function', () => {
        const options = (0, core_1.signal)(['apple', 'banana', 'fig']);
        const choice = (0, core_1.linkedSignal)({
            source: options,
            computation: (options, previous) => {
                if (previous !== undefined && options.includes(previous.value)) {
                    return previous.value;
                }
                else {
                    return options[0];
                }
            },
        });
        expect(choice()).toBe('apple');
        options.set(['orange', 'apple', 'pomegranate']);
        expect(choice()).toBe('apple');
    });
    it('should expose previous value in the computation function', () => {
        const options = (0, core_1.signal)(['apple', 'banana', 'fig']);
        const choice = (0, core_1.linkedSignal)({
            source: options,
            computation: (options, previous) => {
                if (previous !== undefined) {
                    const prevChoice = previous.source[previous.value];
                    const newIdx = options.indexOf(prevChoice);
                    return newIdx === -1 ? 0 : newIdx;
                }
                else {
                    return 0;
                }
            },
        });
        expect(choice()).toBe(0);
        choice.set(2); // choosing a fig
        options.set(['banana', 'fig', 'apple']); // a fig moves to a new place in the updated resource
        expect(choice()).toBe(1);
    });
    it('should expose previous value in the computation function in larger reactive graph', () => {
        const options = (0, core_1.signal)(['apple', 'banana', 'fig']);
        const choice = (0, core_1.linkedSignal)({
            source: options,
            computation: (options, previous) => {
                if (previous !== undefined) {
                    const prevChoice = previous.source[previous.value];
                    const newIdx = options.indexOf(prevChoice);
                    return newIdx === -1 ? 0 : newIdx;
                }
                else {
                    return 0;
                }
            },
        });
        const doubleChoice = (0, core_1.computed)(() => choice() * 2);
        expect(doubleChoice()).toBe(0);
        choice.set(2); // choosing a fig
        options.set(['banana', 'fig', 'apple']); // a fig moves to a new place in the updated resource
        expect(doubleChoice()).toBe(2);
        expect(choice()).toBe(1);
    });
    it('should not update the value if the new choice is considered equal to the previous one', () => {
        const counter = (0, core_1.signal)(0);
        const choice = (0, core_1.linkedSignal)({
            source: counter,
            computation: (c) => c,
            equal: (a, b) => true,
        });
        expect(choice()).toBe(0);
        // updates from the "commanding signal" should follow equality rules
        counter.update((c) => c + 1);
        expect(choice()).toBe(0);
        // the same equality rules should apply to the state signal
        choice.set(10);
        expect(choice()).toBe(0);
    });
    it('should not recompute downstream dependencies when computed value is equal to the currently set value', () => {
        const source = (0, core_1.signal)(0);
        const isEven = (0, core_1.linkedSignal)(() => source() % 2 === 0);
        let updateCounter = 0;
        const updateTracker = (0, core_1.computed)(() => {
            isEven();
            return updateCounter++;
        });
        updateTracker();
        expect(updateCounter).toEqual(1);
        expect(isEven()).toBeTrue();
        isEven.set(false);
        updateTracker();
        expect(updateCounter).toEqual(2);
        // Setting the source signal such that the linked value is the same
        source.set(1);
        updateTracker();
        // downstream dependency should _not_ be recomputed
        expect(updateCounter).toEqual(2);
        source.set(4);
        updateTracker();
        expect(updateCounter).toEqual(3);
    });
    it('should support shorthand version', () => {
        const options = (0, core_1.signal)(['apple', 'banana', 'fig']);
        const choice = (0, core_1.linkedSignal)(() => options()[0]);
        expect(choice()).toBe('apple');
        choice.set('orange');
        expect(options()).toEqual(['apple', 'banana', 'fig']);
        expect(choice()).toBe('orange');
        options.set(['banana', 'fig']);
        expect(choice()).toBe('banana');
    });
    it('should have explicitly set value', () => {
        const counter = (0, core_1.signal)(0);
        const options = (0, core_1.signal)(['apple', 'banana', 'fig']);
        const choice = (0, core_1.linkedSignal)(() => options()[0]);
        expect(choice()).toBe('apple');
        // state signal is updated while the "commanding" state has pending changes - we assume that the explicit state set is "more important" here
        options.set(['orange', 'apple', 'pomegranate']);
        choice.set('watermelon');
        // unrelated state changes should not effect the test results
        counter.update((c) => c + 1);
        expect(choice()).toBe('watermelon');
        // state signal is updated just before changes to the "commanding" state - here we default to the usual situation of the linked state triggering computation
        choice.set('persimmon');
        options.set(['apple', 'banana', 'fig']);
        expect(choice()).toBe('apple');
        // another change using the "update" code-path
        options.set(['orange', 'apple', 'pomegranate']);
        choice.update((f) => f.toUpperCase());
        expect(choice()).toBe('ORANGE');
    });
    it('should have explicitly set value - live consumer', () => {
        const options = (0, core_1.signal)(['apple', 'banana', 'fig']);
        const choice = (0, core_1.linkedSignal)(() => options()[0]);
        expect(choice()).toBe('apple');
        // create an effect to mark the linkedSignal as live consumer
        const watchDestroy = (0, effect_util_1.testingEffect)(() => choice());
        try {
            // state signal is updated while the "commanding" state has pending changes - we assume that the explicit state set is "more important" here
            const counter = (0, core_1.signal)(0);
            options.set(['orange', 'apple', 'pomegranate']);
            choice.set('watermelon');
            // unrelated state changes should not effect the test results
            counter.update((c) => c + 1);
            expect(choice()).toBe('watermelon');
            // state signal is updated just before changes to the "commanding" state - here we default to the usual situation of the linked state triggering computation
            choice.set('persimmon');
            options.set(['apple', 'banana', 'fig']);
            expect(choice()).toBe('apple');
            // another change using the "update" code-path
            options.set(['orange', 'apple', 'pomegranate']);
            choice.update((f) => f.toUpperCase());
            expect(choice()).toBe('ORANGE');
        }
        finally {
            watchDestroy();
        }
    });
    it('should capture linked signal dependencies even if the value is set before the initial read', () => {
        const options = (0, core_1.signal)(['apple', 'banana', 'fig']);
        const choice = (0, core_1.linkedSignal)(() => options()[0]);
        choice.set('watermelon');
        expect(choice()).toBe('watermelon');
        options.set(['orange', 'apple', 'pomegranate']);
        expect(choice()).toBe('orange');
    });
    it('should pull latest dependency values before state update', () => {
        const options = (0, core_1.signal)(['apple', 'banana', 'fig']);
        const choice = (0, core_1.linkedSignal)(() => options()[0]);
        choice.update((fruit) => fruit.toUpperCase());
        expect(choice()).toBe('APPLE');
    });
    it('should reset error state after manual state update', () => {
        const choice = (0, core_1.linkedSignal)(() => {
            throw new Error("Can't compute");
        });
        expect(() => {
            choice();
        }).toThrowError("Can't compute");
        choice.set('explicit');
        expect(choice()).toBe('explicit');
    });
    it('should call the post-producer-created fn when signal is called', () => {
        let producers = 0;
        const prev = (0, signals_1.setPostProducerCreatedFn)(() => producers++);
        const options = (0, core_1.signal)(['apple', 'banana', 'fig']);
        (0, core_1.linkedSignal)(() => options()[0]);
        expect(producers).toBe(2);
        (0, signals_1.setPostProducerCreatedFn)(prev);
    });
});
