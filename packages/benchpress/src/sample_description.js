"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SampleDescription = void 0;
/**
 * SampleDescription merges all available descriptions about a sample
 */
class SampleDescription {
    constructor(id, descriptions, metrics) {
        this.id = id;
        this.metrics = metrics;
        this.description = {};
        descriptions.forEach((description) => {
            Object.keys(description).forEach((prop) => {
                this.description[prop] = description[prop];
            });
        });
    }
    toJson() {
        return { 'id': this.id, 'description': this.description, 'metrics': this.metrics };
    }
}
exports.SampleDescription = SampleDescription;
