"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const dashboard_component_1 = require("./dashboard/dashboard.component");
const heroes_component_1 = require("./heroes/heroes.component");
const hero_detail_component_1 = require("./hero-detail/hero-detail.component");
exports.routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent },
    { path: 'detail/:id', component: hero_detail_component_1.HeroDetailComponent },
    { path: 'heroes', component: heroes_component_1.HeroesComponent },
];
