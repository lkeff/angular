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
const content_loader_service_1 = require("./content-loader.service");
const testing_2 = require("@angular/common/http/testing");
describe('ContentLoader', () => {
    let service;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            providers: [content_loader_service_1.ContentLoader],
            imports: [testing_2.HttpClientTestingModule],
        });
        service = testing_1.TestBed.inject(content_loader_service_1.ContentLoader);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
