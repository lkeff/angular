"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextReporterBase = exports.defaultColumnWidth = exports.COLUMN_WIDTH = void 0;
const core_1 = require("@angular/core");
const util_1 = require("./util");
exports.COLUMN_WIDTH = new core_1.InjectionToken('TextReporterBase.columnWidth');
exports.defaultColumnWidth = 18;
class TextReporterBase {
    constructor(_columnWidth, _sampleDescription) {
        this._columnWidth = _columnWidth;
        this._sampleDescription = _sampleDescription;
        this._metricNames = (0, util_1.sortedProps)(_sampleDescription.metrics);
    }
    description() {
        let text = `BENCHMARK ${this._sampleDescription.id}\n`;
        text += 'Description:\n';
        const props = (0, util_1.sortedProps)(this._sampleDescription.description);
        props.forEach((prop) => {
            text += `- ${prop}: ${this._sampleDescription.description[prop]}\n`;
        });
        text += 'Metrics:\n';
        this._metricNames.forEach((metricName) => {
            text += `- ${metricName}: ${this._sampleDescription.metrics[metricName]}\n`;
        });
        text += '\n';
        text += `${this.metricsHeader()}\n`;
        text += `${this._stringRow(this._metricNames.map((_) => ''), '-')}\n`;
        return text;
    }
    metricsHeader() {
        return this._stringRow(this._metricNames);
    }
    sampleMetrics(measureValues) {
        const formattedValues = this._metricNames.map((metricName) => {
            const value = measureValues.values[metricName];
            return (0, util_1.formatNum)(value);
        });
        return this._stringRow(formattedValues);
    }
    separator() {
        return this._stringRow(this._metricNames.map((_) => ''), '=');
    }
    sampleStats(validSamples) {
        return this._stringRow(this._metricNames.map((metricName) => (0, util_1.formatStats)(validSamples, metricName)));
    }
    _stringRow(parts, fill = ' ') {
        return parts.map((part) => part.padStart(this._columnWidth, fill)).join(' | ');
    }
}
exports.TextReporterBase = TextReporterBase;
