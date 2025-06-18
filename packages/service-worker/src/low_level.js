"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NgswCommChannel = exports.ERR_SW_NOT_SUPPORTED = void 0;
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
exports.ERR_SW_NOT_SUPPORTED = 'Service workers are disabled or not supported by this browser';
/**
 * @publicApi
 */
class NgswCommChannel {
    constructor(serviceWorker, injector) {
        this.serviceWorker = serviceWorker;
        if (!serviceWorker) {
            this.worker =
                this.events =
                    this.registration =
                        new rxjs_1.Observable((subscriber) => subscriber.error(new core_1.ɵRuntimeError(5601 /* RuntimeErrorCode.SERVICE_WORKER_DISABLED_OR_NOT_SUPPORTED_BY_THIS_BROWSER */, (typeof ngDevMode === 'undefined' || ngDevMode) && exports.ERR_SW_NOT_SUPPORTED)));
        }
        else {
            let currentWorker = null;
            const workerSubject = new rxjs_1.Subject();
            this.worker = new rxjs_1.Observable((subscriber) => {
                if (currentWorker !== null) {
                    subscriber.next(currentWorker);
                }
                return workerSubject.subscribe((v) => subscriber.next(v));
            });
            const updateController = () => {
                const { controller } = serviceWorker;
                if (controller === null) {
                    return;
                }
                currentWorker = controller;
                workerSubject.next(currentWorker);
            };
            serviceWorker.addEventListener('controllerchange', updateController);
            updateController();
            this.registration = (this.worker.pipe((0, operators_1.switchMap)(() => serviceWorker.getRegistration())));
            const _events = new rxjs_1.Subject();
            this.events = _events.asObservable();
            const messageListener = (event) => {
                const { data } = event;
                if (data === null || data === void 0 ? void 0 : data.type) {
                    _events.next(data);
                }
            };
            serviceWorker.addEventListener('message', messageListener);
            // The injector is optional to avoid breaking changes.
            const appRef = injector === null || injector === void 0 ? void 0 : injector.get(core_1.ApplicationRef, null, { optional: true });
            appRef === null || appRef === void 0 ? void 0 : appRef.onDestroy(() => {
                serviceWorker.removeEventListener('controllerchange', updateController);
                serviceWorker.removeEventListener('message', messageListener);
            });
        }
    }
    postMessage(action, payload) {
        return new Promise((resolve) => {
            this.worker.pipe((0, operators_1.take)(1)).subscribe((sw) => {
                sw.postMessage(Object.assign({ action }, payload));
                resolve();
            });
        });
    }
    postMessageWithOperation(type, payload, operationNonce) {
        const waitForOperationCompleted = this.waitForOperationCompleted(operationNonce);
        const postMessage = this.postMessage(type, payload);
        return Promise.all([postMessage, waitForOperationCompleted]).then(([, result]) => result);
    }
    generateNonce() {
        return Math.round(Math.random() * 10000000);
    }
    eventsOfType(type) {
        let filterFn;
        if (typeof type === 'string') {
            filterFn = (event) => event.type === type;
        }
        else {
            filterFn = (event) => type.includes(event.type);
        }
        return this.events.pipe((0, operators_1.filter)(filterFn));
    }
    nextEventOfType(type) {
        return this.eventsOfType(type).pipe((0, operators_1.take)(1));
    }
    waitForOperationCompleted(nonce) {
        return new Promise((resolve, reject) => {
            this.eventsOfType('OPERATION_COMPLETED')
                .pipe((0, operators_1.filter)((event) => event.nonce === nonce), (0, operators_1.take)(1), (0, operators_1.map)((event) => {
                if (event.result !== undefined) {
                    return event.result;
                }
                throw new Error(event.error);
            }))
                .subscribe({
                next: resolve,
                error: reject,
            });
        });
    }
    get isEnabled() {
        return !!this.serviceWorker;
    }
}
exports.NgswCommChannel = NgswCommChannel;
