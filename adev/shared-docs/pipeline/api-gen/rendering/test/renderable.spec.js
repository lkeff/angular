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
const configuration_1 = require("../marked/configuration");
const processing_1 = require("../processing");
const shiki_1 = require("../shiki/shiki");
const symbol_context_1 = require("../symbol-context");
// Note: The tests will probably break if the schema of the api extraction changes.
// All entries in the fake-entries are extracted from Angular's api.
// You can just generate them an copy/replace the items in the fake-entries file.
describe('renderable', () => {
    const entries = new Map();
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
            entries.set(entry['name'], renderableJson);
        }
    }));
    it('should compute the flags correctly', () => {
        // linkedSignal has the developerPreview tag on the overloads not on the main entry.
        const linkedSignal = entries.get('linkedSignal');
        expect(linkedSignal).toBeDefined();
        expect(linkedSignal.deprecated).toBe(undefined);
        expect(linkedSignal.developerPreview).toEqual({ version: undefined });
        expect(linkedSignal.experimental).toBe(undefined);
        expect(linkedSignal.stable).toBe(undefined);
    });
});
