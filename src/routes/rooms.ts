import express from "express";
import validateToken from '../helpers/validate-token';
const router = express.Router();
import checkRole from "../helpers/checkRole";
import { getRooms, getRoomsAdm, getRoom, editRoom, deleteRoom, postRoom } from "../controllers/rooms";
import { validateGetRoomID, validateRegisterRoom, validateEditRoom } from '../validators/roms';

/**
 * @swagger
 * paths:
 *  /api/rooms:
 *      get:
 *          tags:
 *             - rooms
 *          summary: "gets rooms"
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
router.get('/', getRooms);

router.get('/adm', validateToken, checkRole("Administrador"), getRoomsAdm);
/**
 * @swagger
 * paths:
 *  /api/rooms/{id}:
 *      get:
 *          tags:
 *             - rooms
 *          summary: "get room with id"
 *          description: "Este endpoint obtiene un recurso privado que requiere autenticación."
 *          security:
 *            - bearerAuth: []  # Indica que esta ruta requiere autenticación Bearer
 *          parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: ID de la habitaciones que se desea obtener.
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
router.get('/:id', validateToken, validateGetRoomID, checkRole("Administrador", "Cliente"), getRoom);
/**
 * @swagger
 * paths:
 *  /api/rooms/edit/{id}:
 *      update:
 *          tags:
 *             - rooms
 *          summary: "update rooms"
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
router.put('/edit/:id', validateToken, validateEditRoom, checkRole("Administrador"), editRoom);
/**
 * @swagger
 * paths:
 *  /api/rooms/delete/{id}:
 *      delete:
 *          tags:
 *             - rooms
 *          summary: "delete rooms"
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
router.delete('/delete/:id', validateToken, checkRole("Administrador"), deleteRoom);
/**
 * @swagger
 * paths:
 *  /api/rooms:
 *      post:
 *          tags:
 *              - rooms
 *          summary: "Register rooms"
 *          description: "Este endpoint es para registrar habitaciones"
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
router.post('/', validateRegisterRoom, validateToken, checkRole("Administrador"), postRoom)


export default router; 