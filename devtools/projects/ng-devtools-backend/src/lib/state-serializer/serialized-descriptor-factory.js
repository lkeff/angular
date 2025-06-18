"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createShallowSerializedDescriptor = createShallowSerializedDescriptor;
exports.createLevelSerializedDescriptor = createLevelSerializedDescriptor;
exports.createNestedSerializedDescriptor = createNestedSerializedDescriptor;
const protocol_1 = require("protocol");
const utils_1 = require("../utils");
const object_utils_1 = require("./object-utils");
// todo(aleksanderbodurri) pull this out of this file
const METADATA_PROPERTY_NAME = '__ngContext__';
const serializable = new Set([
    protocol_1.PropType.Boolean,
    protocol_1.PropType.String,
    protocol_1.PropType.Null,
    protocol_1.PropType.Number,
    protocol_1.PropType.Object,
    protocol_1.PropType.Undefined,
    protocol_1.PropType.Unknown,
]);
const typeToDescriptorPreview = {
    [protocol_1.PropType.Array]: (prop) => `Array(${prop.length})`,
    [protocol_1.PropType.Set]: (prop) => `Set(${prop.size})`,
    [protocol_1.PropType.Map]: (prop) => `Map(${prop.size})`,
    [protocol_1.PropType.BigInt]: (prop) => truncate(prop.toString()),
    [protocol_1.PropType.Boolean]: (prop) => truncate(prop.toString()),
    [protocol_1.PropType.String]: (prop) => `"${prop}"`,
    [protocol_1.PropType.Function]: (prop) => `${prop.name}(...)`,
    [protocol_1.PropType.HTMLNode]: (prop) => prop.constructor.name,
    [protocol_1.PropType.Null]: (_) => 'null',
    [protocol_1.PropType.Number]: (prop) => parseInt(prop, 10).toString(),
    [protocol_1.PropType.Object]: (prop) => ((0, object_utils_1.getKeys)(prop).length > 0 ? '{...}' : '{}'),
    [protocol_1.PropType.Symbol]: (symbol) => `Symbol(${symbol.description})`,
    [protocol_1.PropType.Undefined]: (_) => 'undefined',
    [protocol_1.PropType.Date]: (prop) => {
        if (prop instanceof Date) {
            return `Date(${new Date(prop).toISOString()})`;
        }
        return `${prop}`;
    },
    [protocol_1.PropType.Unknown]: (_) => 'unknown',
};
const ignoreList = new Set([METADATA_PROPERTY_NAME, '__ngSimpleChanges__']);
const shallowPropTypeToTreeMetaData = {
    [protocol_1.PropType.String]: {
        editable: true,
        expandable: false,
    },
    [protocol_1.PropType.BigInt]: {
        editable: false,
        expandable: false,
    },
    [protocol_1.PropType.Boolean]: {
        editable: true,
        expandable: false,
    },
    [protocol_1.PropType.Number]: {
        editable: true,
        expandable: false,
    },
    [protocol_1.PropType.Date]: {
        editable: false,
        expandable: false,
    },
    [protocol_1.PropType.Null]: {
        editable: true,
        expandable: false,
    },
    [protocol_1.PropType.Undefined]: {
        editable: true,
        expandable: false,
    },
    [protocol_1.PropType.Symbol]: {
        editable: false,
        expandable: false,
    },
    [protocol_1.PropType.Function]: {
        editable: false,
        expandable: false,
    },
    [protocol_1.PropType.HTMLNode]: {
        editable: false,
        expandable: false,
    },
    [protocol_1.PropType.Unknown]: {
        editable: false,
        expandable: false,
    },
    [protocol_1.PropType.Set]: {
        editable: false,
        expandable: false,
    },
    [protocol_1.PropType.Map]: {
        editable: false,
        expandable: false,
    },
};
const isEditable = (descriptor, propName, propData, isGetterOrSetter) => {
    if (propData.containerType === 'ReadonlySignal') {
        return false;
    }
    if (typeof propName === 'symbol') {
        return false;
    }
    if (isGetterOrSetter) {
        return false;
    }
    if ((descriptor === null || descriptor === void 0 ? void 0 : descriptor.writable) === false) {
        return false;
    }
    return shallowPropTypeToTreeMetaData[propData.type].editable;
};
const isGetterOrSetter = (descriptor) => ((descriptor === null || descriptor === void 0 ? void 0 : descriptor.set) || (descriptor === null || descriptor === void 0 ? void 0 : descriptor.get)) && !('value' in descriptor);
const getPreview = (propData, isGetterOrSetter) => {
    if (propData.containerType === 'ReadonlySignal') {
        return `Readonly Signal(${typeToDescriptorPreview[propData.type](propData.prop())})`;
    }
    else if (propData.containerType === 'WritableSignal') {
        return `Signal(${typeToDescriptorPreview[propData.type](propData.prop())})`;
    }
    return !isGetterOrSetter
        ? typeToDescriptorPreview[propData.type](propData.prop)
        : typeToDescriptorPreview[protocol_1.PropType.Function]({ name: '' });
};
function createShallowSerializedDescriptor(instance, propName, propData, isReadonly) {
    const { type, containerType } = propData;
    const descriptor = (0, object_utils_1.getDescriptor)(instance, propName);
    const getterOrSetter = isGetterOrSetter(descriptor);
    const shallowSerializedDescriptor = {
        type,
        expandable: shallowPropTypeToTreeMetaData[type].expandable,
        editable: isEditable(descriptor, propName, propData, getterOrSetter) && !isReadonly,
        preview: getPreview(propData, getterOrSetter),
        containerType,
    };
    if (propData.prop !== undefined && serializable.has(type)) {
        shallowSerializedDescriptor.value = (0, utils_1.unwrapSignal)(propData.prop);
    }
    return shallowSerializedDescriptor;
}
function createLevelSerializedDescriptor(instance, propName, propData, levelOptions, continuation) {
    const { type, prop, containerType } = propData;
    const descriptor = (0, object_utils_1.getDescriptor)(instance, propName);
    const getterOrSetter = isGetterOrSetter(descriptor);
    const levelSerializedDescriptor = {
        type,
        editable: false,
        expandable: !getterOrSetter && (0, object_utils_1.getKeys)(prop).length > 0,
        preview: getPreview(propData, getterOrSetter),
        containerType,
    };
    if (levelOptions.level !== undefined && levelOptions.currentLevel < levelOptions.level) {
        const value = getLevelDescriptorValue(propData, levelOptions, continuation);
        if (value !== undefined) {
            levelSerializedDescriptor.value = value;
        }
    }
    return levelSerializedDescriptor;
}
function createNestedSerializedDescriptor(instance, propName, propData, levelOptions, nodes, nestedSerializer) {
    const { type, prop, containerType } = propData;
    const descriptor = (0, object_utils_1.getDescriptor)(instance, propName);
    const getterOrSetter = isGetterOrSetter(descriptor);
    const nestedSerializedDescriptor = {
        type,
        editable: false,
        expandable: !getterOrSetter && (0, object_utils_1.getKeys)(prop).length > 0,
        preview: getPreview(propData, getterOrSetter),
        containerType,
    };
    if (nodes === null || nodes === void 0 ? void 0 : nodes.length) {
        const value = getNestedDescriptorValue(propData, levelOptions, nodes, nestedSerializer);
        if (value !== undefined) {
            nestedSerializedDescriptor.value = value;
        }
    }
    return nestedSerializedDescriptor;
}
function getNestedDescriptorValue(propData, levelOptions, nodes, nestedSerializer) {
    const { type, prop } = propData;
    const { currentLevel } = levelOptions;
    const value = (0, utils_1.unwrapSignal)(prop);
    switch (type) {
        case protocol_1.PropType.Array:
            return nodes.map((nestedProp) => nestedSerializer(value, nestedProp.name, nestedProp.children, false, currentLevel + 1));
        case protocol_1.PropType.Object:
            return nodes.reduce((accumulator, nestedProp) => {
                if (prop.hasOwnProperty(nestedProp.name) && !ignoreList.has(nestedProp.name)) {
                    accumulator[nestedProp.name] = nestedSerializer(value, nestedProp.name, nestedProp.children, false, currentLevel + 1);
                }
                return accumulator;
            }, {});
    }
}
function getLevelDescriptorValue(propData, levelOptions, continuation) {
    const { type, prop } = propData;
    const { currentLevel, level } = levelOptions;
    const value = (0, utils_1.unwrapSignal)(prop);
    const isReadonly = (0, utils_1.isSignal)(prop);
    switch (type) {
        case protocol_1.PropType.Array:
            return value.map((_, idx) => continuation(value, idx, isReadonly, currentLevel + 1, level));
        case protocol_1.PropType.Object:
            return (0, object_utils_1.getKeys)(value).reduce((accumulator, propName) => {
                if (!ignoreList.has(propName)) {
                    accumulator[propName] = continuation(value, propName, isReadonly, currentLevel + 1, level);
                }
                return accumulator;
            }, {});
    }
}
function truncate(str, max = 20) {
    return str.length > max ? str.substring(0, max) + '...' : str;
}
