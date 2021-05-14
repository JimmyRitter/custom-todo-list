export declare interface ItemModel {
    _id: string;
    name: string;
    checked: boolean;
}

export declare interface ItemActions {
    onCheck?: (id: string, value: boolean) => void;
    onDelete?: (id: string) => void;
}
