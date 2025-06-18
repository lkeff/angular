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
const progress_bar_component_1 = require("./progress-bar.component");
const testing_2 = require("@angular/router/testing");
describe('ProgressBarComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield testing_1.TestBed.configureTestingModule({
            imports: [progress_bar_component_1.ProgressBarComponent, testing_2.RouterTestingModule],
        }).compileComponents();
        fixture = testing_1.TestBed.createComponent(progress_bar_component_1.ProgressBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    // This test often timeouts
    // We suspect a racing condition inside the RouterTestingHarness.
    // Until this has been investigated, we will skip this test.
    xit('should call progressBar.complete() on route change', () => __awaiter(void 0, void 0, void 0, function* () {
        const progressBarCompleteSpy = spyOn(component.progressBar(), 'complete');
        const harness = yield testing_2.RouterTestingHarness.create();
        yield harness.navigateByUrl('/');
        yield new Promise((resolve) => setTimeout(resolve, progress_bar_component_1.PROGRESS_BAR_DELAY));
        expect(progressBarCompleteSpy).toHaveBeenCalled();
    }));
});
