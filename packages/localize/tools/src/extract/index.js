"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTranslations = extractTranslations;
const duplicates_1 = require("./duplicates");
const extraction_1 = require("./extraction");
const arb_translation_serializer_1 = require("./translation_files/arb_translation_serializer");
const json_translation_serializer_1 = require("./translation_files/json_translation_serializer");
const legacy_message_id_migration_serializer_1 = require("./translation_files/legacy_message_id_migration_serializer");
const xliff1_translation_serializer_1 = require("./translation_files/xliff1_translation_serializer");
const xliff2_translation_serializer_1 = require("./translation_files/xliff2_translation_serializer");
const xmb_translation_serializer_1 = require("./translation_files/xmb_translation_serializer");
function extractTranslations({ rootPath, sourceFilePaths, sourceLocale, format, outputPath: output, logger, useSourceMaps, useLegacyIds, duplicateMessageHandling, formatOptions = {}, fileSystem: fs, }) {
    const basePath = fs.resolve(rootPath);
    const extractor = new extraction_1.MessageExtractor(fs, logger, { basePath, useSourceMaps });
    const messages = [];
    for (const file of sourceFilePaths) {
        messages.push(...extractor.extractMessages(file));
    }
    const diagnostics = (0, duplicates_1.checkDuplicateMessages)(fs, messages, duplicateMessageHandling, basePath);
    if (diagnostics.hasErrors) {
        throw new Error(diagnostics.formatDiagnostics('Failed to extract messages'));
    }
    const outputPath = fs.resolve(rootPath, output);
    const serializer = getSerializer(format, sourceLocale, fs.dirname(outputPath), useLegacyIds, formatOptions, fs, diagnostics);
    const translationFile = serializer.serialize(messages);
    fs.ensureDir(fs.dirname(outputPath));
    fs.writeFile(outputPath, translationFile);
    if (diagnostics.messages.length) {
        logger.warn(diagnostics.formatDiagnostics('Messages extracted with warnings'));
    }
}
function getSerializer(format, sourceLocale, rootPath, useLegacyIds, formatOptions = {}, fs, diagnostics) {
    switch (format) {
        case 'xlf':
        case 'xlif':
        case 'xliff':
            return new xliff1_translation_serializer_1.Xliff1TranslationSerializer(sourceLocale, rootPath, useLegacyIds, formatOptions, fs);
        case 'xlf2':
        case 'xlif2':
        case 'xliff2':
            return new xliff2_translation_serializer_1.Xliff2TranslationSerializer(sourceLocale, rootPath, useLegacyIds, formatOptions, fs);
        case 'xmb':
            return new xmb_translation_serializer_1.XmbTranslationSerializer(rootPath, useLegacyIds, fs);
        case 'json':
            return new json_translation_serializer_1.SimpleJsonTranslationSerializer(sourceLocale);
        case 'arb':
            return new arb_translation_serializer_1.ArbTranslationSerializer(sourceLocale, rootPath, fs);
        case 'legacy-migrate':
            return new legacy_message_id_migration_serializer_1.LegacyMessageIdMigrationSerializer(diagnostics);
    }
    throw new Error(`No translation serializer can handle the provided format: ${format}`);
}
