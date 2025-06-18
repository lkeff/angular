"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRoutes = parseRoutes;
function parseRoutes(router) {
    var _a, _b, _c, _d;
    const currentUrl = (_c = (_b = (_a = router.stateManager) === null || _a === void 0 ? void 0 : _a.routerState) === null || _b === void 0 ? void 0 : _b.snapshot) === null || _c === void 0 ? void 0 : _c.url;
    const rootName = ((_d = router.rootComponentType) === null || _d === void 0 ? void 0 : _d.name) || 'no-name';
    const rootChildren = router.config;
    const root = {
        component: rootName,
        path: '/',
        children: rootChildren ? assignChildrenToParent(null, rootChildren, currentUrl) : [],
        isAux: false,
        isLazy: false,
        isActive: currentUrl === '/',
    };
    return root;
}
function getGuardNames(child) {
    const guards = (child === null || child === void 0 ? void 0 : child.canActivate) || [];
    const names = guards.map((g) => g.name);
    return names || null;
}
function getProviderName(child) {
    const providers = (child === null || child === void 0 ? void 0 : child.providers) || [];
    const names = providers.map((p) => p.name);
    return names || null;
}
function assignChildrenToParent(parentPath, children, currentUrl) {
    return children.map((child) => {
        var _a, _b, _c;
        const childName = childRouteName(child);
        const loadedRoutes = (_b = (_a = window.ng) === null || _a === void 0 ? void 0 : _a.ɵgetLoadedRoutes) === null || _b === void 0 ? void 0 : _b.call(_a, child);
        const childDescendents = loadedRoutes || child.children;
        const pathFragment = child.outlet ? `(${child.outlet}:${child.path})` : child.path;
        const routePath = `${parentPath !== null && parentPath !== void 0 ? parentPath : ''}/${pathFragment}`.split('//').join('/');
        // only found in aux routes, otherwise property will be undefined
        const isAux = Boolean(child.outlet);
        const isLazy = Boolean(child.loadChildren || child.loadComponent);
        const isActive = routePath === currentUrl;
        const routeConfig = {
            title: child.title,
            pathMatch: child.pathMatch,
            component: childName,
            canActivateGuards: getGuardNames(child),
            providers: getProviderName(child),
            path: routePath,
            isAux,
            isLazy,
            isActive,
        };
        if (childDescendents) {
            routeConfig.children = assignChildrenToParent(routeConfig.path, childDescendents, currentUrl);
        }
        if (child.data) {
            for (const el in child.data) {
                if (child.data.hasOwnProperty(el)) {
                    (_c = routeConfig === null || routeConfig === void 0 ? void 0 : routeConfig.data) === null || _c === void 0 ? void 0 : _c.push({
                        key: el,
                        value: child.data[el],
                    });
                }
            }
        }
        return routeConfig;
    });
}
function childRouteName(child) {
    if (child.component) {
        return child.component.name;
    }
    else if (child.loadChildren || child.loadComponent) {
        return `${child.path} [Lazy]`;
    }
    else if (child.redirectTo) {
        return `${child.path} -> redirecting to -> "${child.redirectTo}"`;
    }
    else {
        return 'no-name-route';
    }
}
