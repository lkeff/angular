"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const needs_linking_1 = require("../../src/file_linker/needs_linking");
describe('needsLinking', () => {
    it('should return true for directive declarations', () => {
        expect((0, needs_linking_1.needsLinking)('file.js', `
      export class Dir {
        ɵdir = ɵɵngDeclareDirective({type: Dir});
      }
    `)).toBeTrue();
    });
    it('should return true for namespaced directive declarations', () => {
        expect((0, needs_linking_1.needsLinking)('file.js', `
      export class Dir {
        ɵdir = ng.ɵɵngDeclareDirective({type: Dir});
      }
    `)).toBeTrue();
    });
    it('should return true for unrelated usages of ɵɵngDeclareDirective', () => {
        expect((0, needs_linking_1.needsLinking)('file.js', `
      const fnName = 'ɵɵngDeclareDirective';
    `)).toBeTrue();
    });
    it('should return false when the file does not contain ɵɵngDeclareDirective', () => {
        expect((0, needs_linking_1.needsLinking)('file.js', `
      const foo = ngDeclareDirective;
    `)).toBeFalse();
    });
    it('should return true for component declarations', () => {
        expect((0, needs_linking_1.needsLinking)('file.js', `
      export class Cmp {
        ɵdir = ɵɵngDeclareComponent({type: Cmp});
      }
    `)).toBeTrue();
    });
    it('should return true for namespaced component declarations', () => {
        expect((0, needs_linking_1.needsLinking)('file.js', `
      export class Cmp {
        ɵdir = ng.ɵɵngDeclareComponent({type: Cmp});
      }
    `)).toBeTrue();
    });
    it('should return true for unrelated usages of ɵɵngDeclareComponent', () => {
        expect((0, needs_linking_1.needsLinking)('file.js', `
      const fnName = 'ɵɵngDeclareComponent';
    `)).toBeTrue();
    });
    it('should return false when the file does not contain ɵɵngDeclareComponent', () => {
        expect((0, needs_linking_1.needsLinking)('file.js', `
      const foo = ngDeclareComponent;
    `)).toBeFalse();
    });
});
