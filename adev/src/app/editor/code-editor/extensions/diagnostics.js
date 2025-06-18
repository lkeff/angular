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
exports.getDiagnosticsExtension = void 0;
const lint_1 = require("@codemirror/lint");
const rxjs_1 = require("rxjs");
// Factory method for diagnostics extension.
const getDiagnosticsExtension = (eventManager, currentFile, sendRequestToTsVfs, diagnosticsState) => {
    return (0, lint_1.linter)((view) => __awaiter(void 0, void 0, void 0, function* () {
        sendRequestToTsVfs({
            action: "diagnostics-request" /* TsVfsWorkerActions.DIAGNOSTICS_REQUEST */,
            data: {
                file: currentFile().filename,
            },
        });
        const diagnostics = yield new Promise((resolve) => {
            eventManager
                .pipe((0, rxjs_1.filter)((event) => event.action === "diagnostics-response" /* TsVfsWorkerActions.DIAGNOSTICS_RESPONSE */), (0, rxjs_1.take)(1))
                .subscribe((response) => {
                resolve(response.data);
            });
        });
        const result = !!diagnostics ? diagnostics : [];
        diagnosticsState.setDiagnostics(result);
        return result;
    }), {
        delay: 400,
    });
};
exports.getDiagnosticsExtension = getDiagnosticsExtension;
