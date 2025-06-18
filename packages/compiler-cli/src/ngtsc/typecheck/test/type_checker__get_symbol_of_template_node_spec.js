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
exports.setup = setup;
const compiler_1 = require("@angular/compiler");
const typescript_1 = __importDefault(require("typescript"));
const file_system_1 = require("../../file_system");
const testing_1 = require("../../file_system/testing");
const api_1 = require("../api");
const testing_2 = require("../testing");
const tcb_util_1 = require("../src/tcb_util");
(0, testing_1.runInEachFileSystem)(() => {
    describe('TemplateTypeChecker.getSymbolOfNode', () => {
        it('should get a symbol for regular attributes', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const templateString = `<div id="helloWorld"></div>`;
            const { templateTypeChecker, program } = setup([
                {
                    fileName,
                    templates: { 'Cmp': templateString },
                    source: `export class Cmp {}`,
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const cmp = (0, testing_2.getClass)(sf, 'Cmp');
            const { attributes } = getAstElements(templateTypeChecker, cmp)[0];
            const symbol = templateTypeChecker.getSymbolOfNode(attributes[0], cmp);
            assertDomBindingSymbol(symbol);
            assertElementSymbol(symbol.host);
        });
        describe('should get a symbol for text attributes corresponding with a directive input', () => {
            let fileName;
            let targets;
            beforeEach(() => {
                fileName = (0, file_system_1.absoluteFrom)('/main.ts');
                const dirFile = (0, file_system_1.absoluteFrom)('/dir.ts');
                const templateString = `<div name="helloWorld"></div>`;
                targets = [
                    {
                        fileName,
                        templates: { 'Cmp': templateString },
                        declarations: [
                            {
                                name: 'NameDiv',
                                selector: 'div[name]',
                                file: dirFile,
                                type: 'directive',
                                inputs: { name: 'name' },
                            },
                        ],
                    },
                    {
                        fileName: dirFile,
                        source: `export class NameDiv {name!: string;}`,
                        templates: {},
                    },
                ];
            });
            it('checkTypeOfAttributes = true', () => {
                const { templateTypeChecker, program } = setup(targets, { checkTypeOfAttributes: true });
                const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
                const cmp = (0, testing_2.getClass)(sf, 'Cmp');
                const { attributes } = getAstElements(templateTypeChecker, cmp)[0];
                const symbol = templateTypeChecker.getSymbolOfNode(attributes[0], cmp);
                assertInputBindingSymbol(symbol);
                expect(symbol.bindings[0].tsSymbol.declarations[0].name.getText()).toEqual('name');
                // Ensure we can go back to the original location using the shim location
                const mapping = templateTypeChecker.getSourceMappingAtTcbLocation(symbol.bindings[0].tcbLocation);
                expect(mapping.span.toString()).toEqual('name');
            });
            it('checkTypeOfAttributes = false', () => {
                const { templateTypeChecker, program } = setup(targets, { checkTypeOfAttributes: false });
                const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
                const cmp = (0, testing_2.getClass)(sf, 'Cmp');
                const { attributes } = getAstElements(templateTypeChecker, cmp)[0];
                const symbol = templateTypeChecker.getSymbolOfNode(attributes[0], cmp);
                assertInputBindingSymbol(symbol);
                expect(symbol.bindings[0].tsSymbol.declarations[0].name.getText()).toEqual('name');
            });
        });
        describe('templates', () => {
            describe('ng-templates', () => {
                let templateTypeChecker;
                let cmp;
                let templateNode;
                let program;
                beforeEach(() => {
                    const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
                    const dirFile = (0, file_system_1.absoluteFrom)('/dir.ts');
                    const templateString = `
              <ng-template dir #ref0 #ref1="dir" let-contextFoo="bar">
                <div [input0]="contextFoo" [input1]="ref0" [input2]="ref1"></div>
              </ng-template>`;
                    const testValues = setup([
                        {
                            fileName,
                            templates: { 'Cmp': templateString },
                            source: `
                    export class Cmp { }`,
                            declarations: [
                                {
                                    name: 'TestDir',
                                    selector: '[dir]',
                                    file: dirFile,
                                    type: 'directive',
                                    exportAs: ['dir'],
                                },
                            ],
                        },
                        {
                            fileName: dirFile,
                            source: `export class TestDir {}`,
                            templates: {},
                        },
                    ]);
                    templateTypeChecker = testValues.templateTypeChecker;
                    program = testValues.program;
                    const sf = (0, file_system_1.getSourceFileOrError)(testValues.program, fileName);
                    cmp = (0, testing_2.getClass)(sf, 'Cmp');
                    templateNode = getAstTemplates(templateTypeChecker, cmp)[0];
                });
                it('should get symbol for variables at the declaration', () => {
                    const symbol = templateTypeChecker.getSymbolOfNode(templateNode.variables[0], cmp);
                    assertVariableSymbol(symbol);
                    expect(program.getTypeChecker().typeToString(symbol.tsType)).toEqual('any');
                    expect(symbol.declaration.name).toEqual('contextFoo');
                });
                it('should get symbol for variables when used', () => {
                    const symbol = templateTypeChecker.getSymbolOfNode(templateNode.children[0].inputs[0].value, cmp);
                    assertVariableSymbol(symbol);
                    expect(program.getTypeChecker().typeToString(symbol.tsType)).toEqual('any');
                    expect(symbol.declaration.name).toEqual('contextFoo');
                    // Ensure we can map the shim locations back to the template
                    const initializerMapping = templateTypeChecker.getSourceMappingAtTcbLocation(symbol.initializerLocation);
                    expect(initializerMapping.span.toString()).toEqual('bar');
                    const localVarMapping = templateTypeChecker.getSourceMappingAtTcbLocation(symbol.localVarLocation);
                    expect(localVarMapping.span.toString()).toEqual('contextFoo');
                });
                it('should get a symbol for local ref which refers to a directive', () => {
                    const symbol = templateTypeChecker.getSymbolOfNode(templateNode.references[1], cmp);
                    assertReferenceSymbol(symbol);
                    expect(program.getTypeChecker().symbolToString(symbol.tsSymbol)).toEqual('TestDir');
                    assertDirectiveReference(symbol);
                });
                it('should get a symbol for usage local ref which refers to a directive', () => {
                    const symbol = templateTypeChecker.getSymbolOfNode(templateNode.children[0].inputs[2].value, cmp);
                    assertReferenceSymbol(symbol);
                    expect(program.getTypeChecker().symbolToString(symbol.tsSymbol)).toEqual('TestDir');
                    assertDirectiveReference(symbol);
                    // Ensure we can map the var shim location back to the template
                    const localVarMapping = templateTypeChecker.getSourceMappingAtTcbLocation(symbol.referenceVarLocation);
                    expect(localVarMapping.span.toString()).toEqual('ref1');
                });
                function assertDirectiveReference(symbol) {
                    expect(program.getTypeChecker().typeToString(symbol.tsType)).toEqual('TestDir');
                    expect(symbol.target.name.getText()).toEqual('TestDir');
                    expect(symbol.declaration.name).toEqual('ref1');
                }
                it('should get a symbol for local ref which refers to the template', () => {
                    const symbol = templateTypeChecker.getSymbolOfNode(templateNode.references[0], cmp);
                    assertReferenceSymbol(symbol);
                    assertTemplateReference(symbol);
                });
                it('should get a symbol for usage local ref which refers to a template', () => {
                    const symbol = templateTypeChecker.getSymbolOfNode(templateNode.children[0].inputs[1].value, cmp);
                    assertReferenceSymbol(symbol);
                    assertTemplateReference(symbol);
                });
                function assertTemplateReference(symbol) {
                    expect(program.getTypeChecker().typeToString(symbol.tsType)).toEqual('TemplateRef<any>');
                    expect(symbol.target.tagName).toEqual('ng-template');
                    expect(symbol.declaration.name).toEqual('ref0');
                }
                it('should get symbol for the template itself', () => {
                    const symbol = templateTypeChecker.getSymbolOfNode(templateNode, cmp);
                    assertTemplateSymbol(symbol);
                    expect(symbol.directives.length).toBe(1);
                    assertDirectiveSymbol(symbol.directives[0]);
                    expect(symbol.directives[0].tsSymbol.getName()).toBe('TestDir');
                });
            });
            describe('structural directives', () => {
                let templateTypeChecker;
                let cmp;
                let templateNode;
                let program;
                beforeEach(() => {
                    const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
                    const dirFile = (0, file_system_1.absoluteFrom)('/dir.ts');
                    const templateString = `
              <div *ngFor="let user of users; let i = index;" dir>
                {{user.name}} {{user.streetNumber}}
                <div [tabIndex]="i"></div>
              </div>`;
                    const testValues = setup([
                        {
                            fileName,
                            templates: { 'Cmp': templateString },
                            source: `
            export interface User {
              name: string;
              streetNumber: number;
            }
            export class Cmp { users: User[]; }
            `,
                            declarations: [
                                (0, testing_2.ngForDeclaration)(),
                                {
                                    name: 'TestDir',
                                    selector: '[dir]',
                                    file: dirFile,
                                    type: 'directive',
                                    inputs: { name: 'name' },
                                },
                            ],
                        },
                        (0, testing_2.ngForTypeCheckTarget)(),
                        {
                            fileName: dirFile,
                            source: `export class TestDir {name:string}`,
                            templates: {},
                        },
                    ]);
                    templateTypeChecker = testValues.templateTypeChecker;
                    program = testValues.program;
                    const sf = (0, file_system_1.getSourceFileOrError)(testValues.program, fileName);
                    cmp = (0, testing_2.getClass)(sf, 'Cmp');
                    templateNode = getAstTemplates(templateTypeChecker, cmp)[0];
                });
                it('should retrieve a symbol for a directive on a microsyntax template', () => {
                    const symbol = templateTypeChecker.getSymbolOfNode(templateNode, cmp);
                    const testDir = symbol === null || symbol === void 0 ? void 0 : symbol.directives.find((dir) => dir.selector === '[dir]');
                    expect(testDir).toBeDefined();
                    expect(program.getTypeChecker().symbolToString(testDir.tsSymbol)).toEqual('TestDir');
                });
                it('should retrieve a symbol for an expression inside structural binding', () => {
                    const ngForOfBinding = templateNode.templateAttrs.find((a) => a.name === 'ngForOf');
                    const symbol = templateTypeChecker.getSymbolOfNode(ngForOfBinding.value, cmp);
                    assertExpressionSymbol(symbol);
                    expect(program.getTypeChecker().symbolToString(symbol.tsSymbol)).toEqual('users');
                    expect(program.getTypeChecker().typeToString(symbol.tsType)).toEqual('Array<User>');
                });
                it('should retrieve a symbol for property reads of implicit variable inside structural binding', () => {
                    const boundText = templateNode.children[0]
                        .children[0];
                    const interpolation = boundText.value.ast;
                    const namePropRead = interpolation.expressions[0];
                    const streetNumberPropRead = interpolation.expressions[1];
                    const nameSymbol = templateTypeChecker.getSymbolOfNode(namePropRead, cmp);
                    assertExpressionSymbol(nameSymbol);
                    expect(program.getTypeChecker().symbolToString(nameSymbol.tsSymbol)).toEqual('name');
                    expect(program.getTypeChecker().typeToString(nameSymbol.tsType)).toEqual('string');
                    const streetSymbol = templateTypeChecker.getSymbolOfNode(streetNumberPropRead, cmp);
                    assertExpressionSymbol(streetSymbol);
                    expect(program.getTypeChecker().symbolToString(streetSymbol.tsSymbol)).toEqual('streetNumber');
                    expect(program.getTypeChecker().typeToString(streetSymbol.tsType)).toEqual('number');
                    const userSymbol = templateTypeChecker.getSymbolOfNode(namePropRead.receiver, cmp);
                    expectUserSymbol(userSymbol);
                });
                it('finds symbols for variables', () => {
                    const userVar = templateNode.variables.find((v) => v.name === 'user');
                    const userSymbol = templateTypeChecker.getSymbolOfNode(userVar, cmp);
                    expectUserSymbol(userSymbol);
                    const iVar = templateNode.variables.find((v) => v.name === 'i');
                    const iSymbol = templateTypeChecker.getSymbolOfNode(iVar, cmp);
                    expectIndexSymbol(iSymbol);
                });
                it('finds symbol when using a template variable', () => {
                    const innerElementNodes = onlyAstElements(templateNode.children[0].children);
                    const indexSymbol = templateTypeChecker.getSymbolOfNode(innerElementNodes[0].inputs[0].value, cmp);
                    expectIndexSymbol(indexSymbol);
                });
                function expectUserSymbol(userSymbol) {
                    assertVariableSymbol(userSymbol);
                    expect(userSymbol.tsSymbol.escapedName).toContain('$implicit');
                    expect(userSymbol.tsSymbol.declarations[0].parent.getText()).toContain('NgForOfContext');
                    expect(program.getTypeChecker().typeToString(userSymbol.tsType)).toEqual('User');
                    expect(userSymbol.declaration).toEqual(templateNode.variables[0]);
                }
                function expectIndexSymbol(indexSymbol) {
                    assertVariableSymbol(indexSymbol);
                    expect(indexSymbol.tsSymbol.escapedName).toContain('index');
                    expect(indexSymbol.tsSymbol.declarations[0].parent.getText()).toContain('NgForOfContext');
                    expect(program.getTypeChecker().typeToString(indexSymbol.tsType)).toEqual('number');
                    expect(indexSymbol.declaration).toEqual(templateNode.variables[1]);
                }
            });
            describe('control flow @if block', () => {
                let templateTypeChecker;
                let cmp;
                let ifBlockNode;
                let program;
                beforeEach(() => {
                    const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
                    const templateString = `
            @if (user; as userAlias) {
              {{userAlias.name}} {{userAlias.streetNumber}}
            }`;
                    const testValues = setup([
                        {
                            fileName,
                            templates: { 'Cmp': templateString },
                            source: `
            export interface User {
              name: string;
              streetNumber: number;
            }
            export class Cmp { user?: User; }
            `,
                        },
                    ]);
                    templateTypeChecker = testValues.templateTypeChecker;
                    program = testValues.program;
                    const sf = (0, file_system_1.getSourceFileOrError)(testValues.program, fileName);
                    cmp = (0, testing_2.getClass)(sf, 'Cmp');
                    ifBlockNode = templateTypeChecker.getTemplate(cmp)[0];
                });
                it('should retrieve a symbol for the loop expression', () => {
                    const symbol = templateTypeChecker.getSymbolOfNode(ifBlockNode.branches[0].expression, cmp);
                    assertExpressionSymbol(symbol);
                    expectUserSymbol(symbol);
                });
                it('should retrieve a symbol for the track expression', () => {
                    const symbol = templateTypeChecker.getSymbolOfNode(ifBlockNode.branches[0].expressionAlias, cmp);
                    assertVariableSymbol(symbol);
                    expectUserSymbol(symbol);
                });
                function expectUserSymbol(userSymbol) {
                    expect(userSymbol.tsSymbol.escapedName).toContain('user');
                    expect(program.getTypeChecker().typeToString(userSymbol.tsType)).toEqual('User | undefined');
                }
            });
            describe('control flow @for block', () => {
                let templateTypeChecker;
                let cmp;
                let forLoopNode;
                let program;
                beforeEach(() => {
                    const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
                    const dirFile = (0, file_system_1.absoluteFrom)('/dir.ts');
                    const templateString = `
            @for (user of users; let i = $index; track user) {
              <div dir>
                {{user.name}} {{user.streetNumber}}
                <div [tabIndex]="i"></div>
              </div>
            }`;
                    const testValues = setup([
                        {
                            fileName,
                            templates: { 'Cmp': templateString },
                            source: `
            export interface User {
              name: string;
              streetNumber: number;
            }
            export class Cmp { users: User[]; }
            `,
                        },
                        {
                            fileName: dirFile,
                            source: `export class TestDir {name:string}`,
                            templates: {},
                        },
                    ]);
                    templateTypeChecker = testValues.templateTypeChecker;
                    program = testValues.program;
                    const sf = (0, file_system_1.getSourceFileOrError)(testValues.program, fileName);
                    cmp = (0, testing_2.getClass)(sf, 'Cmp');
                    forLoopNode = templateTypeChecker.getTemplate(cmp)[0];
                });
                it('should retrieve a symbol for the loop expression', () => {
                    const symbol = templateTypeChecker.getSymbolOfNode(forLoopNode.expression.ast, cmp);
                    assertExpressionSymbol(symbol);
                    expect(program.getTypeChecker().symbolToString(symbol.tsSymbol)).toEqual('users');
                    expect(program.getTypeChecker().typeToString(symbol.tsType)).toEqual('Array<User>');
                });
                it('should retrieve a symbol for the track expression', () => {
                    const userSymbol = templateTypeChecker.getSymbolOfNode(forLoopNode.trackBy.ast, cmp);
                    expectUserSymbol(userSymbol);
                });
                it('should retrieve a symbol for property reads of the loop variable', () => {
                    const boundText = forLoopNode.children[0]
                        .children[0];
                    const interpolation = boundText.value.ast;
                    const namePropRead = interpolation.expressions[0];
                    const streetNumberPropRead = interpolation.expressions[1];
                    const nameSymbol = templateTypeChecker.getSymbolOfNode(namePropRead, cmp);
                    assertExpressionSymbol(nameSymbol);
                    expect(program.getTypeChecker().symbolToString(nameSymbol.tsSymbol)).toEqual('name');
                    expect(program.getTypeChecker().typeToString(nameSymbol.tsType)).toEqual('string');
                    const streetSymbol = templateTypeChecker.getSymbolOfNode(streetNumberPropRead, cmp);
                    assertExpressionSymbol(streetSymbol);
                    expect(program.getTypeChecker().symbolToString(streetSymbol.tsSymbol)).toEqual('streetNumber');
                    expect(program.getTypeChecker().typeToString(streetSymbol.tsType)).toEqual('number');
                    const userSymbol = templateTypeChecker.getSymbolOfNode(namePropRead.receiver, cmp);
                    expectUserSymbol(userSymbol);
                });
                it('finds symbols for loop variable', () => {
                    const userVar = forLoopNode.item;
                    const userSymbol = templateTypeChecker.getSymbolOfNode(userVar, cmp);
                    expectUserSymbol(userSymbol);
                });
                it('finds symbols for $index variable', () => {
                    const iVar = forLoopNode.contextVariables.find((v) => v.name === '$index');
                    const iSymbol = templateTypeChecker.getSymbolOfNode(iVar, cmp);
                    expect(iVar).toBeTruthy();
                    expectIndexSymbol(iSymbol, '$index');
                });
                it('finds symbol when using the index in the body', () => {
                    const innerElementNodes = onlyAstElements(forLoopNode.children[0].children);
                    const indexSymbol = templateTypeChecker.getSymbolOfNode(innerElementNodes[0].inputs[0].value, cmp);
                    expectIndexSymbol(indexSymbol, 'i');
                });
                function expectUserSymbol(userSymbol) {
                    assertVariableSymbol(userSymbol);
                    expect(userSymbol.tsSymbol.escapedName).toContain('User');
                    expect(program.getTypeChecker().typeToString(userSymbol.tsType)).toEqual('User');
                    expect(userSymbol.declaration).toEqual(forLoopNode.item);
                }
                function expectIndexSymbol(indexSymbol, localName) {
                    const indexVar = forLoopNode.contextVariables.find((v) => v.value === '$index' && v.name === localName);
                    assertVariableSymbol(indexSymbol);
                    expect(indexVar).toBeTruthy();
                    expect(indexSymbol.tsSymbol).toBeNull(); // implicit variable doesn't have a TS definition location
                    expect(program.getTypeChecker().typeToString(indexSymbol.tsType)).toEqual('number');
                    expect(indexSymbol.declaration).toEqual(indexVar);
                }
            });
        });
        describe('for expressions', () => {
            it('should get a symbol for a component property used in an input binding', () => {
                const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
                const templateString = `<div [inputA]="helloWorld"></div>`;
                const { templateTypeChecker, program } = setup([
                    {
                        fileName,
                        templates: { 'Cmp': templateString },
                        source: `export class Cmp {helloWorld?: boolean;}`,
                    },
                ]);
                const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
                const cmp = (0, testing_2.getClass)(sf, 'Cmp');
                const nodes = getAstElements(templateTypeChecker, cmp);
                const symbol = templateTypeChecker.getSymbolOfNode(nodes[0].inputs[0].value, cmp);
                assertExpressionSymbol(symbol);
                expect(program.getTypeChecker().symbolToString(symbol.tsSymbol)).toEqual('helloWorld');
                expect(program.getTypeChecker().typeToString(symbol.tsType)).toEqual('false | true | undefined');
            });
            it('should get a symbol for properties several levels deep', () => {
                const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
                const templateString = `<div [inputA]="person.address.street"></div>`;
                const { templateTypeChecker, program } = setup([
                    {
                        fileName,
                        templates: { 'Cmp': templateString },
                        source: `
              interface Address {
                street: string;
              }

              interface Person {
                address: Address;
              }
              export class Cmp {person?: Person;}
            `,
                    },
                ]);
                const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
                const cmp = (0, testing_2.getClass)(sf, 'Cmp');
                const nodes = getAstElements(templateTypeChecker, cmp);
                const inputNode = nodes[0].inputs[0].value;
                const symbol = templateTypeChecker.getSymbolOfNode(inputNode, cmp);
                assertExpressionSymbol(symbol);
                expect(program.getTypeChecker().symbolToString(symbol.tsSymbol)).toEqual('street');
                expect(symbol.tsSymbol.declarations[0].parent.name.getText()).toEqual('Address');
                expect(program.getTypeChecker().typeToString(symbol.tsType)).toEqual('string');
                const personSymbol = templateTypeChecker.getSymbolOfNode(inputNode.ast.receiver.receiver, cmp);
                assertExpressionSymbol(personSymbol);
                expect(program.getTypeChecker().symbolToString(personSymbol.tsSymbol)).toEqual('person');
                expect(program.getTypeChecker().typeToString(personSymbol.tsType)).toEqual('Person | undefined');
            });
            describe('should get symbols for conditionals', () => {
                let templateTypeChecker;
                let cmp;
                let program;
                let templateString;
                beforeEach(() => {
                    const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
                    templateString = `
        <div [inputA]="person?.address?.street"></div>
        <div [inputA]="person ? person.address : noPersonError"></div>
        <div [inputA]="person?.speak()"></div>
        <div [inputA]="person?.cars?.[1].engine"></div>
      `;
                    const testValues = setup([
                        {
                            fileName,
                            templates: { 'Cmp': templateString },
                            source: `
              interface Address {
                street: string;
              }

              interface Car {
                engine: string;
              }

              interface Person {
                address: Address;
                speak(): string;
                cars?: Car[];
              }
              export class Cmp {person?: Person; noPersonError = 'no person'}
            `,
                        },
                    ]);
                    templateTypeChecker = testValues.templateTypeChecker;
                    program = testValues.program;
                    const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
                    cmp = (0, testing_2.getClass)(sf, 'Cmp');
                });
                it('safe property reads', () => {
                    const nodes = getAstElements(templateTypeChecker, cmp);
                    const safePropertyRead = nodes[0].inputs[0].value;
                    const propReadSymbol = templateTypeChecker.getSymbolOfNode(safePropertyRead, cmp);
                    assertExpressionSymbol(propReadSymbol);
                    expect(program.getTypeChecker().symbolToString(propReadSymbol.tsSymbol)).toEqual('street');
                    expect(propReadSymbol.tsSymbol.declarations[0].parent.name.getText()).toEqual('Address');
                    expect(program.getTypeChecker().typeToString(propReadSymbol.tsType)).toEqual('string | undefined');
                });
                it('safe method calls', () => {
                    const nodes = getAstElements(templateTypeChecker, cmp);
                    const safeMethodCall = nodes[2].inputs[0].value;
                    const methodCallSymbol = templateTypeChecker.getSymbolOfNode(safeMethodCall, cmp);
                    assertExpressionSymbol(methodCallSymbol);
                    // Note that the symbol returned is for the return value of the safe method call.
                    expect(methodCallSymbol.tsSymbol).toBeNull();
                    expect(program.getTypeChecker().typeToString(methodCallSymbol.tsType)).toBe('string | undefined');
                });
                it('safe keyed reads', () => {
                    const nodes = getAstElements(templateTypeChecker, cmp);
                    const safeKeyedRead = nodes[3].inputs[0].value;
                    const keyedReadSymbol = templateTypeChecker.getSymbolOfNode(safeKeyedRead, cmp);
                    assertExpressionSymbol(keyedReadSymbol);
                    expect(program.getTypeChecker().symbolToString(keyedReadSymbol.tsSymbol)).toEqual('engine');
                    expect(keyedReadSymbol.tsSymbol.declarations[0].parent.name.getText()).toEqual('Car');
                    expect(program.getTypeChecker().typeToString(keyedReadSymbol.tsType)).toEqual('string');
                });
                it('ternary expressions', () => {
                    const nodes = getAstElements(templateTypeChecker, cmp);
                    const ternary = nodes[1].inputs[0].value.ast;
                    const ternarySymbol = templateTypeChecker.getSymbolOfNode(ternary, cmp);
                    assertExpressionSymbol(ternarySymbol);
                    expect(ternarySymbol.tsSymbol).toBeNull();
                    expect(program.getTypeChecker().typeToString(ternarySymbol.tsType)).toEqual('string | Address');
                    const addrSymbol = templateTypeChecker.getSymbolOfNode(ternary.trueExp, cmp);
                    assertExpressionSymbol(addrSymbol);
                    expect(program.getTypeChecker().symbolToString(addrSymbol.tsSymbol)).toEqual('address');
                    expect(program.getTypeChecker().typeToString(addrSymbol.tsType)).toEqual('Address');
                    const noPersonSymbol = templateTypeChecker.getSymbolOfNode(ternary.falseExp, cmp);
                    assertExpressionSymbol(noPersonSymbol);
                    expect(program.getTypeChecker().symbolToString(noPersonSymbol.tsSymbol)).toEqual('noPersonError');
                    expect(program.getTypeChecker().typeToString(noPersonSymbol.tsType)).toEqual('string');
                });
            });
            it('should get a symbol for function on a component used in an input binding', () => {
                const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
                const templateString = `<div [inputA]="helloWorld" [nestedFunction]="nested.helloWorld1()"></div>`;
                const { templateTypeChecker, program } = setup([
                    {
                        fileName,
                        templates: { 'Cmp': templateString },
                        source: `
            export class Cmp {
              helloWorld() { return ''; }
              nested = { helloWorld1() { return ''; } };
            }`,
                    },
                ]);
                const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
                const cmp = (0, testing_2.getClass)(sf, 'Cmp');
                const nodes = getAstElements(templateTypeChecker, cmp);
                const symbol = templateTypeChecker.getSymbolOfNode(nodes[0].inputs[0].value, cmp);
                assertExpressionSymbol(symbol);
                expect(program.getTypeChecker().symbolToString(symbol.tsSymbol)).toEqual('helloWorld');
                expect(program.getTypeChecker().typeToString(symbol.tsType)).toEqual('() => string');
                const nestedSymbol = templateTypeChecker.getSymbolOfNode(nodes[0].inputs[1].value, cmp);
                assertExpressionSymbol(nestedSymbol);
                expect(program.getTypeChecker().symbolToString(nestedSymbol.tsSymbol)).toEqual('helloWorld1');
                expect(program.getTypeChecker().typeToString(nestedSymbol.tsType)).toEqual('string');
            });
            it('should get a symbol for binary expressions', () => {
                const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
                const templateString = `<div [inputA]="a + b"></div>`;
                const { templateTypeChecker, program } = setup([
                    {
                        fileName,
                        templates: { 'Cmp': templateString },
                        source: `
            export class Cmp {
              a!: string;
              b!: number;
            }`,
                    },
                ]);
                const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
                const cmp = (0, testing_2.getClass)(sf, 'Cmp');
                const nodes = getAstElements(templateTypeChecker, cmp);
                const valueAssignment = nodes[0].inputs[0].value;
                const wholeExprSymbol = templateTypeChecker.getSymbolOfNode(valueAssignment, cmp);
                assertExpressionSymbol(wholeExprSymbol);
                expect(wholeExprSymbol.tsSymbol).toBeNull();
                expect(program.getTypeChecker().typeToString(wholeExprSymbol.tsType)).toEqual('string');
                const aSymbol = templateTypeChecker.getSymbolOfNode(valueAssignment.ast.left, cmp);
                assertExpressionSymbol(aSymbol);
                expect(program.getTypeChecker().symbolToString(aSymbol.tsSymbol)).toBe('a');
                expect(program.getTypeChecker().typeToString(aSymbol.tsType)).toEqual('string');
                const bSymbol = templateTypeChecker.getSymbolOfNode(valueAssignment.ast.right, cmp);
                assertExpressionSymbol(bSymbol);
                expect(program.getTypeChecker().symbolToString(bSymbol.tsSymbol)).toBe('b');
                expect(program.getTypeChecker().typeToString(bSymbol.tsType)).toEqual('number');
            });
            describe('local reference of an Element', () => {
                it('checkTypeOfDomReferences = true', () => {
                    const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
                    const { templateTypeChecker, program } = setup([
                        {
                            fileName,
                            templates: {
                                'Cmp': `
                  <input #myRef>
                  <div [input]="myRef"></div>`,
                            },
                        },
                    ]);
                    const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
                    const cmp = (0, testing_2.getClass)(sf, 'Cmp');
                    const nodes = getAstElements(templateTypeChecker, cmp);
                    const refSymbol = templateTypeChecker.getSymbolOfNode(nodes[0].references[0], cmp);
                    assertReferenceSymbol(refSymbol);
                    expect(refSymbol.target.name).toEqual('input');
                    expect(refSymbol.declaration.name).toEqual('myRef');
                    const myRefUsage = templateTypeChecker.getSymbolOfNode(nodes[1].inputs[0].value, cmp);
                    assertReferenceSymbol(myRefUsage);
                    expect(myRefUsage.target.name).toEqual('input');
                    expect(myRefUsage.declaration.name).toEqual('myRef');
                });
                it('checkTypeOfDomReferences = false', () => {
                    const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
                    const { templateTypeChecker, program } = setup([
                        {
                            fileName,
                            templates: {
                                'Cmp': `
                  <input #myRef>
                  <div [input]="myRef"></div>`,
                            },
                        },
                    ], { checkTypeOfDomReferences: false });
                    const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
                    const cmp = (0, testing_2.getClass)(sf, 'Cmp');
                    const nodes = getAstElements(templateTypeChecker, cmp);
                    const refSymbol = templateTypeChecker.getSymbolOfNode(nodes[0].references[0], cmp);
                    // Our desired behavior here is to honor the user's compiler settings and not produce a
                    // symbol for the reference when `checkTypeOfDomReferences` is false.
                    expect(refSymbol).toBeNull();
                });
            });
            it('should get symbols for references which refer to directives', () => {
                const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
                const dirFile = (0, file_system_1.absoluteFrom)('/dir.ts');
                const templateString = `
        <div dir #myDir1="dir"></div>
        <div dir #myDir2="dir"></div>
        <div [inputA]="myDir1.dirValue" [inputB]="myDir1"></div>
        <div [inputA]="myDir2.dirValue" [inputB]="myDir2"></div>`;
                const { templateTypeChecker, program } = setup([
                    {
                        fileName,
                        templates: { 'Cmp': templateString },
                        declarations: [
                            {
                                name: 'TestDir',
                                selector: '[dir]',
                                file: dirFile,
                                type: 'directive',
                                exportAs: ['dir'],
                            },
                        ],
                    },
                    {
                        fileName: dirFile,
                        source: `export class TestDir { dirValue = 'helloWorld' }`,
                        templates: {},
                    },
                ]);
                const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
                const cmp = (0, testing_2.getClass)(sf, 'Cmp');
                const nodes = getAstElements(templateTypeChecker, cmp);
                const ref1Declaration = templateTypeChecker.getSymbolOfNode(nodes[0].references[0], cmp);
                assertReferenceSymbol(ref1Declaration);
                expect(ref1Declaration.target.name.getText()).toEqual('TestDir');
                expect(ref1Declaration.declaration.name).toEqual('myDir1');
                const ref2Declaration = templateTypeChecker.getSymbolOfNode(nodes[1].references[0], cmp);
                assertReferenceSymbol(ref2Declaration);
                expect(ref2Declaration.target.name.getText()).toEqual('TestDir');
                expect(ref2Declaration.declaration.name).toEqual('myDir2');
                const dirValueSymbol = templateTypeChecker.getSymbolOfNode(nodes[2].inputs[0].value, cmp);
                assertExpressionSymbol(dirValueSymbol);
                expect(program.getTypeChecker().symbolToString(dirValueSymbol.tsSymbol)).toBe('dirValue');
                expect(program.getTypeChecker().typeToString(dirValueSymbol.tsType)).toEqual('string');
                const dir1Symbol = templateTypeChecker.getSymbolOfNode(nodes[2].inputs[1].value, cmp);
                assertReferenceSymbol(dir1Symbol);
                expect(dir1Symbol.target.name.getText()).toEqual('TestDir');
                expect(dir1Symbol.declaration.name).toEqual('myDir1');
                const dir2Symbol = templateTypeChecker.getSymbolOfNode(nodes[3].inputs[1].value, cmp);
                assertReferenceSymbol(dir2Symbol);
                expect(dir2Symbol.target.name.getText()).toEqual('TestDir');
                expect(dir2Symbol.declaration.name).toEqual('myDir2');
            });
            describe('literals', () => {
                let templateTypeChecker;
                let cmp;
                let interpolation;
                let program;
                beforeEach(() => {
                    const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
                    const templateString = `
          {{ [1, 2, 3] }}
          {{ { hello: "world" } }}
          {{ { foo } }}`;
                    const testValues = setup([
                        {
                            fileName,
                            templates: { 'Cmp': templateString },
                            source: `
                type Foo {name: string;}
                export class Cmp {foo: Foo;}
              `,
                        },
                    ]);
                    templateTypeChecker = testValues.templateTypeChecker;
                    program = testValues.program;
                    const sf = (0, file_system_1.getSourceFileOrError)(testValues.program, fileName);
                    cmp = (0, testing_2.getClass)(sf, 'Cmp');
                    interpolation = templateTypeChecker.getTemplate(cmp)[0].value.ast;
                });
                it('literal array', () => {
                    const literalArray = interpolation.expressions[0];
                    const symbol = templateTypeChecker.getSymbolOfNode(literalArray, cmp);
                    assertExpressionSymbol(symbol);
                    expect(program.getTypeChecker().symbolToString(symbol.tsSymbol)).toEqual('Array');
                    expect(program.getTypeChecker().typeToString(symbol.tsType)).toEqual('Array<number>');
                });
                it('literal map', () => {
                    const literalMap = interpolation.expressions[1];
                    const symbol = templateTypeChecker.getSymbolOfNode(literalMap, cmp);
                    assertExpressionSymbol(symbol);
                    expect(program.getTypeChecker().symbolToString(symbol.tsSymbol)).toEqual('__object');
                    expect(program.getTypeChecker().typeToString(symbol.tsType)).toEqual('{ hello: string; }');
                });
                it('literal map shorthand property', () => {
                    const shorthandProp = interpolation.expressions[2]
                        .values[0];
                    const symbol = templateTypeChecker.getSymbolOfNode(shorthandProp, cmp);
                    assertExpressionSymbol(symbol);
                    expect(program.getTypeChecker().symbolToString(symbol.tsSymbol)).toEqual('foo');
                    expect(program.getTypeChecker().typeToString(symbol.tsType)).toEqual('Foo');
                });
            });
            describe('pipes', () => {
                let templateTypeChecker;
                let cmp;
                let binding;
                let program;
                function setupPipesTest(checkTypeOfPipes = true) {
                    const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
                    const templateString = `<div [inputA]="a | test:b:c"></div>`;
                    const testValues = setup([
                        {
                            fileName,
                            templates: { 'Cmp': templateString },
                            source: `
            export class Cmp { a: string; b: number; c: boolean }
            export class TestPipe {
              transform(value: string, repeat: number, commaSeparate: boolean): string[] {
              }
            }
            `,
                            declarations: [
                                {
                                    type: 'pipe',
                                    name: 'TestPipe',
                                    pipeName: 'test',
                                },
                            ],
                        },
                    ], { checkTypeOfPipes });
                    program = testValues.program;
                    templateTypeChecker = testValues.templateTypeChecker;
                    const sf = (0, file_system_1.getSourceFileOrError)(testValues.program, fileName);
                    cmp = (0, testing_2.getClass)(sf, 'Cmp');
                    binding = getAstElements(templateTypeChecker, cmp)[0].inputs[0].value
                        .ast;
                }
                for (const checkTypeOfPipes of [true, false]) {
                    it(`should get symbol for pipe, checkTypeOfPipes: ${checkTypeOfPipes}`, () => {
                        setupPipesTest(checkTypeOfPipes);
                        const pipeSymbol = templateTypeChecker.getSymbolOfNode(binding, cmp);
                        assertPipeSymbol(pipeSymbol);
                        expect(program.getTypeChecker().symbolToString(pipeSymbol.tsSymbol)).toEqual('transform');
                        expect(program.getTypeChecker().symbolToString(pipeSymbol.classSymbol.tsSymbol)).toEqual('TestPipe');
                        expect(program.getTypeChecker().typeToString(pipeSymbol.tsType)).toEqual('(value: string, repeat: number, commaSeparate: boolean) => string[]');
                    });
                }
                it('should get symbols for pipe expression and args', () => {
                    setupPipesTest(false);
                    const aSymbol = templateTypeChecker.getSymbolOfNode(binding.exp, cmp);
                    assertExpressionSymbol(aSymbol);
                    expect(program.getTypeChecker().symbolToString(aSymbol.tsSymbol)).toEqual('a');
                    expect(program.getTypeChecker().typeToString(aSymbol.tsType)).toEqual('string');
                    const bSymbol = templateTypeChecker.getSymbolOfNode(binding.args[0], cmp);
                    assertExpressionSymbol(bSymbol);
                    expect(program.getTypeChecker().symbolToString(bSymbol.tsSymbol)).toEqual('b');
                    expect(program.getTypeChecker().typeToString(bSymbol.tsType)).toEqual('number');
                    const cSymbol = templateTypeChecker.getSymbolOfNode(binding.args[1], cmp);
                    assertExpressionSymbol(cSymbol);
                    expect(program.getTypeChecker().symbolToString(cSymbol.tsSymbol)).toEqual('c');
                    expect(program.getTypeChecker().typeToString(cSymbol.tsType)).toEqual('boolean');
                });
                for (const checkTypeOfPipes of [true, false]) {
                    describe(`checkTypeOfPipes: ${checkTypeOfPipes}`, () => {
                        // Because the args are property reads, we still need information about them.
                        it(`should get symbols for pipe expression and args`, () => {
                            setupPipesTest(checkTypeOfPipes);
                            const aSymbol = templateTypeChecker.getSymbolOfNode(binding.exp, cmp);
                            assertExpressionSymbol(aSymbol);
                            expect(program.getTypeChecker().symbolToString(aSymbol.tsSymbol)).toEqual('a');
                            expect(program.getTypeChecker().typeToString(aSymbol.tsType)).toEqual('string');
                            const bSymbol = templateTypeChecker.getSymbolOfNode(binding.args[0], cmp);
                            assertExpressionSymbol(bSymbol);
                            expect(program.getTypeChecker().symbolToString(bSymbol.tsSymbol)).toEqual('b');
                            expect(program.getTypeChecker().typeToString(bSymbol.tsType)).toEqual('number');
                            const cSymbol = templateTypeChecker.getSymbolOfNode(binding.args[1], cmp);
                            assertExpressionSymbol(cSymbol);
                            expect(program.getTypeChecker().symbolToString(cSymbol.tsSymbol)).toEqual('c');
                            expect(program.getTypeChecker().typeToString(cSymbol.tsType)).toEqual('boolean');
                        });
                    });
                }
            });
            it('should get a symbol for PropertyWrite expressions', () => {
                const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
                const { templateTypeChecker, program } = setup([
                    {
                        fileName,
                        templates: { 'Cmp': '<div (output)="lastEvent = $event"></div>' },
                        source: `export class Cmp { lastEvent: any; }`,
                    },
                ]);
                const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
                const cmp = (0, testing_2.getClass)(sf, 'Cmp');
                const node = getAstElements(templateTypeChecker, cmp)[0];
                const writeSymbol = templateTypeChecker.getSymbolOfNode(node.outputs[0].handler, cmp);
                assertExpressionSymbol(writeSymbol);
                // Note that the symbol returned is for the RHS of the PropertyWrite. The AST
                // does not support specific designation for the RHS so we assume that's what
                // is wanted in this case. We don't support retrieving a symbol for the whole
                // expression and if you want to get a symbol for the '$event', you can
                // use the `value` AST of the `PropertyWrite`.
                expect(program.getTypeChecker().symbolToString(writeSymbol.tsSymbol)).toEqual('lastEvent');
                expect(program.getTypeChecker().typeToString(writeSymbol.tsType)).toEqual('any');
            });
            it('should get a symbol for Call expressions', () => {
                var _a, _b;
                const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
                const { templateTypeChecker, program } = setup([
                    {
                        fileName,
                        templates: {
                            'Cmp': '<div [input]="toString(123)" [nestedFunction]="nested.toString(123)"></div>',
                        },
                        source: `
              export class Cmp {
                toString(v: any): string { return String(v); }
                nested = { toString(v: any): string { return String(v); } };
              }
            `,
                    },
                ]);
                const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
                const cmp = (0, testing_2.getClass)(sf, 'Cmp');
                const node = getAstElements(templateTypeChecker, cmp)[0];
                const callSymbol = templateTypeChecker.getSymbolOfNode(node.inputs[0].value, cmp);
                assertExpressionSymbol(callSymbol);
                // Note that the symbol returned is for the return value of the Call.
                expect(callSymbol.tsSymbol).toBeTruthy();
                expect((_a = callSymbol.tsSymbol) === null || _a === void 0 ? void 0 : _a.getName()).toEqual('toString');
                expect(program.getTypeChecker().typeToString(callSymbol.tsType)).toBe('string');
                const nestedCallSymbol = templateTypeChecker.getSymbolOfNode(node.inputs[1].value, cmp);
                assertExpressionSymbol(nestedCallSymbol);
                // Note that the symbol returned is for the return value of the Call.
                expect(nestedCallSymbol.tsSymbol).toBeTruthy();
                expect((_b = nestedCallSymbol.tsSymbol) === null || _b === void 0 ? void 0 : _b.getName()).toEqual('toString');
                expect(program.getTypeChecker().typeToString(nestedCallSymbol.tsType)).toBe('string');
            });
            it('should get a symbol for SafeCall expressions', () => {
                const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
                const { templateTypeChecker, program } = setup([
                    {
                        fileName,
                        templates: { 'Cmp': '<div [input]="toString?.(123)"></div>' },
                        source: `export class Cmp { toString?: (value: number) => string; }`,
                    },
                ]);
                const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
                const cmp = (0, testing_2.getClass)(sf, 'Cmp');
                const node = getAstElements(templateTypeChecker, cmp)[0];
                const safeCallSymbol = templateTypeChecker.getSymbolOfNode(node.inputs[0].value, cmp);
                assertExpressionSymbol(safeCallSymbol);
                // Note that the symbol returned is for the return value of the SafeCall.
                expect(safeCallSymbol.tsSymbol).toBeNull();
                expect(program.getTypeChecker().typeToString(safeCallSymbol.tsType)).toBe('string | undefined');
            });
        });
        describe('input bindings', () => {
            it('can get a symbol for empty binding', () => {
                const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
                const dirFile = (0, file_system_1.absoluteFrom)('/dir.ts');
                const { program, templateTypeChecker } = setup([
                    {
                        fileName,
                        templates: { 'Cmp': `<div dir [inputA]=""></div>` },
                        declarations: [
                            {
                                name: 'TestDir',
                                selector: '[dir]',
                                file: dirFile,
                                type: 'directive',
                                inputs: { inputA: 'inputA' },
                            },
                        ],
                    },
                    {
                        fileName: dirFile,
                        source: `export class TestDir {inputA?: string; }`,
                        templates: {},
                    },
                ]);
                const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
                const cmp = (0, testing_2.getClass)(sf, 'Cmp');
                const nodes = templateTypeChecker.getTemplate(cmp);
                const inputAbinding = nodes[0].inputs[0];
                const aSymbol = templateTypeChecker.getSymbolOfNode(inputAbinding, cmp);
                assertInputBindingSymbol(aSymbol);
                expect(aSymbol.bindings[0].tsSymbol.declarations[0].name.getText()).toEqual('inputA');
            });
            it('can retrieve a symbol for an input binding', () => {
                const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
                const dirFile = (0, file_system_1.absoluteFrom)('/dir.ts');
                const templateString = `<div dir [inputA]="'my input A'" [inputBRenamed]="'my inputB'"></div>`;
                const { program, templateTypeChecker } = setup([
                    {
                        fileName,
                        templates: { 'Cmp': templateString },
                        declarations: [
                            {
                                name: 'TestDir',
                                selector: '[dir]',
                                file: dirFile,
                                type: 'directive',
                                inputs: { inputA: 'inputA', inputB: 'inputBRenamed' },
                            },
                        ],
                    },
                    {
                        fileName: dirFile,
                        source: `export class TestDir {inputA!: string; inputB!: string}`,
                        templates: {},
                    },
                ]);
                const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
                const cmp = (0, testing_2.getClass)(sf, 'Cmp');
                const nodes = templateTypeChecker.getTemplate(cmp);
                const inputAbinding = nodes[0].inputs[0];
                const aSymbol = templateTypeChecker.getSymbolOfNode(inputAbinding, cmp);
                assertInputBindingSymbol(aSymbol);
                expect(aSymbol.bindings[0].tsSymbol.declarations[0].name.getText()).toEqual('inputA');
                const inputBbinding = nodes[0].inputs[1];
                const bSymbol = templateTypeChecker.getSymbolOfNode(inputBbinding, cmp);
                assertInputBindingSymbol(bSymbol);
                expect(bSymbol.bindings[0].tsSymbol.declarations[0].name.getText()).toEqual('inputB');
            });
            it('can retrieve a symbol for a signal-input binding', () => {
                const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
                const dirFile = (0, file_system_1.absoluteFrom)('/dir.ts');
                const templateString = `<div dir [inputA]="'my input A'" [aliased]="'my inputB'"></div>`;
                const { program, templateTypeChecker } = setup([
                    {
                        fileName,
                        templates: { 'Cmp': templateString },
                        declarations: [
                            {
                                name: 'TestDir',
                                selector: '[dir]',
                                file: dirFile,
                                type: 'directive',
                                inputs: {
                                    inputA: {
                                        bindingPropertyName: 'inputA',
                                        isSignal: true,
                                        classPropertyName: 'inputA',
                                        required: false,
                                        transform: null,
                                    },
                                    inputB: {
                                        bindingPropertyName: 'aliased',
                                        isSignal: true,
                                        classPropertyName: 'inputB',
                                        required: true,
                                        transform: null,
                                    },
                                },
                            },
                        ],
                    },
                    {
                        fileName: dirFile,
                        source: `
              import {InputSignal} from '@angular/core';

              export class TestDir {
                inputA: InputSignal<string> = null!;
                inputB: InputSignal<string> = null!;
              }`,
                        templates: {},
                    },
                ]);
                const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
                const cmp = (0, testing_2.getClass)(sf, 'Cmp');
                const nodes = templateTypeChecker.getTemplate(cmp);
                const inputAbinding = nodes[0].inputs[0];
                const aSymbol = templateTypeChecker.getSymbolOfNode(inputAbinding, cmp);
                assertInputBindingSymbol(aSymbol);
                expect(aSymbol.bindings[0].tsSymbol.declarations[0].name.getText()).toEqual('inputA');
                const inputBbinding = nodes[0].inputs[1];
                const bSymbol = templateTypeChecker.getSymbolOfNode(inputBbinding, cmp);
                assertInputBindingSymbol(bSymbol);
                expect(bSymbol.bindings[0].tsSymbol.declarations[0].name.getText()).toEqual('inputB');
            });
            // Note that `honorAccessModifiersForInputBindings` is `false` even with `--strictTemplates`,
            // so this captures a potential common scenario, assuming the input is restricted.
            it('should not throw when retrieving a symbol for a signal-input with restricted access', () => {
                const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
                const dirFile = (0, file_system_1.absoluteFrom)('/dir.ts');
                const templateString = `
          @if (true) {
            <div dir [inputA]="'ok'"></div>
          }
        `;
                const { program, templateTypeChecker } = setup([
                    {
                        fileName,
                        templates: { 'Cmp': templateString },
                        declarations: [
                            {
                                name: 'TestDir',
                                selector: '[dir]',
                                file: dirFile,
                                type: 'directive',
                                restrictedInputFields: ['inputA'],
                                inputs: {
                                    inputA: {
                                        bindingPropertyName: 'inputA',
                                        isSignal: true,
                                        classPropertyName: 'inputA',
                                        required: false,
                                        transform: null,
                                    },
                                },
                            },
                        ],
                    },
                    {
                        fileName: dirFile,
                        source: `
                import {InputSignal} from '@angular/core';

                export class TestDir {
                  protected inputA: InputSignal<string> = null!;
                }
              `,
                        templates: {},
                    },
                ], { honorAccessModifiersForInputBindings: false });
                const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
                const cmp = (0, testing_2.getClass)(sf, 'Cmp');
                const nodes = templateTypeChecker.getTemplate(cmp);
                const ifNode = nodes[0];
                const ifBranchNode = ifNode.branches[0];
                const testElement = ifBranchNode.children[0];
                const inputAbinding = testElement.inputs[0];
                const aSymbol = templateTypeChecker.getSymbolOfNode(inputAbinding, cmp);
                expect(aSymbol)
                    .withContext('Symbol builder does not return symbols for restricted inputs with ' +
                    '`honorAccessModifiersForInputBindings = false` (same for decorator inputs)')
                    .toBe(null);
            });
            it('does not retrieve a symbol for an input when undeclared', () => {
                const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
                const dirFile = (0, file_system_1.absoluteFrom)('/dir.ts');
                const templateString = `<div dir [inputA]="'my input A'"></div>`;
                const { program, templateTypeChecker } = setup([
                    {
                        fileName,
                        templates: { 'Cmp': templateString },
                        declarations: [
                            {
                                name: 'TestDir',
                                selector: '[dir]',
                                file: dirFile,
                                type: 'directive',
                                inputs: { inputA: 'inputA' },
                            },
                        ],
                    },
                    {
                        fileName: dirFile,
                        source: `export class TestDir {}`,
                        templates: {},
                    },
                ]);
                const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
                const cmp = (0, testing_2.getClass)(sf, 'Cmp');
                const nodes = templateTypeChecker.getTemplate(cmp);
                const inputAbinding = nodes[0].inputs[0];
                const aSymbol = templateTypeChecker.getSymbolOfNode(inputAbinding, cmp);
                expect(aSymbol).toBeNull();
            });
            it('can retrieve a symbol for an input of structural directive', () => {
                const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
                const templateString = `<div *ngFor="let user of users"></div>`;
                const { program, templateTypeChecker } = setup([
                    { fileName, templates: { 'Cmp': templateString }, declarations: [(0, testing_2.ngForDeclaration)()] },
                    (0, testing_2.ngForTypeCheckTarget)(),
                ]);
                const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
                const cmp = (0, testing_2.getClass)(sf, 'Cmp');
                const nodes = templateTypeChecker.getTemplate(cmp);
                const ngForOfBinding = nodes[0].templateAttrs.find((a) => a.name === 'ngForOf');
                const symbol = templateTypeChecker.getSymbolOfNode(ngForOfBinding, cmp);
                assertInputBindingSymbol(symbol);
                expect(symbol.bindings[0].tsSymbol.declarations[0].name.getText()).toEqual('ngForOf');
            });
            it('returns dom binding input binds only to the dom element', () => {
                const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
                const templateString = `<div [name]="'my input'"></div>`;
                const { program, templateTypeChecker } = setup([
                    { fileName, templates: { 'Cmp': templateString }, declarations: [] },
                ]);
                const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
                const cmp = (0, testing_2.getClass)(sf, 'Cmp');
                const nodes = templateTypeChecker.getTemplate(cmp);
                const binding = nodes[0].inputs[0];
                const symbol = templateTypeChecker.getSymbolOfNode(binding, cmp);
                assertDomBindingSymbol(symbol);
                assertElementSymbol(symbol.host);
            });
            it('returns dom binding when directive members do not match the input', () => {
                const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
                const dirFile = (0, file_system_1.absoluteFrom)('/dir.ts');
                const templateString = `<div dir [inputA]="'my input A'"></div>`;
                const { program, templateTypeChecker } = setup([
                    {
                        fileName,
                        templates: { 'Cmp': templateString },
                        declarations: [
                            {
                                name: 'TestDir',
                                selector: '[dir]',
                                file: dirFile,
                                type: 'directive',
                                inputs: {},
                            },
                        ],
                    },
                    {
                        fileName: dirFile,
                        source: `export class TestDir {}`,
                        templates: {},
                    },
                ]);
                const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
                const cmp = (0, testing_2.getClass)(sf, 'Cmp');
                const nodes = templateTypeChecker.getTemplate(cmp);
                const inputAbinding = nodes[0].inputs[0];
                const symbol = templateTypeChecker.getSymbolOfNode(inputAbinding, cmp);
                assertDomBindingSymbol(symbol);
                assertElementSymbol(symbol.host);
            });
            it('can match binding when there are two directives', () => {
                var _a;
                const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
                const dirFile = (0, file_system_1.absoluteFrom)('/dir.ts');
                const templateString = `<div dir otherDir [inputA]="'my input A'"></div>`;
                const { program, templateTypeChecker } = setup([
                    {
                        fileName,
                        templates: { 'Cmp': templateString },
                        declarations: [
                            {
                                name: 'TestDir',
                                selector: '[dir]',
                                file: dirFile,
                                type: 'directive',
                                inputs: { inputA: 'inputA' },
                            },
                            {
                                name: 'OtherDir',
                                selector: '[otherDir]',
                                file: dirFile,
                                type: 'directive',
                                inputs: {},
                            },
                        ],
                    },
                    {
                        fileName: dirFile,
                        source: `
              export class TestDir {inputA!: string;}
              export class OtherDir {}
              `,
                        templates: {},
                    },
                ]);
                const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
                const cmp = (0, testing_2.getClass)(sf, 'Cmp');
                const nodes = templateTypeChecker.getTemplate(cmp);
                const inputAbinding = nodes[0].inputs[0];
                const symbol = templateTypeChecker.getSymbolOfNode(inputAbinding, cmp);
                assertInputBindingSymbol(symbol);
                expect(symbol.bindings[0].tsSymbol.declarations[0].name.getText()).toEqual('inputA');
                expect((_a = symbol.bindings[0].tsSymbol.declarations[0].parent.name) === null || _a === void 0 ? void 0 : _a.text).toEqual('TestDir');
            });
            it('returns the first field match when directive maps same input to two fields', () => {
                var _a;
                const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
                const dirFile = (0, file_system_1.absoluteFrom)('/dir.ts');
                const { program, templateTypeChecker } = setup([
                    {
                        fileName,
                        templates: { 'Cmp': `<div dir [inputA]="'my input A'"></div>` },
                        declarations: [
                            {
                                name: 'TestDir',
                                selector: '[dir]',
                                file: dirFile,
                                type: 'directive',
                                inputs: { inputA: 'inputA', otherInputA: 'inputA' },
                            },
                        ],
                    },
                    {
                        fileName: dirFile,
                        source: `
              export class TestDir {inputA!: string; otherInputA!: string;}
              `,
                        templates: {},
                    },
                ]);
                const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
                const cmp = (0, testing_2.getClass)(sf, 'Cmp');
                const nodes = templateTypeChecker.getTemplate(cmp);
                const inputAbinding = nodes[0].inputs[0];
                const symbol = templateTypeChecker.getSymbolOfNode(inputAbinding, cmp);
                assertInputBindingSymbol(symbol);
                expect(symbol.bindings[0].tsSymbol.declarations[0].name.getText()).toEqual('otherInputA');
                expect((_a = symbol.bindings[0].tsSymbol.declarations[0].parent.name) === null || _a === void 0 ? void 0 : _a.text).toEqual('TestDir');
            });
            it('returns the all inputs when two directives have the same input', () => {
                const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
                const dirFile = (0, file_system_1.absoluteFrom)('/dir.ts');
                const templateString = `<div dir otherDir [inputA]="'my input A'"></div>`;
                const { program, templateTypeChecker } = setup([
                    {
                        fileName,
                        templates: { 'Cmp': templateString },
                        declarations: [
                            {
                                name: 'TestDir',
                                selector: '[dir]',
                                file: dirFile,
                                type: 'directive',
                                inputs: { inputA: 'inputA' },
                            },
                            {
                                name: 'OtherDir',
                                selector: '[otherDir]',
                                file: dirFile,
                                type: 'directive',
                                inputs: { otherDirInputA: 'inputA' },
                            },
                        ],
                    },
                    {
                        fileName: dirFile,
                        source: `
              export class TestDir {inputA!: string;}
              export class OtherDir {otherDirInputA!: string;}
              `,
                        templates: {},
                    },
                ]);
                const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
                const cmp = (0, testing_2.getClass)(sf, 'Cmp');
                const nodes = templateTypeChecker.getTemplate(cmp);
                const inputAbinding = nodes[0].inputs[0];
                const symbol = templateTypeChecker.getSymbolOfNode(inputAbinding, cmp);
                assertInputBindingSymbol(symbol);
                expect(new Set(symbol.bindings.map((b) => b.tsSymbol.declarations[0].name.getText()))).toEqual(new Set(['inputA', 'otherDirInputA']));
                expect(new Set(symbol.bindings.map((b) => { var _a; return (_a = b.tsSymbol.declarations[0].parent.name) === null || _a === void 0 ? void 0 : _a.text; }))).toEqual(new Set(['TestDir', 'OtherDir']));
            });
        });
        describe('output bindings', () => {
            it('should find symbol for output binding', () => {
                const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
                const dirFile = (0, file_system_1.absoluteFrom)('/dir.ts');
                const templateString = `<div dir (outputA)="handle($event)" (renamedOutputB)="handle($event)"></div>`;
                const { program, templateTypeChecker } = setup([
                    {
                        fileName,
                        templates: { 'Cmp': templateString },
                        declarations: [
                            {
                                name: 'TestDir',
                                selector: '[dir]',
                                file: dirFile,
                                type: 'directive',
                                outputs: { outputA: 'outputA', outputB: 'renamedOutputB' },
                            },
                        ],
                    },
                    {
                        fileName: dirFile,
                        source: `
              export class TestDir {outputA!: EventEmitter<string>; outputB!: EventEmitter<string>}
              `,
                        templates: {},
                    },
                ]);
                const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
                const cmp = (0, testing_2.getClass)(sf, 'Cmp');
                const nodes = templateTypeChecker.getTemplate(cmp);
                const outputABinding = nodes[0].outputs[0];
                const aSymbol = templateTypeChecker.getSymbolOfNode(outputABinding, cmp);
                assertOutputBindingSymbol(aSymbol);
                expect(aSymbol.bindings[0].tsSymbol.declarations[0].name.getText()).toEqual('outputA');
                const outputBBinding = nodes[0].outputs[1];
                const bSymbol = templateTypeChecker.getSymbolOfNode(outputBBinding, cmp);
                assertOutputBindingSymbol(bSymbol);
                expect(bSymbol.bindings[0].tsSymbol.declarations[0].name.getText()).toEqual('outputB');
            });
            it('should find symbol for output binding when there are multiple directives', () => {
                var _a;
                const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
                const dirFile = (0, file_system_1.absoluteFrom)('/dir.ts');
                const { program, templateTypeChecker } = setup([
                    {
                        fileName,
                        templates: { 'Cmp': `<div dir otherdir (outputA)="handle($event)"></div>` },
                        declarations: [
                            {
                                name: 'TestDir',
                                selector: '[dir]',
                                file: dirFile,
                                type: 'directive',
                                outputs: { outputA: 'outputA' },
                            },
                            {
                                name: 'OtherDir',
                                selector: '[otherdir]',
                                file: dirFile,
                                type: 'directive',
                                outputs: { unusedOutput: 'unusedOutput' },
                            },
                        ],
                    },
                    {
                        fileName: dirFile,
                        source: `
              export class TestDir {outputA!: EventEmitter<string>;}
              export class OtherDir {unusedOutput!: EventEmitter<string>;}
              `,
                        templates: {},
                    },
                ]);
                const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
                const cmp = (0, testing_2.getClass)(sf, 'Cmp');
                const nodes = templateTypeChecker.getTemplate(cmp);
                const outputABinding = nodes[0].outputs[0];
                const symbol = templateTypeChecker.getSymbolOfNode(outputABinding, cmp);
                assertOutputBindingSymbol(symbol);
                expect(symbol.bindings[0].tsSymbol.declarations[0].name.getText()).toEqual('outputA');
                expect((_a = symbol.bindings[0].tsSymbol.declarations[0].parent.name) === null || _a === void 0 ? void 0 : _a.text).toEqual('TestDir');
            });
            it('returns addEventListener binding to native element when no match to any directive output', () => {
                const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
                const { program, templateTypeChecker } = setup([
                    {
                        fileName,
                        templates: { 'Cmp': `<div (click)="handle($event)"></div>` },
                    },
                ]);
                const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
                const cmp = (0, testing_2.getClass)(sf, 'Cmp');
                const nodes = templateTypeChecker.getTemplate(cmp);
                const outputABinding = nodes[0].outputs[0];
                const symbol = templateTypeChecker.getSymbolOfNode(outputABinding, cmp);
                assertOutputBindingSymbol(symbol);
                expect(program.getTypeChecker().symbolToString(symbol.bindings[0].tsSymbol)).toEqual('addEventListener');
                const eventSymbol = templateTypeChecker.getSymbolOfNode(outputABinding.handler, cmp);
                assertExpressionSymbol(eventSymbol);
            });
            it('still returns binding when checkTypeOfOutputEvents is false', () => {
                var _a;
                const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
                const dirFile = (0, file_system_1.absoluteFrom)('/dir.ts');
                const { program, templateTypeChecker } = setup([
                    {
                        fileName,
                        templates: { 'Cmp': `<div dir (outputA)="handle($event)"></div>` },
                        declarations: [
                            {
                                name: 'TestDir',
                                selector: '[dir]',
                                file: dirFile,
                                type: 'directive',
                                outputs: { outputA: 'outputA' },
                            },
                        ],
                    },
                    {
                        fileName: dirFile,
                        source: `export class TestDir {outputA!: EventEmitter<string>;}`,
                        templates: {},
                    },
                ], { checkTypeOfOutputEvents: false });
                const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
                const cmp = (0, testing_2.getClass)(sf, 'Cmp');
                const nodes = templateTypeChecker.getTemplate(cmp);
                const outputABinding = nodes[0].outputs[0];
                const symbol = templateTypeChecker.getSymbolOfNode(outputABinding, cmp);
                assertOutputBindingSymbol(symbol);
                expect(symbol.bindings[0].tsSymbol.declarations[0].name.getText()).toEqual('outputA');
                expect((_a = symbol.bindings[0].tsSymbol.declarations[0].parent.name) === null || _a === void 0 ? void 0 : _a.text).toEqual('TestDir');
            });
            it('returns output symbol for two way binding', () => {
                var _a;
                const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
                const dirFile = (0, file_system_1.absoluteFrom)('/dir.ts');
                const { program, templateTypeChecker } = setup([
                    {
                        fileName,
                        templates: { 'Cmp': `<div dir [(ngModel)]="value"></div>` },
                        source: `
                export class Cmp {
                  value = '';
                }`,
                        declarations: [
                            {
                                name: 'TestDir',
                                selector: '[dir]',
                                file: dirFile,
                                type: 'directive',
                                inputs: { ngModel: 'ngModel' },
                                outputs: { ngModelChange: 'ngModelChange' },
                            },
                        ],
                    },
                    {
                        fileName: dirFile,
                        source: `
                export class TestDir {
                  ngModel!: string;
                  ngModelChange!: EventEmitter<string>;
                }`,
                        templates: {},
                    },
                ]);
                const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
                const cmp = (0, testing_2.getClass)(sf, 'Cmp');
                const nodes = templateTypeChecker.getTemplate(cmp);
                const outputABinding = nodes[0].outputs[0];
                const symbol = templateTypeChecker.getSymbolOfNode(outputABinding, cmp);
                assertOutputBindingSymbol(symbol);
                expect(symbol.bindings[0].tsSymbol.declarations[0].name.getText()).toEqual('ngModelChange');
                expect((_a = symbol.bindings[0].tsSymbol.declarations[0].parent.name) === null || _a === void 0 ? void 0 : _a.text).toEqual('TestDir');
            });
        });
        describe('for elements', () => {
            it('for elements that are components with no inputs', () => {
                const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
                const dirFile = (0, file_system_1.absoluteFrom)('/dir.ts');
                const { program, templateTypeChecker } = setup([
                    {
                        fileName,
                        templates: { 'Cmp': `<child-component></child-component>` },
                        declarations: [
                            {
                                name: 'ChildComponent',
                                selector: 'child-component',
                                isComponent: true,
                                file: dirFile,
                                type: 'directive',
                            },
                        ],
                    },
                    {
                        fileName: dirFile,
                        source: `
              export class ChildComponent {}
            `,
                        templates: { 'ChildComponent': '' },
                    },
                ]);
                const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
                const cmp = (0, testing_2.getClass)(sf, 'Cmp');
                const nodes = templateTypeChecker.getTemplate(cmp);
                const symbol = templateTypeChecker.getSymbolOfNode(nodes[0], cmp);
                assertElementSymbol(symbol);
                expect(symbol.directives.length).toBe(1);
                assertDirectiveSymbol(symbol.directives[0]);
                expect(program.getTypeChecker().typeToString(symbol.directives[0].tsType)).toEqual('ChildComponent');
                expect(symbol.directives[0].isComponent).toBe(true);
            });
            it('element with directive matches', () => {
                const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
                const dirFile = (0, file_system_1.absoluteFrom)('/dir.ts');
                const { program, templateTypeChecker } = setup([
                    {
                        fileName,
                        templates: { 'Cmp': `<div dir dir2></div>` },
                        declarations: [
                            {
                                name: 'TestDir',
                                selector: '[dir]',
                                file: dirFile,
                                type: 'directive',
                            },
                            {
                                name: 'TestDir2',
                                selector: '[dir2]',
                                file: dirFile,
                                type: 'directive',
                            },
                            {
                                name: 'TestDirAllDivs',
                                selector: 'div',
                                file: dirFile,
                                type: 'directive',
                            },
                        ],
                    },
                    {
                        fileName: dirFile,
                        source: `
              export class TestDir {}
              // Allow the fake ComponentScopeReader to return a module for TestDir
              export class TestDirModule {}
              export class TestDir2 {}
              // Allow the fake ComponentScopeReader to return a module for TestDir2
              export class TestDir2Module {}
              export class TestDirAllDivs {}
            `,
                        templates: {},
                    },
                ]);
                const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
                const cmp = (0, testing_2.getClass)(sf, 'Cmp');
                const nodes = templateTypeChecker.getTemplate(cmp);
                const symbol = templateTypeChecker.getSymbolOfNode(nodes[0], cmp);
                assertElementSymbol(symbol);
                expect(symbol.directives.length).toBe(3);
                const expectedDirectives = ['TestDir', 'TestDir2', 'TestDirAllDivs'].sort();
                const actualDirectives = symbol.directives
                    .map((dir) => program.getTypeChecker().typeToString(dir.tsType))
                    .sort();
                expect(actualDirectives).toEqual(expectedDirectives);
                const expectedSelectors = ['[dir]', '[dir2]', 'div'].sort();
                const actualSelectors = symbol.directives.map((dir) => dir.selector).sort();
                expect(actualSelectors).toEqual(expectedSelectors);
                // Testing this fully requires an integration test with a real `NgCompiler` (like in the
                // Language Service, which uses the ngModule name for quick info). However, this path does
                // assert that we are able to handle when the scope reader returns `null` or a class from
                // the fake implementation.
                const expectedModules = new Set([null, 'TestDirModule', 'TestDir2Module']);
                const actualModules = new Set(symbol.directives.map((dir) => { var _a, _b; return (_b = (_a = dir.ngModule) === null || _a === void 0 ? void 0 : _a.name.getText()) !== null && _b !== void 0 ? _b : null; }));
                expect(actualModules).toEqual(expectedModules);
            });
        });
        describe('let declarations', () => {
            let templateTypeChecker;
            let cmp;
            let ast;
            let program;
            beforeEach(() => {
                const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
                const dirFile = (0, file_system_1.absoluteFrom)('/dir.ts');
                const templateString = `
          @let message = 'The value is ' + value;
          <div [dir]="message"></div>
        `;
                const testValues = setup([
                    {
                        fileName,
                        templates: { 'Cmp': templateString },
                        source: `
              export class Cmp {
                value = 1;
              }
            `,
                        declarations: [
                            {
                                name: 'TestDir',
                                selector: '[dir]',
                                file: dirFile,
                                type: 'directive',
                                exportAs: ['dir'],
                                inputs: { dir: 'dir' },
                            },
                        ],
                    },
                    {
                        fileName: dirFile,
                        source: `export class TestDir {dir: any;}`,
                        templates: {},
                    },
                ]);
                templateTypeChecker = testValues.templateTypeChecker;
                program = testValues.program;
                const sf = (0, file_system_1.getSourceFileOrError)(testValues.program, fileName);
                cmp = (0, testing_2.getClass)(sf, 'Cmp');
                ast = templateTypeChecker.getTemplate(cmp);
            });
            it('should get symbol of a let declaration at the declaration location', () => {
                const symbol = templateTypeChecker.getSymbolOfNode(ast[0], cmp);
                assertLetDeclarationSymbol(symbol);
                expect(program.getTypeChecker().typeToString(symbol.tsType)).toBe('string');
                expect(symbol.declaration.name).toBe('message');
            });
            it('should get symbol of a let declaration at a usage site', () => {
                const symbol = templateTypeChecker.getSymbolOfNode(ast[1].inputs[0].value, cmp);
                assertLetDeclarationSymbol(symbol);
                expect(program.getTypeChecker().typeToString(symbol.tsType)).toEqual('string');
                expect(symbol.declaration.name).toEqual('message');
                // Ensure we can map the shim locations back to the template
                const initializerMapping = templateTypeChecker.getSourceMappingAtTcbLocation(symbol.initializerLocation);
                expect(initializerMapping.span.toString()).toEqual(`'The value is ' + value`);
                const localVarMapping = templateTypeChecker.getSourceMappingAtTcbLocation(symbol.localVarLocation);
                expect(localVarMapping.span.toString()).toEqual('message');
            });
        });
        it('elements with generic directives', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const dirFile = (0, file_system_1.absoluteFrom)('/dir.ts');
            const { program, templateTypeChecker } = setup([
                {
                    fileName,
                    templates: { 'Cmp': `<div genericDir></div>` },
                    declarations: [
                        {
                            name: 'GenericDir',
                            selector: '[genericDir]',
                            file: dirFile,
                            type: 'directive',
                            isGeneric: true,
                        },
                    ],
                },
                {
                    fileName: dirFile,
                    source: `
              export class GenericDir<T>{}
            `,
                    templates: {},
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const cmp = (0, testing_2.getClass)(sf, 'Cmp');
            const nodes = templateTypeChecker.getTemplate(cmp);
            const symbol = templateTypeChecker.getSymbolOfNode(nodes[0], cmp);
            assertElementSymbol(symbol);
            expect(symbol.directives.length).toBe(1);
            const actualDirectives = symbol.directives
                .map((dir) => program.getTypeChecker().typeToString(dir.tsType))
                .sort();
            expect(actualDirectives).toEqual(['GenericDir<any>']);
        });
        it('has correct tcb location for components with inline TCBs', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_2.setup)([
                {
                    fileName,
                    templates: { 'Cmp': '<div></div>' },
                    // Force an inline TCB by using a non-exported component class
                    source: `class Cmp {}`,
                },
            ], { inlining: true, config: { enableTemplateTypeChecker: true } });
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const cmp = (0, testing_2.getClass)(sf, 'Cmp');
            const nodes = templateTypeChecker.getTemplate(cmp);
            const symbol = templateTypeChecker.getSymbolOfNode(nodes[0], cmp);
            assertElementSymbol(symbol);
            expect(symbol.tcbLocation.tcbPath).toBe(sf.fileName);
            expect(symbol.tcbLocation.isShimFile).toBe(false);
        });
        it('finds the directive when relying on inline TCB', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_2.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `<div *foo="exp"></div>`,
                        'BarCmp': '',
                    },
                    source: `
          /* Declare a non-exported component to force using an inline TCB */
          class BarCmp{}

          export class TestCmp {}
          export class Foo {}

        `,
                    declarations: [
                        {
                            type: 'directive',
                            name: 'Foo',
                            selector: `[foo]`,
                        },
                        {
                            name: 'TestCmp',
                            type: 'directive',
                            selector: `[test-cmp]`,
                        },
                        {
                            name: 'BarCmp',
                            type: 'directive',
                            selector: `[bar-cmp]`,
                        },
                    ],
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const testCmp = (0, testing_2.getClass)(sf, 'TestCmp');
            const nodes = templateTypeChecker.getTemplate(testCmp);
            const symbol = templateTypeChecker.getSymbolOfNode(nodes[0], testCmp);
            assertTemplateSymbol(symbol);
            expect(symbol.directives.length).toBe(1);
            expect(symbol.directives[0].selector).toBe('[foo]');
        });
        it('finds the right directive when relying on inline TCB and having multiple classes with the same name in the scope', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_2.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `<div *foo="exp"></div>`,
                        'BarCmp': '',
                    },
                    source: `
          class BarCmp{}

          export class Foo {}
          export class TestCmp {
            foo() {
              // The test should not match this class
              class Foo {
                ThisIsNotTheClassYoureLookingFor = true;
              }
              return Foo;
            }
          }
        `,
                    declarations: [
                        {
                            type: 'directive',
                            name: 'Foo',
                            selector: `[foo]`,
                        },
                        {
                            name: 'TestCmp',
                            type: 'directive',
                            selector: `[test-cmp]`,
                        },
                        {
                            name: 'BarCmp',
                            type: 'directive',
                            selector: `[bar-cmp]`,
                        },
                    ],
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const testCmp = (0, testing_2.getClass)(sf, 'TestCmp');
            const nodes = templateTypeChecker.getTemplate(testCmp);
            const symbol = templateTypeChecker.getSymbolOfNode(nodes[0], testCmp);
            assertTemplateSymbol(symbol);
            expect(symbol.directives.length).toBe(1);
            expect(symbol.directives[0].selector).toBe('[foo]');
        });
        it('has correct tcb location for components with TCBs in a type-checking shim file', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = setup([
                {
                    fileName,
                    templates: { 'Cmp': '<div></div>' },
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const cmp = (0, testing_2.getClass)(sf, 'Cmp');
            const nodes = templateTypeChecker.getTemplate(cmp);
            const symbol = templateTypeChecker.getSymbolOfNode(nodes[0], cmp);
            assertElementSymbol(symbol);
            expect(symbol.tcbLocation.tcbPath).not.toBe(sf.fileName);
            expect(symbol.tcbLocation.isShimFile).toBe(true);
        });
        it('find the directive when the class is nested in a function', () => {
            // This test is more complex as we're testing the diagnostic against a component
            // that can't be referenced because it's nested in a function.
            const { compiler, sourceFile } = (0, testing_2.createNgCompilerForFile)(`
        import {Component, Directive} from '@angular/core';

        @Directive({ selector: '[foo]' })
        export class FooDir {}

        export function foo() {
          @Component({
            imports: [FooDir],
            template: '<div *foo></div>',
          })
          class MyCmp {}
        }
      `);
            const templateTypeChecker = compiler.getTemplateTypeChecker();
            const myCmpClass = (0, tcb_util_1.findNodeInFile)(sourceFile, (node) => { var _a; return typescript_1.default.isClassDeclaration(node) && ((_a = node.name) === null || _a === void 0 ? void 0 : _a.text) === 'MyCmp'; });
            const nodes = templateTypeChecker.getTemplate(myCmpClass);
            const symbol = templateTypeChecker.getSymbolOfNode(nodes[0], myCmpClass);
            assertTemplateSymbol(symbol);
            expect(symbol.kind).toBe(api_1.SymbolKind.Template);
            expect(symbol.directives.length).toBe(1);
            expect(symbol.directives[0].selector).toBe('[foo]');
        });
        it('find the directive when the class is nested in a function and has other pention candidates', () => {
            // This test is more complex as we're testing the diagnostic against a component
            // that can't be referenced because it's nested in a function.
            const { compiler, sourceFile } = (0, testing_2.createNgCompilerForFile)(`
        import {Component, Directive} from '@angular/core';

        if(true) {
          @Directive({ selector: '[foo]' })
          export class FooDir {}

          export function foo() {
            @Component({
              imports: [FooDir],
              template: '<div *foo></div>',
            })
            class MyCmp {}
          } 
        }

        if(true) {
          @Directive({ selector: '[foo]' })
          export class FooDir {
            /* we should not match this directive */
          }
        }
      `);
            const templateTypeChecker = compiler.getTemplateTypeChecker();
            const myCmpClass = (0, tcb_util_1.findNodeInFile)(sourceFile, (node) => { var _a; return typescript_1.default.isClassDeclaration(node) && ((_a = node.name) === null || _a === void 0 ? void 0 : _a.text) === 'MyCmp'; });
            const nodes = templateTypeChecker.getTemplate(myCmpClass);
            const symbol = templateTypeChecker.getSymbolOfNode(nodes[0], myCmpClass);
            assertTemplateSymbol(symbol);
            expect(symbol.kind).toBe(api_1.SymbolKind.Template);
            expect(symbol.directives.length).toBe(1);
            expect(symbol.directives[0].selector).toBe('[foo]');
        });
        it('find the directive when it is nested inside a class of the same name', () => {
            // This test is more complex as we're testing the diagnostic against a component
            // that can't be referenced because it's nested in a function.
            const { compiler, sourceFile } = (0, testing_2.createNgCompilerForFile)(`
        import {Component, Directive} from '@angular/core';

        /* We name this class with the same name as the directive */
        class FooDir {
          foo() {
            @Directive({ selector: '[foo]' })
            export class FooDir {}

            @Component({
              imports: [FooDir],
              template: '<div *foo></div>',
            })
            class MyCmp {}
          } 
        }
      `);
            const templateTypeChecker = compiler.getTemplateTypeChecker();
            const myCmpClass = (0, tcb_util_1.findNodeInFile)(sourceFile, (node) => { var _a; return typescript_1.default.isClassDeclaration(node) && ((_a = node.name) === null || _a === void 0 ? void 0 : _a.text) === 'MyCmp'; });
            const nodes = templateTypeChecker.getTemplate(myCmpClass);
            const symbol = templateTypeChecker.getSymbolOfNode(nodes[0], myCmpClass);
            assertTemplateSymbol(symbol);
            expect(symbol.kind).toBe(api_1.SymbolKind.Template);
            expect(symbol.directives.length).toBe(1);
            expect(symbol.directives[0].selector).toBe('[foo]');
        });
    });
});
function onlyAstTemplates(nodes) {
    return nodes.filter((n) => n instanceof compiler_1.TmplAstTemplate);
}
function onlyAstElements(nodes) {
    return nodes.filter((n) => n instanceof compiler_1.TmplAstElement);
}
function getAstElements(templateTypeChecker, cmp) {
    return onlyAstElements(templateTypeChecker.getTemplate(cmp));
}
function getAstTemplates(templateTypeChecker, cmp) {
    return onlyAstTemplates(templateTypeChecker.getTemplate(cmp));
}
function assertDirectiveSymbol(tSymbol) {
    expect(tSymbol.kind).toEqual(api_1.SymbolKind.Directive);
}
function assertInputBindingSymbol(tSymbol) {
    expect(tSymbol.kind).toEqual(api_1.SymbolKind.Input);
}
function assertOutputBindingSymbol(tSymbol) {
    expect(tSymbol.kind).toEqual(api_1.SymbolKind.Output);
}
function assertVariableSymbol(tSymbol) {
    expect(tSymbol.kind).toEqual(api_1.SymbolKind.Variable);
}
function assertTemplateSymbol(tSymbol) {
    expect(tSymbol.kind).toEqual(api_1.SymbolKind.Template);
}
function assertReferenceSymbol(tSymbol) {
    expect(tSymbol.kind).toEqual(api_1.SymbolKind.Reference);
}
function assertExpressionSymbol(tSymbol) {
    expect(tSymbol.kind).toEqual(api_1.SymbolKind.Expression);
}
function assertPipeSymbol(tSymbol) {
    expect(tSymbol.kind).toEqual(api_1.SymbolKind.Pipe);
}
function assertElementSymbol(tSymbol) {
    expect(tSymbol.kind).toEqual(api_1.SymbolKind.Element);
}
function assertDomBindingSymbol(tSymbol) {
    expect(tSymbol.kind).toEqual(api_1.SymbolKind.DomBinding);
}
function assertLetDeclarationSymbol(tSymbol) {
    expect(tSymbol.kind).toEqual(api_1.SymbolKind.LetDeclaration);
}
function setup(targets, config, parseOptions) {
    return (0, testing_2.setup)(targets, {
        inlining: false,
        config: Object.assign(Object.assign({}, config), { enableTemplateTypeChecker: true, useInlineTypeConstructors: false }),
        parseOptions,
    });
}
