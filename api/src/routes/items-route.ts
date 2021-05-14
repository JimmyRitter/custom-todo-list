import express from 'express';
import {
  getItems, getItem, createItem, updateItem, deleteItem, clearChecked,
} from '../services/ItemService';

const ItemsRoute = express.Router();

ItemsRoute.get('/', getItems);
ItemsRoute.get('/:id', getItem);
ItemsRoute.post('/create', createItem);
ItemsRoute.put('/', updateItem);
ItemsRoute.delete('/:id', deleteItem);
ItemsRoute.post('/clear', clearChecked);

export default ItemsRoute;
