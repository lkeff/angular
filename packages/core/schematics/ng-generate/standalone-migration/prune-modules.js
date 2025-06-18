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
exports.pruneNgModules = pruneNgModules;
const typescript_1 = __importDefault(require("typescript"));
const change_tracker_1 = require("../../utils/change_tracker");
const ng_decorators_1 = require("../../utils/ng_decorators");
const nodes_1 = require("../../utils/typescript/nodes");
const util_1 = require("./util");
const migrations_1 = require("@angular/compiler-cli/private/migrations");
const to_standalone_1 = require("./to-standalone");
function pruneNgModules(program, host, basePath, rootFileNames, sourceFiles, printer, importRemapper, referenceLookupExcludedFiles, declarationImportRemapper) {
    const filesToRemove = new Set();
    const tracker = new change_tracker_1.ChangeTracker(printer, importRemapper);
    const tsProgram = program.getTsProgram();
    const typeChecker = tsProgram.getTypeChecker();
    const templateTypeChecker = program.compiler.getTemplateTypeChecker();
    const referenceResolver = new util_1.ReferenceResolver(program, host, rootFileNames, basePath, referenceLookupExcludedFiles);
    const removalLocations = {
        arrays: new util_1.UniqueItemTracker(),
        imports: new util_1.UniqueItemTracker(),
        exports: new util_1.UniqueItemTracker(),
        unknown: new Set(),
    };
    const classesToRemove = new Set();
    const barrelExports = new util_1.UniqueItemTracker();
    const componentImportArrays = new util_1.UniqueItemTracker();
    const testArrays = new util_1.UniqueItemTracker();
    const nodesToRemove = new Set();
    sourceFiles.forEach(function walk(node) {
        var _a, _b;
        if (typescript_1.default.isClassDeclaration(node) && canRemoveClass(node, typeChecker)) {
            collectChangeLocations(node, removalLocations, componentImportArrays, testArrays, templateTypeChecker, referenceResolver, program);
            classesToRemove.add(node);
        }
        else if (typescript_1.default.isExportDeclaration(node) &&
            !node.exportClause &&
            node.moduleSpecifier &&
            typescript_1.default.isStringLiteralLike(node.moduleSpecifier) &&
            node.moduleSpecifier.text.startsWith('.')) {
            const exportedSourceFile = (_b = (_a = typeChecker
                .getSymbolAtLocation(node.moduleSpecifier)) === null || _a === void 0 ? void 0 : _a.valueDeclaration) === null || _b === void 0 ? void 0 : _b.getSourceFile();
            if (exportedSourceFile) {
                barrelExports.track(exportedSourceFile, node);
            }
        }
        node.forEachChild(walk);
    });
    replaceInComponentImportsArray(componentImportArrays, classesToRemove, tracker, typeChecker, templateTypeChecker, declarationImportRemapper);
    replaceInTestImportsArray(testArrays, removalLocations, classesToRemove, tracker, typeChecker, templateTypeChecker, declarationImportRemapper);
    // We collect all the places where we need to remove references first before generating the
    // removal instructions since we may have to remove multiple references from one node.
    removeArrayReferences(removalLocations.arrays, tracker);
    removeImportReferences(removalLocations.imports, tracker);
    removeExportReferences(removalLocations.exports, tracker);
    addRemovalTodos(removalLocations.unknown, tracker);
    // Collect all the nodes to be removed before determining which files to delete since we need
    // to know it ahead of time when deleting barrel files that export other barrel files.
    (function trackNodesToRemove(nodes) {
        for (const node of nodes) {
            const sourceFile = node.getSourceFile();
            if (!filesToRemove.has(sourceFile) && canRemoveFile(sourceFile, nodes)) {
                const barrelExportsForFile = barrelExports.get(sourceFile);
                nodesToRemove.add(node);
                filesToRemove.add(sourceFile);
                barrelExportsForFile && trackNodesToRemove(barrelExportsForFile);
            }
            else {
                nodesToRemove.add(node);
            }
        }
    })(classesToRemove);
    for (const node of nodesToRemove) {
        const sourceFile = node.getSourceFile();
        if (!filesToRemove.has(sourceFile) && canRemoveFile(sourceFile, nodesToRemove)) {
            filesToRemove.add(sourceFile);
        }
        else {
            tracker.removeNode(node);
        }
    }
    return { pendingChanges: tracker.recordChanges(), filesToRemove };
}
/**
 * Collects all the nodes that a module needs to be removed from.
 * @param ngModule Module being removed.
 * @param removalLocations Tracks the different places from which the class should be removed.
 * @param componentImportArrays Set of `imports` arrays of components that need to be adjusted.
 * @param testImportArrays Set of `imports` arrays of tests that need to be adjusted.
 * @param referenceResolver
 * @param program
 */
function collectChangeLocations(ngModule, removalLocations, componentImportArrays, testImportArrays, templateTypeChecker, referenceResolver, program) {
    const refsByFile = referenceResolver.findReferencesInProject(ngModule.name);
    const tsProgram = program.getTsProgram();
    const typeChecker = tsProgram.getTypeChecker();
    const nodes = new Set();
    for (const [fileName, refs] of refsByFile) {
        const sourceFile = tsProgram.getSourceFile(fileName);
        if (sourceFile) {
            (0, util_1.offsetsToNodes)((0, util_1.getNodeLookup)(sourceFile), refs, nodes);
        }
    }
    for (const node of nodes) {
        const closestArray = (0, nodes_1.closestNode)(node, typescript_1.default.isArrayLiteralExpression);
        if (closestArray) {
            const closestAssignment = (0, nodes_1.closestNode)(closestArray, typescript_1.default.isPropertyAssignment);
            if (closestAssignment && isInImportsArray(closestAssignment, closestArray)) {
                const closestCall = (0, nodes_1.closestNode)(closestAssignment, typescript_1.default.isCallExpression);
                if (closestCall) {
                    const closestDecorator = (0, nodes_1.closestNode)(closestCall, typescript_1.default.isDecorator);
                    const closestClass = closestDecorator
                        ? (0, nodes_1.closestNode)(closestDecorator, typescript_1.default.isClassDeclaration)
                        : null;
                    const directiveMeta = closestClass
                        ? templateTypeChecker.getDirectiveMetadata(closestClass)
                        : null;
                    // If the module was flagged as being removable, but it's still being used in a
                    // standalone component's `imports` array, it means that it was likely changed
                    // outside of the  migration and deleting it now will be breaking. Track it
                    // separately so it can be handled properly.
                    if (directiveMeta && directiveMeta.isComponent && directiveMeta.isStandalone) {
                        componentImportArrays.track(closestArray, node);
                        continue;
                    }
                    // If the module is removable and used inside a test's `imports`,
                    // we track it separately so it can be replaced with its `exports`.
                    const { testBed, catalyst } = (0, util_1.getTestingImports)(node.getSourceFile());
                    if ((0, util_1.isTestCall)(typeChecker, closestCall, testBed, catalyst)) {
                        testImportArrays.track(closestArray, node);
                        continue;
                    }
                }
            }
            removalLocations.arrays.track(closestArray, node);
            continue;
        }
        const closestImport = (0, nodes_1.closestNode)(node, typescript_1.default.isNamedImports);
        if (closestImport) {
            removalLocations.imports.track(closestImport, node);
            continue;
        }
        const closestExport = (0, nodes_1.closestNode)(node, typescript_1.default.isNamedExports);
        if (closestExport) {
            removalLocations.exports.track(closestExport, node);
            continue;
        }
        removalLocations.unknown.add(node);
    }
}
/**
 * Replaces all the leftover modules in component `imports` arrays with their exports.
 * @param componentImportArrays All the imports arrays and their nodes that represent NgModules.
 * @param classesToRemove Set of classes that were marked for removal.
 * @param tracker
 * @param typeChecker
 * @param templateTypeChecker
 * @param importRemapper
 */
function replaceInComponentImportsArray(componentImportArrays, classesToRemove, tracker, typeChecker, templateTypeChecker, importRemapper) {
    for (const [array, toReplace] of componentImportArrays.getEntries()) {
        const closestClass = (0, nodes_1.closestNode)(array, typescript_1.default.isClassDeclaration);
        if (!closestClass) {
            continue;
        }
        const replacements = new util_1.UniqueItemTracker();
        const usedImports = new Set((0, to_standalone_1.findTemplateDependencies)(closestClass, templateTypeChecker).map((ref) => ref.node));
        for (const node of toReplace) {
            const moduleDecl = (0, util_1.findClassDeclaration)(node, typeChecker);
            if (moduleDecl) {
                const moduleMeta = templateTypeChecker.getNgModuleMetadata(moduleDecl);
                if (moduleMeta) {
                    moduleMeta.exports.forEach((exp) => {
                        if (usedImports.has(exp.node)) {
                            replacements.track(node, exp);
                        }
                    });
                }
                else {
                    // It's unlikely not to have module metadata at this point, but just in
                    // case unmark the class for removal to reduce the chance of breakages.
                    classesToRemove.delete(moduleDecl);
                }
            }
        }
        replaceModulesInImportsArray(array, replacements, tracker, templateTypeChecker, importRemapper);
    }
}
/**
 * Replaces all the leftover modules in testing `imports` arrays with their exports.
 * @param testImportArrays All test `imports` arrays and their nodes that represent modules.
 * @param classesToRemove Classes marked for removal by the migration.
 * @param tracker
 * @param typeChecker
 * @param templateTypeChecker
 * @param importRemapper
 */
function replaceInTestImportsArray(testImportArrays, removalLocations, classesToRemove, tracker, typeChecker, templateTypeChecker, importRemapper) {
    for (const [array, toReplace] of testImportArrays.getEntries()) {
        const replacements = new util_1.UniqueItemTracker();
        for (const node of toReplace) {
            const moduleDecl = (0, util_1.findClassDeclaration)(node, typeChecker);
            if (moduleDecl) {
                const moduleMeta = templateTypeChecker.getNgModuleMetadata(moduleDecl);
                if (moduleMeta) {
                    // Since we don't have access to the template type checker in tests,
                    // we copy over all the `exports` that aren't flagged for removal.
                    const exports = moduleMeta.exports.filter((exp) => !classesToRemove.has(exp.node));
                    if (exports.length > 0) {
                        exports.forEach((exp) => replacements.track(node, exp));
                    }
                    else {
                        removalLocations.arrays.track(array, node);
                    }
                }
                else {
                    // It's unlikely not to have module metadata at this point, but just in
                    // case unmark the class for removal to reduce the chance of breakages.
                    classesToRemove.delete(moduleDecl);
                }
            }
        }
        replaceModulesInImportsArray(array, replacements, tracker, templateTypeChecker, importRemapper);
    }
}
/**
 * Replaces any leftover modules in an `imports` arrays with a set of specified exports
 * @param array Imports array which is being migrated.
 * @param replacements Map of NgModule references to their exports.
 * @param tracker
 * @param templateTypeChecker
 * @param importRemapper
 */
function replaceModulesInImportsArray(array, replacements, tracker, templateTypeChecker, importRemapper) {
    if (replacements.isEmpty()) {
        return;
    }
    const newElements = [];
    const identifiers = new Set();
    for (const element of array.elements) {
        if (typescript_1.default.isIdentifier(element)) {
            identifiers.add(element.text);
        }
    }
    for (const element of array.elements) {
        const replacementRefs = replacements.get(element);
        if (!replacementRefs) {
            newElements.push(element);
            continue;
        }
        const potentialImports = [];
        for (const ref of replacementRefs) {
            const importLocation = (0, to_standalone_1.findImportLocation)(ref, array, migrations_1.PotentialImportMode.Normal, templateTypeChecker);
            if (importLocation) {
                potentialImports.push(importLocation);
            }
        }
        (0, to_standalone_1.potentialImportsToExpressions)(potentialImports, array.getSourceFile(), tracker, importRemapper).forEach((expr) => {
            if (!typescript_1.default.isIdentifier(expr) || !identifiers.has(expr.text)) {
                newElements.push(expr);
            }
        });
    }
    tracker.replaceNode(array, typescript_1.default.factory.updateArrayLiteralExpression(array, newElements));
}
/**
 * Removes all tracked array references.
 * @param locations Locations from which to remove the references.
 * @param tracker Tracker in which to register the changes.
 */
function removeArrayReferences(locations, tracker) {
    for (const [array, toRemove] of locations.getEntries()) {
        const newElements = filterRemovedElements(array.elements, toRemove);
        tracker.replaceNode(array, typescript_1.default.factory.updateArrayLiteralExpression(array, typescript_1.default.factory.createNodeArray(newElements, array.elements.hasTrailingComma)));
    }
}
/**
 * Removes all tracked import references.
 * @param locations Locations from which to remove the references.
 * @param tracker Tracker in which to register the changes.
 */
function removeImportReferences(locations, tracker) {
    for (const [namedImports, toRemove] of locations.getEntries()) {
        const newElements = filterRemovedElements(namedImports.elements, toRemove);
        // If no imports are left, we can try to drop the entire import.
        if (newElements.length === 0) {
            const importClause = (0, nodes_1.closestNode)(namedImports, typescript_1.default.isImportClause);
            // If the import clause has a name we can only drop then named imports.
            // e.g. `import Foo, {ModuleToRemove} from './foo';` becomes `import Foo from './foo';`.
            if (importClause && importClause.name) {
                tracker.replaceNode(importClause, typescript_1.default.factory.updateImportClause(importClause, importClause.isTypeOnly, importClause.name, undefined));
            }
            else {
                // Otherwise we can drop the entire declaration.
                const declaration = (0, nodes_1.closestNode)(namedImports, typescript_1.default.isImportDeclaration);
                if (declaration) {
                    tracker.removeNode(declaration);
                }
            }
        }
        else {
            // Otherwise we just drop the imported symbols and keep the declaration intact.
            tracker.replaceNode(namedImports, typescript_1.default.factory.updateNamedImports(namedImports, newElements));
        }
    }
}
/**
 * Removes all tracked export references.
 * @param locations Locations from which to remove the references.
 * @param tracker Tracker in which to register the changes.
 */
function removeExportReferences(locations, tracker) {
    for (const [namedExports, toRemove] of locations.getEntries()) {
        const newElements = filterRemovedElements(namedExports.elements, toRemove);
        // If no exports are left, we can drop the entire declaration.
        if (newElements.length === 0) {
            const declaration = (0, nodes_1.closestNode)(namedExports, typescript_1.default.isExportDeclaration);
            if (declaration) {
                tracker.removeNode(declaration);
            }
        }
        else {
            // Otherwise we just drop the exported symbols and keep the declaration intact.
            tracker.replaceNode(namedExports, typescript_1.default.factory.updateNamedExports(namedExports, newElements));
        }
    }
}
/**
 * Determines whether an `@NgModule` class is safe to remove. A module is safe to remove if:
 * 1. It has no `declarations`.
 * 2. It has no `providers`.
 * 3. It has no `bootstrap` components.
 * 4. It has no `ModuleWithProviders` in its `imports`.
 * 5. It has no class members. Empty construstors are ignored.
 * @param node Class that is being checked.
 * @param typeChecker
 */
function canRemoveClass(node, typeChecker) {
    var _a;
    const decorator = (_a = findNgModuleDecorator(node, typeChecker)) === null || _a === void 0 ? void 0 : _a.node;
    // We can't remove a declaration if it's not a valid `NgModule`.
    if (!decorator || !typescript_1.default.isCallExpression(decorator.expression)) {
        return false;
    }
    // Unsupported case, e.g. `@NgModule(SOME_VALUE)`.
    if (decorator.expression.arguments.length > 0 &&
        !typescript_1.default.isObjectLiteralExpression(decorator.expression.arguments[0])) {
        return false;
    }
    // We can't remove modules that have class members. We make an exception for an
    // empty constructor which may have been generated by a tool and forgotten.
    if (node.members.length > 0 && node.members.some((member) => !isEmptyConstructor(member))) {
        return false;
    }
    // An empty `NgModule` call can be removed.
    if (decorator.expression.arguments.length === 0) {
        return true;
    }
    const literal = decorator.expression.arguments[0];
    const imports = (0, util_1.findLiteralProperty)(literal, 'imports');
    if (imports && isNonEmptyNgModuleProperty(imports)) {
        // We can't remove the class if at least one import isn't identifier, because it may be a
        // `ModuleWithProviders` which is the equivalent of having something in the `providers` array.
        for (const dep of imports.initializer.elements) {
            if (!typescript_1.default.isIdentifier(dep)) {
                return false;
            }
            const depDeclaration = (0, util_1.findClassDeclaration)(dep, typeChecker);
            const depNgModule = depDeclaration
                ? findNgModuleDecorator(depDeclaration, typeChecker)
                : null;
            // If any of the dependencies of the class is an `NgModule` that can't be removed, the class
            // itself can't be removed either, because it may be part of a transitive dependency chain.
            if (depDeclaration !== null &&
                depNgModule !== null &&
                !canRemoveClass(depDeclaration, typeChecker)) {
                return false;
            }
        }
    }
    // We can't remove classes that have any `declarations`, `providers` or `bootstrap` elements.
    // Also err on the side of caution and don't remove modules where any of the aforementioned
    // properties aren't initialized to an array literal.
    for (const prop of literal.properties) {
        if (isNonEmptyNgModuleProperty(prop) &&
            (prop.name.text === 'declarations' ||
                prop.name.text === 'providers' ||
                prop.name.text === 'bootstrap')) {
            return false;
        }
    }
    return true;
}
/**
 * Checks whether a node is a non-empty property from an NgModule's metadata. This is defined as a
 * property assignment with a static name, initialized to an array literal with more than one
 * element.
 * @param node Node to be checked.
 */
function isNonEmptyNgModuleProperty(node) {
    return (typescript_1.default.isPropertyAssignment(node) &&
        typescript_1.default.isIdentifier(node.name) &&
        typescript_1.default.isArrayLiteralExpression(node.initializer) &&
        node.initializer.elements.length > 0);
}
/**
 * Determines if a file is safe to delete. A file is safe to delete if all it contains are
 * import statements, class declarations that are about to be deleted and non-exported code.
 * @param sourceFile File that is being checked.
 * @param nodesToBeRemoved Nodes that are being removed as a part of the migration.
 */
function canRemoveFile(sourceFile, nodesToBeRemoved) {
    var _a;
    for (const node of sourceFile.statements) {
        if (typescript_1.default.isImportDeclaration(node) || nodesToBeRemoved.has(node)) {
            continue;
        }
        if (typescript_1.default.isExportDeclaration(node) ||
            (typescript_1.default.canHaveModifiers(node) &&
                ((_a = typescript_1.default.getModifiers(node)) === null || _a === void 0 ? void 0 : _a.some((m) => m.kind === typescript_1.default.SyntaxKind.ExportKeyword)))) {
            return false;
        }
    }
    return true;
}
/**
 * Gets whether an AST node contains another AST node.
 * @param parent Parent node that may contain the child.
 * @param child Child node that is being checked.
 */
function contains(parent, child) {
    return (parent === child ||
        (parent.getSourceFile().fileName === child.getSourceFile().fileName &&
            child.getStart() >= parent.getStart() &&
            child.getStart() <= parent.getEnd()));
}
/**
 * Removes AST nodes from a node array.
 * @param elements Array from which to remove the nodes.
 * @param toRemove Nodes that should be removed.
 */
function filterRemovedElements(elements, toRemove) {
    return elements.filter((el) => {
        for (const node of toRemove) {
            // Check that the element contains the node, despite knowing with relative certainty that it
            // does, because this allows us to unwrap some nodes. E.g. if we have `[((toRemove))]`, we
            // want to remove the entire parenthesized expression, rather than just `toRemove`.
            if (contains(el, node)) {
                return false;
            }
        }
        return true;
    });
}
/** Returns whether a node as an empty constructor. */
function isEmptyConstructor(node) {
    return (typescript_1.default.isConstructorDeclaration(node) &&
        node.parameters.length === 0 &&
        (node.body == null || node.body.statements.length === 0));
}
/**
 * Adds TODO comments to nodes that couldn't be removed manually.
 * @param nodes Nodes to which to add the TODO.
 * @param tracker Tracker in which to register the changes.
 */
function addRemovalTodos(nodes, tracker) {
    for (const node of nodes) {
        // Note: the comment is inserted using string manipulation, instead of going through the AST,
        // because this way we preserve more of the app's original formatting.
        // Note: in theory this can duplicate comments if the module pruning runs multiple times on
        // the same node. In practice it is unlikely, because the second time the node won't be picked
        // up by the language service as a reference, because the class won't exist anymore.
        tracker.insertText(node.getSourceFile(), node.getFullStart(), ` /* TODO(standalone-migration): clean up removed NgModule reference manually. */ `);
    }
}
/** Finds the `NgModule` decorator in a class, if it exists. */
function findNgModuleDecorator(node, typeChecker) {
    const decorators = (0, ng_decorators_1.getAngularDecorators)(typeChecker, typescript_1.default.getDecorators(node) || []);
    return decorators.find((decorator) => decorator.name === 'NgModule') || null;
}
/**
 * Checks whether a node is used inside of an `imports` array.
 * @param closestAssignment The closest property assignment to the node.
 * @param closestArray The closest array to the node.
 */
function isInImportsArray(closestAssignment, closestArray) {
    return (closestAssignment.initializer === closestArray &&
        (typescript_1.default.isIdentifier(closestAssignment.name) || typescript_1.default.isStringLiteralLike(closestAssignment.name)) &&
        closestAssignment.name.text === 'imports');
}
