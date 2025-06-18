"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const router_1 = require("@angular/router");
const ng_devtools_1 = require("ng-devtools");
const app_component_1 = require("./app.component");
describe('AppComponent', () => {
    beforeEach((0, testing_1.waitForAsync)(() => {
        const applicationOperationsSPy = jasmine.createSpyObj('messageBus', ['viewSource']);
        testing_1.TestBed.configureTestingModule({
            declarations: [app_component_1.AppComponent],
            imports: [router_1.RouterModule.forRoot([])],
            providers: [
                {
                    provide: ng_devtools_1.ApplicationOperations,
                    useClass: applicationOperationsSPy,
                },
            ],
        }).compileComponents();
    }));
    it('should create the app', () => {
        const fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
