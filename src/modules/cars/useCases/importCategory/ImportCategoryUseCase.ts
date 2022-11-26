import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import fs from "fs";
import { parse } from "csv-parse";
import { inject, injectable } from "tsyringe";

interface ICategories {
    name: string;
    description: string;
}

@injectable()
class ImportCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: CategoriesRepository) {}

    loadFile(file: any): Promise<ICategories[]> {
        return new Promise((resolve, reject) => {
            const categories: ICategories[] = []

            const stream = fs.createReadStream(file.path);
    
            const fileParse = parse({
                    delimiter: ","
                })
    
            stream.pipe(fileParse)
    
            .on("data", (line) => {
                const [name, description] = line;
    
                categories.push({
                    name,
                    description
                })
            })
            .on("end", () => {
                resolve(categories)
            })
            .on("error", (error) => {
                reject(categories)
            })
        })
    }

    async execute(file: any): Promise<void> {
        const categories = await this.loadFile(file);

        categories.forEach((element) => {
            const { name, description } = element

            const isValid = this.categoriesRepository.findByName(name)

            if(!isValid) {
                this.categoriesRepository.create({name, description})
            }
        })
    }
}

export { ImportCategoryUseCase }