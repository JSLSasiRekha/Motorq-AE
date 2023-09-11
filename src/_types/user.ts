import IMongo from "./mongo";

export enum UserType {
    customer = "Customer",
    admin = "MotorQ Admin"
}

export default interface IUser extends IMongo {
    name: string
    email: string
    password?: string
    phone: string
    role: string | UserType
}