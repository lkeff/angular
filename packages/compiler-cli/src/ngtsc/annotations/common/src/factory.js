"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileNgFactoryDefField = compileNgFactoryDefField;
exports.compileDeclareFactory = compileDeclareFactory;
const compiler_1 = require("@angular/compiler");
function compileNgFactoryDefField(metadata) {
    const res = (0, compiler_1.compileFactoryFunction)(metadata);
    return {
        name: 'ɵfac',
        initializer: res.expression,
        statements: res.statements,
        type: res.type,
        deferrableImports: null,
    };
}
function compileDeclareFactory(metadata) {
    const res = (0, compiler_1.compileDeclareFactoryFunction)(metadata);
    return {
        name: 'ɵfac',
        initializer: res.expression,
        statements: res.statements,
        type: res.type,
        deferrableImports: null,
    };
}
