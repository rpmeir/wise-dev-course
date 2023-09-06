import { Email } from "../../src/entities/email";

describe('Email validation', () => {

    test('Should not accept null strings', () => {
        const email = null;
        expect(Email.validate(email)).toBeFalsy();
    });

    test('Should not accept empty strings', () => {
        const email: string = '';
        expect(Email.validate(email)).toBeFalsy();
    });

    test('Should accept valid email', () => {
        const email: string = 'any@mail.com';
        expect(Email.validate(email)).toBeTruthy();
    });

    test('Should not accept strings larger than 320 chars', () => {
        const email: string  = 'l'.repeat(64) + '@' + 'd'.repeat(128) + '.' + 'd'.repeat(127);
        expect(Email.validate(email)).toBeFalsy();
    });

    test('Should not accept local part larger than 64 chars', () => {
        const email: string  = 'l'.repeat(65) + '@mail.com';
        expect(Email.validate(email)).toBeFalsy();
    });

    test('Should not accept domain part larger than 255 chars', () => {
        const email: string  = 'local@' + 'd'.repeat(128) + '.' + 'd'.repeat(127);
        expect(Email.validate(email)).toBeFalsy();
    });

    test('Should not accept empty local part', () => {
        const email: string  = '@mail.com';
        expect(Email.validate(email)).toBeFalsy();
    });

});