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
exports.migrateFileToLazyRoutes = migrateFileToLazyRoutes;
const typescript_1 = __importDefault(require("typescript"));
const index_1 = require("@angular/compiler-cli/src/ngtsc/reflection/index");
const change_tracker_1 = require("../../utils/change_tracker");
const class_declaration_1 = require("../../utils/typescript/class_declaration");
const property_name_1 = require("../../utils/typescript/property_name");
const util_1 = require("./util");
/**
 * Converts all application routes that are using standalone components to be lazy loaded.
 * @param sourceFile File that should be migrated.
 * @param program
 */
function migrateFileToLazyRoutes(sourceFile, program) {
    const typeChecker = program.getTypeChecker();
    const reflector = new index_1.TypeScriptReflectionHost(typeChecker);
    const printer = typescript_1.default.createPrinter();
    const tracker = new change_tracker_1.ChangeTracker(printer);
    const routeArraysToMigrate = findRoutesArrayToMigrate(sourceFile, typeChecker);
    if (routeArraysToMigrate.length === 0) {
        return { pendingChanges: [], skippedRoutes: [], migratedRoutes: [] };
    }
    const { skippedRoutes, migratedRoutes } = migrateRoutesArray(routeArraysToMigrate, typeChecker, reflector, tracker);
    return {
        pendingChanges: tracker.recordChanges().get(sourceFile) || [],
        skippedRoutes,
        migratedRoutes,
    };
}
/** Finds route object that can be migrated */
function findRoutesArrayToMigrate(sourceFile, typeChecker) {
    const routesArrays = [];
    sourceFile.forEachChild(function walk(node) {
        if (typescript_1.default.isCallExpression(node)) {
            if ((0, util_1.isRouterModuleCallExpression)(node, typeChecker) ||
                (0, util_1.isRouterProviderCallExpression)(node, typeChecker) ||
                (0, util_1.isRouterCallExpression)(node, typeChecker) ||
                (0, util_1.isProvideRoutesCallExpression)(node, typeChecker)) {
                const arg = node.arguments[0]; // ex: RouterModule.forRoot(routes) or provideRouter(routes)
                const routeFileImports = sourceFile.statements.filter(typescript_1.default.isImportDeclaration);
                if (typescript_1.default.isArrayLiteralExpression(arg) && arg.elements.length > 0) {
                    // ex: inline routes array: RouterModule.forRoot([{ path: 'test', component: TestComponent }])
                    routesArrays.push({
                        routeFilePath: sourceFile.fileName,
                        array: arg,
                        routeFileImports,
                    });
                }
                else if (typescript_1.default.isIdentifier(arg)) {
                    // ex: reference to routes array: RouterModule.forRoot(routes)
                    // RouterModule.forRoot(routes), provideRouter(routes), provideRoutes(routes)
                    const symbol = typeChecker.getSymbolAtLocation(arg);
                    if (!(symbol === null || symbol === void 0 ? void 0 : symbol.declarations))
                        return;
                    for (const declaration of symbol.declarations) {
                        if (typescript_1.default.isVariableDeclaration(declaration)) {
                            const initializer = declaration.initializer;
                            if (initializer && typescript_1.default.isArrayLiteralExpression(initializer)) {
                                // ex: const routes = [{ path: 'test', component: TestComponent }];
                                routesArrays.push({
                                    routeFilePath: sourceFile.fileName,
                                    array: initializer,
                                    routeFileImports,
                                });
                            }
                        }
                    }
                }
            }
        }
        if (typescript_1.default.isVariableDeclaration(node)) {
            if ((0, util_1.isAngularRoutesArray)(node, typeChecker)) {
                const initializer = node.initializer;
                if (initializer &&
                    typescript_1.default.isArrayLiteralExpression(initializer) &&
                    initializer.elements.length > 0) {
                    // ex: const routes: Routes = [{ path: 'test', component: TestComponent }];
                    if (routesArrays.find((x) => x.array === initializer)) {
                        // already exists
                        return;
                    }
                    routesArrays.push({
                        routeFilePath: sourceFile.fileName,
                        array: initializer,
                        routeFileImports: sourceFile.statements.filter(typescript_1.default.isImportDeclaration),
                    });
                }
            }
        }
        node.forEachChild(walk);
    });
    return routesArrays;
}
/** Migrate a routes object standalone components to be lazy loaded. */
function migrateRoutesArray(routesArray, typeChecker, reflector, tracker) {
    const migratedRoutes = [];
    const skippedRoutes = [];
    const importsToRemove = [];
    for (const route of routesArray) {
        route.array.elements.forEach((element) => {
            if (typescript_1.default.isObjectLiteralExpression(element)) {
                const { migratedRoutes: migrated, skippedRoutes: toBeSkipped, importsToRemove: toBeRemoved, } = migrateRoute(element, route, typeChecker, reflector, tracker);
                migratedRoutes.push(...migrated);
                skippedRoutes.push(...toBeSkipped);
                importsToRemove.push(...toBeRemoved);
            }
        });
    }
    for (const importToRemove of importsToRemove) {
        tracker.removeNode(importToRemove);
    }
    return { migratedRoutes, skippedRoutes };
}
/**
 * Migrates a single route object and returns the results of the migration
 * It recursively migrates the children routes if they exist
 */
function migrateRoute(element, route, typeChecker, reflector, tracker) {
    var _a, _b, _c, _d;
    const skippedRoutes = [];
    const migratedRoutes = [];
    const importsToRemove = [];
    const component = (0, property_name_1.findLiteralProperty)(element, 'component');
    // this can be empty string or a variable that is not a string, or not present at all
    const routePath = (_b = (_a = (0, property_name_1.findLiteralProperty)(element, 'path')) === null || _a === void 0 ? void 0 : _a.getText()) !== null && _b !== void 0 ? _b : '';
    const children = (0, property_name_1.findLiteralProperty)(element, 'children');
    // recursively migrate children routes first if they exist
    if (children && typescript_1.default.isArrayLiteralExpression(children.initializer)) {
        for (const childRoute of children.initializer.elements) {
            if (typescript_1.default.isObjectLiteralExpression(childRoute)) {
                const { migratedRoutes: migrated, skippedRoutes: toBeSkipped, importsToRemove: toBeRemoved, } = migrateRoute(childRoute, route, typeChecker, reflector, tracker);
                migratedRoutes.push(...migrated);
                skippedRoutes.push(...toBeSkipped);
                importsToRemove.push(...toBeRemoved);
            }
        }
    }
    const routeMigrationResults = { migratedRoutes, skippedRoutes, importsToRemove };
    if (!component) {
        return routeMigrationResults;
    }
    const componentDeclaration = (0, class_declaration_1.findClassDeclaration)(component, typeChecker);
    if (!componentDeclaration) {
        return routeMigrationResults;
    }
    // if component is not a standalone component, skip it
    if (!(0, util_1.isStandaloneComponent)(componentDeclaration, reflector)) {
        skippedRoutes.push({ path: routePath, file: route.routeFilePath });
        return routeMigrationResults;
    }
    const componentClassName = componentDeclaration.name && typescript_1.default.isIdentifier(componentDeclaration.name)
        ? componentDeclaration.name.text
        : null;
    if (!componentClassName) {
        return routeMigrationResults;
    }
    // if component is in the same file as the routes array, skip it
    if (componentDeclaration.getSourceFile().fileName === route.routeFilePath) {
        return routeMigrationResults;
    }
    const componentImport = route.routeFileImports.find((importDecl) => { var _a; return (_a = importDecl.importClause) === null || _a === void 0 ? void 0 : _a.getText().includes(componentClassName); });
    // remove single and double quotes from the import path
    let componentImportPath = typescript_1.default.isStringLiteral(componentImport === null || componentImport === void 0 ? void 0 : componentImport.moduleSpecifier)
        ? componentImport.moduleSpecifier.text
        : null;
    // if the import path is not a string literal, skip it
    if (!componentImportPath) {
        skippedRoutes.push({ path: routePath, file: route.routeFilePath });
        return routeMigrationResults;
    }
    const isDefaultExport = (_d = (_c = componentDeclaration.modifiers) === null || _c === void 0 ? void 0 : _c.some((x) => x.kind === typescript_1.default.SyntaxKind.DefaultKeyword)) !== null && _d !== void 0 ? _d : false;
    const loadComponent = createLoadComponentPropertyAssignment(componentImportPath, componentClassName, isDefaultExport);
    tracker.replaceNode(component, loadComponent);
    // Add the import statement for the standalone component
    if (!importsToRemove.includes(componentImport)) {
        importsToRemove.push(componentImport);
    }
    migratedRoutes.push({ path: routePath, file: route.routeFilePath });
    // the component was migrated, so we return the results
    return routeMigrationResults;
}
/**
 * Generates the loadComponent property assignment for a given component.
 *
 * Example:
 * loadComponent: () => import('./path').then(m => m.componentName)
 * or
 * loadComponent: () => import('./path') // when isDefaultExport is true
 */
function createLoadComponentPropertyAssignment(componentImportPath, componentDeclarationName, isDefaultExport) {
    return typescript_1.default.factory.createPropertyAssignment('loadComponent', typescript_1.default.factory.createArrowFunction(undefined, undefined, [], undefined, typescript_1.default.factory.createToken(typescript_1.default.SyntaxKind.EqualsGreaterThanToken), isDefaultExport
        ? createImportCallExpression(componentImportPath) // will generate import('./path) and will skip the then() call
        : typescript_1.default.factory.createCallExpression(
        // will generate import('./path).then(m => m.componentName)
        typescript_1.default.factory.createPropertyAccessExpression(createImportCallExpression(componentImportPath), 'then'), undefined, [createImportThenCallExpression(componentDeclarationName)])));
}
// import('./path)
const createImportCallExpression = (componentImportPath) => typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier('import'), undefined, [
    typescript_1.default.factory.createStringLiteral(componentImportPath, true),
]);
// m => m.componentName
const createImportThenCallExpression = (componentDeclarationName) => typescript_1.default.factory.createArrowFunction(undefined, undefined, [typescript_1.default.factory.createParameterDeclaration(undefined, undefined, 'm', undefined, undefined)], undefined, typescript_1.default.factory.createToken(typescript_1.default.SyntaxKind.EqualsGreaterThanToken), typescript_1.default.factory.createPropertyAccessExpression(typescript_1.default.factory.createIdentifier('m'), componentDeclarationName));
