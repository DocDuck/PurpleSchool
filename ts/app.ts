enum EDeliveryType {
    toHome = 'toHome',
    toPoint = 'toPoint',
}

class Product {
    private _id: string;
    private _name: string;
    private _price: number;
    constructor(id: string, name: string, price: number) {
        this._id = id;
        this._name = name;
        this._price = price;
    }

    getPrice() {
        return this._price
    }
}

class Delivery {
    protected _date: string;

    constructor(date: string) {
        this._date = date
    }
}

class HomeDelivery extends Delivery {
    private _address: string;
    constructor(date: string, address: string) {
        super(address);
        this._address = address
    }
}

class PointDelivery extends Delivery {
    private _id: string;
    constructor(date: string = new Date().toDateString(), id: string) {
        super(date);
        this._date = date;
        this._id = id
    }
}

class Cart {
    private _products: Record<Product['_id'], Product> = {};
    private _delivery: HomeDelivery | PointDelivery;

    addProduct(name: Product['_name'], price: Product['_price']) {
        if (!name || !price) {
            throw new Error('Для добавления тоавара не введены название и/или цена')
        }
        const id = new Date().toDateString()
        this._products[id] = new Product(id, name, price)
    }

    removeProduct(id: Product['_id']) {
        this._products[id] && delete this._products[id]
    }

    getCurrency() {
        return Object.values(this._products).reduce((summ, item) => summ + item.getPrice(), 0)
    }
}