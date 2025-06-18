"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MigrationHost = void 0;
/**
 * A migration host is in practice a container object that
 * exposes commonly accessed contextual helpers throughout
 * the whole migration.
 */
class MigrationHost {
    constructor(isMigratingCore, programInfo, config, sourceFiles) {
        this.isMigratingCore = isMigratingCore;
        this.programInfo = programInfo;
        this.config = config;
        this._sourceFiles = new WeakSet(sourceFiles);
        this.compilerOptions = programInfo.userOptions;
    }
    /** Whether the given file is a source file to be migrated. */
    isSourceFileForCurrentMigration(file) {
        return this._sourceFiles.has(file);
    }
}
exports.MigrationHost = MigrationHost;
