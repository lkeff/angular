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
const file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system");
const invalid_file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system/src/invalid_file_system");
const testing_1 = require("@angular/compiler-cli/src/ngtsc/logging/testing");
const testing_2 = require("@angular/compiler-cli/src/ngtsc/testing");
const path_1 = __importDefault(require("path"));
const url_1 = __importDefault(require("url"));
const index_1 = require("../../../src/extract/index");
const helpers_1 = require("../../helpers");
const utils_1 = require("../translation_files/utils");
const currentDir = path_1.default.dirname(url_1.default.fileURLToPath(import.meta.url));
(0, helpers_1.runInNativeFileSystem)(() => {
    let fs;
    let logger;
    let rootPath;
    let outputPath;
    let sourceFilePath;
    let textFile1;
    let textFile2;
    beforeEach(() => {
        fs = (0, file_system_1.getFileSystem)();
        logger = new testing_1.MockLogger();
        rootPath = (0, file_system_1.absoluteFrom)('/project');
        outputPath = fs.resolve(rootPath, 'extracted-message-file');
        sourceFilePath = fs.resolve(rootPath, 'test_files/test.js');
        textFile1 = fs.resolve(rootPath, 'test_files/test-1.txt');
        textFile2 = fs.resolve(rootPath, 'test_files/test-2.txt');
        fs.ensureDir(fs.dirname(sourceFilePath));
        (0, testing_2.loadTestDirectory)(fs, path_1.default.join(currentDir, 'test_files'), (0, file_system_1.absoluteFrom)('/project/test_files'));
        (0, file_system_1.setFileSystem)(new invalid_file_system_1.InvalidFileSystem());
    });
    describe('extractTranslations()', () => {
        it('should ignore non-code files', () => {
            (0, index_1.extractTranslations)({
                rootPath,
                sourceLocale: 'en',
                sourceFilePaths: [textFile1, textFile2],
                format: 'json',
                outputPath,
                logger,
                useSourceMaps: false,
                useLegacyIds: false,
                duplicateMessageHandling: 'ignore',
                fileSystem: fs,
            });
            expect(fs.readFile(outputPath)).toEqual([`{`, `  "locale": "en",`, `  "translations": {}`, `}`].join('\n'));
        });
        for (const useLegacyIds of [true, false]) {
            describe(useLegacyIds ? '[using legacy ids]' : '', () => {
                it('should extract translations from source code, and write as simple JSON format', () => {
                    (0, index_1.extractTranslations)({
                        rootPath,
                        sourceLocale: 'en-GB',
                        sourceFilePaths: [sourceFilePath],
                        format: 'json',
                        outputPath,
                        logger,
                        useSourceMaps: false,
                        useLegacyIds,
                        duplicateMessageHandling: 'ignore',
                        fileSystem: fs,
                    });
                    expect(fs.readFile(outputPath)).toEqual([
                        `{`,
                        `  "locale": "en-GB",`,
                        `  "translations": {`,
                        `    "3291030485717846467": "Hello, {$PH}!",`,
                        `    "8669027859022295761": "try{$PH}me",`,
                        `    "custom-id": "Custom id message",`,
                        `    "273296103957933077": "Legacy id message",`,
                        `    "custom-id-2": "Custom and legacy message",`,
                        `    "2932901491976224757": "pre{$START_TAG_SPAN}inner-pre{$START_BOLD_TEXT}bold{$CLOSE_BOLD_TEXT}inner-post{$CLOSE_TAG_SPAN}post"`,
                        `  }`,
                        `}`,
                    ].join('\n'));
                });
                it('should extract translations from source code, and write as ARB format', () => {
                    (0, index_1.extractTranslations)({
                        rootPath,
                        sourceLocale: 'en-GB',
                        sourceFilePaths: [sourceFilePath],
                        format: 'arb',
                        outputPath,
                        logger,
                        useSourceMaps: false,
                        useLegacyIds,
                        duplicateMessageHandling: 'ignore',
                        fileSystem: fs,
                    });
                    expect(fs.readFile(outputPath)).toEqual([
                        '{',
                        '  "@@locale": "en-GB",',
                        '  "3291030485717846467": "Hello, {$PH}!",',
                        '  "@3291030485717846467": {',
                        '    "x-locations": [',
                        '      {',
                        '        "file": "test_files/test.js",',
                        '        "start": { "line": "1", "column": "23" },',
                        '        "end": { "line": "1", "column": "40" }',
                        '      }',
                        '    ]',
                        '  },',
                        '  "8669027859022295761": "try{$PH}me",',
                        '  "@8669027859022295761": {',
                        '    "x-locations": [',
                        '      {',
                        '        "file": "test_files/test.js",',
                        '        "start": { "line": "2", "column": "22" },',
                        '        "end": { "line": "2", "column": "80" }',
                        '      }',
                        '    ]',
                        '  },',
                        '  "custom-id": "Custom id message",',
                        '  "@custom-id": {',
                        '    "x-locations": [',
                        '      {',
                        '        "file": "test_files/test.js",',
                        '        "start": { "line": "3", "column": "29" },',
                        '        "end": { "line": "3", "column": "61" }',
                        '      }',
                        '    ]',
                        '  },',
                        '  "273296103957933077": "Legacy id message",',
                        '  "@273296103957933077": {',
                        '    "x-locations": [',
                        '      {',
                        '        "file": "test_files/test.js",',
                        '        "start": { "line": "4", "column": "29" },',
                        '        "end": { "line": "4", "column": "112" }',
                        '      }',
                        '    ]',
                        '  },',
                        '  "custom-id-2": "Custom and legacy message",',
                        '  "@custom-id-2": {',
                        '    "x-locations": [',
                        '      {',
                        '        "file": "test_files/test.js",',
                        '        "start": { "line": "5", "column": "38" },',
                        '        "end": { "line": "5", "column": "142" }',
                        '      }',
                        '    ]',
                        '  },',
                        '  "2932901491976224757": "pre{$START_TAG_SPAN}inner-pre{$START_BOLD_TEXT}bold{$CLOSE_BOLD_TEXT}inner-post{$CLOSE_TAG_SPAN}post",',
                        '  "@2932901491976224757": {',
                        '    "x-locations": [',
                        '      {',
                        '        "file": "test_files/test.js",',
                        '        "start": { "line": "6", "column": "26" },',
                        '        "end": { "line": "6", "column": "164" }',
                        '      }',
                        '    ]',
                        '  }',
                        '}',
                    ].join('\n'));
                });
                it('should extract translations from source code, and write as xmb format', () => {
                    (0, index_1.extractTranslations)({
                        rootPath,
                        sourceLocale: 'en',
                        sourceFilePaths: [sourceFilePath],
                        format: 'xmb',
                        outputPath,
                        logger,
                        useSourceMaps: false,
                        useLegacyIds,
                        duplicateMessageHandling: 'ignore',
                        fileSystem: fs,
                    });
                    expect(fs.readFile(outputPath)).toEqual([
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
                        `  <msg id="3291030485717846467"><source>test_files/test.js:1</source>Hello, <ph name="PH"/>!</msg>`,
                        `  <msg id="8669027859022295761"><source>test_files/test.js:2</source>try<ph name="PH"/>me</msg>`,
                        `  <msg id="custom-id"><source>test_files/test.js:3</source>Custom id message</msg>`,
                        `  <msg id="${useLegacyIds ? '12345678901234567890' : '273296103957933077'}"><source>test_files/test.js:4</source>Legacy id message</msg>`,
                        `  <msg id="custom-id-2"><source>test_files/test.js:5</source>Custom and legacy message</msg>`,
                        `  <msg id="2932901491976224757"><source>test_files/test.js:6</source>pre<ph name="START_TAG_SPAN"/>` +
                            `inner-pre<ph name="START_BOLD_TEXT"/>bold<ph name="CLOSE_BOLD_TEXT"/>inner-post<ph name="CLOSE_TAG_SPAN"/>post</msg>`,
                        `</messagebundle>\n`,
                    ].join('\n'));
                });
                for (const formatOptions of [{}, { 'xml:space': 'preserve' }]) {
                    it(`should extract translations from source code, and write as XLIFF 1.2 format${formatOptions['xml:space'] ? '[with xml:space attribute]' : ''}`, () => {
                        (0, index_1.extractTranslations)({
                            rootPath,
                            sourceLocale: 'en-CA',
                            sourceFilePaths: [sourceFilePath],
                            format: 'xliff',
                            outputPath,
                            logger,
                            useSourceMaps: false,
                            useLegacyIds,
                            duplicateMessageHandling: 'ignore',
                            formatOptions,
                            fileSystem: fs,
                        });
                        expect(fs.readFile(outputPath)).toEqual([
                            `<?xml version="1.0" encoding="UTF-8" ?>`,
                            `<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">`,
                            `  <file source-language="en-CA" datatype="plaintext" original="ng2.template"${(0, utils_1.toAttributes)(formatOptions)}>`,
                            `    <body>`,
                            `      <trans-unit id="3291030485717846467" datatype="html">`,
                            `        <source>Hello, <x id="PH" equiv-text="name"/>!</source>`,
                            `        <context-group purpose="location">`,
                            `          <context context-type="sourcefile">test_files/test.js</context>`,
                            `          <context context-type="linenumber">2</context>`,
                            `        </context-group>`,
                            `      </trans-unit>`,
                            `      <trans-unit id="8669027859022295761" datatype="html">`,
                            `        <source>try<x id="PH" equiv-text="40 + 2"/>me</source>`,
                            `        <context-group purpose="location">`,
                            `          <context context-type="sourcefile">test_files/test.js</context>`,
                            `          <context context-type="linenumber">3</context>`,
                            `        </context-group>`,
                            `      </trans-unit>`,
                            `      <trans-unit id="custom-id" datatype="html">`,
                            `        <source>Custom id message</source>`,
                            `        <context-group purpose="location">`,
                            `          <context context-type="sourcefile">test_files/test.js</context>`,
                            `          <context context-type="linenumber">4</context>`,
                            `        </context-group>`,
                            `      </trans-unit>`,
                            `      <trans-unit id="${useLegacyIds ? '1234567890123456789012345678901234567890' : '273296103957933077'}" datatype="html">`,
                            `        <source>Legacy id message</source>`,
                            `        <context-group purpose="location">`,
                            `          <context context-type="sourcefile">test_files/test.js</context>`,
                            `          <context context-type="linenumber">5</context>`,
                            `        </context-group>`,
                            `      </trans-unit>`,
                            `      <trans-unit id="custom-id-2" datatype="html">`,
                            `        <source>Custom and legacy message</source>`,
                            `        <context-group purpose="location">`,
                            `          <context context-type="sourcefile">test_files/test.js</context>`,
                            `          <context context-type="linenumber">6</context>`,
                            `        </context-group>`,
                            `      </trans-unit>`,
                            `      <trans-unit id="2932901491976224757" datatype="html">`,
                            `        <source>pre<x id="START_TAG_SPAN" ctype="x-span" equiv-text="&apos;&lt;span&gt;&apos;"/>` +
                                `inner-pre<x id="START_BOLD_TEXT" ctype="x-b" equiv-text="&apos;&lt;b&gt;&apos;"/>bold<x id="CLOSE_BOLD_TEXT" ctype="x-b" equiv-text="&apos;&lt;/b&gt;&apos;"/>` +
                                `inner-post<x id="CLOSE_TAG_SPAN" ctype="x-span" equiv-text="&apos;&lt;/span&gt;&apos;"/>post</source>`,
                            `        <context-group purpose="location">`,
                            `          <context context-type="sourcefile">test_files/test.js</context>`,
                            `          <context context-type="linenumber">7</context>`,
                            `        </context-group>`,
                            `      </trans-unit>`,
                            `    </body>`,
                            `  </file>`,
                            `</xliff>\n`,
                        ].join('\n'));
                    });
                    it('should extract translations from source code, and write as XLIFF 2 format', () => {
                        (0, index_1.extractTranslations)({
                            rootPath,
                            sourceLocale: 'en-AU',
                            sourceFilePaths: [sourceFilePath],
                            format: 'xliff2',
                            outputPath,
                            logger,
                            useSourceMaps: false,
                            useLegacyIds,
                            duplicateMessageHandling: 'ignore',
                            formatOptions,
                            fileSystem: fs,
                        });
                        expect(fs.readFile(outputPath)).toEqual([
                            `<?xml version="1.0" encoding="UTF-8" ?>`,
                            `<xliff version="2.0" xmlns="urn:oasis:names:tc:xliff:document:2.0" srcLang="en-AU">`,
                            `  <file id="ngi18n" original="ng.template"${(0, utils_1.toAttributes)(formatOptions)}>`,
                            `    <unit id="3291030485717846467">`,
                            `      <notes>`,
                            `        <note category="location">test_files/test.js:2</note>`,
                            `      </notes>`,
                            `      <segment>`,
                            `        <source>Hello, <ph id="0" equiv="PH" disp="name"/>!</source>`,
                            `      </segment>`,
                            `    </unit>`,
                            `    <unit id="8669027859022295761">`,
                            `      <notes>`,
                            `        <note category="location">test_files/test.js:3</note>`,
                            `      </notes>`,
                            `      <segment>`,
                            `        <source>try<ph id="0" equiv="PH" disp="40 + 2"/>me</source>`,
                            `      </segment>`,
                            `    </unit>`,
                            `    <unit id="custom-id">`,
                            `      <notes>`,
                            `        <note category="location">test_files/test.js:4</note>`,
                            `      </notes>`,
                            `      <segment>`,
                            `        <source>Custom id message</source>`,
                            `      </segment>`,
                            `    </unit>`,
                            `    <unit id="${useLegacyIds ? '12345678901234567890' : '273296103957933077'}">`,
                            `      <notes>`,
                            `        <note category="location">test_files/test.js:5</note>`,
                            `      </notes>`,
                            `      <segment>`,
                            `        <source>Legacy id message</source>`,
                            `      </segment>`,
                            `    </unit>`,
                            `    <unit id="custom-id-2">`,
                            `      <notes>`,
                            `        <note category="location">test_files/test.js:6</note>`,
                            `      </notes>`,
                            `      <segment>`,
                            `        <source>Custom and legacy message</source>`,
                            `      </segment>`,
                            `    </unit>`,
                            `    <unit id="2932901491976224757">`,
                            `      <notes>`,
                            `        <note category="location">test_files/test.js:7</note>`,
                            `      </notes>`,
                            `      <segment>`,
                            `        <source>pre<pc id="0" equivStart="START_TAG_SPAN" equivEnd="CLOSE_TAG_SPAN" type="other" dispStart="&apos;&lt;span&gt;&apos;" dispEnd="&apos;&lt;/span&gt;&apos;">` +
                                `inner-pre<pc id="1" equivStart="START_BOLD_TEXT" equivEnd="CLOSE_BOLD_TEXT" type="fmt" dispStart="&apos;&lt;b&gt;&apos;" dispEnd="&apos;&lt;/b&gt;&apos;">bold</pc>` +
                                `inner-post</pc>post</source>`,
                            `      </segment>`,
                            `    </unit>`,
                            `  </file>`,
                            `</xliff>\n`,
                        ].join('\n'));
                    });
                }
            });
        }
        for (const target of ['es2015', 'es5']) {
            it(`should render the original location of translations, when processing an ${target} bundle with source-maps`, () => {
                (0, index_1.extractTranslations)({
                    rootPath,
                    sourceLocale: 'en-CA',
                    sourceFilePaths: [fs.resolve(rootPath, `test_files/dist_${target}/index.js`)],
                    format: 'xliff',
                    outputPath,
                    logger,
                    useSourceMaps: true,
                    useLegacyIds: false,
                    duplicateMessageHandling: 'ignore',
                    fileSystem: fs,
                });
                expect(fs.readFile(outputPath)).toEqual([
                    `<?xml version="1.0" encoding="UTF-8" ?>`,
                    `<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">`,
                    `  <file source-language="en-CA" datatype="plaintext" original="ng2.template">`,
                    `    <body>`,
                    `      <trans-unit id="157258427077572998" datatype="html">`,
                    `        <source>Message in <x id="a-file" equiv-text="file"/>!</source>`,
                    `        <context-group purpose="location">`,
                    // These source file paths are due to how Bazel TypeScript compilation source-maps
                    // work
                    `          <context context-type="sourcefile">../packages/localize/tools/test/extract/integration/test_files/src/a.ts</context>`,
                    `          <context context-type="linenumber">3</context>`,
                    `        </context-group>`,
                    `      </trans-unit>`,
                    `      <trans-unit id="7829869508202074508" datatype="html">`,
                    `        <source>Message in <x id="b-file" equiv-text="file"/>!</source>`,
                    `        <context-group purpose="location">`,
                    `          <context context-type="sourcefile">../packages/localize/tools/test/extract/integration/test_files/src/b.ts</context>`,
                    `          <context context-type="linenumber">3</context>`,
                    `        </context-group>`,
                    `      </trans-unit>`,
                    `    </body>`,
                    `  </file>`,
                    `</xliff>\n`,
                ].join('\n'));
            });
        }
        describe('[duplicateMessageHandling]', () => {
            it('should throw if set to "error"', () => {
                expect(() => (0, index_1.extractTranslations)({
                    rootPath,
                    sourceLocale: 'en-GB',
                    sourceFilePaths: [fs.resolve(rootPath, 'test_files/duplicate.js')],
                    format: 'json',
                    outputPath,
                    logger,
                    useSourceMaps: false,
                    useLegacyIds: false,
                    duplicateMessageHandling: 'error',
                    fileSystem: fs,
                })).toThrowError(`Failed to extract messages\n` +
                    `ERRORS:\n` +
                    ` - Duplicate messages with id "message-2":\n` +
                    `   - "message contents" : test_files/duplicate.js:6\n` +
                    `   - "different message contents" : test_files/duplicate.js:7`);
                expect(fs.exists(outputPath)).toBe(false);
            });
            it('should log to the logger if set to "warning"', () => {
                (0, index_1.extractTranslations)({
                    rootPath,
                    sourceLocale: 'en-GB',
                    sourceFilePaths: [fs.resolve(rootPath, 'test_files/duplicate.js')],
                    format: 'json',
                    outputPath,
                    logger,
                    useSourceMaps: false,
                    useLegacyIds: false,
                    duplicateMessageHandling: 'warning',
                    fileSystem: fs,
                });
                expect(logger.logs.warn).toEqual([
                    [
                        'Messages extracted with warnings\n' +
                            `WARNINGS:\n` +
                            ` - Duplicate messages with id "message-2":\n` +
                            `   - "message contents" : test_files/duplicate.js:6\n` +
                            `   - "different message contents" : test_files/duplicate.js:7`,
                    ],
                ]);
                expect(fs.readFile(outputPath)).toEqual([
                    `{`,
                    `  "locale": "en-GB",`,
                    `  "translations": {`,
                    `    "message-1": "message {$PH} contents",`,
                    `    "message-2": "message contents"`,
                    `  }`,
                    `}`,
                ].join('\n'));
            });
            it('should not log to the logger if set to "ignore"', () => {
                (0, index_1.extractTranslations)({
                    rootPath,
                    sourceLocale: 'en-GB',
                    sourceFilePaths: [fs.resolve(rootPath, 'test_files/duplicate.js')],
                    format: 'json',
                    outputPath,
                    logger,
                    useSourceMaps: false,
                    useLegacyIds: false,
                    duplicateMessageHandling: 'ignore',
                    fileSystem: fs,
                });
                expect(logger.logs.warn).toEqual([]);
                expect(fs.readFile(outputPath)).toEqual([
                    `{`,
                    `  "locale": "en-GB",`,
                    `  "translations": {`,
                    `    "message-1": "message {$PH} contents",`,
                    `    "message-2": "message contents"`,
                    `  }`,
                    `}`,
                ].join('\n'));
            });
            it('should generate the migration map file, if requested', () => {
                (0, index_1.extractTranslations)({
                    rootPath,
                    sourceLocale: 'en',
                    sourceFilePaths: [sourceFilePath],
                    format: 'legacy-migrate',
                    outputPath,
                    logger,
                    useSourceMaps: false,
                    useLegacyIds: true,
                    duplicateMessageHandling: 'ignore',
                    fileSystem: fs,
                });
                expect(fs.readFile(outputPath)).toEqual([
                    `{`,
                    `  "1234567890123456789012345678901234567890": "273296103957933077",`,
                    `  "12345678901234567890": "273296103957933077"`,
                    `}`,
                ].join('\n'));
            });
            it('should log a warning if there are no legacy message IDs to migrate', () => {
                (0, index_1.extractTranslations)({
                    rootPath,
                    sourceLocale: 'en',
                    sourceFilePaths: [textFile1],
                    format: 'legacy-migrate',
                    outputPath,
                    logger,
                    useSourceMaps: false,
                    useLegacyIds: true,
                    duplicateMessageHandling: 'ignore',
                    fileSystem: fs,
                });
                expect(fs.readFile(outputPath)).toBe('{}');
                expect(logger.logs.warn).toEqual([
                    [
                        'Messages extracted with warnings\n' +
                            'WARNINGS:\n' +
                            ' - Could not find any legacy message IDs in source files while generating the legacy message migration file.',
                    ],
                ]);
            });
        });
    });
});
