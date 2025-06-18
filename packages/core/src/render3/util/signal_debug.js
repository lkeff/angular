"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSignalGraph = getSignalGraph;
const assert_1 = require("../assert");
const framework_injector_profiler_1 = require("../debug/framework_injector_profiler");
const di_1 = require("../di");
const view_1 = require("../interfaces/view");
const r3_injector_1 = require("../../di/r3_injector");
const assert_2 = require("../../util/assert");
const signals_1 = require("../../../primitives/signals");
function isComputedNode(node) {
    return node.kind === 'computed';
}
function isTemplateEffectNode(node) {
    return node.kind === 'template';
}
function isEffectNode(node) {
    return node.kind === 'effect';
}
function isSignalNode(node) {
    return node.kind === 'signal';
}
/**
 *
 * @param injector
 * @returns Template consumer of given NodeInjector
 */
function getTemplateConsumer(injector) {
    const tNode = (0, di_1.getNodeInjectorTNode)(injector);
    (0, assert_1.assertTNode)(tNode);
    const lView = (0, di_1.getNodeInjectorLView)(injector);
    (0, assert_1.assertLView)(lView);
    const templateLView = lView[tNode.index];
    (0, assert_1.assertLView)(templateLView);
    return templateLView[view_1.REACTIVE_TEMPLATE_CONSUMER];
}
function getNodesAndEdgesFromSignalMap(signalMap) {
    var _a, _b, _c, _d, _e;
    const nodes = Array.from(signalMap.keys());
    const debugSignalGraphNodes = [];
    const edges = [];
    for (const [consumer, producers] of signalMap.entries()) {
        const consumerIndex = nodes.indexOf(consumer);
        // collect node
        if (isComputedNode(consumer) || isSignalNode(consumer)) {
            debugSignalGraphNodes.push({
                label: consumer.debugName,
                value: consumer.value,
                kind: consumer.kind,
            });
        }
        else if (isTemplateEffectNode(consumer)) {
            debugSignalGraphNodes.push({
                label: (_a = consumer.debugName) !== null && _a !== void 0 ? _a : (_e = (_d = (_c = (_b = consumer.lView) === null || _b === void 0 ? void 0 : _b[view_1.HOST]) === null || _c === void 0 ? void 0 : _c.tagName) === null || _d === void 0 ? void 0 : _d.toLowerCase) === null || _e === void 0 ? void 0 : _e.call(_d),
                kind: consumer.kind,
            });
        }
        else if (isEffectNode(consumer)) {
            debugSignalGraphNodes.push({
                label: consumer.debugName,
                kind: consumer.kind,
            });
        }
        else {
            debugSignalGraphNodes.push({
                label: consumer.debugName,
                kind: consumer.kind,
            });
        }
        // collect edges for node
        for (const producer of producers) {
            edges.push({ consumer: consumerIndex, producer: nodes.indexOf(producer) });
        }
    }
    return { nodes: debugSignalGraphNodes, edges };
}
function extractEffectsFromInjector(injector) {
    var _a;
    let diResolver = injector;
    if (injector instanceof di_1.NodeInjector) {
        const lView = (0, di_1.getNodeInjectorLView)(injector);
        diResolver = lView;
    }
    const resolverToEffects = (0, framework_injector_profiler_1.getFrameworkDIDebugData)().resolverToEffects;
    const effects = (_a = resolverToEffects.get(diResolver)) !== null && _a !== void 0 ? _a : [];
    return effects.map((effect) => effect[signals_1.SIGNAL]);
}
function extractSignalNodesAndEdgesFromRoots(nodes, signalDependenciesMap = new Map()) {
    var _a;
    for (const node of nodes) {
        if (signalDependenciesMap.has(node)) {
            continue;
        }
        const producerNodes = ((_a = node.producerNode) !== null && _a !== void 0 ? _a : []);
        signalDependenciesMap.set(node, producerNodes);
        extractSignalNodesAndEdgesFromRoots(producerNodes, signalDependenciesMap);
    }
    return signalDependenciesMap;
}
/**
 * Returns a debug representation of the signal graph for the given injector.
 *
 * Currently only supports element injectors. Starts by discovering the consumer nodes
 * and then traverses their producer nodes to build the signal graph.
 *
 * @param injector The injector to get the signal graph for.
 * @returns A debug representation of the signal graph.
 * @throws If the injector is an environment injector.
 */
function getSignalGraph(injector) {
    let templateConsumer = null;
    if (!(injector instanceof di_1.NodeInjector) && !(injector instanceof r3_injector_1.R3Injector)) {
        return (0, assert_2.throwError)('getSignalGraph must be called with a NodeInjector or R3Injector');
    }
    if (injector instanceof di_1.NodeInjector) {
        templateConsumer = getTemplateConsumer(injector);
    }
    const nonTemplateEffectNodes = extractEffectsFromInjector(injector);
    const signalNodes = templateConsumer
        ? [templateConsumer, ...nonTemplateEffectNodes]
        : nonTemplateEffectNodes;
    const signalDependenciesMap = extractSignalNodesAndEdgesFromRoots(signalNodes);
    return getNodesAndEdgesFromSignalMap(signalDependenciesMap);
}
