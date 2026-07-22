import { model, models, Schema, Model } from "mongoose";
import { IUser } from "@/types/User";


const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name is required'],
        minlength: [3, "Name Must Be at least 3 characters"]
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
    },

    password: {
        type: String,
        required: [true, "Password is required"],
    }

}, { timestamps: true })


export const User = (models.User as Model<IUser>) || model<IUser>("User", UserSchema);