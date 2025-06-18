"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeleniumWebDriverAdapter = exports.IOsDriverExtension = exports.FirefoxDriverExtension = exports.ChromeDriverExtension = exports.WebDriverExtension = exports.PerfLogFeatures = exports.WebDriverAdapter = exports.SizeValidator = exports.RegressionSlopeValidator = exports.Validator = exports.SampleState = exports.Sampler = exports.SampleDescription = exports.Runner = exports.MultiReporter = exports.JsonFileReporter = exports.ConsoleReporter = exports.Reporter = exports.UserMetric = exports.PerflogMetric = exports.MultiMetric = exports.Metric = exports.MeasureValues = exports.Options = exports.StaticProvider = exports.Provider = exports.Injector = exports.InjectionToken = void 0;
/// <reference types="node" />
// Must be imported first, because Angular decorators throw on load.
require("reflect-metadata");
var core_1 = require("@angular/core");
Object.defineProperty(exports, "InjectionToken", { enumerable: true, get: function () { return core_1.InjectionToken; } });
Object.defineProperty(exports, "Injector", { enumerable: true, get: function () { return core_1.Injector; } });
Object.defineProperty(exports, "Provider", { enumerable: true, get: function () { return core_1.Provider; } });
Object.defineProperty(exports, "StaticProvider", { enumerable: true, get: function () { return core_1.StaticProvider; } });
var common_options_1 = require("./src/common_options");
Object.defineProperty(exports, "Options", { enumerable: true, get: function () { return common_options_1.Options; } });
var measure_values_1 = require("./src/measure_values");
Object.defineProperty(exports, "MeasureValues", { enumerable: true, get: function () { return measure_values_1.MeasureValues; } });
var metric_1 = require("./src/metric");
Object.defineProperty(exports, "Metric", { enumerable: true, get: function () { return metric_1.Metric; } });
var multi_metric_1 = require("./src/metric/multi_metric");
Object.defineProperty(exports, "MultiMetric", { enumerable: true, get: function () { return multi_metric_1.MultiMetric; } });
var perflog_metric_1 = require("./src/metric/perflog_metric");
Object.defineProperty(exports, "PerflogMetric", { enumerable: true, get: function () { return perflog_metric_1.PerflogMetric; } });
var user_metric_1 = require("./src/metric/user_metric");
Object.defineProperty(exports, "UserMetric", { enumerable: true, get: function () { return user_metric_1.UserMetric; } });
var reporter_1 = require("./src/reporter");
Object.defineProperty(exports, "Reporter", { enumerable: true, get: function () { return reporter_1.Reporter; } });
var console_reporter_1 = require("./src/reporter/console_reporter");
Object.defineProperty(exports, "ConsoleReporter", { enumerable: true, get: function () { return console_reporter_1.ConsoleReporter; } });
var json_file_reporter_1 = require("./src/reporter/json_file_reporter");
Object.defineProperty(exports, "JsonFileReporter", { enumerable: true, get: function () { return json_file_reporter_1.JsonFileReporter; } });
var multi_reporter_1 = require("./src/reporter/multi_reporter");
Object.defineProperty(exports, "MultiReporter", { enumerable: true, get: function () { return multi_reporter_1.MultiReporter; } });
var runner_1 = require("./src/runner");
Object.defineProperty(exports, "Runner", { enumerable: true, get: function () { return runner_1.Runner; } });
var sample_description_1 = require("./src/sample_description");
Object.defineProperty(exports, "SampleDescription", { enumerable: true, get: function () { return sample_description_1.SampleDescription; } });
var sampler_1 = require("./src/sampler");
Object.defineProperty(exports, "Sampler", { enumerable: true, get: function () { return sampler_1.Sampler; } });
Object.defineProperty(exports, "SampleState", { enumerable: true, get: function () { return sampler_1.SampleState; } });
var validator_1 = require("./src/validator");
Object.defineProperty(exports, "Validator", { enumerable: true, get: function () { return validator_1.Validator; } });
var regression_slope_validator_1 = require("./src/validator/regression_slope_validator");
Object.defineProperty(exports, "RegressionSlopeValidator", { enumerable: true, get: function () { return regression_slope_validator_1.RegressionSlopeValidator; } });
var size_validator_1 = require("./src/validator/size_validator");
Object.defineProperty(exports, "SizeValidator", { enumerable: true, get: function () { return size_validator_1.SizeValidator; } });
var web_driver_adapter_1 = require("./src/web_driver_adapter");
Object.defineProperty(exports, "WebDriverAdapter", { enumerable: true, get: function () { return web_driver_adapter_1.WebDriverAdapter; } });
var web_driver_extension_1 = require("./src/web_driver_extension");
Object.defineProperty(exports, "PerfLogFeatures", { enumerable: true, get: function () { return web_driver_extension_1.PerfLogFeatures; } });
Object.defineProperty(exports, "WebDriverExtension", { enumerable: true, get: function () { return web_driver_extension_1.WebDriverExtension; } });
var chrome_driver_extension_1 = require("./src/webdriver/chrome_driver_extension");
Object.defineProperty(exports, "ChromeDriverExtension", { enumerable: true, get: function () { return chrome_driver_extension_1.ChromeDriverExtension; } });
var firefox_driver_extension_1 = require("./src/webdriver/firefox_driver_extension");
Object.defineProperty(exports, "FirefoxDriverExtension", { enumerable: true, get: function () { return firefox_driver_extension_1.FirefoxDriverExtension; } });
var ios_driver_extension_1 = require("./src/webdriver/ios_driver_extension");
Object.defineProperty(exports, "IOsDriverExtension", { enumerable: true, get: function () { return ios_driver_extension_1.IOsDriverExtension; } });
var selenium_webdriver_adapter_1 = require("./src/webdriver/selenium_webdriver_adapter");
Object.defineProperty(exports, "SeleniumWebDriverAdapter", { enumerable: true, get: function () { return selenium_webdriver_adapter_1.SeleniumWebDriverAdapter; } });
