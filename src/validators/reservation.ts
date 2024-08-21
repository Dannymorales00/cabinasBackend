import { body, check, param } from 'express-validator';
import { validateResult } from '../helpers/validateHelper';
import { NextFunction, Request, Response } from 'express';

const validateGetReservationID = [
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

const validateRegisterReservation = [
    body()
        .custom((_value, { req }) => {
            const allowedProperties = ['idUsuario', 'idPaypalPago', 'numeroHabitacion', 'cantidadHuespedes', 'estadoReserva', 'montoReserva', 'montoTotal', 'fechaReservaDesde', 'fechaReservaHasta', 'metodoPago', 'estadoPago', 'estadoPago', 'porcentajeDescuento'];
            const receivedProperties = Object.keys(req.body);

            // Filtra las propiedades recibidas que no estén en allowedProperties
            const extraProperties = receivedProperties.filter(prop => !allowedProperties.includes(prop));
            return (extraProperties.length <= 0)

        }).withMessage("Solo se permiten las propiedades: 'idUsuario', 'idPaypalPago', 'numeroHabitacion', 'cantidadHuespedes', 'estadoReserva', 'montoReserva', 'montoTotal','fechaReservaDesde', 'fechaReservaHasta','metodoPago', 'estadoPago', 'estadoPago','porcentajeDescuento'"),

    check('idUsuario')
        .exists().withMessage("Falta la propiedad idUsuario en el json")
        .not()
        .isEmpty().withMessage("El idUsuario no puede estar vacio")
        .isNumeric().withMessage("El idUsuario solo puede contener numeros")
        .custom((value) => value > 0).withMessage("El idUsuario no puede contener numeros negativos"),

    check('idPaypalPago')
        .exists().withMessage("Falta la propiedad idPaypalPago en el json")
        .not()
        .isEmpty().withMessage("El idPaypalPago no puede estar vacio"),

    check('numeroHabitacion')
        .exists().withMessage("Falta la propiedad numeroHabitacion en el json")
        .not()
        .isEmpty().withMessage("El numeroHabitacion no puede estar vacio")
        .isNumeric().withMessage("El numeroHabitacion solo puede contener numeros")
        .custom((value) => value > 0).withMessage("El numeroHabitacion no puede contener numeros negativos"),

    check('cantidadHuespedes')
        .exists().withMessage("Falta la propiedad cantidadHuespedes en el json")
        .not()
        .isEmpty().withMessage("El cantidadHuespedes no puede estar vacio")
        .isNumeric().withMessage("El cantidadHuespedes solo puede contener numeros")
        .custom((value) => value > 0).withMessage("El cantidadHuespedes no puede contener numeros negativos"),

    check('estadoReserva')
        .exists().withMessage("Falta la propiedad estadoReserva en el json")
        .not()
        .isEmpty().withMessage("La estadoReserva no puede estar vacia")
        .isString().withMessage("La estadoReserva solo puede ser texto"),

    check('montoReserva')
        .exists().withMessage("Falta la propiedad montoReserva en el json")
        .not()
        .isEmpty().withMessage("El montoReserva no puede estar vacio")
        .isNumeric().withMessage("El montoReserva solo puede contener numeros")
        .custom((value) => value > 0).withMessage("El montoReserva no puede contener numeros negativos"),

    check('montoTotal')
        .exists().withMessage("Falta la propiedad montoTotal en el json")
        .not()
        .isEmpty().withMessage("El montoTotal no puede estar vacio")
        .isNumeric().withMessage("El montoTotal solo puede contener numeros")
        .custom((value) => value > 0).withMessage("El montoTotal no puede contener numeros negativos"),


    check('metodoPago')
        .exists().withMessage("Falta la propiedad metodoPago en el json")
        .not()
        .isEmpty().withMessage("La metodoPago no puede estar vacia")
        .isString().withMessage("La metodoPago solo puede ser texto"),

    check('estadoPago')
        .exists().withMessage("Falta la propiedad estadoPago en el json")
        .not()
        .isEmpty().withMessage("La estadoPago no puede estar vacia")
        .isString().withMessage("La estadoPago solo puede ser texto"),

    check('porcentajeDescuento')
        .exists().withMessage("Falta la propiedad porcentajeDescuento en el json")
        .not()
        .isEmpty().withMessage("porcentajeDescuento no puede estar vacio")
        .isNumeric().withMessage("La porcentajeDescuento solo contener numeros")
        .isLength({ min: 1, max: 2 }).withMessage("La porcentajeDescuento solo puede entre uno y dos digitos")
        .custom((value) => value >= 0).withMessage("La porcentajeDescuento no puede contener numeros negativos"),

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
export { validateGetReservationID, validateRegisterReservation }