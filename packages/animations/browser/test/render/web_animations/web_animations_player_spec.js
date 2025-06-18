"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const web_animations_player_1 = require("../../../src/render/web_animations/web_animations_player");
describe('WebAnimationsPlayer tests', () => {
    let element;
    let innerPlayer = null;
    beforeEach(() => {
        element = {};
        element['animate'] = () => {
            return (innerPlayer = new MockDomAnimation());
        };
    });
    it('should automatically pause the player when created and initialized', () => {
        const keyframes = [
            new Map([
                ['opacity', 0],
                ['offset', 0],
            ]),
            new Map([
                ['opacity', 1],
                ['offset', 1],
            ]),
        ];
        const player = new web_animations_player_1.WebAnimationsPlayer(element, keyframes, { duration: 1000 });
        player.init();
        const p = innerPlayer;
        expect(p.log).toEqual(['pause']);
        player.play();
        expect(p.log).toEqual(['pause', 'play']);
    });
    it('should not pause the player if created and started before initialized', () => {
        const keyframes = [
            new Map([
                ['opacity', 0],
                ['offset', 0],
            ]),
            new Map([
                ['opacity', 1],
                ['offset', 1],
            ]),
        ];
        const player = new web_animations_player_1.WebAnimationsPlayer(element, keyframes, { duration: 1000 });
        player.play();
        const p = innerPlayer;
        expect(p.log).toEqual(['play']);
    });
    it('should fire start/done callbacks manually when called directly', () => {
        const log = [];
        const player = new web_animations_player_1.WebAnimationsPlayer(element, [], { duration: 1000 });
        player.onStart(() => log.push('started'));
        player.onDone(() => log.push('done'));
        player.triggerCallback('start');
        expect(log).toEqual(['started']);
        player.play();
        expect(log).toEqual(['started']);
        player.triggerCallback('done');
        expect(log).toEqual(['started', 'done']);
        player.finish();
        expect(log).toEqual(['started', 'done']);
    });
    it('should allow setting position before animation is started', () => {
        const player = new web_animations_player_1.WebAnimationsPlayer(element, [], { duration: 1000 });
        player.setPosition(0.5);
        const p = innerPlayer;
        expect(p.log).toEqual(['pause']);
        expect(p.currentTime).toEqual(500);
    });
    it('should continue playing animations from setPosition', () => {
        const player = new web_animations_player_1.WebAnimationsPlayer(element, [], { duration: 1000 });
        player.play();
        const p = innerPlayer;
        expect(p.log).toEqual(['play']);
        player.setPosition(0.5);
        expect(p.currentTime).toEqual(500);
        expect(p.log).toEqual(['play']);
    });
});
class MockDomAnimation {
    constructor() {
        this.log = [];
        this.currentTime = 0;
        // Other properties to ensure conformance to interface
        this.effect = null;
        this.finished = Promise.resolve({});
        this.id = '';
        this.oncancel = null;
        this.onfinish = null;
        this.onremove = null;
        this.pending = false;
        this.playState = 'running';
        this.playbackRate = 0;
        this.ready = Promise.resolve({});
        this.replaceState = 'active';
        this.startTime = null;
        this.timeline = null;
    }
    cancel() {
        this.log.push('cancel');
    }
    play() {
        this.log.push('play');
    }
    pause() {
        this.log.push('pause');
    }
    finish() {
        this.log.push('finish');
    }
    commitStyles() {
        throw new Error('Method not implemented.');
    }
    persist() {
        throw new Error('Method not implemented.');
    }
    reverse() {
        throw new Error('Method not implemented.');
    }
    updatePlaybackRate(playbackRate) {
        throw new Error('Method not implemented.');
    }
    removeEventListener(type, listener, options) {
        throw new Error('Method not implemented.');
    }
    dispatchEvent(event) {
        throw new Error('Method not implemented.');
    }
    removeAllListeners(eventName) {
        throw new Error('Method not implemented.');
    }
    eventListeners(eventName) {
        throw new Error('Method not implemented.');
    }
    addEventListener(eventName, handler) { }
}
