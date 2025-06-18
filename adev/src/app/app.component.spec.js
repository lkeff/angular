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
const app_component_1 = require("./app.component");
const router_1 = require("@angular/router");
const routes_1 = require("./routes");
const docs_1 = require("@angular/docs");
const http_1 = require("@angular/common/http");
const testing_2 = require("@angular/common/http/testing");
describe('AppComponent', () => {
    const fakeSearch = {};
    const fakeWindow = { location: { hostname: 'angular.dev' } };
    it('should create the app', () => {
        testing_1.TestBed.configureTestingModule({
            providers: [
                (0, http_1.provideHttpClient)(),
                (0, testing_2.provideHttpClientTesting)(),
                (0, router_1.provideRouter)(routes_1.routes, (0, router_1.withComponentInputBinding)()),
                {
                    provide: docs_1.WINDOW,
                    useValue: fakeWindow,
                },
                {
                    provide: docs_1.Search,
                    useValue: fakeSearch,
                },
            ],
        });
        const fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
