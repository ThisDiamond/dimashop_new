import { Request, Response, NextFunction } from "express";

export default async (req: Request, res: Response, next: NextFunction) => {
    res.render('login', {
        title: 'Login | Dimashop',
        msgFlash: req.flash('msgFlash')
    })
}