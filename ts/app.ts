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
    private _type: EDeliveryType;
    protected _date: string;

    constructor(type: EDeliveryType, date: string) {
        this._type = type
        this._date = date
    }
}

class HomeDelivery extends Delivery {
    private _address: string;
    constructor(date: string, address: string) {
        super(EDeliveryType.toHome, date);
        this._address = address
    }
}

class PointDelivery extends Delivery {
    private _id: string;
    constructor(date: string = new Date().toDateString(), id: string) {
        super(EDeliveryType.toPoint, date);
        this._date = date;
        this._id = id
    }
}

class Cart {
    private _products: Record<Product['_id'], Product> = {};
    private _delivery: HomeDelivery | PointDelivery | undefined;

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

    setDelivery({type, date, address, id}: {type: EDeliveryType, date: Delivery['_date'], address?: HomeDelivery['_address'], id?: PointDelivery['_id']}) {
            if(type === EDeliveryType.toHome && address) {
                this._delivery = new HomeDelivery(date, address)
            }
            if(type === EDeliveryType.toPoint && id) {
                this._delivery = new PointDelivery(date, id)
            }
    }

    check() {
        return this._delivery && Object.keys(this._products).length
    }
}