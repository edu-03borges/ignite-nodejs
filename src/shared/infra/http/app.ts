import { Request, Response, NextFunction } from "express";
import { AppError } from '../../errors/AppError';
import { router } from "./routes";

import swaggerJson from "../../../swagger.json";
import swaggerUi from "swagger-ui-express";
import createConnection from "../typeorm";
import express from 'express';

import "express-async-errors";
import "express-async-error";
import "../../container"

createConnection();

const app = express();

app.use(express.json());

app.use(router);

app.use("/api-routes", swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message
        })
    }

    return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`
    });
});

export { app };
