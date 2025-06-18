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
const default_1 = require("../src/default");
(0, testing_1.runInEachFileSystem)(() => {
    describe('DefaultImportTracker', () => {
        let _;
        beforeEach(() => (_ = file_system_1.absoluteFrom));
        it('should prevent a default import from being elided if used', () => {
            const { program, host } = (0, testing_2.makeProgram)([
                { name: _('/dep.ts'), contents: `export default class Foo {}` },
                {
                    name: _('/test.ts'),
                    contents: `import Foo from './dep'; export function test(f: Foo) {}`,
                },
                // This control file is identical to the test file, but will not have its import marked
                // for preservation. It exists to verify that it is in fact the action of
                // DefaultImportTracker and not some other artifact of the test setup which causes the
                // import to be preserved. It will also verify that DefaultImportTracker does not
                // preserve imports which are not marked for preservation.
                {
                    name: _('/ctrl.ts'),
                    contents: `import Foo from './dep'; export function test(f: Foo) {}`,
                },
            ], {
                module: typescript_1.default.ModuleKind.ES2015,
            });
            const fooClause = (0, testing_2.getDeclaration)(program, _('/test.ts'), 'Foo', typescript_1.default.isImportClause);
            const fooDecl = fooClause.parent;
            const tracker = new default_1.DefaultImportTracker();
            tracker.recordUsedImport(fooDecl);
            program.emit(undefined, undefined, undefined, undefined, {
                before: [tracker.importPreservingTransformer()],
            });
            const testContents = host.readFile('/test.js');
            expect(testContents).toContain(`import Foo from './dep';`);
            // The control should have the import elided.
            const ctrlContents = host.readFile('/ctrl.js');
            expect(ctrlContents).not.toContain(`import Foo from './dep';`);
        });
        it('should transpile imports correctly into commonjs', () => {
            const { program, host } = (0, testing_2.makeProgram)([
                { name: _('/dep.ts'), contents: `export default class Foo {}` },
                {
                    name: _('/test.ts'),
                    contents: `import Foo from './dep'; export function test(f: Foo) {}`,
                },
            ], {
                module: typescript_1.default.ModuleKind.CommonJS,
            });
            const fooClause = (0, testing_2.getDeclaration)(program, _('/test.ts'), 'Foo', typescript_1.default.isImportClause);
            const fooId = fooClause.name;
            const fooDecl = fooClause.parent;
            const tracker = new default_1.DefaultImportTracker();
            tracker.recordUsedImport(fooDecl);
            program.emit(undefined, undefined, undefined, undefined, {
                before: [addReferenceTransformer(fooId), tracker.importPreservingTransformer()],
            });
            const testContents = host.readFile('/test.js');
            expect(testContents).toContain(`var dep_1 = require("./dep");`);
            expect(testContents).toContain(`var ref = dep_1.default;`);
        });
        it('should prevent a default import from being elided if used in an isolated transform', () => {
            var _a, _b;
            const { program } = (0, testing_2.makeProgram)([
                { name: _('/dep.ts'), contents: `export default class Foo {}` },
                {
                    name: _('/test.ts'),
                    contents: `import Foo from './dep'; export function test(f: Foo) {}`,
                },
                // This control file is identical to the test file, but will not have its import marked
                // for preservation. It exists to capture the behavior without the DefaultImportTracker's
                // emit modifications.
                {
                    name: _('/ctrl.ts'),
                    contents: `import Foo from './dep'; export function test(f: Foo) {}`,
                },
            ], {
                module: typescript_1.default.ModuleKind.ES2015,
            });
            const fooClause = (0, testing_2.getDeclaration)(program, _('/test.ts'), 'Foo', typescript_1.default.isImportClause);
            const fooDecl = fooClause.parent;
            const tracker = new default_1.DefaultImportTracker();
            tracker.recordUsedImport(fooDecl);
            const result = typescript_1.default.transform([program.getSourceFile(_('/test.ts')), program.getSourceFile(_('/ctrl.ts'))], [tracker.importPreservingTransformer()]);
            expect((_b = (_a = result.diagnostics) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0).toBe(0);
            expect(result.transformed.length).toBe(2);
            const printer = typescript_1.default.createPrinter({ newLine: typescript_1.default.NewLineKind.LineFeed });
            const testOutput = printer.printFile(result.transformed[0]);
            expect(testOutput).toContain(`import Foo from './dep';`);
            // In an isolated transform, TypeScript also retains the default import.
            const ctrlOutput = printer.printFile(result.transformed[1]);
            expect(ctrlOutput).toContain(`import Foo from './dep';`);
        });
    });
    function addReferenceTransformer(id) {
        return (context) => {
            return (sf) => {
                if (id.getSourceFile().fileName === sf.fileName) {
                    return typescript_1.default.factory.updateSourceFile(sf, [
                        ...sf.statements,
                        typescript_1.default.factory.createVariableStatement(undefined, typescript_1.default.factory.createVariableDeclarationList([
                            typescript_1.default.factory.createVariableDeclaration('ref', undefined, undefined, id),
                        ])),
                    ]);
                }
                return sf;
            };
        };
    }
});
