"use strict";
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
exports.routerEventsIntegrationSuite = routerEventsIntegrationSuite;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const operators_1 = require("rxjs/operators");
const testing_1 = require("@angular/core/testing");
const matchers_1 = require("@angular/platform-browser/testing/src/matchers");
const src_1 = require("../../src");
const integration_helpers_1 = require("./integration_helpers");
function routerEventsIntegrationSuite() {
    describe('route events', () => {
        it('should fire matching (Child)ActivationStart/End events', () => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const router = testing_1.TestBed.inject(src_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([{ path: 'user/:name', component: integration_helpers_1.UserCmp }]);
            const recordedEvents = [];
            router.events.forEach((e) => recordedEvents.push(e));
            router.navigateByUrl('/user/fedor');
            yield (0, integration_helpers_1.advance)(fixture);
            const event3 = recordedEvents[3];
            const event9 = recordedEvents[9];
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('user fedor');
            (0, matchers_1.expect)(event3 instanceof src_1.ChildActivationStart).toBe(true);
            (0, matchers_1.expect)(event3.snapshot).toBe(event9.snapshot.root);
            (0, matchers_1.expect)(event9 instanceof src_1.ChildActivationEnd).toBe(true);
            (0, matchers_1.expect)(event9.snapshot).toBe(event9.snapshot.root);
            const event4 = recordedEvents[4];
            const event8 = recordedEvents[8];
            (0, matchers_1.expect)(event4 instanceof src_1.ActivationStart).toBe(true);
            (0, matchers_1.expect)((_a = event4.snapshot.routeConfig) === null || _a === void 0 ? void 0 : _a.path).toBe('user/:name');
            (0, matchers_1.expect)(event8 instanceof src_1.ActivationEnd).toBe(true);
            (0, matchers_1.expect)((_b = event8.snapshot.routeConfig) === null || _b === void 0 ? void 0 : _b.path).toBe('user/:name');
            (0, integration_helpers_1.expectEvents)(recordedEvents, [
                [src_1.NavigationStart, '/user/fedor'],
                [src_1.RoutesRecognized, '/user/fedor'],
                [src_1.GuardsCheckStart, '/user/fedor'],
                [src_1.ChildActivationStart],
                [src_1.ActivationStart],
                [src_1.GuardsCheckEnd, '/user/fedor'],
                [src_1.ResolveStart, '/user/fedor'],
                [src_1.ResolveEnd, '/user/fedor'],
                [src_1.ActivationEnd],
                [src_1.ChildActivationEnd],
                [src_1.NavigationEnd, '/user/fedor'],
            ]);
        }));
        it('should allow redirection in NavigationStart', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([
                { path: 'blank', component: integration_helpers_1.UserCmp },
                { path: 'user/:name', component: integration_helpers_1.BlankCmp },
            ]);
            const navigateSpy = spyOn(router, 'navigate').and.callThrough();
            const recordedEvents = [];
            const navStart$ = router.events.pipe((0, operators_1.tap)((e) => recordedEvents.push(e)), (0, operators_1.filter)((e) => e instanceof src_1.NavigationStart), (0, operators_1.first)());
            navStart$.subscribe((e) => {
                router.navigate(['/blank'], {
                    queryParams: { state: 'redirected' },
                    queryParamsHandling: 'merge',
                });
                (0, integration_helpers_1.advance)(fixture);
            });
            router.navigate(['/user/:fedor']);
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(navigateSpy.calls.mostRecent().args[1].queryParams);
        }));
        it('should stop emitting events after the router is destroyed', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([{ path: 'user/:name', component: integration_helpers_1.UserCmp }]);
            let events = 0;
            const subscription = router.events.subscribe(() => events++);
            router.navigateByUrl('/user/frodo');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(events).toBeGreaterThan(0);
            const previousCount = events;
            router.dispose();
            router.navigateByUrl('/user/bilbo');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(events).toBe(previousCount);
            subscription.unsubscribe();
        }));
        it('should resolve navigation promise with false after the router is destroyed', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            let result = null;
            const callback = (r) => (result = r);
            router.resetConfig([{ path: 'user/:name', component: integration_helpers_1.UserCmp }]);
            router.navigateByUrl('/user/frodo').then(callback);
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(result).toBe(true);
            result = null;
            router.dispose();
            router.navigateByUrl('/user/bilbo').then(callback);
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(result).toBe(false);
            result = null;
            router.navigate(['/user/bilbo']).then(callback);
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(result).toBe(false);
        }));
    });
}
