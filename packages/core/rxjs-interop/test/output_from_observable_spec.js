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
describe('outputFromObservable()', () => {
    // Safety clean-up as we are patching `onUnhandledError` in this test.
    afterEach(() => (rxjs_1.config.onUnhandledError = null));
    it('should support emitting values via BehaviorSubject', () => {
        const subject = new rxjs_1.BehaviorSubject(0);
        const output = testing_1.TestBed.runInInjectionContext(() => (0, src_1.outputFromObservable)(subject));
        const values = [];
        output.subscribe((v) => values.push(v));
        expect(values).toEqual([0]);
        subject.next(1);
        subject.next(2);
        expect(values).toEqual([0, 1, 2]);
    });
    it('should support emitting values via ReplaySubject', () => {
        const subject = new rxjs_1.ReplaySubject(1);
        const output = testing_1.TestBed.runInInjectionContext(() => (0, src_1.outputFromObservable)(subject));
        // Emit before any subscribers!
        subject.next(1);
        const values = [];
        output.subscribe((v) => values.push(v));
        expect(values).toEqual([1]);
        subject.next(2);
        subject.next(3);
        expect(values).toEqual([1, 2, 3]);
    });
    it('should support emitting values via Subject', () => {
        const subject = new rxjs_1.Subject();
        const output = testing_1.TestBed.runInInjectionContext(() => (0, src_1.outputFromObservable)(subject));
        // Emit before any subscribers! Ignored!
        subject.next(1);
        const values = [];
        output.subscribe((v) => values.push(v));
        expect(values).toEqual([]);
        subject.next(2);
        subject.next(3);
        expect(values).toEqual([2, 3]);
    });
    it('should support emitting values via EventEmitter', () => {
        const emitter = new core_1.EventEmitter();
        const output = testing_1.TestBed.runInInjectionContext(() => (0, src_1.outputFromObservable)(emitter));
        // Emit before any subscribers! Ignored!
        emitter.next(1);
        const values = [];
        output.subscribe((v) => values.push(v));
        expect(values).toEqual([]);
        emitter.next(2);
        emitter.next(3);
        expect(values).toEqual([2, 3]);
    });
    it('should support explicit unsubscribing', () => {
        const subject = new rxjs_1.Subject();
        const output = testing_1.TestBed.runInInjectionContext(() => (0, src_1.outputFromObservable)(subject));
        const values = [];
        expect(subject.observed).toBe(false);
        const subscription = output.subscribe((v) => values.push(v));
        expect(subject.observed).toBe(true);
        expect(values).toEqual([]);
        subject.next(2);
        subject.next(3);
        expect(values).toEqual([2, 3]);
        subscription.unsubscribe();
        expect(subject.observed).toBe(false);
    });
    it('should not yield more source values if directive is destroyed', () => {
        const subject = new rxjs_1.Subject();
        const output = testing_1.TestBed.runInInjectionContext(() => (0, src_1.outputFromObservable)(subject));
        const values = [];
        expect(subject.observed).toBe(false);
        output.subscribe((v) => values.push(v));
        expect(subject.observed).toBe(true);
        expect(values).toEqual([]);
        // initiate destroy.
        testing_1.TestBed.resetTestingModule();
        expect(subject.observed).toBe(false);
        subject.next(2);
        subject.next(3);
        expect(values).toEqual([]);
    });
    it('should throw if subscriptions are added after directive destroy', () => {
        const subject = new rxjs_1.Subject();
        const output = testing_1.TestBed.runInInjectionContext(() => (0, src_1.outputFromObservable)(subject));
        // initiate destroy.
        testing_1.TestBed.resetTestingModule();
        expect(() => output.subscribe(() => { })).toThrowError(/Unexpected subscription to destroyed `OutputRef`/);
    });
    it('should be a noop when the source observable completes', () => {
        const subject = new rxjs_1.Subject();
        const outputRef = testing_1.TestBed.runInInjectionContext(() => (0, src_1.outputFromObservable)(subject));
        const values = [];
        outputRef.subscribe((v) => values.push(v));
        subject.next(1);
        subject.next(2);
        expect(values).toEqual([1, 2]);
        subject.complete();
        subject.next(3);
        expect(values).toEqual([1, 2]);
    });
    it('should not handle errors from the source observable', (done) => {
        const subject = new rxjs_1.Subject();
        const outputRef = testing_1.TestBed.runInInjectionContext(() => (0, src_1.outputFromObservable)(subject));
        const values = [];
        outputRef.subscribe((v) => values.push(v));
        subject.next(1);
        subject.next(2);
        expect(values).toEqual([1, 2]);
        rxjs_1.config.onUnhandledError = (err) => {
            rxjs_1.config.onUnhandledError = null;
            expect(err.message).toEqual('test error message');
            expect(values).toEqual([1, 2]);
            done();
        };
        subject.error(new Error('test error message'));
    });
});
