import IUser, { UserType } from "@_types/user"
import Models from "@utils/models"
import { model, Schema } from "mongoose"

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: Object.values(UserType),
        default: "Customer"
    },
    __v: {
        type: Number,
        select: false
    }
})

const User = model(Models.user, userSchema)

export default User