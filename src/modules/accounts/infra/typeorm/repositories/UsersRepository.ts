import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUsersDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository"
import { getRepository, Repository } from "typeorm";
import { User } from "@modules/accounts/infra/typeorm/entities/User";

class UsersRepository implements IUsersRepository {

    private usersRepository: Repository<User>

    constructor() {
        this.usersRepository = getRepository(User);
    }

    async create({ name, password, email, driver_license, avatar, id}: ICreateUsersDTO): Promise<void> {

        const user = this.usersRepository.create({ 
                    name,
                    password, 
                    email, 
                    driver_license,
                    avatar,
                    id });

        await this.usersRepository.save(user);
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.usersRepository.findOne({email})
        return user
    }

    async findById(id: string): Promise<User> {
        return await this.usersRepository.findOne(id)
 
    }
}

export { UsersRepository };