import { InvalidEmailError } from "../../src/entities/errors/invalid-email-error";
import { InvalidNameError } from "../../src/entities/errors/invalid-name-error";
import { User } from "../../src/entities/user";
import { left } from "../../src/shared/either";

describe('User domain entity', () => {

    test('Should not create user with invalid email address', () => {
        const invalidEmail = 'invalidEmail';
        const error = User.create({name: 'any_name', email: invalidEmail});
        expect(error).toEqual(left(new InvalidEmailError()));
    });

    test('Should not create user with invalid name (too few spaces)', () => {
        const invalidName = 'N  ';
        const error = User.create({name: invalidName, email: 'any@mail.com'});
        expect(error).toEqual(left(new InvalidNameError()));
    });

    test('Should not create user with invalid name (too many characteres)', () => {
        const invalidName = 'l'.repeat(257);
        const error = User.create({name: invalidName, email: 'any@mail.com'});
        expect(error).toEqual(left(new InvalidNameError()));
    });

});
