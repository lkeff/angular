"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const diagnostics_1 = require("@angular/compiler-cli/src/ngtsc/diagnostics");
const testing_1 = require("@angular/compiler-cli/src/ngtsc/file_system/testing");
const typescript_1 = __importDefault(require("typescript"));
const testing_2 = require("../testing");
describe('getSemanticDiagnostics', () => {
    let env;
    beforeEach(() => {
        (0, testing_1.initMockFileSystem)('Native');
        env = testing_2.LanguageServiceTestEnv.setup();
    });
    it('should not produce error for a minimal component definition', () => {
        const files = {
            'app.ts': `
      import {Component, NgModule} from '@angular/core';

      @Component({
        template: '',
        standalone: false,
      })
      export class AppComponent {}
    `,
        };
        const project = (0, testing_2.createModuleAndProjectWithDeclarations)(env, 'test', files);
        const diags = project.getDiagnosticsForFile('app.ts');
        expect(diags.length).toEqual(0);
    });
    it('should report member does not exist', () => {
        const files = {
            'app.ts': `
      import {Component, NgModule} from '@angular/core';

      @Component({
        template: '{{nope}}',
        standalone: false,
      })
      export class AppComponent {}
    `,
        };
        const project = (0, testing_2.createModuleAndProjectWithDeclarations)(env, 'test', files);
        const diags = project.getDiagnosticsForFile('app.ts');
        expect(diags.length).toBe(1);
        const { category, file, messageText } = diags[0];
        expect(category).toBe(typescript_1.default.DiagnosticCategory.Error);
        expect(file === null || file === void 0 ? void 0 : file.fileName).toBe('/test/app.ts');
        expect(messageText).toBe(`Property 'nope' does not exist on type 'AppComponent'.`);
    });
    it('produces diagnostic for duplicate docarated property rather than crashing', () => {
        var _a, _b;
        const files = {
            'app.ts': `
      import {Component, Input} from '@angular/core';

      @Component({
        template: '',
      })
      export class AppComponent {
        @Input() test1?: string;
        @Input() test1?: string;
      }
    `,
        };
        const project = (0, testing_2.createModuleAndProjectWithDeclarations)(env, 'test', files);
        const diags = project.getDiagnosticsForFile('app.ts');
        expect(diags.length).toBe(2);
        expect(diags[0].category).toBe(typescript_1.default.DiagnosticCategory.Error);
        expect((_a = diags[0].file) === null || _a === void 0 ? void 0 : _a.fileName).toBe('/test/app.ts');
        expect(diags[0].messageText).toBe(`Duplicate identifier 'test1'.`);
        expect(diags[1].category).toBe(typescript_1.default.DiagnosticCategory.Error);
        expect((_b = diags[1].file) === null || _b === void 0 ? void 0 : _b.fileName).toBe('/test/app.ts');
        expect(diags[1].messageText).toBe(`Duplicate decorated properties found on class 'AppComponent': test1`);
    });
    it('should process external template', () => {
        const files = {
            'app.ts': `
      import {Component, NgModule} from '@angular/core';

      @Component({
        templateUrl: './app.html',
        standalone: false,
      })
      export class AppComponent {}
    `,
            'app.html': `Hello world!`,
        };
        const project = (0, testing_2.createModuleAndProjectWithDeclarations)(env, 'test', files);
        const diags = project.getDiagnosticsForFile('app.html');
        expect(diags).toEqual([]);
    });
    it('should not report external template diagnostics on the TS file', () => {
        const files = {
            'app.ts': `
        import {Component, NgModule} from '@angular/core';

        @Component({
          templateUrl: './app.html',
          standalone: false,
        })
        export class AppComponent {}
      `,
            'app.html': '{{nope}}',
        };
        const project = (0, testing_2.createModuleAndProjectWithDeclarations)(env, 'test', files);
        const diags = project.getDiagnosticsForFile('app.ts');
        expect(diags).toEqual([]);
    });
    it('should report diagnostics in inline templates', () => {
        const files = {
            'app.ts': `
        import {Component, NgModule} from '@angular/core';

        @Component({
          template: '{{nope}}',
          standalone: false,
        })
        export class AppComponent {}
      `,
        };
        const project = (0, testing_2.createModuleAndProjectWithDeclarations)(env, 'test', files);
        const diags = project.getDiagnosticsForFile('app.ts');
        expect(diags.length).toBe(1);
        const { category, file, messageText } = diags[0];
        expect(category).toBe(typescript_1.default.DiagnosticCategory.Error);
        expect(file === null || file === void 0 ? void 0 : file.fileName).toBe('/test/app.ts');
        expect(messageText).toBe(`Property 'nope' does not exist on type 'AppComponent'.`);
    });
    it('should report member does not exist in external template', () => {
        const files = {
            'app.ts': `
      import {Component, NgModule} from '@angular/core';

      @Component({
        templateUrl: './app.html',
        standalone: false,
      })
      export class AppComponent {}
    `,
            'app.html': '{{nope}}',
        };
        const project = (0, testing_2.createModuleAndProjectWithDeclarations)(env, 'test', files);
        const diags = project.getDiagnosticsForFile('app.html');
        expect(diags.length).toBe(1);
        const { category, file, messageText } = diags[0];
        expect(category).toBe(typescript_1.default.DiagnosticCategory.Error);
        expect(file === null || file === void 0 ? void 0 : file.fileName).toBe('/test/app.html');
        expect(messageText).toBe(`Property 'nope' does not exist on type 'AppComponent'.`);
    });
    it('should report a parse error in external template', () => {
        const files = {
            'app.ts': `
      import {Component, NgModule} from '@angular/core';

      @Component({
        templateUrl: './app.html',
        standalone: false,
      })
      export class AppComponent {
        nope = false;
      }
    `,
            'app.html': '{{nope = true}}',
        };
        const project = (0, testing_2.createModuleAndProjectWithDeclarations)(env, 'test', files);
        const diags = project.getDiagnosticsForFile('app.html');
        expect(diags.length).toBe(1);
        const { category, file, messageText } = diags[0];
        expect(category).toBe(typescript_1.default.DiagnosticCategory.Error);
        expect(file === null || file === void 0 ? void 0 : file.fileName).toBe('/test/app.html');
        expect(messageText).toContain(`Parser Error: Bindings cannot contain assignments at column 8 in [{{nope = true}}]`);
    });
    it('reports html parse errors along with typecheck errors as diagnostics', () => {
        var _a, _b;
        const files = {
            'app.ts': `
      import {Component, NgModule} from '@angular/core';

      @Component({
        templateUrl: './app.html',
        standalone: false,
      })
      export class AppComponent {
        nope = false;
      }
    `,
            'app.html': '<dne',
        };
        const project = (0, testing_2.createModuleAndProjectWithDeclarations)(env, 'test', files);
        const diags = project.getDiagnosticsForFile('app.html');
        expect(diags.length).toBe(2);
        expect(diags[0].category).toBe(typescript_1.default.DiagnosticCategory.Error);
        expect((_a = diags[0].file) === null || _a === void 0 ? void 0 : _a.fileName).toBe('/test/app.html');
        expect(diags[0].messageText).toContain(`'dne' is not a known element`);
        expect(diags[1].category).toBe(typescript_1.default.DiagnosticCategory.Error);
        expect((_b = diags[1].file) === null || _b === void 0 ? void 0 : _b.fileName).toBe('/test/app.html');
        expect(diags[1].messageText).toContain(`Opening tag "dne" not terminated.`);
    });
    it('should report parse errors of components defined in the same ts file', () => {
        const files = {
            'app.ts': `
      import {Component, NgModule} from '@angular/core';

      @Component({ 
        templateUrl: './app1.html',
        standalone: false,
      })
      export class AppComponent1 { nope = false; }

      @Component({ 
        templateUrl: './app2.html',
        standalone: false,
      })
      export class AppComponent2 { nope = false; }
    `,
            'app1.html': '{{nope = false}}',
            'app2.html': '{{nope = true}}',
            'app-module.ts': `
        import {NgModule} from '@angular/core';
        import {CommonModule} from '@angular/common';
        import {AppComponent, AppComponent2} from './app';

        @NgModule({
          declarations: [AppComponent, AppComponent2],
          imports: [CommonModule],
        })
        export class AppModule {}
    `,
        };
        const project = env.addProject('test', files);
        const diags1 = project.getDiagnosticsForFile('app1.html');
        expect(diags1.length).toBe(1);
        expect(diags1[0].messageText).toBe('Parser Error: Bindings cannot contain assignments at column 8 in [{{nope = false}}] in /test/app1.html@0:0');
        const diags2 = project.getDiagnosticsForFile('app2.html');
        expect(diags2.length).toBe(1);
        expect(diags2[0].messageText).toBe('Parser Error: Bindings cannot contain assignments at column 8 in [{{nope = true}}] in /test/app2.html@0:0');
    });
    it('reports a diagnostic for a component without a template', () => {
        const files = {
            'app.ts': `
      import {Component} from '@angular/core';
      @Component({
        standalone: false,
      })
      export class MyComponent {}
    `,
        };
        const project = (0, testing_2.createModuleAndProjectWithDeclarations)(env, 'test', files);
        const diags = project.getDiagnosticsForFile('app.ts');
        expect(diags.map((x) => x.messageText)).toEqual(['component is missing a template']);
    });
    it('reports a warning when the project configuration prevents good type inference', () => {
        const files = {
            'app.ts': `
        import {Component, NgModule} from '@angular/core';
        import {CommonModule} from '@angular/common';

        @Component({
          template: '<div *ngFor="let user of users">{{user}}</div>',
          standalone: false,
        })
        export class MyComponent {
          users = ['Alpha', 'Beta'];
        }
      `,
        };
        const project = (0, testing_2.createModuleAndProjectWithDeclarations)(env, 'test', files, {
            // Disable `strictTemplates`.
            strictTemplates: false,
            // Use `fullTemplateTypeCheck` mode instead.
            fullTemplateTypeCheck: true,
        });
        const diags = project.getDiagnosticsForFile('app.ts');
        expect(diags.length).toBe(1);
        const diag = diags[0];
        expect(diag.code).toBe((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.SUGGEST_SUBOPTIMAL_TYPE_INFERENCE));
        expect(diag.category).toBe(typescript_1.default.DiagnosticCategory.Suggestion);
        expect(getTextOfDiagnostic(diag)).toBe('user');
    });
    it('should process a component that would otherwise require an inline TCB', () => {
        const files = {
            'app.ts': `
        import {Component, NgModule} from '@angular/core';
        import {CommonModule} from '@angular/common';

        interface PrivateInterface {}

        @Component({
          template: 'Simple template',
          standalone: false,
        })
        export class MyComponent<T extends PrivateInterface> {}
      `,
        };
        const project = (0, testing_2.createModuleAndProjectWithDeclarations)(env, 'test', files);
        const diags = project.getDiagnosticsForFile('app.ts');
        expect(diags.length).toBe(0);
    });
    it('should exclude unused pipes that would otherwise require an inline TCB', () => {
        const files = {
            // Declare an external package that exports `MyPipeModule` without also exporting `MyPipe`
            // from its public API. This means that `MyPipe` cannot be imported using the package name
            // as module specifier.
            'node_modules/pipe/pipe.d.ts': `
        import {ɵɵDirectiveDeclaration} from '@angular/core';

        export declare class MyPipe {
          static ɵpipe: ɵɵPipeDeclaration<MyPipe, "myPipe", false>;
        }
      `,
            'node_modules/pipe/index.d.ts': `
        import {ɵɵNgModuleDeclaration} from '@angular/core';
        import {MyPipe} from './pipe';

        export declare class MyPipeModule {
          static ɵmod: ɵɵNgModuleDeclaration<MyPipeModule, [typeof MyPipe], never, [typeof MyPipe]>;
        }
      `,
            'app.ts': `
        import {Component, NgModule} from '@angular/core';
        import {MyPipeModule} from 'pipe';

        @Component({
          template: 'Simple template that does not use "myPipe"',
          standalone: false,
        })
        export class MyComponent {}

        @NgModule({
          declarations: [MyComponent],
          imports: [MyPipeModule],
        })
        export class MyModule {}
      `,
        };
        const project = env.addProject('test', files);
        const diags = project.getDiagnosticsForFile('app.ts');
        expect(diags.length).toBe(0);
    });
    it('logs perf tracing', () => {
        const files = {
            'app.ts': `
        import {Component} from '@angular/core';
        @Component({ 
          template: '',
          standalone: false,
        })
        export class MyComponent {}
      `,
        };
        const project = (0, testing_2.createModuleAndProjectWithDeclarations)(env, 'test', files);
        const logger = project.getLogger();
        spyOn(logger, 'hasLevel').and.returnValue(true);
        spyOn(logger, 'perftrc').and.callFake(() => { });
        const diags = project.getDiagnosticsForFile('app.ts');
        expect(diags.length).toEqual(0);
        expect(logger.perftrc).toHaveBeenCalledWith(jasmine.stringMatching(/LanguageService\#LsDiagnostics\:.*\"LsDiagnostics\":\s*\d+.*/g));
    });
    it('does not produce diagnostics when pre-compiled file is found', () => {
        const files = {
            'app.ts': `
        import {Component} from '@angular/core';

        @Component({
          template: '',
          styleUrls: ['./one.css', './two/two.css', './three.css', '../test/four.css'],
          standalone: false,
        })
        export class MyComponent {}
      `,
            'one.scss': '',
            'two/two.sass': '',
            'three.less': '',
            'four.styl': '',
        };
        const project = (0, testing_2.createModuleAndProjectWithDeclarations)(env, 'test', files);
        const diags = project.getDiagnosticsForFile('app.ts');
        expect(diags.length).toBe(0);
    });
    it('produces missing resource diagnostic for missing css', () => {
        const files = {
            'app.ts': `
        import {Component} from '@angular/core';

        @Component({
          template: '',
          styleUrls: ['./missing.css'],
          standalone: false,
        })
        export class MyComponent {}
      `,
        };
        const project = (0, testing_2.createModuleAndProjectWithDeclarations)(env, 'test', files);
        const diags = project.getDiagnosticsForFile('app.ts');
        expect(diags.length).toBe(1);
        const diag = diags[0];
        expect(diag.code).toBe((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.COMPONENT_RESOURCE_NOT_FOUND));
        expect(diag.category).toBe(typescript_1.default.DiagnosticCategory.Error);
        expect(getTextOfDiagnostic(diag)).toBe(`'./missing.css'`);
    });
    it('should produce invalid banana in box warning', () => {
        const files = {
            'app.ts': `
        import {Component} from '@angular/core';
        @Component({
          selector: 'test',
          template: '<div ([notARealThing])="bar"></div>',
          standalone: false,
        })
        export class TestCmp {
          bar: string = "text";
        }
    `,
        };
        const project = (0, testing_2.createModuleAndProjectWithDeclarations)(env, 'test', files, {
            strictTemplates: true,
        });
        const diags = project.getDiagnosticsForFile('app.ts');
        expect(diags.length).toEqual(1);
        expect(diags[0].code).toEqual((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.INVALID_BANANA_IN_BOX));
        expect(diags[0].category).toEqual(typescript_1.default.DiagnosticCategory.Warning);
    });
    it('should not produce invalid banana in box warning without `strictTemplates`', () => {
        const files = {
            'app.ts': `
        import {Component} from '@angular/core';
        @Component({
          selector: 'test',
          template: '<div ([notARealThing])="bar"></div>',
          standalone: false,
        })
        export class TestCmp {
          bar: string = "text";
        }
    `,
        };
        const project = (0, testing_2.createModuleAndProjectWithDeclarations)(env, 'test', files, {
            strictTemplates: false,
        });
        const diags = project.getDiagnosticsForFile('app.ts');
        expect(diags.length).toEqual(0);
    });
    it('should produce invalid banana in box warning in external html file', () => {
        const files = {
            'app.ts': `
        import {Component} from '@angular/core';
        @Component({
          selector: 'test',
          templateUrl: './app.html',
          standalone: false,
        })
        export class TestCmp {
          bar: string = "text";
        }
    `,
            'app.html': `<div ([foo])="bar"></div>`,
        };
        const project = (0, testing_2.createModuleAndProjectWithDeclarations)(env, 'test', files, {
            strictTemplates: true,
        });
        const diags = project.getDiagnosticsForFile('app.html');
        expect(diags.length).toEqual(1);
        expect(diags[0].code).toEqual((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.INVALID_BANANA_IN_BOX));
        expect(diags[0].category).toEqual(typescript_1.default.DiagnosticCategory.Warning);
    });
    it('should not produce invalid banana in box warning in external html file without `strictTemplates`', () => {
        const files = {
            'app.ts': `
        import {Component} from '@angular/core';
        @Component({
          selector: 'test',
          templateUrl: './app.html',
          standalone: false,
        })
        export class TestCmp {
          bar: string = "text";
        }
    `,
            'app.html': `<div ([foo])="bar"></div>`,
        };
        const project = (0, testing_2.createModuleAndProjectWithDeclarations)(env, 'test', files, {
            strictTemplates: false,
        });
        const diags = project.getDiagnosticsForFile('app.html');
        expect(diags.length).toEqual(0);
    });
    it('generates diagnostic when the library does not export the host directive', () => {
        const files = {
            // export post module and component but not the host directive. This is not valid. We won't
            // be able to import the host directive for template type checking.
            'dist/post/index.d.ts': `
      export { PostComponent, PostModule } from './lib/post.component';
    `,
            'dist/post/lib/post.component.d.ts': `
      import * as i0 from "@angular/core";
      export declare class HostBindDirective {
          static ɵdir: i0.ɵɵDirectiveDeclaration<HostBindDirective, never, never, {}, {}, never, never, true, never>;
      }
      export declare class PostComponent {
          static ɵcmp: i0.ɵɵComponentDeclaration<PostComponent, "lib-post", never, {}, {}, never, never, false, [{ directive: typeof HostBindDirective; inputs: {}; outputs: {}; }]>;
      }
      export declare class PostModule {
          static ɵmod: i0.ɵɵNgModuleDeclaration<PostModule, [typeof PostComponent], never, [typeof PostComponent]>;
          static ɵinj: i0.ɵɵInjectorDeclaration<PostModule>;
      }
      `,
            'test.ts': `
      import {Component} from '@angular/core';
      import {PostModule} from 'post';

      @Component({
        templateUrl: './test.ng.html',
        imports: [PostModule],
        standalone: true,
      })
      export class Main { }
       `,
            'test.ng.html': '<lib-post />',
        };
        const tsCompilerOptions = { paths: { 'post': ['dist/post'] } };
        const project = env.addProject('test', files, {}, tsCompilerOptions);
        const diags = project.getDiagnosticsForFile('test.ng.html');
        expect(diags.length).toBe(1);
        expect(typescript_1.default.flattenDiagnosticMessageText(diags[0].messageText, '')).toContain('HostBindDirective');
    });
});
function getTextOfDiagnostic(diag) {
    expect(diag.file).not.toBeUndefined();
    expect(diag.start).not.toBeUndefined();
    expect(diag.length).not.toBeUndefined();
    return diag.file.text.substring(diag.start, diag.start + diag.length);
}
