"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const matchers_1 = require("@angular/platform-browser/testing/src/matchers");
class SomeMetadata {
    constructor(options) {
        this.plainProp = options.plainProp;
        this._getterProp = options.getterProp;
        this.arrayProp = options.arrayProp;
        Object.defineProperty(this, 'getterProp', {
            enumerable: true, // getters are non-enumerable by default in es2015
            get: () => this._getterProp,
        });
    }
}
class OtherMetadata extends SomeMetadata {
    constructor(options) {
        super({
            plainProp: options.plainProp,
            getterProp: options.getterProp,
            arrayProp: options.arrayProp,
        });
        this.otherPlainProp = options.otherPlainProp;
    }
}
describe('metadata overrider', () => {
    let overrider;
    beforeEach(() => {
        overrider = new testing_1.ɵMetadataOverrider();
    });
    it('should return a new instance with the same values', () => {
        const oldInstance = new SomeMetadata({ plainProp: 'somePlainProp', getterProp: 'someInput' });
        const newInstance = overrider.overrideMetadata(SomeMetadata, oldInstance, {});
        (0, matchers_1.expect)(newInstance).not.toBe(oldInstance);
        (0, matchers_1.expect)(newInstance).toBeInstanceOf(SomeMetadata);
        (0, matchers_1.expect)(newInstance).toEqual(oldInstance);
    });
    it('should set individual properties and keep others', () => {
        const oldInstance = new SomeMetadata({
            plainProp: 'somePlainProp',
            getterProp: 'someGetterProp',
        });
        const newInstance = overrider.overrideMetadata(SomeMetadata, oldInstance, {
            set: { plainProp: 'newPlainProp' },
        });
        (0, matchers_1.expect)(newInstance).toEqual(new SomeMetadata({ plainProp: 'newPlainProp', getterProp: 'someGetterProp' }));
    });
    describe('add properties', () => {
        it('should replace non array values', () => {
            const oldInstance = new SomeMetadata({
                plainProp: 'somePlainProp',
                getterProp: 'someGetterProp',
            });
            const newInstance = overrider.overrideMetadata(SomeMetadata, oldInstance, {
                add: { plainProp: 'newPlainProp' },
            });
            (0, matchers_1.expect)(newInstance).toEqual(new SomeMetadata({ plainProp: 'newPlainProp', getterProp: 'someGetterProp' }));
        });
        it('should add to array values', () => {
            const oldInstance = new SomeMetadata({ arrayProp: ['a'] });
            const newInstance = overrider.overrideMetadata(SomeMetadata, oldInstance, {
                add: { arrayProp: ['b'] },
            });
            (0, matchers_1.expect)(newInstance).toEqual(new SomeMetadata({ arrayProp: ['a', 'b'] }));
        });
    });
    describe('remove', () => {
        it('should set values to undefined if their value matches', () => {
            const oldInstance = new SomeMetadata({
                plainProp: 'somePlainProp',
                getterProp: 'someGetterProp',
            });
            const newInstance = overrider.overrideMetadata(SomeMetadata, oldInstance, {
                remove: { plainProp: 'somePlainProp' },
            });
            (0, matchers_1.expect)(newInstance).toEqual(new SomeMetadata({ plainProp: undefined, getterProp: 'someGetterProp' }));
        });
        it('should leave values if their value does not match', () => {
            const oldInstance = new SomeMetadata({
                plainProp: 'somePlainProp',
                getterProp: 'someGetterProp',
            });
            const newInstance = overrider.overrideMetadata(SomeMetadata, oldInstance, {
                remove: { plainProp: 'newPlainProp' },
            });
            (0, matchers_1.expect)(newInstance).toEqual(new SomeMetadata({ plainProp: 'somePlainProp', getterProp: 'someGetterProp' }));
        });
        it('should remove a value from an array', () => {
            const oldInstance = new SomeMetadata({
                arrayProp: ['a', 'b', 'c'],
                getterProp: 'someGetterProp',
            });
            const newInstance = overrider.overrideMetadata(SomeMetadata, oldInstance, {
                remove: { arrayProp: ['a', 'c'] },
            });
            (0, matchers_1.expect)(newInstance).toEqual(new SomeMetadata({ arrayProp: ['b'], getterProp: 'someGetterProp' }));
        });
        it('should support types as values', () => {
            class Class1 {
            }
            class Class2 {
            }
            class Class3 {
            }
            const instance1 = new SomeMetadata({ arrayProp: [Class1, Class2, Class3] });
            const instance2 = overrider.overrideMetadata(SomeMetadata, instance1, {
                remove: { arrayProp: [Class1] },
            });
            (0, matchers_1.expect)(instance2).toEqual(new SomeMetadata({ arrayProp: [Class2, Class3] }));
            const instance3 = overrider.overrideMetadata(SomeMetadata, instance2, {
                remove: { arrayProp: [Class3] },
            });
            (0, matchers_1.expect)(instance3).toEqual(new SomeMetadata({ arrayProp: [Class2] }));
        });
    });
    describe('subclasses', () => {
        it('should set individual properties and keep others', () => {
            const oldInstance = new OtherMetadata({
                plainProp: 'somePlainProp',
                getterProp: 'someGetterProp',
                otherPlainProp: 'newOtherProp',
            });
            const newInstance = overrider.overrideMetadata(OtherMetadata, oldInstance, {
                set: { plainProp: 'newPlainProp' },
            });
            (0, matchers_1.expect)(newInstance).toEqual(new OtherMetadata({
                plainProp: 'newPlainProp',
                getterProp: 'someGetterProp',
                otherPlainProp: 'newOtherProp',
            }));
        });
    });
});
