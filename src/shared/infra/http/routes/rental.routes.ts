import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalByUserController } from "@modules/rentals/useCases/listRentalByUser/ListRentalByUserController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalByUserController = new ListRentalByUserController();

rentalRoutes.post("/", ensureAuthenticated, (request, response) => {
    return createRentalController.handle(request, response);
});

rentalRoutes.post("/devolution/:id", ensureAuthenticated, (request, response) => {
    return devolutionRentalController.handle(request, response);
});

rentalRoutes.get("/user", ensureAuthenticated, (request, response) => {
    return listRentalByUserController.handle(request, response);
})

export { rentalRoutes };