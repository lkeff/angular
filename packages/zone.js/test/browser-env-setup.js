"use strict";
/// <reference types="node"/>
Object.defineProperty(exports, "__esModule", { value: true });
require("./browser_symbol_setup");
require("./wtf_mock");
require("./test-env-setup-jasmine");
const test_fake_polyfill_1 = require("./test_fake_polyfill");
(0, test_fake_polyfill_1.setupFakePolyfill)();
