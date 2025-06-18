"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TRANSFER_STATE_SERIALIZATION_PROVIDERS = exports.TRANSFER_STATE_SERIALIZED_FOR_APPID = void 0;
exports.createScript = createScript;
exports.warnIfStateTransferHappened = warnIfStateTransferHappened;
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const tokens_1 = require("./tokens");
// Tracks whether the server-side application state for a given app ID has been serialized already.
exports.TRANSFER_STATE_SERIALIZED_FOR_APPID = new core_1.InjectionToken(typeof ngDevMode === 'undefined' || ngDevMode ? 'TRANSFER_STATE_SERIALIZED_FOR_APPID' : '', {
    providedIn: 'platform',
    factory: () => new Set(),
});
exports.TRANSFER_STATE_SERIALIZATION_PROVIDERS = [
    {
        provide: tokens_1.BEFORE_APP_SERIALIZED,
        useFactory: serializeTransferStateFactory,
        multi: true,
    },
];
/** TODO: Move this to a utils folder and convert to use SafeValues. */
function createScript(doc, textContent, nonce) {
    const script = doc.createElement('script');
    script.textContent = textContent;
    if (nonce) {
        script.setAttribute('nonce', nonce);
    }
    return script;
}
function warnIfStateTransferHappened(injector) {
    const appId = injector.get(core_1.APP_ID);
    const appIdsWithTransferStateSerialized = injector.get(exports.TRANSFER_STATE_SERIALIZED_FOR_APPID);
    if (appIdsWithTransferStateSerialized.has(appId)) {
        console.warn(`Angular detected an incompatible configuration, which causes duplicate serialization of the server-side application state.\n\n` +
            `This can happen if the server providers have been provided more than once using different mechanisms. For example:\n\n` +
            `  imports: [ServerModule], // Registers server providers\n` +
            `  providers: [provideServerRendering()] // Also registers server providers\n\n` +
            `To fix this, ensure that the \`provideServerRendering()\` function is the only provider used and remove the other(s).`);
    }
    appIdsWithTransferStateSerialized.add(appId);
}
function serializeTransferStateFactory() {
    const doc = (0, core_1.inject)(common_1.DOCUMENT);
    const appId = (0, core_1.inject)(core_1.APP_ID);
    const transferStore = (0, core_1.inject)(core_1.TransferState);
    const injector = (0, core_1.inject)(core_1.Injector);
    return () => {
        const measuringLabel = 'serializeTransferStateFactory';
        (0, core_1.ɵstartMeasuring)(measuringLabel);
        // The `.toJSON` here causes the `onSerialize` callbacks to be called.
        // These callbacks can be used to provide the value for a given key.
        const content = transferStore.toJson();
        if (transferStore.isEmpty) {
            // The state is empty, nothing to transfer,
            // avoid creating an extra `<script>` tag in this case.
            return;
        }
        if (typeof ngDevMode !== 'undefined' && ngDevMode) {
            warnIfStateTransferHappened(injector);
        }
        const script = createScript(doc, content, 
        /**
         * `nonce` is not required for 'application/json'
         * See: https://html.spec.whatwg.org/multipage/scripting.html#attr-script-type
         */
        null);
        script.id = appId + '-state';
        script.setAttribute('type', 'application/json');
        // It is intentional that we add the script at the very bottom. Angular CLI script tags for
        // bundles are always `type="module"`. These are deferred by default and cause the
        // transfer data to be queried only after the browser has finished parsing the DOM.
        doc.body.appendChild(script);
        (0, core_1.ɵstopMeasuring)(measuringLabel);
    };
}
