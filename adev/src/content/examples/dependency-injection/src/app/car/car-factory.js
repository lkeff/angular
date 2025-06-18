"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarFactory = void 0;
// #docregion
const car_1 = require("./car");
// BAD pattern!
class CarFactory {
    createCar() {
        const car = new car_1.Car(this.createEngine(), this.createTires());
        car.description = 'Factory';
        return car;
    }
    createEngine() {
        return new car_1.Engine();
    }
    createTires() {
        return new car_1.Tires();
    }
}
exports.CarFactory = CarFactory;
