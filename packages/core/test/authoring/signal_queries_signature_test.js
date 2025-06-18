"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignalQuerySignatureTest = void 0;
const core_1 = require("../../src/core");
class QueryType {
    constructor() {
        // a random field to brand the type
        this.query = true;
    }
}
class ReadType {
    constructor() {
        // a random field to brand the type
        this.read = true;
    }
}
const QUERY_TYPE_TOKEN = new core_1.InjectionToken('QueryTypeToken');
// A const to reference the Signal type import
const _import = undefined;
class SignalQuerySignatureTest {
    constructor() {
        // optional view child
        /** unknown */
        this.viewChildStringLocatorNoRead = (0, core_1.viewChild)('ref');
        /** ElementRef<HTMLAnchorElement> | undefined */
        this.viewChildStringLocatorNoReadElementRefTypeHint = (0, core_1.viewChild)('ref');
        // any due to https://github.com/angular/angular/issues/53894
        /** ElementRef<any> | undefined */
        this.viewChildStringLocatorWithElementRefRead = (0, core_1.viewChild)('ref', {
            read: (core_1.ElementRef),
        });
        /** ReadType | undefined */
        this.viewChildStringLocatorWithRead = (0, core_1.viewChild)('ref', { read: ReadType });
        /** QueryType | undefined */
        this.viewChildTypeLocatorNoRead = (0, core_1.viewChild)(QueryType);
        /** any */
        this.viewChildTypeLocatorForwardRefNoRead = (0, core_1.viewChild)((0, core_1.forwardRef)(() => QueryType));
        /** QueryType | undefined */
        this.viewChildInjectionTokenLocatorNoRead = (0, core_1.viewChild)(QUERY_TYPE_TOKEN);
        /** ReadType | undefined */
        this.viewChildTypeLocatorAndRead = (0, core_1.viewChild)(QueryType, { read: ReadType });
        // any due to https://github.com/angular/angular/issues/53894
        /** ElementRef<any> | undefined */
        this.viewChildTypeLocatorAndElementRefRead = (0, core_1.viewChild)(QueryType, {
            read: (core_1.ElementRef),
        });
        // required view child
        /** ElementRef<HTMLAnchorElement> */
        this.viewChildStringLocatorNoReadElementRefTypeHintReq = core_1.viewChild.required('ref');
        // any due to https://github.com/angular/angular/issues/53894
        /** ElementRef<any> */
        this.viewChildStringLocatorWithElementRefReadReq = core_1.viewChild.required('ref', {
            read: (core_1.ElementRef),
        });
        /** ReadType */
        this.viewChildStringLocatorWithReadReq = core_1.viewChild.required('ref', { read: ReadType });
        /** QueryType */
        this.viewChildTypeLocatorNoReadReq = core_1.viewChild.required(QueryType);
        /** ReadType */
        this.viewChildTypeLocatorAndReadReq = core_1.viewChild.required(QueryType, { read: ReadType });
        // any due to https://github.com/angular/angular/issues/53894
        /** ElementRef<any> */
        this.viewChildTypeLocatorAndElementRefReadReq = core_1.viewChild.required(QueryType, {
            read: (core_1.ElementRef),
        });
        // view children
        /** readonly unknown[] */
        this.viewChildrenStringLocatorNoRead = (0, core_1.viewChildren)('ref');
        /** readonly ElementRef<HTMLAnchorElement>[] */
        this.viewChildrenStringLocatorNoReadElementRefTypeHint = (0, core_1.viewChildren)('ref');
        /** readonly ReadType[] */
        this.viewChildrenStringLocatorWithTypeRead = (0, core_1.viewChildren)('ref', { read: ReadType });
        // any due to https://github.com/angular/angular/issues/53894
        /** readonly ElementRef<any>[] */
        this.viewChildrenStringLocatorWithElementRefRead = (0, core_1.viewChildren)('ref', {
            read: (core_1.ElementRef),
        });
        /** readonly QueryType[]*/
        this.viewChildrenTypeLocatorNoRead = (0, core_1.viewChildren)(QueryType);
        /** readonly any[] */
        this.viewChildrenTypeLocatorForwardRefNoRead = (0, core_1.viewChildren)((0, core_1.forwardRef)(() => QueryType));
        /** readonly QueryType[] */
        this.viewChildrenInjectionTokenLocatorNoRead = (0, core_1.viewChildren)(QUERY_TYPE_TOKEN);
        /** readonly ReadType[] */
        this.viewChildrenTypeLocatorAndRead = (0, core_1.viewChildren)(QueryType, { read: ReadType });
        // any due to https://github.com/angular/angular/issues/53894
        /** readonly ElementRef<any>[] */
        this.viewChildrenTypeLocatorAndElementRefRead = (0, core_1.viewChildren)(QueryType, {
            read: (core_1.ElementRef),
        });
        // optional content child
        /** unknown */
        this.contentChildStringLocatorNoRead = (0, core_1.contentChild)('ref');
        /** ElementRef<HTMLAnchorElement> | undefined */
        this.contentChildStringLocatorNoReadElementRefTypeHint = (0, core_1.contentChild)('ref');
        // any due to https://github.com/angular/angular/issues/53894
        /** ElementRef<any> | undefined */
        this.contentChildStringLocatorWithElementRefRead = (0, core_1.contentChild)('ref', {
            read: (core_1.ElementRef),
        });
        /** ReadType | undefined */
        this.contentChildStringLocatorWithRead = (0, core_1.contentChild)('ref', { read: ReadType });
        /** QueryType | undefined */
        this.contentChildTypeLocatorNoRead = (0, core_1.contentChild)(QueryType);
        /** any */
        this.contentChildTypeLocatorForwardRefNoRead = (0, core_1.contentChild)((0, core_1.forwardRef)(() => QueryType));
        /** QueryType | undefined */
        this.contentChildInjectionTokenLocatorNoRead = (0, core_1.contentChild)(QUERY_TYPE_TOKEN);
        /** ReadType | undefined */
        this.contentChildTypeLocatorAndRead = (0, core_1.contentChild)(QueryType, { read: ReadType });
        // any due to https://github.com/angular/angular/issues/53894
        /** ElementRef<any> | undefined */
        this.contentChildTypeLocatorAndElementRefRead = (0, core_1.contentChild)(QueryType, {
            read: (core_1.ElementRef),
        });
        // required content child
        /** ElementRef<HTMLAnchorElement> */
        this.contentChildStringLocatorNoReadElementRefTypeHintReq = core_1.contentChild.required('ref');
        // any due to https://github.com/angular/angular/issues/53894
        /** ElementRef<any> */
        this.contentChildStringLocatorWithElementRefReadReq = core_1.contentChild.required('ref', {
            read: (core_1.ElementRef),
        });
        /** ReadType */
        this.contentChildStringLocatorWithReadReq = core_1.contentChild.required('ref', { read: ReadType });
        /** QueryType */
        this.contentChildTypeLocatorNoReadReq = core_1.contentChild.required(QueryType);
        /** ReadType */
        this.contentChildTypeLocatorAndReadReq = core_1.contentChild.required(QueryType, { read: ReadType });
        // any due to https://github.com/angular/angular/issues/53894
        /** ElementRef<any> */
        this.contentChildTypeLocatorAndElementRefReadReq = core_1.contentChild.required(QueryType, {
            read: (core_1.ElementRef),
        });
        // view children
        /** readonly unknown[] */
        this.contentChildrenStringLocatorNoRead = (0, core_1.contentChildren)('ref');
        /** readonly ElementRef<HTMLAnchorElement>[] */
        this.contentChildrenStringLocatorNoReadElementRefTypeHint = (0, core_1.contentChildren)('ref');
        /** readonly ReadType[] */
        this.contentChildrenStringLocatorWithTypeRead = (0, core_1.contentChildren)('ref', { read: ReadType });
        // any due to https://github.com/angular/angular/issues/53894
        /** readonly ElementRef<any>[] */
        this.contentChildrenStringLocatorWithElementRefRead = (0, core_1.contentChildren)('ref', {
            read: (core_1.ElementRef),
        });
        /** readonly QueryType[]*/
        this.contentChildrenTypeLocatorNoRead = (0, core_1.contentChildren)(QueryType);
        /** readonly any[] */
        this.contentChildrenTypeLocatorForwardRefNoRead = (0, core_1.contentChildren)((0, core_1.forwardRef)(() => QueryType));
        /** readonly QueryType[] */
        this.contentChildrenInjectionTokenLocatorNoRead = (0, core_1.contentChildren)(QUERY_TYPE_TOKEN);
        /** readonly ReadType[] */
        this.contentChildrenTypeLocatorAndRead = (0, core_1.contentChildren)(QueryType, { read: ReadType });
        // any due to https://github.com/angular/angular/issues/53894
        /** readonly ElementRef<any>[] */
        this.contentChildrenTypeLocatorAndElementRefRead = (0, core_1.contentChildren)(QueryType, {
            read: (core_1.ElementRef),
        });
    }
}
exports.SignalQuerySignatureTest = SignalQuerySignatureTest;
