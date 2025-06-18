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
const testbed_1 = require("@angular/cdk/testing/testbed");
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const testing_2 = require("@angular/material/tabs/testing");
const platform_browser_1 = require("@angular/platform-browser");
const animations_1 = require("@angular/platform-browser/animations");
const rxjs_1 = require("rxjs");
const embedded_tutorial_manager_service_1 = require("../embedded-tutorial-manager.service");
const code_editor_component_1 = require("./code-editor.component");
const code_mirror_editor_service_1 = require("./code-mirror-editor.service");
const docs_1 = require("@angular/docs");
const testing_3 = require("@angular/material/tooltip/testing");
const files = [
    { filename: 'a', content: '', language: {} },
    { filename: 'b', content: '', language: {} },
    { filename: 'c', content: '', language: {} },
    ...Array.from(code_editor_component_1.REQUIRED_FILES).map((filename) => ({
        filename,
        content: '',
        language: {},
    })),
];
class FakeCodeMirrorEditor {
    constructor() {
        this.files = (0, core_1.signal)(files);
        this.currentFile = (0, core_1.signal)(this.files()[0]);
        this.openFiles = this.files;
    }
    init(element) { }
    changeCurrentFile(fileName) { }
    disable() { }
}
const codeMirrorEditorService = new FakeCodeMirrorEditor();
const fakeChangeDetectorRef = new docs_1.FakeChangeDetectorRef();
describe('CodeEditor', () => {
    let component;
    let fixture;
    let loader;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield testing_1.TestBed.configureTestingModule({
            imports: [code_editor_component_1.CodeEditor],
            providers: [
                // Removing the noop animations makes the test VERY flaky.
                // TODO: understand why and fix the flakiness.
                (0, animations_1.provideNoopAnimations)(),
                {
                    provide: code_mirror_editor_service_1.CodeMirrorEditor,
                    useValue: codeMirrorEditorService,
                },
                {
                    provide: core_1.ChangeDetectorRef,
                    useValue: fakeChangeDetectorRef,
                },
                {
                    provide: embedded_tutorial_manager_service_1.EmbeddedTutorialManager,
                    useValue: {
                        tutorialChanged$: new rxjs_1.BehaviorSubject(true),
                        tutorialId: () => 'tutorial',
                        tutorialFilesystemTree: () => ({ 'app.component.ts': '' }),
                        commonFilesystemTree: () => ({ 'app.component.ts': '' }),
                        openFiles: () => ['app.component.ts'],
                        tutorialFiles: () => ({ 'app.component.ts': '' }),
                        nextTutorial: () => 'next-tutorial',
                        previousTutorial: () => 'previous-tutorial',
                        type: () => docs_1.TutorialType.EDITOR,
                        title: () => 'Tutorial',
                    },
                },
            ],
        }).compileComponents();
        fixture = testing_1.TestBed.createComponent(code_editor_component_1.CodeEditor);
        loader = testbed_1.TestbedHarnessEnvironment.loader(fixture);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should initialize the code editor service afterViewInit with the code editor wrapper element', () => {
        const codeMirrorEditorInitSpy = spyOn(codeMirrorEditorService, 'init');
        component.ngAfterViewInit();
        expect(codeMirrorEditorInitSpy).toHaveBeenCalledWith(component.codeEditorWrapperRef().nativeElement);
    });
    it('should render tabs based on filenames order', () => __awaiter(void 0, void 0, void 0, function* () {
        component.ngAfterViewInit();
        const matTabGroup = yield loader.getHarness(testing_2.MatTabGroupHarness);
        const tabs = yield matTabGroup.getTabs();
        const expectedLabels = files.map((file, index) => {
            const label = file.filename.replace('src/', '');
            if (index === 0)
                return `${label} editdelete`;
            return label;
        });
        for (const [index, tab] of tabs.entries()) {
            const tabLabel = yield tab.getLabel();
            expect(tabLabel).toBe(expectedLabels[index]);
        }
    }));
    describe('Tabs selection', () => {
        let codeMirrorEditorChangeCurrentFileSpy;
        beforeEach(() => {
            codeMirrorEditorChangeCurrentFileSpy = spyOn(codeMirrorEditorService, 'changeCurrentFile');
            component.ngAfterViewInit();
        });
        it('should change file content when clicking on an unselected tab', () => __awaiter(void 0, void 0, void 0, function* () {
            const matTabGroup = yield loader.getHarness(testing_2.MatTabGroupHarness);
            const tabs = yield matTabGroup.getTabs();
            expect(yield tabs[0].isSelected());
            yield tabs[1].select();
            expect(codeMirrorEditorChangeCurrentFileSpy).toHaveBeenCalledWith(files[1].filename);
        }));
        it('should not change file content when clicking on a selected tab', () => __awaiter(void 0, void 0, void 0, function* () {
            const matTabGroup = yield loader.getHarness(testing_2.MatTabGroupHarness);
            const tabs = yield matTabGroup.getTabs();
            expect(yield tabs[0].isSelected());
            yield tabs[0].select();
            expect(codeMirrorEditorChangeCurrentFileSpy).not.toHaveBeenCalled();
        }));
        it('should focused on a new tab when adding a new file', () => __awaiter(void 0, void 0, void 0, function* () {
            // Wait until the asynchronous injection stuff is done.
            yield fixture.whenStable();
            const button = fixture.debugElement.query(platform_browser_1.By.css('button.adev-add-file')).nativeElement;
            button.click();
            const matTabGroup = yield loader.getHarness(testing_2.MatTabGroupHarness);
            const tabs = yield matTabGroup.getTabs();
            expect(yield tabs[files.length].isSelected()).toBeTrue();
        }));
        it('should change file content when clicking on unselected tab while creating a new file', () => __awaiter(void 0, void 0, void 0, function* () {
            const button = fixture.debugElement.query(platform_browser_1.By.css('button.adev-add-file')).nativeElement;
            button.click();
            const matTabGroup = yield loader.getHarness(testing_2.MatTabGroupHarness);
            const tabs = yield matTabGroup.getTabs();
            yield tabs[2].select();
            expect(codeMirrorEditorChangeCurrentFileSpy).toHaveBeenCalledWith(files[2].filename);
        }));
        it('start creating a new file, select an existing tab, should not change file content when return back on a new file tab', () => __awaiter(void 0, void 0, void 0, function* () {
            const button = fixture.debugElement.query(platform_browser_1.By.css('button.adev-add-file')).nativeElement;
            button.click();
            const matTabGroup = yield loader.getHarness(testing_2.MatTabGroupHarness);
            const tabs = yield matTabGroup.getTabs();
            yield tabs[1].select();
            expect(codeMirrorEditorChangeCurrentFileSpy).toHaveBeenCalledWith(files[1].filename);
            codeMirrorEditorChangeCurrentFileSpy.calls.reset();
            yield tabs[files.length].select();
            expect(codeMirrorEditorChangeCurrentFileSpy).not.toHaveBeenCalled();
        }));
    });
    it('should not allow to delete a required file', () => __awaiter(void 0, void 0, void 0, function* () {
        const matTabGroup = yield loader.getHarness(testing_2.MatTabGroupHarness);
        const tabs = yield matTabGroup.getTabs();
        const requiredFilesTabIndexes = files
            .filter((file) => code_editor_component_1.REQUIRED_FILES.has(file.filename))
            .map((file) => files.indexOf(file));
        for (const tabIndex of requiredFilesTabIndexes) {
            const tab = tabs[tabIndex];
            yield tab.select();
            expect(fixture.debugElement.query(platform_browser_1.By.css('[aria-label="Delete file"]'))).toBeNull();
        }
    }));
    it('should be able to display the tooltip on the download button', () => __awaiter(void 0, void 0, void 0, function* () {
        const tooltip = yield loader.getHarness(testing_3.MatTooltipHarness.with({ selector: '.adev-editor-download-button' }));
        expect(yield tooltip.isOpen()).toBeFalse();
        yield tooltip.show();
        expect(yield tooltip.isOpen()).toBeTrue();
    }));
    it('should be able to get the tooltip message on the download button', () => __awaiter(void 0, void 0, void 0, function* () {
        const tooltip = yield loader.getHarness(testing_3.MatTooltipHarness.with({ selector: '.adev-editor-download-button' }));
        yield tooltip.show();
        expect(yield tooltip.getTooltipText()).toBe('Download current source code');
    }));
    it('should not be able to get the tooltip message on the download button when the tooltip is not shown', () => __awaiter(void 0, void 0, void 0, function* () {
        const tooltip = yield loader.getHarness(testing_3.MatTooltipHarness.with({ selector: '.adev-editor-download-button' }));
        expect(yield tooltip.getTooltipText()).toBe('');
    }));
});
