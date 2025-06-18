"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const home_component_1 = require("./home/home.component");
const user_component_1 = require("./user/user.component");
exports.routes = [
    {
        path: '',
        title: 'App Home Page',
        component: home_component_1.HomeComponent,
    },
    {
        path: 'user',
        title: 'App User Page',
        component: user_component_1.UserComponent,
    },
];
