"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.humanizeDefinitionInfo = humanizeDefinitionInfo;
function humanizeDefinitionInfo(def, service) {
    const snapshot = service.getScriptInfo(def.fileName).getSnapshot();
    return {
        fileName: def.fileName,
        textSpan: snapshot.getText(def.textSpan.start, def.textSpan.start + def.textSpan.length),
        contextSpan: def.contextSpan
            ? snapshot.getText(def.contextSpan.start, def.contextSpan.start + def.contextSpan.length)
            : undefined,
    };
}
