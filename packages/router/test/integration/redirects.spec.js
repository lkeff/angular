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
exports.redirectsIntegrationSuite = redirectsIntegrationSuite;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const common_1 = require("@angular/common");
const testing_1 = require("@angular/core/testing");
const src_1 = require("../../src");
const integration_helpers_1 = require("./integration_helpers");
function redirectsIntegrationSuite() {
    describe('redirects', () => {
        it('should work', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const location = testing_1.TestBed.inject(common_1.Location);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([
                { path: 'old/team/:id', redirectTo: 'team/:id' },
                { path: 'team/:id', component: integration_helpers_1.TeamCmp },
            ]);
            yield router.navigateByUrl('old/team/22');
            expect(location.path()).toEqual('/team/22');
        }));
        it('can redirect from componentless named outlets', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([
                { path: 'main', outlet: 'aux', component: integration_helpers_1.BlankCmp },
                { path: '', pathMatch: 'full', outlet: 'aux', redirectTo: 'main' },
            ]);
            yield router.navigateByUrl('');
            expect(testing_1.TestBed.inject(common_1.Location).path()).toEqual('/(aux:main)');
        }));
        it('should update Navigation object after redirects are applied', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const location = testing_1.TestBed.inject(common_1.Location);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            let initialUrl, afterRedirectUrl;
            router.resetConfig([
                { path: 'old/team/:id', redirectTo: 'team/:id' },
                { path: 'team/:id', component: integration_helpers_1.TeamCmp },
            ]);
            router.events.subscribe((e) => {
                if (e instanceof src_1.NavigationStart) {
                    const navigation = router.getCurrentNavigation();
                    initialUrl = navigation && navigation.finalUrl;
                }
                if (e instanceof src_1.RoutesRecognized) {
                    const navigation = router.getCurrentNavigation();
                    afterRedirectUrl = navigation && navigation.finalUrl;
                }
            });
            yield router.navigateByUrl('old/team/22');
            expect(initialUrl).toBeUndefined();
            expect(router.serializeUrl(afterRedirectUrl)).toBe('/team/22');
        }));
        it('should not break the back button when trigger by location change', () => __awaiter(this, void 0, void 0, function* () {
            testing_1.TestBed.configureTestingModule({
                providers: [{ provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }],
            });
            const router = testing_1.TestBed.inject(src_1.Router);
            const location = testing_1.TestBed.inject(common_1.Location);
            const fixture = testing_1.TestBed.createComponent(integration_helpers_1.RootCmp);
            yield (0, integration_helpers_1.advance)(fixture);
            router.resetConfig([
                { path: 'initial', component: integration_helpers_1.BlankCmp },
                { path: 'old/team/:id', redirectTo: 'team/:id' },
                { path: 'team/:id', component: integration_helpers_1.TeamCmp },
            ]);
            location.go('initial');
            location.historyGo(0);
            location.go('old/team/22');
            location.historyGo(0);
            // initial navigation
            router.initialNavigation();
            yield (0, integration_helpers_1.advance)(fixture);
            expect(location.path()).toEqual('/team/22');
            location.back();
            yield (0, integration_helpers_1.advance)(fixture);
            expect(location.path()).toEqual('/initial');
            // location change
            location.go('/old/team/33');
            location.historyGo(0);
            yield (0, integration_helpers_1.advance)(fixture);
            expect(location.path()).toEqual('/team/33');
            location.back();
            yield (0, integration_helpers_1.advance)(fixture);
            expect(location.path()).toEqual('/initial');
        }));
    });
}
