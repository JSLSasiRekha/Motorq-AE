import { Schema } from "mongoose";
import IMongo from "./mongo";
import IUser from "./user";

export default interface IMMY extends IMongo {
    make: string
    model: string
    year: string
    timeStamp: Date
    adminVin: string
    user: Schema.Types.ObjectId | IUser
}
