"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionUsageNotes = SectionUsageNotes;
const raw_html_1 = require("./raw-html");
const css_classes_1 = require("../styling/css-classes");
const section_heading_1 = require("./section-heading");
const USAGE_NOTES_SECTION_NAME = 'Usage Notes';
/** Component to render the usage notes section. */
function SectionUsageNotes(props) {
    if (!props.entry.htmlUsageNotes) {
        return <></>;
    }
    return (<div className={css_classes_1.SECTION_CONTAINER}>
      <section_heading_1.SectionHeading name={USAGE_NOTES_SECTION_NAME}/>
      <raw_html_1.RawHtml value={props.entry.htmlUsageNotes}/>
    </div>);
}
