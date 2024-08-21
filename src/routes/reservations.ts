import express from "express";
import validateToken from '../helpers/validate-token';
const router = express.Router();
import checkRole from "../helpers/checkRole";
import { getReservations,validateIdPaypal, getReservation, getReservationUserId,postReservationAvailableId, editReservation, deleteReservation, postReservation } from "../controllers/reservation";
import { validateGetReservationID, validateRegisterReservation } from '../validators/reservation';

/**
 * @swagger
 * paths:
 *  /api/reservations:
 *      get:
 *          tags:
 *             - reservations
 *          summary: "gets reservations"
 *          description: "Este endpoint obtiene un recurso privado que requiere autenticación."
 *          security:
 *            - bearerAuth: []  # Indica que esta ruta requiere autenticación Bearer
 *         
 *          
 *          responses:
 *              '200':
 *                  description: Respuesta exitosa
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  reservations:
 *                                      type: object
 *              '400':
 *                  description: Solicitud incorrecta
 *              '401':
 *                  description: Credenciales inválidas
 *              '500':
 *                  description: Error en el servidor
 * 
 * components:
 *  securitySchemes:
 *  bearerAuth:
 *  type: http
 *  scheme: bearer               
 * */
router.get('/', validateToken, checkRole("Administrador", "Cliente"), getReservations);
/**
 * @swagger
 * paths:
 *  /api/reservations/user/{id}:
 *      get:
 *          tags:
 *             - reservations
 *          summary: "get user reservations"
 *          description: "Este endpoint obtiene un recurso privado que requiere autenticación."
 *          security:
 *            - bearerAuth: []  # Indica que esta ruta requiere autenticación Bearer
 *         
 *          
 *          responses:
 *              '200':
 *                  description: Respuesta exitosa
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  reservations:
 *                                      type: object
 *              '400':
 *                  description: Solicitud incorrecta
 *              '401':
 *                  description: Credenciales inválidas
 *              '500':
 *                  description: Error en el servidor
 * 
 * components:
 *  securitySchemes:
 *  bearerAuth:
 *  type: http
 *  scheme: bearer               
 * */
router.get('/user/:id', validateToken, checkRole("Administrador", "Cliente"), getReservationUserId);
/**
 * @swagger
 * paths:
 *  /api/reservations/{id}:
 *      get:
 *          tags:
 *             - reservations
 *          summary: "get reservations with id"
 *          description: "Este endpoint obtiene un recurso privado que requiere autenticación."
 *          security:
 *            - bearerAuth: []  # Indica que esta ruta requiere autenticación Bearer
 *          parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: ID del usuario que se desea obtener.
 *        
 *          
 *          responses:
 *              '200':
 *                  description: Respuesta exitosa
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  users:
 *                                      type: object
 *              '400':
 *                  description: Solicitud incorrecta
 *              '401':
 *                  description: Credenciales inválidas
 *              '500':
 *                  description: Error en el servidor
 * 
 * components:
 *  securitySchemes:
 *  bearerAuth:
 *  type: http
 *  scheme: bearer               
 * */
router.get('/:id', validateToken, validateGetReservationID, checkRole("Administrador", "Cliente"), getReservation);
/**
 * @swagger
 * paths:
 *  /api/edit/reservations:
 *      update:
 *          tags:
 *             - reservations
 *          summary: "update reservations"
 *          description: "Este endpoint obtiene un recurso privado que requiere autenticación."
 *          security:
 *            - bearerAuth: []  # Indica que esta ruta requiere autenticación Bearer
 *         
 *          
 *          responses:
 *              '200':
 *                  description: Respuesta exitosa
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  reservations:
 *                                      type: object
 *              '400':
 *                  description: Solicitud incorrecta
 *              '401':
 *                  description: Credenciales inválidas
 *              '500':
 *                  description: Error en el servidor
 * 
 * components:
 *  securitySchemes:
 *  bearerAuth:
 *  type: http
 *  scheme: bearer               
 * */
router.put('/edit/:id', validateToken, checkRole("Administrador"), editReservation);
/**
 * @swagger
 * paths:
 *  /api/reservations/delete/{id}:
 *      delete:
 *          tags:
 *             - reservations
 *          summary: "delete reservations"
 *          description: "Este endpoint obtiene un recurso privado que requiere autenticación."
 *          security:
 *            - bearerAuth: []  # Indica que esta ruta requiere autenticación Bearer
 *         
 *          
 *          responses:
 *              '200':
 *                  description: Respuesta exitosa
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  reservations:
 *                                      type: object
 *              '400':
 *                  description: Solicitud incorrecta
 *              '401':
 *                  description: Credenciales inválidas
 *              '500':
 *                  description: Error en el servidor
 * 
 * components:
 *  securitySchemes:
 *  bearerAuth:
 *  type: http
 *  scheme: bearer               
 * */
router.delete('/delete/:id', validateToken, checkRole("Administrador"), deleteReservation);
/**
 * @swagger
 * paths:
 *  /api/reservations:
 *      post:
 *          tags:
 *              - reservations
 *          summary: "Register reservations"
 *          description: "Este endpoint es para registrar reservaciones"
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/user'
 *          
 *          responses:
 *              '200':
 *                  description: Respuesta exitosa
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  users:
 *                                      type: object
 *                  
 *              '400':
 *                  description: Solicitud incorrecta
 *              '401':
 *                  description: Credenciales inválidas
 *              '500':
 *                  description: Error en el servidor
 * */
router.post('/', validateRegisterReservation, validateToken, checkRole("Administrador","Cliente"),validateIdPaypal, postReservation)

router.post('/available/:id', validateToken, checkRole("Administrador", "Cliente"), postReservationAvailableId);

export default router; 