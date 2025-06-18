"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeDirectiveState = serializeDirectiveState;
exports.deeplySerializeSelectedProperties = deeplySerializeSelectedProperties;
const protocol_1 = require("protocol");
const utils_1 = require("../utils");
const object_utils_1 = require("./object-utils");
const prop_type_1 = require("./prop-type");
const serialized_descriptor_factory_1 = require("./serialized-descriptor-factory");
// todo(aleksanderbodurri) pull this out of this file
const METADATA_PROPERTY_NAME = '__ngContext__';
const ignoreList = new Set([METADATA_PROPERTY_NAME, '__ngSimpleChanges__']);
const MAX_LEVEL = 1;
function nestedSerializer(instance, propName, nodes, isReadonly, currentLevel = 0, level = MAX_LEVEL) {
    instance = (0, utils_1.unwrapSignal)(instance);
    const serializableInstance = instance[propName];
    const propData = {
        prop: serializableInstance,
        type: (0, prop_type_1.getPropType)(serializableInstance),
        containerType: getContainerType(serializableInstance),
    };
    if (currentLevel < level) {
        const continuation = (instance, propName, isReadonly, nestedLevel, _) => {
            var _a, _b;
            const nodeChildren = (_b = (_a = nodes.find((v) => v.name === propName)) === null || _a === void 0 ? void 0 : _a.children) !== null && _b !== void 0 ? _b : [];
            return nestedSerializer(instance, propName, nodeChildren, isReadonly, nestedLevel, level);
        };
        return levelSerializer(instance, propName, isReadonly, currentLevel, level, continuation);
    }
    switch (propData.type) {
        case protocol_1.PropType.Array:
        case protocol_1.PropType.Object:
            return (0, serialized_descriptor_factory_1.createNestedSerializedDescriptor)(instance, propName, propData, { level, currentLevel }, nodes, nestedSerializer);
        default:
            return (0, serialized_descriptor_factory_1.createShallowSerializedDescriptor)(instance, propName, propData, isReadonly);
    }
}
function levelSerializer(instance, propName, isReadonly, currentLevel = 0, level = MAX_LEVEL, continuation = levelSerializer) {
    const serializableInstance = instance[propName];
    const propData = {
        prop: serializableInstance,
        type: (0, prop_type_1.getPropType)(serializableInstance),
        containerType: getContainerType(serializableInstance),
    };
    switch (propData.type) {
        case protocol_1.PropType.Array:
        case protocol_1.PropType.Object:
            return (0, serialized_descriptor_factory_1.createLevelSerializedDescriptor)(instance, propName, propData, { level, currentLevel }, continuation);
        default:
            return (0, serialized_descriptor_factory_1.createShallowSerializedDescriptor)(instance, propName, propData, isReadonly);
    }
}
function serializeDirectiveState(instance) {
    const result = {};
    const value = (0, utils_1.unwrapSignal)(instance);
    const isReadonly = (0, utils_1.isSignal)(instance);
    (0, object_utils_1.getKeys)(value).forEach((prop) => {
        if (typeof prop === 'string' && ignoreList.has(prop)) {
            return;
        }
        result[prop] = levelSerializer(value, prop, isReadonly, 0, 0);
    });
    return result;
}
function deeplySerializeSelectedProperties(instance, props) {
    const result = {};
    const isReadonly = (0, utils_1.isSignal)(instance);
    (0, object_utils_1.getKeys)(instance).forEach((prop) => {
        var _a;
        if (ignoreList.has(prop)) {
            return;
        }
        const childrenProps = (_a = props.find((v) => v.name === prop)) === null || _a === void 0 ? void 0 : _a.children;
        if (!childrenProps) {
            result[prop] = levelSerializer(instance, prop, isReadonly);
        }
        else {
            result[prop] = nestedSerializer(instance, prop, childrenProps, isReadonly);
        }
    });
    return result;
}
function getContainerType(instance) {
    if ((0, utils_1.isSignal)(instance)) {
        return isWritableSignal(instance) ? 'WritableSignal' : 'ReadonlySignal';
    }
    return null;
}
function isWritableSignal(s) {
    return typeof s['set'] === 'function';
}
