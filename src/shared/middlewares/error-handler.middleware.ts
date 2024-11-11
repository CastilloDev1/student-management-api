import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { AppError } from "../utils/custom-errors/app.error";
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";

export const ErrorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

    if(err instanceof AppError) {
        res.status(err.statusCode).json({success: false, message: err.message});
        return;
    }

    if (err instanceof PrismaClientKnownRequestError || PrismaClientValidationError) {
        console.log(err)
        res.status(500).json({success: false, message: 'Ocurrio un error en la base de datos'});
        return;
    }

    res.status(500).json({message: 'Error interno del servidor'});
    return;

}