"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionHeading = SectionHeading;
const reference_section_id_1 = require("../transforms/reference-section-id");
const css_classes_1 = require("../styling/css-classes");
/** Component to render the API section. */
function SectionHeading(props) {
    const id = (0, reference_section_id_1.convertSectionNameToId)(props.name);
    const label = 'Link to ' + props.name + ' section';
    return (<h2 id={id} class={css_classes_1.SECTION_HEADING}>
      <a href={'#' + id} aria-label={label} tabIndex={-1}>
        {props.name}
      </a>
    </h2>);
}
