"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.enableProfiling = enableProfiling;
const di_1 = require("../../di");
const provider_collection_1 = require("../../di/provider_collection");
const assert_1 = require("../../util/assert");
const performance_1 = require("../../util/performance");
const profiler_1 = require("../profiler");
const stringify_utils_1 = require("../util/stringify_utils");
const injector_profiler_1 = require("./injector_profiler");
let changeDetectionRuns = 0;
let changeDetectionSyncRuns = 0;
let counter = 0;
const eventsStack = [];
function measureStart(startEvent) {
    eventsStack.push([startEvent, counter]);
    console.timeStamp('Event_' + startEvent + '_' + counter++);
}
function measureEnd(startEvent, entryName, color) {
    const top = eventsStack.pop();
    (0, assert_1.assertDefined)(top, 'Profiling error: could not find start event entry ' + startEvent);
    (0, assert_1.assertEqual)(top[0], startEvent, `Profiling error: expected to see ${startEvent} event but got ${top[0]}`);
    // Expecting TypeScript error here as overloaded types are not supported yet in TS types
    console.timeStamp(entryName, 'Event_' + top[0] + '_' + top[1], undefined, '\u{1F170}\uFE0F Angular', undefined, color);
}
const chromeDevToolsInjectorProfiler = (event) => {
    const eventType = event.type;
    if (eventType === 4 /* InjectorProfilerEventType.InjectorToCreateInstanceEvent */) {
        measureStart(100 /* ProfilerDIEvent.InjectorToCreateInstanceEvent */);
    }
    else if (eventType === 1 /* InjectorProfilerEventType.InstanceCreatedByInjector */) {
        const token = event.context.token;
        measureEnd(100 /* ProfilerDIEvent.InjectorToCreateInstanceEvent */, getProviderTokenMeasureName(token), 'tertiary-dark');
    }
};
const devToolsProfiler = (event, instance, eventFn) => {
    switch (event) {
        case 8 /* ProfilerEvent.BootstrapApplicationStart */:
        case 10 /* ProfilerEvent.BootstrapComponentStart */:
        case 12 /* ProfilerEvent.ChangeDetectionStart */:
        case 14 /* ProfilerEvent.ChangeDetectionSyncStart */:
        case 16 /* ProfilerEvent.AfterRenderHooksStart */:
        case 18 /* ProfilerEvent.ComponentStart */:
        case 20 /* ProfilerEvent.DeferBlockStateStart */:
        case 22 /* ProfilerEvent.DynamicComponentStart */:
        case 0 /* ProfilerEvent.TemplateCreateStart */:
        case 4 /* ProfilerEvent.LifecycleHookStart */:
        case 2 /* ProfilerEvent.TemplateUpdateStart */:
        case 24 /* ProfilerEvent.HostBindingsUpdateStart */:
        case 6 /* ProfilerEvent.OutputStart */: {
            measureStart(event);
            break;
        }
        case 9 /* ProfilerEvent.BootstrapApplicationEnd */: {
            measureEnd(8 /* ProfilerEvent.BootstrapApplicationStart */, 'Bootstrap application', 'primary-dark');
            break;
        }
        case 11 /* ProfilerEvent.BootstrapComponentEnd */: {
            measureEnd(10 /* ProfilerEvent.BootstrapComponentStart */, 'Bootstrap component', 'primary-dark');
            break;
        }
        case 13 /* ProfilerEvent.ChangeDetectionEnd */: {
            changeDetectionSyncRuns = 0;
            measureEnd(12 /* ProfilerEvent.ChangeDetectionStart */, 'Change detection ' + changeDetectionRuns++, 'primary-dark');
            break;
        }
        case 15 /* ProfilerEvent.ChangeDetectionSyncEnd */: {
            measureEnd(14 /* ProfilerEvent.ChangeDetectionSyncStart */, 'Synchronization ' + changeDetectionSyncRuns++, 'primary');
            break;
        }
        case 17 /* ProfilerEvent.AfterRenderHooksEnd */: {
            measureEnd(16 /* ProfilerEvent.AfterRenderHooksStart */, 'After render hooks', 'primary');
            break;
        }
        case 19 /* ProfilerEvent.ComponentEnd */: {
            const typeName = getComponentMeasureName(instance);
            measureEnd(18 /* ProfilerEvent.ComponentStart */, typeName, 'primary-light');
            break;
        }
        case 21 /* ProfilerEvent.DeferBlockStateEnd */: {
            measureEnd(20 /* ProfilerEvent.DeferBlockStateStart */, 'Defer block', 'primary-dark');
            break;
        }
        case 23 /* ProfilerEvent.DynamicComponentEnd */: {
            measureEnd(22 /* ProfilerEvent.DynamicComponentStart */, 'Dynamic component creation', 'primary-dark');
            break;
        }
        case 3 /* ProfilerEvent.TemplateUpdateEnd */: {
            measureEnd(2 /* ProfilerEvent.TemplateUpdateStart */, (0, stringify_utils_1.stringifyForError)(eventFn) + ' (update)', 'secondary-dark');
            break;
        }
        case 1 /* ProfilerEvent.TemplateCreateEnd */: {
            measureEnd(0 /* ProfilerEvent.TemplateCreateStart */, (0, stringify_utils_1.stringifyForError)(eventFn) + ' (create)', 'secondary');
            break;
        }
        case 25 /* ProfilerEvent.HostBindingsUpdateEnd */: {
            measureEnd(24 /* ProfilerEvent.HostBindingsUpdateStart */, 'HostBindings', 'secondary-dark');
            break;
        }
        case 5 /* ProfilerEvent.LifecycleHookEnd */: {
            const typeName = getComponentMeasureName(instance);
            measureEnd(4 /* ProfilerEvent.LifecycleHookStart */, `${typeName}:${(0, stringify_utils_1.stringifyForError)(eventFn)}`, 'tertiary');
            break;
        }
        case 7 /* ProfilerEvent.OutputEnd */: {
            measureEnd(6 /* ProfilerEvent.OutputStart */, (0, stringify_utils_1.stringifyForError)(eventFn), 'tertiary-light');
            break;
        }
        default: {
            throw new Error('Unexpected profiling event type: ' + event);
        }
    }
};
function getComponentMeasureName(instance) {
    return instance.constructor.name;
}
function getProviderTokenMeasureName(token) {
    if (token instanceof di_1.InjectionToken) {
        return token.toString();
    }
    else if ((0, provider_collection_1.isTypeProvider)(token)) {
        return token.name;
    }
    else {
        return getProviderTokenMeasureName(token.provide);
    }
}
/**
 * Start listening to the Angular's internal performance-related events and route those to the Chrome DevTools performance panel.
 * This enables Angular-specific data visualization when recording a performance profile directly in the Chrome DevTools.
 *
 * @returns a function that can be invoked to stop sending profiling data.
 */
function enableProfiling() {
    (0, performance_1.performanceMarkFeature)('Chrome DevTools profiling');
    const removeInjectorProfiler = (0, injector_profiler_1.setInjectorProfiler)(chromeDevToolsInjectorProfiler);
    const removeProfiler = (0, profiler_1.setProfiler)(devToolsProfiler);
    return () => {
        removeInjectorProfiler();
        removeProfiler();
    };
}
