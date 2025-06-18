"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupNodeEnv = setupNodeEnv;
function setupNodeEnv() {
    // Change default symbol prefix for testing to ensure no hard-coded references.
    global['__Zone_symbol_prefix'] = '__zone_symbol_test__';
    global['__zone_symbol_test__DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION'] = false;
}
