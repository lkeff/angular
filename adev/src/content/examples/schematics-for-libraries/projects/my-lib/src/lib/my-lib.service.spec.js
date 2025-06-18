"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const my_lib_service_1 = require("./my-lib.service");
describe('MyLibService', () => {
    beforeEach(() => testing_1.TestBed.configureTestingModule({}));
    it('should be created', () => {
        const service = testing_1.TestBed.inject(my_lib_service_1.MyLibService);
        expect(service).toBeTruthy();
    });
});
