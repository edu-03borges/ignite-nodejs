import { Router } from "express";
import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "@modules/accounts/useCases/refreshToken/RefreshTokenController";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenCOntroller = new RefreshTokenController();

authenticateRoutes.post("/sessions", (request, response) => {
    return authenticateUserController.handle(request, response);
});

authenticateRoutes.post("/refresh-token", ( request, response ) => {
    return refreshTokenCOntroller.handle(request, response);
})

export { authenticateRoutes };