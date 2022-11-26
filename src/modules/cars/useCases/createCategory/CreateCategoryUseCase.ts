import {inject, injectable} from "tsyringe"
import { AppError } from "@shared/errors/AppError";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

interface IRequest{
  name:string;
  description:string;
}

@injectable()
class CreateCategoryUseCase{

  constructor(
    // injetando a dependendica 
    @inject("CategoriesRepository")
    private categoriesRepository:ICategoriesRepository){}

    async execute({name, description}:IRequest):Promise<void>{

      const categoryExist = await this.categoriesRepository.findByName(name);
      
      if(categoryExist){ 
        throw new AppError("Category already exists!");
      }
    
      await this.categoriesRepository.create({name, description})
  }
}

export {CreateCategoryUseCase}