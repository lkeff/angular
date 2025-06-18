"use strict";
/**
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
Object.defineProperty(exports, "__esModule", { value: true });
const runfiles_1 = require("@bazel/runfiles");
const promises_1 = require("fs/promises");
const jsdom_1 = require("jsdom");
const configuration_1 = require("../marked/configuration");
const processing_1 = require("../processing");
const rendering_1 = require("../rendering");
const shiki_1 = require("../shiki/shiki");
describe('CLI docs to html', () => {
    let fragment;
    let entryJson;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, shiki_1.initHighlighter)();
        yield (0, configuration_1.configureMarkedGlobally)();
        const entryContent = yield (0, promises_1.readFile)(runfiles_1.runfiles.resolvePackageRelative('fake-cli-entries.json'), {
            encoding: 'utf-8',
        });
        entryJson = JSON.parse(entryContent);
        const renderableJson = (0, processing_1.getRenderable)(entryJson, '', 'angular/cli');
        fragment = jsdom_1.JSDOM.fragment(yield (0, rendering_1.renderEntry)(renderableJson));
    }));
    it('should subcommands correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const generateComponentSubcommand = entryJson.subcommands.find((subcommand) => subcommand.name === 'component');
        const renderableJson = (0, processing_1.getRenderable)(generateComponentSubcommand, '', 'angular/cli');
        fragment = jsdom_1.JSDOM.fragment(yield (0, rendering_1.renderEntry)(renderableJson));
        const cliTocs = fragment.querySelectorAll('.docs-reference-cli-toc');
        expect(cliTocs.length).toBe(2);
        expect(cliTocs[0].textContent).toContain('ng component[name][options]');
        expect(cliTocs[1].textContent).toContain('ng c[name][options]');
    }));
});
