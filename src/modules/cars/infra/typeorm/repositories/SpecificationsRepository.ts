import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ISpecificationsRepository, ICreateSpecificationDTO } from "@modules/cars/repositories/ISpecificationsRepository";
import { getRepository, Repository } from "typeorm"

class SpecificationsRepository implements ISpecificationsRepository  {

    private specifications: Repository<Specification>;

    constructor() {
        this.specifications = getRepository(Specification);
    }

    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = this.specifications.create({
            name,
            description
        })

        await this.specifications.save(specification);

        return specification;
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.specifications.findOne({ name });
        return specification
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        return await this.specifications.findByIds(ids);
    }
}

export { SpecificationsRepository }