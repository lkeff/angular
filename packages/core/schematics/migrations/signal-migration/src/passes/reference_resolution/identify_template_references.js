"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.identifyTemplateReferences = identifyTemplateReferences;
const resources_1 = require("@angular/compiler-cli/src/ngtsc/annotations/component/src/resources");
const file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system");
const transform_1 = require("@angular/compiler-cli/src/ngtsc/transform");
const api_1 = require("@angular/compiler-cli/src/ngtsc/typecheck/api");
const tsurge_1 = require("../../../../../utils/tsurge");
const template_reference_visitor_1 = require("./template_reference_visitor");
const extract_template_1 = require("../../utils/extract_template");
const reference_kinds_1 = require("./reference_kinds");
/**
 * Checks whether the given class has an Angular template, and resolves
 * all of the references to inputs.
 */
function identifyTemplateReferences(programInfo, node, reflector, checker, evaluator, templateTypeChecker, resourceLoader, options, result, knownFields, fieldNamesToConsiderForReferenceLookup) {
    var _a;
    const template = (_a = templateTypeChecker.getTemplate(node, api_1.OptimizeFor.WholeProgram)) !== null && _a !== void 0 ? _a : 
    // If there is no template registered in the TCB or compiler, the template may
    // be skipped due to an explicit `jit: true` setting. We try to detect this case
    // and parse the template manually.
    extractTemplateWithoutCompilerAnalysis(node, checker, reflector, resourceLoader, evaluator, options);
    if (template !== null) {
        const visitor = new template_reference_visitor_1.TemplateReferenceVisitor(checker, templateTypeChecker, node, knownFields, fieldNamesToConsiderForReferenceLookup);
        template.forEach((node) => node.visit(visitor));
        for (const res of visitor.result) {
            const templateFilePath = res.context.sourceSpan.start.file.url;
            // Templates without an URL are non-mappable artifacts of e.g.
            // string concatenated templates. See the `indirect` template
            // source mapping concept in the compiler. We skip such references
            // as those cannot be migrated, but print an error for now.
            if (templateFilePath === '') {
                // TODO: Incorporate a TODO potentially.
                console.error(`Found reference to field ${res.targetField.key} that cannot be ` +
                    `migrated because the template cannot be parsed with source map information ` +
                    `(in file: ${node.getSourceFile().fileName}).`);
                continue;
            }
            result.references.push({
                kind: reference_kinds_1.ReferenceKind.InTemplate,
                from: {
                    read: res.read,
                    readAstPath: res.readAstPath,
                    node: res.context,
                    isObjectShorthandExpression: res.isObjectShorthandExpression,
                    originatingTsFile: (0, tsurge_1.projectFile)(node.getSourceFile(), programInfo),
                    templateFile: (0, tsurge_1.projectFile)((0, file_system_1.absoluteFrom)(templateFilePath), programInfo),
                    isLikelyPartOfNarrowing: res.isLikelyNarrowed,
                    isWrite: res.isWrite,
                },
                target: res.targetField,
            });
        }
    }
}
/**
 * Attempts to extract a `@Component` template from the given class,
 * without relying on the `NgCompiler` program analysis.
 *
 * This is useful for JIT components using `jit: true` which were not
 * processed by the Angular compiler, but may still have templates that
 * contain references to inputs that we can resolve via the fallback
 * reference resolutions (that does not use the type check block).
 */
function extractTemplateWithoutCompilerAnalysis(node, checker, reflector, resourceLoader, evaluator, options) {
    if (node.name === undefined) {
        return null;
    }
    const tmplDef = (0, extract_template_1.attemptExtractTemplateDefinition)(node, checker, reflector, resourceLoader);
    if (tmplDef === null) {
        return null;
    }
    return (0, resources_1.extractTemplate)(node, tmplDef, evaluator, null, resourceLoader, {
        enableBlockSyntax: true,
        enableLetSyntax: true,
        usePoisonedData: true,
        enableI18nLegacyMessageIdFormat: options.enableI18nLegacyMessageIdFormat !== false,
        i18nNormalizeLineEndingsInICUs: options.i18nNormalizeLineEndingsInICUs === true,
        enableSelectorless: false,
    }, transform_1.CompilationMode.FULL).nodes;
}
