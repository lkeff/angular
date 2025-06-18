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
exports.KnownQueries = void 0;
const typescript_1 = __importDefault(require("typescript"));
const tsurge_1 = require("../../utils/tsurge");
const field_tracking_1 = require("./field_tracking");
const src_1 = require("../signal-migration/src");
const incompatibility_1 = require("../signal-migration/src/passes/problematic_patterns/incompatibility");
const incompatibility_2 = require("./incompatibility");
class KnownQueries {
    constructor(info, config, globalMetadata) {
        this.info = info;
        this.config = config;
        this.globalMetadata = globalMetadata;
        this.classToQueryFields = new Map();
        this.knownQueryIDs = new Map();
    }
    isFieldIncompatible(descriptor) {
        return this.getIncompatibilityForField(descriptor) !== null;
    }
    markFieldIncompatible(field, incompatibility) {
        (0, incompatibility_2.markFieldIncompatibleInMetadata)(this.globalMetadata.problematicQueries, field.key, incompatibility.reason);
    }
    markClassIncompatible(node, reason) {
        var _a;
        (_a = this.classToQueryFields.get(node)) === null || _a === void 0 ? void 0 : _a.forEach((f) => {
            var _a;
            var _b, _c;
            (_a = (_b = this.globalMetadata.problematicQueries)[_c = f.key]) !== null && _a !== void 0 ? _a : (_b[_c] = { classReason: null, fieldReason: null });
            this.globalMetadata.problematicQueries[f.key].classReason = reason;
        });
    }
    registerQueryField(queryField, id) {
        if (!this.classToQueryFields.has(queryField.parent)) {
            this.classToQueryFields.set(queryField.parent, []);
        }
        this.classToQueryFields.get(queryField.parent).push({
            key: id,
            node: queryField,
        });
        this.knownQueryIDs.set(id, { key: id, node: queryField });
        const descriptor = { key: id, node: queryField };
        const file = (0, tsurge_1.projectFile)(queryField.getSourceFile(), this.info);
        if (this.config.shouldMigrateQuery !== undefined &&
            !this.config.shouldMigrateQuery(descriptor, file)) {
            this.markFieldIncompatible(descriptor, {
                context: null,
                reason: incompatibility_1.FieldIncompatibilityReason.SkippedViaConfigFilter,
            });
        }
    }
    attemptRetrieveDescriptorFromSymbol(symbol) {
        const descriptor = (0, field_tracking_1.getClassFieldDescriptorForSymbol)(symbol, this.info);
        if (descriptor !== null && this.knownQueryIDs.has(descriptor.key)) {
            return descriptor;
        }
        return null;
    }
    shouldTrackClassReference(clazz) {
        return this.classToQueryFields.has(clazz);
    }
    getQueryFieldsOfClass(clazz) {
        return this.classToQueryFields.get(clazz);
    }
    getAllClassesWithQueries() {
        return Array.from(this.classToQueryFields.keys()).filter((c) => typescript_1.default.isClassDeclaration(c));
    }
    captureKnownFieldInheritanceRelationship(derived, parent) {
        // Note: The edge problematic pattern recognition is not as good as the one
        // we have in the signal input migration. That is because we couldn't trivially
        // build up an inheritance graph during analyze phase where we DON'T know what
        // fields refer to queries. Usually we'd use the graph to smartly propagate
        // incompatibilities using topological sort. This doesn't work here and is
        // unnecessarily complex, so we try our best at detecting direct edge
        // incompatibilities (which are quite order dependent).
        if (this.isFieldIncompatible(parent) && !this.isFieldIncompatible(derived)) {
            this.markFieldIncompatible(derived, {
                context: null,
                reason: incompatibility_1.FieldIncompatibilityReason.ParentIsIncompatible,
            });
            return;
        }
        if (this.isFieldIncompatible(derived) && !this.isFieldIncompatible(parent)) {
            this.markFieldIncompatible(parent, {
                context: null,
                reason: incompatibility_1.FieldIncompatibilityReason.DerivedIsIncompatible,
            });
        }
    }
    captureUnknownDerivedField(field) {
        this.markFieldIncompatible(field, {
            context: null,
            reason: incompatibility_1.FieldIncompatibilityReason.OverriddenByDerivedClass,
        });
    }
    captureUnknownParentField(field) {
        this.markFieldIncompatible(field, {
            context: null,
            reason: incompatibility_1.FieldIncompatibilityReason.TypeConflictWithBaseClass,
        });
    }
    getIncompatibilityForField(descriptor) {
        const problematicInfo = this.globalMetadata.problematicQueries[descriptor.key];
        if (problematicInfo === undefined) {
            return null;
        }
        if (problematicInfo.fieldReason !== null) {
            return { context: null, reason: problematicInfo.fieldReason };
        }
        if (problematicInfo.classReason !== null) {
            return problematicInfo.classReason;
        }
        return null;
    }
    getIncompatibilityTextForField(field) {
        const incompatibilityInfo = this.globalMetadata.problematicQueries[field.key];
        if (incompatibilityInfo.fieldReason !== null) {
            return (0, src_1.getMessageForFieldIncompatibility)(incompatibilityInfo.fieldReason, {
                single: 'query',
                plural: 'queries',
            });
        }
        if (incompatibilityInfo.classReason !== null) {
            return (0, src_1.getMessageForClassIncompatibility)(incompatibilityInfo.classReason, {
                single: 'query',
                plural: 'queries',
            });
        }
        return null;
    }
}
exports.KnownQueries = KnownQueries;
