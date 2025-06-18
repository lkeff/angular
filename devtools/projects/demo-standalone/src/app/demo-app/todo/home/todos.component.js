"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosComponent = exports.TodosFilter = void 0;
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const sample_pipe_1 = require("./sample.pipe");
const todo_component_1 = require("./todo.component");
const tooltip_directive_1 = require("./tooltip.directive");
let TodosFilter = (() => {
    let _classDecorators = [(0, core_1.Pipe)({ pure: false, name: 'todosFilter' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TodosFilter = _classThis = class {
        transform(todos, filter) {
            return (todos || []).filter((t) => {
                if (filter === "all" /* TodoFilter.All */) {
                    return true;
                }
                if (filter === "active" /* TodoFilter.Active */ && !t.completed) {
                    return true;
                }
                if (filter === "completed" /* TodoFilter.Completed */ && t.completed) {
                    return true;
                }
                return false;
            });
        }
    };
    __setFunctionName(_classThis, "TodosFilter");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TodosFilter = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TodosFilter = _classThis;
})();
exports.TodosFilter = TodosFilter;
const fib = (n) => {
    if (n === 1 || n === 2) {
        return 1;
    }
    return fib(n - 1) + fib(n - 2);
};
let TodosComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-todos',
            imports: [router_1.RouterLink, todo_component_1.TodoComponent, sample_pipe_1.SamplePipe, TodosFilter, tooltip_directive_1.TooltipDirective],
            template: `
    <a [routerLink]="">Home</a>
    <a [routerLink]="">Home</a>
    <a [routerLink]="">Home</a>
    <p>{{ 'Sample text processed by a pipe' | sample }}</p>
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input
          (keydown.enter)="addTodo(input)"
          #input
          class="new-todo"
          placeholder="What needs to be done?"
          autofocus
        />
      </header>
      <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox" />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          @for (todo of todos | todosFilter: filterValue; track todo) {
          <app-todo
            appTooltip
            [todo]="todo"
            (delete)="onDelete($event)"
            (update)="onChange($event)"
          />
          }
        </ul>
      </section>
      <footer class="footer">
        <span class="todo-count">
          <strong>{{ itemsLeft }}</strong> item left
        </span>
        <button class="clear-completed" (click)="clearCompleted()">Clear completed</button>
      </footer>
    </section>
  `,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _update_decorators;
    let _update_initializers = [];
    let _update_extraInitializers = [];
    let _delete_decorators;
    let _delete_initializers = [];
    let _delete_extraInitializers = [];
    let _add_decorators;
    let _add_initializers = [];
    let _add_extraInitializers = [];
    var TodosComponent = _classThis = class {
        constructor(cdRef) {
            this.cdRef = cdRef;
            this.todos = [
                {
                    label: 'Buy milk',
                    completed: false,
                    id: '42',
                },
                {
                    label: 'Build something fun!',
                    completed: false,
                    id: '43',
                },
            ];
            this.update = __runInitializers(this, _update_initializers, new core_1.EventEmitter());
            this.delete = (__runInitializers(this, _update_extraInitializers), __runInitializers(this, _delete_initializers, new core_1.EventEmitter()));
            this.add = (__runInitializers(this, _delete_extraInitializers), __runInitializers(this, _add_initializers, new core_1.EventEmitter()));
            this.hashListener = __runInitializers(this, _add_extraInitializers);
        }
        ngOnInit() {
            if (typeof window !== 'undefined') {
                window.addEventListener('hashchange', (this.hashListener = () => this.cdRef.markForCheck()));
            }
        }
        ngOnDestroy() {
            fib(40);
            if (typeof window !== 'undefined') {
                window.removeEventListener('hashchange', this.hashListener);
            }
        }
        get filterValue() {
            if (typeof window !== 'undefined') {
                return window.location.hash.replace(/^#\//, '') || "all" /* TodoFilter.All */;
            }
            return "all" /* TodoFilter.All */;
        }
        get itemsLeft() {
            return (this.todos || []).filter((t) => !t.completed).length;
        }
        clearCompleted() {
            (this.todos || []).filter((t) => t.completed).forEach((t) => this.delete.emit(t));
        }
        addTodo(input) {
            const todo = {
                completed: false,
                label: input.value,
            };
            const result = Object.assign(Object.assign({}, todo), { id: Math.random().toString() });
            this.todos.push(result);
            input.value = '';
        }
        onChange(todo) {
            if (!todo.id) {
                return;
            }
        }
        onDelete(todo) {
            if (!todo.id) {
                return;
            }
            const idx = this.todos.findIndex((t) => t.id === todo.id);
            if (idx < 0) {
                return;
            }
            // tslint:disable-next-line:no-console
            console.log('Deleting', idx);
            this.todos.splice(idx, 1);
        }
    };
    __setFunctionName(_classThis, "TodosComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _update_decorators = [(0, core_1.Output)()];
        _delete_decorators = [(0, core_1.Output)()];
        _add_decorators = [(0, core_1.Output)()];
        __esDecorate(null, null, _update_decorators, { kind: "field", name: "update", static: false, private: false, access: { has: obj => "update" in obj, get: obj => obj.update, set: (obj, value) => { obj.update = value; } }, metadata: _metadata }, _update_initializers, _update_extraInitializers);
        __esDecorate(null, null, _delete_decorators, { kind: "field", name: "delete", static: false, private: false, access: { has: obj => "delete" in obj, get: obj => obj.delete, set: (obj, value) => { obj.delete = value; } }, metadata: _metadata }, _delete_initializers, _delete_extraInitializers);
        __esDecorate(null, null, _add_decorators, { kind: "field", name: "add", static: false, private: false, access: { has: obj => "add" in obj, get: obj => obj.add, set: (obj, value) => { obj.add = value; } }, metadata: _metadata }, _add_initializers, _add_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TodosComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TodosComponent = _classThis;
})();
exports.TodosComponent = TodosComponent;
