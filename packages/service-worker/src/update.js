"use strict";
/**
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
exports.SwUpdate = void 0;
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const low_level_1 = require("./low_level");
/**
 * Subscribe to update notifications from the Service Worker, trigger update
 * checks, and forcibly activate updates.
 *
 * @see {@link /ecosystem/service-workers/communications Service Worker Communication Guide}
 *
 * @publicApi
 */
let SwUpdate = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SwUpdate = _classThis = class {
        /**
         * True if the Service Worker is enabled (supported by the browser and enabled via
         * `ServiceWorkerModule`).
         */
        get isEnabled() {
            return this.sw.isEnabled;
        }
        constructor(sw) {
            this.sw = sw;
            if (!sw.isEnabled) {
                this.versionUpdates = rxjs_1.NEVER;
                this.unrecoverable = rxjs_1.NEVER;
                return;
            }
            this.versionUpdates = this.sw.eventsOfType([
                'VERSION_DETECTED',
                'VERSION_INSTALLATION_FAILED',
                'VERSION_READY',
                'NO_NEW_VERSION_DETECTED',
            ]);
            this.unrecoverable = this.sw.eventsOfType('UNRECOVERABLE_STATE');
        }
        /**
         * Checks for an update and waits until the new version is downloaded from the server and ready
         * for activation.
         *
         * @returns a promise that
         * - resolves to `true` if a new version was found and is ready to be activated.
         * - resolves to `false` if no new version was found
         * - rejects if any error occurs
         */
        checkForUpdate() {
            if (!this.sw.isEnabled) {
                return Promise.reject(new Error(low_level_1.ERR_SW_NOT_SUPPORTED));
            }
            const nonce = this.sw.generateNonce();
            return this.sw.postMessageWithOperation('CHECK_FOR_UPDATES', { nonce }, nonce);
        }
        /**
         * Updates the current client (i.e. browser tab) to the latest version that is ready for
         * activation.
         *
         * In most cases, you should not use this method and instead should update a client by reloading
         * the page.
         *
         * <div class="docs-alert docs-alert-important">
         *
         * Updating a client without reloading can easily result in a broken application due to a version
         * mismatch between the application shell and other page resources,
         * such as lazy-loaded chunks, whose filenames may change between
         * versions.
         *
         * Only use this method, if you are certain it is safe for your specific use case.
         *
         * </div>
         *
         * @returns a promise that
         *  - resolves to `true` if an update was activated successfully
         *  - resolves to `false` if no update was available (for example, the client was already on the
         *    latest version).
         *  - rejects if any error occurs
         */
        activateUpdate() {
            if (!this.sw.isEnabled) {
                return Promise.reject(new core_1.ɵRuntimeError(5601 /* RuntimeErrorCode.SERVICE_WORKER_DISABLED_OR_NOT_SUPPORTED_BY_THIS_BROWSER */, (typeof ngDevMode === 'undefined' || ngDevMode) && low_level_1.ERR_SW_NOT_SUPPORTED));
            }
            const nonce = this.sw.generateNonce();
            return this.sw.postMessageWithOperation('ACTIVATE_UPDATE', { nonce }, nonce);
        }
    };
    __setFunctionName(_classThis, "SwUpdate");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SwUpdate = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SwUpdate = _classThis;
})();
exports.SwUpdate = SwUpdate;
