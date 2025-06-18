"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
describe('runner', () => {
    let injector;
    let runner;
    function createRunner(defaultProviders) {
        if (!defaultProviders) {
            defaultProviders = [];
        }
        runner = new index_1.Runner([
            defaultProviders,
            {
                provide: index_1.Sampler,
                useFactory: (_injector) => {
                    injector = _injector;
                    return new MockSampler();
                },
                deps: [index_1.Injector],
            },
            { provide: index_1.Metric, useFactory: () => new MockMetric(), deps: [] },
            { provide: index_1.Validator, useFactory: () => new MockValidator(), deps: [] },
            { provide: index_1.WebDriverAdapter, useFactory: () => new MockWebDriverAdapter(), deps: [] },
        ]);
        return runner;
    }
    it('should set SampleDescription.id', (done) => {
        createRunner()
            .sample({ id: 'someId' })
            .then((_) => injector.get(index_1.SampleDescription))
            .then((desc) => {
            expect(desc.id).toBe('someId');
            done();
        });
    });
    it('should merge SampleDescription.description', (done) => {
        createRunner([{ provide: index_1.Options.DEFAULT_DESCRIPTION, useValue: { 'a': 1 } }])
            .sample({
            id: 'someId',
            providers: [{ provide: index_1.Options.SAMPLE_DESCRIPTION, useValue: { 'b': 2 } }],
        })
            .then((_) => injector.get(index_1.SampleDescription))
            .then((desc) => {
            expect(desc.description).toEqual({
                'forceGc': false,
                'userAgent': 'someUserAgent',
                'a': 1,
                'b': 2,
                'v': 11,
            });
            done();
        });
    });
    it('should fill SampleDescription.metrics from the Metric', (done) => {
        createRunner()
            .sample({ id: 'someId' })
            .then((_) => injector.get(index_1.SampleDescription))
            .then((desc) => {
            expect(desc.metrics).toEqual({ 'm1': 'some metric' });
            done();
        });
    });
    it('should provide Options.EXECUTE', (done) => {
        const execute = () => { };
        createRunner()
            .sample({ id: 'someId', execute: execute })
            .then((_) => {
            expect(injector.get(index_1.Options.EXECUTE)).toEqual(execute);
            done();
        });
    });
    it('should provide Options.PREPARE', (done) => {
        const prepare = () => { };
        createRunner()
            .sample({ id: 'someId', prepare: prepare })
            .then((_) => {
            expect(injector.get(index_1.Options.PREPARE)).toEqual(prepare);
            done();
        });
    });
    it('should provide Options.MICRO_METRICS', (done) => {
        createRunner()
            .sample({ id: 'someId', microMetrics: { 'a': 'b' } })
            .then((_) => {
            expect(injector.get(index_1.Options.MICRO_METRICS)).toEqual({ 'a': 'b' });
            done();
        });
    });
    it('should overwrite providers per sample call', (done) => {
        createRunner([{ provide: index_1.Options.DEFAULT_DESCRIPTION, useValue: { 'a': 1 } }])
            .sample({
            id: 'someId',
            providers: [{ provide: index_1.Options.DEFAULT_DESCRIPTION, useValue: { 'a': 2 } }],
        })
            .then((_) => injector.get(index_1.SampleDescription))
            .then((desc) => {
            expect(desc.description['a']).toBe(2);
            done();
        });
    });
});
class MockWebDriverAdapter extends index_1.WebDriverAdapter {
    executeScript(script) {
        return Promise.resolve('someUserAgent');
    }
    capabilities() {
        return null;
    }
}
class MockValidator extends index_1.Validator {
    constructor() {
        super();
    }
    describe() {
        return { 'v': 11 };
    }
}
class MockMetric extends index_1.Metric {
    constructor() {
        super();
    }
    describe() {
        return { 'm1': 'some metric' };
    }
}
class MockSampler extends index_1.Sampler {
    constructor() {
        super(null, null, null, null, null, null, null);
    }
    sample() {
        return Promise.resolve(new index_1.SampleState([], []));
    }
}
