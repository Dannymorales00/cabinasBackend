import express, { Request, Response } from "express";
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import usersRoutes from './routes/users';
import roomsRoutes from './routes/rooms';
import homesRoutes from './routes/homes';
import reservationsRoutes from './routes/reservations';
import swaggerUi from 'swagger-ui-express';
import swaggerSetup from './docs/swagger';
import db from "./db/connection";


class Server {
    private app: express.Application;
    private port: string;
    private host: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.host = process.env.HOST || 'localhost';

        // config
        this.app.use(express.json({ limit: '50mb' }));
        this.app.use(express.urlencoded({ limit: '50mb', extended: true }));
        this.dbConnections();

        //middleware
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSetup));

        //Routes
        this.app.use('/api/users', usersRoutes)
        this.app.use('/api/rooms', roomsRoutes)
        this.app.use('/api/home', homesRoutes)
        this.app.use('/api/reservations', reservationsRoutes)

        const publicPath = path.resolve(__dirname, '..', 'public')
        this.app.use(express.static(path.join(publicPath)));
        this.app.get('/*', (_req: Request, res: Response) => {
            res.sendFile(path.join(publicPath, 'index.html'));
        });
    }

    async dbConnections() {
        try {
            await db.authenticate();
            console.log('database connection established...');
        } catch (error: any) {
            console.log('error connecting to database...');
            throw new Error(error);
        }

    }



    listen() {
        this.app.listen(this.port, () => {
            console.log(`server listening on port: http://${this.host}:${this.port}`);
        });
    }
}

export default Server