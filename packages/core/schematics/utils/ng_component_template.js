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
exports.NgComponentTemplateVisitor = void 0;
const typescript_1 = __importDefault(require("typescript"));
const extract_metadata_1 = require("./extract_metadata");
const line_mappings_1 = require("./line_mappings");
const property_name_1 = require("./typescript/property_name");
const file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system");
/**
 * Visitor that can be used to determine Angular templates referenced within given
 * TypeScript source files (inline templates or external referenced templates)
 */
class NgComponentTemplateVisitor {
    constructor(typeChecker) {
        this.typeChecker = typeChecker;
        this.resolvedTemplates = [];
        this.fs = (0, file_system_1.getFileSystem)();
    }
    visitNode(node) {
        if (node.kind === typescript_1.default.SyntaxKind.ClassDeclaration) {
            this.visitClassDeclaration(node);
        }
        typescript_1.default.forEachChild(node, (n) => this.visitNode(n));
    }
    visitClassDeclaration(node) {
        const metadata = (0, extract_metadata_1.extractAngularClassMetadata)(this.typeChecker, node);
        if (metadata === null || metadata.type !== 'component') {
            return;
        }
        const sourceFile = node.getSourceFile();
        const sourceFileName = sourceFile.fileName;
        // Walk through all component metadata properties and determine the referenced
        // HTML templates (either external or inline)
        metadata.node.properties.forEach((property) => {
            if (!typescript_1.default.isPropertyAssignment(property)) {
                return;
            }
            const propertyName = (0, property_name_1.getPropertyNameText)(property.name);
            // In case there is an inline template specified, ensure that the value is statically
            // analyzable by checking if the initializer is a string literal-like node.
            if (propertyName === 'template' && typescript_1.default.isStringLiteralLike(property.initializer)) {
                // Need to add an offset of one to the start because the template quotes are
                // not part of the template content.
                // The `getText()` method gives us the original raw text.
                // We could have used the `text` property, but if the template is defined as a backtick
                // string then the `text` property contains a "cooked" version of the string. Such cooked
                // strings will have converted CRLF characters to only LF. This messes up string
                // replacements in template migrations.
                // The raw text returned by `getText()` includes the enclosing quotes so we change the
                // `content` and `start` values accordingly.
                const content = property.initializer.getText().slice(1, -1);
                const start = property.initializer.getStart() + 1;
                this.resolvedTemplates.push({
                    filePath: sourceFileName,
                    container: node,
                    content,
                    inline: true,
                    start: start,
                    getCharacterAndLineOfPosition: (pos) => typescript_1.default.getLineAndCharacterOfPosition(sourceFile, pos + start),
                });
            }
            if (propertyName === 'templateUrl' && typescript_1.default.isStringLiteralLike(property.initializer)) {
                const absolutePath = this.fs.resolve(this.fs.dirname(sourceFileName), property.initializer.text);
                if (!this.fs.exists(absolutePath)) {
                    return;
                }
                const fileContent = this.fs.readFile(absolutePath);
                const lineStartsMap = (0, line_mappings_1.computeLineStartsMap)(fileContent);
                this.resolvedTemplates.push({
                    filePath: absolutePath,
                    container: node,
                    content: fileContent,
                    inline: false,
                    start: 0,
                    getCharacterAndLineOfPosition: (pos) => (0, line_mappings_1.getLineAndCharacterFromPosition)(lineStartsMap, pos),
                });
            }
        });
    }
}
exports.NgComponentTemplateVisitor = NgComponentTemplateVisitor;
