"use strict";
/**
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
const platform_browser_1 = require("@angular/platform-browser");
const resolution_path_component_1 = require("./resolution-path.component");
describe('ResolutionPath', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield testing_1.TestBed.configureTestingModule({
            imports: [resolution_path_component_1.ResolutionPathComponent],
        }).compileComponents();
        fixture = testing_1.TestBed.createComponent(resolution_path_component_1.ResolutionPathComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should render a proper path in a reverse order', () => {
        const dummyPath = [
            {
                name: 'Root',
                type: 'environment',
            },
            {
                name: 'AppComponent',
                type: 'element',
            },
            {
                name: 'Nav',
                type: 'imported-module',
            },
            {
                name: 'NavComponent',
                type: 'element',
            },
        ];
        fixture.componentRef.setInput('path', dummyPath);
        fixture.detectChanges();
        const nodeElements = fixture.debugElement.queryAll(platform_browser_1.By.css('.node'));
        expect(nodeElements.length).toEqual(dummyPath.length);
        for (let i = 0; i < nodeElements.length; i++) {
            const nodeEl = nodeElements[i];
            const pathNode = dummyPath[dummyPath.length - i - 1];
            expect(nodeEl).toBeTruthy();
            const el = nodeEl.nativeElement;
            expect(el.innerText).toEqual(pathNode.name);
            expect(el.classList.contains(resolution_path_component_1.NODE_TYPE_CLASS_MAP[pathNode.type])).toBeTrue();
        }
    });
});
