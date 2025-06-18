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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const typescript_1 = __importDefault(require("typescript"));
const perform_compile_1 = require("../src/perform_compile");
const test_support_1 = require("./test_support");
describe('perform_compile', () => {
    let support;
    let basePath;
    beforeEach(() => {
        support = (0, test_support_1.setup)();
        basePath = support.basePath;
    });
    function writeSomeConfigs() {
        support.writeFiles({
            'tsconfig-level-1.json': `{
          "extends": "./tsconfig-level-2.json",
          "angularCompilerOptions": {
            "annotateForClosureCompiler": true
          }
        }
      `,
            'tsconfig-level-2.json': `{
          "extends": "./tsconfig-level-3.json",
          "angularCompilerOptions": {
            "skipMetadataEmit": true
          }
        }
      `,
            'tsconfig-level-3.json': `{
          "angularCompilerOptions": {
            "annotateForClosureCompiler": false,
            "annotationsAs": "decorators"
          }
        }
      `,
        });
    }
    it('should merge tsconfig "angularCompilerOptions"', () => {
        writeSomeConfigs();
        const { options } = (0, perform_compile_1.readConfiguration)(path.resolve(basePath, 'tsconfig-level-1.json'));
        expect(options.annotateForClosureCompiler).toBeTrue();
        expect(options.annotationsAs).toBe('decorators');
        expect(options.skipMetadataEmit).toBeTrue();
    });
    it(`should return undefined when debug is not defined in "angularCompilerOptions"`, () => {
        writeSomeConfigs();
        const { options } = (0, perform_compile_1.readConfiguration)(path.resolve(basePath, 'tsconfig-level-1.json'));
        expect(options['debug']).toBeUndefined();
    });
    it(`should return 'debug: false' when debug is disabled in "angularCompilerOptions"`, () => {
        writeSomeConfigs();
        support.writeFiles({
            'tsconfig-level-3.json': `{
          "angularCompilerOptions": {
            "debug": false
          }
        }
      `,
        });
        const { options } = (0, perform_compile_1.readConfiguration)(path.resolve(basePath, 'tsconfig-level-1.json'));
        expect(options['debug']).toBeFalse();
    });
    it('should override options defined in tsconfig with those defined in `existingOptions`', () => {
        support.writeFiles({
            'tsconfig-level-1.json': `{
          "compilerOptions": {
            "target": "es2020"
          },
          "angularCompilerOptions": {
            "annotateForClosureCompiler": true
          }
        }
      `,
        });
        const { options } = (0, perform_compile_1.readConfiguration)(path.resolve(basePath, 'tsconfig-level-1.json'), {
            annotateForClosureCompiler: false,
            target: typescript_1.default.ScriptTarget.ES2015,
            debug: false,
        });
        expect(options).toEqual(jasmine.objectContaining({
            debug: false,
            target: typescript_1.default.ScriptTarget.ES2015,
            annotateForClosureCompiler: false,
        }));
    });
    it('should merge tsconfig "angularCompilerOptions" when extends points to node package', () => {
        support.writeFiles({
            'tsconfig-level-1.json': `{
          "extends": "@angular-ru/tsconfig",
          "angularCompilerOptions": {
            "debug": false
          }
        }
      `,
            'node_modules/@angular-ru/tsconfig/tsconfig.json': `{
          "compilerOptions": {
            "strict": true
          },
          "angularCompilerOptions": {
            "skipMetadataEmit": true
          }
        }
      `,
            'node_modules/@angular-ru/tsconfig/package.json': `{
        "name": "@angular-ru/tsconfig",
        "version": "0.0.0",
        "main": "./tsconfig.json"
      }
    `,
        });
        const { options } = (0, perform_compile_1.readConfiguration)(path.resolve(basePath, 'tsconfig-level-1.json'));
        expect(options).toEqual(jasmine.objectContaining({
            strict: true,
            skipMetadataEmit: true,
            debug: false,
        }));
    });
    it('should merge tsconfig "angularCompilerOptions" when extends points to an extension less non rooted file', () => {
        support.writeFiles({
            'tsconfig-level-1.json': `{
            "extends": "@1stg/tsconfig/angular",
            "angularCompilerOptions": {
              "debug": false
            }
          }`,
            'node_modules/@1stg/tsconfig/angular.json': `{
            "compilerOptions": {
              "strict": true
            },
            "angularCompilerOptions": {
              "skipMetadataEmit": true
            }
          }`,
            'node_modules/@1stg/tsconfig/package.json': `{
            "name": "@1stg/tsconfig",
            "version": "0.0.0"
          }`,
        });
        const { options } = (0, perform_compile_1.readConfiguration)(path.resolve(basePath, 'tsconfig-level-1.json'));
        expect(options).toEqual(jasmine.objectContaining({
            strict: true,
            skipMetadataEmit: true,
            debug: false,
        }));
    });
    it('should merge tsconfig "angularCompilerOptions" when extends points to a non rooted file without json extension', () => {
        support.writeFiles({
            'tsconfig-level-1.json': `{
            "extends": "./tsconfig.app",
            "angularCompilerOptions": {
              "debug": false
            }
          }`,
            'tsconfig.app.json': `{
            "compilerOptions": {
              "strict": true
            },
            "angularCompilerOptions": {
              "skipMetadataEmit": true
            }
          }`,
        });
        const { options } = (0, perform_compile_1.readConfiguration)(path.resolve(basePath, 'tsconfig-level-1.json'));
        expect(options).toEqual(jasmine.objectContaining({
            strict: true,
            skipMetadataEmit: true,
            debug: false,
        }));
    });
    it('should merge tsconfig "angularCompilerOptions" when extends is aarray', () => {
        support.writeFiles({
            'tsconfig-level-1.json': `{
        "extends": [
          "./tsconfig-level-2.json",
          "./tsconfig-level-3.json",
        ],
        "compilerOptions": {
          "target": "es2020"
        },
        "angularCompilerOptions": {
          "annotateForClosureCompiler": false,
          "debug": false
        }
      }`,
            'tsconfig-level-2.json': `{
        "compilerOptions": {
          "target": "es5",
          "module": "es2015"
        },
        "angularCompilerOptions": {
          "skipMetadataEmit": true,
          "annotationsAs": "decorators"
        }
      }`,
            'tsconfig-level-3.json': `{
        "compilerOptions": {
          "target": "esnext",
          "module": "esnext"
        },
        "angularCompilerOptions": {
          "annotateForClosureCompiler": true,
          "skipMetadataEmit": false
        }
      }`,
        });
        const { options } = (0, perform_compile_1.readConfiguration)(path.resolve(basePath, 'tsconfig-level-1.json'));
        expect(options).toEqual(jasmine.objectContaining({
            target: typescript_1.default.ScriptTarget.ES2020,
            module: typescript_1.default.ModuleKind.ESNext,
            debug: false,
            annotationsAs: 'decorators',
            annotateForClosureCompiler: false,
            skipMetadataEmit: false,
        }));
    });
    it(`should not deep merge objects. (Ex: 'paths' and 'extendedDiagnostics')`, () => {
        support.writeFiles({
            'tsconfig-level-1.json': `{
          "extends": "./tsconfig-level-2.json",
          "compilerOptions": {
            "paths": {
              "@angular/core": ["/*"]
            }
          },
          "angularCompilerOptions": {
            "extendedDiagnostics": {
              "checks": {
                "textAttributeNotBinding": "suppress"
              }
            }
          }
        }
      `,
            'tsconfig-level-2.json': `{
          "compilerOptions": {
            "strict": false,
            "paths": {
              "@angular/common": ["/*"]
            }
          },
          "angularCompilerOptions": {
            "skipMetadataEmit": true,
            "extendedDiagnostics": {
              "checks": {
                "nullishCoalescingNotNullable": "suppress"
              }
            }
          }
        }
      `,
        });
        const { options } = (0, perform_compile_1.readConfiguration)(path.resolve(basePath, 'tsconfig-level-1.json'));
        expect(options).toEqual(jasmine.objectContaining({
            strict: false,
            skipMetadataEmit: true,
            extendedDiagnostics: { checks: { textAttributeNotBinding: 'suppress' } },
            paths: { '@angular/core': ['/*'] },
        }));
    });
});
