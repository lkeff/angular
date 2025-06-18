"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #docplaster
const testing_1 = require("@angular/core/testing");
// #docregion import-marbles
const jasmine_marbles_1 = require("jasmine-marbles");
// #enddocregion import-marbles
const twain_service_1 = require("./twain.service");
const twain_component_1 = require("./twain.component");
describe('TwainComponent (marbles)', () => {
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
    beforeEach(() => {
        // Create a fake TwainService object with a `getQuote()` spy
        const twainService = jasmine.createSpyObj('TwainService', ['getQuote']);
        getQuoteSpy = twainService.getQuote;
        testing_1.TestBed.configureTestingModule({
            imports: [twain_component_1.TwainComponent],
            providers: [{ provide: twain_service_1.TwainService, useValue: twainService }],
        });
        fixture = testing_1.TestBed.createComponent(twain_component_1.TwainComponent);
        component = fixture.componentInstance;
        quoteEl = fixture.nativeElement.querySelector('.twain');
        testQuote = 'Test Quote';
    });
    // A synchronous test that simulates async behavior
    // #docregion get-quote-test
    it('should show quote after getQuote (marbles)', () => {
        // observable test quote value and complete(), after delay
        // #docregion test-quote-marbles
        const q$ = (0, jasmine_marbles_1.cold)('---x|', { x: testQuote });
        // #enddocregion test-quote-marbles
        getQuoteSpy.and.returnValue(q$);
        fixture.detectChanges(); // ngOnInit()
        expect(quoteEl.textContent).withContext('should show placeholder').toBe('...');
        // #docregion test-scheduler-flush
        (0, jasmine_marbles_1.getTestScheduler)().flush(); // flush the observables
        // #enddocregion test-scheduler-flush
        fixture.detectChanges(); // update view
        expect(quoteEl.textContent).withContext('should show quote').toBe(testQuote);
        expect(errorMessage()).withContext('should not show error').toBeNull();
    });
    // #enddocregion get-quote-test
    // Still need fakeAsync() because of component's setTimeout()
    // #docregion error-test
    it('should display error when TwainService fails', (0, testing_1.fakeAsync)(() => {
        // observable error after delay
        // #docregion error-marbles
        const q$ = (0, jasmine_marbles_1.cold)('---#|', null, new Error('TwainService test failure'));
        // #enddocregion error-marbles
        getQuoteSpy.and.returnValue(q$);
        fixture.detectChanges(); // ngOnInit()
        expect(quoteEl.textContent).withContext('should show placeholder').toBe('...');
        (0, jasmine_marbles_1.getTestScheduler)().flush(); // flush the observables
        (0, testing_1.tick)(); // component shows error after a setTimeout()
        fixture.detectChanges(); // update error message
        expect(errorMessage())
            .withContext('should display error')
            .toMatch(/test failure/);
        expect(quoteEl.textContent).withContext('should show placeholder').toBe('...');
    }));
    // #enddocregion error-test
});
