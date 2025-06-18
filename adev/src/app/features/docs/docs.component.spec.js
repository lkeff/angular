"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const docs_component_1 = __importDefault(require("./docs.component"));
const testing_2 = require("@angular/router/testing");
const docs_1 = require("@angular/docs");
describe('DocsComponent', () => {
    let component;
    let fixture;
    const fakeWindow = {
        addEventListener: () => { },
        removeEventListener: () => { },
    };
    const fakeContentLoader = {
        getContent: (id) => undefined,
    };
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [docs_component_1.default, testing_2.RouterTestingModule],
            providers: [
                {
                    provide: docs_1.WINDOW,
                    useValue: fakeWindow,
                },
                {
                    provide: docs_1.DOCS_CONTENT_LOADER,
                    useValue: fakeContentLoader,
                },
            ],
        });
        fixture = testing_1.TestBed.createComponent(docs_component_1.default);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
