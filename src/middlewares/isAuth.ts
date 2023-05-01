import { Request, Response, NextFunction } from "express";
import Jwt from 'jsonwebtoken'
import { findUserbyEmail } from "../services/users.service";

export async function isAuth(req: Request, res: Response, next: NextFunction) {
    try {
        // get token by cookies
        const token = req.cookies.token

        // check token
        if (token == undefined) {
            res.redirect('/login')
            return
        }
        
        if (token) {
            const decode = Jwt.verify(token, String(process.env.JWT_SECRET)) as Jwt.JwtPayload
            const user = await findUserbyEmail(decode.email)

            if (user == null) {
                res.clearCookie('token').redirect('/login')
            }

            if (user) {
                res.locals.id_user = String(user.id)
                res.locals.user_name = String(user?.firstname + ' ' + user?.lastname)
                res.locals.email = String(user.email)
                res.locals.user_type = String(user.user_type)
            }
        }
        next()
    } catch (error) {
        console.error(error);
    }
}