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
const schematics_1 = require("@angular-devkit/schematics");
const testing_1 = require("@angular-devkit/schematics/testing");
const project_tsconfig_paths_1 = require("../utils/project_tsconfig_paths");
describe('project tsconfig paths', () => {
    let testTree;
    beforeEach(() => {
        testTree = new testing_1.UnitTestTree(new schematics_1.HostTree());
    });
    it('should detect build tsconfig path inside of angular.json file', () => __awaiter(void 0, void 0, void 0, function* () {
        testTree.create('/my-custom-config.json', '');
        testTree.create('/angular.json', JSON.stringify({
            version: 1,
            projects: {
                my_name: { root: '', architect: { build: { options: { tsConfig: './my-custom-config.json' } } } },
            },
        }));
        expect((yield (0, project_tsconfig_paths_1.getProjectTsConfigPaths)(testTree)).buildPaths).toEqual(['my-custom-config.json']);
    }));
    it('should be able to read workspace configuration which is using jsconc-parser features', () => __awaiter(void 0, void 0, void 0, function* () {
        testTree.create('/my-build-config.json', '');
        testTree.create('/angular.json', `{
      "version": 1,
      // Comments are supported in the workspace configurations.
      "projects": {
        "with_tests": {
          "root": "",
          "targets": {
            "build": {
              "options": {
                "tsConfig": "./my-build-config.json",
              }
            }
          }
        }
      },
    }`);
        expect((yield (0, project_tsconfig_paths_1.getProjectTsConfigPaths)(testTree)).buildPaths).toEqual(['my-build-config.json']);
    }));
    it('should detect test tsconfig path inside of angular.json file', () => __awaiter(void 0, void 0, void 0, function* () {
        testTree.create('/my-test-config.json', '');
        testTree.create('/angular.json', JSON.stringify({
            version: 1,
            projects: {
                my_name: { root: '', architect: { test: { options: { tsConfig: './my-test-config.json' } } } },
            },
        }));
        expect((yield (0, project_tsconfig_paths_1.getProjectTsConfigPaths)(testTree)).testPaths).toEqual(['my-test-config.json']);
    }));
    it('should detect test tsconfig path inside of .angular.json file', () => __awaiter(void 0, void 0, void 0, function* () {
        testTree.create('/my-test-config.json', '');
        testTree.create('/.angular.json', JSON.stringify({
            version: 1,
            projects: {
                with_tests: { root: '', architect: { test: { options: { tsConfig: './my-test-config.json' } } } },
            },
        }));
        expect((yield (0, project_tsconfig_paths_1.getProjectTsConfigPaths)(testTree)).testPaths).toEqual(['my-test-config.json']);
    }));
    it('should not return duplicate tsconfig files', () => __awaiter(void 0, void 0, void 0, function* () {
        testTree.create('/tsconfig.json', '');
        testTree.create('/.angular.json', JSON.stringify({
            version: 1,
            projects: { app: { root: '', architect: { build: { options: { tsConfig: 'tsconfig.json' } } } } },
        }));
        expect((yield (0, project_tsconfig_paths_1.getProjectTsConfigPaths)(testTree)).buildPaths).toEqual(['tsconfig.json']);
    }));
});
