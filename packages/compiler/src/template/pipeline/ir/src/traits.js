"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TRAIT_CONSUMES_VARS = exports.TRAIT_DEPENDS_ON_SLOT_CONTEXT = exports.TRAIT_CONSUMES_SLOT = exports.UsesVarOffset = exports.ConsumesVarsTrait = exports.DependsOnSlotContext = exports.ConsumesSlot = void 0;
exports.hasConsumesSlotTrait = hasConsumesSlotTrait;
exports.hasDependsOnSlotContextTrait = hasDependsOnSlotContextTrait;
exports.hasConsumesVarsTrait = hasConsumesVarsTrait;
exports.hasUsesVarOffsetTrait = hasUsesVarOffsetTrait;
/**
 * Marker symbol for `ConsumesSlotOpTrait`.
 */
exports.ConsumesSlot = Symbol('ConsumesSlot');
/**
 * Marker symbol for `DependsOnSlotContextOpTrait`.
 */
exports.DependsOnSlotContext = Symbol('DependsOnSlotContext');
/**
 * Marker symbol for `ConsumesVars` trait.
 */
exports.ConsumesVarsTrait = Symbol('ConsumesVars');
/**
 * Marker symbol for `UsesVarOffset` trait.
 */
exports.UsesVarOffset = Symbol('UsesVarOffset');
/**
 * Default values for most `ConsumesSlotOpTrait` fields (used with the spread operator to initialize
 * implementors of the trait).
 */
exports.TRAIT_CONSUMES_SLOT = {
    [exports.ConsumesSlot]: true,
    numSlotsUsed: 1,
};
/**
 * Default values for most `DependsOnSlotContextOpTrait` fields (used with the spread operator to
 * initialize implementors of the trait).
 */
exports.TRAIT_DEPENDS_ON_SLOT_CONTEXT = {
    [exports.DependsOnSlotContext]: true,
};
/**
 * Default values for `UsesVars` fields (used with the spread operator to initialize
 * implementors of the trait).
 */
exports.TRAIT_CONSUMES_VARS = {
    [exports.ConsumesVarsTrait]: true,
};
/**
 * Test whether an operation implements `ConsumesSlotOpTrait`.
 */
function hasConsumesSlotTrait(op) {
    return op[exports.ConsumesSlot] === true;
}
function hasDependsOnSlotContextTrait(value) {
    return value[exports.DependsOnSlotContext] === true;
}
function hasConsumesVarsTrait(value) {
    return value[exports.ConsumesVarsTrait] === true;
}
/**
 * Test whether an expression implements `UsesVarOffsetTrait`.
 */
function hasUsesVarOffsetTrait(expr) {
    return expr[exports.UsesVarOffset] === true;
}
