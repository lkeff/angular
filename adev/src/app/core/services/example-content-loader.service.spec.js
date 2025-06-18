"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const example_content_loader_service_1 = require("./example-content-loader.service");
const docs_1 = require("@angular/docs");
describe('ExampleContentLoader', () => {
    let service;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            providers: [example_content_loader_service_1.ExampleContentLoader, { provide: docs_1.PREVIEWS_COMPONENTS, useValue: [] }],
        });
        service = testing_1.TestBed.inject(example_content_loader_service_1.ExampleContentLoader);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
