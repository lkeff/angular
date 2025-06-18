"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyDataSource = void 0;
const collections_1 = require("@angular/cdk/collections");
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const diffing_1 = require("../../diffing");
const arrayify_props_1 = require("./arrayify-props");
const trackBy = (_, item) => `#${item.prop.name}#${item.prop.descriptor.preview}#${item.level}`;
class PropertyDataSource extends collections_1.DataSource {
    constructor(props, _treeFlattener, _treeControl, _entityPosition, _messageBus) {
        super();
        this._treeFlattener = _treeFlattener;
        this._treeControl = _treeControl;
        this._entityPosition = _entityPosition;
        this._messageBus = _messageBus;
        this._data = new rxjs_1.BehaviorSubject([]);
        this._subscriptions = [];
        this._expandedData = new rxjs_1.BehaviorSubject([]);
        this._differ = new core_1.DefaultIterableDiffer(trackBy);
        this._data.next(this._treeFlattener.flattenNodes((0, arrayify_props_1.arrayifyProps)(props)));
    }
    get data() {
        return this._data.value;
    }
    get treeControl() {
        return this._treeControl;
    }
    update(props) {
        const newData = this._treeFlattener.flattenNodes((0, arrayify_props_1.arrayifyProps)(props));
        (0, diffing_1.diff)(this._differ, this.data, newData);
        this._data.next(this.data);
    }
    connect(collectionViewer) {
        const changed = this._treeControl.expansionModel.changed;
        if (!changed) {
            throw new Error('Unable to subscribe to the expansion model change');
        }
        const s = changed.subscribe((change) => {
            if (change.added) {
                change.added.forEach((node) => this._toggleNode(node, true));
            }
            if (change.removed) {
                change.removed.reverse().forEach((node) => this._toggleNode(node, false));
            }
        });
        this._subscriptions.push(s);
        const changes = [
            collectionViewer.viewChange,
            this._treeControl.expansionModel.changed,
            this._data,
        ];
        return (0, rxjs_1.merge)(...changes).pipe((0, operators_1.map)(() => {
            this._expandedData.next(this._treeFlattener.expandFlattenedNodes(this.data, this._treeControl));
            return this._expandedData.value;
        }));
    }
    disconnect() {
        this._subscriptions.forEach((s) => s.unsubscribe());
        this._subscriptions = [];
    }
    _toggleNode(node, expand) {
        const index = this.data.indexOf(node);
        // If we cannot find the current node, or the current node is not expandable
        // or...if it's expandable but it does have a value, or we're collapsing
        // we're not interested in fetching its children.
        if (index < 0 || !node.expandable || node.prop.descriptor.value || !expand) {
            return;
        }
        let parentPath = [];
        let current = node.prop;
        while (current) {
            parentPath.push(current.name);
            if (!current.parent) {
                break;
            }
            current = current.parent;
        }
        parentPath = parentPath.reverse();
        this._messageBus.emit('getNestedProperties', [this._entityPosition, parentPath]);
        this._messageBus.once('nestedProperties', (position, data, _path) => {
            node.prop.descriptor.value = data.props;
            this._treeControl.expand(node);
            const props = (0, arrayify_props_1.arrayifyProps)(data.props, node.prop);
            const flatNodes = this._treeFlattener.flattenNodes(props);
            flatNodes.forEach((f) => (f.level += node.level + 1));
            this.data.splice(index + 1, 0, ...flatNodes);
            this._data.next(this.data);
        });
    }
}
exports.PropertyDataSource = PropertyDataSource;
