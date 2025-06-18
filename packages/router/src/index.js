"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChildrenOutletContexts = exports.RouterModule = exports.ROUTER_INITIALIZER = exports.ROUTES = exports.ROUTER_CONFIGURATION = exports.Router = exports.RouteReuseStrategy = exports.BaseRouteReuseStrategy = exports.withRouterConfig = exports.withPreloading = exports.withNavigationErrorHandler = exports.withInMemoryScrolling = exports.withHashLocation = exports.withEnabledBlockingInitialNavigation = exports.withDisabledInitialNavigation = exports.withDebugTracing = exports.withComponentInputBinding = exports.provideRoutes = exports.provideRouter = exports.withViewTransitions = exports.TitleStrategy = exports.DefaultTitleStrategy = exports.RedirectCommand = exports.Scroll = exports.RoutesRecognized = exports.RouterEvent = exports.RouteConfigLoadStart = exports.RouteConfigLoadEnd = exports.ResolveStart = exports.ResolveEnd = exports.NavigationStart = exports.NavigationSkippedCode = exports.NavigationSkipped = exports.NavigationError = exports.NavigationEnd = exports.NavigationCancellationCode = exports.NavigationCancel = exports.GuardsCheckStart = exports.GuardsCheckEnd = exports.EventType = exports.ChildActivationStart = exports.ChildActivationEnd = exports.ActivationStart = exports.ActivationEnd = exports.ROUTER_OUTLET_DATA = exports.RouterOutlet = exports.RouterLinkActive = exports.RouterLinkWithHref = exports.RouterLink = exports.createUrlTreeFromSnapshot = void 0;
exports.VERSION = exports.mapToResolve = exports.mapToCanMatch = exports.mapToCanDeactivate = exports.mapToCanActivateChild = exports.mapToCanActivate = exports.UrlTree = exports.UrlSerializer = exports.UrlSegmentGroup = exports.UrlSegment = exports.DefaultUrlSerializer = exports.UrlHandlingStrategy = exports.PRIMARY_OUTLET = exports.defaultUrlMatcher = exports.convertToParamMap = exports.RouterStateSnapshot = exports.RouterState = exports.ActivatedRouteSnapshot = exports.ActivatedRoute = exports.RouterPreloader = exports.PreloadingStrategy = exports.PreloadAllModules = exports.NoPreloading = exports.OutletContext = void 0;
var create_url_tree_1 = require("./create_url_tree");
Object.defineProperty(exports, "createUrlTreeFromSnapshot", { enumerable: true, get: function () { return create_url_tree_1.createUrlTreeFromSnapshot; } });
var router_link_1 = require("./directives/router_link");
Object.defineProperty(exports, "RouterLink", { enumerable: true, get: function () { return router_link_1.RouterLink; } });
Object.defineProperty(exports, "RouterLinkWithHref", { enumerable: true, get: function () { return router_link_1.RouterLinkWithHref; } });
var router_link_active_1 = require("./directives/router_link_active");
Object.defineProperty(exports, "RouterLinkActive", { enumerable: true, get: function () { return router_link_active_1.RouterLinkActive; } });
var router_outlet_1 = require("./directives/router_outlet");
Object.defineProperty(exports, "RouterOutlet", { enumerable: true, get: function () { return router_outlet_1.RouterOutlet; } });
Object.defineProperty(exports, "ROUTER_OUTLET_DATA", { enumerable: true, get: function () { return router_outlet_1.ROUTER_OUTLET_DATA; } });
var events_1 = require("./events");
Object.defineProperty(exports, "ActivationEnd", { enumerable: true, get: function () { return events_1.ActivationEnd; } });
Object.defineProperty(exports, "ActivationStart", { enumerable: true, get: function () { return events_1.ActivationStart; } });
Object.defineProperty(exports, "ChildActivationEnd", { enumerable: true, get: function () { return events_1.ChildActivationEnd; } });
Object.defineProperty(exports, "ChildActivationStart", { enumerable: true, get: function () { return events_1.ChildActivationStart; } });
Object.defineProperty(exports, "EventType", { enumerable: true, get: function () { return events_1.EventType; } });
Object.defineProperty(exports, "GuardsCheckEnd", { enumerable: true, get: function () { return events_1.GuardsCheckEnd; } });
Object.defineProperty(exports, "GuardsCheckStart", { enumerable: true, get: function () { return events_1.GuardsCheckStart; } });
Object.defineProperty(exports, "NavigationCancel", { enumerable: true, get: function () { return events_1.NavigationCancel; } });
Object.defineProperty(exports, "NavigationCancellationCode", { enumerable: true, get: function () { return events_1.NavigationCancellationCode; } });
Object.defineProperty(exports, "NavigationEnd", { enumerable: true, get: function () { return events_1.NavigationEnd; } });
Object.defineProperty(exports, "NavigationError", { enumerable: true, get: function () { return events_1.NavigationError; } });
Object.defineProperty(exports, "NavigationSkipped", { enumerable: true, get: function () { return events_1.NavigationSkipped; } });
Object.defineProperty(exports, "NavigationSkippedCode", { enumerable: true, get: function () { return events_1.NavigationSkippedCode; } });
Object.defineProperty(exports, "NavigationStart", { enumerable: true, get: function () { return events_1.NavigationStart; } });
Object.defineProperty(exports, "ResolveEnd", { enumerable: true, get: function () { return events_1.ResolveEnd; } });
Object.defineProperty(exports, "ResolveStart", { enumerable: true, get: function () { return events_1.ResolveStart; } });
Object.defineProperty(exports, "RouteConfigLoadEnd", { enumerable: true, get: function () { return events_1.RouteConfigLoadEnd; } });
Object.defineProperty(exports, "RouteConfigLoadStart", { enumerable: true, get: function () { return events_1.RouteConfigLoadStart; } });
Object.defineProperty(exports, "RouterEvent", { enumerable: true, get: function () { return events_1.RouterEvent; } });
Object.defineProperty(exports, "RoutesRecognized", { enumerable: true, get: function () { return events_1.RoutesRecognized; } });
Object.defineProperty(exports, "Scroll", { enumerable: true, get: function () { return events_1.Scroll; } });
var models_1 = require("./models");
Object.defineProperty(exports, "RedirectCommand", { enumerable: true, get: function () { return models_1.RedirectCommand; } });
__exportStar(require("./models_deprecated"), exports);
var page_title_strategy_1 = require("./page_title_strategy");
Object.defineProperty(exports, "DefaultTitleStrategy", { enumerable: true, get: function () { return page_title_strategy_1.DefaultTitleStrategy; } });
Object.defineProperty(exports, "TitleStrategy", { enumerable: true, get: function () { return page_title_strategy_1.TitleStrategy; } });
var provide_router_1 = require("./provide_router");
Object.defineProperty(exports, "withViewTransitions", { enumerable: true, get: function () { return provide_router_1.withViewTransitions; } });
Object.defineProperty(exports, "provideRouter", { enumerable: true, get: function () { return provide_router_1.provideRouter; } });
Object.defineProperty(exports, "provideRoutes", { enumerable: true, get: function () { return provide_router_1.provideRoutes; } });
Object.defineProperty(exports, "withComponentInputBinding", { enumerable: true, get: function () { return provide_router_1.withComponentInputBinding; } });
Object.defineProperty(exports, "withDebugTracing", { enumerable: true, get: function () { return provide_router_1.withDebugTracing; } });
Object.defineProperty(exports, "withDisabledInitialNavigation", { enumerable: true, get: function () { return provide_router_1.withDisabledInitialNavigation; } });
Object.defineProperty(exports, "withEnabledBlockingInitialNavigation", { enumerable: true, get: function () { return provide_router_1.withEnabledBlockingInitialNavigation; } });
Object.defineProperty(exports, "withHashLocation", { enumerable: true, get: function () { return provide_router_1.withHashLocation; } });
Object.defineProperty(exports, "withInMemoryScrolling", { enumerable: true, get: function () { return provide_router_1.withInMemoryScrolling; } });
Object.defineProperty(exports, "withNavigationErrorHandler", { enumerable: true, get: function () { return provide_router_1.withNavigationErrorHandler; } });
Object.defineProperty(exports, "withPreloading", { enumerable: true, get: function () { return provide_router_1.withPreloading; } });
Object.defineProperty(exports, "withRouterConfig", { enumerable: true, get: function () { return provide_router_1.withRouterConfig; } });
var route_reuse_strategy_1 = require("./route_reuse_strategy");
Object.defineProperty(exports, "BaseRouteReuseStrategy", { enumerable: true, get: function () { return route_reuse_strategy_1.BaseRouteReuseStrategy; } });
Object.defineProperty(exports, "RouteReuseStrategy", { enumerable: true, get: function () { return route_reuse_strategy_1.RouteReuseStrategy; } });
var router_1 = require("./router");
Object.defineProperty(exports, "Router", { enumerable: true, get: function () { return router_1.Router; } });
var router_config_1 = require("./router_config");
Object.defineProperty(exports, "ROUTER_CONFIGURATION", { enumerable: true, get: function () { return router_config_1.ROUTER_CONFIGURATION; } });
var router_config_loader_1 = require("./router_config_loader");
Object.defineProperty(exports, "ROUTES", { enumerable: true, get: function () { return router_config_loader_1.ROUTES; } });
var router_module_1 = require("./router_module");
Object.defineProperty(exports, "ROUTER_INITIALIZER", { enumerable: true, get: function () { return router_module_1.ROUTER_INITIALIZER; } });
Object.defineProperty(exports, "RouterModule", { enumerable: true, get: function () { return router_module_1.RouterModule; } });
var router_outlet_context_1 = require("./router_outlet_context");
Object.defineProperty(exports, "ChildrenOutletContexts", { enumerable: true, get: function () { return router_outlet_context_1.ChildrenOutletContexts; } });
Object.defineProperty(exports, "OutletContext", { enumerable: true, get: function () { return router_outlet_context_1.OutletContext; } });
var router_preloader_1 = require("./router_preloader");
Object.defineProperty(exports, "NoPreloading", { enumerable: true, get: function () { return router_preloader_1.NoPreloading; } });
Object.defineProperty(exports, "PreloadAllModules", { enumerable: true, get: function () { return router_preloader_1.PreloadAllModules; } });
Object.defineProperty(exports, "PreloadingStrategy", { enumerable: true, get: function () { return router_preloader_1.PreloadingStrategy; } });
Object.defineProperty(exports, "RouterPreloader", { enumerable: true, get: function () { return router_preloader_1.RouterPreloader; } });
var router_state_1 = require("./router_state");
Object.defineProperty(exports, "ActivatedRoute", { enumerable: true, get: function () { return router_state_1.ActivatedRoute; } });
Object.defineProperty(exports, "ActivatedRouteSnapshot", { enumerable: true, get: function () { return router_state_1.ActivatedRouteSnapshot; } });
Object.defineProperty(exports, "RouterState", { enumerable: true, get: function () { return router_state_1.RouterState; } });
Object.defineProperty(exports, "RouterStateSnapshot", { enumerable: true, get: function () { return router_state_1.RouterStateSnapshot; } });
var shared_1 = require("./shared");
Object.defineProperty(exports, "convertToParamMap", { enumerable: true, get: function () { return shared_1.convertToParamMap; } });
Object.defineProperty(exports, "defaultUrlMatcher", { enumerable: true, get: function () { return shared_1.defaultUrlMatcher; } });
Object.defineProperty(exports, "PRIMARY_OUTLET", { enumerable: true, get: function () { return shared_1.PRIMARY_OUTLET; } });
var url_handling_strategy_1 = require("./url_handling_strategy");
Object.defineProperty(exports, "UrlHandlingStrategy", { enumerable: true, get: function () { return url_handling_strategy_1.UrlHandlingStrategy; } });
var url_tree_1 = require("./url_tree");
Object.defineProperty(exports, "DefaultUrlSerializer", { enumerable: true, get: function () { return url_tree_1.DefaultUrlSerializer; } });
Object.defineProperty(exports, "UrlSegment", { enumerable: true, get: function () { return url_tree_1.UrlSegment; } });
Object.defineProperty(exports, "UrlSegmentGroup", { enumerable: true, get: function () { return url_tree_1.UrlSegmentGroup; } });
Object.defineProperty(exports, "UrlSerializer", { enumerable: true, get: function () { return url_tree_1.UrlSerializer; } });
Object.defineProperty(exports, "UrlTree", { enumerable: true, get: function () { return url_tree_1.UrlTree; } });
var functional_guards_1 = require("./utils/functional_guards");
Object.defineProperty(exports, "mapToCanActivate", { enumerable: true, get: function () { return functional_guards_1.mapToCanActivate; } });
Object.defineProperty(exports, "mapToCanActivateChild", { enumerable: true, get: function () { return functional_guards_1.mapToCanActivateChild; } });
Object.defineProperty(exports, "mapToCanDeactivate", { enumerable: true, get: function () { return functional_guards_1.mapToCanDeactivate; } });
Object.defineProperty(exports, "mapToCanMatch", { enumerable: true, get: function () { return functional_guards_1.mapToCanMatch; } });
Object.defineProperty(exports, "mapToResolve", { enumerable: true, get: function () { return functional_guards_1.mapToResolve; } });
var version_1 = require("./version");
Object.defineProperty(exports, "VERSION", { enumerable: true, get: function () { return version_1.VERSION; } });
__exportStar(require("./private_export"), exports);
require("./router_devtools");
