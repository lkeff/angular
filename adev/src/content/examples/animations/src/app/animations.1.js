"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.triggerAnimation = exports.sharedAnimation = exports.transitionAnimation = void 0;
// #docplaster
// #docregion animation-const, trigger-const
const animations_1 = require("@angular/animations");
// #enddocregion trigger-const
exports.transitionAnimation = (0, animations_1.animation)([
    (0, animations_1.style)({
        height: '{{ height }}',
        opacity: '{{ opacity }}',
        backgroundColor: '{{ backgroundColor }}',
    }),
    (0, animations_1.animate)('{{ time }}'),
]);
// #enddocregion animation-const
// #docregion animation-example
exports.sharedAnimation = (0, animations_1.animation)([
    (0, animations_1.style)({
        height: 0,
        opacity: 1,
        backgroundColor: 'red',
    }),
    (0, animations_1.animate)('1s'),
]);
// #enddocregion animation-example
// #docregion trigger-const
exports.triggerAnimation = (0, animations_1.trigger)('openClose', [
    (0, animations_1.transition)('open => closed', [
        (0, animations_1.useAnimation)(exports.transitionAnimation, {
            params: {
                height: 0,
                opacity: 1,
                backgroundColor: 'red',
                time: '1s',
            },
        }),
    ]),
]);
// #enddocregion trigger-const
