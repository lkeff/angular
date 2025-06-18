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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const cli_reference_details_page_component_1 = __importDefault(require("./cli-reference-details-page.component"));
const testing_2 = require("@angular/router/testing");
const reference_scroll_handler_service_1 = require("../services/reference-scroll-handler.service");
const router_1 = require("@angular/router");
describe('CliReferenceDetailsPage', () => {
    let component;
    let fixture;
    let fakeApiReferenceScrollHandler = {
        setupListeners: () => { },
    };
    const SAMPLE_CONTENT = `
    <div class="cli">
      <div class="docs-reference-cli-content">First column content</div>
      <div class="docs-reference-members-container">Members content</div>
    </div>
  `;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        testing_1.TestBed.configureTestingModule({
            imports: [cli_reference_details_page_component_1.default],
            providers: [
                (0, router_1.provideRouter)([
                    {
                        path: '**',
                        component: cli_reference_details_page_component_1.default,
                        data: {
                            'docContent': {
                                id: 'id',
                                contents: SAMPLE_CONTENT,
                            },
                        },
                    },
                ], (0, router_1.withComponentInputBinding)()),
            ],
        });
        testing_1.TestBed.overrideProvider(reference_scroll_handler_service_1.ReferenceScrollHandler, { useValue: fakeApiReferenceScrollHandler });
        const harness = yield testing_2.RouterTestingHarness.create();
        fixture = harness.fixture;
        component = yield harness.navigateByUrl('/', cli_reference_details_page_component_1.default);
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should load the doc content', () => {
        var _a;
        expect((_a = component.docContent()) === null || _a === void 0 ? void 0 : _a.contents).toBeTruthy();
        const docsViewer = fixture.nativeElement.querySelector('docs-viewer');
        expect(docsViewer).toBeTruthy();
    });
});
