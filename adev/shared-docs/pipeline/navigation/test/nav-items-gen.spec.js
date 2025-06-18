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
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
    function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
    function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nav_items_gen_1 = require("../nav-items-gen");
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
const readlineInterfaceMock = {
    close: () => { },
    [Symbol.asyncIterator]() {
        return __asyncGenerator(this, arguments, function* _a() {
            yield yield __await('<!-- Comment -->');
            yield yield __await('Some random text');
            yield yield __await('## Heading');
            yield yield __await('Some text');
        });
    },
};
describe('generateNavItems', () => {
    it('should test the default case', () => __awaiter(void 0, void 0, void 0, function* () {
        spyOn(fs_1.default, 'createReadStream').and.returnValue({ destroy: () => null });
        spyOn(readline_1.default, 'createInterface').and.returnValue(readlineInterfaceMock);
        const strategy = {
            pathPrefix: 'page',
            contentPath: 'content/directory',
            labelGeneratorFn: (fileName, firstLine) => fileName + ' // ' + firstLine,
        };
        const navItems = yield (0, nav_items_gen_1.generateNavItems)(['directory/home.md', 'directory/about.md'], strategy);
        expect(navItems).toEqual([
            {
                label: 'home // Heading',
                path: 'page/home',
                contentPath: 'content/directory/home',
            },
            {
                label: 'about // Heading',
                path: 'page/about',
                contentPath: 'content/directory/about',
            },
        ]);
    }));
});
