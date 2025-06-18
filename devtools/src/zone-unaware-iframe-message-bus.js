"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoneUnawareIFrameMessageBus = void 0;
const protocol_1 = require("protocol");
const iframe_message_bus_1 = require("./iframe-message-bus");
const runOutsideAngular = (f) => {
    const w = window;
    if (!w.Zone || w.Zone.current._name !== 'angular') {
        f();
        return;
    }
    w.Zone.current._parent.run(f);
};
class ZoneUnawareIFrameMessageBus extends protocol_1.MessageBus {
    constructor(source, destination, docWindow) {
        super();
        this._delegate = new iframe_message_bus_1.IFrameMessageBus(source, destination, docWindow);
    }
    onAny(cb) {
        let result;
        runOutsideAngular(() => {
            result = this._delegate.onAny(cb);
        });
        return result;
    }
    on(topic, cb) {
        let result;
        runOutsideAngular(() => {
            result = this._delegate.on(topic, cb);
        });
        return result;
    }
    once(topic, cb) {
        let result;
        runOutsideAngular(() => {
            result = this._delegate.once(topic, cb);
        });
        return result;
    }
    // Need to be run in the zone because otherwise it won't be caught by the
    // listener in the extension.
    emit(topic, args) {
        return this._delegate.emit(topic, args);
    }
    destroy() {
        this._delegate.destroy();
    }
}
exports.ZoneUnawareIFrameMessageBus = ZoneUnawareIFrameMessageBus;
