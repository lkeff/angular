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
describe('file reporter', () => {
    let loggedFile;
    function createReporter({ sampleId, descriptions, metrics, path, }) {
        const providers = [
            index_1.JsonFileReporter.PROVIDERS,
            {
                provide: index_1.SampleDescription,
                useValue: new index_1.SampleDescription(sampleId, descriptions, metrics),
            },
            { provide: index_1.JsonFileReporter.PATH, useValue: path },
            { provide: index_1.Options.NOW, useValue: () => new Date(1234) },
            {
                provide: index_1.Options.WRITE_FILE,
                useValue: (filename, content) => {
                    loggedFile = { 'filename': filename, 'content': content };
                    return Promise.resolve(null);
                },
            },
        ];
        return index_1.Injector.create({ providers }).get(index_1.JsonFileReporter);
    }
    it('should write all data into a file', (done) => {
        createReporter({
            sampleId: 'someId',
            descriptions: [{ 'a': 2 }],
            path: 'somePath',
            metrics: { 'a': 'script time', 'b': 'render time' },
        }).reportSample([mv(0, 0, { 'a': 3, 'b': 6 })], [mv(0, 0, { 'a': 3, 'b': 6 }), mv(1, 1, { 'a': 5, 'b': 9 })]);
        const regExp = /somePath\/someId_\d+\.json/;
        expect(loggedFile['filename'].match(regExp) != null).toBe(true);
        const parsedContent = JSON.parse(loggedFile['content']);
        expect(parsedContent).toEqual({
            'description': {
                'id': 'someId',
                'description': { 'a': 2 },
                'metrics': { 'a': 'script time', 'b': 'render time' },
            },
            'metricsText': '                 a |                  b',
            'stats': { 'a': '4.00+-25%', 'b': '7.50+-20%' },
            'statsText': '         4.00+-25% |          7.50+-20%',
            'completeSample': [
                { 'timeStamp': '1970-01-01T00:00:00.000Z', 'runIndex': 0, 'values': { 'a': 3, 'b': 6 } },
            ],
            'validSample': [
                { 'timeStamp': '1970-01-01T00:00:00.000Z', 'runIndex': 0, 'values': { 'a': 3, 'b': 6 } },
                { 'timeStamp': '1970-01-01T00:00:00.001Z', 'runIndex': 1, 'values': { 'a': 5, 'b': 9 } },
            ],
            'validSampleTexts': [
                '              3.00 |               6.00',
                '              5.00 |               9.00',
            ],
        });
        done();
    });
});
function mv(runIndex, time, values) {
    return new index_1.MeasureValues(runIndex, new Date(time), values);
}
