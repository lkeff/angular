"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildDirectiveTree = exports.METADATA_PROPERTY_NAME = exports.getLViewFromDirectiveOrElementInstance = exports.getDirectiveHostElement = void 0;
const ltree_1 = require("./ltree");
const render_tree_1 = require("./render-tree");
var ltree_2 = require("./ltree");
Object.defineProperty(exports, "getDirectiveHostElement", { enumerable: true, get: function () { return ltree_2.getDirectiveHostElement; } });
Object.defineProperty(exports, "getLViewFromDirectiveOrElementInstance", { enumerable: true, get: function () { return ltree_2.getLViewFromDirectiveOrElementInstance; } });
Object.defineProperty(exports, "METADATA_PROPERTY_NAME", { enumerable: true, get: function () { return ltree_2.METADATA_PROPERTY_NAME; } });
// The order of the strategies matters. Lower indices have higher priority.
const strategies = [new render_tree_1.RTreeStrategy(), new ltree_1.LTreeStrategy()];
let strategy = null;
const selectStrategy = (element) => {
    for (const s of strategies) {
        if (s.supports(element)) {
            return s;
        }
    }
    return null;
};
const buildDirectiveTree = (element) => {
    if (!strategy) {
        strategy = selectStrategy(element);
    }
    if (!strategy) {
        console.error('Unable to parse the component tree');
        return [];
    }
    return strategy.build(element);
};
exports.buildDirectiveTree = buildDirectiveTree;
