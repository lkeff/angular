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
const editor_ui_state_service_1 = require("./editor-ui-state.service");
describe('EditorUiState', () => {
    let service;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            providers: [editor_ui_state_service_1.EditorUiState],
        });
        service = testing_1.TestBed.inject(editor_ui_state_service_1.EditorUiState);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
