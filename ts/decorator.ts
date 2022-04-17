@CreatedAt
class ExampleClass {
    constructor(private foo: string = '47', public createdAt: number = 0) {
        this.foo = foo
    };

    @Log
    @Intercept
    bar(a?: any) {
        console.log('Вызов метода бар', this.createdAt, a)
    }
}

function CreatedAt<T extends { new(...args: any[]): {}}>(constructor: T) {
    return class extends constructor {
        createdAt = new Date().toString()
    }
}

function Log(t: Object, pk: string | symbol, d: TypedPropertyDescriptor<(...args: any[]) => any>): TypedPropertyDescriptor<(...args: any[]) => any> | void {
    console.log(`Метод ${String(pk)} вызван ${new Date().toString()}`)
    console.log('Дескриптор метода:', JSON.stringify(d))
}

function Intercept(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<(...args: any[]) => any>): TypedPropertyDescriptor<(...args: any[]) => any> | void {
    const fn = descriptor.value
    descriptor.value = async (...args: any[]) => {
        try {
            return await fn?.apply(target, args)
        } catch (e) {
            throw new Error(`Метод не сработал(( ${e}`)
        }
    }
}

new ExampleClass().bar('test')