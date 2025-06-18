"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomClassDecorator = CustomClassDecorator;
exports.CustomPropDecorator = CustomPropDecorator;
exports.CustomParamDecorator = CustomParamDecorator;
function CustomClassDecorator() {
    return (clazz) => clazz;
}
function CustomPropDecorator() {
    return () => { };
}
function CustomParamDecorator() {
    return () => { };
}
