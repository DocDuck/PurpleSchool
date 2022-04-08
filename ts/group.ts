interface IData {
    group: number,
    name: string,
    options?: any,
}

const data: IData[] = [
    {group: 1, name: 'sdf'},
    {group: 2, name: 'kuymt'},
    {group: 1, name: 'rtuyyu'},
    {group: 3, name: 'hnnhnh'},
    {group: 1, name: 'fdfdfd'},
]

type TKey = string | number | symbol

interface IGroup<T> {
    [key: string]: T[]
}

const group = <T extends Record<TKey, any>>(arr: T[], key: keyof T): IGroup<T> => {
    return arr.reduce((map, item) => {
        return map
    }, {})
}

console.log(group(data, 'group'))