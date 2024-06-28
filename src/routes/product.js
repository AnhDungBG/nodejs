import express from 'express';
import { getAll, getDetail, create, update, remove } from '../controllers/products.js';
import { checkPermission } from '../middlewares/checkPermission.js';
const routesProduct = express.Router();
routesProduct.get('/', getAll)
routesProduct.get('/:id', getDetail)
routesProduct.post('/', checkPermission, create)
routesProduct.put('/:id', checkPermission, update)
routesProduct.delete('/:id', checkPermission, remove)

export default routesProduct