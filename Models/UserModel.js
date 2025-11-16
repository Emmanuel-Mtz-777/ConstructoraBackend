import MongoDB from '../Contracts/Mongo.js';
import { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    rol: {
    type: String,
    enum: ['visitante', 'admin', 'analista'], 
    default: 'visitante', 
    required: true
}
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            return ret;
        }
    },
    timestamps: true
});

export const User = MongoDB.model('User', UserSchema);

export class UserModel {
    static async createUser(userData) {
        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            throw new Error('Email already in use');
        }
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPassword;
        return await User.create(userData);
    }
    
    static async loginUser(userData) {
        const user = await User.findOne({ email: userData.email });
        if (!user) {
            throw new Error('User not found');
        }
        const isMatch = await bcrypt.compare(userData.password, user.password);
        if (!isMatch) {
            throw new Error('Invalid password');
        }

        return user;
    }

}