"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitializerApiFunction = InitializerApiFunction;
const css_classes_1 = require("../styling/css-classes");
const function_transforms_1 = require("../transforms/function-transforms");
const function_reference_1 = require("./function-reference");
const header_api_1 = require("./header-api");
const section_api_1 = require("./section-api");
const section_usage_notes_1 = require("./section-usage-notes");
/** Component to render a constant API reference document. */
function InitializerApiFunction(entry) {
    // Use signatures as header if there are multiple signatures.
    const printSignaturesAsHeader = entry.callFunction.signatures.length > 1 ||
        entry.subFunctions.some((sub) => sub.signatures.length > 1);
    // If the initializer API function is just a function, checked by existence of an
    // implementation, and the descriptions of the "API" and the first function match,
    // avoid rendering it another time in the member card.
    if (entry.callFunction.signatures.length === 1 &&
        entry.callFunction.implementation !== null &&
        entry.description === entry.callFunction.signatures[0].description) {
        entry.callFunction.signatures[0].description = '';
    }
    return (<div className={css_classes_1.API_REFERENCE_CONTAINER}>
      <header_api_1.HeaderApi entry={entry} showFullDescription={true}/>
      <section_api_1.SectionApi entry={entry}/>

      <div class={css_classes_1.REFERENCE_MEMBERS}>
        {entry.callFunction.signatures.map((s, i) => (0, function_reference_1.signatureCard)(s.name, (0, function_transforms_1.getFunctionMetadataRenderable)(s, entry.moduleName, entry.repo), {
            id: `${s.name}_${i}`,
        }, printSignaturesAsHeader))}

        {entry.subFunctions.reduce((elements, subFunction) => [
            ...elements,
            ...subFunction.signatures.map((s, i) => (0, function_reference_1.signatureCard)(`${entry.name}.${s.name}`, (0, function_transforms_1.getFunctionMetadataRenderable)(s, entry.moduleName, entry.repo), {
                id: `${entry.name}_${s.name}_${i}`,
            }, printSignaturesAsHeader)),
        ], [])}
      </div>

      <section_usage_notes_1.SectionUsageNotes entry={entry}/>
    </div>);
}
