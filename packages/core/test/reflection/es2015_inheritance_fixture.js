"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChildNoCtorPrivateProps = exports.ChildWithCtor = exports.ChildNoCtor = void 0;
// AMD module name is required so that this file can be loaded in the Karma tests.
/// <amd-module name="angular/packages/core/test/reflection/es5_downleveled_inheritance_fixture" />
class Parent {
}
class ChildNoCtor extends Parent {
}
exports.ChildNoCtor = ChildNoCtor;
class ChildWithCtor extends Parent {
    constructor() {
        super();
    }
}
exports.ChildWithCtor = ChildWithCtor;
class ChildNoCtorPrivateProps extends Parent {
    constructor() {
        super(...arguments);
        this.x = 10;
    }
}
exports.ChildNoCtorPrivateProps = ChildNoCtorPrivateProps;
