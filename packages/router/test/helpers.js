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
exports.Logger = void 0;
exports.createActivatedRouteSnapshot = createActivatedRouteSnapshot;
exports.timeout = timeout;
const router_state_1 = require("../src/router_state");
class Logger {
    constructor() {
        this.logs = [];
    }
    add(thing) {
        this.logs.push(thing);
    }
    empty() {
        this.logs.length = 0;
    }
}
exports.Logger = Logger;
function createActivatedRouteSnapshot(args) {
    return new router_state_1.ActivatedRouteSnapshot(args.url || [], args.params || {}, args.queryParams || null, args.fragment || null, args.data || null, args.outlet || null, args.component, args.routeConfig || {}, args.resolve || {});
}
function timeout(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    });
}
