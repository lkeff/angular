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
const fake_navigation_1 = require("../fake_navigation");
const testing_1 = require("@angular/private/testing");
(0, testing_1.ensureDocument)();
describe('navigation', () => {
    let locals;
    const popStateListener = (event) => {
        const popStateEvent = event;
        locals.popStateEvents.push(popStateEvent);
    };
    beforeEach(() => {
        window.addEventListener('popstate', popStateListener);
    });
    afterEach(() => {
        window.removeEventListener('popstate', popStateListener);
    });
    beforeEach(() => {
        const navigation = new fake_navigation_1.FakeNavigation(document, 'https://test.com');
        const navigateEvents = [];
        let nextNavigateEventResolve;
        let nextNavigateEventPromise = new Promise((resolve) => {
            nextNavigateEventResolve = resolve;
        });
        const navigationCurrentEntryChangeEvents = [];
        const popStateEvents = [];
        const pendingInterceptOptions = [];
        let extraNavigateCallback = undefined;
        navigation.addEventListener('navigate', (event) => {
            const navigateEvent = event;
            nextNavigateEventResolve(navigateEvent);
            nextNavigateEventPromise = new Promise((resolve) => {
                nextNavigateEventResolve = resolve;
            });
            locals.navigateEvents.push(navigateEvent);
            const interceptOptions = pendingInterceptOptions.shift();
            if (interceptOptions) {
                navigateEvent.intercept(interceptOptions);
            }
            extraNavigateCallback === null || extraNavigateCallback === void 0 ? void 0 : extraNavigateCallback(navigateEvent);
        });
        navigation.addEventListener('currententrychange', (event) => {
            const currentNavigationEntryChangeEvent = event;
            locals.navigationCurrentEntryChangeEvents.push(currentNavigationEntryChangeEvent);
        });
        locals = {
            navigation,
            navigateEvents,
            navigationCurrentEntryChangeEvents,
            popStateEvents,
            pendingInterceptOptions,
            nextNavigateEvent() {
                return nextNavigateEventPromise;
            },
            setExtraNavigateCallback(callback) {
                extraNavigateCallback = callback;
            },
        };
    });
    const setUpEntries = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* ({ hash = false } = {}) {
        locals.pendingInterceptOptions.push({});
        const pathPrefix = hash ? '#' : '/';
        const firstPageEntry = yield locals.navigation.navigate(`${pathPrefix}page1`, {
            state: { page1: true },
        }).finished;
        locals.pendingInterceptOptions.push({});
        const secondPageEntry = yield locals.navigation.navigate(`${pathPrefix}page2`, {
            state: { page2: true },
        }).finished;
        locals.pendingInterceptOptions.push({});
        const thirdPageEntry = yield locals.navigation.navigate(`${pathPrefix}page3`, {
            state: { page3: true },
        }).finished;
        locals.navigateEvents.length = 0;
        locals.navigationCurrentEntryChangeEvents.length = 0;
        locals.popStateEvents.length = 0;
        return [firstPageEntry, secondPageEntry, thirdPageEntry];
    });
    const setUpEntriesWithHistory = ({ hash = false } = {}) => {
        const pathPrefix = hash ? '#' : '/';
        locals.navigation.pushState({ state: { page1: true } }, '', `${pathPrefix}page1`);
        const firstPageEntry = locals.navigation.currentEntry;
        locals.navigation.pushState({ state: { page2: true } }, '', `${pathPrefix}page2`);
        const secondPageEntry = locals.navigation.currentEntry;
        locals.navigation.pushState({ state: { page3: true } }, '', `${pathPrefix}page3`);
        const thirdPageEntry = locals.navigation.currentEntry;
        locals.navigateEvents.length = 0;
        locals.navigationCurrentEntryChangeEvents.length = 0;
        locals.popStateEvents.length = 0;
        return [firstPageEntry, secondPageEntry, thirdPageEntry];
    };
    it('disposes', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(locals.navigation.isDisposed()).toBeFalse();
        const navigateEvents = [];
        locals.navigation.addEventListener('navigate', (event) => {
            navigateEvents.push(event);
        });
        const navigationCurrentEntryChangeEvents = [];
        locals.navigation.addEventListener('currententrychange', (event) => {
            navigationCurrentEntryChangeEvents.push(event);
        });
        yield locals.navigation.navigate('#page1').finished;
        expect(navigateEvents.length).toBe(1);
        expect(navigationCurrentEntryChangeEvents.length).toBe(1);
        locals.navigation.dispose();
        // After a dispose, a different singleton.
        expect(locals.navigation.isDisposed()).toBeTrue();
        yield locals.navigation.navigate('#page2').finished;
        // Listeners are disposed.
        expect(navigateEvents.length).toBe(1);
        expect(navigationCurrentEntryChangeEvents.length).toBe(1);
    }));
    describe('navigate', () => {
        it('push URL', () => __awaiter(void 0, void 0, void 0, function* () {
            const initialEntry = locals.navigation.currentEntry;
            locals.pendingInterceptOptions.push({});
            const { committed, finished } = locals.navigation.navigate('/test');
            expect(locals.navigateEvents.length).toBe(1);
            const navigateEvent = locals.navigateEvents[0];
            expect(navigateEvent).toEqual(jasmine.objectContaining({
                canIntercept: true,
                hashChange: false,
                info: undefined,
                navigationType: 'push',
                userInitiated: false,
                signal: jasmine.any(AbortSignal),
                destination: jasmine.objectContaining({
                    url: 'https://test.com/test',
                    key: null,
                    id: null,
                    index: -1,
                    sameDocument: false,
                }),
            }));
            expect(navigateEvent.destination.getState()).toBeUndefined();
            const committedEntry = yield committed;
            expect(committedEntry).toEqual(jasmine.objectContaining({
                url: 'https://test.com/test',
                key: '1',
                id: '1',
                index: 1,
                sameDocument: true,
            }));
            expect(committedEntry.getState()).toBeUndefined();
            expect(locals.navigation.currentEntry).toBe(committedEntry);
            expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
            const currentEntryChangeEvent = locals.navigationCurrentEntryChangeEvents[0];
            expect(currentEntryChangeEvent).toEqual(jasmine.objectContaining({
                navigationType: 'push',
                from: jasmine.objectContaining({
                    url: initialEntry.url,
                    key: initialEntry.key,
                    id: initialEntry.id,
                    index: initialEntry.index,
                    sameDocument: initialEntry.sameDocument,
                }),
            }));
            expect(currentEntryChangeEvent.from.getState()).toBe(initialEntry.getState());
            expect(locals.popStateEvents.length).toBe(0);
            const finishedEntry = yield finished;
            expect(committedEntry).toBe(finishedEntry);
            expect(locals.navigation.currentEntry).toBe(finishedEntry);
            expect(locals.navigateEvents.length).toBe(1);
            expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
            expect(locals.popStateEvents.length).toBe(0);
        }));
        it('push URL relative', () => __awaiter(void 0, void 0, void 0, function* () {
            locals.pendingInterceptOptions.push({});
            yield locals.navigation.navigate('/a/b/c').finished;
            expect(locals.navigation.currentEntry.url).toBe('https://test.com/a/b/c');
            locals.pendingInterceptOptions.push({
                handler: () => Promise.resolve(),
            });
            yield locals.navigation.navigate('../').finished;
            expect(locals.navigation.currentEntry.url).toBe('https://test.com/a/');
        }));
        it('replace URL', () => __awaiter(void 0, void 0, void 0, function* () {
            const initialEntry = locals.navigation.currentEntry;
            locals.pendingInterceptOptions.push({});
            const { committed, finished } = locals.navigation.navigate('/test', {
                history: 'replace',
            });
            expect(locals.navigateEvents.length).toBe(1);
            const navigateEvent = locals.navigateEvents[0];
            expect(navigateEvent).toEqual(jasmine.objectContaining({
                canIntercept: true,
                hashChange: false,
                info: undefined,
                navigationType: 'replace',
                userInitiated: false,
                signal: jasmine.any(AbortSignal),
                destination: jasmine.objectContaining({
                    url: 'https://test.com/test',
                    key: null,
                    id: null,
                    index: -1,
                    sameDocument: false,
                }),
            }));
            expect(navigateEvent.destination.getState()).toBeUndefined();
            const committedEntry = yield committed;
            expect(committedEntry).toEqual(jasmine.objectContaining({
                url: 'https://test.com/test',
                key: '0',
                id: '1',
                index: 0,
                sameDocument: true,
            }));
            expect(committedEntry.getState()).toBeUndefined();
            expect(locals.navigation.currentEntry).toBe(committedEntry);
            expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
            const currentEntryChangeEvent = locals.navigationCurrentEntryChangeEvents[0];
            expect(currentEntryChangeEvent).toEqual(jasmine.objectContaining({
                navigationType: 'replace',
                from: jasmine.objectContaining({
                    url: initialEntry.url,
                    key: initialEntry.key,
                    id: initialEntry.id,
                    index: initialEntry.index,
                    sameDocument: initialEntry.sameDocument,
                }),
            }));
            expect(currentEntryChangeEvent.from.getState()).toBe(initialEntry.getState());
            expect(locals.popStateEvents.length).toBe(0);
            const finishedEntry = yield finished;
            expect(committedEntry).toBe(finishedEntry);
            expect(locals.navigation.currentEntry).toBe(finishedEntry);
            expect(locals.navigateEvents.length).toBe(1);
            expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
            expect(locals.popStateEvents.length).toBe(0);
        }));
        it('push URL with state', () => __awaiter(void 0, void 0, void 0, function* () {
            locals.pendingInterceptOptions.push({});
            const state = { test: true };
            const { committed, finished } = locals.navigation.navigate('/test', {
                state,
            });
            expect(locals.navigateEvents.length).toBe(1);
            const navigateEvent = locals.navigateEvents[0];
            expect(navigateEvent.destination.getState()).toEqual(state);
            const committedEntry = yield committed;
            expect(committedEntry.getState()).toEqual(state);
            expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
            expect(locals.popStateEvents.length).toBe(0);
            const finishedEntry = yield finished;
            expect(committedEntry).toBe(finishedEntry);
        }));
        it('replace URL with state', () => __awaiter(void 0, void 0, void 0, function* () {
            locals.pendingInterceptOptions.push({});
            const state = { test: true };
            const { committed, finished } = locals.navigation.navigate('/test', {
                state,
                history: 'replace',
            });
            expect(locals.navigateEvents.length).toBe(1);
            const navigateEvent = locals.navigateEvents[0];
            expect(navigateEvent.destination.getState()).toEqual(state);
            const committedEntry = yield committed;
            expect(committedEntry.getState()).toEqual(state);
            expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
            expect(locals.popStateEvents.length).toBe(0);
            const finishedEntry = yield finished;
            expect(committedEntry).toBe(finishedEntry);
        }));
        it('push URL with hashchange', () => __awaiter(void 0, void 0, void 0, function* () {
            const { committed, finished } = locals.navigation.navigate('#test');
            expect(locals.navigateEvents.length).toBe(1);
            const navigateEvent = locals.navigateEvents[0];
            expect(navigateEvent.destination.url).toBe('https://test.com/#test');
            expect(navigateEvent.hashChange).toBeTrue();
            const committedEntry = yield committed;
            expect(committedEntry.url).toBe('https://test.com/#test');
            expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
            expect(locals.popStateEvents.length).toBe(0);
            const finishedEntry = yield finished;
            expect(committedEntry).toBe(finishedEntry);
        }));
        it('replace URL with hashchange', () => __awaiter(void 0, void 0, void 0, function* () {
            const { committed, finished } = locals.navigation.navigate('#test', {
                history: 'replace',
            });
            expect(locals.navigateEvents.length).toBe(1);
            const navigateEvent = locals.navigateEvents[0];
            expect(navigateEvent.destination.url).toBe('https://test.com/#test');
            expect(navigateEvent.hashChange).toBeTrue();
            const committedEntry = yield committed;
            expect(committedEntry.url).toBe('https://test.com/#test');
            expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
            expect(locals.popStateEvents.length).toBe(0);
            const finishedEntry = yield finished;
            expect(committedEntry).toBe(finishedEntry);
        }));
        it('push URL with info', () => __awaiter(void 0, void 0, void 0, function* () {
            locals.pendingInterceptOptions.push({});
            const info = { test: true };
            const { finished, committed } = locals.navigation.navigate('/test', { info });
            expect(locals.navigateEvents.length).toBe(1);
            const navigateEvent = locals.navigateEvents[0];
            expect(navigateEvent.info).toBe(info);
            yield committed;
            expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
            expect(locals.popStateEvents.length).toBe(0);
            yield finished;
        }));
        it('replace URL with info', () => __awaiter(void 0, void 0, void 0, function* () {
            locals.pendingInterceptOptions.push({});
            const info = { test: true };
            const { finished, committed } = locals.navigation.navigate('/test', {
                info,
                history: 'replace',
            });
            expect(locals.navigateEvents.length).toBe(1);
            const navigateEvent = locals.navigateEvents[0];
            expect(navigateEvent.info).toBe(info);
            yield committed;
            expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
            expect(locals.popStateEvents.length).toBe(0);
            yield finished;
        }));
        it('push URL with handler', () => __awaiter(void 0, void 0, void 0, function* () {
            let handlerFinishedResolve;
            const handlerFinished = new Promise((resolve) => {
                handlerFinishedResolve = resolve;
            });
            locals.pendingInterceptOptions.push({
                handler: () => handlerFinished,
            });
            const { committed, finished } = locals.navigation.navigate('/test');
            expect(locals.navigateEvents.length).toBe(1);
            const committedEntry = yield committed;
            expect(committedEntry).toEqual(jasmine.objectContaining({
                url: 'https://test.com/test',
                key: '1',
                id: '1',
                index: 1,
                sameDocument: true,
            }));
            expect(committedEntry.getState()).toBeUndefined();
            expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
            expect(locals.popStateEvents.length).toBe(0);
            yield expectAsync(finished).toBePending();
            handlerFinishedResolve(undefined);
            yield expectAsync(finished).toBeResolvedTo(committedEntry);
        }));
        it('replace URL with handler', () => __awaiter(void 0, void 0, void 0, function* () {
            let handlerFinishedResolve;
            const handlerFinished = new Promise((resolve) => {
                handlerFinishedResolve = resolve;
            });
            locals.pendingInterceptOptions.push({
                handler: () => handlerFinished,
            });
            const { committed, finished } = locals.navigation.navigate('/test', {
                history: 'replace',
            });
            expect(locals.navigateEvents.length).toBe(1);
            const committedEntry = yield committed;
            expect(committedEntry).toEqual(jasmine.objectContaining({
                url: 'https://test.com/test',
                key: '0',
                id: '1',
                index: 0,
                sameDocument: true,
            }));
            expect(committedEntry.getState()).toBeUndefined();
            expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
            expect(locals.popStateEvents.length).toBe(0);
            yield expectAsync(finished).toBePending();
            handlerFinishedResolve(undefined);
            yield expectAsync(finished).toBeResolvedTo(committedEntry);
        }));
        it('deferred commit', () => __awaiter(void 0, void 0, void 0, function* () {
            let handlerFinishedResolve;
            const handlerFinished = new Promise((resolve) => {
                handlerFinishedResolve = resolve;
            });
            let precommitHandlerFinishedResolve;
            const precommitHandlerFinished = new Promise((resolve) => {
                precommitHandlerFinishedResolve = resolve;
            });
            locals.pendingInterceptOptions.push({
                handler: () => handlerFinished,
                precommitHandler: () => precommitHandlerFinished,
            });
            const { committed, finished } = locals.navigation.navigate('/test');
            expect(locals.navigateEvents.length).toBe(1);
            yield expectAsync(committed).toBePending();
            expect(locals.navigation.currentEntry.url).toBe('https://test.com/');
            precommitHandlerFinishedResolve();
            const committedEntry = yield committed;
            expect(committedEntry).toEqual(jasmine.objectContaining({
                url: 'https://test.com/test',
                key: '1',
                id: '1',
                index: 1,
                sameDocument: true,
            }));
            expect(committedEntry.getState()).toBeUndefined();
            expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
            expect(locals.popStateEvents.length).toBe(0);
            yield expectAsync(finished).toBePending();
            handlerFinishedResolve(undefined);
            yield expectAsync(finished).toBeResolvedTo(committedEntry);
        }));
        it('deferred commit early resolve', () => __awaiter(void 0, void 0, void 0, function* () {
            let handlerFinishedResolve;
            const handlerFinished = new Promise((resolve) => {
                handlerFinishedResolve = resolve;
            });
            locals.pendingInterceptOptions.push({
                precommitHandler: () => handlerFinished,
            });
            const { committed, finished } = locals.navigation.navigate('/test');
            expect(locals.navigateEvents.length).toBe(1);
            yield expectAsync(committed).toBePending();
            expect(locals.navigation.currentEntry.url).toBe('https://test.com/');
            handlerFinishedResolve(undefined);
            const committedEntry = yield committed;
            expect(committedEntry).toEqual(jasmine.objectContaining({
                url: 'https://test.com/test',
                key: '1',
                id: '1',
                index: 1,
                sameDocument: true,
            }));
            expect(committedEntry.getState()).toBeUndefined();
            expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
            expect(locals.popStateEvents.length).toBe(0);
            yield expectAsync(finished).toBeResolvedTo(committedEntry);
        }));
        it('deferred commit resolves on finished', () => __awaiter(void 0, void 0, void 0, function* () {
            let handlerFinishedResolve;
            let precommitHandlerResolve;
            const handlerFinished = new Promise((resolve) => {
                handlerFinishedResolve = resolve;
            });
            const precommitHandlerFinished = new Promise((resolve) => {
                precommitHandlerResolve = resolve;
            });
            locals.pendingInterceptOptions.push({
                handler: () => handlerFinished,
                precommitHandler: () => precommitHandlerFinished,
            });
            const { committed, finished } = locals.navigation.navigate('/test');
            expect(locals.navigateEvents.length).toBe(1);
            yield expectAsync(committed).toBePending();
            expect(locals.navigation.currentEntry.url).toBe('https://test.com/');
            precommitHandlerResolve();
            handlerFinishedResolve();
            const committedEntry = yield committed;
            expect(committedEntry).toEqual(jasmine.objectContaining({
                url: 'https://test.com/test',
                key: '1',
                id: '1',
                index: 1,
                sameDocument: true,
            }));
            expect(committedEntry.getState()).toBeUndefined();
            expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
            expect(locals.popStateEvents.length).toBe(0);
            yield expectAsync(finished).toBeResolvedTo(committedEntry);
        }));
        it('push, finish, push does not result in abort of first', () => __awaiter(void 0, void 0, void 0, function* () {
            locals.pendingInterceptOptions.push({});
            const { finished } = locals.navigation.navigate('/test');
            const [navigateEvent] = locals.navigateEvents;
            yield finished;
            locals.pendingInterceptOptions.push({});
            yield locals.navigation.navigate('/other').finished;
            expect(navigateEvent.signal.aborted).toBeFalse();
        }));
        it('push with interruption', () => __awaiter(void 0, void 0, void 0, function* () {
            locals.pendingInterceptOptions.push({
                handler: () => new Promise(() => { }),
            });
            const { committed, finished } = locals.navigation.navigate('/test');
            expect(locals.navigateEvents.length).toBe(1);
            const navigateEvent = locals.navigateEvents[0];
            yield committed;
            expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
            expect(locals.popStateEvents.length).toBe(0);
            yield expectAsync(finished).toBePending();
            locals.pendingInterceptOptions.push({});
            const interruptResult = locals.navigation.navigate('/interrupt');
            yield expectAsync(finished).toBeRejectedWithError(DOMException);
            expect(navigateEvent.signal.aborted).toBeTrue();
            yield interruptResult.committed;
            expect(locals.navigationCurrentEntryChangeEvents.length).toBe(2);
            expect(locals.popStateEvents.length).toBe(0);
            yield interruptResult.finished;
        }));
        it('replace with interruption', () => __awaiter(void 0, void 0, void 0, function* () {
            locals.pendingInterceptOptions.push({
                handler: () => new Promise(() => { }),
            });
            const { committed, finished } = locals.navigation.navigate('/test', {
                history: 'replace',
            });
            expect(locals.navigateEvents.length).toBe(1);
            const navigateEvent = locals.navigateEvents[0];
            yield committed;
            expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
            expect(locals.popStateEvents.length).toBe(0);
            yield expectAsync(finished).toBePending();
            locals.pendingInterceptOptions.push({});
            const interruptResult = locals.navigation.navigate('/interrupt');
            yield expectAsync(finished).toBeRejectedWithError(DOMException);
            expect(navigateEvent.signal.aborted).toBeTrue();
            yield interruptResult.committed;
            expect(locals.navigationCurrentEntryChangeEvents.length).toBe(2);
            expect(locals.popStateEvents.length).toBe(0);
            yield interruptResult.finished;
        }));
        it('push with handler reject', () => __awaiter(void 0, void 0, void 0, function* () {
            let handlerFinishedReject;
            locals.pendingInterceptOptions.push({
                handler: () => new Promise((resolve, reject) => {
                    handlerFinishedReject = reject;
                }),
            });
            const { committed, finished } = locals.navigation.navigate('/test');
            expect(locals.navigateEvents.length).toBe(1);
            const navigateEvent = locals.navigateEvents[0];
            yield committed;
            expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
            expect(locals.popStateEvents.length).toBe(0);
            yield expectAsync(finished).toBePending();
            const error = new Error('rejected');
            handlerFinishedReject(error);
            yield expectAsync(finished).toBeRejectedWith(error);
            expect(navigateEvent.signal.aborted).toBeTrue();
        }));
        it('replace with reject', () => __awaiter(void 0, void 0, void 0, function* () {
            let handlerFinishedReject;
            locals.pendingInterceptOptions.push({
                handler: () => new Promise((resolve, reject) => {
                    handlerFinishedReject = reject;
                }),
            });
            const { committed, finished } = locals.navigation.navigate('/test', {
                history: 'replace',
            });
            expect(locals.navigateEvents.length).toBe(1);
            const navigateEvent = locals.navigateEvents[0];
            yield committed;
            expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
            expect(locals.popStateEvents.length).toBe(0);
            yield expectAsync(finished).toBePending();
            const error = new Error('rejected');
            handlerFinishedReject(error);
            yield expectAsync(finished).toBeRejectedWith(error);
            expect(navigateEvent.signal.aborted).toBeTrue();
        }));
    });
    describe('traversal', () => {
        it('traverses back', () => __awaiter(void 0, void 0, void 0, function* () {
            expect(locals.navigation.canGoBack).toBeFalse();
            expect(locals.navigation.canGoForward).toBeFalse();
            const [firstPageEntry, , thirdPageEntry] = yield setUpEntries();
            expect(locals.navigation.canGoBack).toBeTrue();
            expect(locals.navigation.canGoForward).toBeFalse();
            const { committed, finished } = locals.navigation.traverseTo(firstPageEntry.key);
            const navigateEvent = yield locals.nextNavigateEvent();
            expect(navigateEvent).toEqual(jasmine.objectContaining({
                canIntercept: true,
                hashChange: false,
                info: undefined,
                navigationType: 'traverse',
                signal: jasmine.any(AbortSignal),
                userInitiated: false,
                destination: jasmine.objectContaining({
                    url: firstPageEntry.url,
                    key: firstPageEntry.key,
                    id: firstPageEntry.id,
                    index: firstPageEntry.index,
                    sameDocument: true,
                }),
            }));
            expect(navigateEvent.destination.getState()).toEqual(firstPageEntry.getState());
            const committedEntry = yield committed;
            expect(committedEntry).toBe(firstPageEntry);
            expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
            const currentEntryChangeEvent = locals.navigationCurrentEntryChangeEvents[0];
            expect(currentEntryChangeEvent).toEqual(jasmine.objectContaining({
                navigationType: 'traverse',
                from: jasmine.objectContaining({
                    url: thirdPageEntry.url,
                    key: thirdPageEntry.key,
                    id: thirdPageEntry.id,
                    index: thirdPageEntry.index,
                    sameDocument: true,
                }),
            }));
            expect(currentEntryChangeEvent.from.getState()).toEqual(thirdPageEntry.getState());
            expect(locals.popStateEvents.length).toBe(1);
            const popStateEvent = locals.popStateEvents[0];
            expect(popStateEvent.state).toBeNull();
            expect(locals.navigation.canGoBack).toBeTrue();
            expect(locals.navigation.canGoForward).toBeTrue();
            const finishedEntry = yield finished;
            expect(finishedEntry).toBe(firstPageEntry);
            expect(locals.navigation.currentEntry).toBe(firstPageEntry);
            expect(locals.navigateEvents.length).toBe(1);
            expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
            expect(locals.popStateEvents.length).toBe(1);
        }));
        it('traverses forward', () => __awaiter(void 0, void 0, void 0, function* () {
            expect(locals.navigation.canGoBack).toBeFalse();
            expect(locals.navigation.canGoForward).toBeFalse();
            const [firstPageEntry, , thirdPageEntry] = yield setUpEntries();
            expect(locals.navigation.canGoBack).toBeTrue();
            expect(locals.navigation.canGoForward).toBeFalse();
            yield locals.navigation.traverseTo(firstPageEntry.key).finished;
            locals.navigateEvents.length = 0;
            locals.navigationCurrentEntryChangeEvents.length = 0;
            locals.popStateEvents.length = 0;
            expect(locals.navigation.canGoBack).toBeTrue();
            expect(locals.navigation.canGoForward).toBeTrue();
            const { committed, finished } = locals.navigation.traverseTo(thirdPageEntry.key);
            const navigateEvent = yield locals.nextNavigateEvent();
            expect(navigateEvent).toEqual(jasmine.objectContaining({
                canIntercept: true,
                hashChange: false,
                info: undefined,
                navigationType: 'traverse',
                signal: jasmine.any(AbortSignal),
                userInitiated: false,
                destination: jasmine.objectContaining({
                    url: thirdPageEntry.url,
                    key: thirdPageEntry.key,
                    id: thirdPageEntry.id,
                    index: thirdPageEntry.index,
                    sameDocument: true,
                }),
            }));
            expect(navigateEvent.destination.getState()).toEqual(thirdPageEntry.getState());
            const committedEntry = yield committed;
            expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
            const currentEntryChangeEvent = locals.navigationCurrentEntryChangeEvents[0];
            expect(currentEntryChangeEvent).toEqual(jasmine.objectContaining({
                navigationType: 'traverse',
                from: jasmine.objectContaining({
                    url: firstPageEntry.url,
                    key: firstPageEntry.key,
                    id: firstPageEntry.id,
                    index: firstPageEntry.index,
                    sameDocument: true,
                }),
            }));
            expect(currentEntryChangeEvent.from.getState()).toEqual(firstPageEntry.getState());
            expect(locals.popStateEvents.length).toBe(1);
            const popStateEvent = locals.popStateEvents[0];
            expect(popStateEvent.state).toBeNull();
            expect(committedEntry).toBe(thirdPageEntry);
            const finishedEntry = yield finished;
            expect(finishedEntry).toBe(thirdPageEntry);
            expect(locals.navigation.currentEntry).toBe(thirdPageEntry);
            expect(locals.navigateEvents.length).toBe(1);
            expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
            expect(locals.popStateEvents.length).toBe(1);
            expect(locals.navigation.canGoBack).toBeTrue();
            expect(locals.navigation.canGoForward).toBeFalse();
        }));
        it('traverses back with hashchange', () => __awaiter(void 0, void 0, void 0, function* () {
            const [firstPageEntry] = yield setUpEntries({ hash: true });
            const { finished, committed } = locals.navigation.traverseTo(firstPageEntry.key);
            const navigateEvent = yield locals.nextNavigateEvent();
            expect(navigateEvent.hashChange).toBeTrue();
            yield committed;
            expect(locals.navigation.currentEntry).toBe(firstPageEntry);
            expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
            expect(locals.popStateEvents.length).toBe(1);
            yield finished;
            expect(locals.navigation.currentEntry).toBe(firstPageEntry);
        }));
        it('traverses forward with hashchange', () => __awaiter(void 0, void 0, void 0, function* () {
            const [firstPageEntry, thirdPageEntry] = yield setUpEntries({ hash: true });
            yield locals.navigation.traverseTo(firstPageEntry.key).finished;
            locals.navigateEvents.length = 0;
            locals.navigationCurrentEntryChangeEvents.length = 0;
            locals.popStateEvents.length = 0;
            const { finished, committed } = locals.navigation.traverseTo(thirdPageEntry.key);
            const navigateEvent = yield locals.nextNavigateEvent();
            expect(navigateEvent.hashChange).toBeTrue();
            yield committed;
            expect(locals.navigation.currentEntry).toBe(thirdPageEntry);
            expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
            expect(locals.popStateEvents.length).toBe(1);
            yield finished;
            expect(locals.navigation.currentEntry).toBe(thirdPageEntry);
        }));
        it('traverses with info', () => __awaiter(void 0, void 0, void 0, function* () {
            const [firstPageEntry] = yield setUpEntries();
            const info = { test: true };
            const { finished, committed } = locals.navigation.traverseTo(firstPageEntry.key, { info });
            const navigateEvent = yield locals.nextNavigateEvent();
            expect(navigateEvent.info).toBe(info);
            yield committed;
            expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
            expect(locals.popStateEvents.length).toBe(1);
            yield finished;
        }));
        it('traverses with history state', () => __awaiter(void 0, void 0, void 0, function* () {
            const [firstPageEntry] = setUpEntriesWithHistory();
            const { finished, committed } = locals.navigation.traverseTo(firstPageEntry.key);
            const navigateEvent = yield locals.nextNavigateEvent();
            expect(navigateEvent.destination.getHistoryState()).toEqual(firstPageEntry.getHistoryState());
            yield committed;
            expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
            expect(locals.popStateEvents.length).toBe(1);
            const popStateEvent = locals.popStateEvents[0];
            expect(popStateEvent.state).toEqual(firstPageEntry.getHistoryState());
            yield finished;
        }));
        it('traverses with handler', () => __awaiter(void 0, void 0, void 0, function* () {
            const [firstPageEntry] = yield setUpEntries();
            let handlerFinishedResolve;
            const handlerFinished = new Promise((resolve) => {
                handlerFinishedResolve = resolve;
            });
            locals.pendingInterceptOptions.push({
                handler: () => handlerFinished,
            });
            const { committed, finished } = locals.navigation.traverseTo(firstPageEntry.key);
            const committedEntry = yield committed;
            expect(committedEntry).toBe(firstPageEntry);
            expect(locals.navigation.currentEntry).toBe(firstPageEntry);
            expect(locals.navigateEvents.length).toBe(1);
            expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
            expect(locals.popStateEvents.length).toBe(1);
            yield expectAsync(finished).toBePending();
            handlerFinishedResolve(undefined);
            yield expectAsync(finished).toBeResolvedTo(firstPageEntry);
        }));
        it('traverses with interruption', () => __awaiter(void 0, void 0, void 0, function* () {
            const [firstPageEntry] = yield setUpEntries();
            locals.pendingInterceptOptions.push({
                handler: () => new Promise(() => { }),
            });
            const { committed, finished } = locals.navigation.traverseTo(firstPageEntry.key);
            const navigateEvent = yield locals.nextNavigateEvent();
            yield committed;
            expect(locals.navigation.currentEntry).toBe(firstPageEntry);
            expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
            expect(locals.popStateEvents.length).toBe(1);
            expect(navigateEvent.signal.aborted).toBeFalse();
            yield expectAsync(finished).toBePending();
            locals.pendingInterceptOptions.push({});
            const interruptResult = locals.navigation.navigate('/interrupt');
            yield expectAsync(finished).toBeRejectedWithError(DOMException);
            expect(navigateEvent.signal.aborted).toBeTrue();
            yield interruptResult.committed;
            expect(locals.navigationCurrentEntryChangeEvents.length).toBe(2);
            expect(locals.popStateEvents.length).toBe(1);
            yield interruptResult.finished;
        }));
        it('traverses with reject', () => __awaiter(void 0, void 0, void 0, function* () {
            const [firstPageEntry] = yield setUpEntries();
            let handlerFinishedReject;
            locals.pendingInterceptOptions.push({
                handler: () => new Promise((resolve, reject) => {
                    handlerFinishedReject = reject;
                }),
            });
            const { committed, finished } = locals.navigation.traverseTo(firstPageEntry.key);
            const navigateEvent = yield locals.nextNavigateEvent();
            yield committed;
            expect(locals.navigation.currentEntry).toBe(firstPageEntry);
            expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
            expect(locals.popStateEvents.length).toBe(1);
            expect(navigateEvent.signal.aborted).toBeFalse();
            yield expectAsync(finished).toBePending();
            const error = new Error('rejected');
            handlerFinishedReject(error);
            yield expectAsync(finished).toBeRejectedWith(error);
            expect(navigateEvent.signal.aborted).toBeTrue();
            expect(locals.navigation.currentEntry).toBe(firstPageEntry);
        }));
        it('traverses to non-existent', () => __awaiter(void 0, void 0, void 0, function* () {
            const { committed, finished } = locals.navigation.traverseTo('non-existent');
            yield expectAsync(committed).toBeRejectedWithError(DOMException);
            yield expectAsync(finished).toBeRejectedWithError(DOMException);
            expect(locals.navigateEvents.length).toBe(0);
            expect(locals.navigationCurrentEntryChangeEvents.length).toBe(0);
            expect(locals.popStateEvents.length).toBe(0);
        }));
        it('back', () => __awaiter(void 0, void 0, void 0, function* () {
            const [, secondPageEntry, thirdPageEntry] = yield setUpEntries();
            const { committed, finished } = locals.navigation.back();
            const navigateEvent = yield locals.nextNavigateEvent();
            expect(navigateEvent).toEqual(jasmine.objectContaining({
                canIntercept: true,
                hashChange: false,
                info: undefined,
                navigationType: 'traverse',
                signal: jasmine.any(AbortSignal),
                userInitiated: false,
                destination: jasmine.objectContaining({
                    url: secondPageEntry.url,
                    key: secondPageEntry.key,
                    id: secondPageEntry.id,
                    index: secondPageEntry.index,
                    sameDocument: true,
                }),
            }));
            expect(navigateEvent.destination.getState()).toEqual(secondPageEntry.getState());
            const committedEntry = yield committed;
            expect(committedEntry).toBe(secondPageEntry);
            expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
            const currentEntryChangeEvent = locals.navigationCurrentEntryChangeEvents[0];
            expect(currentEntryChangeEvent).toEqual(jasmine.objectContaining({
                navigationType: 'traverse',
                from: jasmine.objectContaining({
                    url: thirdPageEntry.url,
                    key: thirdPageEntry.key,
                    id: thirdPageEntry.id,
                    index: thirdPageEntry.index,
                    sameDocument: true,
                }),
            }));
            expect(currentEntryChangeEvent.from.getState()).toEqual(thirdPageEntry.getState());
            expect(locals.popStateEvents.length).toBe(1);
            const popStateEvent = locals.popStateEvents[0];
            expect(popStateEvent.state).toBeNull();
            const finishedEntry = yield finished;
            expect(finishedEntry).toBe(secondPageEntry);
            expect(locals.navigation.currentEntry).toBe(secondPageEntry);
        }));
        it('back with info', () => __awaiter(void 0, void 0, void 0, function* () {
            yield setUpEntries();
            const info = { test: true };
            const { committed, finished } = locals.navigation.back({ info });
            const navigateEvent = yield locals.nextNavigateEvent();
            expect(navigateEvent.info).toBe(info);
            yield committed;
            expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
            expect(locals.popStateEvents.length).toBe(1);
            yield finished;
        }));
        it('back out of bounds', () => __awaiter(void 0, void 0, void 0, function* () {
            const { committed, finished } = locals.navigation.back();
            yield expectAsync(committed).toBeRejectedWithError(DOMException);
            yield expectAsync(finished).toBeRejectedWithError(DOMException);
            expect(locals.navigateEvents.length).toBe(0);
            expect(locals.navigationCurrentEntryChangeEvents.length).toBe(0);
            expect(locals.popStateEvents.length).toBe(0);
        }));
        it('forward', () => __awaiter(void 0, void 0, void 0, function* () {
            const [firstPageEntry, secondPageEntry] = yield setUpEntries();
            yield locals.navigation.traverseTo(firstPageEntry.key).finished;
            locals.navigateEvents.length = 0;
            locals.navigationCurrentEntryChangeEvents.length = 0;
            locals.popStateEvents.length = 0;
            const { committed, finished } = locals.navigation.forward();
            const navigateEvent = yield locals.nextNavigateEvent();
            expect(navigateEvent).toEqual(jasmine.objectContaining({
                canIntercept: true,
                hashChange: false,
                info: undefined,
                navigationType: 'traverse',
                signal: jasmine.any(AbortSignal),
                userInitiated: false,
                destination: jasmine.objectContaining({
                    url: secondPageEntry.url,
                    key: secondPageEntry.key,
                    id: secondPageEntry.id,
                    index: secondPageEntry.index,
                    sameDocument: true,
                }),
            }));
            expect(navigateEvent.destination.getState()).toEqual(secondPageEntry.getState());
            const committedEntry = yield committed;
            expect(committedEntry).toBe(secondPageEntry);
            expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
            const currentEntryChangeEvent = locals.navigationCurrentEntryChangeEvents[0];
            expect(currentEntryChangeEvent).toEqual(jasmine.objectContaining({
                navigationType: 'traverse',
                from: jasmine.objectContaining({
                    url: firstPageEntry.url,
                    key: firstPageEntry.key,
                    id: firstPageEntry.id,
                    index: firstPageEntry.index,
                    sameDocument: true,
                }),
            }));
            expect(currentEntryChangeEvent.from.getState()).toEqual(firstPageEntry.getState());
            expect(locals.popStateEvents.length).toBe(1);
            const popStateEvent = locals.popStateEvents[0];
            expect(popStateEvent.state).toBeNull();
            const finishedEntry = yield finished;
            expect(finishedEntry).toBe(secondPageEntry);
            expect(locals.navigation.currentEntry).toBe(secondPageEntry);
        }));
        it('forward with info', () => __awaiter(void 0, void 0, void 0, function* () {
            const [firstPageEntry] = yield setUpEntries();
            yield locals.navigation.traverseTo(firstPageEntry.key).finished;
            locals.navigateEvents.length = 0;
            locals.navigationCurrentEntryChangeEvents.length = 0;
            locals.popStateEvents.length = 0;
            const info = { test: true };
            const { committed, finished } = locals.navigation.forward({ info });
            const navigateEvent = yield locals.nextNavigateEvent();
            expect(navigateEvent.info).toBe(info);
            yield committed;
            expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
            expect(locals.popStateEvents.length).toBe(1);
            yield finished;
        }));
        it('forward out of bounds', () => __awaiter(void 0, void 0, void 0, function* () {
            const { committed, finished } = locals.navigation.forward();
            yield expectAsync(committed).toBeRejectedWithError(DOMException);
            yield expectAsync(finished).toBeRejectedWithError(DOMException);
            expect(locals.navigateEvents.length).toBe(0);
            expect(locals.navigationCurrentEntryChangeEvents.length).toBe(0);
            expect(locals.popStateEvents.length).toBe(0);
        }));
        it('traverse synchronously', () => __awaiter(void 0, void 0, void 0, function* () {
            const [, secondPageEntry] = yield setUpEntries();
            locals.navigation.setSynchronousTraversalsForTesting(true);
            const { committed, finished } = locals.navigation.back();
            // Synchronously navigates.
            expect(locals.navigation.currentEntry).toBe(secondPageEntry);
            yield expectAsync(committed).toBeResolvedTo(secondPageEntry);
            yield expectAsync(finished).toBeResolvedTo(secondPageEntry);
        }));
        it('traversal current entry', () => __awaiter(void 0, void 0, void 0, function* () {
            const { committed, finished } = locals.navigation.traverseTo(locals.navigation.currentEntry.key);
            yield expectAsync(committed).toBeResolvedTo(locals.navigation.currentEntry);
            yield expectAsync(finished).toBeResolvedTo(locals.navigation.currentEntry);
            expect(locals.navigateEvents.length).toBe(0);
            expect(locals.navigationCurrentEntryChangeEvents.length).toBe(0);
            expect(locals.popStateEvents.length).toBe(0);
        }));
        it('second traversal to same entry', () => __awaiter(void 0, void 0, void 0, function* () {
            const [firstPageEntry] = yield setUpEntries();
            const traverseResult = locals.navigation.traverseTo(firstPageEntry.key);
            const duplicateTraverseResult = locals.navigation.traverseTo(firstPageEntry.key);
            expect(traverseResult.committed).toBe(duplicateTraverseResult.committed);
            expect(traverseResult.finished).toBe(duplicateTraverseResult.finished);
            yield Promise.all([traverseResult.committed, duplicateTraverseResult.committed]);
            // Only one NavigationCurrentEntryChangeEvent for duplicate traversals
            expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
            expect(locals.popStateEvents.length).toBe(1);
            yield Promise.all([traverseResult.finished, duplicateTraverseResult.finished]);
            // Only one NavigateEvent for duplicate traversals.
            expect(locals.navigateEvents.length).toBe(1);
        }));
        it('queues traverses', () => __awaiter(void 0, void 0, void 0, function* () {
            const [firstPageEntry, secondPageEntry] = yield setUpEntries();
            const firstTraverseResult = locals.navigation.traverseTo(firstPageEntry.key);
            const secondTraverseResult = locals.navigation.traverseTo(secondPageEntry.key);
            const firstTraverseCommittedEntry = yield firstTraverseResult.committed;
            expect(firstTraverseCommittedEntry).toBe(firstPageEntry);
            expect(locals.navigation.currentEntry).toBe(firstPageEntry);
            expect(locals.navigateEvents.length).toBe(1);
            const firstNavigateEvent = locals.navigateEvents[0];
            expect(firstNavigateEvent).toEqual(jasmine.objectContaining({
                navigationType: 'traverse',
                destination: jasmine.objectContaining({
                    key: firstPageEntry.key,
                }),
            }));
            expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
            expect(locals.popStateEvents.length).toBe(1);
            const firstTraverseFinishedEntry = yield firstTraverseResult.finished;
            expect(firstTraverseFinishedEntry).toBe(firstPageEntry);
            expect(locals.navigation.currentEntry).toBe(firstPageEntry);
            const secondTraverseCommittedEntry = yield secondTraverseResult.committed;
            expect(secondTraverseCommittedEntry).toBe(secondPageEntry);
            expect(locals.navigation.currentEntry).toBe(secondPageEntry);
            expect(locals.navigateEvents.length).toBe(2);
            const secondNavigateEvent = locals.navigateEvents[1];
            expect(secondNavigateEvent).toEqual(jasmine.objectContaining({
                navigationType: 'traverse',
                destination: jasmine.objectContaining({
                    key: secondPageEntry.key,
                }),
            }));
            expect(locals.navigationCurrentEntryChangeEvents.length).toBe(2);
            expect(locals.popStateEvents.length).toBe(2);
            const secondTraverseFinishedEntry = yield secondTraverseResult.finished;
            expect(secondTraverseFinishedEntry).toBe(secondPageEntry);
            expect(locals.navigation.currentEntry).toBe(secondPageEntry);
        }));
    });
    describe('integration', () => {
        it('queues traverses after navigate', () => __awaiter(void 0, void 0, void 0, function* () {
            const [firstPageEntry, secondPageEntry] = yield setUpEntries();
            const firstTraverseResult = locals.navigation.traverseTo(firstPageEntry.key);
            const secondTraverseResult = locals.navigation.traverseTo(secondPageEntry.key);
            locals.pendingInterceptOptions.push({});
            const navigateResult = locals.navigation.navigate('/page4', {
                state: { page4: true },
            });
            const navigateResultCommittedEntry = yield navigateResult.committed;
            expect(navigateResultCommittedEntry.url).toBe('https://test.com/page4');
            expect(locals.navigation.currentEntry).toBe(navigateResultCommittedEntry);
            expect(locals.navigateEvents.length).toBe(1);
            const firstNavigateEvent = locals.navigateEvents[0];
            expect(firstNavigateEvent).toEqual(jasmine.objectContaining({
                navigationType: 'push',
                destination: jasmine.objectContaining({
                    url: 'https://test.com/page4',
                }),
            }));
            expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
            expect(locals.popStateEvents.length).toBe(0);
            const navigateResultFinishedEntry = yield navigateResult.finished;
            expect(navigateResultFinishedEntry).toBe(navigateResultCommittedEntry);
            expect(locals.navigation.currentEntry).toBe(navigateResultCommittedEntry);
            const firstTraverseCommittedEntry = yield firstTraverseResult.committed;
            expect(firstTraverseCommittedEntry).toBe(firstPageEntry);
            expect(locals.navigation.currentEntry).toBe(firstPageEntry);
            expect(locals.navigateEvents.length).toBe(2);
            const secondNavigateEvent = locals.navigateEvents[1];
            expect(secondNavigateEvent).toEqual(jasmine.objectContaining({
                navigationType: 'traverse',
                destination: jasmine.objectContaining({
                    key: firstPageEntry.key,
                }),
            }));
            expect(locals.navigationCurrentEntryChangeEvents.length).toBe(2);
            expect(locals.popStateEvents.length).toBe(1);
            const firstTraverseFinishedEntry = yield firstTraverseResult.finished;
            expect(firstTraverseFinishedEntry).toBe(firstPageEntry);
            expect(locals.navigation.currentEntry).toBe(firstPageEntry);
            const secondTraverseCommittedEntry = yield secondTraverseResult.committed;
            expect(secondTraverseCommittedEntry).toBe(secondPageEntry);
            expect(locals.navigation.currentEntry).toBe(secondPageEntry);
            expect(locals.navigateEvents.length).toBe(3);
            const thirdNavigateEvent = locals.navigateEvents[2];
            expect(thirdNavigateEvent).toEqual(jasmine.objectContaining({
                navigationType: 'traverse',
                destination: jasmine.objectContaining({
                    key: secondPageEntry.key,
                }),
            }));
            expect(locals.navigationCurrentEntryChangeEvents.length).toBe(3);
            expect(locals.popStateEvents.length).toBe(2);
            const secondTraverseFinishedEntry = yield secondTraverseResult.finished;
            expect(secondTraverseFinishedEntry).toBe(secondPageEntry);
            expect(locals.navigation.currentEntry).toBe(secondPageEntry);
        }));
    });
    describe('history API', () => {
        describe('push and replace', () => {
            it('push URL', () => __awaiter(void 0, void 0, void 0, function* () {
                const initialEntry = locals.navigation.currentEntry;
                locals.navigation.pushState(undefined, '', '/test');
                expect(locals.navigateEvents.length).toBe(1);
                const navigateEvent = locals.navigateEvents[0];
                expect(navigateEvent).toEqual(jasmine.objectContaining({
                    canIntercept: true,
                    hashChange: false,
                    info: undefined,
                    navigationType: 'push',
                    userInitiated: false,
                    signal: jasmine.any(AbortSignal),
                    destination: jasmine.objectContaining({
                        url: 'https://test.com/test',
                        key: null,
                        id: null,
                        index: -1,
                        sameDocument: true,
                    }),
                }));
                expect(navigateEvent.destination.getState()).toBeUndefined();
                expect(navigateEvent.destination.getHistoryState()).toBeUndefined();
                const currentEntry = locals.navigation.currentEntry;
                expect(currentEntry).toEqual(jasmine.objectContaining({
                    url: 'https://test.com/test',
                    key: '1',
                    id: '1',
                    index: 1,
                    sameDocument: true,
                }));
                expect(currentEntry.getState()).toBeUndefined();
                expect(currentEntry.getHistoryState()).toBeUndefined();
                expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
                const currentEntryChangeEvent = locals.navigationCurrentEntryChangeEvents[0];
                expect(currentEntryChangeEvent).toEqual(jasmine.objectContaining({
                    navigationType: 'push',
                    from: jasmine.objectContaining({
                        url: initialEntry.url,
                        key: initialEntry.key,
                        id: initialEntry.id,
                        index: initialEntry.index,
                        sameDocument: initialEntry.sameDocument,
                    }),
                }));
                expect(currentEntryChangeEvent.from.getState()).toBe(initialEntry.getState());
                expect(currentEntryChangeEvent.from.getHistoryState()).toBeNull();
                expect(locals.popStateEvents.length).toBe(0);
            }));
            it('replace URL', () => __awaiter(void 0, void 0, void 0, function* () {
                const initialEntry = locals.navigation.currentEntry;
                locals.navigation.replaceState(null, '', '/test');
                expect(locals.navigateEvents.length).toBe(1);
                const navigateEvent = locals.navigateEvents[0];
                expect(navigateEvent).toEqual(jasmine.objectContaining({
                    canIntercept: true,
                    hashChange: false,
                    info: undefined,
                    navigationType: 'replace',
                    userInitiated: false,
                    signal: jasmine.any(AbortSignal),
                    destination: jasmine.objectContaining({
                        url: 'https://test.com/test',
                        key: null,
                        id: null,
                        index: -1,
                        sameDocument: true,
                    }),
                }));
                expect(navigateEvent.destination.getState()).toBeUndefined();
                expect(navigateEvent.destination.getHistoryState()).toBeNull();
                const currentEntry = locals.navigation.currentEntry;
                expect(currentEntry).toEqual(jasmine.objectContaining({
                    url: 'https://test.com/test',
                    key: '0',
                    id: '1',
                    index: 0,
                    sameDocument: true,
                }));
                expect(currentEntry.getState()).toBeUndefined();
                expect(currentEntry.getHistoryState()).toBeNull();
                expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
                const currentEntryChangeEvent = locals.navigationCurrentEntryChangeEvents[0];
                expect(currentEntryChangeEvent).toEqual(jasmine.objectContaining({
                    navigationType: 'replace',
                    from: jasmine.objectContaining({
                        url: initialEntry.url,
                        key: initialEntry.key,
                        id: initialEntry.id,
                        index: initialEntry.index,
                        sameDocument: initialEntry.sameDocument,
                    }),
                }));
                expect(currentEntryChangeEvent.from.getState()).toBe(initialEntry.getState());
                expect(currentEntryChangeEvent.from.getHistoryState()).toBeNull();
                expect(locals.popStateEvents.length).toBe(0);
            }));
            it('push URL with history state', () => __awaiter(void 0, void 0, void 0, function* () {
                locals.pendingInterceptOptions.push({});
                const state = { test: true };
                locals.navigation.pushState(state, '', '/test');
                expect(locals.navigateEvents.length).toBe(1);
                const navigateEvent = locals.navigateEvents[0];
                expect(navigateEvent.destination.getHistoryState()).toEqual(state);
                expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
                expect(locals.navigation.currentEntry.getHistoryState()).toEqual(state);
                expect(locals.popStateEvents.length).toBe(0);
            }));
            it('replace URL with history state', () => __awaiter(void 0, void 0, void 0, function* () {
                locals.pendingInterceptOptions.push({});
                const state = { test: true };
                locals.navigation.replaceState(state, '', '/test');
                expect(locals.navigateEvents.length).toBe(1);
                const navigateEvent = locals.navigateEvents[0];
                expect(navigateEvent.destination.getHistoryState()).toEqual(state);
                expect(locals.navigation.currentEntry.getHistoryState()).toEqual(state);
                expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
                expect(locals.popStateEvents.length).toBe(0);
            }));
            it('push URL with hashchange', () => __awaiter(void 0, void 0, void 0, function* () {
                locals.navigation.pushState(null, '', '#test');
                expect(locals.navigateEvents.length).toBe(1);
                const navigateEvent = locals.navigateEvents[0];
                expect(navigateEvent.destination.url).toBe('https://test.com/#test');
                expect(navigateEvent.hashChange).toBeTrue();
                expect(locals.navigation.currentEntry.url).toBe('https://test.com/#test');
                expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
                expect(locals.popStateEvents.length).toBe(0);
            }));
            it('replace URL with hashchange', () => __awaiter(void 0, void 0, void 0, function* () {
                locals.navigation.replaceState(null, '', '#test');
                expect(locals.navigateEvents.length).toBe(1);
                const navigateEvent = locals.navigateEvents[0];
                expect(navigateEvent.destination.url).toBe('https://test.com/#test');
                expect(navigateEvent.hashChange).toBeTrue();
                expect(locals.navigation.currentEntry.url).toBe('https://test.com/#test');
                expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
                expect(locals.popStateEvents.length).toBe(0);
            }));
            it('push URL with handler', () => __awaiter(void 0, void 0, void 0, function* () {
                let handlerFinishedResolve;
                const handlerFinished = new Promise((resolve) => {
                    handlerFinishedResolve = resolve;
                });
                locals.pendingInterceptOptions.push({
                    handler: () => handlerFinished,
                });
                locals.navigation.pushState(null, '', '/test');
                expect(locals.navigateEvents.length).toBe(1);
                const currentEntry = locals.navigation.currentEntry;
                expect(currentEntry.url).toBe('https://test.com/test');
                expect(currentEntry.key).toBe('1');
                expect(currentEntry.id).toBe('1');
                expect(currentEntry.index).toBe(1);
                expect(currentEntry.sameDocument).toBeTrue();
                expect(currentEntry.getState()).toBeUndefined();
                expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
                expect(locals.popStateEvents.length).toBe(0);
                handlerFinishedResolve(undefined);
                expect(locals.navigation.currentEntry).toBe(currentEntry);
            }));
            it('replace URL with handler', () => __awaiter(void 0, void 0, void 0, function* () {
                let handlerFinishedResolve;
                const handlerFinished = new Promise((resolve) => {
                    handlerFinishedResolve = resolve;
                });
                locals.pendingInterceptOptions.push({
                    handler: () => handlerFinished,
                });
                locals.navigation.replaceState(null, '', '/test');
                expect(locals.navigateEvents.length).toBe(1);
                const currentEntry = locals.navigation.currentEntry;
                expect(currentEntry.url).toBe('https://test.com/test');
                expect(currentEntry.key).toBe('0');
                expect(currentEntry.id).toBe('1');
                expect(currentEntry.index).toBe(0);
                expect(currentEntry.sameDocument).toBeTrue();
                expect(currentEntry.getState()).toBeUndefined();
                expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
                expect(locals.popStateEvents.length).toBe(0);
                handlerFinishedResolve(undefined);
                expect(locals.navigation.currentEntry).toBe(currentEntry);
            }));
            it('push with interruption', () => __awaiter(void 0, void 0, void 0, function* () {
                locals.pendingInterceptOptions.push({
                    handler: () => new Promise(() => { }),
                });
                locals.navigation.pushState(null, '', '/test');
                expect(locals.navigateEvents.length).toBe(1);
                const navigateEvent = locals.navigateEvents[0];
                expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
                expect(locals.popStateEvents.length).toBe(0);
                locals.pendingInterceptOptions.push({});
                const interruptResult = locals.navigation.navigate('/interrupt');
                expect(navigateEvent.signal.aborted).toBeTrue();
                yield interruptResult.committed;
                expect(locals.navigationCurrentEntryChangeEvents.length).toBe(2);
                expect(locals.popStateEvents.length).toBe(0);
                yield interruptResult.finished;
            }));
            it('replace with interruption', () => __awaiter(void 0, void 0, void 0, function* () {
                locals.pendingInterceptOptions.push({
                    handler: () => new Promise(() => { }),
                });
                locals.navigation.replaceState(null, '', '/test');
                expect(locals.navigateEvents.length).toBe(1);
                const navigateEvent = locals.navigateEvents[0];
                expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
                expect(locals.popStateEvents.length).toBe(0);
                locals.pendingInterceptOptions.push({});
                const interruptResult = locals.navigation.navigate('/interrupt');
                expect(navigateEvent.signal.aborted).toBeTrue();
                yield interruptResult.committed;
                expect(locals.navigationCurrentEntryChangeEvents.length).toBe(2);
                expect(locals.popStateEvents.length).toBe(0);
                yield interruptResult.finished;
            }));
            it('push with handler reject', () => __awaiter(void 0, void 0, void 0, function* () {
                let handlerFinishedReject;
                const handlerPromise = new Promise((resolve, reject) => {
                    handlerFinishedReject = reject;
                });
                locals.pendingInterceptOptions.push({
                    handler: () => handlerPromise,
                });
                locals.navigation.pushState(null, '', '/test');
                expect(locals.navigateEvents.length).toBe(1);
                const navigateEvent = locals.navigateEvents[0];
                expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
                expect(locals.popStateEvents.length).toBe(0);
                const error = new Error('rejected');
                handlerFinishedReject(error);
                yield expectAsync(handlerPromise).toBeRejectedWith(error);
                expect(navigateEvent.signal.aborted).toBeTrue();
            }));
            it('replace with reject', () => __awaiter(void 0, void 0, void 0, function* () {
                let handlerFinishedReject;
                const handlerPromise = new Promise((resolve, reject) => {
                    handlerFinishedReject = reject;
                });
                locals.pendingInterceptOptions.push({
                    handler: () => handlerPromise,
                });
                locals.navigation.replaceState(null, '', '/test');
                expect(locals.navigateEvents.length).toBe(1);
                const navigateEvent = locals.navigateEvents[0];
                expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
                expect(locals.popStateEvents.length).toBe(0);
                const error = new Error('rejected');
                handlerFinishedReject(error);
                yield expectAsync(handlerPromise).toBeRejectedWith(error);
                expect(navigateEvent.signal.aborted).toBeTrue();
            }));
        });
        describe('traversal', () => {
            it('go back', () => __awaiter(void 0, void 0, void 0, function* () {
                expect(locals.navigation.canGoBack).toBeFalse();
                expect(locals.navigation.canGoForward).toBeFalse();
                const [firstPageEntry, , thirdPageEntry] = yield setUpEntries();
                expect(locals.navigation.canGoBack).toBeTrue();
                expect(locals.navigation.canGoForward).toBeFalse();
                locals.navigation.go(-2);
                const navigateEvent = yield locals.nextNavigateEvent();
                expect(navigateEvent).toEqual(jasmine.objectContaining({
                    canIntercept: true,
                    hashChange: false,
                    info: undefined,
                    navigationType: 'traverse',
                    signal: jasmine.any(AbortSignal),
                    userInitiated: false,
                    destination: jasmine.objectContaining({
                        url: firstPageEntry.url,
                        key: firstPageEntry.key,
                        id: firstPageEntry.id,
                        index: firstPageEntry.index,
                        sameDocument: true,
                    }),
                }));
                expect(navigateEvent.destination.getState()).toEqual(firstPageEntry.getState());
                expect(navigateEvent.destination.getHistoryState()).toEqual(firstPageEntry.getHistoryState());
                expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
                const currentEntryChangeEvent = locals.navigationCurrentEntryChangeEvents[0];
                expect(currentEntryChangeEvent).toEqual(jasmine.objectContaining({
                    navigationType: 'traverse',
                    from: jasmine.objectContaining({
                        url: thirdPageEntry.url,
                        key: thirdPageEntry.key,
                        id: thirdPageEntry.id,
                        index: thirdPageEntry.index,
                        sameDocument: true,
                    }),
                }));
                expect(currentEntryChangeEvent.from.getState()).toEqual(thirdPageEntry.getState());
                expect(currentEntryChangeEvent.from.getHistoryState()).toEqual(thirdPageEntry.getHistoryState());
                expect(locals.popStateEvents.length).toBe(1);
                const popStateEvent = locals.popStateEvents[0];
                expect(popStateEvent.state).toBeNull();
                expect(locals.navigation.canGoBack).toBeTrue();
                expect(locals.navigation.canGoForward).toBeTrue();
            }));
            it('go forward', () => __awaiter(void 0, void 0, void 0, function* () {
                expect(locals.navigation.canGoBack).toBeFalse();
                expect(locals.navigation.canGoForward).toBeFalse();
                const [firstPageEntry, , thirdPageEntry] = yield setUpEntries();
                yield locals.navigation.traverseTo(firstPageEntry.key).finished;
                locals.navigateEvents.length = 0;
                locals.navigationCurrentEntryChangeEvents.length = 0;
                locals.popStateEvents.length = 0;
                expect(locals.navigation.canGoBack).toBeTrue();
                expect(locals.navigation.canGoForward).toBeTrue();
                locals.navigation.go(2);
                const navigateEvent = yield locals.nextNavigateEvent();
                expect(navigateEvent).toEqual(jasmine.objectContaining({
                    canIntercept: true,
                    hashChange: false,
                    info: undefined,
                    navigationType: 'traverse',
                    signal: jasmine.any(AbortSignal),
                    userInitiated: false,
                    destination: jasmine.objectContaining({
                        url: thirdPageEntry.url,
                        key: thirdPageEntry.key,
                        id: thirdPageEntry.id,
                        index: thirdPageEntry.index,
                        sameDocument: true,
                    }),
                }));
                expect(navigateEvent.destination.getState()).toEqual(thirdPageEntry.getState());
                expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
                const currentEntryChangeEvent = locals.navigationCurrentEntryChangeEvents[0];
                expect(currentEntryChangeEvent).toEqual(jasmine.objectContaining({
                    navigationType: 'traverse',
                    from: jasmine.objectContaining({
                        url: firstPageEntry.url,
                        key: firstPageEntry.key,
                        id: firstPageEntry.id,
                        index: firstPageEntry.index,
                        sameDocument: true,
                    }),
                }));
                expect(currentEntryChangeEvent.from.getState()).toEqual(firstPageEntry.getState());
                expect(locals.popStateEvents.length).toBe(1);
                const popStateEvent = locals.popStateEvents[0];
                expect(popStateEvent.state).toBeNull();
                expect(locals.navigation.currentEntry).toBe(thirdPageEntry);
                expect(locals.navigateEvents.length).toBe(1);
                expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
                expect(locals.popStateEvents.length).toBe(1);
                expect(locals.navigation.canGoBack).toBeTrue();
                expect(locals.navigation.canGoForward).toBeFalse();
            }));
            it('go back with hashchange', () => __awaiter(void 0, void 0, void 0, function* () {
                yield setUpEntries({ hash: true });
                locals.navigation.go(-2);
                const navigateEvent = yield locals.nextNavigateEvent();
                expect(navigateEvent.hashChange).toBeTrue();
                expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
                expect(locals.popStateEvents.length).toBe(1);
            }));
            it('go back with history state', () => __awaiter(void 0, void 0, void 0, function* () {
                const [firstPageEntry] = setUpEntriesWithHistory();
                locals.navigation.go(-2);
                const navigateEvent = yield locals.nextNavigateEvent();
                expect(navigateEvent.destination.getHistoryState()).toEqual(firstPageEntry.getHistoryState());
                expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
                expect(locals.popStateEvents.length).toBe(1);
                const popStateEvent = locals.popStateEvents[0];
                expect(popStateEvent.state).toEqual(firstPageEntry.getHistoryState());
            }));
            it('go forward with hashchange', () => __awaiter(void 0, void 0, void 0, function* () {
                const [firstPageEntry] = yield setUpEntries({ hash: true });
                yield locals.navigation.traverseTo(firstPageEntry.key).finished;
                locals.navigateEvents.length = 0;
                locals.navigationCurrentEntryChangeEvents.length = 0;
                locals.popStateEvents.length = 0;
                locals.navigation.go(2);
                const navigateEvent = yield locals.nextNavigateEvent();
                expect(navigateEvent.hashChange).toBeTrue();
                expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
                expect(locals.popStateEvents.length).toBe(1);
            }));
            it('go with handler', () => __awaiter(void 0, void 0, void 0, function* () {
                const [firstPageEntry] = yield setUpEntries();
                let handlerFinishedResolve;
                const handlerFinished = new Promise((resolve) => {
                    handlerFinishedResolve = resolve;
                });
                locals.pendingInterceptOptions.push({
                    handler: () => handlerFinished,
                });
                locals.navigation.go(-2);
                yield locals.nextNavigateEvent();
                expect(locals.navigation.currentEntry).toBe(firstPageEntry);
                expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
                expect(locals.popStateEvents.length).toBe(1);
                handlerFinishedResolve(undefined);
            }));
            it('go with interruption', () => __awaiter(void 0, void 0, void 0, function* () {
                const [firstPageEntry] = yield setUpEntries();
                locals.pendingInterceptOptions.push({
                    handler: () => new Promise(() => { }),
                });
                locals.navigation.go(-2);
                const navigateEvent = yield locals.nextNavigateEvent();
                expect(locals.navigation.currentEntry).toBe(firstPageEntry);
                expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
                expect(locals.popStateEvents.length).toBe(1);
                expect(navigateEvent.signal.aborted).toBeFalse();
                locals.pendingInterceptOptions.push({});
                const interruptResult = locals.navigation.navigate('/interrupt');
                yield interruptResult.committed;
                expect(navigateEvent.signal.aborted).toBeTrue();
                expect(locals.navigationCurrentEntryChangeEvents.length).toBe(2);
                expect(locals.popStateEvents.length).toBe(1);
                yield interruptResult.finished;
            }));
            it('go with reject', () => __awaiter(void 0, void 0, void 0, function* () {
                const [firstPageEntry] = yield setUpEntries();
                let handlerFinishedReject;
                locals.pendingInterceptOptions.push({
                    handler: () => new Promise((resolve, reject) => {
                        handlerFinishedReject = reject;
                    }),
                });
                locals.navigation.go(-2);
                const navigateEvent = yield locals.nextNavigateEvent();
                expect(locals.navigation.currentEntry).toBe(firstPageEntry);
                expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
                expect(locals.popStateEvents.length).toBe(1);
                expect(navigateEvent.signal.aborted).toBeFalse();
                const error = new Error('rejected');
                handlerFinishedReject(error);
                yield new Promise((resolve) => {
                    navigateEvent.signal.addEventListener('abort', resolve);
                });
                expect(navigateEvent.signal.aborted).toBeTrue();
                expect(locals.navigation.currentEntry).toBe(firstPageEntry);
            }));
            it('go synchronously', () => __awaiter(void 0, void 0, void 0, function* () {
                const [, secondPageEntry] = yield setUpEntries();
                locals.navigation.setSynchronousTraversalsForTesting(true);
                locals.navigation.go(-1);
                // Synchronously navigates.
                expect(locals.navigation.currentEntry).toBe(secondPageEntry);
                yield expectAsync(locals.nextNavigateEvent()).toBePending();
            }));
            it('go out of bounds', () => __awaiter(void 0, void 0, void 0, function* () {
                locals.navigation.go(-1);
                yield expectAsync(locals.nextNavigateEvent()).toBePending();
                locals.navigation.go(1);
                yield expectAsync(locals.nextNavigateEvent()).toBePending();
            }));
            it('go queues', () => __awaiter(void 0, void 0, void 0, function* () {
                const [firstPageEntry, secondPageEntry] = yield setUpEntries();
                locals.navigation.go(-1);
                locals.navigation.go(-1);
                const firstNavigateEvent = yield locals.nextNavigateEvent();
                expect(firstNavigateEvent.destination.key).toBe(secondPageEntry.key);
                expect(locals.navigation.currentEntry).toBe(secondPageEntry);
                expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
                expect(locals.popStateEvents.length).toBe(1);
                const secondNavigateEvent = yield locals.nextNavigateEvent();
                expect(secondNavigateEvent.destination.key).toBe(firstPageEntry.key);
                expect(locals.navigation.currentEntry).toBe(firstPageEntry);
                expect(locals.navigationCurrentEntryChangeEvents.length).toBe(2);
                expect(locals.popStateEvents.length).toBe(2);
            }));
            it('go queues both directions', () => __awaiter(void 0, void 0, void 0, function* () {
                const [firstPageEntry, secondPageEntry] = yield setUpEntries();
                locals.navigation.go(-2);
                locals.navigation.go(1);
                const firstNavigateEvent = yield locals.nextNavigateEvent();
                expect(firstNavigateEvent.destination.key).toBe(firstPageEntry.key);
                expect(locals.navigation.currentEntry).toBe(firstPageEntry);
                expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
                expect(locals.popStateEvents.length).toBe(1);
                const secondNavigateEvent = yield locals.nextNavigateEvent();
                expect(secondNavigateEvent.destination.key).toBe(secondPageEntry.key);
                expect(locals.navigation.currentEntry).toBe(secondPageEntry);
                expect(locals.navigationCurrentEntryChangeEvents.length).toBe(2);
                expect(locals.popStateEvents.length).toBe(2);
            }));
            it('go queues with back', () => __awaiter(void 0, void 0, void 0, function* () {
                const [firstPageEntry, secondPageEntry] = yield setUpEntries();
                locals.navigation.back();
                locals.navigation.go(-1);
                const firstNavigateEvent = yield locals.nextNavigateEvent();
                expect(firstNavigateEvent.destination.key).toBe(secondPageEntry.key);
                expect(locals.navigation.currentEntry).toBe(secondPageEntry);
                expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
                expect(locals.popStateEvents.length).toBe(1);
                const secondNavigateEvent = yield locals.nextNavigateEvent();
                expect(secondNavigateEvent.destination.key).toBe(firstPageEntry.key);
                expect(locals.navigation.currentEntry).toBe(firstPageEntry);
                expect(locals.navigationCurrentEntryChangeEvents.length).toBe(2);
                expect(locals.popStateEvents.length).toBe(2);
            }));
            it('go queues with forward', () => __awaiter(void 0, void 0, void 0, function* () {
                const [, secondPageEntry, thirdPageEntry] = yield setUpEntries();
                yield locals.navigation.back().finished;
                locals.navigateEvents.length = 0;
                locals.navigationCurrentEntryChangeEvents.length = 0;
                locals.popStateEvents.length = 0;
                locals.navigation.forward();
                locals.navigation.go(-1);
                const firstNavigateEvent = yield locals.nextNavigateEvent();
                expect(firstNavigateEvent.destination.key).toBe(thirdPageEntry.key);
                expect(locals.navigation.currentEntry).toBe(thirdPageEntry);
                expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
                expect(locals.popStateEvents.length).toBe(1);
                const secondNavigateEvent = yield locals.nextNavigateEvent();
                expect(secondNavigateEvent.destination.key).toBe(secondPageEntry.key);
                expect(locals.navigation.currentEntry).toBe(secondPageEntry);
                expect(locals.navigationCurrentEntryChangeEvents.length).toBe(2);
                expect(locals.popStateEvents.length).toBe(2);
            }));
            it('go after synchronous navigate', () => __awaiter(void 0, void 0, void 0, function* () {
                const [, secondPageEntry, thirdPageEntry] = yield setUpEntries();
                // Back to /page2
                locals.navigation.go(-1);
                // Push /interrupt on top of current /page3
                locals.pendingInterceptOptions.push({});
                const interruptResult = locals.navigation.navigate('/interrupt');
                // Back from /interrupt to /page3.
                locals.navigation.go(-1);
                const interruptEntry = yield interruptResult.finished;
                expect(locals.navigation.currentEntry).toBe(interruptEntry);
                expect(locals.navigationCurrentEntryChangeEvents.length).toBe(1);
                expect(locals.popStateEvents.length).toBe(0);
                const firstNavigateEvent = yield locals.nextNavigateEvent();
                expect(firstNavigateEvent.destination.key).toBe(secondPageEntry.key);
                expect(locals.navigation.currentEntry).toBe(secondPageEntry);
                expect(locals.navigationCurrentEntryChangeEvents.length).toBe(2);
                expect(locals.popStateEvents.length).toBe(1);
                const secondNavigateEvent = yield locals.nextNavigateEvent();
                expect(secondNavigateEvent.destination.key).toBe(thirdPageEntry.key);
                expect(locals.navigation.currentEntry).toBe(thirdPageEntry);
                expect(locals.navigationCurrentEntryChangeEvents.length).toBe(3);
                expect(locals.popStateEvents.length).toBe(2);
            }));
        });
    });
});
