"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewChild = exports.ViewChildren = exports.ContentChild = exports.ContentChildren = exports.Query = exports.emitDistinctChangesOnlyDefaultValue = void 0;
const decorators_1 = require("../util/decorators");
// Stores the default value of `emitDistinctChangesOnly` when the `emitDistinctChangesOnly` is not
// explicitly set.
exports.emitDistinctChangesOnlyDefaultValue = true;
/**
 * Base class for query metadata.
 *
 * @see {@link ContentChildren}
 * @see {@link ContentChild}
 * @see {@link ViewChildren}
 * @see {@link ViewChild}
 *
 * @publicApi
 */
class Query {
}
exports.Query = Query;
/**
 * ContentChildren decorator and metadata.
 *
 *
 * @Annotation
 * @publicApi
 */
exports.ContentChildren = (0, decorators_1.makePropDecorator)('ContentChildren', (selector, opts = {}) => (Object.assign({ selector, first: false, isViewQuery: false, descendants: false, emitDistinctChangesOnly: exports.emitDistinctChangesOnlyDefaultValue }, opts)), Query);
/**
 * ContentChild decorator and metadata.
 *
 *
 * @Annotation
 *
 * @publicApi
 */
exports.ContentChild = (0, decorators_1.makePropDecorator)('ContentChild', (selector, opts = {}) => (Object.assign({ selector, first: true, isViewQuery: false, descendants: true }, opts)), Query);
/**
 * ViewChildren decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
exports.ViewChildren = (0, decorators_1.makePropDecorator)('ViewChildren', (selector, opts = {}) => (Object.assign({ selector, first: false, isViewQuery: true, descendants: true, emitDistinctChangesOnly: exports.emitDistinctChangesOnlyDefaultValue }, opts)), Query);
/**
 * ViewChild decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
exports.ViewChild = (0, decorators_1.makePropDecorator)('ViewChild', (selector, opts) => (Object.assign({ selector, first: true, isViewQuery: true, descendants: true }, opts)), Query);
