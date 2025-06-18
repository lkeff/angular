"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Driver = exports.DriverReadyState = void 0;
const api_1 = require("./api");
const app_version_1 = require("./app-version");
const debug_1 = require("./debug");
const error_1 = require("./error");
const idle_1 = require("./idle");
const manifest_1 = require("./manifest");
const msg_1 = require("./msg");
const IDLE_DELAY = 5000;
const MAX_IDLE_DELAY = 30000;
const SUPPORTED_CONFIG_VERSION = 1;
const NOTIFICATION_OPTION_NAMES = [
    'actions',
    'badge',
    'body',
    'data',
    'dir',
    'icon',
    'image',
    'lang',
    'renotify',
    'requireInteraction',
    'silent',
    'tag',
    'timestamp',
    'title',
    'vibrate',
];
var DriverReadyState;
(function (DriverReadyState) {
    // The SW is operating in a normal mode, responding to all traffic.
    DriverReadyState[DriverReadyState["NORMAL"] = 0] = "NORMAL";
    // The SW does not have a clean installation of the latest version of the app, but older
    // cached versions are safe to use so long as they don't try to fetch new dependencies.
    // This is a degraded state.
    DriverReadyState[DriverReadyState["EXISTING_CLIENTS_ONLY"] = 1] = "EXISTING_CLIENTS_ONLY";
    // The SW has decided that caching is completely unreliable, and is forgoing request
    // handling until the next restart.
    DriverReadyState[DriverReadyState["SAFE_MODE"] = 2] = "SAFE_MODE";
})(DriverReadyState || (exports.DriverReadyState = DriverReadyState = {}));
class Driver {
    constructor(scope, adapter, db) {
        this.scope = scope;
        this.adapter = adapter;
        this.db = db;
        /**
         * Tracks the current readiness condition under which the SW is operating. This controls
         * whether the SW attempts to respond to some or all requests.
         */
        this.state = DriverReadyState.NORMAL;
        this.stateMessage = '(nominal)';
        /**
         * Tracks whether the SW is in an initialized state or not. Before initialization,
         * it's not legal to respond to requests.
         */
        this.initialized = null;
        /**
         * Maps client IDs to the manifest hash of the application version being used to serve
         * them. If a client ID is not present here, it has not yet been assigned a version.
         *
         * If a ManifestHash appears here, it is also present in the `versions` map below.
         */
        this.clientVersionMap = new Map();
        /**
         * Maps manifest hashes to instances of `AppVersion` for those manifests.
         */
        this.versions = new Map();
        /**
         * The latest version fetched from the server.
         *
         * Valid after initialization has completed.
         */
        this.latestHash = null;
        this.lastUpdateCheck = null;
        /**
         * Whether there is a check for updates currently scheduled due to navigation.
         */
        this.scheduledNavUpdateCheck = false;
        /**
         * Keep track of whether we have logged an invalid `only-if-cached` request.
         * (See `.onFetch()` for details.)
         */
        this.loggedInvalidOnlyIfCachedRequest = false;
        this.controlTable = this.db.open('control');
        this.ngswStatePath = this.adapter.parseUrl('ngsw/state', this.scope.registration.scope).path;
        // Set up all the event handlers that the SW needs.
        // The install event is triggered when the service worker is first installed.
        this.scope.addEventListener('install', (event) => {
            // SW code updates are separate from application updates, so code updates are
            // almost as straightforward as restarting the SW. Because of this, it's always
            // safe to skip waiting until application tabs are closed, and activate the new
            // SW version immediately.
            event.waitUntil(this.scope.skipWaiting());
        });
        // The activate event is triggered when this version of the service worker is
        // first activated.
        this.scope.addEventListener('activate', (event) => {
            event.waitUntil((() => __awaiter(this, void 0, void 0, function* () {
                // As above, it's safe to take over from existing clients immediately, since the new SW
                // version will continue to serve the old application.
                yield this.scope.clients.claim();
            }))());
            // Rather than wait for the first fetch event, which may not arrive until
            // the next time the application is loaded, the SW takes advantage of the
            // activation event to schedule initialization. However, if this were run
            // in the context of the 'activate' event, waitUntil() here would cause fetch
            // events to block until initialization completed. Thus, the SW does a
            // postMessage() to itself, to schedule a new event loop iteration with an
            // entirely separate event context. The SW will be kept alive by waitUntil()
            // within that separate context while initialization proceeds, while at the
            // same time the activation event is allowed to resolve and traffic starts
            // being served.
            if (this.scope.registration.active !== null) {
                this.scope.registration.active.postMessage({ action: 'INITIALIZE' });
            }
        });
        // Handle the fetch, message, and push events.
        this.scope.addEventListener('fetch', (event) => this.onFetch(event));
        this.scope.addEventListener('message', (event) => this.onMessage(event));
        this.scope.addEventListener('push', (event) => this.onPush(event));
        this.scope.addEventListener('notificationclick', (event) => this.onClick(event));
        // The debugger generates debug pages in response to debugging requests.
        this.debugger = new debug_1.DebugHandler(this, this.adapter);
        // The IdleScheduler will execute idle tasks after a given delay.
        this.idle = new idle_1.IdleScheduler(this.adapter, IDLE_DELAY, MAX_IDLE_DELAY, this.debugger);
    }
    /**
     * The handler for fetch events.
     *
     * This is the transition point between the synchronous event handler and the
     * asynchronous execution that eventually resolves for respondWith() and waitUntil().
     */
    onFetch(event) {
        const req = event.request;
        const scopeUrl = this.scope.registration.scope;
        const requestUrlObj = this.adapter.parseUrl(req.url, scopeUrl);
        if (req.headers.has('ngsw-bypass') || /[?&]ngsw-bypass(?:[=&]|$)/i.test(requestUrlObj.search)) {
            return;
        }
        // The only thing that is served unconditionally is the debug page.
        if (requestUrlObj.path === this.ngswStatePath) {
            // Allow the debugger to handle the request, but don't affect SW state in any other way.
            event.respondWith(this.debugger.handleFetch(req));
            return;
        }
        // If the SW is in a broken state where it's not safe to handle requests at all,
        // returning causes the request to fall back on the network. This is preferred over
        // `respondWith(fetch(req))` because the latter still shows in DevTools that the
        // request was handled by the SW.
        if (this.state === DriverReadyState.SAFE_MODE) {
            // Even though the worker is in safe mode, idle tasks still need to happen so
            // things like update checks, etc. can take place.
            event.waitUntil(this.idle.trigger());
            return;
        }
        // Although "passive mixed content" (like images) only produces a warning without a
        // ServiceWorker, fetching it via a ServiceWorker results in an error. Let such requests be
        // handled by the browser, since handling with the ServiceWorker would fail anyway.
        // See https://github.com/angular/angular/issues/23012#issuecomment-376430187 for more details.
        if (requestUrlObj.origin.startsWith('http:') && scopeUrl.startsWith('https:')) {
            // Still, log the incident for debugging purposes.
            this.debugger.log(`Ignoring passive mixed content request: Driver.fetch(${req.url})`);
            return;
        }
        // When opening DevTools in Chrome, a request is made for the current URL (and possibly related
        // resources, e.g. scripts) with `cache: 'only-if-cached'` and `mode: 'no-cors'`. These request
        // will eventually fail, because `only-if-cached` is only allowed to be used with
        // `mode: 'same-origin'`.
        // This is likely a bug in Chrome DevTools. Avoid handling such requests.
        // (See also https://github.com/angular/angular/issues/22362.)
        // TODO(gkalpak): Remove once no longer necessary (i.e. fixed in Chrome DevTools).
        if (req.cache === 'only-if-cached' && req.mode !== 'same-origin') {
            // Log the incident only the first time it happens, to avoid spamming the logs.
            if (!this.loggedInvalidOnlyIfCachedRequest) {
                this.loggedInvalidOnlyIfCachedRequest = true;
                this.debugger.log(`Ignoring invalid request: 'only-if-cached' can be set only with 'same-origin' mode`, `Driver.fetch(${req.url}, cache: ${req.cache}, mode: ${req.mode})`);
            }
            return;
        }
        // Past this point, the SW commits to handling the request itself. This could still
        // fail (and result in `state` being set to `SAFE_MODE`), but even in that case the
        // SW will still deliver a response.
        event.respondWith(this.handleFetch(event));
    }
    /**
     * The handler for message events.
     */
    onMessage(event) {
        // Ignore message events when the SW is in safe mode, for now.
        if (this.state === DriverReadyState.SAFE_MODE) {
            return;
        }
        // If the message doesn't have the expected signature, ignore it.
        const data = event.data;
        if (!data || !data.action) {
            return;
        }
        event.waitUntil((() => __awaiter(this, void 0, void 0, function* () {
            // Initialization is the only event which is sent directly from the SW to itself, and thus
            // `event.source` is not a `Client`. Handle it here, before the check for `Client` sources.
            if (data.action === 'INITIALIZE') {
                return this.ensureInitialized(event);
            }
            // Only messages from true clients are accepted past this point.
            // This is essentially a typecast.
            if (!this.adapter.isClient(event.source)) {
                return;
            }
            // Handle the message and keep the SW alive until it's handled.
            yield this.ensureInitialized(event);
            yield this.handleMessage(data, event.source);
        }))());
    }
    onPush(msg) {
        // Push notifications without data have no effect.
        if (!msg.data) {
            return;
        }
        // Handle the push and keep the SW alive until it's handled.
        msg.waitUntil(this.handlePush(msg.data.json()));
    }
    onClick(event) {
        // Handle the click event and keep the SW alive until it's handled.
        event.waitUntil(this.handleClick(event.notification, event.action));
    }
    ensureInitialized(event) {
        return __awaiter(this, void 0, void 0, function* () {
            // Since the SW may have just been started, it may or may not have been initialized already.
            // `this.initialized` will be `null` if initialization has not yet been attempted, or will be a
            // `Promise` which will resolve (successfully or unsuccessfully) if it has.
            if (this.initialized !== null) {
                return this.initialized;
            }
            // Initialization has not yet been attempted, so attempt it. This should only ever happen once
            // per SW instantiation.
            try {
                this.initialized = this.initialize();
                yield this.initialized;
            }
            catch (error) {
                // If initialization fails, the SW needs to enter a safe state, where it declines to respond
                // to network requests.
                this.state = DriverReadyState.SAFE_MODE;
                this.stateMessage = `Initialization failed due to error: ${(0, error_1.errorToString)(error)}`;
                throw error;
            }
            finally {
                // Regardless if initialization succeeded, background tasks still need to happen.
                event.waitUntil(this.idle.trigger());
            }
        });
    }
    handleMessage(msg, from) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((0, msg_1.isMsgCheckForUpdates)(msg)) {
                const action = this.checkForUpdate();
                yield this.completeOperation(from, action, msg.nonce);
            }
            else if ((0, msg_1.isMsgActivateUpdate)(msg)) {
                const action = this.updateClient(from);
                yield this.completeOperation(from, action, msg.nonce);
            }
        });
    }
    handlePush(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.broadcast({
                type: 'PUSH',
                data,
            });
            if (!data.notification || !data.notification.title) {
                return;
            }
            const desc = data.notification;
            let options = {};
            NOTIFICATION_OPTION_NAMES.filter((name) => desc.hasOwnProperty(name)).forEach((name) => (options[name] = desc[name]));
            yield this.scope.registration.showNotification(desc['title'], options);
        });
    }
    handleClick(notification, action) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            notification.close();
            const options = {};
            // The filter uses `name in notification` because the properties are on the prototype so
            // hasOwnProperty does not work here
            NOTIFICATION_OPTION_NAMES.filter((name) => name in notification).forEach((name) => (options[name] = notification[name]));
            const notificationAction = action === '' || action === undefined ? 'default' : action;
            const onActionClick = (_b = (_a = notification === null || notification === void 0 ? void 0 : notification.data) === null || _a === void 0 ? void 0 : _a.onActionClick) === null || _b === void 0 ? void 0 : _b[notificationAction];
            const urlToOpen = new URL((_c = onActionClick === null || onActionClick === void 0 ? void 0 : onActionClick.url) !== null && _c !== void 0 ? _c : '', this.scope.registration.scope).href;
            switch (onActionClick === null || onActionClick === void 0 ? void 0 : onActionClick.operation) {
                case 'openWindow':
                    yield this.scope.clients.openWindow(urlToOpen);
                    break;
                case 'focusLastFocusedOrOpen': {
                    let matchingClient = yield this.getLastFocusedMatchingClient(this.scope);
                    if (matchingClient) {
                        yield (matchingClient === null || matchingClient === void 0 ? void 0 : matchingClient.focus());
                    }
                    else {
                        yield this.scope.clients.openWindow(urlToOpen);
                    }
                    break;
                }
                case 'navigateLastFocusedOrOpen': {
                    let matchingClient = yield this.getLastFocusedMatchingClient(this.scope);
                    if (matchingClient) {
                        matchingClient = yield matchingClient.navigate(urlToOpen);
                        yield (matchingClient === null || matchingClient === void 0 ? void 0 : matchingClient.focus());
                    }
                    else {
                        yield this.scope.clients.openWindow(urlToOpen);
                    }
                    break;
                }
                case 'sendRequest': {
                    yield this.scope.fetch(urlToOpen);
                    break;
                }
                default:
                    break;
            }
            yield this.broadcast({
                type: 'NOTIFICATION_CLICK',
                data: { action, notification: options },
            });
        });
    }
    getLastFocusedMatchingClient(scope) {
        return __awaiter(this, void 0, void 0, function* () {
            const windowClients = yield scope.clients.matchAll({ type: 'window' });
            // As per the spec windowClients are `sorted in the most recently focused order`
            return windowClients[0];
        });
    }
    completeOperation(client, promise, nonce) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = { type: 'OPERATION_COMPLETED', nonce };
            try {
                client.postMessage(Object.assign(Object.assign({}, response), { result: yield promise }));
            }
            catch (e) {
                client.postMessage(Object.assign(Object.assign({}, response), { error: e.toString() }));
            }
        });
    }
    updateClient(client) {
        return __awaiter(this, void 0, void 0, function* () {
            // Figure out which version the client is on. If it's not on the latest,
            // it needs to be moved.
            const existing = this.clientVersionMap.get(client.id);
            if (existing === this.latestHash) {
                // Nothing to do, this client is already on the latest version.
                return false;
            }
            // Switch the client over.
            let previous = undefined;
            // Look up the application data associated with the existing version. If there
            // isn't any, fall back on using the hash.
            if (existing !== undefined) {
                const existingVersion = this.versions.get(existing);
                previous = this.mergeHashWithAppData(existingVersion.manifest, existing);
            }
            // Set the current version used by the client, and sync the mapping to disk.
            this.clientVersionMap.set(client.id, this.latestHash);
            yield this.sync();
            // Notify the client about this activation.
            const current = this.versions.get(this.latestHash);
            return true;
        });
    }
    handleFetch(event) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Ensure the SW instance has been initialized.
                yield this.ensureInitialized(event);
            }
            catch (_a) {
                // Since the SW is already committed to responding to the currently active request,
                // respond with a network fetch.
                return this.safeFetch(event.request);
            }
            // On navigation requests, check for new updates.
            if (event.request.mode === 'navigate' && !this.scheduledNavUpdateCheck) {
                this.scheduledNavUpdateCheck = true;
                this.idle.schedule('check-updates-on-navigation', () => __awaiter(this, void 0, void 0, function* () {
                    this.scheduledNavUpdateCheck = false;
                    yield this.checkForUpdate();
                }));
            }
            // Decide which version of the app to use to serve this request. This is asynchronous as in
            // some cases, a record will need to be written to disk about the assignment that is made.
            const appVersion = yield this.assignVersion(event);
            // If there's a configured max age, check whether this version is within that age.
            const isVersionWithinMaxAge = (appVersion === null || appVersion === void 0 ? void 0 : appVersion.manifest.applicationMaxAge) === undefined ||
                this.adapter.time - appVersion.manifest.timestamp < appVersion.manifest.applicationMaxAge;
            let res = null;
            try {
                if (appVersion !== null && isVersionWithinMaxAge) {
                    try {
                        // Handle the request. First try the AppVersion. If that doesn't work, fall back on the
                        // network.
                        res = yield appVersion.handleFetch(event.request, event);
                    }
                    catch (err) {
                        if (err.isUnrecoverableState) {
                            yield this.notifyClientsAboutUnrecoverableState(appVersion, err.message);
                        }
                        if (err.isCritical) {
                            // Something went wrong with handling the request from this version.
                            this.debugger.log(err, `Driver.handleFetch(version: ${appVersion.manifestHash})`);
                            yield this.versionFailed(appVersion, err);
                            return this.safeFetch(event.request);
                        }
                        throw err;
                    }
                }
                // The response will be `null` only if no `AppVersion` can be assigned to the request or if
                // the assigned `AppVersion`'s manifest doesn't specify what to do about the request.
                // In that case, just fall back on the network.
                if (res === null) {
                    return this.safeFetch(event.request);
                }
                // The `AppVersion` returned a usable response, so return it.
                return res;
            }
            finally {
                // Trigger the idle scheduling system. The Promise returned by `trigger()` will resolve after
                // a specific amount of time has passed. If `trigger()` hasn't been called again by then (e.g.
                // on a subsequent request), the idle task queue will be drained and the `Promise` won't
                // be resolved until that operation is complete as well.
                event.waitUntil(this.idle.trigger());
            }
        });
    }
    /**
     * Attempt to quickly reach a state where it's safe to serve responses.
     */
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            // On initialization, all of the serialized state is read out of the 'control'
            // table. This includes:
            // - map of hashes to manifests of currently loaded application versions
            // - map of client IDs to their pinned versions
            // - record of the most recently fetched manifest hash
            //
            // If these values don't exist in the DB, then this is the either the first time
            // the SW has run or the DB state has been wiped or is inconsistent. In that case,
            // load a fresh copy of the manifest and reset the state from scratch.
            const table = yield this.controlTable;
            // Attempt to load the needed state from the DB. If this fails, the catch {} block
            // will populate these variables with freshly constructed values.
            let manifests, assignments, latest;
            try {
                // Read them from the DB simultaneously.
                [manifests, assignments, latest] = yield Promise.all([
                    table.read('manifests'),
                    table.read('assignments'),
                    table.read('latest'),
                ]);
                // Make sure latest manifest is correctly installed. If not (e.g. corrupted data),
                // it could stay locked in EXISTING_CLIENTS_ONLY or SAFE_MODE state.
                if (!this.versions.has(latest.latest) && !manifests.hasOwnProperty(latest.latest)) {
                    this.debugger.log(`Missing manifest for latest version hash ${latest.latest}`, 'initialize: read from DB');
                    throw new Error(`Missing manifest for latest hash ${latest.latest}`);
                }
                // Successfully loaded from saved state. This implies a manifest exists, so
                // the update check needs to happen in the background.
                this.idle.schedule('init post-load (update)', () => __awaiter(this, void 0, void 0, function* () {
                    yield this.checkForUpdate();
                }));
            }
            catch (_) {
                // Something went wrong. Try to start over by fetching a new manifest from the
                // server and building up an empty initial state.
                const manifest = yield this.fetchLatestManifest();
                const hash = (0, manifest_1.hashManifest)(manifest);
                manifests = { [hash]: manifest };
                assignments = {};
                latest = { latest: hash };
                // Save the initial state to the DB.
                yield Promise.all([
                    table.write('manifests', manifests),
                    table.write('assignments', assignments),
                    table.write('latest', latest),
                ]);
            }
            // At this point, either the state has been loaded successfully, or fresh state
            // with a new copy of the manifest has been produced. At this point, the `Driver`
            // can have its internals hydrated from the state.
            // Schedule cleaning up obsolete caches in the background.
            this.idle.schedule('init post-load (cleanup)', () => __awaiter(this, void 0, void 0, function* () {
                yield this.cleanupCaches();
            }));
            // Initialize the `versions` map by setting each hash to a new `AppVersion` instance
            // for that manifest.
            Object.keys(manifests).forEach((hash) => {
                const manifest = manifests[hash];
                // If the manifest is newly initialized, an AppVersion may have already been
                // created for it.
                if (!this.versions.has(hash)) {
                    this.versions.set(hash, new app_version_1.AppVersion(this.scope, this.adapter, this.db, this.idle, this.debugger, manifest, hash));
                }
            });
            // Map each client ID to its associated hash. Along the way, verify that the hash
            // is still valid for that client ID. It should not be possible for a client to
            // still be associated with a hash that was since removed from the state.
            Object.keys(assignments).forEach((clientId) => {
                const hash = assignments[clientId];
                if (this.versions.has(hash)) {
                    this.clientVersionMap.set(clientId, hash);
                }
                else {
                    this.clientVersionMap.set(clientId, latest.latest);
                    this.debugger.log(`Unknown version ${hash} mapped for client ${clientId}, using latest instead`, `initialize: map assignments`);
                }
            });
            // Set the latest version.
            this.latestHash = latest.latest;
            // Finally, assert that the latest version is in fact loaded.
            if (!this.versions.has(latest.latest)) {
                throw new Error(`Invariant violated (initialize): latest hash ${latest.latest} has no known manifest`);
            }
            // Finally, wait for the scheduling of initialization of all versions in the
            // manifest. Ordinarily this just schedules the initializations to happen during
            // the next idle period, but in development mode this might actually wait for the
            // full initialization.
            // If any of these initializations fail, versionFailed() will be called either
            // synchronously or asynchronously to handle the failure and re-map clients.
            yield Promise.all(Object.keys(manifests).map((hash) => __awaiter(this, void 0, void 0, function* () {
                try {
                    // Attempt to schedule or initialize this version. If this operation is
                    // successful, then initialization either succeeded or was scheduled. If
                    // it fails, then full initialization was attempted and failed.
                    yield this.scheduleInitialization(this.versions.get(hash));
                }
                catch (err) {
                    this.debugger.log(err, `initialize: schedule init of ${hash}`);
                }
            })));
        });
    }
    lookupVersionByHash(hash, debugName = 'lookupVersionByHash') {
        // The version should exist, but check just in case.
        if (!this.versions.has(hash)) {
            throw new Error(`Invariant violated (${debugName}): want AppVersion for ${hash} but not loaded`);
        }
        return this.versions.get(hash);
    }
    /**
     * Decide which version of the manifest to use for the event.
     */
    assignVersion(event) {
        return __awaiter(this, void 0, void 0, function* () {
            // First, check whether the event has a (non empty) client ID. If it does, the version may
            // already be associated.
            //
            // NOTE: For navigation requests, we care about the `resultingClientId`. If it is undefined or
            //       the empty string (which is the case for sub-resource requests), we look at `clientId`.
            //
            // NOTE: If a request is a worker script, we should use the `clientId`, as worker is a part
            //       of requesting client.
            const isWorkerScriptRequest = event.request.destination === 'worker' && event.resultingClientId && event.clientId;
            const clientId = isWorkerScriptRequest
                ? event.clientId
                : event.resultingClientId || event.clientId;
            if (clientId) {
                // Check if there is an assigned client id.
                if (this.clientVersionMap.has(clientId)) {
                    // There is an assignment for this client already.
                    const hash = this.clientVersionMap.get(clientId);
                    let appVersion = this.lookupVersionByHash(hash, 'assignVersion');
                    // Ordinarily, this client would be served from its assigned version. But, if this
                    // request is a navigation request, this client can be updated to the latest
                    // version immediately.
                    if (this.state === DriverReadyState.NORMAL &&
                        hash !== this.latestHash &&
                        appVersion.isNavigationRequest(event.request)) {
                        // Update this client to the latest version immediately.
                        if (this.latestHash === null) {
                            throw new Error(`Invariant violated (assignVersion): latestHash was null`);
                        }
                        const client = yield this.scope.clients.get(clientId);
                        if (client) {
                            yield this.updateClient(client);
                        }
                        appVersion = this.lookupVersionByHash(this.latestHash, 'assignVersion');
                    }
                    if (isWorkerScriptRequest) {
                        if (!this.clientVersionMap.has(event.resultingClientId)) {
                            // New worker hasn't been seen before; set this client to requesting client version
                            this.clientVersionMap.set(event.resultingClientId, hash);
                            yield this.sync();
                        }
                        else if (this.clientVersionMap.get(event.resultingClientId) !== hash) {
                            throw new Error(`Version mismatch between worker client ${event.resultingClientId} and requesting client ${clientId}`);
                        }
                    }
                    // TODO: make sure the version is valid.
                    return appVersion;
                }
                else {
                    // This is the first time this client ID has been seen. Whether the SW is in a
                    // state to handle new clients depends on the current readiness state, so check
                    // that first.
                    if (this.state !== DriverReadyState.NORMAL) {
                        // It's not safe to serve new clients in the current state. It's possible that
                        // this is an existing client which has not been mapped yet (see below) but
                        // even if that is the case, it's invalid to make an assignment to a known
                        // invalid version, even if that assignment was previously implicit. Return
                        // undefined here to let the caller know that no assignment is possible at
                        // this time.
                        return null;
                    }
                    // It's safe to handle this request. Two cases apply. Either:
                    // 1) the browser assigned a client ID at the time of the navigation request, and
                    //    this is truly the first time seeing this client, or
                    // 2) a navigation request came previously from the same client, but with no client
                    //    ID attached. Browsers do this to avoid creating a client under the origin in
                    //    the event the navigation request is just redirected.
                    //
                    // In case 1, the latest version can safely be used.
                    // In case 2, the latest version can be used, with the assumption that the previous
                    // navigation request was answered under the same version. This assumption relies
                    // on the fact that it's unlikely an update will come in between the navigation
                    // request and requests for subsequent resources on that page.
                    // First validate the current state.
                    if (this.latestHash === null) {
                        throw new Error(`Invariant violated (assignVersion): latestHash was null`);
                    }
                    if (isWorkerScriptRequest) {
                        if (!this.clientVersionMap.has(event.resultingClientId)) {
                            // New worker hasn't been seen before; set this client to latest hash as well
                            this.clientVersionMap.set(event.resultingClientId, this.latestHash);
                        }
                        else if (this.clientVersionMap.get(event.resultingClientId) !== this.latestHash) {
                            throw new Error(`Version mismatch between worker client ${event.resultingClientId} and requesting client ${clientId}`);
                        }
                    }
                    // Pin this client ID to the current latest version, indefinitely.
                    this.clientVersionMap.set(clientId, this.latestHash);
                    yield this.sync();
                    // Return the latest `AppVersion`.
                    return this.lookupVersionByHash(this.latestHash, 'assignVersion');
                }
            }
            else {
                // No client ID was associated with the request. This must be a navigation request
                // for a new client. First check that the SW is accepting new clients.
                if (this.state !== DriverReadyState.NORMAL) {
                    return null;
                }
                // Serve it with the latest version, and assume that the client will actually get
                // associated with that version on the next request.
                // First validate the current state.
                if (this.latestHash === null) {
                    throw new Error(`Invariant violated (assignVersion): latestHash was null`);
                }
                // Return the latest `AppVersion`.
                return this.lookupVersionByHash(this.latestHash, 'assignVersion');
            }
        });
    }
    fetchLatestManifest() {
        return __awaiter(this, arguments, void 0, function* (ignoreOfflineError = false) {
            const res = yield this.safeFetch(this.adapter.newRequest('ngsw.json?ngsw-cache-bust=' + Math.random()));
            if (!res.ok) {
                if (res.status === 404) {
                    yield this.deleteAllCaches();
                    yield this.scope.registration.unregister();
                }
                else if ((res.status === 503 || res.status === 504) && ignoreOfflineError) {
                    return null;
                }
                throw new Error(`Manifest fetch failed! (status: ${res.status})`);
            }
            this.lastUpdateCheck = this.adapter.time;
            return res.json();
        });
    }
    deleteAllCaches() {
        return __awaiter(this, void 0, void 0, function* () {
            const cacheNames = yield this.adapter.caches.keys();
            yield Promise.all(cacheNames.map((name) => this.adapter.caches.delete(name)));
        });
    }
    /**
     * Schedule the SW's attempt to reach a fully prefetched state for the given AppVersion
     * when the SW is not busy and has connectivity. This returns a Promise which must be
     * awaited, as under some conditions the AppVersion might be initialized immediately.
     */
    scheduleInitialization(appVersion) {
        return __awaiter(this, void 0, void 0, function* () {
            const initialize = () => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield appVersion.initializeFully();
                }
                catch (err) {
                    this.debugger.log(err, `initializeFully for ${appVersion.manifestHash}`);
                    yield this.versionFailed(appVersion, err);
                }
            });
            // TODO: better logic for detecting localhost.
            if (this.scope.registration.scope.indexOf('://localhost') > -1) {
                return initialize();
            }
            this.idle.schedule(`initialization(${appVersion.manifestHash})`, initialize);
        });
    }
    versionFailed(appVersion, err) {
        return __awaiter(this, void 0, void 0, function* () {
            // This particular AppVersion is broken. First, find the manifest hash.
            const broken = Array.from(this.versions.entries()).find(([hash, version]) => version === appVersion);
            if (broken === undefined) {
                // This version is no longer in use anyway, so nobody cares.
                return;
            }
            const brokenHash = broken[0];
            // The specified version is broken and new clients should not be served from it. However, it is
            // deemed even riskier to switch the existing clients to a different version or to the network.
            // Therefore, we keep clients on their current version (even if broken) and ensure that no new
            // clients will be assigned to it.
            // TODO: notify affected apps.
            // The action taken depends on whether the broken manifest is the active (latest) or not.
            // - If the broken version is not the latest, no further action is necessary, since new clients
            //   will be assigned to the latest version anyway.
            // - If the broken version is the latest, the SW cannot accept new clients (but can continue to
            //   service old ones).
            if (this.latestHash === brokenHash) {
                // The latest manifest is broken. This means that new clients are at the mercy of the network,
                // but caches continue to be valid for previous versions. This is unfortunate but unavoidable.
                this.state = DriverReadyState.EXISTING_CLIENTS_ONLY;
                this.stateMessage = `Degraded due to: ${(0, error_1.errorToString)(err)}`;
            }
        });
    }
    setupUpdate(manifest, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newVersion = new app_version_1.AppVersion(this.scope, this.adapter, this.db, this.idle, this.debugger, manifest, hash);
                // Firstly, check if the manifest version is correct.
                if (manifest.configVersion !== SUPPORTED_CONFIG_VERSION) {
                    yield this.deleteAllCaches();
                    yield this.scope.registration.unregister();
                    throw new Error(`Invalid config version: expected ${SUPPORTED_CONFIG_VERSION}, got ${manifest.configVersion}.`);
                }
                // Cause the new version to become fully initialized. If this fails, then the
                // version will not be available for use.
                yield newVersion.initializeFully(this);
                // Install this as an active version of the app.
                this.versions.set(hash, newVersion);
                // Future new clients will use this hash as the latest version.
                this.latestHash = hash;
                // If we are in `EXISTING_CLIENTS_ONLY` mode (meaning we didn't have a clean copy of the last
                // latest version), we can now recover to `NORMAL` mode and start accepting new clients.
                if (this.state === DriverReadyState.EXISTING_CLIENTS_ONLY) {
                    this.state = DriverReadyState.NORMAL;
                    this.stateMessage = '(nominal)';
                }
                yield this.sync();
                yield this.notifyClientsAboutVersionReady(manifest, hash);
            }
            catch (e) {
                yield this.notifyClientsAboutVersionInstallationFailed(manifest, hash, e);
                throw e;
            }
        });
    }
    checkForUpdate() {
        return __awaiter(this, void 0, void 0, function* () {
            let hash = '(unknown)';
            try {
                const manifest = yield this.fetchLatestManifest(true);
                if (manifest === null) {
                    // Client or server offline. Unable to check for updates at this time.
                    // Continue to service clients (existing and new).
                    this.debugger.log('Check for update aborted. (Client or server offline.)');
                    return false;
                }
                hash = (0, manifest_1.hashManifest)(manifest);
                // Check whether this is really an update.
                if (this.versions.has(hash)) {
                    yield this.notifyClientsAboutNoNewVersionDetected(manifest, hash);
                    return false;
                }
                yield this.notifyClientsAboutVersionDetected(manifest, hash);
                yield this.setupUpdate(manifest, hash);
                return true;
            }
            catch (err) {
                this.debugger.log(err, `Error occurred while updating to manifest ${hash}`);
                this.state = DriverReadyState.EXISTING_CLIENTS_ONLY;
                this.stateMessage = `Degraded due to failed initialization: ${(0, error_1.errorToString)(err)}`;
                return false;
            }
        });
    }
    /**
     * Synchronize the existing state to the underlying database.
     */
    sync() {
        return __awaiter(this, void 0, void 0, function* () {
            const table = yield this.controlTable;
            // Construct a serializable map of hashes to manifests.
            const manifests = {};
            this.versions.forEach((version, hash) => {
                manifests[hash] = version.manifest;
            });
            // Construct a serializable map of client ids to version hashes.
            const assignments = {};
            this.clientVersionMap.forEach((hash, clientId) => {
                assignments[clientId] = hash;
            });
            // Record the latest entry. Since this is a sync which is necessarily happening after
            // initialization, latestHash should always be valid.
            const latest = {
                latest: this.latestHash,
            };
            // Synchronize all of these.
            yield Promise.all([
                table.write('manifests', manifests),
                table.write('assignments', assignments),
                table.write('latest', latest),
            ]);
        });
    }
    cleanupCaches() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Query for all currently active clients, and list the client IDs. This may skip some clients
                // in the browser back-forward cache, but not much can be done about that.
                const activeClients = new Set((yield this.scope.clients.matchAll()).map((client) => client.id));
                // A simple list of client IDs that the SW has kept track of. Subtracting `activeClients` from
                // this list will result in the set of client IDs which are being tracked but are no longer
                // used in the browser, and thus can be cleaned up.
                const knownClients = Array.from(this.clientVersionMap.keys());
                // Remove clients in the `clientVersionMap` that are no longer active.
                const obsoleteClients = knownClients.filter((id) => !activeClients.has(id));
                obsoleteClients.forEach((id) => this.clientVersionMap.delete(id));
                // Next, determine the set of versions which are still used. All others can be removed.
                const usedVersions = new Set(this.clientVersionMap.values());
                // Collect all obsolete versions by filtering out used versions from the set of all versions.
                const obsoleteVersions = Array.from(this.versions.keys()).filter((version) => !usedVersions.has(version) && version !== this.latestHash);
                // Remove all the versions which are no longer used.
                obsoleteVersions.forEach((version) => this.versions.delete(version));
                // Commit all the changes to the saved state.
                yield this.sync();
                // Delete all caches that are no longer needed.
                const allCaches = yield this.adapter.caches.keys();
                const usedCaches = new Set(yield this.getCacheNames());
                const cachesToDelete = allCaches.filter((name) => !usedCaches.has(name));
                yield Promise.all(cachesToDelete.map((name) => this.adapter.caches.delete(name)));
            }
            catch (err) {
                // Oh well? Not much that can be done here. These caches will be removed on the next attempt
                // or when the SW revs its format version, which happens from time to time.
                this.debugger.log(err, 'cleanupCaches');
            }
        });
    }
    /**
     * Determine if a specific version of the given resource is cached anywhere within the SW,
     * and fetch it if so.
     */
    lookupResourceWithHash(url, hash) {
        return (Array
            // Scan through the set of all cached versions, valid or otherwise. It's safe to do such
            // lookups even for invalid versions as the cached version of a resource will have the
            // same hash regardless.
            .from(this.versions.values())
            // Reduce the set of versions to a single potential result. At any point along the
            // reduction, if a response has already been identified, then pass it through, as no
            // future operation could change the response. If no response has been found yet, keep
            // checking versions until one is or until all versions have been exhausted.
            .reduce((prev, version) => __awaiter(this, void 0, void 0, function* () {
            // First, check the previous result. If a non-null result has been found already, just
            // return it.
            if ((yield prev) !== null) {
                return prev;
            }
            // No result has been found yet. Try the next `AppVersion`.
            return version.lookupResourceWithHash(url, hash);
        }), Promise.resolve(null)));
    }
    lookupResourceWithoutHash(url) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initialized;
            const version = this.versions.get(this.latestHash);
            return version ? version.lookupResourceWithoutHash(url) : null;
        });
    }
    previouslyCachedResources() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initialized;
            const version = this.versions.get(this.latestHash);
            return version ? version.previouslyCachedResources() : [];
        });
    }
    recentCacheStatus(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const version = this.versions.get(this.latestHash);
            return version ? version.recentCacheStatus(url) : api_1.UpdateCacheStatus.NOT_CACHED;
        });
    }
    mergeHashWithAppData(manifest, hash) {
        return {
            hash,
            appData: manifest.appData,
        };
    }
    notifyClientsAboutUnrecoverableState(appVersion, reason) {
        return __awaiter(this, void 0, void 0, function* () {
            const broken = Array.from(this.versions.entries()).find(([hash, version]) => version === appVersion);
            if (broken === undefined) {
                // This version is no longer in use anyway, so nobody cares.
                return;
            }
            const brokenHash = broken[0];
            const affectedClients = Array.from(this.clientVersionMap.entries())
                .filter(([clientId, hash]) => hash === brokenHash)
                .map(([clientId]) => clientId);
            yield Promise.all(affectedClients.map((clientId) => __awaiter(this, void 0, void 0, function* () {
                const client = yield this.scope.clients.get(clientId);
                if (client) {
                    client.postMessage({ type: 'UNRECOVERABLE_STATE', reason });
                }
            })));
        });
    }
    notifyClientsAboutVersionInstallationFailed(manifest, hash, error) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initialized;
            const clients = yield this.scope.clients.matchAll();
            yield Promise.all(clients.map((client) => __awaiter(this, void 0, void 0, function* () {
                // Send a notice.
                client.postMessage({
                    type: 'VERSION_INSTALLATION_FAILED',
                    version: this.mergeHashWithAppData(manifest, hash),
                    error: (0, error_1.errorToString)(error),
                });
            })));
        });
    }
    notifyClientsAboutNoNewVersionDetected(manifest, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initialized;
            const clients = yield this.scope.clients.matchAll();
            yield Promise.all(clients.map((client) => __awaiter(this, void 0, void 0, function* () {
                // Send a notice.
                client.postMessage({
                    type: 'NO_NEW_VERSION_DETECTED',
                    version: this.mergeHashWithAppData(manifest, hash),
                });
            })));
        });
    }
    notifyClientsAboutVersionDetected(manifest, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initialized;
            const clients = yield this.scope.clients.matchAll();
            yield Promise.all(clients.map((client) => __awaiter(this, void 0, void 0, function* () {
                // Firstly, determine which version this client is on.
                const version = this.clientVersionMap.get(client.id);
                if (version === undefined) {
                    // Unmapped client - assume it's the latest.
                    return;
                }
                // Send a notice.
                client.postMessage({
                    type: 'VERSION_DETECTED',
                    version: this.mergeHashWithAppData(manifest, hash),
                });
            })));
        });
    }
    notifyClientsAboutVersionReady(manifest, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initialized;
            const clients = yield this.scope.clients.matchAll();
            yield Promise.all(clients.map((client) => __awaiter(this, void 0, void 0, function* () {
                // Firstly, determine which version this client is on.
                const version = this.clientVersionMap.get(client.id);
                if (version === undefined) {
                    // Unmapped client - assume it's the latest.
                    return;
                }
                if (version === this.latestHash) {
                    // Client is already on the latest version, no need for a notification.
                    return;
                }
                const current = this.versions.get(version);
                // Send a notice.
                const notice = {
                    type: 'VERSION_READY',
                    currentVersion: this.mergeHashWithAppData(current.manifest, version),
                    latestVersion: this.mergeHashWithAppData(manifest, hash),
                };
                client.postMessage(notice);
            })));
        });
    }
    broadcast(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            const clients = yield this.scope.clients.matchAll();
            clients.forEach((client) => {
                client.postMessage(msg);
            });
        });
    }
    debugState() {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                state: DriverReadyState[this.state],
                why: this.stateMessage,
                latestHash: this.latestHash,
                lastUpdateCheck: this.lastUpdateCheck,
            };
        });
    }
    debugVersions() {
        return __awaiter(this, void 0, void 0, function* () {
            // Build list of versions.
            return Array.from(this.versions.keys()).map((hash) => {
                const version = this.versions.get(hash);
                const clients = Array.from(this.clientVersionMap.entries())
                    .filter(([clientId, version]) => version === hash)
                    .map(([clientId, version]) => clientId);
                return {
                    hash,
                    manifest: version.manifest,
                    clients,
                    status: '',
                };
            });
        });
    }
    debugIdleState() {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                queue: this.idle.taskDescriptions,
                lastTrigger: this.idle.lastTrigger,
                lastRun: this.idle.lastRun,
            };
        });
    }
    safeFetch(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.scope.fetch(req);
            }
            catch (err) {
                this.debugger.log(err, `Driver.fetch(${req.url})`);
                return this.adapter.newResponse(null, {
                    status: 504,
                    statusText: 'Gateway Timeout',
                });
            }
        });
    }
    getCacheNames() {
        return __awaiter(this, void 0, void 0, function* () {
            const controlTable = (yield this.controlTable);
            const appVersions = Array.from(this.versions.values());
            const appVersionCacheNames = yield Promise.all(appVersions.map((version) => version.getCacheNames()));
            return [controlTable.cacheName].concat(...appVersionCacheNames);
        });
    }
}
exports.Driver = Driver;
