"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("../testing");
const operators_1 = require("rxjs/operators");
const event_emitter_1 = require("../src/event_emitter");
const public_api_1 = require("../public_api");
describe('EventEmitter', () => {
    let emitter;
    beforeEach(() => {
        emitter = new event_emitter_1.EventEmitter();
    });
    it('should call the next callback', (done) => {
        emitter.subscribe((value) => {
            expect(value).toEqual(99);
            done();
        });
        emitter.emit(99);
    });
    it('should call the throw callback', (done) => {
        emitter.subscribe({
            next: () => { },
            error: (error) => {
                expect(error).toEqual('Boom');
                done();
            },
        });
        emitter.error('Boom');
    });
    it('should work when no throw callback is provided', (done) => {
        emitter.subscribe({
            next: () => { },
            error: () => {
                done();
            },
        });
        emitter.error('Boom');
    });
    it('should call the return callback', (done) => {
        emitter.subscribe({
            next: () => { },
            error: () => { },
            complete: () => {
                done();
            },
        });
        emitter.complete();
    });
    it('should subscribe to the wrapper synchronously', () => {
        let called = false;
        emitter.subscribe({
            next: () => {
                called = true;
            },
        });
        emitter.emit(99);
        expect(called).toBe(true);
    });
    it('delivers next and error events synchronously', (done) => {
        const log = [];
        emitter.subscribe((x) => {
            log.push(x);
            expect(log).toEqual([1, 2]);
        }, (err) => {
            log.push(err);
            expect(log).toEqual([1, 2, 3, 4]);
            done();
        });
        log.push(1);
        emitter.emit(2);
        log.push(3);
        emitter.error(4);
        log.push(5);
    });
    it('delivers next and complete events synchronously', () => {
        const log = [];
        emitter.subscribe({
            next: (x) => {
                log.push(x);
                expect(log).toEqual([1, 2]);
            },
            error: undefined,
            complete: () => {
                log.push(4);
                expect(log).toEqual([1, 2, 3, 4]);
            },
        });
        log.push(1);
        emitter.emit(2);
        log.push(3);
        emitter.complete();
        log.push(5);
        expect(log).toEqual([1, 2, 3, 4, 5]);
    });
    it('delivers events asynchronously when forced to async mode', (done) => {
        const e = new event_emitter_1.EventEmitter(true);
        const log = [];
        e.subscribe((x) => {
            log.push(x);
            expect(log).toEqual([1, 3, 2]);
            done();
        });
        log.push(1);
        e.emit(2);
        log.push(3);
    });
    it('reports whether it has subscribers', () => {
        const e = new event_emitter_1.EventEmitter(false);
        expect(e.observers.length > 0).toBe(false);
        e.subscribe({ next: () => { } });
        expect(e.observers.length > 0).toBe(true);
    });
    it('remove a subscriber subscribed directly to EventEmitter', () => {
        const sub = emitter.subscribe();
        expect(emitter.observers.length).toBe(1);
        sub.unsubscribe();
        expect(emitter.observers.length).toBe(0);
    });
    it('remove a subscriber subscribed after applying operators with pipe()', () => {
        const sub = emitter.pipe((0, operators_1.filter)(() => true)).subscribe();
        expect(emitter.observers.length).toBe(1);
        sub.unsubscribe();
        expect(emitter.observers.length).toBe(0);
    });
    it('unsubscribing a subscriber invokes the dispose method', (done) => {
        const sub = emitter.subscribe();
        sub.add(() => done());
        sub.unsubscribe();
    });
    it('unsubscribing a subscriber after applying operators with pipe() invokes the dispose method', (done) => {
        const sub = emitter.pipe((0, operators_1.filter)(() => true)).subscribe();
        sub.add(() => done());
        sub.unsubscribe();
    });
    it('error thrown inside an Rx chain propagates to the error handler and disposes the chain', () => {
        let errorPropagated = false;
        emitter
            .pipe((0, operators_1.filter)(() => {
            throw new Error();
        }))
            .subscribe(() => { }, (err) => (errorPropagated = true));
        emitter.next(1);
        expect(errorPropagated).toBe(true);
        expect(emitter.observers.length).toBe(0);
    });
    it('error sent by EventEmitter should dispose the Rx chain and remove subscribers', () => {
        let errorPropagated = false;
        emitter.pipe((0, operators_1.filter)(() => true)).subscribe(() => { }, () => (errorPropagated = true));
        emitter.error(1);
        expect(errorPropagated).toBe(true);
        expect(emitter.observers.length).toBe(0);
    });
    it('contributes to app stability', () => __awaiter(void 0, void 0, void 0, function* () {
        const emitter = testing_1.TestBed.runInInjectionContext(() => new event_emitter_1.EventEmitter(true));
        let emitValue;
        emitter.subscribe({
            next: (v) => {
                emitValue = v;
            },
        });
        emitter.emit(1);
        yield testing_1.TestBed.inject(public_api_1.ApplicationRef).whenStable();
        expect(emitValue).toBeDefined();
        expect(emitValue).toEqual(1);
    }));
    it('should not prevent app from becoming stable if subscriber throws an error', () => __awaiter(void 0, void 0, void 0, function* () {
        const logs = [];
        const ngZone = testing_1.TestBed.inject(public_api_1.NgZone);
        const appRef = testing_1.TestBed.inject(public_api_1.ApplicationRef);
        appRef.isStable.subscribe((isStable) => logs.push(`isStable=${isStable}`));
        const emitter = testing_1.TestBed.runInInjectionContext(() => new event_emitter_1.EventEmitter(true));
        emitter.subscribe(() => {
            throw new Error('Given this is some TypeError...');
        });
        // Emit inside the Angular zone so that the error is not captured by Jasmine in `afterAll`.
        ngZone.run(() => emitter.emit(1));
        yield appRef.whenStable();
        expect(logs).toEqual(['isStable=true', 'isStable=false', 'isStable=true']);
    }));
    // TODO: vsavkin: add tests cases
    // should call dispose on the subscription if generator returns {done:true}
    // should call dispose on the subscription on throw
    // should call dispose on the subscription on return
});
