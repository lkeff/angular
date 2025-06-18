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
exports.SwPush = void 0;
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const low_level_1 = require("./low_level");
/**
 * Subscribe and listen to
 * [Web Push
 * Notifications](https://developer.mozilla.org/en-US/docs/Web/API/Push_API/Best_Practices) through
 * Angular Service Worker.
 *
 * @usageNotes
 *
 * You can inject a `SwPush` instance into any component or service
 * as a dependency.
 *
 * <code-example path="service-worker/push/module.ts" region="inject-sw-push"
 * header="app.component.ts"></code-example>
 *
 * To subscribe, call `SwPush.requestSubscription()`, which asks the user for permission.
 * The call returns a `Promise` with a new
 * [`PushSubscription`](https://developer.mozilla.org/en-US/docs/Web/API/PushSubscription)
 * instance.
 *
 * <code-example path="service-worker/push/module.ts" region="subscribe-to-push"
 * header="app.component.ts"></code-example>
 *
 * A request is rejected if the user denies permission, or if the browser
 * blocks or does not support the Push API or ServiceWorkers.
 * Check `SwPush.isEnabled` to confirm status.
 *
 * Invoke Push Notifications by pushing a message with the following payload.
 *
 * ```ts
 * {
 *   "notification": {
 *     "actions": NotificationAction[],
 *     "badge": USVString,
 *     "body": DOMString,
 *     "data": any,
 *     "dir": "auto"|"ltr"|"rtl",
 *     "icon": USVString,
 *     "image": USVString,
 *     "lang": DOMString,
 *     "renotify": boolean,
 *     "requireInteraction": boolean,
 *     "silent": boolean,
 *     "tag": DOMString,
 *     "timestamp": DOMTimeStamp,
 *     "title": DOMString,
 *     "vibrate": number[]
 *   }
 * }
 * ```
 *
 * Only `title` is required. See `Notification`
 * [instance
 * properties](https://developer.mozilla.org/en-US/docs/Web/API/Notification#Instance_properties).
 *
 * While the subscription is active, Service Worker listens for
 * [PushEvent](https://developer.mozilla.org/en-US/docs/Web/API/PushEvent)
 * occurrences and creates
 * [Notification](https://developer.mozilla.org/en-US/docs/Web/API/Notification)
 * instances in response.
 *
 * Unsubscribe using `SwPush.unsubscribe()`.
 *
 * An application can subscribe to `SwPush.notificationClicks` observable to be notified when a user
 * clicks on a notification. For example:
 *
 * <code-example path="service-worker/push/module.ts" region="subscribe-to-notification-clicks"
 * header="app.component.ts"></code-example>
 *
 * You can read more on handling notification clicks in the [Service worker notifications
 * guide](ecosystem/service-workers/push-notifications).
 *
 * @see [Push Notifications](https://developers.google.com/web/fundamentals/codelabs/push-notifications/)
 * @see [Angular Push Notifications](https://blog.angular-university.io/angular-push-notifications/)
 * @see [MDN: Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)
 * @see [MDN: Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)
 * @see [MDN: Web Push API Notifications best practices](https://developer.mozilla.org/en-US/docs/Web/API/Push_API/Best_Practices)
 *
 * @publicApi
 */
let SwPush = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SwPush = _classThis = class {
        /**
         * True if the Service Worker is enabled (supported by the browser and enabled via
         * `ServiceWorkerModule`).
         */
        get isEnabled() {
            return this.sw.isEnabled;
        }
        constructor(sw) {
            this.sw = sw;
            this.pushManager = null;
            this.subscriptionChanges = new rxjs_1.Subject();
            if (!sw.isEnabled) {
                this.messages = rxjs_1.NEVER;
                this.notificationClicks = rxjs_1.NEVER;
                this.subscription = rxjs_1.NEVER;
                return;
            }
            this.messages = this.sw.eventsOfType('PUSH').pipe((0, operators_1.map)((message) => message.data));
            this.notificationClicks = this.sw
                .eventsOfType('NOTIFICATION_CLICK')
                .pipe((0, operators_1.map)((message) => message.data));
            this.pushManager = this.sw.registration.pipe((0, operators_1.map)((registration) => registration.pushManager));
            const workerDrivenSubscriptions = this.pushManager.pipe((0, operators_1.switchMap)((pm) => pm.getSubscription()));
            this.subscription = new rxjs_1.Observable((subscriber) => {
                const workerDrivenSubscription = workerDrivenSubscriptions.subscribe(subscriber);
                const subscriptionChanges = this.subscriptionChanges.subscribe(subscriber);
                return () => {
                    workerDrivenSubscription.unsubscribe();
                    subscriptionChanges.unsubscribe();
                };
            });
        }
        /**
         * Subscribes to Web Push Notifications,
         * after requesting and receiving user permission.
         *
         * @param options An object containing the `serverPublicKey` string.
         * @returns A Promise that resolves to the new subscription object.
         */
        requestSubscription(options) {
            if (!this.sw.isEnabled || this.pushManager === null) {
                return Promise.reject(new Error(low_level_1.ERR_SW_NOT_SUPPORTED));
            }
            const pushOptions = { userVisibleOnly: true };
            let key = this.decodeBase64(options.serverPublicKey.replace(/_/g, '/').replace(/-/g, '+'));
            let applicationServerKey = new Uint8Array(new ArrayBuffer(key.length));
            for (let i = 0; i < key.length; i++) {
                applicationServerKey[i] = key.charCodeAt(i);
            }
            pushOptions.applicationServerKey = applicationServerKey;
            return new Promise((resolve, reject) => {
                this.pushManager.pipe((0, operators_1.switchMap)((pm) => pm.subscribe(pushOptions)), (0, operators_1.take)(1)).subscribe({
                    next: (sub) => {
                        this.subscriptionChanges.next(sub);
                        resolve(sub);
                    },
                    error: reject,
                });
            });
        }
        /**
         * Unsubscribes from Service Worker push notifications.
         *
         * @returns A Promise that is resolved when the operation succeeds, or is rejected if there is no
         *          active subscription or the unsubscribe operation fails.
         */
        unsubscribe() {
            if (!this.sw.isEnabled) {
                return Promise.reject(new Error(low_level_1.ERR_SW_NOT_SUPPORTED));
            }
            const doUnsubscribe = (sub) => {
                if (sub === null) {
                    throw new core_1.ɵRuntimeError(5602 /* RuntimeErrorCode.NOT_SUBSCRIBED_TO_PUSH_NOTIFICATIONS */, (typeof ngDevMode === 'undefined' || ngDevMode) &&
                        'Not subscribed to push notifications.');
                }
                return sub.unsubscribe().then((success) => {
                    if (!success) {
                        throw new core_1.ɵRuntimeError(5603 /* RuntimeErrorCode.PUSH_SUBSCRIPTION_UNSUBSCRIBE_FAILED */, (typeof ngDevMode === 'undefined' || ngDevMode) && 'Unsubscribe failed!');
                    }
                    this.subscriptionChanges.next(null);
                });
            };
            return new Promise((resolve, reject) => {
                this.subscription
                    .pipe((0, operators_1.take)(1), (0, operators_1.switchMap)(doUnsubscribe))
                    .subscribe({ next: resolve, error: reject });
            });
        }
        decodeBase64(input) {
            return atob(input);
        }
    };
    __setFunctionName(_classThis, "SwPush");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SwPush = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SwPush = _classThis;
})();
exports.SwPush = SwPush;
