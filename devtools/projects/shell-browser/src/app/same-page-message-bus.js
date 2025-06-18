"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SamePageMessageBus = void 0;
const protocol_1 = require("protocol");
class SamePageMessageBus extends protocol_1.MessageBus {
    constructor(_source, _destination) {
        super();
        this._source = _source;
        this._destination = _destination;
        this._listeners = [];
    }
    onAny(cb) {
        const listener = (e) => {
            if (e.source !== window || !e.data || !e.data.topic || e.data.source !== this._destination) {
                return;
            }
            cb(e.data.topic, e.data.args);
        };
        window.addEventListener('message', listener);
        this._listeners.push(listener);
        return () => {
            this._listeners.splice(this._listeners.indexOf(listener), 1);
            window.removeEventListener('message', listener);
        };
    }
    on(topic, cb) {
        const listener = (e) => {
            if (e.source !== window || !e.data || e.data.source !== this._destination || !e.data.topic) {
                return;
            }
            if (e.data.topic === topic) {
                cb.apply(null, e.data.args);
            }
        };
        window.addEventListener('message', listener);
        this._listeners.push(listener);
        return () => {
            this._listeners.splice(this._listeners.indexOf(listener), 1);
            window.removeEventListener('message', listener);
        };
    }
    once(topic, cb) {
        const listener = (e) => {
            if (e.source !== window || !e.data || e.data.source !== this._destination || !e.data.topic) {
                return;
            }
            if (e.data.topic === topic) {
                cb.apply(null, e.data.args);
            }
            window.removeEventListener('message', listener);
        };
        window.addEventListener('message', listener);
    }
    emit(topic, args) {
        window.postMessage({
            source: this._source,
            topic,
            args,
            __ignore_ng_zone__: true,
        }, '*');
        return true;
    }
    destroy() {
        this._listeners.forEach((l) => window.removeEventListener('message', l));
        this._listeners = [];
    }
}
exports.SamePageMessageBus = SamePageMessageBus;
