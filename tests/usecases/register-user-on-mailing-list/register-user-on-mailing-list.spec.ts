import { UserRepository } from "../../../src/usecases/register-user-on-mailing-list/ports/user-repository";
import { InMemoryUserRepository } from "../../../src/usecases/register-user-on-mailing-list/repository/in-memory-user-repository";
import { UserData } from "../../../src/entities/user-data";
import { RegisterUserOnMailingList } from "../../../src/usecases/register-user-on-mailing-list/register-user-on-mailing-list";
import { left } from "../../../src/shared/either";
import { InvalidEmailError } from "../../../src/entities/errors/invalid-email-error";

describe('Register user on mailing list use case', () =>{

    test('Should add user with complete data to mailing list', async () => {
        const users: UserData[] = [];
        const repo: UserRepository = new InMemoryUserRepository(users);
        const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo);
        const name = 'User Name';
        const email = 'user@email.com';
        const response = await usecase.registerUserOnMailingList({name, email});
        const user = repo.findUserByEmail(email);
        expect((await user).name).toBe(name);
        expect(response.value.name).toBe(name);
    });

    test('Should not add if invalid email', async () => {
        const users: UserData[] = [];
        const repo: UserRepository = new InMemoryUserRepository(users);
        const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo);
        const name = 'User Name';
        const invalidEmail = ' useremail.com';
        const response = await usecase.registerUserOnMailingList({name: name, email: invalidEmail});
        const user = await repo.findUserByEmail(invalidEmail);
        expect(user).toBeNull();
        expect(response).toEqual(left(new InvalidEmailError()));
    });

});
