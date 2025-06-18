"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMMON_DIRECTIVES = exports.NgTemplateOutlet = exports.NgSwitchDefault = exports.NgSwitchCase = exports.NgSwitch = exports.NgStyle = exports.NgPluralCase = exports.NgPlural = exports.NgIfContext = exports.NgIf = exports.NgForOfContext = exports.NgForOf = exports.NgFor = exports.NgComponentOutlet = exports.NgClass = void 0;
const ng_class_1 = require("./ng_class");
Object.defineProperty(exports, "NgClass", { enumerable: true, get: function () { return ng_class_1.NgClass; } });
const ng_component_outlet_1 = require("./ng_component_outlet");
Object.defineProperty(exports, "NgComponentOutlet", { enumerable: true, get: function () { return ng_component_outlet_1.NgComponentOutlet; } });
const ng_for_of_1 = require("./ng_for_of");
Object.defineProperty(exports, "NgFor", { enumerable: true, get: function () { return ng_for_of_1.NgFor; } });
Object.defineProperty(exports, "NgForOf", { enumerable: true, get: function () { return ng_for_of_1.NgForOf; } });
Object.defineProperty(exports, "NgForOfContext", { enumerable: true, get: function () { return ng_for_of_1.NgForOfContext; } });
const ng_if_1 = require("./ng_if");
Object.defineProperty(exports, "NgIf", { enumerable: true, get: function () { return ng_if_1.NgIf; } });
Object.defineProperty(exports, "NgIfContext", { enumerable: true, get: function () { return ng_if_1.NgIfContext; } });
const ng_plural_1 = require("./ng_plural");
Object.defineProperty(exports, "NgPlural", { enumerable: true, get: function () { return ng_plural_1.NgPlural; } });
Object.defineProperty(exports, "NgPluralCase", { enumerable: true, get: function () { return ng_plural_1.NgPluralCase; } });
const ng_style_1 = require("./ng_style");
Object.defineProperty(exports, "NgStyle", { enumerable: true, get: function () { return ng_style_1.NgStyle; } });
const ng_switch_1 = require("./ng_switch");
Object.defineProperty(exports, "NgSwitch", { enumerable: true, get: function () { return ng_switch_1.NgSwitch; } });
Object.defineProperty(exports, "NgSwitchCase", { enumerable: true, get: function () { return ng_switch_1.NgSwitchCase; } });
Object.defineProperty(exports, "NgSwitchDefault", { enumerable: true, get: function () { return ng_switch_1.NgSwitchDefault; } });
const ng_template_outlet_1 = require("./ng_template_outlet");
Object.defineProperty(exports, "NgTemplateOutlet", { enumerable: true, get: function () { return ng_template_outlet_1.NgTemplateOutlet; } });
/**
 * A collection of Angular directives that are likely to be used in each and every Angular
 * application.
 */
exports.COMMON_DIRECTIVES = [
    ng_class_1.NgClass,
    ng_component_outlet_1.NgComponentOutlet,
    ng_for_of_1.NgForOf,
    ng_if_1.NgIf,
    ng_template_outlet_1.NgTemplateOutlet,
    ng_style_1.NgStyle,
    ng_switch_1.NgSwitch,
    ng_switch_1.NgSwitchCase,
    ng_switch_1.NgSwitchDefault,
    ng_plural_1.NgPlural,
    ng_plural_1.NgPluralCase,
];
