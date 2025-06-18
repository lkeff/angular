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
const file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system");
const testing_1 = require("@angular/compiler-cli/src/ngtsc/logging/testing");
const testing_2 = require("@angular/compiler-cli/src/ngtsc/testing");
const path_1 = __importDefault(require("path"));
const url_1 = __importDefault(require("url"));
const index_1 = require("../../../src/migrate/index");
const helpers_1 = require("../../helpers");
const currentDir = path_1.default.dirname(url_1.default.fileURLToPath(import.meta.url));
(0, helpers_1.runInNativeFileSystem)(() => {
    let fs;
    let logger;
    let rootPath;
    let mappingFilePath;
    beforeEach(() => {
        fs = (0, file_system_1.getFileSystem)();
        logger = new testing_1.MockLogger();
        rootPath = (0, file_system_1.absoluteFrom)('/project');
        mappingFilePath = fs.resolve(rootPath, 'test_files/mapping.json');
        (0, testing_2.loadTestDirectory)(fs, path_1.default.join(currentDir, 'test_files'), (0, file_system_1.absoluteFrom)('/project/test_files'));
    });
    describe('migrateFiles()', () => {
        it('should log a warning if the migration file is empty', () => {
            const emptyMappingPath = fs.resolve(rootPath, 'test_files/empty-mapping.json');
            (0, index_1.migrateFiles)({
                rootPath,
                translationFilePaths: ['test_files/messages.json'],
                logger,
                mappingFilePath: emptyMappingPath,
            });
            expect(logger.logs.warn).toEqual([
                [
                    `Mapping file at ${emptyMappingPath} is empty. Either there are no messages ` +
                        `that need to be migrated, or the extraction step failed to find them.`,
                ],
            ]);
        });
        it('should migrate a json message file', () => {
            const filePath = 'test_files/messages.json';
            (0, index_1.migrateFiles)({
                rootPath,
                translationFilePaths: [filePath],
                logger,
                mappingFilePath,
            });
            expect(readAndNormalize(fs.resolve(rootPath, filePath))).toEqual([
                `{`,
                `  "locale": "en-GB",`,
                `  "translations": {`,
                `    "9876543": "Hello",`,
                `    "custom-id": "Custom id message",`,
                `    "987654321098765": "Goodbye"`,
                `  }`,
                `}`,
            ].join('\n'));
        });
        it('should migrate an arb message file', () => {
            const filePath = 'test_files/messages.arb';
            (0, index_1.migrateFiles)({
                rootPath,
                translationFilePaths: [filePath],
                logger,
                mappingFilePath,
            });
            expect(readAndNormalize(fs.resolve(rootPath, filePath))).toEqual([
                `{`,
                `  "@@locale": "en-GB",`,
                `  "9876543": "Hello",`,
                `  "@9876543": {`,
                `    "x-locations": [`,
                `      {`,
                `        "file": "test.js",`,
                `        "start": { "line": "1", "column": "0" },`,
                `        "end": { "line": "1", "column": "0" }`,
                `      }`,
                `    ]`,
                `  },`,
                `  "custom-id": "Custom id message",`,
                `  "@custom-id": {`,
                `    "x-locations": [`,
                `      {`,
                `        "file": "test.js",`,
                `        "start": { "line": "2", "column": "0" },`,
                `        "end": { "line": "2", "column": "0" }`,
                `      }`,
                `    ]`,
                `  },`,
                `  "987654321098765": "Goodbye",`,
                `  "@987654321098765": {`,
                `    "x-locations": [`,
                `      {`,
                `        "file": "test.js",`,
                `        "start": { "line": "3", "column": "0" },`,
                `        "end": { "line": "3", "column": "0" }`,
                `      }`,
                `    ]`,
                `  }`,
                `}`,
            ].join('\n'));
        });
        it('should migrate an xmb message file', () => {
            const filePath = 'test_files/messages.xmb';
            (0, index_1.migrateFiles)({
                rootPath,
                translationFilePaths: [filePath],
                logger,
                mappingFilePath,
            });
            expect(readAndNormalize(fs.resolve(rootPath, filePath))).toEqual([
                `<?xml version="1.0" encoding="UTF-8" ?>`,
                `<!DOCTYPE messagebundle [`,
                `<!ELEMENT messagebundle (msg)*>`,
                `<!ATTLIST messagebundle class CDATA #IMPLIED>`,
                ``,
                `<!ELEMENT msg (#PCDATA|ph|source)*>`,
                `<!ATTLIST msg id CDATA #IMPLIED>`,
                `<!ATTLIST msg seq CDATA #IMPLIED>`,
                `<!ATTLIST msg name CDATA #IMPLIED>`,
                `<!ATTLIST msg desc CDATA #IMPLIED>`,
                `<!ATTLIST msg meaning CDATA #IMPLIED>`,
                `<!ATTLIST msg obsolete (obsolete) #IMPLIED>`,
                `<!ATTLIST msg xml:space (default|preserve) "default">`,
                `<!ATTLIST msg is_hidden CDATA #IMPLIED>`,
                ``,
                `<!ELEMENT source (#PCDATA)>`,
                ``,
                `<!ELEMENT ph (#PCDATA|ex)*>`,
                `<!ATTLIST ph name CDATA #REQUIRED>`,
                ``,
                `<!ELEMENT ex (#PCDATA)>`,
                `]>`,
                `<messagebundle handler="angular">`,
                `  <msg id="9876543"><source>test.js:1</source>Hello</msg>`,
                `  <msg id="custom-id"><source>test.js:2</source>Custom id message</msg>`,
                `  <msg id="987654321098765"><source>test.js:3</source>Goodbye</msg>`,
                `</messagebundle>`,
            ].join('\n'));
        });
        it('should migrate an xlf message file', () => {
            const filePath = 'test_files/messages.xlf';
            (0, index_1.migrateFiles)({
                rootPath,
                translationFilePaths: [filePath],
                logger,
                mappingFilePath,
            });
            expect(readAndNormalize(fs.resolve(rootPath, filePath))).toEqual([
                `<?xml version="1.0" encoding="UTF-8" ?>`,
                `<xliff version="2.0" xmlns="urn:oasis:names:tc:xliff:document:2.0" srcLang="en-GB">`,
                `  <file id="ngi18n" original="ng.template" xml:space="preserve">`,
                `    <unit id="9876543">`,
                `      <notes>`,
                `        <note category="location">test.js:1</note>`,
                `      </notes>`,
                `      <segment>`,
                `        <source>Hello</source>`,
                `      </segment>`,
                `    </unit>`,
                `    <unit id="custom-id">`,
                `      <notes>`,
                `        <note category="location">test.js:2</note>`,
                `      </notes>`,
                `      <segment>`,
                `        <source>Custom id message</source>`,
                `      </segment>`,
                `    </unit>`,
                `    <unit id="987654321098765">`,
                `      <notes>`,
                `        <note category="location">test.js:3</note>`,
                `      </notes>`,
                `      <segment>`,
                `        <source>Goodbye</source>`,
                `      </segment>`,
                `    </unit>`,
                `  </file>`,
                `</xliff>`,
            ].join('\n'));
        });
        /** Reads a path from the file system and normalizes the line endings. */
        function readAndNormalize(path) {
            return fs.readFile(path).replace(/\r?\n/g, '\n');
        }
    });
});
