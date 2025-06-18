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
const core_1 = require("../../src/core");
const after_render_effect_1 = require("../../src/render3/reactivity/after_render_effect");
const testing_1 = require("../../testing");
describe('afterRenderEffect', () => {
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({ providers: [{ provide: core_1.PLATFORM_ID, useValue: 'browser' }] });
    });
    it('should support a single callback in the mixedReadWrite phase', () => {
        const log = [];
        const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
        (0, core_1.afterNextRender)(() => log.push('before'), { injector: appRef.injector });
        (0, after_render_effect_1.afterRenderEffect)(() => log.push('mixedReadWrite'), { injector: appRef.injector });
        (0, core_1.afterNextRender)(() => log.push('after'), { injector: appRef.injector });
        appRef.tick();
        expect(log).toEqual(['before', 'mixedReadWrite', 'after']);
    });
    it('should run once', () => {
        const log = [];
        const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
        (0, after_render_effect_1.afterRenderEffect)({
            earlyRead: () => log.push('earlyRead'),
            write: () => log.push('write'),
            mixedReadWrite: () => log.push('mixedReadWrite'),
            read: () => log.push('read'),
        }, { injector: appRef.injector });
        appRef.tick();
        expect(log).toEqual(['earlyRead', 'write', 'mixedReadWrite', 'read']);
    });
    it('should not run when not dirty', () => {
        const log = [];
        const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
        (0, after_render_effect_1.afterRenderEffect)({
            earlyRead: () => log.push('earlyRead'),
            write: () => log.push('write'),
            mixedReadWrite: () => log.push('mixedReadWrite'),
            read: () => log.push('read'),
        }, { injector: appRef.injector });
        // We expect an initial run, and clear the log.
        appRef.tick();
        log.length = 0;
        // The second tick() should not re-run the effects as they're not dirty.
        appRef.tick();
        expect(log.length).toBe(0);
    });
    it('should run when made dirty via signal', () => {
        const log = [];
        const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
        const counter = (0, core_1.signal)(0);
        (0, after_render_effect_1.afterRenderEffect)({
            // `earlyRead` depends on `counter`
            earlyRead: () => log.push(`earlyRead: ${counter()}`),
            // `write` does not
            write: () => log.push('write'),
        }, { injector: appRef.injector });
        appRef.tick();
        log.length = 0;
        counter.set(1);
        appRef.tick();
        expect(log).toEqual(['earlyRead: 1']);
    });
    it('should not run when not actually dirty from signals', () => {
        const log = [];
        const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
        const counter = (0, core_1.signal)(0);
        const isEven = (0, core_1.computed)(() => counter() % 2 === 0);
        (0, after_render_effect_1.afterRenderEffect)({
            earlyRead: () => log.push(`earlyRead: ${isEven()}`),
        }, { injector: appRef.injector });
        appRef.tick();
        log.length = 0;
        counter.set(2);
        appRef.tick();
        // Should not have run since `isEven()` didn't actually change despite becoming dirty.
        expect(log.length).toBe(0);
    });
    it('should pass data from one phase to the next via signal', () => {
        const log = [];
        const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
        const counter = (0, core_1.signal)(0);
        (0, after_render_effect_1.afterRenderEffect)({
            // `earlyRead` calculates `isEven`
            earlyRead: () => counter() % 2 === 0,
            write: (isEven) => log.push(`isEven: ${isEven()}`),
        }, { injector: appRef.injector });
        appRef.tick();
        log.length = 0;
        // isEven: false
        counter.set(1);
        appRef.tick();
        // isEven: true
        counter.set(2);
        appRef.tick();
        // No change (no log).
        counter.set(4);
        appRef.tick();
        expect(log).toEqual(['isEven: false', 'isEven: true']);
    });
    it('should run cleanup functions before re-running phase effects', () => {
        const log = [];
        const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
        const counter = (0, core_1.signal)(0);
        (0, after_render_effect_1.afterRenderEffect)({
            earlyRead: (onCleanup) => {
                onCleanup(() => log.push('cleanup earlyRead'));
                log.push(`earlyRead: ${counter()}`);
                // Calculate isEven:
                return counter() % 2 === 0;
            },
            write: (isEven, onCleanup) => {
                onCleanup(() => log.push('cleanup write'));
                log.push(`write: ${isEven()}`);
            },
        }, { injector: appRef.injector });
        // Initial run should run both effects with no cleanup
        appRef.tick();
        expect(log).toEqual(['earlyRead: 0', 'write: true']);
        log.length = 0;
        // A counter of 1 will clean up and rerun both effects.
        counter.set(1);
        appRef.tick();
        expect(log).toEqual(['cleanup earlyRead', 'earlyRead: 1', 'cleanup write', 'write: false']);
        log.length = 0;
        // A counter of 3 will clean up and rerun the earlyRead phase only.
        counter.set(3);
        appRef.tick();
        expect(log).toEqual(['cleanup earlyRead', 'earlyRead: 3']);
        log.length = 0;
        // A counter of 4 will then clean up and rerun both effects.
        counter.set(4);
        appRef.tick();
        expect(log).toEqual(['cleanup earlyRead', 'earlyRead: 4', 'cleanup write', 'write: true']);
    });
    it('should run cleanup functions when destroyed', () => {
        const log = [];
        const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
        const ref = (0, after_render_effect_1.afterRenderEffect)({
            earlyRead: (onCleanup) => {
                onCleanup(() => log.push('cleanup earlyRead'));
            },
            write: (_, onCleanup) => {
                onCleanup(() => log.push('cleanup write'));
            },
            mixedReadWrite: (_, onCleanup) => {
                onCleanup(() => log.push('cleanup mixedReadWrite'));
            },
            read: (_, onCleanup) => {
                onCleanup(() => log.push('cleanup read'));
            },
        }, { injector: appRef.injector });
        appRef.tick();
        expect(log.length).toBe(0);
        ref.destroy();
        expect(log).toEqual([
            'cleanup earlyRead',
            'cleanup write',
            'cleanup mixedReadWrite',
            'cleanup read',
        ]);
    });
    it('should schedule CD when dirty', () => __awaiter(void 0, void 0, void 0, function* () {
        testing_1.TestBed.configureTestingModule({
            providers: [(0, core_1.provideZonelessChangeDetection)(), { provide: core_1.PLATFORM_ID, useValue: 'browser' }],
        });
        const log = [];
        const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
        const counter = (0, core_1.signal)(0);
        (0, after_render_effect_1.afterRenderEffect)({ earlyRead: () => log.push(`earlyRead: ${counter()}`) }, { injector: appRef.injector });
        yield appRef.whenStable();
        expect(log).toEqual(['earlyRead: 0']);
        counter.set(1);
        yield appRef.whenStable();
        expect(log).toEqual(['earlyRead: 0', 'earlyRead: 1']);
    }));
    it('should cause a re-run for hooks that re-dirty themselves', () => {
        const log = [];
        const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
        const counter = (0, core_1.signal)(0);
        (0, after_render_effect_1.afterRenderEffect)({
            earlyRead: () => {
                log.push(`counter: ${counter()}`);
                // Cause a re-execution when counter is 1.
                if (counter() === 1) {
                    counter.set(0);
                }
            },
        }, { injector: appRef.injector });
        appRef.tick();
        log.length = 0;
        counter.set(1);
        appRef.tick();
        expect(log).toEqual(['counter: 1', 'counter: 0']);
    });
    it('should cause a re-run for hooks that re-dirty earlier hooks', () => {
        const log = [];
        const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
        const counter = (0, core_1.signal)(0);
        (0, after_render_effect_1.afterRenderEffect)({
            earlyRead: () => {
                log.push(`earlyRead: ${counter()}`);
                return counter();
            },
            write: (value) => {
                log.push(`write: ${value()}`);
                // Cause a re-execution when value from earlyRead is 1.
                if (value() === 1) {
                    counter.set(0);
                }
            },
        }, { injector: appRef.injector });
        appRef.tick();
        log.length = 0;
        counter.set(1);
        appRef.tick();
        expect(log).toEqual(['earlyRead: 1', 'write: 1', 'earlyRead: 0', 'write: 0']);
    });
    it('should not run later hooks when an earlier hook is re-dirtied', () => {
        const log = [];
        const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
        const counter = (0, core_1.signal)(0);
        (0, after_render_effect_1.afterRenderEffect)({
            earlyRead: () => {
                const value = counter();
                log.push(`earlyRead: ${value}`);
                if (value === 1) {
                    counter.set(0);
                }
                return value;
            },
            write: (value) => log.push(`write: ${value()}`),
        }, { injector: appRef.injector });
        appRef.tick();
        log.length = 0;
        counter.set(1);
        appRef.tick();
        expect(log).toEqual(['earlyRead: 1', 'earlyRead: 0', 'write: 0']);
    });
});
