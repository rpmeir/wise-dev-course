import { User } from "../../src/entities";

describe('User domain entity', () => {

    test('Should not create user with invalid email address', () => {
        const invalidEmail = 'invalidEmail';
        const error = User.create({name: 'any_name', email: invalidEmail}).value as Error;
        expect(error.name).toEqual('InvalidEmailError');
        expect(error.message).toEqual(`Invalid email: ${invalidEmail}.`);
    });

    test('Should not create user with invalid name (too few spaces)', () => {
        const invalidName = 'N  ';
        const error = User.create({name: invalidName, email: 'any@mail.com'}).value as Error;
        expect(error.name).toEqual('InvalidNameError');
        expect(error.message).toEqual(`Invalid name: ${invalidName}.`);
    });

    test('Should not create user with invalid name (too many characteres)', () => {
        const invalidName = 'l'.repeat(257);
        const error = User.create({name: invalidName, email: 'any@mail.com'}).value as Error;
        expect(error.name).toEqual('InvalidNameError');
        expect(error.message).toEqual(`Invalid name: ${invalidName}.`);
    });

    test('Should create user with valid data', () => {
        const validName = 'Any Name';
        const validEmail = 'any@email.com';
        const user: User = User.create({name:validName, email: validEmail}).value as User;
        expect(user.name.value).toEqual(validName);
        expect(user.email.value).toEqual(validEmail);
        expect(user).toBeInstanceOf(User);
    })

});
