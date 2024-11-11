import { AppError } from "./app.error";

export class ServerError extends AppError {
    constructor(message: string){
        super(message, 500);
    }
}