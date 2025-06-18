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
describe('Injector declaration jit compilation', () => {
    it('should compile a minimal Injector declaration', () => {
        const def = (0, core_1.ɵɵngDeclareInjector)({ type: TestClass });
        expect(def.providers).toEqual([]);
        expect(def.imports).toEqual([]);
    });
    it('should compile an Injector declaration with providers', () => {
        class OtherClass {
        }
        const TestToken = new core_1.InjectionToken('TestToken');
        const testTokenValue = {};
        const def = (0, core_1.ɵɵngDeclareInjector)({
            type: TestClass,
            providers: [OtherClass, { provide: TestToken, useValue: testTokenValue }],
        });
        expect(def.providers).toEqual([OtherClass, { provide: TestToken, useValue: testTokenValue }]);
        expect(def.imports).toEqual([]);
    });
    it('should compile an Injector declaration with imports', () => {
        const OtherInjector = {};
        const def = (0, core_1.ɵɵngDeclareInjector)({
            type: TestClass,
            imports: [OtherInjector],
        });
        expect(def.providers).toEqual([]);
        expect(def.imports).toEqual([OtherInjector]);
    });
});
class TestClass {
}
