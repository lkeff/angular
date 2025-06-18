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
exports.ThemeManager = exports.PREFERS_COLOR_SCHEME_DARK = exports.LIGHT_MODE_CLASS_NAME = exports.DARK_MODE_CLASS_NAME = exports.THEME_PREFERENCE_LOCAL_STORAGE_KEY = void 0;
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const docs_1 = require("@angular/docs");
const rxjs_1 = require("rxjs");
// Keep these constants in sync with the code in index.html
exports.THEME_PREFERENCE_LOCAL_STORAGE_KEY = 'themePreference';
exports.DARK_MODE_CLASS_NAME = 'docs-dark-mode';
exports.LIGHT_MODE_CLASS_NAME = 'docs-light-mode';
exports.PREFERS_COLOR_SCHEME_DARK = '(prefers-color-scheme: dark)';
let ThemeManager = (() => {
    let _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ThemeManager = _classThis = class {
        constructor() {
            this.document = (0, core_1.inject)(common_1.DOCUMENT);
            this.localStorage = (0, core_1.inject)(docs_1.LOCAL_STORAGE);
            this.platformId = (0, core_1.inject)(core_1.PLATFORM_ID);
            this.theme = (0, core_1.signal)(this.getThemeFromLocalStorageValue());
            // Zoneless - it's required to notify that theme was changed. It could be removed when signal-based components will be available.
            this.themeChanged$ = new rxjs_1.Subject();
            if (!(0, common_1.isPlatformBrowser)(this.platformId)) {
                return;
            }
            this.loadThemePreference();
            this.watchPreferredColorScheme();
        }
        setTheme(theme) {
            this.theme.set(theme);
            this.setThemeInLocalStorage();
            this.setThemeBodyClasses(theme === 'auto' ? preferredScheme() : theme);
        }
        // 1. Read theme preferences stored in localStorage
        // 2. In case when there are no stored user preferences, then read them from device preferences.
        loadThemePreference() {
            const savedUserPreference = this.getThemeFromLocalStorageValue();
            const useTheme = savedUserPreference !== null && savedUserPreference !== void 0 ? savedUserPreference : 'auto';
            this.theme.set(useTheme);
            this.setThemeBodyClasses(useTheme === 'auto' ? preferredScheme() : useTheme);
        }
        // Set theme classes on the body element
        setThemeBodyClasses(theme) {
            const documentClassList = this.document.documentElement.classList;
            if (theme === 'dark') {
                documentClassList.add(exports.DARK_MODE_CLASS_NAME);
                documentClassList.remove(exports.LIGHT_MODE_CLASS_NAME);
            }
            else {
                documentClassList.add(exports.LIGHT_MODE_CLASS_NAME);
                documentClassList.remove(exports.DARK_MODE_CLASS_NAME);
            }
            this.themeChanged$.next();
        }
        getThemeFromLocalStorageValue() {
            var _a;
            const theme = (_a = this.localStorage) === null || _a === void 0 ? void 0 : _a.getItem(exports.THEME_PREFERENCE_LOCAL_STORAGE_KEY);
            return theme !== null && theme !== void 0 ? theme : null;
        }
        setThemeInLocalStorage() {
            var _a;
            if (this.theme()) {
                (_a = this.localStorage) === null || _a === void 0 ? void 0 : _a.setItem(exports.THEME_PREFERENCE_LOCAL_STORAGE_KEY, this.theme());
            }
        }
        watchPreferredColorScheme() {
            window.matchMedia(exports.PREFERS_COLOR_SCHEME_DARK).addEventListener('change', (event) => {
                const preferredScheme = event.matches ? 'dark' : 'light';
                this.setThemeBodyClasses(preferredScheme);
            });
        }
    };
    __setFunctionName(_classThis, "ThemeManager");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ThemeManager = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ThemeManager = _classThis;
})();
exports.ThemeManager = ThemeManager;
function preferredScheme() {
    return window.matchMedia(exports.PREFERS_COLOR_SCHEME_DARK).matches ? 'dark' : 'light';
}
