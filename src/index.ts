import express, { Express } from "express";
import { engine } from 'express-handlebars';
import session from "express-session";
import dotenv from 'dotenv'
import cors from 'cors'
import flash from 'connect-flash'
import cookieParser from "cookie-parser";

// routes
import index from "./controllers/index";

dotenv.config()

const app: Express = express()

// handlerbars
app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", "./src/views");

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', express.static('src/public'))
app.use(session({ secret: "secret", resave: false, saveUninitialized: false }))
app.use(flash());
app.use(cookieParser())

// routes
app.use(index)


const Startapp = (): void => {
    try {
        const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 1111;
        app.listen(PORT, () => console.log(`Server running on port :${PORT}`));
    } catch (err) { console.error(err); }
};

Startapp()