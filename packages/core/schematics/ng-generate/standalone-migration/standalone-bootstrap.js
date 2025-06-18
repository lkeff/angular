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
exports.toStandaloneBootstrap = toStandaloneBootstrap;
const path_1 = require("path");
const typescript_1 = __importDefault(require("typescript"));
const change_tracker_1 = require("../../utils/change_tracker");
const ng_decorators_1 = require("../../utils/ng_decorators");
const nodes_1 = require("../../utils/typescript/nodes");
const to_standalone_1 = require("./to-standalone");
const util_1 = require("./util");
function toStandaloneBootstrap(program, host, basePath, rootFileNames, sourceFiles, printer, importRemapper, referenceLookupExcludedFiles, declarationImportRemapper) {
    const tracker = new change_tracker_1.ChangeTracker(printer, importRemapper);
    const typeChecker = program.getTsProgram().getTypeChecker();
    const templateTypeChecker = program.compiler.getTemplateTypeChecker();
    const referenceResolver = new util_1.ReferenceResolver(program, host, rootFileNames, basePath, referenceLookupExcludedFiles);
    const bootstrapCalls = [];
    const testObjects = new Set();
    const allDeclarations = new Set();
    // `bootstrapApplication` doesn't include Protractor support by default
    // anymore so we have to opt the app in, if we detect it being used.
    const additionalProviders = hasImport(program, rootFileNames, 'protractor')
        ? new Map([['provideProtractorTestingSupport', '@angular/platform-browser']])
        : null;
    for (const sourceFile of sourceFiles) {
        sourceFile.forEachChild(function walk(node) {
            if (typescript_1.default.isCallExpression(node) &&
                typescript_1.default.isPropertyAccessExpression(node.expression) &&
                node.expression.name.text === 'bootstrapModule' &&
                (0, util_1.isClassReferenceInAngularModule)(node.expression, 'PlatformRef', 'core', typeChecker)) {
                const call = analyzeBootstrapCall(node, typeChecker, templateTypeChecker);
                if (call) {
                    bootstrapCalls.push(call);
                }
            }
            node.forEachChild(walk);
        });
        (0, to_standalone_1.findTestObjectsToMigrate)(sourceFile, typeChecker).forEach((obj) => testObjects.add(obj));
    }
    for (const call of bootstrapCalls) {
        call.declarations.forEach((decl) => allDeclarations.add(decl));
        migrateBootstrapCall(call, tracker, additionalProviders, referenceResolver, typeChecker, printer);
    }
    // The previous migrations explicitly skip over bootstrapped
    // declarations so we have to migrate them now.
    for (const declaration of allDeclarations) {
        (0, to_standalone_1.convertNgModuleDeclarationToStandalone)(declaration, allDeclarations, tracker, templateTypeChecker, declarationImportRemapper);
    }
    (0, to_standalone_1.migrateTestDeclarations)(testObjects, allDeclarations, tracker, templateTypeChecker, typeChecker);
    return tracker.recordChanges();
}
/**
 * Extracts all of the information from a `bootstrapModule` call
 * necessary to convert it to `bootstrapApplication`.
 * @param call Call to be analyzed.
 * @param typeChecker
 * @param templateTypeChecker
 */
function analyzeBootstrapCall(call, typeChecker, templateTypeChecker) {
    if (call.arguments.length === 0 || !typescript_1.default.isIdentifier(call.arguments[0])) {
        return null;
    }
    const declaration = (0, util_1.findClassDeclaration)(call.arguments[0], typeChecker);
    if (!declaration) {
        return null;
    }
    const decorator = (0, ng_decorators_1.getAngularDecorators)(typeChecker, typescript_1.default.getDecorators(declaration) || []).find((decorator) => decorator.name === 'NgModule');
    if (!decorator ||
        decorator.node.expression.arguments.length === 0 ||
        !typescript_1.default.isObjectLiteralExpression(decorator.node.expression.arguments[0])) {
        return null;
    }
    const metadata = decorator.node.expression.arguments[0];
    const bootstrapProp = (0, util_1.findLiteralProperty)(metadata, 'bootstrap');
    if (!bootstrapProp ||
        !typescript_1.default.isPropertyAssignment(bootstrapProp) ||
        !typescript_1.default.isArrayLiteralExpression(bootstrapProp.initializer) ||
        bootstrapProp.initializer.elements.length === 0 ||
        !typescript_1.default.isIdentifier(bootstrapProp.initializer.elements[0])) {
        return null;
    }
    const component = (0, util_1.findClassDeclaration)(bootstrapProp.initializer.elements[0], typeChecker);
    if (component && component.name && typescript_1.default.isIdentifier(component.name)) {
        return {
            module: declaration,
            metadata,
            component: component,
            call,
            declarations: (0, to_standalone_1.extractDeclarationsFromModule)(declaration, templateTypeChecker),
        };
    }
    return null;
}
/**
 * Converts a `bootstrapModule` call to `bootstrapApplication`.
 * @param analysis Analysis result of the call.
 * @param tracker Tracker in which to register the changes.
 * @param additionalFeatures Additional providers, apart from the auto-detected ones, that should
 * be added to the bootstrap call.
 * @param referenceResolver
 * @param typeChecker
 * @param printer
 */
function migrateBootstrapCall(analysis, tracker, additionalProviders, referenceResolver, typeChecker, printer) {
    const sourceFile = analysis.call.getSourceFile();
    const moduleSourceFile = analysis.metadata.getSourceFile();
    const providers = (0, util_1.findLiteralProperty)(analysis.metadata, 'providers');
    const imports = (0, util_1.findLiteralProperty)(analysis.metadata, 'imports');
    const nodesToCopy = new Set();
    const providersInNewCall = [];
    const moduleImportsInNewCall = [];
    let nodeLookup = null;
    // Comment out the metadata so that it'll be removed when we run the module pruning afterwards.
    // If the pruning is left for some reason, the user will still have an actionable TODO.
    tracker.insertText(moduleSourceFile, analysis.metadata.getStart(), '/* TODO(standalone-migration): clean up removed NgModule class manually. \n');
    tracker.insertText(moduleSourceFile, analysis.metadata.getEnd(), ' */');
    if (providers && typescript_1.default.isPropertyAssignment(providers)) {
        nodeLookup = nodeLookup || (0, util_1.getNodeLookup)(moduleSourceFile);
        if (typescript_1.default.isArrayLiteralExpression(providers.initializer)) {
            providersInNewCall.push(...providers.initializer.elements);
        }
        else {
            providersInNewCall.push(typescript_1.default.factory.createSpreadElement(providers.initializer));
        }
        addNodesToCopy(sourceFile, providers, nodeLookup, tracker, nodesToCopy, referenceResolver);
    }
    if (imports && typescript_1.default.isPropertyAssignment(imports)) {
        nodeLookup = nodeLookup || (0, util_1.getNodeLookup)(moduleSourceFile);
        migrateImportsForBootstrapCall(sourceFile, imports, nodeLookup, moduleImportsInNewCall, providersInNewCall, tracker, nodesToCopy, referenceResolver, typeChecker);
    }
    if (additionalProviders) {
        additionalProviders.forEach((moduleSpecifier, name) => {
            providersInNewCall.push(typescript_1.default.factory.createCallExpression(tracker.addImport(sourceFile, name, moduleSpecifier), undefined, undefined));
        });
    }
    if (nodesToCopy.size > 0) {
        let text = '\n\n';
        nodesToCopy.forEach((node) => {
            const transformedNode = remapDynamicImports(sourceFile.fileName, node);
            // Use `getText` to try an preserve the original formatting. This only works if the node
            // hasn't been transformed. If it has, we have to fall back to the printer.
            if (transformedNode === node) {
                text += transformedNode.getText() + '\n';
            }
            else {
                text += printer.printNode(typescript_1.default.EmitHint.Unspecified, transformedNode, node.getSourceFile());
            }
        });
        text += '\n';
        tracker.insertText(sourceFile, getLastImportEnd(sourceFile), text);
    }
    replaceBootstrapCallExpression(analysis, providersInNewCall, moduleImportsInNewCall, tracker);
}
/**
 * Replaces a `bootstrapModule` call with `bootstrapApplication`.
 * @param analysis Analysis result of the `bootstrapModule` call.
 * @param providers Providers that should be added to the new call.
 * @param modules Modules that are being imported into the new call.
 * @param tracker Object keeping track of the changes to the different files.
 */
function replaceBootstrapCallExpression(analysis, providers, modules, tracker) {
    const sourceFile = analysis.call.getSourceFile();
    const componentPath = (0, util_1.getRelativeImportPath)(sourceFile.fileName, analysis.component.getSourceFile().fileName);
    const args = [tracker.addImport(sourceFile, analysis.component.name.text, componentPath)];
    const bootstrapExpression = tracker.addImport(sourceFile, 'bootstrapApplication', '@angular/platform-browser');
    if (providers.length > 0 || modules.length > 0) {
        const combinedProviders = [];
        if (modules.length > 0) {
            const importProvidersExpression = tracker.addImport(sourceFile, 'importProvidersFrom', '@angular/core');
            combinedProviders.push(typescript_1.default.factory.createCallExpression(importProvidersExpression, [], modules));
        }
        // Push the providers after `importProvidersFrom` call for better readability.
        combinedProviders.push(...providers);
        const providersArray = typescript_1.default.factory.createNodeArray(combinedProviders, analysis.metadata.properties.hasTrailingComma && combinedProviders.length > 2);
        const initializer = remapDynamicImports(sourceFile.fileName, typescript_1.default.factory.createArrayLiteralExpression(providersArray, combinedProviders.length > 1));
        args.push(typescript_1.default.factory.createObjectLiteralExpression([typescript_1.default.factory.createPropertyAssignment('providers', initializer)], true));
    }
    tracker.replaceNode(analysis.call, typescript_1.default.factory.createCallExpression(bootstrapExpression, [], args), 
    // Note: it's important to pass in the source file that the nodes originated from!
    // Otherwise TS won't print out literals inside of the providers that we're copying
    // over from the module file.
    undefined, analysis.metadata.getSourceFile());
}
/**
 * Processes the `imports` of an NgModule so that they can be used in the `bootstrapApplication`
 * call inside of a different file.
 * @param sourceFile File to which the imports will be moved.
 * @param imports Node declaring the imports.
 * @param nodeLookup Map used to look up nodes based on their positions in a file.
 * @param importsForNewCall Array keeping track of the imports that are being added to the new call.
 * @param providersInNewCall Array keeping track of the providers in the new call.
 * @param tracker Tracker in which changes to files are being stored.
 * @param nodesToCopy Nodes that should be copied to the new file.
 * @param referenceResolver
 * @param typeChecker
 */
function migrateImportsForBootstrapCall(sourceFile, imports, nodeLookup, importsForNewCall, providersInNewCall, tracker, nodesToCopy, referenceResolver, typeChecker) {
    if (!typescript_1.default.isArrayLiteralExpression(imports.initializer)) {
        importsForNewCall.push(imports.initializer);
        return;
    }
    for (const element of imports.initializer.elements) {
        // If the reference is to a `RouterModule.forRoot` call, we can try to migrate it.
        if (typescript_1.default.isCallExpression(element) &&
            typescript_1.default.isPropertyAccessExpression(element.expression) &&
            element.arguments.length > 0 &&
            element.expression.name.text === 'forRoot' &&
            (0, util_1.isClassReferenceInAngularModule)(element.expression.expression, 'RouterModule', 'router', typeChecker)) {
            const options = element.arguments[1];
            const features = options ? getRouterModuleForRootFeatures(sourceFile, options, tracker) : [];
            // If the features come back as null, it means that the router
            // has a configuration that can't be migrated automatically.
            if (features !== null) {
                providersInNewCall.push(typescript_1.default.factory.createCallExpression(tracker.addImport(sourceFile, 'provideRouter', '@angular/router'), [], [element.arguments[0], ...features]));
                addNodesToCopy(sourceFile, element.arguments[0], nodeLookup, tracker, nodesToCopy, referenceResolver);
                if (options) {
                    addNodesToCopy(sourceFile, options, nodeLookup, tracker, nodesToCopy, referenceResolver);
                }
                continue;
            }
        }
        if (typescript_1.default.isIdentifier(element)) {
            // `BrowserAnimationsModule` can be replaced with `provideAnimations`.
            const animationsModule = 'platform-browser/animations';
            const animationsImport = `@angular/${animationsModule}`;
            if ((0, util_1.isClassReferenceInAngularModule)(element, 'BrowserAnimationsModule', animationsModule, typeChecker)) {
                providersInNewCall.push(typescript_1.default.factory.createCallExpression(tracker.addImport(sourceFile, 'provideAnimations', animationsImport), [], []));
                continue;
            }
            // `NoopAnimationsModule` can be replaced with `provideNoopAnimations`.
            if ((0, util_1.isClassReferenceInAngularModule)(element, 'NoopAnimationsModule', animationsModule, typeChecker)) {
                providersInNewCall.push(typescript_1.default.factory.createCallExpression(tracker.addImport(sourceFile, 'provideNoopAnimations', animationsImport), [], []));
                continue;
            }
            // `HttpClientModule` can be replaced with `provideHttpClient()`.
            const httpClientModule = 'common/http';
            const httpClientImport = `@angular/${httpClientModule}`;
            if ((0, util_1.isClassReferenceInAngularModule)(element, 'HttpClientModule', httpClientModule, typeChecker)) {
                const callArgs = [
                    // we add `withInterceptorsFromDi()` to the call to ensure that class-based interceptors
                    // still work
                    typescript_1.default.factory.createCallExpression(tracker.addImport(sourceFile, 'withInterceptorsFromDi', httpClientImport), [], []),
                ];
                providersInNewCall.push(typescript_1.default.factory.createCallExpression(tracker.addImport(sourceFile, 'provideHttpClient', httpClientImport), [], callArgs));
                continue;
            }
        }
        const target = 
        // If it's a call, it'll likely be a `ModuleWithProviders`
        // expression so the target is going to be call's expression.
        typescript_1.default.isCallExpression(element) && typescript_1.default.isPropertyAccessExpression(element.expression)
            ? element.expression.expression
            : element;
        const classDeclaration = (0, util_1.findClassDeclaration)(target, typeChecker);
        const decorators = classDeclaration
            ? (0, ng_decorators_1.getAngularDecorators)(typeChecker, typescript_1.default.getDecorators(classDeclaration) || [])
            : undefined;
        if (!decorators ||
            decorators.length === 0 ||
            decorators.every(({ name }) => name !== 'Directive' && name !== 'Component' && name !== 'Pipe')) {
            importsForNewCall.push(element);
            addNodesToCopy(sourceFile, element, nodeLookup, tracker, nodesToCopy, referenceResolver);
        }
    }
}
/**
 * Generates the call expressions that can be used to replace the options
 * object that is passed into a `RouterModule.forRoot` call.
 * @param sourceFile File that the `forRoot` call is coming from.
 * @param options Node that is passed as the second argument to the `forRoot` call.
 * @param tracker Tracker in which to track imports that need to be inserted.
 * @returns Null if the options can't be migrated, otherwise an array of call expressions.
 */
function getRouterModuleForRootFeatures(sourceFile, options, tracker) {
    // Options that aren't a static object literal can't be migrated.
    if (!typescript_1.default.isObjectLiteralExpression(options)) {
        return null;
    }
    const featureExpressions = [];
    const configOptions = [];
    const inMemoryScrollingOptions = [];
    const features = new util_1.UniqueItemTracker();
    for (const prop of options.properties) {
        // We can't migrate options that we can't easily analyze.
        if (!typescript_1.default.isPropertyAssignment(prop) ||
            (!typescript_1.default.isIdentifier(prop.name) && !typescript_1.default.isStringLiteralLike(prop.name))) {
            return null;
        }
        switch (prop.name.text) {
            // `preloadingStrategy` maps to the `withPreloading` function.
            case 'preloadingStrategy':
                features.track('withPreloading', prop.initializer);
                break;
            // `enableTracing: true` maps to the `withDebugTracing` feature.
            case 'enableTracing':
                if (prop.initializer.kind === typescript_1.default.SyntaxKind.TrueKeyword) {
                    features.track('withDebugTracing', null);
                }
                break;
            // `initialNavigation: 'enabled'` and `initialNavigation: 'enabledBlocking'` map to the
            // `withEnabledBlockingInitialNavigation` feature, while `initialNavigation: 'disabled'` maps
            // to the `withDisabledInitialNavigation` feature.
            case 'initialNavigation':
                if (!typescript_1.default.isStringLiteralLike(prop.initializer)) {
                    return null;
                }
                if (prop.initializer.text === 'enabledBlocking' || prop.initializer.text === 'enabled') {
                    features.track('withEnabledBlockingInitialNavigation', null);
                }
                else if (prop.initializer.text === 'disabled') {
                    features.track('withDisabledInitialNavigation', null);
                }
                break;
            // `useHash: true` maps to the `withHashLocation` feature.
            case 'useHash':
                if (prop.initializer.kind === typescript_1.default.SyntaxKind.TrueKeyword) {
                    features.track('withHashLocation', null);
                }
                break;
            // `errorHandler` maps to the `withNavigationErrorHandler` feature.
            case 'errorHandler':
                features.track('withNavigationErrorHandler', prop.initializer);
                break;
            // `anchorScrolling` and `scrollPositionRestoration` arguments have to be combined into an
            // object literal that is passed into the `withInMemoryScrolling` feature.
            case 'anchorScrolling':
            case 'scrollPositionRestoration':
                inMemoryScrollingOptions.push(prop);
                break;
            // All remaining properties can be passed through the `withRouterConfig` feature.
            default:
                configOptions.push(prop);
                break;
        }
    }
    if (inMemoryScrollingOptions.length > 0) {
        features.track('withInMemoryScrolling', typescript_1.default.factory.createObjectLiteralExpression(inMemoryScrollingOptions));
    }
    if (configOptions.length > 0) {
        features.track('withRouterConfig', typescript_1.default.factory.createObjectLiteralExpression(configOptions));
    }
    for (const [feature, featureArgs] of features.getEntries()) {
        const callArgs = [];
        featureArgs.forEach((arg) => {
            if (arg !== null) {
                callArgs.push(arg);
            }
        });
        featureExpressions.push(typescript_1.default.factory.createCallExpression(tracker.addImport(sourceFile, feature, '@angular/router'), [], callArgs));
    }
    return featureExpressions;
}
/**
 * Finds all the nodes that are referenced inside a root node and would need to be copied into a
 * new file in order for the node to compile, and tracks them.
 * @param targetFile File to which the nodes will be copied.
 * @param rootNode Node within which to look for references.
 * @param nodeLookup Map used to look up nodes based on their positions in a file.
 * @param tracker Tracker in which changes to files are stored.
 * @param nodesToCopy Set that keeps track of the nodes being copied.
 * @param referenceResolver
 */
function addNodesToCopy(targetFile, rootNode, nodeLookup, tracker, nodesToCopy, referenceResolver) {
    const refs = findAllSameFileReferences(rootNode, nodeLookup, referenceResolver);
    for (const ref of refs) {
        const importSpecifier = (0, util_1.closestOrSelf)(ref, typescript_1.default.isImportSpecifier);
        const importDeclaration = importSpecifier
            ? (0, nodes_1.closestNode)(importSpecifier, typescript_1.default.isImportDeclaration)
            : null;
        // If the reference is in an import, we need to add an import to the main file.
        if (importDeclaration &&
            importSpecifier &&
            typescript_1.default.isStringLiteralLike(importDeclaration.moduleSpecifier)) {
            const moduleName = importDeclaration.moduleSpecifier.text.startsWith('.')
                ? remapRelativeImport(targetFile.fileName, importDeclaration.moduleSpecifier)
                : importDeclaration.moduleSpecifier.text;
            const symbolName = importSpecifier.propertyName
                ? importSpecifier.propertyName.text
                : importSpecifier.name.text;
            const alias = importSpecifier.propertyName ? importSpecifier.name.text : undefined;
            tracker.addImport(targetFile, symbolName, moduleName, alias);
            continue;
        }
        const variableDeclaration = (0, util_1.closestOrSelf)(ref, typescript_1.default.isVariableDeclaration);
        const variableStatement = variableDeclaration
            ? (0, nodes_1.closestNode)(variableDeclaration, typescript_1.default.isVariableStatement)
            : null;
        // If the reference is a variable, we can attempt to import it or copy it over.
        if (variableDeclaration && variableStatement && typescript_1.default.isIdentifier(variableDeclaration.name)) {
            if (isExported(variableStatement)) {
                tracker.addImport(targetFile, variableDeclaration.name.text, (0, util_1.getRelativeImportPath)(targetFile.fileName, ref.getSourceFile().fileName));
            }
            else {
                nodesToCopy.add(variableStatement);
            }
            continue;
        }
        // Otherwise check if the reference is inside of an exportable declaration, e.g. a function.
        // This code that is safe to copy over into the new file or import it, if it's exported.
        const closestExportable = (0, util_1.closestOrSelf)(ref, isExportableDeclaration);
        if (closestExportable) {
            if (isExported(closestExportable) && closestExportable.name) {
                tracker.addImport(targetFile, closestExportable.name.text, (0, util_1.getRelativeImportPath)(targetFile.fileName, ref.getSourceFile().fileName));
            }
            else {
                nodesToCopy.add(closestExportable);
            }
        }
    }
}
/**
 * Finds all the nodes referenced within the root node in the same file.
 * @param rootNode Node from which to start looking for references.
 * @param nodeLookup Map used to look up nodes based on their positions in a file.
 * @param referenceResolver
 */
function findAllSameFileReferences(rootNode, nodeLookup, referenceResolver) {
    const results = new Set();
    const traversedTopLevelNodes = new Set();
    const excludeStart = rootNode.getStart();
    const excludeEnd = rootNode.getEnd();
    (function walk(node) {
        if (!isReferenceIdentifier(node)) {
            node.forEachChild(walk);
            return;
        }
        const refs = referencesToNodeWithinSameFile(node, nodeLookup, excludeStart, excludeEnd, referenceResolver);
        if (refs === null) {
            return;
        }
        for (const ref of refs) {
            if (results.has(ref)) {
                continue;
            }
            results.add(ref);
            const closestTopLevel = (0, nodes_1.closestNode)(ref, isTopLevelStatement);
            // Avoid re-traversing the same top-level nodes since we know what the result will be.
            if (!closestTopLevel || traversedTopLevelNodes.has(closestTopLevel)) {
                continue;
            }
            // Keep searching, starting from the closest top-level node. We skip import declarations,
            // because we already know about them and they may put the search into an infinite loop.
            if (!typescript_1.default.isImportDeclaration(closestTopLevel) &&
                isOutsideRange(excludeStart, excludeEnd, closestTopLevel.getStart(), closestTopLevel.getEnd())) {
                traversedTopLevelNodes.add(closestTopLevel);
                walk(closestTopLevel);
            }
        }
    })(rootNode);
    return results;
}
/**
 * Finds all the nodes referring to a specific node within the same file.
 * @param node Node whose references we're lookip for.
 * @param nodeLookup Map used to look up nodes based on their positions in a file.
 * @param excludeStart Start of a range that should be excluded from the results.
 * @param excludeEnd End of a range that should be excluded from the results.
 * @param referenceResolver
 */
function referencesToNodeWithinSameFile(node, nodeLookup, excludeStart, excludeEnd, referenceResolver) {
    const offsets = referenceResolver
        .findSameFileReferences(node, node.getSourceFile().fileName)
        .filter(([start, end]) => isOutsideRange(excludeStart, excludeEnd, start, end));
    if (offsets.length > 0) {
        const nodes = (0, util_1.offsetsToNodes)(nodeLookup, offsets, new Set());
        if (nodes.size > 0) {
            return nodes;
        }
    }
    return null;
}
/**
 * Transforms a node so that any dynamic imports with relative file paths it contains are remapped
 * as if they were specified in a different file. If no transformations have occurred, the original
 * node will be returned.
 * @param targetFileName File name to which to remap the imports.
 * @param rootNode Node being transformed.
 */
function remapDynamicImports(targetFileName, rootNode) {
    let hasChanged = false;
    const transformer = (context) => {
        return (sourceFile) => typescript_1.default.visitNode(sourceFile, function walk(node) {
            if (typescript_1.default.isCallExpression(node) &&
                node.expression.kind === typescript_1.default.SyntaxKind.ImportKeyword &&
                node.arguments.length > 0 &&
                typescript_1.default.isStringLiteralLike(node.arguments[0]) &&
                node.arguments[0].text.startsWith('.')) {
                hasChanged = true;
                return context.factory.updateCallExpression(node, node.expression, node.typeArguments, [
                    context.factory.createStringLiteral(remapRelativeImport(targetFileName, node.arguments[0])),
                    ...node.arguments.slice(1),
                ]);
            }
            return typescript_1.default.visitEachChild(node, walk, context);
        });
    };
    const result = typescript_1.default.transform(rootNode, [transformer]).transformed[0];
    return hasChanged ? result : rootNode;
}
/**
 * Checks whether a node is a statement at the top level of a file.
 * @param node Node to be checked.
 */
function isTopLevelStatement(node) {
    return node.parent != null && typescript_1.default.isSourceFile(node.parent);
}
/**
 * Asserts that a node is an identifier that might be referring to a symbol. This excludes
 * identifiers of named nodes like property assignments.
 * @param node Node to be checked.
 */
function isReferenceIdentifier(node) {
    return (typescript_1.default.isIdentifier(node) &&
        ((!typescript_1.default.isPropertyAssignment(node.parent) && !typescript_1.default.isParameter(node.parent)) ||
            node.parent.name !== node));
}
/**
 * Checks whether a range is completely outside of another range.
 * @param excludeStart Start of the exclusion range.
 * @param excludeEnd End of the exclusion range.
 * @param start Start of the range that is being checked.
 * @param end End of the range that is being checked.
 */
function isOutsideRange(excludeStart, excludeEnd, start, end) {
    return (start < excludeStart && end < excludeStart) || start > excludeEnd;
}
/**
 * Remaps the specifier of a relative import from its original location to a new one.
 * @param targetFileName Name of the file that the specifier will be moved to.
 * @param specifier Specifier whose path is being remapped.
 */
function remapRelativeImport(targetFileName, specifier) {
    return (0, util_1.getRelativeImportPath)(targetFileName, (0, path_1.join)((0, path_1.dirname)(specifier.getSourceFile().fileName), specifier.text));
}
/**
 * Whether a node is exported.
 * @param node Node to be checked.
 */
function isExported(node) {
    return typescript_1.default.canHaveModifiers(node) && node.modifiers
        ? node.modifiers.some((modifier) => modifier.kind === typescript_1.default.SyntaxKind.ExportKeyword)
        : false;
}
/**
 * Asserts that a node is an exportable declaration, which means that it can either be exported or
 * it can be safely copied into another file.
 * @param node Node to be checked.
 */
function isExportableDeclaration(node) {
    return (typescript_1.default.isEnumDeclaration(node) ||
        typescript_1.default.isClassDeclaration(node) ||
        typescript_1.default.isFunctionDeclaration(node) ||
        typescript_1.default.isInterfaceDeclaration(node) ||
        typescript_1.default.isTypeAliasDeclaration(node));
}
/**
 * Gets the index after the last import in a file. Can be used to insert new code into the file.
 * @param sourceFile File in which to search for imports.
 */
function getLastImportEnd(sourceFile) {
    let index = 0;
    for (const statement of sourceFile.statements) {
        if (typescript_1.default.isImportDeclaration(statement)) {
            index = Math.max(index, statement.getEnd());
        }
        else {
            break;
        }
    }
    return index;
}
/** Checks if any of the program's files has an import of a specific module. */
function hasImport(program, rootFileNames, moduleName) {
    const tsProgram = program.getTsProgram();
    const deepImportStart = moduleName + '/';
    for (const fileName of rootFileNames) {
        const sourceFile = tsProgram.getSourceFile(fileName);
        if (!sourceFile) {
            continue;
        }
        for (const statement of sourceFile.statements) {
            if (typescript_1.default.isImportDeclaration(statement) &&
                typescript_1.default.isStringLiteralLike(statement.moduleSpecifier) &&
                (statement.moduleSpecifier.text === moduleName ||
                    statement.moduleSpecifier.text.startsWith(deepImportStart))) {
                return true;
            }
        }
    }
    return false;
}
