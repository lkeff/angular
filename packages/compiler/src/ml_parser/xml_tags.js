"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.XmlTagDefinition = void 0;
exports.getXmlTagDefinition = getXmlTagDefinition;
const tags_1 = require("./tags");
class XmlTagDefinition {
    constructor() {
        this.closedByParent = false;
        this.implicitNamespacePrefix = null;
        this.isVoid = false;
        this.ignoreFirstLf = false;
        this.canSelfClose = true;
        this.preventNamespaceInheritance = false;
    }
    requireExtraParent(currentParent) {
        return false;
    }
    isClosedByChild(name) {
        return false;
    }
    getContentType() {
        return tags_1.TagContentType.PARSABLE_DATA;
    }
}
exports.XmlTagDefinition = XmlTagDefinition;
const _TAG_DEFINITION = new XmlTagDefinition();
function getXmlTagDefinition(tagName) {
    return _TAG_DEFINITION;
}
