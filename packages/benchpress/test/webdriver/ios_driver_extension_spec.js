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
const trace_event_factory_1 = require("../trace_event_factory");
describe('ios driver extension', () => {
    let log;
    let extension;
    const normEvents = new trace_event_factory_1.TraceEventFactory('timeline', 'pid0');
    function createExtension(perfRecords = null) {
        if (!perfRecords) {
            perfRecords = [];
        }
        log = [];
        extension = index_1.Injector.create({
            providers: [
                index_1.IOsDriverExtension.PROVIDERS,
                { provide: index_1.WebDriverAdapter, useValue: new MockDriverAdapter(log, perfRecords) },
            ],
        }).get(index_1.IOsDriverExtension);
        return extension;
    }
    it('should throw on forcing gc', () => {
        expect(() => createExtension().gc()).toThrowError('Force GC is not supported on iOS');
    });
    it('should mark the timeline via console.time()', (done) => {
        createExtension()
            .timeBegin('someName')
            .then((_) => {
            expect(log).toEqual([['executeScript', `console.time('someName');`]]);
            done();
        });
    });
    it('should mark the timeline via console.timeEnd()', (done) => {
        createExtension()
            .timeEnd('someName', null)
            .then((_) => {
            expect(log).toEqual([['executeScript', `console.timeEnd('someName');`]]);
            done();
        });
    });
    it('should mark the timeline via console.time() and console.timeEnd()', (done) => {
        createExtension()
            .timeEnd('name1', 'name2')
            .then((_) => {
            expect(log).toEqual([['executeScript', `console.timeEnd('name1');console.time('name2');`]]);
            done();
        });
    });
    describe('readPerfLog', () => {
        it('should execute a dummy script before reading them', (done) => {
            // TODO(tbosch): This seems to be a bug in ChromeDriver:
            // Sometimes it does not report the newest events of the performance log
            // to the WebDriver client unless a script is executed...
            createExtension([])
                .readPerfLog()
                .then((_) => {
                expect(log).toEqual([
                    ['executeScript', '1+1'],
                    ['logs', 'performance'],
                ]);
                done();
            });
        });
        it('should report FunctionCall records as "script"', (done) => {
            createExtension([durationRecord('FunctionCall', 1, 5)])
                .readPerfLog()
                .then((events) => {
                expect(events).toEqual([normEvents.start('script', 1), normEvents.end('script', 5)]);
                done();
            });
        });
        it('should ignore FunctionCalls from webdriver', (done) => {
            createExtension([internalScriptRecord(1, 5)])
                .readPerfLog()
                .then((events) => {
                expect(events).toEqual([]);
                done();
            });
        });
        it('should report begin time', (done) => {
            createExtension([timeBeginRecord('someName', 12)])
                .readPerfLog()
                .then((events) => {
                expect(events).toEqual([normEvents.markStart('someName', 12)]);
                done();
            });
        });
        it('should report end timestamps', (done) => {
            createExtension([timeEndRecord('someName', 12)])
                .readPerfLog()
                .then((events) => {
                expect(events).toEqual([normEvents.markEnd('someName', 12)]);
                done();
            });
        });
        [
            'RecalculateStyles',
            'Layout',
            'UpdateLayerTree',
            'Paint',
            'Rasterize',
            'CompositeLayers',
        ].forEach((recordType) => {
            it(`should report ${recordType}`, (done) => {
                createExtension([durationRecord(recordType, 0, 1)])
                    .readPerfLog()
                    .then((events) => {
                    expect(events).toEqual([normEvents.start('render', 0), normEvents.end('render', 1)]);
                    done();
                });
            });
        });
        it('should walk children', (done) => {
            createExtension([durationRecord('FunctionCall', 1, 5, [timeBeginRecord('someName', 2)])])
                .readPerfLog()
                .then((events) => {
                expect(events).toEqual([
                    normEvents.start('script', 1),
                    normEvents.markStart('someName', 2),
                    normEvents.end('script', 5),
                ]);
                done();
            });
        });
        it('should match safari browsers', () => {
            expect(createExtension().supports({ 'browserName': 'safari' })).toBe(true);
            expect(createExtension().supports({ 'browserName': 'Safari' })).toBe(true);
        });
    });
});
function timeBeginRecord(name, time) {
    return { 'type': 'Time', 'startTime': time, 'data': { 'message': name } };
}
function timeEndRecord(name, time) {
    return { 'type': 'TimeEnd', 'startTime': time, 'data': { 'message': name } };
}
function durationRecord(type, startTime, endTime, children = null) {
    if (!children) {
        children = [];
    }
    return { 'type': type, 'startTime': startTime, 'endTime': endTime, 'children': children };
}
function internalScriptRecord(startTime, endTime) {
    return {
        'type': 'FunctionCall',
        'startTime': startTime,
        'endTime': endTime,
        'data': { 'scriptName': 'InjectedScript' },
    };
}
class MockDriverAdapter extends index_1.WebDriverAdapter {
    constructor(_log, _perfRecords) {
        super();
        this._log = _log;
        this._perfRecords = _perfRecords;
    }
    executeScript(script) {
        this._log.push(['executeScript', script]);
        return Promise.resolve(null);
    }
    logs(type) {
        this._log.push(['logs', type]);
        if (type === 'performance') {
            return Promise.resolve(this._perfRecords.map(function (record) {
                return {
                    'message': JSON.stringify({ 'message': { 'method': 'Timeline.eventRecorded', 'params': { 'record': record } } }, null, 2),
                };
            }));
        }
        else {
            return null;
        }
    }
}
