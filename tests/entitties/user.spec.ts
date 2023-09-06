import { InvalidEmailError } from "../../src/entities/errors/invalid-email-error";
import { User } from "../../src/entities/user";
import { left } from "../../src/shared/either";

describe('User domain entity', () => {
    test('Should not create user with invalid email address', () => {
        const invalidEmail = 'invalidEmail';
        const error = User.create({name: 'any_name', email: invalidEmail});
        expect(error).toEqual(left(new InvalidEmailError()));
    });
});