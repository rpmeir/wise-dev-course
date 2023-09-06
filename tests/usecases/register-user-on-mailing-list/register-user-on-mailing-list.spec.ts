import { UserRepository } from "../../../src/usecases/register-user-on-mailing-list/ports/user-repository";
import { InMemoryUserRepository } from "../../../src/usecases/register-user-on-mailing-list/repository/in-memory-user-repository";
import { UserData } from "../../../src/entities/user-data";

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

    });
});
