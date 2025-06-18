"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTightestNode = findTightestNode;
exports.findAllMatchingNodes = findAllMatchingNodes;
exports.findFirstMatchingNode = findFirstMatchingNode;
exports.getParentClassDeclaration = getParentClassDeclaration;
exports.getPropertyAssignmentFromValue = getPropertyAssignmentFromValue;
exports.getClassDeclFromDecoratorProp = getClassDeclFromDecoratorProp;
exports.collectMemberMethods = collectMemberMethods;
exports.addElementToArrayLiteral = addElementToArrayLiteral;
exports.objectPropertyAssignmentForKey = objectPropertyAssignmentForKey;
exports.updateObjectValueForKey = updateObjectValueForKey;
exports.ensureArrayWithIdentifier = ensureArrayWithIdentifier;
exports.moduleSpecifierPointsToFile = moduleSpecifierPointsToFile;
exports.hasImport = hasImport;
exports.nonCollidingImportName = nonCollidingImportName;
exports.standaloneTraitOrNgModule = standaloneTraitOrNgModule;
exports.updateImportsForTypescriptFile = updateImportsForTypescriptFile;
exports.updateImportsForAngularTrait = updateImportsForAngularTrait;
exports.isStandaloneDecorator = isStandaloneDecorator;
exports.generateImport = generateImport;
exports.updateImport = updateImport;
exports.printNode = printNode;
exports.getCodeActionToImportTheDirectiveDeclaration = getCodeActionToImportTheDirectiveDeclaration;
const api_1 = require("@angular/compiler-cli/src/ngtsc/typecheck/api");
const typescript_1 = __importDefault(require("typescript"));
const format_1 = require("./format");
/**
 * Return the node that most tightly encompasses the specified `position`.
 * @param node The starting node to start the top-down search.
 * @param position The target position within the `node`.
 */
function findTightestNode(node, position) {
    var _a;
    if (node.getStart() <= position && position < node.getEnd()) {
        return (_a = node.forEachChild((c) => findTightestNode(c, position))) !== null && _a !== void 0 ? _a : node;
    }
    return undefined;
}
/**
 * Finds TypeScript nodes descending from the provided root which match the given filter.
 */
function findAllMatchingNodes(root, opts) {
    const matches = [];
    const explore = (currNode) => {
        if (opts.filter(currNode)) {
            matches.push(currNode);
        }
        currNode.forEachChild((descendent) => explore(descendent));
    };
    explore(root);
    return matches;
}
/**
 * Finds TypeScript nodes descending from the provided root which match the given filter.
 */
function findFirstMatchingNode(root, opts) {
    let match = null;
    const explore = (currNode) => {
        if (match !== null) {
            return;
        }
        if (opts.filter(currNode)) {
            match = currNode;
            return;
        }
        currNode.forEachChild((descendent) => explore(descendent));
    };
    explore(root);
    return match;
}
function getParentClassDeclaration(startNode) {
    while (startNode) {
        if (typescript_1.default.isClassDeclaration(startNode)) {
            return startNode;
        }
        startNode = startNode.parent;
    }
    return undefined;
}
/**
 * Returns a property assignment from the assignment value if the property name
 * matches the specified `key`, or `null` if there is no match.
 */
function getPropertyAssignmentFromValue(value, key) {
    const propAssignment = value.parent;
    if (!propAssignment ||
        !typescript_1.default.isPropertyAssignment(propAssignment) ||
        propAssignment.name.getText() !== key) {
        return null;
    }
    return propAssignment;
}
/**
 * Given a decorator property assignment, return the ClassDeclaration node that corresponds to the
 * directive class the property applies to.
 * If the property assignment is not on a class decorator, no declaration is returned.
 *
 * For example,
 *
 * @Component({
 *   template: '<div></div>'
 *   ^^^^^^^^^^^^^^^^^^^^^^^---- property assignment
 * })
 * class AppComponent {}
 *           ^---- class declaration node
 *
 * @param propAsgnNode property assignment
 */
function getClassDeclFromDecoratorProp(propAsgnNode) {
    if (!propAsgnNode.parent || !typescript_1.default.isObjectLiteralExpression(propAsgnNode.parent)) {
        return;
    }
    const objLitExprNode = propAsgnNode.parent;
    if (!objLitExprNode.parent || !typescript_1.default.isCallExpression(objLitExprNode.parent)) {
        return;
    }
    const callExprNode = objLitExprNode.parent;
    if (!callExprNode.parent || !typescript_1.default.isDecorator(callExprNode.parent)) {
        return;
    }
    const decorator = callExprNode.parent;
    if (!decorator.parent || !typescript_1.default.isClassDeclaration(decorator.parent)) {
        return;
    }
    const classDeclNode = decorator.parent;
    return classDeclNode;
}
/**
 * Collects all member methods, including those from base classes.
 */
function collectMemberMethods(clazz, typeChecker) {
    const members = [];
    const apparentProps = typeChecker.getTypeAtLocation(clazz).getApparentProperties();
    for (const prop of apparentProps) {
        if (prop.valueDeclaration && typescript_1.default.isMethodDeclaration(prop.valueDeclaration)) {
            members.push(prop.valueDeclaration);
        }
    }
    return members;
}
/**
 * Given an existing array literal expression, update it by pushing a new expression.
 */
function addElementToArrayLiteral(arr, elem) {
    return typescript_1.default.factory.updateArrayLiteralExpression(arr, [...arr.elements, elem]);
}
/**
 * Given an ObjectLiteralExpression node, extract and return the PropertyAssignment corresponding to
 * the given key. `null` if no such key exists.
 */
function objectPropertyAssignmentForKey(obj, key) {
    const matchingProperty = obj.properties.filter((a) => a.name !== undefined && typescript_1.default.isIdentifier(a.name) && a.name.escapedText === key)[0];
    return matchingProperty && typescript_1.default.isPropertyAssignment(matchingProperty) ? matchingProperty : null;
}
/**
 * Given an ObjectLiteralExpression node, create or update the specified key, using the provided
 * callback to generate the new value (possibly based on an old value), and return the `ts.PropertyAssignment`
 * for the key.
 */
function updateObjectValueForKey(obj, key, newValueFn) {
    const existingProp = objectPropertyAssignmentForKey(obj, key);
    return typescript_1.default.factory.createPropertyAssignment(typescript_1.default.factory.createIdentifier(key), newValueFn(existingProp === null || existingProp === void 0 ? void 0 : existingProp.initializer));
}
/**
 * Create a new ArrayLiteralExpression, or accept an existing one.
 * Ensure the array contains the provided identifier.
 * Returns the array, either updated or newly created.
 * If no update is needed, returns `null`.
 */
function ensureArrayWithIdentifier(identifierText, expression, arr) {
    if (arr === undefined) {
        return typescript_1.default.factory.createArrayLiteralExpression([expression]);
    }
    if (arr.elements.find((v) => typescript_1.default.isIdentifier(v) && v.text === identifierText)) {
        return null;
    }
    return typescript_1.default.factory.updateArrayLiteralExpression(arr, [...arr.elements, expression]);
}
function moduleSpecifierPointsToFile(tsChecker, moduleSpecifier, file) {
    const specifierSymbol = tsChecker.getSymbolAtLocation(moduleSpecifier);
    if (specifierSymbol === undefined) {
        console.error(`Undefined symbol for module specifier ${moduleSpecifier.getText()}`);
        return false;
    }
    const symbolDeclarations = specifierSymbol.declarations;
    if (symbolDeclarations === undefined || symbolDeclarations.length === 0) {
        console.error(`Unknown symbol declarations for module specifier ${moduleSpecifier.getText()}`);
        return false;
    }
    for (const symbolDeclaration of symbolDeclarations) {
        if (symbolDeclaration.getSourceFile().fileName === file.fileName) {
            return true;
        }
    }
    return false;
}
/**
 * Determine whether this an import of the given `propertyName` from a particular module
 * specifier already exists. If so, return the local name for that import, which might be an
 * alias.
 */
function hasImport(tsChecker, importDeclarations, propName, origin) {
    var _a;
    return ((_a = importDeclarations
        .filter((declaration) => moduleSpecifierPointsToFile(tsChecker, declaration.moduleSpecifier, origin))
        .map((declaration) => importHas(declaration, propName))
        .find((prop) => prop !== null)) !== null && _a !== void 0 ? _a : null);
}
function nameInExportScope(importSpecifier) {
    var _a, _b;
    return (_b = (_a = importSpecifier.propertyName) === null || _a === void 0 ? void 0 : _a.text) !== null && _b !== void 0 ? _b : importSpecifier.name.text;
}
/**
 * Determine whether this import declaration already contains an import of the given
 * `propertyName`, and if so, the name it can be referred to with in the local scope.
 */
function importHas(importDecl, propName) {
    var _a, _b, _c;
    const importClauseName = (_b = (_a = importDecl.importClause) === null || _a === void 0 ? void 0 : _a.name) === null || _b === void 0 ? void 0 : _b.getText();
    if (propName === 'default' && importClauseName !== undefined) {
        return importClauseName;
    }
    const bindings = (_c = importDecl.importClause) === null || _c === void 0 ? void 0 : _c.namedBindings;
    if (bindings === undefined) {
        return null;
    }
    // First, we handle the case of explicit named imports.
    if (typescript_1.default.isNamedImports(bindings)) {
        // Find any import specifier whose property name in the *export* scope equals the expected
        // name.
        const specifier = bindings.elements.find((importSpecifier) => propName == nameInExportScope(importSpecifier));
        // Return the name of the property in the *local* scope.
        if (specifier === undefined) {
            return null;
        }
        return specifier.name.text;
    }
    // The other case is a namespace import.
    return `${bindings.name.text}.${propName}`;
}
/**
 * Given an unqualified name, determine whether an existing import is already using this name in
 * the current scope.
 * TODO: It would be better to check if *any* symbol uses this name in the current scope.
 */
function importCollisionExists(importDeclaration, name) {
    const bindings = importDeclaration.map((declaration) => { var _a; return (_a = declaration.importClause) === null || _a === void 0 ? void 0 : _a.namedBindings; });
    const namedBindings = bindings.filter((binding) => binding !== undefined && typescript_1.default.isNamedImports(binding));
    const specifiers = namedBindings.flatMap((b) => b.elements);
    return specifiers.some((s) => s.name.text === name);
}
/**
 * Generator function that yields an infinite sequence of alternative aliases for a given symbol
 * name.
 */
function* suggestAlternativeSymbolNames(name) {
    for (let i = 1; true; i++) {
        yield `${name}_${i}`; // The _n suffix is the same style as TS generated aliases
    }
}
/**
 * Transform the given import name into an alias that does not collide with any other import
 * symbol.
 */
function nonCollidingImportName(importDeclarations, name) {
    const possibleNames = suggestAlternativeSymbolNames(name);
    while (importCollisionExists(importDeclarations, name)) {
        name = possibleNames.next().value;
    }
    return name;
}
/**
 * If the provided trait is standalone, just return it. Otherwise, returns the owning ngModule.
 */
function standaloneTraitOrNgModule(checker, trait) {
    const componentDecorator = checker.getPrimaryAngularDecorator(trait);
    if (componentDecorator == null) {
        return null;
    }
    const owningNgModule = checker.getOwningNgModule(trait);
    const isMarkedStandalone = isStandaloneDecorator(componentDecorator);
    if (owningNgModule === null && !isMarkedStandalone) {
        // TODO(dylhunn): This is a "moduleless component." We should probably suggest the user add
        // `standalone: true`.
        return null;
    }
    return owningNgModule !== null && owningNgModule !== void 0 ? owningNgModule : trait;
}
/**
 * Updates the imports on a TypeScript file, by ensuring the provided import is present.
 * Returns the text changes, as well as the name with which the imported symbol can be referred to.
 *
 * When the component is exported by default, the `symbolName` is `default`, and the `declarationName`
 * should be used as the import name.
 */
function updateImportsForTypescriptFile(tsChecker, file, symbolName, declarationName, moduleSpecifier, tsFileToImport) {
    // The trait might already be imported, possibly under a different name. If so, determine the
    // local name of the imported trait.
    const allImports = findAllMatchingNodes(file, { filter: typescript_1.default.isImportDeclaration });
    const existingImportName = hasImport(tsChecker, allImports, symbolName, tsFileToImport);
    if (existingImportName !== null) {
        return [[], existingImportName];
    }
    // If the trait has not already been imported, we need to insert the new import.
    const existingImportDeclaration = allImports.find((decl) => moduleSpecifierPointsToFile(tsChecker, decl.moduleSpecifier, tsFileToImport));
    const importName = nonCollidingImportName(allImports, symbolName === 'default' ? declarationName : symbolName);
    if (existingImportDeclaration !== undefined) {
        // Update an existing import declaration.
        const importClause = existingImportDeclaration.importClause;
        if (importClause === undefined) {
            return [[], ''];
        }
        let span = { start: importClause.getStart(), length: importClause.getWidth() };
        const updatedBindings = updateImport(existingImportDeclaration, symbolName, importName);
        if (updatedBindings === undefined) {
            return [[], ''];
        }
        const importString = printNode(updatedBindings, file);
        return [[{ span, newText: importString }], importName];
    }
    // Find the last import in the file.
    let lastImport = null;
    file.forEachChild((child) => {
        if (typescript_1.default.isImportDeclaration(child))
            lastImport = child;
    });
    // Generate a new import declaration, and insert it after the last import declaration, only
    // looking at root nodes in the AST. If no import exists, place it at the start of the file.
    let span = { start: 0, length: 0 };
    if (lastImport !== null) {
        // TODO: Why does the compiler insist this is null?
        span.start = lastImport.getStart() + lastImport.getWidth();
    }
    const newImportDeclaration = generateImport(symbolName, importName, moduleSpecifier);
    const importString = '\n' + printNode(newImportDeclaration, file);
    return [[{ span, newText: importString }], importName];
}
/**
 * Updates a given Angular trait, such as an NgModule or standalone Component, by adding
 * `importName` to the list of imports on the decorator arguments.
 */
function updateImportsForAngularTrait(checker, trait, importName, forwardRefName) {
    var _a;
    // Get the object with arguments passed into the primary Angular decorator for this trait.
    const decorator = checker.getPrimaryAngularDecorator(trait);
    if (decorator === null) {
        return [];
    }
    const decoratorProps = findFirstMatchingNode(decorator, { filter: typescript_1.default.isObjectLiteralExpression });
    if (decoratorProps === null) {
        return [];
    }
    /**
     * The assumption here is that there is a `template` or `templateUrl` in the decorator.
     */
    if (decoratorProps.properties.length === 0) {
        return [];
    }
    const lastProp = decoratorProps.properties[decoratorProps.properties.length - 1];
    const trailRange = typescript_1.default.getTrailingCommentRanges(decoratorProps.getSourceFile().text, lastProp.end);
    const lastTrailRange = trailRange !== undefined && trailRange.length > 0
        ? trailRange[trailRange.length - 1]
        : undefined;
    const lastTrailRangePos = (_a = lastTrailRange === null || lastTrailRange === void 0 ? void 0 : lastTrailRange.end) !== null && _a !== void 0 ? _a : lastProp.end;
    const oldImports = decoratorProps.properties.find((prop) => { var _a; return ((_a = prop.name) === null || _a === void 0 ? void 0 : _a.getText()) === 'imports'; });
    let updateRequired = true;
    // Update the trait's imports.
    const newDecoratorProps = updateObjectValueForKey(decoratorProps, 'imports', (oldValue) => {
        if (oldValue && !typescript_1.default.isArrayLiteralExpression(oldValue)) {
            return oldValue;
        }
        const identifier = typescript_1.default.factory.createIdentifier(importName);
        const expression = forwardRefName
            ? typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier(forwardRefName), undefined, [
                typescript_1.default.factory.createArrowFunction(undefined, undefined, [], undefined, undefined, identifier),
            ])
            : identifier;
        const newArr = ensureArrayWithIdentifier(importName, expression, oldValue);
        updateRequired = newArr !== null;
        return newArr;
    });
    if (!updateRequired) {
        return [];
    }
    const indentationNumber = (0, format_1.guessIndentationInSingleLine)(lastProp, lastProp.getSourceFile());
    const indentationString = indentationNumber !== undefined ? ' '.repeat(indentationNumber) : '';
    let indentationPrefix = ',\n' + indentationString;
    /**
     * If the last trail range is a single line comment, the `,` should be placed in the next line and the
     * `imports` arrays should be placed in the next line of `,`.
     *
     * For example:
     *
     * {
     *   template: "" // this is a comment
     * }
     *
     * =>
     *
     * {
     *   template: "" // this is an comment
     *   ,
     *   imports: []
     * }
     */
    if ((lastTrailRange === null || lastTrailRange === void 0 ? void 0 : lastTrailRange.kind) === typescript_1.default.SyntaxKind.SingleLineCommentTrivia) {
        indentationPrefix = '\n' + indentationString + ',\n' + indentationString;
    }
    return [
        {
            /**
             * If the `imports` exists in the object, replace the old `imports` array with the new `imports` array.
             * If the `imports` doesn't exist in the object, append the `imports` array after the last property of the object.
             *
             * There is a weird usage, but it's acceptable. For example:
             *
             * {
             *   template: ``, // This is a comment for the template
             *  _____________^ // The new `imports` array is appended here before the `,`
             * }
             *
             * =>
             *
             * {
             *   template: ``,
             *   imports: [], // This is a comment for the template
             * }
             *
             */
            span: {
                start: oldImports !== undefined ? oldImports.getStart() : lastTrailRangePos,
                length: oldImports !== undefined ? oldImports.getEnd() - oldImports.getStart() : 0,
            },
            newText: (oldImports !== undefined ? '' : indentationPrefix) +
                printNode(newDecoratorProps, trait.getSourceFile()),
        },
    ];
}
/**
 * Return whether a given Angular decorator specifies `standalone: true`.
 */
function isStandaloneDecorator(decorator) {
    const decoratorProps = findFirstMatchingNode(decorator, { filter: typescript_1.default.isObjectLiteralExpression });
    if (decoratorProps === null) {
        return null;
    }
    for (const property of decoratorProps.properties) {
        if (!typescript_1.default.isPropertyAssignment(property)) {
            continue;
        }
        // TODO(dylhunn): What if this is a dynamically evaluated expression?
        if (property.name.getText() === 'standalone' && property.initializer.getText() === 'false') {
            return false;
        }
    }
    return true;
}
/**
 * Generate a new import. Follows the format:
 * ```ts
 * import {exportedSpecifierName as localName} from 'rawModuleSpecifier';
 * ```
 *
 * If the component is exported by default, follows the format:
 *
 * ```ts
 * import exportedSpecifierName from 'rawModuleSpecifier';
 * ```
 *
 * If `exportedSpecifierName` is null, or is equal to `name`, then the qualified import alias will
 * be omitted.
 */
function generateImport(localName, exportedSpecifierName, rawModuleSpecifier) {
    let propName;
    if (exportedSpecifierName !== null && exportedSpecifierName !== localName) {
        propName = typescript_1.default.factory.createIdentifier(exportedSpecifierName);
    }
    const name = typescript_1.default.factory.createIdentifier(localName);
    const moduleSpec = typescript_1.default.factory.createStringLiteral(rawModuleSpecifier);
    let importClauseName;
    let importBindings;
    if (localName === 'default' && exportedSpecifierName !== null) {
        importClauseName = typescript_1.default.factory.createIdentifier(exportedSpecifierName);
    }
    else {
        importBindings = typescript_1.default.factory.createNamedImports([
            typescript_1.default.factory.createImportSpecifier(false, propName, name),
        ]);
    }
    return typescript_1.default.factory.createImportDeclaration(undefined, typescript_1.default.factory.createImportClause(false, importClauseName, importBindings), moduleSpec, undefined);
}
/**
 * Update an existing named import with a new member.
 * If `exportedSpecifierName` is null, or is equal to `name`, then the qualified import alias will
 * be omitted.
 * If the `localName` is `default` and `exportedSpecifierName` is not null, the `exportedSpecifierName`
 * is used as the default import name.
 */
function updateImport(importDeclaration, localName, exportedSpecifierName) {
    const importClause = importDeclaration.importClause;
    if (importClause === undefined) {
        return undefined;
    }
    const bindings = importClause.namedBindings;
    if (bindings !== undefined && typescript_1.default.isNamespaceImport(bindings)) {
        // This should be impossible. If a namespace import is present, the symbol was already
        // considered imported above.
        console.error(`Unexpected namespace import ${importDeclaration.getText()}`);
        return undefined;
    }
    if (localName === 'default' && exportedSpecifierName !== null) {
        const importClauseName = typescript_1.default.factory.createIdentifier(exportedSpecifierName);
        return typescript_1.default.factory.updateImportClause(importClause, false, importClauseName, importClause.namedBindings);
    }
    let propertyName;
    if (exportedSpecifierName !== null && exportedSpecifierName !== localName) {
        propertyName = typescript_1.default.factory.createIdentifier(exportedSpecifierName);
    }
    const name = typescript_1.default.factory.createIdentifier(localName);
    const newImport = typescript_1.default.factory.createImportSpecifier(false, propertyName, name);
    let namedImport;
    if (bindings === undefined) {
        namedImport = typescript_1.default.factory.createNamedImports([newImport]);
    }
    else {
        namedImport = typescript_1.default.factory.updateNamedImports(bindings, [...bindings.elements, newImport]);
    }
    return typescript_1.default.factory.updateImportClause(importClause, false, importClause.name, namedImport);
}
let printer = null;
/**
 * Get a ts.Printer for printing AST nodes, reusing the previous Printer if already created.
 */
function getOrCreatePrinter() {
    if (printer === null) {
        printer = typescript_1.default.createPrinter();
    }
    return printer;
}
/**
 * Print a given TypeScript node into a string. Used to serialize entirely synthetic generated AST,
 * which will not have `.text` or `.fullText` set.
 */
function printNode(node, sourceFile) {
    return getOrCreatePrinter().printNode(typescript_1.default.EmitHint.Unspecified, node, sourceFile);
}
/**
 * Get the code actions to tell the vscode how to import the directive into the standalone component or ng module.
 */
function getCodeActionToImportTheDirectiveDeclaration(compiler, importOn, directive) {
    const codeActions = [];
    const currMatchSymbol = directive.tsSymbol.valueDeclaration;
    const potentialImports = compiler
        .getTemplateTypeChecker()
        .getPotentialImportsFor(directive.ref, importOn, api_1.PotentialImportMode.Normal);
    const declarationName = directive.ref.node.name.getText();
    for (const potentialImport of potentialImports) {
        const fileImportChanges = [];
        let importName;
        let forwardRefName = null;
        if (potentialImport.moduleSpecifier) {
            const [importChanges, generatedImportName] = updateImportsForTypescriptFile(compiler.getCurrentProgram().getTypeChecker(), importOn.getSourceFile(), potentialImport.symbolName, declarationName, potentialImport.moduleSpecifier, currMatchSymbol.getSourceFile());
            importName = generatedImportName;
            fileImportChanges.push(...importChanges);
        }
        else {
            if (potentialImport.isForwardReference) {
                // Note that we pass the `importOn` file twice since we know that the potential import
                // is within the same file, because it doesn't have a `moduleSpecifier`.
                const [forwardRefImports, generatedForwardRefName] = updateImportsForTypescriptFile(compiler.getCurrentProgram().getTypeChecker(), importOn.getSourceFile(), 'forwardRef', declarationName, '@angular/core', importOn.getSourceFile());
                fileImportChanges.push(...forwardRefImports);
                forwardRefName = generatedForwardRefName;
            }
            importName = potentialImport.symbolName;
        }
        // Always update the trait import, although the TS import might already be present.
        const traitImportChanges = updateImportsForAngularTrait(compiler.getTemplateTypeChecker(), importOn, importName, forwardRefName);
        if (traitImportChanges.length === 0)
            continue;
        let description = `Import ${importName}`;
        if (potentialImport.moduleSpecifier !== undefined) {
            description += ` from '${potentialImport.moduleSpecifier}' on ${importOn.name.text}`;
        }
        codeActions.push({
            description,
            changes: [
                {
                    fileName: importOn.getSourceFile().fileName,
                    textChanges: [...fileImportChanges, ...traitImportChanges],
                },
            ],
        });
    }
    return codeActions;
}
