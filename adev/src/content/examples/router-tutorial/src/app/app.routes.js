"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const crisis_list_component_1 = require("./crisis-list/crisis-list.component");
const heroes_list_component_1 = require("./heroes-list/heroes-list.component");
const page_not_found_component_1 = require("./page-not-found/page-not-found.component");
exports.routes = [
    { path: 'crisis-list', component: crisis_list_component_1.CrisisListComponent },
    { path: 'heroes-list', component: heroes_list_component_1.HeroesListComponent },
    { path: '', redirectTo: '/heroes-list', pathMatch: 'full' },
    { path: '**', component: page_not_found_component_1.PageNotFoundComponent },
];
