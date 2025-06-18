"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const api_item_type_1 = require("../interfaces/api-item-type");
const api_label_pipe_1 = require("./api-label.pipe");
describe('ApiLabel', () => {
    let pipe;
    beforeEach(() => {
        pipe = new api_label_pipe_1.ApiLabel();
    });
    it(`should return short label when labelType equals short`, () => {
        const result = pipe.transform(api_item_type_1.ApiItemType.CLASS, 'short');
        expect(result).toBe('C');
    });
    it(`should return short label when labelType equals short`, () => {
        const result = pipe.transform(api_item_type_1.ApiItemType.CLASS, 'full');
        expect(result).toBe('Class');
    });
});
