"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const compiler_1 = require("@angular/compiler");
const testing_1 = require("../../file_system/testing");
const context_1 = require("../src/context");
const template_1 = require("../src/template");
const transform_1 = require("../src/transform");
const util = __importStar(require("./util"));
/**
 * Adds information about a component to a context.
 */
function populateContext(context, component, selector, template, boundTemplate, isInline = false) {
    context.addComponent({
        declaration: component,
        selector,
        boundTemplate,
        templateMeta: {
            isInline,
            file: new compiler_1.ParseSourceFile(template, component.getSourceFile().fileName),
        },
    });
}
(0, testing_1.runInEachFileSystem)(() => {
    describe('generateAnalysis', () => {
        it('should emit component and template analysis information', () => {
            const context = new context_1.IndexingContext();
            const decl = util.getComponentDeclaration('class C {}', 'C');
            const template = '<div>{{foo}}</div>';
            populateContext(context, decl, 'c-selector', template, util.getBoundTemplate(template));
            const analysis = (0, transform_1.generateAnalysis)(context);
            expect(analysis.size).toBe(1);
            const info = analysis.get(decl);
            expect(info).toEqual({
                name: 'C',
                selector: 'c-selector',
                file: new compiler_1.ParseSourceFile('class C {}', decl.getSourceFile().fileName),
                template: {
                    identifiers: (0, template_1.getTemplateIdentifiers)(util.getBoundTemplate('<div>{{foo}}</div>'))
                        .identifiers,
                    usedComponents: new Set(),
                    isInline: false,
                    file: new compiler_1.ParseSourceFile('<div>{{foo}}</div>', decl.getSourceFile().fileName),
                },
                errors: [],
            });
        });
        it('should give inline templates the component source file', () => {
            const context = new context_1.IndexingContext();
            const decl = util.getComponentDeclaration('class C {}', 'C');
            const template = '<div>{{foo}}</div>';
            populateContext(context, decl, 'c-selector', '<div>{{foo}}</div>', util.getBoundTemplate(template), 
            /* inline template */ true);
            const analysis = (0, transform_1.generateAnalysis)(context);
            expect(analysis.size).toBe(1);
            const info = analysis.get(decl);
            expect(info).toBeDefined();
            expect(info.template.file).toEqual(new compiler_1.ParseSourceFile('class C {}', decl.getSourceFile().fileName));
        });
        it('should give external templates their own source file', () => {
            const context = new context_1.IndexingContext();
            const decl = util.getComponentDeclaration('class C {}', 'C');
            const template = '<div>{{foo}}</div>';
            populateContext(context, decl, 'c-selector', template, util.getBoundTemplate(template));
            const analysis = (0, transform_1.generateAnalysis)(context);
            expect(analysis.size).toBe(1);
            const info = analysis.get(decl);
            expect(info).toBeDefined();
            expect(info.template.file).toEqual(new compiler_1.ParseSourceFile('<div>{{foo}}</div>', decl.getSourceFile().fileName));
        });
        it('should emit used components', () => {
            const context = new context_1.IndexingContext();
            const templateA = '<b-selector></b-selector>';
            const declA = util.getComponentDeclaration('class A {}', 'A');
            const templateB = '<a-selector></a-selector>';
            const declB = util.getComponentDeclaration('class B {}', 'B');
            const boundA = util.getBoundTemplate(templateA, {}, [
                { selector: 'b-selector', declaration: declB },
            ]);
            const boundB = util.getBoundTemplate(templateB, {}, [
                { selector: 'a-selector', declaration: declA },
            ]);
            populateContext(context, declA, 'a-selector', templateA, boundA);
            populateContext(context, declB, 'b-selector', templateB, boundB);
            const analysis = (0, transform_1.generateAnalysis)(context);
            expect(analysis.size).toBe(2);
            const infoA = analysis.get(declA);
            expect(infoA).toBeDefined();
            expect(infoA.template.usedComponents).toEqual(new Set([declB]));
            const infoB = analysis.get(declB);
            expect(infoB).toBeDefined();
            expect(infoB.template.usedComponents).toEqual(new Set([declA]));
        });
    });
});
