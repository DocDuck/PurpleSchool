@createdAt
class ExampleClass {
    constructor(private foo: string = '47', public createdAt: number = 0) {
        this.foo = foo
    };

    bar() {
        console.log('bar', this.foo, this.createdAt)
    }
}

function createdAt<T extends { new(...args: any[]): {}}>(constructor: T) {
    return class extends constructor {
        createdAt = new Date().toString()
    }
}

new ExampleClass().bar()