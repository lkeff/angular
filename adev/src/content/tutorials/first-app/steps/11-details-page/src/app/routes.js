"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const home_component_1 = require("./home/home.component");
const details_component_1 = require("./details/details.component");
const routeConfig = [
    {
        path: '',
        component: home_component_1.HomeComponent,
        title: 'Home page',
    },
    {
        path: 'details/:id',
        component: details_component_1.DetailsComponent,
        title: 'Home details',
    },
];
exports.default = routeConfig;
