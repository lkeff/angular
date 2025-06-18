"use strict";
/**
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HostDirectivesResolver = exports.ExportedProviderStatusResolver = exports.ClassPropertyMapping = exports.isHostDirectiveMetaForGlobalMode = exports.CompoundMetadataReader = exports.hasInjectableFields = exports.extractDirectiveTypeCheckMeta = exports.isExternalResource = exports.ResourceRegistry = exports.LocalMetadataRegistry = exports.CompoundMetadataRegistry = exports.flattenInheritedDirectiveMetadata = exports.DtsMetadataReader = void 0;
__exportStar(require("./src/api"), exports);
var dts_1 = require("./src/dts");
Object.defineProperty(exports, "DtsMetadataReader", { enumerable: true, get: function () { return dts_1.DtsMetadataReader; } });
var inheritance_1 = require("./src/inheritance");
Object.defineProperty(exports, "flattenInheritedDirectiveMetadata", { enumerable: true, get: function () { return inheritance_1.flattenInheritedDirectiveMetadata; } });
var registry_1 = require("./src/registry");
Object.defineProperty(exports, "CompoundMetadataRegistry", { enumerable: true, get: function () { return registry_1.CompoundMetadataRegistry; } });
Object.defineProperty(exports, "LocalMetadataRegistry", { enumerable: true, get: function () { return registry_1.LocalMetadataRegistry; } });
var resource_registry_1 = require("./src/resource_registry");
Object.defineProperty(exports, "ResourceRegistry", { enumerable: true, get: function () { return resource_registry_1.ResourceRegistry; } });
Object.defineProperty(exports, "isExternalResource", { enumerable: true, get: function () { return resource_registry_1.isExternalResource; } });
var util_1 = require("./src/util");
Object.defineProperty(exports, "extractDirectiveTypeCheckMeta", { enumerable: true, get: function () { return util_1.extractDirectiveTypeCheckMeta; } });
Object.defineProperty(exports, "hasInjectableFields", { enumerable: true, get: function () { return util_1.hasInjectableFields; } });
Object.defineProperty(exports, "CompoundMetadataReader", { enumerable: true, get: function () { return util_1.CompoundMetadataReader; } });
Object.defineProperty(exports, "isHostDirectiveMetaForGlobalMode", { enumerable: true, get: function () { return util_1.isHostDirectiveMetaForGlobalMode; } });
var property_mapping_1 = require("./src/property_mapping");
Object.defineProperty(exports, "ClassPropertyMapping", { enumerable: true, get: function () { return property_mapping_1.ClassPropertyMapping; } });
var providers_1 = require("./src/providers");
Object.defineProperty(exports, "ExportedProviderStatusResolver", { enumerable: true, get: function () { return providers_1.ExportedProviderStatusResolver; } });
var host_directives_resolver_1 = require("./src/host_directives_resolver");
Object.defineProperty(exports, "HostDirectivesResolver", { enumerable: true, get: function () { return host_directives_resolver_1.HostDirectivesResolver; } });
