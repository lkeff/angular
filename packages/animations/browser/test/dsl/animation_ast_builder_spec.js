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
const animation_ast_builder_1 = require("../../src/dsl/animation_ast_builder");
const testing_1 = require("../../testing");
describe('buildAnimationAst', () => {
    it('should build the AST without any errors and warnings', () => {
        const driver = new testing_1.MockAnimationDriver();
        const errors = [];
        const warnings = [];
        const animationAst = (0, animation_ast_builder_1.buildAnimationAst)(driver, {
            animation: [
                {
                    styles: {
                        offset: null,
                        styles: { backgroundColor: '#000' },
                        type: animations_1.AnimationMetadataType.Style,
                    },
                    timings: { delay: 0, duration: 1000, easing: 'ease-in-out' },
                    type: animations_1.AnimationMetadataType.Animate,
                },
            ],
            options: null,
            selector: 'body',
            type: animations_1.AnimationMetadataType.Query,
        }, errors, warnings);
        expect(errors).toEqual([]);
        expect(warnings).toEqual([]);
        expect(animationAst).toEqual({
            type: 11,
            selector: 'body',
            limit: 0,
            optional: false,
            includeSelf: false,
            animation: {
                type: 4,
                timings: { delay: 0, duration: 1000, easing: 'ease-in-out' },
                style: {
                    type: 6,
                    styles: [new Map([['backgroundColor', '#000']])],
                    easing: null,
                    offset: null,
                    containsDynamicStyles: false,
                    options: null,
                    isEmptyStep: false,
                },
                options: null,
            },
            originalSelector: 'body',
            options: {},
        });
    });
});
