"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionDescription = SectionDescription;
const raw_html_1 = require("./raw-html");
const code_symbols_1 = require("./code-symbols");
const css_classes_1 = require("../styling/css-classes");
const section_heading_1 = require("./section-heading");
const DESCRIPTION_SECTION_NAME = 'Description';
/** Component to render the description section. */
function SectionDescription(props) {
    const exportedBy = props.entry.jsdocTags.filter((t) => t.name === 'ngModule');
    if ((!props.entry.htmlDescription ||
        props.entry.htmlDescription === props.entry.shortHtmlDescription) &&
        !exportedBy.length) {
        return <></>;
    }
    return (<div className={css_classes_1.SECTION_CONTAINER}>
      <section_heading_1.SectionHeading name={DESCRIPTION_SECTION_NAME}/>
      <raw_html_1.RawHtml value={props.entry.htmlDescription}/>

      {exportedBy.length ? (<>
          <hr />
          <h2>Exported by</h2>

          <ul>
            {exportedBy.map((tag) => (<li>
                <code_symbols_1.CodeSymbol code={tag.comment}/>
              </li>))}
          </ul>
        </>) : (<></>)}
    </div>);
}
