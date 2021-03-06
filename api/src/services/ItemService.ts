import { Request, Response } from 'express';
import {
  Db, ObjectID, UpdateWriteOpResult, WriteError,
} from 'mongodb';
import { Item, ItemDBResponseSuccess, ItemDBResponseError } from '../types';

export const getItems = (req: Request, res: Response): void => {
  const db: Db = req.app.locals.mongoDBTodoList;
  db.collection('items')
    .find()
    .toArray()
    .then((result: Item[]) => {
      res.send(result);
    });
};

export const getItem = (req: Request, res: Response): void => {
  const db: Db = req.app.locals.mongoDBTodoList;
  db.collection('items')
    .find({ name: 'second item' })
    .toArray()
    .then((result: Item[]) => {
      res.send(result);
    });
};

export const createItem = (req: Request, res: Response): void => {
  const db: Db = req.app.locals.mongoDBTodoList;

  const newItem: Item = {
    name: req.body.itemName,
    checked: false,
  };

  db.collection('items')
    .insertOne(newItem)
    .then((result) => {
      const data: ItemDBResponseSuccess = {
        ok: true,
        item: result.ops[0],
      };
      res.send(data);
    })
    .catch((err: WriteError) => {
      const data: ItemDBResponseError = {
        error: true,
        code: err.code,
        message: 'an error just happened',
        stack: err.errmsg,
      };
      res.send(data);
    });
};

export const updateItem = (req: Request, res: Response): void => {
  const db: Db = req.app.locals.mongoDBTodoList;

  const { item } = req.body;

  db.collection('items')
    .updateOne(
      { _id: new ObjectID(item._id) },
      { $set: { checked: item.checked } },
    )
    .then((response: UpdateWriteOpResult) => {
      res.send(response.result);
    })
    .catch((err: WriteError) => {
      const data: ItemDBResponseError = {
        error: true,
        code: err.code,
        message: 'an error just happened',
        stack: err.errmsg,
      };
      res.send(data);
    });
};

export const deleteItem = (req: Request, res: Response): void => {
  const db: Db = req.app.locals.mongoDBTodoList;

  const itemId: string = req.params.id;

  db.collection('items')
    .deleteOne(
      { _id: new ObjectID(itemId) },
    )
    .then(() => {
      const data: ItemDBResponseSuccess = {
        ok: true,
      };
      res.send(data);
    });
};

export const clearChecked = (req: Request, res: Response): void => {
  const db: Db = req.app.locals.mongoDBTodoList;

  db.collection('items')
    .deleteMany(
      { checked: true },
    )
    .then(() => {
      const data: ItemDBResponseSuccess = {
        ok: true,
      };
      res.send(data);
    });
};
