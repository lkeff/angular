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
exports.getComponentDeclaration = getComponentDeclaration;
exports.getBoundTemplate = getBoundTemplate;
const compiler_1 = require("@angular/compiler");
const typescript_1 = __importDefault(require("typescript"));
const file_system_1 = require("../../file_system");
const imports_1 = require("../../imports");
const metadata_1 = require("../../metadata");
const testing_1 = require("../../testing");
/** Dummy file URL */
function getTestFilePath() {
    return (0, file_system_1.absoluteFrom)('/TEST_FILE.ts');
}
/**
 * Creates a class declaration from a component source code.
 */
function getComponentDeclaration(componentStr, className) {
    const program = (0, testing_1.makeProgram)([{ name: getTestFilePath(), contents: componentStr }]);
    return (0, testing_1.getDeclaration)(program.program, getTestFilePath(), className, (value) => typescript_1.default.isClassDeclaration(value));
}
/**
 * Parses a template source code and returns a template-bound target, optionally with information
 * about used components.
 *
 * @param template template to parse
 * @param options extra template parsing options
 * @param components components to bind to the template target
 */
function getBoundTemplate(template, options = {}, components = []) {
    const componentsMeta = components.map(({ selector, declaration }) => ({
        ref: new imports_1.Reference(declaration),
        selector,
        name: declaration.name.getText(),
        isComponent: true,
        inputs: metadata_1.ClassPropertyMapping.fromMappedObject({}),
        outputs: metadata_1.ClassPropertyMapping.fromMappedObject({}),
        exportAs: null,
        isStructural: false,
        animationTriggerNames: null,
        ngContentSelectors: null,
        preserveWhitespaces: false,
    }));
    let matcher;
    if (options.enableSelectorless) {
        const registry = new Map();
        for (const current of componentsMeta) {
            registry.set(current.name, [current]);
        }
        matcher = new compiler_1.SelectorlessMatcher(registry);
    }
    else {
        matcher = new compiler_1.SelectorMatcher();
        for (const current of componentsMeta) {
            if (current.selector !== null) {
                matcher.addSelectables(compiler_1.CssSelector.parse(current.selector), [current]);
            }
        }
    }
    const binder = new compiler_1.R3TargetBinder(matcher);
    return binder.bind({ template: (0, compiler_1.parseTemplate)(template, getTestFilePath(), options).nodes });
}
