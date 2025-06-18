"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Xtb = exports.Xmb = exports.Xliff2 = exports.Xliff = exports.Serializer = exports.MessageBundle = exports.I18NHtmlParser = exports.computeMsgId = void 0;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var digest_1 = require("./digest");
Object.defineProperty(exports, "computeMsgId", { enumerable: true, get: function () { return digest_1.computeMsgId; } });
var i18n_html_parser_1 = require("./i18n_html_parser");
Object.defineProperty(exports, "I18NHtmlParser", { enumerable: true, get: function () { return i18n_html_parser_1.I18NHtmlParser; } });
var message_bundle_1 = require("./message_bundle");
Object.defineProperty(exports, "MessageBundle", { enumerable: true, get: function () { return message_bundle_1.MessageBundle; } });
var serializer_1 = require("./serializers/serializer");
Object.defineProperty(exports, "Serializer", { enumerable: true, get: function () { return serializer_1.Serializer; } });
var xliff_1 = require("./serializers/xliff");
Object.defineProperty(exports, "Xliff", { enumerable: true, get: function () { return xliff_1.Xliff; } });
var xliff2_1 = require("./serializers/xliff2");
Object.defineProperty(exports, "Xliff2", { enumerable: true, get: function () { return xliff2_1.Xliff2; } });
var xmb_1 = require("./serializers/xmb");
Object.defineProperty(exports, "Xmb", { enumerable: true, get: function () { return xmb_1.Xmb; } });
var xtb_1 = require("./serializers/xtb");
Object.defineProperty(exports, "Xtb", { enumerable: true, get: function () { return xtb_1.Xtb; } });
