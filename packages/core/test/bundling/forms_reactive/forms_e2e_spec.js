"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
require("@angular/compiler");
const testing_1 = require("@angular/private/testing");
const path = __importStar(require("path"));
const PACKAGE = 'angular/packages/core/test/bundling/forms_reactive';
const BUNDLES = ['bundle.js', 'bundle.debug.min.js', 'bundle.min.js'];
describe('functional test for reactive forms', () => {
    BUNDLES.forEach((bundle) => {
        describe(`using ${bundle} bundle`, () => {
            it('should render template form', (0, testing_1.withBody)('<app-root></app-root>', () => __awaiter(void 0, void 0, void 0, function* () {
                // load the bundle
                yield Promise.resolve(`${path.join(PACKAGE, bundle)}`).then(s => __importStar(require(s)));
                // the bundle attaches the following fields to the `window` global.
                const { bootstrapApp } = window;
                yield bootstrapApp();
                // Reactive forms
                const reactiveFormsComponent = window.reactiveFormsComponent;
                const reactiveForm = document.querySelector('app-reactive-forms');
                // Check for inputs
                const inputs = reactiveForm.querySelectorAll('input');
                expect(inputs.length).toBe(5);
                // Check for button
                const reactiveButtons = reactiveForm.querySelectorAll('button');
                expect(reactiveButtons.length).toBe(1);
                expect(reactiveButtons[0]).toBeDefined();
                // Make sure button click works
                const reactiveFormSpy = spyOn(reactiveFormsComponent, 'addCity').and.callThrough();
                reactiveButtons[0].click();
                expect(reactiveFormSpy).toHaveBeenCalled();
                expect(reactiveFormsComponent.addresses.length).toBe(2);
            })));
        });
    });
});
