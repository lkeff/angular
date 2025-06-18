"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: Add unit tests for this file.
/* eslint-disable @angular-eslint/no-output-native */
// #docregion
const core_1 = require("@angular/core");
// #docregion InjectionToken
const TOKEN = new core_1.InjectionToken('SomeToken');
// Setting up the provider using the same token instance
const providers = [
    { provide: TOKEN, useValue: { someProperty: 'exampleValue' } }, // Mock value for MyInterface
];
// Creating the injector with the provider
const injector = core_1.Injector.create({ providers });
// Retrieving the value using the same token instance
const myInterface = injector.get(TOKEN);
// myInterface is inferred to be MyInterface.
// #enddocregion InjectionToken
