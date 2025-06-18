"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChromeMessageBus = void 0;
/// <reference types="chrome"/>
const protocol_1 = require("protocol");
class ChromeMessageBus extends protocol_1.MessageBus {
    constructor(_port) {
        super();
        this._port = _port;
        this._disconnected = false;
        this._listeners = [];
        _port.onDisconnect.addListener(() => {
            // console.log('Disconnected the port');
            this._disconnected = true;
        });
    }
    onAny(cb) {
        const listener = (msg) => {
            cb(msg.topic, msg.args);
        };
        this._port.onMessage.addListener(listener);
        this._listeners.push(listener);
        return () => {
            this._listeners.splice(this._listeners.indexOf(listener), 1);
            this._port.onMessage.removeListener(listener);
        };
    }
    on(topic, cb) {
        const listener = (msg) => {
            if (msg.topic === topic) {
                cb.apply(null, msg.args);
            }
        };
        this._port.onMessage.addListener(listener);
        this._listeners.push(listener);
        return () => {
            this._listeners.splice(this._listeners.indexOf(listener), 1);
            this._port.onMessage.removeListener(listener);
        };
    }
    once(topic, cb) {
        const listener = (msg) => {
            if (msg.topic === topic) {
                cb.apply(null, msg.args);
                this._port.onMessage.removeListener(listener);
            }
        };
        this._port.onMessage.addListener(listener);
    }
    emit(topic, args) {
        if (this._disconnected) {
            return false;
        }
        this._port.postMessage({
            topic,
            args,
            __ignore_ng_zone__: true,
        });
        return true;
    }
    destroy() {
        this._listeners.forEach((l) => window.removeEventListener('message', l));
        this._listeners = [];
    }
}
exports.ChromeMessageBus = ChromeMessageBus;
