"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@babel/core");
const babel_declaration_scope_1 = require("../src/babel_declaration_scope");
describe('BabelDeclarationScope', () => {
    describe('getConstantScopeRef()', () => {
        it('should return a path to the ES module where the expression was imported', () => {
            const ast = (0, core_1.parse)([
                "import * as core from '@angular/core';",
                'function foo() {',
                '  var TEST = core;',
                '}',
            ].join('\n'), { sourceType: 'module' });
            const nodePath = findVarDeclaration(ast, 'TEST');
            const scope = new babel_declaration_scope_1.BabelDeclarationScope(nodePath.scope);
            const constantScope = scope.getConstantScopeRef(nodePath.get('init').node);
            expect(constantScope).not.toBe(null);
            expect(constantScope.node).toBe(ast.program);
        });
        it('should return a path to the ES Module where the expression is declared', () => {
            const ast = (0, core_1.parse)(['var core;', 'export function foo() {', '  var TEST = core;', '}'].join('\n'), { sourceType: 'module' });
            const nodePath = findVarDeclaration(ast, 'TEST');
            const scope = new babel_declaration_scope_1.BabelDeclarationScope(nodePath.scope);
            const constantScope = scope.getConstantScopeRef(nodePath.get('init').node);
            expect(constantScope).not.toBe(null);
            expect(constantScope.node).toBe(ast.program);
        });
        it('should return null if the file is not an ES module', () => {
            const ast = (0, core_1.parse)(['var core;', 'function foo() {', '  var TEST = core;', '}'].join('\n'), {
                sourceType: 'script',
            });
            const nodePath = findVarDeclaration(ast, 'TEST');
            const scope = new babel_declaration_scope_1.BabelDeclarationScope(nodePath.scope);
            const constantScope = scope.getConstantScopeRef(nodePath.get('init').node);
            expect(constantScope).toBe(null);
        });
        it('should return the IIFE factory function where the expression is a parameter', () => {
            const ast = (0, core_1.parse)([
                'var core;',
                '(function(core) {',
                "  var BLOCK = 'block';",
                '  function foo() {',
                '    var TEST = core;',
                '  }',
                '})(core);',
            ].join('\n'), { sourceType: 'script' });
            const nodePath = findVarDeclaration(ast, 'TEST');
            const fnPath = findFirstFunction(ast);
            const scope = new babel_declaration_scope_1.BabelDeclarationScope(nodePath.scope);
            const constantScope = scope.getConstantScopeRef(nodePath.get('init').node);
            expect(constantScope).not.toBe(null);
            expect(constantScope.isFunction()).toBe(true);
            expect(constantScope.node).toEqual(fnPath.node);
        });
    });
});
function findVarDeclaration(file, varName) {
    let varDecl = undefined;
    (0, core_1.traverse)(file, {
        VariableDeclarator: (path) => {
            const id = path.get('id');
            if (id.isIdentifier() && id.node.name === varName && path.get('init') !== null) {
                varDecl = path;
                path.stop();
            }
        },
    });
    if (varDecl === undefined) {
        throw new Error(`TEST BUG: expected to find variable declaration for ${varName}.`);
    }
    return varDecl;
}
function findFirstFunction(file) {
    let fn = undefined;
    (0, core_1.traverse)(file, {
        Function: (path) => {
            fn = path;
            path.stop();
        },
    });
    if (fn === undefined) {
        throw new Error(`TEST BUG: expected to find a function.`);
    }
    return fn;
}
