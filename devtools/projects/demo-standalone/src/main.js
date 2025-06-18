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
const platform_browser_1 = require("@angular/platform-browser");
const animations_1 = require("@angular/platform-browser/animations");
const router_1 = require("@angular/router");
const ng_devtools_1 = require("ng-devtools");
const demo_application_environment_1 = require("../../../src/demo-application-environment");
const demo_application_operations_1 = require("../../../src/demo-application-operations");
const app_component_1 = require("./app/app.component");
(0, platform_browser_1.bootstrapApplication)(app_component_1.AppComponent, {
    providers: [
        (0, animations_1.provideAnimations)(),
        (0, router_1.provideRouter)([
            {
                path: '',
                loadComponent: () => Promise.resolve().then(() => __importStar(require('./app/devtools-app/devtools-app.component'))).then((m) => m.DemoDevToolsComponent),
                pathMatch: 'full',
            },
            {
                path: 'demo-app',
                loadChildren: () => Promise.resolve().then(() => __importStar(require('./app/demo-app/demo-app.component'))).then((m) => m.ROUTES),
            },
        ]),
        {
            provide: ng_devtools_1.ApplicationOperations,
            useClass: demo_application_operations_1.DemoApplicationOperations,
        },
        {
            provide: ng_devtools_1.ApplicationEnvironment,
            useClass: demo_application_environment_1.DemoApplicationEnvironment,
        },
    ],
});
