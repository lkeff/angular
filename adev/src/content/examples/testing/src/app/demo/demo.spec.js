"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeValueService = void 0;
// #docplaster
const demo_1 = require("./demo");
///////// Fakes /////////
class FakeValueService extends demo_1.ValueService {
    constructor() {
        super(...arguments);
        this.value = 'faked service value';
    }
}
exports.FakeValueService = FakeValueService;
////////////////////////
describe('demo (no TestBed):', () => {
    // #docregion ValueService
    // Straight Jasmine testing without Angular's testing support
    describe('ValueService', () => {
        let service;
        beforeEach(() => {
            service = new demo_1.ValueService();
        });
        it('#getValue should return real value', () => {
            expect(service.getValue()).toBe('real value');
        });
        it('#getObservableValue should return value from observable', (done) => {
            service.getObservableValue().subscribe((value) => {
                expect(value).toBe('observable value');
                done();
            });
        });
        it('#getPromiseValue should return value from a promise', (done) => {
            service.getPromiseValue().then((value) => {
                expect(value).toBe('promise value');
                done();
            });
        });
    });
    // #enddocregion ValueService
    // MasterService requires injection of a ValueService
    // #docregion MasterService
    describe('MasterService without Angular testing support', () => {
        let masterService;
        it('#getValue should return real value from the real service', () => {
            masterService = new demo_1.MasterService(new demo_1.ValueService());
            expect(masterService.getValue()).toBe('real value');
        });
        it('#getValue should return faked value from a fakeService', () => {
            masterService = new demo_1.MasterService(new FakeValueService());
            expect(masterService.getValue()).toBe('faked service value');
        });
        it('#getValue should return faked value from a fake object', () => {
            const fake = { getValue: () => 'fake value' };
            masterService = new demo_1.MasterService(fake);
            expect(masterService.getValue()).toBe('fake value');
        });
        it('#getValue should return stubbed value from a spy', () => {
            // create `getValue` spy on an object representing the ValueService
            const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getValue']);
            // set the value to return when the `getValue` spy is called.
            const stubValue = 'stub value';
            valueServiceSpy.getValue.and.returnValue(stubValue);
            masterService = new demo_1.MasterService(valueServiceSpy);
            expect(masterService.getValue()).withContext('service returned stub value').toBe(stubValue);
            expect(valueServiceSpy.getValue.calls.count())
                .withContext('spy method was called once')
                .toBe(1);
            expect(valueServiceSpy.getValue.calls.mostRecent().returnValue).toBe(stubValue);
        });
    });
    // #enddocregion MasterService
    describe('MasterService (no beforeEach)', () => {
        // #docregion no-before-each-test
        it('#getValue should return stubbed value from a spy', () => {
            // #docregion no-before-each-setup-call
            const { masterService, stubValue, valueServiceSpy } = setup();
            // #enddocregion no-before-each-setup-call
            expect(masterService.getValue()).withContext('service returned stub value').toBe(stubValue);
            expect(valueServiceSpy.getValue.calls.count())
                .withContext('spy method was called once')
                .toBe(1);
            expect(valueServiceSpy.getValue.calls.mostRecent().returnValue).toBe(stubValue);
        });
        // #enddocregion no-before-each-test
        // #docregion no-before-each-setup
        function setup() {
            const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getValue']);
            const stubValue = 'stub value';
            const masterService = new demo_1.MasterService(valueServiceSpy);
            valueServiceSpy.getValue.and.returnValue(stubValue);
            return { masterService, stubValue, valueServiceSpy };
        }
        // #enddocregion no-before-each-setup
    });
    describe('ReversePipe', () => {
        let pipe;
        beforeEach(() => {
            pipe = new demo_1.ReversePipe();
        });
        it('transforms "abc" to "cba"', () => {
            expect(pipe.transform('abc')).toBe('cba');
        });
        it('no change to palindrome: "able was I ere I saw elba"', () => {
            const palindrome = 'able was I ere I saw elba';
            expect(pipe.transform(palindrome)).toBe(palindrome);
        });
    });
    // #docregion Lightswitch
    describe('LightswitchComp', () => {
        it('#clicked() should toggle #isOn', () => {
            const comp = new demo_1.LightswitchComponent();
            expect(comp.isOn).withContext('off at first').toBe(false);
            comp.clicked();
            expect(comp.isOn).withContext('on after click').toBe(true);
            comp.clicked();
            expect(comp.isOn).withContext('off after second click').toBe(false);
        });
        it('#clicked() should set #message to "is on"', () => {
            const comp = new demo_1.LightswitchComponent();
            expect(comp.message)
                .withContext('off at first')
                .toMatch(/is off/i);
            comp.clicked();
            expect(comp.message).withContext('on after clicked').toMatch(/is on/i);
        });
    });
    // #enddocregion Lightswitch
});
