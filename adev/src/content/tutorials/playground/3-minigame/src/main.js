"use strict";
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
exports.PlaygroundComponent = void 0;
const a11y_1 = require("@angular/cdk/a11y");
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const slide_toggle_1 = require("@angular/material/slide-toggle");
const platform_browser_1 = require("@angular/platform-browser");
const RESULT_QUOTES = [
    [
        'Not quite right!',
        'You missed the mark!',
        'Have you seen an angle before?',
        'Your measurements are all over the place!',
        'Your precision needs work!',
    ],
    ['Not too shabby.', 'Getting sharper, keep it up!', 'Not perfect, but getting better!'],
    [
        'Your angles are on point!',
        'Your precision is unparalleled!',
        'Your geometric skills are divine!',
        "Amazing! You're acute-y!",
        'Wow! So precise!',
    ],
];
const CHANGING_QUOTES = [
    ["I'm such a-cute-y!", "I'm a tiny slice of pi!", "You're doing great!"],
    ["I'm wide open!", 'Keep going!', 'Wow!', 'Wheee!!'],
    ["I'm so obtuse!", 'The bigger the better!', "Life's too short for right angles!", 'Whoa!'],
];
function getChangingQuote(rotateValue) {
    let possibleQuotes = CHANGING_QUOTES[1];
    if (rotateValue < 110) {
        possibleQuotes = CHANGING_QUOTES[0];
    }
    else if (rotateValue >= 230) {
        possibleQuotes = CHANGING_QUOTES[2];
    }
    const randomQuoteIndex = Math.floor(Math.random() * possibleQuotes.length);
    return possibleQuotes[randomQuoteIndex];
}
function getResultQuote(accuracy) {
    let possibleQuotes = RESULT_QUOTES[1];
    if (accuracy < 50) {
        possibleQuotes = RESULT_QUOTES[0];
    }
    else if (accuracy >= 85) {
        possibleQuotes = RESULT_QUOTES[2];
    }
    let randomQuoteIndex = Math.floor(Math.random() * possibleQuotes.length);
    return possibleQuotes[randomQuoteIndex];
}
let PlaygroundComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-root',
            imports: [common_1.CommonModule, slide_toggle_1.MatSlideToggleModule, a11y_1.A11yModule],
            styleUrl: 'game.css',
            templateUrl: 'game.html',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _staticArrow_decorators;
    let _staticArrow_initializers = [];
    let _staticArrow_extraInitializers = [];
    var PlaygroundComponent = _classThis = class {
        constructor() {
            this.isGuessModalOpen = (0, core_1.signal)(false);
            this.isAccessiblePanelOpen = (0, core_1.signal)(false);
            this.rotateVal = (0, core_1.signal)(40);
            this.goal = (0, core_1.signal)(85);
            this.animatedAccuracy = (0, core_1.signal)(0);
            this.gameStats = (0, core_1.signal)({
                level: 0,
                totalAccuracy: 0,
            });
            this.resultQuote = (0, core_1.signal)('');
            this.isDragging = false;
            this.currentInteractions = {
                lastChangedAt: 75,
                face: 0,
                quote: "Hi, I'm NG the Angle!",
            };
            this.staticArrow = __runInitializers(this, _staticArrow_initializers, void 0);
            this.totalAccuracyPercentage = (__runInitializers(this, _staticArrow_extraInitializers), (0, core_1.computed)(() => {
                const { level, totalAccuracy } = this.gameStats();
                if (level === 0) {
                    return 0;
                }
                return totalAccuracy / level;
            }));
            this.updatedInteractions = (0, core_1.computed)(() => {
                if (this.rotateVal() > 75 &&
                    Math.abs(this.rotateVal() - this.currentInteractions.lastChangedAt) > 70 &&
                    Math.random() > 0.5) {
                    this.currentInteractions = {
                        lastChangedAt: this.rotateVal(),
                        face: Math.floor(Math.random() * 6),
                        quote: getChangingQuote(this.rotateVal()),
                    };
                }
                return this.currentInteractions;
            });
            this.resetGame();
        }
        resetGame() {
            this.goal.set(Math.floor(Math.random() * 360));
            this.rotateVal.set(40);
        }
        getRotation() {
            return `rotate(${this.rotateVal()}deg)`;
        }
        getIndicatorStyle() {
            return 0.487 * this.rotateVal() - 179.5;
        }
        getIndicatorRotation() {
            return `rotate(${253 + this.rotateVal()}deg)`;
        }
        mouseDown() {
            this.isDragging = true;
        }
        stopDragging() {
            this.isDragging = false;
        }
        mouseMove(e) {
            const vh30 = 0.3 * document.documentElement.clientHeight;
            if (!this.isDragging)
                return;
            let pointX = e.pageX - (this.staticArrow.nativeElement.offsetLeft + 2.5);
            let pointY = e.pageY - (this.staticArrow.nativeElement.offsetTop + vh30);
            let calculatedAngle = 0;
            if (pointX >= 0 && pointY < 0) {
                calculatedAngle = 90 - (Math.atan2(Math.abs(pointY), pointX) * 180) / Math.PI;
            }
            else if (pointX >= 0 && pointY >= 0) {
                calculatedAngle = 90 + (Math.atan2(pointY, pointX) * 180) / Math.PI;
            }
            else if (pointX < 0 && pointY >= 0) {
                calculatedAngle = 270 - (Math.atan2(pointY, Math.abs(pointX)) * 180) / Math.PI;
            }
            else {
                calculatedAngle = 270 + (Math.atan2(Math.abs(pointY), Math.abs(pointX)) * 180) / Math.PI;
            }
            this.rotateVal.set(calculatedAngle);
        }
        adjustAngle(degreeChange) {
            this.rotateVal.update((x) => x + degreeChange < 0 ? 360 + (x + degreeChange) : (x + degreeChange) % 360);
        }
        touchMove(e) {
            let firstTouch = e.touches[0];
            if (firstTouch) {
                this.mouseMove({ pageX: firstTouch.pageX, pageY: firstTouch.pageY });
            }
        }
        guess() {
            this.isGuessModalOpen.set(true);
            const calcAcc = Math.abs(100 - (Math.abs(this.goal() - this.rotateVal()) / 180) * 100);
            this.resultQuote.set(getResultQuote(calcAcc));
            this.animatedAccuracy.set(calcAcc > 20 ? calcAcc - 20 : 0);
            this.powerUpAccuracy(calcAcc);
            this.gameStats.update(({ level, totalAccuracy }) => ({
                level: level + 1,
                totalAccuracy: totalAccuracy + calcAcc,
            }));
        }
        powerUpAccuracy(finalAcc) {
            if (this.animatedAccuracy() >= finalAcc)
                return;
            let difference = finalAcc - this.animatedAccuracy();
            if (difference > 20) {
                this.animatedAccuracy.update((x) => x + 10.52);
                setTimeout(() => this.powerUpAccuracy(finalAcc), 30);
            }
            else if (difference > 4) {
                this.animatedAccuracy.update((x) => x + 3.31);
                setTimeout(() => this.powerUpAccuracy(finalAcc), 40);
            }
            else if (difference > 0.5) {
                this.animatedAccuracy.update((x) => x + 0.49);
                setTimeout(() => this.powerUpAccuracy(finalAcc), 50);
            }
            else if (difference >= 0.1) {
                this.animatedAccuracy.update((x) => x + 0.1);
                setTimeout(() => this.powerUpAccuracy(finalAcc), 100);
            }
            else {
                this.animatedAccuracy.update((x) => x + 0.01);
                setTimeout(() => this.powerUpAccuracy(finalAcc), 100);
            }
        }
        close() {
            this.isGuessModalOpen.set(false);
            this.resetGame();
        }
        getText() {
            const roundedAcc = Math.floor(this.totalAccuracyPercentage() * 10) / 10;
            let emojiAccuracy = '';
            for (let i = 0; i < 5; i++) {
                emojiAccuracy += roundedAcc >= 20 * (i + 1) ? '🟩' : '⬜️';
            }
            return encodeURIComponent(`📐 ${emojiAccuracy} \n My angles are ${roundedAcc}% accurate on level ${this.gameStats().level}. \n\nHow @Angular are you? \nhttps://angular.dev/playground`);
        }
        toggleA11yControls(event) {
            this.isAccessiblePanelOpen.set(event.checked);
        }
    };
    __setFunctionName(_classThis, "PlaygroundComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _staticArrow_decorators = [(0, core_1.ViewChild)('staticArrow')];
        __esDecorate(null, null, _staticArrow_decorators, { kind: "field", name: "staticArrow", static: false, private: false, access: { has: obj => "staticArrow" in obj, get: obj => obj.staticArrow, set: (obj, value) => { obj.staticArrow = value; } }, metadata: _metadata }, _staticArrow_initializers, _staticArrow_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PlaygroundComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PlaygroundComponent = _classThis;
})();
exports.PlaygroundComponent = PlaygroundComponent;
(0, platform_browser_1.bootstrapApplication)(PlaygroundComponent);
