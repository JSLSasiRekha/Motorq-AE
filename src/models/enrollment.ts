import { model, Schema } from 'mongoose';
import Models from '@utils/models';
import { validateCustomerVin } from '@utils/validation';
import { EnrollmentStatus } from '@_types/enrollment';

const enrollmentSchema = new Schema({
    mmy: {
        type: Schema.Types.ObjectId,
        ref: Models.mmy,
        required: true
    },
    licenseNumber: {
        type: String,
        required: true
    },
    timeStamp: {
        type: Date,
        default: Date.now
    },
    vinNumber: {
        type: String,
        required: true,
        validate: {
            validator: validateCustomerVin,
            message: 'Invalid Customer VIN'
        }
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: Models.user,
        required: true
    },
    status: {
        type: String,
        enum: Object.values(EnrollmentStatus),
        default: EnrollmentStatus.pending
    }
})

const Enrollment = model(Models.enrollment, enrollmentSchema)
export default Enrollment