"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOCAL_STORAGE = void 0;
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
exports.LOCAL_STORAGE = new core_1.InjectionToken('LOCAL_STORAGE', {
    providedIn: 'root',
    factory: () => getStorage((0, core_1.inject)(core_1.PLATFORM_ID)),
});
const getStorage = (platformId) => {
    // Prerendering: localStorage is undefined for prerender build
    return (0, common_1.isPlatformBrowser)(platformId) ? new LocalStorage() : null;
};
/**
 * LocalStorage is wrapper class for localStorage, operations can fail due to various reasons,
 * such as browser restrictions or storage limits being exceeded. A wrapper is providing error handling.
 */
class LocalStorage {
    get length() {
        try {
            return localStorage.length;
        }
        catch (_a) {
            return 0;
        }
    }
    clear() {
        try {
            localStorage.clear();
        }
        catch (_a) { }
    }
    getItem(key) {
        try {
            return localStorage.getItem(key);
        }
        catch (_a) {
            return null;
        }
    }
    key(index) {
        try {
            return localStorage.key(index);
        }
        catch (_a) {
            return null;
        }
    }
    removeItem(key) {
        try {
            localStorage.removeItem(key);
        }
        catch (_a) { }
    }
    setItem(key, value) {
        try {
            localStorage.setItem(key, value);
        }
        catch (_a) { }
    }
}
