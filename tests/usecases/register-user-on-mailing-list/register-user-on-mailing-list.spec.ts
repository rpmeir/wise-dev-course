import { UserRepository } from "../../../src/usecases/register-user-on-mailing-list/ports";
import { InMemoryUserRepository } from "./repository";
import { UserData } from "../../../src/entities";
import { RegisterUserOnMailingList } from "../../../src/usecases/register-user-on-mailing-list";

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
        const response = (await usecase.registerUserOnMailingList({name: name, email: invalidEmail})).value as Error;
        const user = await repo.findUserByEmail(invalidEmail);
        expect(user).toBeNull();
        expect(response.name).toEqual('InvalidEmailError');
    });

    test('Should not add if invalid name', async () => {
        const users: UserData[] = [];
        const repo: UserRepository = new InMemoryUserRepository(users);
        const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo);
        const name = '';
        const email = ' user@email.com';
        const response = (await usecase.registerUserOnMailingList({name: name, email: email})).value as Error;
        const user = await repo.findUserByEmail(email);
        expect(user).toBeNull();
        expect(response.name).toEqual('InvalidNameError');
    });

});
