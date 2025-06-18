"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const terminal_component_1 = require("./terminal.component");
const terminal_handler_service_1 = require("./terminal-handler.service");
const docs_1 = require("@angular/docs");
describe('Terminal', () => {
    let component;
    let fixture;
    let terminalHandlerSpy;
    const fakeWindow = new docs_1.FakeEventTarget();
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        terminalHandlerSpy = jasmine.createSpyObj('TerminalHandler', [
            'registerTerminal',
            'resizeToFitParent',
        ]);
        yield testing_1.TestBed.configureTestingModule({
            imports: [terminal_component_1.Terminal],
            providers: [
                { provide: terminal_handler_service_1.TerminalHandler, useValue: terminalHandlerSpy },
                {
                    provide: docs_1.WINDOW,
                    useValue: fakeWindow,
                },
            ],
        }).compileComponents();
        fixture = testing_1.TestBed.createComponent(terminal_component_1.Terminal);
        component = fixture.componentInstance;
        component.type = terminal_handler_service_1.TerminalType.READONLY;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
