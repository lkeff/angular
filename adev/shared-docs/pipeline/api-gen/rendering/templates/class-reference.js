"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassReference = ClassReference;
const shiki_1 = require("../shiki/shiki");
const css_classes_1 = require("../styling/css-classes");
const class_member_list_1 = require("./class-member-list");
const header_api_1 = require("./header-api");
const raw_html_1 = require("./raw-html");
const section_api_1 = require("./section-api");
const section_description_1 = require("./section-description");
const section_heading_1 = require("./section-heading");
const section_usage_notes_1 = require("./section-usage-notes");
/** Component to render a class API reference document. */
function ClassReference(entry) {
    return (<div className={css_classes_1.API_REFERENCE_CONTAINER}>
      <header_api_1.HeaderApi entry={entry}/>
      {entry.entryType === 'pipe' ? (<>
          <div className={css_classes_1.SECTION_CONTAINER + ' docs-reference-api-section'}>
            <section_heading_1.SectionHeading name="Pipe usage"/>
            <raw_html_1.RawHtml value={(0, shiki_1.codeToHtml)(entry.usage, 'angular-html')}/>
          </div>
        </>) : ('')}
      <section_api_1.SectionApi entry={entry}/>
      {entry.members.length > 0 ? (<div class={css_classes_1.REFERENCE_MEMBERS}>
          <class_member_list_1.ClassMemberList members={entry.members}/>
        </div>) : (<></>)}
      <section_description_1.SectionDescription entry={entry}/>
      <section_usage_notes_1.SectionUsageNotes entry={entry}/>
    </div>);
}
