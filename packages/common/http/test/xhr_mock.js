"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockXMLHttpRequest = exports.MockXMLHttpRequestUpload = exports.MockXhrFactory = void 0;
const headers_1 = require("../src/headers");
class MockXhrFactory {
    build() {
        return (this.mock = new MockXMLHttpRequest());
    }
}
exports.MockXhrFactory = MockXhrFactory;
class MockXMLHttpRequestUpload {
    constructor(mock) {
        this.mock = mock;
    }
    addEventListener(event, handler) {
        this.mock.addEventListener('uploadProgress', handler);
    }
    removeEventListener(event, handler) {
        this.mock.removeEventListener('uploadProgress');
    }
}
exports.MockXMLHttpRequestUpload = MockXMLHttpRequestUpload;
class MockXMLHttpRequest {
    constructor() {
        this.mockHeaders = {};
        this.mockAborted = false;
        // Directly settable interface.
        this.withCredentials = false;
        this.responseType = 'text';
        // Mocked response interface.
        this.response = undefined;
        this.responseText = undefined;
        this.responseURL = null;
        this.status = 0;
        this.statusText = '';
        this.mockResponseHeaders = '';
        this.listeners = {};
        this.upload = new MockXMLHttpRequestUpload(this);
    }
    open(method, url) {
        this.method = method;
        this.url = url;
    }
    send(body) {
        this.body = body;
    }
    addEventListener(event, handler) {
        this.listeners[event] = handler;
    }
    removeEventListener(event) {
        delete this.listeners[event];
    }
    setRequestHeader(name, value) {
        this.mockHeaders[name] = value;
    }
    getAllResponseHeaders() {
        return this.mockResponseHeaders;
    }
    getResponseHeader(header) {
        return new headers_1.HttpHeaders(this.mockResponseHeaders).get(header);
    }
    mockFlush(status, statusText, body) {
        if (typeof body === 'string') {
            this.responseText = body;
        }
        else {
            this.response = body;
        }
        this.status = status;
        this.statusText = statusText;
        this.mockLoadEvent();
    }
    mockDownloadProgressEvent(loaded, total) {
        if (this.listeners.progress) {
            this.listeners.progress({ lengthComputable: total !== undefined, loaded, total });
        }
    }
    mockUploadProgressEvent(loaded, total) {
        if (this.listeners.uploadProgress) {
            this.listeners.uploadProgress({
                lengthComputable: total !== undefined,
                loaded,
                total,
            });
        }
    }
    mockLoadEvent() {
        if (this.listeners.load) {
            this.listeners.load();
        }
    }
    mockErrorEvent(error) {
        if (this.listeners.error) {
            this.listeners.error(error);
        }
    }
    mockTimeoutEvent(error) {
        if (this.listeners.timeout) {
            this.listeners.timeout(error);
        }
    }
    mockAbortEvent() {
        if (this.listeners.abort) {
            this.listeners.abort();
        }
    }
    abort() {
        this.mockAborted = true;
    }
}
exports.MockXMLHttpRequest = MockXMLHttpRequest;
