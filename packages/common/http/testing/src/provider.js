"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideHttpClientTesting = provideHttpClientTesting;
const index_1 = require("../../index");
const api_1 = require("./api");
const backend_1 = require("./backend");
function provideHttpClientTesting() {
    return [
        backend_1.HttpClientTestingBackend,
        { provide: index_1.HttpBackend, useExisting: backend_1.HttpClientTestingBackend },
        { provide: api_1.HttpTestingController, useExisting: backend_1.HttpClientTestingBackend },
        { provide: index_1.ɵREQUESTS_CONTRIBUTE_TO_STABILITY, useValue: false },
    ];
}
