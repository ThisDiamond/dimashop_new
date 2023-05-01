import { Request, Response, NextFunction } from "express";

export default async (req: Request, res: Response, next: NextFunction) => {
    res.render('register', {
        title: 'Register | Dimashop',
        msgFlash: req.flash('msgFlash')
    })
}