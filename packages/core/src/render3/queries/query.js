"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TQueryMetadata_ = void 0;
exports.loadQueryInternal = loadQueryInternal;
exports.createViewQuery = createViewQuery;
exports.createContentQuery = createContentQuery;
exports.createTQuery = createTQuery;
exports.saveContentQueryAndDirectiveIndex = saveContentQueryAndDirectiveIndex;
exports.getTQuery = getTQuery;
exports.getQueryResults = getQueryResults;
const element_ref_1 = require("../../linker/element_ref");
const query_list_1 = require("../../linker/query_list");
const template_ref_1 = require("../../linker/template_ref");
const view_container_ref_1 = require("../../linker/view_container_ref");
const assert_1 = require("../../util/assert");
const stringify_1 = require("../../util/stringify");
const assert_2 = require("../assert");
const di_1 = require("../di");
const container_1 = require("../interfaces/container");
const view_1 = require("../interfaces/view");
const node_assert_1 = require("../node_assert");
const state_1 = require("../state");
const view_utils_1 = require("../util/view_utils");
class LQuery_ {
    constructor(queryList) {
        this.queryList = queryList;
        this.matches = null;
    }
    clone() {
        return new LQuery_(this.queryList);
    }
    setDirty() {
        this.queryList.setDirty();
    }
}
class LQueries_ {
    constructor(queries = []) {
        this.queries = queries;
    }
    createEmbeddedView(tView) {
        const tQueries = tView.queries;
        if (tQueries !== null) {
            const noOfInheritedQueries = tView.contentQueries !== null ? tView.contentQueries[0] : tQueries.length;
            const viewLQueries = [];
            // An embedded view has queries propagated from a declaration view at the beginning of the
            // TQueries collection and up until a first content query declared in the embedded view. Only
            // propagated LQueries are created at this point (LQuery corresponding to declared content
            // queries will be instantiated from the content query instructions for each directive).
            for (let i = 0; i < noOfInheritedQueries; i++) {
                const tQuery = tQueries.getByIndex(i);
                const parentLQuery = this.queries[tQuery.indexInDeclarationView];
                viewLQueries.push(parentLQuery.clone());
            }
            return new LQueries_(viewLQueries);
        }
        return null;
    }
    insertView(tView) {
        this.dirtyQueriesWithMatches(tView);
    }
    detachView(tView) {
        this.dirtyQueriesWithMatches(tView);
    }
    finishViewCreation(tView) {
        this.dirtyQueriesWithMatches(tView);
    }
    dirtyQueriesWithMatches(tView) {
        for (let i = 0; i < this.queries.length; i++) {
            if (getTQuery(tView, i).matches !== null) {
                this.queries[i].setDirty();
            }
        }
    }
}
class TQueryMetadata_ {
    constructor(predicate, flags, read = null) {
        this.flags = flags;
        this.read = read;
        // Compiler might not be able to pre-optimize and split multiple selectors.
        if (typeof predicate === 'string') {
            this.predicate = splitQueryMultiSelectors(predicate);
        }
        else {
            this.predicate = predicate;
        }
    }
}
exports.TQueryMetadata_ = TQueryMetadata_;
class TQueries_ {
    constructor(queries = []) {
        this.queries = queries;
    }
    elementStart(tView, tNode) {
        ngDevMode &&
            (0, assert_2.assertFirstCreatePass)(tView, 'Queries should collect results on the first template pass only');
        for (let i = 0; i < this.queries.length; i++) {
            this.queries[i].elementStart(tView, tNode);
        }
    }
    elementEnd(tNode) {
        for (let i = 0; i < this.queries.length; i++) {
            this.queries[i].elementEnd(tNode);
        }
    }
    embeddedTView(tNode) {
        let queriesForTemplateRef = null;
        for (let i = 0; i < this.length; i++) {
            const childQueryIndex = queriesForTemplateRef !== null ? queriesForTemplateRef.length : 0;
            const tqueryClone = this.getByIndex(i).embeddedTView(tNode, childQueryIndex);
            if (tqueryClone) {
                tqueryClone.indexInDeclarationView = i;
                if (queriesForTemplateRef !== null) {
                    queriesForTemplateRef.push(tqueryClone);
                }
                else {
                    queriesForTemplateRef = [tqueryClone];
                }
            }
        }
        return queriesForTemplateRef !== null ? new TQueries_(queriesForTemplateRef) : null;
    }
    template(tView, tNode) {
        ngDevMode &&
            (0, assert_2.assertFirstCreatePass)(tView, 'Queries should collect results on the first template pass only');
        for (let i = 0; i < this.queries.length; i++) {
            this.queries[i].template(tView, tNode);
        }
    }
    getByIndex(index) {
        ngDevMode && (0, assert_1.assertIndexInRange)(this.queries, index);
        return this.queries[index];
    }
    get length() {
        return this.queries.length;
    }
    track(tquery) {
        this.queries.push(tquery);
    }
}
class TQuery_ {
    constructor(metadata, nodeIndex = -1) {
        this.metadata = metadata;
        this.matches = null;
        this.indexInDeclarationView = -1;
        this.crossesNgTemplate = false;
        /**
         * A flag indicating if a given query still applies to nodes it is crossing. We use this flag
         * (alongside with _declarationNodeIndex) to know when to stop applying content queries to
         * elements in a template.
         */
        this._appliesToNextNode = true;
        this._declarationNodeIndex = nodeIndex;
    }
    elementStart(tView, tNode) {
        if (this.isApplyingToNode(tNode)) {
            this.matchTNode(tView, tNode);
        }
    }
    elementEnd(tNode) {
        if (this._declarationNodeIndex === tNode.index) {
            this._appliesToNextNode = false;
        }
    }
    template(tView, tNode) {
        this.elementStart(tView, tNode);
    }
    embeddedTView(tNode, childQueryIndex) {
        if (this.isApplyingToNode(tNode)) {
            this.crossesNgTemplate = true;
            // A marker indicating a `<ng-template>` element (a placeholder for query results from
            // embedded views created based on this `<ng-template>`).
            this.addMatch(-tNode.index, childQueryIndex);
            return new TQuery_(this.metadata);
        }
        return null;
    }
    isApplyingToNode(tNode) {
        if (this._appliesToNextNode &&
            (this.metadata.flags & 1 /* QueryFlags.descendants */) !== 1 /* QueryFlags.descendants */) {
            const declarationNodeIdx = this._declarationNodeIndex;
            let parent = tNode.parent;
            // Determine if a given TNode is a "direct" child of a node on which a content query was
            // declared (only direct children of query's host node can match with the descendants: false
            // option). There are 3 main use-case / conditions to consider here:
            // - <needs-target><i #target></i></needs-target>: here <i #target> parent node is a query
            // host node;
            // - <needs-target><ng-template [ngIf]="true"><i #target></i></ng-template></needs-target>:
            // here <i #target> parent node is null;
            // - <needs-target><ng-container><i #target></i></ng-container></needs-target>: here we need
            // to go past `<ng-container>` to determine <i #target> parent node (but we shouldn't traverse
            // up past the query's host node!).
            while (parent !== null &&
                parent.type & 8 /* TNodeType.ElementContainer */ &&
                parent.index !== declarationNodeIdx) {
                parent = parent.parent;
            }
            return declarationNodeIdx === (parent !== null ? parent.index : -1);
        }
        return this._appliesToNextNode;
    }
    matchTNode(tView, tNode) {
        const predicate = this.metadata.predicate;
        if (Array.isArray(predicate)) {
            for (let i = 0; i < predicate.length; i++) {
                const name = predicate[i];
                this.matchTNodeWithReadOption(tView, tNode, getIdxOfMatchingSelector(tNode, name));
                // Also try matching the name to a provider since strings can be used as DI tokens too.
                this.matchTNodeWithReadOption(tView, tNode, (0, di_1.locateDirectiveOrProvider)(tNode, tView, name, false, false));
            }
        }
        else {
            if (predicate === template_ref_1.TemplateRef) {
                if (tNode.type & 4 /* TNodeType.Container */) {
                    this.matchTNodeWithReadOption(tView, tNode, -1);
                }
            }
            else {
                this.matchTNodeWithReadOption(tView, tNode, (0, di_1.locateDirectiveOrProvider)(tNode, tView, predicate, false, false));
            }
        }
    }
    matchTNodeWithReadOption(tView, tNode, nodeMatchIdx) {
        if (nodeMatchIdx !== null) {
            const read = this.metadata.read;
            if (read !== null) {
                if (read === element_ref_1.ElementRef ||
                    read === view_container_ref_1.ViewContainerRef ||
                    (read === template_ref_1.TemplateRef && tNode.type & 4 /* TNodeType.Container */)) {
                    this.addMatch(tNode.index, -2);
                }
                else {
                    const directiveOrProviderIdx = (0, di_1.locateDirectiveOrProvider)(tNode, tView, read, false, false);
                    if (directiveOrProviderIdx !== null) {
                        this.addMatch(tNode.index, directiveOrProviderIdx);
                    }
                }
            }
            else {
                this.addMatch(tNode.index, nodeMatchIdx);
            }
        }
    }
    addMatch(tNodeIdx, matchIdx) {
        if (this.matches === null) {
            this.matches = [tNodeIdx, matchIdx];
        }
        else {
            this.matches.push(tNodeIdx, matchIdx);
        }
    }
}
/**
 * Iterates over local names for a given node and returns directive index
 * (or -1 if a local name points to an element).
 *
 * @param tNode static data of a node to check
 * @param selector selector to match
 * @returns directive index, -1 or null if a selector didn't match any of the local names
 */
function getIdxOfMatchingSelector(tNode, selector) {
    const localNames = tNode.localNames;
    if (localNames !== null) {
        for (let i = 0; i < localNames.length; i += 2) {
            if (localNames[i] === selector) {
                return localNames[i + 1];
            }
        }
    }
    return null;
}
function createResultByTNodeType(tNode, currentView) {
    if (tNode.type & (3 /* TNodeType.AnyRNode */ | 8 /* TNodeType.ElementContainer */)) {
        return (0, element_ref_1.createElementRef)(tNode, currentView);
    }
    else if (tNode.type & 4 /* TNodeType.Container */) {
        return (0, template_ref_1.createTemplateRef)(tNode, currentView);
    }
    return null;
}
function createResultForNode(lView, tNode, matchingIdx, read) {
    if (matchingIdx === -1) {
        // if read token and / or strategy is not specified, detect it using appropriate tNode type
        return createResultByTNodeType(tNode, lView);
    }
    else if (matchingIdx === -2) {
        // read a special token from a node injector
        return createSpecialToken(lView, tNode, read);
    }
    else {
        // read a token
        return (0, di_1.getNodeInjectable)(lView, lView[view_1.TVIEW], matchingIdx, tNode);
    }
}
function createSpecialToken(lView, tNode, read) {
    if (read === element_ref_1.ElementRef) {
        return (0, element_ref_1.createElementRef)(tNode, lView);
    }
    else if (read === template_ref_1.TemplateRef) {
        return (0, template_ref_1.createTemplateRef)(tNode, lView);
    }
    else if (read === view_container_ref_1.ViewContainerRef) {
        ngDevMode && (0, node_assert_1.assertTNodeType)(tNode, 3 /* TNodeType.AnyRNode */ | 12 /* TNodeType.AnyContainer */);
        return (0, view_container_ref_1.createContainerRef)(tNode, lView);
    }
    else {
        ngDevMode &&
            (0, assert_1.throwError)(`Special token to read should be one of ElementRef, TemplateRef or ViewContainerRef but got ${(0, stringify_1.stringify)(read)}.`);
    }
}
/**
 * A helper function that creates query results for a given view. This function is meant to do the
 * processing once and only once for a given view instance (a set of results for a given view
 * doesn't change).
 */
function materializeViewResults(tView, lView, tQuery, queryIndex) {
    const lQuery = lView[view_1.QUERIES].queries[queryIndex];
    if (lQuery.matches === null) {
        const tViewData = tView.data;
        const tQueryMatches = tQuery.matches;
        const result = [];
        for (let i = 0; tQueryMatches !== null && i < tQueryMatches.length; i += 2) {
            const matchedNodeIdx = tQueryMatches[i];
            if (matchedNodeIdx < 0) {
                // we at the <ng-template> marker which might have results in views created based on this
                // <ng-template> - those results will be in separate views though, so here we just leave
                // null as a placeholder
                result.push(null);
            }
            else {
                ngDevMode && (0, assert_1.assertIndexInRange)(tViewData, matchedNodeIdx);
                const tNode = tViewData[matchedNodeIdx];
                result.push(createResultForNode(lView, tNode, tQueryMatches[i + 1], tQuery.metadata.read));
            }
        }
        lQuery.matches = result;
    }
    return lQuery.matches;
}
/**
 * A helper function that collects (already materialized) query results from a tree of views,
 * starting with a provided LView.
 */
function collectQueryResults(tView, lView, queryIndex, result) {
    const tQuery = tView.queries.getByIndex(queryIndex);
    const tQueryMatches = tQuery.matches;
    if (tQueryMatches !== null) {
        const lViewResults = materializeViewResults(tView, lView, tQuery, queryIndex);
        for (let i = 0; i < tQueryMatches.length; i += 2) {
            const tNodeIdx = tQueryMatches[i];
            if (tNodeIdx > 0) {
                result.push(lViewResults[i / 2]);
            }
            else {
                const childQueryIndex = tQueryMatches[i + 1];
                const declarationLContainer = lView[-tNodeIdx];
                ngDevMode && (0, assert_2.assertLContainer)(declarationLContainer);
                // collect matches for views inserted in this container
                for (let i = container_1.CONTAINER_HEADER_OFFSET; i < declarationLContainer.length; i++) {
                    const embeddedLView = declarationLContainer[i];
                    if (embeddedLView[view_1.DECLARATION_LCONTAINER] === embeddedLView[view_1.PARENT]) {
                        collectQueryResults(embeddedLView[view_1.TVIEW], embeddedLView, childQueryIndex, result);
                    }
                }
                // collect matches for views created from this declaration container and inserted into
                // different containers
                if (declarationLContainer[container_1.MOVED_VIEWS] !== null) {
                    const embeddedLViews = declarationLContainer[container_1.MOVED_VIEWS];
                    for (let i = 0; i < embeddedLViews.length; i++) {
                        const embeddedLView = embeddedLViews[i];
                        collectQueryResults(embeddedLView[view_1.TVIEW], embeddedLView, childQueryIndex, result);
                    }
                }
            }
        }
    }
    return result;
}
function loadQueryInternal(lView, queryIndex) {
    ngDevMode &&
        (0, assert_1.assertDefined)(lView[view_1.QUERIES], 'LQueries should be defined when trying to load a query');
    ngDevMode && (0, assert_1.assertIndexInRange)(lView[view_1.QUERIES].queries, queryIndex);
    return lView[view_1.QUERIES].queries[queryIndex].queryList;
}
/**
 * Creates a new instance of LQuery and returns its index in the collection of LQuery objects.
 *
 * @returns index in the collection of LQuery objects
 */
function createLQuery(tView, lView, flags) {
    var _a;
    const queryList = new query_list_1.QueryList((flags & 4 /* QueryFlags.emitDistinctChangesOnly */) === 4 /* QueryFlags.emitDistinctChangesOnly */);
    (0, view_utils_1.storeCleanupWithContext)(tView, lView, queryList, queryList.destroy);
    const lQueries = ((_a = lView[view_1.QUERIES]) !== null && _a !== void 0 ? _a : (lView[view_1.QUERIES] = new LQueries_())).queries;
    return lQueries.push(new LQuery_(queryList)) - 1;
}
function createViewQuery(predicate, flags, read) {
    ngDevMode && (0, assert_1.assertNumber)(flags, 'Expecting flags');
    const tView = (0, state_1.getTView)();
    if (tView.firstCreatePass) {
        createTQuery(tView, new TQueryMetadata_(predicate, flags, read), -1);
        if ((flags & 2 /* QueryFlags.isStatic */) === 2 /* QueryFlags.isStatic */) {
            tView.staticViewQueries = true;
        }
    }
    return createLQuery(tView, (0, state_1.getLView)(), flags);
}
function createContentQuery(directiveIndex, predicate, flags, read) {
    ngDevMode && (0, assert_1.assertNumber)(flags, 'Expecting flags');
    const tView = (0, state_1.getTView)();
    if (tView.firstCreatePass) {
        const tNode = (0, state_1.getCurrentTNode)();
        createTQuery(tView, new TQueryMetadata_(predicate, flags, read), tNode.index);
        saveContentQueryAndDirectiveIndex(tView, directiveIndex);
        if ((flags & 2 /* QueryFlags.isStatic */) === 2 /* QueryFlags.isStatic */) {
            tView.staticContentQueries = true;
        }
    }
    return createLQuery(tView, (0, state_1.getLView)(), flags);
}
/** Splits multiple selectors in the locator. */
function splitQueryMultiSelectors(locator) {
    return locator.split(',').map((s) => s.trim());
}
function createTQuery(tView, metadata, nodeIndex) {
    if (tView.queries === null)
        tView.queries = new TQueries_();
    tView.queries.track(new TQuery_(metadata, nodeIndex));
}
function saveContentQueryAndDirectiveIndex(tView, directiveIndex) {
    const tViewContentQueries = tView.contentQueries || (tView.contentQueries = []);
    const lastSavedDirectiveIndex = tViewContentQueries.length
        ? tViewContentQueries[tViewContentQueries.length - 1]
        : -1;
    if (directiveIndex !== lastSavedDirectiveIndex) {
        tViewContentQueries.push(tView.queries.length - 1, directiveIndex);
    }
}
function getTQuery(tView, index) {
    ngDevMode && (0, assert_1.assertDefined)(tView.queries, 'TQueries must be defined to retrieve a TQuery');
    return tView.queries.getByIndex(index);
}
/**
 * A helper function collecting results from all the views where a given query was active.
 * @param lView
 * @param queryIndex
 */
function getQueryResults(lView, queryIndex) {
    const tView = lView[view_1.TVIEW];
    const tQuery = getTQuery(tView, queryIndex);
    return tQuery.crossesNgTemplate
        ? collectQueryResults(tView, lView, queryIndex, [])
        : materializeViewResults(tView, lView, tQuery, queryIndex);
}
