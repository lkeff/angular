"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InboxApp = exports.ROUTER_CONFIG = exports.DraftsCmp = exports.InboxCmp = exports.DbService = exports.InboxRecord = void 0;
const core_1 = require("@angular/core");
const db = __importStar(require("./data"));
class InboxRecord {
    constructor(data = null) {
        this.id = '';
        this.subject = '';
        this.content = '';
        this.email = '';
        this.firstName = '';
        this.lastName = '';
        this.draft = false;
        if (data) {
            this.setData(data);
        }
    }
    setData(record) {
        this.id = record.id;
        this.subject = record.subject;
        this.content = record.content;
        this.email = record.email;
        this.firstName = record.firstName;
        this.lastName = record.lastName;
        this.date = record.date;
        this.draft = record.draft === true;
    }
}
exports.InboxRecord = InboxRecord;
let DbService = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DbService = _classThis = class {
        getData() {
            return Promise.resolve(db.data.map((entry) => new InboxRecord({
                id: entry['id'],
                subject: entry['subject'],
                content: entry['content'],
                email: entry['email'],
                firstName: entry['first-name'],
                lastName: entry['last-name'],
                date: entry['date'],
                draft: entry['draft'],
            })));
        }
        drafts() {
            return this.getData().then((data) => data.filter((record) => record.draft));
        }
        emails() {
            return this.getData().then((data) => data.filter((record) => !record.draft));
        }
        email(id) {
            return this.getData().then((data) => data.find((entry) => entry.id == id));
        }
    };
    __setFunctionName(_classThis, "DbService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DbService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DbService = _classThis;
})();
exports.DbService = DbService;
let InboxCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'inbox',
            templateUrl: './inbox.html',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var InboxCmp = _classThis = class {
        constructor(router, db, route) {
            this.router = router;
            this.items = [];
            this.ready = false;
            route.params.forEach((p) => {
                const sortEmailsByDate = p['sort'] === 'date';
                db.emails().then((emails) => {
                    this.ready = true;
                    this.items = emails;
                    if (sortEmailsByDate) {
                        this.items.sort((a, b) => new Date(a.date).getTime() < new Date(b.date).getTime() ? -1 : 1);
                    }
                });
            });
        }
    };
    __setFunctionName(_classThis, "InboxCmp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        InboxCmp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return InboxCmp = _classThis;
})();
exports.InboxCmp = InboxCmp;
let DraftsCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'drafts',
            templateUrl: './drafts.html',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DraftsCmp = _classThis = class {
        constructor(router, db) {
            this.router = router;
            this.items = [];
            this.ready = false;
            db.drafts().then((drafts) => {
                this.ready = true;
                this.items = drafts;
            });
        }
    };
    __setFunctionName(_classThis, "DraftsCmp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DraftsCmp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DraftsCmp = _classThis;
})();
exports.DraftsCmp = DraftsCmp;
exports.ROUTER_CONFIG = [
    { path: '', pathMatch: 'full', redirectTo: 'inbox' },
    { path: 'inbox', component: InboxCmp },
    { path: 'drafts', component: DraftsCmp },
    { path: 'detail', loadChildren: () => Promise.resolve().then(() => __importStar(require('./inbox-detail'))).then((mod) => mod.default) },
];
let InboxApp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'inbox-app',
            templateUrl: './inbox-app.html',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var InboxApp = _classThis = class {
    };
    __setFunctionName(_classThis, "InboxApp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        InboxApp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return InboxApp = _classThis;
})();
exports.InboxApp = InboxApp;
