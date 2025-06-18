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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimplePlaceholderMapper = exports.Serializer = void 0;
const i18n = __importStar(require("../i18n_ast"));
class Serializer {
    // Creates a name mapper, see `PlaceholderMapper`
    // Returning `null` means that no name mapping is used.
    createNameMapper(message) {
        return null;
    }
}
exports.Serializer = Serializer;
/**
 * A simple mapper that take a function to transform an internal name to a public name
 */
class SimplePlaceholderMapper extends i18n.RecurseVisitor {
    // create a mapping from the message
    constructor(message, mapName) {
        super();
        this.mapName = mapName;
        this.internalToPublic = {};
        this.publicToNextId = {};
        this.publicToInternal = {};
        message.nodes.forEach((node) => node.visit(this));
    }
    toPublicName(internalName) {
        return this.internalToPublic.hasOwnProperty(internalName)
            ? this.internalToPublic[internalName]
            : null;
    }
    toInternalName(publicName) {
        return this.publicToInternal.hasOwnProperty(publicName)
            ? this.publicToInternal[publicName]
            : null;
    }
    visitText(text, context) {
        return null;
    }
    visitTagPlaceholder(ph, context) {
        this.visitPlaceholderName(ph.startName);
        super.visitTagPlaceholder(ph, context);
        this.visitPlaceholderName(ph.closeName);
    }
    visitPlaceholder(ph, context) {
        this.visitPlaceholderName(ph.name);
    }
    visitBlockPlaceholder(ph, context) {
        this.visitPlaceholderName(ph.startName);
        super.visitBlockPlaceholder(ph, context);
        this.visitPlaceholderName(ph.closeName);
    }
    visitIcuPlaceholder(ph, context) {
        this.visitPlaceholderName(ph.name);
    }
    // XMB placeholders could only contains A-Z, 0-9 and _
    visitPlaceholderName(internalName) {
        if (!internalName || this.internalToPublic.hasOwnProperty(internalName)) {
            return;
        }
        let publicName = this.mapName(internalName);
        if (this.publicToInternal.hasOwnProperty(publicName)) {
            // Create a new XMB when it has already been used
            const nextId = this.publicToNextId[publicName];
            this.publicToNextId[publicName] = nextId + 1;
            publicName = `${publicName}_${nextId}`;
        }
        else {
            this.publicToNextId[publicName] = 1;
        }
        this.internalToPublic[internalName] = publicName;
        this.publicToInternal[publicName] = internalName;
    }
}
exports.SimplePlaceholderMapper = SimplePlaceholderMapper;
