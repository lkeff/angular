"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentChild = exports.viewChild = void 0;
exports.viewChildren = viewChildren;
exports.contentChildFn = contentChildFn;
exports.contentChildren = contentChildren;
const di_1 = require("../di");
const query_reactive_1 = require("../render3/queries/query_reactive");
function viewChildFn(locator, opts) {
    ngDevMode && (0, di_1.assertInInjectionContext)(exports.viewChild);
    return (0, query_reactive_1.createSingleResultOptionalQuerySignalFn)(opts);
}
function viewChildRequiredFn(locator, opts) {
    ngDevMode && (0, di_1.assertInInjectionContext)(exports.viewChild);
    return (0, query_reactive_1.createSingleResultRequiredQuerySignalFn)(opts);
}
/**
 * Initializes a view child query.
 *
 * Consider using `viewChild.required` for queries that should always match.
 *
 * @usageNotes
 * Create a child query in your component by declaring a
 * class field and initializing it with the `viewChild()` function.
 *
 * ```angular-ts
 * @Component({template: '<div #el></div><my-component #cmp />'})
 * export class TestComponent {
 *   divEl = viewChild<ElementRef>('el');                   // Signal<ElementRef|undefined>
 *   divElRequired = viewChild.required<ElementRef>('el');  // Signal<ElementRef>
 *   cmp = viewChild(MyComponent);                          // Signal<MyComponent|undefined>
 *   cmpRequired = viewChild.required(MyComponent);         // Signal<MyComponent>
 * }
 * ```
 *
 * @publicApi 19.0
 * @initializerApiFunction
 */
exports.viewChild = (() => {
    // Note: This may be considered a side-effect, but nothing will depend on
    // this assignment, unless this `viewChild` constant export is accessed. It's a
    // self-contained side effect that is local to the user facing `viewChild` export.
    viewChildFn.required = viewChildRequiredFn;
    return viewChildFn;
})();
/**
 * Initializes a view children query.
 *
 * Query results are represented as a signal of a read-only collection containing all matched
 * elements.
 *
 * @usageNotes
 * Create a children query in your component by declaring a
 * class field and initializing it with the `viewChildren()` function.
 *
 * ```ts
 * @Component({...})
 * export class TestComponent {
 *   divEls = viewChildren<ElementRef>('el');   // Signal<ReadonlyArray<ElementRef>>
 * }
 * ```
 *
 * @initializerApiFunction
 * @publicApi 19.0
 */
function viewChildren(locator, opts) {
    ngDevMode && (0, di_1.assertInInjectionContext)(viewChildren);
    return (0, query_reactive_1.createMultiResultQuerySignalFn)(opts);
}
function contentChildFn(locator, opts) {
    ngDevMode && (0, di_1.assertInInjectionContext)(exports.contentChild);
    return (0, query_reactive_1.createSingleResultOptionalQuerySignalFn)(opts);
}
function contentChildRequiredFn(locator, opts) {
    ngDevMode && (0, di_1.assertInInjectionContext)(contentChildren);
    return (0, query_reactive_1.createSingleResultRequiredQuerySignalFn)(opts);
}
/**
 * Initializes a content child query. Consider using `contentChild.required` for queries that should
 * always match.
 *
 * @usageNotes
 * Create a child query in your component by declaring a
 * class field and initializing it with the `contentChild()` function.
 *
 * ```ts
 * @Component({...})
 * export class TestComponent {
 *   headerEl = contentChild<ElementRef>('h');                    // Signal<ElementRef|undefined>
 *   headerElElRequired = contentChild.required<ElementRef>('h'); // Signal<ElementRef>
 *   header = contentChild(MyHeader);                             // Signal<MyHeader|undefined>
 *   headerRequired = contentChild.required(MyHeader);            // Signal<MyHeader>
 * }
 * ```
 *
 * @initializerApiFunction
 * @publicApi 19.0
 */
exports.contentChild = (() => {
    // Note: This may be considered a side-effect, but nothing will depend on
    // this assignment, unless this `viewChild` constant export is accessed. It's a
    // self-contained side effect that is local to the user facing `viewChild` export.
    contentChildFn.required = contentChildRequiredFn;
    return contentChildFn;
})();
/**
 * Initializes a content children query.
 *
 * Query results are represented as a signal of a read-only collection containing all matched
 * elements.
 *
 * @usageNotes
 * Create a children query in your component by declaring a
 * class field and initializing it with the `contentChildren()` function.
 *
 * ```ts
 * @Component({...})
 * export class TestComponent {
 *   headerEl = contentChildren<ElementRef>('h');   // Signal<ReadonlyArray<ElementRef>>
 * }
 * ```
 *
 * @initializerApiFunction
 * @publicApi 19.0
 */
function contentChildren(locator, opts) {
    return (0, query_reactive_1.createMultiResultQuerySignalFn)(opts);
}
