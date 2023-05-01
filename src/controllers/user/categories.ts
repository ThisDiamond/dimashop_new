import { Request, Response, NextFunction } from "express";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.render('user/categories', {
            user: true
        })
    } catch (error) {
        console.error(error);
    }
}