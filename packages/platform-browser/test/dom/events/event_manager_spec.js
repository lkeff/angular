"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@angular/common");
const ng_zone_1 = require("@angular/core/src/zone/ng_zone");
const dom_events_1 = require("../../../src/dom/events/dom_events");
const event_manager_1 = require("../../../src/dom/events/event_manager");
const browser_util_1 = require("../../../testing/src/browser_util");
const testing_1 = require("@angular/core/testing");
(function () {
    if (isNode)
        return;
    let domEventPlugin;
    let doc;
    let zone;
    const { runInInjectionContext } = testing_1.TestBed;
    describe('EventManager', () => {
        beforeEach(() => {
            doc = (0, common_1.ɵgetDOM)().supportsDOMEvents ? document : (0, common_1.ɵgetDOM)().createHtmlDocument();
            zone = new ng_zone_1.NgZone({});
            runInInjectionContext(() => {
                domEventPlugin = new dom_events_1.DomEventsPlugin(doc);
            });
        });
        it('should delegate event bindings to plugins that are passed in from the most generic one to the most specific one', () => {
            const element = (0, browser_util_1.el)('<div></div>');
            const handler = (e) => e;
            const plugin = new FakeEventManagerPlugin(doc, ['click']);
            const manager = new event_manager_1.EventManager([domEventPlugin, plugin], new FakeNgZone());
            manager.addEventListener(element, 'click', handler);
            expect(plugin.eventHandler['click']).toBe(handler);
        });
        it('should delegate event bindings to the first plugin supporting the event', () => {
            const element = (0, browser_util_1.el)('<div></div>');
            const clickHandler = (e) => e;
            const dblClickHandler = (e) => e;
            const plugin1 = new FakeEventManagerPlugin(doc, ['dblclick']);
            const plugin2 = new FakeEventManagerPlugin(doc, ['click', 'dblclick']);
            const manager = new event_manager_1.EventManager([plugin2, plugin1], new FakeNgZone());
            manager.addEventListener(element, 'click', clickHandler);
            manager.addEventListener(element, 'dblclick', dblClickHandler);
            expect(plugin2.eventHandler['click']).toBe(clickHandler);
            expect(plugin1.eventHandler['dblclick']).toBe(dblClickHandler);
        });
        it('should throw when no plugin can handle the event', () => {
            const element = (0, browser_util_1.el)('<div></div>');
            const plugin = new FakeEventManagerPlugin(doc, ['dblclick']);
            const manager = new event_manager_1.EventManager([plugin], new FakeNgZone());
            expect(() => manager.addEventListener(element, 'click', null)).toThrowError('NG05101: No event manager plugin found for event click');
        });
        it('events are caught when fired from a child', () => {
            const element = (0, browser_util_1.el)('<div><div></div></div>');
            // Workaround for https://bugs.webkit.org/show_bug.cgi?id=122755
            doc.body.appendChild(element);
            const child = element.firstChild;
            const dispatchedEvent = (0, browser_util_1.createMouseEvent)('click');
            let receivedEvent;
            const handler = (e) => {
                receivedEvent = e;
            };
            const manager = new event_manager_1.EventManager([domEventPlugin], new FakeNgZone());
            manager.addEventListener(element, 'click', handler);
            (0, common_1.ɵgetDOM)().dispatchEvent(child, dispatchedEvent);
            expect(receivedEvent).toBe(dispatchedEvent);
        });
        it('should keep zone when addEventListener', () => {
            const Zone = window['Zone'];
            const element = (0, browser_util_1.el)('<div><div></div></div>');
            doc.body.appendChild(element);
            const dispatchedEvent = (0, browser_util_1.createMouseEvent)('click');
            let receivedEvent;
            let receivedZone;
            const handler = (e) => {
                receivedEvent = e;
                receivedZone = Zone.current;
            };
            const manager = new event_manager_1.EventManager([domEventPlugin], new FakeNgZone());
            let remover;
            Zone.root.run(() => {
                remover = manager.addEventListener(element, 'click', handler);
            });
            (0, common_1.ɵgetDOM)().dispatchEvent(element, dispatchedEvent);
            expect(receivedEvent).toBe(dispatchedEvent);
            expect(receivedZone === null || receivedZone === void 0 ? void 0 : receivedZone.name).toBe(Zone.root.name);
            receivedEvent = undefined;
            remover === null || remover === void 0 ? void 0 : remover();
            (0, common_1.ɵgetDOM)().dispatchEvent(element, dispatchedEvent);
            expect(receivedEvent).toBe(undefined);
        });
        it('should keep zone when addEventListener multiple times', () => {
            const Zone = window['Zone'];
            const element = (0, browser_util_1.el)('<div><div></div></div>');
            doc.body.appendChild(element);
            const dispatchedEvent = (0, browser_util_1.createMouseEvent)('click');
            let receivedEvents = [];
            let receivedZones = [];
            const handler1 = (e) => {
                receivedEvents.push(e);
                receivedZones.push(Zone.current.name);
            };
            const handler2 = (e) => {
                receivedEvents.push(e);
                receivedZones.push(Zone.current.name);
            };
            const manager = new event_manager_1.EventManager([domEventPlugin], new FakeNgZone());
            let remover1;
            let remover2;
            Zone.root.run(() => {
                remover1 = manager.addEventListener(element, 'click', handler1);
            });
            Zone.root.fork({ name: 'test' }).run(() => {
                remover2 = manager.addEventListener(element, 'click', handler2);
            });
            (0, common_1.ɵgetDOM)().dispatchEvent(element, dispatchedEvent);
            expect(receivedEvents).toEqual([dispatchedEvent, dispatchedEvent]);
            expect(receivedZones).toEqual([Zone.root.name, 'test']);
            receivedEvents = [];
            remover1 === null || remover1 === void 0 ? void 0 : remover1();
            remover2 === null || remover2 === void 0 ? void 0 : remover2();
            (0, common_1.ɵgetDOM)().dispatchEvent(element, dispatchedEvent);
            expect(receivedEvents).toEqual([]);
        });
        it('should support event.stopImmediatePropagation', () => {
            const Zone = window['Zone'];
            const element = (0, browser_util_1.el)('<div><div></div></div>');
            doc.body.appendChild(element);
            const dispatchedEvent = (0, browser_util_1.createMouseEvent)('click');
            let receivedEvents = [];
            let receivedZones = [];
            const handler1 = (e) => {
                receivedEvents.push(e);
                receivedZones.push(Zone.current.name);
                e.stopImmediatePropagation();
            };
            const handler2 = (e) => {
                receivedEvents.push(e);
                receivedZones.push(Zone.current.name);
            };
            const manager = new event_manager_1.EventManager([domEventPlugin], new FakeNgZone());
            let remover1;
            let remover2;
            Zone.root.run(() => {
                remover1 = manager.addEventListener(element, 'click', handler1);
            });
            Zone.root.fork({ name: 'test' }).run(() => {
                remover2 = manager.addEventListener(element, 'click', handler2);
            });
            (0, common_1.ɵgetDOM)().dispatchEvent(element, dispatchedEvent);
            expect(receivedEvents).toEqual([dispatchedEvent]);
            expect(receivedZones).toEqual([Zone.root.name]);
            receivedEvents = [];
            remover1 === null || remover1 === void 0 ? void 0 : remover1();
            remover2 === null || remover2 === void 0 ? void 0 : remover2();
            (0, common_1.ɵgetDOM)().dispatchEvent(element, dispatchedEvent);
            expect(receivedEvents).toEqual([]);
        });
        it('should handle event correctly when one handler remove itself ', () => {
            const Zone = window['Zone'];
            const element = (0, browser_util_1.el)('<div><div></div></div>');
            doc.body.appendChild(element);
            const dispatchedEvent = (0, browser_util_1.createMouseEvent)('click');
            let receivedEvents = [];
            let receivedZones = [];
            let remover1;
            let remover2;
            const handler1 = (e) => {
                receivedEvents.push(e);
                receivedZones.push(Zone.current.name);
                remover1 && remover1();
            };
            const handler2 = (e) => {
                receivedEvents.push(e);
                receivedZones.push(Zone.current.name);
            };
            const manager = new event_manager_1.EventManager([domEventPlugin], new FakeNgZone());
            Zone.root.run(() => {
                remover1 = manager.addEventListener(element, 'click', handler1);
            });
            Zone.root.fork({ name: 'test' }).run(() => {
                remover2 = manager.addEventListener(element, 'click', handler2);
            });
            (0, common_1.ɵgetDOM)().dispatchEvent(element, dispatchedEvent);
            expect(receivedEvents).toEqual([dispatchedEvent, dispatchedEvent]);
            expect(receivedZones).toEqual([Zone.root.name, 'test']);
            receivedEvents = [];
            remover1 === null || remover1 === void 0 ? void 0 : remover1();
            remover2 === null || remover2 === void 0 ? void 0 : remover2();
            (0, common_1.ɵgetDOM)().dispatchEvent(element, dispatchedEvent);
            expect(receivedEvents).toEqual([]);
        });
        it('should only add same callback once when addEventListener', () => {
            const Zone = window['Zone'];
            const element = (0, browser_util_1.el)('<div><div></div></div>');
            doc.body.appendChild(element);
            const dispatchedEvent = (0, browser_util_1.createMouseEvent)('click');
            let receivedEvents = [];
            let receivedZones = [];
            const handler = (e) => {
                receivedEvents.push(e);
                receivedZones.push(Zone.current.name);
            };
            const manager = new event_manager_1.EventManager([domEventPlugin], new FakeNgZone());
            let remover1;
            let remover2;
            Zone.root.run(() => {
                remover1 = manager.addEventListener(element, 'click', handler);
            });
            Zone.root.fork({ name: 'test' }).run(() => {
                remover2 = manager.addEventListener(element, 'click', handler);
            });
            (0, common_1.ɵgetDOM)().dispatchEvent(element, dispatchedEvent);
            expect(receivedEvents).toEqual([dispatchedEvent]);
            expect(receivedZones).toEqual([Zone.root.name]);
            receivedEvents = [];
            remover1 === null || remover1 === void 0 ? void 0 : remover1();
            remover2 === null || remover2 === void 0 ? void 0 : remover2();
            (0, common_1.ɵgetDOM)().dispatchEvent(element, dispatchedEvent);
            expect(receivedEvents).toEqual([]);
        });
        it('should be able to remove event listener which was added inside of ngZone', () => {
            const Zone = window['Zone'];
            const element = (0, browser_util_1.el)('<div><div></div></div>');
            doc.body.appendChild(element);
            const dispatchedEvent = (0, browser_util_1.createMouseEvent)('click');
            let receivedEvents = [];
            let receivedZones = [];
            const handler1 = (e) => {
                receivedEvents.push(e);
                receivedZones.push(Zone.current.name);
            };
            const handler2 = (e) => {
                receivedEvents.push(e);
                receivedZones.push(Zone.current.name);
            };
            const manager = new event_manager_1.EventManager([domEventPlugin], new FakeNgZone());
            let remover1;
            let remover2;
            // handler1 is added in root zone
            Zone.root.run(() => {
                remover1 = manager.addEventListener(element, 'click', handler1);
            });
            // handler2 is added in 'angular' zone
            Zone.root.fork({ name: 'fakeAngularZone', properties: { isAngularZone: true } }).run(() => {
                remover2 = manager.addEventListener(element, 'click', handler2);
            });
            (0, common_1.ɵgetDOM)().dispatchEvent(element, dispatchedEvent);
            expect(receivedEvents).toEqual([dispatchedEvent, dispatchedEvent]);
            expect(receivedZones).toEqual([Zone.root.name, 'fakeAngularZone']);
            receivedEvents = [];
            remover1 === null || remover1 === void 0 ? void 0 : remover1();
            remover2 === null || remover2 === void 0 ? void 0 : remover2();
            (0, common_1.ɵgetDOM)().dispatchEvent(element, dispatchedEvent);
            // handler1 and handler2 are added in different zone
            // one is angular zone, the other is not
            // should still be able to remove them correctly
            expect(receivedEvents).toEqual([]);
        });
        // This test is reliant on `zone_event_unpatched_init.js` and verifies
        // that the Zone unpatched event setting applies to the event manager.
        it('should run unpatchedEvents handler outside of ngZone', () => {
            const element = (0, browser_util_1.el)('<div><div></div></div>');
            const zone = new ng_zone_1.NgZone({ enableLongStackTrace: true });
            const manager = new event_manager_1.EventManager([domEventPlugin], zone);
            let timeoutId = null;
            doc.body.appendChild(element);
            // Register the event listener in the Angular zone. If the handler would be
            // patched then, the Zone should propagate into the listener callback.
            zone.run(() => {
                manager.addEventListener(element, 'unpatchedEventManagerTest', () => {
                    // schedule some timer that would cause the zone to become unstable. if the event
                    // handler would be patched, `hasPendingMacrotasks` would be `true`.
                    timeoutId = setTimeout(() => { }, 9999999);
                });
            });
            expect(zone.hasPendingMacrotasks).toBe(false);
            (0, common_1.ɵgetDOM)().dispatchEvent(element, (0, browser_util_1.createMouseEvent)('unpatchedEventManagerTest'));
            expect(zone.hasPendingMacrotasks).toBe(false);
            expect(timeoutId).not.toBe(null);
            // cleanup the DOM by removing the test element we attached earlier.
            element.remove();
            timeoutId && clearTimeout(timeoutId);
        });
        it('should only trigger one Change detection when bubbling with shouldCoalesceEventChangeDetection = true', (done) => {
            doc = (0, common_1.ɵgetDOM)().supportsDOMEvents ? document : (0, common_1.ɵgetDOM)().createHtmlDocument();
            zone = new ng_zone_1.NgZone({ shouldCoalesceEventChangeDetection: true });
            runInInjectionContext(() => {
                domEventPlugin = new dom_events_1.DomEventsPlugin(doc);
            });
            const element = (0, browser_util_1.el)('<div></div>');
            const child = (0, browser_util_1.el)('<div></div>');
            element.appendChild(child);
            doc.body.appendChild(element);
            const dispatchedEvent = (0, browser_util_1.createMouseEvent)('click');
            let receivedEvents = [];
            let stables = [];
            const handler = (e) => {
                receivedEvents.push(e);
            };
            const manager = new event_manager_1.EventManager([domEventPlugin], zone);
            let removerChild;
            let removerParent;
            zone.run(() => {
                removerChild = manager.addEventListener(child, 'click', handler);
                removerParent = manager.addEventListener(element, 'click', handler);
            });
            zone.onStable.subscribe((isStable) => {
                stables.push(isStable);
            });
            (0, common_1.ɵgetDOM)().dispatchEvent(child, dispatchedEvent);
            requestAnimationFrame(() => {
                expect(receivedEvents.length).toBe(2);
                expect(stables.length).toBe(1);
                removerChild && removerChild();
                removerParent && removerParent();
                done();
            });
        });
        it('should only trigger one Change detection when bubbling with shouldCoalesceRunChangeDetection = true', (done) => {
            doc = (0, common_1.ɵgetDOM)().supportsDOMEvents ? document : (0, common_1.ɵgetDOM)().createHtmlDocument();
            zone = new ng_zone_1.NgZone({ shouldCoalesceRunChangeDetection: true });
            runInInjectionContext(() => {
                domEventPlugin = new dom_events_1.DomEventsPlugin(doc);
            });
            const element = (0, browser_util_1.el)('<div></div>');
            const child = (0, browser_util_1.el)('<div></div>');
            element.appendChild(child);
            doc.body.appendChild(element);
            const dispatchedEvent = (0, browser_util_1.createMouseEvent)('click');
            let receivedEvents = [];
            let stables = [];
            const handler = (e) => {
                receivedEvents.push(e);
            };
            const manager = new event_manager_1.EventManager([domEventPlugin], zone);
            let removerChild;
            let removerParent;
            zone.run(() => {
                removerChild = manager.addEventListener(child, 'click', handler);
                removerParent = manager.addEventListener(element, 'click', handler);
            });
            zone.onStable.subscribe((isStable) => {
                stables.push(isStable);
            });
            (0, common_1.ɵgetDOM)().dispatchEvent(child, dispatchedEvent);
            requestAnimationFrame(() => {
                expect(receivedEvents.length).toBe(2);
                expect(stables.length).toBe(1);
                removerChild && removerChild();
                removerParent && removerParent();
                done();
            });
        });
        it('should not drain micro tasks queue too early with shouldCoalesceEventChangeDetection=true', (done) => {
            doc = (0, common_1.ɵgetDOM)().supportsDOMEvents ? document : (0, common_1.ɵgetDOM)().createHtmlDocument();
            zone = new ng_zone_1.NgZone({ shouldCoalesceEventChangeDetection: true });
            runInInjectionContext(() => {
                domEventPlugin = new dom_events_1.DomEventsPlugin(doc);
            });
            const element = (0, browser_util_1.el)('<div></div>');
            const child = (0, browser_util_1.el)('<div></div>');
            doc.body.appendChild(element);
            const dispatchedClickEvent = (0, browser_util_1.createMouseEvent)('click');
            const dispatchedBlurEvent = (0, common_1.ɵgetDOM)()
                .getDefaultDocument()
                .createEvent('FocusEvent');
            dispatchedBlurEvent.initEvent('blur', true, true);
            let logs = [];
            const handler = () => { };
            const blurHandler = (e) => {
                logs.push('blur');
            };
            const manager = new event_manager_1.EventManager([domEventPlugin], zone);
            let removerParent;
            let removerChildFocus;
            zone.run(() => {
                removerParent = manager.addEventListener(element, 'click', handler);
                removerChildFocus = manager.addEventListener(child, 'blur', blurHandler);
            });
            const sub = zone.onStable.subscribe(() => {
                sub.unsubscribe();
                logs.push('begin');
                queueMicrotask(() => {
                    logs.push('promise resolved');
                });
                element.appendChild(child);
                (0, common_1.ɵgetDOM)().dispatchEvent(child, dispatchedBlurEvent);
                logs.push('end');
            });
            (0, common_1.ɵgetDOM)().dispatchEvent(element, dispatchedClickEvent);
            requestAnimationFrame(() => {
                expect(logs).toEqual(['begin', 'blur', 'end', 'promise resolved']);
                removerParent();
                removerChildFocus();
                done();
            });
        });
        it('should not drain micro tasks queue too early with shouldCoalesceRunChangeDetection=true', (done) => {
            doc = (0, common_1.ɵgetDOM)().supportsDOMEvents ? document : (0, common_1.ɵgetDOM)().createHtmlDocument();
            zone = new ng_zone_1.NgZone({ shouldCoalesceRunChangeDetection: true });
            runInInjectionContext(() => {
                domEventPlugin = new dom_events_1.DomEventsPlugin(doc);
            });
            const element = (0, browser_util_1.el)('<div></div>');
            const child = (0, browser_util_1.el)('<div></div>');
            doc.body.appendChild(element);
            const dispatchedClickEvent = (0, browser_util_1.createMouseEvent)('click');
            const dispatchedBlurEvent = (0, common_1.ɵgetDOM)()
                .getDefaultDocument()
                .createEvent('FocusEvent');
            dispatchedBlurEvent.initEvent('blur', true, true);
            let logs = [];
            const handler = () => { };
            const blurHandler = (e) => {
                logs.push('blur');
            };
            const manager = new event_manager_1.EventManager([domEventPlugin], zone);
            let removerParent;
            let removerChildFocus;
            zone.run(() => {
                removerParent = manager.addEventListener(element, 'click', handler);
                removerChildFocus = manager.addEventListener(child, 'blur', blurHandler);
            });
            const sub = zone.onStable.subscribe(() => {
                sub.unsubscribe();
                logs.push('begin');
                queueMicrotask(() => {
                    logs.push('promise resolved');
                });
                element.appendChild(child);
                (0, common_1.ɵgetDOM)().dispatchEvent(child, dispatchedBlurEvent);
                logs.push('end');
            });
            (0, common_1.ɵgetDOM)().dispatchEvent(element, dispatchedClickEvent);
            requestAnimationFrame(() => {
                expect(logs).toEqual(['begin', 'blur', 'end', 'promise resolved']);
                removerParent && removerParent();
                removerChildFocus && removerChildFocus();
                done();
            });
        });
    });
})();
/** @internal */
class FakeEventManagerPlugin extends event_manager_1.EventManagerPlugin {
    constructor(doc, supportedEvents) {
        super(doc);
        this.supportedEvents = supportedEvents;
        this.eventHandler = {};
    }
    supports(eventName) {
        return this.supportedEvents.indexOf(eventName) > -1;
    }
    addEventListener(element, eventName, handler) {
        this.eventHandler[eventName] = handler;
        return () => {
            delete this.eventHandler[eventName];
        };
    }
}
class FakeNgZone extends ng_zone_1.NgZone {
    constructor() {
        super({ enableLongStackTrace: false, shouldCoalesceEventChangeDetection: true });
    }
    run(fn, applyThis, applyArgs) {
        return fn();
    }
    runOutsideAngular(fn) {
        return fn();
    }
}
