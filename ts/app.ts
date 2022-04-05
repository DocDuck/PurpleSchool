enum EDeliveryType {
    toHome = 'toHome',
    toPoint = 'toPoint',
}

interface Product {
    id: string;
    name: string;
    price: number;
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
    private _products: Product[] = [];
    private _delivery: Delivery;

    addProduct(product: Product) {
        this._products.push(product)
    }
}