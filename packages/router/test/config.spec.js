"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("../src/shared");
const config_1 = require("../src/utils/config");
describe('config', () => {
    describe('validateConfig', () => {
        it('should not throw when no errors', () => {
            expect(() => (0, config_1.validateConfig)([
                { path: 'a', redirectTo: 'b' },
                { path: 'b', component: ComponentA },
            ])).not.toThrow();
        });
        it('should not throw when a matcher is provided', () => {
            expect(() => (0, config_1.validateConfig)([{ matcher: () => null, component: ComponentA }])).not.toThrow();
        });
        it('should throw for undefined route', () => {
            expect(() => {
                (0, config_1.validateConfig)([
                    { path: 'a', component: ComponentA },
                    ,
                    { path: 'b', component: ComponentB },
                ]);
            }).toThrowError(/Invalid configuration of route ''/);
        });
        it('should throw for undefined route in children', () => {
            expect(() => {
                (0, config_1.validateConfig)([
                    {
                        path: 'a',
                        children: [{ path: 'b', component: ComponentB }, ,],
                    },
                ]);
            }).toThrowError(/Invalid configuration of route 'a'/);
        });
        it('should throw when Array is passed', () => {
            expect(() => {
                (0, config_1.validateConfig)([
                    { path: 'a', component: ComponentA },
                    [
                        { path: 'b', component: ComponentB },
                        { path: 'c', component: ComponentC },
                    ],
                ]);
            }).toThrowError();
        });
        it('should throw when redirectTo and children are used together', () => {
            expect(() => {
                (0, config_1.validateConfig)([
                    { path: 'a', redirectTo: 'b', children: [{ path: 'b', component: ComponentA }] },
                ]);
            }).toThrowError();
        });
        it('should validate children and report full path', () => {
            expect(() => (0, config_1.validateConfig)([{ path: 'a', children: [{ path: 'b' }] }])).toThrowError();
        });
        it('should properly report deeply nested path', () => {
            expect(() => (0, config_1.validateConfig)([
                { path: 'a', children: [{ path: 'b', children: [{ path: 'c', children: [{ path: 'd' }] }] }] },
            ])).toThrowError();
        });
        it('should throw when redirectTo and loadChildren are used together', () => {
            expect(() => {
                (0, config_1.validateConfig)([{ path: 'a', redirectTo: 'b', loadChildren: jasmine.createSpy('value') }]);
            }).toThrowError();
        });
        it('should throw when children and loadChildren are used together', () => {
            expect(() => {
                (0, config_1.validateConfig)([{ path: 'a', children: [], loadChildren: jasmine.createSpy('value') }]);
            }).toThrowError();
        });
        it('should throw when component and redirectTo are used together', () => {
            expect(() => {
                (0, config_1.validateConfig)([{ path: 'a', component: ComponentA, redirectTo: 'b' }]);
            }).toThrowError(new RegExp(`Invalid configuration of route 'a': redirectTo and component/loadComponent cannot be used together`));
        });
        it('should throw when redirectTo and loadComponent are used together', () => {
            expect(() => {
                (0, config_1.validateConfig)([{ path: 'a', redirectTo: 'b', loadComponent: () => ComponentA }]);
            }).toThrowError();
        });
        it('should throw when component and loadComponent are used together', () => {
            expect(() => {
                (0, config_1.validateConfig)([{ path: 'a', component: ComponentA, loadComponent: () => ComponentA }]);
            }).toThrowError();
        });
        it('should throw when component and redirectTo are used together', () => {
            expect(() => {
                (0, config_1.validateConfig)([{ path: 'a', redirectTo: 'b', canActivate: [] }]);
            }).toThrowError();
        });
        it('should throw when path and matcher are used together', () => {
            expect(() => {
                (0, config_1.validateConfig)([{ path: 'a', matcher: () => null, children: [] }]);
            }).toThrowError();
        });
        it('should throw when path and matcher are missing', () => {
            expect(() => {
                (0, config_1.validateConfig)([{ redirectTo: 'b' }]);
            }).toThrowError();
        });
        it('should throw when none of component and children or direct are missing', () => {
            expect(() => {
                (0, config_1.validateConfig)([{ path: 'a' }]);
            }).toThrowError();
        });
        it('should throw when path starts with a slash', () => {
            expect(() => {
                (0, config_1.validateConfig)([{ path: '/a', redirectTo: 'b' }]);
            }).toThrowError();
        });
        it('should throw when emptyPath is used with redirectTo without explicitly providing matching', () => {
            expect(() => {
                (0, config_1.validateConfig)([{ path: '', redirectTo: 'b' }]);
            }).toThrowError(/Invalid configuration of route '{path: "", redirectTo: "b"}'/);
        });
        it('should throw when path/outlet combination is invalid', () => {
            expect(() => {
                (0, config_1.validateConfig)([{ path: 'a', outlet: 'aux' }]);
            }).toThrowError(/Invalid configuration of route 'a': a componentless route without children or loadChildren cannot have a named outlet set/);
            expect(() => (0, config_1.validateConfig)([{ path: 'a', outlet: '', children: [] }])).not.toThrow();
            expect(() => (0, config_1.validateConfig)([{ path: 'a', outlet: shared_1.PRIMARY_OUTLET, children: [] }])).not.toThrow();
        });
        it('should not throw when path/outlet combination is valid', () => {
            expect(() => {
                (0, config_1.validateConfig)([{ path: 'a', outlet: 'aux', children: [] }]);
            }).not.toThrow();
            expect(() => {
                (0, config_1.validateConfig)([{ path: 'a', outlet: 'aux', loadChildren: jasmine.createSpy('child') }]);
            }).not.toThrow();
        });
        it('should not throw when outlet has redirectTo', () => {
            expect(() => {
                (0, config_1.validateConfig)([{ path: '', pathMatch: 'prefix', outlet: 'aux', redirectTo: 'main' }]);
            }).not.toThrow();
        });
    });
});
class ComponentA {
}
class ComponentB {
}
class ComponentC {
}
