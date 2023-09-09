import { Either, left, right } from "../shared";
import { Email } from "./email";
import { InvalidEmailError, InvalidNameError } from "./errors";
import { Name } from "./name";
import { UserData } from "./user-data";

export class User {
    
    public readonly name: Name;
    public readonly email: Email;

    private constructor (name: Name, email: Email) {
        this.name = name;
        this.email = email;
    }

    static create(userData: UserData): Either<InvalidEmailError | InvalidNameError, User> {
        const nameOrError = Name.create(userData.name);
        if(nameOrError.isLeft()) {
            return left(nameOrError.value);
        }
        const emailOrError = Email.create(userData.email);
        if(emailOrError.isLeft()) {
            return left(emailOrError.value);
        }

        const name: Name = nameOrError.value;
        const email: Email = emailOrError.value;

        return right(new User(name, email));
    }
}