import { Request, Response } from "express";

export default (req: Request, res: Response) => {
    res.render('index', {
        title: 'Dimashop',
        user: true
    })
}