import { check, body } from 'express-validator';
import { validateResult } from '../helpers/validateHelper';
import { NextFunction, Request, Response } from 'express';


const validateRegisterHome = [
    check('imagenes').exists().withMessage("Falta la propiedad imagenes en el json"),
    check('shedules')
        .isArray().withMessage('shedules debe ser un array')
        .custom((value) => {
            // Verificar que cada elemento del array sea un objeto con propiedades específicas
            for (const shedule of value) {
                if (typeof shedule !== 'object' || !shedule.dia || !shedule.horaApertura || !shedule.horaCierre) {
                    throw new Error('Cada elemento de shedules debe ser un objeto con propiedades dia, horaApertura y horaCierre');
                }
            }
            return true;
        }),
    body('infoContact').isObject().withMessage('infoContact debe ser un objeto'),
    body('infoContact.correo').isEmail().withMessage('El correo debe ser válido'),
    body('infoContact.direccion').isString().withMessage('La dirección debe ser un string'),
    body('infoContact.id').isNumeric().withMessage('El id debe ser un número'),
    body('infoContact.telefono1').isNumeric().withMessage('El telefono1 debe ser un número'),
    body('infoContact.telefono2').optional().isNumeric().withMessage('El telefono2 debe ser un número'),
    body('infoContact.urlWhatsApp').isURL().withMessage('La UrlWhatsApp debe ser una direcciónUrl'),
    /** 
     * using for validate json with espress-validator
     * @param  {Request} _req
     * @param  {Response} res
     * @param  {NextFunction} next
     */
    (_req: Request, res: Response, next: NextFunction) => {
        validateResult(_req, res, next)
    }
]


const validateEditHome = [
    check('imagenes').exists().withMessage("Falta la propiedad imagenes en el json"),
    check('shedules')
        .isArray().withMessage('shedules debe ser un array')
        .custom((value) => {
            // Verificar que cada elemento del array sea un objeto con propiedades específicas
            for (const shedule of value) {
                if (typeof shedule !== 'object' || !shedule.dia || !shedule.horaApertura || !shedule.horaCierre) {
                    throw new Error('Cada elemento de shedules debe ser un objeto con propiedades dia, horaApertura y horaCierre');
                }
            }
            return true;
        }),
    body('infoContact').isObject().withMessage('infoContact debe ser un objeto'),
    body('infoContact.correo').isEmail().withMessage('El correo debe ser válido'),
    body('infoContact.direccion').isString().withMessage('La dirección debe ser un string'),
    body('infoContact.id').isNumeric().withMessage('El id debe ser un número'),
    body('infoContact.telefono1').isNumeric().withMessage('El telefono1 debe ser un número'),
    body('infoContact.telefono2').custom((value) => {
        if (value && !/^\d+$/.test(value)) {
            throw new Error('El telefono2 debe ser un número');
        }
        return true;
    }),
    body('infoContact.urlWhatsApp').isURL().withMessage('La UrlWhatsApp debe ser una direcciónUrl'),
    /** 
     * using for validate json with espress-validator
     * @param  {Request} _req
     * @param  {Response} res
     * @param  {NextFunction} next
     */
    (_req: Request, res: Response, next: NextFunction) => {
        validateResult(_req, res, next)
    }
]





export { validateRegisterHome, validateEditHome }