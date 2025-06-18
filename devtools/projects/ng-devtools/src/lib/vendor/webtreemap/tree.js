"use strict";
/**
 * Copyright 2019 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.treeify = treeify;
exports.flatten = flatten;
exports.rollup = rollup;
exports.sort = sort;
/**
 * treeify converts an array of [path, size] pairs into a tree.
 * Paths are /-delimited ids.
 */
function treeify(data) {
    const tree = { size: 0 };
    for (const [path, size] of data) {
        const parts = path.replace(/\/$/, '').split('/');
        let t = tree;
        while (parts.length > 0) {
            const id = parts.shift();
            if (!t.children)
                t.children = [];
            let child = t.children.find((c) => c.id === id);
            if (!child) {
                child = { id, size: 0 };
                t.children.push(child);
            }
            if (parts.length === 0) {
                if (child.size !== 0) {
                    throw new Error(`duplicate path ${path} ${child.size}`);
                }
                child.size = size;
            }
            t = child;
        }
    }
    return tree;
}
/**
 * flatten flattens nodes that have only one child.
 * @param join If given, a function that joins the names of the parent and
 * child.
 */
function flatten(n, join = (parent, child) => `${parent}/${child}`) {
    if (n.children) {
        for (const c of n.children) {
            flatten(c, join);
        }
        if (n.children.length === 1) {
            const child = n.children[0];
            n.id += '/' + child.id;
            n.children = child.children;
        }
    }
}
/**
 * rollup fills in the size attribute for nodes by summing their children.
 *
 * Note that it's legal for input data to have a node with a size larger
 * than the sum of its children, perhaps because some data was left out.
 */
function rollup(n) {
    if (!n.children)
        return;
    let total = 0;
    for (const c of n.children) {
        rollup(c);
        total += c.size;
    }
    if (total > n.size)
        n.size = total;
}
/**
 * sort sorts a tree by size, descending.
 */
function sort(n) {
    if (!n.children)
        return;
    for (const c of n.children) {
        sort(c);
    }
    n.children.sort((a, b) => b.size - a.size);
}
