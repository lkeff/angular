"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeEs2015ExtractPlugin = makeEs2015ExtractPlugin;
const index_1 = require("../../../../index");
const source_file_utils_1 = require("../../source_file_utils");
function makeEs2015ExtractPlugin(fs, messages, localizeName = '$localize') {
    return {
        visitor: {
            TaggedTemplateExpression(path) {
                const tag = path.get('tag');
                if ((0, source_file_utils_1.isNamedIdentifier)(tag, localizeName) && (0, source_file_utils_1.isGlobalIdentifier)(tag)) {
                    const quasiPath = path.get('quasi');
                    const [messageParts, messagePartLocations] = (0, source_file_utils_1.unwrapMessagePartsFromTemplateLiteral)(quasiPath.get('quasis'), fs);
                    const [expressions, expressionLocations] = (0, source_file_utils_1.unwrapExpressionsFromTemplateLiteral)(quasiPath, fs);
                    const location = (0, source_file_utils_1.getLocation)(fs, quasiPath);
                    const message = (0, index_1.ɵparseMessage)(messageParts, expressions, location, messagePartLocations, expressionLocations);
                    messages.push(message);
                }
            },
        },
    };
}
