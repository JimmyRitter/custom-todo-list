export declare interface Item {
    _id?: string;
    name: string;
    checked: boolean;
}

export declare interface ItemDBResponseSuccess {
    ok: boolean;
    item?: Item;
}

export declare interface ItemDBResponseError {
    error: boolean;
    code: number;
    message: string;
    stack: string;
}

