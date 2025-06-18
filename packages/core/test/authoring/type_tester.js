"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const typescript_1 = __importDefault(require("typescript"));
const url_1 = __importDefault(require("url"));
/** Currently-configured tests. */
const TESTS = new Map([
    ['linked_signal_signature_test', (v) => `WritableSignal<${v}>`],
    [
        'signal_input_signature_test',
        (v) => (v.includes(',') ? `InputSignalWithTransform<${v}>` : `InputSignal<${v}>`),
    ],
    ['signal_queries_signature_test', (v) => `Signal<${v}>`],
    ['signal_model_signature_test', (v) => `ModelSignal<${v}>`],
    ['unwrap_writable_signal_signature_test', (v) => v],
]);
const containingDir = path_1.default.dirname(url_1.default.fileURLToPath(import.meta.url));
/**
 * Verify that we are looking at a test class declaration (a given file might have multiple class
 * declarations).
 */
function isTestClass(classDeclaration) {
    return classDeclaration.name !== undefined && classDeclaration.name.text.endsWith('Test');
}
function testFile(testFileName, getType) {
    var _a;
    const fileContent = fs_1.default.readFileSync(path_1.default.join(containingDir, `${testFileName}.d.ts`), 'utf8');
    const sourceFile = typescript_1.default.createSourceFile('test.ts', fileContent, typescript_1.default.ScriptTarget.ESNext, true);
    const testClazz = sourceFile.statements.find((s) => typescript_1.default.isClassDeclaration(s) && isTestClass(s));
    if (testClazz === undefined) {
        return false;
    }
    let failing = false;
    for (const member of testClazz.members) {
        if (!typescript_1.default.isPropertyDeclaration(member)) {
            continue;
        }
        const leadingCommentRanges = typescript_1.default.getLeadingCommentRanges(sourceFile.text, member.getFullStart());
        const leadingComments = leadingCommentRanges === null || leadingCommentRanges === void 0 ? void 0 : leadingCommentRanges.map((r) => sourceFile.text.substring(r.pos, r.end));
        if (leadingComments === undefined || leadingComments.length === 0) {
            throw new Error(`No expected type for: ${member.name.getText()}`);
        }
        // strip comment start, and beginning (plus whitespace).
        const expectedTypeComment = leadingComments[0].replace(/(^\/\*\*?\s*|\s*\*+\/$)/g, '');
        const expectedType = getType(expectedTypeComment);
        // strip excess whitespace or newlines.
        const got = (_a = member.type) === null || _a === void 0 ? void 0 : _a.getText().replace(/(\n+|\s\s+)/g, '');
        if (expectedType !== got) {
            console.error(`${member.name.getText()}: expected: ${expectedType}, got: ${got}`);
            failing = true;
        }
    }
    return failing;
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let failing = false;
        TESTS.forEach((callback, filename) => (failing || (failing = testFile(filename, callback))));
        if (failing) {
            throw new Error('Failing assertions');
        }
    });
}
main().catch((e) => {
    console.error(e);
    process.exitCode = 1;
});
