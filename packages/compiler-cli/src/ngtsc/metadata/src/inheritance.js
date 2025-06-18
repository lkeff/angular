"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.flattenInheritedDirectiveMetadata = flattenInheritedDirectiveMetadata;
const property_mapping_1 = require("./property_mapping");
/**
 * Given a reference to a directive, return a flattened version of its `DirectiveMeta` metadata
 * which includes metadata from its entire inheritance chain.
 *
 * The returned `DirectiveMeta` will either have `baseClass: null` if the inheritance chain could be
 * fully resolved, or `baseClass: 'dynamic'` if the inheritance chain could not be completely
 * followed.
 */
function flattenInheritedDirectiveMetadata(reader, dir) {
    const topMeta = reader.getDirectiveMetadata(dir);
    if (topMeta === null) {
        return null;
    }
    if (topMeta.baseClass === null) {
        return topMeta;
    }
    const coercedInputFields = new Set();
    const undeclaredInputFields = new Set();
    const restrictedInputFields = new Set();
    const stringLiteralInputFields = new Set();
    let hostDirectives = null;
    let isDynamic = false;
    let inputs = property_mapping_1.ClassPropertyMapping.empty();
    let outputs = property_mapping_1.ClassPropertyMapping.empty();
    let isStructural = false;
    const addMetadata = (meta) => {
        if (meta.baseClass === 'dynamic') {
            isDynamic = true;
        }
        else if (meta.baseClass !== null) {
            const baseMeta = reader.getDirectiveMetadata(meta.baseClass);
            if (baseMeta !== null) {
                addMetadata(baseMeta);
            }
            else {
                // Missing metadata for the base class means it's effectively dynamic.
                isDynamic = true;
            }
        }
        isStructural = isStructural || meta.isStructural;
        inputs = property_mapping_1.ClassPropertyMapping.merge(inputs, meta.inputs);
        outputs = property_mapping_1.ClassPropertyMapping.merge(outputs, meta.outputs);
        for (const coercedInputField of meta.coercedInputFields) {
            coercedInputFields.add(coercedInputField);
        }
        for (const undeclaredInputField of meta.undeclaredInputFields) {
            undeclaredInputFields.add(undeclaredInputField);
        }
        for (const restrictedInputField of meta.restrictedInputFields) {
            restrictedInputFields.add(restrictedInputField);
        }
        for (const field of meta.stringLiteralInputFields) {
            stringLiteralInputFields.add(field);
        }
        if (meta.hostDirectives !== null && meta.hostDirectives.length > 0) {
            hostDirectives !== null && hostDirectives !== void 0 ? hostDirectives : (hostDirectives = []);
            hostDirectives.push(...meta.hostDirectives);
        }
    };
    addMetadata(topMeta);
    return Object.assign(Object.assign({}, topMeta), { inputs,
        outputs,
        coercedInputFields,
        undeclaredInputFields,
        restrictedInputFields,
        stringLiteralInputFields, baseClass: isDynamic ? 'dynamic' : null, isStructural,
        hostDirectives });
}
