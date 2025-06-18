"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexingContext = void 0;
/**
 * A context for storing indexing information about components of a program.
 *
 * An `IndexingContext` collects component and template analysis information from
 * `DecoratorHandler`s and exposes them to be indexed.
 */
class IndexingContext {
    constructor() {
        this.components = new Set();
    }
    /**
     * Adds a component to the context.
     */
    addComponent(info) {
        this.components.add(info);
    }
}
exports.IndexingContext = IndexingContext;
