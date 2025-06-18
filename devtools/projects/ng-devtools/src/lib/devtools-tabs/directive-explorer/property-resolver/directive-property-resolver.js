"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectivePropertyResolver = exports.constructPathOfKeysToPropertyValue = void 0;
const tree_1 = require("@angular/cdk/tree");
const flatten_1 = require("./flatten");
const property_data_source_1 = require("./property-data-source");
const property_expanded_directive_properties_1 = require("./property-expanded-directive-properties");
const getDirectiveControls = (dataSource) => {
    const treeControl = dataSource.treeControl;
    return {
        dataSource,
        treeControl,
    };
};
const constructPathOfKeysToPropertyValue = (nodePropToGetKeysFor, keys = []) => {
    keys.unshift(nodePropToGetKeysFor.name);
    const parentNodeProp = nodePropToGetKeysFor.parent;
    if (parentNodeProp) {
        (0, exports.constructPathOfKeysToPropertyValue)(parentNodeProp, keys);
    }
    return keys;
};
exports.constructPathOfKeysToPropertyValue = constructPathOfKeysToPropertyValue;
class DirectivePropertyResolver {
    constructor(_messageBus, _props, _directivePosition) {
        this._messageBus = _messageBus;
        this._props = _props;
        this._directivePosition = _directivePosition;
        this._treeFlattener = (0, flatten_1.getTreeFlattener)();
        this._treeControl = new tree_1.FlatTreeControl((node) => node.level, (node) => node.expandable);
        const { inputs, props, outputs, state } = this._classifyProperties();
        this._inputsDataSource = this._createDataSourceFromProps(inputs);
        this._propsDataSource = this._createDataSourceFromProps(props);
        this._outputsDataSource = this._createDataSourceFromProps(outputs);
        this._stateDataSource = this._createDataSourceFromProps(state);
    }
    get directiveInputControls() {
        return getDirectiveControls(this._inputsDataSource);
    }
    get directivePropControls() {
        return getDirectiveControls(this._propsDataSource);
    }
    get directiveOutputControls() {
        return getDirectiveControls(this._outputsDataSource);
    }
    get directiveStateControls() {
        return getDirectiveControls(this._stateDataSource);
    }
    get directiveMetadata() {
        return this._props.metadata;
    }
    get directiveProperties() {
        return this._props.props;
    }
    get directivePosition() {
        return this._directivePosition;
    }
    getExpandedProperties() {
        return [
            ...(0, property_expanded_directive_properties_1.getExpandedDirectiveProperties)(this._inputsDataSource.data),
            ...(0, property_expanded_directive_properties_1.getExpandedDirectiveProperties)(this._propsDataSource.data),
            ...(0, property_expanded_directive_properties_1.getExpandedDirectiveProperties)(this._outputsDataSource.data),
            ...(0, property_expanded_directive_properties_1.getExpandedDirectiveProperties)(this._stateDataSource.data),
        ];
    }
    updateProperties(newProps) {
        this._props = newProps;
        const { inputs, props, outputs, state } = this._classifyProperties();
        this._inputsDataSource.update(inputs);
        this._propsDataSource.update(props);
        this._outputsDataSource.update(outputs);
        this._stateDataSource.update(state);
    }
    updateValue(node, newValue) {
        const directiveId = this._directivePosition;
        const keyPath = (0, exports.constructPathOfKeysToPropertyValue)(node.prop);
        this._messageBus.emit('updateState', [{ directiveId, keyPath, newValue }]);
        node.prop.descriptor.value = newValue;
    }
    _createDataSourceFromProps(props) {
        return new property_data_source_1.PropertyDataSource(props, this._treeFlattener, this._treeControl, this._directivePosition, this._messageBus);
    }
    _classifyProperties() {
        const metadata = this._props.metadata;
        if (!metadata) {
            return {
                inputs: {},
                props: {},
                outputs: {},
                state: this.directiveProperties,
            };
        }
        const inputLabels = new Set('inputs' in metadata ? Object.values(metadata.inputs) : []);
        const propLabels = new Set('props' in metadata ? Object.values(metadata.props) : []);
        const outputLabels = new Set('outputs' in metadata ? Object.values(metadata.outputs) : []);
        const inputs = {};
        const props = {};
        const outputs = {};
        const state = {};
        for (const [propName, value] of Object.entries(this.directiveProperties)) {
            if (inputLabels.has(propName)) {
                inputs[propName] = value;
            }
            else if (propLabels.has(propName)) {
                props[propName] = value;
            }
            else if (outputLabels.has(propName)) {
                outputs[propName] = value;
            }
            else {
                state[propName] = value;
            }
        }
        return {
            inputs,
            props,
            outputs,
            state,
        };
    }
}
exports.DirectivePropertyResolver = DirectivePropertyResolver;
