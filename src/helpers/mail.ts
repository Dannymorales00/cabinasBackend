const nodemailer = require("nodemailer");
require('dotenv').config();

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_AUTH_USER, // generated ethereal user
        pass: process.env.EMAIL_AUTH_PASS, // generated ethereal password
    },
});

/**
 * send mail with defined transport object
 * @param {string} mailto
 * @param {string} codigoRecuperacion
 * @return {promise} Promise
 */
async function sendEmail(mailto: string, codigoRecuperacion: string, nombreUsuario: string): Promise<boolean> {
    return new Promise((resolve, _reject) => {
        transporter.sendMail({
            from: '"Módulo de Seguridad - Cabinas Guanacaste 🛏️" <correosinfo.cr@gmail.com>',
            to: mailto,
            subject: "Solicitud de cambio de contraseña ✔",
            html: `
            <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #F2F2F2;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            background-color: #FFFFFF;
                            border: 1px solid #CCCCCC;
                            border-radius: 5px;
                        }
                        .token {
                            background-color: #CCCCCC;
                            padding: 10px;
                            border-radius: 5px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <p>Hola, <b>${nombreUsuario}</b></p>
                        <p>Has solicitado restablecer tu contraseña.</p>
                        <p>Si usted no solicito cambiar su contraseña, ignore este mensaje.</p>
                        <p>El codigo de restablecimiento es: <h3 class="token">${codigoRecuperacion}</h3></p>
                        <br>
                        <p>Puedes continuar restableciendo tu contraseña en el sitio web.</p>
                        <p>Gracias.</p>
                    </div>
                </body>
            </html>
        `
        }, (error: Error, _result: any) => {
            if (error) {
                console.log(error);
                resolve(false);
            }
            resolve(true);
        }
        );
    })
}
export default sendEmail;