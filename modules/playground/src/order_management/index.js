"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleModule = exports.OrderManagementApplication = exports.OrderDetailsComponent = exports.OrderItemComponent = exports.OrderListComponent = exports.DataService = void 0;
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const platform_browser_1 = require("@angular/platform-browser");
const platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
/**
 * You can find the AngularJS implementation of this example here:
 * https://github.com/wardbell/ng1DataBinding
 */
// ---- model
class OrderItem {
    constructor(orderItemId, orderId, productName, qty, unitPrice) {
        this.orderItemId = orderItemId;
        this.orderId = orderId;
        this.productName = productName;
        this.qty = qty;
        this.unitPrice = unitPrice;
    }
    get total() {
        return this.qty * this.unitPrice;
    }
}
class Order {
    constructor(orderId, customerName, limit, _dataService) {
        this.orderId = orderId;
        this.customerName = customerName;
        this.limit = limit;
        this._dataService = _dataService;
    }
    get items() {
        return this._dataService.itemsFor(this);
    }
    get total() {
        return this.items.map((i) => i.total).reduce((a, b) => a + b, 0);
    }
}
// ---- services
let _nextId = 1000;
let DataService = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DataService = _classThis = class {
        constructor() {
            this.currentOrder = null;
            this.orders = [
                new Order(_nextId++, 'J. Coltrane', 100, this),
                new Order(_nextId++, 'B. Evans', 200, this),
            ];
            this.orderItems = [
                new OrderItem(_nextId++, this.orders[0].orderId, 'Bread', 5, 1),
                new OrderItem(_nextId++, this.orders[0].orderId, 'Brie', 5, 2),
                new OrderItem(_nextId++, this.orders[0].orderId, 'IPA', 5, 3),
                new OrderItem(_nextId++, this.orders[1].orderId, 'Mozzarella', 5, 2),
                new OrderItem(_nextId++, this.orders[1].orderId, 'Wine', 5, 3),
            ];
        }
        itemsFor(order) {
            return this.orderItems.filter((i) => i.orderId === order.orderId);
        }
        addItemForOrder(order) {
            this.orderItems.push(new OrderItem(_nextId++, order.orderId, '', 0, 0));
        }
        deleteItem(item) {
            this.orderItems.splice(this.orderItems.indexOf(item), 1);
        }
    };
    __setFunctionName(_classThis, "DataService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DataService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DataService = _classThis;
})();
exports.DataService = DataService;
// ---- components
let OrderListComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'order-list-cmp',
            template: `
    <h1>Orders</h1>
    <div *ngFor="let order of orders" [class.warning]="order.total > order.limit">
      <div>
        <label>Customer name:</label>
        {{ order.customerName }}
      </div>

      <div>
        <label>Limit: <input [(ngModel)]="order.limit" type="number" placeholder="Limit" /></label>
      </div>

      <div>
        <label>Number of items:</label>
        {{ order.items.length }}
      </div>

      <div>
        <label>Order total:</label>
        {{ order.total }}
      </div>

      <button (click)="select(order)">Select</button>
    </div>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var OrderListComponent = _classThis = class {
        constructor(_service) {
            this._service = _service;
            this.orders = _service.orders;
        }
        select(order) {
            this._service.currentOrder = order;
        }
    };
    __setFunctionName(_classThis, "OrderListComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OrderListComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OrderListComponent = _classThis;
})();
exports.OrderListComponent = OrderListComponent;
let OrderItemComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'order-item-cmp',
            template: `
    <div>
      <div>
        <label
          >Product name:
          <input [(ngModel)]="item.productName" type="text" placeholder="Product name"
        /></label>
      </div>

      <div>
        <label
          >Quantity: <input [(ngModel)]="item.qty" type="number" placeholder="Quantity"
        /></label>
      </div>

      <div>
        <label
          >Unit Price: <input [(ngModel)]="item.unitPrice" type="number" placeholder="Unit price"
        /></label>
      </div>

      <div>
        <label>Total:</label>
        {{ item.total }}
      </div>

      <button (click)="onDelete()">Delete</button>
    </div>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _item_decorators;
    let _item_initializers = [];
    let _item_extraInitializers = [];
    let _delete_decorators;
    let _delete_initializers = [];
    let _delete_extraInitializers = [];
    var OrderItemComponent = _classThis = class {
        onDelete() {
            this.delete.emit(this.item);
        }
        constructor() {
            this.item = __runInitializers(this, _item_initializers, void 0);
            this.delete = (__runInitializers(this, _item_extraInitializers), __runInitializers(this, _delete_initializers, new core_1.EventEmitter()));
            __runInitializers(this, _delete_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "OrderItemComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _item_decorators = [(0, core_1.Input)()];
        _delete_decorators = [(0, core_1.Output)()];
        __esDecorate(null, null, _item_decorators, { kind: "field", name: "item", static: false, private: false, access: { has: obj => "item" in obj, get: obj => obj.item, set: (obj, value) => { obj.item = value; } }, metadata: _metadata }, _item_initializers, _item_extraInitializers);
        __esDecorate(null, null, _delete_decorators, { kind: "field", name: "delete", static: false, private: false, access: { has: obj => "delete" in obj, get: obj => obj.delete, set: (obj, value) => { obj.delete = value; } }, metadata: _metadata }, _delete_initializers, _delete_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OrderItemComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OrderItemComponent = _classThis;
})();
exports.OrderItemComponent = OrderItemComponent;
let OrderDetailsComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'order-details-cmp',
            template: `
    <div *ngIf="order !== null">
      <h1>Selected Order</h1>
      <div>
        <label
          >Customer name:
          <input [(ngModel)]="order.customerName" type="text" placeholder="Customer name"
        /></label>
      </div>

      <div>
        <label>Limit: <input [(ngModel)]="order.limit" type="number" placeholder="Limit" /></label>
      </div>

      <div>
        <label>Number of items:</label>
        {{ order.items.length }}
      </div>

      <div>
        <label>Order total:</label>
        {{ order.total }}
      </div>

      <h2>Items</h2>
      <button (click)="addItem()">Add Item</button>
      <order-item-cmp
        *ngFor="let item of order.items"
        [item]="item"
        (delete)="deleteItem(item)"
      ></order-item-cmp>
    </div>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var OrderDetailsComponent = _classThis = class {
        constructor(_service) {
            this._service = _service;
        }
        get order() {
            return this._service.currentOrder;
        }
        deleteItem(item) {
            this._service.deleteItem(item);
        }
        addItem() {
            this._service.addItemForOrder(this.order);
        }
    };
    __setFunctionName(_classThis, "OrderDetailsComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OrderDetailsComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OrderDetailsComponent = _classThis;
})();
exports.OrderDetailsComponent = OrderDetailsComponent;
let OrderManagementApplication = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'order-management-app',
            providers: [DataService],
            template: `
    <order-list-cmp></order-list-cmp>
    <order-details-cmp></order-details-cmp>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var OrderManagementApplication = _classThis = class {
    };
    __setFunctionName(_classThis, "OrderManagementApplication");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OrderManagementApplication = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OrderManagementApplication = _classThis;
})();
exports.OrderManagementApplication = OrderManagementApplication;
let ExampleModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            bootstrap: [OrderManagementApplication],
            declarations: [
                OrderManagementApplication,
                OrderListComponent,
                OrderDetailsComponent,
                OrderItemComponent,
            ],
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ExampleModule = _classThis = class {
    };
    __setFunctionName(_classThis, "ExampleModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ExampleModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ExampleModule = _classThis;
})();
exports.ExampleModule = ExampleModule;
(0, platform_browser_dynamic_1.platformBrowserDynamic)().bootstrapModule(ExampleModule);
