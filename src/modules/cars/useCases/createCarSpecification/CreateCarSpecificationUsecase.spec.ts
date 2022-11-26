import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let createCarSpecificationUsecase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory

describe("Create Car Specification", () => {

    beforeAll(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        
        specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory()

        createCarSpecificationUsecase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory,
            specificationsRepositoryInMemory
        );
    })

    it("should not be able to add a new specification to a now-existent car", async () => {

        const car_id = "1234";
        const specifications_id = ["54321"]

        await expect(createCarSpecificationUsecase.execute({ car_id, specifications_id}))
        .rejects
        .toEqual(new AppError("Car does not exists!"))
    })

    it("should be able to add a new specification to the car", async () => {
        const car = {
            name: "Name Car",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-123",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category"
        }

        const specification = await specificationsRepositoryInMemory.create({
            description: "test",
            name: "test"
        })

        const result = await carsRepositoryInMemory.create(car);
        
        const specifications_id = [specification.id]

        const specificationsCars = await createCarSpecificationUsecase.execute({ 
            car_id: result.id, 
            specifications_id
        });

        expect(specificationsCars).toHaveProperty("specifications");
        expect(specificationsCars.specifications.length).toBe(1);
    })
})