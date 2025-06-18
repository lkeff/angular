"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = bootstrap;
exports.$apply = $apply;
exports.$digest = $digest;
const core_1 = require("@angular/core");
const static_1 = require("../../../static");
const constants_1 = require("../../../src/common/src/constants");
function bootstrap(platform, Ng2Module, element, ng1Module) {
    // We bootstrap the Angular module first; then when it is ready (async) we bootstrap the AngularJS
    // module on the bootstrap element (also ensuring that AngularJS errors will fail the test).
    return platform.bootstrapModule(Ng2Module).then((ref) => {
        const ngZone = ref.injector.get(core_1.NgZone);
        const upgrade = ref.injector.get(static_1.UpgradeModule);
        const failHardModule = ($provide) => {
            $provide.value(constants_1.$EXCEPTION_HANDLER, (err) => {
                throw err;
            });
        };
        // The `bootstrap()` helper is used for convenience in tests, so that we don't have to inject
        // and call `upgrade.bootstrap()` on every Angular module.
        // In order to closer emulate what happens in real application, ensure AngularJS is bootstrapped
        // inside the Angular zone.
        //
        ngZone.run(() => upgrade.bootstrap(element, [failHardModule, ng1Module.name]));
        return upgrade;
    });
}
function $apply(adapter, exp) {
    const $rootScope = adapter.$injector.get(constants_1.$ROOT_SCOPE);
    $rootScope.$apply(exp);
}
function $digest(adapter) {
    const $rootScope = adapter.$injector.get(constants_1.$ROOT_SCOPE);
    $rootScope.$digest();
}
