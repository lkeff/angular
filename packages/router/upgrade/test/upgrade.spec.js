"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$rootScopeMock = void 0;
exports.injectorFactory = injectorFactory;
const common_1 = require("@angular/common");
const upgrade_1 = require("@angular/common/upgrade");
const testing_1 = require("@angular/core/testing");
const index_1 = require("../../index");
const upgrade_2 = require("../../upgrade");
const static_1 = require("@angular/upgrade/static");
const upgrade_location_test_module_1 = require("./upgrade_location_test_module");
function injectorFactory() {
    const rootScopeMock = new $rootScopeMock();
    const rootElementMock = { on: () => undefined };
    return function $injectorGet(provider) {
        if (provider === '$rootScope') {
            return rootScopeMock;
        }
        else if (provider === '$rootElement') {
            return rootElementMock;
        }
        else {
            throw new Error(`Unsupported injectable mock: ${provider}`);
        }
    };
}
class $rootScopeMock {
    constructor() {
        this.watchers = [];
        this.events = {};
    }
    $watch(fn) {
        this.watchers.push(fn);
    }
    $broadcast(evt, ...args) {
        if (this.events[evt]) {
            this.events[evt].forEach((fn) => {
                fn.apply(fn, [/** angular.IAngularEvent*/ {}, ...args]);
            });
        }
        return {
            defaultPrevented: false,
            preventDefault() {
                this.defaultPrevented = true;
            },
        };
    }
    $on(evt, fn) {
        var _a;
        var _b;
        (_a = (_b = this.events)[evt]) !== null && _a !== void 0 ? _a : (_b[evt] = []);
        this.events[evt].push(fn);
    }
    $evalAsync(fn) {
        fn();
    }
    $digest() {
        this.watchers.forEach((fn) => fn());
    }
}
exports.$rootScopeMock = $rootScopeMock;
describe('setUpLocationSync', () => {
    let upgradeModule;
    let router;
    let location;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [
                index_1.RouterModule.forRoot([
                    { path: '1', children: [] },
                    { path: '2', children: [] },
                ]),
                static_1.UpgradeModule,
                upgrade_location_test_module_1.LocationUpgradeTestModule.config(),
            ],
        });
        upgradeModule = testing_1.TestBed.inject(static_1.UpgradeModule);
        router = testing_1.TestBed.inject(index_1.Router);
        location = testing_1.TestBed.inject(common_1.Location);
        spyOn(router, 'navigateByUrl').and.callThrough();
        spyOn(location, 'normalize').and.callThrough();
        upgradeModule.$injector = { get: injectorFactory() };
    });
    it('should throw an error if the UpgradeModule.bootstrap has not been called', () => {
        upgradeModule.$injector = null;
        expect(() => (0, upgrade_2.setUpLocationSync)(upgradeModule)).toThrowError(`
        RouterUpgradeInitializer can be used only after UpgradeModule.bootstrap has been called.
        Remove RouterUpgradeInitializer and call setUpLocationSync after UpgradeModule.bootstrap.
      `);
    });
    it('should get the $rootScope from AngularJS and set an $on watch on $locationChangeStart', () => {
        const $rootScope = upgradeModule.$injector.get('$rootScope');
        spyOn($rootScope, '$on');
        (0, upgrade_2.setUpLocationSync)(upgradeModule);
        expect($rootScope.$on).toHaveBeenCalledTimes(1);
        expect($rootScope.$on).toHaveBeenCalledWith('$locationChangeStart', jasmine.any(Function));
    });
    it('should navigate by url every time $locationChangeStart is broadcasted', () => {
        const url = 'https://google.com';
        const pathname = '/custom/route';
        const normalizedPathname = 'foo';
        const query = '?query=1&query2=3';
        const hash = '#new/hash';
        const $rootScope = upgradeModule.$injector.get('$rootScope');
        spyOn($rootScope, '$on');
        location.normalize.and.returnValue(normalizedPathname);
        (0, upgrade_2.setUpLocationSync)(upgradeModule);
        const callback = $rootScope.$on.calls.argsFor(0)[1];
        callback({}, url + pathname + query + hash, '');
        expect(router.navigateByUrl).toHaveBeenCalledTimes(1);
        expect(router.navigateByUrl).toHaveBeenCalledWith(normalizedPathname + query + hash);
    });
    it('should allow configuration to work with hash-based routing', () => {
        const url = 'https://google.com';
        const pathname = '/custom/route';
        const normalizedPathname = 'foo';
        const query = '?query=1&query2=3';
        const hash = '#new/hash';
        const combinedUrl = url + '#' + pathname + query + hash;
        const $rootScope = upgradeModule.$injector.get('$rootScope');
        spyOn($rootScope, '$on');
        location.normalize.and.returnValue(normalizedPathname);
        (0, upgrade_2.setUpLocationSync)(upgradeModule, 'hash');
        const callback = $rootScope.$on.calls.argsFor(0)[1];
        callback({}, combinedUrl, '');
        expect(router.navigateByUrl).toHaveBeenCalledTimes(1);
        expect(router.navigateByUrl).toHaveBeenCalledWith(normalizedPathname + query + hash);
    });
    it('should work correctly on browsers that do not start pathname with `/`', () => {
        const anchorProto = HTMLAnchorElement.prototype;
        const originalDescriptor = Object.getOwnPropertyDescriptor(anchorProto, 'pathname');
        Object.defineProperty(anchorProto, 'pathname', { get: () => 'foo/bar' });
        try {
            const $rootScope = upgradeModule.$injector.get('$rootScope');
            spyOn($rootScope, '$on');
            (0, upgrade_2.setUpLocationSync)(upgradeModule);
            const callback = $rootScope.$on.calls.argsFor(0)[1];
            callback({}, '', '');
            expect(location.normalize).toHaveBeenCalledWith('/foo/bar');
        }
        finally {
            Object.defineProperty(anchorProto, 'pathname', originalDescriptor);
        }
    });
    it('should not duplicate navigations triggered by Angular router', (0, testing_1.fakeAsync)(() => {
        spyOn(testing_1.TestBed.inject(upgrade_1.UrlCodec), 'parse').and.returnValue({
            pathname: '',
            href: '',
            protocol: '',
            host: '',
            search: '',
            hash: '',
            hostname: '',
            port: '',
        });
        const $rootScope = upgradeModule.$injector.get('$rootScope');
        spyOn($rootScope, '$broadcast').and.callThrough();
        (0, upgrade_2.setUpLocationSync)(upgradeModule);
        // Inject location shim so its urlChangeListener subscribes
        testing_1.TestBed.inject(upgrade_1.$locationShim);
        router.navigateByUrl('/1');
        location.normalize.and.returnValue('/1');
        (0, testing_1.flush)();
        expect(router.navigateByUrl).toHaveBeenCalledTimes(1);
        expect($rootScope.$broadcast.calls.argsFor(0)[0]).toEqual('$locationChangeStart');
        expect($rootScope.$broadcast.calls.argsFor(1)[0]).toEqual('$locationChangeSuccess');
        $rootScope.$broadcast.calls.reset();
        router.navigateByUrl.calls.reset();
        location.go('/2');
        location.normalize.and.returnValue('/2');
        (0, testing_1.flush)();
        expect($rootScope.$broadcast.calls.argsFor(0)[0]).toEqual('$locationChangeStart');
        expect($rootScope.$broadcast.calls.argsFor(1)[0]).toEqual('$locationChangeSuccess');
        expect(router.navigateByUrl).toHaveBeenCalledTimes(1);
    }));
});
