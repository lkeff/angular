"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixUnusedStandaloneImportsMeta = void 0;
const diagnostics_1 = require("@angular/compiler-cli/src/ngtsc/diagnostics");
const typescript_1 = __importDefault(require("typescript"));
const utils_1 = require("./utils");
const ts_utils_1 = require("../utils/ts_utils");
/**
 * Fix for [unused standalone imports](https://angular.io/extended-diagnostics/NG8113)
 */
exports.fixUnusedStandaloneImportsMeta = {
    errorCodes: [(0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.UNUSED_STANDALONE_IMPORTS)],
    getCodeActions: ({ start, fileName, compiler }) => {
        const file = compiler.programDriver.getProgram().getSourceFile(fileName) || null;
        if (file === null) {
            return [];
        }
        const node = (0, ts_utils_1.findFirstMatchingNode)(file, {
            filter: (n) => typescript_1.default.isIdentifier(n) && start >= n.getStart() && start <= n.getEnd(),
        });
        const parent = (node === null || node === void 0 ? void 0 : node.parent) || null;
        if (node === null || parent === null) {
            return [];
        }
        if (isFullyUnusedArray(node, parent)) {
            return [
                {
                    fixName: utils_1.FixIdForCodeFixesAll.FIX_UNUSED_STANDALONE_IMPORTS,
                    fixId: utils_1.FixIdForCodeFixesAll.FIX_UNUSED_STANDALONE_IMPORTS,
                    fixAllDescription: `Remove all unused imports`,
                    description: `Remove all unused imports`,
                    changes: [
                        {
                            fileName,
                            textChanges: [
                                {
                                    span: {
                                        start: parent.initializer.getStart(),
                                        length: parent.initializer.getWidth(),
                                    },
                                    newText: '[]',
                                },
                            ],
                        },
                    ],
                },
            ];
        }
        else if (typescript_1.default.isArrayLiteralExpression(parent)) {
            const newArray = typescript_1.default.factory.updateArrayLiteralExpression(parent, parent.elements.filter((el) => el !== node));
            return [
                {
                    fixName: utils_1.FixIdForCodeFixesAll.FIX_UNUSED_STANDALONE_IMPORTS,
                    fixId: utils_1.FixIdForCodeFixesAll.FIX_UNUSED_STANDALONE_IMPORTS,
                    fixAllDescription: `Remove all unused imports`,
                    description: `Remove unused import ${node.text}`,
                    changes: [
                        {
                            fileName,
                            textChanges: [
                                {
                                    span: {
                                        start: parent.getStart(),
                                        length: parent.getWidth(),
                                    },
                                    newText: typescript_1.default.createPrinter().printNode(typescript_1.default.EmitHint.Unspecified, newArray, file),
                                },
                            ],
                        },
                    ],
                },
            ];
        }
        return [];
    },
    fixIds: [utils_1.FixIdForCodeFixesAll.FIX_UNUSED_STANDALONE_IMPORTS],
    getAllCodeActions: ({ diagnostics }) => {
        const arrayUpdates = new Map();
        const arraysToClear = new Set();
        const changes = [];
        for (const diag of diagnostics) {
            const { start, length, file } = diag;
            if (file === undefined || start === undefined || length == undefined) {
                continue;
            }
            const node = (0, ts_utils_1.findFirstMatchingNode)(file, {
                filter: (n) => n.getStart() === start && n.getWidth() === length,
            });
            const parent = (node === null || node === void 0 ? void 0 : node.parent) || null;
            if (node === null || parent === null) {
                continue;
            }
            // If the diagnostic is reported on the name of the `imports` array initializer, it means
            // that all imports are unused so we can clear the entire array. Otherwise if it's reported
            // on a single element, we only have to remove that element.
            if (isFullyUnusedArray(node, parent)) {
                arraysToClear.add(parent.initializer);
            }
            else if (typescript_1.default.isArrayLiteralExpression(parent)) {
                if (!arrayUpdates.has(parent)) {
                    arrayUpdates.set(parent, new Set());
                }
                arrayUpdates.get(parent).add(node);
            }
        }
        for (const array of arraysToClear) {
            changes.push({
                fileName: array.getSourceFile().fileName,
                textChanges: [
                    {
                        span: { start: array.getStart(), length: array.getWidth() },
                        newText: '[]',
                    },
                ],
            });
        }
        for (const [array, toRemove] of arrayUpdates) {
            if (arraysToClear.has(array)) {
                continue;
            }
            const file = array.getSourceFile();
            const newArray = typescript_1.default.factory.updateArrayLiteralExpression(array, array.elements.filter((el) => !toRemove.has(el)));
            changes.push({
                fileName: file.fileName,
                textChanges: [
                    {
                        span: { start: array.getStart(), length: array.getWidth() },
                        newText: typescript_1.default.createPrinter().printNode(typescript_1.default.EmitHint.Unspecified, newArray, file),
                    },
                ],
            });
        }
        return { changes };
    },
};
/** Checks whether a diagnostic was reported on a node where all imports are unused. */
function isFullyUnusedArray(node, parent) {
    return (typescript_1.default.isPropertyAssignment(parent) &&
        parent.name === node &&
        typescript_1.default.isArrayLiteralExpression(parent.initializer));
}
