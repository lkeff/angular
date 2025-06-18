"use strict";
/*!
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
const testing_1 = require("@angular/core/testing");
const typings_loader_service_1 = require("./typings-loader.service");
describe('TypingsLoader', () => {
    let service;
    const fakePackageJson = {
        exports: {
            '.': {
                types: './dist/*.d.ts',
            },
            './something': {
                types: 'something/index.d.ts',
                default: 'something/index.js',
                esm: 'something/index.mjs',
            },
        },
    };
    const fakeTypeDefinitionFiles = ['file.d.ts'];
    const fakeFiles = [...fakeTypeDefinitionFiles, 'file.js', 'file.mjs'];
    const fakeFileContent = 'content';
    const fakeWebContainer = {
        fs: {
            readFile: (path) => {
                if (path.endsWith('package.json')) {
                    return Promise.resolve(JSON.stringify(fakePackageJson));
                }
                else {
                    return Promise.resolve(fakeFileContent);
                }
            },
            readdir: (path) => {
                return Promise.resolve(fakeFiles.map((file) => `${path}/${file}`));
            },
        },
    };
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(typings_loader_service_1.TypingsLoader);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
    it('should read files from directory when a glob pattern is found', () => __awaiter(void 0, void 0, void 0, function* () {
        yield service.retrieveTypeDefinitions(fakeWebContainer);
        expect(service.typings().some(({ path }) => path.endsWith(fakeTypeDefinitionFiles[0]))).toBeTrue();
    }));
    it("should read type definition file when its path doesn't contain a glob pattern", () => __awaiter(void 0, void 0, void 0, function* () {
        yield service.retrieveTypeDefinitions(fakeWebContainer);
        expect(service
            .typings()
            .some(({ path }) => path.endsWith(fakePackageJson.exports['./something'].types))).toBeTrue();
    }));
    it('should only contain type definitions files', () => __awaiter(void 0, void 0, void 0, function* () {
        yield service.retrieveTypeDefinitions(fakeWebContainer);
        for (const { path } of service.typings()) {
            expect(path.endsWith('.d.ts')).toBeTrue();
        }
    }));
    it('should skip library if its package.json can not be found', () => __awaiter(void 0, void 0, void 0, function* () {
        const libraryThatIsNotADependency = service['librariesToGetTypesFrom'][0];
        const fakeWebContainerThatThrowsWithPackageJson = {
            fs: {
                readFile: (path) => {
                    if (path.endsWith('package.json')) {
                        if (path.includes(libraryThatIsNotADependency))
                            return Promise.reject(Error('ENOENT'));
                        else
                            return Promise.resolve(JSON.stringify(fakePackageJson));
                    }
                    else {
                        return Promise.resolve(fakeFileContent);
                    }
                },
                readdir: (path) => {
                    return Promise.resolve(fakeFiles.map((file) => `${path}/${file}`));
                },
            },
        };
        yield service.retrieveTypeDefinitions(fakeWebContainerThatThrowsWithPackageJson);
        for (const { path } of service.typings()) {
            expect(path.includes(libraryThatIsNotADependency)).toBe(false);
        }
    }));
});
