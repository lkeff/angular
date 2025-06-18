"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.XtbTranslationParser = exports.Xliff2TranslationParser = exports.Xliff1TranslationParser = exports.SimpleJsonTranslationParser = exports.ArbTranslationParser = exports.makeLocalePlugin = exports.makeEs5TranslatePlugin = exports.makeEs2015TranslatePlugin = exports.unwrapSubstitutionsFromLocalizeCall = exports.unwrapMessagePartsFromTemplateLiteral = exports.unwrapMessagePartsFromLocalizeCall = exports.unwrapExpressionsFromTemplateLiteral = exports.translate = exports.isGlobalIdentifier = exports.buildLocalizeReplacement = exports.XmbTranslationSerializer = exports.Xliff2TranslationSerializer = exports.Xliff1TranslationSerializer = exports.LegacyMessageIdMigrationSerializer = exports.SimpleJsonTranslationSerializer = exports.ArbTranslationSerializer = exports.MessageExtractor = exports.checkDuplicateMessages = exports.Diagnostics = void 0;
// Note: Before changing any exports here, consult with the Angular tooling team
// as the CLI heavily relies on exports declared here.
const localize_1 = require("@angular/compiler-cli/private/localize");
(0, localize_1.setFileSystem)(new localize_1.NodeJSFileSystem());
var diagnostics_1 = require("./src/diagnostics");
Object.defineProperty(exports, "Diagnostics", { enumerable: true, get: function () { return diagnostics_1.Diagnostics; } });
var duplicates_1 = require("./src/extract/duplicates");
Object.defineProperty(exports, "checkDuplicateMessages", { enumerable: true, get: function () { return duplicates_1.checkDuplicateMessages; } });
var extraction_1 = require("./src/extract/extraction");
Object.defineProperty(exports, "MessageExtractor", { enumerable: true, get: function () { return extraction_1.MessageExtractor; } });
var arb_translation_serializer_1 = require("./src/extract/translation_files/arb_translation_serializer");
Object.defineProperty(exports, "ArbTranslationSerializer", { enumerable: true, get: function () { return arb_translation_serializer_1.ArbTranslationSerializer; } });
var json_translation_serializer_1 = require("./src/extract/translation_files/json_translation_serializer");
Object.defineProperty(exports, "SimpleJsonTranslationSerializer", { enumerable: true, get: function () { return json_translation_serializer_1.SimpleJsonTranslationSerializer; } });
var legacy_message_id_migration_serializer_1 = require("./src/extract/translation_files/legacy_message_id_migration_serializer");
Object.defineProperty(exports, "LegacyMessageIdMigrationSerializer", { enumerable: true, get: function () { return legacy_message_id_migration_serializer_1.LegacyMessageIdMigrationSerializer; } });
var xliff1_translation_serializer_1 = require("./src/extract/translation_files/xliff1_translation_serializer");
Object.defineProperty(exports, "Xliff1TranslationSerializer", { enumerable: true, get: function () { return xliff1_translation_serializer_1.Xliff1TranslationSerializer; } });
var xliff2_translation_serializer_1 = require("./src/extract/translation_files/xliff2_translation_serializer");
Object.defineProperty(exports, "Xliff2TranslationSerializer", { enumerable: true, get: function () { return xliff2_translation_serializer_1.Xliff2TranslationSerializer; } });
var xmb_translation_serializer_1 = require("./src/extract/translation_files/xmb_translation_serializer");
Object.defineProperty(exports, "XmbTranslationSerializer", { enumerable: true, get: function () { return xmb_translation_serializer_1.XmbTranslationSerializer; } });
var source_file_utils_1 = require("./src/source_file_utils");
Object.defineProperty(exports, "buildLocalizeReplacement", { enumerable: true, get: function () { return source_file_utils_1.buildLocalizeReplacement; } });
Object.defineProperty(exports, "isGlobalIdentifier", { enumerable: true, get: function () { return source_file_utils_1.isGlobalIdentifier; } });
Object.defineProperty(exports, "translate", { enumerable: true, get: function () { return source_file_utils_1.translate; } });
Object.defineProperty(exports, "unwrapExpressionsFromTemplateLiteral", { enumerable: true, get: function () { return source_file_utils_1.unwrapExpressionsFromTemplateLiteral; } });
Object.defineProperty(exports, "unwrapMessagePartsFromLocalizeCall", { enumerable: true, get: function () { return source_file_utils_1.unwrapMessagePartsFromLocalizeCall; } });
Object.defineProperty(exports, "unwrapMessagePartsFromTemplateLiteral", { enumerable: true, get: function () { return source_file_utils_1.unwrapMessagePartsFromTemplateLiteral; } });
Object.defineProperty(exports, "unwrapSubstitutionsFromLocalizeCall", { enumerable: true, get: function () { return source_file_utils_1.unwrapSubstitutionsFromLocalizeCall; } });
var es2015_translate_plugin_1 = require("./src/translate/source_files/es2015_translate_plugin");
Object.defineProperty(exports, "makeEs2015TranslatePlugin", { enumerable: true, get: function () { return es2015_translate_plugin_1.makeEs2015TranslatePlugin; } });
var es5_translate_plugin_1 = require("./src/translate/source_files/es5_translate_plugin");
Object.defineProperty(exports, "makeEs5TranslatePlugin", { enumerable: true, get: function () { return es5_translate_plugin_1.makeEs5TranslatePlugin; } });
var locale_plugin_1 = require("./src/translate/source_files/locale_plugin");
Object.defineProperty(exports, "makeLocalePlugin", { enumerable: true, get: function () { return locale_plugin_1.makeLocalePlugin; } });
var arb_translation_parser_1 = require("./src/translate/translation_files/translation_parsers/arb_translation_parser");
Object.defineProperty(exports, "ArbTranslationParser", { enumerable: true, get: function () { return arb_translation_parser_1.ArbTranslationParser; } });
var simple_json_translation_parser_1 = require("./src/translate/translation_files/translation_parsers/simple_json_translation_parser");
Object.defineProperty(exports, "SimpleJsonTranslationParser", { enumerable: true, get: function () { return simple_json_translation_parser_1.SimpleJsonTranslationParser; } });
var xliff1_translation_parser_1 = require("./src/translate/translation_files/translation_parsers/xliff1_translation_parser");
Object.defineProperty(exports, "Xliff1TranslationParser", { enumerable: true, get: function () { return xliff1_translation_parser_1.Xliff1TranslationParser; } });
var xliff2_translation_parser_1 = require("./src/translate/translation_files/translation_parsers/xliff2_translation_parser");
Object.defineProperty(exports, "Xliff2TranslationParser", { enumerable: true, get: function () { return xliff2_translation_parser_1.Xliff2TranslationParser; } });
var xtb_translation_parser_1 = require("./src/translate/translation_files/translation_parsers/xtb_translation_parser");
Object.defineProperty(exports, "XtbTranslationParser", { enumerable: true, get: function () { return xtb_translation_parser_1.XtbTranslationParser; } });
