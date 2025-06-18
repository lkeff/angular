"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
/* tslint:disable:no-console  */
const common_1 = require("@angular/common");
const platform_server_1 = require("@angular/platform-server");
const express_1 = __importDefault(require("express"));
const main_server_1 = __importDefault(require("./src/main.server"));
const node_url_1 = require("node:url");
const node_path_1 = require("node:path");
const node_fs_1 = require("node:fs");
require("./prerender");
const app = (0, express_1.default)();
const serverDistFolder = (0, node_path_1.dirname)((0, node_url_1.fileURLToPath)(import.meta.url));
const browserDistFolder = (0, node_path_1.resolve)(serverDistFolder, '../browser');
const indexHtml = (0, node_fs_1.readFileSync)((0, node_path_1.join)(browserDistFolder, 'index.csr.html'), 'utf-8');
// Serve static files from /browser
app.get('*.*', express_1.default.static(browserDistFolder, {
    maxAge: '1y',
}));
// Mock API
app.get('/api', (req, res) => {
    res.json({ data: 'API 1 response' });
});
app.get('/api-2', (req, res) => {
    res.json({ data: 'API 2 response' });
});
// All regular routes use the Universal engine
app.get('*', (req, res) => {
    const { protocol, originalUrl, baseUrl, headers } = req;
    (0, platform_server_1.renderModule)(main_server_1.default, {
        document: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        extraProviders: [{ provide: common_1.APP_BASE_HREF, useValue: baseUrl }],
    }).then((response) => {
        res.send(response);
    });
});
app.listen(4206, () => {
    console.log('Server listening on port 4206!');
});
