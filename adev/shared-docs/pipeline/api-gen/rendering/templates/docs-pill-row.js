"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocsPillRow = DocsPillRow;
/** Component to render a function or method parameter reference doc fragment. */
function DocsPillRow(props) {
    if (props.links.length === 0)
        return <></>;
    return (<nav class="docs-pill-row">
      {props.links.map((link) => (<a class="docs-pill" href={link.url} title={link.title}>
          {link.label}
        </a>))}
    </nav>);
}
