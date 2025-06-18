"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const testing_1 = require("@angular/core/testing");
const fake_async_1 = require("../../core/testing/src/fake_async");
const animation_player_1 = require("../src/players/animation_player");
describe('NoopAnimationPlayer', () => {
    it('should finish after the next microtask once started', (0, testing_1.fakeAsync)(() => {
        const log = [];
        const player = new animation_player_1.NoopAnimationPlayer();
        player.onStart(() => log.push('started'));
        player.onDone(() => log.push('done'));
        (0, fake_async_1.flushMicrotasks)();
        expect(log).toEqual([]);
        player.play();
        expect(log).toEqual(['started']);
        (0, fake_async_1.flushMicrotasks)();
        expect(log).toEqual(['started', 'done']);
    }));
    it('should fire all callbacks when destroyed', () => {
        const log = [];
        const player = new animation_player_1.NoopAnimationPlayer();
        player.onStart(() => log.push('started'));
        player.onDone(() => log.push('done'));
        player.onDestroy(() => log.push('destroy'));
        expect(log).toEqual([]);
        player.destroy();
        expect(log).toEqual(['started', 'done', 'destroy']);
    });
    it('should fire start/done callbacks manually when called directly', (0, testing_1.fakeAsync)(() => {
        const log = [];
        const player = new animation_player_1.NoopAnimationPlayer();
        player.onStart(() => log.push('started'));
        player.onDone(() => log.push('done'));
        (0, fake_async_1.flushMicrotasks)();
        player.triggerCallback('start');
        expect(log).toEqual(['started']);
        player.play();
        expect(log).toEqual(['started']);
        player.triggerCallback('done');
        expect(log).toEqual(['started', 'done']);
        player.finish();
        expect(log).toEqual(['started', 'done']);
        (0, fake_async_1.flushMicrotasks)();
        expect(log).toEqual(['started', 'done']);
    }));
    it('should fire off start callbacks before triggering the finish callback', (0, testing_1.fakeAsync)(() => {
        const log = [];
        const player = new animation_player_1.NoopAnimationPlayer();
        player.onStart(() => {
            queueMicrotask(() => log.push('started'));
        });
        player.onDone(() => log.push('done'));
        expect(log).toEqual([]);
        player.play();
        expect(log).toEqual([]);
        (0, fake_async_1.flushMicrotasks)();
        expect(log).toEqual(['started', 'done']);
    }));
});
