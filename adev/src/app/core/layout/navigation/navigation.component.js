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
exports.Navigation = void 0;
const menu_1 = require("@angular/cdk/menu");
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const rxjs_interop_1 = require("@angular/core/rxjs-interop");
const docs_1 = require("@angular/docs");
const router_1 = require("@angular/router");
const operators_1 = require("rxjs/operators");
const routes_1 = require("../../../routes");
const links_1 = require("../../constants/links");
const pages_1 = require("../../enums/pages");
const theme_manager_service_1 = require("../../services/theme-manager.service");
const version_manager_service_1 = require("../../services/version-manager.service");
const element_ids_1 = require("../../constants/element-ids");
const overlay_1 = require("@angular/cdk/overlay");
const keys_1 = require("../../constants/keys");
let Navigation = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'div.adev-nav',
            imports: [router_1.RouterLink, docs_1.ClickOutside, menu_1.CdkMenu, menu_1.CdkMenuItem, menu_1.CdkMenuTrigger, docs_1.IconComponent],
            templateUrl: './navigation.component.html',
            styleUrls: ['./navigation.component.scss', './mini-menu.scss', './nav-item.scss'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Navigation = _classThis = class {
        constructor() {
            this.destroyRef = (0, core_1.inject)(core_1.DestroyRef);
            this.document = (0, core_1.inject)(common_1.DOCUMENT);
            this.isBrowser = (0, common_1.isPlatformBrowser)((0, core_1.inject)(core_1.PLATFORM_ID));
            this.navigationState = (0, core_1.inject)(docs_1.NavigationState);
            this.router = (0, core_1.inject)(router_1.Router);
            this.location = (0, core_1.inject)(common_1.Location);
            this.themeManager = (0, core_1.inject)(theme_manager_service_1.ThemeManager);
            this.isSearchDialogOpen = (0, core_1.inject)(docs_1.IS_SEARCH_DIALOG_OPEN);
            this.versionManager = (0, core_1.inject)(version_manager_service_1.VersionManager);
            this.DOCS_ROUTE = pages_1.PagePrefix.DOCS;
            this.HOME_ROUTE = pages_1.PagePrefix.HOME;
            this.PLAYGROUND_ROUTE = pages_1.PagePrefix.PLAYGROUND;
            this.REFERENCE_ROUTE = pages_1.PagePrefix.REFERENCE;
            this.TUTORIALS_ROUTE = pages_1.PagePrefix.TUTORIALS;
            this.GITHUB = links_1.GITHUB;
            this.X = links_1.X;
            this.MEDIUM = links_1.MEDIUM;
            this.YOUTUBE = links_1.YOUTUBE;
            this.DISCORD = links_1.DISCORD;
            this.BLUESKY = links_1.BLUESKY;
            this.PRIMARY_NAV_ID = element_ids_1.PRIMARY_NAV_ID;
            this.SECONDARY_NAV_ID = element_ids_1.SECONDARY_NAV_ID;
            // We can't use the ActivatedRouter queryParams as we're outside the router outlet
            this.isUwu = 'location' in globalThis ? location.search.includes('uwu') : false;
            this.miniMenuPositions = [
                new overlay_1.ConnectionPositionPair({ originX: 'end', originY: 'center' }, { overlayX: 'start', overlayY: 'center' }),
                new overlay_1.ConnectionPositionPair({ originX: 'end', originY: 'top' }, { overlayX: 'start', overlayY: 'top' }),
            ];
            this.APPLE_SEARCH_LABEL = `⌘`;
            this.DEFAULT_SEARCH_LABEL = `ctrl`;
            this.activeRouteItem = this.navigationState.primaryActiveRouteItem;
            this.theme = this.themeManager.theme;
            this.openedMenu = null;
            this.currentDocsVersion = this.versionManager.currentDocsVersion;
            this.currentDocsVersionMode = this.versionManager.currentDocsVersionMode;
            // Set the values of the search label and title only on the client, because the label is user-agent specific.
            this.searchLabel = this.isBrowser
                ? docs_1.isApple
                    ? this.APPLE_SEARCH_LABEL
                    : this.DEFAULT_SEARCH_LABEL
                : '';
            this.searchTitle = this.isBrowser
                ? docs_1.isApple
                    ? `${keys_1.COMMAND} ${keys_1.SEARCH_TRIGGER_KEY.toUpperCase()}`
                    : `${keys_1.CONTROL} ${keys_1.SEARCH_TRIGGER_KEY.toUpperCase()}`
                : '';
            this.versions = this.versionManager.versions;
            this.isMobileNavigationOpened = this.navigationState.isMobileNavVisible;
            this.isMobileNavigationOpened$ = (0, rxjs_interop_1.toObservable)(this.isMobileNavigationOpened);
            this.primaryRouteChanged$ = (0, rxjs_interop_1.toObservable)(this.activeRouteItem);
        }
        ngOnInit() {
            this.listenToRouteChange();
            this.preventToScrollContentWhenSecondaryNavIsOpened();
            this.closeMobileNavOnPrimaryRouteChange();
        }
        setTheme(theme) {
            this.themeManager.setTheme(theme);
        }
        openVersionMenu($event) {
            // It's required to avoid redirection to `home`
            $event.stopImmediatePropagation();
            $event.preventDefault();
            this.openMenu('version-picker');
        }
        openMenu(menuType) {
            this.openedMenu = menuType;
        }
        closeMenu() {
            this.openedMenu = null;
        }
        openMobileNav($event) {
            $event.stopPropagation();
            this.navigationState.setMobileNavigationListVisibility(true);
        }
        closeMobileNav() {
            this.navigationState.setMobileNavigationListVisibility(false);
        }
        toggleSearchDialog(event) {
            event.stopPropagation();
            this.isSearchDialogOpen.update((isOpen) => !isOpen);
        }
        closeMobileNavOnPrimaryRouteChange() {
            this.primaryRouteChanged$.pipe((0, rxjs_interop_1.takeUntilDestroyed)(this.destroyRef)).subscribe(() => {
                this.closeMobileNav();
            });
        }
        listenToRouteChange() {
            this.router.events
                .pipe((0, operators_1.filter)((event) => event instanceof router_1.NavigationEnd), (0, operators_1.map)((event) => event.urlAfterRedirects))
                .pipe((0, rxjs_interop_1.takeUntilDestroyed)(this.destroyRef), 
            //using location because router.url will only return "/" here
            (0, operators_1.startWith)(this.location.path()))
                .subscribe((url) => {
                this.setActivePrimaryRoute((0, docs_1.getBaseUrlAfterRedirects)(url, this.router));
            });
        }
        // Set active route item, based on urlAfterRedirects.
        // First check if url starts with the main prefixes (docs, reference, tutorials).
        // (*) Docs navigation tree contains items which will navigate to /tutorials.
        // In that case after click on such link we should mark as active item, and display tutorials navigation tree.
        // If it's not starting with prefix then check if specific path exist in the array of defined routes
        // (*) Reference navigation tree contains items which are not start with prefix like /migrations or /errors.
        setActivePrimaryRoute(urlAfterRedirects) {
            if (urlAfterRedirects === '') {
                this.activeRouteItem.set(pages_1.PagePrefix.HOME);
            }
            else if (urlAfterRedirects.startsWith(pages_1.PagePrefix.DOCS)) {
                this.activeRouteItem.set(pages_1.PagePrefix.DOCS);
            }
            else if (urlAfterRedirects.startsWith(pages_1.PagePrefix.REFERENCE) ||
                urlAfterRedirects.startsWith(pages_1.PagePrefix.API) ||
                urlAfterRedirects.startsWith(pages_1.PagePrefix.UPDATE)) {
                this.activeRouteItem.set(pages_1.PagePrefix.REFERENCE);
            }
            else if (urlAfterRedirects === pages_1.PagePrefix.PLAYGROUND) {
                this.activeRouteItem.set(pages_1.PagePrefix.PLAYGROUND);
            }
            else if (urlAfterRedirects.startsWith(pages_1.PagePrefix.TUTORIALS)) {
                this.activeRouteItem.set(pages_1.PagePrefix.TUTORIALS);
            }
            else if (routes_1.DOCS_ROUTES.some((route) => route.path === urlAfterRedirects)) {
                this.activeRouteItem.set(pages_1.PagePrefix.DOCS);
            }
            else if (routes_1.REFERENCE_ROUTES.some((route) => route.path === urlAfterRedirects)) {
                this.activeRouteItem.set(pages_1.PagePrefix.REFERENCE);
            }
            else if (routes_1.TUTORIALS_ROUTES.some((route) => route.path === urlAfterRedirects)) {
                this.activeRouteItem.set(pages_1.PagePrefix.TUTORIALS);
            }
            else {
                // Reset if no active route item could be found
                this.activeRouteItem.set(null);
            }
        }
        preventToScrollContentWhenSecondaryNavIsOpened() {
            this.isMobileNavigationOpened$.pipe((0, rxjs_interop_1.takeUntilDestroyed)(this.destroyRef)).subscribe((opened) => {
                if (opened) {
                    this.document.body.style.overflowY = 'hidden';
                }
                else {
                    this.document.body.style.removeProperty('overflow-y');
                }
            });
        }
    };
    __setFunctionName(_classThis, "Navigation");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Navigation = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Navigation = _classThis;
})();
exports.Navigation = Navigation;
