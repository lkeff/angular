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
const runfiles_1 = require("@bazel/runfiles");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const PACKAGE = 'angular/packages/core/test/bundling/cyclic_import';
describe('treeshaking with uglify', () => {
    let content;
    const contentPath = runfiles_1.runfiles.resolve(path.join(PACKAGE, 'bundle.debug.min.js'));
    beforeAll(() => {
        content = fs.readFileSync(contentPath, { encoding: 'utf-8' });
    });
    describe('functional test in domino', () => {
        it('should render hello world when not minified', (0, testing_1.withBody)('<trigger></trigger>', () => __awaiter(void 0, void 0, void 0, function* () {
            yield Promise.resolve(`${path.join(PACKAGE, 'bundle.js')}`).then(s => __importStar(require(s)));
            yield window.appReady;
            expect(document.body.textContent).toEqual('dep');
        })));
        it('should render hello world when debug minified', (0, testing_1.withBody)('<trigger></trigger>', () => __awaiter(void 0, void 0, void 0, function* () {
            yield Promise.resolve(`${path.join(PACKAGE, 'bundle.debug.min.js')}`).then(s => __importStar(require(s)));
            yield window.appReady;
            expect(document.body.textContent).toEqual('dep');
        })));
        it('should render hello world when fully minified', (0, testing_1.withBody)('<trigger></trigger>', () => __awaiter(void 0, void 0, void 0, function* () {
            yield Promise.resolve(`${path.join(PACKAGE, 'bundle.min.js')}`).then(s => __importStar(require(s)));
            yield window.appReady;
            expect(document.body.textContent).toEqual('dep');
        })));
    });
});
