"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../src/core");
const testing_1 = require("../testing");
const document_1 = require("../src/render3/interfaces/document");
const transfer_state_1 = require("../src/transfer_state");
function removeScriptTag(doc, id) {
    var _a;
    (_a = doc.getElementById(id)) === null || _a === void 0 ? void 0 : _a.remove();
}
function addScriptTag(doc, appId, data) {
    const script = doc.createElement('script');
    const id = appId + '-state';
    script.id = id;
    script.setAttribute('type', 'application/json');
    script.textContent = typeof data === 'string' ? data : JSON.stringify(data);
    // Remove any stale script tags.
    removeScriptTag(doc, id);
    doc.body.appendChild(script);
}
describe('TransferState', () => {
    const APP_ID = 'test-app';
    let doc;
    const TEST_KEY = (0, transfer_state_1.makeStateKey)('test');
    const BOOLEAN_KEY = (0, transfer_state_1.makeStateKey)('boolean');
    const DELAYED_KEY = (0, transfer_state_1.makeStateKey)('delayed');
    beforeEach(() => {
        doc = (0, document_1.getDocument)();
        testing_1.TestBed.configureTestingModule({
            providers: [
                { provide: core_1.APP_ID, useValue: APP_ID },
                { provide: core_1.PLATFORM_ID, useValue: 'browser' },
            ],
        });
    });
    afterEach(() => {
        removeScriptTag(doc, APP_ID + '-state');
    });
    it('is initialized from script tag', () => {
        addScriptTag(doc, APP_ID, { test: 10 });
        const transferState = testing_1.TestBed.inject(transfer_state_1.TransferState);
        expect(transferState.get(TEST_KEY, 0)).toBe(10);
    });
    it('is initialized to empty state if script tag not found', () => {
        const transferState = testing_1.TestBed.inject(transfer_state_1.TransferState);
        expect(transferState.get(TEST_KEY, 0)).toBe(0);
    });
    it('supports adding new keys using set', () => {
        const transferState = testing_1.TestBed.inject(transfer_state_1.TransferState);
        transferState.set(TEST_KEY, 20);
        expect(transferState.get(TEST_KEY, 0)).toBe(20);
        expect(transferState.hasKey(TEST_KEY)).toBe(true);
    });
    it("supports setting and accessing value '0' via get", () => {
        const transferState = testing_1.TestBed.inject(transfer_state_1.TransferState);
        transferState.set(TEST_KEY, 0);
        expect(transferState.get(TEST_KEY, 20)).toBe(0);
        expect(transferState.hasKey(TEST_KEY)).toBe(true);
    });
    it("supports setting and accessing value 'false' via get", () => {
        const transferState = testing_1.TestBed.inject(transfer_state_1.TransferState);
        transferState.set(BOOLEAN_KEY, false);
        expect(transferState.get(BOOLEAN_KEY, true)).toBe(false);
        expect(transferState.hasKey(BOOLEAN_KEY)).toBe(true);
    });
    it("supports setting and accessing value 'null' via get", () => {
        const transferState = testing_1.TestBed.inject(transfer_state_1.TransferState);
        transferState.set(TEST_KEY, null);
        expect(transferState.get(TEST_KEY, 20)).toBe(null);
        expect(transferState.hasKey(TEST_KEY)).toBe(true);
    });
    it('supports removing keys', () => {
        const transferState = testing_1.TestBed.inject(transfer_state_1.TransferState);
        transferState.set(TEST_KEY, 20);
        transferState.remove(TEST_KEY);
        expect(transferState.get(TEST_KEY, 0)).toBe(0);
        expect(transferState.hasKey(TEST_KEY)).toBe(false);
    });
    it('supports serialization using toJson()', () => {
        const transferState = testing_1.TestBed.inject(transfer_state_1.TransferState);
        transferState.set(TEST_KEY, 20);
        expect(transferState.toJson()).toBe('{"test":20}');
    });
    it('calls onSerialize callbacks when calling toJson()', () => {
        const transferState = testing_1.TestBed.inject(transfer_state_1.TransferState);
        transferState.set(TEST_KEY, 20);
        let value = 'initial';
        transferState.onSerialize(DELAYED_KEY, () => value);
        value = 'changed';
        expect(transferState.toJson()).toBe('{"test":20,"delayed":"changed"}');
    });
    it('should provide an ability to detect whether the state is empty', () => {
        const transferState = testing_1.TestBed.inject(transfer_state_1.TransferState);
        // The state is empty initially.
        expect(transferState.isEmpty).toBeTrue();
        transferState.set(TEST_KEY, 20);
        expect(transferState.isEmpty).toBeFalse();
        transferState.remove(TEST_KEY);
        expect(transferState.isEmpty).toBeTrue();
    });
    it('should encode `<` to avoid breaking out of <script> tag in serialized output', () => {
        const transferState = testing_1.TestBed.inject(transfer_state_1.TransferState);
        // The state is empty initially.
        expect(transferState.isEmpty).toBeTrue();
        transferState.set(DELAYED_KEY, '</script><script>alert(\'Hello&\' + "World");');
        expect(transferState.toJson()).toBe(`{"delayed":"\\u003C/script>\\u003Cscript>alert('Hello&' + \\"World\\");"}`);
    });
    it('should decode `\\u003C` (<) when restoring stating', () => {
        const encodedState = `{"delayed":"\\u003C/script>\\u003Cscript>alert('Hello&' + \\"World\\");"}`;
        addScriptTag(doc, APP_ID, encodedState);
        const transferState = testing_1.TestBed.inject(transfer_state_1.TransferState);
        expect(transferState.toJson()).toBe(encodedState);
        expect(transferState.get(DELAYED_KEY, null)).toBe('</script><script>alert(\'Hello&\' + "World");');
    });
});
