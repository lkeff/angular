"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ɵɵgetCurrentView = ɵɵgetCurrentView;
const state_1 = require("../state");
/**
 * Returns the current OpaqueViewState instance.
 *
 * Used in conjunction with the restoreView() instruction to save a snapshot
 * of the current view and restore it when listeners are invoked. This allows
 * walking the declaration view tree in listeners to get vars from parent views.
 *
 * @codeGenApi
 */
function ɵɵgetCurrentView() {
    return (0, state_1.getLView)();
}
