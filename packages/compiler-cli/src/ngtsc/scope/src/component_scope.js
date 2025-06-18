"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompoundComponentScopeReader = void 0;
/**
 * A `ComponentScopeReader` that reads from an ordered set of child readers until it obtains the
 * requested scope.
 *
 * This is used to combine `ComponentScopeReader`s that read from different sources (e.g. from a
 * registry and from the incremental state).
 */
class CompoundComponentScopeReader {
    constructor(readers) {
        this.readers = readers;
    }
    getScopeForComponent(clazz) {
        for (const reader of this.readers) {
            const meta = reader.getScopeForComponent(clazz);
            if (meta !== null) {
                return meta;
            }
        }
        return null;
    }
    getRemoteScope(clazz) {
        for (const reader of this.readers) {
            const remoteScope = reader.getRemoteScope(clazz);
            if (remoteScope !== null) {
                return remoteScope;
            }
        }
        return null;
    }
}
exports.CompoundComponentScopeReader = CompoundComponentScopeReader;
