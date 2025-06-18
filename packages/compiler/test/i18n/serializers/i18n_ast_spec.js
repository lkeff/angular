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
const i18n = __importStar(require("../../../src/i18n/i18n_ast"));
const digest_1 = require("../../../src/i18n/digest");
const i18n_parser_spec_1 = require("../i18n_parser_spec");
describe('i18n AST', () => {
    describe('CloneVisitor', () => {
        it('should clone an AST', () => {
            const messages = (0, i18n_parser_spec_1._extractMessages)('<div i18n="m|d">b{count, plural, =0 {{sex, select, male {m}}}}a</div>');
            const nodes = messages[0].nodes;
            const text = (0, digest_1.serializeNodes)(nodes).join('');
            expect(text).toEqual('b<ph icu name="ICU">{count, plural, =0 {[{sex, select, male {[m]}}]}}</ph>a');
            const visitor = new i18n.CloneVisitor();
            const cloneNodes = nodes.map((n) => n.visit(visitor));
            expect((0, digest_1.serializeNodes)(nodes)).toEqual((0, digest_1.serializeNodes)(cloneNodes));
            nodes.forEach((n, i) => {
                expect(n).toEqual(cloneNodes[i]);
                expect(n).not.toBe(cloneNodes[i]);
            });
        });
    });
    describe('RecurseVisitor', () => {
        it('should visit all nodes', () => {
            const visitor = new RecurseVisitor();
            const container = new i18n.Container([
                new i18n.Text('', null),
                new i18n.Placeholder('', '', null),
                new i18n.IcuPlaceholder(null, '', null),
            ], null);
            const tag = new i18n.TagPlaceholder('', {}, '', '', [container], false, null, null, null);
            const icu = new i18n.Icu('', '', { tag }, null);
            icu.visit(visitor);
            expect(visitor.textCount).toEqual(1);
            expect(visitor.phCount).toEqual(1);
            expect(visitor.icuPhCount).toEqual(1);
        });
    });
});
class RecurseVisitor extends i18n.RecurseVisitor {
    constructor() {
        super(...arguments);
        this.textCount = 0;
        this.phCount = 0;
        this.icuPhCount = 0;
    }
    visitText(text, context) {
        this.textCount++;
    }
    visitPlaceholder(ph, context) {
        this.phCount++;
    }
    visitIcuPlaceholder(ph, context) {
        this.icuPhCount++;
    }
}
