"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@angular/common");
const query_list_1 = require("../../src/linker/query_list");
const iterable_1 = require("../../src/util/iterable");
const testing_1 = require("../../testing");
describe('QueryList', () => {
    let queryList;
    let log;
    beforeEach(() => {
        queryList = new query_list_1.QueryList();
        log = '';
    });
    function logAppend(item) {
        log += (log.length == 0 ? '' : ', ') + item;
    }
    describe('dirty and reset', () => {
        it('should initially be dirty and empty', () => {
            expect(queryList.dirty).toBeTruthy();
            expect(queryList.length).toBe(0);
        });
        it('should be not dirty after reset', () => {
            expect(queryList.dirty).toBeTruthy();
            queryList.reset(['one', 'two']);
            expect(queryList.dirty).toBeFalsy();
            expect(queryList.length).toBe(2);
        });
    });
    it('should support resetting and iterating over the new objects', () => {
        queryList.reset(['one']);
        queryList.reset(['two']);
        (0, iterable_1.iterateListLike)(queryList, logAppend);
        expect(log).toEqual('two');
    });
    it('should support length', () => {
        queryList.reset(['one', 'two']);
        expect(queryList.length).toEqual(2);
    });
    it('should support get', () => {
        queryList.reset(['one', 'two']);
        expect(queryList.get(1)).toEqual('two');
    });
    it('should support map', () => {
        queryList.reset(['one', 'two']);
        expect(queryList.map((x) => x)).toEqual(['one', 'two']);
    });
    it('should support map with index', () => {
        queryList.reset(['one', 'two']);
        expect(queryList.map((x, i) => `${x}_${i}`)).toEqual(['one_0', 'two_1']);
    });
    it('should support forEach', () => {
        queryList.reset(['one', 'two']);
        let join = '';
        queryList.forEach((x) => (join = join + x));
        expect(join).toEqual('onetwo');
    });
    it('should support forEach with index', () => {
        queryList.reset(['one', 'two']);
        let join = '';
        queryList.forEach((x, i) => (join = join + x + i));
        expect(join).toEqual('one0two1');
    });
    it('should support filter', () => {
        queryList.reset(['one', 'two']);
        expect(queryList.filter((x) => x == 'one')).toEqual(['one']);
    });
    it('should support filter with index', () => {
        queryList.reset(['one', 'two']);
        expect(queryList.filter((x, i) => i == 0)).toEqual(['one']);
    });
    it('should support find', () => {
        queryList.reset(['one', 'two']);
        expect(queryList.find((x) => x == 'two')).toEqual('two');
    });
    it('should support find with index', () => {
        queryList.reset(['one', 'two']);
        expect(queryList.find((x, i) => i == 1)).toEqual('two');
    });
    it('should support reduce', () => {
        queryList.reset(['one', 'two']);
        expect(queryList.reduce((a, x) => a + x, 'start:')).toEqual('start:onetwo');
    });
    it('should support reduce with index', () => {
        queryList.reset(['one', 'two']);
        expect(queryList.reduce((a, x, i) => a + x + i, 'start:')).toEqual('start:one0two1');
    });
    it('should support toArray', () => {
        queryList.reset(['one', 'two']);
        expect(queryList.reduce((a, x) => a + x, 'start:')).toEqual('start:onetwo');
    });
    it('should support toArray', () => {
        queryList.reset(['one', 'two']);
        expect(queryList.toArray()).toEqual(['one', 'two']);
    });
    it('should support toString', () => {
        queryList.reset(['one', 'two']);
        const listString = queryList.toString();
        expect(listString.indexOf('one') != -1).toBeTruthy();
        expect(listString.indexOf('two') != -1).toBeTruthy();
    });
    it('should support first and last', () => {
        queryList.reset(['one', 'two', 'three']);
        expect(queryList.first).toEqual('one');
        expect(queryList.last).toEqual('three');
    });
    it('should support some', () => {
        queryList.reset(['one', 'two', 'three']);
        expect(queryList.some((item) => item === 'one')).toEqual(true);
        expect(queryList.some((item) => item === 'four')).toEqual(false);
    });
    it('should support guards on filter', () => {
        const qList = new query_list_1.QueryList();
        qList.reset(['foo']);
        const foos = queryList.filter((item) => item === 'foo');
        expect(qList.length).toEqual(1);
    });
    it('should be iterable', () => {
        const data = ['one', 'two', 'three'];
        queryList.reset([...data]);
        // The type here is load-bearing: it asserts that queryList is considered assignable to
        // Iterable<string> in TypeScript. This is important for template type-checking of *ngFor
        // when looping over query results.
        const queryListAsIterable = queryList;
        // For loops use the iteration protocol.
        for (const value of queryListAsIterable) {
            expect(value).toBe(data.shift());
        }
        expect(data.length).toBe(0);
    });
    if ((0, common_1.ɵgetDOM)().supportsDOMEvents) {
        describe('simple observable interface', () => {
            it('should fire callbacks on change', (0, testing_1.fakeAsync)(() => {
                let fires = 0;
                queryList.changes.subscribe({
                    next: (_) => {
                        fires += 1;
                    },
                });
                queryList.notifyOnChanges();
                (0, testing_1.tick)();
                expect(fires).toEqual(1);
                queryList.notifyOnChanges();
                (0, testing_1.tick)();
                expect(fires).toEqual(2);
            }));
            it('should provides query list as an argument', (0, testing_1.fakeAsync)(() => {
                let recorded;
                queryList.changes.subscribe({
                    next: (v) => {
                        recorded = v;
                    },
                });
                queryList.reset(['one']);
                queryList.notifyOnChanges();
                (0, testing_1.tick)();
                expect(recorded).toBe(queryList);
            }));
        });
    }
});
