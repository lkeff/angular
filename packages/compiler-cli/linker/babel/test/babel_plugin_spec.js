"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const core_1 = __importDefault(require("@babel/core"));
describe('default babel plugin entry-point', () => {
    it('should work as a Babel plugin using the module specifier', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = (yield core_1.default.transformAsync(`
        import * as i0 from "@angular/core";

        export class MyMod {}
        export class MyComponent {}

        MyMod.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "0.0.0-PLACEHOLDER", ngImport: i0, type: MyMod, declarations: [MyComponent] });
       `, {
            plugins: ['@angular/compiler-cli/linker/babel/index.mjs'],
            filename: 'test.js',
        }));
        expect(result).not.toBeNull();
        expect(result.code).not.toContain('ɵɵngDeclareNgModule');
        expect(result.code).toContain('i0.ɵɵdefineNgModule');
        expect(result.code).not.toMatch(/declarations:\s*\[MyComponent]/);
    }));
    it('should be configurable', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = (yield core_1.default.transformAsync(`
        import * as i0 from "@angular/core";

        export class MyMod {}
        export class MyComponent {}

        MyMod.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "0.0.0-PLACEHOLDER", ngImport: i0, type: MyMod, declarations: [MyComponent] });
       `, {
            plugins: [['@angular/compiler-cli/linker/babel/index.mjs', { linkerJitMode: true }]],
            filename: 'test.js',
        }));
        expect(result).not.toBeNull();
        expect(result.code).not.toContain('ɵɵngDeclareNgModule');
        expect(result.code).toContain('i0.ɵɵdefineNgModule');
        expect(result.code).toMatch(/declarations:\s*\[MyComponent]/);
    }));
});
