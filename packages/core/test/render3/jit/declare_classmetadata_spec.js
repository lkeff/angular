"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../../../src/core");
describe('class metadata declaration jit compilation', () => {
    it('should attach class decorators', () => {
        const TestClass = class TestClass {
        };
        (0, core_1.ɵɵngDeclareClassMetadata)({
            type: TestClass,
            decorators: [
                {
                    type: core_1.Injectable,
                    args: [],
                },
            ],
        });
        expect(TestClass.decorators.length).toBe(1);
        expect(TestClass.decorators[0].type).toBe(core_1.Injectable);
        expect(TestClass.propDecorators).toBeUndefined();
        expect(TestClass.ctorParameters).toBeUndefined();
    });
    it('should attach property decorators', () => {
        const TestClass = class TestClass {
        };
        (0, core_1.ɵɵngDeclareClassMetadata)({
            type: TestClass,
            decorators: [
                {
                    type: core_1.Injectable,
                    args: [],
                },
            ],
            propDecorators: {
                test: [{ type: core_1.Input, args: [] }],
            },
        });
        expect(TestClass.decorators.length).toBe(1);
        expect(TestClass.decorators[0].type).toBe(core_1.Injectable);
        expect(TestClass.propDecorators).toEqual({
            test: [{ type: core_1.Input, args: [] }],
        });
        expect(TestClass.ctorParameters).toBeUndefined();
    });
    it('should attach constructor parameters', () => {
        const TestClass = class TestClass {
        };
        (0, core_1.ɵɵngDeclareClassMetadata)({
            type: TestClass,
            decorators: [
                {
                    type: core_1.Injectable,
                    args: [],
                },
            ],
            ctorParameters: () => [{ type: String }],
        });
        expect(TestClass.decorators.length).toBe(1);
        expect(TestClass.decorators[0].type).toBe(core_1.Injectable);
        expect(TestClass.propDecorators).toBeUndefined();
        expect(TestClass.ctorParameters()).toEqual([{ type: String }]);
    });
});
