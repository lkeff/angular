"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
(function () {
    function createMetric(ids) {
        const m = index_1.Injector.create({
            providers: [
                ids.map((id) => ({ provide: id, useValue: new MockMetric(id) })),
                index_1.MultiMetric.provideWith(ids),
            ],
        }).get(index_1.MultiMetric);
        return Promise.resolve(m);
    }
    describe('multi metric', () => {
        it('should merge descriptions', (done) => {
            createMetric(['m1', 'm2']).then((m) => {
                expect(m.describe()).toEqual({ 'm1': 'describe', 'm2': 'describe' });
                done();
            });
        });
        it('should merge all beginMeasure calls', (done) => {
            createMetric(['m1', 'm2'])
                .then((m) => m.beginMeasure())
                .then((values) => {
                expect(values).toEqual(['m1_beginMeasure', 'm2_beginMeasure']);
                done();
            });
        });
        [false, true].forEach((restartFlag) => {
            it(`should merge all endMeasure calls for restart=${restartFlag}`, (done) => {
                createMetric(['m1', 'm2'])
                    .then((m) => m.endMeasure(restartFlag))
                    .then((values) => {
                    expect(values).toEqual({
                        'm1': { 'restart': restartFlag },
                        'm2': { 'restart': restartFlag },
                    });
                    done();
                });
            });
        });
    });
})();
class MockMetric extends index_1.Metric {
    constructor(_id) {
        super();
        this._id = _id;
    }
    beginMeasure() {
        return Promise.resolve(`${this._id}_beginMeasure`);
    }
    endMeasure(restart) {
        const result = {};
        result[this._id] = { 'restart': restart };
        return Promise.resolve(result);
    }
    describe() {
        const result = {};
        result[this._id] = 'describe';
        return result;
    }
}
