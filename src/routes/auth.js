import express from 'express'
import { signIn, signUp } from '../controllers/Auth.js';

const routerAuth = express.Router();
routerAuth.post("/signup", signUp)
routerAuth.post("/signin", signIn)



export default routerAuth