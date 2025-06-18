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
exports.getAutocompleteExtension = void 0;
const autocomplete_1 = require("@codemirror/autocomplete");
const rxjs_1 = require("rxjs");
// Factory method for autocomplete extension.
const getAutocompleteExtension = (emitter, currentFile, sendRequestToTsVfs) => {
    return (0, autocomplete_1.autocompletion)({
        activateOnTyping: true,
        override: [
            (context) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const contextPositions = context.state.wordAt(context.pos);
                    sendRequestToTsVfs({
                        action: "autocomplete-request" /* TsVfsWorkerActions.AUTOCOMPLETE_REQUEST */,
                        data: {
                            file: currentFile().filename,
                            position: context.pos,
                            from: contextPositions === null || contextPositions === void 0 ? void 0 : contextPositions.from,
                            to: contextPositions === null || contextPositions === void 0 ? void 0 : contextPositions.to,
                            content: context.state.doc.toString(),
                        },
                    });
                    const completions = yield new Promise((resolve) => {
                        emitter
                            .pipe((0, rxjs_1.filter)((event) => event.action === "autocomplete-response" /* TsVfsWorkerActions.AUTOCOMPLETE_RESPONSE */), (0, rxjs_1.take)(1))
                            .subscribe((message) => {
                            resolve(message.data);
                        });
                    });
                    if (!completions) {
                        return null;
                    }
                    const completionSource = (0, autocomplete_1.completeFromList)(completions.map((completionItem) => {
                        var _a, _b;
                        const suggestions = {
                            type: completionItem.kind,
                            label: completionItem.name,
                            boost: 1 / Number(completionItem.sortText),
                            detail: (_b = (_a = completionItem === null || completionItem === void 0 ? void 0 : completionItem.codeActions) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.description,
                            apply: (view, completion, from, to) => applyWithCodeAction(view, Object.assign(Object.assign({}, completion), completionItem), from, to),
                        };
                        return suggestions;
                    }));
                    return completionSource(context);
                }
                catch (e) {
                    return null;
                }
            }),
        ],
    });
};
exports.getAutocompleteExtension = getAutocompleteExtension;
const applyWithCodeAction = (view, completion, from, to) => {
    var _a;
    const transactionSpecs = [
        (0, autocomplete_1.insertCompletionText)(view.state, completion.label, from, to),
    ];
    if ((_a = completion.codeActions) === null || _a === void 0 ? void 0 : _a.length) {
        const { span, newText } = completion.codeActions[0].changes[0].textChanges[0];
        transactionSpecs.push((0, autocomplete_1.insertCompletionText)(view.state, newText, span.start, span.start + span.length));
    }
    view.dispatch(...transactionSpecs, 
    // avoid moving cursor to the autocompleted text
    { selection: view.state.selection });
    // Manually close the autocomplete picker after applying the completion
    (0, autocomplete_1.closeCompletion)(view);
};
