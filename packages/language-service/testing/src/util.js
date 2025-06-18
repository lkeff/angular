"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertFileNames = assertFileNames;
exports.assertFilePaths = assertFilePaths;
exports.assertTextSpans = assertTextSpans;
exports.isNgSpecificDiagnostic = isNgSpecificDiagnostic;
exports.createModuleAndProjectWithDeclarations = createModuleAndProjectWithDeclarations;
exports.humanizeDocumentSpanLike = humanizeDocumentSpanLike;
exports.getText = getText;
/**
 * Expect that a list of objects with a `fileName` property matches a set of expected files by only
 * comparing the file names and not any path prefixes.
 *
 * This assertion is independent of the order of either list.
 */
function assertFileNames(refs, expectedFileNames) {
    const actualPaths = refs.map((r) => r.fileName);
    const actualFileNames = actualPaths.map((p) => last(p.split('/')));
    expect(new Set(actualFileNames)).toEqual(new Set(expectedFileNames));
}
/**
 * Expect that a list of objects with a `fileName` property matches a set
 * of file paths.
 *
 * This assertion is independent of the order of either list.
 */
function assertFilePaths(refs, expectedPaths) {
    const actualPaths = Array.from(new Set(refs.map((r) => r.fileName)));
    if (actualPaths.length !== expectedPaths.length) {
        expect(actualPaths.length)
            .withContext('Expected expected paths to be the same size.')
            .toBe(expectedPaths.length);
        return;
    }
    for (const pattern of expectedPaths) {
        const matching = actualPaths.findIndex((p) => pattern.test(p));
        if (matching !== -1) {
            actualPaths.splice(matching, 1);
        }
        else {
            expect(true)
                .withContext(`Expected ${pattern} to match a file path. ` +
                `Remaining unmatched paths: ${actualPaths.join(', ')}`)
                .toBe(false);
            return;
        }
    }
}
function assertTextSpans(items, expectedTextSpans) {
    const actualSpans = items.map((item) => item.textSpan);
    expect(new Set(actualSpans)).toEqual(new Set(expectedTextSpans));
}
/**
 * Returns whether the given `ts.Diagnostic` is of a type only produced by the Angular compiler (as
 * opposed to being an upstream TypeScript diagnostic).
 *
 * Template type-checking diagnostics are not "ng-specific" in this sense, since they are plain
 * TypeScript diagnostics that are produced from expressions in the template by way of a TCB.
 */
function isNgSpecificDiagnostic(diag) {
    // Angular-specific diagnostics use a negative code space.
    return diag.code < 0;
}
function getFirstClassDeclaration(declaration) {
    const matches = declaration.match(/(?:export class )(\w+)(?:\s|\{|<)/);
    if (matches === null || matches.length !== 2) {
        throw new Error(`Did not find exactly one exported class in: ${declaration}`);
    }
    return matches[1].trim();
}
function createModuleAndProjectWithDeclarations(env, projectName, projectFiles, angularCompilerOptions = {}, standaloneFiles = {}) {
    const externalClasses = [];
    const externalImports = [];
    for (const [fileName, fileContents] of Object.entries(projectFiles)) {
        if (!fileName.endsWith('.ts')) {
            continue;
        }
        const className = getFirstClassDeclaration(fileContents);
        externalClasses.push(className);
        externalImports.push(`import {${className}} from './${fileName.replace('.ts', '')}';`);
    }
    const moduleContents = `
        import {NgModule} from '@angular/core';
        import {CommonModule} from '@angular/common';
        ${externalImports.join('\n')}

        @NgModule({
          declarations: [${externalClasses.join(',')}],
          imports: [CommonModule],
        })
        export class AppModule {}
      `;
    projectFiles['app-module.ts'] = moduleContents;
    return env.addProject(projectName, Object.assign(Object.assign({}, projectFiles), standaloneFiles), angularCompilerOptions);
}
function humanizeDocumentSpanLike(item, env) {
    return Object.assign(Object.assign({}, item), { textSpan: env.getTextFromTsSpan(item.fileName, item.textSpan), contextSpan: item.contextSpan
            ? env.getTextFromTsSpan(item.fileName, item.contextSpan)
            : undefined, originalTextSpan: item.originalTextSpan
            ? env.getTextFromTsSpan(item.fileName, item.originalTextSpan)
            : undefined, originalContextSpan: item.originalContextSpan
            ? env.getTextFromTsSpan(item.fileName, item.originalContextSpan)
            : undefined });
}
function getText(contents, textSpan) {
    return contents.slice(textSpan.start, textSpan.start + textSpan.length);
}
function last(array) {
    if (array.length === 0) {
        throw new Error(`last() called on empty array`);
    }
    return array[array.length - 1];
}
