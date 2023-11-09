export class User {
    id?: number;
    name: string;
    email: string;
    password: string;
    verifyPassword: string;

    constructor(id: number, name: string, email: string, password: string, verifyPassword: string){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.verifyPassword = verifyPassword;
    }
}