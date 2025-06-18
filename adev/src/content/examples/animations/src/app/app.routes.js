"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const open_close_page_component_1 = require("./open-close-page.component");
const status_slider_page_component_1 = require("./status-slider-page.component");
const toggle_animations_page_component_1 = require("./toggle-animations-page.component");
const hero_list_page_component_1 = require("./hero-list-page.component");
const hero_list_group_page_component_1 = require("./hero-list-group-page.component");
const hero_list_enter_leave_page_component_1 = require("./hero-list-enter-leave-page.component");
const hero_list_auto_page_component_1 = require("./hero-list-auto-page.component");
const insert_remove_component_1 = require("./insert-remove.component");
const querying_component_1 = require("./querying.component");
const home_component_1 = require("./home.component");
const about_component_1 = require("./about.component");
// #docregion route-animation-data
exports.routes = [
    { path: '', pathMatch: 'full', redirectTo: '/enter-leave' },
    {
        path: 'open-close',
        component: open_close_page_component_1.OpenClosePageComponent,
        data: { animation: 'openClosePage' },
    },
    {
        path: 'status',
        component: status_slider_page_component_1.StatusSliderPageComponent,
        data: { animation: 'statusPage' },
    },
    {
        path: 'toggle',
        component: toggle_animations_page_component_1.ToggleAnimationsPageComponent,
        data: { animation: 'togglePage' },
    },
    {
        path: 'heroes',
        component: hero_list_page_component_1.HeroListPageComponent,
        data: { animation: 'filterPage' },
    },
    {
        path: 'hero-groups',
        component: hero_list_group_page_component_1.HeroListGroupPageComponent,
        data: { animation: 'heroGroupPage' },
    },
    {
        path: 'enter-leave',
        component: hero_list_enter_leave_page_component_1.HeroListEnterLeavePageComponent,
        data: { animation: 'enterLeavePage' },
    },
    {
        path: 'auto',
        component: hero_list_auto_page_component_1.HeroListAutoCalcPageComponent,
        data: { animation: 'autoPage' },
    },
    {
        path: 'insert-remove',
        component: insert_remove_component_1.InsertRemoveComponent,
        data: { animation: 'insertRemovePage' },
    },
    {
        path: 'querying',
        component: querying_component_1.QueryingComponent,
        data: { animation: 'queryingPage' },
    },
    {
        path: 'home',
        component: home_component_1.HomeComponent,
        data: { animation: 'HomePage' },
    },
    {
        path: 'about',
        component: about_component_1.AboutComponent,
        data: { animation: 'AboutPage' },
    },
];
// #enddocregion route-animation-data
