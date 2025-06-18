"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RawHtml = RawHtml;
/** Convenience component to render raw html */
function RawHtml(props) {
    // Unfortunately, there does not seem to be a way to render the raw html
    // into a text node without introducing a div.
    return <div className={props.className} dangerouslySetInnerHTML={{ __html: props.value }}></div>;
}
