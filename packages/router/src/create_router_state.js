"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRouterState = createRouterState;
const rxjs_1 = require("rxjs");
const router_state_1 = require("./router_state");
const tree_1 = require("./utils/tree");
function createRouterState(routeReuseStrategy, curr, prevState) {
    const root = createNode(routeReuseStrategy, curr._root, prevState ? prevState._root : undefined);
    return new router_state_1.RouterState(root, curr);
}
function createNode(routeReuseStrategy, curr, prevState) {
    // reuse an activated route that is currently displayed on the screen
    if (prevState && routeReuseStrategy.shouldReuseRoute(curr.value, prevState.value.snapshot)) {
        const value = prevState.value;
        value._futureSnapshot = curr.value;
        const children = createOrReuseChildren(routeReuseStrategy, curr, prevState);
        return new tree_1.TreeNode(value, children);
    }
    else {
        if (routeReuseStrategy.shouldAttach(curr.value)) {
            // retrieve an activated route that is used to be displayed, but is not currently displayed
            const detachedRouteHandle = routeReuseStrategy.retrieve(curr.value);
            if (detachedRouteHandle !== null) {
                const tree = detachedRouteHandle.route;
                tree.value._futureSnapshot = curr.value;
                tree.children = curr.children.map((c) => createNode(routeReuseStrategy, c));
                return tree;
            }
        }
        const value = createActivatedRoute(curr.value);
        const children = curr.children.map((c) => createNode(routeReuseStrategy, c));
        return new tree_1.TreeNode(value, children);
    }
}
function createOrReuseChildren(routeReuseStrategy, curr, prevState) {
    return curr.children.map((child) => {
        for (const p of prevState.children) {
            if (routeReuseStrategy.shouldReuseRoute(child.value, p.value.snapshot)) {
                return createNode(routeReuseStrategy, child, p);
            }
        }
        return createNode(routeReuseStrategy, child);
    });
}
function createActivatedRoute(c) {
    return new router_state_1.ActivatedRoute(new rxjs_1.BehaviorSubject(c.url), new rxjs_1.BehaviorSubject(c.params), new rxjs_1.BehaviorSubject(c.queryParams), new rxjs_1.BehaviorSubject(c.fragment), new rxjs_1.BehaviorSubject(c.data), c.outlet, c.component, c);
}
