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
exports.toStandalone = toStandalone;
exports.convertNgModuleDeclarationToStandalone = convertNgModuleDeclarationToStandalone;
exports.potentialImportsToExpressions = potentialImportsToExpressions;
exports.findImportLocation = findImportLocation;
exports.findTestObjectsToMigrate = findTestObjectsToMigrate;
exports.findTemplateDependencies = findTemplateDependencies;
exports.extractDeclarationsFromModule = extractDeclarationsFromModule;
exports.migrateTestDeclarations = migrateTestDeclarations;
const migrations_1 = require("@angular/compiler-cli/private/migrations");
const typescript_1 = __importDefault(require("typescript"));
const change_tracker_1 = require("../../utils/change_tracker");
const ng_decorators_1 = require("../../utils/ng_decorators");
const imports_1 = require("../../utils/typescript/imports");
const nodes_1 = require("../../utils/typescript/nodes");
const util_1 = require("./util");
/**
 * Converts all declarations in the specified files to standalone.
 * @param sourceFiles Files that should be migrated.
 * @param program
 * @param printer
 * @param fileImportRemapper Optional function that can be used to remap file-level imports.
 * @param declarationImportRemapper Optional function that can be used to remap declaration-level
 * imports.
 */
function toStandalone(sourceFiles, program, printer, fileImportRemapper, declarationImportRemapper) {
    const templateTypeChecker = program.compiler.getTemplateTypeChecker();
    const typeChecker = program.getTsProgram().getTypeChecker();
    const modulesToMigrate = new Set();
    const testObjectsToMigrate = new Set();
    const declarations = new Set();
    const tracker = new change_tracker_1.ChangeTracker(printer, fileImportRemapper);
    for (const sourceFile of sourceFiles) {
        const modules = findNgModuleClassesToMigrate(sourceFile, typeChecker);
        const testObjects = findTestObjectsToMigrate(sourceFile, typeChecker);
        for (const module of modules) {
            const allModuleDeclarations = extractDeclarationsFromModule(module, templateTypeChecker);
            const unbootstrappedDeclarations = filterNonBootstrappedDeclarations(allModuleDeclarations, module, templateTypeChecker, typeChecker);
            if (unbootstrappedDeclarations.length > 0) {
                modulesToMigrate.add(module);
                unbootstrappedDeclarations.forEach((decl) => declarations.add(decl));
            }
        }
        testObjects.forEach((obj) => testObjectsToMigrate.add(obj));
    }
    for (const declaration of declarations) {
        convertNgModuleDeclarationToStandalone(declaration, declarations, tracker, templateTypeChecker, declarationImportRemapper);
    }
    for (const node of modulesToMigrate) {
        migrateNgModuleClass(node, declarations, tracker, typeChecker, templateTypeChecker);
    }
    migrateTestDeclarations(testObjectsToMigrate, declarations, tracker, templateTypeChecker, typeChecker);
    return tracker.recordChanges();
}
/**
 * Converts a single declaration defined through an NgModule to standalone.
 * @param decl Declaration being converted.
 * @param tracker Tracker used to track the file changes.
 * @param allDeclarations All the declarations that are being converted as a part of this migration.
 * @param typeChecker
 * @param importRemapper
 */
function convertNgModuleDeclarationToStandalone(decl, allDeclarations, tracker, typeChecker, importRemapper) {
    var _a;
    const directiveMeta = typeChecker.getDirectiveMetadata(decl);
    if (directiveMeta && directiveMeta.decorator && !directiveMeta.isStandalone) {
        let decorator = markDecoratorAsStandalone(directiveMeta.decorator);
        if (directiveMeta.isComponent) {
            const importsToAdd = getComponentImportExpressions(decl, allDeclarations, tracker, typeChecker, importRemapper);
            if (importsToAdd.length > 0) {
                const hasTrailingComma = importsToAdd.length > 2 &&
                    !!((_a = extractMetadataLiteral(directiveMeta.decorator)) === null || _a === void 0 ? void 0 : _a.properties.hasTrailingComma);
                decorator = setPropertyOnAngularDecorator(decorator, 'imports', typescript_1.default.factory.createArrayLiteralExpression(
                // Create a multi-line array when it has a trailing comma.
                typescript_1.default.factory.createNodeArray(importsToAdd, hasTrailingComma), hasTrailingComma));
            }
        }
        tracker.replaceNode(directiveMeta.decorator, decorator);
    }
    else {
        const pipeMeta = typeChecker.getPipeMetadata(decl);
        if (pipeMeta && pipeMeta.decorator && !pipeMeta.isStandalone) {
            tracker.replaceNode(pipeMeta.decorator, markDecoratorAsStandalone(pipeMeta.decorator));
        }
    }
}
/**
 * Gets the expressions that should be added to a component's
 * `imports` array based on its template dependencies.
 * @param decl Component class declaration.
 * @param allDeclarations All the declarations that are being converted as a part of this migration.
 * @param tracker
 * @param typeChecker
 * @param importRemapper
 */
function getComponentImportExpressions(decl, allDeclarations, tracker, typeChecker, importRemapper) {
    const templateDependencies = findTemplateDependencies(decl, typeChecker);
    const usedDependenciesInMigration = new Set(templateDependencies.filter((dep) => allDeclarations.has(dep.node)));
    const seenImports = new Set();
    const resolvedDependencies = [];
    for (const dep of templateDependencies) {
        const importLocation = findImportLocation(dep, decl, usedDependenciesInMigration.has(dep)
            ? migrations_1.PotentialImportMode.ForceDirect
            : migrations_1.PotentialImportMode.Normal, typeChecker);
        if (importLocation && !seenImports.has(importLocation.symbolName)) {
            seenImports.add(importLocation.symbolName);
            resolvedDependencies.push(importLocation);
        }
    }
    return potentialImportsToExpressions(resolvedDependencies, decl.getSourceFile(), tracker, importRemapper);
}
/**
 * Converts an array of potential imports to an array of expressions that can be
 * added to the `imports` array.
 * @param potentialImports Imports to be converted.
 * @param component Component class to which the imports will be added.
 * @param tracker
 * @param importRemapper
 */
function potentialImportsToExpressions(potentialImports, toFile, tracker, importRemapper) {
    const processedDependencies = importRemapper
        ? importRemapper(potentialImports)
        : potentialImports;
    return processedDependencies.map((importLocation) => {
        if (importLocation.moduleSpecifier) {
            return tracker.addImport(toFile, importLocation.symbolName, importLocation.moduleSpecifier);
        }
        const identifier = typescript_1.default.factory.createIdentifier(importLocation.symbolName);
        if (!importLocation.isForwardReference) {
            return identifier;
        }
        const forwardRefExpression = tracker.addImport(toFile, 'forwardRef', '@angular/core');
        const arrowFunction = typescript_1.default.factory.createArrowFunction(undefined, undefined, [], undefined, undefined, identifier);
        return typescript_1.default.factory.createCallExpression(forwardRefExpression, undefined, [arrowFunction]);
    });
}
/**
 * Moves all of the declarations of a class decorated with `@NgModule` to its imports.
 * @param node Class being migrated.
 * @param allDeclarations All the declarations that are being converted as a part of this migration.
 * @param tracker
 * @param typeChecker
 * @param templateTypeChecker
 */
function migrateNgModuleClass(node, allDeclarations, tracker, typeChecker, templateTypeChecker) {
    var _a;
    const decorator = (_a = templateTypeChecker.getNgModuleMetadata(node)) === null || _a === void 0 ? void 0 : _a.decorator;
    const metadata = decorator ? extractMetadataLiteral(decorator) : null;
    if (metadata) {
        moveDeclarationsToImports(metadata, allDeclarations, typeChecker, templateTypeChecker, tracker);
    }
}
/**
 * Moves all the symbol references from the `declarations` array to the `imports`
 * array of an `NgModule` class and removes the `declarations`.
 * @param literal Object literal used to configure the module that should be migrated.
 * @param allDeclarations All the declarations that are being converted as a part of this migration.
 * @param typeChecker
 * @param tracker
 */
function moveDeclarationsToImports(literal, allDeclarations, typeChecker, templateTypeChecker, tracker) {
    const declarationsProp = (0, util_1.findLiteralProperty)(literal, 'declarations');
    if (!declarationsProp) {
        return;
    }
    const declarationsToPreserve = [];
    const declarationsToCopy = [];
    const properties = [];
    const importsProp = (0, util_1.findLiteralProperty)(literal, 'imports');
    const hasAnyArrayTrailingComma = literal.properties.some((prop) => typescript_1.default.isPropertyAssignment(prop) &&
        typescript_1.default.isArrayLiteralExpression(prop.initializer) &&
        prop.initializer.elements.hasTrailingComma);
    // Separate the declarations that we want to keep and ones we need to copy into the `imports`.
    if (typescript_1.default.isPropertyAssignment(declarationsProp)) {
        // If the declarations are an array, we can analyze it to
        // find any classes from the current migration.
        if (typescript_1.default.isArrayLiteralExpression(declarationsProp.initializer)) {
            for (const el of declarationsProp.initializer.elements) {
                if (typescript_1.default.isIdentifier(el)) {
                    const correspondingClass = (0, util_1.findClassDeclaration)(el, typeChecker);
                    if (!correspondingClass ||
                        // Check whether the declaration is either standalone already or is being converted
                        // in this migration. We need to check if it's standalone already, in order to correct
                        // some cases where the main app and the test files are being migrated in separate
                        // programs.
                        isStandaloneDeclaration(correspondingClass, allDeclarations, templateTypeChecker)) {
                        declarationsToCopy.push(el);
                    }
                    else {
                        declarationsToPreserve.push(el);
                    }
                }
                else {
                    declarationsToCopy.push(el);
                }
            }
        }
        else {
            // Otherwise create a spread that will be copied into the `imports`.
            declarationsToCopy.push(typescript_1.default.factory.createSpreadElement(declarationsProp.initializer));
        }
    }
    // If there are no `imports`, create them with the declarations we want to copy.
    if (!importsProp && declarationsToCopy.length > 0) {
        properties.push(typescript_1.default.factory.createPropertyAssignment('imports', typescript_1.default.factory.createArrayLiteralExpression(typescript_1.default.factory.createNodeArray(declarationsToCopy, hasAnyArrayTrailingComma && declarationsToCopy.length > 2))));
    }
    for (const prop of literal.properties) {
        if (!isNamedPropertyAssignment(prop)) {
            properties.push(prop);
            continue;
        }
        // If we have declarations to preserve, update the existing property, otherwise drop it.
        if (prop === declarationsProp) {
            if (declarationsToPreserve.length > 0) {
                const hasTrailingComma = typescript_1.default.isArrayLiteralExpression(prop.initializer)
                    ? prop.initializer.elements.hasTrailingComma
                    : hasAnyArrayTrailingComma;
                properties.push(typescript_1.default.factory.updatePropertyAssignment(prop, prop.name, typescript_1.default.factory.createArrayLiteralExpression(typescript_1.default.factory.createNodeArray(declarationsToPreserve, hasTrailingComma && declarationsToPreserve.length > 2))));
            }
            continue;
        }
        // If we have an `imports` array and declarations
        // that should be copied, we merge the two arrays.
        if (prop === importsProp && declarationsToCopy.length > 0) {
            let initializer;
            if (typescript_1.default.isArrayLiteralExpression(prop.initializer)) {
                initializer = typescript_1.default.factory.updateArrayLiteralExpression(prop.initializer, typescript_1.default.factory.createNodeArray([...prop.initializer.elements, ...declarationsToCopy], prop.initializer.elements.hasTrailingComma));
            }
            else {
                initializer = typescript_1.default.factory.createArrayLiteralExpression(typescript_1.default.factory.createNodeArray([typescript_1.default.factory.createSpreadElement(prop.initializer), ...declarationsToCopy], 
                // Expect the declarations to be greater than 1 since
                // we have the pre-existing initializer already.
                hasAnyArrayTrailingComma && declarationsToCopy.length > 1));
            }
            properties.push(typescript_1.default.factory.updatePropertyAssignment(prop, prop.name, initializer));
            continue;
        }
        // Retain any remaining properties.
        properties.push(prop);
    }
    tracker.replaceNode(literal, typescript_1.default.factory.updateObjectLiteralExpression(literal, typescript_1.default.factory.createNodeArray(properties, literal.properties.hasTrailingComma)), typescript_1.default.EmitHint.Expression);
}
/** Sets a decorator node to be standalone. */
function markDecoratorAsStandalone(node) {
    const metadata = extractMetadataLiteral(node);
    if (metadata === null || !typescript_1.default.isCallExpression(node.expression)) {
        return node;
    }
    const standaloneProp = metadata.properties.find((prop) => {
        return isNamedPropertyAssignment(prop) && prop.name.text === 'standalone';
    });
    // In v19 standalone is the default so don't do anything if there's no `standalone`
    // property or it's initialized to anything other than `false`.
    if (!standaloneProp || standaloneProp.initializer.kind !== typescript_1.default.SyntaxKind.FalseKeyword) {
        return node;
    }
    const newProperties = metadata.properties.filter((element) => element !== standaloneProp);
    // Use `createDecorator` instead of `updateDecorator`, because
    // the latter ends up duplicating the node's leading comment.
    return typescript_1.default.factory.createDecorator(typescript_1.default.factory.createCallExpression(node.expression.expression, node.expression.typeArguments, [
        typescript_1.default.factory.createObjectLiteralExpression(typescript_1.default.factory.createNodeArray(newProperties, metadata.properties.hasTrailingComma), newProperties.length > 1),
    ]));
}
/**
 * Sets a property on an Angular decorator node. If the property
 * already exists, its initializer will be replaced.
 * @param node Decorator to which to add the property.
 * @param name Name of the property to be added.
 * @param initializer Initializer for the new property.
 */
function setPropertyOnAngularDecorator(node, name, initializer) {
    // Invalid decorator.
    if (!typescript_1.default.isCallExpression(node.expression) || node.expression.arguments.length > 1) {
        return node;
    }
    let literalProperties;
    let hasTrailingComma = false;
    if (node.expression.arguments.length === 0) {
        literalProperties = [typescript_1.default.factory.createPropertyAssignment(name, initializer)];
    }
    else if (typescript_1.default.isObjectLiteralExpression(node.expression.arguments[0])) {
        const literal = node.expression.arguments[0];
        const existingProperty = (0, util_1.findLiteralProperty)(literal, name);
        hasTrailingComma = literal.properties.hasTrailingComma;
        if (existingProperty && typescript_1.default.isPropertyAssignment(existingProperty)) {
            literalProperties = literal.properties.slice();
            literalProperties[literalProperties.indexOf(existingProperty)] =
                typescript_1.default.factory.updatePropertyAssignment(existingProperty, existingProperty.name, initializer);
        }
        else {
            literalProperties = [
                ...literal.properties,
                typescript_1.default.factory.createPropertyAssignment(name, initializer),
            ];
        }
    }
    else {
        // Unsupported case (e.g. `@Component(SOME_CONST)`). Return the original node.
        return node;
    }
    // Use `createDecorator` instead of `updateDecorator`, because
    // the latter ends up duplicating the node's leading comment.
    return typescript_1.default.factory.createDecorator(typescript_1.default.factory.createCallExpression(node.expression.expression, node.expression.typeArguments, [
        typescript_1.default.factory.createObjectLiteralExpression(typescript_1.default.factory.createNodeArray(literalProperties, hasTrailingComma), literalProperties.length > 1),
    ]));
}
/** Checks if a node is a `PropertyAssignment` with a name. */
function isNamedPropertyAssignment(node) {
    return typescript_1.default.isPropertyAssignment(node) && node.name && typescript_1.default.isIdentifier(node.name);
}
/**
 * Finds the import from which to bring in a template dependency of a component.
 * @param target Dependency that we're searching for.
 * @param inContext Component in which the dependency is used.
 * @param importMode Mode in which to resolve the import target.
 * @param typeChecker
 */
function findImportLocation(target, inContext, importMode, typeChecker) {
    const importLocations = typeChecker.getPotentialImportsFor(target, inContext, importMode);
    let firstSameFileImport = null;
    let firstModuleImport = null;
    for (const location of importLocations) {
        // Prefer a standalone import, if we can find one.
        // Otherwise fall back to the first module-based import.
        if (location.kind === migrations_1.PotentialImportKind.Standalone) {
            return location;
        }
        if (!location.moduleSpecifier && !firstSameFileImport) {
            firstSameFileImport = location;
        }
        if (location.kind === migrations_1.PotentialImportKind.NgModule &&
            !firstModuleImport &&
            // ɵ is used for some internal Angular modules that we want to skip over.
            !location.symbolName.startsWith('ɵ')) {
            firstModuleImport = location;
        }
    }
    return firstSameFileImport || firstModuleImport || importLocations[0] || null;
}
/**
 * Checks whether a node is an `NgModule` metadata element with at least one element.
 * E.g. `declarations: [Foo]` or `declarations: SOME_VAR` would match this description,
 * but not `declarations: []`.
 */
function hasNgModuleMetadataElements(node) {
    return (typescript_1.default.isPropertyAssignment(node) &&
        (!typescript_1.default.isArrayLiteralExpression(node.initializer) || node.initializer.elements.length > 0));
}
/** Finds all modules whose declarations can be migrated. */
function findNgModuleClassesToMigrate(sourceFile, typeChecker) {
    const modules = [];
    if ((0, imports_1.getImportSpecifier)(sourceFile, '@angular/core', 'NgModule')) {
        sourceFile.forEachChild(function walk(node) {
            if (typescript_1.default.isClassDeclaration(node)) {
                const decorator = (0, ng_decorators_1.getAngularDecorators)(typeChecker, typescript_1.default.getDecorators(node) || []).find((current) => current.name === 'NgModule');
                const metadata = decorator ? extractMetadataLiteral(decorator.node) : null;
                if (metadata) {
                    const declarations = (0, util_1.findLiteralProperty)(metadata, 'declarations');
                    if (declarations != null && hasNgModuleMetadataElements(declarations)) {
                        modules.push(node);
                    }
                }
            }
            node.forEachChild(walk);
        });
    }
    return modules;
}
/** Finds all testing object literals that need to be migrated. */
function findTestObjectsToMigrate(sourceFile, typeChecker) {
    const testObjects = [];
    const { testBed, catalyst } = (0, util_1.getTestingImports)(sourceFile);
    if (testBed || catalyst) {
        sourceFile.forEachChild(function walk(node) {
            if ((0, util_1.isTestCall)(typeChecker, node, testBed, catalyst)) {
                const config = node.arguments[0];
                const declarations = (0, util_1.findLiteralProperty)(config, 'declarations');
                if (declarations &&
                    typescript_1.default.isPropertyAssignment(declarations) &&
                    typescript_1.default.isArrayLiteralExpression(declarations.initializer) &&
                    declarations.initializer.elements.length > 0) {
                    testObjects.push(config);
                }
            }
            node.forEachChild(walk);
        });
    }
    return testObjects;
}
/**
 * Finds the classes corresponding to dependencies used in a component's template.
 * @param decl Component in whose template we're looking for dependencies.
 * @param typeChecker
 */
function findTemplateDependencies(decl, typeChecker) {
    const results = [];
    const usedDirectives = typeChecker.getUsedDirectives(decl);
    const usedPipes = typeChecker.getUsedPipes(decl);
    if (usedDirectives !== null) {
        for (const dir of usedDirectives) {
            if (typescript_1.default.isClassDeclaration(dir.ref.node)) {
                results.push(dir.ref);
            }
        }
    }
    if (usedPipes !== null) {
        const potentialPipes = typeChecker.getPotentialPipes(decl);
        for (const pipe of potentialPipes) {
            if (typescript_1.default.isClassDeclaration(pipe.ref.node) &&
                usedPipes.some((current) => pipe.name === current)) {
                results.push(pipe.ref);
            }
        }
    }
    return results;
}
/**
 * Removes any declarations that are a part of a module's `bootstrap`
 * array from an array of declarations.
 * @param declarations Anaalyzed declarations of the module.
 * @param ngModule Module whote declarations are being filtered.
 * @param templateTypeChecker
 * @param typeChecker
 */
function filterNonBootstrappedDeclarations(declarations, ngModule, templateTypeChecker, typeChecker) {
    const metadata = templateTypeChecker.getNgModuleMetadata(ngModule);
    const metaLiteral = metadata && metadata.decorator ? extractMetadataLiteral(metadata.decorator) : null;
    const bootstrapProp = metaLiteral ? (0, util_1.findLiteralProperty)(metaLiteral, 'bootstrap') : null;
    // If there's no `bootstrap`, we can't filter.
    if (!bootstrapProp) {
        return declarations;
    }
    // If we can't analyze the `bootstrap` property, we can't safely determine which
    // declarations aren't bootstrapped so we assume that all of them are.
    if (!typescript_1.default.isPropertyAssignment(bootstrapProp) ||
        !typescript_1.default.isArrayLiteralExpression(bootstrapProp.initializer)) {
        return [];
    }
    const bootstrappedClasses = new Set();
    for (const el of bootstrapProp.initializer.elements) {
        const referencedClass = typescript_1.default.isIdentifier(el) ? (0, util_1.findClassDeclaration)(el, typeChecker) : null;
        // If we can resolve an element to a class, we can filter it out,
        // otherwise assume that the array isn't static.
        if (referencedClass) {
            bootstrappedClasses.add(referencedClass);
        }
        else {
            return [];
        }
    }
    return declarations.filter((ref) => !bootstrappedClasses.has(ref));
}
/**
 * Extracts all classes that are referenced in a module's `declarations` array.
 * @param ngModule Module whose declarations are being extraced.
 * @param templateTypeChecker
 */
function extractDeclarationsFromModule(ngModule, templateTypeChecker) {
    const metadata = templateTypeChecker.getNgModuleMetadata(ngModule);
    return metadata
        ? metadata.declarations
            .filter((decl) => typescript_1.default.isClassDeclaration(decl.node))
            .map((decl) => decl.node)
        : [];
}
/**
 * Migrates the `declarations` from a unit test file to standalone.
 * @param testObjects Object literals used to configure the testing modules.
 * @param declarationsOutsideOfTestFiles Non-testing declarations that are part of this migration.
 * @param tracker
 * @param templateTypeChecker
 * @param typeChecker
 */
function migrateTestDeclarations(testObjects, declarationsOutsideOfTestFiles, tracker, templateTypeChecker, typeChecker) {
    var _a;
    const { decorators, componentImports } = analyzeTestingModules(testObjects, typeChecker);
    const allDeclarations = new Set(declarationsOutsideOfTestFiles);
    for (const decorator of decorators) {
        const closestClass = (0, nodes_1.closestNode)(decorator.node, typescript_1.default.isClassDeclaration);
        if (decorator.name === 'Pipe' || decorator.name === 'Directive') {
            tracker.replaceNode(decorator.node, markDecoratorAsStandalone(decorator.node));
            if (closestClass) {
                allDeclarations.add(closestClass);
            }
        }
        else if (decorator.name === 'Component') {
            const newDecorator = markDecoratorAsStandalone(decorator.node);
            const importsToAdd = componentImports.get(decorator.node);
            if (closestClass) {
                allDeclarations.add(closestClass);
            }
            if (importsToAdd && importsToAdd.size > 0) {
                const hasTrailingComma = importsToAdd.size > 2 &&
                    !!((_a = extractMetadataLiteral(decorator.node)) === null || _a === void 0 ? void 0 : _a.properties.hasTrailingComma);
                const importsArray = typescript_1.default.factory.createNodeArray(Array.from(importsToAdd), hasTrailingComma);
                tracker.replaceNode(decorator.node, setPropertyOnAngularDecorator(newDecorator, 'imports', typescript_1.default.factory.createArrayLiteralExpression(importsArray)));
            }
            else {
                tracker.replaceNode(decorator.node, newDecorator);
            }
        }
    }
    for (const obj of testObjects) {
        moveDeclarationsToImports(obj, allDeclarations, typeChecker, templateTypeChecker, tracker);
    }
}
/**
 * Analyzes a set of objects used to configure testing modules and returns the AST
 * nodes that need to be migrated and the imports that should be added to the imports
 * of any declared components.
 * @param testObjects Object literals that should be analyzed.
 */
function analyzeTestingModules(testObjects, typeChecker) {
    const seenDeclarations = new Set();
    const decorators = [];
    const componentImports = new Map();
    for (const obj of testObjects) {
        const declarations = extractDeclarationsFromTestObject(obj, typeChecker);
        if (declarations.length === 0) {
            continue;
        }
        const importsProp = (0, util_1.findLiteralProperty)(obj, 'imports');
        const importElements = importsProp &&
            hasNgModuleMetadataElements(importsProp) &&
            typescript_1.default.isArrayLiteralExpression(importsProp.initializer)
            ? importsProp.initializer.elements.filter((el) => {
                // Filter out calls since they may be a `ModuleWithProviders`.
                return (!typescript_1.default.isCallExpression(el) &&
                    // Also filter out the animations modules since they throw errors if they're imported
                    // multiple times and it's common for apps to use the `NoopAnimationsModule` to
                    // disable animations in screenshot tests.
                    !(0, util_1.isClassReferenceInAngularModule)(el, /^BrowserAnimationsModule|NoopAnimationsModule$/, 'platform-browser/animations', typeChecker));
            })
            : null;
        for (const decl of declarations) {
            if (seenDeclarations.has(decl)) {
                continue;
            }
            const [decorator] = (0, ng_decorators_1.getAngularDecorators)(typeChecker, typescript_1.default.getDecorators(decl) || []);
            if (decorator) {
                seenDeclarations.add(decl);
                decorators.push(decorator);
                if (decorator.name === 'Component' && importElements) {
                    // We try to de-duplicate the imports being added to a component, because it may be
                    // declared in different testing modules with a different set of imports.
                    let imports = componentImports.get(decorator.node);
                    if (!imports) {
                        imports = new Set();
                        componentImports.set(decorator.node, imports);
                    }
                    importElements.forEach((imp) => imports.add(imp));
                }
            }
        }
    }
    return { decorators, componentImports };
}
/**
 * Finds the class declarations that are being referred
 * to in the `declarations` of an object literal.
 * @param obj Object literal that may contain the declarations.
 * @param typeChecker
 */
function extractDeclarationsFromTestObject(obj, typeChecker) {
    const results = [];
    const declarations = (0, util_1.findLiteralProperty)(obj, 'declarations');
    if (declarations &&
        hasNgModuleMetadataElements(declarations) &&
        typescript_1.default.isArrayLiteralExpression(declarations.initializer)) {
        for (const element of declarations.initializer.elements) {
            const declaration = (0, util_1.findClassDeclaration)(element, typeChecker);
            // Note that we only migrate classes that are in the same file as the testing module,
            // because external fixture components are somewhat rare and handling them is going
            // to involve a lot of assumptions that are likely to be incorrect.
            if (declaration && declaration.getSourceFile().fileName === obj.getSourceFile().fileName) {
                results.push(declaration);
            }
        }
    }
    return results;
}
/** Extracts the metadata object literal from an Angular decorator. */
function extractMetadataLiteral(decorator) {
    // `arguments[0]` is the metadata object literal.
    return typescript_1.default.isCallExpression(decorator.expression) &&
        decorator.expression.arguments.length === 1 &&
        typescript_1.default.isObjectLiteralExpression(decorator.expression.arguments[0])
        ? decorator.expression.arguments[0]
        : null;
}
/**
 * Checks whether a class is a standalone declaration.
 * @param node Class being checked.
 * @param declarationsInMigration Classes that are being converted to standalone in this migration.
 * @param templateTypeChecker
 */
function isStandaloneDeclaration(node, declarationsInMigration, templateTypeChecker) {
    if (declarationsInMigration.has(node)) {
        return true;
    }
    const metadata = templateTypeChecker.getDirectiveMetadata(node) || templateTypeChecker.getPipeMetadata(node);
    return metadata != null && metadata.isStandalone;
}
