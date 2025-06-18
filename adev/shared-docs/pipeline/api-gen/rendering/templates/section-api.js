"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionApi = SectionApi;
const code_table_of_contents_1 = require("./code-table-of-contents");
const css_classes_1 = require("../styling/css-classes");
const section_heading_1 = require("./section-heading");
const API_SECTION_NAME = 'API';
/** Component to render the API section. */
function SectionApi(props) {
    return (<div className={css_classes_1.SECTION_CONTAINER + ' docs-reference-api-section'}>
      <section_heading_1.SectionHeading name={API_SECTION_NAME}/>
      <code_table_of_contents_1.CodeTableOfContents entry={props.entry}/>
    </div>);
}
