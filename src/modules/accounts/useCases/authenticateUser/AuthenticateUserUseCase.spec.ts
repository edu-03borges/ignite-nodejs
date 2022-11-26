import { AppError } from "@shared/errors/AppError";
import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUsersDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory"
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"


let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", function() {

    beforeEach(function() {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    })

    it("should be able to authenticate an user", async function() {
        const user: ICreateUsersDTO = { 
            name: "Beatriz", 
            password: "12345", 
            email: "bia@gmail.com", 
            driver_license: "032040"
        };

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        });

        expect(result).toHaveProperty("token");
    });

    it("should not be able to authenticate user an none existent user", async function() {
        await expect(authenticateUserUseCase.execute({
                email: "false@gmail.com",
                password: "1234"
            }))
            .rejects.toEqual(new AppError("Email or password incorrect!"));
    });

    it("should not be able to authenticate with incorrect password", async function() {

        const user: ICreateUsersDTO = { 
            name: "User Test Error", 
            password: "9999", 
            email: "user@user.com", 
            driver_license: "332"
        };

        await createUserUseCase.execute(user);

        await expect(authenticateUserUseCase.execute({
                email: user.email,
                password: "incorrectPassword"
            }))
        .rejects
        .toEqual(new AppError("Email or password incorrect!"));
    })
})