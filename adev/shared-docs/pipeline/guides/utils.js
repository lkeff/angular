"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPageTitle = getPageTitle;
exports.setContext = setContext;
exports.loadWorkspaceRelativeFile = loadWorkspaceRelativeFile;
const fs_1 = require("fs");
const path_1 = require("path");
const process_1 = require("process");
// TODO(josephperrott): Set edit content url based on the owner, repo and branch.
/** The base url for edting the a file in the repository. */
const GITHUB_EDIT_CONTENT_URL = 'https://github.com/angular/angular/edit/main';
/** Get the page title with edit button to modify the page source. */
function getPageTitle(text) {
    return `
  <!-- Page title -->
  <div class="docs-page-title">
    <h1 tabindex="-1">${text}</h1>
    <a class="docs-github-links" target="_blank" href="${GITHUB_EDIT_CONTENT_URL}/${context === null || context === void 0 ? void 0 : context.markdownFilePath}" title="Edit this page" aria-label="Edit this page">
      <!-- Pencil -->
      <docs-icon role="presentation">edit</docs-icon>
    </a>
  </div>`;
}
let context = {};
function setContext(envContext) {
    context = envContext;
}
/** The base directory of the workspace the script is running in. */
const WORKSPACE_DIR = (0, process_1.cwd)();
function loadWorkspaceRelativeFile(filePath) {
    const fullFilePath = (0, path_1.join)(WORKSPACE_DIR, filePath);
    if (!(0, fs_1.existsSync)(fullFilePath)) {
        throw Error(`Cannot find: ${filePath}`);
    }
    return (0, fs_1.readFileSync)(fullFilePath, { encoding: 'utf-8' });
}
