
import mongoose, {Schema} from 'mongoose'

const UserSchema = new Schema({
    name: {type: String, required: true }, //default: 'Unknow'
    email: {type: String, required: true},
    password: {type: String, required: true},
    // age: {type: String, required: false, min: 18 }
})

export const UserModel = mongoose.models.users || mongoose.model('users', UserSchema);

