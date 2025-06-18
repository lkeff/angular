"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system");
const testing_1 = require("@angular/compiler-cli/src/ngtsc/file_system/testing");
const testing_2 = require("../testing");
const output_migration_1 = require("./output_migration");
describe('output migration', () => {
    beforeEach(() => {
        (0, testing_1.initMockFileSystem)('Native');
    });
    it('should work', () => __awaiter(void 0, void 0, void 0, function* () {
        const migration = new output_migration_1.OutputMigration();
        const { fs } = yield (0, testing_2.runTsurgeMigration)(migration, [
            {
                name: (0, file_system_1.absoluteFrom)('/app.component.ts'),
                isProgramRootFile: true,
                contents: `
          import {Output, Component, EventEmitter} from '@angular/core';

          @Component()
          class AppComponent {
            @Output() clicked = new EventEmitter<void>();
          }
        `,
            },
        ]);
        expect(fs.readFile((0, file_system_1.absoluteFrom)('/app.component.ts'))).toContain('// TODO: Actual migration logic');
    }));
    it('should not migrate if there is a problematic usage', () => __awaiter(void 0, void 0, void 0, function* () {
        const migration = new output_migration_1.OutputMigration();
        const { fs } = yield (0, testing_2.runTsurgeMigration)(migration, [
            {
                name: (0, file_system_1.absoluteFrom)('/app.component.ts'),
                isProgramRootFile: true,
                contents: `
          import {Output, Component, EventEmitter} from '@angular/core';

          @Component()
          export class AppComponent {
            @Output() clicked = new EventEmitter<void>();
          }
        `,
            },
            {
                name: (0, file_system_1.absoluteFrom)('/other.component.ts'),
                isProgramRootFile: true,
                contents: `
          import {AppComponent} from './app.component';

          const cmp: AppComponent = null!;
          cmp.clicked.pipe().subscribe();
        `,
            },
        ]);
        expect(fs.readFile((0, file_system_1.absoluteFrom)('/app.component.ts'))).not.toContain('TODO');
    }));
    it('should compute statistics', () => __awaiter(void 0, void 0, void 0, function* () {
        const migration = new output_migration_1.OutputMigration();
        const { getStatistics } = yield (0, testing_2.runTsurgeMigration)(migration, [
            {
                name: (0, file_system_1.absoluteFrom)('/app.component.ts'),
                isProgramRootFile: true,
                contents: `
          import {Output, Component, EventEmitter} from '@angular/core';

          @Component()
          export class AppComponent {
            @Output() clicked = new EventEmitter<void>();
            @Output() canBeMigrated = new EventEmitter<void>();
          }
        `,
            },
            {
                name: (0, file_system_1.absoluteFrom)('/other.component.ts'),
                isProgramRootFile: true,
                contents: `
          import {AppComponent} from './app.component';

          const cmp: AppComponent = null!;
          cmp.clicked.pipe().subscribe();
        `,
            },
        ]);
        expect(yield getStatistics()).toEqual({
            counters: {
                allOutputs: 2,
                migratedOutputs: 1,
            },
        });
    }));
});
