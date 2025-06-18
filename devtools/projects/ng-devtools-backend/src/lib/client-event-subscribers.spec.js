"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const client_event_subscribers_1 = require("./client-event-subscribers");
const shared_utils_1 = require("shared-utils");
const hooks_1 = require("./hooks/hooks");
const rxjs_1 = require("rxjs");
describe('ClientEventSubscriber', () => {
    let messageBusMock;
    let appNode = null;
    beforeEach(() => {
        // mock isAngular et al
        appNode = mockAngular();
        messageBusMock = jasmine.createSpyObj('messageBus', [
            'on',
            'once',
            'emit',
            'destroy',
        ]);
    });
    afterEach(() => {
        // clearing the dom after each test
        if (appNode) {
            document.body.removeChild(appNode);
            appNode = null;
        }
    });
    it('is it Angular ready (testing purposed)', () => {
        expect((0, shared_utils_1.appIsAngular)()).withContext('isAng').toBe(true);
        expect((0, shared_utils_1.appIsSupportedAngularVersion)()).withContext('appIsSupportedAngularVersion').toBe(true);
        expect((0, shared_utils_1.appIsAngularIvy)()).withContext('appIsAngularIvy').toBe(true);
    });
    it('should setup inspector', () => {
        (0, client_event_subscribers_1.subscribeToClientEvents)(messageBusMock, { directiveForestHooks: MockDirectiveForestHooks });
        expect(messageBusMock.on).toHaveBeenCalledWith('inspectorStart', jasmine.any(Function));
        expect(messageBusMock.on).toHaveBeenCalledWith('inspectorEnd', jasmine.any(Function));
        expect(messageBusMock.on).toHaveBeenCalledWith('createHighlightOverlay', jasmine.any(Function));
        expect(messageBusMock.on).toHaveBeenCalledWith('removeHighlightOverlay', jasmine.any(Function));
        expect(messageBusMock.on).toHaveBeenCalledWith('createHydrationOverlay', jasmine.any(Function));
        expect(messageBusMock.on).toHaveBeenCalledWith('removeHydrationOverlay', jasmine.any(Function));
    });
});
function mockAngular() {
    const appNode = document.createElement('app');
    appNode.setAttribute('ng-version', '17.0.0');
    appNode.__ngContext__ = true;
    document.body.appendChild(appNode);
    window = {
        ng: {
            getComponent: () => { },
        },
    };
    return appNode;
}
class MockDirectiveForestHooks extends hooks_1.DirectiveForestHooks {
    constructor() {
        super(...arguments);
        this.profiler = {
            subscribe: () => { },
            changeDetection$: (0, rxjs_1.of)(),
        };
        this.initialize = () => { };
    }
}
