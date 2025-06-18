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
const animations_1 = require("../src/animations");
const animation_group_player_1 = require("../src/players/animation_group_player");
describe('AnimationGroupPlayer', () => {
    it('should getPosition of an empty group', (0, testing_1.fakeAsync)(() => {
        const players = [];
        const groupPlayer = new animation_group_player_1.AnimationGroupPlayer(players);
        expect(groupPlayer.getPosition()).toBe(0);
    }));
    it('should getPosition of a single player in a group', (0, testing_1.fakeAsync)(() => {
        const player = new animations_1.NoopAnimationPlayer(5, 5);
        player.setPosition(0.2);
        const players = [player];
        const groupPlayer = new animation_group_player_1.AnimationGroupPlayer(players);
        expect(groupPlayer.getPosition()).toBe(0.2);
    }));
    it('should getPosition based on the longest player in the group', (0, testing_1.fakeAsync)(() => {
        const longestPlayer = new animations_1.NoopAnimationPlayer(5, 5);
        longestPlayer.setPosition(0.2);
        const players = [
            new animations_1.NoopAnimationPlayer(1, 4),
            new animations_1.NoopAnimationPlayer(4, 1),
            new animations_1.NoopAnimationPlayer(7, 0),
            longestPlayer,
            new animations_1.NoopAnimationPlayer(1, 1),
        ];
        const groupPlayer = new animation_group_player_1.AnimationGroupPlayer(players);
        expect(groupPlayer.getPosition()).toBe(0.2);
    }));
});
