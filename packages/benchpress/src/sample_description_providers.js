"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleDescriptionProviders = void 0;
// Note: The providers are split into a separate file to avoid
// introducing a transitive dependency on the DI injection code
// from `@angular/core` whenever scripts like the benchmark compare script
// attempt to just use the `JsonReport` type.
const common_options_1 = require("./common_options");
const metric_1 = require("./metric");
const sample_description_1 = require("./sample_description");
const validator_1 = require("./validator");
exports.sampleDescriptionProviders = [
    {
        provide: sample_description_1.SampleDescription,
        useFactory: (metric, id, forceGc, userAgent, validator, defaultDesc, userDesc) => new sample_description_1.SampleDescription(id, [{ 'forceGc': forceGc, 'userAgent': userAgent }, validator.describe(), defaultDesc, userDesc], metric.describe()),
        deps: [
            metric_1.Metric,
            common_options_1.Options.SAMPLE_ID,
            common_options_1.Options.FORCE_GC,
            common_options_1.Options.USER_AGENT,
            validator_1.Validator,
            common_options_1.Options.DEFAULT_DESCRIPTION,
            common_options_1.Options.SAMPLE_DESCRIPTION,
        ],
    },
];
