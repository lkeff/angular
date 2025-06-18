"use strict";
// Examples with car and engine variations
Object.defineProperty(exports, "__esModule", { value: true });
exports.simpleCar = simpleCar;
exports.superCar = superCar;
exports.testCar = testCar;
const car_1 = require("./car");
///////// example 1 ////////////
function simpleCar() {
    // Simple car with 4 cylinders and Flintstone tires.
    const car = new car_1.Car(new car_1.Engine(), new car_1.Tires());
    car.description = 'Simple';
    return car;
}
///////// example 2 ////////////
class Engine2 {
    constructor(cylinders) {
        this.cylinders = cylinders;
    }
}
function superCar() {
    // Super car with 12 cylinders and Flintstone tires.
    const bigCylinders = 12;
    const car = new car_1.Car(new Engine2(bigCylinders), new car_1.Tires());
    car.description = 'Super';
    return car;
}
/////////// example 3 //////////
class MockEngine extends car_1.Engine {
    constructor() {
        super(...arguments);
        this.cylinders = 8;
    }
}
class MockTires extends car_1.Tires {
    constructor() {
        super(...arguments);
        this.make = 'YokoGoodStone';
    }
}
function testCar() {
    // Test car with 8 cylinders and YokoGoodStone tires.
    const car = new car_1.Car(new MockEngine(), new MockTires());
    car.description = 'Test';
    return car;
}
