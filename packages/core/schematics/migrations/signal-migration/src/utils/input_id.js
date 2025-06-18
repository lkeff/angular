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
exports.getInputDescriptor = getInputDescriptor;
exports.isInputDescriptor = isInputDescriptor;
const typescript_1 = __importDefault(require("typescript"));
const tsurge_1 = require("../../../../utils/tsurge");
const migration_host_1 = require("../migration_host");
function getInputDescriptor(hostOrInfo, node) {
    var _a, _b, _c;
    let className;
    if (typescript_1.default.isAccessor(node)) {
        className = ((_a = node.parent.name) === null || _a === void 0 ? void 0 : _a.text) || '<anonymous>';
    }
    else {
        className = (_c = (_b = node.parent.name) === null || _b === void 0 ? void 0 : _b.text) !== null && _c !== void 0 ? _c : '<anonymous>';
    }
    const info = hostOrInfo instanceof migration_host_1.MigrationHost ? hostOrInfo.programInfo : hostOrInfo;
    const file = (0, tsurge_1.projectFile)(node.getSourceFile(), info);
    // Inputs may be detected in `.d.ts` files. Ensure that if the file IDs
    // match regardless of extension. E.g. `/google3/blaze-out/bin/my_file.ts` should
    // have the same ID as `/google3/my_file.ts`.
    const id = file.id.replace(/\.d\.ts$/, '.ts');
    return {
        key: `${id}@@${className}@@${node.name.text}`,
        node,
    };
}
/** Whether the given value is an input descriptor. */
function isInputDescriptor(v) {
    return (v.key !== undefined &&
        v.node !== undefined);
}
