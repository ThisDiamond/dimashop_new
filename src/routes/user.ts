import { Router } from "express";
import { categories } from "../controllers/user";

const routes = Router()

routes.get('/categories', categories)

export default routes