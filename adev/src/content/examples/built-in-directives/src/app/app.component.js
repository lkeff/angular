"use strict";
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
exports.AppComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
// #docregion import-ng-if
const common_2 = require("@angular/common");
// #enddocregion import-ng-if
// #docregion import-ng-for
const common_3 = require("@angular/common");
// #enddocregion import-ng-for
// #docregion import-ng-switch
const common_4 = require("@angular/common");
// #enddocregion import-ng-switch
// #docregion import-ng-style
const common_5 = require("@angular/common");
// #enddocregion import-ng-style
// #docregion import-ng-class
const common_6 = require("@angular/common");
// #enddocregion import-ng-class
// #docregion import-forms-module
const forms_1 = require("@angular/forms");
// #enddocregion import-forms-module
const item_1 = require("./item");
const item_detail_component_1 = require("./item-detail/item-detail.component");
const item_switch_component_1 = require("./item-switch.component");
const item_switch_component_2 = require("./item-switch.component");
// #docregion import-ng-if, import-ng-for, import-ng-switch, import-ng-style, import-ng-class, import-forms-module
let AppComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            // #enddocregion import-ng-if, import-ng-for, import-ng-switch, import-ng-style, import-ng-class, import-forms-module
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css'],
            imports: [
                // #docregion import-ng-if
                common_2.NgIf, // <-- import into the component
                // #enddocregion import-ng-if
                // #docregion import-ng-for
                common_3.NgFor, // <-- import into the component
                // #enddocregion import-ng-for
                // #docregion import-ng-style
                common_5.NgStyle, // <-- import into the component
                // #enddocregion import-ng-style
                // #docregion import-ng-switch
                common_4.NgSwitch, // <-- import into the component
                common_4.NgSwitchCase,
                common_4.NgSwitchDefault,
                // #enddocregion import-ng-switch
                // #docregion import-ng-class
                common_6.NgClass, // <-- import into the component
                // #enddocregion import-ng-class
                // #docregion import-forms-module
                forms_1.FormsModule, // <--- import into the component
                // #enddocregion import-forms-module
                common_1.JsonPipe,
                item_detail_component_1.ItemDetailComponent,
                item_switch_component_1.ItemSwitchComponents,
                item_switch_component_2.StoutItemComponent,
                // #docregion import-ng-if, import-ng-for, import-ng-style, import-ng-switch, import-ng-class, import-forms-module
            ],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AppComponent = _classThis = class {
        constructor() {
            // #enddocregion import-ng-if, import-ng-for, import-ng-style, import-ng-switch, import-ng-class, import-forms-module
            this.canSave = true;
            this.isSpecial = true;
            this.isUnchanged = true;
            this.isActive = true;
            this.nullCustomer = null;
            this.currentCustomer = {
                name: 'Laura',
            };
            this.items = [];
            // #enddocregion item
            // trackBy change counting
            this.itemsNoTrackByCount = 0;
            this.itemsWithTrackByCount = 0;
            this.itemsWithTrackByCountReset = 0;
            this.itemIdIncrement = 1;
            // #docregion setClasses
            this.currentClasses = {};
            // #enddocregion setClasses
            // #docregion setStyles
            this.currentStyles = {};
            // #docregion import-ng-if, import-ng-for, import-ng-switch, import-ng-style, import-ng-class, import-forms-module
        }
        // #enddocregion setStyles
        ngOnInit() {
            this.resetItems();
            this.setCurrentClasses();
            this.setCurrentStyles();
            this.itemsNoTrackByCount = 0;
        }
        setUppercaseName(name) {
            this.currentItem.name = name.toUpperCase();
        }
        // #docregion setClasses
        setCurrentClasses() {
            // CSS classes: added/removed per current state of component properties
            this.currentClasses = {
                saveable: this.canSave,
                modified: !this.isUnchanged,
                special: this.isSpecial,
            };
        }
        // #enddocregion setClasses
        // #docregion setStyles
        setCurrentStyles() {
            // CSS styles: set per current state of component properties
            this.currentStyles = {
                'font-style': this.canSave ? 'italic' : 'normal',
                'font-weight': !this.isUnchanged ? 'bold' : 'normal',
                'font-size': this.isSpecial ? '24px' : '12px',
            };
        }
        // #enddocregion setStyles
        isActiveToggle() {
            this.isActive = !this.isActive;
        }
        giveNullCustomerValue() {
            this.nullCustomer = 'Kelly';
        }
        resetItems() {
            this.items = item_1.Item.items.map((item) => item.clone());
            this.currentItem = this.items[0];
            this.item = this.currentItem;
        }
        resetList() {
            this.resetItems();
            this.itemsWithTrackByCountReset = 0;
            this.itemsNoTrackByCount = ++this.itemsNoTrackByCount;
        }
        changeIds() {
            this.items.forEach((i) => (i.id += 1 * this.itemIdIncrement));
            this.itemsWithTrackByCountReset = -1;
            this.itemsNoTrackByCount = ++this.itemsNoTrackByCount;
            this.itemsWithTrackByCount = ++this.itemsWithTrackByCount;
        }
        clearTrackByCounts() {
            this.resetItems();
            this.itemsNoTrackByCount = 0;
            this.itemsWithTrackByCount = 0;
            this.itemIdIncrement = 1;
        }
        // #docregion trackByItems
        trackByItems(index, item) {
            return item.id;
        }
        // #enddocregion trackByItems
        trackById(index, item) {
            return item.id;
        }
        getValue(event) {
            return event.target.value;
        }
    };
    __setFunctionName(_classThis, "AppComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppComponent = _classThis;
})();
exports.AppComponent = AppComponent;
// #enddocregion import-ng-if, import-ng-for, import-ng-switch, import-ng-style, import-ng-class, import-forms-module
