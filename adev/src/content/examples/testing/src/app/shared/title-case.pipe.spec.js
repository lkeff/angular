"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #docplaster
// #docregion
const title_case_pipe_1 = require("./title-case.pipe");
// #docregion excerpt
describe('TitleCasePipe', () => {
    // This pipe is a pure, stateless function so no need for BeforeEach
    const pipe = new title_case_pipe_1.TitleCasePipe();
    it('transforms "abc" to "Abc"', () => {
        expect(pipe.transform('abc')).toBe('Abc');
    });
    it('transforms "abc def" to "Abc Def"', () => {
        expect(pipe.transform('abc def')).toBe('Abc Def');
    });
    // ... more tests ...
    // #enddocregion excerpt
    it('leaves "Abc Def" unchanged', () => {
        expect(pipe.transform('Abc Def')).toBe('Abc Def');
    });
    it('transforms "abc-def" to "Abc-def"', () => {
        expect(pipe.transform('abc-def')).toBe('Abc-def');
    });
    it('transforms "   abc   def" to "   Abc   Def" (preserves spaces) ', () => {
        expect(pipe.transform('   abc   def')).toBe('   Abc   Def');
    });
    // #docregion excerpt
});
// #enddocregion excerpt
