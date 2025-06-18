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
exports.AlertManager = exports.AlertReason = exports.WEBCONTAINERS_COUNTER_KEY = exports.MAX_RECOMMENDED_WEBCONTAINERS_INSTANCES = void 0;
const core_1 = require("@angular/core");
const docs_1 = require("@angular/docs");
const snack_bar_1 = require("@angular/material/snack-bar");
const error_snack_bar_1 = require("../core/services/errors-handling/error-snack-bar");
exports.MAX_RECOMMENDED_WEBCONTAINERS_INSTANCES = 3;
exports.WEBCONTAINERS_COUNTER_KEY = 'numberOfWebcontainers';
var AlertReason;
(function (AlertReason) {
    AlertReason[AlertReason["OUT_OF_MEMORY"] = 0] = "OUT_OF_MEMORY";
    AlertReason[AlertReason["MOBILE"] = 1] = "MOBILE";
})(AlertReason || (exports.AlertReason = AlertReason = {}));
let AlertManager = (() => {
    let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AlertManager = _classThis = class {
        constructor() {
            this.localStorage = (0, core_1.inject)(docs_1.LOCAL_STORAGE);
            this.window = (0, core_1.inject)(docs_1.WINDOW);
            this.snackBar = (0, core_1.inject)(snack_bar_1.MatSnackBar);
        }
        init() {
            this.listenToLocalStorageValuesChange();
            this.increaseInstancesCounter();
            this.decreaseInstancesCounterOnPageClose();
            this.checkDevice();
        }
        listenToLocalStorageValuesChange() {
            this.window.addEventListener('storage', () => {
                const countOfRunningInstances = this.getStoredCountOfWebcontainerInstances();
                this.validateRunningInstances(countOfRunningInstances);
            });
        }
        // Increase count of the running instances of the webcontainers when user will boot the webcontainer
        increaseInstancesCounter() {
            var _a;
            const countOfRunningInstances = this.getStoredCountOfWebcontainerInstances() + 1;
            (_a = this.localStorage) === null || _a === void 0 ? void 0 : _a.setItem(exports.WEBCONTAINERS_COUNTER_KEY, countOfRunningInstances.toString());
            this.validateRunningInstances(countOfRunningInstances);
        }
        // Decrease count of running instances of the webcontainers when user close the app.
        decreaseInstancesCounterOnPageClose() {
            this.window.addEventListener('beforeunload', () => {
                var _a;
                const countOfRunningInstances = this.getStoredCountOfWebcontainerInstances() - 1;
                (_a = this.localStorage) === null || _a === void 0 ? void 0 : _a.setItem(exports.WEBCONTAINERS_COUNTER_KEY, countOfRunningInstances.toString());
                this.validateRunningInstances(countOfRunningInstances);
            });
        }
        getStoredCountOfWebcontainerInstances() {
            var _a;
            const countStoredInLocalStorage = (_a = this.localStorage) === null || _a === void 0 ? void 0 : _a.getItem(exports.WEBCONTAINERS_COUNTER_KEY);
            if (!countStoredInLocalStorage || Number.isNaN(countStoredInLocalStorage)) {
                return 0;
            }
            return Number(countStoredInLocalStorage);
        }
        validateRunningInstances(countOfRunningInstances) {
            if (countOfRunningInstances > exports.MAX_RECOMMENDED_WEBCONTAINERS_INSTANCES) {
                this.openSnackBar(AlertReason.OUT_OF_MEMORY);
            }
        }
        checkDevice() {
            if (docs_1.isMobile) {
                this.openSnackBar(AlertReason.MOBILE);
            }
        }
        openSnackBar(reason) {
            let message = '';
            switch (reason) {
                case AlertReason.OUT_OF_MEMORY:
                    message = `Your browser is currently limiting the memory available to run the Angular Tutorials or Playground. If you have multiple tabs open with Tutorials or Playground, please close some of them and refresh this page.`;
                    break;
                case AlertReason.MOBILE:
                    message = `You are running the embedded editor in a mobile device, this may result in an Out of memory error.`;
                    break;
            }
            this.snackBar.openFromComponent(error_snack_bar_1.ErrorSnackBar, {
                panelClass: 'docs-invert-mode',
                data: {
                    message,
                    actionText: 'I understand',
                },
            });
        }
    };
    __setFunctionName(_classThis, "AlertManager");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AlertManager = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AlertManager = _classThis;
})();
exports.AlertManager = AlertManager;
