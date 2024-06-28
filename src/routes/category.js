import { getAll, getDetail, create, remove, update } from "../controllers/categories.js";
import express from 'express';
const routesCategory = express.Router();
routesCategory.get('/', getAll)
routesCategory.get('/:id', getDetail)
routesCategory.post('/', create)
routesCategory.put('/', update)
routesCategory.delete('/', remove)


export default routesCategory