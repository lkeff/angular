"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdleScheduler = void 0;
class IdleScheduler {
    constructor(adapter, delay, maxDelay, debug) {
        this.adapter = adapter;
        this.delay = delay;
        this.maxDelay = maxDelay;
        this.debug = debug;
        this.queue = [];
        this.scheduled = null;
        this.empty = Promise.resolve();
        this.emptyResolve = null;
        this.lastTrigger = null;
        this.lastRun = null;
        this.oldestScheduledAt = null;
    }
    trigger() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            this.lastTrigger = this.adapter.time;
            if (this.queue.length === 0) {
                return;
            }
            if (this.scheduled !== null) {
                this.scheduled.cancel = true;
            }
            const scheduled = {
                cancel: false,
            };
            this.scheduled = scheduled;
            // Ensure that no task remains pending for longer than `this.maxDelay` ms.
            const now = this.adapter.time;
            const maxDelay = Math.max(0, ((_a = this.oldestScheduledAt) !== null && _a !== void 0 ? _a : now) + this.maxDelay - now);
            const delay = Math.min(maxDelay, this.delay);
            yield this.adapter.timeout(delay);
            if (scheduled.cancel) {
                return;
            }
            this.scheduled = null;
            yield this.execute();
        });
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            this.lastRun = this.adapter.time;
            while (this.queue.length > 0) {
                const queue = this.queue;
                this.queue = [];
                yield queue.reduce((previous, task) => __awaiter(this, void 0, void 0, function* () {
                    yield previous;
                    try {
                        yield task.run();
                    }
                    catch (err) {
                        this.debug.log(err, `while running idle task ${task.desc}`);
                    }
                }), Promise.resolve());
            }
            if (this.emptyResolve !== null) {
                this.emptyResolve();
                this.emptyResolve = null;
            }
            this.empty = Promise.resolve();
            this.oldestScheduledAt = null;
        });
    }
    schedule(desc, run) {
        this.queue.push({ desc, run });
        if (this.emptyResolve === null) {
            this.empty = new Promise((resolve) => {
                this.emptyResolve = resolve;
            });
        }
        if (this.oldestScheduledAt === null) {
            this.oldestScheduledAt = this.adapter.time;
        }
    }
    get size() {
        return this.queue.length;
    }
    get taskDescriptions() {
        return this.queue.map((task) => task.desc);
    }
}
exports.IdleScheduler = IdleScheduler;
