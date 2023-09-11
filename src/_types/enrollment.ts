import { Schema } from "mongoose";
import IMongo from "./mongo";
import IMMY from "./mmy";
import IUser from "./user";

export enum EnrollmentStatus {
    pending = 'Pending',
    approved = 'Approved',
    rejected = 'Rejected'
}

export default interface IEnrollment extends IMongo {
    mmy: Schema.Types.ObjectId | IMMY
    licenseNumber: string
    timeStamp: Date
    vinNumber: string
    user: Schema.Types.ObjectId | IUser
    status: EnrollmentStatus|string
}