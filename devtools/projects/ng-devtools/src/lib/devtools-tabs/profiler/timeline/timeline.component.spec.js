"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const timeline_component_1 = require("./timeline.component");
describe('TimelineComponent', () => {
    it('should calculate the framerate from passed duration', () => {
        expect(timeline_component_1.TimelineComponent.estimateFrameRate(0)).toBe(60);
        expect(timeline_component_1.TimelineComponent.estimateFrameRate(15)).toBe(60);
        expect(timeline_component_1.TimelineComponent.estimateFrameRate(17)).toBe(30);
        expect(timeline_component_1.TimelineComponent.estimateFrameRate(31)).toBe(30);
        expect(timeline_component_1.TimelineComponent.estimateFrameRate(30)).toBe(30);
        expect(timeline_component_1.TimelineComponent.estimateFrameRate(33)).toBe(15);
        expect(timeline_component_1.TimelineComponent.estimateFrameRate(48)).toBe(15);
        expect(timeline_component_1.TimelineComponent.estimateFrameRate(49)).toBe(7);
        expect(timeline_component_1.TimelineComponent.estimateFrameRate(2000)).toBe(0);
    });
});
