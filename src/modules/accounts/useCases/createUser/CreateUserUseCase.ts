import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository"
import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUsersDTO"
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcryptjs";

@injectable()
class CreateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository) {}
        
    async execute({ name, password, email, driver_license }: ICreateUsersDTO): Promise<void> {

        const UserAlredyExists = await this.usersRepository.findByEmail(email)
        
        if(UserAlredyExists) {
            throw new AppError("User Already Exists!")
        }

        const passwordHash = await hash(password, 8);
        
        await this.usersRepository.create({ 
            name,
            password: passwordHash, 
            email, 
            driver_license
        })
    }
}

export { CreateUserUseCase };