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
    function createReporters(ids) {
        const r = index_1.Injector.create({
            providers: [
                ids.map((id) => ({ provide: id, useValue: new MockReporter(id) })),
                index_1.MultiReporter.provideWith(ids),
            ],
        }).get(index_1.MultiReporter);
        return Promise.resolve(r);
    }
    describe('multi reporter', () => {
        it('should reportMeasureValues to all', (done) => {
            const mv = new index_1.MeasureValues(0, new Date(), {});
            createReporters(['m1', 'm2'])
                .then((r) => r.reportMeasureValues(mv))
                .then((values) => {
                expect(values).toEqual([
                    { 'id': 'm1', 'values': mv },
                    { 'id': 'm2', 'values': mv },
                ]);
                done();
            });
        });
        it('should reportSample to call', (done) => {
            const completeSample = [
                new index_1.MeasureValues(0, new Date(), {}),
                new index_1.MeasureValues(1, new Date(), {}),
            ];
            const validSample = [completeSample[1]];
            createReporters(['m1', 'm2'])
                .then((r) => r.reportSample(completeSample, validSample))
                .then((values) => {
                expect(values).toEqual([
                    { 'id': 'm1', 'completeSample': completeSample, 'validSample': validSample },
                    { 'id': 'm2', 'completeSample': completeSample, 'validSample': validSample },
                ]);
                done();
            });
        });
    });
})();
class MockReporter extends index_1.Reporter {
    constructor(_id) {
        super();
        this._id = _id;
    }
    reportMeasureValues(values) {
        return Promise.resolve({ 'id': this._id, 'values': values });
    }
    reportSample(completeSample, validSample) {
        return Promise.resolve({
            'id': this._id,
            'completeSample': completeSample,
            'validSample': validSample,
        });
    }
}
