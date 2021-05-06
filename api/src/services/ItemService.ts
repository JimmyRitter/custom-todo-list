import { Item } from "../types";

const items: Item[] = [{
    id: 1,
    name: 'first item',
    checked: true,
}, {
    id: 2,
    name: 'second item',
    checked: false
}];

export const getItems = (req: any, res: any) => {
    res.send(items);
};

export const getItem = (req: any, res: any) => {
    res.send(items.filter((x) => x.id === parseInt(req.params.id)));
};
