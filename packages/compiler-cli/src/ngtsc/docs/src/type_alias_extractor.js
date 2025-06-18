"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTypeAlias = extractTypeAlias;
const entities_1 = require("./entities");
const jsdoc_extractor_1 = require("./jsdoc_extractor");
const generics_extractor_1 = require("./generics_extractor");
/** Extract the documentation entry for a type alias. */
function extractTypeAlias(declaration) {
    // TODO: this does not yet resolve type queries (`typeof`). We may want to
    //     fix this eventually, but for now it does not appear that any type aliases in
    //     Angular's public API rely on this.
    return {
        name: declaration.name.getText(),
        type: declaration.type.getText(),
        entryType: entities_1.EntryType.TypeAlias,
        generics: (0, generics_extractor_1.extractGenerics)(declaration),
        rawComment: (0, jsdoc_extractor_1.extractRawJsDoc)(declaration),
        description: (0, jsdoc_extractor_1.extractJsDocDescription)(declaration),
        jsdocTags: (0, jsdoc_extractor_1.extractJsDocTags)(declaration),
    };
}
