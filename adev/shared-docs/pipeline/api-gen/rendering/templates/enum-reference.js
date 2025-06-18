"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumReference = EnumReference;
const header_api_1 = require("./header-api");
const section_description_1 = require("./section-description");
const section_api_1 = require("./section-api");
const css_classes_1 = require("../styling/css-classes");
const class_member_1 = require("./class-member");
/** Component to render a enum API reference document. */
function EnumReference(entry) {
    return (<div className={css_classes_1.API_REFERENCE_CONTAINER}>
      <header_api_1.HeaderApi entry={entry}/>
      <section_api_1.SectionApi entry={entry}/>
      {entry.members.length > 0 ? (<div class={css_classes_1.REFERENCE_MEMBERS}>
          {entry.members.map((member) => (<class_member_1.ClassMember member={member}/>))}
        </div>) : (<></>)}
      <section_description_1.SectionDescription entry={entry}/>
    </div>);
}
