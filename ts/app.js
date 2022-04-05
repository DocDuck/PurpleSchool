"use strict";
var EDeliveryType;
(function (EDeliveryType) {
    EDeliveryType["toHome"] = "toHome";
    EDeliveryType["toPoint"] = "toPoint";
})(EDeliveryType || (EDeliveryType = {}));
class Product {
    _id;
    _name;
    _price;
    constructor(id, name, price) {
        this._id = id;
        this._name = name;
        this._price = price;
    }
    getPrice() {
        return this._price;
    }
}
class Delivery {
    _type;
    _date;
    constructor(type, date) {
        this._type = type;
        this._date = date;
    }
}
class HomeDelivery extends Delivery {
    _address;
    constructor(date, address) {
        super(EDeliveryType.toHome, date);
        this._address = address;
    }
}
class PointDelivery extends Delivery {
    _id;
    constructor(date = new Date().toDateString(), id) {
        super(EDeliveryType.toPoint, date);
        this._date = date;
        this._id = id;
    }
}
class Cart {
    _products = {};
    _delivery;
    addProduct(name, price) {
        if (!name || !price) {
            throw new Error('Для добавления тоавара не введены название и/или цена');
        }
        const id = new Date().toDateString();
        this._products[id] = new Product(id, name, price);
    }
    removeProduct(id) {
        this._products[id] && delete this._products[id];
    }
    getCurrency() {
        return Object.values(this._products).reduce((summ, item) => summ + item.getPrice(), 0);
    }
    setDelivery({ type, date, address, id }) {
        if (type === EDeliveryType.toHome && address) {
            this._delivery = new HomeDelivery(date, address);
        }
        if (type === EDeliveryType.toPoint && id) {
            this._delivery = new PointDelivery(date, id);
        }
    }
    check() {
        return this._delivery && Object.keys(this._products).length;
    }
}
