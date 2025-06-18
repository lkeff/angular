"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoneAwareEffectScheduler = exports.EffectScheduler = void 0;
const defs_1 = require("../../di/interface/defs");
/**
 * A scheduler which manages the execution of effects.
 */
class EffectScheduler {
}
exports.EffectScheduler = EffectScheduler;
/** @nocollapse */
EffectScheduler.ɵprov = (0, defs_1.ɵɵdefineInjectable)({
    token: EffectScheduler,
    providedIn: 'root',
    factory: () => new ZoneAwareEffectScheduler(),
});
/**
 * A wrapper around `ZoneAwareQueueingScheduler` that schedules flushing via the microtask queue
 * when.
 */
class ZoneAwareEffectScheduler {
    constructor() {
        this.dirtyEffectCount = 0;
        this.queues = new Map();
    }
    add(handle) {
        this.enqueue(handle);
        this.schedule(handle);
    }
    schedule(handle) {
        if (!handle.dirty) {
            return;
        }
        this.dirtyEffectCount++;
    }
    remove(handle) {
        const zone = handle.zone;
        const queue = this.queues.get(zone);
        if (!queue.has(handle)) {
            return;
        }
        queue.delete(handle);
        if (handle.dirty) {
            this.dirtyEffectCount--;
        }
    }
    enqueue(handle) {
        const zone = handle.zone;
        if (!this.queues.has(zone)) {
            this.queues.set(zone, new Set());
        }
        const queue = this.queues.get(zone);
        if (queue.has(handle)) {
            return;
        }
        queue.add(handle);
    }
    /**
     * Run all scheduled effects.
     *
     * Execution order of effects within the same zone is guaranteed to be FIFO, but there is no
     * ordering guarantee between effects scheduled in different zones.
     */
    flush() {
        while (this.dirtyEffectCount > 0) {
            let ranOneEffect = false;
            for (const [zone, queue] of this.queues) {
                // `zone` here must be defined.
                if (zone === null) {
                    ranOneEffect || (ranOneEffect = this.flushQueue(queue));
                }
                else {
                    ranOneEffect || (ranOneEffect = zone.run(() => this.flushQueue(queue)));
                }
            }
            // Safeguard against infinite looping if somehow our dirty effect count gets out of sync with
            // the dirty flag across all the effects.
            if (!ranOneEffect) {
                this.dirtyEffectCount = 0;
            }
        }
    }
    flushQueue(queue) {
        let ranOneEffect = false;
        for (const handle of queue) {
            if (!handle.dirty) {
                continue;
            }
            this.dirtyEffectCount--;
            ranOneEffect = true;
            // TODO: what happens if this throws an error?
            handle.run();
        }
        return ranOneEffect;
    }
}
exports.ZoneAwareEffectScheduler = ZoneAwareEffectScheduler;
