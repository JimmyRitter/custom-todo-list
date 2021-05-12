declare interface ItemModel {
    _id: string;
    name: string;
    checked: boolean;
    onDelete?: (id: string) => void;
}

export default ItemModel;