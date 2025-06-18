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
const compiler_1 = require("@angular/compiler");
const typescript_1 = __importDefault(require("typescript"));
const file_system_1 = require("../../file_system");
const testing_1 = require("../../file_system/testing");
const typescript_2 = require("../../util/src/typescript");
const api_1 = require("../api");
const testing_2 = require("../testing");
(0, testing_1.runInEachFileSystem)(() => {
    describe('TemplateTypeChecker.getGlobalCompletions()', () => {
        it('should return a completion point in the TCB for the component context', () => {
            const { completions, program } = setupCompletions(`No special template needed`);
            expect(completions.templateContext.size).toBe(0);
            const { tcbPath, positionInFile } = completions.componentContext;
            const tcbSf = (0, file_system_1.getSourceFileOrError)(program, tcbPath);
            const node = (0, typescript_2.getTokenAtPosition)(tcbSf, positionInFile).parent;
            if (!typescript_1.default.isExpressionStatement(node)) {
                return fail(`Expected a ts.ExpressionStatement`);
            }
            expect(node.expression.getText()).toEqual('this.');
            // The position should be between the '.' and a following space.
            expect(tcbSf.text.slice(positionInFile - 1, positionInFile + 1)).toEqual('. ');
        });
        it('should return additional completions for references and variables when available', () => {
            const template = `
        <div *ngFor="let user of users">
          <div #innerRef></div>
          <div *ngIf="user">
            <div #notInScope></div>
          </div>
        </div>
        <div #topLevelRef></div>
      `;
            const members = `users: string[];`;
            // Embedded view in question is the first node in the template (index 0).
            const { completions } = setupCompletions(template, members, 0);
            expect(new Set(completions.templateContext.keys())).toEqual(new Set(['innerRef', 'user', 'topLevelRef']));
        });
        it('should support shadowing between outer and inner templates', () => {
            const template = `
        <div *ngFor="let user of users">
          Within this template, 'user' should be a variable, not a reference.
        </div>
        <div #user>Out here, 'user' is the reference.</div>
      `;
            const members = `users: string[];`;
            // Completions for the top level.
            const { completions: topLevel } = setupCompletions(template, members);
            // Completions within the embedded view at index 0.
            const { completions: inNgFor } = setupCompletions(template, members, 0);
            expect(topLevel.templateContext.has('user')).toBeTrue();
            const userAtTopLevel = topLevel.templateContext.get('user');
            expect(inNgFor.templateContext.has('user')).toBeTrue();
            const userInNgFor = inNgFor.templateContext.get('user');
            expect(userAtTopLevel.kind).toBe(api_1.CompletionKind.Reference);
            expect(userInNgFor.kind).toBe(api_1.CompletionKind.Variable);
        });
        it('should return completions for let declarations', () => {
            var _a, _b, _c, _d, _e;
            const template = `
        @let one = 1;

        <ng-template>
          @let two = 1 + one;
          {{two}}
        </ng-template>

        @let three = one + 2;
      `;
            const { completions: { templateContext: outerContext }, } = setupCompletions(template);
            expect(Array.from(outerContext.keys())).toEqual(['one', 'three']);
            expect((_a = outerContext.get('one')) === null || _a === void 0 ? void 0 : _a.kind).toBe(api_1.CompletionKind.LetDeclaration);
            expect((_b = outerContext.get('three')) === null || _b === void 0 ? void 0 : _b.kind).toBe(api_1.CompletionKind.LetDeclaration);
            const { completions: { templateContext: innerContext }, } = setupCompletions(template, '', 1);
            expect(Array.from(innerContext.keys())).toEqual(['one', 'three', 'two']);
            expect((_c = innerContext.get('one')) === null || _c === void 0 ? void 0 : _c.kind).toBe(api_1.CompletionKind.LetDeclaration);
            expect((_d = innerContext.get('three')) === null || _d === void 0 ? void 0 : _d.kind).toBe(api_1.CompletionKind.LetDeclaration);
            expect((_e = innerContext.get('two')) === null || _e === void 0 ? void 0 : _e.kind).toBe(api_1.CompletionKind.LetDeclaration);
        });
    });
    describe('TemplateTypeChecker scopes', () => {
        it('should get directives and pipes in scope for a component', () => {
            var _a, _b;
            const MAIN_TS = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_2.setup)([
                {
                    fileName: MAIN_TS,
                    templates: {
                        'SomeCmp': 'Not important',
                    },
                    declarations: [
                        {
                            type: 'directive',
                            file: MAIN_TS,
                            name: 'OtherDir',
                            selector: 'other-dir',
                        },
                        {
                            type: 'pipe',
                            file: MAIN_TS,
                            name: 'OtherPipe',
                            pipeName: 'otherPipe',
                        },
                    ],
                    source: `
            export class SomeCmp {}
            export class OtherDir {}
            export class OtherPipe {}
            export class SomeCmpModule {}
          `,
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, MAIN_TS);
            const SomeCmp = (0, testing_2.getClass)(sf, 'SomeCmp');
            let directives = (_a = templateTypeChecker.getPotentialTemplateDirectives(SomeCmp)) !== null && _a !== void 0 ? _a : [];
            directives = directives.filter((d) => d.isInScope);
            const pipes = (_b = templateTypeChecker.getPotentialPipes(SomeCmp)) !== null && _b !== void 0 ? _b : [];
            expect(directives.map((dir) => dir.selector)).toEqual(['other-dir']);
            expect(pipes.map((pipe) => pipe.name)).toEqual(['otherPipe']);
        });
    });
});
function setupCompletions(template, componentMembers = '', inChildTemplateAtIndex = null, parseOptions) {
    const MAIN_TS = (0, file_system_1.absoluteFrom)('/main.ts');
    const { templateTypeChecker, programStrategy } = (0, testing_2.setup)([
        {
            fileName: MAIN_TS,
            templates: { 'SomeCmp': template },
            source: `export class SomeCmp { ${componentMembers} }`,
        },
    ], { inlining: false, config: { enableTemplateTypeChecker: true }, parseOptions });
    const sf = (0, file_system_1.getSourceFileOrError)(programStrategy.getProgram(), MAIN_TS);
    const SomeCmp = (0, testing_2.getClass)(sf, 'SomeCmp');
    let context = null;
    if (inChildTemplateAtIndex !== null) {
        const tmpl = templateTypeChecker.getTemplate(SomeCmp)[inChildTemplateAtIndex];
        if (!(tmpl instanceof compiler_1.TmplAstTemplate)) {
            throw new Error(`AssertionError: expected TmplAstTemplate at index ${inChildTemplateAtIndex}`);
        }
        context = tmpl;
    }
    const completions = templateTypeChecker.getGlobalCompletions(context, SomeCmp, null);
    expect(completions).toBeDefined();
    return {
        completions,
        program: programStrategy.getProgram(),
        templateTypeChecker,
        component: SomeCmp,
    };
}
