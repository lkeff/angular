"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncStackTaggingZoneSpec = void 0;
class AsyncStackTaggingZoneSpec {
    constructor(namePrefix, consoleAsyncStackTaggingImpl = console) {
        var _a;
        this.name = 'asyncStackTagging for ' + namePrefix;
        this.createTask = (_a = consoleAsyncStackTaggingImpl === null || consoleAsyncStackTaggingImpl === void 0 ? void 0 : consoleAsyncStackTaggingImpl.createTask) !== null && _a !== void 0 ? _a : (() => null);
    }
    onScheduleTask(delegate, _current, target, task) {
        task.consoleTask = this.createTask(`Zone - ${task.source || task.type}`);
        return delegate.scheduleTask(target, task);
    }
    onInvokeTask(delegate, _currentZone, targetZone, task, applyThis, applyArgs) {
        let ret;
        if (task.consoleTask) {
            ret = task.consoleTask.run(() => delegate.invokeTask(targetZone, task, applyThis, applyArgs));
        }
        else {
            ret = delegate.invokeTask(targetZone, task, applyThis, applyArgs);
        }
        return ret;
    }
}
exports.AsyncStackTaggingZoneSpec = AsyncStackTaggingZoneSpec;
