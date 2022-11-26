import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUsersDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository{

    private users:User[] = [];

    async create({ name, password, email, driver_license}: ICreateUsersDTO): Promise<void> {
        const user = new User();

        Object.assign(user, { 
            name, 
            password, 
            email, 
            driver_license
        });

        this.users.push(user);
    }

    async findByEmail(email: string): Promise<User> {
        return this.users.find(element => element.email === email);
    }
    
    async findById(id: string): Promise<User> {
        return this.users.find(element => element.id === id);

    }
}

export { UsersRepositoryInMemory };