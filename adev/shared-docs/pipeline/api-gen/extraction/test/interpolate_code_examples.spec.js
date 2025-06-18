"use strict";
/*!
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
const fs_1 = __importDefault(require("fs"));
const interpolate_code_examples_1 = require("../interpolate_code_examples");
const fake_examples_1 = require("./fake-examples");
const tsMdBlock = (code) => '```angular-ts\n' + code + '\n```';
const htmlMdBlock = (code) => '```angular-html\n' + code + '\n```';
const entriesBuilder = (comment) => [
    { jsdocTags: [], rawComment: comment, description: '' },
];
const getComment = (entries) => entries[0].rawComment;
describe('interpolate_code_examples', () => {
    beforeAll(() => {
        spyOn(fs_1.default, 'readFileSync').and.callFake(fake_examples_1.mockReadFileSync);
    });
    it('should interpolate both JSDoc tags comments and raw comment', () => {
        const entries = [
            {
                jsdocTags: [
                    {
                        name: '',
                        comment: `{@example dummy/jsdocs_raw.ts region='class'}`,
                    },
                ],
                rawComment: `{@example dummy/jsdocs_raw.ts region='function'}`,
                description: `{@example dummy/jsdocs_raw.ts region='function'}`,
            },
        ];
        (0, interpolate_code_examples_1.interpolateCodeExamples)(entries);
        const { jsdocTags, rawComment } = entries[0];
        expect(jsdocTags[0].comment).toEqual(tsMdBlock('class Foo {}'));
        expect(rawComment).toEqual(tsMdBlock('function bar() {}'));
    });
    it('should interpolate a single example', () => {
        const entries = entriesBuilder(`Code: {@example dummy/single.ts region='foo'}`);
        (0, interpolate_code_examples_1.interpolateCodeExamples)(entries);
        expect(getComment(entries)).toEqual('Code:' + tsMdBlock("foo('Hello world!');"));
    });
    it('should interpolate multiple examples', () => {
        const entries = entriesBuilder(`First:{@example dummy/multi.ts region='example-1'} Second:{@example dummy/multi.ts region='example-2'}`);
        (0, interpolate_code_examples_1.interpolateCodeExamples)(entries);
        expect(getComment(entries)).toEqual(`First:${tsMdBlock('foo(null);')} Second:${tsMdBlock("type Test = 'a' | 'b';")}`);
    });
    it('should interpolate nested examples', () => {
        const entries = entriesBuilder(`Outer: {@example dummy/nested.ts region='out'} Inner: {@example dummy/nested.ts region='in'}`);
        (0, interpolate_code_examples_1.interpolateCodeExamples)(entries);
        const outer = `function baz() {
  const leet = 1337;
}`;
        expect(getComment(entries)).toEqual(`Outer:${tsMdBlock(outer)} Inner:${tsMdBlock('const leet = 1337;')}`);
    });
    it('should interpolate a single example with multiple regions', () => {
        const entries = entriesBuilder(`Code: {@example dummy/regions.ts region='fn'}`);
        (0, interpolate_code_examples_1.interpolateCodeExamples)(entries);
        expect(getComment(entries)).toEqual('Code:' + tsMdBlock('function baz() {\n}'));
    });
    it('should support examples defined by overlapping regions', () => {
        const entries = entriesBuilder(`1st:{@example dummy/overlap.ts region='1st'} 2nd:{@example dummy/overlap.ts region='2nd'}`);
        (0, interpolate_code_examples_1.interpolateCodeExamples)(entries);
        const first = `import {foo} from 'bar';

class Baz {
  constructor () {}`;
        const second = `class Baz {
  constructor () {}

  example () {}
}`;
        expect(getComment(entries)).toEqual(`1st:${tsMdBlock(first)} 2nd:${tsMdBlock(second)}`);
    });
    it('should support multiple region combinations simultaneously', () => {
        const targetStr = `1: {@example dummy/complex.ts region='ex-1'}
2: {@example dummy/complex.ts region='ex-2'}
3: {@example dummy/complex.ts region='ex-3'}
4: {@example dummy/complex.ts region='ex-4'}
5: {@example dummy/complex.ts region='ex-5'}
6: {@example dummy/complex.ts region='ex-6'}`;
        const entries = entriesBuilder(targetStr);
        (0, interpolate_code_examples_1.interpolateCodeExamples)(entries);
        const output = `1:${tsMdBlock("import {baz} from 'foo';")}
2:${tsMdBlock('function test() {}\nbaz();')}
3:${tsMdBlock(`function test2() {
  const leet = 1337;
}`)}
4:${tsMdBlock('const leet = 1337;')}
5:${tsMdBlock("const A = 'a';\nconst B = 'b';")}
6:${tsMdBlock("const B = 'b';\nconst C = 'c';")}`;
        expect(getComment(entries)).toEqual(output);
    });
    it('should support HTML files', () => {
        const entries = entriesBuilder(`HTML: {@example dummy/index.html region='tags'}`);
        (0, interpolate_code_examples_1.interpolateCodeExamples)(entries);
        expect(getComment(entries)).toEqual(`HTML:${htmlMdBlock('    <i>Foo</i>\n    <p>Baz</p>')}`);
    });
    it('should interpolate an example and remove leading spaces', () => {
        // To generate a valid markdown code block, there should not be any leanding spaces
        const entries = entriesBuilder(`
      Code: 
      
      {@example dummy/single.ts region='foo'}
    `);
        (0, interpolate_code_examples_1.interpolateCodeExamples)(entries);
        expect(getComment(entries)).toMatch(/^\`\`\`/m);
    });
});
