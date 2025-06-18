"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.traverseFlowForInterestingNodes = traverseFlowForInterestingNodes;
exports.getFlowNode = getFlowNode;
const typescript_1 = __importDefault(require("typescript"));
const flow_node_internals_1 = require("./flow_node_internals");
/**
 * Traverses the graph of the TypeScript flow nodes, exploring all possible branches
 * and keeps track of interesting nodes that may contribute to "narrowing".
 *
 * This allows us to figure out which nodes may be narrowed or not, and need
 * temporary variables in the migration to allowing narrowing to continue working.
 *
 * Some resources on flow nodes by TypeScript:
 * https://effectivetypescript.com/2024/03/24/flownodes/.
 */
function traverseFlowForInterestingNodes(flow) {
    var _a, _b;
    let flowDepth = 0;
    let interestingNodes = [];
    const queue = new Set([flow]);
    // Queue is evolved during iteration, and new items will be added
    // to the end of the iteration. Effectively implementing a queue
    // with deduping out of the box.
    for (const flow of queue) {
        if (++flowDepth === 2000) {
            // We have made 2000 recursive invocations. To avoid overflowing the call stack we report an
            // error and disable further control flow analysis in the containing function or module body.
            return interestingNodes;
        }
        const flags = flow.flags;
        if (flags & flow_node_internals_1.FlowFlags.Assignment) {
            const assignment = flow;
            queue.add(assignment.antecedent);
            if (typescript_1.default.isVariableDeclaration(assignment.node)) {
                interestingNodes.push(assignment.node.name);
            }
            else if (typescript_1.default.isBindingElement(assignment.node)) {
                interestingNodes.push(assignment.node.name);
            }
            else {
                interestingNodes.push(assignment.node);
            }
        }
        else if (flags & flow_node_internals_1.FlowFlags.Call) {
            queue.add(flow.antecedent);
            // Arguments can be narrowed using `FlowCall`s.
            // See: node_modules/typescript/stable/src/compiler/checker.ts;l=28786-28810
            interestingNodes.push(...flow.node.arguments);
        }
        else if (flags & flow_node_internals_1.FlowFlags.Condition) {
            queue.add(flow.antecedent);
            interestingNodes.push(flow.node);
        }
        else if (flags & flow_node_internals_1.FlowFlags.SwitchClause) {
            queue.add(flow.antecedent);
            // The switch expression can be narrowed, so it's an interesting node.
            interestingNodes.push(flow.node.switchStatement.expression);
        }
        else if (flags & flow_node_internals_1.FlowFlags.Label) {
            // simple label, a single ancestor.
            if (((_a = flow.antecedent) === null || _a === void 0 ? void 0 : _a.length) === 1) {
                queue.add(flow.antecedent[0]);
                continue;
            }
            if (flags & flow_node_internals_1.FlowFlags.BranchLabel) {
                // Normal branches. e.g. switch.
                for (const f of (_b = flow.antecedent) !== null && _b !== void 0 ? _b : []) {
                    queue.add(f);
                }
            }
            else {
                // Branch for loops.
                // The first antecedent always points to the flow node before the loop
                // was entered. All other narrowing expressions, if present, are direct
                // antecedents of the starting flow node, so we only need to look at the first.
                // See: node_modules/typescript/stable/src/compiler/checker.ts;l=28108-28109
                queue.add(flow.antecedent[0]);
            }
        }
        else if (flags & flow_node_internals_1.FlowFlags.ArrayMutation) {
            queue.add(flow.antecedent);
            // Array mutations are never interesting for inputs, as we cannot migrate
            // assignments to inputs.
        }
        else if (flags & flow_node_internals_1.FlowFlags.ReduceLabel) {
            // reduce label is a try/catch re-routing.
            // visit all possible branches.
            // TODO: explore this more.
            // See: node_modules/typescript/stable/src/compiler/binder.ts;l=1636-1649.
            queue.add(flow.antecedent);
            for (const f of flow.node.antecedents) {
                queue.add(f);
            }
        }
        else if (flags & flow_node_internals_1.FlowFlags.Start) {
            // Note: TS itself only ever continues with parent control flows, if the pre-determined `flowContainer`
            // of the referenced is different. E.g. narrowing might decide to choose a higher flow container if we
            // reference a constant. In which case, TS allows escaping the flow container for narrowing. See:
            // http://google3/third_party/javascript/node_modules/typescript/stable/src/compiler/checker.ts;l=29399-29414;rcl=623599846.
            // and TypeScript's `narrowedConstInMethod` baseline test.
            // --> We don't need this as an input cannot be a constant!
            return interestingNodes;
        }
        else {
            break;
        }
    }
    return null;
}
/** Gets the flow node for the given node. */
function getFlowNode(node) {
    var _a;
    return (_a = node.flowNode) !== null && _a !== void 0 ? _a : null;
}
