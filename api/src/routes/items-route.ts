import express from 'express';
import { getItems, getItem } from '../services/ItemService';
const router = express.Router();

router.get('/', getItems);
router.get('/:id', getItem);

export default router;