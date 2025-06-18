"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
class Item {
    constructor(id, name, feature, url, rate = 100) {
        this.id = id;
        this.name = name;
        this.feature = feature;
        this.url = url;
        this.rate = rate;
        this.id = id ? id : Item.nextId++;
    }
    clone() {
        return Object.assign(new Item(this.id), this);
    }
}
exports.Item = Item;
Item.nextId = 0;
Item.items = [
    new Item(0, 'Teapot', 'stout'),
    new Item(1, 'Lamp', 'bright'),
    new Item(2, 'Phone', 'slim'),
    new Item(3, 'Television', 'vintage'),
    new Item(4, 'Fishbowl'),
];
