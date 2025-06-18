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
const docs_1 = require("@angular/docs");
const editor_1 = require("../../editor");
const node_runtime_sandbox_service_1 = require("../../editor/node-runtime-sandbox.service");
const playground_component_1 = __importDefault(require("./playground.component"));
describe('TutorialPlayground', () => {
    let component;
    let fixture;
    const fakeWindow = {
        location: {
            search: window.location.search,
        },
    };
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [playground_component_1.default],
            providers: [
                {
                    provide: docs_1.WINDOW,
                    useValue: fakeWindow,
                },
                {
                    provide: editor_1.EmbeddedTutorialManager,
                    useValue: {
                        fetchAndSetTutorialFiles: () => { },
                    },
                },
                {
                    provide: node_runtime_sandbox_service_1.NodeRuntimeSandbox,
                    useVaue: {
                        init: () => { },
                    },
                },
            ],
        });
        fixture = testing_1.TestBed.createComponent(playground_component_1.default);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
