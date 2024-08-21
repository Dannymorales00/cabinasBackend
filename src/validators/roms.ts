import { check, param } from 'express-validator';
import { validateResult } from '../helpers/validateHelper';
import { NextFunction, Request, Response } from 'express';

const validateGetRoomID = [
    param('id')
        .exists().withMessage("Falta la propiedad id en el json")
        .not()
        .isEmpty().withMessage("La id esta vacia")
        .isNumeric().withMessage("La id solo puede contener numeros")
        .custom((value) => value > 0).withMessage("El id no puede contener numeros negativos"),

    (_req: Request, res: Response, next: NextFunction) => {
        validateResult(_req, res, next)
    }
]

const validateRegisterRoom = [

    check('numero')
        .exists().withMessage("Falta la propiedad numero en el json")
        .not()
        .isEmpty().withMessage("El numero no puede estar vacio")
        .isNumeric().withMessage("El numero solo puede contener numeros")
        .isLength({ min: 1, max: 4 }).withMessage("El numero solo puede tener entre 1 y 4 digitos")
        .custom((value) => value > 0).withMessage("El numero no puede contener numeros negativos"),

    check('descripcion')
        .exists().withMessage("Falta la propiedad descripcion en el json")
        .not()
        .isEmpty().withMessage("La descripcion no puede estar vacia")
        .isString().withMessage("La descripcion solo puede ser texto"),

    check('capacidad')
        .exists().withMessage("Falta la capacidad en el json")
        .not()
        .isEmpty().withMessage("capacidad no puede estar vacio")
        .isNumeric().withMessage("La capacidad solo contener numeros")
        .isLength({ min: 1, max: 1 }).withMessage("La capacidad solo puede tener un digito")
        .custom((value) => value > 0).withMessage("La capacidad no puede contener numeros negativos"),

    check('estado')
        .exists().withMessage("Falta la estado tipo en el json")
        .not()
        .isEmpty().withMessage("El estado esta vacio")
        .custom((value) => value == "Inactivo" || value == "Activo").withMessage("El estado solo puede ser: Activo ó Inactivo"),

    check('precio')
        .exists().withMessage("Falta la propiedad precio en el json")
        .not()
        .isEmpty().withMessage("El precio esta vacio")
        .isNumeric().withMessage("El precio solo puede contener numeros")
        .custom((value) => value > 0).withMessage("El precio no puede contener numeros negativos"),

    check('porcentajeDescuento')
        .exists().withMessage("Falta la propiedad porcentajeDescuento en el json")
        .not()
        .isEmpty().withMessage("El porcentajeDescuento no puede estar vacio")
        .isNumeric().withMessage("El porcentajeDescuento solo puede contener numeros")
        .isLength({ min: 1, max: 2 }).withMessage("El porcentajeDescuento solo puede tener entre 1 y 2 digitos")
        .custom((value) => value >= 0).withMessage("El porcentajeDescuento no puede contener numeros negativos")
        .custom((value) => value <= 80).withMessage("El porcentajeDescuento solo puede ser menor o igual a 80"),

    check('imagenes')
        .optional()
        .custom((imagenes) => {
            if (!Array.isArray(imagenes) || imagenes.length === 0) {
                return false; // No permite un array vacío
            }

            return imagenes.every((imagen) => {
                return imagen.hasOwnProperty('imgBase64') && imagen.imgBase64.trim() !== '' && /^data:image\/([a-zA-Z]*);base64,([^\s]*)$/.test(imagen.imgBase64);
            });
        })
        .withMessage("La propiedad 'imagenes' es un array que contiene una propiedad 'imgBase64' que debe tener como valor una imagen en base64."),


    check('tipoHabitacion')
        .optional() // Esto permite que "tipoHabitacion" sea opcional
        .isObject().withMessage("El campo 'tipoHabitacion' debe ser un objeto"),

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


const validateEditRoom = [

    check('numero')
        .exists().withMessage("Falta la propiedad numero en el json")
        .not()
        .isEmpty().withMessage("El numero no puede estar vacio")
        .isNumeric().withMessage("El numero solo puede contener numeros")
        .isLength({ min: 1, max: 4 }).withMessage("El numero solo puede tener entre 1 y 4 digitos")
        .custom((value) => value > 0).withMessage("El numero no puede contener numeros negativos"),

    check('descripcion')
        .exists().withMessage("Falta la propiedad descripcion en el json")
        .not()
        .isEmpty().withMessage("La descripcion no puede estar vacia")
        .isString().withMessage("La descripcion solo puede ser texto"),

    check('capacidad')
        .exists().withMessage("Falta la capacidad en el json")
        .not()
        .isEmpty().withMessage("capacidad no puede estar vacio")
        .isNumeric().withMessage("La capacidad solo contener numeros")
        .isLength({ min: 1, max: 1 }).withMessage("La capacidad solo puede tener un digito")
        .custom((value) => value > 0).withMessage("La capacidad no puede contener numeros negativos"),

    check('estado')
        .exists().withMessage("Falta la estado tipo en el json")
        .not()
        .isEmpty().withMessage("El estado esta vacio")
        .custom((value) => value == "Inactivo" || value == "Activo").withMessage("El estado solo puede ser: Activo ó Inactivo"),

    check('precio')
        .exists().withMessage("Falta la propiedad precio en el json")
        .not()
        .isEmpty().withMessage("El precio esta vacio")
        .isNumeric().withMessage("El precio solo puede contener numeros")
        .custom((value) => value > 0).withMessage("El precio no puede contener numeros negativos"),

    check('porcentajeDescuento')
        .exists().withMessage("Falta la propiedad porcentajeDescuento en el json")
        .not()
        .isEmpty().withMessage("El porcentajeDescuento no puede estar vacio")
        .isNumeric().withMessage("El porcentajeDescuento solo puede contener numeros")
        .isLength({ min: 1, max: 2 }).withMessage("El porcentajeDescuento solo puede tener entre 1 y 2 digitos")
        .custom((value) => value >= 0).withMessage("El porcentajeDescuento no puede contener numeros negativos")
        .custom((value) => value <= 80).withMessage("El porcentajeDescuento solo puede ser menor o igual a 80"),

        check('imagenes')
        .optional()
        .custom((imagenes) => {
            return (Array.isArray(imagenes)) 
        })
        .withMessage("La propiedad 'imagenes' es un array que contiene una propiedad 'imgBase64' que debe tener como valor una imagen en base64."),

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





export { validateGetRoomID, validateRegisterRoom, validateEditRoom }