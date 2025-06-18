"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hero_list_component_1 = require("./hero-list.component");
const hero_detail_component_1 = require("./hero-detail.component");
exports.default = [
    { path: '', component: hero_list_component_1.HeroListComponent },
    { path: ':id', component: hero_detail_component_1.HeroDetailComponent },
];
