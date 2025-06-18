"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slideInAnimation = exports.transitionAnimation = void 0;
const animations_1 = require("@angular/animations");
exports.transitionAnimation = (0, animations_1.animation)([
    (0, animations_1.style)({
        height: '{{ height }}',
        opacity: '{{ opacity }}',
        backgroundColor: '{{ backgroundColor }}',
    }),
    (0, animations_1.animate)('{{ time }}'),
]);
// Routable animations
// #docregion route-animations
exports.slideInAnimation = 
// #docregion style-view
(0, animations_1.trigger)('routeAnimations', [
    (0, animations_1.transition)('HomePage <=> AboutPage', [
        (0, animations_1.style)({ position: 'relative' }),
        (0, animations_1.query)(':enter, :leave', [
            (0, animations_1.style)({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
            }),
        ]),
        // #enddocregion style-view
        // #docregion query
        (0, animations_1.query)(':enter', [(0, animations_1.style)({ left: '-100%' })], { optional: true }),
        (0, animations_1.query)(':leave', (0, animations_1.animateChild)(), { optional: true }),
        (0, animations_1.group)([
            (0, animations_1.query)(':leave', [(0, animations_1.animate)('300ms ease-out', (0, animations_1.style)({ left: '100%' }))], { optional: true }),
            (0, animations_1.query)(':enter', [(0, animations_1.animate)('300ms ease-out', (0, animations_1.style)({ left: '0%' }))], { optional: true }),
        ]),
    ]),
    (0, animations_1.transition)('* <=> *', [
        (0, animations_1.style)({ position: 'relative' }),
        (0, animations_1.query)(':enter, :leave', [
            (0, animations_1.style)({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
            }),
        ], { optional: true }),
        (0, animations_1.query)(':enter', [(0, animations_1.style)({ left: '-100%' })], { optional: true }),
        (0, animations_1.query)(':leave', (0, animations_1.animateChild)(), { optional: true }),
        (0, animations_1.group)([
            (0, animations_1.query)(':leave', [(0, animations_1.animate)('200ms ease-out', (0, animations_1.style)({ left: '100%', opacity: 0 }))], {
                optional: true,
            }),
            (0, animations_1.query)(':enter', [(0, animations_1.animate)('300ms ease-out', (0, animations_1.style)({ left: '0%' }))], { optional: true }),
            (0, animations_1.query)('@*', (0, animations_1.animateChild)(), { optional: true }),
        ]),
    ]),
    // #enddocregion query
]);
// #enddocregion route-animations
