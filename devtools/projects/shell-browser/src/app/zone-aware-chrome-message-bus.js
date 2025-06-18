"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoneAwareChromeMessageBus = void 0;
const protocol_1 = require("protocol");
const chrome_message_bus_1 = require("./chrome-message-bus");
class ZoneAwareChromeMessageBus extends protocol_1.MessageBus {
    constructor(port, _ngZone) {
        super();
        this._ngZone = _ngZone;
        this._bus = new chrome_message_bus_1.ChromeMessageBus(port);
    }
    on(topic, cb) {
        this._bus.on(topic, function () {
            this._ngZone.run(() => cb.apply(null, arguments));
        }.bind(this));
    }
    once(topic, cb) {
        this._bus.once(topic, function () {
            this._ngZone.run(() => cb.apply(null, arguments));
        }.bind(this));
    }
    emit(topic, args) {
        this._ngZone.run(() => this._bus.emit(topic, args));
        return true;
    }
    destroy() {
        this._bus.destroy();
    }
}
exports.ZoneAwareChromeMessageBus = ZoneAwareChromeMessageBus;
