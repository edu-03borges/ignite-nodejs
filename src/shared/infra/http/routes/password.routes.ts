import { ResetPasswordUserController } from "@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController";
import { SendForgotPasswordMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";
import { Router } from "express";

const passworRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordUserController = new ResetPasswordUserController();

passworRoutes.post("/forgot", (request, response) => {
    return sendForgotPasswordMailController.handle(request, response);
})

passworRoutes.post("/reset", (request, response) => {
    return resetPasswordUserController.handle(request, response);
})

export { passworRoutes };