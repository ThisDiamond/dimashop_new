import { Router } from "express";
import index from "../controllers/index";

const routes = Router()

routes.get('/', index)

export default routes