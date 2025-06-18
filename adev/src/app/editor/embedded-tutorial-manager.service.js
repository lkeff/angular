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
exports.EmbeddedTutorialManager = void 0;
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const constants_1 = require("./constants");
/**
 * A service responsible for the current tutorial, retrieving and providing
 * its source code and metadata.
 */
let EmbeddedTutorialManager = (() => {
    let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var EmbeddedTutorialManager = _classThis = class {
        constructor() {
            this.tutorialId = (0, core_1.signal)('');
            this.tutorialFilesystemTree = (0, core_1.signal)(null);
            this.commonFilesystemTree = (0, core_1.signal)(null);
            this.type = (0, core_1.signal)(undefined);
            this.allFiles = (0, core_1.signal)([]);
            this.hiddenFiles = (0, core_1.signal)([]);
            this.tutorialFiles = (0, core_1.signal)({});
            this.openFiles = (0, core_1.signal)([]);
            this.answerFiles = (0, core_1.signal)({});
            this.dependencies = (0, core_1.signal)(undefined);
            this._shouldReInstallDependencies = (0, core_1.signal)(false);
            this.shouldReInstallDependencies = this._shouldReInstallDependencies.asReadonly();
            this.metadata = (0, core_1.signal)(undefined);
            this._shouldChangeTutorial$ = new rxjs_1.BehaviorSubject(false);
            this.tutorialChanged$ = this._shouldChangeTutorial$.asObservable();
            this._filesToDeleteFromPreviousProject = (0, core_1.signal)(new Set());
            this.filesToDeleteFromPreviousProject = this._filesToDeleteFromPreviousProject.asReadonly();
        }
        fetchAndSetTutorialFiles(tutorial) {
            return __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c;
                const [commonSourceCode, tutorialSourceCode, metadata] = yield Promise.all([
                    this.fetchCommonFiles(),
                    this.fetchTutorialSourceCode(tutorial),
                    this.fetchTutorialMetadata(tutorial),
                ]);
                const projectChanged = !!this.tutorialId() && this.tutorialId() !== tutorial;
                this.tutorialId.set(tutorial);
                this.type.set(metadata.type);
                this.metadata.set(metadata);
                if (tutorialSourceCode) {
                    if (projectChanged) {
                        const filesToRemove = this.computeFilesToRemove(metadata.allFiles, this.allFiles());
                        if (filesToRemove) {
                            this._filesToDeleteFromPreviousProject.set(filesToRemove);
                        }
                        this._shouldReInstallDependencies.set(this.checkIfDependenciesChanged((_a = metadata.dependencies) !== null && _a !== void 0 ? _a : {}));
                    }
                    this.tutorialFilesystemTree.set(tutorialSourceCode);
                    this.dependencies.set((_b = metadata.dependencies) !== null && _b !== void 0 ? _b : {});
                    this.tutorialFiles.set(metadata.tutorialFiles);
                    this.answerFiles.set((_c = metadata.answerFiles) !== null && _c !== void 0 ? _c : {});
                    this.openFiles.set(metadata.openFiles);
                    this.hiddenFiles.set(metadata.hiddenFiles);
                    this.allFiles.set(metadata.allFiles);
                    // set common only once
                    if (!this.commonFilesystemTree())
                        this.commonFilesystemTree.set(commonSourceCode);
                }
                this._shouldChangeTutorial$.next(projectChanged);
            });
        }
        revealAnswer() {
            const answerFilenames = Object.keys(this.answerFiles());
            const openFilesAndAnswer = Array.from(
            // use Set to remove duplicates, spread openFiles first to keep files order
            new Set([...this.openFiles(), ...answerFilenames])).filter((filename) => { var _a; return !((_a = this.hiddenFiles()) === null || _a === void 0 ? void 0 : _a.includes(filename)); });
            const tutorialFiles = Object.fromEntries(openFilesAndAnswer.map((file) => [file, this.answerFiles()[file]]));
            const allFilesWithAnswer = [...this.allFiles(), ...answerFilenames];
            const filesToDelete = this.computeFilesToRemove(allFilesWithAnswer, this.allFiles());
            if (filesToDelete) {
                this._filesToDeleteFromPreviousProject.set(filesToDelete);
            }
            this.allFiles.set(allFilesWithAnswer);
            this.tutorialFiles.set(tutorialFiles);
            this.openFiles.set(openFilesAndAnswer);
            this._shouldChangeTutorial$.next(true);
        }
        resetRevealAnswer() {
            const allFilesWithoutAnswer = this.metadata().allFiles;
            const filesToDelete = this.computeFilesToRemove(allFilesWithoutAnswer, this.allFiles());
            if (filesToDelete) {
                this._filesToDeleteFromPreviousProject.set(filesToDelete);
            }
            this.tutorialFiles.set(this.metadata().tutorialFiles);
            this.openFiles.set(this.metadata().openFiles);
            this._shouldChangeTutorial$.next(true);
        }
        fetchCommonFiles() {
            return __awaiter(this, void 0, void 0, function* () {
                if (this.commonFilesystemTree() !== null)
                    return this.commonFilesystemTree();
                //const commonFiles = await this.fetchTutorialSourceCode(TUTORIALS_COMMON_DIRECTORY);
                //this.tutorialFilesystemTree.set(commonFiles);
                return {};
            });
        }
        fetchTutorialSourceCode(tutorial) {
            return __awaiter(this, void 0, void 0, function* () {
                const tutorialSourceCode = yield fetch(`${constants_1.TUTORIALS_ASSETS_WEB_PATH}/${tutorial}/source-code.json`);
                if (!tutorialSourceCode.ok)
                    throw new Error(`Missing source code for tutorial ${tutorial}`);
                return yield tutorialSourceCode.json();
            });
        }
        fetchTutorialMetadata(tutorial) {
            return __awaiter(this, void 0, void 0, function* () {
                const tutorialSourceCode = yield fetch(`${constants_1.TUTORIALS_ASSETS_WEB_PATH}/${tutorial}/metadata.json`);
                if (!tutorialSourceCode.ok)
                    throw new Error(`Missing metadata for ${tutorial}`);
                return yield tutorialSourceCode.json();
            });
        }
        /**
         * Compare previous and new dependencies to determine if the dependencies changed.
         */
        checkIfDependenciesChanged(newDeps) {
            const existingDeps = this.dependencies();
            for (const name of Object.keys(newDeps)) {
                if ((existingDeps === null || existingDeps === void 0 ? void 0 : existingDeps[name]) !== newDeps[name]) {
                    return true;
                }
            }
            return false;
        }
        computeFilesToRemove(newFiles, existingFiles) {
            // All existing files are candidates for removal.
            const filesToDelete = new Set(existingFiles);
            // Retain files that are present in the new project.
            for (const file of newFiles) {
                filesToDelete.delete(file);
            }
            return filesToDelete;
        }
    };
    __setFunctionName(_classThis, "EmbeddedTutorialManager");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        EmbeddedTutorialManager = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return EmbeddedTutorialManager = _classThis;
})();
exports.EmbeddedTutorialManager = EmbeddedTutorialManager;
