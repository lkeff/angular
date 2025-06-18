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
exports.getTooltipExtension = void 0;
const view_1 = require("@codemirror/view");
const marked_1 = require("marked");
const rxjs_1 = require("rxjs");
const getTooltipExtension = (emitter, currentFile, sendRequestToTsVfs) => {
    return (0, view_1.hoverTooltip)((_, pos) => __awaiter(void 0, void 0, void 0, function* () {
        sendRequestToTsVfs({
            action: "display-tooltip-request" /* TsVfsWorkerActions.DISPLAY_TOOLTIP_REQUEST */,
            data: {
                file: currentFile().filename,
                position: pos,
            },
        });
        const response = yield new Promise((resolve) => {
            emitter
                .pipe((0, rxjs_1.filter)((event) => event.action === "display-tooltip-response" /* TsVfsWorkerActions.DISPLAY_TOOLTIP_RESPONSE */), (0, rxjs_1.take)(1))
                .subscribe((message) => {
                resolve(message.data);
            });
        });
        if (!(response === null || response === void 0 ? void 0 : response.displayParts))
            return null;
        const { displayParts, tags, documentation } = response;
        return {
            pos,
            create() {
                var _a, _b;
                const tooltip = document.createElement('div');
                tooltip.appendChild(getHtmlFromDisplayParts(displayParts));
                // use documentation if available as it's more informative than tags
                if ((_a = documentation === null || documentation === void 0 ? void 0 : documentation[0]) === null || _a === void 0 ? void 0 : _a.text) {
                    tooltip.appendChild(getMarkedHtmlFromString((_b = documentation[0]) === null || _b === void 0 ? void 0 : _b.text));
                }
                else if (tags === null || tags === void 0 ? void 0 : tags.length) {
                    tooltip.appendChild(getTagsHtml(tags));
                }
                return {
                    dom: tooltip,
                    // Note: force the tooltip to scroll to the top on mount and on position change
                    // because depending on the position of the mouse and the size of the tooltip content,
                    // the tooltip might render with its initial scroll position on the bottom
                    mount: (_) => forceTooltipScrollTop(),
                    positioned: (_) => forceTooltipScrollTop(),
                    resize: false,
                };
            },
        };
    }), {
        hideOnChange: true,
    });
};
exports.getTooltipExtension = getTooltipExtension;
function forceTooltipScrollTop() {
    const activeTooltip = document.querySelector('.cm-tooltip');
    // only scroll if the tooltip is scrollable
    if (activeTooltip && activeTooltip.scrollHeight > activeTooltip.clientHeight) {
        activeTooltip.scroll(0, -activeTooltip.scrollHeight);
    }
}
function getMarkedHtmlFromString(content) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = (0, marked_1.marked)(content);
    return wrapper;
}
function getHtmlFromDisplayParts(displayParts) {
    const wrapper = document.createElement('div');
    let displayPartWrapper = document.createElement('div');
    for (const part of displayParts) {
        const span = document.createElement('span');
        span.classList.add(part.kind);
        span.textContent = part.text;
        // create new div to separate lines when a line break is found
        if (part.kind === 'lineBreak') {
            wrapper.appendChild(displayPartWrapper);
            displayPartWrapper = document.createElement('div');
        }
        else {
            displayPartWrapper.appendChild(span);
        }
    }
    wrapper.appendChild(displayPartWrapper);
    return wrapper;
}
function getTagsHtml(tags) {
    const tagsWrapper = document.createElement('div');
    let contentString = '';
    for (let tag of tags) {
        contentString += `\n@${tag.name}\n`;
        if (tag.text) {
            for (const { text } of tag.text) {
                contentString += text;
            }
        }
    }
    tagsWrapper.innerHTML = (0, marked_1.marked)(contentString);
    return tagsWrapper;
}
