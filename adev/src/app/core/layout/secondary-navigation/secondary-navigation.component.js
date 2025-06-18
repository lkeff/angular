"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecondaryNavigation = exports.ANIMATION_DURATION = void 0;
const core_1 = require("@angular/core");
const rxjs_interop_1 = require("@angular/core/rxjs-interop");
const docs_1 = require("@angular/docs");
const operators_1 = require("rxjs/operators");
const sub_navigation_data_1 = require("../../../sub-navigation-data");
const pages_1 = require("../../enums/pages");
const router_1 = require("@angular/router");
const common_1 = require("@angular/common");
const element_ids_1 = require("../../constants/element-ids");
exports.ANIMATION_DURATION = 500;
let SecondaryNavigation = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'adev-secondary-navigation',
            imports: [docs_1.NavigationList, docs_1.ClickOutside],
            templateUrl: './secondary-navigation.component.html',
            styleUrls: ['./secondary-navigation.component.scss'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SecondaryNavigation = _classThis = class {
        constructor() {
            this.destroyRef = (0, core_1.inject)(core_1.DestroyRef);
            this.navigationState = (0, core_1.inject)(docs_1.NavigationState);
            this.platformId = (0, core_1.inject)(core_1.PLATFORM_ID);
            this.router = (0, core_1.inject)(router_1.Router);
            this.isSecondaryNavVisible = this.navigationState.isMobileNavVisible;
            this.primaryActiveRouteItem = this.navigationState.primaryActiveRouteItem;
            this.maxVisibleLevelsOnSecondaryNav = (0, core_1.computed)(() => this.primaryActiveRouteItem() === pages_1.PagePrefix.REFERENCE ? 1 : 2);
            this.navigationItemsSlides = this.navigationState.expandedItems;
            this.translateX = (0, core_1.computed)(() => {
                const level = this.navigationState.level();
                return `translateX(${-level * 100}%)`;
            });
            this.transition = (0, core_1.signal)('0ms');
            this.PRIMARY_NAV_ID = element_ids_1.PRIMARY_NAV_ID;
            this.SECONDARY_NAV_ID = element_ids_1.SECONDARY_NAV_ID;
            this.routeMap = {
                [pages_1.PagePrefix.REFERENCE]: (0, docs_1.getNavigationItemsTree)(sub_navigation_data_1.SUB_NAVIGATION_DATA.reference, (tree) => (0, docs_1.markExternalLinks)(tree)),
                [pages_1.PagePrefix.DOCS]: (0, docs_1.getNavigationItemsTree)(sub_navigation_data_1.SUB_NAVIGATION_DATA.docs, (tree) => (0, docs_1.markExternalLinks)(tree)),
            };
            this.primaryActiveRouteChanged$ = (0, rxjs_interop_1.toObservable)(this.primaryActiveRouteItem).pipe((0, operators_1.distinctUntilChanged)(), (0, rxjs_interop_1.takeUntilDestroyed)(this.destroyRef));
            this.urlAfterRedirects$ = this.router.events.pipe((0, operators_1.filter)((event) => event instanceof router_1.NavigationEnd), (0, operators_1.map)((event) => event.urlAfterRedirects), (0, operators_1.filter)((url) => url !== undefined), (0, operators_1.startWith)(this.getInitialPath(this.router.routerState.snapshot)), (0, rxjs_interop_1.takeUntilDestroyed)(this.destroyRef));
        }
        ngOnInit() {
            this.navigationState.cleanExpandedState();
            this.listenToPrimaryRouteChange();
            this.setActiveRouteOnNavigationEnd();
            if ((0, common_1.isPlatformBrowser)(this.platformId)) {
                this.initSlideAnimation();
            }
        }
        close() {
            this.navigationState.setMobileNavigationListVisibility(false);
        }
        setActiveRouteOnNavigationEnd() {
            this.urlAfterRedirects$.subscribe((url) => {
                const activeNavigationItem = this.getActiveNavigationItem(url);
                if ((activeNavigationItem === null || activeNavigationItem === void 0 ? void 0 : activeNavigationItem.level) &&
                    activeNavigationItem.level <= this.maxVisibleLevelsOnSecondaryNav()) {
                    this.navigationState.cleanExpandedState();
                }
                else if (activeNavigationItem) {
                    /**
                     * For the `Docs`, we don't expand the "level === 1" items because they are already displayed in the main navigation list.
                     * Example:
                     * In-depth Guides (level == 0)
                     * Components (level == 1) -> Selectors, Styling, etc (level == 2)
                     * Template Syntax (level == 1) -> Text interpolation, etc (level == 2)
                     *
                     * For the `Tutorials`, we display the navigation in the dropdown and it has flat structure (all items are displayed as items with level === 0).
                     *
                     * For the `Reference` we would like to give possibility to expand the "level === 1" items cause they are not visible in the first slide of navigation list.
                     * Example:
                     * API Reference (level == 0) -> Overview, Animations, common, etc (level == 1) -> API Package exports (level == 2)
                     */
                    const shouldExpandItem = (node) => !!node.level &&
                        (this.primaryActiveRouteItem() === pages_1.PagePrefix.REFERENCE
                            ? node.level > 0
                            : node.level > 1);
                    // Skip expand when active item is API Reference homepage - `/api`.
                    // It protect us from displaying second level of the navigation when user clicks on `Reference`,
                    // Because in this situation we want to display the first level, which contains, in addition to the API Reference, also the CLI Reference, Error Encyclopedia etc.
                    const skipExpandPredicateFn = (node) => node.path === pages_1.PagePrefix.API;
                    this.navigationState.expandItemHierarchy(activeNavigationItem, shouldExpandItem, skipExpandPredicateFn);
                }
            });
        }
        getActiveNavigationItem(url) {
            // set visible navigation items if not present
            this.setVisibleNavigationItems();
            const activeNavigationItem = (0, docs_1.findNavigationItem)(this.navigationItems, (item) => !!item.path &&
                (0, docs_1.getBaseUrlAfterRedirects)(item.path, this.router) ===
                    (0, docs_1.getBaseUrlAfterRedirects)(url, this.router));
            this.navigationState.setActiveNavigationItem(activeNavigationItem);
            return activeNavigationItem;
        }
        initSlideAnimation() {
            if ((0, docs_1.shouldReduceMotion)()) {
                return;
            }
            setTimeout(() => {
                this.transition.set(`${exports.ANIMATION_DURATION}ms`);
            }, exports.ANIMATION_DURATION);
        }
        setVisibleNavigationItems() {
            const routeMap = this.routeMap[this.primaryActiveRouteItem()];
            this.navigationItems = routeMap
                ? (0, docs_1.getNavigationItemsTree)(routeMap, (item) => {
                    item.isExpanded = this.primaryActiveRouteItem() === pages_1.PagePrefix.DOCS && item.level === 1;
                })
                : [];
        }
        listenToPrimaryRouteChange() {
            // Fix: flicker of sub-navigation on init
            this.primaryActiveRouteChanged$.pipe((0, operators_1.skip)(1)).subscribe(() => {
                this.navigationState.cleanExpandedState();
            });
        }
        getInitialPath(routerState) {
            var _a, _b;
            let route = routerState.root;
            while (route.firstChild) {
                route = route.firstChild;
            }
            return (_b = (_a = route.routeConfig) === null || _a === void 0 ? void 0 : _a.path) !== null && _b !== void 0 ? _b : '';
        }
    };
    __setFunctionName(_classThis, "SecondaryNavigation");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SecondaryNavigation = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SecondaryNavigation = _classThis;
})();
exports.SecondaryNavigation = SecondaryNavigation;
