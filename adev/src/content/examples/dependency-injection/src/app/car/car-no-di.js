"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
// Car without DI
const car_1 = require("./car");
class Car {
    constructor() {
        this.description = 'No DI';
        this.engine = new car_1.Engine();
        this.tires = new car_1.Tires();
    }
    // Method using the engine and tires
    drive() {
        return (`${this.description} car with ` +
            `${this.engine.cylinders} cylinders and ${this.tires.make} tires.`);
    }
}
exports.Car = Car;
