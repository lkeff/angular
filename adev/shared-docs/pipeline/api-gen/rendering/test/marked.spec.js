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
const symbol_context_1 = require("../symbol-context");
// Note: The tests will probably break if the schema of the api extraction changes.
// All entries in the fake-entries are extracted from Angular's api.
// You can just generate them an copy/replace the items in the fake-entries file.
describe('markdown to html', () => {
    const entries = new Map();
    const entries2 = new Map();
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, shiki_1.initHighlighter)();
        yield (0, configuration_1.configureMarkedGlobally)();
        const entryContent = yield (0, promises_1.readFile)(runfiles_1.runfiles.resolvePackageRelative('fake-entries.json'), {
            encoding: 'utf-8',
        });
        const entryJson = JSON.parse(entryContent);
        const symbols = new Map([
            ['AfterRenderPhase', 'core'],
            ['afterRender', 'core'],
            ['EmbeddedViewRef', 'core'],
            ['ChangeDetectionStrategy', 'core'],
            ['ChangeDetectorRef', 'core'],
            ['withNoHttpTransferCache', 'platform-browser'],
            ['withHttpTransferCacheOptions', 'platform-browser'],
            ['withI18nSupport', 'platform-browser'],
            ['withEventReplay', 'platform-browser'],
        ]);
        (0, symbol_context_1.setSymbols)(symbols);
        for (const entry of entryJson.entries) {
            const renderableJson = (0, processing_1.getRenderable)(entry, '@angular/fakeentry', 'angular/angular');
            const fragment = jsdom_1.JSDOM.fragment(yield (0, rendering_1.renderEntry)(renderableJson));
            entries.set(entry['name'], fragment);
            entries2.set(entry['name'], yield (0, rendering_1.renderEntry)(renderableJson));
        }
    }));
    it('should render description correctly', () => {
        const afterNextRenderEntry = entries.get('afterNextRender');
        const header = afterNextRenderEntry.querySelector('.docs-reference-header');
        expect(header).toBeDefined();
        expect(header.outerHTML).not.toContain('```');
        const list = afterNextRenderEntry.querySelector('ul');
        expect(list).toBeDefined();
        // List are rendered
        expect(list.outerHTML).toContain('<li>');
        // Code blocks are rendered
        expect(list.outerHTML).toContain('<code>mixedReadWrite</code>');
    });
    it('should render multiple {@link} blocks', () => {
        const provideClientHydrationEntry = entries.get('provideClientHydration');
        expect(provideClientHydrationEntry).toBeDefined();
        const cardItem = provideClientHydrationEntry.querySelector('.docs-reference-card-item');
        expect(cardItem.innerHTML).not.toContain('@link');
    });
    it('should create cross-links', () => {
        const entry = entries.get('AfterRenderOptions');
        expect(entry).toBeDefined();
        // In the description
        const descriptionItem = entry.querySelector('.docs-reference-description');
        expect(descriptionItem.innerHTML).toContain('<a href="/api/core/afterRender">afterRender</a>');
        // In the card
        const cardItem = entry.querySelectorAll('.docs-reference-card-item')[1];
        expect(cardItem.innerHTML).toContain('<a href="/api/core/AfterRenderPhase#MixedReadWrite">AfterRenderPhase.MixedReadWrite</a>');
    });
});
