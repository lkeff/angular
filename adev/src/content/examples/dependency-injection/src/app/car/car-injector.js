"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInjector = useInjector;
const core_1 = require("@angular/core");
const car_1 = require("./car");
const logger_service_1 = require("../logger.service");
function useInjector() {
    let injector;
    /*
    // Cannot instantiate an Injector like this!
    let injector = new Injector([
      { provide: Car, deps: [Engine, Tires] },
      { provide: Engine, deps: [] },
      { provide: Tires, deps: [] }
    ]);
    */
    injector = core_1.Injector.create({
        providers: [
            { provide: car_1.Car, deps: [car_1.Engine, car_1.Tires] },
            { provide: car_1.Engine, deps: [] },
            { provide: car_1.Tires, deps: [] },
        ],
    });
    const car = injector.get(car_1.Car);
    car.description = 'Injector';
    injector = core_1.Injector.create({
        providers: [{ provide: logger_service_1.Logger, deps: [] }],
    });
    const logger = injector.get(logger_service_1.Logger);
    logger.log('Injector car.drive() said: ' + car.drive());
    return car;
}
