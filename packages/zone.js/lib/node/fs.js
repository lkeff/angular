"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchFs = patchFs;
const utils_1 = require("../common/utils");
function patchFs(Zone) {
    Zone.__load_patch('fs', (global, Zone, api) => {
        var _a;
        let fs;
        try {
            fs = require('fs');
        }
        catch (err) { }
        if (!fs)
            return;
        // watch, watchFile, unwatchFile has been patched
        // because EventEmitter has been patched
        const TO_PATCH_MACROTASK_METHODS = [
            'access',
            'appendFile',
            'chmod',
            'chown',
            'close',
            'exists',
            'fchmod',
            'fchown',
            'fdatasync',
            'fstat',
            'fsync',
            'ftruncate',
            'futimes',
            'lchmod',
            'lchown',
            'lutimes',
            'link',
            'lstat',
            'mkdir',
            'mkdtemp',
            'open',
            'opendir',
            'read',
            'readdir',
            'readFile',
            'readlink',
            'realpath',
            'rename',
            'rmdir',
            'stat',
            'symlink',
            'truncate',
            'unlink',
            'utimes',
            'write',
            'writeFile',
            'writev',
        ];
        TO_PATCH_MACROTASK_METHODS.filter((name) => !!fs[name] && typeof fs[name] === 'function').forEach((name) => {
            (0, utils_1.patchMacroTask)(fs, name, (self, args) => {
                return {
                    name: 'fs.' + name,
                    args: args,
                    cbIdx: args.length > 0 ? args.length - 1 : -1,
                    target: self,
                };
            });
        });
        const realpathOriginalDelegate = (_a = fs.realpath) === null || _a === void 0 ? void 0 : _a[api.symbol('OriginalDelegate')];
        // This is the only specific method that should be additionally patched because the previous
        // `patchMacroTask` has overridden the `realpath` function and its `native` property.
        if (realpathOriginalDelegate === null || realpathOriginalDelegate === void 0 ? void 0 : realpathOriginalDelegate.native) {
            fs.realpath.native = realpathOriginalDelegate.native;
            (0, utils_1.patchMacroTask)(fs.realpath, 'native', (self, args) => ({
                args,
                target: self,
                cbIdx: args.length > 0 ? args.length - 1 : -1,
                name: 'fs.realpath.native',
            }));
        }
    });
}
