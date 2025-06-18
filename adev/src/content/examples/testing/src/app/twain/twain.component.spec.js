"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// #docplaster
const testing_1 = require("@angular/core/testing");
const testing_2 = require("../../testing");
const rxjs_1 = require("rxjs");
const twain_component_1 = require("./twain.component");
const twain_service_1 = require("./twain.service");
describe('TwainComponent', () => {
    let component;
    let fixture;
    let getQuoteSpy;
    let quoteEl;
    let testQuote;
    // Helper function to get the error message element value
    // An *ngIf keeps it out of the DOM until there is an error
    const errorMessage = () => {
        const el = fixture.nativeElement.querySelector('.error');
        return el ? el.textContent : null;
    };
    // #docregion setup
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [twain_component_1.TwainComponent],
            providers: [twain_service_1.TwainService],
        });
        testQuote = 'Test Quote';
        // #docregion spy
        // Create a fake TwainService object with a `getQuote()` spy
        const twainService = testing_1.TestBed.inject(twain_service_1.TwainService);
        // Make the spy return a synchronous Observable with the test data
        getQuoteSpy = spyOn(twainService, 'getQuote').and.returnValue((0, rxjs_1.of)(testQuote));
        // #enddocregion spy
        fixture = testing_1.TestBed.createComponent(twain_component_1.TwainComponent);
        fixture.autoDetectChanges();
        component = fixture.componentInstance;
        quoteEl = fixture.nativeElement.querySelector('.twain');
    });
    // #enddocregion setup
    describe('when test with synchronous observable', () => {
        it('should not show quote before OnInit', () => {
            expect(quoteEl.textContent).withContext('nothing displayed').toBe('');
            expect(errorMessage()).withContext('should not show error element').toBeNull();
            expect(getQuoteSpy.calls.any()).withContext('getQuote not yet called').toBe(false);
        });
        // The quote would not be immediately available if the service were truly async.
        // #docregion sync-test
        it('should show quote after component initialized', () => __awaiter(void 0, void 0, void 0, function* () {
            yield fixture.whenStable(); // onInit()
            // sync spy result shows testQuote immediately after init
            expect(quoteEl.textContent).toBe(testQuote);
            expect(getQuoteSpy.calls.any()).withContext('getQuote called').toBe(true);
        }));
        // #enddocregion sync-test
        // The error would not be immediately available if the service were truly async.
        // Use `fakeAsync` because the component error calls `setTimeout`
        // #docregion error-test
        it('should display error when TwainService fails', (0, testing_1.fakeAsync)(() => {
            // tell spy to return an error observable after a timeout
            getQuoteSpy.and.returnValue((0, rxjs_1.defer)(() => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        reject('TwainService test failure');
                    });
                });
            }));
            fixture.detectChanges(); // onInit()
            // sync spy errors immediately after init
            (0, testing_1.tick)(); // flush the setTimeout()
            fixture.detectChanges(); // update errorMessage within setTimeout()
            expect(errorMessage())
                .withContext('should display error')
                .toMatch(/test failure/);
            expect(quoteEl.textContent).withContext('should show placeholder').toBe('...');
        }));
        // #enddocregion error-test
    });
    describe('when test with asynchronous observable', () => {
        beforeEach(() => {
            // #docregion async-setup
            // Simulate delayed observable values with the `asyncData()` helper
            getQuoteSpy.and.returnValue((0, testing_2.asyncData)(testQuote));
            // #enddocregion async-setup
        });
        it('should not show quote before OnInit', () => {
            expect(quoteEl.textContent).withContext('nothing displayed').toBe('');
            expect(errorMessage()).withContext('should not show error element').toBeNull();
            expect(getQuoteSpy.calls.any()).withContext('getQuote not yet called').toBe(false);
        });
        it('should still not show quote after component initialized', () => {
            fixture.detectChanges();
            // getQuote service is async => still has not returned with quote
            // so should show the start value, '...'
            expect(quoteEl.textContent).withContext('should show placeholder').toBe('...');
            expect(errorMessage()).withContext('should not show error').toBeNull();
            expect(getQuoteSpy.calls.any()).withContext('getQuote called').toBe(true);
        });
        // #docregion fake-async-test
        it('should show quote after getQuote (fakeAsync)', (0, testing_1.fakeAsync)(() => {
            fixture.detectChanges(); // ngOnInit()
            expect(quoteEl.textContent).withContext('should show placeholder').toBe('...');
            (0, testing_1.tick)(); // flush the observable to get the quote
            fixture.detectChanges(); // update view
            expect(quoteEl.textContent).withContext('should show quote').toBe(testQuote);
            expect(errorMessage()).withContext('should not show error').toBeNull();
        }));
        // #enddocregion fake-async-test
        // #docregion async-test
        it('should show quote after getQuote (async)', () => __awaiter(void 0, void 0, void 0, function* () {
            fixture.detectChanges(); // ngOnInit()
            expect(quoteEl.textContent).withContext('should show placeholder').toBe('...');
            yield fixture.whenStable();
            // wait for async getQuote
            fixture.detectChanges(); // update view with quote
            expect(quoteEl.textContent).toBe(testQuote);
            expect(errorMessage()).withContext('should not show error').toBeNull();
        }));
        // #enddocregion async-test
        it('should display error when TwainService fails', (0, testing_1.fakeAsync)(() => {
            // tell spy to return an async error observable
            getQuoteSpy.and.returnValue((0, testing_2.asyncError)('TwainService test failure'));
            fixture.detectChanges();
            (0, testing_1.tick)(); // component shows error after a setTimeout()
            fixture.detectChanges(); // update error message
            expect(errorMessage())
                .withContext('should display error')
                .toMatch(/test failure/);
            expect(quoteEl.textContent).withContext('should show placeholder').toBe('...');
        }));
    });
});
