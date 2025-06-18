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
exports.AppComponent = void 0;
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const operators_1 = require("rxjs/operators");
const docs_1 = require("@angular/docs");
const footer_component_1 = require("./core/layout/footer/footer.component");
const navigation_component_1 = require("./core/layout/navigation/navigation.component");
const secondary_navigation_component_1 = require("./core/layout/secondary-navigation/secondary-navigation.component");
const progress_bar_component_1 = require("./core/layout/progress-bar/progress-bar.component");
const keys_1 = require("./core/constants/keys");
const header_service_1 = require("./core/services/header.service");
let AppComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'adev-root',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            imports: [
                docs_1.CookiePopup,
                navigation_component_1.Navigation,
                footer_component_1.Footer,
                secondary_navigation_component_1.SecondaryNavigation,
                router_1.RouterOutlet,
                docs_1.SearchDialog,
                progress_bar_component_1.ProgressBarComponent,
                docs_1.TopLevelBannerComponent,
            ],
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss'],
            host: {
                '(window:keydown)': 'setSearchDialogVisibilityOnKeyPress($event)',
            },
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AppComponent = _classThis = class {
        constructor() {
            this.document = (0, core_1.inject)(common_1.DOCUMENT);
            this.router = (0, core_1.inject)(router_1.Router);
            this.headerService = (0, core_1.inject)(header_service_1.HeaderService);
            this.isBrowser = (0, common_1.isPlatformBrowser)((0, core_1.inject)(core_1.PLATFORM_ID));
            this.displaySecondaryNav = (0, core_1.signal)(false);
            this.displayFooter = (0, core_1.signal)(false);
            this.displaySearchDialog = (0, core_1.inject)(docs_1.IS_SEARCH_DIALOG_OPEN);
        }
        ngOnInit() {
            this.closeSearchDialogOnNavigationSkipped();
            this.router.events
                .pipe((0, operators_1.filter)((e) => e instanceof router_1.NavigationEnd), (0, operators_1.map)((event) => event.urlAfterRedirects))
                .subscribe((url) => {
                // We can't use an input binded to the route here
                // because AppComponent itself is not a routed component
                // so we access it via the snapshot
                const activatedRoute = (0, docs_1.getActivatedRouteSnapshotFromRouter)(this.router);
                this.displayFooter.set(!activatedRoute.data['hideFooter']);
                this.displaySecondaryNav.set(activatedRoute.data['displaySecondaryNav']);
                this.displaySearchDialog.set(false);
                this.updateCanonicalLink(url);
            });
        }
        focusFirstHeading() {
            const h1 = this.document.querySelector('h1:not(docs-top-level-banner h1)');
            h1 === null || h1 === void 0 ? void 0 : h1.focus();
        }
        setSearchDialogVisibilityOnKeyPress(event) {
            if (event.key === keys_1.SEARCH_TRIGGER_KEY && (event.metaKey || event.ctrlKey)) {
                event.preventDefault();
                this.displaySearchDialog.update((display) => !display);
            }
            if (event.key === keys_1.ESCAPE && this.displaySearchDialog()) {
                event.preventDefault();
                this.displaySearchDialog.set(false);
            }
        }
        updateCanonicalLink(absoluteUrl) {
            this.headerService.setCanonical(absoluteUrl);
        }
        closeSearchDialogOnNavigationSkipped() {
            this.router.events.pipe((0, operators_1.filter)((event) => event instanceof router_1.NavigationSkipped)).subscribe(() => {
                this.displaySearchDialog.set(false);
            });
        }
    };
    __setFunctionName(_classThis, "AppComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppComponent = _classThis;
})();
exports.AppComponent = AppComponent;
