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
const testing_1 = require("@angular/core/testing");
const index_1 = require("../index");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const events_1 = require("../src/events");
const router_scroller_1 = require("../src/router_scroller");
const core_1 = require("@angular/core");
const helpers_1 = require("./helpers");
// TODO: add tests that exercise the `withInMemoryScrolling` feature of the provideRouter function
describe('RouterScroller', () => {
    it('defaults to disabled', () => {
        const events = new rxjs_1.Subject();
        const viewportScroller = jasmine.createSpyObj('viewportScroller', [
            'getScrollPosition',
            'scrollToPosition',
            'scrollToAnchor',
            'setHistoryScrollRestoration',
        ]);
        setScroll(viewportScroller, 0, 0);
        const scroller = testing_1.TestBed.runInInjectionContext(() => new router_scroller_1.RouterScroller(new index_1.DefaultUrlSerializer(), { events }, viewportScroller, new core_1.ɵNoopNgZone()));
        expect(scroller.options.scrollPositionRestoration).toBe('disabled');
        expect(scroller.options.anchorScrolling).toBe('disabled');
    });
    function nextScrollEvent(events) {
        return events
            .pipe((0, operators_1.filter)((e) => e instanceof events_1.Scroll), (0, operators_1.take)(1))
            .toPromise();
    }
    describe('scroll to top', () => {
        it('should scroll to the top', () => __awaiter(void 0, void 0, void 0, function* () {
            const { events, viewportScroller } = createRouterScroller({
                scrollPositionRestoration: 'top',
                anchorScrolling: 'disabled',
            });
            events.next(new index_1.NavigationStart(1, '/a'));
            events.next(new index_1.NavigationEnd(1, '/a', '/a'));
            yield nextScrollEvent(events);
            expect(viewportScroller.scrollToPosition).toHaveBeenCalledWith([0, 0]);
            events.next(new index_1.NavigationStart(2, '/a'));
            events.next(new index_1.NavigationEnd(2, '/b', '/b'));
            yield nextScrollEvent(events);
            expect(viewportScroller.scrollToPosition).toHaveBeenCalledWith([0, 0]);
            events.next(new index_1.NavigationStart(3, '/a', 'popstate'));
            events.next(new index_1.NavigationEnd(3, '/a', '/a'));
            yield nextScrollEvent(events);
            expect(viewportScroller.scrollToPosition).toHaveBeenCalledWith([0, 0]);
        }));
    });
    describe('scroll to the stored position', () => {
        it('should scroll to the stored position on popstate', () => __awaiter(void 0, void 0, void 0, function* () {
            const { events, viewportScroller } = createRouterScroller({
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'disabled',
            });
            events.next(new index_1.NavigationStart(1, '/a'));
            events.next(new index_1.NavigationEnd(1, '/a', '/a'));
            yield nextScrollEvent(events);
            setScroll(viewportScroller, 10, 100);
            expect(viewportScroller.scrollToPosition).toHaveBeenCalledWith([0, 0]);
            events.next(new index_1.NavigationStart(2, '/b'));
            events.next(new index_1.NavigationEnd(2, '/b', '/b'));
            yield nextScrollEvent(events);
            setScroll(viewportScroller, 20, 200);
            expect(viewportScroller.scrollToPosition).toHaveBeenCalledWith([0, 0]);
            events.next(new index_1.NavigationStart(3, '/a', 'popstate', { navigationId: 1 }));
            events.next(new index_1.NavigationEnd(3, '/a', '/a'));
            yield nextScrollEvent(events);
            expect(viewportScroller.scrollToPosition).toHaveBeenCalledWith([10, 100]);
        }));
    });
    describe('anchor scrolling', () => {
        it('should work (scrollPositionRestoration is disabled)', () => __awaiter(void 0, void 0, void 0, function* () {
            const { events, viewportScroller } = createRouterScroller({
                scrollPositionRestoration: 'disabled',
                anchorScrolling: 'enabled',
            });
            events.next(new index_1.NavigationStart(1, '/a#anchor'));
            events.next(new index_1.NavigationEnd(1, '/a#anchor', '/a#anchor'));
            yield nextScrollEvent(events);
            expect(viewportScroller.scrollToAnchor).toHaveBeenCalledWith('anchor');
            events.next(new index_1.NavigationStart(2, '/a#anchor2'));
            events.next(new index_1.NavigationEnd(2, '/a#anchor2', '/a#anchor2'));
            yield nextScrollEvent(events);
            expect(viewportScroller.scrollToAnchor).toHaveBeenCalledWith('anchor2');
            viewportScroller.scrollToAnchor.calls.reset();
            // we never scroll to anchor when navigating back.
            events.next(new index_1.NavigationStart(3, '/a#anchor', 'popstate'));
            events.next(new index_1.NavigationEnd(3, '/a#anchor', '/a#anchor'));
            yield nextScrollEvent(events);
            expect(viewportScroller.scrollToAnchor).not.toHaveBeenCalled();
            expect(viewportScroller.scrollToPosition).not.toHaveBeenCalled();
        }));
        it('should work (scrollPositionRestoration is enabled)', () => __awaiter(void 0, void 0, void 0, function* () {
            const { events, viewportScroller } = createRouterScroller({
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
            });
            events.next(new index_1.NavigationStart(1, '/a#anchor'));
            events.next(new index_1.NavigationEnd(1, '/a#anchor', '/a#anchor'));
            yield nextScrollEvent(events);
            expect(viewportScroller.scrollToAnchor).toHaveBeenCalledWith('anchor');
            events.next(new index_1.NavigationStart(2, '/a#anchor2'));
            events.next(new index_1.NavigationEnd(2, '/a#anchor2', '/a#anchor2'));
            yield nextScrollEvent(events);
            expect(viewportScroller.scrollToAnchor).toHaveBeenCalledWith('anchor2');
            viewportScroller.scrollToAnchor.calls.reset();
            // we never scroll to anchor when navigating back
            events.next(new index_1.NavigationStart(3, '/a#anchor', 'popstate', { navigationId: 1 }));
            events.next(new index_1.NavigationEnd(3, '/a#anchor', '/a#anchor'));
            yield nextScrollEvent(events);
            expect(viewportScroller.scrollToAnchor).not.toHaveBeenCalled();
            expect(viewportScroller.scrollToPosition).toHaveBeenCalledWith([0, 0]);
        }));
    });
    describe('extending a scroll service', () => {
        it('work', () => __awaiter(void 0, void 0, void 0, function* () {
            const { events, viewportScroller } = createRouterScroller({
                scrollPositionRestoration: 'disabled',
                anchorScrolling: 'disabled',
            });
            events
                .pipe((0, operators_1.filter)((e) => e instanceof events_1.Scroll && !!e.position), (0, operators_1.switchMap)((p) => {
                // can be any delay (e.g., we can wait for NgRx store to emit an event)
                const r = new rxjs_1.Subject();
                setTimeout(() => {
                    r.next(p);
                    r.complete();
                }, 10);
                return r;
            }))
                .subscribe((e) => {
                viewportScroller.scrollToPosition(e.position);
            });
            events.next(new index_1.NavigationStart(1, '/a'));
            events.next(new index_1.NavigationEnd(1, '/a', '/a'));
            yield (0, helpers_1.timeout)();
            setScroll(viewportScroller, 10, 100);
            events.next(new index_1.NavigationStart(2, '/b'));
            events.next(new index_1.NavigationEnd(2, '/b', '/b'));
            yield (0, helpers_1.timeout)();
            setScroll(viewportScroller, 20, 200);
            events.next(new index_1.NavigationStart(3, '/c'));
            events.next(new index_1.NavigationEnd(3, '/c', '/c'));
            yield (0, helpers_1.timeout)();
            setScroll(viewportScroller, 30, 300);
            events.next(new index_1.NavigationStart(4, '/a', 'popstate', { navigationId: 1 }));
            events.next(new index_1.NavigationEnd(4, '/a', '/a'));
            yield (0, helpers_1.timeout)(5);
            expect(viewportScroller.scrollToPosition).not.toHaveBeenCalled();
            events.next(new index_1.NavigationStart(5, '/a', 'popstate', { navigationId: 1 }));
            events.next(new index_1.NavigationEnd(5, '/a', '/a'));
            yield (0, helpers_1.timeout)(50);
            expect(viewportScroller.scrollToPosition).toHaveBeenCalledWith([10, 100]);
        }));
    });
    function createRouterScroller({ scrollPositionRestoration, anchorScrolling, }) {
        const events = new rxjs_1.Subject();
        const transitions = { events };
        const viewportScroller = jasmine.createSpyObj('viewportScroller', [
            'getScrollPosition',
            'scrollToPosition',
            'scrollToAnchor',
            'setHistoryScrollRestoration',
        ]);
        setScroll(viewportScroller, 0, 0);
        const scroller = testing_1.TestBed.runInInjectionContext(() => new router_scroller_1.RouterScroller(new index_1.DefaultUrlSerializer(), transitions, viewportScroller, new core_1.ɵNoopNgZone(), { scrollPositionRestoration, anchorScrolling }));
        scroller.init();
        return { events, viewportScroller };
    }
    function setScroll(viewportScroller, x, y) {
        viewportScroller.getScrollPosition.and.returnValue([x, y]);
    }
});
