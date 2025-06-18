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
exports.migrateBindingElementInputReference = migrateBindingElementInputReference;
const typescript_1 = __importDefault(require("typescript"));
const tsurge_1 = require("../../../../../../utils/tsurge");
const binding_elements_1 = require("../../../utils/binding_elements");
const unique_names_1 = require("../../../utils/unique_names");
const assert_1 = __importDefault(require("assert"));
const create_block_arrow_function_1 = require("./create_block_arrow_function");
/**
 * Migrates a binding element that refers to an Angular input.
 *
 * E.g. `const {myInput} = this`.
 *
 * For references in binding elements, we extract the element into a variable
 * where we unwrap the input. This ensures narrowing naturally works in subsequent
 * places, and we also don't need to detect potential aliases.
 *
 * ```ts
 *   const {myInput} = this;
 *   // turns into
 *   const {myInput: myInputValue} = this;
 *   const myInput = myInputValue();
 * ```
 */
function migrateBindingElementInputReference(tsReferencesInBindingElements, info, replacements, printer) {
    var _a;
    const nameGenerator = new unique_names_1.UniqueNamesGenerator(['Input', 'Signal', 'Ref']);
    for (const reference of tsReferencesInBindingElements) {
        const bindingElement = reference.parent;
        const bindingDecl = (0, binding_elements_1.getBindingElementDeclaration)(bindingElement);
        const sourceFile = bindingElement.getSourceFile();
        const file = (0, tsurge_1.projectFile)(sourceFile, info);
        const inputFieldName = (_a = bindingElement.propertyName) !== null && _a !== void 0 ? _a : bindingElement.name;
        (0, assert_1.default)(!typescript_1.default.isObjectBindingPattern(inputFieldName) && !typescript_1.default.isArrayBindingPattern(inputFieldName), 'Property of binding element cannot be another pattern.');
        const tmpName = nameGenerator.generate(reference.text, bindingElement);
        // Only use the temporary name, if really needed. A temporary name is needed if
        // the input field simply aliased via the binding element, or if the exposed identifier
        // is a string-literal like.
        const useTmpNameForInputField = !typescript_1.default.isObjectBindingPattern(bindingElement.name) || !typescript_1.default.isIdentifier(inputFieldName);
        const propertyName = useTmpNameForInputField ? inputFieldName : undefined;
        const exposedName = useTmpNameForInputField
            ? typescript_1.default.factory.createIdentifier(tmpName)
            : inputFieldName;
        const newBindingToAccessInputField = typescript_1.default.factory.updateBindingElement(bindingElement, bindingElement.dotDotDotToken, propertyName, exposedName, bindingElement.initializer);
        const temporaryVariableReplacements = insertTemporaryVariableForBindingElement(bindingDecl, file, `const ${bindingElement.name.getText()} = ${exposedName.text}();`);
        if (temporaryVariableReplacements === null) {
            console.error(`Could not migrate reference ${reference.text} in ${file.rootRelativePath}`);
            continue;
        }
        replacements.push(new tsurge_1.Replacement(file, new tsurge_1.TextUpdate({
            position: bindingElement.getStart(),
            end: bindingElement.getEnd(),
            toInsert: printer.printNode(typescript_1.default.EmitHint.Unspecified, newBindingToAccessInputField, sourceFile),
        })), ...temporaryVariableReplacements);
    }
}
/**
 * Inserts the given code snippet after the given variable or
 * parameter declaration.
 *
 * If this is a parameter of an arrow function, a block may be
 * added automatically.
 */
function insertTemporaryVariableForBindingElement(expansionDecl, file, toInsert) {
    const sf = expansionDecl.getSourceFile();
    const parent = expansionDecl.parent;
    // The snippet is simply inserted after the variable declaration.
    // The other case of a variable declaration inside a catch clause is handled
    // below.
    if (typescript_1.default.isVariableDeclaration(expansionDecl) && typescript_1.default.isVariableDeclarationList(parent)) {
        const leadingSpaceCount = typescript_1.default.getLineAndCharacterOfPosition(sf, parent.getStart()).character;
        const leadingSpace = ' '.repeat(leadingSpaceCount);
        const statement = parent.parent;
        return [
            new tsurge_1.Replacement(file, new tsurge_1.TextUpdate({
                position: statement.getEnd(),
                end: statement.getEnd(),
                toInsert: `\n${leadingSpace}${toInsert}`,
            })),
        ];
    }
    // If we are dealing with a object expansion inside a parameter of
    // a function-like declaration w/ block, add the variable as the first
    // node inside the block.
    const bodyBlock = getBodyBlockOfNode(parent);
    if (bodyBlock !== null) {
        const firstElementInBlock = bodyBlock.statements[0];
        const spaceReferenceNode = firstElementInBlock !== null && firstElementInBlock !== void 0 ? firstElementInBlock : bodyBlock;
        const spaceOffset = firstElementInBlock !== undefined ? 0 : 2;
        const leadingSpaceCount = typescript_1.default.getLineAndCharacterOfPosition(sf, spaceReferenceNode.getStart()).character + spaceOffset;
        const leadingSpace = ' '.repeat(leadingSpaceCount);
        return [
            new tsurge_1.Replacement(file, new tsurge_1.TextUpdate({
                position: bodyBlock.getStart() + 1,
                end: bodyBlock.getStart() + 1,
                toInsert: `\n${leadingSpace}${toInsert}`,
            })),
        ];
    }
    // Other cases where we see an arrow function without a block.
    // We need to create one now.
    if (typescript_1.default.isArrowFunction(parent) && !typescript_1.default.isBlock(parent.body)) {
        return (0, create_block_arrow_function_1.createNewBlockToInsertVariable)(parent, file, toInsert);
    }
    return null;
}
/** Gets the body block of a given node, if available. */
function getBodyBlockOfNode(node) {
    if ((typescript_1.default.isMethodDeclaration(node) ||
        typescript_1.default.isFunctionDeclaration(node) ||
        typescript_1.default.isGetAccessorDeclaration(node) ||
        typescript_1.default.isConstructorDeclaration(node) ||
        typescript_1.default.isArrowFunction(node)) &&
        node.body !== undefined &&
        typescript_1.default.isBlock(node.body)) {
        return node.body;
    }
    if (typescript_1.default.isCatchClause(node.parent)) {
        return node.parent.block;
    }
    return null;
}
