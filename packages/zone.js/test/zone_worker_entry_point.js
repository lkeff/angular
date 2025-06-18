"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
// Setup tests for Zone without microtask support
System.config({ defaultJSExtensions: true });
System.import('../lib/browser/api-util').then(() => {
    System.import('../lib/browser/browser-legacy').then(() => {
        System.import('../lib/browser/browser').then(() => {
            Zone.current.fork({ name: 'webworker' }).run(() => {
                const websocket = new WebSocket('ws://localhost:8001');
                websocket.addEventListener('open', () => {
                    websocket.onmessage = () => {
                        if (self.Zone.current.name === 'webworker') {
                            self.postMessage('pass');
                        }
                        else {
                            self.postMessage('fail');
                        }
                        websocket.close();
                    };
                    websocket.send('text');
                });
            });
        }, (e) => self.postMessage(`error ${e.message}`));
    });
});
