"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.signatureCard = void 0;
exports.FunctionReference = FunctionReference;
const css_classes_1 = require("../styling/css-classes");
const code_transforms_1 = require("../transforms/code-transforms");
const function_transforms_1 = require("../transforms/function-transforms");
const class_method_info_1 = require("./class-method-info");
const code_symbols_1 = require("./code-symbols");
const header_api_1 = require("./header-api");
const highlight_ts_1 = require("./highlight-ts");
const section_api_1 = require("./section-api");
const section_description_1 = require("./section-description");
const section_usage_notes_1 = require("./section-usage-notes");
const signatureCard = (name, signature, opts, printSignaturesAsHeader) => {
    return (<div id={opts.id} class={css_classes_1.REFERENCE_MEMBER_CARD}>
      <header class={css_classes_1.REFERENCE_MEMBER_CARD_HEADER}>
        {printSignaturesAsHeader ? (<highlight_ts_1.HighlightTypeScript code={(0, code_transforms_1.printInitializerFunctionSignatureLine)(name, signature, 
            // Always omit types in signature headers, to keep them short.
            true)}/>) : (<>
            <h3>{name}</h3>
            <div>
              <code_symbols_1.CodeSymbol code={signature.returnType}/>
            </div>
          </>)}
      </header>
      <div class={css_classes_1.REFERENCE_MEMBER_CARD_BODY}>
        <class_method_info_1.ClassMethodInfo entry={signature}/>
      </div>
    </div>);
};
exports.signatureCard = signatureCard;
/** Component to render a function API reference document. */
function FunctionReference(entry) {
    // Use signatures as header if there are multiple signatures.
    const printSignaturesAsHeader = entry.signatures.length > 1;
    return (<div className={css_classes_1.API_REFERENCE_CONTAINER}>
      <header_api_1.HeaderApi entry={entry}/>
      <section_api_1.SectionApi entry={entry}/>
      <div className={css_classes_1.REFERENCE_MEMBERS}>
        {entry.signatures.map((s, i) => (0, exports.signatureCard)(s.name, (0, function_transforms_1.getFunctionMetadataRenderable)(s, entry.moduleName, entry.repo), {
            id: `${s.name}_${i}`,
        }, printSignaturesAsHeader))}
      </div>

      <section_description_1.SectionDescription entry={entry}/>
      <section_usage_notes_1.SectionUsageNotes entry={entry}/>
    </div>);
}
