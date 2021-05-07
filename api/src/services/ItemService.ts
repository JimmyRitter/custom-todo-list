import { Item } from "../types";
import { Request, Response } from 'express';
import { Db } from "mongodb";

export const getItems = (req: Request, res: Response) => {
    const db: Db = req.app.locals.mongoDBTodoList;
    db.collection('items')
        .find()
        .toArray()
        .then((result: Item[]) => {
            res.send(result);
        });
};

export const getItem = (req: Request, res: Response) => {
    const db: Db = req.app.locals.mongoDBTodoList;
    db.collection('items')
        .find({ "name": "second item" })
        .toArray()
        .then((result: Item[]) => {
            res.send(result);
        });
};
