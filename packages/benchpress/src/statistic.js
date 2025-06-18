"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Statistic = void 0;
class Statistic {
    static calculateCoefficientOfVariation(sample, mean) {
        return (Statistic.calculateStandardDeviation(sample, mean) / mean) * 100;
    }
    static calculateMean(samples) {
        let total = 0;
        // TODO: use reduce
        samples.forEach((x) => (total += x));
        return total / samples.length;
    }
    static calculateStandardDeviation(samples, mean) {
        let deviation = 0;
        // TODO: use reduce
        samples.forEach((x) => (deviation += Math.pow(x - mean, 2)));
        deviation = deviation / samples.length;
        deviation = Math.sqrt(deviation);
        return deviation;
    }
    static calculateRegressionSlope(xValues, xMean, yValues, yMean) {
        // See https://en.wikipedia.org/wiki/Simple_linear_regression
        let dividendSum = 0;
        let divisorSum = 0;
        for (let i = 0; i < xValues.length; i++) {
            dividendSum += (xValues[i] - xMean) * (yValues[i] - yMean);
            divisorSum += Math.pow(xValues[i] - xMean, 2);
        }
        return dividendSum / divisorSum;
    }
}
exports.Statistic = Statistic;
