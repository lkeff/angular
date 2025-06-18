"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeCheckDiagnose = typeCheckDiagnose;
exports.generateDiagnoseJasmineSpecs = generateDiagnoseJasmineSpecs;
const testing_1 = require("../testing");
/**
 * Diagnoses the given test case, by constructing the test TypeScript file
 * and running the type checker on it.
 */
function typeCheckDiagnose(c, compilerOptions) {
    var _a, _b, _c, _d, _e, _f, _g;
    const inputs = (_a = c.inputs) !== null && _a !== void 0 ? _a : {};
    const outputs = (_b = c.outputs) !== null && _b !== void 0 ? _b : {};
    const inputFields = Object.keys(inputs).map((inputName) => { var _a; return `${(_a = inputs[inputName].restrictionModifier) !== null && _a !== void 0 ? _a : ''} ${inputName}: ${inputs[inputName].type}`; });
    const outputFields = Object.keys(outputs).map((name) => { var _a; return `${(_a = outputs[name].restrictionModifier) !== null && _a !== void 0 ? _a : ''} ${name}: ${outputs[name].type}`; });
    const testComponent = `
      import {
        InputSignal,
        EventEmitter,
        OutputEmitterRef,
        InputSignalWithTransform,
        ModelSignal,
        WritableSignal,
      } from '@angular/core';

      ${(_c = c.extraFileContent) !== null && _c !== void 0 ? _c : ''}

      class Dir${(_d = c.directiveGenerics) !== null && _d !== void 0 ? _d : ''} {
        ${inputFields.join('\n')}
        ${outputFields.join('\n')}

        ${(_f = (_e = c.extraDirectiveMembers) === null || _e === void 0 ? void 0 : _e.join('\n')) !== null && _f !== void 0 ? _f : ''}
      }
      class TestComponent {
        ${(_g = c.component) !== null && _g !== void 0 ? _g : ''}
      }
    `;
    const inputDeclarations = Object.keys(inputs).reduce((res, inputName) => {
        return Object.assign(Object.assign({}, res), { [inputName]: {
                bindingPropertyName: inputName,
                classPropertyName: inputName,
                isSignal: inputs[inputName].isSignal,
                required: false,
                transform: null,
            } });
    }, {});
    const outputDeclarations = Object.keys(outputs).reduce((res, outputName) => {
        return Object.assign(Object.assign({}, res), { [outputName]: outputName });
    }, {});
    const messages = (0, testing_1.diagnose)(c.template, testComponent, [
        {
            type: 'directive',
            name: 'Dir',
            selector: '[dir]',
            exportAs: ['dir'],
            isGeneric: c.directiveGenerics !== undefined,
            outputs: outputDeclarations,
            inputs: inputDeclarations,
            restrictedInputFields: Object.entries(inputs)
                .filter(([_, i]) => i.restrictionModifier !== undefined)
                .map(([name]) => name),
        },
    ], undefined, c.options, compilerOptions);
    expect(messages).toEqual(c.expected);
}
/** Generates Jasmine `it` specs for all test cases. */
function generateDiagnoseJasmineSpecs(cases) {
    for (const c of cases) {
        (c.focus ? fit : it)(c.id, () => {
            typeCheckDiagnose(c);
        });
    }
    describe('with `--strict`', () => {
        for (const c of cases) {
            (c.focus ? fit : it)(c.id, () => {
                typeCheckDiagnose(c, { strict: true });
            });
        }
    });
}
