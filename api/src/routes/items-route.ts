import express from 'express';
import { getItems, getItem, createItem } from '../services/ItemService';
const router = express.Router();

router.get('/', getItems);
router.get('/:id', getItem);
router.post('/create', createItem)

export default router;