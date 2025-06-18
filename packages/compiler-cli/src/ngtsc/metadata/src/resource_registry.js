"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceRegistry = void 0;
exports.isExternalResource = isExternalResource;
function isExternalResource(resource) {
    return resource.path !== null;
}
/**
 * Tracks the mapping between external resources and the directives(s) which use them.
 *
 * This information is produced during analysis of the program and is used mainly to support
 * external tooling, for which such a mapping is challenging to determine without compiler
 * assistance.
 */
class ResourceRegistry {
    constructor() {
        this.externalTemplateToComponentsMap = new Map();
        this.componentToTemplateMap = new Map();
        this.componentToStylesMap = new Map();
        this.externalStyleToComponentsMap = new Map();
        this.directiveToHostBindingsMap = new Map();
    }
    getComponentsWithTemplate(template) {
        if (!this.externalTemplateToComponentsMap.has(template)) {
            return new Set();
        }
        return this.externalTemplateToComponentsMap.get(template);
    }
    registerResources(resources, directive) {
        if (resources.template !== null) {
            this.registerTemplate(resources.template, directive);
        }
        if (resources.styles !== null) {
            for (const style of resources.styles) {
                this.registerStyle(style, directive);
            }
        }
        if (resources.hostBindings !== null) {
            this.directiveToHostBindingsMap.set(directive, resources.hostBindings);
        }
    }
    registerTemplate(templateResource, component) {
        const { path } = templateResource;
        if (path !== null) {
            if (!this.externalTemplateToComponentsMap.has(path)) {
                this.externalTemplateToComponentsMap.set(path, new Set());
            }
            this.externalTemplateToComponentsMap.get(path).add(component);
        }
        this.componentToTemplateMap.set(component, templateResource);
    }
    getTemplate(component) {
        if (!this.componentToTemplateMap.has(component)) {
            return null;
        }
        return this.componentToTemplateMap.get(component);
    }
    registerStyle(styleResource, component) {
        const { path } = styleResource;
        if (!this.componentToStylesMap.has(component)) {
            this.componentToStylesMap.set(component, new Set());
        }
        if (path !== null) {
            if (!this.externalStyleToComponentsMap.has(path)) {
                this.externalStyleToComponentsMap.set(path, new Set());
            }
            this.externalStyleToComponentsMap.get(path).add(component);
        }
        this.componentToStylesMap.get(component).add(styleResource);
    }
    getStyles(component) {
        if (!this.componentToStylesMap.has(component)) {
            return new Set();
        }
        return this.componentToStylesMap.get(component);
    }
    getComponentsWithStyle(styleUrl) {
        if (!this.externalStyleToComponentsMap.has(styleUrl)) {
            return new Set();
        }
        return this.externalStyleToComponentsMap.get(styleUrl);
    }
    getHostBindings(directive) {
        var _a;
        return (_a = this.directiveToHostBindingsMap.get(directive)) !== null && _a !== void 0 ? _a : null;
    }
}
exports.ResourceRegistry = ResourceRegistry;
