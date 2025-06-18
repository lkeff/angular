"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_system_1 = require("../../file_system");
const testing_1 = require("../../file_system/testing");
const perf_1 = require("../../perf");
const analyzer_1 = require("../src/analyzer");
const imports_1 = require("../src/imports");
const util_1 = require("./util");
(0, testing_1.runInEachFileSystem)(() => {
    describe('cycle analyzer', () => {
        let _;
        beforeEach(() => (_ = file_system_1.absoluteFrom));
        it("should not detect a cycle when there isn't one", () => {
            const { program, analyzer } = makeAnalyzer('a:b,c;b;c');
            const b = (0, file_system_1.getSourceFileOrError)(program, _('/b.ts'));
            const c = (0, file_system_1.getSourceFileOrError)(program, _('/c.ts'));
            expect(analyzer.wouldCreateCycle(b, c)).toBe(null);
            expect(analyzer.wouldCreateCycle(c, b)).toBe(null);
        });
        it('should detect a simple cycle between two files', () => {
            const { program, analyzer } = makeAnalyzer('a:b;b');
            const a = (0, file_system_1.getSourceFileOrError)(program, _('/a.ts'));
            const b = (0, file_system_1.getSourceFileOrError)(program, _('/b.ts'));
            expect(analyzer.wouldCreateCycle(a, b)).toBe(null);
            const cycle = analyzer.wouldCreateCycle(b, a);
            expect(cycle).toBeInstanceOf(analyzer_1.Cycle);
            expect((0, util_1.importPath)(cycle.getPath())).toEqual('b,a,b');
        });
        it('should deal with cycles', () => {
            // a -> b -> c -> d
            //      ^---------/
            const { program, analyzer } = makeAnalyzer('a:b;b:c;c:d;d:b');
            const a = (0, file_system_1.getSourceFileOrError)(program, _('/a.ts'));
            const b = (0, file_system_1.getSourceFileOrError)(program, _('/b.ts'));
            const c = (0, file_system_1.getSourceFileOrError)(program, _('/c.ts'));
            const d = (0, file_system_1.getSourceFileOrError)(program, _('/d.ts'));
            expect(analyzer.wouldCreateCycle(a, b)).toBe(null);
            expect(analyzer.wouldCreateCycle(a, c)).toBe(null);
            expect(analyzer.wouldCreateCycle(a, d)).toBe(null);
            expect(analyzer.wouldCreateCycle(b, a)).not.toBe(null);
            expect(analyzer.wouldCreateCycle(b, c)).not.toBe(null);
            expect(analyzer.wouldCreateCycle(b, d)).not.toBe(null);
        });
        it('should detect a cycle with a re-export in the chain', () => {
            const { program, analyzer } = makeAnalyzer('a:*b;b:c;c');
            const a = (0, file_system_1.getSourceFileOrError)(program, _('/a.ts'));
            const b = (0, file_system_1.getSourceFileOrError)(program, _('/b.ts'));
            const c = (0, file_system_1.getSourceFileOrError)(program, _('/c.ts'));
            expect(analyzer.wouldCreateCycle(a, c)).toBe(null);
            const cycle = analyzer.wouldCreateCycle(c, a);
            expect(cycle).toBeInstanceOf(analyzer_1.Cycle);
            expect((0, util_1.importPath)(cycle.getPath())).toEqual('c,a,b,c');
        });
        it('should detect a cycle in a more complex program', () => {
            const { program, analyzer } = makeAnalyzer('a:*b,*c;b:*e,*f;c:*g,*h;e:f;f:c;g;h:g');
            const b = (0, file_system_1.getSourceFileOrError)(program, _('/b.ts'));
            const c = (0, file_system_1.getSourceFileOrError)(program, _('/c.ts'));
            const e = (0, file_system_1.getSourceFileOrError)(program, _('/e.ts'));
            const f = (0, file_system_1.getSourceFileOrError)(program, _('/f.ts'));
            const g = (0, file_system_1.getSourceFileOrError)(program, _('/g.ts'));
            expect(analyzer.wouldCreateCycle(b, g)).toBe(null);
            const cycle = analyzer.wouldCreateCycle(g, b);
            expect(cycle).toBeInstanceOf(analyzer_1.Cycle);
            expect((0, util_1.importPath)(cycle.getPath())).toEqual('g,b,f,c,g');
        });
        it('should detect a cycle caused by a synthetic edge', () => {
            const { program, analyzer } = makeAnalyzer('a:b,c;b;c');
            const b = (0, file_system_1.getSourceFileOrError)(program, _('/b.ts'));
            const c = (0, file_system_1.getSourceFileOrError)(program, _('/c.ts'));
            expect(analyzer.wouldCreateCycle(b, c)).toBe(null);
            analyzer.recordSyntheticImport(c, b);
            const cycle = analyzer.wouldCreateCycle(b, c);
            expect(cycle).toBeInstanceOf(analyzer_1.Cycle);
            expect((0, util_1.importPath)(cycle.getPath())).toEqual('b,c,b');
        });
        it('should not consider type-only imports', () => {
            const { program, analyzer } = makeAnalyzer('a:b,c!;b;c');
            const a = (0, file_system_1.getSourceFileOrError)(program, _('/a.ts'));
            const b = (0, file_system_1.getSourceFileOrError)(program, _('/b.ts'));
            const c = (0, file_system_1.getSourceFileOrError)(program, _('/c.ts'));
            expect(analyzer.wouldCreateCycle(c, a)).toBe(null);
            const cycle = analyzer.wouldCreateCycle(b, a);
            expect(cycle).toBeInstanceOf(analyzer_1.Cycle);
            expect((0, util_1.importPath)(cycle.getPath())).toEqual('b,a,b');
        });
    });
    function makeAnalyzer(graph) {
        const { program } = (0, util_1.makeProgramFromGraph)((0, file_system_1.getFileSystem)(), graph);
        return {
            program,
            analyzer: new analyzer_1.CycleAnalyzer(new imports_1.ImportGraph(program.getTypeChecker(), perf_1.NOOP_PERF_RECORDER)),
        };
    }
});
