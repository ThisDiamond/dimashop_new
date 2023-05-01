import { Request, Response, NextFunction } from "express";
import { findUserbyEmail } from "../../services/users.service";
import { schemaLogin } from "../../validation/user.validation";
import bcrypt from 'bcrypt'
import { generateJWTToken } from "../../../../dimashop_full/services/token.service";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Joi validation 
        const { error, value } = schemaLogin.validate(req.body)

        // check error
        if (error) {
            req.flash('msgFlash', `${error.message}`)
            res.redirect('/login')
            return
        }

        // get passed values
        const { email, password } = value

        // find user by email
        const user = await findUserbyEmail(email)

        // check user
        if (user == null) {
            req.flash('msgFlash', `Bunday foydalanuvchi mavjud emas!`)
            res.redirect('/login')
            return
        }

        // check user password
        const isPasswordEqual = bcrypt.compareSync(password, user.password)

        if (isPasswordEqual == false) {
            req.flash('msgFlash', `Parol xato!`)
            res.redirect('/login')
            return
        }

        // JWT token
        const token = generateJWTToken(email)
        res.cookie('token', token)

        // redirect
        res.redirect('/')

    } catch (error) {
        console.error(error);
    }
}