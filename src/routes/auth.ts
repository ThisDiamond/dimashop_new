import { Router } from "express";
import { login, register, postLogin, postRegister } from "../controllers/auth";

const routes = Router()

routes.get('/login', login)
routes.get('/register', register)

routes.post('/login', postLogin)
routes.post('/register', postRegister)

export default routes