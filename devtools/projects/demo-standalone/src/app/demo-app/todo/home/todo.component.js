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
exports.TodoComponent = void 0;
const core_1 = require("@angular/core");
const tooltip_directive_1 = require("./tooltip.directive");
let TodoComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-todo',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            imports: [tooltip_directive_1.TooltipDirective],
            styles: [
                `
      .destroy {
        cursor: pointer;
        display: unset !important;
      }
    `,
            ],
            template: `
    <li [class.completed]="todo.completed">
      <div class="view" appTooltip>
        <input class="toggle" type="checkbox" [checked]="todo.completed" (change)="toggle()" />
        <label (dblclick)="enableEditMode()" [style.display]="editMode ? 'none' : 'block'">{{
          todo.label
        }}</label>
        <button class="destroy" (click)="delete.emit(todo)"></button>
      </div>
      <input
        class="edit"
        [value]="todo.label"
        [style.display]="editMode ? 'block' : 'none'"
        (keydown.enter)="completeEdit($any($event.target).value)"
      />
    </li>
  `,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _todo_decorators;
    let _todo_initializers = [];
    let _todo_extraInitializers = [];
    let _update_decorators;
    let _update_initializers = [];
    let _update_extraInitializers = [];
    let _delete_decorators;
    let _delete_initializers = [];
    let _delete_extraInitializers = [];
    var TodoComponent = _classThis = class {
        constructor() {
            this.todo = __runInitializers(this, _todo_initializers, void 0);
            this.update = (__runInitializers(this, _todo_extraInitializers), __runInitializers(this, _update_initializers, new core_1.EventEmitter()));
            this.delete = (__runInitializers(this, _update_extraInitializers), __runInitializers(this, _delete_initializers, new core_1.EventEmitter()));
            this.editMode = (__runInitializers(this, _delete_extraInitializers), false);
        }
        toggle() {
            this.todo.completed = !this.todo.completed;
            this.update.emit(this.todo);
        }
        completeEdit(label) {
            this.todo.label = label;
            this.editMode = false;
            this.update.emit(this.todo);
        }
        enableEditMode() {
            this.editMode = true;
        }
    };
    __setFunctionName(_classThis, "TodoComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _todo_decorators = [(0, core_1.Input)()];
        _update_decorators = [(0, core_1.Output)()];
        _delete_decorators = [(0, core_1.Output)()];
        __esDecorate(null, null, _todo_decorators, { kind: "field", name: "todo", static: false, private: false, access: { has: obj => "todo" in obj, get: obj => obj.todo, set: (obj, value) => { obj.todo = value; } }, metadata: _metadata }, _todo_initializers, _todo_extraInitializers);
        __esDecorate(null, null, _update_decorators, { kind: "field", name: "update", static: false, private: false, access: { has: obj => "update" in obj, get: obj => obj.update, set: (obj, value) => { obj.update = value; } }, metadata: _metadata }, _update_initializers, _update_extraInitializers);
        __esDecorate(null, null, _delete_decorators, { kind: "field", name: "delete", static: false, private: false, access: { has: obj => "delete" in obj, get: obj => obj.delete, set: (obj, value) => { obj.delete = value; } }, metadata: _metadata }, _delete_initializers, _delete_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TodoComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TodoComponent = _classThis;
})();
exports.TodoComponent = TodoComponent;
