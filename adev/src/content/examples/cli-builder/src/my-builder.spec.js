"use strict";
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
// #docregion
const architect_1 = require("@angular-devkit/architect");
const testing_1 = require("@angular-devkit/architect/testing");
const core_1 = require("@angular-devkit/core");
const fs_1 = require("fs");
const path_1 = require("path");
describe('Copy File Builder', () => {
    let architect;
    let architectHost;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const registry = new core_1.schema.CoreSchemaRegistry();
        registry.addPostTransform(core_1.schema.transforms.addUndefinedDefaults);
        // TestingArchitectHost() takes workspace and current directories.
        // Since we don't use those, both are the same in this case.
        architectHost = new testing_1.TestingArchitectHost(__dirname, __dirname);
        architect = new architect_1.Architect(architectHost, registry);
        // This will either take a Node package name, or a path to the directory
        // for the package.json file.
        yield architectHost.addBuilderFromPackage((0, path_1.join)(__dirname, '..'));
    }));
    it('can copy files', () => __awaiter(void 0, void 0, void 0, function* () {
        // A "run" can have multiple outputs, and contains progress information.
        const run = yield architect.scheduleBuilder('@example/copy-file:copy', {
            source: 'package.json',
            destination: 'package-copy.json',
        });
        // The "result" member (of type BuilderOutput) is the next output.
        const output = yield run.result;
        // Stop the builder from running. This stops Architect from keeping
        // the builder-associated states in memory, since builders keep waiting
        // to be scheduled.
        yield run.stop();
        // Expect that the copied file is the same as its source.
        const sourceContent = yield fs_1.promises.readFile('package.json', 'utf8');
        const destinationContent = yield fs_1.promises.readFile('package-copy.json', 'utf8');
        expect(destinationContent).toBe(sourceContent);
    }));
});
// #enddocregion
