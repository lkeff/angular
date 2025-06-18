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
exports.VersionManager = exports.MODE_PLACEHOLDER = exports.VERSION_PLACEHOLDER = exports.INITIAL_ADEV_DOCS_VERSION = void 0;
const core_1 = require("@angular/core");
const http_1 = require("@angular/common/http");
const versions_json_1 = __importDefault(require("../../../assets/others/versions.json"));
exports.INITIAL_ADEV_DOCS_VERSION = 18;
exports.VERSION_PLACEHOLDER = '{{version}}';
exports.MODE_PLACEHOLDER = '{{prefix}}';
/**
 * This service will rely on 2 sources of data for the list of versions.
 *
 * To have an up-to-date list of versions, it will fetch a json from the deployed website.
 * As fallback it will use a local json file that is bundled with the app.
 */
let VersionManager = (() => {
    let _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var VersionManager = _classThis = class {
        constructor() {
            this.document = (0, core_1.inject)(core_1.DOCUMENT);
            this.localVersions = versions_json_1.default.map((v) => {
                return {
                    displayName: v.version,
                    url: v.url,
                };
            });
            this.versions = (0, core_1.computed)(() => {
                return this.remoteVersions.hasValue() ? this.remoteVersions.value() : this.localVersions;
            });
            this.remoteVersions = (0, http_1.httpResource)(() => 'https://angular.dev/assets/others/versions.json', {
                parse: (json) => {
                    if (!Array.isArray(json)) {
                        throw new Error('Invalid version data');
                    }
                    return json.map((v) => {
                        if (v === undefined ||
                            v === null ||
                            typeof v !== 'object' ||
                            !('version' in v) ||
                            !('url' in v) ||
                            typeof v.version !== 'string' ||
                            typeof v.url !== 'string') {
                            throw new Error('Invalid version data');
                        }
                        return {
                            displayName: v.version,
                            url: v.url,
                        };
                    });
                },
            });
            this.currentDocsVersion = (0, core_1.computed)(() => {
                var _a;
                // In devmode the version is 0, so we'll target next (which is first on the list)
                if (core_1.VERSION.major === '0') {
                    return this.versions()[0];
                }
                return (_a = this.versions().find((v) => v.displayName.includes(core_1.VERSION.major))) !== null && _a !== void 0 ? _a : this.versions()[0];
            });
        }
        get currentDocsVersionMode() {
            const hostname = this.document.location.hostname;
            if (hostname.startsWith('v'))
                return 'deprecated';
            if (hostname.startsWith('rc'))
                return 'rc';
            if (hostname.startsWith('next'))
                return 'next';
            return 'stable';
        }
    };
    __setFunctionName(_classThis, "VersionManager");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        VersionManager = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return VersionManager = _classThis;
})();
exports.VersionManager = VersionManager;
