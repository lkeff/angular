"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const compiler_1 = require("../../src/compiler");
describe('RecursiveAstVisitor', () => {
    it('should visit every node', () => {
        const parser = new index_1.Parser(new index_1.Lexer());
        const ast = parser.parseBinding('x.y()', '', 0 /* absoluteOffset */);
        const visitor = new Visitor();
        const path = [];
        visitor.visit(ast.ast, path);
        // If the visitor method of RecursiveAstVisitor is implemented correctly,
        // then we should have collected the full path from root to leaf.
        expect(path.length).toBe(4);
        const [call, yRead, xRead, implicitReceiver] = path;
        expectType(call, compiler_1.Call);
        expectType(yRead, compiler_1.PropertyRead);
        expectType(xRead, compiler_1.PropertyRead);
        expectType(implicitReceiver, compiler_1.ImplicitReceiver);
        expect(xRead.name).toBe('x');
        expect(yRead.name).toBe('y');
        expect(call.args).toEqual([]);
    });
});
class Visitor extends index_1.RecursiveAstVisitor {
    visit(node, path) {
        path.push(node);
        node.visit(this, path);
    }
}
function expectType(val, t) {
    expect(val instanceof t).toBe(true, `expect ${val.constructor.name} to be ${t.name}`);
}
