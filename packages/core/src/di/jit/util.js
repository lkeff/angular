"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReflect = getReflect;
exports.reflectDependencies = reflectDependencies;
exports.convertDependencies = convertDependencies;
const errors_1 = require("../../errors");
const reflection_capabilities_1 = require("../../reflection/reflection_capabilities");
const metadata_1 = require("../metadata");
const metadata_attr_1 = require("../metadata_attr");
let _reflect = null;
function getReflect() {
    return (_reflect = _reflect || new reflection_capabilities_1.ReflectionCapabilities());
}
function reflectDependencies(type) {
    return convertDependencies(getReflect().parameters(type));
}
function convertDependencies(deps) {
    return deps.map((dep) => reflectDependency(dep));
}
function reflectDependency(dep) {
    const meta = {
        token: null,
        attribute: null,
        host: false,
        optional: false,
        self: false,
        skipSelf: false,
    };
    if (Array.isArray(dep) && dep.length > 0) {
        for (let j = 0; j < dep.length; j++) {
            const param = dep[j];
            if (param === undefined) {
                // param may be undefined if type of dep is not set by ngtsc
                continue;
            }
            const proto = Object.getPrototypeOf(param);
            if (param instanceof metadata_1.Optional || proto.ngMetadataName === 'Optional') {
                meta.optional = true;
            }
            else if (param instanceof metadata_1.SkipSelf || proto.ngMetadataName === 'SkipSelf') {
                meta.skipSelf = true;
            }
            else if (param instanceof metadata_1.Self || proto.ngMetadataName === 'Self') {
                meta.self = true;
            }
            else if (param instanceof metadata_1.Host || proto.ngMetadataName === 'Host') {
                meta.host = true;
            }
            else if (param instanceof metadata_1.Inject) {
                meta.token = param.token;
            }
            else if (param instanceof metadata_attr_1.Attribute) {
                if (param.attributeName === undefined) {
                    throw new errors_1.RuntimeError(204 /* RuntimeErrorCode.INVALID_INJECTION_TOKEN */, ngDevMode && `Attribute name must be defined.`);
                }
                meta.attribute = param.attributeName;
            }
            else {
                meta.token = param;
            }
        }
    }
    else if (dep === undefined || (Array.isArray(dep) && dep.length === 0)) {
        meta.token = null;
    }
    else {
        meta.token = dep;
    }
    return meta;
}
