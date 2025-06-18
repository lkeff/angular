"use strict";
/*!
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_STATUS = exports.STATUSES = exports.ALL_TYPES_KEY = void 0;
const core_1 = require("@angular/core");
const api_items_section_component_1 = __importDefault(require("../api-items-section/api-items-section.component"));
const forms_1 = require("@angular/forms");
const docs_1 = require("@angular/docs");
const common_1 = require("@angular/common");
const router_1 = require("@angular/router");
const api_item_type_1 = require("../interfaces/api-item-type");
const api_reference_manager_service_1 = require("./api-reference-manager.service");
const api_item_label_component_1 = __importDefault(require("../api-item-label/api-item-label.component"));
const api_label_pipe_1 = require("../pipes/api-label.pipe");
const menu_1 = require("@angular/cdk/menu");
const chips_1 = require("@angular/material/chips");
exports.ALL_TYPES_KEY = 'All';
exports.STATUSES = {
    stable: 1,
    developerPreview: 2,
    experimental: 4,
    deprecated: 8,
};
exports.DEFAULT_STATUS = exports.STATUSES.stable | exports.STATUSES.developerPreview | exports.STATUSES.experimental;
let ApiReferenceList = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'adev-reference-list',
            imports: [
                api_items_section_component_1.default,
                api_item_label_component_1.default,
                forms_1.FormsModule,
                docs_1.TextField,
                api_label_pipe_1.ApiLabel,
                menu_1.CdkMenuModule,
                chips_1.MatChipsModule,
                common_1.KeyValuePipe,
            ],
            templateUrl: './api-reference-list.component.html',
            styleUrls: ['./api-reference-list.component.scss'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ApiReferenceList = _classThis = class {
        constructor() {
            // services
            this.apiReferenceManager = (0, core_1.inject)(api_reference_manager_service_1.ApiReferenceManager);
            this.router = (0, core_1.inject)(router_1.Router);
            this.filterInput = core_1.viewChild.required(docs_1.TextField, { read: core_1.ElementRef });
            this.injector = (0, core_1.inject)(core_1.EnvironmentInjector);
            // inputs
            this.queryInput = (0, core_1.input)('', { alias: 'query' });
            this.typeInput = (0, core_1.input)(exports.ALL_TYPES_KEY, { alias: 'type' });
            this.statusInput = (0, core_1.input)(exports.DEFAULT_STATUS, { alias: 'status' });
            // inputs are route binded, they can reset to undefined
            // also we want a writable state, so we use a linked signal
            this.query = (0, core_1.linkedSignal)(() => { var _a; return (_a = this.queryInput()) !== null && _a !== void 0 ? _a : ''; });
            this.type = (0, core_1.linkedSignal)(() => { var _a; return (_a = this.typeInput()) !== null && _a !== void 0 ? _a : exports.ALL_TYPES_KEY; });
            this.status = (0, core_1.linkedSignal)(() => { var _a; return (_a = this.statusInput()) !== null && _a !== void 0 ? _a : exports.DEFAULT_STATUS; });
            // const state
            this.itemTypes = Object.values(api_item_type_1.ApiItemType);
            this.statuses = exports.STATUSES;
            this.statusLabels = {
                [exports.STATUSES.stable]: 'Stable',
                [exports.STATUSES.developerPreview]: 'Developer Preview',
                [exports.STATUSES.experimental]: 'Experimental',
                [exports.STATUSES.deprecated]: 'Deprecated',
            };
            this.filteredGroups = (0, core_1.computed)(() => {
                const query = this.query().toLocaleLowerCase();
                const status = this.status();
                const type = this.type();
                return this.apiReferenceManager
                    .apiGroups()
                    .map((group) => ({
                    title: group.title,
                    id: group.id,
                    items: group.items.filter((apiItem) => {
                        return ((query == '' ? true : apiItem.title.toLocaleLowerCase().includes(query)) &&
                            (type === exports.ALL_TYPES_KEY || apiItem.itemType === type) &&
                            ((status & exports.STATUSES.stable &&
                                !apiItem.developerPreview &&
                                !apiItem.deprecated &&
                                !apiItem.experimental) ||
                                (status & exports.STATUSES.deprecated && apiItem.deprecated) ||
                                (status & exports.STATUSES.developerPreview && apiItem.developerPreview) ||
                                (status & exports.STATUSES.experimental && apiItem.experimental)));
                    }),
                }))
                    .filter((group) => group.items.length > 0);
            });
            (0, core_1.effect)(() => {
                const filterInput = this.filterInput();
                (0, core_1.afterNextRender)({
                    write: () => {
                        // Lord forgive me for I have sinned
                        // Use the CVA to focus when https://github.com/angular/angular/issues/31133 is implemented
                        if (matchMedia('(hover: hover) and (pointer:fine)').matches) {
                            scheduleOnIdle(() => filterInput.nativeElement.querySelector('input').focus());
                        }
                    },
                }, { injector: this.injector });
            });
            (0, core_1.effect)(() => {
                // We'll only set the params if we deviate from the default values
                const params = {
                    'query': this.query() || null,
                    'type': this.type() === exports.ALL_TYPES_KEY ? null : this.type(),
                    'status': this.status() === exports.DEFAULT_STATUS ? null : this.status(),
                };
                this.router.navigate([], {
                    queryParams: params,
                    replaceUrl: true,
                    preserveFragment: true,
                    info: {
                        disableScrolling: true,
                    },
                });
            });
        }
        setItemType(itemType) {
            this.type.update((type) => (type === itemType ? exports.ALL_TYPES_KEY : itemType));
        }
        setStatus(status) {
            this.status.update((previousStatus) => {
                if (this.isStatusSelected(status)) {
                    return previousStatus & ~status; // Clear the bit
                }
                else {
                    return previousStatus | status; // Set the bit
                }
            });
        }
        isStatusSelected(status) {
            return (this.status() & status) === status;
        }
    };
    __setFunctionName(_classThis, "ApiReferenceList");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ApiReferenceList = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ApiReferenceList = _classThis;
})();
exports.default = ApiReferenceList;
/**
 * Schedules a function to be run in a new macrotask.
 * This is needed because the `requestIdleCallback` API is not available in all browsers.
 * @param fn
 */
function scheduleOnIdle(fn) {
    if (typeof requestIdleCallback !== 'undefined') {
        requestIdleCallback(fn);
    }
    else {
        setTimeout(fn, 0);
    }
}
