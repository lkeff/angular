"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripAndCheckMappings = stripAndCheckMappings;
const logging_1 = require("../../../src/ngtsc/logging");
const sourcemaps_1 = require("../../../src/ngtsc/sourcemaps");
/**
 * Check the source-mappings of the generated source file against mappings stored in the expected
 * source file.
 *
 * The source-mappings are encoded into the expected source file in the form of an end-of-line
 * comment that has the following syntax:
 *
 * ```
 * <generated code> // SOURCE: "</path/to/original>" "<original source>"
 * ```
 *
 * The `path/to/original` path will be absolute within the mock file-system, where the root is the
 * directory containing the `TEST_CASES.json` file. The `generated code` and the `original source`
 * are not trimmed of whitespace - but there is a single space after the generated and a single
 * space before the original source.
 *
 * @param fs The test file-system where the source, generated and expected files are stored.
 * @param generated The content of the generated source file.
 * @param generatedPath The absolute path, within the test file-system, of the generated source
 *     file.
 * @param expectedSource The content of the expected source file, containing mapping information.
 * @returns The content of the expected source file, stripped of the mapping information.
 */
function stripAndCheckMappings(fs, generated, generatedPath, expectedSource, expectedPath, skipMappingCheck) {
    // Generate the candidate source maps.
    const actualMappings = getMappedSegments(fs, generatedPath, generated);
    const { expected, mappings } = extractMappings(fs, expectedSource);
    // TODO: Remove when https://github.com/angular/angular/issues/51647 is fixed.
    if (skipMappingCheck) {
        return expected;
    }
    const failures = [];
    for (const expectedMapping of mappings) {
        const failure = checkMapping(actualMappings, expectedMapping);
        if (failure !== null) {
            failures.push(failure);
        }
    }
    if (failures.length > 0) {
        throw new Error(`When checking mappings for ${generatedPath} against ${expectedPath} expected...\n\n` +
            `${failures.join('\n\n')}\n\n` +
            `All the mappings:\n\n${dumpMappings(actualMappings)}`);
    }
    return expected;
}
/**
 * Extract the source-map information (encoded in comments - see `checkMappings()`) from the given
 * `expected` source content, returning both the `mappings` and the `expected` source code, stripped
 * of the source-mapping comments.
 *
 * @param expected The content of the expected file containing source-map information.
 */
function extractMappings(fs, expected) {
    const mappings = [];
    // capture and remove source mapping info
    // Any newline at the end of an expectation line is removed, as a mapping expectation for a
    // segment within a template literal would otherwise force a newline to be matched in the template
    // literal.
    expected = expected.replace(/^(.*?) \/\/ SOURCE: "([^"]*?)" "(.*?)"(?:\n|$)/gm, (_, rawGenerated, rawSourceUrl, rawSource) => {
        // Since segments need to appear on a single line in the expected file, any newlines in the
        // segment being checked must be escaped in the expected file and then unescaped here before
        // being checked.
        const generated = unescape(rawGenerated);
        const source = unescape(rawSource);
        const sourceUrl = fs.resolve(rawSourceUrl);
        mappings.push({ generated, sourceUrl, source });
        return generated;
    });
    return { expected, mappings };
}
function unescape(str) {
    const replacements = { '\\n': '\n', '\\r': '\r', '\\\\': '\\', '\\"': '"' };
    return str.replace(/\\[rn"\\]/g, (match) => replacements[match]);
}
/**
 * Process a generated file to extract human understandable segment mappings.
 *
 * These mappings are easier to compare in unit tests than the raw SourceMap mappings.
 *
 * @param fs the test file-system that holds the source and generated files.
 * @param generatedPath The path of the generated file to process.
 * @param generatedContents The contents of the generated file to process.
 * @returns An array of segment mappings for each mapped segment in the given generated file. An
 *     empty array is returned if there is no source-map file found.
 */
function getMappedSegments(fs, generatedPath, generatedContents) {
    const logger = new logging_1.ConsoleLogger(logging_1.LogLevel.debug);
    const loader = new sourcemaps_1.SourceFileLoader(fs, logger, {});
    const generatedFile = loader.loadSourceFile(generatedPath, generatedContents);
    if (generatedFile === null) {
        return [];
    }
    const segments = [];
    for (let i = 0; i < generatedFile.flattenedMappings.length - 1; i++) {
        const mapping = generatedFile.flattenedMappings[i];
        const generatedStart = mapping.generatedSegment;
        const generatedEnd = generatedFile.flattenedMappings[i + 1].generatedSegment;
        const originalFile = mapping.originalSource;
        const originalStart = mapping.originalSegment;
        let originalEnd = originalStart.next;
        // Skip until we find an end segment that is after the start segment
        while (originalEnd !== undefined &&
            originalEnd.next !== originalEnd &&
            originalEnd.position === originalStart.position) {
            originalEnd = originalEnd.next;
        }
        if (originalEnd === undefined || originalEnd.next === originalEnd) {
            continue;
        }
        const segment = {
            generated: generatedFile.contents.substring(generatedStart.position, generatedEnd.position),
            source: originalFile.contents.substring(originalStart.position, originalEnd.position),
            sourceUrl: originalFile.sourcePath,
        };
        segments.push(segment);
    }
    return segments;
}
/**
 * Check that the `expected` segment appears in the collection of `mappings`.
 *
 * @returns An error message if a matching segment cannot be found, or null if it can.
 */
function checkMapping(mappings, expected) {
    if (mappings.some((m) => m.generated === expected.generated &&
        m.source === expected.source &&
        m.sourceUrl === expected.sourceUrl)) {
        return null;
    }
    const matchingGenerated = mappings.filter((m) => m.generated === expected.generated);
    const matchingSource = mappings.filter((m) => m.source === expected.source);
    const message = [
        'Expected mappings to contain the following mapping',
        prettyPrintMapping(expected),
    ];
    if (matchingGenerated.length > 0) {
        message.push('');
        message.push('There are the following mappings that match the generated text:');
        matchingGenerated.forEach((m) => message.push(prettyPrintMapping(m)));
    }
    if (matchingSource.length > 0) {
        message.push('');
        message.push('There are the following mappings that match the source text:');
        matchingSource.forEach((m) => message.push(prettyPrintMapping(m)));
    }
    return message.join('\n');
}
function prettyPrintMapping(mapping) {
    return [
        '{',
        `  generated: ${JSON.stringify(mapping.generated)}`,
        `  source   : ${JSON.stringify(mapping.source)}`,
        `  sourceUrl: ${JSON.stringify(mapping.sourceUrl)}`,
        '}',
    ].join('\n');
}
/**
 * Helper function for debugging failed mappings.
 * This lays out the segment mappings in the console to make it easier to compare.
 */
function dumpMappings(mappings) {
    return mappings
        .map((mapping) => padValue(mapping.sourceUrl, 20, 0) +
        ' : ' +
        padValue(JSON.stringify(mapping.source), 100, 23) +
        ' : ' +
        JSON.stringify(mapping.generated))
        .join('\n');
}
function padValue(value, max, start) {
    const padding = value.length > max ? '\n' + ' '.repeat(max + start) : ' '.repeat(max - value.length);
    return value + padding;
}
