import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

interface IRequest {
    category_id?: string;
    brand?: string;
    name?: string;
}

class ListAvailableCarsController {
    async handle(request: Request, response: Response): Promise<Response> {

        const { brand, name, category_id } = request.query as IRequest

        const listAvailableCarsUseCase = container.resolve(ListAvailableCarsUseCase);

        const cars = await listAvailableCarsUseCase.execute({brand, name, category_id});

        return response.json(cars);
    }
}

export { ListAvailableCarsController };