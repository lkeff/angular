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
describe('NgModule declaration jit compilation', () => {
    it('should compile a minimal NgModule declaration', () => {
        const def = (0, core_1.ɵɵngDeclareNgModule)({ type: TestClass });
        expectNgModuleDef(def, {});
    });
    it('should compile an NgModule declaration with bootstrap classes', () => {
        const def = (0, core_1.ɵɵngDeclareNgModule)({
            type: TestClass,
            bootstrap: [TestComponent],
        });
        expectNgModuleDef(def, { bootstrap: [TestComponent] });
    });
    it('should compile an NgModule declaration with forward referenced bootstrap classes', () => {
        const def = (0, core_1.ɵɵngDeclareNgModule)({
            type: TestClass,
            bootstrap: () => [ForwardRef],
        });
        class ForwardRef {
        }
        expectNgModuleDef(def, { bootstrap: [ForwardRef] });
    });
    it('should compile an NgModule declaration with declarations classes', () => {
        const def = (0, core_1.ɵɵngDeclareNgModule)({
            type: TestClass,
            declarations: [TestComponent],
        });
        expectNgModuleDef(def, { declarations: [TestComponent] });
    });
    it('should compile an NgModule declaration with forward referenced declarations classes', () => {
        const def = (0, core_1.ɵɵngDeclareNgModule)({
            type: TestClass,
            declarations: () => [TestComponent],
        });
        expectNgModuleDef(def, { declarations: [TestComponent] });
    });
    it('should compile an NgModule declaration with imports classes', () => {
        const def = (0, core_1.ɵɵngDeclareNgModule)({
            type: TestClass,
            imports: [TestModule],
        });
        expectNgModuleDef(def, { imports: [TestModule] });
    });
    it('should compile an NgModule declaration with forward referenced imports classes', () => {
        const def = (0, core_1.ɵɵngDeclareNgModule)({
            type: TestClass,
            imports: () => [TestModule],
        });
        expectNgModuleDef(def, { imports: [TestModule] });
    });
    it('should compile an NgModule declaration with exports classes', () => {
        const def = (0, core_1.ɵɵngDeclareNgModule)({
            type: TestClass,
            exports: [TestComponent, TestModule],
        });
        expectNgModuleDef(def, { exports: [TestComponent, TestModule] });
    });
    it('should compile an NgModule declaration with forward referenced exports classes', () => {
        const def = (0, core_1.ɵɵngDeclareNgModule)({
            type: TestClass,
            exports: () => [TestComponent, TestModule],
        });
        expectNgModuleDef(def, { exports: [TestComponent, TestModule] });
    });
    it('should compile an NgModule declaration with schemas', () => {
        const def = (0, core_1.ɵɵngDeclareNgModule)({
            type: TestClass,
            schemas: [core_1.NO_ERRORS_SCHEMA],
        });
        expectNgModuleDef(def, { schemas: [core_1.NO_ERRORS_SCHEMA] });
    });
    it('should compile an NgModule declaration with an id expression', () => {
        const id = 'ModuleID';
        const def = (0, core_1.ɵɵngDeclareNgModule)({ type: TestClass, id });
        expectNgModuleDef(def, { id: 'ModuleID' });
    });
});
class TestClass {
}
class TestComponent {
}
class TestModule {
}
/**
 * Asserts that the provided NgModule definition is according to the provided expectation.
 * Definition fields for which no expectation is present are verified to be initialized to their
 * default value.
 */
function expectNgModuleDef(actual, expected) {
    const expectation = Object.assign({ bootstrap: [], declarations: [], imports: [], exports: [], schemas: null, id: null }, expected);
    expect(actual.type).toBe(TestClass);
    expect(unwrap(actual.bootstrap)).toEqual(expectation.bootstrap);
    expect(unwrap(actual.declarations)).toEqual(expectation.declarations);
    expect(unwrap(actual.imports)).toEqual(expectation.imports);
    expect(unwrap(actual.exports)).toEqual(expectation.exports);
    expect(actual.schemas).toEqual(expectation.schemas);
    expect(actual.id).toEqual(expectation.id);
}
function unwrap(values) {
    return typeof values === 'function' ? values() : values;
}
