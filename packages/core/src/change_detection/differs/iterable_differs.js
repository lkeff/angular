"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.IterableDiffers = void 0;
exports.defaultIterableDiffersFactory = defaultIterableDiffersFactory;
exports.getTypeNameForDebugging = getTypeNameForDebugging;
const defs_1 = require("../../di/interface/defs");
const metadata_1 = require("../../di/metadata");
const errors_1 = require("../../errors");
const default_iterable_differ_1 = require("../differs/default_iterable_differ");
function defaultIterableDiffersFactory() {
    return new IterableDiffers([new default_iterable_differ_1.DefaultIterableDifferFactory()]);
}
/**
 * A repository of different iterable diffing strategies used by NgFor, NgClass, and others.
 *
 * @publicApi
 */
class IterableDiffers {
    constructor(factories) {
        this.factories = factories;
    }
    static create(factories, parent) {
        if (parent != null) {
            const copied = parent.factories.slice();
            factories = factories.concat(copied);
        }
        return new IterableDiffers(factories);
    }
    /**
     * Takes an array of {@link IterableDifferFactory} and returns a provider used to extend the
     * inherited {@link IterableDiffers} instance with the provided factories and return a new
     * {@link IterableDiffers} instance.
     *
     * @usageNotes
     * ### Example
     *
     * The following example shows how to extend an existing list of factories,
     * which will only be applied to the injector for this component and its children.
     * This step is all that's required to make a new {@link IterableDiffer} available.
     *
     * ```ts
     * @Component({
     *   viewProviders: [
     *     IterableDiffers.extend([new ImmutableListDiffer()])
     *   ]
     * })
     * ```
     */
    static extend(factories) {
        return {
            provide: IterableDiffers,
            useFactory: (parent) => {
                // if parent is null, it means that we are in the root injector and we have just overridden
                // the default injection mechanism for IterableDiffers, in such a case just assume
                // `defaultIterableDiffersFactory`.
                return IterableDiffers.create(factories, parent || defaultIterableDiffersFactory());
            },
            // Dependency technically isn't optional, but we can provide a better error message this way.
            deps: [[IterableDiffers, new metadata_1.SkipSelf(), new metadata_1.Optional()]],
        };
    }
    find(iterable) {
        const factory = this.factories.find((f) => f.supports(iterable));
        if (factory != null) {
            return factory;
        }
        else {
            throw new errors_1.RuntimeError(901 /* RuntimeErrorCode.NO_SUPPORTING_DIFFER_FACTORY */, ngDevMode &&
                `Cannot find a differ supporting object '${iterable}' of type '${getTypeNameForDebugging(iterable)}'`);
        }
    }
}
exports.IterableDiffers = IterableDiffers;
/** @nocollapse */
IterableDiffers.ɵprov = (0, defs_1.ɵɵdefineInjectable)({
    token: IterableDiffers,
    providedIn: 'root',
    factory: defaultIterableDiffersFactory,
});
function getTypeNameForDebugging(type) {
    return type['name'] || typeof type;
}
