"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferState = void 0;
exports.makeStateKey = makeStateKey;
const application_tokens_1 = require("./application/application_tokens");
const injector_compatibility_1 = require("./di/injector_compatibility");
const defs_1 = require("./di/interface/defs");
const document_1 = require("./render3/interfaces/document");
/**
 * Create a `StateKey<T>` that can be used to store value of type T with `TransferState`.
 *
 * Example:
 *
 * ```ts
 * const COUNTER_KEY = makeStateKey<number>('counter');
 * let value = 10;
 *
 * transferState.set(COUNTER_KEY, value);
 * ```
 *
 * @publicApi
 */
function makeStateKey(key) {
    return key;
}
function initTransferState() {
    const transferState = new TransferState();
    if (typeof ngServerMode === 'undefined' || !ngServerMode) {
        transferState.store = retrieveTransferredState((0, document_1.getDocument)(), (0, injector_compatibility_1.inject)(application_tokens_1.APP_ID));
    }
    return transferState;
}
/**
 * A key value store that is transferred from the application on the server side to the application
 * on the client side.
 *
 * The `TransferState` is available as an injectable token.
 * On the client, just inject this token using DI and use it, it will be lazily initialized.
 * On the server it's already included if `renderApplication` function is used. Otherwise, import
 * the `ServerTransferStateModule` module to make the `TransferState` available.
 *
 * The values in the store are serialized/deserialized using JSON.stringify/JSON.parse. So only
 * boolean, number, string, null and non-class objects will be serialized and deserialized in a
 * non-lossy manner.
 *
 * @publicApi
 */
class TransferState {
    constructor() {
        /** @internal */
        this.store = {};
        this.onSerializeCallbacks = {};
    }
    /**
     * Get the value corresponding to a key. Return `defaultValue` if key is not found.
     */
    get(key, defaultValue) {
        return this.store[key] !== undefined ? this.store[key] : defaultValue;
    }
    /**
     * Set the value corresponding to a key.
     */
    set(key, value) {
        this.store[key] = value;
    }
    /**
     * Remove a key from the store.
     */
    remove(key) {
        delete this.store[key];
    }
    /**
     * Test whether a key exists in the store.
     */
    hasKey(key) {
        return this.store.hasOwnProperty(key);
    }
    /**
     * Indicates whether the state is empty.
     */
    get isEmpty() {
        return Object.keys(this.store).length === 0;
    }
    /**
     * Register a callback to provide the value for a key when `toJson` is called.
     */
    onSerialize(key, callback) {
        this.onSerializeCallbacks[key] = callback;
    }
    /**
     * Serialize the current state of the store to JSON.
     */
    toJson() {
        // Call the onSerialize callbacks and put those values into the store.
        for (const key in this.onSerializeCallbacks) {
            if (this.onSerializeCallbacks.hasOwnProperty(key)) {
                try {
                    this.store[key] = this.onSerializeCallbacks[key]();
                }
                catch (e) {
                    console.warn('Exception in onSerialize callback: ', e);
                }
            }
        }
        // Escape script tag to avoid break out of <script> tag in serialized output.
        // Encoding of `<` is the same behaviour as G3 script_builders.
        return JSON.stringify(this.store).replace(/</g, '\\u003C');
    }
}
exports.TransferState = TransferState;
/** @nocollapse */
TransferState.ɵprov = (0, defs_1.ɵɵdefineInjectable)({
    token: TransferState,
    providedIn: 'root',
    factory: initTransferState,
});
function retrieveTransferredState(doc, appId) {
    // Locate the script tag with the JSON data transferred from the server.
    // The id of the script tag is set to the Angular appId + 'state'.
    const script = doc.getElementById(appId + '-state');
    if (script === null || script === void 0 ? void 0 : script.textContent) {
        try {
            // Avoid using any here as it triggers lint errors in google3 (any is not allowed).
            // Decoding of `<` is done of the box by browsers and node.js, same behaviour as G3
            // script_builders.
            return JSON.parse(script.textContent);
        }
        catch (e) {
            console.warn('Exception while restoring TransferState for app ' + appId, e);
        }
    }
    return {};
}
