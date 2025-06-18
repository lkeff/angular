"use strict";
/*!
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = exports.SUB_NAVIGATION_ROUTES = exports.TUTORIALS_ROUTES = exports.REFERENCE_ROUTES = exports.DOCS_ROUTES = void 0;
const docs_1 = require("@angular/docs");
const pages_1 = require("./core/enums/pages");
const sub_navigation_data_1 = require("./sub-navigation-data");
const manifest_helper_1 = require("./features/references/helpers/manifest.helper");
const main_component_1 = __importDefault(require("./main.component"));
// Docs navigation data contains routes which navigates to /tutorials pages, in
// that case we should load Tutorial component
exports.DOCS_ROUTES = (0, docs_1.mapNavigationItemsToRoutes)((0, docs_1.flatNavigationData)(sub_navigation_data_1.SUB_NAVIGATION_DATA.docs).filter((route) => { var _a; return !((_a = route.path) === null || _a === void 0 ? void 0 : _a.startsWith(pages_1.PagePrefix.TUTORIALS)) && route.path !== pages_1.PagePrefix.PLAYGROUND; }), {
    loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/docs/docs.component'))),
    data: {
        displaySecondaryNav: true,
    },
});
const referenceNavigationItems = (0, docs_1.flatNavigationData)(sub_navigation_data_1.SUB_NAVIGATION_DATA.reference);
const commonReferenceRouteData = {
    displaySecondaryNav: true,
};
const referencePageRoutes = (0, docs_1.mapNavigationItemsToRoutes)(referenceNavigationItems.filter((r) => r.path === pages_1.DefaultPage.REFERENCE), {
    loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/references/api-reference-list/api-reference-list.component'))),
    data: commonReferenceRouteData,
});
const updateGuidePageRoute = {
    path: referenceNavigationItems.find((r) => r.path === pages_1.DefaultPage.UPDATE).path,
    loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/update/update.component'))),
    data: commonReferenceRouteData,
};
const cliReferencePageRoutes = (0, docs_1.mapNavigationItemsToRoutes)(referenceNavigationItems.filter((r) => { var _a; return (_a = r.path) === null || _a === void 0 ? void 0 : _a.startsWith(`${pages_1.PagePrefix.CLI}/`); }), {
    loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/references/cli-reference-details-page/cli-reference-details-page.component'))),
    data: commonReferenceRouteData,
}).map((route) => (Object.assign(Object.assign({}, route), { resolve: {
        docContent: (0, docs_1.contentResolver)(`${route.path}.html`),
    } })));
const docsReferencePageRoutes = (0, docs_1.mapNavigationItemsToRoutes)(referenceNavigationItems.filter((r) => {
    var _a, _b;
    return r.path !== pages_1.DefaultPage.REFERENCE &&
        r.path !== pages_1.DefaultPage.UPDATE &&
        !((_a = r.path) === null || _a === void 0 ? void 0 : _a.startsWith(`${pages_1.PagePrefix.API}/`)) &&
        !((_b = r.path) === null || _b === void 0 ? void 0 : _b.startsWith(`${pages_1.PagePrefix.CLI}/`));
}), {
    loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/docs/docs.component'))),
    data: Object.assign({}, commonReferenceRouteData),
});
exports.REFERENCE_ROUTES = [
    ...referencePageRoutes,
    ...docsReferencePageRoutes,
    ...cliReferencePageRoutes,
];
const tutorialsNavigationItems = (0, docs_1.flatNavigationData)(sub_navigation_data_1.SUB_NAVIGATION_DATA.tutorials);
const commonTutorialRouteData = {
    hideFooter: true,
};
const docsTutorialsRoutes = (0, docs_1.mapNavigationItemsToRoutes)(tutorialsNavigationItems.filter((route) => route.path === pages_1.DefaultPage.TUTORIALS), {
    loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/docs/docs.component'))),
    data: Object.assign({}, commonTutorialRouteData),
});
const tutorialComponentRoutes = (0, docs_1.mapNavigationItemsToRoutes)(tutorialsNavigationItems.filter((route) => route.path !== pages_1.DefaultPage.TUTORIALS), {
    loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/tutorial/tutorial.component'))),
    data: Object.assign({}, commonTutorialRouteData),
});
exports.TUTORIALS_ROUTES = [...docsTutorialsRoutes, ...tutorialComponentRoutes];
// Based on SUB_NAVIGATION_DATA structure, we need to build the routing table
// for content pages.
exports.SUB_NAVIGATION_ROUTES = [
    ...exports.DOCS_ROUTES,
    ...exports.REFERENCE_ROUTES,
    ...exports.TUTORIALS_ROUTES,
];
const FOOTER_ROUTES = (0, docs_1.mapNavigationItemsToRoutes)((0, docs_1.flatNavigationData)(sub_navigation_data_1.SUB_NAVIGATION_DATA.footer), { loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/docs/docs.component'))) });
const API_REFERENCE_ROUTES = (0, manifest_helper_1.mapApiManifestToRoutes)();
const REDIRECT_ROUTES = [
    {
        path: 'guide/defer',
        redirectTo: '/guide/templates/defer',
    },
    {
        path: 'guide/components/importing',
        redirectTo: '/guide/components/anatomy-of-components#using-components',
    },
    {
        path: 'guide/templates/attribute-binding',
        redirectTo: '/guide/templates/binding#binding-dynamic-properties-and-attributes',
    },
    {
        path: 'guide/templates/interpolation',
        redirectTo: '/guide/templates/binding#render-dynamic-text-with-text-interpolation',
    },
    {
        path: 'guide/templates/class-binding',
        redirectTo: '/guide/templates/binding#css-class-and-style-property-bindings',
    },
    {
        path: 'guide/templates/event-binding',
        redirectTo: '/guide/templates/event-listeners',
    },
    {
        path: 'guide/templates/let-template-variables',
        redirectTo: '/guide/templates/variables#local-template-variables-with-let',
    },
    {
        path: 'guide/templates/property-binding',
        redirectTo: '/guide/templates/binding#binding-dynamic-properties-and-attributes',
    },
    {
        path: 'guide/templates/property-binding-best-practices',
        redirectTo: '/guide/templates/binding#binding-dynamic-properties-and-attributes',
    },
    {
        path: 'guide/templates/reference-variables',
        redirectTo: '/guide/templates/variables#template-reference-variables',
    },
    {
        path: 'guide/templates/svg-in-templates',
        redirectTo: '/guide/templates/binding',
    },
    {
        path: 'guide/templates/template-statements',
        redirectTo: '/guide/templates/event-listeners',
    },
    {
        path: 'guide/signals/rxjs-interop',
        redirectTo: '/ecosystem/rxjs-interop',
    },
    {
        path: 'guide/components/output-function',
        redirectTo: '/guide/components/outputs',
    },
    {
        path: 'guide/signals/queries',
        redirectTo: '/guide/components/queries',
    },
    {
        path: 'guide/signals/model',
        redirectTo: '/guide/signals/inputs',
    },
    {
        path: 'guide/signals/inputs',
        redirectTo: '/guide/components/inputs',
    },
    {
        path: 'guide/ngmodules',
        redirectTo: '/guide/ngmodules/overview',
    },
    {
        path: 'guide/ngmodules/providers',
        redirectTo: '/guide/ngmodules/overview',
    },
    {
        path: 'guide/ngmodules/singleton-services',
        redirectTo: '/guide/ngmodules/overview',
    },
    {
        path: 'guide/ngmodules/lazy-loading',
        redirectTo: '/guide/ngmodules/overview',
    },
    {
        path: 'guide/ngmodules/faq',
        redirectTo: '/guide/ngmodules/overview',
    },
    {
        path: 'guide/components/anatomy-of-components',
        redirectTo: '/guide/components',
    },
    {
        path: 'guide/hybrid-rendering',
        redirectTo: '/guide/ssr',
    },
    {
        path: 'guide/prerendering',
        redirectTo: '/guide/ssr',
    },
    {
        path: 'guide',
        children: [
            {
                path: 'pipes',
                redirectTo: '/guide/templates/pipes',
            },
        ],
    },
];
exports.routes = [
    {
        path: '',
        component: main_component_1.default,
        children: [
            {
                path: '',
                loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/home/home.component'))),
                data: { label: 'Home' },
            },
            {
                path: pages_1.PagePrefix.DOCS,
                redirectTo: pages_1.DefaultPage.DOCS,
            },
            {
                path: pages_1.PagePrefix.REFERENCE,
                redirectTo: pages_1.DefaultPage.REFERENCE,
            },
            {
                path: pages_1.PagePrefix.PLAYGROUND,
                loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/playground/playground.component'))),
                data: Object.assign(Object.assign({}, commonTutorialRouteData), { label: 'Playground' }),
            },
            ...exports.SUB_NAVIGATION_ROUTES,
            ...API_REFERENCE_ROUTES,
            ...FOOTER_ROUTES,
            updateGuidePageRoute,
            ...REDIRECT_ROUTES,
        ],
    },
    // Error page
    {
        path: '**',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/docs/docs.component'))),
        resolve: { 'docContent': (0, docs_1.contentResolver)('error') },
    },
];
