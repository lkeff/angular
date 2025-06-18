"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiReporter = void 0;
const core_1 = require("@angular/core");
const reporter_1 = require("../reporter");
class MultiReporter extends reporter_1.Reporter {
    static provideWith(childTokens) {
        return [
            {
                provide: _CHILDREN,
                useFactory: (injector) => childTokens.map((token) => injector.get(token)),
                deps: [core_1.Injector],
            },
            {
                provide: MultiReporter,
                useFactory: (children) => new MultiReporter(children),
                deps: [_CHILDREN],
            },
        ];
    }
    constructor(_reporters) {
        super();
        this._reporters = _reporters;
    }
    reportMeasureValues(values) {
        return Promise.all(this._reporters.map((reporter) => reporter.reportMeasureValues(values)));
    }
    reportSample(completeSample, validSample) {
        return Promise.all(this._reporters.map((reporter) => reporter.reportSample(completeSample, validSample)));
    }
}
exports.MultiReporter = MultiReporter;
const _CHILDREN = new core_1.InjectionToken('MultiReporter.children');
