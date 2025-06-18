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
const directive_1 = require("../../../src/render3/jit/directive");
const metadata_1 = require("../../../src/render3/metadata");
describe('jit directive helper functions', () => {
    describe('extendsDirectlyFromObject', () => {
        // Inheritance Example using Classes
        class Parent {
        }
        class Child extends Parent {
        }
        // Inheritance Example using Function
        const Parent5 = function Parent5() { };
        const Child5 = function Child5() { };
        Child5.prototype = new Parent5();
        Child5.prototype.constructor = Child5;
        it('should correctly behave with instanceof', () => {
            expect(new Child() instanceof Object).toBeTruthy();
            expect(new Child() instanceof Parent).toBeTruthy();
            expect(new Parent() instanceof Child).toBeFalsy();
            expect(new Child5() instanceof Object).toBeTruthy();
            expect(new Child5() instanceof Parent5).toBeTruthy();
            expect(new Parent5() instanceof Child5).toBeFalsy();
        });
        it('should detect direct inheritance form Object', () => {
            expect((0, directive_1.extendsDirectlyFromObject)(Parent)).toBeTruthy();
            expect((0, directive_1.extendsDirectlyFromObject)(Child)).toBeFalsy();
            expect((0, directive_1.extendsDirectlyFromObject)(Parent5)).toBeTruthy();
            expect((0, directive_1.extendsDirectlyFromObject)(Child5)).toBeFalsy();
        });
    });
    describe('convertToR3QueryMetadata', () => {
        it('should convert decorator with a single string selector', () => {
            expect((0, directive_1.convertToR3QueryMetadata)('propName', {
                selector: 'localRef',
                descendants: false,
                first: false,
                isViewQuery: false,
                read: undefined,
                static: false,
                emitDistinctChangesOnly: false,
            })).toEqual({
                propertyName: 'propName',
                predicate: ['localRef'],
                descendants: false,
                first: false,
                read: null,
                static: false,
                emitDistinctChangesOnly: false,
                isSignal: false,
            });
        });
        it('should convert decorator with multiple string selectors', () => {
            expect((0, directive_1.convertToR3QueryMetadata)('propName', {
                selector: 'foo, bar,baz',
                descendants: true,
                first: true,
                isViewQuery: true,
                read: undefined,
                static: false,
                emitDistinctChangesOnly: false,
            })).toEqual({
                propertyName: 'propName',
                predicate: ['foo', 'bar', 'baz'],
                descendants: true,
                first: true,
                read: null,
                static: false,
                emitDistinctChangesOnly: false,
                isSignal: false,
            });
        });
        it('should convert decorator with type selector and read option', () => {
            class Directive {
            }
            const converted = (0, directive_1.convertToR3QueryMetadata)('propName', {
                selector: Directive,
                descendants: true,
                first: true,
                isViewQuery: true,
                read: Directive,
                static: false,
                emitDistinctChangesOnly: false,
            });
            expect(converted.predicate).toEqual(Directive);
            expect(converted.read).toEqual(Directive);
        });
    });
    describe('directiveMetadata', () => {
        it('should not inherit propMetadata from super class', () => {
            class SuperDirective {
            }
            (0, metadata_1.setClassMetadata)(SuperDirective, [{ type: core_1.Directive, args: [] }], null, {
                handleClick: [{ type: core_1.HostListener, args: ['click'] }],
            });
            class SubDirective extends SuperDirective {
            }
            (0, metadata_1.setClassMetadata)(SubDirective, [{ type: core_1.Directive, args: [] }], null, null);
            expect((0, directive_1.directiveMetadata)(SuperDirective, {}).propMetadata['handleClick']).toBeTruthy();
            expect((0, directive_1.directiveMetadata)(SubDirective, {}).propMetadata['handleClick']).toBeFalsy();
        });
        it('should not inherit propMetadata from grand super class', () => {
            class SuperSuperDirective {
            }
            (0, metadata_1.setClassMetadata)(SuperSuperDirective, [{ type: core_1.Directive, args: [] }], null, {
                handleClick: [{ type: core_1.HostListener, args: ['click'] }],
            });
            class SuperDirective {
            }
            (0, metadata_1.setClassMetadata)(SuperDirective, [{ type: core_1.Directive, args: [] }], null, null);
            class SubDirective extends SuperDirective {
            }
            (0, metadata_1.setClassMetadata)(SubDirective, [{ type: core_1.Directive, args: [] }], null, null);
            expect((0, directive_1.directiveMetadata)(SuperSuperDirective, {}).propMetadata['handleClick']).toBeTruthy();
            expect((0, directive_1.directiveMetadata)(SuperDirective, {}).propMetadata['handleClick']).toBeFalsy();
            expect((0, directive_1.directiveMetadata)(SubDirective, {}).propMetadata['handleClick']).toBeFalsy();
        });
        it('should not inherit propMetadata from super class when sub class has its own propMetadata', () => {
            class SuperDirective {
            }
            (0, metadata_1.setClassMetadata)(SuperDirective, [{ type: core_1.Directive }], null, {
                someInput: [{ type: core_1.Input }],
                handleClick: [{ type: core_1.HostListener, args: ['click', ['$event']] }],
            });
            class SubDirective extends SuperDirective {
            }
            (0, metadata_1.setClassMetadata)(SubDirective, [{ type: core_1.Directive }], null, { someOtherInput: [{ type: core_1.Input }] });
            const superPropMetadata = (0, directive_1.directiveMetadata)(SuperDirective, {}).propMetadata;
            const subPropMetadata = (0, directive_1.directiveMetadata)(SubDirective, {}).propMetadata;
            expect(superPropMetadata['handleClick']).toBeTruthy();
            expect(superPropMetadata['someInput']).toBeTruthy();
            expect(subPropMetadata['handleClick']).toBeFalsy();
            expect(subPropMetadata['someInput']).toBeFalsy();
            expect(subPropMetadata['someOtherInput']).toBeTruthy();
        });
    });
});
