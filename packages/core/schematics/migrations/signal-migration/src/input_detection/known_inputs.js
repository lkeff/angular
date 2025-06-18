"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnownInputs = void 0;
const directive_info_1 = require("./directive_info");
const incompatibility_1 = require("../passes/problematic_patterns/incompatibility");
const nodes_to_input_1 = require("./nodes_to_input");
const tsurge_1 = require("../../../../utils/tsurge");
/**
 * Registry keeping track of all known `@Input()`s in the compilation.
 *
 *  A known `@Input()` may be defined in sources, or inside some `d.ts` files
 * loaded into the program.
 */
class KnownInputs {
    constructor(programInfo, config) {
        this.programInfo = programInfo;
        this.config = config;
        /**
         * Known inputs from the whole program.
         */
        this.knownInputIds = new Map();
        /** Known container classes of inputs. */
        this._allClasses = new Set();
        /** Maps classes to their directive info. */
        this._classToDirectiveInfo = new Map();
    }
    /** Whether the given input exists. */
    has(descr) {
        return this.knownInputIds.has(descr.key);
    }
    /** Whether the given class contains `@Input`s. */
    isInputContainingClass(clazz) {
        return this._classToDirectiveInfo.has(clazz);
    }
    /** Gets precise `@Input()` information for the given class. */
    getDirectiveInfoForClass(clazz) {
        return this._classToDirectiveInfo.get(clazz);
    }
    /** Gets known input information for the given `@Input()`. */
    get(descr) {
        return this.knownInputIds.get(descr.key);
    }
    /** Gets all classes containing `@Input`s in the compilation. */
    getAllInputContainingClasses() {
        return Array.from(this._allClasses.values());
    }
    /** Registers an `@Input()` in the registry. */
    register(data) {
        if (!this._classToDirectiveInfo.has(data.node.parent)) {
            this._classToDirectiveInfo.set(data.node.parent, new directive_info_1.DirectiveInfo(data.node.parent));
        }
        const directiveInfo = this._classToDirectiveInfo.get(data.node.parent);
        const inputInfo = {
            file: (0, tsurge_1.projectFile)(data.node.getSourceFile(), this.programInfo),
            metadata: data.metadata,
            descriptor: data.descriptor,
            container: directiveInfo,
            extendsFrom: null,
            isIncompatible: () => directiveInfo.isInputMemberIncompatible(data.descriptor),
        };
        directiveInfo.inputFields.set(data.descriptor.key, {
            descriptor: data.descriptor,
            metadata: data.metadata,
        });
        this.knownInputIds.set(data.descriptor.key, inputInfo);
        this._allClasses.add(data.node.parent);
    }
    /** Whether the given input is incompatible for migration. */
    isFieldIncompatible(descriptor) {
        var _a;
        return !!((_a = this.get(descriptor)) === null || _a === void 0 ? void 0 : _a.isIncompatible());
    }
    /** Marks the given input as incompatible for migration. */
    markFieldIncompatible(input, incompatibility) {
        if (!this.knownInputIds.has(input.key)) {
            throw new Error(`Input cannot be marked as incompatible because it's not registered.`);
        }
        const inputInfo = this.knownInputIds.get(input.key);
        const existingIncompatibility = inputInfo.container.getInputMemberIncompatibility(input);
        // Ensure an existing more significant incompatibility is not overridden.
        if (existingIncompatibility !== null && (0, incompatibility_1.isFieldIncompatibility)(existingIncompatibility)) {
            incompatibility = (0, incompatibility_1.pickFieldIncompatibility)(existingIncompatibility, incompatibility);
        }
        this.knownInputIds
            .get(input.key)
            .container.memberIncompatibility.set(input.key, incompatibility);
    }
    /** Marks the given class as incompatible for migration. */
    markClassIncompatible(clazz, incompatibility) {
        if (!this._classToDirectiveInfo.has(clazz)) {
            throw new Error(`Class cannot be marked as incompatible because it's not known.`);
        }
        this._classToDirectiveInfo.get(clazz).incompatible = incompatibility;
    }
    attemptRetrieveDescriptorFromSymbol(symbol) {
        var _a, _b;
        return (_b = (_a = (0, nodes_to_input_1.attemptRetrieveInputFromSymbol)(this.programInfo, symbol, this)) === null || _a === void 0 ? void 0 : _a.descriptor) !== null && _b !== void 0 ? _b : null;
    }
    shouldTrackClassReference(clazz) {
        return this.isInputContainingClass(clazz);
    }
    captureKnownFieldInheritanceRelationship(derived, parent) {
        if (!this.has(derived)) {
            throw new Error(`Expected input to exist in registry: ${derived.key}`);
        }
        this.get(derived).extendsFrom = parent;
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
}
exports.KnownInputs = KnownInputs;
