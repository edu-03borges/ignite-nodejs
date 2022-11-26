import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    })

    it("should be able to list all available cars", async () => {
        const car = {
            name: "Audi R8",
            description: "Description Car",
            daily_rate: 180,
            license_plate: "CBA-123",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category"
        }

        const result = await carsRepositoryInMemory.create(car)

        const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([result])

    });

    it("should be able to list all available cars by brand", async () => {
        const car = {
            name: "Ford Fusion",
            description: "Description Car",
            daily_rate: 180,
            license_plate: "CBA-123",
            fine_amount: 60,
            brand: "Car_brand_test",
            category_id: "category"
        }

        const result = await carsRepositoryInMemory.create(car);

        const cars = await listAvailableCarsUseCase.execute({
            brand: car.brand
        });

        expect(cars).toEqual([result])
    });

    it("should be able to list all available cars by name", async () => {
        const car = {
            name: "Corola",
            description: "Description Car",
            daily_rate: 180,
            license_plate: "CBA-456",
            fine_amount: 60,
            brand: "Car_brand_test",
            category_id: "category"
        }

        const result = await carsRepositoryInMemory.create(car);

        const cars = await listAvailableCarsUseCase.execute({
            name: car.name
        });

        expect(cars).toEqual([result])
    });

    it("should be able to list all available cars by category", async () => {
        const car = {
            name: "Corola",
            description: "Description Car",
            daily_rate: 180,
            license_plate: "CBA-456",
            fine_amount: 60,
            brand: "Car_brand_test",
            category_id: "12345"
        }

        const result = await carsRepositoryInMemory.create(car);

        const cars = await listAvailableCarsUseCase.execute({
            category_id: car.category_id
        });

        expect(cars).toEqual([result])
    });
})