"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const message_bus_1 = require("./message-bus");
const priority_aware_message_bus_1 = require("./priority-aware-message-bus");
class MockMessageBus extends message_bus_1.MessageBus {
    constructor() {
        super(...arguments);
        this.cbs = {};
    }
    emit(_, __) {
        return true;
    }
    on(topic, cb) {
        this.cbs[topic] = cb;
    }
    once(topic, cb) {
        this.cbs[topic] = cb;
    }
    destroy() { }
}
describe('PriorityAwareMessageBus', () => {
    it('should emit not throttled requests', () => {
        const timeout = (_, __) => { };
        const bus = new priority_aware_message_bus_1.PriorityAwareMessageBus(new MockMessageBus(), timeout);
        expect(bus.emit('handshake')).toBeTrue();
        expect(bus.emit('inspectorStart')).toBeTrue();
    });
    it('should throttle `getLatestComponentExplorerView`', () => {
        let callback;
        const timeout = (cb, _) => {
            callback = cb;
        };
        const bus = new priority_aware_message_bus_1.PriorityAwareMessageBus(new MockMessageBus(), timeout);
        expect(bus.emit('getLatestComponentExplorerView')).toBeTrue();
        expect(bus.emit('getLatestComponentExplorerView')).toBeFalse();
        expect(bus.emit('getLatestComponentExplorerView')).toBeFalse();
        callback();
        expect(bus.emit('getLatestComponentExplorerView')).toBeTrue();
    });
    it('should not emit `getLatestComponentExplorerView` if blocked by `getNestedProperties`', () => {
        let callback;
        const timeout = (cb, _) => {
            callback = cb;
        };
        const mock = new MockMessageBus();
        const bus = new priority_aware_message_bus_1.PriorityAwareMessageBus(mock, timeout);
        bus.on('nestedProperties', () => { });
        expect(bus.emit('getNestedProperties')).toBeTrue();
        expect(bus.emit('getLatestComponentExplorerView')).toBeFalse();
        mock.cbs.nestedProperties();
        expect(bus.emit('getLatestComponentExplorerView')).toBeTruthy();
    });
});
