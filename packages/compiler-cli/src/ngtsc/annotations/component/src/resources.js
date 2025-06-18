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
exports.getTemplateDeclarationNodeForError = getTemplateDeclarationNodeForError;
exports.extractTemplate = extractTemplate;
exports.createEmptyTemplate = createEmptyTemplate;
exports.parseTemplateDeclaration = parseTemplateDeclaration;
exports.preloadAndParseTemplate = preloadAndParseTemplate;
exports.makeResourceNotFoundError = makeResourceNotFoundError;
exports.transformDecoratorResources = transformDecoratorResources;
exports.extractComponentStyleUrls = extractComponentStyleUrls;
exports.extractInlineStyleResources = extractInlineStyleResources;
exports._extractTemplateStyleUrls = _extractTemplateStyleUrls;
const compiler_1 = require("@angular/compiler");
const typescript_1 = __importDefault(require("typescript"));
const diagnostics_1 = require("../../../diagnostics");
const file_system_1 = require("../../../file_system");
const common_1 = require("../../common");
/** Determines the node to use for debugging purposes for the given TemplateDeclaration. */
function getTemplateDeclarationNodeForError(declaration) {
    return declaration.isInline ? declaration.expression : declaration.templateUrlExpression;
}
function extractTemplate(node, template, evaluator, depTracker, resourceLoader, options, compilationMode) {
    if (template.isInline) {
        let sourceStr;
        let sourceParseRange = null;
        let templateContent;
        let sourceMapping;
        let escapedString = false;
        let sourceMapUrl;
        // We only support SourceMaps for inline templates that are simple string literals.
        if (typescript_1.default.isStringLiteral(template.expression) ||
            typescript_1.default.isNoSubstitutionTemplateLiteral(template.expression)) {
            // the start and end of the `templateExpr` node includes the quotation marks, which we must
            // strip
            sourceParseRange = getTemplateRange(template.expression);
            sourceStr = template.expression.getSourceFile().text;
            templateContent = template.expression.text;
            escapedString = true;
            sourceMapping = {
                type: 'direct',
                node: template.expression,
            };
            sourceMapUrl = template.resolvedTemplateUrl;
        }
        else {
            const resolvedTemplate = evaluator.evaluate(template.expression);
            // The identifier used for @Component.template cannot be resolved in local compilation mode. An error specific to this situation is generated.
            (0, common_1.assertLocalCompilationUnresolvedConst)(compilationMode, resolvedTemplate, template.expression, 'Unresolved identifier found for @Component.template field! ' +
                'Did you import this identifier from a file outside of the compilation unit? ' +
                'This is not allowed when Angular compiler runs in local mode. ' +
                'Possible solutions: 1) Move the declaration into a file within the ' +
                'compilation unit, 2) Inline the template, 3) Move the template into ' +
                'a separate .html file and include it using @Component.templateUrl');
            if (typeof resolvedTemplate !== 'string') {
                throw (0, common_1.createValueHasWrongTypeError)(template.expression, resolvedTemplate, 'template must be a string');
            }
            // We do not parse the template directly from the source file using a lexer range, so
            // the template source and content are set to the statically resolved template.
            sourceStr = resolvedTemplate;
            templateContent = resolvedTemplate;
            sourceMapping = {
                type: 'indirect',
                node: template.expression,
                componentClass: node,
                template: templateContent,
            };
            // Indirect templates cannot be mapped to a particular byte range of any input file, since
            // they're computed by expressions that may span many files. Don't attempt to map them back
            // to a given file.
            sourceMapUrl = null;
        }
        return Object.assign(Object.assign({}, parseExtractedTemplate(template, sourceStr, sourceParseRange, escapedString, sourceMapUrl, options)), { content: templateContent, sourceMapping, declaration: template });
    }
    else {
        const templateContent = resourceLoader.load(template.resolvedTemplateUrl);
        if (depTracker !== null) {
            depTracker.addResourceDependency(node.getSourceFile(), (0, file_system_1.absoluteFrom)(template.resolvedTemplateUrl));
        }
        return Object.assign(Object.assign({}, parseExtractedTemplate(template, 
        /* sourceStr */ templateContent, 
        /* sourceParseRange */ null, 
        /* escapedString */ false, 
        /* sourceMapUrl */ template.resolvedTemplateUrl, options)), { content: templateContent, sourceMapping: {
                type: 'external',
                componentClass: node,
                node: template.templateUrlExpression,
                template: templateContent,
                templateUrl: template.resolvedTemplateUrl,
            }, declaration: template });
    }
}
function createEmptyTemplate(componentClass, component, containingFile) {
    const templateUrl = component.get('templateUrl');
    const template = component.get('template');
    return {
        content: '',
        diagNodes: [],
        nodes: [],
        errors: null,
        styles: [],
        styleUrls: [],
        ngContentSelectors: [],
        file: new compiler_1.ParseSourceFile('', ''),
        sourceMapping: templateUrl
            ? { type: 'direct', node: template }
            : {
                type: 'external',
                componentClass,
                node: templateUrl,
                template: '',
                templateUrl: 'missing.ng.html',
            },
        declaration: templateUrl
            ? {
                isInline: false,
                interpolationConfig: compiler_1.InterpolationConfig.fromArray(null),
                preserveWhitespaces: false,
                templateUrlExpression: templateUrl,
                templateUrl: 'missing.ng.html',
                resolvedTemplateUrl: '/missing.ng.html',
            }
            : {
                isInline: true,
                interpolationConfig: compiler_1.InterpolationConfig.fromArray(null),
                preserveWhitespaces: false,
                expression: template,
                templateUrl: containingFile,
                resolvedTemplateUrl: containingFile,
            },
    };
}
function parseExtractedTemplate(template, sourceStr, sourceParseRange, escapedString, sourceMapUrl, options) {
    // We always normalize line endings if the template has been escaped (i.e. is inline).
    const i18nNormalizeLineEndingsInICUs = escapedString || options.i18nNormalizeLineEndingsInICUs;
    const commonParseOptions = {
        interpolationConfig: template.interpolationConfig,
        range: sourceParseRange !== null && sourceParseRange !== void 0 ? sourceParseRange : undefined,
        enableI18nLegacyMessageIdFormat: options.enableI18nLegacyMessageIdFormat,
        i18nNormalizeLineEndingsInICUs,
        alwaysAttemptHtmlToR3AstConversion: options.usePoisonedData,
        escapedString,
        enableBlockSyntax: options.enableBlockSyntax,
        enableLetSyntax: options.enableLetSyntax,
        enableSelectorless: options.enableSelectorless,
    };
    const parsedTemplate = (0, compiler_1.parseTemplate)(sourceStr, sourceMapUrl !== null && sourceMapUrl !== void 0 ? sourceMapUrl : '', Object.assign(Object.assign({}, commonParseOptions), { preserveWhitespaces: template.preserveWhitespaces, preserveSignificantWhitespace: options.preserveSignificantWhitespace }));
    // Unfortunately, the primary parse of the template above may not contain accurate source map
    // information. If used directly, it would result in incorrect code locations in template
    // errors, etc. There are three main problems:
    //
    // 1. `preserveWhitespaces: false` or `preserveSignificantWhitespace: false` annihilates the
    //    correctness of template source mapping, as the whitespace transformation changes the
    //    contents of HTML text nodes before they're parsed into Angular expressions.
    // 2. `preserveLineEndings: false` causes growing misalignments in templates that use '\r\n'
    //    line endings, by normalizing them to '\n'.
    // 3. By default, the template parser strips leading trivia characters (like spaces, tabs, and
    //    newlines). This also destroys source mapping information.
    //
    // In order to guarantee the correctness of diagnostics, templates are parsed a second time
    // with the above options set to preserve source mappings.
    const { nodes: diagNodes } = (0, compiler_1.parseTemplate)(sourceStr, sourceMapUrl !== null && sourceMapUrl !== void 0 ? sourceMapUrl : '', Object.assign(Object.assign({}, commonParseOptions), { preserveWhitespaces: true, preserveLineEndings: true, preserveSignificantWhitespace: true, leadingTriviaChars: [] }));
    return Object.assign(Object.assign({}, parsedTemplate), { diagNodes, file: new compiler_1.ParseSourceFile(sourceStr, sourceMapUrl !== null && sourceMapUrl !== void 0 ? sourceMapUrl : '') });
}
function parseTemplateDeclaration(node, decorator, component, containingFile, evaluator, depTracker, resourceLoader, defaultPreserveWhitespaces) {
    let preserveWhitespaces = defaultPreserveWhitespaces;
    if (component.has('preserveWhitespaces')) {
        const expr = component.get('preserveWhitespaces');
        const value = evaluator.evaluate(expr);
        if (typeof value !== 'boolean') {
            throw (0, common_1.createValueHasWrongTypeError)(expr, value, 'preserveWhitespaces must be a boolean');
        }
        preserveWhitespaces = value;
    }
    let interpolationConfig = compiler_1.DEFAULT_INTERPOLATION_CONFIG;
    if (component.has('interpolation')) {
        const expr = component.get('interpolation');
        const value = evaluator.evaluate(expr);
        if (!Array.isArray(value) ||
            value.length !== 2 ||
            !value.every((element) => typeof element === 'string')) {
            throw (0, common_1.createValueHasWrongTypeError)(expr, value, 'interpolation must be an array with 2 elements of string type');
        }
        interpolationConfig = compiler_1.InterpolationConfig.fromArray(value);
    }
    if (component.has('templateUrl')) {
        const templateUrlExpr = component.get('templateUrl');
        const templateUrl = evaluator.evaluate(templateUrlExpr);
        if (typeof templateUrl !== 'string') {
            throw (0, common_1.createValueHasWrongTypeError)(templateUrlExpr, templateUrl, 'templateUrl must be a string');
        }
        try {
            const resourceUrl = resourceLoader.resolve(templateUrl, containingFile);
            return {
                isInline: false,
                interpolationConfig,
                preserveWhitespaces,
                templateUrl,
                templateUrlExpression: templateUrlExpr,
                resolvedTemplateUrl: resourceUrl,
            };
        }
        catch (e) {
            if (depTracker !== null) {
                // The analysis of this file cannot be re-used if the template URL could
                // not be resolved. Future builds should re-analyze and re-attempt resolution.
                depTracker.recordDependencyAnalysisFailure(node.getSourceFile());
            }
            throw makeResourceNotFoundError(templateUrl, templateUrlExpr, 0 /* ResourceTypeForDiagnostics.Template */);
        }
    }
    else if (component.has('template')) {
        return {
            isInline: true,
            interpolationConfig,
            preserveWhitespaces,
            expression: component.get('template'),
            templateUrl: containingFile,
            resolvedTemplateUrl: containingFile,
        };
    }
    else {
        throw new diagnostics_1.FatalDiagnosticError(diagnostics_1.ErrorCode.COMPONENT_MISSING_TEMPLATE, decorator.node, 'component is missing a template');
    }
}
function preloadAndParseTemplate(evaluator, resourceLoader, depTracker, preanalyzeTemplateCache, node, decorator, component, containingFile, defaultPreserveWhitespaces, options, compilationMode) {
    if (component.has('templateUrl')) {
        // Extract the templateUrl and preload it.
        const templateUrlExpr = component.get('templateUrl');
        const templateUrl = evaluator.evaluate(templateUrlExpr);
        if (typeof templateUrl !== 'string') {
            throw (0, common_1.createValueHasWrongTypeError)(templateUrlExpr, templateUrl, 'templateUrl must be a string');
        }
        try {
            const resourceUrl = resourceLoader.resolve(templateUrl, containingFile);
            const templatePromise = resourceLoader.preload(resourceUrl, {
                type: 'template',
                containingFile,
                className: node.name.text,
            });
            // If the preload worked, then actually load and parse the template, and wait for any
            // style URLs to resolve.
            if (templatePromise !== undefined) {
                return templatePromise.then(() => {
                    const templateDecl = parseTemplateDeclaration(node, decorator, component, containingFile, evaluator, depTracker, resourceLoader, defaultPreserveWhitespaces);
                    const template = extractTemplate(node, templateDecl, evaluator, depTracker, resourceLoader, options, compilationMode);
                    preanalyzeTemplateCache.set(node, template);
                    return template;
                });
            }
            else {
                return Promise.resolve(null);
            }
        }
        catch (e) {
            if (depTracker !== null) {
                // The analysis of this file cannot be re-used if the template URL could
                // not be resolved. Future builds should re-analyze and re-attempt resolution.
                depTracker.recordDependencyAnalysisFailure(node.getSourceFile());
            }
            throw makeResourceNotFoundError(templateUrl, templateUrlExpr, 0 /* ResourceTypeForDiagnostics.Template */);
        }
    }
    else {
        const templateDecl = parseTemplateDeclaration(node, decorator, component, containingFile, evaluator, depTracker, resourceLoader, defaultPreserveWhitespaces);
        const template = extractTemplate(node, templateDecl, evaluator, depTracker, resourceLoader, options, compilationMode);
        preanalyzeTemplateCache.set(node, template);
        return Promise.resolve(template);
    }
}
function getTemplateRange(templateExpr) {
    const startPos = templateExpr.getStart() + 1;
    const { line, character } = typescript_1.default.getLineAndCharacterOfPosition(templateExpr.getSourceFile(), startPos);
    return {
        startPos,
        startLine: line,
        startCol: character,
        endPos: templateExpr.getEnd() - 1,
    };
}
function makeResourceNotFoundError(file, nodeForError, resourceType) {
    let errorText;
    switch (resourceType) {
        case 0 /* ResourceTypeForDiagnostics.Template */:
            errorText = `Could not find template file '${file}'.`;
            break;
        case 1 /* ResourceTypeForDiagnostics.StylesheetFromTemplate */:
            errorText = `Could not find stylesheet file '${file}' linked from the template.`;
            break;
        case 2 /* ResourceTypeForDiagnostics.StylesheetFromDecorator */:
            errorText = `Could not find stylesheet file '${file}'.`;
            break;
    }
    return new diagnostics_1.FatalDiagnosticError(diagnostics_1.ErrorCode.COMPONENT_RESOURCE_NOT_FOUND, nodeForError, errorText);
}
/**
 * Transforms the given decorator to inline external resources. i.e. if the decorator
 * resolves to `@Component`, the `templateUrl` and `styleUrls` metadata fields will be
 * transformed to their semantically-equivalent inline variants.
 *
 * This method is used for serializing decorators into the class metadata. The emitted
 * class metadata should not refer to external resources as this would be inconsistent
 * with the component definitions/declarations which already inline external resources.
 *
 * Additionally, the references to external resources would require libraries to ship
 * external resources exclusively for the class metadata.
 */
function transformDecoratorResources(dec, component, styles, template) {
    if (dec.name !== 'Component') {
        return dec;
    }
    // If no external resources are referenced, preserve the original decorator
    // for the best source map experience when the decorator is emitted in TS.
    if (!component.has('templateUrl') &&
        !component.has('styleUrls') &&
        !component.has('styleUrl') &&
        !component.has('styles')) {
        return dec;
    }
    const metadata = new Map(component);
    // Set the `template` property if the `templateUrl` property is set.
    if (metadata.has('templateUrl')) {
        metadata.delete('templateUrl');
        metadata.set('template', typescript_1.default.factory.createStringLiteral(template.content));
    }
    if (metadata.has('styleUrls') || metadata.has('styleUrl') || metadata.has('styles')) {
        metadata.delete('styles');
        metadata.delete('styleUrls');
        metadata.delete('styleUrl');
        if (styles.length > 0) {
            const styleNodes = styles.reduce((result, style) => {
                if (style.trim().length > 0) {
                    result.push(typescript_1.default.factory.createStringLiteral(style));
                }
                return result;
            }, []);
            if (styleNodes.length > 0) {
                metadata.set('styles', typescript_1.default.factory.createArrayLiteralExpression(styleNodes));
            }
        }
    }
    // Convert the metadata to TypeScript AST object literal element nodes.
    const newMetadataFields = [];
    for (const [name, value] of metadata.entries()) {
        newMetadataFields.push(typescript_1.default.factory.createPropertyAssignment(name, value));
    }
    // Return the original decorator with the overridden metadata argument.
    return Object.assign(Object.assign({}, dec), { args: [typescript_1.default.factory.createObjectLiteralExpression(newMetadataFields)] });
}
function extractComponentStyleUrls(evaluator, component) {
    const styleUrlsExpr = component.get('styleUrls');
    const styleUrlExpr = component.get('styleUrl');
    if (styleUrlsExpr !== undefined && styleUrlExpr !== undefined) {
        throw new diagnostics_1.FatalDiagnosticError(diagnostics_1.ErrorCode.COMPONENT_INVALID_STYLE_URLS, styleUrlExpr, '@Component cannot define both `styleUrl` and `styleUrls`. ' +
            'Use `styleUrl` if the component has one stylesheet, or `styleUrls` if it has multiple');
    }
    if (styleUrlsExpr !== undefined) {
        return extractStyleUrlsFromExpression(evaluator, component.get('styleUrls'));
    }
    if (styleUrlExpr !== undefined) {
        const styleUrl = evaluator.evaluate(styleUrlExpr);
        if (typeof styleUrl !== 'string') {
            throw (0, common_1.createValueHasWrongTypeError)(styleUrlExpr, styleUrl, 'styleUrl must be a string');
        }
        return [
            {
                url: styleUrl,
                source: 2 /* ResourceTypeForDiagnostics.StylesheetFromDecorator */,
                expression: styleUrlExpr,
            },
        ];
    }
    return [];
}
function extractStyleUrlsFromExpression(evaluator, styleUrlsExpr) {
    const styleUrls = [];
    if (typescript_1.default.isArrayLiteralExpression(styleUrlsExpr)) {
        for (const styleUrlExpr of styleUrlsExpr.elements) {
            if (typescript_1.default.isSpreadElement(styleUrlExpr)) {
                styleUrls.push(...extractStyleUrlsFromExpression(evaluator, styleUrlExpr.expression));
            }
            else {
                const styleUrl = evaluator.evaluate(styleUrlExpr);
                if (typeof styleUrl !== 'string') {
                    throw (0, common_1.createValueHasWrongTypeError)(styleUrlExpr, styleUrl, 'styleUrl must be a string');
                }
                styleUrls.push({
                    url: styleUrl,
                    source: 2 /* ResourceTypeForDiagnostics.StylesheetFromDecorator */,
                    expression: styleUrlExpr,
                });
            }
        }
    }
    else {
        const evaluatedStyleUrls = evaluator.evaluate(styleUrlsExpr);
        if (!(0, common_1.isStringArray)(evaluatedStyleUrls)) {
            throw (0, common_1.createValueHasWrongTypeError)(styleUrlsExpr, evaluatedStyleUrls, 'styleUrls must be an array of strings');
        }
        for (const styleUrl of evaluatedStyleUrls) {
            styleUrls.push({
                url: styleUrl,
                source: 2 /* ResourceTypeForDiagnostics.StylesheetFromDecorator */,
                expression: styleUrlsExpr,
            });
        }
    }
    return styleUrls;
}
function extractInlineStyleResources(component) {
    const styles = new Set();
    function stringLiteralElements(array) {
        return array.elements.filter((e) => typescript_1.default.isStringLiteralLike(e));
    }
    const stylesExpr = component.get('styles');
    if (stylesExpr !== undefined) {
        if (typescript_1.default.isArrayLiteralExpression(stylesExpr)) {
            for (const expression of stringLiteralElements(stylesExpr)) {
                styles.add({ path: null, node: expression });
            }
        }
        else if (typescript_1.default.isStringLiteralLike(stylesExpr)) {
            styles.add({ path: null, node: stylesExpr });
        }
    }
    return styles;
}
function _extractTemplateStyleUrls(template) {
    if (template.styleUrls === null) {
        return [];
    }
    const expression = getTemplateDeclarationNodeForError(template.declaration);
    return template.styleUrls.map((url) => ({
        url,
        source: 1 /* ResourceTypeForDiagnostics.StylesheetFromTemplate */,
        expression,
    }));
}
