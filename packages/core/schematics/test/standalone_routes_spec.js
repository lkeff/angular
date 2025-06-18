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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular-devkit/core");
const testing_1 = require("@angular-devkit/core/node/testing");
const schematics_1 = require("@angular-devkit/schematics");
const testing_2 = require("@angular-devkit/schematics/testing");
const runfiles_1 = require("@bazel/runfiles");
const shelljs_1 = __importDefault(require("shelljs"));
describe('route lazy loading migration', () => {
    let runner;
    let host;
    let tree;
    let tmpDirPath;
    let previousWorkingDir;
    function writeFile(filePath, contents) {
        host.sync.write((0, core_1.normalize)(filePath), core_1.virtualFs.stringToFileBuffer(contents));
    }
    function runMigration(mode, path = './') {
        return runner.runSchematic('route-lazy-loading', { mode, path }, tree);
    }
    function stripWhitespace(content) {
        return content.replace(/\s+/g, '');
    }
    beforeEach(() => {
        runner = new testing_2.SchematicTestRunner('test', runfiles_1.runfiles.resolvePackageRelative('../collection.json'));
        host = new testing_1.TempScopedNodeJsSyncHost();
        tree = new testing_2.UnitTestTree(new schematics_1.HostTree(host));
        writeFile('/tsconfig.json', JSON.stringify({
            compilerOptions: {
                lib: ['es2015'],
                strictNullChecks: true,
            },
        }));
        writeFile('/angular.json', JSON.stringify({
            version: 1,
            projects: { t: { root: '', architect: { build: { options: { tsConfig: './tsconfig.json' } } } } },
        }));
        writeFile('/node_modules/@angular/router/index.d.ts', `
    export declare interface Route {
      path?: string;
      component?: any;
      loadComponent?: () => any | Promise<any> ;
      children?: Route[];
    }

    export declare type Routes = Route[];
    `);
        previousWorkingDir = shelljs_1.default.pwd();
        tmpDirPath = (0, core_1.getSystemPath)(host.root);
        // Switch into the temporary directory path. This allows us to run
        // the schematic against our custom unit test tree.
        shelljs_1.default.cd(tmpDirPath);
    });
    afterEach(() => {
        shelljs_1.default.cd(previousWorkingDir);
        shelljs_1.default.rm('-r', tmpDirPath);
    });
    it('should throw an error if no files match the passed-in path', () => __awaiter(void 0, void 0, void 0, function* () {
        let error = null;
        writeFile('dir.ts', `const hello = 'world';`);
        try {
            yield runMigration('route-lazy-loading', './foo');
        }
        catch (e) {
            error = e.message;
        }
        expect(error).toMatch(/Could not find any files to migrate under the path .*\/foo\./);
    }));
    it('should throw an error if a path outside of the project is passed in', () => __awaiter(void 0, void 0, void 0, function* () {
        let error = null;
        writeFile('dir.ts', `const hello = 'world';`);
        try {
            yield runMigration('route-lazy-loading', '../foo');
        }
        catch (e) {
            error = e.message;
        }
        expect(error).toBe('Cannot run route lazy loading migration outside of the current project.');
    }));
    it('should throw an error if the passed in path is a file', () => __awaiter(void 0, void 0, void 0, function* () {
        let error = null;
        writeFile('dir.ts', '');
        try {
            yield runMigration('route-lazy-loading', './dir.ts');
        }
        catch (e) {
            error = e.message;
        }
        expect(error).toMatch(/Migration path .*\/dir\.ts has to be a directory\. Cannot run the route lazy loading migration/);
    }));
    it('should throw an error if the component is in the same file as the routes declaration', () => __awaiter(void 0, void 0, void 0, function* () {
        writeFile('app.module.ts', `
      import {NgModule, Component} from '@angular/core';
      import {RouterModule} from '@angular/router';

      @Component({template: 'hello', standalone: true})
      export class TestComponent {}

      @NgModule({
        imports: [RouterModule.forRoot([{path: 'test', component: TestComponent}])],
      })
      export class AppModule {}
    `);
        let error;
        try {
            yield runMigration('route-lazy-loading');
        }
        catch (e) {
            error = e.message;
        }
        expect(error).toMatch(/Could not find any files to migrate under the path .*\/\./);
    }));
    it('should not migrate already lazy loaded standalone components', () => __awaiter(void 0, void 0, void 0, function* () {
        writeFile('app.module.ts', `
      import {NgModule} from '@angular/core';
      import {RouterModule} from '@angular/router';
      @NgModule({
        imports: [RouterModule.forRoot([{path: 'test', loadComponent: () => import('./test').then(m => m.TestComponent)}])],
      })
      export class AppModule {}
    `);
        writeFile('test.ts', `
      import {Component} from '@angular/core';
      @Component({template: 'hello', standalone: true})
      export class TestComponent {}
    `);
        let error;
        try {
            yield runMigration('route-lazy-loading');
        }
        catch (e) {
            error = e.message;
        }
        expect(error).toMatch(/Could not find any files to migrate under the path .*\/\./);
    }));
    it('should migrate standalone components in a different file from the routes declaration', () => __awaiter(void 0, void 0, void 0, function* () {
        writeFile('app.module.ts', `
      import {NgModule} from '@angular/core';
      import {RouterModule} from '@angular/router';
      import {TestComponent} from './test';

      @NgModule({
        imports: [RouterModule.forRoot([{path: 'test', component: TestComponent}])],
      })
      export class AppModule {}
    `);
        writeFile('test.ts', `
      import {Component} from '@angular/core';
      @Component({template: 'hello', standalone: true})
      export class TestComponent {}
    `);
        yield runMigration('route-lazy-loading');
        expect(stripWhitespace(tree.readContent('app.module.ts'))).toContain(stripWhitespace(`
         import {NgModule} from '@angular/core';
         import {RouterModule} from '@angular/router';

         @NgModule({
           imports: [RouterModule.forRoot([{path: 'test', loadComponent: () => import('./test').then(m => m.TestComponent)}])],
         })
         export class AppModule {}
      `));
    }));
    it('should support provideRouter, RouterModule.forRoot, RouterModule.forChild', () => __awaiter(void 0, void 0, void 0, function* () {
        writeFile('app.module.ts', `
      import {NgModule} from '@angular/core';
      import {RouterModule, provideRouter} from '@angular/router';
      import {TestComponent} from './test';

      const routes = [{path: 'test', component: TestComponent}];
      const routes2 = [{path: 'test', component: TestComponent}];

      @NgModule({
        imports: [
          RouterModule.forRoot([{path: 'test', component: TestComponent}]),
          RouterModule.forChild([{path: 'test', component: TestComponent}]),
        ],
        providers: [
          provideRouter(routes),
          provideRouter(routes),
          provideRouter(routes2)
        ],
      })
      export class AppModule {}
    `);
        writeFile('test.ts', `
      import {Component} from '@angular/core';
      @Component({template: 'hello', standalone: true})
      export class TestComponent {}
    `);
        yield runMigration('route-lazy-loading');
        expect(stripWhitespace(tree.readContent('app.module.ts'))).toContain(stripWhitespace(`
        import {NgModule} from '@angular/core';
        import {RouterModule, provideRouter} from '@angular/router';

        const routes = [{path: 'test', loadComponent: () => import('./test').then(m => m.TestComponent)}];
        const routes2 = [{path: 'test', loadComponent: () => import('./test').then(m => m.TestComponent)}];

        @NgModule({
          imports: [
            RouterModule.forRoot([{path: 'test', loadComponent: () => import('./test').then(m => m.TestComponent)}]),
            RouterModule.forChild([{path: 'test', loadComponent: () => import('./test').then(m => m.TestComponent)}]),
          ],
          providers: [
            provideRouter(routes),
            provideRouter(routes),
            provideRouter(routes2)
          ],
        })
        export class AppModule {}
      `));
    }));
    it('should support provideRoutes', () => __awaiter(void 0, void 0, void 0, function* () {
        writeFile('app.module.ts', `
      import {NgModule} from '@angular/core';
      import {provideRoutes} from '@angular/router';
      import {TestComponent} from './test';

      const routes = [{path: 'test', component: TestComponent}];

      @NgModule({
        providers: [provideRoutes(routes)],
      })
      export class AppModule {}
    `);
        writeFile('test.ts', `
      import {Component} from '@angular/core';
      @Component({template: 'hello', standalone: true})
      export class TestComponent {}
    `);
        yield runMigration('route-lazy-loading');
        expect(stripWhitespace(tree.readContent('app.module.ts'))).toContain(stripWhitespace(`
        import {NgModule} from '@angular/core';
        import {provideRoutes} from '@angular/router';

        const routes = [{path: 'test', loadComponent: () => import('./test').then(m => m.TestComponent)}];

        @NgModule({
          providers: [provideRoutes(routes)],
        })
        export class AppModule {}
      `));
    }));
    it('should skip not standalone components', () => __awaiter(void 0, void 0, void 0, function* () {
        writeFile('app.module.ts', `
      import {NgModule} from '@angular/core';
      import {provideRoutes} from '@angular/router';
      import {TestComponent} from './test';
      import {StandaloneByDefaultComponent} from './standalone-by-default';
      import {NotStandaloneComponent} from './not-standalone';

      const routes = [
        {path: 'test', component: TestComponent},
        {path: 'test1', component: NotStandaloneComponent},
        {path: 'test2', component: StandaloneByDefaultComponent},
      ];

      @NgModule({
        providers: [provideRoutes(routes)],
      })
      export class AppModule {}
    `);
        writeFile('test.ts', `
      import {Component} from '@angular/core';
      @Component({template: 'hello', standalone: true})
      export class TestComponent {}
    `);
        writeFile('standalone-by-default.ts', `
      import {Component} from '@angular/core';
      @Component({template: 'hello'})
      export class StandaloneByDefaultComponent {}
    `);
        writeFile('not-standalone.ts', `
      import {Component, NgModule} from '@angular/core';
      @Component({template: 'hello', standalone: false})
      export class NotStandaloneComponent {}

      @NgModule({declarations: [NotStandaloneComponent], exports: [NotStandaloneComponent]})
      export class NotStandaloneModule {}
      `);
        yield runMigration('route-lazy-loading');
        expect(stripWhitespace(tree.readContent('app.module.ts'))).toContain(stripWhitespace(`
        import {NgModule} from '@angular/core';
        import {provideRoutes} from '@angular/router';
        import {NotStandaloneComponent} from './not-standalone';

        const routes = [
          {path: 'test', loadComponent: () => import('./test').then(m => m.TestComponent)},
          {path: 'test1', component: NotStandaloneComponent},
          {path: 'test2', loadComponent: () => import('./standalone-by-default').then(m => m.StandaloneByDefaultComponent)},
        ];

        @NgModule({
          providers: [provideRoutes(routes)],
        })
        export class AppModule {}
      `));
    }));
    it('should support Router.resetConfig', () => __awaiter(void 0, void 0, void 0, function* () {
        writeFile('app.module.ts', `
      import {Component} from '@angular/core';
      import {Router} from '@angular/router';
      import {TestComponent} from './test';

      const routes = [{path: 'test', component: TestComponent}];

      @Component({})
      export class AppComponent {
        constructor(private router: Router) {}
        someMethod() {
          this.router.resetConfig(routes);
        }
      }
    `);
        writeFile('test.ts', `
      import {Component} from '@angular/core';
      @Component({template: 'hello', standalone: true})
      export class TestComponent {}
    `);
        yield runMigration('route-lazy-loading');
        expect(stripWhitespace(tree.readContent('app.module.ts'))).toContain(stripWhitespace(`
          import {Component} from '@angular/core';
          import {Router} from '@angular/router';

          const routes = [{path: 'test', loadComponent: () => import('./test').then(m => m.TestComponent)}];

          @Component({})
          export class AppComponent {
            constructor(private router: Router) {}
            someMethod() {
              this.router.resetConfig(routes);
            }
          }
      `));
    }));
    it('should support migrating default exported components', () => __awaiter(void 0, void 0, void 0, function* () {
        writeFile('app.module.ts', `
      import {NgModule} from '@angular/core';
      import {provideRouter} from '@angular/router';
      import TestComponent from './test';

      const routes = [{path: 'test', component: TestComponent}];

      @NgModule({
        providers: [provideRouter(routes)],
      })
      export class AppModule {}
    `);
        writeFile('test.ts', `
      import {Component} from '@angular/core';
      @Component({template: 'hello', standalone: true})
      export default class TestComponent {}
    `);
        yield runMigration('route-lazy-loading');
        expect(stripWhitespace(tree.readContent('app.module.ts'))).toContain(stripWhitespace(`
        import {NgModule} from '@angular/core';
        import {provideRouter} from '@angular/router';

        const routes = [{path: 'test', loadComponent: () => import('./test')}];

        @NgModule({
          providers: [provideRouter(routes)],
        })
        export class AppModule {}
      `));
    }));
    it('should migrate multiple components', () => __awaiter(void 0, void 0, void 0, function* () {
        writeFile('app.module.ts', `
      import {NgModule} from '@angular/core';
      import {RouterModule} from '@angular/router';
      import {routes} from './routes';

      @NgModule({
        imports: [RouterModule.forRoot(routes],
      })
      export class AppModule {}
    `);
        writeFile('routes.ts', `
      import {Routes, Route} from '@angular/router';
      import {TestComponent} from './test';
      import {Test1Component} from './cmp1';
      export const routes: Routes = [
        {path: 'test', component: TestComponent},
        {path: 'test1', component: Test1Component},
      ];
    `);
        writeFile('test.ts', `
      import {Component} from '@angular/core';
      @Component({template: 'hello', standalone: true})
      export class TestComponent {}
    `);
        writeFile('cmp1.ts', `
      import {Component} from '@angular/core';
      @Component({template: 'hello', standalone: true})
      export class Test1Component {}
    `);
        yield runMigration('route-lazy-loading');
        expect(stripWhitespace(tree.readContent('routes.ts'))).toContain(stripWhitespace(`
         import {Routes, Route} from '@angular/router';
         export const routes: Routes = [
          {path: 'test', loadComponent: () => import('./test').then(m => m.TestComponent)},
          {path: 'test1', loadComponent: () => import('./cmp1').then(m => m.Test1Component)},
         ];
      `));
    }));
    it('should migrate nested children components', () => __awaiter(void 0, void 0, void 0, function* () {
        writeFile('app.module.ts', `
      import {NgModule} from '@angular/core';
      import {RouterModule} from '@angular/router';
      import {routes} from './routes';
      @NgModule({ imports: [RouterModule.forRoot(routes] })
      export class AppModule {}
    `);
        writeFile('routes.ts', `
      import {Routes} from '@angular/router';
      import {TestComponent} from './test';
      import {Test1Component} from './cmp1';
      export const routes: Routes = [
        {path: 'test', component: TestComponent},
        {path: 'test1', component: Test1Component},
        {
          path:'nested',
          children: [
            {
              path: 'test',
              component: TestComponent,
              children: [
                {path: 'test', component: TestComponent},
                {path: 'test1', component: Test1Component},
                {
                  path: 'nested1',
                  children: [
                    {path: 'test', component: TestComponent},
                  ],
                },
              ],
            },
            {path: 'test', component: TestComponent},
          ]
        },
      ];
    `);
        writeFile('test.ts', `
      import {Component} from '@angular/core';
      @Component({template: 'hello', standalone: true})
      export class TestComponent {}
    `);
        writeFile('cmp1.ts', `
      import {Component} from '@angular/core';
      @Component({template: 'hello', standalone: true})
      export class Test1Component {}
    `);
        yield runMigration('route-lazy-loading');
        expect(stripWhitespace(tree.readContent('routes.ts'))).toContain(stripWhitespace(`
         import {Routes} from '@angular/router';
         export const routes: Routes = [
          {path: 'test', loadComponent: () => import('./test').then(m => m.TestComponent)},
          {path: 'test1', loadComponent: () => import('./cmp1').then(m => m.Test1Component)},
          {
            path:'nested',
            children: [
              {
                path: 'test',
                loadComponent: () => import('./test').then(m => m.TestComponent),
                children: [
                  {path: 'test', loadComponent: () => import('./test').then(m => m.TestComponent)},
                  {path: 'test1', loadComponent: () => import('./cmp1').then(m => m.Test1Component)},
                  {
                    path: 'nested1',
                    children: [
                      {path: 'test', loadComponent: () => import('./test').then(m => m.TestComponent)},
                    ],
                  },
                ],
              },
              {path: 'test', loadComponent: () => import('./test').then(m => m.TestComponent)},
            ]
          },
         ];
      `));
    }));
    it('should migrate routes if the routes file in is another file with type', () => __awaiter(void 0, void 0, void 0, function* () {
        writeFile('app.module.ts', `
      import {NgModule} from '@angular/core';
      import {RouterModule} from '@angular/router';
      import {routes} from './routes';

      @NgModule({
        imports: [RouterModule.forRoot(routes],
      })
      export class AppModule {}
    `);
        writeFile('routes.ts', `
      import {Routes, Route} from '@angular/router';
      import {TestComponent} from './test';
      import {Test2 as Test2Alias} from './test2';
      export const routes: Routes = [{path: 'test', component: TestComponent}];
      export const routes1: Route[] = [{path: 'test', component: Test2Alias}];
    `);
        writeFile('test.ts', `
      import {Component} from '@angular/core';
      @Component({template: 'hello', standalone: true})
      export class TestComponent {}
    `);
        writeFile('test2.ts', `
      import {Component} from '@angular/core';
      @Component({template: 'hello', standalone: true})
      export class Test2 {}
    `);
        yield runMigration('route-lazy-loading');
        expect(stripWhitespace(tree.readContent('routes.ts'))).toContain(stripWhitespace(`
         import {Routes, Route} from '@angular/router';
         export const routes: Routes = [{path: 'test', loadComponent: () => import('./test').then(m => m.TestComponent)}];
         export const routes1: Route[] = [{path: 'test', loadComponent: () => import('./test2').then(m => m.Test2)}];
      `));
    }));
    it('should migrate routes array if the Routes type is aliased', () => __awaiter(void 0, void 0, void 0, function* () {
        writeFile('routes.ts', `
      import {Routes as Routes1, Route as Route1} from '@angular/router';
      import {TestComponent} from './test';
      export const routes: Routes1 = [{path: 'test', component: TestComponent}];
      export const routes1: Route1[] = [{path: 'test', component: TestComponent}];
    `);
        writeFile('test.ts', `
      import {Component} from '@angular/core';
      @Component({template: 'hello', standalone: true})
      export class TestComponent {}
    `);
        yield runMigration('route-lazy-loading');
        expect(stripWhitespace(tree.readContent('routes.ts'))).toContain(stripWhitespace(`
        import {Routes as Routes1, Route as Route1} from '@angular/router';
        export const routes: Routes1 = [{path: 'test', loadComponent: () => import('./test').then(m => m.TestComponent)}];
        export const routes1: Route1[] = [{path: 'test', loadComponent: () => import('./test').then(m => m.TestComponent)}];
      `));
    }));
    it('should support components with additional decorators', () => __awaiter(void 0, void 0, void 0, function* () {
        writeFile('app.module.ts', `
      import {NgModule} from '@angular/core';
      import {RouterModule} from '@angular/router';
      import {TestComponent} from './test';

      @NgModule({
        imports: [RouterModule.forRoot([{path: 'test', component: TestComponent}])],
      })
      export class AppModule {}
    `);
        writeFile('test.ts', `
      import {Component, Directive} from '@angular/core';

      function OtherDecorator() {}

      @OtherDecorator()
      @Component({template: 'hello', standalone: true})
      export class TestComponent {}
    `);
        yield runMigration('route-lazy-loading');
        expect(stripWhitespace(tree.readContent('app.module.ts'))).toContain(stripWhitespace(`
         import {NgModule} from '@angular/core';
         import {RouterModule} from '@angular/router';

         @NgModule({
           imports: [RouterModule.forRoot([{path: 'test', loadComponent: () => import('./test').then(m => m.TestComponent)}])],
         })
         export class AppModule {}
      `));
    }));
    it('should not migrate routes if the routes array doesnt have type and is not referenced', () => __awaiter(void 0, void 0, void 0, function* () {
        writeFile('routes.ts', `
     import {TestComponent} from './test';
     export const routes = [{path: 'test', component: TestComponent}];
    `);
        writeFile('test.ts', `
      import {Component} from '@angular/core';
      @Component({template: 'hello', standalone: true})
      export class TestComponent {}
    `);
        let error = null;
        try {
            yield runMigration('route-lazy-loading');
        }
        catch (e) {
            error = e.message;
        }
        expect(error).toMatch(/Could not find any files to migrate under the path/);
    }));
    xit('should migrate routes if the routes file in is another file without type', () => __awaiter(void 0, void 0, void 0, function* () {
        writeFile('app.module.ts', `
      import {NgModule} from '@angular/core';
      import {RouterModule} from '@angular/router';
      import {routes} from './routes';

      @NgModule({
        imports: [RouterModule.forRoot(routes],
      })
      export class AppModule {}
    `);
        writeFile('routes.ts', `
     import {TestComponent} from './test';
     export const routes = [{path: 'test', component: TestComponent}];
    `);
        writeFile('test.ts', `
      import {Component} from '@angular/core';
      @Component({template: 'hello', standalone: true})
      export class TestComponent {}
    `);
        yield runMigration('route-lazy-loading');
        expect(stripWhitespace(tree.readContent('routes.ts'))).toContain(stripWhitespace(`
        export const routes = [{path: 'test', loadComponent: () => import('./test').then(m => m.TestComponent)}];
      `));
    }));
    // TODO: support multiple imports of components
    // ex import * as Components from './components';
    // export const MenuRoutes: Routes = [
    //   {
    //     path: 'menu',
    //     component: Components.MenuListComponent
    //   },
    // ];
});
