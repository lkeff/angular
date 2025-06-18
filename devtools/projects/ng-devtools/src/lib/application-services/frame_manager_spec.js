"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const protocol_1 = require("protocol");
const frame_manager_1 = require("./frame_manager");
const testing_1 = require("@angular/core/testing");
describe('FrameManager', () => {
    let frameManager;
    let messageBus;
    let topicToCallback;
    function getFrameFromFrameManager(frameId) {
        return frameManager.frames().find((f) => f.id === frameId);
    }
    function frameConnected(frameId) {
        topicToCallback['frameConnected'](frameId);
    }
    function contentScriptConnected(frameId, name, url) {
        topicToCallback['contentScriptConnected'](frameId, name, url);
    }
    function contentScriptDisconnected(frameId) {
        topicToCallback['contentScriptDisconnected'](frameId);
    }
    const topLevelFrameId = 0;
    const otherFrameId = 1;
    const tabId = 123;
    beforeEach(() => {
        topicToCallback = {
            frameConnected: null,
            contentScriptConnected: null,
            contentScriptDisconnected: null,
        };
        messageBus = jasmine.createSpyObj('MessageBus', ['on', 'emit']);
        messageBus.on.and.callFake((topic, cb) => {
            topicToCallback[topic] = cb;
        });
        messageBus.emit.and.callFake((topic, args) => {
            if (topic === 'enableFrameConnection') {
                frameConnected(args[0]);
            }
        });
        const testModule = testing_1.TestBed.configureTestingModule({
            providers: [
                { provide: protocol_1.MessageBus, useValue: messageBus },
                { provide: frame_manager_1.FrameManager, useFactory: () => frame_manager_1.FrameManager.initialize(123) },
            ],
        });
        frameManager = testModule.inject(frame_manager_1.FrameManager);
    });
    it('should add frame when contentScriptConnected event is emitted', () => {
        contentScriptConnected(topLevelFrameId, 'name', 'http://localhost:4200/url');
        const frames = frameManager.frames();
        expect(frames.length).toBe(1);
        expect(frames[0].id).toBe(topLevelFrameId);
        expect(frames[0].name).toBe('name');
        expect(frames[0].url.toString()).toBe('http://localhost:4200/url');
    });
    it('should set the selected frame to the first frame when there is only one frame', () => {
        var _a;
        contentScriptConnected(topLevelFrameId, 'name', 'http://localhost:4200/url');
        expect((_a = frameManager.selectedFrame()) === null || _a === void 0 ? void 0 : _a.id).toBe(topLevelFrameId);
    });
    it('should set selected frame when frameConnected event is emitted', () => {
        var _a;
        contentScriptConnected(topLevelFrameId, 'name', 'http://localhost:4200/url');
        contentScriptConnected(otherFrameId, 'name2', 'http://localhost:4200/url2');
        frameConnected(otherFrameId);
        expect((_a = frameManager.selectedFrame()) === null || _a === void 0 ? void 0 : _a.id).toBe(otherFrameId);
    });
    it('should remove frame when contentScriptDisconnected event is emitted', () => {
        contentScriptConnected(topLevelFrameId, 'name', 'http://localhost:4200/url');
        contentScriptConnected(otherFrameId, 'name2', 'http://localhost:4200/url2');
        expect(frameManager.frames().length).toBe(2);
        contentScriptDisconnected(otherFrameId);
        expect(frameManager.frames().length).toBe(1);
        expect(frameManager.frames()[0].id).toBe(topLevelFrameId);
        const errorSpy = spyOn(console, 'error');
        contentScriptDisconnected(topLevelFrameId);
        expect(frameManager.frames().length).toBe(0);
        expect(errorSpy).toHaveBeenCalledWith('Angular DevTools is not connected to any frames.');
    });
    it('should set selected frame to top level frame when contentScriptDisconnected event is emitted for selected frame', () => {
        var _a, _b;
        contentScriptConnected(topLevelFrameId, 'name', 'http://localhost:4200/url');
        contentScriptConnected(otherFrameId, 'name2', 'http://localhost:4200/url2');
        frameConnected(otherFrameId);
        expect((_a = frameManager.selectedFrame()) === null || _a === void 0 ? void 0 : _a.id).toBe(otherFrameId);
        contentScriptDisconnected(otherFrameId);
        expect((_b = frameManager.selectedFrame()) === null || _b === void 0 ? void 0 : _b.id).toBe(topLevelFrameId);
    });
    it('should not set selected frame to top level frame when contentScriptDisconnected event is emitted for non selected frame', () => {
        var _a, _b;
        contentScriptConnected(topLevelFrameId, 'name', 'http://localhost:4200/url');
        contentScriptConnected(otherFrameId, 'name2', 'http://localhost:4200/url2');
        frameConnected(topLevelFrameId);
        expect((_a = frameManager.selectedFrame()) === null || _a === void 0 ? void 0 : _a.id).toBe(topLevelFrameId);
        contentScriptDisconnected(otherFrameId);
        expect((_b = frameManager.selectedFrame()) === null || _b === void 0 ? void 0 : _b.id).toBe(topLevelFrameId);
    });
    it('should not set selected frame to top level frame when contentScriptDisconnected event is emitted for non existing frame', () => {
        var _a, _b;
        const nonExistingFrameId = 3;
        contentScriptConnected(topLevelFrameId, 'name', 'http://localhost:4200/url');
        contentScriptConnected(otherFrameId, 'name2', 'http://localhost:4200/url2');
        frameConnected(otherFrameId);
        expect((_a = frameManager.selectedFrame()) === null || _a === void 0 ? void 0 : _a.id).toBe(otherFrameId);
        contentScriptDisconnected(nonExistingFrameId);
        expect((_b = frameManager.selectedFrame()) === null || _b === void 0 ? void 0 : _b.id).toBe(otherFrameId);
    });
    it('isSelectedFrame should return true when frame matches selected frame', () => {
        contentScriptConnected(topLevelFrameId, 'name', 'http://localhost:4200/url');
        contentScriptConnected(otherFrameId, 'name2', 'http://localhost:4200/url2');
        const topLevelFrame = getFrameFromFrameManager(topLevelFrameId);
        const otherFrame = getFrameFromFrameManager(otherFrameId);
        expect(topLevelFrame).toBeDefined();
        expect(otherFrame).toBeDefined();
        expect(frameManager.isSelectedFrame(topLevelFrame)).toBe(true);
    });
    it('isSelectedFrame should return false when frame does not match selected frame', () => {
        contentScriptConnected(topLevelFrameId, 'name', 'http://localhost:4200/url');
        contentScriptConnected(otherFrameId, 'name2', 'http://localhost:4200/url2');
        const topLevelFrame = getFrameFromFrameManager(topLevelFrameId);
        const otherFrame = getFrameFromFrameManager(otherFrameId);
        expect(topLevelFrame).toBeDefined();
        expect(otherFrame).toBeDefined();
        expect(frameManager.isSelectedFrame(otherFrame)).toBe(false);
    });
    it('inspectFrame should emit enableFrameConnection message', () => {
        contentScriptConnected(topLevelFrameId, 'name', 'http://localhost:4200/url');
        const topLevelFrame = getFrameFromFrameManager(topLevelFrameId);
        expect(topLevelFrame).toBeDefined();
        frameManager.inspectFrame(topLevelFrame);
        expect(messageBus.emit).toHaveBeenCalledWith('enableFrameConnection', [topLevelFrameId, tabId]);
    });
    it('inspectFrame should set selected frame', () => {
        var _a;
        contentScriptConnected(topLevelFrameId, 'name', 'http://localhost:4200/url');
        contentScriptConnected(otherFrameId, 'name2', 'https://angular.dev/');
        const topLevelFrame = getFrameFromFrameManager(topLevelFrameId);
        expect(topLevelFrame).toBeDefined();
        frameManager.inspectFrame(topLevelFrame);
        expect((_a = frameManager.selectedFrame()) === null || _a === void 0 ? void 0 : _a.id).toBe(topLevelFrameId);
    });
    it('frameHasUniqueUrl should return false when a two frames have the same url', () => {
        var _a;
        contentScriptConnected(topLevelFrameId, 'name', 'https://angular.dev/');
        contentScriptConnected(otherFrameId, 'name2', 'https://angular.dev/');
        expect((_a = frameManager.selectedFrame()) === null || _a === void 0 ? void 0 : _a.url.toString()).toBe('https://angular.dev/');
        expect(frameManager.activeFrameHasUniqueUrl()).toBe(false);
    });
    it('frameHasUniqueUrl should return true when only one frame has a given url', () => {
        var _a;
        contentScriptConnected(topLevelFrameId, 'name', 'https://angular.dev/');
        contentScriptConnected(otherFrameId, 'name', 'https://angular.dev/overview');
        expect((_a = frameManager.selectedFrame()) === null || _a === void 0 ? void 0 : _a.url.toString()).toBe('https://angular.dev/');
        expect(frameManager.activeFrameHasUniqueUrl()).toBe(true);
    });
    it('frameHasUniqueUrl should not consider url fragments as part of the url comparison', () => {
        var _a;
        contentScriptConnected(topLevelFrameId, 'name', 'https://angular.dev/guide/components');
        contentScriptConnected(otherFrameId, 'name', 'https://angular.dev/guide/components#using-components');
        expect((_a = frameManager.selectedFrame()) === null || _a === void 0 ? void 0 : _a.url.toString()).toBe('https://angular.dev/guide/components');
        expect(frameManager.activeFrameHasUniqueUrl()).toBe(false);
    });
    it('frameHasUniqueUrl should return false when frame is null', () => {
        expect(frameManager.activeFrameHasUniqueUrl()).toBe(false);
    });
});
