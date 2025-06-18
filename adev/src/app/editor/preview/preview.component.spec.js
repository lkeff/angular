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
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const rxjs_1 = require("rxjs");
const node_runtime_sandbox_service_1 = require("../node-runtime-sandbox.service");
const preview_component_1 = require("./preview.component");
const loading_steps_1 = require("../enums/loading-steps");
const node_runtime_state_service_1 = require("../node-runtime-state.service");
const preview_error_component_1 = require("./preview-error.component");
describe('Preview', () => {
    // Before each is used as a callable function to prevent conflicts between tests
    const beforeEach = () => {
        const PREVIEW_URL = 'https://angular.dev/';
        const fakeNodeRuntimeSandbox = {
            previewUrl$: (0, rxjs_1.of)(PREVIEW_URL),
        };
        const fakeNodeRuntimeState = {
            loadingStep: (0, core_1.signal)(loading_steps_1.LoadingStep.NOT_STARTED),
            error: (0, core_1.signal)(undefined),
        };
        testing_1.TestBed.configureTestingModule({
            imports: [preview_component_1.Preview],
            providers: [
                {
                    provide: node_runtime_sandbox_service_1.NodeRuntimeSandbox,
                    useValue: fakeNodeRuntimeSandbox,
                },
                {
                    provide: node_runtime_state_service_1.NodeRuntimeState,
                    useValue: fakeNodeRuntimeState,
                },
            ],
        }).compileComponents();
        const fixture = testing_1.TestBed.createComponent(preview_component_1.Preview);
        const component = fixture.componentInstance;
        const iframeElement = fixture.debugElement.query(platform_browser_1.By.css('iframe'));
        fixture.detectChanges();
        return {
            fixture,
            component,
            iframeElement,
            PREVIEW_URL,
            fakeNodeRuntimeState,
            fakeNodeRuntimeSandbox,
            getLoadingElementsWrapper: () => fixture.debugElement.query(platform_browser_1.By.css('adev-embedded-editor-preview-loading')),
        };
    };
    it('should set iframe src', () => {
        var _a;
        const { fixture, PREVIEW_URL } = beforeEach();
        const iframeElement = fixture.debugElement.query(platform_browser_1.By.css('iframe'));
        expect((_a = iframeElement === null || iframeElement === void 0 ? void 0 : iframeElement.nativeElement) === null || _a === void 0 ? void 0 : _a.src).toBe(PREVIEW_URL);
    });
    it('should not render loading elements if the loadingStep is READY or ERROR', () => {
        const { fixture, fakeNodeRuntimeState, getLoadingElementsWrapper } = beforeEach();
        fakeNodeRuntimeState.loadingStep.set(loading_steps_1.LoadingStep.READY);
        fixture.detectChanges();
        expect(getLoadingElementsWrapper()).toBeNull();
        fakeNodeRuntimeState.loadingStep.set(loading_steps_1.LoadingStep.ERROR);
        fixture.detectChanges();
        expect(getLoadingElementsWrapper()).toBeNull();
    });
    it('should render the correct loading element based on loadingStep', () => {
        const { fixture, fakeNodeRuntimeState } = beforeEach();
        function getDebugElements() {
            return {
                [loading_steps_1.LoadingStep.NOT_STARTED]: fixture.debugElement.query(platform_browser_1.By.css('.adev-embedded-editor-preview-loading-starting')),
                [loading_steps_1.LoadingStep.BOOT]: fixture.debugElement.query(platform_browser_1.By.css('.adev-embedded-editor-preview-loading-boot')),
                [loading_steps_1.LoadingStep.LOAD_FILES]: fixture.debugElement.query(platform_browser_1.By.css('.adev-embedded-editor-preview-loading-load-files')),
                [loading_steps_1.LoadingStep.INSTALL]: fixture.debugElement.query(platform_browser_1.By.css('.adev-embedded-editor-preview-loading-install')),
                [loading_steps_1.LoadingStep.START_DEV_SERVER]: fixture.debugElement.query(platform_browser_1.By.css('.adev-embedded-editor-preview-loading-start-dev-server')),
            };
        }
        for (let componentLoadingStep = 0; componentLoadingStep < loading_steps_1.LoadingStep.READY; componentLoadingStep++) {
            fakeNodeRuntimeState.loadingStep.set(componentLoadingStep);
            fixture.detectChanges();
            const loadingElements = getDebugElements();
            for (let elementLoadingStep = 0; elementLoadingStep < loading_steps_1.LoadingStep.READY; elementLoadingStep++) {
                if (elementLoadingStep === componentLoadingStep) {
                    expect(loadingElements[elementLoadingStep]).toBeDefined();
                }
                else {
                    expect(loadingElements[elementLoadingStep]).toBeNull();
                }
            }
        }
    });
    it('should render the error component and hide the iframe and loading element if loadingStep is ERROR', () => __awaiter(void 0, void 0, void 0, function* () {
        const { fixture, fakeNodeRuntimeState, iframeElement, getLoadingElementsWrapper } = beforeEach();
        fakeNodeRuntimeState.loadingStep.set(loading_steps_1.LoadingStep.ERROR);
        fakeNodeRuntimeState.error.set({ message: 'Error message', type: undefined });
        fixture.detectChanges();
        yield fixture.whenStable();
        expect(fixture.debugElement.query(platform_browser_1.By.directive(preview_error_component_1.PreviewError))).toBeDefined();
        expect(getLoadingElementsWrapper()).toBeNull();
        expect(iframeElement).toBeNull();
    }));
});
