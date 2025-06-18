"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const router_1 = require("@angular/router");
const profile_component_1 = require("./profile/profile.component");
exports.routes = [
    // #docregion matcher
    {
        matcher: (url) => {
            if (url.length === 1 && url[0].path.match(/^@[\w]+$/gm)) {
                return { consumed: url, posParams: { username: new router_1.UrlSegment(url[0].path.slice(1), {}) } };
            }
            return null;
        },
        component: profile_component_1.ProfileComponent,
    },
    // #enddocregion matcher
];
