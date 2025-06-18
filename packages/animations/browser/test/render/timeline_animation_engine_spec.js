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
const animation_style_normalizer_1 = require("../../src/dsl/style_normalization/animation_style_normalizer");
const shared_1 = require("../../src/render/shared");
const timeline_animation_engine_1 = require("../../src/render/timeline_animation_engine");
const mock_animation_driver_1 = require("../../testing/src/mock_animation_driver");
(function () {
    const defaultDriver = new mock_animation_driver_1.MockAnimationDriver();
    function makeEngine(body, driver, normalizer) {
        return new timeline_animation_engine_1.TimelineAnimationEngine(body, driver || defaultDriver, normalizer || new animation_style_normalizer_1.NoopAnimationStyleNormalizer());
    }
    // these tests are only meant to be run within the DOM
    if (isNode)
        return;
    describe('TimelineAnimationEngine', () => {
        let element;
        beforeEach(() => {
            mock_animation_driver_1.MockAnimationDriver.log = [];
            element = document.createElement('div');
            document.body.appendChild(element);
        });
        afterEach(() => element.remove());
        it('should animate a timeline', () => {
            const engine = makeEngine((0, shared_1.getBodyNode)());
            const steps = [(0, animations_1.style)({ height: 100 }), (0, animations_1.animate)(1000, (0, animations_1.style)({ height: 0 }))];
            expect(mock_animation_driver_1.MockAnimationDriver.log.length).toEqual(0);
            invokeAnimation(engine, element, steps);
            expect(mock_animation_driver_1.MockAnimationDriver.log.length).toEqual(1);
        });
        it('should not destroy timeline-based animations after they have finished', () => {
            const engine = makeEngine((0, shared_1.getBodyNode)());
            const log = [];
            function capture(value) {
                return () => {
                    log.push(value);
                };
            }
            const steps = [(0, animations_1.style)({ height: 0 }), (0, animations_1.animate)(1000, (0, animations_1.style)({ height: 500 }))];
            const player = invokeAnimation(engine, element, steps);
            player.onDone(capture('done'));
            player.onDestroy(capture('destroy'));
            expect(log).toEqual([]);
            player.finish();
            expect(log).toEqual(['done']);
            player.destroy();
            expect(log).toEqual(['done', 'destroy']);
        });
        it('should normalize the style values that are animateTransitioned within an a timeline animation', () => {
            const engine = makeEngine((0, shared_1.getBodyNode)(), defaultDriver, new SuffixNormalizer('-normalized'));
            const steps = [(0, animations_1.style)({ width: '333px' }), (0, animations_1.animate)(1000, (0, animations_1.style)({ width: '999px' }))];
            const player = invokeAnimation(engine, element, steps);
            expect(player.keyframes).toEqual([
                new Map([
                    ['width-normalized', '333px-normalized'],
                    ['offset', 0],
                ]),
                new Map([
                    ['width-normalized', '999px-normalized'],
                    ['offset', 1],
                ]),
            ]);
        });
        it('should normalize `*` values', () => {
            const driver = new SuperMockDriver();
            const engine = makeEngine((0, shared_1.getBodyNode)(), driver);
            const steps = [(0, animations_1.style)({ width: '*' }), (0, animations_1.animate)(1000, (0, animations_1.style)({ width: '999px' }))];
            const player = invokeAnimation(engine, element, steps);
            expect(player.keyframes).toEqual([
                new Map([
                    ['width', '*star*'],
                    ['offset', 0],
                ]),
                new Map([
                    ['width', '999px'],
                    ['offset', 1],
                ]),
            ]);
        });
    });
})();
function invokeAnimation(engine, element, steps, id = 'id') {
    engine.register(id, steps);
    return engine.create(id, element);
}
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
class SuperMockDriver extends mock_animation_driver_1.MockAnimationDriver {
    computeStyle(element, prop, defaultValue) {
        return '*star*';
    }
}
