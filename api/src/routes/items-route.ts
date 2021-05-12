import express from 'express';
import { getItems, getItem, createItem, updateItem, deleteItem } from '../services/ItemService';

const router = express.Router();

router.get('/', getItems);
router.get('/:id', getItem);
router.post('/create', createItem)
router.put('/', updateItem);
router.delete('/:id', deleteItem);

export default router;