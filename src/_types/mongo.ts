import { Schema } from "mongoose";

export default interface IMongo {
    _id: Schema.Types.ObjectId
    __v?: number
}