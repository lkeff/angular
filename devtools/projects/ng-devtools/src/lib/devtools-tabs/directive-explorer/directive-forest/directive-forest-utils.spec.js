"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const directive_forest_utils_1 = require("./directive-forest-utils");
describe('directive-forest-utils', () => {
    describe('getDirectivesArrayString', () => {
        it('should return an empty string, if no directives', () => {
            const output = (0, directive_forest_utils_1.getDirectivesArrayString)({});
            expect(output).toEqual('');
        });
        it('should return a single directive string', () => {
            const output = (0, directive_forest_utils_1.getDirectivesArrayString)({
                directives: ['Foo'],
            });
            expect(output).toEqual('[Foo]');
        });
        it('should return multiple directives string', () => {
            const output = (0, directive_forest_utils_1.getDirectivesArrayString)({
                directives: ['Foo', 'Bar'],
            });
            expect(output).toEqual('[Foo][Bar]');
        });
    });
    describe('getFullNodeNameString', () => {
        it('should return a simple component name string', () => {
            const output = (0, directive_forest_utils_1.getFullNodeNameString)({
                name: 'app-test',
                original: { component: {} },
            });
            expect(output).toEqual('app-test');
        });
        it('should enclose name in a tag, if an element', () => {
            const output = (0, directive_forest_utils_1.getFullNodeNameString)({
                name: 'app-element',
                original: {
                    component: {
                        isElement: true,
                    },
                },
            });
            expect(output).toEqual('<app-element/>');
        });
        it('should return component name with directives string, if any', () => {
            const output = (0, directive_forest_utils_1.getFullNodeNameString)({
                name: 'app-test',
                directives: ['Foo', 'Bar'],
                original: { component: {} },
            });
            expect(output).toEqual('app-test[Foo][Bar]');
        });
    });
});
