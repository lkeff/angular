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
const banner_external_component_1 = require("./banner-external.component");
describe('BannerComponent (external files)', () => {
    let component;
    let fixture;
    let h1;
    describe('setup that may fail', () => {
        // #docregion setup-may-fail
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield testing_1.TestBed.configureTestingModule({
                imports: [banner_external_component_1.BannerComponent],
            }); // missing call to compileComponents()
            fixture = testing_1.TestBed.createComponent(banner_external_component_1.BannerComponent);
        }));
        // #enddocregion setup-may-fail
        it('should create', () => {
            expect(fixture.componentInstance).toBeDefined();
        });
    });
    describe('Two beforeEach', () => {
        // #docregion async-before-each
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield testing_1.TestBed.configureTestingModule({
                imports: [banner_external_component_1.BannerComponent],
            }).compileComponents(); // compile template and css
        }));
        // #enddocregion async-before-each
        // synchronous beforeEach
        // #docregion sync-before-each
        beforeEach(() => {
            fixture = testing_1.TestBed.createComponent(banner_external_component_1.BannerComponent);
            component = fixture.componentInstance; // BannerComponent test instance
            h1 = fixture.nativeElement.querySelector('h1');
        });
        // #enddocregion sync-before-each
        tests();
    });
    describe('One beforeEach', () => {
        // #docregion one-before-each
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield testing_1.TestBed.configureTestingModule({
                imports: [banner_external_component_1.BannerComponent],
            }).compileComponents();
            fixture = testing_1.TestBed.createComponent(banner_external_component_1.BannerComponent);
            component = fixture.componentInstance;
            h1 = fixture.nativeElement.querySelector('h1');
        }));
        // #enddocregion one-before-each
        tests();
    });
    function tests() {
        it('no title in the DOM until manually call `detectChanges`', () => {
            expect(h1.textContent).toEqual('');
        });
        it('should display original title', () => {
            fixture.detectChanges();
            expect(h1.textContent).toContain(component.title);
        });
        it('should display a different test title', () => {
            component.title = 'Test Title';
            fixture.detectChanges();
            expect(h1.textContent).toContain('Test Title');
        });
    }
});
