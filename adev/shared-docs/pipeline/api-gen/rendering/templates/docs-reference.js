"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocsReference = DocsReference;
const header_api_1 = require("./header-api");
const section_description_1 = require("./section-description");
const css_classes_1 = require("../styling/css-classes");
/** Component to render a block or element API reference document. */
function DocsReference(entry) {
    return (<div className={css_classes_1.API_REFERENCE_CONTAINER}>
      <header_api_1.HeaderApi entry={entry}/>
      <section_description_1.SectionDescription entry={entry}/>
    </div>);
}
