"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_system_1 = require("../../file_system");
const testing_1 = require("../../file_system/testing");
const perf_1 = require("../../perf");
const imports_1 = require("../src/imports");
const util_1 = require("./util");
(0, testing_1.runInEachFileSystem)(() => {
    describe('ImportGraph', () => {
        let _;
        beforeEach(() => (_ = file_system_1.absoluteFrom));
        describe('importsOf()', () => {
            it('should record imports of a simple program', () => {
                const { program, graph } = makeImportGraph('a:b;b:c;c');
                const a = (0, file_system_1.getSourceFileOrError)(program, _('/a.ts'));
                const b = (0, file_system_1.getSourceFileOrError)(program, _('/b.ts'));
                const c = (0, file_system_1.getSourceFileOrError)(program, _('/c.ts'));
                expect(importsToString(graph.importsOf(a))).toBe('b');
                expect(importsToString(graph.importsOf(b))).toBe('c');
            });
        });
        describe('findPath()', () => {
            it('should be able to compute the path between two source files if there is a cycle', () => {
                const { program, graph } = makeImportGraph('a:*b,*c;b:*e,*f;c:*g,*h;e:f;f;g:e;h:g');
                const a = (0, file_system_1.getSourceFileOrError)(program, _('/a.ts'));
                const b = (0, file_system_1.getSourceFileOrError)(program, _('/b.ts'));
                const c = (0, file_system_1.getSourceFileOrError)(program, _('/c.ts'));
                const e = (0, file_system_1.getSourceFileOrError)(program, _('/e.ts'));
                expect((0, util_1.importPath)(graph.findPath(a, a))).toBe('a');
                expect((0, util_1.importPath)(graph.findPath(a, b))).toBe('a,b');
                expect((0, util_1.importPath)(graph.findPath(c, e))).toBe('c,g,e');
                expect(graph.findPath(e, c)).toBe(null);
                expect(graph.findPath(b, c)).toBe(null);
            });
            it('should handle circular dependencies within the path between `from` and `to`', () => {
                // a -> b -> c -> d
                // ^----/    |
                // ^---------/
                const { program, graph } = makeImportGraph('a:b;b:a,c;c:a,d;d');
                const a = (0, file_system_1.getSourceFileOrError)(program, _('/a.ts'));
                const c = (0, file_system_1.getSourceFileOrError)(program, _('/c.ts'));
                const d = (0, file_system_1.getSourceFileOrError)(program, _('/d.ts'));
                expect((0, util_1.importPath)(graph.findPath(a, d))).toBe('a,b,c,d');
            });
        });
    });
    function makeImportGraph(graph) {
        const { program } = (0, util_1.makeProgramFromGraph)((0, file_system_1.getFileSystem)(), graph);
        return {
            program,
            graph: new imports_1.ImportGraph(program.getTypeChecker(), perf_1.NOOP_PERF_RECORDER),
        };
    }
    function importsToString(imports) {
        const fs = (0, file_system_1.getFileSystem)();
        return Array.from(imports)
            .map((sf) => fs.basename(sf.fileName).replace('.ts', ''))
            .sort()
            .join(',');
    }
});
