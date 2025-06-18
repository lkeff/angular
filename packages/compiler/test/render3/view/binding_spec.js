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
Object.defineProperty(exports, "__esModule", { value: true });
const a = __importStar(require("../../../src/render3/r3_ast"));
const t2_binder_1 = require("../../../src/render3/view/t2_binder");
const template_1 = require("../../../src/render3/view/template");
const directive_matching_1 = require("../../../src/directive_matching");
const util_1 = require("./util");
/**
 * A `InputOutputPropertySet` which only uses an identity mapping for fields and properties.
 */
class IdentityInputMapping {
    constructor(names) {
        this.names = new Set(names);
    }
    hasBindingPropertyName(propertyName) {
        return this.names.has(propertyName);
    }
}
function makeSelectorMatcher() {
    const matcher = new directive_matching_1.SelectorMatcher();
    matcher.addSelectables(directive_matching_1.CssSelector.parse('[ngFor][ngForOf]'), [
        {
            name: 'NgFor',
            exportAs: null,
            inputs: new IdentityInputMapping(['ngForOf']),
            outputs: new IdentityInputMapping([]),
            isComponent: false,
            isStructural: true,
            selector: '[ngFor][ngForOf]',
            animationTriggerNames: null,
            ngContentSelectors: null,
            preserveWhitespaces: false,
        },
    ]);
    matcher.addSelectables(directive_matching_1.CssSelector.parse('[dir]'), [
        {
            name: 'Dir',
            exportAs: ['dir'],
            inputs: new IdentityInputMapping([]),
            outputs: new IdentityInputMapping([]),
            isComponent: false,
            isStructural: false,
            selector: '[dir]',
            animationTriggerNames: null,
            ngContentSelectors: null,
            preserveWhitespaces: false,
        },
    ]);
    matcher.addSelectables(directive_matching_1.CssSelector.parse('[hasOutput]'), [
        {
            name: 'HasOutput',
            exportAs: null,
            inputs: new IdentityInputMapping([]),
            outputs: new IdentityInputMapping(['outputBinding']),
            isComponent: false,
            isStructural: false,
            selector: '[hasOutput]',
            animationTriggerNames: null,
            ngContentSelectors: null,
            preserveWhitespaces: false,
        },
    ]);
    matcher.addSelectables(directive_matching_1.CssSelector.parse('[hasInput]'), [
        {
            name: 'HasInput',
            exportAs: null,
            inputs: new IdentityInputMapping(['inputBinding']),
            outputs: new IdentityInputMapping([]),
            isComponent: false,
            isStructural: false,
            selector: '[hasInput]',
            animationTriggerNames: null,
            ngContentSelectors: null,
            preserveWhitespaces: false,
        },
    ]);
    matcher.addSelectables(directive_matching_1.CssSelector.parse('[sameSelectorAsInput]'), [
        {
            name: 'SameSelectorAsInput',
            exportAs: null,
            inputs: new IdentityInputMapping(['sameSelectorAsInput']),
            outputs: new IdentityInputMapping([]),
            isComponent: false,
            isStructural: false,
            selector: '[sameSelectorAsInput]',
            animationTriggerNames: null,
            ngContentSelectors: null,
            preserveWhitespaces: false,
        },
    ]);
    matcher.addSelectables(directive_matching_1.CssSelector.parse('comp'), [
        {
            name: 'Comp',
            exportAs: null,
            inputs: new IdentityInputMapping([]),
            outputs: new IdentityInputMapping([]),
            isComponent: true,
            isStructural: false,
            selector: 'comp',
            animationTriggerNames: null,
            ngContentSelectors: null,
            preserveWhitespaces: false,
        },
    ]);
    const simpleDirectives = ['a', 'b', 'c', 'd', 'e', 'f'];
    const deferBlockDirectives = ['loading', 'error', 'placeholder'];
    for (const dir of [...simpleDirectives, ...deferBlockDirectives]) {
        const name = dir[0].toUpperCase() + dir.slice(1).toLowerCase();
        matcher.addSelectables(directive_matching_1.CssSelector.parse(`[${dir}]`), [
            {
                name: `Dir${name}`,
                exportAs: null,
                inputs: new IdentityInputMapping([]),
                outputs: new IdentityInputMapping([]),
                isComponent: false,
                isStructural: true,
                selector: `[${dir}]`,
                animationTriggerNames: null,
                ngContentSelectors: null,
                preserveWhitespaces: false,
            },
        ]);
    }
    return matcher;
}
describe('findMatchingDirectivesAndPipes', () => {
    it('should match directives and detect pipes in eager and deferrable parts of a template', () => {
        const template = `
      <div [title]="abc | uppercase"></div>
      @defer {
        <my-defer-cmp [label]="abc | lowercase" />
      } @placeholder {}
    `;
        const directiveSelectors = ['[title]', 'my-defer-cmp', 'not-matching'];
        const result = (0, t2_binder_1.findMatchingDirectivesAndPipes)(template, directiveSelectors);
        expect(result).toEqual({
            directives: {
                regular: ['[title]'],
                deferCandidates: ['my-defer-cmp'],
            },
            pipes: {
                regular: ['uppercase'],
                deferCandidates: ['lowercase'],
            },
        });
    });
    it('should return empty directive list if no selectors are provided', () => {
        const template = `
        <div [title]="abc | uppercase"></div>
        @defer {
          <my-defer-cmp [label]="abc | lowercase" />
        } @placeholder {}
      `;
        const directiveSelectors = [];
        const result = (0, t2_binder_1.findMatchingDirectivesAndPipes)(template, directiveSelectors);
        expect(result).toEqual({
            directives: {
                regular: [],
                deferCandidates: [],
            },
            // Expect pipes to be present still.
            pipes: {
                regular: ['uppercase'],
                deferCandidates: ['lowercase'],
            },
        });
    });
    it('should return a directive and a pipe only once (either as a regular or deferrable)', () => {
        const template = `
        <my-defer-cmp [label]="abc | lowercase" [title]="abc | uppercase" />
        @defer {
          <my-defer-cmp [label]="abc | lowercase" [title]="abc | uppercase" />
        } @placeholder {}
      `;
        const directiveSelectors = ['[title]', 'my-defer-cmp', 'not-matching'];
        const result = (0, t2_binder_1.findMatchingDirectivesAndPipes)(template, directiveSelectors);
        expect(result).toEqual({
            directives: {
                regular: ['my-defer-cmp', '[title]'],
                // All directives/components are used eagerly.
                deferCandidates: [],
            },
            pipes: {
                regular: ['lowercase', 'uppercase'],
                // All pipes are used eagerly.
                deferCandidates: [],
            },
        });
    });
    it('should handle directives on elements with local refs', () => {
        const template = `
        <input [(ngModel)]="name" #ctrl="ngModel" required />
        @defer {
          <my-defer-cmp [label]="abc | lowercase" [title]="abc | uppercase" />
          <input [(ngModel)]="name" #ctrl="ngModel" required />
        } @placeholder {}
      `;
        const directiveSelectors = [
            '[ngModel]:not([formControlName]):not([formControl])',
            '[title]',
            'my-defer-cmp',
            'not-matching',
        ];
        const result = (0, t2_binder_1.findMatchingDirectivesAndPipes)(template, directiveSelectors);
        expect(result).toEqual({
            directives: {
                // `ngModel` is used both eagerly and in a defer block, thus it's located
                // in the "regular" (eager) bucket.
                regular: ['[ngModel]:not([formControlName]):not([formControl])'],
                deferCandidates: ['my-defer-cmp', '[title]'],
            },
            pipes: {
                regular: [],
                deferCandidates: ['lowercase', 'uppercase'],
            },
        });
    });
});
describe('t2 binding', () => {
    it('should bind a simple template', () => {
        const template = (0, template_1.parseTemplate)('<div *ngFor="let item of items">{{item.name}}</div>', '', {});
        const binder = new t2_binder_1.R3TargetBinder(new directive_matching_1.SelectorMatcher());
        const res = binder.bind({ template: template.nodes });
        const itemBinding = (0, util_1.findExpression)(template.nodes, '{{item.name}}')
            .expressions[0];
        const item = itemBinding.receiver;
        const itemTarget = res.getExpressionTarget(item);
        if (!(itemTarget instanceof a.Variable)) {
            return fail('Expected item to point to a Variable');
        }
        expect(itemTarget.value).toBe('$implicit');
        const itemTemplate = res.getDefinitionNodeOfSymbol(itemTarget);
        expect(itemTemplate).not.toBeNull();
        expect(res.getNestingLevel(itemTemplate)).toBe(1);
    });
    it('should match directives when binding a simple template', () => {
        const template = (0, template_1.parseTemplate)('<div *ngFor="let item of items">{{item.name}}</div>', '', {});
        const binder = new t2_binder_1.R3TargetBinder(makeSelectorMatcher());
        const res = binder.bind({ template: template.nodes });
        const tmpl = template.nodes[0];
        const directives = res.getDirectivesOfNode(tmpl);
        expect(directives).not.toBeNull();
        expect(directives.length).toBe(1);
        expect(directives[0].name).toBe('NgFor');
    });
    it('should match directives on namespaced elements', () => {
        const template = (0, template_1.parseTemplate)('<svg><text dir>SVG</text></svg>', '', {});
        const matcher = new directive_matching_1.SelectorMatcher();
        matcher.addSelectables(directive_matching_1.CssSelector.parse('text[dir]'), [
            {
                name: 'Dir',
                exportAs: null,
                inputs: new IdentityInputMapping([]),
                outputs: new IdentityInputMapping([]),
                isComponent: false,
                isStructural: false,
                selector: 'text[dir]',
                animationTriggerNames: null,
                ngContentSelectors: null,
                preserveWhitespaces: false,
            },
        ]);
        const binder = new t2_binder_1.R3TargetBinder(matcher);
        const res = binder.bind({ template: template.nodes });
        const svgNode = template.nodes[0];
        const textNode = svgNode.children[0];
        const directives = res.getDirectivesOfNode(textNode);
        expect(directives).not.toBeNull();
        expect(directives.length).toBe(1);
        expect(directives[0].name).toBe('Dir');
    });
    it('should not match directives intended for an element on a microsyntax template', () => {
        const template = (0, template_1.parseTemplate)('<div *ngFor="let item of items" dir></div>', '', {});
        const binder = new t2_binder_1.R3TargetBinder(makeSelectorMatcher());
        const res = binder.bind({ template: template.nodes });
        const tmpl = template.nodes[0];
        const tmplDirectives = res.getDirectivesOfNode(tmpl);
        expect(tmplDirectives).not.toBeNull();
        expect(tmplDirectives.length).toBe(1);
        expect(tmplDirectives[0].name).toBe('NgFor');
        const elDirectives = res.getDirectivesOfNode(tmpl.children[0]);
        expect(elDirectives).not.toBeNull();
        expect(elDirectives.length).toBe(1);
        expect(elDirectives[0].name).toBe('Dir');
    });
    it('should get @let declarations when resolving entities at the root', () => {
        const template = (0, template_1.parseTemplate)(`
        @let one = 1;
        @let two = 2;
        @let sum = one + two;
      `, '');
        const binder = new t2_binder_1.R3TargetBinder(new directive_matching_1.SelectorMatcher());
        const res = binder.bind({ template: template.nodes });
        const entities = Array.from(res.getEntitiesInScope(null));
        expect(entities.map((entity) => entity.name)).toEqual(['one', 'two', 'sum']);
    });
    it('should scope @let declarations to their current view', () => {
        const template = (0, template_1.parseTemplate)(`
        @let one = 1;

        @if (true) {
          @let two = 2;
        }

        @if (true) {
          @let three = 3;
        }
      `, '');
        const binder = new t2_binder_1.R3TargetBinder(new directive_matching_1.SelectorMatcher());
        const res = binder.bind({ template: template.nodes });
        const rootEntities = Array.from(res.getEntitiesInScope(null));
        const firstBranchEntities = Array.from(res.getEntitiesInScope(template.nodes[1].branches[0]));
        const secondBranchEntities = Array.from(res.getEntitiesInScope(template.nodes[2].branches[0]));
        expect(rootEntities.map((entity) => entity.name)).toEqual(['one']);
        expect(firstBranchEntities.map((entity) => entity.name)).toEqual(['one', 'two']);
        expect(secondBranchEntities.map((entity) => entity.name)).toEqual(['one', 'three']);
    });
    it('should resolve expressions to an @let declaration', () => {
        const template = (0, template_1.parseTemplate)(`
        @let value = 1;
        {{value}}
      `, '');
        const binder = new t2_binder_1.R3TargetBinder(new directive_matching_1.SelectorMatcher());
        const res = binder.bind({ template: template.nodes });
        const interpolationWrapper = template.nodes[1].value;
        const propertyRead = interpolationWrapper.ast.expressions[0];
        const target = res.getExpressionTarget(propertyRead);
        expect(target instanceof a.LetDeclaration).toBe(true);
        expect(target === null || target === void 0 ? void 0 : target.name).toBe('value');
    });
    it('should not resolve a `this` access to a template reference', () => {
        const template = (0, template_1.parseTemplate)(`
        <input #value>
        {{this.value}}
      `, '');
        const binder = new t2_binder_1.R3TargetBinder(new directive_matching_1.SelectorMatcher());
        const res = binder.bind({ template: template.nodes });
        const interpolationWrapper = template.nodes[1].value;
        const propertyRead = interpolationWrapper.ast.expressions[0];
        const target = res.getExpressionTarget(propertyRead);
        expect(target).toBe(null);
    });
    it('should not resolve a `this` access to a template variable', () => {
        const template = (0, template_1.parseTemplate)(`<ng-template let-value>{{this.value}}</ng-template>`, '');
        const binder = new t2_binder_1.R3TargetBinder(new directive_matching_1.SelectorMatcher());
        const res = binder.bind({ template: template.nodes });
        const templateNode = template.nodes[0];
        const interpolationWrapper = templateNode.children[0].value;
        const propertyRead = interpolationWrapper.ast.expressions[0];
        const target = res.getExpressionTarget(propertyRead);
        expect(target).toBe(null);
    });
    it('should not resolve a `this` access to a `@let` declaration', () => {
        const template = (0, template_1.parseTemplate)(`
        @let value = 1;
        {{this.value}}
      `, '');
        const binder = new t2_binder_1.R3TargetBinder(new directive_matching_1.SelectorMatcher());
        const res = binder.bind({ template: template.nodes });
        const interpolationWrapper = template.nodes[1].value;
        const propertyRead = interpolationWrapper.ast.expressions[0];
        const target = res.getExpressionTarget(propertyRead);
        expect(target).toBe(null);
    });
    it('should resolve the definition node of let declarations', () => {
        const template = (0, template_1.parseTemplate)(`
        @if (true) {
          @let one = 1;
        }

        @if (true) {
          @let two = 2;
        }
      `, '');
        const binder = new t2_binder_1.R3TargetBinder(new directive_matching_1.SelectorMatcher());
        const res = binder.bind({ template: template.nodes });
        const firstBranch = template.nodes[0].branches[0];
        const firstLet = firstBranch.children[0];
        const secondBranch = template.nodes[1].branches[0];
        const secondLet = secondBranch.children[0];
        expect(res.getDefinitionNodeOfSymbol(firstLet)).toBe(firstBranch);
        expect(res.getDefinitionNodeOfSymbol(secondLet)).toBe(secondBranch);
    });
    it('should resolve an element reference without a directive matcher', () => {
        const template = (0, template_1.parseTemplate)('<div #foo></div>', '');
        const binder = new t2_binder_1.R3TargetBinder(null);
        const res = binder.bind({ template: template.nodes });
        const node = template.nodes[0];
        const reference = node.references[0];
        const result = res.getReferenceTarget(reference);
        expect(result instanceof a.Element).toBe(true);
        expect(result.name).toBe('div');
    });
    describe('matching inputs to consuming directives', () => {
        it('should work for bound attributes', () => {
            const template = (0, template_1.parseTemplate)('<div hasInput [inputBinding]="myValue"></div>', '', {});
            const binder = new t2_binder_1.R3TargetBinder(makeSelectorMatcher());
            const res = binder.bind({ template: template.nodes });
            const el = template.nodes[0];
            const attr = el.inputs[0];
            const consumer = res.getConsumerOfBinding(attr);
            expect(consumer.name).toBe('HasInput');
        });
        it('should work for text attributes on elements', () => {
            const template = (0, template_1.parseTemplate)('<div hasInput inputBinding="text"></div>', '', {});
            const binder = new t2_binder_1.R3TargetBinder(makeSelectorMatcher());
            const res = binder.bind({ template: template.nodes });
            const el = template.nodes[0];
            const attr = el.attributes[1];
            const consumer = res.getConsumerOfBinding(attr);
            expect(consumer.name).toBe('HasInput');
        });
        it('should work for text attributes on templates', () => {
            const template = (0, template_1.parseTemplate)('<ng-template hasInput inputBinding="text"></ng-template>', '', {});
            const binder = new t2_binder_1.R3TargetBinder(makeSelectorMatcher());
            const res = binder.bind({ template: template.nodes });
            const el = template.nodes[0];
            const attr = el.attributes[1];
            const consumer = res.getConsumerOfBinding(attr);
            expect(consumer.name).toBe('HasInput');
        });
        it('should not match directives on attribute bindings with the same name as an input', () => {
            const template = (0, template_1.parseTemplate)('<ng-template [attr.sameSelectorAsInput]="123"></ng-template>', '', {});
            const binder = new t2_binder_1.R3TargetBinder(makeSelectorMatcher());
            const res = binder.bind({ template: template.nodes });
            const el = template.nodes[0];
            const input = el.inputs[0];
            const consumer = res.getConsumerOfBinding(input);
            expect(consumer).toEqual(el);
        });
        it('should bind to the encompassing node when no directive input is matched', () => {
            const template = (0, template_1.parseTemplate)('<span dir></span>', '', {});
            const binder = new t2_binder_1.R3TargetBinder(makeSelectorMatcher());
            const res = binder.bind({ template: template.nodes });
            const el = template.nodes[0];
            const attr = el.attributes[0];
            const consumer = res.getConsumerOfBinding(attr);
            expect(consumer).toEqual(el);
        });
    });
    describe('matching outputs to consuming directives', () => {
        it('should work for bound events', () => {
            const template = (0, template_1.parseTemplate)('<div hasOutput (outputBinding)="myHandler($event)"></div>', '', {});
            const binder = new t2_binder_1.R3TargetBinder(makeSelectorMatcher());
            const res = binder.bind({ template: template.nodes });
            const el = template.nodes[0];
            const attr = el.outputs[0];
            const consumer = res.getConsumerOfBinding(attr);
            expect(consumer.name).toBe('HasOutput');
        });
        it('should bind to the encompassing node when no directive output is matched', () => {
            const template = (0, template_1.parseTemplate)('<span dir (fakeOutput)="myHandler($event)"></span>', '', {});
            const binder = new t2_binder_1.R3TargetBinder(makeSelectorMatcher());
            const res = binder.bind({ template: template.nodes });
            const el = template.nodes[0];
            const attr = el.outputs[0];
            const consumer = res.getConsumerOfBinding(attr);
            expect(consumer).toEqual(el);
        });
    });
    describe('extracting defer blocks info', () => {
        it('should extract top-level defer blocks', () => {
            const template = (0, template_1.parseTemplate)(`
            @defer {<cmp-a />}
            @defer {<cmp-b />}
            <cmp-c />
          `, '');
            const binder = new t2_binder_1.R3TargetBinder(makeSelectorMatcher());
            const bound = binder.bind({ template: template.nodes });
            const deferBlocks = bound.getDeferBlocks();
            expect(deferBlocks.length).toBe(2);
        });
        it('should extract nested defer blocks and associated pipes', () => {
            const template = (0, template_1.parseTemplate)(`
            @defer {
              {{ name | pipeA }}
              @defer {
                {{ name | pipeB }}
              }
            } @loading {
              @defer {
                {{ name | pipeC }}
              }
              {{ name | loading }}
            } @placeholder {
              @defer {
                {{ name | pipeD }}
              }
              {{ name | placeholder }}
            } @error {
              @defer {
                {{ name | pipeE }}
              }
              {{ name | error }}
            }
            {{ name | pipeF }}
          `, '');
            const binder = new t2_binder_1.R3TargetBinder(makeSelectorMatcher());
            const bound = binder.bind({ template: template.nodes });
            const deferBlocks = bound.getDeferBlocks();
            expect(deferBlocks.length).toBe(5);
            // Record all pipes used within :placeholder, :loading and :error sub-blocks,
            // also record pipes used outside of any defer blocks.
            expect(bound.getEagerlyUsedPipes()).toEqual(['placeholder', 'loading', 'error', 'pipeF']);
            // Record *all* pipes from the template, including the ones from defer blocks.
            expect(bound.getUsedPipes()).toEqual([
                'pipeA',
                'pipeB',
                'pipeD',
                'placeholder',
                'pipeC',
                'loading',
                'pipeE',
                'error',
                'pipeF',
            ]);
        });
        it('should identify pipes used after a nested defer block as being lazy', () => {
            const template = (0, template_1.parseTemplate)(`
          @defer {
            {{ name | pipeA }}
            @defer {
              {{ name | pipeB }}
            }
            {{ name | pipeC }}
          }
          `, '');
            const binder = new t2_binder_1.R3TargetBinder(makeSelectorMatcher());
            const bound = binder.bind({ template: template.nodes });
            expect(bound.getUsedPipes()).toEqual(['pipeA', 'pipeB', 'pipeC']);
            expect(bound.getEagerlyUsedPipes()).toEqual([]);
        });
        it('should extract nested defer blocks and associated directives', () => {
            const template = (0, template_1.parseTemplate)(`
            @defer {
              <img *a />
              @defer {
                <img *b />
              }
            } @loading {
              @defer {
                <img *c />
              }
              <img *loading />
            } @placeholder {
              @defer {
                <img *d />
              }
              <img *placeholder />
            } @error {
              @defer {
                <img *e />
              }
              <img *error />
            }
            <img *f />
          `, '');
            const binder = new t2_binder_1.R3TargetBinder(makeSelectorMatcher());
            const bound = binder.bind({ template: template.nodes });
            const deferBlocks = bound.getDeferBlocks();
            expect(deferBlocks.length).toBe(5);
            // Record all directives used within placeholder, loading and error sub-blocks,
            // also record directives used outside of any defer blocks.
            const eagerDirs = bound.getEagerlyUsedDirectives();
            expect(eagerDirs.length).toBe(4);
            expect(eagerDirs.map((dir) => dir.name)).toEqual([
                'DirPlaceholder',
                'DirLoading',
                'DirError',
                'DirF',
            ]);
            // Record *all* directives from the template, including the ones from defer blocks.
            const allDirs = bound.getUsedDirectives();
            expect(allDirs.length).toBe(9);
            expect(allDirs.map((dir) => dir.name)).toEqual([
                'DirA',
                'DirB',
                'DirD',
                'DirPlaceholder',
                'DirC',
                'DirLoading',
                'DirE',
                'DirError',
                'DirF',
            ]);
        });
        it('should identify directives used after a nested defer block as being lazy', () => {
            const template = (0, template_1.parseTemplate)(`
          @defer {
            <img *a />
            @defer {<img *b />}
            <img *c />
          }
          `, '');
            const binder = new t2_binder_1.R3TargetBinder(makeSelectorMatcher());
            const bound = binder.bind({ template: template.nodes });
            const allDirs = bound.getUsedDirectives().map((dir) => dir.name);
            const eagerDirs = bound.getEagerlyUsedDirectives().map((dir) => dir.name);
            expect(allDirs).toEqual(['DirA', 'DirB', 'DirC']);
            expect(eagerDirs).toEqual([]);
        });
        it('should identify a trigger element that is a parent of the deferred block', () => {
            const template = (0, template_1.parseTemplate)(`
          <div #trigger>
            @defer (on viewport(trigger)) {}
          </div>
          `, '');
            const binder = new t2_binder_1.R3TargetBinder(makeSelectorMatcher());
            const bound = binder.bind({ template: template.nodes });
            const block = Array.from(bound.getDeferBlocks())[0];
            const triggerEl = bound.getDeferredTriggerTarget(block, block.triggers.viewport);
            expect(triggerEl === null || triggerEl === void 0 ? void 0 : triggerEl.name).toBe('div');
        });
        it('should identify a trigger element outside of the deferred block', () => {
            const template = (0, template_1.parseTemplate)(`
            <div>
              @defer (on viewport(trigger)) {}
            </div>

            <div>
              <div>
                <button #trigger></button>
              </div>
            </div>
          `, '');
            const binder = new t2_binder_1.R3TargetBinder(makeSelectorMatcher());
            const bound = binder.bind({ template: template.nodes });
            const block = Array.from(bound.getDeferBlocks())[0];
            const triggerEl = bound.getDeferredTriggerTarget(block, block.triggers.viewport);
            expect(triggerEl === null || triggerEl === void 0 ? void 0 : triggerEl.name).toBe('button');
        });
        it('should identify a trigger element in a parent embedded view', () => {
            const template = (0, template_1.parseTemplate)(`
            <div *ngFor="let item of items">
              <button #trigger></button>

              <div *ngFor="let child of item.children">
                <div *ngFor="let grandchild of child.children">
                  @defer (on viewport(trigger)) {}
                </div>
              </div>
            </div>
          `, '');
            const binder = new t2_binder_1.R3TargetBinder(makeSelectorMatcher());
            const bound = binder.bind({ template: template.nodes });
            const block = Array.from(bound.getDeferBlocks())[0];
            const triggerEl = bound.getDeferredTriggerTarget(block, block.triggers.viewport);
            expect(triggerEl === null || triggerEl === void 0 ? void 0 : triggerEl.name).toBe('button');
        });
        it('should identify a trigger element inside the placeholder', () => {
            const template = (0, template_1.parseTemplate)(`
            @defer (on viewport(trigger)) {
              main
            } @placeholder {
              <button #trigger></button>
            }
          `, '');
            const binder = new t2_binder_1.R3TargetBinder(makeSelectorMatcher());
            const bound = binder.bind({ template: template.nodes });
            const block = Array.from(bound.getDeferBlocks())[0];
            const triggerEl = bound.getDeferredTriggerTarget(block, block.triggers.viewport);
            expect(triggerEl === null || triggerEl === void 0 ? void 0 : triggerEl.name).toBe('button');
        });
        it('should not identify a trigger inside the main content block', () => {
            const template = (0, template_1.parseTemplate)(`
            @defer (on viewport(trigger)) {<button #trigger></button>}
          `, '');
            const binder = new t2_binder_1.R3TargetBinder(makeSelectorMatcher());
            const bound = binder.bind({ template: template.nodes });
            const block = Array.from(bound.getDeferBlocks())[0];
            const triggerEl = bound.getDeferredTriggerTarget(block, block.triggers.viewport);
            expect(triggerEl).toBeNull();
        });
        it('should identify a trigger element on a component', () => {
            const template = (0, template_1.parseTemplate)(`
            @defer (on viewport(trigger)) {}

            <comp #trigger/>
          `, '');
            const binder = new t2_binder_1.R3TargetBinder(makeSelectorMatcher());
            const bound = binder.bind({ template: template.nodes });
            const block = Array.from(bound.getDeferBlocks())[0];
            const triggerEl = bound.getDeferredTriggerTarget(block, block.triggers.viewport);
            expect(triggerEl === null || triggerEl === void 0 ? void 0 : triggerEl.name).toBe('comp');
        });
        it('should identify a trigger element on a directive', () => {
            const template = (0, template_1.parseTemplate)(`
            @defer (on viewport(trigger)) {}

            <button dir #trigger="dir"></button>
          `, '');
            const binder = new t2_binder_1.R3TargetBinder(makeSelectorMatcher());
            const bound = binder.bind({ template: template.nodes });
            const block = Array.from(bound.getDeferBlocks())[0];
            const triggerEl = bound.getDeferredTriggerTarget(block, block.triggers.viewport);
            expect(triggerEl === null || triggerEl === void 0 ? void 0 : triggerEl.name).toBe('button');
        });
        it('should identify an implicit trigger inside the placeholder block', () => {
            const template = (0, template_1.parseTemplate)(`
          <div #trigger>
            @defer (on viewport) {} @placeholder {<button></button>}
          </div>
          `, '');
            const binder = new t2_binder_1.R3TargetBinder(makeSelectorMatcher());
            const bound = binder.bind({ template: template.nodes });
            const block = Array.from(bound.getDeferBlocks())[0];
            const triggerEl = bound.getDeferredTriggerTarget(block, block.triggers.viewport);
            expect(triggerEl === null || triggerEl === void 0 ? void 0 : triggerEl.name).toBe('button');
        });
        it('should identify an implicit trigger inside the placeholder block with comments', () => {
            const template = (0, template_1.parseTemplate)(`
            @defer (on viewport) {
              main
            } @placeholder {
              <!-- before -->
              <button #trigger></button>
              <!-- after -->
            }
          `, '');
            const binder = new t2_binder_1.R3TargetBinder(makeSelectorMatcher());
            const bound = binder.bind({ template: template.nodes });
            const block = Array.from(bound.getDeferBlocks())[0];
            const triggerEl = bound.getDeferredTriggerTarget(block, block.triggers.viewport);
            expect(triggerEl === null || triggerEl === void 0 ? void 0 : triggerEl.name).toBe('button');
        });
        it('should not identify an implicit trigger if the placeholder has multiple root nodes', () => {
            const template = (0, template_1.parseTemplate)(`
            <div #trigger>
              @defer (on viewport) {} @placeholder {<button></button><div></div>}
            </div>
            `, '');
            const binder = new t2_binder_1.R3TargetBinder(makeSelectorMatcher());
            const bound = binder.bind({ template: template.nodes });
            const block = Array.from(bound.getDeferBlocks())[0];
            const triggerEl = bound.getDeferredTriggerTarget(block, block.triggers.viewport);
            expect(triggerEl).toBeNull();
        });
        it('should not identify an implicit trigger if there is no placeholder', () => {
            const template = (0, template_1.parseTemplate)(`
          <div #trigger>
            @defer (on viewport) {}
            <button></button>
          </div>
          `, '');
            const binder = new t2_binder_1.R3TargetBinder(makeSelectorMatcher());
            const bound = binder.bind({ template: template.nodes });
            const block = Array.from(bound.getDeferBlocks())[0];
            const triggerEl = bound.getDeferredTriggerTarget(block, block.triggers.viewport);
            expect(triggerEl).toBeNull();
        });
        it('should not identify an implicit trigger if the placeholder has a single root text node', () => {
            const template = (0, template_1.parseTemplate)(`
              <div #trigger>
                @defer (on viewport) {} @placeholder {hello}
              </div>
              `, '');
            const binder = new t2_binder_1.R3TargetBinder(makeSelectorMatcher());
            const bound = binder.bind({ template: template.nodes });
            const block = Array.from(bound.getDeferBlocks())[0];
            const triggerEl = bound.getDeferredTriggerTarget(block, block.triggers.viewport);
            expect(triggerEl).toBeNull();
        });
        it('should not identify a trigger inside a sibling embedded view', () => {
            const template = (0, template_1.parseTemplate)(`
            <div *ngIf="cond">
              <button #trigger></button>
            </div>

            @defer (on viewport(trigger)) {}
          `, '');
            const binder = new t2_binder_1.R3TargetBinder(makeSelectorMatcher());
            const bound = binder.bind({ template: template.nodes });
            const block = Array.from(bound.getDeferBlocks())[0];
            const triggerEl = bound.getDeferredTriggerTarget(block, block.triggers.viewport);
            expect(triggerEl).toBeNull();
        });
        it('should not identify a trigger element in an embedded view inside the placeholder', () => {
            const template = (0, template_1.parseTemplate)(`
            @defer (on viewport(trigger)) {
              main
            } @placeholder {
              <div *ngIf="cond"><button #trigger></button></div>
            }
          `, '');
            const binder = new t2_binder_1.R3TargetBinder(makeSelectorMatcher());
            const bound = binder.bind({ template: template.nodes });
            const block = Array.from(bound.getDeferBlocks())[0];
            const triggerEl = bound.getDeferredTriggerTarget(block, block.triggers.viewport);
            expect(triggerEl).toBeNull();
        });
        it('should not identify a trigger element inside the a deferred block within the placeholder', () => {
            const template = (0, template_1.parseTemplate)(`
                @defer (on viewport(trigger)) {
                  main
                } @placeholder {
                  @defer {
                    <button #trigger></button>
                  }
                }
              `, '');
            const binder = new t2_binder_1.R3TargetBinder(makeSelectorMatcher());
            const bound = binder.bind({ template: template.nodes });
            const block = Array.from(bound.getDeferBlocks())[0];
            const triggerEl = bound.getDeferredTriggerTarget(block, block.triggers.viewport);
            expect(triggerEl).toBeNull();
        });
        it('should not identify a trigger element on a template', () => {
            const template = (0, template_1.parseTemplate)(`
            @defer (on viewport(trigger)) {}

            <ng-template #trigger></ng-template>
          `, '');
            const binder = new t2_binder_1.R3TargetBinder(makeSelectorMatcher());
            const bound = binder.bind({ template: template.nodes });
            const block = Array.from(bound.getDeferBlocks())[0];
            const triggerEl = bound.getDeferredTriggerTarget(block, block.triggers.viewport);
            expect(triggerEl).toBeNull();
        });
    });
    describe('used pipes', () => {
        it('should record pipes used in interpolations', () => {
            const template = (0, template_1.parseTemplate)('{{value|date}}', '', {});
            const binder = new t2_binder_1.R3TargetBinder(makeSelectorMatcher());
            const res = binder.bind({ template: template.nodes });
            expect(res.getUsedPipes()).toEqual(['date']);
        });
        it('should record pipes used in bound attributes', () => {
            const template = (0, template_1.parseTemplate)('<person [age]="age|number"></person>', '', {});
            const binder = new t2_binder_1.R3TargetBinder(makeSelectorMatcher());
            const res = binder.bind({ template: template.nodes });
            expect(res.getUsedPipes()).toEqual(['number']);
        });
        it('should record pipes used in bound template attributes', () => {
            const template = (0, template_1.parseTemplate)('<ng-template [ngIf]="obs|async"></ng-template>', '', {});
            const binder = new t2_binder_1.R3TargetBinder(makeSelectorMatcher());
            const res = binder.bind({ template: template.nodes });
            expect(res.getUsedPipes()).toEqual(['async']);
        });
        it('should record pipes used in ICUs', () => {
            const template = (0, template_1.parseTemplate)(`<span i18n>{count|number, plural,
            =1 { {{value|date}} }
          }</span>`, '', {});
            const binder = new t2_binder_1.R3TargetBinder(makeSelectorMatcher());
            const res = binder.bind({ template: template.nodes });
            expect(res.getUsedPipes()).toEqual(['number', 'date']);
        });
    });
    describe('selectorless', () => {
        const options = { enableSelectorless: true };
        const baseMeta = {
            selector: null,
            inputs: new IdentityInputMapping([]),
            outputs: new IdentityInputMapping([]),
            exportAs: null,
            isStructural: false,
            ngContentSelectors: null,
            preserveWhitespaces: false,
            animationTriggerNames: null,
            isComponent: false,
        };
        function makeSelectorlessMatcher(directives) {
            const registry = new Map();
            const isSingleDirective = (value) => !value.root && !value.additionalDirectives;
            for (const dir of directives) {
                if (isSingleDirective(dir)) {
                    registry.set(dir.name, [dir]);
                }
                else {
                    registry.set(dir.root.name, [dir.root, ...dir.additionalDirectives]);
                }
            }
            return new directive_matching_1.SelectorlessMatcher(registry);
        }
        it('should resolve directives applied on a component node', () => {
            var _a;
            const template = (0, template_1.parseTemplate)('<MyComp @Dir @OtherDir/>', '', options);
            const binder = new t2_binder_1.R3TargetBinder(makeSelectorlessMatcher([
                {
                    root: Object.assign(Object.assign({}, baseMeta), { name: 'MyComp', isComponent: true }),
                    additionalDirectives: [
                        Object.assign(Object.assign({}, baseMeta), { name: 'MyHostDir' }),
                    ],
                },
                Object.assign(Object.assign({}, baseMeta), { name: 'Dir' }),
                Object.assign(Object.assign({}, baseMeta), { name: 'OtherDir' }),
            ]));
            const res = binder.bind({ template: template.nodes });
            const node = template.nodes[0];
            expect((_a = res.getDirectivesOfNode(node)) === null || _a === void 0 ? void 0 : _a.map((d) => d.name)).toEqual(['MyComp', 'MyHostDir']);
        });
        it('should resolve directives applied on a directive node', () => {
            var _a, _b;
            const template = (0, template_1.parseTemplate)('<MyComp @Dir @OtherDir/>', '', options);
            const binder = new t2_binder_1.R3TargetBinder(makeSelectorlessMatcher([
                Object.assign(Object.assign({}, baseMeta), { name: 'MyComp', isComponent: true }),
                {
                    root: Object.assign(Object.assign({}, baseMeta), { name: 'Dir' }),
                    additionalDirectives: [
                        Object.assign(Object.assign({}, baseMeta), { name: 'HostDir' }),
                    ],
                },
                Object.assign(Object.assign({}, baseMeta), { name: 'OtherDir' }),
            ]));
            const res = binder.bind({ template: template.nodes });
            const dirs = template.nodes[0].directives;
            expect((_a = res.getDirectivesOfNode(dirs[0])) === null || _a === void 0 ? void 0 : _a.map((d) => d.name)).toEqual(['Dir', 'HostDir']);
            expect((_b = res.getDirectivesOfNode(dirs[1])) === null || _b === void 0 ? void 0 : _b.map((d) => d.name)).toEqual(['OtherDir']);
        });
        it('should not apply selectorless directives on an element node', () => {
            const template = (0, template_1.parseTemplate)('<div @Dir @OtherDir></div>', '', options);
            const binder = new t2_binder_1.R3TargetBinder(makeSelectorlessMatcher([
                Object.assign(Object.assign({}, baseMeta), { name: 'Dir' }),
                Object.assign(Object.assign({}, baseMeta), { name: 'OtherDir' }),
            ]));
            const res = binder.bind({ template: template.nodes });
            const node = template.nodes[0];
            expect(res.getDirectivesOfNode(node)).toBe(null);
        });
        it('should resolve a reference on a component node to the component', () => {
            const template = (0, template_1.parseTemplate)('<MyComp #foo/>', '', options);
            const binder = new t2_binder_1.R3TargetBinder(makeSelectorlessMatcher([
                Object.assign(Object.assign({}, baseMeta), { name: 'MyComp', isComponent: true }),
            ]));
            const res = binder.bind({ template: template.nodes });
            const node = template.nodes[0];
            const reference = node.references[0];
            const result = res.getReferenceTarget(reference);
            expect(result.node).toBe(node);
            expect(result.directive.name).toBe('MyComp');
        });
        it('should resolve a reference on a directive node to the component', () => {
            const template = (0, template_1.parseTemplate)('<div @Dir(#foo)></div>', '', options);
            const binder = new t2_binder_1.R3TargetBinder(makeSelectorlessMatcher([
                Object.assign(Object.assign({}, baseMeta), { name: 'Dir' }),
            ]));
            const res = binder.bind({ template: template.nodes });
            const node = template.nodes[0];
            const directive = node.directives[0];
            const reference = directive.references[0];
            const result = res.getReferenceTarget(reference);
            expect(result.node).toBe(directive);
            expect(result.directive.name).toBe('Dir');
        });
        it('should resolve a reference on an element when using a selectorless matcher', () => {
            const template = (0, template_1.parseTemplate)('<div #foo></div>', '', options);
            const binder = new t2_binder_1.R3TargetBinder(makeSelectorlessMatcher([]));
            const res = binder.bind({ template: template.nodes });
            const node = template.nodes[0];
            const reference = node.references[0];
            const result = res.getReferenceTarget(reference);
            expect(result instanceof a.Element).toBe(true);
            expect(result.name).toBe('div');
        });
        it('should get consumer of component bindings', () => {
            var _a, _b, _c;
            const template = (0, template_1.parseTemplate)('<MyComp [input]="value" static="value" (output)="doStuff()" [doesNotExist]="value" [attr.input]="value"/>', '', options);
            const binder = new t2_binder_1.R3TargetBinder(makeSelectorlessMatcher([
                Object.assign(Object.assign({}, baseMeta), { name: 'MyComp', isComponent: true, inputs: new IdentityInputMapping(['input', 'static']), outputs: new IdentityInputMapping(['output']) }),
            ]));
            const res = binder.bind({ template: template.nodes });
            const node = template.nodes[0];
            const input = node.inputs[0];
            const staticAttr = node.attributes[0];
            const output = node.outputs[0];
            const doesNotExist = node.inputs[1];
            const attrBinding = node.attributes[1];
            expect((_a = res.getConsumerOfBinding(input)) === null || _a === void 0 ? void 0 : _a.name).toBe('MyComp');
            expect((_b = res.getConsumerOfBinding(staticAttr)) === null || _b === void 0 ? void 0 : _b.name).toBe('MyComp');
            expect((_c = res.getConsumerOfBinding(output)) === null || _c === void 0 ? void 0 : _c.name).toBe('MyComp');
            expect(res.getConsumerOfBinding(doesNotExist)).toBe(null);
            expect(res.getConsumerOfBinding(attrBinding)).toBe(null);
        });
        it('should get consumer of directive bindings', () => {
            var _a, _b, _c;
            const template = (0, template_1.parseTemplate)('<div @Dir([input]="value" static="value" (output)="doStuff()" [doesNotExist]="value")></div>', '', options);
            const binder = new t2_binder_1.R3TargetBinder(makeSelectorlessMatcher([
                Object.assign(Object.assign({}, baseMeta), { name: 'Dir', inputs: new IdentityInputMapping(['input', 'static']), outputs: new IdentityInputMapping(['output']) }),
            ]));
            const res = binder.bind({ template: template.nodes });
            const node = template.nodes[0];
            const directive = node.directives[0];
            const input = directive.inputs[0];
            const staticAttr = directive.attributes[0];
            const output = directive.outputs[0];
            const doesNotExist = directive.inputs[1];
            expect((_a = res.getConsumerOfBinding(input)) === null || _a === void 0 ? void 0 : _a.name).toBe('Dir');
            expect((_b = res.getConsumerOfBinding(staticAttr)) === null || _b === void 0 ? void 0 : _b.name).toBe('Dir');
            expect((_c = res.getConsumerOfBinding(output)) === null || _c === void 0 ? void 0 : _c.name).toBe('Dir');
            expect(res.getConsumerOfBinding(doesNotExist)).toBe(null);
        });
        it('should get eagerly-used selectorless directives', () => {
            const template = (0, template_1.parseTemplate)('<MyComp @Dir @OtherDir/>', '', options);
            const binder = new t2_binder_1.R3TargetBinder(makeSelectorlessMatcher([
                Object.assign(Object.assign({}, baseMeta), { name: 'MyComp', isComponent: true }),
                Object.assign(Object.assign({}, baseMeta), { name: 'Dir' }),
                Object.assign(Object.assign({}, baseMeta), { name: 'OtherDir' }),
                Object.assign(Object.assign({}, baseMeta), { name: 'UnusedDir' }),
            ]));
            const res = binder.bind({ template: template.nodes });
            expect(res.getUsedDirectives().map((dir) => dir.name)).toEqual(['MyComp', 'Dir', 'OtherDir']);
            expect(res.getEagerlyUsedDirectives().map((dir) => dir.name)).toEqual([
                'MyComp',
                'Dir',
                'OtherDir',
            ]);
        });
        it('should get deferred selectorless directives', () => {
            const template = (0, template_1.parseTemplate)('@defer {<MyComp @Dir @OtherDir/>}', '', options);
            const binder = new t2_binder_1.R3TargetBinder(makeSelectorlessMatcher([
                Object.assign(Object.assign({}, baseMeta), { name: 'MyComp', isComponent: true }),
                Object.assign(Object.assign({}, baseMeta), { name: 'Dir' }),
                Object.assign(Object.assign({}, baseMeta), { name: 'OtherDir' }),
            ]));
            const res = binder.bind({ template: template.nodes });
            expect(res.getUsedDirectives().map((dir) => dir.name)).toEqual(['MyComp', 'Dir', 'OtherDir']);
            expect(res.getEagerlyUsedDirectives().map((dir) => dir.name)).toEqual([]);
        });
        it('should get selectorless directives nested in other code', () => {
            const template = (0, template_1.parseTemplate)(`
        <section>
          @if (someCond) {
            <MyComp>
              <div>
                <h1>
                  <span @Dir></span>
                </h1>
              </div>
            </MyComp>
          }
        </section>
      `, '', options);
            const binder = new t2_binder_1.R3TargetBinder(makeSelectorlessMatcher([
                Object.assign(Object.assign({}, baseMeta), { name: 'MyComp', isComponent: true }),
                Object.assign(Object.assign({}, baseMeta), { name: 'Dir' }),
                Object.assign(Object.assign({}, baseMeta), { name: 'UnusedDir' }),
            ]));
            const res = binder.bind({ template: template.nodes });
            expect(res.getUsedDirectives().map((dir) => dir.name)).toEqual(['MyComp', 'Dir']);
            expect(res.getEagerlyUsedDirectives().map((dir) => dir.name)).toEqual(['MyComp', 'Dir']);
        });
        it('should check whether a referenced directive exists', () => {
            const template = (0, template_1.parseTemplate)('<MyComp @MissingDir/><MissingComp @Dir/>', '', options);
            const binder = new t2_binder_1.R3TargetBinder(makeSelectorlessMatcher([
                Object.assign(Object.assign({}, baseMeta), { name: 'MyComp', isComponent: true }),
                Object.assign(Object.assign({}, baseMeta), { name: 'Dir' }),
            ]));
            const res = binder.bind({ template: template.nodes });
            expect(res.referencedDirectiveExists('MyComp')).toBe(true);
            expect(res.referencedDirectiveExists('Dir')).toBe(true);
            expect(res.referencedDirectiveExists('MissingDir')).toBe(false);
            expect(res.referencedDirectiveExists('MissingComp')).toBe(false);
        });
    });
});
