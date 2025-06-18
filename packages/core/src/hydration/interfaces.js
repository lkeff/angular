"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFER_PREFETCH_TRIGGERS = exports.DEFER_HYDRATE_TRIGGERS = exports.DEFER_PARENT_BLOCK_ID = exports.DEFER_BLOCK_STATE = exports.DEFER_BLOCK_ID = exports.I18N_DATA = exports.DISCONNECTED_NODES = exports.NODES = exports.TEMPLATE_ID = exports.NUM_ROOT_NODES = exports.MULTIPLIER = exports.CONTAINERS = exports.TEMPLATES = exports.ELEMENT_CONTAINERS = exports.NODE_NAVIGATION_STEP_NEXT_SIBLING = exports.NODE_NAVIGATION_STEP_FIRST_CHILD = exports.REFERENCE_NODE_BODY = exports.REFERENCE_NODE_HOST = void 0;
/** Encodes that the node lookup should start from the host node of this component. */
exports.REFERENCE_NODE_HOST = 'h';
/** Encodes that the node lookup should start from the document body node. */
exports.REFERENCE_NODE_BODY = 'b';
exports.NODE_NAVIGATION_STEP_FIRST_CHILD = 'f';
exports.NODE_NAVIGATION_STEP_NEXT_SIBLING = 'n';
/**
 * Keys within serialized view data structure to represent various
 * parts. See the `SerializedView` interface below for additional information.
 */
exports.ELEMENT_CONTAINERS = 'e';
exports.TEMPLATES = 't';
exports.CONTAINERS = 'c';
exports.MULTIPLIER = 'x';
exports.NUM_ROOT_NODES = 'r';
exports.TEMPLATE_ID = 'i'; // as it's also an "id"
exports.NODES = 'n';
exports.DISCONNECTED_NODES = 'd';
exports.I18N_DATA = 'l';
exports.DEFER_BLOCK_ID = 'di';
exports.DEFER_BLOCK_STATE = 's';
exports.DEFER_PARENT_BLOCK_ID = 'p';
exports.DEFER_HYDRATE_TRIGGERS = 't';
exports.DEFER_PREFETCH_TRIGGERS = 'pt';
