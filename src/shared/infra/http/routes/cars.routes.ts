import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImage/UploadCarImagesController";
import { Router } from "express";
import uploadConfig from "@config/upload";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import multer from "multer";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImageController = new UploadCarImagesController();

const upload= multer(uploadConfig.upload("./tmp/cars"));

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, (request, response) => {
    return createCarController.handle(request, response);
});

carsRoutes.get("/available", (request, response) => {
    return listAvailableCarsController.handle(request, response);
})

carsRoutes.post("/specifications/:id", ensureAuthenticated, ensureAdmin, (request, response) => {
    return createCarSpecificationController.handle(request, response);
})

carsRoutes.post("/images:id", ensureAuthenticated, ensureAdmin, upload.array("images"), (request, response) => {
    return uploadCarImageController.handle(request, response);
})

export { carsRoutes };