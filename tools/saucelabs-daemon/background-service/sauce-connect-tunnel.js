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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openSauceConnectTunnel = openSauceConnectTunnel;
const node_child_process_1 = require("node:child_process");
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
/**
 * Establishes the Saucelabs connect tunnel.
 **/
function openSauceConnectTunnel(tunnelIdentifier, sauceConnect) {
    return __awaiter(this, void 0, void 0, function* () {
        console.debug('Starting sauce connect tunnel...');
        const tmpFolder = yield promises_1.default.mkdtemp('saucelabs-daemon-');
        yield new Promise((resolve, reject) => {
            // First we need to start the sauce connect tunnel
            const sauceConnectArgs = [
                '--readyfile',
                `${tmpFolder}/readyfile`,
                '--pidfile',
                `${tmpFolder}/pidfile`,
                '--tunnel-identifier',
                tunnelIdentifier || node_path_1.default.basename(tmpFolder),
            ];
            const sc = (0, node_child_process_1.spawn)(sauceConnect, sauceConnectArgs);
            sc.stdout.on('data', (data) => {
                if (data.includes('Sauce Connect is up, you may start your tests.')) {
                    resolve();
                }
            });
            sc.on('close', (code) => {
                reject(new Error(`sauce connect closed all stdio with code ${code}`));
            });
            sc.on('exit', (code) => {
                reject(new Error(`sauce connect exited with code ${code}`));
            });
        });
        console.debug('Starting sauce connect tunnel established');
    });
}
