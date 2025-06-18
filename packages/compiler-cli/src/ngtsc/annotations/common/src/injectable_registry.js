"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectableClassRegistry = void 0;
const metadata_1 = require("../../../metadata");
const di_1 = require("./di");
/**
 * Registry that keeps track of classes that can be constructed via dependency injection (e.g.
 * injectables, directives, pipes).
 */
class InjectableClassRegistry {
    constructor(host, isCore) {
        this.host = host;
        this.isCore = isCore;
        this.classes = new Map();
    }
    registerInjectable(declaration, meta) {
        this.classes.set(declaration, meta);
    }
    getInjectableMeta(declaration) {
        // Figure out whether the class is injectable based on the registered classes, otherwise
        // fall back to looking at its members since we might not have been able to register the class
        // if it was compiled in another compilation unit.
        if (this.classes.has(declaration)) {
            return this.classes.get(declaration);
        }
        if (!(0, metadata_1.hasInjectableFields)(declaration, this.host)) {
            return null;
        }
        const ctorDeps = (0, di_1.getConstructorDependencies)(declaration, this.host, this.isCore);
        const meta = {
            ctorDeps: (0, di_1.unwrapConstructorDependencies)(ctorDeps),
        };
        this.classes.set(declaration, meta);
        return meta;
    }
}
exports.InjectableClassRegistry = InjectableClassRegistry;
