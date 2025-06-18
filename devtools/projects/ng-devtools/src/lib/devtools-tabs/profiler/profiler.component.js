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
exports.ProfilerComponent = void 0;
const core_1 = require("@angular/core");
const dialog_1 = require("@angular/material/dialog");
const protocol_1 = require("protocol");
const rxjs_1 = require("rxjs");
const file_api_service_1 = require("./file-api-service");
const profiler_import_dialog_component_1 = require("./profiler-import-dialog.component");
const timeline_component_1 = require("./timeline/timeline.component");
const icon_1 = require("@angular/material/icon");
const tooltip_1 = require("@angular/material/tooltip");
const button_1 = require("@angular/material/button");
const card_1 = require("@angular/material/card");
const SUPPORTED_VERSIONS = [1];
const PROFILER_VERSION = 1;
let ProfilerComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-profiler',
            templateUrl: './profiler.component.html',
            styleUrls: ['./profiler.component.scss'],
            imports: [card_1.MatCard, button_1.MatIconButton, tooltip_1.MatTooltip, icon_1.MatIcon, timeline_component_1.TimelineComponent],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ProfilerComponent = _classThis = class {
        constructor() {
            this.state = (0, core_1.signal)('idle');
            this.stream = new rxjs_1.Subject();
            // We collect this buffer so we can have it available for export.
            this._buffer = [];
            this._fileApiService = (0, core_1.inject)(file_api_service_1.FileApiService);
            this._messageBus = (0, core_1.inject)(protocol_1.MessageBus);
            this.dialog = (0, core_1.inject)(dialog_1.MatDialog);
            this._fileApiService.uploadedData.subscribe((importedFile) => {
                if (importedFile.error) {
                    console.error('Could not process uploaded file');
                    console.error(importedFile.error);
                    this.dialog.open(profiler_import_dialog_component_1.ProfilerImportDialogComponent, {
                        width: '600px',
                        data: { status: 'ERROR', errorMessage: importedFile.error },
                    });
                    return;
                }
                if (!SUPPORTED_VERSIONS.includes(importedFile.version)) {
                    const processDataDialog = this.dialog.open(profiler_import_dialog_component_1.ProfilerImportDialogComponent, {
                        width: '600px',
                        data: {
                            importedVersion: importedFile.version,
                            profilerVersion: PROFILER_VERSION,
                            status: 'INVALID_VERSION',
                        },
                    });
                    processDataDialog.afterClosed().subscribe((result) => {
                        if (result) {
                            this.state.set('visualizing');
                            this._buffer = importedFile.buffer;
                            setTimeout(() => this.stream.next(importedFile.buffer));
                        }
                    });
                }
                else {
                    this.state.set('visualizing');
                    this._buffer = importedFile.buffer;
                    setTimeout(() => this.stream.next(importedFile.buffer));
                }
            });
            this._messageBus.on('profilerResults', (remainingRecords) => {
                if (remainingRecords.duration > 0 && remainingRecords.source) {
                    this.stream.next([remainingRecords]);
                    this._buffer.push(remainingRecords);
                }
            });
            this._messageBus.on('sendProfilerChunk', (chunkOfRecords) => {
                this.stream.next([chunkOfRecords]);
                this._buffer.push(chunkOfRecords);
            });
        }
        startRecording() {
            this.state.set('recording');
            this._messageBus.emit('startProfiling');
        }
        stopRecording() {
            this.state.set('visualizing');
            this._messageBus.emit('stopProfiling');
            this.stream.complete();
        }
        exportProfilerResults() {
            const fileToExport = {
                version: PROFILER_VERSION,
                buffer: this._buffer,
            };
            this._fileApiService.saveObjectAsJSON(fileToExport);
        }
        importProfilerResults(event) {
            this._fileApiService.publishFileUpload(event);
        }
        discardRecording() {
            this.stream = new rxjs_1.Subject();
            this.state.set('idle');
            this._buffer = [];
        }
    };
    __setFunctionName(_classThis, "ProfilerComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ProfilerComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ProfilerComponent = _classThis;
})();
exports.ProfilerComponent = ProfilerComponent;
