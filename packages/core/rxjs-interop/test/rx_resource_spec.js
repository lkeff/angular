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
const rxjs_1 = require("rxjs");
const testing_1 = require("../../testing");
const core_1 = require("../../src/core");
const src_1 = require("../src");
describe('rxResource()', () => {
    it('should fetch data using an observable loader', () => __awaiter(void 0, void 0, void 0, function* () {
        const injector = testing_1.TestBed.inject(core_1.Injector);
        const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
        const res = (0, src_1.rxResource)({
            stream: () => (0, rxjs_1.of)(1),
            injector,
        });
        yield appRef.whenStable();
        expect(res.value()).toBe(1);
    }));
    it('should cancel the fetch when a new request comes in', () => __awaiter(void 0, void 0, void 0, function* () {
        const injector = testing_1.TestBed.inject(core_1.Injector);
        const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
        const request = (0, core_1.signal)(1);
        let unsub = false;
        let lastSeenRequest = 0;
        (0, src_1.rxResource)({
            params: request,
            stream: ({ params: request }) => {
                lastSeenRequest = request;
                return new rxjs_1.Observable((sub) => {
                    if (request === 2) {
                        sub.next(true);
                    }
                    return () => {
                        if (request === 1) {
                            unsub = true;
                        }
                    };
                });
            },
            injector,
        });
        // Wait for the resource to reach loading state.
        yield waitFor(() => lastSeenRequest === 1);
        // Setting request = 2 should cancel request = 1
        request.set(2);
        yield appRef.whenStable();
        expect(unsub).toBe(true);
    }));
    it('should stream when the loader returns multiple values', () => __awaiter(void 0, void 0, void 0, function* () {
        const injector = testing_1.TestBed.inject(core_1.Injector);
        const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
        const response = new rxjs_1.BehaviorSubject(1);
        const res = (0, src_1.rxResource)({
            stream: () => response,
            injector,
        });
        yield appRef.whenStable();
        expect(res.value()).toBe(1);
        response.next(2);
        expect(res.value()).toBe(2);
        response.next(3);
        expect(res.value()).toBe(3);
        response.error('fail');
        expect(res.error()).toBe('fail');
    }));
});
function waitFor(fn) {
    return __awaiter(this, void 0, void 0, function* () {
        while (!fn()) {
            yield new Promise((resolve) => setTimeout(resolve, 1));
        }
    });
}
