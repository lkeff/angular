"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReuseTutorialsRouteStrategy = exports.IS_TUTORIAL_PAGE_RULE = void 0;
const router_1 = require("@angular/router");
// Match tutorial pages, apart of /tutorials.
exports.IS_TUTORIAL_PAGE_RULE = /(^tutorials)\/(\S*)/s;
class ReuseTutorialsRouteStrategy extends router_1.BaseRouteReuseStrategy {
    // reuse route when not navigating to a new one or when navigating between tutorial pages
    shouldReuseRoute(future, curr) {
        return (future.routeConfig === curr.routeConfig ||
            (this.isTutorialPage(this.getPathFromActivatedRouteSnapshot(future)) &&
                this.isTutorialPage(this.getPathFromActivatedRouteSnapshot(curr))));
    }
    isTutorialPage(path) {
        if (!path) {
            return false;
        }
        return exports.IS_TUTORIAL_PAGE_RULE.test(path);
    }
    getPathFromActivatedRouteSnapshot(snapshot) {
        var _a;
        let route = snapshot;
        while (route.firstChild) {
            route = route.firstChild;
        }
        return (_a = route.routeConfig) === null || _a === void 0 ? void 0 : _a.path;
    }
}
exports.ReuseTutorialsRouteStrategy = ReuseTutorialsRouteStrategy;
