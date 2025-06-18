"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SplitComponent = void 0;
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const utils_1 = require("./utils");
/**
 * angular-split
 *
 *
 *  PERCENT MODE ([unit]="'percent'")
 *  ___________________________________________________________________________________________
 * |       A       [g1]       B       [g2]       C       [g3]       D       [g4]       E       |
 * |-------------------------------------------------------------------------------------------|
 * |       20                 30                 20                 15                 15      | <--
 * [size]="x" |               10px               10px               10px               10px | <--
 * [gutterSize]="10" |calc(20% - 8px)    calc(30% - 12px)   calc(20% - 8px)    calc(15% - 6px)
 * calc(15% - 6px)| <-- CSS flex-basis property (with flex-grow&shrink at 0) |     152px 228px 152px
 * 114px              114px     | <-- el.getBoundingClientRect().width
 * |___________________________________________________________________________________________|
 *                                                                                 800px         <--
 * el.getBoundingClientRect().width flex-basis = calc( { area.size }% - { area.size/100 *
 * nbGutter*gutterSize }px );
 *
 *
 *  PIXEL MODE ([unit]="'pixel'")
 *  ___________________________________________________________________________________________
 * |       A       [g1]       B       [g2]       C       [g3]       D       [g4]       E       |
 * |-------------------------------------------------------------------------------------------|
 * |      100                250                 *                 150                100      | <--
 * [size]="y" |               10px               10px               10px               10px | <--
 * [gutterSize]="10" |   0 0 100px          0 0 250px           1 1 auto          0 0 150px 0 0
 * 100px   | <-- CSS flex property (flex-grow/flex-shrink/flex-basis) |     100px              250px
 * 200px              150px              100px     | <-- el.getBoundingClientRect().width
 * |___________________________________________________________________________________________|
 *                                                                                 800px         <--
 * el.getBoundingClientRect().width
 *
 */
let SplitComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'as-split',
            exportAs: 'asSplit',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            styleUrls: [`./split.component.scss`],
            template: ` <ng-content></ng-content>
    @for (_ of displayedAreas; track $index) { @if ($last === false) {
    <div
      #gutterEls
      class="as-split-gutter"
      [style.flex-basis.px]="gutterSize"
      [style.order]="$index * 2 + 1"
      (mousedown)="startDragging($event, $index * 2 + 1, $index + 1)"
      (touchstart)="startDragging($event, $index * 2 + 1, $index + 1)"
      (mouseup)="clickGutter($event, $index + 1)"
      (touchend)="clickGutter($event, $index + 1)"
    >
      <div class="as-split-gutter-icon"></div>
    </div>
    } }`,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _set_direction_decorators;
    let _set_unit_decorators;
    let _set_gutterSize_decorators;
    let _set_gutterStep_decorators;
    let _set_restrictMove_decorators;
    let _set_useTransition_decorators;
    let _set_disabled_decorators;
    let _set_dir_decorators;
    let _set_gutterDblClickDuration_decorators;
    let _dragStart_decorators;
    let _dragStart_initializers = [];
    let _dragStart_extraInitializers = [];
    let _dragEnd_decorators;
    let _dragEnd_initializers = [];
    let _dragEnd_extraInitializers = [];
    let _gutterClick_decorators;
    let _gutterClick_initializers = [];
    let _gutterClick_extraInitializers = [];
    let _gutterDblClick_decorators;
    let _gutterDblClick_initializers = [];
    let _gutterDblClick_extraInitializers = [];
    let _get_transitionEnd_decorators;
    let _gutterEls_decorators;
    let _gutterEls_initializers = [];
    let _gutterEls_extraInitializers = [];
    var SplitComponent = _classThis = class {
        set direction(v) {
            this._direction = v === 'vertical' ? 'vertical' : 'horizontal';
            this.renderer.addClass(this.elRef.nativeElement, `as-${this._direction}`);
            this.renderer.removeClass(this.elRef.nativeElement, `as-${this._direction === 'vertical' ? 'horizontal' : 'vertical'}`);
            this.build(false, false);
        }
        get direction() {
            return this._direction;
        }
        set unit(v) {
            this._unit = v === 'pixel' ? 'pixel' : 'percent';
            this.renderer.addClass(this.elRef.nativeElement, `as-${this._unit}`);
            this.renderer.removeClass(this.elRef.nativeElement, `as-${this._unit === 'pixel' ? 'percent' : 'pixel'}`);
            this.build(false, true);
        }
        get unit() {
            return this._unit;
        }
        set gutterSize(v) {
            this._gutterSize = (0, utils_1.getInputPositiveNumber)(v, 11);
            this.build(false, false);
        }
        get gutterSize() {
            return this._gutterSize;
        }
        set gutterStep(v) {
            this._gutterStep = (0, utils_1.getInputPositiveNumber)(v, 1);
        }
        get gutterStep() {
            return this._gutterStep;
        }
        set restrictMove(v) {
            this._restrictMove = (0, utils_1.getInputBoolean)(v);
        }
        get restrictMove() {
            return this._restrictMove;
        }
        set useTransition(v) {
            this._useTransition = (0, utils_1.getInputBoolean)(v);
            if (this._useTransition)
                this.renderer.addClass(this.elRef.nativeElement, 'as-transition');
            else
                this.renderer.removeClass(this.elRef.nativeElement, 'as-transition');
        }
        get useTransition() {
            return this._useTransition;
        }
        set disabled(v) {
            this._disabled = (0, utils_1.getInputBoolean)(v);
            if (this._disabled)
                this.renderer.addClass(this.elRef.nativeElement, 'as-disabled');
            else
                this.renderer.removeClass(this.elRef.nativeElement, 'as-disabled');
        }
        get disabled() {
            return this._disabled;
        }
        set dir(v) {
            this._dir = v === 'rtl' ? 'rtl' : 'ltr';
            this.renderer.setAttribute(this.elRef.nativeElement, 'dir', this._dir);
        }
        get dir() {
            return this._dir;
        }
        set gutterDblClickDuration(v) {
            this._gutterDblClickDuration = (0, utils_1.getInputPositiveNumber)(v, 0);
        }
        get gutterDblClickDuration() {
            return this._gutterDblClickDuration;
        }
        get transitionEnd() {
            return new rxjs_1.Observable((subscriber) => (this.transitionEndSubscriber = subscriber)).pipe((0, operators_1.debounceTime)(20));
        }
        constructor(ngZone, elRef, cdRef, renderer) {
            this.ngZone = (__runInitializers(this, _instanceExtraInitializers), ngZone);
            this.elRef = elRef;
            this.cdRef = cdRef;
            this.renderer = renderer;
            this._direction = 'horizontal';
            ////
            this._unit = 'percent';
            ////
            this._gutterSize = 11;
            ////
            this._gutterStep = 1;
            ////
            this._restrictMove = false;
            ////
            this._useTransition = false;
            ////
            this._disabled = false;
            ////
            this._dir = 'ltr';
            ////
            this._gutterDblClickDuration = 0;
            ////
            this.dragStart = __runInitializers(this, _dragStart_initializers, new core_1.EventEmitter(false));
            this.dragEnd = (__runInitializers(this, _dragStart_extraInitializers), __runInitializers(this, _dragEnd_initializers, new core_1.EventEmitter(false)));
            this.gutterClick = (__runInitializers(this, _dragEnd_extraInitializers), __runInitializers(this, _gutterClick_initializers, new core_1.EventEmitter(false)));
            this.gutterDblClick = (__runInitializers(this, _gutterClick_extraInitializers), __runInitializers(this, _gutterDblClick_initializers, new core_1.EventEmitter(false)));
            this.transitionEndSubscriber = (__runInitializers(this, _gutterDblClick_extraInitializers), null);
            this.dragProgressSubject = new rxjs_1.Subject();
            this.dragProgress$ = this.dragProgressSubject.asObservable();
            ////
            this.isDragging = false;
            this.dragListeners = [];
            this.snapshot = null;
            this.startPoint = null;
            this.endPoint = null;
            this.displayedAreas = [];
            this.hidedAreas = [];
            this.gutterEls = __runInitializers(this, _gutterEls_initializers, void 0);
            this._clickTimeout = (__runInitializers(this, _gutterEls_extraInitializers), null);
            // To force adding default class, could be override by user @Input() or not
            this.direction = this._direction;
        }
        ngAfterViewInit() {
            this.ngZone.runOutsideAngular(() => {
                // To avoid transition at first rendering
                setTimeout(() => this.renderer.addClass(this.elRef.nativeElement, 'as-init'));
            });
        }
        getNbGutters() {
            return this.displayedAreas.length === 0 ? 0 : this.displayedAreas.length - 1;
        }
        addArea(component) {
            const newArea = {
                component,
                order: 0,
                size: 0,
                minSize: null,
                maxSize: null,
            };
            if (component.visible === true) {
                this.displayedAreas.push(newArea);
                this.build(true, true);
            }
            else {
                this.hidedAreas.push(newArea);
            }
        }
        removeArea(component) {
            if (this.displayedAreas.some((a) => a.component === component)) {
                const area = this.displayedAreas.find((a) => a.component === component);
                this.displayedAreas.splice(this.displayedAreas.indexOf(area), 1);
                this.build(true, true);
            }
            else if (this.hidedAreas.some((a) => a.component === component)) {
                const area = this.hidedAreas.find((a) => a.component === component);
                this.hidedAreas.splice(this.hidedAreas.indexOf(area), 1);
            }
        }
        updateArea(component, resetOrders, resetSizes) {
            if (component.visible === true) {
                this.build(resetOrders, resetSizes);
            }
        }
        showArea(component) {
            const area = this.hidedAreas.find((a) => a.component === component);
            if (area === undefined) {
                return;
            }
            const areas = this.hidedAreas.splice(this.hidedAreas.indexOf(area), 1);
            this.displayedAreas.push(...areas);
            this.build(true, true);
        }
        hideArea(comp) {
            const area = this.displayedAreas.find((a) => a.component === comp);
            if (area === undefined) {
                return;
            }
            const areas = this.displayedAreas.splice(this.displayedAreas.indexOf(area), 1);
            areas.forEach((area) => {
                area.order = 0;
                area.size = 0;
            });
            this.hidedAreas.push(...areas);
            this.build(true, true);
        }
        getVisibleAreaSizes() {
            return this.displayedAreas.map((a) => (a.size === null ? '*' : a.size));
        }
        setVisibleAreaSizes(sizes) {
            if (sizes.length !== this.displayedAreas.length) {
                return false;
            }
            const formattedSizes = sizes.map((s) => (0, utils_1.getInputPositiveNumber)(s, null));
            const isValid = (0, utils_1.isUserSizesValid)(this.unit, formattedSizes);
            if (isValid === false) {
                return false;
            }
            // @ts-ignore
            this.displayedAreas.forEach((area, i) => (area.component._size = formattedSizes[i]));
            this.build(false, true);
            return true;
        }
        build(resetOrders, resetSizes) {
            this.stopDragging();
            // ¤ AREAS ORDER
            if (resetOrders === true) {
                // If user provided 'order' for each area, use it to sort them.
                if (this.displayedAreas.every((a) => a.component.order !== null)) {
                    this.displayedAreas.sort((a, b) => a.component.order - b.component.order);
                }
                // Then set real order with multiples of 2, numbers between will be used by gutters.
                this.displayedAreas.forEach((area, i) => {
                    area.order = i * 2;
                    area.component.setStyleOrder(area.order);
                });
            }
            // ¤ AREAS SIZE
            if (resetSizes === true) {
                const useUserSizes = (0, utils_1.isUserSizesValid)(this.unit, this.displayedAreas.map((a) => a.component.size));
                switch (this.unit) {
                    case 'percent': {
                        const defaultSize = 100 / this.displayedAreas.length;
                        this.displayedAreas.forEach((area) => {
                            area.size = useUserSizes ? area.component.size : defaultSize;
                            area.minSize = (0, utils_1.getAreaMinSize)(area);
                            area.maxSize = (0, utils_1.getAreaMaxSize)(area);
                        });
                        break;
                    }
                    case 'pixel': {
                        if (useUserSizes) {
                            this.displayedAreas.forEach((area) => {
                                area.size = area.component.size;
                                area.minSize = (0, utils_1.getAreaMinSize)(area);
                                area.maxSize = (0, utils_1.getAreaMaxSize)(area);
                            });
                        }
                        else {
                            const wildcardSizeAreas = this.displayedAreas.filter((a) => a.component.size === null);
                            // No wildcard area > Need to select one arbitrarily > first
                            if (wildcardSizeAreas.length === 0 && this.displayedAreas.length > 0) {
                                this.displayedAreas.forEach((area, i) => {
                                    area.size = i === 0 ? null : area.component.size;
                                    area.minSize = i === 0 ? null : (0, utils_1.getAreaMinSize)(area);
                                    area.maxSize = i === 0 ? null : (0, utils_1.getAreaMaxSize)(area);
                                });
                            }
                            // More than one wildcard area > Need to keep only one arbitrarily > first
                            else if (wildcardSizeAreas.length > 1) {
                                let alreadyGotOne = false;
                                this.displayedAreas.forEach((area) => {
                                    if (area.component.size === null) {
                                        if (alreadyGotOne === false) {
                                            area.size = null;
                                            area.minSize = null;
                                            area.maxSize = null;
                                            alreadyGotOne = true;
                                        }
                                        else {
                                            area.size = 100;
                                            area.minSize = null;
                                            area.maxSize = null;
                                        }
                                    }
                                    else {
                                        area.size = area.component.size;
                                        area.minSize = (0, utils_1.getAreaMinSize)(area);
                                        area.maxSize = (0, utils_1.getAreaMaxSize)(area);
                                    }
                                });
                            }
                        }
                        break;
                    }
                }
            }
            this.refreshStyleSizes();
            this.cdRef.markForCheck();
        }
        refreshStyleSizes() {
            ///////////////////////////////////////////
            // PERCENT MODE
            if (this.unit === 'percent') {
                // Only one area > flex-basis 100%
                if (this.displayedAreas.length === 1) {
                    this.displayedAreas[0].component.setStyleFlex(0, 0, `100%`, false, false);
                }
                // Multiple areas > use each percent basis
                else {
                    // Size in pixels
                    const visibleGutterSize = 1;
                    // Use visible gutter size in calculation instead of the invisible draggable gutter
                    const sumGutterSize = this.getNbGutters() * visibleGutterSize;
                    this.displayedAreas.forEach((area) => {
                        area.component.setStyleFlex(0, 0, `calc( ${area.size}% - ${(area.size / 100) * sumGutterSize}px )`, area.minSize !== null && area.minSize === area.size ? true : false, area.maxSize !== null && area.maxSize === area.size ? true : false);
                    });
                }
            }
            ///////////////////////////////////////////
            // PIXEL MODE
            else if (this.unit === 'pixel') {
                this.displayedAreas.forEach((area) => {
                    // Area with wildcard size
                    if (area.size === null) {
                        if (this.displayedAreas.length === 1) {
                            area.component.setStyleFlex(1, 1, `100%`, false, false);
                        }
                        else {
                            area.component.setStyleFlex(1, 1, `auto`, false, false);
                        }
                    }
                    // Area with pixel size
                    else {
                        // Only one area > flex-basis 100%
                        if (this.displayedAreas.length === 1) {
                            area.component.setStyleFlex(0, 0, `100%`, false, false);
                        }
                        // Multiple areas > use each pixel basis
                        else {
                            area.component.setStyleFlex(0, 0, `${area.size}px`, area.minSize !== null && area.minSize === area.size ? true : false, area.maxSize !== null && area.maxSize === area.size ? true : false);
                        }
                    }
                });
            }
        }
        clickGutter(event, gutterNum) {
            const tempPoint = (0, utils_1.getPointFromEvent)(event);
            // Be sure mouseup/touchend happened at same point as mousedown/touchstart to trigger
            // click/dblclick
            if (this.startPoint &&
                this.startPoint.x === tempPoint.x &&
                this.startPoint.y === tempPoint.y) {
                // If timeout in progress and new click > clearTimeout & dblClickEvent
                if (this._clickTimeout !== null) {
                    window.clearTimeout(this._clickTimeout);
                    this._clickTimeout = null;
                    this.notify('dblclick', gutterNum);
                    this.stopDragging();
                }
                // Else start timeout to call clickEvent at end
                else {
                    this._clickTimeout = window.setTimeout(() => {
                        this._clickTimeout = null;
                        this.notify('click', gutterNum);
                        this.stopDragging();
                    }, this.gutterDblClickDuration);
                }
            }
        }
        startDragging(event, gutterOrder, gutterNum) {
            event.preventDefault();
            event.stopPropagation();
            this.startPoint = (0, utils_1.getPointFromEvent)(event);
            if (this.startPoint === null || this.disabled === true) {
                return;
            }
            this.snapshot = {
                gutterNum,
                lastSteppedOffset: 0,
                allAreasSizePixel: (0, utils_1.getElementPixelSize)(this.elRef, this.direction) - this.getNbGutters() * this.gutterSize,
                allInvolvedAreasSizePercent: 100,
                areasBeforeGutter: [],
                areasAfterGutter: [],
            };
            this.displayedAreas.forEach((area) => {
                const areaSnapshot = {
                    area,
                    sizePixelAtStart: (0, utils_1.getElementPixelSize)(area.component.elRef, this.direction),
                    sizePercentAtStart: (this.unit === 'percent' ? area.size : -1), // If pixel mode, anyway, will not be used.
                };
                if (area.order < gutterOrder) {
                    if (this.restrictMove === true) {
                        this.snapshot.areasBeforeGutter = [areaSnapshot];
                    }
                    else {
                        this.snapshot.areasBeforeGutter.unshift(areaSnapshot);
                    }
                }
                else if (area.order > gutterOrder) {
                    if (this.restrictMove === true) {
                        if (this.snapshot.areasAfterGutter.length === 0)
                            this.snapshot.areasAfterGutter = [areaSnapshot];
                    }
                    else {
                        this.snapshot.areasAfterGutter.push(areaSnapshot);
                    }
                }
            });
            this.snapshot.allInvolvedAreasSizePercent = [
                ...this.snapshot.areasBeforeGutter,
                ...this.snapshot.areasAfterGutter,
            ].reduce((t, a) => t + a.sizePercentAtStart, 0);
            if (this.snapshot.areasBeforeGutter.length === 0 ||
                this.snapshot.areasAfterGutter.length === 0) {
                return;
            }
            this.dragListeners.push(this.renderer.listen('document', 'mouseup', this.stopDragging.bind(this)));
            this.dragListeners.push(this.renderer.listen('document', 'touchend', this.stopDragging.bind(this)));
            this.dragListeners.push(this.renderer.listen('document', 'touchcancel', this.stopDragging.bind(this)));
            this.ngZone.runOutsideAngular(() => {
                this.dragListeners.push(this.renderer.listen('document', 'mousemove', this.dragEvent.bind(this)));
                this.dragListeners.push(this.renderer.listen('document', 'touchmove', this.dragEvent.bind(this)));
            });
            this.displayedAreas.forEach((area) => area.component.lockEvents());
            this.isDragging = true;
            this.renderer.addClass(this.elRef.nativeElement, 'as-dragging');
            this.renderer.addClass(this.gutterEls.toArray()[this.snapshot.gutterNum - 1].nativeElement, 'as-dragged');
            this.notify('start', this.snapshot.gutterNum);
        }
        dragEvent(event) {
            event.preventDefault();
            event.stopPropagation();
            if (this._clickTimeout !== null) {
                window.clearTimeout(this._clickTimeout);
                this._clickTimeout = null;
            }
            if (this.isDragging === false) {
                return;
            }
            this.endPoint = (0, utils_1.getPointFromEvent)(event);
            if (this.endPoint === null) {
                return;
            }
            // Calculate steppedOffset
            let offset = this.direction === 'horizontal'
                ? this.startPoint.x - this.endPoint.x
                : this.startPoint.y - this.endPoint.y;
            if (this.dir === 'rtl') {
                offset = -offset;
            }
            const steppedOffset = Math.round(offset / this.gutterStep) * this.gutterStep;
            if (steppedOffset === this.snapshot.lastSteppedOffset) {
                return;
            }
            this.snapshot.lastSteppedOffset = steppedOffset;
            // Need to know if each gutter side areas could reacts to steppedOffset
            let areasBefore = (0, utils_1.getGutterSideAbsorptionCapacity)(this.unit, this.snapshot.areasBeforeGutter, -steppedOffset, this.snapshot.allAreasSizePixel);
            let areasAfter = (0, utils_1.getGutterSideAbsorptionCapacity)(this.unit, this.snapshot.areasAfterGutter, steppedOffset, this.snapshot.allAreasSizePixel);
            // Each gutter side areas can't absorb all offset
            if (areasBefore.remain !== 0 && areasAfter.remain !== 0) {
                if (Math.abs(areasBefore.remain) === Math.abs(areasAfter.remain)) {
                }
                else if (Math.abs(areasBefore.remain) > Math.abs(areasAfter.remain)) {
                    areasAfter = (0, utils_1.getGutterSideAbsorptionCapacity)(this.unit, this.snapshot.areasAfterGutter, steppedOffset + areasBefore.remain, this.snapshot.allAreasSizePixel);
                }
                else {
                    areasBefore = (0, utils_1.getGutterSideAbsorptionCapacity)(this.unit, this.snapshot.areasBeforeGutter, -(steppedOffset - areasAfter.remain), this.snapshot.allAreasSizePixel);
                }
            }
            // Areas before gutter can't absorbs all offset > need to recalculate sizes for areas after
            // gutter.
            else if (areasBefore.remain !== 0) {
                areasAfter = (0, utils_1.getGutterSideAbsorptionCapacity)(this.unit, this.snapshot.areasAfterGutter, steppedOffset + areasBefore.remain, this.snapshot.allAreasSizePixel);
            }
            // Areas after gutter can't absorbs all offset > need to recalculate sizes for areas before
            // gutter.
            else if (areasAfter.remain !== 0) {
                areasBefore = (0, utils_1.getGutterSideAbsorptionCapacity)(this.unit, this.snapshot.areasBeforeGutter, -(steppedOffset - areasAfter.remain), this.snapshot.allAreasSizePixel);
            }
            if (this.unit === 'percent') {
                // Hack because of browser messing up with sizes using calc(X% - Ypx) ->
                // el.getBoundingClientRect() If not there, playing with gutters makes total going down
                // to 99.99875% then 99.99286%, 99.98986%,..
                const all = [...areasBefore.list, ...areasAfter.list];
                const areaToReset = all.find((a) => a.percentAfterAbsorption !== 0 &&
                    a.percentAfterAbsorption !== a.areaSnapshot.area.minSize &&
                    a.percentAfterAbsorption !== a.areaSnapshot.area.maxSize);
                if (areaToReset) {
                    areaToReset.percentAfterAbsorption =
                        this.snapshot.allInvolvedAreasSizePercent -
                            all
                                .filter((a) => a !== areaToReset)
                                .reduce((total, a) => total + a.percentAfterAbsorption, 0);
                }
            }
            // Now we know areas could absorb steppedOffset, time to really update sizes
            areasBefore.list.forEach((item) => (0, utils_1.updateAreaSize)(this.unit, item));
            areasAfter.list.forEach((item) => (0, utils_1.updateAreaSize)(this.unit, item));
            this.refreshStyleSizes();
            this.notify('progress', this.snapshot.gutterNum);
        }
        stopDragging(event) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            if (this.isDragging === false) {
                return;
            }
            this.displayedAreas.forEach((area) => area.component.unlockEvents());
            while (this.dragListeners.length > 0) {
                const fct = this.dragListeners.pop();
                if (fct)
                    fct();
            }
            // Warning: Have to be before "notify('end')"
            // because "notify('end')"" can be linked to "[size]='x'" > "build()" > "stopDragging()"
            this.isDragging = false;
            // If moved from starting point, notify end
            if (this.endPoint &&
                (this.startPoint.x !== this.endPoint.x || this.startPoint.y !== this.endPoint.y)) {
                this.notify('end', this.snapshot.gutterNum);
            }
            this.renderer.removeClass(this.elRef.nativeElement, 'as-dragging');
            this.renderer.removeClass(this.gutterEls.toArray()[this.snapshot.gutterNum - 1].nativeElement, 'as-dragged');
            this.snapshot = null;
            // Needed to let (click)="clickGutter(...)" event run and verify if mouse moved or not
            this.ngZone.runOutsideAngular(() => {
                setTimeout(() => {
                    this.startPoint = null;
                    this.endPoint = null;
                });
            });
        }
        notify(type, gutterNum) {
            const sizes = this.getVisibleAreaSizes();
            if (type === 'start') {
                this.dragStart.emit({ gutterNum, sizes });
            }
            else if (type === 'end') {
                this.dragEnd.emit({ gutterNum, sizes });
            }
            else if (type === 'click') {
                this.gutterClick.emit({ gutterNum, sizes });
            }
            else if (type === 'dblclick') {
                this.gutterDblClick.emit({ gutterNum, sizes });
            }
            else if (type === 'transitionEnd') {
                if (this.transitionEndSubscriber) {
                    this.ngZone.run(() => { var _a; return (_a = this.transitionEndSubscriber) === null || _a === void 0 ? void 0 : _a.next(sizes); });
                }
            }
            else if (type === 'progress') {
                // Stay outside zone to allow users do what they want about change detection mechanism.
                this.dragProgressSubject.next({ gutterNum, sizes });
            }
        }
        ngOnDestroy() {
            this.stopDragging();
        }
    };
    __setFunctionName(_classThis, "SplitComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _set_direction_decorators = [(0, core_1.Input)()];
        _set_unit_decorators = [(0, core_1.Input)()];
        _set_gutterSize_decorators = [(0, core_1.Input)()];
        _set_gutterStep_decorators = [(0, core_1.Input)()];
        _set_restrictMove_decorators = [(0, core_1.Input)()];
        _set_useTransition_decorators = [(0, core_1.Input)()];
        _set_disabled_decorators = [(0, core_1.Input)()];
        _set_dir_decorators = [(0, core_1.Input)()];
        _set_gutterDblClickDuration_decorators = [(0, core_1.Input)()];
        _dragStart_decorators = [(0, core_1.Output)()];
        _dragEnd_decorators = [(0, core_1.Output)()];
        _gutterClick_decorators = [(0, core_1.Output)()];
        _gutterDblClick_decorators = [(0, core_1.Output)()];
        _get_transitionEnd_decorators = [(0, core_1.Output)()];
        _gutterEls_decorators = [(0, core_1.ViewChildren)('gutterEls')];
        __esDecorate(_classThis, null, _set_direction_decorators, { kind: "setter", name: "direction", static: false, private: false, access: { has: obj => "direction" in obj, set: (obj, value) => { obj.direction = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _set_unit_decorators, { kind: "setter", name: "unit", static: false, private: false, access: { has: obj => "unit" in obj, set: (obj, value) => { obj.unit = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _set_gutterSize_decorators, { kind: "setter", name: "gutterSize", static: false, private: false, access: { has: obj => "gutterSize" in obj, set: (obj, value) => { obj.gutterSize = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _set_gutterStep_decorators, { kind: "setter", name: "gutterStep", static: false, private: false, access: { has: obj => "gutterStep" in obj, set: (obj, value) => { obj.gutterStep = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _set_restrictMove_decorators, { kind: "setter", name: "restrictMove", static: false, private: false, access: { has: obj => "restrictMove" in obj, set: (obj, value) => { obj.restrictMove = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _set_useTransition_decorators, { kind: "setter", name: "useTransition", static: false, private: false, access: { has: obj => "useTransition" in obj, set: (obj, value) => { obj.useTransition = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _set_disabled_decorators, { kind: "setter", name: "disabled", static: false, private: false, access: { has: obj => "disabled" in obj, set: (obj, value) => { obj.disabled = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _set_dir_decorators, { kind: "setter", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _set_gutterDblClickDuration_decorators, { kind: "setter", name: "gutterDblClickDuration", static: false, private: false, access: { has: obj => "gutterDblClickDuration" in obj, set: (obj, value) => { obj.gutterDblClickDuration = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_transitionEnd_decorators, { kind: "getter", name: "transitionEnd", static: false, private: false, access: { has: obj => "transitionEnd" in obj, get: obj => obj.transitionEnd }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _dragStart_decorators, { kind: "field", name: "dragStart", static: false, private: false, access: { has: obj => "dragStart" in obj, get: obj => obj.dragStart, set: (obj, value) => { obj.dragStart = value; } }, metadata: _metadata }, _dragStart_initializers, _dragStart_extraInitializers);
        __esDecorate(null, null, _dragEnd_decorators, { kind: "field", name: "dragEnd", static: false, private: false, access: { has: obj => "dragEnd" in obj, get: obj => obj.dragEnd, set: (obj, value) => { obj.dragEnd = value; } }, metadata: _metadata }, _dragEnd_initializers, _dragEnd_extraInitializers);
        __esDecorate(null, null, _gutterClick_decorators, { kind: "field", name: "gutterClick", static: false, private: false, access: { has: obj => "gutterClick" in obj, get: obj => obj.gutterClick, set: (obj, value) => { obj.gutterClick = value; } }, metadata: _metadata }, _gutterClick_initializers, _gutterClick_extraInitializers);
        __esDecorate(null, null, _gutterDblClick_decorators, { kind: "field", name: "gutterDblClick", static: false, private: false, access: { has: obj => "gutterDblClick" in obj, get: obj => obj.gutterDblClick, set: (obj, value) => { obj.gutterDblClick = value; } }, metadata: _metadata }, _gutterDblClick_initializers, _gutterDblClick_extraInitializers);
        __esDecorate(null, null, _gutterEls_decorators, { kind: "field", name: "gutterEls", static: false, private: false, access: { has: obj => "gutterEls" in obj, get: obj => obj.gutterEls, set: (obj, value) => { obj.gutterEls = value; } }, metadata: _metadata }, _gutterEls_initializers, _gutterEls_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SplitComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SplitComponent = _classThis;
})();
exports.SplitComponent = SplitComponent;
