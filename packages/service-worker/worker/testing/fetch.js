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
exports.MockResponse = exports.MockRequest = exports.MockHeaders = exports.MockBody = void 0;
class MockBody {
    constructor(_body) {
        this._body = _body;
        this.bodyUsed = false;
    }
    arrayBuffer() {
        return __awaiter(this, void 0, void 0, function* () {
            const body = this.getBody();
            const buffer = new ArrayBuffer(body.length);
            const view = new Uint8Array(buffer);
            for (let i = 0; i < body.length; i++) {
                view[i] = body.charCodeAt(i);
            }
            return buffer;
        });
    }
    blob() {
        return __awaiter(this, void 0, void 0, function* () {
            throw 'Not implemented';
        });
    }
    json() {
        return __awaiter(this, void 0, void 0, function* () {
            return JSON.parse(this.getBody());
        });
    }
    text() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getBody();
        });
    }
    formData() {
        return __awaiter(this, void 0, void 0, function* () {
            throw 'Not implemented';
        });
    }
    bytes() {
        return __awaiter(this, void 0, void 0, function* () {
            throw 'Not implemented';
        });
    }
    getBody() {
        if (this.bodyUsed === true) {
            throw new Error('Cannot reuse body without cloning.');
        }
        this.bodyUsed = true;
        // According to the spec, a `null` body results in an empty `ReadableStream` (which for our
        // needs is equivalent to `''`). See https://fetch.spec.whatwg.org/#concept-body-consume-body.
        return this._body || '';
    }
}
exports.MockBody = MockBody;
class MockHeaders {
    constructor() {
        this.map = new Map();
    }
    [Symbol.iterator]() {
        return this.map[Symbol.iterator]();
    }
    append(name, value) {
        this.map.set(name.toLowerCase(), value);
    }
    delete(name) {
        this.map.delete(name.toLowerCase());
    }
    entries() {
        return this.map.entries();
    }
    forEach(callback) {
        this.map.forEach(callback);
    }
    get(name) {
        return this.map.get(name.toLowerCase()) || null;
    }
    has(name) {
        return this.map.has(name.toLowerCase());
    }
    keys() {
        return this.map.keys();
    }
    set(name, value) {
        this.map.set(name.toLowerCase(), value);
    }
    values() {
        return this.map.values();
    }
    getSetCookie() {
        return [];
    }
}
exports.MockHeaders = MockHeaders;
class MockRequest extends MockBody {
    constructor(input, init = {}) {
        var _a;
        super((_a = init.body) !== null && _a !== void 0 ? _a : null);
        this.isHistoryNavigation = false;
        this.isReloadNavigation = false;
        this.cache = 'default';
        this.credentials = 'same-origin';
        this.destination = 'document';
        this.headers = new MockHeaders();
        this.integrity = '';
        this.keepalive = true;
        this.method = 'GET';
        this.mode = 'cors';
        this.redirect = 'error';
        this.referrer = '';
        this.referrerPolicy = 'no-referrer';
        this.signal = null;
        if (typeof input !== 'string') {
            throw 'Not implemented';
        }
        this.url = input;
        const headers = init.headers;
        if (headers !== undefined) {
            if (headers instanceof MockHeaders) {
                this.headers = headers;
            }
            else {
                Object.keys(headers).forEach((header) => {
                    this.headers.set(header, headers[header]);
                });
            }
        }
        if (init.cache !== undefined) {
            this.cache = init.cache;
        }
        if (init.mode !== undefined) {
            this.mode = init.mode;
        }
        if (init.credentials !== undefined) {
            this.credentials = init.credentials;
        }
        if (init.method !== undefined) {
            this.method = init.method;
        }
        if (init.destination !== undefined) {
            this.destination = init.destination;
        }
    }
    clone() {
        if (this.bodyUsed) {
            throw 'Body already consumed';
        }
        return new MockRequest(this.url, {
            body: this._body,
            mode: this.mode,
            credentials: this.credentials,
            headers: this.headers,
        });
    }
}
exports.MockRequest = MockRequest;
class MockResponse extends MockBody {
    get ok() {
        return this.status >= 200 && this.status < 300;
    }
    constructor(body, init = {}) {
        super(typeof body === 'string' ? body : null);
        this.trailer = Promise.resolve(new MockHeaders());
        this.headers = new MockHeaders();
        this.type = 'basic';
        this.url = '';
        this.redirected = false;
        this.status = init.status !== undefined ? init.status : 200;
        this.statusText = init.statusText !== undefined ? init.statusText : 'OK';
        const headers = init.headers;
        if (headers !== undefined) {
            if (headers instanceof MockHeaders) {
                this.headers = headers;
            }
            else {
                Object.keys(headers).forEach((header) => {
                    this.headers.set(header, headers[header]);
                });
            }
        }
        if (init.type !== undefined) {
            this.type = init.type;
        }
        if (init.redirected !== undefined) {
            this.redirected = init.redirected;
        }
        if (init.url !== undefined) {
            this.url = init.url;
        }
    }
    clone() {
        if (this.bodyUsed) {
            throw 'Body already consumed';
        }
        return new MockResponse(this._body, {
            status: this.status,
            statusText: this.statusText,
            headers: this.headers,
            type: this.type,
            redirected: this.redirected,
            url: this.url,
        });
    }
}
exports.MockResponse = MockResponse;
