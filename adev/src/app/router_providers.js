"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerProviders = void 0;
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const routes_1 = require("./routes");
const a_dev_title_strategy_1 = require("./core/services/a-dev-title-strategy");
const tutorials_route_reuse_strategy_1 = require("./features/tutorial/tutorials-route-reuse-strategy");
const app_scroller_1 = require("./app-scroller");
const Subject_1 = require("rxjs/internal/Subject");
const http_1 = require("@angular/common/http");
const docs_1 = require("@angular/docs");
const rxjs_1 = require("rxjs");
const transitionCreated = new Subject_1.Subject();
exports.routerProviders = [
    (0, router_1.provideRouter)(routes_1.routes, (0, router_1.withInMemoryScrolling)(), (0, router_1.withRouterConfig)({ canceledNavigationResolution: 'computed' }), (0, router_1.withNavigationErrorHandler)(({ error }) => {
        if (error instanceof http_1.HttpErrorResponse) {
            // TODO: Redirect to different pages on different response codes? (e.g. 500 page)
            return new router_1.RedirectCommand((0, core_1.inject)(router_1.Router).parseUrl('/404'));
        }
        return void 0;
    }), (0, router_1.withViewTransitions)({
        onViewTransitionCreated: ({ transition, to }) => {
            transitionCreated.next();
            const router = (0, core_1.inject)(router_1.Router);
            const toTree = (0, router_1.createUrlTreeFromSnapshot)(to, []);
            // Skip the transition if the only thing changing is the fragment and queryParams
            if (router.isActive(toTree, {
                paths: 'exact',
                matrixParams: 'exact',
                fragment: 'ignored',
                queryParams: 'ignored',
            })) {
                transition.skipTransition();
            }
        },
    }), (0, router_1.withComponentInputBinding)()),
    {
        provide: router_1.RouteReuseStrategy,
        useClass: tutorials_route_reuse_strategy_1.ReuseTutorialsRouteStrategy,
    },
    { provide: router_1.TitleStrategy, useClass: a_dev_title_strategy_1.ADevTitleStrategy },
    (0, core_1.provideEnvironmentInitializer)(() => (0, core_1.inject)(app_scroller_1.AppScroller)),
    (0, core_1.provideEnvironmentInitializer)(() => initializeNavigationAdapter()),
];
/**
 * This function creates an adapter for the Router which creates a browser navigation
 * event for any Router navigations (indicated by NavigationStart). This navigation
 * is then cancelled right before the Router would commit the change to the browser
 * state through history.[push/replace]State (happens right after view transition is created)
 * or when the navigation ends without completing (NavigationCancel or NavigationError).
 *
 * In addition, it listens for the 'navigateerror' event, which would happen if the
 * user cancels the navigation using the stop button in the browser UI, pressing the escape key,
 * or initiates a document traversal (e.g. browser back/forward button). When this event
 * happens, it aborts any ongoing Router navigation.
 *
 * The benefit we get out of this is that the browser can better indicate a navigation is happening
 * when we use the Navigation API. A loading indicator appears on the tab (in desktop chrome) and the
 * refresh button changes to an "x" for stop. Site visitors can cancel the navigation using the stop
 * button or the escape key (again, on desktop).
 */
const initializeNavigationAdapter = () => {
    const router = (0, core_1.inject)(router_1.Router);
    const window = (0, core_1.inject)(docs_1.WINDOW);
    const navigation = window.navigation;
    if (!navigation || !(0, core_1.inject)(core_1.DOCUMENT).startViewTransition) {
        return;
    }
    let intercept = false;
    let clearNavigation;
    navigation.addEventListener('navigateerror', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (!clearNavigation) {
            return;
        }
        clearNavigation = undefined;
        (_a = router.getCurrentNavigation()) === null || _a === void 0 ? void 0 : _a.abort();
    }));
    navigation.addEventListener('navigate', (navigateEvent) => {
        if (!intercept) {
            return;
        }
        navigateEvent.intercept({
            handler: () => new Promise((_, reject) => {
                clearNavigation = () => {
                    clearNavigation = undefined;
                    reject();
                };
            }),
        });
    });
    (0, rxjs_1.merge)(transitionCreated.pipe((0, rxjs_1.map)(() => 'viewtransition')), router.events).subscribe((e) => {
        // Skip this for popstate/traversals that are already committed.
        // The rollback is problematic so we only do it for navigations that
        // defer the actual update (pushState) on the browser.
        const currentNavigation = router.getCurrentNavigation();
        if ((currentNavigation === null || currentNavigation === void 0 ? void 0 : currentNavigation.trigger) === 'popstate' || (currentNavigation === null || currentNavigation === void 0 ? void 0 : currentNavigation.extras.replaceUrl)) {
            return;
        }
        if (e instanceof router_1.NavigationStart) {
            intercept = true;
            window.history.replaceState(window.history.state, '', window.location.href);
            intercept = false;
        }
        else if (
        // viewtransition happens before NavigateEnd
        e === 'viewtransition' ||
            e instanceof router_1.NavigationCancel ||
            e instanceof router_1.NavigationError) {
            clearNavigation === null || clearNavigation === void 0 ? void 0 : clearNavigation();
        }
    });
};
