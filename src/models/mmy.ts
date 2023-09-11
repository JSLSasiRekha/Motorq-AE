import IMMY from '@_types/mmy';
import Models from '@utils/models';
import { validateAdminVin } from '@utils/validation';
import { Model, model, Schema } from 'mongoose';

const mmySchema = new Schema<IMMY>({
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    timeStamp: {
        type: Date,
        default: Date.now
    },
    adminVin: {
        type: String,
        required: true,
        validate: {
            validator: validateAdminVin,
            message: 'Invalid Admin VIN'
        }
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: Models.user,
        required: true
    }
})

const MMY: Model<IMMY> = model<IMMY>(Models.mmy, mmySchema)

export default MMY