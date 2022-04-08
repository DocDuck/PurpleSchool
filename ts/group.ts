interface IData {
    group: number,
    name: string,
    options?: any,
}

const data: IData[] = [
    {group: 1, name: 'sdf'},
    {group: 2, name: 'kuymt'},
    {group: 1, name: 'rtuyyu', options: 666},
    {group: 3, name: 'hnnhnh', options: 'hello'},
    {group: 1, name: 'fdfdfd'},
]

type TKey = string | number | symbol

interface IGroup<T> {
    [key: string]: T[]
}

const group = <T extends Record<TKey, any>>(arr: T[], key: keyof T): IGroup<T> => {
    return arr.reduce<IGroup<T>>((map, item) => {
        const itemGroupKey = item[key] // Значение у итерируемого объекта, который станет ключем результирующей группы
        // Если уже создан ключ группы - значением будет некоторый массив
        if(Array.isArray(map[itemGroupKey])) {
            // Добавляем объект в группу
            map[itemGroupKey].push(item)
        } else {
            // Иначе создаем новый массив с текущим значением
            map[itemGroupKey] = [item]
        }
        return map
    }, {})
}

console.log(group(data, 'group'))