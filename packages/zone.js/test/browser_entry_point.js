"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
require("../lib/common/rollup-error-rewrite");
// import 'core-js/features/set';
// import 'core-js/features/map';
// List all tests here:
require("./common_tests");
require("./browser/browser.spec");
require("./browser/define-property.spec");
require("./browser/element.spec");
require("./browser/FileReader.spec");
// import './browser/geolocation.spec.manual';
require("./browser/HTMLImports.spec");
require("./browser/MutationObserver.spec");
require("./browser/registerElement.spec");
require("./browser/requestAnimationFrame.spec");
require("./browser/WebSocket.spec");
require("./browser/XMLHttpRequest.spec");
require("./browser/MediaQuery.spec");
require("./browser/Notification.spec");
require("./browser/Worker.spec");
require("./mocha-patch.spec");
require("./jasmine-patch.spec");
require("./browser/messageport.spec");
require("./extra/cordova.spec");
