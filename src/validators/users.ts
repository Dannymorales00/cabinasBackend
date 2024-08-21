import { check, param } from 'express-validator';
import { validateResult } from '../helpers/validateHelper';
import { NextFunction, Request, Response } from 'express';


/** 
 * using for validate json with espress-validator
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
const validateLogin = [
    check('cedula')
        .exists().withMessage("Falta la propiedad cedula en el json")
        .not()
        .isEmpty().withMessage("La cedula esta vacia")
        .isNumeric().withMessage("La cedula solo puede contener numeros")
        .isLength({ min: 9, max: 9 }).withMessage("La cedula debe contener 9 digitos")
        .custom((value) => value > 0).withMessage("La cedula no puede contener numeros negativos"),

    check('contrasena')
        .exists().withMessage("Falta la propiedad contrasena en el json")
        .not()
        .isEmpty().withMessage("La contrasena esta vacia")
        .custom((value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/.test(value))
        .withMessage("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial."),
    /** 
     * using for validate json with espress-validator
     * @param  {Request} req
     * @param  {Response} res
     * @param  {NextFunction} next
     */
    (_req: Request, res: Response, next: NextFunction) => {
        validateResult(_req, res, next)
    }
]


const validateParamID = [
    param('id')
        .exists().withMessage("Falta la propiedad id en el json")
        .not()
        .isEmpty().withMessage("La id esta vacio")
        .isNumeric().withMessage("La id solo puede contener numeros")
        .custom((value) => value > 0).withMessage("El id no puede contener numeros negativos"),

    (_req: Request, res: Response, next: NextFunction) => {
        validateResult(_req, res, next)
    }
]

const validateEditUser = [
    param('id')
        .exists().withMessage("Falta la propiedad id en el json")
        .not()
        .isEmpty().withMessage("La id esta vacio")
        .isNumeric().withMessage("La id solo puede contener numeros")
        .custom((value) => value > 0).withMessage("El id no puede contener numeros negativos"),

    check('nombre')
        .optional()
        .exists().withMessage("Falta la propiedad nombre en el json")
        .not()
        .isEmpty().withMessage("El nombre esta vacio")
        .isString().withMessage("El nombre solo puede ser texto"),

    check('correo')
        .optional()
        .exists().withMessage("Falta la propiedad correo en el json")
        .not()
        .isEmpty().withMessage("El correo esta vacio")
        .isEmail().withMessage("EL correo no es una direccion de correo valida")
        .custom((value) => value.endsWith('@gmail.com')).withMessage("El correo debe terminar en '@gmail.com'"),

    check('telefono')
        .optional()
        .exists().withMessage("Falta la propiedad telefono en el json")
        .not()
        .isEmpty().withMessage("El telefono esta vacio")
        .isNumeric().withMessage("El telefono solo puede contener numeros")
        .isLength({ min: 8, max: 8 }).withMessage("El telefono solo debe contener 8 digitos")
        .custom((value) => value > 0).withMessage("El telefono no puede contener numeros negativos"),

    check('tipo')
        .optional()
        .exists().withMessage("Falta la propiedad tipo en el json")
        .not()
        .isEmpty().withMessage("El tipo esta vacio")
        .custom((value) => value == "Administrador" || value == "Cliente").withMessage("El tipo solo pueder ser:  Administrador ó Cliente"),

    check('estado')
        .optional()
        .exists().withMessage("Falta la propiedad estado en el json")
        .not()
        .isEmpty().withMessage("El estado esta vacio")
        .custom((value) => value == "Inactivo" || value == "Activo").withMessage("El estado solo puede ser: Activo ó Inactivo"),

    (_req: Request, res: Response, next: NextFunction) => {
        validateResult(_req, res, next)
    }
]


const validateRegisterUser = [
    check('cedula')
        .exists().withMessage("Falta la propiedad cedula en el json")
        .not()
        .isEmpty().withMessage("La cedula esta vacia")
        .isNumeric().withMessage("La cedula solo puede contener numeros")
        .isLength({ min: 9, max: 9 }).withMessage("La cedula debe contener 9 digitos")
        .custom((value) => value > 0).withMessage("La cedula no puede contener numeros negativos"),

    check('nombre')
        .exists().withMessage("Falta la propiedad nombre en el json")
        .not()
        .isEmpty().withMessage("El nombre esta vacia")
        .isString().withMessage("El nombre solo puede ser texto")
    ,

    check('correo')
        .exists().withMessage("Falta la propiedad correo en el json")
        .not()
        .isEmpty().withMessage("El correo esta vacia")
        .isEmail().withMessage("EL correo no es una direccion de correo valida")
        .custom((value) => value.endsWith('@gmail.com')).withMessage("El correo debe terminar en '@gmail.com'"),

    check('telefono')
        .exists().withMessage("Falta la propiedad telefono en el json")
        .not()
        .isEmpty().withMessage("El telefono esta vacia")
        .isNumeric().withMessage("El telefono solo puede contener numeros")
        .isLength({ min: 8, max: 8 }).withMessage("El telefono solo debe contener 8 digitos")
        .custom((value) => value > 0).withMessage("El telefono no puede contener numeros negativos"),

    check('tipo')
        .optional()
        .exists().withMessage("Falta la propiedad tipo en el json")
        .not()
        .isEmpty().withMessage("El tipo esta vacio")
        .custom((value) => value == "Cliente").withMessage("El tipo solo pueder ser de tipo: Cliente"),

    check('estado')
        .optional()
        .exists().withMessage("Falta la propiedad estado en el json")
        .not()
        .isEmpty().withMessage("El estado esta vacio")
        .custom((value) => value == "Inactivo" || value == "Activo").withMessage("El estado solo puede ser: Activo ó Inactivo"),

        check('contrasena')
        .exists().withMessage("Falta la propiedad contrasena en el json")
        .not()
        .isEmpty().withMessage("La contrasena esta vacia")
        .custom((value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/.test(value))
        .withMessage("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial."),
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

const validateForgotPassword = [
    check('correo')
        .exists().withMessage("Falta la propiedad correo en el json")
        .not()
        .isEmpty().withMessage("El correo esta vacia")
        .isEmail().withMessage("EL correo no es una direccion de correo valida")
        .custom((value) => value.endsWith('@gmail.com')).withMessage("El correo debe terminar en '@gmail.com'"),
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

const validateNewPassword = [
    check('codigoRecuperacion')
        .exists().withMessage("Falta la propiedad codigoRecuperacion en el json")
        .not()
        .isEmpty().withMessage("El codigo esta vacio")
        .isLength({ min: 6, max: 6 }).withMessage("El codigo debe contener 6 digitos"),

    check('')
        .exists().withMessage("Falta la propiedad nuevaContrasena en el json")
        .not()
        .isEmpty().withMessage("nuevaContrasena esta vacio")
        .isLength({ min: 8, max: 16 }).withMessage("La nueva contrasena debe contener entre 8 y 16 digitos"),

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


export {
    validateLogin, validateParamID, validateEditUser,
    validateRegisterUser, validateForgotPassword, validateNewPassword
}