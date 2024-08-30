# Proyecto Cabinas Guanacaste - Backend

Este repositorio contiene el backend de la aplicación web **Cabinas Guanacaste**. Este proyecto se encarga de gestionar las operaciones del servidor, incluyendo la autenticación de usuarios, la gestión de reservas, y la comunicación con la base de datos y servicios externos como PayPal para los pagos.

## Tecnologías Utilizadas

Este proyecto utiliza las siguientes tecnologías y bibliotecas:

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express**: Framework para crear aplicaciones web y APIs con Node.js.
- **TypeScript**: Superconjunto de JavaScript que añade tipado estático al lenguaje.
- **Sequelize**: ORM para manejar la base de datos MySQL.
- **jsonwebtoken**: Para la autenticación basada en tokens JWT.
- **bcrypt**: Para encriptar contraseñas.
- **Nodemailer**: Para el envío de correos electrónicos.
- **Cloudinary**: Servicio para la gestión y almacenamiento de imágenes.
- **Swagger**: Para la documentación automática de la API.
- **dotenv**: Para gestionar variables de entorno.
- **Morgan**: Middleware para el registro de peticiones HTTP.

## Requisitos

Antes de empezar, asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/) como gestor de paquetes
- MySQL (para la base de datos)

## Instalación

Sigue estos pasos para clonar y configurar el proyecto en tu entorno local:

1. Clona este repositorio:

    ```bash
    git clone https://github.com/Dannymorales00/cabinasBackend.git
    ```

2. Navega al directorio del proyecto:

    ```bash
    cd cabinasBackend
    ```

3. Instala las dependencias necesarias:

    ```bash
    npm install
    ```

    o si prefieres usar `yarn`:

    ```bash
    yarn install
    ```

4. Configura las variables de entorno creando un archivo `.env` en la raíz del proyecto. Puedes utilizar el archivo `.env.example` como referencia.

5. Configura la base de datos MySQL y actualiza las credenciales en el archivo `.env`.

## Scripts disponibles

En el proyecto, puedes utilizar los siguientes scripts definidos en el archivo `package.json`:

### `npm run dev`

Este comando inicia el servidor en modo de desarrollo, utilizando `ts-node-dev` para recompilar automáticamente los cambios realizados en TypeScript.
```bash
npm run dev

```
### `npm run start`

Este comando inicia el servidor utilizando el código compilado en la carpeta build.
```bash
npm run start

```

## Capturas de Pantalla
A continuación, se muestra una imágen de la aplicación:

### Página de la documentación swagger
[![api-docs.png](https://i.postimg.cc/2yVmtCvX/api-docs.png)](https://postimg.cc/V0Q3rQKj)
