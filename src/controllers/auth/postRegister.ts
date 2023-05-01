import { Request, Response, NextFunction } from "express";
import { schemaRegister } from '../../validation/user.validation'
import { createUser, findUserbyEmail } from "../../services/users.service";
import bcrypt from 'bcrypt'
import { generateJWTToken } from "../../../../dimashop_full/services/token.service";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Joi validation
        const { error, value } = schemaRegister.validate(req.body)

        // check error
        if (error) {
            req.flash('msgFlash', `${error.message}`)
            res.redirect('/register')
            return
        }

        // get passed values
        const { firstname, lastname, email, password } = value

        // find user by email 
        const user = await findUserbyEmail(email)

        // check user
        if (user != null) {
            req.flash('msgFlash', `Bu email ro'yxatdan o'tgan!`)
            res.redirect('/register')
            return
        }

        // password hashing
        const hashpassword = bcrypt.hashSync(password, 10)

        // create new user
        const newUser = await createUser(firstname, lastname, email, hashpassword)

        // JWT token
        const token = generateJWTToken(newUser.email)
        res.cookie("token", token)

        // redirect 
        res.redirect('/')

    } catch (error) {
        console.error(error)
    }
}