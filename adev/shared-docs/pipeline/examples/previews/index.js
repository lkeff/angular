"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const promises_1 = require("fs/promises");
const path_1 = require("path");
const tinyglobby_1 = require("tinyglobby");
const typescript_1 = __importDefault(require("typescript"));
const [examplesDir, templateFilePath, outputFilePath] = process.argv.slice(2);
const EXAMPLES_PATH = `../../content/examples`;
main();
/**
 * Creates a map of example path to dynamic component import for loading embedded examples.
 *
 * For example, given the following inputs:
 * examplesDir: 'adev/src/content/examples',
 * templateFilePath: 'adev/shared-docs/pipeline/examples/previews/previews.template',
 * outputFilePath: 'bazel-out/k8-fastbuild/bin/adev/src/assets/previews/previews.ts'
 *
 * The script will generate a mapping of all example components under adev/src/content/examples and
 * fill them into the given template file, writing the result to the output file.
 *
 * It will replace the placeholder text `${previewsComponents}` in the template with mappings like:
 * ['adev/src/content/examples/accessibility/src/app/app.component.ts']:
 *   () => import('../../content/examples/accessibility/src/app/app.component').then(c => c.AppComponent),
 * ['adev/src/content/examples/accessibility/src/app/progress-bar.component.ts']:
 *   () => import('../../content/examples/accessibility/src/app/progress-bar.component').then(c => c.ExampleProgressbarComponent),
 * ...
 */
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const files = yield (0, tinyglobby_1.glob)((0, path_1.join)(examplesDir, '**/*.ts'), {
            ignore: ['**/*.e2e-spec.ts', '**/*.spec.ts', '**/*.po.ts'],
        }).then((paths) => Promise.all(paths.map((path) => (0, promises_1.readFile)(path, { encoding: 'utf-8' }).then((fileContent) => {
            return {
                path: (0, path_1.relative)(examplesDir, path),
                content: fileContent,
            };
        }))));
        const filesWithComponent = files
            .map((file) => ({
            componentNames: analyzeFile(file),
            path: file.path,
        }))
            .filter((result) => result.componentNames.length > 0);
        const previewsComponentMap = generatePreviewsComponentMap(filesWithComponent);
        yield (0, promises_1.writeFile)(outputFilePath, previewsComponentMap);
    });
}
/** Returns list of the `Standalone` @Component class names for given file */
function analyzeFile(file) {
    const componentClassNames = [];
    const sourceFile = typescript_1.default.createSourceFile(file.path, file.content, typescript_1.default.ScriptTarget.Latest, false);
    const visitNode = (node) => {
        if (typescript_1.default.isClassDeclaration(node)) {
            const decorators = typescript_1.default.getDecorators(node);
            const componentName = node.name ? node.name.text : null;
            if (decorators && decorators.length) {
                for (const decorator of decorators) {
                    const call = decorator.expression;
                    if (typescript_1.default.isCallExpression(call) &&
                        typescript_1.default.isIdentifier(call.expression) &&
                        call.expression.text === 'Component' &&
                        call.arguments.length > 0 &&
                        typescript_1.default.isObjectLiteralExpression(call.arguments[0])) {
                        const standaloneProperty = call.arguments[0].properties.find((property) => property.name &&
                            typescript_1.default.isIdentifier(property.name) &&
                            property.name.text === 'standalone');
                        const isStandalone = !standaloneProperty ||
                            (typescript_1.default.isPropertyAssignment(standaloneProperty) &&
                                standaloneProperty.initializer.kind === typescript_1.default.SyntaxKind.TrueKeyword);
                        if (isStandalone && componentName) {
                            componentClassNames.push(componentName);
                        }
                    }
                }
            }
        }
        typescript_1.default.forEachChild(node, visitNode);
    };
    visitNode(sourceFile);
    return componentClassNames;
}
function generatePreviewsComponentMap(data) {
    let result = '';
    for (const fileData of data) {
        for (const componentName of fileData.componentNames) {
            const key = `adev/src/content/examples/${fileData.path}${fileData.componentNames.length > 1 ? '_' + componentName : ''}`.replace(/\\/g, '/');
            result += `['${key}']: () => import('${EXAMPLES_PATH}/${fileData.path
                .replace(/\\/g, '/')
                .replace('.ts', '')}').then(c => c.${componentName}),\n`;
        }
    }
    return fs.readFileSync(templateFilePath, 'utf8').replace(/\${previewsComponents}/g, result);
}
