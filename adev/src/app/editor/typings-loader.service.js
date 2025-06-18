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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypingsLoader = void 0;
const core_1 = require("@angular/core");
const rxjs_interop_1 = require("@angular/core/rxjs-interop");
/**
 * This service is responsible for retrieving the types definitions for the
 * predefined dependencies.
 */
let TypingsLoader = (() => {
    let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TypingsLoader = _classThis = class {
        constructor() {
            this.librariesToGetTypesFrom = [
                '@angular/common',
                '@angular/core',
                '@angular/forms',
                '@angular/router',
                '@angular/platform-browser',
                '@angular/material',
                '@angular/cdk',
            ];
            this._typings = (0, core_1.signal)([]);
            this.typings = this._typings.asReadonly();
            this.typings$ = (0, rxjs_interop_1.toObservable)(this._typings);
        }
        /**
         * Retrieve types from the predefined libraries and set the types files and contents in the `typings` signal
         */
        retrieveTypeDefinitions(webContainer) {
            return __awaiter(this, void 0, void 0, function* () {
                this.webContainer = webContainer;
                const typesDefinitions = [];
                try {
                    const filesToRead = yield this.getFilesToRead();
                    if (filesToRead && filesToRead.length > 0) {
                        yield Promise.all(filesToRead.map((path) => webContainer.fs.readFile(path, 'utf-8').then((content) => {
                            typesDefinitions.push({ path, content });
                        })));
                        this._typings.set(typesDefinitions);
                    }
                }
                catch (error) {
                    // ignore "ENOENT" errors as this can happen while reading files and resetting the WebContainer
                    if (error === null || error === void 0 ? void 0 : error.message.startsWith('ENOENT')) {
                        return;
                    }
                    else {
                        throw error;
                    }
                }
            });
        }
        /**
         * Get the list of files to read the types definitions from the predefined libraries
         */
        getFilesToRead() {
            return __awaiter(this, void 0, void 0, function* () {
                var _a;
                if (!this.webContainer)
                    return;
                const filesToRead = [];
                const directoriesToRead = [];
                for (const library of this.librariesToGetTypesFrom) {
                    // The library's package.json is where the type definitions are defined
                    const packageJsonContent = yield this.webContainer.fs
                        .readFile(`./node_modules/${library}/package.json`, 'utf-8')
                        .catch((error) => {
                        // Note: "ENOENT" errors occurs:
                        //    - While resetting the NodeRuntimeSandbox.
                        //    - When the library is not a dependency in the project, its package.json won't exist.
                        //
                        // In both cases we ignore the error to continue the process.
                        if (error === null || error === void 0 ? void 0 : error.message.startsWith('ENOENT')) {
                            return;
                        }
                        throw error;
                    });
                    // if the package.json content is empty, skip this library
                    if (!packageJsonContent)
                        continue;
                    const packageJson = JSON.parse(packageJsonContent);
                    // If the package.json doesn't have `exports`, skip this library
                    if (!(packageJson === null || packageJson === void 0 ? void 0 : packageJson.exports))
                        continue;
                    // Based on `exports` we can identify paths to the types definition files
                    for (const exportKey of Object.keys(packageJson.exports)) {
                        const exportEntry = packageJson.exports[exportKey];
                        const types = (_a = exportEntry.typings) !== null && _a !== void 0 ? _a : exportEntry.types;
                        if (types) {
                            const path = `/node_modules/${library}/${this.normalizePath(types)}`;
                            // If the path contains `*` we need to read the directory files
                            if (path.includes('*')) {
                                const directory = path.substring(0, path.lastIndexOf('/'));
                                directoriesToRead.push(directory);
                            }
                            else {
                                filesToRead.push(path);
                            }
                        }
                    }
                }
                const directoryFiles = (yield Promise.all(directoriesToRead.map((directory) => this.getTypeDefinitionFilesFromDirectory(directory)))).flat();
                for (const file of directoryFiles) {
                    filesToRead.push(file);
                }
                return filesToRead;
            });
        }
        getTypeDefinitionFilesFromDirectory(directory) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!this.webContainer)
                    throw new Error('this.webContainer is not defined');
                const files = yield this.webContainer.fs.readdir(directory);
                return files.filter(this.isTypeDefinitionFile).map((file) => `${directory}/${file}`);
            });
        }
        isTypeDefinitionFile(path) {
            return path.endsWith('.d.ts');
        }
        normalizePath(path) {
            if (path.startsWith('./')) {
                return path.substring(2);
            }
            if (path.startsWith('.')) {
                return path.substring(1);
            }
            return path;
        }
    };
    __setFunctionName(_classThis, "TypingsLoader");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TypingsLoader = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TypingsLoader = _classThis;
})();
exports.TypingsLoader = TypingsLoader;
