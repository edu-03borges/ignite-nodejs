import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);

    })

    it("should be able to create a new car", async () => {
        const car = {
            name: "Name Car",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-123",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category"
        }

        const result = await createCarUseCase.execute(car);

        expect(result).toHaveProperty("id");
    });

    it("should not be able to create a car with exists license plate", async () => {

        const car1 = {
            name: "Name Car",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-123",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category"
        }

        const car2 = {
            name: "Name Car 2",
            description: "Description Car 2",
            daily_rate: 100,
            license_plate: "ABC-123",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category"
        }
                 
        await createCarUseCase.execute(car1);

        await expect(createCarUseCase.execute(car2))
        .rejects
        .toEqual(new AppError("Car already exists!"));
    })

    it("should not be able to create a car with available true by default", async () => {
        const car = {
            name: "Name Car",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-123",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category"
        }

        const result = await createCarUseCase.execute(car);

        expect(result.available).toBe(true);
    })
})