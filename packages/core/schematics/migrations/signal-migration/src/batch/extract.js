"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompilationUnitMetadata = getCompilationUnitMetadata;
function getCompilationUnitMetadata(knownInputs) {
    const struct = {
        knownInputs: Array.from(knownInputs.knownInputIds.entries()).reduce((res, [inputClassFieldIdStr, info]) => {
            var _a, _b;
            const classIncompatibility = info.container.incompatible !== null ? info.container.incompatible : null;
            const memberIncompatibility = info.container.memberIncompatibility.has(inputClassFieldIdStr)
                ? info.container.memberIncompatibility.get(inputClassFieldIdStr).reason
                : null;
            // Note: Trim off the `context` as it cannot be serialized with e.g. TS nodes.
            return Object.assign(Object.assign({}, res), { [inputClassFieldIdStr]: {
                    owningClassIncompatibility: classIncompatibility,
                    memberIncompatibility,
                    seenAsSourceInput: info.metadata.inSourceFile,
                    extendsFrom: (_b = (_a = info.extendsFrom) === null || _a === void 0 ? void 0 : _a.key) !== null && _b !== void 0 ? _b : null,
                } });
        }, {}),
    };
    return struct;
}
