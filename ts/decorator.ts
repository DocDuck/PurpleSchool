@CreatedAt
class ExampleClass {
    constructor(private foo: string = '47', public createdAt: number = 0) {
        this.foo = foo
    };

    @Log
    bar() {
        console.log('Вызов метода бар', this.foo, this.createdAt)
    }
}

function CreatedAt<T extends { new(...args: any[]): {}}>(constructor: T) {
    return class extends constructor {
        createdAt = new Date().toString()
    }
}

function Log(t: Object, pk: string | symbol, d: TypedPropertyDescriptor<(...args: any[]) => any>) {
    console.log(`Метод ${String(pk)} вызван ${new Date().toString()}`)
    console.log('Дескриптор метода:', JSON.stringify(d))
}

new ExampleClass().bar()