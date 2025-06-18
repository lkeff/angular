"use strict";
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
const typescript_1 = __importDefault(require("typescript"));
const file_system_1 = require("../../file_system");
const testing_1 = require("../../file_system/testing");
const testing_2 = require("../../testing");
const visitor_1 = require("../src/visitor");
class TestAstVisitor extends visitor_1.Visitor {
    visitClassDeclaration(node) {
        const name = node.name.text;
        const statics = node.members.filter((member) => {
            const modifiers = typescript_1.default.canHaveModifiers(member) ? typescript_1.default.getModifiers(member) : undefined;
            return (modifiers || []).some((mod) => mod.kind === typescript_1.default.SyntaxKind.StaticKeyword);
        });
        const idStatic = statics.find((el) => typescript_1.default.isPropertyDeclaration(el) && typescript_1.default.isIdentifier(el.name) && el.name.text === 'id');
        if (idStatic !== undefined) {
            return {
                node,
                before: [
                    typescript_1.default.factory.createVariableStatement(undefined, [
                        typescript_1.default.factory.createVariableDeclaration(`${name}_id`, undefined, undefined, idStatic.initializer),
                    ]),
                ],
            };
        }
        return { node };
    }
}
function testTransformerFactory(context) {
    return (file) => (0, visitor_1.visit)(file, new TestAstVisitor(), context);
}
(0, testing_1.runInEachFileSystem)(() => {
    describe('AST Visitor', () => {
        let _;
        beforeEach(() => (_ = file_system_1.absoluteFrom));
        it('should add a statement before class in plain file', () => {
            const { program, host } = (0, testing_2.makeProgram)([
                { name: _('/main.ts'), contents: `class A { static id = 3; }` },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, _('/main.ts'));
            program.emit(sf, undefined, undefined, undefined, { before: [testTransformerFactory] });
            const main = host.readFile('/main.js');
            expect(main).toMatch(/^var A_id = 3;/);
        });
        it('should add a statement before class inside function definition', () => {
            const { program, host } = (0, testing_2.makeProgram)([
                {
                    name: _('/main.ts'),
                    contents: `
      export function foo() {
        var x = 3;
        class A { static id = 2; }
        return A;
      }
    `,
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, _('/main.ts'));
            program.emit(sf, undefined, undefined, undefined, { before: [testTransformerFactory] });
            const main = host.readFile(_('/main.js'));
            expect(main).toMatch(/var x = 3;\s+var A_id = 2;\s+var A =/);
        });
        it('handles nested statements', () => {
            const { program, host } = (0, testing_2.makeProgram)([
                {
                    name: _('/main.ts'),
                    contents: `
      export class A {
        static id = 3;

        foo() {
          class B {
            static id = 4;
          }
          return B;
        }
    }`,
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, _('/main.ts'));
            program.emit(sf, undefined, undefined, undefined, { before: [testTransformerFactory] });
            const main = host.readFile(_('/main.js'));
            expect(main).toMatch(/var A_id = 3;\s+var A = /);
            expect(main).toMatch(/var B_id = 4;\s+var B = /);
        });
    });
});
