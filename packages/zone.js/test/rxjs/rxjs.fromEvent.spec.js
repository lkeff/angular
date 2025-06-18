"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const utils_1 = require("../../lib/common/utils");
const test_util_1 = require("../test-util");
function isEventTarget() {
    return utils_1.isBrowser;
}
isEventTarget.message = 'EventTargetTest';
describe('Observable.fromEvent', () => {
    let log;
    const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
    const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
    const triggerZone = Zone.current.fork({ name: 'Trigger Zone' });
    let observable1;
    beforeEach(() => {
        log = [];
    });
    it('fromEvent EventTarget func callback should run in the correct zone', (0, test_util_1.ifEnvSupports)(isEventTarget, () => {
        observable1 = constructorZone1.run(() => {
            return (0, rxjs_1.fromEvent)(document, 'click');
        });
        const clickEvent = document.createEvent('Event');
        clickEvent.initEvent('click', true, true);
        subscriptionZone.run(() => {
            observable1.subscribe((result) => {
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                log.push(result);
            }, () => {
                fail('should not call error');
            }, () => {
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                log.push('completed');
            });
        });
        triggerZone.run(() => {
            document.dispatchEvent(clickEvent);
        });
        expect(log).toEqual([clickEvent]);
    }));
    it('fromEventPattern EventTarget func callback should run in the correct zone', (0, test_util_1.ifEnvSupports)(isEventTarget, () => {
        const button = document.createElement('button');
        document.body.appendChild(button);
        observable1 = constructorZone1.run(() => {
            return (0, rxjs_1.fromEventPattern)((handler) => {
                expect(Zone.current.name).toEqual(constructorZone1.name);
                button.addEventListener('click', handler);
                log.push('addListener');
            }, (handler) => {
                expect(Zone.current.name).toEqual(constructorZone1.name);
                button.removeEventListener('click', handler);
                document.body.removeChild(button);
                log.push('removeListener');
            });
        });
        const clickEvent = document.createEvent('Event');
        clickEvent.initEvent('click', false, false);
        const subscriper = subscriptionZone.run(() => {
            return observable1.subscribe((result) => {
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                log.push(result);
            }, () => {
                fail('should not call error');
            }, () => {
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                log.push('completed');
            });
        });
        triggerZone.run(() => {
            button.dispatchEvent(clickEvent);
            subscriper.complete();
        });
        expect(log).toEqual(['addListener', clickEvent, 'completed', 'removeListener']);
    }));
});
