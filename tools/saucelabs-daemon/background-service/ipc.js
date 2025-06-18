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
exports.IpcServer = void 0;
const net_1 = require("net");
const ipc_defaults_1 = require("../ipc-defaults");
const ipc_messages_1 = require("../ipc-messages");
let nextSocketId = 0;
/**
 * The IPC server for the Saucelabs background service. This server
 * listens on the port IPC_PORT for `start-test` and `end-test` messages
 * from karma tests. These messages are handled and requests are passed
 * forward to the service SaucelabsDaemon class.
 */
class IpcServer {
    constructor(_service) {
        this._service = _service;
        this._connections = new Map();
        this._server = (0, net_1.createServer)(this._connectionHandler.bind(this));
        this._server.listen(ipc_defaults_1.IPC_PORT, () => console.info(`Daemon IPC server listening (pid ${process.pid}).`));
    }
    _connectionHandler(socket) {
        const socketId = nextSocketId++;
        this._connections.set(socketId, socket);
        socket.on('data', (b) => {
            this._processMessage(socket, socketId, JSON.parse(b.toString())).catch((err) => {
                console.error(err);
                this._sendInternalError(socket, err.toString());
            });
        });
    }
    _processMessage(socket, socketId, message) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (message.type) {
                case 'start-test':
                    console.debug(`Requesting test browser: SID#${socketId}: ${message.testDescription}`);
                    const started = yield this._service.startTest({
                        testId: socketId,
                        pageUrl: message.url,
                        requestedBrowserId: message.browserId,
                    });
                    if (!started) {
                        console.debug('  > Browser not available.');
                        this._sendUnavailableBrowserMessage(socket);
                    }
                    else {
                        console.debug('  > Browser available. Test can start.');
                    }
                    break;
                case 'end-test':
                    console.debug(`Ending tests for SID#${socketId}`);
                    this._service.endTest(socketId);
                    break;
                default:
                    throw new Error(`Unsupported msg type: ${message.type}`);
            }
        });
    }
    _sendUnavailableBrowserMessage(socket) {
        socket.write(JSON.stringify(new ipc_messages_1.NoAvailableBrowserMessage()));
    }
    _sendInternalError(socket, msg) {
        socket.write(JSON.stringify(new ipc_messages_1.InternalErrorMessage(msg)));
    }
}
exports.IpcServer = IpcServer;
