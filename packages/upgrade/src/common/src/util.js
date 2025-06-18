"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deferred = void 0;
exports.onError = onError;
exports.cleanData = cleanData;
exports.controllerKey = controllerKey;
exports.destroyApp = destroyApp;
exports.directiveNormalize = directiveNormalize;
exports.getTypeName = getTypeName;
exports.getDowngradedModuleCount = getDowngradedModuleCount;
exports.getUpgradeAppType = getUpgradeAppType;
exports.isFunction = isFunction;
exports.isNgModuleType = isNgModuleType;
exports.validateInjectionKey = validateInjectionKey;
exports.hookupNgModel = hookupNgModel;
exports.strictEquals = strictEquals;
const core_1 = require("@angular/core");
const angular1_1 = require("./angular1");
const constants_1 = require("./constants");
const DIRECTIVE_PREFIX_REGEXP = /^(?:x|data)[:\-_]/i;
const DIRECTIVE_SPECIAL_CHARS_REGEXP = /[:\-_]+(.)/g;
function onError(e) {
    // TODO: (misko): We seem to not have a stack trace here!
    console.error(e, e.stack);
    throw e;
}
/**
 * Clean the jqLite/jQuery data on the element and all its descendants.
 * Equivalent to how jqLite/jQuery invoke `cleanData()` on an Element when removed:
 *   https://github.com/angular/angular.js/blob/2e72ea13fa98bebf6ed4b5e3c45eaf5f990ed16f/src/jqLite.js#L349-L355
 *   https://github.com/jquery/jquery/blob/6984d1747623dbc5e87fd6c261a5b6b1628c107c/src/manipulation.js#L182
 *
 * NOTE:
 * `cleanData()` will also invoke the AngularJS `$destroy` DOM event on the element:
 *   https://github.com/angular/angular.js/blob/2e72ea13fa98bebf6ed4b5e3c45eaf5f990ed16f/src/Angular.js#L1932-L1945
 *
 * @param node The DOM node whose data needs to be cleaned.
 */
function cleanData(node) {
    angular1_1.element.cleanData([node]);
    if (isParentNode(node)) {
        angular1_1.element.cleanData(node.querySelectorAll('*'));
    }
}
function controllerKey(name) {
    return '$' + name + 'Controller';
}
/**
 * Destroy an AngularJS app given the app `$injector`.
 *
 * NOTE: Destroying an app is not officially supported by AngularJS, but try to do our best by
 *       destroying `$rootScope` and clean the jqLite/jQuery data on `$rootElement` and all
 *       descendants.
 *
 * @param $injector The `$injector` of the AngularJS app to destroy.
 */
function destroyApp($injector) {
    const $rootElement = $injector.get(constants_1.$ROOT_ELEMENT);
    const $rootScope = $injector.get(constants_1.$ROOT_SCOPE);
    $rootScope.$destroy();
    cleanData($rootElement[0]);
}
function directiveNormalize(name) {
    return name
        .replace(DIRECTIVE_PREFIX_REGEXP, '')
        .replace(DIRECTIVE_SPECIAL_CHARS_REGEXP, (_, letter) => letter.toUpperCase());
}
function getTypeName(type) {
    // Return the name of the type or the first line of its stringified version.
    return type.overriddenName || type.name || type.toString().split('\n')[0];
}
function getDowngradedModuleCount($injector) {
    return $injector.has(constants_1.DOWNGRADED_MODULE_COUNT_KEY)
        ? $injector.get(constants_1.DOWNGRADED_MODULE_COUNT_KEY)
        : 0;
}
function getUpgradeAppType($injector) {
    return $injector.has(constants_1.UPGRADE_APP_TYPE_KEY)
        ? $injector.get(constants_1.UPGRADE_APP_TYPE_KEY)
        : 0 /* UpgradeAppType.None */;
}
function isFunction(value) {
    return typeof value === 'function';
}
function isNgModuleType(value) {
    // NgModule class should have the `ɵmod` static property attached by AOT or JIT compiler.
    return isFunction(value) && !!value[core_1.ɵNG_MOD_DEF];
}
function isParentNode(node) {
    return isFunction(node.querySelectorAll);
}
function validateInjectionKey($injector, downgradedModule, injectionKey, attemptedAction) {
    const upgradeAppType = getUpgradeAppType($injector);
    const downgradedModuleCount = getDowngradedModuleCount($injector);
    // Check for common errors.
    switch (upgradeAppType) {
        case 1 /* UpgradeAppType.Dynamic */:
        case 2 /* UpgradeAppType.Static */:
            if (downgradedModule) {
                throw new Error(`Error while ${attemptedAction}: 'downgradedModule' unexpectedly specified.\n` +
                    "You should not specify a value for 'downgradedModule', unless you are downgrading " +
                    "more than one Angular module (via 'downgradeModule()').");
            }
            break;
        case 3 /* UpgradeAppType.Lite */:
            if (!downgradedModule && downgradedModuleCount >= 2) {
                throw new Error(`Error while ${attemptedAction}: 'downgradedModule' not specified.\n` +
                    'This application contains more than one downgraded Angular module, thus you need to ' +
                    "always specify 'downgradedModule' when downgrading components and injectables.");
            }
            if (!$injector.has(injectionKey)) {
                throw new Error(`Error while ${attemptedAction}: Unable to find the specified downgraded module.\n` +
                    'Did you forget to downgrade an Angular module or include it in the AngularJS ' +
                    'application?');
            }
            break;
        default:
            throw new Error(`Error while ${attemptedAction}: Not a valid '@angular/upgrade' application.\n` +
                'Did you forget to downgrade an Angular module or include it in the AngularJS ' +
                'application?');
    }
}
class Deferred {
    constructor() {
        this.promise = new Promise((res, rej) => {
            this.resolve = res;
            this.reject = rej;
        });
    }
}
exports.Deferred = Deferred;
/**
 * @return Whether the passed-in component implements the subset of the
 *     `ControlValueAccessor` interface needed for AngularJS `ng-model`
 *     compatibility.
 */
function supportsNgModel(component) {
    return (typeof component.writeValue === 'function' && typeof component.registerOnChange === 'function');
}
/**
 * Glue the AngularJS `NgModelController` (if it exists) to the component
 * (if it implements the needed subset of the `ControlValueAccessor` interface).
 */
function hookupNgModel(ngModel, component) {
    if (ngModel && supportsNgModel(component)) {
        ngModel.$render = () => {
            component.writeValue(ngModel.$viewValue);
        };
        component.registerOnChange(ngModel.$setViewValue.bind(ngModel));
        if (typeof component.registerOnTouched === 'function') {
            component.registerOnTouched(ngModel.$setTouched.bind(ngModel));
        }
    }
}
/**
 * Test two values for strict equality, accounting for the fact that `NaN !== NaN`.
 */
function strictEquals(val1, val2) {
    return val1 === val2 || (val1 !== val1 && val2 !== val2);
}
