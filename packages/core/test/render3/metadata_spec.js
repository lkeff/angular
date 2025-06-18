"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_1 = require("../../src/render3/metadata");
function metadataOf(value) {
    return value;
}
describe('render3 setClassMetadata()', () => {
    it('should set decorator metadata on a type', () => {
        const Foo = metadataOf(class Foo {
        });
        (0, metadata_1.setClassMetadata)(Foo, [{ type: 'test', args: ['arg'] }], null, null);
        expect(Foo.decorators).toEqual([{ type: 'test', args: ['arg'] }]);
    });
    it('should merge decorator metadata on a type', () => {
        const Foo = metadataOf(class Foo {
        });
        Foo.decorators = [{ type: 'first' }];
        (0, metadata_1.setClassMetadata)(Foo, [{ type: 'test', args: ['arg'] }], null, null);
        expect(Foo.decorators).toEqual([{ type: 'first' }, { type: 'test', args: ['arg'] }]);
    });
    it('should set ctor parameter metadata on a type', () => {
        const Foo = metadataOf(class Foo {
        });
        Foo.ctorParameters = () => [{ type: 'initial' }];
        (0, metadata_1.setClassMetadata)(Foo, null, () => [{ type: 'test' }], null);
        expect(Foo.ctorParameters()).toEqual([{ type: 'test' }]);
    });
    it('should set parameter decorator metadata on a type', () => {
        const Foo = metadataOf(class Foo {
        });
        (0, metadata_1.setClassMetadata)(Foo, null, null, { field: [{ type: 'test', args: ['arg'] }] });
        expect(Foo.propDecorators).toEqual({ field: [{ type: 'test', args: ['arg'] }] });
    });
    it('should merge parameter decorator metadata on a type', () => {
        const Foo = metadataOf(class Foo {
        });
        Foo.propDecorators = { initial: [{ type: 'first' }] };
        (0, metadata_1.setClassMetadata)(Foo, null, null, { field: [{ type: 'test', args: ['arg'] }] });
        expect(Foo.propDecorators).toEqual({
            field: [{ type: 'test', args: ['arg'] }],
            initial: [{ type: 'first' }],
        });
    });
});
