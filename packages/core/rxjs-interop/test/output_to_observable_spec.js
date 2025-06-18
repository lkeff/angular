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
const testing_1 = require("../../testing");
const rxjs_1 = require("rxjs");
const src_1 = require("../src");
describe('outputToObservable()', () => {
    it('should work with basic `output()`', () => {
        const outputRef = testing_1.TestBed.runInInjectionContext(() => (0, core_1.output)());
        const observable = (0, src_1.outputToObservable)(outputRef);
        const values = [];
        observable.subscribe({ next: (v) => values.push(v) });
        expect(values).toEqual([]);
        outputRef.emit(1);
        outputRef.emit(2);
        expect(values).toEqual([1, 2]);
    });
    it('should complete observable upon directive destroy', () => {
        const outputRef = testing_1.TestBed.runInInjectionContext(() => (0, core_1.output)());
        const observable = (0, src_1.outputToObservable)(outputRef);
        let completed = false;
        const subscription = observable.subscribe({
            complete: () => (completed = true),
        });
        outputRef.emit(1);
        outputRef.emit(2);
        expect(completed).toBe(false);
        expect(subscription.closed).toBe(false);
        // destroy `EnvironmentInjector`.
        testing_1.TestBed.resetTestingModule();
        expect(completed).toBe(true);
        expect(subscription.closed).toBe(true);
    });
    it('should complete EventEmitter upon directive destroy', () => {
        const eventEmitter = testing_1.TestBed.runInInjectionContext(() => new core_1.EventEmitter());
        const observable = (0, src_1.outputToObservable)(eventEmitter);
        let completed = false;
        const subscription = observable.subscribe({
            complete: () => (completed = true),
        });
        eventEmitter.next(1);
        eventEmitter.next(2);
        expect(completed).toBe(false);
        expect(subscription.closed).toBe(false);
        expect(eventEmitter.observed).toBe(true);
        // destroy `EnvironmentInjector`.
        testing_1.TestBed.resetTestingModule();
        expect(completed).toBe(true);
        expect(subscription.closed).toBe(true);
        expect(eventEmitter.observed).toBe(false);
    });
    describe('with `outputFromObservable()` as source', () => {
        it('should allow subscription', () => {
            const subject = new rxjs_1.Subject();
            const outputRef = testing_1.TestBed.runInInjectionContext(() => (0, src_1.outputFromObservable)(subject));
            const observable = (0, src_1.outputToObservable)(outputRef);
            const values = [];
            observable.subscribe({ next: (v) => values.push(v) });
            expect(values).toEqual([]);
            subject.next(1);
            subject.next(2);
            expect(values).toEqual([1, 2]);
        });
        it('should complete observable upon directive destroy', () => {
            const subject = new rxjs_1.Subject();
            const outputRef = testing_1.TestBed.runInInjectionContext(() => (0, src_1.outputFromObservable)(subject));
            const observable = (0, src_1.outputToObservable)(outputRef);
            let completed = false;
            const subscription = observable.subscribe({
                complete: () => (completed = true),
            });
            subject.next(1);
            subject.next(2);
            expect(completed).toBe(false);
            expect(subscription.closed).toBe(false);
            expect(subject.observed).toBe(true);
            // destroy `EnvironmentInjector`.
            testing_1.TestBed.resetTestingModule();
            expect(completed).toBe(true);
            expect(subscription.closed).toBe(true);
            expect(subject.observed).toBe(false);
        });
        it('may not complete the observable with an improperly ' +
            'configured `OutputRef` without a destroy ref as source', () => {
            const outputRef = new core_1.EventEmitter();
            const observable = (0, src_1.outputToObservable)(outputRef);
            let completed = false;
            const subscription = observable.subscribe({
                complete: () => (completed = true),
            });
            outputRef.next(1);
            outputRef.next(2);
            expect(completed).toBe(false);
            expect(subscription.closed).toBe(false);
            expect(outputRef.observed).toBe(true);
            // destroy `EnvironmentInjector`.
            testing_1.TestBed.resetTestingModule();
            expect(completed)
                .withContext('Should not be completed as there is no known time when to destroy')
                .toBe(false);
            expect(subscription.closed).toBe(false);
            expect(outputRef.observed).toBe(true);
        });
    });
});
