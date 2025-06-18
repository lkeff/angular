"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartialLinkerSelector = exports.declarationFunctions = exports.ɵɵngDeclareClassMetadataAsync = exports.ɵɵngDeclarePipe = exports.ɵɵngDeclareNgModule = exports.ɵɵngDeclareInjector = exports.ɵɵngDeclareInjectable = exports.ɵɵngDeclareFactory = exports.ɵɵngDeclareComponent = exports.ɵɵngDeclareClassMetadata = exports.ɵɵngDeclareDirective = void 0;
exports.createLinkerMap = createLinkerMap;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const semver_1 = __importDefault(require("semver"));
const get_source_file_1 = require("../get_source_file");
const partial_class_metadata_async_linker_1_1 = require("./partial_class_metadata_async_linker_1");
const partial_class_metadata_linker_1_1 = require("./partial_class_metadata_linker_1");
const partial_component_linker_1_1 = require("./partial_component_linker_1");
const partial_directive_linker_1_1 = require("./partial_directive_linker_1");
const partial_factory_linker_1_1 = require("./partial_factory_linker_1");
const partial_injectable_linker_1_1 = require("./partial_injectable_linker_1");
const partial_injector_linker_1_1 = require("./partial_injector_linker_1");
const partial_ng_module_linker_1_1 = require("./partial_ng_module_linker_1");
const partial_pipe_linker_1_1 = require("./partial_pipe_linker_1");
const util_1 = require("./util");
exports.ɵɵngDeclareDirective = 'ɵɵngDeclareDirective';
exports.ɵɵngDeclareClassMetadata = 'ɵɵngDeclareClassMetadata';
exports.ɵɵngDeclareComponent = 'ɵɵngDeclareComponent';
exports.ɵɵngDeclareFactory = 'ɵɵngDeclareFactory';
exports.ɵɵngDeclareInjectable = 'ɵɵngDeclareInjectable';
exports.ɵɵngDeclareInjector = 'ɵɵngDeclareInjector';
exports.ɵɵngDeclareNgModule = 'ɵɵngDeclareNgModule';
exports.ɵɵngDeclarePipe = 'ɵɵngDeclarePipe';
exports.ɵɵngDeclareClassMetadataAsync = 'ɵɵngDeclareClassMetadataAsync';
exports.declarationFunctions = [
    exports.ɵɵngDeclareDirective,
    exports.ɵɵngDeclareClassMetadata,
    exports.ɵɵngDeclareComponent,
    exports.ɵɵngDeclareFactory,
    exports.ɵɵngDeclareInjectable,
    exports.ɵɵngDeclareInjector,
    exports.ɵɵngDeclareNgModule,
    exports.ɵɵngDeclarePipe,
    exports.ɵɵngDeclareClassMetadataAsync,
];
/**
 * Create a mapping between partial-declaration call name and collections of partial-linkers.
 *
 * Each collection of partial-linkers will contain a version range that will be matched against the
 * `minVersion` of the partial-declaration. (Additionally, a partial-linker may modify its behaviour
 * internally based on the `version` property of the declaration.)
 *
 * Versions should be sorted in ascending order. The most recent partial-linker will be used as the
 * fallback linker if none of the other version ranges match. For example:
 *
 * ```
 * {range: getRange('<=', '13.0.0'), linker PartialDirectiveLinkerVersion2(...) },
 * {range: getRange('<=', '13.1.0'), linker PartialDirectiveLinkerVersion3(...) },
 * {range: getRange('<=', '14.0.0'), linker PartialDirectiveLinkerVersion4(...) },
 * {range: LATEST_VERSION_RANGE, linker: new PartialDirectiveLinkerVersion1(...)},
 * ```
 *
 * If the `LATEST_VERSION_RANGE` is `<=15.0.0` then the fallback linker would be
 * `PartialDirectiveLinkerVersion1` for any version greater than `15.0.0`.
 *
 * When there is a change to a declaration interface that requires a new partial-linker, the
 * `minVersion` of the partial-declaration should be updated, the new linker implementation should
 * be added to the end of the collection, and the version of the previous linker should be updated.
 */
function createLinkerMap(environment, sourceUrl, code) {
    const linkers = new Map();
    const LATEST_VERSION_RANGE = getRange('<=', util_1.PLACEHOLDER_VERSION);
    linkers.set(exports.ɵɵngDeclareDirective, [
        { range: LATEST_VERSION_RANGE, linker: new partial_directive_linker_1_1.PartialDirectiveLinkerVersion1(sourceUrl, code) },
    ]);
    linkers.set(exports.ɵɵngDeclareClassMetadataAsync, [
        { range: LATEST_VERSION_RANGE, linker: new partial_class_metadata_async_linker_1_1.PartialClassMetadataAsyncLinkerVersion1() },
    ]);
    linkers.set(exports.ɵɵngDeclareClassMetadata, [
        { range: LATEST_VERSION_RANGE, linker: new partial_class_metadata_linker_1_1.PartialClassMetadataLinkerVersion1() },
    ]);
    linkers.set(exports.ɵɵngDeclareComponent, [
        {
            range: LATEST_VERSION_RANGE,
            linker: new partial_component_linker_1_1.PartialComponentLinkerVersion1((0, get_source_file_1.createGetSourceFile)(sourceUrl, code, environment.sourceFileLoader), sourceUrl, code),
        },
    ]);
    linkers.set(exports.ɵɵngDeclareFactory, [
        { range: LATEST_VERSION_RANGE, linker: new partial_factory_linker_1_1.PartialFactoryLinkerVersion1() },
    ]);
    linkers.set(exports.ɵɵngDeclareInjectable, [
        { range: LATEST_VERSION_RANGE, linker: new partial_injectable_linker_1_1.PartialInjectableLinkerVersion1() },
    ]);
    linkers.set(exports.ɵɵngDeclareInjector, [
        { range: LATEST_VERSION_RANGE, linker: new partial_injector_linker_1_1.PartialInjectorLinkerVersion1() },
    ]);
    linkers.set(exports.ɵɵngDeclareNgModule, [
        {
            range: LATEST_VERSION_RANGE,
            linker: new partial_ng_module_linker_1_1.PartialNgModuleLinkerVersion1(environment.options.linkerJitMode),
        },
    ]);
    linkers.set(exports.ɵɵngDeclarePipe, [
        { range: LATEST_VERSION_RANGE, linker: new partial_pipe_linker_1_1.PartialPipeLinkerVersion1() },
    ]);
    return linkers;
}
/**
 * A helper that selects the appropriate `PartialLinker` for a given declaration.
 *
 * The selection is made from a database of linker instances, chosen if their given semver range
 * satisfies the `minVersion` of the partial declaration to be linked.
 *
 * Note that the ranges are checked in order, and the first matching range will be selected. So
 * ranges should be most restrictive first. In practice, since ranges are always `<=X.Y.Z` this
 * means that ranges should be in ascending order.
 *
 * Note that any "pre-release" versions are stripped from ranges. Therefore if a `minVersion` is
 * `11.1.0-next.1` then this would match `11.1.0-next.2` and also `12.0.0-next.1`. (This is
 * different to standard semver range checking, where pre-release versions do not cross full version
 * boundaries.)
 */
class PartialLinkerSelector {
    constructor(linkers, logger, unknownDeclarationVersionHandling) {
        this.linkers = linkers;
        this.logger = logger;
        this.unknownDeclarationVersionHandling = unknownDeclarationVersionHandling;
    }
    /**
     * Returns true if there are `PartialLinker` classes that can handle functions with this name.
     */
    supportsDeclaration(functionName) {
        return this.linkers.has(functionName);
    }
    /**
     * Returns the `PartialLinker` that can handle functions with the given name and version.
     * Throws an error if there is none.
     */
    getLinker(functionName, minVersion, version) {
        if (!this.linkers.has(functionName)) {
            throw new Error(`Unknown partial declaration function ${functionName}.`);
        }
        const linkerRanges = this.linkers.get(functionName);
        if (version === util_1.PLACEHOLDER_VERSION) {
            // Special case if the `version` is the same as the current compiler version.
            // This helps with compliance tests where the version placeholders have not been replaced.
            return linkerRanges[linkerRanges.length - 1].linker;
        }
        const declarationRange = getRange('>=', minVersion);
        for (const { range: linkerRange, linker } of linkerRanges) {
            if (semver_1.default.intersects(declarationRange, linkerRange)) {
                return linker;
            }
        }
        const message = `This application depends upon a library published using Angular version ${version}, ` +
            `which requires Angular version ${minVersion} or newer to work correctly.\n` +
            `Consider upgrading your application to use a more recent version of Angular.`;
        if (this.unknownDeclarationVersionHandling === 'error') {
            throw new Error(message);
        }
        else if (this.unknownDeclarationVersionHandling === 'warn') {
            this.logger.warn(`${message}\nAttempting to continue using this version of Angular.`);
        }
        // No linker was matched for this declaration, so just use the most recent one.
        return linkerRanges[linkerRanges.length - 1].linker;
    }
}
exports.PartialLinkerSelector = PartialLinkerSelector;
/**
 * Compute a semver Range from the `version` and comparator.
 *
 * The range is computed as any version greater/less than or equal to the given `versionStr`
 * depending upon the `comparator` (ignoring any prerelease versions).
 *
 * @param comparator a string that determines whether the version specifies a minimum or a maximum
 *     range.
 * @param versionStr the version given in the partial declaration
 * @returns A semver range for the provided `version` and comparator.
 */
function getRange(comparator, versionStr) {
    // If the provided version is exactly `0.0.0` then we are known to be running with an unpublished
    // version of angular and assume that all ranges are compatible.
    if (versionStr === '0.0.0' && util_1.PLACEHOLDER_VERSION === '0.0.0') {
        return new semver_1.default.Range('*.*.*');
    }
    const version = new semver_1.default.SemVer(versionStr);
    // Wipe out any prerelease versions
    version.prerelease = [];
    return new semver_1.default.Range(`${comparator}${version.format()}`);
}
