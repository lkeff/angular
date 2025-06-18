"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
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
exports.scheduleDelayedTrigger = scheduleDelayedTrigger;
exports.scheduleDelayedPrefetching = scheduleDelayedPrefetching;
exports.scheduleDelayedHydrating = scheduleDelayedHydrating;
exports.triggerPrefetching = triggerPrefetching;
exports.triggerResourceLoading = triggerResourceLoading;
exports.triggerDeferBlock = triggerDeferBlock;
exports.triggerHydrationFromBlockName = triggerHydrationFromBlockName;
exports.triggerHydrationForBlockQueue = triggerHydrationForBlockQueue;
exports.deferBlockHasErrored = deferBlockHasErrored;
exports.shouldAttachTrigger = shouldAttachTrigger;
exports.getHydrateTriggers = getHydrateTriggers;
exports.processAndInitTriggers = processAndInitTriggers;
const hooks_1 = require("../render3/after_render/hooks");
const provider_collection_1 = require("../di/provider_collection");
const errors_1 = require("../errors");
const cleanup_1 = require("../hydration/cleanup");
const interfaces_1 = require("../hydration/interfaces");
const utils_1 = require("../hydration/utils");
const pending_tasks_1 = require("../pending_tasks");
const assert_1 = require("../render3/assert");
const def_getters_1 = require("../render3/def_getters");
const element_validation_1 = require("../render3/instructions/element_validation");
const shared_1 = require("../render3/instructions/shared");
const view_1 = require("../render3/interfaces/view");
const state_1 = require("../render3/state");
const assert_2 = require("../util/assert");
const cleanup_2 = require("./cleanup");
const dom_triggers_1 = require("./dom_triggers");
const idle_scheduler_1 = require("./idle_scheduler");
const interfaces_2 = require("./interfaces");
const registry_1 = require("./registry");
const rendering_1 = require("./rendering");
const timer_scheduler_1 = require("./timer_scheduler");
const utils_2 = require("./utils");
const application_ref_1 = require("../application/application_ref");
/**
 * Schedules triggering of a defer block for `on idle` and `on timer` conditions.
 */
function scheduleDelayedTrigger(scheduleFn) {
    const lView = (0, state_1.getLView)();
    const tNode = (0, state_1.getCurrentTNode)();
    (0, rendering_1.renderPlaceholder)(lView, tNode);
    // Exit early to avoid invoking `scheduleFn`, which would
    // add `setTimeout` call and potentially delay serialization
    // on the server unnecessarily.
    if (!shouldTriggerDeferBlock(0 /* TriggerType.Regular */, lView))
        return;
    const injector = lView[view_1.INJECTOR];
    const lDetails = (0, utils_2.getLDeferBlockDetails)(lView, tNode);
    const cleanupFn = scheduleFn(() => triggerDeferBlock(0 /* TriggerType.Regular */, lView, tNode), injector);
    (0, cleanup_2.storeTriggerCleanupFn)(0 /* TriggerType.Regular */, lDetails, cleanupFn);
}
/**
 * Schedules prefetching for `on idle` and `on timer` triggers.
 *
 * @param scheduleFn A function that does the scheduling.
 */
function scheduleDelayedPrefetching(scheduleFn, trigger) {
    if (typeof ngServerMode !== 'undefined' && ngServerMode)
        return;
    const lView = (0, state_1.getLView)();
    const injector = lView[view_1.INJECTOR];
    // Only trigger the scheduled trigger on the browser
    // since we don't want to delay the server response.
    const tNode = (0, state_1.getCurrentTNode)();
    const tView = lView[view_1.TVIEW];
    const tDetails = (0, utils_2.getTDeferBlockDetails)(tView, tNode);
    if (tDetails.loadingState === interfaces_2.DeferDependenciesLoadingState.NOT_STARTED) {
        const lDetails = (0, utils_2.getLDeferBlockDetails)(lView, tNode);
        const prefetch = () => triggerPrefetching(tDetails, lView, tNode);
        const cleanupFn = scheduleFn(prefetch, injector);
        (0, cleanup_2.storeTriggerCleanupFn)(1 /* TriggerType.Prefetch */, lDetails, cleanupFn);
    }
}
/**
 * Schedules hydration triggering of a defer block for `on idle` and `on timer` conditions.
 */
function scheduleDelayedHydrating(scheduleFn, lView, tNode) {
    if (typeof ngServerMode !== 'undefined' && ngServerMode)
        return;
    // Only trigger the scheduled trigger on the browser
    // since we don't want to delay the server response.
    const injector = lView[view_1.INJECTOR];
    const lDetails = (0, utils_2.getLDeferBlockDetails)(lView, tNode);
    const ssrUniqueId = lDetails[interfaces_2.SSR_UNIQUE_ID];
    ngDevMode && (0, utils_1.assertSsrIdDefined)(ssrUniqueId);
    const cleanupFn = scheduleFn(() => triggerHydrationFromBlockName(injector, ssrUniqueId), injector);
    (0, cleanup_2.storeTriggerCleanupFn)(2 /* TriggerType.Hydrate */, lDetails, cleanupFn);
}
/**
 * Trigger prefetching of dependencies for a defer block.
 *
 * @param tDetails Static information about this defer block.
 * @param lView LView of a host view.
 * @param tNode TNode that represents a defer block.
 */
function triggerPrefetching(tDetails, lView, tNode) {
    triggerResourceLoading(tDetails, lView, tNode);
}
/**
 * Trigger loading of defer block dependencies if the process hasn't started yet.
 *
 * @param tDetails Static information about this defer block.
 * @param lView LView of a host view.
 */
function triggerResourceLoading(tDetails, lView, tNode) {
    var _a;
    const injector = lView[view_1.INJECTOR];
    const tView = lView[view_1.TVIEW];
    if (tDetails.loadingState !== interfaces_2.DeferDependenciesLoadingState.NOT_STARTED) {
        // If the loading status is different from initial one, it means that
        // the loading of dependencies is in progress and there is nothing to do
        // in this function. All details can be obtained from the `tDetails` object.
        return (_a = tDetails.loadingPromise) !== null && _a !== void 0 ? _a : Promise.resolve();
    }
    const lDetails = (0, utils_2.getLDeferBlockDetails)(lView, tNode);
    const primaryBlockTNode = (0, utils_2.getPrimaryBlockTNode)(tView, tDetails);
    // Switch from NOT_STARTED -> IN_PROGRESS state.
    tDetails.loadingState = interfaces_2.DeferDependenciesLoadingState.IN_PROGRESS;
    // Prefetching is triggered, cleanup all registered prefetch triggers.
    (0, cleanup_2.invokeTriggerCleanupFns)(1 /* TriggerType.Prefetch */, lDetails);
    let dependenciesFn = tDetails.dependencyResolverFn;
    if (ngDevMode) {
        // Check if dependency function interceptor is configured.
        const deferDependencyInterceptor = injector.get(rendering_1.DEFER_BLOCK_DEPENDENCY_INTERCEPTOR, null, {
            optional: true,
        });
        if (deferDependencyInterceptor) {
            dependenciesFn = deferDependencyInterceptor.intercept(dependenciesFn);
        }
    }
    // Indicate that an application is not stable and has a pending task.
    const removeTask = injector.get(pending_tasks_1.PendingTasks).add();
    // The `dependenciesFn` might be `null` when all dependencies within
    // a given defer block were eagerly referenced elsewhere in a file,
    // thus no dynamic `import()`s were produced.
    if (!dependenciesFn) {
        tDetails.loadingPromise = Promise.resolve().then(() => {
            tDetails.loadingPromise = null;
            tDetails.loadingState = interfaces_2.DeferDependenciesLoadingState.COMPLETE;
            removeTask();
        });
        return tDetails.loadingPromise;
    }
    // Start downloading of defer block dependencies.
    tDetails.loadingPromise = Promise.allSettled(dependenciesFn()).then((results) => {
        let failed = false;
        const directiveDefs = [];
        const pipeDefs = [];
        for (const result of results) {
            if (result.status === 'fulfilled') {
                const dependency = result.value;
                const directiveDef = (0, def_getters_1.getComponentDef)(dependency) || (0, def_getters_1.getDirectiveDef)(dependency);
                if (directiveDef) {
                    directiveDefs.push(directiveDef);
                }
                else {
                    const pipeDef = (0, def_getters_1.getPipeDef)(dependency);
                    if (pipeDef) {
                        pipeDefs.push(pipeDef);
                    }
                }
            }
            else {
                failed = true;
                break;
            }
        }
        if (failed) {
            tDetails.loadingState = interfaces_2.DeferDependenciesLoadingState.FAILED;
            if (tDetails.errorTmplIndex === null) {
                const templateLocation = ngDevMode ? (0, element_validation_1.getTemplateLocationDetails)(lView) : '';
                const error = new errors_1.RuntimeError(-750 /* RuntimeErrorCode.DEFER_LOADING_FAILED */, ngDevMode &&
                    'Loading dependencies for `@defer` block failed, ' +
                        `but no \`@error\` block was configured${templateLocation}. ` +
                        'Consider using the `@error` block to render an error state.');
                (0, shared_1.handleUncaughtError)(lView, error);
            }
        }
        else {
            tDetails.loadingState = interfaces_2.DeferDependenciesLoadingState.COMPLETE;
            // Update directive and pipe registries to add newly downloaded dependencies.
            const primaryBlockTView = primaryBlockTNode.tView;
            if (directiveDefs.length > 0) {
                primaryBlockTView.directiveRegistry = (0, utils_2.addDepsToRegistry)(primaryBlockTView.directiveRegistry, directiveDefs);
                // Extract providers from all NgModules imported by standalone components
                // used within this defer block.
                const directiveTypes = directiveDefs.map((def) => def.type);
                const providers = (0, provider_collection_1.internalImportProvidersFrom)(false, ...directiveTypes);
                tDetails.providers = providers;
            }
            if (pipeDefs.length > 0) {
                primaryBlockTView.pipeRegistry = (0, utils_2.addDepsToRegistry)(primaryBlockTView.pipeRegistry, pipeDefs);
            }
        }
    });
    return tDetails.loadingPromise.finally(() => {
        // Loading is completed, we no longer need the loading Promise
        // and a pending task should also be removed.
        tDetails.loadingPromise = null;
        removeTask();
    });
}
/**
 * Defines whether we should proceed with triggering a given defer block.
 */
function shouldTriggerDeferBlock(triggerType, lView) {
    // prevents triggering regular triggers when on the server.
    if (triggerType === 0 /* TriggerType.Regular */ && typeof ngServerMode !== 'undefined' && ngServerMode) {
        return false;
    }
    // prevents triggering in the case of a test run with manual defer block configuration.
    const injector = lView[view_1.INJECTOR];
    const config = injector.get(rendering_1.DEFER_BLOCK_CONFIG, null, { optional: true });
    if ((config === null || config === void 0 ? void 0 : config.behavior) === interfaces_2.DeferBlockBehavior.Manual) {
        return false;
    }
    return true;
}
/**
 * Attempts to trigger loading of defer block dependencies.
 * If the block is already in a loading, completed or an error state -
 * no additional actions are taken.
 */
function triggerDeferBlock(triggerType, lView, tNode) {
    const tView = lView[view_1.TVIEW];
    const lContainer = lView[tNode.index];
    ngDevMode && (0, assert_1.assertLContainer)(lContainer);
    if (!shouldTriggerDeferBlock(triggerType, lView))
        return;
    const lDetails = (0, utils_2.getLDeferBlockDetails)(lView, tNode);
    const tDetails = (0, utils_2.getTDeferBlockDetails)(tView, tNode);
    // Defer block is triggered, cleanup all registered trigger functions.
    (0, cleanup_2.invokeAllTriggerCleanupFns)(lDetails);
    switch (tDetails.loadingState) {
        case interfaces_2.DeferDependenciesLoadingState.NOT_STARTED:
            (0, rendering_1.renderDeferBlockState)(interfaces_2.DeferBlockState.Loading, tNode, lContainer);
            triggerResourceLoading(tDetails, lView, tNode);
            // The `loadingState` might have changed to "loading".
            if (tDetails.loadingState ===
                interfaces_2.DeferDependenciesLoadingState.IN_PROGRESS) {
                (0, rendering_1.renderDeferStateAfterResourceLoading)(tDetails, tNode, lContainer);
            }
            break;
        case interfaces_2.DeferDependenciesLoadingState.IN_PROGRESS:
            (0, rendering_1.renderDeferBlockState)(interfaces_2.DeferBlockState.Loading, tNode, lContainer);
            (0, rendering_1.renderDeferStateAfterResourceLoading)(tDetails, tNode, lContainer);
            break;
        case interfaces_2.DeferDependenciesLoadingState.COMPLETE:
            ngDevMode && (0, utils_2.assertDeferredDependenciesLoaded)(tDetails);
            (0, rendering_1.renderDeferBlockState)(interfaces_2.DeferBlockState.Complete, tNode, lContainer);
            break;
        case interfaces_2.DeferDependenciesLoadingState.FAILED:
            (0, rendering_1.renderDeferBlockState)(interfaces_2.DeferBlockState.Error, tNode, lContainer);
            break;
        default:
            if (ngDevMode) {
                (0, assert_2.throwError)('Unknown defer block state');
            }
    }
}
/**
 * The core mechanism for incremental hydration. This triggers or
 * queues hydration for all the blocks in the tree that need to be hydrated
 * and keeps track of all those blocks that were hydrated along the way.
 *
 * Note: the `replayQueuedEventsFn` is only provided when hydration is invoked
 * as a result of an event replay (via JsAction). When hydration is invoked from
 * an instruction set (e.g. `deferOnImmediate`) - there is no need to replay any
 * events.
 */
function triggerHydrationFromBlockName(injector, blockName, replayQueuedEventsFn) {
    return __awaiter(this, void 0, void 0, function* () {
        const dehydratedBlockRegistry = injector.get(registry_1.DEHYDRATED_BLOCK_REGISTRY);
        const blocksBeingHydrated = dehydratedBlockRegistry.hydrating;
        // Make sure we don't hydrate/trigger the same thing multiple times
        if (blocksBeingHydrated.has(blockName)) {
            return;
        }
        // Trigger resource loading and hydration for the blocks in the queue in the order of highest block
        // to lowest block. Once a block has finished resource loading, after next render fires after hydration
        // finishes. The new block will have its defer instruction called and will be in the registry.
        // Due to timing related to potential nested control flow, this has to be scheduled after the next render.
        const { parentBlockPromise, hydrationQueue } = (0, utils_1.getParentBlockHydrationQueue)(blockName, injector);
        if (hydrationQueue.length === 0)
            return;
        // It's possible that the hydrationQueue topmost item is actually in the process of hydrating and has
        // a promise already. In that case, we don't want to destroy that promise and queue it again.
        if (parentBlockPromise !== null) {
            hydrationQueue.shift();
        }
        // The hydrating map in the registry prevents re-triggering hydration for a block that's already in
        // the hydration queue. Here we generate promises for each of the blocks about to be hydrated
        populateHydratingStateForQueue(dehydratedBlockRegistry, hydrationQueue);
        // We await this after populating the hydration state so we can prevent re-triggering hydration for
        // the same blocks while this promise is being awaited.
        if (parentBlockPromise !== null) {
            yield parentBlockPromise;
        }
        const topmostParentBlock = hydrationQueue[0];
        if (dehydratedBlockRegistry.has(topmostParentBlock)) {
            // the topmost parent block is already in the registry and we can proceed
            // with hydration.
            yield triggerHydrationForBlockQueue(injector, hydrationQueue, replayQueuedEventsFn);
        }
        else {
            // the topmost parent block is not yet in the registry, which may mean
            // a lazy loaded route, a control flow branch was taken, a route has
            // been navigated, etc. So we need to queue up the hydration process
            // so that it can be finished after the top block has had its defer
            // instruction executed.
            dehydratedBlockRegistry.awaitParentBlock(topmostParentBlock, () => __awaiter(this, void 0, void 0, function* () { return yield triggerHydrationForBlockQueue(injector, hydrationQueue, replayQueuedEventsFn); }));
        }
    });
}
/**
 * The core mechanism for incremental hydration. This triggers
 * hydration for all the blocks in the tree that need to be hydrated
 * and keeps track of all those blocks that were hydrated along the way.
 *
 * Note: the `replayQueuedEventsFn` is only provided when hydration is invoked
 * as a result of an event replay (via JsAction). When hydration is invoked from
 * an instruction set (e.g. `deferOnImmediate`) - there is no need to replay any
 * events.
 */
function triggerHydrationForBlockQueue(injector, hydrationQueue, replayQueuedEventsFn) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const dehydratedBlockRegistry = injector.get(registry_1.DEHYDRATED_BLOCK_REGISTRY);
        const blocksBeingHydrated = dehydratedBlockRegistry.hydrating;
        // Indicate that we have some pending async work.
        const pendingTasks = injector.get(pending_tasks_1.PendingTasksInternal);
        const taskId = pendingTasks.add();
        // Actually do the triggering and hydration of the queue of blocks
        for (let blockQueueIdx = 0; blockQueueIdx < hydrationQueue.length; blockQueueIdx++) {
            const dehydratedBlockId = hydrationQueue[blockQueueIdx];
            const dehydratedDeferBlock = dehydratedBlockRegistry.get(dehydratedBlockId);
            if (dehydratedDeferBlock != null) {
                // trigger the block resources and await next render for hydration. This should result
                // in the next block ɵɵdefer instruction being called and that block being added to the dehydrated registry.
                yield triggerResourceLoadingForHydration(dehydratedDeferBlock);
                yield nextRender(injector);
                // if the content has changed since server rendering, we need to check for the expected block
                // being in the registry or if errors occurred. In that case, we need to clean up the remaining expected
                // content that won't be rendered or fetched.
                if (deferBlockHasErrored(dehydratedDeferBlock)) {
                    // Either the expected block has not yet had its ɵɵdefer instruction called or the block errored out when fetching
                    // resources. In the former case, either we're hydrating too soon or the client and server differ. In both cases,
                    // we need to clean up child content and promises.
                    (0, cleanup_1.removeDehydratedViewList)(dehydratedDeferBlock);
                    cleanupRemainingHydrationQueue(hydrationQueue.slice(blockQueueIdx), dehydratedBlockRegistry);
                    break;
                }
                // The defer block has not errored and we've finished fetching resources and rendering.
                // At this point it is safe to resolve the hydration promise.
                blocksBeingHydrated.get(dehydratedBlockId).resolve();
            }
            else {
                // The expected block has not yet had its ɵɵdefer instruction called. This is likely due to content changing between
                // client and server. We need to clean up the dehydrated DOM in the container since it no longer is valid.
                cleanupParentContainer(blockQueueIdx, hydrationQueue, dehydratedBlockRegistry);
                cleanupRemainingHydrationQueue(hydrationQueue.slice(blockQueueIdx), dehydratedBlockRegistry);
                break;
            }
        }
        const lastBlockName = hydrationQueue[hydrationQueue.length - 1];
        // Await hydration completion for the last block.
        yield ((_a = blocksBeingHydrated.get(lastBlockName)) === null || _a === void 0 ? void 0 : _a.promise);
        // All async work is done, remove the taskId from the registry.
        pendingTasks.remove(taskId);
        // Replay any queued events, if any exist and the replay operation was requested.
        if (replayQueuedEventsFn) {
            replayQueuedEventsFn(hydrationQueue);
        }
        // Cleanup after hydration of all affected defer blocks.
        (0, cleanup_1.cleanupHydratedDeferBlocks)(dehydratedBlockRegistry.get(lastBlockName), hydrationQueue, dehydratedBlockRegistry, injector.get(application_ref_1.ApplicationRef));
    });
}
function deferBlockHasErrored(deferBlock) {
    return ((0, utils_2.getLDeferBlockDetails)(deferBlock.lView, deferBlock.tNode)[interfaces_2.DEFER_BLOCK_STATE] ===
        interfaces_2.DeferBlockState.Error);
}
/**
 * Clean up the parent container of a block where content changed between server and client.
 * The parent of a block going through `triggerHydrationFromBlockName` will contain the
 * dehydrated content that needs to be cleaned up. So we have to do the clean up from that location
 * in the tree.
 */
function cleanupParentContainer(currentBlockIdx, hydrationQueue, dehydratedBlockRegistry) {
    // If a parent block exists, it's in the hydration queue in front of the current block.
    const parentDeferBlockIdx = currentBlockIdx - 1;
    const parentDeferBlock = parentDeferBlockIdx > -1
        ? dehydratedBlockRegistry.get(hydrationQueue[parentDeferBlockIdx])
        : null;
    if (parentDeferBlock) {
        (0, cleanup_1.cleanupLContainer)(parentDeferBlock.lContainer);
    }
}
function cleanupRemainingHydrationQueue(hydrationQueue, dehydratedBlockRegistry) {
    var _a;
    const blocksBeingHydrated = dehydratedBlockRegistry.hydrating;
    for (const dehydratedBlockId in hydrationQueue) {
        (_a = blocksBeingHydrated.get(dehydratedBlockId)) === null || _a === void 0 ? void 0 : _a.reject();
    }
    dehydratedBlockRegistry.cleanup(hydrationQueue);
}
/**
 * Generates a new promise for every defer block in the hydrating queue
 */
function populateHydratingStateForQueue(registry, queue) {
    for (let blockId of queue) {
        registry.hydrating.set(blockId, Promise.withResolvers());
    }
}
// Waits for the next render cycle to complete
function nextRender(injector) {
    return new Promise((resolveFn) => (0, hooks_1.afterNextRender)(resolveFn, { injector }));
}
function triggerResourceLoadingForHydration(dehydratedBlock) {
    return __awaiter(this, void 0, void 0, function* () {
        const { tNode, lView } = dehydratedBlock;
        const lDetails = (0, utils_2.getLDeferBlockDetails)(lView, tNode);
        return new Promise((resolve) => {
            onDeferBlockCompletion(lDetails, resolve);
            triggerDeferBlock(2 /* TriggerType.Hydrate */, lView, tNode);
        });
    });
}
/**
 * Registers cleanup functions for a defer block when the block has finished
 * fetching and rendering
 */
function onDeferBlockCompletion(lDetails, callback) {
    if (!Array.isArray(lDetails[interfaces_2.ON_COMPLETE_FNS])) {
        lDetails[interfaces_2.ON_COMPLETE_FNS] = [];
    }
    lDetails[interfaces_2.ON_COMPLETE_FNS].push(callback);
}
/**
 * Determines whether specific trigger types should be attached during an instruction firing
 * to ensure the proper triggers for a given type are used.
 */
function shouldAttachTrigger(triggerType, lView, tNode) {
    if (triggerType === 0 /* TriggerType.Regular */) {
        return shouldAttachRegularTrigger(lView, tNode);
    }
    else if (triggerType === 2 /* TriggerType.Hydrate */) {
        return !shouldAttachRegularTrigger(lView, tNode);
    }
    // TriggerType.Prefetch is active only on the client
    return !(typeof ngServerMode !== 'undefined' && ngServerMode);
}
/**
 * Defines whether a regular trigger logic (e.g. "on viewport") should be attached
 * to a defer block. This function defines a condition, which mutually excludes
 * `deferOn*` and `deferHydrateOn*` triggers, to make sure only one of the trigger
 * types is active for a block with the current state.
 */
function shouldAttachRegularTrigger(lView, tNode) {
    const injector = lView[view_1.INJECTOR];
    const tDetails = (0, utils_2.getTDeferBlockDetails)(lView[view_1.TVIEW], tNode);
    const incrementalHydrationEnabled = (0, utils_1.isIncrementalHydrationEnabled)(injector);
    const hasHydrateTriggers = tDetails.flags !== null &&
        (tDetails.flags & 1 /* TDeferDetailsFlags.HasHydrateTriggers */) ===
            1 /* TDeferDetailsFlags.HasHydrateTriggers */;
    // On the server:
    if (typeof ngServerMode !== 'undefined' && ngServerMode) {
        // Regular triggers are activated on the server when:
        //  - Either Incremental Hydration is *not* enabled
        //  - Or Incremental Hydration is enabled, but a given block doesn't have "hydrate" triggers
        return !incrementalHydrationEnabled || !hasHydrateTriggers;
    }
    // On the client:
    const lDetails = (0, utils_2.getLDeferBlockDetails)(lView, tNode);
    const wasServerSideRendered = lDetails[interfaces_2.SSR_UNIQUE_ID] !== null;
    if (hasHydrateTriggers && wasServerSideRendered && incrementalHydrationEnabled) {
        return false;
    }
    return true;
}
/**
 * Retrives a Defer Block's list of hydration triggers
 */
function getHydrateTriggers(tView, tNode) {
    var _a;
    const tDetails = (0, utils_2.getTDeferBlockDetails)(tView, tNode);
    return ((_a = tDetails.hydrateTriggers) !== null && _a !== void 0 ? _a : (tDetails.hydrateTriggers = new Map()));
}
/**
 * Loops through all defer block summaries and ensures all the blocks triggers are
 * properly initialized
 */
function processAndInitTriggers(injector, blockData, nodes) {
    const idleElements = [];
    const timerElements = [];
    const viewportElements = [];
    const immediateElements = [];
    for (let [blockId, blockSummary] of blockData) {
        const commentNode = nodes.get(blockId);
        if (commentNode !== undefined) {
            const numRootNodes = blockSummary.data[interfaces_1.NUM_ROOT_NODES];
            let currentNode = commentNode;
            for (let i = 0; i < numRootNodes; i++) {
                currentNode = currentNode.previousSibling;
                if (currentNode.nodeType !== Node.ELEMENT_NODE) {
                    continue;
                }
                const elementTrigger = { el: currentNode, blockName: blockId };
                // hydrate
                if (blockSummary.hydrate.idle) {
                    idleElements.push(elementTrigger);
                }
                if (blockSummary.hydrate.immediate) {
                    immediateElements.push(elementTrigger);
                }
                if (blockSummary.hydrate.timer !== null) {
                    elementTrigger.delay = blockSummary.hydrate.timer;
                    timerElements.push(elementTrigger);
                }
                if (blockSummary.hydrate.viewport) {
                    viewportElements.push(elementTrigger);
                }
            }
        }
    }
    setIdleTriggers(injector, idleElements);
    setImmediateTriggers(injector, immediateElements);
    setViewportTriggers(injector, viewportElements);
    setTimerTriggers(injector, timerElements);
}
function setIdleTriggers(injector, elementTriggers) {
    for (const elementTrigger of elementTriggers) {
        const registry = injector.get(registry_1.DEHYDRATED_BLOCK_REGISTRY);
        const onInvoke = () => triggerHydrationFromBlockName(injector, elementTrigger.blockName);
        const cleanupFn = (0, idle_scheduler_1.onIdle)(onInvoke, injector);
        registry.addCleanupFn(elementTrigger.blockName, cleanupFn);
    }
}
function setViewportTriggers(injector, elementTriggers) {
    if (elementTriggers.length > 0) {
        const registry = injector.get(registry_1.DEHYDRATED_BLOCK_REGISTRY);
        for (let elementTrigger of elementTriggers) {
            const cleanupFn = (0, dom_triggers_1.onViewport)(elementTrigger.el, () => triggerHydrationFromBlockName(injector, elementTrigger.blockName), injector);
            registry.addCleanupFn(elementTrigger.blockName, cleanupFn);
        }
    }
}
function setTimerTriggers(injector, elementTriggers) {
    for (const elementTrigger of elementTriggers) {
        const registry = injector.get(registry_1.DEHYDRATED_BLOCK_REGISTRY);
        const onInvoke = () => triggerHydrationFromBlockName(injector, elementTrigger.blockName);
        const timerFn = (0, timer_scheduler_1.onTimer)(elementTrigger.delay);
        const cleanupFn = timerFn(onInvoke, injector);
        registry.addCleanupFn(elementTrigger.blockName, cleanupFn);
    }
}
function setImmediateTriggers(injector, elementTriggers) {
    for (const elementTrigger of elementTriggers) {
        // Note: we intentionally avoid awaiting each call and instead kick off
        // the hydration process simultaneously for all defer blocks with this trigger;
        triggerHydrationFromBlockName(injector, elementTrigger.blockName);
    }
}
