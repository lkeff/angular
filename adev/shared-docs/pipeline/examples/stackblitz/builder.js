"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
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
exports.generateStackblitzExample = generateStackblitzExample;
const path_1 = require("path");
const promises_1 = require("fs/promises");
const file_system_1 = require("../shared/file-system");
const jsdom_1 = __importDefault(require("jsdom"));
const tinyglobby_1 = require("tinyglobby");
const region_parser_1 = require("../../guides/extensions/docs-code/regions/region-parser");
const copyright_1 = require("../shared/copyright");
const defaults_1 = require("./defaults");
function generateStackblitzExample(exampleDir, temporaryExampleDir, stackblitzTemplateDir) {
    return __awaiter(this, void 0, void 0, function* () {
        const config = yield (0, promises_1.readFile)((0, path_1.join)(exampleDir, defaults_1.STACKBLITZ_CONFIG_FILENAME), 'utf-8');
        const stackblitzConfig = JSON.parse(config);
        yield (0, file_system_1.createFolder)(temporaryExampleDir);
        // Copy template files to TEMP folder
        yield (0, file_system_1.copyFolder)(stackblitzTemplateDir, temporaryExampleDir);
        // Copy example files to TEMP folder
        yield (0, file_system_1.copyFolder)(exampleDir, temporaryExampleDir);
        const result = yield generateStackblitzHtml(temporaryExampleDir, stackblitzConfig);
        yield (0, file_system_1.removeFolder)(temporaryExampleDir);
        return result;
    });
}
function generateStackblitzHtml(temporaryExampleDir, stackBlitzConfig) {
    return __awaiter(this, void 0, void 0, function* () {
        const defaultIncludes = [
            '**/*.ts',
            '**/*.js',
            '**/*.css',
            '**/*.html',
            '**/*.md',
            '**/*.json',
            '**/*.svg',
        ];
        const exampleFilePaths = yield (0, tinyglobby_1.glob)(defaultIncludes, {
            cwd: temporaryExampleDir,
            onlyFiles: true,
            dot: true,
            ignore: stackBlitzConfig.ignore,
        });
        const postData = yield createPostData(temporaryExampleDir, stackBlitzConfig, exampleFilePaths);
        const primaryFile = getPrimaryFile(stackBlitzConfig.file, exampleFilePaths);
        return createStackblitzHtml(postData, primaryFile);
    });
}
function getPrimaryFile(primaryFilePath, exampleFilePaths) {
    if (primaryFilePath) {
        if (!exampleFilePaths.some((filePath) => filePath === primaryFilePath)) {
            throw new Error(`The specified primary file (${primaryFilePath}) does not exist!`);
        }
        return primaryFilePath;
    }
    else {
        const defaultPrimaryFilePaths = [
            'src/app/app.component.html',
            'src/app/app.component.ts',
            'src/app/main.ts',
        ];
        const primaryFile = defaultPrimaryFilePaths.find((path) => exampleFilePaths.some((filePath) => filePath === path));
        if (!primaryFile) {
            throw new Error(`None of the default primary files (${defaultPrimaryFilePaths.join(', ')}) exists.`);
        }
        return primaryFile;
    }
}
function createPostData(exampleDir, config, exampleFilePaths) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const postData = {};
        for (const filePath of exampleFilePaths) {
            if (defaults_1.EXCLUDE_FILES_FOR_STACKBLITZ.some((excludedFile) => filePath.endsWith(excludedFile))) {
                continue;
            }
            let content = yield (0, promises_1.readFile)((0, path_1.join)(exampleDir, filePath), 'utf-8');
            content = (0, copyright_1.appendCopyrightToFile)(filePath, content);
            content = extractRegions(filePath, content);
            postData[`project[files][${filePath}]`] = content;
        }
        const tags = ['angular', 'example', ...(config.tags || [])];
        tags.forEach((tag, index) => (postData[`project[tags][${index}]`] = tag));
        postData['project[description]'] = `Angular Example - ${config.description}`;
        postData['project[template]'] = 'node';
        postData['project[title]'] = (_a = config.title) !== null && _a !== void 0 ? _a : 'Angular Example';
        return postData;
    });
}
function createStackblitzHtml(postData, primaryFile) {
    const baseHtml = createBaseStackblitzHtml(primaryFile);
    const doc = new jsdom_1.default.JSDOM(baseHtml).window.document;
    const form = doc.querySelector('form');
    for (const [key, value] of Object.entries(postData)) {
        const element = htmlToElement(doc, `<input type="hidden" name="${key}">`);
        if (element && form) {
            element.setAttribute('value', value);
            form.appendChild(element);
        }
    }
    return doc.documentElement.outerHTML;
}
function createBaseStackblitzHtml(primaryFile) {
    const action = `https://stackblitz.com/run?file=${primaryFile}`;
    return `
    <!DOCTYPE html><html lang="en"><body>
      <form id="mainForm" method="post" action="${action}" target="_self"></form>
      <script>
        var embedded = 'ctl=1';
        var isEmbedded = window.location.search.indexOf(embedded) > -1;

        if (isEmbedded) {
          var form = document.getElementById('mainForm');
          var action = form.action;
          var actionHasParams = action.indexOf('?') > -1;
          var symbol = actionHasParams ? '&' : '?'
          form.action = form.action + symbol + embedded;
        }
        document.getElementById("mainForm").submit();
      </script>
    </body></html>
  `.trim();
}
function htmlToElement(document, html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.firstElementChild;
}
function extractRegions(path, contents) {
    const fileType = path === null || path === void 0 ? void 0 : path.split('.').pop();
    const regionParserResult = (0, region_parser_1.regionParser)(contents, fileType);
    return regionParserResult.contents;
}
