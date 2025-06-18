"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeEs5ExtractPlugin = makeEs5ExtractPlugin;
const index_1 = require("../../../../index");
const source_file_utils_1 = require("../../source_file_utils");
function makeEs5ExtractPlugin(fs, messages, localizeName = '$localize') {
    return {
        visitor: {
            CallExpression(callPath, state) {
                try {
                    const calleePath = callPath.get('callee');
                    if ((0, source_file_utils_1.isNamedIdentifier)(calleePath, localizeName) && (0, source_file_utils_1.isGlobalIdentifier)(calleePath)) {
                        const [messageParts, messagePartLocations] = (0, source_file_utils_1.unwrapMessagePartsFromLocalizeCall)(callPath, fs);
                        const [expressions, expressionLocations] = (0, source_file_utils_1.unwrapSubstitutionsFromLocalizeCall)(callPath, fs);
                        const [messagePartsArg, expressionsArg] = callPath.get('arguments');
                        const location = (0, source_file_utils_1.getLocation)(fs, messagePartsArg, expressionsArg);
                        const message = (0, index_1.ɵparseMessage)(messageParts, expressions, location, messagePartLocations, expressionLocations);
                        messages.push(message);
                    }
                }
                catch (e) {
                    if ((0, source_file_utils_1.isBabelParseError)(e)) {
                        // If we get a BabelParseError here then something went wrong with Babel itself
                        // since there must be something wrong with the structure of the AST generated
                        // by Babel parsing a TaggedTemplateExpression.
                        throw (0, source_file_utils_1.buildCodeFrameError)(fs, callPath, state.file, e);
                    }
                    else {
                        throw e;
                    }
                }
            },
        },
    };
}
