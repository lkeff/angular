"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.rxResource = rxResource;
const core_1 = require("../../src/core");
function rxResource(opts) {
    (opts === null || opts === void 0 ? void 0 : opts.injector) || (0, core_1.assertInInjectionContext)(rxResource);
    return (0, core_1.resource)(Object.assign(Object.assign({}, opts), { loader: undefined, stream: (params) => {
            var _a;
            let sub;
            // Track the abort listener so it can be removed if the Observable completes (as a memory
            // optimization).
            const onAbort = () => sub.unsubscribe();
            params.abortSignal.addEventListener('abort', onAbort);
            // Start off stream as undefined.
            const stream = (0, core_1.signal)({ value: undefined });
            let resolve;
            const promise = new Promise((r) => (resolve = r));
            function send(value) {
                stream.set(value);
                resolve === null || resolve === void 0 ? void 0 : resolve(stream);
                resolve = undefined;
            }
            // TODO(alxhub): remove after g3 updated to rename loader -> stream
            const streamFn = (_a = opts.stream) !== null && _a !== void 0 ? _a : opts.loader;
            if (streamFn === undefined) {
                throw new Error(`Must provide \`stream\` option.`);
            }
            sub = streamFn(params).subscribe({
                next: (value) => send({ value }),
                error: (error) => send({ error }),
                complete: () => {
                    if (resolve) {
                        send({ error: new Error('Resource completed before producing a value') });
                    }
                    params.abortSignal.removeEventListener('abort', onAbort);
                },
            });
            return promise;
        } }));
}
