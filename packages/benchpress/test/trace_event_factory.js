"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraceEventFactory = void 0;
class TraceEventFactory {
    constructor(_cat, _pid) {
        this._cat = _cat;
        this._pid = _pid;
    }
    create(ph, name, time, args = null) {
        const res = {
            'name': name,
            'cat': this._cat,
            'ph': ph,
            'ts': time,
            'pid': this._pid,
        };
        if (args != null) {
            res['args'] = args;
        }
        return res;
    }
    markStart(name, time) {
        return this.create('B', name, time);
    }
    markEnd(name, time) {
        return this.create('E', name, time);
    }
    start(name, time, args = null) {
        return this.create('B', name, time, args);
    }
    end(name, time, args = null) {
        return this.create('E', name, time, args);
    }
    instant(name, time, args = null) {
        return this.create('I', name, time, args);
    }
    complete(name, time, duration, args = null) {
        const res = this.create('X', name, time, args);
        res['dur'] = duration;
        return res;
    }
}
exports.TraceEventFactory = TraceEventFactory;
