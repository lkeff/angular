"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.NodeFilesystem = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const sha1_1 = require("./sha1");
class NodeFilesystem {
    constructor(base) {
        this.base = base;
    }
    list(_path) {
        return __awaiter(this, void 0, void 0, function* () {
            const dir = this.canonical(_path);
            const entries = fs
                .readdirSync(dir)
                .map((entry) => ({ entry, stats: fs.statSync(path.join(dir, entry)) }));
            const files = entries
                .filter((entry) => !entry.stats.isDirectory())
                .map((entry) => path.posix.join(_path, entry.entry));
            return entries
                .filter((entry) => entry.stats.isDirectory())
                .map((entry) => path.posix.join(_path, entry.entry))
                .reduce((list, subdir) => __awaiter(this, void 0, void 0, function* () { return (yield list).concat(yield this.list(subdir)); }), Promise.resolve(files));
        });
    }
    read(_path) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = this.canonical(_path);
            return fs.readFileSync(file).toString();
        });
    }
    hash(_path) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = this.canonical(_path);
            const contents = fs.readFileSync(file);
            return (0, sha1_1.sha1Binary)(contents);
        });
    }
    write(_path, contents) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = this.canonical(_path);
            fs.writeFileSync(file, contents);
        });
    }
    canonical(_path) {
        return path.posix.join(this.base, _path);
    }
}
exports.NodeFilesystem = NodeFilesystem;
