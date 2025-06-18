"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBaseUrlAfterRedirects = exports.normalizePath = exports.mapNavigationItemsToRoutes = exports.findNavigationItem = exports.getNavigationItemsTree = exports.flatNavigationData = void 0;
exports.isExternalLink = isExternalLink;
exports.markExternalLinks = markExternalLinks;
exports.handleHrefClickEventWithRouter = handleHrefClickEventWithRouter;
exports.getActivatedRouteSnapshotFromRouter = getActivatedRouteSnapshotFromRouter;
const core_1 = require("@angular/core");
const index_1 = require("../providers/index");
const flatNavigationData = (tree) => {
    const result = [];
    const traverse = (node, level) => {
        node.level = level;
        if (node.path) {
            result.push(node);
        }
        if (node.children) {
            for (const child of node.children) {
                child.parent = node;
                traverse(child, level + 1);
            }
        }
    };
    for (const node of tree) {
        traverse(node, 1);
    }
    return result;
};
exports.flatNavigationData = flatNavigationData;
const getNavigationItemsTree = (tree, mapFn) => {
    const traverse = (node) => {
        mapFn(node);
        if (node.children) {
            for (const child of node.children) {
                traverse(child);
            }
        }
    };
    for (const node of tree) {
        traverse(node);
    }
    return tree;
};
exports.getNavigationItemsTree = getNavigationItemsTree;
const findNavigationItem = (items, predicate) => {
    let result = null;
    const traverse = (node) => {
        if (predicate(node)) {
            result = node;
        }
        if (node.children && !result) {
            for (const child of node.children) {
                traverse(child);
            }
        }
    };
    for (const node of items) {
        traverse(node);
    }
    return result;
};
exports.findNavigationItem = findNavigationItem;
/**
 * For perf reasons, we only don't rely on creating a new Url object and comparing the origins
 */
function isExternalLink(link) {
    return link.startsWith('http://') || link.startsWith('https://');
}
function markExternalLinks(item) {
    if (item.path) {
        item.isExternal = isExternalLink(item.path);
    }
}
const mapNavigationItemsToRoutes = (navigationItems, additionalRouteProperties) => navigationItems
    .filter((route) => Boolean(route.path))
    .map((navigationItem) => {
    const route = Object.assign({ path: navigationItem.path }, additionalRouteProperties);
    route.data = Object.assign(Object.assign({}, navigationItem), route.data);
    route.resolve = Object.assign({ 'docContent': (snapshot) => {
            return snapshot.data['contentPath'] !== undefined
                ? (0, core_1.inject)(index_1.DOCS_CONTENT_LOADER).getContent(snapshot.data['contentPath'])
                : undefined;
        } }, route.resolve);
    return route;
});
exports.mapNavigationItemsToRoutes = mapNavigationItemsToRoutes;
const normalizePath = (path) => {
    if (path[0] === '/') {
        return path.substring(1);
    }
    return path;
};
exports.normalizePath = normalizePath;
const getBaseUrlAfterRedirects = (url, router) => {
    const route = router.parseUrl(url);
    route.fragment = null;
    route.queryParams = {};
    return (0, exports.normalizePath)(route.toString());
};
exports.getBaseUrlAfterRedirects = getBaseUrlAfterRedirects;
function handleHrefClickEventWithRouter(e, router, relativeUrl) {
    const pointerEvent = e;
    if (pointerEvent.ctrlKey ||
        pointerEvent.shiftKey ||
        pointerEvent.altKey ||
        pointerEvent.metaKey) {
        return;
    }
    e.preventDefault();
    router.navigateByUrl(relativeUrl);
}
function getActivatedRouteSnapshotFromRouter(router) {
    let route = router.routerState.root.snapshot;
    while (route.firstChild) {
        route = route.firstChild;
    }
    return route;
}
