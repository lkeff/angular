"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCookieConsent = void 0;
const setCookieConsent = (state) => {
    try {
        if (window.gtag) {
            const consentOptions = {
                ad_user_data: state,
                ad_personalization: state,
                ad_storage: state,
                analytics_storage: state,
            };
            if (state === 'denied') {
                window.gtag('consent', 'default', Object.assign(Object.assign({}, consentOptions), { wait_for_update: 500 }));
            }
            else if (state === 'granted') {
                window.gtag('consent', 'update', Object.assign({}, consentOptions));
            }
        }
    }
    catch (_a) {
        if (state === 'denied') {
            console.error('Unable to set default cookie consent.');
        }
        else if (state === 'granted') {
            console.error('Unable to grant cookie consent.');
        }
    }
};
exports.setCookieConsent = setCookieConsent;
