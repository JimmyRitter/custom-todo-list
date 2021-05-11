import { Item, ItemDBResponseSuccess, ItemDBResponseError } from "../types";
import { Request, Response } from 'express';
import { Db, WriteError } from "mongodb";

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

export const createItem = (req: Request, res: Response) => {
    const db: Db = req.app.locals.mongoDBTodoList;

    const newItem: Item = {
        name: req.body.itemName,
        checked: false,
    };

    db.collection('items')
        .insertOne(newItem)
        .then((result: any) => {
            const data: ItemDBResponseSuccess = {
                ok: true,
                item: result.ops[0],
            }
            res.send(data);
        })
        .catch((err: WriteError) => {
            const data: ItemDBResponseError = {
                error: true,
                code: err.code,
                message: 'an error just happened',
                stack: err.errmsg
            }
            res.send(data);
        });
};