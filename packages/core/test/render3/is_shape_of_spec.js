"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const is_shape_of_1 = require("./is_shape_of");
describe('isShapeOf', () => {
    const ShapeOfEmptyObject = {};
    it('should not match for non objects', () => {
        expect((0, is_shape_of_1.isShapeOf)(null, ShapeOfEmptyObject)).toBeFalse();
        expect((0, is_shape_of_1.isShapeOf)(0, ShapeOfEmptyObject)).toBeFalse();
        expect((0, is_shape_of_1.isShapeOf)(1, ShapeOfEmptyObject)).toBeFalse();
        expect((0, is_shape_of_1.isShapeOf)(true, ShapeOfEmptyObject)).toBeFalse();
        expect((0, is_shape_of_1.isShapeOf)(false, ShapeOfEmptyObject)).toBeFalse();
        expect((0, is_shape_of_1.isShapeOf)(undefined, ShapeOfEmptyObject)).toBeFalse();
    });
    it('should match on empty object', () => {
        expect((0, is_shape_of_1.isShapeOf)({}, ShapeOfEmptyObject)).toBeTrue();
        expect((0, is_shape_of_1.isShapeOf)({ extra: 'is ok' }, ShapeOfEmptyObject)).toBeTrue();
    });
    it('should match on shape', () => {
        expect((0, is_shape_of_1.isShapeOf)({ required: 1 }, { required: true })).toBeTrue();
        expect((0, is_shape_of_1.isShapeOf)({ required: true, extra: 'is ok' }, { required: true })).toBeTrue();
    });
    it('should not match if missing property', () => {
        expect((0, is_shape_of_1.isShapeOf)({ required: 1 }, { required: true, missing: true })).toBeFalse();
        expect((0, is_shape_of_1.isShapeOf)({ required: true, extra: 'is ok' }, { required: true, missing: true })).toBeFalse();
    });
});
