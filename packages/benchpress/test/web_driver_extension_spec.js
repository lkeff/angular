"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
(function () {
    function createExtension(ids, caps) {
        return new Promise((res, rej) => {
            try {
                res(index_1.Injector.create({
                    providers: [
                        ids.map((id) => ({ provide: id, useValue: new MockExtension(id) })),
                        { provide: index_1.Options.CAPABILITIES, useValue: caps },
                        index_1.WebDriverExtension.provideFirstSupported(ids),
                    ],
                }).get(index_1.WebDriverExtension));
            }
            catch (e) {
                rej(e);
            }
        });
    }
    describe('WebDriverExtension.provideFirstSupported', () => {
        it('should provide the extension that matches the capabilities', (done) => {
            createExtension(['m1', 'm2', 'm3'], { 'browser': 'm2' }).then((m) => {
                expect(m.id).toEqual('m2');
                done();
            });
        });
        it('should throw if there is no match', (done) => {
            createExtension(['m1'], { 'browser': 'm2' }).catch((err) => {
                expect(err != null).toBe(true);
                done();
            });
        });
    });
})();
class MockExtension extends index_1.WebDriverExtension {
    constructor(id) {
        super();
        this.id = id;
    }
    supports(capabilities) {
        return capabilities['browser'] === this.id;
    }
}
