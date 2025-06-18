"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const index_1 = require("../../index");
(function () {
    let wdAdapter;
    function createMetric(perfLogs, perfLogFeatures, { userMetrics } = {}) {
        if (!perfLogFeatures) {
            perfLogFeatures = new index_1.PerfLogFeatures({
                render: true,
                gc: true,
                frameCapture: true,
                userTiming: true,
            });
        }
        if (!userMetrics) {
            userMetrics = {};
        }
        wdAdapter = new MockDriverAdapter();
        const providers = [
            index_1.Options.DEFAULT_PROVIDERS,
            index_1.UserMetric.PROVIDERS,
            { provide: index_1.Options.USER_METRICS, useValue: userMetrics },
            { provide: index_1.WebDriverAdapter, useValue: wdAdapter },
        ];
        return core_1.Injector.create({ providers }).get(index_1.UserMetric);
    }
    describe('user metric', () => {
        it('should describe itself based on userMetrics', () => {
            expect(createMetric([[]], new index_1.PerfLogFeatures(), {
                userMetrics: { 'loadTime': 'time to load' },
            }).describe()).toEqual({ 'loadTime': 'time to load' });
        });
        describe('endMeasure', () => {
            it('should stop measuring when all properties have numeric values', (done) => {
                const metric = createMetric([[]], new index_1.PerfLogFeatures(), {
                    userMetrics: { 'loadTime': 'time to load', 'content': 'time to see content' },
                });
                metric
                    .beginMeasure()
                    .then(() => metric.endMeasure(true))
                    .then((values) => {
                    expect(values['loadTime']).toBe(25);
                    expect(values['content']).toBe(250);
                    done();
                });
                wdAdapter.data['loadTime'] = 25;
                // Wait before setting 2nd property.
                setTimeout(() => {
                    wdAdapter.data['content'] = 250;
                }, 50);
            }, 600);
        });
    });
})();
class MockDriverAdapter extends index_1.WebDriverAdapter {
    constructor() {
        super(...arguments);
        this.data = {};
    }
    executeScript(script) {
        // Just handles `return window.propName` ignores `delete window.propName`.
        if (script.indexOf('return window.') == 0) {
            const metricName = script.substring('return window.'.length);
            return Promise.resolve(this.data[metricName]);
        }
        else if (script.indexOf('delete window.') == 0) {
            return Promise.resolve(null);
        }
        else {
            return Promise.reject(`Unexpected syntax: ${script}`);
        }
    }
}
