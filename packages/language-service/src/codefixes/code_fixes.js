"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeFixes = void 0;
const utils_1 = require("./utils");
class CodeFixes {
    constructor(tsLS, codeActionMetas) {
        this.tsLS = tsLS;
        this.codeActionMetas = codeActionMetas;
        this.errorCodeToFixes = new Map();
        this.fixIdToRegistration = new Map();
        for (const meta of codeActionMetas) {
            for (const err of meta.errorCodes) {
                let errMeta = this.errorCodeToFixes.get(err);
                if (errMeta === undefined) {
                    this.errorCodeToFixes.set(err, (errMeta = []));
                }
                errMeta.push(meta);
            }
            for (const fixId of meta.fixIds) {
                if (this.fixIdToRegistration.has(fixId)) {
                    // https://github.com/microsoft/TypeScript/blob/28dc248e5c500c7be9a8c3a7341d303e026b023f/src/services/codeFixProvider.ts#L28
                    // In ts services, only one meta can be registered for a fixId.
                    continue;
                }
                this.fixIdToRegistration.set(fixId, meta);
            }
        }
    }
    hasFixForCode(code) {
        return this.errorCodeToFixes.has(code);
    }
    /**
     * When the user moves the cursor or hovers on a diagnostics, this function will be invoked by LS,
     * and collect all the responses from the `codeActionMetas` which could handle the `errorCodes`.
     */
    getCodeFixesAtPosition(fileName, typeCheckInfo, compiler, start, end, errorCodes, diagnostics, formatOptions, preferences) {
        const codeActions = [];
        for (const code of errorCodes) {
            const metas = this.errorCodeToFixes.get(code);
            if (metas === undefined) {
                continue;
            }
            for (const meta of metas) {
                const codeActionsForMeta = meta.getCodeActions({
                    fileName,
                    typeCheckInfo: typeCheckInfo,
                    compiler,
                    start,
                    end,
                    errorCode: code,
                    formatOptions,
                    preferences,
                    tsLs: this.tsLS,
                });
                const fixAllAvailable = (0, utils_1.isFixAllAvailable)(meta, diagnostics);
                const removeFixIdForCodeActions = codeActionsForMeta.map((_a) => {
                    var { fixId, fixAllDescription } = _a, codeActionForMeta = __rest(_a, ["fixId", "fixAllDescription"]);
                    return fixAllAvailable
                        ? Object.assign(Object.assign({}, codeActionForMeta), { fixId, fixAllDescription }) : codeActionForMeta;
                });
                codeActions.push(...removeFixIdForCodeActions);
            }
        }
        return codeActions;
    }
    /**
     * When the user wants to fix the all same type of diagnostics in the `scope`, this function will
     * be called and fix all diagnostics which will be filtered by the `errorCodes` from the
     * `CodeActionMeta` that the `fixId` belongs to.
     */
    getAllCodeActions(compiler, diagnostics, scope, fixId, formatOptions, preferences) {
        const meta = this.fixIdToRegistration.get(fixId);
        if (meta === undefined) {
            return {
                changes: [],
            };
        }
        return meta.getAllCodeActions({
            compiler,
            fixId,
            formatOptions,
            preferences,
            tsLs: this.tsLS,
            scope,
            // only pass the diagnostics the `meta` cares about.
            diagnostics: diagnostics.filter((diag) => meta.errorCodes.includes(diag.code)),
        });
    }
}
exports.CodeFixes = CodeFixes;
