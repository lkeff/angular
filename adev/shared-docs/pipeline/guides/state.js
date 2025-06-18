"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetHeaderIdsOfCurrentDocument = exports.getHeaderId = void 0;
const headerIds = new Map();
const getHeaderId = (heading) => {
    var _a;
    const numberOfHeaderOccurrencesInTheDocument = (_a = headerIds.get(heading)) !== null && _a !== void 0 ? _a : 0;
    headerIds.set(heading, numberOfHeaderOccurrencesInTheDocument + 1);
    // extract the extended markdown heading id
    // ex:  ## MyHeading {# myId}
    const match = heading.match(/{#([\w-]+)}/);
    let extractedId;
    if (match) {
        extractedId = match[1];
    }
    else {
        extractedId = heading
            .toLowerCase()
            .replace(/<code>(.*?)<\/code>/g, '$1') // remove <code>
            .replace(/<strong>(.*?)<\/strong>/g, '$1') // remove <strong>
            .replace(/<em>(.*?)<\/em>/g, '$1') // remove <em>
            .replace(/\s|\//g, '-') // remove spaces and slashes
            .replace(/gt;|lt;/g, '') // remove escaped < and >
            .replace(/&#\d+;/g, '') // remove HTML entities
            .replace(/[^\p{L}\d\-]/gu, ''); // only keep letters, digits & dashes
    }
    const headerId = numberOfHeaderOccurrencesInTheDocument
        ? `${extractedId}-${numberOfHeaderOccurrencesInTheDocument}`
        : extractedId;
    return headerId;
};
exports.getHeaderId = getHeaderId;
const resetHeaderIdsOfCurrentDocument = () => {
    headerIds.clear();
};
exports.resetHeaderIdsOfCurrentDocument = resetHeaderIdsOfCurrentDocument;
