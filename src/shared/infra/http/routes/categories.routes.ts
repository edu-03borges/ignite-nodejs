import { Router } from "express";
import multer from "multer";
import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ListCategoryController } from "@modules/cars/useCases/listCategory/ListCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const categoriesRoutes = Router();

const upload = multer({
    dest: "./tmp"
})

const createCategoryController = new CreateCategoryController()
const listCategoryController = new ListCategoryController();
const importCategoryController = new ImportCategoryController()

categoriesRoutes.post("/", ensureAuthenticated, ensureAdmin, (request, response) => {
    return createCategoryController.handle(request, response);
})

categoriesRoutes.get("/", (request, response) => {
    return listCategoryController.handle(request, response)
})

categoriesRoutes.post("/import", ensureAuthenticated, ensureAdmin, upload.single("file"), (request, response) => {
    return importCategoryController.handle(request, response);
})

export { categoriesRoutes }