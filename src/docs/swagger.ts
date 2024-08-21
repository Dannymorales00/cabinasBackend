import swaggerJsdoc from 'swagger-jsdoc';
const swaggerDefinition = {
    openapi: "3.0.1",
    info: {
        title: "Cabinas Guanacaste",
        version: "1.0.0",
    },
    servers: [
        {
            url: "http://localhost:3001"
        },
    ],
    components: {

        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },

        },

        schemas: {
            login: {
                type: "object",
                required: ["cedula", "contrasena"],
                properties: {
                    cedula: {
                        type: "number",
                        example: "504100221",
                    },
                    contrasena: {
                        type: "string",
                        example: "Dyz123",
                    },
                },
            },
       
            updateUser: {
                type: "object",
                required: ["cedula", "nombre", "correo", "telefono", "contrasena"],
                properties: {
                    cedula: {
                        type: "number",
                        example: 504100221,
                    },
                    nombre: {
                        type: "string",
                        example: "Juan Pérez",
                    },
                    correo: {
                        type: "string",
                        example: "juan.perez@example.com",
                    },
                    telefono: {
                        type: "number",
                        example: 88887777,
                    },
                    contrasena: {
                        type: "string",
                        example: "Dyz123",
                    },
                },
            },
            registerUser: {
                type: "object",
                required: ["cedula", "nombre", "correo", "telefono", "contrasena"],
                properties: {
                    cedula: {
                        type: "number",
                        example: 504100221,
                    },
                    nombre: {
                        type: "string",
                        example: "Juan Pérez",
                    },
                    correo: {
                        type: "string",
                        example: "juan.perez@example.com",
                    },
                    telefono: {
                        type: "number",
                        example: 88887777,
                    },
                    contrasena: {
                        type: "string",
                        example: "Dyz123",
                    },
                },
            },
            forgotPassword: {
                type: "object",
                required: [ "correo", "nuevaContrasena" ],
                properties: {
                    correo: {
                        type: "string",
                        example: "juan.perez@example.com",
                    },
                    nuevaContrasena: {
                        type: "string",
                        example: "contrasenaA1B2",
                    },
                },
            },
            newPassword: {
                type: "object",
                required: [ "codigoRecuperacion"],
                properties: {
                    codigoRecuperacion: {
                        type: "string",
                        example: "A1B3C2",
                    },
                },
            },
        },
    },
};

const swaggerOptions = {
    swaggerDefinition,
    apis: ["./src/routes/*.ts"],


};
export default  swaggerJsdoc(swaggerOptions)