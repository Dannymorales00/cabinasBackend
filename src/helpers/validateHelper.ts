import { NextFunction, Request, Response } from "express";
const { validationResult } = require('express-validator')
/** 
 * using for validate result with the option required
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const validateResult = (_req: Request, res: Response, next: NextFunction) => {

    try {
        validationResult(_req).throw()
        return next()
    } catch (err: any) {
        return res.status(400).send({msg:  err.array()});
    }
}
