"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarService = void 0;
class CarService {
    constructor() {
        this.cars = ['Sunflower GT', 'Flexus Sport', 'Sprout Mach One'];
    }
    getCars() {
        return this.cars;
    }
    getCar(id) {
        return this.cars[id];
    }
}
exports.CarService = CarService;
