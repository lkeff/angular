"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedirectRequest = exports.BeforeActivateRoutes = exports.Scroll = exports.ActivationEnd = exports.ActivationStart = exports.ChildActivationEnd = exports.ChildActivationStart = exports.RouteConfigLoadEnd = exports.RouteConfigLoadStart = exports.ResolveEnd = exports.ResolveStart = exports.GuardsCheckEnd = exports.GuardsCheckStart = exports.RoutesRecognized = exports.NavigationError = exports.NavigationSkipped = exports.NavigationCancel = exports.NavigationSkippedCode = exports.NavigationCancellationCode = exports.NavigationEnd = exports.NavigationStart = exports.RouterEvent = exports.EventType = exports.IMPERATIVE_NAVIGATION = void 0;
exports.isPublicRouterEvent = isPublicRouterEvent;
exports.stringifyEvent = stringifyEvent;
exports.IMPERATIVE_NAVIGATION = 'imperative';
/**
 * Identifies the type of a router event.
 *
 * @publicApi
 */
var EventType;
(function (EventType) {
    EventType[EventType["NavigationStart"] = 0] = "NavigationStart";
    EventType[EventType["NavigationEnd"] = 1] = "NavigationEnd";
    EventType[EventType["NavigationCancel"] = 2] = "NavigationCancel";
    EventType[EventType["NavigationError"] = 3] = "NavigationError";
    EventType[EventType["RoutesRecognized"] = 4] = "RoutesRecognized";
    EventType[EventType["ResolveStart"] = 5] = "ResolveStart";
    EventType[EventType["ResolveEnd"] = 6] = "ResolveEnd";
    EventType[EventType["GuardsCheckStart"] = 7] = "GuardsCheckStart";
    EventType[EventType["GuardsCheckEnd"] = 8] = "GuardsCheckEnd";
    EventType[EventType["RouteConfigLoadStart"] = 9] = "RouteConfigLoadStart";
    EventType[EventType["RouteConfigLoadEnd"] = 10] = "RouteConfigLoadEnd";
    EventType[EventType["ChildActivationStart"] = 11] = "ChildActivationStart";
    EventType[EventType["ChildActivationEnd"] = 12] = "ChildActivationEnd";
    EventType[EventType["ActivationStart"] = 13] = "ActivationStart";
    EventType[EventType["ActivationEnd"] = 14] = "ActivationEnd";
    EventType[EventType["Scroll"] = 15] = "Scroll";
    EventType[EventType["NavigationSkipped"] = 16] = "NavigationSkipped";
})(EventType || (exports.EventType = EventType = {}));
/**
 * Base for events the router goes through, as opposed to events tied to a specific
 * route. Fired one time for any given navigation.
 *
 * The following code shows how a class subscribes to router events.
 *
 * ```ts
 * import {Event, RouterEvent, Router} from '@angular/router';
 *
 * class MyService {
 *   constructor(public router: Router) {
 *     router.events.pipe(
 *        filter((e: Event | RouterEvent): e is RouterEvent => e instanceof RouterEvent)
 *     ).subscribe((e: RouterEvent) => {
 *       // Do something
 *     });
 *   }
 * }
 * ```
 *
 * @see {@link Event}
 * @see [Router events summary](guide/routing/router-reference#router-events)
 * @publicApi
 */
class RouterEvent {
    constructor(
    /** A unique ID that the router assigns to every router navigation. */
    id, 
    /** The URL that is the destination for this navigation. */
    url) {
        this.id = id;
        this.url = url;
    }
}
exports.RouterEvent = RouterEvent;
/**
 * An event triggered when a navigation starts.
 *
 * @publicApi
 */
class NavigationStart extends RouterEvent {
    constructor(
    /** @docsNotRequired */
    id, 
    /** @docsNotRequired */
    url, 
    /** @docsNotRequired */
    navigationTrigger = 'imperative', 
    /** @docsNotRequired */
    restoredState = null) {
        super(id, url);
        this.type = EventType.NavigationStart;
        this.navigationTrigger = navigationTrigger;
        this.restoredState = restoredState;
    }
    /** @docsNotRequired */
    toString() {
        return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
    }
}
exports.NavigationStart = NavigationStart;
/**
 * An event triggered when a navigation ends successfully.
 *
 * @see {@link NavigationStart}
 * @see {@link NavigationCancel}
 * @see {@link NavigationError}
 *
 * @publicApi
 */
class NavigationEnd extends RouterEvent {
    constructor(
    /** @docsNotRequired */
    id, 
    /** @docsNotRequired */
    url, 
    /** @docsNotRequired */
    urlAfterRedirects) {
        super(id, url);
        this.urlAfterRedirects = urlAfterRedirects;
        this.type = EventType.NavigationEnd;
    }
    /** @docsNotRequired */
    toString() {
        return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
    }
}
exports.NavigationEnd = NavigationEnd;
/**
 * A code for the `NavigationCancel` event of the `Router` to indicate the
 * reason a navigation failed.
 *
 * @publicApi
 */
var NavigationCancellationCode;
(function (NavigationCancellationCode) {
    /**
     * A navigation failed because a guard returned a `UrlTree` to redirect.
     */
    NavigationCancellationCode[NavigationCancellationCode["Redirect"] = 0] = "Redirect";
    /**
     * A navigation failed because a more recent navigation started.
     */
    NavigationCancellationCode[NavigationCancellationCode["SupersededByNewNavigation"] = 1] = "SupersededByNewNavigation";
    /**
     * A navigation failed because one of the resolvers completed without emitting a value.
     */
    NavigationCancellationCode[NavigationCancellationCode["NoDataFromResolver"] = 2] = "NoDataFromResolver";
    /**
     * A navigation failed because a guard returned `false`.
     */
    NavigationCancellationCode[NavigationCancellationCode["GuardRejected"] = 3] = "GuardRejected";
    /**
     * A navigation was aborted by the `Navigation.abort` function.
     *
     * @see {@link Navigation}
     */
    NavigationCancellationCode[NavigationCancellationCode["Aborted"] = 4] = "Aborted";
})(NavigationCancellationCode || (exports.NavigationCancellationCode = NavigationCancellationCode = {}));
/**
 * A code for the `NavigationSkipped` event of the `Router` to indicate the
 * reason a navigation was skipped.
 *
 * @publicApi
 */
var NavigationSkippedCode;
(function (NavigationSkippedCode) {
    /**
     * A navigation was skipped because the navigation URL was the same as the current Router URL.
     */
    NavigationSkippedCode[NavigationSkippedCode["IgnoredSameUrlNavigation"] = 0] = "IgnoredSameUrlNavigation";
    /**
     * A navigation was skipped because the configured `UrlHandlingStrategy` return `false` for both
     * the current Router URL and the target of the navigation.
     *
     * @see {@link UrlHandlingStrategy}
     */
    NavigationSkippedCode[NavigationSkippedCode["IgnoredByUrlHandlingStrategy"] = 1] = "IgnoredByUrlHandlingStrategy";
})(NavigationSkippedCode || (exports.NavigationSkippedCode = NavigationSkippedCode = {}));
/**
 * An event triggered when a navigation is canceled, directly or indirectly.
 * This can happen for several reasons including when a route guard
 * returns `false` or initiates a redirect by returning a `UrlTree`.
 *
 * @see {@link NavigationStart}
 * @see {@link NavigationEnd}
 * @see {@link NavigationError}
 *
 * @publicApi
 */
class NavigationCancel extends RouterEvent {
    constructor(
    /** @docsNotRequired */
    id, 
    /** @docsNotRequired */
    url, 
    /**
     * A description of why the navigation was cancelled. For debug purposes only. Use `code`
     * instead for a stable cancellation reason that can be used in production.
     */
    reason, 
    /**
     * A code to indicate why the navigation was canceled. This cancellation code is stable for
     * the reason and can be relied on whereas the `reason` string could change and should not be
     * used in production.
     */
    code) {
        super(id, url);
        this.reason = reason;
        this.code = code;
        this.type = EventType.NavigationCancel;
    }
    /** @docsNotRequired */
    toString() {
        return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
    }
}
exports.NavigationCancel = NavigationCancel;
/**
 * An event triggered when a navigation is skipped.
 * This can happen for a couple reasons including onSameUrlHandling
 * is set to `ignore` and the navigation URL is not different than the
 * current state.
 *
 * @publicApi
 */
class NavigationSkipped extends RouterEvent {
    constructor(
    /** @docsNotRequired */
    id, 
    /** @docsNotRequired */
    url, 
    /**
     * A description of why the navigation was skipped. For debug purposes only. Use `code`
     * instead for a stable skipped reason that can be used in production.
     */
    reason, 
    /**
     * A code to indicate why the navigation was skipped. This code is stable for
     * the reason and can be relied on whereas the `reason` string could change and should not be
     * used in production.
     */
    code) {
        super(id, url);
        this.reason = reason;
        this.code = code;
        this.type = EventType.NavigationSkipped;
    }
}
exports.NavigationSkipped = NavigationSkipped;
/**
 * An event triggered when a navigation fails due to an unexpected error.
 *
 * @see {@link NavigationStart}
 * @see {@link NavigationEnd}
 * @see {@link NavigationCancel}
 *
 * @publicApi
 */
class NavigationError extends RouterEvent {
    constructor(
    /** @docsNotRequired */
    id, 
    /** @docsNotRequired */
    url, 
    /** @docsNotRequired */
    error, 
    /**
     * The target of the navigation when the error occurred.
     *
     * Note that this can be `undefined` because an error could have occurred before the
     * `RouterStateSnapshot` was created for the navigation.
     */
    target) {
        super(id, url);
        this.error = error;
        this.target = target;
        this.type = EventType.NavigationError;
    }
    /** @docsNotRequired */
    toString() {
        return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
    }
}
exports.NavigationError = NavigationError;
/**
 * An event triggered when routes are recognized.
 *
 * @publicApi
 */
class RoutesRecognized extends RouterEvent {
    constructor(
    /** @docsNotRequired */
    id, 
    /** @docsNotRequired */
    url, 
    /** @docsNotRequired */
    urlAfterRedirects, 
    /** @docsNotRequired */
    state) {
        super(id, url);
        this.urlAfterRedirects = urlAfterRedirects;
        this.state = state;
        this.type = EventType.RoutesRecognized;
    }
    /** @docsNotRequired */
    toString() {
        return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
}
exports.RoutesRecognized = RoutesRecognized;
/**
 * An event triggered at the start of the Guard phase of routing.
 *
 * @see {@link GuardsCheckEnd}
 *
 * @publicApi
 */
class GuardsCheckStart extends RouterEvent {
    constructor(
    /** @docsNotRequired */
    id, 
    /** @docsNotRequired */
    url, 
    /** @docsNotRequired */
    urlAfterRedirects, 
    /** @docsNotRequired */
    state) {
        super(id, url);
        this.urlAfterRedirects = urlAfterRedirects;
        this.state = state;
        this.type = EventType.GuardsCheckStart;
    }
    toString() {
        return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
}
exports.GuardsCheckStart = GuardsCheckStart;
/**
 * An event triggered at the end of the Guard phase of routing.
 *
 * @see {@link GuardsCheckStart}
 *
 * @publicApi
 */
class GuardsCheckEnd extends RouterEvent {
    constructor(
    /** @docsNotRequired */
    id, 
    /** @docsNotRequired */
    url, 
    /** @docsNotRequired */
    urlAfterRedirects, 
    /** @docsNotRequired */
    state, 
    /** @docsNotRequired */
    shouldActivate) {
        super(id, url);
        this.urlAfterRedirects = urlAfterRedirects;
        this.state = state;
        this.shouldActivate = shouldActivate;
        this.type = EventType.GuardsCheckEnd;
    }
    toString() {
        return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
    }
}
exports.GuardsCheckEnd = GuardsCheckEnd;
/**
 * An event triggered at the start of the Resolve phase of routing.
 *
 * Runs in the "resolve" phase whether or not there is anything to resolve.
 * In future, may change to only run when there are things to be resolved.
 *
 * @see {@link ResolveEnd}
 *
 * @publicApi
 */
class ResolveStart extends RouterEvent {
    constructor(
    /** @docsNotRequired */
    id, 
    /** @docsNotRequired */
    url, 
    /** @docsNotRequired */
    urlAfterRedirects, 
    /** @docsNotRequired */
    state) {
        super(id, url);
        this.urlAfterRedirects = urlAfterRedirects;
        this.state = state;
        this.type = EventType.ResolveStart;
    }
    toString() {
        return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
}
exports.ResolveStart = ResolveStart;
/**
 * An event triggered at the end of the Resolve phase of routing.
 * @see {@link ResolveStart}
 *
 * @publicApi
 */
class ResolveEnd extends RouterEvent {
    constructor(
    /** @docsNotRequired */
    id, 
    /** @docsNotRequired */
    url, 
    /** @docsNotRequired */
    urlAfterRedirects, 
    /** @docsNotRequired */
    state) {
        super(id, url);
        this.urlAfterRedirects = urlAfterRedirects;
        this.state = state;
        this.type = EventType.ResolveEnd;
    }
    toString() {
        return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
}
exports.ResolveEnd = ResolveEnd;
/**
 * An event triggered before lazy loading a route configuration.
 *
 * @see {@link RouteConfigLoadEnd}
 *
 * @publicApi
 */
class RouteConfigLoadStart {
    constructor(
    /** @docsNotRequired */
    route) {
        this.route = route;
        this.type = EventType.RouteConfigLoadStart;
    }
    toString() {
        return `RouteConfigLoadStart(path: ${this.route.path})`;
    }
}
exports.RouteConfigLoadStart = RouteConfigLoadStart;
/**
 * An event triggered when a route has been lazy loaded.
 *
 * @see {@link RouteConfigLoadStart}
 *
 * @publicApi
 */
class RouteConfigLoadEnd {
    constructor(
    /** @docsNotRequired */
    route) {
        this.route = route;
        this.type = EventType.RouteConfigLoadEnd;
    }
    toString() {
        return `RouteConfigLoadEnd(path: ${this.route.path})`;
    }
}
exports.RouteConfigLoadEnd = RouteConfigLoadEnd;
/**
 * An event triggered at the start of the child-activation
 * part of the Resolve phase of routing.
 * @see {@link ChildActivationEnd}
 * @see {@link ResolveStart}
 *
 * @publicApi
 */
class ChildActivationStart {
    constructor(
    /** @docsNotRequired */
    snapshot) {
        this.snapshot = snapshot;
        this.type = EventType.ChildActivationStart;
    }
    toString() {
        const path = (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || '';
        return `ChildActivationStart(path: '${path}')`;
    }
}
exports.ChildActivationStart = ChildActivationStart;
/**
 * An event triggered at the end of the child-activation part
 * of the Resolve phase of routing.
 * @see {@link ChildActivationStart}
 * @see {@link ResolveStart}
 * @publicApi
 */
class ChildActivationEnd {
    constructor(
    /** @docsNotRequired */
    snapshot) {
        this.snapshot = snapshot;
        this.type = EventType.ChildActivationEnd;
    }
    toString() {
        const path = (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || '';
        return `ChildActivationEnd(path: '${path}')`;
    }
}
exports.ChildActivationEnd = ChildActivationEnd;
/**
 * An event triggered at the start of the activation part
 * of the Resolve phase of routing.
 * @see {@link ActivationEnd}
 * @see {@link ResolveStart}
 *
 * @publicApi
 */
class ActivationStart {
    constructor(
    /** @docsNotRequired */
    snapshot) {
        this.snapshot = snapshot;
        this.type = EventType.ActivationStart;
    }
    toString() {
        const path = (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || '';
        return `ActivationStart(path: '${path}')`;
    }
}
exports.ActivationStart = ActivationStart;
/**
 * An event triggered at the end of the activation part
 * of the Resolve phase of routing.
 * @see {@link ActivationStart}
 * @see {@link ResolveStart}
 *
 * @publicApi
 */
class ActivationEnd {
    constructor(
    /** @docsNotRequired */
    snapshot) {
        this.snapshot = snapshot;
        this.type = EventType.ActivationEnd;
    }
    toString() {
        const path = (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || '';
        return `ActivationEnd(path: '${path}')`;
    }
}
exports.ActivationEnd = ActivationEnd;
/**
 * An event triggered by scrolling.
 *
 * @publicApi
 */
class Scroll {
    constructor(
    /** @docsNotRequired */
    routerEvent, 
    /** @docsNotRequired */
    position, 
    /** @docsNotRequired */
    anchor) {
        this.routerEvent = routerEvent;
        this.position = position;
        this.anchor = anchor;
        this.type = EventType.Scroll;
    }
    toString() {
        const pos = this.position ? `${this.position[0]}, ${this.position[1]}` : null;
        return `Scroll(anchor: '${this.anchor}', position: '${pos}')`;
    }
}
exports.Scroll = Scroll;
class BeforeActivateRoutes {
}
exports.BeforeActivateRoutes = BeforeActivateRoutes;
class RedirectRequest {
    constructor(url, navigationBehaviorOptions) {
        this.url = url;
        this.navigationBehaviorOptions = navigationBehaviorOptions;
    }
}
exports.RedirectRequest = RedirectRequest;
function isPublicRouterEvent(e) {
    return !(e instanceof BeforeActivateRoutes) && !(e instanceof RedirectRequest);
}
function stringifyEvent(routerEvent) {
    var _a, _b, _c, _d;
    switch (routerEvent.type) {
        case EventType.ActivationEnd:
            return `ActivationEnd(path: '${((_a = routerEvent.snapshot.routeConfig) === null || _a === void 0 ? void 0 : _a.path) || ''}')`;
        case EventType.ActivationStart:
            return `ActivationStart(path: '${((_b = routerEvent.snapshot.routeConfig) === null || _b === void 0 ? void 0 : _b.path) || ''}')`;
        case EventType.ChildActivationEnd:
            return `ChildActivationEnd(path: '${((_c = routerEvent.snapshot.routeConfig) === null || _c === void 0 ? void 0 : _c.path) || ''}')`;
        case EventType.ChildActivationStart:
            return `ChildActivationStart(path: '${((_d = routerEvent.snapshot.routeConfig) === null || _d === void 0 ? void 0 : _d.path) || ''}')`;
        case EventType.GuardsCheckEnd:
            return `GuardsCheckEnd(id: ${routerEvent.id}, url: '${routerEvent.url}', urlAfterRedirects: '${routerEvent.urlAfterRedirects}', state: ${routerEvent.state}, shouldActivate: ${routerEvent.shouldActivate})`;
        case EventType.GuardsCheckStart:
            return `GuardsCheckStart(id: ${routerEvent.id}, url: '${routerEvent.url}', urlAfterRedirects: '${routerEvent.urlAfterRedirects}', state: ${routerEvent.state})`;
        case EventType.NavigationCancel:
            return `NavigationCancel(id: ${routerEvent.id}, url: '${routerEvent.url}')`;
        case EventType.NavigationSkipped:
            return `NavigationSkipped(id: ${routerEvent.id}, url: '${routerEvent.url}')`;
        case EventType.NavigationEnd:
            return `NavigationEnd(id: ${routerEvent.id}, url: '${routerEvent.url}', urlAfterRedirects: '${routerEvent.urlAfterRedirects}')`;
        case EventType.NavigationError:
            return `NavigationError(id: ${routerEvent.id}, url: '${routerEvent.url}', error: ${routerEvent.error})`;
        case EventType.NavigationStart:
            return `NavigationStart(id: ${routerEvent.id}, url: '${routerEvent.url}')`;
        case EventType.ResolveEnd:
            return `ResolveEnd(id: ${routerEvent.id}, url: '${routerEvent.url}', urlAfterRedirects: '${routerEvent.urlAfterRedirects}', state: ${routerEvent.state})`;
        case EventType.ResolveStart:
            return `ResolveStart(id: ${routerEvent.id}, url: '${routerEvent.url}', urlAfterRedirects: '${routerEvent.urlAfterRedirects}', state: ${routerEvent.state})`;
        case EventType.RouteConfigLoadEnd:
            return `RouteConfigLoadEnd(path: ${routerEvent.route.path})`;
        case EventType.RouteConfigLoadStart:
            return `RouteConfigLoadStart(path: ${routerEvent.route.path})`;
        case EventType.RoutesRecognized:
            return `RoutesRecognized(id: ${routerEvent.id}, url: '${routerEvent.url}', urlAfterRedirects: '${routerEvent.urlAfterRedirects}', state: ${routerEvent.state})`;
        case EventType.Scroll:
            const pos = routerEvent.position
                ? `${routerEvent.position[0]}, ${routerEvent.position[1]}`
                : null;
            return `Scroll(anchor: '${routerEvent.anchor}', position: '${pos}')`;
    }
}
