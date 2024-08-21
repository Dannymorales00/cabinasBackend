import express from "express";
import validateToken from '../helpers/validate-token';
const router = express.Router();
import checkRole from "../helpers/checkRole";
import { getUsers, getUser, editUser, deleteUser, postUser, postLogin, postForgotPassword, postNewPassword, getUserToken } from "../controllers/users";
import { validateLogin, validateParamID, validateEditUser, validateRegisterUser, validateForgotPassword, validateNewPassword } from '../validators/users';
/**
 * @swagger
 * paths:
 *  /api/users:
 *      get:
 *          tags:
 *             - users
 *          summary: "get all users"
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
router.get('/', validateToken, checkRole("Administrador"), getUsers);
router.get('/getUserToken', validateToken, getUserToken);
/**
 * @swagger
 * paths:
 *  /api/users/{id}:
 *      get:
 *          tags:
 *             - users
 *          summary: "get user with id"
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
router.get('/:id', validateToken, validateParamID, checkRole("Administrador", "Cliente"), getUser);
/**
 * @swagger
 * paths:
 *  /api/users/edit/{id}:
 *      put:
 *          tags:
 *             - users
 *          summary: "update a user"
 *          description: "Este endpoint obtiene un recurso privado que requiere autenticación."
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/json:
 *                      schema:
 *                            $ref: '#/components/schemas/updateUser'
 *          security:
 *            - bearerAuth: []  # Indica que esta ruta requiere autenticación Bearer
 *          parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: ID del usuario que se desea actualizar.
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
router.put('/edit/:id', validateToken, validateEditUser, checkRole("Administrador", "Cliente"), editUser);
/**
 * @swagger
 * paths:
 *  /api/users/delete/{id}:
 *      delete:
 *          tags:
 *             - users
 *          summary: "delete a user"
 *          description: "Este endpoint obtiene un recurso privado que requiere autenticación."
 *          security:
 *            - bearerAuth: []  # Indica que esta ruta requiere autenticación Bearer
 *          parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: ID del usuario que se desea eliminar.
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
router.delete('/delete/:id', validateToken, validateParamID, checkRole("Administrador", "Cliente"), deleteUser);
/**
 * @swagger
 * paths:
 *  /api/users/:
 *      post:
 *          tags:
 *              - users
 *          summary: "Register users"
 *          description: "Este endpoint es para registrar usuarios"
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/json:
 *                      schema:
 *                            $ref: '#/components/schemas/registerUser'
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
router.post('/', validateRegisterUser, postUser)
/**
 * @swagger
 * paths:
 *  /api/users/login:
 *      post:
 *          tags:
 *              - users
 *          summary: "Login users"
 *          description: "Este endpoint es para logear"
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/login'
 *          
 *          responses:
 *              '200':
 *                  description: Respuesta exitosa
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  token:
 *                                      type: string
 *                  example:
 *                      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *              '400':
 *                  description: Solicitud incorrecta
 *              '401':
 *                  description: Credenciales inválidas
 *              '500':
 *                  description: Error en el servidor
 * */
router.post('/login', validateLogin, postLogin);
/**
 * @swagger
 * paths:
 *  /api/users/forgotPassword:
 *      post:
 *          tags:
 *              - users
 *          summary: "Forgot password"
 *          description: "Este endpoint es para recuperar la contraseña"
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/json:
 *                      schema:
 *                            $ref: '#/components/schemas/forgotPassword'
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
router.post('/forgotPassword', validateForgotPassword, postForgotPassword);
/**
 * @swagger
 * paths:
 *  /api/users/newPassword:
 *      post:
 *          tags:
 *              - users
 *          summary: "new password"
 *          description: "Este endpoint es para recuperar establecer una nueva contraseña"
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/json:
 *                      schema:
 *                            $ref: '#/components/schemas/newPassword'
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
router.post('/newPassword', validateNewPassword, postNewPassword)


export default router;