"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/compiler-cli/src/ngtsc/file_system/testing");
const typescript_1 = __importDefault(require("typescript"));
const ts_utils_1 = require("../src/utils/ts_utils");
const testing_2 = require("../testing");
describe('TS util', () => {
    describe('collectMemberMethods', () => {
        beforeEach(() => {
            (0, testing_1.initMockFileSystem)('Native');
        });
        it('gets only methods in class, not getters, setters, or properties', () => {
            const files = {
                'app.ts': `
              export class AppCmp {
                prop!: string;
                get myString(): string {
                    return '';
                }
                set myString(v: string) {
                }

                one() {}
                two() {}
              }`,
            };
            const env = testing_2.LanguageServiceTestEnv.setup();
            const project = env.addProject('test', files);
            const appFile = project.openFile('app.ts');
            appFile.moveCursorToText('AppC¦mp');
            const memberMethods = getMemberMethodNames(project, appFile);
            expect(memberMethods).toEqual(['one', 'two']);
        });
        it('gets inherited methods in class', () => {
            const files = {
                'app.ts': `
              export class BaseClass {
                baseMethod() {}
              }
              export class AppCmp extends BaseClass {}`,
            };
            const env = testing_2.LanguageServiceTestEnv.setup();
            const project = env.addProject('test', files);
            const appFile = project.openFile('app.ts');
            appFile.moveCursorToText('AppC¦mp');
            const memberMethods = getMemberMethodNames(project, appFile);
            expect(memberMethods).toEqual(['baseMethod']);
        });
        it('does not return duplicates if base method is overridden', () => {
            const files = {
                'app.ts': `
              export class BaseClass {
                baseMethod() {}
              }
              export class AppCmp extends BaseClass {
                  baseMethod() {}
              }`,
            };
            const env = testing_2.LanguageServiceTestEnv.setup();
            const project = env.addProject('test', files);
            const appFile = project.openFile('app.ts');
            appFile.moveCursorToText('AppC¦mp');
            const memberMethods = getMemberMethodNames(project, appFile);
            expect(memberMethods).toEqual(['baseMethod']);
        });
        function getMemberMethodNames(project, file) {
            const sf = project.getSourceFile('app.ts');
            const node = (0, ts_utils_1.findTightestNode)(sf, file.cursor);
            expect(typescript_1.default.isClassDeclaration(node.parent)).toBe(true);
            return (0, ts_utils_1.collectMemberMethods)(node.parent, project.getTypeChecker())
                .map((m) => m.name.getText())
                .sort();
        }
    });
    describe('AST method', () => {
        let printer;
        let sourceFile;
        function print(node) {
            return printer.printNode(typescript_1.default.EmitHint.Unspecified, node, sourceFile);
        }
        beforeAll(() => {
            printer = typescript_1.default.createPrinter();
            sourceFile = typescript_1.default.createSourceFile('placeholder.ts', '', typescript_1.default.ScriptTarget.ESNext, true, typescript_1.default.ScriptKind.TS);
        });
        describe('addElementToArrayLiteral', () => {
            it('transforms an empty array literal expression', () => {
                const oldArr = typescript_1.default.factory.createArrayLiteralExpression([], false);
                const newArr = (0, ts_utils_1.addElementToArrayLiteral)(oldArr, typescript_1.default.factory.createStringLiteral('a'));
                expect(print(newArr)).toEqual('["a"]');
            });
            it('transforms an existing array literal expression', () => {
                const oldArr = typescript_1.default.factory.createArrayLiteralExpression([typescript_1.default.factory.createStringLiteral('a')], false);
                const newArr = (0, ts_utils_1.addElementToArrayLiteral)(oldArr, typescript_1.default.factory.createStringLiteral('b'));
                expect(print(newArr)).toEqual('["a", "b"]');
            });
        });
        describe('objectPropertyAssignmentForKey', () => {
            let oldObj;
            beforeEach(() => {
                oldObj = typescript_1.default.factory.createObjectLiteralExpression([
                    typescript_1.default.factory.createPropertyAssignment(typescript_1.default.factory.createIdentifier('foo'), typescript_1.default.factory.createStringLiteral('bar')),
                ], false);
            });
            it('returns null when no property exists', () => {
                const prop = (0, ts_utils_1.objectPropertyAssignmentForKey)(oldObj, 'oops');
                expect(prop).toBeNull();
            });
            it('returns the requested property assignment', () => {
                const prop = (0, ts_utils_1.objectPropertyAssignmentForKey)(oldObj, 'foo');
                expect(print(prop)).toEqual('foo: "bar"');
            });
        });
        describe('updateObjectValueForKey', () => {
            let oldObj;
            const valueAppenderFn = (oldValue) => {
                if (!oldValue)
                    return typescript_1.default.factory.createStringLiteral('baz');
                if (!typescript_1.default.isStringLiteral(oldValue))
                    return oldValue;
                return typescript_1.default.factory.createStringLiteral(oldValue.text + 'baz');
            };
            beforeEach(() => {
                oldObj = typescript_1.default.factory.createObjectLiteralExpression([
                    typescript_1.default.factory.createPropertyAssignment(typescript_1.default.factory.createIdentifier('foo'), typescript_1.default.factory.createStringLiteral('bar')),
                ], false);
            });
            it('creates a non-existent property', () => {
                const obj = (0, ts_utils_1.updateObjectValueForKey)(oldObj, 'newKey', valueAppenderFn);
                expect(print(obj)).toBe('newKey: "baz"');
            });
            it('updates an existing property', () => {
                const obj = (0, ts_utils_1.updateObjectValueForKey)(oldObj, 'foo', valueAppenderFn);
                expect(print(obj)).toBe('foo: "barbaz"');
            });
        });
        it('addElementToArrayLiteral', () => {
            let arr = (0, ts_utils_1.ensureArrayWithIdentifier)('foo', typescript_1.default.factory.createIdentifier('foo'));
            arr = (0, ts_utils_1.addElementToArrayLiteral)(arr, typescript_1.default.factory.createIdentifier('bar'));
            expect(print(arr)).toEqual('[foo, bar]');
        });
        it('ensureArrayWithIdentifier', () => {
            let arr = (0, ts_utils_1.ensureArrayWithIdentifier)('foo', typescript_1.default.factory.createIdentifier('foo'));
            expect(print(arr)).toEqual('[foo]');
            arr = (0, ts_utils_1.ensureArrayWithIdentifier)('bar', typescript_1.default.factory.createIdentifier('bar'), arr);
            expect(print(arr)).toEqual('[foo, bar]');
            arr = (0, ts_utils_1.ensureArrayWithIdentifier)('bar', typescript_1.default.factory.createIdentifier('bar'), arr);
            expect(arr).toEqual(null);
        });
        it('generateImport', () => {
            let imp = (0, ts_utils_1.generateImport)('Foo', null, './foo');
            expect(print(imp)).toEqual(`import { Foo } from "./foo";`);
            imp = (0, ts_utils_1.generateImport)('Foo', 'Bar', './foo');
            expect(print(imp)).toEqual(`import { Bar as Foo } from "./foo";`);
        });
        it('updateImport', () => {
            let imp = (0, ts_utils_1.generateImport)('Foo', null, './foo');
            let namedImp = (0, ts_utils_1.updateImport)(imp, 'Bar', null);
            expect(print(namedImp)).toEqual(`{ Foo, Bar }`);
            namedImp = (0, ts_utils_1.updateImport)(imp, 'Foo_2', 'Foo');
            expect(print(namedImp)).toEqual(`{ Foo, Foo as Foo_2 }`);
            namedImp = (0, ts_utils_1.updateImport)(imp, 'Bar', 'Bar');
            expect(print(namedImp)).toEqual(`{ Foo, Bar }`);
            namedImp = (0, ts_utils_1.updateImport)(imp, 'default', 'Baz');
            expect(print(namedImp)).toEqual(`Baz, { Foo }`);
            imp = (0, ts_utils_1.generateImport)('default', 'Foo', './foo');
            namedImp = (0, ts_utils_1.updateImport)(imp, 'Bar', null);
            expect(print(namedImp)).toEqual(`Foo, { Bar }`);
        });
        it('nonCollidingImportName', () => {
            let imps = [
                (0, ts_utils_1.generateImport)('Foo', null, './foo'),
                (0, ts_utils_1.generateImport)('Bar', 'ExternalBar', './bar'),
            ];
            expect((0, ts_utils_1.nonCollidingImportName)(imps, 'Other')).toEqual('Other');
            expect((0, ts_utils_1.nonCollidingImportName)(imps, 'Foo')).toEqual('Foo_1');
            expect((0, ts_utils_1.nonCollidingImportName)(imps, 'ExternalBar')).toEqual('ExternalBar');
        });
    });
});
