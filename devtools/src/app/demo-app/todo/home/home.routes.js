"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HOME_ROUTES = void 0;
const todos_component_1 = require("./todos.component");
exports.HOME_ROUTES = [
    {
        path: '',
        component: todos_component_1.TodosComponent,
        pathMatch: 'full',
    },
];
