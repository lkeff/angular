"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEMO_ROUTES = void 0;
const core_1 = require("@angular/core");
const elements_1 = require("@angular/elements");
const ng_devtools_backend_1 = require("ng-devtools-backend");
const zone_unaware_iframe_message_bus_1 = require("../../zone-unaware-iframe-message-bus");
const demo_app_component_1 = require("./demo-app.component");
const zippy_component_1 = require("./zippy.component");
exports.DEMO_ROUTES = [
    {
        path: '',
        component: demo_app_component_1.DemoAppComponent,
        children: [
            {
                path: '',
                loadChildren: () => Promise.resolve().then(() => __importStar(require('./todo/app.module'))).then((m) => m.AppModule),
            },
        ],
        providers: [
            (0, core_1.provideEnvironmentInitializer)(() => {
                const el = (0, elements_1.createCustomElement)(zippy_component_1.ZippyComponent, { injector: (0, core_1.inject)(core_1.Injector) });
                customElements.define('app-zippy', el);
            }),
        ],
    },
];
(0, ng_devtools_backend_1.initializeMessageBus)(new zone_unaware_iframe_message_bus_1.ZoneUnawareIFrameMessageBus('angular-devtools-backend', 'angular-devtools', () => window.parent));
