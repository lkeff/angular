"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeAliasReference = TypeAliasReference;
const header_api_1 = require("./header-api");
const section_description_1 = require("./section-description");
const section_usage_notes_1 = require("./section-usage-notes");
const section_api_1 = require("./section-api");
const css_classes_1 = require("../styling/css-classes");
/** Component to render a type alias API reference document. */
function TypeAliasReference(entry) {
    return (<div className={css_classes_1.API_REFERENCE_CONTAINER}>
      <header_api_1.HeaderApi entry={entry}/>
      <section_api_1.SectionApi entry={entry}/>
      <section_description_1.SectionDescription entry={entry}/>
      <section_usage_notes_1.SectionUsageNotes entry={entry}/>
    </div>);
}
