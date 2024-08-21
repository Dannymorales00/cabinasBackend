import express from "express";
import validateToken from '../helpers/validate-token';
const router = express.Router();
import checkRole from "../helpers/checkRole";
import { getHome, editHome, deleteHome, postHome } from "../controllers/home";
import { validateEditHome } from '../validators/home';


/**
 * @swagger
 * paths:
 *  /api/homes/{id}:
 *      get:
 *          tags:
 *             - homes
 *          summary: "get home with id"
 *          description: "Este endpoint obtiene un recurso privado que requiere autenticación."
 *          security:
 *            - bearerAuth: []  # Indica que esta ruta requiere autenticación Bearer
 *          parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: ID del home que se desea obtener.
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
router.get('/', getHome);
/**
 * @swagger
 * paths:
 *  /api/homes/edit/{id}:
 *      put:
 *          tags:
 *             - homes
 *          summary: "update home"
 *          description: "Este endpoint obtiene un recurso privado que requiere autenticación."
 *          security:
 *            - bearerAuth: []  # Indica que esta ruta requiere autenticación Bearer
 *          parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: ID del home que se desea obtener.
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
router.put('/edit', validateToken, validateEditHome, checkRole("Administrador"), editHome);
/**
 * @swagger
 * paths:
 *  /api/homes/delete/{id}:
 *      delete:
 *          tags:
 *             - homes
 *          summary: "delete home"
 *          description: "Este endpoint obtiene un recurso privado que requiere autenticación."
 *          security:
 *            - bearerAuth: []  # Indica que esta ruta requiere autenticación Bearer
 *          parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: ID del home que se desea obtener.
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
router.delete('/delete/:id', validateToken, checkRole("Administrador"), deleteHome);
/**
 * @swagger
 * paths:
 *  /api/homes:
 *      post:
 *          tags:
 *              - homes
 *          summary: "Register homes"
 *          description: "Este endpoint es para registrar homes"
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
router.post('/', validateToken, checkRole("Administrador"), postHome)


export default router; 