"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomErrorHandler = void 0;
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const snack_bar_1 = require("@angular/material/snack-bar");
const analytics_service_1 = require("../analytics/analytics.service");
const error_snack_bar_1 = require("./error-snack-bar");
class CustomErrorHandler {
    constructor() {
        this.snackBar = (0, core_1.inject)(snack_bar_1.MatSnackBar);
        this.document = (0, core_1.inject)(common_1.DOCUMENT);
        this.isServer = (0, common_1.isPlatformServer)((0, core_1.inject)(core_1.PLATFORM_ID));
        this.analyticsService = (0, core_1.inject)(analytics_service_1.AnalyticsService);
    }
    get isOnline() {
        var _a;
        if (this.isServer)
            return false;
        const win = this.document.defaultView;
        return (_a = win === null || win === void 0 ? void 0 : win.navigator.onLine) !== null && _a !== void 0 ? _a : true;
    }
    handleError(error) {
        if (typeof error.message === 'string') {
            // Just looking at the first line of the error message (ignoring the call stack part),
            // which should contain a pattern that we are looking for.
            const firstLine = error.message.split('\n')[0];
            if (this.isOnline && (firstLine === null || firstLine === void 0 ? void 0 : firstLine.match(/chunk-(.*?)\.js/))) {
                // Trying to load a chunk that doesn't exist anymore
                // Users should reload the app.
                this.openErrorSnackBar();
                this.analyticsService.reportError('Chunk loading error');
            }
        }
        // We still want to log every error
        console.error(error);
    }
    openErrorSnackBar() {
        this.snackBar
            .openFromComponent(error_snack_bar_1.ErrorSnackBar, {
            panelClass: 'docs-invert-mode',
            data: {
                message: `Our docs have been updated, reload the page to see the latest.`,
                actionText: `Reload`,
            },
        })
            .onAction()
            .subscribe(() => {
            this.document.location.reload();
        });
    }
}
exports.CustomErrorHandler = CustomErrorHandler;
