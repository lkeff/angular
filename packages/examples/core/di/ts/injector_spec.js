"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
// TODO(crisbeto): change the `options` parameter of `MockRootScopeInjector.get` to be
// `InjectOptions` once #60318 is released.
class MockRootScopeInjector {
    constructor(parent) {
        this.parent = parent;
    }
    get(token, defaultValue, options) {
        if (token.ɵprov && token.ɵprov.providedIn === 'root') {
            return (0, core_1.runInInjectionContext)(this, () => {
                return token.ɵprov.factory();
            });
        }
        return this.parent.get(token, defaultValue, options);
    }
}
{
    describe('injector metadata examples', () => {
        it('works', () => {
            // #docregion Injector
            const injector = core_1.Injector.create({
                providers: [{ provide: 'validToken', useValue: 'Value' }],
            });
            expect(injector.get('validToken')).toEqual('Value');
            expect(() => injector.get('invalidToken')).toThrowError();
            expect(injector.get('invalidToken', 'notFound')).toEqual('notFound');
            // #enddocregion
        });
        it('injects injector', () => {
            // #docregion injectInjector
            const injector = core_1.Injector.create({ providers: [] });
            expect(injector.get(core_1.Injector)).toBe(injector);
            // #enddocregion
        });
        it('should infer type', () => {
            // #docregion InjectionToken
            const BASE_URL = new core_1.InjectionToken('BaseUrl');
            const injector = core_1.Injector.create({
                providers: [{ provide: BASE_URL, useValue: 'http://localhost' }],
            });
            const url = injector.get(BASE_URL);
            // Note: since `BASE_URL` is `InjectionToken<string>`
            // `url` is correctly inferred to be `string`
            expect(url).toBe('http://localhost');
            // #enddocregion
        });
        it('injects a tree-shakeable InjectionToken', () => {
            class MyDep {
            }
            const injector = new MockRootScopeInjector(core_1.Injector.create({ providers: [{ provide: MyDep, deps: [] }] }));
            // #docregion ShakableInjectionToken
            class MyService {
                constructor(myDep) {
                    this.myDep = myDep;
                }
            }
            const MY_SERVICE_TOKEN = new core_1.InjectionToken('Manually constructed MyService', {
                providedIn: 'root',
                factory: () => new MyService((0, core_1.inject)(MyDep)),
            });
            const instance = injector.get(MY_SERVICE_TOKEN);
            expect(instance instanceof MyService).toBeTruthy();
            expect(instance.myDep instanceof MyDep).toBeTruthy();
            // #enddocregion
        });
    });
}
