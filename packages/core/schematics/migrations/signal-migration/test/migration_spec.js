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
const testing_2 = require("../../../utils/tsurge/testing");
const migration_1 = require("../src/migration");
const jasmine_1 = require("../../../utils/tsurge/testing/jasmine");
describe('signal input migration', () => {
    beforeEach(() => {
        (0, jasmine_1.setupTsurgeJasmineHelpers)();
        (0, testing_1.initMockFileSystem)('Native');
    });
    it('should properly handle declarations with loose property initialization ' +
        'and strict null checks enabled', () => __awaiter(void 0, void 0, void 0, function* () {
        const { fs } = yield (0, testing_2.runTsurgeMigration)(new migration_1.SignalInputMigration(), [
            {
                name: (0, file_system_1.absoluteFrom)('/app.component.ts'),
                isProgramRootFile: true,
                contents: `
            import {Component, Input} from '@angular/core';

            @Component({template: ''})
            class AppComponent {
              @Input() name: string;

              doSmth() {
                this.name.charAt(0);
              }
            }
          `,
            },
        ], {
            strict: false,
            strictNullChecks: true,
        });
        expect(fs.readFile((0, file_system_1.absoluteFrom)('/app.component.ts'))).toMatchWithDiff(`
        import {Component, input} from '@angular/core';

        @Component({template: ''})
        class AppComponent {
          // TODO: Notes from signal input migration:
          //  Input is initialized to \`undefined\` but type does not allow this value.
          //  This worked with \`@Input\` because your project uses \`--strictPropertyInitialization=false\`.
          readonly name = input<string>(undefined!);

          doSmth() {
            this.name().charAt(0);
          }
        }
        `);
    }));
    it('should properly handle declarations with loose property initialization ' +
        'and strict null checks disabled', () => __awaiter(void 0, void 0, void 0, function* () {
        const { fs } = yield (0, testing_2.runTsurgeMigration)(new migration_1.SignalInputMigration(), [
            {
                name: (0, file_system_1.absoluteFrom)('/app.component.ts'),
                isProgramRootFile: true,
                contents: `
            import {Component, Input} from '@angular/core';

            @Component({template: ''})
            class AppComponent {
              @Input() name: string;

              doSmth() {
                this.name.charAt(0);
              }
            }
          `,
            },
        ], {
            strict: false,
        });
        expect(fs.readFile((0, file_system_1.absoluteFrom)('/app.component.ts'))).toContain(
        // Shorthand not used here to keep behavior unchanged, and to not
        // risk expanding the type. In practice `string|undefined` would be
        // fine though as long as the consumers also have strict null checks disabled.
        'readonly name = input<string>(undefined);');
        expect(fs.readFile((0, file_system_1.absoluteFrom)('/app.component.ts'))).toContain('this.name().charAt(0);');
    }));
});
